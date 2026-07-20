---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "p値と再現性の危機"
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
# p値の罠と再現性の危機

- 統計学が科学を騙すとき
- 2026-02-20


---

<!-- _class: invert fit-88 -->
# 目次

> *p値の誤用が招いた再現性の危機と6つの改革アジェンダを解説する*

- 1. p値とは何か — 正しい定義
- 2. p値の誤解と悪用
- 3. 再現性の危機
- 4. なぜこうなったのか
- 5. 改革の動き
- 6. エンジニアへの教訓


---

<!-- _class: invert lead -->
# 1. p値とは何か


---

<!-- _class: invert fit-82 -->
# p値の誕生

> *1925年Fisherの「p<0.05基準」が今も科学界を縛っている*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <!-- Timeline bar -->
  <rect x="60" y="180" width="680" height="8" rx="4" fill="#16213e"/>
  <!-- Year markers -->
  <line x1="120" y1="165" x2="120" y2="205" stroke="#f9a825" stroke-width="2"/>
  <text x="120" y="155" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">1925</text>
  <text x="120" y="235" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Fisher提唱</text>
  <text x="120" y="250" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">p&lt;0.05「目安」</text>

  <line x1="300" y1="165" x2="300" y2="205" stroke="#e91e63" stroke-width="2"/>
  <text x="300" y="155" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">1940s</text>
  <text x="300" y="235" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Neyman-Pearson</text>
  <text x="300" y="250" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">仮説検定体系化</text>

  <line x1="500" y1="165" x2="500" y2="205" stroke="#f9a825" stroke-width="2"/>
  <text x="500" y="155" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">1960s-80s</text>
  <text x="500" y="235" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">0.05が「門番」に</text>
  <text x="500" y="250" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">雑誌が採用</text>

  <line x1="690" y1="165" x2="690" y2="205" stroke="#e91e63" stroke-width="2"/>
  <text x="690" y="155" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">2016</text>
  <text x="690" y="235" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ASA声明</text>
  <text x="690" y="250" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">「廃止」議論</text>

  <!-- Label -->
  <text x="400" y="50" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="bold" font-family="sans-serif">p値の歴史：便利な目安が「科学の門番」になるまで</text>

  <!-- Arrow showing escalation -->
  <path d="M140 120 Q400 80 670 120" stroke="#f9a825" stroke-width="2" fill="none" stroke-dasharray="6,4"/>
  <polygon points="670,120 660,110 680,110" fill="#f9a825"/>
  <text x="400" y="100" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">「目安」→「絶対基準」への変質</text>
</svg>
</div>

- **Ronald Fisher** (1925): 統計的検定の枠組みを提唱
- 「p値は仮説を棄却するかの指標」として導入
- Fisher自身は **0.05を絶対的閾値にするつもりはなかった**
- 「便利な目安」のはずが「科学の門番」に
- 100年後、科学界は0.05に支配されている


---

# p値の正しい意味と誤解

![w:900 center](assets/p-value-misuse.svg)


---

