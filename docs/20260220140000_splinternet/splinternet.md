---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "インターネットの分裂"
footer: "© 2026"
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

> *統一インターネットの幻想はすでに崩れ3大圏への分断が進行中*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="40" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">インターネットの理想 vs 現実</text><rect x="40" y="70" width="320" height="280" rx="12" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="200" y="105" text-anchor="middle" font-size="14" font-weight="bold" fill="#4CAF50">理想（1969〜2010年代）</text><circle cx="200" cy="200" r="70" fill="none" stroke="#4CAF50" stroke-width="2" stroke-dasharray="6,3"/><text x="200" y="175" text-anchor="middle" font-size="12" fill="#ffffff">グローバル</text><text x="200" y="195" text-anchor="middle" font-size="12" fill="#ffffff">単一</text><text x="200" y="215" text-anchor="middle" font-size="12" fill="#ffffff">オープン</text><text x="200" y="315" text-anchor="middle" font-size="11" fill="#aaaaaa">一つの相互接続ネットワーク</text><rect x="440" y="70" width="320" height="280" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="105" text-anchor="middle" font-size="14" font-weight="bold" fill="#e91e63">現実（2026年）</text><circle cx="530" cy="185" r="45" fill="none" stroke="#e53935" stroke-width="2"/><text x="530" y="183" text-anchor="middle" font-size="10" fill="#ffffff">中国</text><text x="530" y="198" text-anchor="middle" font-size="10" fill="#ffffff">GFW</text><circle cx="640" cy="175" r="38" fill="none" stroke="#FF9800" stroke-width="2"/><text x="640" y="173" text-anchor="middle" font-size="10" fill="#ffffff">欧州</text><text x="640" y="188" text-anchor="middle" font-size="10" fill="#ffffff">GDPR</text><circle cx="560" cy="260" r="38" fill="none" stroke="#2196F3" stroke-width="2"/><text x="560" y="258" text-anchor="middle" font-size="10" fill="#ffffff">米国</text><text x="560" y="273" text-anchor="middle" font-size="10" fill="#ffffff">輸出規制</text><circle cx="660" cy="255" r="32" fill="none" stroke="#9C27B0" stroke-width="2"/><text x="660" y="258" text-anchor="middle" font-size="10" fill="#ffffff">ロシア</text><text x="600" y="325" text-anchor="middle" font-size="11" fill="#aaaaaa">分断された複数のネットワーク</text></svg>
- **1969年〜2010年代**: ひとつのグローバルネットワークという理想
- **現実**: 中国・ロシア・欧州・米国がそれぞれ「自国のインターネット」を構築中
- **スプリンターネット** = 地政学・規制・市場によって分断されたインターネット
- 
- **今日の問い**: 我々エンジニアは分断された世界でどう設計するか？


---

# アジェンダ

> *歴史→技術→ビジネス影響→設計対応の順で体系的に理解する*

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

# 中国：グレートファイアウォール（GFW）（1/2）

> *GFWは世界最大の検閲システムで8億人が別のウェブを使う*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">グレートファイアウォール（GFW）構造</text><rect x="40" y="60" width="200" height="60" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="140" y="88" text-anchor="middle" font-size="12" fill="#4CAF50">中国国内ユーザー</text><text x="140" y="108" text-anchor="middle" font-size="10" fill="#aaaaaa">ブラウザ / アプリ</text><rect x="300" y="55" width="200" height="280" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="3"/><text x="400" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">GFW</text><text x="400" y="110" text-anchor="middle" font-size="11" fill="#ffffff">DNS汚染</text><text x="400" y="133" text-anchor="middle" font-size="11" fill="#ffffff">IP遮断</text><text x="400" y="156" text-anchor="middle" font-size="11" fill="#ffffff">DPI（パケット検査）</text><text x="400" y="179" text-anchor="middle" font-size="11" fill="#ffffff">SNI検査</text><text x="400" y="202" text-anchor="middle" font-size="11" fill="#ffffff">キーワードフィルタ</text><text x="400" y="230" text-anchor="middle" font-size="10" fill="#e91e63">推定50万〜100万ドメインをブロック</text><rect x="560" y="60" width="200" height="60" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="660" y="88" text-anchor="middle" font-size="12" fill="#2196F3">グローバルインターネット</text><text x="660" y="108" text-anchor="middle" font-size="10" fill="#aaaaaa">Google / YouTube / etc.</text><line x1="240" y1="90" x2="298" y2="90" stroke="#4CAF50" stroke-width="2"/><polygon points="298,85 298,95 308,90" fill="#4CAF50"/><line x1="502" y1="90" x2="558" y2="90" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="558,85 558,95 568,90" fill="#e91e63"/><text x="530" y="80" text-anchor="middle" font-size="10" fill="#e91e63">BLOCK</text><rect x="40" y="280" width="200" height="60" rx="8" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="140" y="308" text-anchor="middle" font-size="12" fill="#FF9800">国産サービス</text><text x="140" y="328" text-anchor="middle" font-size="10" fill="#aaaaaa">Baidu / WeChat / Weibo</text><line x1="240" y1="310" x2="298" y2="250" stroke="#FF9800" stroke-width="2"/><polygon points="295,245 305,245 300,255" fill="#FF9800"/><text x="400" y="360" text-anchor="middle" font-size="11" fill="#f9a825">国産プラットフォームへの誘導が目的</text></svg>
- **概要**: 2000年代初頭から本格稼働。世界最大規模のコンテンツフィルタリングシステム
- 
- **ブロック対象**: Google・Facebook・YouTube・Twitter・WhatsApp・GitHub（一時）
- **技術手法**: DNS汚染、IP遮断、Deep Packet Inspection（DPI）、SNI検査
- **規模**: 推定50万〜100万ドメインをブロック。常時更新される動的リスト


---

# 中国：グレートファイアウォール（GFW）（2/2）

> *AI・DPI・BGP制御の組み合わせが技術的回避を困難にする*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">GFWがエンジニアに与える影響</text><rect x="40" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">ブロックされるもの</text><text x="150" y="125" text-anchor="middle" font-size="11" fill="#ffffff">npm registry</text><text x="150" y="148" text-anchor="middle" font-size="11" fill="#ffffff">PyPI</text><text x="150" y="171" text-anchor="middle" font-size="11" fill="#ffffff">Docker Hub</text><text x="150" y="194" text-anchor="middle" font-size="11" fill="#ffffff">GitHub（一時的）</text><text x="150" y="217" text-anchor="middle" font-size="11" fill="#ffffff">Google APIs</text><text x="150" y="240" text-anchor="middle" font-size="11" fill="#ffffff">Slack / Zoom</text><text x="150" y="263" text-anchor="middle" font-size="11" fill="#ffffff">Stack Overflow</text><rect x="290" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="400" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#FF9800">不安定なもの</text><text x="400" y="125" text-anchor="middle" font-size="11" fill="#ffffff">HTTPS接続全般</text><text x="400" y="148" text-anchor="middle" font-size="11" fill="#ffffff">CDN配信</text><text x="400" y="171" text-anchor="middle" font-size="11" fill="#ffffff">VPN（法的グレー）</text><text x="400" y="194" text-anchor="middle" font-size="11" fill="#ffffff">DNS解決</text><text x="400" y="217" text-anchor="middle" font-size="11" fill="#ffffff">外部OAuth</text><rect x="540" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="650" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">対策</text><text x="650" y="125" text-anchor="middle" font-size="11" fill="#ffffff">ミラーリポジトリ</text><text x="650" y="148" text-anchor="middle" font-size="11" fill="#ffffff">国内CDN利用</text><text x="650" y="171" text-anchor="middle" font-size="11" fill="#ffffff">フォールバック設計</text><text x="650" y="194" text-anchor="middle" font-size="11" fill="#ffffff">タイムアウト短縮</text><text x="650" y="217" text-anchor="middle" font-size="11" fill="#ffffff">Graceful degradation</text></svg>
- 
- **エンジニアへの影響**:
- - npm / PyPI / Docker Hub へのアクセス不安定
- - HTTPS接続がDPIで遮断されるケースあり
- - VPN利用は技術的に可能だが法的グレーゾーン


