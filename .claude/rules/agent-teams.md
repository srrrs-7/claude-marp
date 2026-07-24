---
description: Multi-agent orchestration detail (parent/subagent contract, model tiering) and Agent Teams workflow templates
paths:
  - docs/**/*
---

# Multi-Agent Orchestration — 詳細リファレンス

CLAUDE.md「Multi-Agent Development」の要点を実行するときの詳細。

## 親エージェントの責務

| フェーズ | やること | やってはいけないこと |
|---------|---------|-------------------|
| 分解 | 重複しない作業単位に切る。各単位に専用の出力ファイルを割り当てる | 単位が曖昧なまま起動する |
| 起動 | **1 メッセージ内で全 subagent を同時に** `Agent` 呼び出し | 1つずつ起動して待つ（逐次化） |
| 待機 | 全件の返り値が揃うまで統合を始めない | 部分結果で先に進む |
| 統合 | マージ → `bun run validate` → `bun run lint` → render → export（**逐次**） | subagent に統合させる |
| 報告 | 全体を1つの成果として報告 | subagent の生ログをそのまま貼る |

**親は実作業をしない。** 自分でスライドを1本書きながら subagent も走らせる、は禁止。分解できなかった残りがあるなら、それも subagent に渡す。

## サブエージェントの契約

各 subagent のプロンプトに必ず含める:

1. **担当範囲** — スライド番号レンジ / 対象デッキ / 対象ファイルを明示
2. **専用出力パス** — `slides-data-part{N}.json` など、他と絶対に重ならないパス
3. **参照すべきルール** — `.claude/rules/` の該当ファイル(svg / slide-generation / slide-design)
4. **返り値の形式** — 「成果物そのもの」ではなく「統合に必要なメタ情報」（32K上限対策 — 本体は必ず Write でファイルへ）:

```
書き込んだファイル: docs/<dir>/slides-data-part2.json
担当レンジ: slides 21-40（実際に生成した枚数: 20）
SVG使用スライド: 12/20
主張タイトル: 14/20
未解決の問題: なし / <あれば1行で>
```

## 使い分け

| 状況 | 形態 |
|------|------|
| 30枚以上のデッキ生成 | 15枚ずつ分割 → subagent 並列（SVG比率が低ければ20枚まで可） |
| 複数デッキの一括作成（"全N個"） | デッキ1つ = subagent 1つ |
| 横断調査（どのデッキが grade C か 等） | 観点ごとに subagent を分けて並列探索 |
| 独立した複数ファイルの修正 | ファイル群ごとに subagent |
| 1ファイルの小さな修正・確認だけ | **subagent を使わず親が直接やる** |
| render / export | **常に親が逐次実行**（Marp CLI キャッシュ競合） |

## モデル振り分け — 複雑度に応じてコストを下げる

**サブエージェントの `model:` を省略すると既定は `inherit`（＝親と同じ最上位モデル）。** 複雑度の階層で明示的に割り当てる。

| 階層 | 作業の性質 | model | effort | 該当エージェント |
|------|-----------|-------|--------|----------------|
| **L3 設計・統合** | 分解、判断、対話、マージ可否の決定 | `inherit` | 既定 | `slide-creator`, `team-leader` |
| **L2 生成** | スライド本文・作図（品質が直接成果物になる） | `opus` | 既定 | `slide-chunk-writer`, `svg-diagram-author` |
| **L2 実装・調査** | コード実装、レビュー、出典調査、CSS調整 | `sonnet` | `medium`/`low` | `impl-worker`, `review-worker`, `slide-researcher`, `marp-customizer` |
| **L1 機械** | 決定論的コマンド実行、集計、整形 | `haiku` | `low` | `deck-fixer`, `deck-quality-auditor` |

**判断基準:** 「出力が正解かどうかを `bun run validate` / `stats` で機械判定できるか？」— できる作業は L1。できない（人が読んで良し悪しを決める）作業は L2 以上。

**効くレバー:** ✅ `model:`（最大の削減要因）✅ `effort: low` ✅ 返り値をメタ情報に限定 ✅ エージェント定義を短く保つ ⚠️ `tools:` 絞り込みはトークン削減効果未確認（権限最小化としてのみ価値）

**`model` に指定できる値:** `haiku` / `sonnet` / `opus` / `fable` / `inherit` / フルモデルID。省略時は `inherit`。

## 実行パラメータ

> **⚠️ `mode: "bypassPermissions"` はもう指定しない。** Agent ツールの `mode` は現在 Deprecated / 無視されるパラメータで、サブエージェントは親セッションの権限モードを自動的に継承する。恒久的に権限を変えたい場合のみ、エージェント定義ファイルの `permissionMode:` で上書きする。プロンプト本文に「You have full permissions …」と書くことにも権限付与の効果はない — ツール制限は定義ファイルの `tools:` で決まる。

