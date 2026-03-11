import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219120000_auth-authz/slides-data.json";
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

// 4: Authentication 3 factors
const s4 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">認証の3要素</text>
<rect x="30" y="55" width="220" height="130" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<rect x="290" y="55" width="220" height="130" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2.5"/>
<rect x="550" y="55" width="220" height="130" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2.5"/>
<text x="140" y="88" text-anchor="middle" fill="${A1}" font-size="16" font-weight="bold" font-family="sans-serif">知識</text>
<text x="400" y="88" text-anchor="middle" fill="${A2}" font-size="16" font-weight="bold" font-family="sans-serif">所持</text>
<text x="660" y="88" text-anchor="middle" fill="${GRN}" font-size="16" font-weight="bold" font-family="sans-serif">生体</text>
<text x="140" y="115" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">Something You Know</text>
<text x="400" y="115" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">Something You Have</text>
<text x="660" y="115" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">Something You Are</text>
<text x="140" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード / PIN</text>
<text x="400" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">TOTP / FIDO2 / カード</text>
<text x="660" y="148" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">指紋 / 顔 / 虹彩</text>
<text x="140" y="175" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">最も弱い</text>
<text x="400" y="175" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中程度</text>
<text x="660" y="175" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最も強い</text>
<rect x="30" y="215" width="740" height="150" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="242" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">MFA = 異なるカテゴリを2つ以上組み合わせる</text>
<text x="50" y="275" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="70" y="275" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード + TOTP = 知識 + 所持 (MFA)</text>
<text x="50" y="305" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="70" y="305" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード + 指紋 = 知識 + 生体 (MFA)</text>
<text x="50" y="335" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="70" y="335" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード + 秘密の質問 = 知識 + 知識 (NOT MFA)</text>`);

// 12: Auth Code + PKCE flow
const s12 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">Authorization Code + PKCE フロー</text>
<rect x="20" y="45" width="90" height="35" rx="5" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="65" y="67" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">Browser</text>
<rect x="175" y="45" width="110" height="35" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="230" y="67" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">Client (SPA)</text>
<rect x="475" y="45" width="110" height="35" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="530" y="67" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">Auth Server</text>
<rect x="660" y="45" width="115" height="35" rx="5" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="717" y="67" text-anchor="middle" fill="${BLU}" font-size="11" font-family="sans-serif">Token Endpoint</text>
<line x1="65" y1="80" x2="65" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="230" y1="80" x2="230" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="530" y1="80" x2="530" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="717" y1="80" x2="717" y2="390" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<rect x="175" y="95" width="110" height="35" rx="4" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="230" y="118" text-anchor="middle" fill="${A2}" font-size="10" font-family="sans-serif">PKCE生成</text>
<line x1="65" y1="150" x2="525" y2="150" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="525,150 513,144 513,156" fill="${GRN}"/>
<text x="295" y="142" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">① GET /authorize?code_challenge=S256(...)</text>
<line x1="525" y1="178" x2="70" y2="178" stroke="${A1}" stroke-width="1.5"/>
<polygon points="70,178 82,172 82,184" fill="${A1}"/>
<text x="295" y="170" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">② redirect?code=xxx</text>
<line x1="65" y1="205" x2="225" y2="205" stroke="${GRN}" stroke-width="1.5"/>
<polygon points="225,205 213,199 213,211" fill="${GRN}"/>
<text x="145" y="197" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">③ code受取</text>
<line x1="230" y1="232" x2="712" y2="232" stroke="${A2}" stroke-width="1.5"/>
<polygon points="712,232 700,226 700,238" fill="${A2}"/>
<text x="471" y="224" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">④ POST /token (code + code_verifier)</text>
<line x1="712" y1="258" x2="235" y2="258" stroke="${BLU}" stroke-width="1.5"/>
<polygon points="235,258 247,252 247,264" fill="${BLU}"/>
<text x="471" y="250" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">⑤ access_token + id_token</text>
<text x="400" y="310" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">PKCE (S256): code_challenge = BASE64URL(SHA256(verifier))</text>
<text x="400" y="340" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">client_secret不要 → SPA/モバイルでも安全</text>`);

