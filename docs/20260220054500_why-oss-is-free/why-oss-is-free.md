---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "オープンソースの経済学"
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
# なぜ人は無料で
OSSを作るか

- 経済学では説明できない動機の解剖
- 評判資本・内発的動機・コモンズの逆説
- GitHubが変えたOSSの生態系
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="60" text-anchor="middle" font-size="22" fill="#f9a825" font-family="sans-serif" font-weight="bold">OSS = Open Source Software</text><circle cx="200" cy="170" r="70" fill="#16213e" stroke="#f9a825" stroke-width="3"/><text x="200" y="160" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">ソースコード</text><text x="200" y="180" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">公開</text><circle cx="400" cy="170" r="70" fill="#16213e" stroke="#e91e63" stroke-width="3"/><text x="400" y="160" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">無料で</text><text x="400" y="180" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">利用可能</text><circle cx="600" cy="170" r="70" fill="#16213e" stroke="#4caf50" stroke-width="3"/><text x="600" y="160" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">誰でも</text><text x="600" y="180" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif">改変可能</text><text x="400" y="280" text-anchor="middle" font-size="16" fill="#aaaaaa" font-family="sans-serif">では、誰が「なぜ」作るのか？</text></svg>


---

# アジェンダ

- 1. 経済学的パラドックス
- 2. OSSを支える3つの動機
- 3. コモンズの悲劇とその解決
- 4. 企業のOSS戦略：なぜ会社がOSSを作るか
- 5. OSSの持続可能性問題


---

<!-- _class: lead -->
# 経済学的パラドックス


---

# なぜ合理的な人間が無料で働くのか（1/2）

- **古典的経済学の予測：**
- 人間は自己利益を最大化する
- → 無償労働は「合理的でない」→ 起きないはず
- ---
- **現実：**
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e" rx="10"/><rect x="40" y="40" width="320" height="140" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="80" text-anchor="middle" font-size="15" fill="#e91e63" font-family="sans-serif" font-weight="bold">古典経済学の予測</text><text x="200" y="110" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">合理的人間 = 利己的</text><text x="200" y="135" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">無償労働は起きない</text><text x="200" y="160" text-anchor="middle" font-size="18" fill="#e91e63" font-family="sans-serif">✗ 予測</text><rect x="440" y="40" width="320" height="140" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="80" text-anchor="middle" font-size="15" fill="#4caf50" font-family="sans-serif" font-weight="bold">現実</text><text x="600" y="110" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">Linux: 15,000人超が貢献</text><text x="600" y="135" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">価値: 数十億ドル規模</text><text x="600" y="160" text-anchor="middle" font-size="18" fill="#4caf50" font-family="sans-serif">✓ 現実</text><polygon points="370,110 430,100 430,120" fill="#f9a825"/><line x1="370" y1="110" x2="440" y2="110" stroke="#f9a825" stroke-width="3"/></svg>


---

# なぜ合理的な人間が無料で働くのか（2/2）

- - Linux：世界の97%のサーバー、100%のスーパーコンピュータで動作
- - 累計コントリビューター：15,000人以上
- - 推定コード価値：数十億ドル
- → これはどう説明できるか？
- ---
- 経済学者はこれを長らく「謎」と呼んでいた


---

