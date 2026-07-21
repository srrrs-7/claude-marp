---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "エンタープライズAI本番化戦略 2026"
footer: "© 2026 Classmethod"
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
  
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# エンタープライズAIエージェント本番化戦略 2026

> *パイロット地獄を越える — ROI・スケール・ガバナンスの意思決定*

- テックリーダー / EM 向け
- PoCの成功で終わらせず、本番運用に到達させるための判断基準

<!--
本デッキのゴールは、エージェント導入を「試した」で終わらせず、本番・組織展開まで到達させるための意思決定フレームを提示すること。数値は2026年時点のリサーチに基づく。
-->

---

# パイロットの86〜89%は本番に到達しない — ガバナンスは設計要件だ

> *ガバナンスを最終チェックではなく着手前の設計要件に組み込んだ組織だけが本番へ進む*

<div class="fig">
<svg viewBox="0 0 900 420" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="70" width="360" height="120" rx="10" fill="#eef2ff" stroke="#6b46c1" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.12))"/>
<text x="240" y="110" text-anchor="middle" font-size="20" font-weight="bold" fill="#475569">パイロットの86〜89%</text>
<text x="240" y="145" text-anchor="middle" font-size="22" font-weight="bold" fill="#dc2626">本番未達で停滞</text>
<text x="240" y="172" text-anchor="middle" font-size="14" fill="#475569">= パイロット地獄</text>
<polygon points="440,130 500,130 500,115 540,140 500,165 500,150 440,150" fill="#059669"/>
<rect x="560" y="70" width="280" height="120" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.12))"/>
<text x="700" y="115" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">本番到達</text>
<text x="700" y="150" text-anchor="middle" font-size="22" font-weight="bold" fill="#059669">11〜14%</text>
<rect x="60" y="250" width="780" height="110" rx="10" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
<text x="450" y="290" text-anchor="middle" font-size="20" font-weight="bold" fill="#2563eb">分岐点：ガバナンスをいつ決めたか</text>
<text x="450" y="325" text-anchor="middle" font-size="16" fill="#475569">着手前に成功基準・権限・監査を設計 → 本番へ</text>
<text x="450" y="348" text-anchor="middle" font-size="16" fill="#475569">後付けでチェック → パイロット地獄で停滞</text>
</svg>
</div>

- 本番化の障壁は技術ではなく、意思決定の順序にある

<!--
BLUF。まず結論を言い切る。本番未達86〜89%、本番到達11〜14%。差を分けるのはガバナンスを設計段階で組み込んだかどうか。以降のスライドで根拠を示す。
-->

---

# 本日の道筋：状況→複雑化→問い→答え

> *SCQA構造で、なぜ止まるのかと、どう越えるのかを順に示す*

<div class="fig">
<svg viewBox="0 0 940 380" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="40" y="60" width="200" height="230" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"/>
<text x="140" y="95" text-anchor="middle" font-size="22" font-weight="bold" fill="#2563eb">S 状況</text>
<text x="140" y="140" text-anchor="middle" font-size="15" fill="#475569">80%が導入へ</text>
<text x="140" y="168" text-anchor="middle" font-size="15" fill="#475569">急速に普及</text>
<polygon points="250,175 285,175 285,162 320,188 285,213 285,200 250,200" fill="#6b46c1"/>
<rect x="330" y="60" width="200" height="230" rx="10" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"/>
<text x="430" y="95" text-anchor="middle" font-size="22" font-weight="bold" fill="#6b46c1">C 複雑化</text>
<text x="430" y="140" text-anchor="middle" font-size="15" fill="#475569">本番到達は</text>
<text x="430" y="168" text-anchor="middle" font-size="15" fill="#475569">11〜14%のみ</text>
<polygon points="540,175 575,175 575,162 610,188 575,213 575,200 540,200" fill="#6b46c1"/>
<rect x="620" y="60" width="140" height="230" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"/>
<text x="690" y="95" text-anchor="middle" font-size="22" font-weight="bold" fill="#dc2626">Q 問い</text>
<text x="690" y="150" text-anchor="middle" font-size="15" fill="#475569">なぜ止まる</text>
<text x="690" y="175" text-anchor="middle" font-size="15" fill="#475569">のか？</text>
<polygon points="770,175 800,175 800,162 835,188 800,213 800,200 770,200" fill="#059669"/>
<rect x="760" y="310" width="0" height="0" fill="none"/>
<rect x="845" y="60" width="55" height="230" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="872" y="180" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669" transform="rotate(90 872 180)">A 答え</text>
<text x="470" y="345" text-anchor="middle" font-size="16" fill="#475569">本デッキ前半（1〜15）は S・C・Q を扱い、失敗要因まで掘り下げる</text>
</svg>
</div>

- 前半で「なぜ止まるのか」を分解し、後半で「どう越えるのか（A）」を提示する

<!--
SCQAで全体像を提示。今回の担当範囲はS・C・Qまで。答え（A=対策）は後半デッキで扱う。
-->

---

<!-- _class: lead -->
# 状況：いま何が起きているか

- エージェント導入は例外から前提へ変わった
- まず普及の実態と、本番到達率のギャップを直視する

<!--
セクション扉。状況（Situation）パート。
-->

---

# エンタープライズの80%がエージェントを組込む段階に入った

> *Gartner予測では2024年33%から2026年80%へ、2年で普及率が2.4倍に拡大*

<div class="fig">
<svg viewBox="0 0 900 440" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="370" x2="860" y2="370" stroke="#475569" stroke-width="2"/>
<line x1="120" y1="60" x2="120" y2="370" stroke="#475569" stroke-width="2"/>
<text x="60" y="80" font-size="14" fill="#475569">100%</text>
<text x="70" y="220" font-size="14" fill="#475569">50%</text>
<text x="80" y="370" font-size="14" fill="#475569">0%</text>
<rect x="260" y="265" width="140" height="105" rx="6" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>
<text x="330" y="250" text-anchor="middle" font-size="24" font-weight="bold" fill="#2563eb">33%</text>
<text x="330" y="395" text-anchor="middle" font-size="18" fill="#475569">2024年</text>
<rect x="600" y="120" width="140" height="250" rx="6" fill="#2563eb" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
<text x="670" y="105" text-anchor="middle" font-size="24" font-weight="bold" fill="#2563eb">80%</text>
<text x="670" y="395" text-anchor="middle" font-size="18" fill="#475569">2026年</text>
<polygon points="400,300 590,175 600,190 585,150 545,178 610,205" fill="none"/>
<line x1="405" y1="260" x2="590" y2="140" stroke="#059669" stroke-width="3" stroke-dasharray="6 5"/>
<polygon points="578,133 600,128 590,150" fill="#059669"/>
<text x="470" y="180" font-size="16" font-weight="bold" fill="#059669">2年で2.4倍</text>
</svg>
</div>

