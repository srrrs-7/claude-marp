---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "Kimi K3 Deep Dive"
footer: "© 2026 — AI Engineer Briefing"
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
# Kimi K3 — 2.8兆パラメータの衝撃

> *オープンウェイトがフロンティアに到達した日*

- 2026-07-25 ・ AI Engineer Briefing
- Moonshot AI（北京）／ 世界初のオープン3T級 MoE モデル

<!--
Kimi K3はMoonshot AIが2026-07-16発表、7-17報道。出典: https://simonwillison.net/2026/Jul/16/kimi-k3/ , https://www.cnbc.com/2026/07/17/moonshot-ai-kimi-k3-model-openai-anthropic-china.html
-->

---

<!-- _class: fit-58 -->
# 結論: K3は「オープン最強」だが「オープン=安い」時代を終わらせた

> *史上最大2.8TのオープンMoEが総合3位。ただしAPI価格はK2.6の約5倍に。*

- 史上最大2.8TのオープンウェイトMoEモデル
- Artificial Analysis Index 57で世界3位（Fable 5・GPT-5.6 Solに次ぐ）
- コーディング／エージェント系は米国トップ級に肉薄。Frontend Code ArenaではFable 5に勝利報道
- APIは$3/$15とK2.6比で大幅値上げ。セルフホストは64+アクセラレータ級
- エンジニアの論点は「7/27のウェイト公開後にどう使い分けるか」

<div class="fig">
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="40" y="20" width="680" height="82" rx="8" fill="#f4f1de" stroke="#264653" stroke-width="1.5"/><text x="62" y="52" font-size="18" font-weight="bold" fill="#264653">最上位（クローズド）</text><text x="62" y="84" font-size="21" fill="#1e6091">Claude Fable 5 ・ GPT-5.6 Sol</text><rect x="40" y="115" width="680" height="90" rx="8" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="62" y="150" font-size="18" font-weight="bold" fill="#ffffff">総合3位・オープン最強</text><text x="62" y="186" font-size="23" font-weight="bold" fill="#ffffff">Kimi K3 — AA Intelligence Index 57</text><rect x="40" y="218" width="680" height="82" rx="8" fill="#e9edc9" stroke="#264653" stroke-width="1.5"/><text x="62" y="250" font-size="18" font-weight="bold" fill="#264653">他のオープンウェイト</text><text x="62" y="282" font-size="21" fill="#2a9d8f">GLM-5.2（51）  ・  DeepSeek V4 Pro（44）</text></svg>
</div>

<!--
AA Index 57=世界3位、GLM-5.2=51、DeepSeek V4 Pro=44。価格$3/$15はK2.6($0.95/$4.00)の約5倍。Frontend Code ArenaでFable 5に勝利報道。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ , https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3 , https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-76 -->
# このデッキの歩き方: 技術 → ベンチ → 実務 → 業界インパクト

> *4部構成で、K3を「なぜ強いか」から「どう使うか」まで通しで見る。*

- Part 1 技術詳細: 2.8T MoE・KDA・量子化・最適化の中身
- Part 2 ベンチマーク: 第三者評価と自己報告を分けて競合比較
- Part 3 実務活用: 価格・利用経路・セルフホストの現実
- Part 4 業界インパクト: Moonshotの急成長と米中AI競争

<div class="fig">
<svg viewBox="0 0 860 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="20" y="55" width="170" height="90" rx="10" fill="#1e6091"/><text x="105" y="93" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">Part 1</text><text x="105" y="120" font-size="16" fill="#fff" text-anchor="middle">技術詳細</text><polygon points="196,90 214,100 196,110" fill="#264653"/><rect x="240" y="55" width="170" height="90" rx="10" fill="#2a9d8f"/><text x="325" y="93" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">Part 2</text><text x="325" y="120" font-size="16" fill="#fff" text-anchor="middle">ベンチ・競合</text><polygon points="416,90 434,100 416,110" fill="#264653"/><rect x="460" y="55" width="170" height="90" rx="10" fill="#e76f51"/><text x="545" y="93" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">Part 3</text><text x="545" y="120" font-size="16" fill="#fff" text-anchor="middle">実務活用</text><polygon points="636,90 654,100 636,110" fill="#264653"/><rect x="680" y="55" width="170" height="90" rx="10" fill="#264653"/><text x="765" y="93" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">Part 4</text><text x="765" y="120" font-size="16" fill="#fff" text-anchor="middle">業界インパクト</text></svg>
</div>

<!--
本デッキはSCQA構造。Part 1は技術基盤（2.8Tをどう動かすか）、Part 2は性能の実像（自己報告と第三者評価の区別が鍵）、Part 3は導入判断（価格・利用経路・セルフホストの現実）、Part 4は資本と地政学の文脈。聴衆の関心に応じてPart 2または3から入ってもよい。
-->

---

<!-- _class: fit-64 -->
# 2026年、中国オープンウェイト勢がフロンティアの一角を占めた

> *DeepSeek・GLM・Qwen・Kimiが相次ぎ登場し、K2→K3で規模を一気に拡大した。*

- DeepSeek V4 Pro（総1.6T／アクティブ49B）とGLM-5.2（総744B／約40B）が先行
- Moonshotは K2 → K2.5 → K2.6（2026年4月頃）と反復し、K3で3T級へ
- オープンウェイトが「安価な代替」から「性能でも競う」存在に変わりつつある

<div class="fig">
<svg viewBox="0 0 840 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><line x1="90" y1="120" x2="770" y2="120" stroke="#264653" stroke-width="3"/><polygon points="770,112 790,120 770,128" fill="#264653"/><circle cx="130" cy="120" r="13" fill="#1e6091"/><text x="130" y="90" font-size="19" font-weight="bold" fill="#264653" text-anchor="middle">K2</text><circle cx="330" cy="120" r="13" fill="#1e6091"/><text x="330" y="90" font-size="19" font-weight="bold" fill="#264653" text-anchor="middle">K2.5</text><circle cx="530" cy="120" r="13" fill="#2a9d8f"/><text x="530" y="90" font-size="19" font-weight="bold" fill="#264653" text-anchor="middle">K2.6</text><text x="530" y="162" font-size="15" fill="#2a9d8f" text-anchor="middle">2026年4月頃</text><circle cx="730" cy="120" r="18" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="730" y="84" font-size="22" font-weight="bold" fill="#e76f51" text-anchor="middle">K3</text><text x="730" y="166" font-size="15" fill="#e76f51" text-anchor="middle">2026-07-16</text></svg>
</div>

<!--
DeepSeek V4 Pro=1.6T/49B、GLM-5.2=744B/~40B。K2→K2.5→K2.6(2026年4月頃)→K3(2026-07-16)。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ , https://www.kimi.com/blog/kimi-k3
-->

---

<!-- _class: fit-64 -->
# 「安くて強い」だけでは米国トップ2社に届かなかった

> *K2.6は格安だが最上位には未達。その差の大きさは、K3で+732伸びたことが逆に示す。*

- K2.6は$0.95/$4.00と安価で高評価だったが、Fable 5／GPT-5.6 Sol級には未達
- K3のAA Elo 1547はK2.6比+732 — この伸び幅が、埋めるべき差の大きさを物語る
- 「低コスト」だけでは覆せない性能ギャップが、K3の巨大化を後押しした

<div class="fig">
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><line x1="60" y1="290" x2="720" y2="290" stroke="#264653" stroke-width="2"/><line x1="60" y1="58" x2="720" y2="58" stroke="#e76f51" stroke-width="2" stroke-dasharray="8 6"/><text x="712" y="48" font-size="15" fill="#e76f51" text-anchor="end">米国トップ2社の帯（Fable 5 / GPT-5.6 Sol）</text><rect x="150" y="172" width="140" height="118" rx="5" fill="#f4a261"/><text x="220" y="162" font-size="18" font-weight="bold" fill="#264653" text-anchor="middle">K2.6</text><text x="220" y="316" font-size="15" fill="#264653" text-anchor="middle">AA Elo ≈ 815（逆算）</text><rect x="430" y="65" width="140" height="225" rx="5" fill="#2a9d8f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="500" y="316" font-size="15" fill="#264653" text-anchor="middle">K3  AA Elo 1547</text><line x1="290" y1="120" x2="428" y2="120" stroke="#e76f51" stroke-width="3"/><polygon points="428,112 448,120 428,128" fill="#e76f51"/><text x="360" y="110" font-size="17" font-weight="bold" fill="#e76f51" text-anchor="middle">+732</text></svg>
</div>

