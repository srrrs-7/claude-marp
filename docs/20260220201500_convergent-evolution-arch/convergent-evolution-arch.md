---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Convergent Evolution × Architecture"
footer: "© 2026 Software Evolution"
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
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: invert lead -->
# 収束進化：なぜ異なる技術が同じアーキテクチャに収束するのか

- Convergent Evolution × Architecture Patterns
- 翼は4回独立に進化した — MVCも同じように収束した


---

# Agenda

> *生物の収束進化から次世代アーキパターンを予測する6章*

- 1. 収束進化とは何か
- 2. ソフトウェアにおける収束進化の実例
- 3. アーキテクチャパターンの収束マップ
- 4. 収束進化 vs 相同進化
- 5. なぜ収束するのか：制約と最適解
- 6. 次に収束するパターンを予測する


---

<!-- _class: invert lead -->
# 収束進化とは何か

- Chapter 1: What is Convergent Evolution?


---

# 収束進化（Convergent Evolution）

> *異なる系統が同一形態に収束—正解の数は有限*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">収束進化：同じ制約 → 同じ解</text>
  <!-- Center: constraint box -->
  <rect x="310" y="165" width="180" height="70" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="196" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">環境制約</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">飛翔が必要</text>
  <!-- 4 converging paths (wings) -->
  <!-- Insects -->
  <rect x="30" y="50" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="105" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">昆虫</text>
  <text x="105" y="100" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">3億5千万年前</text>
  <text x="105" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">節肢動物の翅</text>
  <line x1="180" y1="100" x2="310" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="310,190 300,180 302,196" fill="#f9a825"/>
  <!-- Pterosaurs -->
  <rect x="620" y="50" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="695" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">翼竜</text>
  <text x="695" y="100" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">2億3千万年前</text>
  <text x="695" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">皮膜の翼</text>
  <line x1="620" y1="100" x2="490" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="490,190 498,180 498,196" fill="#f9a825"/>
  <!-- Birds -->
  <rect x="30" y="270" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="105" y="300" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">鳥類</text>
  <text x="105" y="320" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">1億5千万年前</text>
  <text x="105" y="336" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">羽毛の翼</text>
  <line x1="180" y1="310" x2="310" y2="220" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="310,220 300,216 308,204" fill="#f9a825"/>
  <!-- Bats -->
  <rect x="620" y="270" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="695" y="300" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">コウモリ</text>
  <text x="695" y="320" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">5千万年前</text>
  <text x="695" y="336" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">指の膜翼</text>
  <line x1="620" y1="310" x2="490" y2="220" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="490,220 498,216 492,204" fill="#f9a825"/>
  <!-- Result: Wings (same solution) -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold" font-family="sans-serif">翼（同じ解）</text>
  <text x="400" y="302" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">4回独立に進化</text>
  <text x="400" y="360" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">同じ制約 → 同じ最適解 → 収束</text>
</svg>
</div>

- 異なる祖先を持つ生物が **同じ形態・機能** を独立に進化させる現象
- 眼は動物界で **40回以上** 独立に進化した
- 翼は昆虫・翼竜・鳥・コウモリで **4回** 独立に進化
- 原因: **同じ環境制約** が同じ最適解を生む
- 「飛ぶ必要がある」→ 翼という解に収束
- ソフトウェアでも同じ制約が同じパターンを生み出す


---

# 異なる起源、同じ解決策

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert lead -->
# ソフトウェアの収束進化

- Chapter 2: Convergence in Software


---

# MVC：最も成功した収束進化