- 「導入するか」ではなく「どう本番化するか」が問われるフェーズ

<!--
普及の実態。Gartner: エンタープライズアプリの33%(2024)→80%(2026)がエージェントを組込む。もはや検討段階ではない。
-->

---

# しかし本番に到達しているのは11〜14%に過ぎない

> *導入意欲と本番実装の間に大きな谷、2026年3月時点で到達率は約1割*

<div class="fig">
<svg viewBox="0 0 900 440" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<polygon points="120,70 780,70 700,150 200,150" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/>
<text x="450" y="118" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e3a8a">導入・PoC着手：80%</text>
<polygon points="205,160 695,160 620,240 280,240" fill="#a78bfa" stroke="#6b46c1" stroke-width="2"/>
<text x="450" y="208" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">PoC完了・評価：一部</text>
<polygon points="285,250 615,250 545,330 355,330" fill="#c4b5fd" stroke="#6b46c1" stroke-width="2"/>
<text x="450" y="298" text-anchor="middle" font-size="16" font-weight="bold" fill="#4c1d95">移行準備：さらに絞られる</text>
<polygon points="360,340 540,340 470,410 430,410" fill="#059669" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
<text x="450" y="385" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">本番：11〜14%</text>
<text x="820" y="115" text-anchor="middle" font-size="14" fill="#475569">広い入口</text>
<text x="640" y="385" text-anchor="middle" font-size="14" fill="#dc2626">狭い出口</text>
</svg>
</div>

- 入口の広さと出口の狭さのギャップが、本番化戦略の出発点

<!--
ファネル。80%が着手しても本番到達は11〜14%。2026年3月時点の数値。入口と出口の落差を可視化。
-->

---

# 86〜89%は本番の壁で停滞する「パイロット地獄」に陥っている

> *PoCは動くのに本番に出せない、この停滞状態が数の上での常態になっている*

<div class="fig">
<svg viewBox="0 0 900 420" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<circle cx="250" cy="210" r="150" fill="#fef2f2" stroke="#dc2626" stroke-width="3" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.12))"/>
<text x="250" y="175" text-anchor="middle" font-size="48" font-weight="bold" fill="#dc2626">86〜89%</text>
<text x="250" y="215" text-anchor="middle" font-size="20" font-weight="bold" fill="#475569">パイロット地獄で</text>
<text x="250" y="245" text-anchor="middle" font-size="20" font-weight="bold" fill="#475569">停滞</text>
<circle cx="680" cy="210" r="90" fill="#ecfdf5" stroke="#059669" stroke-width="3"/>
<text x="680" y="200" text-anchor="middle" font-size="34" font-weight="bold" fill="#059669">11〜14%</text>
<text x="680" y="235" text-anchor="middle" font-size="16" fill="#475569">本番へ突破</text>
<text x="450" y="390" text-anchor="middle" font-size="15" fill="#475569">pilot purgatory：技術検証は済んでいるのに運用要件で止まる状態</text>
</svg>
</div>

- 「動くこと」の証明はゴールではなく、本番要件との差分の始まり

<!--
パイロット地獄（pilot purgatory）の定義。PoCは成功しても本番運用に必要な要件（監査・権限・SLA等）を満たせず停滞する。
-->

---

# 平均ROI171%は「着手前に条件を決めた場合のみ」の数字だ

> *成功基準・ツール権限・ガバナンスを事前設計した組織に限りROIが実現する（US平均192%）*

<div class="fig">
<svg viewBox="0 0 920 430" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="50" y="60" width="400" height="310" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"/>
<text x="250" y="98" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">条件を満たした場合</text>
<text x="250" y="165" text-anchor="middle" font-size="44" font-weight="bold" fill="#059669">171%</text>
<text x="250" y="195" text-anchor="middle" font-size="16" fill="#475569">平均ROI（US平均 192%）</text>
<text x="75" y="240" font-size="15" fill="#475569">満たすべき3条件：</text>
<text x="90" y="272" font-size="15" fill="#475569">1. 成功基準を着手前に定義</text>
<text x="90" y="302" font-size="15" fill="#475569">2. ツール権限を事前に設計</text>
<text x="90" y="332" font-size="15" fill="#475569">3. ガバナンスを要件に組込</text>
<rect x="490" y="60" width="380" height="310" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="680" y="98" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">条件なしで着手した場合</text>
<text x="680" y="170" text-anchor="middle" font-size="30" font-weight="bold" fill="#dc2626">ROI未達</text>
<text x="680" y="210" text-anchor="middle" font-size="15" fill="#475569">評価軸が無く効果を証明できない</text>
<text x="680" y="260" text-anchor="middle" font-size="15" fill="#475569">権限設計の後付けで手戻り</text>
<text x="680" y="300" text-anchor="middle" font-size="15" fill="#475569">監査要件でリリース差し戻し</text>
</svg>
</div>

- ROIは技術性能ではなく、着手前の設計判断が生む

<!--
ROI171%(US 192%)は無条件の数字ではない。成功基準・権限・ガバナンスを事前設計した組織のみが到達する条件付きの平均であることを強調。
-->

---

# 組織展開に到達するのは15%未満、多くはPoCと本番の間で止まる

> *成熟度はPoC→本番→組織展開の3段で進むが、最終段に届くのは全体の1割強*

<div class="fig">
<svg viewBox="0 0 940 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="40" y="250" width="260" height="110" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="170" y="290" text-anchor="middle" font-size="20" font-weight="bold" fill="#2563eb">段階1：PoC</text>
<text x="170" y="320" text-anchor="middle" font-size="14" fill="#475569">実現性を検証</text>
<text x="170" y="345" text-anchor="middle" font-size="14" fill="#475569">大多数がここ</text>
<polygon points="305,290 345,290 345,275 385,305 345,335 345,320 305,320" fill="#6b46c1"/>
<rect x="390" y="170" width="260" height="110" rx="10" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
<text x="520" y="210" text-anchor="middle" font-size="20" font-weight="bold" fill="#6b46c1">段階2：本番</text>
<text x="520" y="240" text-anchor="middle" font-size="14" fill="#475569">単一業務で運用</text>
<text x="520" y="265" text-anchor="middle" font-size="14" fill="#dc2626">11〜14%が到達</text>
<polygon points="655,210 695,210 695,195 735,225 695,255 695,240 655,240" fill="#059669"/>
<rect x="680" y="70" width="240" height="110" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2" style="filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.12))"/>
<text x="800" y="110" text-anchor="middle" font-size="20" font-weight="bold" fill="#059669">段階3：組織展開</text>
<text x="800" y="140" text-anchor="middle" font-size="14" fill="#475569">全社スケール</text>
<text x="800" y="165" text-anchor="middle" font-size="14" fill="#dc2626">15%未満のみ到達</text>
</svg>
</div>

