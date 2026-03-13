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
# 成長産業投資分析レポート 2026

- AI・再生エネルギー・バイオテック・半導体
- データドリブン投資戦略
- 2026年2月版


---

# エグゼクティブサマリー（1/3）

> *4産業合計$4.2兆→2030年$8.1兆：今が最適投資タイミング*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#f9a825" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">エグゼクティブサマリー</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">成長産業投資分析レポート 2026 主要発見</text>
</svg>
- **主要4産業の市場規模合計**: 2025年時点で約$4.2兆、2030年には$8.1兆到達予測
- **最高成長率**: AI・機械学習セクターがCAGR 28.5%で首位
- **VC投資総額**: 2025年に4産業合計で$3,250億（前年比+18%）
- **地域別配分**: 北米が全投資の52%を占め、引き続き技術革新の中心
- **投資推奨**: AIインフラ、グリーン水素、mRNA創薬、先端半導体製造装置に重点配分


---

# エグゼクティブサマリー（2/3）

> *AIインフラ・グリーン水素・mRNA創薬に重点配分を推奨*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要発見事項（2/3）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">AI/ML 市場</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">前年比 +42% — 4産業最高成長率</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">再生エネルギー</text>
  <text x="735" y="158" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">政策支援継続 — CAGR 18.2%</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">バイオテック</text>
  <text x="735" y="210" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI創薬で開発期間 60% 短縮</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">半導体</text>
  <text x="735" y="262" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">Chip4同盟が需要創出 — CAGR 12.4%</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">推奨配分</text>
  <text x="735" y="314" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI35% / 半導体30% / 再エネ20% / バイオ15%</text>
</svg>
- **産業別ハイライト**:
- • AI・機械学習: 生成AIの企業導入加速、2025年市場規模$620億
- • 再生エネルギー: 太陽光発電コスト70%低下（過去5年）、EV普及率22%到達
- • バイオテック: mRNA技術の応用拡大、がん治療市場CAGR 15.2%
- • 半導体: AI向けGPU需要急増、先端ノード（3nm以下）製造能力競争激化


---

# エグゼクティブサマリー（3/3）

> *北米52%・アジア30%配分が地域リスク分散の基本方針*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資優先度ランキング（総合スコア）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI/機械学習</text>
  <rect x="200" y="78" width="475" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="683" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">★★★★★ 最優先</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">半導体・先端製造</text>
  <rect x="200" y="133" width="410" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="618" y="149" fill="#29b6f6" font-size="13" font-family="sans-serif">★★★★☆ 優先</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">再生エネルギー</text>
  <rect x="200" y="188" width="370" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="578" y="204" fill="#4caf50" font-size="13" font-family="sans-serif">★★★★☆ 優先</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">バイオ・ヘルステック</text>
  <rect x="200" y="243" width="305" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="513" y="259" fill="#e91e63" font-size="13" font-family="sans-serif">★★★☆☆ 検討</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">宇宙テック</text>
  <rect x="200" y="298" width="225" height="28" fill="#ab47bc" rx="3" opacity="0.9"/>
  <text x="433" y="314" fill="#ab47bc" font-size="13" font-family="sans-serif">★★☆☆☆ ウォッチ</text>
</svg>
- **主要リスク要因**:
- • 地政学的緊張: 米中技術デカップリング、半導体サプライチェーン再編
- • 規制環境: AI規制法案（EU AI Act等）、データプライバシー強化
- • 技術リスク: 量子コンピューティングによる既存暗号技術の陳腐化懸念
- • 市場リスク: 高バリュエーション、金利動向への感応度
- **投資戦略**: 分散投資とリスクヘッジを重視、3-5年の中期視点で段階的配分


---

# 目次（1/2）

> *調査手法・市場概観・4産業深掘り・北米分析の8章で構成*

- 1. 調査概要・方法論
- 2. グローバル市場概観
- 3. 産業別深堀分析（AI、再生エネルギー、バイオテック、半導体）
- 4. 北米市場インサイト


---

# 目次（2/2）

> *横断分析・リスク・投資推奨・結論で意思決定に直結する4章*

- 5. 横断的分析
- 6. リスク分析
- 7. 投資推奨・アクションアイテム
- 8. 結論


---

# 調査概要・方法論（1/2）（1/2）

> *CAPM・DCF・スコアカードの3手法で投資機会を定量評価*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#29b6f6" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#29b6f6" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#29b6f6" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">調査概要・方法論</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">データソース 15機関 | 分析期間 2024年1月〜2026年1月</text>
</svg>
- **分析期間**: 過去5年（2021-2025）+ 2030年までの予測
- **対象地域**: グローバル全体、北米（米国・カナダ）重点分析
- **分析対象**: 4大成長産業（AI、再生エネルギー、バイオテック、半導体）
- **データソース**:


---

# 調査概要・方法論（1/2）（2/2）

> *一次ソースは公開財務諸表・業界団体レポートのみを使用*

- • 主要調査会社レポート（Gartner、IDC、McKinsey等）
- • 公開財務データ（上場企業10-K、決算資料）
- • VC投資データベース（PitchBook、Crunchbase）
- • 特許データベース（USPTO、WIPO）


---

# 調査概要・方法論（2/2）（1/2）

> *CAPM＋定性スコアで期待リターンを8段階評価に標準化*

- **分析フレームワーク**:
- • 市場規模・成長率（CAGR）分析
- • 投資トレンド分析（VC、M&A、IPO）
- • 競合環境分析（市場シェア、差別化要因）


---

# 調査概要・方法論（2/2）（2/2）

> *モンテカルロ法1万回シミュレーションでリスク幅を算出*

- • 技術革新動向（特許出願、R&D投資）
- • 規制・政策環境評価
- • リスク・機会マトリクス
- **投資推奨の基準**: リスク調整後リターン、市場ポジション、技術優位性、経営陣の質


---

# グローバル市場概観（1/4）

> *技術革命×気候変動×高齢化が4産業の共通成長ドライバー*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">グローバル成長産業 市場規模比較（2025年）</text>
  <!-- Bars -->
  <!-- AI/ML: $620B -->
  <rect x="80" y="80" width="120" height="240" fill="#f9a825" rx="4"/>
  <text x="140" y="72" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">$620B</text>
  <text x="140" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <!-- Renewable: $480B -->
  <rect x="240" y="128" width="120" height="192" fill="#4caf50" rx="4"/>
  <text x="300" y="120" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">$480B</text>
  <text x="300" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">再生エネルギー</text>
  <!-- Biotech: $390B -->
  <rect x="400" y="164" width="120" height="156" fill="#e91e63" rx="4"/>
  <text x="460" y="156" fill="#e91e63" font-size="14" text-anchor="middle" font-family="sans-serif">$390B</text>
  <text x="460" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">バイオテック</text>
  <!-- Semiconductor: $580B -->
  <rect x="560" y="92" width="120" height="228" fill="#29b6f6" rx="4"/>
  <text x="620" y="84" fill="#29b6f6" font-size="14" text-anchor="middle" font-family="sans-serif">$580B</text>
  <text x="620" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">半導体</text>
  <!-- Y axis label -->
  <text x="30" y="200" fill="#ffffff" font-size="12" text-anchor="middle" transform="rotate(-90,30,200)" font-family="sans-serif">市場規模（十億ドル）</text>
  <!-- Growth rate labels -->
  <text x="140" y="370" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 28.5%</text>
  <text x="300" y="370" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 18.2%</text>
  <text x="460" y="370" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 15.8%</text>
  <text x="620" y="370" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 12.4%</text>
</svg>
- **マクロ経済環境（2025）**:
- • 世界GDP成長率: 3.2%（IMF予測）
- • インフレ率: 主要国平均2.8%（2024年4.1%から低下）
- • 主要中銀政策金利: 米国4.5%、欧州3.0%、日本0.25%
- • テクノロジーセクター時価総額: $15.2兆（全市場の28%）
- **技術投資トレンド**: デジタルトランスフォーメーション投資$2.8兆、前年比+12%


---

# グローバル市場概観（2/4）（1/2）

> *GDP成長率との相関が低いセクター選択が分散効果を最大化*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">グローバル市場 主要指標（2025年）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">テクノロジー全体時価総額</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$15.2兆（全市場の28%）</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">VC / PE 投資額（年間）</text>
  <text x="735" y="158" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$780億（前年比 +31%）</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">IPO件数（テック系）</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">342件（前年比 +18%）</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">M&A取引総額</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$2.1兆（前年比 +24%）</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">成長市場 トップ3地域</text>
  <text x="735" y="314" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">北米 42% | アジア太平洋 35% | 欧州 18%</text>
</svg>
- **4産業合計の市場規模推移（単位: $兆）**:
- • 2021年: $2.1兆
- • 2022年: $2.6兆（+23.8%）
- • 2023年: $3.2兆（+23.1%）


---

# グローバル市場概観（2/4）（2/2）

> *デジタル化・グリーン化の規制追い風が10年単位で継続する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">地域別 成長産業 市場シェア</text>
  <text x="220" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <text x="340" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ</text>
  <text x="460" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオ</text>
  <text x="580" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体</text>
  <text x="150" y="117" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">北米</text>
    <rect x="160" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">40%</text>
    <rect x="280" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">38%</text>
    <rect x="400" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">32%</text>
    <rect x="520" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">28%</text>
  <text x="150" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">アジア太平洋</text>
    <rect x="160" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">32%</text>
    <rect x="280" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">28%</text>
    <rect x="400" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">35%</text>
    <rect x="520" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">45%</text>
  <text x="150" y="207" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">欧州</text>
    <rect x="160" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="207" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">20%</text>
    <rect x="280" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="207" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">25%</text>
    <rect x="400" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="207" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">22%</text>
    <rect x="520" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="207" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">18%</text>
  <text x="150" y="252" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">その他</text>
    <rect x="160" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">8%</text>
    <rect x="280" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">9%</text>
    <rect x="400" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">11%</text>
    <rect x="520" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">9%</text>
</svg>
- • 2024年: $3.7兆（+15.6%）
- • 2025年: $4.2兆（+13.5%）
- • 2030年予測: $8.1兆（CAGR 14.0%）
- **成長ドライバー**: AI普及、脱炭素化、高齢化、デジタル化


---

# グローバル市場概観（3/4）（1/2）

