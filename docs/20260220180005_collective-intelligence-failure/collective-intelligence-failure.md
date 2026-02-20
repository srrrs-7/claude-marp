---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "集合知の失敗条件"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }

---

<!-- _class: lead -->
# 集合知はなぜ失敗するか

- 群衆の叡智が機能する条件と壊れる瞬間
- 
- 2026.02.20


---

<!-- _class: lead -->
# 集合知の神話

- 「みんなの意見」は本当に正しいのか？


---

# ガルトンの牛 — 集合知の原点

- 1907年、フランシス・ガルトンが品評会で800人に牛の体重を推定させた
- 個々の推定はバラバラだったが、**中央値は1,207ポンド**（実際: 1,198ポンド）
- 誤差わずか**0.8%** — 専門家より正確だった
- これが「群衆の叡智（Wisdom of Crowds）」の起源
- 
- <svg viewBox='0 0 800 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='320' fill='#1a1a2e' rx='12'/><text x='400' y='30' text-anchor='middle' fill='#aaa' font-size='13'>群衆の推定分布</text><path d='M100,270 Q200,265 250,240 Q300,180 350,120 Q380,70 400,55 Q420,70 450,120 Q500,180 550,240 Q600,265 700,270' fill='none' stroke='#4ecdc4' stroke-width='2.5'/><path d='M100,270 Q200,265 250,240 Q300,180 350,120 Q380,70 400,55 Q420,70 450,120 Q500,180 550,240 Q600,265 700,270 L700,270 L100,270 Z' fill='#4ecdc4' fill-opacity='0.15'/><line x1='400' y1='45' x2='400' y2='280' stroke='#ff6b6b' stroke-width='2.5' stroke-dasharray='6,4'/><text x='400' y='298' text-anchor='middle' fill='#ff6b6b' font-size='12' font-weight='bold'>中央値: 1,207 lb</text><line x1='410' y1='45' x2='410' y2='280' stroke='#ffd93d' stroke-width='2' stroke-dasharray='4,4'/><text x='460' y='298' text-anchor='start' fill='#ffd93d' font-size='12'>実際: 1,198 lb</text><line x1='100' y1='270' x2='700' y2='270' stroke='#555' stroke-width='1'/><text x='100' y='290' fill='#777' font-size='11'>900 lb</text><text x='700' y='290' fill='#777' font-size='11' text-anchor='end'>1,500 lb</text></svg>

<!--
ガルトンは民主主義に懐疑的だったが、この結果に驚いた。個人の誤差が互いに打ち消し合い、集団の平均が真値に収束する現象。
-->

---

# 集合知が機能する4つの条件

- James Surowiecki『The Wisdom of Crowds』(2004)が定義した必須条件
- 
- <svg viewBox='0 0 800 360' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='360' fill='#1a1a2e' rx='12'/><rect x='180' y='40' width='200' height='70' rx='10' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='280' y='68' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>1. 多様性</text><text x='280' y='88' text-anchor='middle' fill='#b7e4c7' font-size='11'>異なる背景・知識・視点</text><rect x='420' y='40' width='200' height='70' rx='10' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='520' y='68' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>2. 独立性</text><text x='520' y='88' text-anchor='middle' fill='#a9d6e5' font-size='11'>他者の意見に影響されない</text><rect x='180' y='150' width='200' height='70' rx='10' fill='#774936' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='280' y='178' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>3. 分散化</text><text x='280' y='198' text-anchor='middle' fill='#ddb892' font-size='11'>ローカルな知識の活用</text><rect x='420' y='150' width='200' height='70' rx='10' fill='#5a189a' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='520' y='178' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>4. 集約メカニズム</text><text x='520' y='198' text-anchor='middle' fill='#e0aaff' font-size='11'>個々の判断を統合する仕組み</text><line x1='380' y1='75' x2='420' y2='75' stroke='#666' stroke-width='1.5'/><line x1='380' y1='185' x2='420' y2='185' stroke='#666' stroke-width='1.5'/><line x1='280' y1='110' x2='280' y2='150' stroke='#666' stroke-width='1.5'/><line x1='520' y1='110' x2='520' y2='150' stroke='#666' stroke-width='1.5'/><rect x='250' y='260' width='300' height='60' rx='10' fill='#e63946' style='filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'/><text x='400' y='285' text-anchor='middle' fill='#fff' font-size='15' font-weight='bold'>集合知</text><text x='400' y='305' text-anchor='middle' fill='#ffd6d6' font-size='11'>4条件すべてが揃って初めて機能</text><line x1='280' y1='220' x2='330' y2='260' stroke='#888' stroke-width='1.5'/><line x1='520' y1='220' x2='470' y2='260' stroke='#888' stroke-width='1.5'/></svg>

