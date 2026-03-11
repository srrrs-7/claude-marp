import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219210000_oidc-vs-saml/slides-data.json";
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

// Slide 4: 認証 vs 認可 comparison
const svg4 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<rect x="30" y="60" width="340" height="280" rx="12" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="430" y="60" width="340" height="280" rx="12" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="200" y="100" text-anchor="middle" fill="${A1}" font-size="22" font-weight="bold" font-family="sans-serif">認証 (AuthN)</text>
<text x="600" y="100" text-anchor="middle" fill="${A2}" font-size="22" font-weight="bold" font-family="sans-serif">認可 (AuthZ)</text>
<text x="200" y="135" text-anchor="middle" fill="${TXT}" font-size="14" font-family="sans-serif">あなたは誰ですか？</text>
<text x="600" y="135" text-anchor="middle" fill="${TXT}" font-size="14" font-family="sans-serif">何ができますか？</text>
<text x="200" y="175" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">ID確認・本人証明</text>
<text x="600" y="175" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">アクセス権限の判断</text>
<text x="200" y="215" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">例: パスワード / MFA</text>
<text x="600" y="215" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">例: RBAC / ポリシー</text>
<text x="200" y="255" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">プロトコル: SAML / OIDC</text>
<text x="600" y="255" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">プロトコル: OAuth2</text>
<text x="200" y="305" text-anchor="middle" fill="${A1}" font-size="13" font-family="sans-serif">先に実行される</text>
<text x="600" y="305" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">後に実行される</text>
<text x="400" y="200" text-anchor="middle" fill="${TXT}" font-size="28" font-family="sans-serif">→</text>
`);

// Slide 5: IdP and SP federation diagram
const svg5 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<rect x="50" y="130" width="180" height="100" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="140" y="175" text-anchor="middle" fill="${A1}" font-size="16" font-weight="bold" font-family="sans-serif">IdP</text>
<text x="140" y="200" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Identity Provider</text>
<rect x="310" y="80" width="180" height="80" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="400" y="115" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">SP / RP</text>
<text x="400" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Service Provider</text>
<rect x="310" y="220" width="180" height="80" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="400" y="255" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">SP / RP</text>
<text x="400" y="280" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Service Provider</text>
<rect x="570" y="130" width="180" height="100" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="660" y="175" text-anchor="middle" fill="${GRN}" font-size="15" font-weight="bold" font-family="sans-serif">ユーザー</text>
<text x="660" y="200" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">End User</text>
<line x1="230" y1="180" x2="310" y2="120" stroke="${A1}" stroke-width="2"/>
<polygon points="310,120 295,125 302,138" fill="${A1}"/>
<line x1="230" y1="180" x2="310" y2="260" stroke="${A1}" stroke-width="2"/>
<polygon points="310,260 295,252 302,265" fill="${A1}"/>
<line x1="570" y1="180" x2="490" y2="120" stroke="${GRN}" stroke-width="2"/>
<polygon points="490,120 500,130 508,118" fill="${GRN}"/>
<text x="400" y="380" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">フェデレーション: IdPで認証 → SP/RPへアサーション伝達</text>
`);

