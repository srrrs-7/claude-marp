import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219130000_oauth2-oidc-deep-dive/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const A1 = "#f9a825";
const A2 = "#e91e63";
const TXT = "#ffffff";
const GRN = "#4caf50";
const BLU = "#2196f3";

function svgWrap(inner: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// Slide 3: Authorization Code Flow with all parameters
const svg3 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">認可コードフロー — 全パラメータ解説</text>
<rect x="20" y="45" width="110" height="40" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="75" y="70" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">Browser</text>
<rect x="200" y="45" width="130" height="40" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="265" y="70" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">Client App</text>
<rect x="440" y="45" width="140" height="40" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="510" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">Auth Server</text>
<rect x="650" y="45" width="130" height="40" rx="6" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="715" y="70" text-anchor="middle" fill="${BLU}" font-size="12" font-family="sans-serif">Resource Server</text>
<line x1="75" y1="85" x2="75" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="265" y1="85" x2="265" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="510" y1="85" x2="510" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="715" y1="85" x2="715" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="75" y1="108" x2="260" y2="108" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="260,108 248,102 248,114" fill="${GRN}"/>
<text x="168" y="100" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">① ログイン開始</text>
<line x1="260" y1="130" x2="80" y2="130" stroke="${A2}" stroke-width="1.5"/>
<polygon points="80,130 92,124 92,136" fill="${A2}"/>
<text x="168" y="122" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">② 302 redirect (response_type=code, state, code_challenge)</text>
<line x1="75" y1="155" x2="505" y2="155" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="505,155 493,149 493,161" fill="${GRN}"/>
<text x="290" y="147" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">③ GET /authorize (+ scope, nonce)</text>
<line x1="510" y1="180" x2="510" y2="200" stroke="${A1}" stroke-width="1.5"/>
<text x="560" y="194" fill="${A1}" font-size="10" font-family="sans-serif">認証UI</text>
<line x1="505" y1="220" x2="80" y2="220" stroke="${A1}" stroke-width="1.5"/>
<polygon points="80,220 92,214 92,226" fill="${A1}"/>
<text x="290" y="212" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">④ 302 redirect_uri?code=xxx&state=yyy</text>
<line x1="75" y1="245" x2="260" y2="245" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="260,245 248,239 248,251" fill="${GRN}"/>
<text x="168" y="237" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑤ code callback</text>
<line x1="265" y1="268" x2="505" y2="268" stroke="${A2}" stroke-width="1.5"/>
<polygon points="505,268 493,262 493,274" fill="${A2}"/>
<text x="385" y="260" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑥ POST /token (code, code_verifier, client_secret)</text>
<line x1="505" y1="290" x2="270" y2="290" stroke="${A1}" stroke-width="1.5"/>
<polygon points="270,290 282,284 282,296" fill="${A1}"/>
<text x="385" y="282" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑦ access_token + refresh_token (+ id_token)</text>
<line x1="265" y1="315" x2="710" y2="315" stroke="${A2}" stroke-width="1.5"/>
<polygon points="710,315 698,309 698,321" fill="${A2}"/>
<text x="490" y="307" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑧ GET /resource (Bearer access_token)</text>
<line x1="710" y1="338" x2="270" y2="338" stroke="${BLU}" stroke-width="1.5"/>
<polygon points="270,338 282,332 282,344" fill="${BLU}"/>
<text x="490" y="356" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑨ 200 OK (protected resource)</text>
`);

// Slide 6: Client Credentials Flow
const svg6 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">クライアントクレデンシャルフロー — M2M 認証</text>
<rect x="60" y="80" width="200" height="70" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="160" y="112" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">Client (M2M)</text>
<text x="160" y="135" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">microservice / CLI</text>
<rect x="330" y="80" width="200" height="70" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="430" y="112" text-anchor="middle" fill="${A1}" font-size="15" font-weight="bold" font-family="sans-serif">Auth Server</text>
<text x="430" y="135" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Token Endpoint</text>
<rect x="600" y="80" width="160" height="70" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="680" y="112" text-anchor="middle" fill="${BLU}" font-size="15" font-weight="bold" font-family="sans-serif">API</text>
<text x="680" y="135" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Resource Server</text>
<line x1="260" y1="220" x2="330" y2="220" stroke="${A2}" stroke-width="2"/>
<polygon points="330,220 318,214 318,226" fill="${A2}"/>
<text x="295" y="210" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">① POST /token</text>
<text x="295" y="240" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">grant_type=client_credentials</text>
<text x="295" y="258" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">client_id + client_secret</text>
<line x1="530" y1="290" x2="260" y2="290" stroke="${A1}" stroke-width="2"/>
<polygon points="260,290 272,284 272,296" fill="${A1}"/>
<text x="395" y="282" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">② access_token (no user context)</text>
<line x1="260" y1="330" x2="600" y2="330" stroke="${GRN}" stroke-width="2"/>
<polygon points="600,330 588,324 588,336" fill="${GRN}"/>
<text x="430" y="322" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">③ API呼び出し (Bearer token)</text>
<text x="400" y="375" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">ユーザーなし・サービス間通信専用</text>
`);

