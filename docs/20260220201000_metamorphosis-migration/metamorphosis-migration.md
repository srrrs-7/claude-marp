---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Metamorphosis × Migration"
footer: "© 2026 Software Metamorphosis"
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
# 完全変態：昆虫のメタモルフォーゼに学ぶソフトウェアマイグレーション

- Metamorphosis × Software Migration
- 蛹の中で全てが溶解し再構築される — それはリプレースと同じ


---

# Agenda

> *変態の6ステージでレガシーマイグレーション戦略を体系化*

- 1. 完全変態とは何か
- 2. 4ステージモデル：卵→幼虫→蛹→成虫
- 3. Imaginal Discs パターン
- 4. 不完全変態 vs 完全変態 vs 過変態
- 5. マイグレーション戦略の選択基準
- 6. 実践：変態を成功させるための教訓


---

<!-- _class: invert lead -->
# 完全変態とは何か

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">完全変態の4ステージ vs ソフトウェアマイグレーション</text>
  <!-- Biological stages top -->
  <text x="400" y="58" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">生物学的変態</text>
  <rect x="60" y="70" width="145" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="132" y="92" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">卵</text><text x="132" y="110" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="normal" font-family="sans-serif">Egg</text>
    <text x="132" y="128" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">潜在能力を</text><text x="132" y="142" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">秘めた原始状態</text>
    <polygon points="205,112 218,106 218,118" fill="#f9a825"/><rect x="235" y="70" width="145" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="307" y="92" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">幼虫</text><text x="307" y="110" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="normal" font-family="sans-serif">Larva</text>
    <text x="307" y="128" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">現行システム</text><text x="307" y="142" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">機能はするが重い</text>
    <polygon points="380,112 393,106 393,118" fill="#f9a825"/><rect x="410" y="70" width="145" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="482" y="92" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">蛹</text><text x="482" y="110" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="normal" font-family="sans-serif">Pupa</text>
    <text x="482" y="128" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">移行期</text><text x="482" y="142" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">外からは不活発に見える</text>
    <polygon points="555,112 568,106 568,118" fill="#f9a825"/><rect x="585" y="70" width="145" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="657" y="92" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">成虫</text><text x="657" y="110" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="normal" font-family="sans-serif">Adult</text>
    <text x="657" y="128" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">新システム</text><text x="657" y="142" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">完全な能力を発揮</text>
    
  <!-- Software stages bottom -->
  <text x="400" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">ソフトウェア対応</text>
  <rect x="60" y="210" width="145" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="132" y="232" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">現状分析</text><text x="132" y="250" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="normal" font-family="sans-serif">Assessment</text>
    <text x="132" y="268" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">依存関係マップ</text><text x="132" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">トラフィック計測</text>
    <polygon points="205,252 218,246 218,258" fill="#e91e63"/><rect x="235" y="210" width="145" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="307" y="232" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">並行稼働</text><text x="307" y="250" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="normal" font-family="sans-serif">Strangler</text>
    <text x="307" y="268" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">旧新システムが</text><text x="307" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">共存する過渡期</text>
    <polygon points="380,252 393,246 393,258" fill="#e91e63"/><rect x="410" y="210" width="145" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="482" y="232" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">カットオーバー</text><text x="482" y="250" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="normal" font-family="sans-serif">Cutover</text>
    <text x="482" y="268" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">Imaginal Discsで</text><text x="482" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">段階的移行</text>
    <polygon points="555,252 568,246 568,258" fill="#e91e63"/><rect x="585" y="210" width="145" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="657" y="232" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">新システム</text><text x="657" y="250" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="normal" font-family="sans-serif">Modern</text>
    <text x="657" y="268" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">スケーラブルで</text><text x="657" y="282" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">保守性が高い</text>
    
  <!-- Mapping lines -->
  <line x1="132" y1="155" x2="132" y2="210" stroke="#555577" stroke-width="1" stroke-dasharray="4,3"/><line x1="307" y1="155" x2="307" y2="210" stroke="#555577" stroke-width="1" stroke-dasharray="4,3"/><line x1="482" y1="155" x2="482" y2="210" stroke="#555577" stroke-width="1" stroke-dasharray="4,3"/><line x1="657" y1="155" x2="657" y2="210" stroke="#555577" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="400" y="335" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">自然界の4億年の試行錯誤がマイグレーション戦略を教える</text>
</svg>
</div>

- Chapter 1: What is Complete Metamorphosis?


---

# 完全変態（Holometaboly）の驚異

