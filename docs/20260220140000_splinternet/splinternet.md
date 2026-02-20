---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "インターネットの分裂"
footer: "© 2026"
style: |
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section.center {
    text-align: center;
  }
  section table {
    font-size: 0.82em;
  }
  
---

<!-- _class: lead -->
# インターネットの分裂

- ## スプリンターネット化の進行マップ
- 
- エンジニアのための地政学 × テクノロジー
- 
- 2026年版


---

# 「インターネットはひとつ」という神話

- **1969年〜2010年代**: ひとつのグローバルネットワークという理想
- **現実**: 中国・ロシア・欧州・米国がそれぞれ「自国のインターネット」を構築中
- **スプリンターネット** = 地政学・規制・市場によって分断されたインターネット
- 
- **今日の問い**: 我々エンジニアは分断された世界でどう設計するか？


---

# アジェンダ

- **Ch.1** スプリンターネットとは何か（定義・歴史・構造）
- **Ch.2** 地政学的背景（中国・ロシア・欧州・その他）
- **Ch.3** 技術的インパクト（BGP・DNS・TLS・クラウド）
- **Ch.4** グローバルサービスへの影響（AWS・GCP・SaaS）
- **Ch.5** エンジニアの対応策（設計パターン・チェックリスト）
- **Ch.6** まとめ・未来シナリオ


---

<!-- _class: lead -->
# Ch.1 スプリンターネットとは何か

- 定義・歴史・3つの分断軸


---

# スプリンターネットの定義

- **Splinternet** = 「Splinter（分裂）」+ 「Internet」の造語
- 地政学・規制・市場競争によって、単一のグローバルネットワークが複数の**閉じたサブネットワーク**へ分断される現象
- 
| 分断の種類 | 例 |
|---|---|
| **政治的** | GFW、Runet、コンテンツブロック |
| **法的・規制的** | GDPR、データローカライゼーション |
| **技術的** | 独自プロトコル、国家PKI |
| **市場的** | 国産プラットフォーム優遇 |


---

# 分裂の歴史年表

- <svg viewBox="0 0 760 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">スプリンターネット化の歴史</text><text x="380" y="50" text-anchor="middle" font-size="11" fill="#666">2000年代〜現在：段階的な分断の進行</text><line x1="40" y1="150" x2="720" y2="150" stroke="#555" stroke-width="2"/><polygon points="716,144 716,156 726,150" fill="#555"/><circle cx="80" cy="150" r="6" fill="#4CAF50"/><text x="80" y="140" text-anchor="middle" font-size="11" fill="#333">2000</text><text x="80" y="175" text-anchor="middle" font-size="10" fill="#555">中国GFW</text><text x="80" y="187" text-anchor="middle" font-size="10" fill="#555">本格稼働</text><circle cx="200" cy="150" r="6" fill="#2196F3"/><text x="200" y="140" text-anchor="middle" font-size="11" fill="#333">2013</text><text x="200" y="175" text-anchor="middle" font-size="10" fill="#555">スノーデン暴露</text><text x="200" y="187" text-anchor="middle" font-size="10" fill="#555">データ主権台頭</text><circle cx="320" cy="150" r="6" fill="#FF9800"/><text x="320" y="140" text-anchor="middle" font-size="11" fill="#333">2018</text><text x="320" y="175" text-anchor="middle" font-size="10" fill="#555">GDPR施行</text><text x="320" y="187" text-anchor="middle" font-size="10" fill="#555">欧州データ主権</text><circle cx="440" cy="150" r="6" fill="#E91E63"/><text x="440" y="140" text-anchor="middle" font-size="11" fill="#333">2019</text><text x="440" y="175" text-anchor="middle" font-size="10" fill="#555">ロシアRunet法</text><text x="440" y="187" text-anchor="middle" font-size="10" fill="#555">自律化開始</text><circle cx="560" cy="150" r="6" fill="#9C27B0"/><text x="560" y="140" text-anchor="middle" font-size="11" fill="#333">2020</text><text x="560" y="175" text-anchor="middle" font-size="10" fill="#555">米中5G分断</text><text x="560" y="187" text-anchor="middle" font-size="10" fill="#555">TikTok問題</text><circle cx="660" cy="150" r="6" fill="#F44336"/><text x="660" y="140" text-anchor="middle" font-size="11" fill="#333">2022〜</text><text x="660" y="175" text-anchor="middle" font-size="10" fill="#555">ロシア制裁</text><text x="660" y="187" text-anchor="middle" font-size="10" fill="#555">加速する分断</text></svg>


