---
marp: true
theme: uncover
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
# 関税は死なず

> *最高裁が違憲としても翌日復活した10%関税の構造*

- 2026年2月、米連邦最高裁はトランプ関税の根拠法を違憲と判断した
- だが行政は同じ日に別の法律で10%関税を復活させた
- 本資料は「個別判決」ではなく「構造」として関税を読み解く

<!--
本デッキの主題は、司法が関税を止めても行政が別ルートで即日復活させたという構造的事実。個別の判決の勝ち負けではなく、複数の法的ルートが存在する構造を理解することが重要だと最初に宣言する。
-->

---

<!-- _class: fit-94 -->
# 司法が止めても、行政は別ルートで関税を即日復活させた

> *関税は一度の違憲判決では死なない——複数の法的ルートを持つ構造だから*

- 2026年2月20日、最高裁が6対3でIEEPA関税を違憲と判断
- 同じ日、ホワイトハウスは通商法122条で10%関税を再発出
- 2月24日発効・150日間の一律課徴金として関税は生き残った
- 教訓: 関税は個別判決ではなく法的ルートの束として理解すべき

<!--
BLUFスライド。結論を最初に置く。違憲判決という一見決定的な出来事が、行政の法的ルートの切り替えによって無力化された。ここで全体の主張を1文で提示する。
-->

---

<!-- _class: lead -->
# 第1幕: 最高裁が根拠法を違憲と切り捨てた

- IEEPA関税はなぜ、どのような法理で違憲とされたのか

<!--
第1セクションの扉。最高裁判決の中身と法理に入る。
-->

---

# 最高裁は6対3でIEEPA関税を違憲と判断した

> *課税権は議会に属し、大統領の緊急経済権限は課税まで及ばない*

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="400" fill="#ffffff"/>
<text x="480" y="55" font-size="30" font-weight="bold" text-anchor="middle" fill="#1a2b4a">2026年2月20日 米連邦最高裁</text>
<rect x="90" y="110" width="360" height="200" rx="14" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="3" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.15))"/>
<text x="270" y="185" font-size="72" font-weight="bold" text-anchor="middle" fill="#2b5fa8">6</text>
<text x="270" y="235" font-size="26" text-anchor="middle" fill="#1a2b4a">違憲（多数意見）</text>
<text x="270" y="275" font-size="22" text-anchor="middle" fill="#44506a">IEEPA関税は無効</text>
<rect x="510" y="110" width="360" height="200" rx="14" fill="#f5e9e9" stroke="#b5473f" stroke-width="3" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.15))"/>
<text x="690" y="185" font-size="72" font-weight="bold" text-anchor="middle" fill="#b5473f">3</text>
<text x="690" y="235" font-size="26" text-anchor="middle" fill="#1a2b4a">合憲（反対意見）</text>
<text x="690" y="275" font-size="22" text-anchor="middle" fill="#44506a">大統領権限を支持</text>
<text x="480" y="370" font-size="22" text-anchor="middle" fill="#44506a">IEEPA=国際緊急経済権限法</text>
</svg>
</div>

<!--
判決の骨子。6対3という数字を大きく見せる。多数意見は、関税賦課は憲法上議会に属する課税権であり、緊急経済権限法の輸入規制権限は課税まで及ばないとした。
-->

---

# 「輸入規制」は「課税」まで及ばない、が違憲の核心だ

> *緊急時の輸入規制権限を課税根拠に転用できないという線引き*

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="400" fill="#ffffff"/>
<rect x="60" y="60" width="370" height="250" rx="14" fill="#e8f4ec" stroke="#2f7d55" stroke-width="3"/>
<text x="245" y="105" font-size="26" font-weight="bold" text-anchor="middle" fill="#2f7d55">IEEPAが与える権限</text>
<text x="245" y="165" font-size="38" font-weight="bold" text-anchor="middle" fill="#1a2b4a">輸入の「規制」</text>
<text x="245" y="215" font-size="21" text-anchor="middle" fill="#44506a">数量制限・禁輸などは可</text>
<text x="245" y="280" font-size="24" font-weight="bold" text-anchor="middle" fill="#2f7d55">○ 認められる</text>
<text x="480" y="195" font-size="46" font-weight="bold" text-anchor="middle" fill="#8895ab">≠</text>
<rect x="530" y="60" width="370" height="250" rx="14" fill="#f5e9e9" stroke="#b5473f" stroke-width="3"/>
<text x="715" y="105" font-size="26" font-weight="bold" text-anchor="middle" fill="#b5473f">憲法上の課税権</text>
<text x="715" y="165" font-size="38" font-weight="bold" text-anchor="middle" fill="#1a2b4a">「課税」＝関税</text>
<text x="715" y="215" font-size="21" text-anchor="middle" fill="#44506a">議会にのみ属する権限</text>
<text x="715" y="280" font-size="24" font-weight="bold" text-anchor="middle" fill="#b5473f">× 大統領には及ばない</text>
<text x="480" y="375" font-size="22" text-anchor="middle" fill="#44506a">規制権限を課税権へ拡張する解釈を最高裁は退けた</text>
</svg>
</div>

