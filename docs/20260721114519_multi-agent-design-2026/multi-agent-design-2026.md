---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "マルチエージェント設計 2026"
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
# マルチエージェント設計 2026

> *6つのオーケストレーションパターンと本番化の指針 ／ テックリーダーのための設計ガイド*

- 単一エージェントの限界を超えるための、実務に効く設計判断
- パターン選択・コスト・本番運用の観点で意思決定する

<!--
本デッキはテックリーダーとEMが「マルチ化すべきか、するならどの構成か」を判断するための設計ガイド。
-->

---

# マルチ化は万能薬ではない。パターン選択が成否を分ける

> *正しいパターンなら性能+90.2%、誤ればコストは10倍に膨らむ*

<div class="fig">
<svg viewBox="0 0 960 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="40" y="150" width="180" height="110" rx="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
  <text x="130" y="195" text-anchor="middle" font-size="20" fill="#334155" font-weight="bold">単一</text>
  <text x="130" y="222" text-anchor="middle" font-size="20" fill="#334155" font-weight="bold">エージェント</text>
  <line x1="230" y1="205" x2="400" y2="205" stroke="#6b46c1" stroke-width="3"/>
  <polygon points="400,205 384,197 384,213" fill="#6b46c1"/>
  <text x="315" y="192" text-anchor="middle" font-size="16" fill="#6b46c1">マルチ化</text>
  <rect x="420" y="70" width="250" height="120" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="545" y="115" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">正しいパターン</text>
  <text x="545" y="150" text-anchor="middle" font-size="26" fill="#6b46c1" font-weight="bold">性能 +90.2%</text>
  <line x1="400" y1="195" x2="418" y2="140" stroke="#6b46c1" stroke-width="2.5"/>
  <polygon points="418,140 402,150 414,158" fill="#6b46c1"/>
  <rect x="420" y="230" width="250" height="120" rx="12" fill="#fef2f2" stroke="#b91c1c" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="545" y="275" text-anchor="middle" font-size="20" fill="#991b1b" font-weight="bold">誤ったパターン</text>
  <text x="545" y="310" text-anchor="middle" font-size="26" fill="#dc2626" font-weight="bold">コスト 10倍</text>
  <line x1="400" y1="215" x2="418" y2="280" stroke="#b91c1c" stroke-width="2.5"/>
  <polygon points="418,280 402,272 414,264" fill="#b91c1c"/>
  <text x="760" y="205" text-anchor="middle" font-size="18" fill="#475569">分岐は</text>
  <text x="760" y="232" text-anchor="middle" font-size="18" fill="#475569">設計次第</text>
</svg>
</div>

<!--
BLUF。マルチ化そのものが価値ではなく、タスク特性に合ったオーケストレーションパターンを選べるかどうかが分岐点。90.2%はAnthropicのマルチエージェント研究、10倍はトークンコストの複利増加。
-->

---

# 本日の道筋：状況→複雑化→問い→答えで設計判断に至る

<div class="fig">
<svg viewBox="0 0 980 360" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="20" y="130" width="200" height="110" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="120" y="170" text-anchor="middle" font-size="22" fill="#1d4ed8" font-weight="bold">S 状況</text>
  <text x="120" y="200" text-anchor="middle" font-size="15" fill="#475569">単一で回っている</text>
  <rect x="260" y="130" width="200" height="110" rx="12" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="360" y="170" text-anchor="middle" font-size="22" fill="#5b21b6" font-weight="bold">C 複雑化</text>
  <text x="360" y="200" text-anchor="middle" font-size="15" fill="#475569">文脈・専門性が限界</text>
  <rect x="500" y="130" width="200" height="110" rx="12" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="600" y="170" text-anchor="middle" font-size="22" fill="#5b21b6" font-weight="bold">Q 問い</text>
  <text x="600" y="200" text-anchor="middle" font-size="15" fill="#475569">どう分割し統合するか</text>
  <rect x="740" y="130" width="220" height="110" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="850" y="170" text-anchor="middle" font-size="22" fill="#5b21b6" font-weight="bold">A 答え</text>
  <text x="850" y="200" text-anchor="middle" font-size="15" fill="#475569">6パターンで選ぶ</text>
  <line x1="220" y1="185" x2="258" y2="185" stroke="#94a3b8" stroke-width="2.5"/>
  <polygon points="258,185 244,178 244,192" fill="#94a3b8"/>
  <line x1="460" y1="185" x2="498" y2="185" stroke="#94a3b8" stroke-width="2.5"/>
  <polygon points="498,185 484,178 484,192" fill="#94a3b8"/>
  <line x1="700" y1="185" x2="738" y2="185" stroke="#6b46c1" stroke-width="2.5"/>
  <polygon points="738,185 724,178 724,192" fill="#6b46c1"/>
  <text x="490" y="60" text-anchor="middle" font-size="18" fill="#334155" font-weight="bold">SCQAナラティブで結論まで導く</text>
</svg>
</div>

<!--
本デッキの構成をSCQAで提示。状況(単一で回っている)→複雑化(限界)→問い(分割と統合)→答え(6パターン選択と本番化)。
-->

---

<!-- _class: lead -->
# なぜ今マルチエージェントか

- 単一エージェントの限界と、マルチ化が解く問題を整理する


---

# 単一エージェントは文脈・専門性・並列性の3点で頭打ちになる

<div class="fig">
<svg viewBox="0 0 960 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="30" y="90" width="280" height="230" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="170" y="130" text-anchor="middle" font-size="22" fill="#1d4ed8" font-weight="bold">① 文脈</text>
  <text x="170" y="175" text-anchor="middle" font-size="17" fill="#334155">コンテキスト窓が</text>
  <text x="170" y="202" text-anchor="middle" font-size="17" fill="#334155">逼迫する</text>
  <text x="170" y="250" text-anchor="middle" font-size="15" fill="#64748b">長い履歴で精度が</text>
  <text x="170" y="274" text-anchor="middle" font-size="15" fill="#64748b">劣化・逸脱</text>
  <rect x="340" y="90" width="280" height="230" rx="14" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="480" y="130" text-anchor="middle" font-size="22" fill="#5b21b6" font-weight="bold">② 専門性</text>
  <text x="480" y="175" text-anchor="middle" font-size="17" fill="#334155">分業ができない</text>
  <text x="480" y="222" text-anchor="middle" font-size="15" fill="#64748b">1体に全役割を</text>
  <text x="480" y="246" text-anchor="middle" font-size="15" fill="#64748b">詰め込むと指示が</text>
  <text x="480" y="270" text-anchor="middle" font-size="15" fill="#64748b">曖昧化</text>
  <rect x="650" y="90" width="280" height="230" rx="14" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="790" y="130" text-anchor="middle" font-size="22" fill="#334155" font-weight="bold">③ 並列性</text>
  <text x="790" y="175" text-anchor="middle" font-size="17" fill="#334155">逐次実行のみ</text>
  <text x="790" y="222" text-anchor="middle" font-size="15" fill="#64748b">独立作業も直列に</text>
  <text x="790" y="246" text-anchor="middle" font-size="15" fill="#64748b">なり待ち時間が</text>
  <text x="790" y="270" text-anchor="middle" font-size="15" fill="#64748b">積み上がる</text>
  <text x="480" y="55" text-anchor="middle" font-size="18" fill="#334155" font-weight="bold">この3点がマルチ化の動機になる</text>
</svg>
</div>

<!--
単一エージェントの限界を3つに整理。文脈=コンテキスト窓の逼迫、専門性=役割分業の不可、並列性=逐次実行のみ。これがマルチ化の設計動機。
-->

---

# 実証：マルチ構成が単一Opusを90.2%上回った

> *orchestrator-worker型が広い探索タスクで単一エージェントを大きく上回る*

<div class="fig">
<svg viewBox="0 0 900 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <line x1="150" y1="60" x2="150" y2="340" stroke="#94a3b8" stroke-width="2"/>
  <line x1="150" y1="340" x2="850" y2="340" stroke="#94a3b8" stroke-width="2"/>
  <rect x="250" y="230" width="140" height="110" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
  <text x="320" y="210" text-anchor="middle" font-size="20" fill="#334155" font-weight="bold">基準</text>
  <text x="320" y="370" text-anchor="middle" font-size="17" fill="#334155">単一Opus</text>
  <rect x="560" y="90" width="140" height="250" fill="#8b5cf6" stroke="#6b46c1" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="630" y="70" text-anchor="middle" font-size="22" fill="#5b21b6" font-weight="bold">+90.2%</text>
  <text x="630" y="370" text-anchor="middle" font-size="17" fill="#334155">マルチ構成</text>
  <text x="630" y="395" text-anchor="middle" font-size="14" fill="#64748b">orchestrator-worker</text>
  <text x="90" y="100" text-anchor="middle" font-size="15" fill="#64748b">性能</text>
  <text x="90" y="335" text-anchor="middle" font-size="15" fill="#64748b">低</text>
  <text x="500" y="30" text-anchor="middle" font-size="14" fill="#94a3b8">出典: Anthropic multi-agent research system</text>
</svg>
</div>

<!--
Anthropicのマルチエージェント研究システムの評価。orchestrator-worker構成が広範な調査タスクで単一Opusエージェントを90.2%上回った。ただし後述のとおりトークン消費は大きい。
-->

---

# 2026フレームワーク地図：用途で棲み分ける4強

> *本番運用ならLangGraph、試作速度ならCrewAI、研究討論はAutoGen、軽量ハンドオフはSwarm*

