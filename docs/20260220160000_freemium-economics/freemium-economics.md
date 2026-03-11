---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "フリーミアムは本当に儲かるか — 転換率1-5%の経済学"
footer: "© 2026 — The Economics of Freemium"
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
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# フリーミアムは本当に儲かるか

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><polygon points="100,60 700,60 600,160 200,160" fill="#f9a825" opacity="0.8"/><text x="400" y="118" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold">無料ユーザー 100%</text><polygon points="200,170 600,170 530,250 270,250" fill="#e91e63" opacity="0.8"/><text x="400" y="218" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">アクティブ 40%</text><polygon points="270,260 530,260 480,340 320,340" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">有料転換 5%</text><text x="400" y="378" text-anchor="middle" fill="#aaaacc" font-size="13">フリーミアム転換ファネル</text></svg>
- 転換率 1〜5% の経済学
- 
- エンジニアのためのフリーミアム完全解説
- 2026.02.20


---

# 今日の問い & ゴール

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><rect x="40" y="60" width="220" height="280" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/><text x="150" y="110" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold">①</text><text x="150" y="145" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">ユニットエコノミクス</text><text x="150" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">自分の言葉で</text><text x="150" y="186" text-anchor="middle" fill="#aaaacc" font-size="11">説明できる</text><rect x="290" y="60" width="220" height="280" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/><text x="400" y="110" text-anchor="middle" fill="#e91e63" font-size="28" font-weight="bold">②</text><text x="400" y="145" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">設計上の差異を語れる</text><text x="400" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">成功・失敗を分ける</text><text x="400" y="186" text-anchor="middle" fill="#aaaacc" font-size="11">要因を識別する</text><rect x="540" y="60" width="220" height="280" fill="#16213e" rx="10" stroke="#4a9eff" stroke-width="2"/><text x="650" y="110" text-anchor="middle" fill="#4a9eff" font-size="28" font-weight="bold">③</text><text x="650" y="145" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">実装・計測スキル</text><text x="650" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">転換率・LTV・</text><text x="650" y="186" text-anchor="middle" fill="#aaaacc" font-size="11">チャーンを扱える</text><text x="400" y="378" text-anchor="middle" fill="#aaaacc" font-size="12">今日の持ち帰り 3 つ</text></svg>
- **問い**: 「たった 2% しか課金しないビジネスが、なぜ成り立つのか？」
- **今日持ち帰れるもの（3つ）:**
- - フリーミアムのユニットエコノミクスを自分の言葉で説明できる
- - 成功・失敗を分ける設計上の差異を語れる
- - 転換率・LTV・チャーンを実装・計測できるスキルを得る


---

# 目次

- **Part 1** — フリーミアムとは何か（定義・心理・市場条件）
- **Part 2** — 転換率 1-5% の経済学（LTV・CAC・損益分岐点）
- **Part 3** — ケーススタディ（Spotify, Slack, Dropbox, 失敗パターン）
- **Part 4** — フリーミアム設計理論（ゲート設計・PLG・Expansion）
- **Part 5** — エンジニア実践知識（計測・実装・テスト）
- **Part 6** — まとめ：条件付きで Yes


---

<!-- _class: lead -->
# Part 1

- フリーミアムとは何か
- 定義・心理・市場条件


---

# 定義と 3 類型 — Free / Freemium / Free Trial

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">無料モデル 3 類型の比較</text><rect x="30" y="55" width="230" height="290" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="145" y="90" text-anchor="middle" fill="#4a9eff" font-size="14" font-weight="bold">Free（完全無料）</text><text x="145" y="115" text-anchor="middle" fill="#aaaacc" font-size="11">収益化なし</text><text x="145" y="135" text-anchor="middle" fill="#aaaacc" font-size="11">広告 or 補助金依存</text><text x="145" y="165" text-anchor="middle" fill="#777" font-size="10">例: Wikipedia</text><text x="145" y="220" text-anchor="middle" fill="#555577" font-size="10">転換なし</text><rect x="285" y="55" width="230" height="290" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Free Trial</text><text x="400" y="115" text-anchor="middle" fill="#aaaacc" font-size="11">期間限定・全機能</text><text x="400" y="135" text-anchor="middle" fill="#aaaacc" font-size="11">期限後に課金 or 停止</text><text x="400" y="165" text-anchor="middle" fill="#777" font-size="10">例: Netflix 旧無料期間</text><text x="400" y="220" text-anchor="middle" fill="#f9a825" font-size="10">高転換率（時間圧力）</text><rect x="540" y="55" width="230" height="290" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="655" y="90" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Freemium</text><text x="655" y="115" text-anchor="middle" fill="#aaaacc" font-size="11">永続的無料版</text><text x="655" y="135" text-anchor="middle" fill="#aaaacc" font-size="11">＋有料転換設計</text><text x="655" y="165" text-anchor="middle" fill="#777" font-size="10">例: Spotify, Slack</text><text x="655" y="220" text-anchor="middle" fill="#e91e63" font-size="10">習慣 → 制限 → 転換</text><text x="400" y="375" text-anchor="middle" fill="#aaaacc" font-size="11">核心: 無料ユーザー = 体験という広告メディア</text></svg>
- **Free（完全無料）**: 収益化しない。広告または補助金依存
- **Free Trial**: 期間限定で全機能解放 → 期限後に課金 or 停止
- **Freemium**: 永続的な無料版＋有料プランへの転換設計
- - 機能制限型: 基本機能のみ無料（Spotify, Slack）
- - 使用量制限型: 利用量で制限（Dropbox, API系）
- **フリーミアムの核心**: 無料ユーザーは「体験という広告メディア」


---

# ゼロ価格の心理学

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">ゼロ価格効果 — 心理的インパクト</text><rect x="60" y="60" width="300" height="140" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="210" y="95" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">有料 → 値引き</text><text x="210" y="120" text-anchor="middle" fill="#aaaacc" font-size="12">$10 → $8</text><text x="210" y="148" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="bold">+20% 反応</text><text x="210" y="178" text-anchor="middle" fill="#777" font-size="11">通常の値引き反応</text><rect x="440" y="60" width="300" height="140" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="3"/><text x="590" y="95" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">有料 → 無料</text><text x="590" y="120" text-anchor="middle" fill="#aaaacc" font-size="12">$1 → $0</text><text x="590" y="148" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="bold">+200%+ 反応</text><text x="590" y="178" text-anchor="middle" fill="#e91e63" font-size="11">別次元の感情反応</text><polygon points="390,110 430,130 390,150" fill="#f9a825"/><line x1="360" y1="130" x2="390" y2="130" stroke="#f9a825" stroke-width="2"/><rect x="160" y="240" width="480" height="110" fill="#16213e" rx="8"/><text x="400" y="270" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">エンジニア的解釈</text><text x="400" y="298" text-anchor="middle" fill="#f9a825" font-size="14">無料とは CAC をユーザー側に転嫁する仕組み</text><text x="400" y="328" text-anchor="middle" fill="#aaaacc" font-size="11">採用障壁ゼロ → 製品に慣れさせる時間を稼ぐ</text><text x="400" y="375" text-anchor="middle" fill="#555577" font-size="10">Dan Ariely「Predictably Irrational」より</text></svg>
- Dan Ariely「ゼロは単なる安値ではなく、別次元の感情反応を引き起こす」
- **ゼロ価格効果（Zero-Price Effect）:**
- - 有料 → 無料は単なる値引き以上の心理的インパクトを生む
- - 試用コスト・決断コストがゼロになり、採用障壁が激減する
- - 「損失がない」状態で製品に慣れさせる時間を稼げる
- **エンジニア的解釈**: 無料とは CAC をユーザー側に転嫁する仕組み


---

# フリーミアムが機能する市場条件

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">フリーミアムが機能する 5 つの市場条件</text><rect x="30" y="48" width="228" height="80" fill="#16213e" rx="6" stroke="#4a9eff" stroke-width="1.5"/><text x="45" y="72" fill="#4a9eff" font-size="13" font-weight="bold">① 限界コストほぼゼロ</text><text x="45" y="94" fill="#aaaacc" font-size="11">デジタル財は追加ユーザー</text><text x="45" y="112" fill="#aaaacc" font-size="11">のコストが極小</text><rect x="286" y="48" width="228" height="80" fill="#16213e" rx="6" stroke="#51cf66" stroke-width="1.5"/><text x="301" y="72" fill="#51cf66" font-size="13" font-weight="bold">② 広い TAM</text><text x="301" y="94" fill="#aaaacc" font-size="11">転換率 2% でも採算が</text><text x="301" y="112" fill="#aaaacc" font-size="11">取れる市場規模</text><rect x="542" y="48" width="228" height="80" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/><text x="557" y="72" fill="#f9a825" font-size="13" font-weight="bold">③ 明確な価値段差</text><text x="557" y="94" fill="#aaaacc" font-size="11">無料と有料の間に</text><text x="557" y="112" fill="#aaaacc" font-size="11">実感できる差がある</text><rect x="158" y="148" width="228" height="80" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1.5"/><text x="173" y="172" fill="#e91e63" font-size="13" font-weight="bold">④ ネットワーク効果</text><text x="173" y="194" fill="#aaaacc" font-size="11">無料ユーザーが</text><text x="173" y="212" fill="#aaaacc" font-size="11">製品を広める</text><rect x="414" y="148" width="228" height="80" fill="#16213e" rx="6" stroke="#7b68ee" stroke-width="1.5"/><text x="429" y="172" fill="#7b68ee" font-size="13" font-weight="bold">⑤ 高い LTV</text><text x="429" y="194" fill="#aaaacc" font-size="11">有料ユーザーが</text><text x="429" y="212" fill="#aaaacc" font-size="11">長期間継続課金</text><rect x="100" y="258" width="600" height="60" fill="#16213e" rx="6" stroke="#ff6b6b" stroke-width="1.5"/><text x="400" y="283" text-anchor="middle" fill="#ff6b6b" font-size="13" font-weight="bold">条件を満たさない場合</text><text x="400" y="306" text-anchor="middle" fill="#aaaacc" font-size="12">フリーミアムは「無料ばら撒き」に終わる</text><text x="400" y="375" text-anchor="middle" fill="#555577" font-size="11">5 条件が揃って初めてフリーミアムは成立する</text></svg>
- **① 限界コストがほぼゼロ**: デジタル財は追加ユーザーのコストが極小
- **② 広い対象市場（TAM）**: 有料転換 2% でも採算が取れる規模が必要
- **③ 明確な価値の段差**: 無料版と有料版の間に実感できる価値差がある
- **④ ネットワーク効果または口コミ効果**: 無料ユーザーが製品を広める
- **⑤ 高い LTV**: 一度獲得した有料ユーザーが長期間継続課金する
- 条件を満たさない場合 → フリーミアムは「無料ばら撒き」に終わる


---

<!-- _class: lead -->
# Part 2

- 転換率 1-5% の経済学
- LTV・CAC・損益分岐点


---

# 転換率の定義と業界ベンチマーク

- <svg viewBox='0 0 760 310' style='max-height:66vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='310' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>業界別フリーミアム転換率ベンチマーク</text><text x='170' y='72' text-anchor='end' fill='#aaaacc' font-size='13'>SaaS B2B</text><text x='170' y='122' text-anchor='end' fill='#aaaacc' font-size='13'>SaaS B2C</text><text x='170' y='172' text-anchor='end' fill='#aaaacc' font-size='13'>ゲーム F2P</text><text x='170' y='222' text-anchor='end' fill='#aaaacc' font-size='13'>コンシューマー</text><text x='170' y='272' text-anchor='end' fill='#aaaacc' font-size='13'>業界平均</text><rect x='270' y='54' width='150' height='22' fill='#4a9eff' rx='3'/><text x='428' y='70' fill='#4a9eff' font-size='13' font-weight='bold'> 2-5%</text><rect x='270' y='104' width='300' height='22' fill='#7b68ee' rx='3'/><text x='578' y='120' fill='#7b68ee' font-size='13' font-weight='bold'> 2-8%</text><rect x='193' y='154' width='125' height='22' fill='#ff6b6b' rx='3'/><text x='325' y='170' fill='#ff6b6b' font-size='13' font-weight='bold'> 0.5-3%</text><rect x='220' y='204' width='150' height='22' fill='#51cf66' rx='3'/><text x='378' y='220' fill='#51cf66' font-size='13' font-weight='bold'> 1-5%</text><rect x='270' y='254' width='100' height='22' fill='#ffd43b' rx='3'/><text x='378' y='270' fill='#ffd43b' font-size='13' font-weight='bold'> 2-4%</text><line x1='178' y1='292' x2='620' y2='292' stroke='#555' stroke-width='1'/><text x='178' y='305' text-anchor='middle' fill='#777' font-size='11'>0%</text><text x='270' y='305' text-anchor='middle' fill='#777' font-size='11'>2%</text><text x='362' y='305' text-anchor='middle' fill='#777' font-size='11'>4%</text><text x='454' y='305' text-anchor='middle' fill='#777' font-size='11'>6%</text><text x='546' y='305' text-anchor='middle' fill='#777' font-size='11'>8%</text><text x='620' y='305' text-anchor='middle' fill='#777' font-size='11'>10%</text></svg>


