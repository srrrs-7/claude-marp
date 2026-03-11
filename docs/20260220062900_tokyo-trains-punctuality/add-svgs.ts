import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220062900_tokyo-trains-punctuality";

// --- SVG Assets ---

// Slide 4: 各国の鉄道定時率比較 — bar chart
const svgPunctuality = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <!-- title -->
  <text x="400" y="32" fill="#ffffff" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">各国の鉄道定時率比較（遅延定義は各国基準）</text>
  <!-- bars -->
  <!-- Japan Shinkansen 99.3% -->
  <rect x="60" y="55" width="595" height="42" fill="#f9a825" rx="4"/>
  <text x="670" y="82" fill="#f9a825" font-size="15" font-family="sans-serif">99.3%</text>
  <text x="55" y="82" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="end">新幹線</text>
  <!-- Japan Local 95% -->
  <rect x="60" y="110" width="570" height="42" fill="#f9a825" rx="4" opacity="0.8"/>
  <text x="645" y="137" fill="#f9a825" font-size="15" font-family="sans-serif">95%</text>
  <text x="55" y="137" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="end">在来線</text>
  <!-- UK 70% -->
  <rect x="60" y="165" width="420" height="42" fill="#e91e63" rx="4" opacity="0.85"/>
  <text x="495" y="192" fill="#e91e63" font-size="15" font-family="sans-serif">70%</text>
  <text x="55" y="192" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="end">英国</text>
  <!-- Germany 65% -->
  <rect x="60" y="220" width="390" height="42" fill="#e91e63" rx="4" opacity="0.75"/>
  <text x="465" y="247" fill="#e91e63" font-size="15" font-family="sans-serif">65%</text>
  <text x="55" y="247" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="end">ドイツ</text>
  <!-- USA 50% -->
  <rect x="60" y="275" width="300" height="42" fill="#e91e63" rx="4" opacity="0.65"/>
  <text x="375" y="302" fill="#e91e63" font-size="15" font-family="sans-serif">50%</text>
  <text x="55" y="302" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="end">米国</text>
  <!-- x-axis labels -->
  <line x1="60" y1="340" x2="720" y2="340" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <text x="60" y="358" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">0%</text>
  <text x="240" y="358" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">30%</text>
  <text x="420" y="358" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">60%</text>
  <text x="540" y="358" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">80%</text>
  <text x="660" y="358" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">99%</text>
  <text x="400" y="390" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">※ 各国で「遅延」の定義（1分〜10分）が異なるため直接比較には注意が必要</text>
</svg>`;

// Slide 7: ATC仕組み — system flow
const svgATC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="32" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">ATC 自動列車制御システムの流れ</text>
  <!-- boxes -->
  <rect x="30" y="70" width="140" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="100" y="97" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">軌道回路</text>
  <text x="100" y="115" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">列車位置検知</text>
  <!-- arrow -->
  <line x1="170" y1="100" x2="210" y2="100" stroke="#f9a825" stroke-width="2"/>
  <polygon points="210,94 222,100 210,106" fill="#f9a825"/>
  <rect x="222" y="70" width="140" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="292" y="97" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">速度照査</text>
  <text x="292" y="115" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">先行距離計算</text>
  <!-- arrow -->
  <line x1="362" y1="100" x2="402" y2="100" stroke="#f9a825" stroke-width="2"/>
  <polygon points="402,94 414,100 402,106" fill="#f9a825"/>
  <rect x="414" y="70" width="140" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="484" y="97" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">速度指令</text>
  <text x="484" y="115" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">運転台へ送信</text>
  <!-- arrow -->
  <line x1="554" y1="100" x2="594" y2="100" stroke="#f9a825" stroke-width="2"/>
  <polygon points="594,94 606,100 594,106" fill="#f9a825"/>
  <rect x="606" y="70" width="140" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="676" y="97" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">自動ブレーキ</text>
  <text x="676" y="115" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">超過時は強制</text>
  <!-- lower section: DS-ATC for Shinkansen -->
  <rect x="200" y="200" width="400" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="228" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">新幹線 DS-ATC</text>
  <text x="400" y="250" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">15秒ごとに速度指令を更新</text>
  <text x="400" y="268" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">時速285kmを秒単位で制御</text>
  <!-- connecting arrow down -->
  <line x1="484" y1="130" x2="484" y2="195" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="484" y1="195" x2="420" y2="195" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="414,189 426,195 414,201" fill="#e91e63"/>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">山手線: 最短2分間隔運行 — ATCなしでは実現不可能</text>
</svg>`;