> *蛹の内部は溶解し再構成—破壊なき移行は存在しない*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">完全変態（Holometaboly）：3億年の進化的成功</text>
  <!-- Pie chart: 80% complete metamorphosis -->
  <circle cx="200" cy="220" r="120" fill="#16213e"/>
  <!-- 80% arc: 0.8 * 2*pi = 4.52 rad. Start at top (-pi/2), go clockwise -->
  <!-- SVG arc: large-arc-flag=1 for > 180 deg = 0.8 = 288 degrees > 180 so flag=1 -->
  <!-- End point at 288 deg from top: x=200+120*sin(288*pi/180), y=220-120*cos(288*pi/180) -->
  <!-- 288 deg = -72 deg from top. sin(-72)=-0.951, cos(-72)=0.309 -->
  <path d="M200,100 A120,120 0 1,1 185.9,332.8 Z" fill="#f9a825" opacity="0.85"/>
  <path d="M200,100 A120,120 0 0,0 185.9,332.8 Z" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="200" y="200" text-anchor="middle" fill="#1a1a2e" font-size="28" font-weight="bold" font-family="sans-serif">80%</text>
  <text x="200" y="225" text-anchor="middle" fill="#1a1a2e" font-size="12" font-family="sans-serif">完全変態</text>
  <text x="200" y="348" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">昆虫全種の80%が完全変態</text>
  <!-- Examples on right -->
  <text x="520" y="60" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">完全変態する昆虫</text>
  <rect x="380" y="85" width="380" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="570" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">甲虫 (Coleoptera)</text>
    <text x="570" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">最大の目：40万種以上</text><rect x="380" y="147" width="380" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="570" y="169" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">蝶・蛾 (Lepidoptera)</text>
    <text x="570" y="187" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">幼虫→蛹→成虫の完全変容</text><rect x="380" y="209" width="380" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="570" y="231" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">蜂・蟻 (Hymenoptera)</text>
    <text x="570" y="249" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">社会性昆虫の多くが含まれる</text><rect x="380" y="271" width="380" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
    <text x="570" y="293" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">蠅 (Diptera)</text>
    <text x="570" y="311" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">病原体媒介〜農業害虫まで</text>
  <text x="570" y="350" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">「一度壊して再構築」は3億年の実績ある戦略</text>
</svg>
</div>

- 昆虫の約 **80%** が完全変態を行う（甲虫、蝶、蜂、蠅）
- 幼虫と成虫は **形態も機能も完全に異なる** 生物
- 蛹の中で幼虫の組織は **一度完全に溶解** する
- 溶解した細胞から **全く新しい体** が再構築される
- この過程は約 **3億年前** に進化した
- 進化的成功：完全変態する昆虫は種数で最大グループ

<!--
完全変態は進化的に極めて成功した戦略。ソフトウェアマイグレーションでも「一度壊して再構築」は時に最善策となる。
-->

---

# 4ステージモデル × マイグレーションフェーズ

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert lead -->
# 4ステージモデル

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">4ステージの詳細：リスクと期間</text>
  <!-- Stage blocks with risk indicators -->
  <rect x="20" y="55" width="178" height="200" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="109" y="76" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="normal" font-family="sans-serif">Stage 1</text><text x="109" y="93" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">卵 (Egg)</text>
    <text x="35" y="120" fill="#aaaaaa" font-size="9" font-family="sans-serif">・現状システムの詳細分析</text><text x="35" y="138" fill="#aaaaaa" font-size="9" font-family="sans-serif">・依存グラフ作成</text><text x="35" y="156" fill="#aaaaaa" font-size="9" font-family="sans-serif">・移行可能性評価</text>
    <text x="109" y="225" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">期間: 2-4週</text>
    <!-- Risk bar -->
    <rect x="40" y="275" width="138" height="12" rx="3" fill="#333355"/>
    <rect x="40" y="275" width="14" height="12" rx="3" fill="#f9a825" opacity="0.8"/>
    <text x="109" y="302" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">リスク: 10%</text><rect x="212" y="55" width="178" height="200" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="301" y="76" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="normal" font-family="sans-serif">Stage 2</text><text x="301" y="93" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">幼虫 (Larva)</text>
    <text x="227" y="120" fill="#aaaaaa" font-size="9" font-family="sans-serif">・機能フリーズ</text><text x="227" y="138" fill="#aaaaaa" font-size="9" font-family="sans-serif">・テストカバレッジ向上</text><text x="227" y="156" fill="#aaaaaa" font-size="9" font-family="sans-serif">・Strangler起動</text>
    <text x="301" y="225" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">期間: 数ヶ月</text>
    <!-- Risk bar -->
    <rect x="232" y="275" width="138" height="12" rx="3" fill="#333355"/>
    <rect x="232" y="275" width="48" height="12" rx="3" fill="#f9a825" opacity="0.8"/>
    <text x="301" y="302" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">リスク: 35%</text><rect x="404" y="55" width="178" height="200" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="493" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="normal" font-family="sans-serif">Stage 3</text><text x="493" y="93" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">蛹 (Pupa)</text>
    <text x="419" y="120" fill="#aaaaaa" font-size="9" font-family="sans-serif">・Imaginal Discs稼働</text><text x="419" y="138" fill="#aaaaaa" font-size="9" font-family="sans-serif">・トラフィック段階移行</text><text x="419" y="156" fill="#aaaaaa" font-size="9" font-family="sans-serif">・旧依存の切断</text>
    <text x="493" y="225" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">期間: 2-6ヶ月</text>
    <!-- Risk bar -->
    <rect x="424" y="275" width="138" height="12" rx="3" fill="#333355"/>
    <rect x="424" y="275" width="110" height="12" rx="3" fill="#e91e63" opacity="0.8"/>
    <text x="493" y="302" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">リスク: 80%</text><rect x="596" y="55" width="178" height="200" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="685" y="76" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="normal" font-family="sans-serif">Stage 4</text><text x="685" y="93" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">成虫 (Adult)</text>
    <text x="611" y="120" fill="#aaaaaa" font-size="9" font-family="sans-serif">・旧システム廃止</text><text x="611" y="138" fill="#aaaaaa" font-size="9" font-family="sans-serif">・新機能開発再開</text><text x="611" y="156" fill="#aaaaaa" font-size="9" font-family="sans-serif">・安定稼働確認</text>
    <text x="685" y="225" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">期間: 1-2ヶ月</text>
    <!-- Risk bar -->
    <rect x="616" y="275" width="138" height="12" rx="3" fill="#333355"/>
    <rect x="616" y="275" width="28" height="12" rx="3" fill="#f9a825" opacity="0.8"/>
    <text x="685" y="302" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">リスク: 20%</text>
  <text x="400" y="365" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">蛹期（Stage 3）が最も高リスク — Imaginal Discsパターンで軽減</text>
