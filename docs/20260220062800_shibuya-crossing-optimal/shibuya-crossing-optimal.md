---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "渋谷スクランブル交差点の最適化"
footer: "© 2026"
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
  
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: invert lead -->
# 渋谷スクランブル交差点の最適化
3,000人が45秒で渡れる理由

- 世界最大級の交差点はなぜ「事故なく」機能するのか
- 群衆力学・信号制御・自己組織化の交差点
- エンジニアリングと人間行動の美しい調和


---

<!-- _class: invert fit-88 -->
# アジェンダ

> *6つの視点で3,000人が45秒で渡れる設計の全体像を把握する*

1. 渋谷スクランブル交差点とは
2. スクランブル方式の仕組み
3. 群衆力学：なぜぶつからないのか
4. 信号制御の最適化
5. 自己組織化する歩行者
6. 分散システム設計への示唆


---

<!-- _class: invert lead -->
# 渋谷スクランブル交差点とは


---

<!-- _class: invert fit-76 -->
# 数字で見る渋谷スクランブル

> *1日50万人・45秒サイクルが実測データで証明された最適設計*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷スクランブル交差点：驚異の数字</text>
  <!-- 4 stat boxes -->
  <!-- Box 1: 3000 people -->
  <rect x="30" y="55" width="175" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="117" y="100" text-anchor="middle" fill="#f9a825" font-size="32" font-weight="bold" font-family="sans-serif">3,000</text>
  <text x="117" y="125" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">1回の青信号で</text>
  <text x="117" y="143" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">横断する人数</text>
  <text x="117" y="165" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">約45秒</text>
  <!-- Box 2: 500k per day -->
  <rect x="215" y="55" width="175" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="302" y="100" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold" font-family="sans-serif">50万人</text>
  <text x="302" y="125" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">1日の総横断者数</text>
  <text x="302" y="143" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">（休日はさらに多い）</text>
  <!-- Box 3: 3000 sqm -->
  <rect x="400" y="55" width="175" height="120" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="487" y="100" text-anchor="middle" fill="#e91e63" font-size="28" font-weight="bold" font-family="sans-serif">3,000㎡</text>
  <text x="487" y="125" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">交差点の面積</text>
  <text x="487" y="143" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">（テニスコート約14面分）</text>
  <!-- Box 4: 50 years -->
  <rect x="585" y="55" width="175" height="120" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="672" y="100" text-anchor="middle" fill="#e91e63" font-size="28" font-weight="bold" font-family="sans-serif">1969年</text>
  <text x="672" y="125" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">スクランブル導入</text>
  <text x="672" y="143" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">55年以上稼働中</text>
  <!-- Directions diagram below -->
  <text x="400" y="215" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">5方向同時横断 = スクランブル方式</text>
  <!-- Cross intersection -->
  <line x1="400" y1="240" x2="400" y2="380" stroke="#f9a825" stroke-width="3"/>
  <line x1="280" y1="310" x2="520" y2="310" stroke="#f9a825" stroke-width="3"/>
  <!-- Diagonal directions -->
  <line x1="310" y1="240" x2="490" y2="380" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/>
  <line x1="490" y1="240" x2="310" y2="380" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/>
  <!-- Pedestrian dots -->
  <circle cx="400" cy="250" r="8" fill="#f9a825" opacity="0.8"/><circle cx="400" cy="370" r="8" fill="#f9a825" opacity="0.8"/><circle cx="290" cy="310" r="8" fill="#f9a825" opacity="0.8"/><circle cx="510" cy="310" r="8" fill="#f9a825" opacity="0.8"/><circle cx="320" cy="248" r="8" fill="#f9a825" opacity="0.8"/><circle cx="480" cy="372" r="8" fill="#f9a825" opacity="0.8"/>
  <text x="400" y="398" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">全方向同時青 = 対角線横断も可能</text>
</svg>
</div>

- **1回の青信号（約45秒）で最大3,000人が横断**
- 1日の横断者数：**約50万人**（休日は更に多い）
- 交差点の面積：約**3,000平方メートル**
- 5つの横断歩道が同時に青になる**全方向スクランブル方式**
- 1969年に導入 ― 50年以上事故率が極めて低い
- → 世界で最も効率的な交差点の一つ


---

<!-- _class: invert lead -->
# スクランブル方式の仕組み


---

# 通常交差点 vs スクランブル交差点

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert fit-70 -->
# スクランブル方式の発明と導入

