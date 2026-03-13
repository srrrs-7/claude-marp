---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "半導体と覇権争い"
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
# 半導体戦争の地政学

- 台湾TSMC一社が世界を人質にしている構造
- 米中技術覇権争いの本質
- 日本の立ち位置と戦略
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#0f0f23"/><text x="400" y="50" text-anchor="middle" font-size="22" fill="#f9a825" font-weight="bold" font-family="sans-serif">CHIP = POWER</text><rect x="60" y="80" width="140" height="60" rx="8" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="2"/><text x="130" y="115" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">設計</text><text x="130" y="132" text-anchor="middle" font-size="11" fill="#4fc3f7" font-family="sans-serif">米国 90%+</text><rect x="240" y="80" width="140" height="60" rx="8" fill="#1e3a5f" stroke="#e91e63" stroke-width="2"/><text x="310" y="115" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">製造</text><text x="310" y="132" text-anchor="middle" font-size="11" fill="#e91e63" font-family="sans-serif">台湾 92%</text><rect x="420" y="80" width="140" height="60" rx="8" fill="#1e3a5f" stroke="#f9a825" stroke-width="2"/><text x="490" y="115" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">製造装置</text><text x="490" y="132" text-anchor="middle" font-size="11" fill="#f9a825" font-family="sans-serif">蘭・日・米</text><rect x="600" y="80" width="140" height="60" rx="8" fill="#1e3a5f" stroke="#69f0ae" stroke-width="2"/><text x="670" y="115" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">材料</text><text x="670" y="132" text-anchor="middle" font-size="11" fill="#69f0ae" font-family="sans-serif">日本 60%+</text><polygon points="210,110 230,104 230,116" fill="#ffffff"/><polygon points="390,110 410,104 410,116" fill="#ffffff"/><polygon points="570,110 590,104 590,116" fill="#ffffff"/><line x1="200" y1="110" x2="230" y2="110" stroke="#ffffff" stroke-width="1.5"/><line x1="380" y1="110" x2="410" y2="110" stroke="#ffffff" stroke-width="1.5"/><line x1="560" y1="110" x2="590" y2="110" stroke="#ffffff" stroke-width="1.5"/><text x="400" y="185" text-anchor="middle" font-size="13" fill="#aaaaaa" font-family="sans-serif">各工程が異なる国・企業に依存 — 一か所の失敗が世界を止める</text></svg>


---

# アジェンダ

> *TSMC独占から米中デカップリングまで—シリコンが覇権を決める全構造*

- 1. 半導体サプライチェーンの脆弱性
- 2. TSMCの「シリコンシールド」戦略
- 3. 米国の輸出規制と脱中国化
- 4. 日本・欧州の反撃
- 5. 2030年の半導体地図


---

<!-- _class: lead -->
# 半導体サプライチェーンの構造


---

# 半導体は現代の「石油」（1/2）

> *市場規模は石油の半分でも、経済・軍事依存度は石油を超えた*

- **2024年世界の半導体市場：** 約6,000億ドル（GDP比約0.7%）
- しかし半導体が止まると経済全体が止まる：
- - 自動車1台：数千個の半導体
- - スマートフォン：100以上の半導体
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#0f0f23"/><text x="400" y="28" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">半導体依存度（産業別）</text><rect x="60" y="50" width="100" height="120" rx="6" fill="#1a237e" stroke="#3f51b5" stroke-width="1.5"/><text x="110" y="180" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">自動車</text><rect x="62" y="52" width="96" height="90" rx="4" fill="#3f51b5"/><text x="110" y="100" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">数千個</text><rect x="200" y="50" width="100" height="120" rx="6" fill="#1a237e" stroke="#e91e63" stroke-width="1.5"/><text x="250" y="180" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">スマホ</text><rect x="202" y="52" width="96" height="100" rx="4" fill="#e91e63"/><text x="250" y="103" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">100+個</text><rect x="340" y="50" width="100" height="120" rx="6" fill="#1a237e" stroke="#f9a825" stroke-width="1.5"/><text x="390" y="180" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">PC/サーバー</text><rect x="342" y="52" width="96" height="108" rx="4" fill="#f9a825"/><text x="390" y="107" text-anchor="middle" font-size="13" fill="#1a1a2e" font-weight="bold" font-family="sans-serif">50〜500個</text><rect x="480" y="50" width="100" height="120" rx="6" fill="#1a237e" stroke="#69f0ae" stroke-width="1.5"/><text x="530" y="180" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">AI加速器</text><rect x="482" y="52" width="96" height="116" rx="4" fill="#69f0ae"/><text x="530" y="112" text-anchor="middle" font-size="13" fill="#1a1a2e" font-weight="bold" font-family="sans-serif">数万個</text><rect x="620" y="50" width="100" height="120" rx="6" fill="#1a237e" stroke="#ce93d8" stroke-width="1.5"/><text x="670" y="180" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">軍用システム</text><rect x="622" y="52" width="96" height="118" rx="4" fill="#ce93d8"/><text x="670" y="115" text-anchor="middle" font-size="13" fill="#1a1a2e" font-weight="bold" font-family="sans-serif">機密</text></svg>


