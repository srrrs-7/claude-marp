---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "シンプソンのパラドックス"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# シンプソンのパラドックスとA/Bテストの落とし穴

- **データは嘘をつかないが、データで嘘はつける**
- 
- 集計データが部分データと矛盾する時、
- 何が正しいのか？


---

<!-- _class: lead -->
# パラドックスの解剖

- 全体で見た結論が、部分に分けると逆転する


---

# UCバークレー入試差別訴訟 (1973)

- 全体の合格率: 男性44% vs 女性35% → **性差別？**
- しかし6学部それぞれでは女性の合格率 >= 男性
- 女性は競争率の高い学部に多く出願していた
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>全体の合格率</text><rect x='100' y='50' width='80' height='132' fill='#4ecdc4' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='140' y='200' text-anchor='middle' fill='#fff' font-size='11'>男性</text><text x='140' y='215' text-anchor='middle' fill='#4ecdc4' font-size='12'>44%</text><rect x='200' y='85' width='80' height='97' fill='#ff6b6b' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='240' y='200' text-anchor='middle' fill='#fff' font-size='11'>女性</text><text x='240' y='215' text-anchor='middle' fill='#ff6b6b' font-size='12'>35%</text><text x='200' y='240' text-anchor='middle' fill='#ff6b6b' font-size='12'>男性 > 女性 ??</text><text x='580' y='30' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>学部別の合格率</text><rect x='420' y='105' width='35' height='60' fill='#ff6b6b' rx='3'/><rect x='460' y='95' width='35' height='70' fill='#4ecdc4' rx='3'/><text x='455' y='185' text-anchor='middle' fill='#aaa' font-size='9'>学部A</text><rect x='510' y='115' width='35' height='50' fill='#ff6b6b' rx='3'/><rect x='550' y='110' width='35' height='55' fill='#4ecdc4' rx='3'/><text x='545' y='185' text-anchor='middle' fill='#aaa' font-size='9'>学部B</text><rect x='600' y='130' width='35' height='35' fill='#ff6b6b' rx='3'/><rect x='640' y='125' width='35' height='40' fill='#4ecdc4' rx='3'/><text x='635' y='185' text-anchor='middle' fill='#aaa' font-size='9'>学部C</text><rect x='690' y='140' width='35' height='25' fill='#ff6b6b' rx='3'/><rect x='730' y='135' width='35' height='30' fill='#4ecdc4' rx='3'/><text x='725' y='185' text-anchor='middle' fill='#aaa' font-size='9'>学部D</text><text x='580' y='210' text-anchor='middle' fill='#4ecdc4' font-size='12'>女性 >= 男性</text><rect x='420' y='240' width='15' height='15' fill='#ff6b6b'/><text x='445' y='252' fill='#aaa' font-size='10'>男性</text><rect x='490' y='240' width='15' height='15' fill='#4ecdc4'/><text x='515' y='252' fill='#aaa' font-size='10'>女性</text><text x='400' y='270' fill='#ffd700' font-size='11'>交絡変数: 学部の選択パターン</text></svg>


---

# 数字で見るメカニズム

