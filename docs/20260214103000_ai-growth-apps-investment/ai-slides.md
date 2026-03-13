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
# AIを使用したアプリケーションで
今後伸びる可能性が高いもの

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <text x="400" y="192" fill="#f9a825" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIを使用したアプリケーション</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">今後伸びる可能性が高い分野の完全分析レポート</text>
</svg>
- 市場動向と投資機会の分析
- 2026年2月


---

# アジェンダ

> *生成AI・ヘルスケア・金融の3分野が最優先投資対象*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">アジェンダ</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1. AI市場の現状・投資トレンド</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">2025年 $285B投資 | 主要セグメント分析</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">2. 高成長分野の詳細分析</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">生成AI / ヘルスケア / 金融 / 企業向け</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">3. 製造業・セキュリティ・教育</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AIの産業横断的応用事例</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">4. 成功事例・競合分析</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">OpenAI / Anthropic / Scale AI 等</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">5. 投資推奨・リスク・タイムライン</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">2026-2030年 投資戦略ガイド</text>
</svg>
- AI市場の現状と成長予測
- 高成長が見込まれる8つの応用分野
- 具体的な成功事例とケーススタディ
- 技術トレンドと規制動向
- 競合分析と差別化要因
- 投資機会と推奨アクション


---

# エグゼクティブサマリー

> *2030年$8,260億市場で生成AI（CAGR 62%）が投資の主戦場*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">エグゼクティブサマリー</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">AI投資機会</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">2025-2030年 最も高い投資リターン期待分野</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">最優先セグメント</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">AIエージェント(CAGR 67%) + 生成AI(CAGR 42%)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">市場成長</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">$285B(2025) → $1.8T(2030) — 6.3倍成長</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">差別化要因</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">データモート × ネットワーク効果 の両立が鍵</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">リスク</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">規制強化 / 競争激化 / バリュエーション調整リスク</text>
</svg>
- **グローバルAI市場**: 2026年$1,840億 → 2030年$8,260億（CAGR 45.6%）
- **最高成長分野**: 生成AI（CAGR 62%）、ヘルスケアAI（48%）、金融AI（44%）
- **投資トレンド**: 2025年AIスタートアップ投資は$670億、前年比35%増
- **推奨戦略**: エンタープライズSaaS×生成AI統合、規制対応型ヘルスケアAI、金融不正検知に注目


---

# AI市場の現状

> *2026-2030年でグローバルAI市場は4.5倍（$1,840億→$8,260億）に拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI市場 成長曲線と現在地</text>
  <!-- Axes -->
  <line x1="80" y1="60" x2="80" y2="330" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="330" x2="740" y2="330" stroke="#ffffff" stroke-width="2"/>
  <!-- S-curve: Adoption -->
  <path d="M 80,310 C 150,308 200,290 260,240 S 360,160 420,130 S 530,100 620,90 S 700,86 740,85" fill="none" stroke="#f9a825" stroke-width="3"/>
  <text x="745" y="88" fill="#f9a825" font-size="11" font-family="sans-serif">採用率</text>
  <!-- Exponential: Revenue -->
  <path d="M 80,325 C 200,322 280,315 360,300 S 480,250 560,200 S 650,140 740,90" fill="none" stroke="#e91e63" stroke-width="3"/>
  <text x="745" y="93" fill="#e91e63" font-size="11" font-family="sans-serif">市場収益</text>
  <!-- Investment curve -->
  <path d="M 80,320 C 200,316 300,305 400,275 S 520,210 600,155 S 680,110 740,88" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="745" y="100" fill="#29b6f6" font-size="11" font-family="sans-serif">投資額</text>
  <!-- Now marker: 2026 -->
  <line x1="500" y1="55" x2="500" y2="330" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,5"/>
  <text x="500" y="50" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">2026 現在</text>
  <!-- Phase labels -->
  <text x="200" y="380" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">初期</text>
  <text x="380" y="380" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">成長期</text>
  <text x="560" y="380" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">← 今ここ</text>
  <text x="680" y="380" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">成熟</text>
  <!-- Y axis -->
  <text x="50" y="195" fill="#ffffff" font-size="13" text-anchor="middle" transform="rotate(-90,50,195)" font-family="sans-serif">成長指標 →</text>
</svg>
- **グローバル市場規模**: $1,840億（2026年）
- **年間成長率**: 45.6% CAGR（2026-2030年）
- **2030年予測**: $8,260億
- **地域別**: 北米45%、アジア太平洋28%、欧州22%
- **セグメント**: ソフトウェア62%、ハードウェア24%、サービス14%

<!--
ChatGPT登場以降、エンタープライズ採用が加速。Fortune 500の87%がAI導入済み。
-->

---

# AI投資トレンド

> *$670億VC投資が流入し$100M+超大型調達が142件と過去最高を更新*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI投資トレンド 2020-2025</text>
  <!-- Bar chart: VC investment by year -->
  <!-- 2020: $36B -->
  <rect x="80" y="270" width="80" height="60" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="3"/>
  <text x="120" y="262" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">$36B</text>
  <text x="120" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2020</text>
  <!-- 2021: $78B -->
  <rect x="200" y="196" width="80" height="134" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="3"/>
  <text x="240" y="188" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">$78B</text>
  <text x="240" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2021</text>
  <!-- 2022: $91B -->
  <rect x="320" y="168" width="80" height="162" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="3"/>
  <text x="360" y="160" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">$91B</text>
  <text x="360" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2022</text>
  <!-- 2023: $110B -->
  <rect x="440" y="136" width="80" height="194" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="3"/>
  <text x="480" y="128" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">$110B</text>
  <text x="480" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2023</text>
  <!-- 2024: $185B -->
  <rect x="560" y="84" width="80" height="246" fill="#e91e63" opacity="0.9" rx="3"/>
  <text x="600" y="76" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">$185B</text>
  <text x="600" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2024</text>
  <!-- 2025est: $285B -->
  <rect x="680" y="60" width="80" height="270" fill="#f9a825" opacity="0.9" rx="3"/>
  <text x="720" y="52" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">$285B*</text>
  <text x="720" y="350" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2025e</text>
  <!-- Legend -->
  <text x="400" y="385" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">* 2025年推計値 | 出典: PitchBook, CB Insights 統合データ</text>
</svg>
- **2025年VC投資**: $670億（AI/MLスタートアップ向け）
- **前年比成長**: +35%
- **メガディール**: $100M+調達が142件（過去最高）
- **主要投資家**: Sequoia, a16z, Tiger Global, SoftBank Vision Fund
- **IPO/M&A**: 2025年に18件のAI企業IPO、平均時価総額$4.2B

<!--
生成AI領域への投資が全体の38%を占める。企業価値評価は収益倍率20-50倍。
-->

---

# 市場セグメント別成長率

> *生成AI 62%、ヘルスケアAI 48%と上位3分野がS&P平均の20倍超成長*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">市場セグメント別 成長率ランキング（YoY 2024-2025）</text>
  <!-- Horizontal bars -->
  <!-- AI Agents: 185% -->
  <text x="220" y="82" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AIエージェント</text>
  <rect x="230" y="65" width="370" height="28" fill="#f9a825" rx="3"/>
  <text x="608" y="85" fill="#f9a825" font-size="13" font-family="sans-serif">+185%</text>
  <!-- GenAI APIs: 142% -->
  <text x="220" y="122" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">生成AI API</text>
  <rect x="230" y="105" width="284" height="28" fill="#e91e63" rx="3"/>
  <text x="522" y="125" fill="#e91e63" font-size="13" font-family="sans-serif">+142%</text>
  <!-- Code gen: 128% -->
  <text x="220" y="162" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">コード生成</text>
  <rect x="230" y="145" width="256" height="28" fill="#29b6f6" rx="3"/>
  <text x="494" y="165" fill="#29b6f6" font-size="13" font-family="sans-serif">+128%</text>
  <!-- Healthcare AI: 98% -->
  <text x="220" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ヘルスケアAI</text>
  <rect x="230" y="185" width="196" height="28" fill="#4caf50" rx="3"/>
  <text x="434" y="205" fill="#4caf50" font-size="13" font-family="sans-serif">+98%</text>
  <!-- MLOps: 78% -->
  <text x="220" y="242" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">MLOps/AI基盤</text>
  <rect x="230" y="225" width="156" height="28" fill="#ff7043" rx="3"/>
  <text x="394" y="245" fill="#ff7043" font-size="13" font-family="sans-serif">+78%</text>
  <!-- Finance AI: 65% -->
  <text x="220" y="282" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">金融AI</text>
  <rect x="230" y="265" width="130" height="28" fill="#ab47bc" rx="3"/>
  <text x="368" y="285" fill="#ab47bc" font-size="13" font-family="sans-serif">+65%</text>
  <!-- Security AI: 52% -->
  <text x="220" y="322" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">AIセキュリティ</text>
  <rect x="230" y="305" width="104" height="28" fill="#78909c" rx="3"/>
  <text x="342" y="325" fill="#78909c" font-size="13" font-family="sans-serif">+52%</text>
  <!-- Key insight -->
  <text x="400" y="375" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">AIエージェント・生成AI APIが突出した成長 — 2026年投資機会の最優先セグメント</text>
</svg>
- **生成AI**: 62.1% CAGR（最高成長）
- **ヘルスケアAI**: 48.3% CAGR
- **金融サービスAI**: 43.7% CAGR
- **エンタープライズAI**: 41.2% CAGR
- **製造・サプライチェーン**: 38.5% CAGR
- **サイバーセキュリティAI**: 36.9% CAGR