<!-- _class: invert lead -->
# 2. p値の悪用

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">p値の悪用：4つの主要パターン</text>
  <!-- p-hacking -->
  <rect x="20" y="50" width="370" height="140" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="205" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">p-hacking（p値操作）</text>
  <text x="205" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">p &lt; 0.05になるまでデータを追加</text>
  <text x="205" y="118" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">→ 偽陽性率が実際より大幅に上昇</text>
  <!-- distribution showing manipulated threshold -->
  <line x1="50" y1="170" x2="370" y2="170" stroke="#555577" stroke-width="1"/>
  <line x1="305" y1="148" x2="305" y2="175" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="310" y="167" fill="#e91e63" font-size="9" font-family="sans-serif">p=0.05</text>
  <rect x="55" y="162" width="14" height="8" fill="#444466" opacity="0.8"/><rect x="71" y="162" width="14" height="8" fill="#444466" opacity="0.8"/><rect x="87" y="161" width="14" height="9" fill="#444466" opacity="0.8"/><rect x="103" y="160" width="14" height="10" fill="#444466" opacity="0.8"/><rect x="119" y="159" width="14" height="11" fill="#444466" opacity="0.8"/><rect x="135" y="158" width="14" height="12" fill="#444466" opacity="0.8"/><rect x="151" y="156" width="14" height="14" fill="#444466" opacity="0.8"/><rect x="167" y="153" width="14" height="17" fill="#444466" opacity="0.8"/><rect x="183" y="150" width="14" height="20" fill="#444466" opacity="0.8"/><rect x="199" y="147" width="14" height="23" fill="#444466" opacity="0.8"/><rect x="215" y="144" width="14" height="26" fill="#444466" opacity="0.8"/><rect x="231" y="143" width="14" height="27" fill="#444466" opacity="0.8"/><rect x="247" y="142" width="14" height="28" fill="#444466" opacity="0.8"/><rect x="263" y="143" width="14" height="27" fill="#444466" opacity="0.8"/><rect x="279" y="144" width="14" height="26" fill="#444466" opacity="0.8"/><rect x="295" y="147" width="14" height="23" fill="#444466" opacity="0.8"/><rect x="311" y="150" width="14" height="20" fill="#e91e63" opacity="0.8"/><rect x="327" y="153" width="14" height="17" fill="#e91e63" opacity="0.8"/><rect x="343" y="156" width="14" height="14" fill="#e91e63" opacity="0.8"/><rect x="359" y="158" width="14" height="12" fill="#e91e63" opacity="0.8"/>
  <!-- HARKing -->
  <rect x="410" y="50" width="370" height="140" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">HARKing</text>
  <text x="595" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Hypothesizing After Results Known</text>
  <text x="595" y="118" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">→ 仮説を事後に作り上げる偽の確証</text>
  <text x="595" y="142" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">実際: 探索的 → 表向き: 仮説検証的</text>
  <text x="595" y="162" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">事前登録（pre-registration）で防止可能</text>
  <!-- Publication bias -->
  <rect x="20" y="215" width="370" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="243" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">出版バイアス</text>
  <text x="205" y="265" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">有意な結果だけが出版される</text>
  <text x="205" y="283" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">→ ファイル引き出し問題</text>
  <text x="205" y="335" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">出版率: 有意 97% vs 非有意 8%</text>
  <!-- NHST misunderstanding -->
  <rect x="410" y="215" width="370" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="595" y="243" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">NHST誤解</text>
  <text x="595" y="265" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">p値は「帰無仮説が真である確率」ではない</text>
  <text x="595" y="283" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">実際: データが帰無仮説下で生じる確率</text>
  <text x="595" y="335" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">P(data|H₀) ≠ P(H₀|data)</text>
  <text x="400" y="382" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これらが組み合わさって再現性の危機を生む</text>
</svg>
</div>


---

<!-- _class: invert fit-76 -->
# p-hacking: 統計的「不正」

> *20の変数を試せば偶然1つはp<0.05になる確率が高い*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="17" font-weight="bold" font-family="sans-serif">多重比較問題：20変数試せば1つは偶然 p&lt;0.05</text>
  <!-- 20 boxes for 20 variables -->
  <rect x="60" y="70" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="120" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 1</text>
    <text x="120" y="110" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.10</text><rect x="200" y="70" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="260" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 2</text>
    <text x="260" y="110" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.33</text><rect x="340" y="70" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="400" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 3</text>
    <text x="400" y="110" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.44</text><rect x="480" y="70" width="120" height="55" rx="8" fill="#e91e63" stroke="#e91e63" stroke-width="2"/>
    <text x="540" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 4</text>
    <text x="540" y="110" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">p=0.043 ✓</text><rect x="620" y="70" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="680" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 5</text>
    <text x="680" y="110" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.22</text><rect x="60" y="145" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="120" y="167" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 6</text>
    <text x="120" y="185" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.02</text><rect x="200" y="145" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="260" y="167" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 7</text>
    <text x="260" y="185" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.21</text><rect x="340" y="145" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="400" y="167" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 8</text>
    <text x="400" y="185" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.24</text><rect x="480" y="145" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="540" y="167" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 9</text>
    <text x="540" y="185" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.12</text><rect x="620" y="145" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="680" y="167" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 10</text>
    <text x="680" y="185" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.11</text><rect x="60" y="220" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="120" y="242" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 11</text>
    <text x="120" y="260" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.33</text><rect x="200" y="220" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="260" y="242" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 12</text>
    <text x="260" y="260" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.45</text><rect x="340" y="220" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="400" y="242" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 13</text>
    <text x="400" y="260" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.40</text><rect x="480" y="220" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="540" y="242" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 14</text>
    <text x="540" y="260" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.21</text><rect x="620" y="220" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="680" y="242" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 15</text>
    <text x="680" y="260" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.03</text><rect x="60" y="295" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="120" y="317" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 16</text>
    <text x="120" y="335" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.21</text><rect x="200" y="295" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="260" y="317" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 17</text>
    <text x="260" y="335" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.24</text><rect x="340" y="295" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="400" y="317" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 18</text>
    <text x="400" y="335" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=-0.12</text><rect x="480" y="295" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="540" y="317" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 19</text>
    <text x="540" y="335" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.11</text><rect x="620" y="295" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="680" y="317" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変数 20</text>
    <text x="680" y="335" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="normal" font-family="sans-serif">p=0.33</text>
  <!-- Annotation -->
  <text x="400" y="380" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">5%の確率 × 20回 = 期待値1件の偽陽性（赤）</text>
