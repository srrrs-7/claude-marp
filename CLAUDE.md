# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Recommended Workflow

**Use `/create-slides` skill for interactive slide creation** (8-phase workflow: hearing → planning → generation → review → export). This is the recommended approach for new presentations.

For manual workflow or modifications, see Commands section below.

## Commands

```bash
bun run slides init                     # Create slides.config.yaml template
bun run slides render --in data.json    # Render slide data JSON to Marp markdown
bun run slides export -f html --in FILE # Export Marp markdown to HTML
bun run typecheck                       # Type checking via tsgo (native TS compiler)
bun run check                           # Biome lint + format check
bun run format                          # Auto-format with Biome
bun run spellcheck                      # Spell check via cspell
```

CLI supports `-c | --config <path>` to specify config file (default: `slides.config.yaml`).

**Working with project-specific directories:**
When operating on files in `docs/<timestamp>_<title>/`, always specify the config path explicitly:
```bash
bun run slides render -c docs/<dir>/slides.config.yaml --in docs/<dir>/slides-data.json
bun run slides export -c docs/<dir>/slides.config.yaml -f html --in docs/<dir>/file.md
```

No test framework yet. When adding tests, use `bun:test`.

## Architecture

Bun 1.3.5 + TypeScript CLI tool for rendering structured slide data into Marp-format markdown. Slide content is generated locally by Claude Code / Codex — no AI SDKs.

**Pipeline:** Slide data JSON (Zod-validated) + YAML config → Marp markdown → HTML/PDF export via Marp CLI.

**Output structure:** Each presentation gets a dedicated directory under `docs/<yyyymmddhhmmss>_<title>/`. Markdown is rendered directly in this directory. Exports (HTML/PDF/PPTX) go in `dist/` subdirectory. See `.claude/rules/output-structure.md` for details.

```
docs/20260214073222_example/
├── slides.config.yaml
├── slides-data.json
├── example.md              # render output
└── dist/
    └── example.html        # export output
```

### Key Source Modules

- `src/index.ts` — Entry point (`#!/usr/bin/env bun`)
- `src/cli/commands.ts` — Command parser & handlers (init, render, export)
- `src/config/` — Config loading: `schema.ts` (Zod), `defaults.ts` (YAML template), `loader.ts` (parse)
- `src/generate/` — Render pipeline: `slide-schema.ts` (Zod), `pipeline.ts` (orchestration), `markdown.ts` (Marp output)
- `src/export/marp.ts` — Spawns `bunx @marp-team/marp-cli` for HTML/PDF/PPTX export
- `src/utils/files.ts` — `slugify()`, `ensureDir()`

### Two-Layer Zod Schema Design

- **Config schema** (`src/config/schema.ts`): Validates `slides.config.yaml`. Every field except `topic` has `.default()`. Nested objects use `.default({})` so partial YAML works.
- **Slide schema** (`src/generate/slide-schema.ts`): Defines slide data structure. Uses `.describe()` for documentation and `.optional()` for omittable fields.

**Schema change workflow:**
- Changing slide schema → update `src/generate/markdown.ts` + `src/config/defaults.ts` (if affects default style)
- Changing config schema → update `src/config/defaults.ts`
- Consult `.claude/rules/schemas.md` for complete checklist

### Render Pipeline (`src/generate/`)

`pipeline.ts`: read JSON → validate with Zod → render Marp markdown via `markdown.ts` → write file.

`markdown.ts`:
- Build front-matter (`marp: true`, theme, directives, **custom styles**)
- Render slides (title, bullets, code, mermaid, speaker notes as HTML comments)
- Insert `---` separators **between slides only** (not after front-matter, to avoid blank slides)

**Critical rendering rule:** Front-matter and first slide are joined with `\n\n` only. Slide separators (`\n\n---\n\n`) are used between slides, never after front-matter.

## Conventions

- **Runtime:** Bun 1.3.5. Use `Bun.file()`, `Bun.write()`, `Bun.spawn()`. Use `node:` prefix for compat modules.
- **Imports:** `.js` extension for `.ts` files (ESM bundler). Biome auto-organizes alphabetically.
- **Formatter:** Biome with tab indentation. Run `bun run format` after editing.
- **Type checker:** `tsgo` from `@typescript/native-preview` (not `tsc`).
- **Language:** Code/comments in English. Default slide output is Japanese (`language: "ja"`).