// Slide 8: SAML vs OIDC architecture comparison
const svg8 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" text-anchor="middle" fill="${TXT}" font-size="18" font-weight="bold" font-family="sans-serif">アーキテクチャ概念比較</text>
<rect x="20" y="55" width="370" height="320" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="55" width="370" height="320" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="85" text-anchor="middle" fill="${A1}" font-size="16" font-weight="bold" font-family="sans-serif">SAML 2.0</text>
<text x="595" y="85" text-anchor="middle" fill="${A2}" font-size="16" font-weight="bold" font-family="sans-serif">OIDC / OAuth2</text>
<text x="55" y="120" fill="${TXT}" font-size="13" font-family="sans-serif">• XML ベース</text>
<text x="55" y="150" fill="${TXT}" font-size="13" font-family="sans-serif">• ブラウザリダイレクト中心</text>
<text x="55" y="180" fill="${TXT}" font-size="13" font-family="sans-serif">• エンタープライズ SSO</text>
<text x="55" y="210" fill="${TXT}" font-size="13" font-family="sans-serif">• IdP + SP (Service Provider)</text>
<text x="55" y="240" fill="${TXT}" font-size="13" font-family="sans-serif">• Assertion = XML署名</text>
<text x="55" y="270" fill="${TXT}" font-size="13" font-family="sans-serif">• 2002年〜</text>
<text x="55" y="310" fill="${A1}" font-size="13" font-family="sans-serif">最適: 企業間SSO / レガシー統合</text>
<text x="445" y="120" fill="${TXT}" font-size="13" font-family="sans-serif">• JSON / JWT ベース</text>
<text x="445" y="150" fill="${TXT}" font-size="13" font-family="sans-serif">• API・モバイル対応</text>
<text x="445" y="180" fill="${TXT}" font-size="13" font-family="sans-serif">• 認証(OIDC) + 認可(OAuth2)</text>
<text x="445" y="210" fill="${TXT}" font-size="13" font-family="sans-serif">• IdP + RP (Relying Party)</text>
<text x="445" y="240" fill="${TXT}" font-size="13" font-family="sans-serif">• Token = JWT署名</text>
<text x="445" y="270" fill="${TXT}" font-size="13" font-family="sans-serif">• 2012年〜</text>
<text x="445" y="310" fill="${A2}" font-size="13" font-family="sans-serif">最適: Web/モバイル / マイクロサービス</text>
`);

// Slide 10: SAML SP-initiated SSO flow
const svg10 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">SAML SP-Initiated SSO フロー</text>
<rect x="30" y="50" width="100" height="40" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="80" y="75" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">ユーザー</text>
<rect x="200" y="50" width="120" height="40" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="260" y="75" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">SP (Service)</text>
<rect x="480" y="50" width="120" height="40" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="540" y="75" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">IdP</text>
<line x1="80" y1="90" x2="80" y2="380" stroke="${TXT}" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>
<line x1="260" y1="90" x2="260" y2="380" stroke="${TXT}" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>
<line x1="540" y1="90" x2="540" y2="380" stroke="${TXT}" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>
<line x1="80" y1="120" x2="255" y2="120" stroke="${GRN}" stroke-width="2"/>
<polygon points="255,120 242,114 242,126" fill="${GRN}"/>
<text x="168" y="113" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">① SP アクセス要求</text>
<line x1="255" y1="155" x2="85" y2="155" stroke="${A2}" stroke-width="2"/>
<polygon points="85,155 98,149 98,161" fill="${A2}"/>
<text x="168" y="148" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">② AuthnRequest リダイレクト</text>
<line x1="80" y1="190" x2="535" y2="190" stroke="${GRN}" stroke-width="2"/>
<polygon points="535,190 522,184 522,196" fill="${GRN}"/>
<text x="308" y="183" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">③ IdP に転送 (AuthnRequest)</text>
<line x1="540" y1="225" x2="540" y2="255" stroke="${A1}" stroke-width="2"/>
<text x="620" y="245" fill="${A1}" font-size="11" font-family="sans-serif">④ 認証処理</text>
<line x1="535" y1="280" x2="85" y2="280" stroke="${A1}" stroke-width="2"/>
<polygon points="85,280 98,274 98,286" fill="${A1}"/>
<text x="308" y="273" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">⑤ SAML Response (Assertion) 返却</text>
<line x1="80" y1="315" x2="255" y2="315" stroke="${GRN}" stroke-width="2"/>
<polygon points="255,315 242,309 242,321" fill="${GRN}"/>
<text x="168" y="308" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">⑥ Assertion を SP に POST</text>
<line x1="260" y1="350" x2="85" y2="350" stroke="${A2}" stroke-width="2"/>
<polygon points="85,350 98,344 98,356" fill="${A2}"/>
<text x="168" y="368" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">⑦ アクセス許可・セッション確立</text>
`);

