---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ネットワーク効果と独占"
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
# ネットワーク効果の「罠」

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
-   <rect width="800" height="280" fill="#1a1a2e"/>
-   <!-- Network nodes - winner takes all visualization -->
-   <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ネットワーク効果：強くなるほど競争できなくなる逆説</text>
-   <!-- Small network (left) -->
-   <circle cx="110" cy="120" r="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
-   <circle cx="70" cy="160" r="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
-   <circle cx="150" cy="160" r="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
-   <circle cx="110" cy="200" r="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
-   <line x1="110" y1="132" x2="80" y2="150" stroke="#e91e63" stroke-width="1.5"/>
-   <line x1="110" y1="132" x2="140" y2="150" stroke="#e91e63" stroke-width="1.5"/>
-   <line x1="80" y1="172" x2="110" y2="188" stroke="#e91e63" stroke-width="1.5"/>
-   <line x1="140" y1="172" x2="110" y2="188" stroke="#e91e63" stroke-width="1.5"/>
-   <text x="110" y="228" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">競合 (4ノード)</text>
-   <text x="110" y="244" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">価値 ∝ 16</text>
-   <!-- VS -->
-   <text x="270" y="165" text-anchor="middle" fill="#888" font-size="28" font-weight="bold" font-family="sans-serif">vs</text>
-   <!-- Large network (right) - dominant -->
-   <circle cx="490" cy="100" r="16" fill="#0d2137" stroke="#f9a825" stroke-width="2.5"/>
-   <circle cx="430" cy="135" r="14" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <circle cx="555" cy="135" r="14" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <circle cx="410" cy="185" r="13" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <circle cx="470" cy="190" r="13" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <circle cx="530" cy="190" r="13" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <circle cx="580" cy="175" r="13" fill="#0d2137" stroke="#f9a825" stroke-width="2"/>
-   <line x1="490" y1="116" x2="440" y2="123" stroke="#f9a825" stroke-width="1.5"/>
-   <line x1="490" y1="116" x2="548" y2="123" stroke="#f9a825" stroke-width="1.5"/>
-   <line x1="436" y1="149" x2="416" y2="174" stroke="#f9a825" stroke-width="1.5"/>
-   <line x1="436" y1="149" x2="470" y2="178" stroke="#f9a825" stroke-width="1.5"/>
-   <line x1="549" y1="149" x2="528" y2="178" stroke="#f9a825" stroke-width="1.5"/>
-   <line x1="549" y1="149" x2="572" y2="163" stroke="#f9a825" stroke-width="1.5"/>
-   <text x="490" y="228" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">支配者 (7ノード)</text>
-   <text x="490" y="244" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">価値 ∝ 49</text>
-   <!-- winner label -->
-   <rect x="420" y="254" width="140" height="22" rx="6" fill="#0d2137" stroke="#f9a825" stroke-width="1.5"/>
-   <text x="490" y="269" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">勝者総取り</text>
-   <!-- lock icon for loser -->
-   <text x="110" y="260" text-anchor="middle" fill="#888" font-size="9" font-family="sans-serif">参入障壁で締め出される</text>
- </svg>
- 強くなるほど競争できなくなる逆説
- 勝者総取りとロックインの経済学
- どうやってネットワーク効果を崩すか


---

# アジェンダ

- 1. ネットワーク効果の定義とメトカーフの法則
- 2. プラットフォームの勝者総取り構造
- 3. ロックインのメカニズム
- 4. 歴史的な独占の崩壊事例
- 5. 次の破壊的競合の条件


---

<!-- _class: lead -->
# ネットワーク効果の基本


---

# メトカーフの法則：ネットワークの価値（1/2）

