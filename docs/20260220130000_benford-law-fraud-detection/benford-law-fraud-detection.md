---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ベンフォードの法則で不正を見抜く"
footer: "© 2026 — Benford's Law for Fraud Detection"
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
# ベンフォードの法則で不正を見抜く

- 自然界の数字の先頭桁はなぜ1が多い？
- 数学が暴く、データ改ざんの痕跡
- エンジニアのための不正検知 90分入門


---

# クイズ：先頭桁の直感

- 次のデータの**先頭桁**として最も多い数字は何でしょう？
- 📌 世界各国の人口（195カ国）
- 📌 東証プライム上場企業の年間売上高
- 📌 物理定数（光速・プランク定数・電子質量など）
- 📌 フィボナッチ数列（1, 1, 2, 3, 5, 8, 13, 21…）
- 1〜9が**均等に分布**すると思う？ → 実は大きく偏っている！


---

<!-- _class: lead -->
# 答え：「1」が約30%を占める！

- 先頭桁の分布は**均等ではない**
- 「1」で始まる数が約 **30.1%**
- 「9」で始まる数はわずか **4.6%**
- この普遍的な規則性こそが **ベンフォードの法則**


---

# アジェンダ

- **Part 1** ベンフォードの法則の基礎
- **Part 2** なぜ1が多いのか？（数学的メカニズム）
- **Part 3** 不正検知の実践（実際の事件・事例）
- **Part 4** Python実装（検定コード）
- **Part 5** 限界と回避策
- **Part 6** 実装ガイドとベストプラクティス


---

<!-- _class: lead -->
# Part 1

- ベンフォードの法則の基礎


---

# 先頭桁の出現確率

- <svg viewBox='0 0 700 280' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='28' text-anchor='middle' font-size='15' fill='#ddd' font-family='sans-serif'>先頭桁の出現確率（ベンフォードの法則）</text><line x1='68' y1='240' x2='658' y2='240' stroke='#777' stroke-width='1.5'/><line x1='68' y1='50' x2='68' y2='240' stroke='#777' stroke-width='1.5'/><text x='58' y='244' text-anchor='end' font-size='11' fill='#777' font-family='sans-serif'>0%</text><text x='58' y='184' text-anchor='end' font-size='11' fill='#777' font-family='sans-serif'>10%</text><text x='58' y='129' text-anchor='end' font-size='11' fill='#777' font-family='sans-serif'>20%</text><text x='58' y='73' text-anchor='end' font-size='11' fill='#777' font-family='sans-serif'>30%</text><line x1='68' y1='184' x2='658' y2='184' stroke='#333' stroke-width='0.5' stroke-dasharray='4,4'/><line x1='68' y1='129' x2='658' y2='129' stroke='#333' stroke-width='0.5' stroke-dasharray='4,4'/><line x1='68' y1='73' x2='658' y2='73' stroke='#333' stroke-width='0.5' stroke-dasharray='4,4'/><rect x='73' y='72' width='50' height='168' fill='#4aa8ff' rx='3'/><text x='98' y='65' text-anchor='middle' font-size='11' fill='#4aa8ff' font-family='sans-serif'>30.1%</text><text x='98' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>1</text><rect x='138' y='142' width='50' height='98' fill='#5bbf7f' rx='3'/><text x='163' y='135' text-anchor='middle' font-size='11' fill='#5bbf7f' font-family='sans-serif'>17.6%</text><text x='163' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>2</text><rect x='203' y='170' width='50' height='70' fill='#f0c040' rx='3'/><text x='228' y='163' text-anchor='middle' font-size='11' fill='#f0c040' font-family='sans-serif'>12.5%</text><text x='228' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>3</text><rect x='268' y='186' width='50' height='54' fill='#e07040' rx='3'/><text x='293' y='179' text-anchor='middle' font-size='11' fill='#e07040' font-family='sans-serif'>9.7%</text><text x='293' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>4</text><rect x='333' y='196' width='50' height='44' fill='#e05050' rx='3'/><text x='358' y='189' text-anchor='middle' font-size='11' fill='#e05050' font-family='sans-serif'>7.9%</text><text x='358' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>5</text><rect x='398' y='203' width='50' height='37' fill='#c060a0' rx='3'/><text x='423' y='196' text-anchor='middle' font-size='11' fill='#c060a0' font-family='sans-serif'>6.7%</text><text x='423' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>6</text><rect x='463' y='208' width='50' height='32' fill='#9060c0' rx='3'/><text x='488' y='201' text-anchor='middle' font-size='11' fill='#9060c0' font-family='sans-serif'>5.8%</text><text x='488' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>7</text><rect x='528' y='212' width='50' height='28' fill='#6080c0' rx='3'/><text x='553' y='205' text-anchor='middle' font-size='11' fill='#6080c0' font-family='sans-serif'>5.1%</text><text x='553' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>8</text><rect x='593' y='214' width='50' height='26' fill='#4080a0' rx='3'/><text x='618' y='207' text-anchor='middle' font-size='11' fill='#4080a0' font-family='sans-serif'>4.6%</text><text x='618' y='258' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>9</text></svg>
- P(d=1)=30.1%、P(d=9)=4.6% — 均等ではなく急激に減少する


---

# 歴史：Newcomb 1881 → Benford 1938

- **1881年** Simon Newcomb：対数表の最初のページが汚れていることに気づく
- 「小さい数から始まる数字の方が頻繁に使われる」と提唱 → 無視される
- **1938年** Frank Benford：20種・20,229件のデータで独自に再発見
- 川の長さ、分子量、新聞の数字、野球統計など多様なデータで検証
- 「異常な数字の法則（The Law of Anomalous Numbers）」として発表
- → 以来「**ベンフォードの法則**」として広く知られることに


---

# 対数スケールで見ると一目瞭然

