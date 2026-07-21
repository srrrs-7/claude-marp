# Claude Certified Architect – Foundations (CCA-F) 模擬試験 — 30問

| | |
|---|---|
| 対象試験 | CCA-F（本番: 60問 / 120分 / $125 / 720-1000で合格 / 全問シナリオベース） |
| この問題集 | 30問（うち複数選択 4問）|
| 想定所要時間 | 約60分 |
| 生成日 | 2026-07-20 |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| D1 Agentic Architecture & Orchestration | 27% | 8問 |
| D2 Claude Code Configuration & Workflows | 20% | 6問 |
| D3 Prompt Engineering & Structured Output | 20% | 6問 |
| D4 Tool Design & MCP Integration | 18% | 5問 |
| D5 Context Management & Reliability | 15% | 5問 |

## 使い方

1. `exam.md` を時間を計って解く（`answers.md` は開かない）
2. `answers.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| D1 Agentic Architecture & Orchestration | 8 | | |
| D2 Claude Code Configuration & Workflows | 6 | | |
| D3 Prompt Engineering & Structured Output | 6 | | |
| D4 Tool Design & MCP Integration | 5 | | |
| D5 Context Management & Reliability | 5 | | |
| **合計** | 30 | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

```
bun .claude/skills/claude-exam/scripts/check-exam.ts exams/20260720233515_cca-f-set4/items.json
```