---

# 3つの分断軸

- <svg viewBox="0 0 760 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="35" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">スプリンターネット 3つの分断軸</text><rect x="30" y="60" width="200" height="180" rx="10" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/><text x="130" y="95" text-anchor="middle" font-size="15" font-weight="bold" fill="#1565C0">技術</text><text x="130" y="120" text-anchor="middle" font-size="11" fill="#333">BGP・DNS・TLS</text><text x="130" y="138" text-anchor="middle" font-size="11" fill="#333">独自プロトコル</text><text x="130" y="156" text-anchor="middle" font-size="11" fill="#333">国家PKI</text><text x="130" y="174" text-anchor="middle" font-size="11" fill="#333">クラウドリージョン</text><text x="130" y="222" text-anchor="middle" font-size="10" fill="#888">インフラレイヤー</text><rect x="280" y="60" width="200" height="180" rx="10" fill="#FFF8E1" stroke="#E65100" stroke-width="2"/><text x="380" y="95" text-anchor="middle" font-size="15" font-weight="bold" fill="#E65100">政策</text><text x="380" y="120" text-anchor="middle" font-size="11" fill="#333">コンテンツ規制</text><text x="380" y="138" text-anchor="middle" font-size="11" fill="#333">データローカライゼーション</text><text x="380" y="156" text-anchor="middle" font-size="11" fill="#333">越境データ制限</text><text x="380" y="174" text-anchor="middle" font-size="11" fill="#333">国家安全保障法</text><text x="380" y="222" text-anchor="middle" font-size="10" fill="#888">規制レイヤー</text><rect x="530" y="60" width="200" height="180" rx="10" fill="#F3E5F5" stroke="#6A1B9A" stroke-width="2"/><text x="630" y="95" text-anchor="middle" font-size="15" font-weight="bold" fill="#6A1B9A">市場</text><text x="630" y="120" text-anchor="middle" font-size="11" fill="#333">国産プラットフォーム</text><text x="630" y="138" text-anchor="middle" font-size="11" fill="#333">補助金・優遇政策</text><text x="630" y="156" text-anchor="middle" font-size="11" fill="#333">外資参入規制</text><text x="630" y="174" text-anchor="middle" font-size="11" fill="#333">デジタル覇権競争</text><text x="630" y="222" text-anchor="middle" font-size="10" fill="#888">市場レイヤー</text></svg>


---

# 世界インターネット規制マップ

- <svg viewBox="0 0 760 310" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">世界インターネット規制マップ（2026年版）</text><rect x="20" y="50" width="720" height="240" rx="8" fill="#F5F5F5" stroke="#ccc" stroke-width="1"/><rect x="60" y="90" width="120" height="60" rx="6" fill="#F44336" stroke="#C62828" stroke-width="2"/><text x="120" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="white">中国</text><text x="120" y="134" text-anchor="middle" font-size="10" fill="#FFCDD2">閉鎖型・最高度規制</text><rect x="200" y="90" width="120" height="60" rx="6" fill="#E53935" stroke="#B71C1C" stroke-width="2"/><text x="260" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="white">ロシア</text><text x="260" y="134" text-anchor="middle" font-size="10" fill="#FFCDD2">自律化・分離志向</text><rect x="340" y="90" width="120" height="60" rx="6" fill="#FF9800" stroke="#E65100" stroke-width="2"/><text x="400" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="white">欧州</text><text x="400" y="134" text-anchor="middle" font-size="10" fill="#FFF3E0">GDPR・データ主権</text><rect x="480" y="90" width="120" height="60" rx="6" fill="#2196F3" stroke="#0D47A1" stroke-width="2"/><text x="540" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="white">米国</text><text x="540" y="134" text-anchor="middle" font-size="10" fill="#E3F2FD">輸出規制・安保重視</text><rect x="620" y="90" width="120" height="60" rx="6" fill="#FF5722" stroke="#BF360C" stroke-width="2"/><text x="680" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="white">イラン・北朝鮮</text><text x="680" y="134" text-anchor="middle" font-size="10" fill="#FBE9E7">完全閉鎖型</text><rect x="60" y="190" width="120" height="60" rx="6" fill="#FF9800" stroke="#F57F17" stroke-width="1"/><text x="120" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="white">インド</text><text x="120" y="234" text-anchor="middle" font-size="10" fill="#FFF8E1">アプリ禁止・規制強化</text><rect x="200" y="190" width="120" height="60" rx="6" fill="#FFC107" stroke="#FF8F00" stroke-width="1"/><text x="260" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">ブラジル</text><text x="260" y="234" text-anchor="middle" font-size="10" fill="#555">データ法（LGPD）</text><rect x="340" y="190" width="120" height="60" rx="6" fill="#8BC34A" stroke="#33691E" stroke-width="1"/><text x="400" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="white">日本・韓国</text><text x="400" y="234" text-anchor="middle" font-size="10" fill="#F1F8E9">比較的オープン</text><rect x="60" y="270" width="15" height="10" fill="#F44336"/><text x="82" y="280" font-size="10" fill="#333">閉鎖・高規制</text><rect x="180" y="270" width="15" height="10" fill="#FF9800"/><text x="202" y="280" font-size="10" fill="#333">中規制・主権志向</text><rect x="330" y="270" width="15" height="10" fill="#8BC34A"/><text x="352" y="280" font-size="10" fill="#333">比較的オープン</text></svg>


