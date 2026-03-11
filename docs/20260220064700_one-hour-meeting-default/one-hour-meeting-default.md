---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "会議の時間経済学"
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
# 「1時間会議」のデフォルトが
組織を壊す

- カレンダーアプリの1時間デフォルトが無数の会議を1時間にしている
- Parkinson の法則：仕事は与えられた時間を使い切る
- 会議コストの可視化と非同期コミュニケーションへの転換


---

# アジェンダ

- 1. 会議の実態とコスト
- 2. Parkinsonの法則
- 3. 最適な会議時間の研究
- 4. 非同期コミュニケーションの台頭
- 5. 会議改革の実践


---

<!-- _class: lead -->
# 会議の実態とコスト


---

# 会議は最大のコスト中心（1/2）

- **平均的な管理職の1週間（Bain & Company 2014年）：**
- 45%の時間を会議に使っている
- 無駄な会議コスト：米国全体で年間約37兆円（$283 billion）
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e" rx="12"/><text x="400" y="32" text-anchor="middle" font-size="16" fill="#f9a825" font-weight="bold" font-family="sans-serif">管理職の週間時間配分</text><rect x="60" y="50" width="200" height="180" fill="#e91e63" rx="6"/><text x="160" y="145" text-anchor="middle" font-size="28" fill="#ffffff" font-weight="bold" font-family="sans-serif">45%</text><text x="160" y="170" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">会議</text><rect x="290" y="100" width="150" height="130" fill="#3f51b5" rx="6"/><text x="365" y="170" text-anchor="middle" font-size="24" fill="#ffffff" font-weight="bold" font-family="sans-serif">30%</text><text x="365" y="195" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">個人作業</text><rect x="470" y="130" width="120" height="100" fill="#00897b" rx="6"/><text x="530" y="185" text-anchor="middle" font-size="20" fill="#ffffff" font-weight="bold" font-family="sans-serif">15%</text><text x="530" y="207" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">メール</text><rect x="620" y="155" width="100" height="75" fill="#f57c00" rx="6"/><text x="670" y="197" text-anchor="middle" font-size="16" fill="#ffffff" font-weight="bold" font-family="sans-serif">10%</text><text x="670" y="216" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">その他</text><line x1="50" y1="230" x2="750" y2="230" stroke="#444466" stroke-width="1"/><text x="400" y="260" text-anchor="middle" font-size="12" fill="#888899" font-family="sans-serif">出典: Bain &amp; Company 2014</text></svg>


---

# 会議は最大のコスト中心（2/2）

- **会議の非効率の実態（Atlassian調査）：**
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">会議の非効率：衝撃のデータ</text><rect x="40" y="55" width="216" height="36" fill="#e91e63" rx="4"/><rect x="40" y="55" width="332" height="36" fill="#e91e63" rx="4" opacity="0"/><rect x="40" y="55" width="216" height="36" fill="#e91e63" rx="4"/><text x="265" y="79" text-anchor="middle" font-size="22" fill="#ffffff" font-weight="bold" font-family="sans-serif">65%</text><text x="560" y="79" text-anchor="start" font-size="13" fill="#ccccdd" font-family="sans-serif">会議が生産性を妨げていると感じる管理職</text><rect x="40" y="110" width="188" height="36" fill="#f57c00" rx="4"/><text x="237" y="134" text-anchor="middle" font-size="22" fill="#ffffff" font-weight="bold" font-family="sans-serif">47%</text><text x="560" y="134" text-anchor="start" font-size="13" fill="#ccccdd" font-family="sans-serif">会議中に他の作業をしている参加者</text><rect x="40" y="165" width="146" height="36" fill="#3f51b5" rx="4"/><text x="195" y="189" text-anchor="middle" font-size="22" fill="#ffffff" font-weight="bold" font-family="sans-serif">38%</text><text x="560" y="189" text-anchor="start" font-size="13" fill="#ccccdd" font-family="sans-serif">全く不要な会議に出席させられた経験</text><rect x="40" y="220" width="116" height="36" fill="#00897b" rx="4"/><text x="165" y="244" text-anchor="middle" font-size="22" fill="#ffffff" font-weight="bold" font-family="sans-serif">29%</text><text x="560" y="244" text-anchor="start" font-size="13" fill="#ccccdd" font-family="sans-serif">アジェンダのない会議の割合</text><line x1="40" y1="270" x2="760" y2="270" stroke="#333355" stroke-width="1"/><text x="400" y="290" text-anchor="middle" font-size="11" fill="#666688" font-family="sans-serif">出典: Atlassian「You Waste A Lot of Time at Work」調査</text></svg>


