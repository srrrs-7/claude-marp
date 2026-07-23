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
# 利下げのはずが利上げ

> *FOMCの前提が半年で180度反転した理由*

- 2026年3月から6月にかけて、FOMCの中心見通しは反転した
- 前提が変わった世界で、意思決定はどう組み立て直されたのか
- Trend Research | 2026-07-23

<!--
本デッキは金融政策の意思決定プロセスと時系列に焦点を当てる。AIバブルや半導体の話題には踏み込まず、FOMCが半年で見通しを反転させた理由を追う。全数値は2026年7月23日時点の調査ノートに基づく。
-->

---

<!-- _class: fit-88 -->
# FOMCの中心見通しは半年で「利下げ」から「利上げ」へ反転した

> *3月「年内1回利下げ」→6月「年内1回利上げ」。2026年末の政策金利見通しは3.8%へ上方修正された*

- 政策金利は3.5〜3.75%で4会合連続据え置き
- 反転の主因はインフレの高止まり（5月CPI +4.2%）
- 関税・議長交代・議事録が前提の書き換えを後押しした
- 問い: 前提が変わった世界で意思決定をどう立て直すか

<!--
これがBLUF。半年での見通し反転という結論を最初に置く。以降のスライドで、なぜ反転したのか（インフレ・関税・雇用）、誰が決めているのか（議長交代・議事録）、どこへ波及するのか（為替・日銀・株式）を証拠で裏づける。
-->

---

<!-- _class: lead -->
# 何が反転したのか

- 3月と6月の中心見通しを並べて見る

<!--
第1章。まず事実として、FOMC参加者の中心的見通しが3月から6月にかけてどう変わったかを確認する。
-->

---

# 同じ委員会が3か月で利下げ予想を利上げ予想に書き換えた

> *2026年末の政策金利見通しは3月時点から6月時点で0.3ポイント引き上げられた*

<div class="fig">
<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="40" y="70" width="340" height="250" rx="14" fill="#eef2f7" stroke="#9aa7b8" stroke-width="2" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.12))"/>
<text x="210" y="115" text-anchor="middle" font-size="28" font-weight="700" fill="#334155">2026年 3月</text>
<text x="210" y="185" text-anchor="middle" font-size="34" font-weight="700" fill="#2563a8">年内1回 利下げ</text>
<text x="210" y="245" text-anchor="middle" font-size="24" fill="#475569">年末金利見通し 約3.5%</text>
<text x="210" y="290" text-anchor="middle" font-size="24" fill="#475569">失業率見通し 4.4%</text>
<polygon points="420,175 500,175 500,150 560,195 500,240 500,215 420,215" fill="#c0392b" style="filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2))"/>
<rect x="580" y="70" width="340" height="250" rx="14" fill="#fdecea" stroke="#c0392b" stroke-width="2" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.12))"/>
<text x="750" y="115" text-anchor="middle" font-size="28" font-weight="700" fill="#334155">2026年 6月</text>
<text x="750" y="185" text-anchor="middle" font-size="34" font-weight="700" fill="#c0392b">年内1回 利上げ</text>
<text x="750" y="245" text-anchor="middle" font-size="24" fill="#475569">年末金利見通し 3.8%</text>
<text x="750" y="290" text-anchor="middle" font-size="24" fill="#475569">失業率見通し 4.3%</text>
</svg>
</div>

<!--
3月の中心見通しは年内1回の利下げ、2026年末見通しはおよそ3.5%だった。6月にはこれが年内1回の利上げ、年末見通し3.8%へ上方修正された。失業率見通しも4.4%から4.3%へ小幅下方修正され、労働市場の弱さを理由にした利下げ論拠が後退した。
-->

---

# 動かなかったのは金利そのものだった — 4会合連続で据え置き

> *政策金利は3.5〜3.75%のまま。動いたのは金利ではなく「次にどちらへ動くか」の見通しだった*