</svg>
</div>

- Chapter 2: The Four Stages


---

# Stage 1 - 卵（Egg）= 計画フェーズ

> *設計書・ADR・リスク評価が変態成功の全ての源*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Stage 1: 卵（Egg）= 計画フェーズ</text>
  <!-- Egg visual -->
  <ellipse cx="200" cy="210" rx="100" ry="130" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
  <text x="200" y="195" text-anchor="middle" fill="#f9a825" font-size="40" font-family="sans-serif">🥚</text>
  <text x="200" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">全情報格納</text>
  <text x="200" y="260" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">DNA = 設計図</text>
  <!-- Insight bars on right -->
  <text x="530" y="65" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">計画フェーズの投資対効果</text>
  <!-- Bar: Planning 20-30% time -->
  <rect x="370" y="90" width="320" height="45" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="378" y="97" width="200" height="31" rx="4" fill="#f9a825" opacity="0.6"/>
  <text x="690" y="118" text-anchor="end" fill="#ffffff" font-size="11" font-family="sans-serif">20-30%の工数</text>
  <text x="378" y="118" fill="#1a1a2e" font-size="10" font-family="sans-serif">計画に投資</text>
  <!-- Bar: Bug fix cost 100x -->
  <rect x="370" y="150" width="320" height="45" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <rect x="378" y="157" width="288" height="31" rx="4" fill="#e91e63" opacity="0.5"/>
  <text x="690" y="178" text-anchor="end" fill="#ffffff" font-size="11" font-family="sans-serif">本番修正は100倍コスト</text>
  <!-- ROI principle -->
  <rect x="360" y="220" width="380" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="550" y="250" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">卵の品質 = 全段階を決定</text>
  <text x="550" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">不健全な卵 → 幼虫が育たない</text>
  <text x="550" y="298" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">= 曖昧な要件 → 実装が迷走</text>
  <text x="550" y="328" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">「投資対効果が最も高いフェーズ」</text>
</svg>
</div>

- 卵の中に **全ての遺伝情報** が格納されている
- ソフトウェア: 要件定義、アーキテクチャ設計、技術選定
- この段階の品質が後の全段階を決定する
- 卵が不健全 → 幼虫が育たない = 要件が曖昧 → 実装が迷走
- **投資対効果が最も高い** フェーズ
- 計画に全体工数の **20-30%** を割くべき


---

# Stage 2 - 幼虫（Larva）= 実装フェーズ

