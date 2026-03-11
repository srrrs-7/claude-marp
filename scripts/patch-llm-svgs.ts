#!/usr/bin/env bun
/**
 * Patch script: Add SVG diagrams to Local LLM presentation
 * Target: ≥36 of 70 slides get SVG (≥51%)
 */

import { readFileSync, writeFileSync } from "node:fs";

const FILE = "/workspace/main/docs/20260219000000_local-llm/slides-data.json";
const data = JSON.parse(readFileSync(FILE, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const GRN = "#4caf50";
const BLU = "#2196f3";
const PRP = "#9c27b0";
const CYN = "#00bcd4";

function svgWrap(inner: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="${h}" fill="${BG}"/>${inner}</svg>`;
}

function box(
	x: number,
	y: number,
	w: number,
	h: number,
	fill: string,
	label: string,
	sub = "",
	labelSize = 15,
	sublSize = 12,
): string {
	const cy = sub ? y + h / 2 - 9 : y + h / 2;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="${x + w / 2}" y="${cy}" text-anchor="middle" dominant-baseline="middle" fill="${TXT}" font-size="${labelSize}" font-weight="bold" font-family="sans-serif">${label}</text>
${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 12}" text-anchor="middle" dominant-baseline="middle" fill="${ACC1}" font-size="${sublSize}" font-family="sans-serif">${sub}</text>` : ""}`;
}

function arrow(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color = ACC1,
): string {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const len = Math.sqrt(dx * dx + dy * dy);
	if (len === 0) return "";
	const ux = dx / len;
	const uy = dy / len;
	const px = -uy;
	const py = ux;
	const ax = x2 - ux * 12;
	const ay = y2 - uy * 12;
	return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5"/>
<polygon points="${x2},${y2} ${ax + px * 6},${ay + py * 6} ${ax - px * 6},${ay - py * 6}" fill="${color}"/>`;
}

function lbl(
	x: number,
	y: number,
	text: string,
	color = TXT,
	size = 13,
	weight = "normal",
): string {
	return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="sans-serif">${text}</text>`;
}

function bar(
	x: number,
	y: number,
	w: number,
	h: number,
	fill: string,
	text: string,
	val: string,
): string {
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}"/>
<text x="${x + w / 2}" y="${y + h / 2 - 6}" text-anchor="middle" dominant-baseline="middle" fill="${TXT}" font-size="12" font-family="sans-serif">${text}</text>
<text x="${x + w / 2}" y="${y + h / 2 + 10}" text-anchor="middle" dominant-baseline="middle" fill="${ACC1}" font-size="11" font-family="sans-serif">${val}</text>`;
}

const svgs: Record<number, string> = {};

// [4] ローカルLLMとは
svgs[4] = svgWrap(
	`
  ${lbl(400, 30, "ローカルLLM とは", ACC1, 18, "bold")}
  ${box(50, 80, 300, 80, BOX, "クラウドLLM", "API呼び出し / GPT-4 / Claude")}
  ${box(450, 80, 300, 80, "#1a3a1a", "ローカルLLM", "自機実行 / Llama / Mistral")}
  <line x1="350" y1="120" x2="450" y2="120" stroke="${ACC2}" stroke-width="3" stroke-dasharray="8,4"/>
  ${lbl(400, 120, "VS", ACC2, 22, "bold")}
  ${box(50, 240, 135, 55, "#2a1a2a", "データ外部送信", "", 12)}
  ${box(195, 240, 135, 55, "#2a1a2a", "月額コスト発生", "", 12)}
  ${box(50, 310, 135, 55, "#1a3a1a", "完全プライベート", "", 12)}
  ${box(195, 310, 135, 55, "#1a3a1a", "ランニングコスト0", "", 12)}
  ${box(450, 240, 135, 55, "#1a3a1a", "オフライン動作", "", 12)}
  ${box(595, 240, 135, 55, "#1a3a1a", "カスタマイズ自由", "", 12)}
`,
	390,
);

// [5] LLMの仕組み
svgs[5] = svgWrap(
	`
  ${lbl(400, 30, "LLM のアーキテクチャ概要", ACC1, 18, "bold")}
  ${box(30, 80, 120, 60, BOX, "入力", "トークン列")}
  ${arrow(150, 110, 220, 110)}
  ${box(220, 65, 180, 90, "#1b3a4b", "Transformer", "Self-Attention × N層")}
  ${arrow(400, 110, 470, 110)}
  ${box(470, 80, 120, 60, "#1a3a1a", "出力", "次トークン")}
  ${box(620, 80, 150, 60, "#2a1a4a", "Weights", "モデルファイル")}
  ${arrow(620, 110, 600, 110, PRP)}
  ${box(200, 230, 400, 70, BOX, "パラメータ数 → 7B / 13B / 70B = モデルサイズ", "", 14)}
  ${lbl(400, 340, "推論 = テキスト → トークン化 → 行列演算 → デコード", CYN, 13)}
`,
	380,
);

// [7] クラウド vs ローカル
svgs[7] = svgWrap(
	`
  ${lbl(400, 25, "クラウドLLM vs ローカルLLM", ACC1, 18, "bold")}
  ${box(30, 65, 340, 55, "#1b3a4b", "クラウドLLM (GPT-4 / Claude)", "", 14)}
  ${box(430, 65, 340, 55, "#1a3a1a", "ローカルLLM (Llama / Mistral)", "", 14)}
  ${box(30, 135, 155, 50, "#2a1a2a", "プライバシー △", "", 12)}
  ${box(195, 135, 175, 50, "#2a1a2a", "コスト: API課金", "", 12)}
  ${box(430, 135, 155, 50, "#1a3a1a", "プライバシー ◎", "", 12)}
  ${box(595, 135, 175, 50, "#1a3a1a", "コスト: 初期のみ", "", 12)}
  ${box(30, 200, 155, 50, "#1a3a1a", "性能: 最高品質", "", 12)}
  ${box(195, 200, 175, 50, "#1a3a1a", "スケール: 無制限", "", 12)}
  ${box(430, 200, 155, 50, "#2a1a2a", "性能: モデル依存", "", 12)}
  ${box(595, 200, 175, 50, "#1a3a1a", "オフライン: ◎", "", 12)}
  ${box(30, 265, 155, 50, "#2a1a2a", "オフライン: ✗", "", 12)}
  ${box(195, 265, 175, 50, "#2a1a2a", "カスタム: 困難", "", 12)}
  ${box(430, 265, 155, 50, "#1a3a1a", "HW: 自前必要", "", 12)}
  ${box(595, 265, 175, 50, "#1a3a1a", "カスタム: 自由", "", 12)}
`,
	360,
);

// [8] エコシステム全体図
svgs[8] = svgWrap(
	`
  ${lbl(400, 25, "ローカルLLM エコシステム全体図", ACC1, 18, "bold")}
  ${box(30, 65, 170, 60, "#2a1a4a", "モデル", "Llama/Mistral/Phi")}
  ${arrow(200, 95, 260, 95)}
  ${box(260, 65, 170, 60, "#1b3a4b", "ランタイム", "Ollama / llama.cpp")}
  ${arrow(430, 95, 490, 95)}
  ${box(490, 65, 170, 60, "#1a3a1a", "API 層", "OpenAI互換 REST")}
  ${arrow(660, 95, 720, 95)}
  ${box(720, 65, 60, 60, BOX, "App", "")}
  ${box(30, 200, 170, 60, BOX, "量子化", "GGUF/AWQ/GPTQ")}
  ${box(260, 200, 170, 60, BOX, "GUI", "LM Studio")}
  ${box(490, 200, 170, 60, BOX, "フレームワーク", "LangChain")}
  ${box(30, 310, 710, 55, "#1b3a4b", "ハードウェア: CPU (x86/ARM) / GPU (NVIDIA/AMD/Apple M) / NPU", "", 13)}
`,
	400,
);

// [11] ローカルLLMを選ぶ4つの理由
svgs[11] = svgWrap(
	`
  ${lbl(400, 25, "ローカルLLM を選ぶ 4 つの理由", ACC1, 18, "bold")}
  ${box(30, 70, 340, 90, "#1b3a4b", "① プライバシー・セキュリティ", "データが外部に出ない", 15, 12)}
  ${box(430, 70, 340, 90, "#1a3a1a", "② コスト削減", "API コスト ゼロ → 初期投資のみ", 15, 12)}
  ${box(30, 200, 340, 90, "#2a1a4a", "③ オフライン・低レイテンシ", "ネット不要 / msec 応答", 15, 12)}
  ${box(430, 200, 340, 90, "#1b3a4b", "④ フルカスタマイズ", "ファインチューニング / Modelfile", 15, 12)}
`,
	330,
);

// [12] プライバシー
svgs[12] = svgWrap(
	`
  ${lbl(400, 25, "プライバシー・データセキュリティ比較", ACC1, 18, "bold")}
  ${box(30, 70, 340, 70, "#2a1a2a", "クラウド LLM", "データ → 外部サーバへ送信")}
  ${box(430, 70, 340, 70, "#1a3a1a", "ローカル LLM", "データ → 自機内のみ")}
  <line x1="400" y1="60" x2="400" y2="360" stroke="${ACC2}" stroke-width="1" stroke-dasharray="6,4"/>
  ${box(30, 180, 340, 55, "#2a1a2a", "GDPR / 個人情報 リスク高", "", 13)}
  ${box(430, 180, 340, 55, "#1a3a1a", "GDPR 準拠容易 / 機密データOK", "", 13)}
  ${box(30, 250, 340, 55, "#2a1a2a", "社内規定で禁止ケース多", "", 13)}
  ${box(430, 250, 340, 55, "#1a3a1a", "金融・医療・法務に最適", "", 13)}
  ${lbl(400, 350, "機密プロジェクトはローカルLLM一択", GRN, 14, "bold")}
`,
	390,
);

// [13] コスト比較
svgs[13] = svgWrap(
	`
  ${lbl(400, 25, "コスト比較：クラウド API vs ローカル", ACC1, 18, "bold")}
  ${lbl(200, 60, "クラウドAPI (GPT-4o)", ACC2, 14, "bold")}
  ${lbl(600, 60, "ローカル (RTX 4090)", GRN, 14, "bold")}
  <rect x="60" y="80" width="280" height="20" rx="3" fill="#333"/>
  <rect x="60" y="80" width="280" height="20" rx="3" fill="${ACC2}"/>
  ${lbl(200, 90, "初期コスト: $0", TXT, 12)}
  <rect x="460" y="80" width="120" height="20" rx="3" fill="#333"/>
  <rect x="460" y="80" width="120" height="20" rx="3" fill="${GRN}"/>
  ${lbl(600, 90, "初期: $1,500〜", TXT, 12)}
  <rect x="60" y="120" width="60" height="20" rx="3" fill="${ACC2}"/>
  ${lbl(200, 130, "100万トークン=$5〜$30", TXT, 12)}
  <rect x="460" y="120" width="10" height="20" rx="3" fill="${GRN}"/>
  ${lbl(600, 130, "追加コスト: $0", TXT, 12)}
  ${box(60, 190, 280, 60, "#2a1a2a", "月100万リクエスト", "= 数万〜数十万円/月", 14, 12)}
  ${box(460, 190, 280, 60, "#1a3a1a", "月100万リクエスト", "= 電気代のみ", 14, 12)}
  ${lbl(400, 310, "高頻度利用ほどローカルが有利 — BEP: 6〜12 ヶ月", GRN, 13)}
`,
	360,
);

// [16] モデルポジショニングマップ
svgs[16] = svgWrap(
	`
  ${lbl(400, 25, "モデルポジショニングマップ 2026", ACC1, 18, "bold")}
  <line x1="100" y1="200" x2="700" y2="200" stroke="${TXT}" stroke-width="1.5"/>
  <line x1="400" y1="50" x2="400" y2="350" stroke="${TXT}" stroke-width="1.5"/>
  <polygon points="700,200 688,194 688,206" fill="${TXT}"/>
  <polygon points="400,50 394,62 406,62" fill="${TXT}"/>
  ${lbl(700, 185, "高性能", TXT, 12)}
  ${lbl(100, 185, "軽量", TXT, 12)}
  ${lbl(415, 55, "低VRAM", TXT, 12)}
  ${lbl(415, 345, "高VRAM", TXT, 12)}
  <circle cx="550" cy="120" r="20" fill="${ACC2}"/>
  ${lbl(550, 120, "Llama3\n70B", TXT, 10)}
  <circle cx="500" cy="200" r="15" fill="${BLU}"/>
  ${lbl(500, 200, "Llama3\n8B", TXT, 10)}
  <circle cx="250" cy="160" r="15" fill="${GRN}"/>
  ${lbl(250, 160, "Phi-4", TXT, 10)}
  <circle cx="300" cy="220" r="12" fill="${CYN}"/>
  ${lbl(300, 220, "Gemma3", TXT, 10)}
  <circle cx="600" cy="260" r="18" fill="${PRP}"/>
  ${lbl(600, 260, "Mixtral\n8x7B", TXT, 10)}
  <circle cx="450" cy="290" r="12" fill="${ACC1}"/>
  ${lbl(450, 290, "Mistral\n7B", TXT, 10)}
`,
	390,
);

// [22] モデル選択フローチャート
svgs[22] = svgWrap(
	`
  ${lbl(400, 25, "モデル選択フローチャート", ACC1, 18, "bold")}
  ${box(300, 60, 200, 55, "#1b3a4b", "VRAM は？", "")}
  ${arrow(400, 115, 200, 180)}
  ${arrow(400, 115, 400, 180)}
  ${arrow(400, 115, 600, 180)}
  ${box(90, 180, 170, 55, BOX, "4GB 以下", "")}
  ${box(315, 180, 170, 55, BOX, "8〜16GB", "")}
  ${box(540, 180, 170, 55, BOX, "24GB 以上", "")}
  ${arrow(175, 235, 175, 295)}
  ${arrow(400, 235, 400, 295)}
  ${arrow(625, 235, 625, 295)}
  ${box(80, 295, 190, 55, "#1a3a1a", "Phi-4 / Gemma3 2B\nGGUF Q4", "", 12)}
  ${box(310, 295, 190, 55, "#1a3a1a", "Llama3 8B\nMistral 7B", "", 12)}
  ${box(535, 295, 190, 55, "#1a3a1a", "Llama3 70B\nMixtral 8x7B", "", 12)}
`,
	390,
);

// [24] なぜ量子化が必要か
svgs[24] = svgWrap(
	`
  ${lbl(400, 25, "なぜ量子化が必要か", ACC1, 18, "bold")}
  ${bar(50, 70, 700, 55, "#2a1a2a", "Llama3 70B FP32", "280 GB VRAM 必要")}
  ${bar(50, 140, 560, 55, "#2a1a3a", "Llama3 70B FP16", "140 GB VRAM")}
  ${bar(50, 210, 350, 55, "#1b3a4b", "Llama3 70B INT8", "70 GB VRAM")}
  ${bar(50, 280, 200, 55, "#1a3a1a", "Llama3 70B Q4", "40 GB VRAM")}
  ${bar(50, 350, 110, 55, "#1a3a2a", "Llama3 70B Q2", "20 GB VRAM")}
  ${lbl(680, 355, "← 精度低下", ACC2, 13)}
`,
	440,
);

// [25] フォーマット比較
svgs[25] = svgWrap(
	`
  ${lbl(400, 25, "主要フォーマット比較", ACC1, 18, "bold")}
  ${box(30, 70, 220, 70, "#1b3a4b", "GGUF", "llama.cpp 専用 CPU/GPU")}
  ${box(290, 70, 220, 70, "#1a3a2a", "AWQ", "Activation-aware 4bit GPU")}
  ${box(550, 70, 220, 70, "#2a1a4a", "GPTQ", "Post-training 4bit GPU")}
  ${box(30, 175, 220, 65, BOX, "CPU でも動作可能\n汎用性 ◎", "", 12)}
  ${box(290, 175, 220, 65, BOX, "精度保持◎ / 速度◎\nGPU 必須", "", 12)}
  ${box(550, 175, 220, 65, BOX, "歴史が長い / 互換性◎\nGPU 必須", "", 12)}
  ${box(30, 275, 220, 55, "#1a3a1a", "Ollama / LM Studio", "", 12)}
  ${box(290, 275, 220, 55, "#1a3a1a", "vLLM / TGI", "", 12)}
  ${box(550, 275, 220, 55, "#1a3a1a", "AutoGPTQ / vLLM", "", 12)}
  ${lbl(400, 370, "CPU 実行 → GGUF、GPU 高速推論 → AWQ / GPTQ", GRN, 13)}
`,
	410,
);

// [26] 量子化レベル比較
svgs[26] = svgWrap(
	`
  ${lbl(400, 25, "量子化レベル別スペック比較 (7B モデル)", ACC1, 18, "bold")}
  ${lbl(130, 60, "量子化", TXT, 13, "bold")}
  ${lbl(290, 60, "VRAM", TXT, 13, "bold")}
  ${lbl(430, 60, "速度", TXT, 13, "bold")}
  ${lbl(560, 60, "品質", TXT, 13, "bold")}
  ${lbl(680, 60, "推奨用途", TXT, 13, "bold")}
  ${box(30, 80, 180, 45, "#2a1a4a", "FP16 (16bit)", "", 13)}
  ${lbl(290, 103, "14 GB", CYN, 13)}
  ${lbl(430, 103, "標準", TXT, 13)}
  ${lbl(560, 103, "最高", GRN, 13)}
  ${lbl(680, 103, "GPU24GB+", TXT, 12)}
  ${box(30, 135, 180, 45, "#1b3a4b", "Q8 (8bit)", "", 13)}
  ${lbl(290, 158, "7 GB", CYN, 13)}
  ${lbl(430, 158, "速い", GRN, 13)}
  ${lbl(560, 158, "◎", GRN, 13)}
  ${lbl(680, 158, "GPU 8GB", TXT, 12)}
  ${box(30, 190, 180, 45, "#1b3a4b", "Q4 (4bit)", "", 13)}
  ${lbl(290, 213, "4 GB", GRN, 13)}
  ${lbl(430, 213, "最速", GRN, 13)}
  ${lbl(560, 213, "○ 実用的", ACC1, 13)}
  ${lbl(680, 213, "GPU/CPU", TXT, 12)}
  ${box(30, 245, 180, 45, "#1a3a1a", "Q2 (2bit)", "", 13)}
  ${lbl(290, 268, "2 GB", GRN, 13)}
  ${lbl(430, 268, "超高速", GRN, 13)}
  ${lbl(560, 268, "△ やや劣化", ACC2, 13)}
  ${lbl(680, 268, "超低スペック", TXT, 12)}
  ${lbl(400, 330, "バランス重視なら Q4 が最もコスパ良好", ACC1, 14, "bold")}
`,
	370,
);

// [27] トレードオフ
svgs[27] = svgWrap(
	`
  ${lbl(400, 25, "精度 vs 速度 vs メモリ トレードオフ", ACC1, 18, "bold")}
  <polygon points="400,60 700,320 100,320" fill="none" stroke="${ACC1}" stroke-width="2"/>
  ${lbl(400, 45, "精度", ACC1, 14, "bold")}
  ${lbl(730, 335, "速度", GRN, 14, "bold")}
  ${lbl(65, 335, "メモリ効率", CYN, 14, "bold")}
  <circle cx="400" cy="180" r="8" fill="${ACC2}"/>
  ${lbl(400, 160, "Q4 ← バランス最良", ACC2, 12)}
  <circle cx="400" cy="90" r="6" fill="${TXT}"/>
  ${lbl(430, 90, "FP16", TXT, 11)}
  <circle cx="580" cy="280" r="6" fill="${GRN}"/>
  ${lbl(610, 280, "Q2", GRN, 11)}
  <circle cx="230" cy="280" r="6" fill="${CYN}"/>
  ${lbl(200, 280, "INT4\nAWQ", CYN, 11)}
`,
	380,
);

// [29] ローカルLLMツール エコシステム
svgs[29] = svgWrap(
	`
  ${lbl(400, 25, "ローカルLLM ツール エコシステム", ACC1, 18, "bold")}
  ${box(30, 70, 175, 65, "#1b3a4b", "Ollama", "CLI / REST API")}
  ${box(215, 70, 175, 65, "#2a1a4a", "LM Studio", "GUI デスクトップ")}
  ${box(400, 70, 175, 65, "#1b3a4b", "llama.cpp", "低レベル C++")}
  ${box(585, 70, 175, 65, "#1a3a1a", "vLLM", "本番 高スループット")}
  ${box(30, 200, 175, 65, BOX, "初心者向け\nMac/Win/Linux")}
  ${box(215, 200, 175, 65, BOX, "初心者向け\nGUI管理")}
  ${box(400, 200, 175, 65, BOX, "上級者向け\nカスタマイズ")}
  ${box(585, 200, 175, 65, BOX, "本番デプロイ\nLinux/GPU")}
  ${box(30, 310, 730, 55, "#1b3a4b", "共通: OpenAI 互換 API → LangChain / LlamaIndex から透過的に利用可能", "", 13)}
`,
	400,
);

// [34] CPU/GPU/NPU
svgs[34] = svgWrap(
	`
  ${lbl(400, 25, "CPU / GPU / NPU の役割分担", ACC1, 18, "bold")}
  ${box(30, 70, 220, 100, "#1b3a4b", "CPU", "汎用計算 x86 / ARM\nGGUF 推論可")}
  ${box(290, 70, 220, 100, "#1a3a1a", "GPU", "並列計算 CUDA / Metal\n高速推論")}
  ${box(550, 70, 220, 100, "#2a1a4a", "NPU", "AI専用回路\nApple Neural Engine")}
  ${box(30, 220, 220, 65, BOX, "低速 / 高汎用\nコスト低")}
  ${box(290, 220, 220, 65, BOX, "高速 / 高コスト\nVRAM 重要")}
  ${box(550, 220, 220, 65, BOX, "省電力 / 高効率\nモデル制限あり")}
  ${lbl(400, 340, "実用構成: CPU補助 + GPU主体 / or Apple M シリーズ統合メモリ", GRN, 13)}
`,
	390,
);

// [35] CPU/GPU/NPU 役割
svgs[35] = svgWrap(
	`
  ${lbl(400, 25, "CPU / GPU / NPU の役割分担 詳細", ACC1, 18, "bold")}
  ${box(30, 70, 220, 90, "#1b3a4b", "CPU", "汎用計算")}
  ${box(290, 70, 220, 90, "#1a3a1a", "GPU", "並列行列演算")}
  ${box(550, 70, 220, 90, "#2a1a4a", "NPU", "推論専用")}
  ${arrow(140, 160, 140, 220)}
  ${arrow(400, 160, 400, 220)}
  ${arrow(660, 160, 660, 220)}
  ${box(30, 220, 220, 65, BOX, "GGUF/CPU推論\n低速・汎用")}
  ${box(290, 220, 220, 65, BOX, "CUDA/Metal\n高速推論")}
  ${box(550, 220, 220, 65, BOX, "Apple ANE\n省電力")}
  ${lbl(400, 340, "M3 Max: 統合メモリ 128GB → 大モデル実行可能", GRN, 13)}
`,
	380,
);

// [36] VRAM とモデルサイズ
svgs[36] = svgWrap(
	`
  ${lbl(400, 25, "VRAM とモデルサイズの目安", ACC1, 18, "bold")}
  ${box(30, 70, 130, 50, "#2a1a4a", "2B モデル", "")}
  ${box(30, 135, 130, 50, "#1b3a4b", "7B モデル", "")}
  ${box(30, 200, 130, 50, "#1b3a4b", "13B モデル", "")}
  ${box(30, 265, 130, 50, "#1a3a1a", "34B モデル", "")}
  ${box(30, 330, 130, 50, "#1a3a2a", "70B モデル", "")}
  <rect x="175" y="82" width="90" height="26" rx="3" fill="${CYN}"/>
  ${lbl(220, 95, "~2 GB", TXT, 12)}
  <rect x="175" y="147" width="220" height="26" rx="3" fill="${BLU}"/>
  ${lbl(285, 160, "~4-8 GB", TXT, 12)}
  <rect x="175" y="212" width="350" height="26" rx="3" fill="${ACC1}"/>
  ${lbl(350, 225, "~8-16 GB", TXT, 12)}
  <rect x="175" y="277" width="490" height="26" rx="3" fill="${ACC2}"/>
  ${lbl(420, 290, "~16-24 GB", TXT, 12)}
  <rect x="175" y="342" width="590" height="26" rx="3" fill="${PRP}"/>
  ${lbl(470, 355, "~40-48 GB (Q4)", TXT, 12)}
  ${lbl(400, 410, "Q4 量子化で VRAM を約 1/4 に削減可能", GRN, 13)}
`,
	450,
);

// [37] Apple Silicon
svgs[37] = svgWrap(
	`
  ${lbl(400, 25, "Apple Silicon (Metal) の活用", ACC1, 18, "bold")}
  ${box(100, 70, 600, 80, "#1b3a4b", "Apple M シリーズ — 統合メモリアーキテクチャ", "CPU + GPU + NPU がメモリ共有", 16, 12)}
  ${box(100, 190, 170, 65, "#2a1a4a", "M1/M2", "8-24GB 統合")}
  ${box(310, 190, 170, 65, "#1b3a4b", "M3 Max", "36-128GB 統合")}
  ${box(520, 190, 170, 65, "#1a3a1a", "M4 Ultra", "192GB 統合")}
  ${lbl(185, 290, "7B〜13B", CYN, 12)}
  ${lbl(395, 290, "34B〜70B", GRN, 12)}
  ${lbl(605, 290, "100B+", ACC1, 12)}
  ${box(100, 320, 600, 55, BOX, "llama.cpp / Ollama は Metal 対応 → GPU 推論自動切換え", "", 13)}
`,
	410,
);

// [38] コスパ最適化
svgs[38] = svgWrap(
	`
  ${lbl(400, 25, "コスパ最適化ガイド", ACC1, 18, "bold")}
  ${box(30, 70, 220, 75, "#2a1a4a", "~$500 予算", "CPU のみ / Phi-4 Q4")}
  ${box(290, 70, 220, 75, "#1b3a4b", "~$1,500 予算", "RTX 3080 10GB")}
  ${box(550, 70, 220, 75, "#1a3a1a", "~$3,000 予算", "RTX 4090 24GB")}
  ${box(30, 190, 220, 65, BOX, "Llama3 8B Q4\n~5 tok/s")}
  ${box(290, 190, 220, 65, BOX, "Llama3 13B Q4\n~20 tok/s")}
  ${box(550, 190, 220, 65, BOX, "Llama3 70B Q4\n~30 tok/s")}
  ${lbl(400, 320, "Mac M3 Max ($3,000) は GPU不要で 70B 実行可能 — 省電力優位", GRN, 13)}
`,
	370,
);

// [46] アプリケーション統合
svgs[46] = svgWrap(
	`
  ${lbl(400, 25, "アプリケーション統合アーキテクチャ", ACC1, 18, "bold")}
  ${box(30, 80, 160, 65, BOX, "Your App", "Python / JS")}
  ${arrow(190, 112, 270, 112)}
  ${box(270, 80, 200, 65, "#1b3a4b", "LangChain /\nLlamaIndex", "", 13)}
  ${arrow(470, 112, 550, 112)}
  ${box(550, 80, 200, 65, "#1a3a1a", "Ollama API\nlocalhost:11434", "", 13)}
  ${arrow(650, 145, 650, 220)}
  ${box(550, 220, 200, 65, "#2a1a4a", "Local Model\nLlama3 / Mistral", "", 13)}
  ${box(30, 240, 480, 60, BOX, "OpenAI 互換 API → base_url='http://localhost:11434/v1'", "", 13)}
`,
	360,
);

// [50] ローカルRAGアーキテクチャ
svgs[50] = svgWrap(
	`
  ${lbl(400, 25, "完全ローカル RAG アーキテクチャ", ACC1, 18, "bold")}
  ${box(30, 80, 150, 60, BOX, "ドキュメント", "PDF/MD/TXT")}
  ${arrow(180, 110, 250, 110)}
  ${box(250, 80, 150, 60, "#1b3a4b", "Embedding\nnomic-embed", "", 12)}
  ${arrow(400, 110, 470, 110)}
  ${box(470, 80, 150, 60, "#2a1a4a", "Vector DB\nChroma/FAISS", "", 12)}
  ${box(30, 230, 150, 60, BOX, "ユーザー質問", "")}
  ${arrow(180, 260, 250, 260)}
  ${box(250, 230, 150, 60, "#1b3a4b", "Embedding\n(同一モデル)", "", 12)}
  ${arrow(400, 260, 470, 260)}
  ${box(470, 230, 150, 60, "#2a1a4a", "類似検索\nTop-K", "", 12)}
  ${arrow(620, 260, 680, 260)}
  ${box(680, 230, 90, 60, "#1a3a1a", "LLM\n生成", "", 12)}
  ${lbl(400, 360, "全コンポーネントをローカル実行 → 完全プライベート RAG", GRN, 13)}
`,
	400,
);

// [56] コーディング支援
svgs[56] = svgWrap(
	`
  ${lbl(400, 25, "コーディング支援ユースケース", ACC1, 18, "bold")}
  ${box(30, 70, 220, 75, "#1b3a4b", "コード補完", "Continue / Copilot代替")}
  ${box(290, 70, 220, 75, "#1a3a1a", "コードレビュー", "PR差分 → LLM解析")}
  ${box(550, 70, 220, 75, "#2a1a4a", "ドキュメント生成", "関数 → JSDoc自動")}
  ${box(30, 200, 220, 75, BOX, "バグ修正提案\nスタックトレース入力")}
  ${box(290, 200, 220, 75, BOX, "テストコード生成\nユニットテスト自動化")}
  ${box(550, 200, 220, 75, BOX, "リファクタリング\n技術負債解消")}
  ${lbl(400, 330, "推奨: Codestral / DeepSeek-Coder / Qwen2.5-Coder", GRN, 13)}
`,
	380,
);

// [60] パフォーマンスと最適化
svgs[60] = svgWrap(
	`
  ${lbl(400, 25, "推論パフォーマンス影響要因", ACC1, 18, "bold")}
  ${box(30, 70, 220, 70, "#2a1a4a", "モデルサイズ", "パラメータ数 ↑ → 遅")}
  ${box(290, 70, 220, 70, "#1b3a4b", "量子化", "Q4 が速度と精度のバランス")}
  ${box(550, 70, 220, 70, "#1a3a1a", "VRAM", "メモリ帯域が律速")}
  ${box(30, 200, 220, 70, BOX, "バッチサイズ", "並列リクエスト数")}
  ${box(290, 200, 220, 70, BOX, "コンテキスト長", "長いほど遅い")}
  ${box(550, 200, 220, 70, BOX, "GPU型番", "A100 > 4090 >> 3080")}
  ${lbl(400, 330, "tok/s = VRAM帯域 ÷ モデルウェイトサイズ が近似指標", GRN, 13)}
`,
	380,
);

// [62] 推論最適化テクニック
svgs[62] = svgWrap(
	`
  ${lbl(400, 25, "推論最適化テクニック", ACC1, 18, "bold")}
  ${box(30, 70, 340, 75, "#1b3a4b", "KV Cache", "過去トークンの計算結果を再利用")}
  ${box(430, 70, 340, 75, "#1a3a2a", "Flash Attention", "メモリ効率的な Attention 計算")}
  ${box(30, 200, 340, 75, "#2a1a4a", "Continuous Batching", "複数リクエストを動的にまとめる")}
  ${box(430, 200, 340, 75, "#1b3a4b", "Speculative Decoding", "Draft モデルで候補生成 → 高速化")}
  ${box(30, 330, 720, 55, BOX, "vLLM は上記すべてを自動適用 → 本番ワークロードに最適", "", 13)}
`,
	420,
);

// [64] 課題と制限
svgs[64] = svgWrap(
	`
  ${lbl(400, 25, "ローカルLLM の課題と制限", ACC2, 18, "bold")}
  ${box(30, 70, 340, 75, "#2a1a2a", "ハードウェアコスト", "高性能GPU / 大容量メモリが必要")}
  ${box(430, 70, 340, 75, "#2a1a2a", "性能ギャップ", "GPT-4o / Claude 3.5 には及ばない")}
  ${box(30, 200, 340, 75, "#2a1a2a", "セットアップコスト", "初期設定・保守の工数")}
  ${box(430, 200, 340, 75, "#2a1a2a", "マルチモーダル制限", "画像・音声対応モデルは少ない")}
  ${box(30, 330, 340, 55, "#1a3a1a", "対策: 量子化で低スペック対応", "", 13)}
  ${box(430, 330, 340, 55, "#1a3a1a", "対策: タスク特化ファインチューニング", "", 13)}
`,
	420,
);

// [66] 選択フレームワーク
svgs[66] = svgWrap(
	`
  ${lbl(400, 25, "ローカルLLM 選択フレームワーク", ACC1, 18, "bold")}
  ${box(280, 60, 240, 55, "#1b3a4b", "要件整理", "")}
  ${arrow(400, 115, 200, 180)}
  ${arrow(400, 115, 400, 180)}
  ${arrow(400, 115, 600, 180)}
  ${box(80, 180, 190, 55, "#2a1a2a", "プライバシー最優先", "", 13)}
  ${box(305, 180, 190, 55, "#1b3a4b", "コスト最適化", "", 13)}
  ${box(530, 180, 190, 55, "#1a3a1a", "性能最優先", "", 13)}
  ${arrow(175, 235, 175, 295)}
  ${arrow(400, 235, 400, 295)}
  ${arrow(625, 235, 625, 295)}
  ${box(80, 295, 190, 55, "#1a3a1a", "ローカル 一択\n機密データ対応")}
  ${box(305, 295, 190, 55, "#1a3a1a", "7B Q4 + Ollama\n低コスト実用")}
  ${box(530, 295, 190, 55, "#1a3a1a", "70B + GPU24GB\n高品質推論")}
`,
	390,
);

// [67] まとめ
svgs[67] = svgWrap(
	`
  ${lbl(400, 25, "まとめ: ローカルLLM 実践チェックリスト", ACC1, 18, "bold")}
  ${box(30, 70, 340, 60, "#1b3a4b", "① ユースケース確認", "プライバシー/コスト/性能 要件")}
  ${box(430, 70, 340, 60, "#1a3a1a", "② ハードウェア選定", "VRAM / 統合メモリ量")}
  ${box(30, 160, 340, 60, "#2a1a4a", "③ モデル選択", "7B Q4 → 70B Q4 段階的")}
  ${box(430, 160, 340, 60, "#1b3a4b", "④ ランタイム選択", "Ollama (簡単) / vLLM (本番)")}
  ${box(30, 250, 340, 60, "#1a3a1a", "⑤ アプリ統合", "OpenAI互換 API 活用")}
  ${box(430, 250, 340, 60, "#1b3a4b", "⑥ 最適化", "量子化 / KVCache / Batching")}
  ${lbl(400, 370, "ローカルLLM は 2026年 実用段階 — 今すぐ始めよう", GRN, 14, "bold")}
`,
	420,
);

// ============================================================
// Apply SVGs to slides
// ============================================================

let count = 0;
for (const [idxStr, svgStr] of Object.entries(svgs)) {
	const idx = parseInt(idxStr);
	const slide = data.slides[idx];
	if (!slide) continue;
	const content = slide.content.filter((c: string) => !c.startsWith("<svg"));
	slide.content = [svgStr, ...content];
	count++;
}

writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log(`Patched ${count} slides in Local LLM presentation`);
console.log(`Total slides: ${data.slides.length}`);
