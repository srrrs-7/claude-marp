---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "マタイ効果とテック格差"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# マタイ効果とテック格差

- ## 持てる者はさらに与えられる
- **テクノロジーはなぜ格差を拡大するのか**
- 累積優位のメカニズムとその対抗策


---

# マタイ効果の起源

- - 「持てる者はさらに与えられ、持たざる者はあるものまで奪われる」
- - マタイによる福音書 13:12 — 2000年前の観察
- - 社会学者 Robert K. Merton (1968) が科学界に適用
- - **累積優位**: 初期の小さな差が、時間とともに指数的に拡大する
- <svg viewBox='0 0 800 280' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='100' y='60' width='100' height='100' rx='50' fill='#3498db' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='105' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>初期の</text><text x='150' y='122' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>小さな差</text><polygon points='210,110 240,100 240,120' fill='#888'/><rect x='250' y='40' width='140' height='140' rx='70' fill='#f39c12' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='320' y='100' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>認知・資源の</text><text x='320' y='118' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>偏りが拡大</text><polygon points='400,110 430,100 430,120' fill='#888'/><rect x='440' y='15' width='180' height='190' rx='90' fill='#e74c3c' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='530' y='95' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>圧倒的な</text><text x='530' y='115' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>格差が固定化</text><rect x='100' y='220' width='520' height='40' rx='6' fill='rgba(255,255,255,0.05)' stroke='#888' stroke-width='1'/><text x='360' y='245' text-anchor='middle' fill='#f39c12' font-size='13' font-weight='bold'>雪だるま式に累積 → 「富める者はさらに富む」</text></svg>


---

<!-- _class: lead -->
# テックエコシステムでの発現

- プラットフォーム・OSS・AIに潜む累積優位


---

# ネットワーク効果 — 最強の武器

- - **Metcalfe の法則**: ネットワークの価値 = N^2 に比例
- - ユーザーが多い → サービスの価値が高い → さらにユーザーが集まる
- - 一度臨界質量を超えると **勝者総取り** 構造になる
- <svg viewBox='0 0 800 280' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='50' y='250' width='700' height='2' fill='#888'/><line x1='50' y1='30' x2='50' y2='250' stroke='#888' stroke-width='2'/><text x='30' y='25' fill='#ccc' font-size='12'>価値</text><text x='720' y='270' fill='#ccc' font-size='12'>ユーザー数</text><path d='M70,240 C150,238 250,230 350,200 C400,180 450,140 500,80 C530,40 560,30 600,25' stroke='#e74c3c' stroke-width='3' fill='none'/><text x='610' y='30' fill='#e74c3c' font-size='12' font-weight='bold'>N^2（ネットワーク効果）</text><path d='M70,240 L600,100' stroke='#3498db' stroke-width='2' fill='none' stroke-dasharray='6,4'/><text x='610' y='105' fill='#3498db' font-size='12'>N（線形成長）</text><line x1='350' y1='30' x2='350' y2='250' stroke='#f39c12' stroke-width='2' stroke-dasharray='5,3'/><text x='355' y='45' fill='#f39c12' font-size='12' font-weight='bold'>臨界質量</text><rect x='355' y='55' width='180' height='40' rx='5' fill='rgba(243,156,18,0.15)' stroke='#f39c12' stroke-width='1'/><text x='365' y='73' fill='#f39c12' font-size='11'>ここを超えると勝者総取り</text><text x='365' y='88' fill='#aaa' font-size='10'>2位以下は追いつけない</text></svg>


---

# プラットフォーム独占のメカニズム