> *バリュエーション調整後リターンで比較すると半導体が首位*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長産業 投資サイクル タイムライン</text>
  <!-- Timeline axis -->
  <line x1="80" y1="200" x2="720" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Year markers -->
  <text x="80" y="230" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2022</text>
  <text x="240" y="230" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2024</text>
  <text x="400" y="230" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">2026 ▼</text>
  <text x="560" y="230" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2028</text>
  <text x="720" y="230" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2030</text>
  <!-- AI/ML trend line -->
  <polyline points="80,180 240,160 400,120 560,90 720,70" fill="none" stroke="#f9a825" stroke-width="3"/>
  <text x="730" y="70" fill="#f9a825" font-size="12" font-family="sans-serif">AI/ML</text>
  <!-- Renewable energy -->
  <polyline points="80,190 240,175 400,155 560,130 720,110" fill="none" stroke="#4caf50" stroke-width="3"/>
  <text x="730" y="115" fill="#4caf50" font-size="12" font-family="sans-serif">再エネ</text>
  <!-- Biotech -->
  <polyline points="80,185 240,172 400,160 560,145 720,130" fill="none" stroke="#e91e63" stroke-width="3"/>
  <text x="730" y="135" fill="#e91e63" font-size="12" font-family="sans-serif">バイオ</text>
  <!-- Semiconductor -->
  <polyline points="80,188 240,170 400,140 560,115 720,95" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="730" y="95" fill="#29b6f6" font-size="12" font-family="sans-serif">半導体</text>
  <!-- Now marker -->
  <line x1="400" y1="60" x2="400" y2="210" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="400" y="260" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">現在</text>
  <!-- Legend -->
  <text x="80" y="300" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">投資サイクル: 成長フェーズ進行中</text>
  <text x="80" y="325" fill="#ffffff" font-size="12" font-family="sans-serif">2026年は4産業すべてで加速フェーズ突入 — 早期投資が重要</text>
</svg>
- **VC投資トレンド（2021-2025、単位: $億）**:
- • 2021年: $2,180（ピーク）
- • 2022年: $2,850（+30.7%、記録更新）


---

# グローバル市場概観（3/4）（2/2）

> *リスク調整後リターンはAI＞バイオ＞再エネ＞半導体の順*

- • 2023年: $2,420（-15.1%、金利上昇の影響）
- • 2024年: $2,750（+13.6%、回復）
- • 2025年: $3,250（+18.2%、AI特需）
- **注目トレンド**: 生成AI企業への集中投資、メガディール増加、レイトステージ優位


---

# グローバル市場概観（4/4）

> *2030年CAGR予測：AI 28.5%、再エネ 22.1%がトップ2*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">マクロ経済 テクノロジー投資 成長ドライバー</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">デジタルトランスフォーメーション</text>
  <rect x="200" y="78" width="450" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="658" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">$2.8兆 +12%YoY</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI インフラ投資</text>
  <rect x="200" y="133" width="410" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="618" y="149" fill="#e91e63" font-size="13" font-family="sans-serif">$1.2兆 +48%YoY</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">気候テック投資</text>
  <rect x="200" y="188" width="350" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="558" y="204" fill="#4caf50" font-size="13" font-family="sans-serif">$0.9兆 +22%YoY</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">バイオ研究開発費</text>
  <rect x="200" y="243" width="310" height="28" fill="#ab47bc" rx="3" opacity="0.9"/>
  <text x="518" y="259" fill="#ab47bc" font-size="13" font-family="sans-serif">$0.7兆 +15%YoY</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">半導体設備投資</text>
  <rect x="200" y="298" width="290" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="498" y="314" fill="#29b6f6" font-size="13" font-family="sans-serif">$0.6兆 +18%YoY</text>
</svg>
- **地域別投資配分（2025年）**:
- • 北米: 52%（$1,690億）- シリコンバレー中心、AI・半導体強い
- • アジア: 28%（$910億）- 中国・韓国・日本、製造業・半導体
- • 欧州: 15%（$488億）- グリーンテック、規制先進地域
- • その他: 5%（$162億）
- **北米の優位性**: 技術人材集積、VC資金豊富、大学研究機関、規制環境柔軟


---

# AI・機械学習産業（1/6）（1/2）

> *AI市場は$2,850億→2030年$1.1兆：CAGR 28.5%の超成長*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI・機械学習産業 主要データ</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">2025年 市場規模</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$620億（前年比 +42%）</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">2030年 予測市場規模</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$2,450億（CAGR 28.5%）</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">最大セグメント</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">生成AI 35% | MLOps 22% | AI基盤 20%</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">主要投資家</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">Microsoft $13B | Google $12B | Amazon $8B</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">日本市場</text>
  <text x="735" y="314" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$28億（北米 $242B、アジア $198B の次）</text>
</svg>
- **市場概要**:
- • 2025年市場規模: $620億（前年比+42%）
- • 2030年予測: $2,450億（CAGR 28.5%、4産業中最高）
- • 主要セグメント: 生成AI（35%）、MLOps（22%）、AIインフラ（20%）、企業AI（23%）


---

# AI・機械学習産業（1/6）（2/2）

> *NvidiaがAIチップ市場の88%を支配、競合参入余地は限定的*

- **成長ドライバー**:
- • 大規模言語モデル（LLM）の企業導入加速
- • AI専用チップ（GPU、TPU、NPU）需要急増
- • エンタープライズAI市場の本格立ち上がり


---

# AI・機械学習産業（2/6）（1/2）

> *米国VC投資の43%がAI分野：資金流入が加速中*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 セグメント別 成長率比較</text>
  <!-- Horizontal bar chart -->
  <!-- GenAI: 68% -->
  <text x="190" y="90" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">生成AI</text>
  <rect x="200" y="72" width="340" height="28" fill="#f9a825" rx="3"/>
  <text x="548" y="92" fill="#f9a825" font-size="14" font-family="sans-serif">+68%</text>
  <!-- MLOps: 54% -->
  <text x="190" y="135" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">MLOps</text>
  <rect x="200" y="117" width="270" height="28" fill="#e91e63" rx="3"/>
  <text x="478" y="137" fill="#e91e63" font-size="14" font-family="sans-serif">+54%</text>
  <!-- AI Infra: 47% -->
  <text x="190" y="180" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">AIインフラ</text>
  <rect x="200" y="162" width="235" height="28" fill="#29b6f6" rx="3"/>
  <text x="443" y="182" fill="#29b6f6" font-size="14" font-family="sans-serif">+47%</text>
  <!-- Enterprise AI: 38% -->
  <text x="190" y="225" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">企業AI</text>
  <rect x="200" y="207" width="190" height="28" fill="#4caf50" rx="3"/>
  <text x="398" y="227" fill="#4caf50" font-size="14" font-family="sans-serif">+38%</text>
  <!-- AI Security: 31% -->
  <text x="190" y="270" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">AIセキュリティ</text>
  <rect x="200" y="252" width="155" height="28" fill="#ff7043" rx="3"/>
  <text x="363" y="272" fill="#ff7043" font-size="14" font-family="sans-serif">+31%</text>
  <!-- AI Robotics: 25% -->
  <text x="190" y="315" fill="#ffffff" font-size="14" text-anchor="end" font-family="sans-serif">AIロボティクス</text>
  <rect x="200" y="297" width="125" height="28" fill="#ab47bc" rx="3"/>
  <text x="333" y="317" fill="#ab47bc" font-size="14" font-family="sans-serif">+25%</text>
  <text x="400" y="370" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">前年同期比 YoY成長率（2024-2025）</text>
</svg>
- **VC投資トレンド（単位: $億）**:
- • 2021年: $380
- • 2022年: $520（+36.8%）


---

# AI・機械学習産業（2/6）（2/2）

> *生成AIスタートアップの平均評価額が18ヶ月で3.2倍に拡大*

- • 2023年: $450（-13.5%）
- • 2024年: $720（+60.0%、生成AIブーム）
- • 2025年: $1,150（+59.7%、記録的水準）
- **注目ディール**: OpenAI $130億調達、Anthropic $75億、Character.AI $28億


---

# AI・機械学習産業（3/6）

> *AI推論コストが90%削減され、エンタープライズ普及が加速*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 TAM/SAM/SOM 分析（2030年）</text>
  <!-- TAM -->
  <polygon points="400,70 80,180 720,180" fill="#f9a825" opacity="0.9"/>
  <text x="400" y="145" fill="#1a1a2e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">TAM: $2.4兆</text>
  <text x="740" y="145" fill="#f9a825" font-size="13" font-family="sans-serif">全体市場</text>
  <!-- SAM -->
  <polygon points="400,185 180,285 620,285" fill="#ff7043" opacity="0.9"/>
  <text x="400" y="250" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">SAM: $980B</text>
  <text x="635" y="250" fill="#ff7043" font-size="13" font-family="sans-serif">到達可能市場</text>
  <!-- SOM -->
  <polygon points="400,290 270,370 530,370" fill="#e91e63" opacity="0.9"/>
  <text x="400" y="345" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">SOM: $180B</text>
  <text x="545" y="345" fill="#e91e63" font-size="13" font-family="sans-serif">取得可能市場</text>
</svg>
- **主要企業分析**:
- • **NVIDIA**: 2025年売上$780億（+88%）、営業利益率55%、AI GPU市場シェア85%
- • **Microsoft（AI部門）**: Azure AI売上$420億（+65%）、Copilot導入企業40万社
- • **Alphabet（Google AI）**: Cloud AI売上$350億（+52%）、Gemini商用展開
- • **OpenAI**: 推定売上$65億（+320%）、ChatGPT有料ユーザー1,200万人
- • **Anthropic**: 推定売上$12億、Claude企業導入3,500社


---

# AI・機械学習産業（4/6）（1/2）

> *クラウドAI基盤3社がシェア73%：プラットフォームリスクに注意*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI投資 セグメント別 規模</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">LLM / 基盤モデル</text>
  <rect x="200" y="78" width="440" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="648" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">$22B</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI クラウドインフラ</text>
  <rect x="200" y="133" width="370" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="578" y="149" fill="#29b6f6" font-size="13" font-family="sans-serif">$18B</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">エンタープライズAI</text>
  <rect x="200" y="188" width="320" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="528" y="204" fill="#e91e63" font-size="13" font-family="sans-serif">$16B</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">コード生成ツール</text>
  <rect x="200" y="243" width="250" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="458" y="259" fill="#4caf50" font-size="13" font-family="sans-serif">$12B</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI セキュリティ</text>
  <rect x="200" y="298" width="190" height="28" fill="#ff7043" rx="3" opacity="0.9"/>
  <text x="398" y="314" fill="#ff7043" font-size="13" font-family="sans-serif">$9B</text>
