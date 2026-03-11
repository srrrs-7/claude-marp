---
name: validate
description: スライドデータとconfigをスキーマに対して検証
user_invocable: true
---

# Validate Skill

すべての slides-data.json ファイルをスキーマ・品質基準に対して検証する。

## Usage

```bash
/validate
```

または特定のディレクトリを指定:

```bash
/validate docs/20260214073222_example
```

## Workflow

1. **スキーマ検証（必須）**
   ```bash
   bun run validate
   ```

2. **品質チェック（スキーマ通過後に実施）**

   | チェック項目 | NG条件 | 修正コマンド |
   |-------------|--------|------------|
   | 箇条書き数 | 1スライドに8項目以上 | `python3 scripts/split-bullet-overflow.py --all` |
   | コードブロック行数 | 12行超え | `bun run split` |
   | コード+箇条書き混在 | コード7〜10行で箇条書き3項目以上 | `bun run split` |
   | SVG比率 | 全スライドの50%未満 | 手動でSVGスライドを追加 |
   | url(#id) 参照 | SVG内に filter/marker-end/fill の url(#...) | `bun scripts/fix-svg-url-refs.ts` |
   | class:invert | gaiaテーマで未設定 | フロントマターに手動追加 |

3. **結果分析**
   - ✅ Valid files のリスト
   - ❌ Invalid files のリスト (エラー詳細付き)

4. **エラーがある場合**
   - エラーの種類を説明
   - 自動修正が可能かユーザーに確認
   - 承認後に `bun run fix` で自動修正

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

**Missing required fields:**
- Every slide must have: `title`, `layout`
- Optional fields: `content`, `code`, `codeLanguage`, `speakerNotes`

## Auto-fix Commands

```bash
bun run fix:all                                      # 一括修正: fix → split → bullet-split → fix-svg → generate:index
# または個別に:
bun run fix                                          # bullets→content, invalid layout values
bun run split                                        # split code+bullets co-located slides
python3 scripts/split-bullet-overflow.py --all       # split 8+ bullet slides into 2
bun scripts/fix-svg-url-refs.ts                      # fix url(#id) violations in SVGs
bun run doctor                                       # project health check (toolchain, exports, SVG violations)
```

## Full Validation Pipeline

```bash
bun run validate \
  && bun run fix \
  && bun run split \
  && python3 scripts/split-bullet-overflow.py --all \
  && bun scripts/fix-svg-url-refs.ts \
  && bun run rebuild:render
# After render: manually add class:invert to gaia theme .md files
# Then: bun run rebuild:export && bun run generate:index
```

## Related Commands

```bash
# Validate all slides
bun run validate

# Validate then render
bun run validate && bun run slides render -c <config> --in <json>

# Validate then rebuild all
bun run validate && bun run rebuild
```