// Slide 14: OIDC Authorization Code Flow
const svg14 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">OIDC 認証コードフロー + ID Token</text>
<rect x="20" y="45" width="90" height="35" rx="5" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="65" y="67" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">ユーザー</text>
<rect x="175" y="45" width="110" height="35" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="230" y="67" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">Client (RP)</text>
<rect x="475" y="45" width="110" height="35" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="530" y="67" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">Authorization</text>
<rect x="660" y="45" width="110" height="35" rx="5" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="715" y="67" text-anchor="middle" fill="${BLU}" font-size="11" font-family="sans-serif">Token Endpoint</text>
<line x1="65" y1="80" x2="65" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="230" y1="80" x2="230" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="530" y1="80" x2="530" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="715" y1="80" x2="715" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="65" y1="105" x2="225" y2="105" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="225,105 213,99 213,111" fill="${GRN}"/>
<text x="145" y="98" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">① ログイン要求</text>
<line x1="225" y1="130" x2="70" y2="130" stroke="${A2}" stroke-width="1.5"/>
<polygon points="70,130 82,124 82,136" fill="${A2}"/>
<text x="145" y="123" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">② auth URL にリダイレクト</text>
<line x1="65" y1="155" x2="525" y2="155" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="525,155 513,149 513,161" fill="${GRN}"/>
<text x="295" y="148" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">③ Authorization Request (scope=openid)</text>
<line x1="530" y1="180" x2="530" y2="205" stroke="${A1}" stroke-width="1.5"/>
<text x="570" y="196" fill="${A1}" font-size="10" font-family="sans-serif">④ 認証</text>
<line x1="525" y1="225" x2="70" y2="225" stroke="${A1}" stroke-width="1.5"/>
<polygon points="70,225 82,219 82,231" fill="${A1}"/>
<text x="295" y="218" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑤ code=xxx リダイレクト</text>
<line x1="230" y1="250" x2="710" y2="250" stroke="${A2}" stroke-width="1.5"/>
<polygon points="710,250 698,244 698,256" fill="${A2}"/>
<text x="470" y="243" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑥ code + client_secret でトークン要求</text>
<line x1="710" y1="275" x2="235" y2="275" stroke="${BLU}" stroke-width="1.5"/>
<polygon points="235,275 247,269 247,281" fill="${BLU}"/>
<text x="470" y="268" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑦ access_token + id_token 返却</text>
<rect x="175" y="295" width="170" height="60" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="260" y="317" text-anchor="middle" fill="${A1}" font-size="11" font-weight="bold" font-family="sans-serif">ID Token (JWT)</text>
<text x="260" y="335" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">sub, email, name, iat...</text>
<text x="260" y="352" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">署名検証 → ユーザー確認</text>
`);

// Slide 17: Protocol flow comparison summary
const svg17 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="32" text-anchor="middle" fill="${TXT}" font-size="17" font-weight="bold" font-family="sans-serif">プロトコルフロー比較サマリー</text>
<rect x="20" y="55" width="370" height="320" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="55" width="370" height="320" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="82" text-anchor="middle" fill="${A1}" font-size="15" font-weight="bold" font-family="sans-serif">SAML</text>
<text x="595" y="82" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">OIDC</text>
<text x="40" y="115" fill="${TXT}" font-size="13" font-family="sans-serif">トークン形式: XML Assertion</text>
<text x="40" y="145" fill="${TXT}" font-size="13" font-family="sans-serif">転送方式: HTTPリダイレクト/POST</text>
<text x="40" y="175" fill="${TXT}" font-size="13" font-family="sans-serif">署名: XML Signature (XSD)</text>
<text x="40" y="205" fill="${TXT}" font-size="13" font-family="sans-serif">エンドポイント: IdP SSO URL</text>
<text x="40" y="235" fill="${TXT}" font-size="13" font-family="sans-serif">セッション: SP セッションCookie</text>
<text x="40" y="275" fill="${A1}" font-size="12" font-family="sans-serif">長所: 成熟・エンプラ実績多数</text>
<text x="40" y="300" fill="${A2}" font-size="12" font-family="sans-serif">短所: XMLサイズ大・実装複雑</text>
<text x="430" y="115" fill="${TXT}" font-size="13" font-family="sans-serif">トークン形式: JWT</text>
<text x="430" y="145" fill="${TXT}" font-size="13" font-family="sans-serif">転送方式: HTTP/API呼び出し</text>
<text x="430" y="175" fill="${TXT}" font-size="13" font-family="sans-serif">署名: JWS (RS256/ES256)</text>
<text x="430" y="205" fill="${TXT}" font-size="13" font-family="sans-serif">エンドポイント: 複数(auth/token)</text>
<text x="430" y="235" fill="${TXT}" font-size="13" font-family="sans-serif">セッション: トークン自己完結</text>
<text x="430" y="275" fill="${A2}" font-size="12" font-family="sans-serif">長所: 軽量・REST API親和性高</text>
<text x="430" y="300" fill="${A1}" font-size="12" font-family="sans-serif">短所: Token管理の責任</text>
<text x="40" y="350" fill="${TXT}" font-size="12" font-family="sans-serif">用途: 企業内 / B2B SSO</text>
<text x="430" y="350" fill="${TXT}" font-size="12" font-family="sans-serif">用途: Web / モバイル / API</text>
`);

