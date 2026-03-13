---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "AWS ANS — VPC Endpoint 深掘り"
footer: "Gateway Endpoint vs Interface Endpoint (PrivateLink)"
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
  
  section {
    font-size: 0.95em;
  }
  section pre code {
    font-size: 0.56em;
    line-height: 1.35;
  }
  section h1 {
    font-size: 1.5em;
  }
  section h2 {
    font-size: 1.25em;
  }
  section table {
    font-size: 0.8em;
  }
  section img {
    display: block;
    margin: 0 auto;
  }
  
---

<!-- _class: lead -->
# AWS VPC Endpoint 深掘り

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="100" font-family="sans-serif" font-size="24" font-weight="bold" fill="#f9a825" text-anchor="middle">VPC Endpoint 2種類の全体像</text>
  <rect x="80" y="130" width="280" height="180" rx="12" fill="#0a3d62" stroke="#00bcd4" stroke-width="2"/>
  <text x="220" y="160" font-family="sans-serif" font-size="16" font-weight="bold" fill="#00bcd4" text-anchor="middle">Gateway Endpoint</text>
  <text x="220" y="185" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">対象: S3 / DynamoDB のみ</text>
  <text x="220" y="205" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">仕組み: ルートテーブル</text>
  <text x="220" y="225" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">ENI: なし</text>
  <text x="220" y="245" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">コスト: 無料</text>
  <text x="220" y="265" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">オンプレ: 非対応</text>
  <text x="220" y="290" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825" text-anchor="middle">VPC内専用・低コスト最適</text>
  <rect x="440" y="130" width="280" height="180" rx="12" fill="#1a3d2e" stroke="#4caf50" stroke-width="2"/>
  <text x="580" y="160" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4caf50" text-anchor="middle">Interface Endpoint</text>
  <text x="580" y="185" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">対象: 100+ AWSサービス</text>
  <text x="580" y="205" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">仕組み: ENI (PrivateLink)</text>
  <text x="580" y="225" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">ENI: あり (SG設定可)</text>
  <text x="580" y="245" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">コスト: 有料 ($0.01/h/AZ)</text>
  <text x="580" y="265" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">オンプレ: 対応</text>
  <text x="580" y="290" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825" text-anchor="middle">多サービス・オンプレ対応</text>
  <text x="400" y="340" font-family="sans-serif" font-size="14" fill="#a0a0a0" text-anchor="middle">AWS バックボーン内でプライベート通信を実現</text>
  <polygon points="375,127 400,110 425,127" fill="#f9a825"/>
  <line x1="400" y1="127" x2="400" y2="310" stroke="#f9a825" stroke-width="1" stroke-dasharray="6,4"/>
</svg>
- Gateway Endpoint vs Interface Endpoint (PrivateLink)
- AWS ANS 受験対策 & 実務設計ガイド
- 対象: AWS ネットワーク専門家・ANS 受験者

<!--
本セッションでは Gateway Endpoint と Interface Endpoint (PrivateLink) の違いを技術仕様・コスト・セキュリティ・アーキテクチャパターンの観点から深掘りします。
-->

---

# アジェンダ

> *Gateway/Interface比較・ANS受験・実務設計の3視点で解説*

- ① VPC Endpoint の基礎と必要性
- ② Gateway Endpoint の仕組みと設計
- ③ Interface Endpoint (PrivateLink) の仕組みと設計
- ④ 両者の比較（技術・コスト・セキュリティ）
- ⑤ 高度なアーキテクチャパターン（TGW / オンプレ）
- ⑥ セキュリティ設計のベストプラクティス
- ⑦ トラブルシューティング & ANS 試験対策

<!--
7 つのセクションで構成。前半は各エンドポイントの仕組みを詳解し、後半は実務・試験に直結する内容を扱います。
-->

---

# VPC Endpoint とは何か？

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <!-- AWS Cloud border -->
  <rect x="8" y="8" width="784" height="384" rx="12" fill="none" stroke="#ff9900" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="24" y="30" font-family="Arial,sans-serif" font-size="13" fill="#cc7700" font-weight="bold">AWS Cloud</text>
  <!-- VPC border -->
  <rect x="28" y="42" width="450" height="310" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="46" y="64" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC (10.0.0.0/16)</text>
  <!-- Private Subnet -->
  <rect x="46" y="76" width="185" height="130" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="60" y="94" font-family="Arial,sans-serif" font-size="10" fill="#555">Private Subnet</text>
  <!-- EC2 box -->
  <rect x="62" y="106" width="150" height="82" rx="6" fill="#ffffff" stroke="#7b5ea7" stroke-width="2" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.12))"/>
  <rect x="62" y="106" width="150" height="26" rx="6" fill="#7b5ea7"/>
  <text x="137" y="124" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">EC2 Instance</text>
  <text x="137" y="155" font-family="Arial,sans-serif" font-size="12" fill="#444" text-anchor="middle">Application</text>
  <text x="137" y="174" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">10.0.1.10</text>
  <!-- VPC Endpoint box -->
  <rect x="300" y="106" width="160" height="82" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="2" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.12))"/>
  <rect x="300" y="106" width="160" height="26" rx="6" fill="#10b981"/>
  <text x="380" y="124" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">VPC Endpoint</text>
  <text x="380" y="155" font-family="Arial,sans-serif" font-size="11" fill="#444" text-anchor="middle">PrivateLink</text>
  <text x="380" y="174" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">Private Channel</text>
  <!-- Arrow EC2 to Endpoint -->
  <line x1="212" y1="147" x2="296" y2="147" stroke="#7b5ea7" stroke-width="2.5"/>
  <polygon points="292,141 304,147 292,153" fill="#7b5ea7"/>
  <!-- AWS Services box -->
  <rect x="560" y="58" width="210" height="276" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.10))"/>
  <text x="665" y="82" font-family="Arial,sans-serif" font-size="13" fill="#cc7700" font-weight="bold" text-anchor="middle">AWS Services</text>
  <!-- S3 -->
  <rect x="576" y="94" width="178" height="58" rx="5" fill="#ff9900" opacity="0.1" stroke="#ff9900" stroke-width="1"/>
  <circle cx="602" cy="123" r="20" fill="#ff9900"/>
  <text x="602" y="128" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">S3</text>
  <text x="640" y="118" font-family="Arial,sans-serif" font-size="13" fill="#333" font-weight="bold">Amazon S3</text>
  <text x="640" y="136" font-family="Arial,sans-serif" font-size="10" fill="#666">Object Storage</text>
  <!-- DynamoDB -->
  <rect x="576" y="163" width="178" height="58" rx="5" fill="#7b5ea7" opacity="0.1" stroke="#7b5ea7" stroke-width="1"/>
  <circle cx="602" cy="192" r="20" fill="#7b5ea7"/>
  <text x="602" y="197" font-family="Arial,sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">DDB</text>
  <text x="640" y="187" font-family="Arial,sans-serif" font-size="13" fill="#333" font-weight="bold">DynamoDB</text>
  <text x="640" y="205" font-family="Arial,sans-serif" font-size="10" fill="#666">NoSQL DB</text>
  <!-- Others -->
  <rect x="576" y="233" width="178" height="80" rx="5" fill="#10b981" opacity="0.1" stroke="#10b981" stroke-width="1"/>
  <text x="665" y="262" font-family="Arial,sans-serif" font-size="12" fill="#059669" text-anchor="middle" font-weight="bold">Interface Endpoint</text>
  <text x="665" y="280" font-family="Arial,sans-serif" font-size="11" fill="#059669" text-anchor="middle">100+ AWS Services</text>
  <text x="665" y="298" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">EC2, SSM, Secrets, ...</text>
  <!-- Arrow Endpoint to Services -->
  <line x1="460" y1="147" x2="556" y2="147" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="552,141 564,147 552,153" fill="#10b981"/>
  <!-- AWS Backbone label -->
  <rect x="462" y="128" width="90" height="38" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="507" y="143" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">AWS Backbone</text>
  <text x="507" y="157" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">Internet 不使用</text>
  <!-- Bottom summary -->
  <rect x="28" y="368" width="450" height="22" rx="4" fill="#7b5ea7" opacity="0.1"/>
  <text x="253" y="383" font-family="Arial,sans-serif" font-size="11" fill="#7b5ea7" text-anchor="middle">インターネットを経由せず、プライベートに AWS サービスへ接続</text>
</svg>

<!--
VPC Endpoint はインターネットを介さずに AWS サービスへプライベート接続する仕組みです。トラフィックは AWS バックボーン内に留まり、パブリック IP は不要です。
-->

---

# なぜ VPC Endpoint が必要か？

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <!-- Title divider -->
  <line x1="400" y1="10" x2="400" y2="390" stroke="#ddd" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- BEFORE (left) -->
  <text x="200" y="30" font-family="Arial,sans-serif" font-size="14" fill="#ef4444" font-weight="bold" text-anchor="middle">Before: インターネット経由</text>
  <!-- VPC left -->
  <rect x="20" y="45" width="170" height="200" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="105" y="64" font-family="Arial,sans-serif" font-size="11" fill="#7b5ea7" font-weight="bold" text-anchor="middle">VPC</text>
  <!-- EC2 left -->
  <rect x="35" y="74" width="140" height="50" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="105" y="103" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">EC2</text>
  <!-- NAT GW left -->
  <rect x="35" y="150" width="140" height="50" rx="5" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="105" y="170" font-family="Arial,sans-serif" font-size="10" fill="#666" text-anchor="middle">NAT Gateway</text>
  <text x="105" y="185" font-family="Arial,sans-serif" font-size="10" fill="#f59e0b" text-anchor="middle">$0.045/hr + data</text>
  <!-- Arrow EC2 to NAT -->
  <line x1="105" y1="124" x2="105" y2="148" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="99,144 105,156 111,144" fill="#7b5ea7"/>
  <!-- Internet cloud -->
  <ellipse cx="200" cy="290" rx="60" ry="38" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="200" y="286" font-family="Arial,sans-serif" font-size="12" fill="#ef4444" font-weight="bold" text-anchor="middle">Internet</text>
  <text x="200" y="303" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">Public</text>
  <!-- Arrow NAT to Internet -->
  <line x1="150" y1="200" x2="175" y2="252" stroke="#ef4444" stroke-width="2"/>
  <polygon points="168,250 178,262 182,249" fill="#ef4444"/>
  <!-- IGW left -->
  <rect x="35" y="216" width="140" height="40" rx="5" fill="#fff" stroke="#ef4444" stroke-width="1.5"/>
  <text x="105" y="241" font-family="Arial,sans-serif" font-size="11" fill="#ef4444" text-anchor="middle">Internet GW (IGW)</text>
  <!-- Arrow NAT to IGW -->
  <line x1="105" y1="200" x2="105" y2="214" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="99,210 105,216 111,210" fill="#ef4444"/>
  <!-- S3 left -->
  <rect x="315" y="265" width="70" height="50" rx="5" fill="#ff9900" opacity="0.15" stroke="#ff9900" stroke-width="1.5"/>
  <text x="350" y="295" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">S3</text>
  <!-- Arrow Internet to S3 -->
  <line x1="260" y1="285" x2="313" y2="286" stroke="#ef4444" stroke-width="2"/>
  <polygon points="309,280 321,286 309,292" fill="#ef4444"/>
  <!-- Cost label -->
  <rect x="20" y="345" width="370" height="38" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="205" y="360" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle" font-weight="bold">課題: NAT GW 料金 + インターネット転送料 + セキュリティリスク</text>
  <text x="205" y="376" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">大量データ転送: $0.09/GB (NAT) + パブリック経路のリスク</text>

  <!-- AFTER (right) -->
  <text x="600" y="30" font-family="Arial,sans-serif" font-size="14" fill="#10b981" font-weight="bold" text-anchor="middle">After: VPC Endpoint 経由</text>
  <!-- VPC right -->
  <rect x="415" y="45" width="170" height="200" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <text x="500" y="64" font-family="Arial,sans-serif" font-size="11" fill="#10b981" font-weight="bold" text-anchor="middle">VPC</text>
  <!-- EC2 right -->
  <rect x="430" y="74" width="140" height="50" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="500" y="103" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">EC2</text>
  <!-- VPC Endpoint right -->
  <rect x="430" y="150" width="140" height="50" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <text x="500" y="170" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">VPC Endpoint</text>
  <text x="500" y="186" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">(Gateway / Interface)</text>
  <!-- Arrow EC2 to Endpoint -->
  <line x1="500" y1="124" x2="500" y2="148" stroke="#10b981" stroke-width="2"/>
  <polygon points="494,144 500,156 506,144" fill="#10b981"/>
  <!-- AWS Backbone -->
  <rect x="590" y="100" width="110" height="120" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="645" y="125" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">AWS</text>
  <text x="645" y="140" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Backbone</text>
  <text x="645" y="160" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">Private</text>
  <text x="645" y="175" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">Network</text>
  <!-- Arrow Endpoint to Backbone -->
  <line x1="570" y1="175" x2="588" y2="160" stroke="#10b981" stroke-width="2"/>
  <polygon points="583,155 592,164 598,154" fill="#10b981"/>
  <!-- S3 right -->
  <rect x="700" y="130" width="70" height="50" rx="5" fill="#ff9900" opacity="0.15" stroke="#ff9900" stroke-width="1.5"/>
  <text x="735" y="160" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">S3</text>
  <!-- Arrow Backbone to S3 -->
  <line x1="700" y1="155" x2="702" y2="155" stroke="#10b981" stroke-width="2"/>
  <line x1="700" y1="155" x2="698" y2="155" stroke="#10b981" stroke-width="2"/>
  <!-- No Internet label -->
  <ellipse cx="600" cy="290" rx="60" ry="38" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="600" y="286" font-family="Arial,sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Internet</text>
  <text x="600" y="303" font-family="Arial,sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">不使用</text>
  <line x1="548" y1="253" x2="660" y2="330" stroke="#ef4444" stroke-width="3"/>
  <line x1="660" y1="253" x2="548" y2="330" stroke="#ef4444" stroke-width="3"/>
  <!-- Benefit label -->
  <rect x="415" y="345" width="370" height="38" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="600" y="360" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">メリット: Gateway は無料 / Interface はデータ転送料削減 + セキュリティ向上</text>
  <text x="600" y="376" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">NAT GW 不要 / パブリックアクセス遮断 / VPC Endpoint Policy で制御</text>
</svg>

<!--
Before: IGW + NAT GW 経由でのインターネット経由接続はコスト高・セキュリティリスク有り。After: VPC Endpoint 経由でコスト削減とセキュリティ強化を同時に実現できます。
-->

---

# 2 種類の VPC Endpoint — 全体像

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <line x1="400" y1="10" x2="400" y2="390" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Left: Gateway Endpoint -->
  <rect x="15" y="15" width="370" height="370" rx="10" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="15" y="15" width="370" height="44" rx="10" fill="#7b5ea7"/>
  <text x="200" y="33" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <text x="200" y="50" font-family="Arial,sans-serif" font-size="10" fill="#d4b8ff" text-anchor="middle">ルートテーブル ベース</text>
  <!-- Gateway: Supported services -->
  <text x="35" y="82" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">対応サービス</text>
  <rect x="35" y="88" width="330" height="44" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <circle cx="62" cy="110" r="16" fill="#ff9900"/>
  <text x="62" y="115" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">S3</text>
  <text x="95" y="107" font-family="Arial,sans-serif" font-size="12" fill="#333" font-weight="bold">Amazon S3</text>
  <text x="95" y="122" font-family="Arial,sans-serif" font-size="10" fill="#888">Object Storage</text>
  <circle cx="220" cy="110" r="16" fill="#7b5ea7"/>
  <text x="220" y="115" font-family="Arial,sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">DDB</text>
  <text x="250" y="107" font-family="Arial,sans-serif" font-size="12" fill="#333" font-weight="bold">DynamoDB</text>
  <text x="250" y="122" font-family="Arial,sans-serif" font-size="10" fill="#888">NoSQL Database</text>
  <!-- Gateway mechanics -->
  <text x="35" y="155" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">仕組み</text>
  <rect x="35" y="162" width="330" height="55" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="52" y="182" font-family="Arial,sans-serif" font-size="10" fill="#555">ルートテーブルにプレフィックスリストエントリを追加</text>
  <rect x="52" y="190" width="295" height="20" rx="3" fill="#f5f3ff"/>
  <text x="60" y="204" font-family="monospace,Arial" font-size="10" fill="#7b5ea7">pl-XXXXXXXX (S3)  →  vpce-XXXXXXXX</text>
  <!-- Gateway characteristics -->
  <text x="35" y="237" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">特徴</text>
  <rect x="35" y="243" width="330" height="120" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="52" y="263" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ 無料（追加コストなし）</text>
  <text x="52" y="281" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ 高可用性（AWSが管理）</text>
  <text x="52" y="299" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ セキュリティグループ不要</text>
  <text x="52" y="317" font-family="Arial,sans-serif" font-size="11" fill="#ef4444">✗ オンプレ/TGW 経由アクセス不可</text>
  <text x="52" y="335" font-family="Arial,sans-serif" font-size="11" fill="#ef4444">✗ S3/DynamoDB のみ対応</text>
  <text x="52" y="353" font-family="Arial,sans-serif" font-size="11" fill="#ef4444">✗ ENI なし / プライベート IP なし</text>
  <!-- Right: Interface Endpoint -->
  <rect x="415" y="15" width="370" height="370" rx="10" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <rect x="415" y="15" width="370" height="44" rx="10" fill="#10b981"/>
  <text x="600" y="33" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint (PrivateLink)</text>
  <text x="600" y="50" font-family="Arial,sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">ENI (Elastic Network Interface) ベース</text>
  <!-- Interface: Supported services -->
  <text x="435" y="82" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">対応サービス</text>
  <rect x="435" y="88" width="330" height="44" rx="5" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <text x="452" y="112" font-family="Arial,sans-serif" font-size="11" fill="#333">EC2, SSM, Secrets Manager, KMS,</text>
  <text x="452" y="126" font-family="Arial,sans-serif" font-size="11" fill="#333">STS, CloudWatch, ECR, SQS ... 100+</text>
  <!-- Interface mechanics -->
  <text x="435" y="155" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">仕組み</text>
  <rect x="435" y="162" width="330" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <text x="452" y="182" font-family="Arial,sans-serif" font-size="10" fill="#555">サブネット内に ENI を作成し、プライベート IP を付与</text>
  <rect x="452" y="190" width="295" height="20" rx="3" fill="#f0fdf4"/>
  <text x="460" y="204" font-family="monospace,Arial" font-size="10" fill="#059669">vpce-XXXX.ec2.ap-northeast-1.vpce.amazonaws.com</text>
  <!-- Interface characteristics -->
  <text x="435" y="237" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">特徴</text>
  <rect x="435" y="243" width="330" height="120" rx="5" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <text x="452" y="263" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ 100+ AWS サービス対応</text>
  <text x="452" y="281" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ オンプレ/TGW 経由接続可</text>
  <text x="452" y="299" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ セキュリティグループで制御</text>
  <text x="452" y="317" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ Private DNS 対応</text>
  <text x="452" y="335" font-family="Arial,sans-serif" font-size="11" fill="#ef4444">✗ 有料 ($0.01/hr/AZ + $0.01/GB)</text>
  <text x="452" y="353" font-family="Arial,sans-serif" font-size="11" fill="#ef4444">✗ AZ ごとに ENI が必要</text>
</svg>

<!--
Gateway Endpoint: ルートテーブルベース、S3/DDB のみ、無料。Interface Endpoint: ENI ベース、100+ サービス対応、有料。この違いが選定の基本になります。
-->

---

# Gateway Endpoint — アーキテクチャ

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <!-- AWS Cloud border -->
  <rect x="8" y="8" width="784" height="384" rx="12" fill="none" stroke="#ff9900" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="24" y="28" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold">AWS Cloud / Region</text>
  <!-- VPC border -->
  <rect x="24" y="36" width="520" height="340" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="42" y="58" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC (10.0.0.0/16)</text>
  <!-- Private Subnet AZ-a -->
  <rect x="40" y="68" width="200" height="130" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="55" y="86" font-family="Arial,sans-serif" font-size="10" fill="#555">Private Subnet (AZ-a)</text>
  <!-- EC2 in AZ-a -->
  <rect x="55" y="96" width="165" height="56" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="55" y="96" width="165" height="20" rx="5" fill="#7b5ea7"/>
  <text x="137" y="110" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2 Instance</text>
  <text x="137" y="136" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">10.0.1.10</text>
  <text x="137" y="148" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">outbound S3 request</text>
  <!-- Route Table box -->
  <rect x="40" y="215" width="200" height="100" rx="6" fill="#fff9e6" stroke="#f59e0b" stroke-width="2"/>
  <text x="55" y="233" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold">Route Table</text>
  <text x="55" y="250" font-family="monospace,Arial" font-size="9" fill="#555">10.0.0.0/16  local</text>
  <rect x="48" y="255" width="185" height="18" rx="2" fill="#fef9c3"/>
  <text x="55" y="268" font-family="monospace,Arial" font-size="9" fill="#7b5ea7" font-weight="bold">pl-XXXXXXXX  vpce-0abc</text>
  <text x="55" y="285" font-family="monospace,Arial" font-size="9" fill="#555">0.0.0.0/0   igw-XXXX</text>
  <text x="55" y="302" font-family="Arial,sans-serif" font-size="8" fill="#888">※ Prefix Listで動的に管理される</text>
  <!-- Arrow EC2 to Route Table -->
  <line x1="140" y1="152" x2="140" y2="213" stroke="#7b5ea7" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="134,209 140,221 146,209" fill="#7b5ea7"/>
  <!-- Gateway Endpoint box (center) -->
  <rect x="300" y="140" width="200" height="90" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="2.5" style="filter:drop-shadow(2px 3px 6px rgba(0,0,0,0.15))"/>
  <rect x="300" y="140" width="200" height="28" rx="8" fill="#10b981"/>
  <text x="400" y="159" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <text x="400" y="182" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">vpce-0abc1234def56789</text>
  <text x="400" y="198" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">ENI なし / プライベートIPなし</text>
  <text x="400" y="214" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">ルートテーブルのターゲットとして機能</text>
  <!-- Arrow Route Table to Endpoint -->
  <line x1="240" y1="255" x2="298" y2="192" stroke="#10b981" stroke-width="2"/>
  <polygon points="291,188 302,198 298,185" fill="#10b981"/>
  <!-- AWS Services (right) -->
  <rect x="600" y="80" width="175" height="230" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <text x="687" y="103" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">AWS Services</text>
  <!-- S3 bucket -->
  <rect x="616" y="115" width="143" height="68" rx="5" fill="#fff" stroke="#ff9900" stroke-width="1.5"/>
  <circle cx="642" cy="149" r="20" fill="#ff9900"/>
  <text x="642" y="154" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">S3</text>
  <text x="678" y="143" font-family="Arial,sans-serif" font-size="11" fill="#333" font-weight="bold">Amazon S3</text>
  <text x="678" y="159" font-family="Arial,sans-serif" font-size="9" fill="#666">us-east-1</text>
  <text x="678" y="174" font-family="Arial,sans-serif" font-size="9" fill="#888">Prefix: pl-68a54001</text>
  <!-- DynamoDB -->
  <rect x="616" y="196" width="143" height="68" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <circle cx="642" cy="230" r="20" fill="#7b5ea7"/>
  <text x="642" y="235" font-family="Arial,sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">DDB</text>
  <text x="678" y="224" font-family="Arial,sans-serif" font-size="11" fill="#333" font-weight="bold">DynamoDB</text>
  <text x="678" y="240" font-family="Arial,sans-serif" font-size="9" fill="#666">us-east-1</text>
  <text x="678" y="255" font-family="Arial,sans-serif" font-size="9" fill="#888">Prefix: pl-02cd2c6b</text>
  <!-- Arrow Endpoint to S3 -->
  <line x1="500" y1="175" x2="598" y2="149" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="592,143 604,148 591,155" fill="#10b981"/>
  <!-- Arrow Endpoint to DynamoDB -->
  <line x1="500" y1="185" x2="598" y2="230" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="592,225 604,231 593,238" fill="#10b981"/>
  <!-- Endpoint Policy note -->
  <rect x="280" y="260" width="240" height="30" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="270" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">VPC Endpoint Policy でアクセス制御</text>
  <text x="400" y="283" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">aws:PrincipalAccount, aws:sourceVpc 等の条件が利用可能</text>
  <!-- No ENI note -->
  <rect x="280" y="300" width="240" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="400" y="310" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">Gateway EP は ENI を持たない</text>
  <text x="400" y="323" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">セキュリティグループは設定不可（ルートのみ）</text>
</svg>

<!--
Gateway Endpoint は ENI を持たない仮想ゲートウェイです。ルートテーブルのエントリとして機能し、プレフィックスリスト宛てのトラフィックをエンドポイント経由に誘導します。
-->

---

