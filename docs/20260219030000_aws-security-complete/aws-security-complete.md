---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
footer: "AWS セキュリティ完全版 2026 | Security Specialty対策"
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
  
  section { font-size: 0.80em; }
  section pre code { font-size: 0.58em; line-height: 1.4; }
  table { font-size: 0.66em; border-collapse: collapse; width: 100%; }
  th { background: #B71C1C; color: white; padding: 4px 8px; text-align: left; }
  td { padding: 3px 8px; border-bottom: 1px solid #e0e0e0; }
  tr:nth-child(even) td { background: #fff5f5; }
  section.lead h1 { font-size: 1.4em; }
  section.lead h2 { font-size: 1.1em; color: #fff; }
  h2 { color: #B71C1C; }
  h3 { color: #7F0000; font-size: 0.95em; }
  
---

<!-- _class: lead -->
# AWS セキュリティ完全版

- IAM / KMS / GuardDuty / WAF / Network Security
- AWS Certified Security – Specialty 完全対策
- 2026年版 | 全80枚


---

# 学習ロードマップ

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
| フェーズ | テーマ | スライド | 重要度 |
| --- | --- | --- | --- |
| 1 | IAM深掘り（ポリシー評価・SCP・ABAC） | 4–16 | ★★★ |
| 2 | データ保護・暗号化（KMS・Secrets・S3） | 17–30 | ★★★ |
| 3 | ネットワークセキュリティ（WAF・NF・SG） | 31–43 | ★★★ |
| 4 | 脅威検知・監視（GuardDuty・Security Hub） | 44–56 | ★★★ |
| 5 | 脆弱性管理・コンプライアンス | 57–64 | ★★ |
| 6 | インシデントレスポンス | 65–71 | ★★ |
| 7 | 試験直前まとめ | 72–80 | ★★★ |


---

# Security Specialty 試験概要・出題分布

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
| ドメイン | 出題割合 | 主要サービス |
| --- | --- | --- |
| 脅威検知・インシデント対応 | 14% | GuardDuty / Security Hub / Detective |
| セキュリティロギング・監視 | 18% | CloudTrail / Config / CloudWatch |
| インフラセキュリティ | 20% | VPC / WAF / Network Firewall |
| IAM・アクセス管理 | 16% | IAM / SCP / Organizations |
| データ保護 | 18% | KMS / Secrets Manager / Macie |
| 脆弱性管理 | 14% | Inspector v2 / Patch Manager |
| **試験形式** | **65問** | **合格スコア: 750/1000** |


---

<!-- _class: lead -->
# Section 1: IAM深掘り

- ポリシー評価ロジック / SCP / Permission Boundary / ABAC
- スライド 5–16


---

# IAM概要・エンティティ

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
| エンティティ | 説明 | 用途 |
| --- | --- | --- |
| IAM User | 永続的な認証情報 | 人間ユーザー・旧来の用途 |
| IAM Group | ユーザーの論理グループ | ポリシー一括管理 |
| IAM Role | 一時認証情報（STS） | EC2・Lambda・Cross-Account |
| IAM Policy | 許可・拒否の定義 | インラインvsマネージド |
| Service Principal | AWSサービス | EC2がS3にアクセス等 |
| **ベストプラクティス** | ルートユーザー使用禁止 | MFA必須・最小権限の原則 |


---

# IAMポリシー種類と評価ロジック

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
| ポリシー種類 | 適用対象 | 説明 |
| --- | --- | --- |
| Identity-based | User/Group/Role | Allow/Deny アクション定義 |
| Resource-based | S3/KMS/SQS等 | プリンシパルを直接指定 |
| Permission Boundary | User/Role | 最大権限の上限設定 |
| SCP (Service Control Policy) | OU/Account | Organizations全体ガードレール |
| Session Policy | 一時セッション | AssumeRole時に追加制限 |
| ACL (Access Control List) | S3/VPC等 | クロスアカウントのみ |
| **評価順序** | 明示的Deny優先 | Denyなし→全Allow交差→デフォルトDeny |


---

# ポリシー評価フロー詳細（1/2）

> *Explicit Deny→SCP→Resource-based→Permission Boundary→Session→Identity-basedの6段階評価順序が試験の核心*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
- **判定ステップ（順に評価）:**
- 1. **明示的 Deny** — どのポリシーにもDenyがあれば即 DENIED
- 2. **SCP チェック** — Organizations SCPが Allowしていないアクションは DENIED
- 3. **Resource-based ポリシー** — リソース側がAllowならOK（クロスアカウント時は両側必要）


---

# ポリシー評価フロー詳細（2/2）

> *6ステップ最後のデフォルトDenyまでの評価順序とCondition/NotAction/DenyWithConditionの注意点を暗記する*

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
- 4. **Permission Boundary** — バウンダリーが許可しないアクションは DENIED
- 5. **Session Policy** — 一時認証の場合、セッションポリシーの交差
- 6. **Identity-based ポリシー** — 最終的にAllowがあれば ALLOWED
- 7. **デフォルト Deny** — どのAllowもなければ DENIED
- **キーポイント**: Condition、NotAction、DenyWithConditionに注意


---

# Permission Boundary

> *Permission BoundaryはIDポリシーとの交差（AND）が実効権限—開発者に安全にIAM管理権限を委任できる*

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
- **概要**: IAM User / Role に設定できる「最大権限の上限」
- - Identity-based Policy と Permission Boundary の**交差（AND）**が実効権限
- - Boundary外のアクションはIDポリシーで許可していても無効
- **ユースケース:**
- - 開発者に IAM管理権限を委任しつつ、自分より強い権限付与を防ぐ
- - 最小権限の原則を組織的に強制


---

# Permission Boundary（コード例）

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:*", "ec2:*"],
    "Resource": "*"
  }]
}
// Boundaryなので「s3:*とec2:*まで」という上限
// IDポリシーがEC2のみなら実効はEC2のみ
```


---

# Service Control Policy (SCP)

> *SCPはリージョン制限・CloudTrail削除防止・コスト制限の3用途でOrganizations全体のGuardrailsとして機能する*

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
| 項目 | 内容 |
| --- | --- |
| 適用範囲 | Organizations の OU / Account |
| 効果 | 許可の上限（最大権限ガードレール） |
| ルートアカウント | SCPの影響を**受ける** |
| 管理アカウント | SCPの影響を**受けない** |
| デフォルト | FullAWSAccess（全許可） |
| 継承 | 親OU → 子OU → Account の順に継承 |
- **典型的な使い方:**
- - リージョン制限: ap-northeast-1のみ許可
- - 危険操作防止: CloudTrail削除・GuardDuty停止を Deny
- - コスト制限: 高コストサービスのDeny


---

# Organizations SCP vs Permission Boundary比較

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
| 比較項目 | SCP | Permission Boundary |
| --- | --- | --- |
| 設定主体 | Organizations管理者 | IAM管理者 |
| 適用対象 | OU / AWS Account全体 | 個別User / Role |
| 粒度 | アカウント単位 | エンティティ単位 |
| 目的 | 組織全体ガードレール | 権限昇格防止 |
| 管理アカウント適用 | × | ○ |
| リソースベースポリシー制限 | × | × |
| 組み合わせ | 両方設定で二重ガードレール | — |


---

# IAM Identity Center (SSO)（1/2）

> *Permission Set+IdP（Okta/Azure AD）SAML連携+SCIM自動プロビジョニングが企業SSO構築の標準パターン*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
- **概要**: 複数AWSアカウントへのシングルサインオン（旧: AWS SSO）
- **主要機能:**
- - Permission Set: アカウントへの権限テンプレート（IAM Roleとして展開）
- - IdP連携: Active Directory / Okta / Azure AD（SAML2.0 / OIDC）
- - SCIM: ユーザー/グループの自動プロビジョニング


---

# IAM Identity Center (SSO)（2/2）

> *CLI認証は`aws configure sso`で一時認証情報を自動管理—CloudTrailに`sso.amazonaws.com`で記録される*

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
- - MFA: TOTP / FIDO2（WebAuthn）対応
- **試験ポイント:**
- - CLI: `aws configure sso` で認証 → 一時認証情報を自動管理
- - ログ: CloudTrailに `sso.amazonaws.com` で記録
- - ABAC: タグベースでアカウント横断アクセス制御可能


---

# IAM Roles: AssumeRole / Cross-Account

> *AssumeRoleでSTSが一時認証情報（最大12h）発行—信頼ポリシーと許可ポリシーの2つが必要なことが頻出*

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
- **AssumeRoleフロー**: STS（Security Token Service）が一時認証情報を発行
- - `aws sts assume-role` → AccessKeyId / SecretAccessKey / SessionToken（最大12h）
- **Cross-Account アクセス:**
- - 信頼ポリシー（Trust Policy）: どのアカウント・エンティティがRoleを引き受けられるか
- - 許可ポリシー（Permission Policy）: Roleが何をできるか


---

# IAM Roles: AssumeRole / Cross-Account（コード例）

```json
// Trust Policy（Account Bのロールを Account Aが使う）
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::123456789012:root"},
    "Action": "sts:AssumeRole",
    "Condition": {"StringEquals": {"sts:ExternalId": "unique-id"}}
  }]
}
```


---

# ABAC（属性ベースアクセス制御）

> *aws:ResourceTag/dept=${aws:PrincipalTag/dept}のConditionキーでタグ一致する自分のリソースのみ操作可能*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
- **概要**: タグを使った動的アクセス制御（Attribute-Based Access Control）
| 項目 | RBAC（従来） | ABAC |
| --- | --- | --- |
| 制御基準 | ロール/グループ | リソース・プリンシパルタグ |
| スケール | ポリシー数が増加 | タグルール1つで管理 |
| 柔軟性 | 低い | 高い |
| 設定例 | 部署ごとにポリシー | `dept`タグ一致のみ許可 |
- **Conditionキー例:**
- - `aws:ResourceTag/dept` = `${aws:PrincipalTag/dept}`
- - `aws:RequestTag/env` ∈ [dev, staging]


---

# IAM Access Analyzer（1/2）

> *Access Analyzerは外部公開検出・未使用権限検出・ポリシー検証の3機能で最小権限原則の自動実装を支援する*

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
- **機能1: 外部アクセス分析**
- - S3 / IAM Role / KMS / Lambda / SQS / Secrets Manager が外部公開されていないか検出
- - ゾーン・オブ・トラスト（信頼ゾーン）外からのアクセスを Findingとして報告
- **機能2: 未使用アクセス分析**
- - 90日間使用されていない権限・ロール・アクセスキーを検出


---

# IAM Access Analyzer（2/2）

> *ValidatePolicy APIで文法+セキュリティ警告、CheckAccessNotGrantedで特定アクション非許可を確認してSecurity Hubへ送信*

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
- - 最小権限実施のための推奨ポリシー生成
- **機能3: ポリシー検証**
- - `ValidatePolicy` API: 文法チェック + セキュリティ警告
- - `CheckAccessNotGranted`: 特定アクションが許可されないことを確認
- **統合**: Security Hub へ Findingを自動送信


---

# IAMセキュリティベストプラクティス

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
| カテゴリ | ベストプラクティス |
| --- | --- |
| ルートユーザー | MFA必須・アクセスキー削除・日常使用禁止 |
| アクセスキー | 90日ローテーション・未使用は削除 |
| MFA | 全IAMユーザーに仮想/ハードウェアMFA |
| 最小権限 | Access Analyzerで定期レビュー |
| クロスアカウント | ExternalId条件付きAssumeRole |
| サービス | EC2インスタンスプロファイル（キー不要） |
| 監査 | CloudTrailでAPIコールを全記録 |
| 緊急時 | Break-Glass Role + 強固な通知設定 |


---

# IAM試験ポイントまとめ10選

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
| # | 試験ポイント | キーワード |
| --- | --- | --- |
| 1 | 評価順序: 明示Deny → SCP → RBP → Boundary → Session → Identity | Deny優先 |
| 2 | SCPは管理アカウントに適用されない | 管理アカウント |
| 3 | Permission BoundaryはIdentityポリシーとの交差 | 最大権限上限 |
| 4 | Cross-AccountはExternalIdで混乱代理人攻撃を防ぐ | Confused Deputy |
| 5 | Access AnalyzerはZone of Trust外を検出 | 外部公開 |
| 6 | ABACは`aws:PrincipalTag`と`aws:ResourceTag`の一致 | タグ条件 |
| 7 | Identity Centerのログは`sso.amazonaws.com` | CloudTrail |
| 8 | 一時認証情報はSTSが発行（最大12時間） | AssumeRole |
| 9 | Resource-basedポリシーは同一アカウントならIDポリシー不要 | 同一アカウント |
| 10 | NotActionは列挙外すべてにマッチ（Denyと組み合わせ注意） | NotAction |


---

<!-- _class: lead -->
# Section 2: データ保護・暗号化

- KMS / Secrets Manager / S3暗号化 / Macie
- スライド 18–30


---

# Envelope暗号化の仕組み（1/2）

> *Envelope暗号化は平文DEK+暗号化DEKの2段階で大容量データをKMSに送らず効率的に暗号化できる*

- **Envelope暗号化**: 大容量データを効率的に暗号化する2層構造
- **ステップ:**
- 1. KMSに **データキー（DEK）** 生成をリクエスト
- 2. KMSは「平文DEK」と「暗号化DEK」を返す
- 3. 平文DEKでデータをローカル暗号化（AES-256）


---

# Envelope暗号化の仕組み（2/2）

> *CMK一つで大量データキーを管理しKMSスループットを向上させるEnvelope暗号化の復号フローを理解する*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
- 4. 平文DEKはメモリから消去・暗号化DEKをデータと一緒に保存
- 5. 復号時: 暗号化DEKをKMSに送りCMKで復号 → 平文DEKを取得 → データ復号
- **利点:**
- - KMSにデータを送らないためスループット向上
- - CMK一つで大量データキーを管理


---

# KMS概要・キー種類

| キー種類 | 管理主体 | 説明 | コスト |
| --- | --- | --- | --- |
| AWS Managed Key | AWS | AWSサービス用（`aws/s3`等） | 無料 |
| Customer Managed Key (CMK) | お客様 | 完全管理・ローテーション設定可 | $1/月 |
| Customer Provided Key | お客様 | CloudHSMで管理・KMS外部キーストア | 別途 |
| データキー (DEK) | アプリ | GenerateDataKeyで生成・KMSに保存されない | — |
- **対称 vs 非対称:**
| 対称 (AES-256) | 非対称 (RSA/ECC) |
| --- | --- |
| Encrypt/Decrypt | 署名/検証・公開鍵暗号 |
| AWSサービス統合の標準 | 外部システムとの連携 |


---

# CMK管理（対称/非対称/HMAC）

> *キーローテーションは365日デフォルト（1〜2560日カスタマイズ可）—旧キー保持で過去データ復号は継続する*

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
| CMK種別 | アルゴリズム | 用途 |
| --- | --- | --- |
| 対称 | AES-256-GCM | 暗号化/復号（AWSサービス連携） |
| 非対称RSA | RSA 2048/3072/4096 | 暗号化/復号・デジタル署名 |
| 非対称ECC | NIST P-256/P-384/P-521 | デジタル署名のみ |
| SM2（中国） | SM2 | 中国リージョン向け |
| HMAC | HMAC-SHA-256〜512 | メッセージ認証コード生成 |
- **キーローテーション:**
- - 自動ローテーション: 365日（または1〜2560日でカスタマイズ可）
- - 旧キーマテリアル保持で過去データ復号は継続可能
- - 手動ローテーション（エイリアス切替）: 非対称・HMAC・インポートキー


---

# KMSマルチリージョンキー

> *マルチリージョンキーはRDS Global Database・S3レプリケーション・クロスリージョンDRで同一CMKを使える*

- **概要**: 複数リージョンで同じキーマテリアルを共有（レプリカキー）
| 特性 | 内容 |
| --- | --- |
| キーID | 全リージョンで同一のキーID（`mrk-`プレフィックス） |
| 用途 | DRシナリオでの復号・グローバルDynamoDB暗号化 |
| 独立管理 | 各リージョンのレプリカは独立して管理・削除可能 |
| 自動ローテーション | プライマリキーのみ設定（レプリカは自動同期） |
- **ユースケース:**
- - RDS Global Databaseの暗号化（同一CMKで複数リージョン復号）
- - S3レプリケーション先リージョンでの暗号化継続
- - クロスリージョンDR: 通常のCMKでは復号不可


---

# KMSキーポリシー vs IAMポリシー

> *デフォルトキーポリシーでルートユーザーに完全アクセス許可—管理者と使用者をキーポリシーで分離する*

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
| 比較項目 | キーポリシー | IAMポリシー |
| --- | --- | --- |
| 設定場所 | KMSキー側（Resource-based） | IAMユーザー/ロール側 |
| 必須性 | **必須**（デフォルト許可なし） | キーポリシーが許可している場合のみ有効 |
| 粒度 | キー単位 | アクション・リソース単位 |
| クロスアカウント | キーポリシーで外部アカウント指定 | 外部アカウントのIAMでも許可必要 |
- **デフォルトキーポリシー:**
- - アカウントのルートユーザーに完全アクセス許可
- - IAMポリシーによるキーアクセス管理を有効化
- **ベストプラクティス**: キーポリシーで管理者と使用者を分離


---

# Secrets Manager詳細

> *Secrets Managerは自動ローテーション+バージョン管理+クロスアカウント共有+VPC Endpointが特徴的な4機能*

- **概要**: パスワード・APIキー・DBクレデンシャルの安全な管理・自動ローテーション
- **主要機能:**
- - 自動ローテーション: Lambda関数で定期更新（RDS/Redshift/DocumentDB組み込み対応）
- - バージョン管理: AWSCURRENT / AWSPENDING / AWSPREVIOUS
- - クロスアカウント: リソースベースポリシーで共有
- - VPC Endpoint: インターネット経由なし


---

# Secrets Manager詳細（コード例）

```python
import boto3
client = boto3.client('secretsmanager')

