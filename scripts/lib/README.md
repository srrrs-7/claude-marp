# scripts/lib — Shared Library Modules

Reusable utilities for the presentation build scripts. All modules are imported
with the `.js` extension (ESM bundler convention) even though source files are `.ts`.

---

## cache.ts

**Incremental build cache** — detects file changes via mtime + size (no hashing).

```typescript
import { isFresh, readCache, updateEntry, writeCache } from "./lib/cache.js";

const cache = readCache(".cache/build-cache.json");
if (!await isFresh("slides-data.json", cache)) {
    // rebuild...
    await updateEntry("slides-data.json", cache);
}
await writeCache(".cache/build-cache.json", cache);
```

Used by: `rebuild-all-slides.ts`

---

## colors.ts

**ANSI terminal colors** — thin wrappers with auto-reset. Respects `NO_COLOR` env
var and `--no-color` CLI flag; when disabled all functions return the input string
unchanged.

```typescript
import { c } from "./lib/colors.js";
console.log(c.green("✓ success"), c.red("✗ error"), c.dim("info"), c.bold("header"));
```

Available: `green`, `red`, `yellow`, `blue`, `dim`, `bold`.

Used by: `stats.ts`, `single.ts`, `dev-watch.ts`, `rebuild-all-slides.ts`

---

## constants.ts

**Project-wide magic numbers** — single source of truth for quality thresholds.

Key exports:

| Constant | Value | Purpose |
|---|---|---|
| `READING_SPEED_JA` | 350 | chars/min for Japanese |
| `READING_SPEED_EN` | 200 | chars/min for English |
| `GRADE_A_MIN` | 70 | Minimum score for grade A |
| `GRADE_B_MIN` | 50 | Minimum score for grade B |
| `GRADE_C_MIN` | 30 | Minimum score for grade C |
| `SVG_TARGET_RATIO` | 0.5 | Figure-first principle target |
| `ASSERTIVE_TARGET_RATIO` | 0.6 | Google/Amazon title standard |
| `SUBTITLE_GOOD_RATIO` | 0.3 | Minimum "good" subtitle coverage |
| `MAX_BULLET_CHARS` | 60 | Max chars per bullet point |
| `SUBTITLE_BULLET_THRESHOLD` | 4 | Bullets before subtitle is encouraged |
| `CONSECUTIVE_TEXT_LIMIT` | 3 | Consecutive text-only slides before warning |
| `RENDER_PARALLEL` | 8 | Concurrent render jobs in rebuild |

Used by: `quality.ts`, `split-bullet-overflow.ts`, `rebuild-all-slides.ts`, tests

---

## exit-codes.ts

**Standard exit code constants** — documents the meaning of each exit code.

```typescript
import { EXIT } from "./lib/exit-codes.js";
process.exit(EXIT.SUCCESS);   // 0 — no issues
process.exit(EXIT.ERROR);     // 1 — runtime/validation error
process.exit(EXIT.WARNINGS);  // 2 — completed with quality warnings
```

Used by: `validate-slides-schema.ts`, `stats.ts`

---

## presentation-loader.ts

**Bulk deck loader** — globs `docs/*/`, parses config + slides, computes metrics.

Returns `PresentationData[]` sorted alphabetically (alphabetical = chronological
given the `YYYYMMDDHHMMSS_slug` directory naming convention). Logs warnings on
parse errors instead of crashing. For read-only analytics. For validated
read+write, use `src/model/presentation.ts`.

```typescript
import { collectPresentations } from "./lib/presentation-loader.js";
const decks = await collectPresentations();
for (const deck of decks) {
    console.log(deck.topic, deck.metrics.grade);
}
```

`PresentationData` fields: `dir`, `dirName`, `topic`, `language`, `config`
(raw YAML object), `slides`, `metrics`.

Used by: `stats.ts`, `generate-index.ts`

---

## quality.ts

**Slide quality metrics** — grade computation and per-slide quality checks.

Key exports:

| Export | Description |
|---|---|
| `LABEL_TITLE_RE` | Regex matching generic label titles (e.g. "概要", "まとめ", "agenda") |
| `SlideRecord` | Type for a single slide (title, subtitle, content, code, layout, …) |
| `isAssertive(title)` | `true` if title states a conclusion rather than a topic label |
| `hasSvg(slide)` | `true` if slide contains inline SVG or an image directive |
| `estimateMins(slides, lang?)` | Reading time in minutes (counts title + content + speakerNotes chars) |
| `computeDeckMetrics(slides, lang?)` | Returns `DeckMetrics` — svgRatio, assertiveRatio, subtitleRatio, readingMins, grade |
| `validateSlideQuality(slides)` | Returns `QualityWarning[]` — per-slide checks (label title, long bullet, missing subtitle, consecutive text, missing notes) plus one deck-level narrative arc check |
| `MAX_BULLET_CHARS` | Re-exported from `constants.ts` for convenience |

Grade scoring (100 pts max): SVG coverage ×40 + assertive titles ×40 + subtitle (BLUF) ×20.
A ≥ 70 | B ≥ 50 | C ≥ 30 | D < 30.

Used by: `stats.ts`, `validate-slides-schema.ts`, `generate-index.ts`, tests

---

## spawn.ts

**Async subprocess wrapper** — captures stdout/stderr with optional timeout.

```typescript
import { run } from "./lib/spawn.js";
const { code, out, err } = await run(["bun", "run", "slides", "render"], {
    cwd: "/workspace/main",
    timeoutMs: 30_000,
});
```

Used by: `single.ts`, `dev-watch.ts`