- <svg viewBox='0 0 700 210' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='28' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>対数スケール上での各桁の幅（1〜10）</text><rect x='70' y='60' width='169' height='55' fill='#4aa8ff' rx='2'/><text x='154' y='91' text-anchor='middle' font-size='18' fill='#000' font-weight='bold' font-family='sans-serif'>1</text><text x='154' y='130' text-anchor='middle' font-size='12' fill='#4aa8ff' font-family='sans-serif'>30.1%</text><rect x='239' y='60' width='99' height='55' fill='#5bbf7f' rx='2'/><text x='288' y='91' text-anchor='middle' font-size='16' fill='#000' font-weight='bold' font-family='sans-serif'>2</text><text x='288' y='130' text-anchor='middle' font-size='12' fill='#5bbf7f' font-family='sans-serif'>17.6%</text><rect x='338' y='60' width='70' height='55' fill='#f0c040' rx='2'/><text x='373' y='91' text-anchor='middle' font-size='15' fill='#000' font-weight='bold' font-family='sans-serif'>3</text><text x='373' y='130' text-anchor='middle' font-size='12' fill='#f0c040' font-family='sans-serif'>12.5%</text><rect x='408' y='60' width='54' height='55' fill='#e07040' rx='2'/><text x='435' y='91' text-anchor='middle' font-size='13' fill='#fff' font-weight='bold' font-family='sans-serif'>4</text><text x='435' y='130' text-anchor='middle' font-size='11' fill='#e07040' font-family='sans-serif'>9.7%</text><rect x='462' y='60' width='44' height='55' fill='#e05050' rx='2'/><text x='484' y='91' text-anchor='middle' font-size='12' fill='#fff' font-weight='bold' font-family='sans-serif'>5</text><text x='484' y='130' text-anchor='middle' font-size='11' fill='#e05050' font-family='sans-serif'>7.9%</text><rect x='506' y='60' width='37' height='55' fill='#c060a0' rx='2'/><text x='524' y='91' text-anchor='middle' font-size='12' fill='#fff' font-weight='bold' font-family='sans-serif'>6</text><text x='524' y='130' text-anchor='middle' font-size='11' fill='#c060a0' font-family='sans-serif'>6.7%</text><rect x='543' y='60' width='33' height='55' fill='#9060c0' rx='2'/><text x='559' y='91' text-anchor='middle' font-size='11' fill='#fff' font-weight='bold' font-family='sans-serif'>7</text><text x='559' y='130' text-anchor='middle' font-size='11' fill='#9060c0' font-family='sans-serif'>5.8%</text><rect x='576' y='60' width='28' height='55' fill='#6080c0' rx='2'/><text x='590' y='91' text-anchor='middle' font-size='11' fill='#fff' font-weight='bold' font-family='sans-serif'>8</text><text x='590' y='130' text-anchor='middle' font-size='11' fill='#6080c0' font-family='sans-serif'>5.1%</text><rect x='604' y='60' width='26' height='55' fill='#4080a0' rx='2'/><text x='617' y='91' text-anchor='middle' font-size='10' fill='#fff' font-weight='bold' font-family='sans-serif'>9</text><text x='617' y='130' text-anchor='middle' font-size='10' fill='#4080a0' font-family='sans-serif'>4.6%</text><line x1='70' y1='55' x2='630' y2='55' stroke='#555' stroke-width='1'/><text x='70' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>1</text><text x='239' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>2</text><text x='338' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>3</text><text x='408' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>4</text><text x='462' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>5</text><text x='630' y='48' text-anchor='middle' font-size='10' fill='#888' font-family='sans-serif'>10</text><text x='350' y='175' text-anchor='middle' font-size='12' fill='#aaa' font-family='sans-serif'>対数スケール上では各桁が占める幅＝その桁の出現確率</text><text x='350' y='195' text-anchor='middle' font-size='12' fill='#aaa' font-family='sans-serif'>1〜2の幅が広い → 先頭桁「1」が多く出現する</text></svg>
- 対数スケール上で1〜10を等分すると、各桁の幅がそのまま出現確率になる


---

# 自然界での成立例

- **人口・地理**: 国の人口、川の長さ、山の高さ、都市の面積
- **経済・金融**: 株価、取引金額、企業の売上高、GDPデータ
- **科学**: 物理定数、素粒子の質量、天体の距離
- **数学**: フィボナッチ数列、べき乗則に従う数列、素数
- **共通点**: 「自然に生成され、広い範囲に渡る数値」
- → 人工的に決められた番号（電話番号・郵便番号）は**成立しない**


---

# 数式：P(d) = log₁₀(1 + 1/d)

- 先頭桁 d（d = 1, 2, …, 9）の出現確率：
- $$P(d) = \log_{10}\left(1 + \frac{1}{d}\right) = \log_{10}\left(\frac{d+1}{d}\right)$$
- **直感的な意味**: 対数スケール上で、数字 d〜(d+1) が占める幅の割合
- d=1: log₁₀(2/1) = **0.301 = 30.1%**
- d=9: log₁₀(10/9) = **0.046 = 4.6%**
- → 桁が大きくなるほど、対数上の幅は狭まり、出現確率も下がる


---

# 各桁の確率一覧

| 先頭桁 d | 確率 P(d) | 累積確率 |
| 1 | **30.1%** | 30.1% |
| 2 | 17.6% | 47.7% |
| 3 | 12.5% | 60.2% |
| 4 | 9.7% | 69.9% |
| 5 | 7.9% | 77.8% |
| 6 | 6.7% | 84.5% |
| 7 | 5.8% | 90.3% |
| 8 | 5.1% | 95.4% |
| 9 | 4.6% | 100.0% |


---

# スケール不変性：単位が変わっても分布は同じ

- <svg viewBox='0 0 700 280' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='28' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>単位変換をしても先頭桁の分布は変わらない</text><rect x='40' y='50' width='270' height='195' fill='#1a2a3a' rx='8' stroke='#5bbf7f' stroke-width='2'/><text x='175' y='75' text-anchor='middle' font-size='13' fill='#5bbf7f' font-family='sans-serif'>USD（ドル建て）</text><rect x='55' y='85' width='22' height='140' fill='#4aa8ff' rx='2'/><rect x='85' y='126' width='22' height='99' fill='#5bbf7f' rx='2'/><rect x='115' y='155' width='22' height='70' fill='#f0c040' rx='2'/><rect x='145' y='167' width='22' height='58' fill='#e07040' rx='2'/><rect x='175' y='176' width='22' height='49' fill='#e05050' rx='2'/><rect x='205' y='182' width='22' height='43' fill='#c060a0' rx='2'/><rect x='235' y='188' width='22' height='37' fill='#9060c0' rx='2'/><rect x='265' y='192' width='22' height='33' fill='#6080c0' rx='2'/><rect x='295' y='195' width='22' height='30' fill='#4080a0' rx='2'/><line x1='50' y1='225' x2='325' y2='225' stroke='#555' stroke-width='1'/><text x='175' y='245' text-anchor='middle' font-size='11' fill='#888' font-family='sans-serif'>先頭桁 1〜9</text><rect x='390' y='50' width='270' height='195' fill='#1a2a3a' rx='8' stroke='#4aa8ff' stroke-width='2'/><text x='525' y='75' text-anchor='middle' font-size='13' fill='#4aa8ff' font-family='sans-serif'>JPY（円建て ×150）</text><rect x='405' y='85' width='22' height='140' fill='#4aa8ff' rx='2'/><rect x='435' y='126' width='22' height='99' fill='#5bbf7f' rx='2'/><rect x='465' y='155' width='22' height='70' fill='#f0c040' rx='2'/><rect x='495' y='167' width='22' height='58' fill='#e07040' rx='2'/><rect x='525' y='176' width='22' height='49' fill='#e05050' rx='2'/><rect x='555' y='182' width='22' height='43' fill='#c060a0' rx='2'/><rect x='585' y='188' width='22' height='37' fill='#9060c0' rx='2'/><rect x='615' y='192' width='22' height='33' fill='#6080c0' rx='2'/><rect x='645' y='195' width='22' height='30' fill='#4080a0' rx='2'/><line x1='400' y1='225' x2='675' y2='225' stroke='#555' stroke-width='1'/><text x='525' y='245' text-anchor='middle' font-size='11' fill='#888' font-family='sans-serif'>先頭桁 1〜9</text><text x='350' y='155' text-anchor='middle' font-size='28' fill='#f0c040' font-family='sans-serif'>=</text><text x='350' y='175' text-anchor='middle' font-size='11' fill='#aaa' font-family='sans-serif'>完全一致</text></svg>
- 定数倍の変換（×150など）をしても先頭桁の分布は変わらない → **スケール不変性**


