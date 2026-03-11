import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220064400_engineer-salary-happiness";

// Slide 3: イースタリンのパラドックス — GDP vs happiness
const svgEasterlin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">イースタリンのパラドックス — GDP成長 vs 幸福度</text>
  <!-- axes -->
  <line x1="80" y1="290" x2="720" y2="290" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <line x1="80" y1="60" x2="80" y2="295" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <text x="400" y="320" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">年 (1960 → 2000)</text>
  <text x="30" y="180" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle" transform="rotate(-90,30,180)">指数</text>
  <!-- GDP line: rising steeply -->
  <polyline points="80,270 180,230 280,180 380,130 480,90 580,65 680,50 720,48" fill="none" stroke="#f9a825" stroke-width="3"/>
  <text x="730" y="50" fill="#f9a825" font-size="12" font-family="sans-serif">GDP</text>
  <!-- Happiness line: flat -->
  <polyline points="80,200 180,195 280,200 380,205 480,198 580,202 680,200 720,198" fill="none" stroke="#e91e63" stroke-width="3"/>
  <text x="730" y="200" fill="#e91e63" font-size="12" font-family="sans-serif">幸福度</text>
  <!-- x-axis labels -->
  <text x="80" y="310" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1960</text>
  <text x="280" y="310" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1970</text>
  <text x="480" y="310" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1980</text>
  <text x="680" y="310" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">2000</text>
  <!-- annotation -->
  <text x="400" y="345" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">日本: GDP 4倍になっても生活満足度は横ばい (1960-2000)</text>
  <text x="400" y="362" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">ヘドニック・トレッドミル: 慣れが幸福感をリセットする</text>
</svg>`;

// Slide 6: engineer salary distribution bar chart
const svgSalaryDist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">日本のエンジニア年収分布（2024年）</text>
  <!-- bars -->
  <!-- 新卒〜3年 300-450 -->
  <rect x="80" y="80" width="210" height="40" rx="4" fill="#f9a825" opacity="0.5"/>
  <text x="80" y="75" fill="#aaaaaa" font-size="11" font-family="sans-serif">新卒〜3年</text>
  <text x="300" y="106" fill="#f9a825" font-size="12" font-family="sans-serif">300〜450万円</text>
  <!-- 5-10年 500-700 -->
  <rect x="80" y="140" width="330" height="40" rx="4" fill="#f9a825" opacity="0.65"/>
  <text x="80" y="135" fill="#aaaaaa" font-size="11" font-family="sans-serif">中堅(5〜10年)</text>
  <text x="420" y="166" fill="#f9a825" font-size="12" font-family="sans-serif">500〜700万円</text>
  <!-- 10年+ 700-1000 -->
  <rect x="80" y="200" width="420" height="40" rx="4" fill="#f9a825" opacity="0.8"/>
  <text x="80" y="195" fill="#aaaaaa" font-size="11" font-family="sans-serif">シニア(10年+)</text>
  <text x="510" y="226" fill="#f9a825" font-size="12" font-family="sans-serif">700〜1000万円</text>
  <!-- TL/Mgr 800-1200 -->
  <rect x="80" y="260" width="480" height="40" rx="4" fill="#e91e63" opacity="0.7"/>
  <text x="80" y="255" fill="#aaaaaa" font-size="11" font-family="sans-serif">TL/マネージャー</text>
  <text x="570" y="285" fill="#e91e63" font-size="12" font-family="sans-serif">800〜1200万円</text>
  <!-- GAFAM marker -->
  <line x1="600" y1="60" x2="600" y2="310" stroke="#ffffff" stroke-width="1" stroke-dasharray="5,4" opacity="0.4"/>
  <text x="600" y="55" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">外資GAFAM</text>
  <text x="600" y="330" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">1500〜3000万円+</text>
  <!-- median line -->
  <line x1="250" y1="60" x2="250" y2="310" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.5"/>
  <text x="250" y="55" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">中央値 約600万</text>
</svg>`;

