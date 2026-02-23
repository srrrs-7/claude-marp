---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "AWS Certified Generative AI Developer - Professional"
footer: "© 2026 試験対策スライド"
style: |
  section {
    font-size: 1.0em;
  }
  section pre code {
    font-size: 0.55em;
    line-height: 1.35;
  }
  section h1 {
    font-size: 1.6em;
  }
  section h2 {
    font-size: 1.3em;
  }
  
---

<!-- _class: lead -->
# AWS Certified Generative AI Developer - Professional

- 試験対策スライド 全80枚
- 2026年版 | 生成AI・Bedrock・RAG・エージェント・責任あるAI・LLMOps

<!--
AWS Certified Generative AI Developer - Professional（ANA版）試験対策。7つのドメインを横断的にカバーします。
-->

---

# 試験概要・ドメイン構成

![w:900 center](assets/slide02-exam-overview.svg)

<!--
7ドメイン構成。Bedrockの比重が最も高く、次いでRAGとプロンプトエンジニアリング。生成AI基礎は広く薄く出題される傾向。
-->

---

# アジェンダ (1/2)

- **Domain 1**: 生成AI基礎 — LLM・Transformer・FM・推論パラメータ
- **Domain 2**: Amazon Bedrock — API・Knowledge Bases・Agents・Guardrails
- **Domain 3**: RAG & ベクターDB — チャンキング・エンベディング・Advanced RAG
- **Domain 4**: プロンプトエンジニアリング — CoT・ReAct・Few-shot・インジェクション対策

<!--
前半4ドメインのアジェンダ。
-->

---

# アジェンダ (2/2)

- **Domain 5**: AIエージェント — Bedrock Agents・マルチエージェント・Function Calling
- **Domain 6**: 責任あるAI & セキュリティ — バイアス・Guardrails・ガバナンス
- **Domain 7**: MLOps / LLMOps — SageMaker・デプロイ戦略・モデル監視
- **まとめ**: 試験頻出ポイント & 重要AWSサービス一覧

<!--
後半3ドメイン＋まとめ。
-->

---

# 生成AIとは？従来のAIとの違い

![w:900 center](assets/slide05-genai-vs-traditional.svg)

<!--
従来AIは識別・分類・予測（入力→ラベル）。生成AIは新しいコンテンツを生成（入力→新しいデータ）。基盤となる技術は深層学習だが、スケールと目的が大きく異なる。試験では「生成AIとdiscriminative AIの違い」が出題される。
-->

---

# 機械学習→深層学習→生成AIの進化

![w:900 center](assets/slide06-ai-evolution.svg)

<!--
1950年代の記号AIから現代の生成AIまでの進化。2017年のTransformer論文「Attention Is All You Need」が転換点。GPT-3（2020）、ChatGPT（2022）、Claude（2023）と急速に発展。試験ではこの歴史的文脈より技術的な差異が重要。
-->

---

# 大規模言語モデル（LLM）の仕組み

![w:900 center](assets/slide07-llm-mechanism.svg)

<!--
LLMはトークン列の確率分布をモデル化。次のトークンを予測するタスク（次トークン予測）で事前学習。パラメータ数が多いほど（数十億〜数兆）表現力が高い。試験では「事前学習」「ファインチューニング」「RLHF」の違いが重要。
-->

---

# トークン化とトークン数

![w:900 center](assets/slide08-tokenization.svg)
- 1 token ≈ 英語0.75単語 / 日本語1〜2文字 | コスト計算の基本単位

<!--
BPE（Byte Pair Encoding）やSentencePieceなどのサブワードトークナイザーを使用。トークン数はコストと速度に直結。AWS Bedrockではin/outトークンで課金。日本語は英語の約1.5〜2倍のトークン数になる傾向。
-->

---

# エンベディングとベクター表現

![w:900 center](assets/slide09-embeddings.svg)

<!--
単語・文・ドキュメントを高次元ベクター（768〜4096次元）に変換。意味的に近いテキストはベクター空間で近くに配置される。RAGの基盤技術。Amazon Titan Embeddingsが代表的なAWSのエンベディングモデル。コサイン類似度で類似度計算。
-->

---

# Transformer アーキテクチャ概要

![w:900 center](assets/slide10-transformer.svg)

<!--
2017年Google「Attention Is All You Need」で提案。Encoder-Decoder構造（翻訳）、Encoder Only（BERT系、分類・埋め込み）、Decoder Only（GPT系、テキスト生成）の3タイプ。LLMはほぼDecoder Only。Multi-Head Self-Attentionが核心。
-->

---

# アテンションメカニズム

![w:900 center](assets/slide11-attention.svg)

<!--
Attention(Q,K,V) = softmax(QK^T / √d_k)V。Q=Query（現在のトークン）、K=Key（他のトークン）、V=Value（情報）。Multi-Headでは複数の視点（head）で同時に注意を計算。長距離依存関係の捕捉が得意。
-->

---

# Foundation Models の種類と用途

![w:900 center](assets/slide12-fm-types.svg)

<!--
テキスト生成（Claude・Llama）、画像生成（Stability AI・Titan Image）、コード生成（CodeWhisperer・Claude）、エンベディング（Titan Embeddings）、マルチモーダル（Claude 3・Nova）。試験ではユースケースに応じたFM選択が頻出。
-->

---

# マルチモーダルモデル

![w:900 center](assets/slide13-multimodal.svg)

<!--
複数のモダリティ（テキスト・画像・音声・動画）を統合処理。Claude 3 Sonnet/Opus、Amazon Nova Pro/Liteがマルチモーダル対応。Vision機能でPDF・スクリーンショットの解析も可能。BedrockのConverseAPIでマルチモーダルリクエストを統一的に扱える。
-->

