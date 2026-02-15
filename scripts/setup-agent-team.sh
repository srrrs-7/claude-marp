#!/usr/bin/env bash
# Setup Agent Team - Create tmux session with Leader + Impl + Review panes
#
# Usage:
#   bash scripts/setup-agent-team.sh <session-id> <workspace> [impl-count] [review-count]
#
# Arguments:
#   session-id    Unique session identifier (e.g. 20260215120000)
#   workspace     Workspace directory path (e.g. .agent-teams/20260215120000)
#   impl-count    Number of implementation workers (default: 2)
#   review-count  Number of review workers (default: 2)
#
# Layout:
#   ┌──────────────────────────────────────────┐
#   │            Leader (pane 0)                │
#   ├───────────────────┬──────────────────────┤
#   │  Impl-1 (pane 1)  │  Impl-2 (pane 2)    │
#   ├───────────────────┼──────────────────────┤
#   │ Review-1 (pane 3) │ Review-2 (pane 4)    │
#   └───────────────────┴──────────────────────┘

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# --- Arguments ---
SESSION_ID="${1:?Usage: setup-agent-team.sh <session-id> <workspace> [impl-count] [review-count]}"
WORKSPACE="${2:?Usage: setup-agent-team.sh <session-id> <workspace> [impl-count] [review-count]}"
IMPL_COUNT="${3:-2}"
REVIEW_COUNT="${4:-2}"

TMUX_SESSION="agent-team-${SESSION_ID}"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKER_SCRIPT="${PROJECT_ROOT}/scripts/agent-team-worker.sh"

echo -e "${BLUE}=== Agent Team Setup ===${NC}"
echo -e "Session ID:     ${CYAN}${SESSION_ID}${NC}"
echo -e "Workspace:      ${CYAN}${WORKSPACE}${NC}"
echo -e "Impl workers:   ${CYAN}${IMPL_COUNT}${NC}"
echo -e "Review workers: ${CYAN}${REVIEW_COUNT}${NC}"
echo ""

# --- Prerequisite checks ---
if ! command -v tmux &>/dev/null; then
    echo -e "${RED}Error: tmux is not installed${NC}"
    exit 1
fi

if ! command -v claude &>/dev/null; then
    echo -e "${YELLOW}Warning: claude CLI not found — impl workers may fail${NC}"
fi

if ! command -v codex &>/dev/null; then
    echo -e "${YELLOW}Warning: codex CLI not found — review workers may fail${NC}"
fi

if [[ ! -x "$WORKER_SCRIPT" ]] && [[ ! -f "$WORKER_SCRIPT" ]]; then
    echo -e "${RED}Error: Worker script not found: ${WORKER_SCRIPT}${NC}"
    exit 1
fi

# --- Create workspace directories ---
echo -e "${GREEN}→ Creating workspace directories...${NC}"
mkdir -p "${WORKSPACE}/tasks"
mkdir -p "${WORKSPACE}/status"
mkdir -p "${WORKSPACE}/reviews"
mkdir -p "${WORKSPACE}/log"

# Create team.json if it doesn't exist
if [[ ! -f "${WORKSPACE}/team.json" ]]; then
    cat > "${WORKSPACE}/team.json" <<EOF
{
  "sessionId": "${SESSION_ID}",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "projectRoot": "${PROJECT_ROOT}",
  "workers": {
    "impl": ${IMPL_COUNT},
    "review": ${REVIEW_COUNT}
  },
  "maxCycles": 3
}
EOF
    echo -e "  ${GREEN}✓ Created team.json${NC}"
fi

# --- Kill existing session if any ---
if tmux has-session -t "$TMUX_SESSION" 2>/dev/null; then
    echo -e "${YELLOW}→ Killing existing tmux session: ${TMUX_SESSION}${NC}"
    tmux kill-session -t "$TMUX_SESSION"
fi

# --- Create tmux session ---
echo -e "${GREEN}→ Creating tmux session: ${TMUX_SESSION}${NC}"

# Create session with Leader pane (pane 0)
tmux new-session -d -s "$TMUX_SESSION" -x 200 -y 50
tmux send-keys -t "$TMUX_SESSION" \
    "echo -e '${BLUE}=== Leader Pane ===${NC}'; echo 'Session: ${SESSION_ID}'; echo 'Workspace: ${WORKSPACE}'; echo ''; echo 'Use: bash scripts/agent-team-status.sh ${SESSION_ID}'" Enter

# Split for impl row (bottom 60%)
tmux split-window -t "$TMUX_SESSION" -v -p 60

# Split impl row horizontally for multiple impl workers
IMPL_PANE_START=1
for ((i = 1; i < IMPL_COUNT; i++)); do
    tmux split-window -t "${TMUX_SESSION}.${IMPL_PANE_START}" -h -p $((100 - 100 / (IMPL_COUNT - i + 1)))
done

# Split for review row from the last impl pane
LAST_IMPL_PANE=$((IMPL_PANE_START + IMPL_COUNT - 1))
tmux split-window -t "${TMUX_SESSION}.${LAST_IMPL_PANE}" -v -p 50

# Split review row horizontally for multiple review workers
REVIEW_PANE_START=$((LAST_IMPL_PANE + 1))
for ((i = 1; i < REVIEW_COUNT; i++)); do
    tmux split-window -t "${TMUX_SESSION}.${REVIEW_PANE_START}" -h -p $((100 - 100 / (REVIEW_COUNT - i + 1)))
done

# --- Launch workers ---
echo -e "${GREEN}→ Launching workers...${NC}"

# Launch impl workers
for ((i = 0; i < IMPL_COUNT; i++)); do
    PANE_IDX=$((IMPL_PANE_START + i))
    AGENT_ID="impl-$((i + 1))"
    echo -e "  ${CYAN}Starting ${AGENT_ID} in pane ${PANE_IDX}${NC}"
    tmux send-keys -t "${TMUX_SESSION}.${PANE_IDX}" \
        "bash ${WORKER_SCRIPT} ${SESSION_ID} ${WORKSPACE} ${AGENT_ID} impl ${PROJECT_ROOT}" Enter
done

# Launch review workers
for ((i = 0; i < REVIEW_COUNT; i++)); do
    PANE_IDX=$((REVIEW_PANE_START + i))
    AGENT_ID="review-$((i + 1))"
    echo -e "  ${CYAN}Starting ${AGENT_ID} in pane ${PANE_IDX}${NC}"
    tmux send-keys -t "${TMUX_SESSION}.${PANE_IDX}" \
        "bash ${WORKER_SCRIPT} ${SESSION_ID} ${WORKSPACE} ${AGENT_ID} review ${PROJECT_ROOT}" Enter
done

# --- Done ---
echo ""
echo -e "${GREEN}=== Agent Team Ready ===${NC}"
echo -e "tmux session: ${CYAN}${TMUX_SESSION}${NC}"
echo -e ""
echo -e "Commands:"
echo -e "  ${YELLOW}tmux attach -t ${TMUX_SESSION}${NC}          — Attach to session"
echo -e "  ${YELLOW}bash scripts/agent-team-status.sh ${SESSION_ID}${NC} — Check status"
echo -e "  ${YELLOW}touch ${WORKSPACE}/shutdown${NC}              — Shutdown all workers"
echo -e "  ${YELLOW}tmux kill-session -t ${TMUX_SESSION}${NC}     — Force kill session"
