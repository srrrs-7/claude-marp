---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "HIPAA on AWS"
footer: "© 2026 Healthcare Architecture Guide"
style: |
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section ul li {
    font-size: 0.92em;
    margin-bottom: 0.2em;
  }
  section h1 {
    font-size: 1.55em;
  }
  section h2 {
    font-size: 1.25em;
    color: #80deea;
  }
  table {
    font-size: 0.82em;
  }
---

<!-- _class: lead -->
# HIPAA on AWS

- **医療データ保護の完全実装ガイド**
- 
- 対象: 医療系SaaS開発者・アーキテクト
- 所要時間: 約120分 | スライド数: 90枚
- 
- HIPAA規制の全体像 | AWS適格サービス | 実装パターン | セキュリティコントロール

<!--
HIPAA (Health Insurance Portability and Accountability Act) on AWS の完全実装ガイド。医療系SaaSを構築する開発者・アーキテクト向けに、規制要件から実装パターンまで体系的に解説する。
-->

---

# 目次 (1/2)

- **Part 1**: HIPAA 規制の全体像 — 16スライド
- - 4つの主要ルール / PHI定義 / BAA / 罰則
- **Part 2**: AWS HIPAA 適格サービス — 13スライド
- - BAA対象サービス / 責任共有モデル
- **Part 3**: 実装アーキテクチャパターン — 21スライド
- - EHR / テレヘルス / FHIR / データレイク / IoT


---

# 目次 (2/2)

- **Part 4**: セキュリティコントロール — 21スライド
- - KMS暗号化 / IAM / VPC / 監査ログ / インシデント対応
- **Part 5**: 運用・コンプライアンス — 11スライド
- - 継続監視 / Audit Manager / HITRUST CSF
- **まとめ**: 実装ロードマップ・参考リソース — 4スライド


---

# HIPAA とは

- **Health Insurance Portability and Accountability Act (1996年)**
- 米国の医療情報プライバシー・セキュリティに関する連邦法
- **対象**: 米国で医療情報を扱う組織すべて
- **主な目的**:
- - 患者の医療情報プライバシーの保護
- - 電子化された健康情報のセキュリティ確保
- - 医療保険の継続性・ポータビリティの確保
- **対象外**: 学校・雇用者の健康記録（FERPA/ERISA が対象）
- **日本との関係**: 米国ユーザーを持つ医療SaaS は適用対象


---

<!-- _class: lead -->
# Part 1: HIPAA 規制の全体像

- **4つの主要ルール**
- 
- Privacy Rule: 患者情報の使用・開示ルール
- Security Rule: 電子PHIのセキュリティ要件
- Breach Notification Rule: 漏洩通知義務
- Omnibus Rule: ビジネスアソシエイトへの拡大適用

<!--
HIPAA は複数のルールで構成される。最も重要なのは Privacy Rule と Security Rule。
-->

---

# Covered Entity と Business Associate

- **Covered Entity (CE)**: HIPAA 直接適用対象
- - 医療提供者: 病院、クリニック、薬局、医師
- - 医療保険: 保険会社、HMO、Medicare/Medicaid
- - 医療情報交換所: 電子請求代行業者
- **Business Associate (BA)**: CE のために PHI を処理する組織
- - EMR/EHRベンダー、クラウドサービスプロバイダー
- - AWS は PHI を処理する場合 BA となる
- **重要**: BA も HIPAA の Security Rule に直接拘束される（Omnibus Rule 2013）


---

# PHI (Protected Health Information) の定義

- **過去・現在・将来の健康状態に関する情報 + 識別子を含む情報**
- **PHI の要件**: 以下のいずれかを含む場合
- 1. 医療状態・治療・医療費の情報
- 2. 個人を特定できる識別子（18種類）
- **電子PHI (ePHI)**: 電子的に作成・保存・転送される PHI
- → Security Rule の適用対象
- **ePHI の例**: 患者の診断記録、処方箋データ、検査結果
- **注意**: 社内従業員の健康情報 (EHR) も PHI に含まれる可能性


---

# PHI の 18 識別子

- HIPAA Safe Harbor で除去が必要な 18 種類の識別子:
- 1. 氏名 2. 地理情報（州より細かい）3. 日付（生年月日以外）
- 4. 電話番号 5. FAX番号 6. メールアドレス
- 7. SSN 8. 診療記録番号 9. 健康保険番号
- 10. アカウント番号 11. 証明書/ライセンス番号
- 12. 車両識別番号 13. デバイス識別子 14. URL
- 15. IPアドレス 16. 生体認証 17. 全顔写真
- 18. その他ユニーク識別子


---

# Privacy Rule: 使用・開示の要件

- **PHI の使用・開示は原則として患者の同意が必要**
- **同意不要の開示が認められるケース**:
- - 治療・支払い・医療運営 (TPO) 目的
- - 公衆衛生活動（感染症報告等）
- - 法的手続き・法執行機関への開示
- - 研究目的（IRB承認済み）
- **Minimum Necessary 原則**:
- - 目的に必要な最小限の PHI のみ使用・開示
- - ロールベースアクセス制御の法的根拠


---

# Security Rule: 3 つのセーフガード

- **Administrative Safeguards (管理的保護手段)** — 最重要
- - リスクアセスメント（必須）
- - セキュリティポリシー・手続き
- - 従業員トレーニング・アクセス管理
- **Physical Safeguards (物理的保護手段)**
- - ワークステーション・デバイスのセキュリティ
- - AWSデータセンターが対応（責任共有）
- **Technical Safeguards (技術的保護手段)**
- - アクセス制御・監査ログ・送信セキュリティ・整合性


---

# Security Rule: Technical Safeguards 詳細

- **アクセス制御 (Access Control)**:
- - 一意のユーザー識別子 (IAM ユーザー/ロール)
- - 緊急アクセス手順、自動ログオフ
- **監査ログ (Audit Controls)**:
- - ePHI へのアクセス・変更を記録 (CloudTrail, CloudWatch)
- **整合性 (Integrity)**:
- - ePHI の不正変更・破損を検知 (S3 バージョニング, ETag)
- **送信セキュリティ (Transmission Security)**:
- - 転送中の ePHI の暗号化 (TLS 1.2以上)
- - ネットワーク送信の整合性確保


---

# Business Associate Agreement (BAA)

- **CE と BA の間の契約（HIPAA 必須要件）**
- **BAA に含まれる内容**:
- - BA が PHI をどのように保護するかの規定
- - PHI の許可された使用・開示の範囲
- - セキュリティ侵害時の通知義務
- - PHI の返却または廃棄の手順
- **AWS BAA の締結方法**:
- - AWS Artifact でオンライン締結（即時）
- - 締結後は BAA 対象サービスのみで PHI を処理
- **重要**: BAA なしで AWS 上に PHI を置くことは HIPAA 違反