---

# ユニットエコノミクス — CAC・LTV・Payback Period

- <svg viewBox='0 0 760 310' style='max-height:66vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='310' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアムのユニットエコノミクス三角形</text><rect x='60' y='80' width='180' height='80' fill='#ff6b6b' rx='8' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='115' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>CAC</text><text x='150' y='135' text-anchor='middle' fill='#ffdddd' font-size='12'>顧客獲得コスト</text><rect x='290' y='80' width='180' height='80' fill='#4a9eff' rx='8' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='380' y='115' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>LTV</text><text x='380' y='135' text-anchor='middle' fill='#ddddff' font-size='12'>顧客生涯価値</text><rect x='520' y='80' width='180' height='80' fill='#51cf66' rx='8' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='610' y='115' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>Payback</text><text x='610' y='135' text-anchor='middle' fill='#ddffdd' font-size='12'>回収期間</text><polygon points='248,120 282,115 282,125' fill='#ffffff'/><line x1='240' y1='120' x2='282' y2='120' stroke='#ffffff' stroke-width='2'/><polygon points='478,120 512,115 512,125' fill='#ffffff'/><line x1='470' y1='120' x2='512' y2='120' stroke='#ffffff' stroke-width='2'/><rect x='200' y='200' width='360' height='70' fill='#2a2a4e' rx='8' style='filter:drop-shadow(2px 2px 6px rgba(0,0,0,0.5))'/><text x='380' y='228' text-anchor='middle' fill='#ffd43b' font-size='14' font-weight='bold'>黄金比率: LTV / CAC ≥ 3</text><text x='380' y='252' text-anchor='middle' fill='#aaaacc' font-size='12'>Payback Period ≤ 12ヶ月が SaaS の健全ライン</text></svg>


---

# 無料ユーザーのコストは本当にゼロか

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">無料ユーザーの実際のコスト内訳</text><rect x="50" y="50" width="700" height="50" fill="#16213e" rx="4"/><rect x="50" y="50" width="280" height="50" fill="#4a9eff" rx="4" opacity="0.8"/><text x="190" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">インフラ 40%</text><rect x="330" y="50" width="180" height="50" fill="#f9a825" rx="4" opacity="0.8"/><text x="420" y="81" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">サポート 26%</text><rect x="510" y="50" width="120" height="50" fill="#e91e63" rx="4" opacity="0.8"/><text x="570" y="81" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">セキュリティ 17%</text><rect x="630" y="50" width="120" height="50" fill="#7b68ee" rx="4" opacity="0.8"/><text x="690" y="81" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">機会費用 17%</text><rect x="50" y="130" width="330" height="230" fill="#16213e" rx="8"/><text x="215" y="158" text-anchor="middle" fill="#aaaacc" font-size="13" font-weight="bold">コスト種別</text><text x="100" y="190" fill="#4a9eff" font-size="12">サーバー・帯域・CPU</text><text x="100" y="215" fill="#f9a825" font-size="12">カスタマーサポート</text><text x="100" y="240" fill="#e91e63" font-size="12">セキュリティ・不正防止</text><text x="100" y="265" fill="#7b68ee" font-size="12">機能開発の機会コスト</text><rect x="410" y="130" width="340" height="230" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="580" y="158" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">重要な問い</text><text x="580" y="192" text-anchor="middle" fill="#ffffff" font-size="14">1人の無料ユーザーが</text><text x="580" y="218" text-anchor="middle" fill="#ffffff" font-size="14">月いくらコストを</text><text x="580" y="244" text-anchor="middle" fill="#ffffff" font-size="14">生んでいるか？</text><text x="580" y="286" text-anchor="middle" fill="#aaaacc" font-size="12">$0.10〜$2.00 / 月</text><text x="580" y="308" text-anchor="middle" fill="#aaaacc" font-size="11">（業種・規模による）</text><text x="400" y="378" text-anchor="middle" fill="#aaaacc" font-size="11">「デジタル財は限界コストゼロ」は半分正しく半分誤り</text></svg>
- 「デジタル財は限界コストゼロ」は半分正しく、半分誤り
- **実際に発生するコスト:**
- - サーバー・インフラコスト（ストレージ・帯域・CPU）
- - カスタマーサポートコスト（問い合わせは有料より多い場合も）
- - セキュリティ・不正防止コスト
- - 機能開発の機会コスト（無料ユーザー向け機能開発）
- **重要な問い**: 1人の無料ユーザーが月いくらコストを生んでいるか？


---

# 有料 1 人が何人の無料ユーザーを支えるか

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>転換率ごとの「支え合い比率」</text><text x='380' y='55' text-anchor='middle' fill='#aaaacc' font-size='12'>有料ユーザー 1 人が支える無料ユーザー数（ARPU $15/月, 無料コスト $0.20/月 仮定）</text><rect x='60' y='70' width='140' height='160' fill='#ff6b6b' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='130' y='135' text-anchor='middle' fill='#fff' font-size='28' font-weight='bold'>75人</text><text x='130' y='160' text-anchor='middle' fill='#ffdddd' font-size='13'>転換率 1%</text><text x='130' y='220' text-anchor='middle' fill='#ffaaaa' font-size='11'>有料1 : 無料99</text><rect x='230' y='90' width='140' height='140' fill='#ffd43b' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='300' y='148' text-anchor='middle' fill='#333' font-size='28' font-weight='bold'>37人</text><text x='300' y='172' text-anchor='middle' fill='#665500' font-size='13'>転換率 2%</text><text x='300' y='220' text-anchor='middle' fill='#665500' font-size='11'>有料1 : 無料49</text><rect x='400' y='110' width='140' height='120' fill='#51cf66' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='470' y='163' text-anchor='middle' fill='#fff' font-size='28' font-weight='bold'>15人</text><text x='470' y='187' text-anchor='middle' fill='#ddffdd' font-size='13'>転換率 5%</text><text x='470' y='220' text-anchor='middle' fill='#aaffaa' font-size='11'>有料1 : 無料19</text><rect x='570' y='130' width='140' height='100' fill='#4a9eff' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='640' y='177' text-anchor='middle' fill='#fff' font-size='28' font-weight='bold'>7人</text><text x='640' y='201' text-anchor='middle' fill='#ddddff' font-size='13'>転換率 10%</text><text x='640' y='230' text-anchor='middle' fill='#aaaaff' font-size='11'>有料1 : 無料9</text><text x='380' y='278' text-anchor='middle' fill='#aaaacc' font-size='12'>棒の高さ = 有料1人が背負う無料ユーザーのコスト負担</text></svg>


---

# 業界別の転換率比較 — SaaS vs Game vs Consumer

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>業界ごとの転換率・ARPU・LTV 比較</text><rect x='40' y='50' width='220' height='210' fill='#2a2a4e' rx='8'/><text x='150' y='80' text-anchor='middle' fill='#4a9eff' font-size='14' font-weight='bold'>SaaS（B2B）</text><text x='150' y='108' text-anchor='middle' fill='#ffffff' font-size='22' font-weight='bold'>2-5%</text><text x='150' y='128' text-anchor='middle' fill='#aaaacc' font-size='11'>転換率</text><text x='150' y='158' text-anchor='middle' fill='#51cf66' font-size='16' font-weight='bold'>$50-200/月</text><text x='150' y='178' text-anchor='middle' fill='#aaaacc' font-size='11'>ARPU</text><text x='150' y='208' text-anchor='middle' fill='#ffd43b' font-size='16' font-weight='bold'>$1,000-5,000</text><text x='150' y='228' text-anchor='middle' fill='#aaaacc' font-size='11'>LTV</text><text x='150' y='248' text-anchor='middle' fill='#7b8ab8' font-size='10'>高単価・少人数転換</text><rect x='270' y='50' width='220' height='210' fill='#2a2a4e' rx='8'/><text x='380' y='80' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>ゲーム（F2P）</text><text x='380' y='108' text-anchor='middle' fill='#ffffff' font-size='22' font-weight='bold'>0.5-3%</text><text x='380' y='128' text-anchor='middle' fill='#aaaacc' font-size='11'>転換率</text><text x='380' y='158' text-anchor='middle' fill='#51cf66' font-size='16' font-weight='bold'>$5-50/月</text><text x='380' y='178' text-anchor='middle' fill='#aaaacc' font-size='11'>ARPU</text><text x='380' y='208' text-anchor='middle' fill='#ffd43b' font-size='16' font-weight='bold'>クジラ依存</text><text x='380' y='228' text-anchor='middle' fill='#aaaacc' font-size='11'>収益構造</text><text x='380' y='248' text-anchor='middle' fill='#7b8ab8' font-size='10'>5%のヘビー課金者が80%の収益</text><rect x='500' y='50' width='220' height='210' fill='#2a2a4e' rx='8'/><text x='610' y='80' text-anchor='middle' fill='#51cf66' font-size='14' font-weight='bold'>コンシューマー</text><text x='610' y='108' text-anchor='middle' fill='#ffffff' font-size='22' font-weight='bold'>1-5%</text><text x='610' y='128' text-anchor='middle' fill='#aaaacc' font-size='11'>転換率</text><text x='610' y='158' text-anchor='middle' fill='#51cf66' font-size='16' font-weight='bold'>$5-20/月</text><text x='610' y='178' text-anchor='middle' fill='#aaaacc' font-size='11'>ARPU</text><text x='610' y='208' text-anchor='middle' fill='#ffd43b' font-size='16' font-weight='bold'>$100-500</text><text x='610' y='228' text-anchor='middle' fill='#aaaacc' font-size='11'>LTV</text><text x='610' y='248' text-anchor='middle' fill='#7b8ab8' font-size='10'>大量獲得・薄く広く</text></svg>


---

# LTV 方程式 — チャーンレートとの関係

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">チャーンレートが LTV を破壊する</text><rect x="50" y="50" width="700" height="55" fill="#16213e" rx="6"/><text x="400" y="73" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">LTV = ARPU ÷ Churn Rate</text><text x="400" y="95" text-anchor="middle" fill="#aaaacc" font-size="11">例: 月額 $20、月次チャーン 5% → LTV = $400</text><rect x="50" y="130" width="148" height="200" fill="#ff6b6b" rx="6" opacity="0.85"/><text x="124" y="188" text-anchor="middle" fill="#fff" font-size="28" font-weight="bold">$400</text><text x="124" y="215" text-anchor="middle" fill="#ffcccc" font-size="12">チャーン 5%</text><text x="124" y="238" text-anchor="middle" fill="#ffaaaa" font-size="11">LTV ×1</text><rect x="215" y="160" width="148" height="170" fill="#ff9f43" rx="6" opacity="0.85"/><text x="289" y="212" text-anchor="middle" fill="#fff" font-size="26" font-weight="bold">$500</text><text x="289" y="237" text-anchor="middle" fill="#ffe0cc" font-size="12">チャーン 4%</text><text x="289" y="260" text-anchor="middle" fill="#ffd0aa" font-size="11">LTV ×1.25</text><rect x="380" y="190" width="148" height="140" fill="#ffd43b" rx="6" opacity="0.85"/><text x="454" y="248" text-anchor="middle" fill="#333" font-size="24" font-weight="bold">$1,000</text><text x="454" y="270" text-anchor="middle" fill="#665500" font-size="12">チャーン 2%</text><text x="454" y="293" text-anchor="middle" fill="#665500" font-size="11">LTV ×2.5</text><rect x="545" y="240" width="170" height="90" fill="#51cf66" rx="6" opacity="0.9"/><text x="630" y="292" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold">$2,000</text><text x="630" y="314" text-anchor="middle" fill="#ddffdd" font-size="11">チャーン 1%  LTV ×5</text><text x="400" y="370" text-anchor="middle" fill="#aaaacc" font-size="12">結論: 転換率より チャーン削減 のほうが LTV 改善に効く</text></svg>
- **LTV（顧客生涯価値）の基本式:**
- ```
LTV = ARPU / Churn Rate
```
- 例: 月額 $20、月次チャーン 5% → LTV = $20 / 0.05 = **$400**
- **チャーンが LTV を破壊するメカニズム:**
- - チャーン 5% → LTV $400 | チャーン 2% → LTV $1,000（2.5倍）
- - チャーン 1% → LTV $2,000 | チャーン 0.5% → LTV $4,000
- **結論**: 転換率よりチャーン削減のほうが LTV 改善に効く