---

# ロシア：Runet 自律インターネット法（1/2）

> *2019年法制化で国家が外部遮断できる自律ネットを構築済み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">Runet アーキテクチャ</text><rect x="260" y="55" width="280" height="60" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="400" y="83" text-anchor="middle" font-size="12" fill="#2196F3">グローバルインターネット（外部）</text><text x="400" y="103" text-anchor="middle" font-size="10" fill="#aaaaaa">ICANN / 国際BGP / グローバルDNS</text><rect x="220" y="155" width="360" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="3"/><text x="400" y="183" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">ТСПУ（トラフィック管理装置）</text><text x="400" y="205" text-anchor="middle" font-size="11" fill="#ffffff">全ISPに設置義務 / 国家によるトラフィック制御</text><text x="400" y="222" text-anchor="middle" font-size="10" fill="#aaaaaa">DPI・ルーティング介入・遮断スイッチ</text><rect x="100" y="280" width="200" height="60" rx="8" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="200" y="308" text-anchor="middle" font-size="12" fill="#FF9800">国家管理DNS</text><text x="200" y="328" text-anchor="middle" font-size="10" fill="#aaaaaa">ICAANから独立可能</text><rect x="500" y="280" width="200" height="60" rx="8" fill="#16213e" stroke="#9C27B0" stroke-width="2"/><text x="600" y="308" text-anchor="middle" font-size="12" fill="#9C27B0">BGP国内優先制御</text><text x="600" y="328" text-anchor="middle" font-size="10" fill="#aaaaaa">経路の国内迂回</text><line x1="400" y1="115" x2="400" y2="153" stroke="#2196F3" stroke-width="2"/><polygon points="395,153 405,153 400,163" fill="#2196F3"/><line x1="300" y1="237" x2="200" y2="278" stroke="#FF9800" stroke-width="2"/><polygon points="196,274 206,274 201,284" fill="#FF9800"/><line x1="500" y1="237" x2="600" y2="278" stroke="#9C27B0" stroke-width="2"/><polygon points="596,274 606,274 601,284" fill="#9C27B0"/><text x="400" y="375" text-anchor="middle" font-size="11" fill="#f9a825">目標：外部接続を遮断しても機能する自律ネットワーク</text></svg>
- **2019年**: 「主権インターネット法」成立 → インターネットの国内自律運用を義務化
- **目標**: 外部との接続を遮断しても機能するロシア国内インターネット（Runet）の構築
- 
- **実装内容**:
- - ТСПУ（トラフィック管理装置）をISPに設置義務化


---

# ロシア：Runet 自律インターネット法（2/2）

> *ウクライナ侵攻後に実際の国家インターネット制御が発動された*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">2022年制裁後のRunet実態</text><rect x="40" y="65" width="340" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="210" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">ロシアで遮断されたサービス</text><text x="210" y="125" text-anchor="middle" font-size="12" fill="#ffffff">Facebook / Instagram</text><text x="210" y="150" text-anchor="middle" font-size="12" fill="#ffffff">Twitter / X</text><text x="210" y="175" text-anchor="middle" font-size="12" fill="#ffffff">LinkedIn</text><text x="210" y="200" text-anchor="middle" font-size="12" fill="#ffffff">BBC / VOA</text><text x="210" y="225" text-anchor="middle" font-size="12" fill="#ffffff">一部AWSサービス</text><text x="210" y="250" text-anchor="middle" font-size="12" fill="#ffffff">Cloudflare（部分的）</text><text x="210" y="285" text-anchor="middle" font-size="10" fill="#aaaaaa">（2022年ウクライナ侵攻後）</text><rect x="420" y="65" width="340" height="300" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="590" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">代替として台頭したもの</text><text x="590" y="125" text-anchor="middle" font-size="12" fill="#ffffff">VKontakte (VK)</text><text x="590" y="150" text-anchor="middle" font-size="12" fill="#ffffff">Odnoklassniki</text><text x="590" y="175" text-anchor="middle" font-size="12" fill="#ffffff">Yandex（検索・地図）</text><text x="590" y="200" text-anchor="middle" font-size="12" fill="#ffffff">Telegram</text><text x="590" y="225" text-anchor="middle" font-size="12" fill="#ffffff">RuTube</text><text x="590" y="250" text-anchor="middle" font-size="12" fill="#ffffff">国産クラウド（Mail.ru）</text><text x="590" y="285" text-anchor="middle" font-size="10" fill="#aaaaaa">（国産エコシステムへの移行）</text><text x="400" y="385" text-anchor="middle" font-size="11" fill="#f9a825">制裁 → 分断の加速 → 国産依存の深化というサイクル</text></svg>
- - 国家管理DNSルートサーバーの構築
- - BGPルートの国内優先制御
- 
- **2022年以降**: ウクライナ侵攻後の西側制裁 → Facebook・Instagram・Twitter遮断
- - Cloudflare・一部AWSサービスへの影響も発生


---

# 欧州：GDPR・DSA・データ主権（1/2）

> *GDPRが事実上の世界基準となりデータローカル化を強制する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">欧州デジタル規制フレームワーク</text><rect x="40" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="150" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="#2196F3">GDPR（2018）</text><text x="150" y="110" text-anchor="middle" font-size="10" fill="#ffffff">EU市民データの保護</text><text x="150" y="128" text-anchor="middle" font-size="10" fill="#ffffff">越境移転の厳格規制</text><text x="150" y="146" text-anchor="middle" font-size="10" fill="#ffffff">違反：最大売上4%の罰金</text><text x="150" y="175" text-anchor="middle" font-size="10" fill="#aaaaaa">Schrems I/II問題</text><rect x="290" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="400" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="#FF9800">DSA/DMA（2022-23）</text><text x="400" y="110" text-anchor="middle" font-size="10" fill="#ffffff">大規模プラットフォーム規制</text><text x="400" y="128" text-anchor="middle" font-size="10" fill="#ffffff">アルゴリズム透明性</text><text x="400" y="146" text-anchor="middle" font-size="10" fill="#ffffff">相互運用性要求</text><text x="400" y="175" text-anchor="middle" font-size="10" fill="#aaaaaa">GAFA等が対象</text><rect x="540" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#9C27B0" stroke-width="2"/><text x="650" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="#9C27B0">CRA（2024〜）</text><text x="650" y="110" text-anchor="middle" font-size="10" fill="#ffffff">IoT・ソフトウェアの</text><text x="650" y="128" text-anchor="middle" font-size="10" fill="#ffffff">セキュリティ要件義務化</text><text x="650" y="146" text-anchor="middle" font-size="10" fill="#ffffff">脆弱性開示要求</text><text x="650" y="175" text-anchor="middle" font-size="10" fill="#aaaaaa">2027年完全施行</text><rect x="160" y="230" width="480" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="258" text-anchor="middle" font-size="13" font-weight="bold" fill="#f9a825">エンジニアへのインパクト</text><text x="400" y="282" text-anchor="middle" font-size="11" fill="#ffffff">設計段階からコンプライアンスを組み込む「Privacy by Design」が必須</text><text x="400" y="305" text-anchor="middle" font-size="11" fill="#ffffff">EU向けサービスは別アーキテクチャが必要になるケースも</text><text x="400" y="328" text-anchor="middle" font-size="11" fill="#aaaaaa">日本は十分性認定済みだが、条件変更リスクあり</text></svg>
- **GDPR（2018年〜）**: EU市民データの域外移転を厳格規制
- - 米国企業との「データ移転枠組み」が繰り返し無効化される問題（Schrems I/II）
- - 日本は十分性認定済みだが、条件変更リスクあり
- 
- **DSA/DMA（2022〜2023年〜）**: プラットフォーム規制の強化


