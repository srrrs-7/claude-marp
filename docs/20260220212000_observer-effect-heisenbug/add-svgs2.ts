import { readFileSync, writeFileSync } from "node:fs";
const dataPath =
	"/workspace/main/docs/20260220212000_observer-effect-heisenbug/slides-data.json";
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

const heisenScenarioSVG = `<svg viewBox="0 0 800 270" style="max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" fill="#e91e63" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Heisenbugsの典型的シナリオ</text><rect x="20" y="48" width="360" height="200" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/><text x="200" y="75" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">本番環境でクラッシュ</text><rect x="50" y="90" width="280" height="35" rx="6" fill="#3a1a1a" stroke="#e91e63" stroke-width="1.5"/><text x="190" y="113" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">本番: クラッシュ発生!</text><line x1="190" y1="125" x2="190" y2="148" stroke="#e91e63" stroke-width="1.5"/><polygon points="185,145 190,160 195,145" fill="#e91e63"/><!-- Debugger attempt --><rect x="50" y="160" width="280" height="35" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="190" y="183" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">デバッガを起動</text><line x1="190" y1="195" x2="190" y2="218" stroke="#f9a825" stroke-width="1.5"/><polygon points="185,215 190,230 195,215" fill="#f9a825"/><!-- Bug disappears --><rect x="50" y="220" width="280" height="18" rx="5" fill="#1e4a1e" stroke="#f9a825" stroke-width="1.5"/><text x="190" y="234" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">再現しない! バグが消えた?</text><rect x="420" y="48" width="360" height="200" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="75" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">なぜ消えるのか</text><text x="450" y="108" fill="#ffffff" font-size="12" font-family="sans-serif">デバッガの影響:</text><text x="450" y="130" fill="#aaaaaa" font-size="12" font-family="sans-serif">  スレッド一時停止</text><text x="450" y="150" fill="#aaaaaa" font-size="12" font-family="sans-serif">  タイミングが変わる</text><text x="450" y="170" fill="#aaaaaa" font-size="12" font-family="sans-serif">  Race Condition が消える</text><text x="450" y="200" fill="#f9a825" font-size="12" font-family="sans-serif">結果:</text><text x="450" y="222" fill="#f9a825" font-size="12" font-family="sans-serif">  バグの条件が成立しない</text><text x="600" y="260" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">= Heisenbug!</text></svg>`;

const memoryAlignSVG = `<svg viewBox="0 0 800 270" style="max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">Heisenbugsのメカニズム：メモリ・キャッシュ効果</text><rect x="20" y="50" width="360" height="200" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="78" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">メモリアライメント型</text><text x="200" y="100" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">デバッグモードでは変数配置が変わる</text><rect x="50" y="115" width="130" height="40" rx="5" fill="#3a1a1a" stroke="#e91e63" stroke-width="1.5"/><text x="115" y="135" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">本番: アライメント違反</text><text x="115" y="148" fill="#e91e63" font-size="10" font-family="sans-serif" text-anchor="middle">クラッシュ!</text><rect x="200" y="115" width="140" height="40" rx="5" fill="#1e4a1e" stroke="#f9a825" stroke-width="1.5"/><text x="270" y="135" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">デバッグ: 別の配置</text><text x="270" y="148" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">偶然マスクされる</text><text x="200" y="195" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">デバッグモード → 変数配置変化</text><text x="200" y="215" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">→ アライメント違反が偶然解消</text><text x="200" y="238" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">AddressSanitizer で検出可能</text><rect x="420" y="50" width="360" height="200" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="78" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">CPUキャッシュ効果型</text><text x="600" y="100" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">プロファイラがキャッシュを汚染</text><rect x="450" y="115" width="140" height="40" rx="5" fill="#3a1a1a" stroke="#e91e63" stroke-width="1.5"/><text x="520" y="135" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">本番: キャッシュ最適</text><text x="520" y="148" fill="#e91e63" font-size="10" font-family="sans-serif" text-anchor="middle">競合状態あり</text><rect x="608" y="115" width="140" height="40" rx="5" fill="#1e4a1e" stroke="#f9a825" stroke-width="1.5"/><text x="678" y="135" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">プロファイラ実行時</text><text x="678" y="148" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">異なるアクセス順</text><text x="600" y="195" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">プロファイラ → キャッシュライン汚染</text><text x="600" y="215" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">→ アクセスパターンが変わる</text><text x="600" y="238" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">eBPF で非侵襲的に観測</text></svg>`;

const summaryHeisenSVG = `<svg viewBox="0 0 800 240" style="max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">まとめ：測定は常に介入である</text><rect x="30" y="50" width="360" height="170" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="80" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">量子力学 (Heisenberg 1927)</text><text x="210" y="108" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">位置測定 → 運動量が変わる</text><text x="210" y="130" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">観測行為 = 状態変化</text><text x="210" y="165" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">ΔxΔp ≥ ℏ/2</text><text x="210" y="185" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">不確定性原理</text><rect x="410" y="50" width="360" height="170" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="80" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">ソフトウェア (Heisenbug)</text><text x="590" y="108" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">デバッガ → タイミングが変わる</text><text x="590" y="130" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">測定行為 = バグが消える</text><text x="590" y="165" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">Race Condition</text><text x="590" y="185" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">Timing Bug / Cache Effect</text><text x="400" y="225" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">対策: 非侵襲的観察 + コンパイラ支援 + 設計で防ぐ</text></svg>`;

// Add SVGs
const scenario11Idx = slides.findIndex(
	(s: { title: string }) => s.title === "観察すると消えるバグ（1/2）",
);
if (scenario11Idx >= 0) {
	slides[scenario11Idx].content = [
		heisenScenarioSVG,
		...slides[scenario11Idx].content,
	];
	console.log(`Updated: ${slides[scenario11Idx].title}`);
}

const mech22Idx = slides.findIndex(
	(s: { title: string }) => s.title === "Heisenbugsのメカニズム（2/2）",
);
if (mech22Idx >= 0) {
	slides[mech22Idx].content = [memoryAlignSVG, ...slides[mech22Idx].content];
	console.log(`Updated: ${slides[mech22Idx].title}`);
}

const summaryIdx = slides.findIndex(
	(s: { title: string }) => s.title === "まとめ：測定は介入である",
);
if (summaryIdx >= 0) {
	slides[summaryIdx].content = [
		summaryHeisenSVG,
		...slides[summaryIdx].content,
	];
	console.log(`Updated: ${slides[summaryIdx].title}`);
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log("Done: observer-effect-heisenbug round 2 - 3 more SVGs");
