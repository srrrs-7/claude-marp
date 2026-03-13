---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "通貨覇権と制裁回避"
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
  
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# デジタル人民元の
本当の狙い

- 技術革新ではなく通貨覇権と制裁回避
- SWIFTへの依存を断ち切る戦略
- デジタルシルクロードの実像
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><circle cx="400" cy="160" r="110" fill="none" stroke="#f9a825" stroke-width="3"/><circle cx="400" cy="160" r="75" fill="none" stroke="#e91e63" stroke-width="2"/><circle cx="400" cy="160" r="40" fill="#f9a825" opacity="0.9"/><text x="400" y="165" text-anchor="middle" fill="#1a1a2e" font-size="14" font-weight="bold">e-CNY</text><text x="400" y="52" text-anchor="middle" fill="#f9a825" font-size="13">通貨覇権戦略</text><text x="400" y="290" text-anchor="middle" fill="#e91e63" font-size="13">制裁回避 &#x2F; SWIFT代替</text><text x="158" y="165" text-anchor="middle" fill="white" font-size="12">デジタル
シルクロード</text><text x="642" y="165" text-anchor="middle" fill="white" font-size="12">一帯一路
通貨版</text></svg>


---

# アジェンダ

> *制裁回避とドル覇権挑戦がe-CNY戦略の本質*

- 1. デジタル人民元（e-CNY）とは何か
- 2. なぜ今なのか：制裁リスクとドル覇権
- 3. SWIFTからの脱却戦略
- 4. デジタルシルクロード：一帯一路の通貨版
- 5. 日本・他国への影響


---

<!-- _class: lead -->
# e-CNYの基本


---

# デジタル人民元の2層アーキテクチャ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><rect x="50" y="30" width="700" height="100" rx="10" fill="#0d3b66" stroke="#f9a825" stroke-width="2"/><text x="400" y="75" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">第1層：中国人民銀行（PBOC）</text><text x="400" y="105" text-anchor="middle" fill="white" font-size="13">e-CNY発行・全取引データの管理・マクロ経済政策の実行</text><text x="400" y="185" text-anchor="middle" fill="#aaa" font-size="22">▼  発行 &#x2F; 配布</text><rect x="50" y="210" width="320" height="80" rx="8" fill="#1b3a5c" stroke="#e91e63" stroke-width="2"/><text x="210" y="245" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">第2層：商業銀行A</text><text x="210" y="270" text-anchor="middle" fill="white" font-size="12">工商銀行・建設銀行など</text><rect x="430" y="210" width="320" height="80" rx="8" fill="#1b3a5c" stroke="#e91e63" stroke-width="2"/><text x="590" y="245" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">第2層：商業銀行B</text><text x="590" y="270" text-anchor="middle" fill="white" font-size="12">農業銀行・中国銀行など</text><text x="210" y="340" text-anchor="middle" fill="#aaa" font-size="13">▼ 配布</text><text x="590" y="340" text-anchor="middle" fill="#aaa" font-size="13">▼ 配布</text><rect x="100" y="355" width="220" height="35" rx="6" fill="#2c2c54" stroke="#f9a825" stroke-width="1"/><text x="210" y="377" text-anchor="middle" fill="white" font-size="12">一般ユーザー・企業・小売店</text><rect x="480" y="355" width="220" height="35" rx="6" fill="#2c2c54" stroke="#f9a825" stroke-width="1"/><text x="590" y="377" text-anchor="middle" fill="white" font-size="12">一般ユーザー・企業・小売店</text></svg>


---

# デジタル人民元は「現金のデジタル版」ではない（1/2）

> *使途・期限を制限できる政策実行ツールが本質*

- **表向きの説明：**
- 現金をデジタル化したもの。スマホで使える
- ---
- **実際の設計：**
- - **プログラマブルマネー：** 使途・期限・対象を制限可能


---

# デジタル人民元は「現金のデジタル版」ではない（2/2）

> *完全な取引監視で匿名現金取引が消える*

