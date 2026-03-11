---
name: ship
description: 変更をステージング → コミット → プッシュまで一括実行
user_invocable: true
---

# Ship (Commit & Push)

現在の変更を確認し、コミットメッセージを生成してプッシュする。

## ワークフロー

1. **状態確認**: `git status` と `git diff --stat` で変更内容を把握
2. **差分分析**: 変更ファイルの内容を読み、変更の目的を理解
3. **Pre-ship チェック**: スライド変更が含まれる場合は以下を確認
   - `bun run doctor` — ツールチェーン・エクスポート・SVG違反の総合ヘルスチェック
   - `bun run validate` — スキーマエラーなし
   - `bun run test` — 回帰テストパス
4. **コミットメッセージ生成**:
   - Conventional Commits 形式 (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`)
   - 日本語の変更がメインなら日本語メッセージも可
   - 1行目: 簡潔な要約（70文字以内）
   - 空行 + 本文: 必要に応じて詳細
5. **ユーザー確認**: コミットメッセージを提示し、承認を得る
6. **実行**: `git add` → `git commit` → `git push`
7. **結果報告**: コミットハッシュとプッシュ先を表示

## ルール

- `.env`、credentials、秘密鍵など機密ファイルはコミットしない（検出したら警告）
- `git add -A` ではなく、関連ファイルを明示的に指定
- コミットメッセージ末尾に `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` を付与
- プッシュ前にリモートとの差分を確認し、force push が必要な場合はユーザーに警告
- 変更がない場合は「コミットする変更がありません」と報告して終了

## スライド変更時の追加確認

大量のスライドファイルがある場合:
- `docs/` 配下の `.md` と `.json` のみコミット（生成済みHTML `dist/` は任意）
- `index.html` の更新を忘れずに含める（`bun run generate:index` 実行済みか確認）
