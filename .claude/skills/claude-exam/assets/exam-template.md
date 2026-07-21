# exam-template.md

`items.json` から生成する2冊（`exam.md` / `answers.md`）の雛形。
`{{PLACEHOLDER}}` は生成時に置換する。この見出し（`# exam-template.md` と下の2つの `===` セクション見出し）は
テンプレート自身の構造説明であり、成果物には出力しない。

---

# ===== FILE 1: exam.md =====

```markdown
# CLAUDE CERTIFICATION PROGRAM

## {{EXAM_NAME}}

**{{ITEM_COUNT}} items | 120 minutes | {{PRICE}} | 720/1000 to pass**

Blueprint: {{DOMAIN_1_NAME}} {{DOMAIN_1_WEIGHT}}% ・ {{DOMAIN_2_NAME}} {{DOMAIN_2_WEIGHT}}% ・ {{DOMAIN_3_NAME}} {{DOMAIN_3_WEIGHT}}% ・ {{DOMAIN_N_NAME}} {{DOMAIN_N_WEIGHT}}%

### How to use this set

- **時間を計って解く。** 120分・{{ITEM_COUNT}}問。1問あたり約{{MINUTES_PER_ITEM}}分が本番のペース配分です
- **解答は別冊（`answers.md`）にあります。** 全問解き終えるまで開かないでください
- **正解の「文字」ではなく根拠を覚える。** 本番では選択肢の順序も文言も変わります。なぜその選択肢が正しいのかを言語化できるまで `answers.md` の解説を読み込んでください
- **間違えた問題はドメイン別に記録する。** 特定ドメインに偏って落としている場合、そのドメインの公式ドキュメントに戻るのが最短です
- **複数選択（Multiple response）は部分点なし。** 2つとも正しく選べて初めて正答です

---

> **Scenario — {{SCENARIO_TITLE}}:** {{SCENARIO_BODY}}

### Q{{N}} Single response

**{{DOMAIN_ID}} — {{DOMAIN_NAME_UPPER}}**

{{STEM}}

A. {{OPTION_A}}
B. {{OPTION_B}}
C. {{OPTION_C}}
D. {{OPTION_D}}

---

### Q{{N}} Multiple response (select TWO)

**{{DOMAIN_ID}} — {{DOMAIN_NAME_UPPER}}**

{{STEM}}

A. {{OPTION_A}}
B. {{OPTION_B}}
C. {{OPTION_C}}
D. {{OPTION_D}}

---

*(以下、Q{{ITEM_COUNT}} まで同形式。共通シナリオは、それを参照する最初の問題の直前に
`> **Scenario — …:**` ブロックとして1回だけ置く。exam.md には正答・解説を一切書かない)*

---

## 免責事項 / Disclaimer

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.
```

---

# ===== FILE 2: answers.md =====

```markdown
# {{EXAM_NAME}} — 解答・解説

## Answer Key & Rationale

**採点方法:** 正答数 ÷ {{ITEM_COUNT}} が正答率。スケールドスコアの目安は `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）。
間違えた問題のドメインを記録し、`README.md` の採点表に転記してください。

---

### Q{{N}} Correct: {{ANSWER_LETTERS}} ({{DOMAIN_ID}} — {{DOMAIN_NAME}})

  {{RATIONALE}}

**なぜ他が違うか**

- **{{DISTRACTOR_LETTER_1}}.** {{DISTRACTOR_EXPLANATION_1}}
- **{{DISTRACTOR_LETTER_2}}.** {{DISTRACTOR_EXPLANATION_2}}
- **{{DISTRACTOR_LETTER_3}}.** {{DISTRACTOR_EXPLANATION_3}}

**参照:**

- [{{REF_TITLE_1}}]({{REF_URL_1}})
- [{{REF_TITLE_2}}]({{REF_URL_2}})

---

*(以下、Q{{ITEM_COUNT}} まで同形式。複数選択問題は `Correct: A, C` のように2文字を並べ、
「なぜ他が違うか」は残り2択ぶんになる。参照リンクは `references/links.md` に載っている URL のみを使う)*
```

---

# ===== FILE 3: README.md =====

```markdown
# {{EXAM_NAME}} 模擬試験 — {{ITEM_COUNT}}問

| | |
|---|---|
| 対象試験 | {{EXAM_CODE}}（本番: {{REAL_ITEM_COUNT}}問 / 120分 / {{PRICE}} / 720-1000で合格） |
| この問題集 | {{ITEM_COUNT}}問（うち複数選択 {{MULTI_COUNT}}問） |
| 想定所要時間 | {{MINUTES}}分 |
| 生成日 | {{DATE}} |

## ドメイン別内訳

| ドメイン | 公式配点 | 本問題集 |
|---|---|---|
| {{DOMAIN_ID}} {{DOMAIN_NAME}} | {{WEIGHT}}% | {{COUNT}}問 |

## 使い方

1. `exam.md` を時間を計って解く（`answers.md` は開かない）
2. `answers.md` で採点し、下の表にドメイン別の正誤を記入する
3. 正答率が低いドメインは `.claude/skills/claude-exam/references/links.md` の該当リンクで復習する

## 採点表

| ドメイン | 出題数 | 正答数 | 正答率 |
|---|---|---|---|
| {{DOMAIN_ID}} {{DOMAIN_NAME}} | {{COUNT}} | | |
| **合計** | {{ITEM_COUNT}} | | |

スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）

## 検証

    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/{{DIR}}/items.json
```

---

## 生成時の注意

| 項目 | ルール |
|---|---|
| `{{DOMAIN_NAME_UPPER}}` | exam.md の問題ヘッダは大文字表記（例: `APPLICATIONS AND INTEGRATION`） |
| `{{DOMAIN_NAME}}` | answers.md は通常表記（例: `Applications & Integration`） |
| 問題ヘッダの形式表記 | 単一選択 `Single response` / 複数選択 `Multiple response (select TWO)` |
| シナリオ | `scenarios[]` の各要素につき1回だけ出力。2問目以降には再掲しない |
| 免責文 | **exam.md の末尾に必須**（日英とも）。answers.md にも入れてよい |
| 正答の位置 | exam.md には絶対に書かない。太字・脚注・HTMLコメントも不可 |
