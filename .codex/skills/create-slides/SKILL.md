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
3. **config生成** — `slides.config.yaml` を作成（`docs/<timestamp>_<title>/` に専用ディレクトリ）
4. **データ生成** — slide schema に従ったJSON作成 → `docs/<timestamp>_<title>/slides-data.json`
5. **レンダリング** — `bun run slides render --in <path>/slides-data.json`
6. **レビューループ** — フィードバック → 修正 → 再レンダリング（OKまで繰り返し）
7. **デザイン調整** — テーマ・CSS・ディレクティブの微調整
8. **エクスポート** — `bun run slides export -f html --in <path>/<name>.md`

**出力先:** すべてのファイルは `docs/<yyyymmddhhmmss>_<title>/` 配下に集約される

## 重要

- 各フェーズでユーザーの承認を得てから次に進む
- 一度に全質問せず、フェーズごとに対話する
- **ヒアリングは1項目ずつ質問する**（複数の質問をまとめて投げない。1つの質問→回答→次の質問のサイクルで進める）
- 選択肢がある質問は、候補を提示したうえで対話で1つずつ確認する（自由記述が必要な質問はテキストで問いかける）
- アウトライン承認前にデータ生成しない
- レビューループは何度でも回す