<!--
Surowieckiの4条件。重要なのは、1つでも欠けると集合知は機能しなくなるということ。
-->

---

<!-- _class: lead -->
# 条件が破壊される瞬間

- 独立性、多様性、分散化が壊れるとき何が起こるか


---

# 独立性の崩壊 — 社会的影響実験

- Salganik et al. (2006, Science) の音楽ダウンロード実験
- 14,000人を8つの「世界」に分割、同じ48曲を提示
- **独立群**: ランキングなし → どの世界でも似た結果
- **社会的影響群**: ダウンロード数を表示 → 世界ごとに人気曲が激変
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>独立群（ランキングなし）</text><text x='600' y='30' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>社会的影響群（ランキングあり）</text><line x1='400' y1='10' x2='400' y2='270' stroke='#444' stroke-width='1' stroke-dasharray='4,4'/><rect x='60' y='50' width='120' height='18' rx='4' fill='#4ecdc4'/><text x='190' y='64' fill='#ccc' font-size='11'>曲A</text><rect x='60' y='75' width='115' height='18' rx='4' fill='#45b7aa'/><text x='190' y='89' fill='#ccc' font-size='11'>曲B</text><rect x='60' y='100' width='108' height='18' rx='4' fill='#3da197'/><text x='190' y='114' fill='#ccc' font-size='11'>曲C</text><rect x='60' y='125' width='100' height='18' rx='4' fill='#358b85'/><text x='190' y='139' fill='#ccc' font-size='11'>曲D</text><rect x='60' y='150' width='95' height='18' rx='4' fill='#2d7572'/><text x='190' y='164' fill='#ccc' font-size='11'>曲E</text><text x='200' y='200' text-anchor='middle' fill='#888' font-size='12'>各世界で安定した順位</text><rect x='460' y='50' width='160' height='18' rx='4' fill='#ff6b6b'/><text x='630' y='64' fill='#ccc' font-size='11'>曲C (世界1で1位)</text><rect x='460' y='75' width='60' height='18' rx='4' fill='#cc5555'/><text x='630' y='89' fill='#ccc' font-size='11'>曲A (世界1で5位)</text><rect x='460' y='110' width='140' height='18' rx='4' fill='#ff6b6b'/><text x='630' y='124' fill='#ccc' font-size='11'>曲E (世界2で1位)</text><rect x='460' y='135' width='50' height='18' rx='4' fill='#cc5555'/><text x='630' y='149' fill='#ccc' font-size='11'>曲C (世界2で6位)</text><text x='600' y='200' text-anchor='middle' fill='#888' font-size='12'>世界ごとに順位が全く異なる</text><text x='400' y='250' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>同じ曲、同じ品質 → 社会的影響だけで結果が変わる</text></svg>

<!--
この実験が示すのは、他者の行動が見えるだけで独立性が失われ、結果が不安定になること。品質と人気の相関は弱くなる。
-->

---

# 多様性の消失 — エコーチェンバーの構造