> *Barnes方式が全方向同時青で歩行者スループットを最大化した*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">スクランブル交差点の誕生と設計思想</text>
  <!-- Timeline -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#16213e" stroke-width="5"/>
  <!-- 1951 Denver -->
  <circle cx="130" cy="200" r="14" fill="#f9a825"/>
  <line x1="130" y1="186" x2="130" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="60" y="75" width="140" height="45" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="130" y="96" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1951 デンバー</text>
  <text x="130" y="113" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">バーンズが初設置</text>
  <!-- 1969 Shibuya -->
  <circle cx="400" cy="200" r="18" fill="#e91e63"/>
  <line x1="400" y1="218" x2="400" y2="280" stroke="#e91e63" stroke-width="2"/>
  <rect x="310" y="280" width="180" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="305" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">1969 渋谷導入</text>
  <text x="400" y="323" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">「歩車分離式」として導入</text>
  <!-- 2010s AI upgrade -->
  <circle cx="620" cy="200" r="14" fill="#f9a825"/>
  <line x1="620" y1="186" x2="620" y2="120" stroke="#f9a825" stroke-width="2"/>
  <rect x="540" y="75" width="160" height="45" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="620" y="96" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">2010s AI制御</text>
  <text x="620" y="113" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">NEC 群衆解析システム</text>
  <!-- Core design principle box -->
  <rect x="100" y="355" width="600" height="38" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="378" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">設計原理：歩行者フェーズと車両フェーズを完全分離 → 衝突リスクをゼロに</text>
</svg>
</div>

- **1951年：** ヘンリー・バーンズがデンバーで初のスクランブル交差点を設置
- **1969年：** 渋谷に導入（当時は「歩車分離式」と呼ばれた）
- **原理：** 歩行者フェーズと車両フェーズを完全分離
- 歩行者青：全方向（対角線含む）の歩行が可能
- 車両青：歩行者は全員待機
- → **歩車の衝突リスクをゼロにする設計思想**


---

<!-- _class: invert lead -->
# 群衆力学：なぜぶつからないのか


---

<!-- _class: invert fit-70 -->
# レーン形成（Lane Formation）

> *歩行者が自律的にレーンを形成して衝突を回避する—中央制御なし*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">レーン形成（Lane Formation）：自己組織化の可視化</text>
  <!-- Left side: chaotic start -->
  <text x="200" y="60" text-anchor="middle" fill="#aaaaaa" font-size="13" font-family="sans-serif">信号青 直後（混沌）</text>
  <rect x="40" y="70" width="320" height="260" rx="8" fill="#16213e" stroke="#555555" stroke-width="1.5"/>
  <!-- Random pedestrians going in both directions -->
  <circle cx="60" cy="100" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="70,100 64,95 64,105" fill="#f9a825"/><circle cx="120" cy="100" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="110,100 116,95 116,105" fill="#e91e63"/><circle cx="180" cy="100" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="190,100 184,95 184,105" fill="#f9a825"/><circle cx="240" cy="100" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="230,100 236,95 236,105" fill="#e91e63"/><circle cx="300" cy="100" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="310,100 304,95 304,105" fill="#f9a825"/><circle cx="60" cy="155" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="50,155 56,150 56,160" fill="#e91e63"/><circle cx="120" cy="155" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="130,155 124,150 124,160" fill="#f9a825"/><circle cx="180" cy="155" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="170,155 176,150 176,160" fill="#e91e63"/><circle cx="240" cy="155" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="250,155 244,150 244,160" fill="#f9a825"/><circle cx="300" cy="155" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="290,155 296,150 296,160" fill="#e91e63"/><circle cx="60" cy="210" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="70,210 64,205 64,215" fill="#f9a825"/><circle cx="120" cy="210" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="110,210 116,205 116,215" fill="#e91e63"/><circle cx="180" cy="210" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="190,210 184,205 184,215" fill="#f9a825"/><circle cx="240" cy="210" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="230,210 236,205 236,215" fill="#e91e63"/><circle cx="300" cy="210" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="310,210 304,205 304,215" fill="#f9a825"/><circle cx="60" cy="265" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="50,265 56,260 56,270" fill="#e91e63"/><circle cx="120" cy="265" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="130,265 124,260 124,270" fill="#f9a825"/><circle cx="180" cy="265" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="170,265 176,260 176,270" fill="#e91e63"/><circle cx="240" cy="265" r="10" fill="#f9a825" opacity="0.7"/>
    <polygon points="250,265 244,260 244,270" fill="#f9a825"/><circle cx="300" cy="265" r="10" fill="#e91e63" opacity="0.7"/>
    <polygon points="290,265 296,260 296,270" fill="#e91e63"/>

  <!-- Right side: organized lanes -->
  <text x="600" y="60" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">数秒後（自己組織化）</text>
  <rect x="440" y="70" width="320" height="260" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Lane 1: going right (top half) -->
  <rect x="440" y="70" width="320" height="130" rx="8" fill="#f9a825" opacity="0.07"/>
  <text x="600" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">→ 右向きレーン</text>
  <circle cx="460" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="472,145 465,140 465,150" fill="#f9a825"/><circle cx="510" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="522,145 515,140 515,150" fill="#f9a825"/><circle cx="560" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="572,145 565,140 565,150" fill="#f9a825"/><circle cx="610" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="622,145 615,140 615,150" fill="#f9a825"/><circle cx="660" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="672,145 665,140 665,150" fill="#f9a825"/><circle cx="710" cy="145" r="10" fill="#f9a825" opacity="0.85"/>
    <polygon points="722,145 715,140 715,150" fill="#f9a825"/>
  <!-- Lane 2: going left (bottom half) -->
  <rect x="440" y="200" width="320" height="130" rx="8" fill="#e91e63" opacity="0.07"/>
  <text x="600" y="245" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">← 左向きレーン</text>
  <circle cx="710" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="698,275 705,270 705,280" fill="#e91e63"/><circle cx="660" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="648,275 655,270 655,280" fill="#e91e63"/><circle cx="610" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="598,275 605,270 605,280" fill="#e91e63"/><circle cx="560" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="548,275 555,270 555,280" fill="#e91e63"/><circle cx="510" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="498,275 505,270 505,280" fill="#e91e63"/><circle cx="460" cy="275" r="10" fill="#e91e63" opacity="0.85"/>
    <polygon points="448,275 455,270 455,280" fill="#e91e63"/>
  <!-- Arrow between panels -->
  <text x="390" y="210" text-anchor="middle" fill="#ffffff" font-size="20" font-family="sans-serif">→</text>
  <text x="390" y="230" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">自然に</text>
  <text x="390" y="245" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">整列</text>