<!--
全セグメントで30%超の成長。生成AIは2023年比で4倍の成長ペース。
-->

---

# 高成長AI応用分野マップ

> *生成AI・ヘルスケアAI・金融AIの3分野が高成長×高市場規模の最優先ゾーン*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">高成長AI応用分野 投資ランドスケープ</text>
  <!-- GenAI -->
  <ellipse cx="200" cy="130" rx="95" ry="55" fill="#f9a825" opacity="0.85"/>
  <text x="200" y="125" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">生成AI</text>
  <text x="200" y="145" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">$35B → $105B</text>
  <!-- Healthcare AI -->
  <ellipse cx="480" cy="115" rx="80" ry="50" fill="#e91e63" opacity="0.85"/>
  <text x="480" y="110" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルスケアAI</text>
  <text x="480" y="130" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">$22B → $68B</text>
  <!-- Enterprise AI -->
  <ellipse cx="660" cy="180" rx="90" ry="55" fill="#29b6f6" opacity="0.85"/>
  <text x="660" y="175" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業向けAI</text>
  <text x="660" y="195" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">$18B → $52B</text>
  <!-- Finance AI -->
  <ellipse cx="170" cy="280" rx="80" ry="50" fill="#4caf50" opacity="0.85"/>
  <text x="170" y="275" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">金融AI</text>
  <text x="170" y="295" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">$15B → $44B</text>
  <!-- Security AI -->
  <ellipse cx="400" cy="280" rx="75" ry="48" fill="#ff7043" opacity="0.85"/>
  <text x="400" y="275" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIセキュリティ</text>
  <text x="400" y="295" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">$8B → $28B</text>
  <!-- Manufacturing AI -->
  <ellipse cx="620" cy="310" rx="80" ry="48" fill="#ab47bc" opacity="0.85"/>
  <text x="620" y="305" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">製造業AI</text>
  <text x="620" y="325" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">$12B → $38B</text>
  <!-- Legend -->
  <text x="400" y="380" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">サイズ = 市場規模 | 数値 = 2025年 → 2030年予測</text>
</svg>
- **縦軸**: 市場規模（2030年予測）
- **横軸**: 成長率（CAGR）
- **右上象限**: 生成AI、ヘルスケアAI、金融AI
- **成長期**: エンタープライズAI、製造AI、サイバーセキュリティ
- **成熟期**: マーケティングAI、教育AI
- **新興**: モビリティ、エッジAI

<!--
投資ポートフォリオは右上象限に60%、成長期に30%、新興に10%を推奨。
-->

---

# 分野別市場規模予測（2026-2030年）（1/2）

> *6分野で2026-2028年の市場規模予測と成長率を比較した*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI分野別 市場規模予測（2026-2030年）</text>
  <!-- Y axis -->
  <line x1="80" y1="60" x2="80" y2="340" stroke="#ffffff" stroke-width="2"/>
  <!-- X axis -->
  <line x1="80" y1="340" x2="760" y2="340" stroke="#ffffff" stroke-width="2"/>
  <!-- Y axis labels -->
  <text x="70" y="340" fill="#ffffff" font-size="12" text-anchor="end" font-family="sans-serif">0</text>
  <text x="70" y="260" fill="#ffffff" font-size="12" text-anchor="end" font-family="sans-serif">50B</text>
  <text x="70" y="180" fill="#ffffff" font-size="12" text-anchor="end" font-family="sans-serif">100B</text>
  <text x="70" y="100" fill="#ffffff" font-size="12" text-anchor="end" font-family="sans-serif">150B</text>
  <!-- Grid lines -->
  <line x1="80" y1="260" x2="760" y2="260" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="180" x2="760" y2="180" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="100" x2="760" y2="100" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
  <!-- X axis years -->
  <text x="155" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2026</text>
  <text x="295" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2027</text>
  <text x="435" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2028</text>
  <text x="575" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2029</text>
  <text x="715" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">2030</text>
  <!-- GenAI line: 40, 58, 78, 96, 115B -->
  <polyline points="155,228 295,200 435,168 575,144 715,112" fill="none" stroke="#f9a825" stroke-width="3"/>
  <text x="725" y="112" fill="#f9a825" font-size="11" font-family="sans-serif">生成AI</text>
  <!-- Healthcare line: 28, 38, 50, 60, 70B -->
  <polyline points="155,256 295,236 435,212 575,192 715,172" fill="none" stroke="#e91e63" stroke-width="3"/>
  <text x="725" y="172" fill="#e91e63" font-size="11" font-family="sans-serif">ヘルスAI</text>
  <!-- Enterprise line: 20, 28, 36, 44, 55B -->
  <polyline points="155,268 295,252 435,232 575,212 715,188" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="725" y="190" fill="#29b6f6" font-size="11" font-family="sans-serif">企業AI</text>
  <!-- Finance AI line: 16, 22, 30, 38, 45B -->
  <polyline points="155,276 295,260 435,240 575,220 715,200" fill="none" stroke="#4caf50" stroke-width="3"/>
  <text x="725" y="208" fill="#4caf50" font-size="11" font-family="sans-serif">金融AI</text>
  <!-- Manufacturing line: 14, 20, 26, 33, 40B -->
  <polyline points="155,280 295,268 435,256 575,236 715,220" fill="none" stroke="#ab47bc" stroke-width="3"/>
  <text x="725" y="228" fill="#ab47bc" font-size="11" font-family="sans-serif">製造AI</text>
</svg>
- **生成AI**: $280億 → $1,420億
- **ヘルスケアAI**: $180億 → $720億
- **金融AI**: $160億 → $640億


---

# 分野別市場規模予測（2026-2030年）（2/2）

> *エンタープライズAI・製造AI・セキュリティが合計$1.52兆規模に成長*

- **エンタープライズAI**: $240億 → $880億
- **製造・サプライチェーン**: $120億 → $380億
- **サイバーセキュリティ**: $90億 → $260億
- **その他**: $770億 → $1,960億


---

# 生成AI市場概要

> *2030年に$1,420億（CAGR 62%）、エンタープライズ採用3.2倍増が牽引*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <text x="400" y="192" fill="#f9a825" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">生成AI市場概要</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">$35B → $105B (2030年予測) | CAGR 24.5%</text>
</svg>
- **市場規模**: $280億（2026年） → $1,420億（2030年）
- **CAGR**: 62.1%（全セグメント最高）
- **主要プレイヤー**: OpenAI, Anthropic, Google, Microsoft, Midjourney
- **応用領域**: コンテンツ生成、コード開発、デザイン、音声・動画
- **ChatGPT効果**: 2023年比でエンタープライズ採用3.2倍増

<!--
OpenAI推定評価額$800億、Anthropic $180億。企業向けライセンス収益が急成長。
-->

---

# テキスト生成アプリケーション

> *法務・カスタマーサポート向けSaaSが$180億市場で最も早期に収益化*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">テキスト生成アプリケーション — 投資機会</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ChatGPT / Claude API</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">週間アクティブ 5億人超 | 月額課金 急成長</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">コンテンツ生成 SaaS</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Jasper / Copy.ai — ライター市場を変革</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">カスタマーサポートAI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">Intercom / Zendesk AI — 解決率 +65%</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">法律・契約書AI</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Harvey AI — Big 4法律事務所に導入中</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">B2B SaaS + API利用量増加 + 垂直特化モデル</text>
</svg>
- **コンテンツライティング**: Jasper（$15億評価）、Copy.ai、Writesonic
- **カスタマーサポート**: Intercom AI, Zendesk AI, Ada
- **翻訳・ローカライゼーション**: DeepL（$20億評価）、Unbabel
- **法務・契約**: Harvey（$7億評価）、Ironclad AI
- **市場規模**: $42億（2026年） → $180億（2030年）

<!--
エンタープライズ契約は年間$50K-500K。NRR 120-150%と高リテンション。
-->

---

# コード生成・開発支援

> *GitHub Copilot等が開発速度2倍・コード補完率55%を実証済み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">コード生成・開発支援 — 投資機会</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">GitHub Copilot</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">有料ユーザー 150万人 | 開発速度 +55%</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Cursor / Devin</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">自律的コーディングエージェント — 急成長</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">AWS CodeWhisperer</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">クラウドプロバイダー統合 — 囲い込み戦略</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">エンジニア生産性市場</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">$4.1B → $22B (2030年) CAGR 32%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資ポイント</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">IDE統合 + ワークフロー深化 + テスト自動化</text>
</svg>
- **GitHub Copilot**: 150万有料ユーザー、$10-19/月、Microsoft傘下
- **Cursor**: エディタ統合型、急成長中、月間100万ユーザー
- **Replit AI**: クラウドIDE統合、教育市場に強み
- **Tabnine**: エンタープライズセキュリティ重視、$2.5億調達
- **生産性向上**: 平均55%のコード補完率、開発速度2倍

<!--
Fortune 500の42%がコード生成AI導入済み。ROI 3-5倍を実現。
-->

---

# 画像・動画生成

