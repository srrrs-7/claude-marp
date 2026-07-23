---
marp: true
theme: default
size: 16:9
paginate: true
footer: "2026-07-23 | Trend Research"
style: |
  /* ── Slide layout ─────────────────────────────────────────
       The slide is a fixed 1280x720 box, so its blocks are laid out as a flex
       column: text keeps its natural height and diagrams absorb whatever space
       is left over. Without this a diagram sizes itself from its aspect ratio
       alone and pushes the bullets off the bottom of the slide.
       This also activates Gaia's own `section.lead` centering, which is dead
       while the section is display:block. */
    section {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    section > * { flex: 0 0 auto; min-width: 0; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Auto-fit ─────────────────────────────────────────────
       Applied per slide by estimateFit() when the text would otherwise be
       clipped. Text cannot shrink itself the way a diagram can. */
    section.fit-94 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.94); }
    section.fit-88 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.88); }
    section.fit-82 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.82); }
    section.fit-76 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.76); }
    section.fit-70 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.7); }
    section.fit-64 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.64); }
    section.fit-58 { font-size: calc(var(--marpit-root-font-size, 1em) * 0.58); }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.5;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Figures (inline SVG + standalone images) ─────────────
       `vh` is deliberately not used anywhere here. Marp scales the slide with a
       CSS transform, so vh resolves against the browser window rather than the
       slide — on a tall window `max-height:70vh` exceeds the whole slide and
       caps nothing. These blocks are bounded by flex layout instead. */
    section > .fig,
    section > p:has(> img) {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.2em 0;
    }
    /* The SVG fills the wrapper; preserveAspectRatio letterboxes the drawing
       inside it, so it scales down instead of overflowing. */
    section > .fig > svg {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
    /* `!important` overrides the inline width Marp emits for `![w:800]`. */
    section > p:has(> img) > img {
      max-height: 100% !important;
      max-width: 100% !important;
      object-fit: contain;
      height: auto;
      width: auto;
    }
    /* Fallback for images/SVGs that are not a direct child of the section
       (hand-written markdown, table cells): keep them inside the slide. */
    section img, section svg { max-width: 100%; }
  
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
  
---

<!-- _class: lead -->
# 日経7万円は1999年の再来か

> *シラーPE 42時代のバブル論争を数字で検証する*

- 2026年7月23日時点のバリュエーションと収益を照合
- 「弾ける／弾けない」の二択でなく評価軸を提示

<!--
本デッキの狙いは、バブルか否かを断定することではなく、投資家が自分で判断するための評価軸を示すこと。日経平均は2026年6月22日に72,831.73円の年初来高値を記録した局面を出発点とする。
-->

---

<!-- _class: fit-88 -->
# 「弾ける／弾けない」の二択は問いを間違えている

> *バリュエーションはドットコム期並みだが、収益の実在性が当時と決定的に違う*

- 指標面: シラーPE 42.32、バフェット指標237%はドットコム極値圏
- 実態面: AIリーダー企業は実収益とキャッシュフローを伴う
- 結論: 単一の二択でなく2つの評価軸で見るべき局面

<!--
BLUF。バブル論争は『バリュエーション指標は高い』派と『AI企業は質的に異なる』派の対立であり、どちらか一方が正しいという構図ではない。この2軸を最後まで両論併記で扱う。
-->

---

<!-- _class: lead -->
# 第1部　いま市場で何が起きているか

- 日経平均とS&P500が同時に史上最高値圏へ

<!--
まず現状認識。日米の株価が揃って最高値を更新した2026年前半の状況を数字で押さえる。
-->

---

# 日経平均は6万円から7万円を2ヶ月弱で駆け上がった

> *2026年6月22日に年初来高値72,831.73円、大和証券は年末8万円を予想*

<div class="fig">
<svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="70" x2="120" y2="380" stroke="#94a3b8" stroke-width="2"/>
<line x1="120" y1="380" x2="860" y2="380" stroke="#94a3b8" stroke-width="2"/>
<text x="70" y="120" font-size="22" fill="#475569">8万円</text>
<text x="70" y="200" font-size="22" fill="#475569">7万円</text>
<text x="70" y="330" font-size="22" fill="#475569">6万円</text>
<polyline points="180,320 400,300 620,190 780,150" fill="none" stroke="#2563eb" stroke-width="5" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.2))"/>
<circle cx="180" cy="320" r="8" fill="#2563eb"/>
<circle cx="620" cy="190" r="9" fill="#dc2626"/>
<text x="150" y="360" font-size="20" fill="#475569">4月</text>
<text x="560" y="175" font-size="22" fill="#dc2626" font-weight="bold">72,831.73円</text>
<text x="560" y="150" font-size="18" fill="#dc2626">6/22 年初来高値</text>
<text x="720" y="135" font-size="18" fill="#16a34a">年末8万円予想</text>
</svg>
</div>

