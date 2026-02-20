---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "フリーミアムは本当に儲かるか — 転換率1-5%の経済学"
footer: "© 2026 — The Economics of Freemium"
style: |
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

- 転換率 1〜5% の経済学
- 
- エンジニアのためのフリーミアム完全解説
- 2026.02.20


---

# 今日の問い & ゴール

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

- **Free（完全無料）**: 収益化しない。広告または補助金依存
- **Free Trial**: 期間限定で全機能解放 → 期限後に課金 or 停止
- **Freemium**: 永続的な無料版＋有料プランへの転換設計
- - 機能制限型: 基本機能のみ無料（Spotify, Slack）
- - 使用量制限型: 利用量で制限（Dropbox, API系）
- **フリーミアムの核心**: 無料ユーザーは「体験という広告メディア」


---

# ゼロ価格の心理学

- Dan Ariely「ゼロは単なる安値ではなく、別次元の感情反応を引き起こす」
- **ゼロ価格効果（Zero-Price Effect）:**
- - 有料 → 無料は単なる値引き以上の心理的インパクトを生む
- - 試用コスト・決断コストがゼロになり、採用障壁が激減する
- - 「損失がない」状態で製品に慣れさせる時間を稼げる
- **エンジニア的解釈**: 無料とは CAC をユーザー側に転嫁する仕組み


---

# フリーミアムが機能する市場条件

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

- **ビジネスモデル**: 無料（メッセージ上限・連携数制限）+ Pro/Business+ $7.25〜
- **転換率**: 約 30%（チームが一定規模に達すると自然転換）
- **なぜ機能するのか:**
- - Bottom-up: 個人が導入 → チームに広がる → 組織単位で課金
- - 無料版の「過去90日分のメッセージ制限」が転換圧力の核心
- - ログへのアクセス欲求（ナレッジ資産）が課金動機になる
- **学び**: B2B フリーミアムは「個人採用 → 組織課金」のルートが最強


---

# Dropbox — バイラルループと容量制限

- **ビジネスモデル**: 無料 2GB + Plus $11.99/月（2TB）
- **転換率**: 初期 2-3%（紹介プログラム後に急増）
- **成長の秘訣:**
- - 「友達を紹介すると容量増加」— CAC を無料で調達する完璧な構造
- - ファイル共有がそのまま製品のデモになる（ウイルス係数 k > 1）
- **制約の使い方**: 2GB は「使えるが足りない」ちょうど良いライン
- **現在の課題**: 競合（Google Drive, iCloud）による無料容量競争で差別化が困難


---

# Zoom — コロナが証明したフリーミアムの威力

- **制限**: 無料版は 40 分・100 人まで（全機能利用可能）
- **コロナ禍の爆発的成長**: 2020 年に MAU が 10 倍（10M → 300M）
- **40分制限の天才的な設計:**
- - 「40 分切れたら再接続」という摩擦が有料化動機に直結
- - 法人ユーザーは 40 分制限を業務で許容できない → 即座に有料化
- - 個人ユーザーは我慢 or 転換 — 二極化で双方から収益確保
- **学び**: 時間制限は「使える」体験を提供しつつ、有料化圧力を持続させる最強ゲート


---

# ゲーム F2P — 転換率 0.5-3% でも成立する理由

- **パレート法則の極端版**: ユーザーの 1% 未満が収益の 50% 以上を生む
- **「クジラ（Whale）」経済学:**
- - 上位 0.19%（ヘビー課金者）が全収益の 48% を担う（研究データ）
- - 無料ユーザーはゲームを「賑やか」にする背景装置
- **なぜ低転換率でも利益が出るか:**
- - ARPPU（課金ユーザー 1 人当たり収益）が極めて高い（$100〜数万/月）
- - 無料ユーザーのインフラコストを課金者が補填


---

# Duolingo — ゲーミフィケーション型フリーミアム

- **ビジネスモデル**: 無料 + Super Duolingo $6.99/月（広告非表示・無制限ハート）
- **転換率**: 約 8%（高め — ゲーミフィケーションが習慣形成に寄与）
- **独自の仕組み:**
- - 「ストリーク（連続記録）」が課金動機に。記録を失いたくない心理
- - Super Duolingo はストリーク保護機能を売る — 感情的価値の課金
- **学び**: 習慣形成 × 損失回避バイアス = 強力な転換エンジン
- **2024年データ**: MAU 9,700万、売上 $531M（前年比 +45%）


---

# 失敗パターン① — 無料版と有料版の価値差がない

- **症状**: 転換率が 0.5% 以下で停滞。課金しても体験が大して変わらない
- **根本原因**:
- - 「とりあえず全部無料にした」設計がそのまま有料化されただけ
- - 有料版で解放されるものがユーザーにとって嬉しくない
- **解決策**:
- - 「制限に当たった瞬間に欲しくなるもの」を特定してゲートに使う
- **典型例**: Google Workspace の初期（Drive 15GB 制限は感じにくい）