</svg>
</div>

- **データドレッジング**: 20変数を試せば1つは偶然 p<0.05
- **途中解析**: p<0.05になった瞬間にデータ収集を停止
- **選択的報告**: 有意な結果だけ論文にする
- **HARKing**: 結果を見てから仮説を「予測していた」と記述
- **サンプルサイズ操作**: 有意になるまで被験者を追加
- 意図的でなくても「研究者の自由度」が偽陽性を生む


---

<!-- _class: invert fit-76 -->
# 「チョコレートでダイエット」実験

> *意図的なp-hackingで一流紙に掲載された偽科学の実証*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">チョコレート実験：18測定項目から「有意」を発掘</text>
  <!-- Funnel shape -->
  <polygon points="200,70 600,70 520,200 280,200" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="110" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">18 測定項目</text>
  <text x="400" y="140" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">体重, BMI, コレステロール, 睡眠, 気分...</text>

  <!-- Narrow part -->
  <rect x="360" y="200" width="80" height="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="230" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">統計処理</text>

  <!-- Output: one significant -->
  <rect x="320" y="270" width="160" height="50" rx="8" fill="#e91e63" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="295" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">「体重減少 p=0.04!」</text>
  <text x="400" y="312" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 論文・メディア報道</text>

  <!-- Rejected items -->
  <text x="160" y="300" text-anchor="middle" fill="#555555" font-size="10" font-family="sans-serif">17項目: 非有意</text>
  <text x="160" y="315" text-anchor="middle" fill="#555555" font-size="10" font-family="sans-serif">（報告されず）</text>

  <!-- Arrow -->
  <polygon points="240,290 200,280 200,300" fill="#555555"/>
  <line x1="315" y1="290" x2="205" y2="290" stroke="#555555" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="400" y="380" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">多重比較補正なし = 偶然を「発見」と誤認</text>
</svg>
</div>

- **2015年**: 科学ジャーナリストが意図的にp-hackingを実演
- 15人の被験者で18種類の測定項目を同時測定
- 「ダークチョコレートが減量を促進」(p=0.04) を「発見」
- 多重比較補正なし → 偶然の一致を「有意」と報告
- 複数の主要メディアが真面目に報道
- → p<0.05だけで結果を信じる危険性を世界に示した


---

<!-- _class: invert lead -->
# 3. 再現性の危機


---

# 分野別の再現率

![w:900 center](assets/replication-crisis.svg)


---

<!-- _class: invert fit-70 -->
# 衝撃的な数字

