---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "MFA完全ガイド — ISMSの観点から"
footer: "© 2026 Security Workshop"
style: |
  /* ── Overflow prevention ──────────────────────────────── */
    section { overflow: hidden; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.7;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Images (all, not only SVG) ───────────────────────── */
    section img:not([src$=".svg"]) {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    section svg {
      max-height: 70vh;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    section img[src$=".svg"] {
      max-height: 70vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  
    /* ── Code blocks ──────────────────────────────────────── */
    section pre { overflow: hidden; }
    section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }
  
    /* ── Tables ───────────────────────────────────────────── */
    section table {
      font-size: 0.78em;
      width: 100%;
      overflow: hidden;
      word-break: break-word;
      border-collapse: collapse;
    }
    section th, section td {
      padding: 0.35em 0.6em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
  
    /* ── Subtitle / BLUF callout (blockquote) ─────────────── */
    section blockquote {
      font-size: 0.88em;
      line-height: 1.55;
      padding: 0.25em 0.8em;
      margin: 0.15em 0 0.35em;
      opacity: 0.88;
      overflow-wrap: break-word;
    }
    section blockquote p { margin: 0; }
  
  section {
    font-size: 1.0em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section h1 {
    font-size: 1.6em;
  }
  section ul {
    margin-top: 0.3em;
  }
  
---

<!-- _class: lead -->
# MFA完全ガイド — ISMSの観点から

- 多要素認証の仕組みから実装・ISMS要件まで徹底解説
- 対象: セキュリティ担当者・ISMS管理者
- 2026年2月


---

# 本日のアジェンダ

- **Sec.1** なぜ今MFAなのか — 認証侵害の現状と統計
- **Sec.2** MFA技術種別・詳細比較（7方式）
- **Sec.3** ISMS / ISO 27001:2022 要件マッピング
- **Sec.4** 攻撃パターン & バイパス事例（実例つき）
- **Sec.5** MFA導入・実践ガイドライン
- **まとめ** キーテイクアウェイ & 参考文献


---

<!-- _class: lead -->
# Sec.1 — なぜ今MFAなのか

- 認証侵害の現状と多要素認証の必要性


---

# 認証侵害の現状と統計（2024）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">認証侵害の現状と統計（2024）</text>
<rect x="30" y="50" width="220" height="120" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/>
<text x="140" y="82" text-anchor="middle" fill="#e91e63" font-size="28" font-weight="bold" font-family="sans-serif">81%</text>
<text x="140" y="110" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">セキュリティ侵害の</text>
<text x="140" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">原因はパスワード</text>
<text x="140" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Verizon DBIR 2024</text>
<rect x="290" y="50" width="220" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
<text x="400" y="82" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold" font-family="sans-serif">99.9%</text>
<text x="400" y="110" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">MFAで防げる</text>
<text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">アカウント侵害</text>
<text x="400" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Microsoft 調査</text>
<rect x="550" y="50" width="220" height="120" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2.5"/>
<text x="660" y="82" text-anchor="middle" fill="#4caf50" font-size="28" font-weight="bold" font-family="sans-serif">50倍</text>
<text x="660" y="110" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">MFAなしはありより</text>
<text x="660" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">侵害されやすい</text>
<text x="660" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Google 調査</text>
<rect x="30" y="200" width="740" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="228" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">主な侵害ベクター (2024)</text>
<text x="60" y="260" fill="#e91e63" font-size="13" font-family="sans-serif">1.</text>
<text x="80" y="260" fill="#ffffff" font-size="12" font-family="sans-serif">フィッシング攻撃 (AiTM含む) — MFAコードも盗取可能</text>
<text x="60" y="290" fill="#e91e63" font-size="13" font-family="sans-serif">2.</text>
<text x="80" y="290" fill="#ffffff" font-size="12" font-family="sans-serif">クレデンシャルスタッフィング — 流出DBを悪用</text>
<text x="60" y="320" fill="#e91e63" font-size="13" font-family="sans-serif">3.</text>
<text x="80" y="320" fill="#ffffff" font-size="12" font-family="sans-serif">ブルートフォース / パスワードスプレー攻撃</text>
<text x="400" y="355" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">対策: FIDO2/Passkeys でフィッシング耐性を確保</text></svg>
- **80%以上** のデータ侵害はパスワード関連（Verizon DBIR 2024）
- **MFAなし** のアカウントは侵害リスクが 99.9% 高い（Microsoft調査）
- フィッシング攻撃は前年比 **+60%** 増加（APWG 2024）
- ランサムウェア侵入経路 第1位: 盗まれた認証情報
- **日本**: 不正アクセス被害の 63% がパスワードリスト攻撃（警察庁 2023）
- MFA導入だけでアカウント侵害を **99.9% ブロック** できる（Microsoft推計）


---

# 認証の3要素

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">認証の3要素</text>
<polygon points="400,45 550,320 250,320" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<polygon points="400,75 520,290 280,290" fill="#1a1a2e" stroke="none"/>
<polygon points="400,75 480,240 320,240" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
<polygon points="400,105 440,200 360,200" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="165" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">Something</text>
<text x="400" y="185" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">You Are</text>
<text x="400" y="225" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Something You Have</text>
<text x="400" y="270" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Something You Know</text>
<text x="400" y="355" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">生体認証 (指紋/顔)</text>
<text x="400" y="340" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">→ 所持認証 (TOTP/FIDO2)</text>
<rect x="530" y="155" width="230" height="30" rx="5" fill="#16213e" stroke="#4caf50" stroke-width="1"/>
<text x="645" y="175" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">最も強力: フィッシング耐性</text>
<rect x="570" y="220" width="200" height="30" rx="5" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
<text x="670" y="240" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">中程度: OTP/スマートカード</text>
<rect x="590" y="280" width="180" height="30" rx="5" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="680" y="300" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">最も弱い: パスワード単体</text>
<line x1="530" y1="170" x2="430" y2="170" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="570" y1="235" x2="420" y2="235" stroke="#e91e63" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="590" y1="295" x2="410" y2="295" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/>
</svg>
![w:900 center](assets/auth-factors.svg)


---

# パスワード単体が抱えるリスク

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">パスワード単体が抱えるリスク</text>
<rect x="20" y="50" width="230" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="285" y="50" width="230" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="550" y="50" width="230" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="135" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">推測・総当たり</text>
<text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">フィッシング</text>
<text x="665" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">リスト攻撃</text>
<text x="35" y="108" fill="#ffffff" font-size="12" font-family="sans-serif">短・単純パスワードは</text>
<text x="35" y="133" fill="#ffffff" font-size="12" font-family="sans-serif">数秒〜数時間で解読</text>
<text x="35" y="160" fill="#e91e63" font-size="11" font-family="sans-serif">7文字英数字: 7分</text>
<text x="300" y="108" fill="#ffffff" font-size="12" font-family="sans-serif">偽サイトで入力させ</text>
<text x="300" y="133" fill="#ffffff" font-size="12" font-family="sans-serif">パスワードを盗取</text>
<text x="300" y="160" fill="#e91e63" font-size="11" font-family="sans-serif">検知困難な手法</text>
<text x="565" y="108" fill="#ffffff" font-size="12" font-family="sans-serif">流出DBから取得した</text>
<text x="565" y="133" fill="#ffffff" font-size="12" font-family="sans-serif">ID/Passで大量試行</text>
<text x="565" y="160" fill="#e91e63" font-size="11" font-family="sans-serif">同一PW使い回しで危険</text>
<rect x="20" y="210" width="760" height="150" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="238" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">MFAで防御できる理由</text>
<text x="45" y="268" fill="#4caf50" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="268" fill="#ffffff" font-size="12" font-family="sans-serif">パスワード漏洩しても第二要素なしでは認証不可</text>
<text x="45" y="298" fill="#4caf50" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="298" fill="#ffffff" font-size="12" font-family="sans-serif">FIDO2は物理デバイス + 生体認証で最強防御</text>
<text x="45" y="328" fill="#4caf50" font-size="13" font-family="sans-serif">✓</text>
<text x="65" y="328" fill="#ffffff" font-size="12" font-family="sans-serif">推測・総当たりは第二要素で無力化</text></svg>
![w:900 center](assets/password-limits.svg)


---

# MFAの定義と原則

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">MFAの定義と原則</text>
<rect x="20" y="50" width="760" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="82" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Multi-Factor Authentication</text>
<text x="400" y="112" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">2つ以上の異なるカテゴリの認証要素を組み合わせて本人確認を行う方式</text>
<rect x="30" y="155" width="220" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="290" y="155" width="220" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="550" y="155" width="220" height="90" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="140" y="182" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Factor 1</text>
<text x="400" y="182" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Factor 2</text>
<text x="660" y="182" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Factor 3 (オプション)</text>
<text x="140" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Knowledge</text>
<text x="400" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Possession</text>
<text x="660" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Inherence</text>
<text x="140" y="234" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">パスワード / PIN</text>
<text x="400" y="234" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">TOTP / FIDO2 / SMS</text>
<text x="660" y="234" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">生体認証</text>
<text x="255" y="200" text-anchor="middle" fill="#ffffff" font-size="20" font-family="sans-serif">+</text>
<text x="515" y="200" text-anchor="middle" fill="#ffffff" font-size="20" font-family="sans-serif">+</text>
<rect x="30" y="275" width="740" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
<text x="400" y="300" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">重要: 同一カテゴリの2要素はMFAではない</text>
<text x="400" y="325" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">例: パスワード + 秘密の質問 = 両方 Knowledge = MFA NOT OK</text>
</svg>
- **多要素認証（MFA）**: 2種類以上の**異なるカテゴリ**の認証要素を組み合わせる認証方式
- **2FA（二要素認証）** はMFAの最も一般的な実装形態
- 同カテゴリの組合せ（パスワード + PIN）は **SFA（単要素認証）** のまま
- **ステップアップ認証**: リスクに応じて追加要素を動的要求するアダプティブMFA
- ISO27001:2022 附属書A 8.5「セキュアな認証」— MFAを**明示的に要求**
- NIST SP 800-63B — 保証レベル（AAL1/2/3）によりMFA方式の強度を規定


---

# MFAの発展史

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="16" fill="#f9a825" text-anchor="middle" font-weight="bold">MFAの発展史</text>
<line x1="60" y1="190" x2="740" y2="190" stroke="#f9a825" stroke-width="2"/>
<polygon points="736,184 752,190 736,196" fill="#f9a825"/>
<circle cx="70" cy="190" r="6" fill="#f9a825"/>
<line x1="70" y1="130" x2="70" y2="190" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="70" y="100" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">1990s</text>
<text x="70" y="113" font-size="9" fill="#ffffff" text-anchor="middle">ハードウェア</text><text x="70" y="125" font-size="9" fill="#ffffff" text-anchor="middle">トークン</text>
<text x="70" y="141" font-size="8" fill="#aaa" text-anchor="middle">RSA SecurID</text><circle cx="190" cy="190" r="6" fill="#f9a825"/>
<line x1="190" y1="190" x2="190" y2="220" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="190" y="220" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">2000s</text>
<text x="190" y="233" font-size="9" fill="#ffffff" text-anchor="middle">SMS OTP</text>
<text x="190" y="249" font-size="8" fill="#aaa" text-anchor="middle">モバイル普及</text><circle cx="320" cy="190" r="6" fill="#f9a825"/>
<line x1="320" y1="130" x2="320" y2="190" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="320" y="100" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">2010</text>
<text x="320" y="113" font-size="9" fill="#ffffff" text-anchor="middle">TOTP</text><text x="320" y="125" font-size="9" fill="#ffffff" text-anchor="middle">(RFC 6238)</text>
<text x="320" y="141" font-size="8" fill="#aaa" text-anchor="middle">Google Auth</text><circle cx="450" cy="190" r="6" fill="#f9a825"/>
<line x1="450" y1="190" x2="450" y2="220" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="450" y="220" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">2012</text>
<text x="450" y="233" font-size="9" fill="#ffffff" text-anchor="middle">FIDO U2F</text>
<text x="450" y="249" font-size="8" fill="#aaa" text-anchor="middle">Google主導</text><circle cx="570" cy="190" r="6" fill="#f9a825"/>
<line x1="570" y1="130" x2="570" y2="190" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="570" y="100" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">2018</text>
<text x="570" y="113" font-size="9" fill="#ffffff" text-anchor="middle">FIDO2</text><text x="570" y="125" font-size="9" fill="#ffffff" text-anchor="middle">WebAuthn</text>
<text x="570" y="141" font-size="8" fill="#aaa" text-anchor="middle">W3C標準化</text><circle cx="680" cy="190" r="6" fill="#f9a825"/>
<line x1="680" y1="190" x2="680" y2="220" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="680" y="220" font-size="9" fill="#f9a825" text-anchor="middle" font-weight="bold">2022+</text>
<text x="680" y="233" font-size="9" fill="#ffffff" text-anchor="middle">Passkeys</text>
<text x="680" y="249" font-size="8" fill="#aaa" text-anchor="middle">Apple/Google
/Microsoft</text>
<rect x="30" y="310" width="740" height="60" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="400" y="332" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">フィッシング耐性の進化</text>
<text x="400" y="352" font-size="11" fill="#ffffff" text-anchor="middle">SMS/TOTP → フィッシングで傍受可能 → FIDO2/Passkeys → フィッシング不可能（秘密鍵はデバイスから出ない）</text></svg>
![w:900 center](assets/mfa-history.svg)


---

<!-- _class: lead -->
# Sec.2 — MFA技術種別・詳細比較

- 各認証方式の仕組みとセキュリティ特性を理解する


---

# MFA方式の全体分類

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">MFA方式の全体分類</text>
<rect x="20" y="50" width="230" height="305" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="285" y="50" width="230" height="305" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="550" y="50" width="230" height="305" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="135" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">OTP系</text>
<text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">Push / App系</text>
<text x="665" y="78" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">ハードウェア系</text>
<text x="35" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• SMS OTP</text>
<text x="35" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• 音声 OTP</text>
<text x="35" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• TOTP (RFC 6238)</text>
<text x="35" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• HOTP (RFC 4226)</text>
<text x="35" y="240" fill="#e91e63" font-size="12" font-family="sans-serif">セキュリティ: 中</text>
<text x="35" y="265" fill="#e91e63" font-size="12" font-family="sans-serif">SIM Swap脆弱性</text>
<text x="35" y="290" fill="#f9a825" font-size="12" font-family="sans-serif">導入: 低コスト</text>
<text x="300" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• Authenticator App</text>
<text x="300" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• Push通知 (Okta等)</text>
<text x="300" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• Number Matching</text>
<text x="300" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• Passwordless Push</text>
<text x="300" y="240" fill="#f9a825" font-size="12" font-family="sans-serif">セキュリティ: 中〜高</text>
<text x="300" y="265" fill="#e91e63" font-size="12" font-family="sans-serif">Push疲労攻撃に注意</text>
<text x="300" y="290" fill="#f9a825" font-size="12" font-family="sans-serif">Number Matchingで対策</text>
<text x="565" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• FIDO2 / WebAuthn</text>
<text x="565" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• Passkeys</text>
<text x="565" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• YubiKey等セキュリティキー</text>
<text x="565" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• スマートカード</text>
<text x="565" y="240" fill="#4caf50" font-size="12" font-family="sans-serif">セキュリティ: 最高</text>
<text x="565" y="265" fill="#4caf50" font-size="12" font-family="sans-serif">フィッシング耐性あり</text>
<text x="565" y="290" fill="#e91e63" font-size="12" font-family="sans-serif">コスト: 高め</text>
</svg>
![w:900 center](assets/mfa-methods.svg)


---

# SMS / 電話 OTP

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">SMS / 電話 OTP</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">仕組みと特徴</text>
<text x="595" y="78" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">リスクと限界</text>
<text x="45" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• 認証時に電話番号にOTP送信</text>
<text x="45" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• 通常6桁・有効期間5〜10分</text>
<text x="45" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• 追加アプリ不要で導入容易</text>
<text x="45" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• 既存電話番号をそのまま利用</text>
<text x="45" y="250" fill="#f9a825" font-size="12" font-family="sans-serif">メリット: 低コスト・広い普及率</text>
<text x="45" y="278" fill="#f9a825" font-size="12" font-family="sans-serif">ユーザー: 追加アプリなし</text>
<text x="435" y="112" fill="#e91e63" font-size="12" font-family="sans-serif">• SIMスワッピング攻撃</text>
<text x="435" y="140" fill="#e91e63" font-size="12" font-family="sans-serif">• SS7プロトコル脆弱性</text>
<text x="435" y="168" fill="#e91e63" font-size="12" font-family="sans-serif">• AiTMフィッシングで盗取可能</text>
<text x="435" y="196" fill="#e91e63" font-size="12" font-family="sans-serif">• 通信費・遅延の問題</text>
<text x="435" y="250" fill="#4caf50" font-size="12" font-family="sans-serif">NIST SP 800-63B:</text>
<text x="435" y="278" fill="#ffffff" font-size="12" font-family="sans-serif">SMS OTPは「推奨しない」(RESTRICTED)</text>
<text x="400" y="365" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">導入しやすいが中リスク環境のみ / 高リスクはTOTP以上へ</text></svg>
- **仕組み**: SMSまたは音声通話でワンタイムパスワード（6桁）を送信
- **長所**: 追加アプリ不要・なじみがある・導入が容易・低コスト
- **短所**: SIMスワッピング / SS7攻撃に脆弱、電波不要環境で使用不可、AiTMに無防備
- **NIST評価**: SP 800-63B で **AAL1（RESTRICTED）**— 高セキュリティ用途に非推奨
- **廃止動向**: NIST 2016年にSMS OTPを「制限付き（RESTRICTED）」に分類して以降、廃止の流れ
- **用途例**: 一般消費者向け低リスクサービス限定。社内システムへの使用は避けるべき


---

# TOTP（Time-based OTP） — RFC 6238

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">TOTP（Time-based OTP） — RFC 6238</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">アルゴリズム</text>
<text x="595" y="78" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">特徴と注意点</text>
<text x="45" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">TOTP = HMAC-SHA1(secret, T)</text>
<text x="45" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">T = floor(現在時刻 / 30秒)</text>
<text x="45" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">→ 30秒ごとに変わる6桁コード</text>
<text x="45" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">共有シークレット (QRコード登録)</text>
<text x="45" y="228" fill="#ffffff" font-size="12" font-family="sans-serif">対応アプリ: Google Authenticator</text>
<text x="45" y="254" fill="#ffffff" font-size="12" font-family="sans-serif">Authy / Microsoft Authenticator</text>
<text x="45" y="290" fill="#f9a825" font-size="12" font-family="sans-serif">オフラインで動作可能</text>
<text x="435" y="112" fill="#4caf50" font-size="12" font-family="sans-serif">• SMS OTPより安全</text>
<text x="435" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• SIMスワッピングに強い</text>
<text x="435" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• アプリのみで完結</text>
<text x="435" y="210" fill="#e91e63" font-size="12" font-family="sans-serif">注意: フィッシング耐性なし</text>
<text x="435" y="238" fill="#e91e63" font-size="12" font-family="sans-serif">リアルタイム攻撃で盗取可能</text>
<text x="435" y="266" fill="#e91e63" font-size="12" font-family="sans-serif">端末紛失 → リカバリー必要</text>
<text x="435" y="290" fill="#f9a825" font-size="12" font-family="sans-serif">コスト低 / SMSより上位</text></svg>
- **仕組み**: 共有秘密鍵 + 現在時刻（30秒窓）から HMAC-SHA1 で6桁のコードを生成
- **標準規格**: RFC 6238（TOTP）/ RFC 4226（HOTP）— 完全オープンスタンダード
- **実装例**: Google Authenticator, Microsoft Authenticator, Authy, 1Password, Bitwarden
- **長所**: オフライン動作・オープン標準・追加コスト低・幅広く対応
- **短所**: AiTMフィッシングに脆弱（リアルタイム転送可能）・秘密鍵漏洩リスク
- **秘密鍵管理**: QRコード初回登録時のスクリーンショット・通信路漏洩に注意


---

# PUSH通知認証

- **仕組み**: 認証リクエストをスマートフォンアプリにプッシュ送信し、ユーザーが承認/拒否
- **実装例**: Microsoft Authenticator, Duo Security, Okta Verify, PingID
- **進化型**: 番号照合（Number Matching）でPush Bombing攻撃を防御
- **長所**: UXが優秀（タップ1回）・追加コンテキスト（IP/場所）表示が可能
- **短所**: インターネット接続が必要・Push Bombing攻撃に脆弱（番号照合なしの場合）
- **ISMS推奨**: 番号照合 + 位置情報表示を必須設定にすること


---

# FIDO2 / WebAuthn — フィッシング耐性MFA

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">FIDO2 / WebAuthn — フィッシング耐性MFA</text>
<rect x="30" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2.5"/>
<rect x="420" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="205" y="78" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">仕組み</text>
<text x="595" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">なぜフィッシング耐性があるか</text>
<text x="45" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• 公開鍵暗号方式 (ECDSA)</text>
<text x="45" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• 秘密鍵はデバイス内のみ</text>
<text x="45" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• 生体認証 or PINでローカル解錠</text>
<text x="45" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• サーバーはチャレンジを送信</text>
<text x="45" y="224" fill="#ffffff" font-size="12" font-family="sans-serif">• デバイスが秘密鍵で署名応答</text>
<text x="45" y="265" fill="#4caf50" font-size="12" font-family="sans-serif">対応: YubiKey / TouchID / FaceID</text>
<text x="45" y="290" fill="#4caf50" font-size="12" font-family="sans-serif">Windows Hello / Android</text>
<text x="435" y="112" fill="#ffffff" font-size="12" font-family="sans-serif">• チャレンジにOrigin (domain) 含む</text>
<text x="435" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">• 偽ドメインでは署名が不一致</text>
<text x="435" y="168" fill="#ffffff" font-size="12" font-family="sans-serif">• 秘密鍵はデバイス外に出ない</text>
<text x="435" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">• AiTMフィッシングでも無効</text>
<text x="435" y="240" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">唯一のフィッシング耐性MFA</text>
<text x="435" y="270" fill="#ffffff" font-size="12" font-family="sans-serif">NIST AAL3 (最高保証レベル)</text></svg>
- **仕組み**: 公開鍵暗号方式。デバイス上で鍵ペア生成、サーバーは公開鍵のみ保存
- **標準**: FIDO Alliance + W3C WebAuthn（Level 3）/ CTAP2.1
- **デバイス**: YubiKey, Google Titan Key, Windows Hello などのハードウェアセキュリティキー
- **フィッシング耐性**: 鍵はオリジン（ドメイン）にバインド → 偽サイトでは絶対に使用不能
- **NIST AAL3**: 物理セキュリティキーで最高保証レベルを達成。政府機関・金融に推奨
- **採用実績**: Google（社内全社員）, Microsoft, GitHub, 日本政府（デジタル庁）


---

# Passkeys — パスワードレス認証の仕組み

![w:900 center](assets/passkeys.svg)


---

# バイオメトリクス認証

- **種別**: 指紋・顔・虹彩・声紋・静脈パターン（各方式で精度が異なる）
- **FAR/FRR**: 誤受入率（FAR）と誤拒否率（FRR）はトレードオフ — 用途によりチューニング
- **FIDO2統合**: 生体認証はデバイスローカルで処理 → バイオデータがサーバーに送信されない
- **個人情報保護**: 生体情報は **要配慮個人情報** — GDPR/個人情報保護法で厳格管理が必要
- **ISMS観点**: 附属書A 8.5 — 生体認証システムの精度要件・データ保存場所・アクセス制御を文書化
- **限界**: 顔・指紋の複製リスク・加齢/怪我による誤拒否・センサー品質依存


---

# リスクベース認証（Adaptive MFA）

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">リスクベース認証（Adaptive MFA）</text>
<rect x="50" y="50" width="700" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="400" y="72" font-size="12" fill="#ffffff" text-anchor="middle">アクセス時のリスクシグナルをリアルタイム評価 → MFA要否・強度を動的に決定</text>
<text x="400" y="88" font-size="11" fill="#aaa" text-anchor="middle">ユーザー体験を損なわず、高リスク時のみ追加認証を要求</text>
<text x="200" y="125" font-size="12" fill="#2196f3" text-anchor="middle" font-weight="bold">リスクシグナル</text>
<text x="590" y="125" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">判定結果</text>
<line x1="390" y1="110" x2="390" y2="300" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
<rect x="50" y="135" width="330" height="30" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="60" y="155" font-size="10" fill="#2196f3" font-weight="bold">デバイス情報</text>
<text x="190" y="155" font-size="10" fill="#ffffff">登録済み/新規/管理対象外</text><rect x="50" y="175" width="330" height="30" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="60" y="195" font-size="10" fill="#2196f3" font-weight="bold">場所・IPアドレス</text>
<text x="190" y="195" font-size="10" fill="#ffffff">通常の場所/海外/Tor</text><rect x="50" y="215" width="330" height="30" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="60" y="235" font-size="10" fill="#2196f3" font-weight="bold">時刻・行動</text>
<text x="190" y="235" font-size="10" fill="#ffffff">業務時間内/深夜/異常なパターン</text><rect x="50" y="255" width="330" height="30" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="60" y="275" font-size="10" fill="#2196f3" font-weight="bold">リソース機密度</text>
<text x="190" y="275" font-size="10" fill="#ffffff">一般/機密/財務/顧客情報</text>
<rect x="410" y="135" width="340" height="30" rx="4" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="420" y="155" font-size="11" fill="#4caf50" font-weight="bold">リスク低</text>
<text x="510" y="155" font-size="10" fill="#ffffff">MFA不要 → 直接アクセス許可</text><rect x="410" y="175" width="340" height="30" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="420" y="195" font-size="11" fill="#f9a825" font-weight="bold">リスク中</text>
<text x="510" y="195" font-size="10" fill="#ffffff">TOTP/Push通知 → 認証後許可</text><rect x="410" y="215" width="340" height="30" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="420" y="235" font-size="11" fill="#e91e63" font-weight="bold">リスク高</text>
<text x="510" y="235" font-size="10" fill="#ffffff">FIDO2必須 → 管理者承認</text><rect x="410" y="255" width="340" height="30" rx="4" fill="#16213e" stroke="#880000" stroke-width="2"/>
<text x="420" y="275" font-size="11" fill="#880000" font-weight="bold">ブロック</text>
<text x="510" y="275" font-size="10" fill="#ffffff">アクセス拒否 → 調査</text>
<rect x="30" y="305" width="740" height="60" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1"/>
<text x="400" y="326" font-size="12" fill="#4caf50" text-anchor="middle" font-weight="bold">主要製品: Microsoft Entra ID (Conditional Access) / Okta Adaptive MFA / Duo Security</text>
<text x="400" y="345" font-size="11" fill="#ffffff" text-anchor="middle">機械学習でベースライン行動を学習 → 逸脱時に自動でMFA要求または接続ブロック</text></svg>
- **概念**: ユーザーの行動・環境リスクを動的評価し、要求する認証強度を自動変化
- **評価シグナル**: IP評判・デバイス登録状態・地理的異常・時間帯・行動バイオメトリクス
- **実装例**: Azure AD 条件付きアクセス, Okta ThreatInsight, Auth0 Risk Engine
- **ゼロトラスト連携**: 「決して信頼しない、常に検証する」原則を動的認証で実現
- **ISMS観点**: A.8.3「情報アクセスの制限」— 継続的検証による最小権限強化
- **課題**: 機械学習モデルの精度・誤検知によるユーザー体験悪化のバランス


---

# MFA方式 比較マトリクス

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFA方式 比較マトリクス</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="#f9a825" opacity="0.2"/>
<text x="100" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">方式</text>
<text x="250" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">セキュリティ</text>
<text x="390" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">UX</text>
<text x="520" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">フィッシング耐性</text>
<text x="670" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">コスト</text>
<text x="100" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">SMS OTP</text>
<text x="250" y="108" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">低</text>
<text x="390" y="108" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="108" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="108" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">TOTP</text>
<text x="250" y="142" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中</text>
<text x="390" y="142" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中</text>
<text x="520" y="142" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="142" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Push通知</text>
<text x="250" y="176" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中〜高</text>
<text x="390" y="176" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="176" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">なし</text>
<text x="670" y="176" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中</text>
<text x="100" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">FIDO2/WebAuthn</text>
<text x="250" y="210" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="210" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高</text>
<text x="520" y="210" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="210" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中〜高</text>
<text x="100" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Passkeys</text>
<text x="250" y="244" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="244" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">最高</text>
<text x="520" y="244" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="244" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低</text>
<text x="100" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">スマートカード</text>
<text x="250" y="278" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">最高</text>
<text x="390" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">中</text>
<text x="520" y="278" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">あり</text>
<text x="670" y="278" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="170" y1="45" x2="170" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="320" y1="45" x2="320" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="450" y1="45" x2="450" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="600" y1="45" x2="600" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="340" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">推奨: FIDO2/Passkeys → フィッシング耐性 × UX の両立</text>
</svg>
![w:900 center](assets/mfa-comparison.svg)


---

# ユースケース別 推奨MFA方式

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">ユースケース別 推奨MFA方式</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="#f9a825" opacity="0.2"/>
<text x="160" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ユースケース</text>
<text x="370" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">推奨MFA</text>
<text x="580" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">理由</text>
<text x="160" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">特権管理者アカウント</text>
<text x="370" y="108" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">FIDO2 / スマートカード</text>
<text x="580" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">フィッシング耐性必須</text>
<text x="160" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">一般社員 (社内システム)</text>
<text x="370" y="142" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">TOTP / Push通知</text>
<text x="580" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">UXと安全性のバランス</text>
<text x="160" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リモートワーカー</text>
<text x="370" y="176" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">FIDO2 / TOTP</text>
<text x="580" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">VPN + MFA必須</text>
<text x="160" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">顧客向けWebサービス</text>
<text x="370" y="210" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Passkeys / SMS OTP</text>
<text x="580" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">UX重視・段階的移行</text>
<text x="160" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">金融・医療システム</text>
<text x="370" y="244" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">FIDO2 必須</text>
<text x="580" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">規制要件・高リスク</text>
<text x="160" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">サービスアカウント</text>
<text x="370" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">mTLS / Workload ID</text>
<text x="580" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">M2M認証専用</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="270" y1="45" x2="270" y2="292" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="480" y1="45" x2="480" y2="292" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="340" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">原則: リスク評価に基づき最適な方式を選択</text></svg>
- **特権アカウント / 重要システム（AAL3）**: FIDO2セキュリティキー（YubiKey等）
- **社内業務システム / VPN（AAL2）**: Passkeys または PUSH通知（番号照合必須）
- **一般従業員 / リモートワーク（AAL2）**: TOTP認証アプリ または Passkeys
- **外部委託先・ベンダー（AAL2）**: TOTP または 期限付きPUSH（ゲストポリシー）
- **消費者向けサービス（AAL1〜2）**: SMS OTP（基本）→ Passkeys移行ロードマップ
- **サービスアカウント / API**: FIDO2またはクライアント証明書（人間要素不要）


---

<!-- _class: lead -->
# Sec.3 — ISMS / ISO 27001 要件マッピング

- 規格要件と多要素認証の具体的な対応関係


---

# ISO27001:2022 — アクセス制御の要求

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">ISO 27001:2022 — アクセス制御とMFAの要求</text>
<rect x="30" y="50" width="360" height="125" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="210" y="70" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="bold">8.2 特権アクセス権の管理</text>
<text x="45" y="88" font-size="10" fill="#ffffff">• 特権アカウントの払い出しは厳格な承認プロセス</text><text x="45" y="110" font-size="10" fill="#ffffff">• 特権操作にはMFA必須（審査官が証跡を確認）</text><text x="45" y="132" font-size="10" fill="#ffffff">• PAMツールによる操作記録・セッション録画</text><rect x="410" y="50" width="360" height="125" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="590" y="70" font-size="11" fill="#2196f3" text-anchor="middle" font-weight="bold">8.3 情報アクセス制限</text>
<text x="425" y="88" font-size="10" fill="#ffffff">• Need-to-Know: 最小権限の原則</text><text x="425" y="110" font-size="10" fill="#ffffff">• 定期的なアクセス権レビュー（四半期推奨）</text><text x="425" y="132" font-size="10" fill="#ffffff">• 高機密データへのアクセスはMFA強制</text><rect x="30" y="190" width="360" height="125" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="210" y="210" font-size="11" fill="#4caf50" text-anchor="middle" font-weight="bold">8.5 セキュアな認証</text>
<text x="45" y="228" font-size="10" fill="#ffffff">• 認証に関するすべての要件を文書化</text><text x="45" y="250" font-size="10" fill="#ffffff">• MFAポリシー: 誰に・どの条件で・どの方式を</text><text x="45" y="272" font-size="10" fill="#ffffff">• パスワードポリシーとMFAの組み合わせ方針</text><rect x="410" y="190" width="360" height="125" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="590" y="210" font-size="11" fill="#f9a825" text-anchor="middle" font-weight="bold">6.7 リモートワーク</text>
<text x="425" y="228" font-size="10" fill="#ffffff">• リモートアクセスには原則MFA必須</text><text x="425" y="250" font-size="10" fill="#ffffff">• VPN + MFA の組み合わせが一般的</text><text x="425" y="272" font-size="10" fill="#ffffff">• 管理対象外デバイスの制御方針</text>
<rect x="100" y="333" width="600" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="351" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">ISO 27001 審査でのMFA確認ポイント</text>
<text x="400" y="367" font-size="10" fill="#ffffff" text-anchor="middle">①方針文書の存在 ②適用範囲の明確化 ③実施証跡（ログ）④例外管理のプロセス</text></svg>
- **ISO/IEC 27001:2022**: 2022年版で大幅改訂 → 114→93コントロール（11の新規追加）
- **8.2 特権アクセス権限管理**: 管理者・特権アカウントへのMFA強制を**事実上要求**
- **8.3 情報アクセスの制限**: 最小権限原則 + 強化認証の組合せ要求
- **8.5 セキュアな認証**: **MFAを明示的に言及**（2013年版にはなかった重要強化点）
- **5.17 認証情報の管理**: パスワードポリシー + 追加認証要素の管理手順策定
- **8.15 ログ管理**: MFA認証イベントのログ記録・保護・保管期間の設定要求


---

# 附属書A — MFA関連コントロール一覧

- **5.15 アクセス制御**: ビジネス・セキュリティ要件に基づくアクセス制御ポリシー策定
- **5.16 識別情報管理**: 一意ID + 認証情報の割当・管理手順の確立
- **5.17 認証情報管理**: パスワード規則・認証情報の秘密保持・MFA登録手順
- **8.2 特権アクセス権限管理**: 特権アクセスへのMFA要件（推奨→必須化の傾向）
- **8.5 セキュアな認証**: MFAを明示・技術的実装要件・認証失敗対応規定
- **8.18 特権ユーティリティプログラム使用**: 管理ツールへのアクセス制御・MFA要件


---

# ISO27001 × MFA 要件マッピング

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">ISO27001 × MFA 要件マッピング</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="#f9a825" opacity="0.2"/>
<text x="155" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ISO27001管理策</text>
<text x="420" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">MFA要件</text>
<text x="650" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">対応方式</text>
<text x="155" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">8.2 特権アクセス管理</text>
<text x="420" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">管理者は必須MFA</text>
<text x="650" y="108" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">FIDO2 / スマートカード</text>
<text x="155" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">8.3 情報アクセス制限</text>
<text x="420" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">機密システムへのMFA</text>
<text x="650" y="142" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">TOTP / Push通知</text>
<text x="155" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">8.5 安全な認証</text>
<text x="420" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リスクに応じたMFA強度</text>
<text x="650" y="176" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Adaptive MFA</text>
<text x="155" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">5.14 情報伝達</text>
<text x="420" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">外部アクセスへのMFA</text>
<text x="650" y="210" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">VPN + MFA 必須</text>
<text x="155" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">8.18 特権ユーティリティ</text>
<text x="420" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">特権ツール使用時MFA</text>
<text x="650" y="244" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">PAM + MFA 統合</text>
<text x="155" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">8.6 キャパシティ管理</text>
<text x="420" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">クラウドAPIへのMFA</text>
<text x="650" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">サービスアカウント保護</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="258" x2="790" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="270" y1="45" x2="270" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="560" y1="45" x2="560" y2="290" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">ISO27001:2022 Annex A — MFA要件はリスクベースで段階的に実装</text>
</svg>
![w:900 center](assets/iso27001-mapping.svg)


---

# NIST SP 800-63B — AAL 保証レベル

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">NIST SP 800-63B — AAL 保証レベル</text>
<rect x="20" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#ffffff" stroke-width="1.5"/>
<rect x="285" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="550" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2.5"/>
<text x="135" y="78" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">AAL1</text>
<text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">AAL2</text>
<text x="665" y="78" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">AAL3</text>
<text x="135" y="105" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">基本認証</text>
<text x="400" y="105" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">強い認証</text>
<text x="665" y="105" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">最高保証</text>
<text x="35" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• パスワードのみ</text>
<text x="35" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• ソフトウェアOTP</text>
<text x="35" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• フィッシング耐性なし</text>
<text x="35" y="240" fill="#ffffff" font-size="11" font-family="sans-serif">用途: 低リスクサービス</text>
<text x="300" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• MFA必須</text>
<text x="300" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• TOTP / Push通知</text>
<text x="300" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• ソフトウェアFIDO2</text>
<text x="300" y="240" fill="#f9a825" font-size="11" font-family="sans-serif">用途: 一般業務システム</text>
<text x="300" y="265" fill="#f9a825" font-size="11" font-family="sans-serif">多くの場合の推奨レベル</text>
<text x="565" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• フィッシング耐性MFA必須</text>
<text x="565" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• FIDO2 (ハードウェア)</text>
<text x="565" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• スマートカード</text>
<text x="565" y="213" fill="#ffffff" font-size="11" font-family="sans-serif">• 物理的存在確認</text>
<text x="565" y="240" fill="#4caf50" font-size="11" font-family="sans-serif">用途: 金融・医療・政府</text>
<text x="565" y="265" fill="#4caf50" font-size="11" font-family="sans-serif">最高セキュリティ要件</text>
<text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">ISMSリスク評価に基づき適切なAALレベルを選択</text></svg>
![w:900 center](assets/nist-aal.svg)


---

# 関連法規制 / フレームワークとの対応

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">関連法規制・フレームワークとMFAの対応</text>
<text x="100" y="60" font-size="12" fill="#f9a825" text-anchor="middle">法令/規制</text>
<text x="310" y="60" font-size="12" fill="#f9a825" text-anchor="middle">MFA要件</text>
<text x="580" y="60" font-size="12" fill="#f9a825" text-anchor="middle">詳細</text>
<line x1="30" y1="65" x2="770" y2="65" stroke="#444" stroke-width="1"/>
<rect x="30" y="72" width="740" height="42" rx="3" fill="#0d0d1a"/>
<text x="100" y="88" font-size="10" fill="#ffffff" text-anchor="middle">個人情報保護法</text><text x="100" y="102" font-size="10" fill="#ffffff" text-anchor="middle">(日本)</text>
<text x="310" y="93" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">推奨/一部必須</text>
<text x="400" y="93" font-size="9" fill="#ffffff">要配慮個人情報取扱システムへのアクセスに強い認証推奨</text><rect x="30" y="120" width="740" height="42" rx="3" fill="#16213e"/>
<text x="100" y="136" font-size="10" fill="#ffffff" text-anchor="middle">NIST SP 800-63B</text>
<text x="310" y="141" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">AAL2+で必須</text>
<text x="400" y="141" font-size="9" fill="#ffffff">AAL2: MFA必須 / AAL3: ハードウェアMFA+生体</text><rect x="30" y="168" width="740" height="42" rx="3" fill="#0d0d1a"/>
<text x="100" y="184" font-size="10" fill="#ffffff" text-anchor="middle">PCI DSS v4.0</text>
<text x="310" y="189" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">必須</text>
<text x="400" y="189" font-size="9" fill="#ffffff">カード保有者データ環境へのアクセスは全ユーザーMFA必須</text><rect x="30" y="216" width="740" height="42" rx="3" fill="#16213e"/>
<text x="100" y="232" font-size="10" fill="#ffffff" text-anchor="middle">SOC 2 Type II</text>
<text x="310" y="237" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">推奨/監査対象</text>
<text x="400" y="237" font-size="9" fill="#ffffff">Trust Services Criteria CC6.1: 論理アクセス制御</text><rect x="30" y="264" width="740" height="42" rx="3" fill="#0d0d1a"/>
<text x="100" y="280" font-size="10" fill="#ffffff" text-anchor="middle">HIPAA</text>
<text x="310" y="285" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">推奨</text>
<text x="400" y="285" font-size="9" fill="#ffffff">ePHIへのアクセス管理の一環として強い認証推奨</text><rect x="30" y="312" width="740" height="42" rx="3" fill="#16213e"/>
<text x="100" y="328" font-size="10" fill="#ffffff" text-anchor="middle">金融庁ガイドライン</text>
<text x="310" y="333" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">必須傾向</text>
<text x="400" y="333" font-size="9" fill="#ffffff">インターネットバンキング等への不正ログイン対策</text></svg>
- **GDPR（EU一般データ保護規則）**: Art.32 — 適切な技術的措置（MFAを含む暗号化・アクセス制御）
- **個人情報保護法（日本）**: 安全管理措置 — 不正アクセス防止のためのMFA的措置を要求
- **PCI DSS v4.0**: Req.8.4 — カード会員データ環境へのすべてのアクセスに**MFA必須**
- **SOC 2 Type II**: CC6.1/CC6.2 — 論理アクセス制御の有効性評価にMFAが含まれる
- **金融庁サイバーセキュリティガイドライン**: 重要システムへのMFA必須化を推奨
- **NISC クラウドセキュリティガイド**: 重要業務システムへのMFA導入を要求（2023年版）


---

# ゼロトラストアーキテクチャとMFA

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">ゼロトラストアーキテクチャとMFA</text>
<rect x="200" y="50" width="400" height="65" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Never Trust, Always Verify</text>
<text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">すべてのアクセスを継続的に検証する</text>
<line x1="300" y1="115" x2="200" y2="165" stroke="#f9a825" stroke-width="2"/>
<polygon points="200,165 205,152 217,158" fill="#f9a825"/>
<line x1="400" y1="115" x2="400" y2="165" stroke="#f9a825" stroke-width="2"/>
<polygon points="400,165 394,152 406,152" fill="#f9a825"/>
<line x1="500" y1="115" x2="600" y2="165" stroke="#f9a825" stroke-width="2"/>
<polygon points="600,165 590,153 602,152" fill="#f9a825"/>
<rect x="100" y="168" width="180" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="190" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">Identity Verify</text>
<text x="190" y="218" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">MFA必須 / 継続認証</text>
<rect x="310" y="168" width="180" height="70" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="195" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold" font-family="sans-serif">Device Trust</text>
<text x="400" y="218" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">デバイスコンプライアンス</text>
<rect x="520" y="168" width="180" height="70" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="610" y="195" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold" font-family="sans-serif">Least Privilege</text>
<text x="610" y="218" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">最小権限アクセス</text>
<rect x="30" y="268" width="740" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="295" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">MFAのゼロトラスト実装</text>
<text x="50" y="322" fill="#ffffff" font-size="12" font-family="sans-serif">• Conditional Access: リスクレベルに応じてMFA強度を動的に変更</text>
<text x="50" y="348" fill="#ffffff" font-size="12" font-family="sans-serif">• Continuous Verification: セッション中も定期的に再認証</text></svg>
![w:900 center](assets/zero-trust.svg)


---

# MFA導入のリスク評価プロセス（ISMS手順）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFA導入のリスク評価プロセス（ISMS手順）</text>
<rect x="30" y="55" width="160" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="110" y="87" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1. 資産特定</text>
<text x="110" y="110" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">システム・データの</text>
<text x="110" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">重要度評価</text>
<rect x="220" y="55" width="160" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="300" y="87" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">2. 脅威分析</text>
<text x="300" y="110" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">攻撃ベクター・</text>
<text x="300" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">脆弱性の把握</text>
<rect x="410" y="55" width="160" height="80" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="490" y="87" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold" font-family="sans-serif">3. リスク評価</text>
<text x="490" y="110" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">影響度×発生確率</text>
<text x="490" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">リスクレベル算出</text>
<rect x="600" y="55" width="160" height="80" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="680" y="87" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">4. MFA選定</text>
<text x="680" y="110" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">リスクに応じた</text>
<text x="680" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">方式の選択</text>
<line x1="190" y1="95" x2="220" y2="95" stroke="#f9a825" stroke-width="2"/>
<polygon points="220,95 208,89 208,101" fill="#f9a825"/>
<line x1="380" y1="95" x2="410" y2="95" stroke="#e91e63" stroke-width="2"/>
<polygon points="410,95 398,89 398,101" fill="#e91e63"/>
<line x1="570" y1="95" x2="600" y2="95" stroke="#2196f3" stroke-width="2"/>
<polygon points="600,95 588,89 588,101" fill="#2196f3"/>
<rect x="30" y="175" width="740" height="185" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="200" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">リスクレベル別MFA要件</text>
<text x="60" y="235" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">高リスク:</text>
<text x="200" y="235" fill="#ffffff" font-size="12" font-family="sans-serif">特権アカウント / 機密データ → FIDO2 / スマートカード必須</text>
<text x="60" y="270" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">中リスク:</text>
<text x="200" y="270" fill="#ffffff" font-size="12" font-family="sans-serif">一般業務システム / VPN → TOTP / Push通知</text>
<text x="60" y="305" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">低リスク:</text>
<text x="200" y="305" fill="#ffffff" font-size="12" font-family="sans-serif">社内のみ低感度 → SMS OTP でも可 (段階的強化)</text>
<text x="400" y="345" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ISMS原則: リスクアセスメント結果に基づく適切な管理策の選択</text>
</svg>
- **Step 1**: 保護対象の特定 — 情報資産・システム一覧（ISMS資産管理台帳から抽出）
- **Step 2**: 脅威・脆弱性評価 — パスワードリスト攻撃・内部不正のリスクスコアリング
- **Step 3**: 影響度評価 — 侵害時の業務影響・法的リスク・レピュテーション損害の定量化
- **Step 4**: MFA方式のリスクプロファイル評価 — 各方式の残存リスク・コスト比較
- **Step 5**: 受容リスクの定義と経営承認 — ISMSリスク受容基準との整合・記録
- **Step 6**: 定期レビュー — 脅威動向変化に応じた年次評価更新とISMSプログラムへの反映


---

# ISMSコンプライアンス チェックリスト（MFA）

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">ISMSコンプライアンス チェックリスト（MFA）</text>
<text x="90" y="58" font-size="11" fill="#f9a825" text-anchor="middle">カテゴリ</text>
<text x="350" y="58" font-size="11" fill="#f9a825" text-anchor="middle">チェック項目</text>
<text x="650" y="58" font-size="11" fill="#f9a825" text-anchor="middle">証跡</text>
<line x1="30" y1="63" x2="770" y2="63" stroke="#444" stroke-width="1"/>
<rect x="30" y="70" width="740" height="36" rx="3" fill="#0d0d1a"/>
<rect x="33" y="78" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="92" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">方針</text>
<text x="185" y="92" font-size="9.5" fill="#ffffff">MFAポリシーが文書化・承認・周知されているか</text>
<text x="650" y="92" font-size="9" fill="#aaa" text-anchor="middle">方針文書・承認記録</text><rect x="30" y="112" width="740" height="36" rx="3" fill="#16213e"/>
<rect x="33" y="120" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="134" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">適用範囲</text>
<text x="185" y="134" font-size="9.5" fill="#ffffff">どのシステム・ユーザーにMFAが必須かが明確か</text>
<text x="650" y="134" font-size="9" fill="#aaa" text-anchor="middle">MFA適用範囲表</text><rect x="30" y="154" width="740" height="36" rx="3" fill="#0d0d1a"/>
<rect x="33" y="162" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="176" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">実施状況</text>
<text x="185" y="176" font-size="9.5" fill="#ffffff">MFA有効化率が目標値（例95%以上）を達成しているか</text>
<text x="650" y="176" font-size="9" fill="#aaa" text-anchor="middle">IdPの設定・レポート</text><rect x="30" y="196" width="740" height="36" rx="3" fill="#16213e"/>
<rect x="33" y="204" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="218" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">例外管理</text>
<text x="185" y="218" font-size="9.5" fill="#ffffff">MFA例外（緊急アカウント等）の承認・監視があるか</text>
<text x="650" y="218" font-size="9" fill="#aaa" text-anchor="middle">例外申請記録・ログ</text><rect x="30" y="238" width="740" height="36" rx="3" fill="#0d0d1a"/>
<rect x="33" y="246" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="260" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">ログ・監視</text>
<text x="185" y="260" font-size="9.5" fill="#ffffff">MFA認証イベントのログが90日以上保存されているか</text>
<text x="650" y="260" font-size="9" fill="#aaa" text-anchor="middle">SIEMの設定確認</text><rect x="30" y="280" width="740" height="36" rx="3" fill="#16213e"/>
<rect x="33" y="288" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="302" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">訓練</text>
<text x="185" y="302" font-size="9.5" fill="#ffffff">従業員へのMFA使用・フィッシング対策教育の記録</text>
<text x="650" y="302" font-size="9" fill="#aaa" text-anchor="middle">研修完了証明</text><rect x="30" y="322" width="740" height="36" rx="3" fill="#0d0d1a"/>
<rect x="33" y="330" width="12" height="12" rx="2" fill="none" stroke="#4caf50" stroke-width="2"/>
<text x="90" y="344" font-size="10" fill="#f9a825" text-anchor="middle" font-weight="bold">レビュー</text>
<text x="185" y="344" font-size="9.5" fill="#ffffff">MFAポリシーの年次見直しが実施されているか</text>
<text x="650" y="344" font-size="9" fill="#aaa" text-anchor="middle">マネジメントレビュー記録</text>
<rect x="30" y="365" width="740" height="0" fill="none"/></svg>
- **ポリシー**: MFA利用ポリシーが文書化・経営承認済みか
- **スコープ定義**: 対象システム（特権・リモート・クラウド・外部委託先）を明確に定義しているか
- **技術選定**: NIST AAL / ISO27001要件に合致したMFA方式を選定・記録しているか
- **例外管理**: MFA免除申請プロセス・緊急アクセス手順が文書化・承認済みか
- **教育・訓練**: 全対象ユーザーへのMFA操作教育を実施し記録しているか
- **監査証跡**: MFA認証ログの記録・保管期間・アラート設定が適切か
- **定期見直し**: MFA設定・ポリシーの年次レビュー計画が存在するか


---

# 監査証跡・ログ要件（ISMS観点）

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
<text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">監査証跡・ログ要件（ISMS観点）</text>
<rect x="30" y="45" width="740" height="35" rx="5" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="400" y="68" font-size="11" fill="#ffffff" text-anchor="middle">ISO 27001 Annex A 8.15 ログの記録 + 8.16 監視活動 が要求する最低限のMFAログ</text>
<text x="100" y="100" font-size="12" fill="#f9a825" text-anchor="middle">イベント種別</text>
<text x="380" y="100" font-size="12" fill="#f9a825" text-anchor="middle">記録すべき情報</text>
<text x="640" y="100" font-size="12" fill="#f9a825" text-anchor="middle">保存期間</text>
<line x1="30" y1="106" x2="770" y2="106" stroke="#444" stroke-width="1"/>
<rect x="30" y="113" width="740" height="36" rx="3" fill="#0d0d1a"/>
<text x="100" y="135" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">MFA認証成功</text>
<text x="230" y="135" font-size="8.5" fill="#ffffff">ユーザーID・タイムスタンプ・IPアドレス・デバイス・MFA方式</text>
<text x="640" y="135" font-size="10" fill="#4caf50" text-anchor="middle">90日〜1年</text><rect x="30" y="155" width="740" height="36" rx="3" fill="#16213e"/>
<text x="100" y="177" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">MFA認証失敗</text>
<text x="230" y="177" font-size="8.5" fill="#ffffff">同上 + 失敗理由（無効なコード・タイムアウト等）</text>
<text x="640" y="177" font-size="10" fill="#4caf50" text-anchor="middle">90日〜1年</text><rect x="30" y="197" width="740" height="36" rx="3" fill="#0d0d1a"/>
<text x="100" y="219" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">MFA設定変更</text>
<text x="230" y="219" font-size="8.5" fill="#ffffff">変更者・変更内容・承認者・変更前後の状態</text>
<text x="640" y="219" font-size="10" fill="#4caf50" text-anchor="middle">3年〜</text><rect x="30" y="239" width="740" height="36" rx="3" fill="#16213e"/>
<text x="100" y="261" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">MFA一時無効化</text>
<text x="230" y="261" font-size="8.5" fill="#ffffff">無効化理由・承認者・期間・再有効化記録</text>
<text x="640" y="261" font-size="10" fill="#4caf50" text-anchor="middle">3年〜</text><rect x="30" y="281" width="740" height="36" rx="3" fill="#0d0d1a"/>
<text x="100" y="303" font-size="10" fill="#e91e63" text-anchor="middle" font-weight="bold">特権アカウントMFA</text>
<text x="230" y="303" font-size="8.5" fill="#ffffff">上記全項目 + セッション録画（PAM）</text>
<text x="640" y="303" font-size="10" fill="#4caf50" text-anchor="middle">5年〜</text>
<rect x="30" y="328" width="740" height="42" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="400" y="348" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">ログの完全性確保</text>
<text x="400" y="364" font-size="10" fill="#ffffff" text-anchor="middle">ログのハッシュチェーン・WORM（書き換え不可）ストレージ・SIEMへのリアルタイム転送で証拠能力を確保</text></svg>
- **ISO27001 8.15 ログ管理**: 認証イベント（成功・失敗）の記録・保護・保管期間設定
- **記録必須項目**: ユーザーID / タイムスタンプ / 認証方式 / 接続元IP / 成否 / デバイス情報
- **保管期間**: 最低1年（ISO27001要件）/ PCI DSS: 最低1年（3ヶ月オンライン保持）
- **改ざん防止**: ログのWORM保存（Write Once Read Many）または署名付き転送
- **SIEM連携**: 異常パターン（深夜/海外IP/連続失敗）の自動アラート設定
- **定期レビュー**: 四半期ごとの認証ログレビューをISMS内部監査計画に組み込む


---

<!-- _class: lead -->
# Sec.4 — 攻撃パターン & バイパス事例

- MFAは万能ではない — 攻撃手法を知り、適切な対策を講じる


---

# MFAを標的とする主要攻撃手法

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFAを標的とする主要攻撃手法</text>
<rect x="20" y="50" width="230" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="285" y="50" width="230" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="550" y="50" width="230" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="20" y="220" width="230" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="285" y="220" width="230" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="550" y="220" width="230" height="140" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="135" y="77" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">AiTM フィッシング</text>
<text x="135" y="100" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">プロキシでOTP傍受</text>
<text x="135" y="122" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Evilginx2等ツール</text>
<text x="135" y="160" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">対策: FIDO2のみ有効</text>
<text x="400" y="77" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">SIMスワッピング</text>
<text x="400" y="100" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">電話番号乗っ取り</text>
<text x="400" y="122" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">SMS OTP奪取</text>
<text x="400" y="160" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">対策: TOTP/FIDO2へ移行</text>
<text x="665" y="77" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Push疲労攻撃</text>
<text x="665" y="100" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">大量Push通知送信</text>
<text x="665" y="122" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ユーザーが誤承認</text>
<text x="665" y="160" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">対策: Number Matching</text>
<text x="135" y="247" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">SS7脆弱性</text>
<text x="135" y="270" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">通信プロトコル悪用</text>
<text x="135" y="292" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">SMS傍受</text>
<text x="135" y="330" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">対策: SMS MFA廃止</text>
<text x="400" y="247" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">リアルタイムフィッシング</text>
<text x="400" y="270" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">OTPコードを即時入力</text>
<text x="400" y="292" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">タイミング攻撃</text>
<text x="400" y="330" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">対策: FIDO2 + origin確認</text>
<text x="665" y="247" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">最強の防御</text>
<text x="665" y="275" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">FIDO2 / WebAuthn</text>
<text x="665" y="300" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">物理キー拘束</text>
<text x="665" y="325" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">全攻撃に耐性あり</text>
</svg>
![w:900 center](assets/attack-overview.svg)


---

# AiTM（Adversary-in-the-Middle）フィッシング

![w:900 center](assets/aitm-attack.svg)


---

# SIMスワッピング攻撃

- **概要**: 攻撃者がキャリアを騙して被害者の電話番号を攻撃者のSIMに移管する攻撃
- **手口**: ①個人情報収集（SNS/ダークウェブ）→ ②キャリアへのなりすまし手続き → ③SMS OTP傍受
- **被害例**: 2019年 Jack Dorsey（Twitter CEO）乗っ取り / 暗号資産盗難多数
- **対策**: SMS OTPを廃止してFIDO2/TOTPへ移行 / キャリアへのSIM変更時の認証強化要求
- **ISMS観点**: 高リスク資産へのSMS MFA使用を**禁止するポリシー**を策定すること
- **日本の状況**: 2023年〜 キャリア各社がSIM変更時の本人確認を強化（マイナンバーカード照合等）


---

# MFA Push疲労攻撃（Push Bombing）

- **手口**: 攻撃者は正しいID/PWを入手済み → 大量のプッシュ通知を深夜等に連続送信
- **狙い**: ユーザーが誤操作・疲れ・諦めで承認 または 止まらないと思い込んで承認
- **実例**: 2022年 Uber社侵害 — 深夜のPush Bombing後にソーシャルエンジニアリングで承認取得
- **対策①**: 番号照合（Number Matching）— 画面の数字と一致するものを必ず選択
- **対策②**: 追加コンテキスト表示 — 場所・デバイス・アプリ情報を通知に含める
- **対策③**: Push通知の送信頻度制限（Rate Limiting） + 連続失敗でアカウントロック


---

# SS7プロトコル脆弱性

- **SS7**: 1975年設計の電話網シグナリングプロトコル — 認証機構が設計に存在しない
- **攻撃**: 電話網への不正アクセスにより通話・SMSをリアルタイムで傍受・転送が可能
- **必要条件**: 電話キャリアネットワークへのアクセス（国家機関・高度な犯罪者集団等）
- **リスク評価**: SMS OTPは傍受可能 — 高価値標的への SMS MFA は不適切
- **代替**: TOTP（オフライン生成）またはFIDO2（SS7攻撃の影響を受けない）
- **NIST見解**: SS7脆弱性を理由にSMS OTPをAAL1「RESTRICTED（制限付き）」に分類（2017年〜）


---

# 実例ケーススタディ（2022-2024）

- **Uber（2022年）**: PUSH疲労 + SEで社員が承認 → 内部システム完全アクセス。犯人は18歳
- **Cisco（2022年）**: 個人Googleアカウント経由でMFAリカバリーコード奪取 → VPN侵害
- **Twilio（2022年）**: SMS標的フィッシングで社員誘導 → Authy顧客データ侵害（約1900アカウント）
- **MGM Resorts（2023年）**: LinkedInで社員特定 → ヘルプデスクへのSE → MFAリセット → カジノ全停止
- **Microsoft（2023年）**: AiTM攻撃でセッショントークン奪取 → MFAをバイパスしメール侵害
- **教訓**: 技術的MFAだけでなく **プロセス・人的要素**（ヘルプデスク・リカバリー手順）の保護が不可欠


---

# 攻撃別 対策マッピング

![w:900 center](assets/attack-countermeasures.svg)


---

# MFA方式別 攻撃耐性マトリクス

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFA方式別 攻撃耐性マトリクス</text>
<rect x="10" y="45" width="780" height="40" rx="6" fill="#f9a825" opacity="0.2"/>
<text x="105" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">攻撃種別</text>
<text x="255" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">SMS OTP</text>
<text x="375" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">TOTP</text>
<text x="490" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Push通知</text>
<text x="620" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">FIDO2</text>
<text x="730" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Passkeys</text>
<text x="105" y="108" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">フィッシング</text>
<text x="255" y="108" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="108" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="490" y="108" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="620" y="108" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="108" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="142" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">SIMスワッピング</text>
<text x="255" y="142" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="142" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="142" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="620" y="142" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="142" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="176" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Push疲労攻撃</text>
<text x="255" y="176" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="375" y="176" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="176" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">△</text>
<text x="620" y="176" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="176" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">SS7攻撃</text>
<text x="255" y="210" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="210" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="490" y="210" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="620" y="210" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="210" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="105" y="244" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">AiTMフィッシング</text>
<text x="255" y="244" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="375" y="244" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="490" y="244" text-anchor="middle" fill="#e91e63" font-size="14" font-family="sans-serif">✗</text>
<text x="620" y="244" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<text x="730" y="244" text-anchor="middle" fill="#4caf50" font-size="14" font-family="sans-serif">✓</text>
<line x1="10" y1="88" x2="790" y2="88" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="10" y1="122" x2="790" y2="122" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="156" x2="790" y2="156" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="190" x2="790" y2="190" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="10" y1="224" x2="790" y2="224" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
<line x1="190" y1="45" x2="190" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="310" y1="45" x2="310" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="430" y1="45" x2="430" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="560" y1="45" x2="560" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<line x1="680" y1="45" x2="680" y2="258" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">FIDO2 / Passkeys のみがすべての攻撃に耐性あり</text>
</svg>
![w:900 center](assets/attack-resistance.svg)


---

<!-- _class: lead -->
# Sec.5 — MFA導入・実践ガイドライン

- 計画から運用まで — ISMS管理者のための実践ロードマップ


---

# MFA導入ロードマップ（4フェーズ）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFA導入ロードマップ（4フェーズ）</text>
<rect x="20" y="55" width="165" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<rect x="213" y="55" width="165" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<rect x="406" y="55" width="165" height="300" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<rect x="599" y="55" width="165" height="300" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="102" y="82" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Phase 1</text>
<text x="295" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Phase 2</text>
<text x="488" y="82" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold" font-family="sans-serif">Phase 3</text>
<text x="681" y="82" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Phase 4</text>
<text x="102" y="106" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">基盤整備</text>
<text x="295" y="106" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">特権MFA展開</text>
<text x="488" y="106" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">全社展開</text>
<text x="681" y="106" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">高度化</text>
<text x="35" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• MFA方式選定</text>
<text x="35" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• IdP/IAM選定</text>
<text x="35" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• PoC実施</text>
<text x="35" y="213" fill="#ffffff" font-size="11" font-family="sans-serif">• リスク評価</text>
<text x="35" y="238" fill="#ffffff" font-size="11" font-family="sans-serif">• UXテスト</text>
<text x="35" y="275" fill="#f9a825" font-size="11" font-family="sans-serif">期間: 1-2ヶ月</text>
<text x="228" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• 管理者に強制</text>
<text x="228" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• 特権IDへ適用</text>
<text x="228" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• サービスアカウント</text>
<text x="228" y="213" fill="#ffffff" font-size="11" font-family="sans-serif">• 監視設定</text>
<text x="228" y="238" fill="#ffffff" font-size="11" font-family="sans-serif">• インシデント訓練</text>
<text x="228" y="275" fill="#e91e63" font-size="11" font-family="sans-serif">期間: 2-3ヶ月</text>
<text x="421" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• 全社員へ展開</text>
<text x="421" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• ヘルプデスク対応</text>
<text x="421" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• 例外申請フロー</text>
<text x="421" y="213" fill="#ffffff" font-size="11" font-family="sans-serif">• ユーザー教育</text>
<text x="421" y="238" fill="#ffffff" font-size="11" font-family="sans-serif">• 定着化確認</text>
<text x="421" y="275" fill="#2196f3" font-size="11" font-family="sans-serif">期間: 3-6ヶ月</text>
<text x="614" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">• FIDO2移行</text>
<text x="614" y="163" fill="#ffffff" font-size="11" font-family="sans-serif">• Adaptive MFA</text>
<text x="614" y="188" fill="#ffffff" font-size="11" font-family="sans-serif">• Passkeys対応</text>
<text x="614" y="213" fill="#ffffff" font-size="11" font-family="sans-serif">• ゼロトラスト統合</text>
<text x="614" y="238" fill="#ffffff" font-size="11" font-family="sans-serif">• 継続的改善</text>
<text x="614" y="275" fill="#4caf50" font-size="11" font-family="sans-serif">期間: 継続的</text>
<line x1="185" y1="205" x2="213" y2="205" stroke="#f9a825" stroke-width="2"/>
<polygon points="213,205 201,199 201,211" fill="#f9a825"/>
<line x1="378" y1="205" x2="406" y2="205" stroke="#e91e63" stroke-width="2"/>
<polygon points="406,205 394,199 394,211" fill="#e91e63"/>
<line x1="571" y1="205" x2="599" y2="205" stroke="#2196f3" stroke-width="2"/>
<polygon points="599,205 587,199 587,211" fill="#2196f3"/>
</svg>
![w:900 center](assets/mfa-roadmap.svg)


---

# リスクベースのMFA選択フレームワーク

![w:900 center](assets/mfa-selection.svg)


---

# IdP / IAM システムとの統合パターン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">IdP / IAM システムとの統合パターン</text>
<rect x="300" y="50" width="200" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
<text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">Identity Provider</text>
<text x="400" y="100" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Okta / Azure AD / Auth0</text>
<line x1="350" y1="110" x2="160" y2="175" stroke="#f9a825" stroke-width="2"/>
<polygon points="160,175 163,162 175,168" fill="#f9a825"/>
<line x1="400" y1="110" x2="400" y2="175" stroke="#f9a825" stroke-width="2"/>
<polygon points="400,175 394,162 406,162" fill="#f9a825"/>
<line x1="450" y1="110" x2="640" y2="175" stroke="#f9a825" stroke-width="2"/>
<polygon points="640,175 630,163 642,162" fill="#f9a825"/>
<rect x="60" y="178" width="190" height="75" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="155" y="205" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">RADIUS</text>
<text x="155" y="228" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">VPN / WiFi MFA</text>
<text x="155" y="248" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">レガシー統合</text>
<rect x="305" y="178" width="190" height="75" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="205" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold" font-family="sans-serif">OIDC / SAML</text>
<text x="400" y="228" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Web/アプリ認証</text>
<text x="400" y="248" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">SSO統合</text>
<rect x="550" y="178" width="190" height="75" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="645" y="205" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold" font-family="sans-serif">LDAP / AD</text>
<text x="645" y="228" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ディレクトリ連携</text>
<text x="645" y="248" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">社内システム</text>
<rect x="30" y="285" width="740" height="85" rx="8" fill="#16213e" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">統合時の考慮点</text>
<text x="50" y="340" fill="#ffffff" font-size="12" font-family="sans-serif">• MFAポリシーのIdP集中管理 / 各SPはIdPにMFA判断を委任</text>
<text x="50" y="365" fill="#ffffff" font-size="12" font-family="sans-serif">• 監査ログをIdPで一元収集 / SIEM連携</text></svg>
- **統合アーキテクチャ**: IdP（Okta/Azure AD/Google Workspace）がMFAの中央管理を担う
- **SAML 2.0 / OIDC**: アプリ側での個別MFA実装を廃止 → IdP統合で一元管理・ポリシー統一
- **SCIM**: ユーザーライフサイクル管理（入社・異動・退社）とMFA設定の自動プロビジョニング
- **条件付きアクセス**: デバイスコンプライアンス × MFA × ネットワーク位置の組合せポリシー
- **MFA Fatigue対策**: IdP レベルで番号照合・Rate Limiting を一括設定（全アプリに適用）
- **ISMS観点**: 認証ポリシーの変更は変更管理手順書に従い承認・記録する


---

# ユーザー受容性 & UX設計

- **摩擦と安全性のバランス**: 過度なMFA要求はシャドーITや回避行動を招く
- **段階的導入**: 特権アカウント → 全社員 → 外部委託先 の順序で展開（混乱を最小化）
- **セルフサービス登録**: ポータルで社員が自分でデバイス登録できる設計（ヘルプデスク負荷軽減）
- **コミュニケーション**: 導入前の説明会・FAQ整備・ヘルプデスクサポート体制の事前整備
- **アクセシビリティ**: 障害者・高齢者向けの代替認証方法の提供（WCAG 2.1 準拠）
- **KPIモニタリング**: MFA失敗率・ヘルプデスク問合せ数・登録完了率を定期レポート


---

# 例外処理・アカウントリカバリー設計

- **リカバリーコード**: MFA登録時に発行 → 印刷/暗号化保管を指示（デジタルのみはNG）
- **緊急アクセス手順**: 全MFAデバイス紛失時の本人確認フロー（対面確認/管理者承認/ID証明）
- **MFA免除申請**: 業務上やむを得ない免除は 申請 → リスク評価 → 経営承認 → 有期限設定
- **ブレークグラスアカウント**: 緊急時専用高権限アカウント — 使用は即座にアラート + 全ログ記録
- **ISMS観点**: 例外はすべて文書化し四半期ごとの免除リスト棚卸しを実施すること
- **インシデント対応**: MFA妨害が疑われる場合のアカウントロック → 調査 → 復旧フローを整備


---

# 導入時のよくある落とし穴

- **サービスアカウントの見落とし**: 人間アカウントのみMFA対応 → 機械アカウントが抜け穴になる
- **リカバリープロセスの脆弱性**: MFA自体は堅牢でもリセット手順がSEに弱い（MGM事例）
- **例外の常態化**: 業務理由でのMFA免除が増加 → スコープが空洞化して形骸化
- **ベンダー・委託先の漏れ**: 社内のみMFA対応 → 外部アクセス権限がバイパス経路になる
- **ログの未活用**: MFAログは取得しているが監視・アラートが未整備で侵害に気づかない
- **レガシー認証の残存**: NTLM / レガシー認証が有効のままMFAをバイパスされる可能性


---

# MFAセキュリティ成熟度モデル

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">MFAセキュリティ成熟度モデル</text>
<rect x="30" y="50" width="740" height="305" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<rect x="50" y="70" width="680" height="55" rx="8" fill="#1a1a2e" stroke="#e91e63" stroke-width="1.5"/>
<text x="150" y="95" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Level 1</text>
<text x="150" y="113" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">初期</text>
<text x="510" y="95" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">一部システムでSMS MFA / パスワード+SMSのみ</text>
<rect x="50" y="140" width="680" height="55" rx="8" fill="#1a1a2e" stroke="#f9a825" stroke-width="1.5"/>
<text x="150" y="165" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Level 2</text>
<text x="150" y="183" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">管理</text>
<text x="510" y="165" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">特権アカウントにTOTP必須 / MFAポリシー文書化</text>
<rect x="50" y="210" width="680" height="55" rx="8" fill="#1a1a2e" stroke="#2196f3" stroke-width="1.5"/>
<text x="150" y="235" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold" font-family="sans-serif">Level 3</text>
<text x="150" y="253" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">定義</text>
<text x="510" y="235" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">全社員にMFA強制 / Adaptive MFA導入 / 監査証跡</text>
<rect x="50" y="280" width="680" height="55" rx="8" fill="#1a1a2e" stroke="#4caf50" stroke-width="2"/>
<text x="150" y="305" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Level 4</text>
<text x="150" y="323" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">最適化</text>
<text x="510" y="305" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">FIDO2/Passkeys全社展開 / ゼロトラスト統合 / 継続的改善</text>
<text x="400" y="375" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">ISMS目標: Level 3以上 / 高セキュリティ環境: Level 4</text>
</svg>
- **Level 1（初期）**: 特権アカウントのみMFA（SMS/TOTP）、ポリシー未整備
- **Level 2（管理）**: 全従業員にMFA展開、ポリシー文書化、一部例外あり
- **Level 3（定義）**: フィッシング耐性MFA（FIDO2）採用、リスクベース認証、例外管理プロセス確立
- **Level 4（定量的）**: MFAカバレッジ率・失敗率をKPI化、SIEM連携で自動検知・対応
- **Level 5（最適化）**: Passkeys/デバイス証明書でパスワードレス実現、継続的な脅威対応サイクル
- **目標設定**: 現在レベルを自己評価 → 年間でLevel+1を目標 → ISMSレビューで進捗を追跡


---

<!-- _class: lead -->
# まとめ

- 重要ポイントの整理とアクションアイテム


---

# キーテイクアウェイ

- **MFAは必須**: 認証侵害の80%以上はパスワード単体の弱さが原因 — MFAで99.9%防御可能
- **MFAにも弱点あり**: AiTM・Push Bombing・SIMスワッピングへの対策が不可欠
- **FIDO2/Passkeysが最強**: フィッシング耐性・NIST AAL3達成 — 高リスク環境に推奨
- **ISMSとの統合**: ISO27001 A.8.5を軸にポリシー・例外管理・監査証跡を体系的に整備
- **プロセスも守る**: 技術だけでなくリカバリー手順・ヘルプデスク・例外管理の堅牢化
- **段階的に推進**: 特権アカウント → 全社員 → パスワードレス のロードマップで着実に進める


---

# 参考文献・推奨リソース（1/2）

- **標準・規格:**
- [NIST SP 800-63B Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [ISO/IEC 27001:2022 Information Security Management](https://www.iso.org/standard/27001)
- **業界レポート・研究:**


---

# 参考文献・推奨リソース（2/2）

- [Verizon DBIR 2024](https://www.verizon.com/business/resources/reports/dbir/)
- [FIDO Alliance — MFA Overview](https://fidoalliance.org/overview/)
- **実装ガイド:**
- [CISA MFA Best Practices](https://www.cisa.gov/mfa)
- [Microsoft MFA Deployment Guide](https://learn.microsoft.com/azure/active-directory/authentication/howto-mfa-getstarted)

