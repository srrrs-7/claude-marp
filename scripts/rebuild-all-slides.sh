#!/usr/bin/env bash
# Rebuild All Slides - Re-render and re-export all presentations in docs/
#
# Usage:
#   ./scripts/rebuild-all-slides.sh                    # Rebuild all (incremental)
#   ./scripts/rebuild-all-slides.sh render             # Render only (incremental)
#   ./scripts/rebuild-all-slides.sh export             # Export only (incremental)
#   ./scripts/rebuild-all-slides.sh --force            # Force full rebuild
#   ./scripts/rebuild-all-slides.sh render --force     # Force render only

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
SUCCESS=0
FAILED=0
SKIPPED=0
CACHED=0

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

# Find all presentation directories
# Pattern: docs/<timestamp>_<title>/
for dir in docs/*/; do
    # Skip if not a directory
    [ -d "$dir" ] || continue

    TOTAL=$((TOTAL + 1))
    dir_name=$(basename "$dir")

    echo -e "${BLUE}[$TOTAL] Processing: ${dir_name}${NC}"

    # Check required files
    config_file="${dir}slides.config.yaml"
    data_file="${dir}slides-data.json"

    if [[ ! -f "$config_file" ]]; then
        echo -e "  ${YELLOW}⚠ Skipped: slides.config.yaml not found${NC}\n"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    if [[ ! -f "$data_file" ]]; then
        echo -e "  ${YELLOW}⚠ Skipped: slides-data.json not found${NC}\n"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Incremental build: skip if inputs unchanged since last successful build
    cache_key=$(echo "$dir_name" | tr '/' '_')
    cache_file="${CACHE_DIR}/${cache_key}.hash"
    current_hash=$(cat "$config_file" "$data_file" 2>/dev/null | md5sum | cut -d' ' -f1)

    if [[ $FORCE -eq 0 && -f "$cache_file" && "$(cat "$cache_file")" == "$current_hash" ]]; then
        echo -e "  ${YELLOW}⊘ Cached (unchanged)${NC}\n"
        CACHED=$((CACHED + 1))
        SUCCESS=$((SUCCESS + 1))
        continue
    fi

    # Render slides
    if [[ "$MODE" == "all" || "$MODE" == "render" ]]; then
        echo -e "  ${GREEN}→ Rendering...${NC}"
        if bun run slides render -c "$config_file" --in "$data_file" 2>&1 | sed 's/^/    /'; then
            echo -e "  ${GREEN}✓ Render successful${NC}"
        else
            echo -e "  ${RED}✗ Render failed${NC}\n"
            FAILED=$((FAILED + 1))
            continue
        fi
    fi

    # Export to HTML
    if [[ "$MODE" == "all" || "$MODE" == "export" ]]; then
        # Find generated markdown file
        md_file=$(find "$dir" -maxdepth 1 -name "*.md" -type f | head -n 1)

        if [[ -z "$md_file" ]]; then
            echo -e "  ${RED}✗ No markdown file found for export${NC}\n"
            FAILED=$((FAILED + 1))
            continue
        fi

        echo -e "  ${GREEN}→ Exporting to HTML...${NC}"
        if bun run slides export -c "$config_file" -f html --in "$md_file" 2>&1 | sed 's/^/    /'; then
            echo -e "  ${GREEN}✓ Export successful${NC}"
            SUCCESS=$((SUCCESS + 1))
            # Save hash for incremental builds
            echo "$current_hash" > "$cache_file"
        else
            echo -e "  ${RED}✗ Export failed${NC}\n"
            FAILED=$((FAILED + 1))
            continue
        fi
    else
        # Render-only mode — save hash too
        SUCCESS=$((SUCCESS + 1))
        echo "$current_hash" > "$cache_file"
    fi

    echo ""
done

# Summary
echo -e "${BLUE}=== Summary ===${NC}"
echo -e "Total presentations: ${TOTAL}"
echo -e "${GREEN}Successful: ${SUCCESS}${NC} (${YELLOW}${CACHED} from cache${NC})"
echo -e "${RED}Failed: ${FAILED}${NC}"
echo -e "${YELLOW}Skipped (missing files): ${SKIPPED}${NC}"

if [[ $FAILED -gt 0 ]]; then
    exit 1
fi
