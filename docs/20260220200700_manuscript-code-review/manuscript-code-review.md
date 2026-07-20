---
marp: true
theme: default
size: 16:9
paginate: true
header: "写本文化とコードレビュー"
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
  
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# 写本文化とコードレビュー

- 中世の写字室から学ぶ知識継承の技法
- 1000年前の修道院に、ベストプラクティスがあった


---

# 目次

> *写字室の知恵からコードレビューと知識継承の本質を学ぶ*

- 1. 中世の写字室(Scriptorium)とは
- 2. 写本制作のワークフロー
- 3. コードレビューとの構造的類似
- 4. エラー伝播の問題
- 5. 品質管理の技法
- 6. 知識継承のデザインパターン


---

<!-- _class: lead -->
# 中世の写字室


---

# Scriptorium -- 知識のバージョン管理

![w:900 center](assets/scriptorium.svg)


---

# 写本制作のワークフロー（1/2）

> *写字→校訂→装飾の分業がGitフローの原型*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">写本制作 vs ソフトウェア開発：並行フロー</text>
  <!-- Pipeline stages -->
  
    <!-- Stage 1 -->
    <rect x="50" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="100" y="82" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">原本選定</text>
    <text x="100" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="50" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="100" y="167" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">要件定義</text>
    <text x="100" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    <polygon points="162,87 154,80 154,94" fill="#f9a825" opacity="0.7"/>
    <polygon points="162,172 154,165 154,179" fill="#f9a825" opacity="0.7"/>
    
    <!-- Stage 2 -->
    <rect x="170" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="220" y="82" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">書写</text>
    <text x="220" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="170" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="220" y="167" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">実装</text>
    <text x="220" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    <polygon points="282,87 274,80 274,94" fill="#f9a825" opacity="0.7"/>
    <polygon points="282,172 274,165 274,179" fill="#f9a825" opacity="0.7"/>
    
    <!-- Stage 3 -->
    <rect x="290" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="340" y="82" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">校合</text>
    <text x="340" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="290" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="340" y="167" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">コードレビュー</text>
    <text x="340" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    <polygon points="402,87 394,80 394,94" fill="#e91e63" opacity="0.7"/>
    <polygon points="402,172 394,165 394,179" fill="#e91e63" opacity="0.7"/>
    
    <!-- Stage 4 -->
    <rect x="410" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="460" y="82" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">修正</text>
    <text x="460" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="410" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
    <text x="460" y="167" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">バグ修正</text>
    <text x="460" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    <polygon points="522,87 514,80 514,94" fill="#e91e63" opacity="0.7"/>
    <polygon points="522,172 514,165 514,179" fill="#e91e63" opacity="0.7"/>
    
    <!-- Stage 5 -->
    <rect x="530" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="580" y="82" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">装飾</text>
    <text x="580" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="530" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="580" y="167" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">ドキュメント</text>
    <text x="580" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    <polygon points="642,87 634,80 634,94" fill="#f9a825" opacity="0.7"/>
    <polygon points="642,172 634,165 634,179" fill="#f9a825" opacity="0.7"/>
    
    <!-- Stage 6 -->
    <rect x="650" y="60" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="700" y="82" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">製本</text>
    <text x="700" y="99" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">中世</text>
    <rect x="650" y="145" width="100" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="700" y="167" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">リリース</text>
    <text x="700" y="184" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現代</text>
    
    
  <!-- Horizontal separator -->
  <line x1="40" y1="130" x2="760" y2="130" stroke="#333355" stroke-width="1" stroke-dasharray="6,4"/>
  <text x="20" y="92" fill="#aaaaaa" font-size="9" font-family="sans-serif" transform="rotate(-90,20,92)">中世</text>
  <text x="20" y="178" fill="#aaaaaa" font-size="9" font-family="sans-serif" transform="rotate(-90,20,178)">現代</text>
  <!-- Insight box -->
  <rect x="100" y="235" width="600" height="65" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="262" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">「開発→レビュー→修正→リリース」</text>
  <text x="400" y="285" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">1000年前から変わらない知識生産サイクル</text>
  <!-- Arrow down -->
  <line x1="400" y1="200" x2="400" y2="235" stroke="#e91e63" stroke-width="2"/>
  <polygon points="400,235 393,222 407,222" fill="#e91e63"/>
