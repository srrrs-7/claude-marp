#!/usr/bin/env bun
// Adds inline SVGs to slides that don't already have asset references
// Target: ≥50% of 63 slides = ≥32 slides with SVG

import { readFileSync, writeFileSync } from "fs";

const DATA_PATH =
	"/workspace/main/docs/20260219012225_aws-genai-developer-pro/slides-data.json";

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const TXT2 = "#b0b8d0";

const SVG_STYLE = `max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0`;

function svg(content: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" style="${SVG_STYLE}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

function rect(
	x: number,
	y: number,
	w: number,
	h: number,
	fill: string,
	rx = 8,
): string {
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}"/>`;
}

function text(
	x: number,
	y: number,
	content: string,
	size = 16,
	fill = TXT,
	anchor = "middle",
	weight = "normal",
): string {
	return `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${content}</text>`;
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
	const px = -uy;
	const py = ux;
	const tip = 10;
	// Arrow head as polygon (no url(#) refs allowed)
	const hx = x2;
	const hy = y2;
	const b1x = hx - ux * tip + px * 5;
	const b1y = hy - uy * tip + py * 5;
	const b2x = hx - ux * tip - px * 5;
	const b2y = hy - uy * tip - py * 5;
	return `<line x1="${x1}" y1="${y1}" x2="${x2 - ux * tip}" y2="${y2 - uy * tip}" stroke="${color}" stroke-width="2"/><polygon points="${hx},${hy} ${b1x},${b1y} ${b2x},${b2y}" fill="${color}"/>`;
}

// SVG templates keyed by slide index (0-based)
const svgMap: Record<number, string> = {
	// Slide 1: アジェンダ (1/2) - Domain coverage overview
	1: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 40, "評価領域 — Domain Overview", 22, ACC1, "middle", "bold")}
${[
	["Domain 1", "AI/ML基礎", "20%", 100],
	["Domain 2", "生成AI基礎", "24%", 220],
	["Domain 3", "FM活用", "28%", 340],
	["Domain 4", "責任あるAI", "14%", 460],
	["Domain 5", "セキュリティ", "14%", 580],
]
	.map(
		([d, label, pct, x]) => `
${rect(Number(x) - 55, 80, 110, 240, BOX)}
<rect x="${Number(x) - 45}" y="${370 - Number(pct.replace("%", "")) * 7}" width="90" height="${Number(pct.replace("%", "")) * 7}" fill="${ACC2}" rx="4"/>
${text(Number(x), 370 - Number(pct.replace("%", "")) * 7 - 10, String(pct), 18, ACC1, "middle", "bold")}
${text(Number(x), 345, String(label), 12, TXT2, "middle")}
${text(Number(x), 360, String(d), 11, TXT2, "middle")}
`,
	)
	.join("")}
`),

	// Slide 2: 試験の位置づけ - cert path
	2: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 35, "AWS 認定資格ロードマップ", 22, ACC1, "middle", "bold")}
${rect(30, 120, 180, 80, BOX)}
${text(120, 152, "AI Practitioner", 14, TXT, "middle", "bold")}
${text(120, 172, "基礎レベル", 12, TXT2, "middle")}
${rect(310, 120, 180, 80, "#1e3a5f")}
${text(400, 152, "GenAI Developer", 14, ACC1, "middle", "bold")}
${text(400, 172, "Professional ★本試験", 12, ACC1, "middle")}
${rect(590, 120, 180, 80, BOX)}
${text(680, 152, "ML Specialty", 14, TXT, "middle", "bold")}
${text(680, 172, "専門深化", 12, TXT2, "middle")}
${arrow(210, 160, 310, 160)}
${arrow(490, 160, 590, 160)}
${text(400, 250, "推奨経験: AWS実務1年以上 + 生成AI/ML基礎知識", 15, TXT2, "middle")}
${text(400, 280, "有効期間: 3年間 | 合格スコア: 750/1000", 15, TXT2, "middle")}
${text(400, 310, "受験料: USD 300 | 問題数: 85問（採点対象65問）", 15, TXT2, "middle")}
`),

	// Slide 3: 本資料の使い方 - learning flow
	3: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 35, "学習フロー", 22, ACC1, "middle", "bold")}
${[
	["1", "セクション別に読む", "各ドメインから順番に", 60],
	["2", "チェックリスト確認", "各末尾で理解度確認", 180],
	["3", "Bedrockを実操作", "コンソール/APIで体験", 300],
	["4", "模擬試験で確認", "AWS公式模擬問題集", 420],
	["5", "弱点ドメイン復習", "繰り返しで定着", 540],
]
	.map(
		([num, title, sub, x]) => `
${rect(Number(x) - 100, 70, 110, 90, BOX)}
<circle cx="${Number(x) - 45}" cy="95" r="20" fill="${ACC2}"/>
${text(Number(x) - 45, 101, String(num), 18, TXT, "middle", "bold")}
${text(Number(x) - 44, 132, String(title), 11, TXT, "middle", "bold")}
${text(Number(x) - 44, 148, String(sub), 10, TXT2, "middle")}
`,
	)
	.join("")}
${[1, 2, 3, 4].map((i) => arrow(i * 120 + 20, 115, i * 120 + 60, 115)).join("")}
${text(400, 220, "合格スコア: 750/1000 スケールスコア（65問中）", 16, TXT2, "middle")}
${text(400, 250, "問題形式: 単一選択 + 複数選択（記述問題なし）", 15, TXT2, "middle")}
`),

	// Slide 5: 試験形式 - exam details
	5: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 35, "試験形式 詳細", 22, ACC1, "middle", "bold")}
${[
	["問題数", "85問", "採点65問 + ノンスコア20問"],
	["試験時間", "170分", "約2分/問のペース"],
	["合格スコア", "750/1000", "スケールスコア"],
	["受験料", "USD 300", "Professional レベル"],
	["言語", "英語", "日本語UI選択可"],
	["受験方法", "PearsonVUE / 自宅", "テストセンター or オンライン"],
]
	.map(
		([label, value, note], i) => `
${rect(20 + (i % 3) * 260, 80 + Math.floor(i / 3) * 130, 240, 110, BOX)}
${text(140 + (i % 3) * 260, 118 + Math.floor(i / 3) * 130, String(label), 13, TXT2, "middle")}
${text(140 + (i % 3) * 260, 148 + Math.floor(i / 3) * 130, String(value), 22, ACC1, "middle", "bold")}
${text(140 + (i % 3) * 260, 170 + Math.floor(i / 3) * 130, String(note), 11, TXT2, "middle")}
`,
	)
	.join("")}
`),

	// Slide 7: 試験準備 - study plan
	7: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 35, "学習スケジュール目安", 22, ACC1, "middle", "bold")}