- AIブームが日本株を押し上げたとAl Jazeeraも報道（6/3時点）

<!--
60,000円から70,000円到達まで2か月弱という急騰。年初来高値は6月22日の72,831.73円。大和証券は年末8万円の新予想を出している。数値の時点を必ず口頭でも明示すること。
-->

---

# 米国株も時価総額69兆ドルで史上最高値圏に膨らんだ

> *S&P500の時価総額は2026年6月2日時点で69兆ドル超、年初来10%超の上昇*

<div class="fig">
<svg viewBox="0 0 960 430" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="140" y="90" width="300" height="240" rx="10" fill="#1d4ed8" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="290" y="200" font-size="46" fill="#ffffff" text-anchor="middle" font-weight="bold">69兆ドル</text>
<text x="290" y="250" font-size="22" fill="#dbeafe" text-anchor="middle">S&#38;P500 時価総額合計</text>
<text x="290" y="70" font-size="20" fill="#475569" text-anchor="middle">2026/6/2 時点</text>
<rect x="540" y="150" width="280" height="180" rx="10" fill="#0e7490" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="680" y="235" font-size="40" fill="#ffffff" text-anchor="middle" font-weight="bold">+10%超</text>
<text x="680" y="285" font-size="22" fill="#cffafe" text-anchor="middle">年初来上昇率</text>
</svg>
</div>

- この膨張がバブル論争の起点になっている

<!--
S&P500の時価総額合計は2026年6月2日時点で69兆ドルを超え、年初来10%超の上昇。この規模の膨張がバリュエーション過熱の議論を呼んでいる。
-->

---

<!-- _class: lead -->
# 第2部　バブル派の論拠

- バリュエーション指標はドットコム期の極値に迫る

<!--
ここからバブル警戒派の主張を整理する。争点は主にバリュエーション指標の高さと市場の集中度。
-->

---

# シラーPE 42・バフェット指標237%はドットコム極値圏にある

> *2つの代表的な割高指標がそろって歴史的高水準を示している*

<div class="fig">
<svg viewBox="0 0 960 430" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="90" y="110" width="350" height="220" rx="14" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="265" y="180" font-size="58" fill="#dc2626" text-anchor="middle" font-weight="bold">42.32</text>
<text x="265" y="230" font-size="24" fill="#7f1d1d" text-anchor="middle">シラーPER（CAPE）</text>
<text x="265" y="280" font-size="19" fill="#991b1b" text-anchor="middle">長期平均を大きく上回る</text>
<rect x="520" y="110" width="350" height="220" rx="14" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
<text x="695" y="180" font-size="58" fill="#ea580c" text-anchor="middle" font-weight="bold">237%</text>
<text x="695" y="230" font-size="24" fill="#7c2d12" text-anchor="middle">バフェット指標</text>
<text x="695" y="280" font-size="19" fill="#9a3412" text-anchor="middle">時価総額÷GDP</text>
</svg>
</div>

- いずれもドットコムバブル期の極値に近い水準

<!--
シラーPERは42.32、バフェット指標は237%。いずれもドットコムバブル期の極値に近い水準で、割高派の最大の根拠になっている。
-->

---

