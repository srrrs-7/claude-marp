---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ピザ2枚ルール"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# ピザ2枚ルール

- チームサイズの科学
- 2026-02-20
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><circle cx="250" cy="150" r="110" fill="#f9a825" opacity="0.9"/><circle cx="250" cy="150" r="110" fill="none" stroke="#e91e63" stroke-width="4"/><line x1="145" y1="120" x2="355" y2="120" stroke="#1a1a2e" stroke-width="3"/><line x1="145" y1="150" x2="355" y2="150" stroke="#1a1a2e" stroke-width="3"/><line x1="145" y1="180" x2="355" y2="180" stroke="#1a1a2e" stroke-width="3"/><line x1="250" y1="40" x2="250" y2="260" stroke="#1a1a2e" stroke-width="3"/><circle cx="210" cy="130" r="8" fill="#e91e63"/><circle cx="250" cy="130" r="8" fill="#e91e63"/><circle cx="290" cy="130" r="8" fill="#e91e63"/><circle cx="210" cy="160" r="8" fill="#e91e63"/><circle cx="250" cy="160" r="8" fill="#e91e63"/><circle cx="290" cy="160" r="8" fill="#e91e63"/><text x="250" y="290" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif">ピザ 1枚目</text><circle cx="550" cy="150" r="110" fill="#f9a825" opacity="0.9"/><circle cx="550" cy="150" r="110" fill="none" stroke="#e91e63" stroke-width="4"/><line x1="445" y1="120" x2="655" y2="120" stroke="#1a1a2e" stroke-width="3"/><line x1="445" y1="150" x2="655" y2="150" stroke="#1a1a2e" stroke-width="3"/><line x1="445" y1="180" x2="655" y2="180" stroke="#1a1a2e" stroke-width="3"/><line x1="550" y1="40" x2="550" y2="260" stroke="#1a1a2e" stroke-width="3"/><circle cx="510" cy="130" r="8" fill="#e91e63"/><circle cx="550" cy="130" r="8" fill="#e91e63"/><circle cx="590" cy="130" r="8" fill="#e91e63"/><circle cx="510" cy="160" r="8" fill="#e91e63"/><circle cx="550" cy="160" r="8" fill="#e91e63"/><circle cx="590" cy="160" r="8" fill="#e91e63"/><text x="550" y="290" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif">ピザ 2枚目</text></svg>


---

# 目次

- - 1. ピザ2枚ルールの起源
- - 2. コミュニケーションコストの数学
- - 3. ダンバー数と社会的脳仮説
- - 4. チームサイズの研究結果
- - 5. 組織設計への応用
- - 6. まとめ


---

<!-- _class: lead -->
# 1. ピザ2枚ルール


---

# Jeff Bezosの経験則

- - **「ピザ2枚で食べられる人数がチームの上限」**
- - Jeff Bezos がAmazon創業初期に提唱
- - ピザ2枚 ≈ 6-8人 が理想的なチームサイズ
- - 人数が増えると会議が長く、意思決定が遅く、責任が曖昧に
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e" rx="8"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif" font-weight="bold">チームサイズ比較</text><rect x="40" y="50" width="340" height="110" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="2"/><text x="210" y="72" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">2-Pizza Team (6-8人)</text><circle cx="80" cy="100" r="14" fill="#e91e63"/><circle cx="115" cy="100" r="14" fill="#e91e63"/><circle cx="150" cy="100" r="14" fill="#e91e63"/><circle cx="185" cy="100" r="14" fill="#e91e63"/><circle cx="220" cy="100" r="14" fill="#e91e63"/><circle cx="255" cy="100" r="14" fill="#e91e63"/><circle cx="290" cy="100" r="14" fill="#e91e63"/><text x="80" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">1</text><text x="115" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">2</text><text x="150" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">3</text><text x="185" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">4</text><text x="220" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">5</text><text x="255" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">6</text><text x="290" y="104" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">7</text><text x="210" y="148" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">21 通信線 — 管理可能</text><rect x="420" y="50" width="340" height="110" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="2"/><text x="590" y="72" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif" font-weight="bold">大チーム (15人+)</text><circle cx="460" cy="88" r="10" fill="#555"/><circle cx="485" cy="88" r="10" fill="#555"/><circle cx="510" cy="88" r="10" fill="#555"/><circle cx="535" cy="88" r="10" fill="#555"/><circle cx="560" cy="88" r="10" fill="#555"/><circle cx="585" cy="88" r="10" fill="#555"/><circle cx="610" cy="88" r="10" fill="#555"/><circle cx="635" cy="88" r="10" fill="#555"/><circle cx="660" cy="88" r="10" fill="#555"/><circle cx="685" cy="88" r="10" fill="#555"/><circle cx="460" cy="120" r="10" fill="#555"/><circle cx="485" cy="120" r="10" fill="#555"/><circle cx="510" cy="120" r="10" fill="#555"/><circle cx="535" cy="120" r="10" fill="#555"/><circle cx="560" cy="120" r="10" fill="#555"/><text x="590" y="148" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">105 通信線 — カオス</text></svg>