# Gateway Endpoint — ルートテーブルの仕組み

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <!-- Title -->
  <text x="400" y="28" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Gateway Endpoint — ルートテーブルの仕組み</text>
  <!-- Before section -->
  <rect x="20" y="40" width="360" height="340" rx="8" fill="#fff4f4" stroke="#ef4444" stroke-width="1.5"/>
  <rect x="20" y="40" width="360" height="32" rx="8" fill="#ef4444"/>
  <text x="200" y="62" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Before: Endpoint なし</text>
  <!-- Route table before -->
  <text x="38" y="96" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">Route Table (Private Subnet)</text>
  <rect x="30" y="102" width="340" height="130" rx="4" fill="#fff" stroke="#ccc" stroke-width="1"/>
  <!-- Table header -->
  <rect x="30" y="102" width="340" height="24" fill="#f1f5f9"/>
  <text x="100" y="119" font-family="monospace,Arial" font-size="10" fill="#555" font-weight="bold">Destination</text>
  <line x1="210" y1="102" x2="210" y2="232" stroke="#e5e7eb" stroke-width="1"/>
  <text x="295" y="119" font-family="monospace,Arial" font-size="10" fill="#555" font-weight="bold">Target</text>
  <!-- Row 1: local -->
  <rect x="30" y="126" width="340" height="24" fill="#f8fafc"/>
  <text x="48" y="143" font-family="monospace,Arial" font-size="10" fill="#333">10.0.0.0/16</text>
  <text x="220" y="143" font-family="monospace,Arial" font-size="10" fill="#333">local</text>
  <!-- Row 2: default via IGW -->
  <rect x="30" y="150" width="340" height="24" fill="#fff"/>
  <text x="48" y="167" font-family="monospace,Arial" font-size="10" fill="#333">0.0.0.0/0</text>
  <text x="220" y="167" font-family="monospace,Arial" font-size="10" fill="#333">igw-0abc1234</text>
  <!-- Row 3: empty / no S3 route -->
  <rect x="30" y="174" width="340" height="24" fill="#fee2e2"/>
  <text x="48" y="191" font-family="monospace,Arial" font-size="10" fill="#ef4444">S3 route なし</text>
  <text x="220" y="191" font-family="monospace,Arial" font-size="10" fill="#ef4444">→ IGW 経由でInternet</text>
  <!-- Traffic flow before -->
  <text x="38" y="252" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">トラフィックフロー</text>
  <rect x="38" y="260" width="310" height="105" rx="4" fill="#fff" stroke="#eee" stroke-width="1"/>
  <!-- Flow boxes -->
  <rect x="50" y="272" width="80" height="30" rx="4" fill="#7b5ea7"/>
  <text x="90" y="292" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2</text>
  <line x1="130" y1="287" x2="155" y2="287" stroke="#ef4444" stroke-width="2"/>
  <polygon points="151,281 163,287 151,293" fill="#ef4444"/>
  <rect x="155" y="272" width="60" height="30" rx="4" fill="#f59e0b"/>
  <text x="185" y="292" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">IGW</text>
  <line x1="215" y1="287" x2="238" y2="287" stroke="#ef4444" stroke-width="2"/>
  <polygon points="234,281 246,287 234,293" fill="#ef4444"/>
  <rect x="238" y="272" width="80" height="30" rx="4" fill="#ff9900"/>
  <text x="278" y="292" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">S3 (Public)</text>
  <text x="185" y="325" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">インターネット経由 = 課金 + リスク</text>
  <text x="185" y="345" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">NAT GW コスト + データ転送コスト</text>
  <!-- After section -->
  <rect x="420" y="40" width="360" height="340" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <rect x="420" y="40" width="360" height="32" rx="8" fill="#10b981"/>
  <text x="600" y="62" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">After: Gateway Endpoint 追加後</text>
  <!-- Route table after -->
  <text x="438" y="96" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">Route Table (Private Subnet)</text>
  <rect x="430" y="102" width="340" height="155" rx="4" fill="#fff" stroke="#ccc" stroke-width="1"/>
  <rect x="430" y="102" width="340" height="24" fill="#f1f5f9"/>
  <text x="510" y="119" font-family="monospace,Arial" font-size="10" fill="#555" font-weight="bold">Destination</text>
  <line x1="610" y1="102" x2="610" y2="257" stroke="#e5e7eb" stroke-width="1"/>
  <text x="695" y="119" font-family="monospace,Arial" font-size="10" fill="#555" font-weight="bold">Target</text>
  <rect x="430" y="126" width="340" height="24" fill="#f8fafc"/>
  <text x="448" y="143" font-family="monospace,Arial" font-size="10" fill="#333">10.0.0.0/16</text>
  <text x="620" y="143" font-family="monospace,Arial" font-size="10" fill="#333">local</text>
  <rect x="430" y="150" width="340" height="24" fill="#fff"/>
  <text x="448" y="167" font-family="monospace,Arial" font-size="10" fill="#333">0.0.0.0/0</text>
  <text x="620" y="167" font-family="monospace,Arial" font-size="10" fill="#333">igw-0abc1234</text>
  <!-- S3 route (highlighted) -->
  <rect x="430" y="174" width="340" height="24" fill="#dcfce7"/>
  <text x="448" y="191" font-family="monospace,Arial" font-size="10" fill="#059669" font-weight="bold">pl-68a54001 (S3)</text>
  <text x="620" y="191" font-family="monospace,Arial" font-size="10" fill="#059669" font-weight="bold">vpce-0abc1234</text>
  <!-- DDB route (highlighted) -->
  <rect x="430" y="198" width="340" height="24" fill="#dcfce7"/>
  <text x="448" y="215" font-family="monospace,Arial" font-size="10" fill="#059669" font-weight="bold">pl-02cd2c6b (DDB)</text>
  <text x="620" y="215" font-family="monospace,Arial" font-size="10" fill="#059669" font-weight="bold">vpce-0abc1234</text>
  <text x="600" y="244" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Prefix List は AWS が自動管理（IP 範囲の追跡不要）</text>
  <!-- Traffic flow after -->
  <text x="438" y="275" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">トラフィックフロー</text>
  <rect x="438" y="282" width="320" height="82" rx="4" fill="#fff" stroke="#eee" stroke-width="1"/>
  <rect x="450" y="294" width="80" height="30" rx="4" fill="#7b5ea7"/>
  <text x="490" y="314" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2</text>
  <line x1="530" y1="309" x2="555" y2="309" stroke="#10b981" stroke-width="2"/>
  <polygon points="551,303 563,309 551,315" fill="#10b981"/>
  <rect x="555" y="294" width="80" height="30" rx="4" fill="#10b981"/>
  <text x="595" y="309" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">GW Endpoint</text>
  <line x1="635" y1="309" x2="658" y2="309" stroke="#10b981" stroke-width="2"/>
  <polygon points="654,303 666,309 654,315" fill="#10b981"/>
  <rect x="658" y="294" width="80" height="30" rx="4" fill="#ff9900"/>
  <text x="698" y="309" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">S3 / DDB</text>
  <text x="598" y="352" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">プライベート経路 = 無料 + 安全</text>
</svg>

<!--
エンドポイント作成時にルートテーブルへ Managed Prefix List エントリが自動追加されます。プレフィックスリストは AWS が管理するため IP 範囲の変更を追跡する必要はありません。
-->

---

# Gateway Endpoint — 対応サービス詳細（1/2）

> *S3とDynamoDBのみ対応—ルートテーブルで通信を制御*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="40" font-family="sans-serif" font-size="20" font-weight="bold" fill="#f9a825" text-anchor="middle">Gateway Endpoint 対応サービス</text>
  <rect x="60" y="65" width="320" height="290" rx="12" fill="#0a2744" stroke="#00bcd4" stroke-width="2"/>
  <text x="220" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#00bcd4" text-anchor="middle">Amazon S3</text>
  <rect x="80" y="108" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="220" y="130" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Prefix List: pl-68a54001 (us-east-1)</text>
  <text x="220" y="148" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">リージョン内全バケット</text>
  <rect x="80" y="165" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="220" y="184" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">クロスリージョン: 非対応</text>
  <text x="220" y="202" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">S3 Access Point経由も利用可</text>
  <rect x="80" y="222" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="220" y="241" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">エンドポイントポリシーで制御</text>
  <text x="220" y="259" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Bucket Policy と組み合わせ可</text>
  <rect x="80" y="279" width="280" height="55" rx="8" fill="#1a3d62" stroke="#f9a825" stroke-width="1"/>
  <text x="220" y="300" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">無料 - 大量アクセス時の</text>
  <text x="220" y="318" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">コスト最適化に必須</text>
  <rect x="420" y="65" width="320" height="290" rx="12" fill="#0a3d20" stroke="#4caf50" stroke-width="2"/>
  <text x="580" y="95" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4caf50" text-anchor="middle">Amazon DynamoDB</text>
  <rect x="440" y="108" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="580" y="130" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Prefix List: pl-02cd2c6b (us-east-1)</text>
  <text x="580" y="148" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">リージョン内全テーブル</text>
  <rect x="440" y="165" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="580" y="184" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">DynamoDB Streams も対応</text>
  <text x="580" y="202" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Global Tables: 各リージョンで設定</text>
  <rect x="440" y="222" width="280" height="50" rx="8" fill="#16213e"/>
  <text x="580" y="241" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Accelerator (DAX): 非対応</text>
  <text x="580" y="259" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">DAXはInterface Endpoint使用</text>
  <rect x="440" y="279" width="280" height="55" rx="8" fill="#1a3d20" stroke="#f9a825" stroke-width="1"/>
  <text x="580" y="300" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">無料 - NoSQLアクセスを</text>
  <text x="580" y="318" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">プライベートに最適化</text>
  <text x="400" y="375" font-family="sans-serif" font-size="12" fill="#a0a0a0" text-anchor="middle">この2サービスのみ対応 — それ以外はInterface Endpointを使用</text>
</svg>
- **Amazon S3 (Gateway Endpoint)**
- リージョン内全バケットに接続可能（クロスリージョンは不可）
- Prefix List: `pl-68a54001` (us-east-1) / `pl-61a54008` (us-west-2) 等

<!--
Gateway EP は S3 と DynamoDB の 2 サービスのみ対応。どちらも大量データアクセスが発生しやすいサービスであり、無料の Gateway EP を優先的に使うことでコスト最適化できます。
-->

---

# Gateway Endpoint — 対応サービス詳細（2/2）

> *料金無料・オンプレ非対応—VPC内完結ユースケース向け*

- S3 Access Point 経由でも利用可能
- **Amazon DynamoDB (Gateway Endpoint)**
- リージョン内全テーブルに接続可能
- Prefix List: `pl-02cd2c6b` (us-east-1) 等、リージョンにより異なる

<!--
Gateway EP は S3 と DynamoDB の 2 サービスのみ対応。どちらも大量データアクセスが発生しやすいサービスであり、無料の Gateway EP を優先的に使うことでコスト最適化できます。
-->

---

# Gateway Endpoint — ルートテーブル設定例

- **AWS CLI でエンドポイント作成**


---

# Gateway Endpoint — ルートテーブル設定例（コード例）

```bash
# Gateway Endpoint 作成（S3用）
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-0abc1234 \
  --service-name com.amazonaws.ap-northeast-1.s3 \
  --route-table-ids rtb-0xyz5678 rtb-0abc9012

# ルートテーブル確認（Prefix List エントリが追加されている）
aws ec2 describe-route-tables \
  --route-table-ids rtb-0xyz5678 \
  --query 'RouteTables[].Routes[]'

# Managed Prefix List の確認
aws ec2 describe-managed-prefix-lists \
  --filters 'Name=owner-id,Values=AWS'
```


---