- Robert Metcalfe（イーサネット発明者）の法則：
- **ネットワークの価値はユーザー数の二乗に比例する**
- V = n²（nはノード数）
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">FAX機の台数と接続数の増加</text><line x1="60" y1="260" x2="740" y2="260" stroke="#888" stroke-width="1.5"/><line x1="60" y1="260" x2="60" y2="30" stroke="#888" stroke-width="1.5"/><text x="400" y="285" text-anchor="middle" fill="#aaa" font-size="12">ユーザー数 n</text><text x="30" y="150" text-anchor="middle" fill="#aaa" font-size="12" transform="rotate(-90,30,150)">接続数 n(n-1)/2</text><polyline points="60,260 167,258 274,248 381,222 488,176 595,106 702,20" fill="none" stroke="#f9a825" stroke-width="3"/><circle cx="60" cy="260" r="5" fill="#e91e63"/><circle cx="167" cy="258" r="5" fill="#e91e63"/><circle cx="274" cy="248" r="5" fill="#e91e63"/><circle cx="381" cy="222" r="5" fill="#e91e63"/><circle cx="488" cy="176" r="5" fill="#e91e63"/><circle cx="595" cy="106" r="5" fill="#e91e63"/><circle cx="702" cy="20" r="5" fill="#e91e63"/><text x="60" y="277" text-anchor="middle" fill="#aaa" font-size="10">1</text><text x="167" y="277" text-anchor="middle" fill="#aaa" font-size="10">2</text><text x="274" y="277" text-anchor="middle" fill="#aaa" font-size="10">3</text><text x="381" y="277" text-anchor="middle" fill="#aaa" font-size="10">5</text><text x="488" y="277" text-anchor="middle" fill="#aaa" font-size="10">7</text><text x="595" y="277" text-anchor="middle" fill="#aaa" font-size="10">10</text><text x="702" y="277" text-anchor="middle" fill="#aaa" font-size="10">15</text><text x="42" y="263" text-anchor="end" fill="#aaa" font-size="10">0</text><text x="42" y="218" text-anchor="end" fill="#aaa" font-size="10">45</text><text x="42" y="109" text-anchor="end" fill="#aaa" font-size="10">45k</text></svg>


---

# メトカーフの法則：ネットワークの価値（2/2）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">ネットワーク価値の指数関数的成長</text><line x1="60" y1="310" x2="740" y2="310" stroke="#555" stroke-width="1.5"/><line x1="60" y1="310" x2="60" y2="50" stroke="#555" stroke-width="1.5"/><text x="400" y="340" text-anchor="middle" fill="#aaa" font-size="13">ユーザー数</text><text x="22" y="180" text-anchor="middle" fill="#aaa" font-size="13" transform="rotate(-90,22,180)">価値</text><polyline points="60,310 172,308 284,296 396,268 508,220 620,148 732,48" fill="none" stroke="#f9a825" stroke-width="3.5"/><line x1="60" y1="310" x2="732" y2="228" stroke="#4fc3f7" stroke-width="2" stroke-dasharray="6,4"/><text x="740" y="228" fill="#4fc3f7" font-size="12">線形</text><text x="740" y="50" fill="#f9a825" font-size="12">n²</text><text x="396" y="255" fill="white" font-size="12" text-anchor="middle">→ ユーザーが増えるほど</text><text x="396" y="272" fill="#e91e63" font-size="13" font-weight="bold" text-anchor="middle">指数関数的に価値が上がる</text><rect x="510" y="130" width="220" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="620" y="153" text-anchor="middle" fill="white" font-size="12">最初に大きくなった者が</text><text x="620" y="172" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">圧倒的優位を持つ</text></svg>


---

<!-- _class: lead -->
# 勝者総取りの構造


---

# なぜSNSは複数共存できないか（1/2）