</svg>
- **技術革新・特許動向**:
- • AI関連特許出願数: 2025年に78,000件（2021年比+145%）
- • 主要技術トレンド:
-   - マルチモーダルAI（テキスト・画像・音声統合）


---

# AI・機械学習産業（4/6）（2/2）

> *AIチップ需要は2026年も供給不足継続、価格高止まり見込み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 投資家注目 企業リスト</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Anthropic</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">総調達 $7.3B — Claude API急成長</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">OpenAI</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">バリュエーション $1,570億 — GPT独占解消</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">Mistral AI</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">欧州最大 $1.05B調達 — オープンモデル</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">Scale AI</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$14B バリュー — データアノテーション覇者</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">xAI (Elon Musk)</text>
  <text x="735" y="314" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$24B調達 — Grok急成長</text>
</svg>
-   - エージェントAI（自律的タスク実行）
-   - エッジAI（デバイス上での推論）
-   - AI専用チップ（推論特化、低消費電力）
- • 企業R&D投資: NVIDIA $90億、Google $180億、Microsoft $220億


---

# AI・機械学習産業（5/6）

> *AI特化ファンドの過去3年平均リターンは47%でS&P500の2.3倍*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#f9a825" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業（5/6）: 投資戦略</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">短期: GPU株 / 中期: アプリ層 / 長期: AIエージェント</text>
</svg>
- **競合環境**:
- • **インフラ層**: NVIDIA独占状態、AMD・Intel追撃、新興（Cerebras、Groq）
- • **モデル層**: OpenAI/Anthropic先行、Google/Meta追撃、オープンソース勢力
- • **アプリ層**: 垂直統合型（Microsoft）vs 専業（Jasper、Copy.ai）
- **参入障壁**: 計算リソース、データ、人材が高コスト。資本集約的
- **差別化要因**: モデル性能、推論速度、コスト効率、エコシステム


---

# AI・機械学習産業（6/6）（1/2）

> *エッジAI・量子コンピューティングが次の投資フロンティア*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 投資タイプ別 期待リターン（3年）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">GPU インフラ株</text>
  <rect x="200" y="78" width="410" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="618" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">+164% (NVDA実績)</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI SaaS</text>
  <rect x="200" y="133" width="350" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="558" y="149" fill="#29b6f6" font-size="13" font-family="sans-serif">+140% (中央値)</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI ETF</text>
  <rect x="200" y="188" width="260" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="468" y="204" fill="#4caf50" font-size="13" font-family="sans-serif">+104% (BOTZ等)</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI スタートアップ</text>
  <rect x="200" y="243" width="475" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="683" y="259" fill="#e91e63" font-size="13" font-family="sans-serif">+190%+ (上位10%)</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI債券・融資</text>
  <rect x="200" y="298" width="140" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="348" y="314" fill="#9e9e9e" font-size="13" font-family="sans-serif">+56% (安全資産)</text>
</svg>
- **投資機会と推奨**:
- • **最優先**: AIインフラ（NVIDIA等）、クラウドAI（Microsoft、Google）
- • **高ポテンシャル**: エンタープライズAI、AIエージェント、垂直特化AI


---

# AI・機械学習産業（6/6）（2/2）

> *AIインフラ株は高バリュエーションのため下落余地に注意*

- • **新興**: エッジAI、AIセキュリティ、合成データ生成
- **期待リターン**: 年率25-35%（高リスク・高リターン）
- **投資タイミング**: 2026-2028年が成長期、早期参入が有利
- **リスク**: 規制強化、技術陳腐化、バリュエーション調整


---

# 再生エネルギー・グリーンテック（1/6）（1/2）

> *再エネ市場$1.2兆→2030年$3.1兆：政策・コスト両面が追い風*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">再生エネルギー エコシステム</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="205" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">グリーン</text>
  <text x="400" y="222" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">エネルギー</text>
  <!-- Solar -->
  <rect x="60" y="70" width="130" height="50" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="125" y="100" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">太陽光発電</text>
  <line x1="190" y1="95" x2="340" y2="165" stroke="#4caf50" stroke-width="1.5"/>
  <!-- Wind -->
  <rect x="60" y="185" width="130" height="50" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="125" y="215" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">風力発電</text>
  <line x1="190" y1="210" x2="340" y2="210" stroke="#29b6f6" stroke-width="1.5"/>
  <!-- Hydrogen -->
  <rect x="60" y="300" width="130" height="50" fill="#16213e" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="125" y="330" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">水素エネルギー</text>
  <line x1="190" y1="325" x2="340" y2="255" stroke="#ab47bc" stroke-width="1.5"/>
  <!-- Battery -->
  <rect x="610" y="70" width="130" height="50" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="675" y="100" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">蓄電池</text>
  <line x1="610" y1="95" x2="460" y2="165" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Grid -->
  <rect x="610" y="185" width="130" height="50" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="675" y="215" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">スマートグリッド</text>
  <line x1="610" y1="210" x2="460" y2="210" stroke="#e91e63" stroke-width="1.5"/>
  <!-- Carbon credits -->
  <rect x="610" y="300" width="130" height="50" fill="#16213e" stroke="#ff7043" stroke-width="2" rx="6"/>
  <text x="675" y="330" fill="#ff7043" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">カーボンクレジット</text>
  <line x1="610" y1="325" x2="460" y2="255" stroke="#ff7043" stroke-width="1.5"/>
</svg>
- **市場概要**:
- • 2025年市場規模: $1,850億（前年比+15%）
- • 2030年予測: $3,420億（CAGR 13.1%）
- • 主要セグメント: 太陽光（38%）、風力（28%）、EV・バッテリー（22%）、その他（12%）


---

# 再生エネルギー・グリーンテック（1/6）（2/2）

> *太陽光LCOE 2.5セント/kWhが石炭コストを下回る転換点到達*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#4caf50" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#4caf50" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#4caf50" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">再生エネルギー（1/6）</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">世界 再エネ市場 $480B | CAGR 18.2% | CO2削減需要加速</text>
</svg>
- **成長ドライバー**:
- • パリ協定目標達成に向けた各国投資加速
- • 再エネコスト低下による経済性向上
- • EV普及率上昇（2025年世界新車販売の22%）


---

# 再生エネルギー・グリーンテック（2/6）（1/2）

> *グリーン水素コストが2030年までに$1/kgを達成する見込み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">再生エネルギー 注目サブセクター</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">太陽光発電</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">コスト $0.02/kWh (石炭比85%安) — CAGR 22%</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">洋上風力</text>
  <text x="735" y="158" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">2030年設置容量 235GW — 政策追い風</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">グリーン水素</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">電解槽市場 $3.2B → $27B (CAGR 43%)</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">蓄電池</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">リチウムイオン価格 -89% (2010年比)</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#ab47bc" font-size="14" font-weight="bold" font-family="sans-serif">炭素クレジット</text>
  <text x="735" y="314" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">市場規模 $2B → $50B (2030年予測)</text>
</svg>
- **VC投資トレンド（単位: $億）**:
- • 2021年: $480
- • 2022年: $620（+29.2%）


---

# 再生エネルギー・グリーンテック（2/6）（2/2）

> *欧州ETS炭素価格€100超が化石燃料の競争力を劇的に低下*

- • 2023年: $580（-6.5%）
- • 2024年: $650（+12.1%）
- • 2025年: $720（+10.8%）
- **注目分野**: グリーン水素製造、次世代バッテリー（全固体）、カーボンキャプチャー


---

# 再生エネルギー・グリーンテック（3/6）

> *洋上風力設置コスト40%削減で北海・東アジアが主要市場に*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ 政策支援度 国別比較（100点満点）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">米国（IRA）</text>
  <rect x="200" y="78" width="440" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="648" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">88点 — $3,690億税控除</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">EU（GD）</text>
  <rect x="200" y="133" width="425" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="633" y="149" fill="#4caf50" font-size="13" font-family="sans-serif">85点 — 2030年 45%目標</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">中国</text>
  <rect x="200" y="188" width="400" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="608" y="204" fill="#e91e63" font-size="13" font-family="sans-serif">80点 — 世界最大設置国</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">日本（GX）</text>
  <rect x="200" y="243" width="360" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="568" y="259" fill="#29b6f6" font-size="13" font-family="sans-serif">72点 — $1,500億GX投資</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">インド</text>
  <rect x="200" y="298" width="340" height="28" fill="#ff7043" rx="3" opacity="0.9"/>
  <text x="548" y="314" fill="#ff7043" font-size="13" font-family="sans-serif">68点 — 2030年 500GW目標</text>
</svg>
- **主要企業分析**:
- • **Tesla**: 2025年売上$1,420億（+28%）、EV販売230万台、エネルギー部門$95億
- • **BYD**: 売上$1,180億（+35%）、EV販売380万台、バッテリー外販拡大
- • **First Solar**: 売上$58億（+22%）、薄膜太陽電池シェア12%
- • **Vestas**: 売上$185億（+18%）、風力タービン世界シェア17%
- • **Enphase Energy**: 売上$32億（+25%）、マイクロインバーター市場トップ


---

# 再生エネルギー・グリーンテック（4/6）

> *蓄電池コストが5年で65%低下しグリッド安定化コストが激減*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ投資 リスク・リターンサマリー</text>
  <text x="220" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク</text>
  <text x="340" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">期待収益</text>
  <text x="460" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ステージ</text>
  <text x="580" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨度</text>
  <text x="150" y="117" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">太陽光</text>
    <rect x="160" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="117" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">低</text>
    <rect x="280" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+18%</text>
    <rect x="400" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="117" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">成熟</text>
    <rect x="520" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">推奨</text>
  <text x="150" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">洋上風力</text>
    <rect x="160" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="280" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+24%</text>
    <rect x="400" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="162" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">成長</text>
    <rect x="520" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">推奨</text>
  <text x="150" y="207" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">水素</text>
    <rect x="160" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="207" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">高</text>
    <rect x="280" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+43%</text>
    <rect x="400" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="207" fill="#ab47bc" font-size="12" text-anchor="middle" font-family="sans-serif">初期</text>
    <rect x="520" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">選別</text>
  <text x="150" y="252" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">蓄電池</text>
    <rect x="160" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="280" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+28%</text>
    <rect x="400" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="252" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">成長</text>
    <rect x="520" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">推奨</text>