<div class="fig">
<svg viewBox="0 0 900 460" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <line x1="450" y1="40" x2="450" y2="420" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="70" y1="230" x2="830" y2="230" stroke="#cbd5e1" stroke-width="2"/>
  <text x="450" y="25" text-anchor="middle" font-size="15" fill="#64748b">試作が速い ↑</text>
  <text x="450" y="445" text-anchor="middle" font-size="15" fill="#64748b">↓ 作り込みが要る</text>
  <text x="90" y="215" text-anchor="start" font-size="15" fill="#64748b">← 本番適性 低</text>
  <text x="810" y="215" text-anchor="end" font-size="15" fill="#64748b">本番適性 高 →</text>
  <rect x="560" y="270" width="210" height="110" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="665" y="310" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">LangGraph</text>
  <text x="665" y="340" text-anchor="middle" font-size="14" fill="#475569">本番最大手・状態機械</text>
  <text x="665" y="362" text-anchor="middle" font-size="14" fill="#475569">可観測性が強い</text>
  <rect x="560" y="80" width="210" height="110" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="665" y="120" text-anchor="middle" font-size="20" fill="#1d4ed8" font-weight="bold">CrewAI</text>
  <text x="665" y="150" text-anchor="middle" font-size="14" fill="#475569">試作が速い</text>
  <text x="665" y="172" text-anchor="middle" font-size="14" fill="#475569">可観測性は弱い</text>
  <rect x="120" y="80" width="210" height="110" rx="12" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="225" y="120" text-anchor="middle" font-size="20" fill="#334155" font-weight="bold">AutoGen</text>
  <text x="225" y="150" text-anchor="middle" font-size="14" fill="#475569">研究・討論向き</text>
  <text x="225" y="172" text-anchor="middle" font-size="14" fill="#475569">会話駆動</text>
  <rect x="120" y="270" width="210" height="110" rx="12" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="225" y="310" text-anchor="middle" font-size="20" fill="#334155" font-weight="bold">OpenAI Swarm</text>
  <text x="225" y="340" text-anchor="middle" font-size="14" fill="#475569">軽量ハンドオフ</text>
  <text x="225" y="362" text-anchor="middle" font-size="14" fill="#475569">狭用途・実験的</text>
</svg>
</div>

<!--
2026時点の主要4フレームワークを2軸(本番適性×試作速度)で配置。LangGraphが本番運用の最大手、CrewAIは試作が速いが可観測性が弱い、AutoGenは研究・討論、OpenAI Swarmは軽量ハンドオフで狭用途。
-->

---

# だが3体構成はトークンコストが約10倍に膨らむ

> *エージェント数に対しコストは非線形に増える。通常チャット比では約15倍*

<div class="fig">
<svg viewBox="0 0 900 420" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <line x1="120" y1="60" x2="120" y2="340" stroke="#94a3b8" stroke-width="2"/>
  <line x1="120" y1="340" x2="840" y2="340" stroke="#94a3b8" stroke-width="2"/>
  <rect x="190" y="315" width="110" height="25" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
  <text x="245" y="365" text-anchor="middle" font-size="16" fill="#334155">単一1体</text>
  <text x="245" y="305" text-anchor="middle" font-size="15" fill="#475569">×1</text>
  <rect x="400" y="120" width="110" height="220" fill="#a78bfa" stroke="#6b46c1" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="455" y="365" text-anchor="middle" font-size="16" fill="#334155">マルチ3体</text>
  <text x="455" y="105" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">約10倍</text>
  <rect x="620" y="70" width="110" height="270" fill="#7c3aed" stroke="#5b21b6" stroke-width="2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="675" y="365" text-anchor="middle" font-size="16" fill="#334155">対 通常チャット</text>
  <text x="675" y="55" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">約15倍</text>
  <text x="75" y="100" text-anchor="middle" font-size="15" fill="#64748b">トークン</text>
  <text x="75" y="122" text-anchor="middle" font-size="15" fill="#64748b">コスト</text>
  <text x="480" y="400" text-anchor="middle" font-size="14" fill="#94a3b8">出典: Augment Code / Anthropic（トークンはエージェント数に非線形）</text>
</svg>
</div>

<!--
マルチ化のコスト面。エージェント数の増加に対しトークンコストは線形でなく複利的に増える。1体→3体で約10倍、通常のチャット利用と比べると約15倍。出典はAugment Code / Anthropic。だからこそ「効果に見合うタスクか」の見極めが必要。
-->

---

<!-- _class: fit-70 -->
# 状況の要点：単一で回るうちに設計を決めておくべき理由

> *限界に直面してから慌てて分割すると、コストと複雑さが同時に爆発する*

- 文脈・専門性・並列性の限界は、負荷が上がるほど同時に顕在化する
- マルチ化は性能を最大90.2%押し上げうる一方、コストは10倍規模に膨らむ
- フレームワークは用途で棲み分けており、あとから乗り換える負担は大きい
- だからパターンとコスト構造を理解した上で最初の一手を選ぶ必要がある

<!--
Sセクションの締め。単一で回っている今こそ設計判断の好機。限界到達後の対応はコストと複雑性が同時に膨らむ。
-->

---

<!-- _class: lead -->
# 6つのオーケストレーションパターン

- タスク特性に応じて選ぶ、6つの標準的な構成を順に見ていく


---

# 6つのパターンを1枚で俯瞰する

> *逐次・並列・監督者-作業者・階層委譲・合議討論・人間介在の6択から選ぶ*

<div class="fig">
<svg viewBox="0 0 960 440" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="30" y="40" width="280" height="180" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="170" y="75" text-anchor="middle" font-size="19" fill="#1d4ed8" font-weight="bold">① 逐次チェーン</text>
  <rect x="70" y="105" width="50" height="40" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <rect x="155" y="105" width="50" height="40" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <rect x="240" y="105" width="50" height="40" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <line x1="120" y1="125" x2="153" y2="125" stroke="#2563eb" stroke-width="2"/><polygon points="153,125 143,120 143,130" fill="#2563eb"/>
  <line x1="205" y1="125" x2="238" y2="125" stroke="#2563eb" stroke-width="2"/><polygon points="238,125 228,120 228,130" fill="#2563eb"/>
  <text x="170" y="190" text-anchor="middle" font-size="14" fill="#475569">出力を順に受け渡す</text>
  <rect x="340" y="40" width="280" height="180" rx="12" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="480" y="75" text-anchor="middle" font-size="19" fill="#5b21b6" font-weight="bold">② 並列ファンアウト</text>
  <rect x="455" y="95" width="50" height="36" rx="6" fill="#ffffff" stroke="#6b46c1"/>
  <rect x="370" y="150" width="46" height="32" rx="6" fill="#ffffff" stroke="#6b46c1"/>
  <rect x="457" y="150" width="46" height="32" rx="6" fill="#ffffff" stroke="#6b46c1"/>
  <rect x="544" y="150" width="46" height="32" rx="6" fill="#ffffff" stroke="#6b46c1"/>
  <line x1="480" y1="131" x2="393" y2="150" stroke="#6b46c1" stroke-width="2"/>
  <line x1="480" y1="131" x2="480" y2="150" stroke="#6b46c1" stroke-width="2"/>
  <line x1="480" y1="131" x2="567" y2="150" stroke="#6b46c1" stroke-width="2"/>
  <text x="480" y="205" text-anchor="middle" font-size="14" fill="#475569">独立タスクを同時展開</text>
  <rect x="650" y="40" width="280" height="180" rx="12" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="790" y="75" text-anchor="middle" font-size="19" fill="#334155" font-weight="bold">③ 監督者-作業者</text>
  <rect x="765" y="95" width="50" height="36" rx="6" fill="#ffffff" stroke="#475569"/>
  <rect x="705" y="155" width="46" height="30" rx="6" fill="#ffffff" stroke="#475569"/>
  <rect x="828" y="155" width="46" height="30" rx="6" fill="#ffffff" stroke="#475569"/>
  <line x1="790" y1="131" x2="728" y2="155" stroke="#475569" stroke-width="2"/>
  <line x1="790" y1="131" x2="851" y2="155" stroke="#475569" stroke-width="2"/>
  <text x="790" y="205" text-anchor="middle" font-size="14" fill="#475569">監督が割当と統合を担う</text>
  <rect x="30" y="235" width="280" height="180" rx="12" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="170" y="270" text-anchor="middle" font-size="19" fill="#334155" font-weight="bold">④ 階層委譲</text>
  <rect x="145" y="288" width="50" height="30" rx="6" fill="#ffffff" stroke="#475569"/>
  <rect x="95" y="340" width="46" height="28" rx="6" fill="#ffffff" stroke="#475569"/>
  <rect x="200" y="340" width="46" height="28" rx="6" fill="#ffffff" stroke="#475569"/>
  <line x1="170" y1="318" x2="118" y2="340" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="318" x2="223" y2="340" stroke="#475569" stroke-width="2"/>
  <text x="170" y="398" text-anchor="middle" font-size="14" fill="#475569">多層に責務を委ねる</text>
  <rect x="340" y="235" width="280" height="180" rx="12" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="480" y="270" text-anchor="middle" font-size="19" fill="#5b21b6" font-weight="bold">⑤ 合議・討論</text>
  <circle cx="440" cy="320" r="20" fill="#ffffff" stroke="#6b46c1"/>
  <circle cx="520" cy="320" r="20" fill="#ffffff" stroke="#6b46c1"/>
  <line x1="460" y1="320" x2="500" y2="320" stroke="#6b46c1" stroke-width="2"/>
  <text x="480" y="398" text-anchor="middle" font-size="14" fill="#475569">複数案を突き合わせる</text>
  <rect x="650" y="235" width="280" height="180" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="790" y="270" text-anchor="middle" font-size="19" fill="#1d4ed8" font-weight="bold">⑥ 人間介在 HITL</text>
  <rect x="715" y="295" width="50" height="30" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <rect x="815" y="295" width="50" height="30" rx="6" fill="#dbeafe" stroke="#2563eb"/>
  <text x="840" y="314" text-anchor="middle" font-size="13" fill="#1d4ed8">人</text>
  <line x1="765" y1="310" x2="813" y2="310" stroke="#2563eb" stroke-width="2"/>
  <text x="790" y="398" text-anchor="middle" font-size="14" fill="#475569">要所で人が承認する</text>
