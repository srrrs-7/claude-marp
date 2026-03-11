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

// 6: SAML history
const s6 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML の歴史と設計思想</text>
<rect x="20" y="50" width="80" height="300" rx="6" fill="${BOX}" stroke="${TXT}" stroke-width="1" opacity="0.4"/>
<text x="60" y="310" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif" transform="rotate(-90,60,200)">時系列</text>
<rect x="130" y="65" width="620" height="50" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="150" y="87" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">2002</text>
<text x="210" y="87" fill="${TXT}" font-size="12" font-family="sans-serif">SAML 1.0 — OASIS標準化。エンタープライズSSO誕生</text>
<text x="210" y="105" fill="${TXT}" font-size="11" font-family="sans-serif">XML + PKI署名による強固な認証。ブラウザリダイレクト方式</text>
<rect x="130" y="130" width="620" height="50" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="150" y="152" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">2005</text>
<text x="210" y="152" fill="${TXT}" font-size="12" font-family="sans-serif">SAML 2.0 — 現在の標準。HTTP-POST/Redirect Binding</text>
<text x="210" y="170" fill="${TXT}" font-size="11" font-family="sans-serif">Liberty AllianceとShibbolethを統合。エンプラ普及加速</text>
<rect x="130" y="195" width="620" height="50" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="150" y="217" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">2012</text>
<text x="210" y="217" fill="${TXT}" font-size="12" font-family="sans-serif">OAuth 2.0登場 — APIアクセス認可の標準化</text>
<text x="210" y="235" fill="${TXT}" font-size="11" font-family="sans-serif">モバイル・クラウド時代のニーズに応える軽量プロトコル</text>
<rect x="130" y="260" width="620" height="50" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="150" y="282" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">2014</text>
<text x="210" y="282" fill="${TXT}" font-size="12" font-family="sans-serif">OIDC 1.0 — OAuth2の上にアイデンティティ層を追加</text>
<text x="210" y="300" fill="${TXT}" font-size="11" font-family="sans-serif">JSON/JWT。SAMLの代替としてモバイル・API時代へ</text>
<text x="400" y="375" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">SAMLは2005年以来エンプラの基盤 — 新規はOIDCへ移行中</text>`);

// 12: SAML IdP-Initiated flow
const s12 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML IdP-Initiated SSO フロー</text>
<rect x="30" y="45" width="100" height="40" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="80" y="70" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">ユーザー</text>
<rect x="200" y="45" width="120" height="40" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="260" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">IdP Portal</text>
<rect x="480" y="45" width="120" height="40" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="540" y="70" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">SP (Service)</text>
<line x1="80" y1="85" x2="80" y2="370" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="260" y1="85" x2="260" y2="370" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="540" y1="85" x2="540" y2="370" stroke="${TXT}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3"/>
<line x1="80" y1="110" x2="255" y2="110" stroke="${GRN}" stroke-width="2"/>
<polygon points="255,110 243,104 243,116" fill="${GRN}"/>
<text x="168" y="102" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">① IdP Portal にログイン</text>
<line x1="260" y1="145" x2="260" y2="170" stroke="${A1}" stroke-width="2"/>
<text x="310" y="162" fill="${A1}" font-size="11" font-family="sans-serif">② IdPで認証完了</text>
<line x1="260" y1="200" x2="535" y2="200" stroke="${A1}" stroke-width="2"/>
<polygon points="535,200 523,194 523,206" fill="${A1}"/>
<text x="397" y="192" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">③ SAML Response (Assertion) を SP に POST</text>
<line x1="535" y1="240" x2="85" y2="240" stroke="${A2}" stroke-width="2"/>
<polygon points="85,240 97,234 97,246" fill="${A2}"/>
<text x="310" y="232" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">④ SP がAssertionを検証</text>
<line x1="535" y1="285" x2="85" y2="285" stroke="${A2}" stroke-width="2"/>
<polygon points="85,285 97,279 97,291" fill="${A2}"/>
<text x="310" y="277" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">⑤ セッション確立 → サービス利用可能</text>
<rect x="30" y="315" width="740" height="45" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="340" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">SP-Initiated との違い: IdP起点のためSP側にAuthnRequest不要</text>`);