<div class="fig">
<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="90" y1="300" x2="900" y2="300" stroke="#94a3b8" stroke-width="2"/>
<line x1="90" y1="120" x2="900" y2="120" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6 6"/>
<text x="90" y="105" font-size="22" fill="#64748b">政策金利 3.5〜3.75%（据え置きレンジ）</text>
<rect x="140" y="120" width="70" height="180" fill="#93b4d6"/>
<rect x="320" y="120" width="70" height="180" fill="#93b4d6"/>
<rect x="500" y="120" width="70" height="180" fill="#93b4d6"/>
<rect x="680" y="120" width="70" height="180" fill="#2563a8"/>
<text x="175" y="330" text-anchor="middle" font-size="22" fill="#475569">会合 1</text>
<text x="355" y="330" text-anchor="middle" font-size="22" fill="#475569">会合 2</text>
<text x="535" y="330" text-anchor="middle" font-size="22" fill="#475569">会合 3</text>
<text x="715" y="330" text-anchor="middle" font-size="22" fill="#475569">6月 会合</text>
<text x="175" y="360" text-anchor="middle" font-size="20" fill="#64748b">据え置き</text>
<text x="355" y="360" text-anchor="middle" font-size="20" fill="#64748b">据え置き</text>
<text x="535" y="360" text-anchor="middle" font-size="20" fill="#64748b">据え置き</text>
<text x="715" y="360" text-anchor="middle" font-size="20" fill="#64748b">据え置き</text>
</svg>
</div>

<!--
2026年6月FOMCは4会合連続で政策金利を3.5〜3.75%に据え置いた。表面上は「何も起きていない」会合だが、実際に反転したのはドットプロットが示す先行きの方向感だった。据え置きの裏で市場の織り込みが利下げ期待から利上げ警戒へ切り替わった点が重要。
-->

---

<!-- _class: lead -->
# なぜ前提が崩れたのか

- インフレ・関税・雇用の3つの力

<!--
第2章。見通しを反転させた3つの要因を順に見る。中心はインフレの高止まりで、その一因が関税、そして反転を思いとどまらせなかったのが軟化しきらない雇用だった。
-->

---

# 5月のCPIは目標の倍を超え、利下げの前提を吹き飛ばした

> *前年同月比+4.2%は2%目標の2倍以上。物価が沈まない限り利下げの正当化は難しい*

<div class="fig">
<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="320" x2="860" y2="320" stroke="#94a3b8" stroke-width="2"/>
<rect x="220" y="250" width="140" height="70" fill="#8bc7a3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="290" y="235" text-anchor="middle" font-size="30" font-weight="700" fill="#2f855a">2.0%</text>
<text x="290" y="355" text-anchor="middle" font-size="24" fill="#475569">FRBの目標</text>
<rect x="600" y="105" width="140" height="215" fill="#c0392b" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="670" y="90" text-anchor="middle" font-size="32" font-weight="700" fill="#c0392b">4.2%</text>
<text x="670" y="355" text-anchor="middle" font-size="24" fill="#475569">5月CPI（前年比）</text>
<text x="480" y="170" text-anchor="middle" font-size="22" fill="#64748b">目標の</text>
<text x="480" y="200" text-anchor="middle" font-size="28" font-weight="700" fill="#334155">2倍超</text>
</svg>
</div>

<!--
5月のCPIは前年同月比プラス4.2%と、FRBが掲げる2%目標の2倍を超えた。インフレがここまで高いと、労働市場を理由にした予防的な利下げは正当化しにくい。これが「利下げ予想の撤回」を促した最大の要因である。
-->

---

# 関税が家計に上乗せされ、物価の高止まりを支えている

> *通商法122条の10%課徴金は世帯当たり平均約1,500ドルの負担増。1993年以来最大のGDP比増税*

<div class="fig">
<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="120" width="180" height="120" rx="12" fill="#eef2f7" stroke="#9aa7b8" stroke-width="2"/>
<text x="150" y="175" text-anchor="middle" font-size="40" font-weight="700" fill="#2563a8">10%</text>
<text x="150" y="215" text-anchor="middle" font-size="21" fill="#475569">ほぼ全輸入品</text>
<polygon points="270,160 340,160 340,140 400,180 340,220 340,200 270,200" fill="#c0392b"/>
<rect x="420" y="120" width="180" height="120" rx="12" fill="#fdecea" stroke="#c0392b" stroke-width="2"/>
<text x="510" y="175" text-anchor="middle" font-size="40" font-weight="700" fill="#c0392b">15%</text>
<text x="510" y="215" text-anchor="middle" font-size="21" fill="#475569">引き上げ方針</text>
<rect x="650" y="110" width="250" height="140" rx="12" fill="#fff7ed" stroke="#d97706" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="775" y="155" text-anchor="middle" font-size="22" fill="#475569">世帯あたり平均</text>
<text x="775" y="200" text-anchor="middle" font-size="36" font-weight="700" fill="#d97706">+約$1,500</text>
<text x="480" y="310" text-anchor="middle" font-size="22" fill="#64748b">通商法122条（2026年2月24日発効）｜1993年以来最大のGDP比増税</text>
</svg>
</div>