<!--
K2.6=$0.95/$4.00。K3 AA Elo 1547はK2.6比+732 → K2.6のEloは約815(1547-732の逆算)。米国トップ2社(Fable 5/GPT-5.6 Sol)には未達。出典: https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-76 -->
# Kimi K3: 7月16日発表、世界初のオープン3T級モデル

> *2.8T・1Mコンテキスト・Modified MIT。ただし7/25時点はまだAPI/Webのみ。*

- 2026-07-16発表・7-17報道。Modified MITで7/27までにウェイト公開予定
- 7/25時点ではウェイト未公開 — 利用はAPI／Webアプリ経由のみ
- コンテキスト長は100万トークン（1M）。ビジョン対応も報道あり

<div class="fig">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="30" y="30" width="370" height="110" rx="10" fill="#1e6091" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="55" y="72" font-size="17" fill="#cfe3f2">総パラメータ</text><text x="55" y="112" font-size="30" font-weight="bold" fill="#fff">2.8兆（MoE）</text><rect x="420" y="30" width="370" height="110" rx="10" fill="#2a9d8f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="445" y="72" font-size="17" fill="#d3efe8">コンテキスト長</text><text x="445" y="112" font-size="30" font-weight="bold" fill="#fff">1,000,000 tokens</text><rect x="30" y="160" width="370" height="110" rx="10" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="55" y="202" font-size="17" fill="#fbe0d8">ライセンス</text><text x="55" y="242" font-size="26" font-weight="bold" fill="#fff">Modified MIT（7/27）</text><rect x="420" y="160" width="370" height="110" rx="10" fill="#264653" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="445" y="202" font-size="17" fill="#c7d0d3">モダリティ</text><text x="445" y="242" font-size="26" font-weight="bold" fill="#fff">ビジョン対応（報道）</text></svg>
</div>

<!--
2026-07-16発表。Modified MIT、7/27までにウェイト公開予定(7/25時点未公開)。1Mコンテキスト、ビジョン対応報道。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ , https://www.gizmochina.com/2026/07/19/kimi-k3-moonshot-ai-unleashes-2-8-trillion-parameter-model-for-free/ , https://northflank.com/blog/what-is-kimi-k3-self-hosting
-->

---

<!-- _class: fit-82 -->
# 2.8Tのうち動くのは16/896エキスパート — 活性率わずか約1.8%

> *巨大な総パラメータを、トークンごとにごく一部だけ発火させて計算量を抑える。*

- 896エキスパート中16個のみ活性化（トークンあたり約1.8%）
- アクティブパラメータの絶対数（B単位）は非公開
- 比較: DeepSeek V4 Pro＝1.6T／49B、GLM-5.2＝744B／約40B

<div class="fig">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="20" y="120" width="130" height="70" rx="8" fill="#1e6091"/><text x="85" y="152" font-size="16" fill="#fff" text-anchor="middle">入力</text><text x="85" y="175" font-size="16" fill="#fff" text-anchor="middle">トークン</text><line x1="150" y1="155" x2="215" y2="155" stroke="#264653" stroke-width="3"/><polygon points="215,147 235,155 215,163" fill="#264653"/><rect x="240" y="120" width="130" height="70" rx="8" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="305" y="162" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">Router</text><line x1="370" y1="155" x2="435" y2="155" stroke="#264653" stroke-width="3"/><polygon points="435,147 455,155 435,163" fill="#264653"/><rect x="460" y="40" width="330" height="230" rx="10" fill="#e9edc9" stroke="#264653" stroke-width="1.5"/><text x="625" y="70" font-size="17" font-weight="bold" fill="#264653" text-anchor="middle">896 experts pool</text><rect x="495" y="95" width="120" height="140" rx="8" fill="#2a9d8f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="555" y="158" font-size="22" font-weight="bold" fill="#fff" text-anchor="middle">16</text><text x="555" y="186" font-size="15" fill="#fff" text-anchor="middle">active</text><text x="705" y="170" font-size="30" font-weight="bold" fill="#e76f51" text-anchor="middle">~1.8%</text></svg>
</div>

<!--
896エキスパート中16活性(~1.8%)、Stable LatentMoE採用。アクティブ絶対数は非公開。DeepSeek V4 Pro=1.6T/49B、GLM-5.2=744B/~40B。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/
-->

---

<!-- _class: fit-76 -->
# Quantile Balancingがエキスパート割当のヒューリスティックを排除した

> *ルータースコアの分位点から割当を直接導出し、敏感なバランシング調整を不要にした。*

- Stable LatentMoE フレームワーク上で動作
- 従来: ヒューリスティックな更新＋敏感なバランシング超パラメータの手調整
- K3: 分位点から割当を直接導出し、その調整自体を不要化

<div class="fig">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="30" y="40" width="340" height="220" rx="10" fill="#faf3ef" stroke="#e76f51" stroke-width="2"/><text x="200" y="78" font-size="19" font-weight="bold" fill="#e76f51" text-anchor="middle">従来のロードバランス</text><text x="55" y="128" font-size="17" fill="#264653">・ヒューリスティックな更新</text><text x="55" y="166" font-size="17" fill="#264653">・敏感なHPの手調整</text><text x="55" y="204" font-size="17" fill="#264653">・不安定になりやすい</text><line x1="375" y1="150" x2="440" y2="150" stroke="#264653" stroke-width="3"/><polygon points="440,141 462,150 440,159" fill="#264653"/><rect x="470" y="40" width="320" height="220" rx="10" fill="#eaf5f1" stroke="#2a9d8f" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="630" y="78" font-size="19" font-weight="bold" fill="#2a9d8f" text-anchor="middle">Quantile Balancing</text><text x="495" y="128" font-size="17" fill="#264653">・分位点から割当を直接導出</text><text x="495" y="166" font-size="17" fill="#264653">・敏感なHPを排除</text><text x="495" y="204" font-size="17" fill="#264653">・安定した割当</text></svg>
</div>

<!--
Quantile Balancing: ルータースコアの分位点からエキスパート割当を直接導出し、ヒューリスティック更新と敏感なバランシングHPを排除。Stable LatentMoE採用。出典: https://medium.com/ai-simplified-in-plain-english/the-architecture-of-permanence-deconstructing-kimi-k3-c787a8905f48 (二次情報), https://www.kimi.com/blog/kimi-k3
-->

---

<!-- _class: fit-88 -->
# KDAは1Mトークン文脈のデコードを最大6.3倍速くする

> *ハイブリッド線形アテンションで、長文脈推論を実用速度に引き上げた。*

- Kimi Delta Attention（KDA）＝ハイブリッド線形アテンション
- 1Mコンテキストで最大6.3倍高速なデコーディングを報告
- K2.6比で出力トークンを21%削減（効率向上）

<div class="fig">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><text x="40" y="55" font-size="17" fill="#264653">標準デコード（1Mコンテキスト）</text><rect x="40" y="70" width="95" height="52" rx="5" fill="#f4a261"/><text x="150" y="104" font-size="20" font-weight="bold" fill="#264653">1.0×</text><text x="40" y="170" font-size="17" fill="#264653">Kimi Delta Attention</text><rect x="40" y="185" width="600" height="52" rx="5" fill="#2a9d8f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="655" y="219" font-size="24" font-weight="bold" fill="#e76f51">6.3×</text></svg>
</div>

<!--
KDA=ハイブリッド線形アテンション。1Mコンテキストで最大6.3倍高速デコード。K2.6比で出力トークン21%削減。出典: https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/ , https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-82 -->
# 層間残差とゲート付きMLAが深いネットワークの情報損失を防ぐ

> *AttnResとGated MLAが、層を重ねても信号が減衰しない経路を作る。*