> *動画生成市場はCAGR 56%で$220億へ拡大、マーケティング変革を主導*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">画像・動画生成 — 投資機会</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Midjourney / DALL-E 3</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">クリエイティブ産業への浸透 — 月額10-30$/ユーザー</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Sora / Runway / Kling</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">動画生成 — 映像制作コスト 90% 削減可能性</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Adobe Firefly</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">既存ユーザー1億人への内蔵 — 最強分配戦略</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">エンターテインメントAI</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">ゲーム / 映画 / 広告クリエイティブ市場 $18B</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">投資注意点</text>
  <text x="735" y="309" fill="#9e9e9e" font-size="12" text-anchor="end" font-family="sans-serif">著作権訴訟リスク — Stability AI事例参照</text>
</svg>
- **画像生成**: Midjourney（推定$5億収益）、DALL-E 3、Stable Diffusion
- **動画生成**: Runway（$15億評価）、Pika Labs、Synthesia
- **3Dモデル**: Luma AI、Kaedim
- **ビジネス用途**: マーケティング素材、プロトタイピング、教育コンテンツ
- **市場規模**: $38億 → $220億（CAGR 56%）

<!--
クリエイターエコノミーへの浸透。Midjourneyは月間$5M+ ARR。
-->

---

# マルチモーダルAI

> *2028年までにLLMの80%がマルチモーダル化—医療・製造が先行採用*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">マルチモーダルAI — 次世代インターフェース</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">GPT-4o / Claude 3.5 Sonnet</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">テキスト+画像+音声の統合処理</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Gemini Ultra 2.0</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Google統合 — YouTube/Gmail/Search一体化</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">IoT + AI センサー連携</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">工場・医療・農業での実用化加速</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">AR/VR × AI</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Meta AI Glasses — 空間コンピューティング市場</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">マルチモーダル専門 $8.4B → $67B (2030)</text>
</svg>
- **GPT-4 Vision**: テキスト+画像理解、API提供中
- **Gemini Ultra**: Google、動画・音声・テキスト統合
- **Claude 3 Opus**: Anthropic、長文書+画像処理に強み
- **応用例**: 医療画像診断、製造検査、ドキュメント分析
- **市場予測**: 2028年までにLLMの80%がマルチモーダル化

<!--
次世代AIの標準仕様。エンタープライズユースケースが拡大中。
-->

---

# ヘルスケアAI市場概要

> *FDA承認AI医療機器が520件突破（前年比+42%）し規制市場で加速*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#e91e63" opacity="0.15"/>
  <text x="400" y="192" fill="#e91e63" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルスケアAI市場概要</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">$22B → $68B (2030年予測) | 最も社会的インパクト大</text>
</svg>
- **市場規模**: $180億（2026年） → $720億（2030年）
- **CAGR**: 48.3%
- **規制承認**: FDA承認AIデバイス520件（2025年）、前年比+42%
- **応用領域**: 創薬、診断、患者モニタリング、臨床意思決定支援
- **投資額**: 2025年に$128億のVC投資

<!--
規制ハードルは高いが、承認後の収益化は安定。リードタイムは3-7年。
-->

---

# AI創薬プラットフォーム

> *創薬期間を4年→18ヶ月に短縮しコスト70%削減が実証された先行企業*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI創薬プラットフォーム — 投資最前線</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Insilico Medicine</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AlphaFold活用 — 世界初AIデザイン薬Phase2</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Recursion Pharma</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">高スループットスクリーニング — $4B VAL</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Exscientia (買収済)</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AstraZeneca統合 — 創薬速度 +80%</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AI創薬プラットフォーム $1.2B → $9.8B</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資要点</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">開発期間短縮 + 失敗率低下 = IRR向上</text>
</svg>
- **Recursion Pharmaceuticals**: 時価総額$22億、臨床試験パイプライン18件
- **Insitro**: $27億評価、機械学習×生物学データ
- **Exscientia**: 英国、初のAI設計薬が臨床試験入り
- **AbCellera**: 抗体発見、時価総額$28億
- **成果**: 創薬期間を4年→18ヶ月に短縮、コスト70%削減

<!--
製薬大手との提携が鍵。Recursionは4社とパートナーシップ締結。
-->

---

# 医療画像診断

> *がん診断精度95%+を実現し画像診断AI市場が$140億に拡大中*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">医療画像診断AI — 投資機会</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Aidoc</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">緊急疾患検出 — 300以上の病院で採用</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Radiology AI (各社)</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">CTスキャン読影 — 精度98%超 × 速度10倍</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">IDx-DR (FDA承認済)</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">自動糖尿病網膜症スクリーニング</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">医療画像AI $2.1B → $8.5B (2030年)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本市場</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">キヤノンメディカル / 富士フイルム AI参入</text>
</svg>
- **放射線画像**: Aidoc（$2.5億調達）、急性疾患検出
- **病理診断**: PathAI（$5億評価）、がん診断精度95%+
- **眼科**: IDx-DR（FDA承認糖尿病網膜症検出）
- **心臓画像**: Ultromics、心エコー自動解析
- **市場規模**: $28億 → $140億（CAGR 49%）

<!--
保険償還が事業化の鍵。Medicare承認で市場が拡大。
-->

---

# パーソナライズ医療

> *治療成功率30%向上・副作用50%削減でゲノム精密医療が本格普及期へ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">パーソナライズ医療AI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ゲノム × AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">個人の遺伝子データで最適薬剤選択</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Apple Watch / CGM</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">リアルタイムバイタル監視 + AI予測</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">精神科AI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">うつ / 不安障害の早期発見 — 音声分析</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">デジタルヘルス全体 $220B → $660B (2030)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本規制</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">プログラム医療機器(SaMD)承認が増加中</text>
</svg>
- **ゲノム解析**: Tempus（$81億評価）、がん精密医療
- **治療最適化**: Paige AI、病理×ゲノムデータ統合
- **臨床試験マッチング**: Deep 6 AI、患者リクルート80%高速化
- **予防医療**: Freenome（$12億評価）、早期がん検出
- **効果**: 治療成功率30%向上、副作用50%削減

<!--
データパートナーシップが競争優位。Tempusは200病院とデータ契約。
-->

---

# 金融AI市場概要

> *大手金融機関の92%がAI活用しROI平均3.5倍・コスト削減25-40%を達成*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#4caf50" opacity="0.15"/>
  <text x="400" y="192" fill="#4caf50" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">金融AI市場概要</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">$15B → $44B (2030年) | 最も高い精度要求</text>
</svg>
- **市場規模**: $160億（2026年） → $640億（2030年）
- **CAGR**: 43.7%
- **応用領域**: 不正検知、与信審査、アルゴリズム取引、リスク管理
- **採用率**: 大手金融機関の92%がAI活用中
- **ROI**: 平均3.5倍、コスト削減25-40%

<!--
規制コンプライアンスが差別化要因。説明可能AI（XAI）が必須。
-->

---

# AI与信・審査

> *AI与信がデフォルト率75%削減・承認率15-20%向上で金融包摂を実現*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI与信・審査 — 投資機会</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Upstart Holdings</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AI与信スコア — 従来比 +27%精度 (上場企業)</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">ZestFinance</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">マシンラーニング与信 — 新興国展開加速</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">FICO vs AI モデル</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AIスコアが伝統的信用スコアを代替加速</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">日本市場</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Moneytree / J.Score — 信用情報革命</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">規制リスク</text>
  <text x="735" y="309" fill="#9e9e9e" font-size="12" text-anchor="end" font-family="sans-serif">公平性・説明可能性AI要件 厳格化</text>
</svg>
- **Upstart**: 時価総額$32億、AI与信モデル、デフォルト率75%削減
- **Zest AI**: 貸出承認率15-20%向上、公平性重視
- **Kasisto**: チャットバンキング、1,000万ユーザー
- **代替データ**: ソーシャル、決済、行動データを活用
- **市場規模**: $18億 → $92億（CAGR 51%）

<!--
金融包摂（Financial Inclusion）がビジネスチャンス。新興国で成長加速。
-->

---

# アルゴリズム取引

> *AI駆動ファンドが伝統型ファンドを年率8%上回り市場の60%をHFTが占有*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">アルゴリズム取引AI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">市場シェア</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">機関投資家取引の 70%+ がアルゴ取引</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">HFT to AI進化</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">高頻度取引 → LLM活用のセンチメント分析</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Two Sigma / D.E. Shaw</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">クォンツファンド AI武装 — 超過収益持続</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">リテール向け展開</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Robinhood / 楽天証券へのAIコピトレ浸透</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">B2B金融AI API + クォンツファンド上場株</text>
</svg>
- **HFT市場**: AI活用HFTが取引高の60%占める
- **強化学習**: 市場マイクロ構造学習、執行最適化
- **ポートフォリオ最適化**: Two Sigma、Citadel等ヘッジファンド
- **リテール**: Robinhood、eToro等がAI推奨機能
- **収益**: AI駆動ファンドは伝統的ファンドを年率8%上回る

<!--
競争優位は一時的。継続的モデル改善とデータ獲得が鍵。
-->

---

# 不正検知・AML

> *不正検知精度95%+・調査コスト60%削減で$180億市場へ最速拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">不正検知・AML (マネロン対策)</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Featurespace</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">適応型行動分析 — Visa採用 (HSBC等大手)</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Darktrace Finance</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">AIによるリアルタイム異常検知</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AML + 不正検知 AI $2.8B → $12B (2030)</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">規制ドライバー</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AML 罰則強化 → 銀行の強制投資</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本市場</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">三メガ銀行 AI不正検知システム刷新中</text>
</svg>
- **市場規模**: $32億 → $180億（CAGR 55%）
- **Featurespace**: ARIC Platform、誤検知90%削減
- **Sift**: デジタル不正検知、$5.5億調達
- **ComplyAdvantage**: AML/KYC自動化、8,000社導入
- **効果**: 検出精度95%+、調査コスト60%削減、リアルタイム対応

