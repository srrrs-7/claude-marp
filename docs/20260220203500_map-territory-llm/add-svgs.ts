import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220203500_map-territory-llm";

// Slide 3: コジブスキーの命題 — map vs territory concept
const svgKorzybski = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">地図と領土：表象と現実の乖離</text>
  <!-- Territory box: complex, rich -->
  <rect x="40" y="60" width="300" height="240" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="190" y="87" fill="#f9a825" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">領土（Territory）</text>
  <text x="190" y="108" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">現実・実体</text>
  <!-- complex nature: various items -->
  <circle cx="130" cy="150" r="18" fill="#f9a825" opacity="0.3"/>
  <circle cx="200" cy="135" r="12" fill="#e91e63" opacity="0.4"/>
  <circle cx="255" cy="160" r="22" fill="#f9a825" opacity="0.2"/>
  <circle cx="150" cy="195" r="15" fill="#e91e63" opacity="0.3"/>
  <circle cx="230" cy="200" r="10" fill="#f9a825" opacity="0.5"/>
  <circle cx="170" cy="235" r="8" fill="#e91e63" opacity="0.25"/>
  <circle cx="260" cy="230" r="14" fill="#f9a825" opacity="0.35"/>
  <text x="190" y="280" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">無限の複雑さ・変化・ニュアンス</text>
  <!-- Map box: simplified -->
  <rect x="460" y="60" width="300" height="240" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/>
  <text x="610" y="87" fill="#e91e63" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">地図（Map）</text>
  <text x="610" y="108" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">モデル・表象・言語</text>
  <!-- simplified grid -->
  <line x1="480" y1="130" x2="740" y2="130" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="480" y1="170" x2="740" y2="170" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="480" y1="210" x2="740" y2="210" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="530" y1="115" x2="530" y2="260" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="580" y1="115" x2="580" y2="260" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="640" y1="115" x2="640" y2="260" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <line x1="700" y1="115" x2="700" y2="260" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
  <text x="610" y="280" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">歪み・省略・一般化が常に存在する</text>
  <!-- arrow with label -->
  <line x1="345" y1="180" x2="455" y2="180" stroke="#ffffff" stroke-width="2"/>
  <polygon points="455,174 467,180 455,186" fill="#ffffff"/>
  <text x="400" y="170" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">抽象化</text>
  <text x="400" y="197" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">情報の損失</text>
  <!-- Korzybski quote -->
  <rect x="100" y="328" width="600" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="352" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-style="italic">"The map is not the territory." — Alfred Korzybski (1933)</text>
</svg>`;

// Slide 7: LLM as statistical map
const svgLLMMap = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">LLMは世界の「統計的地図」</text>
  <!-- training data = snapshot -->
  <rect x="40" y="60" width="200" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="87" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">訓練データ</text>
  <text x="140" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">領土のスナップショット</text>
  <text x="140" y="124" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">（固定時点）</text>
  <text x="140" y="142" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">知識カットオフ後は古い地図</text>
  <!-- arrow -->
  <polygon points="245,105 257,111 245,117" fill="#f9a825"/>
  <line x1="240" y1="111" x2="257" y2="111" stroke="#f9a825" stroke-width="2"/>
  <!-- parameters = resolution -->
  <rect x="260" y="60" width="200" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="360" y="87" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">パラメータ</text>
  <text x="360" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">地図の解像度</text>
  <text x="360" y="124" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">多いほど詳細</text>
  <text x="360" y="142" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">しかし完全ではない</text>
  <!-- arrow -->
  <polygon points="465,105 477,111 465,117" fill="#f9a825"/>
  <line x1="460" y1="111" x2="477" y2="111" stroke="#f9a825" stroke-width="2"/>
  <!-- next token = most likely path -->
  <rect x="480" y="60" width="275" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="617" y="87" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">次トークン予測</text>
  <text x="617" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">地図上の最もありそうな経路</text>
  <text x="617" y="124" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">地図にない領域 → 創作</text>
  <text x="617" y="142" fill="#e91e63" font-size="10" font-family="sans-serif" text-anchor="middle">これがハルシネーション</text>
  <!-- bottom: the key insight -->
  <rect x="80" y="200" width="640" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="230" fill="#e91e63" font-size="15" font-family="sans-serif" text-anchor="middle" font-weight="bold">地図にある「存在しない道」を案内する</text>
  <text x="400" y="255" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">LLMは「嘘をついている」自覚がない — 地図通りに案内しているだけ</text>
  <text x="400" y="272" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">地図を領土と混同した瞬間に事故が起きる</text>
  <text x="400" y="340" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">流暢さバイアス: 文法的に正しい = 事実的に正しい、という錯覚が生まれやすい</text>
</svg>`;

// Slide 8: Hallucination 4 types
const svgHallucTypes = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">ハルシネーションの4類型 — 地図の比喩で理解する</text>
  <!-- 4 boxes -->
  <rect x="30" y="60" width="360" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="87" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Intrinsic Hallucination</text>
  <text x="210" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">入力と矛盾する出力</text>
  <text x="210" y="127" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">地図の歪み</text>
  <text x="210" y="147" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">「要約して」→ 原文と逆の内容</text>
  <text x="210" y="163" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">既存情報の誤り</text>
  <rect x="410" y="60" width="360" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="590" y="87" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Extrinsic Hallucination</text>
  <text x="590" y="107" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">検証不能な情報の追加</text>
  <text x="590" y="127" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">地図にない道</text>
  <text x="590" y="147" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">存在しない情報源の引用</text>
  <text x="590" y="163" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">架空の統計・数値</text>
  <rect x="30" y="205" width="360" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="232" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Factual Hallucination</text>
  <text x="210" y="252" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">事実と異なる情報</text>
  <text x="210" y="272" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">架空の論文・人物の引用</text>
  <text x="210" y="292" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">日付・数値の誤り</text>
  <text x="210" y="308" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">存在しないAPIの説明</text>
  <rect x="410" y="205" width="360" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="590" y="232" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Faithfulness Hallucination</text>
  <text x="590" y="252" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">指示と矛盾する出力</text>
  <text x="590" y="272" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">地図の読み間違い</text>
  <text x="590" y="292" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">「日本語で答えて」→ 英語</text>
  <text x="590" y="308" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">フォーマット指示の無視</text>
  <!-- common cause -->
  <rect x="150" y="350" width="500" height="26" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="368" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">全類型の共通原因: 地図と領土の混同</text>