</svg>
</div>

- **1. 原本の選定**: どのテキストをコピーするか決定
- **2. 書写(Copying)**: 修道士が一字一字手書きで複製
- **3. 校合(Collation)**: 別の修道士が原本と照合
- **4. 修正(Correction)**: 誤りを発見し修正


---

# 写本制作のワークフロー（2/2）

> *段階的レビューが誤り伝播を防いだ先人の知恵*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">写本 → リリース：完成への最終段階</text>
  <!-- Continuation of pipeline: stages 5-6 and key insight -->
  <!-- Stage 5: Illumination -->
  <rect x="60" y="60" width="200" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="160" y="90" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">5. 装飾</text>
  <text x="160" y="110" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">挿絵・装飾文字を追加</text>
  <text x="160" y="130" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">= ドキュメント</text>
  <text x="160" y="148" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">README, チュートリアル</text>
  <text x="160" y="165" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">APIリファレンス</text>
  <!-- Arrow -->
  <polygon points="280,120 265,112 265,128" fill="#f9a825"/>
  <line x1="260" y1="120" x2="300" y2="120" stroke="#f9a825" stroke-width="2"/>
  <!-- Stage 6: Binding -->
  <rect x="300" y="60" width="200" height="120" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">6. 製本</text>
  <text x="400" y="110" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">完成品として仕上げ</text>
  <text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">= リリース</text>
  <text x="400" y="148" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">CI/CDパイプライン</text>
  <text x="400" y="165" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">プロダクション展開</text>
  <!-- Full cycle insight -->
  <rect x="60" y="215" width="680" height="160" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2.5"/>
  <text x="400" y="245" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">「開発→レビュー→修正→ドキュメント→リリース」</text>
  <text x="400" y="272" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">このサイクルは1000年前から変わっていない</text>
  <line x1="100" y1="290" x2="700" y2="290" stroke="#333355" stroke-width="1"/>
  <!-- Modern equivalent -->
  <text x="200" y="320" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">写本文化</text>
  <text x="400" y="320" text-anchor="middle" fill="#555555" font-size="18" font-family="sans-serif">≡</text>
  <text x="600" y="320" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">ソフトウェア開発</text>
  <text x="200" y="348" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">書写→校合→修正→装飾→製本</text>
  <text x="600" y="348" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">実装→レビュー→修正→docs→deploy</text>
</svg>
</div>

- **5. 装飾(Illumination)**: 挿絵や装飾文字を追加
- **6. 製本(Binding)**: 完成品として仕上げ
- これはまさに**開発 → レビュー → 修正 → リリース**のサイクル


---

# 写本 vs ソフトウェア開発

> *写字師の校訂プロセスがコードレビューの原型になっている*

- **写本家(Scribe)** = 開発者: コードを書く
- **校合者(Corrector)** = レビュアー: 品質を検証
- **原本(Exemplar)** = mainブランチ: 正典のソース
- **写本(Copy)** = featureブランチ: 作業コピー
- **注釈(Gloss)** = コメント: コードの意図を補足
- **校合記号(Sigla)** = Lint記号: 問題の分類


---

