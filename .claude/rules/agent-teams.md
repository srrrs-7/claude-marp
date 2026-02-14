---
description: Agent Teams workflow templates for batch slide operations
paths:
  - docs/**/*
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
   - viewBox 必須、style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"
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
