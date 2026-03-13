---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "デジタル遺産の行方"
footer: "© 2026"
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
  
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# 死後のデジタル遺産
アカウントは誰が相続するのか

- SNSアカウント、クラウドの写真、仮想通貨...
- あなたの「デジタル人生」は死後どうなるか
- 法律・テクノロジー・倫理が交差する新しい問題


---

# アジェンダ

> *デジタル資産の法的空白・仮想通貨リスク・AI復活問題を網羅*

- 1. デジタル遺産とは何か
- 2. 各プラットフォームの死後対応
- 3. 法的フレームワーク
- 4. 仮想通貨と相続の特殊問題
- 5. AIと死者の「復活」
- 6. デジタル終活の実践


---

<!-- _class: lead -->
# デジタル遺産とは何か


---

# 現代人のデジタルフットプリント

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><text x="400" y="34" font-size="18" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">現代人が持つデジタル資産の種類と規模</text><rect x="60" y="55" width="150" height="270" rx="10" fill="#e91e63" opacity="0.85"/><text x="135" y="340" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif">SNS投稿</text><text x="135" y="358" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">10年分</text><rect x="230" y="110" width="150" height="215" rx="10" fill="#3f51b5" opacity="0.85"/><text x="305" y="340" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif">メール</text><text x="305" y="358" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">10万通以上</text><rect x="400" y="80" width="150" height="245" rx="10" fill="#00bcd4" opacity="0.85"/><text x="475" y="340" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif">写真・動画</text><text x="475" y="358" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">数万枚</text><rect x="570" y="155" width="150" height="170" rx="10" fill="#8bc34a" opacity="0.85"/><text x="645" y="340" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif">仮想通貨</text><text x="645" y="358" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">ウォレット</text><text x="135" y="175" font-size="22" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">100+</text><text x="135" y="195" font-size="11" fill="white" text-anchor="middle" font-family="sans-serif">プラットフォーム</text><text x="305" y="230" font-size="22" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">10万</text><text x="475" y="200" font-size="22" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">数万</text><text x="645" y="250" font-size="22" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">¥?</text></svg>


---

# 年間300万人のFacebookユーザーが亡くなる

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="32" font-size="17" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">死者のFBアカウント数 vs 生者のアカウント数（予測）</text><line x1="80" y1="280" x2="740" y2="280" stroke="#555" stroke-width="2"/><line x1="80" y1="280" x2="80" y2="50" stroke="#555" stroke-width="2"/><text x="60" y="283" font-size="11" fill="#aaa" text-anchor="end" font-family="sans-serif">0</text><text x="60" y="210" font-size="11" fill="#aaa" text-anchor="end" font-family="sans-serif">10億</text><text x="60" y="140" font-size="11" fill="#aaa" text-anchor="end" font-family="sans-serif">20億</text><text x="60" y="70" font-size="11" fill="#aaa" text-anchor="end" font-family="sans-serif">30億</text><line x1="80" y1="210" x2="740" y2="210" stroke="#333" stroke-width="1" stroke-dasharray="4"/><line x1="80" y1="140" x2="740" y2="140" stroke="#333" stroke-width="1" stroke-dasharray="4"/><line x1="80" y1="70" x2="740" y2="70" stroke="#333" stroke-width="1" stroke-dasharray="4"/><polyline points="80,210 200,195 320,178 440,155 560,125 660,90" fill="none" stroke="#4fc3f7" stroke-width="3"/><polyline points="80,278 200,272 320,260 440,240 560,195 660,130" fill="none" stroke="#e91e63" stroke-width="3"/><circle cx="660" cy="130" r="6" fill="#e91e63"/><circle cx="660" cy="90" r="6" fill="#4fc3f7"/><text x="670" y="128" font-size="12" fill="#e91e63" font-family="sans-serif">死者</text><text x="670" y="88" font-size="12" fill="#4fc3f7" font-family="sans-serif">生者</text><text x="170" y="298" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">現在</text><text x="340" y="298" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">2040</text><text x="510" y="298" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">2060</text><text x="660" y="298" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">2070</text><line x1="540" y1="50" x2="540" y2="280" stroke="#f9a825" stroke-width="1" stroke-dasharray="6"/><text x="544" y="65" font-size="11" fill="#f9a825" font-family="sans-serif">逆転ポイント</text></svg>
- **問い：** 死者のプロフィールは誰が管理すべきか？


---