</svg>
</div>

- **3,000人が同時に歩いても衝突しない理由：**
- 歩行者は無意識に**同じ方向に向かう人の後ろに並ぶ**
- 対向する人流が自然に「レーン」を形成する
- → これは**自己組織化**の典型例（誰も指示していない）
- ---
- 物理学では「相転移」に似た現象として研究されている
- 個体の単純なルール → 集団の複雑な秩序が**創発**する


---

<!-- _class: invert fit-70 -->
# 歩行者の3つの無意識ルール

> *右よけ・速度調整・流れ追従の3ルールが3,000人の秩序を生む*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">3つの無意識ルール → 3,000人の秩序</text>
  <!-- Rule 1: Avoidance -->
  <rect x="30" y="55" width="220" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ルール1: 回避</text>
  <text x="140" y="105" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">前方1.5-2mに人がいたら</text>
  <text x="140" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">横にずれる</text>
  <!-- Two people, one dodging -->
  <circle cx="110" cy="175" r="15" fill="#e91e63"/>
  <circle cx="170" cy="155" r="15" fill="#f9a825"/>
  <line x1="110" y1="160" x2="155" y2="145" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="140" y="215" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">衝突を予測して回避</text>
  <!-- Rule 2: Following -->
  <rect x="290" y="55" width="220" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ルール2: 追従</text>
  <text x="400" y="105" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">同じ方向の人の後ろを歩く</text>
  <text x="400" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">→ レーン形成</text>
  <!-- Chain of people -->
  <circle cx="320" cy="170" r="13" fill="#f9a825" opacity="0.5"/>
  <polygon points="335,170 328,163 328,177" fill="#f9a825" opacity="0.5"/><circle cx="355" cy="170" r="13" fill="#f9a825" opacity="0.6"/>
  <polygon points="370,170 363,163 363,177" fill="#f9a825" opacity="0.6"/><circle cx="390" cy="170" r="13" fill="#f9a825" opacity="0.7"/>
  <polygon points="405,170 398,163 398,177" fill="#f9a825" opacity="0.7"/><circle cx="425" cy="170" r="13" fill="#f9a825" opacity="0.8"/>
  <polygon points="440,170 433,163 433,177" fill="#f9a825" opacity="0.8"/><circle cx="460" cy="170" r="13" fill="#f9a825" opacity="0.9"/>
  <polygon points="475,170 468,163 468,177" fill="#f9a825" opacity="0.9"/>
  <text x="400" y="215" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">自然に列が形成される</text>
  <!-- Rule 3: Direct path -->
  <rect x="550" y="55" width="220" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="660" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ルール3: 直進</text>
  <text x="660" y="105" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">基本的に最短経路を</text>
  <text x="660" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">目指す</text>
  <circle cx="590" cy="160" r="13" fill="#e91e63"/>
  <circle cx="730" cy="180" r="13" fill="#e91e63"/>
  <line x1="603" y1="160" x2="717" y2="180" stroke="#f9a825" stroke-width="2"/>
  <text x="660" y="215" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">目的地への最短路</text>
  <!-- Emergence box at bottom -->
  <rect x="100" y="285" width="600" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="315" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">創発（Emergence）</text>
  <text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3つの単純ルール → 3,000人が45秒でほぼ衝突なく渡りきる</text>
  <text x="400" y="358" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">アリのコロニーと同じ「単純ルール → 複雑秩序」パターン</text>
