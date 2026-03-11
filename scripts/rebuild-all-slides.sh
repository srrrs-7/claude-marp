#!/usr/bin/env bash
# Rebuild All Slides - Re-render and re-export all presentations in docs/
#
# Usage:
#   ./scripts/rebuild-all-slides.sh                    # Rebuild all (incremental)
#   ./scripts/rebuild-all-slides.sh render             # Render only (incremental, parallel)
#   ./scripts/rebuild-all-slides.sh export             # Export only (incremental, sequential)
#   ./scripts/rebuild-all-slides.sh --force            # Force full rebuild
#   ./scripts/rebuild-all-slides.sh render --force     # Force render only
#
# Performance: render step runs in parallel batches of 8 (each deck writes to
# its own output dir → no conflicts). Export is always sequential (Marp CLI
# internal cache constraint).

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

RENDER_PARALLEL=8  # concurrent render jobs

# Counters (written to temp files so subshells can update them)
TMPDIR_COUNTS=$(mktemp -d)
echo 0 > "$TMPDIR_COUNTS/total"
echo 0 > "$TMPDIR_COUNTS/success"
echo 0 > "$TMPDIR_COUNTS/failed"
echo 0 > "$TMPDIR_COUNTS/skipped"
echo 0 > "$TMPDIR_COUNTS/cached"
cleanup() { rm -rf "$TMPDIR_COUNTS"; }
trap cleanup EXIT

# Parse arguments: mode (all/render/export) and optional --force flag
MODE="all"
FORCE=0
for arg in "$@"; do
    case "$arg" in
        render|export|all) MODE="$arg" ;;
        --force) FORCE=1 ;;
    esac
done

# Cache directory for incremental builds
CACHE_DIR=".cache/rebuild"
mkdir -p "$CACHE_DIR"

echo -e "${BLUE}=== Rebuild All Slides ===${NC}"
echo -e "Mode: ${YELLOW}${MODE}${NC}$([ $FORCE -eq 1 ] && echo ' (force rebuild)' || echo ' (incremental)')\n"

# ---------------------------------------------------------------------------
# Phase 1 — Collect decks, compute hashes, determine what needs rebuilding
# ---------------------------------------------------------------------------

# Arrays for decks that need work
DIRS_TO_RENDER=()   # deck dirs that need a render pass
DIRS_TO_EXPORT=()   # deck dirs that need an export pass
HASHES=()           # corresponding hashes (parallel to the above)