---

# Breach Notification Rule

- **ePHI の不正使用・開示（Breach）発生時の通知義務**
- **Breach の定義**: 許可されていない PHI の取得・アクセス・使用・開示
- **通知要件**:
- - 影響を受けた個人へ: 発見から60日以内
- - HHS (保健福祉省) へ: 毎年3月1日までの年次報告（500人未満）
- - メディアへ: 500人以上影響する場合、60日以内
- **Breach 除外**: 暗号化された ePHI の紛失（鍵が安全な場合）
- → 強力な暗号化が Breach Notification 免除の鍵


---

# HIPAA 違反の罰則

- **民事罰則 (Civil Monetary Penalties)**:
| 違反レベル | 最低額 | 最高額 |
|-----------|--------|--------|
| 知らなかった | $100/件 | $25,000/年 |
| 合理的な原因 | $1,000/件 | $100,000/年 |
| 故意の怠慢（修正済） | $10,000/件 | $250,000/年 |
| 故意の怠慢（未修正） | $50,000/件 | $1.9M/年 |
- **刑事罰**: 故意の違反は最大10年の禁固
- **実例**: Anthem (2015) — $16M、Premera — $6.85M


---

# デ識別化 (De-identification)

- **PHI から識別情報を除去して非 PHI にする手法**
- **方法1: Safe Harbor**
- - 18種類の識別子をすべて除去
- - 残存する情報で個人特定できないと確認
- **方法2: Expert Determination**
- - 統計・科学の専門家が再識別リスクが低いと証明
- - ℓ-多様性、k-匿名性などの技術を活用
- **AWS での実装**:
- - Amazon Comprehend Medical: PHI 検出・マスキング
- - AWS Glue + Lambda: ETL パイプラインでのデ識別化
- **注意**: デ識別化後でも再識別リスクの継続的評価が必要


---

# HIPAA vs GDPR vs 日本個人情報保護法

| 項目 | HIPAA | GDPR | 個人情報保護法 |
|------|-------|------|--------------|
| 適用地域 | 米国 | EU/EEA | 日本 |
| 対象情報 | 医療情報 | 全個人データ | 全個人情報 |
| 罰則 | $1.9M/年 | 売上の4% | 1億円以下 |
| 本人権利 | 限定的 | 包括的 | 開示・訂正 |
| 越境移転 | - | 十分性認定 | 十分性基準 |
- **医療SaaS**: HIPAA + GDPR + 個情法の多重対応が必要な場合あり


---

# Omnibus Rule (2013年) の影響

- **2013年の HIPAA 改正: ビジネスアソシエイトへの直接適用**
- **主な変更点**:
- - BA のサブコントラクターも HIPAA に直接拘束
- - BA と CE が同等の責任を負う
- - PHI 販売・マーケティング利用の制限強化
- - 患者の電子ヘルスレコードへのアクセス権強化
- **クラウドへの影響**:
- - AWS, Google Cloud, Azure が BA として直接 HIPAA 義務を負う
- - IaaS プロバイダーへの BAA 要件の明確化
- **サブコントラクター BA**: AWS の下請け (CloudFront, S3 など) も対象


---

<!-- _class: lead -->
# Part 2: AWS HIPAA 適格サービス

- **AWS BAA 対象サービスのみで PHI を処理可能**
- 
- コンピューティング / ストレージ / データベース
- ネットワーキング / セキュリティ / 分析・AI
- 
- AWS Artifact でサービス一覧を確認 → BAA を締結
- BAA 対象外サービスでの PHI 処理は禁止


---

# AWS BAA の締結と管理

- **AWS Artifact → 契約 → BAA をオンラインで締結**
- **締結後の効果**:
- - アカウント内の全 BAA 対象サービスで PHI 処理が可能
- - Organizations で管理アカウントから締結 → 全メンバーに適用
- **重要な注意事項**:
- - BAA 対象サービスの一覧は定期更新される（AWS 公式確認必須）
- - BAA 対象外サービスは PHI を「通過」させるだけでも違反
- - サードパーティ AWS Marketplace 製品は別途 BAA が必要
- **BAA の記録**: 6年間の保存義務（HHS 監査に備えて）


---

# HIPAA 適格サービス: コンピューティング

- **Amazon EC2**: ePHI 処理の基盤仮想マシン
- - 専有ホスト (Dedicated Host) / 専有インスタンス: 物理分離
- - Nitro Enclaves: 機密処理の隔離環境
- **AWS Lambda**: サーバーレスでの ePHI 処理
- **Amazon ECS / EKS**: コンテナでの ePHI ワークロード
- **AWS Fargate**: サーバーレスコンテナ（インフラ管理不要）
- **Amazon Lightsail**: 小規模医療アプリ向け
- **AWS Batch**: バッチ処理（大量 ePHI の ETL）


---

# HIPAA 適格サービス: ストレージ・データベース

- **ストレージ**:
- - Amazon S3: ePHI の主要ストレージ（暗号化必須）
- - Amazon EBS: EC2 アタッチストレージ
- - Amazon EFS: 共有ファイルシステム
- - AWS Storage Gateway: オンプレとのハイブリッド
- **データベース**:
- - Amazon RDS (MySQL, PostgreSQL, Oracle, SQL Server)
- - Amazon Aurora (MySQL/PostgreSQL 互換)
- - Amazon DynamoDB: NoSQL ePHI ストア
- - Amazon Redshift: 分析用データウェアハウス
- - Amazon ElastiCache: セッション管理（ePHI最小化）


---

# HIPAA 適格サービス: ネットワーク・セキュリティ

- **ネットワーク**:
- - Amazon VPC: プライベートネットワーク隔離
- - AWS Direct Connect: オンプレとの専用線接続
- - Amazon CloudFront: CDN（コンテンツ配信）
- - Elastic Load Balancing: SSL/TLS終端
- - AWS PrivateLink: プライベートサービス接続
- **セキュリティ**:
- - AWS KMS: ePHI 暗号化キー管理
- - AWS CloudHSM: 専有 HSM
- - AWS WAF: Web アプリケーション保護
- - AWS Certificate Manager: TLS 証明書管理


---

# HIPAA 適格サービス: 監視・分析・AI