---

# ネットワーク効果がフリーミアムを加速する

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">ネットワーク効果 × フリーミアムの相乗効果</text><circle cx="200" cy="200" r="50" fill="#16213e" stroke="#4a9eff" stroke-width="2"/><text x="200" y="195" text-anchor="middle" fill="#4a9eff" font-size="11" font-weight="bold">無料</text><text x="200" y="213" text-anchor="middle" fill="#4a9eff" font-size="11">ユーザー</text><circle cx="400" cy="120" r="40" fill="#16213e" stroke="#51cf66" stroke-width="2"/><text x="400" y="115" text-anchor="middle" fill="#51cf66" font-size="10" font-weight="bold">招待</text><text x="400" y="130" text-anchor="middle" fill="#51cf66" font-size="10">拡散</text><circle cx="580" cy="180" r="45" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="580" y="175" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">有料</text><text x="580" y="193" text-anchor="middle" fill="#f9a825" font-size="11">ユーザー</text><circle cx="350" cy="300" r="38" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="350" y="295" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold">コンテンツ</text><text x="350" y="311" text-anchor="middle" fill="#e91e63" font-size="10">蓄積</text><line x1="248" y1="183" x2="362" y2="142" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="435" y1="135" x2="538" y2="164" stroke="#51cf66" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="247" y1="215" x2="315" y2="275" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="385" y1="278" x2="545" y2="210" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/><rect x="30" y="330" width="360" height="50" fill="#16213e" rx="5"/><text x="210" y="352" text-anchor="middle" fill="#aaaacc" font-size="11">ウイルス係数 k = 招待数 × コンバージョン率</text><text x="210" y="370" text-anchor="middle" fill="#f9a825" font-size="11">k > 1 で自律的成長（Dropbox k=1.4）</text><rect x="420" y="330" width="350" height="50" fill="#16213e" rx="5"/><text x="595" y="352" text-anchor="middle" fill="#aaaacc" font-size="11">無料ユーザーが網の目を形成</text><text x="595" y="370" text-anchor="middle" fill="#51cf66" font-size="11">有料転換の土台になる</text></svg>
- **直接ネットワーク効果**: 同一ネットワーク内の価値（Slack: 招待 → チーム全員が無料導入）
- **間接ネットワーク効果**: 補完財・コンテンツの蓄積（Spotify: 無料リスナー → アーティスト集積）
- **ウイルス係数 (k値)**: k > 1 で自律的成長
```
k = 招待数 × コンバージョン率
```
- Dropbox の k = 1.4（紹介プログラム後）→ 低 CAC で急成長
- **フリーミアム × ネットワーク効果の相乗効果**: 無料ユーザーが網の目を形成し、有料転換の土台になる


---

# 損益分岐点分析

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアムの損益分岐点分析</text><line x1='80' y1='250' x2='680' y2='250' stroke='#555' stroke-width='2'/><line x1='80' y1='60' x2='80' y2='250' stroke='#555' stroke-width='2'/><text x='40' y='155' text-anchor='middle' fill='#aaaacc' font-size='12' transform='rotate(-90,40,155)'>コスト / 収益</text><text x='380' y='278' text-anchor='middle' fill='#aaaacc' font-size='12'>有料ユーザー数</text><line x1='80' y1='180' x2='680' y2='180' stroke='#ff6b6b' stroke-width='2' stroke-dasharray='6,3'/><text x='690' y='184' fill='#ff6b6b' font-size='11'>固定費</text><line x1='80' y1='240' x2='680' y2='140' stroke='#ffd43b' stroke-width='2'/><text x='690' y='140' fill='#ffd43b' font-size='11'>変動費</text><line x1='80' y1='250' x2='680' y2='80' stroke='#51cf66' stroke-width='2.5'/><text x='690' y='80' fill='#51cf66' font-size='11'>収益</text><circle cx='340' cy='190' r='8' fill='#ffffff' style='filter:drop-shadow(0 0 6px rgba(255,255,255,0.8))'/><line x1='340' y1='190' x2='340' y2='250' stroke='#ffffff' stroke-width='1' stroke-dasharray='4,3'/><text x='340' y='268' text-anchor='middle' fill='#ffffff' font-size='12' font-weight='bold'>損益分岐点</text><rect x='440' y='100' width='190' height='55' fill='#2a2a4e' rx='6'/><text x='535' y='122' text-anchor='middle' fill='#51cf66' font-size='12'>転換率↑ → 損益分岐点↓</text><text x='535' y='142' text-anchor='middle' fill='#ff6b6b' font-size='12'>チャーン↑ → 損益分岐点↑</text></svg>


---

# 転換率を上げる 3 つのレバー

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">転換率を上げる 3 つのレバー</text><rect x="30" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="144" y="88" text-anchor="middle" fill="#4a9eff" font-size="22" font-weight="bold">①</text><text x="144" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">ゲート設計</text><text x="144" y="138" text-anchor="middle" fill="#aaaacc" font-size="11">What to free</text><text x="144" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">「十分に使える」</text><text x="144" y="188" text-anchor="middle" fill="#aaaacc" font-size="11">けど</text><text x="144" y="208" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">「もう少し欲しい」</text><text x="144" y="235" text-anchor="middle" fill="#aaaacc" font-size="10">絶妙な制限設計</text><rect x="286" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#f9a825" font-size="22" font-weight="bold">②</text><text x="400" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">転換フロー</text><text x="400" y="138" text-anchor="middle" fill="#aaaacc" font-size="11">How to convert</text><text x="400" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">制限に当たった</text><text x="400" y="188" text-anchor="middle" fill="#aaaacc" font-size="11">タイミングで促す</text><text x="400" y="215" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">摩擦を最小化</text><text x="400" y="240" text-anchor="middle" fill="#aaaacc" font-size="10">その場でアップグレード</text><rect x="542" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="656" y="88" text-anchor="middle" fill="#e91e63" font-size="22" font-weight="bold">③</text><text x="656" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">価値の可視化</text><text x="656" y="138" text-anchor="middle" fill="#aaaacc" font-size="11">Why upgrade</text><text x="656" y="168" text-anchor="middle" fill="#aaaacc" font-size="11">有料版の価値を</text><text x="656" y="188" text-anchor="middle" fill="#aaaacc" font-size="11">体験前に実感</text><text x="656" y="215" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">before/after 提示</text><text x="656" y="240" text-anchor="middle" fill="#aaaacc" font-size="10">利用パターン別訴求</text></svg>
- **① ゲート設計の最適化（What to free）**
- - 無料版が「十分に使える」けど「もう少し欲しい」と思わせる絶妙な制限
- **② 転換フロー（How to convert）**
- - 制限に当たったタイミングでアップグレードを促す（摩擦最小化）
- - パーソナライズされた Upgrade Prompt（利用パターンに応じた訴求）
- **③ 価値の可視化（Why upgrade）**
- - 有料版の価値を無料ユーザーが体験前に実感できる仕組み


---

<!-- _class: lead -->
# Part 3

- ケーススタディ
- Spotify, Slack, Dropbox, Zoom, ゲーム, 失敗パターン


---

# Spotify — 音楽フリーミアムの教科書

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Spotify フリーミアムモデル</text><rect x="40" y="50" width="340" height="310" fill="#16213e" rx="8" stroke="#1db954" stroke-width="2"/><text x="210" y="82" text-anchor="middle" fill="#1db954" font-size="14" font-weight="bold">Free（広告付き）</text><text x="210" y="112" text-anchor="middle" fill="#aaaacc" font-size="12">全楽曲にアクセス可能</text><text x="210" y="134" text-anchor="middle" fill="#ff6b6b" font-size="11">× オフライン再生なし</text><text x="210" y="155" text-anchor="middle" fill="#ff6b6b" font-size="11">× 音質制限あり</text><text x="210" y="176" text-anchor="middle" fill="#ff6b6b" font-size="11">× 広告あり（30秒）</text><text x="210" y="197" text-anchor="middle" fill="#ff6b6b" font-size="11">× シャッフル再生のみ</text><text x="210" y="240" text-anchor="middle" fill="#aaaacc" font-size="20" font-weight="bold">3.66億人</text><text x="210" y="268" text-anchor="middle" fill="#aaaacc" font-size="11">61% of MAU</text><rect x="420" y="50" width="340" height="310" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="590" y="82" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Premium $9.99〜/月</text><text x="590" y="112" text-anchor="middle" fill="#aaaacc" font-size="12">全機能解放</text><text x="590" y="134" text-anchor="middle" fill="#51cf66" font-size="11">✓ オフライン再生</text><text x="590" y="155" text-anchor="middle" fill="#51cf66" font-size="11">✓ 高音質（320kbps）</text><text x="590" y="176" text-anchor="middle" fill="#51cf66" font-size="11">✓ 広告なし</text><text x="590" y="197" text-anchor="middle" fill="#51cf66" font-size="11">✓ 自由再生順</text><text x="590" y="240" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">2.36億人</text><text x="590" y="268" text-anchor="middle" fill="#f9a825" font-size="11">転換率 ~26%</text><text x="400" y="375" text-anchor="middle" fill="#aaaacc" font-size="11">6.02億 MAU（2024 Q3）— 業界最高水準の転換率</text></svg>
- **ビジネスモデル**: 無料（広告付き）+ Premium（月額 $9.99〜）
- **転換率**: 約 26%（2024年）— 業界最高水準
- **なぜ機能するのか:**
- - 無料版で「音楽体験」は完結するが、広告の不便さが継続的な転換圧力
- - オフライン再生・音質・シャッフルなし — 価値差が明確で実感しやすい
- - 月 $0.99〜の「学生割引」「家族プラン」で転換ハードルを段階的に設定
- **数字**: 6.02億 MAU、2.36億 Premium加入者（2024 Q3）


---

# Spotify 転換ファネル詳細

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>Spotify 転換ファネル（2024 年）</text><polygon points='100,50 660,50 580,120 180,120' fill='#4a9eff' opacity='0.9'/><text x='380' y='92' text-anchor='middle' fill='#ffffff' font-size='14' font-weight='bold'>月間アクティブユーザー (MAU)</text><text x='380' y='112' text-anchor='middle' fill='#ddddff' font-size='13'>6.02 億人 (100%)</text><polygon points='180,128 580,128 520,198 240,198' fill='#7b68ee' opacity='0.9'/><text x='380' y='170' text-anchor='middle' fill='#ffffff' font-size='14' font-weight='bold'>無料会員（広告付き）</text><text x='380' y='188' text-anchor='middle' fill='#ddddff' font-size='13'>3.66 億人 (61%)</text><polygon points='240,206 520,206 470,268 290,268' fill='#51cf66' opacity='0.95'/><text x='380' y='242' text-anchor='middle' fill='#ffffff' font-size='14' font-weight='bold'>Premium 会員</text><text x='380' y='262' text-anchor='middle' fill='#ddffdd' font-size='13'>2.36 億人 (39%) ← 転換率 ~26% (登録者ベース)</text></svg>


---

