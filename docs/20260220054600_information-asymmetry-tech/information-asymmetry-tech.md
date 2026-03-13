---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "情報格差とプラットフォーム経済"
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
# 情報の非対称性が
テックを支配する

- アカロフのレモン市場理論とプラットフォーム
- 知っている側が常に勝つ構造
- 情報格差をどう逆転するか


---

# アジェンダ

> *情報非対称性の解消がプラットフォーム独占を崩す唯一のレバー*

- 1. 情報の非対称性とは何か
- 2. レモン市場理論（ノーベル賞）
- 3. プラットフォームと情報の非対称性
- 4. データが新しい非対称性を作る
- 5. 情報格差への対抗手段


---

<!-- _class: lead -->
# 情報の非対称性の基本

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/><rect x="40" y="60" width="200" height="120" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="105" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">売り手</text><text x="140" y="130" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">品質を知っている</text><text x="140" y="152" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63">情報優位</text><rect x="560" y="60" width="200" height="120" rx="12" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="660" y="105" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4fc3f7">買い手</text><text x="660" y="130" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">品質がわからない</text><text x="660" y="152" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#9e9e9e">情報劣位</text><rect x="280" y="90" width="240" height="60" rx="8" fill="#0d0d1a" stroke="#e91e63" stroke-width="1" stroke-dasharray="6,3"/><text x="400" y="118" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63">情報の非対称性</text><text x="400" y="138" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9e9e9e">Asymmetric Information</text><line x1="240" y1="120" x2="280" y2="120" stroke="#f9a825" stroke-width="2"/><polygon points="280,115 280,125 292,120" fill="#f9a825"/><line x1="520" y1="120" x2="560" y2="120" stroke="#4fc3f7" stroke-width="2"/><polygon points="520,115 520,125 508,120" fill="#4fc3f7"/><rect x="40" y="230" width="720" height="110" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="260" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#f9a825">情報格差が生む結果</text><rect x="60" y="272" width="200" height="52" rx="6" fill="#0d0d1a"/><text x="160" y="294" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">逆選択</text><text x="160" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">Adverse Selection</text><rect x="300" y="272" width="200" height="52" rx="6" fill="#0d0d1a"/><text x="400" y="294" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">モラルハザード</text><text x="400" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">Moral Hazard</text><rect x="540" y="272" width="200" height="52" rx="6" fill="#0d0d1a"/><text x="640" y="294" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">市場の失敗</text><text x="640" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">Market Failure</text></svg>


---

# 「レモン市場」理論（Akerlof, 1970）（1/2）

> *情報格差が良品を市場から追い出し欠陥品だけを残す*

- George Akerlof の論文「The Market for Lemons」（ノーベル経済学賞）
- ---
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="260" fill="#1a1a2e"/><rect x="30" y="20" width="160" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="110" y="52" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f9a825">売り手</text><text x="110" y="72" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">品質を知っている</text><text x="110" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">情報優位</text><rect x="610" y="20" width="160" height="80" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="690" y="52" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4fc3f7">買い手</text><text x="690" y="72" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">品質がわからない</text><text x="690" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">情報劣位</text><rect x="60" y="150" width="100" height="90" rx="8" fill="#2e7d32" stroke="#4caf50" stroke-width="2"/><text x="110" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">良質な車</text><text x="110" y="202" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a5d6a7">ピーチ</text><text x="110" y="220" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a5d6a7">80万円</text><rect x="190" y="150" width="100" height="90" rx="8" fill="#b71c1c" stroke="#ef9a9a" stroke-width="2"/><text x="240" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">欠陥車</text><text x="240" y="202" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ef9a9a">レモン</text><text x="240" y="220" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ef9a9a">30万円</text><rect x="320" y="155" width="160" height="80" rx="8" fill="#0d0d1a" stroke="#f9a825" stroke-width="1"/><text x="400" y="185" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825">平均価格</text><text x="400" y="205" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">55万円？</text><text x="400" y="222" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">買い手の見積もり</text><line x1="320" y1="195" x2="260" y2="195" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="480" y1="195" x2="610" y2="195" stroke="#4fc3f7" stroke-width="1.5" stroke-dasharray="4,3"/><polygon points="610,190 610,200 622,195" fill="#4fc3f7"/><text x="660" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4fc3f7">55万払う</text><text x="660" y="202" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">意向</text></svg>