- **仮想的な競争：**
- SNS-A（友人100人）vs SNS-B（友人1人）
- → ユーザーは合理的にSNS-Aを選ぶ
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">ティッピングポイント：市場の転換点</text><line x1="60" y1="210" x2="740" y2="210" stroke="#555" stroke-width="1.5"/><line x1="60" y1="210" x2="60" y2="40" stroke="#555" stroke-width="1.5"/><text x="400" y="235" text-anchor="middle" fill="#aaa" font-size="12">時間</text><text x="22" y="125" text-anchor="middle" fill="#aaa" font-size="12" transform="rotate(-90,22,125)">市場シェア</text><polyline points="60,200 160,195 240,185 320,165 380,140 420,105 460,70 500,52 580,45 660,43 740,42" fill="none" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="40" x2="400" y2="210" stroke="#e91e63" stroke-width="2" stroke-dasharray="5,4"/><text x="400" y="38" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">ティッピングポイント</text><text x="240" y="175" fill="#aaa" font-size="12" text-anchor="middle">競争期間</text><text x="580" y="60" fill="#4fc3f7" font-size="12" text-anchor="middle">独占安定期</text></svg>


---

# なぜSNSは複数共存できないか（2/2）

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
-   <rect width="800" height="280" fill="#1a1a2e"/>
-   <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ネットワーク規模と参入障壁の関係</text>
-   <!-- axes -->
-   <line x1="60" y1="220" x2="740" y2="220" stroke="#555" stroke-width="1.5"/>
-   <line x1="60" y1="220" x2="60" y2="45" stroke="#555" stroke-width="1.5"/>
-   <text x="400" y="248" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">ネットワーク規模（ユーザー数）</text>
-   <text x="22" y="135" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif" transform="rotate(-90,22,135)">参入障壁の高さ</text>
-   <!-- barrier curve (rises quickly) -->
-   <polyline points="60,215 150,210 240,195 330,170 420,130 510,80 600,50 690,40" fill="none" stroke="#e91e63" stroke-width="3"/>
-   <!-- network value curve -->
-   <polyline points="60,218 150,215 240,205 330,185 420,150 510,100 600,58 690,30" fill="none" stroke="#f9a825" stroke-width="3" stroke-dasharray="8,4"/>
-   <!-- labels -->
-   <text x="700" y="45" fill="#f9a825" font-size="11" font-family="sans-serif">ネットワーク価値</text>
-   <text x="700" y="58" fill="#f9a825" font-size="10" font-family="sans-serif">(n²)</text>
-   <text x="700" y="80" fill="#e91e63" font-size="11" font-family="sans-serif">参入障壁</text>
-   <!-- tipping point -->
-   <line x1="420" y1="45" x2="420" y2="220" stroke="#888" stroke-width="1.5" stroke-dasharray="5,4"/>
-   <text x="420" y="42" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">ティッピングポイント</text>
-   <!-- left zone -->
-   <text x="240" y="75" text-anchor="middle" fill="#4fc3f7" font-size="12" font-family="sans-serif">競争可能ゾーン</text>
-   <!-- right zone -->
-   <rect x="430" y="60" width="140" height="32" rx="6" fill="#3a1a1a" stroke="#e91e63" stroke-width="1.5"/>
-   <text x="500" y="80" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">後発は参入不可能</text>
-   <!-- data points: real companies -->
-   <circle cx="600" cy="58" r="6" fill="#f9a825"/>
-   <text x="606" y="50" fill="#aaa" font-size="10" font-family="sans-serif">Google</text>
-   <circle cx="555" cy="75" r="5" fill="#f9a825"/>
-   <text x="561" y="67" fill="#aaa" font-size="10" font-family="sans-serif">Meta</text>
- </svg>
- → 後発は参入できない壁が生まれる
- **現実のデータ（2024）：**
- - ソーシャルグラフ：Facebook/Instagram（Metaが支配）
- - 動画：YouTube（シェア90%以上）
- - 検索：Google（90%以上）
- - スマホOS：Android/iOS（99.9%）


---

<!-- _class: lead -->
# ロックインのメカニズム


---

# 転換コストが競争を殺す（1/2）

