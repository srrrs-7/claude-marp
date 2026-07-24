---
description: Source module map, quality grade formula, build/deploy internals — load when editing src/ or scripts/
paths:
  - "src/**"
  - "scripts/**"
  - ".github/**"
  - "package.json"
---

# Architecture Reference

**Pipeline:** `slides-data.json` (Zod-validated) + `slides.config.yaml` → Marp `.md` → HTML/PDF/PPTX via `bunx @marp-team/marp-cli`

## Key source modules

| File | Purpose |
|------|---------|
| `src/index.ts` | Entry point — calls `parseArgs(...).catch(...)` for top-level error handling |
| `src/cli/commands.ts` | `init`, `new`, `render`, `export` — all async, awaited properly. `new <topic>` scaffolds `docs/<ts>_<slug>/` with config + a seeded single-slide `slides-data.json` |
| `src/config/schema.ts` | Zod config schema — strips unknown top-level keys (no `.passthrough()`); `.transform()` resolves `output.dir` to an absolute path |
| `src/config/defaults.ts` | Default YAML template written by `init` command |
| `src/config/loader.ts` | YAML parse + Zod validate config file. Deep-merges an optional cwd-level `slides.defaults.yaml` **under** each deck's config (deck wins; arrays replaced, not concatenated) |
| `src/generate/slide-schema.ts` | Zod slide data schema |
| `src/generate/pipeline.ts` | JSON read → validate → `renderMarpMarkdown()` → write `.md` |
| `src/generate/markdown.ts` | `buildFrontMatter()` + `renderSlide()` → Marp markdown string |
| `src/generate/fit.ts` | Auto-fit height estimation → `fit-NN` class (see `.claude/rules/marp.md`) |
| `src/export/marp.ts` | Spawn `bunx @marp-team/marp-cli`（always with `--html` for inline SVG）; `fixAssetPaths()` rewrites `src=` / `data-src=` / `srcset=` `"assets/"` → `"../assets/"` in `dist/*.html` |
| `src/model/presentation.ts` | `loadPresentation()` / `savePresentation()` — Zod-validated read **and** atomic write (tmp + rename). Use this in any script that mutates `slides-data.json` |
| `src/constants.ts` | `CONFIG_FILENAME`, `DATA_FILENAME`, `VALID_LAYOUTS` |
| `src/utils/files.ts` | `slugify()` (max 60 chars), `ensureDir()` |
| `src/utils/svg.ts` | `SVG_CONTAINMENT_STYLE`, `normalizeSvg()` — canonical SVG normalization (re-exported from `markdown.ts`) |
| `scripts/lib/quality.ts` | Shared quality helpers: `LABEL_TITLE_RE`, `SlideRecord`, `isAssertive()`, `hasSvg()`, `estimateMins()`, `computeDeckMetrics()`, `validateSlideQuality()` — imported by stats, validate, generate-index |
| `scripts/lib/constants.ts` | Shared quality thresholds: `GRADE_A_MIN`, `READING_SPEED_JA/EN`, `SVG_TARGET_RATIO`, `RENDER_PARALLEL`, etc. |
| `scripts/lib/presentation-loader.ts` | `collectPresentations()` — shared Glob+YAML+JSON loader for stats, validate, generate-index |
| `scripts/lib/cache.ts` | `readCache()` / `isFresh()` / `updateEntry()` / `writeCache()` — mtime+size freshness, used by `rebuild` |
| `scripts/lib/exit-codes.ts` | `EXIT` — shared process exit codes so CI can distinguish failure classes |
| `scripts/lib/colors.ts` | ANSI helpers for script output |
| `scripts/lib/spawn.ts` | `run(cmd, {cwd, timeoutMs})` → `{code, out, err}` — shared spawn helper with SIGTERM timeout |
| `scripts/config/categories.ts` | Deck → shelf mapping. **The 12 shelves in `docs/index.html` come from here** — a new topic area needs a rule added, or it lands in "Other" |
| `scripts/split-slides.ts` | Split tool — `--mode bullets` (8+ items) and `--mode code` (code+bullets separation) |
| `scripts/rebuild-all-slides.ts` | Parallel render + sequential export. Incremental via **mtime+size** cache (no hashing) in `.cache/rebuild/build-cache.json`; `--force` ignores it |
| `scripts/doctor.ts` | Health check: toolchain, missing config/data, exports, SVG viewBox + url(#id) violations, mermaid residue, full schema validation |
| `scripts/hooks/pre-push` | Backgrounded `claude -p "/insights"` analysis on push (throttled to once per 6h via `.git/insights-last-run`); a second cheap pass extracts 3-5 actionable bullets from the report and appends them to `INSIGHTS.md`. Guards exist because raw output once produced 55 zero-content entries |

## Two-layer Zod schema design

- Config schema: every field except `topic` has `.default()`. Nested objects use `.default({})`.
- Slide schema: `.describe()` for documentation, `.optional()` for omittable fields.
- **Schema change checklist:** Config changes → also update `src/config/defaults.ts`. Slide schema changes → also update `src/generate/markdown.ts`. (See `.claude/rules/schemas.md`.)

## Critical rendering rule

Front-matter + first slide joined with `\n\n` only. Slide separator `\n\n---\n\n` used between slides only, never after front-matter.

## Two loaders, pick deliberately

- `src/model/presentation.ts` — validated load + **atomic** save. Required for read-modify-write scripts (`split-slides`, `auto-fix`).
- `scripts/lib/presentation-loader.ts` — `collectPresentations()`, fast Glob scan, **no validation, read-only**. For analytics (`stats`, `validate`, `generate-index`) over all 230+ decks.

## Quality grade formula

(`scripts/lib/quality.ts` → `computeDeckMetrics()`), surfaced by `bun run stats` and as badges in `docs/index.html`:

```
score = svgRatio×40 + assertiveRatio×40 + subtitleRatio×20
A ≥ 70   B ≥ 50   C ≥ 30   D < 30
```

`svgRatio` is over **all** slides; `assertiveRatio` and `subtitleRatio` are over `layout: "default"` slides only — adding `section`/`center` slides dilutes the SVG score but not the title score. Empty deck → `D`. `LABEL_TITLE_RE` is the single source of truth for what counts as a non-assertive "label" title.

## Export constraints

**Do not add a root `marp.config.mjs`.** `src/export/marp.ts` spawns Marp CLI with `--no-config --allow-local-files`, so any root Marp config is ignored (one existed and was deleted for this reason). Theme/header/footer/style must go under `marp:` in each deck's `slides.config.yaml`. Export has a hard 120s timeout per deck (SIGTERM on expiry).

**`output.dir` is resolved to an absolute path by the Zod schema**, so relative values silently resolve against `process.cwd()` — always write the full `docs/<timestamp>_<slug>` path.

## Deployment & site generation

- `.github/workflows/deploy-pages.yml` (the only workflow) publishes `docs/` to GitHub Pages on any push to `main` touching `docs/**`. CI runs `bun run generate:index` first — the whole `docs/` tree is the published site, so committed decks go live automatically.
- **Standalone PDFs:** drop them in the repo-root `pdf/` directory. `generate:index` mirrors them into `docs/pdf/` (only `docs/` is published) and shelves them **by keyword into the same 12 category shelves as decks** (no dedicated PDF shelf). `docs/pdf/` must be committed for the links to work on Pages. PDFs have no quality grade, so grade filters exclude them by design.
- **`docs/index.html` is generated from `scripts/index-template/`** — `shelf.css` and `shelf.js` are read at build time and inlined, so the published page stays a single self-contained file. Edit those two files, not the generated HTML. Deck/PDF metadata is embedded as JSON and the three views (bookshelf / card / list) are rendered client-side.