- 難所は段階1→2の壁だけでなく、2→3のスケールの壁にもある

<!--
成熟度モデル。PoC→本番→組織展開の3段。本番到達11〜14%、組織展開は15%未満。スケールの壁は本番化の後にも存在する。
-->

---

<!-- _class: lead -->
# なぜ本番で止まるのか

- 普及率と到達率のギャップの正体を4つの失敗要因に分解する
- いずれも技術以前の「設計・運用の欠落」に根がある

<!--
セクション扉。複雑化（Complication）と問い（Question）のパート。失敗要因の分解へ。
-->

---

# 本番を阻む4要因は、ガバナンス・技術負債・統合・ロックインに集約される

> *個別の不具合ではなく、着手前の設計判断の欠落という共通根を持つ*

<div class="fig">
<svg viewBox="0 0 900 430" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<circle cx="450" cy="215" r="78" fill="#475569" style="filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.15))"/>
<text x="450" y="205" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">本番化を</text>
<text x="450" y="230" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">阻む4要因</text>
<rect x="70" y="55" width="290" height="105" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="215" y="92" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">1. ガバナンス未成熟</text>
<text x="215" y="122" text-anchor="middle" font-size="14" fill="#475569">成熟モデルは5社に1社</text>
<text x="215" y="144" text-anchor="middle" font-size="14" fill="#475569">監査・権限が後付けに</text>
<rect x="540" y="55" width="290" height="105" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="685" y="92" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">2. 技術的負債</text>
<text x="685" y="122" text-anchor="middle" font-size="14" fill="#475569">PoC前提の作り込み</text>
<text x="685" y="144" text-anchor="middle" font-size="14" fill="#475569">本番移行で作り直し</text>
<rect x="70" y="280" width="290" height="105" rx="10" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
<text x="215" y="317" text-anchor="middle" font-size="18" font-weight="bold" fill="#6b46c1">3. 統合の落とし穴</text>
<text x="215" y="347" text-anchor="middle" font-size="14" fill="#475569">既存システム連携</text>
<text x="215" y="369" text-anchor="middle" font-size="14" fill="#475569">データ・認証で破綻</text>
<rect x="540" y="280" width="290" height="105" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
<text x="685" y="317" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">4. ロックイン</text>
<text x="685" y="347" text-anchor="middle" font-size="14" fill="#475569">ベンダー依存</text>
<text x="685" y="369" text-anchor="middle" font-size="14" fill="#475569">コスト不透明</text>
<line x1="360" y1="130" x2="388" y2="180" stroke="#94a3b8" stroke-width="2"/>
<line x1="540" y1="130" x2="512" y2="180" stroke="#94a3b8" stroke-width="2"/>
<line x1="360" y1="310" x2="388" y2="252" stroke="#94a3b8" stroke-width="2"/>
<line x1="540" y1="310" x2="512" y2="252" stroke="#94a3b8" stroke-width="2"/>
</svg>
</div>

<!--
4要因のオーバービュー。以降のスライドで1つずつ掘り下げる。共通根は着手前設計の欠落。
-->

---

# ガバナンスの成熟モデルを持つのは5社に1社にとどまる

> *残る8割は権限・監査・責任分界を後付けで対応し、本番リリースで差し戻される*

<div class="fig">
<svg viewBox="0 0 900 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="450" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">ガバナンス成熟モデルの保有状況（5社中）</text>
<circle cx="160" cy="180" r="55" fill="#059669" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"/>
<text x="160" y="187" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">成熟</text>
<circle cx="320" cy="180" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
<circle cx="480" cy="180" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
<circle cx="640" cy="180" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
<circle cx="800" cy="180" r="55" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
<text x="560" y="187" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">未成熟：4社（後付け対応）</text>
<rect x="90" y="280" width="720" height="90" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="450" y="315" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">後付けガバナンスのコスト</text>
<text x="450" y="345" text-anchor="middle" font-size="15" fill="#475569">監査・権限・責任分界の欠落 → 法務/セキュリティ差し戻し → 本番遅延</text>
</svg>
</div>

- 5社に1社という比率が、本番到達11〜14%とほぼ重なる

<!--
ガバナンス成熟モデルを持つのは5社に1社(=約20%)。この比率が本番到達率と近い。ガバナンスの有無が本番化の分岐であることを示唆。
-->

---

# PoC前提で作り込んだコードは、本番移行で技術的負債に変わる

> *検証用の近道が、監視・再現性・スケールを欠いたまま本番要件とぶつかる*

<div class="fig">
<svg viewBox="0 0 900 410" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="80" width="330" height="250" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="225" y="115" text-anchor="middle" font-size="19" font-weight="bold" fill="#2563eb">PoCでの近道</text>
<text x="85" y="160" font-size="15" fill="#475569">・ハードコードされた前提</text>
<text x="85" y="195" font-size="15" fill="#475569">・手動プロンプト調整</text>
<text x="85" y="230" font-size="15" fill="#475569">・評価・監視の欠如</text>
<text x="85" y="265" font-size="15" fill="#475569">・単一環境・単一データ</text>
<text x="85" y="300" font-size="15" fill="#475569">・エラー処理なし</text>
<polygon points="400,190 460,190 460,172 505,205 460,238 460,220 400,220" fill="#dc2626"/>
<rect x="520" y="80" width="330" height="250" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2" style="filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.12))"/>
<text x="685" y="115" text-anchor="middle" font-size="19" font-weight="bold" fill="#dc2626">本番で顕在化する負債</text>
<text x="545" y="160" font-size="15" fill="#475569">・設定外だし・再現性の欠如</text>
<text x="545" y="195" font-size="15" fill="#475569">・回帰テスト不能</text>
<text x="545" y="230" font-size="15" fill="#475569">・可観測性ゼロで障害盲目</text>
<text x="545" y="265" font-size="15" fill="#475569">・負荷・並行性で破綻</text>
<text x="545" y="300" font-size="15" fill="#475569">・大規模な作り直しが発生</text>
<text x="450" y="375" text-anchor="middle" font-size="15" fill="#475569">PoCの速さは、本番要件を先送りにした借金として跳ね返る</text>
</svg>
</div>

<!--
技術的負債。PoC前提の作り込み（ハードコード・監視欠如・単一環境）が本番移行で負債化し、大規模な作り直しを招く。
-->