// Slide 25: SAML Assertion vs JWT comparison
const svg25 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="32" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">SAML Assertion vs JWT ID Token — 属性比較</text>
<rect x="20" y="55" width="370" height="310" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="55" width="370" height="310" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="80" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">SAML Assertion</text>
<text x="595" y="80" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">JWT ID Token</text>
<text x="40" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">形式: XML (署名済み)</text>
<text x="40" y="145" fill="${TXT}" font-size="12" font-family="sans-serif">サイズ: 2-10KB (通常)</text>
<text x="40" y="175" fill="${TXT}" font-size="12" font-family="sans-serif">主体識別子: NameID</text>
<text x="40" y="205" fill="${TXT}" font-size="12" font-family="sans-serif">属性: AttributeStatement</text>
<text x="40" y="235" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: Conditions/@NotOnOrAfter</text>
<text x="40" y="265" fill="${TXT}" font-size="12" font-family="sans-serif">発行者: Issuer 要素</text>
<text x="40" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">署名: xmldsig (XSD)</text>
<text x="40" y="340" fill="${A1}" font-size="12" font-family="sans-serif">→ エンプラ標準・複雑だが実績</text>
<text x="430" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">形式: JSON (Base64url署名)</text>
<text x="430" y="145" fill="${TXT}" font-size="12" font-family="sans-serif">サイズ: 200-500B (通常)</text>
<text x="430" y="175" fill="${TXT}" font-size="12" font-family="sans-serif">主体識別子: sub クレーム</text>
<text x="430" y="205" fill="${TXT}" font-size="12" font-family="sans-serif">属性: 任意の JSON クレーム</text>
<text x="430" y="235" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: exp クレーム (UNIX)</text>
<text x="430" y="265" fill="${TXT}" font-size="12" font-family="sans-serif">発行者: iss クレーム</text>
<text x="430" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">署名: JWS (RS256/ES256)</text>
<text x="430" y="340" fill="${A2}" font-size="12" font-family="sans-serif">→ 軽量・モバイル/API対応</text>
`);

// Slide 33: Use case selection matrix
const svg33 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">ユースケース別選択マトリクス</text>
<rect x="30" y="50" width="740" height="45" rx="6" fill="${A1}" opacity="0.2"/>
<text x="155" y="79" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">ユースケース</text>
<text x="370" y="79" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">SAML</text>
<text x="530" y="79" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">OIDC</text>
<text x="700" y="79" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">推奨</text>
<text x="155" y="120" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">企業内 SSO</text>
<text x="370" y="120" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="530" y="120" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="700" y="120" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">SAML優先</text>
<text x="155" y="157" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">モバイル/SPA アプリ</text>
<text x="370" y="157" text-anchor="middle" fill="${A2}" font-size="16" font-family="sans-serif">✗</text>
<text x="530" y="157" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="700" y="157" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">OIDC必須</text>
<text x="155" y="194" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">B2B フェデレーション</text>
<text x="370" y="194" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="530" y="194" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="700" y="194" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">相手次第</text>
<text x="155" y="231" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">API 認可</text>
<text x="370" y="231" text-anchor="middle" fill="${A2}" font-size="16" font-family="sans-serif">✗</text>
<text x="530" y="231" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="700" y="231" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">OIDC必須</text>
<text x="155" y="268" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">レガシー連携</text>
<text x="370" y="268" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="530" y="268" text-anchor="middle" fill="${A2}" font-size="16" font-family="sans-serif">△</text>
<text x="700" y="268" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">SAML優先</text>
<text x="155" y="305" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">新規 Web サービス</text>
<text x="370" y="305" text-anchor="middle" fill="${A2}" font-size="16" font-family="sans-serif">△</text>
<text x="530" y="305" text-anchor="middle" fill="${GRN}" font-size="16" font-family="sans-serif">✓</text>
<text x="700" y="305" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">OIDC推奨</text>
<line x1="30" y1="100" x2="770" y2="100" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="30" y1="137" x2="770" y2="137" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="30" y1="174" x2="770" y2="174" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="30" y1="211" x2="770" y2="211" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="30" y1="248" x2="770" y2="248" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="30" y1="285" x2="770" y2="285" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="280" y1="50" x2="280" y2="320" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="460" y1="50" x2="460" y2="320" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="620" y1="50" x2="620" y2="320" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
`);