# 上位10銘柄への集中がドットコム期のピークを超えた

> *S&P500の35%を上位10銘柄が占め、Mag7だけで指数の約1/3に達する*

<div class="fig">
<svg viewBox="0 0 960 430" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="200" y1="360" x2="880" y2="360" stroke="#94a3b8" stroke-width="2"/>
<rect x="280" y="200" width="120" height="160" fill="#94a3b8"/>
<text x="340" y="180" font-size="34" fill="#475569" text-anchor="middle" font-weight="bold">25%</text>
<text x="340" y="395" font-size="20" fill="#475569" text-anchor="middle">1999年ピーク</text>
<rect x="560" y="130" width="120" height="230" fill="#dc2626" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="620" y="110" font-size="34" fill="#dc2626" text-anchor="middle" font-weight="bold">35%</text>
<text x="620" y="395" font-size="20" fill="#dc2626" text-anchor="middle">2026年（現在）</text>
<text x="480" y="60" font-size="22" fill="#334155" text-anchor="middle">上位10銘柄が指数に占める割合</text>
</svg>
</div>

- NVIDIA単体の時価総額は5.3兆ドルに膨張

<!--
上位10銘柄がS&P500の35%を占め、ドットコムバブル期ピークの25%を上回る集中度。マグニフィセント7で指数の約1/3、NVIDIA単体で5.3兆ドル。少数銘柄への依存度の高さが下落時のリスクとして指摘される。
-->

---

<!-- _class: fit-94 -->
# Fortuneは「2026年は1999年に似てきている」と警告する

> *バブル警戒派は過熱感の質的な類似性を指摘している*

- Fortune誌が2026年6月に類似性への懸念を報じた
- 急騰・高バリュエーション・IPO活況という共通パターン
- 少数のテック銘柄が指数全体を牽引する構図も当時と重なる
- 警戒派の主眼は「調整が来たときの振れ幅の大きさ」

<!--
Fortune誌が2026年6月8日に『AIブームと1999年の類似』を報じた。警戒派の論点は、少数銘柄集中と高バリュエーションが重なると、調整局面での下落幅が大きくなりやすいという点にある。
-->

---

<!-- _class: lead -->
# 第3部　強気派の論拠

- 当時と違い、収益とキャッシュフローが実在する

<!--
次に強気派の主張。核心は『AIは本物』——ドットコム期の赤字先行企業と違い、今回のリーダーは実利益を出している点。
-->

---

<!-- _class: fit-94 -->
# 強気派は「AIは本物で、実収益を伴う」と主張する

> *ヤルデニ氏はバブルを否定し、年末のS&P500目標を8,250に設定*

<div class="fig">
<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="140" y1="80" x2="140" y2="330" stroke="#94a3b8" stroke-width="2"/>
<line x1="140" y1="330" x2="860" y2="330" stroke="#94a3b8" stroke-width="2"/>
<polyline points="200,290 420,250 620,180 780,110" fill="none" stroke="#059669" stroke-width="5" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.2))"/>
<polygon points="780,110 760,120 768,98" fill="#059669"/>
<circle cx="780" cy="110" r="9" fill="#059669"/>
<text x="630" y="95" font-size="30" fill="#047857" font-weight="bold">目標 8,250</text>
<text x="170" y="310" font-size="20" fill="#475569">現在水準</text>
<text x="200" y="65" font-size="22" fill="#334155">ヤルデニ氏の年末S&#38;P500目標</text>
</svg>
</div>

- 「AIはバブルではなく本物」——赤字先行だった当時と収益構造が違う

<!--
強気派の代表例エド・ヤルデニ氏は『AIはバブルではなく本物』とし、年末S&P500目標を8,250に設定。ドットコム期の赤字企業と異なり、今回のリーダーはキャッシュフローと収益成長を伴うと主張する。
-->

---

# TSMCの純利益+77%が示すのはバブルではなく実需だ

> *2026年Q2は粗利率67.7%の過去最高、設備投資も上方修正*

