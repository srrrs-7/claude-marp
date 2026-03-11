import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dir = "/workspace/main/docs/20260220062300_manga-ux-design";
const dataPath = path.join(dir, "slides-data.json");
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

// SVG: Eye tracking paths in manga vs UI
const eyeTrackingSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">視線誘導の3原則：視線フロー</text>
  <!-- Left: manga reading flow -->
  <rect x="30" y="46" width="340" height="290" rx="8" fill="#16213e"/>
  <text x="200" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825" font-weight="bold">マンガ：右→左・上→下</text>
  <!-- Manga panels -->
  <rect x="210" y="82" width="120" height="80" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="270" y="126" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">①大ゴマ</text>
  <rect x="60" y="82" width="140" height="36" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="130" y="106" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">②小コマ</text>
  <rect x="60" y="126" width="140" height="36" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="130" y="150" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">③小コマ</text>
  <rect x="60" y="172" width="270" height="52" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="195" y="202" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">④横コマ（場面転換）</text>
  <rect x="60" y="232" width="120" height="80" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="120" y="276" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">⑤大ゴマ</text>
  <rect x="192" y="232" width="138" height="36" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="261" y="256" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">⑥</text>
  <!-- Eye path overlay -->
  <circle cx="270" cy="122" r="5" fill="#f9a825"/>
  <circle cx="130" cy="102" r="5" fill="#f9a825"/>
  <circle cx="130" cy="144" r="5" fill="#f9a825"/>
  <circle cx="195" cy="198" r="5" fill="#f9a825"/>
  <circle cx="120" cy="272" r="5" fill="#f9a825"/>
  <polyline points="270,122 130,102 130,144 195,198 120,272"
    fill="none" stroke="#f9a825" stroke-width="2" opacity="0.7"/>
  <!-- Right: UI reading flow (F-pattern) -->
  <rect x="430" y="46" width="340" height="290" rx="8" fill="#16213e"/>
  <text x="600" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">UI：Fパターン・Zパターン</text>
  <!-- Nav bar -->
  <rect x="450" y="82" width="300" height="28" rx="4" fill="#0d1b2a" stroke="#e91e63" stroke-width="1"/>
  <text x="600" y="101" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">①ナビゲーション（横一列スキャン）</text>
  <!-- Hero -->
  <rect x="450" y="118" width="300" height="50" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="600" y="147" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">②ヒーロー（左から右）</text>
  <!-- Content blocks -->
  <rect x="450" y="176" width="190" height="50" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="545" y="205" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">③左コンテンツ</text>
  <rect x="648" y="176" width="102" height="50" rx="4" fill="#0d1b2a" stroke="#333" stroke-width="1"/>
  <rect x="450" y="234" width="190" height="50" rx="4" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <text x="545" y="263" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">④左コンテンツ</text>
  <!-- Eye path -->
  <circle cx="450" cy="96" r="5" fill="#e91e63"/>
  <circle cx="600" cy="143" r="5" fill="#e91e63"/>
  <circle cx="545" cy="201" r="5" fill="#e91e63"/>
  <circle cx="545" cy="259" r="5" fill="#e91e63"/>
  <polyline points="450,96 750,96 460,143 740,143 460,201 640,201 460,259 640,259"
    fill="none" stroke="#e91e63" stroke-width="2" opacity="0.7"/>
  <text x="600" y="310" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">F字パターン（Nielsen&amp;Pernice研究）</text>
</svg>`;

// SVG: Splash/full-spread WOW moment comparison
const wowMomentSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">「見開き」の力 = フルスクリーン体験</text>
  <!-- Left: Manga spread -->
  <rect x="30" y="46" width="340" height="270" rx="8" fill="#16213e"/>
  <text x="200" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825" font-weight="bold">マンガの見開きページ</text>
  <!-- Spread page -->
  <rect x="48" y="80" width="306" height="180" rx="4" fill="#050510" stroke="#f9a825" stroke-width="2"/>
  <text x="201" y="164" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#f9a825" opacity="0.6">見開き</text>
  <text x="201" y="192" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fff" opacity="0.8">1コマのみ</text>
  <text x="201" y="210" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fff" opacity="0.8">情報ゼロ・感情最大</text>
  <text x="201" y="274" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">読者が息を呑む瞬間</text>
  <text x="201" y="292" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">= クライマックス = WOWモーメント</text>
  <!-- Right: UI full screen -->
  <rect x="430" y="46" width="340" height="270" rx="8" fill="#16213e"/>
  <text x="600" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">UIのフルスクリーン体験</text>
  <!-- Modal/splash examples -->
  <rect x="448" y="80" width="306" height="80" rx="6" fill="#050510" stroke="#e91e63" stroke-width="2"/>
  <text x="601" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63" font-weight="bold">フルスクリーンモーダル</text>
  <text x="601" y="133" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">重要アクション確認</text>
  <text x="601" y="151" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">（ユーザーの全注意を要求）</text>
  <rect x="448" y="174" width="306" height="60" rx="6" fill="#050510" stroke="#4ec9b0" stroke-width="2"/>
  <text x="601" y="198" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4ec9b0" font-weight="bold">完了画面アニメーション</text>
  <text x="601" y="220" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">達成感の演出</text>
  <rect x="448" y="248" width="306" height="52" rx="6" fill="#050510" stroke="#f9a825" stroke-width="2"/>
  <text x="601" y="272" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825" font-weight="bold">スプラッシュスクリーン</text>
  <text x="601" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">ブランドの第一印象</text>
</svg>`;