# シークレット取得
response = client.get_secret_value(
    SecretId='prod/db/password'
)
secret = response['SecretString']  # or SecretBinary

# ローテーション設定
client.rotate_secret(
    SecretId='prod/db/password',
    RotationLambdaARN='arn:aws:lambda:...',
    RotationRules={'AutomaticallyAfterDays': 30}
)
```


---

# SSM Parameter Store詳細

> *SecureStringがKMS暗号化対応—/app/prod/db/password形式の階層構造でGetParametersByPathを活用する*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
| 機能 | Standard | Advanced |
| --- | --- | --- |
| パラメータ数 | 10,000 | 100,000 |
| 値サイズ | 4KB | 8KB |
| ポリシー | なし | 有効期限・通知設定可 |
| コスト | 無料 | $0.05/パラメータ/月 |
| SecureString | KMS暗号化 | KMS暗号化 |
- **パラメータ種類:**
- - String: プレーンテキスト
- - StringList: カンマ区切りリスト
- - SecureString: KMS暗号化（CMK指定可）
- **階層構造**: `/app/prod/db/password` 形式でGetParametersByPath


---

# Secrets Manager vs Parameter Store比較

| 比較項目 | Secrets Manager | Parameter Store |
| --- | --- | --- |
| 主な用途 | DBパスワード・APIキー | 設定値・機密情報 |
| 自動ローテーション | ○（Lambda統合） | × |
| コスト | $0.40/シークレット/月 | 無料（Standard） |
| クロスアカウント共有 | ○ | △（同一アカウント推奨） |
| バージョン管理 | ○（CURRENT/PENDING/PREV） | ○（バージョン番号） |
| CloudFormation統合 | ○ | ○（`{{resolve:ssm:}}`） |
| 選択基準 | ローテーション必須 or 多機能 | シンプルな設定管理・コスト重視 |


---

# S3暗号化（SSE-S3/SSE-KMS/SSE-C/CSE）

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
| 暗号化種別 | キー管理 | 特徴 |
| --- | --- | --- |
| SSE-S3 | AWS管理（AES-256） | 最もシンプル・無料 |
| SSE-KMS | KMS CMK | CloudTrail記録・クロスアカウント可 |
| DSSE-KMS | KMS CMK（2層） | 二重暗号化・規制準拠 |
| SSE-C | お客様提供キー | リクエストごとにキー提供 |
| CSE-KMS | KMS（クライアント側） | S3到達前に暗号化 |
| CSE-C | お客様ローカルキー | 完全自己管理 |
- **試験ポイント:**
- - デフォルト暗号化: バケット設定でSSE-S3またはSSE-KMSを強制
- - `aws:SecureTransport` Conditionでhttps必須化


---

# ACM（Certificate Manager）（1/2）

> *ACMはDNS検証（Route53自動設定・自動更新対応）を推奨—EC2への直接インストールは不可能な仕様*

- **概要**: SSL/TLSサーバー証明書の無料発行・管理・自動更新
- **発行方法:**
- - DNS検証: Route53自動設定（推奨・自動更新対応）
- - メール検証: ドメイン管理者宛て確認メール
- **利用できるサービス:**


---

# ACM（Certificate Manager）（2/2）

> *パブリック証明書は無料・Private CAは$400/月〜・EC2直接インストール不可がACMの試験頻出3ポイント*

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
- - ALB / NLB / CloudFront / API Gateway / Cognito
- - EC2への直接インストールは**不可**（証明書のエクスポート不可）
- **Private CA:**
- - ACM Private CA: 内部サービス用プライベート証明書
- - マイクロサービス間TLS・コード署名に対応
- **コスト**: パブリック証明書は**無料**、Private CAは$400/月〜


---

# CloudHSM

- **概要**: 専用ハードウェアセキュリティモジュール（FIPS 140-2 Level 3）
| 項目 | KMS | CloudHSM |
| --- | --- | --- |
| 管理 | AWS管理（マネージド） | お客様管理 |
| FIPS認定 | Level 3 | Level 3 |
| API | AWS SDK統合 | PKCS#11 / JCE / CNG |
| 可用性 | 自動冗長化 | クラスター構成（お客様責任） |
| コスト | $0.03/10,000 API calls | $1.60/時間〜 |
| 用途 | 汎用暗号化 | 規制準拠・独自キー管理 |
- **ユースケース**: Oracle TDE・SSL/TLSオフロード・コード署名


---

# Amazon Macie v2（1/2）

> *MacieはS3内のクレジットカード・氏名・パスワード・マイナンバーを機械学習で自動検出するPII特化サービス*

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
- **概要**: S3内のPII（個人識別情報）・機密データを機械学習で自動検出
- **検出できるデータ種別:**
- - クレジットカード番号・銀行口座番号
- - 氏名・住所・電話番号・メールアドレス
- - パスワード・シークレットキー・アクセストークン


---

# Amazon Macie v2（2/2）

> *バケットメタデータ評価$0.10/バケット+オブジェクトスキャン$1/GBのコスト構造でSecurity Hub統合が可能*

- - 国固有の識別番号（マイナンバー・SSN等）
- **主要機能:**
- - 自動S3スキャン: バケット作成時に自動検出ジョブ
- - カスタムデータ識別子: 独自の正規表現パターン定義
- - Security Hub統合: Findingを自動送信
- **コスト**: バケットメタデータ評価 $0.10/バケット + オブジェクトスキャン $1/GB


---

# データ保護試験ポイントまとめ10選

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
| # | 試験ポイント | キーワード |
| --- | --- | --- |
| 1 | Envelope暗号化: DEKでデータ暗号化、CMKでDEK暗号化 | 2層構造 |
| 2 | CMK自動ローテーション: 1〜2560日（デフォルト365日） | ローテーション |
| 3 | マルチリージョンキー: 同一キーIDをDRに使用 | mrk-プレフィックス |
| 4 | キーポリシーは必須（IAMポリシー単独では不可） | Resource-based必須 |
| 5 | Secrets Managerはローテーション必須要件で選択 | $0.40/月 |
| 6 | Parameter Store SecureStringはKMSで暗号化 | SecureString |
| 7 | SSE-KMSはCloudTrailでキー使用ログ記録 | 監査証跡 |
| 8 | ACM証明書はEC2に直接インストール不可 | エクスポート不可 |
| 9 | CloudHSM: FIPS 140-2 Level 3・お客様が完全管理 | HSM |
| 10 | MacieはS3のPII検出・Security Hub送信 | PII |


---

<!-- _class: lead -->
# Section 3: ネットワークセキュリティ

- WAF / Shield / Network Firewall / VPC Security
- スライド 32–43


---

# Security Group vs NACL詳細比較

| 比較項目 | Security Group | NACL |
| --- | --- | --- |
| 適用レベル | インスタンス（ENI） | サブネット |
| ステートフル | ○（戻りトラフィック自動許可） | ×（インバウンド/アウトバウンド独立） |
| ルール種類 | Allowのみ | Allow + Deny |
| 評価方式 | 全ルール評価後判断 | 番号順（最初にマッチ） |
| デフォルト | 全インバウンドDeny / 全アウトバウンドAllow | 全Allow（デフォルトNACL） |
| 変更反映 | 即時 | 即時 |
- **使い分け**: SGで精密制御 / NACLで特定IPの即時ブロック（Denyが必要な場合）


---

# VPC Flow Logs（1/2）

> *VPC Flow LogsはSGやNACLによるRejectも記録—DNS解決トラフィックはキャプチャされない仕様が試験頻出*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
- **概要**: VPC内のネットワークトラフィック（IPフロー情報）を記録
- **キャプチャレベル:** VPC / サブネット / ENI
- **出力先:** CloudWatch Logs / S3 / Kinesis Data Firehose
- **記録フィールド（v2）:**
- - srcaddr, dstaddr, srcport, dstport, protocol
- - bytes, packets, start, end, action（ACCEPT/REJECT）


---

# VPC Flow Logs（2/2）

> *拡否トラフィックも記録するFlow Logs v5のflow-directionとtraffic-pathフィールドがインシデント調査で重要*

- **拡張フィールド（v5）:**
- - flow-direction（ingress/egress）
- - traffic-path（IGW/VGW/TGW等）
- **試験ポイント:**
- - 拒否トラフィックも記録（SGやNACLによるReject含む）
- - DNS解決トラフィックはキャプチャされない


---

# VPC Endpoints（Interface/Gateway）

> *Gateway EndpointはルートテーブルのみでSGなし・Interface EndpointはSG適用可能—この差異が試験の核心*

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
| 種類 | 対象サービス | 仕組み | コスト |
| --- | --- | --- | --- |
| Gateway Endpoint | S3・DynamoDB | ルートテーブルエントリ追加 | 無料 |
| Interface Endpoint | 100以上のサービス | ENI（PrivateLink） | $0.01/時 + データ |
| Gateway Load Balancer EP | アプライアンス | トラフィック透過転送 | 別途 |
- **Interface Endpointのセキュリティ:**
- - エンドポイントポリシー: アクセスできるアクション・リソースを制限
- - 例: `aws:sourceVpc` Conditionで特定VPCからのみ許可
- **試験ポイント:**
- - Gateway Endpointはルートテーブルのみ → SGなし
- - Interface EndpointはSG適用可能


---

# AWS WAF v2

> *WAF Core Rule Set（CRS）がOWASP Top 10対策・SQLインジェクション・XSS・Bot Control・Fraud Controlをカバー*

| 項目 | 内容 |
| --- | --- |
| 適用先 | ALB / CloudFront / API Gateway / AppSync / Cognito |
| ルール種類 | マネージドルール / カスタムルール / IPセット / 正規表現パターン |
| アクション | Allow / Block / Count / CAPTCHA / Challenge |
| レート制限 | IPベース / ヘッダー/クエリベース（5分間のリクエスト数） |
| ログ | CloudWatch Logs / S3 / Kinesis Firehose |
- **マネージドルールグループ（AMR）:**
- - Core Rule Set（CRS）: OWASP Top 10対策
- - SQLインジェクション / XSS / Bot Control / Fraud Control
- - AWSによる定期更新（バージョン管理）


---

# Shield Standard vs Advanced

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
| 比較項目 | Shield Standard | Shield Advanced |
| --- | --- | --- |
| コスト | 無料（全顧客） | $3,000/月 + データ転送費 |
| 保護対象 | EC2/ELB/CloudFront/Route53 | 同左＋高度な保護 |
| DDoS保護 | L3/L4 自動保護 | L3/L4/L7 高度保護 |
| DRT | なし | Shield Response Team（24/7） |
| コスト保護 | なし | DDoS起因のスケールアップ費用補填 |
| WAF統合 | なし | 自動WAFルール作成 |
| 検知・通知 | なし | CloudWatch + 詳細テレメトリ |
- **推奨場面**: 金融・メディア・EC サイト等 SLA 重要サービス


---

# CloudFront + WAF統合パターン（1/2）

> *CloudFrontにWAFを直接アタッチしOAC+HTTPS強制+Geo Restrictionの組み合わせが最強のエッジセキュリティ*

- **WAF + CloudFrontの組み合わせパターン:**
- - CloudFrontにWAFを直接アタッチ（グローバルルール）
- - ALBにもWAFをアタッチ（リージョナルルール）
- **CloudFrontセキュリティ機能:**
- - Origin Access Control（OAC）: S3をCloudFront経由のみに制限


---

# CloudFront + WAF統合パターン（2/2）

> *WAFはus-east-1で管理（CloudFront用）・OACはOAIの後継でLambdaオリジンにも対応—これが試験の2大ポイント*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
- - HTTPS強制: Viewer/Origin 両方でTLS1.2以上
- - Geo Restriction: 国単位でアクセス制限
- - Field-level Encryption: 特定フィールドをCloudFrontで暗号化
- **試験ポイント:**
- - WAFはus-east-1リージョンで管理（CloudFront用）
- - OACはOAI（旧）の後継・Lambdaオリジンにも対応


---

# AWS Network Firewall（1/2）

> *Network FirewallはSuricataルール互換でOSSのIDS/IPSルールをそのまま流用できるL3-L7フィルタリング*

- **概要**: VPC内の詳細なステートフルL3-L7フィルタリング
- **特徴:**
- - ステートレス + ステートフルルールエンジン
- - Suricataルール互換（OSSのIDS/IPSルール流用可）
- - ドメインリスト: FQDN/ワイルドカードによるDNSフィルタリング


---

# AWS Network Firewall（2/2）

> *TLSインスペクション（SNIベース）+Transit Gatewayで検査VPCに集中させる構成が最も堅牢なNW防御*

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
- - TLSインスペクション: SNI（ホスト名）ベースのHTTPS検査
- **デプロイ構成:**
- - 検査VPC: トランジットゲートウェイ経由で集中管理
- - 各VPCサブネット: ルートテーブルでNetwork Firewallエンドポイント経由
- **ログ**: Flow / Alert / TLS → CloudWatch / S3 / Firehose


---

# AWS Firewall Manager（1/2）

> *Firewall ManagerはWAF/Shield Advanced/SG/Network Firewallを組織全体に一元管理—新規アカウント自動適用が特徴*

- **概要**: Organizations全体のセキュリティポリシーを一元管理
- **管理できるポリシー種類:**
- - WAF v2: ALB/CloudFront/API Gatewayへ自動適用
- - Shield Advanced: 保護リソースの一元登録
- - Security Group: 共通SGの強制適用


---

# AWS Firewall Manager（2/2）

> *Firewall ManagerはOrganizations有効化が前提—新規アカウント・リソースへの自動適用が最大の差別化機能*

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
- - Network Firewall: VPCへ自動デプロイ
- - Route53 Resolver DNS Firewall
- **要件:**
- - AWS Organizations有効化が必要
- - 管理アカウントまたは委任管理者アカウントから設定
- **試験ポイント**: 新規アカウント・リソースへの自動適用が特徴


---

# Route53 Resolver DNS Firewall（1/2）

> *DNS Firewallはマネージドドメインリスト（マルウェア・ボットネット）でアウトバウンドDNSを保護する*

- **概要**: VPC内のDNSクエリをフィルタリング（アウトバウンドDNS保護）
- **機能:**
- - ドメインリスト: マネージドリスト（マルウェア・ボットネット）+ カスタムリスト
- - アクション: ALLOW / BLOCK / ALERT（Countのみ）
- - フェイルオープン/フェイルクローズ: Firewallが応答不能時の動作選択


---

# Route53 Resolver DNS Firewall（2/2）

> *AWSManagedDomainsBotnetCommandandControlリストでC2通信をDNSレイヤーで遮断するのがDNS Firewall最大の効果*

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
- **マネージドドメインリスト（AWSが管理）:**
- - AWSManagedDomainsMalwareDomainList
- - AWSManagedDomainsBotnetCommandandControl
- **統合**: Firewall Manager で組織全体に一括適用可能
- **試験ポイント**: DNSレイヤーでのC2（コマンド&コントロール）通信遮断


---

# AWS PrivateLink

> *PrivateLinkはNLBをエンドポイントサービスとして公開しVPCピアリング不要でプライベート接続を実現する*

- **概要**: VPCピアリング不要でサービスを安全にプライベート接続
- **仕組み:**
- - サービスプロバイダ: NLBをエンドポイントサービスとして公開
- - サービスコンシューマ: Interface VPC Endpointで接続
- - トラフィックはAWSネットワーク内（インターネット不通過）
- **VPCピアリングとの比較:**
| 項目 | PrivateLink | VPCピアリング |
| --- | --- | --- |
| ルーティング | エンドポイントのみ | CIDR全体 |
| CIDRオーバーラップ | 問題なし | 不可 |
| 推移的接続 | なし | なし |
- **ユースケース**: SaaSサービス提供・共有サービスVPC設計


---

# Transit Gateway + セグメンテーション

> *TGWルートテーブル分離で本番↔開発通信不可・全アウトバウンドをFirewall VPC経由に強制するのが最強のセグメンテーション*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
- **セキュリティのためのTGW設計パターン:**
| パターン | 説明 | 使途 |
| --- | --- | --- |
| 集中検査 | 全トラフィックをFirewall VPCへ | Network Firewall統合 |
| セグメンテーション | ルートテーブルで通信分離 | 本番/開発/共有サービス |
| ブラックホールルート | 不要通信を即破棄 | IPブロック |
- **TGWルートテーブル分離:**
- - 本番VPC → 共有サービスVPCのみ通信許可
- - 本番VPC ↔ 開発VPC は通信不可
- - 全アウトバウンドをFirewall VPC経由に強制
- **試験ポイント**: TGWアタッチメントごとにルートテーブルを割り当て


---

# ネットワークセキュリティ試験ポイントまとめ

| # | 試験ポイント | キーワード |
| --- | --- | --- |
| 1 | SGはステートフル・NACLはステートレス（戻り通信の扱い） | ステートフル |
| 2 | NACLはルール番号順評価（最初にマッチしたルールが優先） | 番号順 |
| 3 | WAFはus-east-1で管理（CloudFront用） | グローバル |
| 4 | Shield Advancedのみ DRT + L7保護 + コスト補填 | $3,000/月 |
| 5 | Network FirewallはSuricataルール互換 | IDS/IPS |
| 6 | Firewall ManagerはOrganizations必須 | 一元管理 |
| 7 | Gateway EndpointはS3/DynamoDBのみ（無料） | ルートテーブル |
| 8 | PrivateLinkはCIDRオーバーラップ問題なし | NLBベース |
| 9 | DNS FirewallはVPC内DNSクエリをフィルタ | C2遮断 |
| 10 | TGWルートテーブルでVPC間セグメンテーション | 通信分離 |


---

<!-- _class: lead -->
# Section 4: 脅威検知・監視

- GuardDuty / Security Hub / CloudTrail / Config
- スライド 45–56


---

# GuardDuty概要・検知カテゴリ

> *GuardDutyはCloudTrail/VPC Flow Logs/DNS Logs/EKS/ECS/Lambda/RDSの7ソースから機械学習で脅威検知する*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
- **概要**: 機械学習・脅威インテリジェンスを使ったAWSアカウントの脅威検知
- **データソース:**
- - CloudTrail管理イベント / S3データイベント
- - VPC Flow Logs / DNS Logs
- - EKS監査ログ / ECS / Lambda / RDS / S3 Malware Protection
- **検知カテゴリ:**
| カテゴリ | 例 |
| --- | --- |
| Backdoor | EC2からC2サーバーへ通信 |
| CryptoCurrency | マイニング活動の検知 |
| Trojan | DNSリクエストのDGA（ドメイン生成アルゴリズム） |
| UnauthorizedAccess | 匿名プロキシからのAPI呼び出し |
| Recon | 異常なポートスキャン |


---

# GuardDuty Findings詳細

| Finding種別 | 深刻度 | 内容 |
| --- | --- | --- |
| UnauthorizedAccess:EC2/SSHBruteForce | 中 | SSHブルートフォース攻撃 |
| Recon:IAMUser/MaliciousIPCaller | 中 | 悪意IPからのAPI呼び出し |
| Backdoor:EC2/C&CActivity.B!DNS | 高 | DNSでC2通信 |
| CryptoCurrency:EC2/BitcoinTool.B | 高 | ビットコインマイニング |
| CredentialAccess:IAMUser/AnomalousBehavior | 高 | 異常な認証情報使用 |
| Exfiltration:S3/MaliciousIPCaller | 高 | 悪意IPからS3アクセス |
- **Finding抑制**: ホワイトリストによるFalse Positiveの除外
- **自動修復**: EventBridge → Lambda → 修復アクション


---

# Security Hub概要（1/2）

> *Security HubはGuardDuty・Macie・Inspector・IAM Access Analyzerを集約しASFF標準形式でFindingを統合する*

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
- **概要**: セキュリティ Findingの集約・優先順位付け・自動修復の統合ハブ
- **連携サービス（Findingを送信）:**
- - GuardDuty / Macie / Inspector v2 / IAM Access Analyzer
- - Firewall Manager / Config / ChatBot / サードパーティ
- **主要機能:**


---

# Security Hub概要（2/2）

> *セキュリティスコアの0-100評価・自動修復ルール・クロスリージョン集約がSecurity Hubの3大機能*

- - ASFF（AWS Security Finding Format）: 標準形式で統合
- - セキュリティスコア: コントロールごとの準拠状況を0-100でスコア化
- - 自動修復: Security Hub Automation Rulesで条件付き自動アクション
- - クロスリージョン集約: メインリージョンへの集約
- **Organizations統合**: 全アカウントのFindingを管理アカウントで一元管理


---

# Security Hub Standards

> *IAM直接アタッチ禁止・S3パブリックアクセスブロック・CMKローテーション有効化がFSBP最重要3コントロール*

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
| スタンダード | 概要 | コントロール数 |
| --- | --- | --- |
| AWS Foundational Security Best Practices | AWSセキュリティベストプラクティス | 200+ |
| CIS AWS Foundations Benchmark v1.4 | CIS標準 | 60+ |
| CIS AWS Foundations Benchmark v3.0 | 最新CIS標準 | 56 |
| PCI DSS v3.2.1 | クレジットカード業界標準 | 30+ |
| NIST SP 800-53 Rev. 5 | 米国政府標準 | 300+ |
- **コントロール例（FSBP）:**
- - [IAM.1] IAMポリシーはルートユーザーに直接アタッチしない
- - [S3.1] S3バケットのパブリックアクセスをブロック
- - [KMS.4] CMKのキーローテーションを有効化


---

# Amazon Detective

> *DetectiveはGuardDuty Findingからワンクリックで根本原因調査—グラフモデルとタイムライン表示が特徴*

- **概要**: セキュリティインシデントの根本原因調査に特化したサービス
- **GuardDuty / Security Hubとの違い:**
| サービス | 役割 |
| --- | --- |
| GuardDuty | 脅威**検知**（何が起きたか） |
| Security Hub | Finding**集約・優先順位付け** |
| Detective | 根本原因**調査**（なぜ起きたか） |
- **機能:**
- - グラフモデル: エンティティ（IP/ロール/リソース）間の関係を可視化
- - 時系列分析: 不審な行動パターンをタイムライン表示
- - GuardDuty Findingからワンクリックで詳細調査
- **データソース**: CloudTrail / VPC Flow Logs / GuardDuty Findings（90日間保持）


---

# CloudTrail詳細（Management/Data/Insights）

> *マルチリージョントレイル+S3バージョニング+MFA Delete+Object LockでCloudTrailの証跡を確実に保護する*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
| イベント種別 | 内容 | デフォルト |
| --- | --- | --- |
| 管理イベント | APIコール・コンソール操作 | 有効（無料） |
| データイベント | S3オブジェクト操作・Lambda実行 | 無効（有料） |
| Insightsイベント | 異常なAPI活動パターン | 無効（有料） |
| ネットワーク活動 | VPC Endpointへの接続 | 無効（有料） |
- **重要設定:**
- - マルチリージョントレイル: 全リージョンの証跡を一か所に集約
- - S3バケット: バージョニング + MFA Delete + Object Lock推奨
- - CloudWatch Logs連携: メトリクスフィルタで異常をアラート
- **試験ポイント**: 証跡はデフォルトで管理コンソールに表示されるがS3保存は要設定


---

# CloudWatch Logs Insights（セキュリティ）

- **CloudTrailのセキュリティ監視クエリ例:**


---

# CloudWatch Logs Insights（セキュリティ）（コード例）

```sql
# ルートユーザーAPIコール検索
fields @timestamp, userIdentity.type, eventName
| filter userIdentity.type = "Root"
| sort @timestamp desc
| limit 20

