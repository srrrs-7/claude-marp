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

## Slide Quality Principles — Google / Amazon Standards

**すべてのスライドデータ生成時に適用される品質基準。**

### Assertive Title Rule（最重要）

`layout: "default"` のスライドタイトルは **主張文** にする。トピックラベルは禁止。

| ❌ 禁止（ラベル） | ✅ 必須（主張） |
|---|---|
| `コスト削減` | `コスト削減で年間$2M回収できる` |
| `課題` | `現状のレイテンシが顧客離脱の主因になっている` |
| `アーキテクチャ` | `新アーキテクチャが99.9%可用性を保証する理由` |
| `まとめ` | `今すぐ実行すべき3つのアクション` |

目標: コンテンツスライドの **60%以上** が主張タイトル。

### BLUF — Bottom Line Up Front

**タイトルスライドの直後（スライド2）に結論を1文で提示。** 証拠・データは後続スライドで。

### subtitle フィールド（推奨）

4項目以上の箇条書きを持つスライドには `subtitle` で "So What?" の一行サマリーを付ける:

```json
{
  "title": "P99レイテンシの改善実績",
  "subtitle": "800ms → 120ms に削減、CVR 18%改善を達成",
  "content": ["キャッシュ層を追加", "N+1クエリを削除", "CDNエッジを最適化"]
}
```

レンダリングすると `> *subtitle*` のブロッククォートとして表示される。

### SCQA ナラティブ構造

```
S（状況）→ C（複雑化）→ Q（問い）→ A（答え = BLUF）
```

### bun run validate -- --quality

品質チェックを実行し、assertive title比率・long bullet・連続テキストスライドを確認。

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
  subtitle: z.string().optional(),// BLUF one-liner → rendered as `> *subtitle*`
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

**`marp.class` is now part of the config schema** — set it in `slides.config.yaml` and the render pipeline will automatically emit it in the front matter:

```yaml
marp:
  theme: gaia
  class: invert      # ← "invert" for dark mode (gaia only); omit for light mode
```

The rendered `.md` front matter will contain:
```yaml
---
marp: true
theme: gaia
class: invert
size: 16:9
---
```

---

## Commands