# Slack — B2B PLG（Product-Led Growth）の手本

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Slack — B2B PLG 転換ルート</text><rect x="50" y="55" width="150" height="60" fill="#16213e" rx="6" stroke="#4a9eff" stroke-width="1.5"/><text x="125" y="80" text-anchor="middle" fill="#4a9eff" font-size="12" font-weight="bold">個人が導入</text><text x="125" y="100" text-anchor="middle" fill="#aaaacc" font-size="10">無料で使い始める</text><polygon points="210,85 240,75 240,95" fill="#f9a825"/><line x1="200" y1="85" x2="240" y2="85" stroke="#f9a825" stroke-width="2"/><rect x="250" y="55" width="150" height="60" fill="#16213e" rx="6" stroke="#51cf66" stroke-width="1.5"/><text x="325" y="80" text-anchor="middle" fill="#51cf66" font-size="12" font-weight="bold">チームに拡散</text><text x="325" y="100" text-anchor="middle" fill="#aaaacc" font-size="10">招待 → メンバー増加</text><polygon points="410,85 440,75 440,95" fill="#f9a825"/><line x1="400" y1="85" x2="440" y2="85" stroke="#f9a825" stroke-width="2"/><rect x="450" y="55" width="150" height="60" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/><text x="525" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">制限に当たる</text><text x="525" y="100" text-anchor="middle" fill="#aaaacc" font-size="10">90日メッセージ上限</text><polygon points="610,85 640,75 640,95" fill="#e91e63"/><line x1="600" y1="85" x2="640" y2="85" stroke="#e91e63" stroke-width="2"/><rect x="650" y="55" width="120" height="60" fill="#e91e63" rx="6" opacity="0.9"/><text x="710" y="80" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">組織課金</text><text x="710" y="100" text-anchor="middle" fill="#ffffff" font-size="10">Pro/Business+</text><rect x="50" y="155" width="700" height="85" fill="#16213e" rx="8"/><text x="400" y="178" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">転換の核心: 90日メッセージ制限</text><text x="400" y="202" text-anchor="middle" fill="#aaaacc" font-size="11">過去のやり取り（ナレッジ資産）が見えなくなる</text><text x="400" y="225" text-anchor="middle" fill="#aaaacc" font-size="11">→ ログへのアクセス欲求が課金動機になる</text><rect x="50" y="265" width="335" height="100" fill="#16213e" rx="6"/><text x="217" y="290" text-anchor="middle" fill="#ffffff" font-size="13">転換率</text><text x="217" y="325" text-anchor="middle" fill="#51cf66" font-size="28" font-weight="bold">~30%</text><rect x="415" y="265" width="335" height="100" fill="#16213e" rx="6"/><text x="582" y="290" text-anchor="middle" fill="#ffffff" font-size="13">モデル</text><text x="582" y="318" text-anchor="middle" fill="#4a9eff" font-size="14" font-weight="bold">Bottom-up PLG</text><text x="582" y="342" text-anchor="middle" fill="#aaaacc" font-size="11">個人採用→組織課金</text></svg>
- **ビジネスモデル**: 無料（メッセージ上限・連携数制限）+ Pro/Business+ $7.25〜
- **転換率**: 約 30%（チームが一定規模に達すると自然転換）
- **なぜ機能するのか:**
- - Bottom-up: 個人が導入 → チームに広がる → 組織単位で課金
- - 無料版の「過去90日分のメッセージ制限」が転換圧力の核心
- - ログへのアクセス欲求（ナレッジ資産）が課金動機になる
- **学び**: B2B フリーミアムは「個人採用 → 組織課金」のルートが最強


---

# Dropbox — バイラルループと容量制限

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Dropbox — バイラルループ構造</text><circle cx="400" cy="190" r="60" fill="#16213e" stroke="#4a9eff" stroke-width="2.5"/><text x="400" y="183" text-anchor="middle" fill="#4a9eff" font-size="13" font-weight="bold">無料</text><text x="400" y="202" text-anchor="middle" fill="#4a9eff" font-size="13" font-weight="bold">ユーザー</text><circle cx="180" cy="110" r="50" fill="#16213e" stroke="#51cf66" stroke-width="2"/><text x="180" y="103" text-anchor="middle" fill="#51cf66" font-size="11" font-weight="bold">ファイル</text><text x="180" y="122" text-anchor="middle" fill="#51cf66" font-size="11">共有</text><circle cx="620" cy="110" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="620" y="103" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">友達に</text><text x="620" y="122" text-anchor="middle" fill="#f9a825" font-size="11">紹介</text><circle cx="180" cy="290" r="50" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="180" y="283" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">容量</text><text x="180" y="302" text-anchor="middle" fill="#e91e63" font-size="11">増加</text><circle cx="620" cy="290" r="50" fill="#16213e" stroke="#7b68ee" stroke-width="2"/><text x="620" y="283" text-anchor="middle" fill="#7b68ee" font-size="11" font-weight="bold">新規</text><text x="620" y="302" text-anchor="middle" fill="#7b68ee" font-size="11">登録</text><line x1="340" y1="160" x2="228" y2="130" stroke="#51cf66" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="460" y1="160" x2="572" y2="130" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="572" y1="272" x2="460" y2="220" stroke="#7b68ee" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="228" y1="272" x2="340" y2="220" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12">ウイルス係数 k = 1.4 — CAC をユーザー側に転嫁する完璧な構造</text></svg>
- **ビジネスモデル**: 無料 2GB + Plus $11.99/月（2TB）
- **転換率**: 初期 2-3%（紹介プログラム後に急増）
- **成長の秘訣:**
- - 「友達を紹介すると容量増加」— CAC を無料で調達する完璧な構造
- - ファイル共有がそのまま製品のデモになる（ウイルス係数 k > 1）
- **制約の使い方**: 2GB は「使えるが足りない」ちょうど良いライン
- **現在の課題**: 競合（Google Drive, iCloud）による無料容量競争で差別化が困難


---

# Zoom — コロナが証明したフリーミアムの威力

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Zoom 40 分制限の天才的設計</text><rect x="50" y="50" width="320" height="280" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#4a9eff" font-size="14" font-weight="bold">無料ユーザー</text><text x="210" y="110" text-anchor="middle" fill="#aaaacc" font-size="12">40分まで使える</text><text x="210" y="135" text-anchor="middle" fill="#aaaacc" font-size="11">全機能利用可能</text><text x="210" y="158" text-anchor="middle" fill="#aaaacc" font-size="11">100人まで参加可能</text><text x="210" y="200" text-anchor="middle" fill="#ff6b6b" font-size="13" font-weight="bold">40分で切断</text><text x="210" y="225" text-anchor="middle" fill="#aaaacc" font-size="11">↓ 再接続の摩擦</text><text x="210" y="250" text-anchor="middle" fill="#aaaacc" font-size="11">個人: 我慢 or 転換</text><rect x="430" y="50" width="320" height="280" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="590" y="80" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">有料ユーザー</text><text x="590" y="110" text-anchor="middle" fill="#51cf66" font-size="13">時間無制限</text><text x="590" y="140" text-anchor="middle" fill="#51cf66" font-size="11">クラウド録画</text><text x="590" y="165" text-anchor="middle" fill="#51cf66" font-size="11">管理者機能</text><text x="590" y="195" text-anchor="middle" fill="#aaaacc" font-size="11">法人は</text><text x="590" y="218" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">即座に課金</text><text x="590" y="242" text-anchor="middle" fill="#aaaacc" font-size="11">40分は業務で許容不能</text><text x="400" y="362" text-anchor="middle" fill="#aaaacc" font-size="11">2020 コロナ禍: MAU 10倍（10M→300M）/ 時間制限 = 最強ゲート</text></svg>
- **制限**: 無料版は 40 分・100 人まで（全機能利用可能）
- **コロナ禍の爆発的成長**: 2020 年に MAU が 10 倍（10M → 300M）
- **40分制限の天才的な設計:**
- - 「40 分切れたら再接続」という摩擦が有料化動機に直結
- - 法人ユーザーは 40 分制限を業務で許容できない → 即座に有料化
- - 個人ユーザーは我慢 or 転換 — 二極化で双方から収益確保
- **学び**: 時間制限は「使える」体験を提供しつつ、有料化圧力を持続させる最強ゲート


---

# ゲーム F2P — 転換率 0.5-3% でも成立する理由

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">ゲーム F2P — クジラ（Whale）経済学</text><rect x="50" y="50" width="700" height="50" fill="#16213e" rx="4"/><rect x="50" y="50" width="560" height="50" fill="#16213e" rx="4"/><rect x="50" y="50" width="490" height="50" fill="#4a9eff" rx="4" opacity="0.3"/><text x="300" y="81" text-anchor="middle" fill="#aaaacc" font-size="12">無料ユーザー 98%+ — 収益ほぼゼロ</text><rect x="542" y="50" width="70" height="50" fill="#f9a825" rx="4" opacity="0.7"/><text x="577" y="81" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">小課金 1%</text><rect x="614" y="50" width="136" height="50" fill="#e91e63" rx="4" opacity="0.9"/><text x="682" y="81" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">クジラ 0.19%</text><text x="682" y="96" text-anchor="middle" fill="#ffffff" font-size="9">収益 48%</text><rect x="50" y="130" width="340" height="230" fill="#16213e" rx="8"/><text x="220" y="160" text-anchor="middle" fill="#aaaacc" font-size="13" font-weight="bold">ユーザー構成</text><rect x="70" y="175" width="300" height="25" fill="#4a9eff" rx="3" opacity="0.4"/><text x="375" y="193" fill="#4a9eff" font-size="11"> 無料 ~98%</text><rect x="70" y="210" width="60" height="25" fill="#f9a825" rx="3" opacity="0.7"/><text x="135" y="228" fill="#f9a825" font-size="11"> 小課金者 ~2%</text><rect x="70" y="245" width="10" height="25" fill="#e91e63" rx="3" opacity="0.9"/><text x="85" y="263" fill="#e91e63" font-size="11"> クジラ 0.19% → 収益の48%</text><rect x="410" y="130" width="340" height="230" fill="#16213e" rx="8"/><text x="580" y="160" text-anchor="middle" fill="#aaaacc" font-size="13" font-weight="bold">クジラが成立する理由</text><text x="430" y="195" fill="#f9a825" font-size="12">ARPPU $100〜数万/月</text><text x="430" y="222" fill="#aaaacc" font-size="11">ステータス欲求</text><text x="430" y="244" fill="#aaaacc" font-size="11">時間短縮・優越感</text><text x="430" y="266" fill="#aaaacc" font-size="11">ソーシャル圧力</text><text x="430" y="295" fill="#51cf66" font-size="11">無料ユーザー = ゲームを</text><text x="430" y="315" fill="#51cf66" font-size="11">賑やかにする背景装置</text><text x="400" y="378" text-anchor="middle" fill="#aaaacc" font-size="11">低転換率でも利益が出る = ARPPU が極めて高いため</text></svg>
- **パレート法則の極端版**: ユーザーの 1% 未満が収益の 50% 以上を生む
- **「クジラ（Whale）」経済学:**
- - 上位 0.19%（ヘビー課金者）が全収益の 48% を担う（研究データ）
- - 無料ユーザーはゲームを「賑やか」にする背景装置
- **なぜ低転換率でも利益が出るか:**
- - ARPPU（課金ユーザー 1 人当たり収益）が極めて高い（$100〜数万/月）
- - 無料ユーザーのインフラコストを課金者が補填


---

# Duolingo — ゲーミフィケーション型フリーミアム

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Duolingo — 習慣形成 × 損失回避エンジン</text><rect x="50" y="50" width="320" height="300" fill="#16213e" rx="8" stroke="#58cc02" stroke-width="2"/><text x="210" y="82" text-anchor="middle" fill="#58cc02" font-size="14" font-weight="bold">ゲーミフィケーション設計</text><text x="210" y="115" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold">🔥 365</text><text x="210" y="142" text-anchor="middle" fill="#aaaacc" font-size="12">ストリーク（連続記録）</text><text x="210" y="175" text-anchor="middle" fill="#aaaacc" font-size="11">記録を失いたくない心理</text><text x="210" y="198" text-anchor="middle" fill="#aaaacc" font-size="11">= 損失回避バイアス</text><text x="210" y="228" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">1日でも休むと消える</text><text x="210" y="285" text-anchor="middle" fill="#aaaacc" font-size="11">習慣形成 → 離脱率↓</text><text x="210" y="305" text-anchor="middle" fill="#aaaacc" font-size="11">ストリーク依存 → 課金動機</text><rect x="430" y="50" width="320" height="300" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="590" y="82" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Super Duolingo $6.99/月</text><text x="590" y="115" text-anchor="middle" fill="#51cf66" font-size="11">✓ ストリーク保護</text><text x="590" y="140" text-anchor="middle" fill="#51cf66" font-size="11">✓ 広告なし</text><text x="590" y="165" text-anchor="middle" fill="#51cf66" font-size="11">✓ 無制限ハート</text><text x="590" y="210" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="bold">転換率 ~8%</text><text x="590" y="240" text-anchor="middle" fill="#aaaacc" font-size="11">業界平均を大幅上回る</text><text x="590" y="275" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">MAU 9,700万</text><text x="590" y="298" text-anchor="middle" fill="#aaaacc" font-size="11">売上 $531M（+45% YoY）</text></svg>
- **ビジネスモデル**: 無料 + Super Duolingo $6.99/月（広告非表示・無制限ハート）
- **転換率**: 約 8%（高め — ゲーミフィケーションが習慣形成に寄与）
- **独自の仕組み:**
- - 「ストリーク（連続記録）」が課金動機に。記録を失いたくない心理
- - Super Duolingo はストリーク保護機能を売る — 感情的価値の課金
- **学び**: 習慣形成 × 損失回避バイアス = 強力な転換エンジン
- **2024年データ**: MAU 9,700万、売上 $531M（前年比 +45%）


---

