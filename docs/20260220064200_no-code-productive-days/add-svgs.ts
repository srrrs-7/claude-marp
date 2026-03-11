import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220064200_no-code-productive-days";

// Slide 3: 「生産的な一日」の定義 — perception vs reality
const svgPerception = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">「生産的な一日」の認識バイアス</text>
  <!-- left: perceived -->
  <rect x="40" y="55" width="330" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="205" y="85" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">よくある認識</text>
  <!-- bar: commit heavy -->
  <rect x="65" y="105" width="280" height="32" rx="4" fill="#e91e63" opacity="0.8"/>
  <text x="205" y="126" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">コードを書く・コミットする</text>
  <rect x="65" y="145" width="200" height="32" rx="4" fill="#e91e63" opacity="0.5"/>
  <text x="165" y="166" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="start">　PRを作成する</text>
  <rect x="65" y="185" width="130" height="32" rx="4" fill="#e91e63" opacity="0.3"/>
  <text x="130" y="206" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">バグ修正</text>
  <text x="205" y="262" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">会議・ドキュメント = 「無駄」?</text>
  <!-- right: reality -->
  <rect x="430" y="55" width="330" height="230" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="595" y="85" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">実際の価値</text>
  <rect x="455" y="105" width="280" height="32" rx="4" fill="#f9a825" opacity="0.8"/>
  <text x="595" y="126" fill="#1a1a2e" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">設計・アーキテクチャ判断</text>
  <rect x="455" y="145" width="240" height="32" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="575" y="166" fill="#1a1a2e" font-size="11" font-family="sans-serif" text-anchor="middle">コードレビュー（バグ防止）</text>
  <rect x="455" y="185" width="210" height="32" rx="4" fill="#f9a825" opacity="0.55"/>
  <text x="560" y="206" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">ドキュメント（再現性確保）</text>
  <text x="595" y="262" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">乗数効果でチーム全体が速くなる</text>
  <!-- arrow between -->
  <polygon points="380,160 400,168 380,176" fill="#f9a825"/>
  <line x1="370" y1="168" x2="400" y2="168" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="320" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">コミットログに残らない仕事がチームの基盤を支える</text>
  <text x="400" y="355" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">Activity ≠ Progress（活動量 ≠ 進捗）</text>
</svg>`;

// Slide 6: Code = productivity illusion
const svgLOC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">LOC（コード行数）神話の解体</text>
  <!-- example comparison -->
  <rect x="40" y="60" width="335" height="130" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="207" y="85" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">100行で解決した人</text>
  <rect x="60" y="100" width="100" height="70" rx="4" fill="#e91e63" opacity="0.3"/>
  <text x="110" y="140" fill="#aaaaaa" font-size="30" font-family="sans-serif" text-anchor="middle">100</text>
  <text x="110" y="162" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">行</text>
  <text x="260" y="120" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">冗長・コピペ多数</text>
  <text x="260" y="140" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">可読性が低い</text>
  <text x="260" y="160" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">テストなし</text>
  <!-- vs -->
  <text x="400" y="130" fill="#f9a825" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">vs</text>
  <rect x="430" y="60" width="330" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="595" y="85" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">10行で解決した人</text>
  <rect x="450" y="100" width="60" height="70" rx="4" fill="#f9a825" opacity="0.5"/>
  <text x="480" y="140" fill="#ffffff" font-size="30" font-family="sans-serif" text-anchor="middle">10</text>
  <text x="480" y="162" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">行</text>
  <text x="620" y="120" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">本質を理解した設計</text>
  <text x="620" y="140" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">高い可読性</text>
  <text x="620" y="160" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">どちらが優秀？</text>
  <!-- bill gates quote -->
  <rect x="100" y="220" width="600" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="248" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-style="italic">"Measuring programming progress by lines of code is like</text>
  <text x="400" y="268" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-style="italic">measuring aircraft building progress by weight."</text>
  <text x="680" y="295" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="end">— Bill Gates</text>
  <text x="400" y="340" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">最良のコードは書かれなかったコード / 削除したコードが最大の貢献の場合もある</text>
</svg>`;