> *心理学の再現率36%、がん研究は6分の1しか再現しない*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">再現性の危機：数字で見る実態</text>
  <!-- Big stat 1 -->
  <rect x="30" y="55" width="220" height="130" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="42" font-weight="bold" font-family="sans-serif">36%</text>
  <text x="140" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学実験の再現率</text>
  <text x="140" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">OSC 2015 (100本)</text>
  <text x="140" y="168" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">元報告の97% → 再現36%</text>
  <!-- Big stat 2 -->
  <rect x="290" y="55" width="220" height="130" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="100" text-anchor="middle" fill="#e91e63" font-size="42" font-weight="bold" font-family="sans-serif">51%</text>
  <text x="400" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">癌研究の再現率</text>
  <text x="400" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Amgen 2012 (53本)</text>
  <text x="400" y="168" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">6/53本のみ完全再現</text>
  <!-- Big stat 3 -->
  <rect x="550" y="55" width="220" height="130" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
  <text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="42" font-weight="bold" font-family="sans-serif">$28B</text>
  <text x="660" y="128" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">年間の無駄な研究費用</text>
  <text x="660" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">米国のみ（Freedman 2015）</text>
  <text x="660" y="168" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">再現不可能な研究への投資</text>
  <!-- Field comparison bar chart -->
  <text x="400" y="215" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">分野別再現率</text>
  <rect x="60" y="310" width="90" height="60" rx="4" fill="#e91e63" opacity="0.8"/>
    <text x="105" y="375" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">認知心理</text>
    <text x="105" y="305" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">50%</text><rect x="200" y="340" width="90" height="30" rx="4" fill="#e91e63" opacity="0.8"/>
    <text x="245" y="375" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">社会心理</text>
    <text x="245" y="335" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">25%</text><rect x="340" y="297" width="90" height="73" rx="4" fill="#f9a825" opacity="0.8"/>
    <text x="385" y="375" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">経済学</text>
    <text x="385" y="292" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">61%</text><rect x="480" y="322" width="90" height="48" rx="4" fill="#e91e63" opacity="0.8"/>
    <text x="525" y="375" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">神経科学</text>
    <text x="525" y="317" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">40%</text><rect x="620" y="304" width="90" height="66" rx="4" fill="#f9a825" opacity="0.8"/>
    <text x="665" y="375" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">医学臨床</text>
    <text x="665" y="299" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">55%</text>
</svg>
</div>

- **心理学**: 100本中39本のみ再現 (Open Science Collaboration, 2015)
- **がん研究**: 53本中6本のみ再現 (Amgen, 2012)
- **経済学**: 実験経済学の49%のみ再現 (Camerer et al., 2016)
- **前臨床医学**: 約50%が再現不可能
- 製薬業界の損失: 年間 **280億ドル** (再現不可能な研究への投資)
- 科学への信頼危機: 一般市民の科学不信を助長


---

<!-- _class: invert lead -->
# 4. なぜこうなったのか

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" text-anchor="middle" fill="#ffffff" font-size="17" font-weight="bold" font-family="sans-serif">分野別：再現できた研究の割合</text>
  <!-- Y axis -->
  <line x1="100" y1="60" x2="100" y2="320" stroke="#ffffff" stroke-width="1"/>
  <line x1="100" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="1"/>
  <!-- 100% line -->
  <line x1="100" y1="60" x2="720" y2="60" stroke="#555555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="88" y="64" text-anchor="end" fill="#aaaaaa" font-size="11" font-family="sans-serif">100%</text>
  <!-- 50% line -->
  <line x1="100" y1="190" x2="720" y2="190" stroke="#555555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="88" y="194" text-anchor="end" fill="#aaaaaa" font-size="11" font-family="sans-serif">50%</text>
  <!-- Bars -->
  <!-- Psychology: 39% -->
  <rect x="140" y="217" width="100" height="103" fill="#e91e63" rx="4"/>
  <text x="190" y="212" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">39%</text>
  <text x="190" y="340" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学</text>
  <!-- Cancer: 11% -->
  <rect x="280" y="290" width="100" height="30" fill="#e91e63" rx="4"/>
  <text x="330" y="285" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">11%</text>
  <text x="330" y="340" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">がん研究</text>
  <!-- Economics: 49% -->
  <rect x="420" y="188" width="100" height="132" fill="#f9a825" rx="4"/>
  <text x="470" y="183" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">49%</text>
  <text x="470" y="340" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">実験経済学</text>
  <!-- Preclinical: 50% -->
  <rect x="560" y="190" width="100" height="130" fill="#f9a825" rx="4"/>
  <text x="610" y="185" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">~50%</text>
  <text x="610" y="340" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">前臨床医学</text>
  <text x="400" y="375" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">出典: Open Science Collaboration (2015), Amgen (2012), Camerer et al. (2016)</text>
</svg>
</div>


---

<!-- _class: invert fit-76 -->
# 構造的な問題

