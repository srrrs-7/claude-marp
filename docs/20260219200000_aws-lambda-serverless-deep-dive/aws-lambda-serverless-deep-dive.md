---
marp: true
theme: gaia
size: 16:9
paginate: true
style: |
  /* ── Overflow prevention ──────────────────────────────── */
    section { overflow: hidden; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.7;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Images (all, not only SVG) ───────────────────────── */
    section img:not([src$=".svg"]) {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    section svg {
      max-height: 70vh;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    section img[src$=".svg"] {
      max-height: 70vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  
    /* ── Code blocks ──────────────────────────────────────── */
    section pre { overflow: hidden; }
    section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }
  
    /* ── Tables ───────────────────────────────────────────── */
    section table {
      font-size: 0.78em;
      width: 100%;
      overflow: hidden;
      word-break: break-word;
      border-collapse: collapse;
    }
    section th, section td {
      padding: 0.35em 0.6em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
  
    /* ── Subtitle / BLUF callout (blockquote) ─────────────── */
    section blockquote {
      font-size: 0.88em;
      line-height: 1.55;
      padding: 0.25em 0.8em;
      margin: 0.15em 0 0.35em;
      opacity: 0.88;
      overflow-wrap: break-word;
    }
    section blockquote p { margin: 0; }
  
---

<!-- _class: lead -->
# AWS Lambda / Serverless Deep Dive

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="38" font-family="sans-serif" font-size="20" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 実行フロー</text><rect x="10" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="80" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Trigger</text><text x="80" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(API GW / SQS / S3)</text><rect x="170" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="240" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Cold Start</text><text x="240" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Init Phase)</text><rect x="370" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="440" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Handler</text><text x="440" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Invoke Phase)</text><rect x="570" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="640" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Response</text><text x="640" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Return)</text><line x1="130" y1="105" x2="160" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="170,105 160,110 160,100" fill="#f9a825"/><line x1="290" y1="105" x2="360" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,105 360,110 360,100" fill="#f9a825"/><line x1="490" y1="105" x2="560" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="570,105 560,110 560,100" fill="#f9a825"/><rect x="170" y="180" width="480" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="410" y="210" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="normal">ウォームスタート: Init をスキップ → Handler へ直接</text><text x="410" y="228" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">コンテナ再利用 → グローバル変数・DB接続が保持される</text><rect x="30" y="280" width="740" height="90" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Init フェーズ (コールドスタート時のみ)</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Extension init → Runtime init → Function init (import / DB接続 / 設定読み込み)</text><text x="400" y="348" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタート: 数百ms〜数秒 | ウォームスタート: 数ms〜数十ms</text></svg>
- パフォーマンス最適化と実践アーキテクチャパターン
- 
- 対象: バックエンド開発者
- 難易度: 中〜上級
- 所要時間: 120分


---

# 目次

> *Lambda基礎・コールドスタート最適化・アーキテクチャパターンの3部構成*

- **Part 1** — Lambda基礎・内部アーキテクチャ
- **Part 2** — コールドスタート・パフォーマンス最適化
- **Part 3** — サーバーレスアーキテクチャパターン
- **Part 4** — オブザーバビリティ
- **Part 5** — セキュリティ・CI/CD
- **まとめ** — 決定マトリクス・参考リソース


---

# このセッションの学習目標

> *内部実行モデル・コールドスタート・本番アーキテクチャパターンを習得する目標*

- Lambda内部の実行モデルと制約を理解する
- コールドスタートのメカニズムと最適化手法をマスター
- 本番レベルのサーバーレスアーキテクチャパターンを習得
- X-Ray・Lambda Powertoolsによるオブザーバビリティ実装
- セキュリティ・コスト最適化のベストプラクティスを実践


---

# なぜ今サーバーレスなのか

> *インフラ管理ゼロ・使った分だけ課金・自動スケーリングの3要素がサーバーレスの本質*

- **インフラ管理ゼロ** — OS・パッチ・スケーリングはAWS管理
- **使った分だけ課金** — アイドル時間のコストなし
- **自動スケーリング** — リクエスト数に応じて瞬時に拡張
- **高可用性** — 複数AZで自動的に冗長化
- **イベント駆動** — 非同期処理・マイクロサービス親和性
- Lambda 月間1億リクエストまで無料枠あり


---

<!-- _class: lead -->
# Part 1: Lambda基礎・内部アーキテクチャ

- 実行環境の仕組みを深く理解する


---

# AWS Lambdaとは

> *FaaSは最大15分でコンテナ起動後停止—実行モデルを理解して設計する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="38" font-family="sans-serif" font-size="20" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 実行フロー</text><rect x="10" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="80" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Trigger</text><text x="80" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(API GW / SQS / S3)</text><rect x="170" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="240" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Cold Start</text><text x="240" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Init Phase)</text><rect x="370" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="440" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Handler</text><text x="440" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Invoke Phase)</text><rect x="570" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="640" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Response</text><text x="640" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Return)</text><line x1="130" y1="105" x2="160" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="170,105 160,110 160,100" fill="#f9a825"/><line x1="290" y1="105" x2="360" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,105 360,110 360,100" fill="#f9a825"/><line x1="490" y1="105" x2="560" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="570,105 560,110 560,100" fill="#f9a825"/><rect x="170" y="180" width="480" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="410" y="210" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="normal">ウォームスタート: Init をスキップ → Handler へ直接</text><text x="410" y="228" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">コンテナ再利用 → グローバル変数・DB接続が保持される</text><rect x="30" y="280" width="740" height="90" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Init フェーズ (コールドスタート時のみ)</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Extension init → Runtime init → Function init (import / DB接続 / 設定読み込み)</text><text x="400" y="348" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタート: 数百ms〜数秒 | ウォームスタート: 数ms〜数十ms</text></svg>
- **Function as a Service (FaaS)** — コードをデプロイするだけで実行可能
- リクエストに応じてコンテナを起動、処理後に停止
- **最大実行時間**: 15分（タイムアウト設定可能）
- **最大メモリ**: 10,240 MB（vCPUはメモリに比例）
- **最大パッケージサイズ**: 250MB (ZIP展開後) / 10GB (コンテナ)
- サポートランタイム: Node.js, Python, Java, Go, .NET, Ruby, カスタム


---

# Lambda実行環境の構造

> *HostEC2→Firecracker MicroVM→実行環境の3層構造がLambdaの分離モデル*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="38" font-family="sans-serif" font-size="20" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 実行フロー</text><rect x="10" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="80" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Trigger</text><text x="80" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(API GW / SQS / S3)</text><rect x="170" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="240" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Cold Start</text><text x="240" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Init Phase)</text><rect x="370" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="440" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Handler</text><text x="440" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Invoke Phase)</text><rect x="570" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="640" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Response</text><text x="640" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Return)</text><line x1="130" y1="105" x2="160" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="170,105 160,110 160,100" fill="#f9a825"/><line x1="290" y1="105" x2="360" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,105 360,110 360,100" fill="#f9a825"/><line x1="490" y1="105" x2="560" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="570,105 560,110 560,100" fill="#f9a825"/><rect x="170" y="180" width="480" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="410" y="210" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="normal">ウォームスタート: Init をスキップ → Handler へ直接</text><text x="410" y="228" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">コンテナ再利用 → グローバル変数・DB接続が保持される</text><rect x="30" y="280" width="740" height="90" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Init フェーズ (コールドスタート時のみ)</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Extension init → Runtime init → Function init (import / DB接続 / 設定読み込み)</text><text x="400" y="348" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタート: 数百ms〜数秒 | ウォームスタート: 数ms〜数十ms</text></svg>
- **ホストEC2** → **Firecracker MicroVM** → **実行環境**
- 実行環境は1関数インスタンス専用（マルチテナント共有なし）
- **Init フェーズ**: ランタイム起動 + 初期化コード実行
- **Invoke フェーズ**: ハンドラー関数実行
- **Shutdown フェーズ**: クリーンアップ処理
- ウォームコンテナ再利用 → グローバル変数・DB接続が保持される


---

# Firecracker MicroVM

> *Firecrackerは125ms以下で起動するKVMベースの軽量仮想化—AWS内製のOSS*

- AWSが開発したオープンソースの軽量仮想化技術
- **KVM**ベースで起動時間 **125ms以下**を実現
- 最小限のデバイスモデル（セキュリティサーフェスを最小化）
- Lambda・Fargate両方で採用
- 各実行環境は独立したMicroVM → 他テナントからの隔離保証
- メモリオーバーヘッド最小（VMよりも軽量）


---

# Lambda ライフサイクル詳解（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="38" font-family="sans-serif" font-size="20" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 実行フロー</text><rect x="10" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="80" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Trigger</text><text x="80" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(API GW / SQS / S3)</text><rect x="170" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="240" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Cold Start</text><text x="240" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Init Phase)</text><rect x="370" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="440" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Handler</text><text x="440" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Invoke Phase)</text><rect x="570" y="70" width="140" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="640" y="108" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="bold">Response</text><text x="640" y="126" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">(Return)</text><line x1="130" y1="105" x2="160" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="170,105 160,110 160,100" fill="#f9a825"/><line x1="290" y1="105" x2="360" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,105 360,110 360,100" fill="#f9a825"/><line x1="490" y1="105" x2="560" y2="105" stroke="#f9a825" stroke-width="2.5"/><polygon points="570,105 560,110 560,100" fill="#f9a825"/><rect x="170" y="180" width="480" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="410" y="210" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="normal">ウォームスタート: Init をスキップ → Handler へ直接</text><text x="410" y="228" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">コンテナ再利用 → グローバル変数・DB接続が保持される</text><rect x="30" y="280" width="740" height="90" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Init フェーズ (コールドスタート時のみ)</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Extension init → Runtime init → Function init (import / DB接続 / 設定読み込み)</text><text x="400" y="348" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタート: 数百ms〜数秒 | ウォームスタート: 数ms〜数十ms</text></svg>
- **1. INIT** (コールドスタート時のみ)
-   - Extension init → Runtime init → Function init
- **2. INVOKE**


---

# Lambda ライフサイクル詳解（2/2）

> *INVOKE→SHUTDOWNのライフサイクルを理解しInit処理の最適化方針を決める*

-   - Lambda サービスからイベントを受信
-   - ハンドラー実行 → レスポンス返却
- **3. SHUTDOWN** (コンテナ停止時)
-   - Extensions に SHUTDOWN シグナル送信


---

# イベントソースとInvoke種別

> *同期/非同期/ストリームの3呼び出し種別で設計パターンが異なる*

- <svg viewBox="0 0 800 375" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="375" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda イベントソース種別</text><rect x="70" y="55" width="190" height="220" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="165" y="80" font-family="sans-serif" font-size="11" fill="#1565c0" text-anchor="middle" font-weight="bold">同期 (Request-Response)</text><rect x="85" y="95" width="160" height="34" fill="#0d1b2a" stroke="#1565c0" stroke-width="1.5" rx="5"/><text x="165" y="117" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">API Gateway</text><rect x="85" y="139" width="160" height="34" fill="#0d1b2a" stroke="#1565c0" stroke-width="1.5" rx="5"/><text x="165" y="161" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">ALB</text><rect x="85" y="183" width="160" height="34" fill="#0d1b2a" stroke="#1565c0" stroke-width="1.5" rx="5"/><text x="165" y="205" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda URL</text><rect x="85" y="227" width="160" height="34" fill="#0d1b2a" stroke="#1565c0" stroke-width="1.5" rx="5"/><text x="165" y="249" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">Cognito Triggers</text><rect x="300" y="55" width="190" height="220" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="395" y="80" font-family="sans-serif" font-size="11" fill="#6a1b9a" text-anchor="middle" font-weight="bold">非同期 (Event)</text><rect x="315" y="95" width="160" height="34" fill="#0d1b2a" stroke="#6a1b9a" stroke-width="1.5" rx="5"/><text x="395" y="117" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">S3</text><rect x="315" y="139" width="160" height="34" fill="#0d1b2a" stroke="#6a1b9a" stroke-width="1.5" rx="5"/><text x="395" y="161" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">SNS</text><rect x="315" y="183" width="160" height="34" fill="#0d1b2a" stroke="#6a1b9a" stroke-width="1.5" rx="5"/><text x="395" y="205" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">EventBridge</text><rect x="315" y="227" width="160" height="34" fill="#0d1b2a" stroke="#6a1b9a" stroke-width="1.5" rx="5"/><text x="395" y="249" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">SES</text><rect x="530" y="55" width="190" height="220" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="625" y="80" font-family="sans-serif" font-size="11" fill="#2e7d32" text-anchor="middle" font-weight="bold">ポーリング (Stream)</text><rect x="545" y="95" width="160" height="34" fill="#0d1b2a" stroke="#2e7d32" stroke-width="1.5" rx="5"/><text x="625" y="117" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS</text><rect x="545" y="139" width="160" height="34" fill="#0d1b2a" stroke="#2e7d32" stroke-width="1.5" rx="5"/><text x="625" y="161" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">Kinesis</text><rect x="545" y="183" width="160" height="34" fill="#0d1b2a" stroke="#2e7d32" stroke-width="1.5" rx="5"/><text x="625" y="205" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">DynamoDB Streams</text><rect x="545" y="227" width="160" height="34" fill="#0d1b2a" stroke="#2e7d32" stroke-width="1.5" rx="5"/><text x="625" y="249" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">MSK (Kafka)</text><rect x="50" y="295" width="700" height="60" fill="#0a0f1c" stroke="#555577" stroke-width="1.5" rx="6"/><text x="400" y="318" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">ポーリング: Lambda側が自動ポーリング → バッチ処理</text><text x="400" y="338" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">非同期: 内部キューでバッファリング → 失敗時は最大2回リトライ + DLQ</text></svg>
- **同期 (RequestResponse)**: API Gateway, ALB, Lambda URL
-   - 呼び出し元がレスポンスを待機
- **非同期 (Event)**: S3, SNS, EventBridge
-   - 内部キューでバッファリング → 最大2回リトライ
- **ポーリング (Stream)**: SQS, Kinesis, DynamoDB Streams
-   - Lambda側でポーリング → バッチ処理