- **監視・ログ**:
- - AWS CloudTrail: API 監査ログ（ePHI アクセス記録）
- - Amazon CloudWatch: メトリクス・ログ・アラーム
- - AWS Config: 設定変更の追跡
- - Amazon GuardDuty: 脅威検知
- **分析**:
- - Amazon Athena: S3 ログの SQL 分析
- - Amazon EMR: 大規模医療データ分析
- **AI/ML**:
- - Amazon Comprehend Medical: 医療テキスト解析・PHI 検出
- - Amazon HealthLake: FHIR 準拠のデータストア
- - Amazon Transcribe Medical: 医療音声認識


---

# AWS の責任共有モデル (HIPAA 文脈)

- **AWS が責任を持つ範囲**:
- - 物理的セキュリティ (Physical Safeguards)
- - インフラの暗号化機能の提供
- - サービスの可用性・冗長性
- - AWS データセンターの SOC2/ISO27001/HIPAA 認証
- **顧客が責任を持つ範囲**:
- - ePHI の適切な暗号化設定 (sse-kms など)
- - IAM ポリシーと最小権限の実装
- - ePHI へのアクセスログの有効化
- - Administrative Safeguards（ポリシー・トレーニング）
- - BAA の締結と管理


---

# AWS Artifact: コンプライアンスレポート

- **AWS のコンプライアンスドキュメントを無料でダウンロード**
- **取得できるレポート**:
- - HIPAA Compliance Whitepaper
- - SOC 1, SOC 2, SOC 3 レポート
- - ISO 27001, ISO 27017, ISO 27018 証明書
- - PCI DSS, FedRAMP レポート
- - GDPR DPA (データ処理補遺契約)
- **BAA 締結**: Artifact > 契約 > Business Associate Addendum
- **活用**: 監査人や顧客への AWS のコンプライアンス証明に使用


---

# BAA 対象外サービスの取り扱い

- **BAA 対象外サービスでは PHI を処理してはならない**
- **一般的な BAA 対象外サービス**:
- - Amazon SES (メール送信): PHI を含むメール本文は不可
- - Amazon SNS (一部の機能): プッシュ通知に PHI 不可
- - Amazon Rekognition: 顔認識（BAA確認必須）
- **対策**:
- - PHI をマスキングしてから BAA 対象外サービスに渡す
- - PHI を含む処理は BAA 対象サービスに留める
- - アーキテクチャ設計で PHI フローを明示的に管理
- **確認方法**: AWS HIPAA Eligible Services ページ（定期確認）


---

# Amazon HealthLake

- **FHIR R4 準拠の医療データストア (HIPAA 適格)**
- **機能**:
- - FHIR リソース (Patient, Observation, Condition) の保存・検索
- - 自動インデックス化 + FHIR SearchAPI
- - 組み込み ML: 医療 NLP、臨床 NER
- - データレイクへのエクスポート (S3 + Athena)
- **暗号化**: デフォルトで KMS 暗号化
- **アクセス制御**: IAM ポリシーで FHIR リソースタイプ別制御
- **ユースケース**: EHR データの統合・分析、患者ポータルバックエンド
- **注意**: HealthLake は設定次第でコストが増大しやすい


---

# Amazon Comprehend Medical

- **医療テキストから構造化情報を抽出する ML サービス**
- **抽出できるエンティティ**:
- - 症状、診断、薬品名、投薬量、頻度
- - 保護対象健康情報 (PHI) の検出
- - ICD-10-CM / RxNorm / SNOMED CT コードへのマッピング
- **PHI 検出と de-identification**:
- - DetectPHI API: テキスト中の PHI を検出
- - 氏名・日付・住所・ID などを自動マスキング
- **活用例**:
- - 医師の音声メモから構造化データへ
- - 医療記録の匿名化処理パイプライン


---

<!-- _class: lead -->
# Part 3: 実装アーキテクチャパターン

- **HIPAA 準拠システムの設計パターン**
- 
- EHR / テレヘルス / FHIR API
- 医療データレイク / サーバーレス / IoT
- マルチリージョン DR / CI/CD
- 
- すべてのパターンで ePHI 暗号化・最小権限・監査ログを確保


---

# HIPAA 準拠アーキテクチャの設計原則

- **1. ePHI の流れを明確化**: データフロー図で PHI の生成・処理・保存・廃棄を追跡
- **2. デフォルト暗号化**: 保存時 (KMS) + 転送時 (TLS 1.2以上)
- **3. 最小権限**: IAM ロールで ePHI アクセスを職務ごとに制限
- **4. 監査ログ**: CloudTrail + CloudWatch で全 ePHI アクセスを記録
- **5. ネットワーク隔離**: PHI を持つリソースはプライベートサブネットに配置
- **6. 自動コンプライアンス**: Config Rules + Security Hub で継続監視
- **7. インシデント対応計画**: PHI 漏洩時の手順書 (Runbook) を事前に準備


---

# EHR (電子健康記録) システムアーキテクチャ

- **EHR バックエンドの標準構成**:
- - フロント: CloudFront (WAF) → ALB → ECS (アプリ)
- - DB: Aurora PostgreSQL (暗号化) in プライベートサブネット
- - ファイル: S3 (SSE-KMS, Object Lock)
- - 認証: Cognito (MFA 必須) + IAM Identity Center
- - 監査: CloudTrail + CloudWatch Logs → S3 (Glacier)
- - 脅威検知: GuardDuty + Security Hub
- **ネットワーク構成**:
- - Public: ALB, NAT Gateway のみ
- - Private App: ECS タスク
- - Isolated DB: Aurora（インターネットアクセスなし）


---

# テレヘルス (遠隔医療) プラットフォーム

- **リアルタイムビデオ通話 + PHI 管理の統合アーキテクチャ**
- **ビデオ通話**: Amazon Chime SDK (HIPAA 適格)
- - セッション鍵は KMS で管理
- - 録画は S3 (SSE-KMS) に保存
- **予約管理**: Amazon DynamoDB (暗号化)
- **処方・診断記録**: Amazon RDS Aurora
- **患者認証**: Amazon Cognito (MFA 必須)
- **通知**: Amazon SNS → SES (PHI 非含有メール)
- **モバイル**: Amplify + AppSync (GraphQL API)
- **重要**: ビデオストリームに PHI が映り込まないよう設計


---

# FHIR API アーキテクチャ

- **HL7 FHIR R4 準拠 API の AWS 実装パターン**
- **API レイヤー**: API Gateway (WAF) → Lambda
- **データストア**:
- - Amazon HealthLake (フルマネージド FHIR)
- - または DynamoDB + Elasticsearch (カスタム実装)
- **認証**: OAuth 2.0 / SMART on FHIR (Cognito + Lambda Authorizer)
- **HL7 v2 変換**: AWS HealthImaging / Amazon EventBridge Pipes
- **監査**: API Gateway アクセスログ → CloudWatch
- **FHIR リソース例**: Patient, Observation, Medication, Encounter
- **相互運用性**: CMS Interoperability Rule (2020) に対応