// Slide 8: Device Authorization Grant
const svg8 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">デバイス認可グラント (RFC 8628) — CLI / TV / IoT</text>
<rect x="20" y="50" width="140" height="55" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="90" y="74" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">Device</text>
<text x="90" y="95" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">TV / CLI / IoT</text>
<rect x="330" y="50" width="140" height="55" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="74" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">Auth Server</text>
<text x="400" y="95" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Device Endpoint</text>
<rect x="610" y="50" width="160" height="55" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="690" y="74" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">User Browser</text>
<text x="690" y="95" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">スマホ / PC</text>
<line x1="160" y1="140" x2="330" y2="140" stroke="${GRN}" stroke-width="2"/>
<polygon points="330,140 318,134 318,146" fill="${GRN}"/>
<text x="245" y="130" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">① POST /device_authorization</text>
<line x1="330" y1="168" x2="160" y2="168" stroke="${A1}" stroke-width="2"/>
<polygon points="160,168 172,162 172,174" fill="${A1}"/>
<text x="245" y="160" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">② device_code + user_code + verification_uri</text>
<rect x="20" y="185" width="140" height="55" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="90" y="206" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">画面表示:</text>
<text x="90" y="225" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">USER CODE: ABCD-1234</text>
<text x="400" y="230" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">③ ユーザーにコード表示</text>
<line x1="400" y1="245" x2="690" y2="245" stroke="${A2}" stroke-width="2"/>
<polygon points="690,245 678,239 678,251" fill="${A2}"/>
<text x="545" y="237" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">④ ブラウザでコード入力・認証</text>
<line x1="90" y1="270" x2="330" y2="270" stroke="${GRN}" stroke-width="2" stroke-dasharray="5,3"/>
<text x="210" y="262" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑤ Poll /token (device_code)</text>
<line x1="330" y1="300" x2="90" y2="300" stroke="${A1}" stroke-width="2"/>
<polygon points="90,300 102,294 102,306" fill="${A1}"/>
<text x="245" y="292" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑥ access_token 発行 (認証完了後)</text>
<text x="400" y="360" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">ブラウザなし端末でも安全にOAuth2認可が可能</text>
`);

// Slide 15: Refresh Token strategy
const svg15 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">リフレッシュトークン戦略 — ライフサイクルと設計</text>
<rect x="20" y="50" width="180" height="120" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="110" y="76" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Access Token</text>
<text x="110" y="102" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: 15分〜1時間</text>
<text x="110" y="125" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">ステートレス</text>
<text x="110" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">API認可に使用</text>
<rect x="310" y="50" width="180" height="120" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="400" y="76" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Refresh Token</text>
<text x="400" y="102" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: 数日〜数週間</text>
<text x="400" y="125" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">安全なストレージ必須</text>
<text x="400" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Rotation推奨</text>
<rect x="600" y="50" width="180" height="120" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="690" y="76" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">Token Rotation</text>
<text x="690" y="102" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">使用ごとに新発行</text>
<text x="690" y="125" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">古トークン即時無効</text>
<text x="690" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">漏洩検知に有効</text>
<text x="400" y="210" text-anchor="middle" fill="${TXT}" font-size="14" font-weight="bold" font-family="sans-serif">ライフサイクル</text>
<line x1="50" y1="230" x2="750" y2="230" stroke="${TXT}" stroke-width="1" opacity="0.4"/>
<rect x="50" y="245" width="120" height="30" rx="4" fill="${A1}" opacity="0.7"/>
<text x="110" y="265" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Initial Auth</text>
<rect x="185" y="245" width="120" height="30" rx="4" fill="${A2}" opacity="0.7"/>
<text x="245" y="265" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Access Token使用</text>
<rect x="320" y="245" width="120" height="30" rx="4" fill="${BLU}" opacity="0.7"/>
<text x="380" y="265" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Token期限切れ</text>
<rect x="455" y="245" width="120" height="30" rx="4" fill="${GRN}" opacity="0.7"/>
<text x="515" y="265" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Refresh実行</text>
<rect x="590" y="245" width="150" height="30" rx="4" fill="${A1}" opacity="0.7"/>
<text x="665" y="265" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">新Token発行</text>
<text x="400" y="325" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">セキュリティ原則:</text>
<text x="400" y="353" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Refresh Token は httpOnly Cookie / Secure Storage に保管</text>
<text x="400" y="378" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Rotation で盗難検知 → 不正使用即時無効化</text>
`);

