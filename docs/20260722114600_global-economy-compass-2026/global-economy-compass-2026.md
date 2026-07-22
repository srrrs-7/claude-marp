---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "世界経済の羅針盤 2026"
footer: "© 2026 Classmethod — 投資判断は自己責任で / 出典は各スピーカーノート参照"
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
  
  section {
    font-size: 33px;
  }
  section table {
    font-size: 0.82em;
  }
  
---

<!-- _class: lead -->
# 世界経済の羅針盤 2026

> *地政学・金利・為替・株・政治 ― 5つのレンズで読む、投資家のための現在地*

- マクロ投資家・アナリスト向け
- 2026年7月22日時点のデータに基づく分析

<!--
本デッキのゴールは、断片的なニュースを1本の因果連鎖として捉え直し、リスクとチャンスを構造的に示すこと。データは2026年前半〜7月の公開情報に基づく。数値時点は各スライドに明記する。出典: https://www.imf.org/en/publications/weo/issues/2026/04/14/world-economic-outlook-april-2026
-->

---

# たった一つの地政学ショックが、2026年の全資産クラスを動かした

> *記録的株高の裏に3大リスク＝①円163円の歴史的安値 ②AI/Mag7集中 ③政治・財政ショック*

<div class="fig">
<svg viewBox='0 0 1000 230' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x='20' y='80' width='130' height='70' rx='8' fill='#fef2f2' stroke='#dc2626' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='85' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#dc2626'>地政学</text><text x='85' y='130' text-anchor='middle' font-size='12' fill='#475569'>中東ショック</text><rect x='186' y='80' width='130' height='70' rx='8' fill='#fffbeb' stroke='#d97706' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='251' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#d97706'>インフレ</text><text x='251' y='130' text-anchor='middle' font-size='12' fill='#475569'>再燃</text><rect x='352' y='80' width='130' height='70' rx='8' fill='#eef2ff' stroke='#2563eb' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='417' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#2563eb'>金利</text><text x='417' y='130' text-anchor='middle' font-size='12' fill='#475569'>中銀分岐</text><rect x='518' y='80' width='130' height='70' rx='8' fill='#ecfdf5' stroke='#059669' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='583' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#059669'>為替</text><text x='583' y='130' text-anchor='middle' font-size='12' fill='#475569'>円163円</text><rect x='684' y='80' width='130' height='70' rx='8' fill='#f8fafc' stroke='#334155' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='749' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#334155'>株式</text><text x='749' y='130' text-anchor='middle' font-size='12' fill='#475569'>記録的高値</text><rect x='850' y='80' width='130' height='70' rx='8' fill='#f5f3ff' stroke='#7c3aed' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='915' y='108' text-anchor='middle' font-size='17' font-weight='bold' fill='#7c3aed'>政治</text><text x='915' y='130' text-anchor='middle' font-size='12' fill='#475569'>増幅装置</text><line x1='153' y1='115' x2='177' y2='115' stroke='#64748b' stroke-width='2'/><polygon points='177,109 186,115 177,121' fill='#64748b'/><line x1='319' y1='115' x2='343' y2='115' stroke='#64748b' stroke-width='2'/><polygon points='343,109 352,115 343,121' fill='#64748b'/><line x1='485' y1='115' x2='509' y2='115' stroke='#64748b' stroke-width='2'/><polygon points='509,109 518,115 509,121' fill='#64748b'/><line x1='651' y1='115' x2='675' y2='115' stroke='#64748b' stroke-width='2'/><polygon points='675,109 684,115 675,121' fill='#64748b'/><line x1='817' y1='115' x2='841' y2='115' stroke='#64748b' stroke-width='2'/><polygon points='841,109 850,115 841,121' fill='#64748b'/><text x='500' y='198' text-anchor='middle' font-size='15' font-weight='bold' fill='#334155'>連鎖の起点は中東、増幅装置は政治</text></svg>
</div>

- 独立に見える5つのレンズは、実は一本の鎖でつながっている

<!--
証拠・データは後続スライドで詳述する。まず結論を言い切る。連鎖の起点は中東の地政学ショック、増幅装置は政治・財政。出典: https://www.imf.org/en/publications/weo/issues/2026/04/14/world-economic-outlook-april-2026
-->

---

# 「利下げでソフトランディング」の前提が、2月に崩れた

> *S:利下げ期待 → C:中東紛争でインフレ再燃 → Q:どう構える → A:本デッキの5レンズ*

<div class="fig">
<svg viewBox='0 0 1000 220' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x='20' y='60' width='220' height='130' rx='8' fill='#eef2ff' stroke='#2563eb' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='130' y='102' text-anchor='middle' font-size='34' font-weight='bold' fill='#2563eb'>S</text><text x='130' y='130' text-anchor='middle' font-size='15' font-weight='bold' fill='#2563eb'>状況</text><text x='130' y='156' text-anchor='middle' font-size='12' fill='#475569'>利下げ主導の</text><text x='130' y='174' text-anchor='middle' font-size='12' fill='#475569'>ソフトランディング期待</text><rect x='265' y='60' width='220' height='130' rx='8' fill='#fef2f2' stroke='#dc2626' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='375' y='102' text-anchor='middle' font-size='34' font-weight='bold' fill='#dc2626'>C</text><text x='375' y='130' text-anchor='middle' font-size='15' font-weight='bold' fill='#dc2626'>複雑化</text><text x='375' y='156' text-anchor='middle' font-size='12' fill='#475569'>2月の中東紛争で</text><text x='375' y='174' text-anchor='middle' font-size='12' fill='#475569'>インフレ再燃</text><rect x='510' y='60' width='220' height='130' rx='8' fill='#fffbeb' stroke='#d97706' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='620' y='102' text-anchor='middle' font-size='34' font-weight='bold' fill='#d97706'>Q</text><text x='620' y='130' text-anchor='middle' font-size='15' font-weight='bold' fill='#d97706'>問い</text><text x='620' y='156' text-anchor='middle' font-size='12' fill='#475569'>投資家はどこに</text><text x='620' y='174' text-anchor='middle' font-size='12' fill='#475569'>リスクと機会を見るか</text><rect x='755' y='60' width='220' height='130' rx='8' fill='#ecfdf5' stroke='#059669' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='865' y='102' text-anchor='middle' font-size='34' font-weight='bold' fill='#059669'>A</text><text x='865' y='130' text-anchor='middle' font-size='15' font-weight='bold' fill='#059669'>答え</text><text x='865' y='156' text-anchor='middle' font-size='12' fill='#475569'>5つのレンズで</text><text x='865' y='174' text-anchor='middle' font-size='12' fill='#475569'>連鎖を読み解く</text><line x1='243' y1='125' x2='256' y2='125' stroke='#64748b' stroke-width='2'/><polygon points='256,119 265,125 256,131' fill='#64748b'/><line x1='488' y1='125' x2='501' y2='125' stroke='#64748b' stroke-width='2'/><polygon points='501,119 510,125 501,131' fill='#64748b'/><line x1='733' y1='125' x2='746' y2='125' stroke='#64748b' stroke-width='2'/><polygon points='746,119 755,125 746,131' fill='#64748b'/></svg>
</div>

<!--
2025年末のコンセンサスはFRBが1.00-1.25%まで利下げ・ドル安。実際は真逆で、据え置き〜タカ派、有事のドル買いに。年初予測が外れた事実自体が、本デッキの出発点。出典: https://www.imf.org/en/publications/weo/issues/2026/04/14/world-economic-outlook-april-2026
-->

---

# 5つのレンズは独立していない ― 一本の鎖でつながっている

> *地政学が起点、金利が伝達路、為替・株が結果、政治が増幅装置*

<div class="fig">
<svg viewBox='0 0 1000 230' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><path d='M900 105 C900 25 100 25 100 105' fill='none' stroke='#7c3aed' stroke-width='2.5' stroke-dasharray='6 5'/><polygon points='94,95 100,107 106,95' fill='#7c3aed'/><text x='500' y='40' text-anchor='middle' font-size='14' font-weight='bold' fill='#7c3aed'>政治が地政学を増幅し、循環する</text><rect x='20' y='110' width='160' height='90' rx='8' fill='#fef2f2' stroke='#dc2626' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='100' y='145' text-anchor='middle' font-size='16' font-weight='bold' fill='#dc2626'>①地政学</text><text x='100' y='172' text-anchor='middle' font-size='13' fill='#475569'>連鎖の起点</text><rect x='220' y='110' width='160' height='90' rx='8' fill='#eef2ff' stroke='#2563eb' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='300' y='145' text-anchor='middle' font-size='16' font-weight='bold' fill='#2563eb'>②金利</text><text x='300' y='172' text-anchor='middle' font-size='13' fill='#475569'>伝達路</text><rect x='420' y='110' width='160' height='90' rx='8' fill='#ecfdf5' stroke='#059669' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='500' y='145' text-anchor='middle' font-size='16' font-weight='bold' fill='#059669'>③為替</text><text x='500' y='172' text-anchor='middle' font-size='13' fill='#475569'>結果 ・ 円163円</text><rect x='620' y='110' width='160' height='90' rx='8' fill='#f8fafc' stroke='#334155' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='700' y='145' text-anchor='middle' font-size='16' font-weight='bold' fill='#334155'>④株式</text><text x='700' y='172' text-anchor='middle' font-size='13' fill='#475569'>結果 ・ S&amp;P7,509</text><rect x='820' y='110' width='160' height='90' rx='8' fill='#f5f3ff' stroke='#7c3aed' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='900' y='145' text-anchor='middle' font-size='16' font-weight='bold' fill='#7c3aed'>⑤政治</text><text x='900' y='172' text-anchor='middle' font-size='13' fill='#475569'>増幅装置</text><line x1='183' y1='155' x2='211' y2='155' stroke='#64748b' stroke-width='2'/><polygon points='211,149 220,155 211,161' fill='#64748b'/><line x1='383' y1='155' x2='411' y2='155' stroke='#64748b' stroke-width='2'/><polygon points='411,149 420,155 411,161' fill='#64748b'/><line x1='583' y1='155' x2='611' y2='155' stroke='#64748b' stroke-width='2'/><polygon points='611,149 620,155 611,161' fill='#64748b'/><line x1='783' y1='155' x2='811' y2='155' stroke='#64748b' stroke-width='2'/><polygon points='811,149 820,155 811,161' fill='#64748b'/></svg>
</div>