</svg>
</div>

<!--
6パターンの俯瞰。①逐次チェーン②並列ファンアウト③監督者-作業者④階層委譲⑤合議・討論⑥人間介在HITL。以降のスライドで①〜③を詳説する（④〜⑥は後続チャンク）。
-->

---

# ①逐次チェーン：各段の構造化出力を次段へ渡す

> *手順が確定した処理に最適。ただし1段の失敗が全体に波及する*

<div class="fig">
<svg viewBox="0 0 940 340" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="40" y="120" width="200" height="100" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="140" y="160" text-anchor="middle" font-size="20" fill="#1d4ed8" font-weight="bold">A 抽出</text>
  <text x="140" y="190" text-anchor="middle" font-size="14" fill="#475569">生入力→構造化</text>
  <rect x="370" y="120" width="200" height="100" rx="12" fill="#f5f3ff" stroke="#6b46c1" stroke-width="2"/>
  <text x="470" y="160" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">B 変換</text>
  <text x="470" y="190" text-anchor="middle" font-size="14" fill="#475569">整形・検証</text>
  <rect x="700" y="120" width="200" height="100" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="800" y="160" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">C 生成</text>
  <text x="800" y="190" text-anchor="middle" font-size="14" fill="#475569">最終成果物</text>
  <line x1="240" y1="170" x2="368" y2="170" stroke="#6b46c1" stroke-width="3"/><polygon points="368,170 352,162 352,178" fill="#6b46c1"/>
  <line x1="570" y1="170" x2="698" y2="170" stroke="#6b46c1" stroke-width="3"/><polygon points="698,170 682,162 682,178" fill="#6b46c1"/>
  <text x="304" y="155" text-anchor="middle" font-size="13" fill="#6b46c1">JSON</text>
  <text x="634" y="155" text-anchor="middle" font-size="13" fill="#6b46c1">JSON</text>
  <text x="470" y="70" text-anchor="middle" font-size="17" fill="#334155" font-weight="bold">各段が次段の入力契約（スキーマ）を満たす</text>
  <text x="470" y="270" text-anchor="middle" font-size="15" fill="#64748b">向く: 手順が確定／向かない: 分岐や再試行が多い処理</text>
</svg>
</div>

<!--
①逐次チェーン。A→B→Cと構造化出力(JSON等)を受け渡す。段間はスキーマ契約で結合。手順が確定した処理に強いが、1段の失敗が下流に波及するので各段の検証が重要。
-->

---

# ②並列ファンアウト：独立タスクを同時展開して束ねる

> *調査・要約など相互依存のない作業でレイテンシを大幅短縮できる*

<div class="fig">
<svg viewBox="0 0 940 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="390" y="40" width="170" height="80" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="475" y="75" text-anchor="middle" font-size="18" fill="#5b21b6" font-weight="bold">オーケストレータ</text>
  <text x="475" y="100" text-anchor="middle" font-size="14" fill="#475569">タスクを分配</text>
  <rect x="70" y="190" width="150" height="70" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="145" y="232" text-anchor="middle" font-size="16" fill="#1d4ed8">worker 1</text>
  <rect x="280" y="190" width="150" height="70" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="355" y="232" text-anchor="middle" font-size="16" fill="#1d4ed8">worker 2</text>
  <rect x="490" y="190" width="150" height="70" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="565" y="232" text-anchor="middle" font-size="16" fill="#1d4ed8">worker 3</text>
  <rect x="700" y="190" width="150" height="70" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="775" y="232" text-anchor="middle" font-size="16" fill="#1d4ed8">worker N</text>
  <line x1="475" y1="120" x2="145" y2="190" stroke="#6b46c1" stroke-width="2"/><polygon points="145,190 152,178 160,188" fill="#6b46c1"/>
  <line x1="475" y1="120" x2="355" y2="190" stroke="#6b46c1" stroke-width="2"/><polygon points="355,190 349,178 360,181" fill="#6b46c1"/>
  <line x1="475" y1="120" x2="565" y2="190" stroke="#6b46c1" stroke-width="2"/><polygon points="565,190 554,181 565,178" fill="#6b46c1"/>
  <line x1="475" y1="120" x2="775" y2="190" stroke="#6b46c1" stroke-width="2"/><polygon points="775,190 764,188 772,178" fill="#6b46c1"/>
  <rect x="355" y="320" width="240" height="60" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="475" y="357" text-anchor="middle" font-size="16" fill="#334155" font-weight="bold">マージ・集約</text>
  <line x1="145" y1="260" x2="380" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
  <line x1="355" y1="260" x2="440" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
  <line x1="565" y1="260" x2="510" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
  <line x1="775" y1="260" x2="570" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
</svg>
</div>

<!--
②並列ファンアウト。オーケストレータがN個の独立タスクをworkerに分配し、結果をマージする。相互依存のない調査・要約でレイテンシを短縮。ただし各workerが独立にトークンを消費するのでコスト増に注意。
-->

---

# ③監督者-作業者：最初の一手はここから始めるべき

> *最も広くサポートされ失敗モードが明快。マルチ化の標準的な出発点*

<div class="fig">
<svg viewBox="0 0 920 400" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
  <rect x="350" y="40" width="220" height="90" rx="12" fill="#ede9fe" stroke="#6b46c1" stroke-width="2.5" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="460" y="78" text-anchor="middle" font-size="20" fill="#5b21b6" font-weight="bold">supervisor</text>
  <text x="460" y="105" text-anchor="middle" font-size="14" fill="#475569">計画・割当・評価</text>
  <rect x="120" y="230" width="160" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="200" y="276" text-anchor="middle" font-size="16" fill="#1d4ed8">worker A</text>
  <rect x="380" y="230" width="160" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="460" y="276" text-anchor="middle" font-size="16" fill="#1d4ed8">worker B</text>
  <rect x="640" y="230" width="160" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="720" y="276" text-anchor="middle" font-size="16" fill="#1d4ed8">worker C</text>
  <line x1="430" y1="130" x2="210" y2="230" stroke="#6b46c1" stroke-width="2"/><polygon points="210,230 214,217 224,225" fill="#6b46c1"/>
  <line x1="460" y1="130" x2="460" y2="230" stroke="#6b46c1" stroke-width="2"/><polygon points="460,230 454,218 466,218" fill="#6b46c1"/>
  <line x1="490" y1="130" x2="710" y2="230" stroke="#6b46c1" stroke-width="2"/><polygon points="710,230 696,225 706,217" fill="#6b46c1"/>
  <path d="M 240 230 Q 300 175 400 130" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="6 4"/><polygon points="400,130 388,135 392,146" fill="#94a3b8"/>
  <path d="M 690 230 Q 620 175 520 130" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="6 4"/><polygon points="520,130 528,135 524,146" fill="#94a3b8"/>
  <text x="460" y="160" text-anchor="middle" font-size="13" fill="#6b46c1">割当 ↓　結果 ↑（点線）でループ</text>
  <text x="460" y="355" text-anchor="middle" font-size="15" fill="#64748b">結果が基準未達なら supervisor が再割当（自己修正ループ）</text>
</svg>
</div>

<!--
③監督者-作業者。supervisorが計画・割当・評価を担い、workerが実行。結果をsupervisorに戻し、基準未達なら再割当する自己修正ループ。最も広くサポートされ失敗モードが明快なので、マルチ化の最初の一手として推奨。
-->

---

<!-- _class: fit-70 -->
# ④階層委譲は大規模タスクを木構造で分割統治する

> *leadが中間層に委譲し、末端workerが並列で実務をこなす*

<div class="fig">
<svg viewBox="0 0 900 460" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="370" y="20" width="160" height="56" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="450" y="54" fill="#ffffff" font-size="20" font-weight="bold" text-anchor="middle">Lead エージェント</text>
<line x1="450" y1="76" x2="230" y2="170" stroke="#475569" stroke-width="2"/>
<line x1="450" y1="76" x2="670" y2="170" stroke="#475569" stroke-width="2"/>
<rect x="130" y="170" width="200" height="52" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="230" y="202" fill="#ffffff" font-size="17" text-anchor="middle">中間管理A（設計）</text>
<rect x="570" y="170" width="200" height="52" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="670" y="202" fill="#ffffff" font-size="17" text-anchor="middle">中間管理B（実装）</text>
<line x1="230" y1="222" x2="140" y2="320" stroke="#94a3b8" stroke-width="2"/>
<line x1="230" y1="222" x2="320" y2="320" stroke="#94a3b8" stroke-width="2"/>
<line x1="670" y1="222" x2="580" y2="320" stroke="#94a3b8" stroke-width="2"/>
<line x1="670" y1="222" x2="760" y2="320" stroke="#94a3b8" stroke-width="2"/>
<rect x="70" y="320" width="140" height="46" rx="8" fill="#e0e7ff" stroke="#6b46c1" stroke-width="1.5"/>
<text x="140" y="348" fill="#475569" font-size="15" text-anchor="middle">worker</text>
<rect x="250" y="320" width="140" height="46" rx="8" fill="#e0e7ff" stroke="#6b46c1" stroke-width="1.5"/>
<text x="320" y="348" fill="#475569" font-size="15" text-anchor="middle">worker</text>
<rect x="510" y="320" width="140" height="46" rx="8" fill="#e0e7ff" stroke="#6b46c1" stroke-width="1.5"/>
<text x="580" y="348" fill="#475569" font-size="15" text-anchor="middle">worker</text>
<rect x="690" y="320" width="140" height="46" rx="8" fill="#e0e7ff" stroke="#6b46c1" stroke-width="1.5"/>
<text x="760" y="348" fill="#475569" font-size="15" text-anchor="middle">worker</text>
<text x="450" y="420" fill="#475569" font-size="16" text-anchor="middle">深さ方向にタスクを再帰分解し、末端で並列実行する</text>
</svg>
</div>