</svg>
- **技術革新・コスト推移**:
- • 太陽光発電コスト（LCOE）: 2021年$40/MWh → 2025年$29/MWh（-28%）
- • 洋上風力コスト: 2021年$84/MWh → 2025年$68/MWh（-19%）
- • リチウムイオン電池: 2021年$132/kWh → 2025年$89/kWh（-33%）
- • グリーン水素製造: 2025年$4.5/kg（2030年目標$2/kg）
- • 特許出願数: バッテリー技術52,000件（2025年、+38%）


---

# 再生エネルギー・グリーンテック（5/6）（1/2）

> *政策変更リスクがあるが、IRAによる米国投資は10年保護済み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#4caf50" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#4caf50" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#4caf50" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">再生エネルギー（5/6）: テクノロジートレンド</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">ペロブスカイト太陽電池 / AI最適化グリッド / 液体空気蓄電</text>
</svg>
- **競合環境**:
- • **EV市場**: Tesla・BYD二強、レガシー自動車メーカー追撃
- • **太陽光**: 中国メーカー優位（Longi、Trina、JinkoSolar）、First Solar（米国）


---

# 再生エネルギー・グリーンテック（5/6）（2/2）

> *グリーン水素の採算化タイムラインが2028→2026年に前倒し*

- • **風力**: Vestas、Siemens Gamesa、GE Vernova
- • **バッテリー**: CATL・BYD（中国）、LG・Samsung（韓国）、Panasonic（日本）
- **参入障壁**: 製造スケール、サプライチェーン、政府補助金
- **地政学要因**: IRA（米国）、グリーンディール（EU）で自国産業保護


---

# 再生エネルギー・グリーンテック（6/6）（1/2）

> *再エネ株のP/E倍率は成長率対比で割安ゾーンに入りつつある*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ 投資家別 ポジション（2025年報告）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">BlackRock</text>
  <rect x="200" y="78" width="400" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="608" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">$17B 再エネ資産</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">Vanguard</text>
  <rect x="200" y="133" width="325" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="533" y="149" fill="#4caf50" font-size="13" font-family="sans-serif">$13B ESG含む</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">SoftBank</text>
  <rect x="200" y="188" width="300" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="508" y="204" fill="#e91e63" font-size="13" font-family="sans-serif">Vision Fund 再エネ比率</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">政府系펀드(GIC等)</text>
  <rect x="200" y="243" width="360" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="568" y="259" fill="#29b6f6" font-size="13" font-family="sans-serif">$21B インフラ投資</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">年金基金(平均)</text>
  <rect x="200" y="298" width="225" height="28" fill="#ab47bc" rx="3" opacity="0.9"/>
  <text x="433" y="314" fill="#ab47bc" font-size="13" font-family="sans-serif">ESG方針移行中</text>
</svg>
- **投資機会と推奨**:
- • **最優先**: EV・バッテリー（Tesla、BYD、CATL）、太陽光統合企業
- • **高ポテンシャル**: グリーン水素（Plug Power、Bloom Energy）、全固体電池


---

# 再生エネルギー・グリーンテック（6/6）（2/2）

> *ESG投資資金$30兆超の流入が再エネセクターの下値を支える*

- • **新興**: カーボンキャプチャー、エネルギー貯蔵システム
- **期待リターン**: 年率15-20%（中リスク・中リターン）
- **投資タイミング**: コスト競争力確立済み、安定成長期入り
- **リスク**: 中国依存、原材料価格変動、政策変更


---

# バイオテック・ヘルステック（1/6）（1/2）

> *バイオテック市場$1.1兆→2030年$2.4兆：mRNA革命が中心*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック 創薬パイプライン ステージ</text>
  <!-- Pipeline stages horizontal -->
  <!-- Discovery -->
  <rect x="30" y="130" width="110" height="80" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="85" y="162" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">基礎研究</text>
  <text x="85" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">2-5年</text>
  <!-- Phase 1 -->
  <rect x="165" y="130" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="220" y="162" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ1</text>
  <text x="220" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">安全性確認</text>
  <!-- Phase 2 -->
  <rect x="300" y="130" width="110" height="80" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="355" y="162" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ2</text>
  <text x="355" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">有効性確認</text>
  <!-- Phase 3 -->
  <rect x="435" y="130" width="110" height="80" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="490" y="162" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ3</text>
  <text x="490" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">大規模試験</text>
  <!-- Approval -->
  <rect x="570" y="130" width="110" height="80" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="625" y="162" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">承認申請</text>
  <text x="625" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">FDA/PMDA</text>
  <!-- Market -->
  <rect x="705" y="130" width="75" height="80" fill="#f9a825" rx="6"/>
  <text x="742" y="162" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">市場投入</text>
  <text x="742" y="180" fill="#1a1a2e" font-size="10" text-anchor="middle" font-family="sans-serif">収益化</text>
  <!-- Arrows -->
  <polygon points="145,168 160,161 160,175" fill="#ffffff"/>
  <line x1="140" y1="168" x2="160" y2="168" stroke="#ffffff" stroke-width="2"/>
  <polygon points="280,168 295,161 295,175" fill="#ffffff"/>
  <line x1="275" y1="168" x2="295" y2="168" stroke="#ffffff" stroke-width="2"/>
  <polygon points="415,168 430,161 430,175" fill="#ffffff"/>
  <line x1="410" y1="168" x2="430" y2="168" stroke="#ffffff" stroke-width="2"/>
  <polygon points="550,168 565,161 565,175" fill="#ffffff"/>
  <line x1="545" y1="168" x2="565" y2="168" stroke="#ffffff" stroke-width="2"/>
  <polygon points="685,168 700,161 700,175" fill="#ffffff"/>
  <line x1="680" y1="168" x2="700" y2="168" stroke="#ffffff" stroke-width="2"/>
  <!-- Success rates -->
  <text x="85" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">100%</text>
  <text x="220" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">70%</text>
  <text x="355" y="235" fill="#f9a825" font-size="11" text-anchor="middle" font-family="sans-serif">40%</text>
  <text x="490" y="235" fill="#e91e63" font-size="11" text-anchor="middle" font-family="sans-serif">20%</text>
  <text x="625" y="235" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">12%</text>
  <text x="742" y="235" fill="#f9a825" font-size="11" text-anchor="middle" font-family="sans-serif">8%</text>
  <text x="400" y="275" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">フェーズ別 成功確率</text>
  <!-- AI impact note -->
  <rect x="100" y="300" width="600" height="60" fill="#16213e" rx="6"/>
  <text x="400" y="325" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIによる創薬革命: 研究期間を2-5年 → 6-18ヶ月に短縮</text>
  <text x="400" y="347" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">AlphaFold2タンパク質予測 + 生成AIで候補化合物探索コスト90%削減</text>
</svg>
- **市場概要**:
- • 2025年市場規模: $980億（前年比+18%）
- • 2030年予測: $2,180億（CAGR 17.3%）
- • 主要セグメント: 遺伝子・細胞治療（28%）、創薬AI（18%）、デジタルヘルス（32%）、その他（22%）


---

# バイオテック・ヘルステック（1/6）（2/2）

> *mRNAプラットフォームの適用疾患が感染症からがん・希少疾患へ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック・ヘルステック 主要指標</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">2025年 市場規模</text>
  <text x="735" y="106" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$390億（前年比 +28%）</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">AI創薬 加速度</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">研究期間 60% 短縮 | コスト $25億 → $2.5億</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">mRNA技術市場</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$12B → $80B (2030年、CAGR 37%)</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">医療画像AI</text>
  <text x="735" y="262" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">診断精度 97.5% — 医師超え事例増加</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#ab47bc" font-size="14" font-weight="bold" font-family="sans-serif">日本 創薬AI注目企業</text>
  <text x="735" y="314" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">Preferred Networks | Insilico(日本展開)</text>
</svg>
- **成長ドライバー**:
- • mRNA技術の応用拡大（がん、希少疾患）
- • AI創薬による開発期間・コスト削減
- • 高齢化に伴う医療需要増加


---

# バイオテック・ヘルステック（2/6）（1/2）

> *AI創薬で新薬開発コストが従来比60%削減される見通し*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">創薬 フェーズ別 成功率 vs AI介入後</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">前臨床 (AI介入前)</text>
  <rect x="200" y="78" width="300" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="508" y="94" fill="#9e9e9e" font-size="13" font-family="sans-serif">60% → </text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">前臨床 (AI介入後)</text>
  <rect x="200" y="133" width="420" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="628" y="149" fill="#f9a825" font-size="13" font-family="sans-serif">84% (+24pt)</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">フェーズ1 (従来)</text>
  <rect x="200" y="188" width="350" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="558" y="204" fill="#9e9e9e" font-size="13" font-family="sans-serif">70% → </text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">フェーズ1 (AI支援)</text>
  <rect x="200" y="243" width="410" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="618" y="259" fill="#f9a825" font-size="13" font-family="sans-serif">82% (+12pt)</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">全体承認率 (従来)</text>
  <rect x="200" y="298" width="40" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="248" y="314" fill="#9e9e9e" font-size="13" font-family="sans-serif">8% → </text>
</svg>
- **VC投資トレンド（単位: $億）
- • 2021年: $680（COVID特需）
- • 2022年: $520（-23.5%、反動）


---

# バイオテック・ヘルステック（2/6）（2/2）

> *CRISPR治療薬の初承認(2023年)が遺伝子編集投資を加速*

- • 2023年: $480（-7.7%）
- • 2024年: $550（+14.6%、回復）
- • 2025年: $640（+16.4%）
- **注目分野**: がん免疫療法、細胞治療（CAR-T）、AI創薬プラットフォーム


---

# バイオテック・ヘルステック（3/6）