<!--
規制強化で需要拡大。EU AML規制、米国AMLA対応が必須。
-->

---

# 企業向けAIプラットフォーム

> *エンタープライズの68%が複数AIツール導入済みで$880億市場が確定的*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業向けAIプラットフォーム 構造</text>
  <!-- Layer stack -->
  <!-- Foundation Models -->
  <rect x="60" y="310" width="680" height="50" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="400" y="342" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤モデル層 — GPT-4 / Claude / Gemini / Llama</text>
  <!-- Platform -->
  <rect x="80" y="245" width="640" height="55" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="400" y="278" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIプラットフォーム層 — Fine-tuning / RAG / MLOps / ガードレール</text>
  <!-- Application -->
  <rect x="100" y="180" width="600" height="55" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="400" y="213" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">アプリケーション層 — コパイロット / 自動化 / 分析 / 顧客対応</text>
  <!-- Business Process -->
  <rect x="120" y="115" width="560" height="55" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="400" y="148" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ビジネスプロセス層 — 業務フロー統合 / ワークフロー自動化</text>
  <!-- Business Value -->
  <rect x="140" y="60" width="520" height="45" fill="#f9a825" rx="6"/>
  <text x="400" y="89" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ビジネス価値 — 生産性+30% / コスト削減-40% / 意思決定高速化</text>
  <!-- Arrows between layers -->
  <polygon points="396,108 404,108 400,117" fill="#ffffff"/>
  <polygon points="396,173 404,173 400,182" fill="#ffffff"/>
  <polygon points="396,238 404,238 400,247" fill="#ffffff"/>
  <polygon points="396,303 404,303 400,312" fill="#ffffff"/>
</svg>
- **市場規模**: $240億（2026年） → $880億（2030年）
- **CAGR**: 41.2%
- **主要プレイヤー**: Databricks（$430億評価）、Snowflake、C3 AI
- **応用**: データ分析、予測、業務自動化、意思決定支援
- **採用率**: エンタープライズの68%が複数AIツール導入済み

<!--
データインフラ統合が競争力。Databricksは年間ARR $16億。
-->

---

# AI-RPAハイブリッド

> *AI統合でRPA自動化率60%→85%向上しROIが2倍に改善*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI-RPAハイブリッド — 次世代自動化</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">UiPath + AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Process Mining × LLM — 自動化精度向上</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Microsoft Power Automate AI</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Copilot統合 — ノーコード自動化普及</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">SS&C Blue Prism</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">金融 / 保険業界 RPA市場シェア 30%</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AI-RPA $5.1B → $22B (2030年) CAGR 27%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">プロセス特化SaaS + コネクター収益</text>
</svg>
- **UiPath**: 時価総額$140億、AI統合で業務自動化進化
- **Automation Anywhere**: 生成AI機能追加、ドキュメント処理自動化
- **Blue Prism**: SS&C買収、エンタープライズ重点
- **市場トレンド**: RPA単体→AI統合型へシフト
- **効果**: 自動化率60% → 85%へ向上、ROI 2倍

<!--
次世代はAgent型自動化。複雑判断を含むEnd-to-End自動化が可能に。
-->

---

# ナレッジマネジメント

> *情報検索時間70%削減・従業員生産性35%向上をGlean等が実証*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">ナレッジマネジメントAI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Notion AI / Confluence AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">社内文書の自動要約・検索 — 市場急拡大</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Glean</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">企業向け AI検索 — Google Workspace代替</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Microsoft Copilot</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">Office 365統合 — 1億人ユーザーへ展開</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">RAG(検索拡張生成)</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">企業固有知識×LLM — 幻覚リスク大幅低減</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">市場機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">社内知識の70%がサイロ化 — 解決市場 $18B</text>
</svg>
- **社内検索**: Glean（$22億評価）、エンタープライズ情報統合検索
- **RAG活用**: 社内文書×LLMで精度向上
- **Notion AI**: ドキュメント生成・要約、100万有料ユーザー
- **Guru**: セールス・サポート向けナレッジ、$2億調達
- **効果**: 情報検索時間70%削減、従業員生産性35%向上

<!--
リモートワーク増加で需要拡大。セキュリティ・権限管理が重要。
-->

---

# カスタマーサービス

> *応答時間80%短縮・コスト40%削減でカスタマーサービスAIが$125億へ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">カスタマーサービスAI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Zendesk AI / Intercom</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">チケット自動解決率 45-65%</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Sierra (Benioff投資)</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">会話型AIエージェント — 感情理解</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Salesforce Einstein</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">CRM統合AI — 世界最大カスタマー基盤</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">カスタマーサービスAI $11B → $40B (2030)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ROI</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">対応速度 3倍 / コスト削減 40% / CSAT +15%</text>
</svg>
- **AIチャットボット**: Intercom（$13億評価）、自動応答率50-70%
- **音声AI**: Replicant（$1億調達）、電話サポート自動化
- **感情分析**: Forethought、顧客感情ベースのルーティング
- **市場規模**: $32億 → $125億（CAGR 41%）
- **効果**: 応答時間80%短縮、コスト40%削減、顧客満足度向上

<!--
ハイブリッド型（AI+人間）が主流。AI対応80%、人間エスカレーション20%。
-->

---

# 製造業AI応用

> *予知保全でダウンタイム45%削減・製造業の58%がAI導入済み*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#ab47bc" opacity="0.15"/>
  <text x="400" y="192" fill="#ab47bc" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">製造業AI応用</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">スマートファクトリー × AI — 製造業DX最前線</text>
</svg>
- **品質管理**: Cognex、コンピュータビジョン検査
- **予知保全**: Uptake（$24億評価）、設備故障予測、ダウンタイム削減45%
- **プロセス最適化**: Sight Machine、製造データ可視化・最適化
- **市場規模**: $52億 → $180億（CAGR 36%）
- **採用率**: 製造業の58%がAI導入済み

<!--
IoTセンサー×AIの統合が鍵。エッジ処理でリアルタイム対応。
-->

---

# サプライチェーン最適化

> *在庫コスト25-35%削減・納期遵守率90%+でサプライチェーン全体最適化*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">サプライチェーン最適化AI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Blue Yonder (Panasonic子会社)</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">需要予測精度 +30% — 在庫コスト削減</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">o9 Solutions</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">統合サプライチェーンAI — Fortune 500採用</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Amazon Supply Chain AI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">配送最適化 — コスト $5.2B削減実績</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">サプライチェーンAI $3.8B → $18B (2030)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">製造業AI投資 前年比 +52% (METI報告)</text>
</svg>
- **需要予測**: o9 Solutions（$37億評価）、予測精度20%向上
- **在庫最適化**: Blue Yonder、小売・物流向け、在庫削減30%
- **物流ルート最適化**: FourKites、リアルタイム追跡・予測
- **効果**: 在庫コスト25-35%削減、納期遵守率90%+
- **市場規模**: $38億 → $128億（CAGR 35%）

<!--
パンデミック後の供給網強靭化需要。マルチソース・リスク分散が焦点。
-->

---

# コンピュータビジョン

> *製造欠陥検出99%+・検査時間80%短縮でコンピュータビジョンが標準装備化*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">コンピュータビジョン — 製造業応用</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">品質検査AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Cognex / Keyence AIシステム — 誤検知率 -99%</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">予知保全AI</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">センサー × AI — 設備故障予測 95%精度</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">安全監視AI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">危険作業 / PPE確認 — 労災削減 60%</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">産業用コンピュータビジョン $12B → $48B</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本機会</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">ものづくり大国 — AI品質検査への移行特需</text>
</svg>
- **外観検査**: Landing AI（Andrew Ng創業）、製造欠陥検出精度99%+
- **異常検知**: Instrumental、PCB検査自動化
- **ロボティクス統合**: Covariant、倉庫ロボットのAI視覚
- **応用分野**: 自動車、電子機器、食品、医薬品製造
- **効果**: 検査時間80%短縮、見逃し率95%削減

<!--
少数データ学習（Few-shot Learning）技術で導入ハードル低下。
-->

---

# AIセキュリティ市場

> *エンタープライズセキュリティの74%がAI活用し$260億市場へ急拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#e91e63" opacity="0.15"/>
  <text x="400" y="192" fill="#e91e63" font-size="26" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIセキュリティ市場</text>
  <text x="400" y="222" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">$8B → $28B (2030年) | 攻撃はAI化 — 防御もAIが必要</text>
</svg>
- **市場規模**: $90億（2026年） → $260億（2030年）
- **CAGR**: 36.9%
- **応用**: 脅威検知、マルウェア分析、インシデントレスポンス
- **採用率**: エンタープライズセキュリティの74%がAI活用
- **投資**: 2025年にサイバーAI分野へ$58億投資

<!--
攻撃側もAI活用。AIディープフェイク、自動脆弱性発見への対抗が課題。
-->

---

# 次世代SOC