---

<!-- _class: lead -->
# Part 2

- なぜ1が多いのか？
数学的メカニズム


---

# 掛け算を繰り返すとベンフォード分布に収束する

- 乱数を繰り返し掛け合わせると先頭桁がベンフォード分布に収束する
- **実験**: `x₀ = rand()` として `xₙ = xₙ₋₁ × rand()` を繰り返す
- → n が大きくなると `log(xₙ)` が**一様分布**に近づく
- → 一様分布した対数値の先頭桁 = ベンフォード分布
- **直感**: 経済データは「成長率の積」で決まる → 対数が一様分布 → ベンフォード
- 複利・GDP成長・人口増加など「掛け算的プロセス」が鍵


---

# 対数一様分布とベンフォードの法則

- 数値 X の対数 log₁₀(X) が一様分布 [0, 1) に従うとき：
- 先頭桁 d になる確率 = log₁₀(X) が [log₁₀(d), log₁₀(d+1)) に入る確率
- = log₁₀(d+1) − log₁₀(d) = **log₁₀(1 + 1/d)**
- **スケール不変性の証明**: X → cX すると log(cX) = log(c) + log(X)
- → 定数を加えるだけで一様分布はずれない → 先頭桁分布は変わらない
- → これが「単位を変えても成立する」理由


---

# 複数桁への拡張

- **2桁目**の確率: P(second=s | first=d) = log₁₀(1 + 1/(10d+s))
- **3桁目以降**: より一様分布に近づく（0〜9がほぼ均等に）
- **2桁目の特徴**: d=0 の確率が最も高い（12%程度）
- → 2桁目のゼロが多い = 自然なデータの特徴
- **実用的な意味**: 2桁目・3桁目の検定は「ラウンドナンバー不正」の検出に有効
- 例：9,999円や10,000円などの閾値付近への集中を検出できる


---

# 統計的検定指標：MADとSSD

- **MAD（平均絶対偏差）**: |実測 − 期待値| の平均
- Nigrini (2012) の判定基準：
| MAD値 | 判定 |
| < 0.006 | 許容範囲（適合） |
| 0.006〜0.012 | 要注意（境界値） |
| 0.012〜0.015 | 要精査（中程度逸脱） |
| > 0.015 | 高リスク（大幅逸脱） |
- **SSD（Sum of Squared Differences）**: 二乗偏差の和。感度が高い


---

# カイ二乗検定の実装

- ベンフォード分布との適合度をカイ二乗検定で評価する

```python
import numpy as np
from scipy import stats

def benford_chi_square(observed_counts):
    """ベンフォードの法則に対するカイ二乗検定"""
    n = sum(observed_counts)
    expected = [np.log10(1 + 1/d) for d in range(1, 10)]
    expected_counts = [p * n for p in expected]
    chi2, p_value = stats.chisquare(observed_counts, expected_counts)
    return chi2, p_value

# 使用例
counts = [287, 163, 119, 89, 78, 66, 54, 48, 43]
chi2, p = benford_chi_square(counts)
print(f"χ² = {chi2:.2f}, p-value = {p:.4f}")
print("⚠️ 異常あり" if p < 0.05 else "✅ 正常範囲")
```


---

# Z検定（桁ごとの異常検出）

- 特定の桁に集中していないか、桁ごとに個別に検定する

```python
import numpy as np

def z_test_digit(count, total, digit):
    p_exp = np.log10(1 + 1/digit)
    p_obs = count / total
    z = (abs(p_obs - p_exp) - 1/(2*total)) / \
        np.sqrt(p_exp * (1 - p_exp) / total)
    return z, p_obs, p_exp

counts = [287, 163, 119, 89, 78, 66, 54, 48, 43]
total = sum(counts)
for d in range(1, 10):
    z, p_obs, p_exp = z_test_digit(counts[d-1], total, d)
    flag = "⚠️" if abs(z) > 1.96 else "  "
    print(f"{flag} d={d}: obs={p_obs:.3f} exp={p_exp:.3f} Z={z:.2f}")
```


---

<!-- _class: lead -->
# Part 3

- 不正検知の実践
実際の事件・事例


---

# ベンフォード法が適用できるデータ分類

- <svg viewBox='0 0 700 270' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='175' y='28' text-anchor='middle' font-size='14' fill='#5bbf7f' font-family='sans-serif'>✅ 適用できるデータ</text><text x='525' y='28' text-anchor='middle' font-size='14' fill='#e05050' font-family='sans-serif'>❌ 適用できないデータ</text><rect x='20' y='40' width='300' height='210' fill='#0d2a1a' rx='8' stroke='#5bbf7f' stroke-width='1.5'/><rect x='380' y='40' width='300' height='210' fill='#2a0d0d' rx='8' stroke='#e05050' stroke-width='1.5'/><text x='170' y='70' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>💰 財務諸表・帳簿</text><text x='170' y='100' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>👥 人口統計・GDPデータ</text><text x='170' y='130' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>⚛️ 物理定数・科学測定値</text><text x='170' y='160' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>🗳️ 選挙の得票数</text><text x='170' y='190' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>📈 株価・取引金額</text><text x='170' y='220' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>🔢 素数・フィボナッチ数列</text><text x='530' y='70' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>📞 電話番号・郵便番号</text><text x='530' y='100' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>🎟️ 宝くじ・ランダム番号</text><text x='530' y='130' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>💴 価格設定（9.99円など）</text><text x='530' y='160' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>📦 商品コード・ID番号</text><text x='530' y='190' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>📅 日付・年号データ</text><text x='530' y='220' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>🎲 均一分布の乱数</text></svg>
- 鍵は「**自然に生成された、広いスケールにわたる数値**」かどうか