- 各層は「配下への委譲」だけを責務にし、末端のworkerが実作業を担う
- 巨大タスクを2〜3階層に畳むことで、1エージェントの文脈窓に収める
- 各中間管理は部分成果を要約して上位へ返し、詳細は下層に閉じ込める

<!--
木構造で分割統治するのが階層委譲。深い階層は遅延とコストを増やすので2〜3段に抑えるのが実務的。
-->

---

<!-- _class: fit-88 -->
# ⑤合議・討論は複数意見を戦わせて精度を引き上げる

> *独立した回答を審判が集約し、単体より誤りを減らす*

<div class="fig">
<svg viewBox="0 0 900 440" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="60" y="70" width="180" height="54" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="150" y="103" fill="#ffffff" font-size="18" text-anchor="middle">提案者 A</text>
<rect x="60" y="190" width="180" height="54" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="150" y="223" fill="#ffffff" font-size="18" text-anchor="middle">提案者 B</text>
<rect x="60" y="310" width="180" height="54" rx="10" fill="#475569" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="150" y="343" fill="#ffffff" font-size="18" text-anchor="middle">提案者 C</text>
<line x1="240" y1="97" x2="400" y2="200" stroke="#94a3b8" stroke-width="2"/>
<line x1="240" y1="217" x2="400" y2="217" stroke="#94a3b8" stroke-width="2"/>
<line x1="240" y1="337" x2="400" y2="234" stroke="#94a3b8" stroke-width="2"/>
<rect x="410" y="160" width="210" height="110" rx="12" fill="#e0e7ff" stroke="#6b46c1" stroke-width="2"/>
<text x="515" y="205" fill="#4c1d95" font-size="19" font-weight="bold" text-anchor="middle">審判 / 集約</text>
<text x="515" y="235" fill="#475569" font-size="14" text-anchor="middle">討論・投票で選別</text>
<polygon points="620,200 650,215 620,230" fill="#6b46c1"/>
<line x1="620" y1="215" x2="645" y2="215" stroke="#6b46c1" stroke-width="2"/>
<rect x="660" y="185" width="180" height="60" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="750" y="221" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">合意結論</text>
<text x="450" y="320" fill="#475569" font-size="15" text-anchor="middle">AutoGen 等が得意とする「役割を持つ複数エージェントの討論」構造</text>
</svg>
</div>

- 同一問いに独立回答させ、相互批判で弱い答えを淘汰する
- 審判エージェントが多数決や根拠比較で最終結論を確定する
- コストは増えるが、推論の難所や事実確認で精度が安定する

<!--
debate/consensusパターン。AutoGenのマルチエージェント会話が代表例。コスト増と精度のトレードオフを意識。
-->

---

<!-- _class: fit-82 -->
# ⑥人間介在は不可逆操作の直前に承認ゲートを差し込む

> *削除・送金・デプロイの手前で必ず止め、人が最終決裁する*

<div class="fig">
<svg viewBox="0 0 940 400" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="30" y="160" width="170" height="60" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="115" y="196" fill="#ffffff" font-size="18" text-anchor="middle">エージェント</text>
<line x1="200" y1="190" x2="250" y2="190" stroke="#475569" stroke-width="2.5"/>
<polygon points="250,182 272,190 250,198" fill="#475569"/>
<rect x="280" y="155" width="180" height="70" rx="10" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
<text x="370" y="185" fill="#7c2d12" font-size="17" font-weight="bold" text-anchor="middle">承認ゲート</text>
<text x="370" y="209" fill="#7c2d12" font-size="14" text-anchor="middle">実行を一時停止</text>
<rect x="330" y="290" width="80" height="48" rx="8" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="370" y="320" fill="#ffffff" font-size="15" text-anchor="middle">人間</text>
<line x1="370" y1="290" x2="370" y2="225" stroke="#6b46c1" stroke-width="2" stroke-dasharray="5 4"/>
<polygon points="362,235 370,215 378,235" fill="#6b46c1"/>
<line x1="460" y1="190" x2="510" y2="190" stroke="#16a34a" stroke-width="2.5"/>
<polygon points="510,182 532,190 510,198" fill="#16a34a"/>
<text x="495" y="178" fill="#16a34a" font-size="13" text-anchor="middle">承認</text>
<rect x="540" y="160" width="180" height="60" rx="10" fill="#475569" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="630" y="190" fill="#ffffff" font-size="16" text-anchor="middle">不可逆操作</text>
<text x="630" y="210" fill="#cbd5e1" font-size="13" text-anchor="middle">削除/送金/デプロイ</text>
<line x1="370" y1="338" x2="760" y2="338" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/>
<text x="810" y="343" fill="#dc2626" font-size="14" text-anchor="middle">却下→中断</text>
</svg>
</div>

- 自動化の利便と安全性を両立させ、致命的な誤操作を構造で防ぐ
- 承認対象は「取り返しがつかない副作用」に限定し、通常操作は止めない
- 承認履歴を監査ログに残し、誰が何を許可したかを追跡可能にする

<!--
HITL。ゲートは不可逆操作に絞る。全操作に承認を挟むと人間がボトルネックになり自動化の意味を失う。
-->

---

<!-- _class: fit-94 -->
# 独立性×信頼性要求の2軸で6パターンは選び分けられる

> *サブタスクが独立で信頼性要求が高いほど、並列化と検証を厚くする*

<div class="fig">
<svg viewBox="0 0 900 500" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="440" x2="860" y2="440" stroke="#475569" stroke-width="2"/>
<line x1="120" y1="440" x2="120" y2="40" stroke="#475569" stroke-width="2"/>
<polygon points="852,432 872,440 852,448" fill="#475569"/>
<polygon points="112,48 120,28 128,48" fill="#475569"/>
<text x="490" y="478" fill="#475569" font-size="17" text-anchor="middle">サブタスクの独立性 →</text>
<text x="66" y="240" fill="#475569" font-size="17" text-anchor="middle" transform="rotate(-90 66 240)">信頼性・正確性要求 →</text>
<line x1="490" y1="440" x2="490" y2="60" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="120" y1="250" x2="860" y2="250" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
<rect x="150" y="290" width="300" height="130" rx="10" fill="#eef2ff" stroke="#94a3b8" stroke-width="1.5"/>
<text x="300" y="330" fill="#4c1d95" font-size="16" font-weight="bold" text-anchor="middle">低独立・低要求</text>
<text x="300" y="360" fill="#475569" font-size="15" text-anchor="middle">①単一 / ②パイプライン</text>
<text x="300" y="388" fill="#64748b" font-size="13" text-anchor="middle">逐次処理で十分</text>
<rect x="530" y="290" width="300" height="130" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
<text x="680" y="330" fill="#1e40af" font-size="16" font-weight="bold" text-anchor="middle">高独立・低要求</text>
<text x="680" y="360" fill="#475569" font-size="15" text-anchor="middle">③並列（監督者-worker）</text>
<text x="680" y="388" fill="#64748b" font-size="13" text-anchor="middle">扇形分散で高速化</text>
<rect x="150" y="80" width="300" height="130" rx="10" fill="#f3e8ff" stroke="#6b46c1" stroke-width="1.5"/>
<text x="300" y="120" fill="#4c1d95" font-size="16" font-weight="bold" text-anchor="middle">低独立・高要求</text>
<text x="300" y="150" fill="#475569" font-size="15" text-anchor="middle">⑤合議 / ⑥人間介在</text>
<text x="300" y="178" fill="#64748b" font-size="13" text-anchor="middle">検証・承認を厚く</text>
<rect x="530" y="80" width="300" height="130" rx="10" fill="#ede9fe" stroke="#6b46c1" stroke-width="1.5"/>
<text x="680" y="120" fill="#4c1d95" font-size="16" font-weight="bold" text-anchor="middle">高独立・高要求</text>
<text x="680" y="150" fill="#475569" font-size="15" text-anchor="middle">④階層委譲＋合議</text>
<text x="680" y="178" fill="#64748b" font-size="13" text-anchor="middle">分割統治＋相互検証</text>
</svg>
</div>

- まず「サブタスクは分解できるか」で並列化の可否を判断する
- 次に「誤りの許容度」で検証層（合議・人間介在）の厚みを決める

<!--
2x2で6パターンをマッピング。独立性が並列可否を、信頼性要求が検証層の厚みを決める、という2段の判断。
-->

---

<!-- _class: fit-88 -->
# Anthropicの実装はOpus指揮＋Sonnet並列＋引用パスで動く

> *上位モデルが計画し、下位モデルが独立文脈で並列探索する*

<div class="fig">
<svg viewBox="0 0 940 440" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="370" y="20" width="200" height="62" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="470" y="48" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">Lead（Opus）</text>
<text x="470" y="70" fill="#e9d5ff" font-size="13" text-anchor="middle">計画・分解・統合</text>
<line x1="470" y1="82" x2="180" y2="170" stroke="#475569" stroke-width="2"/>
<line x1="470" y1="82" x2="470" y2="170" stroke="#475569" stroke-width="2"/>
<line x1="470" y1="82" x2="760" y2="170" stroke="#475569" stroke-width="2"/>
<rect x="70" y="170" width="220" height="58" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="180" y="196" fill="#ffffff" font-size="16" text-anchor="middle">subagent（Sonnet）</text>
<text x="180" y="217" fill="#bfdbfe" font-size="12" text-anchor="middle">独立コンテキスト窓</text>
<rect x="360" y="170" width="220" height="58" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="470" y="196" fill="#ffffff" font-size="16" text-anchor="middle">subagent（Sonnet）</text>
<text x="470" y="217" fill="#bfdbfe" font-size="12" text-anchor="middle">独立コンテキスト窓</text>
<rect x="650" y="170" width="220" height="58" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="760" y="196" fill="#ffffff" font-size="16" text-anchor="middle">subagent（Sonnet）</text>
<text x="760" y="217" fill="#bfdbfe" font-size="12" text-anchor="middle">独立コンテキスト窓</text>
<line x1="180" y1="228" x2="440" y2="300" stroke="#94a3b8" stroke-width="2"/>
<line x1="470" y1="228" x2="470" y2="300" stroke="#94a3b8" stroke-width="2"/>
<line x1="760" y1="228" x2="500" y2="300" stroke="#94a3b8" stroke-width="2"/>
<rect x="340" y="300" width="260" height="56" rx="10" fill="#475569" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="470" y="334" fill="#ffffff" font-size="16" text-anchor="middle">引用パス（citation）</text>
<line x1="600" y1="328" x2="720" y2="328" stroke="#6b46c1" stroke-width="2"/>
<polygon points="720,320 742,328 720,336" fill="#6b46c1"/>
<rect x="750" y="302" width="150" height="52" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="825" y="333" fill="#ffffff" font-size="15" text-anchor="middle">出典付き回答</text>
<text x="470" y="400" fill="#475569" font-size="14" text-anchor="middle">別建ての引用パスが各主張に根拠を紐付ける</text>
</svg>
</div>