<!-- _class: lead -->
# 各プラットフォームの死後対応


---

# テック企業の対応は統一されていない

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="30" font-size="16" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">各プラットフォームの死後ポリシー比較</text><rect x="20" y="45" width="180" height="30" rx="5" fill="#263238"/><text x="110" y="65" font-size="13" fill="#aaa" text-anchor="middle" font-family="sans-serif">サービス</text><rect x="205" y="45" width="175" height="30" rx="5" fill="#263238"/><text x="292" y="65" font-size="13" fill="#aaa" text-anchor="middle" font-family="sans-serif">アカウント継承</text><rect x="385" y="45" width="175" height="30" rx="5" fill="#263238"/><text x="472" y="65" font-size="13" fill="#aaa" text-anchor="middle" font-family="sans-serif">データ取得</text><rect x="565" y="45" width="215" height="30" rx="5" fill="#263238"/><text x="672" y="65" font-size="13" fill="#aaa" text-anchor="middle" font-family="sans-serif">事前設定</text><rect x="20" y="80" width="180" height="42" rx="5" fill="#1565c0" opacity="0.7"/><text x="110" y="106" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">Facebook/Meta</text><rect x="205" y="80" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="292" y="106" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">追悼アカウント</text><rect x="385" y="80" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="472" y="106" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">一部可能</text><rect x="565" y="80" width="215" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="672" y="106" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">追悼管理人を指名</text><rect x="20" y="127" width="180" height="42" rx="5" fill="#0277bd" opacity="0.7"/><text x="110" y="153" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">Google</text><rect x="205" y="127" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="292" y="153" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">受取人へ転送</text><rect x="385" y="127" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="472" y="153" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">ダウンロード可</text><rect x="565" y="127" width="215" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="672" y="153" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">無効化管理ツール</text><rect x="20" y="174" width="180" height="42" rx="5" fill="#424242" opacity="0.7"/><text x="110" y="200" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">Apple</text><rect x="205" y="174" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="292" y="200" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">アクセス委任</text><rect x="385" y="174" width="175" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="472" y="200" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">写真・連絡先等</text><rect x="565" y="174" width="215" height="42" rx="5" fill="#1b5e20" opacity="0.7"/><text x="672" y="200" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">デジタルレガシー機能</text><rect x="20" y="221" width="180" height="42" rx="5" fill="#212121" opacity="0.7"/><text x="110" y="247" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">Twitter/X</text><rect x="205" y="221" width="175" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="292" y="247" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">削除のみ</text><rect x="385" y="221" width="175" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="472" y="247" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">不可</text><rect x="565" y="221" width="215" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="672" y="247" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">なし</text><rect x="20" y="268" width="180" height="42" rx="5" fill="#e65100" opacity="0.7"/><text x="110" y="294" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">Amazon</text><rect x="205" y="268" width="175" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="292" y="294" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">Kindle は相続不可</text><rect x="385" y="268" width="175" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="472" y="294" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">ライセンスのみ</text><rect x="565" y="268" width="215" height="42" rx="5" fill="#b71c1c" opacity="0.7"/><text x="672" y="294" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">なし</text><rect x="20" y="318" width="760" height="35" rx="5" fill="#37474f"/><text x="400" y="340" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">「所有」と思っていたものが実は「借りていた」だけ — 利用規約が法律より優先</text></svg>


---

<!-- _class: lead -->
# 法的フレームワーク


---