- **転換コストの4つの種類**
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><rect x="40" y="40" width="160" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="120" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">データ持出し</text><text x="120" y="98" text-anchor="middle" fill="white" font-size="11">写真・連絡先</text><text x="120" y="116" text-anchor="middle" fill="#aaa" font-size="10">移行に数時間〜数日</text><rect x="240" y="40" width="160" height="100" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="320" y="78" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">学習コスト</text><text x="320" y="98" text-anchor="middle" fill="white" font-size="11">UI・操作習熟</text><text x="320" y="116" text-anchor="middle" fill="#aaa" font-size="10">再学習に数週間</text><rect x="440" y="40" width="160" height="100" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="520" y="78" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">エコシステム</text><text x="520" y="98" text-anchor="middle" fill="white" font-size="11">周辺デバイス依存</text><text x="520" y="116" text-anchor="middle" fill="#aaa" font-size="10">買い替えコスト大</text><rect x="640" y="40" width="120" height="100" rx="10" fill="#16213e" stroke="#81c784" stroke-width="2"/><text x="700" y="78" text-anchor="middle" fill="#81c784" font-size="14" font-weight="bold">社会的</text><text x="700" y="98" text-anchor="middle" fill="white" font-size="11">グループ孤立</text><text x="700" y="116" text-anchor="middle" fill="#aaa" font-size="10">LINE離脱のリスク</text><rect x="260" y="185" width="280" height="90" rx="12" fill="#0d0d1a" stroke="#f9a825" stroke-width="2"/><text x="400" y="220" text-anchor="middle" fill="white" font-size="14">合計転換コスト =</text><text x="400" y="245" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">競合への移行障壁</text><line x1="120" y1="140" x2="300" y2="185" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/><line x1="320" y1="140" x2="360" y2="185" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/><line x1="520" y1="140" x2="450" y2="185" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/><line x1="700" y1="140" x2="510" y2="185" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/></svg>


---

# 転換コストが競争を殺す（2/2）

- **3. エコシステムの依存**
- iPhoneからAndroidに移ると：AirPods・Apple Watch・iCloudを捨てる必要
- **4. 社会的コスト**
- LINEをやめるとグループから孤立する
- → **転換コストはプラットフォームが意図的に設計する競争阻害手段**


---

# 独占はどうやって崩れるか（1/2）

- **事例：MySpace → Facebook（2005-2008）**
- MySpaceは2006年時点で世界最大のSNS
- Facebookは「リアルな人間関係」という全く異なる価値提案で逆転
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">MySpace vs Facebook：市場シェア推移（概念図）</text><line x1="60" y1="195" x2="740" y2="195" stroke="#555" stroke-width="1.5"/><line x1="60" y1="195" x2="60" y2="40" stroke="#555" stroke-width="1.5"/><text x="130" y="215" text-anchor="middle" fill="#aaa" font-size="10">2004</text><text x="250" y="215" text-anchor="middle" fill="#aaa" font-size="10">2005</text><text x="370" y="215" text-anchor="middle" fill="#aaa" font-size="10">2006</text><text x="490" y="215" text-anchor="middle" fill="#aaa" font-size="10">2007</text><text x="610" y="215" text-anchor="middle" fill="#aaa" font-size="10">2008</text><text x="730" y="215" text-anchor="middle" fill="#aaa" font-size="10">2009</text><polyline points="60,185 130,150 250,90 370,68 490,100 610,150 730,185" fill="none" stroke="#e91e63" stroke-width="2.5"/><text x="250" y="84" fill="#e91e63" font-size="11">MySpace</text><polyline points="60,193 130,190 250,182 370,145 490,95 610,55 730,45" fill="none" stroke="#4fc3f7" stroke-width="2.5"/><text x="610" y="50" fill="#4fc3f7" font-size="11">Facebook</text><line x1="430" y1="40" x2="430" y2="195" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/><text x="430" y="37" text-anchor="middle" fill="#f9a825" font-size="11">逆転</text></svg>


---

# 独占はどうやって崩れるか（2/2）