// 13: SAML Binding comparison
const s13 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML Binding: HTTP-Redirect vs HTTP-POST</text>
<rect x="20" y="50" width="370" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">HTTP-Redirect Binding</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">HTTP-POST Binding</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">転送先: URLクエリパラメータ</text>
<text x="425" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">転送先: POSTボディ</text>
<text x="35" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">エンコード: Base64 + deflate</text>
<text x="425" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">エンコード: Base64</text>
<text x="35" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">サイズ制限: URLの長さ制限あり</text>
<text x="425" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">サイズ制限: なし</text>
<text x="35" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">用途: AuthnRequest送信</text>
<text x="425" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">用途: SAML Response/Assertion送信</text>
<text x="35" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">署名: クエリ文字列に付加</text>
<text x="425" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">署名: XML内に埋め込み</text>
<text x="35" y="275" fill="${A1}" font-size="12" font-family="sans-serif">軽量・リダイレクト向き</text>
<text x="425" y="275" fill="${A2}" font-size="12" font-family="sans-serif">大きなAssertionに適切</text>
<text x="400" y="360" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">実装: AuthnRequestはRedirect / SAMLResponseはPOSTが一般的</text>`);

// 19: SAML Assertion structure
const s19 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML Assertion の構造</text>
<rect x="30" y="50" width="740" height="310" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">samlp:Response</text>
<rect x="50" y="90" width="700" height="55" rx="6" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="70" y="113" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">saml:Assertion</text>
<text x="300" y="113" fill="${TXT}" font-size="11" font-family="sans-serif">ID=, Version="2.0", IssueInstant=</text>
<text x="70" y="133" fill="${TXT}" font-size="11" font-family="sans-serif">Issuer: IdP エンティティID / Signature (XML Signature)</text>
<rect x="70" y="155" width="660" height="40" rx="5" fill="${BG}" stroke="${GRN}" stroke-width="1.5"/>
<text x="90" y="178" fill="${GRN}" font-size="12" font-weight="bold" font-family="sans-serif">Subject</text>
<text x="210" y="178" fill="${TXT}" font-size="11" font-family="sans-serif">NameID (ユーザー識別子) / SubjectConfirmation (Bearer)</text>
<rect x="70" y="205" width="660" height="40" rx="5" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="90" y="228" fill="${BLU}" font-size="12" font-weight="bold" font-family="sans-serif">Conditions</text>
<text x="210" y="228" fill="${TXT}" font-size="11" font-family="sans-serif">NotBefore / NotOnOrAfter / AudienceRestriction (SP Entity ID)</text>
<rect x="70" y="255" width="310" height="75" rx="5" fill="${BG}" stroke="${A1}" stroke-width="1.5"/>
<text x="90" y="278" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">AuthnStatement</text>
<text x="90" y="300" fill="${TXT}" font-size="11" font-family="sans-serif">AuthnInstant</text>
<text x="90" y="318" fill="${TXT}" font-size="11" font-family="sans-serif">AuthnContext (PasswordProtectedTransport等)</text>
<rect x="400" y="255" width="330" height="75" rx="5" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="420" y="278" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">AttributeStatement</text>
<text x="420" y="300" fill="${TXT}" font-size="11" font-family="sans-serif">email / displayName / groups</text>
<text x="420" y="318" fill="${TXT}" font-size="11" font-family="sans-serif">カスタム属性 (IdPで設定)</text>`);

// 22: JWT ID Token structure
const s22 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">JWT ID Token の構造</text>
<rect x="20" y="50" width="220" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="270" y="50" width="220" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="520" y="50" width="260" height="300" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="130" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Header</text>
<text x="380" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">Payload</text>
<text x="650" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">Signature</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">alg: RS256</text>
<text x="35" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">typ: JWT</text>
<text x="35" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">kid: キーID</text>
<text x="35" y="210" fill="${A1}" font-size="11" font-family="sans-serif">→検証に使う</text>
<text x="35" y="230" fill="${A1}" font-size="11" font-family="sans-serif">   アルゴリズム</text>
<text x="285" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">sub: ユーザーID</text>
<text x="285" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">iss: IdP URL</text>
<text x="285" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">aud: client_id</text>
<text x="285" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">exp: 有効期限</text>
<text x="285" y="224" fill="${TXT}" font-size="12" font-family="sans-serif">iat: 発行時刻</text>
<text x="285" y="252" fill="${TXT}" font-size="12" font-family="sans-serif">nonce: (CSRF対策)</text>
<text x="285" y="280" fill="${TXT}" font-size="12" font-family="sans-serif">email / name</text>
<text x="535" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">RSASSA-PKCS1-v1.5</text>
<text x="535" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">または ECDSA</text>
<text x="535" y="170" fill="${TXT}" font-size="12" font-family="sans-serif">IdPの秘密鍵で署名</text>
<text x="535" y="200" fill="${TXT}" font-size="12" font-family="sans-serif">JWKSで公開鍵取得</text>
<text x="535" y="228" fill="${TXT}" font-size="12" font-family="sans-serif">→署名を検証</text>
<text x="535" y="270" fill="${GRN}" font-size="12" font-family="sans-serif">改ざん不可</text>
<text x="130" y="340" text-anchor="middle" fill="${TXT}" font-size="20" font-family="monospace">xxxxx</text>
<text x="380" y="340" text-anchor="middle" fill="${TXT}" font-size="20" font-family="monospace">yyyyy</text>
<text x="650" y="340" text-anchor="middle" fill="${TXT}" font-size="20" font-family="monospace">zzzzz</text>
<text x="400" y="380" text-anchor="middle" fill="${A1}" font-size="13" font-family="sans-serif">xxxxx.yyyyy.zzzzz (Base64URL)</text>`);

