import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219130000_mfa-isms-guide/slides-data.json";
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

// 3: Current state of auth breaches (2024)
const s3 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">認証侵害の現状と統計（2024）</text>
<rect x="30" y="50" width="220" height="120" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2.5"/>
<text x="140" y="82" text-anchor="middle" fill="${A2}" font-size="28" font-weight="bold" font-family="sans-serif">81%</text>
<text x="140" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">セキュリティ侵害の</text>
<text x="140" y="130" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">原因はパスワード</text>
<text x="140" y="160" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Verizon DBIR 2024</text>
<rect x="290" y="50" width="220" height="120" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="82" text-anchor="middle" fill="${A1}" font-size="28" font-weight="bold" font-family="sans-serif">99.9%</text>
<text x="400" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">MFAで防げる</text>
<text x="400" y="130" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">アカウント侵害</text>
<text x="400" y="160" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Microsoft 調査</text>
<rect x="550" y="50" width="220" height="120" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2.5"/>
<text x="660" y="82" text-anchor="middle" fill="${GRN}" font-size="28" font-weight="bold" font-family="sans-serif">50倍</text>
<text x="660" y="110" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">MFAなしはありより</text>
<text x="660" y="130" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">侵害されやすい</text>
<text x="660" y="160" text-anchor="middle" fill="${TXT}" font-size="10" font-family="sans-serif">Google 調査</text>
<rect x="30" y="200" width="740" height="160" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="228" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">主な侵害ベクター (2024)</text>
<text x="60" y="260" fill="${A2}" font-size="13" font-family="sans-serif">1.</text>
<text x="80" y="260" fill="${TXT}" font-size="12" font-family="sans-serif">フィッシング攻撃 (AiTM含む) — MFAコードも盗取可能</text>
<text x="60" y="290" fill="${A2}" font-size="13" font-family="sans-serif">2.</text>
<text x="80" y="290" fill="${TXT}" font-size="12" font-family="sans-serif">クレデンシャルスタッフィング — 流出DBを悪用</text>
<text x="60" y="320" fill="${A2}" font-size="13" font-family="sans-serif">3.</text>
<text x="80" y="320" fill="${TXT}" font-size="12" font-family="sans-serif">ブルートフォース / パスワードスプレー攻撃</text>
<text x="400" y="355" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">対策: FIDO2/Passkeys でフィッシング耐性を確保</text>`);

// 5: Password-only risks
const s5 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">パスワード単体が抱えるリスク</text>
<rect x="20" y="50" width="230" height="130" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="285" y="50" width="230" height="130" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="50" width="230" height="130" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="135" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">推測・総当たり</text>
<text x="400" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">フィッシング</text>
<text x="665" y="78" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">リスト攻撃</text>
<text x="35" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">短・単純パスワードは</text>
<text x="35" y="133" fill="${TXT}" font-size="12" font-family="sans-serif">数秒〜数時間で解読</text>
<text x="35" y="160" fill="${A2}" font-size="11" font-family="sans-serif">7文字英数字: 7分</text>
<text x="300" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">偽サイトで入力させ</text>
<text x="300" y="133" fill="${TXT}" font-size="12" font-family="sans-serif">パスワードを盗取</text>
<text x="300" y="160" fill="${A2}" font-size="11" font-family="sans-serif">検知困難な手法</text>
<text x="565" y="108" fill="${TXT}" font-size="12" font-family="sans-serif">流出DBから取得した</text>
<text x="565" y="133" fill="${TXT}" font-size="12" font-family="sans-serif">ID/Passで大量試行</text>
<text x="565" y="160" fill="${A2}" font-size="11" font-family="sans-serif">同一PW使い回しで危険</text>
<rect x="20" y="210" width="760" height="150" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="1.5"/>
<text x="400" y="238" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">MFAで防御できる理由</text>
<text x="45" y="268" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="268" fill="${TXT}" font-size="12" font-family="sans-serif">パスワード漏洩しても第二要素なしでは認証不可</text>
<text x="45" y="298" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="298" fill="${TXT}" font-size="12" font-family="sans-serif">FIDO2は物理デバイス + 生体認証で最強防御</text>
<text x="45" y="328" fill="${GRN}" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="328" fill="${TXT}" font-size="12" font-family="sans-serif">推測・総当たりは第二要素で無力化</text>`);

// 10: SMS OTP details
const s10 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">SMS / 電話 OTP</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">仕組みと特徴</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">リスクと限界</text>
<text x="45" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• 認証時に電話番号にOTP送信</text>
<text x="45" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• 通常6桁・有効期間5〜10分</text>
<text x="45" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• 追加アプリ不要で導入容易</text>
<text x="45" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• 既存電話番号をそのまま利用</text>
<text x="45" y="250" fill="${A1}" font-size="12" font-family="sans-serif">メリット: 低コスト・広い普及率</text>
<text x="45" y="278" fill="${A1}" font-size="12" font-family="sans-serif">ユーザー: 追加アプリなし</text>
<text x="435" y="112" fill="${A2}" font-size="12" font-family="sans-serif">• SIMスワッピング攻撃</text>
<text x="435" y="140" fill="${A2}" font-size="12" font-family="sans-serif">• SS7プロトコル脆弱性</text>
<text x="435" y="168" fill="${A2}" font-size="12" font-family="sans-serif">• AiTMフィッシングで盗取可能</text>
<text x="435" y="196" fill="${A2}" font-size="12" font-family="sans-serif">• 通信費・遅延の問題</text>
<text x="435" y="250" fill="${GRN}" font-size="12" font-family="sans-serif">NIST SP 800-63B:</text>
<text x="435" y="278" fill="${TXT}" font-size="12" font-family="sans-serif">SMS OTPは「推奨しない」(RESTRICTED)</text>
<text x="400" y="365" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">導入しやすいが中リスク環境のみ / 高リスクはTOTP以上へ</text>`);