<!--
各レンズの結論を一言ずつ予告: 円163円/中銀ダイバージェンス/S&P500 7,509/Mag7がS&P500の33%/英giltショック。地政学が起点、政治が起点に再び作用して循環する構造。出典: https://www.imf.org/en/publications/weo/issues/2026/04/14/world-economic-outlook-april-2026
-->

---

<!-- _class: lead -->
# レンズ① 地政学 ― 連鎖の起点

> *中東の火種が、原油・金・貿易ルールを同時に動かした*

<!--
最初のレンズは地政学。2026年2月の中東紛争が、以降の全ての資産クラスの動きの引き金になった。
-->

---

# 2月の中東紛争が原油を$88へ押し上げ、全ての連鎖の引き金を引いた

> *2/28イラン攻撃 → 7月ホルムズで軍事衝突、Brent $88.10（前日比+4.6%）*

<div class="fig">
<svg viewBox='0 0 1000 360' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x='90' y='49' width='860' height='97' fill='#fef2f2'/><text x='100' y='64' font-size='11' fill='#dc2626'>テールリスク帯 $150-200</text><rect x='90' y='204' width='860' height='39' fill='#fffbeb'/><text x='100' y='220' font-size='11' fill='#d97706'>リスク帯 $100-120</text><line x1='90' y1='291' x2='950' y2='291' stroke='#059669' stroke-width='1.5' stroke-dasharray='6 4'/><text x='100' y='287' font-size='11' fill='#059669'>楽観 $75</text><line x1='90' y1='30' x2='90' y2='320' stroke='#94a3b8' stroke-width='1.5'/><line x1='90' y1='320' x2='950' y2='320' stroke='#94a3b8' stroke-width='1.5'/><text x='82' y='53' text-anchor='end' font-size='11' fill='#64748b'>200</text><text x='82' y='150' text-anchor='end' font-size='11' fill='#64748b'>150</text><text x='82' y='246' text-anchor='end' font-size='11' fill='#64748b'>100</text><text x='82' y='323' text-anchor='end' font-size='11' fill='#64748b'>60</text><text x='60' y='30' font-size='11' fill='#64748b'>$/bbl</text><line x1='263' y1='30' x2='263' y2='320' stroke='#dc2626' stroke-width='1' stroke-dasharray='4 4'/><text x='268' y='44' font-size='10' fill='#dc2626'>2/28 イラン攻撃</text><polyline points='130,300.7 263,285.2 396,277.5 530,283.3 663,281.3 796,275.5 930,265.9' fill='none' stroke='#334155' stroke-width='2.5'/><circle cx='930' cy='265.9' r='6' fill='#dc2626' stroke='#ffffff' stroke-width='1.5'/><text x='925' y='252' text-anchor='end' font-size='12' font-weight='bold' fill='#dc2626'>7月 ホルムズ衝突 Brent $88.10</text><text x='130' y='335' text-anchor='middle' font-size='11' fill='#64748b'>1月</text><text x='263' y='335' text-anchor='middle' font-size='11' fill='#64748b'>2月</text><text x='396' y='335' text-anchor='middle' font-size='11' fill='#64748b'>3月</text><text x='530' y='335' text-anchor='middle' font-size='11' fill='#64748b'>4月</text><text x='663' y='335' text-anchor='middle' font-size='11' fill='#64748b'>5月</text><text x='796' y='335' text-anchor='middle' font-size='11' fill='#64748b'>6月</text><text x='930' y='335' text-anchor='middle' font-size='11' fill='#64748b'>7月</text></svg>
</div>

<!--
起点は2026/2/28のイスラエル・米によるイラン攻撃。7月にホルムズ海峡で米・イラン間の直接的軍事衝突（タンカー攻撃・応酬）が現実化。Brent $88.10（+4.6%）・WTI $82.49（7/17時点）。3シナリオ帯は三井住友DS（2026/3/18）の想定（楽観$75/リスク$100-120/テール$150-200）。出典: https://www.cnbc.com/2026/07/17/oil-price-today-brent-wti.html , https://www.smd-am.co.jp/market/macroview/2026/mvreport20260318/ , https://www5.cao.go.jp/keizai3/monthly_topics/2026/0327/topics_082.pdf
-->

---

<!-- _class: fit-82 -->
# ホルムズ封鎖なら原油$140・日本のGDPは3%吹き飛ぶ

> *世界原油の約20%・LNGの約20%が通過、日本は輸入原油の80%超がこの海峡経由*

<div class="fig">
<svg viewBox='0 0 1000 340' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x='350' y='20' width='300' height='72' rx='8' fill='#fef2f2' stroke='#dc2626' stroke-width='2' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12))'/><text x='500' y='50' text-anchor='middle' font-size='18' font-weight='bold' fill='#dc2626'>ホルムズ海峡</text><text x='500' y='74' text-anchor='middle' font-size='12' fill='#475569'>世界原油の約20%・LNGの約20%が通過</text><rect x='40' y='118' width='250' height='84' rx='8' fill='#eef2ff' stroke='#2563eb' stroke-width='2'/><text x='165' y='146' text-anchor='middle' font-size='15' font-weight='bold' fill='#2563eb'>日本の輸入依存</text><text x='165' y='170' text-anchor='middle' font-size='12' fill='#475569'>原油輸入の約95%が中東</text><text x='165' y='190' text-anchor='middle' font-size='12' fill='#475569'>80%超がホルムズ経由</text><line x1='290' y1='150' x2='345' y2='95' stroke='#2563eb' stroke-width='2'/><polygon points='340,88 348,92 344,100' fill='#2563eb'/><rect x='380' y='150' width='240' height='46' rx='6' fill='#dc2626' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'/><text x='500' y='179' text-anchor='middle' font-size='16' font-weight='bold' fill='#ffffff'>完全封鎖シナリオ</text><line x1='500' y1='92' x2='500' y2='148' stroke='#dc2626' stroke-width='2'/><line x1='500' y1='196' x2='500' y2='224' stroke='#dc2626' stroke-width='2'/><polygon points='492,224 500,238 508,224' fill='#dc2626'/><rect x='60' y='250' width='270' height='70' rx='8' fill='#fffbeb' stroke='#d97706' stroke-width='2'/><text x='195' y='285' text-anchor='middle' font-size='18' font-weight='bold' fill='#d97706'>原油 $140/bbl</text><text x='195' y='307' text-anchor='middle' font-size='12' fill='#475569'>へ急騰</text><rect x='365' y='250' width='270' height='70' rx='8' fill='#fef2f2' stroke='#dc2626' stroke-width='2'/><text x='500' y='285' text-anchor='middle' font-size='18' font-weight='bold' fill='#dc2626'>日本GDP ▲3%</text><text x='500' y='307' text-anchor='middle' font-size='12' fill='#475569'>試算(JST)</text><rect x='670' y='250' width='270' height='70' rx='8' fill='#fffbeb' stroke='#d97706' stroke-width='2'/><text x='805' y='285' text-anchor='middle' font-size='16' font-weight='bold' fill='#d97706'>米CPI +0.6pt</text><text x='805' y='307' text-anchor='middle' font-size='12' fill='#475569'>封鎖1四半期(ダラス連銀)</text></svg>
</div>

- 現状は完全封鎖ではなく“攻撃・緊張激化”の段階（7月のタンカー攻撃・応酬）
- 完全封鎖は低確率だが、実現時の影響は非線形に増幅する ― テールリスクとして常時監視

<!--
日本の原油輸入の約95%が中東、80%超がホルムズ経由。完全封鎖時は原油$140・日本GDP▲3%の試算（JST 2026/3/25）。ダラス連銀WPは封鎖1四半期で米総合インフレ+0.6ptと試算。「完全封鎖」と「攻撃・緊張激化」を混同しないよう注記。出典: https://www.jst.go.jp/fund/dl/researchnote44.pdf , https://www5.cao.go.jp/keizai3/monthly_topics/2026/0327/topics_082.pdf
-->

---

# 金は投機ではなく“政策”で買われている ― 脱ドル化の構造変化

> *中央銀行は2025年に1,237トン購入、BRICS+の金準備シェアは11.2%→17.4%へ*