> *Smalltalk・Rails・React: 独立に同じMVC構造へ収束した*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">MVC：30年かけて4回独立に収束</text>
  <!-- Timeline -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#16213e" stroke-width="5"/>
  <!-- Year markers and frameworks -->
  <circle cx="80" cy="200" r="12" fill="#f9a825" stroke="#f9a825" stroke-width="2"/>
    <line x1="80" y1="188" x2="80" y2="150" stroke="#f9a825" stroke-width="1.5"/>
    <rect x="15" y="80" width="130" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="80" y="102" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1979</text>
    <text x="80" y="118" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Smalltalk-80</text>
    <text x="80" y="134" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">MVC初登場</text><circle cx="235" cy="200" r="12" fill="#f9a825" stroke="#f9a825" stroke-width="2"/>
    <line x1="235" y1="188" x2="235" y2="150" stroke="#f9a825" stroke-width="1.5"/>
    <rect x="170" y="80" width="130" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="235" y="102" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
    <text x="235" y="118" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Java Struts</text>
    <text x="235" y="134" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">MVC的構造採用</text><circle cx="390" cy="200" r="12" fill="#e91e63" stroke="#e91e63" stroke-width="2"/>
    <line x1="390" y1="188" x2="390" y2="150" stroke="#e91e63" stroke-width="1.5"/>
    <rect x="325" y="80" width="130" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="390" y="102" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2004</text>
    <text x="390" y="118" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Ruby on Rails</text>
    <text x="390" y="134" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Convention>Config</text><circle cx="545" cy="200" r="12" fill="#f9a825" stroke="#f9a825" stroke-width="2"/>
    <line x1="545" y1="212" x2="545" y2="260" stroke="#f9a825" stroke-width="1.5"/>
    <rect x="480" y="265" width="130" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="545" y="287" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2010</text>
    <text x="545" y="303" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Angular/Backbone</text>
    <text x="545" y="319" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">フロントエンドMVC</text><circle cx="700" cy="200" r="12" fill="#e91e63" stroke="#e91e63" stroke-width="2"/>
    <line x1="700" y1="212" x2="700" y2="260" stroke="#e91e63" stroke-width="1.5"/>
    <rect x="635" y="265" width="130" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="700" y="287" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2013</text>
    <text x="700" y="303" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">React</text>
    <text x="700" y="319" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">MVC の V のみ収束</text>
  <!-- Convergence annotation -->
  <rect x="200" y="355" width="400" height="35" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="377" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">異なる言語・チームが同じパターンに到達 = 収束進化</text>
</svg>
</div>

- **1979**: Smalltalk-80 で MVC が最初に登場
- **1996**: Java Struts が独自にMVC的構造を採用
- **2004**: Rails が「Convention over Configuration」でMVCを再発明
- **2010**: Angular/Backbone が フロントエンドでMVCを再実装
- **2013**: React が MVC の V だけを取り出し（View収束）
- 30年間で **異なる言語・異なるチーム** が同じパターンに到達

<!--
MVCは最初のフレームワーク「以外」のチームも独立にMVC的構造に到達している。これは収束進化の証拠。
-->

---

# メッセージキューの収束

> *RabbitMQ・Kafka・SQSが非同期処理の共通解に収束*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">メッセージキュー：5つの独立な起源が同じ解に収束</text>
  <!-- 5 systems converging to center -->
  <!-- IBM MQ -->
  <rect x="20" y="50" width="140" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="90" y="75" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">IBM MQ</text>
  <text x="90" y="93" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">1993 エンタープライズ</text>
  <text x="90" y="108" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">COBOL/Java起源</text>
  <line x1="155" y1="90" x2="295" y2="185" stroke="#f9a825" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- RabbitMQ -->
  <rect x="20" y="170" width="140" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="90" y="195" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">RabbitMQ</text>
  <text x="90" y="213" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">2007 Erlang起源</text>
  <text x="90" y="228" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">AMQP標準</text>
  <line x1="155" y1="202" x2="295" y2="200" stroke="#f9a825" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Kafka -->
  <rect x="20" y="290" width="140" height="65" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="90" y="315" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">Apache Kafka</text>
  <text x="90" y="333" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">2011 LinkedIn起源</text>
  <text x="90" y="348" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">ログベース</text>
  <line x1="155" y1="322" x2="295" y2="218" stroke="#e91e63" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Center: convergent solution -->
  <rect x="295" y="150" width="210" height="100" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="183" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">収束した解</text>
  <text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Pub/Sub</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">永続化</text>
  <text x="400" y="239" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">順序保証</text>
  <!-- Amazon SQS -->
  <rect x="640" y="50" width="140" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="710" y="75" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Amazon SQS</text>
  <text x="710" y="93" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">2006 AWS起源</text>
  <text x="710" y="108" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">マネージドサービス</text>
  <line x1="640" y1="90" x2="500" y2="185" stroke="#f9a825" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Apache Pulsar -->
  <rect x="640" y="290" width="140" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="710" y="315" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Apache Pulsar</text>
  <text x="710" y="333" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">2016 Yahoo起源</text>
  <text x="710" y="348" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">マルチテナント</text>
  <line x1="640" y1="322" x2="500" y2="218" stroke="#f9a825" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="400" y="380" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">5つの独立した起源 → 全て同じ3つの特性に収束</text>
