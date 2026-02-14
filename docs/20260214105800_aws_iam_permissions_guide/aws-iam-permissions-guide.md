---
marp: true
theme: gaia
size: 16:9
paginate: true
style: |
  section {
    font-size: 28px;
  }
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
  /* Mermaid図解をスライドに収める */
  section .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 70vh;
    max-width: 100%;
  }
  
  section .mermaid svg {
    max-width: 100%;
    max-height: 70vh;
    height: auto;
    width: auto;
  }
  
---

# AWS IAMの権限管理
完全ガイド

- ポリシー、ロール、トラストポリシー、リソースポリシー
- AssumeRoleから権限の境界まで徹底解説


---

# アジェンダ (1/2)

- **IAM基礎** - 認証・認可の概念整理
- **IAMポリシー詳細** - 構造、評価ロジック、ABAC
- **IAMロール詳細** - トラストポリシー、AssumeRole
- **リソースポリシー** - アイデンティティベースとの違い
- **権限の境界** - Permission Boundariesの活用


---

# アジェンダ (2/2)

- **SCP** - Organizationsとの統合、評価順序
- **高度なトピック** - SAML/WebIdentity、外部ID
- **ベストプラクティス** - 設計パターン、監査
- **トラブルシューティング** - 権限エラーの診断


---

# IAMの全体像

- **Identity and Access Management (IAM)** - AWSリソースへのアクセスを安全に制御
- **プリンシパル** - ユーザー、ロール、サービス
- **リソース** - S3、EC2、Lambda等のAWSサービス
- **ポリシー** - JSON形式の権限定義ドキュメント
- **評価エンジン** - リクエスト時に権限を判定


---

# IAMの全体像（図解）

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="900" height="400" fill="#f8f9fa"/>

  <!-- Title -->
  <text x="450" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">IAM権限評価の全体像</text>

  <!-- Principal -->
  <g id="principal">
    <rect x="50" y="150" width="140" height="100" rx="12" fill="#667EEA" stroke="#5A67D8" stroke-width="3"/>
    <text x="120" y="185" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">Principal</text>
    <text x="120" y="210" text-anchor="middle" font-family="Arial" font-size="13" fill="white">ユーザー/</text>
    <text x="120" y="230" text-anchor="middle" font-family="Arial" font-size="13" fill="white">ロール</text>
  </g>

  <!-- Evaluation Engine -->
  <g id="engine">
    <rect x="380" y="120" width="180" height="160" rx="12" fill="#FC8181" stroke="#E53E3E" stroke-width="3"/>
    <text x="470" y="155" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="white">評価エンジン</text>

    <!-- Inputs to engine -->
    <rect x="395" y="180" width="150" height="30" rx="5" fill="white" opacity="0.9"/>
    <text x="470" y="200" text-anchor="middle" font-family="Arial" font-size="11" fill="#333">IAMポリシー</text>

    <rect x="395" y="215" width="150" height="30" rx="5" fill="white" opacity="0.9"/>
    <text x="470" y="235" text-anchor="middle" font-family="Arial" font-size="11" fill="#333">リソースポリシー</text>

    <rect x="395" y="250" width="150" height="30" rx="5" fill="white" opacity="0.9"/>
    <text x="470" y="270" text-anchor="middle" font-family="Arial" font-size="11" fill="#333">SCP</text>
  </g>

  <!-- AWS Resource -->
  <g id="resource">
    <rect x="710" y="150" width="140" height="100" rx="12" fill="#48BB78" stroke="#38A169" stroke-width="3"/>
    <text x="780" y="185" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">AWS</text>
    <text x="780" y="210" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">リソース</text>
    <text x="780" y="235" text-anchor="middle" font-family="Arial" font-size="12" fill="white">(S3/EC2/Lambda)</text>
  </g>

  <!-- Policy Sources (Left side) -->
  <g id="policies">
    <rect x="230" y="50" width="120" height="50" rx="8" fill="#63B3ED" stroke="#3182CE" stroke-width="2"/>
    <text x="290" y="70" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">IAM</text>
    <text x="290" y="88" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">ポリシー</text>

    <rect x="230" y="175" width="120" height="50" rx="8" fill="#90CDF4" stroke="#4299E1" stroke-width="2"/>
    <text x="290" y="195" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">リソース</text>
    <text x="290" y="213" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">ポリシー</text>

    <rect x="230" y="300" width="120" height="50" rx="8" fill="#BEE3F8" stroke="#63B3ED" stroke-width="2"/>
    <text x="290" y="330" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">SCP</text>
  </g>

  <!-- Arrows -->
  
  <!-- Principal -> Engine -->
  <path d="M 190 200 L 380 200" stroke="#5A67D8" stroke-width="3" fill="none"/>
  <polygon points="380,200 372,196.5 372,203.5" fill="#5A67D8"/>
  <text x="270" y="190" font-family="Arial" font-size="12" font-weight="bold" fill="#5A67D8">リクエスト</text>

  <!-- Policies -> Engine -->
  <path d="M 350 75 L 410 140" stroke="#3182CE" stroke-width="2.5" fill="none"/>
  <polygon points="410,140 407.1,131.7 402,136.5" fill="#E53E3E"/>
  <path d="M 350 200 L 380 200" stroke="#4299E1" stroke-width="2.5" fill="none"/>
  <polygon points="380,200 372,196.5 372,203.5" fill="#E53E3E"/>
  <path d="M 350 325 L 410 260" stroke="#63B3ED" stroke-width="2.5" fill="none"/>
  <polygon points="410,260 402,263.5 407.1,268.3" fill="#E53E3E"/>

  <!-- Engine -> Resource -->
  <path d="M 560 200 L 710 200" stroke="#E53E3E" stroke-width="3" fill="none"/>
  <polygon points="710,200 702,196.5 702,203.5" fill="#38A169"/>
  <text x="620" y="190" font-family="Arial" font-size="12" font-weight="bold" fill="#E53E3E">許可/拒否</text>

  <!-- Legend -->
  <g id="legend">
    <rect x="20" y="20" width="180" height="60" rx="8" fill="white" stroke="#ddd" stroke-width="2"/>
    <circle cx="35" cy="40" r="5" fill="#667EEA"/>
    <text x="48" y="44" font-family="Arial" font-size="11" fill="#333">プリンシパル</text>
    <circle cx="35" cy="60" r="5" fill="#FC8181"/>
    <text x="48" y="64" font-family="Arial" font-size="11" fill="#333">ポリシー評価</text>
    <circle cx="110" cy="40" r="5" fill="#48BB78"/>
    <text x="123" y="44" font-family="Arial" font-size="11" fill="#333">リソース</text>
    <circle cx="110" cy="60" r="5" fill="#63B3ED"/>
    <text x="123" y="64" font-family="Arial" font-size="11" fill="#333">ポリシー入力</text>
  </g>