---

# 医療データレイク (PHI 含む)

- **大規模 ePHI の分析基盤**
- **取り込み**: Kinesis Data Firehose → S3 (生データゾーン、SSE-KMS)
- **変換**: AWS Glue (ETL) → PHI のデ識別化またはマスキング
- **分析ゾーン**: S3 (匿名化済み) + Athena / Redshift Spectrum
- **ML**: SageMaker (匿名化データのみ) + Comprehend Medical
- **アクセス制御**: AWS Lake Formation で列レベル・行レベル制御
- **PHI ゾーン vs 匿名化ゾーン の分離**:
- - PHI ゾーン: BAA 対象サービスのみ、厳格な IAM
- - 匿名化ゾーン: 一般的な分析ツールでアクセス可


---

# サーバーレス医療データ処理

- **Lambda + Step Functions による ePHI 処理パイプライン**
- **ユースケース**: 医療画像処理、検査結果の自動分類
- **パターン**:
- - S3 イベント → Lambda (PHI 検証・変換) → DynamoDB
- - API Gateway → Lambda → HealthLake (FHIR CRUD)
- - EventBridge → Step Functions → 複数 Lambda (ワークフロー)
- **セキュリティ**:
- - Lambda 実行ロール: 最小権限 (対象 S3 バケット + KMS のみ)
- - VPC 内 Lambda: RDS/ElastiCache に直接接続
- - 環境変数の機密値: Secrets Manager で管理
- **注意**: Lambda のログに PHI を含めない


---

# 医療 IoT データ収集アーキテクチャ

- **ウェアラブル・医療機器からの PHI リアルタイム収集**
- **デバイス接続**: AWS IoT Core (HIPAA 適格)
- - MQTT over TLS 1.2 で暗号化転送
- - デバイス証明書 (X.509) による認証
- - IoT ポリシーで患者ごとのトピック分離
- **データフロー**:
- IoT Core → IoT Rules → Kinesis Data Streams → Lambda → DynamoDB/S3
- **アラート**: Lambda → SNS (医師への緊急アラート)
- **デバイス管理**: IoT Device Defender で異常検知
- **注意**: デバイスファームウェアの更新管理も PHI 保護の一環


---

# マルチリージョン DR 戦略

- **医療システムの高可用性 + 災害復旧**
- **RPO/RTO 目標**: PHI 損失を最小限に
- **戦略の選択**:
- - Pilot Light (RTO: 数時間): 最低限のリソースを常時起動
- - Warm Standby (RTO: 数分): 縮小スケールで常時稼働
- - Active-Active (RTO: ゼロ): 両リージョンで全負荷処理
- **Aurora Global Database**: プライマリ → セカンダリ (1秒以内レプリケーション)
- **S3 Cross-Region Replication (CRR)**: ePHI ファイルの自動複製
- **Route53**: ヘルスチェック + フェイルオーバールーティング
- **重要**: バックアップ先リージョンにも BAA が適用されるか確認


---

# HIPAA 準拠 CI/CD パイプライン

- **PHI を含むシステムのセキュアなデプロイ**
- **パイプライン**: CodePipeline → CodeBuild → CodeDeploy
- **セキュリティゲート**:
- - SAST: CodeGuru Security でコード脆弱性スキャン
- - 依存関係スキャン: Inspector (Lambda/コンテナ)
- - IaC スキャン: CloudFormation Guard / checkov
- - シークレット検出: git-secrets / detect-secrets
- **承認ゲート**: 本番デプロイに手動承認 (Change Management)
- **監査**: CodeBuild ログを CloudTrail で記録
- **注意**: CI/CD 環境に本番 PHI を持ち込まない（テストデータのみ）


---

# PHI のデータライフサイクル管理

- **HIPAA は PHI の適切な廃棄を義務付け**
- **保存期間ポリシー**:
- - 医療記録: 州法により5〜10年（成人）/ 21歳まで（未成年）
- - 監査ログ: 6年（HIPAA 要件）
- **S3 ライフサイクルポリシー**:
- - 現在世代: S3 Standard (アクティブアクセス)
- - 90日後: S3 Standard-IA
- - 1年後: S3 Glacier Instant Retrieval
- - 7年後: S3 Glacier Deep Archive
- **廃棄**: S3 Object Lock で保持期間を強制 → 期限後に自動削除
- **暗号化廃棄**: KMS キーを削除 → 暗号化データを安全に廃棄


---

# モバイルヘルスアプリバックエンド

- **患者向けモバイルアプリの HIPAA 準拠バックエンド**
- **認証**: Amazon Cognito (MFA + Biometric) + Hosted UI
- - アクセストークン有効期間: 最短設定 (1時間)
- **API**: API Gateway + Lambda (最小権限ロール)
- **データ**:
- - プロフィール・予約: DynamoDB (暗号化)
- - 医療記録: Aurora RDS (SSL/TLS + 暗号化)
- - 画像・ドキュメント: S3 (SSE-KMS)
- **プッシュ通知**: PHI を含まない通知のみ (Amazon SNS)
- **オフライン**: モバイル端末のローカルストレージに PHI を保存しない
- **Amplify DataStore**: PHI 同期は E2E 暗号化を確認


---

# バックアップ・リカバリ戦略

- **AWS Backup: PHI の一元バックアップ管理**
- **対応リソース**: EC2, RDS, Aurora, DynamoDB, EFS, S3
- **バックアッププラン設定**:
- - 日次バックアップ: 35日間保持
- - 週次バックアップ: 13週間保持
- - 月次バックアップ: 12ヶ月保持
- - 年次バックアップ: 7年保持（HIPAA 準拠）
- **暗号化**: バックアップは KMS CMK で暗号化
- **クロスアカウントバックアップ**: 本番アカウントとバックアップアカウントを分離
- **リカバリテスト**: 四半期ごとのリストア演習を実施


---

# Amazon HealthImaging (旧 Medical Imaging)

- **医療画像 (DICOM) の専用ストレージ・表示サービス**
- **対応フォーマット**: DICOM (CT, MRI, X線, 超音波)
- **機能**:
- - DICOM インポート (S3 → HealthImaging)
- - HTJ2K 形式で画像を最適圧縮（高速表示）
- - ビューワー向け ImageSet API
- - 検索・タグ付け・バージョン管理
- **セキュリティ**: KMS 暗号化、IAM でアクセス制御
- **HIPAA 適格**: BAA 対象サービス
- **統合**: HealthLake と組み合わせて FHIR リソースと画像を統合
- **コスト**: ストレージ費用を従来の PACS より低減