${[
	["Week 1-2", "AWS AI/ML全体像", "Bedrockコンソール基礎操作", ACC2],
	[
		"Week 3-4",
		"RAG・Agents・Guardrails",
		"プロンプトエンジニアリング実践",
		"#0d7377",
	],
	["Week 5-6", "責任あるAI・セキュリティ", "コンプライアンス理解", "#6b2d8b"],
	["Week 7-8", "模擬試験繰り返し", "弱点ドメイン集中復習", "#1a6b3c"],
]
	.map(
		([week, title, sub, color], i) => `
${rect(20 + i * 190, 70, 175, 160, BOX)}
<rect x="${20 + i * 190}" y="70" width="175" height="8" fill="${color}" rx="4"/>
${text(107 + i * 190, 110, String(week), 14, String(color), "middle", "bold")}
${text(107 + i * 190, 135, String(title), 12, TXT, "middle", "bold")}
${text(107 + i * 190, 155, String(sub), 11, TXT2, "middle")}
`,
	)
	.join("")}
${text(400, 270, "Domain 3（28%）は最重点 — Bedrockを実際に操作して理解する", 15, ACC1, "middle", "bold")}
`),

	// Slide 10: 機械学習の種類
	10: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "機械学習の3つの主要パラダイム", 21, ACC1, "middle", "bold")}
${rect(20, 60, 230, 280, BOX)}
<rect x="20" y="60" width="230" height="6" fill="${ACC2}" rx="3"/>
${text(135, 95, "教師あり学習", 16, TXT, "middle", "bold")}
${text(135, 118, "Supervised Learning", 12, TXT2, "middle")}
${text(135, 148, "ラベル付きデータで学習", 12, TXT, "middle")}
${text(135, 168, "分類 / 回帰", 12, TXT2, "middle")}
${text(135, 195, "スパム判定・価格予測", 11, TXT2, "middle")}
${text(135, 215, "AWS: SageMaker", 12, ACC1, "middle")}
${rect(285, 60, 230, 280, BOX)}
<rect x="285" y="60" width="230" height="6" fill="#0d7377" rx="3"/>
${text(400, 95, "教師なし学習", 16, TXT, "middle", "bold")}
${text(400, 118, "Unsupervised Learning", 12, TXT2, "middle")}
${text(400, 148, "ラベルなしデータのパターン発見", 12, TXT, "middle")}
${text(400, 168, "クラスタリング / 次元削減", 12, TXT2, "middle")}
${text(400, 195, "異常検知・セグメント", 11, TXT2, "middle")}
${text(400, 215, "AWS: SageMaker + KMeans", 12, ACC1, "middle")}
${rect(550, 60, 230, 280, BOX)}
<rect x="550" y="60" width="230" height="6" fill="#6b2d8b" rx="3"/>
${text(665, 95, "強化学習", 16, TXT, "middle", "bold")}
${text(665, 118, "Reinforcement Learning", 12, TXT2, "middle")}
${text(665, 148, "報酬最大化で行動を学習", 12, TXT, "middle")}
${text(665, 168, "ゲームAI / ロボット制御", 12, TXT2, "middle")}
${text(665, 195, "RLHF（LLMの人間学習）", 11, TXT2, "middle")}
${text(665, 215, "AWS: SageMaker RL", 12, ACC1, "middle")}
${text(400, 370, "自己教師あり学習: データ自体から教師信号を生成（LLM事前学習・BERT・GPT）", 12, TXT2, "middle")}
`),

	// Slide 12: ML評価指標
	12: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "ML モデル評価指標", 21, ACC1, "middle", "bold")}
${[
	["Accuracy", "全サンプル中の正解率", "クラス不均衡時は不適切", 80],
	["Precision", "陽性予測の適合率", "偽陽性を最小化したい時", 210],
	["Recall", "実際の陽性の検出率", "偽陰性を最小化（医療等）", 340],
	["F1 Score", "Precision×Recall調和平均", "不均衡データの総合指標", 470],
	["AUC-ROC", "判別能力 0〜1で評価", "0.5=ランダム 1.0=完璧", 600],
	["RMSE/MAE", "回帰問題の誤差指標", "RMSEは外れ値に敏感", 730],
]
	.map(
		([metric, desc, note, x]) => `
${rect(Number(x) - 100, 70, 140, 270, BOX)}
${text(Number(x) - 30, 105, String(metric), 15, ACC1, "middle", "bold")}
<line x1="${Number(x) - 90}" y1="115" x2="${Number(x) + 30}" y2="115" stroke="${ACC2}" stroke-width="1"/>
${text(Number(x) - 30, 145, String(desc), 10, TXT, "middle")}
${text(Number(x) - 30, 165, String(note), 10, TXT2, "middle")}
`,
	)
	.join("")}
${text(400, 370, "試験ポイント: クラス不均衡 → F1 Score / 判別能力比較 → AUC-ROC", 13, ACC1, "middle", "bold")}
`),

	// Slide 14: AWS AIサービス概要 (text slide, add inline)
	14: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "Amazon SageMaker 主要コンポーネント", 20, ACC1, "middle", "bold")}
${[
	["Studio", "統合ML開発環境(IDE)", "ノートブック・実験管理", 100, 120],
	["Autopilot", "AutoML自動構築", "データ入力→最適モデル", 270, 120],
	["Training", "分散学習ジョブ", "Spot活用でコスト削減", 440, 120],
	["Endpoints", "リアルタイム推論", "オートスケーリング対応", 610, 120],
	["Pipelines", "MLワークフロー", "CI/CD自動化", 185, 250],
	[
		"Model Registry",
		"モデルバージョン管理",
		"承認フロー・デプロイ追跡",
		400,
		250,
	],
	["Clarify", "バイアス検出+XAI", "SHAP値・説明可能性", 615, 250],
]
	.map(
		([name, desc, sub, x, y]) => `
${rect(Number(x) - 95, Number(y) - 40, 180, 100, BOX)}
${text(Number(x) - 5, Number(y) - 10, String(name), 14, ACC1, "middle", "bold")}
${text(Number(x) - 5, Number(y) + 15, String(desc), 11, TXT, "middle")}
${text(Number(x) - 5, Number(y) + 32, String(sub), 10, TXT2, "middle")}
`,
	)
	.join("")}
`),

	// Slide 15: SageMaker追加コンポーネント
	15: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "SageMaker 追加コンポーネント", 20, ACC1, "middle", "bold")}
${[
	["Feature Store", "特徴量オンライン/オフライン一元管理", 120, 100],
	["Model Monitor", "データドリフト・品質劣化検出", 400, 100],
	["Ground Truth", "人手ラベリング+自動ラベリング", 680, 100],
	["JumpStart", "事前学習済みモデルの検索・FT・デプロイ", 200, 250],
	["Data Wrangler", "ノーコードデータ前処理・可視化", 500, 250],
]
	.map(
		([name, desc, x, y]) => `
${rect(Number(x) - 140, Number(y) - 50, 280, 110, BOX)}
${text(Number(x), Number(y) - 20, String(name), 16, ACC1, "middle", "bold")}
${text(Number(x), Number(y) + 10, String(desc), 12, TXT, "middle")}
`,
	)
	.join("")}
