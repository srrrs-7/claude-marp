import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219210000_oidc-vs-saml/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const BG = "#1a1a2e",
	BOX = "#16213e",
	A1 = "#f9a825",
	A2 = "#e91e63",
	TXT = "#ffffff",
	GRN = "#4caf50",
	BLU = "#2196f3";
const w = (s: string, h = 400) =>
	`<svg viewBox="0 0 800 ${h}" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;

// Slide 7: OIDC/OAuth 2.0 emergence
const svg7 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">OIDC / OAuth 2.0 の登場 — なぜ必要になったか</text>
<text x="200" y="58" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">SAML の課題</text>
<text x="590" y="58" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">OAuth 2.0 + OIDC の解決</text>
<line x1="400" y1="45" x2="400" y2="340" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
${[
	[30, 70, "XML/SOAPベース", "重量、実装困難", A2],
	[30, 135, "ブラウザ依存", "モバイルアプリ非対応", A2],
	[30, 200, "クレデンシャル共有", "パスワードを渡す危険", A2],
	[30, 265, "IdP中心設計", "APIへの認可が難しい", A2],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="360" height="55" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="50" y="${Number(y) + 19}" font-size="11" fill="${c}" font-weight="bold">${title}</text>
<text x="50" y="${Number(y) + 38}" font-size="10" fill="${TXT}">${desc}</text>`,
	)
	.join("")}