# 失敗パターン① — 無料版と有料版の価値差がない

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">失敗パターン①: 無料版と有料版の価値差がない</text><rect x="50" y="50" width="700" height="130" fill="#16213e" rx="8" stroke="#ff6b6b" stroke-width="2"/><text x="400" y="80" text-anchor="middle" fill="#ff6b6b" font-size="14" font-weight="bold">症状: 転換率 0.5% 以下で停滞</text><text x="400" y="110" text-anchor="middle" fill="#aaaacc" font-size="12">有料版: 少し広告が減る・UIが少し変わる</text><text x="150" y="148" text-anchor="middle" fill="#51cf66" font-size="22" font-weight="bold">無料 ≈ 有料</text><text x="570" y="148" text-anchor="middle" fill="#ff6b6b" font-size="14">課金してもほぼ同じ体験</text><rect x="50" y="210" width="335" height="150" fill="#16213e" rx="6"/><text x="217" y="238" text-anchor="middle" fill="#aaaacc" font-size="13" font-weight="bold">根本原因</text><text x="80" y="266" fill="#ff6b6b" font-size="12">全部無料にした設計をそのまま</text><text x="80" y="290" fill="#ff6b6b" font-size="12">有料化しただけ</text><text x="80" y="318" fill="#aaaacc" font-size="11">有料版で解放されるものが</text><text x="80" y="338" fill="#aaaacc" font-size="11">ユーザーにとって嬉しくない</text><rect x="415" y="210" width="335" height="150" fill="#16213e" rx="6" stroke="#51cf66" stroke-width="1.5"/><text x="582" y="238" text-anchor="middle" fill="#51cf66" font-size="13" font-weight="bold">解決策</text><text x="445" y="268" fill="#51cf66" font-size="12">制限に当たった瞬間に</text><text x="445" y="290" fill="#51cf66" font-size="12">欲しくなるものをゲートに使う</text><text x="445" y="320" fill="#aaaacc" font-size="11">例: Zoom の40分制限</text><text x="445" y="340" fill="#aaaacc" font-size="11">Slack のメッセージ履歴制限</text></svg>
- **症状**: 転換率が 0.5% 以下で停滞。課金しても体験が大して変わらない
- **根本原因**:
- - 「とりあえず全部無料にした」設計がそのまま有料化されただけ
- - 有料版で解放されるものがユーザーにとって嬉しくない
- **解決策**:
- - 「制限に当たった瞬間に欲しくなるもの」を特定してゲートに使う
- **典型例**: Google Workspace の初期（Drive 15GB 制限は感じにくい）


---

# 失敗パターン② — 無料ユーザーがコストを食い潰す

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">失敗パターン②: 無料ユーザーがコストを食い潰す</text><text x="80" y="68" fill="#aaaacc" font-size="12">ユーザー数</text><line x1="80" y1="75" x2="720" y2="75" stroke="#51cf66" stroke-width="3"/><text x="730" y="80" fill="#51cf66" font-size="11">急増</text><text x="80" y="128" fill="#aaaacc" font-size="12">コスト</text><line x1="80" y1="135" x2="350" y2="105" stroke="#ff6b6b" stroke-width="2.5"/><line x1="350" y1="105" x2="720" y2="55" stroke="#ff6b6b" stroke-width="2.5"/><text x="730" y="60" fill="#ff6b6b" font-size="11">爆増</text><text x="80" y="188" fill="#aaaacc" font-size="12">収益</text><line x1="80" y1="195" x2="720" y2="175" stroke="#f9a825" stroke-width="2.5"/><text x="730" y="180" fill="#f9a825" font-size="11">微増</text><rect x="80" y="215" width="300" height="55" fill="#16213e" rx="5" stroke="#ff6b6b" stroke-width="1.5"/><text x="230" y="240" text-anchor="middle" fill="#ff6b6b" font-size="12">収益</text><text x="230" y="262" text-anchor="middle" fill="#aaaacc" font-size="11">有料ユーザー × ARPU（微増）</text><rect x="420" y="215" width="300" height="55" fill="#16213e" rx="5" stroke="#ff6b6b" stroke-width="1.5"/><text x="570" y="240" text-anchor="middle" fill="#ff6b6b" font-size="12">コスト</text><text x="570" y="262" text-anchor="middle" fill="#aaaacc" font-size="11">全ユーザー × コスト/人（急増）</text><rect x="80" y="300" width="640" height="70" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="328" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">計算式</text><text x="400" y="356" text-anchor="middle" fill="#aaaacc" font-size="12">利益 = (有料数 × ARPU) − (全ユーザー数 × コスト/人)</text></svg>
- **症状**: ユーザー数は増えるが赤字拡大。転換率が低いのに固定費が膨張
- **根本原因**:
- - 1 ユーザーあたりのインフラコストを甘く見積もった
- - 大量の無料ユーザーがサポートコストを爆増させる
- **計算式**: 利益 = (有料ユーザー数 × ARPU) − (全ユーザー × コスト/人)
- **解決策**: 無料枠を削減 or 使用量制限を強化して赤字を止める
- **典型例**: 初期 Evernote、過剰な無料容量を提供した後に削減で炎上


---

# 失敗パターン③ — Evernote に学ぶ制限の失敗（1/2）

- **2016年以前**: 「100年企業」を掲げる、無料でほぼ全機能開放
- **問題の顕在化**: 転換率が低く、無料ユーザー向けコストが膨大
- **2016年の転換点**: 無料版を「デバイス 2台まで」に突然制限
- **結果**: ユーザーの怒り爆発 → 競合（Notion, Bear）への大規模移行


---

# 失敗パターン③ — Evernote に学ぶ制限の失敗（2/2）

- **何が失敗だったか:**
- - 既存ユーザーが依存した後に「後出し制限」を導入
- - 制限内容が「使えない」レベルまで強すぎた
- **学び**: フリーミアムの制限は最初から設計する。後から締めると信頼を失う


---

# 失敗事例まとめマトリクス

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアム失敗パターン分類</text><rect x='30' y='45' width='330' height='100' fill='#ff6b6b' rx='6' opacity='0.85'/><text x='195' y='70' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>① 価値差がない</text><text x='195' y='92' text-anchor='middle' fill='#ffe0e0' font-size='11'>無料で十分、有料の魅力ゼロ</text><text x='195' y='112' text-anchor='middle' fill='#ffe0e0' font-size='11'>例: 機能が重複している Pro プラン</text><text x='195' y='132' text-anchor='middle' fill='#ffaaaa' font-size='11'>転換率 → 0.5% 以下</text><rect x='400' y='45' width='330' height='100' fill='#ff9f43' rx='6' opacity='0.85'/><text x='565' y='70' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>② コスト過多</text><text x='565' y='92' text-anchor='middle' fill='#ffe8d0' font-size='11'>無料ユーザーが赤字を生み続ける</text><text x='565' y='112' text-anchor='middle' fill='#ffe8d0' font-size='11'>例: 過剰ストレージ・無制限API</text><text x='565' y='132' text-anchor='middle' fill='#ffccaa' font-size='11'>規模拡大 → 赤字拡大</text><rect x='30' y='162' width='330' height='100' fill='#ee5a24' rx='6' opacity='0.85'/><text x='195' y='187' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>③ 後出し制限</text><text x='195' y='209' text-anchor='middle' fill='#ffe0e0' font-size='11'>依存後の急激な制限変更</text><text x='195' y='229' text-anchor='middle' fill='#ffe0e0' font-size='11'>例: Evernote 2016 年</text><text x='195' y='249' text-anchor='middle' fill='#ffaaaa' font-size='11'>ユーザー離反・競合移行</text><rect x='400' y='162' width='330' height='100' fill='#7b68ee' rx='6' opacity='0.85'/><text x='565' y='187' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>④ 転換への動線なし</text><text x='565' y='209' text-anchor='middle' fill='#e8e0ff' font-size='11'>制限に当たっても課金できない UX</text><text x='565' y='229' text-anchor='middle' fill='#e8e0ff' font-size='11'>例: Upgrade ボタンが見つからない</text><text x='565' y='249' text-anchor='middle' fill='#ccaaff' font-size='11'>転換機会を自らブロック</text></svg>


---

# 成功と失敗の分岐点 — 何が違うのか

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">成功と失敗の分岐点</text><rect x="30" y="50" width="360" height="300" fill="#16213e" rx="8" stroke="#51cf66" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#51cf66" font-size="14" font-weight="bold">成功するフリーミアム</text><text x="50" y="115" fill="#51cf66" font-size="20">✓</text><text x="75" y="115" fill="#ffffff" font-size="12" font-weight="bold">制限が「痛い」</text><text x="75" y="133" fill="#aaaacc" font-size="11">成長とともに制限に当たる設計</text><text x="50" y="168" fill="#51cf66" font-size="20">✓</text><text x="75" y="168" fill="#ffffff" font-size="12" font-weight="bold">転換が「簡単」</text><text x="75" y="186" fill="#aaaacc" font-size="11">その場でシームレスにアップグレード</text><text x="50" y="221" fill="#51cf66" font-size="20">✓</text><text x="75" y="221" fill="#ffffff" font-size="12" font-weight="bold">価値が「明確」</text><text x="75" y="239" fill="#aaaacc" font-size="11">有料版で何が解決するか即座に理解</text><rect x="410" y="50" width="360" height="300" fill="#16213e" rx="8" stroke="#ff6b6b" stroke-width="2"/><text x="590" y="80" text-anchor="middle" fill="#ff6b6b" font-size="14" font-weight="bold">失敗するフリーミアム</text><text x="430" y="115" fill="#ff6b6b" font-size="20">✗</text><text x="455" y="115" fill="#ffffff" font-size="12" font-weight="bold">無料版が「完成品」</text><text x="455" y="133" fill="#aaaacc" font-size="11">転換動機ゼロ → 転換しない</text><text x="430" y="168" fill="#ff6b6b" font-size="20">✗</text><text x="455" y="168" fill="#ffffff" font-size="12" font-weight="bold">制限が「使えない」レベル</text><text x="455" y="186" fill="#aaaacc" font-size="11">ユーザーが離れる</text><text x="430" y="221" fill="#ff6b6b" font-size="20">✗</text><text x="455" y="221" fill="#ffffff" font-size="12" font-weight="bold">Upgrade への導線なし</text><text x="455" y="239" fill="#aaaacc" font-size="11">転換機会を自らブロック</text></svg>
- **成功するフリーミアムの共通点 3 つ:**
- - **① 制限が「痛い」**: 無料ユーザーが成長とともに制限に当たる設計
- - **② 転換が「簡単」**: 制限に当たった瞬間にシームレスにアップグレードできる
- - **③ 価値が「明確」**: 有料版で何が解決するか、ユーザーが即座に理解できる
- **失敗するフリーミアムの共通点:**
- - 無料版が「完成品」になっている（転換動機ゼロ）
- - 制限が「使い物にならない」レベル（ユーザーが去る）


---

<!-- _class: lead -->
# Part 4

- フリーミアム設計理論
- ゲート設計・PLG・Expansion Revenue


---

# フリーミアム設計フレームワーク — 4 象限

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='26' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアム設計 4 象限マトリクス</text><text x='380' y='48' text-anchor='middle' fill='#aaaacc' font-size='12'>X軸: 機能制限の強さ　Y軸: 使用量制限の強さ</text><line x1='380' y1='60' x2='380' y2='280' stroke='#444' stroke-width='1.5'/><line x1='60' y1='170' x2='700' y2='170' stroke='#444' stroke-width='1.5'/><text x='220' y='100' text-anchor='middle' fill='#51cf66' font-size='13' font-weight='bold'>Usage Gate</text><text x='220' y='120' text-anchor='middle' fill='#aaffaa' font-size='11'>API・ストレージ上限</text><text x='220' y='138' text-anchor='middle' fill='#aaffaa' font-size='11'>例: AWS Free Tier</text><text x='220' y='155' text-anchor='middle' fill='#888' font-size='10'>使用量↑で自然転換</text><text x='540' y='100' text-anchor='middle' fill='#ffd43b' font-size='13' font-weight='bold'>Hybrid</text><text x='540' y='120' text-anchor='middle' fill='#ffffaa' font-size='11'>機能＋使用量 両方制限</text><text x='540' y='138' text-anchor='middle' fill='#ffffaa' font-size='11'>例: Notion, HubSpot</text><text x='540' y='155' text-anchor='middle' fill='#888' font-size='10'>最も複雑だが最も強力</text><text x='220' y='210' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>薄いフリー（危険）</text><text x='220' y='230' text-anchor='middle' fill='#ffaaaa' font-size='11'>制限弱すぎ → 転換しない</text><text x='220' y='248' text-anchor='middle' fill='#ffaaaa' font-size='11'>コストだけ膨らむ</text><text x='540' y='210' text-anchor='middle' fill='#4a9eff' font-size='13' font-weight='bold'>Feature Gate</text><text x='540' y='230' text-anchor='middle' fill='#aaddff' font-size='11'>基本機能無料・高度機能有料</text><text x='540' y='248' text-anchor='middle' fill='#aaddff' font-size='11'>例: Slack, Zoom, GitHub</text><text x='550' y='170' fill='#888' font-size='11'> 機能制限 強 →</text><text x='60' y='168' fill='#888' font-size='11'>← 弱</text><text x='380' y='58' text-anchor='middle' fill='#888' font-size='11'>↑ 使用量制限 強</text><text x='380' y='292' text-anchor='middle' fill='#888' font-size='11'>↓ 弱</text></svg>