> *AI-SOCが脅威検出を数週間→数分（93%短縮）に圧縮し誤検知70%削減*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">次世代SOC（セキュリティオペレーションセンター）</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">CrowdStrike Falcon AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">EDR市場 35%シェア — AI脅威検出の覇者</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Microsoft Sentinel AI</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">クラウド統合SIEM — Azure顧客獲得戦略</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Darktrace</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">自己学習AI — 未知脅威の自律検知</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場成長ドライバー</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">ランサムウェア被害 $20B/年 → AI対策必須化</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">SOCの人手不足解消 — AI自動化で24/7対応</text>
</svg>
- **AI-SIEM**: Exabeam、行動分析ベースの脅威検知
- **自動脅威ハンティング**: CrowdStrike（時価総額$800億）、Falcon AI
- **XDR統合**: Palo Alto Cortex、エンドポイント・ネットワーク統合
- **SOAR**: Splunk Phantom、インシデント対応自動化
- **効果**: 脅威検出時間93%短縮（数週間→数分）、誤検知70%削減

<!--
セキュリティ人材不足が深刻。AI活用でアナリスト1人が10倍の処理能力。
-->

---

# マーテックAI

> *CVR 30%向上・CAC 35%削減でマーテックAIが年間ROI 2.5倍を実現*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">マーテックAI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Adobe Experience Cloud AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Firefly統合 — マーケティングAI最大手</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">HubSpot AI</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">SMB向けCRM AI — 利用者数 200万社突破</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Persado</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AI感情言語最適化 — CTR +200%実績</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">マーテックAI $18B → $62B (2030年)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">トレンド</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">パーソナライゼーション × ゼロパーティデータ</text>
</svg>
- **パーソナライゼーション**: Dynamic Yield（$3億でMcDonald's買収）
- **コンテンツ最適化**: Persado、AI生成コピー、CVR 30%向上
- **予測分析**: 6sense（$56億評価）、B2B購買意図予測
- **市場規模**: $28億 → $98億（CAGR 37%）
- **ROI**: マーケティング効率2.5倍、CAC 35%削減

<!--
プライバシー規制対応が重要。ファーストパーティデータ活用にシフト。
-->

---

# セールスAI

> *成約率25%向上・営業生産性40%向上でセールスAIが$72億市場へ急拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">セールスAI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Gong.io</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">会話インテリジェンス — セールス成約率 +25%</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Salesforce Einstein Copilot</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">商談予測 85%精度 — CRM市場制圧</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Outreach / Salesloft</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">セールスエンゲージメントAI — シーケンス最適化</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">セールスAI $5.2B → $19B (2030年)</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">Sansan AI / PHONE APPLI — 国産勢台頭</text>
</svg>
- **リード優先順位**: Clari（$47億評価）、商談クローズ確率予測
- **会話インテリジェンス**: Gong（$72億評価）、商談録音分析
- **セールスイネーブルメント**: Outreach、メール自動化・A/Bテスト
- **効果**: 成約率25%向上、営業生産性40%向上
- **市場規模**: $18億 → $72億（CAGR 42%）

<!--
CRM統合が鍵。Salesforce、HubSpot等とのエコシステムが重要。
-->

---

# 適応学習プラットフォーム

> *学習成果30%向上・中退率50%削減で適応学習が教育変革の中心へ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">適応学習プラットフォーム</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Duolingo AI</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AIパーソナライズ — 有料ユーザー 900万人</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Khan Academy Khanmigo</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">GPT-4統合 AI家庭教師 — 無料提供</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Coursera Coach AI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">学習パスの個別最適化</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">EdTech AI $4.7B → $20B (2030年) CAGR 27%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本市場</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">atama+ / スタディプラス — AI参入加速</text>
</svg>
- **Khan Academy**: Khanmigo AIチューター、個別学習パス
- **Duolingo**: 時価総額$70億、AI言語学習、DAU 4,300万
- **Course Hero**: AI宿題支援、月間6,000万ユーザー
- **市場規模**: $22億 → $85億（CAGR 40%）
- **効果**: 学習成果30%向上、中退率50%削減

<!--
教育格差解消がミッション。新興国市場で成長加速中。
-->

---

# AIチューター

> *2030年までに教師補助業務の60%をAIが担い個別指導コストを激減*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIチューター — 教育格差解消の切り札</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1対1チューターの民主化</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">年収$10万のプライベート家庭教師をAIが代替</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Carnegie Learning</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">数学AI — 標準テスト成績 +50%(研究結果)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Synthesis.com</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">SpaceX起源 — 算数・思考力AIトレーニング</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">リスク</text>
  <text x="735" y="257" fill="#9e9e9e" font-size="12" text-anchor="end" font-family="sans-serif">学習意欲への影響 / 批判的思考の低下懸念</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">新興国市場(インド/東南アジア)での高成長</text>
</svg>
- **24/7学習サポート**: Socratic by Google、質問→解説生成
- **個別指導**: Squirrel AI（中国）、ユーザー2,000万人
- **企業研修**: Coursera AI、スキルギャップ分析・推奨
- **アクセシビリティ**: 音声・視覚支援、多言語対応
- **市場予測**: 2030年までに教師の補助業務の60%をAI化

<!--
教師の代替ではなく補完。教師は指導・メンタリングに集中可能に。
-->

---

# 自動運転技術

> *Waymoが商用ロボタクシーを展開—完全自動運転の社会実装が加速中*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">自動運転技術 — 投資機会と現実</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Waymo</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">商用ロボタクシー SF/LA運営中 — L4達成</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Tesla FSD</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">AIビジョン単眼カメラ — $15/月 サブスク</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Mobileye (Intel子会社)</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">ADAS市場 45% シェア — 半導体+ソフト統合</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">自動運転 $54B → $556B (2035年) CAGR 32%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">トヨタ/ホンダ の ADAS vs 海外L4競争激化</text>
</svg>
- **Waymo**: Alphabet傘下、ロボタクシー商用化（SF、Phoenix）
- **Cruise**: GM傘下、$300億評価（規制問題で一時停止後再開）
- **Aurora**: トラック自動運転、$130億評価、2027年商用化目標
- **Tesla FSD**: Beta版100万台超、サブスク$99-199/月
- **市場規模**: $82億 → $420億（CAGR 51%）

<!--
レベル4実用化は2026-2028年が分岐点。規制・保険が課題。
-->

---

# ラストマイル配送

> *AI最適化で配送コスト削減と需要急増への対応が物流革新の主軸に*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">ラストマイル配送AI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Amazon Robotics</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">配送コスト $2.6/個 — AI最適ルート+ロボット</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Nuro</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">自律配送ロボット — $5.6B調達 (要注意)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Starship Technologies</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">歩道走行型ロボット — 欧州大学普及</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">ドローン配送</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Wing (Google) / Amazon Prime Air — 規制が障壁</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">ラストマイルAI $8.1B → $35B (2030年)</text>
</svg>
- **ドローン配送**: Zipline（$43億評価）、医療品配送、アフリカ・米国展開
- **配送ロボット**: Starship Technologies、大学・企業キャンパス導入
- **自動運転デリバリー**: Nuro（$86億評価）、食品・日用品配送
- **市場規模**: $18億 → $95億（CAGR 52%）
- **効果**: 配送コスト40%削減、配送時間50%短縮

<!--
都市部の規制緩和が鍵。郊外・地方から先行導入が進む。
-->

---

# 成功事例1: OpenAI / Anthropic

> *OpenAI・Anthropicが生成AIインフラを独占し企業採用の3.2倍増を牽引*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">成功事例1: OpenAI / Anthropic</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">OpenAI (2024年バリュー)</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">$157B — ChatGPT 5億WAU達成</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">API収益モデル</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Token課金 → 月次収益 $300M+</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Anthropic (2024年)</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">$7.3B調達 — Claude 3.5 Sonnet記録的評価</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">教訓: ネットワーク効果</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">ユーザー増 → データ増 → モデル改善 → 競合優位</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資示唆</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">垂直特化モデル開発企業 vs 汎用基盤モデル の分岐点</text>
</svg>
- **OpenAI**: 推定評価$800億、ChatGPT 2億MAU、年間収益$20億+
- **ビジネスモデル**: API（$0.002-0.12/1K tokens）、ChatGPT Plus（$20/月）、エンタープライズ
- **Anthropic**: 評価$180億、Claude 3、憲法AI（Constitutional AI）
- **差別化**: OpenAI=スピード・スケール、Anthropic=安全性・信頼性
- **成功要因**: 基盤モデル→アプリケーション層への垂直統合

<!--
Microsoft（OpenAI）とGoogle（Anthropic）の戦略投資。AIインフラを支配。
-->

---

# 成功事例2: Scale AI

> *Scale AIが$1.4B評価でAIデータ供給チェーンを掌握する独自ポジション*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">成功事例2: Scale AI</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">バリュエーション</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">$14B (2024年) — AI最重要インフラ企業</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">ビジネスモデル</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">AI学習データ標注 + RLHF + 評価サービス</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">顧客リスト</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">OpenAI / Meta / Microsoft / DoD — 超優良顧客</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">Alexandr Wang (CEO)</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">最年少セルフメイドビリオネアの経営判断力</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">リスク</text>
  <text x="735" y="309" fill="#9e9e9e" font-size="12" text-anchor="end" font-family="sans-serif">AIモデルの自己改善能力向上で需要変化の可能性</text>
</svg>
- **評価額**: $73億（2021年Series E）
- **事業**: AIトレーニングデータのラベリング・キュレーション
- **顧客**: OpenAI、Meta、US DoD、トヨタ等500社+
- **年間収益**: $3億+（2024年推定）
- **成功要因**: 高品質データ＋垂直統合（自動運転、LLM、ロボティクス）

<!--
「データがAIの石油」を体現。政府契約（国防総省$1.1億）で信頼性確立。
-->

---