`),

	// Slide 16: Domain1チェックリスト
	16: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Domain 1 — 重要ポイントまとめ", 20, ACC1, "middle", "bold")}
${[
	["機械学習の種類", "教師あり/なし/強化学習の違い", ACC2],
	["評価指標", "Precision・Recall・F1・AUC-ROC", "#0d7377"],
	["AWS AIサービス", "Rekognition=画像 Comprehend=NLP", "#6b2d8b"],
	["SageMaker主要機能", "Studio/Pipelines/Clarify/Monitor", "#1a6b3c"],
	["MLワークフロー", "各ステップとAWSサービスの対応", "#b45309"],
]
	.map(
		([topic, detail, color], i) => `
${rect(60, 65 + i * 56, 680, 48, BOX)}
<rect x="60" y="${65 + i * 56}" width="6" height="48" fill="${color}" rx="3"/>
${text(110, 85 + i * 56, String(topic), 14, String(color), "start", "bold")}
${text(110, 103 + i * 56, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 18: FM and生成AI
	18: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "生成AI vs 従来AI — アーキテクチャ比較", 20, ACC1, "middle", "bold")}
${rect(30, 70, 340, 270, BOX)}
<rect x="30" y="70" width="340" height="8" fill="#555" rx="4"/>
${text(200, 105, "従来の判別AI", 17, TXT2, "middle", "bold")}
${text(200, 135, "Input → Classify / Predict", 13, TXT2, "middle")}
${text(200, 160, "例: スパム判定・画像分類", 13, TXT, "middle")}
${text(200, 185, "特定タスクに特化", 13, TXT, "middle")}
${text(200, 210, "タスク固有の学習データが必要", 12, TXT2, "middle")}
${rect(430, 70, 340, 270, BOX)}
<rect x="430" y="70" width="340" height="8" fill="${ACC2}" rx="4"/>
${text(600, 105, "生成AI / Foundation Models", 17, ACC1, "middle", "bold")}
${text(600, 135, "Input → Generate New Content", 13, ACC1, "middle")}
${text(600, 160, "例: テキスト・画像・コード生成", 13, TXT, "middle")}
${text(600, 185, "Zero-shot / Few-shot 対応", 13, TXT, "middle")}
${text(600, 210, "数十億〜数千億パラメータ", 12, TXT2, "middle")}
${text(600, 235, "Claude・GPT-4・Titan・Llama", 12, TXT2, "middle")}
${text(400, 370, "Foundation Models: 大規模データで事前学習済みの汎用モデル", 14, TXT2, "middle")}
`),

	// Slide 19: Transformer
	19: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "Transformer アーキテクチャ", 20, ACC1, "middle", "bold")}
${rect(50, 70, 200, 270, BOX)}
${text(150, 100, "Input", 14, TXT2, "middle", "bold")}
${text(150, 125, "Tokenization", 12, TXT, "middle")}
${text(150, 148, "Embedding", 12, TXT, "middle")}
${text(150, 170, "Positional", 12, TXT, "middle")}
${text(150, 190, "Encoding", 12, TXT, "middle")}
${rect(300, 70, 200, 270, "#1e3a5f")}
${text(400, 100, "Attention", 14, ACC2, "middle", "bold")}
${text(400, 125, "Self-Attention", 12, TXT, "middle")}
${text(400, 148, "単語間の関係を", 12, TXT, "middle")}
${text(400, 168, "並列計算で学習", 12, TXT, "middle")}
${text(400, 195, "長距離依存も対応", 12, TXT2, "middle")}
${rect(550, 70, 200, 270, BOX)}
${text(650, 100, "Output", 14, ACC1, "middle", "bold")}
${text(650, 125, "BERT: エンコーダ型", 12, TXT, "middle")}
${text(650, 148, "→ 理解タスク", 12, TXT2, "middle")}
${text(650, 170, "GPT: デコーダ型", 12, TXT, "middle")}
${text(650, 190, "→ 生成タスク", 12, TXT2, "middle")}
${text(650, 215, "LLMは次トークン予測", 11, TXT2, "middle")}
${arrow(250, 205, 300, 205)}
${arrow(500, 205, 550, 205)}
${text(400, 370, "Scaling Law: パラメータ数・データ量・計算量を増やすほど能力が急激に向上", 12, TXT2, "middle")}
`),

	// Slide 20: トークン・エンベディング
	20: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "トークン・エンベディング・コンテキストウィンドウ", 19, ACC1, "middle", "bold")}
${rect(30, 70, 220, 240, BOX)}
${text(140, 100, "トークン", 16, ACC1, "middle", "bold")}
${text(140, 125, "テキストの基本処理単位", 12, TXT, "middle")}
${text(140, 148, "1 token ≈ 0.75 英語単語", 12, TXT2, "middle")}
${text(140, 168, "≈ 0.5 日本語文字", 12, TXT2, "middle")}
${text(140, 195, "サブワード分割で", 12, TXT, "middle")}
${text(140, 212, "語彙を最適化", 12, TXT, "middle")}
${rect(290, 70, 220, 240, BOX)}
${text(400, 100, "エンベディング", 16, ACC1, "middle", "bold")}
${text(400, 125, "テキスト→数値ベクトル変換", 12, TXT, "middle")}
${text(400, 148, "意味情報を保持", 12, TXT2, "middle")}
${text(400, 168, "類似テキスト=近いベクトル", 12, TXT2, "middle")}
${text(400, 195, "Amazon Titan Embeddings", 12, ACC1, "middle")}
${text(400, 212, "RAGで必須の技術", 12, TXT2, "middle")}
${rect(550, 70, 220, 240, BOX)}
${text(660, 100, "コンテキストウィンドウ", 14, ACC1, "middle", "bold")}
${text(660, 125, "1リクエストの最大トークン数", 12, TXT, "middle")}
${text(660, 148, "（入力+出力の合計）", 12, TXT2, "middle")}
${text(660, 175, "Claude: 最大 200K tokens", 12, TXT2, "middle")}
${text(660, 195, "長文書・会話履歴対応", 12, TXT, "middle")}
${text(660, 215, "チャンキングで分割処理", 12, TXT2, "middle")}
`),

	// Slide 21: LLM推論パラメータ
	21: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "LLM 推論パラメータ", 21, ACC1, "middle", "bold")}
${[
	["Temperature", "0〜2", "低=確定的 高=創造的", "事実確認→低 創作→高", ACC2],
	["Top-P", "0〜1", "累積確率サンプリング", "Nucleus Sampling", "#0d7377"],
	[
		"Top-K",
		"整数",
		"上位K個からサンプル",
		"K=1はGreedy（最高確率）",
		"#6b2d8b",
	],
	["Max Tokens", "整数", "生成トークン数上限", "コスト制御と応答長", "#1a6b3c"],
	[
		"Stop Sequence",
		"文字列",
		"特定文字列で生成停止",
		"出力形式の制御",
		"#b45309",
	],
]
	.map(
		([param, range, desc, note, color], i) => `
${rect(50, 65 + i * 58, 700, 50, BOX)}
<rect x="50" y="${65 + i * 58}" width="5" height="50" fill="${color}" rx="3"/>
${text(150, 85 + i * 58, String(param), 14, String(color), "start", "bold")}
${text(270, 85 + i * 58, String(range), 14, TXT2, "start")}
${text(350, 85 + i * 58, String(desc), 13, TXT, "start")}
${text(590, 85 + i * 58, String(note), 11, TXT2, "start")}
`,
	)
	.join("")}
`),

	// Slide 23: 高度プロンプト技法
	23: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "高度なプロンプト技法", 21, ACC1, "middle", "bold")}
