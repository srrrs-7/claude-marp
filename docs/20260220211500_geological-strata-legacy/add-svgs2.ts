import { readFileSync, writeFileSync } from "node:fs";
const dataPath =
	"/workspace/main/docs/20260220211500_geological-strata-legacy/slides-data.json";
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

const indexFossilSVG = `<svg viewBox="0 0 800 270" style="max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">示準化石：コーディングスタイルで時代を特定</text><rect x="20" y="48" width="760" height="36" rx="6" fill="#4a90d9" stroke="#6ab0f9" stroke-width="1.5"/><text x="100" y="72" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold">2024+</text><text x="250" y="72" fill="#ffffff" font-size="12" font-family="sans-serif">async function Page() {'{'}...{'}'} // React Server Components</text><rect x="20" y="92" width="760" height="36" rx="6" fill="#3d7ab5" stroke="#6ab0f9" stroke-width="1"/><text x="100" y="116" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold">2019+</text><text x="250" y="116" fill="#ffffff" font-size="12" font-family="sans-serif">useEffect(() =&gt; {'{'} ... {'}'}, []) // React Hooks</text><rect x="20" y="136" width="760" height="36" rx="6" fill="#2d5a8c" stroke="#5a90c8" stroke-width="1"/><text x="100" y="160" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold">2015+</text><text x="250" y="160" fill="#aaaaaa" font-size="12" font-family="sans-serif">componentDidMount() {'{'} ... {'}'} // React Class</text><rect x="20" y="180" width="760" height="36" rx="6" fill="#1e3d60" stroke="#4070a0" stroke-width="1"/><text x="100" y="204" fill="#aaaaaa" font-size="12" font-family="sans-serif" font-weight="bold">2012+</text><text x="250" y="204" fill="#888888" font-size="12" font-family="sans-serif">$scope.data = ...; // AngularJS</text><rect x="20" y="224" width="760" height="36" rx="6" fill="#0a1520" stroke="#202030" stroke-width="1"/><text x="100" y="248" fill="#666666" font-size="12" font-family="sans-serif" font-weight="bold">2006+</text><text x="250" y="248" fill="#666666" font-size="12" font-family="sans-serif">$(document).ready(function() {'{'} ... {'}'}); // jQuery</text></svg>`;

const stranglerfigSVG = `<svg viewBox="0 0 800 280" style="max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Strangler Fig Pattern：地質学的リファクタリング</text><rect x="20" y="50" width="225" height="210" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="132" y="78" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Phase 1: 識別</text><text x="132" y="100" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">層序学的分析</text><text x="132" y="120" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">コードの地層を理解</text><text x="132" y="148" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">git log / cloc</text><text x="132" y="168" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">断層線の特定</text><text x="132" y="230" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">リスク評価</text><rect x="290" y="50" width="225" height="210" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="402" y="78" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Phase 2: 保護</text><text x="402" y="100" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">不整合面の形成</text><text x="402" y="120" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Anti-Corruption Layer</text><text x="402" y="148" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">旧APIをラップ</text><text x="402" y="168" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">新旧の境界を明確化</text><text x="402" y="230" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">境界管理</text><rect x="560" y="50" width="220" height="210" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="670" y="78" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">Phase 3: 移行</text><text x="670" y="100" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">段階的侵食</text><text x="670" y="120" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">古い層を自然に朽ちさせる</text><text x="670" y="148" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">機能単位で置換</text><text x="670" y="168" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">トラフィック徐々に移行</text><text x="670" y="230" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">廃止完了</text><polygon points="247,155 288,148 288,162" fill="#f9a825"/><polygon points="517,155 558,148 558,162" fill="#e91e63"/></svg>`;

