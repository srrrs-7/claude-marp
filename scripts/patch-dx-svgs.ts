#!/usr/bin/env bun
/**
 * Patch script: Add SVG diagrams to AWS Direct Connect presentation
 * Target: ≥37 of 72 slides get SVG (≥51%)
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
const BLU = "#2196f3";
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
	labelSize = 16,
	sublSize = 12,
): string {
	const cy = sub ? y + h / 2 - 10 : y + h / 2;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="${x + w / 2}" y="${cy}" text-anchor="middle" dominant-baseline="middle" fill="${TXT}" font-size="${labelSize}" font-weight="bold" font-family="sans-serif">${label}</text>
${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" dominant-baseline="middle" fill="${ACC1}" font-size="${sublSize}" font-family="sans-serif">${sub}</text>` : ""}`;
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
	const ax = x2 - ux * 12;
	const ay = y2 - uy * 12;
	return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5"/>
<polygon points="${x2},${y2} ${ax + px * 6},${ay + py * 6} ${ax - px * 6},${ay - py * 6}" fill="${color}"/>`;
}

function label(
	x: number,
	y: number,
	text: string,
	color = TXT,
	size = 13,
	weight = "normal",
): string {
	return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="sans-serif">${text}</text>`;
}

// ============================================================
// SVG definitions per slide index
// ============================================================

const svgs: Record<number, string> = {};

// [3] DX とは — topology overview
svgs[3] = svgWrap(
	`
  ${box(30, 150, 160, 80, BOX, "企業オンプレ", "Customer Network", 14, 11)}
  ${arrow(190, 190, 280, 190)}
  ${box(280, 160, 140, 60, "#1b3a4b", "DX Location", "コロケーション", 13, 11)}
  ${arrow(420, 190, 510, 190)}
  ${box(510, 150, 160, 80, BOX, "AWS Cloud", "VPC / Services", 14, 11)}
  ${label(400, 80, "AWS Direct Connect — 専用線接続", ACC1, 18, "bold")}
  ${label(260, 285, "1G / 10G / 100G 専用回線", TXT, 13)}
  ${label(530, 285, "低レイテンシ・安定帯域", GRN, 13)}
`,
	340,
);

// [5] 接続全体像
svgs[5] = svgWrap(
	`
  ${box(20, 60, 150, 70, BOX, "Customer", "Router", 14, 11)}
  ${arrow(170, 95, 240, 95)}
  ${box(240, 60, 150, 70, "#1b3a4b", "DX Location", "Cage/MMR", 13, 11)}
  ${arrow(390, 95, 460, 95)}
  ${box(460, 40, 160, 55, "#1b3a4b", "AWS DX Router", "", 13)}
  ${box(460, 110, 160, 55, "#1b3a4b", "Virtual IF", "VIF", 13, 11)}
  ${arrow(620, 95, 690, 75)}
  ${arrow(620, 130, 690, 155)}
  ${box(690, 55, 100, 55, BOX, "VPC", "Private VIF", 11, 9)}
  ${box(690, 130, 100, 55, BOX, "AWS Svc", "Public VIF", 11, 9)}
  ${label(400, 20, "Direct Connect 接続の全体像", ACC1, 17, "bold")}
`,
	350,
);

// [7] 物理接続の基礎
svgs[7] = svgWrap(
	`
  ${label(400, 40, "物理接続コンポーネント", ACC1, 18, "bold")}
  ${box(50, 100, 160, 70, BOX, "Customer", "Router/Switch")}
  <line x1="210" y1="135" x2="320" y2="135" stroke="${ACC1}" stroke-width="3" stroke-dasharray="8,4"/>
  ${box(320, 100, 160, 70, "#1b3a4b", "Cross Connect", "MMR内 パッチ")}
  <line x1="480" y1="135" x2="580" y2="135" stroke="${ACC1}" stroke-width="3"/>
  ${box(580, 100, 160, 70, BOX, "AWS DX", "Router")}
  ${label(265, 175, "専用物理回線", TXT, 12)}
  ${label(530, 175, "直接接続", GRN, 12)}
  ${box(220, 260, 360, 80, "#1b3a4b", "802.1Q VLAN タグ", "複数VIFを単一物理回線で多重化", 15, 12)}
`,
	380,
);

// [9] Dedicated Connection
svgs[9] = svgWrap(
	`
  ${label(400, 35, "Dedicated Connection", ACC1, 18, "bold")}
  ${box(60, 80, 200, 80, BOX, "お客様", "コロケーション設備")}
  ${arrow(260, 120, 360, 120)}
  ${box(360, 80, 200, 80, "#1b3a4b", "AWS DX Router", "1G/10G/100G")}
  ${arrow(560, 120, 660, 120)}
  ${box(660, 80, 110, 80, BOX, "AWS", "Region")}
  ${box(80, 230, 160, 60, "#1a3a1a", "帯域: 1G/10G/100G", "", 12)}
  ${box(270, 230, 160, 60, "#1a3a1a", "SLA: 専用物理回線", "", 12)}
  ${box(460, 230, 160, 60, "#1a3a1a", "LOA-CFA 発行が必要", "", 12)}
`,
	340,
);

// [10] Hosted Connection
svgs[10] = svgWrap(
	`
  ${label(400, 35, "Hosted Connection", ACC2, 18, "bold")}
  ${box(50, 80, 180, 80, BOX, "お客様", "任意のロケーション")}
  ${arrow(230, 120, 310, 120)}
  ${box(310, 80, 180, 80, "#2a1a3a", "APN パートナー", "ネットワーク")}
  ${arrow(490, 120, 570, 120)}
  ${box(570, 80, 180, 80, "#1b3a4b", "AWS DX Router", "")}
  ${box(80, 230, 160, 60, "#2a1a2e", "50M〜10G 柔軟設定", "", 12)}
  ${box(270, 230, 160, 60, "#2a1a2e", "パートナー経由申請", "", 12)}
  ${box(460, 230, 160, 60, "#2a1a2e", "LOA-CFA 不要", "", 12)}
`,
	340,
);

// [12] LAG
svgs[12] = svgWrap(
	`
  ${label(400, 30, "LAG (Link Aggregation Group)", ACC1, 18, "bold")}
  ${box(50, 80, 160, 70, BOX, "Customer", "LAG対応ルータ")}
  <line x1="210" y1="105" x2="350" y2="105" stroke="${GRN}" stroke-width="3"/>
  <line x1="210" y1="125" x2="350" y2="125" stroke="${GRN}" stroke-width="3"/>
  <line x1="210" y1="145" x2="350" y2="145" stroke="${GRN}" stroke-width="3"/>
  ${box(350, 80, 160, 70, "#1b3a4b", "AWS LAG", "最大4ポート")}
  ${arrow(510, 115, 600, 115)}
  ${box(600, 80, 150, 70, BOX, "AWS VPC", "")}
  ${box(150, 230, 200, 60, "#1a3a1a", "LACP 802.3ad 準拠", "", 13)}
  ${box(380, 230, 200, 60, "#1a3a1a", "障害時 自動フェイルオーバー", "", 12)}
`,
	340,
);

// [14] VIF とは
svgs[14] = svgWrap(
	`
  ${label(400, 35, "Virtual Interface (VIF) の位置づけ", ACC1, 18, "bold")}
  ${box(50, 90, 160, 70, BOX, "物理接続", "Dedicated/Hosted")}
  ${arrow(210, 125, 290, 125)}
  ${box(290, 70, 200, 120, "#1b3a4b", "VIF 論理インタフェース", "BGP + VLAN", 14, 12)}
  ${arrow(490, 110, 570, 90)}
  ${arrow(490, 140, 570, 160)}
  ${box(570, 65, 160, 60, BOX, "Private VIF", "→ VPC")}
  ${box(570, 140, 160, 60, BOX, "Public VIF", "→ AWS Svc")}
  ${label(480, 240, "Transit VIF → TGW (別経路)", ACC2, 13)}
`,
	300,
);

// [16] VIF 3種類
svgs[16] = svgWrap(
	`
  ${label(400, 30, "VIF の 3 種類", ACC1, 18, "bold")}
  ${box(40, 70, 220, 90, "#1b3a4b", "Private VIF", "VPC への直接接続", 15, 12)}
  ${(label(150, 190), "→ VGW または DXGW")}
  ${box(290, 70, 220, 90, "#1b3a2e", "Public VIF", "AWS パブリックサービス", 15, 12)}
  ${(label(400, 190), "→ S3, DynamoDB など")}
  ${box(540, 70, 220, 90, "#2e1b3a", "Transit VIF", "Transit Gateway 経由", 15, 12)}
  ${label(150, 185, "→ VGW または DXGW", TXT, 12)}
  ${label(400, 185, "→ S3, DynamoDB など", TXT, 12)}
  ${label(650, 185, "→ Transit Gateway", TXT, 12)}
  ${box(60, 270, 660, 70, BOX, "共通: VLAN ID + BGP ASN + BGP AUTH KEY が必要", "", 14)}
`,
	380,
);

// [21] Private VIF 詳細
svgs[21] = svgWrap(
	`
  ${label(400, 30, "Private VIF アーキテクチャ", ACC1, 18, "bold")}
  ${box(30, 80, 140, 70, BOX, "顧客拠点", "オンプレ")}
  ${arrow(170, 115, 240, 115)}
  ${box(240, 80, 150, 70, "#1b3a4b", "Private VIF", "VLAN+BGP")}
  ${arrow(390, 115, 460, 115)}
  ${box(460, 80, 140, 70, "#1a3a1a", "VGW", "Virtual PGW")}
  ${arrow(600, 115, 670, 115)}
  ${box(670, 80, 110, 70, BOX, "VPC", "")}
  ${label(400, 220, "プライベートIPアドレスで通信 — インターネット不使用", GRN, 13)}
  ${box(100, 260, 580, 60, "#1b3a4b", "BGP プレフィックス広報 ← オンプレルートをAWSへ / AWSルートをオンプレへ", "", 12)}
`,
	360,
);

// [23] Private VIF アーキテクチャ
svgs[23] = svgWrap(
	`
  ${label(400, 30, "Private VIF + VGW 構成", ACC1, 18, "bold")}
  ${box(30, 80, 160, 80, BOX, "Customer DC", "192.168.0.0/16")}
  ${arrow(190, 120, 270, 120)}
  ${box(270, 80, 160, 80, "#1b3a4b", "Private VIF", "VLAN 100")}
  ${arrow(430, 120, 510, 120)}
  ${box(510, 80, 140, 80, "#1a3a1a", "VGW", "us-east-1")}
  ${arrow(650, 120, 720, 100)}
  ${arrow(650, 140, 720, 160)}
  ${box(720, 75, 70, 60, BOX, "VPC-A", "")}
  ${box(720, 150, 70, 60, BOX, "VPC-B", "")}
  ${label(400, 280, "VGW は 1 リージョン内の VPC のみ対応", ACC2, 13)}
`,
	330,
);

// [28] DX Gateway マルチリージョン
svgs[28] = svgWrap(
	`
  ${label(400, 25, "DX Gateway — マルチリージョン接続", ACC1, 18, "bold")}
  ${box(30, 80, 140, 70, BOX, "顧客DC", "")}
  ${arrow(170, 115, 240, 115)}
  ${box(240, 90, 130, 50, "#1b3a4b", "DX Location", "")}
  ${arrow(370, 115, 430, 115)}
  ${box(430, 80, 150, 70, "#2a1a4a", "DX Gateway", "グローバル")}
  ${arrow(580, 105, 650, 85)}
  ${arrow(580, 125, 650, 145)}
  ${arrow(580, 115, 650, 210)}
  ${box(650, 60, 120, 55, BOX, "VPC ap-ne-1", "", 11)}
  ${box(650, 120, 120, 55, BOX, "VPC us-east-1", "", 11)}
  ${box(650, 190, 120, 55, BOX, "VPC eu-west-1", "", 11)}
  ${label(400, 310, "最大 10 VGW / アカウントをまたいだ接続も可能", GRN, 13)}
`,
	360,
);

// [33] Public VIF
svgs[33] = svgWrap(
	`
  ${label(400, 30, "Public VIF アーキテクチャ", ACC2, 18, "bold")}
  ${box(30, 80, 150, 80, BOX, "顧客DC", "プライベート環境")}
  ${arrow(180, 120, 260, 120)}
  ${box(260, 80, 150, 80, "#1b3a4b", "Public VIF", "AWS パブリックIP帯")}
  ${arrow(410, 120, 490, 120)}
  ${box(490, 60, 280, 50, "#1b3a1b", "S3 / EC2 API / CloudFront / その他", "", 12)}
  ${box(490, 120, 280, 50, "#1b3a1b", "DynamoDB / SQS / SNS / KMS ...", "", 12)}
  ${box(490, 180, 280, 50, "#1b3a1b", "Route53 / CloudWatch / ...", "", 12)}
  ${label(400, 300, "インターネットを通らず AWS サービスへ直接アクセス", GRN, 13)}
`,
	350,
);

// [35] Public VIF アーキテクチャ
svgs[35] = svgWrap(
	`
  ${label(400, 30, "Public VIF BGP ルーティング", ACC2, 18, "bold")}
  ${box(30, 80, 160, 80, BOX, "Customer", "BGP AS 65001")}
  ${arrow(190, 120, 280, 120)}
  ${box(280, 80, 180, 80, "#1b3a4b", "AWS BGP", "AS 7224")}
  ${arrow(460, 110, 540, 90)}
  ${arrow(460, 130, 540, 155)}
  ${box(540, 65, 220, 55, "#1b3a1b", "AWS パブリック IP プレフィックス 広報", "", 12)}
  ${box(540, 135, 220, 55, "#1b3a1b", "顧客 IP を AWS へ広報", "", 12)}
  ${label(400, 270, "MD5 BGP 認証推奨・BFD によるリンク障害検出", ACC1, 13)}
`,
	320,
);

// [39] Transit VIF
svgs[39] = svgWrap(
	`
  ${label(400, 25, "Transit VIF アーキテクチャ", PRP, 18, "bold")}
  ${box(30, 80, 140, 70, BOX, "顧客DC", "")}
  ${arrow(170, 115, 240, 115)}
  ${box(240, 80, 150, 70, "#1b3a4b", "Transit VIF", "VLAN+BGP")}
  ${arrow(390, 115, 460, 115)}
  ${box(460, 80, 150, 70, "#2a1a4a", "DX Gateway", "")}
  ${arrow(610, 115, 680, 115)}
  ${box(680, 80, 90, 70, "#1b3a4b", "TGW", "")}
  ${arrow(730, 150, 730, 210)}
  ${box(660, 210, 100, 55, BOX, "VPC-A", "")}
  ${arrow(730, 265, 660, 290)}
  ${arrow(730, 265, 790, 290)}
  ${label(400, 330, "TGW経由で多数のVPCを一元管理", GRN, 13)}
`,
	360,
);

// [41] TGW 基礎
svgs[41] = svgWrap(
	`
  ${label(400, 25, "Transit Gateway — ハブ & スポーク", PRP, 18, "bold")}
  ${box(330, 150, 140, 80, "#2a1a4a", "Transit GW", "ハブ")}
  ${arrow(330, 190, 230, 110)}
  ${arrow(330, 190, 130, 190)}
  ${arrow(330, 190, 230, 270)}
  ${arrow(470, 190, 570, 110)}
  ${arrow(470, 190, 670, 190)}
  ${arrow(470, 190, 570, 270)}
  ${box(150, 65, 110, 60, BOX, "VPC-A", "")}
  ${box(30, 160, 110, 60, BOX, "VPC-B", "")}
  ${box(150, 250, 110, 60, BOX, "VPC-C", "")}
  ${box(540, 65, 110, 60, BOX, "オンプレ", "DX/VPN")}
  ${box(660, 160, 110, 60, BOX, "VPC-D", "")}
  ${box(540, 250, 110, 60, BOX, "VPC-E", "")}
`,
	360,
);

// [42] Transit VIF アーキテクチャ図
svgs[42] = svgWrap(
	`
  ${label(400, 25, "Transit VIF + DX Gateway + TGW", PRP, 18, "bold")}
  ${box(20, 90, 130, 60, BOX, "DC Site A", "")}
  ${box(20, 170, 130, 60, BOX, "DC Site B", "")}
  ${arrow(150, 120, 220, 145)}
  ${arrow(150, 200, 220, 185)}
  ${box(220, 130, 130, 60, "#1b3a4b", "DX GW", "")}
  ${arrow(350, 160, 420, 160)}
  ${box(420, 130, 130, 60, "#2a1a4a", "TGW", "")}
  ${arrow(550, 150, 620, 120)}
  ${arrow(550, 170, 620, 200)}
  ${box(620, 95, 150, 55, BOX, "VPC prod", "")}
  ${box(620, 170, 150, 55, BOX, "VPC dev", "")}
  ${label(400, 310, "最大 20 VPC アタッチメント / TGW", GRN, 13)}
`,
	360,
);

// [49] VIF 選定フローチャート
svgs[49] = svgWrap(
	`
  ${label(400, 25, "VIF 選定フローチャート", ACC1, 18, "bold")}
  ${box(300, 60, 200, 55, "#1b3a4b", "接続先は？", "")}
  ${arrow(400, 115, 200, 180)}
  ${arrow(400, 115, 400, 180)}
  ${arrow(400, 115, 600, 180)}
  ${box(100, 180, 160, 55, BOX, "VPC のみ", "単一リージョン")}
  ${box(320, 180, 160, 55, BOX, "VPC 複数/多様", "マルチリージョン")}
  ${box(540, 180, 160, 55, BOX, "AWS パブリック", "サービス")}
  ${arrow(180, 235, 180, 295)}
  ${arrow(400, 235, 400, 295)}
  ${arrow(620, 235, 620, 295)}
  ${box(100, 295, 160, 55, "#1a3a1a", "Private VIF", "+ VGW")}
  ${box(320, 295, 160, 55, "#2a1a4a", "Transit VIF", "+ DXGW + TGW")}
  ${box(540, 295, 160, 55, "#1b3a4b", "Public VIF", "")}
`,
	390,
);

// [52] DX Gateway 詳細
svgs[52] = svgWrap(
	`
  ${label(400, 25, "DX Gateway の役割", ACC1, 18, "bold")}
  ${box(30, 90, 140, 70, BOX, "DX Location A", "東京")}
  ${box(30, 200, 140, 70, BOX, "DX Location B", "大阪")}
  ${arrow(170, 125, 280, 165)}
  ${arrow(170, 235, 280, 195)}
  ${box(280, 155, 180, 70, "#2a1a4a", "DX Gateway", "グローバルリソース")}
  ${arrow(460, 190, 540, 150)}
  ${arrow(460, 190, 540, 230)}
  ${box(540, 115, 220, 60, "#1a3a1a", "VGW (us-east-1 VPC)", "", 12)}
  ${box(540, 205, 220, 60, "#1a3a1a", "TGW (ap-northeast-1)", "", 12)}
  ${label(400, 330, "1 DX GW に最大 10 VGW / TGW をアタッチ可能", GRN, 13)}
`,
	370,
);

// [54] DX Gateway アーキテクチャ
svgs[54] = svgWrap(
	`
  ${label(400, 25, "DX Gateway アーキテクチャ詳細", ACC1, 18, "bold")}
  ${box(30, 80, 130, 60, BOX, "顧客 AS", "65001")}
  ${arrow(160, 110, 230, 110)}
  ${box(230, 80, 150, 60, "#1b3a4b", "Private/Transit VIF", "", 12)}
  ${arrow(380, 110, 450, 110)}
  ${box(450, 65, 140, 90, "#2a1a4a", "DX Gateway", "Amazon側 BGP")}
  ${arrow(590, 100, 660, 80)}
  ${arrow(590, 120, 660, 160)}
  ${box(660, 55, 110, 60, "#1a3a1a", "VGW/TGW A", "", 12)}
  ${box(660, 130, 110, 60, "#1a3a1a", "VGW/TGW B", "", 12)}
  ${label(300, 240, "許可プレフィックスで経路フィルタリング必須", ACC2, 13)}
`,
	300,
);

// [59] 冗長化設計
svgs[59] = svgWrap(
	`
  ${label(400, 25, "冗長化設計パターン概要", ACC1, 18, "bold")}
  ${box(30, 80, 160, 70, BOX, "企業DC A", "")}
  ${box(30, 220, 160, 70, BOX, "企業DC B", "")}
  ${arrow(190, 115, 280, 115)}
  ${arrow(190, 255, 280, 255)}
  ${box(280, 80, 140, 70, "#1b3a4b", "DX Location A", "東京")}
  ${box(280, 220, 140, 70, "#1b3a4b", "DX Location B", "大阪")}
  ${arrow(420, 115, 510, 185)}
  ${arrow(420, 255, 510, 215)}
  ${box(510, 180, 140, 60, "#2a1a4a", "DX Gateway", "")}
  ${arrow(650, 210, 720, 210)}
  ${box(720, 180, 60, 60, BOX, "VPC", "")}
  ${label(400, 340, "Maximum Resiliency: 4ポート / High: 2ポート / 開発: 1ポート", GRN, 12)}
`,
	390,
);

// [60] AWS 推奨冗長化モデル
svgs[60] = svgWrap(
	`
  ${label(400, 25, "AWS 推奨 冗長化モデル比較", ACC1, 18, "bold")}
  ${box(30, 70, 200, 80, "#1b3a4b", "Maximum Resiliency", "4接続 / 2ロケーション", 14, 11)}
  ${box(30, 175, 200, 80, "#1b3a4b", "High Resiliency", "2接続 / 2ロケーション", 14, 11)}
  ${box(30, 280, 200, 80, "#2a1a4a", "Development", "1接続 SLA なし", 14, 11)}
  ${box(280, 70, 200, 80, "#1a3a1a", "最高の可用性", "ミッションクリティカル向け", 14, 11)}
  ${box(280, 175, 200, 80, "#1a3a1a", "高可用性", "本番ワークロード向け", 14, 11)}
  ${box(280, 280, 200, 80, "#2a1a2a", "開発・検証用", "コスト優先", 14, 11)}
  ${arrow(230, 110, 280, 110)}
  ${arrow(230, 215, 280, 215)}
  ${arrow(230, 320, 280, 320)}
  ${label(650, 195, "コスト: ↑ Max > High > Dev ↓", ACC2, 13)}
`,
	390,
);

// [61] Maximum Resiliency
svgs[61] = svgWrap(
	`
  ${label(400, 25, "Maximum Resiliency 構成", GRN, 18, "bold")}
  ${box(30, 80, 130, 60, BOX, "DC Primary", "")}
  ${box(30, 200, 130, 60, BOX, "DC Secondary", "")}
  ${arrow(160, 110, 240, 120)}
  ${arrow(160, 110, 240, 200)}
  ${arrow(160, 230, 240, 240)}
  ${arrow(160, 230, 240, 310)}
  ${box(240, 95, 140, 60, "#1b3a4b", "DX-LoA 1", "Tokyo-A")}
  ${box(240, 175, 140, 60, "#1b3a4b", "DX-LoA 2", "Tokyo-B")}
  ${box(240, 255, 140, 60, "#1b3a4b", "DX-LoA 3", "Osaka-A")}
  ${box(240, 325, 140, 60, "#1b3a4b", "DX-LoA 4", "Osaka-B")}
  ${arrow(380, 220, 440, 220)}
  ${box(440, 190, 150, 60, "#2a1a4a", "DX Gateway", "")}
  ${arrow(590, 220, 660, 220)}
  ${box(660, 190, 110, 60, BOX, "VPC", "")}
  ${label(400, 420, "4 ポート全断に耐える最高レベルの冗長性", GRN, 13)}
`,
	450,
);

// [62] High Resiliency
svgs[62] = svgWrap(
	`
  ${label(400, 25, "High Resiliency 構成", ACC1, 18, "bold")}
  ${box(30, 100, 130, 70, BOX, "DC A", "")}
  ${box(30, 220, 130, 70, BOX, "DC B", "")}
  ${arrow(160, 135, 250, 155)}
  ${arrow(160, 255, 250, 255)}
  ${box(250, 120, 150, 70, "#1b3a4b", "DX Tokyo", "ポート1")}
  ${box(250, 215, 150, 70, "#1b3a4b", "DX Osaka", "ポート2")}
  ${arrow(400, 190, 480, 190)}
  ${box(480, 160, 160, 60, "#2a1a4a", "DX GW", "")}
  ${arrow(640, 190, 720, 190)}
  ${box(720, 160, 60, 60, BOX, "VPC", "")}
  ${label(400, 330, "異なるロケーション2接続で単一障害点なし", GRN, 13)}
`,
	380,
);

// [64] VPN フェイルオーバー
svgs[64] = svgWrap(
	`
  ${label(400, 25, "DX + VPN フェイルオーバー構成", ACC1, 18, "bold")}
  ${box(30, 100, 150, 70, BOX, "顧客 DC", "")}
  ${arrow(180, 125, 270, 125)}
  ${arrow(180, 145, 270, 220)}
  ${box(270, 95, 160, 60, "#1b3a4b", "DX 接続", "Active (優先)")}
  ${box(270, 190, 160, 60, "#2a1a2a", "VPN 接続", "Standby (予備)")}
  ${arrow(430, 125, 510, 175)}
  ${arrow(430, 220, 510, 200)}
  ${box(510, 155, 160, 60, "#1a3a1a", "VGW", "")}
  ${arrow(670, 185, 740, 185)}
  ${box(740, 155, 50, 60, BOX, "VPC", "")}
  ${label(400, 310, "BGP MED / AS-PATH で DX を優先。VPN はコールドスタンバイ", GRN, 13)}
`,
	360,
);

// [65] BFD
svgs[65] = svgWrap(
	`
  ${label(400, 25, "BFD (Bidirectional Forwarding Detection)", ACC1, 18, "bold")}
  ${box(80, 100, 180, 70, BOX, "顧客ルータ", "BFD 対応")}
  <line x1="260" y1="135" x2="540" y2="135" stroke="${GRN}" stroke-width="3"/>
  ${label(400, 120, "BFD ハローパケット (msec)", GRN, 12)}
  ${box(540, 100, 180, 70, "#1b3a4b", "AWS DX Router", "BFD 対応")}
  ${box(80, 240, 180, 70, "#2a1a2a", "障害検知: BGP のみ", "数十秒〜数分", 13, 11)}
  ${box(540, 240, 180, 70, "#1a3a1a", "障害検知: BFD 有効", "< 1 秒", 13, 11)}
  ${label(400, 350, "BFD で高速フェイルオーバーを実現 (デフォルト 300ms)", GRN, 13)}
`,
	390,
);

// [67] VPN → DX 移行
svgs[67] = svgWrap(
	`
  ${label(400, 25, "VPN → DX 移行ステップ", ACC1, 18, "bold")}
  ${box(50, 80, 140, 60, "#2a1a2a", "① VPN 稼働中", "", 13)}
  ${arrow(190, 110, 250, 110)}
  ${box(250, 80, 140, 60, "#1b3a4b", "② DX 開通", "並列稼働", 13, 11)}
  ${arrow(390, 110, 450, 110)}
  ${box(450, 80, 140, 60, "#1b3a4b", "③ BGP 優先度", "DX→優先", 13, 11)}
  ${arrow(590, 110, 650, 110)}
  ${box(650, 80, 130, 60, "#1a3a1a", "④ VPN 廃止", "", 13)}
  ${label(400, 220, "移行中は DX + VPN 並列稼働で無停止移行", GRN, 14)}
  ${box(100, 270, 580, 60, "#1b3a4b", "DX 開通後 BGP MED で DX 優先 → 安定確認後 VPN を削除", "", 13)}
`,
	370,
);

// [68] ベストプラクティス
svgs[68] = svgWrap(
	`
  ${label(400, 25, "設計時のベストプラクティス", ACC1, 18, "bold")}
  ${box(40, 70, 340, 65, "#1b3a4b", "冗長化: 最低2接続 / 2ロケーション", "", 14)}
  ${box(420, 70, 340, 65, "#1b3a4b", "BFD で高速フェイルオーバー設定", "", 14)}
  ${box(40, 155, 340, 65, "#1a3a1a", "DX Gateway でマルチリージョン接続", "", 14)}
  ${box(420, 155, 340, 65, "#1a3a1a", "許可プレフィックスは最小権限で設定", "", 14)}
  ${box(40, 240, 340, 65, "#2a1a4a", "Transit VIF は大規模VPC向け (TGW経由)", "", 14)}
  ${box(420, 240, 340, 65, "#2a1a4a", "MTU: Jumbo Frame (9001) 有効化検討", "", 14)}
  ${box(40, 325, 720, 50, BOX, "コスト: データ転送量 / ポート時間 / VIF数を把握してから設計", "", 13)}
`,
	410,
);

// [69] 全体アーキテクチャ サマリ
svgs[69] = svgWrap(
	`
  ${label(400, 25, "全体アーキテクチャ サマリ", ACC1, 18, "bold")}
  ${box(20, 80, 130, 60, BOX, "DC 東京", "")}
  ${box(20, 160, 130, 60, BOX, "DC 大阪", "")}
  ${arrow(150, 110, 220, 130)}
  ${arrow(150, 190, 220, 180)}
  ${box(220, 110, 140, 60, "#1b3a4b", "DX Location", "× 2")}
  ${arrow(360, 140, 430, 140)}
  ${box(430, 110, 140, 60, "#2a1a4a", "DX Gateway", "")}
  ${arrow(570, 130, 640, 100)}
  ${arrow(570, 150, 640, 180)}
  ${box(640, 70, 140, 60, "#1a3a1a", "TGW ap-ne-1", "", 12)}
  ${box(640, 155, 140, 60, "#1a3a1a", "VGW us-east-1", "", 12)}
  ${arrow(640, 100, 720, 100)}
  ${arrow(640, 185, 720, 185)}
  ${label(400, 310, "エンタープライズ DX アーキテクチャの標準構成", GRN, 13)}
`,
	360,
);

// ============================================================
// Apply SVGs to slides
// ============================================================

let count = 0;
for (const [idxStr, svgStr] of Object.entries(svgs)) {
	const idx = parseInt(idxStr);
	const slide = data.slides[idx];
	if (!slide) continue;
	// Remove any existing SVG entry at start
	const content = slide.content.filter((c: string) => !c.startsWith("<svg"));
	slide.content = [svgStr, ...content];
	count++;
}

writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log(`Patched ${count} slides in DX presentation`);
console.log(`Total slides: ${data.slides.length}`);
