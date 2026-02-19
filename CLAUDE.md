# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Recommended Workflow

| Goal | Approach |
|------|----------|
| New presentation | `/create-slides` skill (8-phase: hearing → planning → generation → review → export) |
| Parallel multi-task work | `/agent-teams` skill (tmux-based Claude Code + Codex parallel execution) |
| Manual render/export | See Commands section below |

### Output Path Configuration

When creating `slides.config.yaml` for new presentations:
- Set `output.dir: "docs/<timestamp>_<title>"` (full path from project root)
- Avoid relative paths like `"."` — they resolve from execution directory, not config file location
- The `/create-slides` skill handles this automatically

## Commands

```bash
bun run slides init                     # Create slides.config.yaml template
bun run slides render --in data.json    # Render slide data JSON to Marp markdown
bun run slides export -f html --in FILE # Export Marp markdown to HTML
bun run validate                        # Validate slides-data.json against Zod schema
bun run fix                             # Auto-fix common schema issues in slides-data.json
bun run split                           # Split code/diagrams from content to prevent overflow (all presentations)
bun run fix-svg                         # Fix SVG overflow issues in markdown files
bun run rebuild                         # Re-render & re-export all presentations in docs/
bun run rebuild:render                  # Re-render only (skip export)
bun run rebuild:export                  # Re-export only (skip render)
bun run typecheck                       # Type checking via tsgo (native TS compiler)
bun run check                           # Biome lint + format check
bun run format                          # Auto-format with Biome
bun run spellcheck                      # Spell check via cspell
bun run test                            # Run regression test suite (bun:test)
bun run generate:index                  # Auto-generate index for GitHub Pages
```

**Agent Teams:**
```bash
bun run team <session-id> <workspace> [impl-count] [review-count]  # Setup tmux agent team
bun run team:status <session-id>                                    # Check team status
bun run team:status <session-id> --watch                            # Auto-refresh every 3s
```

CLI supports `-c | --config <path>` to specify config file (default: `slides.config.yaml`).

**Working with project-specific directories:**
When operating on files in `docs/<timestamp>_<title>/`, always specify the config path explicitly:
```bash
bun run slides render -c docs/<dir>/slides.config.yaml --in docs/<dir>/slides-data.json
bun run slides export -c docs/<dir>/slides.config.yaml -f html --in docs/<dir>/file.md
```

## Pre-flight Validation Protocol

**すべてのスライド生成タスクで実行:**

### 1. Schema Loading (最優先)

**slides-data.json 生成前に必ず実行:**

- Read `src/generate/slide-schema.ts`
- 有効なフィールド名を確認: `content` (not `bullets`)
- `layout` の enum 値を確認: `"default" | "center" | "section"`
- オプショナルフィールドを理解: `code`, `codeLanguage`, `speakerNotes`, `layout`

### 2. Directory Structure Validation

**slides.config.yaml 生成時に必ず確認:**

- `output.dir` は**必ず**フルパス: `"docs/<timestamp>_<slug>"`
- 相対パス `"."` や `"./"` は禁止（実行ディレクトリ基準で解決される）
- タイムスタンプ形式: `yyyymmddhhmmss` (14桁)

### 3. Post-Generation Validation

**JSON 書き込み前に:**

- 生成した JSON をスキーマと照合
- エラーがあれば修正して再検証
- 3回失敗したら停止してユーザーに報告

### 4. Common Mistakes to Avoid

- ❌ Using `'bullets'` field → ✅ Use `'content'`
- ❌ Invalid layout values → ✅ Use only: `"default"`, `"center"`, `"section"`
- ❌ Relative paths in output.dir → ✅ Use full path: `"docs/<timestamp>_<slug>"`
- ❌ Missing timestamp prefix → ✅ Use `yyyymmddhhmmss_slug` format
- ❌ CLI flag `--dangerous` → ✅ Use `--dangerously-skip-permissions`
- ❌ Using `mermaid` field in slides-data.json → ✅ Create SVG in `assets/` and reference via `![alt](assets/file.svg)` in `content`
- ❌ Top-level `class:` / `header:` / `footer:` / `style:` in config → ✅ See "slides.config.yaml Format" below

### 5. SVG url(#id) Prohibition — Applies to ALL SVG Files

**This applies to both inline SVGs in markdown AND standalone `.svg` files in `assets/`.**

Marp CLI inlines external SVGs during HTML export, so standalone SVG files end up inside Marp's nested `<svg><foreignObject>` context. Any `url(#id)` references (`filter`, `marker-end`, `clip-path`, `fill` with `linearGradient`) will **silently break** — elements render without shadows, arrows, or gradients.

