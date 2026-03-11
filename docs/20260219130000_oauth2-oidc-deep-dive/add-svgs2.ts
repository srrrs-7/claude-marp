import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219130000_oauth2-oidc-deep-dive/slides-data.json";
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

// 4: PKCE deep dive
const s4 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">PKCE 深掘り — code_verifier / challenge 生成</text>
<rect x="20" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="430" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="195" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">code_verifier</text>
<text x="605" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">code_challenge</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• ランダム文字列 (43-128文字)</text>
<text x="35" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">• Base64URL文字のみ使用</text>
<text x="35" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">• クライアント側で生成・保持</text>
<text x="35" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">• トークン取得時のみ送信</text>
<text x="35" y="245" fill="${A1}" font-size="12" font-family="sans-serif">例: dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1g...</text>
<text x="445" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• S256(SHA256)推奨</text>
<text x="445" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">• BASE64URL(SHA256(verifier))</text>
<text x="445" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">• 認可リクエストで送信</text>
<text x="445" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">• サーバーはこれを保管</text>
<text x="445" y="245" fill="${A2}" font-size="12" font-family="sans-serif">例: E9Melhoa2OwvFrEMTJguCHaoeK1t8...</text>
<rect x="20" y="370" width="760" height="0" rx="0"/>
<text x="400" y="365" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">セキュリティ: code_verifier なしではトークン取得不可 → 盗まれたcodeが無効化</text>`);

// 11: Token introspection
const s11 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">トークンイントロスペクション (RFC 7662) — RS統合</text>
<rect x="50" y="50" width="180" height="60" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="140" y="85" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Resource Server</text>
<rect x="310" y="50" width="180" height="60" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="85" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Auth Server</text>
<rect x="570" y="50" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="660" y="85" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Client</text>
<line x1="660" y1="110" x2="140" y2="200" stroke="${GRN}" stroke-width="2"/>
<polygon points="140,200 148,187 158,196" fill="${GRN}"/>
<text x="350" y="148" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">① Bearer Token送信 (opaque)</text>
<line x1="140" y1="225" x2="395" y2="225" stroke="${A2}" stroke-width="2"/>
<polygon points="395,225 383,219 383,231" fill="${A2}"/>
<text x="268" y="217" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">② POST /introspect (token)</text>
<line x1="395" y1="258" x2="140" y2="258" stroke="${A1}" stroke-width="2"/>
<polygon points="140,258 152,252 152,264" fill="${A1}"/>
<text x="268" y="250" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">③ {active: true, scope, sub, exp}</text>
<rect x="50" y="290" width="700" height="80" rx="8" fill="${BOX}" stroke="${TXT}" stroke-width="1" opacity="0.5"/>
<text x="400" y="315" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">レスポンス例</text>
<text x="80" y="345" fill="${TXT}" font-size="12" font-family="monospace">{ "active": true, "scope": "read:data", "sub": "user123", "exp": 1234567890 }</text>`);

// 13: Token revocation
const s13 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">トークン失効 (RFC 7009) — 即時無効化</text>
<rect x="30" y="50" width="350" height="290" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="420" y="50" width="350" height="290" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">なぜ必要か</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">失効フロー</text>
<text x="45" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• JWTは自己完結 → 期限前に</text>
<text x="45" y="138" fill="${TXT}" font-size="12" font-family="sans-serif">  無効化できない</text>
<text x="45" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• ログアウト時にすべての</text>
<text x="45" y="194" fill="${TXT}" font-size="12" font-family="sans-serif">  トークンを無効化したい</text>
<text x="45" y="224" fill="${TXT}" font-size="12" font-family="sans-serif">• トークン漏洩時の緊急対応</text>
<text x="45" y="285" fill="${A2}" font-size="12" font-family="sans-serif">OpaqueトークンはDBで管理可能</text>
<text x="435" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">① POST /revoke</text>
<text x="435" y="138" fill="${TXT}" font-size="12" font-family="sans-serif">  token=xxx&token_type_hint=</text>
<text x="435" y="164" fill="${TXT}" font-size="12" font-family="sans-serif">  access_token</text>
<text x="435" y="200" fill="${TXT}" font-size="12" font-family="sans-serif">② 認可サーバーがDB更新</text>
<text x="435" y="230" fill="${TXT}" font-size="12" font-family="sans-serif">③ イントロスペクション時に</text>
<text x="435" y="256" fill="${TXT}" font-size="12" font-family="sans-serif">  active:false を返す</text>
<text x="435" y="285" fill="${GRN}" font-size="12" font-family="sans-serif">即時失効 → 再利用不可</text>`);