> *出版バイアスと「有意差」圧力が研究者を不正に追い込む*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">構造的な問題：なぜ繰り返されるか</text>
  <!-- Cycle diagram -->
  <!-- Central problem -->
  <ellipse cx="400" cy="200" rx="80" ry="50" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="400" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">出版圧力</text>
  <text x="400" y="213" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">"Publish or Perish"</text>
  <!-- 4 surrounding factors -->
  <!-- Incentive -->
  <rect x="20" y="60" width="180" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="110" y="84" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">歪んだインセンティブ</text>
  <text x="110" y="102" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">p&lt;0.05のみが昇進・資金に</text>
  <text x="110" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">つながる学術制度</text>
  <line x1="196" y1="93" x2="320" y2="170" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="320,170 308,163 312,175" fill="#f9a825"/>
  <!-- Small samples -->
  <rect x="600" y="60" width="180" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="690" y="84" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">小サンプル研究</text>
  <text x="690" y="102" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">N=20~50程度の実験が</text>
  <text x="690" y="116" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">トップジャーナルに掲載</text>
  <line x1="604" y1="93" x2="480" y2="170" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="480,170 492,163 488,175" fill="#f9a825"/>
  <!-- Peer review failure -->
  <rect x="20" y="280" width="180" height="65" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="110" y="304" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">査読の限界</text>
  <text x="110" y="322" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">統計的妥当性より</text>
  <text x="110" y="336" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">新規性が評価される</text>
  <line x1="196" y1="313" x2="320" y2="233" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="320,233 308,230 316,242" fill="#e91e63"/>
  <!-- No replication incentive -->
  <rect x="600" y="280" width="180" height="65" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="690" y="304" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">追試の非奨励</text>
  <text x="690" y="322" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">「再現」論文は</text>
  <text x="690" y="336" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">採択されにくい</text>
  <line x1="604" y1="313" x2="480" y2="233" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="480,233 492,230 484,242" fill="#e91e63"/>
  <text x="400" y="382" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">個人の不正ではなく、制度的・構造的な問題</text>
</svg>
</div>

- **出版バイアス**: 有意な結果だけが論文として出版される
- **Publish or Perish**: 論文数がキャリアを決める圧力
- **統計教育の不足**: 多くの研究者がp値を正しく理解していない
- **サンプルサイズ不足**: 検出力(power)が低い研究が多すぎる
- **事前登録の欠如**: 仮説を後から変更できてしまう
- → 「有意な結果を出す」インセンティブが歪みを生む


---

<!-- _class: invert fit-76 -->
# ファイルドロワー問題

> *陰性結果が引き出しに眠り続け科学の文献が偏る*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">歪んだインセンティブ構造：なぜ偽陽性が生まれるのか</text>
  <!-- Nodes -->
  <!-- Researcher -->
  <rect x="320" y="55" width="160" height="50" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="78" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">研究者</text>
  <text x="400" y="96" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">キャリアへの圧力</text>
  <!-- publish or perish -->
  <rect x="100" y="175" width="160" height="50" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="180" y="198" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Publish or Perish</text>
  <text x="180" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">論文数 = 評価</text>
  <!-- p-hacking -->
  <rect x="320" y="175" width="160" height="50" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="198" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">p-hacking</text>
  <text x="400" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">有意を探す行動</text>
  <!-- publication bias -->
  <rect x="540" y="175" width="160" height="50" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="620" y="198" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">出版バイアス</text>
  <text x="620" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">有意のみ採択</text>
  <!-- false positive literature -->
  <rect x="320" y="300" width="160" height="50" rx="10" fill="#e91e63" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">文献の歪み</text>
  <text x="400" y="341" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">偽陽性が蓄積</text>
  <!-- Arrows -->
  <line x1="370" y1="105" x2="220" y2="175" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="220,175 228,162 235,174" fill="#e91e63"/>
  <line x1="400" y1="105" x2="400" y2="175" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="400,175 393,162 407,162" fill="#e91e63"/>
  <line x1="430" y1="105" x2="580" y2="175" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="580,175 572,162 585,166" fill="#e91e63"/>
  <line x1="240" y1="225" x2="360" y2="300" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="360,300 348,292 355,280" fill="#e91e63"/>
  <line x1="400" y1="225" x2="400" y2="300" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="400,300 393,287 407,287" fill="#e91e63"/>
  <line x1="560" y1="225" x2="440" y2="300" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="440,300 445,287 457,292" fill="#e91e63"/>
</svg>
</div>

- 「有意でない」結果は引き出し(file drawer)にしまわれる
- 出版された研究は「成功」のみ = 生存者バイアス
- 100チームが同じ実験 → 5チームが偶然 p<0.05 → 5本だけ出版
- 読者は「5/5=100%成功」と誤認する
- メタアナリシスも出版バイアスの影響を受ける