- Attention Residuals（AttnRes）＝層間の情報伝達を選択的に改善
- Gated MLA＝アテンションの選択性を改善
- 深いスタックでの情報損失を抑え、長文脈での品質を支える

<div class="fig">
<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="200" y="30" width="400" height="60" rx="8" fill="#1e6091"/><text x="400" y="68" font-size="17" fill="#fff" text-anchor="middle">Layer N ： Gated MLA + MoE</text><rect x="200" y="120" width="400" height="60" rx="8" fill="#2a9d8f"/><text x="400" y="158" font-size="17" fill="#fff" text-anchor="middle">Layer N-1 ： Gated MLA + MoE</text><rect x="200" y="210" width="400" height="60" rx="8" fill="#264653"/><text x="400" y="248" font-size="17" fill="#fff" text-anchor="middle">Layer N-2 ： Gated MLA + MoE</text><path d="M 630 240 C 720 240 720 150 630 150" fill="none" stroke="#e76f51" stroke-width="3"/><polygon points="638,143 622,150 638,157" fill="#e76f51"/><path d="M 630 150 C 720 150 720 60 630 60" fill="none" stroke="#e76f51" stroke-width="3"/><polygon points="638,53 622,60 638,67" fill="#e76f51"/><text x="735" y="155" font-size="16" font-weight="bold" fill="#e76f51">AttnRes</text><text x="170" y="155" font-size="16" fill="#264653" text-anchor="end">層間</text><text x="170" y="178" font-size="16" fill="#264653" text-anchor="end">残差</text></svg>
</div>

<!--
AttnRes=層間の情報伝達を選択的に改善。Gated MLA=アテンション選択性を改善。出典: https://www.kimi.com/blog/kimi-k3 , https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model
-->

---

<!-- _class: fit-64 -->
# Per-Head Muonがアテンションヘッド単位の最適化を可能にした

> *最適化をヘッドごとに分け、活性化はSiTUで制御。学習手法の全体像は一部非公開。*

- Muon optimizerをアテンションヘッド単位に拡張し、独立に最適化
- SiTU（Sigmoid Tanh Unit）で活性化を制御
- RLパイプラインの全体像は未公開
- K2比で約2.5倍のスケーリング効率という報告あり（二次情報・確度中）

<div class="fig">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><text x="110" y="40" font-size="17" font-weight="bold" fill="#264653" text-anchor="middle">Attention Heads</text><rect x="40" y="60" width="140" height="55" rx="6" fill="#1e6091"/><text x="110" y="95" font-size="16" fill="#fff" text-anchor="middle">Head 1</text><rect x="40" y="130" width="140" height="55" rx="6" fill="#1e6091"/><text x="110" y="165" font-size="16" fill="#fff" text-anchor="middle">Head 2 … H</text><line x1="180" y1="88" x2="250" y2="88" stroke="#264653" stroke-width="3"/><polygon points="250,80 270,88 250,96" fill="#264653"/><line x1="180" y1="158" x2="250" y2="158" stroke="#264653" stroke-width="3"/><polygon points="250,150 270,158 250,166" fill="#264653"/><rect x="275" y="60" width="200" height="55" rx="6" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="375" y="95" font-size="16" fill="#fff" text-anchor="middle">Per-Head Muon</text><rect x="275" y="130" width="200" height="55" rx="6" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="375" y="165" font-size="16" fill="#fff" text-anchor="middle">Per-Head Muon</text><rect x="540" y="90" width="240" height="65" rx="8" fill="#2a9d8f"/><text x="660" y="122" font-size="16" fill="#fff" text-anchor="middle">SiTU 活性化制御</text><text x="660" y="145" font-size="14" fill="#d3efe8" text-anchor="middle">(Sigmoid Tanh Unit)</text></svg>
</div>

<!--
Per-Head Muon=Muonをヘッド単位に拡張。SiTUで活性化制御。RLパイプライン全体は未公開。K2比~2.5倍スケーリング効率は二次情報(確度中)。出典: https://medium.com/ai-simplified-in-plain-english/the-architecture-of-permanence-deconstructing-kimi-k3-c787a8905f48
-->

---

<!-- _class: fit-88 -->
# MXFP4を後付けではなくSFT段階から学習に組み込んだ

> *量子化認識学習で劣化を学習時に吸収し、MXFP4重みで約1.4TBに収めた。*

- MXFP4重み＋MXFP8活性化の量子化認識学習（QAT）
- SFT段階から量子化を組み込み、劣化を学習時に吸収
- 重みサイズは約1.4TB（MXFP4形式）

<div class="fig">
<svg viewBox="0 0 840 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="20" y="75" width="180" height="75" rx="8" fill="#1e6091"/><text x="110" y="118" font-size="17" fill="#fff" text-anchor="middle">事前学習</text><line x1="200" y1="112" x2="250" y2="112" stroke="#264653" stroke-width="3"/><polygon points="250,104 270,112 250,120" fill="#264653"/><rect x="275" y="55" width="270" height="115" rx="8" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="410" y="98" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">SFT + QAT</text><text x="410" y="128" font-size="15" fill="#fbe0d8" text-anchor="middle">MXFP4 重み / MXFP8 活性化</text><line x1="545" y1="112" x2="595" y2="112" stroke="#264653" stroke-width="3"/><polygon points="595,104 615,112 595,120" fill="#264653"/><rect x="620" y="75" width="200" height="75" rx="8" fill="#2a9d8f"/><text x="720" y="108" font-size="16" fill="#fff" text-anchor="middle">重み ~1.4TB</text><text x="720" y="132" font-size="14" fill="#d3efe8" text-anchor="middle">（MXFP4）</text></svg>
</div>

<!--
MXFP4重み+MXFP8活性化のQATをSFT段階から適用。重み約1.4TB(MXFP4)。出典: https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model , https://northflank.com/blog/what-is-kimi-k3-self-hosting
-->

---

<!-- _class: fit-88 -->
# K3の技術スタックは「効率化の総力戦」である

> *低活性MoE・KDA・QAT・Per-Head Muonの4本柱で、巨大さと実行効率を両立させた。*

- 巨大な総パラメータを、あらゆる層で「効率化」して実用可能にしている

<div class="fig">
<svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="40" y="30" width="780" height="56" rx="8" fill="#264653"/><text x="430" y="66" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle">効率化の総力戦 — 2.8Tを動かす4本柱</text><rect x="40" y="110" width="180" height="180" rx="10" fill="#1e6091" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="130" y="155" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">低活性MoE</text><text x="130" y="205" font-size="26" font-weight="bold" fill="#fff" text-anchor="middle">16/896</text><text x="130" y="245" font-size="15" fill="#cfe3f2" text-anchor="middle">計算量を削減</text><rect x="240" y="110" width="180" height="180" rx="10" fill="#2a9d8f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="330" y="155" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">KDA</text><text x="330" y="205" font-size="26" font-weight="bold" fill="#fff" text-anchor="middle">6.3×</text><text x="330" y="245" font-size="15" fill="#d3efe8" text-anchor="middle">1M文脈を高速化</text><rect x="440" y="110" width="180" height="180" rx="10" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="530" y="155" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle">QAT</text><text x="530" y="205" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">MXFP4</text><text x="530" y="245" font-size="15" fill="#fbe0d8" text-anchor="middle">重みを圧縮</text><rect x="640" y="110" width="180" height="180" rx="10" fill="#f4a261" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="730" y="155" font-size="17" font-weight="bold" fill="#264653" text-anchor="middle">Per-Head Muon</text><text x="730" y="205" font-size="22" font-weight="bold" fill="#264653" text-anchor="middle">ヘッド単位</text><text x="730" y="245" font-size="15" fill="#264653" text-anchor="middle">最適化を精緻化</text></svg>
</div>

<!--
4本柱: 低活性MoE(16/896)・KDA(6.3x)・QAT(MXFP4)・Per-Head Muon。すべて研究ノートの確認済み値。図メインのまとめスライド。
-->

---

<!-- _class: fit-76 -->
# 第三者評価で世界3位 — Fable 5とGPT-5.6 Solだけが上にいる

