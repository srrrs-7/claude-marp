#!/usr/bin/env bash
# PreToolUse guard for the Bash tool: bun NEVER runs on the host.
#
# Why (strict rule, 2026-07-25): Shai-Hulud-style npm supply-chain worms
# execute install scripts with the invoking user's credentials. On the host
# that means ~/.ssh, keychains and cloud credentials; inside the devcontainer
# the blast radius ends at the container. bunfig.toml's minimumReleaseAge=21
# and the OSV install scanner are other layers of the same defence.
# CLAUDE.md documents the rule; this hook enforces it (exit 2 blocks the call).
#
# Allowed:  inside the container (/.dockerenv), and commands already routed
#           through docker-compose (the sanctioned container path; `make`
#           targets contain no raw bun token, so they pass tier 1 and 2).
# Blocked:  bun/bunx (and npm/npx/yarn/pnpm) at a command position on the
#           host, plus install-class invocations anywhere in the line.
#           Deliberately over-blocks quoted text like `echo "bun install"` —
#           a false positive is a rephrase; a false negative is an install.
set -uo pipefail

[ -f /.dockerenv ] && exit 0

INPUT=$(cat 2>/dev/null || true)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null || true)
[ -n "$CMD" ] || exit 0

case "$CMD" in
*docker-compose* | *"docker compose"*) exit 0 ;;
esac

deny() {
	echo "BLOCKED by .claude/hooks/pre-bash-guard.sh: bun / package-manager commands never run on the host (Shai-Hulud supply-chain rule — see CLAUDE.md 'Security')." >&2
	echo "Run it in the container instead: make <target>, make bun ARGS=\"...\", or make run CMD=\"...\"" >&2
	exit 2
}

# Tier 1: bun/bunx/npm/npx/yarn/pnpm at a command position
# (line start or after ; & | ( or backtick, optionally path-prefixed)
if printf '%s\n' "$CMD" | grep -qE '(^|[;&|(`])[[:space:]]*([^[:space:]]*/)?(bun|bunx|npm|npx|yarn|pnpm)([[:space:]]|$)'; then
	deny
fi

# Tier 2: install-class invocations anywhere in the line (defence in depth —
# catches `FOO=1 bun install`, `xargs bunx`, etc. that tier 1 misses)
if printf '%s\n' "$CMD" | grep -qE '(^|[^[:alnum:]_.-])(bun|npm|yarn|pnpm)[[:space:]]+(install|add|ci|update|upgrade|pm)([[:space:]]|$)|(^|[^[:alnum:]_.-])(bunx|npx)([[:space:]]|$)'; then
	deny
fi

exit 0