</svg>
</div>

- **IBM MQ** (1993): エンタープライズ起源、COBOL/Java
- **RabbitMQ** (2007): Erlang起源、AMQP標準
- **Kafka** (2011): LinkedIn起源、ログベース、Scala/Java
- **Amazon SQS** (2006): AWS起源、マネージドサービス
- **Apache Pulsar** (2016): Yahoo起源、マルチテナント
- 全て独立に開発、全て **Pub/Sub + 永続化 + 順序保証** に収束


---

# コンテナ化の収束

> *chroot→jail→cgroups→Docker: 隔離の解は1つしかなかった*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">コンテナ化：34年で5回「プロセス隔離」に収束</text>
  <!-- Staircase timeline -->
  
    <rect x="20" y="320" width="120" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="80" y="340" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1979</text>
    <text x="80" y="356" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">chroot (Unix V7)</text>
    <text x="80" y="370" text-anchor="middle" fill="#aaaaaa" font-size="8" font-family="sans-serif">ファイルシステム分離</text>
  
    <rect x="160" y="270" width="120" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="220" y="290" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2000</text>
    <text x="220" y="306" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">FreeBSD Jail</text>
    <text x="220" y="320" text-anchor="middle" fill="#aaaaaa" font-size="8" font-family="sans-serif">プロセス分離</text>
  
    <rect x="300" y="220" width="120" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="360" y="240" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2004</text>
    <text x="360" y="256" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Solaris Zones</text>
    <text x="360" y="270" text-anchor="middle" fill="#aaaaaa" font-size="8" font-family="sans-serif">OS仮想化</text>
  
    <rect x="440" y="170" width="120" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="500" y="190" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2008</text>
    <text x="500" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">LXC (Linux)</text>
    <text x="500" y="220" text-anchor="middle" fill="#aaaaaa" font-size="8" font-family="sans-serif">cgroups+namespaces</text>
  
    <rect x="580" y="120" width="120" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="640" y="140" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2013</text>
    <text x="640" y="156" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Docker</text>
    <text x="640" y="170" text-anchor="middle" fill="#aaaaaa" font-size="8" font-family="sans-serif">アプリケーションコンテナ</text>
  
  <!-- Steps connecting them -->
  <polyline points="140,352 160,320 300,320 300,275 360,275 360,225 440,225 440,170 500,170 500,120 700,120" fill="none" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/>
  <!-- Common goal annotation -->
  <rect x="200" y="50" width="400" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="73" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">収束した解：プロセス隔離</text>
  <text x="400" y="91" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">ファイルシステム + ネットワーク + リソース の分離</text>
  <!-- Arrow from staircase to box -->
  <line x1="400" y1="100" x2="400" y2="115" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>
</div>

- **chroot** (1979): Unix V7、ファイルシステム分離
- **FreeBSD Jail** (2000): プロセス分離
- **Solaris Zones** (2004): OS仮想化
- **LXC** (2008): Linux cgroups + namespaces
- **Docker** (2013): アプリケーションコンテナ
- 34年間で5回独立に「プロセス隔離」に収束した


---

<!-- _class: invert lead -->
# アーキテクチャパターンの収束マップ

- Chapter 3: Architecture Convergence Map


---

# アーキテクチャパターンの収束マップ

![w:900 center](assets/diagram-02.svg)


---

# 普遍的パターンへの収束