---

<!-- _class: lead -->
# Ch.2 地政学的背景

- 中国・ロシア・欧州・その他地域の規制実態


---

# 中国：グレートファイアウォール（GFW）

- **概要**: 2000年代初頭から本格稼働。世界最大規模のコンテンツフィルタリングシステム
- 
- **ブロック対象**: Google・Facebook・YouTube・Twitter・WhatsApp・GitHub（一時）
- **技術手法**: DNS汚染、IP遮断、Deep Packet Inspection（DPI）、SNI検査
- **規模**: 推定50万〜100万ドメインをブロック。常時更新される動的リスト
- 
- **エンジニアへの影響**:
- - npm / PyPI / Docker Hub へのアクセス不安定
- - HTTPS接続がDPIで遮断されるケースあり
- - VPN利用は技術的に可能だが法的グレーゾーン


---

# ロシア：Runet 自律インターネット法

- **2019年**: 「主権インターネット法」成立 → インターネットの国内自律運用を義務化
- **目標**: 外部との接続を遮断しても機能するロシア国内インターネット（Runet）の構築
- 
- **実装内容**:
- - ТСПУ（トラフィック管理装置）をISPに設置義務化
- - 国家管理DNSルートサーバーの構築
- - BGPルートの国内優先制御
- 
- **2022年以降**: ウクライナ侵攻後の西側制裁 → Facebook・Instagram・Twitter遮断
- - Cloudflare・一部AWSサービスへの影響も発生


---

# 欧州：GDPR・DSA・データ主権

- **GDPR（2018年〜）**: EU市民データの域外移転を厳格規制
- - 米国企業との「データ移転枠組み」が繰り返し無効化される問題（Schrems I/II）
- - 日本は十分性認定済みだが、条件変更リスクあり
- 
- **DSA/DMA（2022〜2023年〜）**: プラットフォーム規制の強化
- - 大規模プラットフォームへのアルゴリズム透明性・相互運用性要求
- 
- **EU Cyber Resilience Act**: IoT・ソフトウェアへのセキュリティ要件義務化（2027年〜）
- 
- **エンジニアへの影響**: EU向けサービスは**設計段階からコンプライアンス対応**が必要


---

# その他地域の動向

| 国・地域 | 主な規制・動向 | エンジニアへの影響 |
|---|---|---|
| **インド** | 中国系アプリ200以上禁止、データ保護法（DPDP） | インド向けデータの国内保存要件 |
| **ブラジル** | LGPD（GDPR類似）、クラウド行政データの国内化 | 南米市場でのデータ主権対応 |
| **イラン** | 独自イントラネット（NIN）、ほぼ完全閉鎖 | サービス提供不可に近い状況 |
| **トルコ** | SNS・VPN規制強化、TwitterやWikipedia一時遮断 | 可用性の不安定化 |
| **東南アジア** | タイ・ベトナム等でデータローカライゼーション法 | リージョン戦略の見直し必要 |


---

# 分断加速要因：米中デカップリング

- **テック覇権争い** = インターネット分断の最大エンジン
- 
- **米国側の動き**:
- - Huawei・ZTE・ByteDance等への輸出規制・禁止
- - CHIPS法（2022）：半導体の中国輸出制限
- - TikTok強制売却法（2024）
- 
- **中国側の動き**:
- - 「技術自立自強」政策：国産OS・CPU・クラウドへの置き換え
- - 独自規格・プロトコル標準化（IPv6拡張等）
- 
- **結果**: 技術スタックが「西側系」と「中国系」に2分化しつつある