<!-- _class: lead -->
# エラーの伝播

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">完全対応表：写本 ↔ ソフトウェア開発</text>
  <!-- Header -->
  <rect x="40" y="45" width="340" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="70" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">中世の写字室</text>
  <rect x="420" y="45" width="340" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="590" y="70" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ソフトウェア開発</text>
  <!-- Equals sign -->
  <text x="395" y="73" text-anchor="middle" fill="#ffffff" font-size="18" font-family="sans-serif">=</text>
  <!-- Rows -->
  <rect x="40" y="95" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="115" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">写本家 (Scribe)</text>
    <text x="210" y="131" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">コードを書く</text>
    <rect x="420" y="95" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="121" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">開発者</text>
    <text x="395" y="121" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text><rect x="40" y="143" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="163" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">校合者 (Corrector)</text>
    <text x="210" y="179" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">品質を検証</text>
    <rect x="420" y="143" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="169" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">レビュアー</text>
    <text x="395" y="169" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text><rect x="40" y="191" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="211" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">原本 (Exemplar)</text>
    <text x="210" y="227" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">正典のソース</text>
    <rect x="420" y="191" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="217" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">mainブランチ</text>
    <text x="395" y="217" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text><rect x="40" y="239" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="259" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">写本 (Copy)</text>
    <text x="210" y="275" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">作業コピー</text>
    <rect x="420" y="239" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="265" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">featureブランチ</text>
    <text x="395" y="265" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text><rect x="40" y="287" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="307" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">注釈 (Gloss)</text>
    <text x="210" y="323" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">コードの意図を補足</text>
    <rect x="420" y="287" width="340" height="42" rx="4" fill="#16213e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="313" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">コメント</text>
    <text x="395" y="313" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text><rect x="40" y="335" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="210" y="355" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">校合記号 (Sigla)</text>
    <text x="210" y="371" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">問題の分類</text>
    <rect x="420" y="335" width="340" height="42" rx="4" fill="#1a1a2e" stroke="#333355" stroke-width="1"/>
    <text x="590" y="361" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">Lint記号</text>
    <text x="395" y="361" text-anchor="middle" fill="#555555" font-size="14" font-family="sans-serif">→</text>
</svg>
</div>


---

# エラーはどう広がるか

![w:900 center](assets/error-propagation.svg)


---

# 文献学とバグトラッキング（1/2）

> *異本比較で誤りを特定—変更差分がバグの証跡になる*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Stemma（系統樹）= git log：エラーの系譜を追跡</text>
  <!-- Manuscript stemma left side -->
  <text x="200" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">写本系統樹 (Stemma)</text>
  <!-- Archetype -->
  <rect x="140" y="75" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="100" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Original</text>
  <line x1="170" y1="115" x2="120" y2="155" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="230" y1="115" x2="280" y2="155" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="60" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="120" y="180" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Copy A ✓</text>
  <rect x="220" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="280" y="180" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Copy B ✗err</text>
  <!-- Further copies from B -->
  <line x1="250" y1="195" x2="200" y2="240" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="310" y1="195" x2="330" y2="240" stroke="#e91e63" stroke-width="1.5"/>
  <rect x="140" y="240" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="200" y="265" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Copy B1 ✗</text>
  <rect x="270" y="240" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="330" y="265" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Copy B2 ✗</text>
  <text x="200" y="310" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">エラーが全子孫に伝播</text>
  <!-- Separator -->
  <line x1="410" y1="60" x2="410" y2="370" stroke="#333355" stroke-width="1.5" stroke-dasharray="6,4"/>
  <!-- Git graph right side -->
  <text x="610" y="60" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">git blame + bisect</text>
  <!-- Commits -->
  <circle cx="610" cy="95" r="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="610" y="99" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">init</text>
  <line x1="598" y1="111" x2="555" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="622" y1="111" x2="655" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <circle cx="555" cy="165" r="16" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="555" y="169" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">feat-A</text>
  <circle cx="655" cy="165" r="16" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="655" y="169" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">bug🐛</text>
  <line x1="640" y1="181" x2="620" y2="225" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="670" y1="181" x2="690" y2="225" stroke="#e91e63" stroke-width="1.5"/>
  <circle cx="620" cy="240" r="16" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="620" y="244" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">child1</text>
  <circle cx="690" cy="240" r="16" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="690" y="244" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">child2</text>
  <!-- git bisect annotation -->
  <rect x="440" y="300" width="320" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="600" y="323" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">git bisect</text>
  <text x="600" y="342" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バグ導入コミットを二分探索で特定</text>
  <text x="600" y="356" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">= 文献学者の stemma 分析と同じ</text>
  <text x="400" y="382" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">1000年前の文献学者は最初のgit bisectを行っていた</text>
</svg>
</div>