${[
	["Self-Consistency", "複数回生成→多数決で最終回答決定", ACC2],
	["ReAct", "推論+ツール使用を交互繰り返し（Bedrock Agentsの基盤）", "#0d7377"],
	["Reflection", "モデルが自分の回答を批評・修正する反復プロセス", "#6b2d8b"],
	[
		"Tree-of-Thought",
		"複数の推論パスを木構造で探索（複雑な問題に有効）",
		"#1a6b3c",
	],
	[
		"Prompt Injection対策",
		"入力サニタイズ・信頼しない設計・Guardrails活用",
		ACC1,
	],
]
	.map(
		([tech, desc, color], i) => `
${rect(60, 65 + i * 54, 680, 46, BOX)}
<circle cx="95" cy="${88 + i * 54}" r="16" fill="${color}"/>
${text(95, 94 + i * 54, String(i + 1), 14, TXT, "middle", "bold")}
${text(130, 84 + i * 54, String(tech), 14, String(color), "start", "bold")}
${text(130, 103 + i * 54, String(desc), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 24: プロンプト構成要素
	24: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "プロンプト 4つの構成要素", 21, ACC1, "middle", "bold")}
${rect(50, 70, 165, 260, BOX)}
<rect x="50" y="70" width="165" height="8" fill="${ACC2}" rx="4"/>
${text(132, 110, "指示", 18, TXT, "middle", "bold")}
${text(132, 132, "Instruction", 13, TXT2, "middle")}
${text(132, 160, "何をしてほしいか", 12, TXT, "middle")}
${text(132, 180, "具体的・明確に記述", 12, TXT2, "middle")}
${rect(230, 70, 165, 260, BOX)}
<rect x="230" y="70" width="165" height="8" fill="#0d7377" rx="4"/>
${text(312, 110, "コンテキスト", 17, TXT, "middle", "bold")}
${text(312, 132, "Context", 13, TXT2, "middle")}
${text(312, 160, "背景情報・制約・前提", 12, TXT, "middle")}
${rect(410, 70, 165, 260, BOX)}
<rect x="410" y="70" width="165" height="8" fill="#6b2d8b" rx="4"/>
${text(492, 110, "入力データ", 17, TXT, "middle", "bold")}
${text(492, 132, "Input Data", 13, TXT2, "middle")}
${text(492, 160, "Few-shotの例", 12, TXT, "middle")}
${text(492, 180, "処理対象データ", 12, TXT2, "middle")}
${rect(590, 70, 165, 260, BOX)}
<rect x="590" y="70" width="165" height="8" fill="#1a6b3c" rx="4"/>
${text(672, 110, "出力形式", 18, TXT, "middle", "bold")}
${text(672, 132, "Output Indicator", 12, TXT2, "middle")}
${text(672, 160, "JSON/箇条書き/表", 12, TXT, "middle")}
${text(400, 365, "ベスト: 具体的・肯定で指示・例を提示(Few-shot)・段階的に分解", 13, TXT2, "middle")}
`),

	// Slide 25: ハルシネーション
	25: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "ハルシネーション（幻覚）の原因", 20, ACC1, "middle", "bold")}
${[
	[
		"学習データの問題",
		"誤ったデータ・知識カットオフ\n最新情報がモデルに存在しない",
		ACC2,
	],
	[
		"確率的生成の性質",
		"次トークンを確率的に予測\n「それらしい嘘」が生まれる",
		"#e74c3c",
	],
	[
		"コンテキスト不足",
		"情報なしに質問→埋め合わせで誤情報\n不明確な質問が原因になる",
		"#9b59b6",
	],
]
	.map(
		([title, desc, color], i) => `
${rect(30 + i * 255, 75, 240, 200, BOX)}
<rect x="${30 + i * 255}" y="75" width="240" height="8" fill="${color}" rx="4"/>
<circle cx="${150 + i * 255}" cy="135" r="28" fill="${color}" style="opacity:0.2"/>
${text(150 + i * 255, 141, String(i + 1), 28, String(color), "middle", "bold")}
${text(150 + i * 255, 185, String(title), 14, String(color), "middle", "bold")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(150 + i * 255, 208 + j * 18, line, 11, TXT, "middle"),
	)
	.join("")}
`,
	)
	.join("")}
${text(400, 308, "特徴: LLMは「確信度」を正確に表現できないため、嘘でも断定的に答える", 13, TXT2, "middle")}
${text(400, 335, "→ 被害事例: 架空の法律条文・医療情報の誤り・架空の引用文献", 12, ACC2, "middle")}
`),

	// Slide 26: ハルシネーション対策
	26: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "ハルシネーション軽減戦略", 20, ACC1, "middle", "bold")}
${[
	["① RAG", "外部ナレッジから根拠取得\n→ Bedrock Knowledge Bases", ACC2],
	["② Grounding", "Bedrock Guardrailsで\nRAG回答をソース検証", "#0d7377"],
	["③ Temperature低下", "0.0〜0.3に設定\n→ 決定論的出力を促進", "#6b2d8b"],
	["④ Chain-of-Thought", "推論ステップを明示させ\n論理的正解を誘導", "#1a6b3c"],
	["⑤ HITL", "高リスク判断には\n人間の確認を挟む", "#b45309"],
	["⑥ Few-shot", "正確な参照例を提示\n出力の方向性を固定", ACC1],
]
	.map(
		([title, desc, color], i) => `
${rect(20 + (i % 3) * 255, 75 + Math.floor(i / 3) * 130, 240, 110, BOX)}
<rect x="${20 + (i % 3) * 255}" y="${75 + Math.floor(i / 3) * 130}" width="240" height="6" fill="${color}" rx="3"/>
${text(140 + (i % 3) * 255, 110 + Math.floor(i / 3) * 130, String(title), 14, String(color), "middle", "bold")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(
			140 + (i % 3) * 255,
			133 + j * 18 + Math.floor(i / 3) * 130,
			line,
			11,
			TXT,
			"middle",
		),
	)
	.join("")}
`,
	)
	.join("")}
`),

	// Slide 27: Domain2チェックリスト
	27: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Domain 2 — 重要ポイントまとめ", 20, ACC1, "middle", "bold")}
