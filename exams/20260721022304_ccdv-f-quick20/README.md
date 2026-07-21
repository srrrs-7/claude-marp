# Claude Certified Developer – Foundations (CCDV-F) 模擬試験 — 20問

| | |
|---|---|
| 対象試験 | CCDV-F（本番: 53問 / 120分 / $125 / 720-1000で合格） |
| この問題集 | 20問（うち複数選択 2問） |
| 想定所要時間 | 約45分 |
| 生成日 | 2026-07-21 |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| D1 Agents & Workflows | 14.7% | 3問 |
| D2 Applications & Integration | 33.1% | 6問 |
| D3 Claude Code | 3.1% | 1問 |
| D4 Eval, Testing & Debugging | 2.6% | 1問 |
| D5 Model Selection & Optimization | 16.8% | 3問 |
| D6 Prompt & Context Engineering | 11.0% | 2問 |
| D7 Security & Safety | 8.1% | 2問 |
| D8 Tools & MCPs | 10.6% | 2問 |

## 使い方

1. `exam.md`（または `CCDV-F.pdf`）を時間を計って解く
2. 巻末／`answers.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| D1 Agents & Workflows | 3 | | |
| D2 Applications & Integration | 6 | | |
| D3 Claude Code | 1 | | |
| D4 Eval, Testing & Debugging | 1 | | |
| D5 Model Selection & Optimization | 3 | | |
| D6 Prompt & Context Engineering | 2 | | |
| D7 Security & Safety | 2 | | |
| D8 Tools & MCPs | 2 | | |
| **合計** | 20 | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/20260721022304_ccdv-f-quick20/items.json