---

# 「レモン市場」理論（Akerlof, 1970）（2/2）

> *悪貨が良貨を駆逐する構造はテック市場全域に存在する*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e"/><rect x="20" y="20" width="140" height="70" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="90" y="50" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">良質な車の売り手</text><text x="90" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">80万円の価値</text><rect x="20" y="120" width="140" height="70" rx="8" fill="#16213e" stroke="#ef9a9a" stroke-width="2"/><text x="90" y="150" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ef9a9a">欠陥車の売り手</text><text x="90" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">30万円の価値</text><rect x="340" y="70" width="140" height="60" rx="8" fill="#0d0d1a" stroke="#f9a825" stroke-width="2"/><text x="410" y="96" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825">平均価格55万</text><text x="410" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">買い手の提示</text><line x1="160" y1="55" x2="340" y2="100" stroke="#4caf50" stroke-width="1.5"/><line x1="160" y1="155" x2="340" y2="100" stroke="#ef9a9a" stroke-width="1.5"/><rect x="560" y="30" width="160" height="50" rx="8" fill="#1a237e" stroke="#4caf50" stroke-width="1" stroke-dasharray="5,3"/><text x="640" y="52" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9e9e9e">良質な売り手</text><text x="640" y="68" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">市場から撤退</text><rect x="560" y="110" width="160" height="50" rx="8" fill="#b71c1c" stroke="#ef9a9a" stroke-width="2"/><text x="640" y="132" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ef9a9a">欠陥車だけ残る</text><text x="640" y="148" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">市場崩壊へ</text><line x1="480" y1="100" x2="560" y2="55" stroke="#4caf50" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="480" y1="100" x2="560" y2="135" stroke="#ef9a9a" stroke-width="1.5"/><polygon points="556,50 560,55 551,57" fill="#4caf50"/><polygon points="556,130 560,135 551,137" fill="#ef9a9a"/><rect x="160" y="220" width="480" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="246" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e91e63">市場崩壊のメカニズム</text><text x="400" y="264" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">情報格差 → 逆選択 → 悪貨が良貨を駆逐する</text></svg>
- → 良質な車を持つ売り手は割に合わず市場から去る
- → 市場には「レモン（欠陥品）」だけ残る
- この構造は中古車以外のあらゆる市場に存在する


---

<!-- _class: lead -->
# テック業界のレモン市場

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#f9a825">テック業界のレモン市場</text><rect x="30" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="140" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e91e63">採用市場</text><text x="140" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">企業：応募者能力不明</text><text x="140" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">応募者：社内文化不明</text><text x="140" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ コーディング面接</text><text x="140" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ Glassdoor</text><rect x="290" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f9a825">中古デバイス市場</text><text x="400" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">買い手：状態を知れない</text><text x="400" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">売り手：欠陥を知っている</text><text x="400" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ Apple認定中古</text><text x="400" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ Geek Squad認定</text><rect x="550" y="60" width="220" height="130" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="660" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4fc3f7">フリーランス市場</text><text x="660" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">クライアント：スキル不明</text><text x="660" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">フリーランサー：実力知る</text><text x="660" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ Upwork評価</text><text x="660" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ ポートフォリオ</text><rect x="30" y="220" width="220" height="110" rx="10" fill="#16213e" stroke="#ab47bc" stroke-width="2"/><text x="140" y="248" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ab47bc">SaaS契約</text><text x="140" y="270" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">ベンダー：機能・制限知る</text><text x="140" y="290" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">顧客：隠れコスト不明</text><text x="140" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ 無料トライアル</text><rect x="290" y="220" width="220" height="110" rx="10" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="400" y="248" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#66bb6a">アプリストア</text><text x="400" y="270" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">ユーザー：品質不明</text><text x="400" y="290" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">開発者：欠陥を知る</text><text x="400" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ レビュー・評価</text><rect x="550" y="220" width="220" height="110" rx="10" fill="#16213e" stroke="#ff7043" stroke-width="2"/><text x="660" y="248" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ff7043">暗号資産市場</text><text x="660" y="270" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">投資家：内部情報なし</text><text x="660" y="290" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">開発者：ロードマップ知る</text><text x="660" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">→ ホワイトペーパー</text></svg>