```bash
bun run slides init                     # Create slides.config.yaml template
bun run slides render -c <config> --in <data.json>          # Render JSON → Marp markdown
bun run slides export -c <config> -f html --in <file.md>    # Export markdown → HTML
bun run validate                        # Validate all slides-data.json (Zod schema) + reading time + duplicate titles
bun run validate:quality                # Quality check: assertive titles, subtitle coverage, SVG ratio
bun run lint                            # Shorthand: validate + validate:quality
bun run fix                             # Auto-fix common schema issues (bullets→content, layout values, codeLanguage)
bun run fix:all                         # Chain: fix → split (code) → split:bullets → fix-svg → fix-svg-url-refs → generate:index
bun run split                           # Split code+bullets co-located on same slide (all) — scripts/split-slides.ts --mode code
bun run split:bullets                   # Split slides with 8+ bullet points into 2 slides — scripts/split-slides.ts --mode bullets
bun run fix-svg                         # Fix SVG overflow issues in markdown files
bun run doctor                          # Project health check (toolchain, exports, SVG violations)
bun run single <deckDir> [render|export|all]  # Render+export one deck; accepts partial name match
bun run dev [docs/<dir>]                # Watch mode: auto-render on file change (400ms debounce)
bun run stats                           # Quality statistics: SVG %, assertive title %, grade A/B/C/D distribution
bun run stats -- --verbose              # Per-deck breakdown sorted by grade
bun run stats -- --worst                # Show only C/D grade decks (improvement targets)
bun run stats:csv                       # Export per-deck metrics to CSV
bun run add-subtitles                   # Bulk-add BLUF subtitles to slides missing them
bun run rebuild                         # Re-render + re-export all presentations (incremental; parallel render)
bun run rebuild -- --force              # Force full rebuild (ignore cache)
bun run rebuild:render                  # Re-render only (parallel)
bun run rebuild:export                  # Re-export only (sequential — Marp CLI constraint)
bun run typecheck                       # tsgo (native TS compiler, not tsc)
bun run check                           # Biome lint + format check
bun run format                          # Auto-format with Biome
bun run test                            # Regression tests (bun:test)
bun run spellcheck                      # cspell spell check across all files
bun run generate:index                  # Regenerate docs/index.html (grade badges, sort, search, reading time)
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

### Testing

```bash
bun run test                            # NOTE: only runs scripts/test-slides.test.ts + src/__tests__/ + scripts/__tests__/
bun test                                # Everything, including the two files bun run test omits
bun test scripts/test-unit.test.ts      # Single file (normalizeSvg, renderMarpMarkdown, quality helpers — 64 tests)
bun test scripts/test-e2e.test.ts       # Single file (full render→export round-trip)
bun test -t "normalizeSvg"              # Single test by name pattern
```

> `scripts/test-unit.test.ts` and `scripts/test-e2e.test.ts` are **not** in the `test` script's file list — run them explicitly (or plain `bun test`) before claiming the suite is green.

`bun run check` = Biome (code lint/format). `bun run lint` = *slide quality* gate (`validate` + `validate:quality`). Different things despite the names.

`make setup-hooks` installs `scripts/hooks/pre-push` into `.git/hooks/`.

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
| `src/index.ts` | Entry point — calls `parseArgs(...).catch(...)` for top-level error handling |
| `src/cli/commands.ts` | `init`, `render`, `export` — all async, awaited properly |
| `src/config/schema.ts` | Zod config schema — strips unknown top-level keys (no `.passthrough()`) |
| `src/config/defaults.ts` | Default YAML template written by `init` command |
| `src/config/loader.ts` | YAML parse + Zod validate config file |
| `src/generate/slide-schema.ts` | Zod slide data schema |
| `src/generate/pipeline.ts` | JSON read → validate → `renderMarpMarkdown()` → write `.md` |
| `src/generate/markdown.ts` | `buildFrontMatter()` + `renderSlide()` → Marp markdown string |
| `src/export/marp.ts` | Spawn `bunx @marp-team/marp-cli`; `fixAssetPaths()` rewrites `src="assets/"` → `src="../assets/"` in `dist/*.html` |
| `src/model/presentation.ts` | `loadPresentation()` / `savePresentation()` — Zod-validated read **and** atomic write (tmp + rename). Use this in any script that mutates `slides-data.json` |
| `src/constants.ts` | `CONFIG_FILENAME`, `DATA_FILENAME`, `VALID_LAYOUTS` |
| `src/utils/files.ts` | `slugify()` (max 60 chars), `ensureDir()` |
| `src/utils/svg.ts` | `SVG_CONTAINMENT_STYLE`, `normalizeSvg()` — canonical SVG normalization (re-exported from `markdown.ts`) |
| `scripts/lib/quality.ts` | Shared quality helpers: `LABEL_TITLE_RE`, `SlideRecord`, `isAssertive()`, `hasSvg()`, `estimateMins()`, `computeDeckMetrics()`, `validateSlideQuality()` — imported by stats, validate, generate-index |
| `scripts/lib/constants.ts` | Shared quality thresholds: `GRADE_A_MIN`, `READING_SPEED_JA/EN`, `SVG_TARGET_RATIO`, `RENDER_PARALLEL`, etc. |
| `scripts/lib/presentation-loader.ts` | `collectPresentations()` — shared Glob+YAML+JSON loader for stats, validate, generate-index |
| `scripts/split-slides.ts` | TypeScript split tool — `--mode bullets` (8+ items) and `--mode code` (code+bullets separation) |
| `scripts/rebuild-all-slides.ts` | TypeScript rebuild — parallel render + sequential export with MD5 cache |

**Two-layer Zod schema design:**
- Config schema: every field except `topic` has `.default()`. Nested objects use `.default({})`.
- Slide schema: `.describe()` for documentation, `.optional()` for omittable fields.

**Schema change checklist:** Config changes → also update `src/config/defaults.ts`. Slide schema changes → also update `src/generate/markdown.ts`.

**Critical rendering rule:** Front-matter + first slide joined with `\n\n` only. Slide separator `\n\n---\n\n` used between slides only, never after front-matter.

**Two loaders, pick deliberately:**
- `src/model/presentation.ts` — validated load + **atomic** save. Required for read-modify-write scripts (`split-slides`, `auto-fix`, `add-subtitles`).
- `scripts/lib/presentation-loader.ts` — `collectPresentations()`, fast Glob scan, **no validation, read-only**. For analytics (`stats`, `validate`, `generate-index`) over all 220+ decks.

**Quality grade formula** (`scripts/lib/quality.ts` → `computeDeckMetrics()`), surfaced by `bun run stats` and as badges in `docs/index.html`:
```
score = svgRatio×40 + assertiveRatio×40 + subtitleRatio×20
A ≥ 70   B ≥ 50   C ≥ 30   D < 30
```
`svgRatio` is over **all** slides; `assertiveRatio` and `subtitleRatio` are over `layout: "default"` slides only — adding `section`/`center` slides dilutes the SVG score but not the title score. Empty deck → `D`. `LABEL_TITLE_RE` is the single source of truth for what counts as a non-assertive "label" title.

**`marp.config.mjs` at the repo root is dead config.** `src/export/marp.ts` spawns Marp CLI with `--no-config --allow-local-files`, so editing that file changes nothing. Theme/header/footer/style must go under `marp:` in each deck's `slides.config.yaml`. Export has a hard 120s timeout per deck (SIGTERM on expiry).

**`output.dir` is resolved to an absolute path by the Zod schema** (`.transform()` in `src/config/schema.ts`), so relative values silently resolve against `process.cwd()` — always write the full `docs/<timestamp>_<slug>` path.

**Deployment:** `.github/workflows/deploy-pages.yml` publishes `docs/` to GitHub Pages on any push to `main` touching `docs/**`. CI runs `bun run generate:index` first — the whole `docs/` tree is the published site, so committed decks go live automatically.

**Parallel instruction files:** `AGENTS.md` (Codex/OpenAI-format repo guidelines) and `.codex/` (skills/rules/agents mirrored from `.claude/`, installed via `bash .codex/install-skills.sh`) cover the same ground as this file for other tools. Keep them in sync when changing conventions here.

---

## Slide Content Constraints

- **Bullet points:** max 6-7 per slide; split 8+ items into two slides
- **Agenda/TOC:** if 8+ sections, split into "(1/2)" and "(2/2)" slides
- **Code blocks:** 8 lines recommended, 12 lines absolute max
- **Code + bullets:** 7-10 code lines → max 2 bullets; 11-12 code lines → max 1 bullet
- **Never create blank slides** (no page-number placeholders)
- **Figure-first principle:** Use inline SVG for all flows, architecture, timelines, comparisons. Target ≥50% of slides with SVG. Avoid 2+ consecutive text-only slides.

---

## Multi-Agent Development — Parent → Subagents → Integration（必須）

**デフォルトの実行形態。** 独立して並列化できる単位が **2つ以上** あるタスクは、親エージェントが自分で作業せず、**単位ごとに 1 サブエージェント**を起動する。親は分解・起動・統合のみを担当する。

```
            ┌──────────────── parent agent ────────────────┐
            │ 1. 分解   タスク → 独立した N 個の作業単位     │
            │ 2. 起動   N 個の subagent を同時起動          │
            │ 3. 待機   全 subagent の返り値を受け取る       │
            │ 4. 統合   マージ → 検証 → 逐次レンダリング     │
            │ 5. 報告   ユーザーへの報告は親のみが行う       │
            └───────────────────────────────────────────────┘
              ↓ prompt        ↓ prompt        ↓ prompt
        ┌───────────┐   ┌───────────┐   ┌───────────┐
        │ subagent1 │   │ subagent2 │   │ subagentN │   ← 相互通信しない
        │ part1.json│   │ part2.json│   │ partN.json│   ← ファイルは排他
        └───────────┘   └───────────┘   └───────────┘
              ↑ 構造化された返り値（結果本文ではなくサマリ）
```

### 親エージェントの責務

| フェーズ | やること | やってはいけないこと |
|---------|---------|-------------------|
| 分解 | 重複しない作業単位に切る。各単位に専用の出力ファイルを割り当てる | 単位が曖昧なまま起動する |
| 起動 | **1 メッセージ内で全 subagent を同時に** `Agent` 呼び出し | 1つずつ起動して待つ（逐次化） |
| 待機 | 全件の返り値が揃うまで統合を始めない | 部分結果で先に進む |
| 統合 | マージ → `bun run validate` → `bun run lint` → render → export（**逐次**） | subagent に統合させる |
| 報告 | 全体を1つの成果として報告 | subagent の生ログをそのまま貼る |

**親は実作業をしない。** 自分でスライドを1本書きながら subagent も走らせる、は禁止。分解できなかった残りがあるなら、それも subagent に渡す。

### サブエージェントの契約

各 subagent のプロンプトに必ず含める:

1. **担当範囲** — スライド番号レンジ / 対象デッキ / 対象ファイルを明示
2. **専用出力パス** — `slides-data-part{N}.json` など、他と絶対に重ならないパス
3. **参照すべきルール** — `CLAUDE.md` の該当セクション（SVG制約・Assertive Title・スキーマ）
4. **返り値の形式** — 下記を厳守させる
5. `"You have full permissions to use Bash, Write, Read, Edit, and Glob tools."`

**返り値は「成果物そのもの」ではなく「統合に必要なメタ情報」**（32Kトークン上限対策 — 本体は必ず Write でファイルへ）:

```
書き込んだファイル: docs/<dir>/slides-data-part2.json
担当レンジ: slides 21-40（実際に生成した枚数: 20）
SVG使用スライド: 12/20
主張タイトル: 14/20
未解決の問題: なし / <あれば1行で>
```

### 使い分け

| 状況 | 形態 |
|------|------|
| 30枚以上のデッキ生成 | 15-20枚ずつ分割 → subagent 並列 |
| 複数デッキの一括作成（"全N個"） | デッキ1つ = subagent 1つ |
| 横断調査（どのデッキが grade C か 等） | 観点ごとに subagent を分けて並列探索 |
| 独立した複数ファイルの修正 | ファイル群ごとに subagent |
| 1ファイルの小さな修正・確認だけ | **subagent を使わず親が直接やる** |
| render / export | **常に親が逐次実行**（Marp CLI キャッシュ競合） |

### モデル振り分け — 複雑度に応じてコストを下げる

**サブエージェントの `model:` を省略すると既定は `inherit`（＝親と同じ最上位モデル）。** 機械的な作業まで最上位で回るのが従来の浪費要因だった。複雑度の階層で明示的に割り当てる。

| 階層 | 作業の性質 | model | effort | 該当エージェント |
|------|-----------|-------|--------|----------------|
| **L3 設計・統合** | 分解、判断、対話、マージ可否の決定 | `inherit` | 既定 | `slide-creator`, `team-leader` |
| **L2 生成** | スライド本文・作図（品質が直接成果物になる） | `opus` | 既定 | `slide-chunk-writer`, `svg-diagram-author` |
| **L2 実装・調査** | コード実装、レビュー、出典調査、CSS調整 | `sonnet` | `medium`/`low` | `impl-worker`, `review-worker`, `slide-researcher`, `marp-customizer` |
| **L1 機械** | 決定論的コマンド実行、集計、整形 | `haiku` | `low` | `deck-fixer`, `deck-quality-auditor` |

**判断基準:** 「出力が正解かどうかを `bun run validate` / `stats` で機械判定できるか？」— できる作業は L1。できない（人が読んで良し悪しを決める）作業は L2 以上。

**効くレバーと効かないレバー:**
- ✅ `model:` — 最大の削減要因。L1をhaikuに落とすだけで機械作業のコストが桁で下がる
- ✅ `effort: low` — 推論トークンを直接削る。決定論的な作業に高い推論は要らない
- ✅ 返り値をメタ情報に限定する（本文を返させない）
- ✅ エージェント定義ファイル自体を短く保つ（毎回読まれる）
- ⚠️ `tools:` の絞り込み — **トークン削減効果は未確認**。権限の最小化として設定する価値はあるが、コスト根拠にはしない

**`model` に指定できる値:** `haiku` / `sonnet` / `opus` / `fable` / `inherit` / フルモデルID。省略時は `inherit`。

### エージェント一覧

| エージェント | 役割 | 呼び出し元 |
|------------|------|-----------|
| `slide-creator` | 対話型デッキ作成の**親**。分解と統合のみ | ユーザー / `/create-slides` |
| `slide-chunk-writer` | 担当レンジのJSONチャンクだけ生成 | 親が並列起動 |
| `svg-diagram-author` | Marp互換SVG図版の作図 | 親が並列起動 |
| `slide-researcher` | 出典付きの事実・数値の調査 | 親（本文生成の前段） |
| `deck-fixer` | `fix`/`split`/`validate` を機械実行 | 親（マージ後） |
| `deck-quality-auditor` | `stats` を集計し改善対象を優先順位付け | 親（改善フェーズの入口） |
| `team-leader` / `impl-worker` / `review-worker` | Agent Teams（コード実装＋レビュー） | `/agent-teams` |
| `marp-customizer` | テーマ・CSS調整 | 親（デザイン調整時） |

> 権限は **呼び出し側の `mode: "bypassPermissions"`** で渡す。エージェント定義ファイルに `permissionMode: bypassPermissions` を書くこともできるが、そのエージェントの全呼び出しで恒久的に権限が緩むため、**既定では設定していない**。

### 実行パラメータ

**CRITICAL — Worker agents do NOT inherit the parent session's permission grants.**
Text in the agent prompt ("you have full permissions") does nothing. Permissions are granted only via the Agent/Task tool's `mode` parameter.

| Agent (Task) tool parameter | Required value | Effect |
|--------------------|---------------|--------|
| `mode` | `"bypassPermissions"` | Grants Bash/Write/Read/Edit/Glob without prompts |
| `run_in_background` | `true` | Enables parallel execution |
| `subagent_type` | `"slide-creator"` / `"general-purpose"` | スライド生成は `slide-creator`、調査・修正は `general-purpose` |
| `name` | `worker-1`, `worker-2`, … | 親から `SendMessage` で追撃指示を出せるようにする |

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
| `class: invert` not in output | `marp.class` not set in `slides.config.yaml` | Add `class: "invert"` under `marp:` key — pipeline auto-emits it |
| Header/footer/style not rendered | Placed at YAML top level in `slides.config.yaml` (Zod strips unknown keys) | Move under `marp:` key in config YAML |
| Files render to wrong directory | `output.dir` is relative path | Use full path: `"docs/<timestamp>_<slug>"` |
| SVG shadows/arrows missing in HTML | `url(#id)` refs break in Marp's foreignObject context | `bun scripts/fix-svg-url-refs.ts` → re-export |
| SVG images not showing in `dist/` | Marp CLI doesn't inline external `<img src="assets/">` | `fixAssetPaths()` auto-rewrites to `../assets/`; verify `assets/` dir exists |
| Slide content overflowing (bullets) | 8+ bullet points on one slide | `bun run split:bullets` → re-render |
| Slide content overflowing (code) | Code block > 12 lines or code+bullets combined | `bun run split` → re-render |
| 32K token API error | Large content output inline instead of via Write tool | Use Write tool for all large output; set `CLAUDE_CODE_MAX_OUTPUT_TOKENS` |
| Render fails for one deck but not others | Need to iterate on a single deck without full rebuild | `bun run single <partial-name>` — partial name matching, render+export one deck |
| Parallel worker stalls / falls back to sequential | `mode: "bypassPermissions"` not set in Task tool call | Add `mode: "bypassPermissions"` to every Task tool call that spawns a slide worker |
| Worker completes but output file missing | Overlapping file paths between workers (cache conflict) | Assign strictly non-overlapping `slides-data-part{N}.json` paths |
| Subagent の返り値が巨大で応答が切れる | 成果物本体を返り値に入れた | 本体は Write でファイルへ。返り値はパス+枚数+品質メタのみ |
| 並列にしたのに速くならない | subagent を1つずつ起動して待っている | 全 subagent を **1メッセージ内で同時に** `Agent` 呼び出しする |
| 触ってないデッキの `slides-data.json` が勝手に diff に出る | 一部デッキがスペースインデントでコミット済み。どこを Write/Edit しても PostToolUse の `bun run format` が repo 全体を tab に直す | 意図しない差分は `git checkout -- docs` で戻す。恒久対応は一度 `bun run format` の結果をコミットする |

---

## .claude Directory

- **`rules/`** — Path-scoped rules auto-loaded when editing matching files:
  - `marp.md` — Marp format, code overflow prevention (triggers on `*.md`, `marp.ts`)
  - `slide-design.md` — SVG-only policy, cognitive load, overflow formula (triggers on `docs/**`)
  - `output-structure.md` — Directory/file placement rules (triggers on `docs/**`, `pipeline.ts`)
  - `schemas.md` — Schema change checklist (triggers on `*schema.ts`)
  - `validation.md` — Pre-flight validation (triggers on `slides-data.json`, `slides.config.yaml`)
  - `agent-teams.md` — Batch workflow templates (triggers on `docs/**/*`)
- **`agents/`** — `slide-creator`, `slide-chunk-writer`, `svg-diagram-author`, `slide-researcher`, `deck-fixer`, `deck-quality-auditor`, `marp-customizer`, `team-leader`, `impl-worker`, `review-worker`（モデル振り分けは「エージェント一覧」参照）
- **`skills/`** — `/create-slides`, `/batch-decks`, `/improve-deck`, `/generate`, `/review-slides`, `/validate`, `/ship`, `/agent-teams`
  - frontmatter のフィールド名は **`user-invocable`（ハイフン）**。`user_invocable` は無効フィールドとして無視される