> *旧システム並行稼働で機能を段階的に移植する*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Stage 2: 幼虫（Larva）= 実装フェーズ</text>
  <!-- Caterpillar body segments -->
  <text x="400" y="60" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">幼虫（イモムシ）は成虫（蝶）と全く異なる形態 — 初期コードも最終形態と違っていい</text>
  <!-- Growth stages: Instar 1 to 5 -->
  <ellipse cx="110" cy="180" rx="20" ry="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <circle cx="125" cy="175" r="6" fill="#f9a825"/>
    <text x="110" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Instar 1</text>
    <text x="110" y="237" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">脱皮0</text>
    <line x1="133" y1="180" x2="218" y2="180" stroke="#555555" stroke-width="1.5" stroke-dasharray="4,3"/><ellipse cx="250" cy="180" rx="32" ry="19.2" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <circle cx="277" cy="175" r="6" fill="#f9a825"/>
    <text x="250" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Instar 2</text>
    <text x="250" y="237" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">脱皮1</text>
    <line x1="285" y1="180" x2="346" y2="180" stroke="#555555" stroke-width="1.5" stroke-dasharray="4,3"/><ellipse cx="390" cy="180" rx="44" ry="26.4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <circle cx="429" cy="175" r="6" fill="#f9a825"/>
    <text x="390" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Instar 3</text>
    <text x="390" y="237" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">脱皮2</text>
    <line x1="437" y1="180" x2="474" y2="180" stroke="#555555" stroke-width="1.5" stroke-dasharray="4,3"/><ellipse cx="530" cy="180" rx="56" ry="33.6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <circle cx="581" cy="175" r="6" fill="#f9a825"/>
    <text x="530" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Instar 4</text>
    <text x="530" y="237" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">脱皮3</text>
    <line x1="589" y1="180" x2="602" y2="180" stroke="#555555" stroke-width="1.5" stroke-dasharray="4,3"/><ellipse cx="670" cy="180" rx="68" ry="40.8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <circle cx="733" cy="175" r="6" fill="#f9a825"/>
    <text x="670" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Instar 5</text>
    <text x="670" y="237" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">脱皮4</text>
    
  <!-- Technical debt annotation -->
  <rect x="30" y="260" width="360" height="110" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="285" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">技術的負債 = 変態のエネルギー源</text>
  <text x="210" y="308" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">幼虫が蓄えた脂肪 → 蛹の変態に使用</text>
  <text x="210" y="328" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">技術的負債 → リファクタリングのエネルギー</text>
  <text x="210" y="348" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「負債は悪ではない — 戦略的に蓄える」</text>
  <rect x="410" y="260" width="360" height="110" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="590" y="285" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">脱皮 = リファクタリング</text>
  <text x="590" y="308" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">幼虫は脱皮（Molting）を繰り返す</text>
  <text x="590" y="328" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">= スプリントごとのコード改善</text>
  <text x="590" y="348" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「成長しながら形を変えていく」</text>
</svg>
</div>

- 幼虫の目的はただひとつ：**食べて成長する**
- ソフトウェア: 機能を貪欲に構築、MVP → プロダクトへ
- 幼虫は成虫と全く違う形態（イモムシ ≠ 蝶）
- 初期コードは最終形態と大きく異なっていてよい
- 技術的負債 = 幼虫が蓄えた脂肪（変態のエネルギー源）
- 脱皮（リファクタリング）を繰り返しながら成長


---

# Stage 3 - 蛹（Pupa）= 変態フェーズ

> *Blue-Greenで瞬時に切り替え—蛹の中で新システムが完成する*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Stage 3: 蛹（Pupa）= 変態フェーズ【最大リスク】</text>
  <!-- Pupa visual -->
  <ellipse cx="170" cy="210" rx="70" ry="110" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <!-- Internal dissolving visualization -->
  <circle cx="218.0932052436846" cy="210" r="6" fill="#e91e63" opacity="0.4"/><circle cx="194.0662668840102" cy="229.25301350720815" r="6" fill="#e91e63" opacity="0.4"/><circle cx="170" cy="247.79401453836687" r="6" fill="#e91e63" opacity="0.4"/><circle cx="141.52288191664093" cy="232.78169446668727" r="6" fill="#e91e63" opacity="0.4"/><circle cx="139.59590422922537" cy="210" r="6" fill="#e91e63" opacity="0.4"/><circle cx="136.0003519946787" cy="182.80028159574297" r="6" fill="#e91e63" opacity="0.4"/><circle cx="170" cy="174.1266554876949" r="6" fill="#e91e63" opacity="0.4"/><circle cx="204.0672873421065" cy="182.74617012631478" r="6" fill="#e91e63" opacity="0.4"/>
  <text x="170" y="205" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">内部で</text>
  <text x="170" y="222" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">全溶解中</text>
  <!-- Outside: appears static -->
  <rect x="80" y="330" width="180" height="35" rx="6" fill="#1a1a2e" stroke="#555555" stroke-width="1"/>
  <text x="170" y="352" text-anchor="middle" fill="#555555" font-size="11" font-family="sans-serif">外からは静止して見える</text>
  <!-- Right: risk analysis -->
  <rect x="290" y="55" width="470" height="95" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="525" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">最もリスクが高いフェーズ</text>
  <text x="525" y="103" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">中断すると死ぬ — コミットした以上は完遂が必須</text>
  <text x="525" y="123" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">外部干渉（組織変更・予算削減）を最小化する必要</text>
  <!-- Stakeholder view vs reality -->
  <rect x="290" y="170" width="210" height="100" rx="8" fill="#16213e" stroke="#555555" stroke-width="1.5"/>
  <text x="395" y="195" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">ステークホルダー視点</text>
  <text x="395" y="220" text-anchor="middle" fill="#555555" font-size="18" font-family="sans-serif">「停止中？」</text>
  <text x="395" y="255" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「何も動いていない...」</text>
  <text x="510" y="220" text-anchor="middle" fill="#ffffff" font-size="20" font-family="sans-serif">≠</text>
  <rect x="530" y="170" width="230" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="645" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">実際の内部状態</text>
  <text x="645" y="220" text-anchor="middle" fill="#f9a825" font-size="18" font-family="sans-serif">「激変中!」</text>
  <text x="645" y="255" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">全コンポーネントを再構築中</text>
  <!-- Arrow between -->
  <rect x="290" y="295" width="470" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="525" y="325" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">コミュニケーション戦略が重要</text>
  <text x="525" y="348" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">進捗の可視化 + ステークホルダーの期待管理</text>
  <text x="525" y="365" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">「静止」と「停止」を区別して伝える</text>