// 19: Discovery document
const s19 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">Discovery ドキュメント — /.well-known/openid-configuration</text>
<rect x="20" y="50" width="760" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">自動設定: クライアントはこのURLのみ知ればよい</text>
<rect x="40" y="90" width="340" height="240" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="55" y="115" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">必須フィールド</text>
<text x="55" y="140" fill="${TXT}" font-size="11" font-family="sans-serif">issuer: https://idp.example.com</text>
<text x="55" y="162" fill="${TXT}" font-size="11" font-family="sans-serif">authorization_endpoint: .../authorize</text>
<text x="55" y="184" fill="${TXT}" font-size="11" font-family="sans-serif">token_endpoint: .../token</text>
<text x="55" y="206" fill="${TXT}" font-size="11" font-family="sans-serif">jwks_uri: .../jwks</text>
<text x="55" y="228" fill="${TXT}" font-size="11" font-family="sans-serif">response_types_supported: [code]</text>
<text x="55" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">subject_types_supported: [public]</text>
<text x="55" y="272" fill="${TXT}" font-size="11" font-family="sans-serif">id_token_signing_alg_values_supported:</text>
<text x="55" y="292" fill="${TXT}" font-size="11" font-family="sans-serif">  [RS256, ES256]</text>
<rect x="420" y="90" width="340" height="240" rx="6" fill="${BG}" stroke="${GRN}" stroke-width="1.5"/>
<text x="435" y="115" fill="${GRN}" font-size="12" font-weight="bold" font-family="sans-serif">推奨フィールド</text>
<text x="435" y="140" fill="${TXT}" font-size="11" font-family="sans-serif">userinfo_endpoint: .../userinfo</text>
<text x="435" y="162" fill="${TXT}" font-size="11" font-family="sans-serif">end_session_endpoint: .../logout</text>
<text x="435" y="184" fill="${TXT}" font-size="11" font-family="sans-serif">scopes_supported: [openid, profile]</text>
<text x="435" y="206" fill="${TXT}" font-size="11" font-family="sans-serif">claims_supported: [sub, email, name]</text>
<text x="435" y="228" fill="${TXT}" font-size="11" font-family="sans-serif">code_challenge_methods_supported: S256</text>
<text x="435" y="250" fill="${TXT}" font-size="11" font-family="sans-serif">token_endpoint_auth_methods:</text>
<text x="435" y="272" fill="${TXT}" font-size="11" font-family="sans-serif">  [client_secret_basic, private_key_jwt]</text>
<text x="435" y="295" fill="${GRN}" font-size="11" font-family="sans-serif">backchannel_logout_supported: true</text>`);

// 21: ID Token claims
const s21 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">ID Token クレーム完全解説</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="100" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">クレーム</text>
<text x="270" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">型</text>
<text x="440" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">説明</text>
<text x="680" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">必須</text>
<text x="100" y="107" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">sub</text>
<text x="270" y="107" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">string</text>
<text x="440" y="107" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">ユーザー識別子 (IdP内でユニーク)</text>
<text x="680" y="107" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">必須</text>
<text x="100" y="137" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">iss</text>
<text x="270" y="137" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">URL</text>
<text x="440" y="137" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">IdPのissuer URL</text>
<text x="680" y="137" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">必須</text>
<text x="100" y="167" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">aud</text>
<text x="270" y="167" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">string[]</text>
<text x="440" y="167" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">対象クライアント (client_id)</text>
<text x="680" y="167" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">必須</text>
<text x="100" y="197" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">exp</text>
<text x="270" y="197" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">number</text>
<text x="440" y="197" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">UNIX タイムスタンプ (有効期限)</text>
<text x="680" y="197" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">必須</text>
<text x="100" y="227" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">iat</text>
<text x="270" y="227" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">number</text>
<text x="440" y="227" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">発行時刻</text>
<text x="680" y="227" text-anchor="middle" fill="${A2}" font-size="13" font-family="sans-serif">必須</text>
<text x="100" y="257" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">nonce</text>
<text x="270" y="257" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">string</text>
<text x="440" y="257" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">リプレイ攻撃防止 (CSRF対策)</text>
<text x="680" y="257" text-anchor="middle" fill="${A1}" font-size="13" font-family="sans-serif">条件付き</text>
<text x="100" y="287" text-anchor="middle" fill="${TXT}" font-size="12" font-family="monospace">email</text>
<text x="270" y="287" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">string</text>
<text x="440" y="287" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">メールアドレス (scope: email)</text>
<text x="680" y="287" text-anchor="middle" fill="${GRN}" font-size="13" font-family="sans-serif">任意</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="118" x2="790" y2="118" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="148" x2="790" y2="148" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="178" x2="790" y2="178" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="208" x2="790" y2="208" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="238" x2="790" y2="238" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="268" x2="790" y2="268" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="170" y1="45" x2="170" y2="300" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="350" y1="45" x2="350" y2="300" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="640" y1="45" x2="640" y2="300" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="340" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">必須クレーム: sub / iss / aud / exp / iat</text>`);