- SNSアルゴリズムが「engagement最適化」で多様性を破壊する
- 似た意見が増幅され、反対意見が排除される **フィルターバブル**
- 集合知の前提「異なる視点の集まり」が消失する
- 
- <svg viewBox='0 0 800 300' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='130' y='30' text-anchor='middle' fill='#aaa' font-size='12'>多様な情報空間</text><text x='670' y='30' text-anchor='middle' fill='#aaa' font-size='12'>フィルター後</text><circle cx='60' cy='100' r='14' fill='#4ecdc4'/><circle cx='100' cy='70' r='14' fill='#ff6b6b'/><circle cx='140' cy='110' r='14' fill='#ffd93d'/><circle cx='80' cy='150' r='14' fill='#a78bfa'/><circle cx='130' cy='160' r='14' fill='#f97316'/><circle cx='170' cy='80' r='14' fill='#06b6d4'/><circle cx='110' cy='130' r='14' fill='#84cc16'/><circle cx='160' cy='145' r='14' fill='#ec4899'/><rect x='270' y='60' width='120' height='160' rx='8' fill='#2a2a3e' stroke='#555' stroke-width='1.5'/><text x='330' y='85' text-anchor='middle' fill='#fff' font-size='12' font-weight='bold'>SNS</text><text x='330' y='105' text-anchor='middle' fill='#888' font-size='10'>Algorithm</text><text x='330' y='140' text-anchor='middle' fill='#ff6b6b' font-size='22'>&#x1F50D;</text><text x='330' y='170' text-anchor='middle' fill='#888' font-size='10'>engagement</text><text x='330' y='185' text-anchor='middle' fill='#888' font-size='10'>optimization</text><line x1='200' y1='120' x2='270' y2='120' stroke='#666' stroke-width='1.5'/><polygon points='267,115 277,120 267,125' fill='#666'/><line x1='390' y1='120' x2='480' y2='120' stroke='#666' stroke-width='1.5'/><polygon points='477,115 487,120 477,125' fill='#666'/><circle cx='540' cy='90' r='16' fill='#ff6b6b'/><circle cx='580' cy='110' r='16' fill='#ff6b6b'/><circle cx='560' cy='145' r='16' fill='#ff6b6b'/><circle cx='530' cy='130' r='16' fill='#cc5555'/><circle cx='590' cy='140' r='16' fill='#cc5555'/><ellipse cx='560' cy='120' rx='60' ry='50' fill='none' stroke='#ff6b6b' stroke-width='1.5' stroke-dasharray='5,3'/><text x='560' y='200' text-anchor='middle' fill='#ff6b6b' font-size='11'>エコーチェンバー</text><text x='720' y='100' fill='#555' font-size='10'>排除された</text><text x='720' y='115' fill='#555' font-size='10'>多様な声</text><circle cx='720' cy='140' r='8' fill='#333' stroke='#555' stroke-width='1'/><circle cx='745' cy='155' r='8' fill='#333' stroke='#555' stroke-width='1'/><circle cx='710' cy='165' r='8' fill='#333' stroke='#555' stroke-width='1'/><text x='400' y='270' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>多様性の消失 = 集合知の条件2が崩壊</text></svg>

<!--
Pariserのフィルターバブル概念。YouTubeの推薦アルゴリズム研究でも、視聴回数が増えるほど提案される内容が均質化していくことが確認されている。
-->

---

# AIトレーニングデータの汚染ループ