<!--
違憲の法理を可視化。ポイントは規制と課税の区別。緊急経済権限法は輸入を規制する権限を与えるが、それを課税の根拠に読み替えることはできないという線引きが判決の核心。
-->

---

<!-- _class: lead -->
# 第2幕: 判決と同じ日に、関税は別の法律で蘇った

- 行政はいかにして違憲判決を24時間で無力化したのか

<!--
第2セクションの扉。判決当日の切り替えと通商法122条の中身に入る。
-->

---

# 違憲判決の当日、ホワイトハウスは122条で関税を再発出した

> *IEEPA関税を終了させる一方、同じ日に別ルートの一律課徴金を布告*

<div class="fig">
<svg viewBox="0 0 960 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="420" fill="#ffffff"/>
<line x1="80" y1="210" x2="820" y2="210" stroke="#b8c2d4" stroke-width="4"/>
<polygon points="820,210 800,200 800,220" fill="#b8c2d4"/>
<circle cx="200" cy="210" r="14" fill="#b5473f"/>
<circle cx="470" cy="210" r="14" fill="#2b5fa8"/>
<circle cx="700" cy="210" r="14" fill="#2f7d55"/>
<rect x="90" y="70" width="220" height="105" rx="12" fill="#f5e9e9" stroke="#b5473f" stroke-width="2.5"/>
<text x="200" y="105" font-size="24" font-weight="bold" text-anchor="middle" fill="#b5473f">2月20日</text>
<text x="200" y="138" font-size="21" text-anchor="middle" fill="#1a2b4a">最高裁が違憲判断</text>
<text x="200" y="163" font-size="20" text-anchor="middle" fill="#44506a">IEEPA関税は無効へ</text>
<rect x="360" y="245" width="220" height="105" rx="12" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="2.5"/>
<text x="470" y="280" font-size="24" font-weight="bold" text-anchor="middle" fill="#2b5fa8">同日</text>
<text x="470" y="313" font-size="21" text-anchor="middle" fill="#1a2b4a">通商法122条で</text>
<text x="470" y="338" font-size="20" text-anchor="middle" fill="#44506a">10%関税を布告</text>
<rect x="590" y="70" width="220" height="105" rx="12" fill="#e8f4ec" stroke="#2f7d55" stroke-width="2.5"/>
<text x="700" y="105" font-size="24" font-weight="bold" text-anchor="middle" fill="#2f7d55">2月24日</text>
<text x="700" y="138" font-size="21" text-anchor="middle" fill="#1a2b4a">10%課徴金が発効</text>
<text x="700" y="163" font-size="20" text-anchor="middle" fill="#44506a">150日間の時限措置</text>
</svg>
</div>

<!--
時系列で切り替えを可視化。2/20の違憲判決、同日の122条布告、2/24の発効という3点を示す。わずか4日で関税が別の法的根拠で復活した事実を印象づける。
-->

---

<!-- _class: fit-88 -->
# 通商法122条は、ほぼ全輸入品に10%を150日間だけ課す

> *緊急経済権限法より弱いが、即座に発動できる時限ルートだった*

- 対象: ほぼ全輸入品への一律課徴金
- 税率: 一律10%（当初）
- 発効: 2026年2月24日
- 期限: 150日間の時限措置
- 位置づけ: 国際収支対応を名目とする大統領権限

<!--
122条関税の要件を整理。緊急経済権限法と違い、あらかじめ税率と期限が法律で定められた時限措置。だからこそ議会の関与なしに即座に発動でき、判決当日の切り替えが可能だった。
-->

---

# 10%は入口にすぎず、15%と医薬品200%が控えている

