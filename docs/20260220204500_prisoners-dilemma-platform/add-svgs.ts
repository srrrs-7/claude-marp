import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220204500_prisoners-dilemma-platform";

// Slide 3: 囚人のジレンマ基本構造 — concept diagram
const svgPDConcept = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">囚人のジレンマ — 基本構造</text>
  <!-- 2 suspects boxes -->
  <rect x="60" y="65" width="200" height="90" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="160" y="95" fill="#f9a825" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">容疑者A</text>
  <text x="160" y="118" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">別々の部屋で尋問</text>
  <text x="160" y="138" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">相手の選択を知らない</text>
  <rect x="540" y="65" width="200" height="90" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="640" y="95" fill="#f9a825" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">容疑者B</text>
  <text x="640" y="118" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">別々の部屋で尋問</text>
  <text x="640" y="138" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">相手の選択を知らない</text>
  <!-- choices -->
  <!-- cooperate -->
  <line x1="160" y1="155" x2="160" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="80" y="190" width="160" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="160" y="215" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">協調（黙秘）</text>
  <!-- defect -->
  <line x1="640" y1="155" x2="640" y2="190" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="560" y="190" width="160" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="640" y="215" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">裏切り（自白）</text>
  <!-- outcomes -->
  <rect x="150" y="260" width="200" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="250" y="282" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">両者協調</text>
  <text x="250" y="300" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">両者: 軽い刑</text>
  <text x="250" y="316" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">最良の集団結果</text>
  <rect x="450" y="260" width="200" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="550" y="282" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">両者裏切り</text>
  <text x="550" y="300" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">両者: 中程度の刑</text>
  <text x="550" y="316" fill="#e91e63" font-size="10" font-family="sans-serif" text-anchor="middle">ナッシュ均衡 = 最悪の結果</text>
  <!-- key insight -->
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">個人の合理性 ≠ 集団の合理性 — これが社会的ジレンマの原型</text>
</svg>`;

// Slide 6: Platform prisoner's dilemma
const svgPlatformPD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">プラットフォーム間の囚人のジレンマ</text>
  <!-- two strategy paths -->
  <!-- cooperate: open standard -->
  <rect x="40" y="60" width="330" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="88" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">協調戦略：標準準拠</text>
  <text x="205" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">オープン標準に準拠</text>
  <text x="205" y="135" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">相互運用性を確保</text>
  <text x="205" y="165" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">長期: エコシステム拡大</text>
  <text x="205" y="190" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">W3C/IETF/OCI の成功例</text>
  <text x="205" y="215" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">TCP/IP, HTTP の普及</text>
  <text x="205" y="240" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">全員が勝てる構造</text>
  <!-- defect: proprietary -->
  <rect x="430" y="60" width="330" height="200" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="88" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">裏切り戦略：囲い込み</text>
  <text x="595" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">独自規格でロックイン</text>
  <text x="595" y="135" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">相互運用性を意図的に破壊</text>
  <text x="595" y="165" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">短期: 高収益・競合排除</text>
  <text x="595" y="190" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">ブラウザ戦争（IE vs Netscape）</text>
  <text x="595" y="215" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">メッセンジャー各社のサイロ化</text>
  <text x="595" y="240" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">長期: エコシステム縮小</text>
  <!-- bottom insight -->
  <rect x="100" y="292" width="600" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="318" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">AI API (2024-): OpenAI / Anthropic / Google が互換性なし</text>
  <text x="400" y="338" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">短期的には裏切りが有利、長期的にはエコシステム全体が縮小する</text>
</svg>`;

// Slide 7: 3E strategy
const svg3E = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Embrace, Extend, Extinguish — 段階的裏切り戦略</text>
  <!-- 3 phases -->
  <!-- phase 1 -->
  <rect x="30" y="65" width="220" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="95" fill="#f9a825" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">E①</text>
  <text x="140" y="120" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Embrace</text>
  <text x="140" y="145" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">オープン標準を</text>
  <text x="140" y="165" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">表面的に採用</text>
  <text x="140" y="190" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">協調の偽装</text>
  <text x="140" y="210" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">信頼を獲得</text>
  <!-- arrow -->
  <line x1="250" y1="145" x2="280" y2="145" stroke="#e91e63" stroke-width="2"/>
  <polygon points="280,139 292,145 280,151" fill="#e91e63"/>
  <!-- phase 2 -->
  <rect x="293" y="65" width="220" height="160" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="403" y="95" fill="#e91e63" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">E②</text>
  <text x="403" y="120" fill="#e91e63" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Extend</text>
  <text x="403" y="145" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">独自拡張を追加</text>
  <text x="403" y="165" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">差別化・ロックイン</text>
  <text x="403" y="190" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">静かな裏切り</text>
  <text x="403" y="210" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">依存関係を構築</text>
  <!-- arrow -->
  <line x1="513" y1="145" x2="543" y2="145" stroke="#e91e63" stroke-width="2"/>
  <polygon points="543,139 555,145 543,151" fill="#e91e63"/>
  <!-- phase 3 -->
  <rect x="556" y="65" width="220" height="160" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="666" y="95" fill="#e91e63" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">E③</text>
  <text x="666" y="120" fill="#e91e63" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Extinguish</text>
  <text x="666" y="145" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">市場支配で</text>
  <text x="666" y="165" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">標準を殺す</text>
  <text x="666" y="190" fill="#e91e63" font-size="10" font-family="sans-serif" text-anchor="middle">完全な裏切り</text>
  <text x="666" y="210" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">ライバルを排除</text>
  <!-- examples -->
  <rect x="80" y="262" width="640" height="75" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="285" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">過去の事例</text>
  <text x="400" y="306" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Microsoft: IE の Java実装、OOXML の ISO標準化圧力</text>
  <text x="400" y="326" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">現代版: Google AMP、React Native の「標準」化圧力</text>