---

# 欧州：GDPR・DSA・データ主権（2/2）

> *欧州の規制輸出が各国のデータ主権意識を急速に高めている*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">GDPRデータ移転フロー</text><rect x="40" y="65" width="180" height="80" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="130" y="100" text-anchor="middle" font-size="12" fill="#2196F3">EU内サービス</text><text x="130" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">データ収集</text><rect x="580" y="65" width="180" height="80" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="670" y="100" text-anchor="middle" font-size="12" fill="#4CAF50">十分性認定国</text><text x="670" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">日本・英国・カナダ等</text><rect x="580" y="205" width="180" height="80" rx="8" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="670" y="240" text-anchor="middle" font-size="12" fill="#FF9800">SCCによる移転</text><text x="670" y="260" text-anchor="middle" font-size="10" fill="#aaaaaa">米国・その他</text><rect x="580" y="305" width="180" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="670" y="338" text-anchor="middle" font-size="12" fill="#e91e63">移転禁止</text><text x="670" y="358" text-anchor="middle" font-size="10" fill="#aaaaaa">十分性なし・SCC不備</text><line x1="222" y1="105" x2="578" y2="105" stroke="#4CAF50" stroke-width="2"/><polygon points="574,100 584,105 574,110" fill="#4CAF50"/><text x="400" y="95" text-anchor="middle" font-size="10" fill="#4CAF50">自由に移転可能</text><line x1="222" y1="120" x2="578" y2="245" stroke="#FF9800" stroke-width="2" stroke-dasharray="6,3"/><polygon points="575,241 583,247 573,252" fill="#FF9800"/><text x="390" y="200" text-anchor="middle" font-size="10" fill="#FF9800">SCC+補完的措置</text><line x1="222" y1="130" x2="578" y2="335" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,4"/><polygon points="575,332 582,338 572,343" fill="#e91e63"/><text x="350" y="310" text-anchor="middle" font-size="10" fill="#e91e63">禁止（GDPR違反）</text></svg>
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

# 分断加速要因：米中デカップリング（1/2）

> *半導体・クラウド・AIの技術覇権争いがネット分断を加速する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">米中テックデカップリング</text><rect x="40" y="60" width="300" height="290" rx="10" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="190" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="#2196F3">米国側の動き</text><text x="190" y="120" text-anchor="middle" font-size="11" fill="#ffffff">Huawei / ZTE 輸出規制・禁止</text><text x="190" y="145" text-anchor="middle" font-size="11" fill="#ffffff">CHIPS法（2022）半導体輸出制限</text><text x="190" y="170" text-anchor="middle" font-size="11" fill="#ffffff">TikTok強制売却法（2024）</text><text x="190" y="195" text-anchor="middle" font-size="11" fill="#ffffff">ByteDance / Alibaba Cloud 規制</text><text x="190" y="220" text-anchor="middle" font-size="11" fill="#ffffff">AI・量子技術輸出管理</text><text x="190" y="260" text-anchor="middle" font-size="10" fill="#aaaaaa">国家安全保障を優先した</text><text x="190" y="278" text-anchor="middle" font-size="10" fill="#aaaaaa">技術デカップリング</text><rect x="460" y="60" width="300" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="610" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="#e91e63">中国側の動き</text><text x="610" y="120" text-anchor="middle" font-size="11" fill="#ffffff">技術自立自強政策</text><text x="610" y="145" text-anchor="middle" font-size="11" fill="#ffffff">国産OS（麒麟OS等）</text><text x="610" y="170" text-anchor="middle" font-size="11" fill="#ffffff">国産CPU（飛騰・龍芯）</text><text x="610" y="195" text-anchor="middle" font-size="11" fill="#ffffff">国産クラウド（Alibaba/Tencent）</text><text x="610" y="220" text-anchor="middle" font-size="11" fill="#ffffff">IPv6拡張独自規格</text><text x="610" y="260" text-anchor="middle" font-size="10" fill="#aaaaaa">外国依存ゼロを目標とした</text><text x="610" y="278" text-anchor="middle" font-size="10" fill="#aaaaaa">技術スタック置き換え</text><text x="400" y="378" text-anchor="middle" font-size="12" fill="#f9a825">結果：「西側系」と「中国系」に2分化が進む技術スタック</text></svg>
- **テック覇権争い** = インターネット分断の最大エンジン
- 
- **米国側の動き**:
- - Huawei・ZTE・ByteDance等への輸出規制・禁止
- - CHIPS法（2022）：半導体の中国輸出制限
- - TikTok強制売却法（2024）


---

# 分断加速要因：米中デカップリング（2/2）

> *Huawei排除とTikTok禁止が技術スタック分断の先例となった*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">技術スタックの2分化</text><rect x="40" y="65" width="320" height="280" rx="10" fill="#0d2137" stroke="#2196F3" stroke-width="2"/><text x="200" y="95" text-anchor="middle" font-size="14" font-weight="bold" fill="#2196F3">西側テックスタック</text><text x="200" y="125" text-anchor="middle" font-size="11" fill="#64B5F6">OS: Windows / macOS / Linux</text><text x="200" y="150" text-anchor="middle" font-size="11" fill="#64B5F6">CPU: Intel / AMD / ARM</text><text x="200" y="175" text-anchor="middle" font-size="11" fill="#64B5F6">Cloud: AWS / Azure / GCP</text><text x="200" y="200" text-anchor="middle" font-size="11" fill="#64B5F6">AI: OpenAI / Google / Meta</text><text x="200" y="225" text-anchor="middle" font-size="11" fill="#64B5F6">5G: Ericsson / Nokia / Qualcomm</text><text x="200" y="250" text-anchor="middle" font-size="11" fill="#64B5F6">PKI: DigiCert / Let's Encrypt</text><rect x="440" y="65" width="320" height="280" rx="10" fill="#1a0d0d" stroke="#e91e63" stroke-width="2"/><text x="600" y="95" text-anchor="middle" font-size="14" font-weight="bold" fill="#e91e63">中国テックスタック</text><text x="600" y="125" text-anchor="middle" font-size="11" fill="#EF9A9A">OS: 麒麟OS / 統信OS</text><text x="600" y="150" text-anchor="middle" font-size="11" fill="#EF9A9A">CPU: 飛騰 / 龍芯 / 申威</text><text x="600" y="175" text-anchor="middle" font-size="11" fill="#EF9A9A">Cloud: Alibaba / Tencent / Huawei</text><text x="600" y="200" text-anchor="middle" font-size="11" fill="#EF9A9A">AI: 百度ERNIE / 通义千问</text><text x="600" y="225" text-anchor="middle" font-size="11" fill="#EF9A9A">5G: Huawei / ZTE</text><text x="600" y="250" text-anchor="middle" font-size="11" fill="#EF9A9A">PKI: CNNIC / 国家CA</text><line x1="362" y1="200" x2="438" y2="200" stroke="#f9a825" stroke-width="3" stroke-dasharray="8,4"/><text x="400" y="193" text-anchor="middle" font-size="11" fill="#f9a825">断絶</text><text x="400" y="365" text-anchor="middle" font-size="11" fill="#aaaaaa">グローバルサービスはどちらのスタックに対応するか選択を迫られる</text></svg>
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

# BGP ルーティングの地政学化（1/2）

