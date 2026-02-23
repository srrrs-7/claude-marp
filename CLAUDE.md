# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Output Size Management — 32K Token Error Prevention

**Root cause:** `API Error: Claude's response exceeded the 32000 output token maximum` occurs when large content (slide JSON with SVGs, CLAUDE.md generation, etc.) is output inline in the response instead of written to file.

**Universal rule: ANY output > ~2KB must be written using the Write tool, never output inline.**

| Scenario | Action |
|----------|--------|
| Slide JSON (any size) | `Write` tool → `slides-data.json` |
| Chunked slide JSON | `Write` tool → `slides-data-part{N}.json` → merge → delete chunks |
| Updating CLAUDE.md | `Write` tool → `CLAUDE.md` |
| Large SVG files | `Write` tool → `assets/filename.svg` |
| Any response that may exceed 2KB | Use Write tool instead of inline output |

**Environment variable:** If responses still exceed the limit, set `CLAUDE_CODE_MAX_OUTPUT_TOKENS` to a higher value. The default cap is 32000 tokens.

**Chunked generation for 30+ slide decks (mandatory):**
> SVG-heavy decks (≥50% of slides have SVG) — use **15-slide** chunks, not 20, to avoid SVG token bloat.

```
Chunk 1 (slides 1-20)  → Write to slides-data-part1.json
Chunk 2 (slides 21-40) → Write to slides-data-part2.json
Chunk 3 (slides 41-60) → Write to slides-data-part3.json
Merge: { "slides": [...part1.slides, ...part2.slides, ...part3.slides] } → Write to slides-data.json
Delete: slides-data-part*.json
Verify: bun -e "const d=JSON.parse(require('fs').readFileSync('slides-data.json','utf-8')); console.log('Slides:', d.slides.length)"
```

---

## Interview-First Policy

**Applied to all task interactions — complete before executing any task.**

Ask one question at a time. Do not proceed without explicit approval ("OK", "続けて", "next").

**Layer 1 — Required for all tasks (ask only unknown items):**

| Item | Example question |
|------|-----------------|
| Goal | このタスクで達成したいことは何ですか？ |
| Scope | 対象ファイル・範囲・制約はありますか？ |
| Output format | 最終的な成果物の形式・品質基準は？ |
| Constraints | 時間・スタイル・既存の決定事項はありますか？ |

**Layer 2:** After each answer, analyze for new unknowns. Ask one follow-up if any exist.

**`/create-slides` additional required items:** topic, audience, slide count, theme (gaia/default/uncover), language (ja/en).

**Completion:** Present a summary of all collected information → wait for explicit user approval → then execute.

**Shorthand — interpret immediately, NEVER ask for clarification:**

| User says | Interpretation |
|-----------|---------------|
| `"60more"`, `"60slides"`, `"100+"`, `"60枚"` | Target slide count = that number — start generating |
| `"全部並列"`, `"all at once"`, `"parallel"`, `"同時"` | Spawn all workers simultaneously in one message |
| `"続けて"`, `"continue"`, `"next"`, `"go"` | Proceed to next phase without asking |
| A number alone in slide context | Target slide count |
| `"all N topics"` / `"全N個"` | Create all N presentations in parallel |

> These shorthands exist because asking for clarification on them caused repeated session delays. Treat them as unambiguous commands.

---

## Slide Generation — Critical Rules

### Schema (read `src/generate/slide-schema.ts` before generating)

```typescript
// One slide object — exact field names
{
  title: z.string(),              // Required
  content: z.array(z.string()),   // Required — field name is "content", NOT "bullets"
  code: z.string().optional(),
  codeLanguage: z.string().optional(),
  speakerNotes: z.string().optional(),
  layout: z.enum(["default", "center", "section"]).optional()
}
```

### Content rendering behavior (`src/generate/markdown.ts`)

- Items starting with `|` → rendered verbatim (Markdown table rows)
- Items starting with `![` → rendered verbatim (image directives)
- All other items → prefixed with `- ` (bullet points)
- `"center"` and `"section"` layouts both emit `<!-- _class: lead -->` before the title
- Use `"![w:800 center](assets/file.svg)"` in `content` for standalone SVG files