// 11: TOTP details
const s11 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">TOTP（Time-based OTP） — RFC 6238</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">アルゴリズム</text>
<text x="595" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">特徴と注意点</text>
<text x="45" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">TOTP = HMAC-SHA1(secret, T)</text>
<text x="45" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">T = floor(現在時刻 / 30秒)</text>
<text x="45" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">→ 30秒ごとに変わる6桁コード</text>
<text x="45" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">共有シークレット (QRコード登録)</text>
<text x="45" y="228" fill="${TXT}" font-size="12" font-family="sans-serif">対応アプリ: Google Authenticator</text>
<text x="45" y="254" fill="${TXT}" font-size="12" font-family="sans-serif">Authy / Microsoft Authenticator</text>
<text x="45" y="290" fill="${A1}" font-size="12" font-family="sans-serif">オフラインで動作可能</text>
<text x="435" y="112" fill="${GRN}" font-size="12" font-family="sans-serif">• SMS OTPより安全</text>
<text x="435" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• SIMスワッピングに強い</text>
<text x="435" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• アプリのみで完結</text>
<text x="435" y="210" fill="${A2}" font-size="12" font-family="sans-serif">注意: フィッシング耐性なし</text>
<text x="435" y="238" fill="${A2}" font-size="12" font-family="sans-serif">リアルタイム攻撃で盗取可能</text>
<text x="435" y="266" fill="${A2}" font-size="12" font-family="sans-serif">端末紛失 → リカバリー必要</text>
<text x="435" y="290" fill="${A1}" font-size="12" font-family="sans-serif">コスト低 / SMSより上位</text>`);

// 13: FIDO2/WebAuthn
const s13 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">FIDO2 / WebAuthn — フィッシング耐性MFA</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2.5"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">仕組み</text>
<text x="595" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">なぜフィッシング耐性があるか</text>
<text x="45" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• 公開鍵暗号方式 (ECDSA)</text>
<text x="45" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• 秘密鍵はデバイス内のみ</text>
<text x="45" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• 生体認証 or PINでローカル解錠</text>
<text x="45" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• サーバーはチャレンジを送信</text>
<text x="45" y="224" fill="${TXT}" font-size="12" font-family="sans-serif">• デバイスが秘密鍵で署名応答</text>
<text x="45" y="265" fill="${GRN}" font-size="12" font-family="sans-serif">対応: YubiKey / TouchID / FaceID</text>
<text x="45" y="290" fill="${GRN}" font-size="12" font-family="sans-serif">Windows Hello / Android</text>
<text x="435" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• チャレンジにOrigin (domain) 含む</text>
<text x="435" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• 偽ドメインでは署名が不一致</text>
<text x="435" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• 秘密鍵はデバイス外に出ない</text>
<text x="435" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• AiTMフィッシングでも無効</text>
<text x="435" y="240" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">唯一のフィッシング耐性MFA</text>
<text x="435" y="270" fill="${TXT}" font-size="12" font-family="sans-serif">NIST AAL3 (最高保証レベル)</text>`);