---

<!-- _class: lead -->
# 2. コミュニケーションコスト


---

# 通信線の爆発的増加

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="18" font-family="sans-serif" font-weight="bold">チームサイズ vs コミュニケーション経路数 n(n-1)/2</text><line x1="70" y1="370" x2="760" y2="370" stroke="#555" stroke-width="2"/><line x1="70" y1="370" x2="70" y2="50" stroke="#555" stroke-width="2"/><text x="415" y="405" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">チーム人数 (n)</text><text x="25" y="210" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,25,210)">通信経路数</text><text x="110" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">2</text><text x="170" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">3</text><text x="230" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">4</text><text x="290" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">5</text><text x="350" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">6</text><text x="410" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">7</text><text x="470" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">8</text><text x="530" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">10</text><text x="590" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">12</text><text x="650" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">15</text><text x="710" y="388" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">20</text><text x="58" y="370" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0</text><text x="58" y="320" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">25</text><text x="58" y="270" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">50</text><text x="58" y="220" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">75</text><text x="58" y="170" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">100</text><text x="58" y="120" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">150</text><text x="58" y="70" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">190</text><polyline points="110,369 170,366 230,358 290,345 350,326 410,302 470,272 530,202 590,122 650,62 710,62" fill="none" stroke="#f9a825" stroke-width="3"/><circle cx="110" cy="369" r="5" fill="#f9a825"/><circle cx="170" cy="366" r="5" fill="#f9a825"/><circle cx="230" cy="358" r="5" fill="#f9a825"/><circle cx="290" cy="345" r="5" fill="#f9a825"/><circle cx="350" cy="326" r="5" fill="#f9a825"/><circle cx="410" cy="302" r="5" fill="#f9a825"/><circle cx="470" cy="272" r="5" fill="#f9a825"/><circle cx="530" cy="202" r="5" fill="#f9a825"/><circle cx="590" cy="122" r="5" fill="#f9a825"/><circle cx="650" cy="62" r="5" fill="#f9a825"/><text x="113" y="360" fill="#aaa" font-size="10" font-family="sans-serif">1</text><text x="173" y="357" fill="#aaa" font-size="10" font-family="sans-serif">3</text><text x="233" y="349" fill="#aaa" font-size="10" font-family="sans-serif">6</text><text x="293" y="336" fill="#aaa" font-size="10" font-family="sans-serif">10</text><text x="353" y="317" fill="#aaa" font-size="10" font-family="sans-serif">15</text><text x="413" y="293" fill="#aaa" font-size="10" font-family="sans-serif">21</text><text x="473" y="263" fill="#aaa" font-size="10" font-family="sans-serif">28</text><text x="533" y="193" fill="#aaa" font-size="10" font-family="sans-serif">45</text><text x="593" y="113" fill="#aaa" font-size="10" font-family="sans-serif">66</text><text x="653" y="53" fill="#aaa" font-size="10" font-family="sans-serif">105</text><line x1="350" y1="50" x2="350" y2="380" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,4"/><text x="352" y="70" fill="#e91e63" font-size="12" font-family="sans-serif">ピザ2枚 ≈ 6人</text><text x="352" y="85" fill="#e91e63" font-size="11" font-family="sans-serif">15通信線</text></svg>


---