---

# 半導体は現代の「石油」（2/2）

> *軍事・AI・通信—半導体なき現代国家は機能停止する*

- - 軍用システム：高度な半導体に依存
- **2021年半導体不足のインパクト：**
- 自動車産業だけで2,000億ドル以上の生産損失
- 日本自動車メーカーは数十万台の減産


---

# 世界の半導体生産の集中度（1/2）

> *最先端チップの92%をTSMC1社が製造する地政学的時限爆弾*

- **最先端半導体（3nm以下）の生産国：**
- - **台湾：** 92%（TSMC独占）
- - **韓国：** 8%（Samsungの一部）
- - **米国・欧州・中国：** 0%
- <svg viewBox="0 0 800 190" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="190" fill="#0f0f23"/><text x="400" y="26" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">最先端半導体（3nm以下）生産シェア</text><circle cx="220" cy="105" r="75" fill="none" stroke="#333" stroke-width="1"/><path d="M220,105 L220,30 A75,75 0 1,1 146.6,142.5 Z" fill="#e91e63"/><path d="M220,105 L146.6,142.5 A75,75 0 0,1 220,30 Z" fill="#4fc3f7"/><text x="240" y="80" font-size="28" font-weight="bold" fill="#e91e63" font-family="sans-serif">92%</text><text x="242" y="100" font-size="13" fill="#ffffff" font-family="sans-serif">台湾（TSMC）</text><text x="110" y="158" font-size="14" font-weight="bold" fill="#4fc3f7" font-family="sans-serif">8%</text><text x="95" y="174" font-size="11" fill="#aaaaaa" font-family="sans-serif">韓国</text><rect x="450" y="50" width="280" height="120" rx="8" fill="#111133" stroke="#333" stroke-width="1"/><text x="590" y="72" text-anchor="middle" font-size="13" fill="#aaaaaa" font-family="sans-serif">最先端チップ製造能力</text><rect x="470" y="82" width="16" height="16" rx="3" fill="#e91e63"/><text x="494" y="95" font-size="12" fill="#ffffff" font-family="sans-serif">台湾（TSMC）— 92%</text><rect x="470" y="104" width="16" height="16" rx="3" fill="#4fc3f7"/><text x="494" y="117" font-size="12" fill="#ffffff" font-family="sans-serif">韓国（Samsung）— 8%</text><rect x="470" y="126" width="16" height="16" rx="3" fill="#444"/><text x="494" y="139" font-size="12" fill="#888888" font-family="sans-serif">米国・欧州・中国 — 0%</text></svg>


---

# 世界の半導体生産の集中度（2/2）