const codeEarthquakeSVG = `<svg viewBox="0 0 800 270" style="max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" fill="#e91e63" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">コード地震の震度スケール</text><rect x="20" y="48" width="760" height="32" rx="5" fill="#1e4a1e" stroke="#f9a825" stroke-width="1.5"/><text x="80" y="69" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">M 1-2</text><text x="180" y="69" fill="#ffffff" font-size="12" font-family="sans-serif">ライブラリのマイナーバージョン更新</text><text x="700" y="69" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">微震</text><rect x="20" y="86" width="760" height="32" rx="5" fill="#2d5a2d" stroke="#888" stroke-width="1"/><text x="80" y="107" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">M 3-4</text><text x="180" y="107" fill="#ffffff" font-size="12" font-family="sans-serif">フレームワークのメジャーバージョン更新</text><text x="700" y="107" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">軽震</text><rect x="20" y="124" width="760" height="32" rx="5" fill="#5a3a1e" stroke="#888" stroke-width="1"/><text x="80" y="145" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">M 5-6</text><text x="180" y="145" fill="#ffffff" font-size="12" font-family="sans-serif">API仕様の破壊的変更</text><text x="700" y="145" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">中震</text><rect x="20" y="162" width="760" height="32" rx="5" fill="#7a2a1e" stroke="#e91e63" stroke-width="1.5"/><text x="80" y="183" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">M 7-8</text><text x="180" y="183" fill="#ffffff" font-size="12" font-family="sans-serif">共有DBスキーマのマイグレーション</text><text x="700" y="183" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">大震</text><rect x="20" y="200" width="760" height="32" rx="5" fill="#8a1a0a" stroke="#e91e63" stroke-width="2"/><text x="80" y="221" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">M 9-10</text><text x="180" y="221" fill="#ffffff" font-size="12" font-family="sans-serif">ランタイム移行 (Python 2→3) / 全面リプレース</text><text x="700" y="221" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">巨大地震</text></svg>`;

const archeoSVG = `<svg viewBox="0 0 800 250" style="max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="250" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">コード考古学の手法：git blameによる年代測定</text><rect x="20" y="48" width="250" height="185" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="145" y="78" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">放射性炭素年代測定</text><text x="145" y="100" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">(地質学)</text><text x="145" y="128" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">C-14の崩壊率から</text><text x="145" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">年代を推定</text><text x="145" y="178" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">半減期: 5,730年</text><text x="145" y="200" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">誤差±数十年</text><polygon points="280,140 310,133 310,147" fill="#f9a825"/><line x1="270" y1="140" x2="310" y2="140" stroke="#f9a825" stroke-width="2"/><rect x="320" y="48" width="460" height="185" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="550" y="78" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">git blame（コード考古学）</text><text x="350" y="108" fill="#aaaaaa" font-size="12" font-family="sans-serif">$ git blame --date=short auth/login.ts</text><text x="350" y="132" fill="#f9a825" font-size="12" font-family="sans-serif">2003-04  alice  function validateUser(u,p) {'{'}</text><text x="350" y="152" fill="#e91e63" font-size="12" font-family="sans-serif">2003-04  alice    var q = "SELECT * FROM..."</text><text x="350" y="172" fill="#888" font-size="12" font-family="sans-serif">2019-08  bob     // TODO: fix SQL injection</text><text x="350" y="192" fill="#f9a825" font-size="12" font-family="sans-serif">2024-01  carol   const r = await db.query(p);</text><text x="550" y="215" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">各行の作成時期・著者を特定 → 「化石記録」を発掘</text></svg>`;

// Add SVGs
const indexFossilIdx = slides.findIndex(
	(s: { title: string }) =>
		s.title === "時代ごとのコーディングスタイル「示準化石」",
);
if (indexFossilIdx >= 0) {
	slides[indexFossilIdx].content = [
		indexFossilSVG,
		...slides[indexFossilIdx].content,
	];
	console.log(`Updated: ${slides[indexFossilIdx].title}`);
}

const stranglerfigIdx = slides.findIndex(
	(s: { title: string }) => s.title === "地質学的リファクタリングの原則",
);
if (stranglerfigIdx >= 0) {
	slides[stranglerfigIdx].content = [
		stranglerfigSVG,
		...slides[stranglerfigIdx].content,
	];
	console.log(`Updated: ${slides[stranglerfigIdx].title}`);
}

const earthquakeIdx = slides.findIndex(
	(s: { title: string }) => s.title === "コード地震の震度スケール",
);
if (earthquakeIdx >= 0) {
	slides[earthquakeIdx].content = [
		codeEarthquakeSVG,
		...slides[earthquakeIdx].content,
	];
	console.log(`Updated: ${slides[earthquakeIdx].title}`);
}

const archeoIdx = slides.findIndex(
	(s: { title: string }) => s.title === "git blame：放射性炭素年代測定",
);
if (archeoIdx >= 0) {
	slides[archeoIdx].content = [archeoSVG, ...slides[archeoIdx].content];
	console.log(`Updated: ${slides[archeoIdx].title}`);
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log("Done: geological-strata round 2 - 4 more SVGs");