# ブルックスの法則

- - **「遅れているプロジェクトに人を追加するとさらに遅れる」**
- - Frederick Brooks (1975) "The Mythical Man-Month"
- - 新メンバーの学習コスト + コミュニケーションコストの増加
- - 人月の神話: 「1人×12ヶ月 ≠ 12人×1ヶ月」
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e" rx="8"/><text x="400" y="24" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">人を追加したとき何が起きるか</text><rect x="30" y="38" width="220" height="120" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="2"/><text x="140" y="60" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif" font-weight="bold">Before: 5人チーム</text><circle cx="75" cy="100" r="14" fill="#4caf50"/><circle cx="110" cy="100" r="14" fill="#4caf50"/><circle cx="145" cy="100" r="14" fill="#4caf50"/><circle cx="180" cy="100" r="14" fill="#4caf50"/><circle cx="215" cy="100" r="14" fill="#4caf50"/><text x="140" y="148" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">10 通信経路</text><rect x="290" y="38" width="220" height="120" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="2"/><text x="400" y="60" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">After: +3人 = 8人チーム</text><circle cx="325" cy="100" r="14" fill="#4caf50"/><circle cx="355" cy="100" r="14" fill="#4caf50"/><circle cx="385" cy="100" r="14" fill="#4caf50"/><circle cx="415" cy="100" r="14" fill="#4caf50"/><circle cx="445" cy="100" r="14" fill="#4caf50"/><circle cx="340" cy="76" r="14" fill="#e91e63"/><circle cx="400" cy="76" r="14" fill="#e91e63"/><circle cx="460" cy="76" r="14" fill="#e91e63"/><text x="400" y="148" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">28 通信経路 (+180%!)</text><rect x="550" y="38" width="220" height="120" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="2"/><text x="660" y="58" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">コスト増加の内訳</text><text x="570" y="80" fill="#ffffff" font-size="11" font-family="sans-serif">学習コスト: 数週間〜数ヶ月</text><text x="570" y="100" fill="#ffffff" font-size="11" font-family="sans-serif">ミーティング増: +60%</text><text x="570" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">コードレビュー増: +80%</text><text x="570" y="140" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">合計: 短期は生産性低下</text></svg>


---

<!-- _class: lead -->
# 3. ダンバー数


---

# 社会的脳仮説

- - **Robin Dunbar (1992)**: 霊長類の脳サイズから社会集団のサイズを予測
- - 人間の新皮質サイズ → 安定的な関係を維持できるのは約 **150人**
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="26" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">ダンバー数の階層構造</text><circle cx="400" cy="130" r="105" fill="none" stroke="#555" stroke-width="2" stroke-dasharray="4,3"/><circle cx="400" cy="130" r="80" fill="none" stroke="#777" stroke-width="2" stroke-dasharray="4,3"/><circle cx="400" cy="130" r="52" fill="none" stroke="#999" stroke-width="2" stroke-dasharray="4,3"/><circle cx="400" cy="130" r="25" fill="#e91e63" opacity="0.85"/><text x="400" y="127" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif" font-weight="bold">~5人</text><text x="400" y="142" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">親友・家族</text><text x="472" y="90" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">~15人</text><text x="472" y="104" fill="#aaa" font-size="10" font-family="sans-serif">信頼できる友人</text><text x="492" y="135" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">~50人</text><text x="492" y="149" fill="#aaa" font-size="10" font-family="sans-serif">社会的知人</text><text x="508" y="175" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">~150人</text><text x="508" y="189" fill="#aaa" font-size="10" font-family="sans-serif">顔と名前が一致</text><text x="60" y="100" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">ピザ2枚ゾーン</text><text x="60" y="116" fill="#e91e63" font-size="12" font-family="sans-serif">6-8人</text><line x1="120" y1="112" x2="375" y2="122" stroke="#e91e63" stroke-width="1.5"/><polygon points="375,118 385,122 375,126" fill="#e91e63"/></svg>


---