// 25: OIDC session management
const s25 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">OIDC セッション管理 — check_session_iframe</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">セッション確認フロー</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">実装上の注意</text>
<text x="45" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">① RPがiframeでIdPに問合せ</text>
<text x="45" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">  postMessage経由で状態確認</text>
<text x="45" y="170" fill="${TXT}" font-size="12" font-family="sans-serif">② changed/unchanged/error</text>
<text x="45" y="200" fill="${TXT}" font-size="12" font-family="sans-serif">  いずれかを返す</text>
<text x="45" y="230" fill="${TXT}" font-size="12" font-family="sans-serif">③ changed → silent re-auth</text>
<text x="45" y="260" fill="${TXT}" font-size="12" font-family="sans-serif">   または再ログイン要求</text>
<text x="45" y="295" fill="${A1}" font-size="12" font-family="sans-serif">継続的にログイン状態を同期</text>
<text x="435" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• サードパーティCookieの廃止</text>
<text x="435" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">  でiframe方式が問題に</text>
<text x="435" y="170" fill="${TXT}" font-size="12" font-family="sans-serif">• Back-Channel Logoutが</text>
<text x="435" y="200" fill="${TXT}" font-size="12" font-family="sans-serif">  より信頼性が高い</text>
<text x="435" y="230" fill="${TXT}" font-size="12" font-family="sans-serif">• Silent Auth (prompt=none)</text>
<text x="435" y="260" fill="${TXT}" font-size="12" font-family="sans-serif">  でセッション更新可能</text>
<text x="435" y="295" fill="${GRN}" font-size="12" font-family="sans-serif">→ Back-Channel推奨</text>`);

// 34: DPoP
const s34 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">DPoP — Demonstrating Proof of Possession (RFC 9449)</text>
<rect x="30" y="55" width="740" height="100" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="83" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">問題: Bearer Tokenは盗まれたら誰でも使える</text>
<text x="400" y="115" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">DPoPは「トークンを持っているだけでなく、秘密鍵も持っていること」を証明する</text>
<text x="400" y="143" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">送信者がキーペアを生成 → 公開鍵をJWT(DPoP proof)に埋め込みトークンに紐付け</text>
<rect x="30" y="175" width="350" height="185" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="420" y="175" width="350" height="185" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="205" y="202" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">フロー</text>
<text x="595" y="202" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">メリット</text>
<text x="45" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">① クライアントがキーペア生成</text>
<text x="45" y="258" fill="${TXT}" font-size="12" font-family="sans-serif">② DPoP JWT (proof) を作成</text>
<text x="45" y="284" fill="${TXT}" font-size="12" font-family="sans-serif">③ DPoP: プロトコルヘッダーで送信</text>
<text x="45" y="310" fill="${TXT}" font-size="12" font-family="sans-serif">④ RSがDPoP証明を検証</text>
<text x="435" y="232" fill="${GRN}" font-size="12" font-family="sans-serif">• Bearerトークン盗難対策</text>
<text x="435" y="258" fill="${TXT}" font-size="12" font-family="sans-serif">• 特定クライアントにバインド</text>
<text x="435" y="284" fill="${TXT}" font-size="12" font-family="sans-serif">• FAPI 2.0で必須</text>
<text x="435" y="310" fill="${TXT}" font-size="12" font-family="sans-serif">• mTLSより実装が容易</text>`);