---

# 事例1：エンロン事件（2001年）

- **世界最大級の会計不正**：エネルギー大手エンロンが財務諸表を組織的に改ざん
- 時価総額は一時700億ドル → 2001年12月に**経営破綻**
- 粉飾手法：特別目的会社（SPE）を利用した巨額負債の簿外処理
- Nigrini（2002）がベンフォード分析でエンロン財務データの**異常を検出**
- 「3」「4」「5」で始まる数字の比率が期待値より高く、「1」が少ない
- → 意図的に数字を調整した痕跡がベンフォード分布のずれとして現れた


---

# エンロン財務データのベンフォード分析

- <svg viewBox='0 0 700 290' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='24' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>エンロン実測値 vs ベンフォード期待値（先頭桁分布）</text><line x1='60' y1='255' x2='660' y2='255' stroke='#555' stroke-width='1.5'/><line x1='60' y1='55' x2='60' y2='255' stroke='#555' stroke-width='1.5'/><text x='48' y='259' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>0%</text><text x='48' y='199' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>10%</text><text x='48' y='139' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>20%</text><text x='48' y='79' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>30%</text><line x1='60' y1='199' x2='660' y2='199' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><line x1='60' y1='139' x2='660' y2='139' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><line x1='60' y1='79' x2='660' y2='79' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><rect x='68' y='75' width='28' height='180' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='98' y='133' width='28' height='122' fill='#e05050' rx='2' opacity='0.85'/><rect x='134' y='143' width='28' height='112' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='164' y='147' width='28' height='108' fill='#e05050' rx='2' opacity='0.85'/><rect x='200' y='171' width='28' height='84' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='230' y='155' width='28' height='100' fill='#e05050' rx='2' opacity='0.85'/><rect x='266' y='184' width='28' height='71' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='296' y='175' width='28' height='80' fill='#e05050' rx='2' opacity='0.85'/><rect x='332' y='196' width='28' height='59' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='362' y='198' width='28' height='57' fill='#e05050' rx='2' opacity='0.85'/><rect x='398' y='204' width='28' height='51' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='428' y='211' width='28' height='44' fill='#e05050' rx='2' opacity='0.85'/><rect x='464' y='211' width='28' height='44' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='494' y='218' width='28' height='37' fill='#e05050' rx='2' opacity='0.85'/><rect x='530' y='215' width='28' height='40' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='560' y='229' width='28' height='26' fill='#e05050' rx='2' opacity='0.85'/><rect x='596' y='218' width='28' height='37' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='626' y='243' width='28' height='12' fill='#e05050' rx='2' opacity='0.85'/><text x='82' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>1</text><text x='149' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>2</text><text x='215' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>3</text><text x='281' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>4</text><text x='347' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>5</text><text x='413' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>6</text><text x='479' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>7</text><text x='545' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>8</text><text x='611' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>9</text><rect x='200' y='36' width='14' height='12' fill='#4aa8ff' rx='2'/><text x='218' y='47' font-size='11' fill='#4aa8ff' font-family='sans-serif'>ベンフォード期待値</text><rect x='340' y='36' width='14' height='12' fill='#e05050' rx='2'/><text x='358' y='47' font-size='11' fill='#e05050' font-family='sans-serif'>エンロン実測値</text></svg>
- d=1で低すぎ、d=2〜5で高すぎる → 中間の数字に意図的に調整した痕跡


---

# 事例2：選挙不正（イラン2009年大統領選）

- **2009年イラン大統領選**：アフマディーネジャード大統領の再選が物議を醸す
- 得票数の統計的異常が複数の研究者によって報告された
- Mebane（2011）：票数の先頭桁分布を分析し**有意な逸脱**を発見
- 特に「2」の出現が過剰、「1」の出現が少なすぎる傾向
- **注意**：ベンフォード分析のみで「不正確定」とはならない（間接的証拠）
- → 同様の手法が2020年米国大統領選でも誤用されたケースがある（限界の議論へ）


---

# 選挙データのベンフォード分析

- <svg viewBox='0 0 700 290' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='24' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>イラン2009年得票数 vs ベンフォード期待値</text><line x1='60' y1='255' x2='660' y2='255' stroke='#555' stroke-width='1.5'/><line x1='60' y1='55' x2='60' y2='255' stroke='#555' stroke-width='1.5'/><text x='48' y='259' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>0%</text><text x='48' y='199' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>10%</text><text x='48' y='139' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>20%</text><text x='48' y='79' text-anchor='end' font-size='10' fill='#777' font-family='sans-serif'>30%</text><line x1='60' y1='199' x2='660' y2='199' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><line x1='60' y1='139' x2='660' y2='139' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><line x1='60' y1='79' x2='660' y2='79' stroke='#333' stroke-width='0.5' stroke-dasharray='3,3'/><rect x='68' y='75' width='28' height='180' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='98' y='160' width='28' height='95' fill='#f0a030' rx='2' opacity='0.85'/><rect x='134' y='143' width='28' height='112' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='164' y='101' width='28' height='154' fill='#f0a030' rx='2' opacity='0.85'/><rect x='200' y='171' width='28' height='84' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='230' y='177' width='28' height='78' fill='#f0a030' rx='2' opacity='0.85'/><rect x='266' y='184' width='28' height='71' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='296' y='183' width='28' height='72' fill='#f0a030' rx='2' opacity='0.85'/><rect x='332' y='196' width='28' height='59' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='362' y='201' width='28' height='54' fill='#f0a030' rx='2' opacity='0.85'/><rect x='398' y='204' width='28' height='51' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='428' y='202' width='28' height='53' fill='#f0a030' rx='2' opacity='0.85'/><rect x='464' y='211' width='28' height='44' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='494' y='209' width='28' height='46' fill='#f0a030' rx='2' opacity='0.85'/><rect x='530' y='215' width='28' height='40' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='560' y='221' width='28' height='34' fill='#f0a030' rx='2' opacity='0.85'/><rect x='596' y='218' width='28' height='37' fill='#4aa8ff' rx='2' opacity='0.85'/><rect x='626' y='231' width='28' height='24' fill='#f0a030' rx='2' opacity='0.85'/><text x='82' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>1</text><text x='149' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>2</text><text x='215' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>3</text><text x='281' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>4</text><text x='347' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>5</text><text x='413' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>6</text><text x='479' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>7</text><text x='545' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>8</text><text x='611' y='272' text-anchor='middle' font-size='12' fill='#bbb' font-family='sans-serif'>9</text><rect x='200' y='36' width='14' height='12' fill='#4aa8ff' rx='2'/><text x='218' y='47' font-size='11' fill='#4aa8ff' font-family='sans-serif'>ベンフォード期待値</text><rect x='360' y='36' width='14' height='12' fill='#f0a030' rx='2'/><text x='378' y='47' font-size='11' fill='#f0a030' font-family='sans-serif'>イラン2009年実測値（イラスト）</text></svg>
- d=1が少なく、d=2が過剰 → 統計的には有意な逸脱だが、不正の直接証拠ではない