# 失敗したAPI呼び出し（AccessDenied）
fields @timestamp, eventName, errorCode
| filter errorCode like /AccessDenied/
| stats count() by eventName

# 大量S3削除検知
fields @timestamp, requestParameters.bucketName
| filter eventName = "DeleteObject"
| stats count() as cnt by bin(5m)
| sort cnt desc
```


---

# AWS Config + Conformance Packs

> *Config Remediationは不準拠を自動修正しConformance PacksでPCI DSS/HIPAA/CISをワンクリックデプロイする*

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
- **AWS Config**: リソース設定の記録・変更追跡・コンプライアンス評価
| マネージドルール | 評価内容 |
| --- | --- |
| s3-bucket-public-read-prohibited | S3公開読み取り禁止 |
| mfa-enabled-for-iam-console-access | IAMコンソールMFA有効化 |
| encrypted-volumes | EBSボリューム暗号化チェック |
| cloudtrail-enabled | CloudTrail有効化確認 |
| guardduty-enabled-centralized | GuardDuty有効化確認 |
- **Remediation（自動修復）:**
- - SSM Automation Documentでノンコンプライアンスを自動修正
- **Conformance Packs**: ルールセットを一括デプロイ（PCI DSS / HIPAA / CIS等）


---

# EventBridge セキュリティ自動化

- **セキュリティイベントの自動対応パターン:**


---

# EventBridge セキュリティ自動化（コード例）

```json
# GuardDuty 高深刻度 → EC2隔離
{
  "source": ["aws.guardduty"],
  "detail-type": ["GuardDuty Finding"],
  "detail": {
    "severity": [{"numeric": [">=", 7]}]
  }
}
// → Lambda: EC2のSGを隔離SG（全通信拒否）に変更