---

# 対応ランタイム一覧 (2026)

| ランタイム | バージョン | SnapStart |
|-----------|-----------|-----------|
| Node.js | 20.x, 22.x | - |
| Python | 3.12, 3.13 | - |
| Java | 21 (Corretto) | ✅ |
| .NET | 8 | ✅ |
| カスタム (provided.al2023) | any | - |


---

# メモリ・CPU・タイムアウト設定

> *メモリが1769MBで1vCPU確保—コスト最適化はメモリとCPU比例関係を活かす*

- **メモリ**: 128MB〜10,240MB（1MB単位で設定）
- **vCPU**: メモリに比例して割り当て（1,769MB = 1vCPU）
- **タイムアウト**: 1秒〜15分（デフォルト3秒）
- **エフェメラルストレージ**: 512MB〜10,240MB (/tmp)
- メモリ増加 = CPU増加 = 処理速度向上（コスト効率が改善することも）
- → Lambda Power Tuningで最適値を計測すべき


---

# Lambda権限モデル

> *最小権限原則で関数ごとに専用IAMロールを作成—過剰権限は攻撃面を拡大*

- **実行ロール (Execution Role)**
-   - Lambdaが他AWSサービスを呼び出すための権限
-   - AWSLambdaBasicExecutionRole（最低限必要）
- **リソースポリシー (Resource Policy)**
-   - 誰がこの関数を呼び出せるかを制御
-   - API Gateway, S3, EventBridgeからのInvokeを許可
- 最小権限の原則: 各関数に専用ロールを作成


---

# Lambda Layer

> *最大5レイヤー・合計250MBの制約内で共通ライブラリを複数関数で共有*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Layers アーキテクチャ</text><rect x="60" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="150" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">注文処理</text><text x="150" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="280" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">通知</text><text x="370" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="500" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="590" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">集計</text><text x="590" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="40" y="165" width="720" height="80" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="400" y="200" font-family="sans-serif" font-size="14" fill="#e91e63" text-anchor="middle" font-weight="bold">Layer 1: 共通ライブラリ (AWS SDK, boto3, requests…)</text><text x="400" y="220" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">複数関数で共有 / デプロイサイズ削減 / 最大 5 レイヤーまで付与可能</text><rect x="40" y="260" width="720" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="400" y="290" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="normal">Layer 2: ML モデル / カスタムランタイム / Lambda Extensions</text><text x="400" y="310" font-family="sans-serif" font-size="12" fill="#888899" text-anchor="middle" font-weight="normal">ZIP展開後合計 250MB 上限 (コンテナなら 10GB)</text><line x1="150" y1="130" x2="150" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="150,165 145,155 155,155" fill="#f9a825"/><line x1="370" y1="130" x2="370" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,165 365,155 375,155" fill="#f9a825"/><line x1="590" y1="130" x2="590" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="590,165 585,155 595,155" fill="#f9a825"/></svg>
- 共通ライブラリを複数関数で共有する仕組み
- **最大5レイヤー**を1関数に付与可能
- 展開後の合計サイズ上限: **250MB**
- AWS提供レイヤー: Lambda Insights Extension など
- ユースケース: AWS SDK、共通ユーティリティ、ML モデル
- デプロイ速度向上（関数本体を小さく保てる）


---

# Lambda Layer（コード例）

```bash
# LayerのZIP構造（Pythonの例）
python/
└── lib/
    └── python3.12/
        └── site-packages/
            ├── boto3/
            └── requests/
```


---

# Lambda Extensions

> *内部/外部Extensionで監視・セキュリティ・設定管理をサイドカーとして実装*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Layers アーキテクチャ</text><rect x="60" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="150" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">注文処理</text><text x="150" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="280" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">通知</text><text x="370" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="500" y="60" width="180" height="70" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="590" y="90" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">集計</text><text x="590" y="108" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">関数</text><rect x="40" y="165" width="720" height="80" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="400" y="200" font-family="sans-serif" font-size="14" fill="#e91e63" text-anchor="middle" font-weight="bold">Layer 1: 共通ライブラリ (AWS SDK, boto3, requests…)</text><text x="400" y="220" font-family="sans-serif" font-size="12" fill="#ccccdd" text-anchor="middle" font-weight="normal">複数関数で共有 / デプロイサイズ削減 / 最大 5 レイヤーまで付与可能</text><rect x="40" y="260" width="720" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="400" y="290" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="normal">Layer 2: ML モデル / カスタムランタイム / Lambda Extensions</text><text x="400" y="310" font-family="sans-serif" font-size="12" fill="#888899" text-anchor="middle" font-weight="normal">ZIP展開後合計 250MB 上限 (コンテナなら 10GB)</text><line x1="150" y1="130" x2="150" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="150,165 145,155 155,155" fill="#f9a825"/><line x1="370" y1="130" x2="370" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="370,165 365,155 375,155" fill="#f9a825"/><line x1="590" y1="130" x2="590" y2="155" stroke="#f9a825" stroke-width="2.5"/><polygon points="590,165 585,155 595,155" fill="#f9a825"/></svg>
- 関数の実行環境に追加プロセスを起動する機能
- **内部Extension**: 関数と同じプロセス内で動作
- **外部Extension**: 独立プロセスとして並列動作
- ユースケース: APM エージェント、ログ転送、セキュリティスキャン
- DataDog, Dynatrace, New Relic などが対応
- 注意: 実行時間・メモリをExtensionも消費する


---

# Lambda SnapStart (Java/DotNET)

> *SnapStartはデプロイ時にInit完了スナップショットを作成—Java/.NETのコールドスタートを激減*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート vs ウォームスタート タイムライン</text><text x="20" y="80" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">コールド</text><rect x="110" y="58" width="80" height="34" fill="#3949ab" rx="4"/><text x="150" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">MicroVM</text><rect x="192" y="58" width="120" height="34" fill="#1565c0" rx="4"/><text x="252" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Runtime Init</text><rect x="314" y="58" width="100" height="34" fill="#0277bd" rx="4"/><text x="364" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Func Init</text><rect x="416" y="58" width="200" height="34" fill="#f9a825" rx="4"/><text x="516" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Handler実行</text><text x="628" y="80" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text><text x="20" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">ウォーム</text><rect x="110" y="128" width="200" height="34" fill="#f9a825" rx="4"/><text x="210" y="149" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Handler実行のみ</text><text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text><rect x="110" y="200" width="580" height="100" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="225" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート軽減策</text><text x="130" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• SnapStart (Java/.NET) → Init をスキップ</text><text x="130" y="264" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• Provisioned Concurrency → 常時ウォーム確保</text><text x="130" y="282" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• 軽量ランタイム (Python/Go/Rust) → Init 短縮</text><text x="130" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• バンドル最小化 → 初期化コード削減</text></svg>
- JVM初期化の時間を短縮するスナップショット機能
- **仕組み**: デプロイ時にInit完了状態をスナップショット化
- 呼び出し時はスナップショットから再開 → Init不要
- **効果**: コールドスタートを最大90%削減
- 対応: Java 11/17/21 (Corretto), .NET 8
- **注意**: ユニークID/乱数はスナップショット後に再生成が必要


---

# ARM64 (Graviton2) vs x86_64

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
| 比較項目 | Graviton2 (arm64) | x86_64 |
|---------|-------------------|--------|
| コスト | **20%安い** | 基準 |
| パフォーマンス | 同等〜最大34%高速 | 基準 |
| 対応ランタイム | Node.js, Python, Java, Go, .NET | 全て |
| ネイティブバイナリ | arm64ビルドが必要 | x86_64 |
- 新規プロジェクトはGraviton2を推奨（コスト・性能ともに優位）


---

# コンテナイメージデプロイ

> *最大10GBのDockerイメージで既存コンテナ資産をLambdaにそのまま移行可能*