<!--
IEEPA関税の代替として発動された通商法122条の課徴金は、ほぼ全輸入品に10%を課し、15%への引き上げ方針も示された。これは1993年以来最大のGDP比税負担増で、1世帯あたり平均およそ1,500ドルの負担増となる。関税は輸入価格を通じて物価に転嫁され、インフレ高止まりの一因となっている。
-->

---

# 最高裁がIEEPA関税を無効にしても、関税インフレは消えなかった

> *同日に通商法122条へ切り替え。手段は変わっても物価への上乗せ圧力は続いた*

<div class="fig">
<svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="80" y1="110" x2="880" y2="110" stroke="#cbd5e1" stroke-width="3"/>
<circle cx="200" cy="110" r="14" fill="#2563a8"/>
<circle cx="500" cy="110" r="14" fill="#c0392b"/>
<circle cx="780" cy="110" r="14" fill="#c0392b"/>
<text x="200" y="75" text-anchor="middle" font-size="22" font-weight="700" fill="#334155">2月20日</text>
<text x="200" y="170" text-anchor="middle" font-size="21" fill="#475569">最高裁6対3で</text>
<text x="200" y="198" text-anchor="middle" font-size="21" fill="#475569">IEEPA関税を無効</text>
<text x="500" y="75" text-anchor="middle" font-size="22" font-weight="700" fill="#334155">2月24日</text>
<text x="500" y="170" text-anchor="middle" font-size="21" fill="#475569">通商法122条で</text>
<text x="500" y="198" text-anchor="middle" font-size="21" fill="#475569">10%課徴金を発効</text>
<text x="780" y="75" text-anchor="middle" font-size="22" font-weight="700" fill="#334155">その後</text>
<text x="780" y="170" text-anchor="middle" font-size="21" fill="#475569">15%へ引き上げ</text>
<text x="780" y="198" text-anchor="middle" font-size="21" fill="#475569">方針を表明</text>
<rect x="260" y="270" width="440" height="56" rx="10" fill="#fdecea" stroke="#c0392b" stroke-width="1.5"/>
<text x="480" y="306" text-anchor="middle" font-size="23" font-weight="700" fill="#c0392b">手段は替わっても物価圧力は継続</text>
</svg>
</div>

<!--
2026年2月20日、連邦最高裁は6対3でIEEPAは関税賦課権限を与えないと判断した。しかし同日、ホワイトハウスは通商法122条を根拠にほぼ全輸入品へ10%の課徴金を発効させ、15%への引き上げ方針も表明した。司法判断で手段は替わったが、関税による物価上昇圧力そのものは残った点がFOMCの判断を難しくした。
-->

---

# 雇用は緩やかに軟化したが、利上げ論を止めるほどではなかった

> *6月雇用統計は市場予想を下回るも、教育・医療が牽引しプラスを維持。失業率見通しはむしろ下方修正*

<div class="fig">
<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="330" y1="40" x2="330" y2="330" stroke="#94a3b8" stroke-width="2"/>
<text x="330" y="25" text-anchor="middle" font-size="20" fill="#64748b">← 減少 ｜ 増加 →</text>
<rect x="330" y="55" width="250" height="34" fill="#2f855a"/>
<text x="595" y="79" font-size="21" fill="#334155">教育・医療 +69,000</text>
<rect x="330" y="105" width="140" height="34" fill="#4c9a6b"/>
<text x="485" y="129" font-size="21" fill="#334155">対事業所サービス +36,000</text>
<rect x="330" y="155" width="45" height="34" fill="#7bbf97"/>
<text x="390" y="179" font-size="21" fill="#334155">建設 +10,000</text>
<rect x="90" y="205" width="240" height="34" fill="#c0392b"/>
<text x="80" y="229" text-anchor="end" font-size="21" fill="#334155">娯楽・接客 −61,000</text>
<rect x="295" y="255" width="35" height="34" fill="#d98880"/>
<text x="285" y="279" text-anchor="end" font-size="21" fill="#334155">情報 −9,000</text>
<text x="480" y="355" text-anchor="middle" font-size="20" fill="#64748b">6月 民間 +49,000 / 政府 +8,000（予想下回る）</text>
</svg>
</div>