# Gateway Endpoint — アクセス制御（Endpoint Policy）

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Gateway Endpoint — アクセス制御レイヤー</text>
  <!-- EC2 -->
  <rect x="20" y="50" width="110" height="70" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.12))"/>
  <rect x="20" y="50" width="110" height="22" rx="6" fill="#7b5ea7"/>
  <text x="75" y="66" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">EC2</text>
  <text x="75" y="90" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">IAM Role:</text>
  <text x="75" y="103" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle">AppRole</text>
  <!-- Arrow to Layer 1 -->
  <line x1="130" y1="85" x2="165" y2="85" stroke="#555" stroke-width="2"/>
  <polygon points="161,79 173,85 161,91" fill="#555"/>
  <!-- Layer 1: IAM Policy -->
  <rect x="165" y="50" width="140" height="70" rx="6" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
  <rect x="165" y="50" width="140" height="22" rx="6" fill="#f59e0b"/>
  <text x="235" y="66" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">① IAM Policy</text>
  <text x="235" y="86" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">s3:GetObject</text>
  <text x="235" y="100" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">arn:aws:s3:::my-bucket/*</text>
  <text x="235" y="113" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">Principal の権限確認</text>
  <!-- Arrow to Layer 2 -->
  <line x1="305" y1="85" x2="340" y2="85" stroke="#555" stroke-width="2"/>
  <polygon points="336,79 348,85 336,91" fill="#555"/>
  <!-- Layer 2: Endpoint Policy -->
  <rect x="340" y="50" width="145" height="70" rx="6" fill="#fff" stroke="#10b981" stroke-width="2.5"/>
  <rect x="340" y="50" width="145" height="22" rx="6" fill="#10b981"/>
  <text x="412" y="66" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">② Endpoint Policy</text>
  <text x="412" y="86" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">特定バケットのみ許可</text>
  <text x="412" y="100" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">aws:PrincipalAccount</text>
  <text x="412" y="113" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">エンドポイント通過の制御</text>
  <!-- Arrow to Layer 3 -->
  <line x1="485" y1="85" x2="520" y2="85" stroke="#555" stroke-width="2"/>
  <polygon points="516,79 528,85 516,91" fill="#555"/>
  <!-- Layer 3: Bucket Policy -->
  <rect x="520" y="50" width="145" height="70" rx="6" fill="#fff" stroke="#ff9900" stroke-width="2"/>
  <rect x="520" y="50" width="145" height="22" rx="6" fill="#ff9900"/>
  <text x="592" y="66" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">③ S3 Bucket Policy</text>
  <text x="592" y="86" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">aws:sourceVpce 条件</text>
  <text x="592" y="100" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">VPC EP 経由のみ許可</text>
  <text x="592" y="113" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">リソース側の制御</text>
  <!-- Arrow to S3 -->
  <line x1="665" y1="85" x2="700" y2="85" stroke="#555" stroke-width="2"/>
  <polygon points="696,79 708,85 696,91" fill="#555"/>
  <!-- S3 -->
  <circle cx="728" cy="85" r="28" fill="#ff9900"/>
  <text x="728" y="90" font-family="Arial,sans-serif" font-size="14" fill="#fff" font-weight="bold" text-anchor="middle">S3</text>
  <!-- All layers explanation -->
  <text x="400" y="148" font-family="Arial,sans-serif" font-size="11" fill="#555" text-anchor="middle">すべての条件が AND で評価される — 一つでも Deny があればアクセス拒否</text>
  <!-- Policy examples -->
  <rect x="20" y="162" width="362" height="175" rx="6" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <rect x="20" y="162" width="362" height="22" rx="6" fill="#10b981"/>
  <text x="201" y="178" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">② VPC Endpoint Policy (例)</text>
  <rect x="30" y="190" width="342" height="135" rx="4" fill="#f8f9fa"/>
  <text x="38" y="207" font-family="monospace,Arial" font-size="9" fill="#333">{</text>
  <text x="38" y="220" font-family="monospace,Arial" font-size="9" fill="#333">  "Statement": [{</text>
  <text x="38" y="233" font-family="monospace,Arial" font-size="9" fill="#333">    "Effect": "Allow",</text>
  <text x="38" y="246" font-family="monospace,Arial" font-size="9" fill="#333">    "Principal": "*",</text>
  <text x="38" y="259" font-family="monospace,Arial" font-size="9" fill="#333">    "Action": ["s3:GetObject", "s3:PutObject"],</text>
  <text x="38" y="272" font-family="monospace,Arial" font-size="9" fill="#059669">    "Resource": "arn:aws:s3:::my-bucket/*",</text>
  <text x="38" y="285" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">    "Condition": { "StringEquals": {</text>
  <text x="38" y="298" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">      "aws:PrincipalAccount": "123456789012" }}</text>
  <text x="38" y="311" font-family="monospace,Arial" font-size="9" fill="#333">  }]</text>
  <text x="38" y="324" font-family="monospace,Arial" font-size="9" fill="#333">}</text>
  <!-- Bucket policy example -->
  <rect x="418" y="162" width="362" height="175" rx="6" fill="#fff" stroke="#ff9900" stroke-width="1.5"/>
  <rect x="418" y="162" width="362" height="22" rx="6" fill="#ff9900"/>
  <text x="599" y="178" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">③ S3 Bucket Policy (例)</text>
  <rect x="428" y="190" width="342" height="135" rx="4" fill="#f8f9fa"/>
  <text x="436" y="207" font-family="monospace,Arial" font-size="9" fill="#333">{</text>
  <text x="436" y="220" font-family="monospace,Arial" font-size="9" fill="#333">  "Statement": [{</text>
  <text x="436" y="233" font-family="monospace,Arial" font-size="9" fill="#ef4444">    "Effect": "Deny",</text>
  <text x="436" y="246" font-family="monospace,Arial" font-size="9" fill="#333">    "Principal": "*",</text>
  <text x="436" y="259" font-family="monospace,Arial" font-size="9" fill="#333">    "Action": "s3:*",</text>
  <text x="436" y="272" font-family="monospace,Arial" font-size="9" fill="#333">    "Resource": ["arn:aws:s3:::my-bucket",</text>
  <text x="436" y="285" font-family="monospace,Arial" font-size="9" fill="#333">                 "arn:aws:s3:::my-bucket/*"],</text>
  <text x="436" y="298" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">    "Condition": { "StringNotEquals": {</text>
  <text x="436" y="311" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">      "aws:sourceVpce": "vpce-0abc1234" }}</text>
  <text x="436" y="324" font-family="monospace,Arial" font-size="9" fill="#333">  }]</text>
  <!-- Key conditions note -->
  <rect x="20" y="348" width="760" height="36" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="361" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">重要条件キー: aws:sourceVpce (EP ID指定) / aws:sourceVpc (VPC ID指定) / aws:PrincipalAccount (アカウント制限)</text>
  <text x="400" y="378" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">Bucket Policy で Deny + aws:sourceVpce → EP 経由以外からのアクセスを全拒否（最も強固な制御）</text>
</svg>

<!--
Gateway EP のアクセス制御は 4 層構造です。特に aws:sourceVpce 条件キーを使った Bucket Policy による Deny は、EP 経由以外からのアクセスを完全遮断する最も強力な制御手段です。
-->

---

# Interface Endpoint (PrivateLink) — 概要

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <!-- AWS Cloud border -->
  <rect x="8" y="8" width="784" height="384" rx="12" fill="none" stroke="#ff9900" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="24" y="28" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold">AWS Cloud / Region (ap-northeast-1)</text>
  <!-- VPC border -->
  <rect x="24" y="36" width="500" height="340" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="42" y="56" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC (10.0.0.0/16)</text>
  <!-- Private Subnet AZ-a -->
  <rect x="40" y="66" width="190" height="145" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="56" y="84" font-family="Arial,sans-serif" font-size="10" fill="#555">Private Subnet (AZ-a)</text>
  <!-- EC2 in AZ-a -->
  <rect x="55" y="94" width="155" height="55" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="55" y="94" width="155" height="20" rx="5" fill="#7b5ea7"/>
  <text x="132" y="108" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2 Instance</text>
  <text x="132" y="130" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">10.0.1.10</text>
  <text x="132" y="143" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">SG: sg-app01</text>
  <!-- ENI in AZ-a -->
  <rect x="55" y="164" width="155" height="36" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <text x="132" y="179" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">ENI (Interface EP)</text>
  <text x="132" y="192" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.0.1.50 | SG: sg-ep01</text>
  <!-- Private Subnet AZ-c -->
  <rect x="260" y="66" width="190" height="145" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="276" y="84" font-family="Arial,sans-serif" font-size="10" fill="#555">Private Subnet (AZ-c)</text>
  <!-- EC2 in AZ-c -->
  <rect x="275" y="94" width="155" height="55" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="275" y="94" width="155" height="20" rx="5" fill="#7b5ea7"/>
  <text x="352" y="108" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2 Instance</text>
  <text x="352" y="130" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">10.0.3.20</text>
  <text x="352" y="143" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">SG: sg-app01</text>
  <!-- ENI in AZ-c -->
  <rect x="275" y="164" width="155" height="36" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <text x="352" y="179" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">ENI (Interface EP)</text>
  <text x="352" y="192" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.0.3.60 | SG: sg-ep01</text>
  <!-- Arrow EC2 to ENI in AZ-a -->
  <line x1="132" y1="149" x2="132" y2="162" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="126,158 132,164 138,158" fill="#7b5ea7"/>
  <!-- Arrow EC2 to ENI in AZ-c -->
  <line x1="352" y1="149" x2="352" y2="162" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="346,158 352,164 358,158" fill="#7b5ea7"/>
  <!-- DNS Resolution box -->
  <rect x="40" y="235" width="465" height="60" rx="6" fill="#fff9e6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="55" y="253" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold">DNS 解決 (Private DNS 有効時)</text>
  <text x="55" y="270" font-family="monospace,Arial" font-size="10" fill="#333">ssm.ap-northeast-1.amazonaws.com  →  10.0.1.50 (AZ-a) / 10.0.3.60 (AZ-c)</text>
  <text x="55" y="285" font-family="Arial,sans-serif" font-size="9" fill="#888">Route 53 PHZ により VPC 内でプライベート IP に解決される（既存コード変更不要）</text>
  <!-- Security Group box -->
  <rect x="40" y="310" width="465" height="58" rx="6" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="55" y="328" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">セキュリティグループ (sg-ep01) — インバウンドルール例</text>
  <text x="55" y="345" font-family="monospace,Arial" font-size="9" fill="#333">Type: HTTPS (443)  |  Source: sg-app01  |  Description: Allow from App EC2</text>
  <text x="55" y="360" font-family="Arial,sans-serif" font-size="9" fill="#888">EC2 のSGを source に指定することで、特定インスタンスからの通信のみ許可</text>
  <!-- AWS Service (right) -->
  <rect x="575" y="80" width="200" height="240" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <text x="675" y="104" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">Endpoint Service</text>
  <text x="675" y="120" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">(AWS PrivateLink)</text>
  <!-- SSM -->
  <rect x="592" y="130" width="166" height="42" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <circle cx="614" cy="151" r="15" fill="#10b981"/>
  <text x="614" y="156" font-family="Arial,sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">SSM</text>
  <text x="650" y="148" font-family="Arial,sans-serif" font-size="11" fill="#333" font-weight="bold">Systems Manager</text>
  <text x="650" y="162" font-family="Arial,sans-serif" font-size="9" fill="#888">ssm.*.amazonaws.com</text>
  <!-- Secrets Manager -->
  <rect x="592" y="182" width="166" height="42" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <circle cx="614" cy="203" r="15" fill="#7b5ea7"/>
  <text x="614" y="208" font-family="Arial,sans-serif" font-size="8" fill="#fff" font-weight="bold" text-anchor="middle">SEC</text>
  <text x="650" y="200" font-family="Arial,sans-serif" font-size="11" fill="#333" font-weight="bold">Secrets Manager</text>
  <text x="650" y="214" font-family="Arial,sans-serif" font-size="9" fill="#888">secretsmanager.*.amazonaws.com</text>
  <!-- KMS -->
  <rect x="592" y="234" width="166" height="42" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <circle cx="614" cy="255" r="15" fill="#f59e0b"/>
  <text x="614" y="260" font-family="Arial,sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">KMS</text>
  <text x="650" y="252" font-family="Arial,sans-serif" font-size="11" fill="#333" font-weight="bold">KMS</text>
  <text x="650" y="266" font-family="Arial,sans-serif" font-size="9" fill="#888">kms.*.amazonaws.com</text>
  <!-- Arrows ENI to Service -->
  <line x1="430" y1="182" x2="572" y2="182" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="568,176 580,182 568,188" fill="#10b981"/>
  <!-- AWS Backbone label -->
  <rect x="440" y="163" width="115" height="36" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="497" y="177" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">AWS PrivateLink</text>
  <text x="497" y="191" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Backbone 経由</text>
</svg>

<!--
Interface Endpoint は VPC 内のサブネットに ENI を作成します。ENI はプライベート IP を持ち、セキュリティグループを適用できます。Private DNS により既存コードの変更なしでプライベート接続が可能です。
-->

---

# Interface Endpoint — マルチ AZ ENI 配置

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Interface Endpoint — マルチ AZ ENI 配置</text>
  <!-- VPC border -->
  <rect x="15" y="38" width="580" height="340" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="33" y="58" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC</text>
  <!-- AZ-a column -->
  <rect x="32" y="68" width="175" height="295" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="119" y="86" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle" font-weight="bold">AZ-a (ap-northeast-1a)</text>
  <!-- EC2 AZ-a -->
  <rect x="46" y="98" width="147" height="44" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="46" y="98" width="147" height="18" rx="5" fill="#7b5ea7"/>
  <text x="119" y="111" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">EC2 (10.0.1.10)</text>
  <text x="119" y="130" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">sg-app01</text>
  <!-- ENI AZ-a -->
  <rect x="46" y="168" width="147" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="46" y="168" width="147" height="18" rx="5" fill="#10b981"/>
  <text x="119" y="181" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">ENI (Interface EP)</text>
  <text x="119" y="200" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">10.0.1.50</text>
  <text x="119" y="215" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">sg-ep01 | vpce-xxxx</text>
  <!-- DNS AZ-a -->
  <rect x="46" y="242" width="147" height="36" rx="4" fill="#fff9e6" stroke="#f59e0b" stroke-width="1"/>
  <text x="119" y="256" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle">DNS (PHZ)</text>
  <text x="119" y="270" font-family="monospace,Arial" font-size="8" fill="#555" text-anchor="middle">ssm.ap-...  → 10.0.1.50</text>
  <!-- AZ-b column -->
  <rect x="222" y="68" width="175" height="295" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="309" y="86" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle" font-weight="bold">AZ-b (ap-northeast-1c)</text>
  <!-- EC2 AZ-b -->
  <rect x="236" y="98" width="147" height="44" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="236" y="98" width="147" height="18" rx="5" fill="#7b5ea7"/>
  <text x="309" y="111" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">EC2 (10.0.2.15)</text>
  <text x="309" y="130" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">sg-app01</text>
  <!-- ENI AZ-b -->
  <rect x="236" y="168" width="147" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="236" y="168" width="147" height="18" rx="5" fill="#10b981"/>
  <text x="309" y="181" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">ENI (Interface EP)</text>
  <text x="309" y="200" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">10.0.2.80</text>
  <text x="309" y="215" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">sg-ep01 | vpce-xxxx</text>
  <!-- DNS AZ-b -->
  <rect x="236" y="242" width="147" height="36" rx="4" fill="#fff9e6" stroke="#f59e0b" stroke-width="1"/>
  <text x="309" y="256" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle">DNS (PHZ)</text>
  <text x="309" y="270" font-family="monospace,Arial" font-size="8" fill="#555" text-anchor="middle">ssm.ap-...  → 10.0.2.80</text>
  <!-- AZ-c column -->
  <rect x="412" y="68" width="166" height="295" rx="6" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="495" y="86" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle" font-weight="bold">AZ-c (ap-northeast-1d)</text>
  <!-- EC2 AZ-c (optional) -->
  <rect x="426" y="98" width="138" height="44" rx="5" fill="#f1f5f9" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="495" y="120" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">EC2 (optional)</text>
  <!-- No ENI in AZ-c case -->
  <rect x="426" y="168" width="138" height="55" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="495" y="191" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">ENI なし</text>
  <text x="495" y="207" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">AZ-c に EP を</text>
  <text x="495" y="220" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">作成しない場合</text>
  <!-- Cost warning AZ-c -->
  <rect x="426" y="242" width="138" height="36" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="495" y="256" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">クロスAZ通信</text>
  <text x="495" y="270" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">$0.01/GB コスト発生</text>
  <!-- Arrows EC2 to ENI (AZ-a and AZ-b) -->
  <line x1="119" y1="142" x2="119" y2="166" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="113,162 119,168 125,162" fill="#7b5ea7"/>
  <line x1="309" y1="142" x2="309" y2="166" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="303,162 309,168 315,162" fill="#7b5ea7"/>
  <!-- Right: AWS Service panel -->
  <rect x="618" y="55" width="170" height="310" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <text x="703" y="78" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">AWS Service</text>
  <text x="703" y="94" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">(e.g. SSM)</text>
  <!-- HA indicator -->
  <rect x="632" y="108" width="142" height="220" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <text x="703" y="130" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">PrivateLink</text>
  <text x="703" y="148" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">Endpoint Service</text>
  <text x="703" y="190" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">AWS 管理</text>
  <text x="703" y="205" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">冗長化済み</text>
  <text x="703" y="220" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">マルチAZ</text>
  <!-- Arrows ENI to AWS Service -->
  <line x1="579" y1="195" x2="616" y2="195" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="612,189 624,195 612,201" fill="#10b981"/>
  <!-- Summary notes -->
  <rect x="15" y="358" width="773" height="32" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="370" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">推奨: 使用するすべての AZ に ENI を作成してクロスAZコストを回避</text>
  <text x="400" y="384" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">ENI は AZ ごとに独立したプライベート IP を持つ / 料金: $0.01/hr/AZ + $0.01/GB データ処理</text>
</svg>

<!--
高可用性のため、使用する全 AZ に ENI を作成することを推奨します。ENI がない AZ からアクセスするとクロスAZ通信が発生し $0.01/GB のコストが発生します。
-->

---

# Interface Endpoint — DNS 解決の仕組み

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Interface Endpoint — DNS 解決の仕組み</text>
  <!-- Two columns: without Private DNS / with Private DNS -->
  <line x1="400" y1="35" x2="400" y2="395" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- LEFT: Without Private DNS -->
  <text x="200" y="52" font-family="Arial,sans-serif" font-size="12" fill="#f59e0b" font-weight="bold" text-anchor="middle">Private DNS 無効時</text>
  <!-- Step boxes left -->
  <!-- Step 1 -->
  <rect x="20" y="62" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="44" cy="86" r="14" fill="#7b5ea7"/>
  <text x="44" y="91" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">1</text>
  <text x="68" y="80" font-family="Arial,sans-serif" font-size="11" fill="#333">アプリがエンドポイント専用 DNS 名を使用</text>
  <text x="68" y="98" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">vpce-0abc.ssm.ap-northeast-1.vpce.amazonaws.com</text>
  <!-- Step 2 -->
  <line x1="200" y1="110" x2="200" y2="124" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="194,120 200,126 206,120" fill="#7b5ea7"/>
  <rect x="20" y="124" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="44" cy="148" r="14" fill="#7b5ea7"/>
  <text x="44" y="153" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">2</text>
  <text x="68" y="142" font-family="Arial,sans-serif" font-size="11" fill="#333">Route 53 Resolver (VPC DNS) に問い合わせ</text>
  <text x="68" y="158" font-family="Arial,sans-serif" font-size="9" fill="#888">VPC CIDR +2 の DNS サーバー (169.254.169.253)</text>
  <!-- Step 3 -->
  <line x1="200" y1="172" x2="200" y2="186" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="194,182 200,188 206,182" fill="#7b5ea7"/>
  <rect x="20" y="186" width="360" height="48" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <circle cx="44" cy="210" r="14" fill="#10b981"/>
  <text x="44" y="215" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
  <text x="68" y="204" font-family="Arial,sans-serif" font-size="11" fill="#333">ENI の プライベート IP に解決</text>
  <text x="68" y="220" font-family="monospace,Arial" font-size="9" fill="#059669">vpce-0abc.ssm.*.vpce.amazonaws.com → 10.0.1.50</text>
  <!-- Step 4 -->
  <line x1="200" y1="234" x2="200" y2="248" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="194,244 200,250 206,244" fill="#7b5ea7"/>
  <rect x="20" y="248" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="44" cy="272" r="14" fill="#7b5ea7"/>
  <text x="44" y="277" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
  <text x="68" y="266" font-family="Arial,sans-serif" font-size="11" fill="#333">ENI → PrivateLink → AWS Service</text>
  <text x="68" y="282" font-family="Arial,sans-serif" font-size="9" fill="#888">トラフィックは VPC 内 ENI に到達後、AWS Backbone 経由</text>
  <!-- Note: code change needed -->
  <rect x="20" y="310" width="360" height="52" rx="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="200" y="330" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">注意: コード変更が必要</text>
  <text x="200" y="348" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">アプリの接続先を vpce-XXXX 形式の</text>
  <text x="200" y="364" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">エンドポイント専用 DNS 名に変更する必要あり</text>
  <!-- RIGHT: With Private DNS -->
  <text x="600" y="52" font-family="Arial,sans-serif" font-size="12" fill="#10b981" font-weight="bold" text-anchor="middle">Private DNS 有効時 (推奨)</text>
  <!-- Step 1 right -->
  <rect x="420" y="62" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="444" cy="86" r="14" fill="#10b981"/>
  <text x="444" y="91" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">1</text>
  <text x="468" y="80" font-family="Arial,sans-serif" font-size="11" fill="#333">アプリが標準 DNS 名を使用（変更不要）</text>
  <text x="468" y="98" font-family="monospace,Arial" font-size="9" fill="#10b981">ssm.ap-northeast-1.amazonaws.com</text>
  <!-- Step 2 right -->
  <line x1="600" y1="110" x2="600" y2="124" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="594,120 600,126 606,120" fill="#10b981"/>
  <rect x="420" y="124" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="444" cy="148" r="14" fill="#10b981"/>
  <text x="444" y="153" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">2</text>
  <text x="468" y="142" font-family="Arial,sans-serif" font-size="11" fill="#333">Route 53 Resolver が Private Hosted Zone を参照</text>
  <text x="468" y="158" font-family="Arial,sans-serif" font-size="9" fill="#888">PHZ: ssm.ap-northeast-1.amazonaws.com (VPC に関連付け)</text>
  <!-- Step 3 right -->
  <line x1="600" y1="172" x2="600" y2="186" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="594,182 600,188 606,182" fill="#10b981"/>
  <rect x="420" y="186" width="360" height="48" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <circle cx="444" cy="210" r="14" fill="#10b981"/>
  <text x="444" y="215" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
  <text x="468" y="204" font-family="Arial,sans-serif" font-size="11" fill="#333">ENI の プライベート IP に解決</text>
  <text x="468" y="220" font-family="monospace,Arial" font-size="9" fill="#059669">ssm.ap-northeast-1.amazonaws.com → 10.0.1.50</text>
  <!-- Step 4 right -->
  <line x1="600" y1="234" x2="600" y2="248" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="594,244 600,250 606,244" fill="#10b981"/>
  <rect x="420" y="248" width="360" height="48" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <circle cx="444" cy="272" r="14" fill="#10b981"/>
  <text x="444" y="277" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
  <text x="468" y="266" font-family="Arial,sans-serif" font-size="11" fill="#333">ENI → PrivateLink → AWS Service</text>
  <text x="468" y="282" font-family="Arial,sans-serif" font-size="9" fill="#888">既存コードの変更なしで完全プライベート通信</text>
  <!-- Note: no code change needed -->
  <rect x="420" y="310" width="360" height="52" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <text x="600" y="330" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">コード変更不要</text>
  <text x="600" y="348" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">標準 DNS 名のまま使用可能</text>
  <text x="600" y="364" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">既存アプリへの影響ゼロで移行可能</text>
</svg>

<!--
Private DNS を有効化すると Route 53 PHZ が自動作成され、標準の DNS 名がプライベート IP に解決されます。既存アプリのコード変更なしで移行できるため、本番環境での採用が容易です。
-->

---

# Private DNS 機能と Route 53 PHZ

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Private DNS 機能と Route 53 Private Hosted Zone</text>
  <!-- VPC border -->
  <rect x="15" y="38" width="490" height="345" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="33" y="58" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC</text>
  <!-- VPC DNS Attributes note -->
  <rect x="30" y="64" width="455" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="257" y="75" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">前提条件: VPC 属性 enableDnsSupport=true / enableDnsHostnames=true</text>
  <text x="257" y="88" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Private DNS を有効化するには両属性が true である必要がある</text>
  <!-- EC2 -->
  <rect x="30" y="106" width="130" height="60" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="30" y="106" width="130" height="20" rx="5" fill="#7b5ea7"/>
  <text x="95" y="120" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">EC2</text>
  <text x="95" y="143" font-family="monospace,Arial" font-size="9" fill="#555" text-anchor="middle">resolve:</text>
  <text x="95" y="158" font-family="monospace,Arial" font-size="8" fill="#7b5ea7" text-anchor="middle">ssm.*.amazonaws.com</text>
  <!-- DNS Resolver (VPC +2) -->
  <rect x="30" y="190" width="130" height="55" rx="5" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="30" y="190" width="130" height="18" rx="5" fill="#f59e0b"/>
  <text x="95" y="203" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">VPC DNS Resolver</text>
  <text x="95" y="222" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">169.254.169.253</text>
  <text x="95" y="237" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">(VPC CIDR+2)</text>
  <!-- Arrow EC2 to Resolver -->
  <line x1="95" y1="166" x2="95" y2="188" stroke="#555" stroke-width="1.5"/>
  <polygon points="89,184 95,190 101,184" fill="#555"/>
  <!-- Private Hosted Zone box -->
  <rect x="220" y="106" width="270" height="155" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <rect x="220" y="106" width="270" height="22" rx="6" fill="#10b981"/>
  <text x="355" y="122" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Route 53 Private Hosted Zone (PHZ)</text>
  <text x="355" y="142" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">ゾーン名: ssm.ap-northeast-1.amazonaws.com</text>
  <text x="355" y="158" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">VPC に自動関連付け（EP 作成時）</text>
  <!-- PHZ records -->
  <rect x="232" y="166" width="246" height="84" rx="4" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <rect x="232" y="166" width="246" height="18" fill="#f1f5f9"/>
  <text x="280" y="179" font-family="monospace,Arial" font-size="9" fill="#555" font-weight="bold">Name</text>
  <line x1="352" y1="166" x2="352" y2="250" stroke="#e5e7eb" stroke-width="1"/>
  <text x="400" y="179" font-family="monospace,Arial" font-size="9" fill="#555" font-weight="bold">Value</text>
  <rect x="232" y="184" width="246" height="18" fill="#f0fdf4"/>
  <text x="238" y="197" font-family="monospace,Arial" font-size="9" fill="#333">ssm (A)</text>
  <text x="358" y="197" font-family="monospace,Arial" font-size="9" fill="#059669">10.0.1.50</text>
  <rect x="232" y="202" width="246" height="18" fill="#fff"/>
  <text x="238" y="215" font-family="monospace,Arial" font-size="9" fill="#333">ssm (A)</text>
  <text x="358" y="215" font-family="monospace,Arial" font-size="9" fill="#059669">10.0.2.80</text>
  <rect x="232" y="220" width="246" height="18" fill="#f0fdf4"/>
  <text x="238" y="233" font-family="monospace,Arial" font-size="9" fill="#333">ssm (ALIAS)</text>
  <text x="358" y="233" font-family="monospace,Arial" font-size="9" fill="#10b981">vpce-DNS (A records)</text>
  <text x="355" y="248" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">マルチ値 / ラウンドロビンで AZ ローカルの IP を返す</text>
  <!-- Arrow Resolver to PHZ -->
  <line x1="160" y1="217" x2="218" y2="180" stroke="#10b981" stroke-width="2"/>
  <polygon points="212,175 222,182 215,189" fill="#10b981"/>
  <!-- ENI box -->
  <rect x="30" y="296" width="455" height="60" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="35" y="314" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">ENI (Interface Endpoints)</text>
  <text x="35" y="332" font-family="monospace,Arial" font-size="10" fill="#333">AZ-a: 10.0.1.50  |  AZ-b: 10.0.2.80  |  (同一エンドポイント、複数 ENI)</text>
  <text x="35" y="348" font-family="Arial,sans-serif" font-size="9" fill="#888">PHZ はクライアントの AZ に近い ENI の IP を優先的に返す (AZ affinity)</text>
  <!-- Arrow PHZ to ENI -->
  <line x1="355" y1="261" x2="280" y2="294" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="276,290 282,298 286,289" fill="#10b981"/>
  <!-- Right: AWS Service -->
  <rect x="525" y="60" width="260" height="310" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <text x="655" y="84" font-family="Arial,sans-serif" font-size="12" fill="#cc7700" font-weight="bold" text-anchor="middle">AWS Service</text>
  <!-- Service details -->
  <rect x="540" y="96" width="230" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <text x="655" y="115" font-family="Arial,sans-serif" font-size="11" fill="#059669" text-anchor="middle" font-weight="bold">SSM Endpoint Service</text>
  <text x="655" y="133" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">com.amazonaws.ap-northeast-1.ssm</text>
  <text x="655" y="145" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">VPC EP Type: Interface</text>
  <!-- Private DNS feature checkbox -->
  <rect x="540" y="162" width="230" height="80" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="655" y="182" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Private DNS 有効化設定</text>
  <text x="553" y="202" font-family="Arial,sans-serif" font-size="10" fill="#059669">✓ Enable Private DNS Name</text>
  <text x="553" y="220" font-family="Arial,sans-serif" font-size="9" fill="#888">コンソール / API / Terraform で設定</text>
  <text x="553" y="234" font-family="Arial,sans-serif" font-size="9" fill="#888">aws ec2 create-vpc-endpoint --private-dns-enabled</text>
  <!-- Cross-account note -->
  <rect x="540" y="255" width="230" height="95" rx="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="655" y="275" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">注意事項</text>
  <text x="553" y="295" font-family="Arial,sans-serif" font-size="9" fill="#555">・Route 53 Resolver Forwarding ルール</text>
  <text x="553" y="311" font-family="Arial,sans-serif" font-size="9" fill="#555">　とは共存不可 (DNS 解決の競合)</text>
  <text x="553" y="327" font-family="Arial,sans-serif" font-size="9" fill="#555">・オンプレDNS は PHZ を直接参照</text>
  <text x="553" y="343" font-family="Arial,sans-serif" font-size="9" fill="#555">　できない → R53 Inbound EP 必要</text>
  <!-- Arrow ENI to Service -->
  <line x1="487" y1="326" x2="523" y2="200" stroke="#10b981" stroke-width="2"/>
  <polygon points="517,197 526,207 531,196" fill="#10b981"/>
</svg>

<!--
PHZ は Interface Endpoint 作成時に自動生成・VPC 関連付けされます。enableDnsSupport と enableDnsHostnames の両方が true である必要があります。オンプレから PHZ へのアクセスには R53 Inbound Resolver EP が必要です。
-->

---

# Interface Endpoint — 対応サービス一覧

> *300以上のAWSサービスに対応—ENIにプライベートIPを割当*

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="420" fill="#1a1a2e"/>
  <text x="400" y="36" font-family="sans-serif" font-size="19" font-weight="bold" fill="#f9a825" text-anchor="middle">Interface Endpoint 対応サービス (100+)</text>
  <rect x="30" y="55" width="220" height="150" rx="10" fill="#0a2744" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="140" y="78" font-family="sans-serif" font-size="13" font-weight="bold" fill="#00bcd4" text-anchor="middle">コンピューティング</text>
  <text x="140" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">EC2 / ECS / ECR</text>
  <text x="140" y="118" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Lambda / Fargate</text>
  <text x="140" y="136" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Batch / EKS</text>
  <text x="140" y="154" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">AppRunner</text>
  <text x="140" y="185" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ ECR は API + dkr の2EP</text>
  <rect x="290" y="55" width="220" height="150" rx="10" fill="#1a2d0a" stroke="#8bc34a" stroke-width="1.5"/>
  <text x="400" y="78" font-family="sans-serif" font-size="13" font-weight="bold" fill="#8bc34a" text-anchor="middle">管理・運用</text>
  <text x="400" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">SSM / Systems Manager</text>
  <text x="400" y="118" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">CloudWatch Logs/Metrics</text>
  <text x="400" y="136" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">CloudTrail / Config</text>
  <text x="400" y="154" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">CodeBuild / CodePipeline</text>
  <text x="400" y="185" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ SSMはEC2アクセスに必須</text>
  <rect x="550" y="55" width="220" height="150" rx="10" fill="#3d0a2d" stroke="#e91e63" stroke-width="1.5"/>
  <text x="660" y="78" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e91e63" text-anchor="middle">セキュリティ</text>
  <text x="660" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Secrets Manager</text>
  <text x="660" y="118" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">KMS / ACM</text>
  <text x="660" y="136" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Security Hub / GuardDuty</text>
  <text x="660" y="154" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">STS / IAM</text>
  <text x="660" y="185" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ KMSは暗号化に必須</text>
  <rect x="30" y="220" width="220" height="150" rx="10" fill="#0a3d3d" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="140" y="243" font-family="sans-serif" font-size="13" font-weight="bold" fill="#00bcd4" text-anchor="middle">データ・分析</text>
  <text x="140" y="265" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">S3 (Interface EP)</text>
  <text x="140" y="283" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Kinesis / Glue / Athena</text>
  <text x="140" y="301" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">SageMaker / Redshift</text>
  <text x="140" y="319" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">DynamoDB (Interface EP)</text>
  <text x="140" y="355" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ オンプレからのS3アクセスに</text>
  <rect x="290" y="220" width="220" height="150" rx="10" fill="#1a1a0a" stroke="#ffc107" stroke-width="1.5"/>
  <text x="400" y="243" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffc107" text-anchor="middle">メッセージング</text>
  <text x="400" y="265" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">SQS / SNS</text>
  <text x="400" y="283" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">EventBridge</text>
  <text x="400" y="301" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Step Functions</text>
  <text x="400" y="319" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">AppSync</text>
  <text x="400" y="355" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ マイクロサービス間通信に</text>
  <rect x="550" y="220" width="220" height="150" rx="10" fill="#2d0a3d" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="660" y="243" font-family="sans-serif" font-size="13" font-weight="bold" fill="#9c27b0" text-anchor="middle">ネットワーク・その他</text>
  <text x="660" y="265" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Route 53 Resolver</text>
  <text x="660" y="283" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Network Firewall</text>
  <text x="660" y="301" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">PrivateLink (カスタム)</text>
  <text x="660" y="319" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">AppStream 2.0</text>
  <text x="660" y="355" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">★ DNS解決にR53 EP必要</text>
  <text x="400" y="398" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">サービス名: com.amazonaws.&lt;region&gt;.&lt;service&gt;</text>
</svg>
- **コンピューティング & コンテナ:** EC2, ECS, ECR (API/dkr), Lambda
- **管理 & 運用:** SSM, Systems Manager, CloudWatch (Logs/Monitoring), CloudTrail
- **セキュリティ:** Secrets Manager, KMS, ACM, Security Hub, GuardDuty
- **ネットワーク:** Route 53 Resolver, PrivateLink, Network Firewall
- **データ & 分析:** S3 (Interface), Kinesis, Glue, Athena, SageMaker
- **その他:** SQS, SNS, STS, CodeBuild, CodePipeline, AppStream 2.0

<!--
現在 100 以上の AWS サービスが Interface Endpoint に対応しています。サービス名は com.amazonaws.<region>.<service-name> の形式です。利用可能なサービスは AWS コンソールまたは API で確認できます。
-->

---

# Interface Endpoint — セキュリティグループ設計

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Interface Endpoint — セキュリティグループ設計</text>
  <!-- VPC -->
  <rect x="15" y="38" width="500" height="340" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <text x="33" y="58" font-family="Arial,sans-serif" font-size="12" fill="#7b5ea7" font-weight="bold">VPC</text>
  <!-- EC2 with SG -->
  <rect x="32" y="65" width="160" height="88" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.10))"/>
  <rect x="32" y="65" width="160" height="22" rx="6" fill="#7b5ea7"/>
  <text x="112" y="81" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">EC2 Instance</text>
  <text x="112" y="102" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">10.0.1.10</text>
  <text x="112" y="118" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle">SG: sg-app (sg-0aaa)</text>
  <text x="112" y="132" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Outbound: 443 → sg-ep</text>
  <!-- ENI with SG -->
  <rect x="240" y="65" width="180" height="88" rx="6" fill="#fff" stroke="#10b981" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.10))"/>
  <rect x="240" y="65" width="180" height="22" rx="6" fill="#10b981"/>
  <text x="330" y="81" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">Interface Endpoint ENI</text>
  <text x="330" y="102" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">10.0.1.50</text>
  <text x="330" y="118" font-family="Arial,sans-serif" font-size="9" fill="#10b981" text-anchor="middle">SG: sg-ep (sg-0bbb)</text>
  <text x="330" y="132" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Inbound: 443 ← sg-app</text>
  <!-- Arrow EC2 to ENI -->
  <line x1="192" y1="109" x2="238" y2="109" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="234,103 246,109 234,115" fill="#7b5ea7"/>
  <!-- EC2 SG Rules table -->
  <rect x="32" y="175" width="200" height="160" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="32" y="175" width="200" height="22" rx="5" fill="#7b5ea7" opacity="0.15"/>
  <text x="132" y="191" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">sg-app — EC2 のルール</text>
  <!-- Inbound -->
  <text x="42" y="210" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">Inbound</text>
  <rect x="38" y="215" width="185" height="17" rx="2" fill="#f8fafc"/>
  <text x="42" y="227" font-family="monospace,Arial" font-size="8" fill="#888">Type: HTTPS  Src: 10.0.0.0/16</text>
  <!-- Outbound (key rule) -->
  <text x="42" y="248" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">Outbound</text>
  <rect x="38" y="253" width="185" height="17" rx="2" fill="#dcfce7"/>
  <text x="42" y="265" font-family="monospace,Arial" font-size="8" fill="#059669" font-weight="bold">HTTPS 443 → sg-0bbb (sg-ep)</text>
  <rect x="38" y="272" width="185" height="17" rx="2" fill="#f8fafc"/>
  <text x="42" y="284" font-family="monospace,Arial" font-size="8" fill="#888">All → 0.0.0.0/0 (default)</text>
  <!-- EP SG Rules table -->
  <rect x="250" y="175" width="242" height="160" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <rect x="250" y="175" width="242" height="22" rx="5" fill="#10b981" opacity="0.15"/>
  <text x="371" y="191" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">sg-ep — Interface EP のルール</text>
  <!-- Inbound (key rule) -->
  <text x="260" y="210" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">Inbound (重要)</text>
  <rect x="256" y="215" width="228" height="17" rx="2" fill="#dcfce7"/>
  <text x="260" y="227" font-family="monospace,Arial" font-size="8" fill="#059669" font-weight="bold">HTTPS 443 ← sg-0aaa (sg-app)</text>
  <rect x="256" y="234" width="228" height="17" rx="2" fill="#f8fafc"/>
  <text x="260" y="246" font-family="monospace,Arial" font-size="8" fill="#888">HTTP 80 ← 10.0.0.0/8 (internal)</text>
  <!-- Outbound -->
  <text x="260" y="266" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">Outbound</text>
  <rect x="256" y="271" width="228" height="17" rx="2" fill="#f8fafc"/>
  <text x="260" y="283" font-family="monospace,Arial" font-size="8" fill="#888">All → 0.0.0.0/0 (default)</text>
  <rect x="256" y="290" width="228" height="17" rx="2" fill="#fef9c3"/>
  <text x="260" y="302" font-family="monospace,Arial" font-size="8" fill="#b45309">Outbound は通常 変更不要</text>
  <!-- Key insight box -->
  <rect x="32" y="345" width="460" height="25" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="262" y="361" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">Gateway EP と違い、Interface EP はSGで細かいアクセス制御が可能 — IP ではなく SG 参照で管理推奨</text>
  <!-- Right panel: comparison -->
  <rect x="540" y="38" width="245" height="340" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
  <rect x="540" y="38" width="245" height="30" rx="8" fill="#6b7280"/>
  <text x="662" y="58" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Gateway vs Interface: SG</text>
  <!-- Gateway -->
  <rect x="552" y="80" width="221" height="120" rx="5" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="662" y="98" font-family="Arial,sans-serif" font-size="11" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Gateway Endpoint</text>
  <text x="560" y="118" font-family="Arial,sans-serif" font-size="10" fill="#ef4444">✗ セキュリティグループ不可</text>
  <text x="560" y="136" font-family="Arial,sans-serif" font-size="9" fill="#555">・ルートテーブルで制御</text>
  <text x="560" y="152" font-family="Arial,sans-serif" font-size="9" fill="#555">・Endpoint Policy で補完</text>
  <text x="560" y="168" font-family="Arial,sans-serif" font-size="9" fill="#555">・S3 Bucket Policy と組み合わせ</text>
  <text x="560" y="186" font-family="Arial,sans-serif" font-size="9" fill="#888">→ IP/CIDR ベースの制御のみ</text>
  <!-- Interface -->
  <rect x="552" y="215" width="221" height="140" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="662" y="233" font-family="Arial,sans-serif" font-size="11" fill="#059669" text-anchor="middle" font-weight="bold">Interface Endpoint</text>
  <text x="560" y="253" font-family="Arial,sans-serif" font-size="10" fill="#10b981">✓ セキュリティグループ設定可</text>
  <text x="560" y="271" font-family="Arial,sans-serif" font-size="9" fill="#555">・ENI に SG をアタッチ</text>
  <text x="560" y="287" font-family="Arial,sans-serif" font-size="9" fill="#555">・SG 参照でソース指定可能</text>
  <text x="560" y="303" font-family="Arial,sans-serif" font-size="9" fill="#555">・ポート / プロトコル制御</text>
  <text x="560" y="319" font-family="Arial,sans-serif" font-size="9" fill="#555">・Endpoint Policy との二重制御</text>
  <text x="560" y="340" font-family="Arial,sans-serif" font-size="9" fill="#888">→ より細かいアクセス制御が可能</text>
</svg>

<!--
SG 参照（sg-id をソースに指定）は IP アドレス変更に依存しない堅牢な設計です。Gateway EP との最大の違いがこのセキュリティグループによる細粒度制御にあります。
-->

---