---

# 既存システム連携こそが、本番移行で最も破綻しやすい接点だ

> *データ・認証・レガシーAPIの3点で統合が詰まり、PoCの外側で失敗する*

<div class="fig">
<svg viewBox="0 0 920 400" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="160" width="170" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="145" y="200" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">AIエージェント</text>
<text x="145" y="225" text-anchor="middle" font-size="13" fill="#475569">PoCでは単体で完結</text>
<polygon points="235,195 285,195 285,180 325,205 285,230 285,215 235,215" fill="#dc2626"/>
<rect x="340" y="55" width="250" height="85" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="465" y="90" text-anchor="middle" font-size="17" font-weight="bold" fill="#dc2626">データ統合の壁</text>
<text x="465" y="118" text-anchor="middle" font-size="13" fill="#475569">品質・鮮度・アクセス権</text>
<rect x="340" y="162" width="250" height="85" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="465" y="197" text-anchor="middle" font-size="17" font-weight="bold" fill="#dc2626">認証・認可の壁</text>
<text x="465" y="225" text-anchor="middle" font-size="13" fill="#475569">SSO・最小権限・監査ログ</text>
<rect x="340" y="269" width="250" height="85" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="465" y="304" text-anchor="middle" font-size="17" font-weight="bold" fill="#dc2626">レガシーAPIの壁</text>
<text x="465" y="332" text-anchor="middle" font-size="13" fill="#475569">仕様不整合・レート制限</text>
<polygon points="600,195 650,195 650,180 690,205 650,230 650,215 600,215" fill="#94a3b8"/>
<rect x="700" y="160" width="170" height="90" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
<text x="785" y="200" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569">基幹システム群</text>
<text x="785" y="225" text-anchor="middle" font-size="13" fill="#475569">ERP / CRM / DB</text>
</svg>
</div>

- 本番の失敗はモデル性能ではなく、システム境界の設計で起きる

<!--
統合の落とし穴。PoCでは単体完結でも、本番はデータ・認証・レガシーAPIの3点で既存システムと連携する必要があり、そこで破綻する。
-->

---

# ベンダーロックインとコスト不透明が、スケール判断を縛る

> *単一プロバイダ依存と従量課金の読めなさが、組織展開の意思決定を止める*

<div class="fig">
<svg viewBox="0 0 900 410" style="font-family:sans-serif;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="70" width="360" height="270" rx="12" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
<text x="240" y="108" text-anchor="middle" font-size="19" font-weight="bold" fill="#d97706">ベンダーロックイン</text>
<text x="85" y="155" font-size="15" fill="#475569">・独自API・独自フレームに依存</text>
<text x="85" y="195" font-size="15" fill="#475569">・モデル切替に多大な移行コスト</text>
<text x="85" y="235" font-size="15" fill="#475569">・価格改定・提供終了のリスク</text>
<text x="85" y="275" font-size="15" fill="#475569">・交渉力を失い条件を飲まされる</text>
<text x="85" y="315" font-size="15" fill="#475569">・出口戦略が描けない</text>
<rect x="480" y="70" width="360" height="270" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2" style="filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.12))"/>
<text x="660" y="108" text-anchor="middle" font-size="19" font-weight="bold" fill="#dc2626">コスト不透明</text>
<text x="505" y="155" font-size="15" fill="#475569">・トークン従量で総額が読めない</text>
<text x="505" y="195" font-size="15" fill="#475569">・エージェントの再試行で急増</text>
<text x="505" y="235" font-size="15" fill="#475569">・単価とROIの対応が不明瞭</text>
<text x="505" y="275" font-size="15" fill="#475569">・予算化・稟議が通らない</text>
<text x="505" y="315" font-size="15" fill="#475569">・スケール時に採算が崩れる</text>
</svg>
</div>

- 出口戦略とコスト予測性が無いと、本番の次の一歩を承認できない

<!--
ロックインとコスト不透明。単一ベンダー依存とトークン従量課金の読めなさが、組織展開の意思決定を縛る。出口戦略とコスト予測性が鍵。
-->

---

<!-- _class: fit-64 -->
# 成功基準を後付けにすると、ROIは永遠に証明できない

> *評価指標を初日に決めないパイロットは、成果を語る言葉を持たないまま終わる*

- 多くのPoCは「動くか」だけを問い、「何をもって成功か」を定義しないまま開始する
- 運用後に指標を探し始めるため、既存プロセスとの比較基準が存在しない
- 経営層はコスト回収の根拠を求めるが、計測設計がないため数字を出せない

<div class="fig">
<svg viewBox="0 0 900 440" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="440" fill="#ffffff"/>
<text x="450" y="40" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">成功基準の設定タイミングが命運を分ける</text>
<rect x="60" y="90" width="340" height="300" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="230" y="125" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">後付け型（失敗）</text>
<text x="230" y="165" text-anchor="middle" font-size="15" fill="#475569">構築 → リリース → 「効果は？」</text>
<text x="230" y="200" text-anchor="middle" font-size="15" fill="#475569">比較対象の実測値がない</text>
<text x="230" y="235" text-anchor="middle" font-size="15" fill="#475569">指標を探すが再現できない</text>
<text x="230" y="270" text-anchor="middle" font-size="15" fill="#475569">経営層への説明が主観的</text>
<text x="230" y="320" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">→ 継続予算が付かず終了</text>
<rect x="500" y="90" width="340" height="300" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="670" y="125" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">先行定義型（成功）</text>
<text x="670" y="165" text-anchor="middle" font-size="15" fill="#475569">基準定義 → 現状計測 → 構築</text>
<text x="670" y="200" text-anchor="middle" font-size="15" fill="#475569">ベースライン実測値を保持</text>
<text x="670" y="235" text-anchor="middle" font-size="15" fill="#475569">改善幅を定量で提示できる</text>
<text x="670" y="270" text-anchor="middle" font-size="15" fill="#475569">投資判断が客観的データ基盤</text>
<text x="670" y="320" text-anchor="middle" font-size="16" font-weight="bold" fill="#059669">→ 拡大投資の合意形成</text>
<polygon points="415,240 480,240 480,230 500,245 480,260 480,250 415,250" fill="#6b46c1"/>
</svg>
</div>

<!--
ROIが見えないのは効果がないからではなく、効果を測る設計を最初にしていないから。成功基準は構築前に固定するのが鉄則。
-->

---

<!-- _class: fit-64 -->
# スケールを「延長」と誤解すると、パイロットの成功が本番で崩れる

> *PoCと全社展開は連続作業ではなく、要件も体制も別物の独立プログラムである*