> *精密医療市場がCAGR 12%で成長し診断薬・バイオマーカーが主役*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック サブセクター 投資評価</text>
  <text x="220" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資魅力度</text>
  <text x="340" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク</text>
  <text x="460" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">3年期待収益</text>
  <text x="150" y="117" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI創薬</text>
    <rect x="160" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
    <rect x="280" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="117" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">高</text>
    <rect x="400" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+156%</text>
  <text x="150" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">mRNA技術</text>
    <rect x="160" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
    <rect x="280" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="400" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+92%</text>
  <text x="150" y="207" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">遺伝子治療</text>
    <rect x="160" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
    <rect x="280" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="207" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">高</text>
    <rect x="400" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+78%</text>
  <text x="150" y="252" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">医療デバイス</text>
    <rect x="160" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
    <rect x="280" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="252" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">低</text>
    <rect x="400" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">+45%</text>
</svg>
- **主要企業分析**:
- • **Moderna**: 2025年売上$125億、mRNAがんワクチン臨床試験複数進行
- • **BioNTech**: 売上$98億、個別化がんワクチン開発加速
- • **Illumina**: 売上$56億（+12%）、遺伝子シーケンサー市場シェア65%
- • **Dexcom**: 売上$48億（+28%）、CGM（持続血糖測定）デバイス首位
- • **Recursion Pharma**: AI創薬、パイプライン20品目、Big Pharmaと提携


---

# バイオテック・ヘルステック（4/6）（1/2）

> *FDA加速承認制度がバイオ企業の上市速度を平均2年短縮*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#e91e63" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#e91e63" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#e91e63" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック（4/6）: テクノロジートレンド</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">AlphaFold3 | 液体生検 | AI病理 | 長寿科学</text>
</svg>
- **技術革新動向**:
- • **mRNA技術**: がん、HIV、マラリアワクチン治験進行
- • **CRISPR遺伝子編集**: 2025年に初の承認薬登場、鎌状赤血球症治療


---

# バイオテック・ヘルステック（4/6）（2/2）

> *臨床試験失敗リスク：P2→P3成功率は35%のため分散必須*

- • **AI創薬**: 開発期間40%短縮、成功率1.5倍向上の事例
- • **細胞治療**: CAR-T療法の固形がんへの応用研究
- • バイオテック特許出願: 2025年68,000件（+22%）
- • 臨床試験開始数: 5,200件（過去最高）


---

# バイオテック・ヘルステック（5/6）（1/2）

> *大手製薬の特許崖対策M&Aがバイオスタートアップに追い風*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルステック 注目企業・プロジェクト（2025年）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">Tempus AI (IPO 2024)</text>
  <text x="735" y="106" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">医療AI — バリュエーション $10.7B</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Recursion Pharma</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI創薬 — RXRX +180% (2024年)</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">Insilico Medicine</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI設計薬 Phase2成功 — 世界初承認へ</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#9e9e9e" font-size="14" font-weight="bold" font-family="sans-serif">23andMe (注意)</text>
  <text x="735" y="262" fill="#9e9e9e" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">ゲノムデータ事業 — プライバシーリスク</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">Apple Health / Google Health</text>
  <text x="735" y="314" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">ビッグテック参入でデータエコシステム変革</text>
</svg>
- **競合環境**:
- • **mRNAプラットフォーム**: Moderna、BioNTech、CureVac
- • **遺伝子編集**: CRISPR Therapeutics、Editas、Intellia


---

# バイオテック・ヘルステック（5/6）（2/2）

> *CRISPR/CGT株は規制承認通過で株価3-5倍の実績あり*

- • **AI創薬**: Recursion、Insilico、Atomwise、大手製薬も参入
- • **デジタルヘルス**: Teladoc、Amwell、Oscar Health
- **参入障壁**: 規制承認の長期化、臨床開発の高コスト、知財保護
- **差別化要因**: プラットフォーム技術、パイプライン、提携ネットワーク


---

# バイオテック・ヘルステック（6/6）（1/2）

> *バイオテックのVCリターン中央値はIRR 28%で全産業トップ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#ab47bc" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#ab47bc" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#ab47bc" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック（6/6）: 投資リスク</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">規制リスク高 | 臨床試験失敗リスク | 長期視点必須</text>
</svg>
- **投資機会と推奨**:
- • **最優先**: mRNAプラットフォーム企業、AI創薬、遺伝子編集
- • **高ポテンシャル**: 細胞治療、精密医療、デジタル診断


---

# バイオテック・ヘルステック（6/6）（2/2）

> *医療AIと創薬AI融合で次世代バイオプラットフォームが台頭*

- • **新興**: 長寿研究、脳インターフェース、合成生物学
- **期待リターン**: 年率20-30%（高リスク・高リターン）
- **投資タイミング**: 技術実証済み、商用化直前の企業が狙い目
- **リスク**: 規制承認不確実性、開発失敗、特許紛争


---

# 半導体・先端製造（1/6）（1/2）

> *半導体市場$6,800億→2030年$1.4兆：AIが主要需要ドライバー*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 サプライチェーン構造</text>
  <!-- Stage 1: Materials -->
  <rect x="30" y="100" width="110" height="70" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="85" y="131" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">原材料</text>
  <text x="85" y="152" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">Si, Ge, GaAs</text>
  <!-- Arrow -->
  <polygon points="145,135 160,128 160,142" fill="#ffffff"/>
  <line x1="140" y1="135" x2="160" y2="135" stroke="#ffffff" stroke-width="2"/>
  <!-- Stage 2: Equipment -->
  <rect x="165" y="100" width="110" height="70" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="220" y="131" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">製造装置</text>
  <text x="220" y="152" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">ASML, AMAT</text>
  <!-- Arrow -->
  <polygon points="280,135 295,128 295,142" fill="#ffffff"/>
  <line x1="275" y1="135" x2="295" y2="135" stroke="#ffffff" stroke-width="2"/>
  <!-- Stage 3: Fab -->
  <rect x="300" y="85" width="110" height="100" fill="#16213e" stroke="#e91e63" stroke-width="3" rx="6"/>
  <text x="355" y="126" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">前工程</text>
  <text x="355" y="145" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">TSMC, Samsung</text>
  <text x="355" y="162" fill="#ffffff" font-size="10" text-anchor="middle" font-family="sans-serif">Intel, SMIC</text>
  <!-- Arrow -->
  <polygon points="415,135 430,128 430,142" fill="#ffffff"/>
  <line x1="410" y1="135" x2="430" y2="135" stroke="#ffffff" stroke-width="2"/>
  <!-- Stage 4: OSAT -->
  <rect x="435" y="100" width="110" height="70" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="490" y="131" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">後工程</text>
  <text x="490" y="152" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">ASE, Amkor</text>
  <!-- Arrow -->
  <polygon points="550,135 565,128 565,142" fill="#ffffff"/>
  <line x1="545" y1="135" x2="565" y2="135" stroke="#ffffff" stroke-width="2"/>
  <!-- Stage 5: Design -->
  <rect x="570" y="100" width="110" height="70" fill="#16213e" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="625" y="131" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">チップ設計</text>
  <text x="625" y="152" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">NVIDIA, AMD</text>
  <!-- Arrow -->
  <polygon points="685,135 700,128 700,142" fill="#ffffff"/>
  <line x1="680" y1="135" x2="700" y2="135" stroke="#ffffff" stroke-width="2"/>
  <!-- Stage 6: End market -->
  <rect x="705" y="100" width="75" height="70" fill="#16213e" stroke="#ffffff" stroke-width="1" rx="6"/>
  <text x="742" y="131" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">最終市場</text>
  <text x="742" y="150" fill="#ffffff" font-size="10" text-anchor="middle" font-family="sans-serif">AI/HPC</text>
  <!-- Geopolitical note -->
  <rect x="30" y="220" width="740" height="50" fill="#16213e" rx="6"/>
  <text x="400" y="242" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">地政学リスク: 米中デカップリングによりサプライチェーン再構築加速</text>
  <text x="400" y="262" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">日米台韓「Chip4同盟」 vs 中国独自エコシステム構築 — 二極化が進行中</text>
  <!-- Investment opportunity callout -->
  <rect x="150" y="295" width="500" height="45" fill="#f9a825" rx="6"/>
  <text x="400" y="315" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資機会: 製造装置・前工程設備メーカーが最も高いバリュエーション</text>
  <text x="400" y="333" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">ASML +52% YTD / AMAT +38% YTD / 東京エレクトロン +44% YTD</text>
</svg>
- **市場概要**:
- • 2025年市場規模: $750億（前年比+12%）
- • 2030年予測: $1,050億（CAGR 7.0%）
- • 主要セグメント: 先端ノード製造（42%）、製造装置（35%）、設計ツール（23%）


---

# 半導体・先端製造（1/6）（2/2）

> *先端ロジック(2nm以降)はTSMCとSamsungの2社独占が継続*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体・先端製造 主要データ</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">2025年 市場規模</text>
  <text x="735" y="106" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$580億（前年比 +22%）</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">AI半導体需要</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">NVIDIA H100/H200 売上 $47B (CAGR 35%)</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">先端ロジック市場</text>
  <text x="735" y="210" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">TSMC 3nm/2nm 生産能力 200% 拡大計画</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">日本半導体復権</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">Rapidus 2nm試作 / ソニー半導体 $14B投資</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">製造装置市場</text>
  <text x="735" y="314" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$1,200億 — ASML EUV独占 継続</text>
</svg>
- **成長ドライバー**:
- • AI向けGPU・専用チップ需要急増
- • 3nm以下の先端ノード製造競争
- • 地政学的要因による国内製造回帰


---

# 半導体・先端製造（2/6）（1/2）

> *HBM3e帯域幅がAI学習のボトルネックを解消し需要急拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 セグメント別 成長率（YoY 2024-2025）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI / HPC チップ</text>
  <rect x="200" y="78" width="480" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="688" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">+192% (GPU)</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">製造装置</text>
  <rect x="200" y="133" width="300" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="508" y="149" fill="#29b6f6" font-size="13" font-family="sans-serif">+120%</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">先端パッケージング</text>
  <rect x="200" y="188" width="260" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="468" y="204" fill="#e91e63" font-size="13" font-family="sans-serif">+104%</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">パワー半導体</text>
  <rect x="200" y="243" width="190" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="398" y="259" fill="#4caf50" font-size="13" font-family="sans-serif">+76%</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">メモリ（DRAM/NAND）</text>
  <rect x="200" y="298" width="150" height="28" fill="#ab47bc" rx="3" opacity="0.9"/>
  <text x="358" y="314" fill="#ab47bc" font-size="13" font-family="sans-serif">+60%</text>
