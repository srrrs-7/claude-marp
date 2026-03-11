// Patch script: add inline SVGs to growing-industries-investment slides
import { readFileSync, writeFileSync } from "fs";

const filePath = new URL("slides-data.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";

const svgStyle = `viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`;

// SVG: Industry Growth Bar Chart (slide 10 - Global market overview)
const industryBarChart = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">グローバル成長産業 市場規模比較（2025年）</text>
  <!-- Bars -->
  <!-- AI/ML: $620B -->
  <rect x="80" y="80" width="120" height="240" fill="${ACCENT1}" rx="4"/>
  <text x="140" y="72" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">$620B</text>
  <text x="140" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <!-- Renewable: $480B -->
  <rect x="240" y="128" width="120" height="192" fill="#4caf50" rx="4"/>
  <text x="300" y="120" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">$480B</text>
  <text x="300" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">再生エネルギー</text>
  <!-- Biotech: $390B -->
  <rect x="400" y="164" width="120" height="156" fill="${ACCENT2}" rx="4"/>
  <text x="460" y="156" fill="${ACCENT2}" font-size="14" text-anchor="middle" font-family="sans-serif">$390B</text>
  <text x="460" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">バイオテック</text>
  <!-- Semiconductor: $580B -->
  <rect x="560" y="92" width="120" height="228" fill="#29b6f6" rx="4"/>
  <text x="620" y="84" fill="#29b6f6" font-size="14" text-anchor="middle" font-family="sans-serif">$580B</text>
  <text x="620" y="350" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">半導体</text>
  <!-- Y axis label -->
  <text x="30" y="200" fill="${TEXT}" font-size="12" text-anchor="middle" transform="rotate(-90,30,200)" font-family="sans-serif">市場規模（十億ドル）</text>
  <!-- Growth rate labels -->
  <text x="140" y="370" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 28.5%</text>
  <text x="300" y="370" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 18.2%</text>
  <text x="460" y="370" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 15.8%</text>
  <text x="620" y="370" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">CAGR 12.4%</text>
</svg>`;

// SVG: TAM/SAM/SOM Funnel for AI industry (slide 17)
const tamFunnel = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 TAM/SAM/SOM 分析（2030年）</text>
  <!-- TAM -->
  <polygon points="400,70 80,180 720,180" fill="${ACCENT1}" opacity="0.9"/>
  <text x="400" y="145" fill="${BG}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">TAM: $2.4兆</text>
  <text x="740" y="145" fill="${ACCENT1}" font-size="13" font-family="sans-serif">全体市場</text>
  <!-- SAM -->
  <polygon points="400,185 180,285 620,285" fill="#ff7043" opacity="0.9"/>
  <text x="400" y="250" fill="${TEXT}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">SAM: $980B</text>
  <text x="635" y="250" fill="#ff7043" font-size="13" font-family="sans-serif">到達可能市場</text>
  <!-- SOM -->
  <polygon points="400,290 270,370 530,370" fill="${ACCENT2}" opacity="0.9"/>
  <text x="400" y="345" fill="${TEXT}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">SOM: $180B</text>
  <text x="545" y="345" fill="${ACCENT2}" font-size="13" font-family="sans-serif">取得可能市場</text>
</svg>`;

// SVG: Sector trend timeline (slide 13 - Global market 3/4)
const sectorTimeline = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長産業 投資サイクル タイムライン</text>
  <!-- Timeline axis -->
  <line x1="80" y1="200" x2="720" y2="200" stroke="${TEXT}" stroke-width="2"/>
  <!-- Year markers -->
  <text x="80" y="230" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2022</text>
  <text x="240" y="230" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2024</text>
  <text x="400" y="230" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">2026 ▼</text>
  <text x="560" y="230" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2028</text>
  <text x="720" y="230" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">2030</text>
  <!-- AI/ML trend line -->
  <polyline points="80,180 240,160 400,120 560,90 720,70" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <text x="730" y="70" fill="${ACCENT1}" font-size="12" font-family="sans-serif">AI/ML</text>
  <!-- Renewable energy -->
  <polyline points="80,190 240,175 400,155 560,130 720,110" fill="none" stroke="#4caf50" stroke-width="3"/>
  <text x="730" y="115" fill="#4caf50" font-size="12" font-family="sans-serif">再エネ</text>
  <!-- Biotech -->
  <polyline points="80,185 240,172 400,160 560,145 720,130" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="730" y="135" fill="${ACCENT2}" font-size="12" font-family="sans-serif">バイオ</text>
  <!-- Semiconductor -->
  <polyline points="80,188 240,170 400,140 560,115 720,95" fill="none" stroke="#29b6f6" stroke-width="3"/>
  <text x="730" y="95" fill="#29b6f6" font-size="12" font-family="sans-serif">半導体</text>
  <!-- Now marker -->
  <line x1="400" y1="60" x2="400" y2="210" stroke="${ACCENT1}" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="400" y="260" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">現在</text>
  <!-- Legend -->
  <text x="80" y="300" fill="${TEXT}" font-size="14" font-weight="bold" font-family="sans-serif">投資サイクル: 成長フェーズ進行中</text>
  <text x="80" y="325" fill="${TEXT}" font-size="12" font-family="sans-serif">2026年は4産業すべてで加速フェーズ突入 — 早期投資が重要</text>
</svg>`;

// SVG: Investment comparison spider chart replacement (slide 48 - Cross analysis)
const crossAnalysis = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">産業横断スコアリング比較</text>
  <!-- Table header -->
  <rect x="50" y="55" width="700" height="40" fill="${BOX}" rx="4"/>
  <text x="150" y="82" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">産業</text>
  <text x="300" y="82" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長率</text>
  <text x="420" y="82" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク</text>
  <text x="540" y="82" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">流動性</text>
  <text x="670" y="82" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">総合スコア</text>
  <!-- Row 1: AI/ML -->
  <rect x="50" y="100" width="700" height="60" fill="${BOX}" rx="2"/>
  <text x="150" y="137" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">AI/ML</text>
  <rect x="240" y="112" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="112" width="114" height="18" fill="${ACCENT1}" rx="2"/>
  <text x="420" y="137" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="540" y="137" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="670" y="137" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★★</text>
  <!-- Row 2: Renewable -->
  <rect x="50" y="165" width="700" height="60" fill="${BG}" rx="2"/>
  <text x="150" y="202" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">再生エネルギー</text>
  <rect x="240" y="177" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="177" width="84" height="18" fill="#4caf50" rx="2"/>
  <text x="420" y="202" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="540" y="202" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="670" y="202" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
  <!-- Row 3: Biotech -->
  <rect x="50" y="230" width="700" height="60" fill="${BOX}" rx="2"/>
  <text x="150" y="267" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">バイオテック</text>
  <rect x="240" y="242" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="242" width="72" height="18" fill="${ACCENT2}" rx="2"/>
  <text x="420" y="267" fill="${ACCENT2}" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="540" y="267" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="670" y="267" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
  <!-- Row 4: Semiconductor -->
  <rect x="50" y="295" width="700" height="60" fill="${BG}" rx="2"/>
  <text x="150" y="332" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">半導体</text>
  <rect x="240" y="307" width="120" height="18" fill="#333" rx="2"/>
  <rect x="240" y="307" width="102" height="18" fill="#29b6f6" rx="2"/>
  <text x="420" y="332" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="540" y="332" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">高</text>
  <text x="670" y="332" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
</svg>`;

// SVG: Risk matrix (slide 52)
const riskMatrix = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="32" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資リスクマトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="50" x2="100" y2="360" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="360" x2="740" y2="360" stroke="${TEXT}" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="420" y="390" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">発生確率 →</text>
  <text x="50" y="205" fill="${TEXT}" font-size="14" text-anchor="middle" transform="rotate(-90,50,205)" font-family="sans-serif">影響度 →</text>
  <!-- Grid zones -->
  <rect x="100" y="200" width="320" height="160" fill="#4caf50" opacity="0.2" rx="2"/>
  <text x="260" y="290" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">低リスク</text>
  <rect x="420" y="200" width="320" height="160" fill="${ACCENT1}" opacity="0.2" rx="2"/>
  <text x="580" y="290" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">中リスク</text>
  <rect x="420" y="50" width="320" height="150" fill="${ACCENT2}" opacity="0.25" rx="2"/>
  <text x="580" y="130" fill="${ACCENT2}" font-size="14" text-anchor="middle" font-family="sans-serif">高リスク</text>
  <rect x="100" y="50" width="320" height="150" fill="${ACCENT1}" opacity="0.15" rx="2"/>
  <text x="260" y="130" fill="${ACCENT1}" font-size="14" text-anchor="middle" font-family="sans-serif">中リスク</text>
  <!-- Risk items -->
  <circle cx="210" cy="300" r="16" fill="${ACCENT1}"/>
  <text x="210" y="305" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">規制</text>
  <circle cx="500" cy="320" r="16" fill="${ACCENT1}"/>
  <text x="500" y="325" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">金利</text>
  <circle cx="620" cy="100" r="18" fill="${ACCENT2}"/>
  <text x="620" y="105" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">地政学</text>
  <circle cx="340" cy="90" r="16" fill="${ACCENT1}"/>
  <text x="340" y="95" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">技術</text>
  <circle cx="180" cy="150" r="14" fill="#4caf50"/>
  <text x="180" y="155" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">流動性</text>
  <!-- X axis ticks -->
  <text x="100" y="378" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">低</text>
  <text x="420" y="378" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="740" y="378" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">高</text>
</svg>`;

// SVG: Investment recommendation action plan (slide 55)
const investmentAction = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資推奨 ポートフォリオ配分</text>
  <!-- Pie chart approximation using rectangles -->
  <!-- AI/ML: 35% -->
  <rect x="60" y="70" width="180" height="40" fill="${ACCENT1}" rx="4"/>
  <text x="150" y="97" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI/ML 35%</text>
  <!-- Semiconductor: 30% -->
  <rect x="60" y="125" width="154" height="40" fill="#29b6f6" rx="4"/>
  <text x="150" y="152" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 30%</text>
  <!-- Renewable: 20% -->
  <rect x="60" y="180" width="103" height="40" fill="#4caf50" rx="4"/>
  <text x="150" y="207" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">再エネ 20%</text>
  <!-- Biotech: 15% -->
  <rect x="60" y="235" width="77" height="40" fill="${ACCENT2}" rx="4"/>
  <text x="150" y="262" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオ 15%</text>
  <!-- Action Timeline -->
  <rect x="310" y="60" width="440" height="310" fill="${BOX}" rx="8"/>
  <text x="530" y="90" fill="${ACCENT1}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">アクションタイムライン</text>
  <!-- Q1 -->
  <rect x="330" y="105" width="100" height="30" fill="${ACCENT1}" rx="4"/>
  <text x="380" y="126" fill="${BG}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q1 2026</text>
  <text x="445" y="126" fill="${TEXT}" font-size="12" font-family="sans-serif">AI/ML ETF組入 + 半導体先物</text>
  <!-- Q2 -->
  <rect x="330" y="150" width="100" height="30" fill="#29b6f6" rx="4"/>
  <text x="380" y="171" fill="${BG}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q2 2026</text>
  <text x="445" y="171" fill="${TEXT}" font-size="12" font-family="sans-serif">再エネ株 段階投資開始</text>
  <!-- Q3 -->
  <rect x="330" y="195" width="100" height="30" fill="#4caf50" rx="4"/>
  <text x="380" y="216" fill="${BG}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q3 2026</text>
  <text x="445" y="216" fill="${TEXT}" font-size="12" font-family="sans-serif">バイオテック選別投資</text>
  <!-- Q4 -->
  <rect x="330" y="240" width="100" height="30" fill="${ACCENT2}" rx="4"/>
  <text x="380" y="261" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Q4 2026</text>
  <text x="445" y="261" fill="${TEXT}" font-size="12" font-family="sans-serif">ポートフォリオ全体再評価</text>
  <!-- Year 2027+ -->
  <rect x="330" y="285" width="100" height="30" fill="#9c27b0" rx="4"/>
  <text x="380" y="306" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">2027+</text>
  <text x="445" y="306" fill="${TEXT}" font-size="12" font-family="sans-serif">長期ホールド + 配当再投資</text>
  <!-- Expected return -->
  <text x="530" y="350" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">期待リターン: 年率 18-24%</text>
</svg>`;

// SVG: AI sector growth comparison (slide 18 - AI industry 3/6)
const aiSectorGrowth = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI産業 セグメント別 成長率比較</text>
  <!-- Horizontal bar chart -->
  <!-- GenAI: 68% -->
  <text x="190" y="90" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">生成AI</text>
  <rect x="200" y="72" width="340" height="28" fill="${ACCENT1}" rx="3"/>
  <text x="548" y="92" fill="${ACCENT1}" font-size="14" font-family="sans-serif">+68%</text>
  <!-- MLOps: 54% -->
  <text x="190" y="135" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">MLOps</text>
  <rect x="200" y="117" width="270" height="28" fill="${ACCENT2}" rx="3"/>
  <text x="478" y="137" fill="${ACCENT2}" font-size="14" font-family="sans-serif">+54%</text>
  <!-- AI Infra: 47% -->
  <text x="190" y="180" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">AIインフラ</text>
  <rect x="200" y="162" width="235" height="28" fill="#29b6f6" rx="3"/>
  <text x="443" y="182" fill="#29b6f6" font-size="14" font-family="sans-serif">+47%</text>
  <!-- Enterprise AI: 38% -->
  <text x="190" y="225" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">企業AI</text>
  <rect x="200" y="207" width="190" height="28" fill="#4caf50" rx="3"/>
  <text x="398" y="227" fill="#4caf50" font-size="14" font-family="sans-serif">+38%</text>
  <!-- AI Security: 31% -->
  <text x="190" y="270" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">AIセキュリティ</text>
  <rect x="200" y="252" width="155" height="28" fill="#ff7043" rx="3"/>
  <text x="363" y="272" fill="#ff7043" font-size="14" font-family="sans-serif">+31%</text>
  <!-- AI Robotics: 25% -->
  <text x="190" y="315" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">AIロボティクス</text>
  <rect x="200" y="297" width="125" height="28" fill="#ab47bc" rx="3"/>
  <text x="333" y="317" fill="#ab47bc" font-size="14" font-family="sans-serif">+25%</text>
  <text x="400" y="370" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">前年同期比 YoY成長率（2024-2025）</text>
</svg>`;

// SVG: Renewable energy sector diagram (slide 23)
const renewableEnergy = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">再生エネルギー エコシステム</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="60" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2"/>
  <text x="400" y="205" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">グリーン</text>
  <text x="400" y="222" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">エネルギー</text>
  <!-- Solar -->
  <rect x="60" y="70" width="130" height="50" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="125" y="100" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">太陽光発電</text>
  <line x1="190" y1="95" x2="340" y2="165" stroke="#4caf50" stroke-width="1.5"/>
  <!-- Wind -->
  <rect x="60" y="185" width="130" height="50" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="125" y="215" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">風力発電</text>
  <line x1="190" y1="210" x2="340" y2="210" stroke="#29b6f6" stroke-width="1.5"/>
  <!-- Hydrogen -->
  <rect x="60" y="300" width="130" height="50" fill="${BOX}" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="125" y="330" fill="#ab47bc" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">水素エネルギー</text>
  <line x1="190" y1="325" x2="340" y2="255" stroke="#ab47bc" stroke-width="1.5"/>
  <!-- Battery -->
  <rect x="610" y="70" width="130" height="50" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="675" y="100" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">蓄電池</text>
  <line x1="610" y1="95" x2="460" y2="165" stroke="${ACCENT1}" stroke-width="1.5"/>
  <!-- Grid -->
  <rect x="610" y="185" width="130" height="50" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="675" y="215" fill="${ACCENT2}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">スマートグリッド</text>
  <line x1="610" y1="210" x2="460" y2="210" stroke="${ACCENT2}" stroke-width="1.5"/>
  <!-- Carbon credits -->
  <rect x="610" y="300" width="130" height="50" fill="${BOX}" stroke="#ff7043" stroke-width="2" rx="6"/>
  <text x="675" y="330" fill="#ff7043" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">カーボンクレジット</text>
  <line x1="610" y1="325" x2="460" y2="255" stroke="#ff7043" stroke-width="1.5"/>
</svg>`;

// SVG: Semiconductor supply chain (slide 37)
const semiconductorChain = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">半導体 サプライチェーン構造</text>
  <!-- Stage 1: Materials -->
  <rect x="30" y="100" width="110" height="70" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="85" y="131" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">原材料</text>
  <text x="85" y="152" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Si, Ge, GaAs</text>
  <!-- Arrow -->
  <polygon points="145,135 160,128 160,142" fill="${TEXT}"/>
  <line x1="140" y1="135" x2="160" y2="135" stroke="${TEXT}" stroke-width="2"/>
  <!-- Stage 2: Equipment -->
  <rect x="165" y="100" width="110" height="70" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="220" y="131" fill="${ACCENT1}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">製造装置</text>
  <text x="220" y="152" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ASML, AMAT</text>
  <!-- Arrow -->
  <polygon points="280,135 295,128 295,142" fill="${TEXT}"/>
  <line x1="275" y1="135" x2="295" y2="135" stroke="${TEXT}" stroke-width="2"/>
  <!-- Stage 3: Fab -->
  <rect x="300" y="85" width="110" height="100" fill="${BOX}" stroke="${ACCENT2}" stroke-width="3" rx="6"/>
  <text x="355" y="126" fill="${ACCENT2}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">前工程</text>
  <text x="355" y="145" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">TSMC, Samsung</text>
  <text x="355" y="162" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">Intel, SMIC</text>
  <!-- Arrow -->
  <polygon points="415,135 430,128 430,142" fill="${TEXT}"/>
  <line x1="410" y1="135" x2="430" y2="135" stroke="${TEXT}" stroke-width="2"/>
  <!-- Stage 4: OSAT -->
  <rect x="435" y="100" width="110" height="70" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="490" y="131" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">後工程</text>
  <text x="490" y="152" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ASE, Amkor</text>
  <!-- Arrow -->
  <polygon points="550,135 565,128 565,142" fill="${TEXT}"/>
  <line x1="545" y1="135" x2="565" y2="135" stroke="${TEXT}" stroke-width="2"/>
  <!-- Stage 5: Design -->
  <rect x="570" y="100" width="110" height="70" fill="${BOX}" stroke="#ab47bc" stroke-width="2" rx="6"/>
  <text x="625" y="131" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">チップ設計</text>
  <text x="625" y="152" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">NVIDIA, AMD</text>
  <!-- Arrow -->
  <polygon points="685,135 700,128 700,142" fill="${TEXT}"/>
  <line x1="680" y1="135" x2="700" y2="135" stroke="${TEXT}" stroke-width="2"/>
  <!-- Stage 6: End market -->
  <rect x="705" y="100" width="75" height="70" fill="${BOX}" stroke="${TEXT}" stroke-width="1" rx="6"/>
  <text x="742" y="131" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">最終市場</text>
  <text x="742" y="150" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">AI/HPC</text>
  <!-- Geopolitical note -->
  <rect x="30" y="220" width="740" height="50" fill="${BOX}" rx="6"/>
  <text x="400" y="242" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">地政学リスク: 米中デカップリングによりサプライチェーン再構築加速</text>
  <text x="400" y="262" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">日米台韓「Chip4同盟」 vs 中国独自エコシステム構築 — 二極化が進行中</text>
  <!-- Investment opportunity callout -->
  <rect x="150" y="295" width="500" height="45" fill="${ACCENT1}" rx="6"/>
  <text x="400" y="315" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資機会: 製造装置・前工程設備メーカーが最も高いバリュエーション</text>
  <text x="400" y="333" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">ASML +52% YTD / AMAT +38% YTD / 東京エレクトロン +44% YTD</text>
</svg>`;

// SVG: biotech pipeline (slide 30)
const biotechPipeline = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">バイオテック 創薬パイプライン ステージ</text>
  <!-- Pipeline stages horizontal -->
  <!-- Discovery -->
  <rect x="30" y="130" width="110" height="80" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="85" y="162" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">基礎研究</text>
  <text x="85" y="180" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">2-5年</text>
  <!-- Phase 1 -->
  <rect x="165" y="130" width="110" height="80" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="220" y="162" fill="${ACCENT1}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ1</text>
  <text x="220" y="180" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">安全性確認</text>
  <!-- Phase 2 -->
  <rect x="300" y="130" width="110" height="80" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="355" y="162" fill="${ACCENT1}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ2</text>
  <text x="355" y="180" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">有効性確認</text>
  <!-- Phase 3 -->
  <rect x="435" y="130" width="110" height="80" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="490" y="162" fill="${ACCENT2}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">フェーズ3</text>
  <text x="490" y="180" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">大規模試験</text>
  <!-- Approval -->
  <rect x="570" y="130" width="110" height="80" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="625" y="162" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">承認申請</text>
  <text x="625" y="180" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">FDA/PMDA</text>
  <!-- Market -->
  <rect x="705" y="130" width="75" height="80" fill="${ACCENT1}" rx="6"/>
  <text x="742" y="162" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">市場投入</text>
  <text x="742" y="180" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">収益化</text>
  <!-- Arrows -->
  <polygon points="145,168 160,161 160,175" fill="${TEXT}"/>
  <line x1="140" y1="168" x2="160" y2="168" stroke="${TEXT}" stroke-width="2"/>
  <polygon points="280,168 295,161 295,175" fill="${TEXT}"/>
  <line x1="275" y1="168" x2="295" y2="168" stroke="${TEXT}" stroke-width="2"/>
  <polygon points="415,168 430,161 430,175" fill="${TEXT}"/>
  <line x1="410" y1="168" x2="430" y2="168" stroke="${TEXT}" stroke-width="2"/>
  <polygon points="550,168 565,161 565,175" fill="${TEXT}"/>
  <line x1="545" y1="168" x2="565" y2="168" stroke="${TEXT}" stroke-width="2"/>
  <polygon points="685,168 700,161 700,175" fill="${TEXT}"/>
  <line x1="680" y1="168" x2="700" y2="168" stroke="${TEXT}" stroke-width="2"/>
  <!-- Success rates -->
  <text x="85" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">100%</text>
  <text x="220" y="235" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">70%</text>
  <text x="355" y="235" fill="${ACCENT1}" font-size="11" text-anchor="middle" font-family="sans-serif">40%</text>
  <text x="490" y="235" fill="${ACCENT2}" font-size="11" text-anchor="middle" font-family="sans-serif">20%</text>
  <text x="625" y="235" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">12%</text>
  <text x="742" y="235" fill="${ACCENT1}" font-size="11" text-anchor="middle" font-family="sans-serif">8%</text>
  <text x="400" y="275" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">フェーズ別 成功確率</text>
  <!-- AI impact note -->
  <rect x="100" y="300" width="600" height="60" fill="${BOX}" rx="6"/>
  <text x="400" y="325" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">AIによる創薬革命: 研究期間を2-5年 → 6-18ヶ月に短縮</text>
  <text x="400" y="347" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AlphaFold2タンパク質予測 + 生成AIで候補化合物探索コスト90%削減</text>
</svg>`;

// SVG: North America market insights (slide 44)
const northAmericaMarket = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">北米市場 成長産業マップ</text>
  <!-- US box -->
  <rect x="60" y="65" width="300" height="280" fill="${BOX}" rx="8" stroke="${ACCENT1}" stroke-width="2"/>
  <text x="210" y="95" fill="${ACCENT1}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">米国</text>
  <text x="210" y="125" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">AI/ML: $380B (61%)</text>
  <text x="210" y="150" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">半導体: $320B (55%)</text>
  <text x="210" y="175" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">バイオテック: $220B (56%)</text>
  <text x="210" y="200" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">再エネ: $180B (37%)</text>
  <text x="210" y="240" fill="${ACCENT1}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">$1.1T</text>
  <text x="210" y="262" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">北米市場合計</text>
  <!-- Canada box -->
  <rect x="440" y="65" width="140" height="280" fill="${BOX}" rx="8" stroke="#29b6f6" stroke-width="2"/>
  <text x="510" y="95" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">カナダ</text>
  <text x="510" y="130" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AI研究ハブ</text>
  <text x="510" y="155" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">クリーンエネ</text>
  <text x="510" y="180" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">水力発電</text>
  <text x="510" y="230" fill="#29b6f6" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">$85B</text>
  <!-- Mexico box -->
  <rect x="620" y="65" width="140" height="280" fill="${BOX}" rx="8" stroke="#4caf50" stroke-width="2"/>
  <text x="690" y="95" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">メキシコ</text>
  <text x="690" y="130" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">半導体製造</text>
  <text x="690" y="155" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ニアショアリング</text>
  <text x="690" y="180" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">再エネ拡張</text>
  <text x="690" y="230" fill="#4caf50" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">$42B</text>
  <!-- Key insight -->
  <text x="400" y="375" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">北米全体: CAGR 22% — 世界最大の成長産業投資市場</text>
</svg>`;

// Map SVGs to slide indices
const svgPatches: Record<number, string> = {
	10: industryBarChart,
	13: sectorTimeline,
	17: aiSectorGrowth,
	18: tamFunnel,
	23: renewableEnergy,
	30: biotechPipeline,
	37: semiconductorChain,
	44: northAmericaMarket,
	48: crossAnalysis,
	52: riskMatrix,
	55: investmentAction,
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
	`Patched ${Object.keys(svgPatches).length} slides in growing-industries-investment`,
);