---

# 推論パラメータ（温度・Top-P・Top-K・MaxTokens）

![w:900 center](assets/slide14-inference-params.svg)

<!--
Temperature: 0=決定論的、1=創造的。Top-P: 累積確率でサンプリング（nucleus sampling）。Top-K: 上位K個のトークンからサンプリング。MaxTokens: 生成する最大トークン数。試験では各パラメータの効果と適切な設定値が問われる。
-->

---

# コンテキストウィンドウとその影響

![w:900 center](assets/slide15-context-window.svg)

<!--
コンテキストウィンドウ = モデルが一度に処理できるトークン数の上限。Claude 3.5: 200K、Llama 3: 128K、Titan Text: 32K。ウィンドウを超えると古い情報が「忘れられる」。長文書処理やマルチターン会話設計に重要。コスト増加にも直結。
-->

---

# ハルシネーション：原因と対策

![w:900 center](assets/slide16-hallucination.svg)

<!--
ハルシネーション = LLMが事実と異なる情報を自信を持って生成する現象。原因: 学習データのバイアス・知識の欠如・確率的生成。対策: RAGで根拠情報を注入、Guardrailsで不正確情報をフィルタリング、グラウンディング（引用明示）、温度を下げる。試験で最頻出の課題。
-->

---

# モデル評価指標（BLEU・ROUGE・BERTScore）

![w:900 center](assets/slide17-eval-metrics.svg)

<!--
BLEU: 機械翻訳評価、n-gramの一致率。ROUGE: 要約評価、再現率重視。BERTScore: 意味的類似度（コサイン類似度）。Perplexity: 言語モデルの予測精度。人間評価（Human Eval）も重要。Bedrock Model EvaluationはLLM-as-a-judgeも対応。
-->

---

# 生成AIのユースケース分類

![w:900 center](assets/slide18-use-cases.svg)

<!--
テキスト生成（コンテンツ作成・要約・翻訳）、コード生成（CodeWhisperer・デバッグ）、会話AI（カスタマーサポート・チャットボット）、検索拡張（RAG）、画像生成（マーケティング）、データ分析（自然言語でのDB照会）。試験ではユースケースに最適なAWSサービスの選択が重要。
-->

---

# Amazon Bedrock 概要

![w:900 center](assets/slide19-bedrock-overview.svg)

<!--
Amazon Bedrockはマネージド型FMサービス。APIを通じて複数プロバイダーのFMにアクセス可能。サーバーレス、データはAWSインフラに留まる（プライバシー保証）。主な機能: InvokeModel/Converse API、Knowledge Bases、Agents、Guardrails、Flows、Model Evaluation、Fine-tuning。
-->

---

# Bedrock で利用できる FM プロバイダー

![w:900 center](assets/slide20-fm-providers.svg)

<!--
Anthropic Claude（テキスト・マルチモーダル）、Amazon Titan（テキスト・エンベディング・画像）、Amazon Nova（最新世代）、Meta Llama（オープンソース系）、Stability AI（画像生成）、Mistral AI、AI21 Labs Jurassic。試験ではプロバイダーとモデル特性の理解が重要。
-->

---

# Bedrock API: InvokeModel / Converse

- **InvokeModel API**: モデル固有のリクエスト形式、単一ターン向け
- **Converse API**: 統一インターフェース、マルチターン対話、ツール利用対応

```python
import boto3, json

br = boto3.client('bedrock-runtime', region_name='us-east-1')

# Converse API（推奨：統一インターフェース）
response = br.converse(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    messages=[{
        'role': 'user',
        'content': [{'text': 'AWSのBedrockを説明してください'}]
    }],
    inferenceConfig={
        'maxTokens': 1024,
        'temperature': 0.7,
        'topP': 0.9
    }
)
print(response['output']['message']['content'][0]['text'])
```

<!--
Converse APIはモデル間の差異を吸収する統一API。マルチターン会話、ツール使用（Function Calling）をサポート。InvokeModelはモデル固有の形式が必要だが、より細かい制御が可能。試験では両APIの使い分けが問われる。
-->

---

# Knowledge Bases for Bedrock

![w:900 center](assets/slide22-knowledge-bases.svg)

<!--
Knowledge Bases = マネージド型RAGサービス。S3のドキュメントを自動でチャンキング・エンベディング・ベクターDB格納。対応ベクターDB: OpenSearch Serverless、Pinecone、Redis Enterprise、MongoDB Atlas。RetrieveAndGenerate APIで検索〜生成を一括実行。メタデータフィルタリング対応。
-->

---

# Bedrock Agents: 概要と仕組み

![w:900 center](assets/slide23-bedrock-agents.svg)

<!--
Bedrock Agentsは自律的にタスクを実行するAIエージェント。ReActパターン（推論→行動→観察のループ）を実装。アクショングループ（Lambda/OpenAPI）でツールを定義。Knowledge Basesと連携でRAGも統合可能。マルチエージェント機能でサブエージェントを呼び出せる。オーケストレーター戦略はReAct/Chain-of-Thought。
-->

---

# Bedrock Agents: アクショングループ

- アクショングループ = エージェントが実行できるアクションのセット
- **実装方法**: OpenAPI スキーマ（Lambda連携）または組み込みアクション