- 指揮役に強いモデルを充て、探索は安価な並列workerに委ねる
- 各subagentは独立した文脈窓を持ち、互いの探索を汚染しない
- 引用パスを分離し、統合後の主張に出典を後付けで対応させる

<!--
AnthropicのMulti-agent research systemの構成。orchestrator-workerの実例。citationは別パスで担保。
-->

---

<!-- _class: fit-64 -->
# 迷ったら「まず監督者パターン」から始めるべき理由

> *サポートが最広・失敗モードが明快・本番事例が最多の三拍子*

- 最も広くサポートされる：Claude Agent SDK / LangGraph / OpenAI Agents SDK / CrewAI hierarchical が標準機能として提供
- 失敗モードが明快：過剰委譲やループは反復上限・タイムアウトで機械的に抑制できる
- 本番事例が最多：orchestrator-workerは実運用の知見と対策パターンが蓄積されている
- 拡張しやすい：worker数の増減やモデル振り分けで、コストと精度を後から調整できる

<!--
監督者パターンを既定にする根拠。エコシステム広さ・失敗モードの制御しやすさ・事例の多さ。
-->

---

<!-- _class: fit-88 -->
# 過剰委譲と無限ループがコストを静かに暴走させる

> *反復上限とタイムアウトで、増殖する呼び出しを構造的に断つ*

<div class="fig">
<svg viewBox="0 0 920 420" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="230" y="40" fill="#dc2626" font-size="18" font-weight="bold" text-anchor="middle">アンチパターン</text>
<rect x="150" y="70" width="160" height="50" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="230" y="101" fill="#ffffff" font-size="16" text-anchor="middle">エージェントA</text>
<rect x="150" y="250" width="160" height="50" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="230" y="281" fill="#ffffff" font-size="16" text-anchor="middle">エージェントB</text>
<line x1="270" y1="120" x2="270" y2="250" stroke="#dc2626" stroke-width="2"/>
<polygon points="262,242 270,262 278,242" fill="#dc2626"/>
<line x1="190" y1="250" x2="190" y2="120" stroke="#dc2626" stroke-width="2"/>
<polygon points="182,128 190,108 198,128" fill="#dc2626"/>
<text x="230" y="195" fill="#dc2626" font-size="14" text-anchor="middle">相互呼び出し</text>
<text x="230" y="355" fill="#64748b" font-size="14" text-anchor="middle">委譲が委譲を呼び、呼び出しが指数的に増える</text>
<line x1="330" y1="200" x2="420" y2="200" stroke="#475569" stroke-width="2.5"/>
<polygon points="420,192 442,200 420,208" fill="#475569"/>
<text x="680" y="40" fill="#16a34a" font-size="18" font-weight="bold" text-anchor="middle">歯止め</text>
<rect x="480" y="80" width="390" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="675" y="112" fill="#166534" font-size="16" font-weight="bold" text-anchor="middle">反復上限（max depth / max steps）</text>
<text x="675" y="135" fill="#166534" font-size="13" text-anchor="middle">N回で強制停止し暴走を打ち切る</text>
<rect x="480" y="170" width="390" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="675" y="202" fill="#166534" font-size="16" font-weight="bold" text-anchor="middle">タイムアウト / コスト上限</text>
<text x="675" y="225" fill="#166534" font-size="13" text-anchor="middle">実時間・トークン予算で遮断</text>
<rect x="480" y="260" width="390" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="675" y="292" fill="#166534" font-size="16" font-weight="bold" text-anchor="middle">委譲の深さ制限</text>
<text x="675" y="315" fill="#166534" font-size="13" text-anchor="middle">末端workerは再委譲を禁止</text>
</svg>
</div>

- 自律性を上げるほど、暴走の初期兆候はログに埋もれて見えにくい
- 上限は「性能を制限する枷」ではなく「コスト事故を防ぐ保険」と捉える

<!--
over-delegationと相互呼び出しループ。反復上限・タイムアウト・深さ制限の3点で機械的に断つ。
-->

---

<!-- _class: fit-70 -->
# 設計フェーズの結論：軸で選び、上限で守る

> *パターンは独立性×信頼性で選び、自律性は必ず上限で囲う*

- 6パターンは道具箱：単一・パイプライン・並列・階層委譲・合議・人間介在を状況で使い分ける
- 選択軸は2つ：サブタスクの独立性で並列可否を、信頼性要求で検証層の厚みを決める
- 既定は監督者パターン：サポート最広・失敗モード明快・事例最多で、まず試す価値が高い
- 自律性には必ず枷を：反復上限・タイムアウト・深さ制限・人間介在ゲートをセットで設計する

<!--
設計セクションのまとめ。6パターン・2軸・監督者既定・上限の4点で締める。
-->

---

<!-- _class: lead -->
# では、何が本番化を阻むのか

- 設計が正しくても、運用の難所を越えなければ本番には出せない
- 次のセクションで、コスト・障害連鎖・可観測性・文脈受け渡しの4つの壁を見る

<!--
セクション扉。設計から本番化の課題へ橋渡し。
-->

---

<!-- _class: fit-82 -->
# 本番化の難所①：トークン消費は通常チャットの約15倍に膨らむ

> *使用量が性能分散の約80%を説明する＝コスト管理が性能管理そのもの*

<div class="fig">
<svg viewBox="0 0 900 420" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="120" y1="360" x2="820" y2="360" stroke="#475569" stroke-width="2"/>
<rect x="200" y="330" width="120" height="30" rx="4" fill="#94a3b8" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="260" y="310" fill="#475569" font-size="16" text-anchor="middle">通常チャット</text>
<text x="260" y="352" fill="#ffffff" font-size="14" text-anchor="middle">×1</text>
<rect x="520" y="70" width="120" height="290" rx="4" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="580" y="55" fill="#4c1d95" font-size="16" font-weight="bold" text-anchor="middle">マルチエージェント</text>
<text x="580" y="220" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">×15</text>
<text x="580" y="390" fill="#475569" font-size="14" text-anchor="middle">トークン消費</text>
<text x="260" y="390" fill="#475569" font-size="14" text-anchor="middle">トークン消費</text>
<line x1="700" y1="70" x2="820" y2="70" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="770" y="110" fill="#dc2626" font-size="13" text-anchor="middle">性能分散の</text>
<text x="770" y="130" fill="#dc2626" font-size="20" font-weight="bold" text-anchor="middle">約80%</text>
<text x="770" y="152" fill="#dc2626" font-size="13" text-anchor="middle">を説明</text>
</svg>
</div>

- 並列subagentと長い探索文脈が、呼び出しごとにトークンを積み上げる（出典: Anthropic）
- 費用対効果が見合うのは、高価値・並列化可能なタスクに限られる
- トークン予算を先に決め、それを制約として設計に織り込む

<!--
Anthropicのmulti-agent research: トークン約15倍、使用量が性能分散の約80%を説明。コスト前提の設計が必須。
-->

---

<!-- _class: fit-76 -->
# 本番化の難所②：1体の失敗が全体を止める障害連鎖が起きる

> *各ホップにリトライとフォールバックを置き、連鎖を局所化する*

<div class="fig">
<svg viewBox="0 0 940 380" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="40" y="150" width="150" height="58" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="115" y="185" fill="#ffffff" font-size="16" text-anchor="middle">エージェント1</text>
<line x1="190" y1="179" x2="240" y2="179" stroke="#475569" stroke-width="2.5"/>
<polygon points="240,171 262,179 240,187" fill="#475569"/>
<rect x="268" y="150" width="150" height="58" rx="10" fill="#dc2626" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="343" y="178" fill="#ffffff" font-size="16" text-anchor="middle">エージェント2</text>
<text x="343" y="198" fill="#fecaca" font-size="13" text-anchor="middle">失敗 ✕</text>
<line x1="418" y1="179" x2="468" y2="179" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5 4"/>
<polygon points="468,171 490,179 468,187" fill="#dc2626"/>
<rect x="496" y="150" width="150" height="58" rx="10" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
<text x="571" y="178" fill="#7f1d1d" font-size="16" text-anchor="middle">エージェント3</text>
<text x="571" y="198" fill="#7f1d1d" font-size="13" text-anchor="middle">道連れで停止</text>
<line x1="646" y1="179" x2="696" y2="179" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5 4"/>
<polygon points="696,171 718,179 696,187" fill="#dc2626"/>
<rect x="724" y="150" width="150" height="58" rx="10" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
<text x="799" y="183" fill="#7f1d1d" font-size="16" text-anchor="middle">最終出力なし</text>
<rect x="268" y="250" width="150" height="56" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="343" y="275" fill="#166534" font-size="14" text-anchor="middle">リトライ /</text>
<text x="343" y="294" fill="#166534" font-size="14" text-anchor="middle">フォールバック</text>
<line x1="343" y1="250" x2="343" y2="212" stroke="#16a34a" stroke-width="2"/>
<polygon points="335,222 343,202 351,222" fill="#16a34a"/>
<text x="470" y="60" fill="#dc2626" font-size="17" font-weight="bold" text-anchor="middle">カスケード障害：1点の失敗が下流を巻き込む</text>
</svg>
</div>