<!--
6月の雇用統計は市場予想を下回り、民間はプラス49,000人、政府部門はプラス8,000人にとどまった。娯楽・接客はマイナス61,000、情報はマイナス9,000と弱い一方、教育・医療がプラス69,000で全体を支えた。緩やかな軟化ではあるが失業率見通しはむしろ下方修正されており、利上げ方向への転換を止めるほどの弱さではなかった。
-->

---

<!-- _class: lead -->
# 誰が決めているのか

- 議長交代と、割れる委員会

<!--
第3章。前提を書き換えるのは委員会の人々である。5月の議長交代と、タカ派・ハト派に割れる委員会の内実を見る。
-->

---

# 議長は54対45の僅差で交代し、ホワイトハウスで宣誓した

> *ウォーシュ氏が第17代FRB議長に就任。近代の議長人事として異例の薄い承認差と異例の就任式*

<div class="fig">
<svg viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="480" y="55" text-anchor="middle" font-size="24" font-weight="700" fill="#334155">上院承認採決</text>
<rect x="140" y="90" width="680" height="60" rx="8" fill="#e2e8f0"/>
<rect x="140" y="90" width="362" height="60" rx="8" fill="#2563a8"/>
<text x="320" y="128" text-anchor="middle" font-size="26" font-weight="700" fill="#ffffff">賛成 54</text>
<text x="665" y="128" text-anchor="middle" font-size="26" font-weight="700" fill="#475569">反対 45</text>
<text x="480" y="215" text-anchor="middle" font-size="23" fill="#475569">5月13日 承認 → 5月22日 就任（第17代）</text>
<text x="480" y="260" text-anchor="middle" font-size="23" fill="#475569">就任宣誓は異例にもホワイトハウスで実施</text>
<text x="480" y="300" text-anchor="middle" font-size="21" fill="#64748b">元FRB理事（2006〜2011）・共和党寄り・マネタリスト的</text>
</svg>
</div>

<!--
2026年5月13日、上院は賛成54・反対45という近代のFRB議長人事として異例に薄い差でウォーシュ氏を承認、5月22日に第17代議長に就任した。就任宣誓式は異例にもホワイトハウスでトランプ大統領主催により実施された。ウォーシュ氏はモルガン・スタンレー出身で2006〜2011年にFRB理事を務め、共和党寄り・マネタリスト的な思想で知られる。
-->

---

<!-- _class: fit-88 -->
# 新議長がタカ派かハト派かは、市場でも評価が割れている

> *「物価安定重視だが潜在的にハト派的」との見方もあり、確定的な評価はまだ下せない*

- タカ派的との見方: 物価安定を最優先する姿勢
- ハト派的との見方: 政権との近さと成長重視の側面
- 現時点は分析記事レベルの両論併記にとどまる
- 評価の確定には数会合分の投票行動が必要

<!--
ウォーシュ新体制がタカ派かハト派かは市場でも見方が分かれる。物価安定を重視するタカ派との評価がある一方、政権との近さや成長重視の側面からハト派的とみる分析もある。これは確定した評価ではなく分析記事レベルの両論併記であり、実際の投票行動を数会合分見るまで断定はできない点に留意したい。
-->

---

<!-- _class: fit-88 -->
# 議事録と地区連銀総裁の発言が「当面利下げなし」を裏づけた

> *7月の議事録は2027年前半まで利下げを見込まず。ローガン総裁は利上げ支持を鮮明にした*

- 7月8日公開の議事録: 利上げ継続の姿勢を示唆
- 利下げは2027年前半まで見込まないとの見方
- 7月16日 ダラス連銀ローガン総裁が利上げ支持を表明
- 委員会内のタカ派・ハト派の対立は継続中