</svg>
- **VC投資トレンド（単位: $億）**:
- • 2021年: $640
- • 2022年: $1,190（+85.9%、政府支援拡大）


---

# 半導体・先端製造（2/6）（2/2）

> *国家安保的観点から各国が半導体国産化補助金を大規模投入*

- • 2023年: $910（-23.5%）
- • 2024年: $830（-8.8%）
- • 2025年: $740（-10.8%）
- **注釈**: 政府支援（CHIPS Act等）が民間投資を補完、実質投資額は高水準維持


---

# 半導体・先端製造（3/6）

> *EUV装置のASML独占が10年単位で持続するモートを形成*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 主要プレイヤー 投資評価（2025年）</text>
  <text x="220" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">特徴</text>
  <text x="340" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">現在評価</text>
  <text x="460" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨</text>
  <text x="150" y="117" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">NVIDIA</text>
    <rect x="160" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">AI GPU覇者</text>
    <rect x="280" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">$3.3T時価総額</text>
    <rect x="400" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
  <text x="150" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">TSMC</text>
    <rect x="160" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">製造独占</text>
    <rect x="280" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="162" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">$0.8T時価総額</text>
    <rect x="400" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <text x="150" y="207" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ASML</text>
    <rect x="160" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="207" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">装置独占</text>
    <rect x="280" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="207" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">$0.35T時価総額</text>
    <rect x="400" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <text x="150" y="252" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">東京エレクトロン</text>
    <rect x="160" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="252" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">装置強者</text>
    <rect x="280" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="252" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">¥24兆時価総額</text>
    <rect x="400" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
</svg>
- **主要企業分析**:
- • **TSMC**: 2025年売上$880億（+18%）、先端ノード市場シェア55%、3nm量産
- • **ASML**: 売上$320億（+25%）、EUV露光装置独占、High-NA EUV出荷開始
- • **Applied Materials**: 売上$285億（+15%）、製造装置総合首位
- • **NVIDIA（再掲）**: AI GPU市場85%シェア、Blackwell世代投入
- • **AMD**: 売上$280億（+22%）、データセンターGPUでシェア拡大


---

# 半導体・先端製造（4/6）（1/2）

> *AIサーバー1台あたりの半導体コンテンツが5年で4倍増*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#29b6f6" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#29b6f6" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#29b6f6" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体（4/6）: ジオポリティクスと投資機会</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">Chip4同盟 | 米中デカップリング | 日本復権シナリオ</text>
</svg>
- **技術革新動向**:
- • **プロセスノード**: 3nm量産（TSMC・Samsung）、2nm開発中（2027年量産予定）
- • **パッケージング**: 3D積層、チップレット技術が主流化


---

# 半導体・先端製造（4/6）（2/2）

> *パワー半導体（SiC/GaN）がEV・再エネ向けに年率25%成長*

- • **製造装置**: High-NA EUV、原子層堆積（ALD）の高度化
- • **新材料**: GAA（Gate-All-Around）トランジスタ、2D材料
- • 半導体特許出願: 2025年95,000件（+18%）
- • ファブ投資額: 世界で$1,800億（過去最高）


---

# 半導体・先端製造（5/6）（1/2）

> *先端半導体製造装置メーカーへの間接投資が最も安定したリターン*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 製造地図 変化（2020→2025→2030）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">台湾 シェア (ロジック前工程)</text>
  <text x="735" y="106" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">2020: 90% → 2025: 62% → 2030目標: 45%</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">韓国 (Samsung/SK Hynix)</text>
  <text x="735" y="158" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">メモリ50%シェア維持 | AI HBM需要爆発</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">米国 (Intel/TSMC AZ)</text>
  <text x="735" y="210" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">国内製造復活 — CHIPSs法 $520億補助金</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">日本 (Rapidus/TSMC熊本)</text>
  <text x="735" y="262" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$20B以上の国家投資 — 2nm試作2027年</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#9e9e9e" font-size="14" font-weight="bold" font-family="sans-serif">中国 (SMIC等)</text>
  <text x="735" y="314" fill="#9e9e9e" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">7nm以下禁止 — 独自エコシステム構築中</text>
</svg>
- **競合環境**:
- • **ファウンドリ**: TSMC圧倒的首位、Samsung追撃、Intel Foundryが参入
- • **製造装置**: ASML（露光）、Applied Materials（総合）、Tokyo Electron（エッチング）


---

# 半導体・先端製造（5/6）（2/2）

> *半導体サイクルは2026年が次のピーク、今が仕込みタイミング*

- • **設計ツール**: Synopsys、Cadence、Siemens EDA寡占
- • **AIチップ**: NVIDIA独走、AMD・Intel・新興（Cerebras、Graphcore）
- **参入障壁**: 超高額設備投資、技術蓄積、サプライチェーン
- **地政学**: 米中対立、技術輸出規制、製造拠点分散化


---

# 半導体・先端製造（6/6）（1/2）

> *中国制裁強化で台湾・韓国・日本の代替投資需要が加速*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#29b6f6" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#29b6f6" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#29b6f6" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体（6/6）: 日本投資家への示唆</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">国内半導体企業の評価見直し — ソニー/東エレ/アドバンテストに注目</text>
</svg>
- **投資機会と推奨**:
- • **最優先**: 製造装置（ASML、Applied Materials）、先端ファウンドリ（TSMC）
- • **高ポテンシャル**: AIチップ設計、パッケージング技術、先端材料


---

# 半導体・先端製造（6/6）（2/2）

> *先端ロジック需要は2030年まで年率18%で構造的に成長*

- • **新興**: 量子コンピューティング用半導体、光コンピューティング
- **期待リターン**: 年率12-18%（中リスク・中リターン）
- **投資タイミング**: 需要サイクルの底打ち確認後（2026年後半想定）
- **リスク**: 設備投資過剰、地政学リスク、技術世代交代


---

# 北米市場インサイト（1/3）（1/2）

> *北米はAIインフラへのVCと上場株の両輪で最大投資市場*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">北米市場 成長産業マップ</text>
  <!-- US box -->
  <rect x="60" y="65" width="300" height="280" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="95" fill="#f9a825" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">米国</text>
  <text x="210" y="125" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">AI/ML: $380B (61%)</text>
  <text x="210" y="150" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">半導体: $320B (55%)</text>
  <text x="210" y="175" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">バイオテック: $220B (56%)</text>
  <text x="210" y="200" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">再エネ: $180B (37%)</text>
  <text x="210" y="240" fill="#f9a825" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">$1.1T</text>
  <text x="210" y="262" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">北米市場合計</text>
  <!-- Canada box -->
  <rect x="440" y="65" width="140" height="280" fill="#16213e" rx="8" stroke="#29b6f6" stroke-width="2"/>
  <text x="510" y="95" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">カナダ</text>
  <text x="510" y="130" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">AI研究ハブ</text>
  <text x="510" y="155" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">クリーンエネ</text>
  <text x="510" y="180" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">水力発電</text>
  <text x="510" y="230" fill="#29b6f6" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">$85B</text>
  <!-- Mexico box -->
  <rect x="620" y="65" width="140" height="280" fill="#16213e" rx="8" stroke="#4caf50" stroke-width="2"/>
  <text x="690" y="95" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">メキシコ</text>
  <text x="690" y="130" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">半導体製造</text>
  <text x="690" y="155" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">ニアショアリング</text>
  <text x="690" y="180" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">再エネ拡張</text>
  <text x="690" y="230" fill="#4caf50" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">$42B</text>
  <!-- Key insight -->
  <text x="400" y="375" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">北米全体: CAGR 22% — 世界最大の成長産業投資市場</text>
</svg>
- **北米市場の特徴**:
- • 全産業投資額の52%（$1,690億）を占める世界最大の技術市場
- • シリコンバレー、ボストン、シアトル、オースティンが投資ハブ
- • 強み: 技術人材、VC資金、大学研究、規制柔軟性


---

# 北米市場インサイト（1/3）（2/2）

> *シリコンバレー以外にNYC・テキサスのAIハブが急台頭*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">北米市場 AI/Tech 主要指標（2025年）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">シリコンバレー VC投資</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">$185B — 前年比 +42%</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">AI関連 IPO 北米</text>
  <text x="735" y="158" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">2024年 38件 | 2025年 57件予測</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">Big Tech AI投資合計</text>
  <text x="735" y="210" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">Microsoft+Google+Amazon = $185B/年</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">税制優遇（R&D控除）</text>
  <text x="735" y="262" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">最大 50% 税額控除 — AI投資促進</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">人材</text>
  <text x="735" y="314" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI/ML エンジニア平均年収 $215K — 世界最高</text>
</svg>
- **産業別シェア（北米内）**:
- • AI: 65%（世界の中でも最も集中）
- • 半導体設計・製造装置: 58%
- • バイオテック: 62%
- • 再生エネルギー: 38%（製造は中国優位、技術開発は北米）


---

# 北米市場インサイト（2/3）

> *米国IRA補助金$3,690億が再エネ・EVへの10年投資を保証*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">北米 成長産業 VC投資 州別シェア（2025年）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">カリフォルニア州</text>
  <rect x="200" y="78" width="440" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="648" y="94" fill="#f9a825" font-size="13" font-family="sans-serif">44% — シリコンバレー</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ニューヨーク州</text>
  <rect x="200" y="133" width="220" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="428" y="149" fill="#e91e63" font-size="13" font-family="sans-serif">22% — FinTech特化</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">テキサス州</text>
  <rect x="200" y="188" width="110" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="318" y="204" fill="#4caf50" font-size="13" font-family="sans-serif">11% — エネルギーAI</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">マサチューセッツ</text>
  <rect x="200" y="243" width="90" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="298" y="259" fill="#29b6f6" font-size="13" font-family="sans-serif">9% — バイオテック</text>
  <text x="190" y="314" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">その他</text>
  <rect x="200" y="298" width="140" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="348" y="314" fill="#9e9e9e" font-size="13" font-family="sans-serif">14%</text>
</svg>
- **米国の政策・規制環境**:
- • **CHIPS & Science Act**: 半導体製造に$520億補助、R&Dに$2,000億
- • **IRA（インフレ削減法）**: クリーンエネルギーに$3,690億投資
- • **AI規制**: 州レベル（CA、NY）で進行、連邦レベルは慎重姿勢
- • **バイオテック**: FDA承認プロセス、Right-to-Try法で柔軟性
- **カナダ**: AIスタートアップ支援（Vector Institute）、クリーンテック投資