</svg>
</div>

- **1. 回避ルール** ― 前方1.5-2mに人がいたら横にずれる
- **2. 追従ルール** ― 同じ方向の人の後ろを歩く（レーン形成）
- **3. 目的地直進ルール** ― 基本的に最短経路を目指す
- ---
- この3ルールだけで、3,000人の群衆が**45秒間ほぼ衝突なく**渡りきれる
- → アリのコロニーと同じ「単純ルール → 複雑秩序」のパターン


---

<!-- _class: invert lead -->
# 信号制御の最適化


---

<!-- _class: invert fit-94 -->
# 渋谷の信号サイクル設計（1/2）

> *45秒サイクルが理論値と実測が一致した最適化の産物*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷スクランブル：150秒サイクルの解剖</text>
  <!-- Pie chart of cycle -->
  <!-- Total: 150s. Pedestrian: 47s (~113deg). Vehicle: 103s (~247deg) -->
  <g transform="translate(250,215)">
    <circle cx="0" cy="0" r="140" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <!-- Pedestrian arc: 47/150 = 31.3% = 113 degrees -->
    <!-- Start at top (270deg), pedestrian 113deg clockwise = end at 23deg -->
    <!-- SVG coords: start=-90deg: (0,-140). End at -90+113=23deg: (140*sin(23°),−140*cos(23°))=(54.7,-128.8) -->
    <path d="M0,-140 A140,140 0 0,1 54.7,-128.8 Z" fill="#e91e63" opacity="0.85"/>
    <!-- 40s pedestrian (walking) + 7s flashing -->
    <path d="M0,-140 A140,140 0 0,1 31.5,-136.4 Z" fill="#f9a825" opacity="0.9"/>
    <!-- Vehicle arc: remaining 247 degrees -->
    <path d="M54.7,-128.8 A140,140 0 1,1 0,-140 Z" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <!-- Labels inside -->
    <text x="20" y="-85" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">歩行者</text>
    <text x="20" y="-68" fill="#ffffff" font-size="11" font-family="sans-serif">47秒</text>
    <text x="-30" y="40" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">車両</text>
    <text x="-30" y="60" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">103秒</text>
    <!-- Center label -->
    <circle cx="0" cy="0" r="50" fill="#1a1a2e"/>
    <text x="0" y="-5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">150秒</text>
    <text x="0" y="14" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">1サイクル</text>
  </g>
  <!-- Details on right -->
  <rect x="430" y="60" width="330" height="310" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="595" y="88" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">フェーズ詳細</text>
  <rect x="450" y="100" width="290" height="55" rx="6" fill="#e91e63" opacity="0.2" stroke="#e91e63" stroke-width="1.5"/>
  <text x="595" y="122" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">歩行者フェーズ: 47秒</text>
  <text x="595" y="140" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">青40秒 + 点滅7秒（余裕時間）</text>
  <rect x="450" y="165" width="290" height="55" rx="6" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="1.5"/>
  <text x="595" y="187" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">車両フェーズ: 103秒</text>
  <text x="595" y="205" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">各方向の車両に分配</text>
  <rect x="450" y="232" width="290" height="80" rx="6" fill="#1a1a2e" stroke="#555555" stroke-width="1"/>
  <text x="595" y="255" text-anchor="middle" fill="#aaaaaa" font-size="11" font-weight="bold" font-family="sans-serif">設計の鍵</text>
  <text x="595" y="275" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">対角線 ≈ 40m ÷ 歩行速度1.0m/s</text>
  <text x="595" y="292" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">= 40秒（最も長い横断時間）</text>
  <text x="595" y="309" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">点滅7秒 = 渡り始めた人への余裕</text>
  <text x="595" y="340" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">サイクルの31%が歩行者に割当</text>