---

# Parkinsonの法則（1/2）

- **C. Northcote Parkinson（1955年 The Economist）：**
- 「仕事は与えられた時間を使い切るように膨張する」
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">Parkinsonの法則：会議時間の膨張</text><rect x="60" y="60" width="120" height="80" fill="#00897b" rx="8" opacity="0.9"/><text x="120" y="96" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">実質的な</text><text x="120" y="113" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">内容</text><text x="120" y="160" text-anchor="middle" font-size="11" fill="#aaaacc" font-family="sans-serif">25分相当</text><rect x="220" y="60" width="220" height="80" fill="#e91e63" rx="8" opacity="0.9"/><text x="330" y="96" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">Parkinsons膨張</text><text x="330" y="113" text-anchor="middle" font-size="11" fill="#ffccdd" font-family="sans-serif">（雑談・脱線・繰り返し）</text><text x="330" y="160" text-anchor="middle" font-size="11" fill="#aaaacc" font-family="sans-serif">+35分の無駄</text><rect x="60" y="60" width="380" height="80" fill="none" stroke="#f9a825" stroke-width="2" rx="8" stroke-dasharray="6,3"/><text x="250" y="170" text-anchor="middle" font-size="20" fill="#f9a825" font-weight="bold" font-family="sans-serif">1時間会議 = 60分消費</text><polygon points="490,100 530,85 530,115" fill="#f9a825"/><rect x="530" y="60" width="120" height="80" fill="#3f51b5" rx="8" opacity="0.9"/><text x="590" y="96" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">同じ内容</text><rect x="530" y="60" width="120" height="80" fill="none" stroke="#f9a825" stroke-width="2" rx="8" stroke-dasharray="6,3"/><text x="590" y="160" text-anchor="middle" font-size="20" fill="#00897b" font-weight="bold" font-family="sans-serif">30分会議 = 25分終了</text><text x="400" y="220" text-anchor="middle" font-size="14" fill="#ccccdd" font-family="sans-serif">設定時間を短くするだけで会議は短くなる</text><text x="400" y="260" text-anchor="middle" font-size="13" fill="#f9a825" font-family="sans-serif">「30分のカレンダー招待」が最も効果的な改善策</text></svg>


---

# Parkinsonの法則（2/2）

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">会議時間短縮の実践例</text><rect x="40" y="55" width="340" height="120" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="210" y="82" text-anchor="middle" font-size="14" fill="#e91e63" font-weight="bold" font-family="sans-serif">Amazonの「沈黙の6ページ」</text><text x="60" y="108" font-size="12" fill="#ccccdd" font-family="sans-serif">・会議の最初15分は全員が文書を読む</text><text x="60" y="130" font-size="12" fill="#ccccdd" font-family="sans-serif">・プレゼンではなく深い討論を実現</text><text x="60" y="152" font-size="12" fill="#ccccdd" font-family="sans-serif">・思考を整理してから議論する文化</text><rect x="420" y="55" width="340" height="120" rx="10" fill="#16213e" stroke="#00897b" stroke-width="2"/><text x="590" y="82" text-anchor="middle" font-size="14" fill="#00897b" font-weight="bold" font-family="sans-serif">立ち会議（Standing Meeting）</text><text x="440" y="108" font-size="12" fill="#ccccdd" font-family="sans-serif">・Google・Appleが採用</text><text x="440" y="130" font-size="12" fill="#ccccdd" font-family="sans-serif">・平均34%短縮（Washington Univ.）</text><text x="440" y="152" font-size="12" fill="#ccccdd" font-family="sans-serif">・物理的不快感が話を凝縮する</text><rect x="180" y="195" width="440" height="60" rx="8" fill="#f9a825" opacity="0.12" stroke="#f9a825" stroke-width="1"/><text x="400" y="220" text-anchor="middle" font-size="13" fill="#f9a825" font-weight="bold" font-family="sans-serif">共通原則：制約がParkinsonの膨張を防ぐ</text><text x="400" y="244" text-anchor="middle" font-size="12" fill="#ccccdd" font-family="sans-serif">時間・姿勢・形式の制約 → 本質への集中を強制</text></svg>
- **Amazonの「沈黙の6ページ」：**
- 会議の最初の10〜15分は全員が文書を読む時間
- プレゼンテーション形式より深い討論が可能
- ---
- **GoogleとAppleの「立ち会議（Standing Meeting）」：**
- 立ったまま行う会議は平均34%短くなる（Washington University研究）