> *国境でBGP経路を制御する能力が国家の新たな主権ツールになる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">BGP：インターネットの道路地図</text><rect x="40" y="65" width="160" height="70" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="120" y="100" text-anchor="middle" font-size="12" fill="#4CAF50">AS-Japan</text><text x="120" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">AS7670</text><rect x="320" y="65" width="160" height="70" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="400" y="100" text-anchor="middle" font-size="12" fill="#2196F3">AS-US</text><text x="400" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">AS15169 (Google)</text><rect x="600" y="65" width="160" height="70" rx="8" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="680" y="100" text-anchor="middle" font-size="12" fill="#FF9800">AS-EU</text><text x="680" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">AS3356</text><rect x="40" y="260" width="160" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="120" y="295" text-anchor="middle" font-size="12" fill="#e91e63">AS-China</text><text x="120" y="315" text-anchor="middle" font-size="10" fill="#aaaaaa">AS4134 (ChinaTel)</text><rect x="320" y="260" width="160" height="70" rx="8" fill="#16213e" stroke="#9C27B0" stroke-width="2"/><text x="400" y="295" text-anchor="middle" font-size="12" fill="#9C27B0">AS-Russia</text><text x="400" y="315" text-anchor="middle" font-size="10" fill="#aaaaaa">AS8359 (MTS)</text><line x1="200" y1="100" x2="318" y2="100" stroke="#ffffff" stroke-width="1.5"/><polygon points="315,95 325,100 315,105" fill="#ffffff"/><line x1="480" y1="100" x2="598" y2="100" stroke="#ffffff" stroke-width="1.5"/><polygon points="595,95 605,100 595,105" fill="#ffffff"/><line x1="120" y1="135" x2="120" y2="258" stroke="#ffffff" stroke-width="1.5"/><polygon points="115,255 120,265 125,255" fill="#ffffff"/><line x1="200" y1="295" x2="318" y2="295" stroke="#ffffff" stroke-width="1.5"/><polygon points="315,290 325,295 315,300" fill="#ffffff"/><line x1="400" y1="135" x2="400" y2="258" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><text x="415" y="200" font-size="10" fill="#e91e63">国家介入</text><polygon points="395,255 405,255 400,265" fill="#e91e63"/><text x="400" y="380" text-anchor="middle" font-size="11" fill="#f9a825">BGPは信頼ベース：悪意ある経路広告を技術的に防げない（RPKI未導入時）</text></svg>
- **BGP（Border Gateway Protocol）** = インターネットの「道路地図」
- 
- **通常**: 最短・最安定経路を自律選択（政治的意図なし）
- **分断後**: 国家がルーティングポリシーに介入
- 
- **実際の事件**:


---

# BGP ルーティングの地政学化（2/2）

> *BGP乗っ取りが意図的・偶発的問いを問わず安全保障問題化する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">BGPハイジャック：2010年中国Telecomの事例</text><rect x="40" y="65" width="180" height="60" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="130" y="98" text-anchor="middle" font-size="12" fill="#4CAF50">米国ユーザー</text><rect x="580" y="65" width="180" height="60" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="670" y="98" text-anchor="middle" font-size="12" fill="#2196F3">米国サーバー</text><rect x="310" y="180" width="180" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="3"/><text x="400" y="208" text-anchor="middle" font-size="12" fill="#e91e63">中国Telecom</text><text x="400" y="226" text-anchor="middle" font-size="10" fill="#aaaaaa">「最短経路」と偽って広告</text><rect x="40" y="300" width="700" height="65" rx="8" fill="#1a0a0a" stroke="#f9a825" stroke-width="2"/><text x="400" y="325" text-anchor="middle" font-size="12" font-weight="bold" fill="#f9a825">15分間で何が起きたか</text><text x="400" y="348" text-anchor="middle" font-size="11" fill="#ffffff">米国内トラフィックが中国を経由 → パケット傍受・遅延・通信内容の露出リスク</text><line x1="220" y1="95" x2="308" y2="195" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="305,193 313,201 303,206" fill="#e91e63"/><text x="240" y="160" font-size="10" fill="#e91e63">ハイジャック経路</text><line x1="490" y1="195" x2="578" y2="95" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="573,98 583,93 580,105" fill="#e91e63"/><line x1="220" y1="95" x2="578" y2="95" stroke="#4CAF50" stroke-width="1.5" stroke-dasharray="4,4"/><text x="400" y="80" font-size="10" fill="#4CAF50">正常な直接経路（存在するが無視された）</text></svg>
- - **2010年**: 中国Telecom が米国トラフィックを15分間ハイジャック（BGP誤設定）
- - **2019年**: ロシアMTS が複数AS経路を国内迂回
- - **2022年**: ロシア制裁後、BGP経路変更による一部サービス遅延
- 
- **リスク**: 意図的なルート変更 → 中間者攻撃・盗聴・遅延の可能性
- **対策**: RPKI（Resource Public Key Infrastructure）による経路正当性検証


---

# DNS 分断：独自 TLD と国家 DNS（1/2）

> *国家独自DNS運用が既存のグローバルDNS信頼チェーンを断つ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">DNS解決の正常時 vs 分断時</text><text x="200" y="68" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">正常なDNS解決</text><rect x="40" y="80" width="120" height="50" rx="6" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="100" y="110" text-anchor="middle" font-size="11" fill="#4CAF50">クライアント</text><rect x="190" y="80" width="120" height="50" rx="6" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="250" y="110" text-anchor="middle" font-size="11" fill="#2196F3">DNS Resolver</text><rect x="340" y="80" width="120" height="50" rx="6" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="400" y="105" text-anchor="middle" font-size="11" fill="#FF9800">Root DNS</text><text x="400" y="120" text-anchor="middle" font-size="10" fill="#aaaaaa">(ICANN管理)</text><rect x="490" y="80" width="120" height="50" rx="6" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="550" y="110" text-anchor="middle" font-size="11" fill="#4CAF50">192.0.2.1</text><line x1="160" y1="105" x2="188" y2="105" stroke="#4CAF50" stroke-width="2"/><polygon points="185,100 195,105 185,110" fill="#4CAF50"/><line x1="310" y1="105" x2="338" y2="105" stroke="#2196F3" stroke-width="2"/><polygon points="335,100 345,105 335,110" fill="#2196F3"/><line x1="460" y1="105" x2="488" y2="105" stroke="#4CAF50" stroke-width="2"/><polygon points="485,100 495,105 485,110" fill="#4CAF50"/><text x="200" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">GFW・国家DNSによる汚染</text><rect x="40" y="225" width="120" height="50" rx="6" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="100" y="255" text-anchor="middle" font-size="11" fill="#4CAF50">クライアント</text><rect x="190" y="225" width="120" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="250" y="248" text-anchor="middle" font-size="11" fill="#e91e63">国家管理</text><text x="250" y="265" text-anchor="middle" font-size="11" fill="#e91e63">DNS Resolver</text><rect x="340" y="225" width="120" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="248" text-anchor="middle" font-size="11" fill="#e91e63">偽のレスポンス</text><text x="400" y="265" text-anchor="middle" font-size="10" fill="#aaaaaa">NXDOMAIN / 偽IP</text><rect x="490" y="225" width="120" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="550" y="248" text-anchor="middle" font-size="11" fill="#e91e63">接続失敗</text><text x="550" y="265" text-anchor="middle" font-size="10" fill="#aaaaaa">or 偽サイト</text><line x1="160" y1="250" x2="188" y2="250" stroke="#e91e63" stroke-width="2"/><polygon points="185,245 195,250 185,255" fill="#e91e63"/><line x1="310" y1="250" x2="338" y2="250" stroke="#e91e63" stroke-width="2"/><polygon points="335,245 345,250 335,255" fill="#e91e63"/><line x1="460" y1="250" x2="488" y2="250" stroke="#e91e63" stroke-width="2"/><polygon points="485,245 495,250 485,255" fill="#e91e63"/><text x="400" y="365" text-anchor="middle" font-size="11" fill="#f9a825">DoH/DoTはDNS汚染を回避できるが、それ自体が規制の標的になっている</text></svg>
- **DNS** = インターネットの「電話帳」。分断されると名前解決が機能しなくなる
- 
- **中国の独自TLD**: `.政務`（.zhengwu）等の国内専用ドメイン
- **ロシアの試み**: 国家管理DNSルートサーバー（ICCANから独立可能な構造）
- **DoH/DoT（DNS over HTTPS/TLS）**: プライバシー保護目的だが、国家フィルタリングを回避するため規制の対象に