// Slide 43: Security checklist comparison
const svg43 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">セキュリティ対策比較チェックリスト</text>
<rect x="20" y="50" width="370" height="330" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="330" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="77" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">SAML 対策</text>
<text x="595" y="77" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">OIDC 対策</text>
<text x="35" y="112" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">XMLデジタル署名検証</text>
<text x="35" y="142" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">XSW攻撃対策</text>
<text x="35" y="172" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">InResponseTo検証</text>
<text x="35" y="202" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限(Conditions)確認</text>
<text x="35" y="232" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">Audience Restriction確認</text>
<text x="35" y="262" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">HTTPS強制 + HSTS</text>
<text x="35" y="292" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="292" fill="${TXT}" font-size="12" font-family="sans-serif">署名アルゴリズム: SHA-256+</text>
<text x="425" y="112" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">JWT署名検証(RS256/ES256)</text>
<text x="425" y="142" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">PKCE使用 (S256)</text>
<text x="425" y="172" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">state パラメータ検証</text>
<text x="425" y="202" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">nonce検証 (リプレイ防止)</text>
<text x="425" y="232" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">redirect_uri ホワイトリスト</text>
<text x="425" y="262" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">aud/iss クレーム検証</text>
<text x="425" y="292" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="292" fill="${TXT}" font-size="12" font-family="sans-serif">短命アクセストークン</text>
<text x="400" y="360" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">共通: HTTPS必須 / セキュリティヘッダー / 監査ログ</text>
`);

// Slide 47: SAML to OIDC migration phases
const svg47 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">SAML → OIDC 移行パターン (4フェーズ)</text>
<rect x="20" y="60" width="165" height="290" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="215" y="60" width="165" height="290" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="410" y="60" width="165" height="290" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<rect x="605" y="60" width="165" height="290" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="102" y="88" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Phase 1</text>
<text x="297" y="88" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">Phase 2</text>
<text x="492" y="88" text-anchor="middle" fill="${BLU}" font-size="14" font-weight="bold" font-family="sans-serif">Phase 3</text>
<text x="687" y="88" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">Phase 4</text>
<text x="102" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">評価・計画</text>
<text x="297" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">並行運用</text>
<text x="492" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">段階移行</text>
<text x="687" y="112" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SAML廃止</text>
<text x="35" y="150" fill="${TXT}" font-size="11" font-family="sans-serif">• SP一覧作成</text>
<text x="35" y="175" fill="${TXT}" font-size="11" font-family="sans-serif">• OIDC対応確認</text>
<text x="35" y="200" fill="${TXT}" font-size="11" font-family="sans-serif">• IdP選定</text>
<text x="35" y="225" fill="${TXT}" font-size="11" font-family="sans-serif">• ロードマップ</text>
<text x="35" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">• リスク評価</text>
<text x="230" y="150" fill="${TXT}" font-size="11" font-family="sans-serif">• SAML維持</text>
<text x="230" y="175" fill="${TXT}" font-size="11" font-family="sans-serif">• OIDC追加設定</text>
<text x="230" y="200" fill="${TXT}" font-size="11" font-family="sans-serif">• テスト環境検証</text>
<text x="230" y="225" fill="${TXT}" font-size="11" font-family="sans-serif">• クレームマッピング</text>
<text x="230" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">• SP選別</text>
<text x="425" y="150" fill="${TXT}" font-size="11" font-family="sans-serif">• SP毎に切替</text>
<text x="425" y="175" fill="${TXT}" font-size="11" font-family="sans-serif">• ユーザー通知</text>
<text x="425" y="200" fill="${TXT}" font-size="11" font-family="sans-serif">• 動作確認</text>
<text x="425" y="225" fill="${TXT}" font-size="11" font-family="sans-serif">• ロールバック準備</text>
<text x="425" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">• 監視強化</text>
<text x="620" y="150" fill="${TXT}" font-size="11" font-family="sans-serif">• SAML無効化</text>
<text x="620" y="175" fill="${TXT}" font-size="11" font-family="sans-serif">• 証明書破棄</text>
<text x="620" y="200" fill="${TXT}" font-size="11" font-family="sans-serif">• ドキュメント更新</text>
<text x="620" y="225" fill="${TXT}" font-size="11" font-family="sans-serif">• 監査完了</text>
<text x="620" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">• 完全OIDC移行</text>
<line x1="185" y1="205" x2="215" y2="205" stroke="${A1}" stroke-width="2"/>
<polygon points="215,205 203,199 203,211" fill="${A1}"/>
<line x1="380" y1="205" x2="410" y2="205" stroke="${A2}" stroke-width="2"/>
<polygon points="410,205 398,199 398,211" fill="${A2}"/>
<line x1="575" y1="205" x2="605" y2="205" stroke="${BLU}" stroke-width="2"/>
<polygon points="605,205 593,199 593,211" fill="${BLU}"/>
`);

