import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219130000_mfa-isms-guide/slides-data.json";
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

// Slide 4: 認証の3要素
const svg4 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">認証の3要素</text>
<polygon points="400,45 550,320 250,320" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<polygon points="400,75 520,290 280,290" fill="${BG}" stroke="none"/>
<polygon points="400,75 480,240 320,240" fill="${BOX}" stroke="${A2}" stroke-width="1.5"/>
<polygon points="400,105 440,200 360,200" fill="${BOX}" stroke="${GRN}" stroke-width="1.5"/>
<text x="400" y="165" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">Something</text>
<text x="400" y="185" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">You Are</text>
<text x="400" y="225" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Something You Have</text>
<text x="400" y="270" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Something You Know</text>
<text x="400" y="355" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">生体認証 (指紋/顔)</text>
<text x="400" y="340" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">→ 所持認証 (TOTP/FIDO2)</text>
<rect x="530" y="155" width="230" height="30" rx="5" fill="${BOX}" stroke="${GRN}" stroke-width="1"/>
<text x="645" y="175" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">最も強力: フィッシング耐性</text>
<rect x="570" y="220" width="200" height="30" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="670" y="240" text-anchor="middle" fill="${A2}" font-size="11" font-family="sans-serif">中程度: OTP/スマートカード</text>
<rect x="590" y="280" width="180" height="30" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="680" y="300" text-anchor="middle" fill="${A1}" font-size="11" font-family="sans-serif">最も弱い: パスワード単体</text>
<line x1="530" y1="170" x2="430" y2="170" stroke="${GRN}" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="570" y1="235" x2="420" y2="235" stroke="${A2}" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="590" y1="295" x2="410" y2="295" stroke="${A1}" stroke-width="1" stroke-dasharray="3,3"/>
`);

// Slide 6: MFA definition and principle
const svg6 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">MFAの定義と原則</text>
<rect x="20" y="50" width="760" height="80" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="82" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">Multi-Factor Authentication</text>
<text x="400" y="112" text-anchor="middle" fill="${TXT}" font-size="13" font-family="sans-serif">2つ以上の異なるカテゴリの認証要素を組み合わせて本人確認を行う方式</text>
<rect x="30" y="155" width="220" height="90" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="290" y="155" width="220" height="90" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="155" width="220" height="90" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="140" y="182" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Factor 1</text>
<text x="400" y="182" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Factor 2</text>
<text x="660" y="182" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Factor 3 (オプション)</text>
<text x="140" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Knowledge</text>
<text x="400" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Possession</text>
<text x="660" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Inherence</text>
<text x="140" y="234" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">パスワード / PIN</text>
<text x="400" y="234" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">TOTP / FIDO2 / SMS</text>
<text x="660" y="234" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">生体認証</text>
<text x="255" y="200" text-anchor="middle" fill="${TXT}" font-size="20" font-family="sans-serif">+</text>
<text x="515" y="200" text-anchor="middle" fill="${TXT}" font-size="20" font-family="sans-serif">+</text>
<rect x="30" y="275" width="740" height="60" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="1.5"/>
<text x="400" y="300" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">重要: 同一カテゴリの2要素はMFAではない</text>
<text x="400" y="325" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">例: パスワード + 秘密の質問 = 両方 Knowledge = MFA NOT OK</text>
`);