---

# 分析・ML パイプライン (PHI デ識別後)

- **匿名化済み PHI を活用した医療データ分析**
- **パイプライン**:
- - PHI データ (HealthLake) → Glue ETL (デ識別化) → S3 (匿名化ゾーン)
- - S3 → Athena / Redshift → QuickSight (ダッシュボード)
- - 匿名化データ → SageMaker (疾患予測モデル)
- **Comprehend Medical の活用**:
- - 臨床ノートから ICD-10 コードを自動抽出
- - 薬物相互作用の自動検出
- **Amazon QuickSight**: 医療 KPI の可視化（BAA 対象）
- **注意**: 分析結果を通じて個人が特定できないか再確認


---

# アーキテクチャレビューチェックリスト

- **設計フェーズでの確認項目**:
- - [ ] データフロー図で PHI の経路を完全に記載
- - [ ] BAA 対象サービスのみで PHI を処理
- - [ ] すべての PHI ストレージで KMS 暗号化を設定
- - [ ] PHI を持つリソースはプライベートサブネットに配置
- - [ ] CloudTrail + CloudWatch で全 PHI アクセスを記録
- - [ ] IAM 最小権限: 職務別ロールを設計
- - [ ] 障害・漏洩時のインシデント対応手順を文書化
- - [ ] BAA の保存と6年間の記録管理計画


---

<!-- _class: lead -->
# Part 4: セキュリティコントロール

- **HIPAA Technical Safeguards の AWS 実装**
- 
- 暗号化 (KMS) / IAM 最小権限
- ネットワーク隔離 / 監査ログ
- 脅威検知 / インシデント対応
- Zero Trust アーキテクチャ


---

# KMS による ePHI 暗号化

- **すべての ePHI に KMS CMK による暗号化を適用**
- **CMK 設計**:
- - ePHI 専用の CMK を作成（サービス共用不可）
- - キーポリシー: PHI アクセス権限を持つロールのみ許可
- - 自動キーローテーション: 年1回を有効化
- **サービス別設定**:
- - S3: SSE-KMS、バケットポリシーで `aws:SecureTransport` 強制
- - RDS/Aurora: ストレージ暗号化 (インスタンス作成時設定、後から変更不可)
- - DynamoDB: AWS マネージドキーまたは CMK
- - EBS: デフォルト暗号化を有効化
- **監査**: CloudTrail で CMK の使用履歴を記録


---

# IAM: PHI アクセス制御の設計

- **職務別 IAM ロールで ePHI へのアクセスを制限**
- **ロール設計例**:
- - `EHR-Clinician`: 患者の自担当記録のみ Read
- - `EHR-Admin`: 全記録 ReadWrite（監査ログ強化）
- - `EHR-Analytics`: 匿名化データのみ Read
- - `EHR-DevOps`: 本番 PHI に一切アクセス不可
- **条件キーの活用**:
- - `aws:RequestedRegion`: 特定リージョンのみアクセス許可
- - `aws:MultiFactorAuthPresent`: MFA 必須
- - ABAC: 患者タグと担当者タグの一致条件
- **定期レビュー**: IAM Access Analyzer + Credential Report で未使用権限削除


---

# S3 の完全 PHI 保護設定

- **ePHI を格納する S3 バケットの必須設定**:
- - SSE-KMS 暗号化 (CMK 指定)
- - パブリックアクセスブロック (4設定すべて ON)
- - バージョニング有効化 (誤削除防止)
- - Object Lock (WORM): 監査ログバケット
- - MFA Delete: 重要 PHI バケット
- - アクセスログ: 別バケットに記録
- **バケットポリシー**:
- - `aws:SecureTransport: false` を Deny (HTTPS 強制)
- - 特定 VPC エンドポイントからのみアクセス許可
- - 予期しないプリンシパルからのアクセスを Deny


---

# RDS/Aurora の PHI 保護

- **ePHI データベースの必須セキュリティ設定**
- **ネットワーク**:
- - プライベートサブネット (Isolated) に配置
- - Security Group: アプリサーバーのみ許可、0.0.0.0/0 拒否
- - パブリックアクセス: 無効
- **暗号化**:
- - ストレージ暗号化: KMS CMK（インスタンス作成時に設定）
- - SSL/TLS 接続強制: パラメータグループで `require_ssl=1`
- **認証**:
- - AWS IAM データベース認証 (パスワード不要)
- - Secrets Manager でパスワード自動ローテーション
- **監査**: RDS Enhanced Monitoring + Performance Insights
- **バックアップ**: 自動バックアップ 35日 + 手動スナップショット (KMS 暗号化)


---

# VPC 設計: PHI ネットワーク隔離

- **多層防御のための VPC 設計**
- **サブネット設計**:
- - Public: ALB, NAT Gateway のみ（PHI リソース禁止）
- - Private-App: ECS/EKS タスク、Lambda (VPC 内)
- - Isolated-DB: RDS Aurora (インターネットアクセスなし)
- **VPC エンドポイント**:
- - S3, DynamoDB: Gateway エンドポイント（無料）
- - KMS, SSM, CloudWatch, STS: Interface エンドポイント
- - HealthLake: Interface エンドポイント
- **Network Firewall**: IDS/IPS で PHI の不正流出を検知
- **VPC Flow Logs**: 全トラフィックを S3/CloudWatch に記録


---

# CloudTrail: PHI アクセス監査ログ

- **すべての ePHI アクセスを CloudTrail で記録**
- **必須設定**:
- - マルチリージョン証跡 + 組織証跡
- - S3 データイベント: ePHI バケットの GetObject/PutObject を記録
- - KMS データイベント: CMK の使用を全記録
- - ログファイル検証: 改ざん検知
- **ログ保護**:
- - 専用 S3 バケット + Object Lock (Compliance モード、6年)
- - SSE-KMS 暗号化
- **重要**: デフォルトの CloudTrail (Management Events) では S3 データアクセスは記録されない → Data Events を明示的に有効化


---

# CloudWatch: PHI アクセス異常検知

- **リアルタイムで PHI への不審アクセスを検知**
- **メトリクスフィルター + アラームの設定例**:
- - 営業時間外の PHI アクセス (夜間・休日)
- - 通常の10倍以上の PHI ダウンロード
- - 失敗した認証試行の急増
- - root アカウントでの操作
- **CloudWatch Logs Insights クエリ例**:
- ```
- fields @timestamp, eventSource, eventName, userIdentity.arn
| filter requestParameters.bucketName like 'phi-'
| sort @timestamp desc
- ```
- **アクション**: アラーム → SNS → セキュリティチームへの即時通知