---

# 失敗パターン② — 無料ユーザーがコストを食い潰す

- **症状**: ユーザー数は増えるが赤字拡大。転換率が低いのに固定費が膨張
- **根本原因**:
- - 1 ユーザーあたりのインフラコストを甘く見積もった
- - 大量の無料ユーザーがサポートコストを爆増させる
- **計算式**: 利益 = (有料ユーザー数 × ARPU) − (全ユーザー × コスト/人)
- **解決策**: 無料枠を削減 or 使用量制限を強化して赤字を止める
- **典型例**: 初期 Evernote、過剰な無料容量を提供した後に削減で炎上


---

# 失敗パターン③ — Evernote に学ぶ制限の失敗

- **2016年以前**: 「100年企業」を掲げる、無料でほぼ全機能開放
- **問題の顕在化**: 転換率が低く、無料ユーザー向けコストが膨大
- **2016年の転換点**: 無料版を「デバイス 2台まで」に突然制限
- **結果**: ユーザーの怒り爆発 → 競合（Notion, Bear）への大規模移行
- **何が失敗だったか:**
- - 既存ユーザーが依存した後に「後出し制限」を導入
- - 制限内容が「使えない」レベルまで強すぎた
- **学び**: フリーミアムの制限は最初から設計する。後から締めると信頼を失う


---

# 失敗事例まとめマトリクス

- <svg viewBox='0 0 760 300' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><style>text{font-family:sans-serif;letter-spacing:0}</style><rect width='760' height='300' fill='#1a1a2e' rx='8'/><text x='380' y='28' text-anchor='middle' fill='#ffffff' font-size='15' font-weight='bold'>フリーミアム失敗パターン分類</text><rect x='30' y='45' width='330' height='100' fill='#ff6b6b' rx='6' opacity='0.85'/><text x='195' y='70' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>① 価値差がない</text><text x='195' y='92' text-anchor='middle' fill='#ffe0e0' font-size='11'>無料で十分、有料の魅力ゼロ</text><text x='195' y='112' text-anchor='middle' fill='#ffe0e0' font-size='11'>例: 機能が重複している Pro プラン</text><text x='195' y='132' text-anchor='middle' fill='#ffaaaa' font-size='11'>転換率 → 0.5% 以下</text><rect x='400' y='45' width='330' height='100' fill='#ff9f43' rx='6' opacity='0.85'/><text x='565' y='70' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>② コスト過多</text><text x='565' y='92' text-anchor='middle' fill='#ffe8d0' font-size='11'>無料ユーザーが赤字を生み続ける</text><text x='565' y='112' text-anchor='middle' fill='#ffe8d0' font-size='11'>例: 過剰ストレージ・無制限API</text><text x='565' y='132' text-anchor='middle' fill='#ffccaa' font-size='11'>規模拡大 → 赤字拡大</text><rect x='30' y='162' width='330' height='100' fill='#ee5a24' rx='6' opacity='0.85'/><text x='195' y='187' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>③ 後出し制限</text><text x='195' y='209' text-anchor='middle' fill='#ffe0e0' font-size='11'>依存後の急激な制限変更</text><text x='195' y='229' text-anchor='middle' fill='#ffe0e0' font-size='11'>例: Evernote 2016 年</text><text x='195' y='249' text-anchor='middle' fill='#ffaaaa' font-size='11'>ユーザー離反・競合移行</text><rect x='400' y='162' width='330' height='100' fill='#7b68ee' rx='6' opacity='0.85'/><text x='565' y='187' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>④ 転換への動線なし</text><text x='565' y='209' text-anchor='middle' fill='#e8e0ff' font-size='11'>制限に当たっても課金できない UX</text><text x='565' y='229' text-anchor='middle' fill='#e8e0ff' font-size='11'>例: Upgrade ボタンが見つからない</text><text x='565' y='249' text-anchor='middle' fill='#ccaaff' font-size='11'>転換機会を自らブロック</text></svg>


---

# 成功と失敗の分岐点 — 何が違うのか

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

- **Feature Gate（機能制限）**
- - 基本機能は無料、高度機能は有料（例: Slack の承認ワークフロー）
- - 向く製品: B2B SaaS、コラボレーションツール
- **Usage Gate（使用量制限）**
- - 一定量まで無料、超過分は課金（例: Dropbox 2GB, SendGrid 100通/日）
- - 向く製品: ストレージ、API、メール配信
- **Time Gate（期間制限）**: Free Trial の形式。評価期間後に判断を迫る


---

# 転換の摩擦を下げる UX 設計