---

<!-- _class: invert lead -->
# 5. 改革の動き

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">統計改革の歴史的流れ</text>
  <!-- Timeline line -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#555577" stroke-width="2"/>
  <!-- Arrow -->
  <polygon points="740,200 728,194 728,206" fill="#555577"/>
  <!-- Events -->
  <circle cx="80" cy="200" r="6" fill="#e91e63"/>
    <line x1="80" y1="170" x2="80" y2="200" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="80" y="152" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">2011</text>
    <text x="80" y="166" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Simmons et al.</text><text x="80" y="180" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">false positive率</text><circle cx="175" cy="200" r="6" fill="#e91e63"/>
    <line x1="175" y1="200" x2="175" y2="255" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="175" y="255" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">2012</text>
    <text x="175" y="273" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Amgen 研究</text><text x="175" y="287" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">再現不可確認</text><circle cx="270" cy="200" r="6" fill="#f9a825"/>
    <line x1="270" y1="170" x2="270" y2="200" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="270" y="152" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">2013</text>
    <text x="270" y="166" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">OSC設立</text><text x="270" y="180" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">再現プロジェクト</text><circle cx="365" cy="200" r="6" fill="#e91e63"/>
    <line x1="365" y1="200" x2="365" y2="255" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="365" y="255" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">2015</text>
    <text x="365" y="273" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">OSC論文</text><text x="365" y="287" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">36%再現率</text><circle cx="460" cy="200" r="6" fill="#f9a825"/>
    <line x1="460" y1="170" x2="460" y2="200" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="460" y="152" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">2016</text>
    <text x="460" y="166" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">APA統計</text><text x="460" y="180" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">ガイドライン改訂</text><circle cx="555" cy="200" r="6" fill="#f9a825"/>
    <line x1="555" y1="200" x2="555" y2="255" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="555" y="255" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">2019</text>
    <text x="555" y="273" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">ASA声明</text><text x="555" y="287" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">p &lt; 0.05廃止推奨</text><circle cx="650" cy="200" r="6" fill="#f9a825"/>
    <line x1="650" y1="170" x2="650" y2="200" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="650" y="152" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">2023</text>
    <text x="650" y="166" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">事前登録が</text><text x="650" y="180" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">標準に</text>
  <text x="400" y="375" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">危機認識 → ガイドライン改訂 → 実践変革の波が続く</text>
</svg>
</div>


---

<!-- _class: invert fit-70 -->
# 統計改革の提案

> *効果量・事前登録・ベイズ統計が代替アプローチとして台頭*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">統計改革：3つのアプローチ</text>
  <!-- Approach 1: Bayesian -->
  <rect x="20" y="55" width="240" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ベイズ統計</text>
  <line x1="40" y1="95" x2="240" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="140" y="115" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">事前知識を組み込む</text>
  <text x="140" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">P(H|data) を直接算出</text>
  <text x="140" y="165" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">メリット:</text>
  <text x="140" y="183" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・仮説の確率を表現</text>
  <text x="140" y="199" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・連続的更新が可能</text>
  <text x="140" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・証拠の強さを定量化</text>
  <text x="140" y="245" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">デメリット:</text>
  <text x="140" y="263" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・事前分布の主観性</text>
  <text x="140" y="279" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・計算コスト高</text>
  <!-- Approach 2: Effect sizes -->
  <rect x="280" y="55" width="240" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">効果量 + CI</text>
  <line x1="300" y1="95" x2="500" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="400" y="115" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Cohen's d, η², r</text>
  <text x="400" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">p値でなく効果の大きさを報告</text>
  <text x="400" y="165" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">メリット:</text>
  <text x="400" y="183" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・実用的重要性が明確</text>
  <text x="400" y="199" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・メタ解析が容易</text>
  <text x="400" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・現行制度と互換</text>
  <text x="400" y="245" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">推奨 Cohen's d 解釈:</text>
  <text x="400" y="263" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">小: 0.2 | 中: 0.5 | 大: 0.8</text>
  <!-- Approach 3: Pre-registration -->
  <rect x="540" y="55" width="240" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="660" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">事前登録</text>
  <line x1="560" y1="95" x2="760" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="660" y="115" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">仮説・手法を事前に公開</text>
  <text x="660" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">OSF.io, AsPredicted.org</text>
  <text x="660" y="165" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">メリット:</text>
  <text x="660" y="183" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・HARKing防止</text>
  <text x="660" y="199" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・p-hacking減少</text>
  <text x="660" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">・ファイル引き出し解消</text>
  <text x="660" y="245" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">推奨: Registered Reports</text>
  <text x="660" y="263" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">結果前に採択決定</text>
  <text x="400" y="382" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">3つのアプローチの組み合わせが最も効果的</text>