</svg>


---

# 認証 vs 認可

- **認証 (Authentication)** - 「あなたは誰か？」
-   - アクセスキー、パスワード、一時認証情報
-   - AssumeRoleで取得したセッショントークン
- **認可 (Authorization)** - 「何ができるか？」
-   - IAMポリシーによる権限評価
-   - リソース、アクション、条件の組み合わせ
- **IAMはこの両方を管理する基盤**


---

# プリンシパルとリソース

- **プリンシパル** - リクエストを行う主体
-   - IAMユーザー (長期認証情報)
-   - IAMロール (一時認証情報)
-   - AWSサービス (ec2.amazonaws.com等)
-   - フェデレーテッドユーザー (SAML/OIDC)
- **リソース** - アクセスされる対象
-   - S3バケット、EC2インスタンス、Lambda関数等
-   - ARNで一意に識別


---

# IAMポリシーの基本構造

- **Version** - 常に `2012-10-17` を使用
- **Statement** - 権限定義の配列 (複数可)
- **Sid** - ステートメントID (オプション、説明用)
- **Effect** - `Allow` または `Deny`
- **Action** - 許可/拒否するAPI操作
- **Resource** - 対象リソースのARN


---

# IAMポリシーの基本構造（コード例）

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Read",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}
```


---

# ポリシー評価ロジック - 明示的Deny優先

- **1. デフォルト: Deny** - 何も許可されていない状態からスタート
- **2. 明示的Allow** - いずれかのポリシーでAllowがあれば許可候補
- **3. 明示的Deny** - 1つでもDenyがあれば拒否確定
- **4. 最終判定** - Denyがなく、Allowがあれば許可
- **重要**: Denyは常にAllowを上書き


---

# ポリシー評価ロジック - 明示的Deny優先（図解）

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="700" height="450" fill="#f8f9fa"/>

  <!-- Title -->
  <text x="350" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">IAMポリシー評価ロジック</text>

  <!-- Request -->
  <g id="request">
    <rect x="280" y="60" width="140" height="60" rx="10" fill="#667EEA" stroke="#5A67D8" stroke-width="3"/>
    <text x="350" y="95" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">リクエスト</text>
  </g>

  <!-- Decision 1: Explicit Deny? -->
  <g id="decision1">
    <path d="M 350 180 L 420 230 L 350 280 L 280 230 Z" fill="#FED7D7" stroke="#FC8181" stroke-width="3"/>
    <text x="350" y="220" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#C53030">明示的</text>
    <text x="350" y="240" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#C53030">Deny?</text>
  </g>

  <!-- Deny Result -->
  <g id="deny1">
    <rect x="520" y="200" width="120" height="60" rx="10" fill="#FC8181" stroke="#C53030" stroke-width="3"/>
    <text x="580" y="235" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">拒否</text>
  </g>

  <!-- Decision 2: Explicit Allow? -->
  <g id="decision2">
    <path d="M 350 350 L 420 400 L 350 450 L 280 400 Z" fill="#C6F6D5" stroke="#48BB78" stroke-width="3"/>
    <text x="350" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#276749">明示的</text>
    <text x="350" y="410" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#276749">Allow?</text>
  </g>

  <!-- Allow Result -->
  <g id="allow">
    <rect x="520" y="370" width="120" height="60" rx="10" fill="#48BB78" stroke="#38A169" stroke-width="3"/>
    <text x="580" y="405" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">許可</text>
  </g>

  <!-- Default Deny -->
  <g id="deny2">
    <rect x="60" y="370" width="140" height="60" rx="10" fill="#FC8181" stroke="#C53030" stroke-width="3"/>
    <text x="130" y="395" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="white">拒否</text>
    <text x="130" y="415" text-anchor="middle" font-family="Arial" font-size="12" fill="white">(デフォルト)</text>
  </g>

  <!-- Arrows -->
  
  <!-- Request -> Decision1 -->
  <path d="M 350 120 L 350 180" stroke="#333" stroke-width="3" fill="none"/>
  <polygon points="350,180 353.5,172 346.5,172" fill="#333"/>

  <!-- Decision1 -> Deny (Yes) -->
  <path d="M 420 230 L 520 230" stroke="#FC8181" stroke-width="3" fill="none"/>
  <polygon points="520,230 512,226.5 512,233.5" fill="#333"/>
  <text x="455" y="220" font-family="Arial" font-size="13" font-weight="bold" fill="#C53030">Yes</text>

  <!-- Decision1 -> Decision2 (No) -->
  <path d="M 350 280 L 350 350" stroke="#333" stroke-width="3" fill="none"/>
  <polygon points="350,350 353.5,342 346.5,342" fill="#333"/>
  <text x="360" y="320" font-family="Arial" font-size="13" font-weight="bold" fill="#333">No</text>

  <!-- Decision2 -> Allow (Yes) -->
  <path d="M 420 400 L 520 400" stroke="#48BB78" stroke-width="3" fill="none"/>
  <polygon points="520,400 512,396.5 512,403.5" fill="#333"/>
  <text x="455" y="390" font-family="Arial" font-size="13" font-weight="bold" fill="#38A169">Yes</text>

  <!-- Decision2 -> Default Deny (No) -->
  <path d="M 280 400 L 200 400" stroke="#FC8181" stroke-width="3" fill="none"/>
  <polygon points="200,400 208,403.5 208,396.5" fill="#333"/>
  <text x="225" y="390" font-family="Arial" font-size="13" font-weight="bold" fill="#C53030">No</text>

  <!-- Key Point -->
  <rect x="20" y="20" width="220" height="50" rx="8" fill="#FEF5E7" stroke="#F39C12" stroke-width="2"/>
  <text x="130" y="42" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#D68910">重要原則:</text>
  <text x="130" y="60" text-anchor="middle" font-family="Arial" font-size="12" fill="#D68910">Denyは常にAllowを上書き</text>
</svg>


---

# 管理ポリシー vs インラインポリシー

- **管理ポリシー (Managed Policy)**
-   - 独立したエンティティ、複数のプリンシパルにアタッチ可
-   - AWS管理ポリシー (AWSが提供) とカスタマー管理ポリシー
-   - バージョン管理、ロールバック可能
- **インラインポリシー (Inline Policy)**
-   - プリンシパルに直接埋め込み、1対1の関係
-   - プリンシパル削除時に一緒に削除される
- **使い分け**: 再利用するなら管理、1回限りならインライン


---

# ポリシー変数 - 動的な権限制御

- **${aws:username}** - IAMユーザー名
- **${aws:userid}** - 一意のユーザーID
- **${aws:PrincipalTag/キー}** - プリンシパルのタグ値
- **${aws:RequestedRegion}** - リクエストされたリージョン
- **ユースケース**: ユーザーごとのフォルダ分離、タグベースアクセス


---

# ポリシー変数 - 動的な権限制御（コード例）

```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "arn:aws:s3:::my-bucket/${aws:username}/*",
  "Condition": {
    "StringEquals": {
      "s3:ExistingObjectTag/owner": "${aws:username}"
    }
  }
}
```


---

# Conditionキー - 詳細な条件制御

- **グローバル条件キー**: SourceIp, CurrentTime, SecureTransport等
- **サービス固有キー**: s3:prefix, ec2:InstanceType等
- **演算子**: StringEquals, NumericLessThan, DateGreaterThan, IpAddress等


---

# Conditionキー - 詳細な条件制御（コード例）

```json
{
  "Condition": {
    "IpAddress": {
      "aws:SourceIp": "203.0.113.0/24"
    },
    "DateGreaterThan": {
      "aws:CurrentTime": "2026-01-01T00:00:00Z"
    },
    "StringLike": {
      "s3:prefix": ["home/${aws:username}/*"]
    },
    "Bool": {
      "aws:SecureTransport": "true"
    }
  }
}
```


---

# タグベースアクセス制御 (ABAC)

- **Attribute-Based Access Control** - 属性に基づく動的な権限管理
- **プリンシパルタグ** - ユーザー/ロールにタグを付与
- **リソースタグ** - S3、EC2等のリソースにタグを付与
- **ポリシーで比較** - `aws:PrincipalTag` と `リソースタグ` を照合
- **スケーラビリティ**: 新しいリソースを追加してもポリシー変更不要
- **例**: `Project=Alpha` タグを持つユーザーは、同じタグのリソースのみアクセス可


---

# ABAC実装例

- プリンシパルの `Project` と `CostCenter` タグが一致するEC2のみ操作可
- 新規プロジェクト追加時もポリシー変更不要
- タグ管理が鍵: 命名規則、必須タグの強制


---

# ABAC実装例（コード例）

```json
{
  "Effect": "Allow",
  "Action": ["ec2:StartInstances", "ec2:StopInstances"],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "ec2:ResourceTag/Project": "${aws:PrincipalTag/Project}",
      "ec2:ResourceTag/CostCenter": "${aws:PrincipalTag/CostCenter}"
    }
  }
}
```


---

# IAMロールの概念

- **一時的な権限** - 長期認証情報を持たない
- **AssumeRole** - ロールを引き受けて一時認証情報を取得
- **セッショントークン** - AccessKeyId, SecretAccessKey, SessionToken
- **有効期限** - デフォルト1時間、最大12時間
- **ユースケース**:
-   - EC2インスタンスからのAWSサービスアクセス
-   - クロスアカウントアクセス
-   - フェデレーション (SAML/OIDC)


---

# トラストポリシーの構造

- **Principal** - 誰がAssumeRoleできるか
- **Action** - 通常は `sts:AssumeRole`
- **Condition** - 追加の制約 (ExternalId等)
- **重要**: トラストポリシーはロール側で定義


---

# トラストポリシーの構造（コード例）

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "unique-external-id"
        }
      }
    }
  ]
}
```