- なぜ部分と全体で結論が逆転するのか？
- 
- <svg viewBox='0 0 800 300' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>処置A vs 処置B: 治療効果の数値例</text><rect x='40' y='45' width='350' height='100' fill='#2a2a4a' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='215' y='65' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>軽症グループ</text><text x='120' y='90' text-anchor='middle' fill='#aaa' font-size='11'>処置A: 81/87 = 93%</text><text x='300' y='90' text-anchor='middle' fill='#aaa' font-size='11'>処置B: 234/270 = 87%</text><text x='215' y='120' text-anchor='middle' fill='#4ecdc4' font-size='12'>A > B (93% vs 87%)</text><rect x='410' y='45' width='350' height='100' fill='#2a2a4a' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='585' y='65' text-anchor='middle' fill='#e67e22' font-size='13' font-weight='bold'>重症グループ</text><text x='490' y='90' text-anchor='middle' fill='#aaa' font-size='11'>処置A: 192/263 = 73%</text><text x='680' y='90' text-anchor='middle' fill='#aaa' font-size='11'>処置B: 55/80 = 69%</text><text x='585' y='120' text-anchor='middle' fill='#4ecdc4' font-size='12'>A > B (73% vs 69%)</text><rect x='150' y='170' width='500' height='60' fill='#5a1a1a' rx='8'/><text x='400' y='195' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>全体合計</text><text x='260' y='215' text-anchor='middle' fill='#aaa' font-size='11'>処置A: 273/350 = 78%</text><text x='540' y='215' text-anchor='middle' fill='#aaa' font-size='11'>処置B: 289/350 = 83%</text><text x='400' y='255' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>全体では B > A に逆転!</text><text x='400' y='280' text-anchor='middle' fill='#ffd700' font-size='11'>原因: 処置Aは重症患者に多く適用された（サンプル配分の偏り）</text></svg>


---

# ワクチン有効率での誤解

- 「ワクチン接種者の方が感染率が高い」という主張
- 年齢層別に分析すると全セグメントでワクチン有効
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>年齢層別ワクチン効果（模式図）</text><text x='130' y='55' text-anchor='middle' fill='#aaa' font-size='11'>20-39歳</text><text x='300' y='55' text-anchor='middle' fill='#aaa' font-size='11'>40-59歳</text><text x='470' y='55' text-anchor='middle' fill='#aaa' font-size='11'>60-79歳</text><text x='640' y='55' text-anchor='middle' fill='#aaa' font-size='11'>80歳+</text><rect x='80' y='65' width='40' height='30' fill='#ff6b6b' rx='3'/><rect x='130' y='65' width='40' height='15' fill='#4ecdc4' rx='3'/><text x='80' y='115' fill='#aaa' font-size='9'>未接種</text><text x='135' y='115' fill='#aaa' font-size='9'>接種</text><rect x='250' y='65' width='40' height='50' fill='#ff6b6b' rx='3'/><rect x='300' y='65' width='40' height='25' fill='#4ecdc4' rx='3'/><rect x='420' y='65' width='40' height='80' fill='#ff6b6b' rx='3'/><rect x='470' y='65' width='40' height='40' fill='#4ecdc4' rx='3'/><rect x='590' y='65' width='40' height='120' fill='#ff6b6b' rx='3'/><rect x='640' y='65' width='40' height='70' fill='#4ecdc4' rx='3'/><text x='400' y='210' text-anchor='middle' fill='#4ecdc4' font-size='13'>全年齢層で 接種群 < 未接種群</text><line x1='50' y1='220' x2='750' y2='220' stroke='#555' stroke-width='1'/><text x='400' y='245' text-anchor='middle' fill='#ff6b6b' font-size='13'>しかし全体では接種群の方が高く見える</text><text x='400' y='270' text-anchor='middle' fill='#ffd700' font-size='11'>理由: 高齢者ほど接種率が高く、かつ基礎リスクも高い</text></svg>


---

<!-- _class: lead -->
# A/Bテストへの直撃

- プロダクトの意思決定を誤る瞬間


---

# 「機能Aの方がCVR高い」の罠