- **全半導体製造の地域シェア（2023）：**
- <svg viewBox="0 0 800 230" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="230" fill="#0f0f23"/><text x="400" y="28" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">全半導体製造 地域シェア（2023年）</text><rect x="50" y="60" width="130" height="130" rx="6" fill="#e91e63" opacity="0.9"/><text x="115" y="120" text-anchor="middle" font-size="32" fill="#ffffff" font-weight="bold" font-family="sans-serif">46%</text><text x="115" y="145" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">台湾</text><text x="115" y="162" text-anchor="middle" font-size="11" fill="#ffcdd2" font-family="sans-serif">(TSMC主導)</text><rect x="210" y="80" width="110" height="110" rx="6" fill="#3f51b5" opacity="0.9"/><text x="265" y="133" text-anchor="middle" font-size="26" fill="#ffffff" font-weight="bold" font-family="sans-serif">21%</text><text x="265" y="155" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">韓国</text><rect x="350" y="92" width="90" height="98" rx="6" fill="#f9a825" opacity="0.9"/><text x="395" y="142" text-anchor="middle" font-size="22" fill="#1a1a2e" font-weight="bold" font-family="sans-serif">13%</text><text x="395" y="162" text-anchor="middle" font-size="12" fill="#1a1a2e" font-family="sans-serif">日本</text><rect x="468" y="108" width="72" height="82" rx="6" fill="#e53935" opacity="0.85"/><text x="504" y="151" text-anchor="middle" font-size="18" fill="#ffffff" font-weight="bold" font-family="sans-serif">9%</text><text x="504" y="170" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">中国</text><rect x="568" y="112" width="72" height="78" rx="6" fill="#00897b" opacity="0.9"/><text x="604" y="154" text-anchor="middle" font-size="18" fill="#ffffff" font-weight="bold" font-family="sans-serif">10%</text><text x="604" y="172" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">米国</text><text x="604" y="186" text-anchor="middle" font-size="9" fill="#b2dfdb" font-family="sans-serif">(設計1位)</text><rect x="668" y="138" width="60" height="52" rx="6" fill="#546e7a" opacity="0.9"/><text x="698" y="166" text-anchor="middle" font-size="14" fill="#ffffff" font-weight="bold" font-family="sans-serif">1%</text><text x="698" y="182" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">欧州</text><text x="400" y="215" text-anchor="middle" font-size="12" fill="#aaaaaa" font-family="sans-serif">製造は東アジアに極度に集中 — 地政学リスクの震源地</text></svg>


---

<!-- _class: lead -->
# TSMCのシリコンシールド


---

# 台湾の戦略：なくてはならない存在になる（1/2）

> *シリコンシールド—TSMC不可欠化が台湾の安全保障戦略になった*

- 「シリコンシールド」理論（Craig Addison, 2001）：
- 台湾が世界の半導体生産を支配すれば、
- 大国は台湾を守ることが自国利益になる
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#0f0f23"/><ellipse cx="400" cy="100" rx="80" ry="55" fill="#e91e63" opacity="0.85"/><text x="400" y="95" text-anchor="middle" font-size="14" fill="#ffffff" font-weight="bold" font-family="sans-serif">台湾</text><text x="400" y="113" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">TSMC 92%</text><rect x="30" y="65" width="100" height="45" rx="20" fill="#1a237e" stroke="#3f51b5" stroke-width="2"/><text x="80" y="93" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">米国</text><rect x="670" y="65" width="100" height="45" rx="20" fill="#1a237e" stroke="#4fc3f7" stroke-width="2"/><text x="720" y="93" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">日本・欧州</text><rect x="30" y="145" width="100" height="40" rx="20" fill="#b71c1c" stroke="#ef5350" stroke-width="2"/><text x="80" y="170" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">中国</text><rect x="670" y="145" width="100" height="40" rx="20" fill="#1b5e20" stroke="#66bb6a" stroke-width="2"/><text x="720" y="170" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">韓国</text><line x1="130" y1="88" x2="318" y2="98" stroke="#3f51b5" stroke-width="2" stroke-dasharray="5,3"/><text x="200" y="82" font-size="10" fill="#3f51b5" font-family="sans-serif">安全保障</text><line x1="670" y1="92" x2="482" y2="98" stroke="#4fc3f7" stroke-width="2" stroke-dasharray="5,3"/><text x="560" y="82" font-size="10" fill="#4fc3f7" font-family="sans-serif">供給依存</text><line x1="130" y1="158" x2="318" y2="122" stroke="#ef5350" stroke-width="2" stroke-dasharray="5,3"/><text x="185" y="155" font-size="10" fill="#ef5350" font-family="sans-serif">圧力</text><line x1="670" y1="158" x2="482" y2="122" stroke="#66bb6a" stroke-width="2" stroke-dasharray="5,3"/><text x="590" y="155" font-size="10" fill="#66bb6a" font-family="sans-serif">協調</text></svg>


---

# 台湾の戦略：なくてはならない存在になる（2/2）

> *TSMC占領で全世界GDP40%喪失—台湾侵攻コストは侵略者も払えない*

- もし中国が台湾を占領すれば：
- - Apple・NVIDIAは1〜2年で半導体を入手できない
- - 世界のデータセンター建設が停止
- - 軍用システムの製造が不可能に
- → 台湾はこれを意図的に設計した地政学的保険


---

<!-- _class: lead -->
# 米国の反撃：CHIPS法と輸出規制


---

# 2022年：半導体戦争の転換点（1/2）