---

# Amazon GuardDuty: 医療環境の脅威検知

- **ePHI 環境での GuardDuty 重要 Finding**:
- - `UnauthorizedAccess:S3/MaliciousIPCaller`: 悪意ある IP から S3 (PHI) アクセス
- - `Exfiltration:S3/ObjectRead.Unusual`: 通常と異なる大量の S3 読み取り
- - `CredentialAccess:RDS/MaliciousIPCaller.Failed`: RDS への不審なログイン試行
- - `Impact:EC2/BitcoinDomainRequest`: 医療インスタンスでのマイニング
- **自動対応**:
- - GuardDuty Finding → EventBridge → Lambda (S3 バケットポリシー緊急制限)
- - Finding → Security Hub → インシデント管理
- **EKS 保護**: GuardDuty EKS Audit Log Monitoring で Kubernetes API 監視


---

# Amazon Macie: PHI の自動検出

- **S3 バケット内の PHI を自動的に検出・分類**
- **HIPAA での活用**:
- - 匿名化処理が不完全な S3 オブジェクトを発見
- - 意図せず PHI を含むバケットを特定
- - 患者 ID, SSN, クレジットカード番号を検出
- **カスタム識別子**:
- - 医療記録番号（施設固有の形式）
- - NPI (National Provider Identifier) 番号
- - MRN (Medical Record Number)
- **感度スキャン設定**: `SENSITIVE_DATA_TYPES` に PHI 関連を含める
- **Finding → Security Hub → EventBridge → PHI 漏洩アラート**


---

# AWS Security Hub: HIPAA コントロール評価

- **HIPAA 関連のセキュリティコントロールを継続評価**
- **有効化すべきセキュリティ標準**:
- - AWS Foundational Security Best Practices (FSBP)
- - CIS AWS Foundations Benchmark
- **HIPAA に関連する主要コントロール**:
- - `S3.4`: S3 バケットのサーバー側暗号化
- - `RDS.3`: RDS インスタンスの暗号化
- - `CloudTrail.2`: CloudTrail ログファイル検証
- - `IAM.6`: root ユーザーのハードウェア MFA
- **自動修復**: Security Hub + EventBridge + Lambda で違反を自動修正


---

# Secrets Manager: PHI 関連シークレット管理

- **ePHI システムの認証情報・機密値を安全に管理**
- **格納するシークレット**:
- - RDS マスターパスワード（自動ローテーション）
- - APIキー (EHRベンダー、HL7インターフェース)
- - 暗号化キーのパスフレーズ
- **自動ローテーション設定**:
- - RDS: 組み込みローテーション（Lambda 自動作成）
- - カスタム: Lambda でローテーションロジック実装
- - ローテーション間隔: 90日以内（HIPAA Best Practice）
- **アクセス制御**: リソースポリシーで医療アプリのロールのみ許可
- **監査**: Secrets Manager API コールを CloudTrail で記録


---

# Amazon Inspector: 脆弱性管理

- **ePHI 処理環境の CVE 脆弱性を継続的にスキャン**
- **スキャン対象**:
- - EC2: OS パッケージの CVE (SSM Agent 必須)
- - Lambda: コードと依存ライブラリの脆弱性
- - ECR: コンテナイメージの CVE (プッシュ時自動スキャン)
- **HIPAA での重要性**:
- - Security Rule の「技術的脆弱性管理」要件への対応
- - 重大度 Critical / High の CVE には即時パッチ適用
- **Patch Manager との統合**:
- - Inspector で検出 → Security Hub → Patch Manager で自動パッチ
- **パッチ計画**: 本番 PHI 環境へのパッチは Change Management 承認後


---

# ペネトレーションテスト (Pentest)

- **HIPAA は定期的なセキュリティテストを要求**
- **AWS での Pentest の注意事項**:
- - AWS の事前承認が必要（AWS Customer Support Engagement Policy）
- - 自身の AWS リソースに対するテストは許可（一部サービス除く）
- - DDoS テスト・DNS hijacking は禁止
- **推奨するセキュリティテスト**:
- - 外部ペネトレーションテスト (年1回以上)
- - 内部脆弱性スキャン (四半期ごと)
- - SAST/DAST: コードレビュー + 動的スキャン
- - 社会工学的テスト (フィッシングシミュレーション)
- **記録**: テスト結果と修正内容を6年間保存


---

# PHI 漏洩インシデント対応プレイブック

- **PHI 漏洩 (Breach) 発生時の対応手順**
- **即時対応 (0〜1時間)**:
- 1. 漏洩元を特定・隔離（EC2, S3, アクセスキー）
- 2. GuardDuty / CloudTrail で影響範囲を特定
- 3. 法務・コンプライアンスチームへ通知
- **短期対応 (1〜24時間)**:
- 4. 影響を受けた PHI の件数・種類を特定
- 5. 不正アクセスに使用されたアカウント/ロールを無効化
- 6. フォレンジック調査のためスナップショット取得
- **通知 (60日以内)**:
- 7. 影響を受けた患者に個別通知
- 8. HHS に報告（500人以上の場合は即時）


---

# セキュリティ自動化: AWS Config + Lambda

- **非準拠の ePHI 環境設定を自動修復**
- **Config Rules + 自動修復の例**:
- - `s3-bucket-server-side-encryption-enabled` → S3 SSE-KMS を自動設定
- - `rds-storage-encrypted` → 違反 RDS を検出（修正は再作成が必要）
- - `cloudtrail-enabled` → CloudTrail が無効なら自動有効化
- - `root-mfa-enabled` → root MFA なしをアラート
- **Conformance Pack**:
- - HIPAA Security Rule に対応した Config Rules をパッケージ化
- - Organizations で全アカウントに一括展開
- **自動修復 Lambda**: HIPAA Conformance Pack の違反を自動修正


---

# Zero Trust アーキテクチャ for Healthcare

- **「信頼しない、常に検証する」原則を医療データに適用**
- **ID の検証**: IAM Identity Center + MFA + 条件付きアクセス
- **デバイスの検証**: AWS IoT Device Defender / Systems Manager Inventory
- **ネットワーク**:
- - VPC エンドポイントで PHI の通信をプライベートに
- - Network Firewall で East-West トラフィックを検査
- - マイクロセグメンテーション (Security Group を細粒度に)
- **データ**: 常時暗号化 (KMS) + アクセスログ
- **アプリ**: API Gateway + WAF + Lambda Authorizer
- **可視化**: AWS Network Access Analyzer で意図しない経路を発見


---