// 15: OIDC overview
const s15 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">OpenID Connect (OIDC) 概要</text>
<rect x="200" y="50" width="400" height="65" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">OIDC = OAuth2 + Identity Layer</text>
<text x="400" y="103" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">OAuth2の認可フロー上にユーザー認証機能を追加</text>
<rect x="30" y="138" width="220" height="80" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="290" y="138" width="220" height="80" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<rect x="550" y="138" width="220" height="80" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="140" y="168" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">追加要素</text>
<text x="400" y="168" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">エンドポイント</text>
<text x="660" y="168" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">主要クレーム</text>
<text x="140" y="196" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">ID Token (JWT)</text>
<text x="400" y="196" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">UserInfo Endpoint</text>
<text x="660" y="196" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">sub / email / name</text>
<text x="400" y="260" text-anchor="middle" fill="${TXT}" font-size="13" font-weight="bold" font-family="sans-serif">スコープ</text>
<rect x="30" y="278" width="340" height="85" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="45" y="303" fill="${A1}" font-size="12" font-family="sans-serif">openid</text>
<text x="120" y="303" fill="${TXT}" font-size="12" font-family="sans-serif">OIDC利用の宣言 (必須)</text>
<text x="45" y="327" fill="${A1}" font-size="12" font-family="sans-serif">profile</text>
<text x="120" y="327" fill="${TXT}" font-size="12" font-family="sans-serif">name, picture 等</text>
<text x="45" y="351" fill="${A1}" font-size="12" font-family="sans-serif">email</text>
<text x="120" y="351" fill="${TXT}" font-size="12" font-family="sans-serif">email, email_verified</text>
<rect x="430" y="278" width="340" height="85" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="1.5"/>
<text x="445" y="303" fill="${A2}" font-size="12" font-family="sans-serif">OAuth2との違い:</text>
<text x="445" y="327" fill="${TXT}" font-size="12" font-family="sans-serif">ID Tokenでユーザー確認</text>
<text x="445" y="351" fill="${TXT}" font-size="12" font-family="sans-serif">Access TokenはAPIのみ</text>`);

// 19: JWT structure
const s19 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">JWT 詳解 — 構造と仕組み</text>
<rect x="20" y="50" width="220" height="200" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="270" y="50" width="260" height="200" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="560" y="50" width="220" height="200" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="130" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Header</text>
<text x="400" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Payload</text>
<text x="670" y="78" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Signature</text>
<text x="35" y="110" fill="${TXT}" font-size="12" font-family="monospace">alg: RS256</text>
<text x="35" y="135" fill="${TXT}" font-size="12" font-family="monospace">typ: JWT</text>
<text x="35" y="160" fill="${TXT}" font-size="12" font-family="monospace">kid: key-id</text>
<text x="285" y="110" fill="${TXT}" font-size="12" font-family="monospace">sub: user123</text>
<text x="285" y="135" fill="${TXT}" font-size="12" font-family="monospace">iss: https://idp.ex</text>
<text x="285" y="160" fill="${TXT}" font-size="12" font-family="monospace">aud: my-app</text>
<text x="285" y="185" fill="${TXT}" font-size="12" font-family="monospace">exp: 1735000000</text>
<text x="285" y="210" fill="${TXT}" font-size="12" font-family="monospace">email: u@ex.com</text>
<text x="575" y="110" fill="${TXT}" font-size="12" font-family="sans-serif">秘密鍵で署名</text>
<text x="575" y="135" fill="${TXT}" font-size="12" font-family="sans-serif">RS256 / ES256</text>
<text x="575" y="160" fill="${TXT}" font-size="12" font-family="sans-serif">公開鍵で検証</text>
<text x="575" y="185" fill="${TXT}" font-size="12" font-family="sans-serif">JWKS URI使用</text>
<text x="575" y="220" fill="${GRN}" font-size="12" font-family="sans-serif">改ざん検知</text>
<rect x="20" y="270" width="760" height="100" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="295" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">フォーマット</text>
<text x="400" y="325" text-anchor="middle" fill="${TXT}" font-size="13" font-family="monospace">BASE64URL(header).BASE64URL(payload).SIGNATURE</text>
<text x="400" y="358" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">各パートはBase64URLエンコード（パディングなし）</text>`);

