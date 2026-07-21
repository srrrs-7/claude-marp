#!/usr/bin/env bash
# topdf.sh <input.html> <output.pdf>
#
# Prints a self-contained HTML booklet (from build-exam.ts) to PDF via headless
# Chromium. No Node/puppeteer dependency — it drives a Chromium binary directly.
#
# Chromium is located, in order:
#   1. $CHROME_BIN                          (explicit override)
#   2. $PLAYWRIGHT_BROWSERS_PATH/**         (headless_shell / chrome)
#   3. ~/.cache/ms-playwright/**            (default Playwright install location)
#   4. chromium / chromium-browser / google-chrome / chrome on PATH
#
# If none is found, install one (outside the repo so it stays out of git status):
#   PLAYWRIGHT_BROWSERS_PATH="$HOME/.cache/ms-playwright" bunx playwright install chromium
# On this machine you also need CJK fonts for Japanese booklets:
#   sudo apt-get install -y fonts-noto-cjk fontconfig
set -euo pipefail

IN="${1:-}"; OUT="${2:-}"
if [ -z "$IN" ] || [ -z "$OUT" ]; then
  echo "usage: topdf.sh <input.html> <output.pdf>" >&2
  exit 2
fi

find_chrome() {
  if [ -n "${CHROME_BIN:-}" ] && [ -x "${CHROME_BIN}" ]; then
    echo "$CHROME_BIN"; return 0
  fi
  local dir
  for dir in "${PLAYWRIGHT_BROWSERS_PATH:-}" "$HOME/.cache/ms-playwright"; do
    [ -n "$dir" ] && [ -d "$dir" ] || continue
    local bin
    bin="$(find "$dir" -type f \( -name 'headless_shell' -o -name 'chrome' \) 2>/dev/null | head -1)"
    [ -n "$bin" ] && { echo "$bin"; return 0; }
  done
  local c
  for c in chromium chromium-browser google-chrome google-chrome-stable chrome; do
    if command -v "$c" >/dev/null 2>&1; then command -v "$c"; return 0; fi
  done
  return 1
}

CHROME="$(find_chrome || true)"
if [ -z "$CHROME" ]; then
  cat >&2 <<'EOF'
no Chromium binary found. Install one (outside the repo):
  PLAYWRIGHT_BROWSERS_PATH="$HOME/.cache/ms-playwright" bunx playwright install chromium
and for Japanese booklets:
  sudo apt-get install -y fonts-noto-cjk fontconfig
Then re-run, or point CHROME_BIN=/path/to/chromium at it.
EOF
  exit 1
fi

ABS_IN="$(readlink -f "$IN")"
"$CHROME" --headless --disable-gpu --no-sandbox \
  --print-to-pdf="$OUT" --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=25000 \
  "file://$ABS_IN" 2>/dev/null

if [ -f "$OUT" ]; then
  echo "PDF: $OUT ($(du -h "$OUT" | cut -f1))"
else
  echo "FAILED to produce $OUT" >&2
  exit 1
fi