# サードパーティ統合のリスク管理

- **EMR ベンダー、保険会社、HL7 インターフェースとの統合**
- **サードパーティ BA の管理**:
- - 各 BA と BAA を締結し6年保存
- - BA のセキュリティアセスメントを年1回実施
- - BA アクセスには External ID + 最小権限 IAM ロール
- **API 統合のセキュリティ**:
- - HTTPS/TLS 1.2 以上必須
- - OAuth 2.0 / mTLS でサービス間認証
- - API Gateway で Rate Limiting + WAF
- **監視**: AWS PrivateLink でサードパーティとの通信をプライベート化
- **HL7/FHIR**: AWS HealthLake の SMART on FHIR 認証を活用


---

# Amazon Cognito: 患者・医師の認証

- **HIPAA 準拠のアイデンティティ管理**
- **必須設定**:
- - MFA 強制: TOTP / SMS（HIPAA 要件）
- - パスワードポリシー: 最低12文字、複雑度要件
- - セッションタイムアウト: 15〜30分のアイドルタイムアウト
- - 高度なセキュリティ機能: アダプティブ認証
- **ユーザープールの設計**:
- - 医師・スタッフ用プール (IAM Identity Center と連携)
- - 患者用プール (Cognito Hosted UI / SMART on FHIR)
- **SMART on FHIR**: FHIR API への OAuth 2.0 スコープ制御
- **ログ**: Cognito Advanced Security → CloudWatch Logs


---

# AWS WAF: 医療アプリの Web 保護

- **ePHI を扱う Web アプリを SQL インジェクション/XSS から保護**
- **ALB / API Gateway / CloudFront に WAF を適用**
- **ルール設定**:
- - AWS マネージドルール: Core Rule Set + SQL Injection
- - Bot Control: 自動スクレイピング・クローリングをブロック
- - IP レピュテーション: 既知の悪意ある IP をブロック
- - レートベース: 同一 IP からの大量リクエストをブロック
- **医療特有のカスタムルール**:
- - `/api/patients` エンドポイントへの異常な大量アクセスを制限
- - 特定 User-Agent (ヘルスチェック以外) の詳細検査
- **ログ**: WAF ログ → Kinesis Firehose → S3 → Athena


---

# セキュリティコントロールチェックリスト

- **Technical Safeguards の実装確認:**
- - [ ] 全 ePHI ストレージに KMS CMK 暗号化を設定
- - [ ] S3: パブリックアクセスブロック / SSE-KMS / TLS 強制
- - [ ] RDS: 暗号化 / プライベートサブネット / SSL 強制
- - [ ] CloudTrail: データイベント有効化 / ログ改ざん検知
- - [ ] IAM: MFA 必須 / 最小権限 / 未使用権限の定期削除
- - [ ] GuardDuty / Macie / Inspector: 全リージョンで有効化
- - [ ] VPC: PHI リソースをプライベートサブネットに配置
- - [ ] インシデント対応 Runbook を文書化・テスト済み


---

<!-- _class: lead -->
# Part 5: 運用・コンプライアンス

- **継続的な HIPAA コンプライアンスの維持**
- 
- 継続監視 / Audit Manager / Conformance Pack
- リスクアセスメント / Breach Notification
- HITRUST CSF との関係


---

# 継続的コンプライアンス監視

- **HIPAA は一度実装して終わりではなく、継続的な取り組み**
- **自動監視ツール**:
- - AWS Config: リソース設定の変更を継続監視
- - Security Hub: FSBP / CIS の継続スコアリング
- - GuardDuty + Macie: 脅威・PHI 漏洩を継続検知
- **人手による定期レビュー**:
- - 四半期: IAM アクセス権限レビュー、パッチ状況確認
- - 半年: リスクアセスメント更新
- - 年次: 外部 HIPAA 監査 / ペネトレーションテスト
- **スコアリング**: Security Hub のコンプライアンススコアを KPI として追跡


---

# AWS Audit Manager: HIPAA フレームワーク

- **HIPAA 監査証拠の自動収集**
- **HIPAA セキュリティルールフレームワーク**:
- - AWS マネージドフレームワークとして提供
- - Administrative / Physical / Technical Safeguards をカバー
- **証拠の自動収集**:
- - Config: リソース設定のスナップショット
- - CloudTrail: PHI アクセスログ
- - Security Hub: セキュリティ評価結果
- **評価レポート**: 監査人向けの PDF レポートを自動生成
- **カスタムコントロール**: 施設固有のコンプライアンス要件を追加
- **継続評価**: 新しい違反が検出されると Finding を更新


---

# AWS Config: HIPAA Conformance Pack

- **HIPAA Security Rule に対応した Config Rules のセット**
- **AWS 提供 Conformance Pack**:
- `Operational Best Practices for HIPAA Security`
- **含まれる主要ルール**:
- - `cloudtrail-enabled`
- - `s3-bucket-server-side-encryption-enabled`
- - `rds-storage-encrypted`
- - `iam-user-mfa-enabled`
- - `guardduty-enabled-centralized`
- - `vpc-flow-logs-enabled`
- **組織展開**: Organizations で全メンバーアカウントに自動適用
- **自動修復**: 非準拠検出時に SSM Automation で自動修正


---

# リスクアセスメントプロセス

- **HIPAA Security Rule が義務付ける必須プロセス**
- **リスクアセスメントの手順**:
- 1. ePHI の範囲確定（どのシステムにあるか）
- 2. 脅威と脆弱性の特定（脅威モデリング）
- 3. リスクの評価（可能性 × 影響度）
- 4. リスク対応策の実装
- 5. 残存リスクの文書化
- **AWS でのリスク特定ツール**:
- - Amazon Macie: 未知の PHI の発見
- - IAM Access Analyzer: 予期しないアクセス経路
- - AWS Well-Architected Tool: HIPAA リスクの体系的評価
- **頻度**: 少なくとも年1回 + 重大なシステム変更時


---

# 従業員トレーニングとアクセス管理

- **Administrative Safeguards: 人的コントロール**
- **セキュリティ意識向上トレーニング**:
- - 全従業員: 年1回以上の HIPAA トレーニング
- - 医療スタッフ: PHI 取り扱い手順の詳細トレーニング
- - IT スタッフ: セキュリティ技術トレーニング（AWS 特有）
- **アクセス管理プロセス**:
- - 入社時: 職務に応じた最小権限ロールを付与
- - 異動時: 旧権限を削除し新権限を付与
- - 退社時: 24時間以内に全アクセスを無効化
- **AWS での実装**: IAM Identity Center のライフサイクル管理
- **記録**: アクセス権限の変更を全て記録・保存（6年）