<div class="fig">
<svg viewBox='0 0 1000 360' style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><text x='490' y='26' text-anchor='middle' font-size='12' fill='#b45309'>金価格: ピーク一時 $5,400/oz ・ 7/22 約$4,077(年初来 約+20%)</text><line x1='100' y1='40' x2='100' y2='300' stroke='#94a3b8' stroke-width='1.5'/><line x1='100' y1='300' x2='880' y2='300' stroke='#94a3b8' stroke-width='1.5'/><text x='100' y='320' text-anchor='middle' font-size='11' fill='#d97706'>CB購入量(トン)</text><rect x='195' y='200' width='90' height='100' fill='#f59e0b' stroke='#d97706' stroke-width='1.5'/><text x='240' y='193' text-anchor='middle' font-size='12' font-weight='bold' fill='#b45309'>~500t</text><rect x='445' y='100' width='90' height='200' fill='#f59e0b' stroke='#d97706' stroke-width='1.5'/><text x='490' y='93' text-anchor='middle' font-size='12' font-weight='bold' fill='#b45309'>~1,000t</text><rect x='695' y='52' width='90' height='248' fill='#f59e0b' stroke='#d97706' stroke-width='1.5'/><text x='740' y='45' text-anchor='middle' font-size='13' font-weight='bold' fill='#b45309'>1,237t</text><text x='240' y='318' text-anchor='middle' font-size='11' fill='#64748b'>コロナ前(~2019)</text><text x='490' y='318' text-anchor='middle' font-size='11' fill='#64748b'>2022-24平均</text><text x='740' y='318' text-anchor='middle' font-size='11' fill='#64748b'>2025年</text><polyline points='240,154.4 740,73.8' fill='none' stroke='#059669' stroke-width='2.5'/><circle cx='240' cy='154.4' r='5' fill='#059669'/><circle cx='740' cy='73.8' r='5' fill='#059669'/><text x='240' y='146' text-anchor='middle' font-size='11' font-weight='bold' fill='#059669'>11.2%</text><text x='740' y='66' text-anchor='middle' font-size='11' font-weight='bold' fill='#059669'>17.4%</text><text x='885' y='40' text-anchor='end' font-size='11' fill='#059669'>BRICS+金準備シェア(2019→2026)</text><rect x='250' y='340' width='14' height='14' fill='#f59e0b'/><text x='270' y='352' font-size='11' fill='#475569'>中央銀行の金購入量</text><line x1='470' y1='347' x2='500' y2='347' stroke='#059669' stroke-width='2.5'/><text x='508' y='352' font-size='11' fill='#475569'>BRICS+の金準備シェア</text></svg>
</div>

<!--
中央銀行の金購入は価格に非感応的（sovereign buyers buy gold as policy, not as a trade）。ロシア外貨準備凍結(2022)が契機の構造的トレンド。2025年通年で1,237トン購入、WGC調査で74%がドル準備シェア低下を予想、BRICS+の金準備シェアは2019年11.2%→17.4%。Q1金需要は金額ベース$1,930億(+74%)。金の日次水準は情報源で幅あり(確度中)。出典: https://onlinegold.org/analysis/central-bank-gold-reserves-2026/ , https://www.cnbc.com/2026/01/21/gold-prices-surge-record-4800-safe-haven-demand.html , https://intellectia.ai/blog/gold-price-record-highs-2026
-->

---

<!-- _class: fit-70 -->
# 関税の“ルールブック”自体が揺らいでいる ― 最高裁がIEEPA関税を違憲判断

> *2/20に米最高裁6-3で違憲→撤廃、Section122で一律10%へ。米中半導体規制も応酬*

| 日付 | 出来事 | 市場・制度への影響 |
| --- | --- | --- |
| 2/20 | 米最高裁が6-3でIEEPA関税を違憲判断 | 2/24以降の輸入分から徴収停止 |
| 2月 | 根拠をSection 122へ移し一律10%関税 | 還付はCITで係争、不確実性継続 |
| 1/15 | 通商法232条で先端半導体に25%関税 | 米中で規制の応酬が継続 |
| 1/1 | 台湾VEU失効・H200を条件付き解禁 | 年次輸出許可の個別申請が必要に |

- 台湾侵攻確率は予測市場で13%（2025年末の約30%から低下）
- 台湾有事の最悪シナリオは世界GDP▲9.6%（約$10.6兆）
- 基本シナリオは有事より“規制・関税の恒常的不確実性”がテールリスク

<!--
2026/2/20に米最高裁が6-3でIEEPA関税を違憲と判断、同日撤廃令、2/24徴収停止。根拠をSection 122へ移し世界一律10%へ、還付はCITで係争。232条25%関税(1/15)、台湾VEU失効・H200条件付き解禁(1/1)。台湾侵攻確率は予測市場13%(2025末30%から低下)。有事より規制・関税の恒常的不確実性がより現実的なテールリスク。出典: https://www.skadden.com/insights/publications/2026/02/the-supreme-court-ends-ieepa-tariffs , https://www.bloomberg.com/news/articles/2026-02-10/the-10-trillion-fight-modeling-a-us-china-war-over-taiwan , https://www.lines.com/prediction-markets/politics/will-china-invade-taiwan-by-june-30-2026
-->

---

<!-- _class: lead -->
# レンズ② 金利・金融政策 ― 分岐する中央銀行

> *FRBは止まり、日銀・ECBは動いた。2026年最大のテーマ*

<div class="fig">
<svg viewBox="0 0 620 210" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="90" y1="115" x2="320" y2="115" stroke="#64748b" stroke-width="3"/>
<circle cx="320" cy="115" r="8" fill="#334155"/>
<line x1="320" y1="115" x2="520" y2="58" stroke="#059669" stroke-width="5"/>
<polygon points="520,58 500,60 511,76" fill="#059669"/>
<line x1="320" y1="115" x2="525" y2="115" stroke="#64748b" stroke-width="4" stroke-dasharray="9 6"/>
<polygon points="525,115 507,106 507,124" fill="#64748b"/>
<text x="90" y="105" font-size="16" fill="#475569">2025年末</text>
<text x="290" y="148" font-size="15" fill="#334155" text-anchor="middle">分岐点</text>
<text x="528" y="52" font-size="16" fill="#059669">日銀・ECB 利上げ</text>
<text x="532" y="120" font-size="16" fill="#64748b">FRB・BOE 据え置き</text>
</svg>
</div>

<!--
原油発のインフレ再燃で緩和サイクルが国ごとにバラけた。FRBは利下げを完全停止しタカ派バイアス、日銀・ECBは6月に利上げ。これが2026年最大の金利テーマ。出典: https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm
-->

---

# FRBは利下げを止め、日銀・ECBは利上げへ ― 中銀が"逆走"を始めた

> *原油発のインフレ再燃で、緩和サイクルが国ごとにバラけた（2025年末→2026年7月）*

<div class="fig">
<svg viewBox="0 0 760 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="760" height="400" fill="#f8fafc"/>
<line x1="170" y1="82" x2="170" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="170" y1="330" x2="640" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="170" y1="206" x2="640" y2="206" stroke="#e2e8f0" stroke-width="1"/>
<line x1="170" y1="268" x2="640" y2="268" stroke="#e2e8f0" stroke-width="1"/>
<text x="162" y="334" font-size="13" fill="#94a3b8" text-anchor="end">0%</text>
<text x="162" y="272" font-size="13" fill="#94a3b8" text-anchor="end">2%</text>
<text x="162" y="210" font-size="13" fill="#94a3b8" text-anchor="end">3%</text>
<text x="162" y="101" font-size="13" fill="#94a3b8" text-anchor="end">4%</text>
<text x="240" y="355" font-size="15" fill="#475569" text-anchor="middle">2025年末</text>
<text x="570" y="355" font-size="15" fill="#475569" text-anchor="middle">2026年7月</text>
<line x1="240" y1="98" x2="570" y2="98" stroke="#dc2626" stroke-width="4"/>
<circle cx="240" cy="98" r="6" fill="#dc2626"/><circle cx="570" cy="98" r="6" fill="#dc2626"/>
<text x="584" y="94" font-size="15" fill="#dc2626">FRB 3.75%（据え置き）</text>
<line x1="240" y1="113" x2="570" y2="113" stroke="#64748b" stroke-width="3" stroke-dasharray="8 5"/>
<circle cx="240" cy="113" r="5" fill="#64748b"/><circle cx="570" cy="113" r="5" fill="#64748b"/>
<text x="584" y="128" font-size="15" fill="#64748b">BOE 3.75%（据え置き）</text>
<line x1="240" y1="268" x2="570" y2="252" stroke="#059669" stroke-width="4"/>
<circle cx="240" cy="268" r="6" fill="#059669"/><circle cx="570" cy="252" r="6" fill="#059669"/>
<text x="584" y="250" font-size="15" fill="#059669">ECB 2.00→2.25%</text>
<line x1="240" y1="315" x2="570" y2="299" stroke="#2563eb" stroke-width="4"/>
<circle cx="240" cy="315" r="6" fill="#2563eb"/><circle cx="570" cy="299" r="6" fill="#2563eb"/>
<text x="584" y="303" font-size="15" fill="#2563eb">日銀 0.75→1.00%</text>
<text x="405" y="388" font-size="14" fill="#334155" text-anchor="middle">米英は高止まりホールド、日欧は利上げ ― 方向が逆に分岐</text>
</svg>
</div>

<!--
FRBはFF 3.50-3.75%を維持、7/28-29会合も据え置き79.5%織り込みで追加利上げの選択肢も残すタカ派姿勢。日銀は6/15-16会合で7対1により0.75%→1.00%へ（約31年ぶり高水準）。ECBは6月に預金金利2.00%→2.25%へ+25bp。BOEは3.75%据え置き。数値は2026年7月時点。出典: https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm , https://www.jcer.or.jp/research-report/20260616-2.html , https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260611~4d41bd5e83.en.html
-->