// 35: PAR
const s35 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">PAR — Pushed Authorization Requests (RFC 9126)</text>
<rect x="30" y="50" width="350" height="150" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="420" y="50" width="350" height="150" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">従来の問題</text>
<text x="595" y="78" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">PARの解決</text>
<text x="45" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">• Auth Requestのパラメータが</text>
<text x="45" y="132" fill="${TXT}" font-size="12" font-family="sans-serif">  URLに露出 → ログ・履歴に残る</text>
<text x="45" y="156" fill="${TXT}" font-size="12" font-family="sans-serif">• URLが長大になる</text>
<text x="435" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">• 事前にPOST /par でリクエスト登録</text>
<text x="435" y="132" fill="${TXT}" font-size="12" font-family="sans-serif">• request_uri参照のみURLに含める</text>
<text x="435" y="156" fill="${TXT}" font-size="12" font-family="sans-serif">• パラメータがサーバー側で安全</text>
<rect x="30" y="225" width="740" height="135" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="1.5"/>
<text x="400" y="252" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">PARフロー</text>
<text x="50" y="282" fill="${TXT}" font-size="12" font-family="sans-serif">① POST /par (全パラメータ + client認証) → request_uri=urn:ietf:params:oauth:request_uri:xxx</text>
<text x="50" y="312" fill="${TXT}" font-size="12" font-family="sans-serif">② GET /authorize?request_uri=xxx&client_id=yyy (URLはシンプル)</text>
<text x="50" y="342" fill="${GRN}" font-size="12" font-family="sans-serif">利点: URLパラメータ漏洩防止 / client認証強化 / FAPI2.0必須</text>`);

// 40: mTLS
const s40 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">OAuth2 + mTLS クライアント認証 (RFC 8705)</text>
<rect x="30" y="55" width="360" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="420" y="55" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="210" y="83" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">mTLS仕組み</text>
<text x="595" y="83" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">メリット・用途</text>
<text x="45" y="115" fill="${TXT}" font-size="12" font-family="sans-serif">• 通常のTLS: サーバー証明書のみ</text>
<text x="45" y="145" fill="${TXT}" font-size="12" font-family="sans-serif">• mTLS: クライアントも証明書提示</text>
<text x="45" y="175" fill="${TXT}" font-size="12" font-family="sans-serif">• 証明書はClient識別子として使用</text>
<text x="45" y="205" fill="${TXT}" font-size="12" font-family="sans-serif">• TokenはクライアントのThumbprint</text>
<text x="45" y="231" fill="${TXT}" font-size="12" font-family="sans-serif">  にバインド (cnf.x5t#S256)</text>
<text x="45" y="261" fill="${TXT}" font-size="12" font-family="sans-serif">• トークン盗難でも再利用不可</text>
<text x="45" y="295" fill="${A1}" font-size="12" font-family="sans-serif">→ Sender-Constrained Token</text>
<text x="435" y="115" fill="${GRN}" font-size="12" font-family="sans-serif">• client_secretより強固</text>
<text x="435" y="145" fill="${TXT}" font-size="12" font-family="sans-serif">• B2B APIで採用増加</text>
<text x="435" y="175" fill="${TXT}" font-size="12" font-family="sans-serif">• 金融API (FAPI2.0) 必須</text>
<text x="435" y="205" fill="${TXT}" font-size="12" font-family="sans-serif">• マイクロサービス間通信</text>
<text x="435" y="235" fill="${TXT}" font-size="12" font-family="sans-serif">• サービスメッシュと併用</text>
<text x="435" y="275" fill="${A2}" font-size="12" font-family="sans-serif">課題: 証明書の管理コスト</text>`);

const svgMap: Record<number, string> = {
	4: s4,
	11: s11,
	13: s13,
	19: s19,
	21: s21,
	25: s25,
	34: s34,
	35: s35,
	40: s40,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done: added", Object.keys(svgMap).length, "more SVGs");