# 比較① — 技術仕様マトリクス

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">技術仕様比較マトリクス</text>
  <!-- Table -->
  <!-- Header row -->
  <rect x="10" y="36" width="780" height="36" rx="4" fill="#7b5ea7"/>
  <text x="200" y="59" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">比較項目</text>
  <line x1="390" y1="36" x2="390" y2="395" stroke="#fff" stroke-width="1" opacity="0.5"/>
  <text x="570" y="59" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <line x1="600" y1="36" x2="600" y2="395" stroke="#fff" stroke-width="1" opacity="0.5"/>
  <text x="720" y="59" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint</text>
  <!-- Vertical dividers -->
  <line x1="390" y1="72" x2="390" y2="395" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="600" y1="72" x2="600" y2="395" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Row 1: Mechanism -->
  <rect x="10" y="72" width="780" height="32" fill="#f8fafc"/>
  <text x="200" y="93" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">接続方式</text>
  <text x="490" y="93" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle">ルートテーブル エントリ</text>
  <text x="700" y="93" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">ENI (Elastic Network Interface)</text>
  <!-- Row 2: Supported services -->
  <rect x="10" y="104" width="780" height="32" fill="#fff"/>
  <text x="200" y="125" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">対応サービス</text>
  <text x="490" y="125" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle">S3 / DynamoDB のみ (2サービス)</text>
  <text x="700" y="125" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">100+ AWS サービス &amp; カスタム</text>
  <!-- Row 3: Private IP -->
  <rect x="10" y="136" width="780" height="32" fill="#f8fafc"/>
  <text x="200" y="157" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">プライベート IP</text>
  <text x="490" y="157" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">なし (ENI なし)</text>
  <text x="700" y="157" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">あり (AZ ごとにプライベート IP)</text>
  <!-- Row 4: Security Group -->
  <rect x="10" y="168" width="780" height="32" fill="#fff"/>
  <text x="200" y="189" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">セキュリティグループ</text>
  <text x="490" y="189" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">不可 (ルートテーブルのみ)</text>
  <text x="700" y="189" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">可 (ENI にアタッチ)</text>
  <!-- Row 5: Private DNS -->
  <rect x="10" y="200" width="780" height="32" fill="#f8fafc"/>
  <text x="200" y="221" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">Private DNS</text>
  <text x="490" y="221" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">不可</text>
  <text x="700" y="221" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">可 (Route 53 PHZ 自動作成)</text>
  <!-- Row 6: On-prem / TGW -->
  <rect x="10" y="232" width="780" height="32" fill="#fff"/>
  <text x="200" y="253" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">オンプレ / TGW 経由</text>
  <text x="490" y="253" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle">不可 (VPC 内のトラフィックのみ)</text>
  <text x="700" y="253" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">可 (VPN/DX + ENI 経由)</text>
  <!-- Row 7: Cost -->
  <rect x="10" y="264" width="780" height="32" fill="#f8fafc"/>
  <text x="200" y="285" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">料金</text>
  <text x="490" y="285" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">無料</text>
  <text x="700" y="285" font-family="Arial,sans-serif" font-size="10" fill="#f59e0b" text-anchor="middle">$0.01/hr/AZ + $0.01/GB</text>
  <!-- Row 8: Availability -->
  <rect x="10" y="296" width="780" height="32" fill="#fff"/>
  <text x="200" y="317" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">可用性</text>
  <text x="490" y="317" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">AWS 管理・冗長化済み</text>
  <text x="700" y="317" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">AWS 管理・マルチAZ配置推奨</text>
  <!-- Row 9: Endpoint policy -->
  <rect x="10" y="328" width="780" height="32" fill="#f8fafc"/>
  <text x="200" y="349" font-family="Arial,sans-serif" font-size="11" fill="#333" text-anchor="middle" font-weight="bold">Endpoint Policy</text>
  <text x="490" y="349" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">可 (JSON ポリシー)</text>
  <text x="700" y="349" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle">可 (JSON ポリシー)</text>
  <!-- Border -->
  <rect x="10" y="72" width="780" height="288" rx="0" fill="none" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="104" x2="790" y2="104" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="136" x2="790" y2="136" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="168" x2="790" y2="168" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="200" x2="790" y2="200" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="232" x2="790" y2="232" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="264" x2="790" y2="264" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="296" x2="790" y2="296" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="10" y1="328" x2="790" y2="328" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Bottom note -->
  <rect x="10" y="375" width="780" height="22" rx="4" fill="#7b5ea7" opacity="0.1"/>
  <text x="400" y="390" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle">S3 / DynamoDB へのアクセスが目的なら Gateway を選ぶ — オンプレ連携・他サービスなら Interface を選ぶ</text>
</svg>

<!--
最重要の差分は「対応サービス数」「ENI 有無」「SG 設定可否」「オンプレ/TGW 経由可否」の 4 点です。ANS 試験ではこの比較から答えを導くケースが多いです。
-->

---

# 比較② — コスト構造

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">コスト構造比較</text>
  <!-- LEFT: Gateway Cost -->
  <rect x="15" y="38" width="370" height="345" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <rect x="15" y="38" width="370" height="36" rx="8" fill="#10b981"/>
  <text x="200" y="61" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <!-- Free label -->
  <rect x="115" y="84" width="170" height="48" rx="6" fill="#10b981" opacity="0.15" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.10))"/>
  <text x="200" y="110" font-family="Arial,sans-serif" font-size="28" fill="#059669" font-weight="bold" text-anchor="middle">無 料</text>
  <text x="200" y="128" font-family="Arial,sans-serif" font-size="11" fill="#888" text-anchor="middle">追加コスト一切なし</text>
  <!-- What is free -->
  <rect x="30" y="146" width="340" height="130" rx="5" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <text x="200" y="165" font-family="Arial,sans-serif" font-size="11" fill="#059669" text-anchor="middle" font-weight="bold">コスト内訳</text>
  <text x="48" y="188" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ エンドポイント時間料金: 無料</text>
  <text x="48" y="208" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ データ処理料金: 無料</text>
  <text x="48" y="228" font-family="Arial,sans-serif" font-size="11" fill="#10b981">✓ リージョン内 S3 転送: 無料</text>
  <text x="48" y="248" font-family="Arial,sans-serif" font-size="9" fill="#888">※ クロスリージョン転送は別途課金</text>
  <text x="48" y="264" font-family="Arial,sans-serif" font-size="9" fill="#888">※ CloudFront → S3 も Gateway 経由可</text>
  <!-- Saving vs NAT -->
  <rect x="30" y="288" width="340" height="80" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="200" y="306" font-family="Arial,sans-serif" font-size="11" fill="#059669" text-anchor="middle" font-weight="bold">NAT GW 不要による削減効果</text>
  <text x="48" y="326" font-family="Arial,sans-serif" font-size="10" fill="#555">NAT GW: $0.045/hr = ~$32/月/AZ</text>
  <text x="48" y="344" font-family="Arial,sans-serif" font-size="10" fill="#555">データ: $0.045/GB → $0 (EP 経由)</text>
  <text x="48" y="360" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">→ 大量S3アクセスで大幅コスト削減</text>
  <!-- RIGHT: Interface Cost -->
  <rect x="415" y="38" width="370" height="345" rx="8" fill="#fff9f0" stroke="#f59e0b" stroke-width="2"/>
  <rect x="415" y="38" width="370" height="36" rx="8" fill="#f59e0b"/>
  <text x="600" y="61" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint</text>
  <!-- Price breakdown -->
  <rect x="430" y="82" width="340" height="120" rx="5" fill="#fff" stroke="#f59e0b" stroke-width="1"/>
  <text x="600" y="101" font-family="Arial,sans-serif" font-size="11" fill="#b45309" text-anchor="middle" font-weight="bold">料金体系 (us-east-1 基準)</text>
  <!-- EP hourly -->
  <rect x="438" y="108" width="324" height="22" rx="3" fill="#fef9c3"/>
  <text x="446" y="124" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">エンドポイント時間料金</text>
  <text x="748" y="124" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold" text-anchor="end">$0.01 / hr / AZ</text>
  <!-- Monthly estimate -->
  <rect x="438" y="130" width="324" height="17" rx="3" fill="#f8fafc"/>
  <text x="446" y="142" font-family="Arial,sans-serif" font-size="9" fill="#888">1 EP × 2 AZ × 24h × 30日 = $14.40/月</text>
  <!-- Data -->
  <rect x="438" y="149" width="324" height="22" rx="3" fill="#fef9c3"/>
  <text x="446" y="165" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">データ処理料金</text>
  <text x="748" y="165" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold" text-anchor="end">$0.01 / GB</text>
  <text x="446" y="182" font-family="Arial,sans-serif" font-size="9" fill="#888">1TB/月 = $10.24 追加</text>
  <!-- Cost optimization tips -->
  <rect x="430" y="215" width="340" height="155" rx="5" fill="#fff" stroke="#f59e0b" stroke-width="1"/>
  <text x="600" y="234" font-family="Arial,sans-serif" font-size="11" fill="#b45309" text-anchor="middle" font-weight="bold">コスト最適化のヒント</text>
  <text x="446" y="258" font-family="Arial,sans-serif" font-size="10" fill="#555">① 使用する AZ にのみ ENI を作成</text>
  <text x="454" y="274" font-family="Arial,sans-serif" font-size="9" fill="#888">→ 未使用 AZ の EP は削除</text>
  <text x="446" y="294" font-family="Arial,sans-serif" font-size="10" fill="#555">② 複数 VPC は TGW で集約 + EP 共有</text>
  <text x="454" y="310" font-family="Arial,sans-serif" font-size="9" fill="#888">→ EP 数を最小化（後述アーキテクチャ参照）</text>
  <text x="446" y="330" font-family="Arial,sans-serif" font-size="10" fill="#555">③ S3/DDB は Gateway EP を優先使用</text>
  <text x="454" y="346" font-family="Arial,sans-serif" font-size="9" fill="#888">→ Interface EP より Gateway EP が安い</text>
  <text x="446" y="366" font-family="Arial,sans-serif" font-size="9" fill="#b45309" font-weight="bold">例外: オンプレや TGW 経由が必要なら Interface EP 一択</text>
</svg>

<!--
Gateway EP は完全無料です。大量の S3 アクセスがある場合は Gateway EP を使わないと NAT GW 経由で大きなコストが発生します。Interface EP は使用する AZ 数を最小化することでコスト最適化できます。
-->

---

# 比較③ — セキュリティモデル

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="26" font-family="Arial,sans-serif" font-size="14" fill="#7b5ea7" font-weight="bold" text-anchor="middle">セキュリティモデル比較</text>
  <!-- LEFT: Gateway Security -->
  <rect x="10" y="38" width="385" height="348" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="10" y="38" width="385" height="32" rx="8" fill="#7b5ea7"/>
  <text x="202" y="59" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <!-- Control layers -->
  <text x="25" y="86" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">アクセス制御レイヤー</text>
  <!-- Layer 1 -->
  <rect x="22" y="93" width="365" height="48" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <rect x="22" y="93" width="8" height="48" rx="2" fill="#7b5ea7"/>
  <text x="40" y="112" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">① ルートテーブル</text>
  <text x="40" y="130" font-family="Arial,sans-serif" font-size="9" fill="#555">サブネット単位で S3/DDB へのルートを制御。未エントリのサブネットは EP を通らない。</text>
  <!-- Layer 2 -->
  <rect x="22" y="149" width="365" height="48" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <rect x="22" y="149" width="8" height="48" rx="2" fill="#7b5ea7"/>
  <text x="40" y="168" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">② VPC Endpoint Policy</text>
  <text x="40" y="186" font-family="Arial,sans-serif" font-size="9" fill="#555">エンドポイントを通過するリクエストを制限。Principal / Action / Resource / Condition 指定可。</text>
  <!-- Layer 3 -->
  <rect x="22" y="205" width="365" height="48" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <rect x="22" y="205" width="8" height="48" rx="2" fill="#7b5ea7"/>
  <text x="40" y="224" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">③ S3 Bucket / DDB Table Policy</text>
  <text x="40" y="242" font-family="Arial,sans-serif" font-size="9" fill="#555">aws:sourceVpce 条件で EP 経由のみ許可。インターネット経由アクセスを完全遮断できる。</text>
  <!-- Layer 4 -->
  <rect x="22" y="261" width="365" height="40" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <rect x="22" y="261" width="8" height="40" rx="2" fill="#7b5ea7"/>
  <text x="40" y="277" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">④ IAM Policy (Principal の権限)</text>
  <text x="40" y="292" font-family="Arial,sans-serif" font-size="9" fill="#555">通常の IAM 制御。Role / User の s3:* / dynamodb:* 権限で最小権限原則を適用。</text>
  <!-- Limitation note -->
  <rect x="22" y="312" width="365" height="60" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="204" y="330" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" text-anchor="middle" font-weight="bold">制限事項</text>
  <text x="30" y="348" font-family="Arial,sans-serif" font-size="9" fill="#555">・セキュリティグループ (SG) は適用不可</text>
  <text x="30" y="364" font-family="Arial,sans-serif" font-size="9" fill="#555">・オンプレからのアクセスに Bucket Policy が必要 (Endpoint Policy は効かない)</text>
  <!-- RIGHT: Interface Security -->
  <rect x="405" y="38" width="385" height="348" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <rect x="405" y="38" width="385" height="32" rx="8" fill="#10b981"/>
  <text x="597" y="59" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint</text>
  <!-- Control layers -->
  <text x="420" y="86" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="bold">アクセス制御レイヤー</text>
  <!-- Layer 1 -->
  <rect x="417" y="93" width="365" height="40" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <rect x="417" y="93" width="8" height="40" rx="2" fill="#10b981"/>
  <text x="435" y="110" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">① セキュリティグループ (ENI)</text>
  <text x="435" y="126" font-family="Arial,sans-serif" font-size="9" fill="#555">ENI へのインバウンドをポート・プロトコル・SG 参照で制御。レイヤー別の精細制御が可能。</text>
  <!-- Layer 2 -->
  <rect x="417" y="141" width="365" height="40" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <rect x="417" y="141" width="8" height="40" rx="2" fill="#10b981"/>
  <text x="435" y="158" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">② VPC Endpoint Policy</text>
  <text x="435" y="174" font-family="Arial,sans-serif" font-size="9" fill="#555">Gateway EP と同様の JSON ポリシー。通過リクエストの Principal/Action/Resource を制限。</text>
  <!-- Layer 3 -->
  <rect x="417" y="189" width="365" height="40" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <rect x="417" y="189" width="8" height="40" rx="2" fill="#10b981"/>
  <text x="435" y="206" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">③ サービス側 Resource Policy</text>
  <text x="435" y="222" font-family="Arial,sans-serif" font-size="9" fill="#555">aws:sourceVpce 条件で制御可能（サービスに Resource Policy がある場合）。</text>
  <!-- Layer 4 -->
  <rect x="417" y="237" width="365" height="40" rx="4" fill="#fff" stroke="#10b981" stroke-width="1"/>
  <rect x="417" y="237" width="8" height="40" rx="2" fill="#10b981"/>
  <text x="435" y="254" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">④ IAM Policy</text>
  <text x="435" y="270" font-family="Arial,sans-serif" font-size="9" fill="#555">最小権限の IAM ロール/ポリシー。ec2:*, ssm:* 等を必要最小限に絞る。</text>
  <!-- Advantage note -->
  <rect x="417" y="285" width="365" height="88" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="600" y="303" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Gateway EP との差別化ポイント</text>
  <text x="425" y="323" font-family="Arial,sans-serif" font-size="9" fill="#555">・SG による送信元 IP / SG 参照フィルタ（細粒度）</text>
  <text x="425" y="341" font-family="Arial,sans-serif" font-size="9" fill="#555">・SG フローログで接続監査が容易</text>
  <text x="425" y="359" font-family="Arial,sans-serif" font-size="9" fill="#555">・アプリチームと NW チームで責任分離しやすい</text>
  <text x="425" y="365" font-family="Arial,sans-serif" font-size="9" fill="#888">　(SG=アプリ / EP Policy=NW / IAM=セキュリティ)</text>
</svg>

<!--
Gateway EP はルートテーブル + EP Policy + Bucket Policy の 3 層。Interface EP は SG + EP Policy + Resource Policy + IAM の 4 層でより細粒度な制御が可能です。
-->

---

# 比較④ — ユースケース選定フロー

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">ユースケース別 エンドポイント選定フロー</text>
  <!-- START -->
  <rect x="330" y="34" width="140" height="32" rx="16" fill="#7b5ea7"/>
  <text x="400" y="55" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">AWS サービスに接続したい</text>
  <!-- Arrow down -->
  <line x1="400" y1="66" x2="400" y2="84" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,80 400,88 406,80" fill="#555"/>
  <!-- Q1: S3 or DDB? -->
  <rect x="262" y="88" width="276" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="109" font-family="Arial,sans-serif" font-size="11" fill="#b45309" text-anchor="middle" font-weight="bold">対象は S3 または DynamoDB?</text>
  <!-- YES branch left -->
  <line x1="262" y1="104" x2="180" y2="104" stroke="#555" stroke-width="1.5"/>
  <polygon points="176,98 168,104 176,110" fill="#555"/>
  <text x="220" y="98" font-family="Arial,sans-serif" font-size="10" fill="#10b981" font-weight="bold">YES</text>
  <!-- Q2: On-prem/TGW needed? -->
  <rect x="24" y="88" width="144" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="96" y="101" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">オンプレ/TGW</text>
  <text x="96" y="114" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">経由が必要?</text>
  <!-- Q2 NO answer: Gateway -->
  <line x1="96" y1="120" x2="96" y2="148" stroke="#555" stroke-width="1.5"/>
  <polygon points="90,144 96,152 102,144" fill="#555"/>
  <text x="110" y="140" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" font-weight="bold">NO</text>
  <rect x="24" y="152" width="144" height="44" rx="6" fill="#10b981" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
  <text x="96" y="170" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Gateway EP</text>
  <text x="96" y="186" font-family="Arial,sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">無料 / 高速 / シンプル</text>
  <!-- Q2 YES: also Interface -->
  <line x1="24" y1="104" x2="8" y2="104" stroke="#555" stroke-width="1.5"/>
  <line x1="8" y1="104" x2="8" y2="228" stroke="#555" stroke-width="1.5"/>
  <line x1="8" y1="228" x2="96" y2="228" stroke="#555" stroke-width="1.5"/>
  <polygon points="92,222 104,228 92,234" fill="#555"/>
  <text x="2" y="170" font-family="Arial,sans-serif" font-size="10" fill="#10b981" font-weight="bold" transform="rotate(-90,14,170)">YES</text>
  <rect x="24" y="228" width="144" height="44" rx="6" fill="#f59e0b" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
  <text x="96" y="246" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Interface EP</text>
  <text x="96" y="261" font-family="Arial,sans-serif" font-size="9" fill="#fef9c3" text-anchor="middle">S3 も Interface EP 可</text>
  <!-- NO branch right from Q1 -->
  <line x1="538" y1="104" x2="608" y2="104" stroke="#555" stroke-width="1.5"/>
  <polygon points="604,98 616,104 604,110" fill="#555"/>
  <text x="572" y="98" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" font-weight="bold">NO</text>
  <!-- Always Interface EP -->
  <rect x="616" y="88" width="170" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="701" y="101" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Interface EP 対応</text>
  <text x="701" y="114" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">サービスか?</text>
  <line x1="701" y1="120" x2="701" y2="148" stroke="#555" stroke-width="1.5"/>
  <polygon points="695,144 701,152 707,144" fill="#555"/>
  <text x="715" y="140" font-family="Arial,sans-serif" font-size="10" fill="#10b981" font-weight="bold">YES</text>
  <rect x="628" y="152" width="144" height="44" rx="6" fill="#10b981" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
  <text x="700" y="170" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Interface EP</text>
  <text x="700" y="186" font-family="Arial,sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">ENI + SG + DNS</text>
  <!-- NO: Not supported -->
  <line x1="786" y1="104" x2="792" y2="104" stroke="#555" stroke-width="1.5"/>
  <line x1="792" y1="104" x2="792" y2="218" stroke="#555" stroke-width="1.5"/>
  <line x1="792" y1="218" x2="710" y2="218" stroke="#555" stroke-width="1.5"/>
  <polygon points="714,212 702,218 714,224" fill="#555"/>
  <text x="793" y="165" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" font-weight="bold" transform="rotate(-90,793,165)">NO</text>
  <rect x="628" y="218" width="144" height="44" rx="6" fill="#ef4444" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
  <text x="700" y="236" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">EP 非対応</text>
  <text x="700" y="252" font-family="Arial,sans-serif" font-size="9" fill="#fecaca" text-anchor="middle">IGW/NAT を使用</text>
  <!-- Summary decision table at bottom -->
  <rect x="24" y="300" width="752" height="88" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
  <rect x="24" y="300" width="752" height="24" fill="#6b7280"/>
  <text x="400" y="317" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">選定サマリー</text>
  <!-- 3 columns -->
  <line x1="274" y1="324" x2="274" y2="388" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="524" y1="324" x2="524" y2="388" stroke="#e5e7eb" stroke-width="1"/>
  <text x="149" y="342" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle" font-weight="bold">Gateway EP を選ぶ場合</text>
  <text x="149" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・VPC 内から S3/DDB にアクセス</text>
  <text x="149" y="374" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・コストを最小化したい</text>
  <text x="399" y="342" font-family="Arial,sans-serif" font-size="10" fill="#f59e0b" text-anchor="middle" font-weight="bold">Interface EP を選ぶ場合</text>
  <text x="399" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・オンプレ/TGW 経由が必要</text>
  <text x="399" y="374" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・S3/DDB 以外の AWS サービス</text>
  <text x="649" y="342" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">両方使う場合</text>
  <text x="649" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・Gateway EP (S3/DDB) + Interface EP</text>
  <text x="649" y="374" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">・(他サービス) を組み合わせる</text>
</svg>

<!--
S3/DDB + VPC 内のみのアクセス → Gateway EP が第一選択。オンプレ経由や他サービス → Interface EP。両方組み合わせるのが現実的なアーキテクチャです。
-->

---

# PrivateLink — Consumer / Provider アーキテクチャ

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">PrivateLink — Consumer / Provider アーキテクチャ</text>
  <!-- Consumer VPC (left) -->
  <rect x="15" y="35" width="330" height="320" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="15" y="35" width="330" height="28" rx="8" fill="#7b5ea7"/>
  <text x="180" y="54" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Consumer VPC (Account A)</text>
  <!-- Consumer EC2 -->
  <rect x="32" y="78" width="130" height="55" rx="5" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="32" y="78" width="130" height="18" rx="5" fill="#7b5ea7"/>
  <text x="97" y="91" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">EC2 (Client App)</text>
  <text x="97" y="112" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">10.0.1.10</text>
  <text x="97" y="125" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-app</text>
  <!-- Interface Endpoint in Consumer -->
  <rect x="195" y="78" width="140" height="70" rx="5" fill="#fff" stroke="#10b981" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.12))"/>
  <rect x="195" y="78" width="140" height="18" rx="5" fill="#10b981"/>
  <text x="265" y="91" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">Interface Endpoint</text>
  <text x="265" y="110" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">ENI: 10.0.1.50</text>
  <text x="265" y="124" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-ep | vpce-XXXX</text>
  <text x="265" y="138" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">com.amazonaws.vpce....</text>
  <!-- Arrow EC2 to EP -->
  <line x1="162" y1="105" x2="193" y2="105" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="189,99 201,105 189,111" fill="#7b5ea7"/>
  <!-- DNS box in Consumer -->
  <rect x="32" y="165" width="303" height="50" rx="5" fill="#fff9e6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="183" y="183" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">DNS (Private DNS 有効)</text>
  <text x="42" y="203" font-family="monospace,Arial" font-size="9" fill="#333">my-service.example.com  →  10.0.1.50</text>
  <!-- EP Policy -->
  <rect x="32" y="230" width="303" height="40" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="183" y="246" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">VPC Endpoint Policy</text>
  <text x="183" y="262" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Consumer 側のアクセス制御 (Endpoint を通す通信を制限)</text>
  <!-- Acceptance -->
  <rect x="32" y="282" width="303" height="55" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <text x="42" y="300" font-family="Arial,sans-serif" font-size="10" fill="#555" font-weight="bold">接続リクエストと承認フロー</text>
  <text x="42" y="318" font-family="Arial,sans-serif" font-size="9" fill="#555">① Consumer: create-vpc-endpoint (サービス名を指定)</text>
  <text x="42" y="332" font-family="Arial,sans-serif" font-size="9" fill="#555">② Provider: accept-vpc-endpoint-connections (手動/自動)</text>
  <!-- PrivateLink backbone (center) -->
  <rect x="352" y="130" width="96" height="130" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
  <text x="400" y="155" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">AWS</text>
  <text x="400" y="170" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">PrivateLink</text>
  <text x="400" y="190" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Backbone</text>
  <text x="400" y="210" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Network</text>
  <text x="400" y="228" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Isolation</text>
  <text x="400" y="245" font-family="Arial,sans-serif" font-size="9" fill="#0369a1" text-anchor="middle" font-weight="bold">E2E Encrypted</text>
  <!-- Arrow EP to PrivateLink -->
  <line x1="335" y1="112" x2="350" y2="175" stroke="#10b981" stroke-width="2"/>
  <polygon points="344,172 354,182 358,170" fill="#10b981"/>
  <!-- Arrow PrivateLink to Provider -->
  <line x1="448" y1="175" x2="458" y2="145" stroke="#10b981" stroke-width="2"/>
  <polygon points="454,140 462,152 466,140" fill="#10b981"/>
  <!-- Provider VPC (right) -->
  <rect x="455" y="35" width="330" height="320" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <rect x="455" y="35" width="330" height="28" rx="8" fill="#ff9900"/>
  <text x="620" y="54" font-family="Arial,sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">Provider VPC (Account B)</text>
  <!-- NLB -->
  <rect x="470" y="78" width="130" height="55" rx="5" fill="#fff" stroke="#ff9900" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.12))"/>
  <rect x="470" y="78" width="130" height="18" rx="5" fill="#ff9900"/>
  <text x="535" y="91" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">NLB (Network LB)</text>
  <text x="535" y="110" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">10.1.0.10</text>
  <text x="535" y="125" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">TCP 443 | Internal</text>
  <!-- Service backend -->
  <rect x="635" y="78" width="135" height="55" rx="5" fill="#fff" stroke="#ff9900" stroke-width="1.5"/>
  <rect x="635" y="78" width="135" height="18" rx="5" fill="#ff9900" opacity="0.6"/>
  <text x="702" y="91" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">Service Backend</text>
  <text x="702" y="112" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">ECS / EC2 / Lambda</text>
  <text x="702" y="125" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">10.1.1.20 - 10.1.1.25</text>
  <!-- Arrow NLB to Service -->
  <line x1="600" y1="105" x2="633" y2="105" stroke="#ff9900" stroke-width="2"/>
  <polygon points="629,99 641,105 629,111" fill="#ff9900"/>
  <!-- Endpoint Service -->
  <rect x="470" y="165" width="303" height="50" rx="5" fill="#fff" stroke="#ff9900" stroke-width="1.5"/>
  <text x="621" y="183" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">VPC Endpoint Service</text>
  <text x="480" y="203" font-family="monospace,Arial" font-size="8" fill="#555">com.amazonaws.vpce.ap-northeast-1.vpce-svc-XXXXXX</text>
  <!-- Allowed Principals -->
  <rect x="470" y="230" width="303" height="40" rx="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="621" y="246" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Allowed Principals (許可リスト)</text>
  <text x="621" y="262" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">arn:aws:iam::ACCOUNT_A:root (Consumer を明示許可)</text>
  <!-- Acceptance policy -->
  <rect x="470" y="282" width="303" height="55" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <text x="480" y="300" font-family="Arial,sans-serif" font-size="10" fill="#555" font-weight="bold">接続受け入れポリシー</text>
  <text x="480" y="318" font-family="Arial,sans-serif" font-size="9" fill="#555">Acceptance Required=true: 手動承認</text>
  <text x="480" y="333" font-family="Arial,sans-serif" font-size="9" fill="#555">Acceptance Required=false: 自動承認</text>
  <!-- Note: source IP preservation -->
  <rect x="15" y="365" width="770" height="25" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="382" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">PrivateLink は VPC CIDR が重複していても使用可能 — VPC Peering と異なり IP アドレス重複不可の制約なし</text>
