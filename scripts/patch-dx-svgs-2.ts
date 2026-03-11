#!/usr/bin/env bun
/**
 * Patch script 2: Add more SVG diagrams to AWS Direct Connect presentation
 * Targeting slides that don't have SVGs yet
 */

import { readFileSync, writeFileSync } from "node:fs";

const FILE =
	"/workspace/main/docs/20260217133338_aws-direct-connect-guide/slides-data.json";
const data = JSON.parse(readFileSync(FILE, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const GRN = "#4caf50";
const PRP = "#9c27b0";

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

const svgs: Record<number, string> = {};

// [4] DX の主なユースケース
svgs[4] = svgWrap(
	`
  ${lbl(400, 28, "DX 主なユースケース", ACC1, 18, "bold")}
  ${box(30, 65, 220, 75, "#1b3a4b", "ハイブリッドクラウド", "DC ↔ AWS 安定接続")}
  ${box(290, 65, 220, 75, "#1a3a1a", "大容量データ転送", "TB 級 バックアップ/DR")}
  ${box(550, 65, 220, 75, "#2a1a4a", "低レイテンシ接続", "金融・HFT・ゲーム")}
  ${box(30, 195, 220, 75, BOX, "コンプライアンス", "規制環境でのクラウド利用")}
  ${box(290, 195, 220, 75, BOX, "マルチリージョン", "DXGW で複数拠点接続")}
  ${box(550, 195, 220, 75, BOX, "SaaS 閉域接続", "Hosted VIF 経由")}
  ${lbl(400, 325, "DX は可用性 / 帯域 / セキュリティ の三拍子が揃う", GRN, 13)}
`,
	370,
);

// [6] DX ロケーションとパートナー
svgs[6] = svgWrap(
	`
  ${lbl(400, 28, "DX ロケーションとパートナー", ACC1, 18, "bold")}
  ${box(30, 70, 180, 70, "#1b3a4b", "Dedicated", "AWS DX ロケーション直接")}
  ${box(240, 70, 180, 70, "#2a1a4a", "Hosted", "APN パートナー経由")}
  ${box(450, 70, 300, 70, BOX, "東京: Equinix TY4 / Colt Shinagawa など", "", 12)}
  ${box(30, 200, 720, 65, "#1b3a4b", "APN パートナー: NTT / KDDI / SoftBank / Colt / Megaport 等", "", 13)}
  ${lbl(400, 330, "ロケーション → aws.amazon.com/directconnect/locations で確認", GRN, 12)}
`,
	370,
);

// [8] 物理接続のコンポーネント
svgs[8] = svgWrap(
	`
  ${lbl(400, 28, "物理接続コンポーネント詳細", ACC1, 18, "bold")}
  ${box(30, 70, 170, 65, BOX, "顧客ルータ", "BGP 対応")}
  ${arrow(200, 102, 270, 102)}
  ${box(270, 70, 170, 65, "#1b3a4b", "Cross Connect", "MMR 内パッチ")}
  ${arrow(440, 102, 510, 102)}
  ${box(510, 70, 170, 65, "#1b3a4b", "AWS DX Router", "")}
  ${arrow(680, 102, 750, 102)}
  ${box(750, 70, 40, 65, BOX, "AWS", "")}
  ${box(30, 215, 170, 60, "#2a1a4a", "LOA-CFA", "承認書")}
  ${box(230, 215, 170, 60, "#1a3a1a", "VLAN 802.1Q", "タグ多重化")}
  ${box(430, 215, 170, 60, "#1a3a1a", "BGP セッション", "経路交換")}
  ${box(630, 215, 140, 60, "#1b3a4b", "BFD", "高速障害検出")}
`,
	320,
);

// [11] Dedicated vs Hosted 比較表
svgs[11] = svgWrap(
	`
  ${lbl(400, 28, "Dedicated vs Hosted 比較", ACC1, 18, "bold")}
  ${box(30, 65, 340, 55, "#1b3a4b", "Dedicated Connection", "", 14)}
  ${box(430, 65, 340, 55, "#2a1a4a", "Hosted Connection", "", 14)}
  ${box(30, 135, 155, 50, "#1a3a1a", "帯域: 1/10/100G", "", 12)}
  ${box(195, 135, 175, 50, "#1a3a1a", "LOA-CFA 必要", "", 12)}
  ${box(430, 135, 155, 50, "#1a3a1a", "50M〜10G 可変", "", 12)}
  ${box(595, 135, 175, 50, "#1a3a1a", "LOA-CFA 不要", "", 12)}
  ${box(30, 200, 155, 50, "#1a3a1a", "直接 AWS 申請", "", 12)}
  ${box(195, 200, 175, 50, "#2a1a2a", "AWS との SLA", "", 12)}
  ${box(430, 200, 155, 50, "#2a1a4a", "パートナー申請", "", 12)}
  ${box(595, 200, 175, 50, "#1a3a1a", "迅速プロビジョン", "", 12)}
  ${lbl(400, 310, "Dedicated: 大企業向け / Hosted: 中小・迅速導入向け", GRN, 13)}
`,
	360,
);

// [13] 接続確立フロー
svgs[13] = svgWrap(
	`
  ${lbl(400, 28, "DX 接続確立フロー", ACC1, 18, "bold")}
  ${box(50, 70, 130, 55, "#2a1a4a", "① 申請", "AWSコンソール")}
  ${arrow(180, 97, 230, 97)}
  ${box(230, 70, 130, 55, "#1b3a4b", "② LOA-CFA", "発行 (数時間)")}
  ${arrow(360, 97, 410, 97)}
  ${box(410, 70, 130, 55, "#1b3a4b", "③ Cross\nConnect", "ロケーション")}
  ${arrow(540, 97, 590, 97)}
  ${box(590, 70, 130, 55, "#1a3a1a", "④ VIF 作成", "コンソール")}
  ${arrow(400, 125, 400, 185)}
  ${box(300, 185, 200, 55, "#1a3a1a", "⑤ BGP セッション確立", "", 13)}
  ${arrow(400, 240, 400, 295)}
  ${box(300, 295, 200, 55, "#2a1a4a", "⑥ 通信開始", "", 13)}
  ${lbl(400, 390, "Dedicated: 数日〜数週間 / Hosted: 数分〜数時間", GRN, 13)}
`,
	430,
);

// [15] VIF とは何か
svgs[15] = svgWrap(
	`
  ${lbl(400, 28, "VIF (Virtual Interface) とは何か", ACC1, 18, "bold")}
  ${box(30, 75, 200, 75, BOX, "物理接続 (1本)", "1G / 10G / 100G")}
  ${arrow(230, 112, 300, 112)}
  ${box(300, 60, 200, 110, "#1b3a4b", "802.1Q VLAN 多重化", "複数 VIF を収容")}
  ${arrow(500, 95, 560, 75)}
  ${arrow(500, 112, 560, 112)}
  ${arrow(500, 130, 560, 150)}
  ${box(560, 55, 200, 55, "#1a3a1a", "Private VIF #1", "")}
  ${box(560, 120, 200, 55, "#1a3a1a", "Public VIF #2", "")}
  ${box(560, 185, 200, 55, "#2a1a4a", "Transit VIF #3", "")}
  ${lbl(400, 300, "1 物理接続で最大 50 VIF (Dedicated) / 1 VIF (Hosted)", GRN, 13)}
`,
	350,
);

// [17] VLAN タグと BGP
svgs[17] = svgWrap(
	`
  ${lbl(400, 28, "VLAN タグと BGP セッション", ACC1, 18, "bold")}
  ${box(30, 75, 180, 70, BOX, "顧客ルータ", "VLAN 100/200")}
  <line x1="210" y1="100" x2="310" y2="100" stroke="${GRN}" stroke-width="3"/>
  ${lbl(260, 88, "VLAN 100", GRN, 11)}
  <line x1="210" y1="125" x2="310" y2="125" stroke="${ACC2}" stroke-width="3" stroke-dasharray="8,4"/>
  ${lbl(260, 138, "VLAN 200", ACC2, 11)}
  ${box(310, 60, 200, 110, "#1b3a4b", "AWS DX\nVLAN 分離")}
  ${arrow(510, 95, 580, 80)}
  ${arrow(510, 125, 580, 145)}
  ${box(580, 60, 190, 55, "#1a3a1a", "BGP AS 65001", "Private VIF")}
  ${box(580, 130, 190, 55, "#2a1a4a", "BGP AS 65002", "Public VIF")}
  ${lbl(400, 270, "各 VIF で独立した BGP セッションを確立", ACC1, 13)}
`,
	320,
);

// [18] VIF 作成パラメータ
svgs[18] = svgWrap(
	`
  ${lbl(400, 28, "VIF 作成時の主要パラメータ", ACC1, 18, "bold")}
  ${box(30, 70, 340, 55, "#1b3a4b", "VLAN ID (100〜4094)", "物理回線内の識別子")}
  ${box(430, 70, 340, 55, "#1b3a4b", "BGP ASN", "顧客側 AS番号 (Private: 64512〜65534)")}
  ${box(30, 155, 340, 55, "#1a3a1a", "BGP Auth Key", "MD5 認証キー")}
  ${box(430, 155, 340, 55, "#1a3a1a", "Amazon IP / Customer IP", "BGP ピアアドレス")}
  ${box(30, 240, 340, 55, "#2a1a4a", "MTU", "1500 or 9001 (Jumbo)")}
  ${box(430, 240, 340, 55, "#2a1a4a", "Jumbo Frame 有効化", "スループット向上")}
  ${lbl(400, 350, "パラメータは変更不可のものが多い → 設計フェーズで確定", ACC2, 13)}
`,
	400,
);

// [19] VIF と接続先
svgs[19] = svgWrap(
	`
  ${lbl(400, 28, "VIF と接続先の対応関係", ACC1, 18, "bold")}
  ${box(30, 70, 200, 70, "#1b3a4b", "Private VIF", "")}
  ${arrow(230, 105, 300, 105)}
  ${box(300, 70, 180, 70, "#1a3a1a", "VGW", "同リージョン VPC")}
  ${lbl(600, 105, "または DXGW", TXT, 12)}
  ${box(30, 190, 200, 70, "#2a1a4a", "Transit VIF", "")}
  ${arrow(230, 225, 300, 225)}
  ${box(300, 190, 180, 70, "#2a1a4a", "DX Gateway", "必須")}
  ${arrow(480, 225, 550, 225)}
  ${box(550, 190, 120, 70, "#1b3a4b", "TGW", "")}
  ${box(30, 310, 200, 70, "#1b3a4b", "Public VIF", "")}
  ${arrow(230, 345, 300, 345)}
  ${box(300, 310, 470, 70, "#1a3a1a", "AWS パブリックサービス エンドポイント", "", 13)}
`,
	430,
);

// [20] VIF 種別 完全比較
svgs[20] = svgWrap(
	`
  ${lbl(400, 28, "VIF 種別 完全比較", ACC1, 18, "bold")}
  ${lbl(175, 65, "Private VIF", ACC1, 13, "bold")}
  ${lbl(400, 65, "Public VIF", ACC2, 13, "bold")}
  ${lbl(625, 65, "Transit VIF", PRP, 13, "bold")}
  ${box(30, 85, 290, 50, "#1b3a4b", "VPC 直接接続 / プライベートIP", "", 12)}
  ${box(350, 85, 100, 50, "#1b3a4b", "AWS Svc / パブリックIP", "", 11)}
  ${box(480, 85, 290, 50, "#2a1a4a", "TGW 経由 / マルチVPC", "", 12)}
  ${box(30, 150, 290, 50, "#1a3a1a", "接続先: VGW or DXGW", "", 12)}
  ${box(350, 150, 100, 50, "#1a3a1a", "接続先: AWS EP", "", 11)}
  ${box(480, 150, 290, 50, "#1a3a1a", "接続先: DXGW → TGW", "", 12)}
  ${box(30, 215, 290, 50, BOX, "用途: DC-VPC 閉域", "", 12)}
  ${box(350, 215, 100, 50, BOX, "用途: S3 API 閉域", "", 11)}
  ${box(480, 215, 290, 50, BOX, "用途: 多拠点 大規模", "", 12)}
`,
	310,
);

// [22] Private VIF の概要
svgs[22] = svgWrap(
	`
  ${lbl(400, 28, "Private VIF 概要", ACC1, 18, "bold")}
  ${box(30, 75, 170, 75, BOX, "顧客 DC", "プライベートIP")}
  ${arrow(200, 112, 280, 112)}
  ${box(280, 75, 190, 75, "#1b3a4b", "Private VIF", "RFC1918 アドレス")}
  ${arrow(470, 112, 540, 100)}
  ${arrow(470, 130, 540, 155)}
  ${box(540, 75, 230, 55, "#1a3a1a", "VGW → 同リージョン VPC", "", 12)}
  ${box(540, 145, 230, 55, "#2a1a4a", "DXGW → 他リージョン VPC", "", 12)}
  ${box(30, 260, 740, 65, BOX, "インターネットを通らない → セキュア / 低レイテンシ / 安定帯域", "", 13)}
`,
	370,
);

// [24] VGW
svgs[24] = svgWrap(
	`
  ${lbl(400, 28, "Virtual Private Gateway (VGW)", ACC1, 18, "bold")}
  ${box(30, 75, 170, 70, BOX, "DX Location", "")}
  ${arrow(200, 110, 280, 110)}
  ${box(280, 75, 190, 70, "#1b3a4b", "Private VIF", "")}
  ${arrow(470, 110, 550, 110)}
  ${box(550, 60, 200, 100, "#1a3a1a", "VGW", "リージョン内 VPC ゲートウェイ")}
  ${arrow(650, 160, 650, 225)}
  ${box(550, 225, 200, 60, BOX, "VPC (同リージョン)", "")}
  ${lbl(400, 340, "VGW は 1 リージョン / 単一 VPC のみ。複数VPC → DXGW 使用", ACC2, 13)}
`,
	390,
);

// [25] VGW 制約
svgs[25] = svgWrap(
	`
  ${lbl(400, 28, "VGW の制約事項", ACC2, 18, "bold")}
  ${box(30, 75, 340, 75, "#2a1a2a", "制約 1: 単一 VPC のみ", "1 VGW = 1 VPC に限定")}
  ${box(430, 75, 340, 75, "#2a1a2a", "制約 2: 同リージョンのみ", "クロスリージョン不可")}
  ${box(30, 205, 340, 75, "#2a1a2a", "制約 3: クロスアカウント制限", "別アカウント VPC への接続困難")}
  ${box(430, 205, 340, 75, "#1a3a1a", "解決策: DX Gateway", "マルチVPC / マルチリージョン対応")}
  ${lbl(400, 340, "大規模構成では VGW より DX Gateway を推奨", GRN, 13)}
`,
	390,
);

// [29] Private VIF BGP ルーティング 1
svgs[29] = svgWrap(
	`
  ${lbl(400, 28, "BGP ルーティング基礎 (Private VIF)", ACC1, 18, "bold")}
  ${box(30, 75, 180, 70, BOX, "顧客 BGP", "AS 65001")}
  <line x1="210" y1="110" x2="370" y2="110" stroke="${ACC1}" stroke-width="2.5"/>
  <polygon points="370,110 358,104 358,116" fill="${ACC1}"/>
  ${lbl(290, 97, "顧客プレフィックス広報", GRN, 11)}
  <line x1="370" y1="120" x2="210" y2="120" stroke="${ACC2}" stroke-width="2.5" stroke-dasharray="6,3"/>
  ${lbl(290, 133, "AWS プレフィックス受信", ACC2, 11)}
  ${box(370, 75, 180, 70, "#1b3a4b", "AWS BGP", "AS 7224")}
  ${arrow(550, 110, 620, 110)}
  ${box(620, 75, 150, 70, "#1a3a1a", "VGW / VPC", "")}
  ${lbl(400, 230, "BGP コミュニティ / MED / AS-PATH で経路制御", GRN, 13)}
`,
	290,
);

// [30] Private VIF BGP 2
svgs[30] = svgWrap(
	`
  ${lbl(400, 28, "BGP 経路優先度制御", ACC1, 18, "bold")}
  ${box(30, 75, 200, 70, BOX, "DX Primary", "BGP MED=100")}
  ${box(30, 200, 200, 70, "#2a1a2a", "VPN Backup", "BGP MED=200")}
  ${arrow(230, 110, 310, 155)}
  ${arrow(230, 235, 310, 195)}
  ${box(310, 155, 180, 60, "#1b3a4b", "VGW", "経路選択")}
  ${arrow(490, 185, 570, 185)}
  ${box(570, 155, 200, 60, "#1a3a1a", "VPC", "")}
  ${lbl(400, 310, "MED が小さい方が優先 → DX が常に優先, VPN はフェイルオーバー", GRN, 13)}
`,
	370,
);

// [34] Public VIF 概要
svgs[34] = svgWrap(
	`
  ${lbl(400, 28, "Public VIF 概要", ACC2, 18, "bold")}
  ${box(30, 75, 170, 70, BOX, "顧客 DC", "プライベート環境")}
  ${arrow(200, 110, 280, 110)}
  ${box(280, 75, 170, 70, "#1b3a4b", "Public VIF", "AWS パブリック IP")}
  ${arrow(450, 110, 530, 110)}
  ${box(530, 55, 230, 120, "#1b3a1b", "S3 / EC2 API\nRoute53 / SQS\nCloudFront ...", "", 12)}
  ${lbl(400, 280, "パブリック AS プレフィックス (AWS: 7224) を BGP で受信", GRN, 13)}
`,
	340,
);

// [36] アクセス可能サービス一覧
svgs[36] = svgWrap(
	`
  ${lbl(400, 28, "Public VIF でアクセス可能な AWS サービス", ACC2, 18, "bold")}
  ${box(30, 70, 220, 60, "#1b3a1b", "ストレージ", "S3 / EFS / Glacier")}
  ${box(290, 70, 220, 60, "#1b3a1b", "データベース", "DynamoDB / RDS API")}
  ${box(550, 70, 220, 60, "#1b3a1b", "コンピュート", "EC2 API / ECS")}
  ${box(30, 175, 220, 60, "#1b3a1b", "メッセージング", "SQS / SNS / SES")}
  ${box(290, 175, 220, 60, "#1b3a1b", "セキュリティ", "IAM / KMS / Secrets")}
  ${box(550, 175, 220, 60, "#1b3a1b", "監視/運用", "CloudWatch / CloudTrail")}
  ${box(30, 280, 220, 60, "#1b3a1b", "ネットワーク", "Route53 / CloudFront")}
  ${box(290, 280, 220, 60, "#1b3a1b", "分析", "Athena / EMR / Glue")}
  ${box(550, 280, 220, 60, "#1b3a1b", "AI/ML", "Bedrock / SageMaker")}
`,
	380,
);

// [37] Public VIF BGP
svgs[37] = svgWrap(
	`
  ${lbl(400, 28, "Public VIF BGP 経路制御", ACC2, 18, "bold")}
  ${box(30, 75, 180, 70, BOX, "顧客 AS", "65001")}
  ${arrow(210, 110, 290, 110)}
  ${box(290, 75, 200, 70, "#1b3a4b", "AWS BGP AS 7224", "")}
  ${arrow(490, 110, 570, 100)}
  ${arrow(490, 120, 570, 145)}
  ${box(570, 75, 200, 55, "#1b3a1b", "AWS IP プレフィックス 広報", "", 12)}
  ${box(570, 145, 200, 55, "#1b3a1b", "顧客 IP → AWS へ広報", "", 12)}
  ${lbl(400, 290, "BGP コミュニティ 7224:9300 で地域フィルタリング可能", GRN, 13)}
`,
	340,
);

// [38] Public VIF ユースケース
svgs[38] = svgWrap(
	`
  ${lbl(400, 28, "Public VIF ユースケース", ACC2, 18, "bold")}
  ${box(30, 75, 220, 80, "#1b3a4b", "S3 大容量転送", "100G DX 経由で高速 backup")}
  ${box(290, 75, 220, 80, "#1a3a1a", "EC2 API 閉域", "インターネット使わず管理")}
  ${box(550, 75, 220, 80, "#2a1a4a", "CloudFront Origin", "オリジンへ閉域")}
  ${box(30, 210, 220, 80, BOX, "SQS/SNS 閉域", "内部通知を安全に")}
  ${box(290, 210, 220, 80, BOX, "KMS 閉域", "暗号化キー操作")}
  ${box(550, 210, 220, 80, BOX, "Bedrock 閉域", "AI API 閉域呼び出し")}
  ${lbl(400, 350, "インターネット経由ゼロ → セキュリティポリシー準拠", GRN, 13)}
`,
	400,
);

// [40] Transit VIF 概要
svgs[40] = svgWrap(
	`
  ${lbl(400, 28, "Transit VIF 概要", PRP, 18, "bold")}
  ${box(30, 75, 170, 70, BOX, "顧客 DC", "")}
  ${arrow(200, 110, 280, 110)}
  ${box(280, 75, 170, 70, "#1b3a4b", "Transit VIF", "DXGW 必須")}
  ${arrow(450, 110, 530, 110)}
  ${box(530, 75, 140, 70, "#2a1a4a", "DX Gateway", "")}
  ${arrow(670, 110, 730, 110)}
  ${box(730, 75, 50, 70, "#1b3a4b", "TGW", "")}
  ${arrow(755, 145, 720, 210)}
  ${arrow(755, 145, 780, 210)}
  ${box(680, 210, 80, 55, BOX, "VPC x N", "")}
  ${lbl(400, 310, "Transit VIF = 1 接続で数百 VPC を一元管理", GRN, 13)}
`,
	360,
);

// [43] DX GW + TGW 連携
svgs[43] = svgWrap(
	`
  ${lbl(400, 28, "DX Gateway + TGW 連携構成", PRP, 18, "bold")}
  ${box(20, 80, 140, 65, BOX, "DC 東京", "")}
  ${box(20, 190, 140, 65, BOX, "DC 大阪", "")}
  ${arrow(160, 112, 220, 155)}
  ${arrow(160, 222, 220, 185)}
  ${box(220, 145, 150, 60, "#1b3a4b", "DX GW", "")}
  ${arrow(370, 175, 440, 175)}
  ${box(440, 145, 130, 60, "#2a1a4a", "TGW", "")}
  ${arrow(570, 165, 640, 140)}
  ${arrow(570, 185, 640, 220)}
  ${box(640, 115, 150, 55, "#1a3a1a", "VPC 本番", "")}
  ${box(640, 195, 150, 55, "#1a3a1a", "VPC 開発", "")}
  ${lbl(400, 330, "DX GW — TGW 間は最大 6 アソシエーション", GRN, 13)}
`,
	380,
);

// [44] TGW 経由マルチVPC
svgs[44] = svgWrap(
	`
  ${lbl(400, 28, "TGW 経由マルチVPC 接続", PRP, 18, "bold")}
  ${box(30, 80, 140, 65, BOX, "顧客 DC", "")}
  ${arrow(170, 112, 250, 112)}
  ${box(250, 80, 140, 65, "#1b3a4b", "Transit VIF", "")}
  ${arrow(390, 112, 460, 112)}
  ${box(460, 80, 130, 65, "#2a1a4a", "TGW", "")}
  ${arrow(530, 100, 600, 80)}
  ${arrow(530, 112, 600, 112)}
  ${arrow(530, 125, 600, 145)}
  ${box(600, 60, 180, 45, BOX, "VPC-A 10.0.0.0/16", "", 11)}
  ${box(600, 115, 180, 45, BOX, "VPC-B 10.1.0.0/16", "", 11)}
  ${box(600, 170, 180, 45, BOX, "VPC-C 10.2.0.0/16", "", 11)}
  ${lbl(400, 290, "TGW ルートテーブルで VPC 間の通信制御", GRN, 13)}
`,
	340,
);

// [45] Transit VIF 制約
svgs[45] = svgWrap(
	`
  ${lbl(400, 28, "Transit VIF の制約と注意点", ACC2, 18, "bold")}
  ${box(30, 70, 340, 70, "#2a1a2a", "制約 1: DX Gateway 必須", "Transit VIF → DXGW のみ接続可能")}
  ${box(430, 70, 340, 70, "#2a1a2a", "制約 2: 同リージョン TGW", "DXGW と TGW は同リージョン")}
  ${box(30, 190, 340, 70, "#2a1a2a", "制約 3: BGP プレフィックス上限", "最大 20,000 経路")}
  ${box(430, 190, 340, 70, "#2a1a2a", "制約 4: 帯域共有", "単一 VIF で全 VPC 共有")}
  ${box(30, 310, 720, 55, "#1a3a1a", "解決: 大規模時は複数 DX Gateway / TGW を使い分け", "", 13)}
`,
	400,
);

// [46] TGW ピアリング
svgs[46] = svgWrap(
	`
  ${lbl(400, 28, "TGW ピアリングとの組合せ", PRP, 18, "bold")}
  ${box(30, 80, 150, 65, BOX, "DC Japan", "")}
  ${arrow(180, 112, 260, 112)}
  ${box(260, 80, 140, 65, "#1b3a4b", "TGW ap-ne-1", "", 13)}
  <line x1="400" y1="112" x2="470" y2="112" stroke="${PRP}" stroke-width="2.5" stroke-dasharray="6,3"/>
  ${lbl(435, 99, "TGW\nPeering", PRP, 10)}
  ${box(470, 80, 140, 65, "#1b3a4b", "TGW us-east-1", "", 13)}
  ${arrow(610, 112, 680, 112)}
  ${box(680, 80, 100, 65, BOX, "VPC US", "")}
  ${arrow(330, 145, 330, 210)}
  ${box(260, 210, 140, 60, "#1a3a1a", "VPC Tokyo A", "", 12)}
  ${lbl(400, 320, "リージョン間通信を TGW ピアリングで実現", GRN, 13)}
`,
	370,
);

// [47] VIF 選定ガイド
svgs[47] = svgWrap(
	`
  ${lbl(400, 28, "VIF 選定ガイド", ACC1, 18, "bold")}
  ${box(30, 70, 220, 75, "#1b3a4b", "Private VIF", "単一VPC / 同リージョン")}
  ${box(290, 70, 220, 75, "#2a1a4a", "Transit VIF", "複数VPC / スケール")}
  ${box(550, 70, 220, 75, "#1b3a4b", "Public VIF", "AWS マネージドサービス")}
  ${box(30, 210, 220, 75, "#1a3a1a", "小〜中規模 VPC 1-2個", "", 13)}
  ${box(290, 210, 220, 75, "#1a3a1a", "大規模 VPC 多数", "", 13)}
  ${box(550, 210, 220, 75, "#1a3a1a", "S3/DynamoDB など API", "", 13)}
  ${lbl(400, 350, "将来拡張を見込む場合は Transit VIF + TGW を推奨", GRN, 13)}
`,
	400,
);

// [48] Private vs Transit 比較
svgs[48] = svgWrap(
	`
  ${lbl(400, 28, "Private VIF vs Transit VIF 詳細比較", ACC1, 18, "bold")}
  ${box(30, 65, 340, 55, "#1b3a4b", "Private VIF", "", 14)}
  ${box(430, 65, 340, 55, "#2a1a4a", "Transit VIF", "", 14)}
  ${box(30, 135, 155, 50, "#1a3a1a", "接続先: VGW/DXGW", "", 12)}
  ${box(195, 135, 175, 50, "#1a3a1a", "VPC 数: 最大10", "", 12)}
  ${box(430, 135, 155, 50, "#1a3a1a", "接続先: DXGW→TGW", "", 12)}
  ${box(595, 135, 175, 50, "#1a3a1a", "VPC 数: 数百", "", 12)}
  ${box(30, 200, 155, 50, "#1a3a1a", "シンプル構成", "", 12)}
  ${box(195, 200, 175, 50, "#2a1a2a", "DXGW 必須", "", 12)}
  ${box(430, 200, 155, 50, "#2a1a4a", "TGW 追加コスト", "", 12)}
  ${box(595, 200, 175, 50, "#1a3a1a", "柔軟ルーティング", "", 12)}
  ${lbl(400, 310, "10 VPC 以下 → Private VIF / 11 VPC 以上 → Transit VIF", GRN, 13)}
`,
	360,
);

// [50] コスト比較 1
svgs[50] = svgWrap(
	`
  ${lbl(400, 28, "構成パターン別コスト比較 (概算)", ACC1, 18, "bold")}
  ${box(30, 70, 220, 70, "#1b3a4b", "Dedicated 1G", "~$0.30/時間")}
  ${box(290, 70, 220, 70, "#1b3a4b", "Dedicated 10G", "~$1.50/時間")}
  ${box(550, 70, 220, 70, "#1b3a4b", "Dedicated 100G", "~$15/時間")}
  ${box(30, 200, 220, 70, "#2a1a4a", "Hosted 50M-500M", "パートナー依存")}
  ${box(290, 200, 220, 70, "#2a1a4a", "Hosted 1G-10G", "パートナー依存")}
  ${box(550, 200, 220, 70, "#1a3a1a", "データ転送", "$0.02〜/GB")}
  ${lbl(400, 330, "ポート時間 + データ転送量 + VIF 数で合計コスト計算", GRN, 13)}
`,
	380,
);

// [51] コスト比較 2
svgs[51] = svgWrap(
	`
  ${lbl(400, 28, "コスト最適化ポイント", ACC1, 18, "bold")}
  ${box(30, 70, 340, 75, "#1b3a4b", "必要帯域を見積もる", "過剰スペックはコスト増")}
  ${box(430, 70, 340, 75, "#1a3a1a", "Hosted で始めて Dedicated へ", "小規模から段階的移行")}
  ${box(30, 200, 340, 75, "#2a1a4a", "DX GW で VIF 数を最小化", "VIF 数 × 時間課金")}
  ${box(430, 200, 340, 75, "#1b3a4b", "LAG で冗長化コスト削減", "ポート数削減")}
  ${lbl(400, 335, "コスト試算は AWS Pricing Calculator で事前確認", GRN, 13)}
`,
	390,
);

// [53] DX Gateway 役割
svgs[53] = svgWrap(
	`
  ${lbl(400, 28, "DX Gateway の主な役割", ACC1, 18, "bold")}
  ${box(30, 75, 200, 75, "#2a1a4a", "ロール 1: マルチリージョン", "1 DX GW で複数リージョン")}
  ${box(270, 75, 200, 75, "#1a3a1a", "ロール 2: マルチVPC", "最大 10 VGW / TGW")}
  ${box(510, 75, 260, 75, "#1b3a4b", "ロール 3: クロスアカウント", "他アカウント VGW も接続可")}
  ${box(30, 225, 740, 65, BOX, "DX Gateway: グローバルリソース (リージョン非依存) → 1 つで全世界に対応", "", 13)}
  ${lbl(400, 355, "Private/Transit VIF のみ対応 (Public VIF は不可)", ACC2, 13)}
`,
	400,
);

// [55] 許可プレフィックス
svgs[55] = svgWrap(
	`
  ${lbl(400, 28, "許可プレフィックスとルーティング制御", ACC1, 18, "bold")}
  ${box(30, 75, 200, 70, BOX, "DX GW 設定", "許可プレフィックスリスト")}
  ${arrow(230, 110, 310, 110)}
  ${box(310, 75, 200, 70, "#1b3a4b", "フィルタリング", "指定プレフィックスのみ通過")}
  ${arrow(510, 110, 590, 110)}
  ${box(590, 75, 180, 70, "#1a3a1a", "VGW/TGW", "許可された経路のみ")}
  ${box(30, 230, 340, 65, "#2a1a2a", "設定ミス: 広すぎるプレフィックス → セキュリティリスク", "", 12)}
  ${box(430, 230, 340, 65, "#1a3a1a", "ベスト: /24 単位で最小権限設定", "", 12)}
`,
	340,
);

// [56] クロスアカウント共有 1
svgs[56] = svgWrap(
	`
  ${lbl(400, 28, "DX Gateway クロスアカウント共有", ACC1, 18, "bold")}
  ${box(30, 80, 200, 70, "#1b3a4b", "Account A (Network)", "DX Gateway 所有")}
  ${arrow(230, 115, 310, 115)}
  ${box(310, 80, 200, 70, "#2a1a4a", "RAM 共有", "Resource Access Manager")}
  ${arrow(510, 115, 590, 100)}
  ${arrow(510, 130, 590, 155)}
  ${box(590, 75, 180, 55, BOX, "Account B", "VGW アタッチ")}
  ${box(590, 145, 180, 55, BOX, "Account C", "VGW アタッチ")}
  ${lbl(400, 290, "Network 専用アカウントで DX GW を集中管理する構成が推奨", GRN, 13)}
`,
	350,
);

// [57] クロスアカウント 2
svgs[57] = svgWrap(
	`
  ${lbl(400, 28, "クロスアカウント共有の手順", ACC1, 18, "bold")}
  ${box(50, 70, 140, 55, "#1b3a4b", "① DX GW 作成", "Network Acct")}
  ${arrow(190, 97, 240, 97)}
  ${box(240, 70, 140, 55, "#2a1a4a", "② RAM で共有", "対象アカウントへ")}
  ${arrow(380, 97, 430, 97)}
  ${box(430, 70, 140, 55, "#1b3a4b", "③ 招待承認", "受け側アカウント")}
  ${arrow(570, 97, 620, 97)}
  ${box(620, 70, 140, 55, "#1a3a1a", "④ VGW アタッチ", "各アカウントで実施")}
  ${lbl(400, 220, "DX GW 管理はネットワークチームに集中 → ガバナンス向上", GRN, 13)}
  ${box(100, 265, 600, 60, "#1b3a4b", "許可プレフィックスは DX GW 側で一元管理 → セキュリティ統制", "", 13)}
`,
	370,
);

// [58] DX GW 構成パターン比較
svgs[58] = svgWrap(
	`
  ${lbl(400, 28, "DX Gateway 構成パターン比較", ACC1, 18, "bold")}
  ${box(30, 70, 220, 80, "#1b3a4b", "パターン A", "DX GW + VGW (シンプル)")}
  ${box(290, 70, 220, 80, "#2a1a4a", "パターン B", "DX GW + TGW (スケール)")}
  ${box(550, 70, 220, 80, "#1a3a1a", "パターン C", "複数 DX GW (分離)")}
  ${box(30, 210, 220, 65, BOX, "小〜中規模 / シンプル運用", "", 12)}
  ${box(290, 210, 220, 65, BOX, "大規模 / 多拠点 / 柔軟", "", 12)}
  ${box(550, 210, 220, 65, BOX, "事業部分離 / セキュリティ分離", "", 12)}
  ${lbl(400, 345, "規模と要件に応じてパターンを選択", GRN, 13)}
`,
	400,
);

// [63] 開発環境冗長化
svgs[63] = svgWrap(
	`
  ${lbl(400, 28, "開発・テスト環境の冗長化", PRP, 18, "bold")}
  ${box(30, 80, 200, 70, "#2a1a4a", "Development Resiliency", "1接続のみ / SLA なし")}
  ${arrow(230, 115, 310, 115)}
  ${box(310, 80, 200, 70, "#1b3a4b", "DX 1接続", "シングルポイント")}
  ${arrow(510, 115, 590, 115)}
  ${box(590, 80, 180, 70, BOX, "開発VPC", "")}
  ${box(30, 240, 740, 65, "#1a3a1a", "本番: Max/High Resiliency 必須 / 開発: コスト優先で Single OK", "", 13)}
  ${lbl(400, 360, "SLA が不要な環境では Development モードがコスト最適", GRN, 13)}
`,
	410,
);

// [66] BFD と SiteLink 2
svgs[66] = svgWrap(
	`
  ${lbl(400, 28, "SiteLink — 拠点間 DX 経由通信", ACC1, 18, "bold")}
  ${box(30, 80, 150, 70, BOX, "拠点 A", "Tokyo DC")}
  ${arrow(180, 115, 260, 115)}
  ${box(260, 80, 170, 70, "#1b3a4b", "DX Location\n東京", "", 12)}
  ${arrow(430, 115, 510, 115, "#00bcd4")}
  ${lbl(470, 100, "SiteLink", "#00bcd4", 11)}
  ${box(510, 80, 170, 70, "#1b3a4b", "DX Location\n大阪", "", 12)}
  ${arrow(680, 115, 750, 115)}
  ${box(750, 80, 40, 70, BOX, "拠点 B", "")}
  ${lbl(400, 240, "SiteLink: DX 接続間を AWS バックボーンで直結 → 低レイテンシ拠点間通信", GRN, 13)}
`,
	300,
);

// ============================================================
// Apply SVGs to slides (only slides without SVG already)
// ============================================================

let count = 0;
for (const [idxStr, svgStr] of Object.entries(svgs)) {
	const idx = parseInt(idxStr);
	const slide = data.slides[idx];
	if (!slide) continue;
	// Skip if already has SVG
	if (slide.content.some((c: string) => c.startsWith("<svg"))) continue;
	slide.content = [svgStr, ...slide.content];
	count++;
}

writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log(`Patched ${count} additional slides in DX presentation`);
const total = data.slides.length;
const withSvg = data.slides.filter((s: { content: string[] }) =>
	s.content.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVG coverage: ${withSvg}/${total} = ${Math.round((withSvg / total) * 100)}%`,
);
