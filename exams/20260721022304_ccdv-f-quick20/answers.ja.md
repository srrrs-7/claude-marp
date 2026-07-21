# Claude Certified Developer – Foundations (CCDV-F) — 解答・解説

## Answer Key & Rationale

**採点方法:** 正答数 ÷ 20 が正答率。スケールドスコアの目安は `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）。間違えた問題のドメインを記録し、README.md の採点表に転記してください。

---

### Q1 Correct: B (D2 — Applications & Integration)

要件は「大量・即時性不要・コスト最優先」で、これは Message Batches API の設計目的そのものに一致する。非同期の一括処理は同期呼び出しより低コストで、翌朝までという猶予は24時間枠に完全に収まるため、構造的にコストを下げつつ要件を満たす。

**なぜ他が違うか**

- **A.** 同期・並列は最速だが本件では速度は要件でなく、コスト最優先という制約に真っ向から反する。速いこと自体は正しくても問われている問題を解かない。
- **C.** max_tokens の縮小は出力を削るだけで削減幅が小さく構造的でない。バッチ処理の欠如という本当のコスト要因に触れていない。
- **D.** 最小モデルへの一律切替は要約・分類の品質を犠牲にする過剰対応で、コストのために業務価値を捨てている。

**参照:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q2 Correct: C (D2 — Applications & Integration)

苦情の本質は「最初の1文字が出るまでの空白時間」であり、総生成時間ではない。streaming はトークンを生成しながら逐次返すため、完了を待たずに文字が出始め、体感レイテンシを直接改善する。総時間を変えずに知覚を変える点が要件に一致する。

**なぜ他が違うか**

- **A.** 大きいモデルは必ずしも速くなく、むしろ遅くなり得る。空白時間という知覚の問題をモデル性能の問題に取り違えている。
- **B.** タイムアウト延長は切断対策で、安定化に見えるが最初の表示までの空白時間には何ら影響しない。
- **D.** 応答を短くすると回答品質を損なううえ、短くても streaming がなければ完了まで空白は残る。パラメータいじりで本質を外している。

**参照:**

- [ストリーミング](https://docs.claude.com/en/docs/build-with-claude/streaming)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q3 Correct: A (D2 — Applications & Integration)

429/529 は一過性で、時間をおいて再送すれば多くが成功する種類のエラー。指数バックオフ付きリトライは、集中を避けつつ自動で再試行し Retry-After を尊重することで、恒久的な失敗を一時的な遅延に変える。制御をハーネス側に置く正攻法である。

**なぜ他が違うか**

- **B.** ログ収集は事後の可視化にすぎず、落ちたリクエストは救済されない。予防や回復を一切していない事後検知型の対応。
- **C.** temperature は出力のランダム性を変えるだけで、レート超過や過負荷とは無関係。無関係なパラメータいじり。
- **D.** モデルサイズはレート制限や過負荷応答の解消とは関係がなく、むしろ負荷や制限を悪化させ得る。

**参照:**

- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)
- [レート制限](https://docs.claude.com/en/api/rate-limits)

---

### Q4 Correct: D (D2 — Applications & Integration)

Claude の Vision は画像やPDFを直接入力として受け取り、視覚的な内容を理解できる。スキャンPDFをそのまま渡して項目抽出させれば、外部OCRを別途構築せずに要件を満たせる。入力形態（画像PDF）と機能（Vision）が1対1で対応する。

**なぜ他が違うか**

- **A.** 全件の手動文字起こしは責任ある運用に見えるが、800件/日ではスケールせずコストと遅延を生む。機能で解けるものを人手で回避している。
- **B.** ファイル名だけの分類は本文の金額や期日を一切読まず、抽出という要件を満たさない。
- **C.** モデルサイズを上げても入力形態が画像である事実は変わらず、テキスト前提のままでは中身を渡せていない。

**参照:**

- [Vision（画像・PDF入力）](https://docs.claude.com/en/docs/build-with-claude/vision)
- [Messages API](https://docs.claude.com/en/api/messages)

---

### Q5 Correct: A, C (D2 — Applications & Integration)

レート制限への正攻法は2軸ある。（A）一過性の 429 をバックオフ付きで再送して取りこぼしを回復する耐障害性と、（C）自分のレート上限を前提に送信ペースを能動的に整え、必要ならサービスティアで割り当てを引き上げるスループット制御。両者を組み合わせると可用性とスループットを同時に守れる。

**なぜ他が違うか**

- **B.** モデルサイズはレート制限の割り当てとは無関係で、超過そのものを解消しない。大きいモデルにすれば解決という誤り。
- **D.** 429 での即時破棄は一過性エラーで処理を捨てる過剰対応で、可用性をむしろ下げる。課題は消えても業務が止まる。

**参照:**

- [レート制限](https://docs.claude.com/en/api/rate-limits)
- [サービスティア](https://docs.claude.com/en/api/service-tiers)
- [エラー種別とリトライ](https://docs.claude.com/en/api/errors)

---

### Q6 Correct: B, D (D2 — Applications & Integration)

2つの要件はそれぞれ別の機能に1対1で対応する。（1）大量・即時性不要・コスト最優先は Message Batches API の適用領域（B）。（2）総時間は許容だが最初の表示を早めたいという知覚の問題は streaming が直接解決する（D）。要件の性質と機能の性質が噛み合っている。

**なぜ他が違うか**

- **A.** 同期・並列は速いがコスト最優先の要件に反し、即時性が不要な夜間処理でわざわざ高コストを払う。速いこと自体は正しくても要件を外す。
- **C.** max_tokens=1 は応答を1トークンに切り詰めて回答を壊すだけで、体感待ちの改善にならない。無関係なパラメータいじり。

**参照:**

- [Message Batches API（大量・非同期・低コスト）](https://docs.claude.com/en/docs/build-with-claude/batch-processing)
- [ストリーミング](https://docs.claude.com/en/docs/build-with-claude/streaming)

---

### Q7 Correct: B (D1 — Agents & Workflows)

ステップと順序が事前に完全に確定している処理は、モデルに次の一手を判断させる必要がない。決定的なワークフロー（各ステップを固定順で連結）にすれば、検証飛ばしやループは構造的に起こり得なくなる。エージェント化が価値を持つのは、必要な手順が入力ごとに変わり事前に決められない場合だけである。

**なぜ他が違うか**

- **A.** モデルを大きくしても、開放ループでモデルに判断を委ねる構造そのものは変わらず、飛ばしやループの余地は残る。固定手順に判断は不要。
- **C.** プロンプトでのお願いは構造的保証にならない。モデルが従わなければ再び飛ばしやループが起きる。制御は構造で担保する。
- **D.** 検証ツール自体を消せば、検証という必要な業務ステップまで実行できなくなる。課題は消えるが処理も成立しなくなる過剰対応。

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q8 Correct: C (D1 — Agents & Workflows)

必要な手順数が入力ごとに変わり事前に決められない処理こそ、エージェント（開放ループ）が適する。モデルが状況に応じてツール呼び出しを動的に決め、完了まで反復する。暴走はプロンプトではなくハーネス側の最大反復数の上限で構造的に抑える。

**なぜ他が違うか**

- **A.** 事後にログを集めてレビューするだけでは、実行時に手順が足りない根本原因（手順を固定していること）を解消できない。予防になっていない。
- **B.** バッチAPIは大量・非同期・低コスト処理の話で、可変の手順数という設計課題とは無関係。問われている問題を解かない。
- **D.** モデルを大きくしても3ステップ固定という制約は残る。複雑なチケットに必要な追加の調査ステップを踏めない構造は変わらない。

**参照:**

- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)
- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)

---

### Q9 Correct: A (D1 — Agents & Workflows)

エージェントの制御はモデルの善意ではなくハーネス側の仕組みで担保する。最大反復数とタイムアウトで暴走を止め、権限は最小化して使わない高影響ツールを剥がし、破壊的操作には人間の承認（human-in-the-loop）を挟む。これらは仕組みなので確実に効く。

**なぜ他が違うか**

- **B.** プロンプトのお願いは強制力を持たない。モデルが従わなければ再び暴走や破壊的操作が起きる。構造的な保証にならない。
- **C.** モデルの自己判断に依存する限り、破壊的操作を確実には防げない。制御をモデルの内部に置くこと自体が根本原因。
- **D.** max_tokens は1回の出力長を変えるだけで、反復回数や破壊的操作の実行可否とは無関係。制御レバーを取り違えている。

**参照:**

- [Agent SDK 概要](https://docs.claude.com/en/api/agent-sdk/overview)
- [効果的なエージェントの作り方（workflow と agent の境目）](https://www.anthropic.com/engineering/building-effective-agents)

---

### Q10 Correct: D (D5 — Model Selection & Optimization)

prompt caching は先頭からの静的プレフィックスにキャッシュが効く。可変の質問を先頭に置くと、その後ろの巨大なマニュアルが毎回キャッシュミスになり再処理される。同一マニュアルを先頭へ、可変部分を後ろへ並べ替えるだけで、2回目以降はマニュアル分の処理を省け、レイテンシもコストも構造的に下がる。

**なぜ他が違うか**

- **A.** 小さいモデルはコストを下げるが規程QAの回答品質を損なうおそれがあり、真因（毎回同一の巨大プレフィックスを再処理していること）を直していない。
- **B.** max_tokens は出力側の上限で、入力3万トークンの繰り返し処理という主要コスト要因には効かない。削減幅が構造的でない。
- **C.** ストリーミングは体感レイテンシを改善するだけで、毎回マニュアルを再処理するコストと実処理時間は変わらない。問われている真因を解かない。

**参照:**

- [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

---

### Q11 Correct: B (D5 — Model Selection & Optimization)

extended thinking は多段の推論が要る難しい問題で効果を発揮する機能で、5カテゴリへの単純分類のような浅いタスクでは精度に寄与せずレイテンシとコストだけが増える。タスクの難度に応じて使うかどうかを切り分けるのが根本解決。単純タスクでは無効化する。

**なぜ他が違うか**

- **A.** 真因はタスクに合わない機能を全件で有効化していること。モデルを大きくしてもコスト・レイテンシ増を招くだけで、単純タスクに thinking が不要な事実は変わらない。
- **C.** 精度が頭打ちなのはタスクが単純で深い思考を要さないから。予算を増やせばコストとレイテンシがさらに悪化するだけで、責任ある対応に見えて逆効果。
- **D.** temperature は出力のばらつきを変えるパラメータで、extended thinking の要否やコスト・レイテンシの問題とは無関係。レバーの取り違え。

**参照:**

- [extended thinking](https://docs.claude.com/en/docs/build-with-claude/extended-thinking)
- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q12 Correct: C (D5 — Model Selection & Optimization)

モデル階層はタスクの難度に合わせて選ぶ。定型整形のような単純・高頻度な工程は高速・低コストの階層で十分な品質を出せる一方、複雑な要約は上位階層が要る。コストの大半を占める単純工程を下位階層にルーティングし、上位を難所だけに残せば、品質を保ったままコストが構造的に下がる。

**なぜ他が違うか**

- **A.** max_tokens は出力上限を変えるだけで、単純工程を最上位モデルで回している主要コスト要因には効かない。削減が構造的でない。
- **B.** プロンプトで簡潔化しても、高価なモデルで大量の単純処理を回す構造は変わらない。真因である工程とモデル階層の不整合を直していない。
- **D.** 全工程を最小モデルに統一すると、複雑な要約工程の品質まで落ちる。コストは下がるが品質を犠牲にする過剰な単純化。

**参照:**

- [モデルの選び方（階層とトレードオフ）](https://docs.claude.com/en/docs/about-claude/models/choosing-a-model)

---

### Q13 Correct: B (D3 — Claude Code)

同じ前提を毎回貼り直す手戻りの根本原因は、プロジェクト固有の知識がセッション間で永続化されていないこと。CLAUDE.md はリポジトリ直下に置くと各セッション開始時に自動で文脈へ読み込まれるため、ビルド／テストコマンドや規約を一度書けば恒久的に共有され、推測に起因する手戻りが構造的に消える。

**なぜ他が違うか**

- **A.** prompt-only-fix。注意書きは知識源を与えていないので、Claude は依然として正しいコマンドを知らず推測を続ける。人手での貼り付けも残る
- **C.** bigger-model。モデルを大きくしてもリポジトリ固有のコマンドや規約は学習済みではなく、推測の当てずっぽうが上手くなるだけで永続的な共有にはならない
- **D.** detect-after-the-fact。事後の振り返りは誤りを記録するだけで、次のセッションが正しい前提で始まる仕組みを与えない

**参照:**

- [Claude Code 概要](https://docs.claude.com/en/docs/claude-code/overview)
- [代表的なワークフロー](https://docs.claude.com/en/docs/claude-code/common-workflows)

---

### Q14 Correct: D (D4 — Eval, Testing & Debugging)

回帰がリリース後に発覚する根本原因は、変更前後の品質を測る客観的な基準が無いこと。正解ラベル付きの評価セットを作り、各変更で同じ採点基準に対して自動評価すれば、どの変更が品質を上げ下げしたかをリリース前に定量比較でき、回帰を予防できる。

**なぜ他が違うか**

- **A.** knob-twiddling。temperature は出力の揺らぎを変えるだけで、要点の抜けという品質そのものを測定・防止しない
- **B.** sounds-responsible。少数の目視確認は網羅性がなく再現性もないため、回帰を安定して検出できない
- **C.** prompt-only-fix。指示を強めても、その変更が実際に品質を上げたかを測る手段が無いままなので、次の回帰も検出できない

**参照:**

- [評価テストの作り方](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)
- [Evaluation ツール](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool)

---

### Q15 Correct: A (D6 — Prompt & Context Engineering)

パース例外の根本原因は、出力の構造がモデル任せで保証されていないこと。ツールスキーマで構造化出力を要求すると形式がスキーマに拘束され、さらにクライアント側でスキーマ検証し失敗分だけリトライすれば、たまの逸脱にも耐える仕組みが完成する。制御をハーネス側（検証＋リトライ）に置くのが要点。

**なぜ他が違うか**

- **B.** prompt-only-fix。依頼を強めても形式は保証されず、数十件の逸脱は確率的に残り続ける
- **C.** detect-after-the-fact。異常率を見るだけで、崩れた出力を正しく取り込む手段にはならずジョブは止まったまま
- **D.** knob-twiddling。temperature や max_tokens は前置き混入やフィールド欠落という構造の問題を解決しない

**参照:**

- [構造化出力](https://docs.claude.com/en/docs/build-with-claude/structured-outputs)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

### Q16 Correct: C (D6 — Prompt & Context Engineering)

前置き混入の根本原因は、応答の書き出しがモデル任せになっていること。応答を `## 要約` まで prefill しておくと、モデルはその続きから生成せざるを得ず、出力は必ず所定の見出しで始まる。書き出しを構造的に固定するのが最も確実。

