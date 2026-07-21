# Claude Certified Architect – Foundations (CCA-F) 模擬試験 — 20問

| | |
|---|---|
| 対象試験 | CCA-F（本番: 60問 / 120分 / $125 / 720-1000で合格） |
| この問題集 | 20問（うち複数選択 2問） |
| 想定所要時間 | 約40分 |
| 生成日 | 2026-07-21 |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| D1 Agentic Architecture & Orchestration | 27% | 5問 |
| D2 Claude Code Configuration & Workflows | 20% | 4問 |
| D3 Prompt Engineering & Structured Output | 20% | 4問 |
| D4 Tool Design & MCP Integration | 18% | 4問 |
| D5 Context Management & Reliability | 15% | 3問 |

## 使い方

1. `exam.md`（または `CCA-F.pdf`）を時間を計って解く
2. 巻末／`answers.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| D1 Agentic Architecture & Orchestration | 5 | | |
| D2 Claude Code Configuration & Workflows | 4 | | |
| D3 Prompt Engineering & Structured Output | 4 | | |
| D4 Tool Design & MCP Integration | 4 | | |
| D5 Context Management & Reliability | 3 | | |
| **合計** | 20 | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/20260721022304_cca-f-quick20/items.json