-   「この資金は食料にのみ使用可能」「2週間以内に使わないと失効」
- - **完全な取引監視：** 全取引が中国人民銀行に可視
- - **ゼロ知識の廃止：** 匿名現金取引が消える
- ---
- → 単なる決済ツールではなく**政策実行ツール**
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e"/><rect x="30" y="40" width="220" height="140" rx="8" fill="#0d3b66" stroke="#aaa" stroke-width="1"/><text x="140" y="80" text-anchor="middle" fill="#aaa" font-size="13" font-weight="bold">現金（紙幣）</text><text x="140" y="110" text-anchor="middle" fill="#aaa" font-size="11">匿名で使用可能</text><text x="140" y="130" text-anchor="middle" fill="#aaa" font-size="11">使途制限なし</text><text x="140" y="150" text-anchor="middle" fill="#aaa" font-size="11">有効期限なし</text><rect x="290" y="40" width="220" height="140" rx="8" fill="#2c2c54" stroke="#f9a825" stroke-width="2"/><text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">e-CNY</text><text x="400" y="110" text-anchor="middle" fill="white" font-size="11">全取引を当局が把握</text><text x="400" y="130" text-anchor="middle" fill="white" font-size="11">使途・対象を制限可能</text><text x="400" y="150" text-anchor="middle" fill="white" font-size="11">有効期限を設定可能</text><rect x="550" y="40" width="220" height="140" rx="8" fill="#1b0030" stroke="#e91e63" stroke-width="2"/><text x="660" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">政策実行ツール</text><text x="660" y="110" text-anchor="middle" fill="white" font-size="11">社会信用との連動</text><text x="660" y="130" text-anchor="middle" fill="white" font-size="11">経済制裁の精密化</text><text x="660" y="150" text-anchor="middle" fill="white" font-size="11">行動誘導・補助金配布</text><polygon points="258,110 275,103 275,117" fill="#f9a825"/><polygon points="518,110 535,103 535,117" fill="#e91e63"/></svg>


---

<!-- _class: lead -->
# なぜ今なのか：制裁リスク


---

# ロシア制裁が中国に見せた「本当のリスク」（1/2）

> *SWIFT遮断と6,000億ドル凍結が中国に警告を発した*

- **2022年2月：ロシアへの金融制裁**
- - SWIFTからロシア銀行を締め出し
- - 外貨準備（6,000億ドル）を凍結
- - ロシアの国際金融取引が事実上不可能に
- ---
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="30" y="50" width="160" height="100" rx="8" fill="#1b3a5c" stroke="#4fc3f7" stroke-width="2"/><text x="110" y="95" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">ロシア銀行</text><text x="110" y="115" text-anchor="middle" fill="white" font-size="11">2022年2月以前</text><rect x="320" y="50" width="160" height="100" rx="8" fill="#3b1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">SWIFT</text><text x="400" y="110" text-anchor="middle" fill="white" font-size="11">米国管理下</text><text x="400" y="128" text-anchor="middle" fill="#e91e63" font-size="10">制裁で締め出し</text><rect x="610" y="50" width="160" height="100" rx="8" fill="#1b3a5c" stroke="#aaa" stroke-width="1"/><text x="690" y="95" text-anchor="middle" fill="#aaa" font-size="13" font-weight="bold">外貨準備</text><text x="690" y="115" text-anchor="middle" fill="#e91e63" font-size="11">6,000億ドル凍結</text><line x1="190" y1="100" x2="315" y2="100" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="310,93 323,100 310,107" fill="#e91e63"/><line x1="483" y1="100" x2="605" y2="100" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="600,93 613,100 600,107" fill="#e91e63"/><text x="252" y="82" text-anchor="middle" fill="#e91e63" font-size="10">遮断</text><text x="544" y="82" text-anchor="middle" fill="#e91e63" font-size="10">凍結</text></svg>


---

# ロシア制裁が中国に見せた「本当のリスク」（2/2）

> *3.2兆ドルの外貨準備が人質になりうると悟った*