> *時限措置の裏で、税率引き上げと品目別の高関税が視野に入る*

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="400" fill="#ffffff"/>
<line x1="80" y1="330" x2="880" y2="330" stroke="#8895ab" stroke-width="3"/>
<rect x="120" y="270" width="170" height="60" fill="#8fb0d6"/>
<text x="205" y="250" font-size="30" font-weight="bold" text-anchor="middle" fill="#2b5fa8">10%</text>
<text x="205" y="360" font-size="21" text-anchor="middle" fill="#44506a">一律課徴金（現在）</text>
<rect x="400" y="230" width="170" height="100" fill="#5a86bd"/>
<text x="485" y="210" font-size="30" font-weight="bold" text-anchor="middle" fill="#2b5fa8">15%</text>
<text x="485" y="360" font-size="21" text-anchor="middle" fill="#44506a">引き上げ方針</text>
<rect x="680" y="90" width="170" height="240" fill="#b5473f" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.15))"/>
<text x="765" y="70" font-size="30" font-weight="bold" text-anchor="middle" fill="#b5473f">最大200%</text>
<text x="765" y="360" font-size="21" text-anchor="middle" fill="#44506a">医薬品（可能性）</text>
<polygon points="300,300 390,270 390,290 300,320" fill="#b8c2d4"/>
<polygon points="580,270 670,200 670,220 580,290" fill="#b8c2d4"/>
</svg>
</div>

<!--
10%は最終形ではなく起点。15%への引き上げ方針、医薬品への最大200%関税の可能性を段階的に示し、時限措置の裏で恒久的・品目別の高関税が準備されていることを強調する。
-->

---

<!-- _class: lead -->
# 第3幕: 関税は3つの法的ルートを持つ構造だ

- なぜ一つのルートを塞いでも関税は生き残るのか

<!--
第3セクションの扉。IEEPA・122条・232条の3ルートを比較し、構造として理解する核心部分に入る。
-->

---

# IEEPA・122条・232条は要件も期限も対象も異なる別ルートだ

> *一つが違憲でも他が残る——だから関税は構造として読むべき*

| ルート | 根拠・名目 | 期限 | 現状 |
| --- | --- | --- | --- |
| IEEPA | 国際緊急経済権限 | 緊急事態が続く限り | 違憲判断で無効 |
| 通商法122条 | 国際収支対応 | 150日間の時限 | 10%課徴金で発動中 |
| 通商法232条 | 安全保障・品目別 | 恒久的に運用可 | 鉄鋼・医薬品等で継続 |

<!--
3ルートの比較表。緊急経済権限法は違憲で塞がれたが、122条は時限で発動中、232条は品目別に恒久運用できる。ルートが複数あるからこそ、一つを塞いでも関税全体は生き残る。
-->

---

# 一つの扉を閉じても別の扉が開く、が関税の構造だ

> *個別判決に一喜一憂せず、ルートの束として全体を捉える*

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="400" fill="#ffffff"/>
<rect x="390" y="30" width="180" height="70" rx="12" fill="#1a2b4a"/>
<text x="480" y="73" font-size="26" font-weight="bold" text-anchor="middle" fill="#ffffff">関税の維持</text>
<line x1="480" y1="100" x2="180" y2="180" stroke="#b8c2d4" stroke-width="3"/>
<line x1="480" y1="100" x2="480" y2="180" stroke="#b8c2d4" stroke-width="3"/>
<line x1="480" y1="100" x2="780" y2="180" stroke="#b8c2d4" stroke-width="3"/>
<rect x="70" y="185" width="220" height="120" rx="12" fill="#f5e9e9" stroke="#b5473f" stroke-width="2.5"/>
<text x="180" y="225" font-size="24" font-weight="bold" text-anchor="middle" fill="#b5473f">IEEPA</text>
<text x="180" y="258" font-size="21" text-anchor="middle" fill="#44506a">緊急経済権限</text>
<text x="180" y="288" font-size="22" text-anchor="middle" fill="#b5473f">違憲で閉鎖</text>
<rect x="370" y="185" width="220" height="120" rx="12" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="2.5"/>
<text x="480" y="225" font-size="24" font-weight="bold" text-anchor="middle" fill="#2b5fa8">122条</text>
<text x="480" y="258" font-size="21" text-anchor="middle" fill="#44506a">国際収支対応</text>
<text x="480" y="288" font-size="22" text-anchor="middle" fill="#2b5fa8">10%で発動中</text>
<rect x="670" y="185" width="220" height="120" rx="12" fill="#e8f4ec" stroke="#2f7d55" stroke-width="2.5"/>
<text x="780" y="225" font-size="24" font-weight="bold" text-anchor="middle" fill="#2f7d55">232条</text>
<text x="780" y="258" font-size="21" text-anchor="middle" fill="#44506a">安全保障・品目</text>
<text x="780" y="288" font-size="22" text-anchor="middle" fill="#2f7d55">恒久的に運用</text>
<text x="480" y="360" font-size="22" text-anchor="middle" fill="#44506a">1ルートが閉じても、残りが関税を支える</text>
</svg>
</div>