// Slide 16: Scope design patterns
const svg16 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">スコープ設計パターン — 粒度と命名規則</text>
<rect x="20" y="50" width="230" height="310" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="285" y="50" width="230" height="310" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="50" width="230" height="310" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="135" y="77" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">粗粒度</text>
<text x="400" y="77" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">細粒度</text>
<text x="665" y="77" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Resource-based</text>
<text x="135" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">read</text>
<text x="135" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">write</text>
<text x="135" y="170" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">admin</text>
<text x="135" y="215" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">シンプル</text>
<text x="135" y="240" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">管理容易</text>
<text x="135" y="270" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">権限過剰の恐れ</text>
<text x="400" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">users:read</text>
<text x="400" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">users:write</text>
<text x="400" y="170" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">orders:read</text>
<text x="400" y="200" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">orders:delete</text>
<text x="400" y="240" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最小権限原則</text>
<text x="400" y="265" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">スコープが増える</text>
<text x="665" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">api://myapp/read</text>
<text x="665" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">api://myapp/write</text>
<text x="665" y="170" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">api://myapp/admin</text>
<text x="665" y="215" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">Azure AD標準</text>
<text x="665" y="240" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">URI形式で衝突回避</text>
<text x="665" y="265" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">マルチAPI対応</text>
<text x="400" y="350" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">推奨: 細粒度 + リソース型 / Least Privilege 徹底</text>
`);

// Slide 17: OAuth2 flow selection matrix
const svg17 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">OAuth2 フロー選択マトリクス</text>
<rect x="15" y="48" width="770" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="155" y="73" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">ユースケース</text>
<text x="345" y="73" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">推奨フロー</text>
<text x="555" y="73" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">PKCE</text>
<text x="700" y="73" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">User Context</text>
<text x="155" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Webアプリ (サーバーサイド)</text>
<text x="345" y="112" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">Authorization Code</text>
<text x="555" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">任意</text>
<text x="700" y="112" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="155" y="149" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SPA / モバイルアプリ</text>
<text x="345" y="149" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">Authorization Code</text>
<text x="555" y="149" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">必須 (S256)</text>
<text x="700" y="149" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="155" y="186" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">M2M / サービス間</text>
<text x="345" y="186" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">Client Credentials</text>
<text x="555" y="186" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">不要</text>
<text x="700" y="186" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">なし</text>
<text x="155" y="223" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">TV / CLI / IoT</text>
<text x="345" y="223" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">Device Authorization</text>
<text x="555" y="223" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">不要</text>
<text x="700" y="223" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="155" y="260" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">レガシー (非推奨)</text>
<text x="345" y="260" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Resource Owner Password</text>
<text x="555" y="260" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">使用禁止</text>
<text x="700" y="260" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">非推奨</text>
<line x1="15" y1="88" x2="785" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="15" y1="125" x2="785" y2="125" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="162" x2="785" y2="162" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="199" x2="785" y2="199" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="236" x2="785" y2="236" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="245" y1="48" x2="245" y2="275" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="460" y1="48" x2="460" y2="275" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="640" y1="48" x2="640" y2="275" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="320" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">Implicit フローは廃止 (RFC 6749 → BCP 212 により非推奨)</text>
`);