- **中国が見たもの：**
- 「同じことが中国に起きたら？」
- 中国の外貨準備：3.2兆ドル（主にドル建て）
- → **米国は「通貨」を武器にできる**
- ---
- デジタル人民元は「SWIFT不要の決済網」の構築を目的とする
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e"/><rect x="30" y="30" width="180" height="120" rx="8" fill="#1b3a5c" stroke="#4fc3f7" stroke-width="2"/><text x="120" y="80" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">中国</text><text x="120" y="100" text-anchor="middle" fill="white" font-size="11">外貨準備 3.2兆$</text><text x="120" y="118" text-anchor="middle" fill="white" font-size="11">主にドル建て</text><rect x="310" y="30" width="180" height="120" rx="8" fill="#3b1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="75" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">米国制裁</text><text x="400" y="98" text-anchor="middle" fill="white" font-size="11">SWIFT遮断</text><text x="400" y="116" text-anchor="middle" fill="white" font-size="11">資産凍結</text><rect x="590" y="30" width="180" height="120" rx="8" fill="#0d3b66" stroke="#f9a825" stroke-width="2"/><text x="680" y="75" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">e-CNY戦略</text><text x="680" y="98" text-anchor="middle" fill="white" font-size="11">SWIFT不要の網</text><text x="680" y="116" text-anchor="middle" fill="white" font-size="11">人民元決済圏</text><polygon points="213,90 230,83 230,97" fill="#e91e63"/><line x1="210" y1="90" x2="305" y2="90" stroke="#e91e63" stroke-width="2"/><polygon points="493,90 510,83 510,97" fill="#f9a825"/><line x1="490" y1="90" x2="585" y2="90" stroke="#f9a825" stroke-width="2"/><text x="257" y="78" text-anchor="middle" fill="#e91e63" font-size="10">リスク</text><text x="537" y="78" text-anchor="middle" fill="#f9a825" font-size="10">対抗策</text></svg>


---

<!-- _class: lead -->
# SWIFTからの脱却


---