# デジタル遺産の法的課題

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="30" font-size="16" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">デジタル遺産 法的フレームワークの現状</text><rect x="30" y="50" width="220" height="110" rx="10" fill="#37474f" stroke="#546e7a" stroke-width="1"/><text x="140" y="75" font-size="14" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">従来の相続法</text><text x="140" y="95" font-size="12" fill="#cfd8dc" text-anchor="middle" font-family="sans-serif">物理的財産を想定</text><text x="140" y="113" font-size="12" fill="#cfd8dc" text-anchor="middle" font-family="sans-serif">不動産・預金・動産</text><text x="140" y="131" font-size="12" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">デジタルデータは対象外</text><rect x="290" y="50" width="220" height="110" rx="10" fill="#37474f" stroke="#546e7a" stroke-width="1"/><text x="400" y="75" font-size="14" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">利用規約（ToS）</text><text x="400" y="95" font-size="12" fill="#cfd8dc" text-anchor="middle" font-family="sans-serif">企業ポリシー優先</text><text x="400" y="113" font-size="12" fill="#cfd8dc" text-anchor="middle" font-family="sans-serif">ライセンス契約</text><text x="400" y="131" font-size="12" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">相続権を否定可能</text><rect x="550" y="50" width="220" height="110" rx="10" fill="#37474f" stroke="#546e7a" stroke-width="1"/><text x="660" y="75" font-size="14" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">新しい立法</text><text x="660" y="95" font-size="12" fill="#cfd8dc" text-anchor="middle" font-family="sans-serif">米国RUFADAA (2015)</text><text x="660" y="113" font-size="12" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">49州で採用</text><text x="660" y="131" font-size="12" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">受託者を認める</text><polygon points="250,105 270,100 270,110" fill="#f9a825"/><line x1="250" y1="105" x2="270" y2="105" stroke="#f9a825" stroke-width="2"/><polygon points="510,105 530,100 530,110" fill="#f9a825"/><line x1="510" y1="105" x2="530" y2="105" stroke="#f9a825" stroke-width="2"/><rect x="30" y="195" width="335" height="80" rx="10" fill="#1a237e" stroke="#3f51b5" stroke-width="1"/><text x="197" y="220" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">ドイツ判例 (2018)</text><text x="197" y="240" font-size="12" fill="#c5cae9" text-anchor="middle" font-family="sans-serif">娘のFB追悼アカウントへの</text><text x="197" y="258" font-size="12" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">遺族アクセスを認めた</text><rect x="435" y="195" width="335" height="80" rx="10" fill="#004d40" stroke="#00695c" stroke-width="1"/><text x="602" y="220" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">日本の現状</text><text x="602" y="240" font-size="12" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">デジタル遺産専門の法律なし</text><text x="602" y="258" font-size="12" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">民法・著作権法で対応</text><rect x="30" y="295" width="740" height="35" rx="5" fill="#37474f"/><text x="400" y="317" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">法整備は進んでいるが、グローバルな統一基準はない</text></svg>


---

<!-- _class: lead -->
# 仮想通貨と相続の特殊問題


---

# 仮想通貨の相続は最もリスクが高い

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" font-size="16" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">ビットコイン流通量の現状（推定）</text><circle cx="400" cy="185" r="130" fill="none" stroke="#263238" stroke-width="2"/><path d="M400 185 L400 55 A130 130 0 1 1 270 315 Z" fill="#4caf50" opacity="0.8"/><path d="M400 185 L270 315 A130 130 0 0 1 283 60 Z" fill="#f44336" opacity="0.8"/><text x="480" y="130" font-size="15" fill="#a5d6a7" font-family="sans-serif" font-weight="bold">流通中</text><text x="480" y="150" font-size="22" fill="#a5d6a7" font-family="sans-serif" font-weight="bold">~80%</text><text x="220" y="280" font-size="15" fill="#ef9a9a" font-family="sans-serif" font-weight="bold">消失</text><text x="220" y="300" font-size="22" fill="#ef9a9a" font-family="sans-serif" font-weight="bold">~20%</text><text x="400" y="180" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">秘密鍵を失った</text><text x="400" y="198" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">ウォレット</text><rect x="20" y="20" width="200" height="60" rx="8" fill="#b71c1c" opacity="0.85"/><text x="120" y="45" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">秘密鍵の喪失</text><text x="120" y="65" font-size="11" fill="#ffcdd2" text-anchor="middle" font-family="sans-serif">= 資産永久消失</text><rect x="580" y="20" width="200" height="60" rx="8" fill="#1b5e20" opacity="0.85"/><text x="680" y="45" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">対策</text><text x="680" y="65" font-size="11" fill="#c8e6c9" text-anchor="middle" font-family="sans-serif">マルチシグ / 信託</text><line x1="220" y1="50" x2="280" y2="120" stroke="#f44336" stroke-width="1" stroke-dasharray="4"/><line x1="580" y1="50" x2="520" y2="120" stroke="#4caf50" stroke-width="1" stroke-dasharray="4"/><rect x="100" y="285" width="600" height="45" rx="8" fill="#37474f"/><text x="400" y="310" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">2013年死亡の初期マイナー：8万BTC → 現在約80億ドルが永久に凍結</text></svg>


---

<!-- _class: lead -->
# AIと死者の「復活」


---

