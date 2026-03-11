import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dir =
	"/workspace/main/docs/20260220062100_japanese-game-industry-golden-age";
const dataPath = path.join(dir, "slides-data.json");
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

// SVG 1: Famicom specs comparison
const famifomSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">ファミリーコンピュータ（1983）戦略的優位性</text>
  <!-- Price comparison -->
  <text x="200" y="58" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4ec9b0" font-weight="bold">価格比較</text>
  <rect x="50" y="66" width="100" height="136" rx="4" fill="#003820"/>
  <text x="100" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">ファミコン</text>
  <text x="100" y="176" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#4ec9b0" font-weight="bold">¥14,800</text>
  <text x="100" y="192" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">1983年</text>
  <rect x="200" y="66" width="100" height="192" rx="4" fill="#300010"/>
  <text x="250" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">競合機</text>
  <text x="250" y="230" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#e91e63" font-weight="bold">¥30,000+</text>
  <text x="250" y="246" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">同期水準</text>
  <text x="170" y="270" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825">→ 半額以下を実現</text>
  <!-- Y axis -->
  <line x1="44" y1="60" x2="44" y2="262" stroke="#555" stroke-width="1.5"/>
  <text x="40" y="72" text-anchor="end" font-family="sans-serif" font-size="10" fill="#aaa">高</text>
  <text x="40" y="258" text-anchor="end" font-family="sans-serif" font-size="10" fill="#aaa">低</text>
  <!-- Key factors on right -->
  <rect x="360" y="46" width="400" height="280" rx="8" fill="#16213e"/>
  <text x="560" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825" font-weight="bold">成功の構造的要因</text>
  <rect x="380" y="80" width="360" height="44" rx="5" fill="#0d1b2a"/>
  <text x="560" y="102" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">ゲーム専用機への集中</text>
  <text x="560" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">山内溥社長の決断：多機能化を拒否</text>
  <rect x="380" y="132" width="360" height="44" rx="5" fill="#0d1b2a"/>
  <text x="560" y="154" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">カスタムCPU（6502互換）</text>
  <text x="560" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">リコー製: 性能・コストの最適解</text>
  <rect x="380" y="184" width="360" height="44" rx="5" fill="#0d1b2a"/>
  <text x="560" y="206" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">北米: トイザらスとの提携</text>
  <text x="560" y="222" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">ロボットおもちゃとして再設計</text>
  <rect x="380" y="236" width="360" height="44" rx="5" fill="#0d1b2a"/>
  <text x="560" y="258" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825" font-weight="bold">結果: 1,500万台 (日本)</text>
  <text x="560" y="274" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">アタリの廃墟から3年で市場復活</text>
</svg>`;

// SVG 2: 16-bit console war
const consoleWarSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">セガ vs 任天堂：16ビット戦争（1988-1996）</text>
  <!-- Left: Sega -->
  <rect x="30" y="46" width="340" height="284" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="70" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">セガ メガドライブ（1988）</text>
  <rect x="50" y="82" width="300" height="38" rx="5" fill="#200000"/>
  <text x="200" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ff8080">「ニンテンドーのできないことをする」</text>
  <!-- Sega strengths -->
  <rect x="50" y="128" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="200" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">ソニック（1991）→ スピード感・自由度</text>
  <rect x="50" y="170" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="200" y="192" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">攻撃的マーケティング</text>
  <rect x="50" y="212" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="200" y="234" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">北米シェア 35%まで奪取</text>
  <!-- Market result -->
  <rect x="50" y="254" width="300" height="60" rx="5" fill="#300010"/>
  <text x="200" y="278" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63" font-weight="bold">累計: 約3,000万台</text>
  <text x="200" y="298" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">競争がソニックを生んだ</text>
  <!-- Right: Nintendo -->
  <rect x="430" y="46" width="340" height="284" rx="8" fill="#16213e" stroke="#4ec9b0" stroke-width="2"/>
  <text x="600" y="70" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4ec9b0" font-weight="bold">任天堂 スーパーファミコン（1990）</text>
  <rect x="450" y="82" width="300" height="38" rx="5" fill="#003820"/>
  <text x="600" y="101" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#80ffcc">マリオ・ゼルダ・FF・DQで反撃</text>
  <!-- Nintendo strengths -->
  <rect x="450" y="128" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="600" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">Mode 7（擬似3D）技術革新</text>
  <rect x="450" y="170" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="600" y="192" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">品質管理・Seal of Quality継続</text>
  <rect x="450" y="212" width="300" height="34" rx="5" fill="#0d1b2a"/>
  <text x="600" y="234" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">日本市場 70%を維持</text>
  <!-- Market result -->
  <rect x="450" y="254" width="300" height="60" rx="5" fill="#003820"/>
  <text x="600" y="278" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4ec9b0" font-weight="bold">累計: 約4,900万台</text>
  <text x="600" y="298" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">競争が革新を加速した</text>
</svg>`;