> *制約が同じなら解も同じ—パターンは発明でなく発見*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">普遍的パターン：ソフトウェアの「物理法則」</text>
  <!-- Center: universal constraints -->
  <ellipse cx="400" cy="200" rx="90" ry="60" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="192" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">制約の</text>
  <text x="400" y="210" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">物理法則</text>
  <!-- 4 universal patterns -->
  <!-- Loose coupling -->
  <rect x="20" y="55" width="200" height="75" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="120" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">疎結合</text>
  <text x="120" y="98" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Loose Coupling</text>
  <text x="120" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">全アーキテクチャの基本原則</text>
  <line x1="215" y1="92" x2="310" y2="170" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Separation of concerns -->
  <rect x="580" y="55" width="200" height="75" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="680" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">関心の分離</text>
  <text x="680" y="98" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">SoC</text>
  <text x="680" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">MVC, Clean, Hexagonal</text>
  <line x1="585" y1="92" x2="490" y2="170" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Message driven -->
  <rect x="20" y="270" width="200" height="75" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="120" y="295" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">メッセージ駆動</text>
  <text x="120" y="313" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Event Sourcing, Pub/Sub</text>
  <text x="120" y="331" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Actor Model</text>
  <line x1="215" y1="308" x2="310" y2="233" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Single responsibility -->
  <rect x="580" y="270" width="200" height="75" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="680" y="295" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">単一責任</text>
  <text x="680" y="313" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">SRP</text>
  <text x="680" y="331" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Microservices, UNIX哲学</text>
  <line x1="585" y1="308" x2="490" y2="233" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Bottom insight -->
  <text x="400" y="380" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">制約が同じなら、どの言語・FWでも同じ解に至る — これが収束進化</text>
</svg>
</div>

- **疎結合** (Loose Coupling): 全アーキテクチャの基本原則
- **関心の分離** (Separation of Concerns): MVC, Clean Architecture, Hexagonal
- **メッセージ駆動** (Message-Driven): Event Sourcing, Pub/Sub, Actor Model
- **単一責任** (Single Responsibility): Microservices, Serverless, UNIX哲学
- これらは「ソフトウェアの物理法則」に相当する
- 制約が同じなら、どの言語・フレームワークでも同じ解に至る


---

<!-- _class: invert lead -->
# 収束進化 vs 相同進化

- Chapter 4: Convergent vs Homologous


---

# 収束進化 vs 相同進化

![w:900 center](assets/diagram-03.svg)


---

<!-- _class: invert lead -->
# なぜ収束するのか

- Chapter 5: Why Convergence Happens


---

# 制約が解を決定する

> *CAP定理・レイテンシ制約が独立に同じアーキテクチャを導く*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">制約空間 = 解空間：なぜ収束が起きるのか</text>
  <!-- Left: constraint space -->
  <rect x="30" y="55" width="320" height="310" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="190" y="82" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">制約空間</text>
  <rect x="50" y="100" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="190" y="116" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">CAP定理</text>
    <text x="190" y="132" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">C/A/P の2つしか選べない</text><rect x="50" y="150" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="190" y="166" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">アムダール則</text>
    <text x="190" y="182" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">並列化の限界が設計を制約</text><rect x="50" y="200" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="190" y="216" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">ネットワーク遅延</text>
    <text x="190" y="232" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">キャッシュが唯一の解</text><rect x="50" y="250" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="190" y="266" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">メモリ有限性</text>
    <text x="190" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">データ構造の最適化が必須</text><rect x="50" y="300" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="190" y="316" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">認知限界</text>
    <text x="190" y="332" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">抽象化・モジュール化が必要</text>

  <!-- Arrow -->
  <text x="390" y="215" text-anchor="middle" fill="#e91e63" font-size="22" font-family="sans-serif">→</text>
  <text x="390" y="235" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">決定する</text>

  <!-- Right: solution space -->
  <rect x="450" y="55" width="320" height="310" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="610" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">解空間（収束点）</text>
  <rect x="470" y="100" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="610" y="116" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">結果整合性 / 分散合意</text>
    <text x="610" y="132" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Raft, Paxos</text><rect x="470" y="150" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="610" y="166" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">非同期処理 + キュー</text>
    <text x="610" y="182" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">全MQ系が収束</text><rect x="470" y="200" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="610" y="216" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">キャッシュ階層</text>
    <text x="610" y="232" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">CDN〜L1まで共通構造</text><rect x="470" y="250" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="610" y="266" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">不変データ構造</text>
    <text x="610" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">FP言語が独立に発見</text><rect x="470" y="300" width="280" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="610" y="316" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">レイヤードアーキテクチャ</text>
    <text x="610" y="332" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">OSIからClean Archまで</text>
  <text x="400" y="388" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">「車輪の再発明」は「収束進化の証拠」かもしれない</text>