// SVG: Speech bubble / tooltip comparison
const speechBubbleSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">吹き出し = 情報の階層化システム</text>
  <!-- Manga side -->
  <rect x="30" y="46" width="340" height="290" rx="8" fill="#16213e"/>
  <text x="200" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825" font-weight="bold">マンガの吹き出し</text>
  <!-- Normal speech bubble -->
  <ellipse cx="180" cy="108" rx="100" ry="30" fill="#fff" stroke="#333" stroke-width="2"/>
  <polygon points="145,134 135,150 160,134" fill="#fff" stroke="#333" stroke-width="1"/>
  <text x="180" y="115" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#000">通常の会話</text>
  <text x="90" y="158" font-family="sans-serif" font-size="10" fill="#aaa">→ ノーマル吹き出し</text>
  <!-- Angry/shout bubble (jagged) -->
  <path d="M 100 210 L 115 195 L 125 208 L 140 192 L 152 207 L 165 190 L 177 207 L 190 192 L 202 207 L 215 190 L 228 207 L 242 192 L 255 210 L 248 224 L 255 238 L 240 226 L 228 240 L 215 225 L 202 240 L 190 224 L 177 240 L 165 224 L 152 238 L 140 224 L 125 238 L 112 224 L 100 210Z"
    fill="#ffdddd" stroke="#e91e63" stroke-width="2"/>
  <text x="178" y="218" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c00" font-weight="bold">叫び・驚き</text>
  <text x="90" y="252" font-family="sans-serif" font-size="10" fill="#aaa">→ ギザギザ吹き出し</text>
  <!-- Thought/monologue -->
  <rect x="60" y="268" width="130" height="40" rx="12" fill="#f0f0ff" stroke="#9999cc" stroke-width="2"/>
  <text x="125" y="293" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#333">（内心のつぶやき）</text>
  <text x="90" y="320" font-family="sans-serif" font-size="10" fill="#aaa">→ 角丸四角＝モノローグ</text>
  <!-- UI side -->
  <rect x="430" y="46" width="340" height="290" rx="8" fill="#16213e"/>
  <text x="600" y="68" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">UIへの応用</text>
  <!-- Tooltip -->
  <rect x="448" y="82" width="160" height="34" rx="6" fill="#333" stroke="#4ec9b0" stroke-width="1"/>
  <polygon points="510,116 520,128 530,116" fill="#333"/>
  <text x="528" y="103" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">ツールチップ</text>
  <text x="630" y="103" font-family="sans-serif" font-size="11" fill="#aaa">補足情報</text>
  <!-- Toast notification -->
  <rect x="448" y="156" width="260" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="578" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f9a825">保存しました ✓ (トースト)</text>
  <text x="600" y="212" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">→ 一時的なメッセージ</text>
  <!-- Alert banner -->
  <rect x="448" y="232" width="300" height="40" rx="6" fill="#300" stroke="#e91e63" stroke-width="2"/>
  <text x="598" y="256" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63" font-weight="bold">エラー！ アラートバナー</text>
  <text x="600" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">→ ギザギザ = 赤いアラート</text>
  <text x="600" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">感情的優先度を視覚化</text>