// Slide 9: diminishing returns curve
const svgDiminishing = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">お金で買える幸せの逓減曲線</text>
  <!-- axes -->
  <line x1="80" y1="290" x2="720" y2="290" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <line x1="80" y1="60" x2="80" y2="295" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <text x="400" y="318" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">年収（万円）</text>
  <text x="28" y="175" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle" transform="rotate(-90,28,175)">日常の幸福感</text>
  <!-- curve: logarithmic rising then flat -->
  <path d="M80,285 Q180,200 280,155 Q380,120 480,105 Q560,95 640,90 Q680,88 720,87" fill="none" stroke="#f9a825" stroke-width="3"/>
  <!-- saturation zone -->
  <rect x="450" y="60" width="270" height="230" rx="4" fill="#f9a825" opacity="0.04"/>
  <line x1="450" y1="60" x2="450" y2="290" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>
  <text x="570" y="80" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" opacity="0.8">飽和ゾーン</text>
  <!-- x labels -->
  <text x="80" y="308" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">0</text>
  <text x="210" y="308" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">300</text>
  <text x="330" y="308" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">500</text>
  <text x="450" y="308" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">750</text>
  <text x="580" y="308" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">1000</text>
  <text x="700" y="308" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">1500</text>
  <!-- callout: Kahneman -->
  <line x1="450" y1="110" x2="380" y2="145" stroke="#e91e63" stroke-width="1.5"/>
  <rect x="150" y="148" width="235" height="42" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="267" y="167" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">Kahneman &amp; Deaton (2010)</text>
  <text x="267" y="183" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">$75K(約750万)で日常の幸福感は飽和</text>
  <text x="400" y="345" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">お金が解決するのは「経済的ストレスの除去」まで / それ以上は使い方が鍵</text>
</svg>`;

// Slide 11: Hedonic Adaptation
const svgHedonic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">ヘドニック・アダプテーション（快楽の踏み車）</text>
  <!-- treadmill cycle -->
  <!-- base happiness line -->
  <line x1="70" y1="200" x2="730" y2="200" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.5"/>
  <text x="40" y="205" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">基準</text>
  <!-- wave: rise then fall back to baseline -->
  <path d="M80,200 L150,200 L160,120 L220,120 L260,200 L320,200 L330,110 L390,110 L430,200 L490,200 L500,100 L560,100 L610,200 L680,200" fill="none" stroke="#e91e63" stroke-width="2.5"/>
  <!-- event labels -->
  <text x="190" y="112" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">昇給</text>
  <text x="360" y="102" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">昇給</text>
  <text x="530" y="92" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">昇給</text>
  <!-- baseline return arrows -->
  <text x="260" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">慣れ→基準に戻る</text>
  <text x="430" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">慣れ→基準に戻る</text>
  <text x="610" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">慣れ→基準に戻る</text>
  <!-- axis labels -->
  <text x="400" y="280" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">→ 時間</text>
  <!-- lifestyle inflation box -->
  <rect x="100" y="305" width="600" height="45" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="325" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">ライフスタイル・インフレーション</text>
  <text x="400" y="343" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">収入増 → 支出増 → 余裕なし → 比較対象が上にシフト</text>
</svg>`;

// Slide 13: SDT intrinsic motivation
const svgSDT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">自己決定理論（SDT）— 内発的幸福の3要素</text>
  <!-- 3 circles -->
  <!-- Autonomy -->
  <ellipse cx="200" cy="185" rx="130" ry="90" fill="#16213e" stroke="#f9a825" stroke-width="2.5" opacity="0.9"/>
  <text x="200" y="175" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">自律性</text>
  <text x="200" y="197" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Autonomy</text>
  <text x="200" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">自分で意思決定</text>
  <text x="200" y="235" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">できる環境</text>
  <!-- Competence -->
  <ellipse cx="400" cy="130" rx="130" ry="90" fill="#16213e" stroke="#e91e63" stroke-width="2.5" opacity="0.9"/>
  <text x="400" y="120" fill="#e91e63" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">有能感</text>
  <text x="400" y="142" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Competence</text>
  <text x="400" y="163" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">スキルが成長</text>
  <text x="400" y="180" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">している実感</text>
  <!-- Relatedness -->
  <ellipse cx="600" cy="185" rx="130" ry="90" fill="#16213e" stroke="#f9a825" stroke-width="2.5" opacity="0.9"/>
  <text x="600" y="175" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">関係性</text>
  <text x="600" y="197" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Relatedness</text>
  <text x="600" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">良い人間関係</text>
  <text x="600" y="235" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">帰属意識</text>
  <!-- center intersection -->
  <text x="400" y="196" fill="#ffffff" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">幸福</text>
  <!-- bottom -->
  <rect x="120" y="295" width="560" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="318" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">年収1000万でも3つが満たされなければ不幸</text>
  <text x="400" y="338" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">年収600万でも3つが満たされていれば幸福</text>