- - **検索**: Google 93% のシェアを20年以上維持
- - **SNS**: Meta（FB+IG+WhatsApp）が30億人以上を囲い込み
- - **クラウド**: AWS/Azure/GCP で市場の65%超
- - **スマホOS**: iOS+Android で99.6%
- <svg viewBox='0 0 800 260' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='30' width='170' height='190' rx='10' fill='#1a2a3a' stroke='#3498db' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='115' y='60' text-anchor='middle' fill='#3498db' font-size='14' font-weight='bold'>検索</text><rect x='50' y='75' width='130' height='20' rx='4' fill='#e74c3c'/><text x='115' y='90' text-anchor='middle' fill='white' font-size='11' font-weight='bold'>Google 93%</text><rect x='50' y='100' width='9' height='20' rx='4' fill='#888'/><text x='75' y='115' fill='#aaa' font-size='10'>他 7%</text><rect x='220' y='30' width='170' height='190' rx='10' fill='#1a3a2a' stroke='#2ecc71' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='305' y='60' text-anchor='middle' fill='#2ecc71' font-size='14' font-weight='bold'>SNS</text><rect x='240' y='75' width='105' height='20' rx='4' fill='#e74c3c'/><text x='292' y='90' text-anchor='middle' fill='white' font-size='11' font-weight='bold'>Meta 75%</text><rect x='240' y='100' width='34' height='20' rx='4' fill='#888'/><text x='290' y='115' fill='#aaa' font-size='10'>他 25%</text><rect x='410' y='30' width='170' height='190' rx='10' fill='#2a2a1a' stroke='#f39c12' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='495' y='60' text-anchor='middle' fill='#f39c12' font-size='14' font-weight='bold'>クラウド</text><rect x='430' y='75' width='88' height='20' rx='4' fill='#e74c3c'/><text x='474' y='90' text-anchor='middle' fill='white' font-size='10' font-weight='bold'>AWS/Az/GCP 65%</text><rect x='430' y='100' width='47' height='20' rx='4' fill='#888'/><text x='490' y='115' fill='#aaa' font-size='10'>他 35%</text><rect x='600' y='30' width='170' height='190' rx='10' fill='#3a1a2a' stroke='#e74c3c' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='685' y='60' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>スマホOS</text><rect x='620' y='75' width='132' height='20' rx='4' fill='#e74c3c'/><text x='686' y='90' text-anchor='middle' fill='white' font-size='10' font-weight='bold'>iOS+Android 99.6%</text><rect x='620' y='100' width='1' height='20' rx='1' fill='#888'/><text x='635' y='115' fill='#aaa' font-size='10'>他 0.4%</text><rect x='30' y='140' width='740' height='50' rx='6' fill='rgba(255,255,255,0.05)' stroke='#888' stroke-width='1'/><text x='400' y='170' text-anchor='middle' fill='#f39c12' font-size='13' font-weight='bold'>共通パターン: 1社が圧倒的シェア → 2位以下が追いつけない → 格差拡大</text></svg>


---

# OSSコントリビューターの集中

- - GitHubスター・コントリビューションはべき乗則に従う
- - 上位 **1%** のコントリビューターがコード全体の大多数を生産
- - 有名リポジトリほどスターが集まり、さらに有名に
- <svg viewBox='0 0 800 280' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='50' y='250' width='700' height='2' fill='#888'/><line x1='50' y1='30' x2='50' y2='250' stroke='#888' stroke-width='2'/><text x='25' y='25' fill='#ccc' font-size='11'>コントリ</text><text x='25' y='40' fill='#ccc' font-size='11'>ビューション</text><text x='700' y='270' fill='#ccc' font-size='12'>コントリビューター（多い順）</text><path d='M70,50 C90,55 110,80 150,120 C200,170 300,210 450,230 C550,240 650,245 730,247' stroke='#e74c3c' stroke-width='3' fill='none'/><line x1='120' y1='30' x2='120' y2='250' stroke='#f39c12' stroke-width='2' stroke-dasharray='5,3'/><text x='125' y='45' fill='#f39c12' font-size='12' font-weight='bold'>上位1%</text><rect x='140' y='50' width='200' height='60' rx='6' fill='rgba(231,76,60,0.15)' stroke='#e74c3c' stroke-width='1'/><text x='155' y='73' fill='#e74c3c' font-size='12' font-weight='bold'>べき乗則（Power Law）</text><text x='155' y='93' fill='#aaa' font-size='11'>少数が大多数を生産</text><rect x='450' y='160' width='250' height='65' rx='6' fill='rgba(255,255,255,0.05)' stroke='#888' stroke-width='1'/><text x='465' y='183' fill='#ccc' font-size='12' font-weight='bold'>ロングテール</text><text x='465' y='203' fill='#aaa' font-size='11'>大多数は微小なコントリビューション</text></svg>


