# Claude Certified Associate – Foundations (CCAO-F) — 解答・解説

## Answer Key & Rationale

**採点方法:** 正答数 ÷ 20 が正答率。スケールドスコアの目安は `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）。間違えた問題のドメインを記録し、README.md の採点表に転記してください。

---

### Q1 Correct: B (D1 — Prompting & Task Execution)

システムプロンプトは会話全体に持続する役割・制約の指定層であり、ここに口調と境界を書けば毎ターン安定して適用される。ユーザーメッセージ依存の書き足しと違い書き忘れで崩れないため、一貫性の欠如という根本原因を解消できる。

**なぜ他が違うか**

- **A.** temperatureはばらつきの幅を狭めるだけで、役割や口調そのものを定義しない
- **C.** モデルを上げても役割指定がなければ口調は指示なりに揺れ続ける
- **D.** 毎回の書き足しは書き忘れで破綻する運用依存で、構造的には固定できない

**参照:**

- [システムプロンプトで役割を与える](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
- [プロンプトエンジニアリング概要](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)

---

### Q2 Correct: D (D1 — Prompting & Task Execution)

XMLタグで資料を囲むと、モデルはどこまでが指示でどこからが参照データかを構造的に判別できる。資料内に紛れた命令文が指示層と物理的に分離されるため、指示と資料の混同という根本原因そのものが消える。

**なぜ他が違うか**

- **A.** 依頼文だけでは資料に紛れた命令との構造的な境界が作られず、誤認は残る
- **B.** トークン上限は読み込み量の話で、指示と資料の区別には無関係である
- **C.** モデルを上げても入力の構造が曖昧なままなら誤認の根本原因は消えない

**参照:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q3 Correct: C (D1 — Prompting & Task Execution)

最終額の前に各ステップを書き出させると、モデルは順に推論を積み上げてから答えるため計算の飛躍が減る。中間結果が可視化されて誤りの発生箇所も追えるため、精度と検証性の両方が構造的に改善する。

**なぜ他が違うか**

- **A.** temperatureの固定は再現性の話で、飛ばされた推論ステップは補われない
- **B.** モデルを上げても途中経過を書かせなければ、誤りの発生も検出も防げない
- **D.** 「正確に」という強調は手順を踏ませる構造を与えず、飛ばしは直らない

**参照:**

- [段階的思考を促す](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought)

---

### Q4 Correct: A (D2 — Output Evaluation & Validation)

渡した文書に接地させ根拠がなければ「記載なし」と答えさせることで、モデルが未知を推測で埋める余地を断つ。幻覚の根本原因は未記載事項を推測で補う挙動なので、その挙動自体を封じるのが最も効果的である。

**なぜ他が違うか**

- **B.** 依頼文だけでは根拠のない生成を構造的に止められず、捏造は残り続ける
- **C.** モデルを上げても未記載事項を推測させる限り、創作は依然として起こりうる
- **D.** 事後監査は誤申請が起きた後の検知であり、発生そのものは予防できない

**参照:**

- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q5 Correct: A, C (D2 — Output Evaluation & Validation)

Citationsは各主張を参照文書の該当スパンに機械的に紐づけるため、レビュアーが出典を直接たどって裏取りできる。さらに公開前に人間が引用元と原文を突き合わせれば、誤った出典を仕組みとして検出でき妥当性が担保される。

**なぜ他が違うか**

- **B.** モデルの自己申告スコアは精度の指標にならず、確信度自体も捏造されうる
- **D.** モデルを上げても出典の突き合わせは行われず、検証可能性は生まれない

**参照:**

- [引用（Citations）で出典を検証可能にする](https://docs.claude.com/en/docs/build-with-claude/citations)
- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q6 Correct: B, D (D2 — Output Evaluation & Validation)

測定可能な成功基準を先に定め、代表事例の評価セットで採点すれば、変更の良否を主観でなく同一の物差しで客観比較できる。評価の土台が定義されることが、継続的な妥当性判断の根本条件になる。

**なぜ他が違うか**

- **A.** 数件の目視は主観と見落としが残り、変更の良否を客観的に比較できない
- **C.** temperatureの調整は表現の揺れの話で、良し悪しの評価基準にはならない

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q7 Correct: D (D2 — Output Evaluation & Validation)

返金は不可逆で高影響なため、実行の前に人間の承認を挟めば、モデルの誤判断が金銭損失として確定する前に止められる。制御を実行の手前のハーネス側に置くことが根本解決になる。

**なぜ他が違うか**

- **A.** 依頼文は規約外承認を構造的に止められず、誤承認の実行は防げない
- **B.** 事後監査は金銭損失が発生した後の検知で、不可逆な返金は取り消せない
- **C.** モデルの自問は承認を自動実行したままで、確認自体も当てにならない

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q8 Correct: B (D2 — Output Evaluation & Validation)

出力をスキーマで検証し失敗時に再試行・修復すれば、壊れた出力が後続へ渡る前に確実に弾ける。検証と再試行をハーネス側に置くことで、稀な破損に依存しない堅牢な妥当性担保が実現する。

**なぜ他が違うか**

- **A.** 依頼文だけでは不正な出力の混入を止められず、稀な破損は残り続ける
- **C.** 上限拡大は切断の一因を減らすだけで、検証がなければ破損は素通りする
- **D.** モデルを上げても検証工程がなければ、壊れた出力が後続を止める余地は残る

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q9 Correct: B (D3 — Product & Model Selection)

定型的で判断の幅が狭い大量分類は、高速・低コストの階層で十分な品質が出る。この階層は低レイテンシで即時応答の要件を満たし、単価が低いため大量処理でもコストが構造的に抑えられる。要件（大量・即時・低コスト・単純な判定）と選択が1対1で対応する。

**なぜ他が違うか**

- **A.** 上位階層と extended thinking は難しい推論向けで、単純な3値分類には過剰。レイテンシとコストが要件に反して悪化する
- **C.** temperature を上げると分類が不安定になり精度はむしろ下がる。無関係なパラメータいじりで根本要件を満たさない
- **D.** 全件人手レビューは即時性とスループットを犠牲にする過剰対応で、自動分類という目的自体を止めてしまう

**参照:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)
- [モデル一覧・世代](https://docs.claude.com/en/docs/about-claude/models/overview)

---

### Q10 Correct: C (D3 — Product & Model Selection)

Projects は資料と指示を会話の外側に一度登録すれば、その中の全会話で共有の文脈として再利用される。貼り直しという手作業を仕組みで排除し、チーム全員に同じ背景を保証する点が継続的な知識共有という要件に一致する。

**なぜ他が違うか**

- **A.** Artifacts は会話で生成される成果物であって共有の知識ベースではない。各自コピーは属人的で継続的な文脈共有にならない
- **B.** 手順書で徹底しても貼り付けは人手のまま残り、抜け漏れや不一致が構造的に解消されない責任感だけの対処にとどまる
- **D.** 要約版だけを各自保存すると情報が失われ、共有もされない。目的である統一された文脈の保持を犠牲にしている

**参照:**

- [Projects とは](https://support.claude.com/en/articles/9517075-what-are-projects)
- [Artifacts とは](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)

---

### Q11 Correct: A (D4 — Workflow Integration & Solution Design)

手順と順序が固定できる決定的な処理は、開放ループのエージェントではなくワークフローで組むのが適切だ。ステップを固定して検証とリトライを挟むことで、制御をハーネス側に置き挙動を予測可能にできる。要件（固定手順・順序不変・再試行）と設計が対応している。

**なぜ他が違うか**

- **B.** 決定的な処理に自律エージェントを使うのは過剰で、毎回の判断が挙動を不安定にする。責任ある自動化に見えて予測可能性を損なう
- **C.** モデルを大きくしても手順の固定や再試行という構造は与えられない。上位モデルへの置き換えは根本要件を満たさない
- **D.** 検証と登録の省略は要件に反し、誤った値がそのまま会計システムに入る過剰な単純化で、正しさを犠牲にしている

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q12 Correct: D (D4 — Workflow Integration & Solution Design)

着眼点や深掘り範囲が事前に固定できず途中の発見に依存するタスクは、開放ループのエージェントが適する。目標とツールを与え、最大反復数やコスト上限といった停止条件をハーネス側に置くことで、柔軟性と暴走防止を両立できる。

**なぜ他が違うか**

- **A.** 手順を事前に固定できないタスクに固定ワークフローは合わない。正しい設計に見えて要件そのものに反する
- **B.** 分岐を全列挙する前提が崩れているため決定木は破綻する。網羅は不可能で、真の要件である適応的探索を満たさない
- **C.** temperature は探索の手順や停止条件を与えない無関係なパラメータいじりで、暴走のリスクだけが増える

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q13 Correct: B (D4 — Workflow Integration & Solution Design)

破壊的・高影響な操作は権限と承認をハーネス側で設計するのが根本解決。高額返金に人の承認を挟み、低リスクの定型返金だけ自動化することで、業務を止めずに影響範囲を構造的に限定できる。要件（一部だけ危険）と設計が対応する。

**なぜ他が違うか**

- **A.** プロンプトのお願いは高影響ツールを繋いだままにする構造的欠陥を直さず、逸脱を確実には防げない
- **C.** ログと事後監査は起きてしまった高額返金を検知するだけで予防していない。損失は発生した後になる
- **D.** ツールを完全に外すと少額の定型返金まで止まり、返金業務そのものを止める過剰対応になる

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q14 Correct: A (D5 — Configuration & Knowledge Management)

参照が一部で更新が低頻度の資料は、会話の外側の知識ソースとしてファイル登録するのが適切。全文をコンテキストに毎回積む代わりに必要箇所だけ扱えるため、逼迫を構造的に解消し、更新も一箇所で完結する。

**なぜ他が違うか**

- **B.** 全文を貼ってから読み分けを頼んでもコンテキストの逼迫は解消されず、依頼だけの対処にとどまる
- **C.** 詳細条項を捨てる要約は情報を失わせ、規程参照の正確さという目的を犠牲にする過剰な単純化
- **D.** max_tokens は生成長の上限で入力の逼迫は解決しない。無関係なパラメータいじりにすぎない

**参照:**

- [ファイル・知識ソースの扱い](https://docs.claude.com/en/docs/build-with-claude/files)
- [Projects とは](https://support.claude.com/en/articles/9517075-what-are-projects)

---

### Q15 Correct: C (D5 — Configuration & Knowledge Management)

安定して繰り返される手順は Agent Skill として一度定義すれば、呼び出すだけで全員が同じ手順を再利用でき、都度の説明が不要になる。手順という知識を会話の外に外部化して仕組みで共有する点が要件に一致する。

**なぜ他が違うか**

- **A.** Wikiに置いても毎回チャットで説明する人手が残るため、外部化による再利用にならず責任感だけの運用に留まる
- **B.** モデルを大きくしても組織固有の10ステップは推測できない。上位モデルへの依存は再利用性を与えない
- **D.** テンプレ貼り付けは手順を毎回コンテキストに積む点で真の外部化になっておらず、繰り返しの手作業が残る

**参照:**

- [Agent Skills（再利用可能な手順の外部化）](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)

---

### Q16 Correct: B (D6 — Governance, Risk & Responsible Use)

PIIの外部送信という根本リスクは、Claude に渡す前段でデータを匿名化してしまえば構造的に解消できる。マスキング/トークン化後のテキストなら分類・傾向分析の業務価値は保ったまま送信でき、規制上の懸念と業務要件の両方を同時に満たす。制御をモデルのお願いではなくパイプライン側に置いている点が要点。

**なぜ他が違うか**

- **A.** 課題（PII送信）は消えるが業務（分析）まで止めてしまう過剰対応。匿名化という手段があるのに価値提供を放棄しており、責任ある利用とは言えない。
- **C.** プロンプトでの依頼は構造的なデータフローの問題を解決しない。生PIIが実際に外部へ送られる事実は変わらず、モデルの自己申告に依存した対策にすぎない。
- **D.** 事後の監査ログはPIIが既に送信された後の記録でしかなく、送信そのものを予防していない。検知はしても根本原因は残る。

**参照:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q17 Correct: D (D6 — Governance, Risk & Responsible Use)

安全上重大な最終判断は、仕組みとして人間のレビューを必須にすることでリスクを制御する。Claude を支援・下書き役に限定し、確定は資格を持つ人間が行う設計なら、モデルの誤りが直接患者に届く経路を断てる。高リスク領域での human-in-the-loop はガバナンスの基本形。

**なぜ他が違うか**

- **A.** モデルを大きくしても誤りが0になる保証はなく、重大リスク領域を自動確定にする根拠にはならない。規模はレビュー省略の理由にならない。
- **B.** temperature を下げても出力が正しくなるわけではなく、決定的に同じ誤りを繰り返すこともある。無関係なパラメータ操作でレビューを省いている。
- **C.** 免責文は責任ある対応に見えるが、誤った低優先度判定が人間のレビューなしにそのまま使われる構造は変わらず、根本の安全リスクを解消していない。

**参照:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

---

### Q18 Correct: C (D6 — Governance, Risk & Responsible Use)

データが学習に使われるか、保持や取扱いがどうかというガバナンス上の問いは、モデルの挙動ではなく提供者の公式ポリシーと契約条項で決まる。Trust Center と商用利用規約が一次情報であり、法務が契約・データフロー設計の根拠にすべき正しい参照先。

**なぜ他が違うか**

- **A.** temperature は生成のランダム性を制御するパラメータで、データが学習に使われるか否かとは無関係。根拠にならない。
- **B.** モデルの規模とデータ取扱いポリシーは別の話であり、Opus を選んでもデータ利用方針が変わるわけではない。
- **D.** 社内暗号化と事後対応は、送信先での取扱い方針を確認しないまま進めており、法務が問うている一次情報の確認を欠いている。

**参照:**

- [信頼・セキュリティ（データ取扱い）](https://trust.anthropic.com/)
- [商用利用規約](https://www.anthropic.com/legal/commercial-terms)

---

### Q19 Correct: A (D7 — Troubleshooting & Optimization)

長い会話で初期の確定事項が埋もれるのは、文脈が肥大化して重要情報の相対的な比重が下がるため。確定事項を構造化要約として抽出し、文脈の先頭に持ち越すと、往復数が増えても要件を安定して参照できる。長文脈を漫然と積むのではなく能動的に要約・再配置するのが定石。

**なぜ他が違うか**

- **B.** プロンプトでのお願いは文脈肥大という構造的原因を解決しない。指示を強めても重要情報が埋もれる問題は残る。
- **C.** max_tokens は出力側の上限であって、入力文脈での取り違えとは無関係。全履歴を積み続ければ劣化の原因はむしろ増える。
- **D.** 会話を強制終了させるのは課題ごと業務を止める過剰対応で、顧客体験を大きく損なう。根本の文脈管理を改善していない。

**参照:**

- [長い文脈を扱うコツ](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)
- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)

---

### Q20 Correct: B (D7 — Troubleshooting & Optimization)

出力が途中で切れる典型要因は、出力用トークン枠（max_tokens）が生成に必要な長さに対して不足していること、または入力＋出力がコンテキスト上限を超えていることにある。入力量が案件で大きく変動するなら、まず token counting で実測して枠と上限の関係を切り分けるのが正しい起点。原因を特定してから枠を調整すれば構造的に解決する。

**なぜ他が違うか**

- **A.** モデルを大きくしても max_tokens 不足やコンテキスト超過という原因は変わらず、出力の途中切れは解消しない。規模は原因ではない。
- **C.** temperature は出力のランダム性を変えるだけで、生成の打ち切り（トークン枠の枯渇）とは無関係。切り分けにならない。
- **D.** ログ収集は事後の分析でしかなく、入力量とトークン枠の関係という調べればすぐ分かる原因の切り分けを先送りしているだけ。

**参照:**

- [トークン数を数える](https://docs.claude.com/en/docs/build-with-claude/token-counting)
- [コンテキストウィンドウの考え方](https://docs.claude.com/en/docs/build-with-claude/context-windows)

---

## 免責事項 / Disclaimer

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.