```json
# OpenAPI スキーマ例（アクショングループ定義）
{
  "openapi": "3.0.0",
  "paths": {
    "/getWeather": {
      "get": {
        "description": "指定した都市の天気を取得",
        "parameters": [{
          "name": "city",
          "in": "query",
          "required": true,
          "schema": {"type": "string"}
        }],
        "responses": {
          "200": {"description": "天気情報"}
        }
      }
    }
  }
}
```

<!--
アクショングループはLambda関数をバックエンドにしてOpenAPIスキーマで定義するか、Amazon Bedrockの組み込みアクション（ユーザー入力の確認、KB検索）を使う。エージェントは自動的に適切なアクションを選択して実行。
-->

---

# Bedrock Guardrails

![w:900 center](assets/slide25-guardrails.svg)

<!--
Guardrailsは有害コンテンツ・機密情報の入出力フィルタリング機能。コンテンツフィルター（ヘイトスピーチ・暴力）、PIIマスキング（メール・クレカ番号）、トピック拒否（特定トピックをブロック）、グラウンディングチェック（ハルシネーション検出）、ワードフィルター。全Bedrockモデルに適用可能。
-->

---

# Bedrock Flows

![w:900 center](assets/slide26-bedrock-flows.svg)

<!--
Bedrock Flowsはノーコード/ローコードでAIワークフローを構築するビジュアルビルダー。ノードタイプ: 入力・FM・Knowledge Base・Lambda・条件分岐・ループ・出力。複雑なマルチステップのAIパイプラインをGUIで構築。プロンプトチェーニングやRAGパイプラインの構築に有効。
-->

---

# Bedrock Model Evaluation

![w:900 center](assets/slide27-model-evaluation.svg)

<!--
2種類の評価: 自動評価（ROUGE・BERTScore等の指標）とLLM-as-a-judge（別のLLMが評価）。評価タスク: テキスト要約・QA・テキスト分類・オープンエンド生成。モデル比較やファインチューニング後の品質確認に使用。Human Evaluationジョブ機能で人間レビューも統合可能。
-->

---

# Fine-tuning vs Continued Pre-training

![w:900 center](assets/slide28-finetuning-vs-cpt.svg)

<!--
Fine-tuning: ラベル付きデータ（プロンプト→回答ペア）でタスク特化。特定の形式・トーン・ドメインに適応。Continued Pre-training (CPT): ラベルなし大量テキストで追加学習。ドメイン知識の注入（医療・法律・社内文書）。どちらもBedrockのマネージド機能として提供。コストと効果のトレードオフを試験では問われる。
-->

---

# Bedrock カスタムモデルのワークフロー

![w:900 center](assets/slide29-custom-model-workflow.svg)

<!--
S3にトレーニングデータ準備→Bedrockカスタマイズジョブ作成→学習実行→カスタムモデル保存→プロビジョンドスループット購入→推論実行。Fine-tuningはClaudeのInstruct系、Titanが対応。CPTはTitan Text系が対応。カスタムモデルはマーケットプレイスで共有も可能。
-->

---

# Amazon Titan シリーズ

![w:900 center](assets/slide30-titan-series.svg)

<!--
Titan Text: テキスト生成・対話（G1 Lite/Express）。Titan Text Premier: 高性能テキスト生成。Titan Embeddings: テキストエンベディング（V2: 1536次元）。Titan Multimodal Embeddings: 画像+テキストの複合エンベディング。Titan Image Generator: 高品質画像生成。すべてAWSネイティブのFM。
-->

---

# Bedrock コスト最適化

![w:900 center](assets/slide31-bedrock-cost.svg)

<!--
On-demand: 使用量課金（開発・テスト向け）。Provisioned Throughput: 固定スループット（MCU単位・時間課金、本番大量使用向け）。Batch Inference: 非同期大量処理（50%割引）。Prompt Caching: 繰り返しプロンプトの再利用でコスト削減。Cross-region inference: 負荷分散でスループット向上。
-->

---

# Bedrock セキュリティ・IAM

![w:900 center](assets/slide32-bedrock-security.svg)

<!--
IAMポリシーでbedrock:InvokeModel等のアクション制御。VPCエンドポイント（AWS PrivateLink）でインターネットを経由せずにBedrockにアクセス。KMSでカスタムモデルとKnowledge Basesのデータを暗号化。CloudTrailでAPI呼び出しを監査。ユーザーデータはAWSのモデル学習に使われない（プライバシー保証）。
-->

---

# RAG (Retrieval-Augmented Generation) とは

![w:900 center](assets/slide33-rag-overview.svg)

<!--
RAG = LLMの知識の限界をリアルタイム情報取得で補う設計パターン。LLMはカットオフ後の情報を知らない → 外部DBから関連情報を取得してコンテキストに注入。知識のアップデートにFine-tuningが不要。引用元を明示できるため透明性が高い。試験ではRAGとFine-tuningの使い分けが頻出。
-->

---

# RAG アーキテクチャ詳細フロー

![w:900 center](assets/slide34-rag-architecture.svg)

<!--
Offline（インデックス作成）: ドキュメント→チャンキング→エンベディング→ベクターDB格納。Online（推論時）: クエリ→エンベディング→KNN検索→Top-Kチャンク取得→プロンプトに注入→LLM生成→回答。Bedrock Knowledge BasesはこのフローをフルマネージドでRetrieveAndGenerate APIとして提供。
-->

---

# チャンキング戦略の比較

![w:900 center](assets/slide35-chunking-strategies.svg)

<!--
固定サイズ: 一定トークン数でカット（シンプル・デフォルト）。セマンティック: 意味の切れ目でチャンク（精度高・計算コスト高）。階層型: 親チャンク（大）+子チャンク（小）の二層構造（文脈保持）。カスタム変換: LambdaでPDF解析・表抽出等の独自処理。チャンクサイズ（200〜2000トークン）とオーバーラップ（20〜30%）の設定が重要。
-->