- → プラットフォームの独占は**隣接市場からの破壊で崩れる**
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">独占崩壊の3条件</text><rect x="50" y="55" width="200" height="90" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="150" y="90" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">技術の断絶</text><text x="150" y="112" text-anchor="middle" fill="white" font-size="11">ゲームチェンジャー</text><text x="150" y="130" text-anchor="middle" fill="#aaa" font-size="10">ガラケー→スマホ</text><rect x="300" y="55" width="200" height="90" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="90" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">行動様式の変化</text><text x="400" y="112" text-anchor="middle" fill="white" font-size="11">ユーザーニーズの変容</text><text x="400" y="130" text-anchor="middle" fill="#aaa" font-size="10">リアル関係→SNS重視</text><rect x="550" y="55" width="200" height="90" rx="12" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="650" y="90" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">規制の強制</text><text x="650" y="112" text-anchor="middle" fill="white" font-size="11">オープン化の義務化</text><text x="650" y="130" text-anchor="middle" fill="#aaa" font-size="10">欧州DMA等</text><line x1="150" y1="145" x2="360" y2="195" stroke="#888" stroke-width="1.5" stroke-dasharray="5,4"/><line x1="400" y1="145" x2="400" y2="195" stroke="#888" stroke-width="1.5" stroke-dasharray="5,4"/><line x1="650" y1="145" x2="440" y2="195" stroke="#888" stroke-width="1.5" stroke-dasharray="5,4"/><rect x="270" y="195" width="260" height="60" rx="10" fill="#0d0d1a" stroke="#f9a825" stroke-width="2"/><text x="400" y="222" text-anchor="middle" fill="white" font-size="13">独占の崩壊</text><text x="400" y="244" text-anchor="middle" fill="#f9a825" font-size="12">（いずれか1条件で十分）</text></svg>


---

# まとめ：ネットワーク効果の二面性

- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
-   <rect width="800" height="220" fill="#1a1a2e"/>
-   <text x="400" y="24" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">ネットワーク効果の二面性：強みと罠</text>
-   <!-- two columns -->
-   <rect x="30" y="40" width="350" height="155" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/>
-   <text x="205" y="66" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">強み（先行者優位）</text>
-   <text x="50" y="92" fill="#ccc" font-size="11" font-family="sans-serif">✓ 最強の参入障壁</text>
-   <text x="50" y="114" fill="#ccc" font-size="11" font-family="sans-serif">✓ 競合が10倍の努力をしても追いつけない</text>
-   <text x="50" y="136" fill="#ccc" font-size="11" font-family="sans-serif">✓ 転換コストを意図的に設計できる</text>
-   <text x="50" y="158" fill="#ccc" font-size="11" font-family="sans-serif">✓ 価値はn²で成長する</text>
-   <text x="50" y="180" fill="#4fc3f7" font-size="11" font-family="sans-serif">→ プラットフォームの王道戦略</text>
-   <rect x="420" y="40" width="350" height="155" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
-   <text x="595" y="66" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">罠（破壊の可能性）</text>
-   <text x="440" y="92" fill="#ccc" font-size="11" font-family="sans-serif">⚠ 隣接市場からの破壊（MySpace→FB）</text>
-   <text x="440" y="114" fill="#ccc" font-size="11" font-family="sans-serif">⚠ 技術の断絶（ガラケー→スマホ）</text>
-   <text x="440" y="136" fill="#ccc" font-size="11" font-family="sans-serif">⚠ 規制による強制オープン化（DMA）</text>
-   <text x="440" y="158" fill="#ccc" font-size="11" font-family="sans-serif">⚠ ユーザー行動様式の変化</text>
-   <text x="440" y="180" fill="#e91e63" font-size="11" font-family="sans-serif">→ いずれか1条件で崩壊</text>
- </svg>
- ✅ **ネットワーク効果は最強の参入障壁** — 後発は10倍の努力が必要
- ✅ **転換コストはプラットフォームが意図的に設計する競争阻害手段**
- ✅ **独占は「隣接市場」または「技術の断絶」で崩れる**
- ✅ **スタートアップの戦略：ネットワーク効果が弱い市場から始める**
- 
- 「勝者総取りの市場では、2位は存在しないも同然だ」

