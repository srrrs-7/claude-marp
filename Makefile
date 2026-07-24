# ============================================================================
# Host-side Claude × container-side runtime (see CLAUDE.md "Development
# Environment" section).
#
# Claude Code runs on the HOST. Every bun/runtime command (format, test,
# build, render, export, validate, ...) runs INSIDE the devcontainer via
# `docker-compose run --rm`. The devcontainer's own compose.yaml/Dockerfile
# are reused as-is — there is deliberately no separate root compose file.
#
# The compose project name matches what VS Code Dev Containers uses
# ("<folder>_devcontainer") so the image, network and a running devcontainer
# are shared instead of duplicated.
# ============================================================================

COMPOSE      ?= docker-compose
COMPOSE_FILE := .devcontainer/compose.yaml
PROJECT      ?= $(shell basename "$(CURDIR)" | tr '[:upper:]' '[:lower:]')_devcontainer
SERVICE      := dev
DC           := $(COMPOSE) -p $(PROJECT) -f $(COMPOSE_FILE)

# Pick the cheapest working execution path, in order:
#   1. Already inside the devcontainer  -> run the command directly
#   2. Devcontainer running on the host -> `exec` into it (no cold start)
#   3. Nothing running                  -> one-off `run --rm` container
# EXEC is for non-interactive commands (-T: safe under hooks/CI without a
# TTY); EXEC_IT keeps the TTY for `make shell`.
ifneq ($(wildcard /.dockerenv),)
  EXEC    :=
  EXEC_IT :=
else ifneq ($(strip $(shell $(DC) ps -q $(SERVICE) 2>/dev/null)),)
  EXEC    := $(DC) exec -T $(SERVICE)
  EXEC_IT := $(DC) exec $(SERVICE)
else
  EXEC    := $(DC) run --rm -T $(SERVICE)
  EXEC_IT := $(DC) run --rm $(SERVICE)
endif

.DEFAULT_GOAL := help

.PHONY: help setup-hooks claude \
	build up down shell run bun install \
	format check typecheck test spellcheck \
	validate quality lint fix fix-all \
	rebuild rebuild-render rebuild-export single \
	stats doctor index

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# --- Host-only helpers ------------------------------------------------------

setup-hooks: ## Install git hooks from scripts/hooks/
	@echo "🔗 Installing git hooks..."
	@cp scripts/hooks/pre-push .git/hooks/pre-push
	@chmod +x .git/hooks/pre-push
	@echo "✅ Git hooks installed"

claude: ## Launch Claude Code on the host (normal mode)
	claude --teammate-mode tmux --dangerously-skip-permissions

# --- Container lifecycle ----------------------------------------------------

build: ## Build the devcontainer image (shared with VS Code Dev Containers)
	$(DC) build $(SERVICE)

up: ## Start the devcontainer in the background (later `make` calls use fast `exec`)
	$(DC) up -d $(SERVICE)

down: ## Stop the devcontainer (also kills a VS Code-attached session!)
	$(DC) down

shell: ## Open an interactive bash inside the container
	$(EXEC_IT) bash

# --- Generic passthrough ----------------------------------------------------

run: ## Run any command in the container: make run CMD="ls dist"
	@test -n "$(CMD)" || { echo 'usage: make run CMD="<command>"'; exit 2; }
	$(EXEC) $(CMD)

bun: ## Run any bun command in the container: make bun ARGS="run stats -- --worst"
	@test -n "$(ARGS)" || { echo 'usage: make bun ARGS="<bun args>"'; exit 2; }
	$(EXEC) bun $(ARGS)

install: ## bun ci in the container (node_modules gets Linux binaries)
	$(EXEC) bun ci

# --- Code quality (bun run <script> in the container) -----------------------

format: ## Biome auto-format
	$(EXEC) bun run format

check: ## Biome lint + format check
	$(EXEC) bun run check

typecheck: ## tsgo --noEmit
	$(EXEC) bun run typecheck

test: ## bun test (all regression tests)
	$(EXEC) bun run test

spellcheck: ## cspell across all files
	$(EXEC) bun run spellcheck

# --- Slide quality gate -----------------------------------------------------

validate: ## Validate all slides-data.json (Zod schema)
	$(EXEC) bun run validate

quality: ## Quality check (assertive titles, subtitle coverage, SVG ratio)
	$(EXEC) bun run validate:quality

lint: ## validate + validate:quality
	$(EXEC) bun run lint

fix: ## Auto-fix common schema issues
	$(EXEC) bun run fix

fix-all: ## Full auto-fix chain (fix → data-uri → split → svg → index)
	$(EXEC) bun run fix:all

# --- Build / render ---------------------------------------------------------

rebuild: ## Re-render + re-export all presentations (incremental)
	$(EXEC) bun run rebuild

rebuild-render: ## Re-render only (parallel)
	$(EXEC) bun run rebuild:render

rebuild-export: ## Re-export only (sequential — Marp CLI constraint)
	$(EXEC) bun run rebuild:export

single: ## One deck render+export: make single DECK=<partial-name> [MODE=render|export|all]
	@test -n "$(DECK)" || { echo 'usage: make single DECK=<partial-name> [MODE=render|export|all]'; exit 2; }
	$(EXEC) bun run single $(DECK) $(MODE)

# --- Reporting --------------------------------------------------------------

stats: ## Quality statistics (SVG %, assertive %, grades)
	$(EXEC) bun run stats

doctor: ## Project health check
	$(EXEC) bun run doctor

index: ## Regenerate docs/index.html (bookshelf UI)
	$(EXEC) bun run generate:index