**なぜ他が違うか**

- **A.** sounds-responsible。後処理は前置きを削れても、見出し以外の逸脱には脆く、根本の書き出し制御をしていない
- **B.** prompt-only-fix。強調しても確率的に前置きは残る。書き出しを機構として固定していない
- **D.** bigger-model。大きいモデルでも書き出しの逸脱はゼロにならず、prefill のような構造的保証を代替しない

**参照:**

- [応答のprefill](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response)
- [文脈設計の原則](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

### Q17 Correct: B (D7 — Security & Safety)

インジェクションの根本原因は、非信頼な取得コンテンツが信頼された指示と同じ地位で扱われ、かつ高影響ツールが無条件に実行できること。取得本文を非信頼データとして隔離し（指示として解釈させない）、返金など破壊的操作を最小権限＋人間承認にすれば、埋め込み指示が実害へ到達する経路が塞がれる。

**なぜ他が違うか**

- **A.** prompt-only-fix。依頼文は非信頼コンテンツと信頼された指示の境界を機構的に分けておらず、巧妙な埋め込みには破られる
- **C.** detect-after-the-fact。異常検知は返金が実行された後の話で、実害の発生自体を防がない
- **D.** over-restriction。取得機能を全廃すると問い合わせ対応という本来業務も止まり、課題は消えるが価値も消える

**参照:**

- [ジェイルブレイク／インジェクション緩和](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
- [ツール利用 概要](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)

---

### Q18 Correct: D (D7 — Security & Safety)

全操作の無条件許可は、誤りやインジェクションが即座に破壊的操作へ直結する構造を作る。Claude Code の権限モデルは許可対象を明示的に絞れる設計であり、最小権限にして破壊的操作を許可対象から外せば、非対話環境でも暴走の影響範囲が構造的に限定される。

**なぜ他が違うか**

- **A.** knob-twiddling。temperature は権限の広さと無関係で、破壊的操作の実行可能性を何も減らさない
- **B.** bigger-model。モデルが賢くてもインジェクションや誤操作は起こり得るため、全許可の危険は残る
- **C.** detect-after-the-fact。監査ログは破壊が起きた後に追えるだけで、実行そのものを防がない

**参照:**

- [Claude Code のセキュリティモデル](https://docs.claude.com/en/docs/claude-code/security)
- [Claude Code 概要](https://docs.claude.com/en/docs/claude-code/overview)

---

### Q19 Correct: A (D8 — Tools & MCPs)

複数アプリで同じ機能を重複実装しているのが保守コストの根本原因。再利用したい機能はMCPサーバとして一度サーバ化すれば、各アプリは共通サーバに接続するだけで済み、スキーマ変更もサーバ1箇所の修正で全アプリに反映される。MCPは再利用可能な機能を外部化するための仕組み。

**なぜ他が違うか**

- **B.** sounds-responsible。実装箇所を減らすように見えるが、コピー方針は結局重複を再生産し、仕様の分岐を招く
- **C.** sounds-responsible。運用ルールに頼る手動同期は忘れやすく、3箇所の不整合という根本問題を機構的に解決しない
- **D.** true-but-irrelevant。説明文の充実はツールの使われ方を改善しうるが、重複実装と多重保守という問われている問題を解決しない

**参照:**

- [MCP（Anthropic ドキュメント）](https://docs.claude.com/en/docs/agents-and-tools/mcp)
- [リモートMCPサーバ](https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers)

---

### Q20 Correct: C (D8 — Tools & MCPs)

引数の欠落やフォーマット崩れの根本原因は、ツール定義がパラメータの意味・必須性・期待形式を十分に伝えていないこと。各パラメータの説明と期待フォーマットを明示し、必須項目をスキーマの required で制約すれば、モデルが正しく引数を埋める確率が構造的に上がる。エージェント向けツールは説明とスキーマの明確さが要。

**なぜ他が違うか**

- **A.** detect-after-the-fact。失敗の監視は傾向を可視化するだけで、正しい呼び出しをさせる手段を与えない
- **B.** prompt-only-fix。一般的な注意はツール定義の曖昧さを直しておらず、モデルは何が必須でどの形式かを依然として推測する
- **D.** bigger-model。大きいモデルでも定義が曖昧なら誤用は残り、スキーマ制約のような構造的保証を代替しない

**参照:**

- [エージェント向けツールの書き方](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [ツール利用の実装](https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use)

---

## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。