.PHONY: help setup-hooks claude claude-team claude-dangerous claude-team-dangerous

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup-hooks: ## Install git hooks from scripts/hooks/
	@echo "🔗 Installing git hooks..."
	@cp scripts/hooks/pre-push .git/hooks/pre-push
	@chmod +x .git/hooks/pre-push
	@echo "✅ Git hooks installed"

claude: ## Launch Claude Code (normal mode)
	claude --teammate-mode tmux --dangerously-skip-permissions