</svg>
</div>

- **物理的制約**: 空気抵抗 → 流線型、重力 → 構造強度
- **技術的制約**: ネットワーク遅延 → キャッシュ、並行性 → ロック
- **CAP定理**: 分散システムでは C/A/P のうち2つしか選べない
- **アムダールの法則**: 並列化の限界が設計を制約
- 制約空間が同じ → **解空間も同じ** → 収束
- 「車輪の再発明」は実は「収束進化の証拠」かもしれない

<!--
車輪の再発明を批判する前に、それが収束進化かどうかを考えるべき。同じ解に到達しているなら、その解は本質的に正しい。
-->

---

# 適応放散：収束の逆パターン

> *異なる環境制約がガラパゴス化を生む—収束の逆条件*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">収束進化 vs 適応放散：2つの力が同時に働く</text>
  <!-- Left: Convergence -->
  <rect x="20" y="50" width="360" height="310" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">収束進化 (Convergence)</text>
  <text x="200" y="100" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">異なる起源 → 同じ解</text>
  <!-- Multiple paths converging -->
  <line x1="60" y1="130" x2="200" y2="230" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="60" cy="130" r="8" fill="#f9a825" opacity="0.7"/><line x1="110" y1="130" x2="200" y2="230" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="110" cy="130" r="8" fill="#f9a825" opacity="0.7"/><line x1="160" y1="130" x2="200" y2="230" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="160" cy="130" r="8" fill="#f9a825" opacity="0.7"/><line x1="210" y1="130" x2="200" y2="230" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="210" cy="130" r="8" fill="#f9a825" opacity="0.7"/>
  <circle cx="200" cy="230" r="20" fill="#e91e63"/>
  <text x="200" y="235" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">収束解</text>
  <text x="200" y="270" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">例: 疎結合・メッセージキュー</text>
  <text x="200" y="290" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">異なるチームが同じ解に到達</text>
  <rect x="50" y="310" width="300" height="35" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="200" y="332" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">マクロでは収束が支配的</text>
  <!-- Right: Divergence -->
  <rect x="420" y="50" width="360" height="310" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">適応放散 (Radiation)</text>
  <text x="600" y="100" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">1つの起源 → 多様な形態</text>
  <!-- One source diverging -->
  <circle cx="600" cy="130" r="18" fill="#f9a825"/>
  <text x="600" y="134" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">起源</text>
  <line x1="600" y1="148" x2="460" y2="200" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="460" cy="215" r="8" fill="#e91e63" opacity="0.6"/><line x1="600" y1="148" x2="510" y2="230" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="510" cy="245" r="8" fill="#e91e63" opacity="0.6"/><line x1="600" y1="148" x2="560" y2="200" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="560" cy="215" r="8" fill="#e91e63" opacity="0.6"/><line x1="600" y1="148" x2="610" y2="230" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="610" cy="245" r="8" fill="#e91e63" opacity="0.6"/><line x1="600" y1="148" x2="660" y2="200" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="660" cy="215" r="8" fill="#e91e63" opacity="0.6"/><line x1="600" y1="148" x2="710" y2="230" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="710" cy="245" r="8" fill="#e91e63" opacity="0.6"/>
  <text x="600" y="270" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">例: JS → TS, CS, Elm, Dart</text>
  <text x="600" y="290" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Linux → Ubuntu, Alpine, RHEL</text>
  <rect x="450" y="310" width="300" height="35" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="600" y="332" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">ミクロでは放散が支配的</text>
  <!-- Summary -->
  <text x="400" y="380" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">アーキテクチャは収束し、実装は放散する — 2つの力の共存</text>
</svg>
</div>

