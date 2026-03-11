---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "都市科学"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# 都市のスケーリング則
— 人口が2倍になると何が起きるか

- 都市の規模が増えるほど「効率」と「問題」が同時に加速する
- Geoffrey Westの発見：都市はべき乗則で動く
- テクノロジー企業に隠れた同じパターン


---

# アジェンダ

- 1. べき乗則とスケーリング則
- 2. 都市のスケーリング則の発見
- 3. 指数 > 1 の要素と < 1 の要素
- 4. 企業のスケーリング則
- 5. 政策・設計への示唆


---

<!-- _class: lead -->
# べき乗則とスケーリング則


---

# 都市は人口に比例しない（1/2）

- **線形 vs べき乗：人口と都市指標の関係**
- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">Y = Y₀ × N^β　（べき乗則）</text><line x1="80" y1="280" x2="720" y2="280" stroke="#555" stroke-width="2"/><line x1="80" y1="280" x2="80" y2="40" stroke="#555" stroke-width="2"/><text x="400" y="310" text-anchor="middle" fill="#aaa" font-size="13">人口 N（対数スケール）</text><text x="30" y="165" text-anchor="middle" fill="#aaa" font-size="13" transform="rotate(-90,30,165)">都市指標 Y（対数）</text><polyline points="80,260 200,210 340,165 500,120 660,80 720,60" fill="none" stroke="#e91e63" stroke-width="3"/><polyline points="80,260 200,220 340,185 500,155 660,130 720,118" fill="none" stroke="#4caf50" stroke-width="3"/><polyline points="80,260 200,233 340,210 500,188 660,168 720,160" fill="none" stroke="#2196f3" stroke-width="3"/><circle cx="560" cy="95" r="6" fill="#e91e63"/><text x="575" y="100" fill="#e91e63" font-size="13">β=1.15（スーパーリニア）</text><circle cx="560" cy="125" r="6" fill="#4caf50"/><text x="575" y="130" fill="#4caf50" font-size="13">β=1.00（線形）</text><circle cx="560" cy="155" r="6" fill="#2196f3"/><text x="575" y="160" fill="#2196f3" font-size="13">β=0.85（サブリニア）</text><text x="130" y="295" fill="#888" font-size="11">10万</text><text x="290" y="295" fill="#888" font-size="11">50万</text><text x="460" y="295" fill="#888" font-size="11">200万</text><text x="630" y="295" fill="#888" font-size="11">1000万</text></svg>


---

# 都市は人口に比例しない（2/2）

- **β < 1（サブリニア）：インフラ・生物的要素**
- 人口2倍 → ガソリンスタンドは1.85倍で済む
- = 規模の経済（エコノミー・オブ・スケール）
- ---
- **β > 1（スーパーリニア）：社会経済的要素**
- 人口2倍 → 特許出願は2.15倍、犯罪も2.15倍
- = 規模による加速（良いものも悪いものも）


---

<!-- _class: lead -->
# Geoffrey Westの発見


---

# サブリニア vs スーパーリニア：具体指標

- **β指数による都市指標の分類**
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><rect x="40" y="40" width="340" height="240" rx="8" fill="#0d2137" stroke="#2196f3" stroke-width="2"/><text x="210" y="70" text-anchor="middle" fill="#2196f3" font-size="15" font-weight="bold">β ≈ 0.85（サブリニア）</text><text x="210" y="95" text-anchor="middle" fill="#aaa" font-size="12">規模の経済 — 大都市ほど効率的</text><text x="70" y="125" fill="#81d4fa" font-size="13">⬡ ガソリンスタンド</text><text x="70" y="150" fill="#81d4fa" font-size="13">⬡ 道路総延長</text><text x="70" y="175" fill="#81d4fa" font-size="13">⬡ 電力消費量</text><text x="70" y="200" fill="#81d4fa" font-size="13">⬡ 警察署・病院の数</text><text x="70" y="225" fill="#81d4fa" font-size="13">⬡ 水道配管総延長</text><text x="210" y="260" text-anchor="middle" fill="#2196f3" font-size="12">人口2倍 → 1.85倍</text><rect x="420" y="40" width="340" height="240" rx="8" fill="#1a0d2e" stroke="#e91e63" stroke-width="2"/><text x="590" y="70" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">β ≈ 1.15（スーパーリニア）</text><text x="590" y="95" text-anchor="middle" fill="#aaa" font-size="12">規模の加速 — 大都市ほど激しい</text><text x="450" y="125" fill="#f48fb1" font-size="13">⬡ 特許出願数・GDP</text><text x="450" y="150" fill="#f48fb1" font-size="13">⬡ 賃金水準</text><text x="450" y="175" fill="#f48fb1" font-size="13">⬡ 犯罪件数</text><text x="450" y="200" fill="#f48fb1" font-size="13">⬡ 感染症伝播速度</text><text x="450" y="225" fill="#f48fb1" font-size="13">⬡ レストラン・エンタメ</text><text x="590" y="260" text-anchor="middle" fill="#e91e63" font-size="12">人口2倍 → 2.22倍</text></svg>


