---
name: batch-decks
description: 複数トピックのデッキを一括で並列作成する（「全N個」「N本まとめて」指示用）。1デッキ=1サブエージェント
user-invocable: true
argument-hint: "<トピック一覧 | トピックを列挙したファイルパス>"
---

# Batch Decks

複数デッキをまとめて作る時の並列フロー。**1デッキ = 1 subagent**（1デッキ内をさらに分割するのは `/create-slides` の役目）。

## Phase 0 — 確認（1回だけ、まとめて聞く）

デッキごとにヒアリングし直さない。全デッキ共通の設定を**一度だけ**確認する:

- テーマ（gaia / default / uncover）と `class: invert` の有無
- 言語（ja / en）
- 1デッキあたりの枚数目安
- 出力先の命名（`docs/<yyyymmddhhmmss>_<slug>/`）

> ユーザーが `"全N個"` `"all N topics"` `"全部並列"` と言った時点で、これは**着手の合図**。確認で往復しない。

## Phase 1 — ディレクトリ確保（親がやる）

各デッキの `docs/<timestamp>_<slug>/` と `slides.config.yaml` を**親が先に**作る。subagent にタイムスタンプを決めさせると衝突する。

```bash
date +%Y%m%d%H%M%S
```

## Phase 2 — 並列起動

- **1メッセージ内で全 subagent を同時起動**（`run_in_background: true`）。`mode: "bypassPermissions"` は Deprecated なので指定しない — サブエージェントは親の権限モードを継承する
- ウェーブは最大7体。全ウェーブ完了を待ってから次へ
- 各 subagent に渡すもの: トピック / 出力ディレクトリ（**専用**）/ 枚数 / テーマ / 言語
- 使う agent: `slide-chunk-writer`（本文）、必要なら `svg-diagram-author` を続けて起動

## Phase 3 — 統合（親が逐次）

```bash
bun run validate      # 全デッキまとめて検証
bun run fix:all
bun run rebuild       # 差分のみ再render（parallel）+ 再export（逐次）
bun run generate:index
```

> **export は必ず逐次。** 並列にすると Marp CLI のキャッシュが競合して静かに壊れる。`bun run rebuild` は既に render=並列 / export=逐次で組んであるので、自前で並列化しない。

## Phase 4 — 報告

デッキ単位の表で一覧報告する。失敗したデッキは伏せずに出す。

```
| deck | slides | grade | export |
|------|--------|-------|--------|
| docs/..._a | 32 | B (56) | ok |
| docs/..._b | 28 | A (74) | ok |
| docs/..._c | -- | --     | FAILED: SVG url(#id) 違反で render 中断 |
```