- **適応放散** (Adaptive Radiation): 1つの祖先から多様な形態に分岐
- ダーウィンフィンチ: 1種から13種に分岐（くちばしの形態多様化）
- JavaScript: 1つの言語から TypeScript, CoffeeScript, Elm, Dart に分岐
- Linux: 1つのカーネルから Ubuntu, Alpine, Arch, RHEL に分岐
- 収束と放散は同時に起きる: **マクロでは収束、ミクロでは放散**
- アーキテクチャは収束し、実装は放散する


---

<!-- _class: invert lead -->
# 次に収束するパターンの予測

- Chapter 6: Predicting Future Convergence


---

# 2026年に収束しつつあるパターン

> *AIエージェント・Event-Driven・Edge: 次の収束点が見える*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">2026年：収束しつつあるパターン</text>
  <!-- 5 converging trends -->
  
    <rect x="80" y="65" width="640" height="62" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="95" y="89" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">AI Gateway</text>
    <text x="95" y="111" fill="#aaaaaa" font-size="11" font-family="sans-serif">OpenAI/Anthropic/Google が同じAPI形式に</text>
    <rect x="80" y="140" width="640" height="62" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="95" y="164" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Edge Computing</text>
    <text x="95" y="186" fill="#aaaaaa" font-size="11" font-family="sans-serif">CDN各社が「エッジ関数」モデルに収束</text>
    <rect x="80" y="215" width="640" height="62" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="95" y="239" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Infrastructure as Code</text>
    <text x="95" y="261" fill="#aaaaaa" font-size="11" font-family="sans-serif">Terraform/Pulumi/CDK が宣言的構成に収束</text>
    <rect x="80" y="290" width="640" height="62" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="95" y="314" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Observability</text>
    <text x="95" y="336" fill="#aaaaaa" font-size="11" font-family="sans-serif">ログ・メトリクス・トレースの3本柱が標準化</text>
  <text x="400" y="373" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">収束を予測できれば技術選定の失敗を防げる</text>
</svg>
</div>

- **AI Gateway**: OpenAI, Anthropic, Google が全て同じ API パターンに
- **Edge Computing**: CDN各社が同じ「エッジ関数」モデルに収束
- **Infrastructure as Code**: Terraform, Pulumi, CDK が宣言的構成に収束
- **Observability**: ログ・メトリクス・トレースの3本柱が標準に収束
- **Zero Trust**: 全セキュリティモデルが「常に検証」に収束
- 収束を予測できれば **技術選定の失敗を防げる**


---

<!-- _class: invert lead -->
# まとめ：進化の法則に学ぶ

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">収束進化が教えるアーキテクチャの真実</text>
  <!-- Central insight boxes -->
  <rect x="80" y="60" width="640" height="80" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="93" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold" font-family="sans-serif">収束したパターンは「正解」の強力な証拠</text>
  <text x="400" y="120" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">異なる起源 × 独立した進化 → 同じ解 = 本質的な制約への適応</text>
  <!-- 3 action items -->
  <rect x="60" y="175" width="210" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="165" y="205" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">制約を理解する</text>
    <line x1="80" y1="218" x2="250" y2="218" stroke="#333355" stroke-width="1"/>
    <text x="165" y="240" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">なぜこのパターンが生まれたか</text><text x="165" y="260" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">物理的・技術的制約を把握する</text><rect x="290" y="175" width="210" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="395" y="205" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">収束を観察する</text>
    <line x1="310" y1="218" x2="480" y2="218" stroke="#333355" stroke-width="1"/>
    <text x="395" y="240" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">複数チームが同じ解に</text><text x="395" y="260" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">到達しているか確認する</text><rect x="520" y="175" width="210" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="625" y="205" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">未収束を慎重に評価</text>
    <line x1="540" y1="218" x2="710" y2="218" stroke="#333355" stroke-width="1"/>
    <text x="625" y="240" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">まだ収束していない技術は</text><text x="625" y="260" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">リスクが高い可能性がある</text>
  <text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">翼は4回独立に進化した — MVCも同じように収束した</text>
</svg>
</div>

- 異なる起源の技術が同じパターンに収束するのは偶然ではない
- 同じ制約が同じ最適解を必然的に生み出す
- **収束したパターンは「正解」の強力な証拠である**
- **逆に、収束していない技術は慎重に評価すべき**