### Pipeline (never skip steps)

```
outline → config YAML → JSON data (Write tool) → validate → render → add class:invert → export HTML
```

### Common mistakes

| Wrong | Correct |
|-------|---------|
| `"bullets"` field | `"content"` field |
| `layout: "custom"` | `"default"`, `"center"`, or `"section"` only |
| Relative `output.dir: "."` | Full path: `"docs/20260214073222_slug"` |
| JSON output inline | Write tool to file |
| `--dangerous` flag | `--dangerously-skip-permissions` |
| `mermaid` field in JSON | SVG in `assets/` referenced via `![](assets/file.svg)` in `content` |
| Top-level `theme:`, `header:`, `footer:`, `style:` in config | Must be nested under `marp:` key |

---

## SVG Constraints — Applies to All SVG Files and Inline SVGs

**`url(#id)` references are globally prohibited.** Marp wraps each slide in `<svg><foreignObject><section>`, creating nested SVG context where all `url(#id)` fragment references (`filter`, `marker-end`, `clip-path`, `linearGradient`) silently break.

| Prohibited | Required replacement |
|-----------|---------------------|
| `<filter id="s">` + `filter="url(#s)"` | `style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"` |
| `<marker id="a">` + `marker-end="url(#a)"` | Explicit `<polygon points="..." fill="..."/>` at line endpoint |
| `fill="url(#g)"` (gradient) | Solid color |

**Required on every SVG root tag:**
```
viewBox="0 0 W H"
style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"
```

**`normalizeSvg()` behavior (auto-applied by render pipeline):**
- Removes hardcoded `width` and `height` attributes from `<svg>` tags
- Injects `max-height:70vh;max-width:100%;display:block;margin:0 auto;` if style is absent or lacks both properties
- Does **not** add `letter-spacing:0` — you must include this manually to prevent Gaia theme's `letter-spacing: 1.25px` from bleeding into SVG text

**Auto-fix:** `bun scripts/fix-svg-url-refs.ts` scans all `.md` and `.svg` under `docs/`

**Standalone SVG files:** Place in `assets/`. Reference as `![w:800 center](assets/file.svg)` in `content` array.

---

## slides.config.yaml Format

```yaml
topic: "Presentation Title"
language: "ja"

slides:
  count: 30        # max 200

output:
  dir: "docs/20260219120000_my-topic"   # full path from project root, required
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

**`class:` is absent from the config schema** — never emitted by the render pipeline. After every `bun run slides render`, manually add to the generated `.md` front matter:

```yaml
---
marp: true
theme: gaia
class: invert      # ← add manually for dark mode (gaia invert)
size: 16:9
---
```

---

## Commands

```bash
bun run slides init                     # Create slides.config.yaml template
bun run slides render -c <config> --in <data.json>          # Render JSON → Marp markdown
bun run slides export -c <config> -f html --in <file.md>    # Export markdown → HTML
bun run validate                        # Validate all slides-data.json (Zod schema)
bun run fix                             # Auto-fix common schema issues
bun run split                           # Split code/diagrams to prevent overflow (all)
bun run fix-svg                         # Fix SVG overflow issues in markdown files
bun run rebuild                         # Re-render + re-export all presentations
bun run rebuild:render                  # Re-render only
bun run rebuild:export                  # Re-export only
bun run typecheck                       # tsgo (native TS compiler, not tsc)
bun run check                           # Biome lint + format check
bun run format                          # Auto-format with Biome
bun run test                            # Regression tests (bun:test)
bun run generate:index                  # Regenerate docs/index.html for GitHub Pages
bun scripts/fix-svg-url-refs.ts        # Fix url(#id) violations across all SVGs/markdown
```

**Always pass `-c` when working with specific presentations:**
```bash
bun run slides render -c docs/<dir>/slides.config.yaml --in docs/<dir>/slides-data.json
bun run slides export -c docs/<dir>/slides.config.yaml -f html --in docs/<dir>/<name>.md
```

**Agent Teams:**
```bash
bun run team <session-id> <workspace> [impl-count] [review-count]
bun run team:status <session-id> [--watch]
```

---

## Architecture

Bun 1.3.5 + TypeScript CLI. No AI SDKs — slide content is generated externally by Claude Code / Codex.

**Pipeline:** `slides-data.json` (Zod-validated) + `slides.config.yaml` → Marp `.md` → HTML/PDF via `bunx @marp-team/marp-cli`

**Output structure:**
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

**Key source modules:**

| File | Purpose |
|------|---------|
| `src/index.ts` | Entry point (`#!/usr/bin/env bun`) |
| `src/cli/commands.ts` | `init`, `render`, `export` command handlers |
| `src/config/schema.ts` | Zod config schema — strips unknown top-level keys (no `.passthrough()`) |
| `src/config/defaults.ts` | Default YAML template written by `init` command |
| `src/config/loader.ts` | YAML parse + Zod validate config file |
| `src/generate/slide-schema.ts` | Zod slide data schema |
| `src/generate/pipeline.ts` | JSON read → validate → `renderMarpMarkdown()` → write `.md` |
| `src/generate/markdown.ts` | `buildFrontMatter()` + `renderSlide()` → Marp markdown string |
| `src/export/marp.ts` | Spawn `bunx @marp-team/marp-cli`; `fixAssetPaths()` rewrites `src="assets/"` → `src="../assets/"` in `dist/*.html` |
| `src/utils/files.ts` | `slugify()` (max 60 chars), `ensureDir()` |