---

# 3 つのゲートタイプ — Feature / Usage / Time

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">3 つのゲートタイプ比較</text><rect x="30" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="144" y="85" text-anchor="middle" fill="#4a9eff" font-size="14" font-weight="bold">Feature Gate</text><text x="144" y="108" text-anchor="middle" fill="#aaaacc" font-size="11">機能制限</text><text x="144" y="140" text-anchor="middle" fill="#ffffff" font-size="11">基本機能は無料</text><text x="144" y="160" text-anchor="middle" fill="#ffffff" font-size="11">高度機能は有料</text><text x="144" y="195" text-anchor="middle" fill="#aaaacc" font-size="10">例: Slack ワークフロー</text><text x="144" y="213" text-anchor="middle" fill="#aaaacc" font-size="10">Zoom 管理機能</text><text x="144" y="250" text-anchor="middle" fill="#4a9eff" font-size="11">向く製品</text><text x="144" y="270" text-anchor="middle" fill="#aaaacc" font-size="11">B2B SaaS</text><text x="144" y="290" text-anchor="middle" fill="#aaaacc" font-size="11">コラボツール</text><rect x="286" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#51cf66" stroke-width="2"/><text x="400" y="85" text-anchor="middle" fill="#51cf66" font-size="14" font-weight="bold">Usage Gate</text><text x="400" y="108" text-anchor="middle" fill="#aaaacc" font-size="11">使用量制限</text><text x="400" y="140" text-anchor="middle" fill="#ffffff" font-size="11">一定量まで無料</text><text x="400" y="160" text-anchor="middle" fill="#ffffff" font-size="11">超過分は課金</text><text x="400" y="195" text-anchor="middle" fill="#aaaacc" font-size="10">例: Dropbox 2GB</text><text x="400" y="213" text-anchor="middle" fill="#aaaacc" font-size="10">SendGrid 100通/日</text><text x="400" y="250" text-anchor="middle" fill="#51cf66" font-size="11">向く製品</text><text x="400" y="270" text-anchor="middle" fill="#aaaacc" font-size="11">ストレージ・API</text><text x="400" y="290" text-anchor="middle" fill="#aaaacc" font-size="11">メール配信</text><rect x="542" y="50" width="228" height="300" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="656" y="85" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Time Gate</text><text x="656" y="108" text-anchor="middle" fill="#aaaacc" font-size="11">期間制限</text><text x="656" y="140" text-anchor="middle" fill="#ffffff" font-size="11">評価期間後に</text><text x="656" y="160" text-anchor="middle" fill="#ffffff" font-size="11">判断を迫る</text><text x="656" y="195" text-anchor="middle" fill="#aaaacc" font-size="10">例: Adobe CC 7日</text><text x="656" y="213" text-anchor="middle" fill="#aaaacc" font-size="10">Salesforce 30日</text><text x="656" y="250" text-anchor="middle" fill="#f9a825" font-size="11">向く製品</text><text x="656" y="270" text-anchor="middle" fill="#aaaacc" font-size="11">Enterprise SaaS</text><text x="656" y="290" text-anchor="middle" fill="#aaaacc" font-size="11">高価格ツール</text></svg>
- **Feature Gate（機能制限）**
- - 基本機能は無料、高度機能は有料（例: Slack の承認ワークフロー）
- - 向く製品: B2B SaaS、コラボレーションツール
- **Usage Gate（使用量制限）**
- - 一定量まで無料、超過分は課金（例: Dropbox 2GB, SendGrid 100通/日）
- - 向く製品: ストレージ、API、メール配信
- **Time Gate（期間制限）**: Free Trial の形式。評価期間後に判断を迫る


---

# 転換の摩擦を下げる UX 設計（1/2）

- **摩擦の主な原因:**
- - Upgrade ページまでのクリック数が多い
- - 支払い方法の入力が煩雑
- - プラン比較が複雑すぎて決断できない


---

# 転換の摩擦を下げる UX 設計（2/2）

- **摩擦削減の実践:**
- - 制限に当たった場所に「その場でアップグレード」ボタンを置く
- - 年払い vs 月払いの差額を明示（年払い推奨: LTV 向上）
- **原則**: ユーザーが「課金したい」と思った瞬間を逃さない


---

# 心理的価格設定とアンカリング効果

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">アンカリング効果と価格段階設計</text><rect x="30" y="50" width="180" height="280" fill="#16213e" rx="8" stroke="#7b68ee" stroke-width="2"/><text x="120" y="88" text-anchor="middle" fill="#7b68ee" font-size="13" font-weight="bold">Enterprise</text><text x="120" y="120" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="bold">$499</text><text x="120" y="145" text-anchor="middle" fill="#aaaacc" font-size="10">/月</text><text x="120" y="178" text-anchor="middle" fill="#7b68ee" font-size="10">先に見せてアンカー</text><rect x="230" y="30" width="240" height="320" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="3"/><text x="350" y="65" text-anchor="middle" fill="#f9a825" font-size="11">★ おすすめ ★</text><text x="350" y="98" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Pro</text><text x="350" y="140" text-anchor="middle" fill="#ffffff" font-size="36" font-weight="bold">$99</text><text x="350" y="165" text-anchor="middle" fill="#aaaacc" font-size="10">/月</text><text x="350" y="200" text-anchor="middle" fill="#f9a825" font-size="11">← 中間バイアスで</text><text x="350" y="220" text-anchor="middle" fill="#f9a825" font-size="11">ここに誘導する</text><rect x="490" y="50" width="180" height="280" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="580" y="88" text-anchor="middle" fill="#4a9eff" font-size="13" font-weight="bold">Basic</text><text x="580" y="120" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="bold">$29</text><text x="580" y="145" text-anchor="middle" fill="#aaaacc" font-size="10">/月</text><text x="580" y="178" text-anchor="middle" fill="#4a9eff" font-size="10">比較で安く見える</text><text x="400" y="375" text-anchor="middle" fill="#aaaacc" font-size="11">3プラン構成 — Enterprise を先に見せてアンカリングを作る</text></svg>
- **アンカリング**: 先に高い価格を見せることで、次の価格を安く感じさせる
- 例: Enterprise $499 → Pro $99 → Basic $29 の順に見せる
- **価格の段階設計（Good/Better/Best）:**
- - 3プラン構成で、真ん中を「おすすめ」にする
- - 目標は「真ん中プラン」への誘導（中間バイアス）
- **無料トライアルの心理**: 月払い $20 より「まず 30 日無料」が転換率 2〜3 倍


---

# PLG（Product-Led Growth）との関係

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">PLG vs SLG — 成長モデルの比較</text><rect x="30" y="50" width="355" height="300" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="207" y="82" text-anchor="middle" fill="#4a9eff" font-size="14" font-weight="bold">PLG（製品主導型）</text><text x="207" y="112" text-anchor="middle" fill="#aaaacc" font-size="12">製品がユーザー獲得のドライバー</text><text x="207" y="145" text-anchor="middle" fill="#ffffff" font-size="11">無料 → 体験 → 自然転換</text><text x="207" y="168" text-anchor="middle" fill="#ffffff" font-size="11">低 CAC・高スケーラビリティ</text><text x="207" y="198" text-anchor="middle" fill="#f9a825" font-size="11">向く市場: SMB・Developer</text><text x="207" y="225" text-anchor="middle" fill="#aaaacc" font-size="10">例: Slack, Dropbox, GitHub</text><text x="207" y="268" text-anchor="middle" fill="#4a9eff" font-size="12" font-weight="bold">エンジニアリング課題</text><text x="207" y="290" text-anchor="middle" fill="#aaaacc" font-size="11">製品内の転換設計が核心</text><rect x="415" y="50" width="355" height="300" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="592" y="82" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">SLG（営業主導型）</text><text x="592" y="112" text-anchor="middle" fill="#aaaacc" font-size="12">営業が獲得・転換を主導</text><text x="592" y="145" text-anchor="middle" fill="#ffffff" font-size="11">デモ → 提案 → 契約</text><text x="592" y="168" text-anchor="middle" fill="#ffffff" font-size="11">高 CAC・大型案件向き</text><text x="592" y="198" text-anchor="middle" fill="#f9a825" font-size="11">向く市場: Enterprise</text><text x="592" y="225" text-anchor="middle" fill="#aaaacc" font-size="10">例: Salesforce, SAP, Oracle</text><text x="592" y="268" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">営業エンジニアリング</text><text x="592" y="290" text-anchor="middle" fill="#aaaacc" font-size="11">POC・統合支援が核心</text></svg>
- **PLG の定義**: 製品自体がユーザー獲得・転換・拡大の主なドライバー
- **フリーミアムは PLG の中核戦略:**
- - 無料で使わせる → 価値を体験させる → 自然に課金に至る
- **Sales-Led Growth との違い:**
- - SLG: 営業が主導（Enterprise向け）
- - PLG: 製品が主導（SMB・Developer向け）
- **エンジニアへの示唆**: PLG を支える「製品内の転換設計」はエンジニアリング課題


---

# Expansion Revenue — アップセル設計

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">Expansion Revenue — NRR と拡大パターン</text><rect x="40" y="50" width="720" height="65" fill="#16213e" rx="8"/><text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">NRR（Net Revenue Retention）&gt; 100% = 解約を超えて純増</text><text x="400" y="104" text-anchor="middle" fill="#aaaacc" font-size="11">既存顧客からの収益拡大率 — スタートアップの健全性指標</text><rect x="40" y="135" width="220" height="210" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="150" y="166" text-anchor="middle" fill="#4a9eff" font-size="13" font-weight="bold">アップセル</text><text x="150" y="195" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">↑</text><text x="150" y="225" text-anchor="middle" fill="#aaaacc" font-size="11">上位プランへの移行</text><text x="150" y="248" text-anchor="middle" fill="#aaaacc" font-size="11">機能拡張で解決</text><rect x="290" y="135" width="220" height="210" fill="#16213e" rx="8" stroke="#51cf66" stroke-width="2"/><text x="400" y="166" text-anchor="middle" fill="#51cf66" font-size="13" font-weight="bold">クロスセル</text><text x="400" y="195" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">+</text><text x="400" y="225" text-anchor="middle" fill="#aaaacc" font-size="11">隣接製品追加</text><text x="400" y="248" text-anchor="middle" fill="#aaaacc" font-size="11">アドオン購入</text><rect x="540" y="135" width="220" height="210" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="650" y="166" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">使用量拡大</text><text x="650" y="195" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">×</text><text x="650" y="225" text-anchor="middle" fill="#aaaacc" font-size="11">席数・API量増加</text><text x="650" y="248" text-anchor="middle" fill="#aaaacc" font-size="11">Usage Billing</text><text x="400" y="375" text-anchor="middle" fill="#f9a825" font-size="11">設計原則: 成長するほど自然に課金額が増える構造を作る</text></svg>
- **Net Revenue Retention (NRR)**: 既存顧客からの収益拡大率
- - NRR > 100% → 解約を補填しても純増（最高の状態）
- **Expansion の 3 パターン:**
- - アップセル: 上位プランへの移行（機能拡張）
- - クロスセル: 隣接製品・アドオンの追加購入
- - 使用量拡大: 席数・API量・ストレージの自然増加（Usage Billing）
- **設計原則**: 成長するほど自然に課金額が増える構造を作る


---

# チャーン防止とリテンション戦略（1/2）

- **チャーンの 2 種類:**
- - 自発的チャーン: ユーザーが意図して解約
- - 非自発的チャーン: クレジットカード失効・支払い失敗
- **防止策（自発的）:**


---

# チャーン防止とリテンション戦略（2/2）

- - オンボーディングで早期に「価値実感（Aha Moment）」を届ける
- - 利用が落ちたユーザーへの自動リエンゲージメント
- **防止策（非自発的）**: dunning management（支払い失敗の自動リトライ）
- **法則**: 解約を申し出たユーザーに「1ヶ月無料」を提示すると 30% が留まる


---

<!-- _class: lead -->
# Part 5

- エンジニア実践知識
- 計測・実装・テスト・スケーリング


---

