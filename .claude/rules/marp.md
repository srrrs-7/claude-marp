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
- Mermaid: ` ```mermaid ` コードブロック
- テーマ: `gaia` / `default` / `uncover`