**Two-layer Zod schema design:**
- Config schema: every field except `topic` has `.default()`. Nested objects use `.default({})`.
- Slide schema: `.describe()` for documentation, `.optional()` for omittable fields.

**Schema change checklist:** Config changes → also update `src/config/defaults.ts`. Slide schema changes → also update `src/generate/markdown.ts`.

**Critical rendering rule:** Front-matter + first slide joined with `\n\n` only. Slide separator `\n\n---\n\n` used between slides only, never after front-matter.

---

## Slide Content Constraints

- **Bullet points:** max 6-7 per slide; split 8+ items into two slides
- **Agenda/TOC:** if 8+ sections, split into "(1/2)" and "(2/2)" slides
- **Code blocks:** 8 lines recommended, 12 lines absolute max
- **Code + bullets:** 7-10 code lines → max 2 bullets; 11-12 code lines → max 1 bullet
- **Never create blank slides** (no page-number placeholders)
- **Figure-first principle:** Use inline SVG for all flows, architecture, timelines, comparisons. Target ≥50% of slides with SVG. Avoid 2+ consecutive text-only slides.

---

## Parallel Task Execution

**CRITICAL — Worker agents do NOT inherit the parent session's permission grants.**
Text in the agent prompt ("you have full permissions") does nothing. Permissions are granted only via the Task tool's `mode` parameter.

| Task tool parameter | Required value | Effect |
|--------------------|---------------|--------|
| `mode` | `"bypassPermissions"` | Grants Bash/Write/Read/Edit/Glob without prompts |
| `run_in_background` | `true` | Enables parallel execution |

**Failure symptom:** worker stalls or falls back to sequential = `mode: "bypassPermissions"` was not set.

Also include in each agent prompt (belt-and-suspenders):
> "You have full permissions to use Bash, Write, Read, Edit, and Glob tools."

**File isolation:** Assign non-overlapping output files (`slides-data-part1.json`, `part2.json`, …) to each worker. Overlapping slide ranges → Marp CLI cache conflict → silent corruption.

**Wave-based execution for 10+ workers:** batch into waves of 5-7; wait for all to complete before launching the next wave.

**Always run `bun run slides export` sequentially** (not in parallel) to avoid Marp CLI cache conflicts.

---

## PostToolUse Hooks (`.claude/settings.json`)