- **系統樹(Stemma)**: 写本間の派生関係を図示
  - どの写本がどの写本からコピーされたか
  - エラーの起源(archetype)を特定可能
- **git log**: コミット間の派生関係を図示


---

# 文献学とバグトラッキング（2/2）

> *校訂の体系化がデバッグトレースの先祖*

  - どのコミットがどのコミットから派生したか
  - バグの導入コミット(bisect)を特定可能
- **1000年前の文献学者は、最初のgit bisectを行っていた**


---

<!-- _class: lead -->
# 品質管理の技法


---

# 写字室の品質管理

> *多段階レビューと承認フローが品質を保証した構造*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">写字室の品質管理 → 現代コードレビューへ</text>
  <!-- 3 key practices -->
  <!-- 1. Lectio difficilior -->
  <rect x="30" y="55" width="225" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="142" y="83" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Lectio difficilior</text>
  <text x="142" y="100" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">難解な読みを優先</text>
  <line x1="50" y1="115" x2="235" y2="115" stroke="#333355" stroke-width="1"/>
  <text x="142" y="140" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">簡単に「修正」された方が</text>
  <text x="142" y="158" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">誤りの可能性が高い</text>
  <rect x="50" y="178" width="185" height="55" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="142" y="202" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→「なぜこう書いたか」</text>
  <text x="142" y="220" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">を確認するレビュー</text>
  <text x="142" y="280" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">奇妙なコードにも</text>
  <text x="142" y="296" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">意図がある可能性</text>
  <!-- 2. Multiple attestation -->
  <rect x="287" y="55" width="226" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Multiple Attestation</text>
  <text x="400" y="100" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">複数の独立確認</text>
  <line x1="307" y1="115" x2="493" y2="115" stroke="#333355" stroke-width="1"/>
  <text x="400" y="140" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">複数写本での確認が</text>
  <text x="400" y="158" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">テキストの正確性を保証</text>
  <rect x="307" y="178" width="185" height="55" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="202" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ 複数レビュアーによる</text>
  <text x="400" y="220" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">クロスチェック</text>
  <text x="400" y="280" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">1人のLGTMより</text>
  <text x="400" y="296" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">2人のレビューが信頼性向上</text>
  <!-- 3. Conjectural emendation -->
  <rect x="545" y="55" width="225" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="657" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">Conjectural Emend.</text>
  <text x="657" y="100" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">推測による修正</text>
  <line x1="565" y1="115" x2="750" y2="115" stroke="#333355" stroke-width="1"/>
  <text x="657" y="140" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">原本なしに意図を推測して</text>
  <text x="657" y="158" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">テキストを修正する手法</text>
  <rect x="565" y="178" width="185" height="55" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="657" y="202" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">→ レガシーコードの</text>
  <text x="657" y="220" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">意図推測+リファクタ</text>
  <text x="657" y="280" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">ADRで防止:</text>
  <text x="657" y="296" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">「なぜそう決めたか」を記録</text>
</svg>
</div>

- **Lectio difficilior**: 難解な読みを優先する原則
  - 簡単に「修正」された方が誤りの可能性が高い
  - → コードレビューで「なぜこう書いたか」を聞く姿勢
- **Multiple attestation**: 複数の独立した写本で確認
  - → 複数レビュアーによるクロスチェック
- **Conjectural emendation**: 原本なしに修正を推測
  - → レガシーコードの意図推測とリファクタリング


---

# 現代のコードレビューへの教訓（1/2）