</svg>
</div>

- 蛹の中で **全ての組織が溶解** し、再構築される
- **外からは静止して見える** が、内部は激変の最中
- ソフトウェア: 大規模リファクタリング / マイグレーション期間
- ステークホルダーには「何も動いていない」ように見える
- **最もリスクが高い** フェーズ — 中断すると死ぬ
- 完了まで外部干渉を最小化する必要がある

<!--
蛹の段階を途中でやめることはできない。マイグレーションも同様。コミットした以上は完遂が必須。
-->

---

# Stage 4 - 成虫（Adult）= 新システム稼働

> *旧システム廃止はカットオーバーではなく段階的退役*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Stage 4: 成虫（Adult）= 新システム稼働</text>
  <!-- Go-live timeline -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#16213e" stroke-width="6" rx="3"/>
  <!-- Pre go-live -->
  <rect x="60" y="65" width="180" height="115" rx="8" fill="#16213e" stroke="#555555" stroke-width="1.5"/>
  <text x="150" y="90" text-anchor="middle" fill="#aaaaaa" font-size="12" font-family="sans-serif">蛹期間</text>
  <text x="150" y="112" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">マイグレーション中</text>
  <text x="150" y="130" text-anchor="middle" fill="#555555" font-size="10" font-family="sans-serif">旧システム稼働継続</text>
  <text x="150" y="150" text-anchor="middle" fill="#555555" font-size="10" font-family="sans-serif">新システム構築中</text>
  <line x1="150" y1="180" x2="150" y2="200" stroke="#555555" stroke-width="2"/>
  <!-- Eclosion point -->
  <circle cx="300" cy="200" r="20" fill="#e91e63" stroke="#ffffff" stroke-width="2"/>
  <text x="300" y="182" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">羽化</text>
  <text x="300" y="162" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">Eclosion</text>
  <text x="300" y="235" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">カットオーバー!</text>
  <!-- Hyper-care period -->
  <rect x="330" y="65" width="170" height="115" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="415" y="90" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">翅が乾く時間</text>
  <text x="415" y="112" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">ハイパーケア</text>
  <text x="415" y="130" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">初期障害のリスク高</text>
  <text x="415" y="150" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">全員待機 + 即対応</text>
  <line x1="415" y1="180" x2="415" y2="200" stroke="#f9a825" stroke-width="2"/>
  <!-- Stable new system -->
  <rect x="520" y="65" width="190" height="115" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="615" y="90" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">新システム安定</text>
  <text x="615" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">✓ スケーラビリティ</text>
  <text x="615" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">✓ 新しい機能</text>
  <text x="615" y="150" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">✓ 新生態的ニッチ</text>
  <line x1="615" y1="180" x2="615" y2="200" stroke="#f9a825" stroke-width="2"/>
  <!-- Bottom axis labels -->
  <text x="150" y="270" text-anchor="middle" fill="#555555" font-size="10" font-family="sans-serif">-∞</text>
  <text x="300" y="270" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">Day 0</text>
  <text x="415" y="270" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">+1-4週間</text>
  <text x="615" y="270" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">安定稼働</text>
  <!-- Capabilities comparison -->
  <rect x="60" y="300" width="680" height="75" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="325" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">成虫は幼虫にない能力を獲得する</text>
  <text x="200" y="352" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">幼虫: 地を這う → 成虫: 飛翔</text>
  <text x="600" y="352" text-anchor="middle" fill="#aaaaaa" font-size="11" font-family="sans-serif">旧システム: 限界あり → 新システム: スケール</text>
  <text x="400" y="365" text-anchor="middle" fill="#555555" font-size="11" font-family="sans-serif">|</text>
