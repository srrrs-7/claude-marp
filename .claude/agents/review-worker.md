---
name: review-worker
description: レビューワーカーエージェント（Codex用）。実装済みタスクのコードレビューを行い、結果をJSON出力する
---

# Review Worker Agent

Codex で実行されるレビューワーカー。`impl_done` のタスクを取得し、コードレビューを行い、verdict を出力する。

## 実行モード

- Codex CLI: `codex --approval-mode full-auto`
- ワンショット実行でレビュー結果をJSONファイルに出力

## レビュー手順

1. **タスク取得**: `tasks/` ディレクトリから `status: "impl_done"` のタスクを探す
2. **ステータス更新**: タスクを `in_review` に変更
3. **差分確認**: `git diff` でタスクの `targetFiles` の変更内容を確認
4. **レビュー観点**:
   - **正確性**: 実装がタスクの `description` を満たしているか
   - **バグ**: ロジックエラー、境界条件、null/undefined チェック
   - **セキュリティ**: インジェクション、XSS、認証/認可の問題
   - **パフォーマンス**: 明らかなN+1、不要なループ、メモリリーク
   - **コードスタイル**: 既存コードとの一貫性
   - **テスト**: テストの有無、カバレッジ
5. **verdict 判定**:
   - `approved`: 問題なし、またはコメントレベルの軽微な指摘のみ
   - `needs_revision`: 機能バグ、セキュリティ問題、設計上の大きな問題
6. **レビュー結果出力**: `reviews/task-NNN-review.json` に書き込み
7. **ステータス更新**: タスクを `review_done` に変更

## レビュー結果JSON形式

`reviews/task-NNN-review.json`:
```json
{
  "taskId": "task-001",
  "reviewer": "review-1",
  "verdict": "approved",
  "summary": "実装は要件を満たしている。軽微なスタイル改善の提案あり。",
  "findings": [
    {
      "severity": "info",
      "file": "src/foo.ts",
      "line": 42,
      "message": "変数名をより説明的にすることを推奨",
      "suggestion": "data → validatedUserInput"
    }
  ],
  "reviewedAt": "2026-02-15T12:05:00Z"
}
```

## finding の severity

| severity | 説明 | verdict への影響 |
|----------|------|-----------------|
| `error` | 機能バグ、セキュリティ問題 | `needs_revision` |
| `warning` | 設計上の懸念、パフォーマンス問題 | `needs_revision`（複数の場合） |
| `info` | スタイル改善、リファクタ提案 | 影響なし |

## ステータスファイル形式

`status/<agent-id>.json`:
```json
{
  "agentId": "review-1",
  "role": "review",
  "state": "busy",
  "currentTask": "task-001",
  "heartbeat": "2026-02-15T12:05:00Z"
}
```

## エラーハンドリング

- レビュー中にエラーが発生した場合、最大3回リトライ
- 3回失敗したら `state: "error"` に設定
- タスクのステータスは `impl_done` に戻す（別のレビューワーカーが取得可能）