---

# AssumeRoleの仕組み

- **STS (Security Token Service)** - 一時認証情報を発行
- **トラストポリシー** - AssumeRoleの可否を判定
- **権限ポリシー** - ロールの権限を定義
- 両方が `Allow` で初めて操作可能


---

# AssumeRoleの仕組み（図解）

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="900" height="600" fill="#f8f9fa"/>

  <!-- Title -->
  <text x="450" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">AssumeRole フロー詳細</text>

  <!-- Participants -->
  <g id="participants">
    <rect x="50" y="60" width="140" height="60" rx="8" fill="#667EEA" stroke="#5A67D8" stroke-width="2"/>
    <text x="120" y="85" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">IAMユーザー/</text>
    <text x="120" y="103" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">ロール</text>

    <rect x="260" y="60" width="140" height="60" rx="8" fill="#F6AD55" stroke="#DD6B20" stroke-width="2"/>
    <text x="330" y="95" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="white">AWS STS</text>

    <rect x="470" y="60" width="140" height="60" rx="8" fill="#9F7AEA" stroke="#6B46C1" stroke-width="2"/>
    <text x="540" y="85" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">ターゲット</text>
    <text x="540" y="103" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">ロール</text>

    <rect x="680" y="60" width="140" height="60" rx="8" fill="#48BB78" stroke="#38A169" stroke-width="2"/>
    <text x="750" y="85" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">AWS</text>
    <text x="750" y="103" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">サービス</text>
  </g>

  <!-- Lifelines -->
  <line x1="120" y1="120" x2="120" y2="560" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="330" y1="120" x2="330" y2="560" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="540" y1="120" x2="540" y2="560" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="750" y1="120" x2="750" y2="560" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>

  <!-- Arrows -->
  
  <!-- Step 1: AssumeRole request -->
  <line x1="120" y1="160" x2="330" y2="160" stroke="#333" stroke-width="2.5"/>
  <polygon points="330,160 322,156.5 322,163.5" fill="#333"/>
  <text x="200" y="150" font-family="Arial" font-size="12" fill="#333">① AssumeRole</text>
  <text x="200" y="168" font-family="Arial" font-size="11" fill="#666">(RoleArn)</text>

  <!-- Step 2: Trust policy check -->
  <line x1="330" y1="220" x2="540" y2="220" stroke="#333" stroke-width="2.5"/>
  <polygon points="540,220 532,216.5 532,223.5" fill="#333"/>
  <text x="410" y="210" font-family="Arial" font-size="12" fill="#333">② トラストポリシー</text>
  <text x="410" y="228" font-family="Arial" font-size="11" fill="#666">確認</text>

  <!-- Evaluation box -->
  <rect x="545" y="240" width="140" height="70" rx="8" fill="#FEF5E7" stroke="#F39C12" stroke-width="2"/>
  <text x="615" y="265" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#D68910">評価:</text>
  <text x="615" y="283" text-anchor="middle" font-family="Arial" font-size="10" fill="#D68910">Principal一致?</text>
  <text x="615" y="298" text-anchor="middle" font-family="Arial" font-size="10" fill="#D68910">Condition満たす?</text>

  <!-- Step 3: Approval -->
  <line x1="540" y1="340" x2="330" y2="340" stroke="#48BB78" stroke-width="2.5" stroke-dasharray="5,5"/>
  <polygon points="330,340 338,343.5 338,336.5" fill="#48BB78"/>
  <text x="410" y="330" font-family="Arial" font-size="12" fill="#38A169" font-weight="bold">③ 許可</text>

  <!-- Step 4: Temporary credentials -->
  <line x1="330" y1="400" x2="120" y2="400" stroke="#48BB78" stroke-width="2.5" stroke-dasharray="5,5"/>
  <polygon points="120,400 128,403.5 128,396.5" fill="#48BB78"/>
  <rect x="135" y="415" width="180" height="70" rx="5" fill="#E6FFFA" stroke="#319795" stroke-width="1"/>
  <text x="225" y="435" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#234E52">④ 一時認証情報:</text>
  <text x="225" y="453" text-anchor="middle" font-family="Arial" font-size="10" fill="#234E52">• AccessKeyId (ASIA...)</text>
  <text x="225" y="468" text-anchor="middle" font-family="Arial" font-size="10" fill="#234E52">• SecretAccessKey</text>
  <text x="225" y="483" text-anchor="middle" font-family="Arial" font-size="10" fill="#234E52">• SessionToken</text>

  <!-- Step 5: API call with temp credentials -->
  <line x1="120" y1="520" x2="750" y2="520" stroke="#333" stroke-width="2.5"/>
  <polygon points="750,520 742,516.5 742,523.5" fill="#333"/>
  <text x="410" y="510" font-family="Arial" font-size="12" fill="#333">⑤ API呼び出し (一時認証情報)</text>

  <!-- Step 6: Response -->
  <line x1="750" y1="550" x2="120" y2="550" stroke="#48BB78" stroke-width="2.5" stroke-dasharray="5,5"/>
  <polygon points="120,550 128,553.5 128,546.5" fill="#48BB78"/>
  <text x="410" y="565" font-family="Arial" font-size="12" fill="#38A169" font-weight="bold">⑥ レスポンス</text>

  <!-- Legend -->
  <rect x="20" y="20" width="180" height="30" rx="5" fill="white" stroke="#ddd" stroke-width="1"/>
  <line x1="30" y1="35" x2="60" y2="35" stroke="#333" stroke-width="2"/>
  <text x="65" y="39" font-family="Arial" font-size="10" fill="#333">リクエスト</text>
  <line x1="115" y1="35" x2="145" y2="35" stroke="#48BB78" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="150" y="39" font-family="Arial" font-size="10" fill="#333">レスポンス</text>