// Slide 10: ATOS recovery flow
const svgATOS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">ATOS 自動遅延回復プロセス</text>
  <!-- step 1 -->
  <rect x="30" y="60" width="160" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="110" y="88" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">遅延発生</text>
  <text x="110" y="106" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">例: 山手線</text>
  <text x="110" y="120" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">+3分の遅延</text>
  <!-- arrow -->
  <polygon points="196,91 208,97 196,103" fill="#f9a825"/>
  <line x1="190" y1="97" x2="208" y2="97" stroke="#f9a825" stroke-width="2"/>
  <!-- step 2 -->
  <rect x="210" y="60" width="160" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="290" y="88" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">ATOS検知</text>
  <text x="290" y="106" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">1,600駅の</text>
  <text x="290" y="120" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">全列車を監視</text>
  <!-- arrow -->
  <polygon points="376,91 388,97 376,103" fill="#f9a825"/>
  <line x1="370" y1="97" x2="388" y2="97" stroke="#f9a825" stroke-width="2"/>
  <!-- step 3 -->
  <rect x="390" y="60" width="160" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="470" y="88" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">復旧案生成</text>
  <text x="470" y="106" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">停車時間短縮</text>
  <text x="470" y="120" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">2〜3秒/駅</text>
  <!-- arrow -->
  <polygon points="556,91 568,97 556,103" fill="#e91e63"/>
  <line x1="550" y1="97" x2="568" y2="97" stroke="#e91e63" stroke-width="2"/>
  <!-- step 4 -->
  <rect x="570" y="60" width="165" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="652" y="88" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">自動回復</text>
  <text x="652" y="106" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">3〜4周で</text>
  <text x="652" y="120" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">遅延ほぼ解消</text>
  <!-- analogy box -->
  <rect x="150" y="200" width="500" height="75" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="225" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">エンジニアリングとの対比</text>
  <text x="400" y="248" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">分散システムの 自動スケーリング + リバランシング</text>
  <text x="400" y="266" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">自己修復システム（Self-Healing Architecture）</text>
  <text x="400" y="340" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1日 約12,000本の列車を同時最適化</text>
</svg>`;

// Slide 13: boarding design
const svgBoarding = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">乗降最適化：ホーム設計のプロトコル</text>
  <!-- platform rect -->
  <rect x="50" y="140" width="700" height="100" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="163" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle">ホームドア（安全確保 + 停車精度向上）</text>
  <!-- door openings -->
  <rect x="130" y="140" width="60" height="100" rx="3" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
  <rect x="330" y="140" width="60" height="100" rx="3" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
  <rect x="530" y="140" width="60" height="100" rx="3" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
  <!-- queues: arrows show boarding protocol -->
  <!-- exit arrows (from door) -->
  <polygon points="160,128 152,140 168,140" fill="#e91e63"/>
  <text x="160" y="122" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">降車優先</text>
  <!-- queue lines left of each door -->
  <line x1="120" y1="250" x2="120" y2="270" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="120" y="285" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">整列</text>
  <line x1="320" y1="250" x2="320" y2="270" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="320" y="285" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">整列</text>
  <line x1="520" y1="250" x2="520" y2="270" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="520" y="285" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">整列</text>
  <!-- labels -->
  <text x="400" y="320" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">目標: 1駅あたり停車時間 30秒以内</text>
  <rect x="575" y="308" width="190" height="46" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="670" y="327" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">ワイドドア（東西線）</text>
  <text x="670" y="345" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">1.8m（通常1.3m）</text>
  <text x="400" y="368" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">「整列乗車」という暗黙のプロトコルがスループットを決める</text>
</svg>`;