<!--
7月8日公開のFOMC議事録は利上げ継続の姿勢を示し、利下げは2027年前半まで見込まないとの見方を伝えた。7月16日にはダラス連銀のローガン総裁が、インフレは長期間高止まりし2%目標への道筋が見えないとして利上げ支持を鮮明にした。ただし委員会内のタカ派・ハト派の対立は続いており、実際に利上げへ転じるかは7月時点でも未確定である。
-->

---

<!-- _class: lead -->
# どこへ波及するのか

- 為替・日銀・株式市場への含意

<!--
第4章。米国の金利見通し反転は国境を越えて波及する。為替、日銀の政策、そして株式市場への含意を見る。
-->

---

# 米金利の先高観がドル円を1986年以来の水準まで押し上げた

> *2026年7月1日時点で162円台半ば。利上げ観測がドルを支え、円は約40年ぶりの安値圏にある*

<div class="fig">
<svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="110" y1="300" x2="900" y2="300" stroke="#94a3b8" stroke-width="2"/>
<line x1="110" y1="120" x2="900" y2="120" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6 6"/>
<text x="115" y="108" font-size="21" fill="#64748b">163.00円 節目（戻り売り水準）</text>
<polyline points="130,240 260,215 390,195 520,160 650,140 780,150 880,135" fill="none" stroke="#c0392b" stroke-width="4"/>
<circle cx="650" cy="140" r="9" fill="#c0392b"/>
<text x="650" y="110" text-anchor="middle" font-size="26" font-weight="700" fill="#c0392b">162円台半ば</text>
<text x="650" y="90" text-anchor="middle" font-size="20" fill="#64748b">7月1日時点</text>
<text x="200" y="340" text-anchor="middle" font-size="22" fill="#475569">円高</text>
<text x="820" y="340" text-anchor="middle" font-size="22" fill="#475569">円安（1986年以来）</text>
</svg>
</div>

<!--
2026年7月1日時点でドル円は162円台半ばと1986年以来の円安水準に達した。米金利の先高観がドルを支える構図で、7月上旬には162.709円まで上昇後、163円の節目を前に戻り売りで161.287円まで反落するなど、方向感はドル高・円安に傾きつつも上値の重い展開が続く。年金資金の国内回帰期待による円買いが上値を抑える交錯した相場である。
-->

---

# 日銀は31年ぶりの1%へ利上げし、内外金利差が為替の焦点になった

> *2026年6月に0.25%引き上げて政策金利1.00%。1995年以来の高さだが、米国との差は依然大きい*

<div class="fig">
<svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="310" x2="860" y2="310" stroke="#94a3b8" stroke-width="2"/>
<rect x="200" y="250" width="150" height="60" fill="#8bb4d6" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="275" y="235" text-anchor="middle" font-size="30" font-weight="700" fill="#2563a8">1.00%</text>
<text x="275" y="345" text-anchor="middle" font-size="23" fill="#475569">日銀（31年ぶり）</text>
<rect x="620" y="85" width="150" height="225" fill="#c0392b" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="695" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="#c0392b">3.5〜3.75%</text>
<text x="695" y="345" text-anchor="middle" font-size="23" fill="#475569">FRB</text>
<text x="480" y="185" text-anchor="middle" font-size="22" fill="#64748b">大きな</text>
<text x="480" y="215" text-anchor="middle" font-size="26" font-weight="700" fill="#334155">内外金利差</text>
</svg>
</div>

<!--
日銀は2026年6月の会合で0.25%引き上げを決め、政策金利1.00%は1995年以来31年ぶりの高さとなった。それでも米国の3.5〜3.75%との差は依然大きく、この内外金利差が円安圧力の背景にある。米国が利上げ方向に傾いたことで、日銀の追加利上げがあっても金利差の縮小ペースは限られる。
-->

---

# 「当面利下げなし」の前提は、割高な株式市場に重しとなりうる

> *金利の先高観は割引率を通じて高PER銘柄に効く。金融政策の前提変化はリスク資産の再評価を促す*