# SWIFT vs CIPS vs e-CNY 比較

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><rect x="30" y="30" width="220" height="30" rx="4" fill="#0d3b66"/><text x="140" y="51" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">項目</text><rect x="260" y="30" width="155" height="30" rx="4" fill="#0d3b66"/><text x="338" y="51" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">SWIFT</text><rect x="423" y="30" width="155" height="30" rx="4" fill="#0d3b66"/><text x="500" y="51" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">CIPS</text><rect x="586" y="30" width="184" height="30" rx="4" fill="#0d3b66"/><text x="678" y="51" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">e-CNY+CIPS</text><rect x="30" y="70" width="220" height="40" fill="#1b2a3e"/><text x="140" y="96" text-anchor="middle" fill="white" font-size="12">運営主体</text><rect x="260" y="70" width="155" height="40" fill="#1b2a3e"/><text x="338" y="96" text-anchor="middle" fill="#4fc3f7" font-size="12">米欧連合</text><rect x="423" y="70" width="155" height="40" fill="#1b2a3e"/><text x="500" y="96" text-anchor="middle" fill="#f9a825" font-size="12">中国人民銀行</text><rect x="586" y="70" width="184" height="40" fill="#1b2a3e"/><text x="678" y="96" text-anchor="middle" fill="#e91e63" font-size="12">中国主導</text><rect x="30" y="118" width="220" height="40" fill="#162230"/><text x="140" y="144" text-anchor="middle" fill="white" font-size="12">参加機関数</text><rect x="260" y="118" width="155" height="40" fill="#162230"/><text x="338" y="144" text-anchor="middle" fill="#4fc3f7" font-size="12">11,000+</text><rect x="423" y="118" width="155" height="40" fill="#162230"/><text x="500" y="144" text-anchor="middle" fill="#f9a825" font-size="12">1,500+（2024）</text><rect x="586" y="118" width="184" height="40" fill="#162230"/><text x="678" y="144" text-anchor="middle" fill="#e91e63" font-size="12">拡大中</text><rect x="30" y="166" width="220" height="40" fill="#1b2a3e"/><text x="140" y="192" text-anchor="middle" fill="white" font-size="12">制裁リスク</text><rect x="260" y="166" width="155" height="40" fill="#1b2a3e"/><text x="338" y="192" text-anchor="middle" fill="#e91e63" font-size="12">高（米国制御）</text><rect x="423" y="166" width="155" height="40" fill="#1b2a3e"/><text x="500" y="192" text-anchor="middle" fill="#4fc3f7" font-size="12">低</text><rect x="586" y="166" width="184" height="40" fill="#1b2a3e"/><text x="678" y="192" text-anchor="middle" fill="#4fc3f7" font-size="12">ほぼなし</text><rect x="30" y="214" width="220" height="40" fill="#162230"/><text x="140" y="240" text-anchor="middle" fill="white" font-size="12">決済通貨</text><rect x="260" y="214" width="155" height="40" fill="#162230"/><text x="338" y="240" text-anchor="middle" fill="#4fc3f7" font-size="12">複数通貨</text><rect x="423" y="214" width="155" height="40" fill="#162230"/><text x="500" y="240" text-anchor="middle" fill="#f9a825" font-size="12">人民元中心</text><rect x="586" y="214" width="184" height="40" fill="#162230"/><text x="678" y="240" text-anchor="middle" fill="#e91e63" font-size="12">人民元のみ</text><rect x="30" y="262" width="220" height="40" fill="#1b2a3e"/><text x="140" y="288" text-anchor="middle" fill="white" font-size="12">プログラマビリティ</text><rect x="260" y="262" width="155" height="40" fill="#1b2a3e"/><text x="338" y="288" text-anchor="middle" fill="#aaa" font-size="12">なし</text><rect x="423" y="262" width="155" height="40" fill="#1b2a3e"/><text x="500" y="288" text-anchor="middle" fill="#aaa" font-size="12">なし</text><rect x="586" y="262" width="184" height="40" fill="#1b2a3e"/><text x="678" y="288" text-anchor="middle" fill="#e91e63" font-size="12">高（条件付き決済）</text><rect x="30" y="310" width="220" height="40" fill="#162230"/><text x="140" y="336" text-anchor="middle" fill="white" font-size="12">監視能力</text><rect x="260" y="310" width="155" height="40" fill="#162230"/><text x="338" y="336" text-anchor="middle" fill="#aaa" font-size="12">限定的</text><rect x="423" y="310" width="155" height="40" fill="#162230"/><text x="500" y="336" text-anchor="middle" fill="#f9a825" font-size="12">中程度</text><rect x="586" y="310" width="184" height="40" fill="#162230"/><text x="678" y="336" text-anchor="middle" fill="#e91e63" font-size="12">完全（全取引可視）</text></svg>


---

# CIPS：中国独自の国際送金ネットワーク（1/2）

> *SWIFT11,000機関に対しCIPSは100カ国1,500機関に拡大中*

- **SWIFT（Society for Worldwide Interbank Financial Telecommunication）：**
- 200カ国・11,000以上の金融機関が参加する国際決済メッセージ網
- 米国の管轄下に置かれており、制裁の道具として機能
- ---
- **CIPS（Cross-border Interbank Payment System）：**


---

# CIPS：中国独自の国際送金ネットワーク（2/2）

> *e-CNY+CIPSの組み合わせでドル・SWIFT不要の取引が可能*

- 2015年に中国が独自構築した国際送金網
- 2024年：100カ国以上・1,500以上の機関が参加
- ---
- **e-CNYとCIPSの組み合わせ：**
- 一帯一路参加国との取引をドル・SWIFTなしに処理


---

<!-- _class: lead -->
# デジタルシルクロード


---