- 直列の依存が長いほど、1体の失敗が全経路を無効化するリスクが高まる
- 各ホップにリトライ・タイムアウト・代替経路を置き、失敗を局所化する
- 重要経路は冗長化し、部分結果でも成立する設計に寄せる

<!--
カスケード障害。直列依存の脆さ。各ホップにリトライ/フォールバック、部分結果許容の設計。
-->

---

<!-- _class: fit-70 -->
# 本番化の難所③：状態と可観測性の欠如で追跡不能に陥る

> *分散トレースと構造化ログで、各エージェントの状態を可視化する*

<div class="fig">
<svg viewBox="0 0 920 400" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="230" y="36" fill="#dc2626" font-size="17" font-weight="bold" text-anchor="middle">トレースなし＝ブラックボックス</text>
<rect x="110" y="70" width="240" height="250" rx="12" fill="#1e293b" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<circle cx="170" cy="140" r="22" fill="#334155"/>
<circle cx="270" cy="180" r="22" fill="#334155"/>
<circle cx="200" cy="250" r="22" fill="#334155"/>
<text x="170" y="146" fill="#64748b" font-size="18" text-anchor="middle">?</text>
<text x="270" y="186" fill="#64748b" font-size="18" text-anchor="middle">?</text>
<text x="200" y="256" fill="#64748b" font-size="18" text-anchor="middle">?</text>
<text x="230" y="305" fill="#94a3b8" font-size="13" text-anchor="middle">状態も履歴も見えない</text>
<line x1="370" y1="195" x2="470" y2="195" stroke="#475569" stroke-width="2.5"/>
<polygon points="470,187 492,195 470,203" fill="#475569"/>
<text x="560" y="36" fill="#16a34a" font-size="17" font-weight="bold" text-anchor="middle">分散トレースあり</text>
<rect x="510" y="70" width="330" height="250" rx="12" fill="#f8fafc" stroke="#16a34a" stroke-width="1.5"/>
<rect x="535" y="100" width="280" height="30" rx="5" fill="#6b46c1"/>
<text x="545" y="121" fill="#ffffff" font-size="13">Lead: plan  120ms</text>
<rect x="560" y="142" width="180" height="28" rx="5" fill="#2563eb"/>
<text x="570" y="162" fill="#ffffff" font-size="13">subagent A  340ms</text>
<rect x="560" y="180" width="230" height="28" rx="5" fill="#2563eb"/>
<text x="570" y="200" fill="#ffffff" font-size="13">subagent B  410ms</text>
<rect x="580" y="218" width="140" height="28" rx="5" fill="#475569"/>
<text x="590" y="238" fill="#ffffff" font-size="13">tool call  90ms</text>
<rect x="535" y="256" width="280" height="28" rx="5" fill="#6b46c1"/>
<text x="545" y="276" fill="#ffffff" font-size="13">Lead: merge  80ms</text>
<text x="675" y="305" fill="#166534" font-size="13" text-anchor="middle">誰が・いつ・何をしたか追える</text>
</svg>
</div>

- エージェント間で状態が分散し、フレームワークによっては可観測性が弱い（例: CrewAI）
- 共通のトレースID・構造化ログで、階層をまたいだ因果を1本の時系列に繋ぐ
- コスト・レイテンシ・失敗をエージェント単位で計測し、性能分散の原因を特定する

<!--
状態管理と可観測性。トレース欠如で障害の原因が追えない。分散トレース+構造化ログで可視化。
-->

---

<!-- _class: fit-70 -->
# 本番化の難所④：文脈受け渡しの断絶が回答品質を崩す

> *handoffを構造化し、必要な文脈を明示的に引き継ぐ*

<div class="fig">
<svg viewBox="0 0 920 380" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="250" y="40" fill="#dc2626" font-size="17" font-weight="bold" text-anchor="middle">非構造的な引き継ぎ</text>
<rect x="70" y="90" width="170" height="56" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="155" y="124" fill="#ffffff" font-size="16" text-anchor="middle">エージェントA</text>
<rect x="280" y="90" width="170" height="56" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="365" y="124" fill="#ffffff" font-size="16" text-anchor="middle">エージェントB</text>
<line x1="240" y1="118" x2="280" y2="118" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4 4"/>
<polygon points="280,110 302,118 280,126" fill="#dc2626"/>
<circle cx="260" cy="165" r="5" fill="#dc2626"/>
<circle cx="262" cy="185" r="4" fill="#dc2626"/>
<text x="250" y="225" fill="#dc2626" font-size="14" text-anchor="middle">前提・制約・意図が欠落 → 誤答</text>
<line x1="470" y1="160" x2="560" y2="160" stroke="#475569" stroke-width="2.5"/>
<polygon points="560,152 582,160 560,168" fill="#475569"/>
<text x="720" y="40" fill="#16a34a" font-size="17" font-weight="bold" text-anchor="middle">構造化handoff</text>
<rect x="600" y="70" width="150" height="56" rx="10" fill="#6b46c1" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="675" y="104" fill="#ffffff" font-size="15" text-anchor="middle">エージェントA</text>
<rect x="600" y="250" width="150" height="56" rx="10" fill="#2563eb" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
<text x="675" y="284" fill="#ffffff" font-size="15" text-anchor="middle">エージェントB</text>
<rect x="770" y="140" width="140" height="96" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="840" y="165" fill="#166534" font-size="13" text-anchor="middle">handoff契約</text>
<text x="840" y="188" fill="#166534" font-size="12" text-anchor="middle">目的・入力</text>
<text x="840" y="208" fill="#166534" font-size="12" text-anchor="middle">制約・成果物</text>
<line x1="675" y1="126" x2="675" y2="250" stroke="#16a34a" stroke-width="2"/>
<polygon points="667,240 675,260 683,240" fill="#16a34a"/>
<line x1="750" y1="98" x2="790" y2="150" stroke="#16a34a" stroke-width="1.5"/>
<line x1="790" y1="226" x2="750" y2="278" stroke="#16a34a" stroke-width="1.5"/>
</svg>
</div>

- 自然言語だけの引き継ぎは、前提や制約が暗黙化して下流で欠落する
- 目的・入力・制約・期待成果物をスキーマ化し、handoffを契約として渡す
- 受け手が不足文脈を検知し、引き継ぎ元に問い返せる経路を用意する

<!--
文脈受け渡しの断絶。handoffの構造化不足が誤答を生む。スキーマ化した契約で引き継ぐ。
-->

---

# 本番化を阻む難所は4つに集約できる

> *コスト複利・障害連鎖・可観測性欠如・文脈断絶を影響度×対処難度で俯瞰する*

<div class="fig">
<svg viewBox="0 0 900 480" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<rect x="90" y="40" width="760" height="400" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="470" y1="40" x2="470" y2="440" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="90" y1="240" x2="850" y2="240" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 4"/>
<text x="470" y="468" fill="#475569" font-size="16" text-anchor="middle">対処難度 →</text>
<text x="70" y="240" fill="#475569" font-size="16" text-anchor="middle" transform="rotate(-90 70 240)">影響度 →</text>
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="560" y="90" width="250" height="110" rx="10" fill="#6b46c1"/>
<text x="685" y="130" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle">① コスト複利</text>
<text x="685" y="160" fill="#e9d5ff" font-size="14" text-anchor="middle">トークンが指数的に膨張</text>
<text x="685" y="182" fill="#e9d5ff" font-size="14" text-anchor="middle">最優先で封じる</text>
<rect x="140" y="90" width="250" height="110" rx="10" fill="#2563eb"/>
<text x="265" y="130" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle">② 障害連鎖</text>
<text x="265" y="160" fill="#dbeafe" font-size="14" text-anchor="middle">1体の失敗が全体へ波及</text>
<text x="265" y="182" fill="#dbeafe" font-size="14" text-anchor="middle">隔離で影響を止める</text>
<rect x="560" y="290" width="250" height="110" rx="10" fill="#7c3aed"/>
<text x="685" y="330" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle">③ 可観測性欠如</text>
<text x="685" y="360" fill="#ede9fe" font-size="14" text-anchor="middle">失敗の原因が追えない</text>
<text x="685" y="382" fill="#ede9fe" font-size="14" text-anchor="middle">トレースを標準装備</text>
<rect x="140" y="290" width="250" height="110" rx="10" fill="#475569"/>
<text x="265" y="330" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle">④ 文脈断絶</text>
<text x="265" y="360" fill="#e2e8f0" font-size="14" text-anchor="middle">引き継ぎで情報が欠落</text>
<text x="265" y="382" fill="#e2e8f0" font-size="14" text-anchor="middle">受け渡し契約で補う</text>
</g>
</svg>
</div>

<!--
4つの難所を1枚で俯瞰。右上（高影響×高難度）のコスト複利が最優先。この後の指針セクションで各難所への対処を提示する。
-->

---

<!-- _class: fit-76 -->
# 難所は「設計で先回り」すれば怖くない

> *4つの難所はいずれも後付けでは間に合わず、初期設計に組み込むことで初めて封じられる*

- コスト複利：反復上限・トークン予算を最初から設定し、暴走を構造で止める
- 障害連鎖：エージェントを疎結合に保ち、1体の失敗を局所化する
- 可観測性欠如：トレース収集をPoC段階から標準装備にする
- 文脈断絶：エージェント間の受け渡しを明示的な契約（入出力仕様）で固める

<!--
Qセクションの締め。共通するメッセージは『後付けでは間に合わない、設計で先回りする』。次のセクションで具体的な設計指針に入る。
-->

