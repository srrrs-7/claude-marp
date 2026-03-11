#!/usr/bin/env bun
/**
 * Inject inline SVGs into GenAI Developer Professional presentation slides
 * Target: ≥56 slides with SVG out of 112 total
 * Already has 32 asset-ref slides, need 24 more inline SVGs
 */

import { readFileSync, writeFileSync } from "node:fs";

const SLIDES_PATH =
	"/workspace/main/docs/20260219120000_aws-genai-developer-professional/slides-data.json";

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TEXT = "#ffffff";
const SVG_STYLE =
	'style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"';

function svgWrap(inner: string, h = 380): string {
	return `<svg viewBox="0 0 800 ${h}" ${SVG_STYLE} xmlns="http://www.w3.org/2000/svg"><rect width="800" height="${h}" fill="${BG}" rx="12"/>${inner}</svg>`;
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
	const ux = dx / len;
	const uy = dy / len;
	const arrowSize = 10;
	const ex = x2 - ux * arrowSize;
	const ey = y2 - uy * arrowSize;
	const px = -uy * arrowSize * 0.5;
	const py = ux * arrowSize * 0.5;
	return (
		`<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="2.5"/>` +
		`<polygon points="${x2},${y2} ${ex + px},${ey + py} ${ex - px},${ey - py}" fill="${color}"/>`
	);
}

function box(
	x: number,
	y: number,
	w: number,
	h: number,
	fill = BOX,
	stroke = ACC1,
	rx = 8,
): string {
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" rx="${rx}"/>`;
}

function txt(
	x: number,
	y: number,
	content: string,
	size = 14,
	fill = TEXT,
	anchor = "middle",
	weight = "normal",
): string {
	return `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${content}</text>`;
}