**After creating or editing any SVG file, verify:**
1. No `url(#` appears anywhere in the file (search with `grep -r "url(#" docs/**/*.svg`)
2. Use CSS `style="filter: drop-shadow(...)"` instead of `<filter>` + `filter="url(#...)"`
3. Use explicit `<polygon>` shapes instead of `<marker>` + `marker-end="url(#...)"`
4. Add `letter-spacing:0` to the root `<svg style="...">` attribute

**Auto-fix:** Run `bun scripts/fix-svg-url-refs.ts` to scan all `.md` and `.svg` files under `docs/` and auto-replace `url(#id)` references.

## slides.config.yaml Format

The config schema (`src/config/schema.ts`) expects Marp options **nested under `marp:`**. Top-level `theme:`, `header:`, `footer:`, `style:`, `paginate:` are stripped by Zod and have no effect.

**Correct format:**
```yaml
topic: "Presentation Title"
language: "ja"

output:
  dir: "docs/20260219120000_my-topic"   # full path, required
  baseName: "my-topic"

marp:
  theme: gaia           # gaia | default | uncover
  paginate: true
  header: "My Header"
  footer: "© 2026"
  style: |
    section pre code {
      font-size: 0.58em;
      line-height: 1.4;
    }
```

**`class` is not in the config schema.** The `class: invert` directive (dark mode) cannot be set via config — it must be manually added to the rendered `.md` front matter (see Post-Render Edits below).

## Post-Render Front Matter Edits

**`bun run slides render` does NOT output `class:` because it is absent from the config schema.**

After every `bun run slides render`, manually edit the generated `.md` front matter if dark mode or custom directives are needed:

```yaml
---
marp: true
theme: gaia
class: invert      # ← add manually for dark mode (gaia invert)
size: 16:9
paginate: true
header: "My Presentation"   # ← add manually if not in marp.header config
footer: "© 2026"            # ← add manually if not in marp.footer config
style: |                    # ← add manually if not in marp.style config
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
---
```

If `marp.header`, `marp.footer`, and `marp.style` are correctly set in `slides.config.yaml` under the `marp:` key, they are rendered automatically. Only `class:` always requires a manual edit.

## Marp-Specific Constraints

**Inline SVG — `url(#id)` references are PROHIBITED:**

Marp wraps each slide in `<svg data-marpit-svg><foreignObject><section>`, creating a nested SVG context. SVG `url(#id)` fragment references (`filter`, `marker-end`, `clip-path`) **fail to resolve** in this context (Chromium browser bug).

| Prohibited (breaks in HTML) | Required (works everywhere) |
|---|---|
| `<filter id="s1">` + `filter="url(#s1)"` | `style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"` |
| `<marker id="a1">` + `marker-end="url(#a1)"` | Explicit `<polygon points="..." fill="..."/>` at line endpoint |

Also add `letter-spacing:0` to each `<svg style="...">` to prevent Gaia theme's `letter-spacing: 1.25px` from being inherited by SVG `<text>` elements.

Run `bun scripts/fix-svg-url-refs.ts` to auto-fix existing SVGs.

**SVG images (standalone files):**

- Standalone SVG files go in `assets/` directory
- **Always use Marp image directive for sizing:** `![w:800 center](assets/filename.svg)`
  - `w:800` sets width to 800px (slide width is 1280px, so ~62%)
  - `center` centers the image horizontally
  - Do NOT use bare `![alt](assets/filename.svg)` without sizing — SVGs may overflow the slide
- In `slides-data.json`, use the same format in `content` arrays: `"![w:800 center](assets/filename.svg)"`
- The render pipeline or `bun run split` inlines SVG content into the markdown for HTML export

**Themes:**

- Always use the theme specified in config
- Don't guess or assume a different theme

## Architecture

Bun 1.3.5 + TypeScript CLI tool for rendering structured slide data into Marp-format markdown. Slide content is generated locally by Claude Code / Codex — no AI SDKs.

**Pipeline:** Slide data JSON (Zod-validated) + YAML config → Marp markdown → HTML/PDF export via Marp CLI.

**Output structure:** Each presentation gets a dedicated directory under `docs/<yyyymmddhhmmss>_<slug>/`. Markdown is rendered directly in this directory. Exports (HTML/PDF/PPTX) go in `dist/` subdirectory. Standalone SVG diagrams go in `assets/`. See `.claude/rules/output-structure.md` for details.