> *Artificial Analysis Index 57で中国勢トップ。GLM-5.2とDeepSeekを明確に上回る。*

- Artificial Analysis Intelligence Index 57（世界3位）
- AA Elo 1547（K2.6比で+732の大幅上昇）
- 同指標でGLM-5.2＝51、DeepSeek V4 Pro＝44を上回る
- 上位はClaude Fable 5とGPT-5.6 Solの2モデルのみ

<div class="fig">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><text x="30" y="36" font-size="17" font-weight="bold" fill="#264653">Artificial Analysis Intelligence Index</text><text x="200" y="90" font-size="18" fill="#264653" text-anchor="end">Kimi K3</text><rect x="215" y="66" width="475" height="38" rx="5" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="705" y="94" font-size="20" font-weight="bold" fill="#e76f51">57</text><text x="200" y="160" font-size="18" fill="#264653" text-anchor="end">GLM-5.2</text><rect x="215" y="136" width="425" height="38" rx="5" fill="#2a9d8f"/><text x="655" y="164" font-size="20" font-weight="bold" fill="#2a9d8f">51</text><text x="200" y="230" font-size="18" fill="#264653" text-anchor="end">DeepSeek V4 Pro</text><rect x="215" y="206" width="367" height="38" rx="5" fill="#1e6091"/><text x="597" y="234" font-size="20" font-weight="bold" fill="#1e6091">44</text><text x="215" y="280" font-size="15" fill="#264653">※ Claude Fable 5 / GPT-5.6 Sol はK3より上位（具体値は非掲載）</text></svg>
</div>

<!--
AA Index: K3=57(3位)、GLM-5.2=51、DeepSeek V4 Pro=44。AA Elo 1547(K2.6比+732)。上位はFable 5とGPT-5.6 Solのみ。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ , https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-70 -->
# SWE-bench 76.8%、Terminal Bench 88.3 — コーディングは第一級

> *主要コーディングベンチでGLM-5.2を全項目で上回り、独立評価でも高Elo。*

- SWE-bench Verified 76.8%（自己報告）、FrontierSWE 81.2
- Terminal Bench 2.1 は88.3（GLM-5.2＝82.7）
- Frontend Code Arena 1,679 Elo（独立評価、Fable 5に勝利報道）
- DeepSWE・SWE Marathonなどで GLM-5.2 を大差で上回る

<div class="fig">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="600" y="20" width="18" height="18" fill="#e76f51"/><text x="625" y="35" font-size="15" fill="#264653">Kimi K3</text><rect x="710" y="20" width="18" height="18" fill="#1e6091"/><text x="735" y="35" font-size="15" fill="#264653">GLM-5.2</text><line x1="60" y1="250" x2="800" y2="250" stroke="#264653" stroke-width="2"/><rect x="90" y="68" width="55" height="182" fill="#e76f51"/><text x="117" y="60" font-size="15" font-weight="bold" fill="#264653" text-anchor="middle">67.3</text><rect x="150" y="125" width="55" height="125" fill="#1e6091"/><text x="177" y="117" font-size="15" fill="#264653" text-anchor="middle">46.2</text><text x="147" y="272" font-size="14" fill="#264653" text-anchor="middle">DeepSWE</text><rect x="270" y="12" width="55" height="238" fill="#e76f51"/><text x="297" y="58" font-size="15" font-weight="bold" fill="#fff" text-anchor="middle">88.3</text><rect x="330" y="27" width="55" height="223" fill="#1e6091"/><text x="357" y="58" font-size="15" fill="#fff" text-anchor="middle">82.7</text><text x="327" y="272" font-size="14" fill="#264653" text-anchor="middle">Terminal B.</text><rect x="450" y="31" width="55" height="219" fill="#e76f51"/><text x="477" y="58" font-size="15" font-weight="bold" fill="#fff" text-anchor="middle">81.2</text><rect x="510" y="68" width="55" height="182" fill="#1e6091"/><text x="537" y="60" font-size="15" fill="#264653" text-anchor="middle">67.3</text><text x="507" y="272" font-size="14" fill="#264653" text-anchor="middle">FrontierSWE</text><rect x="630" y="137" width="55" height="113" fill="#e76f51"/><text x="657" y="129" font-size="15" font-weight="bold" fill="#264653" text-anchor="middle">42.0</text><rect x="690" y="215" width="55" height="35" fill="#1e6091"/><text x="717" y="207" font-size="15" fill="#264653" text-anchor="middle">13.0</text><text x="687" y="272" font-size="14" fill="#264653" text-anchor="middle">SWE Marathon</text></svg>
</div>

<!--
SWE-bench Verified 76.8%(自己報告)、Terminal Bench 2.1=88.3(GLM82.7)、FrontierSWE 81.2(GLM67.3)、DeepSWE 67.3(GLM46.2)、SWE Marathon 42.0(GLM13.0)、Frontend Code Arena 1679 Elo。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ , https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model , https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3
-->

---

<!-- _class: fit-70 -->
# エージェントタスク119モデル中4位 — 実戦向けの強さ

> *ツール使用の総合で上位、ブラウジングと航空券タスクでも高スコアを示す。*

- agentic tool use 平均66.6で119モデル中4位
- BrowseComp 90.4（自己報告・フルコンテキスト）
- Tau-bench Airline 51.2、SWE Marathon 42.0（GLM-5.2＝13.0）
- 長文脈×ツール反復に強く、実戦的なエージェント用途に向く

<div class="fig">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect x="30" y="40" width="230" height="210" rx="12" fill="#e76f51" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/><text x="145" y="95" font-size="18" fill="#fbe0d8" text-anchor="middle">agentic tool use</text><text x="145" y="170" font-size="58" font-weight="bold" fill="#fff" text-anchor="middle">4位</text><text x="145" y="215" font-size="18" fill="#fff" text-anchor="middle">／ 119モデル中</text><rect x="290" y="40" width="500" height="62" rx="8" fill="#1e6091"/><text x="315" y="80" font-size="18" fill="#fff">平均スコア　　　　　　66.6</text><rect x="290" y="114" width="500" height="62" rx="8" fill="#2a9d8f"/><text x="315" y="154" font-size="18" fill="#fff">BrowseComp（自己報告）　90.4</text><rect x="290" y="188" width="500" height="62" rx="8" fill="#264653"/><text x="315" y="228" font-size="18" fill="#fff">Tau-bench Airline　　　　51.2</text></svg>
</div>

<!--
agentic tool use 平均66.6で119モデル中4位。BrowseComp 90.4(自己報告・フルコンテキスト)、Tau-bench Airline 51.2、SWE Marathon 42.0(GLM13.0)。出典: https://www.mindstudio.ai/blog/open-weight-ai-frontier-kimi-k3-agent-stack , https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model
-->

---

<!-- _class: fit-70 -->
# Opus 4.8とGPT-5.5は超えた — Fable 5とGPT-5.6 Solには届かない

> *トップ2社の背中は見えたが、まだ追い越してはいない（いずれも自己報告ベース）*

- Moonshot自己報告: Claude Opus 4.8 maxとGPT-5.5 highの大半を上回る
- Claude Fable 5・GPT-5.6 Solには依然として劣後
- GPQA Diamond 93.5%はFable 5(92.6%)とGPT-5.6(94.1%)の間に位置

<div class="fig">
<svg viewBox='0 0 760 340' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x='30' y='28' font-size='16' fill='#264653' font-weight='bold'>性能の階層（自己報告ベース）</text>
<line x1='34' y1='300' x2='34' y2='72' stroke='#264653' stroke-width='3'/>
<polygon points='34,58 28,74 40,74' fill='#264653'/>
<text x='46' y='80' font-size='13' fill='#264653'>高</text>
<rect x='90' y='60' width='640' height='60' rx='8' fill='#eaf4f4' stroke='#2a9d8f' stroke-width='2'/>
<text x='110' y='85' font-size='15' fill='#264653' font-weight='bold'>トップ層</text>
<text x='110' y='108' font-size='14' fill='#1e6091'>Claude Fable 5 ・ GPT-5.6 Sol</text>
<rect x='90' y='140' width='640' height='66' rx='8' fill='#e76f51' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'/>
<text x='110' y='167' font-size='16' fill='#ffffff' font-weight='bold'>Kimi K3</text>
<text x='110' y='191' font-size='14' fill='#ffffff'>Opus 4.8 / GPT-5.5 を上回るが、トップ層には未達</text>
<rect x='90' y='226' width='640' height='60' rx='8' fill='#faf3ea' stroke='#f4a261' stroke-width='2'/>
<text x='110' y='251' font-size='15' fill='#264653' font-weight='bold'>その下</text>
<text x='110' y='274' font-size='14' fill='#1e6091'>Claude Opus 4.8 ・ GPT-5.5</text>
</svg>
</div>