---

# 採用市場：情報の非対称性の典型（1/2）

> *企業も応募者も互いの本質を面接前には知ることができない*

- **企業が知らないこと：**
- 応募者の本当の能力・文化的フィット・退職リスク
- ---
- **応募者が知らないこと：**
- 会社の実際の文化・技術的負債の深さ・マネジメントの質
- ---


---

# 採用市場：情報の非対称性の典型（2/2）

> *コーディング面接が業務と無関係な新たな非対称性を生む逆説*

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">採用市場のシグナリング戦略</text><rect x="20" y="50" width="170" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="105" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f9a825">シグナリング</text><text x="105" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">応募者 → 企業</text><text x="105" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">学歴・資格</text><text x="105" y="145" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">GitHub実績</text><text x="105" y="165" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">OSSコントリビュート</text><text x="105" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">推薦状</text><text x="105" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">→ Spenceモデル</text><rect x="210" y="50" width="170" height="200" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="295" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4fc3f7">スクリーニング</text><text x="295" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">企業 → 応募者</text><text x="295" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">コーディング面接</text><text x="295" y="145" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">技術課題</text><text x="295" y="165" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">試用期間</text><text x="295" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">ペア作業</text><text x="295" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">→ 能力の直接測定</text><rect x="400" y="50" width="170" height="200" rx="10" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="485" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#66bb6a">情報平準化</text><text x="485" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">双方向</text><text x="485" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">Glassdoor</text><text x="485" y="145" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">Blind</text><text x="485" y="165" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">LinkedInレビュー</text><text x="485" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">転職エージェント</text><text x="485" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">→ 格差を縮小</text><rect x="590" y="50" width="190" height="200" rx="10" fill="#16213e" stroke="#ab47bc" stroke-width="2"/><text x="685" y="75" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ab47bc">逆説</text><text x="685" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">コーディング面接は</text><text x="685" y="120" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">「業務と無関係な」</text><text x="685" y="140" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">問題を解ける人</text><text x="685" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">を選ぶ傾向</text><text x="685" y="185" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">→ 新たな非対称性</text><text x="685" y="205" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">を生む可能性</text></svg>
- **逆説：** コーディング面接は「業務と無関係な問題を解ける人」を選ぶ


---

<!-- _class: lead -->
# プラットフォームの情報優位

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e"/><ellipse cx="400" cy="180" rx="100" ry="60" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="400" y="170" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">プラットフォーム</text><text x="400" y="192" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825">全データを保有</text><rect x="20" y="20" width="155" height="80" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="97" y="50" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4fc3f7">ユーザー</text><text x="97" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">行動データを提供</text><text x="97" y="88" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">← 搾取される側</text><rect x="20" y="150" width="155" height="80" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="97" y="180" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4fc3f7">出品者/開発者</text><text x="97" y="200" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">売上データを提供</text><text x="97" y="218" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">← 競合される側</text><rect x="20" y="280" width="155" height="60" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="97" y="308" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4fc3f7">広告主</text><text x="97" y="326" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">効果を測定できない</text><rect x="625" y="20" width="155" height="80" rx="8" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="702" y="50" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#66bb6a">収集情報</text><text x="702" y="68" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">行動・嗜好・関係</text><text x="702" y="86" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">政治・健康・位置</text><rect x="625" y="130" width="155" height="80" rx="8" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="702" y="160" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#66bb6a">活用方法</text><text x="702" y="178" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">広告ターゲティング</text><text x="702" y="196" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">自社商品開発</text><rect x="625" y="240" width="155" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="702" y="268" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63">問題</text><text x="702" y="288" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">独禁法・プライバシー</text><text x="702" y="306" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">倫理・格差拡大</text><line x1="175" y1="60" x2="300" y2="160" stroke="#4fc3f7" stroke-width="1.5"/><polygon points="296,155 300,160 292,162" fill="#4fc3f7"/><line x1="175" y1="190" x2="300" y2="185" stroke="#4fc3f7" stroke-width="1.5"/><polygon points="296,181 300,185 296,189" fill="#4fc3f7"/><line x1="175" y1="310" x2="300" y2="200" stroke="#4fc3f7" stroke-width="1.5"/><polygon points="300,195 300,200 294,198" fill="#4fc3f7"/><line x1="500" y1="165" x2="625" y2="60" stroke="#66bb6a" stroke-width="1.5"/><polygon points="621,64 625,60 628,68" fill="#66bb6a"/><line x1="500" y1="185" x2="625" y2="170" stroke="#66bb6a" stroke-width="1.5"/><polygon points="621,166 625,170 621,174" fill="#66bb6a"/><line x1="500" y1="195" x2="625" y2="280" stroke="#e91e63" stroke-width="1.5"/><polygon points="621,276 625,280 621,284" fill="#e91e63"/></svg>