# デジタルシルクロード：インフラ戦略マップ

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><ellipse cx="400" cy="190" rx="360" ry="160" fill="none" stroke="#2c2c54" stroke-width="1"/><circle cx="400" cy="190" r="50" fill="#0d3b66" stroke="#f9a825" stroke-width="3"/><text x="400" y="185" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">中国</text><text x="400" y="205" text-anchor="middle" fill="white" font-size="11">BRI Hub</text><circle cx="180" cy="130" r="34" fill="#1b3a5c" stroke="#e91e63" stroke-width="2"/><text x="180" y="126" text-anchor="middle" fill="white" font-size="10" font-weight="bold">中央アジア</text><text x="180" y="142" text-anchor="middle" fill="#e91e63" font-size="9">陸上ルート</text><circle cx="620" cy="110" r="34" fill="#1b3a5c" stroke="#4fc3f7" stroke-width="2"/><text x="620" y="106" text-anchor="middle" fill="white" font-size="10" font-weight="bold">東南アジア</text><text x="620" y="122" text-anchor="middle" fill="#4fc3f7" font-size="9">海上ルート</text><circle cx="130" cy="270" r="34" fill="#1b3a5c" stroke="#f9a825" stroke-width="2"/><text x="130" y="266" text-anchor="middle" fill="white" font-size="10" font-weight="bold">中東・アフリカ</text><text x="130" y="282" text-anchor="middle" fill="#f9a825" font-size="9">石油決済</text><circle cx="670" cy="290" r="34" fill="#1b3a5c" stroke="#4fc3f7" stroke-width="2"/><text x="670" y="286" text-anchor="middle" fill="white" font-size="10" font-weight="bold">南アジア</text><text x="670" y="302" text-anchor="middle" fill="#4fc3f7" font-size="9">港湾整備</text><circle cx="400" cy="60" r="28" fill="#1b3a5c" stroke="#aaa" stroke-width="1"/><text x="400" y="56" text-anchor="middle" fill="white" font-size="9" font-weight="bold">欧州</text><text x="400" y="70" text-anchor="middle" fill="#aaa" font-size="8">デジタル網</text><line x1="350" y1="168" x2="214" y2="147" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="450" y1="168" x2="586" y2="127" stroke="#4fc3f7" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="368" y1="205" x2="163" y2="256" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="432" y1="205" x2="637" y2="270" stroke="#4fc3f7" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="400" y1="140" x2="400" y2="88" stroke="#aaa" stroke-width="1" stroke-dasharray="4,3"/><rect x="20" y="340" width="760" height="30" rx="4" fill="#0d3b66" opacity="0.7"/><text x="400" y="360" text-anchor="middle" fill="#f9a825" font-size="12">40カ国以上でe-CNYパイロット導入 — ドル不要の経済圏を構築中</text></svg>


---

# 一帯一路の「通貨レイヤー」（1/2）

> *デジタル基盤の上にe-CNY決済網を組み込む三層戦略*

- **デジタルシルクロード（DSR）：**
- インフラ（港・道路）の建設に加えて、
- デジタルインフラ（5G・海底ケーブル・データセンター）を整備
- そこにe-CNYの決済網を組み込む
- ---
- **参加国の経済的メリット：**


---

# 一帯一路の「通貨レイヤー」（2/2）

> *制裁リスク国にとって人民元建て決済は魅力的な選択肢*

