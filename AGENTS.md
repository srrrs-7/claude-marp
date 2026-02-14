# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts`: CLI entry point.
- `src/cli/commands.ts`: command parsing and command handlers.
- `src/config/*`: config defaults, YAML loading, and Zod validation for `slides.config.yaml`.
- `src/generate/*`: slide JSON schema and Markdown rendering pipeline.
- `src/export/marp.ts`: HTML/PDF/PPTX export via Marp CLI.
- `src/utils/files.ts`: shared file system helpers.
- `docs/`: generated slide artifacts (timestamped output directories).

Keep generated output in `docs/` and implementation code in `src/`.

## Build, Test, and Development Commands
- `bun install`: install dependencies.
- `bun run slides init`: create a config template.
- `bun run slides render --in docs/slides-data.json`: validate JSON and generate Marp Markdown.
- `bun run slides export -f html --in <file.md>`: export slide deck.
- `bun run typecheck`: run TypeScript native checker (`tsgo --noEmit`).
- `bun run check`: run Biome lint/format checks.
- `bun run format`: apply Biome formatting.
- `bun run spellcheck`: run cspell over the repo.

## Coding Style & Naming Conventions
- Language: TypeScript (ESM).
- Formatting/linting: Biome (`biome.json`); run `bun run format` before opening a PR.
- Indentation and quote style are Biome-controlled; avoid manual style drift.
- Use descriptive file names by responsibility (`loader.ts`, `pipeline.ts`, `slide-schema.ts`).
- Prefer kebab-case for output file names and timestamped output directories in `docs/`.

## Testing Guidelines
- There is no full automated test suite yet.
- Minimum quality gate for changes: `bun run typecheck && bun run check && bun run spellcheck`.
- When adding tests, use Bun’s test runner (`bun:test`) and place tests near the related module or under a dedicated `test/` directory with `*.test.ts` naming.

## Commit & Pull Request Guidelines
- Follow existing commit style: short, imperative, lowercase summaries (for example, `add cspell spell checking configuration`).
- Keep commits focused to one concern.
- PRs should include:
  - What changed and why.
  - Commands run for verification.
  - Sample input/output or generated file path when behavior changes (for example, `docs/<timestamp>_<topic>/...`).

## Security & Configuration Tips
- Do not commit secrets in slide content or config files.
- Prefer HTML export in constrained environments; PDF export requires Chromium.