// 18: Use-case MFA recommendations
const s18 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">ユースケース別 推奨MFA方式</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="160" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">ユースケース</text>
<text x="370" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">推奨MFA</text>
<text x="580" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">理由</text>
<text x="160" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">特権管理者アカウント</text>
<text x="370" y="108" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">FIDO2 / スマートカード</text>
<text x="580" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">フィッシング耐性必須</text>
<text x="160" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">一般社員 (社内システム)</text>
<text x="370" y="142" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">TOTP / Push通知</text>
<text x="580" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">UXと安全性のバランス</text>
<text x="160" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">リモートワーカー</text>
<text x="370" y="176" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">FIDO2 / TOTP</text>
<text x="580" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">VPN + MFA必須</text>
<text x="160" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">顧客向けWebサービス</text>
<text x="370" y="210" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">Passkeys / SMS OTP</text>
<text x="580" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">UX重視・段階的移行</text>
<text x="160" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">金融・医療システム</text>
<text x="370" y="244" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">FIDO2 必須</text>
<text x="580" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">規制要件・高リスク</text>
<text x="160" y="278" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">サービスアカウント</text>
<text x="370" y="278" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">mTLS / Workload ID</text>
<text x="580" y="278" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">M2M認証専用</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="270" y1="45" x2="270" y2="292" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="480" y1="45" x2="480" y2="292" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="340" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">原則: リスク評価に基づき最適な方式を選択</text>`);

// 23: NIST AAL levels
const s23 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">NIST SP 800-63B — AAL 保証レベル</text>
<rect x="20" y="50" width="230" height="300" rx="10" fill="${BOX}" stroke="${TXT}" stroke-width="1.5"/>
<rect x="285" y="50" width="230" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="550" y="50" width="230" height="300" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2.5"/>
<text x="135" y="78" text-anchor="middle" fill="${TXT}" font-size="14" font-weight="bold" font-family="sans-serif">AAL1</text>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">AAL2</text>
<text x="665" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">AAL3</text>
<text x="135" y="105" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">基本認証</text>
<text x="400" y="105" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">強い認証</text>
<text x="665" y="105" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">最高保証</text>
<text x="35" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• パスワードのみ</text>
<text x="35" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• ソフトウェアOTP</text>
<text x="35" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• フィッシング耐性なし</text>
<text x="35" y="240" fill="${TXT}" font-size="11" font-family="sans-serif">用途: 低リスクサービス</text>
<text x="300" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• MFA必須</text>
<text x="300" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• TOTP / Push通知</text>
<text x="300" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• ソフトウェアFIDO2</text>
<text x="300" y="240" fill="${A1}" font-size="11" font-family="sans-serif">用途: 一般業務システム</text>
<text x="300" y="265" fill="${A1}" font-size="11" font-family="sans-serif">多くの場合の推奨レベル</text>
<text x="565" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• フィッシング耐性MFA必須</text>
<text x="565" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• FIDO2 (ハードウェア)</text>
<text x="565" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• スマートカード</text>
<text x="565" y="213" fill="${TXT}" font-size="11" font-family="sans-serif">• 物理的存在確認</text>
<text x="565" y="240" fill="${GRN}" font-size="11" font-family="sans-serif">用途: 金融・医療・政府</text>
<text x="565" y="265" fill="${GRN}" font-size="11" font-family="sans-serif">最高セキュリティ要件</text>
<text x="400" y="370" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">ISMSリスク評価に基づき適切なAALレベルを選択</text>`);

