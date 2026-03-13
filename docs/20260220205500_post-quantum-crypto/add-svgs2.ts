import { readFileSync, writeFileSync } from "node:fs";

const dataPath =
	"/workspace/main/docs/20260220205500_post-quantum-crypto/slides-data.json";
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

// SVG for HNDL Attack section slide
const hndlSectionSVG = `<svg viewBox="0 0 800 200" style="max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="40" fill="#e91e63" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">Chapter 3: HNDL Attack</text><text x="400" y="75" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle">Harvest Now, Decrypt Later</text><rect x="150" y="100" width="500" height="60" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="128" fill="#ffffff" font-size="14" font-family="sans-serif" text-anchor="middle">今の暗号化通信を保存 → 将来の量子PCで復号</text><text x="400" y="150" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle">NSA, CISA: 「2030年までにPQCへ移行」を推奨</text></svg>`;

// SVG for Shor's algorithm slide
const shorAlgorithmSVG = `<svg viewBox="0 0 800 310" style="max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">ショアのアルゴリズム：なぜRSAを破れるのか</text><rect x="20" y="48" width="370" height="245" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="205" y="73" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">古典：素因数分解</text><text x="205" y="98" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">N = p × q を解く</text><text x="205" y="118" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">（p, q は大きな素数）</text><rect x="60" y="135" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/><text x="200" y="160" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">RSA-2048: N は617桁の数</text><rect x="60" y="185" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#e91e63" stroke-width="1.5"/><text x="200" y="210" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">古典: O(exp(n^1/3)) = 指数時間</text><rect x="60" y="235" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#e91e63" stroke-width="1.5"/><text x="200" y="260" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">解読: 宇宙の年齢以上</text><rect x="410" y="48" width="370" height="245" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="595" y="73" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">量子：ショアのアルゴリズム</text><text x="595" y="98" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">周期性を量子フーリエ変換で発見</text><text x="595" y="118" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">↓ f(x) = a^x mod N の周期 r を求める</text><rect x="450" y="135" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/><text x="590" y="160" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">重ね合わせで全ての x を同時評価</text><rect x="450" y="185" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#f9a825" stroke-width="1.5"/><text x="590" y="210" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">量子: O((log n)^3) = 多項式時間</text><rect x="450" y="235" width="280" height="40" rx="8" fill="#1a1a2e" stroke="#f9a825" stroke-width="1.5"/><text x="590" y="260" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">解読: 数時間（十分なqubit数なら）</text></svg>`;

// SVG for NIST PQC standards section
const nistStandardsSVG = `<svg viewBox="0 0 800 220" style="max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="220" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">NIST PQC 標準3アルゴリズムの役割分担</text><rect x="20" y="50" width="230" height="148" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="135" y="78" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">ML-KEM</text><text x="135" y="98" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">FIPS 203 (旧 Kyber)</text><text x="135" y="122" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">鍵カプセル化</text><text x="135" y="142" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Key Exchange</text><text x="135" y="168" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">TLS鍵交換に使用</text><rect x="285" y="50" width="230" height="148" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="78" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">ML-DSA</text><text x="400" y="98" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">FIPS 204 (旧 Dilithium)</text><text x="400" y="122" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">電子署名</text><text x="400" y="142" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Digital Signature</text><text x="400" y="168" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">コード署名、認証</text><rect x="550" y="50" width="230" height="148" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="665" y="78" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">SLH-DSA</text><text x="665" y="98" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">FIPS 205 (旧 SPHINCS+)</text><text x="665" y="122" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ハッシュベース署名</text><text x="665" y="142" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">最も保守的な設計</text><text x="665" y="168" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">バックアップ署名</text></svg>`;