---

# 事例3：科学データ捏造（Stapel事件）

- **Diederik Stapel**（オランダ・ティルブルフ大学、社会心理学者）
- 2011年発覚：少なくとも**58本の論文**でデータを捏造・改ざん
- 「清潔な環境では人種差別が減る」「無秩序さが偏見を増やす」などを捏造
- 捏造データの特徴：ベンフォード分布から大きく外れた**均一すぎる分布**
- 人間が「それらしい」数字を作ると丸い数字や均一な分布に偏る
- → Benford分析 + 統計分布の分析が研究不正検出ツールとして注目される


---

# 研究不正データの特徴パターン

- 捏造データには人間の心理バイアスが現れる：
- 📌 **過剰な「5」と「0」**: 丸い数字が好まれる（ラウンドナンバー効果）
- 📌 **末尾桁の均一すぎる分布**: 本来は0が多いが捏造では均等になる
- 📌 **分布の分散が少なすぎる**: 「それらしい」値ばかり並ぶ
- 📌 **先頭桁が均一に分布**: ベンフォード分布ではなく一様分布に近い
- → これらのパターンを組み合わせた**複合指標**での検出が有効


---

# 事例4：税務申告不正（IRS活用事例）

- **米国IRS（内国歳入庁）**：ベンフォード分析を申告書審査ツールとして活用
- 大量の経費申告・控除申請から**不自然なパターン**を自動検出
- よくある不正パターン：
- 📌 承認閾値（例：5,000ドル）直下への意図的な集中
- 📌 「9」で始まる数字の異常な多さ（9,999ドルなど）
- 📌 末尾が「00」「99」に偏る心理的価格設定
- → 初期スクリーニングとして活用し、要調査案件を効率的に絞り込む


---

<!-- _class: lead -->
# Part 4

- Python実装
検定コード


---

# Python実装①：先頭桁抽出

- 財務データから先頭桁を抽出するパイプラインを実装する

```python
import pandas as pd
import numpy as np

def extract_first_digit(series):
    """数値シリーズから先頭桁を抽出"""
    def get_digit(x):
        if pd.isna(x) or x == 0:
            return None
        s = str(abs(float(x))).replace('.', '').lstrip('0')
        return int(s[0]) if s else None
    return series.map(get_digit).dropna().astype(int)

# 使用例
df = pd.read_csv("financial_data.csv")
digits = extract_first_digit(df["amount"])
counts = digits.value_counts().sort_index()
print(f"サンプル数: {len(digits)}")
print(counts)
```


---

# Python実装②：期待値との比較

- ベンフォード期待値を計算し、実測との差分を確認する

```python
import numpy as np

def benford_expected(n):
    """ベンフォード期待値（件数）を計算"""
    return {d: np.log10(1 + 1/d) * n for d in range(1, 10)}

n = len(digits)
expected = benford_expected(n)
print(f"{'桁':>4} {'実測':>8} {'実測%':>8} {'期待%':>8} {'差分':>8}")
print("-" * 44)
for d in range(1, 10):
    obs = counts.get(d, 0)
    exp = expected[d]
    print(f"  {d}  {obs:8d}  {obs/n*100:7.1f}%  "
          f"{exp/n*100:7.1f}%  {obs-exp:+7.1f}")
```


---

# Python実装③：可視化

- matplotlibで実測値とベンフォード期待値を並べて比較する

```python
import matplotlib.pyplot as plt
import numpy as np

digits_range = range(1, 10)
obs_pct = [counts.get(d, 0) / n * 100 for d in digits_range]
exp_pct = [np.log10(1 + 1/d) * 100 for d in digits_range]
x = np.arange(1, 10)
fig, ax = plt.subplots(figsize=(10, 5))
ax.bar(x - 0.2, obs_pct, 0.4, label="実測値", color="steelblue")
ax.bar(x + 0.2, exp_pct, 0.4, label="ベンフォード期待値",
       color="orange", alpha=0.8)
ax.set_xlabel("先頭桁"); ax.set_ylabel("出現率 (%)")
ax.set_title("ベンフォード分析")
ax.legend(); plt.tight_layout()
plt.savefig("benford_result.png", dpi=150)
```


---

# Python実装④：統計的検定と判定

- MADとカイ二乗検定でデータのベンフォード適合度を判定する

```python
from scipy import stats
import numpy as np

# MAD計算
obs_p = [counts.get(d,0)/n for d in range(1,10)]
exp_p = [np.log10(1+1/d) for d in range(1,10)]
mad = np.mean([abs(o-e) for o,e in zip(obs_p, exp_p)])

# Nigrini (2012) 判定基準
if   mad < 0.006:  verdict = "✅ 許容範囲（適合）"
elif mad < 0.012:  verdict = "⚠️  要注意（境界値）"
elif mad < 0.015:  verdict = "🔶 要精査（中程度逸脱）"
else:              verdict = "🚨 高リスク（大幅逸脱）"
print(f"MAD = {mad:.4f} → {verdict}")

# カイ二乗検定
chi2, p = stats.chisquare(
    [counts.get(d,0) for d in range(1,10)],
    [np.log10(1+1/d)*n for d in range(1,10)])
print(f"χ²={chi2:.2f}, p={p:.4f} → {'異常検知' if p<0.05 else '正常範囲'}")
```


---

# ライブラリ：benfordslaw

- ゼロから実装せずにライブラリを使う選択肢もある