---

# ベクターエンベディングの仕組み

![w:900 center](assets/slide36-vector-embeddings.svg)

<!--
テキストチャンクをEmbedding Modelで高次元ベクター（1024〜1536次元）に変換。コサイン類似度でクエリと最も近いチャンクを検索（KNN: K-Nearest Neighbors）。次元数が高いほど情報量が多いが計算コスト増。正規化（ノルム=1）によりコサイン類似度=内積で効率計算。
-->

---

# ベクターデータベース比較

![w:900 center](assets/slide37-vector-db-comparison.svg)

<!--
Amazon OpenSearch Serverless: AWSネイティブ・k-NN検索・フルマネージド。Pinecone: 専用ベクターDB・高速・マネージド。Redis Enterprise: インメモリ・超低レイテンシ・既存Redis活用。MongoDB Atlas: ドキュメントDB+ベクター検索の統合。Aurora PostgreSQL: pgvector拡張・RDBと統合。試験では各DBの特性とユースケースのマッチングが問われる。
-->

---

# Amazon OpenSearch Serverless での実装

![w:900 center](assets/slide38-opensearch-serverless.svg)

<!--
OpenSearch Serverless = サーバーレスOpenSearchクラスター（自動スケール）。ベクターエンジン: nmslib（Hierarchical Navigable Small World）アルゴリズム使用。コレクション作成 → ベクターインデックス設定（次元数・類似度メトリクス指定）→ データ取り込み → KNN検索。Bedrock Knowledge Basesと自動統合。コスト: OCU(OpenSearch Compute Unit)時間課金。
-->

---

# Semantic Search vs Keyword Search vs Hybrid

![w:900 center](assets/slide39-search-types.svg)

<!--
キーワード検索（BM25/TF-IDF）: 完全一致・高速・文字通りの検索に強い。セマンティック検索（ベクター）: 意味的類似度・同義語対応・自然言語クエリに強い。ハイブリッド検索: 両方を組み合わせてランキング（RRF: Reciprocal Rank Fusionで統合）。Bedrock Knowledge Basesはハイブリッド検索に対応。一般的にハイブリッドが最高精度。
-->

---

# Advanced RAG パターン（HyDE・Re-rank）

![w:900 center](assets/slide40-advanced-rag.svg)

<!--
HyDE（Hypothetical Document Embeddings）: クエリからLLMで仮想回答を生成→その回答をエンベディングして検索（精度向上）。Re-ranking: 初期検索結果をCross-Encoder Modelで再スコアリング（精度向上）。Query Expansion: クエリを複数形式に展開して並列検索。Parent-Child Retrieval: 小チャンクで検索→親チャンクを返す（文脈保持）。Bedrock Re-ranking APIで実装可能。
-->

---

# RAG 評価指標（Faithfulness・Relevancy）

![w:900 center](assets/slide41-rag-evaluation.svg)

<!--
Faithfulness（忠実性）: 生成回答がコンテキスト文書に根拠があるか（ハルシネーション検出）。Answer Relevancy（関連性）: 回答がクエリに答えているか。Context Precision: 検索されたチャンクのうち関連するものの割合。Context Recall: 正解に必要な情報が検索できているか。RAGASフレームワークで自動評価。Bedrock Guardrailsのグラウンディングチェックもこれを実装。
-->

---

# RAG vs Fine-tuning 選択基準

![w:900 center](assets/slide42-rag-vs-finetune.svg)

<!--
RAG: 最新情報・社内文書・更新頻繁・引用必要・コスト低・即座に適用可。Fine-tuning: スタイル/フォーマット適応・特定タスク最適化・プロンプトエンジニアリング不要・データ非公開。両方: ドメイン知識(CPT) + タスク適応(FT) + リアルタイム情報(RAG)。試験頻出: 「更新頻繁→RAG」「形式固定→FT」「知識注入→CPT」。
-->

---

# プロンプトエンジニアリングの基礎

![w:900 center](assets/slide43-prompt-basics.svg)

<!--
プロンプトエンジニアリング = LLMへの入力を最適化してより良い出力を得る技術。コスト・リスクゼロでモデル改善の第一手段。プロンプトの構成要素: 指示(Instruction)・コンテキスト・入力データ・出力形式指定。明確な指示・具体例・制約の明示が重要。試験では「最もコスト効果的な改善策」として頻出。
-->

---

# Zero-shot / One-shot / Few-shot Learning

![w:900 center](assets/slide44-shot-learning.svg)

<!--
Zero-shot: 例なしでタスク説明のみ。汎用モデルに有効。One-shot: 1例を提示。Few-shot: 2〜10例を提示（精度向上）。例は高品質・多様・タスク代表的なものを選択。Too many shots → コンテキスト制限到達・コスト増。Chain-of-Thought with few-shot: 推論ステップを含む例を提示すると複雑タスクの精度が大幅向上。
-->

---

# Chain-of-Thought (CoT) プロンプティング

![w:900 center](assets/slide45-cot-prompting.svg)

<!--
CoT = 中間推論ステップを明示させることで複雑な問題の精度を向上させる手法。「ステップバイステップで考えてください」の一文で有効化（Zero-shot CoT）。Few-shot CoT: 推論例を提示。Self-Consistency: 複数回生成して多数決。Tree of Thoughts: 分岐する推論木を探索。数学・論理・コーディング問題に特に有効。大規模モデルほど効果大。
-->

---

# ReAct (Reasoning + Acting) パターン