---

# Amazonはどれだけ情報優位か（1/2）

> *出品者の売上データを使って競合商品を開発するプレイヤー兼審判*

- **Amazonが知っていること（出品者への優位）：**
- - どの商品がどの地域でどの時間帯に売れるか
- - 価格弾力性（いくらまで値上げしても売れるか）
- - 返品率・レビューの信頼性
- ---


---

# Amazonはどれだけ情報優位か（2/2）

> *FTCとEUが独禁法で対応を開始、プレイヤー兼審判構造に限界*

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">Amazonのプレイヤー兼審判問題</text><rect x="30" y="55" width="180" height="90" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="120" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4fc3f7">サードパーティ出品者</text><text x="120" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">売上データを提供</text><text x="120" y="122" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">マーケットプレイス利用</text><rect x="310" y="55" width="180" height="90" rx="10" fill="#f9a825" opacity="0.2" stroke="#f9a825" stroke-width="2"/><text x="400" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f9a825">Amazon</text><text x="400" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff">プラットフォーム運営</text><text x="400" y="122" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e91e63">AND 自社商品販売</text><rect x="590" y="55" width="180" height="90" rx="10" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="680" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#66bb6a">消費者</text><text x="680" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">比較できない</text><text x="680" y="122" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">優先表示を知らない</text><line x1="210" y1="100" x2="310" y2="100" stroke="#4fc3f7" stroke-width="2"/><polygon points="306,95 310,100 306,105" fill="#4fc3f7"/><text x="260" y="90" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9e9e9e">販売データ</text><line x1="490" y1="100" x2="590" y2="100" stroke="#66bb6a" stroke-width="2"/><polygon points="586,95 590,100 586,105" fill="#66bb6a"/><text x="540" y="90" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9e9e9e">商品提示</text><rect x="120" y="185" width="180" height="70" rx="8" fill="#b71c1c" stroke="#ef9a9a" stroke-width="1"/><text x="210" y="210" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ef9a9a">自社ブランド商品を開発</text><text x="210" y="230" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">AmazonBasics等</text><text x="210" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">競合商品を複製</text><rect x="500" y="185" width="180" height="70" rx="8" fill="#1a237e" stroke="#7986cb" stroke-width="1"/><text x="590" y="210" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#7986cb">規制の動き</text><text x="590" y="230" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">FTC独禁法調査</text><text x="590" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">EU デジタル市場法</text><line x1="400" y1="145" x2="210" y2="185" stroke="#e91e63" stroke-width="1.5"/><polygon points="214,181 210,185 216,188" fill="#e91e63"/><line x1="400" y1="145" x2="590" y2="185" stroke="#7986cb" stroke-width="1.5"/><polygon points="586,181 590,185 594,182" fill="#7986cb"/></svg>
- → **プレイヤーであり審判でもある**構造
- → FTC・EUが独禁法調査中


---