// Slide 9: Glue Work
const svgGlue = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Glue Work — 見えない仕事がチームを支える</text>
  <!-- center: team output -->
  <ellipse cx="400" cy="185" rx="70" ry="50" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="400" y="180" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">チームの</text>
  <text x="400" y="198" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">アウトプット</text>
  <!-- surrounding glue items -->
  <rect x="30" y="65" width="165" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="112" y="90" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">コードレビュー</text>
  <text x="112" y="108" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">バグ防止・知識共有</text>
  <line x1="195" y1="97" x2="333" y2="155" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="605" y="65" width="165" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="687" y="90" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">オンボーディング</text>
  <text x="687" y="108" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">立ち上がり3ヶ月→1ヶ月</text>
  <line x1="605" y1="97" x2="468" y2="155" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="30" y="250" width="165" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="112" y="275" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">ドキュメント</text>
  <text x="112" y="293" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">同じ質問への回答を削減</text>
  <line x1="195" y1="282" x2="333" y2="215" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="605" y="250" width="165" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="687" y="275" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">技術選定</text>
  <text x="687" y="293" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">間違い回避=数ヶ月節約</text>
  <line x1="605" y1="282" x2="468" y2="215" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="295" y="265" width="210" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="290" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">CI/CDパイプライン改善</text>
  <text x="400" y="308" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">全員のデプロイ時間短縮</text>
  <line x1="400" y1="265" x2="400" y2="235" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">これらはコミットログに残らない — しかしチームを機能させている</text>
</svg>`;

// Slide 12: Multiplier Effect
const svgMultiplier = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">乗数効果（Multiplier Effect）</text>
  <!-- individual vs team impact comparison -->
  <!-- individual -->
  <rect x="40" y="65" width="330" height="220" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="205" y="93" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">自分でコードを書く</text>
  <!-- single bar -->
  <rect x="80" y="110" width="210" height="40" rx="4" fill="#e91e63" opacity="0.7"/>
  <text x="185" y="135" fill="#ffffff" font-size="13" font-family="sans-serif" text-anchor="middle">100行分の価値</text>
  <text x="205" y="185" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">影響範囲: 自分のコード</text>
  <text x="205" y="207" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">×1.0 倍の効果</text>
  <text x="205" y="255" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">線形にしかスケールしない</text>
  <!-- team -->
  <rect x="430" y="65" width="330" height="220" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="595" y="93" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">チーム全体を速くする</text>
  <!-- stacked bars -->
  <rect x="470" y="110" width="210" height="25" rx="3" fill="#f9a825" opacity="0.9"/>
  <text x="575" y="127" fill="#1a1a2e" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">5人のレビュー改善 × 20行</text>
  <rect x="470" y="140" width="185" height="20" rx="3" fill="#f9a825" opacity="0.7"/>
  <text x="562" y="155" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">設計doc → 全員の速度UP</text>
  <rect x="470" y="165" width="165" height="20" rx="3" fill="#f9a825" opacity="0.55"/>
  <text x="552" y="180" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">メンタリング → 将来の生産性</text>
  <text x="595" y="215" fill="#f9a825" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">×3〜10 倍の効果</text>
  <text x="595" y="255" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">指数的にスケールする</text>
  <!-- vs label -->
  <text x="400" y="180" fill="#ffffff" font-size="20" font-family="sans-serif" text-anchor="middle" font-weight="bold">VS</text>
  <text x="400" y="320" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">自分の手を動かすより、チーム全体を速くする方が影響が大きい</text>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">ノーコードデーが最大の乗数効果を生む日になり得る</text>
</svg>`;

// Slide 15: Staff+ engineer time allocation
const svgStaff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Staff+ エンジニアの時間配分（典型例）</text>
  <!-- bar chart horizontal -->
  <!-- coding 25% -->
  <text x="200" y="75" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="end">コーディング</text>
  <rect x="210" y="58" width="150" height="28" rx="4" fill="#f9a825" opacity="0.8"/>
  <text x="370" y="77" fill="#f9a825" font-size="12" font-family="sans-serif">25%</text>
  <!-- design 30% -->
  <text x="200" y="115" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="end">設計・アーキテクチャ</text>
  <rect x="210" y="98" width="180" height="28" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="400" y="117" fill="#f9a825" font-size="12" font-family="sans-serif">30%</text>
  <!-- review/mentoring 22% -->
  <text x="200" y="155" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="end">レビュー・メンタリング</text>
  <rect x="210" y="138" width="132" height="28" rx="4" fill="#e91e63" opacity="0.8"/>
  <text x="352" y="157" fill="#e91e63" font-size="12" font-family="sans-serif">22%</text>
  <!-- docs RFC 13% -->
  <text x="200" y="195" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="end">ドキュメント・RFC</text>
  <rect x="210" y="178" width="78" height="28" rx="4" fill="#e91e63" opacity="0.6"/>
  <text x="298" y="197" fill="#e91e63" font-size="12" font-family="sans-serif">13%</text>
  <!-- cross-org 10% -->
  <text x="200" y="235" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="end">組織横断コミュニケーション</text>
  <rect x="210" y="218" width="60" height="28" rx="4" fill="#e91e63" opacity="0.4"/>
  <text x="280" y="237" fill="#e91e63" font-size="12" font-family="sans-serif">10%</text>
  <!-- callout -->
  <rect x="100" y="280" width="600" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="307" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">コードを書く時間は全体の1/4未満</text>
  <text x="400" y="327" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">シニアの価値は「判断力」にある — 一言で3ヶ月の手戻りを防ぐ</text>
