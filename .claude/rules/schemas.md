---
description: Zod schema modification checklist
paths:
  - src/config/schema.ts
  - src/generate/slide-schema.ts
---

## Schema Change Checklist

- Config schema (`config/schema.ts`) を変更 → `config/defaults.ts` のYAMLテンプレートも更新
- Slide schema (`generate/slide-schema.ts`) を変更 → `generate/markdown.ts` のレンダリングも更新
- Config schema: ユーザー入力用。`.default()` でフォールバック
- Slide schema: スライドデータ構造定義。`.describe()` で説明、`.optional()` で省略可能に