| Agent ツールのパラメータ | 値 | 効果 |
|--------------------|---------------|--------|
| `subagent_type` | `"slide-chunk-writer"` / `"general-purpose"` など | 用途に合ったエージェントを選ぶ |
| `run_in_background` | `true`（既定） | 並列実行。`false` で結果を待って同期実行 |
| `name` | `worker-1`, `worker-2`, … | 親から `SendMessage` で追撃指示を出せるようにする |
| `model` | 省略推奨 | 定義ファイルの `model:` が効く。ここで上書きすると振り分け設計が崩れる |

**Failure symptom:** ワーカーが並列にならない場合、原因はほぼ「1つずつ起動して待っている」こと。全 subagent を**1メッセージ内で**起動する。

**File isolation:** 各ワーカーに重複しない出力ファイル（`slides-data-part{N}.json`）を割り当てる。範囲が重複すると Marp CLI キャッシュ競合で静かに壊れる。

**Wave-based execution for 10+ workers:** 5-7個ずつのウェーブに分け、全完了を待ってから次のウェーブを起動する。

**`bun run slides export` は常に逐次実行**（並列にしない — Marp CLI キャッシュ競合）。

---

# Agent Teams（tmux 並列実行）

tmux-based parallel execution: Claude Code (impl) + Codex (review) workers in split panes.

- **Task lifecycle:** `pending → in_progress → impl_done → in_review → review_done → completed`（`needs_revision → in_progress` for revisions; max 3 cycles）
- **File-based workspace:** `.agent-teams/<session-id>/`（gitignored）。Contains `team.json`, `tasks/`, `status/`, `reviews/`, `log/`
- **Key rules:** Each task on independent file sets (no overlap). `CLAUDECODE=` cleared to prevent nested sessions. HTML export always sequential.
- 起動: `bun run team <session-id> <workspace> [impl-count] [review-count]` / 監視: `bun run team:status <session-id> [--watch]`

---

# Agent Teams ワークフローテンプレート

Claude Code Agent Teams を使った並列処理のテンプレート集。

---

## テンプレート1: バッチSVG変換

**目的:** 複数プレゼンテーションのMermaid→SVG変換を並列実行

**チーム構成:**
- Team Lead: オーケストレーション（タスク作成・進捗管理）
- Worker x N: 各プレゼンテーションのSVG変換

**タスク定義（Worker向け）:**

```
対象: docs/<dir>/*.md
1. マークダウン内の ```mermaid ブロックをすべて特定
2. 各ブロックをインラインSVGに変換
   - SVG ID は <diagram-name>-<element> 形式でプレフィックス付与
   - viewBox 必須。width/height/max-height等のサイズ指定・vh単位は書かない（`.fig`ラッパーが自動で収める）
   - url(#id) は使用禁止（filter: drop-shadow() と <polygon> で代替）
   - 空行をSVG内に入れない
3. 変換後に検証:
   - grep '^```mermaid' で残存チェック
   - grep 'url(#' で禁止パターンチェック
4. bun run slides export でHTMLエクスポート
5. 結果をTeam Leadに報告
```

---

## テンプレート2: 全プレゼンテーション一括エクスポート

**目的:** スキーマ変更やテンプレート修正後に全プレゼンを再ビルド

**チーム構成:**
- Team Lead: タスク分配・結果集約
- Worker x N: 各プレゼンテーションのrender + export

**タスク定義（Worker向け）:**

```
対象: docs/<dir>/
1. bun run slides render -c <config> --in <slides-data.json>
2. bun run slides export -c <config> -f html --in <name>.md
3. 検証:
   - grep 'src="assets/' dist/*.html で壊れたパスがないことを確認
   - dist/*.html が存在することを確認
4. 結果をTeam Leadに報告
```

**注意:** `bun run rebuild` で逐次実行も可能。並列化が必要な場合のみチームを使う。

---

## テンプレート3: 並列プレゼンテーション作成

**目的:** 複数トピックのプレゼンを同時に作成

**チーム構成:**
- Team Lead: トピック割り当て・品質チェック
- Creator x N: 各プレゼンの /create-slides ワークフロー実行

**タスク定義（Creator向け）:**

```
トピック: <TOPIC>
対象者: <AUDIENCE>
スライド数: <COUNT>

1. Pre-flight: スキーマ読み込み、タイムスタンプ生成
2. slides.config.yaml 作成（output.dir はフルパス必須）
3. slides-data.json 生成 → スキーマ検証
4. render → export → セルフヒーリング検証
5. bun run test で回帰テスト通過を確認
6. 結果をTeam Leadに報告
```

---

## チーム運用ルール

- **各Workerは独立したプレゼンテーションディレクトリのみ操作する**（ファイル競合を回避）
- **共有ファイル（src/*, scripts/*, CLAUDE.md）は変更しない**
- **完了後は必ずTeam Leadに報告** → Team Leadが集約コミット
- **エラー時は3回リトライ** → 失敗したらTeam Leadにエスカレーション