---

# サンタフェ研究所の分析（2/2）

- **都市指標ごとのβ値（世界数千都市の実測）**
- <svg viewBox="0 0 800 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="290" fill="#1a1a2e"/><line x1="200" y1="20" x2="200" y2="255" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><text x="200" y="270" text-anchor="middle" fill="#f9a825" font-size="11">β=1.0（線形）</text><text x="60" y="48" text-anchor="end" fill="#aaa" font-size="12">特許出願数</text><rect x="200" y="35" width="115" height="18" fill="#e91e63" rx="3"/><text x="320" y="48" fill="#f48fb1" font-size="11">β=1.27</text><text x="60" y="78" text-anchor="end" fill="#aaa" font-size="12">GDP</text><rect x="200" y="65" width="95" height="18" fill="#e91e63" rx="3"/><text x="300" y="78" fill="#f48fb1" font-size="11">β=1.15</text><text x="60" y="108" text-anchor="end" fill="#aaa" font-size="12">賃金水準</text><rect x="200" y="95" width="88" height="18" fill="#e91e63" rx="3"/><text x="293" y="108" fill="#f48fb1" font-size="11">β=1.12</text><text x="60" y="138" text-anchor="end" fill="#aaa" font-size="12">犯罪件数</text><rect x="200" y="125" width="90" height="18" fill="#ff5722" rx="3"/><text x="295" y="138" fill="#ffab91" font-size="11">β=1.16</text><text x="60" y="168" text-anchor="end" fill="#aaa" font-size="12">感染症速度</text><rect x="200" y="155" width="82" height="18" fill="#ff5722" rx="3"/><text x="287" y="168" fill="#ffab91" font-size="11">β=1.10</text><text x="60" y="198" text-anchor="end" fill="#aaa" font-size="12">ガソリンスタンド</text><rect x="120" y="185" width="80" height="18" fill="#2196f3" rx="3"/><text x="118" y="198" text-anchor="end" fill="#81d4fa" font-size="11">β=0.77</text><text x="60" y="228" text-anchor="end" fill="#aaa" font-size="12">道路総延長</text><rect x="140" y="215" width="60" height="18" fill="#2196f3" rx="3"/><text x="138" y="228" text-anchor="end" fill="#81d4fa" font-size="11">β=0.83</text><text x="400" y="15" text-anchor="middle" fill="#aaa" font-size="11">← サブリニア（β&lt;1）　|　スーパーリニア（β&gt;1）→</text></svg>
- 普遍的なパターン：東京・ニューヨーク・ラゴスで同じβ指数が成立


---

# 都市 vs 生物：スケーリングの比較

- **生物と都市：スケーリング則の異なる向き**
- <svg viewBox="0 0 800 330" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="330" fill="#1a1a2e"/><rect x="40" y="50" width="330" height="220" rx="8" fill="#0d1f1a" stroke="#4caf50" stroke-width="2"/><text x="205" y="80" text-anchor="middle" fill="#4caf50" font-size="15" font-weight="bold">生物（哺乳類）</text><text x="205" y="105" text-anchor="middle" fill="#aaa" font-size="12">β = 0.75（クライバーの法則）</text><text x="60" y="135" fill="#a5d6a7" font-size="12">体重2倍 → 代謝は1.68倍</text><text x="60" y="158" fill="#a5d6a7" font-size="12">体が大きいほど省エネ</text><text x="60" y="181" fill="#a5d6a7" font-size="12">心拍数・呼吸はゆっくりに</text><text x="60" y="204" fill="#a5d6a7" font-size="12">寿命は長くなる傾向</text><text x="205" y="248" text-anchor="middle" fill="#4caf50" font-size="13">→ 時間がゆっくり流れる</text><rect x="430" y="50" width="330" height="220" rx="8" fill="#1f0d1a" stroke="#ff5722" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#ff5722" font-size="15" font-weight="bold">都市（ヒト社会）</text><text x="595" y="105" text-anchor="middle" fill="#aaa" font-size="12">β = 1.15（社会的スーパーリニア）</text><text x="450" y="135" fill="#ffab91" font-size="12">人口2倍 → 創造性は2.22倍</text><text x="450" y="158" fill="#ffab91" font-size="12">都市が大きいほど速くなる</text><text x="450" y="181" fill="#ffab91" font-size="12">歩行速度さえ人口に比例</text><text x="450" y="204" fill="#ffab91" font-size="12">イノベーション速度も加速</text><text x="595" y="248" text-anchor="middle" fill="#ff5722" font-size="13">→ 時間が速く流れる</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">生物：大きいほど遅く長生き　⟺　都市：大きいほど速く激しい</text></svg>


---

# 企業のスケーリング則（2/2）