</svg>`;

// Slide 13: RAG & verification strategies
const svgVerification = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">LLM出力の検証戦略 — 地図の正しい使い方</text>
  <!-- 6 strategies -->
  <rect x="30" y="60" width="225" height="80" rx="7" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="142" y="85" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">1. Ground Truth照合</text>
  <text x="142" y="103" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">公式ドキュメント・</text>
  <text x="142" y="118" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">ソースコードとの突合せ</text>
  <rect x="290" y="60" width="225" height="80" rx="7" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="402" y="85" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">2. RAG</text>
  <text x="402" y="103" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">検索拡張生成</text>
  <text x="402" y="118" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">最新情報を地図に注入</text>
  <rect x="550" y="60" width="220" height="80" rx="7" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="660" y="85" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">3. Chain of Thought</text>
  <text x="660" y="103" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">推論過程を可視化</text>
  <text x="660" y="118" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">地図の歪みを検出</text>
  <rect x="30" y="170" width="225" height="80" rx="7" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="142" y="195" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">4. Multi-Agent検証</text>
  <text x="142" y="213" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">複数の地図を照合</text>
  <text x="142" y="228" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">共通部分を信頼</text>
  <rect x="290" y="170" width="225" height="80" rx="7" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="402" y="195" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">5. Confidence Scoring</text>
  <text x="402" y="213" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">地図の信頼度を定量化</text>
  <text x="402" y="228" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">不確実性の可視化</text>
  <rect x="550" y="170" width="220" height="80" rx="7" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="660" y="195" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">6. Structured Output</text>
  <text x="660" y="213" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">JSONスキーマで制約</text>
  <text x="660" y="228" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">幻覚の出力空間を制限</text>
  <!-- principle -->
  <rect x="120" y="285" width="560" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="310" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">「地図を信頼するな、地図を活用せよ」</text>
  <text x="400" y="330" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">地図の限界を知る者だけが、地図を正しく使える</text>
</svg>`;

// Slide 15: Human-in-the-loop design
const svgHITL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">地図と領土を橋渡しする設計パターン</text>
  <!-- Copilot pattern -->
  <rect x="40" y="60" width="335" height="150" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="207" y="85" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">Copilot パターン</text>
  <!-- flow: LLM propose → human decide -->
  <rect x="60" y="100" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="120" y="124" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">LLMが提案</text>
  <line x1="180" y1="120" x2="215" y2="120" stroke="#f9a825" stroke-width="2"/>
  <polygon points="215,114 227,120 215,126" fill="#f9a825"/>
  <rect x="227" y="100" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="287" y="124" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">人間が判断</text>
  <text x="207" y="170" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">LLM = 地図、人間 = 領土確認</text>
  <text x="207" y="190" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">重要な判断は人間が直接確認する設計</text>
  <!-- Guardrails pattern -->
  <rect x="425" y="60" width="335" height="150" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="592" y="85" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">Guardrails パターン</text>
  <!-- scope boundary -->
  <rect x="445" y="100" width="295" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="592" y="125" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">許可された出力空間</text>
  <text x="592" y="145" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">JSONスキーマ / フォーマット制約</text>
  <text x="592" y="170" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">地図の範囲外に出ないよう制限</text>
  <text x="592" y="190" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">幻覚の空間を構造的に削減</text>
  <!-- principles -->
  <rect x="80" y="242" width="640" height="95" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="268" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">設計の大原則</text>
  <text x="400" y="292" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">「地図は道具であり、真実ではない」— この前提でシステムを設計する</text>
  <text x="400" y="312" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">LLM出力には常に検証ステップを組み込む</text>
  <text x="400" y="330" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">史上最高の「地図」を正しく使う知恵が、AI時代の核心スキル</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// index 3: コジブスキーの命題
data.slides[3].content = [
	`![w:800 center](assets/svg-korzybski.svg)`,
	...data.slides[3].content,
];
// index 6: LLMの「地図」としての性質 (section slide is index 5)
data.slides[6].content = [
	`![w:800 center](assets/svg-llm-map.svg)`,
	...data.slides[6].content,
];
// index 8: ハルシネーションの4類型
data.slides[8].content = [
	`![w:800 center](assets/svg-halluc-types.svg)`,
	...data.slides[8].content,
];
// index 12: LLM出力の検証戦略
data.slides[12].content = [
	`![w:800 center](assets/svg-verification.svg)`,
	...data.slides[12].content,
];
// index 14: Human-in-the-Loopの設計
data.slides[14].content = [
	`![w:800 center](assets/svg-hitl.svg)`,
	...data.slides[14].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-korzybski.svg`, svgKorzybski);
writeFileSync(`${BASE}/assets/svg-llm-map.svg`, svgLLMMap);
writeFileSync(`${BASE}/assets/svg-halluc-types.svg`, svgHallucTypes);
writeFileSync(`${BASE}/assets/svg-verification.svg`, svgVerification);
writeFileSync(`${BASE}/assets/svg-hitl.svg`, svgHITL);

console.log("map-territory-llm: SVGs written and slides-data.json updated.");
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