</svg>
</div>

- 羽化（Eclosion）= カットオーバー / Go-Live
- 成虫は幼虫とは **完全に異なる能力** を持つ（飛翔）
- 新システムは旧システムにない能力を獲得（スケーラビリティ）
- 羽化直後は翅が乾くまで **脆弱** = 初期障害のリスク
- ハイパーケア期間（翅を乾かす時間）が必要
- 成功すれば **全く新しい生態的ニッチ** を獲得


---

<!-- _class: invert lead -->
# Imaginal Discs パターン

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">Imaginal Discsパターン：内部で育てる新機能</text>
  <!-- Caterpillar body (old system) -->
  <ellipse cx="250" cy="180" rx="180" ry="100" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="250" y="165" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">旧システム（幼虫）</text>
  <text x="250" y="185" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">機能は維持・凍結</text>
  <text x="250" y="203" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">本番トラフィックを処理中</text>
  <!-- Imaginal discs inside -->
  <ellipse cx="160" cy="150" rx="28" ry="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
    <text x="160" y="145" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Auth</text><text x="160" y="159" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Disc</text><ellipse cx="240" cy="130" rx="28" ry="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
    <text x="240" y="125" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">API</text><text x="240" y="139" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Disc</text><ellipse cx="320" cy="150" rx="28" ry="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
    <text x="320" y="145" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">DB</text><text x="320" y="159" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Disc</text><ellipse cx="200" cy="200" rx="28" ry="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
    <text x="200" y="195" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">UI</text><text x="200" y="209" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Disc</text><ellipse cx="290" cy="205" rx="28" ry="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
    <text x="290" y="200" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">BIZ</text><text x="290" y="214" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="bold" font-family="sans-serif">Disc</text>
  <!-- Arrow to new system -->
  <line x1="435" y1="180" x2="510" y2="180" stroke="#ffffff" stroke-width="2"/>
  <polygon points="510,180 498,174 498,186" fill="#ffffff"/>
  <text x="472" y="165" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">変態</text>
  <!-- New system (butterfly) -->
  <ellipse cx="630" cy="180" rx="140" ry="90" fill="#16213e" stroke="#e91e63" stroke-width="3"/>
  <text x="630" y="165" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">新システム（成虫）</text>
  <text x="630" y="185" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">Discが成長・結合</text>
  <text x="630" y="203" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">マイクロサービス化完了</text>
  <!-- Key insight -->
  <rect x="50" y="300" width="700" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Imaginal Discs = 新サービスを旧モノリス内で育てる小さな「芽」</text>
  <text x="400" y="343" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">各Discが独立してテスト可能 → 蛹期の最大リスク（外部不可視）を局所化</text>
</svg>
</div>

- Chapter 3: Imaginal Discs Pattern


---

# Imaginal Discs：新旧システムの共存

![w:900 center](assets/diagram-02.svg)


---

# Imaginal Discsの教訓

> *新機能を旧システム内に埋め込み—共存が変態を可能にする*

- 成虫原基（Imaginal Discs）は **幼虫の段階から** 体内に存在
- 変態時に溶解せず、新しい器官の **核** となる
- ソフトウェア: 新サービスのPOC/プロトタイプを旧システム内で育てる
- マイグレーション前に **実証済みのコンポーネント** を用意
- Feature Flagで新機能を旧システム内で段階的にテスト
- 全面切替時に「成虫原基」が新システムのコアとなる


---