<!--
自己報告での対米国勢位置づけ・GPQA Diamond。出典: https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model / https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3 / GPQAは https://wan27.org/blog/kimi-k3-benchmarks （Artificial Analysis系要約・確度中）。数値はいずれも自己報告と第三者が混在する点に注意。
-->

---

# 中国勢では頭一つ抜けた — ただしサイズも価格も突出している

> *標準ベンチでは最強、しかし総パラメータでも入力単価でも中国系で最大*

| モデル | 総params | アクティブ | AA Index | 入力単価 | ライセンス |
| --- | --- | --- | --- | --- | --- |
| **Kimi K3** | 2.8T | 16/896（非公開） | 57 | $3.00 | Modified MIT（7/27） |
| DeepSeek V4 Pro | 1.6T | 49B | 44 | K3の約1/7 | MIT（即日） |
| GLM-5.2 | 744B | 約40B | 51 | K3の約1/2 | — |

<!--
3モデル比較（総/アクティブ/AA Index/相対単価/ライセンス）。競合の入力単価絶対値は研究ノートに無いため相対値（DeepSeek比約1/7・GLM比約1/2）で表現。GLM-5.2のライセンスは研究ノートに記載が無く「—」とした。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/
-->

---

<!-- _class: fit-82 -->
# 自己報告と第三者評価は分けて読め

> *引用するときは『どちらの数字か』を必ず明示する*

- 自己報告値は自社発表（Program Bench 77.8%・SWE Marathon 42.0など）
- 第三者値（AA Intelligence Index 57・Elo 1547）は標準化スイート
- タスクセットが異なるため両者は直接比較できない

<div class="fig">
<svg viewBox='0 0 760 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x='40' y='40' width='300' height='230' rx='10' fill='#fdf1e7' stroke='#f4a261' stroke-width='2'/>
<text x='190' y='72' font-size='16' fill='#264653' font-weight='bold' text-anchor='middle'>自己報告（Moonshot）</text>
<text x='65' y='120' font-size='14' fill='#1e6091'>Program Bench 77.8%</text>
<text x='65' y='155' font-size='14' fill='#1e6091'>SWE Marathon 42.0</text>
<text x='65' y='190' font-size='14' fill='#1e6091'>BrowseComp 90.4</text>
<text x='65' y='240' font-size='12' fill='#8a5a2b'>自社選定タスク</text>
<rect x='420' y='40' width='300' height='230' rx='10' fill='#e8f4f2' stroke='#2a9d8f' stroke-width='2'/>
<text x='570' y='72' font-size='15' fill='#264653' font-weight='bold' text-anchor='middle'>第三者（Artificial Analysis）</text>
<text x='445' y='120' font-size='14' fill='#1e6091'>Intelligence Index 57</text>
<text x='445' y='155' font-size='14' fill='#1e6091'>Elo 1547</text>
<text x='445' y='240' font-size='12' fill='#1f7a6d'>標準化スイート</text>
<text x='380' y='165' font-size='26' fill='#e76f51' font-weight='bold' text-anchor='middle'>≠</text>
</svg>
</div>

<!--
自己報告 vs 第三者の峻別。Program Bench/SWE Marathon/BrowseCompは自己報告、AA Index/Eloは第三者。出典: https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model / https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ / https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-70 -->
# $3/$15への値上げ — 入力で約3倍・出力で約4倍、「オープン=格安」は終わった

> *キャッシュヒット$0.30を活かせる設計かどうかが実質コストを分ける*

- 入力$3.00（キャッシュミス）/ キャッシュヒット$0.30 / 出力$15.00
- 出力は推論トレース込みのフラット料金（軽量推論モードなし）
- 前世代K2.6は$0.95 / $4.00だった

<div class="fig">
<svg viewBox='0 0 760 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1='80' y1='250' x2='720' y2='250' stroke='#264653' stroke-width='2'/>
<text x='190' y='285' font-size='14' fill='#264653' text-anchor='middle'>入力単価</text>
<text x='485' y='285' font-size='14' fill='#264653' text-anchor='middle'>出力単価</text>
<rect x='120' y='239' width='60' height='11' fill='#f4a261'/>
<text x='150' y='232' font-size='12' fill='#264653' text-anchor='middle'>$0.95</text>
<rect x='200' y='214' width='60' height='36' fill='#e76f51'/>
<text x='230' y='207' font-size='12' fill='#264653' text-anchor='middle'>$3.00</text>
<rect x='420' y='202' width='60' height='48' fill='#f4a261'/>
<text x='450' y='195' font-size='12' fill='#264653' text-anchor='middle'>$4.00</text>
<rect x='500' y='70' width='60' height='180' fill='#e76f51'/>
<text x='530' y='63' font-size='12' fill='#264653' text-anchor='middle'>$15.00</text>
<rect x='600' y='58' width='16' height='16' fill='#f4a261'/>
<text x='624' y='71' font-size='12' fill='#264653'>K2.6</text>
<rect x='600' y='84' width='16' height='16' fill='#e76f51'/>
<text x='624' y='97' font-size='12' fill='#264653'>K3</text>
</svg>
</div>

<!--
価格。入力$3.00/キャッシュ$0.30/出力$15.00、K2.6は$0.95/$4.00。値上げ倍率（入力約3.2倍・出力約3.75倍）は研究ノートの絶対値から計算。出典: https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model / https://northflank.com/blog/what-is-kimi-k3-self-hosting / K2.6価格は https://simonwillison.net/2026/Jul/16/kimi-k3/
-->

---

<!-- _class: fit-76 -->
# 入力単価はDeepSeekの約7倍・GLMの約2倍 — これは性能プレミアムの値段だ

> *安さで選ぶならDeepSeek/GLM、性能で正当化できるときだけK3*

- K3の入力単価はDeepSeek V4 Proの約7倍
- GLM-5.2の約2倍で、中国系オープンウェイトでは最も高価
- 規模が突出する分、単価も突出する構造

<div class="fig">
<svg viewBox='0 0 760 280' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x='30' y='34' font-size='15' fill='#264653' font-weight='bold'>入力単価（DeepSeek V4 Pro を1とした相対値）</text>
<text x='30' y='92' font-size='14' fill='#264653'>DeepSeek V4 Pro</text>
<rect x='210' y='77' width='70' height='28' fill='#2a9d8f'/>
<text x='294' y='97' font-size='13' fill='#264653'>×1</text>
<text x='30' y='152' font-size='14' fill='#264653'>GLM-5.2</text>
<rect x='210' y='137' width='245' height='28' fill='#f4a261'/>
<text x='469' y='157' font-size='13' fill='#264653'>×約3.5</text>
<text x='30' y='212' font-size='14' fill='#264653'>Kimi K3</text>
<rect x='210' y='197' width='490' height='28' fill='#e76f51' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'/>
<text x='330' y='217' font-size='13' fill='#ffffff' font-weight='bold'>×約7（DeepSeek比）</text>
</svg>
</div>

<!--
相対価格。研究ノートの『DeepSeekの約7倍・GLMの約2倍』のみ使用。GLMはK3の1/2なのでDeepSeek基準では約3.5倍（=7÷2）として図示。競合の絶対単価は研究ノートに無いため記載しない。出典: https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model
-->

---

<!-- _class: fit-70 -->
# 今日から使える — OpenAI互換APIで移行コストはほぼゼロ

> *base_urlとmodel名を差し替えるだけで既存のOpenAIコードが動く*

