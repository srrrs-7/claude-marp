# Claude Certified Architect – Foundations (CCA-F) — 解答・解説

## Answer Key & Rationale

**採点方法:** 正答数 ÷ 20 が正答率。スケールドスコアの目安は `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）。間違えた問題のドメインを記録し、README.md の採点表に転記してください。

---

### Q1 Correct: C (D1 — Agentic Architecture & Orchestration)

開放ループのエージェントは自分で停止条件を保証できない。反復回数の上限はモデルの判断ではなくハーネス（オーケストレーション層）で強制すべき制御であり、上限到達時に escalate_to_human へ橋渡しすることで業務も止めずに暴走だけを構造的に断ち切れる。

**なぜ他が違うか**

- **A.** プロンプトのお願いは確率的で、ループという構造的な停止条件の欠如を保証付きでは解決しない。
- **B.** モデルを大きくしても停止条件が無ければループは起こり得る。規模はガードレールの代わりにならない。
- **D.** ログと事後検知は起きたループを止めない。予防制御ではなく事後観測にすぎない。

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q2 Correct: A (D1 — Agentic Architecture & Orchestration)

カテゴリ間の指示干渉は、無関係な文脈が同じウィンドウに同居することが根本原因。supervisor が分類し、各カテゴリ専用のサブエージェントへ委譲すれば、各サブエージェントは自分の関心事だけの文脈で動き、干渉が構造的に消える。文脈隔離はマルチエージェント設計の中核的な効用である。

**なぜ他が違うか**

- **B.** プロンプトで『無視せよ』と頼んでも、無関係な文脈が同居している事実は変わらず干渉は残る。
- **C.** max_tokens を増やしても指示の混線は解消しない。むしろ長い文脈は干渉を悪化させる無関係な調整。
- **D.** 1コンテキストに詰め直す整理は見た目を良くするだけで、カテゴリ間の文脈干渉という根本を残す。

**参照:**

- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)

---

### Q3 Correct: B, D (D4 — Tool Design & MCP Integration)

誤選択の根本は description の重複と境界の曖昧さ。使うべきでない場面を含めて責務境界を明記し（B）、機能が重ならないよう1機能1ツールへ整理する（D）ことで、モデルが選択に使う手がかり自体を正す。ツール設計の明確さがエージェントの選択精度を決める。

**なぜ他が違うか**

- **A.** 全機能を1ツールに統合すると引数が肥大化し、権限最小化も崩れる過剰な対応で選択精度は上がらない。
- **C.** temperature の調整は description の曖昧さという原因に触れず、選択の当たり外れを運任せにする無関係な調整。

**参照:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q4 Correct: A (D4 — Tool Design & MCP Integration)

実返金は不可逆かつ高影響なので、実行可否をモデルの確信度に委ねてはならない。破壊的操作は権限層で human-in-the-loop に置き、実行前の人間承認を必須にすることで、曖昧なケースでも誤実行が構造的に起こり得なくなる。制御は権限側に置くのが原則。

**なぜ他が違うか**

- **B.** プロンプトのお願いは確率的で、曖昧な入力に対し誤実行が起きない保証にはならない。
- **C.** 事後の監査は既に出てしまった返金を検知するだけで、不可逆な実行そのものを防がない。
- **D.** 説明を詳しくしても実行判断はモデル任せのまま。誤実行の可能性を残す責任感の演出にすぎない。

**参照:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q5 Correct: D (D3 — Prompt Engineering & Structured Output)

壊れた JSON の混入は形式の強制と検証が無いことが根本原因。スキーマで出力形式を強制し、受信側で検証したうえでパース失敗時に再試行する仕組みを置けば、確率的にたまに崩れる出力もパイプラインを止めずに吸収できる。信頼性はハーネス側の検証＋リトライで担保する。

**なぜ他が違うか**

- **A.** プロンプトでの強調はフォーマット逸脱の確率を下げるだけで、崩れをゼロにも検証もしない。
- **B.** 正規表現での抜き出しは壊れた構造を補正できず、検証もしないため下流の破損を下流に押し付ける。
- **C.** モデルを大きくしても出力は確率的で、100%の形式順守は保証されず検証の代替にならない。

**参照:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q6 Correct: B (D5 — Context Management & Reliability)

毎回同一で変化しない静的プレフィックスは prompt caching のためにある。先頭の静的部分に cache_control を付ければ2回目以降は入力トークンの再処理が省かれ、高頻度な同一プレフィックスほどコストと TTFT の両方が構造的に下がる。エージェントの能力は削らない。

**なぜ他が違うか**

- **A.** プロンプトやツール定義を削るのは能力を犠牲にする過剰対応で、静的部分の再送コストの本質を解いていない。
- **C.** モデルの切り替えは静的プレフィックスの毎回再処理という原因に無関係で、コスト削減にもつながらない。
- **D.** max_tokens は出力側の上限で、押し上げ要因である入力の静的プレフィックス再処理には効かない無関係な調整。

**参照:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q7 Correct: C (D2 — Claude Code Configuration & Workflows)

手で走らせる限り実行漏れは人依存で必ず起こる。Claude Code のフックは編集やコミットといったイベントで検証コマンドを決定論的に自動実行させる仕組みで、人の記憶に頼らず手順の実行を保証できる。自動化すべき定型手順はハーネス側のフックに載せるのが根本解決。

**なぜ他が違うか**

- **A.** 口頭・チャットでの周知は人の記憶頼みで、繰り返し起きている実行漏れを構造的には防げない。
- **B.** モデルを上げても開発者が検証コマンドを走らせ忘れる運用の穴は塞がらず、無関係な対処。
- **D.** CIログでの事後発見は壊れたコミット自体を止めない。予防ではなく事後検知にとどまる。

**参照:**

- [フック](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q8 Correct: B (D2 — Claude Code Configuration & Workflows)

headless／CI では対話的な承認ができないため、制御はモデルの判断ではなくハーネス側の権限に置く。`--allowedTools` で事前承認したツールだけを実行可能にし、破壊的で高影響な `deploy-prod` を許可リストから外せば、モデルが何を出力しようと、PR本文にインジェクションが仕込まれようと、そのツールは物理的に呼び出せない。最小権限の原則そのものである。

**なぜ他が違うか**

- **A.** 確認プロンプトは対話前提であり、無人の headless では応答者がいない。ツールを繋いだまま確認だけ増やすのは compensating-control theater で、根本原因（危険ツールが呼べる状態）を消していない。
- **C.** システムプロンプト／メモリでの「実行するな」という依頼は構造的な保証にならない。モデルの解釈やインジェクションで破られうる。権限はプロンプトではなくハーネスで縛る。
- **D.** パイプライン全体の廃止は課題（危険ツールの露出）を消すと同時に、機械的レビュー自動化という業務価値も止める過剰対応。危険ツールだけ外せば両立する。

**参照:**

- [headless / 非対話実行（CI）](https://docs.claude.com/en/docs/claude-code/headless)
- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)

---

### Q9 Correct: C (D2 — Claude Code Configuration & Workflows)

CLAUDE.md はプロジェクトメモリとして起動時に自動でコンテキストに入る仕組み。方針をリポジトリにコミットしておけば貼り忘れが構造的に起きず、方針の変更はファイル更新＝バージョン管理で追える。プロンプト文字列への手動埋め込みという壊れやすい運用を、ハーネスが保証する仕組みに置き換えている。

**なぜ他が違うか**

- **A.** プロンプト埋め込みは貼り忘れという人的ミスの温床で、まさにそれが事故の原因。一括置換スクリプトは対症療法で、方針が起動時に確実に入る保証を与えない。
- **B.** temperature や max_tokens は生成パラメータでありレビュー方針を運ぶ手段ではない。無関係なノブいじりで問題を解いていない。
- **D.** モデルの格上げは、明文化された方針（命名規則・禁止パターン）を自動で復元しない。方針は仕様であって推測させるものではない。時間で腐るモデル世代を根拠にする点でも不適切。

**参照:**

- [CLAUDE.md によるメモリ](https://docs.claude.com/en/docs/claude-code/memory)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q10 Correct: A (D2 — Claude Code Configuration & Workflows)

フックはモデルの選択に関係なくハーネスがイベント駆動で必ず実行する仕組み。PostToolUse でリンタ／テストを走らせ、失敗時に書き込みをブロックすれば、モデルが実行を省いても違反パッチは提出段階で止まる。「モデルが毎回やってくれること」を期待する運用を、決定的なゲートに置き換えている。

**なぜ他が違うか**

- **B.** プロンプトの強調は確率を上げるだけで、実行を保証しない。省略が起きうる構造は残ったまま。
- **C.** 翌朝の人手監査は事後検知であって予防していない。無人バッチが違反パッチを出す事象そのものは止まらない。
- **D.** モデル格上げは指示追従を確実にしない上、時間で腐るモデル世代を根拠にしている。決定的な実行はフックで担保するのが筋。

**参照:**

- [フック](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code 設定](https://docs.claude.com/en/docs/claude-code/settings)

---

### Q11 Correct: D (D1 — Agentic Architecture & Orchestration)

決定的に解ける多数派はワークフロー（固定手順）で回せばコストと実行時間が予測可能になり、判断が要る少数だけをエージェントの開放ループに回す。タスクの性質に制御方式を合わせる設計で、機械的作業に不要な探索を持ち込まない。workflow と agent の使い分けの原則そのもの。

**なぜ他が違うか**

- **A.** 全件をエージェントに委ねると機械的作業にも開放ループのコスト・非決定性が乗る。temperature を下げてもワークフロー化による予測可能性は得られない。
- **B.** 最上位モデルへの集約はコストと実行時間の読めなさを悪化させ、92%の決定的作業をエージェントで回す無駄も残る。判断力の底上げは機械的多数派の課題ではない。
- **C.** 判断が要る8%を人手に戻すのは自動化の価値を削る過剰対応で、しかも機械的な92%の実行方式（ワークフロー化）という本題に答えていない。

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q12 Correct: B (D1 — Agentic Architecture & Orchestration)

サブエージェントは親から隔離された独自のコンテキストを持つ。サービスごとにサブエージェントを割り当てれば、各レビューは自サービスの差分・規約だけを見て他サービスの情報が物理的に混入せず、スーパーバイザー配下で並列にファンアウトもできる。相互汚染という根本原因をコンテキスト隔離で断っている。

**なぜ他が違うか**

- **A.** 件数を減らしても複数サービスを同一コンテキストに混ぜる構造は残り、汚染は小さくなるだけで消えない。しかも直列90回で並列化にもならない。
- **C.** プロンプトでの「混ぜるな」という依頼は隔離を保証しない。同じコンテキストに他サービスの情報が存在する限り混入しうる。
- **D.** ウィンドウを広げても1つのコンテキストに全サービスが同居する構造は変わらず、汚染は解決しない。詰め込むほど後半の劣化はむしろ悪化しうる。

**参照:**

- [サブエージェント（文脈隔離）](https://docs.claude.com/en/api/agent-sdk/subagents)
- [マルチエージェント調査システムの設計](https://www.anthropic.com/engineering/multi-agent-research-system)
- [サブエージェント](https://docs.claude.com/en/docs/claude-code/sub-agents)

---

### Q13 Correct: A (D3 — Prompt Engineering & Structured Output)

後段が機械処理する出力は、スキーマで形を保証するのが根本解決。構造化出力でフィールド（対象ファイル・行・指摘・パッチ）を強制すれば、見出しや区切りの揺れに依存せず確実にパースでき、正規表現の脆い切り出しを不要にする。要件（自動投稿・自動適用）と出力の性質（機械可読）が1対1で対応する。

**なぜ他が違うか**

- **B.** 「きれいなJSONで」という依頼は形式を保証しない。揺れが残れば正規表現パースは同じように失敗する。プロンプトのお願いで構造的問題を解こうとしている。
- **C.** max_tokens の増加は途中切れには効いても、見出し・区切りの揺れによるパース失敗という主因を解いていない。無関係なノブいじり。
- **D.** 手作業のフォールバックは事後の穴埋めで、パース失敗そのものを予防しない。無人自動化という目的にも反する。

**参照:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q14 Correct: C (D5 — Context Management & Reliability)

プロンプトキャッシュは変わらない静的プレフィックスに効く。CLAUDE.md・サブエージェント定義・禁止パターンを先頭に固定してキャッシュし、サービス固有の差分だけを後ろに置けば、900件の呼び出しで静的部分の再処理コストとレイテンシを大幅に削れる。「同一プレフィックスの繰り返し再送」という主因に直接効く。

**なぜ他が違うか**

- **A.** キャッシュは先頭の静的プレフィックスに効くため、変わる差分を先頭に置くとキャッシュヒットが崩れて逆効果。並べ替えの方向が反対。
- **B.** max_tokens を下げても、コストとレイテンシの大半を占める静的プレフィックスの再処理は減らない。指摘を削る品質劣化を招くだけの無関係なノブいじり。
- **D.** モデル格上げは静的プレフィックスを毎回再処理する構造を変えず、再送コストは残る。時間で腐るモデル世代を根拠にする点でも不適切。

**参照:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q15 Correct: B (D3 — Prompt Engineering & Structured Output)

構造は「お願い」ではなく検証で担保する。スキーマ定義＋クライアント側のスキーマ検証を境界に置き、失敗時にエラーを返して再試行させると、下流に渡る前に不正な出力を機械的に弾いて自己修復できる。制御がハーネス側にあるため、モデルやプロンプトの気分に依存しない。

**なぜ他が違うか**

- **A.** プロンプトのお願いと temperature 調整では構造を保証できない。検証していない以上、フィールド欠落は依然として下流にすり抜ける（prompt-only-fix / knob-twiddling）。
- **C.** モデルを大きくしても構造の保証にはならず、検証なしでは欠落を検出できない。コストだけ上がって根本原因（検証境界の欠如）は残る。
- **D.** 夜間の手入力は事後の穴埋めであって、不正出力が下流に渡ること自体を防いでいない。即時性も自動化率も損なう。

**参照:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

### Q16 Correct: C (D3 — Prompt Engineering & Structured Output)

非信頼入力（取引先提供のテキスト）は、信頼された指示から構造的に隔離するのが根本策。XMLタグで指示とデータの境界を明示し、タグ内をデータとしてのみ扱うと定義すると、本文中の命令文が指示として昇格するのを防げる。プロンプトの注意書きよりも境界そのものを設ける方が確実。

**なぜ他が違うか**

- **A.** 「従わないで」というお願いは境界を作らない。指示とデータが同じ平面に混在したままなので、巧妙な埋め込みには依然としてすり抜けられる（prompt-only-fix）。
- **B.** temperature はインジェクション耐性と無関係。異常文言を「指示」と解釈する構造自体は残り、決定論的に従ってしまう場合すらある（knob-twiddling）。
- **D.** 取引先ごと取り込み停止は業務を止める過剰対応で、40,000通の処理という目標を損なう。多くの正常な請求書まで巻き添えになる（over-restriction）。

**参照:**

- [XMLタグで指示と資料を分離](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags)

---

### Q17 Correct: A, D (D4 — Tool Design & MCP Integration)

リスクは仕組みで切り分ける。低リスク（一致・非高額）だけ自動で通し、基準外だけ人間の承認ゲートに載せると、80%の自動化率と即時性を保ちつつ高影響な誤支払いだけを止められる（A）。さらに『照合成功が schedule_payment の呼び出し前提』とハーネスで強制すれば、未照合の支払いが構造的に発生しない（D）。どちらも制御がハーネス側にあり、モデルの判断に依存しない。

**なぜ他が違うか**

- **B.** プロンプトのお願いは強制力がなく、Claude が『再確認した』と述べても実際の防止にはならない。境界が無いまま高影響ツールが繋がっている（prompt-only-fix）。
- **C.** 全件人手レビューは誤支払いを消すが80%自動化と即時性という要件も同時に消す。要件に反する過剰対応（over-restriction）。

**参照:**

- [Agent SDK の権限制御（human-in-the-loop）](https://docs.claude.com/en/api/agent-sdk/permissions)
- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

### Q18 Correct: B (D4 — Tool Design & MCP Integration)

ツールの使いどきはツール説明そのものに書くのが根本策。『何をするか』に加えて『使ってはいけない条件（不一致・高額時は flag_for_review へ）』を明記し、入力スキーマを厳密にすると、Claude が誤用する余地を定義レベルで塞げる。エージェント向けツールは使用禁止場面まで含めて記述する。

**なぜ他が違うか**

- **A.** リネームは表層的で、使用禁止条件を伝えていない。名前を変えても不一致時に呼ばない根拠が定義に無い（knob-twiddling）。
- **C.** 確認プロンプトを増やすのは責任ある対応に見えるが、ツールは繋がったままで禁止条件も定義されておらず、根本原因を直していない（sounds-responsible）。
- **D.** ツール削除は誤用を消すが自動化（80%目標）も止める過剰対応。説明を直せば自動化を保ったまま誤用を減らせる（over-restriction）。

**参照:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q19 Correct: A (D1 — Agentic Architecture & Orchestration)

決定論的な手順はワークフローで、判断が要る曖昧な部分だけをエージェントに任せるのが原則。固定順序と分岐をコード側の制御構造にすれば、照合スキップや不要なループは構造的に起こり得ない。開放ループは不確実性が本質的に必要な箇所（レビュー振り分け）に限定する。

**なぜ他が違うか**

- **B.** max_tokens はステップ遵守と無関係。制御をモデルの記憶に委ねている限り、手順スキップやループは再発する（knob-twiddling）。
- **C.** プロンプトのお願いは強制ではなく、開放ループのまま順序を保証できない。決定論的にすべき箇所をモデル任せにしている（prompt-only-fix）。
- **D.** モデルを大きくしても開放ループの構造は変わらず、手順遵守は保証されない。コストが上がるだけで根本原因は残る（bigger-model）。

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q20 Correct: D (D5 — Context Management & Reliability)

反復される静的プレフィックスは prompt caching に効く。安定部分を先頭に固定してキャッシュすると、40,000回の繰り返しでコストとレイテンシを構造的に下げられる。一時エラーは冪等なリトライ＋バックオフで耐障害性を持たせつつ、完了済みの支払予約を再実行しない設計にすれば二重支払いも防げる。

**なぜ他が違うか**

- **A.** 本文を先頭・指示を末尾に置くとプレフィックスが安定せず prompt caching が効かなくなる。コスト・レイテンシ問題を悪化させる（true-but-irrelevant）。
- **B.** 無条件の最初からのやり直しは、既に成功した schedule_payment を再度呼び二重支払いを招きうる。責任ある対応に見えて冪等でない（sounds-responsible）。
- **C.** 照合ルールの削除は必要なロジックを捨てる過剰対応。照合精度が落ち、80%自動化の前提が崩れる（over-restriction）。

**参照:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

## 免責事項 / Disclaimer

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.