</svg>


---

# 一時認証情報の詳細

- **構成要素**:
-   - `AccessKeyId` - ASIA... で始まる (一時的の証)
-   - `SecretAccessKey`
-   - `SessionToken` - 必須、これがないと認証失敗
- **有効期限**:
-   - `Expiration` - ISO8601形式のタイムスタンプ
-   - 期限切れ前に再度AssumeRoleが必要
- **セキュリティ**: 短命なので漏洩リスクが低い


---

# クロスアカウントアクセス

- **両側で許可が必要**: トラストポリシー + AssumeRole権限
- **外部ID**: 混乱した代理問題の対策 (後述)
- **監査**: CloudTrailで両アカウントの操作を追跡


---

# クロスアカウントアクセス（コード例）

```json
// アカウントBのロールのトラストポリシー
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::111111111111:root"
  },
  "Action": "sts:AssumeRole"
}

// アカウントAのユーザーポリシー
{
  "Effect": "Allow",
  "Action": "sts:AssumeRole",
  "Resource": "arn:aws:iam::222222222222:role/CrossAccountRole"
}
```


---

# サービスロール

- **AWSサービスがAssumeRoleする**
-   - EC2インスタンスプロファイル
-   - Lambda実行ロール
-   - ECSタスクロール
- **トラストポリシーのPrincipal**:
-   - `"Service": "ec2.amazonaws.com"`
-   - `"Service": "lambda.amazonaws.com"`
- **ベストプラクティス**: サービスごとに専用ロールを作成
- **最小権限**: 必要なアクションのみ許可


---

# サービスリンクロール

- **AWSサービスが自動作成・管理するロール**
-   - 例: `AWSServiceRoleForAutoScaling`
- **特徴**:
-   - 名前が `AWSServiceRoleFor...` で始まる
-   - ポリシーは AWS が管理 (変更不可)
-   - サービスが必要に応じて自動作成
- **削除**: サービスのリソースがすべて削除された後のみ可能
- **用途**: サービスが他のAWSサービスを呼び出すための権限


---

# リソースベースポリシーとは

- **リソース側で定義する権限**
-   - S3バケットポリシー
-   - Lambda関数ポリシー
-   - SNSトピックポリシー
-   - SQSキューポリシー
- **アイデンティティベースとの違い**:
-   - アイデンティティ: 「誰が何をできるか」 (プリンシパル側)
-   - リソース: 「誰にアクセスを許可するか」 (リソース側)
- **両方が必要な場合と不要な場合がある**


---

# リソースポリシーの構造

- **Principal要素** - 誰に許可するか (アイデンティティベースにはない)
- **Resource** - このポリシーが適用されるリソース
- **クロスアカウント**: Principalに他アカウントのARNを指定可


---