![w:900 center](assets/slide46-react-pattern.svg)

<!--
ReAct = Reasoning（推論）とAction（行動）を交互に繰り返すエージェントパターン。Thought（何をすべきか推論）→ Action（ツール実行）→ Observation（結果観察）→ Thought...のループ。Bedrock Agentsがこのパターンを実装。外部ツール（Search・計算機・API）と統合することで幻覚を減らし事実確認が可能。
-->

---

# プロンプトテンプレートと変数

- テンプレート化により一貫性・再利用性・保守性を確保
- **Bedrock Prompt Management**: バージョン管理されたプロンプトテンプレートの一元管理

```python
import boto3

br = boto3.client('bedrock-runtime')

# Prompt template with variables
template = """
あなたは{role}です。
以下の{document_type}を分析して、{output_format}形式で回答してください。

文書:
{document}

分析観点: {analysis_focus}
"""

# Fill template
prompt = template.format(
    role="法律アドバイザー",
    document_type="契約書",
    output_format="箇条書き",
    document=contract_text,
    analysis_focus="リスク項目の特定"
)

response = br.converse(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    messages=[{'role': 'user', 'content': [{'text': prompt}]}]
)
```

<!--
Bedrock Prompt Managementで組織内プロンプトをバージョン管理・共有。プロンプトARNでテンプレートを参照。A/Bテストで最良のプロンプトを特定。LangChainのPromptTemplateと同様の概念をAWSネイティブで提供。
-->

---

# システムプロンプト設計のベストプラクティス

- **役割定義**: AIのペルソナ・専門性を明確に定義
- **制約設定**: 回答範囲・形式・禁止事項を明示
- **コンテキスト提供**: 背景情報・企業情報・対象ユーザーを記述
- **出力形式指定**: JSON/Markdown/箇条書き等の形式を明確化
- **例示**: 期待する入出力パターンをシステムプロンプトに含める
- **安全ガードレール**: 有害コンテンツ・PII取扱い等の指示を明記

<!--
システムプロンプトはセッション全体を通じて有効な隠れたコンテキスト。ユーザーには見えない（通常）が全ターンに適用される。Claude等ではAssistantロール冒頭の先回り記述も可能（Prefill）。最大長の制約に注意（コスト増加要因）。Bedrock Guardrailsと組み合わせて多層防御を構築。
-->

---

# プロンプトインジェクション攻撃と対策

![w:900 center](assets/slide49-prompt-injection.svg)

<!--
Direct Injection: ユーザーが指示を上書き（「前の指示を無視して...」）。Indirect Injection: 外部コンテンツ（Webページ・ドキュメント）に悪意ある指示が埋め込まれる（RAGシステムが危険）。対策: Guardrailsでプロンプト攻撃を検出・ブロック、入力をサニタイズ、システムプロンプトで明示的に指示無視を禁止、LLM出力の信頼レベルを制限。
-->

---

# 出力フォーマット制御（JSON・XML）

- 構造化出力により後処理・統合が容易になる

```python
# JSON形式での出力制御
system_prompt = """
必ず以下のJSON形式で回答してください:
{
  "summary": "要約テキスト（100字以内）",
  "sentiment": "positive|negative|neutral",
  "key_points": ["ポイント1", "ポイント2"],
  "confidence": 0.0〜1.0
}
JSON以外のテキストは出力しないでください。
"""

# Tool Use (Function Calling) でJSON強制
tools = [{
    "name": "analyze_text",
    "description": "テキスト分析結果を返す",
    "input_schema": {
        "type": "object",
        "properties": {
            "summary": {"type": "string"},
            "sentiment": {"type": "string",
                          "enum": ["positive","negative","neutral"]},
            "confidence": {"type": "number"}
        },
        "required": ["summary", "sentiment"]
    }
}]
```

<!--
JSON出力制御の2つのアプローチ: ①システムプロンプトでJSON形式を指示（シンプルだが不安定）②Tool Use/Function Callingでスキーマを定義（確実・推奨）。ClaudeはXML形式（<tag>）も得意。BedrockのConverse APIでtoolChoiceをauto/anyで制御可能。
-->

---

# プロンプト最適化・A/Bテスト

![w:900 center](assets/slide51-prompt-optimization.svg)

<!--
プロンプト最適化の手順: ①基準ライン設定→②仮説立て→③バリアント作成→④評価指標測定→⑤統計的検定→⑥勝者採用。Bedrock Model Evaluationでプロンプトバリアントをバッチ評価。Automatic Prompt Optimization（APO）: LLMが自動でプロンプトを改善。DSPy等のフレームワークも活用。試験では「品質改善でコスト最小」の選択肢でプロンプト最適化が正解になることが多い。
-->

---

# Amazon Bedrock Prompt Management

- **Prompt Store**: プロンプトテンプレートのバージョン管理・共有
- **Prompt Flows 統合**: Prompt ManagementのテンプレートをFlowsで直接参照
- **A/B Testing**: 複数バージョンを評価してベストプロンプトを特定
- **ARNでの参照**: arn:aws:bedrock:region:account:prompt/ID:version
- **コラボレーション**: チーム間でのプロンプト共有と品質管理
- **変数サポート**: {{variable}} 形式で動的パラメータを埋め込み

<!--
Bedrock Prompt ManagementはConsoleまたはAPIでプロンプトを管理するサービス。バージョン番号（draft/1/2...）でイテレーション管理。Prompt FlowsノードでIDを参照し本番変更なしでプロンプト更新可能。組織のプロンプトライブラリとして活用。IAMポリシーでアクセス制御。
-->