```
docs/20260214073222_example/
├── slides.config.yaml
├── slides-data.json
├── example.md              # render output (baseName from config)
├── assets/                 # standalone SVG diagrams (optional)
│   └── diagram.svg
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

- **Config schema** (`src/config/schema.ts`): Validates `slides.config.yaml`. Every field except `topic` has `.default()`. Nested objects use `.default({})` so partial YAML works. **Unknown top-level keys are stripped** (Zod default behavior — no `.passthrough()`).
- **Slide schema** (`src/generate/slide-schema.ts`): Defines slide data structure. Uses `.describe()` for documentation and `.optional()` for omittable fields.

**Schema change workflow:**
- Changing slide schema → update `src/generate/markdown.ts` + `src/config/defaults.ts` (if affects default style)
- Changing config schema → update `src/config/defaults.ts`
- Consult `.claude/rules/schemas.md` for complete checklist

### Render Pipeline (`src/generate/`)

`pipeline.ts`: read JSON → validate with Zod → render Marp markdown via `markdown.ts` → write file.

`markdown.ts`:
- Build front-matter from `config.marp.*` fields only: `marp: true`, `theme`, `size`, `paginate`, `header`, `footer`, `style`
- `class:` directive is **not in the schema** and is never emitted by the render pipeline
- Render slides (title, bullets, code, speaker notes as HTML comments). Diagrams use inline SVG in rendered markdown
- Insert `---` separators **between slides only** (not after front-matter, to avoid blank slides)

**Critical rendering rule:** Front-matter and first slide are joined with `\n\n` only. Slide separators (`\n\n---\n\n`) are used between slides, never after front-matter.

## Agent Teams

tmux分割ペインで複数AIエージェントを並列起動し、**Claude Code（実装）** と **Codex（レビュー）** の高速サイクルを回す仕組み。

**Use `/agent-teams` skill** for the interactive 6-phase workflow, or run scripts directly:

```bash
bash scripts/setup-agent-team.sh <session-id> <workspace> [impl-count] [review-count]
bash scripts/agent-team-status.sh <session-id> [--watch]
```

### tmux Layout

```
┌──────────────────────────────────────────┐
│            Leader (pane 0)                │
├───────────────────┬──────────────────────┤
│  Impl-1 (pane 1)  │  Impl-2 (pane 2)    │
│  Claude Code       │  Claude Code         │
├───────────────────┼──────────────────────┤
│ Review-1 (pane 3) │ Review-2 (pane 4)    │
│  Codex             │  Codex               │
└───────────────────┴──────────────────────┘
```

### Task Lifecycle

```
pending → in_progress → impl_done → in_review → review_done → completed
                                         ↓
                                    needs_revision → in_progress (cycle++)
