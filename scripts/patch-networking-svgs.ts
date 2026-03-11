#!/usr/bin/env bun
/**
 * Patch script: inject inline SVG diagrams into networking slides-data.json
 * Target: add inline SVGs to slides to reach >= 50% SVG ratio
 */

import { readFileSync, writeFileSync } from "node:fs";

const dataPath =
	"/workspace/main/docs/20260214160000_aws-networking-complete-guide/slides-data.json";

const SVG_STYLE =
	'style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"';
const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const GRAY = "#4a5568";

function svgWrap(inner: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>${inner}</svg>`;
}

function r(
	x: number,
	y: number,
	w: number,
	h: number,
	fill: string,
	rx = 8,
	stroke = "none",
	sw = 0,
): string {
	const s = stroke !== "none" ? ` stroke="${stroke}" stroke-width="${sw}"` : "";
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${s}/>`;
}

function t(
	x: number,
	y: number,
	label: string,
	size = 13,
	fill = TXT,
	anchor = "middle",
	weight = "normal",
): string {
	return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-family="sans-serif" font-weight="${weight}">${label}</text>`;
}

function arrow(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	col = ACC1,
): string {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const len = Math.sqrt(dx * dx + dy * dy) || 1;
	const ux = dx / len;
	const uy = dy / len;
	const px = -uy;
	const py = ux;
	const ax = x2 - ux * 12;
	const ay = y2 - uy * 12;
	const p1x = (ax + px * 6).toFixed(1);
	const p1y = (ay + py * 6).toFixed(1);
	const p2x = (ax - px * 6).toFixed(1);
	const p2y = (ay - py * 6).toFixed(1);
	return `<line x1="${x1}" y1="${y1}" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" stroke="${col}" stroke-width="2"/><polygon points="${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}" fill="${col}"/>`;
}

// --- SVG generators ---