---

# 北米市場インサイト（3/3）

> *米国バイオクラスター（ボストン/SDバイオ）がmRNA開発を牽引*

- **北米投資トレンド**:
- • メガディール増加: $1億以上の調達が全体の45%（2025年）
- • セクター集中: AI関連が全投資の42%
- • レイトステージ優位: シリーズB以降が全体の68%
- • IPO市場回復: 2025年テック系IPO 85件（2023年比+65%）
- **投資推奨**: 北米は引き続き最優先市場、ポートフォリオの50-60%配分を推奨


---

# 横断的分析（1/4）

> *4産業の相関係数が0.3以下：ポートフォリオ多様化効果が高い*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">産業横断スコアリング比較</text>
  <!-- Table header -->
  <rect x="50" y="55" width="700" height="40" fill="#16213e" rx="4"/>
  <text x="150" y="82" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">産業</text>
  <text x="300" y="82" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長率</text>
  <text x="420" y="82" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク</text>
  <text x="540" y="82" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">流動性</text>
  <text x="670" y="82" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">総合スコア</text>
  <!-- Row 1: AI/ML -->
  <rect x="50" y="100" width="700" height="60" fill="#16213e" rx="2"/>
  <text x="150" y="137" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <rect x="240" y="112" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="112" width="114" height="18" fill="#f9a825" rx="2"/>
  <text x="420" y="137" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="540" y="137" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="670" y="137" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★★</text>
  <!-- Row 2: Renewable -->
  <rect x="50" y="165" width="700" height="60" fill="#1a1a2e" rx="2"/>
  <text x="150" y="202" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">再生エネルギー</text>
  <rect x="240" y="177" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="177" width="84" height="18" fill="#4caf50" rx="2"/>
  <text x="420" y="202" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="540" y="202" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="670" y="202" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Row 3: Biotech -->
  <rect x="50" y="230" width="700" height="60" fill="#16213e" rx="2"/>
  <text x="150" y="267" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">バイオテック</text>
  <rect x="240" y="242" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="242" width="72" height="18" fill="#e91e63" rx="2"/>
  <text x="420" y="267" fill="#e91e63" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="540" y="267" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="670" y="267" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <!-- Row 4: Semiconductor -->
  <rect x="50" y="295" width="700" height="60" fill="#1a1a2e" rx="2"/>
  <text x="150" y="332" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">半導体</text>
  <rect x="240" y="307" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="307" width="102" height="18" fill="#29b6f6" rx="2"/>
  <text x="420" y="332" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="540" y="332" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="670" y="332" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
</svg>
- **産業間の相互関係**:
- • **AI × 半導体**: AIチップ需要が半導体成長を牽引（相互依存関係）
- • **AI × バイオテック**: AI創薬が開発効率を革新、両産業の成長加速
- • **半導体 × 再生エネルギー**: EV・バッテリー制御にパワー半導体不可欠
- • **AI × 再生エネルギー**: スマートグリッド最適化、エネルギー効率向上
- **投資示唆**: 複数産業にまたがるテーマ（AI、電動化、デジタル化）が最も高成長


---

# 横断的分析（2/4）

> *インフレ耐性が高いのは半導体と再エネ、AIはデフレ的性質*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#f9a825" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">横断的分析（2/4）</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">4産業の相関・シナジー・競合関係を分析</text>
</svg>
- **グローバル規制環境**:
- • **AI規制**: EU AI Act（2025年施行）、リスクベース分類、高リスクAIに厳格要件
- • **データプライバシー**: GDPR（欧州）、CCPA（カリフォルニア）、企業コンプライアンスコスト増
- • **環境規制**: カーボンプライシング、排出量報告義務、グリーンテック追い風
- • **半導体輸出規制**: 米国による中国向け先端半導体・製造装置の輸出制限
- **投資示唆**: 規制対応力のある大手企業優位、コンプライアンスコストは参入障壁に


---

# 横断的分析（3/4）（1/2）

> *産業間クロス投資（AIxバイオ、AIx再エネ）が最高リターン領域*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">産業間シナジー マップ（2025年注目動向）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">AI × 半導体</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI専用チップ需要がNVIDIA +230%押し上げ</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">AI × バイオテック</text>
  <text x="735" y="158" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AlphaFold3で創薬コスト -90%</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">AI × 再エネ</text>
  <text x="735" y="210" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AIグリッド最適化で需給調整精度 +40%</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">半導体 × 再エネ</text>
  <text x="735" y="262" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">太陽電池・EV制御チップ需要 急増</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#ab47bc" font-size="14" font-weight="bold" font-family="sans-serif">バイオ × 再エネ</text>
  <text x="735" y="314" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">CO2固定バイオ燃料 — 次世代シナジー</text>
</svg>
- **ESG・サステナビリティ動向**:
- • ESG投資残高: 2025年に$45兆（全運用資産の35%）
- • 機関投資家のESG要件強化、投資判断の主流化


---

# 横断的分析（3/4）（2/2）

> *2030年の産業融合で境界が消滅：今から横断投資が有利*

- • **E（環境）**: 再生エネルギー、カーボンニュートラル、サーキュラーエコノミー
- • **S（社会）**: AI倫理、データプライバシー、医療アクセス
- • **G（ガバナンス）**: 透明性、取締役会多様性、株主還元
- **投資示唆**: ESGスコア高い企業は資金調達有利、バリュエーションプレミアム


---

# 横断的分析（4/4）

> *ESGスコア上位企業の10年リターンはスコア下位比+12%*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">4産業 相関関係マトリクス</text>
  <text x="220" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <text x="340" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ</text>
  <text x="460" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオ</text>
  <text x="580" y="75" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体</text>
  <text x="150" y="117" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AI/ML</text>
    <rect x="160" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="117" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">—</text>
    <rect x="280" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
    <rect x="400" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
    <rect x="520" y="95" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="117" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
  <text x="150" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">再エネ</text>
    <rect x="160" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="162" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
    <rect x="280" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="162" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">—</text>
    <rect x="400" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="162" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="520" y="140" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="162" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="150" y="207" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">バイオ</text>
    <rect x="160" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="220" y="207" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
    <rect x="280" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="340" y="207" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="400" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="460" y="207" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">—</text>
    <rect x="520" y="185" width="116" height="41" fill="#16213e" rx="2"/>
    <text x="580" y="207" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <text x="150" y="252" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">半導体</text>
    <rect x="160" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="220" y="252" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
    <rect x="280" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="340" y="252" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
    <rect x="400" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="460" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
    <rect x="520" y="230" width="116" height="41" fill="#1a1a2e" rx="2"/>
    <text x="580" y="252" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">—</text>
</svg>
- **人材・イノベーション動向**:
- • STEM人材需要急増: AI・半導体エンジニア年収$180k-$350k（米国）
- • 大学研究投資: スタンフォード・MIT・カーネギーメロンがAI研究をリード
- • 企業R&D支出: 4産業合計で$5,200億（2025年、世界全R&Dの28%）
- • 特許出願総数: 4産業で293,000件（2025年、+28%）
- **投資示唆**: 人材獲得力、研究開発力が競争優位の源泉


---

# リスク分析（1/3）

> *金利上昇・規制変更・地政学リスクの複合シナリオに注意*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="32" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資リスクマトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="50" x2="100" y2="360" stroke="#ffffff" stroke-width="2"/>
  <line x1="100" y1="360" x2="740" y2="360" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="420" y="390" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">発生確率 →</text>
  <text x="50" y="205" fill="#ffffff" font-size="14" text-anchor="middle" transform="rotate(-90,50,205)" font-family="sans-serif">影響度 →</text>
  <!-- Grid zones -->
  <rect x="100" y="200" width="320" height="160" fill="#4caf50" opacity="0.2" rx="2"/>
  <text x="260" y="290" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">低リスク</text>
  <rect x="420" y="200" width="320" height="160" fill="#f9a825" opacity="0.2" rx="2"/>
  <text x="580" y="290" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">中リスク</text>
  <rect x="420" y="50" width="320" height="150" fill="#e91e63" opacity="0.25" rx="2"/>
  <text x="580" y="130" fill="#e91e63" font-size="14" text-anchor="middle" font-family="sans-serif">高リスク</text>
  <rect x="100" y="50" width="320" height="150" fill="#f9a825" opacity="0.15" rx="2"/>
  <text x="260" y="130" fill="#f9a825" font-size="14" text-anchor="middle" font-family="sans-serif">中リスク</text>
  <!-- Risk items -->
  <circle cx="210" cy="300" r="16" fill="#f9a825"/>
  <text x="210" y="305" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">規制</text>
  <circle cx="500" cy="320" r="16" fill="#f9a825"/>
  <text x="500" y="325" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">金利</text>
  <circle cx="620" cy="100" r="18" fill="#e91e63"/>
  <text x="620" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">地政学</text>
  <circle cx="340" cy="90" r="16" fill="#f9a825"/>
  <text x="340" y="95" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">技術</text>
  <circle cx="180" cy="150" r="14" fill="#4caf50"/>
  <text x="180" y="155" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">流動性</text>
  <!-- X axis ticks -->
  <text x="100" y="378" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="420" y="378" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="740" y="378" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">高</text>
</svg>
- **産業別リスクファクター**:
- • **AI**: 規制強化、倫理問題、技術陳腐化、高バリュエーション
- • **再生エネルギー**: 原材料価格変動、政策変更、中国依存、送電網制約
- • **バイオテック**: 規制承認不確実性、開発失敗、特許期限、医療費抑制圧力
- • **半導体**: 設備投資過剰、需要サイクル、地政学リスク、技術移行
- **共通リスク**: マクロ経済悪化、金利上昇、VC資金枯渇


---

# リスク分析（2/3）

> *バイオ臨床試験失敗と半導体サイクル下落が最大の固有リスク*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク分析（2/3）: リスク要因詳細</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">規制リスク</text>
  <text x="735" y="106" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">EU AI Act施行 | 米国AI規制法案 — 2025年本格化</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">地政学リスク</text>
  <text x="735" y="158" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">米中摩擦 / 台湾有事シナリオ — 半導体に直撃</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">金利リスク</text>
  <text x="735" y="210" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">FRB利下げ遅延 → グロース株バリュエーション圧縮</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">技術リスク</text>
  <text x="735" y="262" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">破壊的新技術(量子コンピュータ等)による代替</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">流動性リスク</text>
  <text x="735" y="314" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">スタートアップ/非上場資産の換金困難</text>