// 30: Mobile/SPA - OIDC reasons
const s30 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">モバイル・SPA — OIDC が適切な理由</text>
<rect x="20" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="430" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="195" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">SAMLが困難な理由</text>
<text x="605" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">OIDCが適切な理由</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• XMLは重くモバイルに不向き</text>
<text x="35" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">• ブラウザリダイレクト依存</text>
<text x="35" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">  (ネイティブアプリに困難)</text>
<text x="35" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">• client_secret保管が困難</text>
<text x="35" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">• REST API認可に非対応</text>
<text x="35" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">• XMLパーサーの脆弱性リスク</text>
<text x="445" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• JWT(JSON)は軽量・パース容易</text>
<text x="445" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">• PKCE: secret不要で安全</text>
<text x="445" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">• OAuth2でAPI認可も統一</text>
<text x="445" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">• Custom URI Scheme対応</text>
<text x="445" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">• Discovery自動設定</text>
<text x="445" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">• 各OSのSDKが充実</text>
<text x="400" y="370" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">新規モバイル/SPAはOIDC + PKCE (S256) 一択</text>`);

// 32: Multi-protocol IdP
const s32 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">マルチプロトコル対応 IdP 構成</text>
<rect x="300" y="50" width="200" height="65" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="80" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Modern IdP</text>
<text x="400" y="100" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Okta / Azure AD / Auth0</text>
<line x1="350" y1="115" x2="200" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="200,165 206,152 218,158" fill="${A1}"/>
<line x1="400" y1="115" x2="400" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="400,165 394,152 406,152" fill="${A1}"/>
<line x1="450" y1="115" x2="600" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="600,165 590,154 602,152" fill="${A1}"/>
<rect x="100" y="168" width="180" height="55" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="190" y="193" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">SAML 2.0</text>
<text x="190" y="213" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">エンプラ SSO</text>
<rect x="310" y="168" width="180" height="55" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="193" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">OIDC</text>
<text x="400" y="213" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Web/モバイル</text>
<rect x="520" y="168" width="180" height="55" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="610" y="193" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">OAuth2</text>
<text x="610" y="213" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">API認可</text>
<text x="400" y="290" text-anchor="middle" fill="${TXT}" font-size="13" font-weight="bold" font-family="sans-serif">接続可能なシステム例</text>
<rect x="30" y="310" width="150" height="50" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1.5"/>
<text x="105" y="340" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Salesforce (SAML)</text>
<rect x="200" y="310" width="150" height="50" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="1.5"/>
<text x="275" y="340" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">React SPA (OIDC)</text>
<rect x="370" y="310" width="150" height="50" rx="6" fill="${BOX}" stroke="${BLU}" stroke-width="1.5"/>
<text x="445" y="340" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Microservice (OAuth2)</text>
<rect x="540" y="310" width="230" height="50" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="655" y="340" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Legacy ADFS連携 (SAML)</text>`);

// 36: XSW attack
const s36 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SAML 脆弱性 #1: XML Signature Wrapping (XSW)</text>
<rect x="20" y="50" width="370" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="300" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">攻撃の仕組み</text>
<text x="595" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">対策</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">1. 正規ユーザーのSAML Response傍受</text>
<text x="35" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">2. XMLに悪意ある要素を追加</text>
<text x="35" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">   (署名されたノードは変更せず)</text>
<text x="35" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">3. パーサーが改ざんノードを読む</text>
<text x="35" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">   (署名検証は成功と判断)</text>
<text x="35" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">4. 攻撃者が他ユーザーとして認証</text>
<text x="35" y="295" fill="${A2}" font-size="12" font-family="sans-serif">CVE: 多数存在 / 主要SAMLライブラリで発見歴</text>
<text x="425" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">✓ 署名されたノードのみ使用</text>
<text x="425" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">✓ XPath検証の厳密化</text>
<text x="425" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">✓ 実績あるSAMLライブラリ使用</text>
<text x="425" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">✓ InResponseToの検証</text>
<text x="425" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">✓ AssertionIDのキャッシュ</text>
<text x="425" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">✓ ライブラリを最新版に維持</text>
<text x="425" y="295" fill="${GRN}" font-size="12" font-family="sans-serif">→ 自前実装は危険: 専用ライブラリ必須</text>`);