# AIで死者を「蘇らせる」技術（1/2）

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">AIクローン生成パイプライン</text><rect x="30" y="55" width="140" height="70" rx="8" fill="#263238" stroke="#546e7a" stroke-width="1"/><text x="100" y="82" font-size="12" fill="#80cbc4" text-anchor="middle" font-family="sans-serif" font-weight="bold">データ収集</text><text x="100" y="98" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">SNS投稿</text><text x="100" y="113" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">メッセージ・音声</text><polygon points="178,90 195,85 195,95" fill="#f9a825"/><line x1="170" y1="90" x2="195" y2="90" stroke="#f9a825" stroke-width="2"/><rect x="200" y="55" width="140" height="70" rx="8" fill="#263238" stroke="#546e7a" stroke-width="1"/><text x="270" y="82" font-size="12" fill="#80cbc4" text-anchor="middle" font-family="sans-serif" font-weight="bold">学習・微調整</text><text x="270" y="98" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">LLM Fine-tuning</text><text x="270" y="113" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">音声クローン</text><polygon points="348,90 365,85 365,95" fill="#f9a825"/><line x1="340" y1="90" x2="365" y2="90" stroke="#f9a825" stroke-width="2"/><rect x="370" y="55" width="140" height="70" rx="8" fill="#263238" stroke="#546e7a" stroke-width="1"/><text x="440" y="82" font-size="12" fill="#80cbc4" text-anchor="middle" font-family="sans-serif" font-weight="bold">AIモデル</text><text x="440" y="98" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">チャットボット</text><text x="440" y="113" font-size="10" fill="#b2dfdb" text-anchor="middle" font-family="sans-serif">ディープフェイク映像</text><polygon points="518,90 535,85 535,95" fill="#f9a825"/><line x1="510" y1="90" x2="535" y2="90" stroke="#f9a825" stroke-width="2"/><rect x="540" y="55" width="140" height="70" rx="8" fill="#e91e63" opacity="0.8"/><text x="610" y="82" font-size="12" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">「故人」</text><text x="610" y="98" font-size="10" fill="#fce4ec" text-anchor="middle" font-family="sans-serif">会話可能</text><text x="610" y="113" font-size="10" fill="#fce4ec" text-anchor="middle" font-family="sans-serif">感情応答あり</text><rect x="30" y="160" width="200" height="60" rx="8" fill="#1a237e" opacity="0.85"/><text x="130" y="183" font-size="12" fill="#e8eaf6" text-anchor="middle" font-family="sans-serif" font-weight="bold">HereAfter AI</text><text x="130" y="200" font-size="11" fill="#c5cae9" text-anchor="middle" font-family="sans-serif">故人の声と記憶を再現</text><rect x="250" y="160" width="200" height="60" rx="8" fill="#1a237e" opacity="0.85"/><text x="350" y="183" font-size="12" fill="#e8eaf6" text-anchor="middle" font-family="sans-serif" font-weight="bold">Project December</text><text x="350" y="200" font-size="11" fill="#c5cae9" text-anchor="middle" font-family="sans-serif">GPTベースの「会話」</text><rect x="470" y="160" width="200" height="60" rx="8" fill="#1a237e" opacity="0.85"/><text x="570" y="183" font-size="12" fill="#e8eaf6" text-anchor="middle" font-family="sans-serif" font-weight="bold">ディープフェイク</text><text x="570" y="200" font-size="11" fill="#c5cae9" text-anchor="middle" font-family="sans-serif">映像・音声合成</text><text x="400" y="260" font-size="13" fill="#ef9a9a" text-anchor="middle" font-family="sans-serif">技術的には「復元」が可能な時代へ</text></svg>
- **故人のSNS投稿・メッセージでAIチャットボットを作成**


---