</svg>`;

// SVG: Panel layout grid comparison
const panelGridSvg = `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#f9a825" font-weight="bold">コマ割り = レイアウトグリッド</text>
  <!-- Left: Manga uniform grid (calm) -->
  <rect x="30" y="46" width="220" height="290" rx="8" fill="#16213e"/>
  <text x="140" y="66" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4ec9b0" font-weight="bold">均等コマ割り</text>
  <text x="140" y="82" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">→ 安定・日常</text>
  <rect x="46" y="92" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="144" y="92" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="46" y="166" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="144" y="166" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="46" y="240" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="144" y="240" width="90" height="66" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <!-- Center: Manga dynamic grid (action) -->
  <rect x="280" y="46" width="220" height="290" rx="8" fill="#16213e"/>
  <text x="390" y="66" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63" font-weight="bold">不均等コマ割り</text>
  <text x="390" y="82" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">→ 緊張・アクション</text>
  <rect x="296" y="92" width="188" height="96" rx="3" fill="#0d1b2a" stroke="#e91e63" stroke-width="2"/>
  <text x="390" y="144" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e91e63">大ゴマ（衝撃）</text>
  <rect x="296" y="196" width="90" height="50" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="394" y="196" width="90" height="50" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <rect x="296" y="254" width="188" height="62" rx="3" fill="#0d1b2a" stroke="#555" stroke-width="1"/>
  <!-- Right: UI grid comparison -->
  <rect x="530" y="46" width="240" height="290" rx="8" fill="#16213e"/>
  <text x="650" y="66" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825" font-weight="bold">UIグリッド応用</text>
  <rect x="546" y="82" width="208" height="56" rx="4" fill="#0d1b2a" stroke="#4ec9b0" stroke-width="1"/>
  <text x="650" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">均等グリッド</text>
  <text x="650" y="128" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">ダッシュボード・一覧</text>
  <rect x="546" y="148" width="208" height="56" rx="4" fill="#0d1b2a" stroke="#e91e63" stroke-width="1"/>
  <text x="650" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">非対称レイアウト</text>
  <text x="650" y="194" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">LP・プロモーション</text>
  <rect x="546" y="214" width="208" height="56" rx="4" fill="#0d1b2a" stroke="#f9a825" stroke-width="1"/>
  <text x="650" y="246" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f9a825">コマ越え = ブレイクアウト</text>
  <text x="650" y="260" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">強調・ヒーロー要素</text>
  <rect x="546" y="280" width="208" height="40" rx="4" fill="#003020" stroke="#4ec9b0" stroke-width="1"/>
  <text x="650" y="304" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4ec9b0">認知負荷 ↔ コマ数で管理</text>
</svg>`;

// Write SVGs
writeFileSync(`${dir}/assets/eye-tracking-flow.svg`, eyeTrackingSvg);
writeFileSync(`${dir}/assets/wow-moment.svg`, wowMomentSvg);
writeFileSync(`${dir}/assets/speech-bubble-ui.svg`, speechBubbleSvg);
writeFileSync(`${dir}/assets/panel-grid.svg`, panelGridSvg);

// Patch slides
// "視線誘導の3原則"
const eyeIdx = slides.findIndex((s: { title: string }) =>
	s.title.includes("視線誘導の3原則"),
);
if (
	eyeIdx !== -1 &&
	!slides[eyeIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[eyeIdx].content.unshift(
		"![w:800 center](assets/eye-tracking-flow.svg)",
	);
}

// "コマ割り = レイアウトグリッド（1/2）"
const gridIdx = slides.findIndex(
	(s: { title: string }) =>
		s.title.includes("コマ割り = レイアウトグリッド") &&
		s.title.includes("1/2"),
);
if (
	gridIdx !== -1 &&
	!slides[gridIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[gridIdx].content.unshift("![w:800 center](assets/panel-grid.svg)");
}

// "「見開き」の力 = フルスクリーン体験（1/2）"
const wowIdx = slides.findIndex(
	(s: { title: string }) =>
		s.title.includes("見開き") && s.title.includes("1/2"),
);
if (
	wowIdx !== -1 &&
	!slides[wowIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[wowIdx].content.unshift("![w:800 center](assets/wow-moment.svg)");
}

// "原則2：吹き出し = 情報の階層化（1/2）"
const bubbleIdx = slides.findIndex(
	(s: { title: string }) =>
		s.title.includes("吹き出し") && s.title.includes("1/2"),
);
if (
	bubbleIdx !== -1 &&
	!slides[bubbleIdx].content.some((c: string) => c.includes("assets/"))
) {
	slides[bubbleIdx].content.unshift(
		"![w:800 center](assets/speech-bubble-ui.svg)",
	);
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log("manga-ux-design round 2: patches applied");
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