- 最大10GBのDockerイメージをLambdaにデプロイ可能
- AWS提供ベースイメージ (public.ecr.aws/lambda/*) を推奨
- **Lambda Runtime Interface Client (RIC)** が必要
- ECRにpush → Lambda関数のイメージURIを更新
- コールドスタートはZIPより若干長い傾向
- 大きなML モデル・複雑な依存関係に有効


---

# コンテナイメージデプロイ（コード例）

```dockerfile
FROM public.ecr.aws/lambda/python:3.12
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
CMD ["app.handler"]
```


---

# バージョン管理とエイリアス

> *$LATEST+不変バージョン+エイリアスでBlue/Green・カナリアリリースを実現*

- <svg viewBox="0 0 800 385" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="385" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SAM / CDK CI/CD デプロイパイプライン</text><rect x="5" y="85" width="110" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Code Push</text><text x="60" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Git)</text><rect x="155" y="85" width="110" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="210" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">CodeBuild</text><text x="210" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Test+Build)</text><rect x="325" y="85" width="110" height="90" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="380" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">SAM Package</text><text x="380" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">/ CDK Synth</text><rect x="490" y="85" width="110" height="90" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="8"/><text x="545" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Canary</text><text x="545" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Deploy 10%</text><rect x="645" y="85" width="110" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="700" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Production</text><text x="700" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">100%</text><line x1="115" y1="130" x2="145" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="155,130 145,135 145,125" fill="#f9a825"/><line x1="265" y1="130" x2="315" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="325,130 315,135 315,125" fill="#f9a825"/><line x1="435" y1="130" x2="480" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="490,130 480,135 480,125" fill="#f9a825"/><line x1="600" y1="130" x2="635" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,130 635,135 635,125" fill="#f9a825"/><rect x="490" y="240" width="180" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="580" y="265" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">CloudWatch Alarm</text><text x="580" y="283" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">エラー率監視 → 自動ロールバック</text><line x1="580" y1="175" x2="580" y2="230" stroke="#e91e63" stroke-width="2.5"/><polygon points="580,240 575,230 585,230" fill="#e91e63"/><rect x="40" y="240" width="200" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="140" y="265" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Pre/Post Traffic</text><text x="140" y="283" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">Hooks: テスト Lambda</text><line x1="490" y1="265" x2="260" y2="265" stroke="#90caf9" stroke-width="2.5"/><polygon points="250,265 260,260 260,270" fill="#90caf9"/><rect x="40" y="315" width="720" height="50" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="340" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">DeploymentPreference: Canary10Percent5Minutes / Linear10PercentEvery1Minute</text></svg>
- **バージョン**: `$LATEST` + 不変バージョン番号 (1, 2, 3...)
- **エイリアス**: バージョンに付ける名前 (prod, staging, v2)
- **トラフィック分割**: エイリアスで2バージョンに重み付け配信
- カナリアデプロイ: 10%を新バージョンへ → 問題なければ100%
- API Gatewayのステージとエイリアスをマッピングするパターンが定番


---

# バージョン管理とエイリアス（コード例）

```bash
aws lambda update-alias \
  --function-name my-function \
  --name prod \
  --function-version 5 \
  --routing-config \
    AdditionalVersionWeights={"4"=0.1}
```


---

# 同時実行数とスロットリング

> *デフォルト1000同時実行のアカウント制限—予約とProvisionedで本番を守る*

- <svg viewBox="0 0 800 345" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="345" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 同時実行数モデル</text><rect x="40" y="60" width="720" height="50" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="400" y="82" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">アカウント同時実行上限: 1,000 (デフォルト) — 増枠申請可</text><text x="400" y="98" font-family="sans-serif" font-size="11" fill="#888899" text-anchor="middle" font-weight="normal">← リージョン単位</text><rect x="50" y="130" width="220" height="120" fill="#1a237e" stroke="#3949ab" stroke-width="2" rx="8"/><text x="160" y="155" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Reserved</text><text x="160" y="175" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Concurrency</text><text x="160" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">重要関数の下限確保</text><text x="160" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">他関数から隔離</text><text x="160" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">上限制限にも使用可</text><rect x="290" y="130" width="220" height="120" fill="#0d47a1" stroke="#1565c0" stroke-width="2" rx="8"/><text x="400" y="155" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Provisioned</text><text x="400" y="175" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Concurrency</text><text x="400" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">常時ウォーム確保</text><text x="400" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタートほぼゼロ</text><text x="400" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">追加コストあり</text><rect x="530" y="130" width="220" height="120" fill="#1b5e20" stroke="#2e7d32" stroke-width="2" rx="8"/><text x="640" y="165" font-family="sans-serif" font-size="13" fill="#81c784" text-anchor="middle" font-weight="bold">Unreserved</text><text x="640" y="195" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">残りの同時実行枠</text><text x="640" y="215" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">共有プール</text><text x="640" y="235" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリングあり</text><rect x="40" y="270" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="295" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">バースト制限: 最初の1分 +500〜3,000インスタンス/分 (リージョン依存)</text><text x="400" y="313" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリング時: 同期→ HTTP 429 / 非同期→ リトライキュー</text></svg>
- **同時実行上限**: デフォルト1,000（アカウントリージョン単位）
- **予約同時実行 (Reserved)**: 特定関数に上限を確保・制限
- **プロビジョニング済み同時実行**: ウォームインスタンスを事前確保
- スロットリング発生時: 同期→429エラー、非同期→リトライ
- 重要関数には Reserved Concurrency で下限確保
- バースト制限: 最初の1分間は+500〜3,000インスタンス/分


---

<!-- _class: lead -->
# Part 2: コールドスタート・パフォーマンス最適化

- レイテンシを制する者がサーバーレスを制す


---

# コールドスタートとウォームスタートの違い

> *新コンテナ起動が数百ms〜数秒のコールドスタートvsウォームのミリ秒応答の差*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート vs ウォームスタート タイムライン</text><text x="20" y="80" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">コールド</text><rect x="110" y="58" width="80" height="34" fill="#3949ab" rx="4"/><text x="150" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">MicroVM</text><rect x="192" y="58" width="120" height="34" fill="#1565c0" rx="4"/><text x="252" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Runtime Init</text><rect x="314" y="58" width="100" height="34" fill="#0277bd" rx="4"/><text x="364" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Func Init</text><rect x="416" y="58" width="200" height="34" fill="#f9a825" rx="4"/><text x="516" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Handler実行</text><text x="628" y="80" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text><text x="20" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">ウォーム</text><rect x="110" y="128" width="200" height="34" fill="#f9a825" rx="4"/><text x="210" y="149" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Handler実行のみ</text><text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text><rect x="110" y="200" width="580" height="100" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="225" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート軽減策</text><text x="130" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• SnapStart (Java/.NET) → Init をスキップ</text><text x="130" y="264" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• Provisioned Concurrency → 常時ウォーム確保</text><text x="130" y="282" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• 軽量ランタイム (Python/Go/Rust) → Init 短縮</text><text x="130" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• バンドル最小化 → 初期化コード削減</text></svg>
- **コールドスタート**: 新しいコンテナの起動が必要な場合
-   Init: ランタイム起動 + 初期化コード → **数百ms〜数秒**
- **ウォームスタート**: 既存コンテナを再利用
-   ハンドラーのみ実行 → **数ms〜数十ms**
- コンテナは最後の呼び出しから約**5〜15分**で廃棄
- 並列リクエスト増加時も新コンテナが起動（コールドスタート）


---

# コールドスタートの構成要素

> *MicroVM起動+ランタイム初期化+関数初期化コードの3段階がコールドスタートの内訳*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート vs ウォームスタート タイムライン</text><text x="20" y="80" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">コールド</text><rect x="110" y="58" width="80" height="34" fill="#3949ab" rx="4"/><text x="150" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">MicroVM</text><rect x="192" y="58" width="120" height="34" fill="#1565c0" rx="4"/><text x="252" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Runtime Init</text><rect x="314" y="58" width="100" height="34" fill="#0277bd" rx="4"/><text x="364" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Func Init</text><rect x="416" y="58" width="200" height="34" fill="#f9a825" rx="4"/><text x="516" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Handler実行</text><text x="628" y="80" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text><text x="20" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">ウォーム</text><rect x="110" y="128" width="200" height="34" fill="#f9a825" rx="4"/><text x="210" y="149" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Handler実行のみ</text><text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text><rect x="110" y="200" width="580" height="100" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="225" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート軽減策</text><text x="130" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• SnapStart (Java/.NET) → Init をスキップ</text><text x="130" y="264" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• Provisioned Concurrency → 常時ウォーム確保</text><text x="130" y="282" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• 軽量ランタイム (Python/Go/Rust) → Init 短縮</text><text x="130" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• バンドル最小化 → 初期化コード削減</text></svg>
- **1. MicroVM起動** (~50ms) — Firecrackerが処理
- **2. ランタイム初期化** (~数百ms) — JVMは特に長い
- **3. 関数初期化コード** (可変) — import, DB接続, 設定読み込み
- CloudWatch Logsで `Init Duration` として計測可能
- 例: Python 128MB → ~200ms / Java 512MB → ~1-3s
- VPC内Lambdaは追加でENI付与時間が発生 (※2019以降改善)


---

# ランタイム別コールドスタート比較

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート vs ウォームスタート タイムライン</text><text x="20" y="80" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">コールド</text><rect x="110" y="58" width="80" height="34" fill="#3949ab" rx="4"/><text x="150" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">MicroVM</text><rect x="192" y="58" width="120" height="34" fill="#1565c0" rx="4"/><text x="252" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Runtime Init</text><rect x="314" y="58" width="100" height="34" fill="#0277bd" rx="4"/><text x="364" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Func Init</text><rect x="416" y="58" width="200" height="34" fill="#f9a825" rx="4"/><text x="516" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Handler実行</text><text x="628" y="80" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text><text x="20" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">ウォーム</text><rect x="110" y="128" width="200" height="34" fill="#f9a825" rx="4"/><text x="210" y="149" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Handler実行のみ</text><text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text><rect x="110" y="200" width="580" height="100" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="225" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート軽減策</text><text x="130" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• SnapStart (Java/.NET) → Init をスキップ</text><text x="130" y="264" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• Provisioned Concurrency → 常時ウォーム確保</text><text x="130" y="282" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• 軽量ランタイム (Python/Go/Rust) → Init 短縮</text><text x="130" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• バンドル最小化 → 初期化コード削減</text></svg>
| ランタイム | コールドスタート (目安) | 対策 |
|-----------|----------------------|------|
| Python | 200-500ms | 軽量、最速クラス |
| Node.js | 200-500ms | esbuildでバンドル最小化 |
| Java | 1-5s | SnapStart / GraalVM |
| .NET | 500ms-2s | SnapStart |
| Go / Rust | 100-200ms | ネイティブバイナリ |
- メモリ増加でInit Durationも短縮される傾向あり


---

# Provisioned Concurrencyとは

> *Provisioned Concurrencyでコールドスタートをほぼ完全排除—追加料金とのトレードオフ*

- <svg viewBox="0 0 800 345" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="345" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 同時実行数モデル</text><rect x="40" y="60" width="720" height="50" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="400" y="82" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">アカウント同時実行上限: 1,000 (デフォルト) — 増枠申請可</text><text x="400" y="98" font-family="sans-serif" font-size="11" fill="#888899" text-anchor="middle" font-weight="normal">← リージョン単位</text><rect x="50" y="130" width="220" height="120" fill="#1a237e" stroke="#3949ab" stroke-width="2" rx="8"/><text x="160" y="155" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Reserved</text><text x="160" y="175" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Concurrency</text><text x="160" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">重要関数の下限確保</text><text x="160" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">他関数から隔離</text><text x="160" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">上限制限にも使用可</text><rect x="290" y="130" width="220" height="120" fill="#0d47a1" stroke="#1565c0" stroke-width="2" rx="8"/><text x="400" y="155" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Provisioned</text><text x="400" y="175" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Concurrency</text><text x="400" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">常時ウォーム確保</text><text x="400" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタートほぼゼロ</text><text x="400" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">追加コストあり</text><rect x="530" y="130" width="220" height="120" fill="#1b5e20" stroke="#2e7d32" stroke-width="2" rx="8"/><text x="640" y="165" font-family="sans-serif" font-size="13" fill="#81c784" text-anchor="middle" font-weight="bold">Unreserved</text><text x="640" y="195" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">残りの同時実行枠</text><text x="640" y="215" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">共有プール</text><text x="640" y="235" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリングあり</text><rect x="40" y="270" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="295" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">バースト制限: 最初の1分 +500〜3,000インスタンス/分 (リージョン依存)</text><text x="400" y="313" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリング時: 同期→ HTTP 429 / 非同期→ リトライキュー</text></svg>
- 事前にウォームアップしたインスタンスを常時確保する機能
- コールドスタートを**ほぼ完全に排除**できる
- **コスト**: 通常の実行コスト + 確保時間分の追加料金
- **適用先**: 関数バージョン or エイリアス
- Application Auto Scalingで自動スケールも可能
- 用途: レイテンシ要件が厳しいAPI、ビジネスクリティカル処理


---

# Provisioned Concurrency — 設定例

- Auto Scaling で時間帯に応じてスケール
- 業務時間帯 (9-18時) に10インスタンス確保
- 夜間は最小1に削減してコスト節約


---

# Provisioned Concurrency — 設定例（コード例）

```bash
# Application Auto Scalingで動的スケール
aws application-autoscaling register-scalable-target \
  --service-namespace lambda \
  --resource-id function:my-func:prod \
  --scalable-dimension \
    lambda:function:ProvisionedConcurrency \
  --min-capacity 1 \
  --max-capacity 10
```


---

# SnapStartの仕組み

> *SnapStartはJVM起動を完全バイパスしコールドスタートを約1msに短縮*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="35" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート vs ウォームスタート タイムライン</text><text x="20" y="80" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">コールド</text><rect x="110" y="58" width="80" height="34" fill="#3949ab" rx="4"/><text x="150" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">MicroVM</text><rect x="192" y="58" width="120" height="34" fill="#1565c0" rx="4"/><text x="252" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Runtime Init</text><rect x="314" y="58" width="100" height="34" fill="#0277bd" rx="4"/><text x="364" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Func Init</text><rect x="416" y="58" width="200" height="34" fill="#f9a825" rx="4"/><text x="516" y="79" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Handler実行</text><text x="628" y="80" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text><text x="20" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="start" font-weight="normal">ウォーム</text><rect x="110" y="128" width="200" height="34" fill="#f9a825" rx="4"/><text x="210" y="149" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Handler実行のみ</text><text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text><rect x="110" y="200" width="580" height="100" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="225" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">コールドスタート軽減策</text><text x="130" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• SnapStart (Java/.NET) → Init をスキップ</text><text x="130" y="264" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• Provisioned Concurrency → 常時ウォーム確保</text><text x="130" y="282" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• 軽量ランタイム (Python/Go/Rust) → Init 短縮</text><text x="130" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="start" font-weight="normal">• バンドル最小化 → 初期化コード削減</text></svg>
- **デプロイ時**: 関数バージョン公開 → Init完了状態をスナップショット
- **呼び出し時**: スナップショットから復元 → Invoke直接実行
- JVM起動時間を完全バイパス → **コールドスタート ~1ms**
- **CRaC (Coordinated Restore at Checkpoint)** プロトコル対応
- 注意事項: ネットワーク接続・乱数・時刻はリストア後に再取得すること
- Hooks: `@SnapshotHook` でリストア後処理を記述可能


---

# コールドスタート軽減パターン集

> *SnapStart→Provisioned→Keep-Warm→ARM→軽量ランタイムの順でコールドスタート対策*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- **1. SnapStart** — Java/.NETでほぼゼロに
- **2. Provisioned Concurrency** — 常時ウォーム確保
- **3. Keep-Warm (EventBridge Ping)** — 5分毎に関数呼び出し
- **4. 軽量ランタイム選択** — Python/Go/Rust優先
- **5. バンドル最小化** — tree-shaking、不要依存削除
- **6. 初期化コード最適化** — ハンドラー外に重い処理を移動


---

# メモリ最適化とパフォーマンス

> *メモリ2倍で処理2倍速なら同コスト—Power Tuningで最適点を自動探索*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- メモリ増加 → vCPU比例増加 → 処理速度向上
- 料金: GB・秒単位 → メモリ2倍でも処理が2倍速なら同コスト
- **実験例**: 128MB → 256MB で処理時間半減 → コスト同等
- CPU集約処理（画像変換、暗号化）は高メモリ設定が有利
- I/O集約処理（DB待ち）はメモリ増加の恩恵が薄い
- → Power Tuningで実測して最適値を決める


---

# AWS Lambda Power Tuning

> *alexcasalboni/aws-lambda-power-tuningが最適メモリを自動探索—Step Functionsで並列計測*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- 最適メモリ設定を自動探索するOSSツール (Step Functions)
- **GitHub**: alexcasalboni/aws-lambda-power-tuning
- 複数のメモリ設定で関数を並列実行し、コスト・速度を計測
- Strategy: `cost` / `speed` / `balanced` から選択
- 出力: コストと速度のトレードオフグラフ
- 本番デプロイ前の必須ステップとして CI/CD に組み込み推奨


---

# AWS Lambda Power Tuning（コード例）

```json
{
  "lambdaARN": "arn:aws:lambda:...:function:my-func",
  "powerValues": [128,256,512,1024,2048,3008],
  "num": 50,
  "payload": {"key": "value"},
  "parallelInvocation": true,
  "strategy": "balanced"
}
```


---

# 接続プーリング: RDS Proxy

> *RDS ProxyがコネクションプールをマネージドでLambdaスケールアウト時のDB接続爆発を防止*

- <svg viewBox="0 0 800 370" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="370" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda VPC アーキテクチャ</text><rect x="40" y="50" width="720" height="300" fill="none" stroke="#555577" stroke-width="2" stroke-dasharray="8,4" rx="12"/><text x="400" y="72" font-family="sans-serif" font-size="12" fill="#888899" text-anchor="middle" font-weight="normal">VPC</text><rect x="60" y="85" width="300" height="240" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3" rx="8"/><text x="210" y="105" font-family="sans-serif" font-size="11" fill="#1565c0" text-anchor="middle" font-weight="normal">Private Subnet</text><rect x="80" y="115" width="120" height="44" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="140" y="141" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda</text><rect x="80" y="185" width="120" height="44" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="6"/><text x="140" y="211" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">RDS / ElastiCache</text><line x1="200" y1="137" x2="200" y2="175" stroke="#f9a825" stroke-width="2.5"/><polygon points="200,185 195,175 205,175" fill="#f9a825"/><rect x="230" y="115" width="120" height="44" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="6"/><text x="290" y="141" font-family="sans-serif" font-size="12" fill="#ce93d8" text-anchor="middle" font-weight="normal">VPC Endpoint</text><line x1="200" y1="137" x2="220" y2="137" stroke="#ce93d8" stroke-width="2.5"/><polygon points="230,137 220,142 220,132" fill="#ce93d8"/><rect x="430" y="115" width="120" height="44" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="6"/><text x="490" y="141" font-family="sans-serif" font-size="12" fill="#ff8a65" text-anchor="middle" font-weight="normal">NAT Gateway</text><rect x="430" y="185" width="120" height="44" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="6"/><text x="490" y="211" font-family="sans-serif" font-size="11" fill="#ff8a65" text-anchor="middle" font-weight="normal">Internet Gateway</text><line x1="490" y1="159" x2="490" y2="175" stroke="#f9a825" stroke-width="2.5"/><polygon points="490,185 485,175 495,175" fill="#f9a825"/><rect x="600" y="115" width="140" height="44" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="6"/><text x="670" y="141" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">AWS Services</text><line x1="230" y1="137" x2="420" y2="137" stroke="#ce93d8" stroke-width="2.5"/><polygon points="430,137 420,142 420,132" fill="#ce93d8"/><line x1="550" y1="137" x2="590" y2="137" stroke="#ff8a65" stroke-width="2.5"/><polygon points="600,137 590,142 590,132" fill="#ff8a65"/><rect x="40" y="305" width="720" height="50" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="400" y="328" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">2019年以降 ENI 割り当て改善 → コールドスタート遅延は大幅改善済み</text><text x="400" y="346" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">VPC外サービス (DynamoDB/S3) は VPC Endpoint で最適化</text></svg>
- **問題**: Lambda スケールアウト → DB接続数が爆発的に増加
- RDS の最大接続数を超えてエラー発生
- **解決**: RDS Proxy がコネクションプールを管理
- LambdaはProxyに接続、ProxyがRDSへ多重化（1/10以下に削減）
- IAM認証対応（パスワード管理不要）
- レイテンシ追加: ~数ms（許容範囲）


---

# ElastiCache接続最適化

> *グローバルスコープで接続を再利用—同時実行数×接続数=総接続数を意識した設計*

- Lambdaのグローバルスコープで接続を再利用
- VPC内LambdaからElastiCacheに直接接続
- **接続数管理**: 同時実行数 × 接続数 = 総接続数
- ElastiCache Serverlessで接続制限を緩和可能


---

# ElastiCache接続最適化（コード例）

```python
import redis
# ハンドラー外で初期化（コンテナ再利用時に再接続不要）
redis_client = redis.Redis(
    host=os.environ['REDIS_HOST'],
    port=6379,
    decode_responses=True,
    socket_keepalive=True
)

def handler(event, context):
    result = redis_client.get(event['key'])
    return {'value': result}
```


---

# 依存パッケージ最適化

> *devDependencies除外+Tree shaking+AWS SDK v3モジュール別インポートでサイズを最小化*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- **不要な依存を削除**: `devDependencies` をデプロイに含めない
- **Tree shaking**: esbuild/webpack で未使用コードを除去
- **AWS SDK v3**: モジュール別インポートでサイズ削減
- Pythonは `pip install --no-deps` で依存チェーン制御
- Dockerコンテナビルドで最終イメージサイズを計測
- 目標: ZIPで10MB以下（コールドスタート短縮）


---

# 依存パッケージ最適化（コード例）

```typescript
// AWS SDK v3 — 必要なクライアントのみインポート
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
// v2の全部入りSDKではなく個別インポートで軽量化
```


---

# 初期化コードの最適化

> *グローバルスコープのSDKクライアント初期化でウォームスタート時の再初期化を排除*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- ハンドラー外（グローバルスコープ）に重い処理を置く
- コンテナ再利用時はグローバルスコープがキャッシュされる
- **避けるべきパターン**: ハンドラー内でのSDKクライアント生成
- **推奨**: DB接続・設定読み込みはグローバルスコープで1回のみ
- 遅延初期化: 必要になるまで初期化を遅らせるパターンも有効


---

# 初期化コードの最適化（コード例）

```typescript
// ハンドラー外（グローバル）で初期化
const dynamo = new DynamoDBDocumentClient(
  new DynamoDBClient({})
);
let config: Config | null = null;

export async function handler(event: APIGatewayEvent) {
  // 設定は一度だけ読み込み（ウォームリクエストでスキップ）
  config ??= await loadConfig();
  return process(event, dynamo, config);
}
```


---

# Lambda Throttling対策

> *HTTP 429スロットリングはSQSキューで非同期化し+Reserved Concurrencyで上限管理*

- <svg viewBox="0 0 800 345" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="345" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda 同時実行数モデル</text><rect x="40" y="60" width="720" height="50" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="400" y="82" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">アカウント同時実行上限: 1,000 (デフォルト) — 増枠申請可</text><text x="400" y="98" font-family="sans-serif" font-size="11" fill="#888899" text-anchor="middle" font-weight="normal">← リージョン単位</text><rect x="50" y="130" width="220" height="120" fill="#1a237e" stroke="#3949ab" stroke-width="2" rx="8"/><text x="160" y="155" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Reserved</text><text x="160" y="175" font-family="sans-serif" font-size="13" fill="#7986cb" text-anchor="middle" font-weight="bold">Concurrency</text><text x="160" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">重要関数の下限確保</text><text x="160" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">他関数から隔離</text><text x="160" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">上限制限にも使用可</text><rect x="290" y="130" width="220" height="120" fill="#0d47a1" stroke="#1565c0" stroke-width="2" rx="8"/><text x="400" y="155" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Provisioned</text><text x="400" y="175" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Concurrency</text><text x="400" y="200" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">常時ウォーム確保</text><text x="400" y="218" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">コールドスタートほぼゼロ</text><text x="400" y="236" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">追加コストあり</text><rect x="530" y="130" width="220" height="120" fill="#1b5e20" stroke="#2e7d32" stroke-width="2" rx="8"/><text x="640" y="165" font-family="sans-serif" font-size="13" fill="#81c784" text-anchor="middle" font-weight="bold">Unreserved</text><text x="640" y="195" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">残りの同時実行枠</text><text x="640" y="215" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">共有プール</text><text x="640" y="235" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリングあり</text><rect x="40" y="270" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="295" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">バースト制限: 最初の1分 +500〜3,000インスタンス/分 (リージョン依存)</text><text x="400" y="313" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">スロットリング時: 同期→ HTTP 429 / 非同期→ リトライキュー</text></svg>
- **スロットリング発生条件**: 同時実行数がアカウント上限or予約上限を超過
- **検出**: CloudWatch `Throttles` メトリクス / HTTP 429
- **対策1**: SQSキューを挟んで非同期化（スパイク吸収）
- **対策2**: Reserved Concurrencyで重要関数の枠を確保
- **対策3**: 上限緩和申請（AWS Supportにリクエスト）
- **対策4**: バッチサイズ調整で1回の処理量を最大化


---

# コストとパフォーマンスのバランス

> *Graviton2(arm64)で20%コスト削減—無料枠100万リクエスト+400K GB・秒を活かす*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- Lambda料金 = (リクエスト数 × $0.0000002) + (GB・秒 × $0.0000166667)
- 無料枠: 100万リクエスト + 400,000 GB・秒/月
- **コスト削減**: Graviton2(arm64)で20%削減
- **コスト削減**: メモリを最適化（Power Tuning活用）
- **コスト削減**: 非同期処理でProvisioned Concurrency使用を最小化
- Compute Savings Plansでさらに最大17%割引


---

# コールドスタート計測方法

> *CloudWatch LOGSのInit Durationフィールドが存在する行=コールドスタート発生の識別法*

- CloudWatch Logs の `REPORT` 行で `Init Duration` を確認
- `Init Duration` フィールドが存在するログ = コールドスタート発生
- **CloudWatch Logs Insights** でまとめて分析
- Lambda Insights で `init_duration` カスタムメトリクス取得
- X-Ray サービスマップでEnd-to-Endのレイテンシを可視化


---

# コールドスタート計測方法（コード例）

```sql
# CloudWatch Logs Insightsクエリ例
fields @timestamp, @initDuration, @duration
| filter @type = "REPORT"
| filter @initDuration > 0
| stats
    avg(@initDuration) as avgInit,
    max(@initDuration) as maxInit,
    count() as coldStarts
  by bin(5min)
```


---

<!-- _class: lead -->
# Part 3: サーバーレスアーキテクチャパターン

- 実践で使えるパターンを網羅する


---

# サーバーレス設計原則

> *ステートレス・イベント駆動・単一責任・冪等性・非同期化の5原則がサーバーレス設計の基本*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- **1. ステートレスに設計する** — 状態はDynamoDB/S3に永続化
- **2. イベント駆動を活用** — 疎結合なサービス連携
- **3. 関数を小さく単一責任に** — テスト・デプロイが容易
- **4. 冪等性を保証** — 重複実行されても安全に設計
- **5. 失敗を前提に設計** — DLQ・リトライ・タイムアウト設定
- **6. オブザーバビリティ優先** — ログ・メトリクス・トレース


---

# API Gateway + Lambda パターン

> *REST APIは機能豊富、HTTP APIはREST比70%安—シンプルなLambda統合はHTTP APIを選ぶ*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- 最もよく使われるサーバーレスパターン
- **REST API**: 機能が豊富（キャッシュ、認証、変換）
- **HTTP API**: シンプル・高速・低コスト（REST比70%安）
- **Lambda URL**: API GW不要で直接HTTPSエンドポイント
- 冪等性キー: `X-Amz-Client-Context` でリトライ制御
- ALB → Lambda も選択肢（コンテナとの共存が容易）


---

# HTTP API vs REST API 選択基準

| 機能 | HTTP API | REST API |
|------|----------|----------|
| コスト | ◎ 低コスト | △ 高コスト |
| レイテンシ | ◎ 低 | ○ 普通 |
| キャッシュ | × なし | ✅ あり |
| API Key管理 | × | ✅ |
| リクエスト変換 | × | ✅ |
- 新規はHTTP APIを基本に、必要な機能があればREST APIを検討


---

# SQS + Lambda イベント駆動パターン

> *SQS StandardはAt-Least-Once+無制限スループット、FIFOは順序保証で300TPS上限*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SQS + Lambda イベント駆動パターン</text><rect x="10" y="85" width="140" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="80" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Producer</text><text x="80" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(API / S3 etc)</text><rect x="190" y="85" width="140" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="260" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">SQS Queue</text><text x="260" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(Standard/FIFO)</text><rect x="390" y="85" width="140" height="90" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="460" y="118" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="460" y="138" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Consumer</text><rect x="590" y="85" width="140" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="660" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB /</text><text x="660" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">RDS / etc</text><line x1="150" y1="130" x2="180" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="190,130 180,135 180,125" fill="#f9a825"/><line x1="330" y1="130" x2="380" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="390,130 380,135 380,125" fill="#f9a825"/><line x1="530" y1="130" x2="580" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="590,130 580,135 580,125" fill="#f9a825"/><rect x="180" y="235" width="160" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="260" y="260" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">Dead Letter Queue</text><text x="260" y="278" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">処理失敗メッセージを退避</text><line x1="260" y1="175" x2="260" y2="225" stroke="#e91e63" stroke-width="2.5"/><polygon points="260,235 255,225 265,225" fill="#e91e63"/><rect x="390" y="235" width="180" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="480" y="260" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Batch Window</text><text x="480" y="278" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">最大 300秒 / 最大 10,000件</text><line x1="460" y1="175" x2="460" y2="225" stroke="#90caf9" stroke-width="2.5"/><polygon points="460,235 455,225 465,225" fill="#90caf9"/><rect x="40" y="310" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="332" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">batchItemFailures: 個別メッセージの成功/失敗を報告可能</text><text x="400" y="350" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">SQS FIFO: Exactly-Once 処理 + 順序保証 (300 TPS 上限)</text></svg>
- **SQS Standard**: At-Least-Onceデリバリー、スループット無制限
- **SQS FIFO**: Exactly-Once処理、順序保証（300TPS上限）
- バッチサイズ: 1〜10,000メッセージ（コスト最適化に重要）
- **バッチウィンドウ**: 最大300秒まとめて受信（コスト削減）
- 失敗処理: メッセージ個別の成功/失敗報告が可能
- DLQ設定で処理失敗メッセージを別キューに退避


---

# SQS + Lambda イベント駆動パターン（コード例）

```python
def handler(event, context):
    batch_item_failures = []
    for record in event['Records']:
        try:
            process(json.loads(record['body']))
        except Exception:
            batch_item_failures.append(
                {'itemIdentifier': record['messageId']}
            )
    return {'batchItemFailures': batch_item_failures}
```


---

# EventBridge + Lambda

> *EventBridgeのcron/rateスケジュールとカスタムイベントバスでLambdaを疎結合に連携*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- **イベントバス**: デフォルト / カスタム / パートナーイベントバス
- ルールで特定イベントパターンを Lambda にルーティング
- **スケジュール実行**: EventBridge Scheduler (cron/rate)
- クロスアカウント・クロスリージョンのイベント連携
- ユースケース: マイクロサービス間通知、定時バッチ、ワークフロー


---

# EventBridge + Lambda（コード例）

```json
# イベントパターン例（S3オブジェクト作成）
{
  "source": ["aws.s3"],
  "detail-type": ["Object Created"],
  "detail": {
    "bucket": { "name": ["my-data-bucket"] },
    "object": { "key": [{"suffix": ".csv"}] }
  }
}
```


---

# DynamoDB Streams + Lambda

> *DynamoDB Streamsで変更をリアルタイム処理—キャッシュ無効化・検索インデックス更新に使う*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SQS + Lambda イベント駆動パターン</text><rect x="10" y="85" width="140" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="80" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Producer</text><text x="80" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(API / S3 etc)</text><rect x="190" y="85" width="140" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="260" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">SQS Queue</text><text x="260" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(Standard/FIFO)</text><rect x="390" y="85" width="140" height="90" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="460" y="118" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="460" y="138" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Consumer</text><rect x="590" y="85" width="140" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="660" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB /</text><text x="660" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">RDS / etc</text><line x1="150" y1="130" x2="180" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="190,130 180,135 180,125" fill="#f9a825"/><line x1="330" y1="130" x2="380" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="390,130 380,135 380,125" fill="#f9a825"/><line x1="530" y1="130" x2="580" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="590,130 580,135 580,125" fill="#f9a825"/><rect x="180" y="235" width="160" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="260" y="260" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">Dead Letter Queue</text><text x="260" y="278" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">処理失敗メッセージを退避</text><line x1="260" y1="175" x2="260" y2="225" stroke="#e91e63" stroke-width="2.5"/><polygon points="260,235 255,225 265,225" fill="#e91e63"/><rect x="390" y="235" width="180" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="480" y="260" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Batch Window</text><text x="480" y="278" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">最大 300秒 / 最大 10,000件</text><line x1="460" y1="175" x2="460" y2="225" stroke="#90caf9" stroke-width="2.5"/><polygon points="460,235 455,225 465,225" fill="#90caf9"/><rect x="40" y="310" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="332" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">batchItemFailures: 個別メッセージの成功/失敗を報告可能</text><text x="400" y="350" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">SQS FIFO: Exactly-Once 処理 + 順序保証 (300 TPS 上限)</text></svg>
- DynamoDBへの変更（INSERT/MODIFY/REMOVE）をリアルタイム処理
- **用途**: キャッシュ無効化、検索インデックス更新、監査ログ
- ストリームレコードに新旧両方の値（`NewImage`, `OldImage`）
- シャード単位で順序保証（アイテムキー単位の順序は保証）
- バッチサイズ: 1〜1,000 / バッチウィンドウ: 0〜300秒
- 並列化係数: 1〜10（シャード内の並列処理数）


---

# Step Functions オーケストレーション

> *Step FunctionsのStandard(最大1年)とExpress(秒間100k)を用途で使い分ける*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Step Functions ステートマシン</text><circle cx="400" cy="75" r="22" fill="#2e7d32" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="80" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="bold">Start</text><rect x="325" y="125" width="150" height="40" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="400" y="150" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">ValidateOrder</text><rect x="175" y="200" width="150" height="40" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="250" y="225" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">CheckStock</text><rect x="475" y="200" width="150" height="40" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="550" y="225" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">ProcessPayment</text><rect x="325" y="275" width="150" height="40" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="6"/><text x="400" y="300" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">SendNotification</text><circle cx="400" cy="360" r="22" fill="#e65100" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="365" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="bold">End</text><line x1="400" y1="97" x2="400" y2="115" stroke="#f9a825" stroke-width="2.5"/><polygon points="400,125 395,115 405,115" fill="#f9a825"/><line x1="400" y1="165" x2="259.73841209741795" y2="197.7277038439358" stroke="#f9a825" stroke-width="2.5"/><polygon points="250,200 258.60226401938587,192.85849779522684 260.87456017545003,202.5969098926448" fill="#f9a825"/><line x1="400" y1="165" x2="540.261587902582" y2="197.7277038439358" stroke="#f9a825" stroke-width="2.5"/><polygon points="550,200 539.12543982455,202.5969098926448 541.3977359806141,192.85849779522684" fill="#f9a825"/><line x1="250" y1="240" x2="390.26158790258205" y2="272.72770384393584" stroke="#f9a825" stroke-width="2.5"/><polygon points="400,275 389.12543982454997,277.5969098926448 391.39773598061413,267.85849779522687" fill="#f9a825"/><line x1="550" y1="240" x2="409.73841209741795" y2="272.72770384393584" stroke="#f9a825" stroke-width="2.5"/><polygon points="400,275 408.60226401938587,267.85849779522687 410.87456017545003,277.5969098926448" fill="#f9a825"/><line x1="400" y1="315" x2="400" y2="328" stroke="#f9a825" stroke-width="2.5"/><polygon points="400,338 395,328 405,328" fill="#f9a825"/><text x="310" y="200" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">在庫あり</text><text x="510" y="200" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">在庫なし</text><rect x="550" y="130" width="200" height="70" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="650" y="155" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle" font-weight="bold">Standard Workflow</text><text x="650" y="172" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">最大1年 / Exactly-Once</text><text x="650" y="188" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">Retry / Catch 内蔵</text></svg>
- 複数Lambda関数のワークフローを視覚的に定義・実行
- **Standard**: 長時間ワークフロー（最大1年）、Exactly-Once
- **Express**: 高スループット（秒間100k）、At-Least-Once
- 組み込みエラーハンドリング: Retry / Catch / TimeoutSeconds
- サービス統合: Lambda以外にDynamoDB, SQS, ECSも直接呼び出し
- 状態マシン = コードではなくJSON/YAMLで定義


---

# Fan-out パターン

> *SNS→複数SQS→各Lambdaで確実なFan-out、EventBridge→複数ルールでフィルタリング配信*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SQS + Lambda イベント駆動パターン</text><rect x="10" y="85" width="140" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="80" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Producer</text><text x="80" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(API / S3 etc)</text><rect x="190" y="85" width="140" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="260" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">SQS Queue</text><text x="260" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">(Standard/FIFO)</text><rect x="390" y="85" width="140" height="90" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="460" y="118" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="460" y="138" font-family="sans-serif" font-size="12" fill="#111" text-anchor="middle" font-weight="bold">Consumer</text><rect x="590" y="85" width="140" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="660" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB /</text><text x="660" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">RDS / etc</text><line x1="150" y1="130" x2="180" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="190,130 180,135 180,125" fill="#f9a825"/><line x1="330" y1="130" x2="380" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="390,130 380,135 380,125" fill="#f9a825"/><line x1="530" y1="130" x2="580" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="590,130 580,135 580,125" fill="#f9a825"/><rect x="180" y="235" width="160" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="260" y="260" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">Dead Letter Queue</text><text x="260" y="278" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">処理失敗メッセージを退避</text><line x1="260" y1="175" x2="260" y2="225" stroke="#e91e63" stroke-width="2.5"/><polygon points="260,235 255,225 265,225" fill="#e91e63"/><rect x="390" y="235" width="180" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="480" y="260" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Batch Window</text><text x="480" y="278" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">最大 300秒 / 最大 10,000件</text><line x1="460" y1="175" x2="460" y2="225" stroke="#90caf9" stroke-width="2.5"/><polygon points="460,235 455,225 465,225" fill="#90caf9"/><rect x="40" y="310" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="332" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">batchItemFailures: 個別メッセージの成功/失敗を報告可能</text><text x="400" y="350" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">SQS FIFO: Exactly-Once 処理 + 順序保証 (300 TPS 上限)</text></svg>
- 1つのイベントを複数のワーカーLambdaに並列配信
- **SNS → 複数SQS → 各Lambda**: 確実なデリバリー保証
- **EventBridge → 複数ルール**: フィルタリングしながら配信
- **Step Functions Map状態**: 配列要素を並列処理
- ユースケース: 注文処理（在庫/通知/請求を並列）
- 考慮点: 各Lambdaの同時実行数の合計がアカウント上限内に収まること


---

# Sagaパターン (分散トランザクション)

> *各ステップに補償トランザクションを定義したSagaパターンで分散トランザクションを実現*

- <svg viewBox="0 0 800 315" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="315" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Saga パターン (Step Functions)</text><rect x="25" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="80" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">注文作成</text><rect x="175" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="230" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">在庫確保</text><rect x="325" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="380" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">決済処理</text><rect x="475" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="530" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">配送依頼</text><rect x="625" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="680" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">完了通知</text><line x1="135" y1="87" x2="165" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="175,87 165,92 165,82" fill="#f9a825"/><line x1="285" y1="87" x2="315" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="325,87 315,92 315,82" fill="#f9a825"/><line x1="435" y1="87" x2="465" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="475,87 465,92 465,82" fill="#f9a825"/><line x1="585" y1="87" x2="615" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="625,87 615,92 615,82" fill="#f9a825"/><text x="400" y="60" font-family="sans-serif" font-size="12" fill="#81c784" text-anchor="middle" font-weight="normal">正常フロー →</text><rect x="25" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="80" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">注文キャンセル</text><rect x="175" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="230" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">在庫解放</text><rect x="325" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="380" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">返金処理</text><rect x="475" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="530" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">配送キャンセル</text><rect x="625" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="680" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">(補償なし)</text><line x1="625" y1="192" x2="595" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="585,192 595,187 595,197" fill="#e91e63"/><line x1="475" y1="192" x2="445" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="435,192 445,187 445,197" fill="#e91e63"/><line x1="325" y1="192" x2="295" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="285,192 295,187 295,197" fill="#e91e63"/><line x1="175" y1="192" x2="145" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="135,192 145,187 145,197" fill="#e91e63"/><text x="400" y="165" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="normal">← 補償フロー (障害時)</text><line x1="380" y1="110" x2="380" y2="160" stroke="#ff5252" stroke-width="2.5"/><polygon points="380,170 375,160 385,160" fill="#ff5252"/><text x="390" y="145" font-family="sans-serif" font-size="12" fill="#ff5252" text-anchor="start" font-weight="normal">❌ 失敗</text><rect x="40" y="235" width="720" height="60" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="258" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Step Functions の Catch → 補償 Lambda を逆順実行</text><text x="400" y="278" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">各ステップに Retry (指数バックオフ) + TimeoutSeconds を設定</text></svg>
- マイクロサービス間でのトランザクション整合性を保証
- 各ステップに補償トランザクション（ロールバック処理）を定義
- **コレオグラフィ型**: イベントで各サービスが自律的に動作
- **オーケストレーション型**: Step Functionsが中央制御
- Step Functionsの `Catch` でエラー時に補償処理を実行
- ユースケース: 注文→在庫確保→決済→配送の各ステップ


---

# Circuit Breaker in Serverless

> *DynamoDBにサーキット状態を保存しCLOSED→OPEN→HALF-OPENで外部障害の連鎖を防止*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- 外部サービス障害時に連鎖失敗を防ぐパターン
- **状態**: CLOSED（正常）→ OPEN（遮断）→ HALF-OPEN（試験）
- DynamoDBにサーキット状態を保存（Lambda間で共有）
- ElastiCacheで高速な状態確認（低レイテンシ要件）
- AWS Lambda Powertools の `@circuit_breaker` デコレーター活用
- ウォームコンテナのグローバル変数ではなく**共有ストア**に状態を持つ


---

# サーバーレス CQRS パターン

> *Write側はDynamoDB正規化データ、Read側はOpenSearch/Auroraと分離したCQRSで高速クエリ*

- <svg viewBox="0 0 800 385" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="385" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス CQRS パターン</text><rect x="20" y="60" width="340" height="130" fill="#0a0f1c" stroke="#e91e63" stroke-width="1.5" rx="8"/><text x="190" y="82" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="bold">Write Side (Command)</text><rect x="30" y="95" width="100" height="40" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="5"/><text x="80" y="119" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">API GW</text><rect x="155" y="95" width="100" height="40" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="5"/><text x="205" y="119" font-family="sans-serif" font-size="11" fill="#111" text-anchor="middle" font-weight="normal">Lambda</text><rect x="280" y="95" width="70" height="40" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="5"/><text x="315" y="119" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">DynamoDB</text><line x1="130" y1="115" x2="145" y2="115" stroke="#f9a825" stroke-width="2.5"/><polygon points="155,115 145,120 145,110" fill="#f9a825"/><line x1="255" y1="115" x2="270" y2="115" stroke="#f9a825" stroke-width="2.5"/><polygon points="280,115 270,120 270,110" fill="#f9a825"/><text x="190" y="152" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">正規化データ書き込み</text><text x="190" y="170" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">DynamoDB Streams で変更検知</text><line x1="200" y1="190" x2="200" y2="220" stroke="#e91e63" stroke-width="2.5"/><polygon points="200,230 195,220 205,220" fill="#e91e63"/><text x="215" y="215" font-family="sans-serif" font-size="10" fill="#e91e63" text-anchor="start" font-weight="normal">Streams</text><rect x="20" y="235" width="340" height="130" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="190" y="257" font-family="sans-serif" font-size="13" fill="#90caf9" text-anchor="middle" font-weight="bold">Read Side (Query)</text><rect x="30" y="270" width="100" height="40" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="5"/><text x="80" y="294" font-family="sans-serif" font-size="11" fill="#90caf9" text-anchor="middle" font-weight="normal">Lambda</text><rect x="155" y="270" width="100" height="40" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="5"/><text x="205" y="294" font-family="sans-serif" font-size="11" fill="#ffab91" text-anchor="middle" font-weight="normal">OpenSearch</text><rect x="280" y="270" width="70" height="40" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="5"/><text x="315" y="294" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Aurora</text><line x1="130" y1="290" x2="145" y2="290" stroke="#f9a825" stroke-width="2.5"/><polygon points="155,290 145,295 145,285" fill="#f9a825"/><line x1="255" y1="290" x2="270" y2="290" stroke="#f9a825" stroke-width="2.5"/><polygon points="280,290 270,295 270,285" fill="#f9a825"/><text x="190" y="328" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">読み取り専用データストア (最適化済み)</text><rect x="450" y="140" width="140" height="40" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="6"/><text x="520" y="164" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="normal">クライアント</text><line x1="450" y1="155" x2="369.1381154862026" y2="119.06138466053447" stroke="#e91e63" stroke-width="2.5"/><polygon points="360,115 371.16880781646984,114.49232691743319 367.10742315593535,123.63044240363575" fill="#e91e63"/><line x1="450" y1="165" x2="365.8430472584508" y2="281.88465658548506" stroke="#1565c0" stroke-width="2.5"/><polygon points="360,290 361.7853755511933,278.9631329562597 369.9007189657083,284.8061802147104" fill="#1565c0"/><text x="430" y="130" font-family="sans-serif" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="normal">Command</text><text x="430" y="200" font-family="sans-serif" font-size="10" fill="#90caf9" text-anchor="middle" font-weight="normal">Query</text></svg>
- Command（書き込み）とQuery（読み取り）を分離
- **Write側**: API GW → Lambda → DynamoDB（正規化データ）
- **Read側**: DynamoDB Streams → Lambda → OpenSearch/Aurora
- 読み取り専用のデータストアを別途最適化
- EventBridgeでドメインイベントを発行・購読
- スケールが独立: 読み取りと書き込みで個別にスケール


---

# GraphQL with AppSync + Lambda

> *AppSyncのDirect Lambda Resolverで型安全なGraphQL APIをサーバーレスで実装*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- AppSyncはマネージドGraphQL APIサービス
- リゾルバーにLambdaを指定してカスタムロジックを実装
- **Direct Lambda Resolver**: Lambda関数をリゾルバーとして直接指定
- サブスクリプションはWebSocketで自動管理（Lambdaは不要）
- N+1問題はBatchingとDataLoaderで解決
- AppSync + Cognito でフィールドレベルの認可制御


---

# レスポンスストリーミング

> *LLMトークンストリーミングと大ファイルダウンロードに最適—Lambda URLまたはHTTP APIで利用*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- Lambda関数が結果をストリームで段階的に返す機能 (2023〜)
- **用途**: LLMトークンストリーミング、大ファイルダウンロード
- Lambda URL または API GW HTTP APIで利用可能
- 通常のResponse: 全データ生成後に返却（タイムアウトリスク）
- ストリーミング: 最初のバイトから返却 → TTFB短縮
- 最大レスポンスサイズ: 20MB（ストリーミング時）


---

# レスポンスストリーミング（コード例）

```typescript
import { streamifyResponse, HttpResponseStream }
  from 'lambda-stream';

export const handler = streamifyResponse(
  async (event, responseStream) => {
    const metadata = { statusCode: 200,
      headers: { 'Content-Type': 'text/event-stream' } };
    responseStream = HttpResponseStream.from(
      responseStream, metadata);
    for await (const chunk of generateTokens(event)) {
      responseStream.write(chunk);
    }
    responseStream.end();
  }
);
```


---

# Lambda + DynamoDB Single Table設計

> *USER#u123+ORDER#2026-01のPK/SK設計でSingle Table設計のアクセスパターンを実現*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- すべてのエンティティを1テーブルに格納するパターン
- **PK**: エンティティタイプ + ID（例: `USER#u123`）
- **SK**: 関係やソートに使用（例: `ORDER#2026-01`）
- GSIでアクセスパターンに応じたクエリを実現
- Lambda + DynamoDB DocumentClient でシンプルにアクセス
- 設計時にアクセスパターンをすべて列挙することが必須


---

# イベントソーシングパターン

> *変更イベントの履歴を永続化するイベントソーシングで監査・タイムトラベルクエリを実現*

- <svg viewBox="0 0 800 315" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="315" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Saga パターン (Step Functions)</text><rect x="25" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="80" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">注文作成</text><rect x="175" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="230" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">在庫確保</text><rect x="325" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="380" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">決済処理</text><rect x="475" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="530" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">配送依頼</text><rect x="625" y="65" width="110" height="45" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="680" y="92" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="bold">完了通知</text><line x1="135" y1="87" x2="165" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="175,87 165,92 165,82" fill="#f9a825"/><line x1="285" y1="87" x2="315" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="325,87 315,92 315,82" fill="#f9a825"/><line x1="435" y1="87" x2="465" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="475,87 465,92 465,82" fill="#f9a825"/><line x1="585" y1="87" x2="615" y2="87" stroke="#f9a825" stroke-width="2.5"/><polygon points="625,87 615,92 615,82" fill="#f9a825"/><text x="400" y="60" font-family="sans-serif" font-size="12" fill="#81c784" text-anchor="middle" font-weight="normal">正常フロー →</text><rect x="25" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="80" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">注文キャンセル</text><rect x="175" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="230" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">在庫解放</text><rect x="325" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="380" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">返金処理</text><rect x="475" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="530" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">配送キャンセル</text><rect x="625" y="170" width="110" height="45" fill="#1a0a0a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="680" y="197" font-family="sans-serif" font-size="10" fill="#ff8a80" text-anchor="middle" font-weight="normal">(補償なし)</text><line x1="625" y1="192" x2="595" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="585,192 595,187 595,197" fill="#e91e63"/><line x1="475" y1="192" x2="445" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="435,192 445,187 445,197" fill="#e91e63"/><line x1="325" y1="192" x2="295" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="285,192 295,187 295,197" fill="#e91e63"/><line x1="175" y1="192" x2="145" y2="192" stroke="#e91e63" stroke-width="2.5"/><polygon points="135,192 145,187 145,197" fill="#e91e63"/><text x="400" y="165" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="normal">← 補償フロー (障害時)</text><line x1="380" y1="110" x2="380" y2="160" stroke="#ff5252" stroke-width="2.5"/><polygon points="380,170 375,160 385,160" fill="#ff5252"/><text x="390" y="145" font-family="sans-serif" font-size="12" fill="#ff5252" text-anchor="start" font-weight="normal">❌ 失敗</text><rect x="40" y="235" width="720" height="60" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="258" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Step Functions の Catch → 補償 Lambda を逆順実行</text><text x="400" y="278" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">各ステップに Retry (指数バックオフ) + TimeoutSeconds を設定</text></svg>
- データの状態ではなく「変更イベント」の履歴を永続化
- **Command Handler Lambda**: コマンド受信 → イベント生成 → EventStore保存
- **Projection Lambda**: イベントを読み取りモデルに変換
- DynamoDB Streamsでイベントをリアルタイムにプロジェクション
- 完全な監査ログ・タイムトラベルクエリが可能
- 複雑性が高いため、複雑なドメインロジックに限定して適用


---

# サーバーレスマイクロサービス

> *各マイクロサービスが独自Lambda+DataStoreを持ちEventBridgeで非同期イベント交換*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレス Web API パターン</text><rect x="5" y="100" width="110" height="80" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">Client</text><rect x="145" y="100" width="110" height="80" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="200" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">API Gateway</text><text x="200" y="150" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">(HTTP API)</text><rect x="315" y="100" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="370" y="132" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">Lambda</text><text x="370" y="150" font-family="sans-serif" font-size="13" fill="#111" text-anchor="middle" font-weight="bold">(Handler)</text><rect x="485" y="100" width="110" height="80" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="540" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">DynamoDB</text><rect x="645" y="100" width="110" height="80" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="700" y="132" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="bold">S3 / Cache</text><line x1="115" y1="140" x2="135" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="145,140 135,145 135,135" fill="#f9a825"/><line x1="255" y1="140" x2="305" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="315,140 305,145 305,135" fill="#f9a825"/><line x1="425" y1="140" x2="475" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="485,140 475,145 475,135" fill="#f9a825"/><line x1="595" y1="140" x2="635" y2="140" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,140 635,145 635,135" fill="#f9a825"/><path d="M 645 190 Q 400 240 145 190" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="6,3"/><text x="400" y="258" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="normal">← Response</text><rect x="50" y="280" width="700" height="80" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">HTTP API: REST APIより最大70%低コスト / 低レイテンシ</text><text x="400" y="325" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda URL: API GWなしで直接HTTPSエンドポイントを公開</text><text x="400" y="345" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">Lambda Authorizer: JWTトークン検証・カスタム認可を実装</text></svg>
- 各マイクロサービスが独自のLambda関数群 + データストアを持つ
- **API GW + Lambda**: サービスごとにエンドポイントを分離
- **EventBridge**: サービス間の非同期イベント交換
- **SAM / CDK**: IaCでサービスごとにスタックを管理
- 独立デプロイ: サービス間の変更が影響しない
- トレードオフ: ネットワーク呼び出し増加・分散トレーシングが複雑


---

# サーバーレス vs コンテナ — 選択基準

| 観点 | Lambda | ECS/Fargate |
|------|--------|-------------|
| 実行時間 | 最大15分 | 無制限 |
| コールドスタート | あり | 起動に数十秒 |
| トラフィック | バースト対応 | 予測可能 |
| コスト | 従量課金 | 常時起動コスト |
| 状態管理 | ステートレス | ステートフル可 |
- **Lambda向き**: イベント駆動、バースト、短時間処理 / **コンテナ向き**: 長時間、複雑な依存、WebSocket


---

# アーキテクチャパターン選択フロー（1/2）

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- **リアルタイムAPI** → API GW HTTP API + Lambda + DynamoDB
- **非同期ジョブキュー** → SQS + Lambda + DLQ
- **複雑なワークフロー** → Step Functions + Lambda


---

# アーキテクチャパターン選択フロー（2/2）

> *EventBridge Schedulerをスケジューリング、Kinesisをストリーム処理に使い分ける*

- **スケジューリング** → EventBridge Scheduler + Lambda
- **ストリーム処理** → Kinesis/DynamoDB Streams + Lambda
- **イベント連携** → EventBridge + Lambda（疎結合）
- **大量並列処理** → SNS Fan-out + SQS + Lambda


---

<!-- _class: lead -->
# Part 4: オブザーバビリティ

- 見えないものは改善できない


---

# サーバーレスオブザーバビリティの課題

> *短命プロセス・分散処理・コールドスタート混在がサーバーレス観測可能性の3大課題*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレスオブザーバビリティ 3本柱</text><rect x="20" y="58" width="200" height="210" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="120" y="82" font-family="sans-serif" font-size="16" fill="#1565c0" text-anchor="middle" font-weight="bold">Metrics</text><text x="120" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">何が起きたか</text><text x="120" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Lambda Insights</text><text x="120" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">ConcurrentExecutions</text><text x="120" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Duration / Errors / Throttles</text><text x="120" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">IteratorAge (Stream遅延)</text><rect x="240" y="58" width="200" height="210" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="340" y="82" font-family="sans-serif" font-size="16" fill="#6a1b9a" text-anchor="middle" font-weight="bold">Logs</text><text x="340" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">詳細を知る</text><text x="340" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Logs (構造化JSON)</text><text x="340" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda Powertools Logger</text><text x="340" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Logs Insights でクエリ分析</text><text x="340" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">correlation_id でトレース</text><rect x="460" y="58" width="200" height="210" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="560" y="82" font-family="sans-serif" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Traces</text><text x="560" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">どこで起きたか</text><text x="560" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">X-Ray 分散トレーシング</text><text x="560" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Segment / Subsegment</text><text x="560" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">サービスマップで可視化</text><text x="560" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Powertools Tracer で簡易実装</text><rect x="40" y="283" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Powertools: Logger / Tracer / Metrics を一括導入</text><text x="400" y="323" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">capture_cold_start_metric=True で コールドスタート頻度をメトリクス化</text></svg>
- **短命なプロセス**: コンテナが頻繁に廃棄される
- **分散処理**: 複数Lambda + 複数サービスをまたぐリクエスト
- **コールドスタート**: 実際のビジネス処理とInit処理の混在
- **非同期処理**: SQS/EventBridge経由でリクエストIDが途切れる
- **コスト**: ログ・トレースの収集・保存コストが大きい
- → 3本柱: **Metrics（何が起きたか）/ Logs（詳細）/ Traces（どこで起きたか）**


---

# CloudWatch Lambda Insights

> *Lambda Extensionが自動収集するcpu_total_time/memory_utilization/init_durationで性能把握*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレスオブザーバビリティ 3本柱</text><rect x="20" y="58" width="200" height="210" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="120" y="82" font-family="sans-serif" font-size="16" fill="#1565c0" text-anchor="middle" font-weight="bold">Metrics</text><text x="120" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">何が起きたか</text><text x="120" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Lambda Insights</text><text x="120" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">ConcurrentExecutions</text><text x="120" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Duration / Errors / Throttles</text><text x="120" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">IteratorAge (Stream遅延)</text><rect x="240" y="58" width="200" height="210" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="340" y="82" font-family="sans-serif" font-size="16" fill="#6a1b9a" text-anchor="middle" font-weight="bold">Logs</text><text x="340" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">詳細を知る</text><text x="340" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Logs (構造化JSON)</text><text x="340" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda Powertools Logger</text><text x="340" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Logs Insights でクエリ分析</text><text x="340" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">correlation_id でトレース</text><rect x="460" y="58" width="200" height="210" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="560" y="82" font-family="sans-serif" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Traces</text><text x="560" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">どこで起きたか</text><text x="560" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">X-Ray 分散トレーシング</text><text x="560" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Segment / Subsegment</text><text x="560" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">サービスマップで可視化</text><text x="560" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Powertools Tracer で簡易実装</text><rect x="40" y="283" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Powertools: Logger / Tracer / Metrics を一括導入</text><text x="400" y="323" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">capture_cold_start_metric=True で コールドスタート頻度をメトリクス化</text></svg>
- Lambda専用の詳細パフォーマンスモニタリング
- Lambda Extensionとして実行環境に自動組み込み
- **収集メトリクス**: cpu_total_time, memory_utilization, init_duration
- **収集メトリクス**: rx_bytes, tx_bytes（VPC Lambdaのみ）
- CloudWatch Dashboardで自動可視化
- 有効化: Lambda設定からワンクリックまたはCFnで


---

# 重要CloudWatchメトリクス

| メトリクス | 意味 | アラーム閾値例 |
|-----------|------|--------------|
| Duration | 実行時間 | タイムアウト値の80% |
| Errors | エラー数 | > 0（即時アラート）|
| Throttles | スロットリング回数 | > 0 |
| ConcurrentExecutions | 同時実行数 | 上限の80% |
| IteratorAge | Streamの遅延 | > 60,000ms |
| DeadLetterErrors | DLQ書き込み失敗 | > 0 |


---

# X-Ray トレーシング概要

> *X-RayのTrace/Segment/SubsegmentでLambda+DynamoDB+外部APIの全体フローを可視化*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレスオブザーバビリティ 3本柱</text><rect x="20" y="58" width="200" height="210" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="120" y="82" font-family="sans-serif" font-size="16" fill="#1565c0" text-anchor="middle" font-weight="bold">Metrics</text><text x="120" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">何が起きたか</text><text x="120" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Lambda Insights</text><text x="120" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">ConcurrentExecutions</text><text x="120" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Duration / Errors / Throttles</text><text x="120" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">IteratorAge (Stream遅延)</text><rect x="240" y="58" width="200" height="210" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="340" y="82" font-family="sans-serif" font-size="16" fill="#6a1b9a" text-anchor="middle" font-weight="bold">Logs</text><text x="340" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">詳細を知る</text><text x="340" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Logs (構造化JSON)</text><text x="340" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda Powertools Logger</text><text x="340" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Logs Insights でクエリ分析</text><text x="340" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">correlation_id でトレース</text><rect x="460" y="58" width="200" height="210" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="560" y="82" font-family="sans-serif" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Traces</text><text x="560" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">どこで起きたか</text><text x="560" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">X-Ray 分散トレーシング</text><text x="560" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Segment / Subsegment</text><text x="560" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">サービスマップで可視化</text><text x="560" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Powertools Tracer で簡易実装</text><rect x="40" y="283" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Powertools: Logger / Tracer / Metrics を一括導入</text><text x="400" y="323" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">capture_cold_start_metric=True で コールドスタート頻度をメトリクス化</text></svg>
- 分散リクエストのEnd-to-Endトレースを収集・可視化
- **Trace**: リクエスト全体のライフサイクル
- **Segment**: 各サービス（Lambda, DynamoDB, etc.）の処理
- **Subsegment**: 関数内の特定処理区間
- Lambda関数のアクティブトレーシングを有効化するだけで自動計装
- サービスマップでサービス間の依存関係と遅延を可視化


---

# X-Ray カスタムサブセグメント

- 外部API呼び出し・重要ビジネスロジックをサブセグメントで計装
- エラー・フォルト・スロットリングの自動分類
- アノテーション（インデックス付き）とメタデータで情報付加


---

# X-Ray カスタムサブセグメント（コード例）

```python
import boto3
from aws_xray_sdk.core import xray_recorder

@xray_recorder.capture('process_order')
def process_order(order_id: str):
    with xray_recorder.in_subsegment('validate') as sub:
        sub.put_annotation('order_id', order_id)
        result = validate_order(order_id)
    with xray_recorder.in_subsegment('db_write'):
        save_order(result)
    return result
```


---

# Lambda Powertools for Python/TypeScript

> *Lambda Powertoolsの構造化Logger+X-RayラッパーTracer+Metricsが観測可能性の標準実装*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレスオブザーバビリティ 3本柱</text><rect x="20" y="58" width="200" height="210" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="120" y="82" font-family="sans-serif" font-size="16" fill="#1565c0" text-anchor="middle" font-weight="bold">Metrics</text><text x="120" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">何が起きたか</text><text x="120" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Lambda Insights</text><text x="120" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">ConcurrentExecutions</text><text x="120" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Duration / Errors / Throttles</text><text x="120" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">IteratorAge (Stream遅延)</text><rect x="240" y="58" width="200" height="210" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="340" y="82" font-family="sans-serif" font-size="16" fill="#6a1b9a" text-anchor="middle" font-weight="bold">Logs</text><text x="340" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">詳細を知る</text><text x="340" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Logs (構造化JSON)</text><text x="340" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda Powertools Logger</text><text x="340" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Logs Insights でクエリ分析</text><text x="340" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">correlation_id でトレース</text><rect x="460" y="58" width="200" height="210" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="560" y="82" font-family="sans-serif" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Traces</text><text x="560" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">どこで起きたか</text><text x="560" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">X-Ray 分散トレーシング</text><text x="560" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Segment / Subsegment</text><text x="560" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">サービスマップで可視化</text><text x="560" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Powertools Tracer で簡易実装</text><rect x="40" y="283" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Powertools: Logger / Tracer / Metrics を一括導入</text><text x="400" y="323" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">capture_cold_start_metric=True で コールドスタート頻度をメトリクス化</text></svg>
- AWS公式のサーバーレスベストプラクティスライブラリ
- **Logger**: 構造化ログ（JSON）+ コンテキスト自動注入
- **Tracer**: X-Rayラッパー（カスタムセグメント簡易化）
- **Metrics**: EMF形式でカスタムCloudWatchメトリクス送信
- **Event Handler**: API GW, SQS, S3 イベントの型安全なパース
- **Idempotency**: べき等性保証（DynamoDBベース）


---

# Powertools Logger

- JSON構造化ログ + Lambda コンテキスト自動付加
- `correlation_id` でリクエストをトレース可能
- ログレベル: DEBUG/INFO/WARNING/ERROR/CRITICAL


---

# Powertools Logger（コード例）

```python
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger(service="order-service")

@logger.inject_lambda_context(correlation_id_path="headers.x-request-id")
def handler(event: dict, context: LambdaContext):
    logger.info("Processing order",
        extra={"order_id": event["orderId"],
               "user_id": event["userId"]})
    # 出力: {"service":"order-service",
    #        "level":"INFO","order_id":"..."}
```


---

# Powertools Metrics

- EMF (Embedded Metrics Format) でCloudWatchカスタムメトリクスを送信
- CloudWatchへの追加API呼び出し不要（ログに埋め込み）
- ディメンション・名前空間・単位を指定


---

# Powertools Metrics（コード例）

```python
from aws_lambda_powertools import Metrics
from aws_lambda_powertools.metrics import MetricUnit

metrics = Metrics(namespace="OrderService",
                  service="order-processor")

@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context):
    # ビジネスメトリクスの記録
    metrics.add_metric(name="OrdersProcessed",
                       unit=MetricUnit.Count,
                       value=len(event["orders"]))
    metrics.add_dimension(name="Environment",
                          value="production")
```


---

# CloudWatch Logs Insights 活用

- Lambda構造化ログをリアルタイムにクエリ分析
- エラーパターンの調査・パフォーマンス分析に活用
- 定期実行でメトリクスフィルターの代替も可能


---

# CloudWatch Logs Insights 活用（コード例）

```sql
# エラー率の高い関数を特定
fields @timestamp, @message, @logStream
| filter @type = "REPORT"
| parse @message
    "Duration: * ms" as duration
| filter ispresent(@initDuration)
| stats
    avg(duration) as avgDuration,
    count() as invocations
  by @logStream
| sort avgDuration desc
| limit 10
```


---

# アラーム設計パターン

> *エラー率>1%アラームとP99レイテンシ>75%タイムアウトで本番問題を早期検知*

- <svg viewBox="0 0 800 355" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="355" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">サーバーレスオブザーバビリティ 3本柱</text><rect x="20" y="58" width="200" height="210" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="120" y="82" font-family="sans-serif" font-size="16" fill="#1565c0" text-anchor="middle" font-weight="bold">Metrics</text><text x="120" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">何が起きたか</text><text x="120" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Lambda Insights</text><text x="120" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">ConcurrentExecutions</text><text x="120" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Duration / Errors / Throttles</text><text x="120" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">IteratorAge (Stream遅延)</text><rect x="240" y="58" width="200" height="210" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="340" y="82" font-family="sans-serif" font-size="16" fill="#6a1b9a" text-anchor="middle" font-weight="bold">Logs</text><text x="340" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">詳細を知る</text><text x="340" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">CloudWatch Logs (構造化JSON)</text><text x="340" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda Powertools Logger</text><text x="340" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Logs Insights でクエリ分析</text><text x="340" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">correlation_id でトレース</text><rect x="460" y="58" width="200" height="210" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="560" y="82" font-family="sans-serif" font-size="16" fill="#2e7d32" text-anchor="middle" font-weight="bold">Traces</text><text x="560" y="100" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">どこで起きたか</text><text x="560" y="122" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">X-Ray 分散トレーシング</text><text x="560" y="144" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Segment / Subsegment</text><text x="560" y="166" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">サービスマップで可視化</text><text x="560" y="188" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Powertools Tracer で簡易実装</text><rect x="40" y="283" width="720" height="55" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="305" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda Powertools: Logger / Tracer / Metrics を一括導入</text><text x="400" y="323" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">capture_cold_start_metric=True で コールドスタート頻度をメトリクス化</text></svg>
- **エラー率アラーム**: Errors / Invocations > 1% で警告
- **P99レイテンシ**: Duration P99 > タイムアウトの75%
- **コールドスタート率**: InitDuration のある件数 / 全件
- **同時実行数**: ConcurrentExecutions > 上限の80%
- Composite Alarm: 複数条件をAND/ORで組み合わせ
- SNS → PagerDuty/Slack 連携で即時通知


---

# コスト可視化と最適化

> *Cost ExplorerのタグベースでLambdaコストをサービス別に追跡し最適化対象を特定*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- **AWS Cost Explorer**: Lambda のコストを日次/月次で可視化
- **コストタグ**: 関数ごとにタグを付けてサービス別コスト追跡
- **CloudWatch Metric Math**: GB・秒を計算してコスト予測
- トップ10の高コスト関数を特定して最適化優先順位付け
- Compute Savings Plans: コミットメントで最大17%削減
- Graviton2移行: 20%コスト削減（+性能向上）


---

# サーバーレスコスト計算式

> *arm64は$0.0000133334で20%安—100万回1秒512MBで月500K GB・秒の計算例*

- **リクエスト料金**: $0.0000002 / リクエスト
- **GB・秒料金**: $0.0000166667 / GB・秒 (x86) / $0.0000133334 (arm64)
- 例: 1秒 × 512MB × 100万回/月 = 500,000 GB・秒
- = 500,000 × $0.0000166667 = **$8.33/月**
- 無料枠: 100万リクエスト + 400,000 GB・秒/月
- **重要**: メモリ最適化で実行時間が半減 → コストも半減


---

<!-- _class: lead -->
# Part 5: セキュリティ・CI/CD

- 本番環境を安全に運用するための必須知識


---

# Lambdaセキュリティベストプラクティス

> *関数ごと専用IAMロール+KMS暗号化+Secrets Manager使用がLambdaセキュリティの最低基準*

- <svg viewBox="0 0 800 330" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="330" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda セキュリティモデル</text><rect x="30" y="55" width="340" height="130" fill="#0a0f1c" stroke="#f9a825" stroke-width="1.5" rx="8"/><text x="200" y="78" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">実行ロール (Execution Role)</text><text x="200" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Lambda → 他サービスを呼び出す権限</text><text x="200" y="118" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">例: DynamoDB 読み書き / S3 GetObject</text><text x="200" y="138" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">専用ロール作成 + 最小権限が必須</text><text x="200" y="157" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">IAM Access Analyzer で過剰権限を検出</text><rect x="430" y="55" width="340" height="130" fill="#0a0f1c" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="600" y="78" font-family="sans-serif" font-size="13" fill="#ce93d8" text-anchor="middle" font-weight="bold">リソースポリシー (Resource Policy)</text><text x="600" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">誰がこの関数を呼び出せるか</text><text x="600" y="118" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">例: API GW / S3 / EventBridge からの Invoke</text><text x="600" y="138" font-family="sans-serif" font-size="11" fill="#ce93d8" text-anchor="middle" font-weight="normal">クロスアカウント呼び出しにも使用</text><text x="600" y="157" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">Principal に specific ARN を指定</text><rect x="30" y="205" width="340" height="100" fill="#0a0f1c" stroke="#e65100" stroke-width="1.5" rx="8"/><text x="200" y="228" font-family="sans-serif" font-size="13" fill="#ff8a65" text-anchor="middle" font-weight="bold">シークレット管理</text><text x="200" y="248" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">Secrets Manager: 自動ローテーション対応</text><text x="200" y="266" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">SSM Parameter Store: SecureString</text><text x="200" y="284" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">Extension でローカルキャッシュ→API呼び出し削減</text><rect x="430" y="205" width="340" height="100" fill="#0a0f1c" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="600" y="228" font-family="sans-serif" font-size="13" fill="#81c784" text-anchor="middle" font-weight="bold">環境変数の暗号化</text><text x="600" y="248" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">デフォルト: Lambda マネージドキーで暗号化</text><text x="600" y="266" font-family="sans-serif" font-size="11" fill="#aaaacc" text-anchor="middle" font-weight="normal">カスタムKMSキーで強化暗号化</text><text x="600" y="284" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">ハードコードは絶対NG → 必ず外部参照</text></svg>
- **最小権限の原則**: 関数ごとに専用IAMロール作成
- **環境変数の暗号化**: KMSカスタムキーで暗号化
- **シークレット管理**: ハードコードせずSecrets Manager使用
- **依存パッケージ監査**: npm audit / pip-audit で脆弱性スキャン
- **コードスキャン**: Amazon CodeGuru / Snyk を CI/CDに組み込み
- **関数URLのCORS設定**: 許可オリジンを明示的に指定


---

# IAM 最小権限の実装

- 関数が必要とするサービスのみにアクセス許可
- ワイルドカード (`*`) の使用を最小限に
- IAM Access Analyzerでポリシーの過剰権限を検出


---

# IAM 最小権限の実装（コード例）

```yaml
# 最小権限ポリシーの例 (SAM)
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable
        - SSMParameterReadPolicy:
            ParameterName: /prod/db-config
      # AmazonDynamoDBFullAccess などの広すぎるポリシーは使わない
```


---

# シークレット管理

> *Secrets ManagerとSSM Parameter Storeで認証情報を管理—Lambda Extensionのキャッシュで高速化*

- **AWS Secrets Manager**: DB認証情報・APIキーの自動ローテーション
- **AWS SSM Parameter Store**: 設定値の階層管理（SecureString）
- キャッシュ: Lambda Extensionがローカルにキャッシュ（API呼び出し削減）
- Secrets Manager Extension: TTL付きローカルキャッシュを自動管理


---

# シークレット管理（コード例）

```python
import boto3
from aws_lambda_powertools.utilities import parameters

# Powertools でSecrets Managerから取得（キャッシュ付き）
# max_age: キャッシュTTL（秒）
db_secret = parameters.get_secret(
    "/prod/db-credentials",
    max_age=300,
    transform="json"
)
connection = create_connection(
    host=db_secret["host"],
    password=db_secret["password"]
)
```


---

# VPC Lambda の設計

> *VPC Lambda+NAT Gateway構成でRDS/ElastiCacheに接続—NAT Gatewayコストに注意*

- <svg viewBox="0 0 800 370" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="370" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda VPC アーキテクチャ</text><rect x="40" y="50" width="720" height="300" fill="none" stroke="#555577" stroke-width="2" stroke-dasharray="8,4" rx="12"/><text x="400" y="72" font-family="sans-serif" font-size="12" fill="#888899" text-anchor="middle" font-weight="normal">VPC</text><rect x="60" y="85" width="300" height="240" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3" rx="8"/><text x="210" y="105" font-family="sans-serif" font-size="11" fill="#1565c0" text-anchor="middle" font-weight="normal">Private Subnet</text><rect x="80" y="115" width="120" height="44" fill="#16213e" stroke="#f9a825" stroke-width="1.5" rx="6"/><text x="140" y="141" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">Lambda</text><rect x="80" y="185" width="120" height="44" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="6"/><text x="140" y="211" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">RDS / ElastiCache</text><line x1="200" y1="137" x2="200" y2="175" stroke="#f9a825" stroke-width="2.5"/><polygon points="200,185 195,175 205,175" fill="#f9a825"/><rect x="230" y="115" width="120" height="44" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="6"/><text x="290" y="141" font-family="sans-serif" font-size="12" fill="#ce93d8" text-anchor="middle" font-weight="normal">VPC Endpoint</text><line x1="200" y1="137" x2="220" y2="137" stroke="#ce93d8" stroke-width="2.5"/><polygon points="230,137 220,142 220,132" fill="#ce93d8"/><rect x="430" y="115" width="120" height="44" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="6"/><text x="490" y="141" font-family="sans-serif" font-size="12" fill="#ff8a65" text-anchor="middle" font-weight="normal">NAT Gateway</text><rect x="430" y="185" width="120" height="44" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="6"/><text x="490" y="211" font-family="sans-serif" font-size="11" fill="#ff8a65" text-anchor="middle" font-weight="normal">Internet Gateway</text><line x1="490" y1="159" x2="490" y2="175" stroke="#f9a825" stroke-width="2.5"/><polygon points="490,185 485,175 495,175" fill="#f9a825"/><rect x="600" y="115" width="140" height="44" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="6"/><text x="670" y="141" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">AWS Services</text><line x1="230" y1="137" x2="420" y2="137" stroke="#ce93d8" stroke-width="2.5"/><polygon points="430,137 420,142 420,132" fill="#ce93d8"/><line x1="550" y1="137" x2="590" y2="137" stroke="#ff8a65" stroke-width="2.5"/><polygon points="600,137 590,142 590,132" fill="#ff8a65"/><rect x="40" y="305" width="720" height="50" fill="#0a0f1c" stroke="#444466" stroke-width="1.5" rx="6"/><text x="400" y="328" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">2019年以降 ENI 割り当て改善 → コールドスタート遅延は大幅改善済み</text><text x="400" y="346" font-family="sans-serif" font-size="12" fill="#aaaacc" text-anchor="middle" font-weight="normal">VPC外サービス (DynamoDB/S3) は VPC Endpoint で最適化</text></svg>
- VPC内のプライベートリソース（RDS, ElastiCache）にアクセス
- **必要なもの**: プライベートサブネット + セキュリティグループ
- **インターネットアクセス**: NAT Gateway 経由（コスト注意）
- **AWSサービスアクセス**: VPC Endpoint 経由（DynamoDB, S3, etc.）
- ENI: VPC Lambda はENIを使用（2019年以降は起動遅延大幅改善）
- 推奨: 本当にVPCが必要なケースのみ適用（コスト・複雑性増加）


---

# AWS SAM による CI/CD

> *SAM build→package→deployの3コマンドで完結するサーバーレスCI/CDパイプライン*

- <svg viewBox="0 0 800 385" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="385" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SAM / CDK CI/CD デプロイパイプライン</text><rect x="5" y="85" width="110" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Code Push</text><text x="60" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Git)</text><rect x="155" y="85" width="110" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="210" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">CodeBuild</text><text x="210" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Test+Build)</text><rect x="325" y="85" width="110" height="90" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="380" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">SAM Package</text><text x="380" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">/ CDK Synth</text><rect x="490" y="85" width="110" height="90" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="8"/><text x="545" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Canary</text><text x="545" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Deploy 10%</text><rect x="645" y="85" width="110" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="700" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Production</text><text x="700" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">100%</text><line x1="115" y1="130" x2="145" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="155,130 145,135 145,125" fill="#f9a825"/><line x1="265" y1="130" x2="315" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="325,130 315,135 315,125" fill="#f9a825"/><line x1="435" y1="130" x2="480" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="490,130 480,135 480,125" fill="#f9a825"/><line x1="600" y1="130" x2="635" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,130 635,135 635,125" fill="#f9a825"/><rect x="490" y="240" width="180" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="580" y="265" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">CloudWatch Alarm</text><text x="580" y="283" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">エラー率監視 → 自動ロールバック</text><line x1="580" y1="175" x2="580" y2="230" stroke="#e91e63" stroke-width="2.5"/><polygon points="580,240 575,230 585,230" fill="#e91e63"/><rect x="40" y="240" width="200" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="140" y="265" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Pre/Post Traffic</text><text x="140" y="283" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">Hooks: テスト Lambda</text><line x1="490" y1="265" x2="260" y2="265" stroke="#90caf9" stroke-width="2.5"/><polygon points="250,265 260,260 260,270" fill="#90caf9"/><rect x="40" y="315" width="720" height="50" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="340" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">DeploymentPreference: Canary10Percent5Minutes / Linear10PercentEvery1Minute</text></svg>
- SAM (Serverless Application Model): CFnの拡張IaC
- `sam build` → `sam package` → `sam deploy` のシンプルなフロー
- **SAM Pipeline**: CodePipeline + CodeBuild を自動設定
- カナリアデプロイ: `DeploymentPreference` でTraffic Shiftを設定
- Pre/Post Traffic Hooks: デプロイ前後にテスト Lambda を自動実行


---

# AWS SAM による CI/CD（コード例）

```yaml
# SAM テンプレート（カナリアデプロイ）
MyFunction:
  Type: AWS::Serverless::Function
  Properties:
    AutoPublishAlias: live
    DeploymentPreference:
      Type: Canary10Percent5Minutes
      Alarms:
        - !Ref MyFunctionErrorAlarm
      Hooks:
        PreTraffic: !Ref PreTrafficTestFunction
```


---

# AWS CDK による Lambda 管理

> *CDKのNodejsFunctionはesbuildで自動バンドル—型安全なIaCでLambdaインフラを管理*

- <svg viewBox="0 0 800 385" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="385" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">SAM / CDK CI/CD デプロイパイプライン</text><rect x="5" y="85" width="110" height="90" fill="#16213e" stroke="#555577" stroke-width="1.5" rx="8"/><text x="60" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Code Push</text><text x="60" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Git)</text><rect x="155" y="85" width="110" height="90" fill="#16213e" stroke="#1565c0" stroke-width="1.5" rx="8"/><text x="210" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">CodeBuild</text><text x="210" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">(Test+Build)</text><rect x="325" y="85" width="110" height="90" fill="#16213e" stroke="#6a1b9a" stroke-width="1.5" rx="8"/><text x="380" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">SAM Package</text><text x="380" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">/ CDK Synth</text><rect x="490" y="85" width="110" height="90" fill="#16213e" stroke="#e65100" stroke-width="1.5" rx="8"/><text x="545" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Canary</text><text x="545" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Deploy 10%</text><rect x="645" y="85" width="110" height="90" fill="#16213e" stroke="#2e7d32" stroke-width="1.5" rx="8"/><text x="700" y="118" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">Production</text><text x="700" y="138" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">100%</text><line x1="115" y1="130" x2="145" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="155,130 145,135 145,125" fill="#f9a825"/><line x1="265" y1="130" x2="315" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="325,130 315,135 315,125" fill="#f9a825"/><line x1="435" y1="130" x2="480" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="490,130 480,135 480,125" fill="#f9a825"/><line x1="600" y1="130" x2="635" y2="130" stroke="#f9a825" stroke-width="2.5"/><polygon points="645,130 635,135 635,125" fill="#f9a825"/><rect x="490" y="240" width="180" height="60" fill="#0d1b2a" stroke="#e91e63" stroke-width="1.5" rx="6"/><text x="580" y="265" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">CloudWatch Alarm</text><text x="580" y="283" font-family="sans-serif" font-size="10" fill="#ccccdd" text-anchor="middle" font-weight="normal">エラー率監視 → 自動ロールバック</text><line x1="580" y1="175" x2="580" y2="230" stroke="#e91e63" stroke-width="2.5"/><polygon points="580,240 575,230 585,230" fill="#e91e63"/><rect x="40" y="240" width="200" height="60" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" rx="6"/><text x="140" y="265" font-family="sans-serif" font-size="12" fill="#90caf9" text-anchor="middle" font-weight="bold">Pre/Post Traffic</text><text x="140" y="283" font-family="sans-serif" font-size="10" fill="#aaaacc" text-anchor="middle" font-weight="normal">Hooks: テスト Lambda</text><line x1="490" y1="265" x2="260" y2="265" stroke="#90caf9" stroke-width="2.5"/><polygon points="250,265 260,260 260,270" fill="#90caf9"/><rect x="40" y="315" width="720" height="50" fill="#0a0f1c" stroke="#333366" stroke-width="1.5" rx="6"/><text x="400" y="340" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="normal">DeploymentPreference: Canary10Percent5Minutes / Linear10PercentEvery1Minute</text></svg>
- TypeScript/PythonコードでLambdaインフラを定義
- 型安全なIaC: IDEの補完・リファクタリングが活用可能
- **NodejsFunction**: esbuildで自動バンドル・最小化
- **PythonFunction**: Poetry/pipでパッケージ管理
- Constructs: 再利用可能なインフラコンポーネントをライブラリ化
- cdk-nag: セキュリティベストプラクティス違反を自動検出


---

# AWS CDK による Lambda 管理（コード例）

```typescript
const fn = new NodejsFunction(this, 'OrderHandler', {
  entry: 'src/handlers/order.ts',
  handler: 'handler',
  runtime: Runtime.NODEJS_22_X,
  architecture: Architecture.ARM_64,
  memorySize: 512,
  timeout: Duration.seconds(30),
  environment: { TABLE_NAME: table.tableName },
  bundling: { minify: true, sourceMap: true },
});
```


---

# まとめ: キーテイクアウェイ

> *SnapStart/Provisioned/軽量ランタイム・Power Tuning・イベント駆動の3要点が今日の結論*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
- **コールドスタート**: SnapStart / Provisioned Concurrency / 軽量ランタイムで対策
- **パフォーマンス**: Power Tuningで最適メモリを計測・初期化コードをグローバルスコープへ
- **アーキテクチャ**: イベント駆動 + SQS/EventBridge + Step Functions で疎結合に
- **オブザーバビリティ**: Lambda Powertools (Logger/Tracer/Metrics) を必ず導入
- **セキュリティ**: 最小権限 + Secrets Manager + VPC設計
- **コスト**: Graviton2 + メモリ最適化 + Savings Plans


---

# アーキテクチャ決定マトリクス

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">パフォーマンス最適化マトリクス</text><rect x="40" y="60" width="155" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="117.5" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">最適化カテゴリ</text><rect x="197" y="60" width="370" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="382" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">手法</text><rect x="569" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="604" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">効果</text><rect x="641" y="60" width="70" height="32" fill="#0d1b2a" stroke="#f9a825" stroke-width="1.5" rx="4"/><text x="676" y="80" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">コスト</text><rect x="40" y="95" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">コールドスタート</text><rect x="197" y="95" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="117" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SnapStart / Provisioned Concurrency / 軽量ランタイム</text><rect x="569" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="117" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="95" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="117" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">中〜高</text><rect x="40" y="135" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">実行速度</text><rect x="197" y="135" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="157" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">メモリ最適化 (Power Tuning) / グローバルスコープ初期化</text><rect x="569" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="157" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="135" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="157" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text><rect x="40" y="175" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">接続管理</text><rect x="197" y="175" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="197" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">RDS Proxy / ElastiCache / 接続プーリング</text><rect x="569" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="197" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="175" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="197" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低〜中</text><rect x="40" y="215" width="155" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">依存サイズ</text><rect x="197" y="215" width="370" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="237" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">tree-shaking / AWS SDK v3 モジュール別 / esbuild</text><rect x="569" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="237" font-family="sans-serif" font-size="11" fill="#ffcc80" text-anchor="middle" font-weight="normal">中</text><rect x="641" y="215" width="70" height="36" fill="#0a0f1c" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="237" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">無料</text><rect x="40" y="255" width="155" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="117.5" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">スロットリング</text><rect x="197" y="255" width="370" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="382" y="277" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" font-weight="normal">SQS バッファリング / Reserved Concurrency 設定</text><rect x="569" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="604" y="277" font-family="sans-serif" font-size="11" fill="#81c784" text-anchor="middle" font-weight="normal">高</text><rect x="641" y="255" width="70" height="36" fill="#0d1b2a" stroke="#333355" stroke-width="1.5" rx="4"/><text x="676" y="277" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="normal">低</text></svg>
| ユースケース | 推奨構成 | 注意点 |
|------------|---------|--------|
| REST API | HTTP API + Lambda + DynamoDB | N+1クエリ回避 |
| バッチ処理 | SQS + Lambda + DLQ | 冪等性保証 |
| ワークフロー | Step Functions Standard | コスト（状態遷移単価）|
| ストリーム | Kinesis + Lambda | シャード数設計 |
| スケジュール | EventBridge Scheduler | タイムゾーン考慮 |
| 15分超処理 | Fargate/ECS + SQS | Lambda上限超え |


---

# 参考リソース

> *Lambda Developer Guide・Serverless Land・Well-Architectedフレームワークが公式学習リソース*

- **公式ドキュメント:**
- - [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)
- - [Serverless Land Patterns](https://serverlessland.com/patterns)
- **ツール:**
- - [AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning)
- - [Lambda Powertools (Python/TS)](https://powertools.aws.dev/)


---

# 参考リソース (2/2)

> *Serverless Best Practices・The Burning MonkブログがLambda実践の最高品質参考情報*

- **ガイド・ブログ:**
- - [Serverless Best Practices (AWS Well-Architected)](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html)
- - [The Burning Monk Blog (Yan Cui)](https://theburningmonk.com/)
- **コース:**
- - [Production-Ready Serverless (Manning)](https://productionreadyserverless.com/)
- - AWS Skill Builder — Serverless Learning Plan


---

<!-- _class: lead -->
# Q & A

- ご質問をどうぞ
- 
- スライド資料: docs/20260219200000_aws-lambda-serverless-deep-dive/dist/
- Lambda Powertools: powertools.aws.dev
- Serverless Land: serverlessland.com