# チームサイズへの示唆

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">Dunbar数とチームサイズのスイートスポット</text><line x1="60" y1="300" x2="760" y2="300" stroke="#555" stroke-width="2"/><rect x="60" y="60" width="55" height="240" fill="#e91e63" opacity="0.85" rx="4"/><rect x="155" y="100" width="55" height="200" fill="#f9a825" opacity="0.85" rx="4"/><rect x="250" y="130" width="55" height="170" fill="#f9a825" opacity="0.9" rx="4"/><rect x="345" y="80" width="55" height="220" fill="#4caf50" opacity="0.9" rx="4"/><rect x="440" y="80" width="55" height="220" fill="#4caf50" opacity="0.9" rx="4"/><rect x="535" y="160" width="55" height="140" fill="#2196f3" opacity="0.9" rx="4"/><rect x="630" y="190" width="55" height="110" fill="#2196f3" opacity="0.85" rx="4"/><text x="87" y="52" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif" font-weight="bold">5人</text><text x="182" y="92" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">7人</text><text x="277" y="122" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">15人</text><text x="372" y="72" text-anchor="middle" fill="#4caf50" font-size="13" font-family="sans-serif" font-weight="bold">6人</text><text x="467" y="72" text-anchor="middle" fill="#4caf50" font-size="13" font-family="sans-serif" font-weight="bold">8人</text><text x="562" y="152" text-anchor="middle" fill="#2196f3" font-size="13" font-family="sans-serif" font-weight="bold">50人</text><text x="657" y="182" text-anchor="middle" fill="#2196f3" font-size="13" font-family="sans-serif" font-weight="bold">150人</text><text x="87" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">コア</text><text x="182" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Miller</text><text x="277" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">信頼</text><text x="372" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Pizza</text><text x="467" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Pizza</text><text x="562" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">部門</text><text x="657" y="318" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Dunbar</text><rect x="320" y="40" width="200" height="28" fill="#4caf50" opacity="0.25" rx="4" stroke="#4caf50" stroke-width="1"/><text x="420" y="58" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif" font-weight="bold">スイートスポット: 5〜15人</text></svg>


---

<!-- _class: lead -->
# 4. チームサイズの研究


---

# 最適チームサイズのエビデンス

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">最適チームサイズのエビデンス vs チーム生産性</text><line x1="80" y1="300" x2="740" y2="300" stroke="#555" stroke-width="2"/><line x1="80" y1="300" x2="80" y2="50" stroke="#555" stroke-width="2"/><text x="410" y="330" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">チーム人数</text><text x="30" y="180" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif" transform="rotate(-90,30,180)">相対的生産性</text><text x="120" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">2</text><text x="180" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">4</text><text x="240" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">6</text><text x="300" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">8</text><text x="360" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">10</text><text x="420" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">12</text><text x="480" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">15</text><text x="540" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">20</text><text x="600" y="316" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">25</text><polyline points="120,280 180,230 240,140 300,100 360,120 420,160 480,200 540,240 600,270" fill="none" stroke="#f9a825" stroke-width="3"/><circle cx="120" cy="280" r="5" fill="#f9a825"/><circle cx="180" cy="230" r="5" fill="#f9a825"/><circle cx="240" cy="140" r="5" fill="#4caf50"/><circle cx="300" cy="100" r="7" fill="#e91e63"/><circle cx="360" cy="120" r="5" fill="#4caf50"/><circle cx="420" cy="160" r="5" fill="#f9a825"/><circle cx="480" cy="200" r="5" fill="#f9a825"/><circle cx="540" cy="240" r="5" fill="#f9a825"/><line x1="240" y1="50" x2="360" y2="50" stroke="#4caf50" stroke-width="2" stroke-dasharray="6,4"/><text x="245" y="44" fill="#4caf50" font-size="11" font-family="sans-serif">最適ゾーン 6-8人</text><line x1="240" y1="50" x2="240" y2="300" stroke="#4caf50" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/><line x1="360" y1="50" x2="360" y2="300" stroke="#4caf50" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/><text x="170" y="200" fill="#f9a825" font-size="11" font-family="sans-serif">Google(2015)</text><text x="170" y="215" fill="#aaa" font-size="10" font-family="sans-serif">中央値 6人</text><text x="430" y="130" fill="#f9a825" font-size="11" font-family="sans-serif">Hackman(2002)</text><text x="430" y="145" fill="#aaa" font-size="10" font-family="sans-serif">6人超でロス急増</text></svg>