# 成功事例3: UiPath

> *UiPathがAI統合でRPA自動化率を85%まで引き上げROI 2倍を実証*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">成功事例3: UiPath</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">市場</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">RPA市場 $1.8B → $13.5B — AI統合で再成長</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">株価</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">2021年ピーク $45 → 2024年 $18 (要精査)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">AI-RPA統合</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">DocPath AI + LLM統合 — 次世代自動化</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">競合</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Automation Anywhere / Blue Prism との三つ巴</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">教訓</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AI統合の遅れ → バリュエーション剥落 → 教訓</text>
</svg>
- **時価総額**: $140億（2024年）
- **事業**: RPA + AI統合プラットフォーム
- **顧客**: 10,500社、Fortune 500の65%
- **ARR**: $14億（2024年）、NRR 115%
- **成功要因**: エンタープライズ浸透→AI機能追加でアップセル

<!--
IPO後の株価変動あるも、エンタープライズ基盤は堅固。AI統合で成長再加速。
-->

---

# 成功事例4: Tempus

> *Tempusが$81B評価でゲノム×AI精密医療の標準プラットフォームを確立*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">成功事例4: Tempus</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">IPO (2024年6月)</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Nasdaq上場 — 初日終値 $41 バリュー$10.7B</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">ビジネスモデル</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">臨床データ × AI → 製薬企業への洞察販売</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">データアドバンテージ</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">50万人以上の患者ゲノムデータ保有</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">パートナー</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AstraZeneca / Pfizer / GSK — ビッグファーマ全社</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">教訓</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">データモートが最強の参入障壁 — 他社追随困難</text>
</svg>
- **評価額**: $81億（2024年IPO）
- **事業**: がん精密医療、ゲノムデータ×AI診断
- **データ**: 世界最大級のがん臨床・分子データベース
- **顧客**: 65%の米国がんセンター、医師2万人+
- **成功要因**: データネットワーク効果＋規制承認

<!--
創業者Eric Lefkofsky（Groupon創業者）。データ優位性が参入障壁。
-->

---

# エッジAI・オンデバイス処理

> *エッジAI市場が2028年に$38億へ拡大しスマートフォン・IoT標準化が進行*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">エッジAI・オンデバイス処理 — 次のフロンティア</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Apple Neural Engine</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">iPhone 16 AI — On-device LLM推論 が普及</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Qualcomm Snapdragon AI</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Android AI — スマートフォン全体に展開</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">IoTエッジAI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">クラウド依存不要 — リアルタイム推論</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">市場規模</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">エッジAI $15B → $107B (2030年) CAGR 32%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">プライバシーメリット</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">データがデバイスから出ない — 規制対応優位</text>
</svg>
- **トレンド**: クラウド→エッジへシフト、プライバシー・レイテンシ対応
- **Qualcomm**: スマホAIチップ、Snapdragon 8 Gen 3
- **Apple**: Neural Engine、デバイス上で画像・音声処理
- **NVIDIA Jetson**: エッジAIコンピューティング、産業・ロボティクス
- **市場規模**: $28億 → $180億（CAGR 59%）

<!--
5G普及で分散AI処理が実用化。医療、製造、自動運転で重要。
-->

---

# マルチモーダル統合

> *2028年までにLLMの80%がマルチモーダル化し単一モデルで全メディア処理*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">マルチモーダル統合 — 2026年以降のトレンド</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Video Understanding</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Google Gemini 1.5 Pro — 1時間動画理解</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Audio + Vision + Text</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">GPT-4o Real-time — 人間同等の自然会話</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">3D/空間AI</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">Apple Vision Pro × AI — 空間コンピューティング</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">マルチモーダルデータ処理インフラ + アプリ層</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">日本機会</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">ロボット × マルチモーダルAI — 少子化解決策</text>
</svg>
- **次世代AI標準**: テキスト・画像・音声・動画を統合理解
- **GPT-4V, Gemini Ultra**: すでに実用化、API提供
- **応用**: 医療診断、製造検査、教育、カスタマーサポート
- **技術**: Transformer統合、クロスモーダル学習
- **予測**: 2028年までに主要LLMの80%がマルチモーダル化

<!--
単一モダリティの限界突破。ユースケースが飛躍的に拡大。
-->

---

# AI Agents & Orchestration

> *AIエージェントが業務自動化の次フェーズとなりオーケストレーション市場急拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI Agents &amp; Orchestration — 次世代アーキテクチャ</text>
  <!-- Orchestrator -->
  <rect x="280" y="65" width="240" height="65" fill="#f9a825" rx="8"/>
  <text x="400" y="95" fill="#1a1a2e" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">オーケストレーター</text>
  <text x="400" y="118" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">タスク分解 / ルーティング / 結果統合</text>
  <!-- Sub-agents -->
  <!-- Research Agent -->
  <rect x="50" y="190" width="150" height="55" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="125" y="215" fill="#e91e63" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">調査エージェント</text>
  <text x="125" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">Web検索・文書解析</text>
  <!-- Code Agent -->
  <rect x="220" y="190" width="150" height="55" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="295" y="215" fill="#29b6f6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">コードエージェント</text>
  <text x="295" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">生成・テスト・実行</text>
  <!-- Analysis Agent -->
  <rect x="390" y="190" width="150" height="55" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="465" y="215" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">分析エージェント</text>
  <text x="465" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">データ処理・推論</text>
  <!-- Action Agent -->
  <rect x="560" y="190" width="150" height="55" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="635" y="215" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">アクションエージェント</text>
  <text x="635" y="235" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">API呼出・自動実行</text>
  <!-- Arrows from orchestrator -->
  <line x1="340" y1="130" x2="125" y2="190" stroke="#ffffff" stroke-width="1.5"/>
  <polygon points="125,189 120,198 130,198" fill="#ffffff"/>
  <line x1="370" y1="130" x2="295" y2="190" stroke="#ffffff" stroke-width="1.5"/>
  <polygon points="295,189 290,198 300,198" fill="#ffffff"/>
  <line x1="430" y1="130" x2="465" y2="190" stroke="#ffffff" stroke-width="1.5"/>
  <polygon points="465,189 460,198 470,198" fill="#ffffff"/>
  <line x1="460" y1="130" x2="635" y2="190" stroke="#ffffff" stroke-width="1.5"/>
  <polygon points="635,189 630,198 640,198" fill="#ffffff"/>
  <!-- Tools layer -->
  <rect x="100" y="300" width="600" height="50" fill="#16213e" stroke="#ffffff" stroke-width="1" rx="6"/>
  <text x="400" y="321" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ツール層 — Web検索 / コードインタープリタ / DB / API / ファイルシステム</text>
  <text x="400" y="341" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">外部サービス連携 / クラウドリソース / 社内システム</text>
  <!-- Investment note -->
  <text x="400" y="385" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">エージェント市場: 2025年 $5B → 2030年 $65B (CAGR 67%)</text>
</svg>
- **自律型エージェント**: タスク分解→実行→フィードバックの自律ループ
- **AutoGPT, BabyAGI**: オープンソース自律エージェント
- **エンタープライズ**: Adept（$3.5億調達）、業務自動化エージェント
- **マルチエージェント**: 複数AIが協調して複雑タスク実行
- **市場予測**: 2027年までにAI支出の40%がエージェント型に

<!--
現在のチャット型→将来のエージェント型へパラダイムシフト。
-->

---

# Small Language Models

> *SLMがオンデバイス推論を実現しプライバシー保護×低コストの新市場を形成*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">Small Language Models (SLM) — 競合視点</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Phi-3 (Microsoft)</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">3.8Bパラメータで GPT-3.5相当 — コスト1/10</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Mistral 7B</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">オープンソース — エンタープライズ採用急増</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Llama 3 (Meta)</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">Meta オープンソース戦略 — エコシステム構築</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">コスト優位性</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">GPT-4比 API費用 95% 削減可能</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資示唆</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">基盤モデルのコモディティ化 → アプリ層へ投資移行</text>
</svg>
- **トレンド**: 巨大LLMの効率化、コスト・環境負荷削減
- **Mistral 7B**: オープンウェイト、GPT-3.5並み性能、1/10サイズ
- **Phi-2（Microsoft）**: 27億パラメータ、教育データで高性能
- **エッジ展開**: デバイス上で動作、プライバシー保護
- **コスト削減**: 推論コスト90%削減、レイテンシ1/5

<!--
ビッグテックの「規模の経済」優位性が低下。スタートアップにチャンス。
-->

---

# AI規制動向

> *EU AI Act施行で規制対応コストが上昇し先行企業に競合優位が発生*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI規制動向 — 投資リスク評価</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">EU AI Act (2024年施行)</text>
  <text x="735" y="101" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">高リスクAI規制 / 汎用AIモデル開示義務</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">米国 AI Executive Order</text>
  <text x="735" y="153" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">安全性・透明性・説明可能性 要件</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">中国 AI規制</text>
  <text x="735" y="205" fill="#9e9e9e" font-size="12" text-anchor="end" font-family="sans-serif">国家安全 + アルゴリズム透明性 — 独自規制</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">日本 AIガイドライン</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">プリンシプルベース — 欧州より柔軟</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">投資戦略</text>
  <text x="735" y="309" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">規制準拠ツール(Explainable AI)市場が成長機会</text>