<!-- _class: invert lead -->
# 変態タイプ別マイグレーション戦略

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">変態タイプ × マイグレーション戦略マトリックス</text>
  <!-- Matrix headers -->
  <text x="210" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">段階的移行</text>
  <text x="400" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">並行稼働</text>
  <text x="590" y="60" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">ビッグバン</text>
  <!-- Row headers -->
  <text x="60" y="115" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">低リスク</text>
  <text x="60" y="200" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">中リスク</text>
  <text x="60" y="285" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">高リスク</text>
  <!-- Matrix cells -->
  <rect x="100" y="75" width="190" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="195" y="97" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Strangler Fig</text><text x="195" y="114" text-anchor="middle" fill="#f9a825" font-size="9" font-weight="normal" font-family="sans-serif">推奨</text>
    <text x="195" y="135" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">★★★★★</text><rect x="300" y="75" width="190" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="395" y="97" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Blue-Green</text><text x="395" y="114" text-anchor="middle" fill="#f9a825" font-size="9" font-weight="normal" font-family="sans-serif">推奨</text>
    <text x="395" y="135" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">★★★★★</text><rect x="500" y="75" width="190" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
    <text x="595" y="97" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">非推奨</text><text x="595" y="114" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="normal" font-family="sans-serif">(検証困難)</text>
    <text x="595" y="135" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">★☆☆☆☆</text><rect x="100" y="160" width="190" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="195" y="182" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Imaginal Discs</text><text x="195" y="199" text-anchor="middle" fill="#f9a825" font-size="9" font-weight="normal" font-family="sans-serif">中程度</text>
    <text x="195" y="220" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">★★★★☆</text><rect x="300" y="160" width="190" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="395" y="182" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Feature Flag</text><text x="395" y="199" text-anchor="middle" fill="#f9a825" font-size="9" font-weight="normal" font-family="sans-serif">中程度</text>
    <text x="395" y="220" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">★★★☆☆</text><rect x="500" y="160" width="190" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
    <text x="595" y="182" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">注意が必要</text><text x="595" y="199" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="normal" font-family="sans-serif">(計画必須)</text>
    <text x="595" y="220" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">★★☆☆☆</text><rect x="100" y="245" width="190" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
    <text x="195" y="267" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Anti-Corruption</text><text x="195" y="284" text-anchor="middle" fill="#f9a825" font-size="9" font-weight="normal" font-family="sans-serif">困難だが可能</text>
    <text x="195" y="305" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">★★★☆☆</text><rect x="300" y="245" width="190" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
    <text x="395" y="267" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">Shadow Mode</text><text x="395" y="284" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="normal" font-family="sans-serif">必須</text>
    <text x="395" y="305" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">★★★★☆</text><rect x="500" y="245" width="190" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
    <text x="595" y="267" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">避けるべき</text><text x="595" y="284" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="normal" font-family="sans-serif">最終手段のみ</text>
    <text x="595" y="305" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">★☆☆☆☆</text>
  <text x="400" y="372" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">リスクが高いほど並行稼働+Shadow Modeの組み合わせが有効</text>
</svg>
</div>

- Chapter 4: Migration Strategy Types


---

# マイグレーション戦略の比較

![w:900 center](assets/diagram-03.svg)


---

# 実装パターン：Blue-Green Deployment

- 完全変態型の代表的実装パターン


---

# 実装パターン：Blue-Green Deployment（コード例）

```typescript
// Blue-Green Deployment (Complete Metamorphosis)
const deployment = {
  blue: { status: 'active', version: 'v1.0-larva' },
  green: { status: 'standby', version: 'v2.0-adult' },
};

async function metamorphose() {
  await green.deploy();      // 蛹の中で新システム構築
  await green.healthCheck();  // 羽化前の最終確認
  await switchTraffic('green'); // 羽化 = トラフィック切替
  blue.status = 'deprecated';   // 幼虫の殻を脱ぎ捨てる
}
```


---

<!-- _class: invert lead -->
# 実践：変態を成功させるための教訓

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">変態を成功させる3つの教訓</text>
  <!-- Lesson 1: Don't rush the pupa -->
  <rect x="20" y="55" width="240" height="295" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">教訓1: 蛹を急がない</text>
  <line x1="40" y1="95" x2="240" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="140" y="120" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">蛹を途中で開くと蝶は死ぬ</text>
  <text x="140" y="145" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">移行途中のロールバックは</text>
  <text x="140" y="163" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">最もコストが高い</text>
  <text x="140" y="195" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ Go/No-Goゲートを設定</text>
  <text x="140" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">各フェーズ完了基準を</text>
  <text x="140" y="231" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">事前に合意しておく</text>
  <text x="140" y="265" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">失敗パターン:</text>
  <text x="140" y="283" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">「少し遅れているから</text>
  <text x="140" y="299" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">一部だけ早く移行」</text>
  <text x="140" y="331" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">→ 中途半端な状態で詰む</text>
  <!-- Lesson 2: Imaginal discs first -->
  <rect x="280" y="55" width="240" height="295" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">教訓2: Discを先に育てる</text>
  <line x1="300" y1="95" x2="500" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="400" y="120" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">翅は蛹になる前から存在する</text>
  <text x="400" y="145" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">新サービスは移行前から</text>
  <text x="400" y="163" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">本番相当環境で育てる</text>
  <text x="400" y="195" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">→ Shadow Mode必須</text>
  <text x="400" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">本番トラフィックを複製して</text>
  <text x="400" y="231" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">新サービスで検証する</text>
  <text x="400" y="265" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">失敗パターン:</text>
  <text x="400" y="283" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">「開発環境でOKだったから</text>
  <text x="400" y="299" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">そのまま本番に」</text>
  <text x="400" y="331" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">→ 本番特有の負荷で障害</text>
  <!-- Lesson 3: DNA continuity -->
  <rect x="540" y="55" width="240" height="295" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="660" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">教訓3: DNAを守る</text>
  <line x1="560" y1="95" x2="760" y2="95" stroke="#333355" stroke-width="1"/>
  <text x="660" y="120" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">変態前後でDNAは同じ</text>
  <text x="660" y="145" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">ビジネスロジックの</text>
  <text x="660" y="163" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">継続性を保証する</text>
  <text x="660" y="195" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ 契約テスト(Pact)で担保</text>
  <text x="660" y="215" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">APIの振る舞いが</text>
  <text x="660" y="231" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">移行前後で一致することを確認</text>
  <text x="660" y="265" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">失敗パターン:</text>
  <text x="660" y="283" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">「機能は同じなのに</text>
  <text x="660" y="299" text-anchor="middle" fill="#aaaaaa" font-size="9" font-family="sans-serif">挙動が微妙に違う」</text>
  <text x="660" y="331" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">→ 気づかないデグレード</text>