// Config非準拠 → 自動修復
{
  "source": ["aws.config"],
  "detail": {"newEvaluationResult":
    {"complianceType": ["NON_COMPLIANT"]}}
}
// → SSM Automation Document で自動修復実行
```


---

# Trusted Advisor（セキュリティチェック）

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
| チェック項目 | 重要度 |
| --- | --- |
| S3バケット公開アクセス | 赤 |
| SGポート22/3389を0.0.0.0/0に開放 | 赤 |
| IAMアクセスキー90日以上未使用 | 赤 |
| ルートアカウントMFA未設定 | 赤 |
| EBSスナップショット公開 | 赤 |
| RDSスナップショット公開 | 赤 |
| MFAなしIAMユーザー | 黄 |
| CloudTrail未有効 | 赤 |
- **プラン別:**
- - Basic/Developer: 赤カテゴリのコアチェックのみ
- - Business/Enterprise: 全200+チェック + API + Jira/Slack連携


---

# AWS Audit Manager

- **概要**: コンプライアンス監査の証拠収集・レポート生成を自動化
| 機能 | 内容 |
| --- | --- |
| 組み込みフレームワーク | PCI DSS / SOC 2 / HIPAA / GDPR / CIS / NIST |
| 証拠自動収集 | Config / CloudTrail / Security Hub から自動取得 |
| カスタムフレームワーク | 独自の監査基準を定義可能 |
| レポート出力 | 監査人向けPDFレポート生成 |
- **Security Hubとの違い:**
| Audit Manager | Security Hub |
| --- | --- |
| 監査証拠収集・整理（過去分析） | セキュリティFinding集約（現状） |
| 監査人向けレポート | セキュリティチーム向けダッシュボード |


---

# 脅威検知試験ポイントまとめ10選

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
| # | 試験ポイント | キーワード |
| --- | --- | --- |
| 1 | GuardDutyはCloudTrail/VPC FL/DNS Logsがデータソース | 機械学習 |
| 2 | Security HubはASFF形式でFindingを統合 | 集約ハブ |
| 3 | DetectiveはGuardDutyから根本原因調査（90日保持） | グラフモデル |
| 4 | CloudTrailデータイベント/Insightsはデフォルト無効 | 追加設定 |
| 5 | CloudTrailのS3バケットにMFA Delete推奨 | 改ざん防止 |
| 6 | Config Conformance PackでPCI DSS等を一括適用 | 準拠管理 |
| 7 | EventBridge→LambdaでGuardDuty高深刻度を自動修復 | 自動対応 |
| 8 | Trusted Advisor Business以上でセキュリティ全チェック | プラン差 |
| 9 | Audit ManagerはPCI DSS等の証拠収集を自動化 | 監査証拠 |
| 10 | Security Hub Organizations統合で全アカウント集約 | 一元管理 |


---

<!-- _class: lead -->
# Section 5: 脆弱性管理・コンプライアンス

- Inspector v2 / Patch Manager / Well-Architected
- スライド 58–64


---

# Amazon Inspector v2

| 機能 | Inspector v1 | Inspector v2 |
| --- | --- | --- |
| スキャン方式 | エージェント（手動） | 継続的自動スキャン |
| 対象 | EC2のみ | EC2 / Lambda / ECRイメージ |
| CISベンチマーク | ○ | × |
| Organizations統合 | なし | あり（委任管理者） |
| Security Hub連携 | なし | あり（Finding自動送信） |
| スコアリング | CVSS | CVSS + Reachability Context |
- **Reachability Context**: ネットワーク到達可能性・悪用可能性でCVSSに重み付け
- **試験ポイント**: Inspector v2はCISベンチマーク評価機能なし（v1のみ）


---

# SSM Patch Manager

> *Patch ManagerのPatch Baseline+Patch Group+Maintenance Windowの3コンポーネントが自動パッチ適用の仕組み*

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
- **主要コンポーネント:**
- - Patch Baseline: 承認パッチの定義（重要度・承認遅延日数）
- - Patch Group: タグ（`Patch Group`）でインスタンスをグルーピング
- - Maintenance Window: スケジュール定義（cron/rate）
| OS | デフォルト自動承認条件 |
| --- | --- |
| Windows | Critical + Important → 7日後自動承認 |
| Amazon Linux 2 | Security + Bugfix → 7日後自動承認 |
| Ubuntu Server | Security → 7日後自動承認 |
- **コンプライアンスレポート**: Config + SSM Inventoryで準拠状況を可視化
- **試験ポイント**: Amazon Linux 2にはSSM Agentがプリインストール済み


---

# AWS Organizations + Compliance管理

> *CloudTrail組織証跡+GuardDuty Organization+Config Aggregatorの3機能でOrganizations全アカウントを一元保護する*

- **推奨アカウント構成（AWS Control Tower準拠）:**
| アカウント | 役割 |
| --- | --- |
| Management | OU管理・SCP設定のみ |
| Security Tooling | Security Hub / GuardDuty / Detective 集約 |
| Log Archive | 全ログの長期保存（S3 Object Lock WORM） |
| 各ワークロード | 本番/開発/テスト分離 |
- **組織レベルの自動設定:**
- - CloudTrail組織証跡: 全アカウントのAPIログを一元管理
- - GuardDuty Organization: 新規アカウントも自動保護
- - Config Aggregator: 全アカウントのリソース設定を集中管理


---

# AWS Artifact + Compliance Reports

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
- **AWS Artifact**: AWSのコンプライアンスレポートへのオンデマンド無料アクセス
| レポート種別 | 内容 |
| --- | --- |
| SOC 1/2/3 Type II | 内部統制・セキュリティ保証報告書 |
| PCI DSS AOC | クレジットカード業界準拠証明 |
| ISO 27001/27017/27018 | 情報セキュリティ認証書 |
| FedRAMP | 米国政府クラウドセキュリティ認可 |
| HIPAA BAA | 医療情報保護の業務提携契約 |
- **Agreements機能**: HIPAA BAAをオンラインで締結・組織レベル管理可能
- **試験ポイント**: コンプライアンス証明書の取得 = AWS Artifact


---

# Well-Architected Security Pillar

| 設計原則 | 内容 |
| --- | --- |
| 強固なアイデンティティ基盤 | 最小権限・一時認証・STS |
| トレーサビリティ確保 | CloudTrail / Config / CloudWatch統合 |
| 全レイヤーへのセキュリティ | エッジ〜アプリ〜DBまで多層防御 |
| セキュリティの自動化 | IaC + Config Rules + 自動修復 |
| 転送中・保存中データ保護 | TLS / KMS / ACM |
| 人手によるデータアクセス排除 | 自動化・匿名化・環境分離 |
| インシデントへの備え | IR計画・GameDay・実行基盤 |
- **Well-Architected Tool**: コンソールからセキュリティワークロードを自己評価


---

# 共有責任モデル詳細

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
| レイヤー | AWSの責任 | お客様の責任 |
| --- | --- | --- |
| 物理 | DC・ネットワーク・ハードウェア | — |
| ハイパーバイザー | VM分離 | — |
| OS | マネージドサービスのパッチ | EC2のOS管理 |
| ネットワーク | AWSネットワーク保護 | VPC・SG・NACL設定 |
| アプリ | — | コード・脆弱性管理 |
| データ | — | 暗号化・分類・バックアップ |
| IAM | サービス認証基盤 | ポリシー設計・MFA |
- **サービス種別の違い:**
- - EC2（IaaS）: OS以上はお客様責任
- - RDS（PaaS）: OS/DBパッチはAWS責任・データはお客様


---

# コンプライアンス試験ポイントまとめ

| # | 試験ポイント | キーワード |
| --- | --- | --- |
| 1 | Inspector v2はCISベンチマーク評価なし（v1のみ） | v2の制限 |
| 2 | Inspector v2: CVSS+Reachability Contextでスコアリング | 到達可能性 |
| 3 | Patch Manager: デフォルト7日後に重要パッチ自動承認 | 承認遅延 |
| 4 | Log ArchiveアカウントはS3 Object Lock（WORM）推奨 | 改ざん防止 |
| 5 | AWS ArtifactでSOC/ISO/PCI DSSレポートを無料取得 | 証明書取得 |
| 6 | HIPAA BAA はAWS Artifact Agreementsで締結 | BAA |
| 7 | Well-ArchitectedのSecurityは7つの設計原則 | 設計原則 |
| 8 | Audit ManagerはPCI DSS等の証拠を自動収集 | 証拠自動化 |


---

<!-- _class: lead -->
# Section 6: インシデントレスポンス

- IR フレームワーク / 自動修復 / Forensics
- スライド 66–71


---

# AWS IRフレームワーク

- <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">インシデントレスポンス フロー</text><rect x="30" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="95" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">検知</text><text x="95" y="100" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><text x="95" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="95" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Security Hub</text><line x1="160" y1="120" x2="158" y2="120" stroke="#c0392b" stroke-width="2"/><polygon points="170,120 158,126 158,114" fill="#c0392b"/><rect x="170" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="235" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">分析</text><text x="235" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Detective</text><text x="235" y="118" fill="#cccccc" font-size="11" text-anchor="middle">CloudWatch</text><text x="235" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Logs Insights</text><line x1="300" y1="120" x2="298" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="310,120 298,126 298,114" fill="#f39c12"/><rect x="310" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="375" y="80" fill="#f39c12" font-size="14" text-anchor="middle" font-weight="bold">封じ込め</text><text x="375" y="100" fill="#cccccc" font-size="11" text-anchor="middle">SG変更</text><text x="375" y="118" fill="#cccccc" font-size="11" text-anchor="middle">IAM無効化</text><text x="375" y="136" fill="#cccccc" font-size="11" text-anchor="middle">Snapshot取得</text><line x1="440" y1="120" x2="438" y2="120" stroke="#f39c12" stroke-width="2"/><polygon points="450,120 438,126 438,114" fill="#f39c12"/><rect x="450" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="515" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">根絶</text><text x="515" y="100" fill="#cccccc" font-size="11" text-anchor="middle">パッチ適用</text><text x="515" y="118" fill="#cccccc" font-size="11" text-anchor="middle">不正リソース削除</text><text x="515" y="136" fill="#cccccc" font-size="11" text-anchor="middle">KMS再発行</text><line x1="580" y1="120" x2="578" y2="120" stroke="#27ae60" stroke-width="2"/><polygon points="590,120 578,126 578,114" fill="#27ae60"/><rect x="590" y="55" width="130" height="130" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="655" y="80" fill="#2980b9" font-size="14" text-anchor="middle" font-weight="bold">復旧</text><text x="655" y="100" fill="#cccccc" font-size="11" text-anchor="middle">RTO/RPO達成</text><text x="655" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Backup復元</text><text x="655" y="136" fill="#cccccc" font-size="11" text-anchor="middle">再デプロイ</text><line x1="720" y1="120" x2="692" y2="120" stroke="#2980b9" stroke-width="2"/><polygon points="680,120 692,114 692,126" fill="#2980b9"/><rect x="680" y="55" width="110" height="130" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="735" y="80" fill="#8e44ad" font-size="14" text-anchor="middle" font-weight="bold">事後分析</text><text x="735" y="100" fill="#cccccc" font-size="11" text-anchor="middle">Post-mortem</text><text x="735" y="118" fill="#cccccc" font-size="11" text-anchor="middle">Playbook更新</text><rect x="40" y="210" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="232" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">MTTR 削減目標</text><text x="400" y="252" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge + Lambda で自動修復 → MTTR を手動対応の 1/10 に削減</text><text x="40" y="290" fill="#cccccc" font-size="11">検知〜通知: &lt;5分</text><text x="200" y="290" fill="#cccccc" font-size="11">初動対応: &lt;30分</text><text x="380" y="290" fill="#cccccc" font-size="11">封じ込め: &lt;2時間</text><text x="560" y="290" fill="#cccccc" font-size="11">復旧: RTO以内</text></svg>
| フェーズ | 主要AWSサービス |
| --- | --- |
| 準備 | IR Runbook・IAM Break-Glass Role・GameDay訓練 |
| 検知・分析 | GuardDuty / Security Hub / CloudTrail / Detective |
| 封じ込め | SG変更・IAMポリシーDeny追加・EC2隔離 |
| 根絶 | マルウェア除去・脆弱性修正・パスワードリセット |
| 復旧 | AMIからの再デプロイ・RDSリストア・バックアップ復元 |
| 事後活動 | ポストモーテム・CloudTrail分析・Detective調査 |
- **試験ポイント:**
- - EC2フォレンジック: SSM Session Managerで操作（キーペア不要）
- - IAMキー侵害: 即時無効化→CloudTrailで影響確認→全パスワードリセット


---

# 自動修復（Lambda / SSM Automation）

- **EC2侵害時の自動隔離パターン:**


---

# 自動修復（Lambda / SSM Automation）（コード例）

```python
def isolate_ec2_handler(event, context):
    ec2 = boto3.client('ec2')
    # GuardDuty FindingからインスタンスIDを取得
    instance_id = (
        event['detail']['resource']
            ['instanceDetails']['instanceId']
    )
    # 1. 隔離SG（全通信拒否）に切り替え
    ec2.modify_instance_attribute(
        InstanceId=instance_id,
        Groups=['sg-quarantine-00000000']
    )
    # 2. EBSスナップショット（証拠保全）
    ec2.create_snapshot(
        VolumeId=get_volume_id(instance_id),
        Description=f'Forensic-{instance_id}'
    )