---

<!-- _class: lead -->
# Ch.3 技術的インパクト

- BGP・DNS・TLS・クラウドへの具体的影響


---

# BGP ルーティングの地政学化

- **BGP（Border Gateway Protocol）** = インターネットの「道路地図」
- 
- **通常**: 最短・最安定経路を自律選択（政治的意図なし）
- **分断後**: 国家がルーティングポリシーに介入
- 
- **実際の事件**:
- - **2010年**: 中国Telecom が米国トラフィックを15分間ハイジャック（BGP誤設定）
- - **2019年**: ロシアMTS が複数AS経路を国内迂回
- - **2022年**: ロシア制裁後、BGP経路変更による一部サービス遅延
- 
- **リスク**: 意図的なルート変更 → 中間者攻撃・盗聴・遅延の可能性
- **対策**: RPKI（Resource Public Key Infrastructure）による経路正当性検証


---

# DNS 分断：独自 TLD と国家 DNS

- **DNS** = インターネットの「電話帳」。分断されると名前解決が機能しなくなる
- 
- **中国の独自TLD**: `.政務`（.zhengwu）等の国内専用ドメイン
- **ロシアの試み**: 国家管理DNSルートサーバー（ICCANから独立可能な構造）
- **DoH/DoT（DNS over HTTPS/TLS）**: プライバシー保護目的だが、国家フィルタリングを回避するため規制の対象に
- 
- **DNSハイジャック事例**:
- - イランの国内ISPによるGoogle・Facebook DNSレスポンス改ざん
- - GFWによる海外ドメインへのNXDOMAIN返却
- 
- **エンジニア対策**: DNS冗長化・DoH/DoT活用・フォールバック設計


---

# TLS/PKI 信頼チェーンの断絶リスク

- **TLS** = HTTPS通信の暗号化基盤。**PKI** = 証明書の信頼チェーン
- 
- **問題**: 国家が「自国認証局（CA）」をルートCAとして強制インストールさせるリスク
- 
- **実例:**
- - **カザフスタン（2019・2020年）**: 政府がISPに国家ルートCA証明書の強制インストールを要求 → Mozillaが拒否・対抗措置
- - **中国**: 政府系CA（CNNIC等）がルートストアに存在
- 
- **影響**: 国家CAが信頼されると中間者攻撃（MITM）が技術的に可能になる
- **対策**: Certificate Transparency（CT）ログ監視、CAA レコード設定、証明書ピンニング


---

# クラウドリージョン戦略の変化

- **データ主権要件** = クラウドリージョン戦略を根本から変える
- 
- **主要クラウドの対応:**
| クラウド | 対応 |
|---|---|
| **AWS** | GovCloud、中国リージョン（Sinnet運営）、EU主権クラウド計画 |
| **Azure** | ドイツ・中国は現地法人運営、「Azure Government」 |
| **GCP** | Assured Workloads、欧州主権クラウド（T-Systems連携） |
- 
- **重要**: 中国リージョンは**別アカウント・別契約**。グローバルアカウントでは利用不可
- **重要**: EU向けデータは**EU外に出てはならない**ケースが増加中


---

# CDN・エッジの再配置

- **CDN** = コンテンツ配信ネットワーク。エッジサーバーの地理的配置が規制に直撃
- 
- **Cloudflare の対応:**
- - ロシア制裁後もサービス継続 vs ウクライナからの撤退要求 → ポリシー対応
- - 「Content Blocking」機能：地域単位でコンテンツをブロック
- 
- **Fastly・Akamai**: 国家の要求に応じた地域ブロック機能を提供
- 
- **技術的考慮点:**
- - CDNのエッジがどの国の管轄下にあるか
- - TLSターミネーションがどの国で行われるか（傍受リスク）
- - エッジキャッシュと規制対象コンテンツの関係


---

# 技術レイヤー別インパクトまとめ