// Slide 15: driver skill — stop precision
const svgDriver = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">運転士の停車精度と安全習慣</text>
  <!-- scale bar: target zone -->
  <rect x="100" y="90" width="600" height="40" rx="4" fill="#16213e" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <rect x="370" y="90" width="60" height="40" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="400" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">±10cm</text>
  <text x="100" y="80" fill="#aaaaaa" font-size="11" font-family="sans-serif">停車目標範囲（ホームドア対応）</text>
  <!-- annotation arrows -->
  <line x1="400" y1="130" x2="400" y2="155" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="394,155 400,167 406,155" fill="#f9a825"/>
  <text x="400" y="185" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">精度 ±10cm以内</text>
  <!-- habits box -->
  <rect x="60" y="215" width="300" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="238" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">指差確認（Pointing &amp; Calling）</text>
  <text x="210" y="258" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">全操作を声に出して指差す</text>
  <text x="210" y="276" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">エラー率を約85%低減（鉄道総研）</text>
  <text x="210" y="294" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">→ 航空・医療にも導入されている</text>
  <text x="210" y="312" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">訓練期間: 約1年</text>
  <!-- tech + human box -->
  <rect x="430" y="215" width="300" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="580" y="238" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">技術 + 人間のハイブリッド</text>
  <text x="580" y="258" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">ATO（自動運転）でも</text>
  <text x="580" y="276" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">最終調整は人間が行う</text>
  <text x="580" y="294" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">完全自動化より協調が効率的</text>
  <text x="400" y="345" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">テクノロジーと人間の技術の組み合わせが最適解</text>
</svg>`;

// Slide 17: system design principles
const svgPrinciples = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">東京の鉄道から学ぶシステム設計5原則</text>
  <!-- principle boxes in two rows -->
  <!-- P1 -->
  <rect x="30" y="60" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="88" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">1. 多層防御</text>
  <text x="140" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">ATC + ATOS + 人間</text>
  <text x="140" y="123" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">3層で信頼性確保</text>
  <!-- P2 -->
  <rect x="290" y="60" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="88" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">2. 自動回復</text>
  <text x="400" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">遅延を自動で吸収</text>
  <text x="400" y="123" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">レジリエンス設計</text>
  <!-- P3 -->
  <rect x="550" y="60" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="660" y="88" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">3. 標準化</text>
  <text x="660" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">整列乗車という</text>
  <text x="660" y="123" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">「暗黙のAPI」</text>
  <!-- P4 -->
  <rect x="100" y="200" width="240" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="220" y="228" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">4. 秒単位のSLA</text>
  <text x="220" y="247" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">「1分」を遅延とする</text>
  <text x="220" y="263" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">厳格な品質基準</text>
  <!-- P5 -->
  <rect x="460" y="200" width="240" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="580" y="228" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">5. ハイブリッド</text>
  <text x="580" y="247" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">人間 + 機械の協調</text>
  <text x="580" y="263" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">完全自動化より効率的</text>
  <text x="400" y="350" fill="#888888" font-size="12" font-family="sans-serif" text-anchor="middle">99.3%の信頼性は偶然では達成できない — 設計の積み重ねが必要</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// Slide index 3 (各国の鉄道定時率比較) — insert SVG as first content
data.slides[3].content = [
	`![w:800 center](assets/svg-punctuality.svg)`,
	...data.slides[3].content,
];

// Slide index 6 (ATC) — insert SVG
data.slides[6].content = [
	`![w:800 center](assets/svg-atc.svg)`,
	...data.slides[6].content,
];

// Slide index 9 (ATOS autodescription) — insert SVG
data.slides[9].content = [
	`![w:800 center](assets/svg-atos.svg)`,
	...data.slides[9].content,
];

// Slide index 12 (乗降時間を最小化) — insert SVG
data.slides[12].content = [
	`![w:800 center](assets/svg-boarding.svg)`,
	...data.slides[12].content,
];

// Slide index 14 (秒単位の停車技術) — insert SVG
data.slides[14].content = [
	`![w:800 center](assets/svg-driver.svg)`,
	...data.slides[14].content,
];

// Slide index 16 (東京の鉄道から学ぶシステム設計原則) — insert SVG
data.slides[16].content = [
	`![w:800 center](assets/svg-principles.svg)`,
	...data.slides[16].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));

// Write SVGs
writeFileSync(`${BASE}/assets/svg-punctuality.svg`, svgPunctuality);
writeFileSync(`${BASE}/assets/svg-atc.svg`, svgATC);
writeFileSync(`${BASE}/assets/svg-atos.svg`, svgATOS);
writeFileSync(`${BASE}/assets/svg-boarding.svg`, svgBoarding);
writeFileSync(`${BASE}/assets/svg-driver.svg`, svgDriver);
writeFileSync(`${BASE}/assets/svg-principles.svg`, svgPrinciples);

console.log("tokyo-trains: SVGs written and slides-data.json updated.");
// Verify
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