// 25: Zero Trust and MFA
const s25 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">ゼロトラストアーキテクチャとMFA</text>
<rect x="200" y="50" width="400" height="65" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Never Trust, Always Verify</text>
<text x="400" y="103" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">すべてのアクセスを継続的に検証する</text>
<line x1="300" y1="115" x2="200" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="200,165 205,152 217,158" fill="${A1}"/>
<line x1="400" y1="115" x2="400" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="400,165 394,152 406,152" fill="${A1}"/>
<line x1="500" y1="115" x2="600" y2="165" stroke="${A1}" stroke-width="2"/>
<polygon points="600,165 590,153 602,152" fill="${A1}"/>
<rect x="100" y="168" width="180" height="70" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="190" y="195" text-anchor="middle" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">Identity Verify</text>
<text x="190" y="218" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">MFA必須 / 継続認証</text>
<rect x="310" y="168" width="180" height="70" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="195" text-anchor="middle" fill="${GRN}" font-size="12" font-weight="bold" font-family="sans-serif">Device Trust</text>
<text x="400" y="218" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">デバイスコンプライアンス</text>
<rect x="520" y="168" width="180" height="70" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="610" y="195" text-anchor="middle" fill="${BLU}" font-size="12" font-weight="bold" font-family="sans-serif">Least Privilege</text>
<text x="610" y="218" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">最小権限アクセス</text>
<rect x="30" y="268" width="740" height="100" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="295" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">MFAのゼロトラスト実装</text>
<text x="50" y="322" fill="${TXT}" font-size="12" font-family="sans-serif">• Conditional Access: リスクレベルに応じてMFA強度を動的に変更</text>
<text x="50" y="348" fill="${TXT}" font-size="12" font-family="sans-serif">• Continuous Verification: セッション中も定期的に再認証</text>`);

// 41: IdP/IAM integration patterns
const s41 = w(`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">IdP / IAM システムとの統合パターン</text>
<rect x="300" y="50" width="200" height="60" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Identity Provider</text>
<text x="400" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Okta / Azure AD / Auth0</text>
<line x1="350" y1="110" x2="160" y2="175" stroke="${A1}" stroke-width="2"/>
<polygon points="160,175 163,162 175,168" fill="${A1}"/>
<line x1="400" y1="110" x2="400" y2="175" stroke="${A1}" stroke-width="2"/>
<polygon points="400,175 394,162 406,162" fill="${A1}"/>
<line x1="450" y1="110" x2="640" y2="175" stroke="${A1}" stroke-width="2"/>
<polygon points="640,175 630,163 642,162" fill="${A1}"/>
<rect x="60" y="178" width="190" height="75" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="155" y="205" text-anchor="middle" fill="${A2}" font-size="12" font-weight="bold" font-family="sans-serif">RADIUS</text>
<text x="155" y="228" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">VPN / WiFi MFA</text>
<text x="155" y="248" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">レガシー統合</text>
<rect x="305" y="178" width="190" height="75" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="205" text-anchor="middle" fill="${GRN}" font-size="12" font-weight="bold" font-family="sans-serif">OIDC / SAML</text>
<text x="400" y="228" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Web/アプリ認証</text>
<text x="400" y="248" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">SSO統合</text>
<rect x="550" y="178" width="190" height="75" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="645" y="205" text-anchor="middle" fill="${BLU}" font-size="12" font-weight="bold" font-family="sans-serif">LDAP / AD</text>
<text x="645" y="228" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">ディレクトリ連携</text>
<text x="645" y="248" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">社内システム</text>
<rect x="30" y="285" width="740" height="85" rx="8" fill="${BOX}" stroke="${TXT}" stroke-width="0.5" opacity="0.5"/>
<text x="400" y="310" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">統合時の考慮点</text>
<text x="50" y="340" fill="${TXT}" font-size="12" font-family="sans-serif">• MFAポリシーのIdP集中管理 / 各SPはIdPにMFA判断を委任</text>
<text x="50" y="365" fill="${TXT}" font-size="12" font-family="sans-serif">• 監査ログをIdPで一元収集 / SIEM連携</text>`);

const svgMap: Record<number, string> = {
	3: s3,
	5: s5,
	10: s10,
	11: s11,
	13: s13,
	18: s18,
	23: s23,
	25: s25,
	41: s41,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done: added", Object.keys(svgMap).length, "more SVGs");
