# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run slides init                     # Create slides.config.yaml template
bun run slides render --in data.json    # Render slide data JSON to Marp markdown
bun run slides export -f html --in FILE # Export Marp markdown to HTML
bun run typecheck                       # Type checking via tsgo (native TS compiler)
bun run check                           # Biome lint + format check
bun run format                          # Auto-format with Biome
```

No test framework yet. When adding tests, use `bun:test`.

## Architecture

Bun 1.3.5 + TypeScript CLI tool for rendering structured slide data into Marp-format markdown. Slide content is generated locally by Claude Code / Codex — no AI SDKs.

**Pipeline:** Slide data JSON (Zod-validated) + YAML config → Marp markdown (`docs/`) → HTML/PDF export (`docs/dist/`) via Marp CLI.

### Two-Layer Zod Schema Design

- **Config schema** (`src/config/schema.ts`): Validates `slides.config.yaml`. Every field except `topic` has `.default()`. Nested objects use `.default({})` so partial YAML works.
- **Slide schema** (`src/generate/slide-schema.ts`): Defines slide data structure. Uses `.describe()` for documentation and `.optional()` for omittable fields.

Changing the slide schema → update `src/generate/markdown.ts`. Changing the config schema → update `src/config/defaults.ts`.

### Render Pipeline (`src/generate/`)

`pipeline.ts`: read JSON → validate with Zod → render Marp markdown via `markdown.ts` → write file. `markdown.ts`: build front-matter (`marp: true`, theme, directives) + render slides (title, bullets, code, mermaid, speaker notes as HTML comments, `---` separators).

## Conventions

- **Runtime:** Bun 1.3.5. Use `Bun.file()`, `Bun.write()`, `Bun.spawn()`. Use `node:` prefix for compat modules.
- **Imports:** `.js` extension for `.ts` files (ESM bundler). Biome auto-organizes alphabetically.
- **Formatter:** Biome with tab indentation. Run `bun run format` after editing.
- **Type checker:** `tsgo` from `@typescript/native-preview` (not `tsc`).
- **Language:** Code/comments in English. Default slide output is Japanese (`language: "ja"`).
- **Output:** Slide markdown → `docs/`. Exported HTML/PDF → `docs/dist/` (gitignored).

## Constraints

- **PDF export:** Requires Chromium. HTML is the primary format.

## .claude Directory

- **rules/** — path-scoped rules auto-loaded when editing matching files (`schemas.md`, `marp.md`)
- **agents/** — `slide-creator` (対話型スライド作成), `marp-customizer` (テーマ・CSS調整)
- **skills/** — `/create-slides` (対話型作成), `/generate` (JSON→レンダリング), `/review-slides` (レビュー)