- 全体CVR: デザインA = 4.2%, デザインB = 3.8%
- しかしセグメント別に見ると...
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>セグメント別CVRの逆転</text><text x='200' y='55' text-anchor='middle' fill='#aaa' font-size='13'>モバイル (80%のトラフィック)</text><rect x='100' y='70' width='80' height='60' fill='#ff6b6b' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='140' y='100' text-anchor='middle' fill='#fff' font-size='11'>A: 3.0%</text><rect x='200' y='70' width='80' height='80' fill='#4ecdc4' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='240' y='100' text-anchor='middle' fill='#fff' font-size='11'>B: 3.5%</text><text x='200' y='175' text-anchor='middle' fill='#4ecdc4' font-size='12'>B > A</text><text x='580' y='55' text-anchor='middle' fill='#aaa' font-size='13'>PC (20%のトラフィック)</text><rect x='480' y='70' width='80' height='140' fill='#ff6b6b' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='520' y='130' text-anchor='middle' fill='#fff' font-size='11'>A: 9.0%</text><rect x='580' y='70' width='80' height='160' fill='#4ecdc4' rx='4' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='620' y='130' text-anchor='middle' fill='#fff' font-size='11'>B: 10.0%</text><text x='580' y='250' text-anchor='middle' fill='#4ecdc4' font-size='12'>B > A</text><rect x='150' y='200' width='500' height='40' fill='#5a1a1a' rx='8'/><text x='400' y='225' text-anchor='middle' fill='#ff6b6b' font-size='13'>しかし全体ではA > B（デバイス配分の不均等が原因）</text><text x='400' y='270' text-anchor='middle' fill='#ffd700' font-size='11'>AはPC経由のトラフィックが多く、PCのCVRは高い</text></svg>


---

# 実際の失敗事例

- **ECサイトのボタン色A/Bテスト**
- 全体: 赤ボタン(A) CVR 5.1% > 青ボタン(B) CVR 4.8%
- 新規ユーザー: B > A (6.2% vs 5.5%)
- 既存ユーザー: B > A (3.8% vs 3.2%)
- 
- <svg viewBox='0 0 800 200' style='max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='200' fill='#1a1a2e' rx='12'/><rect x='50' y='30' width='300' height='50' fill='#5a1a1a' rx='8'/><text x='200' y='60' text-anchor='middle' fill='#ff6b6b' font-size='13'>赤ボタンを採用（間違い）</text><polygon points='360,55 375,50 375,60' fill='#ff6b6b'/><rect x='385' y='30' width='370' height='50' fill='#2a2a4a' rx='8'/><text x='570' y='55' text-anchor='middle' fill='#aaa' font-size='11'>新規ユーザー獲得率が下がり続ける</text><text x='400' y='110' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>原因の構造</text><text x='400' y='140' text-anchor='middle' fill='#aaa' font-size='12'>赤ボタンAは既存ユーザーへの配信比率が高かった</text><text x='400' y='165' text-anchor='middle' fill='#aaa' font-size='12'>既存ユーザーはすでにロイヤルティが高く、色に関係なく購入する</text><text x='400' y='188' text-anchor='middle' fill='#ff6b6b' font-size='12'>本当に重要な新規ユーザーへの効果を見落とした</text></svg>


---

# 新機能ロールアウトでの誤判定

- 地域・時間帯セグメントを無視したA/Bテストの危険性
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>地域別ロールアウトの罠</text><rect x='50' y='50' width='220' height='80' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='160' y='75' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>東京（新機能ON）</text><text x='160' y='95' text-anchor='middle' fill='#fff' font-size='11'>CVR: 8.5%</text><text x='160' y='115' text-anchor='middle' fill='#aaa' font-size='10'>高所得、テックリテラシー高</text><rect x='290' y='50' width='220' height='80' fill='#5a1a1a' rx='8'/><text x='400' y='75' text-anchor='middle' fill='#ff6b6b' font-size='12' font-weight='bold'>地方都市（新機能OFF）</text><text x='400' y='95' text-anchor='middle' fill='#fff' font-size='11'>CVR: 4.2%</text><text x='400' y='115' text-anchor='middle' fill='#aaa' font-size='10'>異なるデモグラフィック</text><rect x='530' y='50' width='220' height='80' fill='#2a2a4a' rx='8'/><text x='640' y='75' text-anchor='middle' fill='#e67e22' font-size='12' font-weight='bold'>結論</text><text x='640' y='95' text-anchor='middle' fill='#fff' font-size='11'>「新機能でCVR倍増」</text><text x='640' y='115' text-anchor='middle' fill='#ff6b6b' font-size='10'>本当に新機能の効果？</text><line x1='50' y1='155' x2='750' y2='155' stroke='#555' stroke-width='1'/><text x='400' y='180' text-anchor='middle' fill='#ffd700' font-size='13' font-weight='bold'>正しいアプローチ</text><rect x='80' y='195' width='200' height='40' fill='#1b4332' rx='6'/><text x='180' y='220' text-anchor='middle' fill='#4ecdc4' font-size='11'>同一地域内でランダム化</text><rect x='300' y='195' width='200' height='40' fill='#1b4332' rx='6'/><text x='400' y='220' text-anchor='middle' fill='#4ecdc4' font-size='11'>層別ランダム化配信</text><rect x='520' y='195' width='200' height='40' fill='#1b4332' rx='6'/><text x='620' y='220' text-anchor='middle' fill='#4ecdc4' font-size='11'>交絡変数の事前特定</text><text x='400' y='265' text-anchor='middle' fill='#aaa' font-size='11'>A/Bテストの前提: 処置群と対照群は同質でなければならない</text></svg>


