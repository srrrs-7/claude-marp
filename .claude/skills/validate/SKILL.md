---
name: validate
description: スライドデータとconfigをスキーマに対して検証
user_invocable: true
---

# Validate Skill

すべての slides-data.json ファイルをスキーマに対して検証する。

## Usage

```bash
/validate
```

または特定のディレクトリを指定:

```bash
/validate docs/20260214073222_example
```

## Workflow

1. **Validation Script を実行**
   ```bash
   bun run validate
   ```

2. **結果を分析**
   - ✅ Valid files のリスト
   - ❌ Invalid files のリスト (エラー詳細付き)

3. **エラーがある場合**
   - エラーの種類を説明
   - 修正方法を提案
   - 自動修正が可能かユーザーに確認

## Output Example

```
🔍 Validating slides data files...

✅ docs/20260214073222_example/slides-data.json
✅ docs/20260214080000_another/slides-data.json
❌ docs/20260214090000_broken/slides-data.json
   - 0.bullets: Unrecognized key(s) in object: 'bullets'
   - 0.layout: Invalid enum value. Expected 'default' | 'center' | 'section', received 'custom'

📊 Summary: 2 valid, 1 invalid

❌ Validation failed. Fix the following errors:

docs/20260214090000_broken/slides-data.json:
  - 0.bullets: Unrecognized key(s) in object: 'bullets'
  - 0.layout: Invalid enum value. Expected 'default' | 'center' | 'section', received 'custom'

💡 Common fixes:
  - Change "bullets" field to "content"
  - Use valid layout values: "default", "center", "section"
  - Ensure all required fields are present
```

## Error Analysis

**Field name errors:**
- `bullets` → should be `content`
- Use the exact field names from `src/generate/slide-schema.ts`

**Invalid enum values:**
- `layout` must be: `"default"`, `"center"`, or `"section"`
- Check schema for valid values

**Missing required fields:**
- Every slide must have: `title`, `layout`
- Optional fields: `content`, `code`, `codeLanguage`, `speakerNotes`

## Auto-fix Suggestions

When validation fails, offer to fix common errors:

1. **Rename field errors** — Change `bullets` to `content`
2. **Fix enum values** — Replace invalid layout values with `default`
3. **Add missing fields** — Add required `title` or `layout`

**Example response:**

```
⚠️ Found 3 validation errors in slides-data.json:
  - Field 'bullets' should be 'content' (5 slides affected)
  - Invalid layout value 'custom' should be 'default' (2 slides affected)

Would you like me to automatically fix these errors?
```

## Integration

This skill can be used:

- **After slide generation** — Verify JSON before rendering
- **Before commit** — Ensure all slides are valid
- **Batch validation** — Check all presentations at once

## Related Commands

```bash
# Validate all slides
bun run validate

# Validate then render
bun run validate && bun run slides render -c <config> --in <json>

# Validate then rebuild all
bun run validate && bun run rebuild
```
