# Claude Certified Associate – Foundations (CCAO-F) 模擬試験 — 20問

| | |
|---|---|
| 対象試験 | CCAO-F（本番: 60問 / 120分 / $99 / 720-1000で合格） |
| この問題集 | 20問（うち複数選択 2問） |
| 想定所要時間 | 約40分 |
| 生成日 | 2026-07-21 |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| D1 Prompting & Task Execution | 14% | 3 |
| D2 Output Evaluation & Validation | 21% | 5 |
| D3 Product & Model Selection | 12% | 2 |
| D4 Workflow Integration & Solution Design | 16% | 3 |
| D5 Configuration & Knowledge Management | 12% | 2 |
| D6 Governance, Risk & Responsible Use | 15% | 3 |
| D7 Troubleshooting & Optimization | 10% | 2 |

## 使い方

1. `exam.ja.md`（または `CCAO-F_Associate_practice_20_ja.pdf`）を時間を計って解く
2. 巻末／`answers.ja.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| D1 Prompting & Task Execution | 3 | | |
| D2 Output Evaluation & Validation | 5 | | |
| D3 Product & Model Selection | 2 | | |
| D4 Workflow Integration & Solution Design | 3 | | |
| D5 Configuration & Knowledge Management | 2 | | |
| D6 Governance, Risk & Responsible Use | 3 | | |
| D7 Troubleshooting & Optimization | 2 | | |
| **合計** | 20 | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/20260721022304_ccao-f-quick20/items.json