---

# 米10年4.6%、日本10年2.7%(29年ぶり) ― "金利のある世界"が定着した

> *日本の長期金利は29年ぶり高水準、higher for longer が2026年後半のベースケース*

<div class="fig">
<svg viewBox="0 0 760 380" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="760" height="380" fill="#f8fafc"/>
<line x1="200" y1="60" x2="200" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="300" y1="60" x2="300" y2="330" stroke="#e2e8f0" stroke-width="1"/>
<line x1="400" y1="60" x2="400" y2="330" stroke="#e2e8f0" stroke-width="1"/>
<line x1="500" y1="60" x2="500" y2="330" stroke="#e2e8f0" stroke-width="1"/>
<line x1="600" y1="60" x2="600" y2="330" stroke="#e2e8f0" stroke-width="1"/>
<text x="200" y="350" font-size="13" fill="#94a3b8" text-anchor="middle">0%</text>
<text x="400" y="350" font-size="13" fill="#94a3b8" text-anchor="middle">2%</text>
<text x="600" y="350" font-size="13" fill="#94a3b8" text-anchor="middle">4%</text>
<text x="190" y="95" font-size="16" fill="#334155" text-anchor="end">米10年</text>
<rect x="200" y="78" width="463" height="34" fill="#2563eb"/>
<text x="673" y="100" font-size="16" fill="#2563eb" font-weight="bold">4.63%</text>
<text x="190" y="155" font-size="16" fill="#334155" text-anchor="end">米2年</text>
<rect x="200" y="138" width="414" height="34" fill="#60a5fa"/>
<text x="624" y="160" font-size="16" fill="#2563eb">4.14%</text>
<text x="190" y="233" font-size="16" fill="#dc2626" text-anchor="end" font-weight="bold">日本10年</text>
<rect x="200" y="198" width="273" height="42" fill="#dc2626" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="483" y="216" font-size="17" fill="#dc2626" font-weight="bold">2.73%</text>
<text x="483" y="234" font-size="13" fill="#dc2626">29年ぶり高水準</text>
<text x="200" y="300" font-size="14" fill="#334155">7/2の10年国債入札は募入平均利回り2.729%。ゼロ金利の時代は終わった。</text>
</svg>
</div>

<!--
米10年4.63%(7/21)、米2年4.14%(7/2)。日本10年は7/2の第383回10年利付国債入札で表面利率2.7%・募入平均利回り2.729%と約29年ぶり高水準。FRBは追加利上げ余地を残し、higher for longerが後半のベースケース。出典: https://etfdb.com/fixed-income-content-hub/july-2-2026-treasury-yields-snapshot/ , https://www.all-senmonka.jp/moneyizm/news/315651/ , https://dtmdigest.org/topics/f1cfc595-5ed6-4d63-b33b-06ee7df23af4/
-->

---

<!-- _class: fit-70 -->
# インフレはどこも2%目標の上 ― だから中銀は動けない/引き締める

> *米3.5%・ユーロ圏2.8%・日本1.5%。米は5月4.2%からの鈍化途上*

| 地域 | 総合CPI | コア/コアコア | 目標 | 目標との差 |
|---|---|---|---|---|
| 米国 | **3.5%** | コア 2.6% | 2% | +1.5pt |
| ユーロ圏 | **2.8%** | コア 2.4% | 2% | +0.8pt |
| 日本 | **1.5%** | コアコア 1.8% | 2% | −0.5pt |
| 英国 | **2.8%** | — | 2% | +0.8pt |

- 米国は5月の4.2%（エネルギー+23.5%）から6月3.5%へ鈍化 ― それでも目標の上
- 日本だけは総合が目標下だが、コアコア1.8%が示す粘着インフレが利上げを正当化

<!--
数値はいずれも2026年6月・前年比（英国は5月）。米5月CPIは4.2%（イラン戦争由来のエネルギー高で+23.5%）、6月に3.5%へ鈍化。ユーロ圏6月は総合2.8%/コア2.4%。日本6月は総合+1.5%・コア+1.4%・コアコア+1.8%。目標はいずれも2%。出典: https://www.advisorperspectives.com/dshort/updates/2026/07/14/cpi-consumer-price-index-inflation-june-2026 , https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-01072026-ap , https://www.stat.go.jp/data/cpi/1.html
-->

---

<!-- _class: fit-70 -->
# "higher for longer"は債券・円キャリー・日本勢の資金フローを揺らす

> *デュレーション・リスク再評価、日本のリパトリ圧力、キャリー巻き戻しの燻り*

<div class="fig">
<svg viewBox="0 0 720 150" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="30" font-size="15" fill="#475569">米日金利差の縮小</text>
<rect x="20" y="55" width="320" height="40" fill="#eef2ff"/>
<rect x="20" y="55" width="320" height="40" fill="none" stroke="#2563eb" stroke-width="1.5"/>
<text x="180" y="80" font-size="17" fill="#2563eb" text-anchor="middle" font-weight="bold">525bp（2024ピーク）</text>
<line x1="350" y1="75" x2="415" y2="75" stroke="#334155" stroke-width="3"/>
<polygon points="415,75 400,68 400,82" fill="#334155"/>
<rect x="425" y="55" width="175" height="40" fill="#fef2f2"/>
<rect x="425" y="55" width="175" height="40" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<text x="512" y="80" font-size="16" fill="#dc2626" text-anchor="middle" font-weight="bold">250-300bp</text>
<text x="20" y="128" font-size="14" fill="#64748b">差は縮んでも依然大きい ― 巻き戻せば急激な円高の引き金に</text>
</svg>
</div>

- 長期債はデュレーションを取るほど、原油発インフレによる追加金利上昇（価格下落）リスクに晒される
- 日銀の国債買入れ減額停止で、日本の機関投資家に外債から自国債へ回帰するリパトリ圧力
- 米日金利差はなお250-300bp ― キャリー巻き戻しが起きれば急激な円高・リスク資産急落の火種

<!--
米日金利差は2024年ピークの525bpから、日銀利上げ後は約250-300bpへ縮小。それでも大きく、円キャリーは解消しきれず。日銀の追加利上げは野村予想で2026年内あと1回。国債買入れ減額停止（2027年4月以降）で国内勢のリパトリ圧力。出典: https://www.bitmex.com/blog/usdjpy-carry-trade-strategy-2026 , https://www.nomura.co.jp/wealthstyle/article/0571/
-->

---

<!-- _class: lead -->
# レンズ③ 為替 ― 円は40年ぶりの安値へ

> *介入も利上げも効かない、構造的な円安*


---

# ドル/円163円 ― 約40年ぶりの円安を、介入11.7兆円でも止められない

> *7/22に163.24円（1986年以来）、当局は4-5月に約11.7兆円介入も効果限定*

<div class="fig">
<svg viewBox="0 0 760 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="760" height="400" fill="#f8fafc"/>
<line x1="110" y1="60" x2="110" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="110" y1="330" x2="700" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="110" y1="85.6" x2="700" y2="85.6" stroke="#fee2e2" stroke-width="1"/>
<text x="102" y="90" font-size="13" fill="#94a3b8" text-anchor="end">163円</text>
<text x="102" y="164" font-size="13" fill="#94a3b8" text-anchor="end">162円</text>
<text x="102" y="246" font-size="13" fill="#94a3b8" text-anchor="end">161円</text>
<polyline points="140,160 248,110 356,242 464,202 572,118 680,86" fill="none" stroke="#dc2626" stroke-width="3"/>
<circle cx="140" cy="160" r="5" fill="#dc2626"/>
<circle cx="248" cy="110" r="5" fill="#dc2626"/>
<circle cx="356" cy="242" r="7" fill="#2563eb"/>
<circle cx="464" cy="202" r="5" fill="#dc2626"/>
<circle cx="572" cy="118" r="5" fill="#dc2626"/>
<circle cx="680" cy="86" r="8" fill="#dc2626" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2))"/>
<text x="140" y="355" font-size="12" fill="#64748b" text-anchor="middle">6/30</text>
<text x="356" y="355" font-size="12" fill="#64748b" text-anchor="middle">7/2</text>
<text x="680" y="355" font-size="12" fill="#64748b" text-anchor="middle">7/22</text>
<text x="356" y="270" font-size="13" fill="#2563eb" text-anchor="middle">160.63円</text>
<text x="356" y="286" font-size="12" fill="#2563eb" text-anchor="middle">介入警戒で急落</text>
<text x="672" y="74" font-size="16" fill="#dc2626" text-anchor="end" font-weight="bold">163.24円</text>
<text x="390" y="388" font-size="14" fill="#334155" text-anchor="middle">トレンドというより「高止まりレンジ＋突発スパイク」型の円安</text>
</svg>
</div>

<!--
163.24円は1986年12月以来約39年7ヶ月ぶり。6/30に162円台（約40年ぶり）、7/2は米雇用統計下振れ＋介入警戒で一時160.63円へ急落。当局は4-5月に約11.7兆円（728億ドル）介入も、日米金利差が大きく効果限定。年初来-11.19%（直近12ヶ月）。数値は2026年7月22日時点。出典: https://www.gaitame.com/media/entry/2026/07/22/080523 , https://www.cnbc.com/2026/05/07/japan-yen-intervention-boj-rate-gap-currency-pressure.html
-->

---

