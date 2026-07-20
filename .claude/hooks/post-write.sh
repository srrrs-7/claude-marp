#!/usr/bin/env bash
# PostToolUse dispatcher for Write/Edit.
#
# Why this file exists:
#   A PostToolUse `matcher` is regex-tested against the TOOL NAME only
#   ("Write" / "Edit" / "Bash") — never against the file path. Matchers like
#   "Write.*slides-data\.json" therefore never fire. Path filtering has to
#   happen here, after the hook is already running.
#
#   Tool input arrives as JSON on stdin ({tool_name, tool_input, ...}).
#   There is no $CLAUDE_TOOL_INPUT env var.
#
# Failure mode is deliberately soft: if stdin is not JSON, FILE is empty and
# every branch is skipped — same as the old behaviour, never worse.

set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

INPUT=$(cat 2>/dev/null || true)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)
[ -n "$FILE" ] || exit 0

# Normalise to a repo-relative path when possible.
case "$FILE" in
	"$PWD"/*) REL="${FILE#"$PWD"/}" ;;
	*) REL="$FILE" ;;
esac

fail=0

case "$REL" in
docs/*/slides-data.json)
	bun run validate || fail=1
	COUNT=$(bun -e 'const d=JSON.parse(require("fs").readFileSync(process.argv[1],"utf-8"));console.log(d.slides?d.slides.length:0)' "$REL" 2>/dev/null || echo "?")
	echo "📊 Slide count: $COUNT slides in $REL"
	bun run generate:index >/dev/null 2>&1 || true
	;;
docs/*.json | docs/*/*.json)
	if bun -e 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf-8"))' "$REL" 2>/dev/null; then
		echo "✅ JSON valid: $REL"
	else
		echo "❌ JSON parse error in $REL"
		fail=1
	fi
	;;
esac

# --- SVG url(#id) check -------------------------------------------------
# Report only. The hook deliberately does NOT invoke
# scripts/fix-svg-url-refs.ts: that script appends another
# ";letter-spacing:0" on every run (non-idempotent) and cannot fix
# occurrences it does not recognise, so an auto-fixing hook would mutate the
# repo on every SVG write and still fail.
case "$REL" in
*.svg)
	bun "${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/check-svg-url-refs.ts" || fail=1
	;;
esac

# --- Mermaid residue ----------------------------------------------------
case "$REL" in
docs/*.md | docs/*/*.md)
	FOUND=$(grep -rln '^```mermaid' docs --include='*.md' 2>/dev/null || true)
	if [ -n "$FOUND" ]; then
		echo "⚠️  Unconverted Mermaid blocks found:"
		printf '%s\n' "$FOUND" | head -10
		fail=1
	fi
	;;
esac

# --- slides.config.yaml ------------------------------------------------
# Previously unguarded despite .claude/rules/validation.md requiring it.
case "$REL" in
*slides.config.yaml)
	if bun -e '
		const {parse}=require("yaml");
		const t=require("fs").readFileSync(process.argv[1],"utf-8");
		const y=parse(t);
		if(!y||typeof y.topic!=="string"||!y.topic.trim()) throw new Error("topic is required");
		const dir=y.output&&y.output.dir;
		if(dir && !/^(\/|docs\/)/.test(dir)) throw new Error(`output.dir should be a full path like docs/<timestamp>_<slug> (got "${dir}")`);
		const theme=y.marp&&y.marp.theme;
		if(theme && !["gaia","default","uncover"].includes(theme)) throw new Error(`invalid marp.theme "${theme}"`);
		for(const k of ["theme","header","footer","style","class","paginate"])
			if(Object.hasOwn(y,k)) throw new Error(`"${k}" must be nested under the marp: key, not top level`);
	' "$REL" 2>&1; then
		echo "✅ config valid: $REL"
	else
		echo "❌ invalid $REL"
		fail=1
	fi
	;;
esac

# PostToolUse cannot block — the tool has already run. A non-zero exit only
# surfaces an advisory notice plus the first stderr line.
exit "$fail"