```python
# pip install benfordslaw
from benfordslaw import benfordslaw
import pandas as pd

df = pd.read_csv("financial_data.csv")

# 初期化（有意水準5%）
bl = benfordslaw(alpha=0.05)

# 分析実行
results = bl.fit(df["amount"])

# 結果確認
print(f"P-value: {results['P']:.4f}")
print("異常検知" if results['P'] < 0.05 else "問題なし")

# グラフ出力
bl.plot(title="Financial Data: Benford Analysis")
```


---

<!-- _class: lead -->
# Part 5

- 限界と回避策
ベンフォード法が通用しないとき


---

# ベンフォード法が成立する条件と限界

- <svg viewBox='0 0 700 270' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='25' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>ベンフォードの法則が成立する条件チェック</text><rect x='30' y='40' width='640' height='50' fill='#0d2a1a' rx='6' stroke='#5bbf7f' stroke-width='1'/><text x='60' y='60' font-size='13' fill='#5bbf7f' font-family='sans-serif'>✅</text><text x='85' y='60' font-size='13' fill='#ddd' font-family='sans-serif'>データが自然に生成された数値（人工的な番号体系でない）</text><text x='60' y='78' font-size='11' fill='#888' font-family='sans-serif'>例：財務取引、人口、物理測定値 → OK　｜　電話番号、郵便番号 → NG</text><rect x='30' y='100' width='640' height='50' fill='#0d2a1a' rx='6' stroke='#5bbf7f' stroke-width='1'/><text x='60' y='120' font-size='13' fill='#5bbf7f' font-family='sans-serif'>✅</text><text x='85' y='120' font-size='13' fill='#ddd' font-family='sans-serif'>数値が広いスケール（複数桁）にわたって分布している</text><text x='60' y='138' font-size='11' fill='#888' font-family='sans-serif'>例：$1〜$1,000,000 → OK　｜　$9,000〜$11,000（狭い範囲） → NG</text><rect x='30' y='160' width='640' height='50' fill='#0d2a1a' rx='6' stroke='#5bbf7f' stroke-width='1'/><text x='60' y='180' font-size='13' fill='#5bbf7f' font-family='sans-serif'>✅</text><text x='85' y='180' font-size='13' fill='#ddd' font-family='sans-serif'>サンプル数が十分にある（目安：100件以上、理想は1,000件以上）</text><text x='60' y='198' font-size='11' fill='#888' font-family='sans-serif'>例：年間全取引データ → OK　｜　50件のサンプル → 検出力不足</text><rect x='30' y='220' width='640' height='40' fill='#2a0d0d' rx='6' stroke='#e05050' stroke-width='1'/><text x='60' y='240' font-size='13' fill='#e05050' font-family='sans-serif'>❌</text><text x='85' y='240' font-size='13' fill='#ddd' font-family='sans-serif'>心理的価格設定・制約付き番号・均一分布データには適用不可</text></svg>
- 3つの条件がそろっているかを必ず確認してから適用する


---

# 限界①：制約付きデータ

- **電話番号**: 市外局番（03, 06など）で先頭桁が固定される
- **郵便番号**: 地域コードで範囲が制限される（100〜900番台など）
- **ISBN・商品コード**: 規格で番号体系が決まっている
- **年齢・評価スコア**: 1〜100など範囲が限定的
- **共通点**: 人間が設計した「番号体系」は自然な分布にならない
- → これらのデータにベンフォード分析を適用しても**意味のある結果が出ない**


---

# 限界②：均一分布・人工分布データ

- **サイコロの目・乗り物番号**: 意図的に均等設計
- **ランダム乱数**: 先頭桁が一様分布になるよう生成される
- **価格設定データ**: 9.99、19.99など心理的価格に集中
- **時刻・日付**: 00〜23時など定義された範囲の繰り返し
- これらは「自然に生まれた」データではなく**人間がデザインしたデータ**
- → ベンフォード法が前提とする対数一様分布が成立しない


---

# 限界③：小データセット

- **最低サンプル数の目安（Nigrini 2012）**
| サンプル数 | 評価 |
| < 100件 | 使用不可 |
| 100〜300件 | 補助的用途のみ |
| 300〜1,000件 | 通常利用可 |
| > 1,000件 | 高信頼度 |
- → 小データでは偶然の偏りと不正が区別できない
- → データが少ない場合は他の分析手法を優先する


---

# 回避戦略①：ラウンドナンバー効果

- **人間が意図的に数字を入力するとき「丸い数字」を好む**
- 例：5,000円、10,000円、50,000円に意図的に調整
- → 「5」や「1」で始まる数字が不自然に増える
- **検出方法**: 末尾桁の分布を確認（末尾が0や5に偏っていないか）
- 2桁目・3桁目がゼロに集中しすぎていないか確認
- → ベンフォード分析と**末尾桁検定を組み合わせる**と検出力が上がる


---

# 回避戦略②：閾値直下への集中

- **承認・申告が必要な閾値の直前に意図的に集中させる手法**
- 例：経費精算の承認額が5,000円以上 → 4,999円の申請が異常に多い
- 例：申告が必要な贈与税基準（110万円）直下に集中
- **「9」で始まる数字の過剰な出現**がシグナルになる
- ベンフォード分析で d=9 の比率が有意に高い → 閾値回避の可能性
- → Z検定で d=9 を重点的にチェックする


---

# 回避戦略③：ランダムノイズ注入

- **高度な不正者がベンフォード検査を回避するために使う手口**
- 実際の数字に小さなランダムノイズを加え、自然に見せかける
- 例：100万円 → 1,003,241円（ノイズ追加）
- **これを検出するために**：
- 📌 2桁目・3桁目の検定（ノイズ後でも元の構造が残る場合がある）
- 📌 関連データとの整合性チェック（売上と仕入れの比率など）
- 📌 時系列分析（急激な変化点を検出）


---

# False Positiveの問題

- **ベンフォード法で「異常あり」でも不正とは限らない**
- 📌 業種固有のパターン：小売業は価格帯が集中しやすい
- 📌 四捨五入・単位変換：データの前処理でベンフォード性が失われる
- 📌 集計データ vs 個別データ：集計によって分布が変わる
- 📌 新興企業の初期データ：少数のデータではばらつきが大きい
- **重要原則**: ベンフォード分析は「要調査フラグ」であり、**有罪の証明ではない**
- → 必ず他の証拠と組み合わせて総合的に判断する


---

# 他の統計手法との組み合わせ（多層防御）