</svg>

<!--
Consumer は Interface EP を通じて Provider の Endpoint Service に接続します。VPC CIDR が重複していても使用可能で、プロバイダー VPC の IP アドレス空間を意識する必要がありません。
-->

---

# PrivateLink — NLB 連携アーキテクチャ詳細

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">PrivateLink — NLB 連携アーキテクチャ詳細</text>
  <!-- Provider VPC -->
  <rect x="415" y="32" width="375" height="350" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <rect x="415" y="32" width="375" height="26" rx="8" fill="#ff9900"/>
  <text x="602" y="50" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Provider VPC (Endpoint Service を公開)</text>
  <!-- Endpoint Service box -->
  <rect x="430" y="65" width="345" height="35" rx="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="602" y="79" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">VPC Endpoint Service</text>
  <text x="602" y="93" font-family="monospace,Arial" font-size="9" fill="#555" text-anchor="middle">com.amazonaws.vpce.ap-northeast-1.vpce-svc-abc123</text>
  <!-- NLB box -->
  <rect x="430" y="112" width="345" height="58" rx="5" fill="#fff" stroke="#ff9900" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.10))"/>
  <rect x="430" y="112" width="345" height="20" rx="5" fill="#ff9900"/>
  <text x="602" y="127" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">Network Load Balancer (NLB)</text>
  <text x="445" y="148" font-family="Arial,sans-serif" font-size="9" fill="#555">Scheme: Internal  |  Type: Network</text>
  <text x="445" y="162" font-family="Arial,sans-serif" font-size="9" fill="#888">AZ-a: 10.1.0.10  AZ-c: 10.1.2.10  (マルチAZ)</text>
  <!-- NLB requirements note -->
  <rect x="430" y="180" width="345" height="55" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="445" y="196" font-family="Arial,sans-serif" font-size="10" fill="#ef4444" font-weight="bold">NLB に関する重要制約</text>
  <text x="445" y="212" font-family="Arial,sans-serif" font-size="9" fill="#555">・PrivateLink は NLB のみサポート (ALB は不可)</text>
  <text x="445" y="226" font-family="Arial,sans-serif" font-size="9" fill="#555">・NLB は Endpoint Service と同じ VPC に配置</text>
  <text x="445" y="240" font-family="Arial,sans-serif" font-size="9" fill="#555">・NLB Target Group: IP / Instance / ALB</text>
  <!-- Service instances -->
  <rect x="430" y="248" width="160" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="510" y="265" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">Target Group (AZ-a)</text>
  <text x="510" y="282" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2: 10.1.1.10</text>
  <text x="510" y="296" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2: 10.1.1.11</text>
  <rect x="613" y="248" width="160" height="55" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="693" y="265" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">Target Group (AZ-c)</text>
  <text x="693" y="282" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2: 10.1.3.10</text>
  <text x="693" y="296" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2: 10.1.3.11</text>
  <!-- Source IP preservation note -->
  <rect x="430" y="316" width="345" height="55" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="445" y="332" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">送信元 IP 保持 (Source IP Preservation)</text>
  <text x="445" y="348" font-family="Arial,sans-serif" font-size="9" fill="#555">・NLB Target Type=IP: Consumer の ENI IP が Source IP</text>
  <text x="445" y="364" font-family="Arial,sans-serif" font-size="9" fill="#555">・NLB Target Type=Instance: NLB の IP が Source IP</text>
  <!-- Consumer VPC (left) -->
  <rect x="10" y="32" width="390" height="350" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="10" y="32" width="390" height="26" rx="8" fill="#7b5ea7"/>
  <text x="205" y="50" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Consumer VPC (エンドポイントを使用)</text>
  <!-- Consumer Subnet AZ-a -->
  <rect x="26" y="65" width="165" height="295" rx="5" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="108" y="83" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle" font-weight="bold">Private Subnet (AZ-a)</text>
  <!-- EC2 -->
  <rect x="38" y="92" width="141" height="50" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="38" y="92" width="141" height="17" rx="4" fill="#7b5ea7"/>
  <text x="108" y="104" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">App Server</text>
  <text x="108" y="125" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">10.0.1.10</text>
  <text x="108" y="136" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-app</text>
  <!-- ENI AZ-a -->
  <rect x="38" y="160" width="141" height="55" rx="4" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="38" y="160" width="141" height="17" rx="4" fill="#10b981"/>
  <text x="108" y="172" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">Interface EP (ENI)</text>
  <text x="108" y="192" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">10.0.1.50</text>
  <text x="108" y="207" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-ep</text>
  <!-- Arrow EC2 to ENI -->
  <line x1="108" y1="142" x2="108" y2="158" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="102,154 108,162 114,154" fill="#7b5ea7"/>
  <!-- Consumer Subnet AZ-c -->
  <rect x="214" y="65" width="165" height="295" rx="5" fill="#e8edff" stroke="#9ca3af" stroke-width="1"/>
  <text x="296" y="83" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle" font-weight="bold">Private Subnet (AZ-c)</text>
  <!-- EC2 AZ-c -->
  <rect x="226" y="92" width="141" height="50" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="226" y="92" width="141" height="17" rx="4" fill="#7b5ea7"/>
  <text x="296" y="104" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">App Server</text>
  <text x="296" y="125" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">10.0.3.20</text>
  <text x="296" y="136" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-app</text>
  <!-- ENI AZ-c -->
  <rect x="226" y="160" width="141" height="55" rx="4" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="226" y="160" width="141" height="17" rx="4" fill="#10b981"/>
  <text x="296" y="172" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle">Interface EP (ENI)</text>
  <text x="296" y="192" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">10.0.3.60</text>
  <text x="296" y="207" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">sg-ep</text>
  <!-- Arrow EC2 to ENI AZ-c -->
  <line x1="296" y1="142" x2="296" y2="158" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="290,154 296,162 302,154" fill="#7b5ea7"/>
  <!-- DNS box -->
  <rect x="26" y="280" width="353" height="40" rx="5" fill="#fff9e6" stroke="#f59e0b" stroke-width="1"/>
  <text x="202" y="296" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">DNS: my-service.com → 10.0.1.50 / 10.0.3.60</text>
  <text x="202" y="312" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">PHZ で AZ アフィニティ — 同じ AZ の ENI IP を優先返却</text>
  <!-- Arrows ENI to backbone -->
  <line x1="179" y1="187" x2="413" y2="141" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="407,136 417,144 408,152" fill="#10b981"/>
</svg>

<!--
PrivateLink の Endpoint Service には Network Load Balancer（NLB）が必須です。ALB は対応していません。NLB の Target Type によって Source IP 保持の動作が異なります。
-->

---

# カスタム PrivateLink サービスの公開手順

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">カスタム PrivateLink サービスの公開手順</text>
  <!-- Provider side (top) -->
  <text x="215" y="46" font-family="Arial,sans-serif" font-size="11" fill="#ff9900" font-weight="bold" text-anchor="middle">Provider 側の作業</text>
  <!-- Step 1 -->
  <rect x="15" y="54" width="195" height="80" rx="6" fill="#fff" stroke="#ff9900" stroke-width="2"/>
  <circle cx="42" cy="80" r="16" fill="#ff9900"/>
  <text x="42" y="85" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">1</text>
  <text x="68" y="74" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">NLB を作成</text>
  <text x="22" y="94" font-family="Arial,sans-serif" font-size="9" fill="#555">Internal NLB を作成</text>
  <text x="22" y="108" font-family="Arial,sans-serif" font-size="9" fill="#555">Target Group にバックエンドを登録</text>
  <text x="22" y="122" font-family="Arial,sans-serif" font-size="9" fill="#888">TCP 443 でサービスを公開</text>
  <!-- Arrow 1 to 2 -->
  <line x1="210" y1="94" x2="228" y2="94" stroke="#ff9900" stroke-width="2"/>
  <polygon points="224,88 236,94 224,100" fill="#ff9900"/>
  <!-- Step 2 -->
  <rect x="230" y="54" width="195" height="80" rx="6" fill="#fff" stroke="#ff9900" stroke-width="2"/>
  <circle cx="257" cy="80" r="16" fill="#ff9900"/>
  <text x="257" y="85" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">2</text>
  <text x="283" y="74" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">Endpoint Service 作成</text>
  <text x="237" y="94" font-family="Arial,sans-serif" font-size="9" fill="#555">NLB を指定して</text>
  <text x="237" y="108" font-family="Arial,sans-serif" font-size="9" fill="#555">Endpoint Service を作成</text>
  <text x="237" y="122" font-family="Arial,sans-serif" font-size="9" fill="#888">サービス名が自動生成される</text>
  <!-- Arrow 2 to 3 -->
  <line x1="425" y1="94" x2="443" y2="94" stroke="#ff9900" stroke-width="2"/>
  <polygon points="439,88 451,94 439,100" fill="#ff9900"/>
  <!-- Step 3 -->
  <rect x="445" y="54" width="195" height="80" rx="6" fill="#fff" stroke="#ff9900" stroke-width="2"/>
  <circle cx="472" cy="80" r="16" fill="#ff9900"/>
  <text x="472" y="85" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
  <text x="498" y="74" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">Allowed Principals 設定</text>
  <text x="452" y="94" font-family="Arial,sans-serif" font-size="9" fill="#555">Consumer アカウントの ARN</text>
  <text x="452" y="108" font-family="Arial,sans-serif" font-size="9" fill="#555">を許可リストに追加</text>
  <text x="452" y="122" font-family="Arial,sans-serif" font-size="9" fill="#888">arn:aws:iam::CONSUMER:root</text>
  <!-- Arrow 3 to Provider-Consumer divider -->
  <line x1="640" y1="94" x2="658" y2="94" stroke="#ff9900" stroke-width="2"/>
  <polygon points="654,88 666,94 654,100" fill="#ff9900"/>
  <!-- Share service name -->
  <rect x="660" y="54" width="130" height="80" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="725" y="76" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">サービス名を</text>
  <text x="725" y="92" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">Consumer に共有</text>
  <text x="725" y="112" font-family="monospace,Arial" font-size="8" fill="#555" text-anchor="middle">com.amazonaws</text>
  <text x="725" y="126" font-family="monospace,Arial" font-size="8" fill="#555" text-anchor="middle">.vpce.svc-XXXX</text>
  <!-- Divider -->
  <line x1="15" y1="150" x2="785" y2="150" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="400" y="166" font-family="Arial,sans-serif" font-size="10" fill="#888" text-anchor="middle">-- Consumer 側の作業 --</text>
  <!-- Consumer side (bottom) -->
  <text x="215" y="185" font-family="Arial,sans-serif" font-size="11" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Consumer 側の作業</text>
  <!-- Step 4 -->
  <rect x="15" y="193" width="195" height="80" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2"/>
  <circle cx="42" cy="219" r="16" fill="#7b5ea7"/>
  <text x="42" y="224" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
  <text x="68" y="213" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">Interface EP 作成</text>
  <text x="22" y="233" font-family="Arial,sans-serif" font-size="9" fill="#555">サービス名を指定して</text>
  <text x="22" y="247" font-family="Arial,sans-serif" font-size="9" fill="#555">VPC EP を作成</text>
  <text x="22" y="261" font-family="Arial,sans-serif" font-size="9" fill="#888">サブネット / SG を指定</text>
  <!-- Arrow 4 to 5 -->
  <line x1="210" y1="233" x2="228" y2="233" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="224,227 236,233 224,239" fill="#7b5ea7"/>
  <!-- Step 5 -->
  <rect x="230" y="193" width="195" height="80" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2"/>
  <circle cx="257" cy="219" r="16" fill="#7b5ea7"/>
  <text x="257" y="224" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
  <text x="283" y="213" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">Provider が接続承認</text>
  <text x="237" y="233" font-family="Arial,sans-serif" font-size="9" fill="#555">Provider: 接続リクエストを</text>
  <text x="237" y="247" font-family="Arial,sans-serif" font-size="9" fill="#555">Accept (手動 or 自動)</text>
  <text x="237" y="261" font-family="Arial,sans-serif" font-size="9" fill="#888">Status: pending → available</text>
  <!-- Arrow 5 to 6 -->
  <line x1="425" y1="233" x2="443" y2="233" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="439,227 451,233 439,239" fill="#7b5ea7"/>
  <!-- Step 6 -->
  <rect x="445" y="193" width="195" height="80" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2"/>
  <circle cx="472" cy="219" r="16" fill="#7b5ea7"/>
  <text x="472" y="224" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">6</text>
  <text x="498" y="213" font-family="Arial,sans-serif" font-size="10" fill="#333" font-weight="bold">DNS 設定 &amp; 接続確認</text>
  <text x="452" y="233" font-family="Arial,sans-serif" font-size="9" fill="#555">Private DNS (推奨) or</text>
  <text x="452" y="247" font-family="Arial,sans-serif" font-size="9" fill="#555">カスタム DNS エントリ追加</text>
  <text x="452" y="261" font-family="Arial,sans-serif" font-size="9" fill="#888">curl でサービスを疎通確認</text>
  <!-- Arrow 6 to Done -->
  <line x1="640" y1="233" x2="658" y2="233" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="654,227 666,233 654,239" fill="#7b5ea7"/>
  <!-- Done -->
  <rect x="660" y="193" width="130" height="80" rx="6" fill="#10b981"/>
  <text x="725" y="228" font-family="Arial,sans-serif" font-size="13" fill="#fff" font-weight="bold" text-anchor="middle">完了</text>
  <text x="725" y="248" font-family="Arial,sans-serif" font-size="10" fill="#d1fae5" text-anchor="middle">PrivateLink 接続</text>
  <text x="725" y="263" font-family="Arial,sans-serif" font-size="10" fill="#d1fae5" text-anchor="middle">確立</text>
  <!-- Bottom notes -->
  <rect x="15" y="290" width="770" height="98" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
  <rect x="15" y="290" width="770" height="22" rx="6" fill="#6b7280"/>
  <text x="400" y="306" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">補足: Terraform / AWS CLI での作成コマンド</text>
  <text x="30" y="326" font-family="monospace,Arial" font-size="9" fill="#555"># Provider: Endpoint Service 作成</text>
  <text x="30" y="341" font-family="monospace,Arial" font-size="9" fill="#7b5ea7">aws ec2 create-vpc-endpoint-service-configuration --network-load-balancer-arns arn:aws:elasticloadbalancing:...</text>
  <text x="30" y="356" font-family="monospace,Arial" font-size="9" fill="#555"># Consumer: Interface EP 作成</text>
  <text x="30" y="371" font-family="monospace,Arial" font-size="9" fill="#059669">aws ec2 create-vpc-endpoint --vpc-id vpc-XXX --service-name com.amazonaws.vpce... --subnet-ids subnet-XXX</text>
</svg>

<!--
Provider 側が NLB + Endpoint Service を作成し、Consumer 側が Interface EP を作成して接続リクエストを送ります。Provider が承認すると接続が確立します。Terraform では aws_vpc_endpoint_service / aws_vpc_endpoint リソースで管理できます。
-->

---

# VPC Endpoint Policy — 設計方針（1/2）

> *明示的拒否でデータ漏洩を防ぐ—Allow-Listが基本方針*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" font-family="sans-serif" font-size="19" font-weight="bold" fill="#f9a825" text-anchor="middle">VPC Endpoint Policy 設計方針</text>
  <rect x="40" y="56" width="720" height="60" rx="10" fill="#3d2000" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="83" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f9a825" text-anchor="middle">基本原則: デフォルトは Allow * — 必ず制限すること</text>
  <text x="400" y="103" font-family="sans-serif" font-size="12" fill="#ffd580" text-anchor="middle">Principal / Action / Resource / Condition を組み合わせて最小権限を実現</text>
  <rect x="40" y="130" width="220" height="130" rx="10" fill="#0a3d62" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="150" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#00bcd4" text-anchor="middle">Principal 制御</text>
  <text x="150" y="178" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">aws:PrincipalAccount</text>
  <text x="150" y="196" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">自アカウントのみ</text>
  <text x="150" y="214" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">aws:PrincipalOrgID</text>
  <text x="150" y="232" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Organizations全体</text>
  <rect x="290" y="130" width="220" height="130" rx="10" fill="#1a3d20" stroke="#4caf50" stroke-width="1.5"/>
  <text x="400" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4caf50" text-anchor="middle">Action 制御</text>
  <text x="400" y="178" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">ReadOnly: s3:Get*, s3:List*</text>
  <text x="400" y="196" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">読み取り専用を制限</text>
  <text x="400" y="214" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">特定操作のみ許可</text>
  <text x="400" y="232" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Write禁止など</text>
  <rect x="540" y="130" width="220" height="130" rx="10" fill="#3d0a0a" stroke="#f44336" stroke-width="1.5"/>
  <text x="650" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f44336" text-anchor="middle">Resource 制御</text>
  <text x="650" y="178" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">特定バケットARNのみ</text>
  <text x="650" y="196" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">arn:aws:s3:::my-bucket/*</text>
  <text x="650" y="214" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">特定テーブルARNのみ</text>
  <text x="650" y="232" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">arn:aws:dynamodb:::table/x</text>
  <rect x="40" y="275" width="720" height="100" rx="10" fill="#1a1a3e" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="400" y="300" font-family="sans-serif" font-size="13" font-weight="bold" fill="#9c27b0" text-anchor="middle">推奨: EP Policy + Bucket Policy の二重制御</text>
  <text x="400" y="322" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">EP Policy: エンドポイント通過時の制限 (通過ゲート)</text>
  <text x="400" y="342" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Bucket Policy: aws:sourceVpce Deny で EP経由以外を完全拒否</text>
  <text x="400" y="362" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle">→ 多層防御でデータの持ち出しを防止</text>
</svg>
- **基本原則: 最小権限（Least Privilege）**
- デフォルトは `Allow *` — 意図的に制限する必要がある
- Principal / Action / Resource / Condition を組み合わせて制御

<!--
Endpoint Policy は JSON IAM ポリシーと同じ構文です。デフォルトは全許可なので、機密データを扱うエンドポイントは必ず制限します。Gateway EP と Interface EP でポリシーの適用タイミングが異なります（Gateway: ルーティング時、Interface: 接続時）。
-->

---

# VPC Endpoint Policy — 設計方針（2/2）

> *Principal制限+Resource制限の二重ガードで最小権限を実現*

- **推奨アプローチ**
- 特定アカウント・サービスのみ許可: `aws:PrincipalAccount` 条件
- 特定 Action のみ許可: `s3:GetObject` 等の必要な操作のみ
- 特定リソースのみ許可: ARN で制限（例: `arn:aws:s3:::my-bucket/*`）

<!--
Endpoint Policy は JSON IAM ポリシーと同じ構文です。デフォルトは全許可なので、機密データを扱うエンドポイントは必ず制限します。Gateway EP と Interface EP でポリシーの適用タイミングが異なります（Gateway: ルーティング時、Interface: 接続時）。
-->

---

# S3 Bucket Policy との連携

- **EP 経由のみアクセスを許可する最強パターン**


---

# S3 Bucket Policy との連携（コード例）

```json
# S3 Bucket Policy: VPC Endpoint 経由以外を完全拒否
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyNonVPCE",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::my-secure-bucket",
        "arn:aws:s3:::my-secure-bucket/*"
      ],
      "Condition": {
        "StringNotEquals": {
          "aws:sourceVpce": "vpce-0abc1234def56789"
        }
      }
    }
  ]
}
```


---

# マルチ VPC / マルチアカウント 設計パターン

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">マルチ VPC / マルチアカウント PrivateLink パターン</text>
  <!-- Account A (left) - 3 Consumer VPCs -->
  <rect x="10" y="34" width="355" height="348" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="10" y="34" width="355" height="26" rx="8" fill="#7b5ea7"/>
  <text x="187" y="52" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Account A (Consumer)</text>
  <!-- VPC1 -->
  <rect x="22" y="68" width="155" height="100" rx="5" fill="#e8edff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="99" y="84" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">VPC-1 (10.0.0.0/16)</text>
  <rect x="32" y="92" width="135" height="34" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="99" y="110" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">App EC2</text>
  <rect x="32" y="132" width="135" height="28" rx="4" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="99" y="151" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">Interface EP (ENI)</text>
  <!-- VPC2 -->
  <rect x="192" y="68" width="155" height="100" rx="5" fill="#e8edff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="269" y="84" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">VPC-2 (10.1.0.0/16)</text>
  <rect x="202" y="92" width="135" height="34" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="269" y="110" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">App EC2</text>
  <rect x="202" y="132" width="135" height="28" rx="4" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="269" y="151" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">Interface EP (ENI)</text>
  <!-- VPC3 -->
  <rect x="22" y="182" width="155" height="100" rx="5" fill="#e8edff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="99" y="198" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">VPC-3 (172.16.0.0/16)</text>
  <rect x="32" y="206" width="135" height="34" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="99" y="224" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">App EC2</text>
  <rect x="32" y="246" width="135" height="28" rx="4" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="99" y="265" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">Interface EP (ENI)</text>
  <!-- Note about IP overlap -->
  <rect x="22" y="295" width="325" height="75" rx="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="184" y="313" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">VPC CIDR 重複でも使用可能</text>
  <text x="34" y="331" font-family="Arial,sans-serif" font-size="9" fill="#555">PrivateLink は IP アドレス重複を許容</text>
  <text x="34" y="347" font-family="Arial,sans-serif" font-size="9" fill="#555">VPC Peering とは異なりルーティング不要</text>
  <text x="34" y="363" font-family="Arial,sans-serif" font-size="9" fill="#555">Consumer ごとに独立した Interface EP が必要</text>
  <!-- PrivateLink backbone (center) -->
  <rect x="370" y="140" width="60" height="120" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
  <text x="400" y="168" font-family="Arial,sans-serif" font-size="9" fill="#0369a1" text-anchor="middle" font-weight="bold">AWS</text>
  <text x="400" y="183" font-family="Arial,sans-serif" font-size="9" fill="#0369a1" text-anchor="middle" font-weight="bold">Private</text>
  <text x="400" y="198" font-family="Arial,sans-serif" font-size="9" fill="#0369a1" text-anchor="middle" font-weight="bold">Link</text>
  <text x="400" y="218" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Backbone</text>
  <text x="400" y="232" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Network</text>
  <!-- Arrows from Consumer VPCs to backbone -->
  <line x1="167" y1="146" x2="368" y2="183" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="363,179 372,187 370,176" fill="#10b981"/>
  <line x1="337" y1="146" x2="370" y2="190" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="366,186 374,194 373,183" fill="#10b981"/>
  <line x1="167" y1="260" x2="368" y2="218" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="363,213 372,221 369,210" fill="#10b981"/>
  <!-- Arrow backbone to Provider -->
  <line x1="430" y1="200" x2="450" y2="200" stroke="#10b981" stroke-width="2"/>
  <polygon points="446,194 458,200 446,206" fill="#10b981"/>
  <!-- Account B (right) - Provider -->
  <rect x="450" y="34" width="340" height="348" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <rect x="450" y="34" width="340" height="26" rx="8" fill="#ff9900"/>
  <text x="620" y="52" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Account B (Provider / SaaS)</text>
  <!-- Provider VPC -->
  <rect x="462" y="68" width="315" height="210" rx="5" fill="#fff9e6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="619" y="86" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Provider VPC</text>
  <!-- Endpoint Service -->
  <rect x="474" y="95" width="290" height="38" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="619" y="112" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Endpoint Service</text>
  <text x="619" y="126" font-family="monospace,Arial" font-size="8" fill="#888" text-anchor="middle">com.amazonaws.vpce.*.vpce-svc-XXXX</text>
  <!-- NLB -->
  <rect x="474" y="143" width="135" height="45" rx="4" fill="#fff" stroke="#ff9900" stroke-width="1.5"/>
  <text x="541" y="163" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">NLB</text>
  <text x="541" y="178" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">Internal</text>
  <!-- Service -->
  <rect x="627" y="143" width="135" height="45" rx="4" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="694" y="163" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">Service Backend</text>
  <text x="694" y="178" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">ECS / EC2</text>
  <line x1="609" y1="165" x2="625" y2="165" stroke="#ff9900" stroke-width="1.5"/>
  <polygon points="621,159 633,165 621,171" fill="#ff9900"/>
  <!-- Allowed Principals list -->
  <rect x="474" y="200" width="290" height="70" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="619" y="218" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Allowed Principals</text>
  <text x="482" y="236" font-family="monospace,Arial" font-size="9" fill="#333">arn:aws:iam::ACCOUNT_A:root</text>
  <text x="482" y="252" font-family="monospace,Arial" font-size="9" fill="#888">(Account A 全体を許可)</text>
  <text x="482" y="266" font-family="monospace,Arial" font-size="9" fill="#888">or: specific IAM Role / User</text>
  <!-- AWS Marketplace note -->
  <rect x="462" y="292" width="315" height="80" rx="5" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="619" y="310" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">AWS Marketplace でのサービス公開</text>
  <text x="474" y="328" font-family="Arial,sans-serif" font-size="9" fill="#555">Endpoint Service を Marketplace に登録すると</text>
  <text x="474" y="344" font-family="Arial,sans-serif" font-size="9" fill="#555">不特定多数の Consumer に安全にサービスを提供</text>
  <text x="474" y="360" font-family="Arial,sans-serif" font-size="9" fill="#555">例: Datadog / Splunk / Snowflake 等が採用</text>