// Slide 9: MFA method overview classification
const svg9 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="16" font-weight="bold" font-family="sans-serif">MFA方式の全体分類</text>
<rect x="20" y="50" width="230" height="305" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="285" y="50" width="230" height="305" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="50" width="230" height="305" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="135" y="78" text-anchor="middle" fill="${A1}" font-size="14" font-weight="bold" font-family="sans-serif">OTP系</text>
<text x="400" y="78" text-anchor="middle" fill="${A2}" font-size="14" font-weight="bold" font-family="sans-serif">Push / App系</text>
<text x="665" y="78" text-anchor="middle" fill="${GRN}" font-size="14" font-weight="bold" font-family="sans-serif">ハードウェア系</text>
<text x="35" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• SMS OTP</text>
<text x="35" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• 音声 OTP</text>
<text x="35" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• TOTP (RFC 6238)</text>
<text x="35" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• HOTP (RFC 4226)</text>
<text x="35" y="240" fill="${A2}" font-size="12" font-family="sans-serif">セキュリティ: 中</text>
<text x="35" y="265" fill="${A2}" font-size="12" font-family="sans-serif">SIM Swap脆弱性</text>
<text x="35" y="290" fill="${A1}" font-size="12" font-family="sans-serif">導入: 低コスト</text>
<text x="300" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• Authenticator App</text>
<text x="300" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• Push通知 (Okta等)</text>
<text x="300" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• Number Matching</text>
<text x="300" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• Passwordless Push</text>
<text x="300" y="240" fill="${A1}" font-size="12" font-family="sans-serif">セキュリティ: 中〜高</text>
<text x="300" y="265" fill="${A2}" font-size="12" font-family="sans-serif">Push疲労攻撃に注意</text>
<text x="300" y="290" fill="${A1}" font-size="12" font-family="sans-serif">Number Matchingで対策</text>
<text x="565" y="112" fill="${TXT}" font-size="12" font-family="sans-serif">• FIDO2 / WebAuthn</text>
<text x="565" y="140" fill="${TXT}" font-size="12" font-family="sans-serif">• Passkeys</text>
<text x="565" y="168" fill="${TXT}" font-size="12" font-family="sans-serif">• YubiKey等セキュリティキー</text>
<text x="565" y="196" fill="${TXT}" font-size="12" font-family="sans-serif">• スマートカード</text>
<text x="565" y="240" fill="${GRN}" font-size="12" font-family="sans-serif">セキュリティ: 最高</text>
<text x="565" y="265" fill="${GRN}" font-size="12" font-family="sans-serif">フィッシング耐性あり</text>
<text x="565" y="290" fill="${A2}" font-size="12" font-family="sans-serif">コスト: 高め</text>
`);

// Slide 17: MFA comparison matrix
const svg17 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFA方式 比較マトリクス</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="100" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">方式</text>
<text x="250" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">セキュリティ</text>
<text x="390" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">UX</text>
<text x="520" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">フィッシング耐性</text>
<text x="670" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">コスト</text>
<text x="100" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SMS OTP</text>
<text x="250" y="108" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">低</text>
<text x="390" y="108" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="108" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="108" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">TOTP</text>
<text x="250" y="142" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中</text>
<text x="390" y="142" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中</text>
<text x="520" y="142" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="142" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Push通知</text>
<text x="250" y="176" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中〜高</text>
<text x="390" y="176" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="176" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="176" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中</text>
<text x="100" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">FIDO2/WebAuthn</text>
<text x="250" y="210" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="210" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="210" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="210" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中〜高</text>
<text x="100" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Passkeys</text>
<text x="250" y="244" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="244" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最高</text>
<text x="520" y="244" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="244" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="278" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">スマートカード</text>
<text x="250" y="278" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="278" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">中</text>
<text x="520" y="278" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="278" text-anchor="middle" fill="${A2}" font-size="12" font-family="sans-serif">高</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="170" y1="45" x2="170" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="320" y1="45" x2="320" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="450" y1="45" x2="450" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="600" y1="45" x2="600" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="340" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">推奨: FIDO2/Passkeys → フィッシング耐性 × UX の両立</text>
`);