</svg>`;

// Slide 17: DORA / SPACE
const svgDORA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">DORA指標 × SPACEフレームワーク</text>
  <!-- DORA -->
  <rect x="40" y="55" width="330" height="230" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="82" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">DORA 4指標</text>
  <text x="205" y="100" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">チームの生産性を測る</text>
  <rect x="60" y="110" width="290" height="30" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="205" y="130" fill="#1a1a2e" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">デプロイ頻度</text>
  <rect x="60" y="148" width="250" height="30" rx="4" fill="#f9a825" opacity="0.55"/>
  <text x="185" y="168" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">リードタイム（commit→deploy）</text>
  <rect x="60" y="186" width="210" height="30" rx="4" fill="#f9a825" opacity="0.4"/>
  <text x="165" y="206" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">MTTR（障害復旧時間）</text>
  <rect x="60" y="224" width="175" height="30" rx="4" fill="#f9a825" opacity="0.3"/>
  <text x="147" y="244" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">変更失敗率</text>
  <text x="205" y="267" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">個人のコード量は無関係</text>
  <!-- SPACE -->
  <rect x="430" y="55" width="330" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="82" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">SPACE Framework</text>
  <text x="595" y="100" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">開発者生産性の5次元</text>
  <text x="595" y="125" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">S — Satisfaction（満足度）</text>
  <text x="595" y="150" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">P — Performance（成果の質）</text>
  <text x="595" y="175" fill="#aaaaaa" font-size="13" font-family="sans-serif" text-anchor="middle">A — Activity（活動量）</text>
  <text x="595" y="200" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">C — Communication</text>
  <text x="595" y="225" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">E — Efficiency（フロー状態）</text>
  <text x="595" y="265" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">Activity は5つのうちの1つに過ぎない</text>
  <!-- bottom -->
  <rect x="150" y="310" width="500" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="335" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">ノーコードデーを罪悪感なく過ごせるチームが最強</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// Slide index 3: あなたは今日、生産的でしたか？
data.slides[3].content = [
	`![w:800 center](assets/svg-perception.svg)`,
	...data.slides[3].content,
];
// Slide index 6: コード=生産性という幻想
data.slides[6].content = [
	`![w:800 center](assets/svg-loc.svg)`,
	...data.slides[6].content,
];
// Slide index 9: Glue Work
data.slides[9].content = [
	`![w:800 center](assets/svg-glue.svg)`,
	...data.slides[9].content,
];
// Slide index 10: 乗数効果
data.slides[10].content = [
	`![w:800 center](assets/svg-multiplier.svg)`,
	...data.slides[10].content,
];
// Slide index 14: Staff+ engineer
data.slides[14].content = [
	`![w:800 center](assets/svg-staff.svg)`,
	...data.slides[14].content,
];
// Slide index 16: DORA/SPACE
data.slides[16].content = [
	`![w:800 center](assets/svg-dora.svg)`,
	...data.slides[16].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-perception.svg`, svgPerception);
writeFileSync(`${BASE}/assets/svg-loc.svg`, svgLOC);
writeFileSync(`${BASE}/assets/svg-glue.svg`, svgGlue);
writeFileSync(`${BASE}/assets/svg-multiplier.svg`, svgMultiplier);
writeFileSync(`${BASE}/assets/svg-staff.svg`, svgStaff);
writeFileSync(`${BASE}/assets/svg-dora.svg`, svgDORA);

console.log(
	"no-code-productive-days: SVGs written and slides-data.json updated.",
);
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