</svg>

<!--
PrivateLink は VPC CIDR 重複を許容するため、マルチアカウント環境で異なるアカウントの VPC が同じ CIDR を持つケースでも問題なく使用できます。Consumer ごとに独立した Interface EP が必要です。
-->

---

# Transit Gateway + PrivateLink — 集中型アーキテクチャ

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Transit Gateway + Interface Endpoint — 集中型アーキテクチャ</text>
  <!-- Shared Services VPC (center top) -->
  <rect x="270" y="34" width="260" height="175" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <rect x="270" y="34" width="260" height="26" rx="8" fill="#10b981"/>
  <text x="400" y="52" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Shared Services VPC (Inspection VPC)</text>
  <!-- Multiple Interface EPs -->
  <rect x="284" y="70" width="232" height="60" rx="5" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="400" y="87" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">Interface Endpoints (集約管理)</text>
  <text x="292" y="104" font-family="Arial,sans-serif" font-size="9" fill="#555">SSM EP | Secrets EP | ECR EP | KMS EP</text>
  <text x="292" y="119" font-family="Arial,sans-serif" font-size="9" fill="#555">S3 EP (interface) | CloudWatch EP | STS EP</text>
  <!-- Gateway EPs -->
  <rect x="284" y="142" width="232" height="50" rx="5" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="400" y="159" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Gateway Endpoints</text>
  <text x="292" y="177" font-family="Arial,sans-serif" font-size="9" fill="#555">S3 Gateway EP | DynamoDB Gateway EP</text>
  <!-- TGW (center middle) -->
  <rect x="330" y="228" width="140" height="50" rx="8" fill="#ff9900" style="filter:drop-shadow(2px 2px 6px rgba(0,0,0,0.15))"/>
  <text x="400" y="249" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Transit Gateway</text>
  <text x="400" y="265" font-family="Arial,sans-serif" font-size="9" fill="#ffe4a0" text-anchor="middle">tgw-XXXXXXXX</text>
  <!-- Arrow Shared VPC to TGW -->
  <line x1="400" y1="209" x2="400" y2="226" stroke="#10b981" stroke-width="2"/>
  <polygon points="394,222 400,230 406,222" fill="#10b981"/>
  <!-- Spoke VPC 1 (left) -->
  <rect x="15" y="295" width="170" height="90" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="100" y="314" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-1</text>
  <text x="100" y="328" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.10.0.0/16</text>
  <rect x="28" y="335" width="144" height="30" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="100" y="354" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (App / Dev)</text>
  <!-- Spoke VPC 2 (center-left) -->
  <rect x="200" y="295" width="155" height="90" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="277" y="314" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-2</text>
  <text x="277" y="328" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.20.0.0/16</text>
  <rect x="213" y="335" width="129" height="30" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="277" y="354" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (Prod)</text>
  <!-- Spoke VPC 3 (center-right) -->
  <rect x="445" y="295" width="155" height="90" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="522" y="314" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-3</text>
  <text x="522" y="328" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">172.16.0.0/16</text>
  <rect x="458" y="335" width="129" height="30" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="522" y="354" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (Staging)</text>
  <!-- On-prem (right) -->
  <rect x="615" y="295" width="170" height="90" rx="6" fill="#f1f5f9" stroke="#6b7280" stroke-width="1.5"/>
  <text x="700" y="314" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle" font-weight="bold">On-Premises</text>
  <text x="700" y="328" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">192.168.0.0/16</text>
  <rect x="628" y="335" width="144" height="30" rx="4" fill="#fff" stroke="#6b7280" stroke-width="1"/>
  <text x="700" y="354" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">DC Server / VPN</text>
  <!-- Arrows from Spoke VPCs and On-prem to TGW -->
  <line x1="100" y1="295" x2="340" y2="278" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="335,273 345,280 336,288" fill="#7b5ea7"/>
  <line x1="277" y1="295" x2="358" y2="278" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="354,273 363,281 356,288" fill="#7b5ea7"/>
  <line x1="522" y1="295" x2="442" y2="278" stroke="#7b5ea7" stroke-width="1.5"/>
  <polygon points="436,273 447,280 446,288" fill="#7b5ea7"/>
  <line x1="700" y1="295" x2="460" y2="278" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="453,273 464,280 463,288" fill="#6b7280"/>
  <!-- AWS Services (right top) -->
  <rect x="555" y="34" width="235" height="175" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <rect x="555" y="34" width="235" height="26" rx="8" fill="#ff9900"/>
  <text x="672" y="52" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">AWS Services</text>
  <rect x="567" y="68" width="211" height="130" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
  <text x="672" y="88" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle">SSM / Secrets Manager / ECR</text>
  <text x="672" y="104" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle">S3 / KMS / CloudWatch / STS</text>
  <text x="672" y="128" font-family="Arial,sans-serif" font-size="10" fill="#10b981" font-weight="bold" text-anchor="middle">PrivateLink Backbone</text>
  <text x="672" y="145" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">全て Interface EP 経由でアクセス</text>
  <text x="672" y="160" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">インターネット不使用</text>
  <!-- Arrow Shared VPC to AWS Services -->
  <line x1="530" y1="110" x2="553" y2="110" stroke="#10b981" stroke-width="2"/>
  <polygon points="549,104 561,110 549,116" fill="#10b981"/>
  <!-- Key benefit box at bottom -->
  <rect x="15" y="394" width="770" height="0" rx="4"/>
  <!-- Benefit Note -->
  <rect x="15" y="392" width="770" height="0" rx="4"/>
</svg>

<!--
TGW を中心にした Hub-and-Spoke アーキテクチャでは、共有サービス VPC に Interface EP を集約し、すべての Spoke VPC および On-Premises から TGW 経由でアクセスさせます。EP 数を最小化できるコスト最適化パターンです。
-->

---

# Hub-and-Spoke — Interface Endpoint 集約

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Hub-and-Spoke — Interface Endpoint 集約パターン</text>
  <!-- Hub VPC (center) -->
  <rect x="295" y="148" width="210" height="135" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2.5" style="filter:drop-shadow(2px 2px 6px rgba(0,0,0,0.12))"/>
  <rect x="295" y="148" width="210" height="28" rx="8" fill="#10b981"/>
  <text x="400" y="168" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">Hub VPC (Shared Services)</text>
  <text x="400" y="196" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">Interface Endpoints 集約管理</text>
  <rect x="310" y="204" width="180" height="22" rx="3" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="219" font-family="monospace,Arial" font-size="8" fill="#059669" text-anchor="middle">SSM | ECR | KMS | Secrets | STS</text>
  <rect x="310" y="230" width="180" height="22" rx="3" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="400" y="245" font-family="monospace,Arial" font-size="8" fill="#059669" text-anchor="middle">CloudWatch | S3 (Interface) | ...</text>
  <text x="400" y="270" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">R53 Resolver Inbound EP もここに集約</text>
  <!-- TGW in center -->
  <ellipse cx="400" cy="360" rx="55" ry="28" fill="#ff9900" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.15))"/>
  <text x="400" y="356" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Transit</text>
  <text x="400" y="370" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Gateway</text>
  <!-- Arrow Hub to TGW -->
  <line x1="400" y1="283" x2="400" y2="332" stroke="#10b981" stroke-width="2"/>
  <polygon points="394,328 400,336 406,328" fill="#10b981"/>
  <!-- Spoke VPC 1 (top-left) -->
  <rect x="30" y="35" width="160" height="85" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="110" y="54" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-Dev</text>
  <rect x="44" y="64" width="132" height="28" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="110" y="82" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (App Servers)</text>
  <text x="110" y="110" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Endpoint なし</text>
  <!-- Spoke VPC 2 (top-right) -->
  <rect x="610" y="35" width="160" height="85" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="690" y="54" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-Prod</text>
  <rect x="624" y="64" width="132" height="28" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="690" y="82" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (App Servers)</text>
  <text x="690" y="110" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Endpoint なし</text>
  <!-- Spoke VPC 3 (bottom-left) -->
  <rect x="30" y="310" width="160" height="80" rx="6" fill="#f1f5f9" stroke="#6b7280" stroke-width="1.5"/>
  <text x="110" y="330" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle" font-weight="bold">On-Premises</text>
  <rect x="44" y="338" width="132" height="28" rx="4" fill="#fff" stroke="#6b7280" stroke-width="1"/>
  <text x="110" y="356" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">DC Servers</text>
  <text x="110" y="375" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">VPN/DX</text>
  <!-- Spoke VPC 4 (bottom-right) -->
  <rect x="610" y="310" width="160" height="80" rx="6" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="690" y="330" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Spoke VPC-Staging</text>
  <rect x="624" y="338" width="132" height="28" rx="4" fill="#fff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="690" y="356" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 (Test)</text>
  <text x="690" y="375" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Endpoint なし</text>
  <!-- Arrows from spokes to TGW -->
  <line x1="190" y1="77" x2="345" y2="200" stroke="#7b5ea7" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="340,196 349,204 352,194" fill="#7b5ea7"/>
  <line x1="610" y1="77" x2="455" y2="200" stroke="#7b5ea7" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="449,196 457,205 459,194" fill="#7b5ea7"/>
  <line x1="190" y1="350" x2="345" y2="360" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="341,354 353,360 341,366" fill="#6b7280"/>
  <line x1="610" y1="350" x2="455" y2="360" stroke="#7b5ea7" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="451,354 463,360 451,366" fill="#7b5ea7"/>
  <!-- AWS Services (top center) -->
  <rect x="300" y="35" width="200" height="95" rx="6" fill="#fff8f0" stroke="#ff9900" stroke-width="1.5"/>
  <text x="400" y="54" font-family="Arial,sans-serif" font-size="10" fill="#cc7700" text-anchor="middle" font-weight="bold">AWS Services</text>
  <text x="400" y="72" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">PrivateLink Backend</text>
  <text x="400" y="90" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle">S3 / SSM / ECR / KMS / ...</text>
  <text x="400" y="106" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">AWS Backbone Network</text>
  <text x="400" y="122" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">(Internet 不使用)</text>
  <!-- Arrow Hub to AWS Services -->
  <line x1="400" y1="148" x2="400" y2="130" stroke="#10b981" stroke-width="2"/>
  <polygon points="394,126 400,118 406,126" fill="#10b981"/>
  <!-- Cost saving note -->
  <rect x="5" y="388" width="790" height="10" rx="3"/>
</svg>

<!--
Hub VPC（共有サービス VPC）に Interface EP を集約し、Spoke VPC は EP を持たずに TGW 経由で Hub の EP を利用します。ただし Gateway EP は TGW を跨いで共有できないため、各 Spoke VPC に個別の Gateway EP が必要です。
-->

---

# PrivateLink + Direct Connect — オンプレ接続

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Direct Connect + PrivateLink — オンプレ接続パターン</text>
  <!-- On-Premises (left) -->
  <rect x="10" y="40" width="165" height="320" rx="8" fill="#f1f5f9" stroke="#6b7280" stroke-width="2"/>
  <rect x="10" y="40" width="165" height="26" rx="8" fill="#6b7280"/>
  <text x="92" y="58" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">On-Premises</text>
  <!-- DC Servers -->
  <rect x="22" y="76" width="141" height="40" rx="4" fill="#fff" stroke="#6b7280" stroke-width="1"/>
  <text x="92" y="101" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">DC Servers</text>
  <!-- DNS Resolver (on-prem) -->
  <rect x="22" y="130" width="141" height="45" rx="4" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="92" y="149" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">DNS Resolver</text>
  <text x="92" y="165" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">192.168.1.53</text>
  <!-- DX Router -->
  <rect x="22" y="190" width="141" height="40" rx="4" fill="#fff" stroke="#6b7280" stroke-width="1"/>
  <text x="92" y="215" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">DX/VPN Router</text>
  <!-- Note -->
  <rect x="22" y="248" width="141" height="96" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="1"/>
  <text x="92" y="266" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">DNS 課題</text>
  <text x="28" y="284" font-family="Arial,sans-serif" font-size="9" fill="#555">オンプレ DNS は</text>
  <text x="28" y="298" font-family="Arial,sans-serif" font-size="9" fill="#555">PHZ を直接参照</text>
  <text x="28" y="312" font-family="Arial,sans-serif" font-size="9" fill="#555">できない</text>
  <text x="28" y="330" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" font-weight="bold">→ R53 Inbound EP</text>
  <text x="28" y="344" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" font-weight="bold">が必要</text>
  <!-- Direct Connect (center-left) -->
  <rect x="190" y="155" width="120" height="60" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" style="filter:drop-shadow(1px 1px 4px rgba(0,0,0,0.10))"/>
  <text x="250" y="179" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">Direct Connect</text>
  <text x="250" y="195" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">or VPN</text>
  <text x="250" y="208" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Private VIF</text>
  <!-- Arrow On-Prem to DX -->
  <line x1="175" y1="185" x2="188" y2="185" stroke="#6b7280" stroke-width="2"/>
  <polygon points="184,179 196,185 184,191" fill="#6b7280"/>
  <!-- VPC (center) -->
  <rect x="328" y="40" width="270" height="320" rx="8" fill="#f0f4ff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="328" y="40" width="270" height="26" rx="8" fill="#7b5ea7"/>
  <text x="463" y="58" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">AWS VPC</text>
  <!-- R53 Inbound Resolver EP -->
  <rect x="342" y="76" width="242" height="55" rx="5" fill="#fff9e6" stroke="#f59e0b" stroke-width="2"/>
  <text x="463" y="96" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Route 53 Inbound Resolver EP</text>
  <text x="350" y="114" font-family="Arial,sans-serif" font-size="9" fill="#555">ENI: 10.0.0.100 (オンプレ DNS フォワード先)</text>
  <text x="350" y="126" font-family="Arial,sans-serif" font-size="8" fill="#888">オンプレ DNS → 10.0.0.100 (に DNS フォワード) → PHZ 参照</text>
  <!-- Interface EP in VPC -->
  <rect x="342" y="150" width="242" height="65" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="342" y="150" width="242" height="20" rx="5" fill="#10b981"/>
  <text x="463" y="165" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">Interface Endpoint (ENI)</text>
  <text x="350" y="186" font-family="Arial,sans-serif" font-size="9" fill="#059669">10.0.1.50 (SSM), 10.0.1.51 (Secrets), ...</text>
  <text x="350" y="203" font-family="Arial,sans-serif" font-size="8" fill="#888">Private DNS Enabled — PHZ: ssm.*.amazonaws.com</text>
  <!-- PHZ box -->
  <rect x="342" y="230" width="242" height="50" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="463" y="248" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Route 53 Private Hosted Zone</text>
  <text x="350" y="266" font-family="monospace,Arial" font-size="9" fill="#555">ssm.*.amazonaws.com → 10.0.1.50</text>
  <text x="350" y="278" font-family="Arial,sans-serif" font-size="8" fill="#888">VPC に関連付け済み</text>
  <!-- TGW Attachment note -->
  <rect x="342" y="296" width="242" height="55" rx="5" fill="#fff9e6" stroke="#f59e0b" stroke-width="1"/>
  <text x="463" y="313" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Gateway EP は オンプレから利用不可</text>
  <text x="350" y="330" font-family="Arial,sans-serif" font-size="9" fill="#555">Gateway EP はルートテーブルのみ制御</text>
  <text x="350" y="345" font-family="Arial,sans-serif" font-size="9" fill="#555">DX/VPN 経由の通信には適用されない</text>
  <!-- Arrows DX to R53 Inbound and Interface EP -->
  <line x1="310" y1="178" x2="340" y2="104" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="335,100 344,108 341,97" fill="#f59e0b"/>
  <line x1="310" y1="190" x2="340" y2="182" stroke="#10b981" stroke-width="2"/>
  <polygon points="336,176 348,182 336,188" fill="#10b981"/>
  <!-- AWS Services (right) -->
  <rect x="615" y="100" width="175" height="200" rx="8" fill="#fff8f0" stroke="#ff9900" stroke-width="2"/>
  <text x="702" y="120" font-family="Arial,sans-serif" font-size="11" fill="#cc7700" font-weight="bold" text-anchor="middle">AWS Services</text>
  <text x="702" y="140" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">SSM / Secrets / KMS</text>
  <text x="702" y="158" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">CloudWatch / S3 / ECR</text>
  <rect x="627" y="172" width="143" height="30" rx="4" fill="#10b981" opacity="0.15" stroke="#10b981" stroke-width="1"/>
  <text x="698" y="192" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle">PrivateLink</text>
  <text x="698" y="230" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Backbone</text>
  <!-- Arrow Interface EP to AWS Services -->
  <line x1="584" y1="183" x2="613" y2="183" stroke="#10b981" stroke-width="2"/>
  <polygon points="609,177 621,183 609,189" fill="#10b981"/>
</svg>

<!--
Gateway EP は VPC 外からのアクセスに対応していないため、オンプレからの接続には Interface EP が必須です。また Gateway EP の Endpoint Policy はオンプレからのアクセスには適用されない点も重要です。
-->

---

# オンプレミス接続時の DNS 解決フロー

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">オンプレミス接続時の DNS 解決フロー</text>
  <!-- Step numbers flow diagram -->
  <!-- On-prem client -->
  <rect x="15" y="52" width="130" height="60" rx="6" fill="#f1f5f9" stroke="#6b7280" stroke-width="2"/>
  <rect x="15" y="52" width="130" height="22" rx="6" fill="#6b7280"/>
  <text x="80" y="68" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="bold">On-Prem Client</text>
  <text x="80" y="90" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">resolve:</text>
  <text x="80" y="105" font-family="monospace,Arial" font-size="8" fill="#7b5ea7" text-anchor="middle">ssm.*.amazonaws.com</text>
  <!-- Step 1 circle -->
  <circle cx="175" cy="82" r="13" fill="#7b5ea7"/>
  <text x="175" y="87" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">1</text>
  <!-- On-prem DNS -->
  <rect x="192" y="52" width="130" height="60" rx="6" fill="#f1f5f9" stroke="#6b7280" stroke-width="2"/>
  <rect x="192" y="52" width="130" height="22" rx="6" fill="#6b7280"/>
  <text x="257" y="68" font-family="Arial,sans-serif" font-size="10" fill="#fff" text-anchor="middle">On-Prem DNS</text>
  <text x="257" y="90" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">Conditional</text>
  <text x="257" y="105" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">Forwarder</text>
  <!-- Arrow 1 -->
  <line x1="145" y1="82" x2="190" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="186,76 198,82 186,88" fill="#555"/>
  <!-- Step 2 circle -->
  <circle cx="352" cy="82" r="13" fill="#7b5ea7"/>
  <text x="352" y="87" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">2</text>
  <!-- DX/VPN -->
  <rect x="368" y="52" width="100" height="60" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
  <text x="418" y="73" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle" font-weight="bold">DX / VPN</text>
  <text x="418" y="92" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Private VIF</text>
  <text x="418" y="106" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">DNS 転送</text>
  <!-- Arrow 2 -->
  <line x1="322" y1="82" x2="366" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="362,76 374,82 362,88" fill="#555"/>
  <!-- Step 3 circle -->
  <circle cx="498" cy="82" r="13" fill="#7b5ea7"/>
  <text x="498" y="87" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
  <!-- R53 Inbound EP -->
  <rect x="513" y="52" width="140" height="60" rx="6" fill="#fff9e6" stroke="#f59e0b" stroke-width="2"/>
  <rect x="513" y="52" width="140" height="22" rx="6" fill="#f59e0b"/>
  <text x="583" y="68" font-family="Arial,sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">R53 Inbound EP</text>
  <text x="583" y="90" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">10.0.0.100</text>
  <text x="583" y="106" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">ENI in VPC</text>
  <!-- Arrow 3 -->
  <line x1="468" y1="82" x2="511" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="507,76 519,82 507,88" fill="#555"/>
  <!-- Step 4 circle -->
  <circle cx="680" cy="82" r="13" fill="#7b5ea7"/>
  <text x="680" y="87" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
  <!-- PHZ -->
  <rect x="695" y="52" width="95" height="60" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="742" y="73" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">Route 53</text>
  <text x="742" y="88" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle">PHZ</text>
  <text x="742" y="103" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">ssm → IP</text>
  <!-- Arrow 4 -->
  <line x1="653" y1="82" x2="693" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="689,76 701,82 689,88" fill="#555"/>
  <!-- Returned IP label -->
  <text x="400" y="135" font-family="Arial,sans-serif" font-size="11" fill="#059669" font-weight="bold" text-anchor="middle">DNS 応答: ssm.ap-northeast-1.amazonaws.com → 10.0.1.50 (Interface EP ENI)</text>
  <!-- Data traffic flow (bottom) -->
  <text x="400" y="162" font-family="Arial,sans-serif" font-size="11" fill="#7b5ea7" font-weight="bold" text-anchor="middle">データ通信フロー (DNS 解決後)</text>
  <!-- Client data -->
  <rect x="15" y="175" width="130" height="45" rx="5" fill="#f1f5f9" stroke="#6b7280" stroke-width="1.5"/>
  <text x="80" y="203" font-family="Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">On-Prem Client</text>
  <!-- Step A circle -->
  <circle cx="175" cy="197" r="13" fill="#10b981"/>
  <text x="175" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">A</text>
  <!-- DX/VPN data -->
  <rect x="192" y="175" width="100" height="45" rx="5" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="242" y="203" font-family="Arial,sans-serif" font-size="10" fill="#0369a1" text-anchor="middle">DX / VPN</text>
  <!-- Step B circle -->
  <circle cx="322" cy="197" r="13" fill="#10b981"/>
  <text x="322" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">B</text>
  <!-- Interface EP -->
  <rect x="338" y="175" width="140" height="45" rx="5" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <text x="408" y="197" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">Interface EP</text>
  <text x="408" y="212" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.0.1.50 (ENI)</text>
  <!-- Step C circle -->
  <circle cx="508" cy="197" r="13" fill="#10b981"/>
  <text x="508" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">C</text>
  <!-- PrivateLink -->
  <rect x="523" y="175" width="110" height="45" rx="5" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="578" y="198" font-family="Arial,sans-serif" font-size="9" fill="#0369a1" text-anchor="middle">PrivateLink</text>
  <text x="578" y="212" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Backbone</text>
  <!-- Step D circle -->
  <circle cx="663" cy="197" r="13" fill="#10b981"/>
  <text x="663" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">D</text>
  <!-- AWS Service -->
  <rect x="678" y="175" width="112" height="45" rx="5" fill="#fff8f0" stroke="#ff9900" stroke-width="1.5"/>
  <text x="734" y="197" font-family="Arial,sans-serif" font-size="10" fill="#cc7700" text-anchor="middle" font-weight="bold">AWS Service</text>
  <text x="734" y="212" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">SSM / Secrets</text>
  <!-- Data arrows -->
  <line x1="145" y1="197" x2="173" y2="197" stroke="#10b981" stroke-width="1.5"/>
  <line x1="188" y1="197" x2="190" y2="197" stroke="#10b981" stroke-width="1.5"/>
  <line x1="292" y1="197" x2="310" y2="197" stroke="#10b981" stroke-width="1.5"/>
  <line x1="478" y1="197" x2="510" y2="197" stroke="#10b981" stroke-width="1.5"/>
  <line x1="633" y1="197" x2="676" y2="197" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="141,191 153,197 141,203" fill="#10b981"/>
  <polygon points="309,191 321,197 309,203" fill="#10b981"/>
  <polygon points="507,191 519,197 507,203" fill="#10b981"/>
  <polygon points="672,191 684,197 672,203" fill="#10b981"/>
  <!-- Configuration required box -->
  <rect x="10" y="238" width="380" height="148" rx="6" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="10" y="238" width="380" height="22" rx="6" fill="#f59e0b"/>
  <text x="200" y="254" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">オンプレ接続に必要な設定</text>
  <text x="22" y="275" font-family="Arial,sans-serif" font-size="10" fill="#555" font-weight="bold">① Conditional Forwarder (オンプレ DNS)</text>
  <text x="22" y="292" font-family="monospace,Arial" font-size="9" fill="#333">*.amazonaws.com → 10.0.0.100 (R53 Inbound EP)</text>
  <text x="22" y="312" font-family="Arial,sans-serif" font-size="10" fill="#555" font-weight="bold">② Route 53 Inbound Resolver EP</text>
  <text x="22" y="329" font-family="Arial,sans-serif" font-size="9" fill="#333">VPC 内に作成 / セキュリティグループ: UDP/TCP 53</text>
  <text x="22" y="349" font-family="Arial,sans-serif" font-size="10" fill="#555" font-weight="bold">③ VPC Route Table (VPN/DX Traffic)</text>
  <text x="22" y="366" font-family="Arial,sans-serif" font-size="9" fill="#333">オンプレ CIDR → VGW/TGW attachment</text>
  <text x="22" y="382" font-family="Arial,sans-serif" font-size="9" fill="#888">Gateway EP はオンプレから使用不可（Interface EP のみ）</text>
  <!-- R53 Outbound EP option -->
  <rect x="408" y="238" width="382" height="148" rx="6" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <rect x="408" y="238" width="382" height="22" rx="6" fill="#10b981"/>
  <text x="599" y="254" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Route 53 Resolver の役割</text>
  <text x="420" y="275" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">Inbound Endpoint:</text>
  <text x="420" y="291" font-family="Arial,sans-serif" font-size="9" fill="#555">オンプレから VPC 内 DNS (PHZ) への問い合わせを受付</text>
  <text x="420" y="307" font-family="Arial,sans-serif" font-size="9" fill="#555">ENI の IP をフォワード先として設定</text>
  <text x="420" y="327" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">Outbound Endpoint (逆方向):</text>
  <text x="420" y="343" font-family="Arial,sans-serif" font-size="9" fill="#555">VPC から オンプレ DNS への問い合わせに使用</text>
  <text x="420" y="359" font-family="Arial,sans-serif" font-size="9" fill="#555">今回の PrivateLink 用途では不要</text>
  <text x="420" y="378" font-family="Arial,sans-serif" font-size="9" fill="#888">Inbound EP の料金: $0.125/hr + $0.000125/クエリ</text>
</svg>