</svg>
</div>

- **総サイクル：約150秒（2.5分）**
- 歩行者フェーズ：47秒（青40秒 + 点滅7秒）
- 車両フェーズ：約100秒（各方向に分配）
- ---


---

# 渋谷の信号サイクル設計（2/2）

> *方向別制御で渋谷固有の非対称な歩行者量に対応した設計*

- **最適化のポイント：**
- 歩行者青の時間は「最も遠い対角線を渡りきれる」長さに設定
- 対角線距離：約40m → 歩行速度1.0m/sで40秒
- 点滅7秒は「渡り始めた人が到着するための余裕」


---

<!-- _class: invert fit-82 -->
# リアルタイム制御の進化

> *カメラ+AI密度計測でサイクルを動的最適化する次世代制御*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷スクランブル：ハイブリッド制御アーキテクチャ</text>
  <!-- Sensors layer -->
  <text x="400" y="60" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">センシング層</text>
  <rect x="60" y="70" width="140" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="130" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">カメラ (AI)</text>
  <rect x="230" y="70" width="140" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="300" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">センサー</text>
  <rect x="400" y="70" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="480" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">歩行者密度計測</text>
  <rect x="580" y="70" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="660" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">イベント情報</text>
  <!-- Arrows down -->
  <line x1="130" y1="120" x2="280" y2="170" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="300" y1="120" x2="340" y2="170" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="480" y1="120" x2="440" y2="170" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="660" y1="120" x2="520" y2="170" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Control layer -->
  <text x="400" y="160" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">制御層</text>
  <rect x="250" y="170" width="300" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/>
  <text x="400" y="196" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">信号制御システム</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">NEC + 渋谷区 共同運用</text>
  <!-- Arrow down -->
  <line x1="400" y1="230" x2="400" y2="265" stroke="#e91e63" stroke-width="2"/>
  <polygon points="400,265 392,252 408,252" fill="#e91e63"/>
  <!-- Output layer -->
  <text x="400" y="255" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">出力層</text>
  <rect x="120" y="270" width="170" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="205" y="295" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">通常時</text>
  <text x="205" y="313" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">固定サイクル150秒</text>
  <rect x="315" y="270" width="170" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="295" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">混雑時</text>
  <text x="400" y="313" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">歩行者フェーズ延長</text>
  <rect x="510" y="270" width="170" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="595" y="295" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">イベント時</text>
  <text x="595" y="313" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">特別制御モード</text>
  <!-- Outcome -->
  <text x="400" y="365" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">50年前のアナログ設計 + 現代AI制御 = ハイブリッド最適化</text>
</svg>
</div>

- **カメラ+AI** ― 歩行者密度をリアルタイム計測
- 混雑時は歩行者フェーズを延長する動的制御
- イベント時（カウントダウン等）は特別制御に切り替え
- 渋谷区とNECが共同で群衆監視システムを運用
- → **50年前のアナログ設計 + 現代のAI制御 = ハイブリッド最適化**


---

<!-- _class: invert lead -->
# 自己組織化する歩行者


---

<!-- _class: invert fit-76 -->
# 渋谷交差点が教える分散システムの原理（1/2）