- LLMはWebデータで学習するが、Web上のコンテンツ自体がAI生成に
- **Model Collapse**: AIが生成したデータでAIを学習させると品質が劣化
- Shumailov et al. (2023): 5世代で分布が崩壊することを実証
- 
- <svg viewBox='0 0 800 300' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><rect x='50' y='80' width='150' height='60' rx='10' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='125' y='105' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>人間の知識</text><text x='125' y='125' text-anchor='middle' fill='#a9d6e5' font-size='10'>多様・独立・分散</text><rect x='300' y='80' width='150' height='60' rx='10' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='375' y='105' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>Web上のデータ</text><text x='375' y='125' text-anchor='middle' fill='#b7e4c7' font-size='10'>学習コーパス</text><rect x='550' y='80' width='150' height='60' rx='10' fill='#5a189a' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='625' y='105' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>LLM</text><text x='625' y='125' text-anchor='middle' fill='#e0aaff' font-size='10'>テキスト生成</text><line x1='200' y1='110' x2='297' y2='110' stroke='#4ecdc4' stroke-width='2'/><polygon points='294,105 304,110 294,115' fill='#4ecdc4'/><line x1='450' y1='110' x2='547' y2='110' stroke='#4ecdc4' stroke-width='2'/><polygon points='544,105 554,110 544,115' fill='#4ecdc4'/><path d='M625,140 L625,210 L375,210 L375,143' fill='none' stroke='#ff6b6b' stroke-width='2.5' stroke-dasharray='6,4'/><polygon points='370,146 375,136 380,146' fill='#ff6b6b'/><text x='500' y='228' text-anchor='middle' fill='#ff6b6b' font-size='12' font-weight='bold'>AI生成コンテンツがWebに還流</text><text x='500' y='248' text-anchor='middle' fill='#ffd93d' font-size='12'>世代を重ねるごとに多様性が失われる</text><text x='130' y='195' fill='#888' font-size='11'>Gen 1: 高品質</text><text x='130' y='215' fill='#888' font-size='11'>Gen 3: 劣化開始</text><text x='130' y='235' fill='#ff6b6b' font-size='11' font-weight='bold'>Gen 5: 分布崩壊</text></svg>

<!--
Model Collapseは集合知の多様性条件の崩壊と同じ構造。元の多様な人間の知識が、AI生成物という均質なデータに置き換えられていく。
-->

---

# インターネット投票の失敗事例

- **Boaty McBoatface** (2016): 英国の研究船名を公募 → ふざけた名前が圧勝
- **Mountain Dew命名コンテスト** (2012): 4chanが組織的投票で不適切な名前を1位に
- **TIME誌 Person of the Year投票**: 4chanが特定の順序に並べ替えを達成
- **Taylor Swiftコンサート先着順崩壊**: ボット大量投入で正規ファンが排除
- 
- <svg viewBox='0 0 800 240' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='240' fill='#1a1a2e' rx='12'/><text x='400' y='30' text-anchor='middle' fill='#aaa' font-size='13'>集合知が機能しない条件</text><rect x='50' y='55' width='200' height='55' rx='8' fill='#e63946' fill-opacity='0.3' stroke='#e63946' stroke-width='1.5'/><text x='150' y='78' text-anchor='middle' fill='#ff8888' font-size='12' font-weight='bold'>独立性なし</text><text x='150' y='96' text-anchor='middle' fill='#ccc' font-size='10'>組織的協調行動</text><rect x='300' y='55' width='200' height='55' rx='8' fill='#f77f00' fill-opacity='0.3' stroke='#f77f00' stroke-width='1.5'/><text x='400' y='78' text-anchor='middle' fill='#ffaa44' font-size='12' font-weight='bold'>分散化なし</text><text x='400' y='96' text-anchor='middle' fill='#ccc' font-size='10'>4chanという単一コミュニティ</text><rect x='550' y='55' width='200' height='55' rx='8' fill='#7209b7' fill-opacity='0.3' stroke='#7209b7' stroke-width='1.5'/><text x='650' y='78' text-anchor='middle' fill='#bb88ee' font-size='12' font-weight='bold'>多様性なし</text><text x='650' y='96' text-anchor='middle' fill='#ccc' font-size='10'>同じ動機を持つ集団</text><rect x='150' y='140' width='500' height='55' rx='8' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='400' y='163' text-anchor='middle' fill='#ffd93d' font-size='14' font-weight='bold'>投票 ≠ 集合知</text><text x='400' y='183' text-anchor='middle' fill='#ccc' font-size='11'>Surowieckiの4条件を1つも満たさない「多数決」は暴走する</text><line x1='150' y1='110' x2='300' y2='140' stroke='#666' stroke-width='1'/><line x1='400' y1='110' x2='400' y2='140' stroke='#666' stroke-width='1'/><line x1='650' y1='110' x2='500' y2='140' stroke='#666' stroke-width='1'/></svg>