<!--
オンプレ DNS → Conditional Forwarder → R53 Inbound EP → PHZ の順で DNS 解決します。R53 Inbound EP は VPC 内に ENI を作成し、オンプレ DNS からの問い合わせを受け付けます。Gateway EP はこのフローでは機能しません。
-->

---

<!-- _class: lead -->
# セキュリティ設計

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="60" font-family="sans-serif" font-size="26" font-weight="bold" fill="#f9a825" text-anchor="middle">セキュリティ設計</text>
  <text x="400" y="96" font-family="sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">VPC Endpoint の多層防御アーキテクチャ</text>
  <rect x="60" y="130" width="200" height="90" rx="10" fill="#16213e" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="160" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="#00bcd4" text-anchor="middle">Layer 1</text>
  <text x="160" y="180" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">ルートテーブル</text>
  <text x="160" y="200" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Gateway EP のみ</text>
  <rect x="300" y="130" width="200" height="90" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
  <text x="400" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4caf50" text-anchor="middle">Layer 2</text>
  <text x="400" y="180" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">セキュリティグループ</text>
  <text x="400" y="200" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">Interface EP のみ</text>
  <rect x="540" y="130" width="200" height="90" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="640" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e91e63" text-anchor="middle">Layer 3</text>
  <text x="640" y="180" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Endpoint Policy</text>
  <text x="640" y="200" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">両方対応</text>
  <polygon points="265,175 295,175" fill="none" stroke="#f9a825" stroke-width="2"/>
  <polygon points="291,170 301,175 291,180" fill="#f9a825"/>
  <polygon points="505,175 535,175" fill="none" stroke="#f9a825" stroke-width="2"/>
  <polygon points="531,170 541,175 531,180" fill="#f9a825"/>
  <rect x="60" y="255" width="680" height="100" rx="10" fill="#1a1a3e" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="400" y="280" font-family="sans-serif" font-size="14" font-weight="bold" fill="#9c27b0" text-anchor="middle">Layer 4: Resource Policy (IAM)</text>
  <text x="400" y="304" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Bucket Policy / DDB Resource Policy / Service Resource Policy</text>
  <text x="400" y="324" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">aws:sourceVpce / aws:sourceVpc / aws:PrincipalAccount 条件キー</text>
  <text x="400" y="344" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle">→ 4層の組み合わせで最強の防御を実現</text>
</svg>
- VPC Endpoint Policy のベストプラクティス
- IAM 条件キーの活用
- セキュリティグループ設計パターン

<!--
セクション 6: セキュリティ設計。Endpoint Policy・IAM 条件キー・SG の組み合わせによる多層防御を解説します。
-->

---

# VPC Endpoint Policy — ベストプラクティス（1/2）

> *aws:sourceVpce条件でS3バケットへのアクセス経路を限定*

- **① デフォルトポリシーを使用しない**
- デフォルトは全許可（Allow *）→ 必ず制限する
- **② Principal を絞る**
- `aws:PrincipalAccount` で自アカウントのみに限定

<!--
Endpoint Policy は IAM ポリシーと同じ構文ですが、Principal を省略できません。デフォルトの全許可ポリシーをそのまま使用するのは危険です。最低限 `aws:PrincipalAccount` で自アカウントに制限しましょう。
-->

---

# VPC Endpoint Policy — ベストプラクティス（2/2）

> *エンドポイント毎にポリシーを分離してブラスト半径を最小化*

- **③ Action を最小化**
- ReadOnly 用途は `s3:Get*`, `s3:List*` のみ許可
- **④ Endpoint Policy + Bucket Policy の二重制御**
- EP Policy で通過制限 + Bucket Policy で `aws:sourceVpce` Deny

<!--
Endpoint Policy は IAM ポリシーと同じ構文ですが、Principal を省略できません。デフォルトの全許可ポリシーをそのまま使用するのは危険です。最低限 `aws:PrincipalAccount` で自アカウントに制限しましょう。
-->

---

# `aws:sourceVpc` 条件キーの活用

- **条件キーの使い分け**


---

# `aws:sourceVpc` 条件キーの活用（コード例）

```json
# aws:sourceVpce — 特定の VPC Endpoint ID で制限
{
  "Condition": { "StringEquals": {
    "aws:sourceVpce": "vpce-0abc1234def56789"
  }}
}

# aws:sourceVpc — 特定の VPC ID で制限 (同じ VPC の全 EP が対象)
{
  "Condition": { "StringEquals": {
    "aws:sourceVpc": "vpc-0abc1234"
  }}
}

# aws:PrincipalAccount — 特定アカウントのみ許可
{
  "Condition": { "StringEquals": {
    "aws:PrincipalAccount": "123456789012"
  }}
}

# 複合条件: 自アカウント + 特定 EP 経由のみ
{
  "Condition": {
    "StringEquals": {
      "aws:PrincipalAccount": "123456789012",
      "aws:sourceVpce": "vpce-0abc1234"
    }
  }
}
```


---

# エンドポイント特有の IAM 条件キー一覧（1/2）

> *aws:sourceVpceとaws:VpcSourceIpで経路と送信元を同時制御*

- **vpc/endpoint 関連の条件キー**
- `aws:sourceVpce` — 送信元の VPC Endpoint ID
- `aws:sourceVpc` — 送信元の VPC ID
- `aws:sourceVpcSourceIp` — VPC 内の送信元 IP（CIDR 指定可）

<!--
aws:PrincipalOrgID を使うと AWS Organizations 全体を対象にしたポリシーが書けます。マルチアカウント環境での EP 共有時に有効です。ANS 試験では条件キーの選択が問われます。
-->

---

# エンドポイント特有の IAM 条件キー一覧（2/2）

> *条件キー組み合わせで経路強制—インターネット迂回を防止*

- **Principal 関連の条件キー**
- `aws:PrincipalAccount` — 送信元 AWS アカウント ID
- `aws:PrincipalOrgID` — AWS Organizations の組織 ID
- `aws:PrincipalTag` — プリンシパルに付与されたタグ

<!--
aws:PrincipalOrgID を使うと AWS Organizations 全体を対象にしたポリシーが書けます。マルチアカウント環境での EP 共有時に有効です。ANS 試験では条件キーの選択が問われます。
-->

---

# セキュリティグループ設計パターン

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">Interface Endpoint — セキュリティグループ設計パターン</text>
  <!-- Pattern 1: SG Reference -->
  <rect x="10" y="36" width="375" height="165" rx="6" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="10" y="36" width="375" height="24" rx="6" fill="#10b981"/>
  <text x="197" y="53" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">パターン 1: SG 参照 (推奨)</text>
  <!-- SG reference diagram -->
  <rect x="22" y="68" width="100" height="50" rx="4" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="72" y="89" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">sg-app</text>
  <text x="72" y="105" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">EC2 SG</text>
  <line x1="122" y1="93" x2="148" y2="93" stroke="#10b981" stroke-width="2"/>
  <polygon points="144,87 156,93 144,99" fill="#10b981"/>
  <rect x="148" y="68" width="120" height="50" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <text x="208" y="89" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">sg-ep</text>
  <text x="208" y="105" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">EP ENI SG</text>
  <text x="208" y="120" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">Inbound: 443 ← sg-app</text>
  <line x1="268" y1="93" x2="290" y2="93" stroke="#ff9900" stroke-width="2"/>
  <polygon points="286,87 298,93 286,99" fill="#ff9900"/>
  <rect x="290" y="68" width="85" height="50" rx="4" fill="#fff8f0" stroke="#ff9900" stroke-width="1.5"/>
  <text x="332" y="89" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle" font-weight="bold">AWS Svc</text>
  <text x="332" y="105" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">SSM / etc</text>
  <text x="197" y="143" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">EC2 SG を source に指定 → EC2 が移動しても IP 変更不要</text>
  <text x="197" y="158" font-family="Arial,sans-serif" font-size="9" fill="#059669" text-anchor="middle" font-weight="bold">IP アドレスに依存しない動的な制御が可能</text>
  <!-- Pattern 2: CIDR based -->
  <rect x="415" y="36" width="375" height="165" rx="6" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
  <rect x="415" y="36" width="375" height="24" rx="6" fill="#f59e0b"/>
  <text x="602" y="53" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">パターン 2: CIDR 指定</text>
  <rect x="427" y="68" width="100" height="50" rx="4" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="477" y="89" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle">EC2</text>
  <text x="477" y="105" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">10.0.1.0/24</text>
  <line x1="527" y1="93" x2="553" y2="93" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="549,87 561,93 549,99" fill="#f59e0b"/>
  <rect x="553" y="68" width="120" height="50" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="613" y="89" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">sg-ep</text>
  <text x="613" y="103" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">Inbound: 443</text>
  <text x="613" y="115" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">10.0.1.0/24</text>
  <line x1="673" y1="93" x2="695" y2="93" stroke="#ff9900" stroke-width="2"/>
  <polygon points="691,87 703,93 691,99" fill="#ff9900"/>
  <rect x="695" y="68" width="85" height="50" rx="4" fill="#fff8f0" stroke="#ff9900" stroke-width="1.5"/>
  <text x="737" y="89" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle" font-weight="bold">AWS Svc</text>
  <text x="602" y="143" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">サブネット CIDR で制御 — 同じサブネットの全 EC2 が対象</text>
  <text x="602" y="158" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle">EC2 が多い場合はサブネット単位の粗い制御になる</text>
  <!-- Pattern 3: Prefix List -->
  <rect x="10" y="215" width="375" height="175" rx="6" fill="#fff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="10" y="215" width="375" height="24" rx="6" fill="#7b5ea7"/>
  <text x="197" y="232" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">パターン 3: Customer Managed Prefix List</text>
  <rect x="22" y="248" width="100" height="50" rx="4" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="72" y="268" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle">複数 EC2</text>
  <text x="72" y="282" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">様々な IP</text>
  <line x1="122" y1="273" x2="148" y2="273" stroke="#7b5ea7" stroke-width="2"/>
  <polygon points="144,267 156,273 144,279" fill="#7b5ea7"/>
  <rect x="148" y="248" width="120" height="50" rx="4" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1.5"/>
  <text x="208" y="264" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle" font-weight="bold">sg-ep</text>
  <text x="208" y="278" font-family="Arial,sans-serif" font-size="8" fill="#888" text-anchor="middle">Inbound: 443</text>
  <text x="208" y="290" font-family="Arial,sans-serif" font-size="8" fill="#7b5ea7" text-anchor="middle">pl-custom-XXX</text>
  <line x1="268" y1="273" x2="290" y2="273" stroke="#ff9900" stroke-width="2"/>
  <polygon points="286,267 298,273 286,279" fill="#ff9900"/>
  <rect x="290" y="248" width="85" height="50" rx="4" fill="#fff8f0" stroke="#ff9900" stroke-width="1.5"/>
  <text x="332" y="268" font-family="Arial,sans-serif" font-size="9" fill="#cc7700" text-anchor="middle">AWS Svc</text>
  <text x="197" y="320" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">Prefix List に IP を追加/削除するだけで制御対象を変更</text>
  <text x="197" y="336" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" text-anchor="middle">複数の SG から同じ Prefix List を参照可能</text>
  <text x="197" y="352" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">複数 VPC・チームで管理する場合に有効</text>
  <text x="197" y="375" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">RAM でクロスアカウント共有も可能</text>
  <!-- Pattern 4: Best Practice Summary -->
  <rect x="415" y="215" width="375" height="175" rx="6" fill="#fff" stroke="#10b981" stroke-width="2"/>
  <rect x="415" y="215" width="375" height="24" rx="6" fill="#10b981"/>
  <text x="602" y="232" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">SG 設計ベストプラクティス</text>
  <text x="427" y="258" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold">EP SG (sg-ep) インバウンドルール:</text>
  <rect x="427" y="264" width="351" height="70" rx="4" fill="#f0fdf4"/>
  <text x="435" y="282" font-family="monospace,Arial" font-size="9" fill="#333">HTTPS 443  ← sg-app (アプリ EC2 SG)</text>
  <text x="435" y="298" font-family="monospace,Arial" font-size="9" fill="#333">HTTPS 443  ← sg-batch (バッチ EC2 SG)</text>
  <text x="435" y="314" font-family="monospace,Arial" font-size="9" fill="#888">追加ルールは最小限 — 不要なソースを含めない</text>
  <text x="427" y="352" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">重要ポイント:</text>
  <text x="427" y="368" font-family="Arial,sans-serif" font-size="9" fill="#555">・SG はステートフル — Inbound 許可で返りトラフィックは自動許可</text>
  <text x="427" y="384" font-family="Arial,sans-serif" font-size="9" fill="#555">・Outbound ルールは通常デフォルトのまま (All Allow) で問題なし</text>
</svg>

<!--
SG 参照パターンが最も推奨です。EC2 の IP が変わっても SG を変更する必要がありません。Prefix List パターンは複数チーム・複数 VPC で EP を共有する際に有効です。
-->

---

<!-- _class: lead -->
# トラブルシューティング

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="60" font-family="sans-serif" font-size="24" font-weight="bold" fill="#f9a825" text-anchor="middle">トラブルシューティング</text>
  <text x="400" y="92" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle">VPC Endpoint 問題の基本診断フロー</text>
  <rect x="300" y="115" width="200" height="50" rx="10" fill="#3d2000" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="146" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825" text-anchor="middle">接続エラー発生</text>
  <line x1="400" y1="165" x2="400" y2="195" stroke="#f9a825" stroke-width="2"/>
  <polygon points="394,193 400,205 406,193" fill="#f9a825"/>
  <rect x="280" y="205" width="240" height="50" rx="10" fill="#0a3d62" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="400" y="234" font-family="sans-serif" font-size="12" fill="#00bcd4" text-anchor="middle">EP ステータス確認</text>
  <text x="400" y="250" font-family="sans-serif" font-size="11" fill="#a0a0a0" text-anchor="middle">available ? pending ?</text>
  <line x1="280" y1="230" x2="200" y2="260" stroke="#4caf50" stroke-width="1.5"/>
  <line x1="520" y1="230" x2="600" y2="260" stroke="#f44336" stroke-width="1.5"/>
  <rect x="80" y="260" width="160" height="80" rx="8" fill="#1a3d20" stroke="#4caf50" stroke-width="1.5"/>
  <text x="160" y="283" font-family="sans-serif" font-size="12" fill="#4caf50" text-anchor="middle">DNS 確認</text>
  <text x="160" y="300" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">Private IP ?</text>
  <text x="160" y="316" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">nslookup で確認</text>
  <text x="160" y="330" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">→ SG/NACL を確認</text>
  <rect x="560" y="260" width="160" height="80" rx="8" fill="#3d0a0a" stroke="#f44336" stroke-width="1.5"/>
  <text x="640" y="283" font-family="sans-serif" font-size="12" fill="#f44336" text-anchor="middle">ルートテーブル確認</text>
  <text x="640" y="300" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">EP が関連付け？</text>
  <text x="640" y="316" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle">Prefix List確認</text>
  <text x="640" y="330" font-family="sans-serif" font-size="10" fill="#a0a0a0" text-anchor="middle">→ ルート追加</text>
  <rect x="270" y="355" width="260" height="35" rx="8" fill="#16213e" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="400" y="377" font-family="sans-serif" font-size="12" fill="#9c27b0" text-anchor="middle">EP Policy / IAM Policy 確認</text>
</svg>
- 接続確認の基本フロー
- Gateway / Interface EP の頻出問題
- DNS デバッグ

<!--
セクション 7: トラブルシューティング。実際の現場で遭遇しやすい問題と解決策を体系的に解説します。
-->

---

# 接続確認 — 基本トラブルシューティングフロー

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">接続確認 — 基本トラブルシューティングフロー</text>
  <!-- Start -->
  <rect x="310" y="36" width="180" height="30" rx="15" fill="#7b5ea7"/>
  <text x="400" y="56" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">AWS サービスへの接続失敗</text>
  <!-- Arrow down -->
  <line x1="400" y1="66" x2="400" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,78 400,86 406,78" fill="#555"/>
  <!-- Q1 -->
  <rect x="265" y="82" width="270" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="103" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">① VPC Endpoint のステータスは?</text>
  <!-- Q1 YES -->
  <line x1="400" y1="114" x2="400" y2="128" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,124 400,132 406,124" fill="#555"/>
  <text x="418" y="125" font-family="Arial,sans-serif" font-size="9" fill="#10b981">available</text>
  <!-- Q1 NO: pending/deleting -->
  <line x1="265" y1="98" x2="158" y2="98" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="162,92 150,98 162,104" fill="#ef4444"/>
  <text x="205" y="93" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">pending / error</text>
  <rect x="30" y="82" width="128" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="94" y="102" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">EP を再作成</text>
  <!-- Q2 -->
  <rect x="265" y="128" width="270" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="149" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">② DNS 解決は正しいか?</text>
  <line x1="400" y1="160" x2="400" y2="174" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,170 400,178 406,170" fill="#555"/>
  <text x="418" y="170" font-family="Arial,sans-serif" font-size="9" fill="#10b981">正しい</text>
  <!-- Q2 NO -->
  <line x1="265" y1="144" x2="158" y2="144" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="162,138 150,144 162,150" fill="#ef4444"/>
  <text x="205" y="138" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">パブリック IP</text>
  <rect x="15" y="128" width="143" height="44" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="86" y="146" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">Private DNS を有効化</text>
  <text x="86" y="160" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">or カスタム DNS 設定</text>
  <!-- Q3 -->
  <rect x="265" y="174" width="270" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="195" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">③ SG / NACLは接続を許可しているか?</text>
  <line x1="400" y1="206" x2="400" y2="220" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,216 400,224 406,216" fill="#555"/>
  <text x="418" y="217" font-family="Arial,sans-serif" font-size="9" fill="#10b981">許可</text>
  <!-- Q3 NO -->
  <line x1="535" y1="190" x2="620" y2="190" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="616,184 628,190 616,196" fill="#ef4444"/>
  <text x="577" y="184" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">拒否</text>
  <rect x="620" y="174" width="165" height="44" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="702" y="190" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">sg-ep に Inbound 443</text>
  <text x="702" y="205" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">NACL の Stateless に注意</text>
  <!-- Q4 -->
  <rect x="265" y="220" width="270" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="241" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">④ Endpoint Policy は許可しているか?</text>
  <line x1="400" y1="252" x2="400" y2="266" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,262 400,270 406,262" fill="#555"/>
  <text x="418" y="263" font-family="Arial,sans-serif" font-size="9" fill="#10b981">許可</text>
  <!-- Q4 NO -->
  <line x1="535" y1="236" x2="620" y2="236" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="616,230 628,236 616,242" fill="#ef4444"/>
  <text x="577" y="230" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">拒否</text>
  <rect x="620" y="220" width="165" height="44" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="702" y="236" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">Endpoint Policy を確認</text>
  <text x="702" y="251" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">Principal / Action / Condition</text>
  <!-- Q5 -->
  <rect x="265" y="266" width="270" height="32" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="287" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">⑤ IAM / Resource Policy は許可?</text>
  <line x1="400" y1="298" x2="400" y2="312" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,308 400,316 406,308" fill="#555"/>
  <text x="418" y="309" font-family="Arial,sans-serif" font-size="9" fill="#10b981">許可</text>
  <!-- Q5 NO -->
  <line x1="535" y1="282" x2="620" y2="282" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="616,276 628,282 616,288" fill="#ef4444"/>
  <text x="577" y="276" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">拒否</text>
  <rect x="620" y="266" width="165" height="44" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="702" y="282" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle">IAM / Bucket Policy 確認</text>
  <text x="702" y="297" font-family="Arial,sans-serif" font-size="9" fill="#888" text-anchor="middle">CloudTrail で Deny を確認</text>
  <!-- Resolution -->
  <rect x="300" y="312" width="200" height="30" rx="15" fill="#10b981"/>
  <text x="400" y="332" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">接続成功 / 問題解決</text>
  <!-- Diagnostic commands box -->
  <rect x="15" y="350" width="770" height="40" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="22" y="365" font-family="Arial,sans-serif" font-size="9" fill="#059669" font-weight="bold">診断コマンド:</text>
  <text x="110" y="365" font-family="monospace,Arial" font-size="9" fill="#333">nslookup ssm.ap-northeast-1.amazonaws.com</text>
  <text x="420" y="365" font-family="monospace,Arial" font-size="9" fill="#333">curl -v https://ssm.ap-northeast-1.amazonaws.com</text>
  <text x="22" y="383" font-family="monospace,Arial" font-size="9" fill="#333">aws ec2 describe-vpc-endpoints --query 'VpcEndpoints[].State'</text>
  <text x="350" y="383" font-family="monospace,Arial" font-size="9" fill="#333">aws logs filter-log-events --log-group-name VPCFlowLogs</text>
</svg>

<!--
まず EP のステータスが available であることを確認します。次に DNS 解決がプライベート IP を返しているか確認し、SG/NACL → EP Policy → IAM の順にチェックします。
-->

---

# Gateway Endpoint — よくある問題と解決策（1/2）

> *ルートテーブル更新漏れが疎通失敗の第一原因*

- **問題 1: トラフィックがインターネット経由になる**
- 原因: サブネットのルートテーブルに EP が関連付けられていない
- 解決: EP 作成時に対象ルートテーブルを指定 / 後から修正
- **問題 2: オンプレからアクセスできない**

<!--
Gateway EP の最もよくある問題はルートテーブルへの関連付け漏れです。VPC には複数のルートテーブルがある場合があるため、全サブネットが対象ルートテーブルを使用しているか確認します。
-->

---

# Gateway Endpoint — よくある問題と解決策（2/2）

> *クロスリージョン不可—同リージョンのS3/DynamoDBのみ*

- 原因: Gateway EP は VPC 内からのトラフィックのみ対応
- 解決: Interface EP（S3 Interface Endpoint）に切り替える
- **問題 3: EP Policy で拒否されている**
- 原因: EP Policy の Condition / Action が想定外に厳しい
- 解決: CloudTrail で拒否の詳細を確認し Policy を修正

<!--
Gateway EP の最もよくある問題はルートテーブルへの関連付け漏れです。VPC には複数のルートテーブルがある場合があるため、全サブネットが対象ルートテーブルを使用しているか確認します。
-->

---

# Interface Endpoint — よくある問題と解決策（1/2）

> *セキュリティグループ443番開放漏れでTLS接続が失敗*

- **問題 1: 特定 AZ だけ接続できない**
- 原因: その AZ に ENI が作成されていない
- 解決: 使用するすべての AZ にサブネットを指定して EP を修正
- **問題 2: DNS 解決がパブリック IP を返す**

<!--
Interface EP のトラブルで最も多いのが DNS 関連です。まず nslookup でプライベート IP が返るかを確認します。VPC Flow Logs を見て REJECT されているか確認することも有効です。
-->

---

# Interface Endpoint — よくある問題と解決策（2/2）

> *プライベートDNS有効化でSDKが自動的にエンドポイントを使用*

- 原因: Private DNS が無効 / VPC の DNS 属性が false
- 解決: enableDnsSupport と enableDnsHostnames を true に変更後、Private DNS を有効化
- **問題 3: SG で接続がブロックされる**
- 原因: EP の SG にインバウンド 443 が許可されていない
- 解決: sg-ep のインバウンドに HTTPS 443 を追加（Source: EC2 SG）

<!--
Interface EP のトラブルで最も多いのが DNS 関連です。まず nslookup でプライベート IP が返るかを確認します。VPC Flow Logs を見て REJECT されているか確認することも有効です。
-->

---

# DNS トラブルシューティングフロー

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">DNS トラブルシューティング — 診断決定木</text>
  <!-- Start -->
  <rect x="280" y="36" width="240" height="28" rx="14" fill="#7b5ea7"/>
  <text x="400" y="55" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">nslookup ssm.*.amazonaws.com を実行</text>
  <line x1="400" y1="64" x2="400" y2="78" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,74 400,82 406,74" fill="#555"/>
  <!-- Q1 -->
  <rect x="255" y="78" width="290" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="98" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">解決先 IP は プライベート IP か?</text>
  <!-- YES (Private IP) -->
  <line x1="400" y1="108" x2="400" y2="122" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,118 400,126 406,118" fill="#555"/>
  <text x="420" y="118" font-family="Arial,sans-serif" font-size="9" fill="#10b981">YES (10.x/172.x)</text>
  <!-- NO (Public IP) -->
  <line x1="255" y1="93" x2="170" y2="93" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="174,87 162,93 174,99" fill="#ef4444"/>
  <text x="206" y="87" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">NO (Public IP)</text>
  <!-- Public IP resolution causes -->
  <rect x="10" y="78" width="152" height="100" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="86" y="98" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="bold">原因と対処</text>
  <text x="18" y="116" font-family="Arial,sans-serif" font-size="9" fill="#555">・Private DNS 無効</text>
  <text x="18" y="132" font-family="Arial,sans-serif" font-size="9" fill="#555">→ EP で有効化</text>
  <text x="18" y="148" font-family="Arial,sans-serif" font-size="9" fill="#555">・enableDnsSupport=false</text>
  <text x="18" y="164" font-family="Arial,sans-serif" font-size="9" fill="#555">→ VPC 属性を修正</text>
  <!-- Q2 -->
  <rect x="255" y="122" width="290" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="142" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">接続 (curl) は成功するか?</text>
  <line x1="400" y1="152" x2="400" y2="166" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,162 400,170 406,162" fill="#555"/>
  <text x="420" y="162" font-family="Arial,sans-serif" font-size="9" fill="#10b981">YES</text>
  <!-- NO: connection timeout -->
  <line x1="545" y1="137" x2="620" y2="137" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="616,131 628,137 616,143" fill="#ef4444"/>
  <text x="580" y="131" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">NO (timeout)</text>
  <rect x="620" y="118" width="170" height="74" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="705" y="138" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="bold">SG / NACL 確認</text>
  <text x="628" y="158" font-family="Arial,sans-serif" font-size="9" fill="#555">EP SG: Inbound 443</text>
  <text x="628" y="174" font-family="Arial,sans-serif" font-size="9" fill="#555">NACL: In+Out 443/1024-65535</text>
  <text x="628" y="188" font-family="Arial,sans-serif" font-size="9" fill="#888">NACL はステートレスに注意</text>
  <!-- Q3 -->
  <rect x="255" y="166" width="290" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="186" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">認証エラー (403/AccessDenied)?</text>
  <line x1="400" y1="196" x2="400" y2="210" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,206 400,214 406,206" fill="#555"/>
  <text x="420" y="206" font-family="Arial,sans-serif" font-size="9" fill="#10b981">NO</text>
  <!-- YES: 403 -->
  <line x1="545" y1="181" x2="620" y2="181" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="616,175 628,181 616,187" fill="#ef4444"/>
  <text x="580" y="175" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">YES (403)</text>
  <rect x="620" y="200" width="170" height="100" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="705" y="220" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="bold">ポリシー確認</text>
  <text x="628" y="240" font-family="Arial,sans-serif" font-size="9" fill="#555">1. IAM Role 権限</text>
  <text x="628" y="258" font-family="Arial,sans-serif" font-size="9" fill="#555">2. EP Policy の拒否</text>
  <text x="628" y="276" font-family="Arial,sans-serif" font-size="9" fill="#555">3. Bucket/Resource Policy</text>
  <text x="628" y="292" font-family="Arial,sans-serif" font-size="9" fill="#888">CloudTrail で確認</text>
  <!-- Q4: AZ specific issue -->
  <rect x="255" y="210" width="290" height="30" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="230" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">特定の AZ のみ失敗するか?</text>
  <line x1="400" y1="240" x2="400" y2="254" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,250 400,258 406,250" fill="#555"/>
  <text x="420" y="250" font-family="Arial,sans-serif" font-size="9" fill="#10b981">NO</text>
  <!-- YES: AZ specific -->
  <line x1="255" y1="225" x2="170" y2="225" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="174,219 162,225 174,231" fill="#ef4444"/>
  <text x="206" y="219" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">YES</text>
  <rect x="10" y="200" width="152" height="80" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="86" y="220" font-family="Arial,sans-serif" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="bold">AZ 別の ENI 確認</text>
  <text x="18" y="240" font-family="Arial,sans-serif" font-size="9" fill="#555">その AZ に ENI が</text>
  <text x="18" y="256" font-family="Arial,sans-serif" font-size="9" fill="#555">作成されているか確認</text>
  <text x="18" y="272" font-family="Arial,sans-serif" font-size="9" fill="#555">→ EP を修正して追加</text>
  <!-- Success -->
  <rect x="300" y="254" width="200" height="28" rx="14" fill="#10b981"/>
  <text x="400" y="273" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">接続成功</text>
  <!-- Diagnostic commands -->
  <rect x="10" y="300" width="780" height="88" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
  <rect x="10" y="300" width="780" height="22" rx="6" fill="#6b7280"/>
  <text x="400" y="316" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">DNS 診断コマンド一覧</text>
  <text x="20" y="338" font-family="monospace,Arial" font-size="9" fill="#555"># DNS 解決確認 (EC2 から実行)</text>
  <text x="20" y="353" font-family="monospace,Arial" font-size="9" fill="#333">nslookup ssm.ap-northeast-1.amazonaws.com 169.254.169.253</text>
  <text x="20" y="368" font-family="monospace,Arial" font-size="9" fill="#555"># ENI/EP 確認</text>
  <text x="20" y="383" font-family="monospace,Arial" font-size="9" fill="#333">aws ec2 describe-vpc-endpoints --filters "Name=service-name,Values=com.amazonaws.ap-northeast-1.ssm"</text>