| Trigger | Action |
|---------|--------|
| Write `slides-data.json` | `bun run validate` |
| Any Write/Edit | `bun run format` + `bun run typecheck` (async) |
| HTML export | Check for broken `src="assets/"` in `dist/*.html` |
| Write/Edit `.svg` | Check for `url(#id)` violations |
| Write/Edit `docs/**/*.md` | Check for unconverted `` ```mermaid `` blocks |

**Environment variables set in `.claude/settings.json`:**
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — enables Agent Teams feature

---

## Agent Teams

tmux-based parallel execution: Claude Code (impl) + Codex (review) workers in split panes.

**Task lifecycle:** `pending → in_progress → impl_done → in_review → review_done → completed`
(`needs_revision → in_progress` for revisions; max 3 cycles)

**File-based workspace:** `.agent-teams/<session-id>/` (gitignored). Contains `team.json`, `tasks/`, `status/`, `reviews/`, `log/`.

**Key rules:** Each task on independent file sets (no overlap). `CLAUDECODE=` cleared to prevent nested sessions. HTML export always sequential.

---

## Themes

| Theme | Style | Best for |
|-------|-------|----------|
| `gaia` | Colorful, bold | Tech, LT, study groups |
| `gaia` + `class: invert` | Dark mode | Code-heavy, night events |
| `default` | White, calm | Business, proposals |
| `uncover` | Minimal | Design, academic |

---

## Conventions

- **Runtime:** Bun 1.3.5 — use `Bun.file()`, `Bun.write()`, `Bun.spawn()`; `node:` prefix for compat modules
- **Imports:** `.js` extension on `.ts` files (ESM bundler). Biome auto-organizes imports alphabetically
- **Formatter:** Biome with tab indentation — run `bun run format` after editing
- **Type checker:** `tsgo` from `@typescript/native-preview` (not `tsc`)
- **Language:** Source code/comments in English. Default slide output is Japanese (`language: "ja"`)

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `class: invert` not applied after render | Not in config schema; render pipeline never emits it | Manually add to `.md` front matter after render |
| Header/footer/style not rendered | Placed at YAML top level (Zod strips unknown keys) | Move under `marp:` key |
| Files render to wrong directory | `output.dir` is relative path | Use full path: `"docs/<timestamp>_<slug>"` |
| SVG shadows/arrows missing in HTML | `url(#id)` refs break in Marp's foreignObject context | `bun scripts/fix-svg-url-refs.ts` → re-export |
| SVG images not showing in `dist/` | Marp CLI doesn't inline external `<img src="assets/">` | `fixAssetPaths()` auto-rewrites to `../assets/`; verify `assets/` dir exists |
| 32K token API error | Large content output inline instead of via Write tool | Use Write tool for all large output; set `CLAUDE_CODE_MAX_OUTPUT_TOKENS` |
| Parallel worker stalls / falls back to sequential | `mode: "bypassPermissions"` not set in Task tool call | Add `mode: "bypassPermissions"` to every Task tool call that spawns a slide worker |
| Worker completes but output file missing | Overlapping file paths between workers (cache conflict) | Assign strictly non-overlapping `slides-data-part{N}.json` paths |

---

## .claude Directory

- **`rules/`** — Path-scoped rules auto-loaded when editing matching files:
  - `marp.md` — Marp format, code overflow prevention (triggers on `*.md`, `marp.ts`)
  - `slide-design.md` — SVG-only policy, cognitive load, overflow formula (triggers on `docs/**`)
  - `output-structure.md` — Directory/file placement rules (triggers on `docs/**`, `pipeline.ts`)
  - `schemas.md` — Schema change checklist (triggers on `*schema.ts`)
  - `validation.md` — Pre-flight validation (triggers on `slides-data.json`, `slides.config.yaml`)
  - `agent-teams.md` — Batch workflow templates (triggers on `docs/**/*`)
- **`agents/`** — `slide-creator`, `marp-customizer`, `team-leader`, `impl-worker`, `review-worker`
- **`skills/`** — `/create-slides`, `/generate`, `/review-slides`, `/ship`, `/agent-teams`, `/validate`