for dir in docs/*/; do
    [ -d "$dir" ] || continue
    TOTAL=$(( $(cat "$TMPDIR_COUNTS/total") + 1 ))
    echo $TOTAL > "$TMPDIR_COUNTS/total"

    dir_name=$(basename "$dir")
    config_file="${dir}slides.config.yaml"
    data_file="${dir}slides-data.json"

    if [[ ! -f "$config_file" || ! -f "$data_file" ]]; then
        echo -e "  ${YELLOW}⚠ Skipped ${dir_name}: missing config or data${NC}"
        SKIP=$(( $(cat "$TMPDIR_COUNTS/skipped") + 1 ))
        echo $SKIP > "$TMPDIR_COUNTS/skipped"
        continue
    fi

    current_hash=$(cat "$config_file" "$data_file" 2>/dev/null | md5sum | cut -d' ' -f1)
    cache_key=$(echo "$dir_name" | tr '/' '_')
    cache_file="${CACHE_DIR}/${cache_key}.hash"

    if [[ $FORCE -eq 0 && -f "$cache_file" && "$(cat "$cache_file")" == "$current_hash" ]]; then
        echo -e "  ${YELLOW}⊘ Cached: ${dir_name}${NC}"
        CACHED=$(( $(cat "$TMPDIR_COUNTS/cached") + 1 ))
        echo $CACHED > "$TMPDIR_COUNTS/cached"
        SUCCESS=$(( $(cat "$TMPDIR_COUNTS/success") + 1 ))
        echo $SUCCESS > "$TMPDIR_COUNTS/success"
        continue
    fi

    if [[ "$MODE" == "all" || "$MODE" == "render" ]]; then
        DIRS_TO_RENDER+=("$dir")
        HASHES+=("$current_hash")
    fi
    if [[ "$MODE" == "all" || "$MODE" == "export" ]]; then
        DIRS_TO_EXPORT+=("$dir")
        [[ "$MODE" == "export" ]] && HASHES+=("$current_hash")
    fi
done

echo ""

# ---------------------------------------------------------------------------
# Phase 2 — Parallel render (each deck → its own output dir, no conflicts)
# ---------------------------------------------------------------------------

if [[ ${#DIRS_TO_RENDER[@]} -gt 0 ]]; then
    echo -e "${BLUE}── Rendering ${#DIRS_TO_RENDER[@]} decks (${RENDER_PARALLEL} parallel) ──${NC}\n"

    # Temp dir for per-job logs and status
    RENDER_TMP=$(mktemp -d)
    trap "rm -rf '$RENDER_TMP' '$TMPDIR_COUNTS'" EXIT

    render_one() {
        local dir="$1"
        local idx="$2"
        local dir_name
        dir_name=$(basename "$dir")
        local config_file="${dir}slides.config.yaml"
        local data_file="${dir}slides-data.json"
        local log_file="${RENDER_TMP}/${idx}.log"
        local status_file="${RENDER_TMP}/${idx}.status"

        if bun run slides render -c "$config_file" --in "$data_file" \
               > "$log_file" 2>&1; then
            echo "ok" > "$status_file"
        else
            echo "fail" > "$status_file"
        fi
    }

    # Batch parallel execution
    RUNNING=0
    IDX=0
    PIDS=()
    IDX_MAP=()   # maps PID index → DIRS_TO_RENDER index

    for i in "${!DIRS_TO_RENDER[@]}"; do
        render_one "${DIRS_TO_RENDER[$i]}" "$i" &
        PIDS+=($!)
        IDX_MAP+=($i)
        RUNNING=$(( RUNNING + 1 ))

        # Flush batch when at capacity
        if [[ $RUNNING -ge $RENDER_PARALLEL ]]; then
            for pid in "${PIDS[@]}"; do wait "$pid" || true; done
            PIDS=()
            RUNNING=0
        fi
    done
    # Flush remaining
    for pid in "${PIDS[@]}"; do wait "$pid" || true; done

    # Collect results
    RENDER_FAILED_DIRS=()
    for i in "${!DIRS_TO_RENDER[@]}"; do
        dir="${DIRS_TO_RENDER[$i]}"
        dir_name=$(basename "$dir")
        status_file="${RENDER_TMP}/${i}.status"
        log_file="${RENDER_TMP}/${i}.log"
        if [[ -f "$status_file" && "$(cat "$status_file")" == "ok" ]]; then
            echo -e "  ${GREEN}✓ Rendered: ${dir_name}${NC}"
        else
            echo -e "  ${RED}✗ Render failed: ${dir_name}${NC}"
            [[ -f "$log_file" ]] && sed 's/^/    /' "$log_file"
            RENDER_FAILED_DIRS+=("$dir")
            FAILED=$(( $(cat "$TMPDIR_COUNTS/failed") + 1 ))
            echo $FAILED > "$TMPDIR_COUNTS/failed"
        fi
    done

    # Remove failed dirs from export list
    FILTERED_EXPORT=()
    for dir in "${DIRS_TO_EXPORT[@]}"; do
        skip=0
        for fdir in "${RENDER_FAILED_DIRS[@]}"; do
            [[ "$dir" == "$fdir" ]] && skip=1 && break
        done
        [[ $skip -eq 0 ]] && FILTERED_EXPORT+=("$dir")
    done
    DIRS_TO_EXPORT=("${FILTERED_EXPORT[@]+"${FILTERED_EXPORT[@]}"}")

    rm -rf "$RENDER_TMP"
    echo ""
fi

# ---------------------------------------------------------------------------
# Phase 3 — Sequential export (Marp CLI cache constraint)
# ---------------------------------------------------------------------------

if [[ ${#DIRS_TO_EXPORT[@]} -gt 0 ]]; then
    echo -e "${BLUE}── Exporting ${#DIRS_TO_EXPORT[@]} decks (sequential) ──${NC}\n"

    for i in "${!DIRS_TO_EXPORT[@]}"; do
        dir="${DIRS_TO_EXPORT[$i]}"
        dir_name=$(basename "$dir")
        config_file="${dir}slides.config.yaml"
        cache_key=$(echo "$dir_name" | tr '/' '_')
        cache_file="${CACHE_DIR}/${cache_key}.hash"

        # Recompute hash (may not be in HASHES if render ran first)
        data_file="${dir}slides-data.json"
        current_hash=$(cat "${dir}slides.config.yaml" "$data_file" 2>/dev/null | md5sum | cut -d' ' -f1)

        md_file=$(find "$dir" -maxdepth 1 -name "*.md" -type f | head -n 1)
        if [[ -z "$md_file" ]]; then
            echo -e "  ${RED}✗ No .md file for export: ${dir_name}${NC}"
            FAILED=$(( $(cat "$TMPDIR_COUNTS/failed") + 1 ))
            echo $FAILED > "$TMPDIR_COUNTS/failed"
            continue
        fi

        echo -e "  ${GREEN}→ Exporting: ${dir_name}${NC}"
        if bun run slides export -c "$config_file" -f html --in "$md_file" 2>&1 | sed 's/^/    /'; then
            echo -e "  ${GREEN}✓ Done${NC}"
            echo "$current_hash" > "$cache_file"
            SUCCESS=$(( $(cat "$TMPDIR_COUNTS/success") + 1 ))
            echo $SUCCESS > "$TMPDIR_COUNTS/success"
        else
            echo -e "  ${RED}✗ Export failed: ${dir_name}${NC}"
            FAILED=$(( $(cat "$TMPDIR_COUNTS/failed") + 1 ))
            echo $FAILED > "$TMPDIR_COUNTS/failed"
        fi
        echo ""
    done
fi

# Render-only mode: save cache hashes for successfully rendered decks
if [[ "$MODE" == "render" && ${#DIRS_TO_RENDER[@]} -gt 0 ]]; then
    for i in "${!DIRS_TO_RENDER[@]}"; do
        dir="${DIRS_TO_RENDER[$i]}"
        dir_name=$(basename "$dir")
        cache_key=$(echo "$dir_name" | tr '/' '_')
        cache_file="${CACHE_DIR}/${cache_key}.hash"
        render_status="${RENDER_TMP:-}/${i}.status"
        # Only cache if the parallel render succeeded
        if [[ -n "${RENDER_TMP:-}" && -f "$render_status" && "$(cat "$render_status")" == "ok" ]]; then
            data_file="${dir}slides-data.json"
            current_hash=$(cat "${dir}slides.config.yaml" "$data_file" 2>/dev/null | md5sum | cut -d' ' -f1)
            echo "$current_hash" > "$cache_file"
            SUCCESS=$(( $(cat "$TMPDIR_COUNTS/success") + 1 ))
            echo $SUCCESS > "$TMPDIR_COUNTS/success"
        fi
    done
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

TOTAL=$(cat "$TMPDIR_COUNTS/total")
SUCCESS=$(cat "$TMPDIR_COUNTS/success")
FAILED=$(cat "$TMPDIR_COUNTS/failed")
SKIPPED=$(cat "$TMPDIR_COUNTS/skipped")
CACHED=$(cat "$TMPDIR_COUNTS/cached")

echo -e "${BLUE}=== Summary ===${NC}"
echo -e "Total presentations : ${TOTAL}"
echo -e "${GREEN}Successful          : ${SUCCESS}${NC} (${YELLOW}${CACHED} from cache${NC})"
echo -e "${RED}Failed              : ${FAILED}${NC}"
echo -e "${YELLOW}Skipped             : ${SKIPPED}${NC}"

if [[ $FAILED -gt 0 ]]; then
    exit 1
fi
