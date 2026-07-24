---
description: SVG technical constraints (url(#id) ban, sizing, normalizeSvg) for Marp's nested-SVG rendering context
paths:
  - "**/*.svg"
  - "docs/**/*.md"
  - "docs/**/*.json"
  - "src/utils/svg.ts"
  - "src/generate/markdown.ts"
---

# SVG Constraints — Applies to All SVG Files and Inline SVGs

**`url(#id)` references are globally prohibited.** Marp wraps each slide in `<svg><foreignObject><section>`, creating nested SVG context where all `url(#id)` fragment references (`filter`, `marker-end`, `clip-path`, `linearGradient`) silently break.

| Prohibited | Required replacement |
|-----------|---------------------|
| `<filter id="s">` + `filter="url(#s)"` | `style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"` |
| `<marker id="a">` + `marker-end="url(#a)"` | Explicit `<polygon points="..." fill="..."/>` at line endpoint |
| `fill="url(#g)"` (gradient) | Solid color |

**Required on every SVG root tag:** `viewBox="0 0 W H"` — and nothing else about size.

**Never set `width`, `height`, `max-height` or `max-width` yourself, and never use `vh` units.**
Marp scales the slide with a CSS transform, so `vh` resolves against the *browser window*, not the slide: on a tall window `max-height:70vh` is bigger than the whole slide and caps nothing. This was the single largest source of overflow in this repo (5,397 of 9,619 slides).

**How sizing actually works now (all automatic):**
- `renderSlide()` wraps each diagram in `<div class="fig">`, a flex item on the slide's flex column
- The `.fig` absorbs only the space left over after the title, subtitle, bullets and tables
- The SVG fills that box at `width:100%;height:100%`, and `preserveAspectRatio` letterboxes the drawing inside it — so it scales down instead of overflowing, always

**`normalizeSvg()` behavior (auto-applied by render pipeline, canonical impl in `src/utils/svg.ts`):**
- Removes hardcoded `width` and `height` attributes from `<svg>` tags
- Rewrites the `style` attribute so containment always wins, **preserving** non-sizing declarations you wrote (`filter: drop-shadow(...)`, `font-family`, …)
- Adds `letter-spacing:0` for you — it stops Gaia's `letter-spacing: 1.25px` bleeding into `<text>` labels

**Auto-fix:** `bun scripts/fix-svg-url-refs.ts` scans all `.md`, `.svg` **and `slides-data.json`** under `docs/`. Fixing only the rendered `.md` never stuck — the next `rebuild` regenerated the violation from the JSON source. The script is **not idempotent** (appends another `;letter-spacing:0` per run), so it stays a deliberate, human-invoked step — the PostToolUse hook only reports violations.

**Standalone SVG files:** Place in `assets/`. Reference as `![w:800 center](assets/file.svg)` in the `content` array.

**Never use a base64 data URI** (`![](data:image/svg+xml;base64,…)`). markdown-it rejects `data:` URLs other than gif/png/jpeg/webp, so the directive is not parsed at all and the raw base64 renders as a wall of text. Use an inline `<svg>` or an `assets/*.svg` file. `bun run fix:data-uri` converts existing ones; `bun run validate:quality` flags them.