> *写本師の原則—レビューは欠陥発見でなく品質向上*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">写字室の品質管理原則 → 現代のコードレビュー</text>
  <!-- 3 principles as columns -->
  <!-- Column 1: Lectio difficilior -->
  <rect x="30" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="145" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Lectio difficilior</text>
  <text x="145" y="98" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">難解な読みを優先</text>
  <line x1="55" y1="110" x2="235" y2="110" stroke="#333355" stroke-width="1"/>
  <text x="145" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">簡単に「修正」された方が</text>
  <text x="145" y="152" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">誤りの可能性が高い</text>
  <text x="145" y="195" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">↓ 現代での意味</text>
  <rect x="50" y="210" width="190" height="50" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="145" y="232" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">「なぜこう書いたか」を</text>
  <text x="145" y="249" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">まず聞くレビュー姿勢</text>
  <text x="145" y="310" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">奇妙なコードが正しいことも</text>
  <text x="145" y="327" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">制約・意図を確認する</text>

  <!-- Column 2: Multiple attestation -->
  <rect x="285" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Multiple Attestation</text>
  <text x="400" y="98" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">複数の独立した確認</text>
  <line x1="305" y1="110" x2="495" y2="110" stroke="#333355" stroke-width="1"/>
  <text x="400" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">複数の独立した写本で</text>
  <text x="400" y="152" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">テキストを確認する</text>
  <text x="400" y="195" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">↓ 現代での意味</text>
  <rect x="305" y="210" width="190" height="50" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="232" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">複数レビュアーによる</text>
  <text x="400" y="249" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">クロスチェック</text>
  <text x="400" y="310" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">1人のLGTMより</text>
  <text x="400" y="327" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">2人のレビューが信頼性向上</text>

  <!-- Column 3: Conjectural emendation -->
  <rect x="540" y="50" width="230" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="655" y="80" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">Conjectural Emendation</text>
  <text x="655" y="98" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">推測による修正</text>
  <line x1="560" y1="110" x2="750" y2="110" stroke="#333355" stroke-width="1"/>
  <text x="655" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">原本なしに意図を推測して</text>
  <text x="655" y="152" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">テキストを修正する</text>
  <text x="655" y="195" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">↓ 現代での意味</text>
  <rect x="560" y="210" width="190" height="50" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="655" y="232" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">レガシーコードの意図推測</text>
  <text x="655" y="249" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">+ リファクタリング</text>
  <text x="655" y="310" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">ADR（Architecture</text>
  <text x="655" y="327" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Decision Records）で防止</text>
</svg>
</div>

- **校合は書写と同じくらい重要だった**
  - レビューに十分な時間を割く文化
- **専門的な校合者が存在した**
  - シニアエンジニアのレビュー役割の正当化


---

# 現代のコードレビューへの教訓（2/2）

> *小さな変更を頻繁にレビューすることで誤り伝播を止める*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">現代コードレビュー文化：写本から学ぶ4つの実践</text>
  <!-- 4 practices grid -->
  
    <rect x="30" y="55" width="360" height="145" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="210" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">校合は書写と同じくらい重要</text>
    <line x1="50" y1="97" x2="370" y2="97" stroke="#333355" stroke-width="1"/>
    <text x="210" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">写本文化の実践</text>
    <text x="210" y="150" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ レビューに十分な時間を割く文化</text>
    <rect x="410" y="55" width="360" height="145" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="590" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">専門的な校合者が存在した</text>
    <line x1="430" y1="97" x2="750" y2="97" stroke="#333355" stroke-width="1"/>
    <text x="590" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">写本文化の実践</text>
    <text x="590" y="150" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ シニアエンジニアのレビュー役割</text>
    <rect x="30" y="215" width="360" height="145" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="210" y="245" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">校合記号による標準化</text>
    <line x1="50" y1="257" x2="370" y2="257" stroke="#333355" stroke-width="1"/>
    <text x="210" y="280" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">写本文化の実践</text>
    <text x="210" y="310" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ Lint・静的解析・CI/CDの自動化</text>
    <rect x="410" y="215" width="360" height="145" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="590" y="245" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">原本の権威を尊重する</text>
    <line x1="430" y1="257" x2="750" y2="257" stroke="#333355" stroke-width="1"/>
    <text x="590" y="280" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">写本文化の実践</text>
    <text x="590" y="310" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ mainブランチの品質を守る文化</text>
  <text x="400" y="382" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">1000年の知恵がコードレビューのベストプラクティスに凝縮されている</text>
</svg>
</div>

- **校合記号による標準化**
  - Lint、静的解析、CI/CDの自動チェック