<div class="fig">
<svg viewBox="0 0 960 430" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="70" y="130" width="260" height="200" rx="12" fill="#065f46" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="200" y="215" font-size="46" fill="#ffffff" text-anchor="middle" font-weight="bold">+77%</text>
<text x="200" y="265" font-size="21" fill="#d1fae5" text-anchor="middle">純利益 前年比</text>
<rect x="350" y="130" width="260" height="200" rx="12" fill="#0e7490" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="480" y="215" font-size="46" fill="#ffffff" text-anchor="middle" font-weight="bold">67.7%</text>
<text x="480" y="265" font-size="21" fill="#cffafe" text-anchor="middle">粗利率（過去最高）</text>
<rect x="630" y="130" width="260" height="200" rx="12" fill="#1d4ed8" style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.18))"/>
<text x="760" y="210" font-size="38" fill="#ffffff" text-anchor="middle" font-weight="bold">$60-64B</text>
<text x="760" y="265" font-size="21" fill="#dbeafe" text-anchor="middle">2026年 設備投資</text>
<text x="480" y="90" font-size="22" fill="#334155" text-anchor="middle">TSMC 2026年Q2決算</text>
</svg>
</div>

<!--
TSMCの2026年Q2決算は純利益前年比+77%、粗利率67.7%の過去最高。設備投資ガイダンスも$52-56Bから$60-64Bへ上方修正。AI向け需要が実際の企業業績として計上されている点が、ドットコム期との最大の違いだと強気派は見る。
-->

---

<!-- _class: fit-94 -->
# 1999年と2026年は株価指標が似て、収益構造が異なる

> *同じ割高でも「中身」が違う——これがバブル論争の分岐点*

| 論点 | 1999年ドットコム期 | 2026年AIブーム |
| --- | --- | --- |
| バリュエーション | 極端に割高 | シラーPE 42・指標237% |
| 上位10銘柄集中度 | 約25% | 約35% |
| リーダー企業の収益 | 赤字先行が多数 | 実利益・キャッシュフロー |
| 象徴的な材料 | ネット普及期待 | TSMC純利益+77%など実需 |
| 主な弱点 | 収益の裏付け不足 | 少数銘柄への過度な集中 |

<!--
必須の比較表。バリュエーション指標と集中度は当時と同等かそれ以上に高いが、リーダー企業の収益構造が『赤字先行』から『実利益』へ変わっている。ここが両論の分岐点であり、断定を避けるべき理由でもある。
-->

---

<!-- _class: lead -->
# 第4部　それでも相場は神経質だ

- 好決算でも売られ、金利と地政学が上値を抑える

<!--
強気材料がある一方で、市場は極めて神経質。好決算への逆説的反応と、金利・地政学リスクを見ていく。
-->

---

# 好決算でも半導体株が売られる神経質さが表面化している

> *TSMCの好決算＋設備投資増額の当日、NVIDIA株は2.2%下落した*

<div class="fig">
<svg viewBox="0 0 960 420" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="90" x2="120" y2="340" stroke="#94a3b8" stroke-width="2"/>
<line x1="120" y1="215" x2="860" y2="215" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
<polyline points="160,150 340,140 520,175 700,290 800,300" fill="none" stroke="#dc2626" stroke-width="5" style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.2))"/>
<circle cx="520" cy="175" r="8" fill="#16a34a"/>
<text x="380" y="150" font-size="19" fill="#16a34a">TSMC好決算・設備投資増額</text>
<text x="620" y="330" font-size="30" fill="#dc2626" font-weight="bold">NVIDIA −2.2%</text>
<text x="140" y="370" font-size="18" fill="#475569">決算発表当日の値動きイメージ</text>
</svg>
</div>

- 設備投資増額が将来の利益率圧迫懸念として織り込まれた

<!--
TSMCの好決算と設備投資上方修正を受けて、AI半導体株が軟調化しNVIDIAも同日2.2%下落。『好決算なのに売られる』のは、設備投資増＝将来の利益率圧迫を市場が先回りで織り込んだ結果という解釈が一般的。相場の神経質さの象徴。
-->

---