- <svg viewBox="0 0 760 310" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">技術レイヤー別スプリンターネット影響</text><rect x="30" y="50" width="700" height="42" rx="5" fill="#FFCDD2" stroke="#E53935" stroke-width="1"/><text x="130" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#B71C1C">アプリ / コンテンツ</text><text x="430" y="70" font-size="11" fill="#333">SNS・動画サービスのブロック、コンテンツフィルタリング、アプリ禁止</text><text x="430" y="84" font-size="11" fill="#333">影響度: ★★★★★</text><rect x="30" y="100" width="700" height="42" rx="5" fill="#FFE0B2" stroke="#E65100" stroke-width="1"/><text x="130" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#E65100">TLS / PKI</text><text x="430" y="120" font-size="11" fill="#333">国家認証局による信頼チェーン操作、MITM リスク</text><text x="430" y="134" font-size="11" fill="#333">影響度: ★★★★☆</text><rect x="30" y="150" width="700" height="42" rx="5" fill="#FFF9C4" stroke="#F9A825" stroke-width="1"/><text x="130" y="176" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57F17">DNS</text><text x="430" y="170" font-size="11" fill="#333">DNSハイジャック、国家DNSルートサーバー、独自TLD</text><text x="430" y="184" font-size="11" fill="#333">影響度: ★★★★☆</text><rect x="30" y="200" width="700" height="42" rx="5" fill="#E8F5E9" stroke="#2E7D32" stroke-width="1"/><text x="130" y="226" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">BGP / ルーティング</text><text x="430" y="220" font-size="11" fill="#333">経路ハイジャック、国家介入ルーティング、RPKI未整備リスク</text><text x="430" y="234" font-size="11" fill="#333">影響度: ★★★☆☆</text><rect x="30" y="250" width="700" height="42" rx="5" fill="#E3F2FD" stroke="#1565C0" stroke-width="1"/><text x="130" y="276" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565C0">物理 / 海底ケーブル</text><text x="430" y="270" font-size="11" fill="#333">海底ケーブルの地政学（米中対立）、着陸点の国家管理</text><text x="430" y="284" font-size="11" fill="#333">影響度: ★★☆☆☆</text></svg>


---

<!-- _class: lead -->
# Ch.4 グローバルサービスへの影響

- クラウド・SaaS・グローバルプロダクトへの実態


---

# クラウドプロバイダーの対応戦略

- <svg viewBox="0 0 760 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">クラウドプロバイダー 地域対応比較</text><rect x="30" y="45" width="220" height="210" rx="8" fill="#FFF8E1" stroke="#FF6F00" stroke-width="2"/><text x="140" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#E65100">AWS</text><text x="140" y="95" text-anchor="middle" font-size="10" fill="#333">中国リージョン</text><text x="140" y="110" text-anchor="middle" font-size="10" fill="#555">（Sinnet/NWCD運営）</text><text x="140" y="130" text-anchor="middle" font-size="10" fill="#333">GovCloud（US）</text><text x="140" y="148" text-anchor="middle" font-size="10" fill="#333">EU Sovereign Cloud計画</text><text x="140" y="168" text-anchor="middle" font-size="10" fill="#333">中東・アフリカ展開</text><text x="140" y="230" text-anchor="middle" font-size="10" fill="#E65100" font-weight="bold">⚠ 中国は別契約必須</text><rect x="270" y="45" width="220" height="210" rx="8" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/><text x="380" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#0D47A1">Azure</text><text x="380" y="95" text-anchor="middle" font-size="10" fill="#333">中国リージョン</text><text x="380" y="110" text-anchor="middle" font-size="10" fill="#555">（21Vianet運営）</text><text x="380" y="130" text-anchor="middle" font-size="10" fill="#333">ドイツ主権クラウド</text><text x="380" y="148" text-anchor="middle" font-size="10" fill="#555">（T-Systems管理）</text><text x="380" y="168" text-anchor="middle" font-size="10" fill="#333">Azure Government</text><text x="380" y="230" text-anchor="middle" font-size="10" fill="#0D47A1" font-weight="bold">⚠ EU規制対応強化中</text><rect x="510" y="45" width="220" height="210" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/><text x="620" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#1B5E20">GCP</text><text x="620" y="95" text-anchor="middle" font-size="10" fill="#333">Assured Workloads</text><text x="620" y="113" text-anchor="middle" font-size="10" fill="#333">欧州主権クラウド</text><text x="620" y="128" text-anchor="middle" font-size="10" fill="#555">（T-Systems連携）</text><text x="620" y="148" text-anchor="middle" font-size="10" fill="#333">Confidential Computing</text><text x="620" y="168" text-anchor="middle" font-size="10" fill="#333">中国リージョンなし</text><text x="620" y="230" text-anchor="middle" font-size="10" fill="#1B5E20" font-weight="bold">⚠ 中国市場は事実上撤退</text></svg>


---

# データローカライゼーション要件