---

# 非同期コミュニケーション（1/2）

- **同期 vs 非同期：どちらが思考の質を上げるか**
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">同期（会議）vs 非同期コミュニケーション</text><rect x="30" y="50" width="355" height="220" fill="#1e1e3a" rx="10" stroke="#e91e63" stroke-width="2"/><text x="207" y="75" text-anchor="middle" font-size="14" fill="#e91e63" font-weight="bold" font-family="sans-serif">同期（リアルタイム会議）</text><text x="50" y="105" font-size="12" fill="#ccccdd" font-family="sans-serif">✗  全員が同じ時間に拘束される</text><text x="50" y="128" font-size="12" fill="#ccccdd" font-family="sans-serif">✗  思考する前に話すことを強要される</text><text x="50" y="151" font-size="12" fill="#ccccdd" font-family="sans-serif">✗  声が大きい人の意見が通りやすい</text><text x="50" y="174" font-size="12" fill="#ccccdd" font-family="sans-serif">✗  「分かった気」になりやすい</text><text x="50" y="210" font-size="12" fill="#f9a825" font-family="sans-serif">✓  感情的な解決・創造的なブレスト</text><text x="50" y="233" font-size="12" fill="#f9a825" font-family="sans-serif">✓  重要な意思決定・合意形成</text><rect x="415" y="50" width="355" height="220" fill="#1e1e3a" rx="10" stroke="#00897b" stroke-width="2"/><text x="592" y="75" text-anchor="middle" font-size="14" fill="#00897b" font-weight="bold" font-family="sans-serif">非同期（Slack / Notion / Loom）</text><text x="435" y="105" font-size="12" fill="#ccccdd" font-family="sans-serif">✓  自分のペースで深く考えられる</text><text x="435" y="128" font-size="12" fill="#ccccdd" font-family="sans-serif">✓  書くことで思考が整理される</text><text x="435" y="151" font-size="12" fill="#ccccdd" font-family="sans-serif">✓  記録が残り検索できる</text><text x="435" y="174" font-size="12" fill="#ccccdd" font-family="sans-serif">✓  タイムゾーンを超えて協業できる</text><text x="435" y="210" font-size="12" fill="#e91e63" font-family="sans-serif">✗  緊急時の即時対応は苦手</text><text x="435" y="233" font-size="12" fill="#e91e63" font-family="sans-serif">✗  ニュアンスが伝わりにくい場合も</text></svg>


---