# リソースポリシーの構造（コード例）

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCrossAccountAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```


---

# アイデンティティベース vs リソースベース

- **同一アカウント内**:
-   - アイデンティティベースのみでOK
-   - 例: IAMロール → S3バケット
- **クロスアカウント**:
-   - 両方が必要 (双方向の許可)
-   - 例外: リソースベースで完結する場合もある (S3→Lambda呼び出し等)
- **匿名アクセス**:
-   - リソースベースのみで制御 (Principal: "*")


---

# S3バケットポリシーの例

- CloudFrontからのアクセスのみ許可
- 特定のディストリビューションに限定 (SourceArn)
- **よくあるミス**: Principalを "*" にしてConditionなし → 全公開


---

# S3バケットポリシーの例（コード例）

```json
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "cloudfront.amazonaws.com"},
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E1234"
        }
      }
    }
  ]
}
```


---

# Lambda関数ポリシーの例

- S3バケットがLambda関数を呼び出す権限
- 特定のバケットからのみ許可
- **重要**: Lambda実行ロールとは別の権限


---

# Lambda関数ポリシーの例（コード例）

```json
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"Service": "s3.amazonaws.com"},
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:s3:::my-bucket"
        }
      }
    }
  ]
}
```


---

# ポリシー評価フロー - 全体像

- **同一アカウント**: アイデンティティベースのみで判定可
- **クロスアカウント**: 両方にAllowが必要
- **明示的Deny**: 常に優先


---

# ポリシー評価フロー - 全体像（図解）

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="850" height="650" fill="#f8f9fa"/>

  <!-- Title -->
  <text x="425" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">クロスアカウント考慮の評価フロー</text>

  <!-- Request -->
  <g id="request">
    <rect x="340" y="60" width="170" height="60" rx="10" fill="#667EEA" stroke="#5A67D8" stroke-width="3"/>
    <text x="425" y="95" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">リクエスト</text>
  </g>

  <!-- Decision 1: Same Account? -->
  <g id="decision1">
    <path d="M 425 180 L 515 230 L 425 280 L 335 230 Z" fill="#E6FFFA" stroke="#319795" stroke-width="3"/>
    <text x="425" y="220" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#234E52">同一</text>
    <text x="425" y="240" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#234E52">アカウント?</text>
  </g>

  <!-- Same Account Path -->
  <g id="sameAccount">
    <rect x="580" y="190" width="180" height="80" rx="10" fill="#BEE3F8" stroke="#3182CE" stroke-width="2"/>
    <text x="670" y="215" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#2C5282">アイデンティティ</text>
    <text x="670" y="233" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#2C5282">ベース</text>
    <text x="670" y="253" text-anchor="middle" font-family="Arial" font-size="12" fill="#2C5282">ポリシー評価</text>
  </g>

  <!-- Cross Account Path -->
  <g id="crossAccount">
    <rect x="90" y="190" width="180" height="80" rx="10" fill="#FED7E2" stroke="#D53F8C" stroke-width="2"/>
    <text x="180" y="210" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#702459">アイデンティティベース</text>
    <text x="180" y="228" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#702459">+</text>
    <text x="180" y="246" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#702459">リソースベース</text>
    <text x="180" y="264" text-anchor="middle" font-family="Arial" font-size="11" fill="#702459">評価</text>
  </g>

  <!-- Decision 2: Explicit Deny? -->
  <g id="decision2">
    <path d="M 425 380 L 515 430 L 425 480 L 335 430 Z" fill="#FED7D7" stroke="#FC8181" stroke-width="3"/>
    <text x="425" y="420" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#C53030">明示的</text>
    <text x="425" y="440" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#C53030">Deny?</text>
  </g>

  <!-- Deny Result 1 -->
  <g id="deny1">
    <rect x="610" y="400" width="120" height="60" rx="10" fill="#FC8181" stroke="#C53030" stroke-width="3"/>
    <text x="670" y="435" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">拒否</text>
  </g>

  <!-- Decision 3: Explicit Allow? -->
  <g id="decision3">
    <path d="M 425 550 L 515 600 L 425 650 L 335 600 Z" fill="#C6F6D5" stroke="#48BB78" stroke-width="3"/>
    <text x="425" y="590" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#276749">明示的</text>
    <text x="425" y="610" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#276749">Allow?</text>
  </g>

  <!-- Allow Result -->
  <g id="allow">
    <rect x="610" y="570" width="120" height="60" rx="10" fill="#48BB78" stroke="#38A169" stroke-width="3"/>
    <text x="670" y="605" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">許可</text>
  </g>

  <!-- Default Deny -->
  <g id="deny2">
    <rect x="120" y="570" width="140" height="60" rx="10" fill="#FC8181" stroke="#C53030" stroke-width="3"/>
    <text x="190" y="595" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="white">拒否</text>
    <text x="190" y="615" text-anchor="middle" font-family="Arial" font-size="12" fill="white">(デフォルト)</text>
  </g>

  <!-- Arrows -->
  
  <!-- Request -> Decision1 -->
  <path d="M 425 120 L 425 180" stroke="#333" stroke-width="3" fill="none"/>
  <polygon points="425,180 428.5,172 421.5,172" fill="#333"/>

  <!-- Decision1 -> Same Account (Yes) -->
  <path d="M 515 230 L 580 230" stroke="#3182CE" stroke-width="3" fill="none"/>
  <polygon points="580,230 572,226.5 572,233.5" fill="#333"/>
  <text x="535" y="220" font-family="Arial" font-size="13" font-weight="bold" fill="#2C5282">Yes</text>

  <!-- Decision1 -> Cross Account (No) -->
  <path d="M 335 230 L 270 230" stroke="#D53F8C" stroke-width="3" fill="none"/>
  <polygon points="270,230 278,233.5 278,226.5" fill="#333"/>
  <text x="295" y="220" font-family="Arial" font-size="13" font-weight="bold" fill="#702459">No</text>

  <!-- Both paths -> Decision2 -->
  <path d="M 670 270 L 670 350 L 470 350 L 470 380" stroke="#333" stroke-width="2.5" fill="none"/>
  <polygon points="470,380 473.5,372 466.5,372" fill="#333"/>
  <path d="M 180 270 L 180 350 L 380 350 L 380 380" stroke="#333" stroke-width="2.5" fill="none"/>
  <polygon points="380,380 383.5,372 376.5,372" fill="#333"/>

  <!-- Decision2 -> Deny (Yes) -->
  <path d="M 515 430 L 610 430" stroke="#FC8181" stroke-width="3" fill="none"/>
  <polygon points="610,430 602,426.5 602,433.5" fill="#333"/>
  <text x="545" y="420" font-family="Arial" font-size="13" font-weight="bold" fill="#C53030">Yes</text>

  <!-- Decision2 -> Decision3 (No) -->
  <path d="M 425 480 L 425 550" stroke="#333" stroke-width="3" fill="none"/>
  <polygon points="425,550 428.5,542 421.5,542" fill="#333"/>
  <text x="435" y="520" font-family="Arial" font-size="13" font-weight="bold" fill="#333">No</text>

  <!-- Decision3 -> Allow (Yes) -->
  <path d="M 515 600 L 610 600" stroke="#48BB78" stroke-width="3" fill="none"/>
  <polygon points="610,600 602,596.5 602,603.5" fill="#333"/>
  <text x="545" y="590" font-family="Arial" font-size="13" font-weight="bold" fill="#38A169">Yes</text>

  <!-- Decision3 -> Default Deny (No) -->
  <path d="M 335 600 L 260 600" stroke="#FC8181" stroke-width="3" fill="none"/>
  <polygon points="260,600 268,603.5 268,596.5" fill="#333"/>
  <text x="285" y="590" font-family="Arial" font-size="13" font-weight="bold" fill="#C53030">No</text>
</svg>


---

# Permission Boundaries - 概念

- **権限の上限を設定** - これ以上の権限は付与できない
- **ユースケース**:
-   - 開発者に委任: 自分でIAMロールを作成可、ただし管理者権限は付与不可
-   - コンプライアンス: 組織のポリシーで上限を強制
- **効果**:
-   - 実際の権限 = (アイデンティティベースポリシー) AND (Permission Boundary)
-   - Boundaryで許可されていない操作は実行不可
- **対象**: IAMユーザーとロール (グループには適用不可)


---

# Permission Boundariesの効果範囲

- **積集合**: 両方にAllowがある操作のみ実行可
- **例**: ポリシーで `s3:*` を許可、Boundaryで `s3:GetObject` のみ許可
-   → 実際は `s3:GetObject` のみ可能
- **Deny**: ポリシーまたはBoundaryのどちらかにDenyがあれば拒否


---

# Permission Boundariesの効果範囲（図解）

<svg viewBox="0 0 650 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0">
  
  <!-- Left Circle: Identity-based Policy (blue) -->
  <circle cx="240" cy="170" r="110" fill="#6B9BD1" fill-opacity="0.6" stroke="#2E5C8A" stroke-width="2.5"/>

  <!-- Right Circle: Permission Boundary (orange) -->
  <circle cx="410" cy="170" r="110" fill="#F4A460" fill-opacity="0.6" stroke="#C4722E" stroke-width="2.5"/>

  <!-- Intersection (green) - clip right circle with left circle boundary -->
  <circle cx="410" cy="170" r="110" fill="#90EE90" fill-opacity="0.85"/>

  <!-- Left side label -->
  <text x="180" y="110" font-size="15" font-weight="bold" fill="#1E3A5F" text-anchor="middle">アイデンティティ</text>
  <text x="180" y="130" font-size="15" font-weight="bold" fill="#1E3A5F" text-anchor="middle">ベースポリシー</text>
  <text x="180" y="200" font-size="13" fill="#333" text-anchor="middle">例: s3:*</text>
  <text x="180" y="220" font-size="12" fill="#666" text-anchor="middle">（全S3操作）</text>

  <!-- Right side label -->
  <text x="470" y="110" font-size="15" font-weight="bold" fill="#A0522D" text-anchor="middle">Permission</text>
  <text x="470" y="130" font-size="15" font-weight="bold" fill="#A0522D" text-anchor="middle">Boundary</text>
  <text x="470" y="200" font-size="13" fill="#333" text-anchor="middle">例: s3:GetObject</text>
  <text x="470" y="220" font-size="12" fill="#666" text-anchor="middle">（読み取りのみ）</text>

  <!-- Center intersection label -->
  <text x="325" y="160" font-size="16" font-weight="bold" fill="#1A4D2E" text-anchor="middle">実際の権限</text>
  <text x="325" y="180" font-size="15" fill="#1A4D2E" text-anchor="middle">A ∩ B</text>
  <text x="325" y="200" font-size="12" fill="#2D5016" text-anchor="middle">s3:GetObject</text>

  <!-- Bottom legend -->
  <rect x="150" y="290" width="350" height="40" fill="#F9F9F9" stroke="#CCC" stroke-width="1" rx="5"/>
  <text x="325" y="308" font-size="13" fill="#333" text-anchor="middle" font-weight="bold">積集合（AND条件）</text>
  <text x="325" y="325" font-size="12" fill="#666" text-anchor="middle">両方で許可された操作のみ実行可能</text>
</svg>


---

# Permission Boundaries実装例

- 開発者は自由にロールを作成可
- ただし必ずBoundaryを適用 → S3/DynamoDB/Lambda以外は使えない
- 管理者権限の付与を防止


---

# Permission Boundaries実装例（コード例）

```json
// Permission Boundary ポリシー
{
  "Effect": "Allow",
  "Action": [
    "s3:*",
    "dynamodb:*",
    "lambda:*"
  ],
  "Resource": "*"
}

