# Claude Certified Architect – Professional (CCAR-P) — 解答・解説

## Answer Key & Rationale

**採点方法:** 正答数 ÷ 20 が正答率。スケールドスコアの目安は `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）。間違えた問題のドメインを記録し、README.md の採点表に転記してください。

---

### Q1 Correct: B (D1 — Solution Design & Architecture)

手順が固定で85%が決定的に完結する以上、開放ループのエージェントは不要な非決定性・コスト・監査困難を招く。決定的ワークフローで大半を再現可能に処理し、判断を要する例外だけ人に回す構成が、監査要件と自動化率を両立する根本解になる。

**なぜ他が違うか**

- **A.** 手順が固定なのに自律エージェントに全権を渡すと非決定的になり、再現性という監査要件を満たせず過剰設計になる
- **C.** モデルを大きくしても境界ケースの判断責任は消えず、例外を全自動承認すれば誤支払いのリスクをそのまま残す
- **D.** 事後の監査ログは誤判定を予防せず、検知するだけ。エスカレーションの仕組みがないと同じ誤りを繰り返す

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q2 Correct: A, C (D1 — Solution Design & Architecture)

マルチエージェントが効くのは、独立サブタスクへ分解でき各エージェントが隔離文脈で並列探索できる問題に限られる。同時に消費トークンが数倍化するため、コストに見合う高価値・重負荷の調査でのみ採用を正当化するのが実務判断。この2つが採用可否とトレードオフを正しく捉えている。

**なぜ他が違うか**

- **B.** エージェントを増やしてもハルシネーションが構造的に消える保証はなく、モデル数で品質問題は解決しないという誤解
- **D.** 状態を密結合させるほど調整コストが増え、常に安く速くなるという前提は成り立たない

**参照:**

- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q3 Correct: D (D1 — Solution Design & Architecture)

タスクが決定的で分岐が固定なら、開放ループの自律性は不要で、コスト・レイテンシ・切り分け困難という副作用だけが残る。プロンプトチェーンのワークフローが最も単純で再現性も高く、要件に一致する。エージェントは非決定的な判断が本当に必要な場合にのみ導入するのが原則。

**なぜ他が違うか**

- **A.** 決定的な処理に自律エージェントを入れるのは過剰設計で、実測で3倍のコスト増という具体的な代償を無視している
- **B.** モデルを大型化しても固定手順に自律性は要らず、切り分け困難というマルチエージェント固有の問題も残る
- **C.** 再試行とログは複雑さの症状を覆うだけで、そもそも不要な自律性という根本原因を取り除いていない

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q4 Correct: C (D2 — Models, Prompting & Context Engineering)

prompt caching はプロンプト先頭からの静的なプレフィックスにヒットする。全ユーザー共通で不変のマニュアルを先頭へ固定し、リクエストごとに変わる履歴・質問を後方に置けば、30,000トークンの静的部分がキャッシュされ再送コストを大幅に削れる。並び順が効果を決める根本要因。

**なぜ他が違うか**

- **A.** 可変のユーザー質問を先頭に置くと静的プレフィックスが崩れ、以降がキャッシュに乗らずcaching効果を失う
- **B.** max_tokens の削減は出力側の話で、真の要因である巨大な入力プレフィックスの再送コストには効かない
- **D.** モデルを大型化しても再送コストは減らず、要約は情報欠落とcaching無効化のリスクを新たに招く

**参照:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q5 Correct: B (D2 — Models, Prompting & Context Engineering)

問題は容量超過ではなく、無関係な蓄積が信号対雑音比を下げていること。高シグナルな情報だけを残し、古い中間結果を要約・除去して文脈を選別するのが、精度低下とコスト増の両方に効く根本対処。文脈は「多いほど良い」ではなく「関連が濃いほど良い」。

**なぜ他が違うか**

- **A.** 全部残す方針こそがノイズ蓄積とコスト増の原因で、関連情報が薄まる問題を悪化させる
- **C.** ウィンドウを広げても雑音の割合は変わらず精度は戻らない。容量ではなく文脈の質が問題
- **D.** temperature はサンプリングのばらつきを変えるだけで、無関係な文脈の混入という原因には作用しない

**参照:**

- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [長い文脈を扱うコツ](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)

---

### Q6 Correct: A (D2 — Models, Prompting & Context Engineering)

ステップごとに要件が異なる。大量・単純・低コスト重視の分類は高速階層が最適で、少量・高精度重視の法的推論は最上位階層が最適。要件に応じて階層を混在させることが、全体のコストと品質を同時に満たす設計。単一階層への統一はどちらかの要件を必ず犠牲にする。

**なぜ他が違うか**

- **B.** 全ステップを最上位に統一すると、数十万件の単純分類で低コスト・低レイテンシ要件を大きく損なう
- **C.** 全ステップを最小階層に統一すると、複雑な法的推論で精度が崩れ最優先要件を満たせない
- **D.** max_tokens は出力長の上限で分類精度とは無関係。真の要因であるモデル階層の選択に触れていない

**参照:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q7 Correct: B (D3 — Integration)

再利用可能な機能を複数のエージェント／チームへ提供する課題は、機能をMCPサーバとしてサーバ化することで構造的に解決する。認証・レート制御・ツールスキーマがサーバ側の単一責務に集約され、各エージェントは接続してツールを呼ぶだけになるので、実装の重複と差異が原理的に発生しない。

**なぜ他が違うか**

- **A.** 共有ライブラリのコピー配布は依然として各エージェントのプロセス内に実装が散らばり、バージョンずれと認証設定の重複が残る。単一の管理点にならない。
- **C.** モデルを大きくしても各チームのツール実装の差異は消えない。実装整合はモデルの能力ではなく統合レイヤの設計の問題であり、bigger-model型の誤り。
- **D.** スキーマをプロンプトに貼るのはツール実行の代替にならず、認証やレート制御も担えない。prompt-only-fixで構造的な再利用を解決しようとしている。

**参照:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q8 Correct: A, C (D3 — Integration)

(1) 別リージョンの他チームのエージェント連携は、そのエージェントをリモートMCPサーバとして公開・接続するのが正攻法で、ネットワーク越しの再利用可能な接続を標準化できる。(2) 出典を検証可能にする要件は、根拠テキストを引用メタデータ付きのSearch resultsとして渡すことで、回答がどの条文に基づくかを構造的に辿れるようにするのが適切。

**なぜ他が違うか**

- **B.** 全取引履歴をプロンプトに毎回貼るのは文脈を膨張させコストと劣化を招き、他チームのエージェントとの連携手段でもない。true-but-irrelevant寄りの過剰対応。
- **D.** 四半期ごとの規程ファインチューニングは高コストかつ出典の検証可能性を与えない。改定頻度が高い事実はretrievalで扱うべきで、モデル重みに焼き込むのは筋が悪い。

**参照:**

- [リモートMCPサーバ](https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers)
- [検索結果を根拠付きで渡す](https://docs.claude.com/en/docs/build-with-claude/search-results)

---

### Q9 Correct: B (D3 — Integration)

「KB更新の直後から、更新対象トピックだけが劣化」という時間的手がかりが、変化したコンポーネント＝埋め込み／インデックスを名指ししている。新文書の再埋め込み未完・チャンク分割の不整合・インデックス鮮度の遅れによりretrievalが旧版を返せば、生成が正しくても回答は旧仕様になる。変わった箇所から調べるのが定石。

**なぜ他が違うか**

- **A.** 旧来質問は正常で改定トピックだけ劣化しており、ハルシネーション全般ではなくretrieval鮮度の問題。プロンプトのお願いでインデックス不整合は直らない（prompt-only-fix）。
- **C.** 改定は火曜のKB投入で起きた事象で、モデル世代とは無関係。上位モデルでも古いチャンクを渡せば旧仕様を答える。bigger-modelの誤り。
- **D.** 症状は『旧仕様に固定的に誤る』であり出力の揺れではない。temperature調整は無関係なknob-twiddling。

**参照:**

- [埋め込み（RAG の retrieval 側）](https://docs.claude.com/en/docs/build-with-claude/embeddings)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q10 Correct: B (D3 — Integration)

『大量・即時性不要・コスト最優先』という要件は Batches API の設計目的に一対一で対応する。非同期の一括処理枠で単価が下がり、同期並列で起きるレート制限の逼迫も避けられる。要件の制約と正解の性質が完全に一致している。

**なぜ他が違うか**

- **A.** 同期最大並列はレート制限を突き、コストも最も高い。即時性が要らない要件に対し速度へ最適化しており true-but-irrelevant。
- **C.** max_tokens削減はリクエスト単価を構造的に下げず、大量処理のコスト最優先要件を満たさない。knob-twiddling。
- **D.** 精度を全面的に捨てるのは監査レポートの目的を損なう over-restriction。コストは Batches で下げられる。

**参照:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q11 Correct: D (D4 — Evaluation, Testing & Optimization)

客観的な品質判定には、正解（ground-truth）ラベル付きの評価セットに対して、精度・レイテンシ・コスト・安全性といった測定可能な指標を機械採点する評価テストが必要。これにより変更のたびに回帰を検出でき、本番前に基準を満たすか判定できる。目視10件や事後報告では再現性も網羅性もない。

**なぜ他が違うか**

- **A.** モデルの自己確信度は精度の指標にならない。誤った抽出に高い確信度を付けることがあり、確信度自体を捏造しうる。sounds-responsible。
- **B.** 顧客報告の月次集計は事後検知にすぎず、本番前に品質を保証しない。detect-after-the-fact。
- **C.** 評価を省いて上位モデルに頼るのは品質保証にならず、抽出誤りが起きないという前提も誤り。bigger-model。

**参照:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q12 Correct: A (D4 — Evaluation, Testing & Optimization)

評価も最適化も、測定可能な成功基準を先に定義してはじめて成立する。許容精度・レイテンシ・コスト・安全性を数値で合意すれば、以降の設計・モデル選定・評価テストがすべてその基準に紐づき、良し悪しが主観論にならない。成功基準の定義がライフサイクルの起点。

**なぜ他が違うか**

- **B.** 先に作って基準を後付けするのは事後検知で、リリース前に品質を判定できない。detect-after-the-fact。
- **C.** 基準がないままモデルを選んでも合否を測れない。品質はモデル選定ではなく基準定義から始まる。bigger-model。
- **D.** プロンプトへの願望記述は測定可能な基準にも品質保証にもならない。prompt-only-fix。

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)

---

### Q13 Correct: C (D4 — Evaluation, Testing & Optimization)

『即時かつ100%正確』は同時には満たせない要求で、CCAR-Pのアーキテクトは実測トレードオフを数値で提示し事業側に選ばせるのが正しい。97%/4.2秒と88%/1秒未満という測定値と、重要症例のみhuman-in-the-loopを挟む選択肢を示せば、意思決定が根拠に基づく。要件の非現実性を測定で可視化している。

**なぜ他が違うか**

- **A.** max_tokensやtemperatureの調整で精度とレイテンシの根本的トレードオフは消えない。knob-twiddlingで実測に反する。
- **B.** 事後の監査ログは100%正確の保証にならず予防でもない。detect-after-the-fact。
- **D.** 上位モデルでも100%正確は保証できず、実測は97%。bigger-modelの誤りで、非現実的な要求をそのまま呑んでいる。

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q14 Correct: B (D5 — Governance, Safety & Risk)

間接プロンプトインジェクションの根本原因は、非信頼な取得コンテンツと信頼された指示が同じ命令平面に混在していること。取得本文を『データ』として隔離し、そこに書かれた文言をツール実行の指示として解釈しない境界を設ければ、埋め込み命令は文面のまま無害化される。制御を文面上のお願いではなくハーネスの入力設計に置くのが要点。

**なぜ他が違うか**

- **A.** prompt-only-fix。システムプロンプトの禁止文言は、同じ命令平面に非信頼テキストが流れ込む構造を変えないため、巧妙な埋め込みに繰り返し破られる。
- **C.** detect-after-the-fact。全文ログは事後検知にはなるが、実行前の乗っ取りを予防しない。監査は緩和策の代替にならない。
- **D.** over-restriction。取得機能の全廃は攻撃面を消すが、外部情報を使う業務価値も同時に失う過剰対応で、隔離という設計で両立できる問題を潰している。

**参照:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)

---

### Q15 Correct: C (D5 — Governance, Safety & Risk)

最小権限の原則では、実際に使われていない高影響ツールは攻撃面・誤操作面でしかない。ツール集合から剥がせば、モデルがどう振る舞っても呼び出せない。破壊的操作が真に必要な稀なケースは human-in-the-loop の別経路に隔離するのが正しく、能力を『持たせない』ことが最強の制御になる。

**なぜ他が違うか**

- **A.** sounds-responsible。確認を促す文言はツールを繋いだままなので、インジェクションやモデルの誤判断で自問を飛ばせば実行され得る。能力剥奪という根本対処になっていない。
- **B.** knob-twiddling。temperature は誤ツール選択の根本要因ではなく、危険な能力が残る限りリスクは消えない。
- **D.** bigger-model。上位モデルでも誤呼び出しやインジェクション追従は起こり得る。持たせている能力自体がリスクである点を無視している。

**参照:**

- [Claude Code の権限モデル](https://docs.claude.com/en/docs/claude-code/iam)

---

### Q16 Correct: D (D5 — Governance, Safety & Risk)

ハルシネーションの根本原因は、モデルが根拠なしに空白を埋めること。回答を取得済みソースに接地し、条文引用を必須にして検証可能にし、さらに『わからない/記載なし』という逃げ道を正式に許容すると、根拠のない断定を出す動機が消える。接地と引用と不知の許容という仕組みで対処するのが要点。

**なぜ他が違うか**

- **A.** bigger-model。上位モデルでも接地なしにはハルシネーションは起こり得る。モデル階層は事実性の保証ではない。
- **B.** knob-twiddling。出力長はハルシネーションの原因ではなく、短くしても根拠なき断定はむしろ助長される。
- **C.** prompt-only-fix。強調文言は接地の仕組みを与えないため、根拠のない生成を止められない。

**参照:**

- [ハルシネーションを減らす](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q17 Correct: D (D6 — Stakeholder Communication & Lifecycle Management)

『即時かつ100%』は速度・精度・コストのトレードオフを事業側が理解していないことに起因する。アーキテクトの役割は、実現可能な複数の運用点を実測値で可視化し、どのトレードオフを取るかという意思決定を事業責任者に委ねること。合意形成として最善なのは、選べる形の事実提示であり、こちらが勝手に決めることでも要求を突き返すことでもない。

**なぜ他が違うか**

- **A.** sounds-responsible。技術的には正しいが、代替案を示さず要求を突き返すだけでは合意形成にならず、事業側は判断材料を得られない。
- **B.** detect-after-the-fact。実測トレードオフを共有せず黙って投入するのは合意形成の放棄で、後から精度不足が露見すれば信頼を失う。
- **C.** over-restriction。達成不能な『100%』に形式的に合意し、コスト増を隠すのは不誠実で、後の関係破綻を招く。

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q18 Correct: B (D6 — Stakeholder Communication & Lifecycle Management)

事後分析の目的は責任追及ではなく再発防止と信頼回復。『何が変わった直後に何が起きたか』という変化のタイミングを軸に、影響・原因・対策を非難なし（blameless）で事実ベースに共有すると、非技術のステークホルダーにも判断と学習が伝わる。個人攻撃を避けることが同種の失敗の再発を防ぐ。

**なぜ他が違うか**

- **A.** over-restriction。影響を伏せる報告は透明性を欠き、後で規模が判明した際にかえって信頼を損なう。
- **C.** sounds-responsible。個人の非難は原因の構造ではなく人に焦点を当て、率直な報告文化を壊して再発防止を弱める。
- **D.** true-but-irrelevant。生ログの全文添付は非技術ステークホルダーには解読不能で、意思決定に必要な要約になっていない。

**参照:**

- [障害の切り分けと事後分析の実例](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

---

### Q19 Correct: A (D6 — Stakeholder Communication & Lifecycle Management)

SLAは測定可能で合意された成功基準の上にしか成り立たない。accuracy・latency・cost・safety を評価セット上の目標しきい値として先に定義し、バラバラな期待を共通の物差しに揃えることが土台になる。数値約束もモデル選定もこの定義の後に来る。測れないものは約束できないという順序が要点。

**なぜ他が違うか**

- **B.** sounds-responsible。測定基準なしに数値を先約束するのは、達成不能なSLAを背負う典型的な失敗で、合意の土台を欠く。
- **C.** detect-after-the-fact。監視は必要だが、成功基準を感覚で後決めするとSLAの合否判定が曖昧になり合意にならない。
- **D.** bigger-model。モデル階層は成功基準の定義に先行できず、何をもって良しとするかが未定のままでは選定も評価もできない。

**参照:**

- [成功基準の定義](https://docs.claude.com/en/docs/test-and-evaluate/define-success)

---

### Q20 Correct: C (D7 — Developer Productivity & Operational Enablement)

根本原因は、再利用可能な手順が各自の手作業に依存していること。共有の前提と手順を CLAUDE.md やAgent Skill としてリポジトリに外部化し自動読込させれば、貼り付けと貼り忘れという工程自体が消え、チーム全員に一貫して効く。生産性の型化は手順の外部化で仕組み化するのが持続的。

**なぜ他が違うか**

- **A.** sounds-responsible。定型文の集約は改善に見えるが、都度コピペ依存のままで貼り忘れの構造を残す。
- **B.** bigger-model。モデル階層は前提の貼り忘れという工程課題を解かず、型化を各自裁量に戻すと再現性が失われる。
- **D.** detect-after-the-fact。CIの事後警告は手戻りを検知するだけで、前提を毎回貼る作業そのものを不要にはしない。

**参照:**

- [ベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Agent Skills のベストプラクティス](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

## 免責事項 / Disclaimer

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.