<!--
これらの事例は「投票=集合知」という誤解を明確に示す。匿名・組織的行動・同質な動機があると、集合知の4条件は全く満たされない。
-->

---

<!-- _class: lead -->
# 実践的含意

- ソフトウェア開発における集合知の失敗と対策


---

# コードレビューの集合知問題

- シニアエンジニアの最初のコメントが後続のレビューを支配する
- **アンカリング効果**: 最初の意見が基準点になり独立した判断が失われる
- PRの承認/却下が最初のレビュアーの判断に大きく依存
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#aaa' font-size='12'>PRレビューにおけるアンカリング</text><circle cx='120' cy='100' r='30' fill='#e63946' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='120' y='95' text-anchor='middle' fill='#fff' font-size='11' font-weight='bold'>Senior</text><text x='120' y='110' text-anchor='middle' fill='#ffd6d6' font-size='9'>最初のレビュー</text><text x='120' y='155' text-anchor='middle' fill='#ff6b6b' font-size='11'>「設計が不適切」</text><line x1='155' y1='90' x2='250' y2='70' stroke='#ff6b6b' stroke-width='2'/><polygon points='247,65 257,70 247,75' fill='#ff6b6b'/><line x1='155' y1='100' x2='250' y2='110' stroke='#ff6b6b' stroke-width='2'/><polygon points='247,105 257,110 247,115' fill='#ff6b6b'/><line x1='155' y1='110' x2='250' y2='150' stroke='#ff6b6b' stroke-width='2'/><polygon points='247,145 257,150 247,155' fill='#ff6b6b'/><circle cx='290' cy='70' r='22' fill='#555'/><text x='290' y='74' text-anchor='middle' fill='#ccc' font-size='10'>Dev A</text><circle cx='290' cy='110' r='22' fill='#555'/><text x='290' y='114' text-anchor='middle' fill='#ccc' font-size='10'>Dev B</text><circle cx='290' cy='150' r='22' fill='#555'/><text x='290' y='154' text-anchor='middle' fill='#ccc' font-size='10'>Dev C</text><text x='340' y='74' fill='#ff8888' font-size='10'>「確かに問題あり」</text><text x='340' y='114' fill='#ff8888' font-size='10'>「同意します」</text><text x='340' y='154' fill='#ff8888' font-size='10'>「私もそう思う」</text><rect x='520' y='55' width='230' height='120' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='635' y='80' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>独立レビュー方式</text><text x='635' y='105' text-anchor='middle' fill='#ccc' font-size='11'>1. 各自が先にレビュー</text><text x='635' y='125' text-anchor='middle' fill='#ccc' font-size='11'>2. コメントは同時公開</text><text x='635' y='145' text-anchor='middle' fill='#ccc' font-size='11'>3. その後に議論</text><text x='635' y='215' text-anchor='middle' fill='#ffd93d' font-size='12'>独立性を確保する設計</text></svg>

<!--
Google内部の研究でも、最初のレビューコメントが後続レビューに強い影響を与えることが確認されている。独立レビュー方式はDelphi法に近い。
-->

---

# スプリントプランニングの落とし穴

