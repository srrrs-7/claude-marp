// Patch script: add inline SVGs to ai-growth-apps-investment slides
import { readFileSync, writeFileSync } from "fs";

const filePath = new URL("slides-data.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";

const svgStyle = `viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`;

// SVG: AI Investment Landscape Map (slide 6 - 高成長AI応用分野マップ)
const aiLandscapeMap = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">高成長AI応用分野 投資ランドスケープ</text>
  <!-- GenAI -->
  <ellipse cx="200" cy="130" rx="95" ry="55" fill="${ACCENT1}" opacity="0.85"/>
  <text x="200" y="125" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">生成AI</text>
  <text x="200" y="145" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">$35B → $105B</text>
  <!-- Healthcare AI -->
  <ellipse cx="480" cy="115" rx="80" ry="50" fill="${ACCENT2}" opacity="0.85"/>
  <text x="480" y="110" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルスケアAI</text>
  <text x="480" y="130" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$22B → $68B</text>
  <!-- Enterprise AI -->
  <ellipse cx="660" cy="180" rx="90" ry="55" fill="#29b6f6" opacity="0.85"/>
  <text x="660" y="175" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業向けAI</text>
  <text x="660" y="195" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">$18B → $52B</text>
  <!-- Finance AI -->
  <ellipse cx="170" cy="280" rx="80" ry="50" fill="#4caf50" opacity="0.85"/>
  <text x="170" y="275" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">金融AI</text>
  <text x="170" y="295" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">$15B → $44B</text>
  <!-- Security AI -->
  <ellipse cx="400" cy="280" rx="75" ry="48" fill="#ff7043" opacity="0.85"/>
  <text x="400" y="275" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIセキュリティ</text>
  <text x="400" y="295" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$8B → $28B</text>
  <!-- Manufacturing AI -->
  <ellipse cx="620" cy="310" rx="80" ry="48" fill="#ab47bc" opacity="0.85"/>
  <text x="620" y="305" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">製造業AI</text>
  <text x="620" y="325" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$12B → $38B</text>
  <!-- Legend -->
  <text x="400" y="380" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">サイズ = 市場規模 | 数値 = 2025年 → 2030年予測</text>
</svg>`;

// SVG: Market size forecast chart (slide 7)
const marketForecast = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI分野別 市場規模予測（2026-2030年）</text>
  <!-- Y axis -->
  <line x1="80" y1="60" x2="80" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- X axis -->
  <line x1="80" y1="340" x2="760" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- Y axis labels -->
  <text x="70" y="340" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">0</text>
  <text x="70" y="260" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">50B</text>
  <text x="70" y="180" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">100B</text>
  <text x="70" y="100" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">150B</text>
  <!-- Grid lines -->
  <line x1="80" y1="260" x2="760" y2="260" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="180" x2="760" y2="180" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="100" x2="760" y2="100" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <!-- X axis years -->
  <text x="155" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2026</text>
  <text x="295" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2027</text>
  <text x="435" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2028</text>
  <text x="575" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2029</text>
  <text x="715" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2030</text>
  <!-- GenAI line: 40, 58, 78, 96, 115B -->
  <polyline points="155,228 295,200 435,168 575,144 715,112" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <text x="725" y="112" fill="${ACCENT1}" font-size="11" font-family="sans-serif">生成AI</text>
  <!-- Healthcare line: 28, 38, 50, 60, 70B -->
  <polyline points="155,256 295,236 435,212 575,192 715,172" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="725" y="172" fill="${ACCENT2}" font-size="11" font-family="sans-serif">ヘルスAI</text>
  <!-- Enterprise line: 20, 28, 36, 44, 55B -->
  <polyline points="155,268 295,252 435,232 575,212 715,188" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="725" y="190" fill="#29b6f6" font-size="11" font-family="sans-serif">企業AI</text>
  <!-- Finance AI line: 16, 22, 30, 38, 45B -->
  <polyline points="155,276 295,260 435,240 575,220 715,200" fill="none" stroke="#4caf50" stroke-width="3"/>
  <text x="725" y="208" fill="#4caf50" font-size="11" font-family="sans-serif">金融AI</text>
  <!-- Manufacturing line: 14, 20, 26, 33, 40B -->
  <polyline points="155,280 295,268 435,256 575,236 715,220" fill="none" stroke="#ab47bc" stroke-width="3"/>
  <text x="725" y="228" fill="#ab47bc" font-size="11" font-family="sans-serif">製造AI</text>
</svg>`;

// SVG: AI Investment trend (slide 4)
const aiInvestmentTrend = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI投資トレンド 2020-2025</text>
  <!-- Bar chart: VC investment by year -->
  <!-- 2020: $36B -->
  <rect x="80" y="270" width="80" height="60" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="3"/>
  <text x="120" y="262" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">$36B</text>
  <text x="120" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2020</text>
  <!-- 2021: $78B -->
  <rect x="200" y="196" width="80" height="134" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="3"/>
  <text x="240" y="188" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">$78B</text>
  <text x="240" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2021</text>
  <!-- 2022: $91B -->
  <rect x="320" y="168" width="80" height="162" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="3"/>
  <text x="360" y="160" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">$91B</text>
  <text x="360" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2022</text>
  <!-- 2023: $110B -->
  <rect x="440" y="136" width="80" height="194" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="3"/>
  <text x="480" y="128" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">$110B</text>
  <text x="480" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2023</text>
  <!-- 2024: $185B -->
  <rect x="560" y="84" width="80" height="246" fill="${ACCENT2}" opacity="0.9" rx="3"/>
  <text x="600" y="76" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">$185B</text>
  <text x="600" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2024</text>
  <!-- 2025est: $285B -->
  <rect x="680" y="60" width="80" height="270" fill="${ACCENT1}" opacity="0.9" rx="3"/>
  <text x="720" y="52" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">$285B*</text>
  <text x="720" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2025e</text>
  <!-- Legend -->
  <text x="400" y="385" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">* 2025年推計値 | 出典: PitchBook, CB Insights 統合データ</text>
</svg>`;

// SVG: App category comparison (slide 5 - 市場セグメント別成長率)
const appCategoryComparison = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">市場セグメント別 成長率ランキング（YoY 2024-2025）</text>
  <!-- Horizontal bars -->
  <!-- AI Agents: 185% -->
  <text x="220" y="82" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">AIエージェント</text>
  <rect x="230" y="65" width="370" height="28" fill="${ACCENT1}" rx="3"/>
  <text x="608" y="85" fill="${ACCENT1}" font-size="13" font-family="sans-serif">+185%</text>
  <!-- GenAI APIs: 142% -->
  <text x="220" y="122" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">生成AI API</text>
  <rect x="230" y="105" width="284" height="28" fill="${ACCENT2}" rx="3"/>
  <text x="522" y="125" fill="${ACCENT2}" font-size="13" font-family="sans-serif">+142%</text>
  <!-- Code gen: 128% -->
  <text x="220" y="162" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">コード生成</text>
  <rect x="230" y="145" width="256" height="28" fill="#29b6f6" rx="3"/>
  <text x="494" y="165" fill="#29b6f6" font-size="13" font-family="sans-serif">+128%</text>
  <!-- Healthcare AI: 98% -->
  <text x="220" y="202" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">ヘルスケアAI</text>
  <rect x="230" y="185" width="196" height="28" fill="#4caf50" rx="3"/>
  <text x="434" y="205" fill="#4caf50" font-size="13" font-family="sans-serif">+98%</text>
  <!-- MLOps: 78% -->
  <text x="220" y="242" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">MLOps/AI基盤</text>
  <rect x="230" y="225" width="156" height="28" fill="#ff7043" rx="3"/>
  <text x="394" y="245" fill="#ff7043" font-size="13" font-family="sans-serif">+78%</text>
  <!-- Finance AI: 65% -->
  <text x="220" y="282" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">金融AI</text>
  <rect x="230" y="265" width="130" height="28" fill="#ab47bc" rx="3"/>
  <text x="368" y="285" fill="#ab47bc" font-size="13" font-family="sans-serif">+65%</text>
  <!-- Security AI: 52% -->
  <text x="220" y="322" fill="${TEXT}" font-size="13" text-anchor="end" font-family="sans-serif">AIセキュリティ</text>
  <rect x="230" y="305" width="104" height="28" fill="#78909c" rx="3"/>
  <text x="342" y="325" fill="#78909c" font-size="13" font-family="sans-serif">+52%</text>
  <!-- Key insight -->
  <text x="400" y="375" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AIエージェント・生成AI APIが突出した成長 — 2026年投資機会の最優先セグメント</text>
</svg>`;

// SVG: Growth curve by sector (slide 3 - AI市場の現状)
const growthCurve = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI市場 成長曲線と現在地</text>
  <!-- Axes -->
  <line x1="80" y1="60" x2="80" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <line x1="80" y1="330" x2="740" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <!-- S-curve: Adoption -->
  <path d="M 80,310 C 150,308 200,290 260,240 S 360,160 420,130 S 530,100 620,90 S 700,86 740,85" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <text x="745" y="88" fill="${ACCENT1}" font-size="11" font-family="sans-serif">採用率</text>
  <!-- Exponential: Revenue -->
  <path d="M 80,325 C 200,322 280,315 360,300 S 480,250 560,200 S 650,140 740,90" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="745" y="93" fill="${ACCENT2}" font-size="11" font-family="sans-serif">市場収益</text>
  <!-- Investment curve -->
  <path d="M 80,320 C 200,316 300,305 400,275 S 520,210 600,155 S 680,110 740,88" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="745" y="100" fill="#29b6f6" font-size="11" font-family="sans-serif">投資額</text>
  <!-- Now marker: 2026 -->
  <line x1="500" y1="55" x2="500" y2="330" stroke="${ACCENT1}" stroke-width="1.5" stroke-dasharray="5,5"/>
  <text x="500" y="50" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">2026 現在</text>
  <!-- Phase labels -->
  <text x="200" y="380" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">初期</text>
  <text x="380" y="380" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">成長期</text>
  <text x="560" y="380" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">← 今ここ</text>
  <text x="680" y="380" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">成熟</text>
  <!-- Y axis -->
  <text x="50" y="195" fill="${TEXT}" font-size="13" text-anchor="middle" transform="rotate(-90,50,195)" font-family="sans-serif">成長指標 →</text>
</svg>`;

// SVG: Enterprise AI Platform (slide 21)
const enterpriseAI = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業向けAIプラットフォーム 構造</text>
  <!-- Layer stack -->
  <!-- Foundation Models -->
  <rect x="60" y="310" width="680" height="50" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="400" y="342" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤モデル層 — GPT-4 / Claude / Gemini / Llama</text>
  <!-- Platform -->
  <rect x="80" y="245" width="640" height="55" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="400" y="278" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIプラットフォーム層 — Fine-tuning / RAG / MLOps / ガードレール</text>
  <!-- Application -->
  <rect x="100" y="180" width="600" height="55" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="400" y="213" fill="${ACCENT2}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">アプリケーション層 — コパイロット / 自動化 / 分析 / 顧客対応</text>
  <!-- Business Process -->
  <rect x="120" y="115" width="560" height="55" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="400" y="148" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ビジネスプロセス層 — 業務フロー統合 / ワークフロー自動化</text>
  <!-- Business Value -->
  <rect x="140" y="60" width="520" height="45" fill="${ACCENT1}" rx="6"/>
  <text x="400" y="89" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ビジネス価値 — 生産性+30% / コスト削減-40% / 意思決定高速化</text>
  <!-- Arrows between layers -->
  <polygon points="396,108 404,108 400,117" fill="${TEXT}"/>
  <polygon points="396,173 404,173 400,182" fill="${TEXT}"/>
  <polygon points="396,238 404,238 400,247" fill="${TEXT}"/>
  <polygon points="396,303 404,303 400,312" fill="${TEXT}"/>
</svg>`;

// SVG: AI Agents & Orchestration (slide 42)
const aiAgentsOrch = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI Agents &amp; Orchestration — 次世代アーキテクチャ</text>
  <!-- Orchestrator -->
  <rect x="280" y="65" width="240" height="65" fill="${ACCENT1}" rx="8"/>
  <text x="400" y="95" fill="${BG}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">オーケストレーター</text>
  <text x="400" y="118" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">タスク分解 / ルーティング / 結果統合</text>
  <!-- Sub-agents -->
  <!-- Research Agent -->
  <rect x="50" y="190" width="150" height="55" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="125" y="215" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">調査エージェント</text>
  <text x="125" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Web検索・文書解析</text>
  <!-- Code Agent -->
  <rect x="220" y="190" width="150" height="55" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="295" y="215" fill="#29b6f6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">コードエージェント</text>
  <text x="295" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">生成・テスト・実行</text>
  <!-- Analysis Agent -->
  <rect x="390" y="190" width="150" height="55" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="465" y="215" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">分析エージェント</text>
  <text x="465" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">データ処理・推論</text>
  <!-- Action Agent -->
  <rect x="560" y="190" width="150" height="55" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="635" y="215" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">アクションエージェント</text>
  <text x="635" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">API呼出・自動実行</text>
  <!-- Arrows from orchestrator -->
  <line x1="340" y1="130" x2="125" y2="190" stroke="${TEXT}" stroke-width="1.5"/>
  <polygon points="125,189 120,198 130,198" fill="${TEXT}"/>
  <line x1="370" y1="130" x2="295" y2="190" stroke="${TEXT}" stroke-width="1.5"/>
  <polygon points="295,189 290,198 300,198" fill="${TEXT}"/>
  <line x1="430" y1="130" x2="465" y2="190" stroke="${TEXT}" stroke-width="1.5"/>
  <polygon points="465,189 460,198 470,198" fill="${TEXT}"/>
  <line x1="460" y1="130" x2="635" y2="190" stroke="${TEXT}" stroke-width="1.5"/>
  <polygon points="635,189 630,198 640,198" fill="${TEXT}"/>
  <!-- Tools layer -->
  <rect x="100" y="300" width="600" height="50" fill="${BOX}" stroke="${TEXT}" stroke-width="1" rx="6"/>
  <text x="400" y="321" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ツール層 — Web検索 / コードインタープリタ / DB / API / ファイルシステム</text>
  <text x="400" y="341" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">外部サービス連携 / クラウドリソース / 社内システム</text>
  <!-- Investment note -->
  <text x="400" y="385" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">エージェント市場: 2025年 $5B → 2030年 $65B (CAGR 67%)</text>
</svg>`;

// SVG: Investment recommendation sectors (slide 50)
const investmentRecommendation = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨セクター — 優先度マトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- Labels -->
  <text x="420" y="370" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">市場成長率 →</text>
  <text x="45" y="200" fill="${TEXT}" font-size="14" text-anchor="middle" transform="rotate(-90,45,200)" font-family="sans-serif">投資収益性 →</text>
  <!-- Quadrant labels -->
  <text x="600" y="90" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">★ 最優先投資</text>
  <text x="250" y="90" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">高収益・低成長</text>
  <text x="600" y="280" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">高成長・低収益</text>
  <text x="250" y="280" fill="#9e9e9e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">様子見</text>
  <!-- Zone lines -->
  <line x1="420" y1="60" x2="420" y2="340" stroke="${TEXT}" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="100" y1="200" x2="740" y2="200" stroke="${TEXT}" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Sector dots -->
  <!-- AI Agents -->
  <circle cx="660" cy="110" r="22" fill="${ACCENT1}"/>
  <text x="660" y="106" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIエージェント</text>
  <text x="660" y="120" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">+185%</text>
  <!-- GenAI -->
  <circle cx="610" cy="130" r="20" fill="${ACCENT2}"/>
  <text x="610" y="126" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">生成AI</text>
  <text x="610" y="140" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">+142%</text>
  <!-- Healthcare AI -->
  <circle cx="540" cy="145" r="18" fill="#29b6f6"/>
  <text x="540" y="142" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">ヘルスAI</text>
  <text x="540" y="156" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">+98%</text>
  <!-- Enterprise AI -->
  <circle cx="480" cy="160" r="16" fill="#4caf50"/>
  <text x="480" y="157" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業AI</text>
  <text x="480" y="170" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">+78%</text>
  <!-- Finance AI -->
  <circle cx="220" cy="140" r="16" fill="#ab47bc"/>
  <text x="220" y="137" fill="${TEXT}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">金融AI</text>
  <text x="220" y="150" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">+65%</text>
</svg>`;

// SVG: Risk-return analysis (slide 51)
const riskReturn = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク・リターン分析 — AIセクター</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- Labels -->
  <text x="420" y="370" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">リスク →</text>
  <text x="45" y="200" fill="${TEXT}" font-size="14" text-anchor="middle" transform="rotate(-90,45,200)" font-family="sans-serif">期待リターン →</text>
  <!-- Efficient frontier curve -->
  <path d="M 150,320 C 200,280 280,230 380,180 S 520,130 620,100 S 700,90 740,85" fill="none" stroke="${ACCENT1}" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="600" y="80" fill="${ACCENT1}" font-size="12" font-family="sans-serif">効率フロンティア</text>
  <!-- Investment options -->
  <!-- Foundation models (high risk, high return) -->
  <circle cx="620" cy="110" r="20" fill="${ACCENT2}"/>
  <text x="620" y="107" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤モデル</text>
  <text x="620" y="140" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +180%</text>
  <!-- Mid-tier apps (medium risk) -->
  <circle cx="430" cy="185" r="18" fill="#29b6f6"/>
  <text x="430" y="182" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIアプリ</text>
  <text x="430" y="215" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +95%</text>
  <!-- Enterprise tools (lower risk) -->
  <circle cx="260" cy="255" r="16" fill="${ACCENT1}"/>
  <text x="260" y="252" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">企業ツール</text>
  <text x="260" y="282" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">期待: +45%</text>
  <!-- AI ETFs (low risk) -->
  <circle cx="170" cy="295" r="14" fill="#4caf50"/>
  <text x="170" y="292" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI ETF</text>
  <text x="170" y="320" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">期待: +28%</text>
  <!-- Recommendation -->
  <rect x="100" y="55" width="200" height="60" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="4"/>
  <text x="200" y="78" fill="${ACCENT1}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨配分</text>
  <text x="200" y="98" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ETF 40% / AIアプリ 35%</text>
  <text x="200" y="112" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">基盤モデル株 25%</text>
</svg>`;

// SVG: Key players map (slide 47)
const keyPlayersMap = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要プレイヤーマップ — AIアプリケーション</text>
  <!-- Columns: Infrastructure, Platform, Application -->
  <text x="170" y="65" fill="${ACCENT1}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">インフラ</text>
  <text x="400" y="65" fill="${ACCENT2}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">プラットフォーム</text>
  <text x="630" y="65" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">アプリケーション</text>
  <!-- Column separators -->
  <line x1="285" y1="55" x2="285" y2="380" stroke="${TEXT}" stroke-width="0.5" opacity="0.4"/>
  <line x1="515" y1="55" x2="515" y2="380" stroke="${TEXT}" stroke-width="0.5" opacity="0.4"/>
  <!-- Infrastructure players -->
  <rect x="90" y="80" width="160" height="35" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="4"/>
  <text x="170" y="103" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">NVIDIA (GPU)</text>
  <rect x="90" y="125" width="160" height="35" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="4"/>
  <text x="170" y="148" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">AWS / Azure / GCP</text>
  <rect x="90" y="170" width="160" height="35" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="4"/>
  <text x="170" y="193" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">Intel / AMD / TSMC</text>
  <rect x="90" y="215" width="160" height="35" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="4"/>
  <text x="170" y="238" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">CoreWeave / Lambda</text>
  <!-- Platform players -->
  <rect x="318" y="80" width="165" height="35" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="4"/>
  <text x="400" y="103" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">OpenAI / Anthropic</text>
  <rect x="318" y="125" width="165" height="35" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="4"/>
  <text x="400" y="148" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">Google / Meta AI</text>
  <rect x="318" y="170" width="165" height="35" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="4"/>
  <text x="400" y="193" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">Mistral / Cohere</text>
  <rect x="318" y="215" width="165" height="35" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="4"/>
  <text x="400" y="238" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">Scale AI / Weights&amp;B</text>
  <!-- Application players -->
  <rect x="545" y="80" width="165" height="35" fill="${BOX}" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="103" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">GitHub Copilot</text>
  <rect x="545" y="125" width="165" height="35" fill="${BOX}" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="148" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">Cursor / Devin</text>
  <rect x="545" y="170" width="165" height="35" fill="${BOX}" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="193" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">UiPath / Automation</text>
  <rect x="545" y="215" width="165" height="35" fill="${BOX}" stroke="#29b6f6" stroke-width="1" rx="4"/>
  <text x="628" y="238" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">Salesforce / ServiceNow</text>
  <!-- Key insight -->
  <rect x="60" y="310" width="680" height="50" fill="${BOX}" rx="6"/>
  <text x="400" y="333" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資機会: プラットフォーム層のコモディティ化進行中</text>
  <text x="400" y="352" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">差別化はアプリケーション層のドメイン特化 + データモート構築</text>
</svg>`;

// SVG: Competitive differentiation analysis (slide 48)
const differentiationAnalysis = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">差別化要因分析 — 持続的競争優位の源泉</text>
  <!-- 5 factors as columns -->
  <!-- Data Moat -->
  <rect x="30" y="65" width="130" height="285" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="95" y="95" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">データモート</text>
  <text x="95" y="130" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">独自データ</text>
  <text x="95" y="150" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">蓄積規模</text>
  <text x="95" y="190" fill="${ACCENT1}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★★</text>
  <text x="95" y="240" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">最も持続的な</text>
  <text x="95" y="258" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">優位性</text>
  <!-- Network effects -->
  <rect x="175" y="65" width="130" height="285" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="240" y="95" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ネットワーク効果</text>
  <text x="240" y="130" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ユーザー増加で</text>
  <text x="240" y="150" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">価値増大</text>
  <text x="240" y="190" fill="${ACCENT2}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Domain expertise -->
  <rect x="320" y="65" width="130" height="285" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="385" y="95" fill="#29b6f6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">ドメイン特化</text>
  <text x="385" y="130" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">業界特有知識</text>
  <text x="385" y="150" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">専門性</text>
  <text x="385" y="190" fill="#29b6f6" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Distribution -->
  <rect x="465" y="65" width="130" height="285" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="530" y="95" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">流通チャネル</text>
  <text x="530" y="130" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">顧客基盤</text>
  <text x="530" y="150" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">既存関係</text>
  <text x="530" y="190" fill="#4caf50" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <!-- Tech IP -->
  <rect x="610" y="65" width="140" height="285" fill="${BOX}" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="680" y="95" fill="#ab47bc" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">技術IP</text>
  <text x="680" y="130" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">特許・独自</text>
  <text x="680" y="150" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">アルゴリズム</text>
  <text x="680" y="190" fill="#ab47bc" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <text x="680" y="240" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">模倣リスク</text>
  <text x="680" y="258" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">あり</text>
  <!-- Key takeaway -->
  <text x="400" y="378" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資先選定: データモート + ネットワーク効果の両立企業を優先</text>
</svg>`;

// Map SVGs to slide indices
const svgPatches: Record<number, string> = {
	3: growthCurve,
	4: aiInvestmentTrend,
	5: appCategoryComparison,
	6: aiLandscapeMap,
	7: marketForecast,
	21: enterpriseAI,
	42: aiAgentsOrch,
	47: keyPlayersMap,
	48: differentiationAnalysis,
	50: investmentRecommendation,
	51: riskReturn,
};

// Apply patches
for (const [idx, svg] of Object.entries(svgPatches)) {
	const i = Number(idx);
	if (data.slides[i]) {
		data.slides[i].content = [svg, ...data.slides[i].content];
	}
}

writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(
	`Patched ${Object.keys(svgPatches).length} slides in ai-growth-apps-investment`,
);