- **原本の権威を尊重する**
  - mainブランチの品質を守る文化


---

<!-- _class: lead -->
# 知識継承のデザインパターン


---

# なぜ知識は失われるのか

> *属人化・口伝依存・記録不在—3つが知識消滅の原因*

- **写本の場合**: 火災、戦争、虫害、劣化
  - ローマ帝国崩壊で古典文献の90%以上が失われた
- **ソフトウェアの場合**: 退職、ドキュメント不足、技術的負債
  - 平均的な開発者の在籍期間は2-3年
  - 暗黙知(oral tradition)が失われる
- **書かれなかった知識は、必ず失われる**


---

# 修道院が守った知識継承の仕組み（1/2）

> *写本・教育・共同体—3要素が1000年の継承を実現した*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">知識消失のパターン：写本 vs ソフトウェア</text>
  <!-- Left: manuscript losses -->
  <rect x="30" y="50" width="340" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="200" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">写本が失われた原因</text>
  <rect x="50" y="95" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="200" y="111" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">火災・戦争</text>
    <text x="200" y="127" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">アレクサンドリア図書館焼失</text><rect x="50" y="145" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="200" y="161" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">虫害・湿気</text>
    <text x="200" y="177" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">羊皮紙の物理的劣化</text><rect x="50" y="195" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="200" y="211" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">教会の検閲</text>
    <text x="200" y="227" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">異端とみなされた文書</text><rect x="50" y="245" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="200" y="261" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">複写の途絶</text>
    <text x="200" y="277" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">コピーする人がいなくなる</text><rect x="50" y="295" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
    <text x="200" y="311" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">言語の死滅</text>
    <text x="200" y="327" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">読める人がいなくなる</text>

  <!-- Right: software losses -->
  <rect x="430" y="50" width="340" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="600" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">コードが失われる原因</text>
  <rect x="450" y="95" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="600" y="111" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">退職・離職</text>
    <text x="600" y="127" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">知識が人の頭の中にある</text><rect x="450" y="145" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="600" y="161" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">ドキュメント不足</text>
    <text x="600" y="177" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">なぜそう実装したか不明</text><rect x="450" y="195" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="600" y="211" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">技術的負債</text>
    <text x="600" y="227" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">触れると壊れる「呪い」のコード</text><rect x="450" y="245" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="600" y="261" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">依存関係の消滅</text>
    <text x="600" y="277" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">npmパッケージが非公開化</text><rect x="450" y="295" width="300" height="40" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
    <text x="600" y="311" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">組織の解散</text>
    <text x="600" y="327" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">プロジェクトのコンテキスト消失</text>
  <!-- Bottom insight -->
  <text x="400" y="378" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">「書かれなかった知識は、必ず失われる」</text>
</svg>
</div>

- **冗長性**: 同じテキストを複数箇所でコピー
  - → GitHubのフォーク、ミラーリング
- **標準化**: 書体(script)と略語の統一
  - → コーディング規約、Linter設定


---

# 修道院が守った知識継承の仕組み（2/2）

> *Pairプログラミングの原型は写字室の師弟関係にある*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">知識継承の4つのメカニズム</text>
  <!-- 2x2 grid -->
  <!-- Top left: Redundancy -->
  <rect x="30" y="50" width="360" height="150" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">冗長性 (Redundancy)</text>
  <text x="210" y="103" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">同じテキストを複数箇所でコピー</text>
  <text x="210" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ GitHubフォーク・ミラーリング</text>
  <text x="210" y="150" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「1箇所が失われても他が残る」</text>
  <!-- Top right: Standardization -->
  <rect x="410" y="50" width="360" height="150" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">標準化 (Standardization)</text>
  <text x="590" y="103" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">書体・略語の統一</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ コーディング規約・Linter</text>
  <text x="590" y="150" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「誰でも読める形式を保つ」</text>
  <!-- Bottom left: Annotation culture -->
  <rect x="30" y="220" width="360" height="150" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="250" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">注釈文化 (Annotation)</text>
  <text x="210" y="273" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">余白に解説を書き込む</text>
  <text x="210" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ コメント・ADR</text>
  <text x="210" y="320" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「なぜその選択をしたか」を残す</text>
  <!-- Bottom right: Apprenticeship -->
  <rect x="410" y="220" width="360" height="150" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="590" y="250" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">師弟制度 (Mentoring)</text>
  <text x="590" y="273" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">ベテランが新人に直接伝授</text>
  <text x="590" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ ペアプロ・メンタリング</text>
  <text x="590" y="320" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「暗黙知を形式知に転換する」</text>