# 市場は真逆を予想していた ― 『利下げでドル安』シナリオは崩壊した

> *年初予測FF1.00-1.25%・EUR/USD 1.22 → 実際は3.50-3.75%維持でドル底堅い*

<div class="fig">
<svg viewBox="0 0 760 380" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="30" y="50" width="330" height="300" fill="#f1f5f9" rx="8"/>
<rect x="400" y="50" width="330" height="300" fill="#eef2ff" rx="8"/>
<text x="195" y="80" font-size="18" fill="#94a3b8" text-anchor="middle" font-weight="bold">年初予測（外れた）</text>
<text x="565" y="80" font-size="18" fill="#2563eb" text-anchor="middle" font-weight="bold">実際に起きたこと</text>
<rect x="55" y="105" width="280" height="44" fill="#e2e8f0" rx="5"/>
<text x="195" y="133" font-size="15" fill="#64748b" text-anchor="middle">FRBが1.00-1.25%まで利下げ</text>
<rect x="55" y="163" width="280" height="44" fill="#e2e8f0" rx="5"/>
<text x="195" y="191" font-size="15" fill="#64748b" text-anchor="middle">金利差縮小でドル安</text>
<rect x="55" y="221" width="280" height="44" fill="#e2e8f0" rx="5"/>
<text x="195" y="249" font-size="15" fill="#64748b" text-anchor="middle">EUR/USD 1.22-1.24へ上昇</text>
<rect x="425" y="105" width="280" height="44" fill="#2563eb" rx="5"/>
<text x="565" y="133" font-size="15" fill="#ffffff" text-anchor="middle">3.50-3.75%を維持（タカ派）</text>
<rect x="425" y="163" width="280" height="44" fill="#2563eb" rx="5"/>
<text x="565" y="191" font-size="15" fill="#ffffff" text-anchor="middle">有事のドル買いでドル底堅い</text>
<rect x="425" y="221" width="280" height="44" fill="#2563eb" rx="5"/>
<text x="565" y="249" font-size="15" fill="#ffffff" text-anchor="middle">DXY +4.05%（12ヶ月）</text>
<line x1="362" y1="200" x2="398" y2="200" stroke="#dc2626" stroke-width="4"/>
<polygon points="400,200 382,191 382,209" fill="#dc2626"/>
<text x="380" y="312" font-size="14" fill="#dc2626" text-anchor="middle">教訓：ドル安前提のヘッジ戦略は再点検が必要</text>
</svg>
</div>

<!--
ING/JPMorgan/MUFGの年初コンセンサス（FRB利下げ主導のドル安、EUR/USD 1.20-1.24）は年後半にかけて外れた。実際はFF 3.50-3.75%維持、中東・原油・関税でタカ派化。利上げ確率は一時36.3%まで上昇。ドル安前提のヘッジ戦略の再点検が教訓。出典: https://www.mufgresearch.com/fx/fx-focus-g10-fx-2026-outlook-in-a-post-peak-usd-world-19-december-2025/ , https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm
-->

---

# 勝者は高金利通貨、敗者は円 ― 通貨は金利で選別されている

> *ブラジルレアル+11%（Selic14.75%）、人民元+3.3%、円-11%*

<div class="fig">
<svg viewBox="0 0 760 380" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="760" height="380" fill="#f8fafc"/>
<line x1="380" y1="55" x2="380" y2="320" stroke="#94a3b8" stroke-width="2"/>
<text x="380" y="340" font-size="13" fill="#64748b" text-anchor="middle">0%</text>
<text x="200" y="340" font-size="12" fill="#94a3b8" text-anchor="middle">-10%</text>
<text x="580" y="340" font-size="12" fill="#94a3b8" text-anchor="middle">+10%</text>
<text x="370" y="90" font-size="16" fill="#334155" text-anchor="end">レアル</text>
<rect x="380" y="72" width="220" height="36" fill="#059669"/>
<text x="608" y="95" font-size="15" fill="#059669" font-weight="bold">+11%</text>
<text x="370" y="142" font-size="16" fill="#334155" text-anchor="end">DXY</text>
<rect x="380" y="124" width="81" height="36" fill="#2563eb"/>
<text x="469" y="147" font-size="15" fill="#2563eb">+4.05%</text>
<text x="370" y="194" font-size="16" fill="#334155" text-anchor="end">人民元</text>
<rect x="380" y="176" width="66" height="36" fill="#059669"/>
<text x="454" y="199" font-size="15" fill="#059669">+3.3%</text>
<text x="390" y="246" font-size="16" fill="#334155" text-anchor="start">円</text>
<rect x="156" y="228" width="224" height="36" fill="#dc2626" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="148" y="251" font-size="15" fill="#dc2626" text-anchor="end" font-weight="bold">-11.19%</text>
<text x="380" y="368" font-size="12" fill="#64748b" text-anchor="middle">※レアル・人民元は年初来、DXY・円は直近12ヶ月ベース（期間基準は混在）</text>
</svg>
</div>

<!--
ブラジルレアルはSelic14.75%の高金利キャリーで年初来約+11%と主要通貨最強。人民元は年初来+3.3%（1ドル6.77元前後）と底堅い。DXYは直近12ヶ月+4.05%。円は直近12ヶ月-11.19%。期間基準（年初来 vs 直近12ヶ月）が混在するため脚注で明記。資源国通貨は高金利国と対中連動国で選好が分化。出典: https://www.marctomarket.com/2026/03/april-2026-monthly.html , https://www.exchange-rates.org/exchange-rate-history/usd-cny-2026 , https://tradingeconomics.com/united-states/currency
-->

---

<!-- _class: fit-70 -->
# 163円は"戻りリスク"も抱える ― ヘッジと輸出入エクスポージャーの再点検を

> *外貨建て資産は為替差益、しかし介入・追加利上げの反転リスクも同居する*

<div class="fig">
<svg viewBox="0 0 720 150" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="20" y="40" width="210" height="80" fill="#ecfdf5" rx="8"/>
<rect x="20" y="40" width="210" height="80" fill="none" stroke="#059669" stroke-width="1.5"/>
<text x="125" y="70" font-size="15" fill="#059669" text-anchor="middle" font-weight="bold">追い風</text>
<text x="125" y="95" font-size="14" fill="#334155" text-anchor="middle">外貨資産の差益</text>
<text x="125" y="112" font-size="14" fill="#334155" text-anchor="middle">輸出企業の増益</text>
<line x1="245" y1="80" x2="290" y2="80" stroke="#334155" stroke-width="3"/>
<polygon points="290,80 275,73 275,87" fill="#334155"/>
<line x1="475" y1="80" x2="430" y2="80" stroke="#dc2626" stroke-width="3"/>
<polygon points="430,80 445,73 445,87" fill="#dc2626"/>
<rect x="490" y="40" width="210" height="80" fill="#fef2f2" rx="8"/>
<rect x="490" y="40" width="210" height="80" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<text x="595" y="70" font-size="15" fill="#dc2626" text-anchor="middle" font-weight="bold">逆風</text>
<text x="595" y="95" font-size="14" fill="#334155" text-anchor="middle">介入・利上げで急反転</text>
<text x="595" y="112" font-size="14" fill="#334155" text-anchor="middle">輸入は円安×原油高</text>
<text x="360" y="30" font-size="14" fill="#334155" text-anchor="middle">歴史的水準ゆえ、両面を同時に構える</text>
</svg>
</div>

- 円建て投資家は外貨資産で差益を得やすいが、歴史的水準ゆえヘッジなしは戻りリスクも大きい
- 輸出企業は増益、一方で輸入・エネルギー関連は「円安×原油高」の二重苦
- 新興国通貨は一括りにせず、高金利国（ブラジル等）と対中連動国（豪ドル等）を分けて選別

<!--
当局は4-5月に約730億ドルの介入実績があり、無制限の円安容認ではない。163円台は外貨建て資産に差益をもたらすが、介入・日銀追加利上げによる急激な円高反転（戻りリスク）に留意。輸入企業は円安と原油高の二重苦。新興国通貨は高金利国と対中連動国で選好が分化。出典: https://www.gaitame.com/media/entry/2026/07/22/080523 , https://www.cnbc.com/2026/05/07/japan-yen-intervention-boj-rate-gap-currency-pressure.html
-->

---

<!-- _class: lead -->
# レンズ④ 株式市場 ― 記録的高値の光と影

> *史上最高値の裏で、集中リスクが静かに積み上がる*

<!--
地政学→インフレ→金利→為替と続いた連鎖の「結果」が株式市場に表れる。表面は記録的高値だが、その中身に3つの歪み（Mag7集中・AIバブル論・ローテーション）が潜む。出典: research/equity.md
-->

---

<!-- _class: fit-94 -->
# 米欧日がそろって史上最高値 ― 日経平均は2ヶ月で6万→7万円へ

> *S&P500 7,509（+9.7%）、日経平均72,353円で最高値、Stoxx600も最高値を更新*