> *CHIPS法527億ドルが「兵器化された」米輸出規制と組み合わさり中国を封鎖*

- **CHIPS and Science Act（2022年8月）：**
- - 半導体製造への補助金：527億ドル
- - 研究開発支援：2,000億ドル
- - 条件：中国への投資禁止
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#0f0f23"/><text x="400" y="26" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">CHIPS法 資金配分（単位：億ドル）</text><rect x="60" y="50" width="200" height="90" rx="6" fill="#1565c0" stroke="#42a5f5" stroke-width="1.5"/><text x="160" y="92" text-anchor="middle" font-size="28" fill="#ffffff" font-weight="bold" font-family="sans-serif">527</text><text x="160" y="116" text-anchor="middle" font-size="12" fill="#90caf9" font-family="sans-serif">製造補助金</text><text x="160" y="130" text-anchor="middle" font-size="10" fill="#64b5f6" font-family="sans-serif">（TSMC・Intel・Samsung向け）</text><rect x="300" y="30" width="200" height="120" rx="6" fill="#6a1b9a" stroke="#ce93d8" stroke-width="1.5"/><text x="400" y="80" text-anchor="middle" font-size="32" fill="#ffffff" font-weight="bold" font-family="sans-serif">2,000</text><text x="400" y="110" text-anchor="middle" font-size="12" fill="#e1bee7" font-family="sans-serif">研究開発支援</text><text x="400" y="127" text-anchor="middle" font-size="10" fill="#ce93d8" font-family="sans-serif">（量子・AI・次世代チップ）</text><rect x="540" y="65" width="180" height="75" rx="6" fill="#bf360c" stroke="#ff7043" stroke-width="1.5"/><text x="630" y="103" text-anchor="middle" font-size="20" fill="#ffffff" font-weight="bold" font-family="sans-serif">条件付き</text><text x="630" y="122" text-anchor="middle" font-size="11" fill="#ffccbc" font-family="sans-serif">中国投資禁止 10年</text><text x="400" y="168" text-anchor="middle" font-size="11" fill="#aaaaaa" font-family="sans-serif">合計約2,527億ドル — 国家安全保障としての産業政策</text></svg>


---

# 2022年：半導体戦争の転換点（2/2）

- **輸出規制（2022-2025年）の波及効果：**
- <svg viewBox="0 0 800 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="210" fill="#0f0f23"/><text x="400" y="26" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">輸出規制の波及フロー</text><rect x="30" y="50" width="140" height="55" rx="8" fill="#b71c1c" stroke="#ef5350" stroke-width="2"/><text x="100" y="75" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">米国規制当局</text><text x="100" y="92" text-anchor="middle" font-size="10" fill="#ffcdd2" font-family="sans-serif">EAR / FDPR</text><polygon points="180,78 200,72 200,84" fill="#f9a825"/><line x1="170" y1="78" x2="200" y2="78" stroke="#f9a825" stroke-width="2"/><rect x="210" y="50" width="140" height="55" rx="8" fill="#e65100" stroke="#ff9800" stroke-width="2"/><text x="280" y="75" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">EUV禁輸</text><text x="280" y="92" text-anchor="middle" font-size="10" fill="#ffe0b2" font-family="sans-serif">ASML→中国 禁止</text><polygon points="360,78 380,72 380,84" fill="#f9a825"/><line x1="350" y1="78" x2="380" y2="78" stroke="#f9a825" stroke-width="2"/><rect x="390" y="50" width="140" height="55" rx="8" fill="#1b5e20" stroke="#66bb6a" stroke-width="2"/><text x="460" y="75" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">製造装置禁輸</text><text x="460" y="92" text-anchor="middle" font-size="10" fill="#c8e6c9" font-family="sans-serif">18nm以下対象</text><polygon points="540,78 560,72 560,84" fill="#f9a825"/><line x1="530" y1="78" x2="560" y2="78" stroke="#f9a825" stroke-width="2"/><rect x="570" y="50" width="140" height="55" rx="8" fill="#1a237e" stroke="#5c6bc0" stroke-width="2"/><text x="640" y="75" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">外国直接製品</text><text x="640" y="92" text-anchor="middle" font-size="10" fill="#c5cae9" font-family="sans-serif">ルール（FDPR）</text><rect x="200" y="145" width="400" height="50" rx="8" fill="#263238" stroke="#e91e63" stroke-width="2"/><text x="400" y="167" text-anchor="middle" font-size="13" fill="#e91e63" font-weight="bold" font-family="sans-serif">中国の先端半導体製造</text><text x="400" y="185" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">5〜10年の技術的遅延と推計</text><line x1="280" y1="105" x2="350" y2="145" stroke="#ef5350" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="460" y1="105" x2="430" y2="145" stroke="#ef5350" stroke-width="1.5" stroke-dasharray="4,3"/></svg>