> *中央集権なしに3,000人が最適解を出す自己組織化の仕組み*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷交差点 = 分散システム：アーキテクチャ対比</text>
  <!-- Left: Shibuya -->
  <rect x="20" y="50" width="370" height="320" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">渋谷スクランブル交差点</text>
  <!-- Signal box -->
  <rect x="155" y="90" width="100" height="45" rx="8" fill="#e91e63" opacity="0.8"/>
  <text x="205" y="118" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">信号機</text>
  <!-- Pedestrians -->
  <circle cx="95" cy="200" r="14" fill="#f9a825" opacity="0.7"/>
  <polygon points="111,200 103,193 103,207" fill="#f9a825" opacity="0.7"/><circle cx="150" cy="200" r="14" fill="#f9a825" opacity="0.7"/>
  <polygon points="166,200 158,193 158,207" fill="#f9a825" opacity="0.7"/><circle cx="205" cy="200" r="14" fill="#f9a825" opacity="0.7"/>
  <polygon points="221,200 213,193 213,207" fill="#f9a825" opacity="0.7"/><circle cx="260" cy="200" r="14" fill="#f9a825" opacity="0.7"/>
  <polygon points="276,200 268,193 268,207" fill="#f9a825" opacity="0.7"/><circle cx="315" cy="200" r="14" fill="#f9a825" opacity="0.7"/>
  <polygon points="331,200 323,193 323,207" fill="#f9a825" opacity="0.7"/>
  <text x="205" y="235" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">自律的に経路を決定する歩行者</text>
  <!-- Lanes -->
  <rect x="40" y="255" width="330" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="205" y="280" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">自己組織化レーン（中央制御なし）</text>
  <!-- Signal arrow -->
  <line x1="205" y1="135" x2="205" y2="180" stroke="#e91e63" stroke-width="2"/>
  <polygon points="205,180 197,165 213,165" fill="#e91e63"/>
  <text x="205" y="156" text-anchor="end" fill="#e91e63" font-size="9" font-family="sans-serif">Go/Stop</text>
  <rect x="40" y="305" width="330" height="55" rx="6" fill="#1a1a2e" stroke="#555555" stroke-width="1"/>
  <text x="205" y="325" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">制御: Go/Stop の2命令のみ</text>
  <text x="205" y="343" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">残り全て: 各個人の自律判断</text>
  <text x="205" y="355" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">→ 最小制御で最大効率</text>

  <!-- Right: Distributed system -->
  <rect x="410" y="50" width="370" height="320" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">マイクロサービスシステム</text>
  <!-- LB box -->
  <rect x="545" y="90" width="100" height="45" rx="8" fill="#e91e63" opacity="0.8"/>
  <text x="595" y="118" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">LB</text>
  <!-- Services -->
  <rect x="463" y="180" width="44" height="32" rx="6" fill="#f9a825" opacity="0.7"/>
  <text x="485" y="200" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">svc</text><rect x="518" y="180" width="44" height="32" rx="6" fill="#f9a825" opacity="0.7"/>
  <text x="540" y="200" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">svc</text><rect x="573" y="180" width="44" height="32" rx="6" fill="#f9a825" opacity="0.7"/>
  <text x="595" y="200" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">svc</text><rect x="628" y="180" width="44" height="32" rx="6" fill="#f9a825" opacity="0.7"/>
  <text x="650" y="200" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">svc</text><rect x="683" y="180" width="44" height="32" rx="6" fill="#f9a825" opacity="0.7"/>
  <text x="705" y="200" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif">svc</text>
  <text x="595" y="230" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">自律的に処理するサービス</text>
  <!-- Service mesh -->
  <rect x="430" y="248" width="330" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="595" y="273" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">Service Mesh（サービス間直接通信）</text>
  <!-- Arrow -->
  <line x1="595" y1="135" x2="595" y2="175" stroke="#e91e63" stroke-width="2"/>
  <polygon points="595,175 587,160 603,160" fill="#e91e63"/>
  <text x="595" y="155" text-anchor="end" fill="#e91e63" font-size="9" font-family="sans-serif">ルーティング</text>
  <rect x="430" y="300" width="330" height="58" rx="6" fill="#1a1a2e" stroke="#555555" stroke-width="1"/>
  <text x="595" y="320" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">制御: ロードバランサーが振り分け</text>
  <text x="595" y="338" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">残り全て: 各サービスが自律処理</text>
  <text x="595" y="353" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">→ 最小制御で最大スケール</text>
</svg>
</div>

- **中央制御はほぼない** ― 信号が「Go/Stop」を出すだけ
- 3,000人の経路計画は**各個人が自律的に行う**
- それでも全体として効率的なフローが実現する
- ---


---

<!-- _class: invert fit-76 -->
# 渋谷交差点が教える分散システムの原理（2/2）