- ドル不足の国でも人民元建てで取引できる
- 特に「制裁リスクのある国」には魅力的
- ---
- **2024年実績：**
- 40カ国以上でe-CNYのパイロット導入
- サウジアラビアとの石油取引で人民元建て交渉
- <svg viewBox="0 0 800 170" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="170" fill="#1a1a2e"/><rect x="30" y="25" width="130" height="120" rx="8" fill="#0d3b66" stroke="#f9a825" stroke-width="2"/><text x="95" y="70" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">BRI</text><text x="95" y="88" text-anchor="middle" fill="white" font-size="10">物理インフラ</text><text x="95" y="104" text-anchor="middle" fill="white" font-size="10">港・道路・鉄道</text><rect x="180" y="25" width="130" height="120" rx="8" fill="#1b3a5c" stroke="#4fc3f7" stroke-width="2"/><text x="245" y="70" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold">DSR</text><text x="245" y="88" text-anchor="middle" fill="white" font-size="10">デジタル基盤</text><text x="245" y="104" text-anchor="middle" fill="white" font-size="10">5G・海底ケーブル</text><rect x="330" y="25" width="130" height="120" rx="8" fill="#2c1a3e" stroke="#e91e63" stroke-width="2"/><text x="395" y="70" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">CIPS</text><text x="395" y="88" text-anchor="middle" fill="white" font-size="10">決済インフラ</text><text x="395" y="104" text-anchor="middle" fill="white" font-size="10">100カ国+</text><rect x="480" y="25" width="130" height="120" rx="8" fill="#1b2a0d" stroke="#8bc34a" stroke-width="2"/><text x="545" y="70" text-anchor="middle" fill="#8bc34a" font-size="11" font-weight="bold">e-CNY</text><text x="545" y="88" text-anchor="middle" fill="white" font-size="10">通貨レイヤー</text><text x="545" y="104" text-anchor="middle" fill="white" font-size="10">プログラマブル</text><rect x="630" y="25" width="140" height="120" rx="8" fill="#3b1a0d" stroke="#ff7043" stroke-width="3"/><text x="700" y="65" text-anchor="middle" fill="#ff7043" font-size="12" font-weight="bold">人民元経済圏</text><text x="700" y="85" text-anchor="middle" fill="white" font-size="10">ドル・SWIFT不要</text><text x="700" y="103" text-anchor="middle" fill="white" font-size="10">中国主導の秩序</text><polygon points="163,85 170,78 170,92" fill="#f9a825"/><polygon points="313,85 320,78 320,92" fill="#4fc3f7"/><polygon points="463,85 470,78 470,92" fill="#e91e63"/><polygon points="613,85 620,78 620,92" fill="#ff7043"/></svg>


---

# ドル覇権への挑戦：国際決済シェアの推移

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">国際決済通貨シェア（SWIFT）</text><rect x="60" y="50" width="680" height="240" fill="#0d1a2e" rx="4"/><line x1="60" y1="290" x2="740" y2="290" stroke="#333" stroke-width="1"/><line x1="60" y1="50" x2="60" y2="290" stroke="#333" stroke-width="1"/><text x="50" y="294" text-anchor="end" fill="#aaa" font-size="10">0%</text><text x="50" y="249" text-anchor="end" fill="#aaa" font-size="10">20%</text><text x="50" y="204" text-anchor="end" fill="#aaa" font-size="10">40%</text><text x="50" y="159" text-anchor="end" fill="#aaa" font-size="10">60%</text><text x="50" y="114" text-anchor="end" fill="#aaa" font-size="10">80%</text><line x1="60" y1="249" x2="740" y2="249" stroke="#222" stroke-width="1" stroke-dasharray="3,3"/><line x1="60" y1="204" x2="740" y2="204" stroke="#222" stroke-width="1" stroke-dasharray="3,3"/><line x1="60" y1="159" x2="740" y2="159" stroke="#222" stroke-width="1" stroke-dasharray="3,3"/><text x="120" y="308" text-anchor="middle" fill="#aaa" font-size="10">2010</text><text x="250" y="308" text-anchor="middle" fill="#aaa" font-size="10">2014</text><text x="380" y="308" text-anchor="middle" fill="#aaa" font-size="10">2018</text><text x="510" y="308" text-anchor="middle" fill="#aaa" font-size="10">2022</text><text x="640" y="308" text-anchor="middle" fill="#aaa" font-size="10">2024</text><polyline points="120,124 250,118 380,116 510,110 640,108" fill="none" stroke="#4fc3f7" stroke-width="3"/><circle cx="120" cy="124" r="4" fill="#4fc3f7"/><circle cx="250" cy="118" r="4" fill="#4fc3f7"/><circle cx="380" cy="116" r="4" fill="#4fc3f7"/><circle cx="510" cy="110" r="4" fill="#4fc3f7"/><circle cx="640" cy="108" r="4" fill="#4fc3f7"/><text x="655" y="102" fill="#4fc3f7" font-size="11" font-weight="bold">USD ~42%</text><polyline points="120,204 250,200 380,198 510,193 640,190" fill="none" stroke="#f9a825" stroke-width="3"/><circle cx="120" cy="204" r="4" fill="#f9a825"/><circle cx="640" cy="190" r="4" fill="#f9a825"/><text x="655" y="185" fill="#f9a825" font-size="11" font-weight="bold">EUR ~32%</text><polyline points="120,283 250,282 380,281 510,278 640,270" fill="none" stroke="#e91e63" stroke-width="2"/><circle cx="120" cy="283" r="3" fill="#e91e63"/><circle cx="640" cy="270" r="3" fill="#e91e63"/><text x="655" y="266" fill="#e91e63" font-size="11" font-weight="bold">CNY ~4%</text><text x="400" y="340" text-anchor="middle" fill="#aaa" font-size="11">人民元シェアは拡大中だが、SWIFTを迂回するe-CNY+CIPSが本命</text></svg>