# 転換率トラッキングのデータ設計

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">転換イベント計測パイプライン</text><rect x="50" y="55" width="140" height="55" fill="#16213e" rx="6" stroke="#4a9eff" stroke-width="1.5"/><text x="120" y="78" text-anchor="middle" fill="#4a9eff" font-size="11" font-weight="bold">制限ヒット</text><text x="120" y="98" text-anchor="middle" fill="#aaaacc" font-size="10">upgrade_prompt_shown</text><polygon points="195,83 220,73 220,93" fill="#f9a825"/><line x1="190" y1="83" x2="220" y2="83" stroke="#f9a825" stroke-width="2"/><rect x="225" y="55" width="140" height="55" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/><text x="295" y="78" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">クリック</text><text x="295" y="98" text-anchor="middle" fill="#aaaacc" font-size="10">upgrade_clicked</text><polygon points="370,83 395,73 395,93" fill="#f9a825"/><line x1="365" y1="83" x2="395" y2="83" stroke="#f9a825" stroke-width="2"/><rect x="400" y="55" width="140" height="55" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1.5"/><text x="470" y="78" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">チェックアウト</text><text x="470" y="98" text-anchor="middle" fill="#aaaacc" font-size="10">checkout_started</text><polygon points="545,83 570,73 570,93" fill="#f9a825"/><line x1="540" y1="83" x2="570" y2="83" stroke="#f9a825" stroke-width="2"/><rect x="575" y="55" width="155" height="55" fill="#e91e63" rx="6" opacity="0.85"/><text x="652" y="78" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">完了</text><text x="652" y="98" text-anchor="middle" fill="#ffffff" font-size="10">checkout_completed</text><rect x="50" y="150" width="700" height="80" fill="#16213e" rx="8"/><text x="400" y="180" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">転換率 = checkout_completed / upgrade_prompt_shown</text><text x="400" y="210" text-anchor="middle" fill="#aaaacc" font-size="11">各ステップの離脱率を計測して摩擦点を特定する</text><rect x="50" y="260" width="336" height="100" fill="#16213e" rx="6"/><text x="218" y="288" text-anchor="middle" fill="#aaaacc" font-size="12">重要メタデータ</text><text x="80" y="315" fill="#4a9eff" font-size="11">triggerPoint: どの制限に当たったか</text><text x="80" y="340" fill="#4a9eff" font-size="11">planFrom / planTo: プラン変遷</text><rect x="414" y="260" width="336" height="100" fill="#16213e" rx="6"/><text x="582" y="288" text-anchor="middle" fill="#aaaacc" font-size="12">分析活用</text><text x="444" y="315" fill="#51cf66" font-size="11">どの制限が最も転換を生むか</text><text x="444" y="340" fill="#51cf66" font-size="11">ファネルのどこで離脱するか</text></svg>
- 転換イベントを計測するためのイベントスキーマ設計（TypeScript）


---

# 転換率トラッキングのデータ設計（コード例）

```typescript
// 転換イベントのトラッキングスキーマ
interface ConversionEvent {
  userId: string;
  eventType: 'upgrade_prompt_shown'
    | 'upgrade_clicked'
    | 'checkout_started'
    | 'checkout_completed';
  planFrom: 'free' | 'basic' | 'pro';
  planTo: 'basic' | 'pro' | 'enterprise';
  triggerPoint: string;   // どの制限に当たったか
  timestamp: Date;
}
// 転換率 = checkout_completed / upgrade_prompt_shown
```


---

# MRR / ARR / NRR の計算実装

- サブスクリプション収益の主要指標を計算する関数群


---

# MRR / ARR / NRR の計算実装（コード例）

```typescript
function calcMRR(subscriptions: Subscription[]): number {
  return subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.monthlyAmount, 0);
}
function calcNRR(
  startMRR: number,
  expansionMRR: number,
  contractionMRR: number,
  churnMRR: number
): number {
  // NRR > 100% = 解約超えて成長
  return ((startMRR + expansionMRR - contractionMRR - churnMRR)
    / startMRR) * 100;
}
```


---

# コホート分析の実装

- 登録月別のリテンション率を計算するクエリ（BigQuery / PostgreSQL）


---

# コホート分析の実装（コード例）

```sql
-- コホート分析: 登録月別のリテンション率
SELECT
  DATE_TRUNC(u.created_at, MONTH) AS cohort_month,
  DATE_DIFF(e.event_month, cohort_month, MONTH) AS months_after,
  COUNT(DISTINCT e.user_id) AS active_users,
  COUNT(DISTINCT u.id) AS cohort_size,
  ROUND(COUNT(DISTINCT e.user_id)
    / COUNT(DISTINCT u.id) * 100, 1) AS retention_rate
FROM users u
JOIN monthly_active_events e USING(user_id)
GROUP BY 1, 2
ORDER BY 1, 2;
```


---

# フィーチャーフラグ設計

- プラン別の機能制御をフィーチャーフラグで管理する設計


---

# フィーチャーフラグ設計（コード例）

```typescript
// プラン定義とフィーチャーフラグ
const PLAN_FEATURES: Record<Plan, Feature[]> = {
  free:       ['basic_search', 'limited_export'],
  pro:        ['advanced_search', 'unlimited_export', 'api_access'],
  enterprise: ['sso', 'audit_log', 'custom_roles', 'sla'],
};
function canAccess(user: User, feature: Feature): boolean {
  const features = PLAN_FEATURES[user.plan];
  if (!features.includes(feature)) {
    trackUpgradePrompt(user, feature); // 制限ヒット時に計測
    return false;
  }
  return true;
}
```


---

# 使用量制限の実装パターン

- Redis を用いたスライディングウィンドウによる使用量制限実装


---

# 使用量制限の実装パターン（コード例）

```typescript
// Redis スライディングウィンドウで月次利用量を制御
async function checkUsageLimit(
  userId: string, action: string, limit: number
): Promise<{ allowed: boolean; used: number }> {
  const key = `usage:${userId}:${action}:${monthKey()}`;
  const used = await redis.incr(key);
  if (used === 1) await redis.expire(key, 60 * 60 * 24 * 31);
  if (used > limit) {
    await trackUpgradePrompt(userId, `${action}_limit`);
    return { allowed: false, used };
  }
  return { allowed: true, used };
}
```


---

# 課金フロー設計 — Stripe 連携の実例

- Stripe Checkout を使った安全な課金フロー実装


---

# 課金フロー設計 — Stripe 連携の実例（コード例）

