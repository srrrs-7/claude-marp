.PHONY: help claude claude-team claude-dangerous claude-team-dangerous

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

claude: ## Launch Claude Code (normal mode)
	claude

claude-team: ## Launch Claude Code with tmux split panes for agent teams
	claude --teammate-mode tmux

claude-dangerous: ## Launch Claude Code in dangerous mode (bypass permissions)
	claude --dangerously-skip-permissions

claude-team-dangerous: ## Launch Claude Code with tmux + dangerous mode
	claude --teammate-mode tmux --dangerously-skip-permissions