- プランニングポーカーで**見せ合い**が起きると独立性が崩壊する
- 声の大きいメンバーの見積もりにチーム全体が引っ張られる
- **解決策**: 全員が同時にカードを出す（Delphi法の原則）
- 
- <svg viewBox='0 0 800 260' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='260' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>NG: 順番に発表</text><text x='600' y='30' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>OK: 同時公開</text><line x1='400' y1='10' x2='400' y2='250' stroke='#444' stroke-width='1' stroke-dasharray='4,4'/><rect x='60' y='50' width='60' height='40' rx='6' fill='#e63946'/><text x='90' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>13</text><text x='90' y='105' fill='#ccc' font-size='10'>TL: 「13だね」</text><rect x='140' y='50' width='60' height='40' rx='6' fill='#cc5555'/><text x='170' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>13</text><text x='170' y='105' fill='#888' font-size='10'>本当は8...</text><rect x='220' y='50' width='60' height='40' rx='6' fill='#cc5555'/><text x='250' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>13</text><text x='250' y='105' fill='#888' font-size='10'>本当は5...</text><rect x='300' y='50' width='60' height='40' rx='6' fill='#cc5555'/><text x='330' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>8</text><text x='330' y='105' fill='#888' font-size='10'>やっと本音</text><text x='200' y='140' text-anchor='middle' fill='#ff6b6b' font-size='12'>全員がTLに引きずられる</text><rect x='460' y='50' width='60' height='40' rx='6' fill='#2d6a4f'/><text x='490' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>13</text><rect x='540' y='50' width='60' height='40' rx='6' fill='#1b4965'/><text x='570' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>8</text><rect x='620' y='50' width='60' height='40' rx='6' fill='#774936'/><text x='650' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>5</text><rect x='700' y='50' width='60' height='40' rx='6' fill='#5a189a'/><text x='730' y='75' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>8</text><text x='600' y='108' text-anchor='middle' fill='#4ecdc4' font-size='12'>多様な見積もりが出る</text><text x='600' y='140' text-anchor='middle' fill='#4ecdc4' font-size='12'>→ 議論の質が向上</text><rect x='150' y='170' width='500' height='50' rx='8' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='193' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>同調圧力を排除する仕組みが、見積もり精度を高める</text><text x='400' y='210' text-anchor='middle' fill='#ccc' font-size='11'>Delphi法: 匿名・独立・繰り返しの3原則</text></svg>

<!--
プランニングポーカーは本来、全員同時にカードを出すことで独立性を確保する設計。順番に発表すると集合知ではなくなる。
-->

---

# AIと人間の協働における新たな罠

- **AIの回答を見てから判断**すると、人間の独立した思考が失われる
- Copilotの提案を無批判に受け入れる「AI依存」問題
- AIは多様性を提供するが、人間の独立性を奪うことがある
- 正しい活用: **自分の答えを持ってからAIに相談する**
- 
- <svg viewBox='0 0 800 260' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='260' fill='#1a1a2e' rx='12'/><rect x='50' y='40' width='300' height='80' rx='10' fill='#7f1d1d' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='65' text-anchor='middle' fill='#ff6b6b' font-size='13' font-weight='bold'>NG: AI先行パターン</text><text x='200' y='88' text-anchor='middle' fill='#ccc' font-size='11'>AI提案 → 人間が追認</text><text x='200' y='105' text-anchor='middle' fill='#888' font-size='10'>独立性喪失、確証バイアス強化</text><rect x='450' y='40' width='300' height='80' rx='10' fill='#14532d' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='600' y='65' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>OK: 人間先行パターン</text><text x='600' y='88' text-anchor='middle' fill='#ccc' font-size='11'>人間が考える → AIで検証</text><text x='600' y='105' text-anchor='middle' fill='#888' font-size='10'>独立性保持、多様な視点を活用</text><rect x='150' y='155' width='500' height='65' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='180' text-anchor='middle' fill='#ffd93d' font-size='14' font-weight='bold'>人間+AI = 集合知になるか？</text><text x='400' y='200' text-anchor='middle' fill='#ccc' font-size='11'>条件: 人間が独立した判断を先に持つこと</text><line x1='200' y1='120' x2='310' y2='155' stroke='#ff6b6b' stroke-width='1.5'/><line x1='600' y1='120' x2='490' y2='155' stroke='#4ecdc4' stroke-width='1.5'/></svg>

<!--
GitHub Copilotの研究でも、AIの提案を見てからコードを書くと、開発者自身の創造性やバグ発見能力が低下することが示唆されている。
-->

---

# 集合知を守るための設計原則