- OpenRouter経由なら `moonshotai/kimi-k3` を指定するだけ
- Kimi.com / Kimi Work / Kimi Code / モバイルアプリには無料枠あり

```python
from openai import OpenAI

client = OpenAI(api_key="MOONSHOT_KEY",
                base_url="https://api.moonshot.ai/v1")
resp = client.chat.completions.create(
    model="kimi-k3",
    messages=[{"role": "user", "content": "Hi"}])
print(resp.choices[0].message.content)
```

<!--
利用経路。Moonshot APIはOpenAI互換Chat Completions（base_url=https://api.moonshot.ai/v1、model=kimi-k3）。OpenRouterはmoonshotai/kimi-k3。出典: https://northflank.com/blog/what-is-kimi-k3-self-hosting / https://openrouter.ai/moonshotai/kimi-k3 / https://www.precedenceresearch.com/news/moonshot-ai-kimi-k3-ai-model
-->

---

<!-- _class: fit-82 -->
# セルフホストは「64アクセラレータ級」の覚悟が要る

> *vLLMがKimi Delta Attention対応のプレビューを準備中*

- ウェイトは7/25時点で未公開（7/27公開予定）
- 重みだけでMXFP4形式・約1.4TB、実行時はさらにメモリが必要
- Moonshot推奨は64基以上のアクセラレータのスーパーノード（単一GPU不可）

<div class="fig">
<svg viewBox='0 0 760 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x='130' y='72' font-size='14' fill='#264653' text-anchor='middle' font-weight='bold'>単一GPU</text>
<rect x='55' y='95' width='150' height='95' rx='10' fill='#fdecea' stroke='#e76f51' stroke-width='2'/>
<rect x='95' y='115' width='70' height='40' rx='6' fill='#e76f51'/>
<text x='130' y='140' font-size='11' fill='#ffffff' text-anchor='middle'>H100/H200</text>
<text x='130' y='180' font-size='16' fill='#e76f51' text-anchor='middle' font-weight='bold'>✕ 不可</text>
<text x='265' y='150' font-size='28' fill='#264653' text-anchor='middle'>→</text>
<text x='530' y='72' font-size='14' fill='#264653' text-anchor='middle' font-weight='bold'>64基以上のスーパーノード</text>
<rect x='320' y='85' width='420' height='150' rx='10' fill='#e8f4f2' stroke='#2a9d8f' stroke-width='2'/>
<rect x='345' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='381' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='417' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='453' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='489' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='525' y='110' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='345' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='381' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='417' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='453' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='489' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<rect x='525' y='146' width='26' height='26' rx='3' fill='#2a9d8f'/>
<text x='578' y='150' font-size='16' fill='#264653'>… ×64+</text>
<text x='530' y='215' font-size='13' fill='#1f7a6d' text-anchor='middle'>重み約1.4TB（MXFP4）</text>
</svg>
</div>

<!--
セルフホスト要件。7/25時点未公開（7/27予定）、重み約1.4TB（MXFP4）、64基以上のスーパーノード推奨、単一H100/H200/B200不可、vLLMがKDAプレビュー準備中。出典: https://northflank.com/blog/what-is-kimi-k3-self-hosting / https://vllm.ai/blog/2026-07-22-kimi-k3-preview
-->

---

<!-- _class: fit-82 -->
# 巨大リポジトリと長時間タスクがK3の主戦場になる

> *（参考）K2 Thinkingは200〜300回の連続ツール呼び出しを報告 — K3固有値は未確認*

- 大規模リポジトリのナビゲーション・デバッグに強い評価
- 画像・ログ・テスト・ランタイムフィードバックで反復
- 1Mコンテキスト × BrowseComp 90.4 の長文脈エージェント

<div class="fig">
<svg viewBox='0 0 760 320' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x='60' y='50' width='190' height='64' rx='10' fill='#1e6091'/>
<text x='155' y='80' font-size='14' fill='#ffffff' text-anchor='middle' font-weight='bold'>Kimi K3</text>
<text x='155' y='100' font-size='12' fill='#ffffff' text-anchor='middle'>1Mコンテキスト</text>
<rect x='510' y='50' width='190' height='64' rx='10' fill='#2a9d8f'/>
<text x='605' y='88' font-size='14' fill='#ffffff' text-anchor='middle' font-weight='bold'>ツール実行</text>
<rect x='510' y='206' width='190' height='64' rx='10' fill='#f4a261'/>
<text x='605' y='234' font-size='13' fill='#264653' text-anchor='middle' font-weight='bold'>環境フィードバック</text>
<text x='605' y='254' font-size='11' fill='#264653' text-anchor='middle'>ログ / テスト / 画像</text>
<rect x='60' y='206' width='190' height='64' rx='10' fill='#e76f51'/>
<text x='155' y='244' font-size='13' fill='#ffffff' text-anchor='middle' font-weight='bold'>評価して次を決定</text>
<line x1='250' y1='82' x2='500' y2='82' stroke='#264653' stroke-width='2'/>
<polygon points='510,82 498,76 498,88' fill='#264653'/>
<line x1='605' y1='114' x2='605' y2='196' stroke='#264653' stroke-width='2'/>
<polygon points='605,206 599,194 611,194' fill='#264653'/>
<line x1='510' y1='238' x2='250' y2='238' stroke='#264653' stroke-width='2'/>
<polygon points='250,238 262,232 262,244' fill='#264653'/>
<line x1='155' y1='206' x2='155' y2='124' stroke='#264653' stroke-width='2'/>
<polygon points='155,114 149,126 161,126' fill='#264653'/>
</svg>
</div>

<!--
エージェント実務。大規模リポジトリ/デバッグ/マルチモーダル反復に強評価、1M×BrowseComp 90.4。K2 Thinkingの200〜300回連続ツール呼び出しはK2 Thinking固有の報告でありK3固有値は未確認と明記。出典: https://www.mindstudio.ai/blog/open-weight-ai-frontier-kimi-k3-agent-stack / https://www.kimi.com/blog/kimi-k2-thinking
-->

---

# K3を選ぶのは「性能が価格を正当化する」ときだけだ

> *オープンウェイト必須で最高性能を求めるなら、事実上の選択肢はK3のみ*

- 判断はコスト・性能・オープン要件・文脈長の4軸で決まる

<div class="fig">
<svg viewBox='0 0 760 360' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x='30' y='30' width='330' height='60' rx='8' fill='#eef3f7' stroke='#1e6091' stroke-width='2'/>
<text x='50' y='55' font-size='14' fill='#264653'>コストが最優先？</text>
<text x='50' y='78' font-size='12' fill='#6b7b86'>単価を最小化したい</text>
<line x1='360' y1='60' x2='450' y2='60' stroke='#2a9d8f' stroke-width='2'/>
<polygon points='460,60 448,54 448,66' fill='#2a9d8f'/>
<text x='400' y='50' font-size='12' fill='#2a9d8f'>Yes</text>
<rect x='460' y='32' width='270' height='56' rx='8' fill='#e8f4f2' stroke='#2a9d8f' stroke-width='2'/>
<text x='475' y='66' font-size='14' fill='#264653' font-weight='bold'>DeepSeek V4 Pro / GLM-5.2</text>
<line x1='195' y1='90' x2='195' y2='120' stroke='#264653' stroke-width='2'/>
<polygon points='195,130 189,118 201,118' fill='#264653'/>
<text x='205' y='113' font-size='12' fill='#264653'>No</text>
<rect x='30' y='132' width='330' height='60' rx='8' fill='#eef3f7' stroke='#1e6091' stroke-width='2'/>
<text x='50' y='157' font-size='14' fill='#264653'>非オープンでも最高性能が必要？</text>
<text x='50' y='180' font-size='12' fill='#6b7b86'>ライセンスにこだわらない</text>
<line x1='360' y1='162' x2='450' y2='162' stroke='#2a9d8f' stroke-width='2'/>
<polygon points='460,162 448,156 448,168' fill='#2a9d8f'/>
<text x='400' y='152' font-size='12' fill='#2a9d8f'>Yes</text>
<rect x='460' y='134' width='270' height='56' rx='8' fill='#e8f4f2' stroke='#2a9d8f' stroke-width='2'/>
<text x='475' y='168' font-size='14' fill='#264653' font-weight='bold'>Claude Fable 5 / GPT-5.6 Sol</text>
<line x1='195' y1='192' x2='195' y2='222' stroke='#264653' stroke-width='2'/>
<polygon points='195,232 189,220 201,220' fill='#264653'/>
<text x='205' y='215' font-size='12' fill='#264653'>No</text>
<rect x='30' y='234' width='330' height='60' rx='8' fill='#eef3f7' stroke='#1e6091' stroke-width='2'/>
<text x='50' y='259' font-size='13' fill='#264653'>オープン必須 or 長文脈エージェント？</text>
<text x='50' y='282' font-size='12' fill='#6b7b86'>最高性能もほしい</text>
<line x1='360' y1='264' x2='450' y2='264' stroke='#e76f51' stroke-width='2'/>
<polygon points='460,264 448,258 448,270' fill='#e76f51'/>
<text x='400' y='254' font-size='12' fill='#e76f51'>Yes</text>
<rect x='460' y='236' width='270' height='56' rx='8' fill='#e76f51' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'/>
<text x='595' y='270' font-size='16' fill='#ffffff' text-anchor='middle' font-weight='bold'>Kimi K3</text>
</svg>
</div>

