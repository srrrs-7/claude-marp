# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts`: Bun CLI entry point.
- `src/cli/commands.ts`: `init`, `render`, `export` command handlers.
- `src/config/`: config schema (`schema.ts`), defaults (`defaults.ts`), loader (`loader.ts`).
- `src/generate/`: slide schema, render pipeline, and Marp markdown generation.
- `src/export/marp.ts`: export via `@marp-team/marp-cli`.
- `docs/<timestamp>_<title>/`: per-presentation workspace.
  - `slides.config.yaml`, `slides-data.json`, rendered `*.md`, and `dist/*.html|pdf|pptx`.

## Build, Test, and Development Commands
- `bun install`: install dependencies.
- `bun run slides init`: create `slides.config.yaml` template.
- `bun run slides render --in <slides-data.json>`: validate JSON and render markdown.
- `bun run slides export -f html --in <file.md>`: export deck.
- `bun run typecheck`: native TypeScript check (`tsgo --noEmit`).
- `bun run check`: Biome lint/format check.
- `bun run format`: apply Biome formatting.
- `bun run spellcheck`: cspell check.

When working under `docs/<timestamp>_<title>/`, always pass config explicitly:
`bun run slides render -c docs/<dir>/slides.config.yaml --in docs/<dir>/slides-data.json`

## Coding Style & Naming Conventions
- TypeScript ESM on Bun 1.3.x.
- Use `node:`-prefixed core imports and `.js` extension in TS import paths.
- Formatting is Biome-controlled (tabs/ordering); do not hand-format against Biome.
- Keep code/comments in English; slide output default language is Japanese.
- Use responsibility-based filenames (`loader.ts`, `pipeline.ts`, `slide-schema.ts`).

## Testing Guidelines
- No full test suite yet; use quality gate:
`bun run typecheck && bun run check && bun run spellcheck`.
- If adding tests, use `bun:test` with `*.test.ts` naming.

## Slide & Content Rules
- Recommended workflow: use `create-slides` skill for new decks.
- Never generate blank slides; separators are only between slides.
- Keep code blocks within limits (8 lines recommended, 12 max).
- For claims/statistics, include source URLs; prefer primary sources.
- If references exceed 5-6 links, split across multiple reference slides.

## Codex Integration (.codex)
- Skill source is versioned in `.codex/skills/` and mirrored from `.claude/skills/`.
- Install skills with `bash .codex/install-skills.sh` (targets `$CODEX_HOME/skills` or `~/.codex/skills`).
- Invoke skills by naming them in chat (for example, `create-slides`, `generate`, `review-slides`).
- Use `.codex/rules/` as the authoritative writing/editing rules when working on matching paths.
- Use `.codex/agents/` as execution playbooks for complex workflows (for example, interactive slide creation and Marp customization).

## Commit & Pull Request Guidelines
- Use short, imperative, lowercase commit subjects.
- Keep commits scoped to one concern.
- PRs must include purpose, verification commands, and changed output paths (for example, `docs/<timestamp>_<title>/dist/...`).