function svgVpcOverview(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			r(40, 40, 720, 320, BOX, 12, ACC1, 2),
			t(400, 32, "VPC 10.0.0.0/16", 13, ACC1, "middle", "bold"),
			r(60, 65, 300, 130, "#0d3349", 8, ACC2, 1),
			t(210, 85, "Public Subnet 10.0.1.0/24", 12, ACC2, "middle", "bold"),
			r(80, 98, 90, 35, GRAY, 5),
			t(125, 120, "EC2", 13, TXT),
			r(190, 98, 90, 35, GRAY, 5),
			t(235, 120, "ALB", 13, TXT),
			r(295, 98, 50, 35, "#1e4a2e", 5),
			t(320, 120, "NAT GW", 10, ACC1),
			r(60, 215, 300, 120, "#0d2a49", 8, GRAY, 1),
			t(210, 234, "Private Subnet 10.0.2.0/24", 12, GRAY, "middle", "bold"),
			r(80, 248, 90, 35, GRAY, 5),
			t(125, 270, "App", 13, TXT),
			r(190, 248, 90, 35, GRAY, 5),
			t(235, 270, "RDS", 13, TXT),
			r(620, 80, 110, 40, "#1e4a2e", 8, ACC1, 1),
			t(675, 105, "Internet GW", 12, ACC1),
			r(620, 295, 110, 40, GRAY, 8),
			t(675, 320, "Internet", 13, TXT),
			arrow(360, 118, 620, 100),
			arrow(320, 140, 320, 255, ACC2),
			arrow(675, 120, 675, 295),
			t(
				400,
				388,
				"IGW: パブリック⇔インターネット  |  NAT GW: プライベート→外向き",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgSubnetDesign(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			// AZ-a
			r(20, 40, 355, 310, "#0a1628", 10, ACC1, 2),
			t(197, 32, "AZ-a (ap-northeast-1a)", 12, ACC1, "middle", "bold"),
			r(38, 60, 315, 110, "#0d3349", 8, ACC2, 1),
			t(195, 78, "Public Subnet 10.0.1.0/24", 12, ACC2, "middle"),
			r(50, 90, 75, 32, GRAY, 5),
			t(87, 111, "EC2", 12, TXT),
			r(138, 90, 75, 32, GRAY, 5),
			t(175, 111, "ALB", 12, TXT),
			r(226, 90, 60, 32, "#1e4a2e", 5),
			t(256, 111, "NAT GW", 10, ACC1),
			r(310, 90, 30, 32, "#1e4a2e", 5),
			t(325, 111, "IGW", 9, TXT),
			r(38, 188, 315, 130, "#0d2a49", 8, GRAY, 1),
			t(195, 205, "Private Subnet 10.0.2.0/24", 12, GRAY, "middle"),
			r(55, 218, 90, 35, GRAY, 5),
			t(100, 240, "App Server", 11, TXT),
			r(165, 218, 90, 35, GRAY, 5),
			t(210, 240, "RDS", 12, TXT),
			arrow(256, 125, 256, 218, ACC2),
			t(240, 175, "RT: 0.0.0.0/0→NAT", 9, ACC1),
			// AZ-b
			r(425, 40, 355, 310, "#0a1628", 10, ACC1, 2),
			t(602, 32, "AZ-b (ap-northeast-1c)", 12, ACC1, "middle", "bold"),
			r(442, 60, 315, 110, "#0d3349", 8, ACC2, 1),
			t(600, 78, "Public Subnet 10.0.3.0/24", 12, ACC2, "middle"),
			r(455, 90, 75, 32, GRAY, 5),
			t(492, 111, "EC2", 12, TXT),
			r(543, 90, 75, 32, GRAY, 5),
			t(580, 111, "ALB", 12, TXT),
			r(631, 90, 60, 32, "#1e4a2e", 5),
			t(661, 111, "NAT GW", 10, ACC1),
			r(703, 90, 30, 32, "#1e4a2e", 5),
			t(718, 111, "IGW", 9, TXT),
			r(442, 188, 315, 130, "#0d2a49", 8, GRAY, 1),
			t(600, 205, "Private Subnet 10.0.4.0/24", 12, GRAY, "middle"),
			r(458, 218, 90, 35, GRAY, 5),
			t(503, 240, "App Server", 11, TXT),
			r(568, 218, 90, 35, GRAY, 5),
			t(613, 240, "RDS", 12, TXT),
			t(
				400,
				388,
				"Public RT: 0.0.0.0/0 → IGW  |  Private RT: 0.0.0.0/0 → NAT GW",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgSgNacl(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			r(175, 30, 450, 330, "none", 8, ACC1, 2),
			t(50, 80, "NACL", 14, ACC1, "middle", "bold"),
			t(50, 100, "Stateless", 11, ACC1, "middle"),
			t(50, 118, "Allow+Deny", 11, ACC1, "middle"),
			t(50, 136, "サブネット境界", 11, ACC1, "middle"),
			r(200, 55, 400, 280, BOX, 8, GRAY, 1),
			t(400, 47, "Subnet", 12, GRAY),
			r(280, 110, 240, 140, "none", 6, ACC2, 2),
			t(740, 155, "SG", 14, ACC2, "middle", "bold"),
			t(740, 175, "Stateful", 11, ACC2, "middle"),
			t(740, 193, "Allow only", 11, ACC2, "middle"),
			t(740, 211, "ENI(インスタンス)", 11, ACC2, "middle"),
			r(295, 128, 210, 105, "#1e3a5f", 8, ACC2, 1),
			t(400, 154, "EC2 Instance", 14, ACC2, "middle", "bold"),
			t(400, 174, "(ENI)", 12, GRAY),
			t(400, 194, "SG: 全ルール評価", 11, TXT),
			t(400, 212, "NACL: 番号順評価", 11, TXT),
			arrow(30, 190, 175, 190, ACC1),
			t(100, 183, "Inbound", 11, TXT),
			arrow(625, 210, 770, 210, ACC1),
			t(695, 203, "Outbound", 11, TXT),
			r(20, 300, 760, 70, BOX, 6, GRAY, 1),
			t(400, 320, "SG: ステートフル — 戻りトラフィック自動許可", 12, TXT),
			t(
				400,
				340,
				"NACL: ステートレス — 戻りトラフィックも明示的に許可が必要",
				12,
				GRAY,
			),
			t(400, 360, "評価順: NACL(サブネット境界) → SG(ENI)", 11, GRAY),
		].join(""),
	);
}

function svgRouteTable(): string {
	return svgWrap(
		[
			r(0, 0, 800, 380, BG),
			t(
				400,
				25,
				"ルートテーブル — 最長プレフィックス一致",
				15,
				ACC1,
				"middle",
				"bold",
			),
			r(30, 50, 140, 45, GRAY, 8),
			t(100, 77, "Packet In", 13, TXT),
			arrow(170, 72, 240, 72),
			r(240, 50, 320, 200, BOX, 8, ACC1, 1),
			t(400, 70, "Route Table", 14, ACC1, "middle", "bold"),
			r(255, 82, 290, 28, "#0d3349", 4),
			t(400, 100, "10.0.0.0/16  →  local", 12, TXT),
			r(255, 115, 290, 28, "#0d3349", 4),
			t(400, 133, "10.0.1.0/24  →  local", 12, TXT),
			r(255, 148, 290, 28, "#0d3349", 4),
			t(400, 166, "172.16.0.0/12  →  vgw", 12, TXT),
			r(255, 181, 290, 28, "#0d3349", 4),
			t(400, 199, "0.0.0.0/0  →  igw", 12, ACC2),
			t(400, 232, "最長プレフィックス一致 (Longest Prefix Match)", 11, GRAY),
			// Destinations
			arrow(560, 96, 630, 96),
			r(630, 82, 140, 28, "#1e4a2e", 5),
			t(700, 100, "Local (VPC内)", 12, TXT),
			arrow(560, 129, 630, 129),
			r(630, 115, 140, 28, "#1e4a2e", 5),
			t(700, 133, "Local (Subnet)", 12, TXT),
			arrow(560, 162, 630, 162),
			r(630, 148, 140, 28, "#3a1e4a", 5),
			t(700, 166, "VPN Gateway", 12, TXT),
			arrow(560, 196, 630, 196),
			r(630, 182, 140, 28, "#1e4a2e", 5),
			t(700, 200, "Internet GW", 12, ACC1),
			r(20, 280, 760, 60, BOX, 6, GRAY, 1),
			t(
				400,
				300,
				"例: 10.0.1.5への通信 → /24(local)が/16(local)より具体的 → /24を選択",
				12,
				TXT,
			),
			t(400, 320, "静的ルート > 伝搬ルート  |  DXルート > VPNルート", 12, GRAY),
		].join(""),
	);
}

function svgDxArchitecture(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			r(20, 150, 120, 80, BOX, 8, GRAY, 1),
			t(80, 188, "On-Premises", 12, TXT, "middle", "bold"),
			t(80, 206, "Router/FW", 11, GRAY),
			r(210, 130, 130, 110, "#1e3a5f", 8, ACC1, 2),
			t(275, 155, "DX Location", 12, ACC1, "middle", "bold"),
			t(275, 173, "Cross Connect", 11, TXT),
			t(275, 190, "AWS Device", 11, TXT),
			t(275, 207, "Port (1/10/100G)", 10, GRAY),
			r(420, 150, 120, 80, "#1e4a2e", 8, ACC1, 1),
			t(480, 185, "DX Gateway", 13, ACC1, "middle", "bold"),
			t(480, 202, "(Global)", 11, GRAY),
			r(620, 95, 130, 55, BOX, 8, ACC2, 1),
			t(685, 127, "VGW → VPC", 12, ACC2),
			r(620, 210, 130, 55, BOX, 8, ACC2, 1),
			t(685, 242, "TGW (Transit)", 12, ACC2),
			arrow(140, 190, 210, 190),
			t(175, 183, "Xconn", 10, GRAY),
			arrow(340, 190, 420, 190),
			t(380, 183, "Private/Transit VIF", 10, ACC1),
			arrow(540, 178, 620, 122),
			arrow(540, 200, 620, 237),
			r(20, 330, 760, 50, BOX, 6, GRAY, 1),
			t(
				400,
				350,
				"BGP必須  |  1/10/100 Gbps  |  低遅延・安定  |  DX GWで複数リージョンVPCに接続",
				12,
				TXT,
			),
			t(
				400,
				370,
				"Private VIF: VPC接続  |  Public VIF: AWSパブリックサービス  |  Transit VIF: TGW接続",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgVpnArchitecture(): string {
	return svgWrap(
		[
			r(0, 0, 800, 380, BG),
			r(20, 155, 120, 60, BOX, 8, GRAY, 1),
			t(80, 185, "On-Premises", 12, TXT, "middle", "bold"),
			t(80, 203, "CGW", 11, GRAY),
			r(210, 100, 130, 165, "#0d2a49", 20, GRAY, 1),
			t(275, 175, "Internet", 14, GRAY),
			t(275, 193, "(Encrypted)", 11, GRAY),
			arrow(140, 178, 210, 158, ACC1),
			t(175, 172, "Tunnel1", 10, ACC1),
			arrow(140, 200, 210, 220, ACC2),
			t(175, 216, "Tunnel2", 10, ACC2),
			r(410, 155, 130, 70, "#1e4a2e", 8, ACC1, 2),
			t(475, 183, "VGW / TGW", 13, ACC1, "middle", "bold"),
			t(475, 200, "AWS VPN端点", 11, GRAY),
			arrow(340, 160, 410, 175, ACC1),
			arrow(340, 220, 410, 200, ACC2),
			r(620, 150, 140, 80, BOX, 8, ACC2, 1),
			t(690, 183, "VPC", 14, ACC2, "middle", "bold"),
			t(690, 200, "10.0.0.0/16", 11, GRAY),
			arrow(540, 190, 620, 190),
			r(20, 295, 760, 60, BOX, 6, GRAY, 1),
			t(
				400,
				315,
				"IPsec IKEv1/v2  |  2本の冗長トンネル（異なるAZ）  |  最大1.25 Gbps/tunnel",
				12,
				TXT,
			),
			t(
				400,
				335,
				"動的ルーティング(BGP) or 静的ルーティング  |  DPDで障害検知",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgClientVpn(): string {
	return svgWrap(
		[
			r(0, 0, 800, 380, BG),
			r(20, 65, 110, 40, GRAY, 8),
			t(75, 89, "Remote User 1", 11, TXT),
			r(20, 150, 110, 40, GRAY, 8),
			t(75, 174, "Remote User 2", 11, TXT),
			r(20, 235, 110, 40, GRAY, 8),
			t(75, 259, "Remote User 3", 11, TXT),
			r(200, 120, 120, 130, "#0d2a49", 20, GRAY, 1),
			t(260, 180, "Internet", 13, GRAY),
			t(260, 198, "(OpenVPN/TLS)", 11, GRAY),
			r(395, 140, 150, 80, "#1e3a5f", 8, ACC1, 2),
			t(470, 170, "Client VPN", 14, ACC1, "middle", "bold"),
			t(470, 188, "Endpoint", 12, ACC1),
			r(620, 95, 150, 190, BOX, 8, ACC2, 1),
			t(695, 113, "VPC", 14, ACC2, "middle", "bold"),
			r(632, 125, 124, 32, GRAY, 5),
			t(694, 146, "EC2 Apps", 12, TXT),
			r(632, 170, 124, 32, GRAY, 5),
			t(694, 191, "RDS DB", 12, TXT),
			r(632, 215, 124, 32, GRAY, 5),
			t(694, 236, "EFS Share", 12, TXT),
			r(632, 260, 124, 32, GRAY, 5),
			t(694, 281, "Internal SVC", 11, TXT),
			arrow(130, 85, 200, 148),
			arrow(130, 170, 200, 185),
			arrow(130, 255, 200, 222),
			arrow(320, 180, 395, 180),
			t(357, 173, "OpenVPN", 10, ACC1),
			arrow(545, 180, 620, 180),
			r(20, 305, 760, 55, BOX, 6, GRAY, 1),
			t(
				400,
				325,
				"認証: AD / 相互証明書(mTLS) / SAML 2.0  |  スプリットトンネル対応",
				12,
				TXT,
			),
			t(
				400,
				343,
				"Client CIDR: VPCと重複しない範囲  |  Split Tunnel: AWSトラフィックのみVPN経由",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgTgwArchitecture(): string {
	return svgWrap(
		[
			r(0, 0, 800, 450, BG),
			r(305, 175, 190, 80, "#1e4a2e", 10, ACC1, 3),
			t(400, 210, "Transit", 16, ACC1, "middle", "bold"),
			t(400, 232, "Gateway", 16, ACC1, "middle", "bold"),
			r(25, 50, 115, 45, BOX, 8, ACC2, 1),
			t(82, 77, "VPC A (Dev)", 12, ACC2),
			r(25, 175, 115, 45, BOX, 8, ACC2, 1),
			t(82, 202, "VPC B (Prod)", 12, ACC2),
			r(25, 300, 115, 45, BOX, 8, ACC2, 1),
			t(82, 327, "VPC C (Mgmt)", 12, ACC2),
			r(660, 50, 115, 45, BOX, 8, GRAY, 1),
			t(717, 77, "On-Prem VPN", 12, TXT),
			r(660, 175, 115, 45, BOX, 8, GRAY, 1),
			t(717, 202, "Direct Connect", 12, TXT),
			r(660, 300, 115, 45, BOX, 8, ACC2, 1),
			t(717, 327, "VPC D (Shared)", 12, ACC2),
			arrow(140, 72, 305, 200),
			arrow(140, 197, 305, 213),
			arrow(140, 322, 305, 228),
			arrow(495, 200, 660, 72),
			arrow(495, 213, 660, 197),
			arrow(495, 225, 660, 322),
			r(20, 390, 760, 45, BOX, 6, GRAY, 1),
			t(
				400,
				408,
				"ハブ&スポーク型  |  N接続（フルメッシュ不要）  |  推移的ルーティング対応",
				13,
				TXT,
			),
			t(
				400,
				428,
				"TGWルートテーブル: アソシエーション + プロパゲーションでフレキシブル制御",
				11,
				GRAY,
			),
		].join(""),
		450,
	);
}

function svgEcmpScaling(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			t(
				400,
				25,
				"TGW + VPN ECMP — 帯域幅スケーリング",
				15,
				ACC1,
				"middle",
				"bold",
			),
			r(20, 80, 140, 240, BOX, 8, GRAY, 1),
			t(90, 108, "Customer", 13, TXT),
			t(90, 126, "Gateways", 13, TXT),
			r(35, 143, 110, 28, GRAY, 4),
			t(90, 162, "CGW #1", 12, TXT),
			r(35, 183, 110, 28, GRAY, 4),
			t(90, 202, "CGW #2", 12, TXT),
			r(35, 223, 110, 28, GRAY, 4),
			t(90, 242, "CGW #3", 12, TXT),
			r(35, 263, 110, 28, GRAY, 4),
			t(90, 282, "CGW #4", 12, TXT),
			r(570, 150, 160, 100, "#1e4a2e", 8, ACC1, 2),
			t(650, 190, "Transit GW", 15, ACC1, "middle", "bold"),
			t(650, 210, "+ ECMP", 13, ACC1),
			arrow(160, 157, 570, 178, ACC1),
			t(365, 152, "Tunnel 1 (1.25G)", 10, ACC1),
			arrow(160, 182, 570, 192, ACC1),
			t(365, 177, "Tunnel 2 (1.25G)", 10, ACC1),
			arrow(160, 222, 570, 208, ACC2),
			t(365, 216, "Tunnel 3 (1.25G)", 10, ACC2),
			arrow(160, 262, 570, 222, ACC2),
			t(365, 256, "Tunnel 4 (1.25G)", 10, ACC2),
			r(570, 275, 160, 50, BOX, 8, ACC1, 1),
			t(650, 305, "Total: 5 Gbps", 14, ACC1, "middle", "bold"),
			r(20, 340, 760, 40, BOX, 6, GRAY, 1),
			t(
				400,
				358,
				"1 VPN接続=2トンネル=2.5G  |  2接続=5G  |  N接続=N×2.5 Gbps (max ~50G)",
				12,
				TXT,
			),
			t(
				400,
				378,
				"BGP必須  |  同一プレフィックスを全トンネルで広告  |  同一AS Path長",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgVpcConnectivityFlow(): string {
	return svgWrap(
		[
			r(0, 0, 800, 400, BG),
			t(400, 24, "VPC接続オプション選択フロー", 16, ACC1, "middle", "bold"),
			r(325, 44, 150, 45, GRAY, 8),
			t(400, 71, "接続先は？", 14, TXT),
			arrow(400, 89, 120, 135),
			arrow(400, 89, 400, 135),
			arrow(400, 89, 680, 135),
			r(40, 135, 160, 44, BOX, 8, ACC2, 1),
			t(120, 162, "別VPC / アカウント", 12, ACC2),
			r(320, 135, 160, 44, BOX, 8, GRAY, 1),
			t(400, 162, "AWSサービス", 13, TXT),
			r(600, 135, 160, 44, BOX, 8, ACC1, 1),
			t(680, 162, "オンプレミス", 13, ACC1),
			arrow(100, 179, 60, 230),
			arrow(140, 179, 200, 230),
			r(18, 230, 106, 38, "#1e3a5f", 6, ACC2, 1),
			t(71, 253, "VPC Peering", 11, TXT),
			r(148, 230, 106, 38, "#1e3a5f", 6, ACC2, 1),
			t(201, 253, "Transit GW", 11, TXT),
			t(71, 280, "<= 数台", 10, GRAY),
			t(201, 280, "> 多数台", 10, GRAY),
			arrow(380, 179, 340, 230),
			arrow(420, 179, 460, 230),
			r(295, 230, 106, 38, "#1e3a5f", 6, GRAY, 1),
			t(348, 253, "GW Endpoint", 11, TXT),
			r(415, 230, 110, 38, "#1e3a5f", 6, GRAY, 1),
			t(470, 253, "Interface EP", 11, TXT),
			t(348, 280, "S3/DynamoDB", 10, GRAY),
			t(470, 280, "多数のAWSサービス", 10, GRAY),
			arrow(660, 179, 620, 230),
			arrow(700, 179, 720, 230),
			r(572, 230, 90, 38, "#1e3a5f", 6, ACC1, 1),
			t(617, 253, "VPN", 14, TXT),
			r(672, 230, 110, 38, "#1e3a5f", 6, ACC1, 1),
			t(727, 253, "Direct Connect", 11, TXT),
			t(617, 280, "迅速・安価", 10, GRAY),
			t(727, 280, "高帯域・安定", 10, GRAY),
			r(20, 310, 760, 65, BOX, 6, GRAY, 1),
			t(
				400,
				330,
				"Gateway Endpoint: S3/DynamoDBのみ(無料)  |  Interface Endpoint: PrivateLink(有料)",
				11,
				TXT,
			),
			t(
				400,
				348,
				"Peering: CIDRオーバーラップ不可・推移的ルーティング不可",
				11,
				GRAY,
			),
			t(
				400,
				366,
				"TGW: 大規模環境での推移的ルーティング・フルメッシュ回避",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgGreTgw(): string {
	return svgWrap(
		[
			r(0, 0, 800, 380, BG),
			t(
				400,
				24,
				"TGW Connect (GRE) アーキテクチャ",
				15,
				ACC1,
				"middle",
				"bold",
			),
			r(20, 155, 130, 60, BOX, 8, GRAY, 1),
			t(85, 185, "SD-WAN", 13, TXT, "middle", "bold"),
			t(85, 203, "Appliance", 11, GRAY),
			r(220, 90, 150, 190, "#0d2a49", 8, ACC2, 1),
			t(295, 110, "VPC (Transport)", 12, ACC2),
			r(235, 122, 120, 38, GRAY, 5),
			t(295, 145, "NVA Instance", 12, TXT),
			r(460, 130, 160, 110, "#1e4a2e", 8, ACC1, 2),
			t(540, 168, "Transit GW", 15, ACC1, "middle", "bold"),
			t(540, 188, "+ Connect", 13, ACC1),
			t(540, 208, "Attachment", 12, GRAY),
			r(700, 90, 80, 38, BOX, 6, ACC2, 1),
			t(740, 113, "VPC 1", 12, ACC2),
			r(700, 155, 80, 38, BOX, 6, ACC2, 1),
			t(740, 178, "VPC 2", 12, ACC2),
			r(700, 220, 80, 38, BOX, 6, ACC2, 1),
			t(740, 243, "VPC 3", 12, ACC2),
			arrow(150, 185, 220, 158),
			t(185, 177, "GRE Tunnel", 10, ACC1),
			arrow(370, 145, 460, 168),
			t(415, 140, "TGW Connect", 10, ACC1),
			arrow(620, 168, 700, 109),
			arrow(620, 185, 700, 174),
			arrow(620, 202, 700, 239),
			r(20, 310, 760, 55, BOX, 6, GRAY, 1),
			t(
				400,
				330,
				"GREトンネル + BGPで動的ルーティング  |  最大5 Gbps/ConnectPeer",
				12,
				TXT,
			),
			t(
				400,
				350,
				"Connectあたり最大4 Peer = 20 Gbps  |  SD-WAN/NVAとの統合に最適",
				11,
				GRAY,
			),
		].join(""),
	);
}

function svgHaDesignPatterns(): string {
	return svgWrap(
		[
			r(0, 0, 800, 450, BG),
			t(
				400,
				24,
				"ハイブリッド接続 高可用性設計パターン",
				15,
				ACC1,
				"middle",
				"bold",
			),
			// Pattern 1
			r(18, 45, 230, 170, BOX, 8, ACC1, 1),
			t(133, 62, "パターン1: DX+VPNバックアップ", 10, ACC1),
			r(28, 75, 90, 32, GRAY, 5),
			t(73, 96, "On-Prem", 11, TXT),
			r(155, 68, 80, 28, "#1e4a2e", 5),
			t(195, 86, "VGW", 11, TXT),
			r(155, 110, 80, 28, "#1e4a2e", 5),
			t(195, 128, "TGW", 11, TXT),
			arrow(118, 84, 155, 82, ACC1),
			t(136, 77, "DX(Primary)", 8, ACC1),
			arrow(118, 100, 155, 124, GRAY),
			t(136, 116, "VPN(Backup)", 8, GRAY),
			t(133, 175, "BGP自動FO  |  DX優先", 10, GRAY),
			// Pattern 2
			r(268, 45, 230, 170, BOX, 8, ACC2, 1),
			t(383, 62, "パターン2: デュアルDX HA", 10, ACC2),
			r(278, 75, 90, 32, GRAY, 5),
			t(323, 96, "On-Prem", 11, TXT),
			r(398, 60, 85, 25, "#1e4a2e", 5),
			t(440, 76, "DX Loc 1", 10, TXT),
			r(398, 92, 85, 25, "#1e4a2e", 5),
			t(440, 108, "DX Loc 2", 10, TXT),
			r(398, 124, 85, 25, "#1e4a2e", 5),
			t(440, 140, "DX Loc 1'", 10, TXT),
			r(398, 156, 85, 25, "#1e4a2e", 5),
			t(440, 172, "DX Loc 2'", 10, TXT),
			arrow(368, 87, 398, 73),
			arrow(368, 97, 398, 104),
			arrow(368, 107, 398, 136),
			arrow(368, 117, 398, 168),
			t(383, 195, "2ロケーション×2接続=4本 99.99%", 10, GRAY),
			// Pattern 3
			r(518, 45, 262, 170, BOX, 8, "#9c27b0", 1),
			t(649, 62, "パターン3: TGW集約ハブ", 10, "#ce93d8"),
			r(528, 70, 75, 28, GRAY, 5),
			t(565, 89, "On-Prem", 11, TXT),
			r(615, 54, 80, 28, "#1e4a2e", 5),
			t(655, 72, "DX/VPN", 11, TXT),
			r(720, 54, 50, 28, BOX, 5, ACC2, 1),
			t(745, 72, "VPC A", 10, ACC2),
			r(720, 95, 50, 28, BOX, 5, ACC2, 1),
			t(745, 113, "VPC B", 10, ACC2),
			r(720, 136, 50, 28, BOX, 5, ACC2, 1),
			t(745, 154, "VPC C", 10, ACC2),
			r(638, 110, 65, 55, "#1e4a2e", 8, ACC1, 1),
			t(670, 133, "TGW", 14, ACC1, "middle", "bold"),
			arrow(603, 80, 638, 125),
			arrow(695, 125, 720, 68),
			arrow(695, 135, 720, 109),
			arrow(695, 145, 720, 150),
			t(649, 195, "VPC間推移的ルーティング", 10, GRAY),
			// DX vs VPN comparison
			r(18, 240, 764, 180, BOX, 8, GRAY, 1),
			t(400, 258, "DX vs VPN 比較サマリー", 14, ACC1, "middle", "bold"),
			r(28, 268, 360, 30, "#0d3349", 4),
			t(
				208,
				287,
				"Direct Connect: 専用線・安定・高帯域・低遅延・本番基幹",
				12,
				TXT,
			),
			r(28, 303, 360, 30, "#0d3349", 4),
			t(
				208,
				322,
				"Site-to-Site VPN: インターネット・迅速・安価・バックアップ",
				12,
				TXT,
			),
			r(28, 338, 360, 30, "#0d3349", 4),
			t(208, 357, "Client VPN: リモートユーザー・OpenVPN・SSO対応", 12, TXT),
			r(400, 268, 370, 30, "#0d3349", 4),
			t(585, 287, "MACsec(DX Layer2暗号化) or VPN over DX", 12, TXT),
			r(400, 303, 370, 30, "#0d3349", 4),
			t(585, 322, "ECMP: TGW+VPN複数接続で帯域集約(最大~50G)", 12, TXT),
			r(400, 338, 370, 30, "#0d3349", 4),
			t(585, 357, "99.99%SLA: 2DXロケーション×2接続 = 4接続", 12, TXT),
			t(
				400,
				408,
				"選択基準: 帯域・安定性・コスト・セットアップ時間・暗号化要件",
				12,
				GRAY,
			),
		].join(""),
		450,
	);
}

function svgBgpRouting(): string {
	return svgWrap(
		[
			r(0, 0, 800, 380, BG),
			t(400, 25, "BGPルーティング優先順位 — AWS", 15, ACC1, "middle", "bold"),
			r(80, 55, 640, 55, BOX, 8, ACC1, 1),
			r(80, 55, 55, 55, ACC1, 8),
			t(107, 87, "1", 22, BG, "middle", "bold"),
			t(
				440,
				76,
				"最長プレフィックス一致 (Longest Prefix Match)",
				14,
				ACC1,
				"middle",
				"bold",
			),
			t(
				440,
				96,
				"192.168.1.0/28 > /24 > /16 > /0 (より具体的なルートが優先)",
				11,
				TXT,
			),
			r(80, 120, 640, 55, BOX, 8, ACC2, 1),
			r(80, 120, 55, 55, ACC2, 8),
			t(107, 152, "2", 22, BG, "middle", "bold"),
			t(
				440,
				141,
				"静的ルート > 伝搬ルート (BGPルート)",
				14,
				ACC2,
				"middle",
				"bold",
			),
			t(
				440,
				161,
				"Route Tableに手動設定した静的ルートが伝搬ルートより優先",
				11,
				TXT,
			),
			r(80, 185, 640, 55, BOX, 8, "#9c27b0", 1),
			r(80, 185, 55, 55, "#9c27b0", 8),
			t(107, 217, "3", 22, BG, "middle", "bold"),
			t(
				440,
				206,
				"DX (BGP) ルート > VPN ルート",
				14,
				"#ce93d8",
				"middle",
				"bold",
			),
			t(
				440,
				226,
				"同一プレフィックスで競合した場合、Direct Connectルートが優先",
				11,
				TXT,
			),
			r(80, 250, 640, 55, BOX, 8, GRAY, 1),
			r(80, 250, 55, 55, GRAY, 8),
			t(107, 282, "4", 22, BG, "middle", "bold"),
			t(
				440,
				271,
				"AS Path Prepending — 経路優先度の操作",
				14,
				TXT,
				"middle",
				"bold",
			),
			t(
				440,
				291,
				"パス長を人為的に増やして優先度を下げる: [7224 7224 7224]",
				11,
				TXT,
			),
			r(20, 325, 760, 40, BOX, 6, GRAY, 1),
			t(
				400,
				343,
				"BGPコミュニティ: 7224:8100(同リージョン優先) 7224:8200(同大陸) 7224:9100(ローカルのみ)",
				11,
				GRAY,
			),
			t(400, 363, "MD5認証推奨  |  BFD(高速障害検知)有効化推奨", 11, GRAY),
		].join(""),
	);
}

// ---- Map slide titles to SVG generators ----
const svgMap: Record<string, () => string> = {
	"VPCとは — 概要とCIDR設計": svgVpcOverview,
	VPCの主要コンポーネント: svgVpcOverview,
	VPCアーキテクチャ全体図: svgVpcOverview,
	"パブリック vs プライベートサブネット（1/2）": svgSubnetDesign,
	"パブリック vs プライベートサブネット（2/2）": svgSubnetDesign,
	サブネット構成図: svgSubnetDesign,
	ルートテーブルの仕組み: svgRouteTable,
	"ルートテーブルの仕組み（コード例）": svgRouteTable,
	"Internet Gateway & NAT Gateway（1/2）": svgSubnetDesign,
	"Internet Gateway & NAT Gateway（2/2）": svgSubnetDesign,
	"セキュリティグループ vs NACL（1/2）": svgSgNacl,
	"セキュリティグループ vs NACL（2/2）": svgSgNacl,
	"SG / NACL 比較表": svgSgNacl,
	"VPC Peering": svgVpcConnectivityFlow,
	"VPC Endpoints — Gateway型 & Interface型（1/2）": svgVpcConnectivityFlow,
	"VPC Endpoints — Gateway型 & Interface型（2/2）": svgVpcConnectivityFlow,
	VPC接続の選択フロー: svgVpcConnectivityFlow,
	"Direct Connect 概要（1/2）": svgDxArchitecture,
	"Direct Connect 概要（2/2）": svgDxArchitecture,
	"DXの物理構成とコンポーネント（1/2）": svgDxArchitecture,
	"DXの物理構成とコンポーネント（2/2）": svgDxArchitecture,
	"Virtual Interface (VIF) の種類（1/2）": svgDxArchitecture,
	"Virtual Interface (VIF) の種類（2/2）": svgDxArchitecture,
	"Private VIF / Public VIF / Transit VIF 比較": svgDxArchitecture,
	"DX Gateway（1/2）": svgDxArchitecture,
	"DX Gateway（2/2）": svgDxArchitecture,
	DXアーキテクチャ図: svgDxArchitecture,
	"DX冗長構成パターン（1/2）": svgHaDesignPatterns,
	"DX冗長構成パターン（2/2）": svgHaDesignPatterns,
	"BGPの基礎知識（1/2）": svgBgpRouting,
	"BGPの基礎知識（2/2）": svgBgpRouting,
	"ASN (Autonomous System Number)（1/2）": svgBgpRouting,
	"ASN (Autonomous System Number)（2/2）": svgBgpRouting,
	"AWSにおけるBGPルート伝搬（1/2）": svgBgpRouting,
	"AWSにおけるBGPルート伝搬（2/2）": svgBgpRouting,
	"BGP設定のポイント（1/2）": svgBgpRouting,
	"BGP設定のポイント（2/2）": svgBgpRouting,
	"Site-to-Site VPN 概要（1/2）": svgVpnArchitecture,
	"Site-to-Site VPN 概要（2/2）": svgVpnArchitecture,
	"IPsecトンネルの仕組み（1/2）": svgVpnArchitecture,
	"IPsecトンネルの仕組み（2/2）": svgVpnArchitecture,
	"Customer Gateway & Virtual Private Gateway（1/2）": svgVpnArchitecture,
	"Customer Gateway & Virtual Private Gateway（2/2）": svgVpnArchitecture,
	VPN接続アーキテクチャ図: svgVpnArchitecture,
	"Accelerated Site-to-Site VPN（1/2）": svgVpnArchitecture,
	"Accelerated Site-to-Site VPN（2/2）": svgVpnArchitecture,
	"Client VPN 概要 — リモートアクセスVPN（1/2）": svgClientVpn,
	"Client VPN 概要 — リモートアクセスVPN（2/2）": svgClientVpn,
	"Client VPN の認証方式（1/2）": svgClientVpn,
	"Client VPN の認証方式（2/2）": svgClientVpn,
	"Client VPN ネットワーク構成": svgClientVpn,
	"Site-to-Site VPN vs Client VPN 比較表": svgClientVpn,
	"Transit Gateway 概要（1/2）": svgTgwArchitecture,
	"Transit Gateway 概要（2/2）": svgTgwArchitecture,
	TGWルーティングとルートテーブル: svgTgwArchitecture,
	"TGW + VPN接続（1/2）": svgTgwArchitecture,
	"TGW + VPN接続（2/2）": svgTgwArchitecture,
	"TGW + Direct Connect（1/2）": svgTgwArchitecture,
	"TGW + Direct Connect（2/2）": svgTgwArchitecture,
	"TGWピアリング（リージョン間）（1/2）": svgTgwArchitecture,
	"TGWピアリング（リージョン間）（2/2）": svgTgwArchitecture,
	"ECMP (Equal Cost Multi-Path) とは（1/2）": svgEcmpScaling,
	"ECMP (Equal Cost Multi-Path) とは（2/2）": svgEcmpScaling,
	"TGW + VPN ECMP構成（1/2）": svgEcmpScaling,
	"TGW + VPN ECMP構成（2/2）": svgEcmpScaling,
	ECMP帯域幅スケーリング: svgEcmpScaling,
	"ECMP設計の注意点と制限事項（1/2）": svgEcmpScaling,
	"ECMP設計の注意点と制限事項（2/2）": svgEcmpScaling,
	"GREトンネルとは — IPsecとの比較": svgGreTgw,
	"TGW GREアタッチメント（1/2）": svgGreTgw,
	"TGW GREアタッチメント（2/2）": svgGreTgw,
	"GRE + TGW 構成図": svgGreTgw,
	"Transit Gateway アーキテクチャ全体図": svgTgwArchitecture,
	"DX vs VPN 比較表": svgHaDesignPatterns,
	高可用性設計パターン: svgHaDesignPatterns,
	"ハイブリッド接続のベストプラクティス（1/2）": svgHaDesignPatterns,
	"ハイブリッド接続のベストプラクティス（2/2）": svgHaDesignPatterns,
};

const data = JSON.parse(readFileSync(dataPath, "utf-8"));
let svgAdded = 0;

for (const slide of data.slides) {
	if (slide.layout === "section" || slide.layout === "center") continue;
	const gen = svgMap[slide.title];
	if (!gen) continue;
	const hasSvg = (slide.content as string[]).some(
		(c) => c.includes("<svg") || c.includes("assets/"),
	);
	if (hasSvg) {
		// Replace asset-ref slides with actual inline SVG
		slide.content = [gen()];
	} else {
		slide.content = [gen(), ...slide.content];
	}
	svgAdded++;
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"));
console.log(
	`Done: added/updated ${svgAdded} SVGs in networking slides-data.json`,
);