---

# DNS 分断：独自 TLD と国家 DNS（2/2）

> *同じドメインが国によって異なるIPに解決される時代が来る*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">国家別DNS分断の実態</text><rect x="40" y="65" width="220" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="150" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">中国GFW</text><text x="150" y="118" text-anchor="middle" font-size="11" fill="#ffffff">独自TLD: .政務 等</text><text x="150" y="140" text-anchor="middle" font-size="11" fill="#ffffff">外国ドメイン→NXDOMAIN</text><text x="150" y="162" text-anchor="middle" font-size="11" fill="#ffffff">DoH/DoTは遮断対象</text><text x="150" y="185" text-anchor="middle" font-size="10" fill="#aaaaaa">国内DNSルートサーバー運用</text><rect x="290" y="65" width="220" height="140" rx="10" fill="#16213e" stroke="#9C27B0" stroke-width="2"/><text x="400" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#9C27B0">ロシア</text><text x="400" y="118" text-anchor="middle" font-size="11" fill="#ffffff">国家DNSルートサーバー構築</text><text x="400" y="140" text-anchor="middle" font-size="11" fill="#ffffff">ICAANから独立可能な設計</text><text x="400" y="162" text-anchor="middle" font-size="11" fill="#ffffff">制裁対象ドメインをブロック</text><rect x="540" y="65" width="220" height="140" rx="10" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="650" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#FF9800">イラン</text><text x="650" y="118" text-anchor="middle" font-size="11" fill="#ffffff">国内ISPがDNS改ざん</text><text x="650" y="140" text-anchor="middle" font-size="11" fill="#ffffff">Google/FacebookのDNS</text><text x="650" y="162" text-anchor="middle" font-size="11" fill="#ffffff">レスポンスを偽造</text><rect x="160" y="250" width="480" height="110" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="277" text-anchor="middle" font-size="13" font-weight="bold" fill="#f9a825">エンジニア対策</text><text x="400" y="302" text-anchor="middle" font-size="11" fill="#ffffff">DNS冗長化（8.8.8.8 + 1.1.1.1 + 国内DNS）</text><text x="400" y="325" text-anchor="middle" font-size="11" fill="#ffffff">DoH/DoTのフォールバック設計</text><text x="400" y="348" text-anchor="middle" font-size="11" fill="#ffffff">TTLを短く設定してDNSキャッシュ依存を減らす</text></svg>
- 
- **DNSハイジャック事例**:
- - イランの国内ISPによるGoogle・Facebook DNSレスポンス改ざん
- - GFWによる海外ドメインへのNXDOMAIN返却
- 
- **エンジニア対策**: DNS冗長化・DoH/DoT活用・フォールバック設計


---

# TLS/PKI 信頼チェーンの断絶リスク（1/2）

> *国家CAが発行する証明書が国内のみで有効になるリスク*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">PKI信頼チェーンと国家CA問題</text><rect x="310" y="60" width="180" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="88" text-anchor="middle" font-size="12" fill="#f9a825">Root CA</text><text x="400" y="108" text-anchor="middle" font-size="10" fill="#aaaaaa">（DigiCert / Let's Encrypt等）</text><rect x="160" y="165" width="200" height="60" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="260" y="193" text-anchor="middle" font-size="12" fill="#4CAF50">Intermediate CA</text><text x="260" y="211" text-anchor="middle" font-size="10" fill="#aaaaaa">（正当な中間CA）</text><rect x="440" y="165" width="200" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="540" y="188" text-anchor="middle" font-size="12" fill="#e91e63">国家CA</text><text x="540" y="206" text-anchor="middle" font-size="10" fill="#aaaaaa">（CNNIC / カザフスタン政府等）</text><rect x="80" y="270" width="200" height="60" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="180" y="298" text-anchor="middle" font-size="12" fill="#4CAF50">正規サーバー証明書</text><rect x="350" y="270" width="200" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="450" y="293" text-anchor="middle" font-size="12" fill="#e91e63">偽サーバー証明書</text><text x="450" y="311" text-anchor="middle" font-size="10" fill="#aaaaaa">（MITMに悪用可能）</text><line x1="400" y1="120" x2="260" y2="163" stroke="#4CAF50" stroke-width="2"/><polygon points="257,158 267,163 257,168" fill="#4CAF50"/><line x1="400" y1="120" x2="540" y2="163" stroke="#e91e63" stroke-width="2"/><polygon points="537,158 547,163 537,168" fill="#e91e63"/><line x1="260" y1="225" x2="180" y2="268" stroke="#4CAF50" stroke-width="2"/><polygon points="177,263 187,268 177,273" fill="#4CAF50"/><line x1="540" y1="225" x2="450" y2="268" stroke="#e91e63" stroke-width="2"/><polygon points="447,263 457,268 447,273" fill="#e91e63"/><text x="400" y="378" text-anchor="middle" font-size="11" fill="#f9a825">国家CAがルートストアに含まれると、国家主導MITMが技術的に可能になる</text></svg>
- **TLS** = HTTPS通信の暗号化基盤。**PKI** = 証明書の信頼チェーン
- 
- **問題**: 国家が「自国認証局（CA）」をルートCAとして強制インストールさせるリスク
- 
- **実例:**


---

# TLS/PKI 信頼チェーンの断絶リスク（2/2）

> *ルートCA排除が国境をまたぐHTTPS通信を無効化しうる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">カザフスタン事例（2019・2020年）</text><rect x="40" y="65" width="360" height="160" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="220" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">攻撃シナリオ</text><text x="220" y="118" text-anchor="middle" font-size="11" fill="#ffffff">政府がISPに国家CAの強制インストールを要求</text><text x="220" y="142" text-anchor="middle" font-size="11" fill="#ffffff">ユーザーの全HTTPS通信を復号・監視可能に</text><text x="220" y="166" text-anchor="middle" font-size="11" fill="#ffffff">Facebook / Google も「監視対象」に</text><text x="220" y="196" text-anchor="middle" font-size="10" fill="#aaaaaa">カザフ政府：「セキュリティ向上のため」と説明</text><rect x="420" y="65" width="340" height="160" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="590" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">業界の対抗措置</text><text x="590" y="118" text-anchor="middle" font-size="11" fill="#ffffff">Mozilla / Google / Apple：</text><text x="590" y="142" text-anchor="middle" font-size="11" fill="#ffffff">カザフ政府CAを信頼リストから除外</text><text x="590" y="166" text-anchor="middle" font-size="11" fill="#ffffff">技術的に証明書を無効化</text><text x="590" y="196" text-anchor="middle" font-size="10" fill="#aaaaaa">2回試みられ2回とも失敗</text><rect x="120" y="265" width="560" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="292" text-anchor="middle" font-size="13" font-weight="bold" fill="#f9a825">エンジニア対策</text><text x="400" y="317" text-anchor="middle" font-size="11" fill="#ffffff">Certificate Transparency（CT）ログ監視</text><text x="400" y="340" text-anchor="middle" font-size="11" fill="#ffffff">CAA レコードによる証明書発行元の制限</text><text x="400" y="358" text-anchor="middle" font-size="10" fill="#aaaaaa">証明書ピンニング（重要なアプリに限定）</text></svg>
- - **カザフスタン（2019・2020年）**: 政府がISPに国家ルートCA証明書の強制インストールを要求 → Mozillaが拒否・対抗措置
- - **中国**: 政府系CA（CNNIC等）がルートストアに存在
- 
- **影響**: 国家CAが信頼されると中間者攻撃（MITM）が技術的に可能になる
- **対策**: Certificate Transparency（CT）ログ監視、CAA レコード設定、証明書ピンニング


