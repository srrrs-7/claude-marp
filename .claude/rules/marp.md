---
description: Marp markdown format rules
paths:
  - src/generate/markdown.ts
  - src/export/marp.ts
  - docs/**/*.md
---

## Marp Format

- フロントマター先頭: `marp: true`（VSCode拡張がプレビュー検知）
- スライド区切り: `\n\n---\n\n`
- レイアウト: `<!-- _class: lead -->` で中央配置
- スピーカーノート: HTMLコメント（`<!-- … -->`）。`notes` というキーワードは不要 — Marpはコメント全体をノートとして扱う
- 図解: インラインSVGを直接埋め込み（`<svg viewBox="...">...</svg>` — width/height/max-height等のサイズ指定は不要、`.fig`ラッパーが自動でスライド枠に収める）。Mermaidは使用しない
- テーマ: `gaia` / `default` / `uncover`
- **未記載スライドは作らない**: ページ番号用の空白スライドや内容のないスライドは作成しない。すべてのスライドに実質的なコンテンツを配置すること

## コードブロックはみ出し防止

**コードブロックがスライド枠からはみ出さないよう、以下を必ず実施:**

### デフォルト設定（手動作業は不要）

`src/generate/markdown.ts` の `BASE_CSS` が **全デッキに無条件で自動注入**する:

```css
section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }
```

`slides.config.yaml` の `marp.style` は BASE_CSS の**後**に連結されるため、ここで `section pre code` を再定義すると自動設定を上書きしてしまう。フォントサイズを触る必要は通常ない。

### コード量の制約

- **推奨最大: 8行** — 箇条書きとの共存が可能
- **絶対上限: 12行** — これを超えると分割必須
- **コード+箇条書きの組み合わせ制約**:
  - コード7-10行 → 箇条書き最大2項目
  - コード11-12行 → 箇条書き最大1項目

詳細は `.claude/rules/slide-design.md` の「8. コンテンツ量の制約」を参照

## Auto-fit — how text is kept inside the slide

A diagram can shrink; text cannot. `src/generate/fit.ts` estimates each slide's rendered height and, when the text alone would be clipped, attaches a `fit-NN` class (`fit-94` … `fit-58`) that scales the section font to a fraction of `--marpit-root-font-size`. The ladder is defined in `BASE_CSS`; the estimate is calibrated against headless-Chromium measurements of the rendered decks.

- Using `--marpit-root-font-size` means the fraction is correct for any theme **and** for decks that override the base size in `marp.style`
- `bun run validate:quality` warns (`overflowing_slide`) when a slide still would not fit at the smallest step — that is a content problem: **split the slide**, don't shrink further
- ⚠️ `section { font-size: 1.05em }` in a `marp.style` does **not** mean "5% larger". `em` resolves against the inherited 16px, not Gaia's 35px, so it renders at 16.8px — less than half the intended size. Use `px` if you must override.