<!--
構造の図解。関税の維持という上位目的を、3つの法的ルートが下から支える。IEEPAが閉鎖されても122条と232条が残る。これが「関税は死なず」という主張の根拠。
-->

---

<!-- _class: lead -->
# 第4幕: 復活した関税は、家計と成長に重くのしかかる

- 違憲判決後も残る関税は、経済にどれだけの負担を課すのか

<!--
第4セクションの扉。経済効果——増税規模、家計負担、成長への影響に入る。
-->

---

# トランプ関税は1993年以来最大のGDP比増税になる

> *貿易政策が事実上の大型増税として家計と企業に転嫁される*

<div class="fig">
<svg viewBox="0 0 960 380" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="380" fill="#ffffff"/>
<text x="480" y="55" font-size="28" font-weight="bold" text-anchor="middle" fill="#1a2b4a">GDP比で見た増税規模</text>
<line x1="120" y1="310" x2="860" y2="310" stroke="#8895ab" stroke-width="3"/>
<rect x="200" y="170" width="160" height="140" fill="#b8c2d4"/>
<text x="280" y="200" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">中規模</text>
<text x="280" y="345" font-size="22" text-anchor="middle" fill="#44506a">過去の平均的増税</text>
<rect x="560" y="95" width="160" height="215" fill="#b5473f" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.15))"/>
<text x="640" y="128" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">最大級</text>
<text x="640" y="345" font-size="22" text-anchor="middle" fill="#b5473f">トランプ関税</text>
<text x="640" y="78" font-size="22" font-weight="bold" text-anchor="middle" fill="#b5473f">1993年以来</text>
</svg>
</div>

<!--
関税は輸入者・消費者が負担する事実上の増税。トランプ関税全体はGDP比で1993年以来最大の税負担増となり、貿易政策の装いをした大型増税である点を強調する。
-->

---

# 米世帯は年約1,500ドルを負担し、232条だけで成長を0.3%削る

> *関税は家計の実質購買力を削り、長期の潜在成長率も押し下げる*

<div class="fig">
<svg viewBox="0 0 960 360" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="360" fill="#ffffff"/>
<rect x="70" y="70" width="390" height="220" rx="14" fill="#f5e9e9" stroke="#b5473f" stroke-width="3"/>
<text x="265" y="130" font-size="26" text-anchor="middle" fill="#1a2b4a">米世帯あたり年間</text>
<text x="265" y="205" font-size="58" font-weight="bold" text-anchor="middle" fill="#b5473f">$1,500</text>
<text x="265" y="250" font-size="22" text-anchor="middle" fill="#44506a">平均の増税負担額</text>
<rect x="500" y="70" width="390" height="220" rx="14" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="3"/>
<text x="695" y="130" font-size="26" text-anchor="middle" fill="#1a2b4a">232条関税だけで</text>
<text x="695" y="205" font-size="58" font-weight="bold" text-anchor="middle" fill="#2b5fa8">-0.3%</text>
<text x="695" y="250" font-size="22" text-anchor="middle" fill="#44506a">長期GDPへの影響</text>
<text x="480" y="330" font-size="21" text-anchor="middle" fill="#44506a">報復措置がなくても成長率は押し下げられる</text>
</svg>
</div>

<!--
家計負担と成長影響を並べる。世帯あたり年約1,500ドルの負担、232条関税だけでも報復なしに長期GDPを0.3%押し下げる。関税は目に見えにくいが確実に成長と購買力を削る。
-->

---

# 違憲判決には実効性があった、が関税は6.7%で生き残った

> *実効関税率は下がったが、依然として高水準で輸入は逆に増えた*