---

# 大チームの問題

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">大チームの問題: Ringelmann効果と社会的手抜き</text><text x="400" y="52" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">1人あたりの平均努力量 (綱引き実験)</text><line x1="80" y1="280" x2="720" y2="280" stroke="#555" stroke-width="2"/><line x1="80" y1="280" x2="80" y2="60" stroke="#555" stroke-width="2"/><text x="400" y="310" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">チーム人数</text><text x="35" y="175" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif" transform="rotate(-90,35,175)">1人あたり努力(%)</text><text x="140" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">1</text><text x="230" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">2</text><text x="320" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">3</text><text x="410" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">4</text><text x="500" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">6</text><text x="590" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">8</text><text x="680" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">10</text><text x="68" y="80" text-anchor="end" fill="#aaa" font-size="10" font-family="sans-serif">100</text><text x="68" y="120" text-anchor="end" fill="#aaa" font-size="10" font-family="sans-serif">90</text><text x="68" y="160" text-anchor="end" fill="#aaa" font-size="10" font-family="sans-serif">80</text><text x="68" y="200" text-anchor="end" fill="#aaa" font-size="10" font-family="sans-serif">70</text><text x="68" y="240" text-anchor="end" fill="#aaa" font-size="10" font-family="sans-serif">60</text><polyline points="140,80 230,108 320,128 410,148 500,175 590,198 680,218" fill="none" stroke="#e91e63" stroke-width="3"/><circle cx="140" cy="80" r="5" fill="#e91e63"/><circle cx="230" cy="108" r="5" fill="#e91e63"/><circle cx="320" cy="128" r="5" fill="#e91e63"/><circle cx="410" cy="148" r="5" fill="#e91e63"/><circle cx="500" cy="175" r="5" fill="#e91e63"/><circle cx="590" cy="198" r="5" fill="#e91e63"/><circle cx="680" cy="218" r="5" fill="#e91e63"/><text x="140" y="73" text-anchor="middle" fill="#4caf50" font-size="10" font-family="sans-serif">100%</text><text x="230" y="101" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">93%</text><text x="320" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">85%</text><text x="410" y="141" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">77%</text><text x="500" y="168" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">67%</text><text x="590" y="191" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">61%</text><text x="680" y="211" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">56%</text><rect x="450" y="230" width="300" height="40" fill="#16213e" rx="4" stroke="#e91e63" stroke-width="1"/><text x="600" y="248" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">8人で個人比44%の生産性ロス</text><text x="600" y="263" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">社会的手抜き + 責任の分散</text></svg>


---

<!-- _class: lead -->
# 5. 組織設計への応用


---

# 現代の組織設計パターン

- <svg viewBox="0 0 800 370" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="370" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">Amazon 2-Pizza Team アーキテクチャ</text><rect x="30" y="50" width="220" height="290" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="140" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">Tribe A</text><rect x="45" y="84" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#e91e63" stroke-width="1"/><text x="90" y="102" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">Squad 1</text><text x="90" y="117" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">6人 / API-A</text><text x="90" y="132" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="145" y="84" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#e91e63" stroke-width="1"/><text x="190" y="102" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">Squad 2</text><text x="190" y="117" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">7人 / API-B</text><text x="190" y="132" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="45" y="160" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#e91e63" stroke-width="1"/><text x="90" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">Squad 3</text><text x="90" y="193" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">6人 / API-C</text><text x="90" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="145" y="160" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#e91e63" stroke-width="1"/><text x="190" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">Squad 4</text><text x="190" y="193" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">8人 / API-D</text><text x="190" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="290" y="50" width="220" height="290" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="400" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">Tribe B</text><rect x="305" y="84" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#2196f3" stroke-width="1"/><text x="350" y="102" text-anchor="middle" fill="#2196f3" font-size="11" font-family="sans-serif" font-weight="bold">Squad 5</text><text x="350" y="117" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">7人 / API-E</text><text x="350" y="132" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="405" y="84" width="90" height="64" fill="#1a1a2e" rx="4" stroke="#2196f3" stroke-width="1"/><text x="450" y="102" text-anchor="middle" fill="#2196f3" font-size="11" font-family="sans-serif" font-weight="bold">Squad 6</text><text x="450" y="117" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">6人 / API-F</text><text x="450" y="132" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">フルオーナー</text><rect x="550" y="50" width="220" height="290" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="660" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-weight="bold">Platform Tribe</text><rect x="565" y="84" width="190" height="64" fill="#1a1a2e" rx="4" stroke="#4caf50" stroke-width="1"/><text x="660" y="102" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif" font-weight="bold">Platform Team</text><text x="660" y="117" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">8人 / 共通インフラ</text><text x="660" y="132" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">内部APIで提供</text><text x="400" y="300" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">チーム間: API契約のみ / 直接依存なし</text><text x="400" y="320" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif" font-weight="bold">Conway's Law を意図的に活用</text><line x1="250" y1="170" x2="290" y2="170" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/><line x1="510" y1="170" x2="550" y2="170" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/></svg>