---

# まとめ：デジタル人民元の地政学的意味

> *通貨覇権の挑戦は軍事力より静かで強力な支配手段*

- ✅ **e-CNYの目的は利便性より制裁回避とドル覇権への挑戦**
- ✅ **プログラマブルマネーは国家の政策実行能力を飛躍的に強化する**
- ✅ **一帯一路+DSR+CIPSで「ドルなしの経済圏」を構築中**
- ✅ **日本への影響：取引先国がe-CNY決済を要求し始める可能性**
- 
- 「通貨の覇権は軍事力より強力な支配手段である」— キッシンジャー的観点
- <svg viewBox="0 0 800 160" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="160" fill="#1a1a2e"/><rect x="30" y="20" width="160" height="120" rx="8" fill="#0d3b66" stroke="#f9a825" stroke-width="2"/><text x="110" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">e-CNY</text><text x="110" y="80" text-anchor="middle" fill="white" font-size="10">プログラマブル</text><text x="110" y="96" text-anchor="middle" fill="white" font-size="10">完全監視</text><text x="110" y="112" text-anchor="middle" fill="white" font-size="10">条件付き決済</text><polygon points="198,80 215,73 215,87" fill="#f9a825"/><rect x="220" y="20" width="160" height="120" rx="8" fill="#1b3a5c" stroke="#f9a825" stroke-width="2"/><text x="300" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">CIPS</text><text x="300" y="80" text-anchor="middle" fill="white" font-size="10">独自送金網</text><text x="300" y="96" text-anchor="middle" fill="white" font-size="10">100カ国+</text><text x="300" y="112" text-anchor="middle" fill="white" font-size="10">SWIFT不要</text><polygon points="388,80 405,73 405,87" fill="#f9a825"/><rect x="410" y="20" width="160" height="120" rx="8" fill="#2c1a3e" stroke="#e91e63" stroke-width="2"/><text x="490" y="60" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">BRI+DSR</text><text x="490" y="80" text-anchor="middle" fill="white" font-size="10">インフラ整備</text><text x="490" y="96" text-anchor="middle" fill="white" font-size="10">40カ国+</text><text x="490" y="112" text-anchor="middle" fill="white" font-size="10">デジタル統合</text><polygon points="578,80 595,73 595,87" fill="#e91e63"/><rect x="600" y="20" width="170" height="120" rx="8" fill="#3b0020" stroke="#e91e63" stroke-width="3"/><text x="685" y="55" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">新経済圏</text><text x="685" y="78" text-anchor="middle" fill="white" font-size="10">ドル不要</text><text x="685" y="96" text-anchor="middle" fill="white" font-size="10">SWIFT不要</text><text x="685" y="114" text-anchor="middle" fill="#e91e63" font-size="10">中国主導の秩序</text></svg>