// Slide 22: Access Token vs ID Token
const svg22 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">Access Token vs ID Token — 用途の厳密な分離</text>
<rect x="30" y="50" width="340" height="310" rx="12" fill="${BOX}" stroke="${A2}" stroke-width="2.5"/>
<rect x="430" y="50" width="340" height="310" rx="12" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="200" y="78" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">Access Token</text>
<text x="600" y="78" text-anchor="middle" fill="${A1}" font-size="15" font-weight="bold" font-family="sans-serif">ID Token</text>
<text x="200" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">対象: Resource Server</text>
<text x="600" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">対象: Client (RP)</text>
<text x="200" y="138" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">用途: API認可</text>
<text x="600" y="138" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">用途: ユーザー認証証明</text>
<text x="200" y="168" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">含む情報: scope / aud</text>
<text x="600" y="168" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">含む情報: sub / email / name</text>
<text x="200" y="198" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">JWT か opaque か選択可</text>
<text x="600" y="198" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">常に JWT</text>
<text x="200" y="228" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">送る先: API サーバー</text>
<text x="600" y="228" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">送る先: Client内部のみ</text>
<rect x="50" y="255" width="300" height="45" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="200" y="278" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Authorization: Bearer &lt;token&gt;</text>
<rect x="450" y="255" width="300" height="45" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="600" y="278" text-anchor="middle" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">APIには絶対に送らない!</text>
<text x="200" y="330" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">scope の中身だけ見る</text>
<text x="600" y="330" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">sub でユーザー識別</text>
`);

// Slide 28: OIDC logout flow comparison
const svg28 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">OIDC ログアウトフロー比較 — Front-Channel vs Back-Channel</text>
<rect x="20" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Front-Channel Logout</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">Back-Channel Logout</text>
<text x="40" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">方式: iframe URL呼び出し</text>
<text x="40" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">ブラウザ経由: Yes</text>
<text x="40" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">Cookieセッション削除: Yes</text>
<text x="40" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">信頼性: iframe ブロックで失敗</text>
<text x="40" y="224" fill="${TXT}" font-size="12" font-family="sans-serif">RFC: OIDC Front-Channel Logout</text>
<text x="40" y="265" fill="${A2}" font-size="12" font-family="sans-serif">短所: サードパーティCookie廃止で問題</text>
<text x="40" y="290" fill="${A1}" font-size="12" font-family="sans-serif">長所: 実装シンプル</text>
<text x="430" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">方式: サーバー→サーバーPOST</text>
<text x="430" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">ブラウザ経由: No</text>
<text x="430" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">JWT logout_token送信</text>
<text x="430" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">信頼性: ブラウザ依存なし</text>
<text x="430" y="224" fill="${TXT}" font-size="12" font-family="sans-serif">RFC: OIDC Back-Channel Logout</text>
<text x="430" y="265" fill="${GRN}" font-size="12" font-family="sans-serif">長所: 確実・Cookie非依存</text>
<text x="430" y="290" fill="${A2}" font-size="12" font-family="sans-serif">短所: エンドポイント実装必要</text>
<text x="400" y="370" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">現代的な実装: Back-Channel Logout を推奨</text>
`);