${[
	["FM vs 従来ML", "汎用性・スケール・Zero-shot対応の違い", ACC2],
	["推論パラメータ", "Temperature/Top-P/Top-Kの影響", "#0d7377"],
	["プロンプト手法", "Zero-shot/Few-shot/CoTの使い分け", "#6b2d8b"],
	["ハルシネーション", "原因（確率的生成）と対策（RAG・Grounding）", "#1a6b3c"],
	["Transformer", "Self-Attention・デコーダ型の基本概念", "#b45309"],
]
	.map(
		([topic, detail, color], i) => `
${rect(60, 65 + i * 56, 680, 48, BOX)}
<rect x="60" y="${65 + i * 56}" width="6" height="48" fill="${color}" rx="3"/>
${text(110, 85 + i * 56, String(topic), 14, String(color), "start", "bold")}
${text(110, 103 + i * 56, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 30: Bedrock FMの特徴
	30: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Bedrock Foundation Models 比較", 20, ACC1, "middle", "bold")}
${[
	["Claude", "Anthropic", "長文理解・複雑推論\n最大200K tokens", ACC2],
	["Titan", "Amazon", "AWSネイティブFM\nText + Embeddings", "#0d7377"],
	["Llama", "Meta", "オープンソース系\nFT用ベースモデル", "#6b2d8b"],
	[
		"Stable Diffusion",
		"Stability AI",
		"画像生成特化\nテキスト→画像変換",
		"#1a6b3c",
	],
	[
		"Mistral",
		"Mistral AI",
		"効率的アーキテクチャ\n低レイテンシー推論",
		"#b45309",
	],
]
	.map(
		([model, provider, desc, color], i) => `
${rect(20 + (i % 3) * 255, 75 + Math.floor(i / 3) * 135, 240, 115, BOX)}
<rect x="${20 + (i % 3) * 255}" y="${75 + Math.floor(i / 3) * 135}" width="240" height="7" fill="${color}" rx="4"/>
${text(140 + (i % 3) * 255, 110 + Math.floor(i / 3) * 135, String(model), 15, String(color), "middle", "bold")}
${text(140 + (i % 3) * 255, 130 + Math.floor(i / 3) * 135, String(provider), 12, TXT2, "middle")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(
			140 + (i % 3) * 255,
			152 + j * 18 + Math.floor(i / 3) * 135,
			line,
			11,
			TXT,
			"middle",
		),
	)
	.join("")}
`,
	)
	.join("")}
`),

	// Slide 31: RAGとは
	31: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "RAG 基本フロー", 21, ACC1, "middle", "bold")}
${[
	["クエリ入力", "ユーザーの質問", 70],
	["エンベディング", "ベクトル変換", 210],
	["ベクトルDB検索", "類似チャンク取得", 370],
	["コンテキスト付与", "関連情報をFMへ", 530],
	["回答生成", "根拠付き回答", 680],
]
	.map(
		([step, desc, x]) => `
${rect(Number(x) - 60, 100, 115, 100, BOX)}
${text(Number(x), 130, String(step), 13, ACC1, "middle", "bold")}
${text(Number(x), 155, String(desc), 11, TXT, "middle")}
`,
	)
	.join("")}
${[0, 1, 2, 3].map((i) => arrow(130 + i * 160, 150, 150 + i * 160, 150)).join("")}
${rect(60, 230, 680, 130, BOX)}
${text(400, 260, "解決する問題:", 14, TXT2, "middle", "bold")}
${text(400, 290, "① 知識カットオフ  ② ハルシネーション  ③ 社内固有情報への対応", 13, TXT, "middle")}
${text(400, 320, "AWS実装: Amazon Bedrock Knowledge Bases（マネージドRAG）", 13, ACC1, "middle")}
${text(400, 348, "ベクトルストア: OpenSearch Serverless / Aurora pgvector / Pinecone / Redis", 12, TXT2, "middle")}
`),

	// Slide 33: Knowledge Bases
	33: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Amazon Bedrock Knowledge Bases — 処理フロー", 19, ACC1, "middle", "bold")}
${[
	["データソース\nS3/Confluence\nSharePoint等", 80],
	["チャンキング\nFixed/Semantic\nHierarchical", 230],
	["エンベディング\nTitan Embeddings\nによる変換", 380],
	["ベクトルDB保存\nOpenSearch等\nへのインデックス", 530],
	["検索・生成\nRetrieve+\nGenerate API", 680],
]
	.map(
		([label, x]) => `
${rect(Number(x) - 65, 80, 130, 130, BOX)}
${label
	.split("\n")
	.map((line: string, j: number) =>
		text(
			Number(x),
			112 + j * 20,
			line,
			12,
			j === 0 ? ACC1 : TXT2,
			"middle",
			j === 0 ? "bold" : "normal",
		),
	)
	.join("")}
`,
	)
	.join("")}
${[0, 1, 2, 3].map((i) => arrow(145 + i * 150, 145, 165 + i * 150, 145)).join("")}
${text(400, 250, "チャンキング戦略: Fixed-size / Semantic（意味単位）/ Hierarchical（階層分割）", 13, TXT2, "middle")}
${text(400, 278, "API: RetrieveAndGenerate（引用付き回答）/ Retrieve（検索のみ）", 13, TXT, "middle")}
${text(400, 305, "データソース: S3 / Confluence / SharePoint / Salesforce / Web Crawler", 12, TXT2, "middle")}
`),

	// Slide 35: Bedrock Agents
	35: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "Bedrock Agents — 仕組み", 21, ACC1, "middle", "bold")}
${rect(50, 70, 700, 260, BOX)}
<rect x="50" y="70" width="700" height="6" fill="${ACC2}" rx="3"/>
${text(400, 110, "ReAct ループ", 18, ACC2, "middle", "bold")}
${[
	["Reasoning\n（推論）", "タスクを分析\n次のアクション決定", 170],
	["Action\n（実行）", "ActionGroup\nLambda API呼び出し", 380],
	["Observation\n（確認）", "結果を確認\n次のステップへ", 590],
]
	.map(
		([step, desc, x]) => `
${rect(Number(x) - 90, 130, 175, 130, "#0d2137")}
${step
	.split("\n")
	.map((line: string, j: number) =>
		text(
			Number(x) - 2,
			160 + j * 22,
			line,
			15,
			j === 0 ? ACC1 : TXT2,
			"middle",
			"bold",
		),
	)
	.join("")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(Number(x) - 2, 210 + j * 18, line, 11, TXT, "middle"),
	)
	.join("")}
`,
	)
	.join("")}
${arrow(270, 195, 290, 195)}
${arrow(480, 195, 500, 195)}
${text(400, 358, "Action Groups: OpenAPIスキーマで定義したAPIをFMが呼び出す（Lambda関数に接続）", 12, TXT2, "middle")}
${text(400, 378, "Return Control: エージェントが人間の確認を求めて一時停止できる", 12, TXT2, "middle")}
`),

	// Slide 37: Fine-tuning
	37: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "FM カスタマイズ手法の詳細", 20, ACC1, "middle", "bold")}
${[
	[
		"Prompt Engineering",
		"プロンプト最適化のみ\nモデル変更なし\n最速・最安",
		"#555",
		ACC2,
	],
	[
		"RAG",
		"外部知識ベース連携\nモデル変更なし\n最新情報対応",
		"#555",
		"#0d7377",
	],
	[
		"Fine-tuning",
		"入力/出力ペアで追加学習\nモデル重み更新\n特定タスク精度向上",
		"#555",
		"#6b2d8b",
	],
	[
		"Continued Pre-training",
		"ドメイン大量テキストで\n継続事前学習\n医療・法律・言語特化",
		"#555",
		"#1a6b3c",
	],
]
	.map(
		([method, desc, bg, color], i) => `