// Slide 55: SAML vs OIDC comprehensive comparison table
const svg55 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML vs OIDC — 総合比較表</text>
<rect x="15" y="45" width="770" height="40" rx="6" fill="${A1}" opacity="0.25"/>
<text x="120" y="71" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">項目</text>
<text x="335" y="71" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">SAML 2.0</text>
<text x="590" y="71" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">OIDC / OAuth2</text>
<text x="120" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">標準化年</text>
<text x="335" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">2005</text>
<text x="590" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">2012 / 2014</text>
<text x="120" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">データ形式</text>
<text x="335" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">XML</text>
<text x="590" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">JSON / JWT</text>
<text x="120" y="172" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">モバイル対応</text>
<text x="335" y="172" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">困難</text>
<text x="590" y="172" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">ネイティブ対応</text>
<text x="120" y="204" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">実装複雑度</text>
<text x="335" y="204" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">高い</text>
<text x="590" y="204" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">中程度</text>
<text x="120" y="236" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">エンプラ採用率</text>
<text x="335" y="236" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">非常に高い</text>
<text x="590" y="236" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">急速に拡大中</text>
<text x="120" y="268" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">API認可</text>
<text x="335" y="268" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">非対応</text>
<text x="590" y="268" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">OAuth2で対応</text>
<text x="120" y="300" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">主要IdP</text>
<text x="335" y="300" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">AD FS / Shibboleth</text>
<text x="590" y="300" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Okta / Auth0 / Azure AD</text>
<line x1="15" y1="88" x2="785" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="15" y1="120" x2="785" y2="120" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="152" x2="785" y2="152" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="184" x2="785" y2="184" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="216" x2="785" y2="216" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="248" x2="785" y2="248" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="15" y1="280" x2="785" y2="280" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="225" y1="45" x2="225" y2="315" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="450" y1="45" x2="450" y2="315" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
`);

// Apply SVGs - targeting slides 4,5,8,10,14,17,25,33,43,47,55 (11 out of 61 = ~18%)
// We need ≥50% coverage, so let's target more slides
// Slides 4,5,8,10,14,17,25,33,43,47,55 + more

// Slide 16: OIDC PKCE flow
const svg16 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">OIDC PKCE フロー (モバイル/SPA向け)</text>
<rect x="20" y="50" width="160" height="50" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="100" y="81" text-anchor="middle" fill="${GRN}" font-size="13" font-family="sans-serif">Mobile / SPA</text>
<rect x="310" y="50" width="160" height="50" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="390" y="81" text-anchor="middle" fill="${A1}" font-size="13" font-family="sans-serif">Auth Server</text>
<rect x="610" y="50" width="160" height="50" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="690" y="81" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">Token Endpoint</text>
<line x1="100" y1="100" x2="100" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="390" y1="100" x2="390" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="690" y1="100" x2="690" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<rect x="20" y="115" width="160" height="50" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="1.5"/>
<text x="100" y="136" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">① code_verifier 生成</text>
<text x="100" y="154" text-anchor="middle" fill="${A1}" font-size="10" font-family="sans-serif">code_challenge=S256(verifier)</text>
<line x1="180" y1="180" x2="385" y2="180" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="385,180 373,174 373,186" fill="${GRN}"/>
<text x="282" y="172" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">② Authz Request + code_challenge</text>
<line x1="385" y1="210" x2="105" y2="210" stroke="${A1}" stroke-width="1.5"/>
<polygon points="105,210 117,204 117,216" fill="${A1}"/>
<text x="245" y="203" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">③ code 返却 (redirect)</text>
<line x1="180" y1="240" x2="685" y2="240" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="685,240 673,234 673,246" fill="${GRN}"/>
<text x="430" y="232" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">④ code + code_verifier → Token Request</text>
<rect x="310" y="258" width="390" height="45" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="505" y="278" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">⑤ S256(code_verifier) == code_challenge?</text>
<text x="505" y="297" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">検証OK → access_token / id_token 発行</text>
<line x1="685" y1="303" x2="105" y2="303" stroke="${A2}" stroke-width="1.5"/>
<polygon points="105,303 117,297 117,309" fill="${A2}"/>
<text x="395" y="320" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑥ access_token + id_token</text>
<text x="400" y="360" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">PKCE: client_secret不要 → モバイル/SPAでも安全</text>
`);