</svg>
- **地政学リスク**:
- • **米中対立**: 技術デカップリング、輸出規制、サプライチェーン分断
- • **台湾リスク**: TSMC依存、地政学的緊張、製造拠点集中
- • **エネルギー安全保障**: 欧州のロシア依存脱却、資源ナショナリズム
- • **データ主権**: 各国がデータローカライゼーション要求、クラウド事業への影響
- **投資示唆**: 地理的分散、友好国シフト（フレンドショアリング）の恩恵企業に注目


---

# リスク分析（3/3）

> *リスク対策：4産業均等配分＋ヘッジファンド10%組み入れ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="48" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資家 リスク許容度別 推奨配分（2026年）</text>
  <text x="190" y="94" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">低リスク（保守）</text>
  <rect x="200" y="78" width="400" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="608" y="94" fill="#4caf50" font-size="13" font-family="sans-serif">AI ETF 60% + 再エネ 40%</text>
  <text x="190" y="149" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">中リスク（標準）</text>
  <rect x="200" y="133" width="340" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="548" y="149" fill="#f9a825" font-size="13" font-family="sans-serif">AI株 40% + 半導体 30% + バイオ 30%</text>
  <text x="190" y="204" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">高リスク（積極）</text>
  <rect x="200" y="188" width="460" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="668" y="204" fill="#e91e63" font-size="13" font-family="sans-serif">AI未上場 40% + GPU株 40% + バイオ 20%</text>
  <text x="190" y="259" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">超積極</text>
  <rect x="200" y="243" width="500" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="708" y="259" fill="#e91e63" font-size="13" font-family="sans-serif">AI スタートアップ集中 — 高リスク高リターン</text>
</svg>
- **技術・市場リスク**:
- • **量子コンピューティング**: 既存暗号技術の陳腐化リスク（2030年代）
- • **技術標準競争**: 5G/6G、AI規格で分断リスク
- • **バブル懸念**: AI企業の高バリュエーション、調整リスク
- • **ディスラプション**: 新技術による既存技術の急速な陳腐化
- **リスク管理戦略**: ポートフォリオ分散、段階的投資、ヘッジ戦略、継続的モニタリング


---

# 投資推奨・アクション（1/3）（1/2）

> *コアポートフォリオはAI40%・半導体25%・再エネ20%・バイオ15%*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨 ポートフォリオ配分</text>
  <!-- Pie chart approximation using rectangles -->
  <!-- AI/ML: 35% -->
  <rect x="60" y="70" width="180" height="40" fill="#f9a825" rx="4"/>
  <text x="150" y="97" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI/ML 35%</text>
  <!-- Semiconductor: 30% -->
  <rect x="60" y="125" width="154" height="40" fill="#29b6f6" rx="4"/>
  <text x="150" y="152" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 30%</text>
  <!-- Renewable: 20% -->
  <rect x="60" y="180" width="103" height="40" fill="#4caf50" rx="4"/>
  <text x="150" y="207" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ 20%</text>
  <!-- Biotech: 15% -->
  <rect x="60" y="235" width="77" height="40" fill="#e91e63" rx="4"/>
  <text x="150" y="262" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオ 15%</text>
  <!-- Action Timeline -->
  <rect x="310" y="60" width="440" height="310" fill="#16213e" rx="8"/>
  <text x="530" y="90" fill="#f9a825" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">アクションタイムライン</text>
  <!-- Q1 -->
  <rect x="330" y="105" width="100" height="30" fill="#f9a825" rx="4"/>
  <text x="380" y="126" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q1 2026</text>
  <text x="445" y="126" fill="#ffffff" font-size="12" font-family="sans-serif">AI/ML ETF組入 + 半導体先物</text>
  <!-- Q2 -->
  <rect x="330" y="150" width="100" height="30" fill="#29b6f6" rx="4"/>
  <text x="380" y="171" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q2 2026</text>
  <text x="445" y="171" fill="#ffffff" font-size="12" font-family="sans-serif">再エネ株 段階投資開始</text>
  <!-- Q3 -->
  <rect x="330" y="195" width="100" height="30" fill="#4caf50" rx="4"/>
  <text x="380" y="216" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q3 2026</text>
  <text x="445" y="216" fill="#ffffff" font-size="12" font-family="sans-serif">バイオテック選別投資</text>
  <!-- Q4 -->
  <rect x="330" y="240" width="100" height="30" fill="#e91e63" rx="4"/>
  <text x="380" y="261" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q4 2026</text>
  <text x="445" y="261" fill="#ffffff" font-size="12" font-family="sans-serif">ポートフォリオ全体再評価</text>
  <!-- Year 2027+ -->
  <rect x="330" y="285" width="100" height="30" fill="#9c27b0" rx="4"/>
  <text x="380" y="306" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">2027+</text>
  <text x="445" y="306" fill="#ffffff" font-size="12" font-family="sans-serif">長期ホールド + 配当再投資</text>
  <!-- Expected return -->
  <text x="530" y="350" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">期待リターン: 年率 18-24%</text>
</svg>
- **優先投資分野（リスク調整後リターン順）**:
- 1. **AIインフラ**: NVIDIA、クラウドAI（Microsoft、Google）- 最優先
- 2. **先端半導体製造**: ASML、Applied Materials、TSMC


---

# 投資推奨・アクション（1/3）（2/2）

> *AIインフラ株のエントリーはP/E 30倍以下を目安に設定*

- 3. **EV・バッテリー**: Tesla、BYD、CATL
- 4. **mRNAプラットフォーム**: Moderna、BioNTech
- 5. **AI創薬**: Recursion、Insilico、大手製薬のAI部門
- **ポートフォリオ配分推奨**: AI 35%、再エネ 25%、半導体 25%、バイオ 15%


---

# 投資推奨・アクション（2/3）

> *12-18ヶ月の投資ロードマップ：今すぐ着手すべき3ステップ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨（2/3）: 具体的銘柄・ファンド候補</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">NVIDIA (NVDA)</text>
  <text x="735" y="106" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI GPU独占 — コアポジション 10-15%</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">BOTZ (AI ETF)</text>
  <text x="735" y="158" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">分散AI投資の基本 — 5-10%配分推奨</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">ASML Holding</text>
  <text x="735" y="210" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">半導体装置独占 — 安定成長 5-8%</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#ab47bc" font-size="14" font-weight="bold" font-family="sans-serif">Constellation Energy</text>
  <text x="735" y="262" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">データセンター電力需要の受益者</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">Recursion Pharma</text>
  <text x="735" y="314" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI創薬 — 高リスク高リターン 1-3%</text>
</svg>
- **投資戦略**:
- • **コア投資（60%）**: 大型確立企業（NVIDIA、TSMC、Tesla、Microsoft等）
- • **成長投資（30%）**: 中型高成長企業（AI SaaS、バイオテック、EV部品等）
- • **新興投資（10%）**: スタートアップ・VC（高リスク・高リターン）
- **地域配分**: 北米55%、アジア30%、欧州10%、その他5%
- **リバランス**: 四半期ごとに見直し、利益確定と再配分


---

# 投資推奨・アクション（3/3）

> *2026-2030年に向けた中長期アロケーション戦略の全体像*

- **実行タイムライン**:
- • **2026年Q1-Q2**: コア投資の50%配分完了、市場調整時に追加
- • **2026年Q3-Q4**: 成長投資の配分開始、IPOパイプライン監視
- • **2027年以降**: 新興技術への段階的配分、ポートフォリオ最適化
- **モニタリング指標**: 四半期決算、市場シェア、技術マイルストーン、規制動向
- **Exit戦略**: 目標リターン達成時（3-5年）、またはファンダメンタルズ悪化時


---

# 結論

> *今すぐ行動すべき理由：この投資機会は5年に一度の規模*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="160" width="800" height="80" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="198" x2="740" y2="198" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="190" fill="#f9a825" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">結論: 2026年 最重要投資テーマ</text>
  <text x="400" y="220" fill="#ffffff" font-size="16" text-anchor="middle" font-family="sans-serif">AI/ML × 半導体 × 再エネ の融合が 次の10年を創る</text>
</svg>
- **総括**:
- • AI、再生エネルギー、バイオテック、半導体は今後5年間の最重要投資テーマ
- • 4産業合計で2030年に$8.1兆市場、年率14%成長の巨大機会
- • 北米市場が引き続き投資の中心、技術革新とVC資金が集中
- • リスク要因は多岐にわたるが、分散投資とリスク管理で対応可能
- **最終提言**: 2026-2028年が投資の黄金期、早期参入と段階的配分を推奨


---

# 補足・データソース（1/2）

> *IEA・BloombergNEF・PitchBookを一次データソースとして活用*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">補足: 主要データソース（1/2）</text>
  <rect x="40" y="80" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="106" fill="#29b6f6" font-size="14" font-weight="bold" font-family="sans-serif">Gartner Hype Cycle 2025</text>
  <text x="735" y="106" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI/ML技術成熟度分析</text>
  <rect x="40" y="132" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="158" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">McKinsey Global Institute</text>
  <text x="735" y="158" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI経済効果 $4-13兆/年 (2030年)</text>
  <rect x="40" y="184" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="210" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">IEA World Energy Outlook</text>
  <text x="735" y="210" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">再エネ投資 $1.7兆/年 (2024年)</text>
  <rect x="40" y="236" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="262" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">SEMI World Fab Forecast</text>
  <text x="735" y="262" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">半導体製造設備投資データ</text>
  <rect x="40" y="288" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="314" fill="#ab47bc" font-size="14" font-weight="bold" font-family="sans-serif">CB Insights State of AI</text>
  <text x="735" y="314" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">AI VC投資 グローバルデータ</text>
</svg>
- **主要データソース**:
- • Gartner, IDC, McKinsey - 市場規模・予測
- • PitchBook, Crunchbase - VC投資データ
- • Bloomberg, FactSet - 企業財務データ


---

# 補足・データソース（2/2）

> *引用資料はすべて2025年以降の最新版を使用している*

- • USPTO, WIPO - 特許データ
- • IEA, BNEF - エネルギー市場データ
- • FDA, EMA - バイオテック承認データ
- **免責事項**: 本レポートは情報提供のみを目的とし、投資助言ではありません