${rect(20 + i * 190, 70, 175, 260, BOX)}
<rect x="${20 + i * 190}" y="70" width="175" height="7" fill="${color}" rx="4"/>
${text(107 + i * 190, 110, String(method), 12, String(color), "middle", "bold")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(107 + i * 190, 145 + j * 22, line, 11, TXT, "middle"),
	)
	.join("")}
<rect x="${30 + i * 190}" y="250" width="155" height="30" fill="#0a0a1a" rx="4"/>
${text(107 + i * 190, 270, ["最安・最速", "中コスト", "高コスト", "最高コスト"][i], 12, String(color), "middle", "bold")}
`,
	)
	.join("")}
`),

	// Slide 38: Model Evaluation
	38: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Bedrock Model Evaluation", 21, ACC1, "middle", "bold")}
${rect(30, 70, 350, 270, BOX)}
<rect x="30" y="70" width="350" height="7" fill="${ACC2}" rx="4"/>
${text(205, 110, "自動評価（Automatic）", 16, TXT, "middle", "bold")}
${text(205, 138, "定義済みデータセットで自動採点", 13, TXT, "middle")}
${text(205, 165, "ROUGE: 要約品質", 12, TXT2, "middle")}
${text(205, 185, "BERTScore: 意味的類似度", 12, TXT2, "middle")}
${text(205, 205, "カスタム指標も設定可能", 12, TXT2, "middle")}
${text(205, 230, "用途: ベースモデル選択・FT効果測定", 12, ACC1, "middle")}
${rect(420, 70, 350, 270, BOX)}
<rect x="420" y="70" width="350" height="7" fill="#0d7377" rx="4"/>
${text(595, 110, "人手評価（Human）", 16, TXT, "middle", "bold")}
${text(595, 138, "人間が回答品質を採点", 13, TXT, "middle")}
${text(595, 165, "AWS Managed Team", 12, TXT2, "middle")}
${text(595, 185, "プライベートチーム選択可", 12, TXT2, "middle")}
${text(595, 205, "A/Bテスト形式も可能", 12, TXT2, "middle")}
${text(595, 230, "用途: プロンプト改善・FT品質確認", 12, ACC1, "middle")}
${text(400, 368, "CloudWatch統合: Bedrock APIのレイテンシー・スループット・エラー率をリアルタイム監視", 12, TXT2, "middle")}
`),

	// Slide 39: Domain3チェックリスト
	39: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Domain 3 — 重要ポイントまとめ", 20, ACC1, "middle", "bold")}
${[
	["Bedrock機能", "KB・Agents・Guardrails・Fine-tuningの全体像", ACC2],
	["RAGフロー", "クエリ→エンベディング→検索→コンテキスト付与→生成", "#0d7377"],
	[
		"カスタマイズ比較",
		"Prompt < RAG < Fine-tuning < Pre-training（コスト順）",
		"#6b2d8b",
	],
	["ベクトルDB選択", "OpenSearch / Aurora pgvectorと類似度計算手法", "#1a6b3c"],
	["Agents仕組み", "Action Groups・ReAct・Return Control・KB連携", "#b45309"],
]
	.map(
		([topic, detail, color], i) => `
${rect(60, 65 + i * 56, 680, 48, BOX)}
<rect x="60" y="${65 + i * 56}" width="6" height="48" fill="${color}" rx="3"/>
${text(110, 85 + i * 56, String(topic), 14, String(color), "start", "bold")}
${text(110, 103 + i * 56, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 41: 責任あるAI原則
	41: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "責任あるAI — 6つの原則", 21, ACC1, "middle", "bold")}
${[
	["公平性\nFairness", "全ユーザーへの公平な結果\n差別・偏見の防止", ACC2],
	[
		"説明可能性\nExplainability",
		"予測根拠を人間が理解\nブラックボックス解消",
		"#0d7377",
	],
	[
		"プライバシー\nPrivacy & Security",
		"個人データ保護・最小化\nGDPR準拠",
		"#6b2d8b",
	],
	["安全性\nSafety", "有害コンテンツ防止\nGuardrails活用", "#1a6b3c"],
	[
		"制御可能性\nControllability",
		"人間が監視・制御・修正\nHITLの組み込み",
		"#b45309",
	],
	["正確性\nVeracity", "ハルシネーション最小化\nRAG・Grounding", ACC1],
]
	.map(
		([label, desc, color], i) => `
${rect(20 + (i % 3) * 255, 70 + Math.floor(i / 3) * 135, 240, 115, BOX)}
<rect x="${20 + (i % 3) * 255}" y="${70 + Math.floor(i / 3) * 135}" width="240" height="7" fill="${color}" rx="4"/>
${label
	.split("\n")
	.map((line: string, j: number) =>
		text(
			140 + (i % 3) * 255,
			105 + j * 20 + Math.floor(i / 3) * 135,
			line,
			j === 0 ? 14 : 11,
			j === 0 ? String(color) : TXT2,
			"middle",
			j === 0 ? "bold" : "normal",
		),
	)
	.join("")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(
			140 + (i % 3) * 255,
			153 + j * 18 + Math.floor(i / 3) * 135,
			line,
			11,
			TXT,
			"middle",
		),
	)
	.join("")}
`,
	)
	.join("")}
`),

	// Slide 43: XAI説明可能性
	43: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "説明可能AI（XAI）— 手法比較", 20, ACC1, "middle", "bold")}
${[
	[
		"SHAP",
		"SHapley Additive Explanations",
		"ゲーム理論ベース\n全特徴量の貢献を公平配分\nSageMaker Clarifyが採用",
		ACC2,
	],
	[
		"LIME",
		"Local Interpretable\nModel-agnostic Explanations",
		"局所線形モデルで近似\n個別予測の説明\nClarifyでは非対応",
		"#0d7377",
	],
	[
		"Feature Importance",
		"特徴量重要度ランキング\n(グローバル解釈)",
		"ランダムフォレスト等\nモデル全体の傾向\n快速・シンプル",
		"#6b2d8b",
	],
]
	.map(
		([name, subtitle, desc, color], i) => `
${rect(30 + i * 255, 75, 230, 250, BOX)}
<rect x="${30 + i * 255}" y="75" width="230" height="7" fill="${color}" rx="4"/>
${text(145 + i * 255, 110, String(name), 18, String(color), "middle", "bold")}
${subtitle
	.split("\n")
	.map((line: string, j: number) =>
		text(145 + i * 255, 132 + j * 17, line, 11, TXT2, "middle"),
	)
	.join("")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(145 + i * 255, 187 + j * 20, line, 11, TXT, "middle"),
	)
	.join("")}
`,
	)
	.join("")}
${text(400, 365, "試験ポイント: LIME は Clarify でサポートされていない！", 13, ACC2, "middle", "bold")}
`),

	// Slide 44: SageMaker Clarify
	44: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "SageMaker Clarify — 機能概要", 20, ACC1, "middle", "bold")}