- パイロットは限定データ・少数ユーザー・寛容な例外処理で成立している
- そのまま台数を増やせば動くという前提が、本番の負荷・多様性で破綻する
- 運用・監視・権限・コスト管理は拡大時に初めて必須要件として顕在化する

<div class="fig">
<svg viewBox="0 0 900 430" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="430" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">「延長」の思い込みと現実のギャップ</text>
<rect x="70" y="90" width="200" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="170" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#2563eb">PoC</text>
<text x="170" y="158" text-anchor="middle" font-size="13" fill="#475569">1チーム・限定データ</text>
<text x="400" y="120" text-anchor="middle" font-size="15" fill="#94a3b8">思い込み: そのまま拡大</text>
<line x1="270" y1="135" x2="600" y2="135" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
<polygon points="600,128 618,135 600,142" fill="#94a3b8"/>
<rect x="620" y="90" width="210" height="90" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
<text x="725" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569">全社展開</text>
<text x="725" y="158" text-anchor="middle" font-size="13" fill="#475569">単なる台数増？</text>
<rect x="70" y="240" width="760" height="150" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="450" y="275" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">現実: 拡大で新たに必須化する非機能要件</text>
<text x="200" y="315" text-anchor="middle" font-size="14" fill="#475569">権限・監査</text>
<text x="370" y="315" text-anchor="middle" font-size="14" fill="#475569">コスト上限</text>
<text x="540" y="315" text-anchor="middle" font-size="14" fill="#475569">障害時運用</text>
<text x="700" y="315" text-anchor="middle" font-size="14" fill="#475569">多様な入力</text>
<text x="200" y="355" text-anchor="middle" font-size="14" fill="#475569">SLA</text>
<text x="370" y="355" text-anchor="middle" font-size="14" fill="#475569">教育・定着</text>
<text x="540" y="355" text-anchor="middle" font-size="14" fill="#475569">変更管理</text>
<text x="700" y="355" text-anchor="middle" font-size="14" fill="#475569">セキュリティ</text>
</svg>
</div>

<!--
スケールは延長線上の作業ではない。展開フェーズを独立したプログラムとして設計・予算化しないと必ず詰まる。
-->

---

<!-- _class: fit-94 -->
# 失敗要因は「頻度×影響度」で見ると優先順位が明確になる

> *高頻度かつ高影響の右上ゾーンから潰すのが本番化の最短経路*

<div class="fig">
<svg viewBox="0 0 900 470" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="470" fill="#ffffff"/>
<line x1="120" y1="400" x2="820" y2="400" stroke="#475569" stroke-width="2"/>
<line x1="120" y1="400" x2="120" y2="60" stroke="#475569" stroke-width="2"/>
<polygon points="820,400 838,400 828,394 828,406" fill="#475569"/>
<polygon points="120,60 114,78 120,72 126,78" fill="#475569"/>
<text x="470" y="440" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569">発生頻度 →</text>
<text x="75" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569" transform="rotate(-90 75 230)">影響度 →</text>
<line x1="470" y1="400" x2="470" y2="60" stroke="#e2e8f0" stroke-width="1"/>
<line x1="120" y1="230" x2="820" y2="230" stroke="#e2e8f0" stroke-width="1"/>
<rect x="475" y="65" width="340" height="160" rx="8" fill="#fef2f2" opacity="0.6"/>
<text x="645" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">最優先で対処</text>
<circle cx="600" cy="140" r="9" fill="#dc2626"/><text x="615" y="144" font-size="13" fill="#475569">成功基準の欠如</text>
<circle cx="700" cy="185" r="9" fill="#dc2626"/><text x="715" y="189" font-size="13" fill="#475569">ガバナンス後付け</text>
<circle cx="560" cy="195" r="9" fill="#dc2626"/><text x="575" y="199" font-size="13" fill="#475569">既存WFのまま自動化</text>
<circle cx="300" cy="150" r="9" fill="#6b46c1"/><text x="170" y="154" font-size="13" fill="#475569">モデル選定ミス</text>
<circle cx="250" cy="200" r="9" fill="#6b46c1"/><text x="140" y="204" font-size="13" fill="#475569">過剰スコープ</text>
<circle cx="620" cy="320" r="9" fill="#2563eb"/><text x="635" y="324" font-size="13" fill="#475569">UI改善要望</text>
<circle cx="300" cy="340" r="9" fill="#94a3b8"/><text x="315" y="344" font-size="13" fill="#475569">軽微なプロンプト調整</text>
<text x="290" y="90" text-anchor="middle" font-size="13" fill="#6b46c1">影響大・低頻度</text>
<text x="290" y="390" text-anchor="middle" font-size="13" fill="#94a3b8">後回し可</text>
</svg>
</div>

- 右上（高頻度×高影響）に集中する3要因が、本番未達86%の主因を占める

<!--
限られたリソースは右上ゾーンから。成功基準・ガバナンス後付け・既存WFのまま自動化の3つが最優先。
-->

---

<!-- _class: lead -->
# 本番化を阻む2つの壁

- 個別の失敗要因は、突き詰めると2つの構造的な壁に集約される
- 壁① ガバナンスを「作り終えてから」足そうとする
- 壁② 現行ワークフローを「そのまま」自動化してしまう
- 次章では、この2つの壁がなぜ生まれ、どう乗り越えるかを扱う

<!--
ここは章の切れ目。2つの壁を提示し、後半の指針セクションへ橋渡しする。
-->

---

<!-- _class: fit-70 -->
# 壁①：ガバナンスは後から足せない設計制約である

> *権限・監査・ガードレールは構築後の外付けでは機能せず、初期設計に織り込むしかない*

- リリース直前に統制を追加しようとすると、権限モデルの作り直しが必要になる
- 監査ログやアクセス制御は、エージェントの行動設計と不可分に結びついている
- 後付けは開発をやり直すか、統制を諦めるかの二択を迫る