# AIで死者を「蘇らせる」技術（2/2） — 倫理的問題マップ

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="28" font-size="15" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">AIクローン — 倫理的問題マップ</text><circle cx="400" cy="165" r="45" fill="#e91e63" opacity="0.9"/><text x="400" y="160" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">AI</text><text x="400" y="178" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">クローン</text><rect x="20" y="45" width="170" height="55" rx="8" fill="#b71c1c" opacity="0.8"/><text x="105" y="68" font-size="12" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">同意の問題</text><text x="105" y="86" font-size="10" fill="#ffcdd2" text-anchor="middle" font-family="sans-serif">故人は復活に同意したか？</text><line x1="190" y1="72" x2="358" y2="145" stroke="#ef9a9a" stroke-width="1" stroke-dasharray="5"/><rect x="610" y="45" width="170" height="55" rx="8" fill="#b71c1c" opacity="0.8"/><text x="695" y="68" font-size="12" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">アイデンティティ</text><text x="695" y="86" font-size="10" fill="#ffcdd2" text-anchor="middle" font-family="sans-serif">本人と別人の融合リスク</text><line x1="610" y1="72" x2="442" y2="145" stroke="#ef9a9a" stroke-width="1" stroke-dasharray="5"/><rect x="20" y="220" width="170" height="55" rx="8" fill="#4a148c" opacity="0.85"/><text x="105" y="243" font-size="12" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">グリーフへの影響</text><text x="105" y="261" font-size="10" fill="#e1bee7" text-anchor="middle" font-family="sans-serif">癒やし？ それとも妨げ？</text><line x1="190" y1="247" x2="358" y2="185" stroke="#ce93d8" stroke-width="1" stroke-dasharray="5"/><rect x="610" y="220" width="170" height="55" rx="8" fill="#4a148c" opacity="0.85"/><text x="695" y="243" font-size="12" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">データ悪用</text><text x="695" y="261" font-size="10" fill="#e1bee7" text-anchor="middle" font-family="sans-serif">詐欺・フェイク情報拡散</text><line x1="610" y1="247" x2="442" y2="185" stroke="#ce93d8" stroke-width="1" stroke-dasharray="5"/><rect x="280" y="270" width="240" height="40" rx="8" fill="#37474f"/><text x="400" y="295" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">テクノロジーが「死」の定義を変えつつある</text></svg>


---

<!-- _class: lead -->
# デジタル終活の実践

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold" font-family="sans-serif">デジタル終活 — 今すぐ始める3ステップ</text><rect x="30" y="55" width="220" height="180" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="140" cy="95" r="24" fill="#f9a825"/><text x="140" y="101" text-anchor="middle" fill="#1a1a2e" font-size="18" font-weight="bold" font-family="sans-serif">1</text><text x="140" y="135" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">棚卸し</text><text x="140" y="155" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">全デジタル資産を</text><text x="140" y="173" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">リストアップする</text><text x="140" y="210" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">SNS / 金融 / サブスク</text><text x="140" y="226" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">クラウド / 暗号資産</text><rect x="290" y="55" width="220" height="180" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><circle cx="400" cy="95" r="24" fill="#e91e63"/><text x="400" y="101" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="sans-serif">2</text><text x="400" y="135" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">設定</text><text x="400" y="155" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">各サービスの</text><text x="400" y="173" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">遺族対応を設定</text><text x="400" y="210" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">Google / Apple 受取人</text><text x="400" y="226" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">パスワードマネージャー</text><rect x="550" y="55" width="220" height="180" rx="12" fill="#16213e" stroke="#69f0ae" stroke-width="2"/><circle cx="660" cy="95" r="24" fill="#69f0ae"/><text x="660" y="101" text-anchor="middle" fill="#1a1a2e" font-size="18" font-weight="bold" font-family="sans-serif">3</text><text x="660" y="135" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">文書化</text><text x="660" y="155" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">デジタル遺言書を</text><text x="660" y="173" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">法的遺言書に追記</text><text x="660" y="210" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">秘密鍵の保管方法</text><text x="660" y="226" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">信頼できる人への引継ぎ</text></svg>


---

