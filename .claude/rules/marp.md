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
- スピーカーノート: `<!-- notes -->` HTMLコメント
- 図解: インラインSVGを直接埋め込み（`<svg viewBox="..." style="max-height:70vh;...">...</svg>`）。Mermaidは使用しない
- テーマ: `gaia` / `default` / `uncover`
- **未記載スライドは作らない**: ページ番号用の空白スライドや内容のないスライドは作成しない。すべてのスライドに実質的なコンテンツを配置すること

## コードブロックはみ出し防止

**コードブロックがスライド枠からはみ出さないよう、以下を必ず実施:**

### デフォルト設定（すべてのプレゼンで適用）

`slides.config.yaml` の `style` セクションに以下を含める:

```yaml
style: |
  /* コードブロックのフォントサイズを縮小してはみ出しを防ぐ */
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
```

### コード量の制約

- **推奨最大: 8行** — 箇条書きとの共存が可能
- **絶対上限: 12行** — これを超えると分割必須
- **コード+箇条書きの組み合わせ制約**:
  - コード7-10行 → 箇条書き最大2項目
  - コード11-12行 → 箇条書き最大1項目

詳細は `.claude/rules/slide-design.md` の「8. コンテンツ量の制約」を参照