</svg>
- **EU AI Act**: 2024年成立、リスクベース規制、罰金最大€3,500万or売上7%
- **米国行政命令**: 2023年10月、安全基準・透明性要求
- **中国生成AI規制**: 2023年8月施行、コンテンツ審査義務
- **日本AI戦略**: 2024年、規制柔軟、イノベーション重視
- **影響**: コンプライアンスコスト増、参入障壁上昇

<!--
規制対応が競争優位に。早期対応企業が市場シェア獲得。
-->

---

# バイアス・公平性

> *バイアス検出・公平性保証が規制要件化し専門ツール市場が急拡大中*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイアス・公平性 — ESG投資リスク</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">採用AIバイアス</text>
  <text x="735" y="101" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">Amazon採用AI廃止事例 — 人種・性別バイアス</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">信用スコアバイアス</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">歴史データのバイアス再生産 — 規制強化</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">医療AIバイアス</text>
  <text x="735" y="205" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">特定人種への診断精度差 — 研究多数</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Responsible AI市場</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AI倫理・説明可能性ツール $1.2B → $8B</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">ESG観点</text>
  <text x="735" y="309" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">AI公平性は ESG評価 E, S, G すべてに影響</text>
</svg>
- **課題**: 訓練データの偏り→差別的出力（人種、性別、年齢）
- **事例**: Amazon採用AI（女性差別）、顔認識（有色人種誤認）
- **対策技術**: Fairness-aware ML、Bias Detection Tools、Adversarial Debiasing
- **企業対応**: IBM AI Fairness 360、Google What-If Tool
- **規制**: EU AI ActでHigh-Riskシステムに公平性監査義務

<!--
ESG投資観点で重要。倫理的AI開発が投資判断基準に。
-->

---

# データプライバシー

> *データプライバシー法整備で合規コスト増大、プライバシーテック市場が拡大*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">データプライバシー — AI投資家の必須チェック</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">GDPR (欧州)</text>
  <text x="735" y="101" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">違反罰則最大 売上 4% — OpenAI vs イタリア例</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">個人情報保護法 (日本)</text>
  <text x="735" y="153" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">2022年改正 — AIへの適用解釈が課題</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">差分プライバシー技術</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">Apple / Google採用 — プライバシー保護AI</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">Federated Learning</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">データを移動せずモデル訓練 — 次のスタンダード</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">投資機会</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">Privacy-Enhancing Technology (PET) 市場 急成長</text>
</svg>
- **GDPR**: EU、個人データ保護、AI処理に制約
- **CCPA/CPRA**: カリフォルニア州、消費者データ権利
- **連合学習**: データを集約せずモデル学習、プライバシー保護
- **差分プライバシー**: 個人特定不可能な統計手法
- **市場機会**: プライバシー重視AIが差別化要因

<!--
医療、金融分野で特に重要。プライバシーテックへの投資増加中。
-->

---

# 主要プレイヤーマップ

> *OpenAI・Google・Microsoftが3強として市場の70%を独占する寡占構造*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要プレイヤーマップ — AIアプリケーション</text>
  <!-- Columns: Infrastructure, Platform, Application -->
  <text x="170" y="65" fill="#f9a825" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">インフラ</text>
  <text x="400" y="65" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">プラットフォーム</text>
  <text x="630" y="65" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">アプリケーション</text>
  <!-- Column separators -->
  <line x1="285" y1="55" x2="285" y2="380" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
  <line x1="515" y1="55" x2="515" y2="380" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
  <!-- Infrastructure players -->
  <rect x="90" y="80" width="160" height="35" fill="#16213e" stroke="#f9a825" stroke-width="1" rx="4"/>
  <text x="170" y="103" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">NVIDIA (GPU)</text>
  <rect x="90" y="125" width="160" height="35" fill="#16213e" stroke="#f9a825" stroke-width="1" rx="4"/>
  <text x="170" y="148" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">AWS / Azure / GCP</text>
  <rect x="90" y="170" width="160" height="35" fill="#16213e" stroke="#f9a825" stroke-width="1" rx="4"/>
  <text x="170" y="193" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">Intel / AMD / TSMC</text>
  <rect x="90" y="215" width="160" height="35" fill="#16213e" stroke="#f9a825" stroke-width="1" rx="4"/>
  <text x="170" y="238" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">CoreWeave / Lambda</text>
  <!-- Platform players -->
  <rect x="318" y="80" width="165" height="35" fill="#16213e" stroke="#e91e63" stroke-width="1" rx="4"/>
  <text x="400" y="103" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">OpenAI / Anthropic</text>
  <rect x="318" y="125" width="165" height="35" fill="#16213e" stroke="#e91e63" stroke-width="1" rx="4"/>
  <text x="400" y="148" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">Google / Meta AI</text>
  <rect x="318" y="170" width="165" height="35" fill="#16213e" stroke="#e91e63" stroke-width="1" rx="4"/>
  <text x="400" y="193" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">Mistral / Cohere</text>
  <rect x="318" y="215" width="165" height="35" fill="#16213e" stroke="#e91e63" stroke-width="1" rx="4"/>
  <text x="400" y="238" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">Scale AI / Weights&amp;B</text>
  <!-- Application players -->
  <rect x="545" y="80" width="165" height="35" fill="#16213e" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="103" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">GitHub Copilot</text>
  <rect x="545" y="125" width="165" height="35" fill="#16213e" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="148" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">Cursor / Devin</text>
  <rect x="545" y="170" width="165" height="35" fill="#16213e" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="193" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">UiPath / Automation</text>
  <rect x="545" y="215" width="165" height="35" fill="#16213e" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="238" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">Salesforce / ServiceNow</text>
  <!-- Key insight -->
  <rect x="60" y="310" width="680" height="50" fill="#16213e" rx="6"/>
  <text x="400" y="333" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資機会: プラットフォーム層のコモディティ化進行中</text>
  <text x="400" y="352" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">差別化はアプリケーション層のドメイン特化 + データモート構築</text>
</svg>
- **Big Tech**: Google、Microsoft、Amazon、Apple、Meta（資本・データ優位）
- **AI専業メガコーン**: OpenAI、Anthropic、Databricks（技術先行）
- **エンタープライズ**: Salesforce、ServiceNow、SAP（既存顧客基盤）
- **垂直特化**: Tempus（医療）、Upstart（金融）、Scale AI（データ）
- **スタートアップ**: 数千社、多様なニッチ市場

<!--
プラットフォーム vs アプリケーション層の競争。垂直統合が進む。
-->

---

# 差別化要因分析

> *垂直統合×規制対応×エッジ展開が3年間の差別化を決定する3要素*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">差別化要因分析 — 持続的競争優位の源泉</text>
  <!-- 5 factors as columns -->
  <!-- Data Moat -->
  <rect x="30" y="65" width="130" height="285" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="95" y="95" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">データモート</text>
  <text x="95" y="130" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">独自データ</text>
  <text x="95" y="150" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">蓄積規模</text>
  <text x="95" y="190" fill="#f9a825" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★★</text>
  <text x="95" y="240" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">最も持続的な</text>
  <text x="95" y="258" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">優位性</text>
  <!-- Network effects -->
  <rect x="175" y="65" width="130" height="285" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="240" y="95" fill="#e91e63" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ネットワーク効果</text>
  <text x="240" y="130" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">ユーザー増加で</text>
  <text x="240" y="150" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">価値増大</text>
  <text x="240" y="190" fill="#e91e63" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Domain expertise -->
  <rect x="320" y="65" width="130" height="285" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="385" y="95" fill="#29b6f6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ドメイン特化</text>
  <text x="385" y="130" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">業界特有知識</text>
  <text x="385" y="150" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">専門性</text>
  <text x="385" y="190" fill="#29b6f6" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Distribution -->
  <rect x="465" y="65" width="130" height="285" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="530" y="95" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">流通チャネル</text>
  <text x="530" y="130" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">顧客基盤</text>
  <text x="530" y="150" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">既存関係</text>
  <text x="530" y="190" fill="#4caf50" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <!-- Tech IP -->
  <rect x="610" y="65" width="140" height="285" fill="#16213e" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="680" y="95" fill="#ab47bc" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">技術IP</text>
  <text x="680" y="130" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">特許・独自</text>
  <text x="680" y="150" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">アルゴリズム</text>
  <text x="680" y="190" fill="#ab47bc" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <text x="680" y="240" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">模倣リスク</text>
  <text x="680" y="258" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">あり</text>
  <!-- Key takeaway -->
  <text x="400" y="378" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資先選定: データモート + ネットワーク効果の両立企業を優先</text>
</svg>
- **データ**: 独自データセット、ネットワーク効果（Scale AI、Tempus）
- **モデル**: 基盤モデル開発能力（OpenAI、Anthropic、Google）
- **ドメイン専門性**: 垂直市場知見（Harvey法務、PathAI病理）
- **統合**: 既存ワークフロー組込み（GitHub Copilot、Notion AI）
- **コンプライアンス**: 規制対応・認証（FDA、SOC2、ISO）

<!--
単なるLLM APIラッパーは持続不可能。差別化要因の組合せが鍵。
-->

---

# M&A・提携動向