// SVG 3: Sony PlayStation revolution
const playstationSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">PlayStation（1994）が変えた5つのこと</text>
  <!-- 5 changes -->
  <rect x="40" y="50" width="340" height="54" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="60" y="72" font-family="sans-serif" font-size="13" fill="#e91e63" font-weight="bold">1. 媒体革命</text>
  <text x="60" y="90" font-family="sans-serif" font-size="12" fill="#aaa">CD-ROM採用: カートリッジの10倍以上の容量</text>
  <rect x="420" y="50" width="340" height="54" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="440" y="72" font-family="sans-serif" font-size="13" fill="#e91e63" font-weight="bold">2. 開発者優遇</text>
  <text x="440" y="90" font-family="sans-serif" font-size="12" fill="#aaa">低ロイヤリティ率: サードパーティが殺到</text>
  <rect x="40" y="118" width="340" height="54" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="60" y="140" font-family="sans-serif" font-size="13" fill="#f9a825" font-weight="bold">3. 年齢層拡大</text>
  <text x="60" y="158" font-family="sans-serif" font-size="12" fill="#aaa">「ゲームは子供」から20〜30代ターゲットへ</text>
  <rect x="420" y="118" width="340" height="54" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="440" y="140" font-family="sans-serif" font-size="13" fill="#f9a825" font-weight="bold">4. 映像革命</text>
  <text x="440" y="158" font-family="sans-serif" font-size="12" fill="#aaa">FF7の3DCGムービー: 映画的体験の実現</text>
  <rect x="40" y="186" width="720" height="54" rx="6" fill="#16213e" stroke="#4ec9b0" stroke-width="1.5"/>
  <text x="60" y="208" font-family="sans-serif" font-size="13" fill="#4ec9b0" font-weight="bold">5. 文化的転換</text>
  <text x="60" y="226" font-family="sans-serif" font-size="12" fill="#aaa">ゲームが「文化」として認知される転換点 → 1億249万台（史上初）</text>
  <!-- Key titles -->
  <rect x="40" y="256" width="720" height="80" rx="8" fill="#0d1b2a"/>
  <text x="400" y="278" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825" font-weight="bold">代表タイトルが定義した新ジャンル</text>
  <rect x="60" y="286" width="154" height="34" rx="4" fill="#16213e"/>
  <text x="137" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">FF7 → シネマRPG</text>
  <rect x="228" y="286" width="154" height="34" rx="4" fill="#16213e"/>
  <text x="305" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">MGS → ステルス</text>
  <rect x="396" y="286" width="154" height="34" rx="4" fill="#16213e"/>
  <text x="473" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">GT → シム</text>
  <rect x="564" y="286" width="154" height="34" rx="4" fill="#16213e"/>
  <text x="641" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">バイオ → ホラー</text>