---

# AIの「データ優位」フライホイール

- - 大企業はデータが多い → AIモデルが賢くなる
- - AIが賢い → ユーザー体験が向上 → さらにユーザーが集まる
- - さらにデータが集まる → **データ独占のフライホイール**
- <svg viewBox='0 0 800 300' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='280' y='20' width='240' height='60' rx='10' fill='#3498db' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='55' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>大量のデータ</text><rect x='560' y='120' width='210' height='60' rx='10' fill='#2ecc71' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='665' y='155' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>高精度なAI</text><rect x='280' y='220' width='240' height='60' rx='10' fill='#f39c12' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='255' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>多数のユーザー</text><rect x='30' y='120' width='210' height='60' rx='10' fill='#e74c3c' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='135' y='155' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>優れたUX</text><polygon points='525,55 555,110 540,108' fill='#2ecc71'/><polygon points='560,185 525,225 538,222' fill='#f39c12'/><polygon points='275,250 240,185 253,188' fill='#e74c3c'/><polygon points='240,120 275,75 262,78' fill='#3498db'/><text x='400' y='155' text-anchor='middle' fill='#f39c12' font-size='16' font-weight='bold'>フライホイール</text><text x='400' y='175' text-anchor='middle' fill='#aaa' font-size='11'>止められない累積優位</text></svg>


---

<!-- _class: lead -->
# 個人・チームへの適用

- キャリア・スタートアップ・OSSに潜む累積優位


---

# スタートアップ資金調達のマタイ効果

- - **著名VCの出資** → 信頼のシグナル → 次の調達が容易に
- - Y Combinator 卒業生のネットワーク効果
- - 「誰に投資されるか」が「何を作るか」より重要になる問題
- - 初期のシード投資が長期的な成功を左右する
- <svg viewBox='0 0 800 240' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='40' width='160' height='70' rx='8' fill='#3498db' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='110' y='70' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>著名VCの出資</text><text x='110' y='90' text-anchor='middle' fill='#cdf' font-size='10'>Seed $2M</text><polygon points='200,75 225,65 225,85' fill='#888'/><rect x='240' y='30' width='160' height='90' rx='8' fill='#2ecc71' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='320' y='60' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>信頼のシグナル</text><text x='320' y='80' text-anchor='middle' fill='#cfc' font-size='10'>メディア露出↑</text><text x='320' y='96' text-anchor='middle' fill='#cfc' font-size='10'>人材採用力↑</text><polygon points='410,75 435,65 435,85' fill='#888'/><rect x='450' y='20' width='160' height='110' rx='8' fill='#f39c12' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='530' y='55' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>次の調達が容易</text><text x='530' y='75' text-anchor='middle' fill='#fec' font-size='10'>Series A $20M</text><text x='530' y='95' text-anchor='middle' fill='#fec' font-size='10'>競合より有利に</text><polygon points='620,75 645,65 645,85' fill='#888'/><rect x='660' y='10' width='120' height='130' rx='8' fill='#e74c3c' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='720' y='55' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>市場支配</text><text x='720' y='75' text-anchor='middle' fill='#fdd' font-size='10'>勝者総取り</text><rect x='30' y='160' width='750' height='45' rx='6' fill='rgba(255,255,255,0.05)' stroke='#888' stroke-width='1'/><text x='405' y='188' text-anchor='middle' fill='#f39c12' font-size='12' font-weight='bold'>初期の「誰に投資されるか」が指数関数的に効いてくる — これがマタイ効果</text></svg>