- 集合知を機能させるには、**意図的な設計**が必要
- 
- <svg viewBox='0 0 800 340' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='340' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='14' font-weight='bold'>集合知保護フレームワーク</text><rect x='40' y='50' width='220' height='110' rx='10' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='150' y='75' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>独立性の確保</text><text x='150' y='100' text-anchor='middle' fill='#ccc' font-size='10'>匿名投票・ブラインドレビュー</text><text x='150' y='118' text-anchor='middle' fill='#ccc' font-size='10'>同時公開方式</text><text x='150' y='136' text-anchor='middle' fill='#ccc' font-size='10'>Delphi法の採用</text><rect x='290' y='50' width='220' height='110' rx='10' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='400' y='75' text-anchor='middle' fill='#a9d6e5' font-size='13' font-weight='bold'>多様性の維持</text><text x='400' y='100' text-anchor='middle' fill='#ccc' font-size='10'>意図的な異質メンバー招集</text><text x='400' y='118' text-anchor='middle' fill='#ccc' font-size='10'>Devil's advocate制度</text><text x='400' y='136' text-anchor='middle' fill='#ccc' font-size='10'>外部視点の定期注入</text><rect x='540' y='50' width='220' height='110' rx='10' fill='#774936' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='650' y='75' text-anchor='middle' fill='#ddb892' font-size='13' font-weight='bold'>集約の設計</text><text x='650' y='100' text-anchor='middle' fill='#ccc' font-size='10'>加重平均・中央値の活用</text><text x='650' y='118' text-anchor='middle' fill='#ccc' font-size='10'>外れ値排除アルゴリズム</text><text x='650' y='136' text-anchor='middle' fill='#ccc' font-size='10'>段階的フィルタリング</text><rect x='150' y='200' width='500' height='50' rx='8' fill='#5a189a' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='400' y='220' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>分散化の維持</text><text x='400' y='238' text-anchor='middle' fill='#e0aaff' font-size='10'>チーム横断レビュー / 部門間フィードバック / 外部コミュニティとの接点</text><line x1='150' y1='160' x2='290' y2='200' stroke='#666' stroke-width='1'/><line x1='400' y1='160' x2='400' y2='200' stroke='#666' stroke-width='1'/><line x1='650' y1='160' x2='510' y2='200' stroke='#666' stroke-width='1'/><rect x='200' y='275' width='400' height='40' rx='8' fill='#e63946' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='300' text-anchor='middle' fill='#fff' font-size='13' font-weight='bold'>設計なき集合知は、ただの群集心理</text></svg>

<!--
集合知は自然発生しない。4条件を意図的に設計・維持しなければ、集団はむしろ個人より悪い判断をする。
-->

---

<!-- _class: lead -->
# まとめ

- 「多数決」は集合知ではない
- 
- 独立性と多様性なき群衆は、賢明ではなく危険である
- 
- 集合知を活かすには、**条件を設計**しなければならない
- 
- 多様性 / 独立性 / 分散化 / 集約メカニズム
- 
- この4つの条件を壊さない仕組みを作ることが、チームの叡智を引き出す鍵


---

# 参考文献

- **Research & Data:**
- - [J. Surowiecki 'The Wisdom of Crowds' (2004)](https://en.wikipedia.org/wiki/The_Wisdom_of_Crowds)
- - [Salganik, Dodds, Watts 'Experimental Study of Inequality and Unpredictability in an Artificial Cultural Market' (Science, 2006)](https://doi.org/10.1126/science.1121066)
- - [Shumailov et al. 'Model Collapse' (2023)](https://arxiv.org/abs/2305.17493)
- - [Francis Galton 'Vox Populi' (Nature, 1907)](https://doi.org/10.1038/075450a0)
- 
- **Applications & Design:**
- - [E. Pariser 'The Filter Bubble' (2011)](https://en.wikipedia.org/wiki/The_Filter_Bubble)
- - [Delphi Method (RAND Corporation)](https://en.wikipedia.org/wiki/Delphi_method)