// 21: JWT best practices
const s21 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">JWT ベストプラクティス</text>
<rect x="20" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">必ず行うこと</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">やってはいけないこと</text>
<text x="35" y="112" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">署名を必ず検証 (JWKS)</text>
<text x="35" y="142" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">exp / iat / aud / iss 全検証</text>
<text x="35" y="172" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">アルゴリズム明示 (RS256推奨)</text>
<text x="35" y="202" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">短い有効期限 (15分〜1時間)</text>
<text x="35" y="232" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">Refresh Tokenでセッション延長</text>
<text x="35" y="262" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">機密情報はpayloadに含めない</text>
<text x="35" y="295" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">HTTPS必須</text>
<text x="425" y="112" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">alg: none を許可</text>
<text x="425" y="142" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">クライアント指定のalgを信頼</text>
<text x="425" y="172" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">Base64デコードのみで使用</text>
<text x="425" y="202" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード等をペイロードに</text>
<text x="425" y="232" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">LocalStorageにAccess Token保存</text>
<text x="425" y="262" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限を長く設定</text>
<text x="425" y="295" fill="${A2}" font-size="13" font-family="sans-serif">✗</text>
<text x="445" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">対称鍵(HS256)を公開環境で</text>`);

// 34: AWS IAM design patterns
const s34 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">AWS IAM 設計パターン</text>
<rect x="20" y="50" width="220" height="150" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="290" y="50" width="220" height="150" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="560" y="50" width="220" height="150" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="130" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Identity-Based</text>
<text x="400" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Resource-Based</text>
<text x="670" y="78" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Permission Boundary</text>
<text x="35" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">User/Roleに付与</text>
<text x="35" y="132" fill="${TXT}" font-size="12" font-family="sans-serif">プリンシパル単位制御</text>
<text x="35" y="156" fill="${TXT}" font-size="12" font-family="sans-serif">最も一般的</text>
<text x="305" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">S3/SQS等に付与</text>
<text x="305" y="132" fill="${TXT}" font-size="12" font-family="sans-serif">クロスアカウント可能</text>
<text x="305" y="156" fill="${TXT}" font-size="12" font-family="sans-serif">Principal指定</text>
<text x="575" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">権限の最大値制限</text>
<text x="575" y="132" fill="${TXT}" font-size="12" font-family="sans-serif">委任時の安全網</text>
<text x="575" y="156" fill="${TXT}" font-size="12" font-family="sans-serif">SCPと組み合わせ</text>
<rect x="20" y="225" width="760" height="145" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="1.5"/>
<text x="400" y="253" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">ポリシー評価ロジック</text>
<rect x="40" y="268" width="110" height="40" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="95" y="293" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">Deny確認</text>
<rect x="175" y="268" width="110" height="40" rx="6" fill="${BG}" stroke="${A1}" stroke-width="1.5"/>
<text x="230" y="293" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">SCP確認</text>
<rect x="310" y="268" width="110" height="40" rx="6" fill="${BG}" stroke="${GRN}" stroke-width="1.5"/>
<text x="365" y="293" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">Boundary確認</text>
<rect x="445" y="268" width="110" height="40" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="500" y="293" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">Resource確認</text>
<rect x="580" y="268" width="110" height="40" rx="6" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="635" y="293" text-anchor="middle" fill="${BLU}" font-size="11" font-family="sans-serif">Identity確認</text>
<text x="155" y="355" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">Explicit Deny</text>
<text x="400" y="355" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">→ Allow? 全部YES?</text>
<text x="650" y="355" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">→ Permit</text>
<line x1="150" y1="308" x2="175" y2="288" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="175,288 164,295 172,305" fill="${TXT}"/>
<line x1="285" y1="288" x2="310" y2="288" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="310,288 298,282 298,294" fill="${TXT}"/>
<line x1="420" y1="288" x2="445" y2="288" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="445,288 433,282 433,294" fill="${TXT}"/>
<line x1="555" y1="288" x2="580" y2="288" stroke="${TXT}" stroke-width="1.5"/>
<polygon points="580,288 568,282 568,294" fill="${TXT}"/>
`);

// 46: STS AssumeRole
const s46 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">STS AssumeRole — 一時認証情報の活用</text>
<rect x="30" y="55" width="170" height="80" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="115" y="90" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Principal</text>
<text x="115" y="113" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">User / EC2 / Lambda</text>
<rect x="320" y="55" width="170" height="80" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="405" y="90" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">STS</text>
<text x="405" y="113" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Security Token Service</text>
<rect x="610" y="55" width="160" height="80" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="690" y="90" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">IAM Role</text>
<text x="690" y="113" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Target Role ARN</text>
<line x1="200" y1="95" x2="320" y2="95" stroke="${GRN}" stroke-width="2"/>
<polygon points="320,95 308,89 308,101" fill="${GRN}"/>
<text x="260" y="87" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">AssumeRole</text>
<line x1="490" y1="95" x2="610" y2="95" stroke="${A1}" stroke-width="2"/>
<polygon points="610,95 598,89 598,101" fill="${A1}"/>
<text x="550" y="87" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">検証・発行</text>
<line x1="405" y1="135" x2="115" y2="200" stroke="${A1}" stroke-width="2" stroke-dasharray="5,3"/>
<polygon points="115,200 124,188 135,196" fill="${A1}"/>
<text x="240" y="185" text-anchor="middle" fill="${A1}" font-size="10" font-family="sans-serif">一時認証情報返却</text>
<rect x="20" y="220" width="760" height="150" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="1.5"/>
<text x="400" y="248" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">一時認証情報の内容</text>
<text x="50" y="278" fill="${A1}" font-size="12" font-family="sans-serif">AccessKeyId:</text>
<text x="200" y="278" fill="${TXT}" font-size="12" font-family="sans-serif">ASIA... (一時的なID)</text>
<text x="50" y="305" fill="${A1}" font-size="12" font-family="sans-serif">SecretAccessKey:</text>
<text x="200" y="305" fill="${TXT}" font-size="12" font-family="sans-serif">xxxx (一時的なシークレット)</text>
<text x="50" y="332" fill="${A1}" font-size="12" font-family="sans-serif">SessionToken:</text>
<text x="200" y="332" fill="${TXT}" font-size="12" font-family="sans-serif">長い文字列 (必須)</text>
<text x="50" y="359" fill="${A1}" font-size="12" font-family="sans-serif">Expiration:</text>
<text x="200" y="359" fill="${TXT}" font-size="12" font-family="sans-serif">デフォルト1時間 (最大12時間)</text>`);