<div class="fig">
<svg viewBox="0 0 960 380" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="380" fill="#ffffff"/>
<text x="480" y="50" font-size="28" font-weight="bold" text-anchor="middle" fill="#1a2b4a">判決後の実効関税率</text>
<line x1="140" y1="300" x2="820" y2="300" stroke="#8895ab" stroke-width="3"/>
<rect x="230" y="110" width="150" height="190" fill="#b5473f"/>
<text x="305" y="95" font-size="30" font-weight="bold" text-anchor="middle" fill="#b5473f">約10%</text>
<text x="305" y="335" font-size="22" text-anchor="middle" fill="#44506a">判決前（1月）</text>
<line x1="390" y1="180" x2="560" y2="235" stroke="#2b5fa8" stroke-width="4"/>
<polygon points="560,235 542,224 546,244" fill="#2b5fa8"/>
<rect x="580" y="172" width="150" height="128" fill="#2b5fa8"/>
<text x="655" y="157" font-size="30" font-weight="bold" text-anchor="middle" fill="#2b5fa8">6.7%</text>
<text x="655" y="335" font-size="22" text-anchor="middle" fill="#44506a">判決後</text>
<text x="480" y="368" font-size="21" text-anchor="middle" fill="#44506a">税率は低下、しかし輸入は15%超増加</text>
</svg>
</div>

<!--
判決の実効性は限定的だが確かにあった。実効関税率は約10%から6.7%へ低下した一方、輸入は15%超増えた。違憲判決は無意味ではなかったが、関税を消し去るには至らなかったというニュアンスを伝える。
-->

---

<!-- _class: lead -->
# 第5幕: 関税はインフレと日本企業の前提を揺らす

- 生き残った関税は、金融政策と日本企業の計画に何を迫るか

<!--
第5セクションの扉。インフレ・FOMCの利上げ転換への波及、そして日本企業への示唆と備えに入る。
-->

---

# 関税インフレがFOMCを利下げから利上げ観測へ転換させた

> *5月CPIは4.2%——関税が物価を押し上げ、金融緩和の道を塞ぐ*

<div class="fig">
<svg viewBox="0 0 960 380" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="380" fill="#ffffff"/>
<text x="480" y="50" font-size="28" font-weight="bold" text-anchor="middle" fill="#1a2b4a">FOMC見通しの転換</text>
<rect x="70" y="95" width="330" height="200" rx="14" fill="#eef1f6" stroke="#8895ab" stroke-width="2.5"/>
<text x="235" y="140" font-size="24" font-weight="bold" text-anchor="middle" fill="#44506a">3月時点</text>
<text x="235" y="200" font-size="32" font-weight="bold" text-anchor="middle" fill="#2f7d55">年内1回 利下げ</text>
<text x="235" y="250" font-size="22" text-anchor="middle" fill="#44506a">緩和方向の見通し</text>
<polygon points="410,195 480,175 480,215 410,195" fill="#b5473f"/>
<rect x="490" y="95" width="400" height="200" rx="14" fill="#f5e9e9" stroke="#b5473f" stroke-width="3" style="filter: drop-shadow(2px 3px 4px rgba(0,0,0,0.15))"/>
<text x="690" y="140" font-size="24" font-weight="bold" text-anchor="middle" fill="#b5473f">6月時点</text>
<text x="690" y="200" font-size="32" font-weight="bold" text-anchor="middle" fill="#b5473f">年内1回 利上げ</text>
<text x="690" y="250" font-size="22" text-anchor="middle" fill="#44506a">年末見通しは3.8%へ上方修正</text>
<text x="480" y="345" font-size="22" text-anchor="middle" fill="#44506a">5月CPI 4.2% が緩和の選択肢を狭めた</text>
</svg>
</div>

<!--
関税の波及効果。関税は輸入物価を通じてインフレを押し上げ、FOMCの見通しを利下げから利上げへ反転させた。5月CPI4.2%、年末見通し3.8%という数字で裏づける。
-->

---

# 日本企業は「関税は一時的」という前提を捨てるべきだ

> *調達コストと為替の両面で、関税を恒久前提に置き直す必要がある*