---

# スケーリングの戦略

- <svg viewBox="0 0 800 350" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="350" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">スケーリング戦略: チームを増やす、人を増やさない</text><rect x="40" y="50" width="340" height="140" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="210" y="74" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif" font-weight="bold">アンチパターン (人を追加)</text><rect x="55" y="85" width="120" height="40" fill="#e91e63" opacity="0.2" rx="4" stroke="#e91e63" stroke-width="1"/><text x="115" y="110" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">15人チーム</text><text x="210" y="145" fill="#aaa" font-size="11" font-family="sans-serif">105 通信経路</text><text x="210" y="162" fill="#aaa" font-size="11" font-family="sans-serif">意思決定 遅延</text><text x="210" y="178" fill="#e91e63" font-size="11" font-family="sans-serif" font-weight="bold">生産性 低下</text><rect x="420" y="50" width="340" height="260" fill="#16213e" rx="8" stroke="#4caf50" stroke-width="2"/><text x="590" y="74" text-anchor="middle" fill="#4caf50" font-size="13" font-family="sans-serif" font-weight="bold">推奨パターン (チームを追加)</text><rect x="435" y="85" width="95" height="40" fill="#4caf50" opacity="0.2" rx="4" stroke="#4caf50" stroke-width="1"/><text x="482" y="110" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">7人チームA</text><rect x="545" y="85" width="95" height="40" fill="#4caf50" opacity="0.2" rx="4" stroke="#4caf50" stroke-width="1"/><text x="592" y="110" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">7人チームB</text><rect x="655" y="85" width="95" height="40" fill="#4caf50" opacity="0.2" rx="4" stroke="#4caf50" stroke-width="1"/><text x="702" y="110" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">6人チームC</text><text x="590" y="152" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">各21通信経路 × 3チーム</text><text x="590" y="172" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">チーム間: APIで疎結合</text><text x="590" y="195" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif" font-weight="bold">原則:</text><text x="590" y="215" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">明確なオーナーシップ</text><text x="590" y="233" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">低い結合度</text><text x="590" y="251" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">高い凝集度</text><text x="590" y="292" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif" font-weight="bold">生産性を維持したままスケール</text><line x1="380" y1="175" x2="420" y2="175" stroke="#555" stroke-width="2"/><polygon points="415,170 425,175 415,180" fill="#4caf50"/></svg>
- - **API as team boundary**: チーム間の契約をAPIとして定義
- - 組織が大きくなってもチームは小さく保つ


---

# まとめ

- - ピザ2枚ルール(6-8人)は科学的にも妥当なチームサイズ
- - コミュニケーションライン n(n-1)/2 の爆発が根本原因
- - ダンバー数: 親密な協力関係は ~5-15人が限界
- - 大チームの問題: 社会的手抜き、責任の分散、意思決定の遅延
- - 対策: 小さなチーム × 明確なオーナーシップ × 低結合度
- - **人を増やすな、チームを増やせ**


---

# 参考文献

- - **書籍:**
- - Brooks, F. "The Mythical Man-Month" (1975)
- - Hackman, J.R. "Leading Teams" (2002)
- - **研究:**
- - Dunbar, R. (1992) "Neocortex size as a constraint"
- - Skelton & Pais "Team Topologies" (2019)