${[
	[410, 70, "JSON/RESTベース", "軽量、モバイル/SPA対応", GRN],
	[410, 135, "リダイレクト/ネイティブ", "任意のプラットフォーム", GRN],
	[410, 200, "トークンベース", "Access Tokenで委任認可", GRN],
	[410, 265, "API-First設計", "スコープで細粒度制御", GRN],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="360" height="55" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="430" y="${Number(y) + 19}" font-size="11" fill="${c}" font-weight="bold">${title}</text>
<text x="430" y="${Number(y) + 38}" font-size="10" fill="${TXT}">${desc}</text>`,
	)
	.join("")}
<rect x="150" y="338" width="500" height="30" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="358" font-size="11" fill="${A1}" text-anchor="middle">OAuth 2.0(RFC 6749) 2012年 + OIDC 2014年 → Web/モバイル時代の標準へ</text>`,
	380,
);

// Slide 11: SAML SP-Initiated flow key points
const svg11 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">SAML SP-Initiated フロー — ポイント</text>
${[
	[50, "ユーザー", BLU],
	[230, "SP\n(Salesforce等)", A1],
	[540, "IdP\n(Azure AD等)", A2],
]
	.map(
		([
			x,
			label,
			c,
		]) => `<rect x="${Number(x)}" y="50" width="140" height="50" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
${String(label)
	.split("\n")
	.map(
		(l, i) =>
			`<text x="${Number(x) + 70}" y="${68 + i * 16}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
${[
	[120, 125, 170, 125, "① ProtectedリソースにGETリクエスト", BLU, false],
	[230, 140, 120, 140, "② AuthnRequestを生成（SAMLRequest）", A1, true],
	[
		170,
		165,
		540,
		165,
		"③ HTTP-Redirect: Location: IdP?SAMLRequest=...",
		A1,
		false,
	],
	[540, 190, 540, 190, "④ 認証（ユーザーが認証情報入力）", A2, false],
	[540, 215, 170, 215, "⑤ SAML Response（HTML form POST）", A2, true],
	[170, 240, 230, 240, "⑥ ACS URLにPOST → Assertion検証", A1, false],
	[230, 265, 120, 265, "⑦ セッション確立→リソース提供", A1, false],
]
	.map(([x1, y1, x2, y2, label, c, dashed]) => {
		const lx = (Number(x1) + Number(x2)) / 2;
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.5" ${dashed ? 'stroke-dasharray="5"' : ""}/>
<polygon points="${Number(x2) > Number(x1) ? Number(x2) + "-5" : Number(x2) + "+5"},${Number(y2) - 4} ${x2},${y2} ${Number(x2) > Number(x1) ? Number(x2) + "-5" : Number(x2) + "+5"},${Number(y2) + 4}" fill="${c}"/>
<text x="${lx}" y="${Number(y1) - 5}" font-size="9" fill="${TXT}" text-anchor="middle">${label}</text>`;
	})
	.join("")}
<rect x="30" y="295" width="740" height="75" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="316" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">SAML のセキュリティポイント</text>
<text x="50" y="336" font-size="10" fill="${TXT}">• Assertion署名: IdPの秘密鍵で署名 → SPが公開鍵で検証（改ざん検知）</text>
<text x="50" y="352" font-size="10" fill="${TXT}">• タイムスタンプ検証: NotBefore/NotOnOrAfter でリプレイ攻撃防止</text>
<text x="50" y="368" font-size="10" fill="${TXT}">• InResponseTo: AuthnRequest との紐付けで CSRF 防止</text>`,
	380,
);

// Slide 15: OIDC flow key points
const svg15 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">OIDC Authorization Code フロー — ポイント</text>
${[
	[50, "ユーザー\n/Browser", BLU],
	[240, "Client\n(Webアプリ)", A1],
	[540, "AuthZ Server\n(IdP/OIDC)", A2],
	[700, "UserInfo\nEndpoint", GRN],
]
	.map(
		([
			x,
			label,
			c,
		]) => `<rect x="${Number(x)}" y="50" width="120" height="45" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
${String(label)
	.split("\n")
	.map(
		(l, i) =>
			`<text x="${Number(x) + 60}" y="${66 + i * 15}" font-size="10" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
${[
	[110, 120, 240, 120, "① ログインリクエスト", A1, false],
	[240, 140, 110, 140, "② Redirect: /authorize?scope=openid", A1, true],
	[110, 160, 540, 160, "③ 認証・認可同意", BLU, false],
	[540, 180, 110, 180, "④ Redirect: /callback?code=AUTH_CODE", A2, true],
	[110, 200, 240, 200, "⑤ code を転送", BLU, false],
	[240, 220, 540, 220, "⑥ POST /token (code+client_secret)", A1, false],
	[540, 240, 240, 240, "⑦ access_token + id_token + refresh_token", A2, true],
	[240, 260, 700, 260, "⑧ GET /userinfo (Bearer access_token)", A1, false],
	[700, 280, 240, 280, "⑨ ユーザー属性 (JSON)", GRN, true],
]
	.map(([x1, y1, x2, y2, label, c, dashed]) => {
		const lx = (Number(x1) + Number(x2)) / 2;
		const dir = Number(x2) > Number(x1) ? 1 : -1;
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.5" ${dashed ? 'stroke-dasharray="5"' : ""}/>
<polygon points="${Number(x2) - dir * 6},${Number(y2) - 4} ${x2},${y2} ${Number(x2) - dir * 6},${Number(y2) + 4}" fill="${c}"/>
<text x="${lx}" y="${Number(y1) - 4}" font-size="8.5" fill="${TXT}" text-anchor="middle">${label}</text>`;
	})
	.join("")}
<rect x="30" y="300" width="360" height="65" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="210" y="320" font-size="11" fill="${A1}" text-anchor="middle" font-weight="bold">ID Token の役割</text>
<text x="50" y="338" font-size="9.5" fill="${TXT}">• ユーザー認証の証明 (JWT形式)</text>
<text x="50" y="354" font-size="9.5" fill="${TXT}">• sub, iss, aud, exp, iat クレームが必須</text>
<rect x="410" y="300" width="360" height="65" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="590" y="320" font-size="11" fill="${A2}" text-anchor="middle" font-weight="bold">nonce でリプレイ攻撃防止</text>
<text x="430" y="338" font-size="9.5" fill="${TXT}">• Client がランダム値を /authorize に付加</text>
<text x="430" y="354" font-size="9.5" fill="${TXT}">• ID Token 内の nonce と突合して検証</text>`,
	380,
);

// Slide 26: Claim mapping
const svg26 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">クレームマッピング: IdP → SP 属性変換</text>
<rect x="30" y="45" width="230" height="200" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="145" y="66" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">SAML Assertion</text>
${[
	["NameID", "user@corp.com"],
	["mail", "user@corp.com"],
	["displayName", "田中 太郎"],
	["memberOf", "CN=Sales,OU=Groups"],
	["department", "営業部"],
	["employeeID", "12345"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="50" y="${88 + i * 23}" font-size="9.5" fill="${A1}">${k}</text>
<text x="160" y="${88 + i * 23}" font-size="9" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<rect x="540" y="45" width="230" height="200" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="655" y="66" font-size="12" fill="${GRN}" text-anchor="middle" font-weight="bold">OIDC ID Token Claims</text>
${[
	["sub", "user@corp.com"],
	["email", "user@corp.com"],
	["name", "田中 太郎"],
	["groups", '["sales"]'],
	["dept", "営業部"],
	["employee_id", "12345"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="556" y="${88 + i * 23}" font-size="9.5" fill="${GRN}">${k}</text>
<text x="660" y="${88 + i * 23}" font-size="9" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<rect x="290" y="45" width="220" height="200" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="66" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">変換/マッピング</text>
<text x="400" y="88" font-size="10" fill="${TXT}" text-anchor="middle">変換ルールの例:</text>
${[
	["NameID → sub", "直接マッピング"],
	["mail → email", "名前変換のみ"],
	["memberOf → groups", "パース・正規化必要"],
	["department → dept", "短縮マッピング"],
]
	.map(
		(
			[from, note],
			i,
		) => `<text x="305" y="${108 + i * 25}" font-size="9" fill="${TXT}">${from}</text>
<text x="305" y="${120 + i * 25}" font-size="8" fill="#aaa">  └ ${note}</text>`,
	)
	.join("")}
<rect x="50" y="265" width="700" height="100" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="285" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">マッピング実装のポイント</text>
${[
	"• グループ名の正規化: CN=Sales,OU=Groups → ['sales']（SP側で処理）",
	"• Just-in-Time プロビジョニング: 初回ログイン時にユーザー作成",
	"• 属性の欠損処理: 必須クレームが存在しない場合のフォールバック",
	"• 文字コード: SAML XML は UTF-8 / OIDC JSON は Unicode — 通常問題なし",
]
	.map(
		(t, i) =>
			`<text x="70" y="${300 + i * 16}" font-size="9.5" fill="${TXT}">${t}</text>`,
	)
	.join("")}`,
	380,
);

// Slide 31: B2B federation selection
const svg31 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">B2B フェデレーション — 状況別選択基準</text>
<text x="80" y="62" font-size="13" fill="${A1}" text-anchor="middle">シナリオ</text>
<text x="350" y="62" font-size="13" fill="${A1}" text-anchor="middle">推奨プロトコル</text>
<text x="600" y="62" font-size="13" fill="${A1}" text-anchor="middle">理由</text>
<line x1="30" y1="68" x2="770" y2="68" stroke="#444" stroke-width="1"/>
${[
	[
		"大企業↔大企業\nエンタープライズSSO",
		"SAML 2.0",
		"既存IAM統合\nHR連携が多い",
	],
	["SaaS→社内システム\nAPI連携", "OAuth 2.0\n+ OIDC", "JWT軽量\nAPI認可対応"],
	["モバイルアプリ\nSPA連携", "OIDC\n+ PKCE", "クライアントシークレット\n不要"],
	[
		"レガシーシステム\n移行期",
		"SAML + OIDC\nブリッジ",
		"段階的移行\n両対応IdP",
	],
	[
		"ゼロトラスト\nクラウドネイティブ",
		"OIDC\n+ mTLS",
		"短命トークン\n継続的検証",
	],
]
	.map(([scenario, proto, reason], i) => {
		const y = 78 + i * 58;
		const bg = i % 2 === 0 ? "#0d0d1a" : BOX;
		return `<rect x="30" y="${y}" width="740" height="50" rx="3" fill="${bg}"/>
${String(scenario)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="80" y="${y + 18 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}
${String(proto)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="350" y="${y + 18 + li * 16}" font-size="11" fill="${GRN}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(reason)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="600" y="${y + 18 + li * 16}" font-size="10" fill="#aaa" text-anchor="middle">${l}</text>`,
	)
	.join("")}`;
	})
	.join("")}
<rect x="30" y="372" width="740" height="0" fill="none"/>`,
	380,
);

const svgMap: Record<number, string> = {
	7: svg7,
	11: svg11,
	15: svg15,
	26: svg26,
	31: svg31,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[Number.parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log(
	"Done: added",
	Object.keys(svgMap).length,
	"more SVGs to oidc-vs-saml",
);