- **定義**: 特定カテゴリのデータを、収集した国内に保存・処理することを義務付ける法律
- 
| 国・地域 | 対象データ | 要件 |
|---|---|---|
| **EU（GDPR）** | 全個人データ | 十分性認定国への移転のみ許可 |
| **中国（データセキュリティ法）** | 重要データ・個人情報 | 原則国内保存、越境は当局審査 |
| **ロシア（個人情報保護法）** | ロシア市民の個人データ | 国内サーバーへの保存義務 |
| **インド（DPDP法）** | 機微個人データ | 国内処理優先、越境制限 |
- 
- **エンジニアへの影響**: 「1つのグローバルDB」設計は通用しない → **地域分離ストレージ**が必須


---

# ケーススタディ：TikTok / Zoom / WhatsApp

- **TikTok（ByteDance）**:
- - 米国でのデータが中国政府にアクセス可能との懸念 → 強制売却法（2024）
- - 対応: 「Project Texas」米国データをOracle US管理に移行、コードの分離
- 
- **Zoom**:
- - コロナ禍でのデータ中国経由ルーティング問題（2020年発覚）
- - 対応: 有料ユーザーはデータセンター地域を選択可能に、E2E暗号化強化
- 
- **WhatsApp（Meta）**:
- - EU vs Meta：EUデータの米国移転が繰り返し問題化
- - インドの「重大SNS仲介者」規制 → 政府要求へのコンテンツ開示義務
- 
- **共通教訓**: グローバルアーキテクチャは**地政学リスクを内包している**


---

# サービス設計の分岐点

- <svg viewBox="0 0 760 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">グローバル一元 vs 地域分離アーキテクチャ</text><rect x="30" y="50" width="320" height="200" rx="8" fill="#FFEBEE" stroke="#C62828" stroke-width="2"/><text x="190" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">グローバル一元型（旧来）</text><text x="190" y="100" text-anchor="middle" font-size="11" fill="#333">単一DBに全ユーザーデータ</text><text x="190" y="118" text-anchor="middle" font-size="11" fill="#333">グローバルCDN・単一エンドポイント</text><text x="190" y="136" text-anchor="middle" font-size="11" fill="#333">コスト最小・管理簡単</text><text x="190" y="160" text-anchor="middle" font-size="11" fill="#C62828">✗ GDPR違反リスク</text><text x="190" y="178" text-anchor="middle" font-size="11" fill="#C62828">✗ 中国・ロシアから遮断</text><text x="190" y="196" text-anchor="middle" font-size="11" fill="#C62828">✗ 規制変更に脆弱</text><rect x="410" y="50" width="320" height="200" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/><text x="570" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">地域分離型（現代）</text><text x="570" y="100" text-anchor="middle" font-size="11" fill="#333">リージョン別データストア</text><text x="570" y="118" text-anchor="middle" font-size="11" fill="#333">地域ごとのエンドポイント</text><text x="570" y="136" text-anchor="middle" font-size="11" fill="#333">コンプライアンス・バイ・デザイン</text><text x="570" y="160" text-anchor="middle" font-size="11" fill="#2E7D32">✓ GDPR対応済み</text><text x="570" y="178" text-anchor="middle" font-size="11" fill="#2E7D32">✓ 規制変更に対応しやすい</text><text x="570" y="196" text-anchor="middle" font-size="11" fill="#FF8F00">△ 運用コスト増・データ同期複雑</text><polygon points="355,150 405,140 405,160" fill="#555"/><text x="380" y="148" text-anchor="middle" font-size="20" fill="#555">→</text></svg>


---

<!-- _class: lead -->
# Ch.5 エンジニアの対応策

- 分断された世界での設計パターン


---

# 設計パターン①：リージョン分離アーキテクチャ

- **原則**: データの物理的な所在地を設計の第一級概念として扱う
- 
- **実装パターン:**
- - **Cell-based Architecture**: ユーザーを地域ごとの「セル」に割り当て、データが他セルに漏れない設計
- - **Geo-sharding**: DBシャードを地域単位で分割。EU shard / US shard / APAC shard
- - **Federated Identity**: 地域をまたいだSSO不要の設計（各リージョンで独立認証）
- 
- **考慮点:**
- - ユーザーの地域変更時のデータ移行ポリシー
- - グローバルな集計分析のための匿名化・集約パイプライン
- - 「どのデータが規制対象か」の分類（機微 / 非機微）


---

# 設計パターン②：コンプライアンス・バイ・デザイン