<div class="fig">
<svg viewBox="0 0 900 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="420" fill="#ffffff"/>
<text x="450" y="40" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">後付けガバナンスが破綻する構造</text>
<rect x="60" y="90" width="160" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="140" y="132" text-anchor="middle" font-size="15" fill="#2563eb">構築</text>
<rect x="270" y="90" width="160" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="350" y="132" text-anchor="middle" font-size="15" fill="#2563eb">動作確認</text>
<rect x="480" y="90" width="160" height="70" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="560" y="124" text-anchor="middle" font-size="15" fill="#dc2626">統制を後付け</text>
<text x="560" y="146" text-anchor="middle" font-size="12" fill="#dc2626">← ここで破綻</text>
<polygon points="220,125 262,125 262,118 278,128 262,138 262,131 220,131" fill="#94a3b8"/>
<polygon points="430,125 472,125 472,118 488,128 472,138 472,131 430,131" fill="#94a3b8"/>
<rect x="60" y="220" width="780" height="160" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
<text x="450" y="255" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">後付けで直面する3つの手戻り</text>
<text x="230" y="300" text-anchor="middle" font-size="14" fill="#475569">権限モデルの再設計</text>
<text x="450" y="300" text-anchor="middle" font-size="14" fill="#475569">監査ログの後付け不能</text>
<text x="680" y="300" text-anchor="middle" font-size="14" fill="#475569">承認フロー未接続</text>
<text x="450" y="350" text-anchor="middle" font-size="15" font-weight="bold" fill="#dc2626">→ 開発やり直し or 統制の断念という二択</text>
</svg>
</div>

<!--
ガバナンスはコンプライアンスの最終チェックではなく、アーキテクチャの初期制約。行動設計と一体で考える。
-->

---

<!-- _class: fit-64 -->
# 壁②：現行フローをなぞる自動化は、非効率までコピーする

> *問うべきは「今の手順を自動化するか」ではなく「エージェント前提ならどう設計するか」*

- 既存業務は人間の制約（手作業・逐次承認・部門分断）に最適化されている
- その手順をそのままエージェントに置き換えると、非効率も一緒に固定化する
- ゼロから設計し直すと、判断の統合・並列化・不要な承認の削除が可能になる

<div class="fig">
<svg viewBox="0 0 900 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="420" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">なぞる自動化 vs ゼロから再設計</text>
<text x="230" y="78" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">現行なぞり</text>
<rect x="120" y="95" width="220" height="45" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/><text x="230" y="123" text-anchor="middle" font-size="13" fill="#475569">手作業ステップA</text>
<rect x="120" y="160" width="220" height="45" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/><text x="230" y="188" text-anchor="middle" font-size="13" fill="#475569">承認待ちB</text>
<rect x="120" y="225" width="220" height="45" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/><text x="230" y="253" text-anchor="middle" font-size="13" fill="#475569">部門引継ぎC</text>
<rect x="120" y="290" width="220" height="45" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/><text x="230" y="318" text-anchor="middle" font-size="13" fill="#475569">手作業ステップD</text>
<text x="230" y="368" text-anchor="middle" font-size="13" fill="#dc2626">非効率もそのまま固定化</text>
<polygon points="360,205 410,205 410,196 440,211 410,226 410,217 360,217" fill="#6b46c1"/>
<text x="680" y="78" text-anchor="middle" font-size="16" font-weight="bold" fill="#059669">ゼロから再設計</text>
<rect x="560" y="120" width="240" height="55" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/><text x="680" y="153" text-anchor="middle" font-size="13" fill="#475569">判断を統合し並列実行</text>
<rect x="560" y="195" width="240" height="55" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/><text x="680" y="228" text-anchor="middle" font-size="13" fill="#475569">不要な承認を削除</text>
<rect x="560" y="270" width="240" height="55" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/><text x="680" y="303" text-anchor="middle" font-size="13" fill="#475569">例外のみ人間が介在</text>
<text x="680" y="368" text-anchor="middle" font-size="13" fill="#059669">エージェント前提の最適構造</text>
</svg>
</div>

<!--
エージェントは人間の手順を速くする道具ではない。前提が変わるので、業務フローそのものを問い直す。
-->

---

<!-- _class: fit-58 -->
# 課題の要点：本番化の失敗は個別ミスでなく構造問題

> *成功基準の後付け・スケールの誤解・2つの壁は、いずれも「初期設計の欠落」に起因する*

- パイロット86%が本番未達という現実は、技術力ではなく設計プロセスの問題
- 成功基準を後付けにすると、ROIを証明する言葉を最後まで持てない
- スケールを延長と誤解すると、非機能要件が拡大時に一斉に噴出する
- ガバナンスの後付けと現行フローのなぞりが、2つの構造的な壁を形成する
- 共通する根本原因は、本番運用を前提とした初期設計の欠落にある

<!--
Qセクションの締め。ここまでの課題を1枚に集約し、後半の指針セクションへの問いを立てる。
-->

---

<!-- _class: lead -->
# 本番化ロードマップ

- 課題の根本原因は「初期設計の欠落」— ならば設計プロセスを変える
- 指針① ワークフロー先行設計：全決定点を洗い出す
- 指針② ガバナンスを設計要件にする
- 指針③ スケールを独立プログラムとして構造化する
- 指針④ 正直なコストモデルと成功基準を初日に決める

<!--
解決策セクションの扉。4つの指針を提示し、順に展開する。
-->

---

<!-- _class: fit-64 -->
# 指針①：全決定点を洗い出してから、エージェントを配置する

> *自動化の前に業務の意思決定ポイントを地図化し、どこを任せどこを残すかを決める*

- 業務フローを「入力→判断→行動」の連鎖として分解し、決定点を明示する
- 各決定点ごとに、完全自動・人間承認・エスカレーションのいずれかを割り当てる
- 地図があれば、統制の埋め込み位置とコスト発生点が設計時に可視化される

<div class="fig">
<svg viewBox="0 0 900 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="400" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">意思決定マップ：任せる／残すの割り当て</text>
<rect x="40" y="150" width="130" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="105" y="192" text-anchor="middle" font-size="14" fill="#2563eb">入力受付</text>
<circle cx="290" cy="185" r="48" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="290" y="180" text-anchor="middle" font-size="13" fill="#059669">決定点1</text><text x="290" y="200" text-anchor="middle" font-size="12" fill="#475569">完全自動</text>
<circle cx="470" cy="185" r="48" fill="#faf5ff" stroke="#6b46c1" stroke-width="2"/><text x="470" y="180" text-anchor="middle" font-size="13" fill="#6b46c1">決定点2</text><text x="470" y="200" text-anchor="middle" font-size="12" fill="#475569">人間承認</text>
<circle cx="650" cy="185" r="48" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="650" y="180" text-anchor="middle" font-size="13" fill="#dc2626">決定点3</text><text x="650" y="200" text-anchor="middle" font-size="12" fill="#475569">エスカレ</text>
<rect x="770" y="150" width="110" height="70" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"/><text x="825" y="192" text-anchor="middle" font-size="14" fill="#475569">完了</text>
<polygon points="170,185 232,185 232,177 244,187 232,197 232,189 170,189" fill="#94a3b8"/>
<polygon points="338,185 410,185 410,177 422,187 410,197 410,189 338,189" fill="#94a3b8"/>
<polygon points="518,185 590,185 590,177 602,187 590,197 590,189 518,189" fill="#94a3b8"/>
<polygon points="698,185 758,185 758,177 770,187 758,197 758,189 698,189" fill="#94a3b8"/>
<text x="450" y="300" text-anchor="middle" font-size="14" fill="#475569">各決定点に自動化レベルと統制要件を紐付けて設計する</text>
</svg>
</div>