# 非同期コミュニケーション（2/2）

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="280" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">会議を非同期に置き換えるフロー</text><rect x="40" y="55" width="700" height="50" rx="8" fill="#16213e" stroke="#333355" stroke-width="1"/><text x="110" y="85" text-anchor="middle" font-size="13" fill="#ccccdd" font-family="sans-serif">進捗報告</text><polygon points="200,80 220,70 220,90" fill="#f9a825"/><rect x="230" y="65" width="160" height="30" rx="6" fill="#3f51b5"/><text x="310" y="85" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">Slack 自動スタンドアップ</text><text x="110" y="130" text-anchor="middle" font-size="13" fill="#ccccdd" font-family="sans-serif">情報共有</text><polygon points="200,125 220,115 220,135" fill="#f9a825"/><rect x="230" y="115" width="160" height="30" rx="6" fill="#00897b"/><text x="310" y="135" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">Notion / Wiki</text><text x="110" y="180" text-anchor="middle" font-size="13" fill="#ccccdd" font-family="sans-serif">フィードバック</text><polygon points="200,175 220,165 220,185" fill="#f9a825"/><rect x="230" y="165" width="160" height="30" rx="6" fill="#e91e63"/><text x="310" y="185" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">Loom 動画メッセージ</text><rect x="440" y="55" width="300" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="590" y="82" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">効果の実績</text><text x="460" y="108" font-size="12" fill="#ccccdd" font-family="sans-serif">73%の企業が生産性向上を報告</text><text x="460" y="130" font-size="12" fill="#ccccdd" font-family="sans-serif">「1週間会議ゼロ」トライアル</text><text x="460" y="158" font-size="12" fill="#00897b" font-family="sans-serif">深い作業時間が平均2.4倍に</text><text x="460" y="180" font-size="12" fill="#00897b" font-family="sans-serif">決定の文書化率が大幅向上</text><text x="400" y="245" text-anchor="middle" font-size="13" fill="#888899" font-family="sans-serif">「会議を半分にするだけで、ほとんどの会社の生産性は倍になる」</text></svg>
- - 進捗報告（→ Slackの自動スタンドアップ）
- - 情報共有（→ Notionなどのwiki）
- - フィードバック（→ Loomの動画メッセージ）
- ---
- 「1週間会議ゼロ」を試した企業の73%が生産性向上を報告


---

# まとめ：会議を科学する

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="340" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">会議改革ロードマップ</text><rect x="40" y="50" width="160" height="80" fill="#3f51b5" rx="8"/><text x="120" y="86" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">STEP 1</text><text x="120" y="105" text-anchor="middle" font-size="11" fill="#ccddff" font-family="sans-serif">カレンダーの</text><text x="120" y="120" text-anchor="middle" font-size="11" fill="#ccddff" font-family="sans-serif">デフォルト30分化</text><polygon points="205,90 225,80 225,100" fill="#f9a825"/><rect x="230" y="50" width="160" height="80" fill="#e91e63" rx="8"/><text x="310" y="86" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">STEP 2</text><text x="310" y="105" text-anchor="middle" font-size="11" fill="#ffccdd" font-family="sans-serif">アジェンダ必須化</text><text x="310" y="120" text-anchor="middle" font-size="11" fill="#ffccdd" font-family="sans-serif">（目的・成果を明記）</text><polygon points="395,90 415,80 415,100" fill="#f9a825"/><rect x="420" y="50" width="160" height="80" fill="#00897b" rx="8"/><text x="500" y="86" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">STEP 3</text><text x="500" y="105" text-anchor="middle" font-size="11" fill="#ccffee" font-family="sans-serif">非同期ツール導入</text><text x="500" y="120" text-anchor="middle" font-size="11" fill="#ccffee" font-family="sans-serif">（Slack / Notion / Loom）</text><polygon points="585,90 605,80 605,100" fill="#f9a825"/><rect x="610" y="50" width="150" height="80" fill="#f57c00" rx="8"/><text x="685" y="86" text-anchor="middle" font-size="13" fill="#ffffff" font-weight="bold" font-family="sans-serif">STEP 4</text><text x="685" y="105" text-anchor="middle" font-size="11" fill="#ffeedd" font-family="sans-serif">週次レビューで</text><text x="685" y="120" text-anchor="middle" font-size="11" fill="#ffeedd" font-family="sans-serif">会議数を最適化</text><rect x="40" y="165" width="720" height="130" fill="#12122a" rx="10" stroke="#333355" stroke-width="1"/><text x="400" y="192" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">今日から始める3つのアクション</text><text x="70" y="222" font-size="13" fill="#ffffff" font-family="sans-serif">✅  次の会議招待を1時間→30分に変更する</text><text x="70" y="252" font-size="13" fill="#ffffff" font-family="sans-serif">✅  「この会議、メールで済まないか？」と自問する</text><text x="70" y="282" font-size="13" fill="#ffffff" font-family="sans-serif">✅  週に1つ、会議を削除してみる</text></svg>
- 「会議を半分にするだけで、ほとんどの会社の生産性は倍になる」

