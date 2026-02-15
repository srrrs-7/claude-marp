---
name: agent-teams
description: tmux分割ペインで複数AIエージェント（Claude Code + Codex）を並列起動し、実装・レビューの高速サイクルを回す
user_invocable: true
---

# Agent Teams

tmux分割ペインで複数AIエージェントを並列起動し、**Claude Code（実装）** と **Codex（レビュー）** の高速サイクルを回す。Leader がタスク分解・進捗管理を行い、Member が実装・レビューを並列実行する。

## 前提条件

- Claude Code CLI (`claude` コマンド)
- OpenAI Codex CLI (`codex` コマンド)
- tmux

## ワークフロー

### Phase 1: ヒアリング

以下を **1項目ずつ** 質問する:

1. **タスク内容**: 何を実装するか（機能追加、リファクタ、バグ修正など）
2. **スコープ**: 対象ファイル・ディレクトリ、影響範囲
3. **チーム規模**: 実装ワーカー数（デフォルト: 2）、レビューワーカー数（デフォルト: 2）
4. **レビュー基準**: コードスタイル、テスト要件、パフォーマンス要件など

### Phase 2: タスク分解

ヒアリング結果からタスクを分解し、表形式で提示:

| # | タスク名 | 説明 | 対象ファイル | 依存 |
|---|---------|------|-------------|------|
| 1 | ... | ... | ... | なし |
| 2 | ... | ... | ... | #1 |

**ユーザーの承認を得てから次に進む。**

### Phase 3: ワークスペース準備

1. セッションIDを生成（`yyyymmddhhmmss` 形式）
2. ワークスペースディレクトリを作成:

```
.agent-teams/<session-id>/
├── team.json              # チーム構成メタデータ
├── tasks/
│   └── task-NNN.json      # タスク定義 + ステータス
├── status/
│   └── <agent-id>.json    # 各ワーカーの状態・ハートビート
├── reviews/
│   └── task-NNN-review.json  # レビュー結果
└── log/
    └── <agent-id>.log     # アクティビティログ
```

3. `team.json` を作成（セッション情報、ワーカー構成）
4. タスクJSONを作成（Phase 2 で承認されたタスク一覧）

### Phase 4: tmux セッション起動

```bash
bash scripts/setup-agent-team.sh <session-id> .agent-teams/<session-id> <impl-count> <review-count>
```

tmux レイアウト:
```
┌──────────────────────────────────────────┐
│            Leader (pane 0)                │
│     Claude Code - タスク分解・進捗管理      │
├───────────────────┬──────────────────────┤
│  Impl-1 (pane 1)  │  Impl-2 (pane 2)    │
│  Claude Code       │  Claude Code         │
├───────────────────┼──────────────────────┤
│ Review-1 (pane 3) │ Review-2 (pane 4)    │
│  Codex             │  Codex               │
└───────────────────┴──────────────────────┘
```

### Phase 5: 監視・介入

起動後、ユーザーに以下を案内:

- **ステータス確認**: `bash scripts/agent-team-status.sh <session-id>`（または `bun run team:status <session-id>`）
- **tmux接続**: `tmux attach -t agent-team-<session-id>`
- **タスク追加**: `.agent-teams/<session-id>/tasks/` に新しいタスクJSONを追加
- **停止**: `.agent-teams/<session-id>/` に `shutdown` ファイルを作成

### Phase 6: 完了処理

全タスク完了後:

1. 変更差分をユーザーに提示（`git diff`）
2. ユーザー承認後にコミット

### Phase 7: クリーンアップ

**完了処理の最後に必ず実行する。** 一時ファイル・ワークスペースを削除して作業環境をクリーンに保つ。

1. **tmux セッション停止**: `tmux kill-session -t agent-team-<session-id>`（まだ残っている場合）
2. **ワークスペース削除**: `rm -rf .agent-teams/<session-id>/`
3. **分割ファイル削除**: タスクで生成した中間ファイル（`*-part*.json` 等）を削除
4. **最終成果物の確認**: 統合済みの成果物のみが残っていることを確認

```bash
# クリーンアップコマンド例
tmux kill-session -t agent-team-<session-id> 2>/dev/null || true
rm -rf .agent-teams/<session-id>/
rm -f <output-dir>/*-part*.json
```

**削除対象:**
- `.agent-teams/<session-id>/` — タスクJSON、ステータス、レビュー結果、ログ
- `*-part*.json` — 分割生成された中間データファイル

**保持対象:**
- 統合済みの最終成果物（`slides-data.json`、`.md`、`dist/` 等）
- `slides.config.yaml`

## タスクライフサイクル

```
pending → in_progress → impl_done → in_review → review_done → completed
                                         ↓
                                    needs_revision → in_progress (cycle++)
```

- **サイクル上限**: maxCycles=3（無限ループ防止）
- **レビュー verdict**: `approved`（→ completed）| `needs_revision`（→ impl に戻す）

## 重要

- 各フェーズでユーザーの承認を得てから次に進む
- タスク分解時にファイル競合が起きないよう、各タスクは独立したファイルセットを操作するようにする
- `CLAUDECODE` 環境変数をクリアしてネスト防止
- tmux が利用不可の場合はエラーメッセージを表示して終了