// SVG: Bedrock model invocation flow
function svgBedrockInvocation(): string {
	let inner = txt(
		400,
		32,
		"Bedrock モデル呼び出しフロー",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const steps = [
		{ label: "App / Lambda", color: "#555577", x: 70 },
		{
			label: "Bedrock API\n(Converse /\nInvokeModel)",
			color: "#1565c0",
			x: 230,
		},
		{ label: "Guardrails\n(入出力フィルタ)", color: "#6a1b9a", x: 400 },
		{ label: "Foundation\nModel (FM)", color: "#2e7d32", x: 570 },
		{ label: "Response\n(Stream/Full)", color: ACC1, x: 720 },
	];
	for (const s of steps) {
		inner += box(s.x - 55, 60, 110, 90, BOX, s.color, 8);
		s.label.split("\n").forEach((line, i) => {
			inner += txt(
				s.x,
				100 + (i - Math.floor(s.label.split("\n").length / 2)) * 18,
				line,
				11,
				s.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	for (let i = 0; i < steps.length - 1; i++) {
		inner += arrow(steps[i].x + 55, 105, steps[i + 1].x - 55, 105);
	}
	// Knowledge Base
	inner += box(320, 185, 160, 50, "#0d1b2a", "#e65100", 6);
	inner += txt(400, 210, "Knowledge Base", 12, "#ff8a65", "middle", "bold");
	inner += txt(400, 228, "(RAG コンテキスト)", 10, "#aaaacc", "middle");
	inner += arrow(400, 185, 400, 150, "#e65100");
	// Annotations
	inner += box(30, 255, 740, 80, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		278,
		"Converse API: モデル非依存の統一インターフェース (マルチターン・Tool Use対応)",
		11,
		TEXT,
		"middle",
	);
	inner += txt(
		400,
		298,
		"InvokeModel API: モデル固有のリクエスト形式 (画像生成・Embeddingなど)",
		11,
		"#aaaacc",
		"middle",
	);
	inner += txt(
		400,
		318,
		"Guardrails: 入力フィルタ→FM→出力フィルタ の二段階チェック",
		11,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 355);
}

// SVG: Knowledge base architecture
function svgKnowledgeBase(): string {
	let inner = txt(
		400,
		32,
		"Knowledge Bases アーキテクチャ (RAGパイプライン)",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Ingestion pipeline
	inner += box(20, 55, 760, 50, "#0a0f1c", "#e65100", 6);
	inner += txt(
		400,
		75,
		"取り込みパイプライン (Indexing)",
		13,
		"#ff8a65",
		"middle",
		"bold",
	);
	inner += txt(
		400,
		92,
		"S3 / Confluence / SharePoint / Web Crawler → 自動処理",
		11,
		"#aaaacc",
		"middle",
	);
	const ingestion = [
		{ label: "文書変換\n(PDF→テキスト)", color: "#1565c0", x: 80 },
		{ label: "チャンキング\n(固定/意味/階層)", color: "#6a1b9a", x: 240 },
		{ label: "Embedding\n(Titan V2 / Cohere)", color: "#2e7d32", x: 400 },
		{ label: "メタデータ\n付与", color: "#e65100", x: 560 },
		{ label: "ベクターDB\n格納", color: "#795548", x: 700 },
	];
	for (const s of ingestion) {
		inner += box(s.x - 60, 115, 120, 60, BOX, s.color, 6);
		s.label.split("\n").forEach((line, i) => {
			inner += txt(s.x, 140 + (i - 0.5) * 16, line, 10, TEXT, "middle");
		});
	}
	for (let i = 0; i < ingestion.length - 1; i++) {
		inner += arrow(ingestion[i].x + 60, 145, ingestion[i + 1].x - 60, 145);
	}
	// Retrieval pipeline
	inner += box(20, 200, 760, 50, "#0a0f1c", "#1565c0", 6);
	inner += txt(
		400,
		220,
		"検索パイプライン (Retrieval at Runtime)",
		13,
		"#90caf9",
		"middle",
		"bold",
	);
	inner += txt(
		400,
		237,
		"クエリ → Embedding → ベクター類似度検索 → LLM コンテキスト注入",
		11,
		"#aaaacc",
		"middle",
	);
	const retrieval = [
		{ label: "ユーザー\nクエリ", color: "#555577", x: 80 },
		{ label: "Query\nEmbedding", color: "#1565c0", x: 230 },
		{ label: "ベクター\n検索 (kNN)", color: "#2e7d32", x: 380 },
		{ label: "Reranking\n(オプション)", color: ACC1, x: 540 },
		{ label: "LLM\n生成", color: "#e91e63", x: 700 },
	];
	for (const s of retrieval) {
		inner += box(s.x - 60, 270, 120, 55, BOX, s.color, 6);
		s.label.split("\n").forEach((line, i) => {
			inner += txt(
				s.x,
				292 + (i - 0.5) * 16,
				line,
				10,
				s.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	for (let i = 0; i < retrieval.length - 1; i++) {
		inner += arrow(retrieval[i].x + 60, 297, retrieval[i + 1].x - 60, 297);
	}
	return svgWrap(inner, 345);
}

// SVG: Agents tool-use cycle
function svgAgentsToolUse(): string {
	let inner = txt(
		400,
		30,
		"Agents for Bedrock — ReAct ツール使用サイクル",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Center FM
	inner += `<circle cx="400" cy="200" r="60" fill="#1565c0" stroke="${ACC1}" stroke-width="2"/>`;
	inner += txt(400, 195, "Foundation", 13, TEXT, "middle", "bold");
	inner += txt(400, 213, "Model", 13, TEXT, "middle", "bold");
	// Steps around
	const nodes = [
		{ label: "1. Think\n(推論)", x: 400, y: 65, color: "#6a1b9a" },
		{ label: "2. Act\n(ツール選択)", x: 620, y: 145, color: ACC2 },
		{ label: "3. Observe\n(結果取得)", x: 620, y: 255, color: "#2e7d32" },
		{ label: "4. Respond\n(最終回答)", x: 400, y: 335, color: ACC1 },
	];
	for (const n of nodes) {
		inner += box(n.x - 60, n.y - 25, 120, 50, BOX, n.color, 8);
		n.label.split("\n").forEach((line, i) => {
			inner += txt(
				n.x,
				n.y - 3 + i * 16,
				line,
				11,
				n.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	// Arrows
	inner += arrow(400, 90, 400, 140, "#6a1b9a");
	inner += arrow(460, 165, 560, 145, ACC2);
	inner += arrow(560, 255, 460, 235, "#2e7d32");
	inner += arrow(400, 260, 400, 310, ACC1);
	// Action group + Lambda
	inner += box(50, 165, 140, 70, "#0a0f1c", "#e65100", 6);
	inner += txt(120, 193, "Action Group", 11, "#ff8a65", "middle", "bold");
	inner += txt(120, 210, "(Lambda / API)", 10, "#aaaacc", "middle");
	inner += txt(120, 226, "OpenAPI スキーマ", 10, "#aaaacc", "middle");
	inner += arrow(340, 200, 190, 200, "#e65100");
	inner += arrow(190, 210, 340, 210, "#ff8a65");
	return svgWrap(inner, 390);
}

// SVG: Guardrails pipeline
function svgGuardrailsPipeline(): string {
	let inner = txt(
		400,
		30,
		"Guardrails コンテンツフィルタリングパイプライン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Input flow
	inner += txt(30, 75, "入力", 12, "#aaaacc", "start");
	inner += box(60, 58, 110, 40, BOX, "#555577", 6);
	inner += txt(115, 82, "ユーザー入力", 11, TEXT, "middle");
	const filters = [
		{ label: "Prompt\nAttack 検出", color: ACC2 },
		{ label: "拒否トピック\n(Denied Topics)", color: "#6a1b9a" },
		{ label: "コンテンツ\nフィルタ", color: "#e65100" },
		{ label: "PII\n検出/マスク", color: "#2e7d32" },
	];
	let fx = 200;
	for (const f of filters) {
		inner += box(fx, 50, 120, 55, "#0d1b2a", f.color, 6);
		f.label.split("\n").forEach((line, i) => {
			inner += txt(fx + 60, 72 + (i - 0.5) * 16, line, 10, TEXT, "middle");
		});
		inner += arrow(fx - 10, 77, fx, 77);
		fx += 130;
	}
	// FM
	inner += box(720, 50, 65, 55, BOX, "#1565c0", 6);
	inner += txt(752, 75, "FM", 13, "#90caf9", "middle", "bold");
	inner += txt(752, 93, "(Model)", 10, "#aaaacc", "middle");
	inner += arrow(710, 77, 720, 77);
	// Output flow
	inner += txt(30, 175, "出力", 12, "#aaaacc", "start");
	const outFilters = [
		{ label: "拒否トピック\nチェック", color: "#6a1b9a" },
		{ label: "コンテンツ\nフィルタ", color: "#e65100" },
		{ label: "PII\nマスキング", color: "#2e7d32" },
		{ label: "Grounding\n(ハルシネ検出)", color: "#1565c0" },
	];
	fx = 200;
	for (const f of outFilters) {
		inner += box(fx, 153, 120, 55, "#0d1b2a", f.color, 6);
		f.label.split("\n").forEach((line, i) => {
			inner += txt(fx + 60, 175 + (i - 0.5) * 16, line, 10, TEXT, "middle");
		});
		inner += arrow(fx - 10, 180, fx, 180);
		fx += 130;
	}
	// Final output
	inner += box(720, 153, 65, 55, BOX, "#81c784", 6);
	inner += txt(752, 178, "安全な", 11, "#81c784", "middle", "bold");
	inner += txt(752, 196, "出力", 11, "#81c784", "middle", "bold");
	inner += arrow(710, 180, 720, 180);
	// FM to output start
	inner += arrow(752, 105, 752, 153, "#aaaacc");
	// Annotations
	inner += box(30, 230, 740, 70, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		253,
		"全フィルタは独立して動作 / 入力と出力で個別に設定可能",
		12,
		TEXT,
		"middle",
	);
	inner += txt(
		400,
		273,
		"Grounding Check: RAG出力がコンテキストに根拠があるかを自動評価 (ハルシネーション検出)",
		11,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 320);
}

// SVG: Model evaluation workflow
function svgModelEvaluation(): string {
	let inner = txt(
		400,
		30,
		"モデル評価ワークフロー",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const steps = [
		{ label: "評価データセット\n準備 (S3)", color: "#1565c0", x: 100 },
		{ label: "Bedrock\nEvaluation\nジョブ作成", color: "#6a1b9a", x: 270 },
		{ label: "モデル実行\n& スコア計算", color: "#2e7d32", x: 450 },
		{ label: "レポート\n生成・比較", color: ACC1, x: 620 },
	];
	for (const s of steps) {
		inner += box(s.x - 70, 60, 140, 90, BOX, s.color, 8);
		s.label.split("\n").forEach((line, i) => {
			const lineCount = s.label.split("\n").length;
			inner += txt(
				s.x,
				95 + (i - (lineCount - 1) / 2) * 18,
				line,
				11,
				s.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	for (let i = 0; i < steps.length - 1; i++) {
		inner += arrow(steps[i].x + 70, 105, steps[i + 1].x - 70, 105);
	}
	// Metric boxes
	const metrics = [
		{ label: "自動評価\nROUGE/BLEU\nBERTScore", color: "#1565c0", x: 120 },
		{
			label: "LLM-as-Judge\nFaithfulness\nRelevance",
			color: "#6a1b9a",
			x: 310,
		},
		{
			label: "ヒューマン評価\nAmazon A2I\n人間レビュー",
			color: "#e65100",
			x: 500,
		},
		{ label: "RAG評価\nKB連携\nコンテキスト品質", color: "#2e7d32", x: 680 },
	];
	for (const m of metrics) {
		inner += box(m.x - 80, 185, 160, 85, "#0a0f1c", m.color, 6);
		m.label.split("\n").forEach((line, i) => {
			inner += txt(m.x, 213 + (i - 1) * 18, line, 10, TEXT, "middle");
		});
	}
	inner += txt(400, 175, "評価タイプ", 12, ACC1, "middle", "bold");
	inner += box(30, 290, 740, 55, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		313,
		"試験ポイント: モデルA vs Bの比較 → Bedrock Model Evaluation / シャドウデプロイで本番影響ゼロで評価",
		11,
		TEXT,
		"middle",
	);
	return svgWrap(inner, 360);
}

// SVG: Cost optimization strategies
function svgCostOptimization(): string {
	let inner = txt(
		400,
		30,
		"Bedrock コスト最適化戦略",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const strategies = [
		{
			title: "プロンプトキャッシュ",
			detail: "同一プレフィックスの再利用",
			saving: "最大 90%削減",
			color: "#2e7d32",
		},
		{
			title: "バッチ推論",
			detail: "非同期一括処理 (S3入出力)",
			saving: "最大 50%削減",
			color: "#1565c0",
		},
		{
			title: "Cross-Region\nInference",
			detail: "複数リージョンに自動分散",
			saving: "スロットリング回避",
			color: "#6a1b9a",
		},
		{
			title: "モデル選択最適化",
			detail: "タスク難易度に合わせたモデル",
			saving: "10x〜100x コスト差",
			color: "#e65100",
		},
		{
			title: "Top-K + Reranking",
			detail: "検索件数削減 + 精度維持",
			saving: "トークン数 60%削減",
			color: ACC2,
		},
		{
			title: "プロビジョンド\nスループット",
			detail: "6ヶ月コミットで割引",
			saving: "オンデマンド比 60%安",
			color: ACC1,
		},
	];
	strategies.forEach((s, i) => {
		const col = i % 3;
		const row = Math.floor(i / 3);
		const x = 50 + col * 245;
		const y = 60 + row * 120;
		inner += box(x, y, 220, 100, "#0d1b2a", s.color, 8);
		const titleLines = s.title.split("\n");
		titleLines.forEach((line, li) => {
			inner += txt(
				x + 110,
				y + 22 + li * 16,
				line,
				12,
				s.color === ACC1 ? "#111" : s.color,
				"middle",
				"bold",
			);
		});
		inner += txt(
			x + 110,
			y + 55 + (titleLines.length - 1) * 10,
			s.detail,
			10,
			TEXT,
			"middle",
		);
		inner += box(
			x + 10,
			y + 68 + (titleLines.length - 1) * 10,
			200,
			22,
			"#0a0f1c",
			s.color,
			4,
		);
		inner += txt(
			x + 110,
			y + 83 + (titleLines.length - 1) * 10,
			s.saving,
			11,
			s.color === ACC1 ? "#111" : s.color,
			"middle",
			"bold",
		);
	});
	return svgWrap(inner, 300);
}

// SVG: Multi-modal input processing
function svgMultiModal(): string {
	let inner = txt(
		400,
		30,
		"マルチモーダル入力処理",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const inputs = [
		{ label: "テキスト\n(JSON/Markdown)", color: "#1565c0", x: 100 },
		{ label: "画像\n(PNG/JPG/WebP)", color: "#6a1b9a", x: 240 },
		{ label: "PDF/Word\n(ドキュメント)", color: "#e65100", x: 380 },
		{ label: "動画\n(Nova Pro)", color: "#2e7d32", x: 520 },
		{ label: "音声\n(Nova Sonic)", color: "#795548", x: 660 },
	];
	for (const inp of inputs) {
		inner += box(inp.x - 60, 60, 120, 65, BOX, inp.color, 8);
		inp.label.split("\n").forEach((line, i) => {
			inner += txt(inp.x, 85 + (i - 0.5) * 18, line, 11, TEXT, "middle");
		});
		inner += arrow(inp.x, 125, 400, 175);
	}
	// Converse API
	inner += box(300, 175, 200, 60, "#0d1b2a", ACC1, 8);
	inner += txt(400, 200, "Converse API", 14, "#111", "middle", "bold");
	inner += txt(400, 218, "(統一インターフェース)", 11, "#333", "middle");
	// FM
	inner += box(200, 270, 400, 60, BOX, "#1565c0", 8);
	inner += txt(
		400,
		295,
		"Foundation Model (Claude / Nova / Llama etc.)",
		12,
		TEXT,
		"middle",
	);
	inner += txt(
		400,
		313,
		"マルチモーダル対応モデルが自動処理",
		10,
		"#aaaacc",
		"middle",
	);
	inner += arrow(400, 235, 400, 270);
	return svgWrap(inner, 355);
}

// SVG: Fine-tuning vs RAG decision tree
function svgFTvsRAG(): string {
	let inner = txt(
		400,
		30,
		"ファインチューニング vs RAG 判断フロー",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Start
	inner += `<diamond>`;
	inner += box(330, 58, 140, 50, "#0d1b2a", ACC1, 8);
	inner += txt(400, 87, "知識を更新したい?", 13, TEXT, "middle");
	// RAG path
	inner += arrow(400, 108, 250, 160);
	inner += txt(300, 147, "YES", 11, "#81c784", "middle");
	inner += box(160, 160, 180, 50, BOX, "#2e7d32", 8);
	inner += txt(250, 189, "RAG を推奨", 13, "#81c784", "middle", "bold");
	// No path
	inner += arrow(400, 108, 550, 160);
	inner += txt(500, 147, "NO", 11, "#ff8a65", "middle");
	inner += box(460, 160, 180, 50, "#0a0f1c", "#e65100", 8);
	inner += txt(550, 189, "出力スタイルを変えたい?", 11, TEXT, "middle");
	// FT path
	inner += arrow(550, 210, 550, 260);
	inner += txt(565, 240, "YES", 11, "#81c784", "middle");
	inner += box(460, 260, 180, 50, BOX, "#6a1b9a", 8);
	inner += txt(
		550,
		289,
		"ファインチューニング",
		12,
		"#ce93d8",
		"middle",
		"bold",
	);
	// Neither path
	inner += arrow(550, 210, 700, 260);
	inner += txt(660, 240, "NO", 11, "#ff8a65", "middle");
	inner += box(620, 260, 140, 50, "#0a0f1c", "#555577", 8);
	inner += txt(690, 289, "ベースモデル\nそのまま使用", 11, "#aaaacc", "middle");
	// RAG details
	inner += box(30, 245, 200, 110, "#0a0f1c", "#2e7d32", 6);
	inner += txt(130, 268, "RAGが適す場合", 12, "#81c784", "middle", "bold");
	inner += txt(130, 286, "• 社内文書・FAQ", 10, TEXT, "start");
	inner += txt(130, 302, "• 最新情報参照", 10, TEXT, "start");
	inner += txt(130, 318, "• 根拠提示が必要", 10, TEXT, "start");
	inner += txt(130, 334, "• データ量が少ない", 10, TEXT, "start");
	// FT details
	inner += box(400, 330, 200, 110, "#0a0f1c", "#6a1b9a", 6);
	inner += txt(500, 353, "FTが適す場合", 12, "#ce93d8", "middle", "bold");
	inner += txt(500, 371, "• 特定スタイル・文体", 10, TEXT, "start");
	inner += txt(500, 387, "• 専門用語習得", 10, TEXT, "start");
	inner += txt(500, 403, "• 大量ペアデータあり", 10, TEXT, "start");
	inner += txt(500, 419, "• (Claudeは FT非対応)", 10, "#ff8a80", "start");
	return svgWrap(inner, 460);
}

// SVG: RAG performance improvement flow
function svgRAGImprovement(): string {
	let inner = txt(400, 30, "RAG 品質改善ステップ", 18, ACC1, "middle", "bold");
	const steps = [
		{
			no: "1",
			title: "チャンク戦略改善",
			desc: "固定サイズ → セマンティック / 階層型",
			color: "#1565c0",
		},
		{
			no: "2",
			title: "ハイブリッド検索導入",
			desc: "Lexical (BM25) + Semantic を組み合わせ",
			color: "#6a1b9a",
		},
		{
			no: "3",
			title: "Reranking 追加",
			desc: "Top-20 → Rerank → Top-5 で精度向上",
			color: "#2e7d32",
		},
		{
			no: "4",
			title: "HyDE 適用",
			desc: "仮想ドキュメント生成でクエリEmbedding改善",
			color: "#e65100",
		},
		{
			no: "5",
			title: "Metadata Filtering",
			desc: "属性でチャンクを絞り込み精度向上",
			color: ACC1,
		},
	];
	for (let i = 0; i < steps.length; i++) {
		const s = steps[i];
		const y = 65 + i * 58;
		inner += `<circle cx="50" cy="${y + 20}" r="18" fill="${s.color}"/>`;
		inner += txt(
			50,
			y + 25,
			s.no,
			14,
			s.color === ACC1 ? "#111" : TEXT,
			"middle",
			"bold",
		);
		inner += box(80, y, 650, 40, "#0a0f1c", s.color, 6);
		inner += txt(
			100,
			y + 16,
			s.title,
			13,
			s.color === ACC1 ? "#111" : s.color,
			"start",
			"bold",
		);
		inner += txt(100, y + 32, s.desc, 11, "#aaaacc", "start");
		if (i < steps.length - 1) {
			inner += arrow(50, y + 38, 50, y + 58 - 2);
		}
	}
	inner += box(30, 360, 740, 45, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		381,
		"Faithfulness↓ → チャンク改善 / Answer Relevance↓ → Reranking / 全体遅い → Top-K削減",
		11,
		TEXT,
		"middle",
	);
	return svgWrap(inner, 420);
}

// SVG: IAM policy design
function svgIAMPolicy(): string {
	let inner = txt(
		400,
		30,
		"Bedrock IAM ポリシー設計",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Center: User/App
	inner += box(320, 60, 160, 50, BOX, "#555577", 8);
	inner += txt(400, 90, "App / Lambda", 13, TEXT, "middle");
	// Actions
	const actions = [
		{
			label: "bedrock:InvokeModel",
			desc: "InvokeModel API",
			color: "#1565c0",
			x: 100,
			y: 160,
		},
		{
			label: "bedrock:Converse",
			desc: "Converse API",
			color: "#1565c0",
			x: 280,
			y: 160,
		},
		{
			label: "bedrock:RetrieveAndGenerate",
			desc: "Knowledge Bases RAG",
			color: "#2e7d32",
			x: 480,
			y: 160,
		},
		{
			label: "bedrock:InvokeAgent",
			desc: "Agents 呼び出し",
			color: "#6a1b9a",
			x: 680,
			y: 160,
		},
	];
	for (const a of actions) {
		inner += box(a.x - 80, a.y, 160, 65, "#0d1b2a", a.color, 6);
		inner += txt(a.x, a.y + 20, a.label, 9, a.color, "middle", "bold");
		inner += txt(a.x, a.y + 38, a.desc, 10, TEXT, "middle");
		inner += arrow(400, 110, a.x, a.y);
	}
	// Resource conditions
	inner += box(30, 255, 740, 90, "#0a0f1c", "#e65100", 6);
	inner += txt(
		400,
		278,
		"リソースレベル制御 (特定モデルのみ許可)",
		13,
		"#ff8a65",
		"middle",
		"bold",
	);
	inner += txt(
		400,
		298,
		`"Resource": "arn:aws:bedrock:region::foundation-model/anthropic.claude-3-5-sonnet*"`,
		10,
		"#aaaacc",
		"middle",
	);
	inner += txt(
		400,
		318,
		"条件キー: bedrock:ModelId / bedrock:InferenceProfileArn で特定モデルに限定可能",
		11,
		TEXT,
		"middle",
	);
	inner += txt(
		400,
		338,
		"SCP: 組織単位で利用モデル・リージョンを制限",
		11,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 370);
}

// SVG: Responsible AI principles
function svgResponsibleAI(): string {
	let inner = txt(400, 30, "責任ある AI の 6 原則", 18, ACC1, "middle", "bold");
	const principles = [
		{
			title: "公平性",
			desc: "バイアス検出・属性グループ別評価",
			icon: "⚖",
			color: "#1565c0",
		},
		{
			title: "説明可能性",
			desc: "意思決定プロセスを透明化",
			icon: "🔍",
			color: "#6a1b9a",
		},
		{
			title: "プライバシー",
			desc: "PII保護・ゼロデータリテンション",
			icon: "🔒",
			color: "#2e7d32",
		},
		{
			title: "堅牢性",
			desc: "攻撃・敵対的入力への耐性",
			icon: "🛡",
			color: "#e65100",
		},
		{
			title: "透明性",
			desc: "AI使用の開示・AI Service Cards",
			icon: "📋",
			color: ACC2,
		},
		{
			title: "ガバナンス",
			desc: "監査ログ・IAM最小権限・SCP",
			icon: "⚙",
			color: ACC1,
		},
	];
	principles.forEach((p, i) => {
		const col = i % 3;
		const row = Math.floor(i / 3);
		const x = 70 + col * 245;
		const y = 65 + row * 120;
		inner += box(x, y, 210, 100, "#0d1b2a", p.color, 8);
		inner += txt(
			x + 105,
			y + 30,
			p.title,
			15,
			p.color === ACC1 ? "#111" : p.color,
			"middle",
			"bold",
		);
		inner += txt(x + 105, y + 55, p.desc, 10, TEXT, "middle");
		inner += txt(
			x + 105,
			y + 78,
			p.icon,
			18,
			p.color === ACC1 ? "#111" : p.color,
			"middle",
		);
	});
	return svgWrap(inner, 305);
}

// SVG: Session management and memory
function svgSessionMemory(): string {
	let inner = txt(
		400,
		30,
		"セッション管理とメモリ",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Session 1
	inner += box(30, 60, 340, 110, "#0a0f1c", "#1565c0", 8);
	inner += txt(
		200,
		82,
		"セッション内 (同一 sessionId)",
		12,
		"#90caf9",
		"middle",
		"bold",
	);
	inner += txt(
		200,
		102,
		"sessionAttributes: Key-Value データ引き継ぎ",
		10,
		TEXT,
		"middle",
	);
	inner += txt(
		200,
		120,
		"promptSessionAttributes: ターン間変数",
		10,
		"#aaaacc",
		"middle",
	);
	inner += txt(
		200,
		138,
		"会話履歴は自動管理 (コンテキストウィンドウ内)",
		10,
		"#aaaacc",
		"middle",
	);
	inner += txt(
		200,
		156,
		"→ チャットボット・カスタマーサポートに最適",
		10,
		"#90caf9",
		"middle",
	);
	// Memory
	inner += box(430, 60, 340, 110, "#0a0f1c", "#6a1b9a", 8);
	inner += txt(
		600,
		82,
		"セッション間 (Memory機能)",
		12,
		"#ce93d8",
		"middle",
		"bold",
	);
	inner += txt(
		600,
		102,
		"memoryId: ユーザー識別子として機能",
		10,
		TEXT,
		"middle",
	);
	inner += txt(600, 120, "過去会話の要約を長期保存", 10, "#aaaacc", "middle");
	inner += txt(
		600,
		138,
		"次セッションで自動的にコンテキスト復元",
		10,
		"#aaaacc",
		"middle",
	);
	inner += txt(
		600,
		156,
		"→ 継続的なパーソナライズ体験に最適",
		10,
		"#ce93d8",
		"middle",
	);
	// Flow diagram
	inner += box(30, 190, 340, 80, "#0d1b2a", "#1565c0", 6);
	inner += txt(200, 215, "Session A → Turn 1,2,3...N", 11, TEXT, "middle");
	inner += txt(
		200,
		235,
		"sessionId: user-123-session-abc",
		10,
		"#90caf9",
		"middle",
	);
	inner += txt(200, 253, "終了後データは破棄", 10, "#888899", "middle");
	inner += box(430, 190, 340, 80, "#0d1b2a", "#6a1b9a", 6);
	inner += txt(600, 215, "Session A → Summary saved", 11, TEXT, "middle");
	inner += txt(600, 235, "Session B → 過去記憶を参照", 11, "#ce93d8", "middle");
	inner += txt(600, 253, "memoryId: user-123 (永続)", 10, "#888899", "middle");
	inner += arrow(200, 270, 200, 285);
	inner += arrow(600, 270, 600, 285);
	inner += box(30, 285, 740, 50, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		308,
		"試験ポイント: 複数セッションにまたがるユーザー記憶が必要 → Memory機能 (memoryId)",
		12,
		TEXT,
		"middle",
	);
	return svgWrap(inner, 350);
}

// SVG: LLM-as-judge evaluation
function svgLLMAsJudge(): string {
	let inner = txt(
		400,
		30,
		"LLM-as-Judge 評価パターン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const stages = [
		{ label: "評価データ\n(Question +\nRef Answer)", color: "#555577", x: 80 },
		{ label: "テスト\nモデル実行\n(回答生成)", color: "#1565c0", x: 250 },
		{ label: "Judge LLM\n(Claude etc.)\n品質評価", color: "#6a1b9a", x: 430 },
		{ label: "スコア\n集計・レポート", color: ACC1, x: 610 },
	];
	for (const s of stages) {
		inner += box(s.x - 60, 58, 120, 95, BOX, s.color, 8);
		s.label.split("\n").forEach((line, i) => {
			inner += txt(
				s.x,
				98 + (i - 1) * 18,
				line,
				10,
				s.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	for (let i = 0; i < stages.length - 1; i++) {
		inner += arrow(stages[i].x + 60, 105, stages[i + 1].x - 60, 105);
	}
	// Metrics
	const metrics = [
		{
			name: "Faithfulness",
			desc: "回答がコンテキストに基づく度合い (ハルシネ検出)",
			color: "#2e7d32",
		},
		{
			name: "Answer Relevance",
			desc: "回答が質問に対応している度合い",
			color: "#1565c0",
		},
		{
			name: "Correctness",
			desc: "参照回答との一致度 (事実精度)",
			color: "#6a1b9a",
		},
	];
	metrics.forEach((m, i) => {
		inner += box(30, 185 + i * 58, 740, 48, "#0d1b2a", m.color, 6);
		inner += txt(120, 213 + i * 58, m.name, 13, m.color, "middle", "bold");
		inner += txt(480, 213 + i * 58, m.desc, 11, TEXT, "middle");
	});
	inner += txt(50, 178, "評価指標", 12, ACC1, "start", "bold");
	return svgWrap(inner, 365);
}

// SVG: Inline Agents and Flows architecture
function svgFlowsArchitecture(): string {
	let inner = txt(
		400,
		30,
		"Bedrock Flows — ノードグラフ構造",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Node types
	const nodes = [
		{ label: "Input\nNode", color: "#2e7d32", x: 100, y: 100 },
		{ label: "Condition\nNode", color: "#e65100", x: 250, y: 100 },
		{ label: "Knowledge\nBase Node", color: "#1565c0", x: 400, y: 60 },
		{ label: "Lambda\nNode", color: "#6a1b9a", x: 400, y: 160 },
		{ label: "Prompt\nNode (LLM)", color: ACC2, x: 560, y: 100 },
		{ label: "Output\nNode", color: "#2e7d32", x: 710, y: 100 },
	];
	for (const n of nodes) {
		inner += box(n.x - 55, n.y - 30, 110, 60, BOX, n.color, 8);
		n.label.split("\n").forEach((line, i) => {
			inner += txt(
				n.x,
				n.y - 5 + i * 16,
				line,
				11,
				n.color === ACC1 ? "#111" : TEXT,
				"middle",
			);
		});
	}
	inner += arrow(155, 100, 195, 100);
	inner += arrow(305, 80, 345, 68, "#1565c0");
	inner += arrow(305, 120, 345, 152, "#6a1b9a");
	inner += arrow(455, 68, 505, 90, ACC2);
	inner += arrow(455, 152, 505, 112, ACC2);
	inner += arrow(615, 100, 655, 100);
	// Iterator/Collector
	inner += box(200, 215, 400, 70, "#0d1b2a", ACC1, 6);
	inner += txt(
		400,
		243,
		"Iterator / Collector パターン",
		12,
		"#111",
		"middle",
		"bold",
	);
	inner += txt(
		400,
		263,
		"リスト入力を並列ノードで処理 → 結果を Collector で集約",
		11,
		"#333",
		"middle",
	);
	// Notes
	inner += box(30, 305, 740, 60, "#0a0f1c", "#333366", 6);
	inner += txt(
		400,
		327,
		"GUI: Bedrock Studio の Flows UI で視覚的設計 / バージョン管理でBlue/Greenデプロイ",
		11,
		TEXT,
		"middle",
	);
	inner += txt(
		400,
		347,
		"試験: 条件分岐 + KB + Lambda を組み合わせたワークフロー → Flows が最適",
		11,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 380);
}

// Map slides to SVG generators
interface Slide {
	title: string;
	content: string[];
	code?: string;
	codeLanguage?: string;
	layout?: string;
	speakerNotes?: string;
}

const data = JSON.parse(readFileSync(SLIDES_PATH, "utf-8")) as {
	slides: Slide[];
};
const slides = data.slides;

const svgMap: Record<string, () => string> = {
	"Amazon Bedrock とは": svgBedrockInvocation,
	"InvokeModel API — 詳細": svgBedrockInvocation,
	"Converse API — 詳細": svgBedrockInvocation,
	"モデル選定の判断フレームワーク（1/2）": svgFTvsRAG,
	"モデル選定の判断フレームワーク（2/2）": svgFTvsRAG,
	"プロビジョンドスループット vs オンデマンド": svgCostOptimization,
	ファインチューニング概要: svgFTvsRAG,
	"ファインチューニング データ要件": svgFTvsRAG,
	"Inference Profiles": svgBedrockInvocation,
	"Amazon Bedrock Marketplace": svgBedrockInvocation,
	モデル呼び出しログと監視: svgModelEvaluation,
	"Bedrock + SageMaker 連携パターン（1/2）": svgBedrockInvocation,
	"Bedrock + SageMaker 連携パターン（2/2）": svgBedrockInvocation,
	"Amazon Bedrock Studio": svgBedrockInvocation,
	"Part 1: 試験ポイントまとめ": svgCostOptimization,
	"Part 1: よくある落とし穴": svgFTvsRAG,
	"Part 1: 重要キーワード一覧": svgBedrockInvocation,
	RAGの基本概念: svgKnowledgeBase,
	"Amazon Bedrock Knowledge Bases 概要": svgKnowledgeBase,
	データソース種別と特性: svgKnowledgeBase,
	ドキュメント取り込みパイプライン: svgKnowledgeBase,
	"OpenSearch Serverless — 詳細": svgKnowledgeBase,
	チャンク戦略概要: svgRAGImprovement,
	セマンティックチャンキング詳細: svgRAGImprovement,
	Embeddingモデル選択: svgKnowledgeBase,
	"Metadata Filtering": svgRAGImprovement,
	"Faithfulness と Answer Relevance": svgLLMAsJudge,
	"RAG vs ファインチューニング 詳細比較": svgFTvsRAG,
	コスト・レイテンシ最適化: svgCostOptimization,
	RAGのよくある落とし穴: svgRAGImprovement,
	"Part 2: 試験ポイントまとめ": svgRAGImprovement,
	"Part 2: よくある問題パターン（1/2）": svgRAGImprovement,
	"Part 2: よくある問題パターン（2/2）": svgRAGImprovement,
	"Bedrock Agents 概要": svgAgentsToolUse,
	"Action Groups 概要": svgAgentsToolUse,
	セッション管理とメモリ: svgSessionMemory,
	マルチエージェント概要: svgAgentsToolUse,
	"Sub-Agent 設計原則": svgAgentsToolUse,
	"Inline Agents": svgFlowsArchitecture,
	"Bedrock Flows 概要": svgFlowsArchitecture,
	"Prompt Management": svgFlowsArchitecture,
	"Prompt Versioning フロー": svgFlowsArchitecture,
	"EventBridge 連携": svgBedrockInvocation,
	デバッグとトレーシング: svgModelEvaluation,
	エージェントのコスト管理: svgCostOptimization,
	"LangChain / LlamaIndex との連携": svgBedrockInvocation,
	エージェント設計のベストプラクティス: svgAgentsToolUse,
	エージェントのエラー処理: svgAgentsToolUse,
	"Part 3: 試験ポイントまとめ": svgAgentsToolUse,
	"Part 3: よくある問題パターン（1/2）": svgAgentsToolUse,
	"Part 3: よくある問題パターン（2/2）": svgAgentsToolUse,
	"Amazon Bedrock Guardrails 概要": svgGuardrailsPipeline,
	コンテンツフィルタリング設定: svgGuardrailsPipeline,
	"拒否トピック (Denied Topics)": svgGuardrailsPipeline,
	"PII マスキング": svgGuardrailsPipeline,
	グラウンディングチェック: svgGuardrailsPipeline,
	"Amazon Bedrock Evaluation": svgModelEvaluation,
	"Bedrock Evaluation フロー": svgModelEvaluation,
	"A/Bテストとシャドウデプロイ": svgModelEvaluation,
	バイアスと公平性: svgResponsibleAI,
	透明性と説明可能性: svgResponsibleAI,
	"IAM ポリシー設計": svgIAMPolicy,
	ゼロデータリテンション: svgIAMPolicy,
	"Part 4: 試験ポイントまとめ": svgGuardrailsPipeline,
	試験対策チェックリスト: svgCostOptimization,
};

let injected = 0;
for (const slide of slides) {
	// Skip slides that already have SVG or asset refs
	if (slide.content.some((c) => c.startsWith("<svg") || c.startsWith("![")))
		continue;
	// Skip code-only slides
	if (slide.code && slide.content.length === 0) continue;
	// Skip section slides
	if (slide.layout === "section") continue;

	const svgGen = svgMap[slide.title];
	if (svgGen) {
		slide.content = [svgGen(), ...slide.content];
		injected++;
	}
}

console.log(`Injected SVGs into ${injected} slides`);
console.log(`Total slides: ${slides.length}`);
const withSvg = slides.filter((s) =>
	s.content.some((c) => c.startsWith("<svg") || c.startsWith("![")),
).length;
console.log(
	`Slides with SVG: ${withSvg} (${Math.round((withSvg * 100) / slides.length)}%)`,
);

writeFileSync(SLIDES_PATH, JSON.stringify(data, null, "\t"));
console.log("Done! Written to slides-data.json");
