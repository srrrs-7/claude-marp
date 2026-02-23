---
name: create-slides
description: 対話型でスライドを一から作成（ヒアリング → 構成 → 生成 → デザイン → エクスポート）
user_invocable: true
---

# Create Slides

`.claude/agents/slide-creator.md` の手順に従って、対話的にスライドを作成する。

## ワークフロー

0. **Pre-flight Checks** — スキーマとディレクトリルールを読み込み、タイムスタンプを生成
1. **ヒアリング** — トピック、対象者、形式、持ち時間、コンテンツ要件、デザインの好みを質問
2. **構成設計** — スライドアウトライン表を提示 → ユーザー承認
3. **config生成** — `slides.config.yaml` を作成（`docs/<timestamp>_<title>/` に専用ディレクトリ）
4. **データ生成** — slide schema に従ったJSON作成 → 検証 → `docs/<timestamp>_<title>/slides-data.json`
5. **レンダリング** — `bun run slides render --in <path>/slides-data.json`
6. **レビューループ** — フィードバック → 修正 → 再レンダリング（OKまで繰り返し）
7. **デザイン調整** — テーマ・CSS・ディレクティブの微調整
8. **エクスポート** — `bun run slides export -f html --in <path>/<name>.md`
9. **セルフヒーリング検証** — エクスポート後に自動検証し、問題があれば修正→再エクスポート
10. **インデックス更新** — `bun run generate:index` で `docs/index.html` を再生成

**出力先:** すべてのファイルは `docs/<yyyymmddhhmmss>_<title>/` 配下に集約される

## 重要

- 各フェーズでユーザーの承認を得てから次に進む
- 一度に全質問せず、フェーズごとに対話する
- **ヒアリングは1項目ずつ質問する**（複数の質問をまとめて投げない。1つの質問→回答→次の質問のサイクルで進める）
- **選択肢がある質問は `AskUserQuestion` ツールで選択式にする**（自由記述が必要な質問はテキストで問いかける）
- アウトライン承認前にデータ生成しない
- レビューループは何度でも回す
- **【重要】config生成時**: `slides.config.yaml` の `output.dir` は **必ず** `"docs/<timestamp>_<title>"` のフルパスを指定（相対パス `"."` は実行ディレクトリ基準で解決されるため不可）
- **【最重要】図解ファースト**: 説明はテキスト箇条書きではなく SVG 図解を第一手段とする。全スライドの 50% 以上に図解を含めること（詳細は「図解ファースト原則」セクション参照）

## 図解ファースト原則

**このスキルで生成するすべてのスライドに適用される強制ルール。**

### 基本方針

> テキストで説明できることは、図で説明できる。図で説明できることは、図で説明しなければならない。

概念・仕組み・比較・フローを「箇条書きだけ」で表現することを禁止する。
SVG インライン図解を第一の表現手段とし、補足テキストを最小限に抑える。

### スライド比率の強制基準

| スライド総数 | 図解スライド最低数 |
|:-----------:|:-----------------:|
| 〜10枚 | 5枚以上 |
| 11〜20枚 | 10枚以上 |
| 21〜40枚 | 21枚以上 |
| 41枚〜 | 全体の 55% 以上 |

**構成設計（フェーズ2）でアウトラインを作る時点で上記比率を満たしていること。**
比率が不足している場合はアウトラインを修正してから承認を求める。

### 図解必須スライドタイプ

以下の内容を持つスライドは、**例外なく SVG 図解を含めること**:

| 内容タイプ | 求められる図解 |
|-----------|--------------|
| アーキテクチャ・構成 | システム構成図・コンポーネント図 |
| フロー・手順・プロセス | フローチャート・シーケンス図 |
| 比較・選定基準 | 比較マトリクス・スペクトル図 |
| タイムライン・歴史 | 水平/垂直タイムライン |
| 階層・分類・カテゴリ | ツリー図・マインドマップ |
| 数値・傾向 | バーチャート・折れ線（SVGで描画） |
| 概念の関係性 | ベン図・矢印付き関係図 |
| Before / After | 左右分割比較図 |

### 表現優先順位（絶対ルール）

```
1位: SVG 図解（フロー・構成・比較・概念）  ← 最優先
2位: SVG 図解 + 補足テキスト（数行以内）
3位: コードブロック（技術的実装の説明に限定）
4位: 箇条書きテキスト（図解で表現困難な場合のみ）  ← 最終手段
```

箇条書き **のみ** のスライドを連続 2 枚以上作ることを禁止する。
3 枚以上連続する場合は、中間に図解スライドを挿入してアウトラインを再設計する。

### 構成設計フェーズでの確認

アウトライン表を作成する際、各スライドに以下のタグを付与する:

- `[SVG]` — SVG 図解メイン
- `[CODE]` — コードブロックメイン
- `[TEXT]` — テキスト/箇条書きメイン（最終手段）
- `[TITLE]` — タイトル/セクション区切り

アウトライン提示時に `[SVG]` タグの数を明示し、比率基準を満たしているか確認する:

```
## アウトライン（全25枚）
SVG図解: 14枚 (56%) ✅ 基準クリア

| # | タイトル | タイプ |
|---|---------|-------|
| 1 | タイトル | [TITLE] |
| 2 | なぜ〜が重要か | [SVG] |
| 3 | アーキテクチャ概要 | [SVG] |
...
```

### SVG 設計の強制ガイドライン