</svg>
</div>

- **注釈文化**: 余白に解説を書き込む
  - → コメント、ADR(Architecture Decision Records)
- **師弟制度**: ベテランが新人に技術を直接伝授
  - → ペアプログラミング、メンタリング


---

# まとめ

> *写本文化の教訓—レビュー文化が組織の技術を生き残らせる*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">知識継承の鎖：写字室からGitHubまで</text>
  <!-- Chain visualization -->
  <!-- Node 1: Ancient Rome -->
  <ellipse cx="100" cy="200" rx="70" ry="50" fill="#16213e" stroke="#555555" stroke-width="2"/>
  <text x="100" y="195" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">古代ローマ</text>
  <text x="100" y="212" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">写本・パピルス</text>
  <!-- Chain links -->
  <line x1="170" y1="200" x2="210" y2="200" stroke="#f9a825" stroke-width="3"/>
  <circle cx="190" cy="200" r="5" fill="#f9a825"/>
  <!-- Node 2: Medieval monastery -->
  <ellipse cx="270" cy="200" rx="70" ry="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="270" y="195" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">中世修道院</text>
  <text x="270" y="212" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">写字室・校合</text>
  <!-- Chain links -->
  <line x1="340" y1="200" x2="380" y2="200" stroke="#f9a825" stroke-width="3"/>
  <circle cx="360" cy="200" r="5" fill="#f9a825"/>
  <!-- Node 3: Gutenberg -->
  <ellipse cx="440" cy="200" rx="70" ry="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="440" y="195" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">グーテンベルク</text>
  <text x="440" y="212" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">活版印刷・複製</text>
  <!-- Chain links -->
  <line x1="510" y1="200" x2="550" y2="200" stroke="#e91e63" stroke-width="3"/>
  <circle cx="530" cy="200" r="5" fill="#e91e63"/>
  <!-- Node 4: GitHub -->
  <ellipse cx="620" cy="200" rx="80" ry="55" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="620" y="192" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">GitHub/Git</text>
  <text x="620" y="210" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">コードレビュー</text>
  <text x="620" y="228" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バージョン管理</text>
  <!-- Loss event -->
  <rect x="140" y="290" width="100" height="50" rx="6" fill="#e91e63" opacity="0.3" stroke="#e91e63" stroke-width="1"/>
  <text x="190" y="315" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">ローマ崩壊</text>
  <text x="190" y="330" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">90%消失</text>
  <line x1="190" y1="290" x2="190" y2="250" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Key insight -->
  <rect x="80" y="320" width="640" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="345" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">「我々は巨人の肩の上に立っている」</text>
  <text x="400" y="368" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">修道士たちが守った知識の上に、私たちのコードは成り立っている</text>
</svg>
</div>

- 1000年前の写字室にコードレビューの原型があった
- エラー伝播の問題と解決法は驚くほど共通している
- 品質管理には「制度」と「文化」の両方が必要
- 知識継承は意図的に設計しなければ失われる
- **「我々は巨人の肩の上に立っている」-- 修道士たちが守った知識の上に。**


---

# 参考文献

> *写本文化・コードレビュー実践の一次資料を網羅*

- **History:**
- [The Book: A Cover-to-Cover Exploration - Jessica Helfand (2019)](https://yalebooks.yale.edu/book/9780300226652/the-book/)
- [Textual Criticism - Wikipedia](https://en.wikipedia.org/wiki/Textual_criticism)
- **Software Engineering:**
- [Best Practices for Code Review - SmartBear](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)
- [Architecture Decision Records](https://adr.github.io/)