// 開発者に付与する権限 (IAMロール作成を委任)
{
  "Effect": "Allow",
  "Action": "iam:CreateRole",
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "iam:PermissionsBoundary": "arn:aws:iam::123456789012:policy/DeveloperBoundary"
    }
  }
}
```


---

# 委任管理のユースケース

- **シナリオ**: 開発チームに権限管理を委任したい
- **課題**: 開発者が自分に管理者権限を付与できてしまう (権限昇格)
- **解決策**:
-   1. Permission Boundaryポリシーを作成 (許可する操作の上限)
-   2. 開発者に `iam:CreateRole` を付与 (Boundary適用を条件に)
-   3. 開発者が作成するロールには自動的にBoundaryが適用
- **効果**: 管理者はガバナンスを維持しつつ、開発者は自律的に作業可能


---

# Service Control Policies (SCP)

- **AWS Organizationsの機能** - 組織レベルでの権限制御
- **適用範囲**: OU (組織単位) またはアカウント全体
- **効果**: そのアカウント内のすべてのプリンシパルに影響
-   - ルートユーザーにも適用 (一部例外あり)
- **許可ではなく制限**: SCPは許可を追加しない、上限を設定するのみ
- **デフォルト**: `FullAWSAccess` SCP (すべて許可)
- **用途**: 組織全体のガバナンス、コンプライアンス強制


---

# SCPとIAMポリシーの関係

- **3つの積集合**: すべてにAllowがある操作のみ実行可
- **SCPの例**: リージョン制限、特定サービスの禁止
- **重要**: SCPを変更すると組織全体に影響


---

# SCPとIAMポリシーの関係（図解）

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="550" fill="#f8f9fa"/>

  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">3層の権限制御 — SCP/Boundary/IAMポリシー</text>

  <!-- Layer 1: SCP (Largest) -->
  <g id="scp">
    <ellipse cx="400" cy="300" rx="350" ry="200" fill="#E0E7FF" opacity="0.6" stroke="#667EEA" stroke-width="4"/>
    <text x="400" y="120" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#5A67D8">SCP (Service Control Policy)</text>
    <text x="400" y="145" text-anchor="middle" font-family="Arial" font-size="14" fill="#5A67D8">組織レベルの上限</text>
    <text x="400" y="165" text-anchor="middle" font-family="Arial" font-size="12" fill="#667EEA">すべてのアカウント・ユーザー・ロールに適用</text>
  </g>

  <!-- Layer 2: Permission Boundary (Medium) -->
  <g id="boundary">
    <ellipse cx="400" cy="310" rx="240" ry="130" fill="#FED7E2" opacity="0.7" stroke="#D53F8C" stroke-width="3"/>
    <text x="400" y="220" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#97266D">Permission Boundary</text>
    <text x="400" y="242" text-anchor="middle" font-family="Arial" font-size="13" fill="#97266D">ユーザー/ロールの上限</text>
  </g>

  <!-- Layer 3: Identity-based Policy (Smallest) -->
  <g id="identity">
    <ellipse cx="400" cy="320" rx="130" ry="75" fill="#C6F6D5" opacity="0.8" stroke="#38A169" stroke-width="3"/>
    <text x="400" y="305" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#276749">アイデンティティ</text>
    <text x="400" y="325" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#276749">ベースポリシー</text>
    <text x="400" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="#2F855A">実際の権限</text>
  </g>

  <!-- Center result -->
  <g id="result">
    <circle cx="400" cy="330" r="30" fill="#FC8181" opacity="0.9" stroke="#C53030" stroke-width="3"/>
    <text x="400" y="338" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="white">最終</text>
    <text x="400" y="355" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="white">権限</text>
  </g>

  <!-- Explanation boxes -->
  <g id="explanations">
    <!-- SCP example -->
    <rect x="20" y="230" width="160" height="80" rx="8" fill="white" stroke="#667EEA" stroke-width="2"/>
    <text x="100" y="250" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#5A67D8">SCP例:</text>
    <text x="100" y="268" text-anchor="middle" font-family="Arial" font-size="9" fill="#667EEA">• 特定リージョン禁止</text>
    <text x="100" y="283" text-anchor="middle" font-family="Arial" font-size="9" fill="#667EEA">• 高額サービス禁止</text>
    <text x="100" y="298" text-anchor="middle" font-family="Arial" font-size="9" fill="#667EEA">• ルートユーザーにも</text>

    <!-- Boundary example -->
    <rect x="620" y="250" width="160" height="70" rx="8" fill="white" stroke="#D53F8C" stroke-width="2"/>
    <text x="700" y="270" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#97266D">Boundary例:</text>
    <text x="700" y="288" text-anchor="middle" font-family="Arial" font-size="9" fill="#D53F8C">• 開発者用制限</text>
    <text x="700" y="303" text-anchor="middle" font-family="Arial" font-size="9" fill="#D53F8C">• S3/Lambda/DDB</text>
    <text x="700" y="318" text-anchor="middle" font-family="Arial" font-size="9" fill="#D53F8C">  のみ許可</text>

    <!-- IAM Policy example -->
    <rect x="320" y="420" width="160" height="70" rx="8" fill="white" stroke="#38A169" stroke-width="2"/>
    <text x="400" y="440" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#276749">IAMポリシー例:</text>
    <text x="400" y="458" text-anchor="middle" font-family="Arial" font-size="9" fill="#38A169">• s3:GetObject</text>
    <text x="400" y="473" text-anchor="middle" font-family="Arial" font-size="9" fill="#38A169">• s3:PutObject</text>
    <text x="400" y="488" text-anchor="middle" font-family="Arial" font-size="9" fill="#38A169">• lambda:InvokeFunction</text>
  </g>

  <!-- Formula -->
  <rect x="150" y="510" width="500" height="30" rx="8" fill="#E6FFFA" stroke="#319795" stroke-width="2"/>
  <text x="400" y="530" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#234E52">実効権限 = SCP ∩ Permission Boundary ∩ IAMポリシー</text>

  <!-- Key insight -->
  <rect x="570" y="20" width="210" height="50" rx="8" fill="#FEF5E7" stroke="#F39C12" stroke-width="2"/>
  <text x="675" y="42" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#D68910">重要: 3つすべてにAllowが必要</text>
  <text x="675" y="60" text-anchor="middle" font-family="Arial" font-size="10" fill="#D68910">1つでもDenyがあれば拒否</text>
</svg>


---

# ポリシー評価の全体像

- **評価順序** (すべてANDで結合):
-   1. **SCP** - 組織の上限
-   2. **Permission Boundary** - ユーザー/ロールの上限
-   3. **アイデンティティベースポリシー** - 実際の権限
-   4. **リソースベースポリシー** - クロスアカウント時
-   5. **セッションポリシー** - AssumeRole時の追加制限
- **明示的Deny**: どの段階でもDenyがあれば即座に拒否
- **デフォルトDeny**: すべてにAllowがなければ拒否


---

# AssumeRoleWithSAML

- **SAML 2.0フェデレーション** - 企業のIdP (Okta, Azure AD等) と連携
- **フロー**:
-   1. ユーザーが IdP でログイン
-   2. IdP が SAML アサーションを発行
-   3. `sts:AssumeRoleWithSAML` で一時認証情報を取得
-   4. AWS リソースにアクセス
- **ロールのトラストポリシー**: `"Principal": {"Federated": "arn:aws:iam::123456789012:saml-provider/MyIdP"}`
- **メリット**: AWS認証情報の管理不要、既存のIdPを活用


---

# AssumeRoleWithWebIdentity

- **OIDCフェデレーション** - Google, Facebook, Amazon Cognito等
- **モバイルアプリのユースケース**:
-   - アプリユーザーがGoogleでログイン
-   - IDトークンを取得
-   - `sts:AssumeRoleWithWebIdentity` で一時認証情報
-   - S3にファイルアップロード等
- **Amazon Cognito推奨**: 複数IdPの統合、ユーザープール管理
- **トラストポリシー**: `"Principal": {"Federated": "cognito-identity.amazonaws.com"}`


---

# 外部IDによる混乱した代理問題対策

- **混乱した代理問題 (Confused Deputy)**:
-   - サードパーティがあなたのロールを不正にAssumeRoleする
-   - 例: SaaSベンダーのアカウントIDをトラストポリシーに追加
-   - 別の顧客があなたのロールARNを推測して使用
- **対策: 外部ID (ExternalId)**
-   - 顧客ごとに一意のランダム文字列
-   - トラストポリシーの条件に追加
-   - AssumeRole時に外部IDも提供が必要
- **重要**: 外部IDは秘密ではない、一意性が重要


---

# 外部ID実装例

- 他の顧客の外部IDでは AssumeRole 失敗
- 推測攻撃を防止


---

# 外部ID実装例（コード例）

```python
// あなたのAWSアカウントのロールのトラストポリシー
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::123456789012:root"
  },
  "Action": "sts:AssumeRole",
  "Condition": {
    "StringEquals": {
      "sts:ExternalId": "unique-customer-id-abc123"
    }
  }
}