<!-- _class: lead -->
# OSSを支える3つの動機

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="50" text-anchor="middle" font-size="22" fill="#f9a825" font-family="sans-serif" font-weight="bold">OSSへの貢献動機の分類</text><circle cx="400" cy="200" r="60" fill="#f9a825" fill-opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="400" y="195" text-anchor="middle" font-size="14" fill="#f9a825" font-family="sans-serif" font-weight="bold">OSS</text><text x="400" y="215" text-anchor="middle" font-size="12" fill="#f9a825" font-family="sans-serif">貢献</text><rect x="30" y="80" width="180" height="100" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="120" y="110" text-anchor="middle" font-size="14" fill="#e91e63" font-family="sans-serif" font-weight="bold">評判資本</text><text x="120" y="135" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">採用・転職に有利</text><text x="120" y="155" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">業界での認知</text><rect x="30" y="230" width="180" height="100" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="120" y="260" text-anchor="middle" font-size="14" fill="#4caf50" font-family="sans-serif" font-weight="bold">自己使用改善</text><text x="120" y="285" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">バグ修正の動機</text><text x="120" y="305" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">かゆいところ</text><rect x="590" y="80" width="180" height="100" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="680" y="110" text-anchor="middle" font-size="14" fill="#2196f3" font-family="sans-serif" font-weight="bold">内発的動機</text><text x="680" y="135" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">楽しさ・達成感</text><text x="680" y="155" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">フロー状態</text><rect x="590" y="230" width="180" height="100" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/><text x="680" y="260" text-anchor="middle" font-size="14" fill="#ff9800" font-family="sans-serif" font-weight="bold">利他性・共有</text><text x="680" y="285" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">コミュニティへの</text><text x="680" y="305" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">貢献意識</text><line x1="210" y1="130" x2="345" y2="185" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4"/><line x1="210" y1="280" x2="345" y2="215" stroke="#4caf50" stroke-width="1.5" stroke-dasharray="4"/><line x1="590" y1="130" x2="455" y2="185" stroke="#2196f3" stroke-width="1.5" stroke-dasharray="4"/><line x1="590" y1="280" x2="455" y2="215" stroke="#ff9800" stroke-width="1.5" stroke-dasharray="4"/><text x="400" y="390" text-anchor="middle" font-size="13" fill="#888888" font-family="sans-serif">GitHub Survey 2023 / Lerner &amp; Tirole (2002) より</text></svg>


---

# 動機1：評判資本と「技能のシグナリング」（1/2）

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="260" fill="#1a1a2e" rx="12"/><text x="400" y="28" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">OSS貢献 → 評判資本の蓄積フロー</text><rect x="30" y="50" width="130" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="95" y="78" text-anchor="middle" font-size="12" fill="#4caf50" font-weight="bold" font-family="sans-serif">OSS貢献</text><text x="95" y="98" text-anchor="middle" font-size="10" fill="#ccccdd" font-family="sans-serif">コード・レビュー</text><polygon points="165,80 185,70 185,90" fill="#f9a825"/><rect x="190" y="50" width="130" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="255" y="78" text-anchor="middle" font-size="12" fill="#f9a825" font-weight="bold" font-family="sans-serif">GitHub公開</text><text x="255" y="98" text-anchor="middle" font-size="10" fill="#ccccdd" font-family="sans-serif">コミット履歴</text><polygon points="325,80 345,70 345,90" fill="#f9a825"/><rect x="350" y="50" width="130" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="415" y="78" text-anchor="middle" font-size="12" fill="#e91e63" font-weight="bold" font-family="sans-serif">技術力証明</text><text x="415" y="98" text-anchor="middle" font-size="10" fill="#ccccdd" font-family="sans-serif">採用担当者が確認</text><polygon points="485,80 505,70 505,90" fill="#f9a825"/><rect x="510" y="50" width="130" height="60" rx="8" fill="#16213e" stroke="#3f51b5" stroke-width="2"/><text x="575" y="78" text-anchor="middle" font-size="12" fill="#3f51b5" font-weight="bold" font-family="sans-serif">採用優位</text><text x="575" y="98" text-anchor="middle" font-size="10" fill="#ccccdd" font-family="sans-serif">年収・機会向上</text><polygon points="645,80 665,70 665,90" fill="#f9a825"/><rect x="670" y="50" width="100" height="60" rx="8" fill="#f9a825" opacity="0.2" stroke="#f9a825" stroke-width="2"/><text x="720" y="78" text-anchor="middle" font-size="12" fill="#f9a825" font-weight="bold" font-family="sans-serif">評判</text><text x="720" y="98" text-anchor="middle" font-size="10" fill="#f9a825" font-family="sans-serif">資本</text><rect x="30" y="140" width="350" height="90" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="1"/><text x="205" y="164" text-anchor="middle" font-size="13" fill="#4caf50" font-weight="bold" font-family="sans-serif">シグナリング理論（Spence, 1973）</text><text x="50" y="188" font-size="12" fill="#ccccdd" font-family="sans-serif">採用側の情報非対称を解消する</text><text x="50" y="210" font-size="12" fill="#ccccdd" font-family="sans-serif">「コードは履歴書より雄弁」</text><rect x="420" y="140" width="350" height="90" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="595" y="164" text-anchor="middle" font-size="13" fill="#e91e63" font-weight="bold" font-family="sans-serif">コストベネフィット計算</text><text x="440" y="188" font-size="12" fill="#ccccdd" font-family="sans-serif">無償時間投資 → 長期的キャリア利得</text><text x="440" y="210" font-size="12" fill="#f9a825" font-family="sans-serif">Linus: 院卒就職に有利（1991年）</text></svg>
- **評判資本（Reputation Capital）理論：**
- OSS貢献は「履歴書」として機能する
- ---
- **具体的なメリット：**
- - 採用担当者がGitHubを見て採用を決める