- **「後付けコンプライアンス」の問題**: 規制対応をリリース後に行うと改修コストが10倍以上になる
- 
- **設計段階での組み込み:**
- - **Data Classification Layer**: 全データに `sensitivity`, `jurisdiction`, `retention` をタグ付け
- - **Policy Engine**: データアクセス時にリアルタイムで規制ポリシーを評価（Open Policy Agent等）
- - **Audit Log**: 規制当局への説明責任のためのイミュータブルな操作ログ
- 
- **実装例（OPA ポリシー）:**
- 
- ```rego
allow {
  input.user.jurisdiction == input.data.jurisdiction
  not data.restricted_countries[input.user.country]
}
```


---

# 設計パターン③：フォールバック戦略

- **前提**: 特定地域からの接続が突然切断されることを「通常の障害」として設計する
- 
- **縮退設計の原則:**
- - **Circuit Breaker**: 外部サービスへの依存を監視し、遮断時に代替フローへ切替
- - **Graceful Degradation**: CDN遮断 → オリジンサーバー直接、外部OAuth → 内部認証
- - **Feature Flags by Region**: 地域ごとに機能のON/OFFを動的に切替
- 
- **テスト戦略:**
- - 「中国からのアクセスをシミュレート」するChaos Engineering
- - GFW相当のDPI・DNS汚染をローカル環境で再現するツール（GFW-Knocker等）
- - 定期的な「制裁シナリオ」演習


---

# 実践チェックリスト

- <svg viewBox="0 0 760 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">スプリンターネット対応 5ステップフレームワーク</text><rect x="30" y="50" width="140" height="210" rx="8" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/><text x="100" y="80" text-anchor="middle" font-size="28" font-weight="bold" fill="#1565C0">①</text><text x="100" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565C0">データ分類</text><text x="100" y="125" text-anchor="middle" font-size="10" fill="#333">機微・非機微</text><text x="100" y="140" text-anchor="middle" font-size="10" fill="#333">管轄区分</text><text x="100" y="155" text-anchor="middle" font-size="10" fill="#333">保持期間</text><rect x="182" y="50" width="140" height="210" rx="8" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/><text x="252" y="80" text-anchor="middle" font-size="28" font-weight="bold" fill="#F57F17">②</text><text x="252" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">リージョン設計</text><text x="252" y="125" text-anchor="middle" font-size="10" fill="#333">Cell-based</text><text x="252" y="140" text-anchor="middle" font-size="10" fill="#333">Geo-sharding</text><text x="252" y="155" text-anchor="middle" font-size="10" fill="#333">Federated ID</text><rect x="334" y="50" width="140" height="210" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/><text x="404" y="80" text-anchor="middle" font-size="28" font-weight="bold" fill="#7B1FA2">③</text><text x="404" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">ポリシーエンジン</text><text x="404" y="125" text-anchor="middle" font-size="10" fill="#333">OPA導入</text><text x="404" y="140" text-anchor="middle" font-size="10" fill="#333">Audit Log</text><text x="404" y="155" text-anchor="middle" font-size="10" fill="#333">アクセス制御</text><rect x="486" y="50" width="140" height="210" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/><text x="556" y="80" text-anchor="middle" font-size="28" font-weight="bold" fill="#2E7D32">④</text><text x="556" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">フォールバック</text><text x="556" y="125" text-anchor="middle" font-size="10" fill="#333">Circuit Breaker</text><text x="556" y="140" text-anchor="middle" font-size="10" fill="#333">Feature Flag</text><text x="556" y="155" text-anchor="middle" font-size="10" fill="#333">縮退設計</text><rect x="590" y="50" width="140" height="210" rx="8" fill="#FCE4EC" stroke="#C62828" stroke-width="2"/><text x="660" y="80" text-anchor="middle" font-size="28" font-weight="bold" fill="#C62828">⑤</text><text x="660" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">継続的監視</text><text x="660" y="125" text-anchor="middle" font-size="10" fill="#333">規制変更追跡</text><text x="660" y="140" text-anchor="middle" font-size="10" fill="#333">Chaos Testing</text><text x="660" y="155" text-anchor="middle" font-size="10" fill="#333">年次レビュー</text></svg>


---

# グループディスカッション

- **課題**: あなたの担当サービスに置き換えて考えてみよう
- 
- **ディスカッション Q1**: 自分のサービスで「規制対象になりうるデータ」はどれか？
- - 個人情報・決済情報・位置情報・通信内容 etc.
- 
- **ディスカッション Q2**: 中国またはEUからのアクセスが突然遮断されたとき、何が壊れるか？
- - CDN・外部OAuth・サードパーティAPI・分析基盤 etc.
- 
- **ディスカッション Q3**: 今すぐできる対応と、長期的に必要な設計変更は何か？
- 
- **時間**: 15分 → グループ発表 5分


