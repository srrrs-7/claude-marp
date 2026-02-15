#!/usr/bin/env bash
# Agent Team Status - Display team status, worker states, and task progress
#
# Usage:
#   bash scripts/agent-team-status.sh <session-id>
#   bash scripts/agent-team-status.sh <session-id> --watch   # Auto-refresh every 3s

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
BOLD='\033[1m'
NC='\033[0m'

SESSION_ID="${1:?Usage: agent-team-status.sh <session-id> [--watch]}"
WATCH="${2:-}"
WORKSPACE=".agent-teams/${SESSION_ID}"

# Simple JSON field extractor
json_field() {
    local file="$1"
    local field="$2"
    grep -o "\"${field}\": \"[^\"]*\"" "$file" 2>/dev/null | head -1 | sed "s/\"${field}\": \"//" | sed 's/"$//' || true
}

json_field_num() {
    local file="$1"
    local field="$2"
    grep -o "\"${field}\": [0-9]*" "$file" 2>/dev/null | head -1 | grep -o '[0-9]*' || true
}

print_status() {
    clear 2>/dev/null || true

    echo -e "${BOLD}${BLUE}=== Agent Team Status ===${NC}"
    echo ""

    # Check workspace exists
    if [[ ! -d "$WORKSPACE" ]]; then
        echo -e "${RED}Error: Workspace not found: ${WORKSPACE}${NC}"
        return 1
    fi

    # Team info
    if [[ -f "${WORKSPACE}/team.json" ]]; then
        local created
        created=$(json_field "${WORKSPACE}/team.json" "createdAt")
        local impl_count
        impl_count=$(json_field_num "${WORKSPACE}/team.json" "impl")
        local review_count
        review_count=$(json_field_num "${WORKSPACE}/team.json" "review")
        echo -e "  Session:  ${CYAN}${SESSION_ID}${NC}"
        echo -e "  Created:  ${created}"
        echo -e "  Workers:  ${impl_count} impl + ${review_count} review"
    fi

    # Shutdown status
    if [[ -f "${WORKSPACE}/shutdown" ]]; then
        echo -e "  Status:   ${RED}SHUTTING DOWN${NC}"
    else
        echo -e "  Status:   ${GREEN}RUNNING${NC}"
    fi

    # tmux session
    local tmux_session="agent-team-${SESSION_ID}"
    if tmux has-session -t "$tmux_session" 2>/dev/null; then
        echo -e "  tmux:     ${GREEN}active${NC} (${tmux_session})"
    else
        echo -e "  tmux:     ${GRAY}not found${NC}"
    fi

    echo ""

    # --- Workers ---
    echo -e "${BOLD}Workers:${NC}"
    local worker_count=0
    for status_file in "${WORKSPACE}/status"/*.json; do
        [[ -f "$status_file" ]] || continue
        worker_count=$((worker_count + 1))

        local agent_id
        agent_id=$(json_field "$status_file" "agentId")
        local role
        role=$(json_field "$status_file" "role")
        local state
        state=$(json_field "$status_file" "state")
        local current_task
        current_task=$(json_field "$status_file" "currentTask")
        local heartbeat
        heartbeat=$(json_field "$status_file" "heartbeat")

        # State color
        local state_color="$GRAY"
        case "$state" in
            idle)     state_color="$GRAY" ;;
            busy)     state_color="$GREEN" ;;
            error)    state_color="$RED" ;;
            shutdown) state_color="$YELLOW" ;;
        esac

        local task_info=""
        if [[ -n "$current_task" ]] && [[ "$current_task" != "null" ]]; then
            task_info=" → ${current_task}"
        fi

        echo -e "  ${CYAN}${agent_id}${NC} (${role})  ${state_color}${state}${NC}${task_info}  ${GRAY}[${heartbeat}]${NC}"
    done

    if [[ $worker_count -eq 0 ]]; then
        echo -e "  ${GRAY}(no workers found)${NC}"
    fi

    echo ""

    # --- Tasks ---
    echo -e "${BOLD}Tasks:${NC}"
    local task_count=0
    local completed=0
    local in_progress=0
    local pending=0

    for task_file in "${WORKSPACE}/tasks"/task-*.json; do
        [[ -f "$task_file" ]] || continue
        task_count=$((task_count + 1))

        local task_id
        task_id=$(json_field "$task_file" "id")
        local title
        title=$(json_field "$task_file" "title")
        local status
        status=$(json_field "$task_file" "status")
        local cycle
        cycle=$(json_field_num "$task_file" "cycle")
        cycle=${cycle:-0}
        local assignee
        assignee=$(json_field "$task_file" "assignee")

        # Status icon and color
        local icon=""
        local status_color="$GRAY"
        case "$status" in
            pending)         icon=" " ; status_color="$GRAY" ; pending=$((pending + 1)) ;;
            in_progress)     icon="→" ; status_color="$BLUE" ; in_progress=$((in_progress + 1)) ;;
            impl_done)       icon="◆" ; status_color="$CYAN" ; in_progress=$((in_progress + 1)) ;;
            in_review)       icon="◇" ; status_color="$YELLOW" ; in_progress=$((in_progress + 1)) ;;
            review_done)     icon="◈" ; status_color="$YELLOW" ; in_progress=$((in_progress + 1)) ;;
            needs_revision)  icon="⟳" ; status_color="$RED" ; in_progress=$((in_progress + 1)) ;;
            completed)       icon="✓" ; status_color="$GREEN" ; completed=$((completed + 1)) ;;
        esac

        local assignee_info=""
        if [[ -n "$assignee" ]] && [[ "$assignee" != "null" ]]; then
            assignee_info=" (${assignee})"
        fi

        local cycle_info=""
        if [[ "$cycle" -gt 0 ]]; then
            cycle_info=" [cycle ${cycle}]"
        fi

        echo -e "  [${status_color}${icon}${NC}] ${task_id}: ${title}  ${status_color}${status}${NC}${assignee_info}${cycle_info}"
    done

    if [[ $task_count -eq 0 ]]; then
        echo -e "  ${GRAY}(no tasks found)${NC}"
    fi

    echo ""
    echo -e "${BOLD}Progress:${NC} ${completed}/${task_count} completed, ${in_progress} in progress, ${pending} pending"

    # --- Recent reviews ---
    local has_reviews=false
    for _rf in "${WORKSPACE}/reviews"/task-*-review.json; do
        [[ -f "$_rf" ]] && has_reviews=true && break
    done
    if [[ "$has_reviews" == "true" ]]; then
        echo ""
        echo -e "${BOLD}Recent Reviews:${NC}"
        for review_file in "${WORKSPACE}/reviews"/task-*-review.json; do
            [[ -f "$review_file" ]] || continue

            local r_task_id
            r_task_id=$(json_field "$review_file" "taskId")
            local verdict
            verdict=$(json_field "$review_file" "verdict")
            local summary
            summary=$(json_field "$review_file" "summary")
            local reviewer
            reviewer=$(json_field "$review_file" "reviewer")

            local verdict_color="$GREEN"
            [[ "$verdict" == "needs_revision" ]] && verdict_color="$RED"

            echo -e "  ${r_task_id} — ${verdict_color}${verdict}${NC} by ${reviewer}"
            if [[ -n "$summary" ]]; then
                echo -e "    ${GRAY}${summary}${NC}"
            fi
        done
    fi

    echo ""
    echo -e "${GRAY}Updated: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
}

# --- Execute ---
if [[ "$WATCH" == "--watch" ]]; then
    while true; do
        print_status
        sleep 3
    done
else
    print_status
fi