---

<!-- _class: lead -->
# 正しいデータ分析のために

- パラドックスを回避する実践的手法


---

# 交絡変数を探せ

- 因果推論の基礎: DAG（有向非巡回グラフ）で構造を可視化
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>交絡がある場合</text><circle cx='100' cy='120' r='35' fill='#5a1a1a' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='100' y='117' text-anchor='middle' fill='#fff' font-size='11'>処置X</text><text x='100' y='132' text-anchor='middle' fill='#aaa' font-size='9'>(デザイン)</text><circle cx='300' cy='120' r='35' fill='#5a1a1a' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='300' y='117' text-anchor='middle' fill='#fff' font-size='11'>結果Y</text><text x='300' y='132' text-anchor='middle' fill='#aaa' font-size='9'>(CVR)</text><circle cx='200' cy='40' r='30' fill='#4a3a1a' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='200' y='37' text-anchor='middle' fill='#ffd700' font-size='11'>交絡Z</text><text x='200' y='52' text-anchor='middle' fill='#ffd700' font-size='9'>(デバイス)</text><line x1='140' y1='120' x2='260' y2='120' stroke='#ff6b6b' stroke-width='2'/><polygon points='258,115 268,120 258,125' fill='#ff6b6b'/><line x1='175' y1='55' x2='120' y2='90' stroke='#ffd700' stroke-width='2'/><polygon points='123,85 115,93 127,92' fill='#ffd700'/><line x1='225' y1='55' x2='280' y2='90' stroke='#ffd700' stroke-width='2'/><polygon points='277,85 285,93 273,92' fill='#ffd700'/><text x='200' y='185' text-anchor='middle' fill='#ff6b6b' font-size='11'>X→Yの因果が歪む</text><text x='580' y='30' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>交絡を制御した場合</text><circle cx='480' cy='120' r='35' fill='#1b4332' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='480' y='117' text-anchor='middle' fill='#fff' font-size='11'>処置X</text><text x='480' y='132' text-anchor='middle' fill='#aaa' font-size='9'>(デザイン)</text><circle cx='680' cy='120' r='35' fill='#1b4332' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='680' y='117' text-anchor='middle' fill='#fff' font-size='11'>結果Y</text><text x='680' y='132' text-anchor='middle' fill='#aaa' font-size='9'>(CVR)</text><line x1='520' y1='120' x2='640' y2='120' stroke='#4ecdc4' stroke-width='2'/><polygon points='638,115 648,120 638,125' fill='#4ecdc4'/><circle cx='580' cy='40' r='30' fill='#2a2a4a' stroke='#555' stroke-width='2' stroke-dasharray='5,5'/><text x='580' y='37' text-anchor='middle' fill='#aaa' font-size='11'>交絡Z</text><text x='580' y='52' text-anchor='middle' fill='#aaa' font-size='9'>(制御済)</text><text x='580' y='185' text-anchor='middle' fill='#4ecdc4' font-size='11'>純粋なX→Y効果を推定</text><text x='400' y='230' text-anchor='middle' fill='#ffd700' font-size='13' font-weight='bold'>チェック方法</text><text x='400' y='255' text-anchor='middle' fill='#aaa' font-size='12'>1. セグメント別に結果を確認 → 逆転がないか？</text><text x='400' y='275' text-anchor='middle' fill='#aaa' font-size='12'>2. 処置群と対照群のデモグラフィックは同質か？</text></svg>