<!--
使い分けディシジョンツリー。コスト最優先→DeepSeek/GLM、非オープンで最高性能→Fable 5/GPT-5.6 Sol、オープン必須or長文脈エージェント→K3。研究ノートの位置づけ（中国系で最強だが最高価格・トップ2社には未達）と整合。出典: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/
-->

---

<!-- _class: fit-76 -->
# 評価額は7ヶ月で$4.3Bから$50B目標へ — 資本市場が先に動いた

> *モデルの一般公開前から、資本が価値を織り込んでいた*

- 評価額: 2025末$4.3B → 初$10B → 5月$20B → 6月$31.5B
- 7月はプレIPOで$50B評価目標、香港上場も検討
- ARR: 3月$100M → 4月$200M超（2ヶ月で倍増）
- 中国国内AIアプリMAUは8位（2026年4月）

<div class="fig">
<svg viewBox='0 0 760 320' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1='40' y1='270' x2='720' y2='270' stroke='#264653' stroke-width='2'/>
<polyline points='60,251 210,226 360,182 510,131 660,50' fill='none' stroke='#e76f51' stroke-width='3'/>
<circle cx='60' cy='251' r='5' fill='#1e6091'/>
<circle cx='210' cy='226' r='5' fill='#1e6091'/>
<circle cx='360' cy='182' r='5' fill='#1e6091'/>
<circle cx='510' cy='131' r='5' fill='#1e6091'/>
<circle cx='660' cy='50' r='6' fill='#e76f51'/>
<text x='60' y='240' font-size='12' fill='#264653' text-anchor='middle'>$4.3B</text>
<text x='210' y='215' font-size='12' fill='#264653' text-anchor='middle'>$10B</text>
<text x='360' y='171' font-size='12' fill='#264653' text-anchor='middle'>$20B</text>
<text x='510' y='120' font-size='12' fill='#264653' text-anchor='middle'>$31.5B</text>
<text x='660' y='40' font-size='13' fill='#e76f51' text-anchor='middle' font-weight='bold'>$50B目標</text>
<text x='60' y='292' font-size='11' fill='#6b7b86' text-anchor='middle'>2025末</text>
<text x='210' y='292' font-size='11' fill='#6b7b86' text-anchor='middle'>2026初</text>
<text x='360' y='292' font-size='11' fill='#6b7b86' text-anchor='middle'>5月</text>
<text x='510' y='292' font-size='11' fill='#6b7b86' text-anchor='middle'>6月</text>
<text x='660' y='292' font-size='11' fill='#6b7b86' text-anchor='middle'>7月</text>
</svg>
</div>

<!--
Moonshot評価額推移とARR。$4.3B→$10B→$20B→$31.5B→$50B目標、ARR $100M→$200M超、MAU8位。出典: https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/ / https://technode.com/2026/07/22/moonshot-ai-reportedly-plans-final-pre-ipo-round-at-50-billion-valuation/ / https://mlq.ai/news/moonshot-ai-seeks-30-billion-valuation-in-third-funding-round-in-six-months/
-->

---

<!-- _class: fit-76 -->
# K3は単独の事件ではなく、中国AI上場ラッシュの号砲だ

> *1社の資金調達ではなく、業界全体の資本イベントが同時進行している*

- DeepSeekは$7.4B調達・$50B超評価（$71B評価での追加調達も検討報道）
- Moonshot・DeepSeek・Zhipu・Alibaba・ByteDanceが横並びで競争
- 2026年に大型調達・IPO準備が集中

<div class="fig">
<svg viewBox='0 0 760 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x='380' y='34' font-size='16' fill='#264653' text-anchor='middle' font-weight='bold'>2026年 中国AIの資金調達・IPO競争</text>
<rect x='40' y='68' width='210' height='82' rx='10' fill='#e76f51' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'/>
<text x='145' y='102' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>Moonshot（Kimi）</text>
<text x='145' y='126' font-size='12' fill='#ffffff' text-anchor='middle'>プレIPO $50B目標</text>
<rect x='275' y='68' width='210' height='82' rx='10' fill='#1e6091'/>
<text x='380' y='102' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>DeepSeek</text>
<text x='380' y='126' font-size='12' fill='#ffffff' text-anchor='middle'>$7.4B調達・$50B超</text>
<rect x='510' y='68' width='210' height='82' rx='10' fill='#2a9d8f'/>
<text x='615' y='114' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>Zhipu（GLM）</text>
<rect x='160' y='176' width='210' height='72' rx='10' fill='#f4a261'/>
<text x='265' y='218' font-size='15' fill='#264653' text-anchor='middle' font-weight='bold'>Alibaba（Qwen）</text>
<rect x='395' y='176' width='210' height='72' rx='10' fill='#264653'/>
<text x='500' y='218' font-size='14' fill='#ffffff' text-anchor='middle' font-weight='bold'>ByteDance（Doubao）</text>
</svg>
</div>

<!--
中国AI上場ラッシュ。DeepSeek $7.4B調達・$50B超評価（$71B検討報道）、5社横並び競争、2026年に調達/IPO集中。出典: https://fortune.com/2026/07/23/moonshot-deepseek-great-chinese-ai-ipo-rush/ / https://technode.com/2026/07/22/moonshot-ai-reportedly-plans-final-pre-ipo-round-at-50-billion-valuation/
-->

---

<!-- _class: fit-82 -->
# 輸出規制への回答が「低活性率の超巨大MoE」だった

> *制約が『巨大だが安く動くMoE』という設計解を生んだ*

- 背景に米国の対中コンピュート輸出規制
- 低アクティブ比率MoE（2.8T中約1.8%）で計算効率を確保しフロンティア性能へ
- Bloomberg・CNBCは「米国トップとの差を縮めた」と報道

<div class="fig">
<svg viewBox='0 0 760 220' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x='20' y='80' width='150' height='70' rx='10' fill='#264653'/>
<text x='95' y='110' font-size='13' fill='#ffffff' text-anchor='middle' font-weight='bold'>米国の対中</text>
<text x='95' y='130' font-size='13' fill='#ffffff' text-anchor='middle'>コンピュート規制</text>
<line x1='170' y1='115' x2='195' y2='115' stroke='#264653' stroke-width='2'/>
<polygon points='205,115 193,109 193,121' fill='#264653'/>
<rect x='205' y='80' width='150' height='70' rx='10' fill='#e76f51'/>
<text x='280' y='120' font-size='13' fill='#ffffff' text-anchor='middle' font-weight='bold'>計算資源の制約</text>
<line x1='355' y1='115' x2='380' y2='115' stroke='#264653' stroke-width='2'/>
<polygon points='390,115 378,109 378,121' fill='#264653'/>
<rect x='390' y='75' width='170' height='80' rx='10' fill='#f4a261'/>
<text x='475' y='108' font-size='13' fill='#264653' text-anchor='middle' font-weight='bold'>低活性率の超巨大MoE</text>
<text x='475' y='130' font-size='12' fill='#264653' text-anchor='middle'>2.8T中 約1.8%だけ活性</text>
<line x1='560' y1='115' x2='585' y2='115' stroke='#264653' stroke-width='2'/>
<polygon points='595,115 583,109 583,121' fill='#264653'/>
<rect x='595' y='80' width='150' height='70' rx='10' fill='#2a9d8f'/>
<text x='670' y='120' font-size='13' fill='#ffffff' text-anchor='middle' font-weight='bold'>フロンティア性能</text>
</svg>
</div>