---

# EUV装置の独占構造

- EUV（極端紫外線）露光装置はASML（蘭）が世界独占
- <svg viewBox="0 0 800 230" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="230" fill="#0f0f23"/><text x="400" y="26" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">EUV露光装置のサプライチェーン（ASML依存構造）</text><rect x="330" y="45" width="140" height="55" rx="8" fill="#0d47a1" stroke="#1565c0" stroke-width="2"/><text x="400" y="70" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">ASML</text><text x="400" y="87" text-anchor="middle" font-size="11" fill="#90caf9" font-family="sans-serif">オランダ — 世界唯一</text><rect x="30" y="50" width="110" height="45" rx="6" fill="#1a237e" stroke="#3f51b5" stroke-width="1.5"/><text x="85" y="70" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Zeiss</text><text x="85" y="85" text-anchor="middle" font-size="10" fill="#9fa8da" font-family="sans-serif">光学系（独）</text><rect x="175" y="50" width="110" height="45" rx="6" fill="#1a237e" stroke="#3f51b5" stroke-width="1.5"/><text x="230" y="70" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Cymer/Gigaphoton</text><text x="230" y="85" text-anchor="middle" font-size="10" fill="#9fa8da" font-family="sans-serif">光源（米・日）</text><rect x="510" y="50" width="110" height="45" rx="6" fill="#1a237e" stroke="#3f51b5" stroke-width="1.5"/><text x="565" y="70" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">VDL/各社</text><text x="565" y="85" text-anchor="middle" font-size="10" fill="#9fa8da" font-family="sans-serif">精密部品</text><rect x="660" y="50" width="110" height="45" rx="6" fill="#1a237e" stroke="#3f51b5" stroke-width="1.5"/><text x="715" y="70" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Air Liquide</text><text x="715" y="85" text-anchor="middle" font-size="10" fill="#9fa8da" font-family="sans-serif">特殊ガス（仏）</text><line x1="140" y1="73" x2="330" y2="73" stroke="#3f51b5" stroke-width="1.5"/><polygon points="330,68 345,73 330,78" fill="#3f51b5"/><line x1="285" y1="73" x2="330" y2="73" stroke="#3f51b5" stroke-width="1.5"/><line x1="510" y1="73" x2="480" y2="73" stroke="#3f51b5" stroke-width="1.5"/><polygon points="480,68 465,73 480,78" fill="#3f51b5"/><line x1="660" y1="73" x2="510" y2="73" stroke="#3f51b5" stroke-width="1.5"/><polygon points="500,68 485,73 500,78" fill="#3f51b5"/><rect x="140" y="145" width="110" height="50" rx="6" fill="#4a148c" stroke="#ab47bc" stroke-width="1.5"/><text x="195" y="168" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">TSMC</text><text x="195" y="184" text-anchor="middle" font-size="10" fill="#e1bee7" font-family="sans-serif">台湾</text><rect x="340" y="145" width="110" height="50" rx="6" fill="#4a148c" stroke="#ab47bc" stroke-width="1.5"/><text x="395" y="168" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">Samsung</text><text x="395" y="184" text-anchor="middle" font-size="10" fill="#e1bee7" font-family="sans-serif">韓国</text><rect x="540" y="145" width="110" height="50" rx="6" fill="#4a148c" stroke="#ab47bc" stroke-width="1.5"/><text x="595" y="168" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">Intel</text><text x="595" y="184" text-anchor="middle" font-size="10" fill="#e1bee7" font-family="sans-serif">米国</text><line x1="400" y1="100" x2="195" y2="145" stroke="#ab47bc" stroke-width="1.5"/><polygon points="195,145 190,130 200,130" fill="#ab47bc"/><line x1="400" y1="100" x2="395" y2="145" stroke="#ab47bc" stroke-width="1.5"/><polygon points="395,145 390,130 400,130" fill="#ab47bc"/><line x1="400" y1="100" x2="595" y2="145" stroke="#ab47bc" stroke-width="1.5"/><polygon points="595,145 590,130 600,130" fill="#ab47bc"/><rect x="220" y="208" width="360" height="18" rx="4" fill="#b71c1c" opacity="0.7"/><text x="400" y="221" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">中国はEUV入手不可 → 7nm以下の量産が困難</text></svg>