---

# エンジニアのキャリアのマタイ効果

- - **FAANG経歴** → 次の採用で有利 → さらに良い経歴に
- - 学歴ブランドの連鎖: 名門大 → 名門企業 → 名門大院
- - 履歴書の **シグナリング問題**: 実力より「看板」が評価される
- - 初期キャリアの選択が30年後の年収を左右する現実
- <svg viewBox='0 0 800 220' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='30' width='350' height='70' rx='8' fill='#1a3a2a' stroke='#2ecc71' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='205' y='60' text-anchor='middle' fill='#2ecc71' font-size='14' font-weight='bold'>パスA: 名門大 → FAANG → CTO</text><text x='205' y='82' text-anchor='middle' fill='#aaa' font-size='11'>各段階で信頼残高が累積 → 加速度的成長</text><rect x='30' y='120' width='350' height='70' rx='8' fill='#3a1a1a' stroke='#e74c3c' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='205' y='150' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>パスB: 無名大 → 中小企業 → ???</text><text x='205' y='172' text-anchor='middle' fill='#aaa' font-size='11'>同じスキルでもシグナルが弱い → 機会が限定的</text><rect x='430' y='50' width='340' height='120' rx='8' fill='rgba(255,255,255,0.05)' stroke='#f39c12' stroke-width='1'/><text x='600' y='80' text-anchor='middle' fill='#f39c12' font-size='14' font-weight='bold'>問題の本質</text><text x='450' y='105' fill='#aaa' font-size='12'>• 実力は同等でも機会が異なる</text><text x='450' y='125' fill='#aaa' font-size='12'>• 初期条件の差が累積する</text><text x='450' y='145' fill='#aaa' font-size='12'>• 「看板」がさらに「看板」を呼ぶ</text></svg>


---

# OSS維持者の燃え尽き問題

- - 有名OSSほど依存が増える → メンテナンス負荷が指数的に増大
- - **Log4Shell事件** (2021): 世界中のJavaアプリが脆弱に
- - 1人のボランティアが世界のインフラを支える構造的問題
- <svg viewBox='0 0 800 260' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='250' y='20' width='300' height='60' rx='10' fill='#e74c3c' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='55' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>巨大企業の本番システム</text><rect x='150' y='100' width='200' height='50' rx='8' fill='#f39c12' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='250' y='130' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>商用フレームワーク</text><rect x='450' y='100' width='200' height='50' rx='8' fill='#f39c12' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='550' y='130' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>クラウドサービス</text><rect x='300' y='180' width='200' height='50' rx='8' fill='#3498db' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='210' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>OSSライブラリ</text><line x1='300' y1='80' x2='250' y2='100' stroke='#888' stroke-width='1.5'/><line x1='500' y1='80' x2='550' y2='100' stroke='#888' stroke-width='1.5'/><line x1='250' y1='150' x2='350' y2='180' stroke='#888' stroke-width='1.5'/><line x1='550' y1='150' x2='450' y2='180' stroke='#888' stroke-width='1.5'/><circle cx='400' cy='245' r='10' fill='#2ecc71'/><text x='400' y='249' text-anchor='middle' fill='white' font-size='9' font-weight='bold'>1人</text><line x1='400' y1='230' x2='400' y2='235' stroke='#888' stroke-width='1.5'/><text x='430' y='250' fill='#2ecc71' font-size='11' font-weight='bold'>← ボランティア1人が支えている</text></svg>


---

<!-- _class: lead -->
# 対抗と共存

- マタイ効果に抗う設計と政策


---

# 意図的な多様性投資

