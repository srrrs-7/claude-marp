#!/usr/bin/env bun
/**
 * Inject inline SVGs into Lambda Serverless presentation slides
 * Target: ≥51 slides with SVG out of 102 total
 */

import { readFileSync, writeFileSync } from "node:fs";

const SLIDES_PATH =
	"/workspace/main/docs/20260219200000_aws-lambda-serverless-deep-dive/slides-data.json";

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TEXT = "#ffffff";
const SVG_STYLE =
	'style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"';

function svgWrap(inner: string, h = 400): string {
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

function text(
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

// SVG 1: Lambda execution flow
function svgLambdaExecFlow(): string {
	const steps = [
		{ label: "Trigger", sub: "(API GW / SQS / S3)", x: 60 },
		{ label: "Cold Start", sub: "(Init Phase)", x: 220 },
		{ label: "Handler", sub: "(Invoke Phase)", x: 420 },
		{ label: "Response", sub: "(Return)", x: 620 },
	];
	let inner = text(400, 38, "Lambda 実行フロー", 20, ACC1, "middle", "bold");
	for (const s of steps) {
		inner += box(s.x - 50, 70, 140, 70, BOX, ACC1);
		inner += text(s.x + 20, 108, s.label, 15, TEXT, "middle", "bold");
		inner += text(s.x + 20, 126, s.sub, 11, "#aaaacc", "middle");
	}
	for (let i = 0; i < steps.length - 1; i++) {
		inner += arrow(steps[i].x + 70, 105, steps[i + 1].x - 50, 105);
	}
	// Warm path
	inner += box(170, 180, 480, 60, "#0d1b2a", ACC2, 8);
	inner += text(
		410,
		210,
		"ウォームスタート: Init をスキップ → Handler へ直接",
		13,
		ACC2,
		"middle",
	);
	inner += text(
		410,
		228,
		"コンテナ再利用 → グローバル変数・DB接続が保持される",
		12,
		"#ccccdd",
		"middle",
	);
	// Labels
	inner += box(30, 280, 740, 90, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		305,
		"Init フェーズ (コールドスタート時のみ)",
		13,
		ACC1,
		"middle",
		"bold",
	);
	inner += text(
		400,
		325,
		"Extension init → Runtime init → Function init (import / DB接続 / 設定読み込み)",
		12,
		TEXT,
		"middle",
	);
	inner += text(
		400,
		348,
		"コールドスタート: 数百ms〜数秒 | ウォームスタート: 数ms〜数十ms",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 400);
}

// SVG 2: Cold start vs warm start timeline
function svgColdVsWarm(): string {
	let inner = text(
		400,
		35,
		"コールドスタート vs ウォームスタート タイムライン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Cold start bar
	inner += text(20, 80, "コールド", 13, TEXT, "start");
	const coldParts = [
		{ w: 80, label: "MicroVM", color: "#3949ab" },
		{ w: 120, label: "Runtime Init", color: "#1565c0" },
		{ w: 100, label: "Func Init", color: "#0277bd" },
		{ w: 200, label: "Handler実行", color: ACC1 },
	];
	let cx = 110;
	const barY = 58;
	for (const p of coldParts) {
		inner += `<rect x="${cx}" y="${barY}" width="${p.w}" height="34" fill="${p.color}" rx="4"/>`;
		inner += text(cx + p.w / 2, barY + 21, p.label, 10, TEXT, "middle");
		cx += p.w + 2;
	}
	inner += `<text x="${cx + 10}" y="${barY + 22}" font-family="sans-serif" font-size="13" fill="#e57373">〜1–3秒</text>`;
	// Warm start bar
	inner += text(20, 150, "ウォーム", 13, TEXT, "start");
	inner += `<rect x="110" y="128" width="200" height="34" fill="${ACC1}" rx="4"/>`;
	inner += text(210, 149, "Handler実行のみ", 12, "#111", "middle", "bold");
	inner += `<text x="320" y="150" font-family="sans-serif" font-size="13" fill="#81c784">〜数十ms</text>`;
	// Legend
	inner += box(110, 200, 580, 100, "#0a0f1c", "#333366", 6);
	inner += text(400, 225, "コールドスタート軽減策", 14, ACC1, "middle", "bold");
	const tips = [
		"SnapStart (Java/.NET) → Init をスキップ",
		"Provisioned Concurrency → 常時ウォーム確保",
		"軽量ランタイム (Python/Go/Rust) → Init 短縮",
		"バンドル最小化 → 初期化コード削減",
	];
	tips.forEach((t, i) => {
		inner += text(130, 246 + i * 18, `• ${t}`, 12, TEXT, "start");
	});
	return svgWrap(inner, 320);
}

// SVG 3: Event source mapping types
function svgEventSources(): string {
	let inner = text(
		400,
		35,
		"Lambda イベントソース種別",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const cols = [
		{
			title: "同期 (Request-Response)",
			items: ["API Gateway", "ALB", "Lambda URL", "Cognito Triggers"],
			color: "#1565c0",
			x: 70,
		},
		{
			title: "非同期 (Event)",
			items: ["S3", "SNS", "EventBridge", "SES"],
			color: "#6a1b9a",
			x: 300,
		},
		{
			title: "ポーリング (Stream)",
			items: ["SQS", "Kinesis", "DynamoDB Streams", "MSK (Kafka)"],
			color: "#2e7d32",
			x: 530,
		},
	];
	for (const col of cols) {
		inner += box(col.x, 55, 190, 220, BOX, col.color, 8);
		inner += text(col.x + 95, 80, col.title, 11, col.color, "middle", "bold");
		col.items.forEach((item, i) => {
			inner += box(col.x + 15, 95 + i * 44, 160, 34, "#0d1b2a", col.color, 5);
			inner += text(col.x + 95, 117 + i * 44, item, 13, TEXT, "middle");
		});
	}
	inner += box(50, 295, 700, 60, "#0a0f1c", "#555577", 6);
	inner += text(
		400,
		318,
		"ポーリング: Lambda側が自動ポーリング → バッチ処理",
		12,
		"#ccccdd",
		"middle",
	);
	inner += text(
		400,
		338,
		"非同期: 内部キューでバッファリング → 失敗時は最大2回リトライ + DLQ",
		12,
		"#ccccdd",
		"middle",
	);
	return svgWrap(inner, 375);
}

// SVG 4: Lambda with VPC architecture
function svgVPCArchitecture(): string {
	let inner = text(
		400,
		30,
		"Lambda VPC アーキテクチャ",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// VPC box
	inner += `<rect x="40" y="50" width="720" height="300" fill="none" stroke="#555577" stroke-width="2" stroke-dasharray="8,4" rx="12"/>`;
	inner += text(400, 72, "VPC", 12, "#888899", "middle");
	// Private subnet
	inner += `<rect x="60" y="85" width="300" height="240" fill="#0a0f1c" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3" rx="8"/>`;
	inner += text(210, 105, "Private Subnet", 11, "#1565c0", "middle");
	inner += box(80, 115, 120, 44, BOX, ACC1, 6);
	inner += text(140, 141, "Lambda", 13, ACC1, "middle", "bold");
	inner += box(80, 185, 120, 44, BOX, "#2e7d32", 6);
	inner += text(140, 211, "RDS / ElastiCache", 11, "#81c784", "middle");
	inner += arrow(200, 137, 200, 185);
	// VPC Endpoint
	inner += box(230, 115, 120, 44, BOX, "#6a1b9a", 6);
	inner += text(290, 141, "VPC Endpoint", 12, "#ce93d8", "middle");
	inner += arrow(200, 137, 230, 137, "#ce93d8");
	// NAT Gateway
	inner += box(430, 115, 120, 44, BOX, "#e65100", 6);
	inner += text(490, 141, "NAT Gateway", 12, "#ff8a65", "middle");
	inner += box(430, 185, 120, 44, BOX, "#e65100", 6);
	inner += text(490, 211, "Internet Gateway", 11, "#ff8a65", "middle");
	inner += arrow(490, 159, 490, 185);
	inner += box(600, 115, 140, 44, BOX, "#555577", 6);
	inner += text(670, 141, "AWS Services", 12, TEXT, "middle");
	inner += arrow(230, 137, 430, 137, "#ce93d8");
	inner += arrow(550, 137, 600, 137, "#ff8a65");
	// Note
	inner += box(40, 305, 720, 50, "#0a0f1c", "#444466", 6);
	inner += text(
		400,
		328,
		"2019年以降 ENI 割り当て改善 → コールドスタート遅延は大幅改善済み",
		12,
		"#aaaacc",
		"middle",
	);
	inner += text(
		400,
		346,
		"VPC外サービス (DynamoDB/S3) は VPC Endpoint で最適化",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 370);
}

// SVG 5: Serverless application pattern (API GW → Lambda → DynamoDB)
function svgServerlessPattern(): string {
	let inner = text(
		400,
		30,
		"サーバーレス Web API パターン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const items = [
		{ label: "Client", x: 60, color: "#555577" },
		{ label: "API Gateway\n(HTTP API)", x: 200, color: "#1565c0" },
		{ label: "Lambda\n(Handler)", x: 370, color: ACC1 },
		{ label: "DynamoDB", x: 540, color: "#2e7d32" },
		{ label: "S3 / Cache", x: 700, color: "#6a1b9a" },
	];
	const y = 140;
	for (const item of items) {
		inner += box(item.x - 55, y - 40, 110, 80, BOX, item.color, 8);
		const lines = item.label.split("\n");
		lines.forEach((line, i) => {
			inner += text(
				item.x,
				y - 8 + i * 18,
				line,
				13,
				item.color === ACC1 ? "#111" : TEXT,
				"middle",
				"bold",
			);
		});
	}
	for (let i = 0; i < items.length - 1; i++) {
		inner += arrow(items[i].x + 55, y, items[i + 1].x - 55, y);
	}
	// Return path
	inner += `<path d="M 645 190 Q 400 240 145 190" stroke="${ACC2}" stroke-width="2" fill="none" stroke-dasharray="6,3"/>`;
	inner += text(400, 258, "← Response", 11, ACC2, "middle");
	// Annotations
	inner += box(50, 280, 700, 80, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		305,
		"HTTP API: REST APIより最大70%低コスト / 低レイテンシ",
		12,
		TEXT,
		"middle",
	);
	inner += text(
		400,
		325,
		"Lambda URL: API GWなしで直接HTTPSエンドポイントを公開",
		12,
		"#aaaacc",
		"middle",
	);
	inner += text(
		400,
		345,
		"Lambda Authorizer: JWTトークン検証・カスタム認可を実装",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 380);
}

// SVG 6: Lambda Layers architecture
function svgLambdaLayers(): string {
	let inner = text(
		400,
		30,
		"Lambda Layers アーキテクチャ",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Function boxes
	const funcs = ["注文処理\n関数", "通知\n関数", "集計\n関数"];
	funcs.forEach((f, i) => {
		const fx = 60 + i * 220;
		inner += box(fx, 60, 180, 70, BOX, ACC1, 8);
		const lines = f.split("\n");
		lines.forEach(
			(line, li) =>
				(inner += text(
					fx + 90,
					90 + li * 18,
					line,
					14,
					TEXT,
					"middle",
					"bold",
				)),
		);
	});
	// Shared layer
	inner += box(40, 165, 720, 80, "#0d1b2a", ACC2, 8);
	inner += text(
		400,
		200,
		"Layer 1: 共通ライブラリ (AWS SDK, boto3, requests…)",
		14,
		ACC2,
		"middle",
		"bold",
	);
	inner += text(
		400,
		220,
		"複数関数で共有 / デプロイサイズ削減 / 最大 5 レイヤーまで付与可能",
		12,
		"#ccccdd",
		"middle",
	);
	// Second layer
	inner += box(40, 260, 720, 60, "#0a0f1c", "#1565c0", 8);
	inner += text(
		400,
		290,
		"Layer 2: ML モデル / カスタムランタイム / Lambda Extensions",
		13,
		"#90caf9",
		"middle",
	);
	inner += text(
		400,
		310,
		"ZIP展開後合計 250MB 上限 (コンテナなら 10GB)",
		12,
		"#888899",
		"middle",
	);
	// Arrows
	funcs.forEach((_, i) => {
		const fx = 60 + i * 220 + 90;
		inner += arrow(fx, 130, fx, 165);
	});
	return svgWrap(inner, 355);
}

// SVG 7: Step Functions state machine
function svgStepFunctions(): string {
	let inner = text(
		400,
		30,
		"Step Functions ステートマシン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const states = [
		{ label: "Start", x: 400, y: 75, color: "#2e7d32", shape: "circle" },
		{ label: "ValidateOrder", x: 400, y: 145, color: "#1565c0", shape: "rect" },
		{ label: "CheckStock", x: 250, y: 220, color: "#1565c0", shape: "rect" },
		{
			label: "ProcessPayment",
			x: 550,
			y: 220,
			color: "#1565c0",
			shape: "rect",
		},
		{
			label: "SendNotification",
			x: 400,
			y: 295,
			color: "#6a1b9a",
			shape: "rect",
		},
		{ label: "End", x: 400, y: 360, color: "#e65100", shape: "circle" },
	];
	for (const s of states) {
		if (s.shape === "circle") {
			inner += `<circle cx="${s.x}" cy="${s.y}" r="22" fill="${s.color}" stroke="${ACC1}" stroke-width="1.5"/>`;
			inner += text(s.x, s.y + 5, s.label, 10, TEXT, "middle", "bold");
		} else {
			inner += box(s.x - 75, s.y - 20, 150, 40, BOX, s.color, 6);
			inner += text(s.x, s.y + 5, s.label, 12, TEXT, "middle");
		}
	}
	// Arrows
	inner += arrow(400, 97, 400, 125);
	inner += arrow(400, 165, 250, 200);
	inner += arrow(400, 165, 550, 200);
	inner += arrow(250, 240, 400, 275);
	inner += arrow(550, 240, 400, 275);
	inner += arrow(400, 315, 400, 338);
	// Labels
	inner += text(310, 200, "在庫あり", 10, "#aaaacc", "middle");
	inner += text(510, 200, "在庫なし", 10, "#aaaacc", "middle");
	// Side note
	inner += box(550, 130, 200, 70, "#0a0f1c", "#444466", 6);
	inner += text(650, 155, "Standard Workflow", 11, ACC1, "middle", "bold");
	inner += text(650, 172, "最大1年 / Exactly-Once", 10, TEXT, "middle");
	inner += text(650, 188, "Retry / Catch 内蔵", 10, TEXT, "middle");
	return svgWrap(inner, 400);
}

// SVG 8: SAM/CDK deployment pipeline
function svgDeployPipeline(): string {
	let inner = text(
		400,
		30,
		"SAM / CDK CI/CD デプロイパイプライン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const stages = [
		{ label: "Code Push\n(Git)", color: "#555577", x: 60 },
		{ label: "CodeBuild\n(Test+Build)", color: "#1565c0", x: 210 },
		{ label: "SAM Package\n/ CDK Synth", color: "#6a1b9a", x: 380 },
		{ label: "Canary\nDeploy 10%", color: "#e65100", x: 545 },
		{ label: "Production\n100%", color: "#2e7d32", x: 700 },
	];
	const y = 130;
	for (const s of stages) {
		inner += box(s.x - 55, y - 45, 110, 90, BOX, s.color, 8);
		const lines = s.label.split("\n");
		lines.forEach((line, i) => {
			inner += text(s.x, y - 12 + i * 20, line, 12, TEXT, "middle");
		});
	}
	for (let i = 0; i < stages.length - 1; i++) {
		inner += arrow(stages[i].x + 55, y, stages[i + 1].x - 55, y);
	}
	// Alarm check
	inner += box(490, 240, 180, 60, "#0d1b2a", ACC2, 6);
	inner += text(580, 265, "CloudWatch Alarm", 12, ACC2, "middle", "bold");
	inner += text(
		580,
		283,
		"エラー率監視 → 自動ロールバック",
		10,
		"#ccccdd",
		"middle",
	);
	inner += arrow(580, 175, 580, 240, ACC2);
	// Pre/Post hooks
	inner += box(40, 240, 200, 60, "#0a0f1c", "#1565c0", 6);
	inner += text(140, 265, "Pre/Post Traffic", 12, "#90caf9", "middle", "bold");
	inner += text(140, 283, "Hooks: テスト Lambda", 10, "#aaaacc", "middle");
	inner += arrow(490, 265, 250, 265, "#90caf9");
	inner += box(40, 315, 720, 50, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		340,
		"DeploymentPreference: Canary10Percent5Minutes / Linear10PercentEvery1Minute",
		12,
		TEXT,
		"middle",
	);
	return svgWrap(inner, 385);
}

// SVG 9: SQS + Lambda pattern
function svgSQSPattern(): string {
	let inner = text(
		400,
		30,
		"SQS + Lambda イベント駆動パターン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const items = [
		{ label: "Producer\n(API / S3 etc)", x: 80, color: "#555577" },
		{ label: "SQS Queue\n(Standard/FIFO)", x: 260, color: "#1565c0" },
		{ label: "Lambda\nConsumer", x: 460, color: ACC1 },
		{ label: "DynamoDB /\nRDS / etc", x: 660, color: "#2e7d32" },
	];
	const y = 130;
	for (const item of items) {
		inner += box(item.x - 70, y - 45, 140, 90, BOX, item.color, 8);
		item.label.split("\n").forEach((line, i) => {
			inner += text(
				item.x,
				y - 12 + i * 20,
				line,
				12,
				item.color === ACC1 ? "#111" : TEXT,
				"middle",
				"bold",
			);
		});
	}
	for (let i = 0; i < items.length - 1; i++) {
		inner += arrow(items[i].x + 70, y, items[i + 1].x - 70, y);
	}
	// DLQ
	inner += box(180, 235, 160, 60, "#0d1b2a", ACC2, 6);
	inner += text(260, 260, "Dead Letter Queue", 12, ACC2, "middle", "bold");
	inner += text(260, 278, "処理失敗メッセージを退避", 10, "#ccccdd", "middle");
	inner += arrow(260, 175, 260, 235, ACC2);
	// Batch window
	inner += box(390, 235, 180, 60, "#0a0f1c", "#1565c0", 6);
	inner += text(480, 260, "Batch Window", 12, "#90caf9", "middle", "bold");
	inner += text(
		480,
		278,
		"最大 300秒 / 最大 10,000件",
		10,
		"#aaaacc",
		"middle",
	);
	inner += arrow(460, 175, 460, 235, "#90caf9");
	inner += box(40, 310, 720, 55, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		332,
		"batchItemFailures: 個別メッセージの成功/失敗を報告可能",
		12,
		TEXT,
		"middle",
	);
	inner += text(
		400,
		350,
		"SQS FIFO: Exactly-Once 処理 + 順序保証 (300 TPS 上限)",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 380);
}

// SVG 10: Concurrency model
function svgConcurrencyModel(): string {
	let inner = text(
		400,
		30,
		"Lambda 同時実行数モデル",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Account limit bar
	inner += box(40, 60, 720, 50, "#0a0f1c", "#444466", 6);
	inner += text(
		400,
		82,
		"アカウント同時実行上限: 1,000 (デフォルト) — 増枠申請可",
		13,
		TEXT,
		"middle",
	);
	inner += text(400, 98, "← リージョン単位", 11, "#888899", "middle");
	// Reserved
	inner += `<rect x="50" y="130" width="220" height="120" fill="#1a237e" stroke="#3949ab" stroke-width="2" rx="8"/>`;
	inner += text(160, 155, "Reserved", 13, "#7986cb", "middle", "bold");
	inner += text(160, 175, "Concurrency", 13, "#7986cb", "middle", "bold");
	inner += text(160, 200, "重要関数の下限確保", 11, "#aaaacc", "middle");
	inner += text(160, 218, "他関数から隔離", 11, "#aaaacc", "middle");
	inner += text(160, 236, "上限制限にも使用可", 11, "#aaaacc", "middle");
	// Provisioned
	inner += `<rect x="290" y="130" width="220" height="120" fill="#0d47a1" stroke="#1565c0" stroke-width="2" rx="8"/>`;
	inner += text(400, 155, "Provisioned", 13, "#90caf9", "middle", "bold");
	inner += text(400, 175, "Concurrency", 13, "#90caf9", "middle", "bold");
	inner += text(400, 200, "常時ウォーム確保", 11, "#aaaacc", "middle");
	inner += text(400, 218, "コールドスタートほぼゼロ", 11, "#aaaacc", "middle");
	inner += text(400, 236, "追加コストあり", 11, "#aaaacc", "middle");
	// Unreserved
	inner += `<rect x="530" y="130" width="220" height="120" fill="#1b5e20" stroke="#2e7d32" stroke-width="2" rx="8"/>`;
	inner += text(640, 165, "Unreserved", 13, "#81c784", "middle", "bold");
	inner += text(640, 195, "残りの同時実行枠", 11, "#aaaacc", "middle");
	inner += text(640, 215, "共有プール", 11, "#aaaacc", "middle");
	inner += text(640, 235, "スロットリングあり", 11, "#aaaacc", "middle");
	inner += box(40, 270, 720, 55, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		295,
		"バースト制限: 最初の1分 +500〜3,000インスタンス/分 (リージョン依存)",
		12,
		TEXT,
		"middle",
	);
	inner += text(
		400,
		313,
		"スロットリング時: 同期→ HTTP 429 / 非同期→ リトライキュー",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 345);
}

// SVG 11: Observability three pillars
function svgObservability(): string {
	let inner = text(
		400,
		30,
		"サーバーレスオブザーバビリティ 3本柱",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const pillars = [
		{
			title: "Metrics",
			subtitle: "何が起きたか",
			items: [
				"CloudWatch Lambda Insights",
				"ConcurrentExecutions",
				"Duration / Errors / Throttles",
				"IteratorAge (Stream遅延)",
			],
			color: "#1565c0",
			x: 70,
		},
		{
			title: "Logs",
			subtitle: "詳細を知る",
			items: [
				"CloudWatch Logs (構造化JSON)",
				"Lambda Powertools Logger",
				"Logs Insights でクエリ分析",
				"correlation_id でトレース",
			],
			color: "#6a1b9a",
			x: 290,
		},
		{
			title: "Traces",
			subtitle: "どこで起きたか",
			items: [
				"X-Ray 分散トレーシング",
				"Segment / Subsegment",
				"サービスマップで可視化",
				"Powertools Tracer で簡易実装",
			],
			color: "#2e7d32",
			x: 510,
		},
	];
	for (const p of pillars) {
		inner += box(p.x - 50, 58, 200, 210, BOX, p.color, 8);
		inner += text(p.x + 50, 82, p.title, 16, p.color, "middle", "bold");
		inner += text(p.x + 50, 100, p.subtitle, 11, "#aaaacc", "middle");
		p.items.forEach((item, i) => {
			inner += text(p.x + 50, 122 + i * 22, item, 11, TEXT, "middle");
		});
	}
	inner += box(40, 283, 720, 55, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		305,
		"Lambda Powertools: Logger / Tracer / Metrics を一括導入",
		12,
		ACC1,
		"middle",
		"bold",
	);
	inner += text(
		400,
		323,
		"capture_cold_start_metric=True で コールドスタート頻度をメトリクス化",
		12,
		TEXT,
		"middle",
	);
	return svgWrap(inner, 355);
}

// SVG 12: CQRS pattern
function svgCQRS(): string {
	let inner = text(
		400,
		30,
		"サーバーレス CQRS パターン",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Write side
	inner += box(20, 60, 340, 130, "#0a0f1c", "#e91e63", 8);
	inner += text(190, 82, "Write Side (Command)", 13, ACC2, "middle", "bold");
	inner += box(30, 95, 100, 40, BOX, "#555577", 5);
	inner += text(80, 119, "API GW", 11, TEXT, "middle");
	inner += box(155, 95, 100, 40, BOX, ACC1, 5);
	inner += text(205, 119, "Lambda", 11, "#111", "middle");
	inner += box(280, 95, 70, 40, BOX, "#2e7d32", 5);
	inner += text(315, 119, "DynamoDB", 10, TEXT, "middle");
	inner += arrow(130, 115, 155, 115);
	inner += arrow(255, 115, 280, 115);
	inner += text(190, 152, "正規化データ書き込み", 11, "#aaaacc", "middle");
	inner += text(
		190,
		170,
		"DynamoDB Streams で変更検知",
		11,
		"#aaaacc",
		"middle",
	);
	// Streams arrow
	inner += arrow(200, 190, 200, 230, ACC2);
	inner += text(215, 215, "Streams", 10, ACC2, "start");
	// Read side
	inner += box(20, 235, 340, 130, "#0a0f1c", "#1565c0", 8);
	inner += text(190, 257, "Read Side (Query)", 13, "#90caf9", "middle", "bold");
	inner += box(30, 270, 100, 40, BOX, "#1565c0", 5);
	inner += text(80, 294, "Lambda", 11, "#90caf9", "middle");
	inner += box(155, 270, 100, 40, BOX, "#e65100", 5);
	inner += text(205, 294, "OpenSearch", 11, "#ffab91", "middle");
	inner += box(280, 270, 70, 40, BOX, "#6a1b9a", 5);
	inner += text(315, 294, "Aurora", 11, TEXT, "middle");
	inner += arrow(130, 290, 155, 290);
	inner += arrow(255, 290, 280, 290);
	inner += text(
		190,
		328,
		"読み取り専用データストア (最適化済み)",
		11,
		"#aaaacc",
		"middle",
	);
	// Client arrows
	inner += box(450, 140, 140, 40, BOX, "#555577", 6);
	inner += text(520, 164, "クライアント", 13, TEXT, "middle");
	inner += arrow(450, 155, 360, 115, "#e91e63");
	inner += arrow(450, 165, 360, 290, "#1565c0");
	inner += text(430, 130, "Command", 10, ACC2, "middle");
	inner += text(430, 200, "Query", 10, "#90caf9", "middle");
	return svgWrap(inner, 385);
}

// SVG 13: Saga pattern
function svgSaga(): string {
	let inner = text(
		400,
		30,
		"Saga パターン (Step Functions)",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const steps = [
		{ label: "注文作成", comp: "注文キャンセル", x: 80 },
		{ label: "在庫確保", comp: "在庫解放", x: 230 },
		{ label: "決済処理", comp: "返金処理", x: 380 },
		{ label: "配送依頼", comp: "配送キャンセル", x: 530 },
		{ label: "完了通知", comp: "(補償なし)", x: 680 },
	];
	// Forward path
	for (const s of steps) {
		inner += box(s.x - 55, 65, 110, 45, BOX, ACC1, 6);
		inner += text(s.x, 92, s.label, 11, TEXT, "middle", "bold");
	}
	for (let i = 0; i < steps.length - 1; i++) {
		inner += arrow(steps[i].x + 55, 87, steps[i + 1].x - 55, 87);
	}
	inner += text(400, 60, "正常フロー →", 12, "#81c784", "middle");
	// Compensation path
	for (const s of steps) {
		inner += box(s.x - 55, 170, 110, 45, "#1a0a0a", ACC2, 6);
		inner += text(s.x, 197, s.comp, 10, "#ff8a80", "middle");
	}
	for (let i = steps.length - 1; i > 0; i--) {
		inner += arrow(steps[i].x - 55, 192, steps[i - 1].x + 55, 192, ACC2);
	}
	inner += text(400, 165, "← 補償フロー (障害時)", 12, ACC2, "middle");
	inner += arrow(steps[2].x, 110, steps[2].x, 170, "#ff5252");
	inner += text(steps[2].x + 10, 145, "❌ 失敗", 12, "#ff5252", "start");
	inner += box(40, 235, 720, 60, "#0a0f1c", "#333366", 6);
	inner += text(
		400,
		258,
		"Step Functions の Catch → 補償 Lambda を逆順実行",
		12,
		TEXT,
		"middle",
	);
	inner += text(
		400,
		278,
		"各ステップに Retry (指数バックオフ) + TimeoutSeconds を設定",
		12,
		"#aaaacc",
		"middle",
	);
	return svgWrap(inner, 315);
}

// SVG 14: Security model
function svgSecurityModel(): string {
	let inner = text(
		400,
		30,
		"Lambda セキュリティモデル",
		18,
		ACC1,
		"middle",
		"bold",
	);
	// Execution role
	inner += box(30, 55, 340, 130, "#0a0f1c", ACC1, 8);
	inner += text(
		200,
		78,
		"実行ロール (Execution Role)",
		13,
		ACC1,
		"middle",
		"bold",
	);
	inner += text(
		200,
		100,
		"Lambda → 他サービスを呼び出す権限",
		11,
		TEXT,
		"middle",
	);
	inner += text(
		200,
		118,
		"例: DynamoDB 読み書き / S3 GetObject",
		11,
		"#aaaacc",
		"middle",
	);
	inner += text(
		200,
		138,
		"専用ロール作成 + 最小権限が必須",
		11,
		"#81c784",
		"middle",
	);
	inner += text(
		200,
		157,
		"IAM Access Analyzer で過剰権限を検出",
		11,
		"#aaaacc",
		"middle",
	);
	// Resource policy
	inner += box(430, 55, 340, 130, "#0a0f1c", "#6a1b9a", 8);
	inner += text(
		600,
		78,
		"リソースポリシー (Resource Policy)",
		13,
		"#ce93d8",
		"middle",
		"bold",
	);
	inner += text(600, 100, "誰がこの関数を呼び出せるか", 11, TEXT, "middle");
	inner += text(
		600,
		118,
		"例: API GW / S3 / EventBridge からの Invoke",
		11,
		"#aaaacc",
		"middle",
	);
	inner += text(
		600,
		138,
		"クロスアカウント呼び出しにも使用",
		11,
		"#ce93d8",
		"middle",
	);
	inner += text(
		600,
		157,
		"Principal に specific ARN を指定",
		11,
		"#aaaacc",
		"middle",
	);
	// Secrets
	inner += box(30, 205, 340, 100, "#0a0f1c", "#e65100", 8);
	inner += text(200, 228, "シークレット管理", 13, "#ff8a65", "middle", "bold");
	inner += text(
		200,
		248,
		"Secrets Manager: 自動ローテーション対応",
		11,
		TEXT,
		"middle",
	);
	inner += text(
		200,
		266,
		"SSM Parameter Store: SecureString",
		11,
		"#aaaacc",
		"middle",
	);
	inner += text(
		200,
		284,
		"Extension でローカルキャッシュ→API呼び出し削減",
		11,
		"#aaaacc",
		"middle",
	);
	// Env vars
	inner += box(430, 205, 340, 100, "#0a0f1c", "#2e7d32", 8);
	inner += text(600, 228, "環境変数の暗号化", 13, "#81c784", "middle", "bold");
	inner += text(
		600,
		248,
		"デフォルト: Lambda マネージドキーで暗号化",
		11,
		TEXT,
		"middle",
	);
	inner += text(
		600,
		266,
		"カスタムKMSキーで強化暗号化",
		11,
		"#aaaacc",
		"middle",
	);
	inner += text(
		600,
		284,
		"ハードコードは絶対NG → 必ず外部参照",
		11,
		"#81c784",
		"middle",
	);
	return svgWrap(inner, 330);
}

// SVG 15: Performance optimization summary
function svgPerfOptimization(): string {
	let inner = text(
		400,
		30,
		"パフォーマンス最適化マトリクス",
		18,
		ACC1,
		"middle",
		"bold",
	);
	const strategies = [
		{
			cat: "コールドスタート",
			action: "SnapStart / Provisioned Concurrency / 軽量ランタイム",
			impact: "高",
			cost: "中〜高",
			x: 40,
		},
		{
			cat: "実行速度",
			action: "メモリ最適化 (Power Tuning) / グローバルスコープ初期化",
			impact: "高",
			cost: "低",
			x: 40,
		},
		{
			cat: "接続管理",
			action: "RDS Proxy / ElastiCache / 接続プーリング",
			impact: "高",
			cost: "低〜中",
			x: 40,
		},
		{
			cat: "依存サイズ",
			action: "tree-shaking / AWS SDK v3 モジュール別 / esbuild",
			impact: "中",
			cost: "無料",
			x: 40,
		},
		{
			cat: "スロットリング",
			action: "SQS バッファリング / Reserved Concurrency 設定",
			impact: "高",
			cost: "低",
			x: 40,
		},
	];
	// Headers
	const headers = ["最適化カテゴリ", "手法", "効果", "コスト"];
	const widths = [155, 370, 70, 70];
	let hx = 40;
	for (let i = 0; i < headers.length; i++) {
		inner += box(hx, 60, widths[i], 32, "#0d1b2a", ACC1, 4);
		inner += text(
			hx + widths[i] / 2,
			80,
			headers[i],
			12,
			ACC1,
			"middle",
			"bold",
		);
		hx += widths[i] + 2;
	}
	for (let si = 0; si < strategies.length; si++) {
		const s = strategies[si];
		const rowY = 95 + si * 40;
		const bg = si % 2 === 0 ? "#0d1b2a" : "#0a0f1c";
		let rx = 40;
		const vals = [s.cat, s.action, s.impact, s.cost];
		for (let i = 0; i < vals.length; i++) {
			inner += box(rx, rowY, widths[i], 36, bg, "#333355", 4);
			inner += text(
				rx + widths[i] / 2,
				rowY + 22,
				vals[i],
				i === 1 ? 10 : 11,
				i === 2 ? (vals[i] === "高" ? "#81c784" : "#ffcc80") : TEXT,
				"middle",
			);
			rx += widths[i] + 2;
		}
	}
	return svgWrap(inner, 300);
}

// Main injection logic
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

// Map: slide title → SVG generator function
const svgMap: Record<string, () => string> = {
	"AWS Lambda / Serverless Deep Dive": svgLambdaExecFlow,
	"AWS Lambdaとは": svgLambdaExecFlow,
	Lambda実行環境の構造: svgLambdaExecFlow,
	"Lambda ライフサイクル詳解": svgLambdaExecFlow,
	イベントソースとInvoke種別: svgEventSources,
	"Lambda Layer": svgLambdaLayers,
	"Lambda Extensions": svgLambdaLayers,
	"Lambda SnapStart (Java/DotNET)": svgColdVsWarm,
	同時実行数とスロットリング: svgConcurrencyModel,
	コールドスタートとウォームスタートの違い: svgColdVsWarm,
	コールドスタートの構成要素: svgColdVsWarm,
	ランタイム別コールドスタート比較: svgColdVsWarm,
	"Provisioned Concurrencyとは": svgConcurrencyModel,
	SnapStartの仕組み: svgColdVsWarm,
	コールドスタート軽減パターン集: svgPerfOptimization,
	メモリ最適化とパフォーマンス: svgPerfOptimization,
	"AWS Lambda Power Tuning": svgPerfOptimization,
	"接続プーリング: RDS Proxy": svgVPCArchitecture,
	依存パッケージ最適化: svgPerfOptimization,
	初期化コードの最適化: svgPerfOptimization,
	"Lambda Throttling対策": svgConcurrencyModel,
	コストとパフォーマンスのバランス: svgPerfOptimization,
	サーバーレス設計原則: svgServerlessPattern,
	"API Gateway + Lambda パターン": svgServerlessPattern,
	"SQS + Lambda イベント駆動パターン": svgSQSPattern,
	"EventBridge + Lambda": svgServerlessPattern,
	"DynamoDB Streams + Lambda": svgSQSPattern,
	"Step Functions オーケストレーション": svgStepFunctions,
	"Fan-out パターン": svgSQSPattern,
	"Sagaパターン (分散トランザクション)": svgSaga,
	"Circuit Breaker in Serverless": svgServerlessPattern,
	"サーバーレス CQRS パターン": svgCQRS,
	"GraphQL with AppSync + Lambda": svgServerlessPattern,
	レスポンスストリーミング: svgServerlessPattern,
	"Lambda + DynamoDB Single Table設計": svgServerlessPattern,
	イベントソーシングパターン: svgSaga,
	サーバーレスマイクロサービス: svgServerlessPattern,
	アーキテクチャパターン選択フロー: svgPerfOptimization,
	サーバーレスオブザーバビリティの課題: svgObservability,
	"CloudWatch Lambda Insights": svgObservability,
	"X-Ray トレーシング概要": svgObservability,
	"Lambda Powertools for Python/TypeScript": svgObservability,
	アラーム設計パターン: svgObservability,
	コスト可視化と最適化: svgPerfOptimization,
	Lambdaセキュリティベストプラクティス: svgSecurityModel,
	"VPC Lambda の設計": svgVPCArchitecture,
	"AWS SAM による CI/CD": svgDeployPipeline,
	"AWS CDK による Lambda 管理": svgDeployPipeline,
	"まとめ: キーテイクアウェイ": svgPerfOptimization,
	アーキテクチャ決定マトリクス: svgPerfOptimization,
	"ARM64 (Graviton2) vs x86_64": svgPerfOptimization,
	バージョン管理とエイリアス: svgDeployPipeline,
};

let injected = 0;
for (const slide of slides) {
	// Skip slides that already have SVG
	if (slide.content.some((c) => c.startsWith("<svg") || c.startsWith("![")))
		continue;
	// Skip code-only slides
	if (slide.code && slide.content.length === 0) continue;
	// Skip section slides (they have little space)
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