---

# 日本の半導体戦略（1/2）

> *ラピダス2nm+熊本TSMCで日本は30年の空白を取り戻す賭けに出た*

- **ラピダス（2022年設立）：**
- Toyota・Sony・NTT等8社と政府が出資
- 目標：2027年に2nmチップ量産
- 国家補助：3,300億円以上
- <svg viewBox="0 0 800 170" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="170" fill="#0f0f23"/><text x="400" y="24" text-anchor="middle" font-size="13" fill="#f9a825" font-weight="bold" font-family="sans-serif">ラピダス コンソーシアム構成</text><rect x="300" y="40" width="200" height="55" rx="8" fill="#e91e63" stroke="#f48fb1" stroke-width="2"/><text x="400" y="65" text-anchor="middle" font-size="14" fill="#ffffff" font-weight="bold" font-family="sans-serif">Rapidus</text><text x="400" y="83" text-anchor="middle" font-size="11" fill="#fce4ec" font-family="sans-serif">2nm量産目標 2027年</text><rect x="30" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="75" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">Toyota</text><rect x="135" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="180" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">Sony</text><rect x="240" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="285" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">NTT</text><rect x="345" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="390" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">NEC</text><rect x="450" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="495" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">Softbank</text><rect x="555" y="110" width="90" height="35" rx="5" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/><text x="600" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">Denso</text><rect x="660" y="110" width="110" height="35" rx="5" fill="#b71c1c" stroke="#ef5350" stroke-width="1"/><text x="715" y="132" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">政府 3,300億円+</text><line x1="400" y1="95" x2="75" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="180" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="285" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="390" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="495" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="600" y2="110" stroke="#5c6bc0" stroke-width="1"/><line x1="400" y1="95" x2="715" y2="110" stroke="#ef5350" stroke-width="1"/></svg>


---

# 日本の半導体戦略（2/2）

> *9000億円の国家投資が日本に先端製造拠点を取り戻す最後の機会*

- **熊本TSMC工場（2024年稼動）：**
- 日本初のTSMC工場（12nm世代）
- ソニー・トヨタが顧客として確約
- **課題：** 人材不足・EUV技術のキャッチアップ
- → 「日本の半導体復権」か「補助金を溶かすだけ」か


---

# 2030年の半導体地図（1/2）

> *多極化が進めば冗長性確保—供給リスクは分散するが効率は下がる*

- **楽観シナリオ：**
- 米国・日本・欧州・インドが生産拠点を分散
- 中国は独自エコシステムを確立（レガシー半導体）
- → 「G2の半導体分離」で両陣営が共存
- <svg viewBox="0 0 800 175" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="175" fill="#0f0f23"/><text x="400" y="24" text-anchor="middle" font-size="13" fill="#69f0ae" font-weight="bold" font-family="sans-serif">楽観シナリオ：2030年 分散型半導体世界</text><rect x="30" y="45" width="350" height="110" rx="8" fill="#1b5e20" opacity="0.3" stroke="#69f0ae" stroke-width="1.5"/><text x="205" y="65" text-anchor="middle" font-size="12" fill="#69f0ae" font-weight="bold" font-family="sans-serif">民主主義陣営</text><rect x="50" y="75" width="80" height="35" rx="4" fill="#1b5e20" stroke="#69f0ae" stroke-width="1"/><text x="90" y="97" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">米国(設計)</text><rect x="150" y="75" width="80" height="35" rx="4" fill="#1b5e20" stroke="#69f0ae" stroke-width="1"/><text x="190" y="97" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">台湾(製造)</text><rect x="250" y="75" width="80" height="35" rx="4" fill="#1b5e20" stroke="#69f0ae" stroke-width="1"/><text x="290" y="97" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">日本(材料)</text><rect x="50" y="120" width="80" height="28" rx="4" fill="#0d3318" stroke="#69f0ae" stroke-width="1"/><text x="90" y="139" text-anchor="middle" font-size="10" fill="#aaaaaa" font-family="sans-serif">欧州(装置)</text><rect x="150" y="120" width="80" height="28" rx="4" fill="#0d3318" stroke="#69f0ae" stroke-width="1"/><text x="190" y="139" text-anchor="middle" font-size="10" fill="#aaaaaa" font-family="sans-serif">インド(後工程)</text><rect x="250" y="120" width="80" height="28" rx="4" fill="#0d3318" stroke="#69f0ae" stroke-width="1"/><text x="290" y="139" text-anchor="middle" font-size="10" fill="#aaaaaa" font-family="sans-serif">韓国(メモリ)</text><rect x="420" y="45" width="350" height="110" rx="8" fill="#b71c1c" opacity="0.2" stroke="#ef5350" stroke-width="1.5"/><text x="595" y="65" text-anchor="middle" font-size="12" fill="#ef5350" font-weight="bold" font-family="sans-serif">中国陣営（自立）</text><rect x="440" y="75" width="130" height="35" rx="4" fill="#3b0a0a" stroke="#ef5350" stroke-width="1"/><text x="505" y="97" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">レガシー半導体独自生産</text><rect x="590" y="75" width="160" height="35" rx="4" fill="#3b0a0a" stroke="#ef5350" stroke-width="1"/><text x="670" y="97" text-anchor="middle" font-size="10" fill="#ffffff" font-family="sans-serif">SMIC・HiSilicon主導</text><text x="595" y="140" text-anchor="middle" font-size="10" fill="#aaaaaa" font-family="sans-serif">先端チップは輸入困難 → AI・軍事で差が開く</text><rect x="385" y="85" width="30" height="25" rx="4" fill="#263238" stroke="#f9a825" stroke-width="2"/><text x="400" y="102" text-anchor="middle" font-size="18" fill="#f9a825" font-family="sans-serif">壁</text></svg>


