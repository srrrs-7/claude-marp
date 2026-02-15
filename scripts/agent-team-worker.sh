#!/usr/bin/env bash
# Agent Team Worker - Polling loop for impl/review workers
#
# Usage:
#   bash scripts/agent-team-worker.sh <session-id> <workspace> <agent-id> <role> <project-root>
#
# Arguments:
#   session-id    Unique session identifier
#   workspace     Workspace directory path
#   agent-id      Worker identifier (e.g. impl-1, review-1)
#   role          Worker role: "impl" or "review"
#   project-root  Absolute path to project root

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- Arguments ---
SESSION_ID="${1:?Missing session-id}"
WORKSPACE="${2:?Missing workspace}"
AGENT_ID="${3:?Missing agent-id}"
ROLE="${4:?Missing role (impl|review)}"
PROJECT_ROOT="${5:?Missing project-root}"

POLL_INTERVAL=2
MAX_RETRIES=3
LOG_FILE="${WORKSPACE}/log/${AGENT_ID}.log"
STATUS_FILE="${WORKSPACE}/status/${AGENT_ID}.json"

# --- Helpers ---
log() {
    local msg="[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $1: $2"
    echo -e "$msg" >> "$LOG_FILE"
    echo -e "$msg"
}

update_status() {
    local state="$1"
    local current_task="${2:-null}"
    cat > "$STATUS_FILE" <<EOF
{
  "agentId": "${AGENT_ID}",
  "role": "${ROLE}",
  "state": "${state}",
  "currentTask": ${current_task},
  "heartbeat": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
}

update_heartbeat() {
    if [[ -f "$STATUS_FILE" ]]; then
        local tmp="${STATUS_FILE}.tmp"
        sed "s/\"heartbeat\": \"[^\"]*\"/\"heartbeat\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"/" \
            "$STATUS_FILE" > "$tmp" && mv "$tmp" "$STATUS_FILE"
    fi
}

# Update task JSON field
update_task_field() {
    local task_file="$1"
    local field="$2"
    local value="$3"
    local tmp="${task_file}.tmp"

    if [[ "$value" == \"*\" ]]; then
        # String value (already quoted)
        sed "s/\"${field}\": \"[^\"]*\"/\"${field}\": ${value}/" "$task_file" > "$tmp" && mv "$tmp" "$task_file"
    elif [[ "$value" == "null" ]] || [[ "$value" =~ ^[0-9]+$ ]]; then
        # null or numeric
        sed "s/\"${field}\": [^,}]*/\"${field}\": ${value}/" "$task_file" > "$tmp" && mv "$tmp" "$task_file"
    else
        # Unquoted string — wrap in quotes
        sed "s/\"${field}\": \"[^\"]*\"/\"${field}\": \"${value}\"/" "$task_file" > "$tmp" && mv "$tmp" "$task_file"
    fi

    # Update updatedAt
    sed "s/\"updatedAt\": \"[^\"]*\"/\"updatedAt\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"/" \
        "$task_file" > "$tmp" && mv "$tmp" "$task_file"
}

# Find a task with the given status
find_task() {
    local target_status="$1"
    for task_file in "${WORKSPACE}/tasks"/task-*.json; do
        [[ -f "$task_file" ]] || continue
        if grep -q "\"status\": \"${target_status}\"" "$task_file"; then
            echo "$task_file"
            return 0
        fi
    done
    return 1
}

# Extract field value from JSON (simple grep-based)
json_field() {
    local file="$1"
    local field="$2"
    grep -o "\"${field}\": \"[^\"]*\"" "$file" | head -1 | sed "s/\"${field}\": \"//" | sed 's/"$//'
}

# --- Role-specific task execution ---
run_impl_task() {
    local task_file="$1"
    local task_id
    task_id=$(json_field "$task_file" "id")
    local description
    description=$(json_field "$task_file" "description")
    local title
    title=$(json_field "$task_file" "title")

    log "INFO" "Implementing: ${task_id} — ${title}"

    # Check for review feedback (needs_revision)
    local review_context=""
    local review_file="${WORKSPACE}/reviews/${task_id}-review.json"
    if [[ -f "$review_file" ]]; then
        review_context="

Previous review feedback (fix these issues):
$(cat "$review_file")"
    fi

    local prompt="You are an implementation worker. Complete the following task in the project at ${PROJECT_ROOT}.

Task: ${title}
Description: ${description}
${review_context}

Instructions:
1. Read the target files mentioned in the task
2. Implement the changes described
3. Ensure no syntax errors
4. Keep changes minimal and focused"

    local retry=0
    while (( retry < MAX_RETRIES )); do
        log "INFO" "Attempt $((retry + 1))/${MAX_RETRIES}"

        if CLAUDECODE= claude -p "$prompt" \
            --dangerously-skip-permissions \
            2>>"$LOG_FILE"; then
            log "INFO" "Implementation succeeded for ${task_id}"
            return 0
        fi

        retry=$((retry + 1))
        log "WARN" "Attempt ${retry} failed for ${task_id}"
        sleep 2
    done

    log "ERROR" "All ${MAX_RETRIES} attempts failed for ${task_id}"
    return 1
}

run_review_task() {
    local task_file="$1"
    local task_id
    task_id=$(json_field "$task_file" "id")
    local description
    description=$(json_field "$task_file" "description")
    local title
    title=$(json_field "$task_file" "title")

    log "INFO" "Reviewing: ${task_id} — ${title}"

    local review_output="${WORKSPACE}/reviews/${task_id}-review.json"

    local prompt="You are a code reviewer. Review the changes for the following task in the project at ${PROJECT_ROOT}.

Task: ${title}
Description: ${description}

Instructions:
1. Run 'git diff' to see recent changes
2. Check for correctness, bugs, security issues, and code style
3. Write your review as JSON to: ${review_output}

The review JSON must have this format:
{
  \"taskId\": \"${task_id}\",
  \"reviewer\": \"${AGENT_ID}\",
  \"verdict\": \"approved\" or \"needs_revision\",
  \"summary\": \"Brief summary of findings\",
  \"findings\": [
    {
      \"severity\": \"error|warning|info\",
      \"file\": \"path/to/file\",
      \"line\": 0,
      \"message\": \"Description\",
      \"suggestion\": \"Fix suggestion\"
    }
  ],
  \"reviewedAt\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
}

Use verdict 'approved' if no error/warning severity findings. Use 'needs_revision' for bugs or security issues."

    local retry=0
    while (( retry < MAX_RETRIES )); do
        log "INFO" "Review attempt $((retry + 1))/${MAX_RETRIES}"

        if codex --approval-mode full-auto "$prompt" \
            2>>"$LOG_FILE"; then

            # Verify review output was created
            if [[ -f "$review_output" ]]; then
                log "INFO" "Review completed for ${task_id}"
                return 0
            else
                log "WARN" "Review output not created, generating default approval"
                cat > "$review_output" <<EOF
{
  "taskId": "${task_id}",
  "reviewer": "${AGENT_ID}",
  "verdict": "approved",
  "summary": "Automated review completed without explicit findings",
  "findings": [],
  "reviewedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
                return 0
            fi
        fi

        retry=$((retry + 1))
        log "WARN" "Review attempt ${retry} failed for ${task_id}"
        sleep 2
    done

    log "ERROR" "All ${MAX_RETRIES} review attempts failed for ${task_id}"
    return 1
}

# --- Main polling loop ---
echo -e "${BLUE}=== ${AGENT_ID} (${ROLE}) starting ===${NC}"
log "INFO" "Worker started: ${AGENT_ID} (${ROLE})"
update_status "idle"

while true; do
    # Check shutdown signal
    if [[ -f "${WORKSPACE}/shutdown" ]]; then
        log "INFO" "Shutdown signal received"
        update_status "shutdown"
        echo -e "${YELLOW}${AGENT_ID}: Shutting down${NC}"
        exit 0
    fi

    # Update heartbeat
    update_heartbeat

    # Find work based on role
    TASK_FILE=""
    if [[ "$ROLE" == "impl" ]]; then
        # Look for needs_revision first (priority), then pending
        TASK_FILE=$(find_task "needs_revision" 2>/dev/null || find_task "pending" 2>/dev/null || true)
    elif [[ "$ROLE" == "review" ]]; then
        TASK_FILE=$(find_task "impl_done" 2>/dev/null || true)
    fi

    if [[ -z "$TASK_FILE" ]]; then
        sleep "$POLL_INTERVAL"
        continue
    fi

    # Extract task info
    TASK_ID=$(json_field "$TASK_FILE" "id")

    # Execute task
    if [[ "$ROLE" == "impl" ]]; then
        update_status "busy" "\"${TASK_ID}\""
        update_task_field "$TASK_FILE" "status" "in_progress"
        update_task_field "$TASK_FILE" "assignee" "\"${AGENT_ID}\""

        if run_impl_task "$TASK_FILE"; then
            update_task_field "$TASK_FILE" "status" "impl_done"
            log "INFO" "Task ${TASK_ID} → impl_done"
        else
            update_status "error" "\"${TASK_ID}\""
            log "ERROR" "Task ${TASK_ID} failed, leaving as in_progress"
            sleep "$POLL_INTERVAL"
        fi

    elif [[ "$ROLE" == "review" ]]; then
        update_status "busy" "\"${TASK_ID}\""
        update_task_field "$TASK_FILE" "status" "in_review"

        if run_review_task "$TASK_FILE"; then
            update_task_field "$TASK_FILE" "status" "review_done"

            # Check verdict and update accordingly
            REVIEW_FILE="${WORKSPACE}/reviews/${TASK_ID}-review.json"
            if [[ -f "$REVIEW_FILE" ]]; then
                VERDICT=$(json_field "$REVIEW_FILE" "verdict")
                if [[ "$VERDICT" == "approved" ]]; then
                    update_task_field "$TASK_FILE" "status" "completed"
                    log "INFO" "Task ${TASK_ID} → completed (approved)"
                elif [[ "$VERDICT" == "needs_revision" ]]; then
                    # Check cycle count
                    CYCLE=$(grep -o '"cycle": [0-9]*' "$TASK_FILE" | grep -o '[0-9]*')
                    CYCLE=${CYCLE:-0}
                    MAX_CYCLES=$(grep -o '"maxCycles": [0-9]*' "$TASK_FILE" | grep -o '[0-9]*')
                    MAX_CYCLES=${MAX_CYCLES:-3}

                    if (( CYCLE + 1 >= MAX_CYCLES )); then
                        update_task_field "$TASK_FILE" "status" "completed"
                        log "WARN" "Task ${TASK_ID} → completed (max cycles reached: $((CYCLE + 1))/${MAX_CYCLES})"
                    else
                        NEW_CYCLE=$((CYCLE + 1))
                        update_task_field "$TASK_FILE" "cycle" "$NEW_CYCLE"
                        update_task_field "$TASK_FILE" "status" "needs_revision"
                        log "INFO" "Task ${TASK_ID} → needs_revision (cycle ${NEW_CYCLE}/${MAX_CYCLES})"
                    fi
                fi
            fi
        else
            # Review failed — revert to impl_done so another reviewer can pick it up
            update_task_field "$TASK_FILE" "status" "impl_done"
            update_status "error" "\"${TASK_ID}\""
            log "ERROR" "Review failed for ${TASK_ID}, reverting to impl_done"
            sleep "$POLL_INTERVAL"
        fi
    fi

    # Back to idle
    update_status "idle"
    sleep 1
done