<!--
ワークフロー先行設計。まず決定点の地図を作り、自動化レベルを割り当ててからエージェントを実装する。
-->

---

<!-- _class: fit-64 -->
# 指針②：ガバナンスを最終チェックでなく設計要件に格上げする

> *権限・監査・ガードレールを機能要件と同列に定義し、アーキテクチャに埋め込む*

- 各エージェントの権限を最小権限で定義し、行動範囲を設計時に制約する
- 全行動を監査可能なログに残し、後から追跡・説明できる状態を初期から保つ
- 危険な操作には自動ガードレールと人間承認ゲートを構造として組み込む

<div class="fig">
<svg viewBox="0 0 900 410" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="410" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">ガバナンスを内蔵したエージェント構造</text>
<rect x="330" y="160" width="240" height="90" rx="10" fill="#faf5ff" stroke="#6b46c1" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="450" y="200" text-anchor="middle" font-size="16" font-weight="bold" fill="#6b46c1">エージェント中核</text>
<text x="450" y="228" text-anchor="middle" font-size="13" fill="#475569">判断・行動ロジック</text>
<rect x="70" y="90" width="200" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="170" y="122" text-anchor="middle" font-size="14" font-weight="bold" fill="#2563eb">最小権限</text><text x="170" y="143" text-anchor="middle" font-size="12" fill="#475569">行動範囲を制約</text>
<rect x="630" y="90" width="200" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="730" y="122" text-anchor="middle" font-size="14" font-weight="bold" fill="#2563eb">監査ログ</text><text x="730" y="143" text-anchor="middle" font-size="12" fill="#475569">全行動を記録</text>
<rect x="70" y="250" width="200" height="70" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="170" y="282" text-anchor="middle" font-size="14" font-weight="bold" fill="#059669">ガードレール</text><text x="170" y="303" text-anchor="middle" font-size="12" fill="#475569">危険操作を遮断</text>
<rect x="630" y="250" width="200" height="70" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="730" y="282" text-anchor="middle" font-size="14" font-weight="bold" fill="#059669">承認ゲート</text><text x="730" y="303" text-anchor="middle" font-size="12" fill="#475569">高リスクは人間へ</text>
<line x1="270" y1="125" x2="330" y2="180" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="630" y1="125" x2="570" y2="180" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="270" y1="285" x2="330" y2="230" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="630" y1="285" x2="570" y2="230" stroke="#94a3b8" stroke-width="1.5"/>
</svg>
</div>

<!--
ガバナンスは4点セット（最小権限・監査ログ・ガードレール・承認ゲート）を中核に内蔵する設計要件。
-->

---

<!-- _class: fit-64 -->
# 指針③：スケールを独立したプログラムとして構造化する

> *PoC成功の勢いで拡大せず、専用の体制・予算・非機能要件を持つ別プログラムを立てる*

- パイロットとは別に、展開専任のオーナーと予算・スケジュールを割り当てる
- 負荷・多様な入力・障害復旧・コスト上限を、拡大フェーズの正式要件とする
- 段階ゲート（限定→部門→全社）を設け、各段で撤退・修正の判断を可能にする

<div class="fig">
<svg viewBox="0 0 900 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="400" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">段階ゲート付きスケールプログラム</text>
<rect x="50" y="120" width="200" height="110" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="150" y="155" text-anchor="middle" font-size="15" font-weight="bold" fill="#2563eb">限定展開</text><text x="150" y="182" text-anchor="middle" font-size="12" fill="#475569">1部門・実負荷</text><text x="150" y="205" text-anchor="middle" font-size="12" fill="#475569">非機能を検証</text>
<rect x="350" y="120" width="200" height="110" rx="10" fill="#faf5ff" stroke="#6b46c1" stroke-width="2"/><text x="450" y="155" text-anchor="middle" font-size="15" font-weight="bold" fill="#6b46c1">部門展開</text><text x="450" y="182" text-anchor="middle" font-size="12" fill="#475569">複数チーム</text><text x="450" y="205" text-anchor="middle" font-size="12" fill="#475569">運用体制を確立</text>
<rect x="650" y="120" width="200" height="110" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="750" y="155" text-anchor="middle" font-size="15" font-weight="bold" fill="#059669">全社展開</text><text x="750" y="182" text-anchor="middle" font-size="12" fill="#475569">全業務・SLA運用</text><text x="750" y="205" text-anchor="middle" font-size="12" fill="#475569">定常改善サイクル</text>
<polygon points="250,175 290,175 290,165 320,180 290,195 290,185 250,185" fill="#6b46c1"/>
<polygon points="550,175 590,175 590,165 620,180 590,195 590,185 550,185" fill="#6b46c1"/>
<text x="290" y="290" text-anchor="middle" font-size="13" fill="#dc2626">ゲート判断</text>
<text x="590" y="290" text-anchor="middle" font-size="13" fill="#dc2626">ゲート判断</text>
<text x="450" y="340" text-anchor="middle" font-size="14" fill="#475569">各ゲートで撤退・修正・続行を判断し、失敗を局所に留める</text>
</svg>
</div>

<!--
スケールは独立プログラム。専任オーナー・予算・段階ゲートで、拡大リスクを構造的に管理する。
-->

---

<!-- _class: fit-64 -->
# 指針④：コストと成功基準を初日に、正直な数字で固定する

> *運用コストとKPIをローンチ前に確定し、ベースラインを実測してから構築を始める*

- トークン・API・監視・保守を含む総コストを、楽観でなく実運用前提で見積もる
- 成功KPI（処理時間・精度・コスト削減額など）を構築前に数値で定義する
- 現状のベースラインを実測し、改善幅を後から定量比較できる状態を作る