// SVG for PQC migration code slide (add visual to the hybrid TLS slide)
const hybridTLSSVG = `<svg viewBox="0 0 800 200" style="max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="28" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">ハイブリッドTLS：古典 + PQC の二重防御</text><rect x="30" y="50" width="165" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="112" y="78" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">クライアント</text><text x="112" y="102" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">X25519 + ML-KEM</text><text x="112" y="122" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">両方の鍵を生成</text><polygon points="212,115 240,108 240,122" fill="#f9a825"/><line x1="195" y1="115" x2="240" y2="115" stroke="#f9a825" stroke-width="2"/><rect x="250" y="50" width="290" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="395" y="78" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">ハイブリッド鍵交換</text><text x="395" y="100" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">ECDH + ML-KEM-768</text><text x="395" y="120" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">両方を破らないと解読不能</text><text x="395" y="148" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">古典攻撃 AND 量子攻撃を同時防御</text><polygon points="548,115 576,108 576,122" fill="#f9a825"/><line x1="540" y1="115" x2="576" y2="115" stroke="#f9a825" stroke-width="2"/><rect x="586" y="50" width="180" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="676" y="78" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">サーバー</text><text x="676" y="102" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">両方サポート</text><text x="676" y="122" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">TLS 1.3 + PQC</text></svg>`;

// SVG for summary slide
const summarySVG = `<svg viewBox="0 0 800 200" style="max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="30" fill="#f9a825" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">量子の脅威：タイムライン概要</text><line x1="60" y1="100" x2="740" y2="100" stroke="#555" stroke-width="2"/><polygon points="738,95 752,100 738,105" fill="#555"/><!-- Timeline points --><circle cx="150" cy="100" r="8" fill="#f9a825"/><text x="150" y="88" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">NIST PQC確定</text><text x="150" y="125" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">2024</text><circle cx="280" cy="100" r="8" fill="#f9a825"/><text x="280" y="88" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">HNDL攻撃</text><text x="280" y="125" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">今日〜</text><circle cx="430" cy="100" r="8" fill="#e91e63"/><text x="430" y="88" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">NSA移行期限</text><text x="430" y="125" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">〜2030</text><circle cx="600" cy="100" r="10" fill="#e91e63" stroke="#ffffff" stroke-width="2"/><text x="600" y="88" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">量子脅威実用化?</text><text x="600" y="125" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">2030年代〜</text><text x="400" y="165" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">「今すぐ移行を開始する」 ← これが唯一の正解</text></svg>`;

// Add SVGs to section slides and remaining content slides
const hndlSectionIdx = slides.findIndex(
	(s: { title: string }) => s.title === "Harvest Now, Decrypt Later",
);
if (hndlSectionIdx >= 0) {
	slides[hndlSectionIdx].content = [
		hndlSectionSVG,
		...slides[hndlSectionIdx].content,
	];
	console.log(
		`Updated slide ${hndlSectionIdx}: ${slides[hndlSectionIdx].title}`,
	);
}

const shorIdx = slides.findIndex(
	(s: { title: string }) => s.title === "ショアのアルゴリズム（1994）",
);
if (shorIdx >= 0) {
	slides[shorIdx].content = [shorAlgorithmSVG, ...slides[shorIdx].content];
	console.log(`Updated slide ${shorIdx}: ${slides[shorIdx].title}`);
}

const nistStdIdx = slides.findIndex(
	(s: { title: string }) => s.title === "NIST PQC標準（2024年8月発表）",
);
if (nistStdIdx >= 0) {
	slides[nistStdIdx].content = [
		nistStandardsSVG,
		...slides[nistStdIdx].content,
	];
	console.log(`Updated slide ${nistStdIdx}: ${slides[nistStdIdx].title}`);
}

const hybridTLSIdx = slides.findIndex(
	(s: { title: string }) => s.title === "PQC移行のコード例",
);
if (hybridTLSIdx >= 0) {
	slides[hybridTLSIdx].content = [
		hybridTLSSVG,
		...slides[hybridTLSIdx].content,
	];
	console.log(`Updated slide ${hybridTLSIdx}: ${slides[hybridTLSIdx].title}`);
}

const summaryIdx = slides.findIndex(
	(s: { title: string }) => s.title === "まとめ：量子の脅威に備える",
);
if (summaryIdx >= 0) {
	slides[summaryIdx].content = [summarySVG, ...slides[summaryIdx].content];
	console.log(`Updated slide ${summaryIdx}: ${slides[summaryIdx].title}`);
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log("Done: post-quantum-crypto round 2 - 5 more SVGs added");