---

# 2030年の半導体地図（2/2）

> *米中デカップリング完成で世界はシリコン・カーテンで分断される*

- **悲観シナリオ：**
- 台湾有事で半導体サプライチェーン崩壊
- 代替生産能力の立ち上げに5〜10年
- → 世界経済への打撃は2008年金融危機を超える
- **確実なこと：** 半導体は永遠に地政学の中心にある


---

# まとめ：シリコンが決める世界の覇権

> *半導体覇権が政治・経済・軍事のすべてを決める—技術主権が国家主権*

- ✅ **最先端半導体の92%は台湾一社（TSMC）が製造**
- ✅ **半導体は現代の「石油」— しかし代替不可能な点で石油より危険**
- ✅ **米中のデカップリングは製造装置・設計ソフトで進行中**
- ✅ **日本は国策で半導体産業の再建を試みている**
- <svg viewBox="0 0 800 120" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="120" fill="#0f0f23"/><rect x="30" y="20" width="160" height="80" rx="8" fill="#1a237e" stroke="#42a5f5" stroke-width="2"/><text x="110" y="55" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">設計</text><text x="110" y="73" text-anchor="middle" font-size="11" fill="#90caf9" font-family="sans-serif">米国 独占</text><polygon points="200,60 218,54 218,66" fill="#f9a825"/><line x1="190" y1="60" x2="218" y2="60" stroke="#f9a825" stroke-width="2"/><rect x="228" y="20" width="160" height="80" rx="8" fill="#b71c1c" stroke="#e91e63" stroke-width="2"/><text x="308" y="55" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">製造</text><text x="308" y="73" text-anchor="middle" font-size="11" fill="#f48fb1" font-family="sans-serif">台湾 92%</text><polygon points="398,60 416,54 416,66" fill="#f9a825"/><line x1="388" y1="60" x2="416" y2="60" stroke="#f9a825" stroke-width="2"/><rect x="426" y="20" width="160" height="80" rx="8" fill="#e65100" stroke="#f9a825" stroke-width="2"/><text x="506" y="55" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">製造装置</text><text x="506" y="73" text-anchor="middle" font-size="11" fill="#ffe0b2" font-family="sans-serif">蘭・日・米</text><polygon points="596,60 614,54 614,66" fill="#f9a825"/><line x1="586" y1="60" x2="614" y2="60" stroke="#f9a825" stroke-width="2"/><rect x="624" y="20" width="146" height="80" rx="8" fill="#1b5e20" stroke="#69f0ae" stroke-width="2"/><text x="697" y="55" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">材料</text><text x="697" y="73" text-anchor="middle" font-size="11" fill="#a5d6a7" font-family="sans-serif">日本 60%+</text></svg>
- 「地政学の最前線は今や半導体工場の中にある」