// サードパーティのAssumeRole呼び出し
sts.assume_role(
  RoleArn='arn:aws:iam::999999999999:role/YourRole',
  ExternalId='unique-customer-id-abc123'
)
```


---

# セッションポリシー

- **AssumeRole時に追加の制限を適用**
-   - `--policy` パラメータでインラインポリシーを渡す
- **効果**: ロールの権限をさらに制限 (拡張は不可)
- **ユースケース**:
-   - 一時的にスコープを絞る (特定のS3バケットのみ)
-   - トークンを外部に渡す際のリスク軽減
- **制限**: 最大2048文字
- **評価**: (ロールのポリシー) AND (セッションポリシー)


---

# 最小権限の原則

- **必要最小限の権限のみ付与** - 過剰な権限は攻撃対象を増やす
- **アプローチ**:
-   1. 広い権限で開始 (例: `s3:*`)
-   2. CloudTrailで実際に使用されたアクションを確認
-   3. 使用されたアクションのみに絞り込む
-   4. 定期的にレビュー、不要な権限を削除
- **ツール**:
-   - **IAM Access Analyzer** - 未使用の権限を検出
-   - **Access Advisor** - 最終使用日時を確認


---

# ロール設計パターン

- **1. サービスごとに専用ロール**
-   - Lambda用、ECS用、EC2用を分離
- **2. 環境ごとに分離**
-   - Dev/Staging/Prod で別ロール
- **3. チームごとに分離**
-   - Team-A-Developers, Team-B-Operators
- **4. クロスアカウント用の中継ロール**
-   - アカウントAのユーザー → 中継ロール → アカウントBのリソース
- **5. ブレイクグラス用の緊急ロール**
-   - 通常は使用禁止、緊急時のみ (CloudTrail監視必須)


---

# よくある設計ミス

- **1. ワイルドカード乱用**: `Resource: "*"` は本当に必要か？
- **2. 管理ポリシーの過剰付与**: `AdministratorAccess` を安易に使わない
- **3. 長期認証情報の放置**: IAMユーザーのアクセスキーをローテーション
- **4. トラストポリシーの緩さ**: `Principal: "*"` は危険
- **5. インラインポリシーの濫用**: 管理が煩雑になる
- **6. 権限レビューの欠如**: 定期的な棚卸しを実施


---

# IAM Access Analyzer

- **外部アクセスの検出** - 組織外からアクセス可能なリソースを特定
-   - S3バケット、IAMロール、KMSキー、Lambda関数等
- **未使用権限の検出** - 過去90日間使用されていないアクションを報告
- **ポリシー検証** - JSON構文エラー、ベストプラクティス違反を検出
- **継続的モニタリング** - 新しいリソースを自動スキャン
- **アクション**: FindingsをSNS/EventBridgeで通知、自動修復


---

# CloudTrailによる監査

- **すべてのAPI呼び出しをログ記録**
-   - 誰が (userIdentity)
-   - いつ (eventTime)
-   - 何を (eventName, requestParameters)
-   - どこから (sourceIPAddress)
- **重要なイベント**:
-   - `AssumeRole` - ロールの引き受け
-   - `CreatePolicy`, `AttachRolePolicy` - 権限変更
-   - `AccessDenied` - 失敗したリクエスト
- **ベストプラクティス**: S3に長期保存、Athenaで分析


---

# 権限エラーの診断手順

- **1. エラーメッセージを確認**
-   - `AccessDenied`: 権限不足
-   - `InvalidClientTokenId`: 認証情報が無効
-   - `SignatureDoesNotMatch`: 認証情報の設定ミス
- **2. CloudTrailでイベントを確認**
-   - `errorCode` と `errorMessage` をチェック
- **3. ポリシーシミュレーターで検証**
-   - 実際の権限を可視化
- **4. SCP/Permission Boundaryを確認**
-   - 意図しない制限がないか


---

# IAMポリシーシミュレーター

- **機能**: 特定のアクションが許可されるかテスト
- **使い方**:
-   1. プリンシパルを選択 (ユーザー/ロール)
-   2. テストしたいアクション・リソースを指定
-   3. 結果を確認 (Allow/Deny、理由を表示)
- **メリット**: 実際に実行せずに検証可能
- **制限**: SCPは反映されない (組織設定は別途確認が必要)
- **アクセス**: AWS Management Console または CLI (`aws iam simulate-principal-policy`)


---

# よくあるエラーと対策

- **AssumeRoleが失敗**
-   → トラストポリシーを確認、ExternalIdが正しいか
- **一時認証情報で認証エラー**
-   → SessionTokenを渡しているか、有効期限切れでないか
- **クロスアカウントで拒否**
-   → 両側のポリシーで許可されているか
- **Resource: "*" でも拒否**
-   → SCP, Permission Boundaryでブロックされていないか
- **ルートユーザーでも拒否**
-   → SCPで制限されている (一部操作は例外)


---

# まとめ - 重要ポイント

- **ポリシー評価**: 明示的Deny > 明示的Allow > デフォルトDeny
- **ロール**: 一時認証情報、AssumeRoleで取得、トラストポリシーが鍵
- **リソースポリシー**: クロスアカウント・サービス連携で必須
- **Permission Boundary**: 権限の上限設定、委任管理に有効
- **SCP**: 組織レベルのガバナンス、ルートユーザーにも適用
- **最小権限**: 定期的なレビュー、IAM Access Analyzerで検出
- **監査**: CloudTrail + Athena で継続的モニタリング


---

# 参考資料

- **公式ドキュメント:**
- - [IAM ユーザーガイド](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/)
- - [ポリシー評価ロジック](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- - [IAM Access Analyzer](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/what-is-access-analyzer.html)
- **ベストプラクティス:**
- - [IAM Best Practices](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/best-practices.html)
- - [AWS Security Blog](https://aws.amazon.com/jp/blogs/security/)

