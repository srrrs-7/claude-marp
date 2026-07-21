# 試験ブループリント（配点の唯一の正）

出典: `pdf/Claude_Certification_Practice_Exams*.pdf`（Anthropic 公式 Exam Guide v1.0 / effective July 2026 に基づく独立教材）。
全試験共通: スケールドスコア **100–1000 / 合格 720**（criterion-referenced）、120分、オンライン監督（OnVUE）または Pearson VUE テストセンター、クローズドブック（AI利用不可）。

> **名称ゆれ:** Architect – Foundations は資料により `CCA-F` と `CCAR-F` の両方が使われる。このスキルでは PDF に合わせて **CCA-F** を正とし、冊子の表紙に「別称 CCAR-F」と併記する。

| 試験 | 本番の問題数 | 価格 | 対象 |
|---|---|---|---|
| CCAO-F Claude Certified Associate – Foundations | 60 | $99 | Claude を業務ツールとして使う職種（ops / marketing / PM / 教育 / 広報） |
| CCDV-F Claude Certified Developer – Foundations | 53 | $125 | Claude をアプリに組み込んで出荷するエンジニア（API・ツール・MCP・エージェント・最適化・セキュリティ） |
| CCA-F Claude Certified Architect – Foundations | 60（**全問シナリオベース**） | $125 | エージェント構成と本番信頼性のトレードオフを決める設計者 |
| CCAR-P Claude Certified Architect – Professional | 63 | $175 | 本番 Claude システムをend-to-endで持つアーキテクト（推奨: 設計3年以上 / 本番LLM運用6ヶ月以上） |

---

## CCAO-F — Associate Foundations（60問）

| ID | ドメイン | 重み | 60問中 |
|---|---|---|---|
| D1 | Prompting & Task Execution | 14% | 8 |
| D2 | Output Evaluation & Validation | 21% | 13 |
| D3 | Product & Model Selection | 12% | 7 |
| D4 | Workflow Integration & Solution Design | 16% | 10 |
| D5 | Configuration & Knowledge Management | 12% | 7 |
| D6 | Governance, Risk & Responsible Use | 15% | 9 |
| D7 | Troubleshooting & Optimization | 10% | 6 |

**頻出の題材**: ハルシネーション検知と一次情報での裏取り / モデル階層の選び分け（Haiku↔Opus、extended thinking の要否）/ PII を含むデータの匿名化 / Projects・Artifacts・知識ソースの使い分け / 長すぎる会話の要約と持ち越し / 人間レビューが必須な場面の判断。

---

## CCDV-F — Developer Foundations（53問）

| ID | ドメイン | 重み | 53問中 |
|---|---|---|---|
| D1 | Agents & Workflows | 14.7% | 8 |
| D2 | Applications & Integration | **33.1%（最大）** | 18 |
| D3 | Claude Code | 3.1% | 2 |
| D4 | Eval, Testing & Debugging | 2.6% | 1 |
| D5 | Model Selection & Optimization | 16.8% | 9 |
| D6 | Prompt & Context Engineering | 11.0% | 6 |
| D7 | Security & Safety | 8.1% | 4 |
| D8 | Tools & MCPs | 10.6% | 5 |

**頻出の題材**: Message Batches API（大量・非同期・24時間枠・低コスト）/ prompt caching（静的プレフィックスを先頭に置く）/ streaming とリトライ+バックオフ / 構造化出力はツール定義＋クライアント側検証＋リトライ / プロンプトインジェクション（取得コンテンツを非信頼データとして隔離、最小権限）/ 再利用したい機能は MCP サーバ、単発は直接API。

---

## CCA-F — Architect Foundations（60問・全問シナリオベース）

| ID | ドメイン | 重み | 60問中 |
|---|---|---|---|
| D1 | Agentic Architecture & Orchestration | **27%（最大）** | 16 |
| D2 | Claude Code Configuration & Workflows | 20% | 12 |
| D3 | Prompt Engineering & Structured Output | 20% | 12 |
| D4 | Tool Design & MCP Integration | 18% | 11 |
| D5 | Context Management & Reliability | 15% | 9 |

**シナリオの作り方**: 1シナリオ = 業務システム1つ（例: カスタマーサポート解決エージェント、PRレビューエージェント、請求書処理）。ツール名を4つ程度定義し（`get_customer` / `lookup_order` / `process_refund` / `escalate_to_human` のように、**金銭・削除を伴う高影響ツールを必ず1つ混ぜる**）、そこに 5–8 問をぶら下げる。

**頻出の題材**: 無限ツールループ → ハーネス側の最大反復数＋エスカレーション / ツール説明の重複解消 / 高影響ツールの human-in-the-loop / 単一エージェントの文脈肥大 → supervisor + 専門サブエージェント（文脈隔離）/ 厳格JSON → スキーマ定義＋検証＋パースエラーを返す再試行 / CI では headless モード＋権限事前承認 / 静的プレフィックスの `cache_control`。

---

## CCAR-P — Architect Professional（63問）

| ID | ドメイン | 重み | 63問中 |
|---|---|---|---|
| D1 | Solution Design & Architecture | 17% | 11 |
| D2 | Models, Prompting & Context Engineering | 13% | 8 |
| D3 | Integration | **19%（最大）** | 12 |
| D4 | Evaluation, Testing & Optimization | 16% | 10 |
| D5 | Governance, Safety & Risk | 14% | 9 |
| D6 | Stakeholder Communication & Lifecycle Management | 14% | 9 |
| D7 | Developer Productivity & Operational Enablement | 7% | 4 |

**頻出の題材**: 「変わった箇所から疑う」障害切り分け（KB更新直後の誤答 → 再埋め込み・チャンク・インデックス鮮度）/ 使われていない高影響ツールは剥がす（最小権限）/ 静的→可変の順で並べて prompt caching / 「即時かつ100%正確に」という要求へのトレードオフ提示（2–3の運用点を実測値付きで示して事業側に選ばせる）/ 正解データ付き評価セットと accuracy・latency・cost・safety の指標 / 決定的ワークフロー＋例外だけ人間 / 共有機能=MCP、単発=直接API、他チームのエージェント=エージェント間連携。

CCAR-P は **非技術ステークホルダーとの対話（D6）** が独自ドメインとして存在するのが特徴。技術的に正しいだけでなく「説明・合意形成として最善か」を問う設問を必ず入れる。

---

## 問題数の割当計算

```
各ドメイン出題数 = round(N × 重み)
合計が N と合わない場合は、最大重みのドメインで ±調整する
どのドメインも最低1問は入れる（N ≥ ドメイン数 のとき）
```

複数選択（select TWO）は全体の **10–15%**。CCAO-F/CCDV-F では D2 系（検証・統合）に、CCA-F/CCAR-P では設計選択の設問に置くと自然。
