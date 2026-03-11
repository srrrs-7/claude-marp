import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220062900_tokyo-trains-punctuality";

// Extra SVGs to reach ≥50%
// Need 10/19, currently have 7. Need 3 more.

// Slide index 1 (アジェンダ) — agenda visual
const svgAgenda = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">本日のアジェンダ</text>
  <rect x="60" y="60" width="680" height="52" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="110" y="82" fill="#f9a825" font-size="15" font-family="sans-serif" font-weight="bold">1</text>
  <text x="140" y="82" fill="#ffffff" font-size="14" font-family="sans-serif">世界が驚く東京の定時運行</text>
  <text x="140" y="100" fill="#aaaaaa" font-size="11" font-family="sans-serif">99.3%の定時率 — 世界最高水準の数字</text>
  <rect x="60" y="122" width="680" height="52" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="110" y="144" fill="#f9a825" font-size="15" font-family="sans-serif" font-weight="bold">2-3</text>
  <text x="140" y="144" fill="#ffffff" font-size="14" font-family="sans-serif">ATC + ATOS：多層制御の仕組み</text>
  <text x="140" y="162" fill="#aaaaaa" font-size="11" font-family="sans-serif">自動列車制御 + AI運行管理システム</text>
  <rect x="60" y="184" width="680" height="52" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="206" fill="#e91e63" font-size="15" font-family="sans-serif" font-weight="bold">4</text>
  <text x="140" y="206" fill="#ffffff" font-size="14" font-family="sans-serif">ホーム設計と乗降の最適化</text>
  <text x="140" y="224" fill="#aaaaaa" font-size="11" font-family="sans-serif">整列乗車という「暗黙のプロトコル」</text>
  <rect x="60" y="246" width="680" height="52" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="268" fill="#e91e63" font-size="15" font-family="sans-serif" font-weight="bold">5</text>
  <text x="140" y="268" fill="#ffffff" font-size="14" font-family="sans-serif">人間の技術 + システム設計への教訓</text>
  <text x="140" y="286" fill="#aaaaaa" font-size="11" font-family="sans-serif">テクノロジー × 人間 × 文化の三位一体</text>
  <text x="400" y="330" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1日1,300万人を秒単位で動かすリアルタイムシステムの設計哲学</text>
</svg>`;

// Slide index 10 (遅延回復) — recovery timeline
const svgRecovery = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">山手線での3分遅延 — 自己修復の流れ</text>
  <!-- time axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#f9a825" stroke-width="2.5"/>
  <text x="400" y="350" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">→ 時間経過（周回数）</text>
  <!-- delay event -->
  <line x1="120" y1="200" x2="120" y2="120" stroke="#e91e63" stroke-width="2"/>
  <circle cx="120" cy="200" r="8" fill="#e91e63"/>
  <rect x="60" y="65" width="130" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="125" y="88" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">遅延発生</text>
  <text x="125" y="106" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">+3分</text>
  <!-- recovery wave -->
  <path d="M120,200 L200,200 L210,160 L270,160 L300,200 L380,200 L390,178 L440,178 L460,200 L540,200 L550,192 L600,192 L620,200 L720,200" fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <!-- improvement markers -->
  <line x1="300" y1="200" x2="300" y2="230" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="300" y="248" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">1周目</text>
  <text x="300" y="264" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">-1.5分</text>
  <line x1="460" y1="200" x2="460" y2="230" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="460" y="248" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">2周目</text>
  <text x="460" y="264" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">-1分</text>
  <line x1="620" y1="200" x2="620" y2="230" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="620" y="248" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">3周目</text>
  <text x="620" y="264" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">ほぼ解消</text>
  <!-- how it works box -->
  <rect x="200" y="60" width="500" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="450" y="85" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">ATOSの回復メカニズム</text>
  <text x="450" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">各駅の停車時間を2〜3秒ずつ短縮 → 1周で累積短縮</text>
  <text x="450" y="125" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">分散システムの自動スケーリング + リバランシングと同じ概念</text>
</svg>`;

// Slide index 17 (まとめ) — summary visual
const svgSummary = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">三位一体 — 東京の鉄道が99.3%を達成する理由</text>
  <!-- 3 pillars -->
  <rect x="40" y="65" width="210" height="220" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="145" y="100" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">テクノロジー</text>
  <text x="145" y="128" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ATC（安全制御）</text>
  <text x="145" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ATOS（最適化）</text>
  <text x="145" y="168" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ホームドア</text>
  <text x="145" y="195" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">自動化・リアルタイム</text>
  <text x="145" y="213" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">制御で誤差を排除</text>
  <text x="145" y="265" fill="#f9a825" font-size="24" font-family="sans-serif" text-anchor="middle">⚙</text>
  <rect x="295" y="65" width="210" height="220" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/>
  <text x="400" y="100" fill="#e91e63" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">人間の技術</text>
  <text x="400" y="128" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">指差確認</text>
  <text x="400" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">±10cm停車精度</text>
  <text x="400" y="168" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">1年の訓練</text>
  <text x="400" y="195" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">システムが自動化</text>
  <text x="400" y="213" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">できない微調整</text>
  <text x="400" y="265" fill="#e91e63" font-size="24" font-family="sans-serif" text-anchor="middle">🎯</text>
  <rect x="550" y="65" width="210" height="220" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="655" y="100" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">文化</text>
  <text x="655" y="128" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">遅延証明書制度</text>
  <text x="655" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">20秒早発で謝罪</text>
  <text x="655" y="168" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">整列乗車</text>
  <text x="655" y="195" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">「遅延は恥」という</text>
  <text x="655" y="213" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">文化的期待値</text>
  <text x="655" y="265" fill="#f9a825" font-size="22" font-family="sans-serif" text-anchor="middle">文化</text>
  <text x="400" y="320" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">99.3%の信頼性は設計の積み重ねが必要</text>
  <text x="400" y="345" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">1日1,300万人を秒単位で運ぶ — 世界最大級のリアルタイムシステム</text>
</svg>`;

const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
data.slides[1].content = [
	`![w:800 center](assets/svg-agenda.svg)`,
	...data.slides[1].content,
];
data.slides[10].content = [
	`![w:800 center](assets/svg-recovery.svg)`,
	...data.slides[10].content,
];
data.slides[17].content = [
	`![w:800 center](assets/svg-summary.svg)`,
	...data.slides[17].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-agenda.svg`, svgAgenda);
writeFileSync(`${BASE}/assets/svg-recovery.svg`, svgRecovery);
writeFileSync(`${BASE}/assets/svg-summary.svg`, svgSummary);

const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(
	`tokyo-trains: SVG-bearing slides: ${svgCount} / ${updated.slides.length} = ${Math.round((svgCount / updated.slides.length) * 100)}%`,
);
