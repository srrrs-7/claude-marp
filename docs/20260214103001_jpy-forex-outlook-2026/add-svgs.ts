// Patch script: add inline SVGs to jpy-forex-outlook-2026 slides
import { readFileSync, writeFileSync } from "fs";

const filePath = new URL("slides-data.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";

const svgStyle = `viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`;

// SVG: Currency exchange rate trend chart (slide 5 - 市場概況チャート)
const exchangeRateChart = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="32" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">USD/JPY 為替レート推移（2024年1月〜2026年2月）</text>
  <!-- Axes -->
  <line x1="80" y1="50" x2="80" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <line x1="80" y1="330" x2="760" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <!-- Y-axis labels (JPY values) -->
  <text x="72" y="60" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">165</text>
  <text x="72" y="120" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">155</text>
  <text x="72" y="180" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">145</text>
  <text x="72" y="240" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">135</text>
  <text x="72" y="300" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">125</text>
  <!-- Grid lines -->
  <line x1="80" y1="120" x2="760" y2="120" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="180" x2="760" y2="180" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <line x1="80" y1="240" x2="760" y2="240" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <!-- X axis months -->
  <text x="100" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">24/1</text>
  <text x="185" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">24/4</text>
  <text x="270" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">24/7</text>
  <text x="355" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">24/10</text>
  <text x="440" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">25/1</text>
  <text x="525" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">25/4</text>
  <text x="610" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">25/7</text>
  <text x="695" y="348" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">25/10</text>
  <text x="755" y="348" fill="${ACCENT1}" font-size="11" text-anchor="middle" font-family="sans-serif">26/2</text>
  <!-- USD/JPY line: 147, 151, 155, 158, 161, 157, 161, 158, 148, 152, 155, 151, 147, 152 -->
  <polyline points="100,234 185,204 270,174 355,156 440,138 490,162 525,138 555,156 610,228 650,198 695,174 730,204 755,234 760,198" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <!-- BOJ intervention markers -->
  <line x1="555" y1="50" x2="555" y2="330" stroke="${ACCENT2}" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="560" y="75" fill="${ACCENT2}" font-size="11" font-family="sans-serif">BOJ介入</text>
  <!-- Current level line -->
  <line x1="80" y1="204" x2="760" y2="204" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
  <text x="762" y="208" fill="#4caf50" font-size="11" font-family="sans-serif">152</text>
  <!-- Labels -->
  <text x="400" y="380" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">現在値: ¥152.3/USD（2026年2月時点）| 52週高値: ¥161.8 | 52週安値: ¥141.7</text>
</svg>`;

// SVG: Yen carry trade flow (slide 13 - 金利差の影響)
const carryTradeFlow = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">円キャリートレード フロー図</text>
  <!-- Japan box -->
  <rect x="30" y="100" width="200" height="200" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="8"/>
  <text x="130" y="135" fill="${ACCENT1}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">日本</text>
  <text x="130" y="165" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">政策金利</text>
  <text x="130" y="190" fill="${ACCENT1}" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">0.5%</text>
  <text x="130" y="220" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">円借り入れコスト</text>
  <text x="130" y="245" fill="#4caf50" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">低コスト</text>
  <!-- US box -->
  <rect x="570" y="100" width="200" height="200" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="8"/>
  <text x="670" y="135" fill="${ACCENT2}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">米国</text>
  <text x="670" y="165" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">政策金利</text>
  <text x="670" y="190" fill="${ACCENT2}" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">4.5%</text>
  <text x="670" y="220" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">米国資産収益</text>
  <text x="670" y="245" fill="${ACCENT2}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">高収益</text>
  <!-- Center: Carry trade -->
  <rect x="290" y="120" width="220" height="160" fill="${BOX}" stroke="${TEXT}" stroke-width="1" rx="8"/>
  <text x="400" y="155" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">キャリートレード</text>
  <text x="400" y="180" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">差 +4.0%</text>
  <text x="400" y="205" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">円売り → ドル買い</text>
  <text x="400" y="225" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">円安圧力が持続</text>
  <text x="400" y="250" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">巻き戻しリスク大</text>
  <!-- Arrows: Japan -> Carry trade -> US -->
  <polygon points="233,195 248,188 248,202" fill="${ACCENT1}"/>
  <line x1="230" y1="195" x2="290" y2="195" stroke="${ACCENT1}" stroke-width="2"/>
  <polygon points="515,195 530,188 530,202" fill="${ACCENT2}"/>
  <line x1="510" y1="195" x2="570" y2="195" stroke="${ACCENT2}" stroke-width="2"/>
  <!-- Warning -->
  <rect x="100" y="330" width="600" height="45" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="6"/>
  <text x="400" y="352" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">BOJ利上げ → 金利差縮小 → キャリー巻き戻し → 急激な円高リスク</text>
  <text x="400" y="368" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">2024年8月の円高急騰（161円 → 142円）が前例</text>
</svg>`;

// SVG: BOJ policy impact (slide 22 - BOJの現在の政策)
const bojPolicyImpact = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">日銀（BOJ）政策正常化ロードマップ</text>
  <!-- Timeline -->
  <line x1="80" y1="200" x2="720" y2="200" stroke="${TEXT}" stroke-width="2"/>
  <!-- Milestones -->
  <!-- YCC abandonment: 2024 early -->
  <circle cx="140" cy="200" r="12" fill="#4caf50"/>
  <line x1="140" y1="188" x2="140" y2="120" stroke="#4caf50" stroke-width="1.5"/>
  <rect x="80" y="90" width="130" height="30" fill="${BOX}" stroke="#4caf50" stroke-width="1" rx="3"/>
  <text x="145" y="110" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">YCC撤廃（2024/3）</text>
  <!-- First hike 0.1%: 2024/3 -->
  <circle cx="260" cy="200" r="12" fill="${ACCENT1}"/>
  <line x1="260" y1="212" x2="260" y2="280" stroke="${ACCENT1}" stroke-width="1.5"/>
  <rect x="185" y="280" width="160" height="30" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="3"/>
  <text x="265" y="300" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">初回利上げ0.1% (3月)</text>
  <!-- 0.25% hike: 2024/7 -->
  <circle cx="380" cy="200" r="12" fill="${ACCENT1}"/>
  <line x1="380" y1="188" x2="380" y2="120" stroke="${ACCENT1}" stroke-width="1.5"/>
  <rect x="310" y="90" width="140" height="30" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1" rx="3"/>
  <text x="380" y="110" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">0.25%へ利上げ (7月)</text>
  <!-- 0.5% hike: 2025/1 -->
  <circle cx="500" cy="200" r="14" fill="${ACCENT2}"/>
  <line x1="500" y1="212" x2="500" y2="280" stroke="${ACCENT2}" stroke-width="1.5"/>
  <rect x="420" y="280" width="160" height="30" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1" rx="3"/>
  <text x="500" y="300" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">0.5%へ（25年1月）</text>
  <!-- Next expected: 0.75%+ -->
  <circle cx="640" cy="200" r="14" fill="${BOX}" stroke="${TEXT}" stroke-width="2" stroke-dasharray="4,2"/>
  <line x1="640" y1="188" x2="640" y2="120" stroke="${TEXT}" stroke-width="1.5" stroke-dasharray="4,2"/>
  <rect x="555" y="90" width="175" height="30" fill="${BOX}" stroke="${TEXT}" stroke-width="1" rx="3"/>
  <text x="640" y="110" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">0.75%予測 (26年後半?)</text>
  <!-- Current marker -->
  <text x="500" y="335" fill="${ACCENT2}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">← 現在ここ</text>
  <!-- Impact box -->
  <rect x="100" y="345" width="600" height="40" fill="${BOX}" rx="6"/>
  <text x="400" y="365" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">BOJ利上げ継続 → 金利差縮小 → 円高バイアス継続見通し</text>
</svg>`;

// SVG: USD/JPY outlook scenarios (slide 30)
const usdJpyOutlook = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">USD/JPY 短期見通し（3〜6ヶ月） シナリオ</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="330" x2="740" y2="330" stroke="${TEXT}" stroke-width="2"/>
  <!-- Y-axis JPY levels -->
  <text x="92" y="65" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">165</text>
  <text x="92" y="118" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">160</text>
  <text x="92" y="171" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">155</text>
  <text x="92" y="224" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">150</text>
  <text x="92" y="277" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">145</text>
  <text x="92" y="330" fill="${TEXT}" font-size="12" text-anchor="end" font-family="sans-serif">140</text>
  <!-- Grid -->
  <line x1="100" y1="171" x2="740" y2="171" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <line x1="100" y1="224" x2="740" y2="224" stroke="${TEXT}" stroke-width="0.5" opacity="0.3"/>
  <!-- X-axis months -->
  <text x="170" y="350" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">2月(現在)</text>
  <text x="310" y="350" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">4月</text>
  <text x="450" y="350" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">6月</text>
  <text x="600" y="350" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">8月</text>
  <!-- Current point -->
  <circle cx="170" cy="214" r="8" fill="${TEXT}"/>
  <text x="185" y="212" fill="${TEXT}" font-size="12" font-family="sans-serif">152</text>
  <!-- Bull scenario (円安): 155-160 -->
  <polyline points="170,214 310,192 450,171 600,160" fill="none" stroke="${ACCENT2}" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="610" y="158" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">円安シナリオ 155-162</text>
  <!-- Base scenario: 148-155 -->
  <polyline points="170,214 310,224 450,214 600,204" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <text x="610" y="202" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">ベース 148-155 ★</text>
  <!-- Bear scenario (円高): 140-147 -->
  <polyline points="170,214 310,256 450,266 600,278" fill="none" stroke="#29b6f6" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="610" y="280" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">円高シナリオ 140-148</text>
  <!-- Probability labels -->
  <text x="400" y="380" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">確率: 円安25% | ベース50% | 円高25% — BOJ政策・FRB動向が決定因子</text>
</svg>`;

// SVG: Comprehensive risk assessment map (slide 45)
const riskAssessmentMap = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">為替リスク総合評価マップ</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- Quadrant zones -->
  <rect x="100" y="60" width="320" height="140" fill="${ACCENT1}" opacity="0.1" rx="2"/>
  <text x="260" y="100" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">注意領域</text>
  <rect x="420" y="60" width="320" height="140" fill="${ACCENT2}" opacity="0.15" rx="2"/>
  <text x="580" y="100" fill="${ACCENT2}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">高リスク領域</text>
  <rect x="100" y="200" width="320" height="140" fill="#4caf50" opacity="0.1" rx="2"/>
  <text x="260" y="278" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">管理可能領域</text>
  <rect x="420" y="200" width="320" height="140" fill="${ACCENT1}" opacity="0.1" rx="2"/>
  <text x="580" y="278" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">注意領域</text>
  <!-- Risk items as bubbles -->
  <!-- BOJ surprise rate hike -->
  <circle cx="580" cy="110" r="28" fill="${ACCENT2}" opacity="0.9"/>
  <text x="580" y="106" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">BOJ</text>
  <text x="580" y="120" fill="${TEXT}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">急利上げ</text>
  <!-- Geopolitical risk -->
  <circle cx="500" cy="130" r="22" fill="${ACCENT2}" opacity="0.85"/>
  <text x="500" y="127" fill="${TEXT}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">地政学</text>
  <text x="500" y="140" fill="${TEXT}" font-size="10" text-anchor="middle" font-family="sans-serif">リスク</text>
  <!-- FRB policy -->
  <circle cx="300" cy="115" r="24" fill="${ACCENT1}" opacity="0.85"/>
  <text x="300" y="111" fill="${BG}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">FRB</text>
  <text x="300" y="124" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">政策転換</text>
  <!-- Trade balance -->
  <circle cx="200" cy="270" r="18" fill="#4caf50" opacity="0.85"/>
  <text x="200" y="267" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">貿易収支</text>
  <text x="200" y="280" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">変動</text>
  <!-- Inflation differential -->
  <circle cx="450" cy="260" r="20" fill="${ACCENT1}" opacity="0.8"/>
  <text x="450" y="257" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">インフレ</text>
  <text x="450" y="270" fill="${BG}" font-size="10" text-anchor="middle" font-family="sans-serif">格差</text>
  <!-- Axes labels -->
  <text x="420" y="375" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">発生確率 →</text>
  <text x="45" y="200" fill="${TEXT}" font-size="14" text-anchor="middle" transform="rotate(-90,45,200)" font-family="sans-serif">円高への影響度 →</text>
</svg>`;

// SVG: Scenario probability distribution (slide 60 - シナリオ確率分布)
const scenarioProb = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">USD/JPY シナリオ確率分布（1年後）</text>
  <!-- Distribution bell curve approximation -->
  <!-- X axis: JPY rate -->
  <line x1="80" y1="300" x2="720" y2="300" stroke="${TEXT}" stroke-width="2"/>
  <text x="80" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">135</text>
  <text x="175" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">140</text>
  <text x="270" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">145</text>
  <text x="365" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">150</text>
  <text x="460" y="320" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">155★</text>
  <text x="555" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">160</text>
  <text x="650" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">165</text>
  <text x="720" y="320" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">170</text>
  <!-- Distribution bars (histogram) -->
  <!-- 135-140: 5% -->
  <rect x="82" y="277" width="88" height="23" fill="#29b6f6" rx="2" opacity="0.8"/>
  <text x="126" y="268" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">5%</text>
  <!-- 140-145: 10% -->
  <rect x="177" y="254" width="88" height="46" fill="#29b6f6" rx="2" opacity="0.8"/>
  <text x="221" y="245" fill="#29b6f6" font-size="12" text-anchor="middle" font-family="sans-serif">10%</text>
  <!-- 145-150: 20% -->
  <rect x="272" y="208" width="88" height="92" fill="${ACCENT1}" rx="2" opacity="0.8"/>
  <text x="316" y="199" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">20%</text>
  <!-- 150-155: 30% (peak) -->
  <rect x="367" y="162" width="88" height="138" fill="${ACCENT1}" rx="2" opacity="0.9"/>
  <text x="411" y="153" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">30%★</text>
  <!-- 155-160: 20% -->
  <rect x="462" y="208" width="88" height="92" fill="${ACCENT2}" rx="2" opacity="0.8"/>
  <text x="506" y="199" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">20%</text>
  <!-- 160-165: 10% -->
  <rect x="557" y="254" width="88" height="46" fill="${ACCENT2}" rx="2" opacity="0.8"/>
  <text x="601" y="245" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">10%</text>
  <!-- 165-170: 5% -->
  <rect x="652" y="277" width="60" height="23" fill="${ACCENT2}" rx="2" opacity="0.8"/>
  <text x="682" y="268" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">5%</text>
  <!-- Legend -->
  <rect x="80" y="345" width="15" height="15" fill="#29b6f6"/>
  <text x="102" y="357" fill="${TEXT}" font-size="12" font-family="sans-serif">円高シナリオ (15%)</text>
  <rect x="280" y="345" width="15" height="15" fill="${ACCENT1}"/>
  <text x="302" y="357" fill="${TEXT}" font-size="12" font-family="sans-serif">ベースシナリオ (50%)</text>
  <rect x="510" y="345" width="15" height="15" fill="${ACCENT2}"/>
  <text x="532" y="357" fill="${TEXT}" font-size="12" font-family="sans-serif">円安シナリオ (35%)</text>
</svg>`;

// SVG: Real interest rate comparison (slide 15)
const realInterestRate = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要国 実質金利比較（2026年2月）</text>
  <!-- Horizontal bar chart -->
  <!-- Zero line -->
  <line x1="350" y1="60" x2="350" y2="340" stroke="${TEXT}" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="350" y="355" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">0%</text>
  <!-- US: +2.3% -->
  <text x="200" y="100" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">米国 (USD)</text>
  <rect x="350" y="80" width="115" height="30" fill="${ACCENT2}" rx="3"/>
  <text x="472" y="101" fill="${ACCENT2}" font-size="13" font-family="sans-serif">+2.3%</text>
  <!-- EU: +1.1% -->
  <text x="200" y="145" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">ユーロ圏 (EUR)</text>
  <rect x="350" y="125" width="55" height="30" fill="#4caf50" rx="3"/>
  <text x="413" y="146" fill="#4caf50" font-size="13" font-family="sans-serif">+1.1%</text>
  <!-- UK: +0.8% -->
  <text x="200" y="190" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">英国 (GBP)</text>
  <rect x="350" y="170" width="40" height="30" fill="#4caf50" rx="3"/>
  <text x="397" y="191" fill="#4caf50" font-size="13" font-family="sans-serif">+0.8%</text>
  <!-- AUS: +1.5% -->
  <text x="200" y="235" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">豪州 (AUD)</text>
  <rect x="350" y="215" width="75" height="30" fill="#29b6f6" rx="3"/>
  <text x="432" y="236" fill="#29b6f6" font-size="13" font-family="sans-serif">+1.5%</text>
  <!-- Japan: -1.2% (negative real rate) -->
  <text x="200" y="280" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">日本 (JPY) ★</text>
  <rect x="290" y="260" width="60" height="30" fill="${ACCENT1}" rx="3"/>
  <text x="284" y="281" fill="${ACCENT1}" font-size="13" text-anchor="end" font-family="sans-serif">-1.2%</text>
  <!-- China: -0.5% -->
  <text x="200" y="325" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">中国 (CNY)</text>
  <rect x="325" y="305" width="25" height="30" fill="#9e9e9e" rx="3"/>
  <text x="318" y="326" fill="#9e9e9e" font-size="13" text-anchor="end" font-family="sans-serif">-0.5%</text>
  <!-- Key insight -->
  <text x="400" y="385" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">日本の実質金利マイナス継続 → 円安バイアスの構造的要因</text>
</svg>`;

// SVG: Currency strength matrix (slide 37 - 通貨強弱マトリクス)
const currencyMatrix = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要通貨 強弱マトリクス（2026年2月）</text>
  <!-- Header row -->
  <text x="120" y="80" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">通貨</text>
  <text x="210" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">USD</text>
  <text x="290" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">EUR</text>
  <text x="370" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">GBP</text>
  <text x="450" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">JPY</text>
  <text x="530" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">AUD</text>
  <text x="610" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">CHF</text>
  <text x="690" y="80" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">総合</text>
  <!-- Row: USD -->
  <text x="120" y="125" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">USD</text>
  <text x="210" y="125" fill="#9e9e9e" font-size="13" text-anchor="middle" font-family="sans-serif">—</text>
  <rect x="265" y="108" width="50" height="26" fill="${ACCENT2}" rx="3" opacity="0.7"/>
  <text x="290" y="125" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
  <rect x="345" y="108" width="50" height="26" fill="${ACCENT2}" rx="3" opacity="0.7"/>
  <text x="370" y="125" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
  <rect x="425" y="108" width="50" height="26" fill="${ACCENT1}" rx="3" opacity="0.7"/>
  <text x="450" y="125" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
  <rect x="505" y="108" width="50" height="26" fill="${ACCENT2}" rx="3" opacity="0.7"/>
  <text x="530" y="125" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">強</text>
  <rect x="585" y="108" width="50" height="26" fill="${ACCENT1}" rx="3" opacity="0.7"/>
  <text x="610" y="125" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">中</text>
  <text x="690" y="125" fill="${ACCENT2}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">★★★★</text>
  <!-- Row: JPY -->
  <text x="120" y="210" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">JPY★</text>
  <rect x="185" y="193" width="50" height="26" fill="#4caf50" rx="3" opacity="0.7"/>
  <text x="210" y="210" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <rect x="265" y="193" width="50" height="26" fill="#4caf50" rx="3" opacity="0.7"/>
  <text x="290" y="210" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <rect x="345" y="193" width="50" height="26" fill="#4caf50" rx="3" opacity="0.7"/>
  <text x="370" y="210" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <text x="450" y="210" fill="#9e9e9e" font-size="13" text-anchor="middle" font-family="sans-serif">—</text>
  <rect x="505" y="193" width="50" height="26" fill="#4caf50" rx="3" opacity="0.7"/>
  <text x="530" y="210" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <rect x="585" y="193" width="50" height="26" fill="#4caf50" rx="3" opacity="0.7"/>
  <text x="610" y="210" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">弱</text>
  <text x="690" y="210" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">★</text>
  <!-- Key insight -->
  <rect x="60" y="310" width="680" height="60" fill="${BOX}" rx="6"/>
  <text x="400" y="338" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">JPYは全通貨対比で最弱グループ — 金利正常化が見通しを左右</text>
  <text x="400" y="360" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">BOJ利上げペース加速 → JPY強化。遅延 → 円安継続</text>
</svg>`;

// SVG: Forecast range comparison (slide 63)
const forecastRangeChart = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">通貨ペア別 予測レンジ比較（2026年末時点）</text>
  <!-- Chart area -->
  <!-- USD/JPY -->
  <text x="160" y="90" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">USD/JPY</text>
  <!-- Range bar: 143-158, center 150 -->
  <rect x="200" y="73" width="0" height="0"/>
  <line x1="200" y1="83" x2="480" y2="83" stroke="#9e9e9e" stroke-width="4" opacity="0.4"/>
  <rect x="270" y="73" width="145" height="20" fill="${ACCENT1}" rx="3" opacity="0.8"/>
  <text x="350" y="87" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">148-155 (Base)</text>
  <text x="200" y="105" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">143</text>
  <text x="480" y="105" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">162</text>
  <!-- EUR/JPY -->
  <text x="160" y="150" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">EUR/JPY</text>
  <line x1="200" y1="143" x2="480" y2="143" stroke="#9e9e9e" stroke-width="4" opacity="0.4"/>
  <rect x="245" y="133" width="175" height="20" fill="${ACCENT2}" rx="3" opacity="0.8"/>
  <text x="332" y="147" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">160-172 (Base)</text>
  <text x="200" y="165" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">154</text>
  <text x="480" y="165" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">178</text>
  <!-- GBP/JPY -->
  <text x="160" y="210" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">GBP/JPY</text>
  <line x1="200" y1="203" x2="480" y2="203" stroke="#9e9e9e" stroke-width="4" opacity="0.4"/>
  <rect x="235" y="193" width="190" height="20" fill="#29b6f6" rx="3" opacity="0.8"/>
  <text x="330" y="207" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">188-200 (Base)</text>
  <text x="200" y="225" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">183</text>
  <text x="480" y="225" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">208</text>
  <!-- AUD/JPY -->
  <text x="160" y="270" fill="${TEXT}" font-size="14" text-anchor="end" font-family="sans-serif">AUD/JPY</text>
  <line x1="200" y1="263" x2="480" y2="263" stroke="#9e9e9e" stroke-width="4" opacity="0.4"/>
  <rect x="258" y="253" width="160" height="20" fill="#4caf50" rx="3" opacity="0.8"/>
  <text x="338" y="267" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">95-103 (Base)</text>
  <text x="200" y="285" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">92</text>
  <text x="480" y="285" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">107</text>
  <!-- Key driver summary on right -->
  <rect x="510" y="70" width="260" height="230" fill="${BOX}" rx="8"/>
  <text x="640" y="98" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">主要ドライバー</text>
  <text x="640" y="125" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">BOJ利上げペース</text>
  <text x="640" y="148" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">FRB利下げ幅</text>
  <text x="640" y="171" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">日本インフレ持続性</text>
  <text x="640" y="194" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">地政学リスク</text>
  <text x="640" y="217" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">米中貿易動向</text>
  <text x="640" y="240" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">円高バイアス維持</text>
  <text x="640" y="260" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">見通し: 緩やかな円高</text>
  <!-- Key takeaway -->
  <text x="400" y="370" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">全ペア共通: BOJ政策の不確実性がボラティリティ拡大要因</text>
</svg>`;

// SVG: Investor implications (slide 66)
const investorImplications = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">投資家へのインプリケーション — 戦略マップ</text>
  <!-- 4 strategy quadrants -->
  <!-- Q1: Hedge against yen weakness -->
  <rect x="40" y="60" width="340" height="140" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="8"/>
  <text x="210" y="90" fill="${ACCENT1}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">円安継続シナリオ対策</text>
  <text x="60" y="118" fill="${TEXT}" font-size="13" font-family="sans-serif">• 外貨建て資産を増やす（USD/EUR）</text>
  <text x="60" y="140" fill="${TEXT}" font-size="13" font-family="sans-serif">• 輸出企業株・外国株式ETF</text>
  <text x="60" y="162" fill="${TEXT}" font-size="13" font-family="sans-serif">• 為替ヘッジなし海外債券</text>
  <text x="60" y="184" fill="${TEXT}" font-size="13" font-family="sans-serif">• コモディティ（ドル建て原材料）</text>
  <!-- Q2: Hedge against yen strength -->
  <rect x="420" y="60" width="340" height="140" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="8"/>
  <text x="590" y="90" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">円高加速シナリオ対策</text>
  <text x="440" y="118" fill="${TEXT}" font-size="13" font-family="sans-serif">• 為替ヘッジ付き海外資産</text>
  <text x="440" y="140" fill="${TEXT}" font-size="13" font-family="sans-serif">• 国内内需株（小売・サービス）</text>
  <text x="440" y="162" fill="${TEXT}" font-size="13" font-family="sans-serif">• 日本国債（金利上昇前提）</text>
  <text x="440" y="184" fill="${TEXT}" font-size="13" font-family="sans-serif">• 金（ドル建て代替資産）</text>
  <!-- Q3: Base scenario -->
  <rect x="40" y="215" width="340" height="140" fill="${ACCENT1}" rx="8"/>
  <text x="210" y="245" fill="${BG}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">ベースシナリオ (50%)</text>
  <text x="60" y="273" fill="${BG}" font-size="13" font-family="sans-serif">• バランス型ポートフォリオ維持</text>
  <text x="60" y="295" fill="${BG}" font-size="13" font-family="sans-serif">• 為替ヘッジ比率 30-50%</text>
  <text x="60" y="317" fill="${BG}" font-size="13" font-family="sans-serif">• 分散投資を強調</text>
  <text x="60" y="339" fill="${BG}" font-size="13" font-family="sans-serif">• 定期リバランス (四半期)</text>
  <!-- Q4: Risk management -->
  <rect x="420" y="215" width="340" height="140" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="8"/>
  <text x="590" y="245" fill="${ACCENT2}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">リスク管理原則</text>
  <text x="440" y="273" fill="${TEXT}" font-size="13" font-family="sans-serif">• ストップロス設定必須</text>
  <text x="440" y="295" fill="${TEXT}" font-size="13" font-family="sans-serif">• レバレッジ最小化</text>
  <text x="440" y="317" fill="${TEXT}" font-size="13" font-family="sans-serif">• イベントリスク前の縮小</text>
  <text x="440" y="339" fill="${TEXT}" font-size="13" font-family="sans-serif">• BOJ会合前後の注意</text>
</svg>`;

// Map SVGs to slide indices
const svgPatches: Record<number, string> = {
	5: exchangeRateChart,
	13: carryTradeFlow,
	15: realInterestRate,
	22: bojPolicyImpact,
	30: usdJpyOutlook,
	37: currencyMatrix,
	45: riskAssessmentMap,
	60: scenarioProb,
	63: forecastRangeChart,
	66: investorImplications,
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
	`Patched ${Object.keys(svgPatches).length} slides in jpy-forex-outlook-2026`,
);
