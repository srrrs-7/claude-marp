---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "OpenClaw完全解説"
footer: "© 2026 - エンジニア向け詳細解説"
style: |
  section {
    font-size: 1.0em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section h1 {
    font-size: 1.6em;
  }
  section h2 {
    font-size: 1.3em;
  }
  section ul li {
    margin-bottom: 0.2em;
  }
  
---

<!-- _class: lead -->
# OpenClaw完全解説

- 〜オープンソース自律AIエージェント〜
- 
- **対象:** エンジニア・開発者
- **内容:** 誕生の経緯 / アーキテクチャ / メモリ / スキル / セキュリティ / 未来
- 
- 🦞 *60日でOpenAIに買収されたオープンソースプロジェクトの全貌*


---

# 目次 (1/2)

- **1. OpenClawとは**  — 従来チャットボットとの違い
- **2. 誕生と沿革**  — Clawdbot → Moltbot → OpenClaw
- **3. アーキテクチャ** — Gateway / Agent Runtime / ハブ&スポーク
- **4. メモリシステム** — Markdown-as-Truth / ベクター+FTS5
- **5. スキル・ツール** — SKILL.md / ClawHub / サンドボックス


---

# 目次 (2/2)

- **6. インテグレーション** — WhatsApp / Telegram / Slack / Discord
- **7. セキュリティ** — CVE-2026-25253 / プロンプトインジェクション / ClawHavoc
- **8. ユースケース** — 個人生産性 / 開発 / ビジネス自動化
- **9. 現状・今後** — v2026.2.17 / OpenAI / 財団移行


---

# OpenClawとは何か

- **定義:** フリー＆オープンソースの自律AIエージェントフレームワーク
- **作者:** Peter Steinberger（オーストリア、13年選手のエンジニア）
- **公開:** 2025年11月（Clawdbot名で）→ 2026年1月30日にOpenClaw改名
- 
- **コアコンセプト:**
- - AIエージェントへの *インフラ* を提供（アプリではなく）
- - LLMは外部モデルを利用（Claude / GPT / DeepSeek）
- - ローカル実行・設定データもローカル保存


---

# 従来チャットボットとの違い

![w:850 center](assets/chatbot-vs-agent.svg)


---

# 作者 Peter Steinberger

- **経歴:**
- - オーストリア在住のソフトウェア開発者（13年のキャリア）
- - PSPDFKit（モバイルPDFライブラリ）の創業者
- - AIエージェントへの興味から「playground project」として開発開始
- 
- **思想:**
- - 「AIは新しいアプリではなく、既存アプリに埋め込まれるインフラ」
- - 2026年2月14日にOpenAI参画を発表
- - *"Build an agent that even my mum can use"*


---

# 名前の変遷タイムライン

![w:850 center](assets/name-timeline.svg)


---

# Moltbookとバイラル拡散の背景

- **Moltbook（Moltbotが動くmacBookの愛称）のバイラル要因:**
- - オープンソース無償公開 → 誰でもすぐ試せる
- - 実際に動く動画がSNSで爆発的に拡散
- - WhatsApp/iMessageからAIを操れる体験の新鮮さ
- 
- **数字の推移:**
- - 2026年1月末: GitHubスター100K超
- - 2026年2月2日: ★140K、Forks 20K
- - わずか60日でOpenAI買収対象に


---

# GitHubスター急成長

![w:820 center](assets/github-growth.svg)


---

# OpenAI買収・財団移行（2026/2/14-15）

- **2026年2月14日:** Steinberger、OpenAI参画を発表
- **2026年2月15日:** Sam Altman、X（旧Twitter）で正式確認
- 
- **条件・構成:**
- - Steinberger → OpenAIで「次世代パーソナルエージェント」開発をリード
- - OpenClawプロジェクト → 独立財団へ移行
- - OpenAI → 財団の金融スポンサーとして参画
- 
- **意義:** OpenCLIなどよりも1段階上の「パーソナルAI基盤」への進化


---

# Phase別進化ロードマップ

![w:850 center](assets/phase-roadmap.svg)


---

# 60日間の軌跡まとめ

| 日付 | 出来事 |
|------|--------|
| 2025.11 | Clawdbot 公開（WhatsAppリレー） |
| 2026.01.27 | Moltbot に改名（商標対応） |
| 2026.01.30 | OpenClaw に改名、モデル非依存化宣言 |
| 2026.02.02 | GitHub ★140K、Forks 20K達成 |
| 2026.02.14 | OpenAI参画・財団移行発表 |
| 2026.02.17 | v2026.2.17リリース（1Mトークン対応）|


---

# 全体アーキテクチャ概要

![w:850 center](assets/architecture-overview.svg)


---

# Gatewayとは（コントロールプレーン）

- **Gateway の役割:**
- - 全インターフェースからの入力を受け取る単一エントリポイント
- - 認証・セッション管理・ルーティング・アクセス制御を担当
- 
- **技術的特徴:**
- - ローカルで動作（外部依存なし）
- - WebSocket/HTTP両対応
- - `gatewayUrl` パラメータでクライアントが接続先を指定
- 
- ⚠️ **後述:** この `gatewayUrl` の検証不備がCVE-2026-25253の原因


---

# Agent Runtimeの処理フロー

![w:850 center](assets/agent-runtime-flow.svg)


---

# ハブ＆スポーク設計

![w:800 center](assets/hub-spoke.svg)


---

# 対応LLM一覧

- **モデル非依存設計 — 主要対応LLM:**
- 
| プロバイダー | モデル | 特徴 |
|-------------|--------|------|
| Anthropic | Claude Opus 4.6, Sonnet 4.6 | 1Mトークン対応 |
| OpenAI | GPT-4o, o3 | 幅広いツール対応 |
| DeepSeek | DeepSeek-V3 | コスト効率 |
| Google | Gemini 2.0 | マルチモーダル |
- 
- **設定:** `params.model` でモデルを指定、切り替えはconfig1行


---

# ローカル実行モデルの意義

- **なぜローカル実行か？**
- 
- - **プライバシー:** 設定データ・会話履歴がローカルに残る
- - **コスト制御:** API利用料は自分が直接管理
- - **カスタマイズ性:** ファイルシステム・ネットワーク・ローカルツールに直接アクセス
- - **オフライン耐性:** Gateway自体はLAN内で完結
- 
- **トレードオフ:**
- - セットアップコスト（Docker / API Key管理）
- - セキュリティ管理は自己責任


---

# Docker構成例

- **docker-compose.yml（基本構成）:**

```yaml
version: "3.9"
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    ports:
      - "3000:3000"     # Gateway
    volumes:
      - ./workspace:/workspace   # メモリ・設定
      - ./skills:/skills         # スキル
    environment:
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      TELEGRAM_BOT_TOKEN: ${TELEGRAM_BOT_TOKEN}
    restart: unless-stopped
```


---

# インターフェース一覧

- **対応インターフェース:**
- 
| インターフェース | 特徴 |
|----------------|------|
| WhatsApp | 最も普及、設定やや複雑 |
| Telegram Bot | セットアップ容易、推奨 |
| Discord Bot | 開発者コミュニティ向け |
| Slack App | ビジネス用途 |
| macOSネイティブ | メニューバー常駐 |
| Web UI | ブラウザベース管理画面 |
| CLI | スクリプト・自動化向け |


---

# メモリの基本思想「Markdown as Truth」

- **コアコンセプト:**
- - メモリ = `workspace/` 以下の **プレーンMarkdownファイル**
- - AIモデルが「記憶」するのは、ディスクに書かれた内容だけ
- - 人間が直接読み書き・バージョン管理できる
- 
- **メリット:**
- - 透明性: 何を覚えているかいつでも確認できる
- - ポータビリティ: gitで管理・バックアップ容易
- - 編集可能: 不要な記憶を手動削除できる
- 
- **スキル `claw-roam`:** 複数マシン間でワークスペースを同期


---

# メモリファイル構造

![w:850 center](assets/memory-structure.svg)


---

# ベクター検索 + FTS5 ハイブリッド

- **2種類の検索エンジンを組み合わせ:**
- 
- **ベクター検索（セマンティック）:**
- - SQLite + ベクター拡張で実現
- - 意味的類似度でチャンクを取得（〜400トークン単位）
- - 80トークンのオーバーラップで文脈連続性を確保
- 
- **FTS5（全文検索）:**
- - 完全一致キーワードの高速検索
- - ファイルパス・行番号付きで返却
- 
- **ハイブリッド:** 両結果を関連度スコアでマージして返却


---

# セマンティック検索の仕組み

![w:850 center](assets/semantic-search.svg)


---

# Embeddingプロバイダー比較

| プロバイダー | 精度 | コスト | オフライン |
|-------------|------|--------|-----------|
| OpenAI (text-embedding-3-large) | ★★★★★ | 有料 | ✗ |
| Voyage AI (voyage-3) | ★★★★★ | 有料 | ✗ |
| Google Gemini | ★★★★ | 有料 | ✗ |
| ローカルモデル (GGUF) | ★★★ | 無料 | ✓ |
- 
- **フォールバック:** ローカル不可時はリモートへ自動切替え


---

# メモリ管理コマンド例

- **チャットコマンドでメモリを操作:**

```bash
# メモリ追加
/memory add "プロジェクトXの締切は2026年3月31日"

# メモリ検索
/memory search "プロジェクトX"
# → projects.md:23 (score: 0.92)
# → MEMORY.md:156  (score: 0.87)

# メモリ削除
/memory delete projects.md:23

# 全メモリ表示
/memory list

# 1Mトークンコンテキスト有効化 (v2026.2.17+)
# config: params.context1m: true
```


---

# スキルシステムの概念

- **スキルとは:** OpenClawの機能を拡張するプラグインシステム
- 
- **特徴:**
- - 各スキルは `SKILL.md` ファイルで定義（フロントマター + 説明）
- - ランタイム要件（env vars / バイナリ）を宣言的に記述
- - チャットから `/skills install <skill-name>` で即インストール
- 
- **スキルの種類:**
- - **ツール型:** 特定APIを呼び出す（例: Google Calendar, Notion）
- - **メタ型:** Agentの動作自体を変更（例: claw-progressive-memory）
- - **ワークフロー型:** 複数ステップの自動化


---

# SKILL.mdフロントマター構造

- **スキル定義ファイルの構造:**

```yaml
---
name: my-skill
version: 1.0.0
description: "SkillのAI向け説明（エージェントが読む）"
author: your-name

requires:
  env:
    - MY_API_KEY          # 必須: 環境変数
    - OPTIONAL_KEY?       # 任意: ?付き
  binaries:
    - curl
    - node
  install:
    - npm install -g some-package

tools:
  - name: do_something
    description: "何かをする"
    parameters:
      - name: query
        type: string
        required: true
---
# スキルの説明（Markdownで記述）
```


---

# ClawHubスキルディレクトリ

![w:850 center](assets/skill-flow.svg)


---

# 主要スキル一覧

| スキル名 | 機能 |
|---------|------|
| `claw-progressive-memory` | メモリ管理メタスキル |
| `claw-roam` | マルチマシン同期 |
| `clawringhouse` | AIショッピング支援 |
| `continuity` | 非同期リフレクション・メモリ統合 |
| `context-anchor` | コンテキスト圧縮後の回復 |
| `browser` | Webブラウジング自動化 |
| `github` | PR / Issue 管理 |
| `calendar` | Google Calendar連携 |


---

# ツール実行サンドボックス

- **サンドボックスの仕組み:**
- - 各ツール呼び出しは分離された実行環境で動作
- - ファイルシステムアクセスは `workspace/` 内に限定（デフォルト）
- - ネットワークアクセスは設定で制限可能
- 
- **スキルの権限モデル:**
- - SKILL.md で必要権限を事前宣言
- - ユーザーがインストール時に明示的に承認
- - 未宣言の権限は自動ブロック
- 
- ⚠️ **注意:** サードパーティスキルのレビューは不十分（ClawHavoc問題）


---

# スキル開発フロー

![w:850 center](assets/skill-flow.svg)


---

# /subagents spawn コマンド（v2026.2.17+）

- **サブエージェントシステム:**
- - メインエージェントから子エージェントを起動できる新機能
- - チャットコマンドから決定論的に起動: `/subagents spawn <name>`
- 
- **ユースケース:**
- - 長時間タスクの並列実行（調査 + 作業 + 監視）
- - 専門化されたエージェント（コードレビュー専用 / リサーチ専用）
- - 失敗時のフォールバックエージェント
- 
- **技術的実装:** `anthropic-beta: context-1m-2025-08-07` ヘッダーで1Mコンテキスト有効化


---

# 対応プラットフォーム全体像

![w:680 center](assets/platform-hub.svg)


---

# Telegram / WhatsApp統合

- **Telegram（推奨・セットアップ容易）:**
- - BotFather で Bot Token取得 → `TELEGRAM_BOT_TOKEN` に設定
- - グループチャット・プライベートチャット両対応
- - コマンド `/help` で機能一覧表示
- 
- **WhatsApp（最も人気・設定複雑）:**
- - WhatsApp Business APIまたはQRコードスキャン方式
- - 公式API利用の場合はMeta承認が必要
- - Baileys（非公式ライブラリ）を使う方法もあるが利用規約注意


---

# Slack / Discord統合

- **Slack（ビジネス用途）:**
- - Slack Appを作成、Bot Tokenと Signing Secretを設定
- - チャンネル・DM両方に応答可能
- - ⚠️ **CVE-2026-24764:** Slackチャンネルのtopic/descriptionがプロンプトに混入する脆弱性あり
- 
- **Discord（開発者コミュニティ向け）:**
- - Discord Developer Portalでアプリ作成
- - サーバー全体またはDMで利用可能
- - スラッシュコマンド対応


---

# macOSアプリ・WebUI・CLI

- **macOSネイティブアプリ:**
- - メニューバー常駐でいつでもアクセス
- - iMessage / macOS通知連携
- - Apple Silicon最適化
- 
- **Web UI（ブラウザ管理画面）:**
- - `http://localhost:3000` でアクセス
- - スキル管理・メモリ閲覧・チャット
- 
- **CLI:**
- - `openclaw chat "タスク内容"` でスクリプト実行
- - CI/CDパイプラインへの組み込み可能


---

# 1Mトークンコンテキスト設定（v2026.2.17+）

- **Claude Opus 4.6 / Sonnet 4.6 対応の1Mコンテキスト:**

```yaml
# config.yaml でモデル設定
agent:
  model: claude-sonnet-4-6
  params:
    context1m: true    # ← これだけで1Mトークン有効化

# 内部実装: Anthropic APIヘッダーに自動追加
# anthropic-beta: context-1m-2025-08-07

# 効果: 非常に長い会話履歴・大量のドキュメントを
#       コンテキストに保持したまま処理可能
```


---

# なぜAIエージェントはセキュリティリスクが高いのか

- **AIエージェント特有のリスク要因:**
- 
- - **広い権限:** メール・ファイル・ブラウザ・APIに横断的にアクセス
- - **外部コンテンツ処理:** ウェブ・メール・ドキュメントの内容をそのまま処理
- - **自律実行:** ユーザー確認なしにアクションを起こせる
- - **スキルの信頼:** サードパーティスキルをほぼ無審査で実行
- 
- **OpenClaw特有の問題:**
- - 42,000件の無防備なインストールが2月初頭に発見
- - Gatewayがデフォルトで外部からアクセス可能な状態


---

# CVE-2026-25253: 1クリックRCE（CVSS 8.8）

- **脆弱性の概要:**
- - **種別:** Remote Code Execution（リモートコード実行）
- - **CVSS スコア:** 8.8（Critical）
- - **修正バージョン:** v2026.1.29
- 
- **原因:**
- - Control UIが `gatewayUrl` クエリパラメータを**検証せず**に使用
- - ページロード時に自動接続するため、リンクをクリックするだけで発動
- 
- **影響:**
- - 攻撃者のサーバーにトークンが送信される
- - 攻撃者がローカルGatewayに接続し、全機能を制御可能


---

# RCE攻撃フロー図

![w:850 center](assets/rce-attack-flow.svg)


---

# CVE-2026-24764: Slackプロンプトインジェクション

- **脆弱性の概要:**
- - **対象:** Slack統合を有効にしているOpenClaw
- - **攻撃ベクター:** Slackチャンネルのtopic/description（攻撃者が変更可能）
- 
- **攻撃シナリオ:**
- 1. 攻撃者がSlackチャンネルの説明に悪意ある指示を埋め込む
- 2. OpenClawがチャンネルメタデータをシステムプロンプトに取り込む
- 3. 埋め込まれた指示が実行される → RCE
- 
- **根本原因:** 信頼できるコンテキストと外部コンテンツを区別しない設計


---

# 間接プロンプトインジェクションの仕組み

![w:850 center](assets/prompt-injection.svg)


---

# ClawHavocサプライチェーン攻撃

- **ClawHavoc攻撃キャンペーンの概要（2026年2月発見）:**
- 
- - Koi Security研究者がClawHub全スキル（2,857件）を調査
- - **341件（12%）が悪意あるスキル**と判定
- - うち335件が単一の組織的キャンペーン（ClawHavoc）
- 
- **攻撃手法:**
- - 正規スキルに見せかけたデータ窃取コードを埋め込み
- - macOS/Windowsの両プラットフォームをターゲット
- - インストール後にバックグラウンドで動作
- 
- **問題:** ClawHubのスキルレビュー体制が不十分（CiscoのAIセキュリティ研究も指摘）


---

# 政府・機関の警告

- **ベルギーCCB（サイバーセキュリティセンター）:**
- - 2026年2月2日、CVE-2026-25253について**緊急アドバイザリ**発行
- - 「クリティカル」分類、即座のアップデートを勧告
- 
- **Cisco AIセキュリティ研究チーム:**
- - サードパーティスキルによるデータ窃取とプロンプトインジェクションを実証
- - スキルリポジトリの審査体制強化を求める
- 
- **Zenity研究者:**
- - 間接プロンプトインジェクションによる永続的バックドア化を実証
- - ソフトウェアの脆弱性なしに攻撃可能


---

# セキュアな運用ガイドライン

- **必須対応（今すぐ）:**
- - v2026.1.29以降に**必ずアップデート**（CVE-2026-25253修正済）
- - Gatewayをローカルネットワーク/VPNの外に晒さない
- 
- **推奨設定:**
- - スキルは公式・信頼できる発行者のもののみインストール
- - `GATEWAY_EXPOSED=false` で外部アクセスを無効化
- - 定期的に `workspace/` の内容をレビュー
- 
- **上級者向け:**
- - Dockerネットワーク分離でツール実行をサンドボックス化
- - Slack統合利用時はチャンネル権限を厳格に管理


---

# ユースケース全体マップ

![w:750 center](assets/usecase-map.svg)


---

# 個人生産性（メール・カレンダー・タスク）

- **最もよく使われるユースケース:**
- 
- **メール自動化:**
- - メールの要約・分類・返信下書き自動生成
- - 「重要なメールが来たらWhatsAppに通知」
- 
- **カレンダー管理:**
- - 自然言語で予定作成: 「来週月曜の午後2時に会議を入れて」
- - 会議前リマインダーの自動送信
- 
- **タスク・情報整理:**
- - Notion/Todoistとの連携
- - 読んだ記事の自動要約・メモリへの保存


---

# 開発者向けユースケース

- **エンジニアが活用している使い方:**
- 
- **コード生成・レビュー:**
- - GitHubのIssueをAgentに渡してPR下書き自動生成
- - 「このエラーを調べて修正案を出して」
- 
- **CI/CD連携:**
- - デプロイ完了/失敗をSlackやTelegramに通知
- - テスト失敗時の自動解析・報告
- 
- **ドキュメント:**
- - コード変更から自動でChangelog生成
- - API仕様書の自動更新


---

# ビジネス自動化・リサーチ

- **ビジネス自動化:**
- - CRMデータの自動更新・レポート生成
- - 請求書処理・経費精算の半自動化
- - 顧客問い合わせの分類・エスカレーション
- 
- **リサーチ支援:**
- - Web検索 → 情報収集 → 要約 → メモリ保存を一気通貫
- - 競合他社・市場動向の定期モニタリング
- - 学術論文の要約・整理
- 
- **向いているユーザー:** セットアップを厭わない技術者・エンジニア


---

# 実際の活用事例 Top 10

- 1. メールの自動要約・分類・返信下書き
- 2. Webリサーチ → 要約レポート作成
- 3. GitHub Issue / PR 管理自動化
- 4. カレンダー管理（自然言語で予定操作）
- 5. リマインダー・定期通知の設定
- 6. ファイル整理・ドキュメント検索
- 7. SNSモニタリング・競合調査
- 8. 家計・支出トラッキング
- 9. IoTデバイス制御・スマートホーム
- 10. コード生成・デバッグ支援


---

# v2026.2.17 最新機能まとめ

- **主要アップデート:**
- 
- **1. 1Mトークンコンテキスト対応（Anthropic）:**
- - Claude Opus 4.6 / Sonnet 4.6 で利用可能
- - `params.context1m: true` のみで有効化
- - 内部: `anthropic-beta: context-1m-2025-08-07` ヘッダー自動付与
- 
- **2. `/subagents spawn` コマンド:**
- - チャットから決定論的にサブエージェントを起動
- - 並列処理・専門化エージェントが実現可能
- 
- **3. その他:**
- - Gatewayのパフォーマンス改善（レイテンシ25%削減）


---

# OpenAI傘下での「誰でも使えるエージェント」ビジョン

- **Steinbergerのミッション（OpenAI参画後）:**
- 
- *"Build an agent that even my mum can use"*
- 
- **現状の課題（技術者以外には難しい）:**
- - Docker / API Key 管理が必要
- - セキュリティ設定は自己責任
- - トラブルシューティングにはログ解読が必要
- 
- **OpenAIとの組み合わせで何が変わるか:**
- - フロンティアモデルへの直接アクセス
- - コンシューマー向けUXの実現
- - フォールトトレラントな本番運用インフラ


---

# オープンソースファウンデーション移行の意義

- **移行の構造:**
- - OpenClawプロジェクト → 独立財団へ
- - OpenAI → 金融スポンサーとして参画（コントロールなし）
- - コミュニティガバナンスを維持
- 
- **開発者へのインパクト:**
- - ライセンスはオープンソースのまま維持
- - コントリビュートは引き続き歓迎
- - ロードマップの透明性が高まる見込み
- 
- **懸念点:**
- - OpenAIの影響力が間接的に及ぶ可能性
- - コミュニティの自律性が保たれるかは要観察


---

# OpenClawが示すAIエージェントの未来

![w:850 center](assets/future-vision.svg)


---

# まとめ

- **OpenClawの3つの本質:**
- 
- **① AIはインフラである**
- - 新しいアプリを使うのではなく、既存ツールにAIを埋め込む時代へ
- 
- **② オープンソースの爆発力**
- - 60日で★140K → OpenAI買収という異例の成長
- 
- **③ セキュリティは後付けできない**
- - エージェントの広い権限 × 外部コンテンツ処理 = 巨大な攻撃面
- - 設計段階からセキュリティを組み込む必要性


---

# 参考リンク

- **公式リソース:**
- - [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- - [OpenClaw ドキュメント](https://docs.openclaw.ai)
- - [ClawHub スキルディレクトリ](https://github.com/openclaw/clawhub)
- 
- **セキュリティ情報:**
- - [CVE-2026-25253](https://advisories.gitlab.com/pkg/npm/openclaw/CVE-2026-24764/)
- - [OpenClaw security issues | Giskard](https://www.giskard.ai/knowledge/openclaw-security-vulnerabilities-include-data-leakage-and-prompt-injection-risks)
- 
- **解説記事:**
- - [OpenClaw Architecture | Substack](https://ppaolo.substack.com/p/openclaw-system-architecture-overview)
- - [OpenAI Acquires OpenClaw | Leanware](https://www.leanware.co/insights/openai-openclaw-acquisition)