---

# 動機1：評判資本と「技能のシグナリング」（2/2）

- - Linux カーネルコミッターはどの会社でも重宝される
- - 人気OSSのメンテナは業界の著名人になれる
- ---
- **Linus Torvalds 自身も：**
- Linuxを作ることで「大学院の就職に有利」と考えていた（1991年）
- → 無償でも長期的に最適化されていた


---

# 動機2：自分が使うものを改善する（1/2）

- **「かゆいところに手が届く」動機：**
- ソフトウェアのバグを見つけた人は、
- 自分が使い続けるなら修正するインセンティブがある
- ---
- **Linus の法則（Raymond, 1999）：**
- 「目が十分あれば、すべてのバグは浅い」


---

# 動機2：自分が使うものを改善する（2/2）

- オープンソースだと世界中の人が問題を発見できる
- ---
- **現実の動機調査（GitHub Survey, 2023）：**
- 1位：自分が使うソフトウェアを改善したい（65%）
- 2位：コーディングスキルを向上させたい（60%）
- 3位：コミュニティへの貢献（50%）
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e" rx="8"/><text x="20" y="35" font-size="13" fill="#cccccc" font-family="sans-serif">自分が使うものを改善したい</text><rect x="280" y="18" width="390" height="22" rx="4" fill="#e91e63"/><text x="680" y="35" font-size="13" fill="#ffffff" font-family="sans-serif" font-weight="bold">65%</text><text x="20" y="80" font-size="13" fill="#cccccc" font-family="sans-serif">コーディングスキル向上</text><rect x="280" y="63" width="360" height="22" rx="4" fill="#f9a825"/><text x="650" y="80" font-size="13" fill="#1a1a2e" font-family="sans-serif" font-weight="bold">60%</text><text x="20" y="125" font-size="13" fill="#cccccc" font-family="sans-serif">コミュニティへの貢献</text><rect x="280" y="108" width="300" height="22" rx="4" fill="#4caf50"/><text x="590" y="125" font-size="13" fill="#ffffff" font-family="sans-serif" font-weight="bold">50%</text><text x="400" y="165" text-anchor="middle" font-size="11" fill="#666666" font-family="sans-serif">GitHub Open Source Survey 2023</text></svg>


---

# 動機3：内発的動機とフロー体験（1/2）

- **Deci & Ryan（1985）の自己決定理論：**
- 人間には外部報酬なしに行動を動機づける「内発的動機」がある
- - 有能感（うまくできている感覚）
- - 自律性（自分で選んでいる感覚）
- - 関係性（仲間とつながっている感覚）


---

# 動機3：内発的動機とフロー体験（2/2）

- **プログラミングとフロー状態：**
- Csikszentmihalyi の研究：困難すぎず簡単すぎない課題がフローを生む
- OSSの問題は「丁度いい難しさ」を自分で選べる
- → ゲームと同じ心理的メカニズムが働いている
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e" rx="8"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-family="sans-serif" font-weight="bold">フロー状態チャンネル</text><line x1="80" y1="160" x2="720" y2="160" stroke="#444" stroke-width="2"/><line x1="80" y1="160" x2="80" y2="30" stroke="#444" stroke-width="2"/><text x="400" y="178" text-anchor="middle" font-size="12" fill="#888" font-family="sans-serif">スキルレベル →</text><text x="30" y="100" text-anchor="middle" font-size="12" fill="#888" font-family="sans-serif" transform="rotate(-90,30,100)">課題難易度 →</text><polygon points="80,160 200,140 400,110 600,80 720,60" fill="none" stroke="#4caf50" stroke-width="2"/><polygon points="80,160 200,155 400,140 600,120 720,100" fill="none" stroke="#4caf50" stroke-width="2"/><polygon points="80,160 200,140 400,110 600,80 720,60 720,100 600,120 400,140 200,155" fill="#4caf50" fill-opacity="0.2"/><text x="420" y="115" font-size="13" fill="#4caf50" font-family="sans-serif" font-weight="bold">フロー</text><text x="550" y="155" font-size="12" fill="#e91e63" font-family="sans-serif">退屈</text><text x="150" y="80" font-size="12" fill="#2196f3" font-family="sans-serif">不安</text><circle cx="420" cy="108" r="6" fill="#f9a825"/></svg>