---

<!-- _class: lead -->
# テックリーダーの設計指針

- 難所を封じる5つの実践指針と、選定・導入の型

<!--
セクション扉。ここから意思決定層が明日から使える設計指針を提示する。
-->

---

# 指針①：監督者パターンから最小構成で始める

> *supervisor+2workerの最小構成で価値を検証し、必要に応じて段階的に拡張する*

<div class="fig">
<svg viewBox="0 0 920 430" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<text x="230" y="35" fill="#475569" font-size="17" font-weight="bold" text-anchor="middle">まず最小構成</text>
<text x="690" y="35" fill="#475569" font-size="17" font-weight="bold" text-anchor="middle">必要になってから拡張</text>
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="150" y="70" width="160" height="58" rx="8" fill="#6b46c1"/>
<text x="230" y="105" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">Supervisor</text>
<rect x="120" y="200" width="120" height="52" rx="8" fill="#2563eb"/>
<text x="180" y="232" fill="#ffffff" font-size="15" text-anchor="middle">Worker A</text>
<rect x="270" y="200" width="120" height="52" rx="8" fill="#2563eb"/>
<text x="330" y="232" fill="#ffffff" font-size="15" text-anchor="middle">Worker B</text>
<rect x="600" y="70" width="160" height="58" rx="8" fill="#6b46c1"/>
<text x="680" y="105" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">Supervisor</text>
<rect x="540" y="200" width="100" height="52" rx="8" fill="#2563eb"/>
<text x="590" y="232" fill="#ffffff" font-size="14" text-anchor="middle">Worker A</text>
<rect x="650" y="200" width="100" height="52" rx="8" fill="#2563eb"/>
<text x="700" y="232" fill="#ffffff" font-size="14" text-anchor="middle">Worker B</text>
<rect x="760" y="200" width="100" height="52" rx="8" fill="#94a3b8"/>
<text x="810" y="232" fill="#ffffff" font-size="14" text-anchor="middle">Worker C+</text>
</g>
<line x1="230" y1="128" x2="180" y2="200" stroke="#94a3b8" stroke-width="2"/>
<line x1="230" y1="128" x2="330" y2="200" stroke="#94a3b8" stroke-width="2"/>
<line x1="680" y1="128" x2="590" y2="200" stroke="#94a3b8" stroke-width="2"/>
<line x1="680" y1="128" x2="700" y2="200" stroke="#94a3b8" stroke-width="2"/>
<line x1="680" y1="128" x2="810" y2="200" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>
<polygon points="440,190 490,160 490,220" fill="#6b46c1"/>
<text x="465" y="290" fill="#6b46c1" font-size="15" text-anchor="middle" font-weight="bold">段階的に</text>
<text x="465" y="312" fill="#6b46c1" font-size="15" text-anchor="middle" font-weight="bold">拡張</text>
</svg>
</div>

<!--
最初から10体構成にしない。監督者+2ワーカーで価値を出し、ボトルネックが見えてから足す。過剰設計を避ける。
-->

---

# 指針②：反復上限とタイムアウトでコストを封じる

> *max iterations・timeout・トークン予算の3つのガードレールがコスト暴走を構造的に止める*

<div class="fig">
<svg viewBox="0 0 900 420" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="60" y="150" width="200" height="120" rx="10" fill="#6b46c1"/>
<text x="160" y="200" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">エージェント</text>
<text x="160" y="228" fill="#e9d5ff" font-size="14" text-anchor="middle">反復ループ</text>
</g>
<path d="M 260 180 C 340 130, 340 130, 400 160" fill="none" stroke="#94a3b8" stroke-width="2"/>
<path d="M 400 240 C 340 280, 340 280, 260 240" fill="none" stroke="#94a3b8" stroke-width="2"/>
<polygon points="260,240 285,228 282,252" fill="#94a3b8"/>
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="400" y="60" width="420" height="58" rx="8" fill="#2563eb"/>
<text x="610" y="96" fill="#ffffff" font-size="17" text-anchor="middle">max iterations：反復回数に上限を設ける</text>
<rect x="400" y="140" width="420" height="58" rx="8" fill="#7c3aed"/>
<text x="610" y="176" fill="#ffffff" font-size="17" text-anchor="middle">timeout：実行時間で強制打ち切り</text>
<rect x="400" y="220" width="420" height="58" rx="8" fill="#6b46c1"/>
<text x="610" y="256" fill="#ffffff" font-size="17" text-anchor="middle">token budget：総トークン量に予算枠</text>
</g>
<line x1="260" y1="200" x2="400" y2="140" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="450" y="335" fill="#475569" font-size="16" font-weight="bold">3つのガードレールが揃って初めて暴走を止められる</text>
</svg>
</div>

<!--
コスト複利の直接対策。どれか1つでは不十分で、反復・時間・トークンの3軸で囲う。デフォルト値を安全側に。
-->

---

# 指針③：モデルを階層で振り分けてコストを最適化する

> *指揮役に上位モデル・作業役に下位モデルを割り当て、品質を保ちつつコストを桁で下げる*

<div class="fig">
<svg viewBox="0 0 900 420" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="320" y="50" width="260" height="90" rx="10" fill="#6b46c1"/>
<text x="450" y="88" fill="#ffffff" font-size="19" font-weight="bold" text-anchor="middle">指揮役：上位モデル</text>
<text x="450" y="116" fill="#e9d5ff" font-size="14" text-anchor="middle">分解・判断・統合（例：Opus級）</text>
<rect x="90" y="260" width="200" height="90" rx="10" fill="#2563eb"/>
<text x="190" y="298" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">作業役：下位モデル</text>
<text x="190" y="324" fill="#dbeafe" font-size="13" text-anchor="middle">定型処理（例：Sonnet級）</text>
<rect x="350" y="260" width="200" height="90" rx="10" fill="#2563eb"/>
<text x="450" y="298" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">作業役：下位モデル</text>
<text x="450" y="324" fill="#dbeafe" font-size="13" text-anchor="middle">情報収集・整形</text>
<rect x="610" y="260" width="200" height="90" rx="10" fill="#2563eb"/>
<text x="710" y="298" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">作業役：下位モデル</text>
<text x="710" y="324" fill="#dbeafe" font-size="13" text-anchor="middle">集計・検証</text>
</g>
<line x1="450" y1="140" x2="190" y2="260" stroke="#94a3b8" stroke-width="2"/>
<line x1="450" y1="140" x2="450" y2="260" stroke="#94a3b8" stroke-width="2"/>
<line x1="450" y1="140" x2="710" y2="260" stroke="#94a3b8" stroke-width="2"/>
<text x="450" y="390" fill="#475569" font-size="16" text-anchor="middle" font-weight="bold">機械判定できる作業ほど下位モデルへ落とす</text>
</svg>
</div>

<!--
モデル振り分けはコスト削減の最大レバー。判断が要る指揮役だけ上位、機械的な作業役は下位に。valid/statsで正解判定できる作業は下位に落とす。
-->

---

# 指針④：可観測性は最初からトレースで組み込む

> *各エージェントの入出力・トークン・所要時間を収集し、失敗を後から追えるようにする*

<div class="fig">
<svg viewBox="0 0 920 400" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="60" y="60" width="150" height="60" rx="8" fill="#2563eb"/>
<text x="135" y="96" fill="#ffffff" font-size="16" text-anchor="middle">Agent A</text>
<rect x="60" y="160" width="150" height="60" rx="8" fill="#2563eb"/>
<text x="135" y="196" fill="#ffffff" font-size="16" text-anchor="middle">Agent B</text>
<rect x="60" y="260" width="150" height="60" rx="8" fill="#2563eb"/>
<text x="135" y="296" fill="#ffffff" font-size="16" text-anchor="middle">Agent C</text>
<rect x="370" y="120" width="200" height="140" rx="10" fill="#6b46c1"/>
<text x="470" y="178" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">トレース</text>
<text x="470" y="204" fill="#e9d5ff" font-size="14" text-anchor="middle">収集基盤</text>
<rect x="720" y="70" width="150" height="56" rx="8" fill="#475569"/>
<text x="795" y="104" fill="#ffffff" font-size="15" text-anchor="middle">入出力ログ</text>
<rect x="720" y="162" width="150" height="56" rx="8" fill="#475569"/>
<text x="795" y="196" fill="#ffffff" font-size="15" text-anchor="middle">トークン計測</text>
<rect x="720" y="254" width="150" height="56" rx="8" fill="#475569"/>
<text x="795" y="288" fill="#ffffff" font-size="15" text-anchor="middle">所要時間</text>
</g>
<line x1="210" y1="90" x2="370" y2="160" stroke="#94a3b8" stroke-width="2"/>
<line x1="210" y1="190" x2="370" y2="190" stroke="#94a3b8" stroke-width="2"/>
<line x1="210" y1="290" x2="370" y2="220" stroke="#94a3b8" stroke-width="2"/>
<line x1="570" y1="170" x2="720" y2="98" stroke="#94a3b8" stroke-width="2"/>
<line x1="570" y1="190" x2="720" y2="190" stroke="#94a3b8" stroke-width="2"/>
<line x1="570" y1="210" x2="720" y2="282" stroke="#94a3b8" stroke-width="2"/>
<polygon points="370,160 345,150 348,174" fill="#94a3b8"/>
<polygon points="720,98 695,90 700,112" fill="#94a3b8"/>
</svg>
</div>

<!--
可観測性欠如への対策。後付けは困難なのでPoCから組み込む。どのエージェントがどれだけトークンを使い何秒かかったかを常に追える状態に。
-->

---

# 指針⑤：15倍コストを吸収できる高価値タスクに絞る

> *マルチエージェントはコストが跳ね上がるため、単価が高い判断集約タスクにのみ投下する*

