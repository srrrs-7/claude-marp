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

**出力先:** すべてのファイルは `docs/<yyyymmddhhmmss>_<title>/` 配下に集約される

## 重要

- 各フェーズでユーザーの承認を得てから次に進む
- 一度に全質問せず、フェーズごとに対話する
- **ヒアリングは1項目ずつ質問する**（複数の質問をまとめて投げない。1つの質問→回答→次の質問のサイクルで進める）
- **選択肢がある質問は `AskUserQuestion` ツールで選択式にする**（自由記述が必要な質問はテキストで問いかける）
- アウトライン承認前にデータ生成しない
- レビューループは何度でも回す
- **【重要】config生成時**: `slides.config.yaml` の `output.dir` は **必ず** `"docs/<timestamp>_<title>"` のフルパスを指定（相対パス `"."` は実行ディレクトリ基準で解決されるため不可）

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