---

# AIエージェントとは：アーキテクチャ

![w:900 center](assets/slide53-agent-architecture.svg)

<!--
AIエージェント = 自律的に目標達成のためにツールを使い、マルチステップのタスクを実行するLLMベースのシステム。コンポーネント: LLMコア（推論・計画）+ ツール（API・DB・計算）+ メモリ（短期・長期）+ プランニング（タスク分解）。シンプルなチャットボットとの違いは「行動できる」点。Bedrock Agentsはこれをマネージドで提供。
-->

---

# ReAct エージェントループ

![w:900 center](assets/slide54-react-loop.svg)

<!--
ReActループの詳細: Thought→「ユーザーの注文履歴を確認する必要がある」。Action→注文DBを検索（Lambda実行）。Observation→「注文ID: 12345、商品: ノートPC、ステータス: 配送中」。Thought→「配送状況を確認する必要がある」。Action→配送APIを呼び出し。Observation→「配送予定: 明日」。Final Answer→「ご注文のノートPCは明日お届けの予定です」。
-->

---

# Bedrock Agents 実装パターン

![w:900 center](assets/slide55-agent-patterns.svg)

<!--
シングルエージェント: 単一のBedrock AgentがKB + アクショングループを使いタスク実行。マルチエージェント: スーパーバイザーエージェントが専門サブエージェントを呼び出して協調（例: 研究エージェント→分析エージェント→レポートエージェント）。エージェント評価: 実行トレースで思考プロセスを可視化・デバッグ。
-->

---

# マルチエージェントシステム

![w:900 center](assets/slide56-multi-agent.svg)

<!--
マルチエージェントの利点: 専門化（各エージェントが特定タスクに特化）・並列処理（独立タスクを同時実行）・スケーラビリティ・耐障害性。Bedrock Agentsのスーパーバイザー: サブエージェントをアクショングループとして定義して呼び出す。通信はAPIベース。アーキテクチャパターン: ハブ&スポーク（中央オーケストレーター）・ピアツーピア・階層型。
-->

---

# エージェントのメモリ管理

![w:900 center](assets/slide57-agent-memory.svg)

<!--
短期メモリ（セッション内）: コンテキストウィンドウに保持される会話履歴。セッションID（sessionId）で会話を継続。長期メモリ（セッション間）: Bedrock AgentsのMemory機能でセッション情報をS3に永続化。ユーザープロファイル・過去の会話サマリーをRAGで参照。エージェントはセッション開始時に長期メモリから関連情報を自動取得。
-->

---

# Function Calling / Tool Use

- Tool Use（Function Calling）= LLMに外部ツールを呼び出させる機能

```python
import boto3

br = boto3.client('bedrock-runtime')

# ツール定義
tools = [{
    "toolSpec": {
        "name": "get_weather",
        "description": "指定した都市の現在の天気を取得する",
        "inputSchema": {
            "json": {
                "type": "object",
                "properties": {
                    "city": {"type": "string",
                             "description": "都市名"}
                },
                "required": ["city"]
            }
        }
    }
}]

response = br.converse(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    messages=[{'role': 'user',
               'content': [{'text': '東京の天気は?'}]}],
    toolConfig={'tools': tools, 'toolChoice': {'auto': {}}}
)
# stopReason == 'tool_use' の場合にツール実行
```

<!--
Tool Use/Function CallingはLLMがツールを呼び出すタイミングと引数を自律的に決定する機能。Converse APIのtoolConfigで定義。stopReason='tool_use'でツール実行を検知→ツール実行→toolResult を messages に追加→再度Converse APIを呼び出すサイクル。Bedrock AgentsはこのサイクルをBedrockが自動管理。
-->

---

# エージェント評価指標

![w:900 center](assets/slide59-agent-evaluation.svg)

<!--
タスク完了率: 指定タスクを正確に完了した割合。ステップ効率: 最短ステップでゴールに到達できているか。ツール精度: 適切なツールを適切なタイミングで選択しているか。レイテンシ: エージェントのレスポンス時間（マルチステップほど遅い）。コスト: ツール実行回数・LLM呼び出し回数。Bedrock Agent実行トレースでステップ別デバッグが可能。
-->

---

# エージェントセキュリティ考慮点

![w:900 center](assets/slide60-agent-security.svg)

<!--
プロンプトインジェクション攻撃への対策: エージェントが外部データを処理する際に悪意ある指示が混入する危険。Lambda実行権限の最小化: エージェントのLambda実行ロールはタスクに必要な最小権限のみ。出力検証: エージェントが実行しようとするアクションを人間が確認（Human-in-the-loop）。Bedrock GuardrailsをAgentsにもアタッチ可能。
-->

---

<!-- _class: lead -->
# Domain 6: 責任ある AI

- 倫理・公平性・透明性・ガバナンス・コンプライアンス

<!--
Domain 6は試験の約10%。責任あるAIの6原則、AWS AIガバナンスフレームワーク、Bedrock Guardrails、SageMaker Clarify、PIIデータ保護が頻出。「この状況で倫理的に正しい行動は何か」という問いが多い。
-->

---

# AI 倫理の 6 原則

![w:900 center](assets/slide62-ai-ethics.svg)

<!--
AWSが定義する責任あるAIの6原則: ①公平性（Fairness）差別なし ②説明可能性（Explainability）判断根拠を示す ③プライバシー・セキュリティ（Privacy&Security）データ保護 ④堅牢性（Robustness）エラーへの耐性 ⑤ガバナンス（Governance）監視・統制 ⑥透明性（Transparency）開示・可視化。試験では各原則の定義と違反例が問われる。
-->