---

# 層別化分析のプロトコル

- **事前にセグメント仮説を立てる** ことが最重要
- 
- <svg viewBox='0 0 800 250' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='250' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>分析プロトコル</text><rect x='50' y='45' width='160' height='55' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='130' y='68' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Step 1</text><text x='130' y='85' text-anchor='middle' fill='#fff' font-size='10'>交絡変数の仮説</text><polygon points='215,72 230,67 230,77' fill='#4ecdc4'/><rect x='240' y='45' width='160' height='55' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='320' y='68' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Step 2</text><text x='320' y='85' text-anchor='middle' fill='#fff' font-size='10'>層別ランダム化</text><polygon points='405,72 420,67 420,77' fill='#4ecdc4'/><rect x='430' y='45' width='160' height='55' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='510' y='68' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Step 3</text><text x='510' y='85' text-anchor='middle' fill='#fff' font-size='10'>セグメント別分析</text><polygon points='595,72 610,67 610,77' fill='#4ecdc4'/><rect x='620' y='45' width='140' height='55' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='690' y='68' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Step 4</text><text x='690' y='85' text-anchor='middle' fill='#fff' font-size='10'>結果の一貫性確認</text><line x1='50' y1='125' x2='750' y2='125' stroke='#555' stroke-width='1'/><rect x='50' y='140' width='340' height='45' fill='#5a1a1a' rx='6'/><text x='220' y='158' text-anchor='middle' fill='#ff6b6b' font-size='12' font-weight='bold'>危険: 事後セグメント探索</text><text x='220' y='175' text-anchor='middle' fill='#aaa' font-size='10'>結果を見てからセグメントを切る = p-hacking</text><rect x='410' y='140' width='340' height='45' fill='#1b4332' rx='6'/><text x='580' y='158' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>推奨: 事前セグメント定義</text><text x='580' y='175' text-anchor='middle' fill='#aaa' font-size='10'>分析計画書に明記してからテスト開始</text><text x='400' y='220' text-anchor='middle' fill='#ffd700' font-size='12'>事前登録（Pre-registration）で分析の透明性を担保する</text></svg>


---

# 統計的有意性 vs 実用的有意性

- **N=100万なら0.001%の差でもp<0.05**
- 統計的有意 =/= ビジネス的に意味がある
- 
- <svg viewBox='0 0 800 250' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='250' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>効果量で判断する</text><rect x='50' y='45' width='330' height='80' fill='#5a1a1a' rx='8'/><text x='215' y='70' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>統計的有意性のみ</text><text x='215' y='92' text-anchor='middle' fill='#aaa' font-size='11'>p = 0.001 (有意!)</text><text x='215' y='112' text-anchor='middle' fill='#aaa' font-size='11'>しかし効果は CVR +0.002%</text><rect x='420' y='45' width='330' height='80' fill='#1b4332' rx='8'/><text x='585' y='70' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>実用的有意性も考慮</text><text x='585' y='92' text-anchor='middle' fill='#aaa' font-size='11'>効果量 d = 0.8 (大)</text><text x='585' y='112' text-anchor='middle' fill='#aaa' font-size='11'>CVR +1.5% = 年間売上 +$2M</text><text x='400' y='160' text-anchor='middle' fill='#ffd700' font-size='13' font-weight='bold'>Cohen's d 基準</text><rect x='120' y='175' width='150' height='35' fill='#2a2a4a' rx='6'/><text x='195' y='198' text-anchor='middle' fill='#aaa' font-size='11'>d=0.2: 小さい効果</text><rect x='290' y='175' width='150' height='35' fill='#2a2a4a' rx='6'/><text x='365' y='198' text-anchor='middle' fill='#e67e22' font-size='11'>d=0.5: 中程度</text><rect x='460' y='175' width='150' height='35' fill='#1b4332' rx='6'/><text x='535' y='198' text-anchor='middle' fill='#4ecdc4' font-size='11'>d=0.8: 大きい効果</text><text x='400' y='240' text-anchor='middle' fill='#aaa' font-size='11'>意思決定には p値 + 効果量 + 信頼区間 の3点セットが必要</text></svg>