<div class="fig">
<svg viewBox="0 0 760 360" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="30" font-size="19" font-weight="bold" fill="#334155">主要株価指数 年初来騰落率（2026年前半〜7月）</text>
<line x1="200" y1="55" x2="200" y2="310" stroke="#cbd5e1" stroke-width="1.5"/>
<text x="188" y="90" font-size="16" fill="#334155" text-anchor="end" font-weight="bold">日経平均</text>
<rect x="200" y="68" width="360" height="34" fill="#059669" rx="3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="572" y="90" font-size="16" fill="#059669" font-weight="bold">+20%超※</text>
<text x="188" y="155" font-size="16" fill="#334155" text-anchor="end" font-weight="bold">Nasdaq</text>
<rect x="200" y="133" width="198" height="34" fill="#059669" rx="3"/>
<text x="410" y="155" font-size="16" fill="#059669" font-weight="bold">+11%超</text>
<text x="188" y="220" font-size="16" fill="#334155" text-anchor="end" font-weight="bold">S&amp;P500</text>
<rect x="200" y="198" width="175" height="34" fill="#059669" rx="3"/>
<text x="387" y="220" font-size="16" fill="#059669" font-weight="bold">+9.7%</text>
<text x="188" y="285" font-size="16" fill="#334155" text-anchor="end" font-weight="bold">Stoxx600</text>
<rect x="200" y="263" width="142" height="34" fill="#059669" rx="3"/>
<text x="354" y="285" font-size="16" fill="#059669" font-weight="bold">+7.9%</text>
<text x="20" y="345" font-size="13" fill="#64748b">※日経は始値ベースの推定。S&amp;P500・Nasdaqは7月時点、Stoxx600は7/6時点</text>
</svg>
</div>

- 牽引役は米・イラン停戦合意とAI関連決算。日本株が最も勢いが強く、大和証券は年末目標を8万円へ上方修正

<!--
S&P500 7,509.20（2026/7/21、年初来+9.7%）。日経平均は6/22に72,353円で史上最高値、約2ヶ月で6万→7万円台の史上最短ペース、7/21終値は66,232円まで調整。Stoxx600は7/6に654.44で最高値（年初来+7.9%）、Nasdaqは年初来+11%超。日経の年初来%は始値ベースの推定（正式値は未確認）。出典: https://www.statmuse.com/money/ask/s-and-p-500-chart-2026-year-to-date, https://www.nikkei.com/article/DGXZQOUB191SI0Z10C26A6000000/, https://finance.yahoo.com/markets/world-indices/articles/stoxx-600-rockets-time-high-151604221.html
-->

---

# 上げているのは一握り ― Mag7がS&P500の33%、PERは他社の1.5倍

> *Mag7のfwd PERは31倍 vs 他493社20倍、Nvidia単独で時価総額4.92兆ドル*

<div class="fig">
<svg viewBox="0 0 760 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="30" font-size="18" font-weight="bold" fill="#334155">S&amp;P500に占めるMag7のウェイトとPER対比</text>
<text x="20" y="66" font-size="15" fill="#475569">指数ウェイト</text>
<rect x="20" y="76" width="238" height="44" fill="#dc2626" rx="3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="139" y="104" font-size="17" fill="#ffffff" font-weight="bold" text-anchor="middle">Mag7 33%</text>
<rect x="258" y="76" width="482" height="44" fill="#94a3b8" rx="3"/>
<text x="499" y="104" font-size="16" fill="#ffffff" font-weight="bold" text-anchor="middle">残り493社 67%</text>
<text x="20" y="168" font-size="15" fill="#475569">12カ月フォワードPER</text>
<text x="150" y="213" font-size="15" fill="#334155" text-anchor="end">Mag7</text>
<rect x="160" y="190" width="465" height="34" fill="#dc2626" rx="3"/>
<text x="637" y="213" font-size="16" fill="#dc2626" font-weight="bold">31倍</text>
<text x="150" y="271" font-size="15" fill="#334155" text-anchor="end">他493社</text>
<rect x="160" y="248" width="300" height="34" fill="#2563eb" rx="3"/>
<text x="472" y="271" font-size="16" fill="#2563eb" font-weight="bold">20倍</text>
<text x="20" y="330" font-size="15" fill="#334155">Nvidia単独で時価総額 <tspan font-weight="bold" fill="#dc2626">4.92兆ドル</tspan>（サーバーGPUシェア約97%）</text>
<text x="20" y="368" font-size="13" fill="#64748b">ウェイト・PERは2025/9/30時点、2026年も同水準継続とみられる（時点明記）</text>
</svg>
</div>

<!--
Mag7はS&P500の約33%（上位10銘柄で35%、ITバブル期ピーク25%超）。fwd PERはMag7 31倍 vs 他493社20倍で約1.5倍。Nvidia時価総額4.92兆ドル（7/19）。ただしMag7純利益率は25%超（平均13%）で収益力は本物。ウェイト・PERは2025/9/30時点データで一部二次情報、時点を明記。出典: https://www.columbiathreadneedle.com/en/insights/the-rise-of-the-magnificent-7-concentration-risk-versus-earnings-power/, https://www.capitalgroup.com/institutional/insights/articles/fresh-breadth-market-concentration-3-charts.html, https://capital.com/en-int/markets/shares/nvidia-corp-share-price/market-cap
-->

---

<!-- _class: fit-94 -->
# 運用者の45%が「AIが最大のテールリスク」― capexは3倍でも収益は追いつくか

> *ハイパースケーラー5社のAI投資は2026年約7,250億ドル、2024年の約3倍に膨張*

<div class="fig">
<svg viewBox="0 0 720 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="30" font-size="18" font-weight="bold" fill="#334155">ハイパースケーラー5社のAIインフラ投資（capex）</text>
<line x1="90" y1="60" x2="90" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="90" y1="330" x2="680" y2="330" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="180" y="231" width="130" height="99" fill="#2563eb" rx="3"/>
<text x="245" y="222" font-size="16" fill="#2563eb" font-weight="bold" text-anchor="middle">$2,560億</text>
<text x="245" y="353" font-size="15" fill="#334155" text-anchor="middle">2024年</text>
<rect x="470" y="70" width="130" height="260" fill="#2563eb" rx="3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="535" y="61" font-size="16" fill="#2563eb" font-weight="bold" text-anchor="middle">$7,250億</text>
<text x="535" y="353" font-size="15" fill="#334155" text-anchor="middle">2026年</text>
<line x1="320" y1="150" x2="453" y2="150" stroke="#d97706" stroke-width="3"/>
<polygon points="453,143 470,150 453,157" fill="#d97706"/>
<text x="388" y="138" font-size="19" fill="#d97706" font-weight="bold" text-anchor="middle">約3倍</text>
<text x="20" y="388" font-size="14" fill="#64748b">運用者の45%が「AIバブルが最大のテールリスク」と回答（前回11%）※二次情報</text>
</svg>
</div>

- 投資の急拡大に企業のAI収益が追いつくかが論点。JPモルガンは景気後退確率を35%と試算

<!--
ハイパースケーラー5社の2026年AI capexは約7,250億ドルで2024年2,560億ドルの約3倍。BofAファンドマネージャー調査で「AIバブル」を最大テールリスクとした割合は45%（前回9月11%から急増）だが、これは二次情報経由（BofA一次リリースへの直接アクセスは未実施、時期は2025/11調査）。投資と企業AI収益のギャップが懸念材料。JPモルガンは米・世界景気後退確率35%。数値の一部は二次情報のため時点・確度を明記。出典: https://alcapitaladvisory.com/research/intelligence/ai-infrastructure.html, https://intellectia.ai/blog/ai-investment-bubble-2026
-->

---

# 7月、資金は“出遅れ組”へ動き始めた ― グレート・ローテーションの兆し

> *小型株・バリュー・エネルギー(+21%)・素材(+17%)へ資金がシフトし始めた*

<div class="fig">
<svg viewBox="0 0 780 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="28" font-size="18" font-weight="bold" fill="#334155">資金フロー：大型グロースから出遅れ組へ</text>
<rect x="30" y="130" width="180" height="150" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="120" y="195" font-size="17" fill="#dc2626" font-weight="bold" text-anchor="middle">大型グロース</text>
<text x="120" y="222" font-size="16" fill="#dc2626" font-weight="bold" text-anchor="middle">/ Mag7</text>
<text x="120" y="252" font-size="14" fill="#64748b" text-anchor="middle">S&amp;P500の33%</text>
<line x1="215" y1="125" x2="330" y2="72" stroke="#059669" stroke-width="2.5"/>
<polygon points="330,64 345,71 328,80" fill="#059669"/>
<line x1="215" y1="175" x2="330" y2="162" stroke="#059669" stroke-width="2.5"/>
<polygon points="330,154 345,162 330,170" fill="#059669"/>
<line x1="215" y1="205" x2="330" y2="252" stroke="#059669" stroke-width="2.5"/>
<polygon points="330,244 345,252 328,260" fill="#059669"/>
<line x1="215" y1="285" x2="330" y2="342" stroke="#059669" stroke-width="2.5"/>
<polygon points="330,334 345,342 328,350" fill="#059669"/>
<rect x="345" y="47" width="210" height="48" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
<text x="450" y="77" font-size="15" fill="#059669" font-weight="bold" text-anchor="middle">エネルギー +21%</text>
<rect x="345" y="138" width="210" height="48" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
<text x="450" y="168" font-size="15" fill="#059669" font-weight="bold" text-anchor="middle">素材 +17%</text>
<rect x="345" y="228" width="210" height="48" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
<text x="450" y="258" font-size="15" fill="#059669" font-weight="bold" text-anchor="middle">小型株・バリュー</text>
<rect x="345" y="318" width="210" height="48" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
<text x="450" y="348" font-size="15" fill="#059669" font-weight="bold" text-anchor="middle">金融・ヘルスケア</text>
<rect x="580" y="150" width="180" height="120" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
<text x="670" y="193" font-size="14" fill="#334155" text-anchor="middle">Russell2000</text>
<text x="670" y="220" font-size="15" fill="#334155" font-weight="bold" text-anchor="middle">EPS成長 +19%</text>
<text x="670" y="247" font-size="13" fill="#64748b" text-anchor="middle">vs S&amp;P500 +12.5%</text>
</svg>
</div>