# 金利の利上げ転換と中東リスクが株価の上値を抑えている

> *FOMCは年内利上げ予想へ転換、UBSは中東リスクで目標を引き下げた*

<div class="fig">
<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="70" y="120" width="250" height="190" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="195" y="185" font-size="28" fill="#b91c1c" text-anchor="middle" font-weight="bold">利上げ転換</text>
<text x="195" y="230" font-size="19" fill="#334155" text-anchor="middle">年末金利見通し3.8%</text>
<text x="195" y="260" font-size="19" fill="#334155" text-anchor="middle">5月CPI 4.2%</text>
<rect x="355" y="120" width="250" height="190" rx="12" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
<text x="480" y="185" font-size="28" fill="#c2410c" text-anchor="middle" font-weight="bold">中東リスク</text>
<text x="480" y="230" font-size="19" fill="#334155" text-anchor="middle">UBSがS&#38;P500</text>
<text x="480" y="260" font-size="19" fill="#334155" text-anchor="middle">目標を引き下げ</text>
<rect x="640" y="120" width="250" height="190" rx="12" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
<text x="765" y="185" font-size="28" fill="#a16207" text-anchor="middle" font-weight="bold">金の上昇</text>
<text x="765" y="230" font-size="19" fill="#334155" text-anchor="middle">7/22に4,150ドル</text>
<text x="765" y="260" font-size="19" fill="#334155" text-anchor="middle">安全資産需要</text>
<text x="480" y="80" font-size="22" fill="#334155" text-anchor="middle">株価の上値を抑える3つの逆風</text>
</svg>
</div>

<!--
FOMCの中心的見通しは3月の『年内1回利下げ』から6月の『年内1回利上げ』へ転換し、2026年末の政策金利見通しは3.8%。5月CPIは前年比4.2%と高止まり。UBSは中東紛争を理由にS&P500目標を引き下げ、金は7月22日に4,150ドルへ。金利・地政学の逆風が同居している。
-->

---

<!-- _class: lead -->
# 第5部　では何を見るべきか

- 断定でなく、個人と企業それぞれの点検軸を持つ

<!--
結論部。バブルか否かを当てにいくのではなく、継続的に点検すべき指標を個人・企業それぞれに提示する。
-->

---

# 個人が見るべきは価格でなく「収益の裏付け」の3指標だ

> *指標の高さ単独でなく、収益との整合を継続点検する*

<div class="fig">
<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="120" width="270" height="180" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="195" y="175" font-size="26" fill="#1d4ed8" text-anchor="middle" font-weight="bold">集中度</text>
<text x="195" y="220" font-size="19" fill="#334155" text-anchor="middle">上位銘柄への</text>
<text x="195" y="248" font-size="19" fill="#334155" text-anchor="middle">偏りが拡大か</text>
<rect x="345" y="120" width="270" height="180" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="480" y="175" font-size="26" fill="#047857" text-anchor="middle" font-weight="bold">実収益</text>
<text x="480" y="220" font-size="19" fill="#334155" text-anchor="middle">利益成長が株価に</text>
<text x="480" y="248" font-size="19" fill="#334155" text-anchor="middle">追いついているか</text>
<rect x="630" y="120" width="270" height="180" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="765" y="175" font-size="26" fill="#b91c1c" text-anchor="middle" font-weight="bold">金利・地政学</text>
<text x="765" y="220" font-size="19" fill="#334155" text-anchor="middle">利上げと中東が</text>
<text x="765" y="248" font-size="19" fill="#334155" text-anchor="middle">逆風に転じるか</text>
<text x="480" y="80" font-size="22" fill="#334155" text-anchor="middle">継続点検する3つの軸</text>
</svg>
</div>

<!--
個人投資家への提案。①上位銘柄への集中度が拡大しているか、②利益成長が株価上昇に追いついているか、③金利と地政学が逆風に転じるか。価格の高低でなく、収益との整合と外部リスクを継続点検する。
-->

---

<!-- _class: fit-94 -->
# 企業は「実需の持続性」と「投資の回収可能性」を問うべきだ