## Slide Content Constraints

**Code block overflow prevention** (enforced in `slides.config.yaml` default style):
```yaml
style: |
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
```

**Content limits** (see `.claude/rules/slide-design.md` Section 8):
- **Bullet points**: max 6-7 items per slide (split 8+ items into 2 slides)
- **Agenda/TOC**: if 8+ sections, split into multiple slides (e.g., "(1/2)" and "(2/2)")
- **Code blocks**: 8 lines recommended, 12 lines max
- **Code + bullets**: 7-10 lines code → max 2 bullets; 11-12 lines code → max 1 bullet
- **Never create blank slides** (page number placeholders, etc.)

**Mermaid diagrams:** Use for visualizing flows, architecture, timelines. Complex diagrams (8+ nodes) should be alone on slide.

**References and citations:**
- Use Markdown link format: `[Title](URL)`
- Split into 2 slides if 6+ URLs (5-6 items per slide)
- Organize by category: Research/Data, Official Tools, Guides, Security
- Example:
  ```markdown
  - **Research & Data:**
  - [GitHub Copilot Study (2022)](https://github.blog/...)
  - **Official Tools:**
  - [GitHub Copilot](https://github.com/features/copilot)
  ```

## Slide Expansion Best Practices

When expanding presentations (e.g., 12 → 38 slides):
- Add concrete examples: tool comparisons, code samples, checklists
- Include real data: research findings (with citations), case studies
- Balance sections: intro (3), main content (30), conclusion (5)
- One slide per key concept; avoid information overload
- Add "Today's Action Items" slide for practical takeaways

## .claude Directory

- **rules/** — Path-scoped rules auto-loaded when editing matching files:
  - `schemas.md` — Schema change checklist (triggers when editing `src/config/schema.ts` or `src/generate/slide-schema.ts`)
  - `marp.md` — Marp format rules, code overflow prevention
  - `slide-design.md` — Cognitive load theory, Google best practices, content constraints
  - `output-structure.md` — Directory structure and file placement rules for presentations
- **agents/** — `slide-creator` (interactive 8-phase slide creation), `marp-customizer` (theme & CSS customization)
- **skills/** — Each skill is a directory with `SKILL.md`:
  - `/create-slides` — Interactive creation (recommended)
  - `/generate` — JSON → render → export
  - `/review-slides` — Review & improvement

## Theme Selection

| Theme | Style | Best For |
|-------|-------|----------|
| `gaia` | Colorful, bold | Tech conferences, study groups, LT |
| `gaia` + `invert` | Dark mode | Code-heavy, night events |
| `default` | White, calm | Business reports, proposals |
| `uncover` | Minimal | Design, academic |

## Constraints

- **PDF export:** Requires Chromium. HTML is the primary format.
- **No blank slides:** Every slide must have content (title + bullets/code/diagram)

## Maintenance & Fixes

**Fixing content overflow issues:**
When slides have too many bullets (8+ items on agenda/TOC):
1. Edit markdown: Split into 2 slides with "(1/2)" and "(2/2)" suffixes
2. Re-export to HTML:
   ```bash
   bun run slides export -c docs/<dir>/slides.config.yaml -f html --in docs/<dir>/<file>.md
   ```

**Bulk re-export after fixes:**
```bash
# Re-export specific presentations
for dir in docs/20260214073222_* docs/20260214082958_*; do
  bun run slides export -c $dir/slides.config.yaml -f html --in $dir/*.md
done
```

**Finding presentations with overflow issues:**
Use the Explore agent to search for agenda/TOC slides with 8+ items, then fix and re-export.

## Troubleshooting

**Nested directory structure after export:**
If `docs/<timestamp>_<title>/docs/` is created (nested `docs/`), remove it:
```bash
rm -rf docs/<timestamp>_<title>/docs
```
Correct structure should be:
```
docs/<timestamp>_<title>/
├── slides-data.json
├── slides.config.yaml
├── <name>.md
└── dist/
    └── <name>.html
```

**VSCode Marp preview not working:**
- Install "Marp for VS Code" extension, OR
- View exported HTML in browser (recommended for final presentation)