<!--
2026年に入り小型株・バリュー株が大型グロースを上回る局面が発生。エネルギー+21%・素材+17%が主導、Russell2000の通期EPS成長予想は+19%（S&P500は+12.5%）。Mag7偏重ポートフォリオ見直しのタイミングの可能性だが、景気後退確率35%を踏まえ慎重に。数値は2026/3時点の二次情報で、集計期間が指数の年初来%と直接比較できない点に注意（時点明記）。出典: https://www.financialcontent.com/article/marketminute-2026-3-3-the-great-rotation-of-2026-small-caps-surge-as-tech-titans-falter-in-historic-market-shift
-->

---

<!-- _class: lead -->
# レンズ⑤ 政治・政策 ― 増幅装置としての政治

> *選挙と財政発言が、金利・為替に直接波及する*

<!--
地政学から始まった連鎖の最後の環が政治。政治は独立変数ではなく、金利・為替・財政のショックを増幅する装置として働く。選挙結果・要人人事は変化が速いため、実行前の再確認を推奨。出典: research/politics.md
-->

---

# 首相の“発言一つ”で英国債が急落 ― ボンド・ビジランテの復活

> *英Burnham新首相の財政柔軟性発言で10年gilt 5.04%、30年5.75%へ急騰した*

<div class="fig">
<svg viewBox="0 0 780 340" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="20" y="30" font-size="18" font-weight="bold" fill="#334155">英国：政権交代の「発言」が国債を動かした（7/20-21）</text>
<rect x="20" y="80" width="150" height="90" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
<text x="95" y="120" font-size="15" fill="#7c3aed" font-weight="bold" text-anchor="middle">Starmer辞任</text>
<text x="95" y="145" font-size="14" fill="#64748b" text-anchor="middle">7/20</text>
<line x1="172" y1="125" x2="196" y2="125" stroke="#64748b" stroke-width="2.5"/>
<polygon points="196,118 211,125 196,132" fill="#64748b"/>
<rect x="213" y="80" width="152" height="90" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
<text x="289" y="118" font-size="15" fill="#7c3aed" font-weight="bold" text-anchor="middle">Burnham就任</text>
<text x="289" y="144" font-size="13" fill="#64748b" text-anchor="middle">「財政柔軟性」発言</text>
<line x1="367" y1="125" x2="391" y2="125" stroke="#64748b" stroke-width="2.5"/>
<polygon points="391,118 406,125 391,132" fill="#64748b"/>
<rect x="408" y="80" width="152" height="90" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
<text x="484" y="132" font-size="15" fill="#d97706" font-weight="bold" text-anchor="middle">財政規律の後退観測</text>
<line x1="562" y1="125" x2="586" y2="125" stroke="#dc2626" stroke-width="2.5"/>
<polygon points="586,118 601,125 586,132" fill="#dc2626"/>
<rect x="603" y="50" width="162" height="235" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="684" y="85" font-size="15" fill="#dc2626" font-weight="bold" text-anchor="middle">市場ショック</text>
<text x="684" y="128" font-size="15" fill="#334155" text-anchor="middle">10年gilt 5.04%</text>
<text x="684" y="152" font-size="13" fill="#64748b" text-anchor="middle">（前日比 +8bp）</text>
<text x="684" y="190" font-size="15" fill="#334155" text-anchor="middle">30年gilt 5.75%</text>
<text x="684" y="228" font-size="15" fill="#334155" text-anchor="middle">ポンド 1.3429</text>
<text x="684" y="252" font-size="13" fill="#64748b" text-anchor="middle">（対ドル下落）</text>
</svg>
</div>

- 政策実行前のシグナリング段階で市場が反応＝「ボンド・ビジランテ」の常態化

<!--
2026/7/20にStarmer首相が辞任、Andy Burnhamが後任首相に就任。就任初日の財政「あらゆる柔軟性」発言でgilt急落、10年利回りは前日比+8bpの5.04%、30年は2ヶ月ぶり高水準の5.75%、ポンドは対ドル1.3429へ下落。政策実行前のシグナリング段階での反応が常態化。要人交代・政権交代は変化が速く、実行前の再確認を推奨。出典: https://www.washingtonpost.com/business/2026/07/20/andy-burnham-uk-prime-minister-labour-starmer/c6f4e880-83f0-11f1-9cec-0fb26676f07e_story.html, https://www.bloomberg.com/news/articles/2026-07-20/gilts-fall-as-burnham-s-fiscal-flexibility-comments-spook-market
-->

---

<!-- _class: fit-82 -->
# 日米とも“勝者が積極財政”― 金利上昇圧力が政治から生まれる

> *日本:高市政権352議席で「責任ある積極財政」、米:OBBBAで赤字拡大が既定路線*

| 論点 | 日本（高市政権） | 米国（トランプ政権） |
|---|---|---|
| 選挙・政権 | 自民316＋維新36＝352議席（2/8投開票、3分の2超） | OBBBA成立、11/3中間選挙を控える |
| 財政方針 | 骨太方針2026「責任ある積極財政」（7/21閣議決定） | 赤字拡大（10年累計+4.1兆ドルの試算） |
| 金利への波及 | 10年金利が5月に一時2.8%へ上昇 | Warsh議長がCPI4.1%で利下げ見送り |

- 「選挙に勝った側が積極財政を継続」する構図が、日米そろって金利上昇圧力を生んでいる

<!--
日本は2/8投開票の衆院選で自民316＋維新36＝352議席の歴史的勝利、7/21に骨太方針2026「責任ある積極財政」を閣議決定、10年金利は5/18に一時2.8%。米国はWarsh議長が5/22就任、5月CPI4.1%で利下げ見送り、OBBBAで赤字拡大。中間選挙(11/3)で下院が民主党に転換すれば2027予算リスク。OBBBA赤字影響額はCBO試算の二次引用（確度中）。選挙結果・要人人事は変化が速く、実行前の再確認を推奨。出典: https://www5.cao.go.jp/keizai-shimon/kaigi/cabinet/honebuto/2026/decision0721.html, https://www.jimin.jp/news/information/212391.html, https://www.cnbc.com/2026/06/26/trump-warsh-fed-rate-cuts-inflation.html
-->

---

<!-- _class: fit-76 -->
# 格下げと金利上昇は、もはや一国の問題ではない

> *米国債はMoody's Aa1へ格下げ済み、日・英・仏も財政と金利のせめぎ合いが続く*

| 国 | 財政赤字（対GDP） | 長期金利 | 格付け・財政動向 |
|---|---|---|---|
| 米国 | 約7%（2034年に9%予測） | Fed据え置き、10年4.6% | Moody's Aa1へ格下げ（2025/5、3社とも最上級外れる） |
| 日本 | 積極財政を継続 | 10年2.8%（5月、29年ぶり高水準） | 格下げ観測が浮上（※未確認） |
| 英国 | Burnham政権下で拡大観測 | 10年5.04%／30年5.75% | 財政バッファーが縮小 |
| 仏国 | 5%目標（前年5.4%から縮小） | 政治不安でスプレッド拡大観測 | 49-3方式で予算を可決 |

- 債務残高はGDP比98%（2024年）→134%（2035年予測）へ ― 財政と金利のせめぎ合いは各国共通のテーマ

<!--
Moody'sは2025/5に米国債をAaaからAa1へ格下げ（3大格付機関すべてが最上級を外れた）。米債務残高はGDP比98%(2024)→134%(2035予測)、赤字は年7%→9%(2034)。日本は積極財政継続で格下げ観測が浮上（市場コメント・二次報道レベルで公式声明未確認＝観測段階）。英はgilt5%超、仏は赤字5%目標で49-3方式で予算可決。日本の格下げは「観測」段階である点を明記。政治・財政の状況は変化が速く、実行前の再確認を推奨。出典: https://www.cnbc.com/2025/05/16/moodys-downgrades-united-states-credit-rating-on-increase-in-government-debt.html, https://www.france24.com/en/france/20260120-french-pm-lecornu-forces-2026-budget-through-parliament-without-a-vote
-->

---

# すべては一本の鎖 ― 中東の火種が、あなたのポートフォリオまで届く

> *地政学→インフレ→金利→為替→株→政治、そして増幅して再び地政学へ*