${rect(30, 65, 340, 260, BOX)}
<rect x="30" y="65" width="340" height="7" fill="${ACC2}" rx="4"/>
${text(200, 103, "バイアス検出", 16, TXT, "middle", "bold")}
${text(200, 128, "【事前学習】データセット内のバイアス", 12, TXT, "middle")}
${text(200, 150, "CI(Class Imbalance)・DPL・KL等の指標", 12, TXT2, "middle")}
${text(200, 180, "【事後学習】モデル予測のバイアス", 12, TXT, "middle")}
${text(200, 200, "DI・DPPL・RD等の公平性指標を算出", 12, TXT2, "middle")}
${text(200, 230, "SageMaker Studio上でレポート自動生成", 12, ACC1, "middle")}
${rect(430, 65, 340, 260, BOX)}
<rect x="430" y="65" width="340" height="7" fill="#0d7377" rx="4"/>
${text(600, 103, "説明可能性（SHAP）", 16, TXT, "middle", "bold")}
${text(600, 128, "特徴量重要度（グローバル）", 12, TXT, "middle")}
${text(600, 150, "訓練データ全体での特徴量ランキング", 12, TXT2, "middle")}
${text(600, 180, "個別予測説明（ローカル）", 12, TXT, "middle")}
${text(600, 200, "特定予測への各特徴量の貢献度", 12, TXT2, "middle")}
${text(600, 230, "Pipelines・Monitor統合で継続監視", 12, ACC1, "middle")}
`),

	// Slide 45: HITL
	45: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "ヒューマンインザループ (HITL) 設計", 20, ACC1, "middle", "bold")}
${rect(50, 70, 700, 100, BOX)}
${text(400, 110, "AIの判断フロー", 15, TXT2, "middle", "bold")}
${rect(100, 200, 130, 80, "#1e3a5f")}
${text(165, 240, "AIによる予測", 13, TXT, "middle")}
${rect(310, 200, 130, 80, "#1e3a5f")}
${text(375, 232, "信頼スコア", 13, TXT, "middle")}
${text(375, 252, "の評価", 13, TXT, "middle")}
${rect(520, 160, 180, 60, BOX)}
<rect x="520" y="160" width="180" height="5" fill="#1a6b3c" rx="3"/>
${text(610, 190, "高信頼度→自動承認", 12, TXT, "middle")}
${rect(520, 240, 180, 60, BOX)}
<rect x="520" y="240" width="180" height="5" fill="${ACC2}" rx="3"/>
${text(610, 270, "低信頼度→人間レビュー", 12, TXT, "middle")}
${arrow(230, 240, 310, 240)}
${arrow(440, 220, 520, 200)}
${arrow(440, 260, 520, 260)}
${text(400, 348, "AWS実装: Amazon A2I / SageMaker Ground Truth Plus / Bedrock Return Control", 12, TXT2, "middle")}
`),

	// Slide 46: Domain4チェックリスト
	46: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Domain 4 — 重要ポイントまとめ", 20, ACC1, "middle", "bold")}