---

# AWS 責任ある AI フレームワーク

![w:900 center](assets/slide63-aws-rai-framework.svg)

<!--
AWSは責任あるAI実装のための包括的なフレームワークを提供。SageMaker Clarify（バイアス検出・説明可能性）、Bedrock Guardrails（コンテンツフィルタリング・PII保護）、Model Cards（モデル情報の文書化）、AI Service Cards（各サービスの倫理情報）。AWS Trusted AIプログラムでサードパーティ認証も支援。
-->

---

# Bedrock Guardrails 詳細設定

![w:900 center](assets/slide64-guardrails-detail.svg)

<!--
Guardrailsの設定項目: ①コンテンツフィルタ（暴力/ヘイト/性的/有害コンテンツの強度設定: None/Low/Medium/High） ②禁止トピック（特定のビジネスドメイン外の話題をブロック） ③Word Filters（特定単語・フレーズをブロック） ④PIIレダクション（検出・マスク・ブロック） ⑤Grounding Check（ソース文書との整合性検証） ⑥Prompt Attack（インジェクション検出）。
-->

---

# PII データ保護とマスキング

![w:900 center](assets/slide65-pii-protection.svg)

<!--
PII（Personally Identifiable Information）= 個人を特定できる情報。Bedrock GuardrailsのPIIフィルタが検出: 氏名、メールアドレス、電話番号、クレジットカード番号、SSN、住所等。3つのアクション: BLOCK（リクエスト拒否）、MASK（***でマスク）、ANONYMIZE（仮名に置換）。Amazon Comprehendを組み合わせてLambdaで独自実装も可能。
-->

---

# AI バイアス：種類と対策

![w:900 center](assets/slide65-ai-bias.svg)

<!--
AIバイアスの種類: データバイアス（訓練データの偏り）、アルゴリズムバイアス（モデル構造の偏り）、測定バイアス（評価指標の不公平）、サンプリングバイアス（代表性のない訓練データ）、確認バイアス（期待する結果に合わせた評価）。対策: SageMaker Clarify（バイアス検出・モニタリング）、多様なデータ収集、公平性指標の設定（Equal Opportunity, Demographic Parity）。
-->

---

# モデル透明性・説明可能性（XAI）

![w:900 center](assets/slide66-explainability.svg)

<!--
説明可能なAI（XAI）の主要手法: SHAP（各特徴量の貢献度を計算）、LIME（局所的な線形モデルで近似）、Attention Visualization（Transformerの注目箇所を可視化）。SageMaker Clarify: SHAP値を自動計算してモデル解釈を支援。Bedrock Model Evaluation: 評価結果をダッシュボードで可視化。試験では「医療・法律などハイリスク領域では説明可能性が必須」という観点が問われる。
-->

---

# ガバナンスとコンプライアンス

![w:900 center](assets/slide67-governance.svg)

<!--
AI ガバナンスの構成要素: ポリシー（使用ガイドライン・倫理指針）、プロセス（開発・デプロイ・監視のフロー）、人材（責任者・レビュー体制）、技術（Guardrails・監視ツール）。AWS AI Service Cards: 各サービスの用途・制限・性能特性を文書化。モデルカード: カスタムモデルの情報を標準形式で記録。GDPR・CCPA等への対応にはBedrockのデータ主権（リージョン固定）が重要。
-->

---

# Amazon SageMaker Clarify

![w:900 center](assets/slide68-clarify.svg)

<!--
SageMaker Clarify の機能: バイアス検出（学習前・学習後の統計的バイアス測定）、説明可能性（SHAP値でFeature importance計算）、モデル監視（本番データのバイアスドリフト検出）。バイアス指標: Class Imbalance, Difference in Positive Proportions, Disparate Impact等。Clarify Processingjobで大規模データをバッチ分析。BedrockとSageMakerは補完的: Bedrock=FMのGovernance、Clarify=カスタムMLのGovernance。
-->

---

<!-- _class: lead -->
# Domain 7: LLMOps

- モデルの本番運用・監視・継続改善のベストプラクティス

<!--
Domain 7は試験の約10%。LLMOps = MLOpsをLLM向けに拡張した概念。CI/CD、モデル監視、バージョン管理、コスト最適化が頻出。従来MLOpsとの違いはプロンプトエンジニアリングの管理、ハルシネーションの監視、FMのバージョン管理などLLM特有の課題が加わる点。
-->

---

# LLMOps 概要：MLOps との違い

![w:900 center](assets/slide71-llmops-overview.svg)

<!--
MLOps: データ準備→学習→評価→デプロイ→監視のサイクル。LLMOps: FMを前提に+プロンプト管理+RAGパイプライン+ハルシネーション監視+Fine-tuning管理+マルチモデル管理が追加。主要ツール: MLflow（実験管理）、Bedrock Prompt Management（プロンプトバージョン管理）、SageMaker Model Registry（モデル登録）、CloudWatch（監視）、CodePipeline（CI/CD）。
-->

---

# モデル監視指標

![w:900 center](assets/slide72-model-monitoring.svg)

<!--
本番LLMの監視指標: ①品質指標（Faithfulness, Answer Relevancy, ハルシネーション率）②性能指標（レイテンシp50/p95/p99、スループット、エラー率）③コスト指標（入力/出力トークン数、コスト/リクエスト）④利用指標（リクエスト数、ユーザー満足度スコア）。Amazon CloudWatchにカスタムメトリクスとして送信。Bedrock Model Invocation Loggingで全ログ収集。
-->

---

# A/B テスト・カナリアデプロイ