</svg>
</div>

- **閾値の引き下げ**: p<0.005 を新基準に (Benjamin et al., 2018)
- **事前登録**: 仮説・分析手法を事前に公開登録
- **Registered Reports**: 結果の前にピアレビュー
- **効果量と信頼区間**: p値だけでなく実質的な意味を報告
- **ベイズ統計**: 事前知識を組み込んだ合理的推論
- **オープンデータ**: データ・コードの公開で検証可能に


---

<!-- _class: invert fit-76 -->
# ASAの歴史的声明 (2016)

> *米統計学会が公式にp値単独判断への依存を否定した*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">統計改革：多層的アプローチ</text>
  <!-- Center: Science Integrity -->
  <circle cx="400" cy="210" r="65" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
  <text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">科学の</text>
  <text x="400" y="225" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">信頼性</text>
  <!-- Surrounding reforms -->
  <!-- Pre-registration -->
  <rect x="30" y="60" width="140" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="85" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">事前登録</text>
  <text x="100" y="103" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">仮説を先に公開</text>
  <line x1="170" y1="115" x2="340" y2="175" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Open Data -->
  <rect x="630" y="60" width="140" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="700" y="85" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">オープンデータ</text>
  <text x="700" y="103" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">再現可能性確保</text>
  <line x1="630" y1="115" x2="460" y2="175" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Registered Reports -->
  <rect x="30" y="285" width="140" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="100" y="310" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Registered</text>
  <text x="100" y="328" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Reports</text>
  <line x1="170" y1="315" x2="340" y2="255" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Effect Size -->
  <rect x="630" y="285" width="140" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="700" y="310" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">効果量 + CI</text>
  <text x="700" y="328" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">実質的意味を報告</text>
  <line x1="630" y1="315" x2="460" y2="255" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Bayesian -->
  <rect x="310" y="330" width="180" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ベイズ統計</text>
  <line x1="400" y1="275" x2="400" y2="330" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
</svg>
</div>

- **アメリカ統計学会**が175年の歴史で初めてp値に公式声明
- 「p値は仮説が真である確率ではない」
- 「p値だけで科学的結論を下すべきでない」
- 「p<0.05を超えたかだけで有意/非有意と二分してはならない」
- 2019年にはさらに踏み込み「統計的有意性を廃止せよ」
- → 科学のあり方を根本から問い直す動き


---

<!-- _class: invert lead -->
# 6. エンジニアへの教訓


---

<!-- _class: invert fit-94 -->
# A/Bテストでの応用（1/2）

> *早期停止・多重比較・サンプルサイズ設計が結果を左右する*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">A/Bテストのp-hackingリスク：途中解析の危険</text>
  <!-- X axis: sample size -->
  <line x1="80" y1="330" x2="740" y2="330" stroke="#ffffff" stroke-width="1"/>
  <!-- Y axis: p-value -->
  <line x1="80" y1="50" x2="80" y2="330" stroke="#ffffff" stroke-width="1"/>
  <text x="400" y="365" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">サンプルサイズ（データ収集中）</text>
  <text x="25" y="200" text-anchor="middle" fill="#aaaaaa" font-size="12" transform="rotate(-90,25,200)" font-family="sans-serif">p値</text>
  <!-- p=0.05 threshold line -->
  <line x1="80" y1="175" x2="740" y2="175" stroke="#e91e63" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="748" y="179" fill="#e91e63" font-size="11" font-family="sans-serif">p=0.05</text>
  <!-- Wandering p-value path -->
  <polyline points="80,300 150,240 200,260 260,180 310,200 370,160 410,190 460,170 510,185 560,165 600,180 650,158 700,168 740,162" fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <!-- Early false positive zone annotation -->
  <rect x="230" y="145" width="130" height="60" rx="6" fill="#e91e63" opacity="0.2" stroke="#e91e63" stroke-width="1"/>
  <text x="295" y="170" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">⚠ 早期に</text>
  <text x="295" y="186" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">p&lt;0.05 → 停止</text>
  <text x="295" y="202" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">= 偽陽性リスク大</text>
  <!-- Correct zone -->
  <text x="650" y="145" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">✓ 事前決定した</text>
  <text x="650" y="161" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">サンプルサイズまで継続</text>