// 52: API auth design
const s52 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">API 認証認可設計</text>
<rect x="20" y="55" width="230" height="290" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="285" y="55" width="230" height="290" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="55" width="230" height="290" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="135" y="83" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">API Key</text>
<text x="400" y="83" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">JWT Bearer</text>
<text x="665" y="83" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">mTLS</text>
<text x="35" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">シンプルな識別子</text>
<text x="35" y="143" fill="${TXT}" font-size="12" font-family="sans-serif">ローテーション必要</text>
<text x="35" y="171" fill="${TXT}" font-size="12" font-family="sans-serif">公開API向け</text>
<text x="35" y="225" fill="${A1}" font-size="12" font-family="sans-serif">用途: サードパーティ</text>
<text x="35" y="255" fill="${A1}" font-size="12" font-family="sans-serif">公開APIキー管理</text>
<text x="300" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">OAuth2/OIDC連携</text>
<text x="300" y="143" fill="${TXT}" font-size="12" font-family="sans-serif">ユーザーコンテキスト</text>
<text x="300" y="171" fill="${TXT}" font-size="12" font-family="sans-serif">スコープ制御</text>
<text x="300" y="199" fill="${TXT}" font-size="12" font-family="sans-serif">短命トークン</text>
<text x="300" y="225" fill="${A2}" font-size="12" font-family="sans-serif">用途: ユーザー認証</text>
<text x="300" y="255" fill="${A2}" font-size="12" font-family="sans-serif">SPAからのAPI呼び出し</text>
<text x="565" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">証明書バインド</text>
<text x="565" y="143" fill="${TXT}" font-size="12" font-family="sans-serif">最高セキュリティ</text>
<text x="565" y="171" fill="${TXT}" font-size="12" font-family="sans-serif">M2M通信専用</text>
<text x="565" y="199" fill="${TXT}" font-size="12" font-family="sans-serif">FAPI必須</text>
<text x="565" y="225" fill="${GRN}" font-size="12" font-family="sans-serif">用途: 金融/医療API</text>
<text x="565" y="255" fill="${GRN}" font-size="12" font-family="sans-serif">サービス間通信</text>
<text x="400" y="365" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">選択: ユーザーAPI → JWT | M2M → ClientCredentials | 高セキュリティ → mTLS</text>`);