<div class="fig">
<svg viewBox="0 0 960 340" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="40" y="120" width="210" height="100" rx="12" fill="#fdecea" stroke="#c0392b" stroke-width="2"/>
<text x="145" y="162" text-anchor="middle" font-size="24" font-weight="700" fill="#c0392b">利下げ期待の後退</text>
<text x="145" y="195" text-anchor="middle" font-size="20" fill="#475569">当面利下げなし</text>
<polygon points="260,155 320,155 320,138 375,175 320,212 320,195 260,195" fill="#94a3b8"/>
<rect x="390" y="120" width="200" height="100" rx="12" fill="#eef2f7" stroke="#9aa7b8" stroke-width="2"/>
<text x="490" y="162" text-anchor="middle" font-size="24" font-weight="700" fill="#334155">割引率の上昇</text>
<text x="490" y="195" text-anchor="middle" font-size="20" fill="#475569">将来利益の現在価値↓</text>
<polygon points="600,155 660,155 660,138 715,175 660,212 660,195 600,195" fill="#94a3b8"/>
<rect x="730" y="120" width="200" height="100" rx="12" fill="#eef2f7" stroke="#2563a8" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))"/>
<text x="830" y="162" text-anchor="middle" font-size="24" font-weight="700" fill="#2563a8">高PER株に重し</text>
<text x="830" y="195" text-anchor="middle" font-size="20" fill="#475569">リスク資産の再評価</text>
<text x="480" y="285" text-anchor="middle" font-size="22" fill="#64748b">為替・金利・株の連動が一段と高まっている</text>
</svg>
</div>

<!--
利下げが2027年前半まで見込めないという前提は、割引率の上昇を通じて特に高バリュエーションの銘柄に重しとなりうる。金融政策の前提が変わればリスク資産の再評価が促される。本デッキの焦点は金融政策の意思決定プロセスにあるため個別のバリュエーション論には踏み込まないが、金利・為替・株式の連動が強まっている点は押さえておきたい。
-->

---

<!-- _class: fit-88 -->
# 実務の教訓は「金利前提を四半期ごとに検証する」ことに尽きる

> *同じ委員会が半年で見通しを反転させた。固定した金利前提で長期の意思決定を縛らない*

- 見通しは半年で反転しうる — 前提は定点観測する
- インフレ・関税・議長交代など前提要因を分解して追う
- 両論併記の情報は「確定」と誤読しない
- 為替・調達・投資判断に単一シナリオを固定しない

<!--
最大の教訓は、同じFOMCが半年で利下げ予想から利上げ予想へ反転しうるという事実である。実務では金利前提を固定せず四半期ごとに検証し、インフレ・関税・人事といった前提要因を分解して追う必要がある。新議長の評価のように両論併記の情報を確定と誤読しないこと、為替や調達・投資の判断に単一シナリオを固定しないことが、前提が変わる世界での意思決定の基本となる。
-->

---

<!-- _class: fit-82 -->
# 参照資料

> *本デッキの数値・事実の出典一覧*

- [ジェトロ 米FRB、4会合連続で政策金利を据え置き](https://www.jetro.go.jp/biznews/2026/06/0370be30a641b4e0.html)
- [第一生命経済研究所 2026年6月FOMCプレビュー](https://www.dlri.co.jp/report/macro/622959.html)
- [ジェトロ 6月の米雇用統計](https://www.jetro.go.jp/biznews/2026/07/72373603a52dc141.html)
- [ジェトロ 米最高裁がIEEPA関税を無効と判断](https://www.jetro.go.jp/biznews/2026/02/01180e362b158f46.html)
- [Tax Foundation Tariff Tracker](https://taxfoundation.org/research/all/federal/trump-tariffs-trade-war/)
- [日経新聞 ウォーシュ氏、第17代FRB議長に就任](https://www.nikkei.com/article/DGXZQOGN19ATA0Z10C26A5000000/)
- [OANDA 2026年7月1日のUSD/JPY](https://www.oanda.jp/lab-education/historical-rate/usdjpy/20260701/)

<!--
本デッキで用いた主要な出典。金利見通しの反転は第一生命経済研究所とジェトロ、関税はTax Foundationとジェトロ、議長交代は日経新聞、為替はOANDAに基づく。7月議事録とローガン総裁発言はinteractivecrypto.com、日銀の利上げは第一生命経済研究所を参照した。
-->
