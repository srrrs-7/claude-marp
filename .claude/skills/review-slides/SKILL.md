---
name: review-slides
description: 生成されたMarpスライドをレビューして改善提案
user_invocable: true
---

# Review Slides

1. `docs/` の最新 `.md` を読む（またはユーザー指定ファイル）
2. 以下の観点でレビュー:

## チェックリスト

### 🏆 Google / Amazon 品質基準（最優先）

#### Assertive Title（主張タイトル）
- 各スライドのタイトルが**結論・主張・数値を含む主張文**になっているか
  - ❌ `コスト削減` → ✅ `コスト削減で年間$2M回収できる`
  - ❌ `アーキテクチャ概要` → ✅ `新アーキテクチャが99.9%可用性を保証する理由`
  - ❌ `課題` → ✅ `現状のレイテンシが顧客離脱の主因になっている`
- コンテンツスライド（`layout: default`）の**60%以上**が主張タイトルであること
- `layout: section` の区切りスライドはラベルタイトルでOK

#### BLUF（Bottom Line Up Front）
- デッキ冒頭3枚以内に**主張・根拠・アクション**が揃っているか
- `subtitle` フィールドが密度の高いスライドに設定されているか（"So What?" の一行サマリー）

#### "So What?" テスト
- 各スライドを削除してもデッキが成り立つ → そのスライドは不要、削除または統合を検討
- すべてのスライドが「なぜ今重要か」「何をすべきか」「知らないとどうなるか」のいずれかに答えているか

#### SCQA ナラティブ（Minto Pyramid）
- **S（状況）**: 聴衆が共有する前提・現状を提示できているか
- **C（複雑化）**: 問題・変化・緊張を明示しているか
- **Q（問い）**: 「ではどうすれば？」が明確か
- **A（答え）**: 冒頭（タイトルスライド直後）にBLUFで提示されているか

#### データ引用
- 数値・統計を使うすべてのスライドに `speakerNotes` に出典URLがあるか
- 「多くの」「ほとんどの」など曖昧表現 → 具体的な数字に置換

---

### コンテンツ密度（はみ出し）
- **箇条書き**: 1スライドmax **6〜7項目**。8項目以上 → 分割（`python3 scripts/split-bullet-overflow.py`）
- **1行あたり文字数**: 日本語60文字以内。長すぎる箇条書きは認知負荷を上げる
- **コードブロック**: 8行推奨、**12行絶対最大**。超過 → `bun run split`
- **コード+箇条書き混在**: コード7〜10行なら箇条書き最大2項目、11〜12行なら最大1項目

### フロントマター
- `marp: true` が存在するか
- `class: invert` が設定されているか（gaiaテーマ）— config.yamlの `marp.class: "invert"` で自動適用
- `size: 16:9` が設定されているか
- `section pre code { font-size: 0.6em; }` がstyleに含まれているか

### 構成と論理
- **構成**: intro → body → conclusion の論理的な流れ
- **空白スライド**: 内容のない空白スライドがないか
- **言語**: 設定言語（ja/en）と一致しているか

### 図解ファースト（重要）
- **SVG比率**: 全スライドの50%以上に図解があるか。50%未満 → 箇条書きをSVGに変換提案
- **連続テキストのみ**: 2枚以上連続する箇条書きのみスライドがないか（→ 中間にSVGを挿入）

### SVG品質
- SVGに `viewBox` 属性があるか
- SVGに `url(#id)` 参照がないか（filter, marker-end, fill → `bun scripts/fix-svg-url-refs.ts`）
- SVGに `letter-spacing:0` スタイルがあるか（gaia テーマの文字間隔漏れ防止）
- 外部SVGファイルは `assets/` ディレクトリにあり、`![w:800 center](assets/file.svg)` で参照されているか

### コード品質
- 言語タグが正確か（`typescript`, `python`, `bash` など）
- 構文が妥当か

### スピーカーノート
- 箇条書きの単なる繰り返しでなく、「なぜこれが重要か」「具体例・エピソード」「次スライドへの橋渡し」が含まれているか
- データ主張には出典URLが記載されているか

---

3. 改善点を番号付きリストで提案（重大度: 🔴高 / 🟡中 / 🟢低）

   **重大度の基準:**
   - 🔴高: タイトルが全てラベル、BLUFなし、SVG比率0%、hasみ出しあり
   - 🟡中: assertive title比率40%以下、連続テキスト3枚以上、subtitle未設定
   - 🟢低: 長い箇条書き、出典URL欠如、speakerNotes不足

4. 承認されたら以下の順で修正を実行:
   - 品質チェック → `bun run validate -- --quality`
   - 一括修正（推奨）→ `bun run fix:all`（fix + split + bullet-split + fix-svg + generate:index を連鎖）
   - 個別修正: `bun run fix` / `bun run split` / `python3 scripts/split-bullet-overflow.py --all` / `bun scripts/fix-svg-url-refs.ts`
   - ヘルスチェック → `bun run doctor`
   - 再レンダリング → `bun run rebuild:render`
   - エクスポート → `bun run rebuild:export`
   - インデックス更新 → `bun run generate:index`