---

# クラウドリージョン戦略の変化

> *データ主権法対応でリージョン分離が設計必須要件になった*

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

# CDN・エッジの再配置（1/2）

> *GFW対応でCDNが国内外に二重構成を持つことが標準になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">CDN地政学：エッジの管轄リスク</text><circle cx="400" cy="200" r="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="196" text-anchor="middle" font-size="12" fill="#f9a825">Origin</text><text x="400" y="215" text-anchor="middle" font-size="11" fill="#aaaaaa">Server</text><rect x="40" y="60" width="140" height="70" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="110" y="90" text-anchor="middle" font-size="11" fill="#4CAF50">US Edge</text><text x="110" y="110" text-anchor="middle" font-size="10" fill="#aaaaaa">米国管轄</text><text x="110" y="125" text-anchor="middle" font-size="10" fill="#4CAF50">安全</text><rect x="620" y="60" width="140" height="70" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="690" y="90" text-anchor="middle" font-size="11" fill="#4CAF50">EU Edge</text><text x="690" y="110" text-anchor="middle" font-size="10" fill="#aaaaaa">EU管轄（GDPR適用）</text><text x="690" y="125" text-anchor="middle" font-size="10" fill="#FF9800">GDPR準拠必要</text><rect x="40" y="270" width="140" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="110" y="300" text-anchor="middle" font-size="11" fill="#e91e63">Russia Edge</text><text x="110" y="318" text-anchor="middle" font-size="10" fill="#aaaaaa">ロシア管轄</text><text x="110" y="333" text-anchor="middle" font-size="10" fill="#e91e63">傍受リスク</text><rect x="620" y="270" width="140" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="690" y="300" text-anchor="middle" font-size="11" fill="#e91e63">CN Edge</text><text x="690" y="318" text-anchor="middle" font-size="10" fill="#aaaaaa">中国管轄</text><text x="690" y="333" text-anchor="middle" font-size="10" fill="#e91e63">GFW干渉・盗聴</text><line x1="180" y1="95" x2="340" y2="175" stroke="#4CAF50" stroke-width="1.5"/><polygon points="337,171 345,178 337,185" fill="#4CAF50"/><line x1="620" y1="95" x2="460" y2="175" stroke="#4CAF50" stroke-width="1.5"/><polygon points="463,171 455,178 463,185" fill="#4CAF50"/><line x1="180" y1="305" x2="340" y2="225" stroke="#e91e63" stroke-width="1.5"/><polygon points="337,221 345,228 337,235" fill="#e91e63"/><line x1="620" y1="305" x2="460" y2="225" stroke="#e91e63" stroke-width="1.5"/><polygon points="463,221 455,228 463,235" fill="#e91e63"/><text x="400" y="375" text-anchor="middle" font-size="11" fill="#f9a825">TLSターミネーションがどの国で行われるか = 傍受リスクの所在</text></svg>
- **CDN** = コンテンツ配信ネットワーク。エッジサーバーの地理的配置が規制に直撃
- 
- **Cloudflare の対応:**
- - ロシア制裁後もサービス継続 vs ウクライナからの撤退要求 → ポリシー対応
- - 「Content Blocking」機能：地域単位でコンテンツをブロック
- 


---

# CDN・エッジの再配置（2/2）

> *エッジの地政学的配置がレイテンシより規制対応を優先する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">主要CDNプロバイダーの対応比較</text><rect x="40" y="65" width="220" height="240" rx="10" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="150" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#FF9800">Cloudflare</text><text x="150" y="118" text-anchor="middle" font-size="11" fill="#ffffff">ロシア制裁後も継続</text><text x="150" y="140" text-anchor="middle" font-size="11" fill="#ffffff">Content Blocking機能</text><text x="150" y="162" text-anchor="middle" font-size="11" fill="#ffffff">ウクライナ要求に対応</text><text x="150" y="184" text-anchor="middle" font-size="11" fill="#ffffff">地域単位コンテンツ制御</text><text x="150" y="270" text-anchor="middle" font-size="10" fill="#aaaaaa">最大の政治的判断を</text><text x="150" y="288" text-anchor="middle" font-size="10" fill="#aaaaaa">迫られたCDN</text><rect x="290" y="65" width="220" height="240" rx="10" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="400" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#2196F3">Fastly / Akamai</text><text x="400" y="118" text-anchor="middle" font-size="11" fill="#ffffff">国家要求の地域ブロック</text><text x="400" y="140" text-anchor="middle" font-size="11" fill="#ffffff">コンテンツ制御機能提供</text><text x="400" y="162" text-anchor="middle" font-size="11" fill="#ffffff">エンタープライズ向け</text><text x="400" y="184" text-anchor="middle" font-size="11" fill="#ffffff">地域ポリシー管理</text><rect x="540" y="65" width="220" height="240" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="650" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">考慮すべき点</text><text x="650" y="118" text-anchor="middle" font-size="11" fill="#ffffff">エッジの管轄国</text><text x="650" y="140" text-anchor="middle" font-size="11" fill="#ffffff">TLS終端の場所</text><text x="650" y="162" text-anchor="middle" font-size="11" fill="#ffffff">キャッシュと規制の関係</text><text x="650" y="184" text-anchor="middle" font-size="11" fill="#ffffff">プロバイダーの政治姿勢</text><text x="400" y="345" text-anchor="middle" font-size="11" fill="#f9a825">「どのCDNを使うか」が地政学的リスク管理の一部になっている</text></svg>
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

> *40カ国超が個人データの国外移転を禁止または制限している*

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

# ケーススタディ：TikTok / Zoom / WhatsApp（1/2）

> *3社の対応が分断時代のグローバルサービス設計の教科書になる*

- **TikTok（ByteDance）**:
- - 米国でのデータが中国政府にアクセス可能との懸念 → 強制売却法（2024）
- - 対応: 「Project Texas」米国データをOracle US管理に移行、コードの分離
- 
- **Zoom**:
- - コロナ禍でのデータ中国経由ルーティング問題（2020年発覚）


---

# ケーススタディ：TikTok / Zoom / WhatsApp（2/2）

> *地域ごとのデータ分離とコンプライアンス対応が生存条件となる*

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

# 設計パターン①：リージョン分離アーキテクチャ（1/2）