${[
	[
		"責任あるAI6原則",
		"公平性・説明可能性・プライバシー・安全性・制御・正確性",
		ACC2,
	],
	["バイアスの種類", "学習データ/選択/測定/確認バイアスと対策", "#0d7377"],
	["Clarifyの機能", "バイアス検出（事前・事後）とSHAP値の提供", "#6b2d8b"],
	["HITL実装", "A2I・Ground Truth Plus・Bedrock Return Control", "#1a6b3c"],
	[
		"XAI手法の違い",
		"SHAP（Clarify採用）・LIME（非対応）・Feature Importance",
		"#b45309",
	],
]
	.map(
		([topic, detail, color], i) => `
${rect(60, 65 + i * 56, 680, 48, BOX)}
<rect x="60" y="${65 + i * 56}" width="6" height="48" fill="${color}" rx="3"/>
${text(110, 85 + i * 56, String(topic), 14, String(color), "start", "bold")}
${text(110, 103 + i * 56, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 48: Bedrockセキュリティ
	48: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Bedrock セキュリティ設計", 21, ACC1, "middle", "bold")}
${[
	["IAM最小権限", "bedrock:InvokeModel等アクション単位で権限設定", ACC2],
	[
		"VPC PrivateLink",
		"パブリックインターネットを介さずBedrock APIを処理",
		"#0d7377",
	],
	[
		"AWS KMS暗号化",
		"S3学習データ・モデル・Knowledge Basesコンテンツを暗号化",
		"#6b2d8b",
	],
	[
		"CloudTrail監査",
		"全Bedrock/SageMaker APIコールを完全記録・監査",
		"#1a6b3c",
	],
	[
		"Amazon Macie",
		"S3の学習データ・ドキュメントのPIIを自動検出・通知",
		"#b45309",
	],
]
	.map(
		([service, desc, color], i) => `
${rect(60, 65 + i * 54, 680, 46, BOX)}
<circle cx="95" cy="${88 + i * 54}" r="16" fill="${color}"/>
${text(95, 94 + i * 54, String(i + 1), 14, TXT, "middle", "bold")}
${text(130, 84 + i * 54, String(service), 14, String(color), "start", "bold")}
${text(130, 103 + i * 54, String(desc), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 49: Guardrails詳細
	49: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "Bedrock Guardrails — 4つの主要機能", 20, ACC1, "middle", "bold")}
${[
	["コンテンツフィルタ", "暴力/性的/ヘイト/侮辱\nNone/Low/Medium/High", ACC2],
	[
		"トピックの拒否",
		"競合製品・政治・法律など\n指定トピックへの回答を禁止",
		"#0d7377",
	],
	["PII保護", "氏名/メール/電話等を自動検出\nBLOCKまたはANONYMIZE", "#6b2d8b"],
	[
		"Groundingチェック",
		"RAGの回答がソースに基づくか\nハルシネーション検出・ブロック",
		"#1a6b3c",
	],
]
	.map(
		([title, desc, color], i) => `
${rect(20 + (i % 2) * 390, 75 + Math.floor(i / 2) * 150, 370, 130, BOX)}
<rect x="${20 + (i % 2) * 390}" y="${75 + Math.floor(i / 2) * 150}" width="370" height="7" fill="${color}" rx="4"/>
${text(205 + (i % 2) * 390, 110 + Math.floor(i / 2) * 150, String(title), 16, String(color), "middle", "bold")}
${desc
	.split("\n")
	.map((line: string, j: number) =>
		text(
			205 + (i % 2) * 390,
			135 + j * 22 + Math.floor(i / 2) * 150,
			line,
			12,
			TXT,
			"middle",
		),
	)
	.join("")}
`,
	)
	.join("")}
`),

	// Slide 51: データガバナンス
	51: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "AI データガバナンス フレームワーク", 20, ACC1, "middle", "bold")}
${[
	["データ分類", "Public / Internal / Confidential / Restricted", ACC2],
	["PII取り扱い", "GDPR準拠・収集最小化・目的外禁止・削除権", "#0d7377"],
	["品質管理", "データリネージ・バージョン管理・品質スコア", "#6b2d8b"],
	["Feature Store", "特徴量の統合管理・バージョニング（SageMaker）", "#1a6b3c"],
	["AWS Artifact", "SOC2/ISO27001/HIPAAコンプライアンスレポート", "#b45309"],
]
	.map(
		([category, detail, color], i) => `
${rect(60, 65 + i * 54, 680, 46, BOX)}
<rect x="60" y="${65 + i * 54}" width="6" height="46" fill="${color}" rx="3"/>
${text(110, 84 + i * 54, String(category), 14, String(color), "start", "bold")}
${text(110, 102 + i * 54, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 52: IAM最小権限
	52: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "IAM と最小権限設計 — Bedrock", 20, ACC1, "middle", "bold")}
${rect(30, 70, 730, 60, BOX)}
${text(400, 92, "最小権限の原則: 必要最低限の権限のみ付与。「*」ワイルドカードを避ける", 14, TXT2, "middle")}
${text(400, 112, "リソースポリシー: 特定のモデルARNにのみアクセスを許可（Cross-Account設定も可能）", 12, TXT, "middle")}
${[
	["bedrock:InvokeModel", "モデル呼び出し権限", "基本的な推論処理"],
	["bedrock:InvokeAgent", "Agent実行権限", "Agents機能の利用"],
	["bedrock:CreateKnowledgeBase", "KB作成権限", "Knowledge Bases管理"],
	["bedrock:RetrieveAndGenerate", "RAG回答生成権限", "KBからの検索・生成"],
]
	.map(
		([action, purpose, note], i) => `
${rect(30, 150 + i * 48, 740, 40, BOX)}
${text(310, 168 + i * 48, String(action), 13, ACC1, "start")}
${text(520, 168 + i * 48, String(purpose), 12, TXT, "start")}
${text(660, 168 + i * 48, String(note), 11, TXT2, "start")}
`,
	)
	.join("")}
`),

	// Slide 53: Domain5チェックリスト
	53: svg(`
${rect(0, 0, 800, 380, BG, 0)}
${text(400, 32, "Domain 5 — 重要ポイントまとめ", 20, ACC1, "middle", "bold")}
${[
	[
		"Guardrails機能",
		"コンテンツフィルタ・トピック拒否・PII保護・Grounding",
		ACC2,
	],
	["VPC PrivateLink", "Bedrock閉域アクセス設計の理解", "#0d7377"],
	["共有責任モデル", "AIワークロードの顧客/AWS責任境界", "#6b2d8b"],
	[
		"IAM最小権限",
		"アクション単位の権限制御（bedrock:InvokeModel等）",
		"#1a6b3c",
	],
	["CloudTrail監査", "Bedrock API監査ログの有効化と活用方法", "#b45309"],
]
	.map(
		([topic, detail, color], i) => `
${rect(60, 65 + i * 56, 680, 48, BOX)}
<rect x="60" y="${65 + i * 56}" width="6" height="48" fill="${color}" rx="3"/>
${text(110, 85 + i * 56, String(topic), 14, String(color), "start", "bold")}
${text(110, 103 + i * 56, String(detail), 12, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 54: 試験頻出パターン
	54: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "試験頻出パターン — 解き方のコツ", 20, ACC1, "middle", "bold")}
${[
	[
		"最適なサービス系",
		"RAG必要→Bedrock KB / 画像分析→Rekognition / NLP→Comprehend",
		ACC2,
	],
	[
		"コスト効率系",
		"Prompt < RAG < Fine-tuning < Pre-training の順でコスト上昇",
		"#0d7377",
	],
	[
		"ハルシネーション軽減",
		"RAG（Knowledge Bases）+ Guardrails（Groundingチェック）",
		"#6b2d8b",
	],
	[
		"セキュリティ確保",
		"最小権限IAM + VPCエンドポイント + KMS暗号化 + CloudTrail",
		"#1a6b3c",
	],
	[
		"責任あるAI",
		"Clarifyでバイアス検出 + Guardrailsでコンテンツ制御 + HITL",
		"#b45309",
	],
	["社内データ対応", "Fine-tuningは不正解! RAG（Knowledge Bases）が正解", ACC1],
]
	.map(
		([pattern, answer, color], i) => `
${rect(50, 60 + i * 52, 700, 44, BOX)}
<rect x="50" y="${60 + i * 52}" width="5" height="44" fill="${color}" rx="2"/>
${text(100, 78 + i * 52, String(pattern), 13, String(color), "start", "bold")}
${text(100, 95 + i * 52, "→ " + String(answer), 11, TXT, "start")}
`,
	)
	.join("")}
`),

	// Slide 57: まとめ
	57: svg(`
${rect(0, 0, 800, 400, BG, 0)}
${text(400, 32, "試験合格への最重要ポイント", 21, ACC1, "middle", "bold")}
${[
	[
		"Domain 1\n(20%)",
		"MLの種類・F1/AUC-ROC\nSageMakerコンポーネント",
		"#555",
		100,
	],
	[
		"Domain 2\n(24%)",
		"FMの仕組み・プロンプト技法\nハルシネーション対策",
		"#555",
		220,
	],
	["Domain 3\n(28%)★", "Bedrock全機能\nRAGの詳細フロー必須", ACC2, 340],
	["Domain 4\n(14%)", "責任あるAI6原則\nClarify・HITL", "#555", 460],
	["Domain 5\n(14%)", "セキュリティ設計\nGuardrails・共有責任", "#555", 580],
]
	.map(
		([domain, points, highlight, x]) => `
${rect(Number(x) - 80, 65, 160, 260, BOX)}
<rect x="${Number(x) - 80}" y="65" width="160" height="8" fill="${highlight === "#555" ? highlight : highlight}" rx="4"/>
${domain
	.split("\n")
	.map((line: string, j: number) =>
		text(
			Number(x),
			98 + j * 22,
			line,
			14,
			highlight === "#555" ? TXT : ACC1,
			"middle",
			"bold",
		),
	)
	.join("")}
${points
	.split("\n")
	.map((line: string, j: number) =>
		text(Number(x), 158 + j * 22, line, 11, TXT, "middle"),
	)
	.join("")}
`,
	)
	.join("")}
${text(400, 368, "合格の鍵: 各サービスの「なぜそれを使うか」を実践的に理解し、Bedrockを実際に操作すること", 12, TXT2, "middle")}
`),
};

// Load and patch
const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
let patchCount = 0;

for (const [idxStr, svgContent] of Object.entries(svgMap)) {
	const idx = Number(idxStr);
	const slide = data.slides[idx];
	if (!slide) continue;
	// Skip slides that already reference an assets/ SVG
	if (slide.content?.some((c: string) => c.includes("assets/"))) continue;
	// Prepend SVG as first content item
	slide.content = [svgContent, ...(slide.content || [])];
	patchCount++;
}

writeFileSync(DATA_PATH, JSON.stringify(data, null, "\t"));
console.log(`Patched ${patchCount} slides with inline SVGs`);

// Count total slides with SVG
const svgSlides = data.slides.filter((s: { content?: string[] }) =>
	s.content?.some((c: string) => c.includes("<svg") || c.includes("assets/")),
).length;
console.log(
	`Total slides with SVG: ${svgSlides}/${data.slides.length} (${Math.round((svgSlides / data.slides.length) * 100)}%)`,
);