---

<!-- _class: lead -->
# コモンズの悲劇 vs デジタルコモンズ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="40" text-anchor="middle" font-size="20" fill="#f9a825" font-family="sans-serif" font-weight="bold">コモンズの悲劇 vs デジタルコモンズ</text><rect x="20" y="60" width="360" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="95" text-anchor="middle" font-size="16" fill="#e91e63" font-family="sans-serif" font-weight="bold">コモンズの悲劇</text><text x="200" y="120" text-anchor="middle" font-size="13" fill="#aaaaaa" font-family="sans-serif">（物理的資源: 牧草地, 漁場）</text><text x="50" y="155" font-size="13" fill="#cccccc" font-family="sans-serif">・使うほど枯渇する</text><text x="50" y="180" font-size="13" fill="#cccccc" font-family="sans-serif">・競合的（排除性あり）</text><text x="50" y="205" font-size="13" fill="#cccccc" font-family="sans-serif">・フリーライダー問題が深刻</text><text x="50" y="230" font-size="13" fill="#cccccc" font-family="sans-serif">・規制や私有化で解決</text><circle cx="200" cy="300" r="40" fill="#e91e63" fill-opacity="0.2" stroke="#e91e63" stroke-width="1.5"/><text x="200" y="296" text-anchor="middle" font-size="28" fill="#e91e63" font-family="sans-serif">↓</text><text x="200" y="320" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif">枯渇・崩壊</text><rect x="420" y="60" width="360" height="300" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="95" text-anchor="middle" font-size="16" fill="#4caf50" font-family="sans-serif" font-weight="bold">デジタルコモンズ</text><text x="600" y="120" text-anchor="middle" font-size="13" fill="#aaaaaa" font-family="sans-serif">（OSS, Wikipedia, 知識）</text><text x="450" y="155" font-size="13" fill="#cccccc" font-family="sans-serif">・使っても減らない</text><text x="450" y="180" font-size="13" fill="#cccccc" font-family="sans-serif">・非競合的（排除性なし）</text><text x="450" y="205" font-size="13" fill="#cccccc" font-family="sans-serif">・フリーライダーを許容</text><text x="450" y="230" font-size="13" fill="#cccccc" font-family="sans-serif">・コピーコストがゼロ</text><circle cx="600" cy="300" r="40" fill="#4caf50" fill-opacity="0.2" stroke="#4caf50" stroke-width="1.5"/><text x="600" y="296" text-anchor="middle" font-size="28" fill="#4caf50" font-family="sans-serif">↑</text><text x="600" y="320" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif">拡大・繁栄</text></svg>


---