---

<!-- _class: lead -->
# Ch.6 まとめ

- 今日学んだこと・未来シナリオ


---

# 今日学んだこと

- **スプリンターネットは「起きるかもしれない話」ではなく、今まさに進行中**
- 
- 1. **地政学的背景**: 中国・ロシア・欧州・米国が異なる動機でインターネットを分断
- 2. **技術的現実**: BGP・DNS・TLS・クラウドリージョンの全レイヤーに影響
- 3. **グローバルサービスへの影響**: 「グローバル一元設計」はもはや機能しない
- 4. **エンジニアの責任**: データ分類・リージョン設計・フォールバック・継続監視
- 
- **「インターネットはひとつ」という前提を捨てることが、現代エンジニアの第一歩**


---

# インターネットの未来シナリオ

- <svg viewBox="0 0 760 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x="380" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">3つの未来シナリオ</text><rect x="30" y="50" width="210" height="190" rx="8" fill="#FFEBEE" stroke="#C62828" stroke-width="2"/><text x="135" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">シナリオA</text><text x="135" y="95" text-anchor="middle" font-size="12" fill="#C62828">完全分断型</text><text x="135" y="118" text-anchor="middle" font-size="10" fill="#333">米・欧・中・露が</text><text x="135" y="133" text-anchor="middle" font-size="10" fill="#333">それぞれ独立した</text><text x="135" y="148" text-anchor="middle" font-size="10" fill="#333">インターネットを運用</text><text x="135" y="170" text-anchor="middle" font-size="10" fill="#C62828">可能性: 中</text><text x="135" y="188" text-anchor="middle" font-size="10" fill="#888">相互接続は</text><text x="135" y="203" text-anchor="middle" font-size="10" fill="#888">例外的措置に</text><rect x="275" y="50" width="210" height="190" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/><text x="380" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">シナリオB</text><text x="380" y="95" text-anchor="middle" font-size="12" fill="#2E7D32">ハイブリッド型</text><text x="380" y="118" text-anchor="middle" font-size="10" fill="#333">技術的には接続を維持</text><text x="380" y="133" text-anchor="middle" font-size="10" fill="#333">しながらも法的・</text><text x="380" y="148" text-anchor="middle" font-size="10" fill="#333">規制的に分断が進む</text><text x="380" y="170" text-anchor="middle" font-size="10" fill="#2E7D32">可能性: 高（現状延長）</text><text x="380" y="188" text-anchor="middle" font-size="10" fill="#555">最も現実的な</text><text x="380" y="203" text-anchor="middle" font-size="10" fill="#555">シナリオ</text><rect x="520" y="50" width="210" height="190" rx="8" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/><text x="625" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565C0">シナリオC</text><text x="625" y="95" text-anchor="middle" font-size="12" fill="#1565C0">再統合型</text><text x="625" y="118" text-anchor="middle" font-size="10" fill="#333">国際的なデジタル条約</text><text x="625" y="133" text-anchor="middle" font-size="10" fill="#333">による標準化・</text><text x="625" y="148" text-anchor="middle" font-size="10" fill="#333">相互運用性の回復</text><text x="625" y="170" text-anchor="middle" font-size="10" fill="#1565C0">可能性: 低</text><text x="625" y="188" text-anchor="middle" font-size="10" fill="#888">政治的合意が</text><text x="625" y="203" text-anchor="middle" font-size="10" fill="#888">必要</text></svg>
- 
- **エンジニアの合理的選択**: シナリオBを前提に設計し、AにもCにも対応できる柔軟性を持つ


---

# 参考文献・Q&A

- **地政学・政策:**
- - [Freedom on the Net 2024 – Freedom House](https://freedomhouse.org/report/freedom-on-the-net)
- - [The Splinternet – CFR Backgrounder](https://www.cfr.org/backgrounder/splinternet)
- 
- **技術・インフラ:**
- - [RPKI – RIPE NCC](https://www.ripe.net/manage-ips-and-asns/resource-management/rpki)
- - [Certificate Transparency – Google](https://certificate.transparency.dev/)
- - [BGP Hijacking – MANRS Observatory](https://observatory.manrs.org/)
- 
- **設計パターン:**
- - [Cell-based Architecture – AWS Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/cell-based-architecture.html)
- - [Open Policy Agent – OPA Docs](https://www.openpolicyagent.org/docs/)
- 
- ---
- 
- **Q&A**