// Slide 24: Access Token vs ID Token
const svg24 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">Access Token vs ID Token — 役割の分離</text>
<rect x="30" y="55" width="340" height="310" rx="12" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="430" y="55" width="340" height="310" rx="12" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="200" y="82" text-anchor="middle" fill="${A2}" font-size="15" font-weight="bold" font-family="sans-serif">Access Token</text>
<text x="600" y="82" text-anchor="middle" fill="${A1}" font-size="15" font-weight="bold" font-family="sans-serif">ID Token</text>
<text x="200" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">目的: リソースへの認可</text>
<text x="600" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">目的: ユーザー認証の証明</text>
<text x="200" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">読み手: Resource Server</text>
<text x="600" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">読み手: Client (RP)</text>
<text x="200" y="172" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">含む情報: scope / aud</text>
<text x="600" y="172" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">含む情報: sub / email / name</text>
<text x="200" y="204" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: 短命 (1時間等)</text>
<text x="600" y="204" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限: 短命 (数分〜1時間)</text>
<text x="200" y="236" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">転送先: API サーバー</text>
<text x="600" y="236" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">転送先: Client内部のみ</text>
<text x="200" y="268" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">APIに Bearer ヘッダーで送信</text>
<text x="600" y="268" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">APIには送信しない!</text>
<rect x="50" y="290" width="300" height="55" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="200" y="310" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Authorization: Bearer &lt;access_token&gt;</text>
<text x="200" y="330" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">→ リソース操作の権限証明</text>
<rect x="450" y="290" width="300" height="55" rx="6" fill="${BG}" stroke="${A1}" stroke-width="1.5"/>
<text x="600" y="310" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">JWT検証 → ユーザーセッション確立</text>
<text x="600" y="330" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">→ 「誰がログインしているか」確認</text>
`);

// Slide 29: Enterprise SSO - SAML
const svg29 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">エンタープライズ SSO — SAML が適切な理由</text>
<rect x="30" y="55" width="230" height="280" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="540" y="55" width="230" height="280" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="145" y="80" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">企業 IdP (ADFS等)</text>
<text x="655" y="80" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">業務システム群 (SP)</text>
<text x="145" y="115" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Active Directory</text>
<text x="145" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">LDAP / Kerberos</text>
<text x="145" y="165" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">証明書管理</text>
<text x="145" y="200" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">一度認証すれば</text>
<text x="145" y="220" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">全SP自動ログイン</text>
<text x="655" y="115" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Salesforce</text>
<text x="655" y="140" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">ServiceNow</text>
<text x="655" y="165" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Workday / SAP</text>
<text x="655" y="190" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">社内ポータル</text>
<text x="655" y="220" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">SAML対応必須</text>
<line x1="260" y1="190" x2="540" y2="190" stroke="${A1}" stroke-width="2.5"/>
<polygon points="540,190 527,183 527,197" fill="${A1}"/>
<text x="400" y="180" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SAML Assertion</text>
<text x="400" y="215" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">XML + 署名付き属性</text>
<text x="400" y="270" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SAML採用理由:</text>
<text x="400" y="295" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">• 既存AD/LDAPとの統合が容易</text>
<text x="400" y="318" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">• 主要 SaaS が標準サポート</text>
`);