</svg>
</div>

- A/Bテストも本質的に統計的検定 → 同じ罠がある
- **やりがちなミス**:
  - 途中でp<0.05になったら「勝者」と判定
  - 複数のメトリクスを同時測定して有意なものだけ報告


---

# A/Bテストでの応用（2/2）

> *偽陽性を防ぐには検出力80%・α=0.05の事前計算が必須*

  - サンプルサイズを事前に決めない
- **ベストプラクティス**:
  - 事前にサンプルサイズと評価期間を決定
  - 多重比較補正(Bonferroni等)を適用
  - 効果量と実務的意味を重視する


---

<!-- _class: invert fit-76 -->
# まとめ

> *p<0.05は「帰無仮説が間違っている証拠」ではない*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">p値問題：原因・影響・解決策</text>
  <!-- Center -->
  <ellipse cx="400" cy="200" rx="85" ry="45" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="400" y="196" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">再現性の危機</text>
  <text x="400" y="213" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Replication Crisis</text>
  <!-- Causes (left) -->
  <text x="80" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">原因</text>
  <rect x="20" y="100" width="120" height="35" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="80" y="122" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">p-hacking</text>
  <line x1="140" y1="117" x2="315" y2="180" stroke="#e91e63" stroke-width="1.2"/>
  <rect x="20" y="180" width="120" height="35" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="80" y="202" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">出版バイアス</text>
  <line x1="140" y1="197" x2="315" y2="200" stroke="#e91e63" stroke-width="1.2"/>
  <rect x="20" y="260" width="120" height="35" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="80" y="282" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">統計教育不足</text>
  <line x1="140" y1="277" x2="315" y2="220" stroke="#e91e63" stroke-width="1.2"/>
  <!-- Effects (right) -->
  <text x="720" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">影響</text>
  <rect x="660" y="100" width="120" height="35" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="720" y="122" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">科学不信</text>
  <line x1="660" y1="117" x2="485" y2="180" stroke="#e91e63" stroke-width="1.2"/>
  <rect x="660" y="180" width="120" height="35" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="720" y="202" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">280億ドル損失/年</text>
  <line x1="660" y1="197" x2="485" y2="200" stroke="#e91e63" stroke-width="1.2"/>
  <!-- Solutions (bottom) -->
  <text x="400" y="300" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">解決策</text>
  <rect x="240" y="315" width="100" height="35" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="290" y="337" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">事前登録</text>
  <line x1="340" y1="315" x2="375" y2="245" stroke="#f9a825" stroke-width="1.2"/>
  <rect x="350" y="315" width="100" height="35" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="337" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ベイズ統計</text>
  <line x1="400" y1="315" x2="400" y2="245" stroke="#f9a825" stroke-width="1.2"/>
  <rect x="460" y="315" width="100" height="35" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="510" y="337" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Open Data</text>
  <line x1="460" y1="315" x2="425" y2="245" stroke="#f9a825" stroke-width="1.2"/>
</svg>
</div>

- p値は「効果がある確率」ではない — よくある致命的誤解
- 再現性の危機: 科学論文の半数以上が再現不可能な分野も
- 構造的インセンティブの歪みが問題の根本原因
- 事前登録・オープンデータ・ベイズ統計が改革の柱
- エンジニアのA/Bテストにも同じ教訓が当てはまる
- 「統計的に有意」は「正しい」を意味しない


---

<!-- _class: invert fit-64 -->
# 参考文献

> *再現性危機を実証した主要論文と改革提言の参考文献一覧*

- **研究・データ:**
- Open Science Collaboration (2015) "Estimating the reproducibility of psychological science"
- Ioannidis, J.P.A. (2005) "Why Most Published Research Findings Are False"
- **公式声明:**
- ASA Statement on Statistical Significance and P-Values (2016)
- Amrhein, Greenland, McShane (2019) "Retire statistical significance"