> *データと処理を法域ごとに物理分離することで規制を技術で解決*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">Cell-based アーキテクチャ</text><rect x="40" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="150" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#2196F3">EU Cell</text><rect x="60" y="110" width="180" height="50" rx="6" fill="#0d2137" stroke="#2196F3" stroke-width="1"/><text x="150" y="138" text-anchor="middle" font-size="11" fill="#64B5F6">EU User DB</text><rect x="60" y="175" width="180" height="50" rx="6" fill="#0d2137" stroke="#2196F3" stroke-width="1"/><text x="150" y="203" text-anchor="middle" font-size="11" fill="#64B5F6">EU Processing</text><rect x="60" y="240" width="180" height="50" rx="6" fill="#0d2137" stroke="#2196F3" stroke-width="1"/><text x="150" y="268" text-anchor="middle" font-size="11" fill="#64B5F6">EU Auth</text><text x="150" y="315" text-anchor="middle" font-size="10" fill="#aaaaaa">GDPR準拠</text><rect x="290" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="400" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">US Cell</text><rect x="310" y="110" width="180" height="50" rx="6" fill="#0d2137" stroke="#4CAF50" stroke-width="1"/><text x="400" y="138" text-anchor="middle" font-size="11" fill="#81C784">US User DB</text><rect x="310" y="175" width="180" height="50" rx="6" fill="#0d2137" stroke="#4CAF50" stroke-width="1"/><text x="400" y="203" text-anchor="middle" font-size="11" fill="#81C784">US Processing</text><rect x="310" y="240" width="180" height="50" rx="6" fill="#0d2137" stroke="#4CAF50" stroke-width="1"/><text x="400" y="268" text-anchor="middle" font-size="11" fill="#81C784">US Auth</text><text x="400" y="315" text-anchor="middle" font-size="10" fill="#aaaaaa">FedRAMP対応</text><rect x="540" y="65" width="220" height="280" rx="10" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="650" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#FF9800">APAC Cell</text><rect x="560" y="110" width="180" height="50" rx="6" fill="#0d2137" stroke="#FF9800" stroke-width="1"/><text x="650" y="138" text-anchor="middle" font-size="11" fill="#FFB74D">APAC User DB</text><rect x="560" y="175" width="180" height="50" rx="6" fill="#0d2137" stroke="#FF9800" stroke-width="1"/><text x="650" y="203" text-anchor="middle" font-size="11" fill="#FFB74D">APAC Processing</text><rect x="560" y="240" width="180" height="50" rx="6" fill="#0d2137" stroke="#FF9800" stroke-width="1"/><text x="650" y="268" text-anchor="middle" font-size="11" fill="#FFB74D">APAC Auth</text><text x="650" y="315" text-anchor="middle" font-size="10" fill="#aaaaaa">各国規制対応</text><line x1="262" y1="200" x2="288" y2="200" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><line x1="512" y1="200" x2="538" y2="200" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><text x="400" y="378" text-anchor="middle" font-size="11" fill="#f9a825">セル間でデータは漏れない設計 — 集計は匿名化済みデータのみ許可</text></svg>
- **原則**: データの物理的な所在地を設計の第一級概念として扱う
- 
- **実装パターン:**
- - **Cell-based Architecture**: ユーザーを地域ごとの「セル」に割り当て、データが他セルに漏れない設計
- - **Geo-sharding**: DBシャードを地域単位で分割。EU shard / US shard / APAC shard


---

# 設計パターン①：リージョン分離アーキテクチャ（2/2）

> *Active-Activeリージョン設計が分断時代の高可用性を担保する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">Geo-sharding：DBシャード戦略</text><rect x="40" y="65" width="340" height="270" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="210" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">従来：グローバル単一DB</text><rect x="80" y="110" width="220" height="200" rx="8" fill="#0d0a1a" stroke="#e91e63" stroke-width="1"/><text x="190" y="140" text-anchor="middle" font-size="12" fill="#e91e63">Global DB</text><text x="190" y="165" text-anchor="middle" font-size="11" fill="#ffffff">EU users</text><text x="190" y="185" text-anchor="middle" font-size="11" fill="#ffffff">US users</text><text x="190" y="205" text-anchor="middle" font-size="11" fill="#ffffff">APAC users</text><text x="190" y="225" text-anchor="middle" font-size="11" fill="#ffffff">RU users</text><text x="190" y="270" text-anchor="middle" font-size="10" fill="#e91e63">GDPR違反リスク！</text><rect x="420" y="65" width="340" height="270" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="590" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">新：Geo-sharding</text><rect x="440" y="110" width="140" height="60" rx="6" fill="#0d2137" stroke="#2196F3" stroke-width="1"/><text x="510" y="138" text-anchor="middle" font-size="11" fill="#64B5F6">EU Shard</text><text x="510" y="158" text-anchor="middle" font-size="10" fill="#aaaaaa">EU内のみ</text><rect x="600" y="110" width="140" height="60" rx="6" fill="#0d2137" stroke="#4CAF50" stroke-width="1"/><text x="670" y="138" text-anchor="middle" font-size="11" fill="#81C784">US Shard</text><text x="670" y="158" text-anchor="middle" font-size="10" fill="#aaaaaa">US内のみ</text><rect x="440" y="190" width="140" height="60" rx="6" fill="#0d2137" stroke="#FF9800" stroke-width="1"/><text x="510" y="218" text-anchor="middle" font-size="11" fill="#FFB74D">APAC Shard</text><text x="510" y="238" text-anchor="middle" font-size="10" fill="#aaaaaa">APAC内のみ</text><rect x="600" y="190" width="140" height="60" rx="6" fill="#0d2137" stroke="#9C27B0" stroke-width="1"/><text x="670" y="218" text-anchor="middle" font-size="11" fill="#CE93D8">JP Shard</text><text x="670" y="238" text-anchor="middle" font-size="10" fill="#aaaaaa">日本規制対応</text><text x="590" y="295" text-anchor="middle" font-size="10" fill="#4CAF50">管轄ごとに独立</text></svg>
- - **Federated Identity**: 地域をまたいだSSO不要の設計（各リージョンで独立認証）
- 
- **考慮点:**
- - ユーザーの地域変更時のデータ移行ポリシー
- - グローバルな集計分析のための匿名化・集約パイプライン
- - 「どのデータが規制対象か」の分類（機微 / 非機微）


---

# 設計パターン②：コンプライアンス・バイ・デザイン（1/2）

> *規制対応を後付けでなく設計初期から組み込む開発哲学*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">後付けコンプライアンスのコスト</text><rect x="40" y="65" width="340" height="280" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="210" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">設計段階での組み込み</text><text x="210" y="118" text-anchor="middle" font-size="12" fill="#ffffff">コスト: 1x</text><text x="210" y="148" text-anchor="middle" font-size="11" fill="#aaaaaa">アーキテクチャ設計時に</text><text x="210" y="168" text-anchor="middle" font-size="11" fill="#aaaaaa">データ分類・管轄・保持期間を</text><text x="210" y="188" text-anchor="middle" font-size="11" fill="#aaaaaa">第一級概念として扱う</text><rect x="100" y="215" width="220" height="100" rx="6" fill="#0d2137" stroke="#4CAF50" stroke-width="1"/><text x="210" y="242" text-anchor="middle" font-size="11" fill="#64B5F6">Data: { value: "...",</text><text x="210" y="262" text-anchor="middle" font-size="11" fill="#64B5F6">  sensitivity: "PII",</text><text x="210" y="282" text-anchor="middle" font-size="11" fill="#64B5F6">  jurisdiction: "EU",</text><text x="210" y="302" text-anchor="middle" font-size="11" fill="#64B5F6">  retention: "2y" }</text><rect x="420" y="65" width="340" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">後付けコンプライアンス</text><text x="590" y="118" text-anchor="middle" font-size="12" fill="#ffffff">コスト: 10x〜100x</text><text x="590" y="148" text-anchor="middle" font-size="11" fill="#aaaaaa">リリース後に規制対応を</text><text x="590" y="168" text-anchor="middle" font-size="11" fill="#aaaaaa">行うと...</text><text x="590" y="198" text-anchor="middle" font-size="11" fill="#e91e63">DB再設計が必要</text><text x="590" y="220" text-anchor="middle" font-size="11" fill="#e91e63">APIの破壊的変更</text><text x="590" y="242" text-anchor="middle" font-size="11" fill="#e91e63">全データの移行作業</text><text x="590" y="264" text-anchor="middle" font-size="11" fill="#e91e63">並行稼働期間のリスク</text><text x="590" y="286" text-anchor="middle" font-size="11" fill="#e91e63">罰金リスクも継続</text></svg>
- **「後付けコンプライアンス」の問題**: 規制対応をリリース後に行うと改修コストが10倍以上になる
- 
- **設計段階での組み込み:**
- - **Data Classification Layer**: 全データに `sensitivity`, `jurisdiction`, `retention` をタグ付け
- - **Policy Engine**: データアクセス時にリアルタイムで規制ポリシーを評価（Open Policy Agent等）