- <svg viewBox='0 0 700 260' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='350' y='25' text-anchor='middle' font-size='14' fill='#ddd' font-family='sans-serif'>多層防御アプローチ：複数指標の組み合わせ</text><rect x='60' y='40' width='580' height='38' fill='#1a1a2e' rx='5' stroke='#6080c0' stroke-width='1.5'/><text x='350' y='63' text-anchor='middle' font-size='13' fill='#8090e0' font-family='sans-serif'>Layer 5：専門家による詳細調査・ヒアリング</text><rect x='90' y='88' width='520' height='38' fill='#1a2030' rx='5' stroke='#5bbf7f' stroke-width='1.5'/><text x='350' y='111' text-anchor='middle' font-size='13' fill='#7fdf9f' font-family='sans-serif'>Layer 4：時系列異常・関連データ間の整合性チェック</text><rect x='120' y='136' width='460' height='38' fill='#1a2818' rx='5' stroke='#f0c040' stroke-width='1.5'/><text x='350' y='159' text-anchor='middle' font-size='13' fill='#f0d060' font-family='sans-serif'>Layer 3：末尾桁検定・2桁目検定（ラウンドナンバー検出）</text><rect x='150' y='184' width='400' height='38' fill='#281818' rx='5' stroke='#e07040' stroke-width='1.5'/><text x='350' y='207' text-anchor='middle' font-size='13' fill='#e09060' font-family='sans-serif'>Layer 2：統計的外れ値検出（IQR・z-score）</text><rect x='180' y='232' width='340' height='38' fill='#2a0f0f' rx='5' stroke='#e05050' stroke-width='1.5'/><text x='350' y='255' text-anchor='middle' font-size='13' fill='#ff8080' font-family='sans-serif'>Layer 1：ベンフォード第1桁検定（スクリーニング）</text></svg>
- ベンフォード法は「最初のスクリーニング層」として活用し、複数の手法を重ねる


---

<!-- _class: lead -->
# Part 6

- 実装ガイドとベストプラクティス


---

# 実装ステップフロー

- <svg viewBox='0 0 700 200' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='70' width='95' height='50' fill='#1a2a3a' rx='6' stroke='#4aa8ff' stroke-width='1.5'/><text x='57' y='91' text-anchor='middle' font-size='11' fill='#4aa8ff' font-family='sans-serif'>① データ</text><text x='57' y='107' text-anchor='middle' font-size='11' fill='#4aa8ff' font-family='sans-serif'>取得・確認</text><polygon points='107,95 118,90 118,100' fill='#777'/><line x1='105' y1='95' x2='118' y2='95' stroke='#777' stroke-width='1.5'/><rect x='120' y='70' width='95' height='50' fill='#1a2a3a' rx='6' stroke='#5bbf7f' stroke-width='1.5'/><text x='167' y='91' text-anchor='middle' font-size='11' fill='#5bbf7f' font-family='sans-serif'>② 前処理</text><text x='167' y='107' text-anchor='middle' font-size='11' fill='#5bbf7f' font-family='sans-serif'>（クレンジング）</text><polygon points='217,95 228,90 228,100' fill='#777'/><line x1='215' y1='95' x2='228' y2='95' stroke='#777' stroke-width='1.5'/><rect x='230' y='70' width='95' height='50' fill='#1a2a3a' rx='6' stroke='#f0c040' stroke-width='1.5'/><text x='277' y='91' text-anchor='middle' font-size='11' fill='#f0c040' font-family='sans-serif'>③ 先頭桁</text><text x='277' y='107' text-anchor='middle' font-size='11' fill='#f0c040' font-family='sans-serif'>抽出・集計</text><polygon points='327,95 338,90 338,100' fill='#777'/><line x1='325' y1='95' x2='338' y2='95' stroke='#777' stroke-width='1.5'/><rect x='340' y='70' width='95' height='50' fill='#1a2a3a' rx='6' stroke='#e07040' stroke-width='1.5'/><text x='387' y='91' text-anchor='middle' font-size='11' fill='#e07040' font-family='sans-serif'>④ 検定実行</text><text x='387' y='107' text-anchor='middle' font-size='11' fill='#e07040' font-family='sans-serif'>（MAD・χ²）</text><polygon points='437,95 448,90 448,100' fill='#777'/><line x1='435' y1='95' x2='448' y2='95' stroke='#777' stroke-width='1.5'/><rect x='450' y='70' width='95' height='50' fill='#1a2a3a' rx='6' stroke='#c060a0' stroke-width='1.5'/><text x='497' y='91' text-anchor='middle' font-size='11' fill='#c060a0' font-family='sans-serif'>⑤ 可視化</text><text x='497' y='107' text-anchor='middle' font-size='11' fill='#c060a0' font-family='sans-serif'>（グラフ）</text><polygon points='547,95 558,90 558,100' fill='#777'/><line x1='545' y1='95' x2='558' y2='95' stroke='#777' stroke-width='1.5'/><rect x='560' y='70' width='120' height='50' fill='#1a2a3a' rx='6' stroke='#9060c0' stroke-width='1.5'/><text x='620' y='91' text-anchor='middle' font-size='11' fill='#9060c0' font-family='sans-serif'>⑥ 判定・</text><text x='620' y='107' text-anchor='middle' font-size='11' fill='#9060c0' font-family='sans-serif'>レポート作成</text><text x='57' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>適用可否確認</text><text x='167' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>欠損・ゼロ除去</text><text x='277' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>絶対値→先頭桁</text><text x='387' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>MAD/SSD/χ²</text><text x='497' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>棒グラフ比較</text><text x='620' y='150' text-anchor='middle' font-size='10' fill='#555' font-family='sans-serif'>Nigrini基準適用</text></svg>
- ステップ①で「ベンフォード法が適用できるデータか」を必ず確認する


---

# データ選択の判断基準チェックリスト

- **適用OK の条件**（すべて満たす必要あり）
- ✅ 取引金額・売上高・費用など自然に発生した数値
- ✅ データの範囲が少なくとも2桁以上にわたる
- ✅ サンプル数が100件以上（1,000件以上推奨）
- ✅ 人工的な番号体系（電話番号等）でない
- **一般的な適用先**：財務監査、税務調査、選挙データ分析、科学論文レビュー
- **適用NG**：電話番号、郵便番号、日付、均一な価格設定、小サンプル


---

# ベンフォード分析ツールキット