// Slide 34: Decision flowchart
const svg34 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">Decision Flowchart: どちらを選ぶか</text>
<rect x="300" y="40" width="200" height="45" rx="8" fill="${BOX}" stroke="${TXT}" stroke-width="2"/>
<text x="400" y="68" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">新しいシステム？</text>
<line x1="400" y1="85" x2="400" y2="110" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="400,110 394,98 406,98" fill="${TXT}"/>
<rect x="130" y="115" width="160" height="45" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="210" y="143" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">モバイル/SPA?</text>
<rect x="510" y="115" width="160" height="45" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="590" y="143" text-anchor="middle" fill="${A1}" font-size="13" font-family="sans-serif">既存SAML統合?</text>
<line x1="340" y1="130" x2="290" y2="138" stroke="${TXT}" stroke-width="1.5"/>
<text x="305" y="128" fill="${GRN}" font-size="11" font-family="sans-serif">YES</text>
<line x1="460" y1="130" x2="510" y2="138" stroke="${TXT}" stroke-width="1.5"/>
<text x="470" y="128" fill="${A2}" font-size="11" font-family="sans-serif">NO</text>
<line x1="210" y1="160" x2="210" y2="200" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="210,200 204,188 216,188" fill="${TXT}"/>
<rect x="120" y="205" width="180" height="45" rx="8" fill="${A2}" opacity="0.8"/>
<text x="210" y="233" text-anchor="middle" fill="${TXT}" font-size="14" font-weight="bold" font-family="sans-serif">OIDC + PKCE</text>
<line x1="590" y1="160" x2="590" y2="200" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="590,200 584,188 596,188" fill="${TXT}"/>
<rect x="120" y="310" width="180" height="45" rx="8" fill="${A1}" opacity="0.8"/>
<text x="210" y="338" text-anchor="middle" fill="${TXT}" font-size="14" font-weight="bold" font-family="sans-serif">SAML 2.0</text>
<rect x="490" y="205" width="200" height="45" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="590" y="233" text-anchor="middle" fill="${GRN}" font-size="13" font-family="sans-serif">エンプラB2B連携?</text>
<line x1="490" y1="228" x2="300" y2="228" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="300,228 312,222 312,234" fill="${GRN}"/>
<text x="395" y="220" fill="${GRN}" font-size="11" font-family="sans-serif">YES→SAML</text>
<line x1="590" y1="250" x2="590" y2="310" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="590,310 584,298 596,298" fill="${TXT}"/>
<rect x="490" y="315" width="200" height="45" rx="8" fill="${A2}" opacity="0.8"/>
<text x="590" y="343" text-anchor="middle" fill="${TXT}" font-size="14" font-weight="bold" font-family="sans-serif">OIDC 推奨</text>
`);

// Slide 56: 3-line summary
const svg56 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="40" text-anchor="middle" fill="${TXT}" font-size="18" font-weight="bold" font-family="sans-serif">選択ガイド — 3行サマリー</text>
<rect x="50" y="70" width="700" height="90" rx="12" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="102" text-anchor="middle" fill="${A1}" font-size="16" font-weight="bold" font-family="sans-serif">1. 新規Webサービス / モバイル / API</text>
<text x="400" y="140" text-anchor="middle" fill="${TXT}" font-size="14" font-family="sans-serif">→ OIDC + OAuth2 (PKCE) を選択</text>
<rect x="50" y="180" width="700" height="90" rx="12" fill="${BOX}" stroke="${A2}" stroke-width="2.5"/>
<text x="400" y="212" text-anchor="middle" fill="${A2}" font-size="16" font-weight="bold" font-family="sans-serif">2. 既存エンプラ / B2B / SAMLが必須</text>
<text x="400" y="250" text-anchor="middle" fill="${TXT}" font-size="14" font-family="sans-serif">→ SAML 2.0 を維持・活用</text>
<rect x="50" y="290" width="700" height="80" rx="12" fill="${BOX}" stroke="${GRN}" stroke-width="2.5"/>
<text x="400" y="322" text-anchor="middle" fill="${GRN}" font-size="16" font-weight="bold" font-family="sans-serif">3. 混在環境 / マルチプロトコル対応IdP</text>
<text x="400" y="352" text-anchor="middle" fill="${TXT}" font-size="14" font-family="sans-serif">→ Okta / Azure AD で両対応</text>
`);

// Map of slide index to SVG content
const svgMap: Record<number, string> = {
	4: svg4,
	5: svg5,
	8: svg8,
	10: svg10,
	14: svg14,
	16: svg16,
	17: svg17,
	24: svg24,
	25: svg25,
	29: svg29,
	33: svg33,
	34: svg34,
	43: svg43,
	47: svg47,
	55: svg55,
	56: svg56,
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