</svg>`;

// SVG 4: 5 structural advantages
const advantagesSvg = `<svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">なぜ日本が世界を制覇できたか：5つの構造的優位性</text>
  <!-- Pentagon-like layout -->
  <!-- Top center -->
  <rect x="286" y="46" width="228" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="67" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825" font-weight="bold">1. アタリショック後の空白</text>
  <text x="400" y="84" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">競合不在の市場に参入</text>
  <!-- Left -->
  <rect x="30" y="114" width="228" height="50" rx="8" fill="#16213e" stroke="#4ec9b0" stroke-width="2"/>
  <text x="144" y="135" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">2. ハード・ソフト垂直統合</text>
  <text x="144" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">プラットフォーム+コンテンツ</text>
  <!-- Right -->
  <rect x="542" y="114" width="228" height="50" rx="8" fill="#16213e" stroke="#4ec9b0" stroke-width="2"/>
  <text x="656" y="135" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">3. 品質管理の徹底</text>
  <text x="656" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">任天堂モデルが業界標準に</text>
  <!-- Bottom left -->
  <rect x="110" y="230" width="228" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="224" y="251" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63" font-weight="bold">4. 文化的蓄積</text>
  <text x="224" y="268" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">マンガ・アニメの技法</text>
  <!-- Bottom right -->
  <rect x="462" y="230" width="228" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="576" y="251" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63" font-weight="bold">5. 長期的視点の経営</text>
  <text x="576" y="268" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">短期利益より「ファンの信頼」</text>
  <!-- Connecting lines -->
  <line x1="286" y1="71" x2="258" y2="114" stroke="#555" stroke-width="1" opacity="0.6"/>
  <line x1="514" y1="71" x2="542" y2="114" stroke="#555" stroke-width="1" opacity="0.6"/>
  <line x1="144" y1="164" x2="180" y2="230" stroke="#555" stroke-width="1" opacity="0.6"/>
  <line x1="656" y1="164" x2="620" y2="230" stroke="#555" stroke-width="1" opacity="0.6"/>
  <line x1="338" y1="280" x2="462" y2="280" stroke="#555" stroke-width="1" opacity="0.6"/>
  <!-- Center: result -->
  <rect x="310" y="148" width="180" height="62" rx="8" fill="#0d1b2a" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="172" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825" font-weight="bold">世界市場 98%</text>
  <text x="400" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">制覇（1990年代）</text>
  <!-- Result -->
  <rect x="100" y="294" width="600" height="34" rx="6" fill="#16213e"/>
  <text x="400" y="316" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">5つの要素が相乗効果を発揮 → 構造的必然の勝利</text>
</svg>`;

// Write SVGs
writeFileSync(`${dir}/assets/famicom-strategy.svg`, famifomSvg);
writeFileSync(`${dir}/assets/console-war.svg`, consoleWarSvg);
writeFileSync(`${dir}/assets/playstation-revolution.svg`, playstationSvg);
writeFileSync(`${dir}/assets/five-advantages.svg`, advantagesSvg);

// Patch slides
// "ファミリーコンピュータ（1983年）"
const famiIdx = slides.findIndex((s: { title: string }) =>
	s.title.includes("ファミリーコンピュータ"),
);
if (
	famiIdx !== -1 &&
	!slides[famiIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[famiIdx].content.unshift(
		"![w:800 center](assets/famicom-strategy.svg)",
	);
}

// "セガ vs 任天堂：最初のコンソール戦争"
const segaIdx = slides.findIndex((s: { title: string }) =>
	s.title.includes("セガ vs 任天堂"),
);
if (
	segaIdx !== -1 &&
	!slides[segaIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[segaIdx].content.unshift("![w:800 center](assets/console-war.svg)");
}

// "ソニーの参入（1994年）"
const sonyIdx = slides.findIndex((s: { title: string }) =>
	s.title.includes("ソニーの参入"),
);
if (
	sonyIdx !== -1 &&
	!slides[sonyIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[sonyIdx].content.unshift(
		"![w:800 center](assets/playstation-revolution.svg)",
	);
}

// "5つの構造的優位性"
const fiveIdx = slides.findIndex((s: { title: string }) =>
	s.title.includes("5つの構造的優位性"),
);
if (
	fiveIdx !== -1 &&
	!slides[fiveIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[fiveIdx].content.unshift(
		"![w:800 center](assets/five-advantages.svg)",
	);
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log("japanese-game-golden-age round 2: patches applied");
const svgCount = slides.filter((s: { content: string[] }) =>
	s.content.some((c) => c.includes("assets/")),
).length;
console.log(
	"SVG slides:",
	svgCount,
	"/",
	slides.length,
	`= ${Math.floor((svgCount * 100) / slides.length)}%`,
);