// Slide 22: ISO27001 x MFA requirements mapping
const svg22 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">ISO27001 × MFA 要件マッピング</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="155" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">ISO27001管理策</text>
<text x="420" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">MFA要件</text>
<text x="650" y="70" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">対応方式</text>
<text x="155" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">8.2 特権アクセス管理</text>
<text x="420" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">管理者は必須MFA</text>
<text x="650" y="108" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">FIDO2 / スマートカード</text>
<text x="155" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">8.3 情報アクセス制限</text>
<text x="420" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">機密システムへのMFA</text>
<text x="650" y="142" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">TOTP / Push通知</text>
<text x="155" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">8.5 安全な認証</text>
<text x="420" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">リスクに応じたMFA強度</text>
<text x="650" y="176" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">Adaptive MFA</text>
<text x="155" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">5.14 情報伝達</text>
<text x="420" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">外部アクセスへのMFA</text>
<text x="650" y="210" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">VPN + MFA 必須</text>
<text x="155" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">8.18 特権ユーティリティ</text>
<text x="420" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">特権ツール使用時MFA</text>
<text x="650" y="244" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">PAM + MFA 統合</text>
<text x="155" y="278" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">8.6 キャパシティ管理</text>
<text x="420" y="278" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">クラウドAPIへのMFA</text>
<text x="650" y="278" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">サービスアカウント保護</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="270" y1="45" x2="270" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="560" y1="45" x2="560" y2="290" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="345" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">ISO27001:2022 Annex A — MFA要件はリスクベースで段階的に実装</text>
`);

// Slide 26: MFA risk assessment process
const svg26 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFA導入のリスク評価プロセス（ISMS手順）</text>
<rect x="30" y="55" width="160" height="80" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="110" y="87" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">1. 資産特定</text>
<text x="110" y="110" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">システム・データの</text>
<text x="110" y="128" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">重要度評価</text>
<rect x="220" y="55" width="160" height="80" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="300" y="87" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">2. 脅威分析</text>
<text x="300" y="110" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">攻撃ベクター・</text>
<text x="300" y="128" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">脆弱性の把握</text>
<rect x="410" y="55" width="160" height="80" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="490" y="87" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">3. リスク評価</text>
<text x="490" y="110" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">影響度×発生確率</text>
<text x="490" y="128" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">リスクレベル算出</text>
<rect x="600" y="55" width="160" height="80" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="680" y="87" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">4. MFA選定</text>
<text x="680" y="110" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">リスクに応じた</text>
<text x="680" y="128" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">方式の選択</text>
<line x1="190" y1="95" x2="220" y2="95" stroke="${A1}" stroke-width="2"/>
<polygon points="220,95 208,89 208,101" fill="${A1}"/>
<line x1="380" y1="95" x2="410" y2="95" stroke="${A2}" stroke-width="2"/>
<polygon points="410,95 398,89 398,101" fill="${A2}"/>
<line x1="570" y1="95" x2="600" y2="95" stroke="${BLU}" stroke-width="2"/>
<polygon points="600,95 588,89 588,101" fill="${BLU}"/>
<rect x="30" y="175" width="740" height="185" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<text x="400" y="200" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">リスクレベル別MFA要件</text>
<text x="60" y="235" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">高リスク:</text>
<text x="200" y="235" fill="${TXT}" font-size="12" font-family="sans-serif">特権アカウント / 機密データ → FIDO2 / スマートカード必須</text>
<text x="60" y="270" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">中リスク:</text>
<text x="200" y="270" fill="${TXT}" font-size="12" font-family="sans-serif">一般業務システム / VPN → TOTP / Push通知</text>
<text x="60" y="305" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">低リスク:</text>
<text x="200" y="305" fill="${TXT}" font-size="12" font-family="sans-serif">社内のみ低感度 → SMS OTP でも可 (段階的強化)</text>
<text x="400" y="345" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">ISMS原則: リスクアセスメント結果に基づく適切な管理策の選択</text>
`);