```typescript
// Stripe Checkout セッション作成
async function createCheckoutSession(
  userId: string, priceId: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: await getOrCreateCustomer(userId),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${BASE_URL}/billing/success`,
    cancel_url:  `${BASE_URL}/billing/cancel`,
    metadata: { userId },
  });
  return session.url!;
}
```


---

# 分析ダッシュボードの構成

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='26' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアム分析ダッシュボード構成</text><rect x='30' y='45' width='160' height='70' fill='#2a2a4e' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='110' y='72' text-anchor='middle' fill='#4a9eff' font-size='13' font-weight='bold'>MRR</text><text x='110' y='92' text-anchor='middle' fill='#ffffff' font-size='20' font-weight='bold'>$124K</text><text x='110' y='108' text-anchor='middle' fill='#51cf66' font-size='11'>+12% MoM</text><rect x='200' y='45' width='160' height='70' fill='#2a2a4e' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='280' y='72' text-anchor='middle' fill='#7b68ee' font-size='13' font-weight='bold'>転換率</text><text x='280' y='92' text-anchor='middle' fill='#ffffff' font-size='20' font-weight='bold'>3.2%</text><text x='280' y='108' text-anchor='middle' fill='#51cf66' font-size='11'>+0.4pt MoM</text><rect x='370' y='45' width='160' height='70' fill='#2a2a4e' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='450' y='72' text-anchor='middle' fill='#51cf66' font-size='13' font-weight='bold'>LTV</text><text x='450' y='92' text-anchor='middle' fill='#ffffff' font-size='20' font-weight='bold'>$480</text><text x='450' y='108' text-anchor='middle' fill='#aaaacc' font-size='11'>平均契約期間 32ヶ月</text><rect x='540' y='45' width='190' height='70' fill='#2a2a4e' rx='6' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='635' y='72' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>チャーンレート</text><text x='635' y='92' text-anchor='middle' fill='#ffffff' font-size='20' font-weight='bold'>2.1%</text><text x='635' y='108' text-anchor='middle' fill='#ff6b6b' font-size='11'>-0.3pt MoM</text><rect x='30' y='130' width='330' height='140' fill='#2a2a4e' rx='6'/><text x='195' y='152' text-anchor='middle' fill='#aaaacc' font-size='12' font-weight='bold'>コホート別リテンション</text><text x='60' y='175' fill='#777' font-size='11'>月 0</text><text x='100' y='175' fill='#777' font-size='11'>月 1</text><text x='140' y='175' fill='#777' font-size='11'>月 3</text><text x='180' y='175' fill='#777' font-size='11'>月 6</text><text x='220' y='175' fill='#777' font-size='11'>月 12</text><rect x='55' y='182' width='18' height='60' fill='#4a9eff' rx='2'/><rect x='95' y='202' width='18' height='40' fill='#4a9eff' rx='2'/><rect x='135' y='212' width='18' height='30' fill='#4a9eff' rx='2'/><rect x='175' y='222' width='18' height='20' fill='#4a9eff' rx='2'/><rect x='215' y='227' width='18' height='15' fill='#4a9eff' rx='2'/><text x='195' y='258' text-anchor='middle' fill='#4a9eff' font-size='10'>Jan 2025 コホート</text><rect x='370' y='130' width='360' height='140' fill='#2a2a4e' rx='6'/><text x='550' y='152' text-anchor='middle' fill='#aaaacc' font-size='12' font-weight='bold'>転換ファネル（今月）</text><rect x='390' y='165' width='320' height='18' fill='#4a9eff' rx='2'/><text x='720' y='178' fill='#aaaacc' font-size='10'>無料登録 4,821</text><rect x='390' y='192' width='210' height='18' fill='#7b68ee' rx='2'/><text x='720' y='205' fill='#aaaacc' font-size='10'>アクティブ 3,148</text><rect x='390' y='219' width='50' height='18' fill='#51cf66' rx='2'/><text x='720' y='232' fill='#aaaacc' font-size='10'>転換 154 (3.2%)</text></svg>


---

# 機械学習で転換を予測する — 行動データの活用

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">ML 転換予測 — 重要特徴量</text><rect x="40" y="50" width="720" height="50" fill="#16213e" rx="6"/><text x="400" y="72" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">課題: 「今すぐ課金しそうなユーザー」を事前特定 → 介入</text><text x="400" y="90" text-anchor="middle" fill="#aaaacc" font-size="11">モデル: XGBoost + SHAP 説明性</text><rect x="40" y="118" width="700" height="32" fill="#16213e" rx="3"/><rect x="40" y="118" width="560" height="32" fill="#4a9eff" rx="3" opacity="0.8"/><text x="620" y="139" fill="#aaaacc" font-size="11"> セッション頻度・継続日数</text><rect x="40" y="158" width="700" height="32" fill="#16213e" rx="3"/><rect x="40" y="158" width="490" height="32" fill="#f9a825" rx="3" opacity="0.8"/><text x="540" y="179" fill="#aaaacc" font-size="11"> 制限への到達回数</text><rect x="40" y="198" width="700" height="32" fill="#16213e" rx="3"/><rect x="40" y="198" width="350" height="32" fill="#51cf66" rx="3" opacity="0.8"/><text x="400" y="219" fill="#aaaacc" font-size="11"> 招待送信・チーム追加</text><rect x="40" y="238" width="700" height="32" fill="#16213e" rx="3"/><rect x="40" y="238" width="280" height="32" fill="#e91e63" rx="3" opacity="0.8"/><text x="330" y="259" fill="#aaaacc" font-size="11"> コア機能使用率</text><rect x="40" y="295" width="700" height="80" fill="#16213e" rx="6"/><text x="400" y="323" text-anchor="middle" fill="#aaaacc" font-size="11">SHAP で「なぜそのユーザーか」を解釈可能に</text><text x="400" y="350" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">介入例: スコア高 → パーソナライズ Upgrade 通知を送る</text></svg>
- **課題**: 「今すぐ課金しそうなユーザー」を事前に特定して営業・UX 介入
- **予測特徴量（重要度順）:**
- - セッション頻度・継続日数（習慣形成度）
- - 制限への到達回数（転換圧力の強さ）
- - 招待送信・チームメンバー追加（ネットワーク形成）
- - コア機能の使用率（価値実感度）
- **モデル**: XGBoost + SHAP 説明性 — 「なぜそのユーザーか」を解釈可能に


---

# 無料枠の悪用対策（1/2）

- **よくある悪用パターン:**
- - 複数アカウント作成による無料枠の繰り返し取得
- - スクレイピング・API 連打による過剰利用
- - 無料枠をビジネス転用（個人プランで業務利用）


---

# 無料枠の悪用対策（2/2）

- **対策の実装:**
- - メール検証 + 電話番号認証（アカウント重複防止）
- - レートリミット + 異常検知（行動ベースのボット対策）
- **設計原則**: セキュリティ強化と UX のバランス — 誠実なユーザーを傷つけない


---

# 課金フローのテスト戦略

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">課金フローのテスト層</text><rect x="40" y="50" width="700" height="55" fill="#16213e" rx="6" stroke="#ff6b6b" stroke-width="1.5"/><text x="400" y="75" text-anchor="middle" fill="#ff6b6b" font-size="13" font-weight="bold">E2E テスト（Stripe テストモード）</text><text x="400" y="97" text-anchor="middle" fill="#aaaacc" font-size="11">実際の課金フロー全体を自動化 — 最重要層</text><rect x="80" y="118" width="620" height="55" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="143" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">統合テスト（Webhook → DB → 権限変更）</text><text x="400" y="165" text-anchor="middle" fill="#aaaacc" font-size="11">Stripe Webhook 受信 → DB 更新 → 権限変更の一連フロー</text><rect x="160" y="186" width="460" height="55" fill="#16213e" rx="6" stroke="#51cf66" stroke-width="1.5"/><text x="400" y="211" text-anchor="middle" fill="#51cf66" font-size="13" font-weight="bold">単体テスト（プラン変更ロジック）</text><text x="400" y="233" text-anchor="middle" fill="#aaaacc" font-size="11">プラン変更・使用量計算の境界値</text><rect x="40" y="265" width="700" height="105" fill="#16213e" rx="6"/><text x="400" y="290" text-anchor="middle" fill="#aaaacc" font-size="12" font-weight="bold">必須テストケース</text><text x="100" y="316" fill="#4a9eff" font-size="11">アップグレード</text><text x="245" y="316" fill="#f9a825" font-size="11">ダウングレード</text><text x="390" y="316" fill="#e91e63" font-size="11">解約</text><text x="100" y="350" fill="#ff6b6b" font-size="11">決済失敗</text><text x="245" y="350" fill="#7b68ee" font-size="11">トライアル終了</text><text x="390" y="350" fill="#51cf66" font-size="11">二重請求防止</text></svg>
- **課金フローはバグが最も高コストな領域:**
- - 二重請求・未請求・プラン不整合は顧客信頼を破壊する
- **テスト層の構成:**
- - 単体テスト: プラン変更ロジック、使用量計算の境界値
- - 統合テスト: Stripe Webhook の受信 → DB 更新 → 権限変更の一連フロー
- - E2E テスト: Stripe テストモードで実際の課金フロー全体を自動化
- **必須テストケース**: アップグレード・ダウングレード・解約・決済失敗・トライアル終了


---

<!-- _class: lead -->
# Part 6

- まとめ
- フリーミアムは儲かるのか？ — 条件付きで Yes


---

# 結論：条件付きで Yes — 3 つの必要条件

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアムが「儲かる」3 つの必要条件</text><rect x='30' y='50' width='210' height='210' fill='#4a9eff' rx='10' style='filter:drop-shadow(3px 3px 6px rgba(0,0,0,0.5))'/><text x='135' y='88' text-anchor='middle' fill='#ffffff' font-size='32'>①</text><text x='135' y='118' text-anchor='middle' fill='#ffffff' font-size='14' font-weight='bold'>明確な価値の段差</text><text x='135' y='142' text-anchor='middle' fill='#ddeeff' font-size='11'>無料版と有料版の間に</text><text x='135' y='160' text-anchor='middle' fill='#ddeeff' font-size='11'>ユーザーが実感できる</text><text x='135' y='178' text-anchor='middle' fill='#ddeeff' font-size='11'>価値差がある</text><text x='135' y='205' text-anchor='middle' fill='#aaccff' font-size='10'>例: Zoom 40分制限</text><text x='135' y='222' text-anchor='middle' fill='#aaccff' font-size='10'>Spotify 広告あり/なし</text><rect x='275' y='50' width='210' height='210' fill='#51cf66' rx='10' style='filter:drop-shadow(3px 3px 6px rgba(0,0,0,0.5))'/><text x='380' y='88' text-anchor='middle' fill='#ffffff' font-size='32'>②</text><text x='380' y='118' text-anchor='middle' fill='#ffffff' font-size='14' font-weight='bold'>LTV ＞ CAC × 3</text><text x='380' y='142' text-anchor='middle' fill='#dfffee' font-size='11'>有料転換後の顧客が</text><text x='380' y='160' text-anchor='middle' fill='#dfffee' font-size='11'>獲得コストの 3 倍以上の</text><text x='380' y='178' text-anchor='middle' fill='#dfffee' font-size='11'>価値を生み続ける</text><text x='380' y='205' text-anchor='middle' fill='#aaffcc' font-size='10'>チャーンレート &lt; 3% /月</text><text x='380' y='222' text-anchor='middle' fill='#aaffcc' font-size='10'>Payback &lt; 12 ヶ月</text><rect x='520' y='50' width='210' height='210' fill='#ffd43b' rx='10' style='filter:drop-shadow(3px 3px 6px rgba(0,0,0,0.5))'/><text x='625' y='88' text-anchor='middle' fill='#333333' font-size='32'>③</text><text x='625' y='118' text-anchor='middle' fill='#333333' font-size='14' font-weight='bold'>無料コストの管理</text><text x='625' y='142' text-anchor='middle' fill='#555533' font-size='11'>無料ユーザー 1 人当たり</text><text x='625' y='160' text-anchor='middle' fill='#555533' font-size='11'>のコストが有料収益で</text><text x='625' y='178' text-anchor='middle' fill='#555533' font-size='11'>確実に補填できる</text><text x='625' y='205' text-anchor='middle' fill='#777744' font-size='10'>インフラ費用の把握</text><text x='625' y='222' text-anchor='middle' fill='#777744' font-size='10'>使用量制限の適切な設定</text><text x='380' y='280' text-anchor='middle' fill='#aaaacc' font-size='13'>3 条件が揃えば転換率 2% でも十分な利益を生める</text></svg>


---

# フリーミアム適合度チェックリスト

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">フリーミアム適合度チェック</text><rect x="40" y="50" width="340" height="300" fill="#16213e" rx="8" stroke="#51cf66" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#51cf66" font-size="14" font-weight="bold">向く製品 ✅</text><text x="60" y="115" fill="#51cf66" font-size="13">✓</text><text x="80" y="115" fill="#aaaacc" font-size="11">限界コスト &lt; $0.50/人</text><text x="60" y="145" fill="#51cf66" font-size="13">✓</text><text x="80" y="145" fill="#aaaacc" font-size="11">TAM が十分大きい</text><text x="60" y="175" fill="#51cf66" font-size="13">✓</text><text x="80" y="175" fill="#aaaacc" font-size="11">使うほど価値が増す</text><text x="60" y="205" fill="#51cf66" font-size="13">✓</text><text x="80" y="205" fill="#aaaacc" font-size="11">明確な価値段差がある</text><text x="60" y="235" fill="#51cf66" font-size="13">✓</text><text x="80" y="235" fill="#aaaacc" font-size="11">LTV/CAC ≥ 3 の見込み</text><rect x="420" y="50" width="340" height="300" fill="#16213e" rx="8" stroke="#ff6b6b" stroke-width="2"/><text x="590" y="80" text-anchor="middle" fill="#ff6b6b" font-size="14" font-weight="bold">向かない製品 ❌</text><text x="440" y="115" fill="#ff6b6b" font-size="13">✗</text><text x="460" y="115" fill="#aaaacc" font-size="11">限界コストが高い</text><text x="440" y="145" fill="#ff6b6b" font-size="13">✗</text><text x="460" y="145" fill="#aaaacc" font-size="11">TAM が狭い</text><text x="440" y="175" fill="#ff6b6b" font-size="13">✗</text><text x="460" y="175" fill="#aaaacc" font-size="11">1回限りの利用</text><text x="440" y="205" fill="#ff6b6b" font-size="13">✗</text><text x="460" y="205" fill="#aaaacc" font-size="11">無料と有料の差が不明瞭</text><text x="440" y="235" fill="#ff6b6b" font-size="13">✗</text><text x="460" y="235" fill="#aaaacc" font-size="11">ARPU が低すぎる</text></svg>
- **✅ フリーミアムに向く製品の条件:**
- - [ ] 1 ユーザーあたりの限界コストが $0.50 未満
- - [ ] 対象市場（TAM）が十分大きく、2% 転換でも採算が取れる
- - [ ] 「使うほど価値が増す」習慣形成型の製品
- - [ ] 無料版での価値実感 → 有料版への明確な価値段差がある
- - [ ] LTV / CAC ≥ 3 を達成できる ARPU の見込みがある
- **❌ フリーミアムに向かない製品**: 限界コストが高い、TAM が狭い、1回限りの利用


---

# AI 時代のフリーミアム進化形

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">AI 時代のフリーミアム進化形</text><rect x="40" y="50" width="335" height="130" fill="#16213e" rx="8" stroke="#4a9eff" stroke-width="2"/><text x="207" y="78" text-anchor="middle" fill="#4a9eff" font-size="13" font-weight="bold">従来のフリーミアム</text><text x="207" y="105" text-anchor="middle" fill="#aaaacc" font-size="11">固定月額 / 機能制限</text><text x="207" y="128" text-anchor="middle" fill="#aaaacc" font-size="11">限界コストほぼゼロ</text><text x="207" y="155" text-anchor="middle" fill="#aaaacc" font-size="11">例: Dropbox, Slack</text><polygon points="395,120 425,108 425,132" fill="#f9a825"/><line x1="375" y1="120" x2="425" y2="120" stroke="#f9a825" stroke-width="2"/><rect x="425" y="50" width="335" height="130" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="592" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">AI フリーミアム（新設計）</text><text x="592" y="105" text-anchor="middle" fill="#aaaacc" font-size="11">使用量課金（Usage Billing）</text><text x="592" y="128" text-anchor="middle" fill="#aaaacc" font-size="11">推論コストを転嫁</text><text x="592" y="155" text-anchor="middle" fill="#aaaacc" font-size="11">例: Claude, ChatGPT Pro</text><rect x="40" y="210" width="720" height="150" fill="#16213e" rx="8"/><text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">AI 製品の LTV 計算に必須の要素</text><text x="80" y="275" fill="#4a9eff" font-size="12">基本 AI 無料</text><text x="80" y="300" fill="#aaaacc" font-size="11">低品質モデル / 低頻度</text><text x="80" y="322" fill="#aaaacc" font-size="11">LTV 計算に推論コスト必須</text><text x="320" y="275" fill="#f9a825" font-size="12">Pro 有料</text><text x="320" y="300" fill="#aaaacc" font-size="11">高品質モデル / 高頻度</text><text x="320" y="322" fill="#aaaacc" font-size="11">GitHub Copilot 無料枠戦略</text><text x="560" y="275" fill="#e91e63" font-size="12">Usage 課金</text><text x="560" y="300" fill="#aaaacc" font-size="11">トークン / API コール</text><text x="560" y="322" fill="#aaaacc" font-size="11">使った分だけ課金</text></svg>
- **AI が変えるフリーミアムの構造:**
- - **推論コストの上昇**: GPT-4 クラスのモデルは 1 クエリあたりのコストが高く、無制限無料は成立しない
- - **使用量課金（Usage Billing）の台頭**: 固定月額より「使った分だけ」へのシフト
- - **AI フリーミアムの新設計**: 基本 AI は無料、高品質モデル・高頻度利用は課金
- **事例**: Claude/ChatGPT の Free/Pro 設計、GitHub Copilot の無料枠戦略
- **エンジニアへの示唆**: AI 製品では LTV 計算に推論コストを必ず組み込む


---

# 参考文献（1/2）

- **書籍・論文:**
- - [Monetizing Innovation — Madhavan Ramanujam](https://www.wiley.com/en-us/Monetizing+Innovation-p-9781119240860)
- - [Price Intelligently Blog: Freemium Data](https://www.priceintelligently.com/blog)
- - [Dan Ariely — Predictably Irrational (Zero Price Effect)](https://www.predictablyirrational.com/)


---

# 参考文献（2/2）

- **データ・ケーススタディ:**
- - [Spotify Investor Relations Q3 2024](https://investors.spotify.com/)
- - [OpenView PLG Benchmarks 2024](https://openviewpartners.com/plg-benchmarks/)
- - [Duolingo 2024 Annual Report](https://investors.duolingo.com/)


---

<!-- _class: lead -->
# Q & A

- ご質問・ディスカッション
- 
- 「フリーミアムは条件付きで儲かる」
- — その条件をあなたのプロダクトに当てはめると？
- 
- スライド: docs/20260220160000_freemium-economics/