![w:900 center](assets/slide73-ab-testing.svg)

<!--
LLM A/Bテスト: モデルA（例: Claude 3.5 Sonnet）vs モデルB（例: Claude 3 Haiku）を同じリクエストに対して評価。AWS実装: Lambda@Edge + CloudFront でリクエストを振り分け、またはAmazon API Gatewayのカナリアデプロイ機能。カナリアリリース: 新モデル/プロンプトに5%→20%→100%と段階的に移行。Bedrock: モデルIDを変更するだけでモデル切り替え可能。
-->

---

# MLflow・実験管理

![w:900 center](assets/slide74-mlflow.svg)

<!--
MLflow = OSS実験管理フレームワーク。主要機能: Tracking（実験パラメータ・メトリクス・アーティファクトを記録）、Projects（再現可能な実験パッケージ化）、Models（モデルパッケージ化・バージョン管理）、Registry（本番モデルの中央管理）。SageMaker MLflow: AWSマネージドMLflowサーバー。LLMの場合: プロンプト、モデルID、推論パラメータ、評価スコアをtrackingに記録。
-->

---

# CI/CD for LLM（MLOps パイプライン）

![w:900 center](assets/slide75-cicd-llm.svg)

<!--
LLM CI/CDパイプライン: ①プロンプト変更のPR → Bedrock Model Evaluationで自動評価 → 品質基準クリアでマージ。②カスタムモデル: データ更新→Fine-tuningジョブ→Model Evaluation→Provisioned Throughput更新。AWS実装: CodePipeline + CodeBuild + Bedrock Model Evaluation。RAGパイプライン: S3にドキュメント追加→KB自動Sync→評価→承認。
-->

---

# CloudWatch によるモニタリング実装

![w:900 center](assets/slide76-cloudwatch-monitoring.svg)

<!--
Bedrock CloudWatch統合: 自動収集メトリクス = Invocations, InvocationLatency, InvocationThrottles, InvocationErrors, OutputTokenCount, InputTokenCount。カスタムメトリクス: Lambda内でput_metric_data で品質スコアを送信。Bedrock Model Invocation Logging: CloudWatch Logsに全リクエスト/レスポンスを記録（オプト・イン）。Dashboards: レイテンシ・コスト・エラー率を可視化。Alarms: p99レイテンシ閾値超過でSNS通知。
-->

---

# コスト最適化戦略まとめ

![w:900 center](assets/slide77-cost-optimization.svg)

<!--
LLMコスト削減の7つのアプローチ: ①適切なモデル選択（小さいモデルで十分なタスクはHaiku/Microを使う）②プロンプト最適化（トークン数削減）③Prompt Caching（繰り返しプロンプトのキャッシュ）④Batch Inference（50%割引の非同期処理）⑤Provisioned Throughput（大量利用時の固定コスト）⑥RAG（知識をFine-tuningでなくDBに保持）⑦モデル蒸留（大モデルで小モデルを学習）。
-->

---

# 試験対策まとめ：頻出サービス対応表

![w:900 center](assets/slide78-exam-summary.svg)

<!--
試験のパターン: 「〇〇を実現するAWSサービスは？」という形式が多い。最重要: Bedrock（FM利用・KB・Agents・Guardrails）、SageMaker（カスタムML・Clarify・Feature Store）。選択肢の絞り方: マネージド→Bedrock系 / カスタムML→SageMaker系 / データ→S3+Glue / 監視→CloudWatch / セキュリティ→IAM+KMS+Guardrails。
-->

---

# 重要概念クイックリファレンス

- **RAG**: 外部DB参照でLLMの知識を拡張 → Bedrock Knowledge Bases
- **Fine-tuning**: スタイル・フォーマット適応 → Claude 3 Haiku / Titan Text
- **Continued Pre-training**: ドメイン知識注入 → Titan / Llama
- **Guardrails**: 入出力フィルタ・PII・有害コンテンツ制御
- **Prompt Caching**: 繰り返しプロンプトのコスト削減
- **Batch Inference**: 非同期大量処理（50%割引）
- **Provisioned Throughput**: 固定スループット本番環境
- **ReAct Pattern**: Thought→Action→Observation エージェントループ
- **HNSW**: OpenSearch KNN検索アルゴリズム
- **Faithfulness**: RAG回答がソース文書に根拠を持つか

<!--
試験直前の最終確認用チートシート。各概念の定義と対応するAWSサービス/機能を暗記する。特に混同しやすいFine-tuning vs CPT vs RAGの使い分けは毎回出題される。
-->

---

# 参考リソース・学習リソース

- **AWS公式試験ガイド**
- [AWS Certified AI Practitioner 試験ガイド](https://aws.amazon.com/jp/certification/certified-ai-practitioner/)
- **AWS公式ドキュメント**
- [Amazon Bedrock ユーザーガイド](https://docs.aws.amazon.com/bedrock/latest/userguide/)
- [Amazon SageMaker ドキュメント](https://docs.aws.amazon.com/sagemaker/latest/dg/)
- **学習教材**
- [AWS Skill Builder - Generative AI Learning Plan](https://explore.skillbuilder.aws/)
- [AWS Well-Architected Framework - Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/)
- **ハンズオン**
- [Bedrock Workshop (GitHub)](https://github.com/aws-samples/amazon-bedrock-workshop)

<!--
試験準備には公式の試験ガイドに記載されたドメインとウェイトを確認した上で学習計画を立てる。AWS Skill Builderの公式コースは試験に直結した内容が多い。ハンズオンで実際にBedrockを操作することで記憶が定着する。
-->