// Slide 30: Attack methods targeting MFA
const svg30 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFAを標的とする主要攻撃手法</text>
<rect x="20" y="50" width="230" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="285" y="50" width="230" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="50" width="230" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="20" y="220" width="230" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="285" y="220" width="230" height="140" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="550" y="220" width="230" height="140" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="135" y="77" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">AiTM フィッシング</text>
<text x="135" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">プロキシでOTP傍受</text>
<text x="135" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">Evilginx2等ツール</text>
<text x="135" y="160" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">対策: FIDO2のみ有効</text>
<text x="400" y="77" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">SIMスワッピング</text>
<text x="400" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">電話番号乗っ取り</text>
<text x="400" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">SMS OTP奪取</text>
<text x="400" y="160" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">対策: TOTP/FIDO2へ移行</text>
<text x="665" y="77" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Push疲労攻撃</text>
<text x="665" y="100" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">大量Push通知送信</text>
<text x="665" y="122" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">ユーザーが誤承認</text>
<text x="665" y="160" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">対策: Number Matching</text>
<text x="135" y="247" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">SS7脆弱性</text>
<text x="135" y="270" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">通信プロトコル悪用</text>
<text x="135" y="292" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">SMS傍受</text>
<text x="135" y="330" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">対策: SMS MFA廃止</text>
<text x="400" y="247" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">リアルタイムフィッシング</text>
<text x="400" y="270" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">OTPコードを即時入力</text>
<text x="400" y="292" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">タイミング攻撃</text>
<text x="400" y="330" text-anchor="middle" fill="${GRN}" font-size="11" font-family="sans-serif">対策: FIDO2 + origin確認</text>
<text x="665" y="247" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">最強の防御</text>
<text x="665" y="275" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">FIDO2 / WebAuthn</text>
<text x="665" y="300" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">物理キー拘束</text>
<text x="665" y="325" text-anchor="middle" fill="${GRN}" font-size="12" font-family="sans-serif">全攻撃に耐性あり</text>
`);

// Slide 37: Attack resistance matrix
const svg37 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFA方式別 攻撃耐性マトリクス</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="${A1}" opacity="0.2"/>
<text x="105" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">攻撃種別</text>
<text x="255" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">SMS OTP</text>
<text x="375" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">TOTP</text>
<text x="490" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">Push通知</text>
<text x="620" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">FIDO2</text>
<text x="730" y="70" text-anchor="middle" fill="${A1}" font-size="12" font-weight="bold" font-family="sans-serif">Passkeys</text>
<text x="105" y="108" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">フィッシング</text>
<text x="255" y="108" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="108" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="490" y="108" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="620" y="108" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="108" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="142" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SIMスワッピング</text>
<text x="255" y="142" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="142" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="142" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="620" y="142" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="142" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="176" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">Push疲労攻撃</text>
<text x="255" y="176" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="375" y="176" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="176" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">△</text>
<text x="620" y="176" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="176" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="210" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">SS7攻撃</text>
<text x="255" y="210" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="210" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="210" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="620" y="210" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="210" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="244" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">AiTMフィッシング</text>
<text x="255" y="244" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="244" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="490" y="244" text-anchor="middle" fill="${A2}" font-size="14" font-family="sans-serif">✗</text>
<text x="620" y="244" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="244" text-anchor="middle" fill="${GRN}" font-size="14" font-family="sans-serif">✓</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="${TXT}" stroke-width="0.5" opacity="0.3"/>
<line x1="190" y1="45" x2="190" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="310" y1="45" x2="310" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="430" y1="45" x2="430" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="560" y1="45" x2="560" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<line x1="680" y1="45" x2="680" y2="258" stroke="${TXT}" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="310" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">FIDO2 / Passkeys のみがすべての攻撃に耐性あり</text>
`);

