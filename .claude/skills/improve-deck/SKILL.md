---
name: improve-deck
description: グレードC/Dのデッキを特定し、サブエージェントを並列起動して品質を引き上げる（SVG追加・主張タイトル化・subtitle付与）
user-invocable: true
argument-hint: "[デッキ名の部分一致 | 省略で最悪デッキを自動選択]"
---

# Improve Deck

低グレードのデッキを **parent → 並列 subagent → 統合** で引き上げる。

## Phase 1 — 対象特定（安い層）

`deck-quality-auditor`（haiku）を1体だけ起動し、改善対象と「何を足せば一番上がるか」を出させる。

引数でデッキが指定されていればこのフェーズは省略し、そのデッキだけ `bun run stats -- --verbose` で確認する。

## Phase 2 — 改善方針の決定（親がやる）

監査結果を読み、**親が**どのスライドをどう直すか決める。ここは委譲しない。

| 不足 | 打ち手 | 担当 |
|---|---|---|
| SVG率が低い | テキストのみのスライドを図に置換／図を追加 | `svg-diagram-author` |
| 主張タイトル率が低い | ラベルタイトルを結論文に書き換え | `slide-chunk-writer` |
| subtitle不足 | 4項目以上のスライドに "So What?" 1行を付与 | `slide-chunk-writer` |
| 箇条書き過多・コードはみ出し | 機械的分割 | `deck-fixer` |

## Phase 3 — 並列実行

- **1メッセージ内で全 subagent を同時起動**（`run_in_background: true`）。`mode: "bypassPermissions"` は Deprecated なので指定しない — サブエージェントは親の権限モードを継承する
- 各 subagent は**重ならないスライド範囲**を担当し、専用の part ファイルに書く
- 10体を超えるならウェーブ（1ウェーブ最大7体）

## Phase 4 — 統合（親がやる）

```bash
# part をマージ → slides-data.json
bun run validate
bun run fix:all
bun run single <deckDir> all     # render + export（逐次）
bun run stats -- --verbose       # 改善幅を確認
```

## Phase 5 — 報告

**改善前後のグレードとスコアを対比**して報告する。上がらなかった項目は理由を添えて正直に書く。

```
docs/<dir>:  D (24) → B (58)
  svg       2/31 → 17/31
  assertive 6/28 → 21/28
  subtitle  0/28 → 12/28
未達: SVG率 55%（目標50%は達成、A到達には assertive 80%が必要）
```