</svg>
</div>

- Chapter 5: Lessons Learned


---

# 変態失敗のアンチパターン

> *ビッグバン移行・早期切り替え・テスト不足が失敗の三大要因*

<div class="fig">
<svg viewBox="0 0 800 400" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">変態失敗アンチパターン：蛹を守れなかった事例</text>
  <!-- 6 anti-patterns grid -->
  <rect x="30" y="55" width="235" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="147" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">✗ 蛹の中断</text>
    <line x1="50" y1="97" x2="245" y2="97" stroke="#333355" stroke-width="1"/>
    <text x="147" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">方針変更で中途半端な状態</text>
    <text x="147" y="155" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text><rect x="285" y="55" width="235" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="402" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">✗ 栄養不足</text>
    <line x1="305" y1="97" x2="500" y2="97" stroke="#333355" stroke-width="1"/>
    <text x="402" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">技術的負債を返済せず変態開始</text>
    <text x="402" y="155" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text><rect x="540" y="55" width="235" height="130" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
    <text x="657" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">✗ 寄生</text>
    <line x1="560" y1="97" x2="755" y2="97" stroke="#333355" stroke-width="1"/>
    <text x="657" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">組織変更・予算削減が蛹を食う</text>
    <text x="657" y="155" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text><rect x="30" y="210" width="235" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="147" y="240" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">✗ 温度異常</text>
    <line x1="50" y1="252" x2="245" y2="252" stroke="#333355" stroke-width="1"/>
    <text x="147" y="275" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">スケジュール圧力で変態を急ぐ</text>
    <text x="147" y="310" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text><rect x="285" y="210" width="235" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="402" y="240" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">✗ 成虫原基なし</text>
    <line x1="305" y1="252" x2="500" y2="252" stroke="#333355" stroke-width="1"/>
    <text x="402" y="275" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">POCなしでいきなり全面リプレース</text>
    <text x="402" y="310" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text><rect x="540" y="210" width="235" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
    <text x="657" y="240" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">✗ 幼虫回帰</text>
    <line x1="560" y1="252" x2="755" y2="252" stroke="#333355" stroke-width="1"/>
    <text x="657" y="275" text-anchor="middle" fill="#aaaaaa" font-size="10" font-family="sans-serif">問題発生→旧システムに戻る</text>
    <text x="657" y="310" text-anchor="middle" fill="#555555" font-size="9" font-family="sans-serif">蛹の危機</text>
  <text x="400" y="380" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">「蛹の段階を途中でやめることはできない」— 自然の鉄則</text>
</svg>
</div>

- **蛹の中断**: マイグレーション途中で方針変更 → 中途半端な状態
- **栄養不足**: 技術的負債を返済せず変態開始 → エネルギー切れ
- **寄生**: 外部要因（組織変更、予算削減）が蛹を食い荒らす
- **温度異常**: スケジュール圧力で変態を急ぎすぎる
- **成虫原基なし**: POCなしでいきなり全面リプレース
- **幼虫回帰**: 新システムに問題発生→旧システムに戻って再構築断念


---

# 成功する変態の5原則

> *段階的・並行・検証・退路確保・観測—5原則で変態を完遂*

- 1. **Imaginal Discs First**: POCを旧システム内で事前に育てる
- 2. **十分な脂肪を蓄える**: リファクタリング予算を確保してから変態開始
- 3. **蛹の保護**: マイグレーション期間中は外部干渉を最小化
- 4. **羽化の準備**: ハイパーケア計画とロールバック手順を事前策定
- 5. **変態タイプの選択**: 組織の体力と制約に応じた戦略を選ぶ


---

<!-- _class: invert lead -->
# まとめ：メタモルフォーゼの知恵

- 蛹の中の溶解は破壊ではなく再創造である
- 3億年の進化が証明した「壊して再構築」の戦略を
- ソフトウェアマイグレーションに活かす
- **成虫原基を育て、適切な時に変態する勇気を**