> *局所ルール遵守が創発的なグローバル秩序を生む—ブロックチェーンと同原理*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">対応表：渋谷スクランブル ↔ 分散システム</text>
  <!-- Table -->
  <rect x="20" y="48" width="335" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="187" y="72" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">渋谷スクランブル</text>
  <rect x="365" y="48" width="415" height="40" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="572" y="72" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">分散システム</text>
  <rect x="20" y="98" width="335" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="187" y="125" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">信号機 (Go/Stop のみ)</text>
    <rect x="365" y="98" width="415" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="572" y="125" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">ロードバランサー（大まかな制御）</text>
    <text x="352" y="125" text-anchor="middle" fill="#555555" font-size="16" font-family="sans-serif">→</text><rect x="20" y="150" width="335" height="46" rx="2" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="187" y="177" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">歩行者 (自律的経路選択)</text>
    <rect x="365" y="150" width="415" height="46" rx="2" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="572" y="177" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">マイクロサービス（自律的に動作）</text>
    <text x="352" y="177" text-anchor="middle" fill="#555555" font-size="16" font-family="sans-serif">→</text><rect x="20" y="202" width="335" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="187" y="229" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">レーン形成（自己組織化）</text>
    <rect x="365" y="202" width="415" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="572" y="229" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">自己組織化クラスタリング</text>
    <text x="352" y="229" text-anchor="middle" fill="#555555" font-size="16" font-family="sans-serif">→</text><rect x="20" y="254" width="335" height="46" rx="2" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="187" y="281" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">点滅7秒（バッファ）</text>
    <rect x="365" y="254" width="415" height="46" rx="2" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="572" y="281" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">サーキットブレーカー + Timeout</text>
    <text x="352" y="281" text-anchor="middle" fill="#555555" font-size="16" font-family="sans-serif">→</text><rect x="20" y="306" width="335" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="187" y="333" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">赤信号を守る文化</text>
    <rect x="365" y="306" width="415" height="46" rx="2" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="572" y="333" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">APIコントラクト（共有プロトコル）</text>
    <text x="352" y="333" text-anchor="middle" fill="#555555" font-size="16" font-family="sans-serif">→</text>
  <text x="400" y="378" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">「全てを制御しようとしない」= 最も効率的な設計</text>
</svg>
</div>

- 分散システムとの類似：
- 信号 = ロードバランサー（大まかな制御のみ）
- 歩行者 = マイクロサービス（自律的に動作）
- レーン形成 = 自己組織化クラスタリング


---

<!-- _class: invert fit-58 -->
# なぜ渋谷では機能するのか（文化的要因）

> *高ルール遵守文化+非言語読解力+縦型信号が渋谷を可能にした*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷交差点から学ぶ分散システム設計原則</text>
  <!-- 5 principles as horizontal bars -->
  <rect x="40" y="60" width="720" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="60" y="82" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1. 完全分離は安全</text>
    <text x="60" y="100" fill="#aaaaaa" font-size="11" font-family="sans-serif">歩車分離 = 衝突ゼロの設計</text><rect x="40" y="122" width="720" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="60" y="144" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">2. 最小限の中央制御</text>
    <text x="60" y="162" fill="#aaaaaa" font-size="11" font-family="sans-serif">信号は Go/Stop だけ指示</text><rect x="40" y="184" width="720" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="60" y="206" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">3. 自己組織化を信頼</text>
    <text x="60" y="224" fill="#aaaaaa" font-size="11" font-family="sans-serif">個体の単純ルール → 全体秩序</text><rect x="40" y="246" width="720" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="60" y="268" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">4. バッファを設計に組み込む</text>
    <text x="60" y="286" fill="#aaaaaa" font-size="11" font-family="sans-serif">点滅7秒 = 安全余裕</text><rect x="40" y="308" width="720" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="60" y="330" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">5. 文化が前提</text>
    <text x="60" y="348" fill="#aaaaaa" font-size="11" font-family="sans-serif">共有規範なしに秩序は生まれない</text>
  <!-- System parallel labels -->
  <text x="700" y="88" text-anchor="end" fill="#555555" font-size="9" font-family="sans-serif">cf. マイクロサービス分離</text>
  <text x="700" y="150" text-anchor="end" fill="#555555" font-size="9" font-family="sans-serif">cf. ロードバランサー</text>
  <text x="700" y="212" text-anchor="end" fill="#555555" font-size="9" font-family="sans-serif">cf. 分散合意アルゴリズム</text>
  <text x="700" y="274" text-anchor="end" fill="#555555" font-size="9" font-family="sans-serif">cf. サーキットブレーカー</text>
  <text x="700" y="336" text-anchor="end" fill="#555555" font-size="9" font-family="sans-serif">cf. APIコントラクト</text>
  <text x="400" y="385" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">「全てを制御しようとしない」ことが最も効率的な設計になる</text>
</svg>
</div>