<!-- _class: lead -->
# 企業がOSSを作る理由

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="40" text-anchor="middle" font-size="20" fill="#f9a825" font-family="sans-serif" font-weight="bold">企業のOSSビジネスモデル比較</text><rect x="20" y="60" width="230" height="290" rx="10" fill="#16213e" stroke="#f44336" stroke-width="2"/><text x="135" y="90" text-anchor="middle" font-size="15" fill="#f44336" font-family="sans-serif" font-weight="bold">Red Hat</text><text x="135" y="115" text-anchor="middle" font-size="12" fill="#aaaaaa" font-family="sans-serif">モデル: サポート販売</text><text x="35" y="145" font-size="12" fill="#cccccc" font-family="sans-serif">OSS: Linux (RHEL)</text><text x="35" y="168" font-size="12" fill="#cccccc" font-family="sans-serif">収益源: エンタープライズ</text><text x="35" y="188" font-size="12" fill="#cccccc" font-family="sans-serif">　　　　サポート契約</text><text x="35" y="215" font-size="12" fill="#cccccc" font-family="sans-serif">特徴: IBMに34億ドルで</text><text x="35" y="235" font-size="12" fill="#cccccc" font-family="sans-serif">　　　買収(2019)</text><rect x="35" y="260" width="180" height="30" rx="5" fill="#f44336" fill-opacity="0.3"/><text x="125" y="280" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">オープンコア</text><rect x="285" y="60" width="230" height="290" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/><text x="400" y="90" text-anchor="middle" font-size="15" fill="#ff9800" font-family="sans-serif" font-weight="bold">MongoDB</text><text x="400" y="115" text-anchor="middle" font-size="12" fill="#aaaaaa" font-family="sans-serif">モデル: クラウドSaaS</text><text x="300" y="145" font-size="12" fill="#cccccc" font-family="sans-serif">OSS: MongoDB</text><text x="300" y="168" font-size="12" fill="#cccccc" font-family="sans-serif">収益源: Atlas (クラウド)</text><text x="300" y="188" font-size="12" fill="#cccccc" font-family="sans-serif">　　　　マネージドDB</text><text x="300" y="215" font-size="12" fill="#cccccc" font-family="sans-serif">特徴: SSPL ライセンスで</text><text x="300" y="235" font-size="12" fill="#cccccc" font-family="sans-serif">　　　AWS対抗</text><rect x="300" y="260" width="180" height="30" rx="5" fill="#ff9800" fill-opacity="0.3"/><text x="390" y="280" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">クラウド収益化</text><rect x="550" y="60" width="230" height="290" rx="10" fill="#16213e" stroke="#9c27b0" stroke-width="2"/><text x="665" y="90" text-anchor="middle" font-size="15" fill="#9c27b0" font-family="sans-serif" font-weight="bold">HashiCorp</text><text x="665" y="115" text-anchor="middle" font-size="12" fill="#aaaaaa" font-family="sans-serif">モデル: BSL転換</text><text x="565" y="145" font-size="12" fill="#cccccc" font-family="sans-serif">OSS: Terraform等</text><text x="565" y="168" font-size="12" fill="#cccccc" font-family="sans-serif">収益源: Enterprise版</text><text x="565" y="188" font-size="12" fill="#cccccc" font-family="sans-serif">　　　　有償ライセンス</text><text x="565" y="215" font-size="12" fill="#cccccc" font-family="sans-serif">特徴: 2023年にBSLへ</text><text x="565" y="235" font-size="12" fill="#cccccc" font-family="sans-serif">　　　ライセンス変更</text><rect x="565" y="260" width="180" height="30" rx="5" fill="#9c27b0" fill-opacity="0.3"/><text x="655" y="280" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">ライセンス収益</text><text x="400" y="370" text-anchor="middle" font-size="13" fill="#888888" font-family="sans-serif">共通戦略: コアは共有、補完財で収益 (Tim O'Reilly)</text></svg>


---