<div class="fig">
<svg viewBox="0 0 900 420" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="450" y1="50" x2="450" y2="400" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 5"/>
<text x="225" y="80" fill="#16a34a" font-size="19" font-weight="bold" text-anchor="middle">吸収できる（投下する）</text>
<text x="675" y="80" fill="#dc2626" font-size="19" font-weight="bold" text-anchor="middle">吸収できない（避ける）</text>
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="70" y="110" width="300" height="52" rx="8" fill="#6b46c1"/>
<text x="220" y="143" fill="#ffffff" font-size="16" text-anchor="middle">法務デューデリジェンス</text>
<rect x="70" y="178" width="300" height="52" rx="8" fill="#6b46c1"/>
<text x="220" y="211" fill="#ffffff" font-size="16" text-anchor="middle">競合調査・市場分析</text>
<rect x="70" y="246" width="300" height="52" rx="8" fill="#6b46c1"/>
<text x="220" y="279" fill="#ffffff" font-size="16" text-anchor="middle">文献レビュー・技術調査</text>
<rect x="530" y="110" width="300" height="52" rx="8" fill="#94a3b8"/>
<text x="680" y="143" fill="#ffffff" font-size="16" text-anchor="middle">消費者向けQ&A</text>
<rect x="530" y="178" width="300" height="52" rx="8" fill="#94a3b8"/>
<text x="680" y="211" fill="#ffffff" font-size="16" text-anchor="middle">定型FAQ・単純検索</text>
<rect x="530" y="246" width="300" height="52" rx="8" fill="#94a3b8"/>
<text x="680" y="279" fill="#ffffff" font-size="16" text-anchor="middle">大量・低単価な処理</text>
</g>
<text x="220" y="340" fill="#475569" font-size="15" text-anchor="middle">高単価×判断集約 = 15倍を回収できる</text>
<text x="680" y="340" fill="#475569" font-size="15" text-anchor="middle">低単価×大量 = 単一エージェントで十分</text>
</svg>
</div>

<!--
経済判断。マルチエージェントは単一の約15倍のコストになりうる。それを回収できる高価値タスクにだけ使う。消費者Q&Aのような低単価大量処理には向かない。
-->

---

# 用途からフレームワークを1枚で選び分ける

> *本番規模・試作・研究・ハンドオフ・監督者起点で推奨が分かれる*

<div class="fig">
<svg viewBox="0 0 940 430" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="370" y="30" width="200" height="56" rx="10" fill="#6b46c1"/>
<text x="470" y="64" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">用途は何か？</text>
<rect x="30" y="180" width="165" height="90" rx="9" fill="#2563eb"/>
<text x="112" y="213" fill="#dbeafe" font-size="13" text-anchor="middle">本番・大規模</text>
<text x="112" y="238" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">LangGraph</text>
<text x="112" y="258" fill="#ffffff" font-size="14" text-anchor="middle">/ custom</text>
<rect x="210" y="180" width="165" height="90" rx="9" fill="#2563eb"/>
<text x="292" y="213" fill="#dbeafe" font-size="13" text-anchor="middle">素早い試作</text>
<text x="292" y="243" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">CrewAI</text>
<rect x="390" y="180" width="165" height="90" rx="9" fill="#7c3aed"/>
<text x="472" y="213" fill="#ede9fe" font-size="13" text-anchor="middle">研究・討論</text>
<text x="472" y="243" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">AutoGen</text>
<rect x="570" y="180" width="165" height="90" rx="9" fill="#7c3aed"/>
<text x="652" y="213" fill="#ede9fe" font-size="13" text-anchor="middle">狭いハンドオフ</text>
<text x="652" y="243" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">OpenAI Swarm</text>
<rect x="750" y="180" width="165" height="90" rx="9" fill="#6b46c1"/>
<text x="832" y="213" fill="#e9d5ff" font-size="13" text-anchor="middle">まず監督者から</text>
<text x="832" y="238" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">Claude Agent</text>
<text x="832" y="258" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">SDK</text>
</g>
<line x1="470" y1="86" x2="112" y2="180" stroke="#94a3b8" stroke-width="1.8"/>
<line x1="470" y1="86" x2="292" y2="180" stroke="#94a3b8" stroke-width="1.8"/>
<line x1="470" y1="86" x2="472" y2="180" stroke="#94a3b8" stroke-width="1.8"/>
<line x1="470" y1="86" x2="652" y2="180" stroke="#94a3b8" stroke-width="1.8"/>
<line x1="470" y1="86" x2="832" y2="180" stroke="#94a3b8" stroke-width="1.8"/>
<text x="470" y="320" fill="#475569" font-size="15" text-anchor="middle">迷ったら Claude Agent SDK の監督者パターンから始めるのが安全</text>
</svg>
</div>

<!--
用途別の選定チャート。正解は1つではなく、本番規模ならLangGraph/custom、試作はCrewAI、研究討論はAutoGen、狭い引き継ぎはSwarm。迷ったら監督者パターンの起点としてClaude Agent SDK。
-->

---

# 90日で「試す→型化→拡大」を回し切る

> *PoCで価値を確かめ、ガードレールと可観測性で型にし、高価値タスクへ広げる*

<div class="fig">
<svg viewBox="0 0 940 400" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<line x1="60" y1="210" x2="880" y2="210" stroke="#cbd5e1" stroke-width="3"/>
<polygon points="880,210 856,199 856,221" fill="#cbd5e1"/>
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<circle cx="180" cy="210" r="16" fill="#6b46c1"/>
<circle cx="460" cy="210" r="16" fill="#2563eb"/>
<circle cx="740" cy="210" r="16" fill="#7c3aed"/>
<rect x="70" y="70" width="220" height="96" rx="10" fill="#6b46c1"/>
<text x="180" y="104" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">0–30日：試す</text>
<text x="180" y="130" fill="#e9d5ff" font-size="13" text-anchor="middle">PoC＝監督者の</text>
<text x="180" y="150" fill="#e9d5ff" font-size="13" text-anchor="middle">最小構成で価値検証</text>
<rect x="350" y="254" width="220" height="96" rx="10" fill="#2563eb"/>
<text x="460" y="288" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">31–60日：型化</text>
<text x="460" y="314" fill="#dbeafe" font-size="13" text-anchor="middle">ガードレール＋</text>
<text x="460" y="334" fill="#dbeafe" font-size="13" text-anchor="middle">可観測性を組込む</text>
<rect x="630" y="70" width="220" height="96" rx="10" fill="#7c3aed"/>
<text x="740" y="104" fill="#ffffff" font-size="17" font-weight="bold" text-anchor="middle">61–90日：拡大</text>
<text x="740" y="130" fill="#ede9fe" font-size="13" text-anchor="middle">高価値タスクへ</text>
<text x="740" y="150" fill="#ede9fe" font-size="13" text-anchor="middle">段階的に展開</text>
</g>
<line x1="180" y1="166" x2="180" y2="194" stroke="#94a3b8" stroke-width="2"/>
<line x1="460" y1="226" x2="460" y2="254" stroke="#94a3b8" stroke-width="2"/>
<line x1="740" y1="166" x2="740" y2="194" stroke="#94a3b8" stroke-width="2"/>
</svg>
</div>

<!--
90日ロードマップ。最初の30日はPoCで価値検証、次の30日でガードレール・可観測性を型化、最後の30日で高価値タスクへ拡大。段階を飛ばさない。
-->

---

# 本日の要点は3行に集約できる

<div class="fig">
<svg viewBox="0 0 920 400" font-family="sans-serif" style="display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;">
<g style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))">
<rect x="70" y="50" width="780" height="86" rx="12" fill="#6b46c1"/>
<circle cx="130" cy="93" r="30" fill="#ffffff"/>
<text x="130" y="103" fill="#6b46c1" font-size="30" font-weight="bold" text-anchor="middle">1</text>
<text x="185" y="102" fill="#ffffff" font-size="22" font-weight="bold">パターン選択が成否を分ける</text>
<rect x="70" y="156" width="780" height="86" rx="12" fill="#2563eb"/>
<circle cx="130" cy="199" r="30" fill="#ffffff"/>
<text x="130" y="209" fill="#2563eb" font-size="30" font-weight="bold" text-anchor="middle">2</text>
<text x="185" y="208" fill="#ffffff" font-size="22" font-weight="bold">監督者パターンの最小構成から始める</text>
<rect x="70" y="262" width="780" height="86" rx="12" fill="#7c3aed"/>
<circle cx="130" cy="305" r="30" fill="#ffffff"/>
<text x="130" y="315" fill="#7c3aed" font-size="30" font-weight="bold" text-anchor="middle">3</text>
<text x="185" y="314" fill="#ffffff" font-size="22" font-weight="bold">コストと可観測性を設計に組み込む</text>
</g>
</svg>
</div>

<!--
3行サマリー。この3つだけ持ち帰ってもらえれば十分。パターン選択・監督者から始める・コストと可観測性を最初から。
-->

---

<!-- _class: fit-64 -->
# 出典・参考リンク

- How we built our multi-agent research system — Anthropic: https://www.anthropic.com/engineering/multi-agent-research-system
- Multi-Agent Orchestration: 5 Patterns That Work in 2026 — Digital Applied: https://www.digitalapplied.com/blog/multi-agent-orchestration-5-patterns-that-work
- Multi-Agent Orchestration Frameworks 2026 — Presenc AI: https://presenc.ai/research/multi-agent-orchestration-frameworks-2026
- Multi-Agent Cost Compounding — Augment Code: https://www.augmentcode.com/guides/multi-agent-cost-compounding

<!--
出典。すべて公開記事。数値・主張の根拠はこれらに基づく。
-->

---

<!-- _class: lead -->
# エージェントを「チーム」として設計する

- 個々のモデル性能ではなく、役割分担・ガードレール・可観測性という『チーム設計』が本番の成否を決める

<!--
クロージング。単体の賢さではなくチームとしての設計思想が価値を生む、というメッセージで締める。
-->