- **都市 vs 企業：なぜ逆のスケーリングが起きるか**
- <svg viewBox="0 0 800 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="290" fill="#1a1a2e"/><rect x="40" y="30" width="330" height="200" rx="8" fill="#0d1a2e" stroke="#f9a825" stroke-width="2"/><text x="205" y="58" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">都市（β > 1）</text><text x="60" y="85" fill="#ffe082" font-size="12">人の流動性が高い</text><text x="60" y="108" fill="#ffe082" font-size="12">多様性が自然に維持される</text><text x="60" y="131" fill="#ffe082" font-size="12">組織の強制がない</text><text x="60" y="154" fill="#ffe082" font-size="12">相互作用が指数的に増加</text><text x="60" y="177" fill="#ffe082" font-size="12">→ イノベーションが加速</text><text x="205" y="215" text-anchor="middle" fill="#f9a825" font-size="13">成長するほど生産性UP</text><rect x="430" y="30" width="330" height="200" rx="8" fill="#1a1a0d" stroke="#9e9e9e" stroke-width="2"/><text x="595" y="58" text-anchor="middle" fill="#9e9e9e" font-size="14" font-weight="bold">企業（β &lt; 1）</text><text x="450" y="85" fill="#e0e0e0" font-size="12">ヒエラルキーが形成される</text><text x="450" y="108" fill="#e0e0e0" font-size="12">調整コストが急増する</text><text x="450" y="131" fill="#e0e0e0" font-size="12">多様性が組織に抑制される</text><text x="450" y="154" fill="#e0e0e0" font-size="12">官僚主義が創造性を阻害</text><text x="450" y="177" fill="#e0e0e0" font-size="12">→ 生産性が低下</text><text x="595" y="215" text-anchor="middle" fill="#9e9e9e" font-size="13">成長するほど生産性DOWN</text><text x="400" y="268" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Amazonの「2ピザルール」= 企業内に都市的な小集団を再現する試み</text></svg>


---

# まとめ：スケールが変える世界

- **スケーリング則の全体像**
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><rect x="40" y="20" width="170" height="90" rx="8" fill="#0d2137" stroke="#2196f3" stroke-width="2"/><text x="125" y="48" text-anchor="middle" fill="#81d4fa" font-size="12" font-weight="bold">インフラ</text><text x="125" y="68" text-anchor="middle" fill="#aaa" font-size="11">β = 0.85</text><text x="125" y="88" text-anchor="middle" fill="#81d4fa" font-size="11">大都市ほど効率的</text><rect x="230" y="20" width="170" height="90" rx="8" fill="#1a0d2e" stroke="#e91e63" stroke-width="2"/><text x="315" y="48" text-anchor="middle" fill="#f48fb1" font-size="12" font-weight="bold">イノベーション</text><text x="315" y="68" text-anchor="middle" fill="#aaa" font-size="11">β = 1.15</text><text x="315" y="88" text-anchor="middle" fill="#f48fb1" font-size="11">大都市ほど加速</text><rect x="420" y="20" width="170" height="90" rx="8" fill="#1a1a0d" stroke="#ff5722" stroke-width="2"/><text x="505" y="48" text-anchor="middle" fill="#ffab91" font-size="12" font-weight="bold">犯罪・格差</text><text x="505" y="68" text-anchor="middle" fill="#aaa" font-size="11">β = 1.15</text><text x="505" y="88" text-anchor="middle" fill="#ffab91" font-size="11">大都市ほど深刻</text><rect x="610" y="20" width="160" height="90" rx="8" fill="#1a1a1a" stroke="#9e9e9e" stroke-width="2"/><text x="690" y="48" text-anchor="middle" fill="#e0e0e0" font-size="12" font-weight="bold">企業</text><text x="690" y="68" text-anchor="middle" fill="#aaa" font-size="11">β &lt; 1</text><text x="690" y="88" text-anchor="middle" fill="#e0e0e0" font-size="11">大きいほど鈍化</text><rect x="200" y="155" width="400" height="90" rx="8" fill="#0d1a0d" stroke="#f9a825" stroke-width="2"/><text x="400" y="185" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">スケーリング則の示唆</text><text x="400" y="210" text-anchor="middle" fill="#ffe082" font-size="12">都市計画：インフラへの過剰投資を避け</text><text x="400" y="230" text-anchor="middle" fill="#ffe082" font-size="12">人のつながりと多様性を最大化せよ</text><line x1="125" y1="110" x2="300" y2="155" stroke="#555" stroke-width="1"/><line x1="315" y1="110" x2="370" y2="155" stroke="#555" stroke-width="1"/><line x1="505" y1="110" x2="430" y2="155" stroke="#555" stroke-width="1"/><line x1="690" y1="110" x2="500" y2="155" stroke="#555" stroke-width="1"/></svg>
- 「都市は人類が発明した最も効率的な機械だ」— Geoffrey West