# ユーザーとプラットフォームの情報格差（1/2）

> *Facebookはスクロール速度から政治傾向・メンタルまで推論する*

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">Facebookが収集するユーザーデータ</text><rect x="30" y="50" width="340" height="200" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="200" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4fc3f7">ユーザーが意識するデータ</text><text x="200" y="102" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">投稿・いいね・コメント</text><text x="200" y="122" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">友人関係・グループ参加</text><text x="200" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">プロフィール情報</text><text x="200" y="162" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">（ユーザーが「提供している」と思っているもの）</text><rect x="430" y="50" width="340" height="200" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e91e63">ユーザーが知らないデータ収集</text><text x="600" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">スクロール速度・停止時間</text><text x="600" y="120" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">政治的傾向・宗教・メンタル</text><text x="600" y="140" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">位置情報・デバイス情報</text><text x="600" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">外部サイトの閲覧履歴</text><text x="600" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">（Facebookが推論した「隠れた属性」）</text><text x="200" y="230" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#66bb6a">ユーザーが知っている範囲</text><text x="600" y="230" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">Facebookだけが知る範囲</text></svg>
- - どの投稿に何秒止まったか（スクロール速度）
- - いつ、誰と会話したか
- - 政治的傾向・宗教・メンタルヘルス状態


---

# ユーザーとプラットフォームの情報格差（2/2）

> *分断促進アルゴリズムを知りながら継続した内部告発の実態*

- **Facebookが2021年内部告発で示されたこと：**
- 自社のアルゴリズムが「分断」「怒り」を促進すると知りながら継続
- → 情報を持つ側が利益のために使う典型例
- ---
- ユーザーは「自分が商品」であることすら知らない


---

# まとめ：情報格差と戦う方法

> *シグナリング・評判・規制・技術の4手段で格差を縮小できる*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f9a825">情報格差への対抗手段</text><rect x="20" y="50" width="175" height="220" rx="10" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="107" y="78" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4fc3f7">シグナリング</text><text x="107" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">情報劣位側が</text><text x="107" y="117" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">信頼性を示す</text><text x="107" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">認定制度</text><text x="107" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">資格・学歴</text><text x="107" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">ポートフォリオ</text><text x="107" y="202" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">保証・返金制度</text><text x="107" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4fc3f7">例: Apple認定中古</text><rect x="210" y="50" width="175" height="220" rx="10" fill="#16213e" stroke="#66bb6a" stroke-width="2"/><text x="297" y="78" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#66bb6a">評判システム</text><text x="297" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">過去の行動を</text><text x="297" y="117" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">可視化する</text><text x="297" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">Glassdoor</text><text x="297" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">Amazonレビュー</text><text x="297" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">Upworkスコア</text><text x="297" y="202" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">App Storeレーティング</text><text x="297" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#66bb6a">例: Blind匿名レビュー</text><rect x="400" y="50" width="175" height="220" rx="10" fill="#16213e" stroke="#ab47bc" stroke-width="2"/><text x="487" y="78" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ab47bc">規制・法整備</text><text x="487" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">強制的に</text><text x="487" y="117" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">情報開示させる</text><text x="487" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">GDPR（EU）</text><text x="487" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">デジタル市場法</text><text x="487" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">独占禁止法</text><text x="487" y="202" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">アルゴリズム開示</text><text x="487" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ab47bc">例: FTC対Amazon</text><rect x="590" y="50" width="190" height="220" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="685" y="78" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f9a825">技術的解決</text><text x="685" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">技術で格差を</text><text x="685" y="117" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9e9e9e">縮小する</text><text x="685" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">ブロックチェーン</text><text x="685" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">オープンソース</text><text x="685" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">透明性レポート</text><text x="685" y="202" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">プライバシー技術</text><text x="685" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f9a825">例: 差分プライバシー</text></svg>
- ✅ **情報の非対称性はあらゆる市場に存在** — 知っている側が勝つ
- ✅ **プラットフォームはユーザー・出品者より圧倒的に情報を持つ**
- ✅ **エンジニアとして：データを持つ側の倫理責任を考える**