- **1. 規範遵守** ― 赤信号で渡らない文化
- **2. 他者への配慮** ― 「ぶつかったらすみません」の精神
- **3. 歩行速度の均一性** ― 極端に遅い/速い人が少ない
- **4. 傘の文化** ― 雨でも歩行パターンが安定（傘が「バッファ」に）
- ---
- → **同じ交差点設計でも、文化が違えば機能しない可能性がある**
- → システム設計は「ユーザーの行動特性」を前提に成立する


---

<!-- _class: invert lead -->
# 分散システム設計への示唆

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">渋谷スクランブルが証明した3層設計</text>
  <!-- Three concentric circles / layers -->
  <circle cx="400" cy="210" r="160" fill="#16213e" stroke="#333355" stroke-width="1"/>
  <circle cx="400" cy="210" r="110" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
  <circle cx="400" cy="210" r="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <!-- Inner: Signal (minimal control) -->
  <text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">信号制御</text>
  <text x="400" y="222" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">最小制御</text>
  <!-- Middle: Self-organization -->
  <text x="400" y="130" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">自己組織化</text>
  <text x="400" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">レーン形成</text>
  <!-- Outer: Culture -->
  <text x="400" y="75" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">文化・プロトコル</text>
  <text x="400" y="92" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">共有規範</text>
  <!-- Annotations on sides -->
  <text x="140" y="210" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">← 環境設計</text>
  <text x="660" y="210" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">ユーザー行動 →</text>
  <!-- System design parallel -->
  <rect x="30" y="320" width="340" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="200" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">渋谷交差点</text>
  <text x="200" y="362" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">信号 + 歩行者 + 文化</text>
  <rect x="430" y="320" width="340" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="600" y="345" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">分散システム</text>
  <text x="600" y="362" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">LB + マイクロサービス + API契約</text>
  <text x="400" y="305" text-anchor="middle" fill="#ffffff" font-size="16" font-family="sans-serif">≅</text>
</svg>
</div>


---

<!-- _class: invert fit-88 -->
# 渋谷交差点から学ぶ設計原則

> *局所ルール+バッファ設計+フィードバックの3原則が分散設計の教科書*

- **1. 完全分離は安全だが効率的** ― 歩車分離は衝突をゼロにする
- **2. 最小限の中央制御** ― 信号は「いつ動くか」だけを指示
- **3. 自己組織化を信頼する** ― 個体の単純ルールが全体秩序を生む
- **4. バッファを設計に組み込む** ― 点滅7秒の余裕が事故を防ぐ
- **5. 文化（プロトコル）が前提** ― 共有規範なしに秩序は生まれない


---

<!-- _class: invert lead fit-82 -->
# まとめ

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">まとめ：渋谷スクランブルが証明した普遍原理</text>
  <!-- Three rings -->
  <circle cx="400" cy="215" r="165" fill="none" stroke="#333355" stroke-width="1"/>
  <circle cx="400" cy="215" r="110" fill="none" stroke="#333355" stroke-width="1"/>
  <circle cx="400" cy="215" r="55" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <!-- Core -->
  <text x="400" y="210" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">最小制御</text>
  <text x="400" y="228" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">信号</text>
  <!-- Middle ring label -->
  <text x="400" y="130" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">自己組織化</text>
  <text x="400" y="147" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">歩行者のレーン形成</text>
  <!-- Outer ring labels -->
  <text x="400" y="68" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">文化・プロトコル</text>
  <text x="400" y="85" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">赤信号を守る共有規範</text>
  <!-- Outcome annotation -->
  <rect x="80" y="320" width="640" height="65" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="345" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3,000人 × 45秒 = 事故なし</text>
  <text x="400" y="367" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">設計 + 自己組織化 + 文化が協働する分散システムの傑作</text>
</svg>
</div>

- 渋谷スクランブル交差点は**都市工学の傑作**
- 3,000人が45秒で渡れるのは偶然ではなく**設計と自己組織化の協働**
- 最小限の制御 + 個体の自律性 + 文化的プロトコル = 効率的な秩序
- この原理は分散システム・マイクロサービス設計にそのまま応用できる
- **「全てを制御しようとしない」ことが最も効率的な設計になる**


---

<!-- _class: invert fit-88 -->
# 参考文献

> *群衆力学・信号制御・自己組織化の学術的根拠を参照できる*

- **学術研究:**
- [Pedestrian Dynamics - D. Helbing](https://www.amazon.com/dp/3540751203)
- [Self-Organization of Pedestrian Flow (Nature)](https://www.nature.com/)
- **データ:**
- [渋谷区 交通量調査](https://www.city.shibuya.tokyo.jp/)
- [NEC 群衆行動解析](https://www.nec.com/)