# なぜGoogle・Metaが無料でAIフレームワークを公開するか（1/2）

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="260" fill="#1a1a2e" rx="12"/><text x="400" y="28" text-anchor="middle" font-size="15" fill="#f9a825" font-weight="bold" font-family="sans-serif">大企業がAIフレームワークをOSS化する戦略</text><rect x="30" y="50" width="220" height="180" rx="10" fill="#16213e" stroke="#4285f4" stroke-width="2"/><text x="140" y="76" text-anchor="middle" font-size="14" fill="#4285f4" font-weight="bold" font-family="sans-serif">Google TensorFlow</text><text x="140" y="100" text-anchor="middle" font-size="11" fill="#ccccdd" font-family="sans-serif">2015年公開</text><text x="50" y="125" font-size="11" fill="#ccccdd" font-family="sans-serif">① 人材採用パイプライン</text><text x="50" y="147" font-size="11" fill="#ccccdd" font-family="sans-serif">② GCP利用者を増やす</text><text x="50" y="169" font-size="11" fill="#ccccdd" font-family="sans-serif">③ 業界標準を取る</text><text x="50" y="191" font-size="11" fill="#ccccdd" font-family="sans-serif">④ 研究コミュニティ形成</text><text x="50" y="213" font-size="11" fill="#ccccdd" font-family="sans-serif">⑤ 競合の参入コスト増大</text><rect x="290" y="50" width="220" height="180" rx="10" fill="#16213e" stroke="#1877f2" stroke-width="2"/><text x="400" y="76" text-anchor="middle" font-size="14" fill="#1877f2" font-weight="bold" font-family="sans-serif">Meta PyTorch</text><text x="400" y="100" text-anchor="middle" font-size="11" fill="#ccccdd" font-family="sans-serif">2016年公開</text><text x="310" y="125" font-size="11" fill="#ccccdd" font-family="sans-serif">① 研究者採用強化</text><text x="310" y="147" font-size="11" fill="#ccccdd" font-family="sans-serif">② TFへの対抗軸</text><text x="310" y="169" font-size="11" fill="#ccccdd" font-family="sans-serif">③ 外部研究を活用</text><text x="310" y="191" font-size="11" fill="#ccccdd" font-family="sans-serif">④ AI倫理PR効果</text><text x="310" y="213" font-size="11" fill="#ccccdd" font-family="sans-serif">⑤ エコシステム形成</text><rect x="550" y="50" width="220" height="180" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="660" y="76" text-anchor="middle" font-size="14" fill="#f9a825" font-weight="bold" font-family="sans-serif">共通の論理</text><text x="570" y="108" font-size="11" fill="#f9a825" font-family="sans-serif">コア技術は共有する</text><text x="570" y="130" font-size="11" fill="#ccccdd" font-family="sans-serif">↓</text><text x="570" y="152" font-size="11" fill="#f9a825" font-family="sans-serif">補完財で収益を得る</text><text x="570" y="174" font-size="11" fill="#888899" font-family="sans-serif">(クラウド・エンタープライズ</text><text x="570" y="192" font-size="11" fill="#888899" font-family="sans-serif"> ・サポート・人材)</text><text x="660" y="218" text-anchor="middle" font-size="10" fill="#f9a825" font-family="sans-serif">Tim O'Reilly 戦略</text></svg>
- **TensorFlow（Google, 2015）・PyTorch（Meta, 2016）を無料公開：**
- ---
- **企業の動機：**
- 1. **人材採用：** 「TensorFlowを使ってる人を採りたい」=「TensorFlowで育てる」


---

# なぜGoogle・Metaが無料でAIフレームワークを公開するか（2/2）

- 2. **エコシステム形成：** 周辺ツール・クラウドサービスで収益
- 3. **標準化：** 自社技術が業界標準になれば競合の参入コストが上がる
- 4. **協調コスト削減：** 共通基盤を外部に作らせる
- ---
- **「コアは共有、補完は販売」戦略（Tim O'Reilly）**


---

<!-- _class: lead -->
# OSSの持続可能性問題

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="40" text-anchor="middle" font-size="20" fill="#f9a825" font-family="sans-serif" font-weight="bold">OSSコントリビューション漏斗</text><polygon points="400,70 650,70 580,140 220,140" fill="#2196f3" fill-opacity="0.7"/><text x="400" y="113" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif" font-weight="bold">ユーザー (数百万人)</text><polygon points="220,150 580,150 520,220 280,220" fill="#4caf50" fill-opacity="0.7"/><text x="400" y="193" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif" font-weight="bold">Issue報告者 (数千人)</text><polygon points="280,230 520,230 470,300 330,300" fill="#ff9800" fill-opacity="0.7"/><text x="400" y="273" text-anchor="middle" font-size="14" fill="#ffffff" font-family="sans-serif" font-weight="bold">PR投稿者 (数百人)</text><polygon points="330,310 470,310 440,370 360,370" fill="#e91e63" fill-opacity="0.8"/><text x="400" y="348" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif" font-weight="bold">コアメンテナ (数人)</text><text x="720" y="113" font-size="12" fill="#aaaaaa" font-family="sans-serif">使うだけ</text><text x="720" y="193" font-size="12" fill="#aaaaaa" font-family="sans-serif">バグ報告</text><text x="720" y="273" font-size="12" fill="#aaaaaa" font-family="sans-serif">コード貢献</text><text x="720" y="348" font-size="12" fill="#e91e63" font-family="sans-serif" font-weight="bold">最重要</text><line x1="705" y1="108" x2="660" y2="108" stroke="#aaaaaa" stroke-width="1"/><line x1="705" y1="188" x2="660" y2="188" stroke="#aaaaaa" stroke-width="1"/><line x1="705" y1="268" x2="660" y2="268" stroke="#aaaaaa" stroke-width="1"/><line x1="705" y1="343" x2="660" y2="343" stroke="#e91e63" stroke-width="1"/></svg>