---

# ベイズA/Bテストの優位性

- 古典的頻度論の限界を超える
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='200' y='28' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>頻度論的A/Bテスト</text><rect x='50' y='45' width='300' height='100' fill='#2a2a4a' rx='8'/><text x='200' y='70' text-anchor='middle' fill='#aaa' font-size='11'>固定サンプルサイズ</text><text x='200' y='90' text-anchor='middle' fill='#aaa' font-size='11'>p < 0.05 で判定</text><text x='200' y='110' text-anchor='middle' fill='#ff6b6b' font-size='11'>途中で覗くと偽陽性率UP</text><text x='200' y='130' text-anchor='middle' fill='#aaa' font-size='10'>「Aの方がBより良い確率」は回答不可</text><text x='600' y='28' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>ベイズA/Bテスト</text><rect x='450' y='45' width='300' height='100' fill='#1b4332' rx='8'/><text x='600' y='70' text-anchor='middle' fill='#aaa' font-size='11'>データが増えるごとに更新</text><text x='600' y='90' text-anchor='middle' fill='#aaa' font-size='11'>事後分布で直接比較</text><text x='600' y='110' text-anchor='middle' fill='#4ecdc4' font-size='11'>いつでも覗いてOK</text><text x='600' y='130' text-anchor='middle' fill='#aaa' font-size='10'>「AがBより良い確率 = 94.3%」</text><text x='400' y='180' text-anchor='middle' fill='#ffd700' font-size='13' font-weight='bold'>ベイズの利点</text><rect x='60' y='195' width='200' height='40' fill='#1b4332' rx='6'/><text x='160' y='220' text-anchor='middle' fill='#4ecdc4' font-size='10'>早期停止が安全</text><rect x='280' y='195' width='240' height='40' fill='#1b4332' rx='6'/><text x='400' y='220' text-anchor='middle' fill='#4ecdc4' font-size='10'>事前知識を反映できる</text><rect x='540' y='195' width='200' height='40' fill='#1b4332' rx='6'/><text x='640' y='220' text-anchor='middle' fill='#4ecdc4' font-size='10'>直感的な確率で報告</text><text x='400' y='265' text-anchor='middle' fill='#aaa' font-size='11'>ビジネス意思決定には「AがBに勝つ確率94%」の方が有用</text></svg>


---

<!-- _class: lead -->
# まとめ

- **データは見たいものを見せてくれる**
- 
- パラドックスを知ることが
- 正しい問いへの第一歩
- 
- 全体の数字を疑え。セグメントで検証せよ。
- そして「なぜ差が生まれたか」を問い続けよ。


---

# 参考文献

- - **Original Papers:**
- - Simpson, E.H. (1951). The Interpretation of Interaction in Contingency Tables
- - Bickel et al. (1975). Sex Bias in Graduate Admissions: Data from Berkeley
- - **Books:**
- - Pearl, J. *The Book of Why* (2018)
- - Gelman et al. *Bayesian Data Analysis* 3rd Ed. (2013)
- - **Practical Guides:**
- - Kohavi et al. *Trustworthy Online Controlled Experiments* (2020)
- - ["Simpson's Paradox in Healthcare" - BMJ (2021)](https://www.bmj.com/content/372/bmj.n71)

