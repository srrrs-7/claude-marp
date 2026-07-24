---
description: Slide JSON schema, content rendering behavior, chunked generation protocol, and content-volume constraints
paths:
  - "**/slides-data.json"
  - "docs/**/*.json"
  - "src/generate/**"
---

# Slide Generation — Critical Rules

## Schema (read `src/generate/slide-schema.ts` before generating)

```typescript
// One slide object — exact field names
{
  title: z.string(),              // Required
  subtitle: z.string().optional(),// BLUF one-liner → rendered as `> *subtitle*`
  content: z.array(z.string()),   // Required — field name is "content", NOT "bullets"
  code: z.string().optional(),
  codeLanguage: z.string().optional(),
  speakerNotes: z.string().optional(),
  layout: z.enum(["default", "center", "section"]).optional()
}
```

## Content rendering behavior (`src/generate/markdown.ts`)

`content` is split into **blocks**, separated by blank lines. Consecutive items of the same kind form one block:

- Items starting with `|` → one Markdown table
- Items starting with `![` → a standalone image paragraph
- Items starting with `<svg` → wrapped in `<div class="fig">` (an SVG may span several items, one per line — the run is consumed to `</svg>`)
- Everything else → bullet points, prefixed with `- `
- An item that **already** starts with a list marker (`- `, `* `, `1. `) is emitted as-is, not prefixed again
- Blank items are dropped — they used to render as an empty bullet costing a full line

> The blank line between blocks is load-bearing. Emitting every item as one run made markdown treat anything after a bullet as a *lazy continuation* of that list item: tables rendered as literal `| a | b |` text inside a `<li>`, and diagrams ended up nested in a list where the layout could not size them.

- `"center"` and `"section"` layouts both emit `<!-- _class: lead -->` before the title
- Use `"![w:800 center](assets/file.svg)"` in `content` for standalone SVG files
- A `fit-NN` class may be added alongside — see Auto-fit in `.claude/rules/marp.md`

## Pipeline (never skip steps)

```
outline → config YAML → JSON data (Write tool) → validate → render → add class:invert → export HTML
```

## Chunked generation for 30+ slide decks (mandatory)

> SVG-heavy decks (≥50% of slides have SVG) — use **15-slide** chunks, not 20, to avoid SVG token bloat.

```
Chunk 1 (slides 1-15)  → Write to slides-data-part1.json
Chunk 2 (slides 16-30) → Write to slides-data-part2.json
Chunk 3 (slides 31-45) → Write to slides-data-part3.json
Merge: { "slides": [...part1.slides, ...part2.slides, ...part3.slides] } → Write to slides-data.json
Delete: slides-data-part*.json
Verify: bun -e "const d=JSON.parse(require('fs').readFileSync('slides-data.json','utf-8')); console.log('Slides:', d.slides.length)"
```

## Content-volume constraints

- **Bullet points:** max 6-7 per slide; split 8+ items into two slides (`bun run split:bullets`)
- **Agenda/TOC:** if 8+ sections, split into "(1/2)" and "(2/2)" slides
- **Code blocks:** 8 lines recommended, 12 lines absolute max
- **Code + bullets:** 7-10 code lines → max 2 bullets; 11-12 code lines → max 1 bullet (`bun run split`)
- **Never create blank slides** (no page-number placeholders)
- **Figure-first principle:** Use inline SVG for all flows, architecture, timelines, comparisons. Target ≥50% of slides with SVG. Avoid 2+ consecutive text-only slides.

## Common mistakes

| Wrong | Correct |
|-------|---------|
| `"bullets"` field | `"content"` field |
| `layout: "custom"` | `"default"`, `"center"`, or `"section"` only |
| Relative `output.dir: "."` | Full path: `"docs/20260214073222_slug"` |
| JSON output inline | Write tool to file |
| `--dangerous` flag | `--dangerously-skip-permissions` |
| `mermaid` field in JSON | SVG in `assets/` referenced via `![](assets/file.svg)` in `content` |
| Top-level `theme:`, `header:`, `footer:`, `style:` in config | Must be nested under `marp:` key |