</svg>`;

// Slide 10: standards as institutions
const svgStandards = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">標準化団体 = 囚人のジレンマを協調ゲームに変える装置</text>
  <!-- game theory transformation -->
  <rect x="40" y="65" width="300" height="120" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="190" y="93" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">一回限りのゲーム</text>
  <text x="190" y="118" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">裏切りが支配戦略</text>
  <text x="190" y="140" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">ナッシュ均衡 = 両者裏切り</text>
  <text x="190" y="162" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">短期利益が最大化される</text>
  <!-- arrow with transformation label -->
  <line x1="345" y1="125" x2="378" y2="125" stroke="#f9a825" stroke-width="2.5"/>
  <polygon points="378,119 390,125 378,131" fill="#f9a825"/>
  <text x="367" y="112" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">標準化</text>
  <text x="367" y="145" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">繰り返し化</text>
  <rect x="395" y="65" width="365" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="577" y="93" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">繰り返しゲーム</text>
  <text x="577" y="118" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">協調が支配戦略になる</text>
  <text x="577" y="140" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">裏切りコストが高くなる</text>
  <text x="577" y="162" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">評判・エコシステム排除のリスク</text>
  <!-- examples -->
  <rect x="40" y="210" width="340" height="115" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="235" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">成功した協調の制度化</text>
  <text x="210" y="257" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">W3C / WHATWG — Web標準</text>
  <text x="210" y="277" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">IETF — TCP/IP, HTTP</text>
  <text x="210" y="297" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">OCI — コンテナ標準</text>
  <text x="210" y="312" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">OpenAPI / GraphQL</text>
  <rect x="420" y="210" width="340" height="115" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="590" y="235" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">協調を生む仕組み</text>
  <text x="590" y="257" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">評判低下（GitHub Stars低下）</text>
  <text x="590" y="277" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">エコシステムからの排除</text>
  <text x="590" y="297" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Forkによる対抗（しっぺ返し）</text>
  <text x="590" y="312" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">カンファレンス・コミュニティ</text>
</svg>`;

// Slide 12: developer strategic choices
const svgDevChoice = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">開発者の戦略的選択：ゲーム理論で読む技術選定</text>
  <!-- 2x2 matrix -->
  <!-- axes -->
  <text x="400" y="65" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">短期 ← ロックイン度 → 長期</text>
  <text x="50" y="200" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle" transform="rotate(-90,50,200)">低 ← 相互運用性 → 高</text>
  <!-- quadrant borders -->
  <line x1="400" y1="80" x2="400" y2="330" stroke="#ffffff" stroke-width="1" opacity="0.2"/>
  <line x1="80" y1="205" x2="720" y2="205" stroke="#ffffff" stroke-width="1" opacity="0.2"/>
  <!-- Q1: high interop, long term = best -->
  <rect x="410" y="85" width="300" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="560" y="112" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">標準準拠 × 長期協調</text>
  <text x="560" y="133" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Web Components, WASM</text>
  <text x="560" y="153" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Kotlin Multiplatform</text>
  <text x="560" y="175" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">しっぺ返し戦略 — 最善</text>
  <!-- Q2: low interop, short term = risky -->
  <rect x="80" y="85" width="305" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="232" y="112" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">ベンダーロックイン</text>
  <text x="232" y="133" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">特定SDK専用実装</text>
  <text x="232" y="153" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">SwiftUI, Jetpack Compose</text>
  <text x="232" y="175" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">裏切られ戦略 — 要注意</text>
  <!-- Q3: high interop, short term = ok -->
  <rect x="80" y="215" width="305" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="232" y="242" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">マルチプラットフォーム</text>
  <text x="232" y="263" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Flutter, React Native</text>
  <text x="232" y="285" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">移行コスト低い — バランス型</text>
  <!-- Q4: low interop, long term = dependency inversion -->
  <rect x="410" y="215" width="300" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="560" y="242" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">抽象化レイヤー</text>
  <text x="560" y="263" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">Dependency Inversion</text>
  <text x="560" y="285" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">裏切られた時の損失を最小化</text>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">「最初は標準準拠、裏切られたら移行準備」— しっぺ返し戦略の実践</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// index 3: 囚人のジレンマの基本構造
data.slides[3].content = [
	`![w:800 center](assets/svg-pd-concept.svg)`,
	...data.slides[3].content,
];
// index 6: プラットフォーム間の囚人のジレンマ
data.slides[6].content = [
	`![w:800 center](assets/svg-platform-pd.svg)`,
	...data.slides[6].content,
];
// index 7: Embrace, Extend, Extinguish
data.slides[7].content = [
	`![w:800 center](assets/svg-3e.svg)`,
	...data.slides[7].content,
];
// index 13 (標準化団体 = 協調の制度化): 協調メカニズム
data.slides[13].content = [
	`![w:800 center](assets/svg-standards.svg)`,
	...data.slides[13].content,
];
// index 15 (プラットフォーム選択のゲーム理論): developer choice matrix
data.slides[15].content = [
	`![w:800 center](assets/svg-dev-choice.svg)`,
	...data.slides[15].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-pd-concept.svg`, svgPDConcept);
writeFileSync(`${BASE}/assets/svg-platform-pd.svg`, svgPlatformPD);
writeFileSync(`${BASE}/assets/svg-3e.svg`, svg3E);
writeFileSync(`${BASE}/assets/svg-standards.svg`, svgStandards);
writeFileSync(`${BASE}/assets/svg-dev-choice.svg`, svgDevChoice);

console.log(
	"prisoners-dilemma-platform: SVGs written and slides-data.json updated.",
);
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
