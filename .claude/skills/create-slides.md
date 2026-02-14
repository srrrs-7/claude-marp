---
name: create-slides
description: 対話型でスライドを一から作成（ヒアリング → 構成 → 生成 → デザイン → エクスポート）
user_invocable: true
---

# Create Slides

`.claude/agents/slide-creator.md` の手順に従って、対話的にスライドを作成する。

## ワークフロー

1. **ヒアリング** — トピック、対象者、形式、持ち時間、コンテンツ要件、デザインの好みを質問
2. **構成設計** — スライドアウトライン表を提示 → ユーザー承認
3. **config生成** — `slides.config.yaml` を作成
4. **データ生成** — slide schema に従ったJSON作成 → `docs/slides-data.json`
5. **レンダリング** — `bun run slides render --in docs/slides-data.json`
6. **レビューループ** — フィードバック → 修正 → 再レンダリング（OKまで繰り返し）
7. **デザイン調整** — テーマ・CSS・ディレクティブの微調整
8. **エクスポート** — `bun run slides export -f html --in docs/<name>.md`

## 重要

- 各フェーズでユーザーの承認を得てから次に進む
- 一度に全質問せず、フェーズごとに対話する
- アウトライン承認前にデータ生成しない
- レビューループは何度でも回す