---

# 設計パターン②：コンプライアンス・バイ・デザイン（2/2）

> *データフロー図とポリシーエンジンが規制変化への自動対応を実現*

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

# 設計パターン③：フォールバック戦略（1/2）

> *特定地域のサービス切断を前提にした縮退運転計画が必須*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">Circuit Breaker パターン</text><rect x="40" y="65" width="200" height="70" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="140" y="98" text-anchor="middle" font-size="12" fill="#4CAF50">クライアント</text><rect x="580" y="65" width="180" height="70" rx="8" fill="#16213e" stroke="#2196F3" stroke-width="2"/><text x="670" y="90" text-anchor="middle" font-size="12" fill="#2196F3">外部サービス</text><text x="670" y="110" text-anchor="middle" font-size="10" fill="#aaaaaa">（CDN / OAuth / API）</text><rect x="290" y="60" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="88" text-anchor="middle" font-size="12" fill="#f9a825">Circuit Breaker</text><text x="400" y="110" text-anchor="middle" font-size="10" fill="#aaaaaa">状態: CLOSED / OPEN / HALF-OPEN</text><rect x="580" y="200" width="180" height="70" rx="8" fill="#16213e" stroke="#FF9800" stroke-width="2"/><text x="670" y="228" text-anchor="middle" font-size="12" fill="#FF9800">フォールバック</text><text x="670" y="248" text-anchor="middle" font-size="10" fill="#aaaaaa">内部認証 / キャッシュ</text><rect x="40" y="290" width="700" height="80" rx="8" fill="#16213e" stroke="#4CAF50" stroke-width="1"/><text x="400" y="318" text-anchor="middle" font-size="12" font-weight="bold" fill="#4CAF50">状態遷移</text><text x="400" y="343" text-anchor="middle" font-size="11" fill="#ffffff">CLOSED（正常）→ 閾値超えで OPEN → タイムアウト後 HALF-OPEN → 成功で CLOSED</text><text x="400" y="360" text-anchor="middle" font-size="10" fill="#aaaaaa">特定地域からの接続が切断されることを「通常の障害」として設計する</text><line x1="242" y1="100" x2="288" y2="100" stroke="#4CAF50" stroke-width="2"/><polygon points="285,95 295,100 285,105" fill="#4CAF50"/><line x1="512" y1="100" x2="578" y2="100" stroke="#2196F3" stroke-width="2"/><polygon points="575,95 585,100 575,105" fill="#2196F3"/><line x1="670" y1="135" x2="670" y2="198" stroke="#FF9800" stroke-width="2" stroke-dasharray="6,3"/><polygon points="665,195 675,195 670,205" fill="#FF9800"/><text x="690" y="175" font-size="10" fill="#FF9800">遮断時</text></svg>
- **前提**: 特定地域からの接続が突然切断されることを「通常の障害」として設計する
- 
- **縮退設計の原則:**
- - **Circuit Breaker**: 外部サービスへの依存を監視し、遮断時に代替フローへ切替
- - **Graceful Degradation**: CDN遮断 → オリジンサーバー直接、外部OAuth → 内部認証


---

# 設計パターン③：フォールバック戦略（2/2）

> *地域間依存を最小化する設計が分断リスクの影響範囲を限定する*

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

# グループディスカッション（1/2）

> *自社サービスが直面するスプリンターネットリスクを特定する*

- **課題**: あなたの担当サービスに置き換えて考えてみよう
- 
- **ディスカッション Q1**: 自分のサービスで「規制対象になりうるデータ」はどれか？
- - 個人情報・決済情報・位置情報・通信内容 etc.
- 


---

# グループディスカッション（2/2）

> *リージョン分離・フォールバックの具体的設計をチームで議論する*

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

# 今日学んだこと（1/2）

> *GFW・Runet・GDPRが分断の3大駆動力として技術を変える*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825">スプリンターネット：エンジニアの現実</text><rect x="40" y="65" width="340" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="210" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#e91e63">もはや無視できない事実</text><text x="210" y="120" text-anchor="middle" font-size="11" fill="#ffffff">BGP ハイジャックは毎年発生</text><text x="210" y="143" text-anchor="middle" font-size="11" fill="#ffffff">DNSハイジャック・汚染は日常的</text><text x="210" y="166" text-anchor="middle" font-size="11" fill="#ffffff">国家CAによるMITMリスクは現実</text><text x="210" y="189" text-anchor="middle" font-size="11" fill="#ffffff">GDPR違反で数十億円の罰金事例</text><text x="210" y="212" text-anchor="middle" font-size="11" fill="#ffffff">AWSの中国リージョンは別契約</text><text x="210" y="235" text-anchor="middle" font-size="11" fill="#ffffff">TikTokは米国データを分離対応</text><text x="210" y="280" text-anchor="middle" font-size="10" fill="#e91e63">これらは「起きるかもしれない話」ではなく</text><text x="210" y="300" text-anchor="middle" font-size="10" fill="#e91e63">今まさに進行中の現実</text><rect x="420" y="65" width="340" height="290" rx="10" fill="#16213e" stroke="#4CAF50" stroke-width="2"/><text x="590" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#4CAF50">エンジニアに求められること</text><text x="590" y="120" text-anchor="middle" font-size="11" fill="#ffffff">データの管轄を意識した設計</text><text x="590" y="143" text-anchor="middle" font-size="11" fill="#ffffff">リージョン分離アーキテクチャ</text><text x="590" y="166" text-anchor="middle" font-size="11" fill="#ffffff">フォールバック・縮退設計</text><text x="590" y="189" text-anchor="middle" font-size="11" fill="#ffffff">継続的な規制変更の監視</text><text x="590" y="212" text-anchor="middle" font-size="11" fill="#ffffff">Chaos Engineeringの実施</text><text x="590" y="280" text-anchor="middle" font-size="10" fill="#4CAF50">「インターネットはひとつ」という</text><text x="590" y="300" text-anchor="middle" font-size="10" fill="#4CAF50">前提を捨てることが第一歩</text></svg>
- **スプリンターネットは「起きるかもしれない話」ではなく、今まさに進行中**
- 
- 1. **地政学的背景**: 中国・ロシア・欧州・米国が異なる動機でインターネットを分断
- 2. **技術的現実**: BGP・DNS・TLS・クラウドリージョンの全レイヤーに影響


---

# 今日学んだこと（2/2）

> *リージョン分離・CoD・フォールバックが分断時代の3大設計原則*

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

# 参考文献・Q&A（1/2）（1/2）

> *スプリンターネット研究の主要論文と技術レポートの一覧*

- **地政学・政策:**
- - [Freedom on the Net 2024 – Freedom House](https://freedomhouse.org/report/freedom-on-the-net)
- - [The Splinternet – CFR Backgrounder](https://www.cfr.org/backgrounder/splinternet)
- 


---

# 参考文献・Q&A（1/2）（2/2）

> *各国規制の最新動向を追うための公式ソース集*

- **技術・インフラ:**
- - [RPKI – RIPE NCC](https://www.ripe.net/manage-ips-and-asns/resource-management/rpki)
- - [Certificate Transparency – Google](https://certificate.transparency.dev/)
- - [BGP Hijacking – MANRS Observatory](https://observatory.manrs.org/)


---

# 参考文献・Q&A（2/2）（1/2）

> *実装に役立つオープンソースコンプライアンスツール集*

- 
- **設計パターン:**
- - [Cell-based Architecture – AWS Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/cell-based-architecture.html)
- - [Open Policy Agent – OPA Docs](https://www.openpolicyagent.org/docs/)


---

# 参考文献・Q&A（2/2）（2/2）

> *分断対応アーキテクチャのリファレンス実装とケーススタディ*

- 
- ---
- 
- **Q&A**