- - **Google Summer of Code**: OSSへの新規参入者を支援
- - **GitHub Sponsors**: 個人コントリビューターへの直接資金提供
- - **Outreachy / MLH**: テック業界の多様性を意図的に推進
- - 逆マタイ効果: **「持たざる者」に初期ブーストを与える**設計
- <svg viewBox='0 0 800 220' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='30' width='350' height='70' rx='8' fill='#3a1a1a' stroke='#e74c3c' stroke-width='2'/><text x='205' y='55' text-anchor='middle' fill='#e74c3c' font-size='13' font-weight='bold'>マタイ効果（自然状態）</text><text x='205' y='78' text-anchor='middle' fill='#aaa' font-size='11'>強い者がさらに強くなる → 格差拡大</text><rect x='30' y='120' width='350' height='70' rx='8' fill='#1a3a2a' stroke='#2ecc71' stroke-width='2'/><text x='205' y='145' text-anchor='middle' fill='#2ecc71' font-size='13' font-weight='bold'>逆マタイ効果（意図的設計）</text><text x='205' y='168' text-anchor='middle' fill='#aaa' font-size='11'>初期段階で弱者にブーストを与える</text><rect x='430' y='55' width='340' height='110' rx='8' fill='rgba(255,255,255,0.05)' stroke='#f39c12' stroke-width='1'/><text x='600' y='80' text-anchor='middle' fill='#f39c12' font-size='13' font-weight='bold'>実施例</text><text x='450' y='102' fill='#aaa' font-size='11'>• Google Summer of Code</text><text x='450' y='120' fill='#aaa' font-size='11'>• GitHub Sponsors</text><text x='450' y='138' fill='#aaa' font-size='11'>• Outreachy / MLH</text><text x='450' y='156' fill='#aaa' font-size='11'>• 奨学金・スカラーシップ</text></svg>


---

# 規制と競争政策

- - **EU Digital Markets Act (DMA)**: ゲートキーパー規制
- - **DOJ vs Google** (2024): 独占禁止訴訟で有罪判決
- - **Apple App Store規制緩和**: サイドローディング義務化
- - 課題: 規制は「結果の是正」であり、構造的解決ではない
- <svg viewBox='0 0 800 220' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='30' width='230' height='160' rx='10' fill='#1a2a3a' stroke='#3498db' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='145' y='60' text-anchor='middle' fill='#3498db' font-size='14' font-weight='bold'>EU DMA</text><text x='50' y='85' fill='#aaa' font-size='11'>• ゲートキーパー指定</text><text x='50' y='105' fill='#aaa' font-size='11'>• データポータビリティ義務</text><text x='50' y='125' fill='#aaa' font-size='11'>• 自社優遇の禁止</text><text x='50' y='150' fill='#3498db' font-size='11' font-weight='bold'>2024年施行</text><rect x='285' y='30' width='230' height='160' rx='10' fill='#2a2a1a' stroke='#f39c12' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='60' text-anchor='middle' fill='#f39c12' font-size='14' font-weight='bold'>DOJ vs Google</text><text x='305' y='85' fill='#aaa' font-size='11'>• 検索独占で有罪</text><text x='305' y='105' fill='#aaa' font-size='11'>• Appleへの年間$20B支払い</text><text x='305' y='125' fill='#aaa' font-size='11'>• 構造的是正措置を検討</text><text x='305' y='150' fill='#f39c12' font-size='11' font-weight='bold'>2024年判決</text><rect x='540' y='30' width='230' height='160' rx='10' fill='#3a1a2a' stroke='#e74c3c' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='655' y='60' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>課題</text><text x='560' y='85' fill='#aaa' font-size='11'>• 規制は事後対応的</text><text x='560' y='105' fill='#aaa' font-size='11'>• 技術進歩に法が追いつかない</text><text x='560' y='125' fill='#aaa' font-size='11'>• ロビイングで骨抜きリスク</text><text x='560' y='150' fill='#e74c3c' font-size='11' font-weight='bold'>構造的解決にはならない</text></svg>


---

# 技術的解決策 — 分散型プロトコル