> *M&A活発化で大手による垂直AI企業の取り込みが加速—早期投資が必須*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">タイムライン・マイルストーン 2026-2030</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">2026年 H1</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AIエージェント実用化加速 / EU AI Act本格施行</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">2026年 H2</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">マルチモーダルAI汎用化 / SLM市場拡大</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">2027年</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">エッジAI普及 / ヘルスケアAI規制整備</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">2028-2029年</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AI-ロボット統合 / 自動運転L4商用化拡大</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">2030年</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">AGIへの移行兆候? / AI市場 $1.8T到達予測</text>
</svg>
- **大型買収**: Databricks→MosaicML（$13億）、Snowflake→Neeva（$1.85億）
- **戦略投資**: Microsoft→OpenAI（$130億）、Google→Anthropic（$20億+）
- **パートナーシップ**: AWS×Anthropic、Oracle×Cohere
- **統合トレンド**: データ基盤＋AIモデル＋アプリケーション垂直統合
- **予測**: 2026-2027年に統合加速、中堅AI企業の多くが買収対象

<!--
ビッグテックのAI覇権争い。独立系スタートアップは出口戦略が重要。
-->

---

# 投資推奨セクター

> *生成AI・ヘルスケアAI・金融AIの3セクターが最高リターン期待の最優先投資先*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨セクター — 優先度マトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="#ffffff" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="#ffffff" stroke-width="2"/>
  <!-- Labels -->
  <text x="420" y="370" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">市場成長率 →</text>
  <text x="45" y="200" fill="#ffffff" font-size="14" text-anchor="middle" transform="rotate(-90,45,200)" font-family="sans-serif">投資収益性 →</text>
  <!-- Quadrant labels -->
  <text x="600" y="90" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">★ 最優先投資</text>
  <text x="250" y="90" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">高収益・低成長</text>
  <text x="600" y="280" fill="#e91e63" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">高成長・低収益</text>
  <text x="250" y="280" fill="#9e9e9e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">様子見</text>
  <!-- Zone lines -->
  <line x1="420" y1="60" x2="420" y2="340" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="100" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Sector dots -->
  <!-- AI Agents -->
  <circle cx="660" cy="110" r="22" fill="#f9a825"/>
  <text x="660" y="106" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIエージェント</text>
  <text x="660" y="120" fill="#1a1a2e" font-size="10" text-anchor="middle" font-family="sans-serif">+185%</text>
  <!-- GenAI -->
  <circle cx="610" cy="130" r="20" fill="#e91e63"/>
  <text x="610" y="126" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">生成AI</text>
  <text x="610" y="140" fill="#ffffff" font-size="10" text-anchor="middle" font-family="sans-serif">+142%</text>
  <!-- Healthcare AI -->
  <circle cx="540" cy="145" r="18" fill="#29b6f6"/>
  <text x="540" y="142" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルスAI</text>
  <text x="540" y="156" fill="#1a1a2e" font-size="10" text-anchor="middle" font-family="sans-serif">+98%</text>
  <!-- Enterprise AI -->
  <circle cx="480" cy="160" r="16" fill="#4caf50"/>
  <text x="480" y="157" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業AI</text>
  <text x="480" y="170" fill="#1a1a2e" font-size="10" text-anchor="middle" font-family="sans-serif">+78%</text>
  <!-- Finance AI -->
  <circle cx="220" cy="140" r="16" fill="#ab47bc"/>
  <text x="220" y="137" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">金融AI</text>
  <text x="220" y="150" fill="#ffffff" font-size="10" text-anchor="middle" font-family="sans-serif">+65%</text>
</svg>
- **最優先**: 生成AI（エンタープライズSaaS統合型）、ヘルスケアAI（規制承認済）
- **高優先**: 金融AI（不正検知・与信）、サイバーセキュリティAI
- **成長期**: エンタープライズAI（業務自動化）、製造AI（品質・保全）
- **新興**: エッジAI、AI Agents、Small LM
- **避けるべき**: LLM APIラッパーのみ、差別化なし汎用チャットボット

<!--
ポートフォリオ配分: 最優先50%、高優先30%、成長期15%、新興5%を推奨。
-->

---

# リスク・リターン分析

> *高CAGR×参入障壁×規制対応の3軸でリスク調整後リターンを最大化*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク・リターン分析 — AIセクター</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="#ffffff" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="#ffffff" stroke-width="2"/>
  <!-- Labels -->
  <text x="420" y="370" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">リスク →</text>
  <text x="45" y="200" fill="#ffffff" font-size="14" text-anchor="middle" transform="rotate(-90,45,200)" font-family="sans-serif">期待リターン →</text>
  <!-- Efficient frontier curve -->
  <path d="M 150,320 C 200,280 280,230 380,180 S 520,130 620,100 S 700,90 740,85" fill="none" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="600" y="80" fill="#f9a825" font-size="12" font-family="sans-serif">効率フロンティア</text>
  <!-- Investment options -->
  <!-- Foundation models (high risk, high return) -->
  <circle cx="620" cy="110" r="20" fill="#e91e63"/>
  <text x="620" y="107" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤モデル</text>
  <text x="620" y="140" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +180%</text>
  <!-- Mid-tier apps (medium risk) -->
  <circle cx="430" cy="185" r="18" fill="#29b6f6"/>
  <text x="430" y="182" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIアプリ</text>
  <text x="430" y="215" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +95%</text>
  <!-- Enterprise tools (lower risk) -->
  <circle cx="260" cy="255" r="16" fill="#f9a825"/>
  <text x="260" y="252" fill="#1a1a2e" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業ツール</text>
  <text x="260" y="282" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +45%</text>
  <!-- AI ETFs (low risk) -->
  <circle cx="170" cy="295" r="14" fill="#4caf50"/>
  <text x="170" y="292" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI ETF</text>
  <text x="170" y="320" fill="#ffffff" font-size="10" text-anchor="middle" font-family="sans-serif">期待: +28%</text>
  <!-- Recommendation -->
  <rect x="100" y="55" width="200" height="60" fill="#16213e" stroke="#f9a825" stroke-width="1" rx="4"/>
  <text x="200" y="78" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨配分</text>
  <text x="200" y="98" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">ETF 40% / AIアプリ 35%</text>
  <text x="200" y="112" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">基盤モデル株 25%</text>
</svg>
- **高リターン・高リスク**: 生成AI、自動運転（規制・技術リスク）
- **高リターン・中リスク**: ヘルスケアAI、金融AI（規制明確化）
- **中リターン・低リスク**: エンタープライズAI（既存市場）
- **分散投資**: セクター、ステージ（シード〜レイトステージ）、地域を分散
- **リスク要因**: 規制変化、技術陳腐化、競合激化、人材獲得

<!--
AIバブル懸念あり。ファンダメンタル重視（収益、顧客リテンション、Unit Economics）。
-->

---

# タイムライン・マイルストーン

> *2026年Q2までに投資判断を完了しないと先行者優位を逃すタイムライン*

- **短期（2026-2027）**: エンタープライズAI普及、規制枠組み確立、IPO増加
- **中期（2028-2029）**: マルチモーダルAI標準化、エージェント型普及、医療AI商用化
- **長期（2030+）**: AGI研究進展、自動運転レベル5実用化、AI+ロボティクス統合
- **投資戦略**: 短期=収益化済企業、中期=技術先行企業、長期=研究開発型
- **出口**: M&A（3-5年）、IPO（5-7年）、長期保有（10年+）

<!--
AI投資サイクルは加速。従来10年→5年に短縮。早期エグジット機会増加。
-->

---

# キーテイクアウェイ

> *生成AI・ヘルスケアAI・金融AIへの早期集中投資が5年間の超過リターンを確定*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">キーテイクアウェイ</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">AIエージェントが最大機会</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">CAGR 67% — 2025-2030年 最優先投資</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">垂直統合が差別化</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">汎用AIのコモディティ化 → ドメイン特化が生き残る</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">データモートが最強</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">AIの時代 最強の参入障壁 = ドメイン固有データ</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">規制を先取りする</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">Responsible AI準拠が信頼と競争優位の源泉</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">分散投資原則</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" text-anchor="end" font-family="sans-serif">AI ETF + コア株 + 高成長スタートアップの3層</text>
</svg>
- **市場成長**: AI市場は2030年まで年45%成長、$8,260億市場
- **投資焦点**: 生成AI×エンタープライズ、ヘルスケアAI、金融AI不正検知
- **差別化**: データ、ドメイン専門性、規制対応が競争優位
- **リスク**: 規制強化、技術変化、バブル懸念に注意
- **タイミング**: 2026-2027年が投資好機、規制明確化・収益化加速期


---

# 推奨アクション

> *3分野への投資コミットを今四半期中に決定し先行者優位を獲得せよ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨アクション</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">今すぐ: ETF購入</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">BOTZ / AIQ / ROBO — 分散AI投資の基本</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Q1 2026: コア株選定</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" text-anchor="end" font-family="sans-serif">NVDA + TSMC + ASML + Anthropic株 (非上場注意)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Q2 2026: セクター特化</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" text-anchor="end" font-family="sans-serif">ヘルスケアAI + 金融AI セクターへの集中</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">継続: スタートアップ</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" text-anchor="end" font-family="sans-serif">エンジェル / VC ファンド経由 — 高リスク枠</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">常時: リバランス</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" text-anchor="end" font-family="sans-serif">四半期毎に評価 — AIの進化速度に合わせる</text>
</svg>
- **ポートフォリオ構築**: 生成AI 30%、ヘルスケア20%、金融15%、エンタープライズ15%、その他20%
- **デューデリジェンス**: 収益モデル、顧客リテンション、規制対応、技術差別化を重点評価
- **モニタリング**: 四半期ごとのAI規制・技術トレンド追跡
- **ネットワーク**: AI企業創業者、VC、研究者とのリレーション構築
- **次回**: 個別投資案件の詳細評価セッション