// 44: Common security best practices
const s44 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">共通セキュリティ ベストプラクティス</text>
<rect x="20" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="410" y="50" width="370" height="310" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">通信・証明書</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">トークン・実装</text>
<text x="35" y="112" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">HTTPS必須 / TLS 1.2+</text>
<text x="35" y="142" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">HSTS (Strict-Transport-Security)</text>
<text x="35" y="172" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">証明書ピニング(モバイル)</text>
<text x="35" y="202" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">定期的な鍵ローテーション</text>
<text x="35" y="232" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">証明書有効期限の監視</text>
<text x="35" y="262" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">DNSSEC + CAA レコード</text>
<text x="35" y="295" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="55" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">フィッシング耐性MFA</text>
<text x="425" y="112" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">有効期限の短いトークン</text>
<text x="425" y="142" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="142" fill="${TXT}" font-size="12" font-family="sans-serif">署名アルゴリズムの固定</text>
<text x="425" y="172" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="172" fill="${TXT}" font-size="12" font-family="sans-serif">alg:none 拒否設定</text>
<text x="425" y="202" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="202" fill="${TXT}" font-size="12" font-family="sans-serif">全パラメータのバリデーション</text>
<text x="425" y="232" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="232" fill="${TXT}" font-size="12" font-family="sans-serif">セキュリティヘッダー設定</text>
<text x="425" y="262" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="262" fill="${TXT}" font-size="12" font-family="sans-serif">認証ログの監査・SIEM連携</text>
<text x="425" y="295" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="445" y="295" fill="${TXT}" font-size="12" font-family="sans-serif">依存ライブラリのSCA</text>`);

// 54: Summary
const s54 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">まとめ</text>
<rect x="30" y="50" width="340" height="140" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<rect x="430" y="50" width="340" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2.5"/>
<text x="200" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">SAML を選ぶ場面</text>
<text x="600" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">OIDC を選ぶ場面</text>
<text x="45" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">• 既存エンプラ IdP (ADFS等)</text>
<text x="45" y="133" fill="${TXT}" font-size="12" font-family="sans-serif">• B2B/SaaS 標準要件がSAML</text>
<text x="45" y="158" fill="${TXT}" font-size="12" font-family="sans-serif">• レガシーシステム統合</text>
<text x="445" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">• 新規 Web / モバイルアプリ</text>
<text x="445" y="133" fill="${TXT}" font-size="12" font-family="sans-serif">• API 認可が必要</text>
<text x="445" y="158" fill="${TXT}" font-size="12" font-family="sans-serif">• マイクロサービス認証</text>
<rect x="30" y="215" width="740" height="145" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="242" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">共通の重要ポイント</text>
<text x="50" y="272" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="70" y="272" fill="${TXT}" font-size="12" font-family="sans-serif">実績あるライブラリを使用 — 自前実装は危険</text>
<text x="50" y="302" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="70" y="302" fill="${TXT}" font-size="12" font-family="sans-serif">セキュリティパラメータの全検証必須</text>
<text x="50" y="332" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="70" y="332" fill="${TXT}" font-size="12" font-family="sans-serif">現代的 IdP (Okta/Azure AD) は両方サポート</text>`);

const svgMap: Record<number, string> = {
	6: s6,
	12: s12,
	13: s13,
	19: s19,
	22: s22,
	30: s30,
	32: s32,
	36: s36,
	44: s44,
	54: s54,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done: added", Object.keys(svgMap).length, "more SVGs");