- - **ActivityPub / Mastodon**: フェデレーション型SNS
- - **Bluesky AT Protocol**: 分散型だが統一UX
- - **IPFS / Filecoin**: 分散型ストレージ
- - 中央集権 vs 分散 — マタイ効果を**構造的に**防ぐ試み
- <svg viewBox='0 0 800 240' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='30' width='340' height='170' rx='10' fill='#3a1a1a' stroke='#e74c3c' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='60' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>中央集権モデル</text><circle cx='200' cy='130' r='35' fill='#e74c3c' style='filter:drop-shadow(1px 1px 3px rgba(0,0,0,0.3))'/><text x='200' y='135' text-anchor='middle' fill='white' font-size='11' font-weight='bold'>中央</text><circle cx='120' cy='80' r='12' fill='#888'/><circle cx='280' cy='80' r='12' fill='#888'/><circle cx='100' cy='160' r='12' fill='#888'/><circle cx='300' cy='160' r='12' fill='#888'/><circle cx='140' cy='190' r='12' fill='#888'/><circle cx='260' cy='190' r='12' fill='#888'/><line x1='200' y1='95' x2='120' y2='80' stroke='#888' stroke-width='1'/><line x1='200' y1='95' x2='280' y2='80' stroke='#888' stroke-width='1'/><line x1='165' y1='130' x2='100' y2='160' stroke='#888' stroke-width='1'/><line x1='235' y1='130' x2='300' y2='160' stroke='#888' stroke-width='1'/><line x1='175' y1='155' x2='140' y2='190' stroke='#888' stroke-width='1'/><line x1='225' y1='155' x2='260' y2='190' stroke='#888' stroke-width='1'/><rect x='430' y='30' width='340' height='170' rx='10' fill='#1a3a2a' stroke='#2ecc71' stroke-width='2' style='filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='600' y='60' text-anchor='middle' fill='#2ecc71' font-size='14' font-weight='bold'>分散型モデル</text><circle cx='500' cy='100' r='15' fill='#2ecc71'/><circle cx='600' cy='80' r='15' fill='#2ecc71'/><circle cx='700' cy='100' r='15' fill='#2ecc71'/><circle cx='520' cy='170' r='15' fill='#2ecc71'/><circle cx='620' cy='180' r='15' fill='#2ecc71'/><circle cx='700' cy='160' r='15' fill='#2ecc71'/><line x1='515' y1='100' x2='585' y2='80' stroke='#2ecc71' stroke-width='1'/><line x1='615' y1='80' x2='685' y2='100' stroke='#2ecc71' stroke-width='1'/><line x1='500' y1='115' x2='520' y2='155' stroke='#2ecc71' stroke-width='1'/><line x1='535' y1='170' x2='605' y2='180' stroke='#2ecc71' stroke-width='1'/><line x1='635' y1='180' x2='685' y2='160' stroke='#2ecc71' stroke-width='1'/><line x1='700' y1='115' x2='700' y2='145' stroke='#2ecc71' stroke-width='1'/><line x1='600' y1='95' x2='620' y2='165' stroke='#2ecc71' stroke-width='1'/></svg>


---

<!-- _class: lead -->
# まとめ — テクノロジーは中立ではない

- **マタイ効果は自然法則のように見えるが**
- **それは設計の結果である**
- 
- プラットフォーム設計、規制、分散型技術で
- 累積優位の構造を変えることができる
- 
- 設計者としての問い: **あなたの設計は格差を拡大するか、縮小するか？**


---

# 参考文献

- - **理論:**
-   - Robert K. Merton, "The Matthew Effect in Science" (1968)
-   - Albert-Laszlo Barabasi, "Scale-Free Networks" (1999)
-   - Bob Metcalfe, "Metcalfe's Law" (1993)
- - **事例・政策:**
-   - [EU Digital Markets Act](https://digital-markets-act.ec.europa.eu/)
-   - Nadia Eghbal, "Working in Public" (2020)
-   - [DOJ v. Google LLC (2024)](https://www.justice.gov/atr/case/us-v-google)