---

# Breach Notification の実務手順

- **PHI 漏洩発生から通知までの具体的手順**
- **Step 1: 発見と記録** (発見日から開始)
- - 漏洩日時、発見日時を記録
- - 影響を受けた PHI の種類と件数を確認
- **Step 2: Breach 判定** (通知不要の除外を確認)
- - 暗号化されていたか (Breach 除外の可能性)
- - 善意の内部アクセスか
- **Step 3: 通知準備** (60日以内)
- - 個人通知文書の作成（氏名・漏洩内容・対応策）
- - HHS 報告フォームの準備
- **Step 4: 通知実施**
- - 個人: 書面 (郵送) または電子通知
- - HHS: HHS Breach Portal からオンライン報告


---

# ビジネスアソシエイト管理

- **PHI を扱うすべてのベンダー・パートナーを管理**
- **BA 台帳の整備**:
- - BA名、PHI の使用目的、BAA 締結日、更新日
- - BAA の原本保管（6年）
- **BA のデューデリジェンス**:
- - SOC 2 Type II レポートの確認
- - HIPAA セキュリティアセスメントの実施
- - インシデント対応手順の確認
- **AWS Marketplace ベンダー**:
- - AWS BAA とは別に、各ベンダーと BA 契約が必要
- - ベンダーのサブプロセッサ (Sub-BA) も管理対象
- **年次レビュー**: BA のセキュリティ態勢を毎年確認


---

# HIPAA 監査への対応準備

- **HHS Office for Civil Rights (OCR) 監査への備え**
- **監査で求められる文書**:
- - HIPAA ポリシー・手続き文書（最新版）
- - リスクアセスメント報告書（直近1年）
- - BAA の一覧と原本
- - セキュリティトレーニングの受講記録
- - インシデント対応の記録（漏洩の有無にかかわらず）
- - 監査ログ (CloudTrail ログ、6年分)
- **AWS Audit Manager の活用**:
- - 上記の証拠を自動収集・整理
- - 監査人向けレポートを PDF でエクスポート
- **注意**: 文書は6年間（一部は永久保存）が HIPAA の要件


---

# HITRUST CSF との関係

- **HITRUST CSF: 医療業界向けの包括的セキュリティフレームワーク**
- **HIPAA との関係**:
- - HITRUST は HIPAA を含む複数フレームワークをカバー
- - HITRUST 認証 = HIPAA コンプライアンスの強力な証明
- **認証レベル**:
- - e1 (Essential): 基本的なサイバーセキュリティ
- - i1 (Implemented): HIPAA・NIST 対応
- - r2 (Risk-based): 完全リスクベース評価
- **AWS と HITRUST**:
- - AWS は HITRUST r2 認証を取得済み
- - AWS の認証を継承して自社評価を効率化 (Inheritance)
- **ユースケース**: 大手医療機関・保険会社との取引に必要な場合あり


---

# Well-Architected: Healthcare Lens

- **AWS Well-Architected Healthcare Industry Lens**
- 医療業界特有のベストプラクティスを定義
- **追加の設計原則**:
- - PHI のデータ主権: 地理的制限の遵守
- - 相互運用性: FHIR/HL7 標準の採用
- - 患者安全: システム可用性が患者安全に直結
- - 規制への対応: HIPAA/HITRUST/州法
- **AWS Well-Architected Tool**:
- - Healthcare Lens を選択して評価実施
- - HIPAA 関連のリスクを自動特定
- - 改善ロードマップを生成
- **定期実施**: 重大なアーキテクチャ変更前に実施


---

# コスト最適化 (HIPAA 環境)

- **セキュリティを維持しながらコストを削減**
- **ストレージコスト最適化**:
- - S3 Intelligent-Tiering: 頻度に応じてストレージクラスを自動移動
- - S3 Glacier: アーカイブ PHI (6年保存義務対応)
- - CloudTrail Lake: 長期監査ログ保存のコスト最適化
- **コンピューティング**:
- - Savings Plans / Reserved Instances: 医療システムは定常負荷が多い
- - Fargate Spot: バッチ処理（PHI の夜間処理）
- **データ転送**:
- - VPC エンドポイント: S3/DynamoDB 通信の NAT Gateway 料金削減
- **監視コスト**:
- - CloudWatch Logs: 不要なログソースを削除、保持期間を最適化


---

<!-- _class: lead -->
# まとめ

- **HIPAA on AWS の核心**
- 
- **規制理解**: PHI定義・BAA締結・3つのセーフガードを把握
- **サービス選択**: BAA適格サービスのみで PHI を処理
- **暗号化**: 保存時(KMS) + 転送時(TLS) のデフォルト暗号化
- **監査ログ**: CloudTrail データイベント + Audit Manager で証拠収集
- **継続監視**: Config + Security Hub + GuardDuty + Macie
- **インシデント対応**: Breach 60日通知、Runbook 事前準備
- 
- **セキュリティは技術だけでなく、組織・プロセスの取り組み**

<!--
HIPAA コンプライアンスは一回限りの設定ではなく、継続的なプロセス。AWS のツールを最大限活用して、自動化・可視化・継続監視を実現する。
-->

---

# 実装ロードマップ

- **フェーズ1 (1〜2ヶ月): 基盤整備**
- - AWS Artifact で BAA 締結
- - KMS CMK 作成・全ストレージの暗号化
- - CloudTrail (データイベント含む) / GuardDuty / Security Hub 有効化
- **フェーズ2 (2〜3ヶ月): 設計実装**
- - VPC 再設計 (PHI リソースのプライベート化)
- - IAM 最小権限ロールの実装
- - HIPAA Conformance Pack の展開
- **フェーズ3 (3〜6ヶ月): 運用成熟**
- - Audit Manager での継続監査
- - インシデント対応 Runbook の整備・訓練
- - 外部ペネトレーションテスト実施


---

# 参考リソース

- **公式ドキュメント**:
- - [AWS HIPAA Compliance](https://aws.amazon.com/compliance/hipaa-compliance/)
- - [AWS HIPAA Eligible Services](https://aws.amazon.com/compliance/hipaa-eligible-services-reference/)
- - [HHS HIPAA Security Rule Guidance](https://www.hhs.gov/hipaa/for-professionals/security/)
- **AWS ホワイトペーパー**:
- - Architecting for HIPAA Security and Compliance on AWS
- - AWS Well-Architected Healthcare Industry Lens
- **ハンズオン**:
- - AWS Security Hub HIPAA Conformance Pack のデプロイ
- - Amazon HealthLake の FHIR API 実装
- - AWS Audit Manager の HIPAA 評価セットアップ