// 59: Zero Trust AWS implementation
const s59 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">Zero Trust AWS 実装例</text>
<rect x="300" y="50" width="200" height="55" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Identity Layer</text>
<text x="400" y="97" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">IAM Identity Center + MFA</text>
<line x1="350" y1="105" x2="180" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="180,165 183,152 195,158" fill="${A1}"/>
<line x1="400" y1="105" x2="400" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="400,165 394,152 406,152" fill="${A1}"/>
<line x1="450" y1="105" x2="620" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="620,165 610,153 622,152" fill="${A1}"/>
<rect x="80" y="168" width="190" height="70" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="175" y="196" text-anchor="middle" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">Network</text>
<text x="175" y="217" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">VPC / Security Group</text>
<text x="175" y="233" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">AWS Network Firewall</text>
<rect x="305" y="168" width="190" height="70" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="196" text-anchor="middle" fill="${GRN}" font-size="12" font-weight="bold" font-family="sans-serif">Workload</text>
<text x="400" y="217" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">EKS / ECS</text>
<text x="400" y="233" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">IRSA + Service Mesh</text>
<rect x="530" y="168" width="190" height="70" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="625" y="196" text-anchor="middle" fill="${BLU}" font-size="12" font-weight="bold" font-family="sans-serif">Data</text>
<text x="625" y="217" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">S3 Policy / KMS</text>
<text x="625" y="233" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Macie / GuardDuty</text>
<rect x="30" y="268" width="740" height="100" rx="10" fill="${BOX}" stroke="${TXT}" stroke-width="1" opacity="0.5"/>
<text x="400" y="295" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">キー原則の実装</text>
<text x="50" y="325" fill="${TXT}" font-size="12" font-family="sans-serif">• Assume Breach: CloudTrail / AWS Config / Security Hub で全監視</text>
<text x="50" y="353" fill="${TXT}" font-size="12" font-family="sans-serif">• Least Privilege: IAM Access Analyzer + SCP で継続的最小権限</text>`);

const svgMap: Record<number, string> = {
	4: s4,
	12: s12,
	15: s15,
	19: s19,
	21: s21,
	34: s34,
	46: s46,
	52: s52,
	59: s59,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done: added", Object.keys(svgMap).length, "more SVGs");