</svg>`;

// Slide 15: salary vs happiness optimization
const svgOptimal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">年収最大化 vs 幸福最大化：比較</text>
  <!-- left: max salary -->
  <rect x="40" y="60" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="87" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">年収最大化戦略</text>
  <text x="200" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">外資系GAFAM</text>
  <text x="200" y="138" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">高報酬</text>
  <text x="200" y="163" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">× 高負荷・不安定</text>
  <text x="200" y="183" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">× 自律性が低い場合も</text>
  <text x="200" y="203" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">× PIP・レイオフリスク</text>
  <text x="200" y="260" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">ヘドニック・アダプテーションで</text>
  <text x="200" y="276" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">慣れてしまう</text>
  <!-- right: max happiness -->
  <rect x="440" y="60" width="320" height="230" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="600" y="87" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">幸福最大化戦略</text>
  <text x="600" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">「十分な年収」+ 3要素</text>
  <text x="600" y="138" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">自律性 × 成長 × 仲間</text>
  <text x="600" y="163" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">通勤30分短縮=年収+40万相当</text>
  <text x="600" y="183" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">完全リモート=年収+8%相当</text>
  <text x="600" y="203" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">技術的興味のある仕事</text>
  <text x="600" y="260" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">時間 × 自由度 × 成長</text>
  <text x="600" y="276" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">の最適化が鍵</text>
  <!-- conclusion -->
  <rect x="120" y="312" width="560" height="42" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="337" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">年収は「十分」であればよい。その先は別の投資を</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// index 3: イースタリンのパラドックス
data.slides[3].content = [
	`![w:800 center](assets/svg-easterlin.svg)`,
	...data.slides[3].content,
];
// index 5: 日本のエンジニア年収分布 (index 5 = "日本のエンジニア年収分布")
data.slides[5].content = [
	`![w:800 center](assets/svg-salary-dist.svg)`,
	...data.slides[5].content,
];
// index 8: お金で買える幸せの限界
data.slides[8].content = [
	`![w:800 center](assets/svg-diminishing.svg)`,
	...data.slides[8].content,
];
// index 9: ヘドニック・アダプテーション
data.slides[9].content = [
	`![w:800 center](assets/svg-hedonic.svg)`,
	...data.slides[9].content,
];
// index 12: 自己決定理論
data.slides[12].content = [
	`![w:800 center](assets/svg-sdt.svg)`,
	...data.slides[12].content,
];
// index 14: 年収最大化 vs 幸福最大化
data.slides[14].content = [
	`![w:800 center](assets/svg-optimal.svg)`,
	...data.slides[14].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-easterlin.svg`, svgEasterlin);
writeFileSync(`${BASE}/assets/svg-salary-dist.svg`, svgSalaryDist);
writeFileSync(`${BASE}/assets/svg-diminishing.svg`, svgDiminishing);
writeFileSync(`${BASE}/assets/svg-hedonic.svg`, svgHedonic);
writeFileSync(`${BASE}/assets/svg-sdt.svg`, svgSDT);
writeFileSync(`${BASE}/assets/svg-optimal.svg`, svgOptimal);

console.log(
	"engineer-salary-happiness: SVGs written and slides-data.json updated.",
);
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