- **Pythonライブラリ**：
- 📦 `benfordslaw` — pip install benfordslaw（シンプルな分析に最適）
- 📦 `scipy.stats` — chisquare検定はこれで十分
- 📦 `pandas` + `matplotlib` — カスタム分析・可視化
- **参考リソース**：
- 📄 Nigrini (2012) *Benford's Law: Applications for Forensic Accounting*
- 📄 Mebane (2011) *Fraud in the 2009 Iranian presidential election*
- 🌐 [benfordanalysis.com](https://www.benfordanalysis.com) — 実務向けガイド


---

# 注意すべき落とし穴

- ⚠️ **ゼロと負の数の扱い**: ゼロは除外、負の数は絶対値で処理
- ⚠️ **通貨単位の混在**: 複数通貨が混在すると分布が歪む
- ⚠️ **桁数が少ないデータ**: 1桁〜2桁のデータが多いと検出力が落ちる
- ⚠️ **業種のベースライン未確認**: 業種ごとに正常範囲が異なる場合がある
- ⚠️ **結果の過信**: MAD高→要調査であって「不正確定」ではない
- → 常に「補完的証拠」として扱い、単独で結論を出さない


---

# ベンフォード適用判断フロー

- <svg viewBox='0 0 700 330' style='max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0' xmlns='http://www.w3.org/2000/svg' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='270' y='10' width='160' height='38' fill='#1a2a3a' rx='6' stroke='#4aa8ff' stroke-width='1.5'/><text x='350' y='33' text-anchor='middle' font-size='13' fill='#4aa8ff' font-family='sans-serif'>スタート</text><line x1='350' y1='48' x2='350' y2='65' stroke='#777' stroke-width='1.5'/><polygon points='345,63 355,63 350,70' fill='#777'/><rect x='220' y='70' width='260' height='38' fill='#1a2030' rx='6' stroke='#888' stroke-width='1'/><text x='350' y='93' text-anchor='middle' font-size='12' fill='#ddd' font-family='sans-serif'>自然に生成された数値か？</text><line x1='350' y1='108' x2='350' y2='125' stroke='#777' stroke-width='1.5'/><polygon points='345,123 355,123 350,130' fill='#777'/><rect x='220' y='130' width='260' height='38' fill='#1a2030' rx='6' stroke='#888' stroke-width='1'/><text x='350' y='153' text-anchor='middle' font-size='12' fill='#ddd' font-family='sans-serif'>スケールが広い（2桁以上）か？</text><line x1='350' y1='168' x2='350' y2='185' stroke='#777' stroke-width='1.5'/><polygon points='345,183 355,183 350,190' fill='#777'/><rect x='220' y='190' width='260' height='38' fill='#1a2030' rx='6' stroke='#888' stroke-width='1'/><text x='350' y='213' text-anchor='middle' font-size='12' fill='#ddd' font-family='sans-serif'>サンプル数 ≥ 100 か？</text><line x1='350' y1='228' x2='350' y2='245' stroke='#777' stroke-width='1.5'/><polygon points='345,243 355,243 350,250' fill='#777'/><rect x='220' y='250' width='260' height='38' fill='#1a2030' rx='6' stroke='#888' stroke-width='1'/><text x='350' y='273' text-anchor='middle' font-size='12' fill='#ddd' font-family='sans-serif'>制約付き番号体系でないか？</text><line x1='350' y1='288' x2='350' y2='305' stroke='#777' stroke-width='1.5'/><polygon points='345,303 355,303 350,310' fill='#777'/><rect x='260' y='310' width='180' height='38' fill='#0d2a1a' rx='6' stroke='#5bbf7f' stroke-width='2'/><text x='350' y='333' text-anchor='middle' font-size='13' fill='#5bbf7f' font-family='sans-serif'>✅ 適用可能</text><text x='480' y='93' font-size='11' fill='#e05050' font-family='sans-serif'>No →</text><rect x='520' y='75' width='140' height='30' fill='#2a0d0d' rx='4' stroke='#e05050' stroke-width='1'/><text x='590' y='94' text-anchor='middle' font-size='11' fill='#e05050' font-family='sans-serif'>❌ 不適用</text><text x='480' y='153' font-size='11' fill='#e05050' font-family='sans-serif'>No →</text><rect x='520' y='135' width='140' height='30' fill='#2a0d0d' rx='4' stroke='#e05050' stroke-width='1'/><text x='590' y='154' text-anchor='middle' font-size='11' fill='#e05050' font-family='sans-serif'>❌ 不適用</text><text x='480' y='213' font-size='11' fill='#f0c040' font-family='sans-serif'>No →</text><rect x='520' y='195' width='140' height='30' fill='#2a2000' rx='4' stroke='#f0c040' stroke-width='1'/><text x='590' y='214' text-anchor='middle' font-size='11' fill='#f0c040' font-family='sans-serif'>⚠️ 補助的のみ</text><text x='480' y='273' font-size='11' fill='#e05050' font-family='sans-serif'>No →</text><rect x='520' y='255' width='140' height='30' fill='#2a0d0d' rx='4' stroke='#e05050' stroke-width='1'/><text x='590' y='274' text-anchor='middle' font-size='11' fill='#e05050' font-family='sans-serif'>❌ 不適用</text></svg>
- 4つの質問にすべてYesと答えられる場合のみ、ベンフォード分析を実施する


---

# 参考文献・論文

- **研究・論文**：
- [Newcomb (1881) *Note on the Frequency of Use of the Different Digits*](https://www.jstor.org/stable/2369148)
- [Benford (1938) *The Law of Anomalous Numbers*](https://www.jstor.org/stable/984802)
- [Nigrini (2012) *Benford's Law: Forensic Accounting Applications*](https://www.nigrini.com)
- [Mebane (2011) *Fraud in the 2009 Iranian Presidential Election*](https://www.wernermebane.org)
- **ツール・OSS**：
- [benfordslaw (PyPI)](https://pypi.org/project/benfordslaw/) — Pythonライブラリ
- [scipy.stats.chisquare](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html) — 検定実装


---

<!-- _class: lead -->
# まとめ：ベンフォードの法則 3つの要点

- **1. 普遍的な数学的法則**
- 自然に生成された数値の先頭桁は対数的に分布する（P(d) = log₁₀(1 + 1/d)）
- **2. 不正検知の強力なスクリーニングツール**
- 財務不正・選挙不正・科学データ捏造を「最初のフラグ」として検出できる
- **3. 限界を知ることが重要**
- 制約付き番号・小データ・心理的価格設定には適用不可。結果は補完的証拠


---

<!-- _class: lead -->
# Q&A

- ご質問をどうぞ
- 資料・コード: [github.com/example/benford-analysis](https://github.com/)
- 参考: Nigrini (2012) *Benford's Law* — Wiley