<div class="fig">
<svg viewBox="0 0 960 210" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="20" y="40" width="160" height="100" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="100" y="66" text-anchor="middle" font-size="14" font-weight="bold" fill="#d97706">① 地政学</text>
<text x="100" y="96" text-anchor="middle" font-size="19" font-weight="bold" fill="#334155">原油 $88</text>
<text x="100" y="120" text-anchor="middle" font-size="12" fill="#64748b">中東ショックが起点</text>
<rect x="210" y="40" width="160" height="100" rx="8" fill="#eef2ff" stroke="#2563eb" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="290" y="66" text-anchor="middle" font-size="14" font-weight="bold" fill="#2563eb">② 金利</text>
<text x="290" y="96" text-anchor="middle" font-size="19" font-weight="bold" fill="#334155">米CPI 3.5%</text>
<text x="290" y="120" text-anchor="middle" font-size="12" fill="#64748b">中銀ダイバージェンス</text>
<rect x="400" y="40" width="160" height="100" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="480" y="66" text-anchor="middle" font-size="14" font-weight="bold" fill="#475569">③ 為替</text>
<text x="480" y="96" text-anchor="middle" font-size="19" font-weight="bold" fill="#334155">円 163円</text>
<text x="480" y="120" text-anchor="middle" font-size="12" fill="#64748b">約40年ぶり安値</text>
<rect x="590" y="40" width="160" height="100" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="670" y="66" text-anchor="middle" font-size="14" font-weight="bold" fill="#059669">④ 株式</text>
<text x="670" y="96" text-anchor="middle" font-size="19" font-weight="bold" fill="#334155">S&amp;P 7,509</text>
<text x="670" y="120" text-anchor="middle" font-size="12" fill="#64748b">Mag7が33%集中</text>
<rect x="780" y="40" width="160" height="100" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="860" y="66" text-anchor="middle" font-size="14" font-weight="bold" fill="#7c3aed">⑤ 政治</text>
<text x="860" y="93" text-anchor="middle" font-size="17" font-weight="bold" fill="#334155">英gilt 5%</text>
<text x="860" y="120" text-anchor="middle" font-size="12" fill="#64748b">日本352議席・積極財政</text>
<line x1="180" y1="90" x2="202" y2="90" stroke="#dc2626" stroke-width="3"/>
<polygon points="202,84 212,90 202,96" fill="#dc2626"/>
<line x1="370" y1="90" x2="392" y2="90" stroke="#dc2626" stroke-width="3"/>
<polygon points="392,84 402,90 392,96" fill="#dc2626"/>
<line x1="560" y1="90" x2="582" y2="90" stroke="#dc2626" stroke-width="3"/>
<polygon points="582,84 592,90 582,96" fill="#dc2626"/>
<line x1="750" y1="90" x2="772" y2="90" stroke="#dc2626" stroke-width="3"/>
<polygon points="772,84 782,90 772,96" fill="#dc2626"/>
<path d="M860 140 L860 180 L100 180 L100 152" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 4"/>
<polygon points="94,152 100,142 106,152" fill="#dc2626"/>
<text x="480" y="174" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">政治が増幅し、再び ① 地政学へ ― レンズは独立せず相互に強化し合う</text>
</svg>
</div>

- 1つの地政学ショックが、インフレ・金利・為替・株・政治を同時に動かした。各レンズの数値はすべて同じ鎖の異なる断面である。

<!--
デッキのピーク。各レンズが独立でなく相互強化する構造の再確認。中東$88(レンズ①)→米CPI3.5%・中銀分岐(②)→円163円(③)→S&P7,509・Mag7 33%(④)→英gilt5%・日本352議席(⑤)→増幅して再び①へ。1つのショックが全資産クラスを動かした。出典: research/geopolitics.md, rates.md, forex.md, equity.md, politics.md（各レンズ参照）。
-->

---

# 2026年後半に警戒すべきは、相互に連鎖する3つのリスク

> *①円キャリー巻き戻し ②AI/Mag7集中の調整 ③政治・財政ショック ― どれも単独では終わらない*

<div class="fig">
<svg viewBox="0 0 960 300" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="20" y="20" width="280" height="260" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="160" cy="62" r="24" fill="#dc2626"/>
<text x="160" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">1</text>
<text x="160" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">円キャリー</text>
<text x="160" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">巻き戻し</text>
<line x1="45" y1="160" x2="275" y2="160" stroke="#fecaca" stroke-width="1.5"/>
<text x="45" y="188" font-size="12" font-weight="bold" fill="#dc2626">トリガー</text>
<text x="45" y="208" font-size="13" fill="#475569">追加利上げ・為替介入</text>
<text x="45" y="242" font-size="12" font-weight="bold" fill="#dc2626">連鎖</text>
<text x="45" y="262" font-size="13" fill="#475569">163円→急激な円高・解消</text>
<rect x="340" y="20" width="280" height="260" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="480" cy="62" r="24" fill="#d97706"/>
<text x="480" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">2</text>
<text x="480" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">AI・Mag7</text>
<text x="480" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">集中の調整</text>
<line x1="365" y1="160" x2="595" y2="160" stroke="#fde68a" stroke-width="1.5"/>
<text x="365" y="188" font-size="12" font-weight="bold" fill="#d97706">トリガー</text>
<text x="365" y="208" font-size="13" fill="#475569">capex回収遅れ・失望決算</text>
<text x="365" y="242" font-size="12" font-weight="bold" fill="#d97706">連鎖</text>
<text x="365" y="262" font-size="13" fill="#475569">33%が同時安（45%が警戒）</text>
<rect x="660" y="20" width="280" height="260" rx="12" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="800" cy="62" r="24" fill="#7c3aed"/>
<text x="800" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">3</text>
<text x="800" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">政治・財政</text>
<text x="800" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">ショック</text>
<line x1="685" y1="160" x2="915" y2="160" stroke="#ddd6fe" stroke-width="1.5"/>
<text x="685" y="188" font-size="12" font-weight="bold" fill="#7c3aed">トリガー</text>
<text x="685" y="208" font-size="13" fill="#475569">格下げ・積極財政・中間選挙</text>
<text x="685" y="242" font-size="12" font-weight="bold" fill="#7c3aed">連鎖</text>
<text x="685" y="262" font-size="13" fill="#475569">gilt型の金利急騰が波及</text>
</svg>
</div>

<!--
損失回避フレーミング。3リスクは相互に連鎖しうる（円高→株安、株安→財政不安 等）。①円163円→介入・追加利上げで急激な円高反転（レンズ③）②Mag7 33%集中→AIバブル調整、BofA調査45%が最大テールリスク視（レンズ④）③政治・財政→格下げ・英gilt型ショック・米中間選挙(11/3)（レンズ⑤）。出典: research/forex.md, equity.md, politics.md。
-->

---

# 備えは3つ ― 市場タイミングでなく、構造で守る

> *①金・実物資産を恒常配分 ②地域・スタイル分散 ③ヘッジとデュレーション再点検*

<div class="fig">
<svg viewBox="0 0 960 300" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="20" y="20" width="280" height="260" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="160" cy="62" r="24" fill="#059669"/>
<text x="160" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">1</text>
<text x="160" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">金・実物資産を</text>
<text x="160" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">恒常配分に</text>
<line x1="45" y1="160" x2="275" y2="160" stroke="#a7f3d0" stroke-width="1.5"/>
<text x="45" y="188" font-size="12" font-weight="bold" fill="#059669">なぜ</text>
<text x="45" y="208" font-size="13" fill="#475569">中銀が1,237トン買う側</text>
<text x="45" y="238" font-size="12" font-weight="bold" fill="#059669">実行</text>
<text x="45" y="258" font-size="13" fill="#475569">トレードでなく戦略配分</text>
<rect x="340" y="20" width="280" height="260" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="480" cy="62" r="24" fill="#059669"/>
<text x="480" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">2</text>
<text x="480" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">地域・スタイル</text>
<text x="480" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">を分散</text>
<line x1="365" y1="160" x2="595" y2="160" stroke="#a7f3d0" stroke-width="1.5"/>
<text x="365" y="188" font-size="12" font-weight="bold" fill="#059669">なぜ</text>
<text x="365" y="208" font-size="13" fill="#475569">Mag7一極集中の巻き戻し</text>
<text x="365" y="238" font-size="12" font-weight="bold" fill="#059669">実行</text>
<text x="365" y="258" font-size="13" fill="#475569">日欧・小型株・バリューへ</text>
<rect x="660" y="20" width="280" height="260" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="800" cy="62" r="24" fill="#059669"/>
<text x="800" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">3</text>
<text x="800" y="118" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">ヘッジ&amp;期間</text>
<text x="800" y="142" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">を再点検</text>
<line x1="685" y1="160" x2="915" y2="160" stroke="#a7f3d0" stroke-width="1.5"/>
<text x="685" y="188" font-size="12" font-weight="bold" fill="#059669">なぜ</text>
<text x="685" y="208" font-size="13" fill="#475569">ドル安前提が崩れ金利上昇</text>
<text x="685" y="238" font-size="12" font-weight="bold" fill="#059669">実行</text>
<text x="685" y="258" font-size="13" fill="#475569">ヘッジ見直し・長期債圧縮</text>
</svg>
</div>

<!--
Working Backwards＝投資家に取ってほしい具体行動。市場タイミングでなく構造対応。①金/実物資産を中銀と同じ側で恒常配分に（レンズ①）②米一極から日欧・小型/バリューへ分散（レンズ④のグレート・ローテーション）③ドル安前提ヘッジの見直しと長期債デュレーション圧縮（レンズ②③）。出典: 各research.mdの投資家含意。
-->

---

<!-- _class: lead fit-82 -->
# 羅針盤は“予測”ではなく“備え”のためにある

> *連鎖の起点（地政学）を見れば、次の波は読める*

- データ時点: 2026年7月22日 / 各数値の出典は各スライドのスピーカーノートを参照
- 本資料は情報提供を目的としたものであり、特定の金融商品の投資勧誘ではありません。投資判断はご自身の責任で行ってください。
- 選挙結果・要人人事・速報値など一部データは変化が速いため、実行前の再確認を推奨します。

<!--
エンド＝問いかけと備えのメッセージで締める。免責・データ時点(2026-07-22)・再確認の注意を明示。5つのレンズは一本の鎖であり、起点の地政学を監視することが次の波への備えになる。
-->