1. **すべての SVG に `viewBox` と `letter-spacing:0` を付与** — Gaia テーマの letter-spacing 継承を防ぐ
2. **`url(#id)` 参照は全面禁止** — `drop-shadow()` CSS / 明示的 `<polygon>` 矢印を使う
3. **色はスライドテーマと調和させる** — gaia: 紫・白系 / default: 青・グレー系 / uncover: モノクロ系
4. **複雑な図（8ノード以上）は単独スライド** — テキストと同居させない
5. **サイズ指定**: `style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`

### レビューループでの図解比率チェック

フェーズ6（レビューループ）でも以下を確認する:

```
チェック: 図解比率 = [SVG]スライド数 / 全スライド数
基準未達（50%未満） → 箇条書きスライドを図解に変換して再生成
基準クリア → 次フェーズへ
```

## Pre-flight Validation

**ワークフローの最初に自動実行:**

1. **Schema ファイルを読み込む:**
   - `src/generate/slide-schema.ts`
   - 有効なフィールド名を確認: `content` (not `bullets`)
   - `layout` enum 値: `"default" | "center" | "section"`

2. **Directory structure rules を読み込む:**
   - `.claude/rules/output-structure.md`
   - フルパス形式: `"docs/<timestamp>_<slug>"`
   - 相対パス禁止

3. **タイムスタンプを生成:**
   - `yyyymmddhhmmss` 形式（14桁）

**これらの情報を各フェーズで参照する**

## Chunked Generation (40枚以上のデッキ必須)

**32Kトークン上限回避のため、40枚以上のスライドは必ずチャンク分割して生成する:**

```
Step 1: slides 1-30  → Write tool で docs/<dir>/slides-data-part1.json に直接書き込み
Step 2: slides 31-60 → Write tool で docs/<dir>/slides-data-part2.json に直接書き込み
Step 3: 結合 → { "slides": [...part1.slides, ...part2.slides] } を slides-data.json に書き込み
Step 4: 中間ファイル削除 → slides-data-part*.json を削除
Step 5: スライド数確認 → 実際の枚数 == 計画枚数 を検証
```

**ルール:**
- JSON をインラインで出力しない（Write tool を使う）
- SVG 内のダブルクォートは `\"` にエスケープしてから JSON に埋め込む
- チャンクサイズは最大30枚（token 上限に余裕を持たせる）

## Post-Generation Validation

**slides-data.json 生成後、render 前に:**

1. 生成した JSON をスキーマと照合
2. エラーがあれば自動修正
3. 3回失敗したら停止してユーザーに報告
4. 検証通過後にファイル書き込み

**検証項目:**
- [ ] フィールド名が正しい (`content` not `bullets`)
- [ ] `layout` 値が有効 (`default`, `center`, `section` のいずれか)
- [ ] 必須フィールドが存在 (`title`, `layout`)
- [ ] オプショナルフィールドのみ省略されている
- [ ] 実際のスライド数 == 計画スライド数（ズレがあれば不足分を追加）
- [ ] JSON.parse() が成功する（SVGエスケープ漏れがないか）

## Error Recovery

**検証エラー発生時:**

1. **エラーの種類を特定:**
   - Field name error → フィールド名を修正
   - Invalid enum value → 有効な値に置換
   - Structural error → 構造を再構築

2. **自動修正を試行**

3. **修正後に再検証**

4. **ユーザーに報告:**
   ```
   ⚠️ Validation error detected and fixed:
   - Changed 'bullets' to 'content' in 5 slides
   - Fixed invalid layout value 'custom' → 'default' in slide 3
   ```

## Phase 9: Self-Healing Post-Export Verification

**エクスポート完了後に自動実行（ユーザー介入不要）:**

### 検証項目

1. **アセットパス検証**: `dist/*.html` 内に `src="assets/"` が残っていないか確認
   - 修正: `src/export/marp.ts` の `fixAssetPaths()` が自動修正するが、念のため確認
2. **SVGアーティファクト検出**: `<p><text>` パターン（生SVGがHTMLにリークした痕跡）
   - 修正: マークダウン内のインラインSVGの空行を除去して再レンダリング
3. **url(#id) 違反チェック**: `assets/*.svg` に禁止パターンがないか
   - 修正: `bun run scripts/fix-svg-url-refs.ts` を実行
4. **コンテンツオーバーフロー**: スライドあたりの行数が上限を超えていないか
   - 修正: `bun run split` でコード/図を分離

### セルフヒーリングループ

```
export → 検証 → 問題検出？
  ├─ No  → 完了。ユーザーに報告
  └─ Yes → 自動修正 → 再エクスポート → 再検証（最大3回）
           3回失敗 → ユーザーに報告して手動介入を依頼
```

### 検証コマンド

```bash
# 一括テスト（全プレゼンテーション）
bun run test

# 個別確認
grep -rn 'src="assets/' docs/<dir>/dist/*.html    # 壊れたパス
grep -rn 'url(#' docs/<dir>/assets/*.svg           # url(#id) 違反
grep -rn '^```mermaid' docs/<dir>/*.md              # Mermaid 残存
```

### 完了報告テンプレート

```
✅ エクスポート完了: docs/<dir>/dist/<name>.html
   - スライド数: N枚
   - SVG図: M個（assets/）
   - テスト: 全パス
   - 問題検出: なし（or 自動修正済み: ～を修正）
```

## Phase 10: インデックス更新

**エクスポート・検証完了後に自動実行:**

新しいプレゼンテーションを `docs/index.html` の一覧に反映する。

```bash
bun run generate:index
```

- `docs/` 配下の全プレゼンテーションをスキャンし、`docs/index.html` を再生成
- `slides.config.yaml` の `topic` やテーマ情報を読み取ってカテゴリ分類・一覧表示
- GitHub Pages で公開されるトップページが自動更新される
- **このステップはユーザー確認不要**（セルフヒーリング検証と同様に自動実行）