<!--
米中競争の構図。輸出規制→計算制約→低活性MoE（2.8T中16/896≈1.8%）→フロンティア性能。Bloomberg/CNBCは差を縮めたと報道。出典: https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3 / https://www.bloomberg.com/news/articles/2026-07-17/china-s-powerful-new-moonshot-ai-model-closes-gap-with-us-rivals / https://www.cnbc.com/2026/07/17/moonshot-ai-kimi-k3-model-openai-anthropic-china.html
-->

---

<!-- _class: fit-70 -->
# 「オープンだから安い」から「オープンでも最強」へ

> *オープンの価値は『無料』から『ライセンス・公開速度・実行可能性』へ移った*

- 世界最大のオープンウェイトがフロンティアの一角に到達
- 一方でModified MITの公開は7/27と遅延、DeepSeekのMIT即日公開と対照的
- 『オープン』の中身（ライセンス・公開速度・実行可能性）を見極める時代へ

<div class="fig">
<svg viewBox='0 0 760 260' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x='170' y='58' font-size='14' fill='#6b7b86' text-anchor='middle'>これまで</text>
<rect x='40' y='70' width='260' height='110' rx='12' fill='#faf3ea' stroke='#f4a261' stroke-width='2'/>
<text x='170' y='118' font-size='17' fill='#264653' text-anchor='middle' font-weight='bold'>オープン = 安い代替</text>
<text x='170' y='150' font-size='12' fill='#8a5a2b' text-anchor='middle'>性能はトップに一歩譲る</text>
<line x1='320' y1='125' x2='430' y2='125' stroke='#e76f51' stroke-width='3'/>
<polygon points='442,125 428,117 428,133' fill='#e76f51'/>
<text x='587' y='58' font-size='14' fill='#6b7b86' text-anchor='middle'>K3以降</text>
<rect x='455' y='70' width='265' height='110' rx='12' fill='#e8f4f2' stroke='#2a9d8f' stroke-width='2'/>
<text x='587' y='118' font-size='17' fill='#264653' text-anchor='middle' font-weight='bold'>オープン = 最強候補</text>
<text x='587' y='150' font-size='12' fill='#1f7a6d' text-anchor='middle'>公開速度・実行性は要確認</text>
<text x='380' y='228' font-size='12' fill='#6b7b86' text-anchor='middle'>Modified MITの公開は7/27 — DeepSeekのMIT即日公開とは対照的</text>
</svg>
</div>

<!--
オープンウェイトの意味の変化。世界最大のオープンウェイトだが公開は7/27と遅延、DeepSeekのMIT即日公開と対照。ライセンス・公開速度・実行可能性を見る論点。出典: https://techcrunch.com/2026/07/16/moonshots-upcoming-kimi-3-is-expected-to-close-the-gap-with-anthropics-opus-4-8/ / https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/
-->

---

<!-- _class: fit-70 -->
# AIエンジニアが今週やるべき3つのこと

> *公開待ちではなく、今のAPIで自分のタスクを測るのが最短ルート*

- ① 7/27のウェイト公開を確認し、Modified MITのライセンス条項を読む
- ② OpenRouterでK3を叩き、自タスクでFable 5・GPT-5.6・DeepSeekと比較
- ③ 価格試算: キャッシュヒット$0.30を活かせるワークロード設計かを確認

<div class="fig">
<svg viewBox='0 0 760 200' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x='30' y='60' width='200' height='80' rx='10' fill='#1e6091'/>
<text x='130' y='95' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>① 確認</text>
<text x='130' y='118' font-size='12' fill='#ffffff' text-anchor='middle'>7/27公開・ライセンス</text>
<line x1='230' y1='100' x2='262' y2='100' stroke='#264653' stroke-width='2'/>
<polygon points='272,100 260,94 260,106' fill='#264653'/>
<rect x='280' y='60' width='200' height='80' rx='10' fill='#2a9d8f'/>
<text x='380' y='95' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>② 実測</text>
<text x='380' y='118' font-size='12' fill='#ffffff' text-anchor='middle'>OpenRouterで比較</text>
<line x1='480' y1='100' x2='512' y2='100' stroke='#264653' stroke-width='2'/>
<polygon points='522,100 510,94 510,106' fill='#264653'/>
<rect x='530' y='60' width='200' height='80' rx='10' fill='#e76f51'/>
<text x='630' y='95' font-size='15' fill='#ffffff' text-anchor='middle' font-weight='bold'>③ 試算</text>
<text x='630' y='118' font-size='12' fill='#ffffff' text-anchor='middle'>キャッシュ$0.30設計</text>
</svg>
</div>

<!--
アクション。①ライセンス確認（Modified MIT・7/27公開）②OpenRouterで既存OpenAI互換コードから実測し他モデルと比較③キャッシュヒット$0.30を活かす設計。出典: https://openrouter.ai/moonshotai/kimi-k3 / https://northflank.com/blog/what-is-kimi-k3-self-hosting / https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model
-->

---

<!-- _class: fit-88 -->
# 参考資料 (1/2)｜一次情報・報道

> *本デッキの数値・事実はすべて以下の公開情報に基づく*

- Moonshot公式ブログ（kimi.com）— K3技術仕様の一次情報
- Simon Willison — 初日レビュー、AA Elo 1547の読み解き
- Tom's Hardware — 2.8Tと対中輸出規制の文脈
- TechCrunch — Opus 4.8とのギャップ縮小予測（事前報道）
- CNBC / Bloomberg — 「米国勢との差を縮めた」報道
- MarkTechPost — K3発表の技術詳細（KDA・1Mコンテキスト）

<!--
全URL: https://www.kimi.com/blog/kimi-k3 / https://simonwillison.net/2026/Jul/16/kimi-k3/ / https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3 / https://techcrunch.com/2026/07/16/moonshots-upcoming-kimi-3-is-expected-to-close-the-gap-with-anthropics-opus-4-8/ / https://www.cnbc.com/2026/07/17/moonshot-ai-kimi-k3-model-openai-anthropic-china.html / https://www.bloomberg.com/news/articles/2026-07-17/china-s-powerful-new-moonshot-ai-model-closes-gap-with-us-rivals / https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/
-->

---

<!-- _class: fit-70 -->
# 参考資料 (2/2)｜比較・実務・資金調達

> *ベンチマーク比較・価格・セルフホスト・資金調達の出典*

- MarkTechPost — K3 / DeepSeek V4 Pro / GLM-5.2 比較
- Amplifi Labs — 総合ガイド（価格・ベンチマーク・量子化）
- Northflank — セルフホスト要件（1.4TB・64+アクセラレータ）
- vLLM Blog — Kimi Delta Attention 対応プレビュー
- OpenRouter — moonshotai/kimi-k3 モデルページ
- TechNode / Fortune — プレIPO $50B目標と中国AI上場ラッシュ

<!--
全URL: https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/ / https://amplifilabs.com/post/kimi-k3-the-complete-guide-to-moonshot-ais-2-8t-model / https://northflank.com/blog/what-is-kimi-k3-self-hosting / https://vllm.ai/blog/2026-07-22-kimi-k3-preview / https://openrouter.ai/moonshotai/kimi-k3 / https://technode.com/2026/07/22/moonshot-ai-reportedly-plans-final-pre-ipo-round-at-50-billion-valuation/ / https://fortune.com/2026/07/23/moonshot-deepseek-great-chinese-ai-ipo-rush/ （二次情報源 SCMP・MLQ・Precedence Research・Gizmochina は紙幅の都合で本文から割愛）
-->