// Slide 33: Security extensions overview
const svg33 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">OAuth2 セキュリティ拡張仕様 — 概要</text>
<rect x="20" y="50" width="230" height="100" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="135" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">DPoP</text>
<text x="135" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">RFC 9449</text>
<text x="135" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">トークン所有証明</text>
<text x="135" y="142" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Bearer盗難対策</text>
<rect x="285" y="50" width="230" height="100" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="400" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">PAR</text>
<text x="400" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">RFC 9126</text>
<text x="400" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">事前認可リクエスト</text>
<text x="400" y="142" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">URLパラメータ露出防止</text>
<rect x="550" y="50" width="230" height="100" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="665" y="78" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">RAR</text>
<text x="665" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">RFC 9396</text>
<text x="665" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">精緻な認可リクエスト</text>
<text x="665" y="142" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">scopeを超えた表現力</text>
<rect x="20" y="185" width="230" height="100" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="135" y="213" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">JARM</text>
<text x="135" y="235" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">JWT Secured Authz Response</text>
<text x="135" y="257" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">レスポンス改ざん防止</text>
<text x="135" y="277" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">署名・暗号化対応</text>
<rect x="285" y="185" width="230" height="100" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="213" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">mTLS</text>
<text x="400" y="235" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">RFC 8705</text>
<text x="400" y="257" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">証明書バインドトークン</text>
<text x="400" y="277" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">クライアント認証強化</text>
<rect x="550" y="185" width="230" height="100" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="665" y="213" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">FAPI 2.0</text>
<text x="665" y="235" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Financial-grade API</text>
<text x="665" y="257" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">PAR + DPoP + RAR 統合</text>
<text x="665" y="277" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">金融・医療向け</text>
<text x="400" y="360" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">組み合わせ: PAR + DPoP + JARM = 最高セキュリティレベル</text>
`);

// Slide 42: FAPI 2.0 overview
const svg42 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">FAPI 2.0 Security Profile — 金融グレード API</text>
<rect x="30" y="50" width="740" height="310" rx="12" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="80" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">FAPI 2.0 構成要素</text>
<rect x="60" y="95" width="200" height="70" rx="8" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="160" y="122" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">PAR (必須)</text>
<text x="160" y="147" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">事前認可リクエスト</text>
<rect x="300" y="95" width="200" height="70" rx="8" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="400" y="122" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">DPoP / mTLS (必須)</text>
<text x="400" y="147" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">証明書バインドトークン</text>
<rect x="540" y="95" width="200" height="70" rx="8" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="640" y="122" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">PKCE (必須)</text>
<text x="640" y="147" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">コード横取り防止</text>
<rect x="60" y="190" width="200" height="70" rx="8" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="160" y="217" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">RAR (推奨)</text>
<text x="160" y="242" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">精緻な認可表現</text>
<rect x="300" y="190" width="200" height="70" rx="8" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="400" y="217" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">JARM (推奨)</text>
<text x="400" y="242" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">レスポンス署名</text>
<rect x="540" y="190" width="200" height="70" rx="8" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="640" y="217" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">OpenBanking対応</text>
<text x="640" y="242" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">PSD2 / UK OB</text>
<text x="400" y="300" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">適用領域: 金融API / 医療 / 政府 / 高セキュリティサービス</text>
<text x="400" y="330" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">すべての拡張仕様を組み合わせた最高レベルのセキュリティプロファイル</text>
`);

const svgMap: Record<number, string> = {
	3: svg3,
	6: svg6,
	8: svg8,
	15: svg15,
	16: svg16,
	17: svg17,
	22: svg22,
	28: svg28,
	33: svg33,
	42: svg42,
};

for (const [idxStr, svg] of Object.entries(svgMap)) {
	const idx = parseInt(idxStr);
	const slide = data.slides[idx];
	if (slide) {
		slide.content = [svg, ...slide.content];
	}
}

writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done: added SVGs to", Object.keys(svgMap).length, "slides");