```


---

# Forensics on AWS（1/2）

> *証拠保全→隔離環境→ディスク解析→メモリ解析の4ステップがAWS上のデジタルフォレンジックス基本手順*

- <svg viewBox="0 0 800 365" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="365" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">暗号化 — 保存時 vs 転送時</text><rect x="30" y="50" width="360" height="280" rx="8" fill="#1a2a3a" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">保存時暗号化 (at rest)</text><rect x="50" y="92" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="112" fill="#ffffff" font-size="12">SSE-S3: S3マネージドキー</text><rect x="50" y="130" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="150" fill="#ffffff" font-size="12">SSE-KMS: CMK使用・監査可</text><rect x="50" y="168" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="188" fill="#ffffff" font-size="12">SSE-C: お客様提供キー</text><rect x="50" y="206" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="226" fill="#ffffff" font-size="12">RDS: TDE / AES-256</text><rect x="50" y="244" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="264" fill="#ffffff" font-size="12">EBS: KMS統合暗号化</text><rect x="50" y="282" width="320" height="30" rx="4" fill="#2980b9" opacity="0.3"/><text x="60" y="302" fill="#ffffff" font-size="12">DynamoDB: AWS所有キー</text><rect x="410" y="50" width="360" height="280" rx="8" fill="#1a2a1a" stroke="#27ae60" stroke-width="2"/><text x="590" y="78" fill="#27ae60" font-size="15" text-anchor="middle" font-weight="bold">転送時暗号化 (in transit)</text><rect x="430" y="92" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="112" fill="#ffffff" font-size="12">TLS 1.2/1.3: ALB・CloudFront</text><rect x="430" y="130" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="150" fill="#ffffff" font-size="12">ACM: SSL/TLS証明書管理</text><rect x="430" y="168" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="188" fill="#ffffff" font-size="12">VPN: IPSec/Site-to-Site</text><rect x="430" y="206" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="226" fill="#ffffff" font-size="12">Direct Connect + MACsec</text><rect x="430" y="244" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="264" fill="#ffffff" font-size="12">S3 HTTPS強制バケットポリシー</text><rect x="430" y="282" width="320" height="30" rx="4" fill="#27ae60" opacity="0.3"/><text x="440" y="302" fill="#ffffff" font-size="12">API Gateway: TLSエンドポイント</text><text x="400" y="352" fill="#f9a825" font-size="12" text-anchor="middle">Envelope暗号化: DEK(データ暗号化キー) + CMK(マスターキー)</text></svg>
- **デジタルフォレンジックス手順:**
- 1. **証拠保全**: EBSスナップショット取得（変更前に即時実行）
- 2. **隔離環境**: フォレンジックVPCにスナップショットをコピー
- 3. **ディスク解析**: フォレンジックEC2にEBSアタッチして解析
- 4. **メモリ解析**: SSM Run Commandでメモリダンプ取得


---

# Forensics on AWS（2/2）

> *SSM Session Managerでキーペア/踏み台不要のEC2アクセスとセッションログ自動保存がフォレンジックスの強み*

- 5. **ログ収集**: CloudTrail / VPC Flow Logs をS3に集約
- 6. **タイムライン再構築**: Amazon Detectiveでグラフ分析
- **SSM Session Managerのメリット:**
- - キーペア/踏み台不要でEC2アクセス
- - セッションログをS3/CloudWatch Logsに自動保存


---

# Backup & Recovery戦略

- <svg viewBox="0 0 800 415" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="415" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS セキュリティサービス全体マップ</text><rect x="20" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="110" y="72" fill="#2980b9" font-size="11" text-anchor="middle" font-weight="bold">ID・アクセス管理</text><rect x="28" y="82" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="99" fill="#ffffff" font-size="11" text-anchor="middle">IAM</text><rect x="28" y="112" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Identity Center</text><rect x="28" y="142" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Cognito</text><rect x="28" y="172" width="164" height="24" rx="3" fill="#2980b9" opacity="0.2"/><text x="110" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Organizations</text><rect x="215" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="305" y="72" fill="#8e44ad" font-size="11" text-anchor="middle" font-weight="bold">データ保護</text><rect x="223" y="82" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="99" fill="#ffffff" font-size="11" text-anchor="middle">KMS</text><rect x="223" y="112" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="129" fill="#ffffff" font-size="11" text-anchor="middle">CloudHSM</text><rect x="223" y="142" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="159" fill="#ffffff" font-size="11" text-anchor="middle">ACM</text><rect x="223" y="172" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="223" y="202" width="164" height="24" rx="3" fill="#8e44ad" opacity="0.2"/><text x="305" y="219" fill="#ffffff" font-size="11" text-anchor="middle">Secrets Mgr</text><rect x="410" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="500" y="72" fill="#27ae60" font-size="11" text-anchor="middle" font-weight="bold">ネットワーク保護</text><rect x="418" y="82" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="99" fill="#ffffff" font-size="11" text-anchor="middle">WAF</text><rect x="418" y="112" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Shield</text><rect x="418" y="142" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Network FW</text><rect x="418" y="172" width="164" height="24" rx="3" fill="#27ae60" opacity="0.2"/><text x="500" y="189" fill="#ffffff" font-size="11" text-anchor="middle">VPC Endpoint</text><rect x="605" y="50" width="180" height="165" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="695" y="72" fill="#f39c12" font-size="11" text-anchor="middle" font-weight="bold">脅威検知</text><rect x="613" y="82" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="99" fill="#ffffff" font-size="11" text-anchor="middle">GuardDuty</text><rect x="613" y="112" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="129" fill="#ffffff" font-size="11" text-anchor="middle">Security Hub</text><rect x="613" y="142" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="159" fill="#ffffff" font-size="11" text-anchor="middle">Detective</text><rect x="613" y="172" width="164" height="24" rx="3" fill="#f39c12" opacity="0.2"/><text x="695" y="189" fill="#ffffff" font-size="11" text-anchor="middle">Macie</text><rect x="20" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="252" fill="#e91e63" font-size="11" text-anchor="middle" font-weight="bold">インフラ保護</text><rect x="28" y="262" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Inspector v2</text><rect x="28" y="292" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="309" fill="#ffffff" font-size="11" text-anchor="middle">SSM</text><rect x="28" y="322" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Config</text><rect x="28" y="352" width="164" height="24" rx="3" fill="#e91e63" opacity="0.2"/><text x="110" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Patch Mgr</text><rect x="215" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="305" y="252" fill="#16a085" font-size="11" text-anchor="middle" font-weight="bold">ログ・監視</text><rect x="223" y="262" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="279" fill="#ffffff" font-size="11" text-anchor="middle">CloudTrail</text><rect x="223" y="292" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="309" fill="#ffffff" font-size="11" text-anchor="middle">CloudWatch</text><rect x="223" y="322" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Logs Insights</text><rect x="223" y="352" width="164" height="24" rx="3" fill="#16a085" opacity="0.2"/><text x="305" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Audit Mgr</text><rect x="410" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#c0392b" stroke-width="2"/><text x="500" y="252" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">コンプライアンス</text><rect x="418" y="262" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="279" fill="#ffffff" font-size="11" text-anchor="middle">Artifact</text><rect x="418" y="292" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Config Rules</text><rect x="418" y="322" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Well-Arch.</text><rect x="418" y="352" width="164" height="24" rx="3" fill="#c0392b" opacity="0.2"/><text x="500" y="369" fill="#ffffff" font-size="11" text-anchor="middle">Trusted Adv.</text><rect x="605" y="230" width="180" height="165" rx="6" fill="#16213e" stroke="#d35400" stroke-width="2"/><text x="695" y="252" fill="#d35400" font-size="11" text-anchor="middle" font-weight="bold">IR・自動化</text><rect x="613" y="262" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="279" fill="#ffffff" font-size="11" text-anchor="middle">EventBridge</text><rect x="613" y="292" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="309" fill="#ffffff" font-size="11" text-anchor="middle">Lambda</text><rect x="613" y="322" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="339" fill="#ffffff" font-size="11" text-anchor="middle">Step Functions</text><rect x="613" y="352" width="164" height="24" rx="3" fill="#d35400" opacity="0.2"/><text x="695" y="369" fill="#ffffff" font-size="11" text-anchor="middle">SSM Automation</text></svg>
| 対象 | バックアップ手段 | RPO目標 |
| --- | --- | --- |
| EC2 / EBS | AWS Backup / EBSスナップショット | 24時間 |
| RDS / Aurora | 自動バックアップ（1〜35日）+ PITR | 5分〜 |
| S3 | Versioning / Replication / Object Lock | 0（バージョン保持） |
| DynamoDB | オンデマンドバックアップ / PITR（35日） | 秒単位 |
| EFS | AWS Backup / EFSレプリケーション | 1時間〜 |
- **AWS Backup Vault Lock（WORM）:**
- - バックアップの削除・変更を防止
- - クロスアカウントバックアップ: Log Archiveアカウントへコピーで改ざん防止


---

# Post-Incident Analysis

> *Blameless postmortem・5 Whys・CloudTrail+Detectiveのタイムライン再構築がポストインシデント分析の3本柱*

- **ポストモーテムのベストプラクティス:**
- - Blameless（非難しない）: 個人でなくプロセス・システムを改善
- - 5 Whys: 根本原因まで掘り下げる
- - タイムライン再構築: CloudTrail + Detective
| 発見事項 | 改善策 |
| --- | --- |
| 検知が遅れた | GuardDuty感度向上・Security Hubアラート設定 |
| 対応手順が不明 | Runbook更新・GameDayで訓練 |
| 影響範囲が広かった | 最小権限・VPCセグメンテーション強化 |
| 証拠が不足 | CloudTrailデータイベント有効化 |


---

# IR試験ポイントまとめ（1/2）

- <svg viewBox="0 0 800 385" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="385" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">コンプライアンスフレームワーク</text><rect x="50" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="83" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">SOC 2 Type II</text><text x="150" y="110" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ・可用性</text><text x="150" y="130" fill="#cccccc" font-size="11" text-anchor="middle">機密性・処理整合性</text><rect x="270" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="83" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">ISO 27001</text><text x="370" y="110" fill="#cccccc" font-size="11" text-anchor="middle">情報セキュリティ</text><text x="370" y="130" fill="#cccccc" font-size="11" text-anchor="middle">マネジメントシステム</text><rect x="490" y="55" width="200" height="110" rx="6" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="83" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">PCI DSS</text><text x="590" y="110" fill="#cccccc" font-size="11" text-anchor="middle">クレジットカード</text><text x="590" y="130" fill="#cccccc" font-size="11" text-anchor="middle">データ保護基準</text><rect x="50" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="213" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">GDPR/個人情報保護</text><text x="150" y="240" fill="#cccccc" font-size="11" text-anchor="middle">EU個人データ保護</text><text x="150" y="260" fill="#cccccc" font-size="11" text-anchor="middle">データ主体の権利</text><rect x="270" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="213" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">HIPAA</text><text x="370" y="240" fill="#cccccc" font-size="11" text-anchor="middle">医療情報保護</text><text x="370" y="260" fill="#cccccc" font-size="11" text-anchor="middle">米国法律要件</text><rect x="490" y="185" width="200" height="110" rx="6" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="213" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">FedRAMP</text><text x="590" y="240" fill="#cccccc" font-size="11" text-anchor="middle">米国政府クラウド</text><text x="590" y="260" fill="#cccccc" font-size="11" text-anchor="middle">セキュリティ認可</text><rect x="40" y="320" width="720" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="342" fill="#f9a825" font-size="13" text-anchor="middle" font-weight="bold">AWS Artifact でコンプライアンスレポートを取得</text><text x="400" y="360" fill="#cccccc" font-size="11" text-anchor="middle">AWS は 100+ コンプライアンスプログラムに対応 — お客様はビジネス要件に応じて活用</text></svg>
- **インシデントレスポンスの重要ポイント:**
- - **封じ込め最優先**: SGを隔離SG（全通信拒否）に変更して即時隔離
- - **証拠保全**: EBSスナップショットをフォレンジック前に取得


---

# IR試験ポイントまとめ（2/2）

> *IAMキー即時無効化→CloudTrail影響確認→パスワードリセットのフローとSSM Session Manager・90日データ保持を確認*

- - **IAMキー侵害**: 即時無効化→CloudTrailで影響確認→全パスワードリセット
- - **SSM Session Manager**: キーペア不要でEC2操作・セッションログ保存
- - **Detective**: GuardDuty Findingから直接調査（90日間データ保持）
- - **GameDay**: 定期訓練でRunbookと対応能力を検証


---

<!-- _class: lead -->
# Section 7: 試験直前まとめ

- 数値リファレンス / キーワード索引 / 総まとめ
- スライド 73–80


---

# 数値リファレンス（試験頻出）

| サービス | 数値 | 内容 |
| --- | --- | --- |
| STS | 最大12時間 | AssumeRoleの一時認証有効期間 |
| IAM | 90日 | アクセスキーローテーション推奨 |
| KMS CMK | $1/月 | キー1つのコスト |
| KMS | 1〜2560日 | CMKローテーション周期 |
| Secrets Manager | $0.40/月 | シークレット1件のコスト |
| Secrets Manager | 30日 | 削除後の復元可能期間 |
| Detective | 90日 | データ保持期間 |
| Config | 7年 | S3での設定履歴保存期間 |
| Shield Advanced | $3,000/月 | 最低コスト（1年コミット） |
| CloudHSM | $1.60/時 | HSMクラスターコスト |
| GuardDuty | 無料30日 | 初回有効化トライアル |
| Inspector v2 | 継続スキャン | エージェントレス自動評価 |


---

# サービス選択フローチャート

- <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ID境界 vs ネットワーク境界</text><rect x="30" y="55" width="350" height="270" rx="8" fill="#1a2a1a" stroke="#c0392b" stroke-width="2"/><text x="205" y="80" fill="#c0392b" font-size="14" text-anchor="middle" font-weight="bold">従来型: ネットワーク境界</text><rect x="55" y="90" width="300" height="180" rx="40" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1" stroke-dasharray="6,3"/><text x="205" y="135" fill="#c0392b" font-size="12" text-anchor="middle">城壁モデル</text><text x="205" y="155" fill="#cccccc" font-size="11" text-anchor="middle">VPN / ファイアウォール</text><text x="205" y="175" fill="#cccccc" font-size="11" text-anchor="middle">内部は信頼</text><text x="205" y="195" fill="#cccccc" font-size="11" text-anchor="middle">外部は非信頼</text><text x="205" y="280" fill="#e91e63" font-size="11" text-anchor="middle">✗ VPN突破で内部漏洩</text><text x="205" y="298" fill="#e91e63" font-size="11" text-anchor="middle">✗ ラテラルムーブメント</text><text x="205" y="316" fill="#e91e63" font-size="11" text-anchor="middle">✗ 内部不正に無防備</text><rect x="420" y="55" width="350" height="270" rx="8" fill="#1a2a3a" stroke="#27ae60" stroke-width="2"/><text x="595" y="80" fill="#27ae60" font-size="14" text-anchor="middle" font-weight="bold">現代型: ID境界</text><circle cx="595" cy="175" r="80" fill="none" stroke="#2980b9" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="60" fill="none" stroke="#27ae60" stroke-width="2" opacity="0.6"/><circle cx="595" cy="175" r="40" fill="none" stroke="#f9a825" stroke-width="2" opacity="0.6"/><text x="595" y="180" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">ID</text><text x="595" y="265" fill="#cccccc" font-size="10" text-anchor="middle">IAM PoLP</text><text x="595" y="280" fill="#cccccc" font-size="10" text-anchor="middle">Zero Trust</text><text x="595" y="302" fill="#27ae60" font-size="11" text-anchor="middle">✓ 場所に依存しない認証</text><text x="595" y="320" fill="#27ae60" font-size="11" text-anchor="middle">✓ 最小権限で自動制限</text><text x="595" y="338" fill="#27ae60" font-size="11" text-anchor="middle">✓ 全アクセスを記録</text></svg>
| 要件 | 選択サービス |
| --- | --- |
| パスワードの自動ローテーション | Secrets Manager |
| アプリ設定値（ローテーション不要） | Parameter Store |
| S3のPII（個人情報）を検出 | Amazon Macie |
| EC2/Lambda/ECRの脆弱性スキャン | Inspector v2 |
| 全アカウントのFindingを集約 | Security Hub |
| GuardDuty Findingの根本原因調査 | Amazon Detective |
| WAFルールを組織全体に適用 | Firewall Manager |
| FIPS 140-2 Level 3 HSM | CloudHSM |
| 監査証拠の自動収集・レポート | Audit Manager |
| コンプライアンス証明書の取得 | AWS Artifact |
| DNSクエリでマルウェア通信をブロック | DNS Firewall |
| DDoS L7保護 + コスト補填 | Shield Advanced |


---

# キーワード索引 A–K

| キーワード | サービス/概念 |
| --- | --- |
| ABAC | IAMタグベースアクセス制御 |
| ACM | SSL/TLS証明書管理（無料） |
| ASFF | Security Hub Finding標準形式 |
| Audit Manager | コンプライアンス証拠自動収集 |
| BAA | HIPAA業務提携契約（AWS Artifact） |
| CloudHSM | FIPS 140-2 Level 3 HSM |
| Conformance Pack | Config複数ルール一括デプロイ |
| DRT | Shield Advanced専任対応チーム |
| DEK | データ暗号化キー（Envelope暗号化） |
| Detective | 根本原因調査（グラフモデル・90日保持） |
| DNS Firewall | VPC内DNSクエリフィルタ |
| ExternalId | Confused Deputy攻撃防止 |
| FSBP | AWS基本セキュリティベストプラクティス |
| GuardDuty | ML脅威検知（検知のみ・ブロックなし） |
| Inspector v2 | 継続的脆弱性スキャン（CISベンチマークなし） |
| KMS CMK | お客様管理の暗号化マスターキー |


---

# キーワード索引 L–Z

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">AWS 共有責任モデル</text><rect x="40" y="50" width="340" height="310" rx="8" fill="#1a3a5c" stroke="#2980b9" stroke-width="2"/><text x="210" y="78" fill="#2980b9" font-size="15" text-anchor="middle" font-weight="bold">AWS 責任範囲</text><rect x="60" y="90" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="123" fill="#ffffff" font-size="13" text-anchor="middle">物理インフラ</text><rect x="60" y="170" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="203" fill="#ffffff" font-size="13" text-anchor="middle">ハイパーバイザー</text><rect x="60" y="250" width="300" height="56" rx="6" fill="#2980b9" opacity="0.7"/><text x="210" y="283" fill="#ffffff" font-size="13" text-anchor="middle">マネージドサービス基盤</text><rect x="420" y="50" width="340" height="310" rx="8" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="590" y="78" fill="#e91e63" font-size="15" text-anchor="middle" font-weight="bold">お客様 責任範囲</text><rect x="440" y="90" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="123" fill="#ffffff" font-size="13" text-anchor="middle">OS・ミドルウェア</text><rect x="440" y="170" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="203" fill="#ffffff" font-size="13" text-anchor="middle">アプリケーション</text><rect x="440" y="250" width="300" height="56" rx="6" fill="#e91e63" opacity="0.7"/><text x="590" y="283" fill="#ffffff" font-size="13" text-anchor="middle">データ・IAM設定</text><line x1="400" y1="50" x2="400" y2="360" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="400" y="378" fill="#f9a825" font-size="12" text-anchor="middle">責任の境界線</text></svg>
| キーワード | サービス/概念 |
| --- | --- |
| Macie | S3のPII機械学習検出 |
| MFA Delete | S3バージョン削除に追加認証必要 |
| NACL | サブネットレベルのステートレスFW |
| Network Firewall | VPC L3-L7 Suricataベースフィルタ |
| NotAction | 列挙外すべてにマッチするポリシー要素 |
| OAC | CloudFront Origin Access Control |
| Permission Boundary | IAM最大権限の上限（Allowのみ） |
| PrivateLink | NLBベースのサービス公開 |
| Reachability Context | Inspector v2のCVSS重み付け |
| SCP | Organizations全体ガードレール（管理アカウント除外） |
| Security Hub | Finding集約・スコア・自動修復ルール |
| SSE-KMS | S3のKMS暗号化（CloudTrailに復号ログ記録） |
| STS | 一時認証情報発行（AssumeRole・最大12時間） |
| Trusted Advisor | ベストプラクティスチェック（Business以上で全件） |
| WAF | L7ウェブアプリFW（ALB/CF/APIGW） |
| Zone of Trust | Access Analyzerの信頼ゾーン境界 |


---

# よくある引っかけ問題

| 引っかけパターン | 正解 |
| --- | --- |
| 「SCPはすべてのアカウントに適用される」 | × 管理アカウントには適用されない |
| 「Permission BoundaryはDeny設定できる」 | × Allowのみ（Deny不要） |
| 「KMSキーは1リージョンのみ」 | △ マルチリージョンキー（mrk-）あり |
| 「CloudTrailはデフォルトでS3に保存」 | × デフォルトは90日間のコンソール表示のみ |
| 「Inspector v2はCISベンチマーク評価可」 | × v1のみ（v2では廃止） |
| 「ACM証明書はEC2に直接インストール可」 | × エクスポート不可 |
| 「Shield StandardはL7保護あり」 | × AdvancedのみL7+DRT+コスト補填 |
| 「GuardDutyは自動でトラフィックをブロック」 | × 検知のみ（WAF/SG等で別途対応） |
| 「Gateway EndpointにSGを設定できる」 | × Interface Endpointのみ |
| 「Detectiveはリアルタイム検知サービス」 | × 調査専用ツール |


---

# 試験ポイント総まとめ①

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">セキュリティ多層防御モデル</text><rect x="40" y="70" width="720" height="52" rx="6" fill="#c0392b" opacity="0.75"/><text x="400" y="92" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">データ層</text><text x="400" y="110" fill="#ffffff" font-size="11" text-anchor="middle">KMS・Macie・RDS暗号化</text><rect x="90" y="130" width="620" height="52" rx="6" fill="#e91e63" opacity="0.75"/><text x="400" y="152" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">アプリ層</text><text x="400" y="170" fill="#ffffff" font-size="11" text-anchor="middle">WAF・Cognito・Secrets Manager</text><rect x="140" y="190" width="520" height="52" rx="6" fill="#f39c12" opacity="0.75"/><text x="400" y="212" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">コンピュート層</text><text x="400" y="230" fill="#ffffff" font-size="11" text-anchor="middle">Inspector・SSM・IAM Role</text><rect x="190" y="250" width="420" height="52" rx="6" fill="#27ae60" opacity="0.75"/><text x="400" y="272" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">ネットワーク層</text><text x="400" y="290" fill="#ffffff" font-size="11" text-anchor="middle">SG・NACL・VPC・Shield</text><rect x="240" y="310" width="320" height="52" rx="6" fill="#2980b9" opacity="0.75"/><text x="400" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-weight="bold">境界防御</text><text x="400" y="350" fill="#ffffff" font-size="11" text-anchor="middle">CloudFront・R53・Global Accel.</text><text x="400" y="382" fill="#cccccc" font-size="11" text-anchor="middle">Defense in Depth — 各層で独立したセキュリティコントロール</text></svg>
| # | セクション | 最重要ポイント |
| --- | --- | --- |
| 1 | IAM | 評価順: 明示Deny→SCP→RBP→Boundary→Session→Identity |
| 2 | IAM | SCP管理アカウント不適用・Permission BoundaryはAllow上限 |
| 3 | IAM | ExternalIdでConfused Deputy攻撃を防ぐ |
| 4 | KMS | Envelope暗号化: CMK→DEK→データの2層構造 |
| 5 | KMS | キーポリシーは必須（IAMポリシー単独では不可） |
| 6 | KMS | マルチリージョンキー（mrk-）でDR対応 |
| 7 | Secrets | 自動ローテーション必須→Secrets Manager |
| 8 | S3 | SSE-KMSはCloudTrailに復号ログが残る |
| 9 | Network | SGはステートフル・NACLはステートレス |
| 10 | WAF | CloudFront用WAFはus-east-1で管理 |


---

# 試験ポイント総まとめ②

| # | セクション | 最重要ポイント |
| --- | --- | --- |
| 11 | Network | Shield AdvancedのみDRT+L7+コスト補填（$3,000/月） |
| 12 | Network | Network FirewallはSuricataルール互換 |
| 13 | GuardDuty | 検知のみ（ブロックはEventBridge→Lambdaで自動化） |
| 14 | Security Hub | ASFF形式でFinding統合・スコア化 |
| 15 | Detective | GuardDutyから直接根本原因調査（90日保持） |
| 16 | CloudTrail | データイベント/Insightsはデフォルト無効 |
| 17 | Inspector | v2はCISベンチマーク評価なし（v1のみ） |
| 18 | Inspector | CVSSスコア+Reachability Contextで優先度付け |
| 19 | Artifact | SOC/ISO/PCI DSSレポートを無料取得 |
| 20 | IR | EC2侵害: SG隔離→EBSスナップショット→フォレンジック |


---

# 直前チェックリスト・クロージング（1/2）

> *IAM評価6ステップ・KMS Envelope暗号化・Secrets Manager vs Parameter Store・GuardDuty/SecurityHub/Detectiveの違いを確認*

- <svg viewBox="0 0 800 375" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="375" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" text-anchor="middle" font-weight="bold">ゼロトラストアーキテクチャ</text><rect x="60" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#2980b9" stroke-width="2"/><text x="150" y="102" fill="#2980b9" font-size="13" text-anchor="middle" font-weight="bold">IDの確認</text><text x="150" y="128" fill="#cccccc" font-size="11" text-anchor="middle">IAM / MFA</text><text x="150" y="148" fill="#cccccc" font-size="11" text-anchor="middle">常に検証</text><rect x="280" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#27ae60" stroke-width="2"/><text x="370" y="102" fill="#27ae60" font-size="13" text-anchor="middle" font-weight="bold">最小権限</text><text x="370" y="128" fill="#cccccc" font-size="11" text-anchor="middle">Least Privilege</text><text x="370" y="148" fill="#cccccc" font-size="11" text-anchor="middle">Permission Boundary</text><rect x="500" y="70" width="180" height="110" rx="8" fill="#16213e" stroke="#f39c12" stroke-width="2"/><text x="590" y="102" fill="#f39c12" font-size="13" text-anchor="middle" font-weight="bold">継続監視</text><text x="590" y="128" fill="#cccccc" font-size="11" text-anchor="middle">CloudTrail</text><text x="590" y="148" fill="#cccccc" font-size="11" text-anchor="middle">GuardDuty</text><rect x="60" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="242" fill="#e91e63" font-size="13" text-anchor="middle" font-weight="bold">マイクロセグメント</text><text x="150" y="268" fill="#cccccc" font-size="11" text-anchor="middle">SG / NACL</text><text x="150" y="288" fill="#cccccc" font-size="11" text-anchor="middle">PrivateLink</text><rect x="280" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#8e44ad" stroke-width="2"/><text x="370" y="242" fill="#8e44ad" font-size="13" text-anchor="middle" font-weight="bold">データ保護</text><text x="370" y="268" fill="#cccccc" font-size="11" text-anchor="middle">KMS暗号化</text><text x="370" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Macie検知</text><rect x="500" y="210" width="180" height="110" rx="8" fill="#16213e" stroke="#16a085" stroke-width="2"/><text x="590" y="242" fill="#16a085" font-size="13" text-anchor="middle" font-weight="bold">自動応答</text><text x="590" y="268" fill="#cccccc" font-size="11" text-anchor="middle">EventBridge</text><text x="590" y="288" fill="#cccccc" font-size="11" text-anchor="middle">Lambda修復</text><rect x="690" y="130" width="90" height="90" rx="45" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="735" y="166" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Never</text><text x="735" y="182" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Trust</text><text x="735" y="198" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Always</text><text x="735" y="214" fill="#f9a825" font-size="11" text-anchor="middle" font-weight="bold">Verify</text><text x="400" y="355" fill="#cccccc" font-size="11" text-anchor="middle">ネットワーク境界ではなくIDとデータを中心にセキュリティを設計</text></svg>
- **試験直前チェックリスト:**
- - [ ] IAMポリシー評価順序（6ステップ）を暗記
- - [ ] KMS Envelope暗号化の2層構造を説明できる
- - [ ] Secrets Manager vs Parameter Storeの選択基準を言える
- - [ ] GuardDuty / Security Hub / Detective の役割の違いを説明できる


---

# 直前チェックリスト・クロージング（2/2）

> *Shield Standard vs Advanced・CloudTrailデフォルト有無・Inspector v1 vs v2・ひっかけ問題10選で直前確認完了*

- - [ ] Shield Standard vs Advanced の違い（コスト・機能・DRT）
- - [ ] CloudTrailのイベント種別（デフォルト有無）を把握
- - [ ] Inspector v1 vs v2 の違い（CISベンチマーク有無）
- - [ ] 引っかけ問題10選を復習
- **本資料カバー範囲**: 全7セクション・80スライド
- Security Specialty 合格を目指して頑張ってください！

