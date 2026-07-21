# Claude Certified Architect – Professional (CCAR-P) 模擬試験 — 20問

| | |
|---|---|
| 対象試験 | CCAR-P（本番: 63問 / 120分 / $175 / 720-1000で合格） |
| この問題集 | 20問（うち複数選択 2問） |
| 想定所要時間 | 約38分 |
| 生成日 | 2026-07-21 |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| D1 Solution Design & Architecture | 17% | 3 |
| D2 Models, Prompting & Context Engineering | 13% | 3 |
| D3 Integration | 19% | 4 |
| D4 Evaluation, Testing & Optimization | 16% | 3 |
| D5 Governance, Safety & Risk | 14% | 3 |
| D6 Stakeholder Communication & Lifecycle Management | 14% | 3 |
| D7 Developer Productivity & Operational Enablement | 7% | 1 |

## 使い方

1. `exam.ja.md`（または `CCAR-P_Architect_Professional_practice_20_ja.pdf`）を時間を計って解く
2. 巻末／`answers.ja.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| D1 Solution Design & Architecture | 3 | | |
| D2 Models, Prompting & Context Engineering | 3 | | |
| D3 Integration | 4 | | |
| D4 Evaluation, Testing & Optimization | 3 | | |
| D5 Governance, Safety & Risk | 3 | | |
| D6 Stakeholder Communication & Lifecycle Management | 3 | | |
| D7 Developer Productivity & Operational Enablement | 1 | | |
| **合計** | 20 | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/20260721022304_ccar-p-quick20/items.json