</svg>

<!--
DNS 解決の問題は nslookup から始めます。プライベート IP が返らない場合は Private DNS 設定を確認し、接続タイムアウトの場合は SG/NACL を確認します。403 の場合はポリシー層を確認します。
-->

---

# CloudWatch メトリクス & VPC Flow Logs 活用

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">CloudWatch メトリクス &amp; VPC Flow Logs — 監視設計</text>
  <!-- Left: CloudWatch Metrics -->
  <rect x="10" y="36" width="375" height="350" rx="8" fill="#fff" stroke="#ff9900" stroke-width="2"/>
  <rect x="10" y="36" width="375" height="26" rx="8" fill="#ff9900"/>
  <text x="197" y="54" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">CloudWatch Metrics (Interface EP)</text>
  <!-- Metric 1: Bytes -->
  <rect x="22" y="72" width="351" height="55" rx="5" fill="#fff8f0" stroke="#f59e0b" stroke-width="1"/>
  <text x="34" y="90" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold">BytesProcessed / PacketsDropped</text>
  <text x="34" y="108" font-family="Arial,sans-serif" font-size="9" fill="#555">Namespace: AWS/PrivateLinkEndpoints</text>
  <text x="34" y="123" font-family="Arial,sans-serif" font-size="9" fill="#888">Dim: VpcEndpointId, ServiceName, AZ</text>
  <!-- Metric 2 -->
  <rect x="22" y="137" width="351" height="55" rx="5" fill="#fff8f0" stroke="#f59e0b" stroke-width="1"/>
  <text x="34" y="155" font-family="Arial,sans-serif" font-size="10" fill="#b45309" font-weight="bold">NewConnections / ActiveConnections</text>
  <text x="34" y="173" font-family="Arial,sans-serif" font-size="9" fill="#555">接続数の監視 — 異常な急増を検知</text>
  <text x="34" y="188" font-family="Arial,sans-serif" font-size="9" fill="#888">アラーム: 5分間の閾値超過</text>
  <!-- Chart mock (bar chart) -->
  <rect x="22" y="202" width="351" height="100" rx="5" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>
  <text x="197" y="220" font-family="Arial,sans-serif" font-size="9" fill="#555" text-anchor="middle">BytesProcessed (24h)</text>
  <!-- Bar chart bars -->
  <rect x="40" y="265" width="18" height="30" fill="#ff9900" opacity="0.7"/>
  <rect x="65" y="255" width="18" height="40" fill="#ff9900" opacity="0.7"/>
  <rect x="90" y="250" width="18" height="45" fill="#ff9900" opacity="0.7"/>
  <rect x="115" y="260" width="18" height="35" fill="#ff9900" opacity="0.7"/>
  <rect x="140" y="245" width="18" height="50" fill="#ff9900" opacity="0.7"/>
  <rect x="165" y="240" width="18" height="55" fill="#ff9900" opacity="0.7"/>
  <rect x="190" y="255" width="18" height="40" fill="#ff9900" opacity="0.7"/>
  <rect x="215" y="262" width="18" height="33" fill="#ff9900" opacity="0.7"/>
  <rect x="240" y="258" width="18" height="37" fill="#ff9900" opacity="0.7"/>
  <rect x="265" y="248" width="18" height="47" fill="#ff9900" opacity="0.7"/>
  <rect x="290" y="235" width="18" height="60" fill="#ef4444" opacity="0.7"/>
  <rect x="315" y="252" width="18" height="43" fill="#ff9900" opacity="0.7"/>
  <text x="299" y="230" font-family="Arial,sans-serif" font-size="8" fill="#ef4444" text-anchor="middle">異常</text>
  <line x1="30" y1="295" x2="360" y2="295" stroke="#e5e7eb" stroke-width="1"/>
  <!-- Gateway EP metrics -->
  <rect x="22" y="312" width="351" height="62" rx="5" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="34" y="330" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">Gateway EP メトリクス</text>
  <text x="34" y="348" font-family="Arial,sans-serif" font-size="9" fill="#555">専用メトリクスなし — VPC Flow Logs で代替</text>
  <text x="34" y="364" font-family="Arial,sans-serif" font-size="9" fill="#888">S3 Access Logs / DynamoDB Streams で補完</text>
  <!-- Right: VPC Flow Logs -->
  <rect x="415" y="36" width="375" height="350" rx="8" fill="#fff" stroke="#7b5ea7" stroke-width="2"/>
  <rect x="415" y="36" width="375" height="26" rx="8" fill="#7b5ea7"/>
  <text x="602" y="54" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">VPC Flow Logs</text>
  <!-- Flow Logs explanation -->
  <rect x="427" y="72" width="351" height="55" rx="5" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="439" y="90" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" font-weight="bold">Interface EP ENI のフローログを有効化</text>
  <text x="439" y="108" font-family="Arial,sans-serif" font-size="9" fill="#555">ENI レベルで ACCEPT/REJECT を記録</text>
  <text x="439" y="122" font-family="Arial,sans-serif" font-size="9" fill="#888">S3 / CloudWatch Logs / Kinesis に出力可</text>
  <!-- Flow log record example -->
  <rect x="427" y="137" width="351" height="90" rx="5" fill="#f8f9fa" stroke="#e5e7eb" stroke-width="1"/>
  <text x="439" y="155" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">フローログレコード例 (ACCEPT)</text>
  <text x="435" y="172" font-family="monospace,Arial" font-size="8" fill="#059669">2 123456789 eni-0abc  10.0.1.10 10.0.1.50</text>
  <text x="435" y="187" font-family="monospace,Arial" font-size="8" fill="#059669">443 54321 6 ACCEPT OK</text>
  <text x="439" y="207" font-family="Arial,sans-serif" font-size="9" fill="#555" font-weight="bold">フローログレコード例 (REJECT)</text>
  <text x="435" y="222" font-family="monospace,Arial" font-size="8" fill="#ef4444">2 123456789 eni-0abc  10.0.2.5  10.0.1.50</text>
  <text x="435" y="238" font-family="monospace,Arial" font-size="8" fill="#ef4444">443 55000 6 REJECT OK  ← SG/NACL 拒否</text>
  <!-- CloudWatch Insights query -->
  <rect x="427" y="237" width="351" height="80" rx="5" fill="#f5f3ff" stroke="#7b5ea7" stroke-width="1"/>
  <text x="439" y="255" font-family="Arial,sans-serif" font-size="9" fill="#7b5ea7" font-weight="bold">CloudWatch Insights クエリ例</text>
  <text x="435" y="273" font-family="monospace,Arial" font-size="8" fill="#333">fields @timestamp, srcAddr, dstAddr, action</text>
  <text x="435" y="288" font-family="monospace,Arial" font-size="8" fill="#333">| filter action = "REJECT"</text>
  <text x="435" y="303" font-family="monospace,Arial" font-size="8" fill="#333">| sort @timestamp desc | limit 20</text>
  <!-- Alarm recommendation -->
  <rect x="427" y="327" width="351" height="52" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
  <text x="602" y="345" font-family="Arial,sans-serif" font-size="10" fill="#059669" text-anchor="middle" font-weight="bold">監視アラーム推奨</text>
  <text x="439" y="363" font-family="Arial,sans-serif" font-size="9" fill="#555">PacketsDropped急増: SG/NACL ブロック増加の可能性</text>
  <text x="439" y="376" font-family="Arial,sans-serif" font-size="9" fill="#555">BytesProcessed急増: 意図しないデータ転送やスキャン</text>
</svg>

<!--
Interface EP は CloudWatch の AWS/PrivateLinkEndpoints 名前空間でメトリクスを取得できます。Gateway EP はメトリクスなしのため VPC Flow Logs で補います。PacketsDropped が急増した場合は SG/NACL の設定を見直してください。
-->

---

<!-- _class: lead -->
# ANS 試験対策ポイント

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="55" font-family="sans-serif" font-size="24" font-weight="bold" fill="#f9a825" text-anchor="middle">ANS 試験対策ポイント</text>
  <text x="400" y="84" font-family="sans-serif" font-size="15" fill="#ffffff" text-anchor="middle">頻出パターンと設計判断の鍵</text>
  <rect x="40" y="105" width="335" height="95" rx="10" fill="#0a3d62" stroke="#00bcd4" stroke-width="1.5"/>
  <text x="207" y="128" font-family="sans-serif" font-size="13" font-weight="bold" fill="#00bcd4" text-anchor="middle">Gateway EP を選ぶケース</text>
  <text x="207" y="150" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">S3 / DynamoDB + コスト最小化</text>
  <text x="207" y="168" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">VPC 内のアクセスのみ</text>
  <text x="207" y="186" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">→ 無料・ルートテーブル追加のみ</text>
  <rect x="425" y="105" width="335" height="95" rx="10" fill="#1a3d20" stroke="#4caf50" stroke-width="1.5"/>
  <text x="592" y="128" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4caf50" text-anchor="middle">Interface EP を選ぶケース</text>
  <text x="592" y="150" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">オンプレ / TGW 経由でアクセス</text>
  <text x="592" y="168" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">S3/DDB 以外のサービス</text>
  <text x="592" y="186" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">→ SG制御・DNS解決が鍵</text>
  <rect x="40" y="215" width="335" height="95" rx="10" fill="#3d2000" stroke="#ff9800" stroke-width="1.5"/>
  <text x="207" y="238" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ff9800" text-anchor="middle">EP 共有パターン</text>
  <text x="207" y="260" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">TGW + Shared Services VPC</text>
  <text x="207" y="278" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Interface EP を集約 (Gateway は不可)</text>
  <text x="207" y="296" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">→ EP 数を最小化でコスト削減</text>
  <rect x="425" y="215" width="335" height="95" rx="10" fill="#2d003d" stroke="#9c27b0" stroke-width="1.5"/>
  <text x="592" y="238" font-family="sans-serif" font-size="13" font-weight="bold" fill="#9c27b0" text-anchor="middle">CIDR 重複環境</text>
  <text x="592" y="260" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">VPC Peering は CIDR 重複不可</text>
  <text x="592" y="278" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">PrivateLink (Interface EP) は重複OK</text>
  <text x="592" y="296" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">→ NLB + Endpoint Service で解決</text>
  <text x="400" y="340" font-family="sans-serif" font-size="12" fill="#a0a0a0" text-anchor="middle">この4パターンを押さえれば ANS 設計問題の大半は解ける</text>
</svg>
- ANS 頻出パターン問題
- 試験で問われる設計判断ポイント

<!--
セクション 8: ANS 試験対策。本セッションの内容を試験問題の視点から整理します。
-->

---

# ANS 頻出パターン — 設計問題（1/2）

> *コスト最小化ならGateway、オンプレ接続ならInterfaceを選べ*

- **パターン A: コスト最小化 + S3 アクセス**
- → Gateway Endpoint (無料) を選択
- **パターン B: オンプレから SSM / Secrets Manager にアクセス**
- → Interface Endpoint + Direct Connect + R53 Inbound EP

<!--
ANS 試験は「なぜその選択か」の理由が重要です。Gateway EP: 無料・S3/DDB のみ・VPC 内のみ。Interface EP: 有料・多サービス・オンプレ対応。この軸で問題を解くと正解率が上がります。
-->

---

# ANS 頻出パターン — 設計問題（2/2）

> *Private DNS競合はVPCごと無効化して手動DNS解決で回避*

- **パターン C: 複数 VPC で EP を共有したい**
- → TGW + Shared Services VPC に Interface EP を集約（Gateway EP は共有不可）
- **パターン D: VPC CIDR 重複環境でサービス共有**
- → PrivateLink（VPC Peering は CIDR 重複不可）

<!--
ANS 試験は「なぜその選択か」の理由が重要です。Gateway EP: 無料・S3/DDB のみ・VPC 内のみ。Interface EP: 有料・多サービス・オンプレ対応。この軸で問題を解くと正解率が上がります。
-->

---

# ANS 試験 — 設計判断決定木

- <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="400" fill="#fafafa"/>
  <text x="400" y="24" font-family="Arial,sans-serif" font-size="13" fill="#7b5ea7" font-weight="bold" text-anchor="middle">ANS 試験 — 設計判断決定木</text>
  <!-- Question nodes - ANS exam style -->
  <!-- Q1: Exam question type -->
  <rect x="230" y="36" width="340" height="32" rx="5" fill="#7b5ea7"/>
  <text x="400" y="57" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">試験問題: 「VPC から AWS サービスへ安全に接続したい」</text>
  <!-- Q1: S3/DDB only -->
  <line x1="400" y1="68" x2="400" y2="82" stroke="#555" stroke-width="1.5"/>
  <polygon points="394,78 400,86 406,78" fill="#555"/>
  <rect x="250" y="82" width="300" height="28" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="101" font-family="Arial,sans-serif" font-size="10" fill="#b45309" text-anchor="middle" font-weight="bold">Q1: S3 または DynamoDB のみ?</text>
  <!-- YES left -->
  <line x1="250" y1="96" x2="185" y2="96" stroke="#555" stroke-width="1.5"/>
  <polygon points="189,90 177,96 189,102" fill="#555"/>
  <text x="215" y="90" font-family="Arial,sans-serif" font-size="9" fill="#10b981">YES</text>
  <!-- Q2 left: On-prem -->
  <rect x="20" y="82" width="157" height="28" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="99" y="101" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">Q2: オンプレ接続必要?</text>
  <!-- Q2 NO → Gateway EP -->
  <line x1="99" y1="110" x2="99" y2="128" stroke="#555" stroke-width="1.5"/>
  <polygon points="93,124 99,132 105,124" fill="#555"/>
  <text x="113" y="124" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">NO</text>
  <rect x="20" y="132" width="157" height="32" rx="5" fill="#10b981"/>
  <text x="99" y="148" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Gateway Endpoint</text>
  <text x="99" y="160" font-family="Arial,sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">ルートテーブル / 無料</text>
  <!-- Q2 YES → Interface EP for S3 -->
  <line x1="20" y1="96" x2="8" y2="96" stroke="#555" stroke-width="1.5"/>
  <line x1="8" y1="96" x2="8" y2="186" stroke="#555" stroke-width="1.5"/>
  <line x1="8" y1="186" x2="95" y2="186" stroke="#555" stroke-width="1.5"/>
  <polygon points="91,180 103,186 91,192" fill="#555"/>
  <text x="2" y="145" font-family="Arial,sans-serif" font-size="9" fill="#10b981" transform="rotate(-90,10,145)">YES</text>
  <rect x="20" y="186" width="157" height="32" rx="5" fill="#f59e0b"/>
  <text x="99" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint</text>
  <text x="99" y="214" font-family="Arial,sans-serif" font-size="8" fill="#fef9c3" text-anchor="middle">ENI / SG / DNS</text>
  <!-- Q1 NO → Q3 -->
  <line x1="550" y1="96" x2="618" y2="96" stroke="#555" stroke-width="1.5"/>
  <polygon points="614,90 626,96 614,102" fill="#555"/>
  <text x="583" y="90" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">NO (other services)</text>
  <rect x="620" y="82" width="160" height="28" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
  <text x="700" y="101" font-family="Arial,sans-serif" font-size="9" fill="#b45309" text-anchor="middle" font-weight="bold">Q3: カスタムサービス公開?</text>
  <line x1="700" y1="110" x2="700" y2="128" stroke="#555" stroke-width="1.5"/>
  <polygon points="694,124 700,132 706,124" fill="#555"/>
  <text x="715" y="124" font-family="Arial,sans-serif" font-size="9" fill="#ef4444">NO</text>
  <rect x="628" y="132" width="144" height="32" rx="5" fill="#10b981"/>
  <text x="700" y="148" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">Interface Endpoint</text>
  <text x="700" y="160" font-family="Arial,sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">com.amazonaws.*</text>
  <line x1="780" y1="96" x2="792" y2="96" stroke="#555" stroke-width="1.5"/>
  <line x1="792" y1="96" x2="792" y2="186" stroke="#555" stroke-width="1.5"/>
  <line x1="792" y1="186" x2="774" y2="186" stroke="#555" stroke-width="1.5"/>
  <polygon points="778,180 766,186 778,192" fill="#555"/>
  <text x="793" y="145" font-family="Arial,sans-serif" font-size="9" fill="#10b981" transform="rotate(90,793,145)">YES</text>
  <rect x="628" y="186" width="144" height="32" rx="5" fill="#7b5ea7"/>
  <text x="700" y="202" font-family="Arial,sans-serif" font-size="10" fill="#fff" font-weight="bold" text-anchor="middle">PrivateLink (Provider)</text>
  <text x="700" y="214" font-family="Arial,sans-serif" font-size="8" fill="#d4b8ff" text-anchor="middle">NLB + EP Service</text>
  <!-- ANS Exam tips bottom -->
  <rect x="10" y="240" width="780" height="148" rx="8" fill="#fff" stroke="#7b5ea7" stroke-width="1.5"/>
  <rect x="10" y="240" width="780" height="26" rx="8" fill="#7b5ea7"/>
  <text x="400" y="258" font-family="Arial,sans-serif" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">ANS 試験 頻出ポイント</text>
  <!-- 3 columns -->
  <line x1="270" y1="266" x2="270" y2="388" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="540" y1="266" x2="540" y2="388" stroke="#e5e7eb" stroke-width="1"/>
  <text x="140" y="285" font-family="Arial,sans-serif" font-size="10" fill="#7b5ea7" text-anchor="middle" font-weight="bold">Gateway EP のみ</text>
  <text x="20" y="302" font-family="Arial,sans-serif" font-size="9" fill="#555">・S3/DDB のみ対応</text>
  <text x="20" y="316" font-family="Arial,sans-serif" font-size="9" fill="#555">・ルートテーブルで制御</text>
  <text x="20" y="330" font-family="Arial,sans-serif" font-size="9" fill="#555">・ENI なし / SG 不可</text>
  <text x="20" y="344" font-family="Arial,sans-serif" font-size="9" fill="#555">・オンプレ/TGW から不可</text>
  <text x="20" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555">・無料</text>
  <text x="20" y="372" font-family="Arial,sans-serif" font-size="9" fill="#555">・Prefix List でルーティング</text>
  <text x="405" y="285" font-family="Arial,sans-serif" font-size="10" fill="#10b981" text-anchor="middle" font-weight="bold">Interface EP のみ</text>
  <text x="280" y="302" font-family="Arial,sans-serif" font-size="9" fill="#555">・100+ サービス対応</text>
  <text x="280" y="316" font-family="Arial,sans-serif" font-size="9" fill="#555">・ENI + SG で制御</text>
  <text x="280" y="330" font-family="Arial,sans-serif" font-size="9" fill="#555">・Private DNS (PHZ)</text>
  <text x="280" y="344" font-family="Arial,sans-serif" font-size="9" fill="#555">・オンプレ/TGW から利用可</text>
  <text x="280" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555">・有料 ($0.01/hr/AZ)</text>
  <text x="280" y="372" font-family="Arial,sans-serif" font-size="9" fill="#555">・NLB + EP Service でカスタム公開</text>
  <text x="665" y="285" font-family="Arial,sans-serif" font-size="10" fill="#f59e0b" text-anchor="middle" font-weight="bold">試験で迷ったら</text>
  <text x="550" y="302" font-family="Arial,sans-serif" font-size="9" fill="#555">Q: 「VPC CIDR 重複でも OK?」</text>
  <text x="550" y="316" font-family="Arial,sans-serif" font-size="9" fill="#059669">→ PrivateLink は OK (EP)</text>
  <text x="550" y="330" font-family="Arial,sans-serif" font-size="9" fill="#555">Q: 「コスト最小化」+ S3?</text>
  <text x="550" y="344" font-family="Arial,sans-serif" font-size="9" fill="#059669">→ Gateway EP (無料)</text>
  <text x="550" y="358" font-family="Arial,sans-serif" font-size="9" fill="#555">Q: 「オンプレから SSM?」</text>
  <text x="550" y="372" font-family="Arial,sans-serif" font-size="9" fill="#059669">→ Interface EP + R53 Inbound EP</text>
</svg>

<!--
試験で迷った場合はこの決定木を使います。S3/DDB + コスト最小化 = Gateway EP。それ以外 = Interface EP。VPC CIDR 重複 + サービス共有 = PrivateLink。オンプレ + DNS = R53 Inbound EP。
-->

---

# まとめ & 参考リンク（1/2）

> *Gateway=無料/S3+DynamoDB限定、Interface=有料/全サービス*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="44" font-family="sans-serif" font-size="20" font-weight="bold" fill="#f9a825" text-anchor="middle">まとめ: Gateway vs Interface Endpoint</text>
  <rect x="40" y="65" width="340" height="260" rx="12" fill="#0a2744" stroke="#00bcd4" stroke-width="2"/>
  <text x="210" y="96" font-family="sans-serif" font-size="16" font-weight="bold" fill="#00bcd4" text-anchor="middle">Gateway Endpoint</text>
  <rect x="60" y="108" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="210" y="132" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">対象: S3 / DynamoDB のみ</text>
  <rect x="60" y="153" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="210" y="177" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">仕組み: ルートテーブルエントリ</text>
  <rect x="60" y="198" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="210" y="222" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">コスト: 完全無料</text>
  <rect x="60" y="243" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="210" y="267" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">オンプレ接続: 非対応</text>
  <rect x="60" y="288" width="300" height="27" rx="6" fill="#1a3d62" stroke="#f9a825" stroke-width="1"/>
  <text x="210" y="307" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">VPC内のみ・コスト優先</text>
  <rect x="420" y="65" width="340" height="260" rx="12" fill="#0a3d20" stroke="#4caf50" stroke-width="2"/>
  <text x="590" y="96" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4caf50" text-anchor="middle">Interface Endpoint</text>
  <rect x="440" y="108" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="590" y="132" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">対象: 100+ AWSサービス</text>
  <rect x="440" y="153" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="590" y="177" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">仕組み: ENI + PrivateLink</text>
  <rect x="440" y="198" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="590" y="222" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">コスト: $0.01/h/AZ + $0.01/GB</text>
  <rect x="440" y="243" width="300" height="40" rx="6" fill="#16213e"/>
  <text x="590" y="267" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">オンプレ接続: 対応</text>
  <rect x="440" y="288" width="300" height="27" rx="6" fill="#1a3d20" stroke="#f9a825" stroke-width="1"/>
  <text x="590" y="307" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f9a825" text-anchor="middle">多サービス・オンプレ・SG制御</text>
  <text x="400" y="355" font-family="sans-serif" font-size="13" fill="#ffffff" text-anchor="middle">実務では両者を組み合わせてコストとセキュリティを最適化</text>
</svg>
- **Gateway Endpoint** — S3/DDB 専用・無料・ルートテーブルベース・VPC 内のみ
- **Interface Endpoint** — 100+ サービス・有料・ENI+SG・オンプレ/TGW 対応
- **選定基準** — S3/DDB のみ+コスト重視 → Gateway EP、それ以外 → Interface EP

<!--
本スライドで解説した Gateway EP と Interface EP の違いを理解することで、ANS 試験の設計問題の大部分に対応できます。実務では両者を組み合わせ、コストとセキュリティを最適化しましょう。
-->

---

# まとめ & 参考リンク（2/2）

> *セキュリティ要件があればInterface+Policyの二重構成が鉄板*

- **参考リンク:**
- [VPC Endpoints (AWS Doc)](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)
- [AWS PrivateLink (公式)](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html)
- [Gateway Endpoint vs Interface Endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-gateway.html)

<!--
本スライドで解説した Gateway EP と Interface EP の違いを理解することで、ANS 試験の設計問題の大部分に対応できます。実務では両者を組み合わせ、コストとセキュリティを最適化しましょう。
-->
