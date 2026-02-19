---
marp: true
theme: gaia
size: 16:9
paginate: true
footer: "AWS GenAI Dev Pro チートシート 2026"
style: |
  section { font-size: 0.80em; }
  section pre code { font-size: 0.6em; line-height: 1.4; }
  table { font-size: 0.68em; border-collapse: collapse; width: 100%; }
  th { background: #1565C0; color: white; padding: 4px 8px; text-align: left; }
  td { padding: 3px 8px; border-bottom: 1px solid #e0e0e0; }
  tr:nth-child(even) td { background: #f0f6ff; }
  section.lead h1 { font-size: 1.5em; }
  h2 { color: #1565C0; }
  
---

<!-- _class: lead -->
# AWS Certified Generative AI Developer - Professional

- **試験直前チートシート — サービス比較表・用語集エディション**
- 2026年版 | 全100スライド | Gaia テーマ
- 対象: エンジニアチーム内部研修


---

# 試験構成ロードマップ

| ドメイン | テーマ | 配点目安 | チートシート |
|---------|--------|---------|------------|
| D1 | AI / ML の基礎 | 15% | スライド 4–14 |
| D2 | 生成 AI の基礎 | 17% | スライド 15–25 |
| D3 | Foundation Models の活用 | 30% | スライド 26–48 |
| D4 | 責任ある AI | 18% | スライド 49–58 |
| D5 | セキュリティ・コンプライアンス | 20% | スライド 59–68 |
- 問題数: 65問（採点対象）＋ 非採点問題 | 時間: 170分 | 合格: 700/1000


---

# 試験のポイント早見

- **問題形式**: 単一選択 + 複数選択（2〜5択）
- **重点ドメイン**: D3（30%）→ Bedrock / RAG / Agents が最重要
- **問われ方**: 「最もコスト効率が良い」「最も安全な」→ Best Practice 視点
- **消去法**: AWSの責任範囲外・サービス誤用・セキュリティ違反を除外
- **キーワード**: ユースケース・スキルレベル・コントロール粒度で選ぶ
- **日本語受験**: 全問日本語対応（英語原文も確認可）


---

<!-- _class: lead -->
# Domain 1: AI / ML の基礎

- スライド 5–14 | 配点目安 15%
- AI/ML/DL/GenAI 定義 → ML タスク種別 → 評価指標
- AWS AI サービス 3 層 → Rekognition / Comprehend / Textract
- Transcribe / Translate / Polly → Forecast / Personalize / Kendra


---

# AI / ML / DL / GenAI 用語定義表

| 用語 | 定義 | 範囲 | キーワード |
|------|------|------|-----------|
| **AI** | 人間の知能を模倣するシステム | 最広義 | ルールベース / 学習 |
| **ML** | データからパターンを学習するシステム | AI の部分集合 | 特徴量 / モデル |
| **DL** | 多層ニューラルネットで特徴自動抽出 | ML の部分集合 | CNN / RNN / Transformer |
| **GenAI** | 新しいコンテンツ（テキスト・画像等）を生成 | DL の応用 | FM / LLM / Diffusion |


---

# ML タスク種別比較表

| タスク | 出力 | 代表アルゴリズム | AWS サービス例 |
|--------|------|----------------|--------------|
| 分類 | カテゴリ | SVM、決定木、XGBoost | SageMaker |
| 回帰 | 数値 | 線形回帰、ランダムフォレスト | SageMaker |
| クラスタリング | グループ | k-means、DBSCAN | SageMaker |
| 強化学習 | 行動方策 | Q-learning、PPO | SageMaker RL |
| 推薦 | ランキング | 協調フィルタリング | Personalize |


---

# 教師あり vs 教師なし vs 強化学習

| 軸 | 教師あり学習 | 教師なし学習 | 強化学習 |
|----|------------|------------|---------|
| 学習データ | ラベル付きデータ | ラベルなしデータ | 環境との対話 |
| 目的 | 予測・分類 | パターン発見 | 累積報酬の最大化 |
| 代表例 | スパム検出 | 顧客クラスタリング | ゲーム AI |
| 評価指標 | Accuracy / F1 | Silhouette 係数 | 報酬関数 |


---

# トレーニング・評価指標用語集

| 指標 | 用途 | 値の意味 |
|------|------|---------|
| Accuracy | 分類全般 | 正解率（高いほど良い）|
| Precision | 偽陽性重視 | 予測 Positive 中の正解率 |
| Recall | 偽陰性重視 | 実際 Positive 中の検出率 |
| F1 Score | P/R バランス | Precision と Recall の調和平均 |
| AUC-ROC | 閾値非依存 | 1.0 = 完璧、0.5 = ランダム |
| RMSE | 回帰問題 | 予測誤差の二乗平均平方根（小さいほど良い）|


---

# バイアス・バリアンス・過学習用語集

| 用語 | 定義 | 症状 | 対策 |
|------|------|------|------|
| 過学習 | 訓練データに過適合 | テスト精度が低下 | Dropout / 正則化 / データ増量 |
| 未学習 | モデルが単純すぎ | 訓練・テスト双方低精度 | モデル複雑化 / 特徴量追加 |
| 高バイアス | 予測が系統的にズレ | 未学習と同義 | 特徴量追加 / モデル変更 |
| 高バリアンス | データの揺れに過敏 | 過学習と同義 | 正則化 / データ増量 |


---

# AWS AI サービス層別一覧表

| 層 | 対象者 | 主なサービス | 特徴 |
|----|--------|------------|------|
| AI Services | 非 ML エンジニア | Rekognition / Comprehend / Transcribe / Polly / Translate | API 呼び出しのみ |
| ML Services | ML エンジニア | SageMaker / Bedrock | カスタム学習・推論 |
| ML Frameworks | 研究者・専門家 | EC2 + PyTorch/TF / Trainium / Inferentia | 最大コントロール |
- Bedrock は AI Services と ML Services の中間的位置付け
- SageMaker は ML ライフサイクル全体（データ準備〜デプロイ）をカバー


---

# Rekognition / Comprehend / Textract 比較

| サービス | 対象 | 主な機能 | 出力形式 |
|---------|------|---------|---------|
| Rekognition | 画像・動画 | 物体検出 / 顔認証 / テキスト検出 / Face Liveness | JSON（label / bounding box）|
| Comprehend | テキスト | 感情分析 / エンティティ / 言語検出 / PII | JSON（sentiment / entity）|
| Textract | 文書・フォーム | OCR / テーブル抽出 / フォーム解析 | JSON（text / table / form）|


---

# Transcribe / Translate / Polly 比較

| サービス | 変換方向 | 主な機能 | 特記事項 |
|---------|---------|---------|---------|
| Transcribe | 音声 → テキスト | 文字起こし / 話者識別 / PII 削除 | リアルタイム / バッチ両対応 |
| Translate | テキスト → テキスト | 75以上の言語間翻訳 | カスタム用語集対応 |
| Polly | テキスト → 音声 | SSML 対応 / 複数ボイス | Neural TTS で高品質 |


---

# Forecast / Personalize / Kendra 比較

| サービス | 用途 | 入力データ | 特記事項 |
|---------|------|----------|---------|
| Forecast | 時系列予測（需要予測等）| 履歴データ + 関連変数 | AutoML 内蔵 |
| Personalize | 推薦エンジン | ユーザー行動ログ | リアルタイム推薦 API |
| Kendra | エンタープライズ検索 | 非構造化文書（PDF 等）| 自然言語クエリ対応 |


---

# Domain 1 — キーワード総まとめ

- **AI/ML 基礎**: AI（知能模倣） / ML（データ学習） / DL（深層NN） / GenAI（コンテンツ生成）
- **タスク**: 分類 / 回帰 / クラスタリング / 強化学習 / 推薦
- **指標**: Accuracy / Precision / Recall / F1 / AUC-ROC / RMSE
- **問題**: 過学習（Dropout/正則化）/ 未学習（モデル複雑化）
- **AI Services**: Rekognition / Comprehend / Textract / Transcribe / Translate / Polly
- **ML Services**: SageMaker（フル ML）/ Bedrock（FM マネージド）
- **特化 ML**: Forecast（時系列）/ Personalize（推薦）/ Kendra（検索）


---

<!-- _class: lead -->
# Domain 2: 生成 AI の基礎

- スライド 16–25 | 配点目安 17%
- 用語集 A/B/C → FM 選定基準 → Bedrock FM 一覧
- Claude / Titan / Llama / Mistral 比較 → 推論パラメータ
- プロンプト手法比較（Zero-shot / Few-shot / CoT / Role）


---

# 生成 AI 用語集 A — Foundation & Architecture

| 用語 | 定義 |
|------|------|
| **Foundation Model (FM)** | 大規模データで事前学習した汎用 AI モデル |
| **LLM** | Large Language Model — 大規模言語モデル |
| **Transformer** | Attention 機構を使った NN アーキテクチャ（2017年〜）|
| **Attention** | 入力中の重要トークンに重みを付ける機構 |
| **Embedding** | テキストを意味を保った数値ベクトルに変換した表現 |
| **Diffusion Model** | ノイズ除去で画像を生成するモデル（Stable Diffusion 等）|


---

# 生成 AI 用語集 B — 推論・サンプリング

| 用語 | 定義 |
|------|------|
| **Token** | テキストの最小処理単位（単語 / サブワード）|
| **Context Window** | モデルが一度に処理できる最大トークン数 |
| **Temperature** | 出力のランダム性制御（0=決定論的、1=創造的）|
| **Top-p** | 累積確率 p 内のトークンから選択（Nucleus Sampling）|
| **Top-k** | 確率上位 k トークンから選択 |
| **Inference** | 学習済みモデルで予測・生成を行う処理 |


---

# 生成 AI 用語集 C — 品質・安全性

| 用語 | 定義 |
|------|------|
| **Hallucination** | 事実と異なる内容を自信を持って生成する問題 |
| **Grounding** | 外部知識（RAG 等）で回答を事実に基づかせる手法 |
| **Alignment** | 人間の意図・価値観に合わせる学習プロセス |
| **RLHF** | Reinforcement Learning from Human Feedback（人間フィードバックによる強化学習）|
| **Constitutional AI** | Anthropic の安全 AI 学習手法（Bedrock Claude 基盤）|


---

# FM 選定基準比較表

| ユースケース | 推奨 FM 種別 | 考慮点 |
|------------|------------|--------|
| 長文要約・複雑推論 | 大コンテキスト LLM | 200K+ トークン対応 |
| コード生成・補完 | コード特化 FM | Claude / Titan / Llama |
| 画像生成 | 拡散モデル | Stable Diffusion / Titan Image |
| セマンティック検索 | Embedding FM | 次元数・コスト比較 |
| マルチモーダル | Vision FM | Claude 3 / Titan Multimodal |


---

# Bedrock 提供 FM 一覧表（主要モデル）

| プロバイダー | モデル名 | 強み | 最大コンテキスト |
|------------|--------|------|--------------|
| Anthropic | Claude 3.5 Sonnet | 高精度・多用途・Vision 対応 | 200K tokens |
| Anthropic | Claude 3 Opus | 最高精度・複雑タスク | 200K tokens |
| Amazon | Titan Text Premier | AWS ネイティブ統合 | 32K tokens |
| Meta | Llama 3.1 405B | オープンソース・カスタマイズ可 | 128K tokens |
| Mistral AI | Mistral Large | 多言語・高速推論 | 32K tokens |
| Cohere | Command R+ | RAG 特化・多言語 | 128K tokens |


---

# Claude / Titan / Llama / Mistral 比較

| 項目 | Claude 3.5 | Titan Text | Llama 3.1 | Mistral |
|------|-----------|----------|---------|---------|
| 提供元 | Anthropic | Amazon | Meta | Mistral AI |
| 強み | 推論・安全性・Vision | AWS サービス統合 | オープン・無料 | 高速・多言語 |
| Fine-tuning | Bedrock 内で制限的 | ○ | ○ | △ |
| コスト目安 | 中〜高 | 低〜中 | 低 | 低〜中 |


---

# 画像生成 FM — Stability AI / Amazon Titan Image

| モデル | 提供元 | 主な機能 | 特記 |
|--------|--------|---------|------|
| Stable Diffusion XL | Stability AI | Text-to-Image / Image-to-Image | 高解像度 1024px+ |
| Titan Image Generator G1 | Amazon | Text-to-Image / 背景削除 | 透かし機能 |
| Titan Multimodal Embeddings | Amazon | 画像+テキスト統合ベクトル | マルチモーダル検索 |
- 呼び出し API: `bedrock:InvokeModel` / 出力: PNG / JPEG
- 最大解像度: 2048 × 2048 px


---

# 推論パラメータ一覧

| パラメータ | 範囲 | 低い値の効果 | 高い値の効果 |
|-----------|------|------------|------------|
| temperature | 0–1 | 一貫・決定論的 | 多様・創造的 |
| top_p | 0–1 | 保守的（高確率のみ）| 多様（広い候補）|
| top_k | 1–N | 候補を厳しく絞る | 候補を広く取る |
| max_tokens | 1〜上限 | 短い出力 | 長い出力 |
- temperature=0: 同一入力 → 同一出力（決定論的）
- temperature と top_p は通常どちらか一方のみ調整する


---

# プロンプト手法比較表

| 手法 | 例数 | 特徴 | 向く用途 |
|------|------|------|---------| 
| Zero-shot | 0 | 指示のみ | 汎用タスク・シンプルな変換 |
| Few-shot | 2–5 | 入出力例を提示 | 出力形式が重要なタスク |
| Chain-of-Thought | 0/N | 思考過程を記述させる | 推論・数学・複雑分析 |
| Role Prompting | 0 | ペルソナ設定 | 専門的・特定スタイルの回答 |
| XML Tags（Claude）| 0 | 構造化入力 | 長いプロンプト・多入力 |


---

# Domain 2 — キーワード総まとめ

- **FM / LLM**: Foundation Model（汎用大規模モデル）/ Large Language Model
- **Token / Context Window**: 処理単位 / 一度に扱える最大トークン数
- **Temperature / Top-p / Top-k**: 出力の多様性・創造性を制御
- **Hallucination**: 事実と異なる自信ある生成 → RAG / Grounding で軽減
- **RLHF / Alignment**: 人間フィードバック強化学習 / 人間価値観への適合
- **Prompt 手法**: Zero-shot / Few-shot / CoT / Role / XML
- **API**: InvokeModel / InvokeModelWithResponseStream（ストリーミング）


---

<!-- _class: lead -->
# Domain 3: Foundation Models の活用

- スライド 27–48 | 配点目安 30%（最重要ドメイン）
- Bedrock 機能 → RAG / KB → ベクトルDB / Embedding / チャンク
- Agents → Fine-tuning → カスタマイズ 4 択
- Model Evaluation / Prompt Management / SageMaker 比較


---

# Amazon Bedrock 機能一覧表

| 機能 | 説明 | 主な用途 |
|------|------|---------|
| Model Access | FM の有効化・管理・呼び出し | テキスト / 画像生成 |
| Knowledge Bases | RAG 用ベクトルストア管理 | Q&A / 文書検索 |
| Agents | マルチステップタスク自動化 | ワークフロー / ツール使用 |
| Guardrails | コンテンツフィルタリング | 安全性・コンプライアンス |
| Model Evaluation | FM 品質の自動/人間評価 | モデル選定・比較 |
| Prompt Management | プロンプトのバージョン管理 | テンプレート / A/B テスト |


---

# RAG 用語集

| 用語 | 定義 |
|------|------|
| **Ingestion** | 文書を分割・埋め込み・ベクトルDB に保存するプロセス |
| **Chunking** | 文書をトークン / 意味単位で分割する処理 |
| **Embedding** | テキストをベクトルに変換するモデル処理 |
| **Vector DB** | ベクトルを高速に類似検索できるデータベース |
| **Retrieval** | クエリに最も近いチャンクを検索する処理 |
| **Augmentation** | 検索結果をプロンプトに付加してFMに渡す処理 |


---

# RAG アーキテクチャ比較表

| 種別 | 特徴 | 課題 |
|------|------|------|
| Naive RAG | シンプルなベクトル検索 + 生成 | 精度限界 / コンテキスト切れ |
| Advanced RAG | 事前/事後処理追加（rerank 等）| 複雑性増加 |
| Modular RAG | コンポーネント単位の柔軟設計 | 設計コスト高 |
| GraphRAG | グラフ DB で関係性を考慮 | 構築コスト高 |
- Bedrock Knowledge Bases は Advanced RAG（Reranking 対応）を提供
- デフォルトはコサイン類似度で上位 k チャンクを取得


---

# RAG vs Fine-tuning 選択表

| 判断軸 | RAG を選ぶ | Fine-tuning を選ぶ |
|--------|-----------|------------------|
| 知識の鮮度 | 最新情報が必要 | 静的なドメイン知識 |
| データ量 | 少量でも可 | 数百〜数千例以上必要 |
| コスト | 低（インデックスのみ）| 学習コスト＋ストレージ |
| 向く用途 | Q&A / 文書検索 | スタイル変換 / 専門語彙 |
| 更新性 | リアルタイム更新可 | 更新には再学習が必要 |


---

# Knowledge Bases for Bedrock 仕様表

| 項目 | 仕様 |
|------|------|
| データソース | S3 / Confluence / Salesforce / SharePoint / Web Crawler |
| チャンク戦略 | Fixed size / Semantic / Hierarchical / None |
| ベクトルDB | OpenSearch Serverless / Aurora pgvector / Pinecone / Weaviate / MongoDB |
| 埋め込みモデル | Titan Embeddings V2 / Cohere Embed v3 |
| 同期方法 | 手動同期 / 自動スケジュール同期 |
| データソース数 | 最大 5 個 / KB |


---

# ベクトル DB 比較表

| DB | 種別 | 特徴 | Bedrock KB 対応 |
|----|------|------|--------------|
| OpenSearch Serverless | マネージド | AWSネイティブ・サーバーレス | ○（推奨）|
| Aurora pgvector | RDB 拡張 | SQL で管理・PostgreSQL 互換 | ○ |
| Pinecone | SaaS | 高速・専用 VDB | ○ |
| Weaviate | OSS/Cloud | セマンティック検索特化 | ○ |
| MongoDB Atlas | ドキュメント DB | Vector Search 内蔵 | ○ |


---

# 埋め込みモデル比較表

| モデル | 提供元 | 次元数 | 最大入力 | 特徴 |
|--------|--------|--------|---------|------|
| Titan Embeddings V2 | Amazon | 256/512/1024（可変）| 8192 tokens | 多言語・次元選択可 |
| Cohere Embed v3 | Cohere | 1024 | 512 tokens | 多言語・圧縮効率高 |
- **類似度指標**: コサイン類似度（方向）/ ユークリッド距離（空間）/ 内積（速度）
- **次元数の選択**: 高次元 → 高精度 / 低次元 → 高速・低コスト


---

# チャンク戦略比較表

| 戦略 | 分割基準 | 向く文書種別 | 特記 |
|------|---------|------------|------|
| Fixed size | 固定トークン数 | 均質なテキスト | シンプル・高速 |
| Semantic | 意味的まとまり | 多様な文書 | 精度高・処理重 |
| Hierarchical | 親子構造（要約+詳細）| 構造化文書 | 2 層でコンテキスト保持 |
| None（分割なし）| 文書丸ごと | 短い文書 | 超シンプル |
- **Overlap**: チャンク間に重複を持たせてコンテキスト切れを防ぐ


---

# Bedrock Agents — 用語集

| 用語 | 定義 |
|------|------|
| **Agent** | 目標達成のためにツールを自律的に使用する AI システム |
| **Action Group** | Agent が呼び出せる API / Lambda のグループ |
| **Lambda Function** | Action Group のバックエンド実処理 |
| **API Schema** | OpenAPI 形式で定義する Action の仕様書 |
| **ReAct** | Reasoning + Acting — 推論と行動を繰り返すフレーム |
| **Orchestration** | Agent が FM を使って計画・行動を決定するプロセス |


---

# Bedrock Agents — 設定項目一覧

| 設定項目 | 説明 | 必須 |
|---------|------|------|
| Foundation Model | 推論に使用する FM（Claude 推奨）| ○ |
| Instruction | エージェントの役割・制約・動作指針 | ○ |
| Knowledge Base | 参照する KB（RAG 用）| △ |
| Action Group | 呼び出せる API セット（Lambda 連携）| △ |
| Memory | 会話履歴の保持設定 | △ |
| Guardrails | コンテンツフィルタの紐付け | △ |


---

# Inline Agent vs 定義済み Agent 比較

| 軸 | Inline Agent | 定義済み Agent |
|----|-------------|--------------|
| 設定方法 | コード内で動的設定 | Bedrock コンソール / API |
| 永続性 | 一時的（セッションのみ）| 永続・バージョン管理あり |
| 向くシーン | プロトタイプ / テスト | 本番ワークフロー |
| 管理方法 | コード管理 | AWS リソース管理 |


---

# Fine-tuning 手法比較表

| 手法 | 更新スコープ | コスト | 効果 |
|------|------------|--------|------|
| Continued Pre-training | 全パラメータ | 高 | ドメイン知識・語彙の注入 |
| Fine-tuning（Supervised）| 全/一部パラメータ | 中〜高 | タスク特化・スタイル学習 |
| LoRA | アダプタ層のみ | 低 | 効率的な特化・小コスト |
| Distillation | 小モデルへの知識転移 | 中 | モデル軽量化・高速推論 |


---

# Fine-tuning データ要件一覧表

| 項目 | 要件 |
|------|------|
| データ形式 | JSONL（prompt / completion ペア、UTF-8）|
| 最小サンプル数（目安）| 50〜100 例（品質が最重要）|
| 推奨サンプル数 | 1000 例以上で安定 |
| データ保存先 | S3（Bedrock から直接参照）|
| ハイパーパラメータ | epochs（1〜10）/ batch_size / learning_rate |
| 出力 | カスタムモデル ARN（KB / Agents から利用可能）|


---

# カスタマイズ手法 4 択比較表

| 手法 | 知識更新 | コスト | 実装難度 | 選ぶシナリオ |
|------|---------|--------|---------|-----------|
| Prompt Engineering | ✕ | 最低 | 低 | 汎用タスクの調整 |
| RAG | ○（リアルタイム）| 低〜中 | 中 | 最新情報・大量文書 Q&A |
| Fine-tuning | △（静的）| 高 | 高 | スタイル / 専門語彙特化 |
| Pre-training | ○ | 最高 | 最高 | 完全新規ドメイン FM 構築 |


---

# Bedrock Model Evaluation 仕様

| 評価種別 | 説明 | 主な指標 |
|---------|------|---------|
| 自動評価 | 組み込み指標で自動採点 | ROUGE / BERTScore / Accuracy |
| 人間評価 | レビュアーが品質を手動評価 | 正確性 / 関連性 / 流暢さ |
| LLM-as-Judge | 別 FM が評価（カスタム基準）| カスタム評価基準 |
- **評価タスク**: Text Summarization / Q&A / Text Classification / Open-ended generation
- **用途**: FM 選定・Fine-tuning 前後の品質比較


---

# Prompt Management & Prompt Flow

| 機能 | 説明 |
|------|------|
| Prompt Catalog | プロンプトを保存・バージョン管理 |
| Variables | {{変数名}} でプロンプトをテンプレート化 |
| A/B Testing | 複数プロンプトのパフォーマンス比較 |
| Prompt Flow | プロンプトを繋ぐ視覚的ワークフロー構築 |
- **Prompt Flow ノード**: Input / LLM / Knowledge Base / Lambda / Condition / Output
- **用途**: 複雑なマルチステップ推論の設計・テスト


---

# Bedrock Studio / Bedrock Marketplace

| サービス | 概要 | 用途 |
|---------|------|------|
| Bedrock Studio | Web UI 開発・プロトタイピング環境 | FM 比較・KB/Agent テスト |
| Bedrock Marketplace | サードパーティ FM の検索・利用 | 商用 FM の素早い評価 |
- **Studio 機能**: FM 呼び出し / KB・Guardrails 設定 / Agent デバッグ / チーム共有
- **Marketplace**: AI21 Labs / Cohere 等の商用 FM + プライベートモデル公開
- 本番デプロイには SDK / API を使用（Studio は開発・評価用）


---

# SageMaker JumpStart vs Bedrock 選択表

| 判断軸 | Bedrock | SageMaker / JumpStart |
|--------|---------|----------------------|
| 対象ユーザー | アプリ開発者 | ML エンジニア |
| FM 管理 | AWS 完全管理 | 自分でデプロイ・管理 |
| カスタムアーキテクチャ | ✕ | ○ |
| コスト形態 | per token | インスタンス時間 |
| 自前モデル持込 | ✕ | ○ |
- **JumpStart**: Hugging Face / 主要 FM をワンクリックデプロイ + GUI Fine-tuning


---

# Domain 3 — キーワード総まとめ A（RAG / KB / Agents）

- **RAG**: Retrieval-Augmented Generation — 検索拡張生成
- **Chunking**: 文書の分割（Fixed / Semantic / Hierarchical）
- **Embedding**: テキスト → ベクトル変換（Titan / Cohere）
- **Vector DB**: ベクトル類似検索 DB（OpenSearch / Aurora / Pinecone）
- **Knowledge Base**: Bedrock の RAG 管理機能
- **Action Group**: Agent が呼べる API セット（OpenAPI + Lambda）
- **ReAct**: Reasoning + Acting — エージェントの推論フレーム


---

# Domain 3 — キーワード総まとめ B（FT / Eval / Flow）

- **Fine-tuning**: モデルをタスク特化で再学習（JSONL 形式）
- **Continued Pre-training**: ドメイン語彙・知識の追加学習
- **LoRA**: 低コストなアダプタ学習（少数パラメータ更新）
- **Distillation**: 大モデル → 小モデルへの知識転移
- **ROUGE / BERTScore**: 要約・生成評価指標
- **Prompt Flow**: マルチステップ推論ワークフロー構築
- **Provisioned Throughput**: 専用キャパシティ確保（高スループット保証）


---

<!-- _class: lead -->
# Domain 4: 責任ある AI

- スライド 50–58 | 配点目安 18%
- 6 原則対応表 → Guardrails フィルタ / 設定
- バイアス / Hallucination 軽減 → PII 処理
- SageMaker Clarify 指標


---

# 責任ある AI — 6 原則 AWS サービス対応表

| 原則 | 説明 | 主な AWS サービス |
|------|------|----------------|
| **公平性** | バイアスのない公平な意思決定 | SageMaker Clarify |
| **説明可能性** | 予測の根拠・理由を説明 | SageMaker Clarify / SHAP |
| **プライバシー** | 個人情報の適切な保護 | Macie / Bedrock Guardrails |
| **堅牢性** | 攻撃・誤用・異常入力への耐性 | Guardrails / モニタリング |
| **透明性** | AI の存在・限界を開示 | ドキュメント化 / ラベリング |
| **統治** | AI 利用の管理・監査 | CloudTrail / AWS Config |


---

# Bedrock Guardrails — フィルタ種別一覧

| フィルタ種別 | 機能 | 設定例 |
|------------|------|--------|
| Content Filter | 有害コンテンツの検出・ブロック | Hate / Violence / Sexual / Misconduct |
| Denied Topics | 特定トピックの拒否 | 競合他社 / 法的アドバイス |
| Word Filter | 特定語句のブロック | カスタム禁止ワードリスト |
| PII Redaction | 個人情報の検出・マスキング | Email / Phone / SSN / 名前 |
| Grounding Check | 幻覚検出・根拠確認 | RAG 回答の事実整合性検証 |


---

# Guardrails — 設定項目と適用タイミング

| 項目 | 設定値 |
|------|--------|
| Content Filter 強度 | None / Low / Medium / High（カテゴリ別）|
| Prompt Attack Detection | 有効 / 無効 |
| Denied Topics | カスタムテキスト説明で定義 |
| PII Action | BLOCK（拒否）/ ANONYMIZE（マスキング）|
- **適用タイミング**: Input（ユーザー入力検証）/ Output（FM 出力検証）
- **Agent 連携**: Agents にも Guardrails を紐付け可能（別設定が必要）
- **注意**: Bedrock 使用だけでは自動有効化されない — 明示的に作成・紐付けが必要


---

# バイアス検出・軽減手法表

| 種別 | 定義 | 軽減手法 |
|------|------|---------|
| データバイアス | 学習データの偏り（クラス不均衡等）| データ拡張 / リサンプリング |
| モデルバイアス | 予測の系統的な不公平 | Clarify で検出 → 再学習 |
| 確証バイアス | 既存信念に沿う情報を優先選択 | 多様なデータ収集 |
| アンカーバイアス | 初期情報への過度な依存 | プロンプト設計で文脈を中立化 |


---

# Hallucination 軽減手法比較表

| 手法 | 仕組み | 効果 | コスト |
|------|--------|------|--------|
| RAG | 外部知識を参照して生成 | 高 | 中 |
| Grounding Check（Guardrails）| 回答の事実整合性を検証 | 高 | 低 |
| Temperature 低下 | 決定論的出力で安定性向上 | 中 | なし |
| Chain-of-Thought | 段階的推論で論理的一貫性 | 中 | なし |
| Human Review（A2I）| 人間が最終確認 | 高 | 高 |


---

# PII 処理手法一覧

| 処理 | 説明 | AWS サービス |
|------|------|------------|
| 検出 | PII の識別（名前 / 電話 / SSN 等）| Comprehend / Guardrails |
| マスキング | [NAME] 等に置換して匿名化 | Guardrails PII Redaction |
| 削除 | PII を完全除去 | カスタム Lambda 後処理 |
| 暗号化 | 暗号化して保存 | KMS |
- **Bedrock の原則**: 顧客データを FM の学習に使用しない（デフォルト）
- **Transcribe PII Redaction**: 音声文字起こし時に PII をリアルタイム除去


---

# AI アウトプット検証手法

| 手法 | 説明 |
|------|------|
| Bedrock Guardrails | 自動フィルタ（入力 / 出力双方に適用）|
| Amazon A2I | 人間レビューワークフロー（信頼度低い場合に起動）|
| Bedrock Model Evaluation | FM の品質ベンチマーク（ROUGE / BERTScore）|
| Lambda 後処理 | カスタムバリデーションロジック |
- **A2I**: Amazon Augmented AI — 予測信頼度が閾値以下で人間レビューへ
- **活用パターン**: Guardrails（一次フィルタ）→ A2I（低信頼度の人間確認）


---

# SageMaker Clarify — 指標一覧

| 指標種別 | 指標名 | 説明 |
|---------|-------|------|
| バイアス | Class Imbalance (CI) | クラス間のサンプル不均衡 |
| バイアス | DPL（差分陽性率）| 保護属性間の正例割合差 |
| 説明可能性 | SHAP 値 | 各特徴量の予測への寄与度 |
| ドリフト | Data drift | 本番データと学習データの分布乖離 |
| モニタリング | Model quality | 精度・F1 の継続監視 |


---

# Domain 4 — キーワード総まとめ

- **Responsible AI 6 原則**: 公平性 / 説明可能性 / プライバシー / 堅牢性 / 透明性 / 統治
- **Guardrails 5 フィルタ**: Content / Denied Topics / Word / PII / Grounding Check
- **Hallucination 対策**: RAG / Grounding Check / Temperature 低下 / CoT
- **PII**: 検出（Comprehend）/ マスキング（Guardrails）/ 暗号化（KMS）
- **RLHF / Alignment**: 人間価値観への適合学習
- **A2I**: 低信頼度時の人間レビューワークフロー
- **Clarify**: バイアス検出（CI/DPL）+ 説明可能性（SHAP）


---

<!-- _class: lead -->
# Domain 5: セキュリティ・コンプライアンス

- スライド 60–68 | 配点目安 20%
- 共有責任モデル → IAM / Bedrock IAM アクション
- VPC エンドポイント → 暗号化 → CloudTrail / CloudWatch
- コンプライアンス → プロンプトインジェクション対策


---

# 共有責任モデル — AI ワークロード版

| 責任者 | 責任範囲 |
|--------|---------|
| **AWS** | 物理インフラ（DC / ネットワーク / ハードウェア）のセキュリティ |
| **AWS** | Bedrock / SageMaker マネージドサービスの運用・パッチ |
| **AWS** | FM ホスティング・可用性管理 |
| **AWS** | 顧客データを FM 学習に使用しない（Bedrock デフォルト）|
| **顧客** | IAM ポリシー / アクセス制御 / データ暗号化設定 |
| **顧客** | Guardrails 設定 / プロンプト設計 / Fine-tuning データ品質 |


---

# IAM ポリシー設計原則表

| 原則 | 説明 | 実装例 |
|------|------|--------|
| 最小権限 | 必要最低限のアクセスのみ付与 | Action を必要なものに限定 |
| ロールベース | ユーザーに長期キーを持たせない | IAM Role + 一時クレデンシャル |
| 条件キー | 条件付きアクセス制御 | aws:SourceIp / bedrock:Region |
| リソースベース | リソース単位の細かい制御 | S3 バケットポリシー |
- **Explicit Deny 優先**: Deny と Allow が競合する場合は Deny が優先される


---

# Bedrock IAM アクション一覧

| アクション | 説明 |
|-----------|------|
| `bedrock:InvokeModel` | FM の推論実行（同期）|
| `bedrock:InvokeModelWithResponseStream` | FM のストリーミング推論 |
| `bedrock:CreateKnowledgeBase` | Knowledge Base の作成 |
| `bedrock:RetrieveAndGenerate` | RAG クエリ実行 |
| `bedrock:CreateGuardrail` | Guardrails の作成 |
| `bedrock:InvokeAgent` | エージェントの呼び出し |


---

# VPC エンドポイント設定一覧

| サービス | エンドポイント種別 | 用途 |
|---------|----------------|------|
| Amazon Bedrock | Interface（PrivateLink）| プライベートネットワーク経由の推論 |
| Amazon S3 | Gateway | VPC 内から S3 へのデータ転送 |
| SageMaker API | Interface | API 呼び出しのプライベート化 |
| SageMaker Runtime | Interface | 推論エンドポイントのプライベート化 |
- **注意**: VPC エンドポイント ≠ 暗号化（ネットワーク分離 ≠ データ暗号化）
- **PrivateLink**: インターネットを経由しないAWS バックボーン通信


---

# データ暗号化オプション表

| データ状態 | 手段 | サービス |
|----------|------|---------|
| 静止中（S3）| SSE-S3 / SSE-KMS / SSE-C | S3 + KMS |
| 転送中 | TLS 1.2+（自動 HTTPS）| すべての AWS API 通信 |
| Bedrock Fine-tuning データ | KMS キーで暗号化 | KMS CMK |
| SageMaker モデル・ノートブック | KMS 統合 | KMS |
- **KMS CMK**: Customer Managed Key でキー管理・ローテーションを顧客が制御
- **AWS Managed Key**: AWS が自動管理するデフォルトキー（無料）


---

# CloudTrail / CloudWatch 監査設定

| サービス | 用途 | 設定ポイント |
|---------|------|------------|
| CloudTrail | API 操作ログの記録 | 全リージョン有効化・S3 保存・整合性検証 |
| CloudWatch Logs | アプリ・サービスログ監視 | Bedrock モデル呼び出しログを S3/CW に送信 |
| CloudWatch Metrics | メトリクス監視・アラーム | レイテンシ / エラー率 / スロットリング |
| AWS Config | リソース設定変更の履歴管理 | Bedrock Guardrails 変更検出 |
- **Bedrock ログ設定**: Bedrock コンソール → Model Invocation Logging で有効化
- **CloudTrail 注意**: デフォルトでは 90 日のみ保持 → S3 に保存で長期保管


---

# コンプライアンスフレームワーク対応表

| フレームワーク | Bedrock 対応状況 | 認証 |
|------------|--------------|------|
| SOC 1/2/3 | ○ | 認証済み |
| ISO 27001 | ○ | 認証済み |
| HIPAA | ○（BAA 締結が必要）| 対応可 |
| GDPR | ○（EU リージョン選択）| 対応可 |
| FedRAMP | 一部リージョン / 一部サービス | 進行中 |
- **AWS Artifact**: コンプライアンスレポートをオンデマンドで取得できるサービス


---

# プロンプトインジェクション対策一覧

| 対策 | 説明 | 実装 |
|------|------|------|
| 入力サニタイズ | 危険パターンを除去 / フィルタ | Lambda 前処理 |
| Guardrails | Prompt Attack Detection で自動検出 | Bedrock Guardrails |
| システムプロンプト分離 | 指示とユーザー入力を明確に分離 | XML タグ / 固定フォーマット |
| 出力検証 | 生成結果のパターン検証 | Lambda 後処理 |
- **Prompt Attack フィルタ**: Guardrails の Prompt Attack Detection が自動検出・ブロック
- **原則**: ユーザー入力をシステムプロンプトの一部として扱わない


---

# Domain 5 — キーワード総まとめ

- **Shared Responsibility**: AWS（インフラ）vs 顧客（設定・データ管理）
- **Least Privilege**: 最小権限の原則 — IAM Role + 一時クレデンシャル
- **Explicit Deny**: Deny が Allow より優先（IAM の基本）
- **KMS**: 静止中データの暗号化キー管理（CMK / AWS Managed）
- **VPC Endpoint**: ネットワーク分離 — 暗号化とは別概念
- **CloudTrail**: API 操作監査ログ（全リージョン有効化 + S3 保存推奨）
- **HIPAA / SOC / ISO**: Bedrock 対応済みコンプライアンスフレームワーク


---

<!-- _class: lead -->
# 横断比較: ユースケース別サービス選択ガイド

- スライド 70–79 | ユースケース別最適サービスを迷わず選ぶ
- テキスト / 画像 / 音声 / 検索・推薦 のユースケース別
- コスト / レイテンシ / コンテキスト長 / マルチモーダル 別
- クラウド vs オンプレ / Bedrock vs SageMaker vs EC2 判断


---

# テキスト生成 — ユースケース別サービス選択表

| ユースケース | 推奨サービス | 選択理由 |
|------------|------------|---------|
| Q&A / チャットボット | Bedrock + Knowledge Bases | RAG で根拠ある回答 |
| 長文要約 | Bedrock（Claude 3.x）| 200K コンテキスト対応 |
| コード生成・補完 | Bedrock（Claude / Llama）| コード特化能力 |
| データ分類・エンティティ抽出 | Comprehend / Bedrock | 専用 API か FM か選択 |
| テキスト翻訳 | Amazon Translate | 専用サービスが安価・高速 |


---

# 画像生成・分析 — ユースケース別選択表

| ユースケース | 推奨サービス | 特記 |
|------------|------------|------|
| 画像からテキスト生成（説明）| Bedrock（Claude 3 Vision）| マルチモーダル FM |
| Text-to-Image 生成 | Bedrock（Stable Diffusion / Titan Image）| 高解像度対応 |
| 物体検出・ラベリング | Rekognition | 専用 CV API |
| OCR / 文書解析 | Textract | フォーム・テーブル抽出特化 |
| 顔認証 / 顔ライブネス | Rekognition | Face Liveness で本人確認 |


---

# 音声・映像 — ユースケース別選択表

| ユースケース | 推奨サービス | 特記 |
|------------|------------|------|
| 音声文字起こし | Transcribe | リアルタイム / バッチ両対応 |
| 話者識別 | Transcribe（Speaker Diarization）| 最大 10 話者 |
| 音声中の PII 除去 | Transcribe（PII Redaction）| 音声レベルでリアルタイム除去 |
| テキスト→音声 | Polly | Neural TTS / SSML 対応 |
| 動画コンテンツ解析 | Rekognition Video | 時系列ラベル / 顔追跡 |


---

# 検索・推薦 — ユースケース別選択表

| ユースケース | 推奨サービス | 選択理由 |
|------------|------------|---------|
| 社内文書 Q&A | Kendra / Bedrock + KB | 自然言語検索・RAG |
| セマンティック検索 | OpenSearch + Embedding FM | ベクトル類似検索 |
| 商品・コンテンツ推薦 | Personalize | ユーザー行動ログベース ML |
| FAQ 自動回答（エンドツーエンド）| Bedrock Agents + KB | ReAct + RAG |
- **Kendra vs KB**: Kendra はエンタープライズ検索特化、KB は Bedrock RAG 統合


---

# コスト最適化 — 推論方式比較表

| 要件 | 推奨方式 | 理由 |
|------|---------|------|
| 低コスト・低頻度リクエスト | On-demand | 従量課金・事前確保不要 |
| 高スループット・高頻度 | Provisioned Throughput | 安定したキャパシティ・大量時コスト効率 |
| 大量バッチ処理（非同期）| Batch Inference | オフピーク割引（最大 50% OFF）|
| 実験・開発 | On-demand | 無駄なく起動・停止 |
- **Provisioned Throughput**: 固定費 → 高スループット時のみお得（閾値計算必須）


---

# レイテンシ要件別 FM 設定表

| 要件 | 推奨設定 | 理由 |
|------|---------|------|
| リアルタイム（< 1秒）| 軽量 FM + Provisioned Throughput | モデル小 + 専用キャパシティ |
| 準リアルタイム（1–5秒）| 標準 FM + On-demand | コスト効率重視 |
| バッチ（分〜時間）| 大規模 FM + Batch Inference | コスト最小化 |
- **Streaming**: `InvokeModelWithResponseStream` でトークン逐次返却
- **体感速度改善**: ストリーミングで TTFT（最初のトークン到達時間）を短縮
- **温度・パラメータ**: 速度には影響しない（モデルサイズと TPM が主要因）


---

# コンテキスト長別 FM 選択表

| 要件 | コンテキスト長目安 | 推奨 FM |
|------|--------------|--------|
| 短文 Q&A / 分類 | ~4K tokens | Titan Text Lite / Mistral 7B |
| 中程度文書 / 会話 | ~32K tokens | Mistral Large / Titan Premier |
| 長文書・長い会話 | ~128K tokens | Llama 3.1 / Cohere Command R+ |
| 超長文書（法律・財務）| 200K+ tokens | Claude 3 Opus / Sonnet |
- **注意**: コンテキスト長が長いほどコスト・レイテンシが増加
- **日本語換算**: 1 トークン ≈ 1〜1.5 文字（英語の約 2〜3 倍のトークン数）


---

# マルチモーダル対応 FM 一覧

| モデル | テキスト入出力 | 画像入力 | 画像生成 | 音声 |
|--------|------------|--------|---------|------|
| Claude 3 Opus / Sonnet / Haiku | ○ | ○（Vision）| ✕ | ✕ |
| Titan Text | ○ | ✕ | ✕ | ✕ |
| Titan Image Generator | テキスト入力 | ○（編集）| ○ | ✕ |
| Titan Multimodal Embeddings | ○ | ○ | ✕（埋め込み出力）| ✕ |
| Stable Diffusion（SD XL）| テキスト入力 | ○（編集）| ○ | ✕ |


---

# オンプレ vs AWS クラウド AI 比較表

| 軸 | オンプレ | AWS クラウド |
|----|---------|------------|
| 初期コスト | 高（GPU 購入）| 低（従量課金）|
| スケーラビリティ | 低（固定容量）| 高（自動スケール）|
| 管理負荷 | 高 | 低（マネージド）|
| データ主権 | 高 | 設定次第（VPC / Outposts）|
| 最新 FM 利用 | 難（自前調達）| 容易（Bedrock Marketplace）|


---

# Bedrock vs SageMaker vs EC2 判断表

| 軸 | Bedrock | SageMaker | EC2 + OSS |
|----|---------|----------|----------|
| 対象ユーザー | アプリ開発者 | ML エンジニア | 研究者・専門家 |
| FM 持込 | ✕ | ○ | ○ |
| カスタムアーキテクチャ | ✕ | ○ | ○ |
| 管理工数 | 最低 | 中 | 最高 |
| コスト可視性 | 高（per token）| 中（インスタンス時間）| 低（複雑）|


---

<!-- _class: lead -->
# 数値・制限値クイックリファレンス

- スライド 81–86 | 試験で問われる具体的な数値
- FM コンテキスト長 → Bedrock クォータ → FT データ要件
- 埋め込み次元数 → SageMaker インスタンス → AWS 制限値


---

# FM コンテキスト長一覧表

| モデル | 最大入力 | 最大出力 | 特記 |
|--------|---------|---------|------|
| Claude 3.5 Sonnet | 200K tokens | 8192 tokens | Vision 対応 |
| Claude 3 Opus | 200K tokens | 4096 tokens | 最高精度 |
| Claude 3 Haiku | 200K tokens | 4096 tokens | 最高速 |
| Titan Text Premier | 32K tokens | 3072 tokens | AWSネイティブ |
| Llama 3.1 405B | 128K tokens | 8192 tokens | オープンソース |
| Mistral Large | 32K tokens | 8192 tokens | 多言語 |


---

# Bedrock クォータ・制限値表

| 項目 | 制限値（目安）|
|------|------------|
| KB データソース数 | 最大 5 個 / Knowledge Base |
| KB 最大ファイルサイズ | 50 MB / ファイル |
| Guardrails 数 | アカウントあたり最大 100 個 |
| Agents 同時セッション | アカウントあたり最大 1000 セッション |
| モデル呼び出し TPM | モデル・リージョン別（コンソールで確認）|
- **Provisioned Throughput でクォータ上限を回避可能**


---

# Fine-tuning データ要件数値表

| 項目 | 数値 |
|------|------|
| データ形式 | JSONL（UTF-8 エンコード）|
| 最小サンプル数（目安）| 50〜100 例（品質重視）|
| 推奨サンプル数 | 1000 例以上で安定 |
| 最大ファイルサイズ | 1 GB |
| epochs 範囲 | 1〜10 |
| batch_size 範囲 | 1〜256 |


---

# 埋め込みベクトル次元数一覧

| モデル | 次元数 | 最大入力 | 特記 |
|--------|--------|---------|------|
| Titan Embeddings Text V2 | 256 / 512 / 1024（選択）| 8192 tokens | 次元可変 |
| Titan Multimodal Embeddings V1 | 1024 | 画像 + テキスト | マルチモーダル |
| Cohere Embed v3 | 1024 | 512 tokens | 多言語・圧縮効率高 |
- **高次元**: 精度高 / 保存コスト大 / 検索速度低下
- **低次元**: 速く安価 / 微妙な意味差で精度低下
- **Titan V2**: 低次元を選ぶほどコスト削減・検索高速化可能


---

# SageMaker インスタンスタイプ比較

| インスタンス | GPU | GPU メモリ | 向く用途 |
|-----------|-----|----------|---------|
| ml.p3.2xlarge | 1× V100 | 16 GB | 小〜中規模学習 |
| ml.p4d.24xlarge | 8× A100 | 320 GB | 大規模 FT・分散学習 |
| ml.g5.xlarge | 1× A10G | 24 GB | 推論・軽量 FT |
| ml.g5.48xlarge | 8× A10G | 192 GB | 中〜大規模推論 |
| ml.inf2.xlarge | Inferentia2 | — | 低コスト高効率推論 |


---

# S3 / KMS / CloudTrail 制限値表

| サービス | 項目 | 制限値 |
|---------|------|--------|
| S3 | バケット数（デフォルト）| 100 / アカウント |
| S3 | オブジェクト最大サイズ | 5 TB |
| KMS | CMK 数 | 最大 100,000 / アカウント |
| CloudTrail | イベント履歴（コンソール表示）| 90 日 |
| CloudTrail | S3 保存ログ | 無制限（ライフサイクルで管理）|


---

<!-- _class: lead -->
# よく出るひっかけパターン

- スライド 88–93 | 間違えやすい選択肢のパターン
- RAG vs FT 誤選択 → Bedrock vs SageMaker 誤選択
- セキュリティ設定の落とし穴 → Guardrails の誤解
- トークン / コスト / レイテンシ の誤解パターン


---

# RAG vs Fine-tuning — 誤選択パターン

| 状況 | 誤答 | 正答 | 理由 |
|------|------|------|------|
| 最新ニュースへの対応が必要 | Fine-tuning | RAG | FT は静的、RAG はリアルタイム更新 |
| 専門業界の用語・文体が必要 | RAG | Fine-tuning | 語彙・スタイルは FT が効果的 |
| 学習データが 10 例しかない | Fine-tuning | RAG | FT には不十分（最低 50〜100 例）|
| Hallucination を主に軽減したい | Fine-tuning | RAG + Grounding | RAG の方が直接的効果大 |
- **鉄則**: 最新情報・大量文書 → RAG / スタイル・語彙 → Fine-tuning


---

# Bedrock vs SageMaker — 誤選択パターン

| 状況 | 誤答 | 正答 |
|------|------|------|
| カスタム NN アーキテクチャを学習したい | Bedrock | SageMaker |
| API だけで FM を素早く呼び出したい | SageMaker | Bedrock |
| 自前モデルをデプロイしてホストしたい | Bedrock | SageMaker |
| Llama 3 を手軽に試したい | SageMaker（管理過多）| Bedrock または JumpStart |
- **Bedrock**: API でマネージド FM を使うだけ / **SageMaker**: ML フルコントロール


---

# セキュリティ設定の落とし穴

- ❌ VPC エンドポイント = 暗号化 → ✅ ネットワーク分離のみ（暗号化は KMS で別途）
- ❌ S3 は自動暗号化される → ✅ SSE 設定が必要（SSE-S3 / SSE-KMS を明示設定）
- ❌ Deny と Allow が競合 → Allow 優先 → ✅ Explicit Deny が必ず優先
- ❌ Bedrock は顧客データで FM を再学習 → ✅ デフォルトでは使用しない
- ❌ CloudTrail は自動アラートを出す → ✅ CloudWatch Alarm の別途設定が必要
- ❌ KMS は無料 → ✅ CMK は月額 $1 + API 呼び出し料金（AWS Managed Key は無料）


---

# Guardrails 設定の誤解パターン

- ❌ Bedrock を使えば Guardrails が自動有効 → ✅ 明示的に作成・紐付けが必要
- ❌ Guardrails は Agents には適用できない → ✅ Agents にも適用可（別途設定）
- ❌ PII Redaction はテキスト全体を削除 → ✅ [NAME] 等にマスキング（ANONYMIZE）
- ❌ Grounding Check は RAG 専用 → ✅ 任意のコンテキスト付き回答に適用可
- ❌ Denied Topics は完全一致でマッチ → ✅ 意味的な類似性でトピックを判定


---

# トークン・コスト誤解パターン

- ❌ 入力と出力のトークン料金は同じ → ✅ 通常、出力の方が高コスト（2〜5倍）
- ❌ トークン数 = 単語数 → ✅ 日本語は 1 文字 ≈ 2〜3 トークン（英語の 2〜3 倍）
- ❌ Provisioned Throughput は常に On-demand より高い → ✅ 高スループット時は PT が安い
- ❌ Batch Inference はただ遅いだけ → ✅ 最大 50% コスト削減のメリットあり
- ❌ Streaming = 全体処理が速い → ✅ TTFT 改善のみ（合計処理時間は同じ）


---

# レイテンシ誤解パターン

- ❌ Provisioned Throughput = 低レイテンシ → ✅ スループット保証のみ（レイテンシ保証ではない）
- ❌ 大きい FM = 高精度 → 常に使うべき → ✅ タスクによっては小 FM + few-shot が効果的
- ❌ Temperature=0 で最速 → ✅ Temperature は速度に影響しない
- ❌ Streaming は全体を速くする → ✅ TTFT（最初のトークン時間）が改善するだけ
- ❌ VPC エンドポイント = レイテンシ増加 → ✅ 通常は同等またはわずかに低下


---

<!-- _class: lead -->
# 試験直前チェックリスト

- スライド 95–100 | 試験当日のセルフチェック
- Domain 別チェック → 試験戦略 → リソース → まとめ


---

# Domain 1 — セルフチェック

- [ ] AI / ML / DL / GenAI の違いを 1 文で説明できる
- [ ] 教師あり・教師なし・強化学習のユースケースを選べる
- [ ] Accuracy / Precision / Recall / F1 の違いを理解している
- [ ] 過学習・未学習の原因と対策を述べられる
- [ ] Rekognition / Comprehend / Textract の使い分けができる
- [ ] Transcribe / Translate / Polly を正しく選べる
- [ ] AWS AI サービスの 3 層（AI / ML / Framework）を理解している


---

# Domain 2–3 — セルフチェック

- [ ] Token / Context Window / Temperature の意味を説明できる
- [ ] Zero-shot / Few-shot / CoT を使い分けられる
- [ ] RAG の仕組みとコンポーネント（Chunking / Embedding / Retrieval）を説明できる
- [ ] RAG vs Fine-tuning の選択基準を言える
- [ ] Bedrock の主要機能（KB / Agents / Guardrails / Eval）を理解している
- [ ] カスタマイズ 4 択（Prompt / RAG / FT / Pre-training）を比較できる
- [ ] ベクトルDB の選択肢と特徴を知っている


---

# Domain 4–5 — セルフチェック

- [ ] 責任ある AI の 6 原則を言える
- [ ] Bedrock Guardrails の 5 フィルタ種別を知っている
- [ ] Hallucination の軽減手法（RAG / Grounding / CoT）を選べる
- [ ] 共有責任モデルの AI 版（AWS vs 顧客の責任境界）を説明できる
- [ ] Bedrock IAM アクション（InvokeModel 等）を知っている
- [ ] VPC エンドポイント ≠ 暗号化 の違いを理解している
- [ ] HIPAA / SOC2 の Bedrock 対応状況を把握している


---

# 試験当日の戦略

- **時間配分**: 170分 ÷ 65問 ≈ 2.6分/問（見直し時間を確保）
- **最初は全問ざっと確認**: 難問はフラグを立てて後回し
- **消去法**: 明らかに誤った選択肢（AWS 責任範囲外・サービス誤用）から除外
- **「最も適切」問題**: AWS Best Practice（最小権限 / マネージドサービス優先）を基準に
- **キーワード抽出**: コスト最小 / 最速 / セキュア / スケーラブル の制約を読む
- **サービス比較問題**: ユースケース・スキルレベル・コントロール粒度で判断


---

# 学習リソース一覧

- **公式ガイド**: AWS Certified Generative AI Developer – Professional 試験ガイド
- **AWS Skill Builder**: 公式オンラインコース（無料）+ 公式模擬試験（有料）
- **Bedrock ドキュメント**: Bedrock User Guide / API Reference（英語・公式）
- **AWS Well-Architected**: Machine Learning Lens — ベストプラクティス集
- **AWS re:Invent / YouTube**: GenAI / Bedrock セッション動画（無料）
- **BlackBelt Online Seminar**: 日本語の詳細技術資料（無料）


---

<!-- _class: lead -->
# まとめ — 合格に向けて

- **5 ドメイン × 100 枚で試験範囲を完全網羅**
- D3（FM 活用 30%）が最重要 → Bedrock / RAG / Agents を重点対策
- サービス選択: ユースケース・コスト・スキルレベル・コントロール粒度で判断
- セキュリティ: 共有責任 / 最小権限 / KMS + CloudTrail がセット
- **合格ライン: 700 / 1000（約 70%）**
- 自信を持って試験へ！Good luck! 🎯