<div class="fig">
<svg viewBox="0 0 960 380" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="380" fill="#ffffff"/>
<rect x="60" y="70" width="400" height="250" rx="14" fill="#f5e9e9" stroke="#b5473f" stroke-width="3"/>
<text x="260" y="115" font-size="25" font-weight="bold" text-anchor="middle" fill="#b5473f">① 調達コスト</text>
<text x="260" y="170" font-size="22" text-anchor="middle" fill="#1a2b4a">10%は起点</text>
<text x="260" y="210" font-size="22" text-anchor="middle" fill="#44506a">15%・品目別高関税へ</text>
<text x="260" y="250" font-size="22" text-anchor="middle" fill="#44506a">段階的移行を織り込む</text>
<text x="260" y="295" font-size="22" text-anchor="middle" fill="#44506a">対米輸出の採算が動く</text>
<rect x="500" y="70" width="400" height="250" rx="14" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="3"/>
<text x="700" y="115" font-size="25" font-weight="bold" text-anchor="middle" fill="#2b5fa8">② 為替前提</text>
<text x="700" y="175" font-size="40" font-weight="bold" text-anchor="middle" fill="#1a2b4a">162円台</text>
<text x="700" y="220" font-size="22" text-anchor="middle" fill="#44506a">1986年以来の円安水準</text>
<text x="700" y="270" font-size="22" text-anchor="middle" fill="#44506a">米金利先高観が下支え</text>
<text x="700" y="300" font-size="20" text-anchor="middle" fill="#8895ab">（2026年7月1日時点）</text>
</svg>
</div>

<!--
日本企業への示唆。違憲判決で関税が消えると期待して計画を組むのは危険。関税は構造として続き、加えてドル円は2026年7月1日時点で162円台と1986年以来の円安。調達コストと為替の両面で前提を置き直す必要がある。
-->

---

# 備えは、関税感応度マップと150日カレンダーの二本立てだ

> *どの品目がどのルートで課税されるかを可視化し、期限を管理する*

<div class="fig">
<svg viewBox="0 0 960 380" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="380" fill="#ffffff"/>
<rect x="60" y="70" width="400" height="250" rx="14" fill="#e8f0fb" stroke="#2b5fa8" stroke-width="3"/>
<text x="260" y="115" font-size="26" font-weight="bold" text-anchor="middle" fill="#2b5fa8">① 関税感応度マップ</text>
<text x="260" y="165" font-size="22" text-anchor="middle" fill="#1a2b4a">品目 × 法的ルート</text>
<text x="260" y="205" font-size="22" text-anchor="middle" fill="#44506a">を一覧化</text>
<text x="260" y="250" font-size="22" text-anchor="middle" fill="#44506a">高関税品目を特定し</text>
<text x="260" y="288" font-size="22" text-anchor="middle" fill="#44506a">調達先を分散</text>
<rect x="500" y="70" width="400" height="250" rx="14" fill="#e8f4ec" stroke="#2f7d55" stroke-width="3"/>
<text x="700" y="115" font-size="26" font-weight="bold" text-anchor="middle" fill="#2f7d55">② 150日カレンダー</text>
<text x="700" y="165" font-size="22" text-anchor="middle" fill="#1a2b4a">時限措置の期限を</text>
<text x="700" y="205" font-size="22" text-anchor="middle" fill="#44506a">明示管理</text>
<text x="700" y="250" font-size="22" text-anchor="middle" fill="#44506a">延長・引き上げの</text>
<text x="700" y="288" font-size="22" text-anchor="middle" fill="#44506a">分岐を事前に準備</text>
</svg>
</div>

<!--
企業が取るべき備えを2つに整理。品目と法的ルートを掛け合わせた感応度マップで高関税品目を特定し調達を分散する。同時に150日の時限期限をカレンダー管理し、延長や引き上げの分岐を事前に準備する。
-->

---

<!-- _class: fit-82 -->
# 参照資料

> *判決・関税措置・経済効果の裏付けとなる主要出典*

- [ジェトロ 米最高裁がIEEPA関税を無効と判断（2026）](https://www.jetro.go.jp/biznews/2026/02/01180e362b158f46.html)
- [EY Japan 税務アラート IEEPA関税判決（2026）](https://www.ey.com/ja_jp/technical/ey-japan-tax-library/tax-alerts/2026/tax-alerts-03-03-02)
- [Tax Foundation Trump Tariffs Trade War Tracker（2026）](https://taxfoundation.org/research/all/federal/trump-tariffs-trade-war/)
- [ジェトロ 米FRB、4会合連続で政策金利を据え置き（2026）](https://www.jetro.go.jp/biznews/2026/06/0370be30a641b4e0.html)
- [第一生命経済研究所 2026年6月FOMCプレビュー（2026）](https://www.dlri.co.jp/report/macro/622959.html)
- [Investing.com 米国CPI（2026）](https://www.investing.com/economic-calendar/cpi-733)

<!--
出典一覧。関税判決はジェトロとEY、経済効果はTax Foundation、金融政策とインフレはジェトロ・第一生命経済研究所・Investing.comを参照。すべて2026年の資料。
-->