<div class="fig">
<svg viewBox="0 0 900 410" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="900" height="410" fill="#ffffff"/>
<text x="450" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">初日に固定する2つの数字</text>
<rect x="70" y="85" width="350" height="270" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="245" y="120" text-anchor="middle" font-size="17" font-weight="bold" fill="#2563eb">正直なコストモデル</text>
<text x="245" y="160" text-anchor="middle" font-size="14" fill="#475569">トークン・API従量課金</text>
<text x="245" y="195" text-anchor="middle" font-size="14" fill="#475569">監視・ログ基盤の運用費</text>
<text x="245" y="230" text-anchor="middle" font-size="14" fill="#475569">保守・再学習・人的レビュー</text>
<text x="245" y="265" text-anchor="middle" font-size="14" fill="#475569">失敗リトライの隠れコスト</text>
<text x="245" y="315" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">楽観見積りを禁止する</text>
<rect x="480" y="85" width="350" height="270" rx="12" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="655" y="120" text-anchor="middle" font-size="17" font-weight="bold" fill="#059669">成功基準（KPI）</text>
<text x="655" y="160" text-anchor="middle" font-size="14" fill="#475569">処理時間の目標値</text>
<text x="655" y="195" text-anchor="middle" font-size="14" fill="#475569">出力精度・エラー率</text>
<text x="655" y="230" text-anchor="middle" font-size="14" fill="#475569">コスト削減額・回収期間</text>
<text x="655" y="265" text-anchor="middle" font-size="14" fill="#475569">現状ベースラインを実測</text>
<text x="655" y="315" text-anchor="middle" font-size="14" font-weight="bold" fill="#059669">構築前に数値で固定する</text>
</svg>
</div>

<!--
コストは隠れ費用まで正直に。KPIは構築前に固定し、ベースラインを実測して改善を語れるようにする。
-->

---

# 90日ロードマップ：PoCから型化、そして組織展開へ

> *30日で検証、60日で型を固め、90日で展開基盤を整える段階的な進め方*

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="0" y="0" width="960" height="400" fill="#ffffff"/>
<text x="480" y="38" text-anchor="middle" font-size="22" font-weight="bold" fill="#475569">90日で本番化基盤を築く</text>
<line x1="80" y1="110" x2="900" y2="110" stroke="#cbd5e1" stroke-width="3"/>
<circle cx="200" cy="110" r="10" fill="#2563eb"/>
<circle cx="480" cy="110" r="10" fill="#6b46c1"/>
<circle cx="760" cy="110" r="10" fill="#059669"/>
<text x="200" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#2563eb">Day 0-30</text>
<text x="480" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#6b46c1">Day 31-60</text>
<text x="760" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#059669">Day 61-90</text>
<rect x="70" y="150" width="260" height="200" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="200" y="180" text-anchor="middle" font-size="15" font-weight="bold" fill="#2563eb">PoC・検証</text>
<text x="200" y="215" text-anchor="middle" font-size="13" fill="#475569">決定点マップ作成</text>
<text x="200" y="245" text-anchor="middle" font-size="13" fill="#475569">KPI・コスト初期定義</text>
<text x="200" y="275" text-anchor="middle" font-size="13" fill="#475569">ベースライン実測</text>
<text x="200" y="305" text-anchor="middle" font-size="13" fill="#475569">限定範囲で動作検証</text>
<rect x="350" y="150" width="260" height="200" rx="10" fill="#faf5ff" stroke="#6b46c1" stroke-width="2"/>
<text x="480" y="180" text-anchor="middle" font-size="15" font-weight="bold" fill="#6b46c1">型化・標準化</text>
<text x="480" y="215" text-anchor="middle" font-size="13" fill="#475569">ガバナンス内蔵設計</text>
<text x="480" y="245" text-anchor="middle" font-size="13" fill="#475569">監視・監査を整備</text>
<text x="480" y="275" text-anchor="middle" font-size="13" fill="#475569">運用手順を文書化</text>
<text x="480" y="305" text-anchor="middle" font-size="13" fill="#475569">1部門で実負荷運用</text>
<rect x="630" y="150" width="260" height="200" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
<text x="760" y="180" text-anchor="middle" font-size="15" font-weight="bold" fill="#059669">組織展開</text>
<text x="760" y="215" text-anchor="middle" font-size="13" fill="#475569">展開専任体制を設置</text>
<text x="760" y="245" text-anchor="middle" font-size="13" fill="#475569">段階ゲートで拡大</text>
<text x="760" y="275" text-anchor="middle" font-size="13" fill="#475569">SLA・定常改善開始</text>
<text x="760" y="305" text-anchor="middle" font-size="13" fill="#475569">ROIを数値で報告</text>
<polygon points="330,250 350,250 350,242 366,252 350,262 350,254 330,254" fill="#94a3b8"/>
<polygon points="610,250 630,250 630,242 646,252 630,262 630,254 610,254" fill="#94a3b8"/>
</svg>
</div>

<!--
90日を3フェーズに区切る。検証→型化→展開の順で、各フェーズにゲートを置いて進める。
-->

---

<!-- _class: fit-70 -->
# 導入チェックリスト：本番設計の4点を点検する

> *4指針を実行可能なチェック項目に落とし込み、明日から動ける状態にする*

- ☐ ワークフロー設計：全決定点を洗い出し、自動化レベルを割り当てたか
- ☐ ガバナンス：最小権限・監査ログ・ガードレール・承認ゲートを設計に内蔵したか
- ☐ 成功基準：KPIを構築前に数値で定義し、ベースラインを実測したか
- ☐ コストモデル：隠れコストを含め、楽観でない総額を見積もったか

<!--
4指針をチェックリスト化し、明日から着手できる3アクションで締める。実行への橋渡し。
-->

---

# 今日から始める3つのアクション

> *設計判断を明日から動ける形に落とす*

- アクション1：既存パイロットの決定点マップを今週中に作成する
- アクション2：成功KPIとベースラインを構築再開前に固定する
- アクション3：スケールを独立プログラムとして予算・オーナーを立てる


---

<!-- _class: lead fit-82 -->
# まとめ：本番化の壁は設計プロセスにある

> *本番化の壁は技術ではなく設計プロセスにある — 初期設計に運用を織り込め*

- 本番化の壁は技術ではなく設計プロセスにある — 初期設計に運用を織り込め
- 成功基準を初日に、ガバナンスを設計要件に、スケールを独立プログラムに
- パイロットの14%側に入る鍵は、作る前の設計判断に集約される


---

<!-- _class: fit-58 -->
# 参考文献・出典

- 以下の公開情報を参照
- Enterprise Agent Deployment Maturity Model 2026 — AgentMarketCap: https://agentmarketcap.ai/blog/2026/04/11/enterprise-agent-deployment-maturity-model-2026
- Why 86% of AI Agent Pilots Never Reach Production — Naveera: https://naveeratech.com/blog/why-86-of-ai-agent-pilots-never-reach-production-and-how-to-be-in-the-14/
- Scaling AI Agents: Pilot to Enterprise in 2026 — Zelu AI: https://www.zeluai.com/blog/scaling-ai-agents
- Enterprise AI Agents in Production — ToTheNew: https://www.tothenew.com/insights/article/enterprise-ai-agents-production-2026