// Slide 39: MFA deployment roadmap
const svg39 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFA導入ロードマップ（4フェーズ）</text>
<rect x="20" y="55" width="165" height="300" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<rect x="213" y="55" width="165" height="300" rx="10" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<rect x="406" y="55" width="165" height="300" rx="10" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<rect x="599" y="55" width="165" height="300" rx="10" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="102" y="82" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Phase 1</text>
<text x="295" y="82" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Phase 2</text>
<text x="488" y="82" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">Phase 3</text>
<text x="681" y="82" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Phase 4</text>
<text x="102" y="106" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">基盤整備</text>
<text x="295" y="106" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">特権MFA展開</text>
<text x="488" y="106" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">全社展開</text>
<text x="681" y="106" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">高度化</text>
<text x="35" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• MFA方式選定</text>
<text x="35" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• IdP/IAM選定</text>
<text x="35" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• PoC実施</text>
<text x="35" y="213" fill="${TXT}" font-size="11" font-family="sans-serif">• リスク評価</text>
<text x="35" y="238" fill="${TXT}" font-size="11" font-family="sans-serif">• UXテスト</text>
<text x="35" y="275" fill="${A1}" font-size="11" font-family="sans-serif">期間: 1-2ヶ月</text>
<text x="228" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• 管理者に強制</text>
<text x="228" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• 特権IDへ適用</text>
<text x="228" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• サービスアカウント</text>
<text x="228" y="213" fill="${TXT}" font-size="11" font-family="sans-serif">• 監視設定</text>
<text x="228" y="238" fill="${TXT}" font-size="11" font-family="sans-serif">• インシデント訓練</text>
<text x="228" y="275" fill="${A2}" font-size="11" font-family="sans-serif">期間: 2-3ヶ月</text>
<text x="421" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• 全社員へ展開</text>
<text x="421" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• ヘルプデスク対応</text>
<text x="421" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• 例外申請フロー</text>
<text x="421" y="213" fill="${TXT}" font-size="11" font-family="sans-serif">• ユーザー教育</text>
<text x="421" y="238" fill="${TXT}" font-size="11" font-family="sans-serif">• 定着化確認</text>
<text x="421" y="275" fill="${BLU}" font-size="11" font-family="sans-serif">期間: 3-6ヶ月</text>
<text x="614" y="138" fill="${TXT}" font-size="11" font-family="sans-serif">• FIDO2移行</text>
<text x="614" y="163" fill="${TXT}" font-size="11" font-family="sans-serif">• Adaptive MFA</text>
<text x="614" y="188" fill="${TXT}" font-size="11" font-family="sans-serif">• Passkeys対応</text>
<text x="614" y="213" fill="${TXT}" font-size="11" font-family="sans-serif">• ゼロトラスト統合</text>
<text x="614" y="238" fill="${TXT}" font-size="11" font-family="sans-serif">• 継続的改善</text>
<text x="614" y="275" fill="${GRN}" font-size="11" font-family="sans-serif">期間: 継続的</text>
<line x1="185" y1="205" x2="213" y2="205" stroke="${A1}" stroke-width="2"/>
<polygon points="213,205 201,199 201,211" fill="${A1}"/>
<line x1="378" y1="205" x2="406" y2="205" stroke="${A2}" stroke-width="2"/>
<polygon points="406,205 394,199 394,211" fill="${A2}"/>
<line x1="571" y1="205" x2="599" y2="205" stroke="${BLU}" stroke-width="2"/>
<polygon points="599,205 587,199 587,211" fill="${BLU}"/>
`);

// Slide 45: MFA security maturity model
const svg45 = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" text-anchor="middle" fill="${TXT}" font-size="15" font-weight="bold" font-family="sans-serif">MFAセキュリティ成熟度モデル</text>
<rect x="30" y="50" width="740" height="305" rx="10" fill="${BOX}" stroke="${A1}" stroke-width="1.5"/>
<rect x="50" y="70" width="680" height="55" rx="8" fill="${BG}" stroke="${A2}" stroke-width="1.5"/>
<text x="150" y="95" text-anchor="middle" fill="${A2}" font-size="13" font-weight="bold" font-family="sans-serif">Level 1</text>
<text x="150" y="113" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">初期</text>
<text x="510" y="95" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">一部システムでSMS MFA / パスワード+SMSのみ</text>
<rect x="50" y="140" width="680" height="55" rx="8" fill="${BG}" stroke="${A1}" stroke-width="1.5"/>
<text x="150" y="165" text-anchor="middle" fill="${A1}" font-size="13" font-weight="bold" font-family="sans-serif">Level 2</text>
<text x="150" y="183" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">管理</text>
<text x="510" y="165" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">特権アカウントにTOTP必須 / MFAポリシー文書化</text>
<rect x="50" y="210" width="680" height="55" rx="8" fill="${BG}" stroke="${BLU}" stroke-width="1.5"/>
<text x="150" y="235" text-anchor="middle" fill="${BLU}" font-size="13" font-weight="bold" font-family="sans-serif">Level 3</text>
<text x="150" y="253" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">定義</text>
<text x="510" y="235" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">全社員にMFA強制 / Adaptive MFA導入 / 監査証跡</text>
<rect x="50" y="280" width="680" height="55" rx="8" fill="${BG}" stroke="${GRN}" stroke-width="2"/>
<text x="150" y="305" text-anchor="middle" fill="${GRN}" font-size="13" font-weight="bold" font-family="sans-serif">Level 4</text>
<text x="150" y="323" text-anchor="middle" fill="${TXT}" font-size="11" font-family="sans-serif">最適化</text>
<text x="510" y="305" text-anchor="middle" fill="${TXT}" font-size="12" font-family="sans-serif">FIDO2/Passkeys全社展開 / ゼロトラスト統合 / 継続的改善</text>
<text x="400" y="375" text-anchor="middle" fill="${A1}" font-size="12" font-family="sans-serif">ISMS目標: Level 3以上 / 高セキュリティ環境: Level 4</text>
`);

const svgMap: Record<number, string> = {
	4: svg4,
	6: svg6,
	9: svg9,
	17: svg17,
	22: svg22,
	26: svg26,
	30: svg30,
	37: svg37,
	39: svg39,
	45: svg45,
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