```

- **Max cycles**: 3 (prevents infinite revision loops)
- **Review verdict**: `approved` → completed | `needs_revision` → back to impl
- **Shutdown**: `touch .agent-teams/<session-id>/shutdown`

### File-Based Communication

Workspace: `.agent-teams/<session-id>/` (gitignored)

```
.agent-teams/<session-id>/
├── team.json              # Team config metadata
├── tasks/task-NNN.json    # Task definitions + status
├── status/<agent-id>.json # Worker state + heartbeat
├── reviews/task-NNN-review.json  # Review results
└── log/<agent-id>.log     # Activity logs
```

### Key Design Decisions

- **One-shot execution**: Each AI invocation uses `-p` (prompt) mode for a single task; shell wrappers manage the loop
- **`CLAUDECODE=` env clear**: Prevents nested Claude Code sessions when Claude spawns Claude
- **File conflict avoidance**: Each task operates on independent file sets; Leader ensures no overlap
- **2-second polling**: Workers poll task directories every 2s (inotifywait not available)

## Conventions

- **Runtime:** Bun 1.3.5. Use `Bun.file()`, `Bun.write()`, `Bun.spawn()`. Use `node:` prefix for compat modules.
- **Imports:** `.js` extension for `.ts` files (ESM bundler). Biome auto-organizes alphabetically.
- **Formatter:** Biome with tab indentation. Run `bun run format` after editing.
- **Type checker:** `tsgo` from `@typescript/native-preview` (not `tsc`).
- **Language:** Code/comments in English. Default slide output is Japanese (`language: "ja"`).

## Slide Content Constraints

**Content limits** (see `.claude/rules/slide-design.md` Section 8):
- **Bullet points**: max 6-7 items per slide (split 8+ items into 2 slides)
- **Agenda/TOC**: if 8+ sections, split into multiple slides (e.g., "(1/2)" and "(2/2)")
- **Code blocks**: 8 lines recommended, 12 lines max
- **Code + bullets**: 7-10 lines code → max 2 bullets; 11-12 lines code → max 1 bullet
- **Never create blank slides** (page number placeholders, etc.)

**Diagrams: Use inline SVG (not Mermaid) for all visualizations** — flows, architecture, timelines, etc. SVG provides full control over color, layout, and legends. Always include `viewBox` and `style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`. Complex diagrams (8+ nodes) should be alone on slide. Never use `url(#id)` references — see "Marp-Specific Constraints" above.

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


## .claude Directory

- **rules/** — Path-scoped rules auto-loaded when editing matching files:
  - `schemas.md` — Schema change checklist (triggers on `src/config/schema.ts` or `src/generate/slide-schema.ts`)
  - `marp.md` — Marp format rules, code overflow prevention
  - `slide-design.md` — Cognitive load theory, Google best practices, content constraints, **SVG-only policy**
  - `output-structure.md` — Directory structure and file placement rules for presentations
  - `validation.md` — Pre-flight validation checklist (triggers on `slides-data.json` or `slides.config.yaml`)
  - `agent-teams.md` — Workflow templates for batch slide operations (triggers on `docs/**/*`)
- **agents/**:
  - `slide-creator` — Interactive 8-phase slide creation
  - `marp-customizer` — Theme & CSS customization
  - `team-leader` — Agent team task decomposition, assignment, progress management
  - `impl-worker` — Implementation worker (Claude Code prompt-mode execution)
  - `review-worker` — Review worker (Codex full-auto review with JSON verdict)
- **skills/** — Each skill is a directory with `SKILL.md`:
  - `/create-slides` — Interactive creation (recommended)
  - `/generate` — JSON → render → export
  - `/review-slides` — Review & improvement
  - `/ship` — Git commit & push in one command
  - `/agent-teams` — Parallel multi-agent task execution via tmux
  - `/validate` — Schema validation for slide data and config

## Codex Integration

Skill source is versioned in `.codex/skills/` (mirrored from `.claude/skills/`). Install with `bash .codex/install-skills.sh`. Rules and agents in `.codex/rules/` and `.codex/agents/` follow the same patterns as their `.claude/` counterparts.

## PostToolUse Hooks

Safety guardrails configured in `.claude/settings.json` that run automatically:

| Trigger | Action |
|---------|--------|
| Write `slides-data.json` | `bun run validate` — schema validation |
| Any Write/Edit | `bun run format` + `bun run typecheck` (async) |
| HTML export | Check for broken `src="assets/"` paths in `dist/*.html` |
| Write/Edit `.svg` | Check for prohibited `url(#id)` references |
| Write/Edit `docs/**/*.md` | Check for unconverted `` ```mermaid `` blocks |

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

## Automation Workflow

**Preventing content overflow:**
Run `bun run split` to automatically separate code blocks and SVG diagrams from bullet content across all presentations. This prevents slides from overflowing by creating dedicated diagram/code slides.

**Fixing SVG `url(#)` references:**
Run `bun scripts/fix-svg-url-refs.ts` to replace broken `url(#id)` references (filter, marker, clip-path, gradient fill) with CSS `drop-shadow()` and explicit `<polygon>` arrows across all `.md` and `.svg` files under `docs/`. This covers both inline SVGs in markdown and standalone SVG files in `assets/` directories.

**Rebuilding all presentations:**
After structural changes (schema updates, template modifications), use:
- `bun run rebuild` — re-render + re-export all presentations
- `bun run rebuild:render` — re-render only (faster, skips export)
- `bun run rebuild:export` — re-export only (markdown already correct)

## Troubleshooting

**Dark mode / `class: invert` not applied after render:** The `class:` directive is absent from `src/config/schema.ts` and is never written by `buildFrontMatter()`. After `bun run slides render`, manually add `class: invert` to the `.md` front matter before exporting. See "Post-Render Front Matter Edits" section above.

**Header/footer/style not rendered:** These fields only work when placed under the `marp:` key in `slides.config.yaml`, not at the top level. Top-level keys are stripped by Zod schema parsing. See "slides.config.yaml Format" section above.

**Wrong output location:** If files render to wrong directory, verify `output.dir` in config uses full path from project root: `"docs/<timestamp>_<title>"` not relative path `"."`

**Preview:** View exported HTML in browser. VSCode Marp extension (`marp-team.marp-vscode`) can preview `.md` files but HTML export is recommended for final presentation.

**SVG not rendering in HTML export:** If SVG shadows/arrows are missing, the SVG likely uses `url(#id)` references which break inside Marp's foreignObject wrapper. Run `bun scripts/fix-svg-url-refs.ts` to auto-fix, then re-export.

**SVG images not showing in dist/ HTML:** Marp CLI does NOT inline external `<img src="assets/...">` references in HTML output. The export pipeline (`src/export/marp.ts`) automatically rewrites `src="assets/..."` to `src="../assets/..."` in HTML output so that `dist/` files can resolve the relative path. If images still don't show, verify the `assets/` directory exists at the presentation level and re-export.

## Post-Export Verification

**After every HTML export, verify:**

1. No broken asset paths: `grep -rn 'src="assets/' docs/*/dist/*.html` should return nothing
2. No `<p><text>` artifacts (raw SVG leaking into HTML)
3. All `dist/*.html` files reference `../assets/` (not `assets/`)

These checks are enforced automatically by PostToolUse hooks in `.claude/settings.json`.