> *AI設備投資が実際の需要に見合うかを社内で検証する*

- 受注残・稼働率など実需を示すデータで需要の持続性を確認
- 設備投資の回収期間と粗利率への影響を保守的に見積もる
- 少数の大口顧客・単一サプライヤーへの依存度を点検
- 金利上昇局面での資金調達コストをシナリオに織り込む

<!--
企業側の点検軸。TSMCの設備投資増額が短期の利益率希薄化を招いたように、投資と回収のバランスが問われる。実需データ・回収期間・依存度・金利感応度を保守的に検証すべき。
-->

---

# 問うべきは「バブルか否か」でなく「収益が価格を支えるか」だ

> *指標はドットコム期並みでも、収益の実在性という評価軸を併せ持つ*

<div class="fig">
<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="90" y="150" width="300" height="140" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="240" y="210" font-size="25" fill="#b91c1c" text-anchor="middle" font-weight="bold">バリュエーション</text>
<text x="240" y="250" font-size="20" fill="#334155" text-anchor="middle">1999年並みに高い</text>
<rect x="570" y="150" width="300" height="140" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="720" y="210" font-size="25" fill="#047857" text-anchor="middle" font-weight="bold">収益の実在性</text>
<text x="720" y="250" font-size="20" fill="#334155" text-anchor="middle">当時と決定的に違う</text>
<line x1="390" y1="220" x2="560" y2="220" stroke="#475569" stroke-width="3"/>
<polygon points="570,220 548,210 548,230" fill="#475569"/>
<polygon points="390,220 412,210 412,230" fill="#475569"/>
<text x="480" y="110" font-size="23" fill="#334155" text-anchor="middle" font-weight="bold">2つの評価軸で見る</text>
<text x="480" y="330" font-size="20" fill="#475569" text-anchor="middle">収益が価格を支え続けるかを継続点検する</text>
</svg>
</div>

<!--
まとめ。バリュエーション指標と収益の実在性という2軸で見れば、単純な『再来』でも『別物』でもない。二択を避け、収益が価格を支え続けるかを点検し続けることが投資家・企業双方の指針になる。
-->

---

<!-- _class: fit-70 -->
# 参照資料

> *株価・バリュエーション指標の数値の裏付けとなる主要出典*

- [TradingKey: S&P500 valuation bubble・集中度・Shiller PE・Buffett指標](https://www.tradingkey.com/analysis/stocks/us-stocks/261950917-sp500-valuation-bubble-ai-concentration-shiller-pe-buffett-indicator-fed-hawkish-yield-market-nifty-fifty-strategy-tradingkey)
- [247wallst.com: ヤルデニ「AIは本物」S&P500目標8,250](https://247wallst.com/investing/2026/07/07/yardeni-ai-is-the-real-deal-not-a-bubble-targets-sp-500-at-8250-by-year-end/)
- [Fortune: 2026年は1999年に似てきている（2026/6/8）](https://fortune.com/2026/06/08/ai-boom-tech-stocks-bubble-fears-earnings-growth-chipmakers-ipo/)
- [日経新聞: 日経平均7万円・大和証券8万円予想](https://www.nikkei.com/article/DGXZQOUB191SI0Z10C26A6000000/)
- [Al Jazeera: Japan's stock market hits new record（2026/6/3）](https://www.aljazeera.com/economy/2026/6/3/japans-stock-market-hits-new-record-as-ai-boom-gathers-steam)
- [TrendForce: TSMC 2026年Q2決算・設備投資$60-64B](https://www.trendforce.com/news/2026/07/16/news-tsmc-lifts-2026-capex-15-to-60-64b-hikes-sales-outlook-to-over-40-despite-q3-margin-dip/)
- [ABC News: AI chip stock selloff（NVIDIA −2.2%）](https://abcnews.com/Business/ai-chip-stock-selloff/story?id=134844421)

<!--
出典一覧。数値はすべてこれらの調査ソースに基づく。FOMC・UBS・金価格の出典は経済調査ノートを参照。
-->
