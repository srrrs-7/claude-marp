---
marp: true
theme: gaia
size: 16:9
paginate: true
footer: "RAG実装ガイド完全版 2026 | AWS GenAI Developer Pro"
style: |
  section { font-size: 0.80em; }
  section pre code { font-size: 0.58em; line-height: 1.4; }
  table { font-size: 0.66em; border-collapse: collapse; width: 100%; }
  th { background: #1565C0; color: white; padding: 4px 8px; text-align: left; }
  td { padding: 3px 8px; border-bottom: 1px solid #e0e0e0; }
  tr:nth-child(even) td { background: #f0f6ff; }
  section.lead h1 { font-size: 1.4em; }
  section.lead h2 { font-size: 1.1em; color: #fff; }
  h2 { color: #1565C0; }
  h3 { color: #0D47A1; font-size: 0.95em; }
  
---

<!-- _class: lead -->
# RAG実装ガイド完全版

- OpenSearch Serverless · Aurora pgvector · Bedrock Knowledge Base
- AWS Certified Generative AI Developer - Professional 対策
- 2026年版 完全網羅 | 100スライド


---

# 学習ロードマップ

| フェーズ | セクション | 重点度 | 試験比率目安 |
|---------|-----------|--------|------------|
| ① | RAG基礎（概念・アーキテクチャ） | ★★★ | ~10% |
| ② | Bedrock Knowledge Base | ★★★★★ | ~25% |
| ③ | Amazon OpenSearch Serverless | ★★★★ | ~15% |
| ④ | Aurora PostgreSQL + pgvector | ★★★ | ~10% |
| ⑤ | その他ベクトルDB比較 | ★★ | ~5% |
| ⑥ | RAG設計パターン・Advanced RAG | ★★★★ | ~20% |
| ⑦ | セキュリティ・コスト最適化 | ★★★ | ~15% |


---

# 試験出題マップ（Domain 3: FM活用 30%）

| 出題テーマ | 頻出キーワード | 難易度 |
|-----------|-------------|--------|
| RAGアーキテクチャ | Pipeline, Chunking, Embedding, Indexing | ★★ |
| Bedrock KB | RetrieveAndGenerate, Reranking, Hybrid Search | ★★★★ |
| ベクトルDB選択 | OpenSearch/pgvector/Pinecone の使い分け | ★★★ |
| エンベディングモデル | Titan Embeddings v2, Cohere Embed, 次元数 | ★★★ |
| チャンキング戦略 | Fixed/Semantic/Hierarchical/Custom | ★★★ |
| Advanced RAG | CRAG, Self-RAG, MultiHop, GraphRAG | ★★★★ |
| セキュリティ | IAM, VPC Endpoint, Guardrails統合 | ★★ |
| コスト最適化 | 次元削減, Serverless, キャッシュ戦略 | ★★★ |


---

<!-- _class: lead -->
# Section 1: RAG基礎

- Retrieval-Augmented Generation の仕組みと設計原則


---

# RAGとは？なぜ必要か

- **RAG (Retrieval-Augmented Generation)** = 外部知識検索 + 生成AIの組み合わせ
| 課題 | RAGによる解決策 |
|------|--------------|
| FMの知識カットオフ | 外部DBから最新データをリアルタイム検索 |
| ハルシネーション | 根拠（ソースチャンク）付き回答で事実確認可能 |
| ドメイン知識不足 | 社内文書・専門DBを参照して特化回答 |
| Fine-tuningコスト | 再学習不要で知識更新・低コスト |
| コンテキスト長上限 | 必要な情報だけ抽出してプロンプトに注入 |
- **RAGの3ステップ:** ① Indexing（インデックス作成） → ② Retrieval（検索） → ③ Generation（生成）


---

# RAGアーキテクチャ全体像

- **インジェスト（Indexing）パイプライン:**
- ソースデータ（S3等）→ 前処理・OCR → チャンキング → エンベディング → ベクトルDB格納
- **クエリ（Runtime）パイプライン:**
- ユーザー質問 → クエリエンベディング → ベクトル検索 → Top-k取得 → コンテキスト挿入 → LLM生成 → 回答
| コンポーネント | AWSサービス例 |
|--------------|-------------|
| ソースデータ | S3, Confluence, SharePoint, Web Crawler |
| 前処理・OCR | Amazon Textract |
| エンベディング | Titan Embeddings v2, Cohere Embed |
| ベクトルDB | OpenSearch Serverless, pgvector, Pinecone |
| オーケストレーション | Bedrock Knowledge Base / Agents |
| LLM生成 | Claude 3.x, Titan Text, Llama 3 |


---

# RAG vs Fine-tuning vs In-Context Learning

| 比較軸 | RAG | Fine-tuning | In-Context Learning |
|-------|-----|------------|---------------------|
| 知識更新 | リアルタイム | 再学習必要 | プロンプト内のみ |
| コスト | 中 | 高 | 低 |
| 精度 | 高（最新情報） | 高（ドメイン特化） | 低〜中 |
| レイテンシ | 中（検索オーバーヘッド） | 低 | 低 |
| ハルシネーション | 低（ソース参照） | 中 | 高 |
| 最大知識量 | 無制限（DB容量次第） | 学習時固定 | コンテキスト長上限 |
| 適用場面 | 最新情報・社内文書 | スタイル・タスク特化 | 数例のタスク示教 |
- **試験頻出:** 「最新データが必要→RAG」「文体・スタイル変更→FT」「数例でタスク指定→ICL」


---

# エンベディング（Embedding）基礎

| モデル | Provider | 次元数 | 最大入力 | 特徴 |
|-------|---------|--------|---------|------|
| Titan Embeddings Text v2 | Amazon | 256/512/1024 | 8,192 tok | 可変次元・AWS最適化 |
| Titan Embeddings Text v1 | Amazon | 1,536 | 8,192 tok | 旧世代・後方互換 |
| Cohere Embed English v3 | Cohere | 1,024 | 512 tok | 英語特化・高精度 |
| Cohere Embed Multilingual v3 | Cohere | 1,024 | 512 tok | 多言語100+対応 |
- **重要ポイント:**
- インジェスト時とクエリ時は必ず同一モデルを使用すること
- 次元数が多い → 精度↑・ストレージ↑・コスト↑
- Titan v2は次元数を選択可能（256次元でコスト削減）
- ⚠️ モデルを後から変更する場合は全ベクトルを再生成する必要あり


---

# チャンキング戦略

| 戦略 | 説明 | 最適ユースケース |
|------|------|----------------|
| Fixed-size | 固定トークン数で分割（オーバーラップあり） | 汎用テキスト・初期実装 |
| Default | 300トークン固定（Bedrock KBのデフォルト） | 手軽に試したい場合 |
| Semantic | 意味の区切り（文・段落）で分割 | 構造化文書・論文 |
| Hierarchical | 親チャンク+子チャンク（要約+詳細） | 長文ドキュメント |
| Custom（Lambda） | Lambda関数で独自ロジック | 非構造化・特殊フォーマット |
| None | チャンキングなし（1文書=1ベクトル） | 短い文書（FAQ等） |
- **KBのデフォルト設定:** チャンクサイズ300トークン、オーバーラップ20%
- **オーバーラップの役割:** 境界付近の文脈を両チャンクに含め、分断を防ぐ
- **Hierarchical chunking:** 検索は子チャンクで実行→回答は親チャンクのコンテキストで生成


---

# 検索戦略（Semantic / Keyword / Hybrid）

| 戦略 | 仕組み | 強み | 弱み |
|------|--------|------|------|
| Semantic（意味検索） | ベクトル類似度（ANN） | 同義語・意味的近傍を発見 | 固有名詞・完全一致に弱い |
| Keyword（BM25） | TF-IDF系スコアリング | 固有名詞・コード完全一致 | 同義語・文脈に弱い |
| Hybrid | Semantic + Keyword 統合 | 両方の長所を活かす | 重み調整が必要 |
| Reranking | LLMで再スコアリング | 関連性精度↑↑ | レイテンシ・コスト↑ |
- **Bedrock KB での設定:**
- searchType: SEMANTIC（デフォルト）または HYBRID
- HYBRID = ベクトル検索 + BM25 の両結果を統合してスコア正規化
- Reranking: orchestrationConfiguration で Cohere Rerank 1.0 / Amazon Rerank 1.0 指定


---

# 類似度計算手法（距離メトリクス）

| 手法 | 数式 | 値域 | 特徴 |
|------|------|------|------|
| コサイン類似度 | A·B / (|A||B|) | -1〜1 | 方向の類似性。テキスト検索に最適 |
| 内積（Dot Product） | ΣAiBi | -∞〜+∞ | 正規化済みで高速。Titan v2デフォルト |
| L2（ユークリッド）距離 | √(Σ(Ai-Bi)²) | 0〜+∞ | 空間距離。小さいほど類似 |
| マンハッタン距離 | Σ|Ai-Bi| | 0〜+∞ | 高次元でコサインより安定 |
- **pgvector の演算子:**
- <=> : コサイン距離（1-cosine）最小が最類似
- <-> : ユークリッド距離（L2）最小が最類似
- <#> : 内積（負値）最小が最類似
- **試験頻出:** テキスト検索 → コサイン類似度。正規化済みなら内積≒コサイン


---

# RAG評価指標（RAGAS フレームワーク）

| 指標 | 説明 | 測定対象 |
|------|------|---------|
| Faithfulness（忠実性） | 回答がコンテキストに基づいているか | ハルシネーション検出 |
| Answer Relevance | 回答が質問に適切に答えているか | 回答品質 |
| Context Precision | 取得チャンクのうち関連性のある割合 | 検索精度（Precision） |
| Context Recall | 必要情報の取得漏れがないか | 検索再現率（Recall） |
| Answer Correctness | 正解ラベルとの一致度 | エンドツーエンド精度 |
- **AWS サービスでの評価:**
- Bedrock Model Evaluation: RAGパイプライン全体をLLMジャッジで自動評価
- SageMaker Clarify: バイアス検出・説明可能性の追加評価
- **改善サイクル:** 評価指標を測定 → チャンキング/検索k/閾値を調整 → 再評価


---

# RAGパイプライン全工程チェックリスト

| フェーズ | ステップ | 主要考慮点 |
|---------|---------|-----------|
| インジェスト① | データ収集（S3, Confluence等） | アクセス権限・データ品質 |
| インジェスト② | 前処理・OCR（PDF→テキスト） | Amazon Textract活用 |
| インジェスト③ | チャンキング | 戦略選択・サイズ・オーバーラップ |
| インジェスト④ | エンベディング生成 | モデル選択・コスト試算 |
| インジェスト⑤ | ベクトルDB格納 | インデックス設計・メタデータ付与 |
| クエリ① | クエリ変換（HyDE/Rewriting） | 精度向上テクニック |
| クエリ② | ベクトル検索（Retrieve） | Top-k・スコア閾値設定 |
| クエリ③ | リランキング（オプション） | 精度 vs レイテンシのトレードオフ |
| クエリ④ | プロンプト構築 | コンテキスト挿入・プロンプトテンプレート |
| クエリ⑤ | LLM生成（Generate） | 温度・最大トークン・Guardrails |


---

<!-- _class: lead -->
# Section 2: Amazon Bedrock Knowledge Base

- フルマネージドRAG — データソース連携からRetrieverまで一元管理


---

# Amazon Bedrock Knowledge Base — 概要・特徴

- **フルマネージドRASサービス** — インフラ管理不要でRAGを即時実装
| 機能カテゴリ | 提供内容 |
|------------|---------|
| データソース | S3, Web Crawler, Confluence, SharePoint, Salesforce, ServiceNow |
| ベクトルDB | OpenSearch Serverless, pgvector, DocumentDB, MemoryDB, Pinecone等 |
| エンベディングモデル | Titan v1/v2（可変次元）, Cohere Embed（英語/多言語） |
| 検索API | Retrieve（検索のみ）/ RetrieveAndGenerate（検索+生成） |
| 同期方式 | 手動 / EventBridgeスケジュール / S3イベント駆動 |
| セキュリティ | KMS暗号化, VPCエンドポイント, IAMロール |
- Agents との統合でマルチステップ推論・アクション実行も可能
- Guardrails統合でコンテンツフィルタリングをRAGに適用


---

# KB対応データソース一覧

| データソース | 対応フォーマット | 認証方式 |
|------------|----------------|---------|
| Amazon S3 | PDF, TXT, HTML, DOC, DOCX, CSV, XLS, JSON, MD | IAMロール |
| Web Crawler | HTML（URL指定・シードURL） | なし / Basic認証 |
| Confluence | ページ・スペース | OAuth 2.0 |
| Microsoft SharePoint | ドキュメントライブラリ・サイト | OAuth 2.0 (Entra ID) |
| Salesforce | オブジェクト・レコード | OAuth 2.0 |
| ServiceNow | 記事・インシデント | OAuth 2.0 |
- **S3が試験の中心:**
- KBのIAMロール → S3バケットへのs3:GetObject権限が必要
- 暗号化: SSE-S3 / SSE-KMS 対応（KMSキーへのkms:Decrypt権限も必要）
- **OCR:** PDF画像内テキストはTextractで前処理→S3保存→KB取り込み


---

# KB対応ベクトルDB一覧

| ベクトルDB | 種別 | 特徴 | 最適ユースケース |
|----------|------|------|----------------|
| Amazon OpenSearch Serverless | AWS管理 | スケーラブル・Hybrid検索・全文検索 | 大規模・検索機能豊富 |
| Amazon Aurora pgvector | AWS管理 | RDB+ベクトル統合・SQL利用可 | 既存RDS活用・トランザクション |
| Amazon DocumentDB | AWS管理 | MongoDB互換・ドキュメント+ベクトル | NoSQL+ベクトル統合 |
| Amazon Neptune Analytics | AWS管理 | グラフ+ベクトル・知識グラフ | GraphRAG |
| Amazon MemoryDB for Redis | AWS管理 | インメモリ・超低レイテンシ | リアルタイム・高速検索 |
| Pinecone | サードパーティ | ベクトル特化マネージド | ベクトル専用・シンプル |
| Redis Enterprise Cloud | サードパーティ | インメモリ+ベクトル | キャッシュ兼用 |
| MongoDB Atlas | サードパーティ | ドキュメント+ベクトル | 既存MongoDB活用 |


---

# KB対応エンベディングモデル

| モデル | Provider | 次元数 | 最大入力 | 特徴 |
|-------|---------|--------|---------|------|
| Titan Embeddings Text v2 | Amazon | 256/512/1024 | 8,192 tok | 可変次元・AWS最適化・コスト低 |
| Titan Embeddings Text v1 | Amazon | 1,536 | 8,192 tok | 旧世代・後方互換 |
| Cohere Embed English v3 | Cohere | 1,024 | 512 tok | 英語特化・高精度 |
| Cohere Embed Multilingual v3 | Cohere | 1,024 | 512 tok | 多言語100+対応・日本語可 |
- **選択基準:**
- 日本語コンテンツ → Titan v2 または Cohere Multilingual
- コスト重視 → Titan v2（256次元でストレージ・検索コスト削減）
- 英語精度重視 → Cohere Embed English v3
- ⚠️ インジェスト時とクエリ時は必ず同一モデルを使用（後変更は全件再生成）


---

# KB設定パラメータ詳細

| パラメータ | 設定値 | 説明 |
|----------|--------|------|
| チャンクサイズ | 20〜8,192 トークン | デフォルト300 |
| チャンクオーバーラップ | 0〜99% | デフォルト20% |
| numberOfResults (k) | 1〜100 | 返却チャンク数。デフォルト5 |
| scoreThreshold | 0〜1.0 | 閾値以下の結果を除外 |
| searchType | SEMANTIC / HYBRID | デフォルトSEMANTIC |
| rerankingModel | Cohere Rerank 1.0 / Amazon Rerank 1.0 | オプション |
| filter | メタデータ条件式 | オプション（事前フィルタリング） |
| promptTemplate | カスタムプロンプト | R&Gでシステムプロンプトをカスタマイズ |
| guardrailId | Guardrails設定 | コンテンツフィルタリング |
| sessionId | セッション識別子 | マルチターン会話の継続 |


---

# KBのチャンキング設定詳細

| チャンキング方式 | 設定項目 | 推奨シナリオ |
|----------------|---------|-------------|
| Default | 300トークン固定・管理簡単 | 初期実装・汎用テキスト |
| Fixed-size | サイズ・オーバーラップをカスタム | 調整が必要な場合 |
| Semantic | バッファサイズ・閾値（breakpoint方式） | 意味単位での分割 |
| Hierarchical | 親チャンクサイズ・子チャンクサイズ | 長文・要約+詳細参照 |
| None | チャンキングなし（1文書=1ベクトル） | 短い文書（FAQ・Q&A） |
| Custom（Lambda） | Lambda ARNを指定 | 独自前処理・特殊フォーマット |
- **Hierarchical chunking の動作:**
- 親チャンク（例: 1,500 tok）に子チャンク（例: 300 tok）が紐づく
- 検索は子チャンクで実行 → LLM生成時は親チャンクのコンテキストで回答


---

# KBのメタデータフィルタリング

- **メタデータ属性でベクトル検索結果を事前フィルタリング（Pre-filter）**
| 演算子 | 使用例 |
|--------|-------|
| equals | {"key": "department", "value": "engineering"} |
| notEquals | {"key": "status", "value": "draft"} |
| greaterThan | {"key": "year", "value": 2024} |
| lessThanOrEquals | {"key": "version", "value": 3} |
| in | {"key": "category", "value": ["aws","cloud"]} |
| listContains | {"key": "tags", "value": "security"} |
| startsWith | {"key": "filename", "value": "report_"} |
| andAll / orAll | 複数条件の AND / OR 組み合わせ |
- **S3メタデータの設定:** doc.pdf → doc.pdf.metadata.json を同S3パスに配置


---

# KBのデータ同期・インジェスト

| 同期方式 | トリガー | ユースケース |
|---------|---------|-------------|
| 手動同期 | Console / StartIngestionJob API | 初期ロード・スポット更新 |
| スケジュール同期 | EventBridge Scheduler | 定期バッチ更新（日次・週次） |
| イベント駆動 | S3イベント → Lambda → StartIngestionJob | リアルタイム更新 |
- **インジェストジョブのステータス:**
| ステータス | 説明 |
|----------|------|
| STARTING | ジョブ開始中 |
| IN_PROGRESS | 処理中（チャンキング・エンベディング） |
| COMPLETE | 完了 |
| FAILED | 失敗（CloudWatch Logsでエラー確認） |
- **増分同期:** 変更ファイルのみ再処理（全件より高速）
- **削除同期:** ソースから削除されたドキュメントはKBからも削除


---

# Retrieve API — 検索のみ（LLM生成なし）

- **用途:** 独自プロンプト組み立て / 複数KB検索の統合 / 結果フィルタ後処理
| レスポンス項目 | 説明 |
|-------------|------|
| content.text | チャンクテキスト本文 |
| location.s3Location.uri | ソースS3 URI（引用元） |
| score | 類似度スコア（0〜1） |
| metadata | カスタムメタデータ |
- Top-k件の retrieval_results リストで返却
- scoreThreshold 指定で低スコア結果を除外可能
- filter パラメータでメタデータ条件を追加

```python
response = bedrock_agent_runtime.retrieve(
    knowledgeBaseId='KB_ID',
    retrievalQuery={'text': 'クエリテキスト'},
    retrievalConfiguration={
        'vectorSearchConfiguration': {
            'numberOfResults': 5,
            'searchType': 'HYBRID',
            'filter': {
                'equals': {'key': 'dept', 'value': 'eng'}
            }
        }
    }
)
```


---

# RetrieveAndGenerate API — 検索+LLM生成

- **用途:** エンドツーエンドRAG。検索・プロンプト構築・LLM生成を一括実行
| 設定項目 | 説明 |
|---------|------|
| modelArn | 生成に使うFMのARN（Claude, Titan等） |
| retrievalConfiguration | Retrieve APIと同様の検索設定 |
| generationConfiguration | プロンプトテンプレート・温度・最大トークン |
| guardrailConfiguration | GuardrailsのIDとバージョン |
| sessionId | マルチターン会話のセッションID |
| orchestrationConfiguration | リランキングモデル指定 |
- レスポンス: output.text（生成回答）+ citations（引用元リスト）
- citations: retrievedReferences（ソースチャンク+URI+メタデータ）が含まれる

```python
response = bedrock_agent_runtime.retrieve_and_generate(
    input={'text': 'AWSの料金体系は？'},
    retrieveAndGenerateConfiguration={
        'type': 'KNOWLEDGE_BASE',
        'knowledgeBaseConfiguration': {
            'knowledgeBaseId': 'KB_ID',
            'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet',
            'retrievalConfiguration': {
                'vectorSearchConfiguration': {
                    'numberOfResults': 5,
                    'searchType': 'HYBRID'
                }
            }
        }
    }
)
```


---

# Retrieve vs RetrieveAndGenerate 比較

| 比較軸 | Retrieve | RetrieveAndGenerate |
|-------|---------|---------------------|
| LLM呼び出し | なし | あり（FM推論コスト発生） |
| コスト | 低（検索のみ） | 高（検索＋FM推論トークン） |
| レイテンシ | 低 | 高 |
| 柔軟性 | 高（独自プロンプト・後処理自由） | 低（定型フロー） |
| 複数KB統合 | 容易（並列Retrieve→統合） | 困難 |
| 引用情報 | スコア付きチャンク | citations（ソースURI付き） |
| マルチターン | 非対応 | sessionIdで会話継続 |
| Guardrails | 別途実装 | ネイティブ統合 |
- **選択基準:**
- 「カスタム生成・複数KB統合・後処理が必要」→ Retrieve API
- 「RAGをすぐ使いたい・シンプル実装」→ RetrieveAndGenerate API


---

# KBとBedrock Agentsの統合

- **Agents + KB = マルチステップ推論 + 外部知識参照の組み合わせ**
| 統合方式 | 説明 |
|---------|------|
| KB as Knowledge Base | AgentがKBを知識ソースとして自動参照 |
| Action Group + KB | AgentがKB検索結果を元にツール呼び出し実行 |
| Inline KB | Agent実行時に動的にKBを指定（Inline Agent） |
- **AgentがKBを参照するフロー:**
- ユーザー入力 → Agent推論 → KB Retrieve → コンテキスト取得 → Action実行 → 最終回答
- **設定ポイント:**
- KnowledgeBases配列でKB IDと使用指示（instructions）を指定
- Guardrails はAgent側で設定（KB側の設定と統合可能）
- **ユースケース例:** 社内FAQ検索 + 外部API呼び出しを1つのAgentで処理


---

# KBのハイブリッド検索

- **HYBRID = ベクトル検索（Semantic）+ キーワード検索（BM25）の統合**
| 設定値 | 説明 | 適用場面 |
|-------|------|---------|
| SEMANTIC（デフォルト） | ベクトル類似度のみ | 意味検索・一般質問 |
| HYBRID | Semantic + BM25 統合 | 固有名詞・コード・型番混在 |
- **ハイブリッド検索の動作:**
- ① ベクトル検索で Top-k 件取得 → ② BM25でキーワード検索 → ③ スコア正規化（Min-Max）→ ④ 統合ランキング
- **ハイブリッドが有効な場面:**
- 製品コード・型番・固有名詞を含む検索
- 技術ドキュメント・API仕様書の検索
- ⚠️ HYBRID は OpenSearch Serverless をベクトルDBとして使用する場合のみサポート


---

# KBのReranking（再スコアリング）

- **Rerankingとは:** 最初の検索結果（Top-k）をLLMで再評価して順序を最適化
| Rerankingモデル | Provider | 特徴 |
|---------------|---------|------|
| Amazon Rerank 1.0 | Amazon | AWS最適化・低コスト |
| Cohere Rerank 1.0 | Cohere | 高精度・多言語対応 |
- **Rerankingの流れ:**
- Retrieve（Top-20等） → Rerankingモデルで関連度再評価 → 上位5件でLLM生成
- **設定（RetrieveAndGenerate）:**
- orchestrationConfiguration.queryTransformationConfiguration に rerankingModel を指定
- **メリット / デメリット:**
- 精度大幅向上（特に長文・複雑な質問）
- レイテンシ増加・Rerankingモデルのコスト増


---

# KBとGuardrails統合

- **Guardrails = RAGパイプライン全体にコンテンツフィルタリングを適用**
| フィルター種別 | 機能 |
|-------------|------|
| コンテンツフィルター | 有害コンテンツ（暴力・ヘイト・性的）の検出・ブロック |
| 拒否トピック | 特定トピック（競合比較・法的アドバイス等）を禁止 |
| PIIフィルター | 個人情報（氏名・住所・SSN等）のマスキング |
| グラウンディング | 回答がコンテキストに基づいているか検証（RAG専用） |
| 有害言語フィルター | プロファニティ・差別的表現のフィルタリング |
- **グラウンディングチェック（RAG固有機能）:**
- 回答がKBから取得したコンテキストに基づいているかをスコアリング
- 閾値を下回ると回答をブロックまたは警告メッセージを返却
- **設定:** RetrieveAndGenerateのguardrailConfigurationにguardrailId/Versionを指定


---

# KBのモニタリング（CloudWatch）

| メトリクス | 説明 | アラート推奨 |
|----------|------|------------|
| IngestionJobStatus | インジェストジョブ成否 | FAILED時 |
| KnowledgeBaseQueryLatency | Retrieve APIレイテンシ | p99 > 3秒 |
| KnowledgeBaseQueryCount | Retrieve呼び出し数 | 急増時 |
| KnowledgeBaseRetrieveAndGenerateLatency | R&G全体レイテンシ | p99 > 10秒 |
| ModelInvocationThrottles | FMスロットリング | > 0 |
- **CloudWatch Logs の設定:**
- IngestionJobのエラー詳細: /aws/bedrock/knowledge-bases/ingestion
- Retrieve/R&G呼び出しログ: /aws/bedrock/knowledge-bases/retrieval
- **CloudTrail:** StartIngestionJob / Retrieve / RetrieveAndGenerate の全呼び出しを記録


---

# KBのIAMポリシー設計

- **KBアクセス制御の3レイヤー:**
- ① アプリ → Bedrock KB API（bedrock:Retrieve/RetrieveAndGenerate権限）
- ② KB → S3データソース（s3:GetObject/ListBucket権限）
- ③ KB → ベクトルDB（OpenSearch aoss:APIAccessAll / RDS接続権限）
| Bedrock KBの主要IAMアクション | 用途 |
|------------------------------|------|
| bedrock:Retrieve | Retrieve API呼び出し |
| bedrock:RetrieveAndGenerate | R&G API呼び出し |
| bedrock:StartIngestionJob | データ同期開始 |
| bedrock:GetIngestionJob | ジョブ状態確認 |
| bedrock:CreateKnowledgeBase | KB作成 |

```json
# KBへのRetrieve権限ポリシー例
{
  "Effect": "Allow",
  "Action": [
    "bedrock:Retrieve",
    "bedrock:RetrieveAndGenerate"
  ],
  "Resource": "arn:aws:bedrock:us-east-1:123456789:knowledge-base/KB_ID"
}
```


---

# KBのVPCエンドポイント設定

- **VPCエンドポイント利用でインターネット経由を回避（セキュリティ強化）**
| エンドポイント | サービス | 用途 |
|-------------|---------|------|
| bedrock（Interface） | Bedrock KB API | Retrieve/R&G API呼び出し |
| bedrock-runtime | Bedrock Runtime | FM推論 |
| s3（Gateway） | S3 | データソースアクセス |
| aoss（Interface） | OpenSearch Serverless | ベクトルDB接続 |
- **設定手順:**
- VPC → エンドポイント作成 → サービス名選択 → サブネット・セキュリティグループ指定
- **セキュリティグループ:** HTTPS(443)のインバウンドをVPC CIDRから許可
- **エンドポイントポリシー:** 特定のKB ARNへのアクセスのみ許可で最小権限


---

# KBのコスト最適化

| コスト要因 | 最適化策 |
|----------|---------|
| エンベディング生成 | Titan v2の低次元（256）使用でトークンコスト削減 |
| ベクトルDB（OpenSearch） | Serverlessのインデックス量を最小化 |
| Retrieve API | scoreThresholdで不要な結果を除外 |
| R&G API | numberOfResultsを必要最小限に（5→3等） |
| FM推論 | 最大トークン制限・安価なモデルを選択 |
| インジェスト | 増分同期で全件再処理を回避 |
| Reranking | 必要な場合のみ有効化 |
- **コスト見積もりの3要素:**
- ① エンベディングコスト（インジェスト時・クエリ時）
- ② ベクトルDB保存・検索コスト（OpenSearch OCU等）
- ③ FM推論コスト（RetrieveAndGenerate使用時のみ）


---

# KBの制限・クォータ（試験頻出数値）

| 制限項目 | デフォルト値 | 備考 |
|---------|------------|------|
| KB数 / アカウント | 5 | Service Quotaで引き上げ可 |
| データソース数 / KB | 10 | |
| チャンクサイズ最大 | 8,192 トークン | |
| numberOfResults 最大 | 100 | |
| S3ファイルサイズ上限 | 50 MB / ファイル | |
| S3総ファイル数上限 | 50,000 件 / データソース | |
| インジェスト同時実行 | 1 ジョブ / KB | |
| メタデータ属性数 | 10 / ドキュメント | |
| セッション保持期間（R&G） | 1 時間（SessionId有効期限） | |
- **OpenSearch Serverless 連携時:**
- コレクション数上限: 50 / アカウント（デフォルト）


---

# KBのトラブルシューティング

| 症状 | 原因 | 対処法 |
|------|------|--------|
| インジェストFAILED | S3権限不足 | KB IAMロールにs3:GetObject追加 |
| KMS暗号化エラー | kms:Decrypt権限なし | IAMにkms:Decrypt追加 |
| 検索結果が少ない | scoreThresholdが高すぎ | 閾値を下げる（0.5→0.3） |
| 回答がコンテキスト外 | Guardrailsブロック | グラウンディング閾値確認 |
| レイテンシが高い | numberOfResultsが多い / Reranking有効 | kを削減・Rerankingオフ |
| 古い情報が返却 | 同期未実行 | StartIngestionJobで再同期 |
| メタデータフィルタが効かない | .metadata.json未配置 | 同S3パスに配置確認 |
| 多言語検索精度低い | 英語モデル使用 | Cohere Multilingualに変更 |


---

# Bedrock KB 試験ポイントまとめ

- ✅ Retrieve API = 検索のみ（LLM不要）。カスタム後処理に最適
- ✅ RetrieveAndGenerate = エンドツーエンドRAG。citations付き回答
- ✅ HYBRID検索はOpenSearch Serverlessのみサポート
- ✅ Rerankingでk増やして再絞り込み → 精度向上・レイテンシ増
- ✅ Hierarchical chunking: 検索=子チャンク、生成=親チャンクコンテキスト
- ✅ メタデータフィルタは .metadata.json ファイルで設定（S3の場合）
- ✅ 増分同期で変更分のみ再処理（全件再処理は避ける）
- ✅ GuardrailsのグラウンディングチェックはRAG専用機能
- ❌ NG: FinetuningとRAGの混同（知識更新はRAG、スタイル変更はFT）
- ❌ NG: エンベディングモデルをインジェストとクエリで別々に使う


---

<!-- _class: lead -->
# Section 3: Amazon OpenSearch Serverless

- k-NN ベクトル検索 + BM25 ハイブリッド検索のフルマネージドサービス


---

# Amazon OpenSearch Service 概要

- **OpenSearch Service** = Elasticsearch互換のフルテキスト検索・分析エンジン（AWS管理）
| 種別 | 説明 | 管理 |
|------|------|------|
| OpenSearch Service（Provisioned） | クラスター管理・スケーリング手動 | ユーザー管理 |
| OpenSearch Serverless | サーバーレス・自動スケール | フルマネージド |
- **Bedrock KBのデフォルトベクトルDB = OpenSearch Serverless**
| 共通機能 | 説明 |
|---------|------|
| フルテキスト検索（BM25） | テキスト全文検索・アナライザー設定可能 |
| k-NN ベクトル検索 | 近似最近傍（ANN）検索 |
| ハイブリッド検索 | BM25 + kNN スコア統合 |
| OpenSearch Dashboards | 可視化・監視UI |


---

# OpenSearch Serverless とは

- **サーバーレスOpenSearch** — キャパシティ管理不要・リクエストに応じて自動スケール
| 特徴 | 説明 |
|------|------|
| サーバーレス | クラスター・ノード管理不要 |
| 自動スケール | 負荷に応じてOCU（OpenSearch Compute Unit）が自動増減 |
| コレクション単位 | インデックスをコレクションにグループ化 |
| 最小構成 | 0.5 OCU（アイドル時も最小コスト発生） |
- **コレクションタイプ:**
| タイプ | 用途 |
|-------|------|
| Search | 全文検索・ベクトル検索（Bedrock KB用） |
| Time Series | ログ・時系列データ分析 |
| VectorSearch | ベクトル検索専用（低コスト） |
- **Bedrock KB統合:** コレクションタイプ = VectorSearch を使用


---

# OpenSearch Service vs OpenSearch Serverless 比較

| 比較軸 | OpenSearch Service（Provisioned） | OpenSearch Serverless |
|-------|----------------------------------|----------------------|
| 管理 | クラスター・ノード管理が必要 | フルマネージド |
| スケール | 手動（インスタンスタイプ変更） | 自動（OCU） |
| コスト | インスタンス時間課金 | OCU + ストレージ課金 |
| 最小コスト | インスタンス稼働分 | 0.5 OCU（~$0.24/時） |
| カスタマイズ | 高（プラグイン等） | 低 |
| Bedrock KB統合 | 未対応 | 対応（デフォルト） |
| ハイブリッド検索 | 対応 | 対応 |
| VPC統合 | 対応 | 対応（VPCエンドポイント） |
- **試験ポイント:** Bedrock KBのベクトルDBとして使えるのは OpenSearch **Serverless** のみ


---

# OpenSearch Serverless — コレクション設定

- **コレクション** = インデックスの論理グループ（1コレクション = 1ベクトルDBに相当）
| 設定項目 | 説明 |
|---------|------|
| コレクション名 | 一意の識別子 |
| タイプ | VectorSearch / Search / TimeSeries |
| 暗号化ポリシー | AWS管理キー or カスタムKMSキー |
| ネットワークポリシー | Public / VPCエンドポイント |
| データアクセスポリシー | インデックス・コレクションへのアクセス制御 |
- **インデックス作成時のベクトルフィールド設定:**
- knn_vector タイプ・次元数・類似度メトリクス（cosinesimil / innerproduct / l2）を指定
- エンジン指定: faiss / nmslib / lucene（デフォルトは自動選択）


---

# k-NN（近似最近傍）検索の仕組み

- **ANN（Approximate Nearest Neighbor）** = 完全一致ではなく近似で高速化
| 手法 | 仕組み | 特徴 |
|------|--------|------|
| Exact kNN | 全ベクトルと距離計算 | 精度100%・大規模で遅い |
| HNSW | 階層グラフ構造で近傍探索 | 高精度・高速・メモリ大 |
| IVF | クラスタリングで候補絞り込み | スケーラブル・中精度 |
| Faiss Disk ANN | ベクトルをディスク保存 | 大規模・メモリ節約 |
- **OpenSearch kNN設定パラメータ:**
| パラメータ | 説明 |
|----------|------|
| ef_construction | インデックス構築時の探索幅（大きい→精度↑・遅い） |
| m | グラフの接続数（大きい→精度↑・メモリ↑） |
| ef_search | 検索時の探索幅（大きい→精度↑・遅い） |


---

# OpenSearch ベクトルエンジン比較（Faiss / nmslib / Lucene）

| エンジン | アルゴリズム | 特徴 | 推奨シナリオ |
|--------|------------|------|------------|
| Faiss（Facebook AI） | IVF + HNSW | 大規模・GPU最適化・Disk ANN対応 | 1億件超の大規模 |
| nmslib | HNSW | 高速・メモリ効率良好 | 中〜大規模・デフォルト推奨 |
| Lucene | HNSW | Luceneネイティブ統合 | 小〜中規模・フルテキスト混在 |
- **試験ポイント:**
- 大規模（100万件超） → Faiss（Disk ANNでディスクオフロード）
- バランス型 → nmslib（メモリ効率・速度のバランスが良い）
- 小規模・フルテキスト統合 → Lucene
- **Disk-based ANN（Faiss）:** ベクトルをディスクに保存してメモリ使用量を大幅節約


---

# OpenSearch インデックス設計

- **ベクトルフィールドの設定が検索精度・速度の鍵**
| フィールド設定 | 説明 |
|-------------|------|
| type: knn_vector | ベクトルフィールドの型 |
| dimension | 次元数（エンベディングモデルに合わせる） |
| space_type | cosinesimil / innerproduct / l2 |
| engine | faiss / nmslib / lucene |
| ef_construction | インデックス精度（デフォルト512） |
| m | 隣接ノード数（デフォルト16） |

```json
PUT /my-vector-index
{
  "settings": {"index": {"knn": true}},
  "mappings": {
    "properties": {
      "embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {"ef_construction": 512, "m": 16}
        }
      }
    }
  }
}
```


---

# OpenSearch ハイブリッド検索（BM25 + kNN）

- **ハイブリッドクエリ** = ベクトル検索 + キーワード検索のスコアを統合
| ステップ | 処理 |
|---------|------|
| ① kNN検索 | クエリベクトルで近傍Top-k取得（knnスコア） |
| ② BM25検索 | キーワードでTop-k取得（BM25スコア） |
| ③ スコア正規化 | 両スコアを同一スケールに変換（Min-Max等） |
| ④ スコア統合 | 重み付き加重平均でランキング決定 |
| ⑤ 上位k件返却 | 統合スコアの高い順 |
- **Bedrock KB でのHYBRID設定:** searchType: HYBRID を指定（OpenSearch Serverless限定）
- **重みの調整:** デフォルトはkNN:BM25 = 0.5:0.5（カスタム変更可）
- **試験ポイント:** HYBRID = Semantic + Keyword の統合。固有名詞・コード検索精度が向上


---

# OpenSearch スコア正規化

- **なぜ正規化が必要か:** kNNスコア（0〜1）とBM25スコア（0〜∞）の尺度が異なるため
| 正規化手法 | 計算式 | 特徴 |
|----------|--------|------|
| Min-Max | (x - min) / (max - min) | 0〜1に正規化。外れ値に敏感 |
| Z-score | (x - mean) / std | 外れ値に強い。負値になり得る |
| L2 Norm | x / √(Σx²) | ベクトル正規化。コサイン準拠 |
- **OpenSearch の正規化プロセッサ:**
- norm_processor で normalization_technique を指定（min_max / z_score / l2）
- combination_technique で統合方式（harmonic_mean / geometric_mean / arithmetic_mean）を選択
- **推奨:** Min-Max + Arithmetic Mean（シンプルで効果的）


---

# OpenSearch Serverless セキュリティポリシー（3種）

- **3種類のセキュリティポリシーでアクセス制御を多層構成**
| ポリシー種別 | 制御内容 | 設定対象 |
|-----------|---------|---------|
| 暗号化ポリシー | 保存データ暗号化キー（AWS管理/KMS） | コレクション |
| ネットワークポリシー | Public / VPCエンドポイント接続制限 | コレクション |
| データアクセスポリシー | インデックスCRUD権限（IAMロール/ユーザー別） | インデックス |
- **データアクセスポリシーの主要アクション:**
| アクション | 説明 |
|----------|------|
| aoss:CreateIndex / DeleteIndex | インデックス管理 |
| aoss:ReadDocument / WriteDocument | ドキュメントCRUD |
| aoss:DescribeCollectionItems | コレクション情報参照 |
- **Bedrock KB IAMロール:** aoss:APIAccessAll を付与（または個別アクション）


---

# Bedrock KBとOpenSearch Serverlessの統合

- **統合フロー:** KB作成時にOpenSearch Serverlessコレクションを指定
| 設定項目 | 説明 |
|---------|------|
| コレクションARN | 連携するOpenSearch Serverlessコレクション |
| ベクトルインデックス名 | ベクトルを格納するインデックス名 |
| ベクトルフィールド名 | knn_vectorフィールド名 |
| テキストフィールド名 | チャンクテキストを格納するフィールド名 |
| メタデータフィールド名 | メタデータJSON格納フィールド名 |
- **KBが自動作成するリソース:**
- コレクション・インデックスはKB作成時に自動生成（手動作成も可）
- **IAM権限（KBのサービスロール）:**
- aoss:APIAccessAll / s3:GetObject / bedrock:InvokeModel が必要


---

# OpenSearch Serverless パフォーマンスチューニング

| チューニング項目 | 設定・対処法 |
|--------------|------------|
| ef_search 増加 | 検索精度↑・レイテンシ↑。デフォルト512 |
| m 増加 | グラフ接続数↑・精度↑・メモリ↑。デフォルト16 |
| シャード数最適化 | インデックスサイズに応じて調整 |
| Disk ANN（Faiss） | メモリ不足時にベクトルをディスク保存 |
| フィールド絞り込み | 不要なフィールドをincludesで除外 |
| バッチインジェスト | 1件ずつではなくBulk APIで一括登録 |
| knnウォームアップ | インデックス再起動後にknn_warm_up APIで事前ロード |
- **OCUのスケーリング:**
- Search OCU（クエリ処理）とIndex OCU（インデックス処理）が独立スケール
- 最小 0.5 OCU から自動スケールアップ（上限をCapacity Limitsで設定可）


---

# OpenSearch Serverless モニタリング

| メトリクス | 説明 | アラート推奨 |
|----------|------|------------|
| SearchLatency | 検索レイテンシ（p50/p90/p99） | p99 > 500ms |
| IndexingLatency | インデックス登録レイテンシ | p99 > 1秒 |
| SearchRate | 検索リクエスト数/秒 | 急増時 |
| IndexingRate | インデックス登録数/秒 | |
| OCUUtilization | OCU使用率 | > 80% |
| StorageUtilization | ストレージ使用率 | > 80% |
- **CloudWatch Dashboard 推奨設定:**
- SearchLatency P99 + SearchRate + OCUUtilization を1ダッシュボードに集約
- **アクセスログ:** データアクセスポリシーでCloudWatch Logsに転送可能


---

# OpenSearch Serverless IAM設定

- **IAM ≠ データアクセスポリシー。2層で制御する点が試験頻出**
| 制御レイヤー | 制御内容 | 設定場所 |
|-----------|---------|---------|
| IAM | AWSリソースへのAPI呼び出し制御 | IAMポリシー |
| データアクセスポリシー | OpenSearch内のインデックスCRUD制御 | OSSコンソール |
- **必要なIAMアクション（API呼び出し側）:**
- aoss:APIAccessAll または個別アクション（aoss:CreateIndex等）
- **データアクセスポリシー（インデックス操作側）:**
- IAMロールARNまたはIAMユーザーARNを対象として指定
- **試験ポイント:**
- IAMでaoss:APIAccessAllを付与してもデータアクセスポリシーがなければ操作不可
- 両方の設定が必要（かつ一致している必要がある）


---

# OpenSearch Serverless コスト最適化

| コスト要因 | 単価目安 | 最適化策 |
|----------|---------|---------|
| OCU（検索） | ~$0.24/OCU-時 | ef_searchを下げてOCU削減 |
| OCU（インデックス） | ~$0.24/OCU-時 | バッチインジェストで効率化 |
| ストレージ | ~$0.024/GB-月 | 低次元（256）で削減 |
| Disk ANN | 低コスト | メモリ不足時のコスト削減策 |
- **コスト削減のベストプラクティス:**
- テスト環境は使用時のみ起動（Serverlessはアイドルでも最小コスト）
- VectorSearch タイプ（Search タイプより安価）を選択
- 不要なインデックスを定期的に削除
- **試験ポイント:** OpenSearch Serverless = OCU課金（リクエスト数ではなくキャパシティ）


---

# OpenSearch Serverless 試験ポイントまとめ

- ✅ Bedrock KBのベクトルDBとして使えるのは OpenSearch **Serverless** のみ
- ✅ コレクションタイプ: VectorSearch（低コスト）/ Search（全文+ベクトル）
- ✅ k-NNエンジン: Faiss（大規模）/ nmslib（バランス）/ Lucene（小規模）
- ✅ HYBRID検索 = kNN（ベクトル）+ BM25（キーワード）のスコア統合
- ✅ セキュリティ3層: 暗号化ポリシー + ネットワークポリシー + データアクセスポリシー
- ✅ IAMとデータアクセスポリシーは独立（両方設定が必要）
- ✅ ef_construction/m: インデックス精度（高い→精度↑・メモリ↑）
- ✅ ef_search: 検索精度（高い→精度↑・レイテンシ↑）
- ❌ NG: OpenSearch Service（Provisioned）をBedrock KBのDBとして使う
- ❌ NG: IAMだけ設定してデータアクセスポリシーを忘れる


---

<!-- _class: lead -->
# Section 4: Aurora PostgreSQL + pgvector

- RDB + ベクトル検索の統合 — 既存PostgreSQL資産を活かしたRAG実装


---

# pgvector 概要・特徴

- **pgvector** = PostgreSQL拡張機能でベクトル検索を追加するオープンソースライブラリ
| 特徴 | 説明 |
|------|------|
| RDB統合 | SQLでベクトル検索・フィルタリングを同時実行 |
| トランザクション | ACIDトランザクション対応（OpenSearchにはない） |
| 既存資産活用 | Aurora PostgreSQL / RDS PostgreSQL に追加可能 |
| SQL操作 | 標準SQLでINSERT/SELECT/UPDATE/DELETE |
| インデックス | IVFFlat（低精度・高速）/ HNSW（高精度） |
- **AWSでの利用:**
- Amazon Aurora PostgreSQL（推奨・Bedrock KB対応）
- Amazon RDS for PostgreSQL（Bedrock KB非対応）
- **pgvectorのバージョン:** 0.5.0以降でHNSWサポート


---

# pgvector — Aurora PostgreSQL 有効化

- **Aurora PostgreSQL でのpgvector有効化手順**
- 対応バージョン: Aurora PostgreSQL 13.6+ / 14.4+ / 15.2+
| ステップ | コマンド / 操作 |
|---------|---------------|
| ① 拡張機能有効化 | CREATE EXTENSION vector; |
| ② vectorカラム追加 | ALTER TABLE t ADD COLUMN emb vector(1024); |
| ③ データ挿入 | INSERT INTO t(text, emb) VALUES ('...', '[0.1, 0.2, ...]'); |
| ④ インデックス作成 | CREATE INDEX ON t USING ivfflat(emb); |
| ⑤ 類似検索 | SELECT * FROM t ORDER BY emb <=> query_vec LIMIT 5; |

```sql
-- pgvector 有効化
CREATE EXTENSION IF NOT EXISTS vector;

-- テーブル作成（1024次元ベクトル）
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1024),
  metadata JSONB
);

-- コサイン類似度検索
SELECT id, content, 1 - (embedding <=> '[0.1,0.2,...]') AS similarity
FROM documents
ORDER BY embedding <=> '[0.1,0.2,...]'
LIMIT 5;
```


---

# pgvector — vector型と演算子

| 演算子 | 距離メトリクス | 説明 |
|--------|-------------|------|
| <-> | L2（ユークリッド）距離 | 空間的距離。小さいほど類似 |
| <=> | コサイン距離（1-cosine） | 方向の類似性。小さいほど類似 |
| <#> | 内積（負値） | 正規化済みで高速。小さいほど類似 |
- **類似度スコアへの変換:**
- コサイン類似度 = 1 - (embedding <=> query_vec)
- 内積スコア = -(embedding <#> query_vec)
- **vector型の制限:**
| 制限 | 値 |
|------|---|
| 最大次元数 | 16,000（通常1,024以下推奨） |
| NULL対応 | NULLベクトル可（インデックス外） |
| 配列表記 | '[0.1, 0.2, 0.3]' 形式の文字列から変換 |


---

# pgvector — IVFFlat インデックス

- **IVFFlat（Inverted File Flat）** = ベクトルをクラスタリングして検索範囲を絞る
| パラメータ | 説明 | 推奨値 |
|----------|------|--------|
| lists | クラスタ数（多い→精度↑・遅い） | rows/1000（最大100） |
| probes | 検索時の探索クラスタ数 | lists/10〜lists |
- **インデックス作成:**
- CREATE INDEX ON documents USING ivfflat(embedding vector_cosine_ops) WITH (lists = 100);
- **検索時のprobes設定:**
- SET ivfflat.probes = 10;  -- 精度↑はprobes↑
- **特徴:**
- インデックス構築が速い（HNSWより高速）
- 大規模データ（100万件超）でスケールしやすい
- 精度はHNSWより低め（probes調整で改善可）
- **注意:** インデックス前に十分なデータが必要（空テーブルでの作成は非推奨）


---

# pgvector — HNSW インデックス

- **HNSW（Hierarchical Navigable Small World）** = 階層グラフ構造で高精度・高速検索
| パラメータ | 説明 | 推奨値 |
|----------|------|--------|
| m | グラフの接続数（多い→精度↑・メモリ↑） | 16（デフォルト） |
| ef_construction | インデックス構築探索幅（多い→精度↑・遅い） | 64（デフォルト） |
- **インデックス作成:**
- CREATE INDEX ON documents USING hnsw(embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
- **検索時のef設定:**
- SET hnsw.ef_search = 100;  -- 精度↑はef_search↑
- **IVFFlat vs HNSW:**
| | IVFFlat | HNSW |
|--|---------|------|
| 精度 | 中 | 高 |
| 構築速度 | 速い | 遅い |
| メモリ | 少ない | 多い |
| 更新 | 向き不向きあり | 向いている |


---

# pgvector パフォーマンスチューニング

| チューニング項目 | 対処法 |
|--------------|--------|
| インデックス不使用 | WHERE句の条件を最小化、ANNインデックス適用確認 |
| EXPLAIN ANALYZEで確認 | Seq Scan → Index Scan に変わっているか確認 |
| ef_search増加 | SET hnsw.ef_search = 200（精度↑） |
| probes増加（IVFFlat） | SET ivfflat.probes = 20（精度↑） |
| 並列スキャン | max_parallel_workers_per_gather を増加 |
| メモリ調整 | maintenance_work_mem でインデックス構築高速化 |
| vacuum | 削除行が多い場合はVACUUMでパフォーマンス回復 |
- **Aurora I/O-Optimized推奨:**
- ベクトル検索はI/O集中型。Aurora I/O-Optimizedストレージでコスト削減可


---

# pgvector 制限・クォータ

| 制限項目 | 値 | 備考 |
|---------|---|------|
| 最大次元数 | 16,000 | 通常1,024以下を推奨 |
| IVFFlat最大lists | 32,768 | |
| HNSW最大m | 100 | |
| HNSW最大ef_construction | 4,000 | |
| 1クエリの最大ベクトル数 | PostgreSQL行数上限に準拠 | |
- **Aurora PostgreSQL pgvector 対応バージョン:**
| Auroraバージョン | pgvectorバージョン |
|---------------|----------------|
| Aurora PG 13.6+ | 0.4.0 |
| Aurora PG 14.4+ | 0.4.0 |
| Aurora PG 15.2+ | 0.5.0（HNSW対応） |
- **Bedrock KB 対応:** Aurora PostgreSQL のみ（RDS PostgreSQLは非対応）


---

# Bedrock KBとAurora pgvectorの統合

- **統合フロー:** KB作成時にAurora PostgreSQLクラスターを指定
| 設定項目 | 説明 |
|---------|------|
| クラスターARN | Aurora PostgreSQLのARN |
| データベース名 | 接続先DB名 |
| テーブル名 | ベクトルを格納するテーブル名 |
| ベクトルフィールド名 | vector型カラム名 |
| テキストフィールド名 | チャンクテキストカラム名 |
| メタデータフィールド名 | JSONBメタデータカラム名 |
| Secrets Manager ARN | DB接続情報を格納したSecret ARN |
- **IAM権限（KBのサービスロール）:**
- rds-data:ExecuteStatement / rds-data:BatchExecuteStatement
- secretsmanager:GetSecretValue（DBクレデンシャル取得）
- **Aurora Serverless v2 推奨:** オートスケールで費用対効果が高い


---

# pgvector セキュリティ・コスト

- **セキュリティ設定:**
| 項目 | 設定 |
|------|------|
| 暗号化（保存） | Aurora ストレージ暗号化 / KMS |
| 暗号化（転送） | SSL/TLS必須（require_secure_transport = on） |
| アクセス制御 | PostgreSQLユーザー権限 + IAM認証 |
| ネットワーク | VPC内に配置・パブリックアクセス無効化 |
| 認証情報 | Secrets Managerで管理（ハードコード禁止） |
- **コスト比較（概算）:**
| 構成 | 月額概算 |
|------|---------|
| Aurora Serverless v2（最小） | ~$50〜（ACU課金） |
| Aurora Provisioned（db.r7g.large） | ~$200〜 |
| OpenSearch Serverless（最小） | ~$175〜（0.5OCU×2×30日） |
- **小規模なら pgvector の方が安い場合が多い**


---

# pgvector 試験ポイントまとめ

- ✅ pgvector = PostgreSQL拡張機能でRDB+ベクトル検索を統合
- ✅ Bedrock KB対応 = Aurora PostgreSQLのみ（RDS PostgreSQLは非対応）
- ✅ 演算子: <-> L2距離 / <=> コサイン距離 / <#> 内積（負値）
- ✅ IVFFlat: 構築速い・中精度・大規模向き
- ✅ HNSW: 高精度・メモリ大・更新に強い（pgvector 0.5.0以降）
- ✅ DB接続情報はSecrets Managerで管理
- ✅ ACID対応 → ベクトル + リレーショナルデータのトランザクション処理が可能
- ✅ コスト: 小規模ならOpenSearchより安価な場合が多い
- ❌ NG: RDS PostgreSQLをBedrock KBのDBとして使う（Aurora必須）
- ❌ NG: pgvectorでHybrid検索（pgvector単体ではBM25がない）


---

<!-- _class: lead -->
# Section 5: その他ベクトルDB・比較分析

- MemoryDB / Pinecone / Neptune Analytics / 全DB比較マトリクス


---

# Amazon MemoryDB for Redis — ベクトル検索

- **MemoryDB** = Redis互換のインメモリDB（耐久性あり）+ ベクトル検索対応
| 特徴 | 説明 |
|------|------|
| 超低レイテンシ | マイクロ秒レベルの読み取り（インメモリ） |
| 耐久性 | Multi-AZにトランザクションログ（RDBと同等） |
| ベクトル検索 | HNSW / Flat インデックス対応 |
| データ型 | Hash, Set, SortedSet, Vector等Redis全データ型 |
| Bedrock KB対応 | 対応（ベクトルDB選択肢として利用可） |
- **ベクトル検索コマンド（Redis Stack）:**
- FT.CREATE / FT.SEARCH で全文検索 + ベクトル検索の統合
- **最適ユースケース:** リアルタイムレコメンデーション・低レイテンシチャット履歴+RAG
- **コスト:** インメモリ = ストレージコスト高め（大規模データには不向き）


---

# Pinecone on AWS Marketplace

- **Pinecone** = ベクトル専用フルマネージドDBのSaaS（サードパーティ）
| 特徴 | 説明 |
|------|------|
| ベクトル特化 | ベクトル検索のみに最適化（フルテキスト検索なし） |
| サーバーレス | インフラ管理不要 |
| ネームスペース | テナント分離・マルチユーザー対応 |
| メタデータフィルタ | 高速なPre-filtering対応 |
| Bedrock KB対応 | サードパーティとして統合可能 |
- **PineconeとAWS連携:**
- AWS PrivateLinkでVPC内からセキュアに接続
- AWS Marketplaceで契約一元管理
- **最適ユースケース:** ベクトル検索のみ必要・他AWSサービス依存を減らしたい場合
- **コスト:** 無料枠あり（Pod型 or Serverless型で課金）


---

# Weaviate / MongoDB Atlas Vector Search

| | Weaviate | MongoDB Atlas |
|-|---------|--------------|
| 種別 | オープンソースVectorDB（SaaS版あり） | ドキュメントDB + ベクトル |
| AWSデプロイ | AWS Marketplace / セルフホスト | Atlas（マルチクラウド対応） |
| Bedrock KB対応 | 対応 | 対応 |
| 検索種別 | ベクトル + GraphQL + キーワード | ベクトル + ドキュメント検索 |
| ハイブリッド検索 | 対応（BM25+ベクトル統合） | 対応 |
| スキーマ | 型付きスキーマ（クラス定義） | スキーマレス |
| 最適ユースケース | 高精度セマンティック検索 | 既存MongoDB活用 |
- **試験ポイント:** Bedrock KBはサードパーティDB（Pinecone/Weaviate/MongoDB Atlas等）にも対応


---

# Amazon Neptune Analytics — GraphRAG

- **Neptune Analytics** = グラフDB + ベクトル検索 + グラフアルゴリズムの統合
| 特徴 | 説明 |
|------|------|
| グラフ+ベクトル | グラフ構造（エンティティ関係）+ ベクトル類似検索を同時実行 |
| インメモリ | グラフをメモリに展開して高速分析 |
| Bedrock KB対応 | 対応 |
| クエリ言語 | openCypher / Gremlin |
- **GraphRAGとは:**
- エンティティ（人物・組織・概念）間の関係をグラフで表現
- ベクトル検索で関連ノードを発見 → グラフ探索で関係情報を追加取得
- **最適ユースケース:**
- 医療知識グラフ・法規制コンプライアンス・組織内人脈検索・不正検知
- **試験ポイント:** 「エンティティ間の関係情報が必要→Neptune Analytics + GraphRAG」


---

# 全ベクトルDB比較マトリクス①（機能・特性）

| DB | 種別 | Hybrid検索 | Transaction | グラフ統合 | KB対応 |
|---|------|-----------|------------|-----------|--------|
| OpenSearch Serverless | AWS管理 | ✅ BM25+kNN | ❌ | ❌ | ✅ |
| Aurora pgvector | AWS管理 | ❌ (ベクトルのみ) | ✅ ACID | ❌ | ✅ |
| DocumentDB | AWS管理 | ❌ | ✅ | ❌ | ✅ |
| Neptune Analytics | AWS管理 | ✅ | ❌ | ✅ グラフ | ✅ |
| MemoryDB for Redis | AWS管理 | ✅ (FT.SEARCH) | ✅ | ❌ | ✅ |
| Pinecone | サードパーティ | ❌ (ベクトルのみ) | ❌ | ❌ | ✅ |
| MongoDB Atlas | サードパーティ | ✅ | ✅ | ❌ | ✅ |
| Weaviate | サードパーティ | ✅ | ❌ | ❌ | ✅ |


---

# 全ベクトルDB比較マトリクス②（コスト・スケール・レイテンシ）

| DB | コスト感 | 最大スケール | レイテンシ | ユースケース |
|---|---------|------------|-----------|------------|
| OpenSearch Serverless | 中（OCU課金） | 大規模 | 中 | 大規模・Hybrid |
| Aurora pgvector | 低〜中（インスタンス） | 中規模 | 中 | RDB統合 |
| Neptune Analytics | 高（インメモリ） | 中 | 低 | GraphRAG |
| MemoryDB for Redis | 高（インメモリ） | 中 | 超低 | リアルタイム |
| Pinecone | 中〜高（Pod/Serverless） | 大規模 | 低 | ベクトル特化 |
| MongoDB Atlas | 中 | 大規模 | 中 | NoSQL+ベクトル |
- **選択のサマリー:**
- 大規模・ハイブリッド → OpenSearch Serverless
- 既存RDB統合・トランザクション → pgvector
- 超低レイテンシ → MemoryDB
- グラフ関係 → Neptune Analytics


---

# ベクトルDB 選択フレームワーク

- **要件ベースの選択フロー:**
- 既存PostgreSQL/Auroraがある → pgvector（移行コスト最小）
- グラフ構造（エンティティ関係）が必要 → Neptune Analytics
- マイクロ秒レイテンシが必要 → MemoryDB for Redis
- 大規模（100万件超）+ ハイブリッド検索 → OpenSearch Serverless
- ベクトル検索のみでシンプルに → Pinecone
- NoSQL + ベクトル統合 → MongoDB Atlas / DocumentDB
- **AWSネイティブが優先される場合:**
- IAM統合・VPC・KMS・CloudTrailをシームレスに使いたい場合
- **サードパーティが選ばれる場合:**
- 高度なベクトル検索機能・既存SaaS契約がある場合


---

# ユースケース別推奨ベクトルDB

| ユースケース | 推奨DB | 理由 |
|-----------|--------|------|
| 社内FAQ・ドキュメント検索 | OpenSearch Serverless | Hybrid検索・スケール |
| ECサイトレコメンデーション | MemoryDB / OpenSearch | 低レイテンシ・大規模 |
| 医療・法律の知識グラフ | Neptune Analytics | エンティティ関係が重要 |
| 既存ERPシステムのRAG | Aurora pgvector | PostgreSQL統合 |
| マルチテナントSaaS | Pinecone | ネームスペースで分離 |
| コード検索・技術文書 | OpenSearch Serverless | Hybrid（コード完全一致）|
| チャットボット（低レイテンシ） | MemoryDB for Redis | マイクロ秒 |
| 多言語グローバルコンテンツ | OpenSearch Serverless | Analyzerで多言語対応 |


---

# AWS管理 vs サードパーティ ベクトルDB比較

| 比較軸 | AWS管理（OSS/pgvector等） | サードパーティ（Pinecone等） |
|-------|------------------------|--------------------------|
| IAM統合 | ネイティブ対応 | 独自認証（APIキー等） |
| VPC統合 | 完全対応 | PrivateLink経由 |
| KMS暗号化 | ネイティブ対応 | 独自暗号化 |
| CloudTrail監査 | 自動記録 | 別途設定要 |
| SLA | AWS SLA適用 | 独自SLA |
| コスト管理 | AWS Cost Explorer一元管理 | 別途管理 |
| 機能特化 | 汎用（多機能） | ベクトル特化（シンプル） |
- **試験ポイント:**
- 「セキュリティ・コンプライアンス重視 → AWSネイティブ」
- 「ベクトル検索のみシンプルに → Pinecone等サードパーティ」


---

<!-- _class: lead -->
# Section 6: RAG設計パターン・ベストプラクティス

- 基本RAG → Advanced RAG → CRAG / Self-RAG / GraphRAG


---

# 基本RAGパターン（Naive RAG）

- **最もシンプルなRAG実装**
| ステップ | 処理 |
|---------|------|
| ① Indexing | チャンキング → エンベディング → ベクトルDB格納 |
| ② Query | クエリエンベディング → ベクトル検索 → Top-k取得 |
| ③ Generate | Top-kチャンク + クエリ → プロンプト → LLM → 回答 |
- **基本RAGの課題:**
- 低品質チャンクが混入すると回答精度が低下（GIGO問題）
- クエリと文書の意味ギャップ（クエリが短すぎる等）
- 長文書でコンテキスト長を超える場合あり
- **AWS実装:** Bedrock KBのRetrieveAndGenerateが基本RAGをワンライン実装
- **改善策 → Advanced RAGパターンへ**


---

# Advanced RAGパターン

| 技術 | 解決する課題 | 実装方法 |
|------|-----------|---------|
| Query Rewriting | クエリの意味ギャップ | LLMでクエリを拡張・明確化 |
| HyDE | 短いクエリの精度低下 | 仮想ドキュメントを生成してエンベディング |
| Step-back Prompting | 具体的すぎる質問 | より抽象的な質問に変換して検索 |
| Reranking | 関連度の低い結果混入 | LLMで検索結果を再スコアリング |
| Hierarchical chunking | 長文コンテキスト | 子で検索・親で生成 |
| Multi-query | 1クエリで取得できない | 複数クエリを並列実行して統合 |
| Contextual compression | コンテキスト肥大化 | 回答に必要な部分だけ抽出 |
- **Bedrock KB実装:** Reranking + HYBRID + Hierarchical chunkingの組み合わせが最も効果的


---

# Corrective RAG（CRAG）

- **CRAG** = 検索結果の品質を評価し、品質不足なら検索戦略を修正する自己訂正型RAG
| フェーズ | 処理 |
|---------|------|
| ① 検索 | 通常のベクトル検索でTop-k取得 |
| ② 評価 | LLMで各チャンクの関連性を評価（CORRECT/AMBIGUOUS/INCORRECT） |
| ③a CORRECT | そのままLLM生成へ |
| ③b AMBIGUOUS | 追加検索 or Webサーチで補完 |
| ③c INCORRECT | 別の検索戦略（キーワード変更等）で再検索 |
| ④ 生成 | 評価済みコンテキストでLLM生成 |
- **AWS実装:** Bedrock Agents + Lambda（評価ロジック）+ KB（検索）
- **メリット:** ハルシネーション大幅減少
- **デメリット:** レイテンシ増加・コスト増（LLM評価ステップ追加）


---

# Self-RAG

- **Self-RAG** = LLM自身が検索の必要性を判断し、回答を自己批評するRAG
| トークン | 役割 |
|---------|------|
| [Retrieve] | 検索が必要かどうかをLLMが判断 |
| [ISREL] | 取得チャンクが質問に関連しているか評価 |
| [ISSUP] | 回答がチャンクに支持されているか評価 |
| [ISUSE] | 回答が有用かどうか評価 |
- **動作フロー:**
- 質問受信 → [Retrieve]判断 → YES: 検索実行 / NO: 知識のみで回答
- → [ISREL]評価 → 関連チャンク選択 → 生成 → [ISSUP]/[ISUSE]評価 → 最終回答
- **メリット:** 不必要な検索を省略→レイテンシ・コスト最適化
- **AWS実装:** Bedrock Agents のReflectionパターンとして実装可能


---

# マルチホップRAG（Multi-hop）

- **マルチホップ** = 複数の検索ステップを連鎖させて複雑な質問に回答
- **例:** 「AWSのCEOが卒業した大学の創設者は誰ですか？」
- → ①「AWSのCEO」を検索 → ②「○○の出身大学」を検索 → ③「大学の創設者」を検索 → 統合回答
| ステップ | 処理 |
|---------|------|
| ① 質問分解 | LLMでサブ質問に分解 |
| ② 逐次検索 | 各サブ質問を順次検索 |
| ③ 中間回答生成 | 各ステップの中間回答を生成 |
| ④ 最終統合 | 全中間回答を統合して最終回答 |
- **AWS実装:** Bedrock Agents のオーケストレーションでマルチステップ推論を自動実行


---

# GraphRAG（+ Amazon Neptune Analytics）

- **GraphRAG** = グラフ構造でエンティティ関係を表現し、ベクトル検索と組み合わせる
| 通常RAG | GraphRAG |
|--------|---------|
| テキストチャンクのベクトル検索 | エンティティ（ノード）+ 関係（エッジ）で構造化 |
| 孤立した情報の断片 | エンティティ間の関係も取得可能 |
| 「AWSとは」→ チャンク返却 | 「AWSの子会社は」→ グラフ探索で関連企業列挙 |
- **Neptune Analytics でのGraphRAG実装:**
- ① NLP でエンティティ・関係を抽出 → Neptune Analyticsに格納
- ② クエリ → ベクトル検索でノード発見 → グラフ探索で関連情報取得
- ③ LLMで統合回答生成
- **最適ユースケース:** 医療知識グラフ・コンプライアンス・組織図・不正検知


---

# RAGのセキュリティ設計

| セキュリティ脅威 | 対策 |
|--------------|------|
| プロンプトインジェクション（直接） | Guardrails + 入力バリデーション |
| 間接プロンプトインジェクション（文書経由） | S3書き込み制限 + Guardrails |
| データ漏洩（クロステナント） | テナント別KB分離 or メタデータフィルタ |
| 不正データ混入 | S3バケットポリシーで書き込みを信頼済みのみに制限 |
| 過剰な権限 | IAM最小権限（Retrieve専用ロール） |
| 通信傍受 | VPCエンドポイント + TLS強制 |
| 監査ログ不足 | CloudTrail + CloudWatch Logs 有効化 |
- **マルチテナントRAGの分離戦略:**
- ① テナント別KB（完全分離・コスト高）
- ② 単一KB + メタデータフィルタ（テナントIDでpre-filter、コスト効率良）


---

# プロンプトインジェクション対策（RAG）

- **間接プロンプトインジェクション** = 悪意のある文書をベクトルDBに混入させ、検索経由でLLMを操作
| 攻撃パターン | 対策 |
|-----------|------|
| 文書内に「前の指示を忘れて...」と埋め込み | Guardrailsで検出・ブロック |
| SQLインジェクション風のプロンプト埋め込み | 入力サニタイゼーション |
| システムプロンプト上書き試行 | プロンプトテンプレートを固定 |
| 機密情報の引き出し指示を文書に隠す | PII検出 + データソース検証 |
- **Bedrock Guardrailsの活用:**
- 拒否トピック: 「システムプロンプトの変更」を拒否トピックに設定
- PIIフィルター: 個人情報のマスキング
- グラウンディング: コンテキスト外の回答をブロック
- **S3書き込み権限を信頼済みサービスのみに制限（MaliciousDocument混入防止）**


---

# RAGのコスト最適化戦略

| フェーズ | コスト要因 | 最適化策 |
|---------|----------|---------|
| インジェスト | エンベディングトークン | Titan v2 低次元（256）選択 |
| インジェスト | ベクトルDB格納 | 低次元でストレージ削減 |
| クエリ | Retrieve API | scoreThreshold設定で不要結果除外 |
| クエリ | FM推論（R&G） | 安価モデル + 最大トークン制限 |
| クエリ | Reranking | 必要な場合のみ有効化 |
| ベクトルDB | OpenSearch OCU | VectorSearch型 + OCU上限設定 |
| ベクトルDB | pgvector | Aurora Serverless v2でアイドル時コスト削減 |
- **キャッシング戦略:**
- 同一クエリ → ElastiCache / DynamoDBにキャッシュ（エンベディング・検索結果）
- Bedrock Prompt Caching でシステムプロンプトキャッシュ（最大90%削減）


---

# RAG評価フレームワーク（RAGAS詳細）

| 指標 | 計算方法 | スコア範囲 | 改善策 |
|------|---------|----------|--------|
| Faithfulness | 回答の各文がコンテキストに支持されているか | 0〜1 | Guardrailsグラウンディング |
| Answer Relevance | 回答から逆生成した質問と元質問のコサイン類似度 | 0〜1 | プロンプト改善 |
| Context Precision | 取得チャンク中の有用チャンク割合 | 0〜1 | Reranking・k削減 |
| Context Recall | 正解回答の各文がチャンクで支持されているか | 0〜1 | k増加・Hybrid検索 |
| Answer Correctness | 正解ラベルとの一致度 | 0〜1 | モデル変更・FT |
- **AWS連携:**
- Bedrock Model Evaluation: LLMジャッジで Faithfulness / Relevance を自動評価
- SageMaker Clarify: バイアス・説明可能性の評価
- **評価データセット:** 質問・正解・コンテキストの3セットが必要


---

# RAGのモニタリング・オブザーバビリティ

| 監視レイヤー | メトリクス | AWSサービス |
|-----------|----------|-----------|
| インジェスト | IngestionJobStatus / 失敗件数 | CloudWatch |
| 検索 | KnowledgeBaseQueryLatency / スコア分布 | CloudWatch |
| LLM生成 | ModelInvocationLatency / ThrottleCount | CloudWatch |
| エンドツーエンド | R&Gレイテンシ / エラーレート | CloudWatch |
| 品質 | Faithfulness / Context Recall | Bedrock Model Evaluation |
| セキュリティ | Retrieve呼び出し元 / 異常パターン | CloudTrail + GuardDuty |
- **X-Rayトレーシング:**
- Bedrock + Lambda + OpenSearch をX-Rayで通しトレース
- ボトルネック（検索 or 生成 or チャンキング）を特定
- **アラート推奨:** p99レイテンシ > 5秒 / エラーレート > 1% / Faithfulness < 0.7


---

# よくある実装ミス・試験ひっかけパターン

- ❌ 「定期的な知識更新はFine-tuningで」→ ✅ 定期更新はRAGが最適
- ❌ 「チャンクは大きいほど精度が上がる」→ ✅ 大きすぎると精度低下・コスト増
- ❌ 「Retrieve APIはLLMを呼び出す」→ ✅ 検索のみ。LLM生成はR&G API
- ❌ 「HYBRIDはどのベクトルDBでも使える」→ ✅ OpenSearch Serverlessのみ
- ❌ 「pgvectorはRDS PostgreSQLでもBedrock KB対応」→ ✅ Aurora必須
- ❌ 「エンベディングモデルはクエリ時に変えても良い」→ ✅ インジェストと同一必須
- ❌ 「OpenSearch ProvisionedはBedrock KB対応」→ ✅ Serverlessのみ
- ❌ 「IAMだけでOpenSearch Serverlessを操作できる」→ ✅ データアクセスポリシーも必要
- ❌ 「Rerankingは精度を下げる」→ ✅ 精度↑、レイテンシ・コスト↑のトレードオフ
- ❌ 「GraphRAGにはOpenSearch Serverlessが最適」→ ✅ Neptune Analyticsが最適


---

<!-- _class: lead -->
# Section 7: 試験直前まとめ

- 数値リファレンス・キーワード索引・選択フロー・直前チェックリスト


---

# RAG数値リファレンス（試験頻出）

| 項目 | 数値 |
|------|------|
| Bedrock KB / アカウント上限 | 5（引き上げ可） |
| KB データソース数上限 | 10 / KB |
| チャンクサイズ範囲 | 20〜8,192 トークン |
| デフォルトチャンクサイズ | 300 トークン |
| デフォルトオーバーラップ | 20% |
| numberOfResults デフォルト | 5 |
| numberOfResults 最大 | 100 |
| S3ファイルサイズ上限 | 50 MB / ファイル |
| S3ファイル数上限 | 50,000 / データソース |
| セッション有効期間（R&G） | 1 時間 |
| Titan v2 最大次元 | 1,024（可変: 256/512/1024） |
| Titan v2 最大入力 | 8,192 トークン |
| OpenSearch Serverless 最小 | 0.5 OCU |
| pgvector 最大次元 | 16,000 |


---

# 主要キーワード索引 A–K

| キーワード | 説明 |
|----------|------|
| ANN（Approximate Nearest Neighbor） | 近似最近傍検索。正確さよりも速度を優先 |
| Aurora pgvector | Aurora PGのベクトル拡張。Bedrock KB対応（RDS非対応） |
| BM25 | キーワード検索アルゴリズム。固有名詞・コードに強い |
| Chunking | 長文書をベクトル化可能なサイズに分割する処理 |
| CRAG（Corrective RAG） | 検索品質評価+自己訂正型のAdvanced RAG |
| Embedding | テキスト→高次元ベクトルへの変換。意味を数値化 |
| Faithfulness | RAGAS指標。回答がコンテキストに基づいているかの度合い |
| GraphRAG | グラフDB+ベクトル検索の組み合わせ。Neptune Analytics |
| Guardrails | Bedrock のコンテンツフィルタリング機能 |
| HyDE | 仮想ドキュメントを生成してクエリの精度を向上させる手法 |
| Hybrid Search | ベクトル検索 + BM25 キーワード検索の統合 |
| IVFFlat | ベクトルインデックス。クラスタリングで大規模に対応 |


---

# 主要キーワード索引 L–Z

| キーワード | 説明 |
|----------|------|
| Knowledge Base（KB） | Bedrock のフルマネージドRAGサービス |
| Metadata filter | ベクトル検索にメタデータ条件を追加するpre-filter |
| HNSW | 高精度ベクトルインデックス。階層グラフ構造 |
| OCU（OpenSearch Compute Unit） | OpenSearch Serverlessの課金単位 |
| pgvector | PostgreSQLのベクトル検索拡張。<->/<=>/<#> 演算子 |
| RAG（Retrieval-Augmented Generation） | 外部DB検索+生成AIの組み合わせ |
| RAGAS | RAGパイプライン評価フレームワーク（Faithfulness等） |
| Reranking | 検索結果をLLMで再スコアリング。精度向上・レイテンシ増 |
| Retrieve API | 検索のみ（LLM生成なし）のBedrock KB API |
| RetrieveAndGenerate API | 検索+LLM生成を一括実行するBedrock KB API |
| Self-RAG | LLM自身が検索必要性を判断する自律型RAG |
| Semantic chunking | 意味の区切りでチャンク分割する手法 |
| Vector DB | ベクトルを格納・検索するデータベース |


---

# ベクトルDB選択フロー（試験対策）

- **Q1: ハイブリッド検索（BM25+ベクトル）が必要？**
- YES → OpenSearch Serverless（唯一のBedrock KB対応Hybrid）
- **Q2: 既存PostgreSQL/Auroraを活用したい？**
- YES → Aurora pgvector（SQL+ACID+ベクトル統合）
- **Q3: グラフ構造・エンティティ関係が重要？**
- YES → Neptune Analytics（GraphRAG）
- **Q4: マイクロ秒レイテンシが必要？**
- YES → MemoryDB for Redis
- **Q5: ベクトル専用でシンプルに？**
- YES → Pinecone on AWS Marketplace
- **Q6: NoSQL + ベクトル統合？**
- YES → MongoDB Atlas / Amazon DocumentDB
- **上記以外の大規模汎用 → OpenSearch Serverless（デファクト）**


---

# OpenSearch Serverless 試験ポイント10選

- ① Bedrock KBのデフォルトベクトルDB = OpenSearch **Serverless**（Provisioned不可）
- ② コレクションタイプ: VectorSearch（安価）/ Search（全文+ベクトル）
- ③ 3種ポリシー: 暗号化 + ネットワーク + データアクセス（全て設定必要）
- ④ IAMとデータアクセスポリシーは独立（どちらか片方だけでは操作不可）
- ⑤ k-NNエンジン: Faiss（大規模/Disk ANN）/ nmslib（バランス）/ Lucene（小規模）
- ⑥ ef_construction = インデックス精度、ef_search = 検索精度（どちらも大きいほど精度↑）
- ⑦ HYBRID = kNN + BM25。OpenSearch Serverlessのみ（他DBでは不可）
- ⑧ スコア正規化: Min-Max / Z-score / L2（異なるスコア尺度を統一）
- ⑨ OCU課金: Search OCU（クエリ）とIndex OCU（インデックス）が独立スケール
- ⑩ 最小構成: 0.5 OCU（アイドル時も課金あり）


---

# Aurora pgvector 試験ポイント10選

- ① Bedrock KB対応 = Aurora PostgreSQLのみ（RDS PostgreSQLは非対応）
- ② pgvector有効化: CREATE EXTENSION vector;
- ③ 演算子: <-> L2距離 / <=> コサイン距離 / <#> 内積（負値）
- ④ HNSW = 高精度・メモリ大（pgvector 0.5.0+）/ IVFFlat = 高速・中精度
- ⑤ IVFFlat: インデックス構築前に十分なデータが必要（空テーブルは非推奨）
- ⑥ probes（IVFFlat）/ ef_search（HNSW）で精度と速度をトレードオフ調整
- ⑦ DB接続情報はSecrets Managerで管理（ハードコード禁止）
- ⑧ ACID対応 = ベクトル + リレーショナルデータのトランザクション処理が可能
- ⑨ pgvector単体ではHybrid検索不可（BM25機能がない）
- ⑩ Aurora Serverless v2 推奨（オートスケールでアイドル時コスト削減）


---

# Bedrock Knowledge Base 試験ポイント10選

- ① Retrieve API = 検索のみ。RetrieveAndGenerate = 検索+LLM生成
- ② HYBRID searchType はOpenSearch Serverlessのみ対応
- ③ Rerankingモデル: Amazon Rerank 1.0 / Cohere Rerank 1.0
- ④ Hierarchical chunking: 検索=子チャンク、生成=親チャンクコンテキスト
- ⑤ メタデータフィルタ（.metadata.json）でS3ドキュメントのpre-filterが可能
- ⑥ 増分同期で変更ファイルのみ再処理（全件再処理より高速）
- ⑦ Guardrailsグラウンディングチェック = RAG専用機能（R&G API固有）
- ⑧ RetrieveAndGenerateのcitations = ソースURI付き引用元リスト
- ⑨ sessionIdでマルチターン会話の継続（有効期限1時間）
- ⑩ KB数上限5/アカウント、データソース上限10/KB（引き上げ可）


---

# RAG設計パターン 試験ポイント10選

- ① 基本RAG = Indexing → Retrieve → Generate の3ステップ
- ② Advanced RAG: Query Rewriting / HyDE / Reranking / Multi-query
- ③ CRAG = 検索品質をLLMで評価し、不良なら再検索する自己訂正型
- ④ Self-RAG = LLMが[Retrieve]トークンで検索の必要性を自律判断
- ⑤ マルチホップ = 複数検索を連鎖（Bedrock Agentsで実装）
- ⑥ GraphRAG = Neptune Analytics + ベクトル検索でエンティティ関係を活用
- ⑦ 間接プロンプトインジェクション = 悪意文書経由でLLMを操作→Guardrailsで対策
- ⑧ マルチテナント分離: テナント別KB vs 単一KB+メタデータフィルタのトレードオフ
- ⑨ HyDE = 仮想ドキュメントを生成してエンベディング→意味ギャップを解消
- ⑩ コスト最適化: 低次元エンベディング + キャッシュ + scoreThreshold


---

# RAGセキュリティ・コスト最適化 統括まとめ

- **セキュリティ最重要ポイント:**
| 脅威 | 最小対策 |
|------|---------|
| 不正アクセス | IAM最小権限 + VPCエンドポイント |
| データ漏洩 | メタデータフィルタ or テナント別KB分離 |
| ハルシネーション | Guardrailsグラウンディングチェック |
| 間接インジェクション | S3書き込み制限 + 拒否トピック設定 |
- **コスト最適化最重要ポイント:**
| 最大コスト要因 | 対策 |
|------------|------|
| FM推論 | 安価モデル + Prompt Caching（最大90%削減） |
| エンベディング | Titan v2 低次元（256次元で1/4コスト） |
| ベクトルDB | VectorSearch型 + OCU上限設定 |
| 無駄な検索 | scoreThreshold + numberOfResults削減 |


---

# 直前チェックリスト（全セクション）

- **RAG基礎:**
- [ ] RAG vs FT vs ICL の使い分けを説明できる
- [ ] エンベディングモデル4種の次元数と特徴を覚えた
- [ ] チャンキング6種の使い分けを理解した
- **Bedrock KB:**
- [ ] Retrieve / R&G APIの違いと用途を説明できる
- [ ] HYBRID検索の対応DBを言える（OpenSearch Serverlessのみ）
- [ ] メタデータフィルタの演算子を3つ以上言える
- **OpenSearch Serverless:**
- [ ] 3種セキュリティポリシーの違いを説明できる
- [ ] Faiss/nmslib/Luceneの適切な使い分けを説明できる
- **pgvector:**
- [ ] <-> / <=> / <#> 演算子の違いを説明できる
- [ ] Aurora必須（RDS不可）を覚えた
- **RAG設計パターン:**
- [ ] CRAG / Self-RAG / GraphRAGの特徴を1行で説明できる


---

# 全セクション早見表（試験直前総まとめ）

| セクション | 最重要キーワード | ひっかけポイント |
|-----------|---------------|----------------|
| RAG基礎 | Embedding, Chunking, ANN | RAGとFTの使い分け |
| Bedrock KB | Retrieve/R&G API, HYBRID | HYBRID=OSS限定 |
| OpenSearch Serverless | kNN, Faiss/nmslib, 3ポリシー | Provisioned不可 |
| pgvector | <->/<=>/<#>, IVFFlat/HNSW | RDS不可・Aurora必須 |
| MemoryDB | インメモリ・低レイテンシ | コスト高め |
| Pinecone | ベクトル特化・シンプル | AWS IAM非ネイティブ |
| Neptune Analytics | GraphRAG・エンティティ関係 | OSS非対応（Neptune必須） |
| CRAG/Self-RAG | 自己訂正・自律検索 | レイテンシ増加 |
| セキュリティ | Guardrails, IAM, VPC | IAM+データポリシー両方必要 |
| コスト | 低次元・キャッシュ・k削減 | OCU=リクエスト課金ではない |


---

<!-- _class: lead -->
# クロージング・参考資料

- **RAG実装ガイド完全版 — 学習完了**
- 
- **AWS公式ドキュメント:**
- Bedrock Knowledge Base: docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
- OpenSearch Serverless: docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html
- pgvector on Aurora: docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html
- 
- **試験申込:**
- AWS Certification: aws.amazon.com/certification/
- 
- Good Luck on the Exam!