---

# xz Utils 事件（2024）が示した危機（1/2）

- **事件の概要：**
- 2024年3月、世界中のLinuxシステムに組み込まれる圧縮ライブラリ「xz Utils」に
- バックドアが発見された
- ---
- **犯人は2年かけてコミュニティに潜入し、メンテナの信頼を獲得していた**


---

# xz Utils 事件（2024）が示した危機（2/2）

- → ほぼすべてのLinuxディストリビューションに感染寸前だった
- ---
- **根本原因：**
- メンテナはたった1人のボランティア（無報酬）
- 心労から「燃え尽き」状態になっていた
- → **世界インフラのキーパーツを1人のボランティアが支えていた**
- <svg viewBox="0 0 800 160" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="160" fill="#1a1a2e" rx="8"/><rect x="20" y="20" width="760" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="400" y="46" text-anchor="middle" font-size="14" fill="#e91e63" font-family="sans-serif" font-weight="bold">世界のLinuxインフラ（サーバー, スマホ, クラウド, IoT…）</text><rect x="280" y="80" width="240" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="106" text-anchor="middle" font-size="13" fill="#f9a825" font-family="sans-serif">xz Utils (圧縮ライブラリ)</text><line x1="400" y1="60" x2="400" y2="80" stroke="#e91e63" stroke-width="2"/><polygon points="395,80 405,80 400,90" fill="#e91e63"/><rect x="340" y="120" width="120" height="30" rx="6" fill="#e91e63" fill-opacity="0.3" stroke="#e91e63" stroke-width="1.5"/><text x="400" y="140" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">1人のボランティア</text><line x1="400" y1="120" x2="400" y2="120" stroke="#e91e63" stroke-width="2"/><polygon points="395,120 405,120 400,120" fill="#e91e63"/></svg>


---

# まとめ：OSSを支える複雑な動機

- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e" rx="10"/><rect x="20" y="20" width="175" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="107" y="50" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif" font-weight="bold">評判資本</text><text x="107" y="72" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">採用・転職に有利</text><text x="107" y="90" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">業界での認知</text><rect x="210" y="20" width="175" height="80" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="297" y="50" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif" font-weight="bold">自己使用改善</text><text x="297" y="72" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">バグ修正の動機</text><text x="297" y="90" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">かゆいところ解消</text><rect x="400" y="20" width="175" height="80" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="487" y="50" text-anchor="middle" font-size="13" fill="#2196f3" font-family="sans-serif" font-weight="bold">内発的動機</text><text x="487" y="72" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">楽しさ・達成感</text><text x="487" y="90" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">フロー状態</text><rect x="590" y="20" width="190" height="80" rx="8" fill="#16213e" stroke="#ff9800" stroke-width="2"/><text x="685" y="50" text-anchor="middle" font-size="13" fill="#ff9800" font-family="sans-serif" font-weight="bold">企業戦略</text><text x="685" y="72" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">コアは共有</text><text x="685" y="90" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">補完財で収益</text><rect x="250" y="135" width="300" height="55" rx="8" fill="#f9a825" fill-opacity="0.15" stroke="#f9a825" stroke-width="2"/><text x="400" y="157" text-anchor="middle" font-size="13" fill="#f9a825" font-family="sans-serif" font-weight="bold">「無料」の裏にある見えないコスト</text><text x="400" y="178" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">燃え尽き・セキュリティリスク・持続可能性の危機</text><line x1="107" y1="100" x2="320" y2="135" stroke="#666" stroke-width="1" stroke-dasharray="3"/><line x1="297" y1="100" x2="360" y2="135" stroke="#666" stroke-width="1" stroke-dasharray="3"/><line x1="487" y1="100" x2="440" y2="135" stroke="#666" stroke-width="1" stroke-dasharray="3"/><line x1="685" y1="100" x2="480" y2="135" stroke="#666" stroke-width="1" stroke-dasharray="3"/></svg>
- 「インターネットはゴールドラッシュのようだった。だが鉄道を作ったのは名もなきボランティアたちだった」