- **摩擦の主な原因:**
- - Upgrade ページまでのクリック数が多い
- - 支払い方法の入力が煩雑
- - プラン比較が複雑すぎて決断できない
- **摩擦削減の実践:**
- - 制限に当たった場所に「その場でアップグレード」ボタンを置く
- - 年払い vs 月払いの差額を明示（年払い推奨: LTV 向上）
- **原則**: ユーザーが「課金したい」と思った瞬間を逃さない


---

# 心理的価格設定とアンカリング効果

- **アンカリング**: 先に高い価格を見せることで、次の価格を安く感じさせる
- 例: Enterprise $499 → Pro $99 → Basic $29 の順に見せる
- **価格の段階設計（Good/Better/Best）:**
- - 3プラン構成で、真ん中を「おすすめ」にする
- - 目標は「真ん中プラン」への誘導（中間バイアス）
- **無料トライアルの心理**: 月払い $20 より「まず 30 日無料」が転換率 2〜3 倍


---

# PLG（Product-Led Growth）との関係

- **PLG の定義**: 製品自体がユーザー獲得・転換・拡大の主なドライバー
- **フリーミアムは PLG の中核戦略:**
- - 無料で使わせる → 価値を体験させる → 自然に課金に至る
- **Sales-Led Growth との違い:**
- - SLG: 営業が主導（Enterprise向け）
- - PLG: 製品が主導（SMB・Developer向け）
- **エンジニアへの示唆**: PLG を支える「製品内の転換設計」はエンジニアリング課題


---

# Expansion Revenue — アップセル設計

- **Net Revenue Retention (NRR)**: 既存顧客からの収益拡大率
- - NRR > 100% → 解約を補填しても純増（最高の状態）
- **Expansion の 3 パターン:**
- - アップセル: 上位プランへの移行（機能拡張）
- - クロスセル: 隣接製品・アドオンの追加購入
- - 使用量拡大: 席数・API量・ストレージの自然増加（Usage Billing）
- **設計原則**: 成長するほど自然に課金額が増える構造を作る


---

# チャーン防止とリテンション戦略

- **チャーンの 2 種類:**
- - 自発的チャーン: ユーザーが意図して解約
- - 非自発的チャーン: クレジットカード失効・支払い失敗
- **防止策（自発的）:**
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

- 転換イベントを計測するためのイベントスキーマ設計（TypeScript）

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

- **課題**: 「今すぐ課金しそうなユーザー」を事前に特定して営業・UX 介入
- **予測特徴量（重要度順）:**
- - セッション頻度・継続日数（習慣形成度）
- - 制限への到達回数（転換圧力の強さ）
- - 招待送信・チームメンバー追加（ネットワーク形成）
- - コア機能の使用率（価値実感度）
- **モデル**: XGBoost + SHAP 説明性 — 「なぜそのユーザーか」を解釈可能に


---

# 無料枠の悪用対策

- **よくある悪用パターン:**
- - 複数アカウント作成による無料枠の繰り返し取得
- - スクレイピング・API 連打による過剰利用
- - 無料枠をビジネス転用（個人プランで業務利用）
- **対策の実装:**
- - メール検証 + 電話番号認証（アカウント重複防止）
- - レートリミット + 異常検知（行動ベースのボット対策）
- **設計原則**: セキュリティ強化と UX のバランス — 誠実なユーザーを傷つけない


---

# 課金フローのテスト戦略

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

- **✅ フリーミアムに向く製品の条件:**
- - [ ] 1 ユーザーあたりの限界コストが $0.50 未満
- - [ ] 対象市場（TAM）が十分大きく、2% 転換でも採算が取れる
- - [ ] 「使うほど価値が増す」習慣形成型の製品
- - [ ] 無料版での価値実感 → 有料版への明確な価値段差がある
- - [ ] LTV / CAC ≥ 3 を達成できる ARPU の見込みがある
- **❌ フリーミアムに向かない製品**: 限界コストが高い、TAM が狭い、1回限りの利用


---

# AI 時代のフリーミアム進化形

- **AI が変えるフリーミアムの構造:**
- - **推論コストの上昇**: GPT-4 クラスのモデルは 1 クエリあたりのコストが高く、無制限無料は成立しない
- - **使用量課金（Usage Billing）の台頭**: 固定月額より「使った分だけ」へのシフト
- - **AI フリーミアムの新設計**: 基本 AI は無料、高品質モデル・高頻度利用は課金
- **事例**: Claude/ChatGPT の Free/Pro 設計、GitHub Copilot の無料枠戦略
- **エンジニアへの示唆**: AI 製品では LTV 計算に推論コストを必ず組み込む


---

# 参考文献

- **書籍・論文:**
- - [Monetizing Innovation — Madhavan Ramanujam](https://www.wiley.com/en-us/Monetizing+Innovation-p-9781119240860)
- - [Price Intelligently Blog: Freemium Data](https://www.priceintelligently.com/blog)
- - [Dan Ariely — Predictably Irrational (Zero Price Effect)](https://www.predictablyirrational.com/)
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