# 今すぐできるデジタル終活チェックリスト

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" font-size="16" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">デジタル終活 6ステップチェックリスト</text><rect x="30" y="48" width="740" height="42" rx="8" fill="#1b5e20" opacity="0.85"/><rect x="38" y="56" width="26" height="26" rx="4" fill="#4caf50"/><text x="51" y="74" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">1</text><text x="90" y="69" font-size="13" fill="#a5d6a7" font-family="sans-serif" font-weight="bold">パスワードマネージャー</text><text x="90" y="84" font-size="11" fill="#c8e6c9" font-family="sans-serif">緊急アクセス機能を設定（1Password / Bitwarden）</text><rect x="30" y="98" width="740" height="42" rx="8" fill="#1a237e" opacity="0.85"/><rect x="38" y="106" width="26" height="26" rx="4" fill="#3f51b5"/><text x="51" y="124" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">2</text><text x="90" y="119" font-size="13" fill="#c5cae9" font-family="sans-serif" font-weight="bold">Google / Apple のレガシー設定</text><text x="90" y="134" font-size="11" fill="#e8eaf6" font-family="sans-serif">データの受取人（信頼できる人）を今すぐ指名</text><rect x="30" y="148" width="740" height="42" rx="8" fill="#37474f" opacity="0.9"/><rect x="38" y="156" width="26" height="26" rx="4" fill="#607d8b"/><text x="51" y="174" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">3</text><text x="90" y="169" font-size="13" fill="#eceff1" font-family="sans-serif" font-weight="bold">SNS の死後設定</text><text x="90" y="184" font-size="11" fill="#cfd8dc" font-family="sans-serif">Facebook 追悼管理人 / Instagram アカウントの指示</text><rect x="30" y="198" width="740" height="42" rx="8" fill="#e65100" opacity="0.75"/><rect x="38" y="206" width="26" height="26" rx="4" fill="#ff6d00"/><text x="51" y="224" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">4</text><text x="90" y="219" font-size="13" fill="#fff9c4" font-family="sans-serif" font-weight="bold">仮想通貨の相続計画</text><text x="90" y="234" font-size="11" fill="#ffecb3" font-family="sans-serif">マルチシグ設定 または 信託サービス（秘密鍵を安全に保管）</text><rect x="30" y="248" width="740" height="42" rx="8" fill="#880e4f" opacity="0.8"/><rect x="38" y="256" width="26" height="26" rx="4" fill="#e91e63"/><text x="51" y="274" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">5</text><text x="90" y="269" font-size="13" fill="#fce4ec" font-family="sans-serif" font-weight="bold">サブスクリプション一覧</text><text x="90" y="284" font-size="11" fill="#f8bbd0" font-family="sans-serif">解約すべきサービスのリスト作成（毎月の無駄払い防止）</text><rect x="30" y="298" width="740" height="35" rx="8" fill="#004d40" opacity="0.85"/><rect x="38" y="306" width="20" height="20" rx="3" fill="#00897b"/><text x="48" y="320" font-size="11" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">6</text><text x="90" y="319" font-size="13" fill="#b2dfdb" font-family="sans-serif" font-weight="bold">デジタル遺言 — 法的な遺言書にデジタル資産を明記</text></svg>


---

<!-- _class: lead -->
# まとめ

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">デジタル遺産 — 4つの核心</text><rect x="20" y="45" width="370" height="90" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="205" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">価値は物理遺産と同等以上</text><text x="205" y="90" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">SNS・写真・仮想通貨・サブスク</text><text x="205" y="108" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">整理しないと遺族が困る</text><text x="205" y="126" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">→ デジタル終活が必須</text><rect x="410" y="45" width="370" height="90" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="595" y="70" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">プラットフォーム間で対応バラバラ</text><text x="595" y="90" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Facebook・Google は設定あり</text><text x="595" y="108" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Twitter/Amazon は制限あり</text><text x="595" y="126" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">→ 統一基準なし</text><rect x="20" y="150" width="370" height="90" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="205" y="175" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">仮想通貨は秘密鍵が全て</text><text x="205" y="195" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">秘密鍵が失われると永久消失</text><text x="205" y="213" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">BTC流通量の約20%がすでに消失</text><text x="205" y="231" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">→ マルチシグ・信託が重要</text><rect x="410" y="150" width="370" height="90" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="595" y="175" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">AIによる「復活」は倫理未解決</text><text x="595" y="195" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">技術的には実現可能な時代</text><text x="595" y="213" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">同意・アイデンティティ・悪用が課題</text><text x="595" y="231" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">→ 法整備が急務</text></svg>
- デジタル遺産は**現代人にとって物理的遺産と同等以上の価値**を持つ
- プラットフォームごとに対応が異なり、統一基準がない
- 仮想通貨は秘密鍵の喪失で永久に失われるリスク
- AIによる死者の「復活」は技術的に可能だが倫理的に未解決
- **問い：** あなたが明日いなくなっても、デジタル人生は整理されているか？


---

# 参考文献

- - **学術研究:**
- - [Are the dead taking over Facebook? (Oxford, 2019)](https://academic.oup.com/)
- - [Digital Estate Planning (Stanford Law Review)](https://www.stanfordlawreview.org/)
- - **実用ガイド:**
- - [Google Inactive Account Manager](https://myaccount.google.com/inactive)
- - [Apple Digital Legacy](https://support.apple.com/digital-legacy)

