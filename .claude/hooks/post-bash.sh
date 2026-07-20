#!/usr/bin/env bash
# PostToolUse dispatcher for Bash.
#
# The old matcher "Bash.*export.*-f html" never fired: matchers are tested
# against the tool NAME ("Bash"), not the command string. The command text
# has to be pulled off stdin here instead.

set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

INPUT=$(cat 2>/dev/null || true)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null || true)
[ -n "$CMD" ] || exit 0

case "$CMD" in
*export*-f\ html* | *export*--format\ html*) ;;
*) exit 0 ;;
esac

# Marp CLI does not inline external <img src="assets/">; fixAssetPaths()
# rewrites them to ../assets/. A surviving src="assets/ means the rewrite
# was skipped and images will 404 in dist/.
BROKEN=$(grep -rln 'src="assets/' docs --include='*.html' 2>/dev/null || true)
if [ -n "$BROKEN" ]; then
	echo "⚠️  Broken asset paths in exported HTML:"
	printf '%s\n' "$BROKEN" | head -10
	exit 1
fi
echo "✅ Asset paths OK"
