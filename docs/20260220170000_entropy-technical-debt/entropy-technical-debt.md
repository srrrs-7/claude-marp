---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "エントロピーは技術的負債と同じ法則に従う — 熱力学第二法則でコードを語る"
footer: "© 2026 — Entropy & Technical Debt"
style: |
  /* ── Overflow prevention ──────────────────────────────── */
    section { overflow: hidden; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.7;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Images (all, not only SVG) ───────────────────────── */
    section img:not([src$=".svg"]) {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    section svg {
      max-height: 70vh;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    section img[src$=".svg"] {
      max-height: 70vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  
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
# エントロピーは技術的負債と同じ法則に従う

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- 熱力学第二法則でコードを語る
- 
- 対象：テックリード・アーキテクト
- 形式：ワークショップ 90分


---

# 問いかけ：なぜコードは腐るのか？（1/2）

> *エントロピー増大則がコード劣化の必然性を説明する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- **誰も「腐らせよう」とは思っていない**
- - 丁寧に書いたはずのコードがなぜ数年で手をつけられなくなるのか
- - 技術的負債は「悪い開発者」のせいなのか？
- 
- **このワークショップの問い**


---

# 問いかけ：なぜコードは腐るのか？（2/2）

> *エントロピー増大則がコード劣化の必然性を説明する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- - コードの劣化は **物理法則** と同じメカニズムで動いているのではないか？
- - そうだとすれば、どう「抵抗」すればよいか？
- 
- **ゴール**
- - エントロピーと技術的負債を統一フレームで理解する
- - 計測・隔離・エネルギー投入の3戦略を身につける


---

# アジェンダ（1/2）

> *8章構成でエントロピー理論から実践的負債管理戦略まで体系化する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **Part 1** — 熱力学第二法則とエントロピー（理論基盤）
- **Part 2** — 技術的負債とエントロピーの対応関係
- **Part 3** — 技術的負債の計測・定量化
- **Part 4** — リファクタリング・負債返済の実践戦略


---

# アジェンダ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- **Part 5** — 組織・プロセス・パターン比較事例
- **Part 6** — まとめ・Q&A
- 
- 演習タイム: Part 4に組み込み（自システムのエントロピーマップ）


---

<!-- _class: lead -->
# Part 1: 熱力学第二法則とエントロピー

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- 物理学の原理からソフトウェアの本質を読み解く


---

# 熱力学第二法則とは何か（1/2）

> *孤立系では無秩序は自然に増大し元には戻らない*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **第一法則（エネルギー保存）**: エネルギーは生まれも消えもしない
- **第二法則（エントロピー増大）**: 孤立系のエントロピーは増大し続ける
- 
- **直感的な意味**


---

# 熱力学第二法則とは何か（2/2）

> *孤立系では無秩序は自然に増大し元には戻らない*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- - 散らかった部屋は放置すれば「勝手に」整理整頓されない
- - 熱は冷たい方向へ流れる（逆は起きない）
- - 割れたガラスは自然に元に戻らない
- 
- **核心**: 「無秩序の方向」へは自然に進む。秩序を作るにはエネルギーが必要


---

# エントロピーの定義：S = k_B × ln(Ω)（1/2）

> *取りうる状態数が多いほど無秩序度が高い定義*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **ボルツマンの式**: S = k_B × ln(Ω)
- - S：エントロピー（無秩序の度合い）
- - k_B：ボルツマン定数（1.38 × 10⁻²³ J/K）
- - Ω：マクロ状態を実現できるミクロ状態の数
- 


---

# エントロピーの定義：S = k_B × ln(Ω)（2/2）

> *取りうる状態数が多いほど無秩序度が高い定義*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- **ソフトウェアへのアナロジー**
- - Ω = 同じ「機能を満たす」コードの書き方のバリエーション数
- - 正しく動くコードの書き方は無数にある → Ω は指数的に大きい
- - 「読みやすく・変更しやすいコード」の状態数は少ない → エントロピーが低い
- 
- **結論**: 何もしなければコードは「より多くの書き方が存在する」方向——すなわち混沌へ向かう


---

# 閉じた系では無秩序は増大する（1/2）

> *能動的介入なくコードベースは必ず複雑化していく*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- **孤立系（Isolated System）の定義**
- - 外部とエネルギーも物質もやり取りしない系
- - 第二法則：孤立系のエントロピーは ΔS ≥ 0 で単調増加
- 
- **開放系（Open System）ならば**


---

# 閉じた系では無秩序は増大する（2/2）

> *能動的介入なくコードベースは必ず複雑化していく*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- - 外部からエネルギーを注入することで局所的に秩序を作れる
- - 生命体・都市・企業はすべて開放系として秩序を維持している
- 
- **問い：あなたのコードベースはどちら？**
- - 誰も触らないコードは孤立系に近づく → エントロピー増大
- - リファクタリング＝外部エネルギー（開発者の労力）の注入


---

# 情報エントロピー（シャノン）への拡張（1/2）

> *情報の不確実性がコード可読性の逆指標になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- **シャノンのエントロピー（1948年）**
- H(X) = -Σ p(x) × log₂ p(x)
- 
- - 情報の「不確実性」または「乱雑さ」を定量化
- - 予測可能なメッセージ → H = 0（秩序）


---

# 情報エントロピー（シャノン）への拡張（2/2）

> *情報の不確実性がコード可読性の逆指標になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- - 完全にランダムなメッセージ → H = log₂ n（最大）
- 
- **コードへの対応**
- - 命名の一貫性・パターンの予測可能性 → 情報エントロピーが低い
- - 命名が不統一・処理が散在 → 読む側が次の行を予測できない → H が高い
- - レビュアーの認知負荷 = コードの情報エントロピーに比例


---

# ソフトウェアは孤立系か？（1/2）

> *チームの知識注入がなければコードは孤立系に近づく*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **物理学では孤立系は理想化モデル**
- - 現実には完全な孤立系は存在しない
- - ただし「ほぼ孤立」になると法則は強く働く
- 
- **コードベースの「孤立度」を決める要因**


---

# ソフトウェアは孤立系か？（2/2）

> *チームの知識注入がなければコードは孤立系に近づく*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- - 開発者の入れ替わり（知識の流出）
- - テストの欠如（変更コストが高く触れない）
- - ドキュメントの欠如（意図が失われる）
- - 依存関係の複雑化（変更の影響が見えない）
- 
- **最も危険なシナリオ**: 「動いているから触るな」というレガシーコード → 完全な孤立系


---

# コードの「状態数」を考える（1/2）

> *分岐数×変数数がコードの可能状態数を指数的に増やす*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **ボルツマン的視点でコードを見る**
- 
- 同じ「ユーザーを取得する」処理に何通りの書き方があるか？
- - 変数名のバリエーション: user / u / usr / userData / userObj / ...（無数）
- - エラー処理の場所: 呼び出し元 / 関数内 / グローバル / 混在 ...


---

# コードの「状態数」を考える（2/2）

> *分岐数×変数数がコードの可能状態数を指数的に増やす*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- - 副作用の有無: 純粋関数 / DBアクセス内包 / キャッシュ参照 ...
- - 型の表現: 具体型 / any / unknown / Union型 / アサーション ...
- 
- **Ω は指数爆発する**: 関数が増えるほど「状態の組み合わせ」は加速度的に増大
- 
- **コーディング規約・パターン** = Ω を意図的に制限してエントロピーを下げる設計


---

# SVG図: エントロピー増大曲線 vs コード品質劣化曲線（1/2）（1/2）

> *両曲線の形状が定量的に一致する*

- <svg viewBox='0 0 760 380' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.ax{stroke:#aaa;stroke-width:1.5;fill:none}.lb{font-family:sans-serif;font-size:13px;fill:#ddd}.hl{font-family:sans-serif;font-size:11px;fill:#aaa}.tt{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <!-- axes -->
-   <line x1='60' y1='320' x2='720' y2='320' class='ax'/>
-   <line x1='60' y1='40' x2='60' y2='320' class='ax'/>


---

# SVG図: エントロピー増大曲線 vs コード品質劣化曲線（1/2）（2/2）

> *両曲線の形状が定量的に一致する*

-   <!-- axis labels -->
-   <text x='390' y='360' text-anchor='middle' class='lb'>時間 / スプリント数</text>
-   <text x='20' y='180' text-anchor='middle' class='lb' transform='rotate(-90,20,180)'>値</text>
-   <!-- Entropy curve (rising) -->
-   <path d='M 60 300 Q 200 280 350 220 Q 500 150 660 80 Q 690 68 720 60' stroke='#ef4444' stroke-width='2.5' fill='none'/>
-   <!-- Code quality curve (falling) -->
-   <path d='M 60 80 Q 150 90 280 130 Q 420 180 560 240 Q 640 280 720 300' stroke='#3b82f6' stroke-width='2.5' fill='none'/>


---

# SVG図: エントロピー増大曲線 vs コード品質劣化曲線（2/2）（1/2）

> *両曲線の形状が定量的に一致する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
-   <!-- Legend -->
-   <rect x='480' y='55' width='225' height='70' rx='6' fill='#1e293b' opacity='0.85'/>
-   <line x1='495' y1='78' x2='530' y2='78' stroke='#ef4444' stroke-width='2.5'/>
-   <text x='538' y='82' class='hl'>システムエントロピー（増大）</text>
-   <line x1='495' y1='105' x2='530' y2='105' stroke='#3b82f6' stroke-width='2.5'/>
-   <text x='538' y='109' class='hl'>コード品質スコア（劣化）</text>


---

# SVG図: エントロピー増大曲線 vs コード品質劣化曲線（2/2）（2/2）

> *両曲線の形状が定量的に一致する*

-   <!-- annotation -->
-   <text x='350' y='195' class='hl' fill='#fbbf24'>← 形が鏡像になっている</text>
-   <!-- y-ticks -->
-   <text x='50' y='85' text-anchor='end' class='hl'>高</text>
-   <text x='50' y='325' text-anchor='end' class='hl'>低</text>
-   <!-- title -->
-   <text x='390' y='25' text-anchor='middle' class='tt'>エントロピー増大曲線とコード品質劣化曲線</text>
- </svg>


---

# エネルギー投入で局所的秩序を作れる（1/2）

> *リファクタリングがエントロピーを逆転させる唯一の手段*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **熱力学の解法：開放系として「エネルギーを注ぐ」**
- 
- - 冷蔵庫は内部の熱を外部に排出することで「局所的な低温」を維持
- - 生命は食物（エネルギー）を摂取して体内の秩序を維持し、廃熱・廃棄物を外部へ
- 


---

# エネルギー投入で局所的秩序を作れる（2/2）

> *リファクタリングがエントロピーを逆転させる唯一の手段*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- **ソフトウェアへの対応**
- - リファクタリング ＝ 開発者のエネルギー（工数）を注入して秩序を回復
- - ただし「廃熱」も出る：削除されたコード、廃止されたパターン、旧テスト
- - エネルギー注入がゼロなら、どんなコードベースも第二法則に従う
- 
- **重要な含意**: リファクタリングは「きれい好きの趣味」ではなく **物理法則への抵抗** である


---

<!-- _class: lead -->
# Part 2: 技術的負債とエントロピーの対応関係

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- 物理学の概念とソフトウェア工学の概念を対応させる


---

# 技術的負債の定義（Ward Cunningham）（1/2）

> *意図的な近道が将来の利子として返済を要求する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **Ward Cunninghamの原義（1992年）**
- 「今の不完全な理解で書いたコードは、より深い理解を得たときに返済が必要な『借り』だ」
- 
- **Martin Fowlerによる分類**
- - 意図的×無謀: 「設計なんか後で考えよう」


---

# 技術的負債の定義（Ward Cunningham）（2/2）

> *意図的な近道が将来の利子として返済を要求する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- - 意図的×慎重: 「今は間に合わせで進めよう、後でリファクタする」
- - 不注意×無謀: 「レイヤー設計って何？」
- - 不注意×慎重: 「後になってあの設計が問題だったと気づいた」
- 
- **共通点**: すべての負債は **蓄積し、利子（変更コスト）を生む**


---

# SVG図: エントロピー↔技術的負債の対応表（1/2）（1/2）

> *物理概念とソフト概念が1対1で対応する*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.hd{font-family:sans-serif;font-size:13px;font-weight:bold;fill:#1e293b}.cl{font-family:sans-serif;font-size:12px;fill:#ddd}.ch{font-family:sans-serif;font-size:13px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <!-- header row -->
-   <rect x='30' y='20' width='340' height='40' rx='4' fill='#ef4444' opacity='0.85'/>
-   <text x='200' y='46' text-anchor='middle' class='ch'>熱力学・情報理論</text>
-   <rect x='390' y='20' width='340' height='40' rx='4' fill='#3b82f6' opacity='0.85'/>
-   <text x='560' y='46' text-anchor='middle' class='ch'>ソフトウェア工学</text>
-   <!-- rows -->


---

# SVG図: エントロピー↔技術的負債の対応表（1/2）（2/2）

> *物理概念とソフト概念が1対1で対応する*

-   <rect x='30' y='68' width='340' height='36' rx='3' fill='#1e293b'/>
-   <text x='200' y='91' text-anchor='middle' class='cl'>孤立系（Isolated System）</text>
-   <rect x='390' y='68' width='340' height='36' rx='3' fill='#1e293b'/>
-   <text x='560' y='91' text-anchor='middle' class='cl'>メンテされないレガシーコード</text>
-   <rect x='30' y='112' width='340' height='36' rx='3' fill='#0f172a'/>
-   <text x='200' y='135' text-anchor='middle' class='cl'>エントロピー S = k_B ln(Ω)</text>
-   <rect x='390' y='112' width='340' height='36' rx='3' fill='#0f172a'/>
-   <text x='560' y='135' text-anchor='middle' class='cl'>技術的負債の蓄積量</text>
-   <rect x='30' y='156' width='340' height='36' rx='3' fill='#1e293b'/>
-   <text x='200' y='179' text-anchor='middle' class='cl'>ミクロ状態数 Ω</text>
-   <rect x='390' y='156' width='340' height='36' rx='3' fill='#1e293b'/>


---

# SVG図: エントロピー↔技術的負債の対応表（2/2）（1/2）

> *物理概念とソフト概念が1対1で対応する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
-   <text x='560' y='179' text-anchor='middle' class='cl'>コードの書き方のバリエーション数</text>
-   <rect x='30' y='200' width='340' height='36' rx='3' fill='#0f172a'/>
-   <text x='200' y='223' text-anchor='middle' class='cl'>外部エネルギー投入</text>
-   <rect x='390' y='200' width='340' height='36' rx='3' fill='#0f172a'/>
-   <text x='560' y='223' text-anchor='middle' class='cl'>リファクタリング工数</text>
-   <rect x='30' y='244' width='340' height='36' rx='3' fill='#1e293b'/>
-   <text x='200' y='267' text-anchor='middle' class='cl'>局所的秩序（低エントロピー状態）</text>
-   <rect x='390' y='244' width='340' height='36' rx='3' fill='#1e293b'/>
-   <text x='560' y='267' text-anchor='middle' class='cl'>クリーンアーキテクチャ・高凝集</text>
-   <rect x='30' y='288' width='340' height='36' rx='3' fill='#0f172a'/>


---

# SVG図: エントロピー↔技術的負債の対応表（2/2）（2/2）

> *物理概念とソフト概念が1対1で対応する*

-   <text x='200' y='311' text-anchor='middle' class='cl'>熱死（Heat Death）</text>
-   <rect x='390' y='288' width='340' height='36' rx='3' fill='#0f172a'/>
-   <text x='560' y='311' text-anchor='middle' class='cl'>開発停止・全面書き直し</text>
-   <!-- arrows between columns -->
-   <text x='375' y='91' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
-   <text x='375' y='135' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
-   <text x='375' y='179' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
-   <text x='375' y='223' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
-   <text x='375' y='267' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
-   <text x='375' y='311' text-anchor='middle' class='cl' fill='#fbbf24'>⟷</text>
- </svg>


---

# 「意図的負債」vs「不可避な複雑性」（1/2）

> *返済可能な負債と構造的複雑性を分けて管理する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- **Accidental Complexity（偶発的複雑性）**
- = 意図せず・不注意で生まれた負債 → **エントロピーの自然増大**
- - 重複コード、無意味な命名、巨大な関数、コメントアウトの残骸
- 
- **Essential Complexity（本質的複雑性）**
- = 問題領域が本質的に持つ複雑さ → **避けられない物理的エントロピー**


---

# 「意図的負債」vs「不可避な複雑性」（2/2）

> *返済可能な負債と構造的複雑性を分けて管理する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- - 税務計算・医療プロトコル・金融リスク計算は「そもそも複雑」
- 
- **戦略の分岐点**
- - Accidental は除去できる（リファクタリングで投資回収）
- - Essential は管理できる（ドメインモデルで隔離・可視化）
- - 混同すると「必要な複雑さまで削ろうとする」誤りが起きる


---

# Connascence：結合度とエントロピー（1/2）

> *結合の種類が変更コストの増大速度を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **Connascence（連鎖性）**: 一方を変えると他方も変えなければならない関係
- 
- **強さの順（エントロピーの度合い）**
- - CoN（名前の連鎖）: 最も弱い ← コントロール可能
- - CoT（型の連鎖）: 型変更で伝播


---

# Connascence：結合度とエントロピー（2/2）

> *結合の種類が変更コストの増大速度を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- - CoV（値の連鎖）: 定数の重複
- - CoA（アルゴリズムの連鎖）: 同じロジックが散在
- - CoEx（実行順序の連鎖）: 暗黙的な順序依存
- - CoI（アイデンティティの連鎖）: 参照共有 ← 最も強い
- 
- **エントロピー則**: 強い Connascence が増えるほど Ω（変更パターン）が爆発し、エントロピーが急増


---

# コードの状態遷移：秩序→混沌の実例（1/2）

> *具体的コードベースの歴史がエントロピー増大を実証する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **リリース1週目（秩序）**
- - 3層アーキテクチャが明確、循環依存なし、命名統一
- 
- **6ヶ月後（エントロピー増大開始）**
- - 例外処理のため「とりあえず」の直接DB呼び出しが2箇所
- - 設定値がコードに直書きされ始める


---

# コードの状態遷移：秩序→混沌の実例（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- 
- **2年後（エントロピー高進）**
- - Service層とRepository層の区別が曖昧に


---

# コードの状態遷移：秩序→混沌の実例（2/2）（2/2）

> *具体的コードベースの歴史がエントロピー増大を実証する*

- - 「なんとなく動く」理由が誰もわからないロジック
- - 変更するとどこかが壊れる、でもテストがない
- 
- **これは「悪い人が書いた」のではなく、エントロピーが増大した結果**


---

# SVG図: 技術的負債蓄積モデル（エントロピー増大として）（1/2）（1/2）

> *蓄積曲線が指数関数的に増加する構造を示す*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:12px;fill:#ddd}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}.ax{stroke:#555;stroke-width:1.5;fill:none}</style>
-   </defs>
-   <!-- axes -->
-   <line x1='60' y1='300' x2='700' y2='300' class='ax'/>
-   <line x1='60' y1='50' x2='60' y2='300' class='ax'/>


---

# SVG図: 技術的負債蓄積モデル（エントロピー増大として）（1/2）（2/2）

> *蓄積曲線が指数関数的に増加する構造を示す*

-   <text x='380' y='340' text-anchor='middle' class='lb'>時間（スプリント）</text>
-   <text x='18' y='175' text-anchor='middle' class='lb' transform='rotate(-90,18,175)'>負債量・変更コスト</text>
-   <!-- debt accumulation curve with refactoring dips -->
-   <path d='M60,290 L120,275 L160,260 L200,240 L200,220 L240,210 L280,195 L320,175 L320,158 L360,148 L400,130 L440,112 L440,98 L480,88 L520,75 L560,62 L600,52' stroke='#ef4444' stroke-width='2.5' fill='none'/>
-   <!-- refactoring drops -->
-   <line x1='200' y1='240' x2='200' y2='220' stroke='#22c55e' stroke-width='2' stroke-dasharray='4,3'/>
-   <line x1='320' y1='175' x2='320' y2='158' stroke='#22c55e' stroke-width='2' stroke-dasharray='4,3'/>
-   <line x1='440' y1='112' x2='440' y2='98' stroke='#22c55e' stroke-width='2' stroke-dasharray='4,3'/>


---

# SVG図: 技術的負債蓄積モデル（エントロピー増大として）（2/2）（1/2）

> *蓄積曲線が指数関数的に増加する構造を示す*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
-   <!-- refactoring labels -->
-   <text x='205' y='215' class='lb' fill='#22c55e'>↑RF</text>
-   <text x='325' y='153' class='lb' fill='#22c55e'>↑RF</text>
-   <text x='445' y='93' class='lb' fill='#22c55e'>↑RF</text>
-   <!-- trend annotation -->
-   <text x='610' y='48' class='lb' fill='#ef4444'>実態の負債</text>
-   <!-- ideal line -->


---

# SVG図: 技術的負債蓄積モデル（エントロピー増大として）（2/2）（2/2）

> *蓄積曲線が指数関数的に増加する構造を示す*

-   <path d='M60,290 L600,270' stroke='#3b82f6' stroke-width='1.5' stroke-dasharray='6,4' fill='none'/>
-   <text x='610' y='270' class='lb' fill='#3b82f6'>理想（定期投資）</text>
-   <!-- no action line -->
-   <path d='M60,290 Q300,200 600,60' stroke='#7c3aed' stroke-width='1.5' stroke-dasharray='6,4' fill='none'/>
-   <text x='610' y='60' class='lb' fill='#7c3aed'>放置シナリオ</text>
-   <!-- title -->
-   <text x='380' y='28' text-anchor='middle' class='tt'>技術的負債の蓄積モデル（RF = リファクタリング）</text>
- </svg>


---

# なぜエンジニアは負債を見落とすのか（1/2）

> *認知バイアスが現在の問題より将来コストを過小評価させる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **認知バイアスとエントロピーの見えにくさ**
- 
- - **現状維持バイアス**: 今動いているコードは「正常」に見える
- - **ゆでガエル効果**: 毎日少しずつ悪化するため変化に気づかない
- - **確証バイアス**: 「自分のコードは綺麗」と思いたい


---

# なぜエンジニアは負債を見落とすのか（2/2）

> *認知バイアスが現在の問題より将来コストを過小評価させる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- - **埋没費用**: 長時間かけて書いたコードを「捨てる」のが惜しい
- 
- **計測されないものは管理できない**
- - エントロピーは目に見えない → Complexity Metricsで可視化が必要
- - 「なんとなくヤバい」ではなく数値で語る文化が必要


---

<!-- _class: lead -->
# Part 3: 技術的負債の計測・定量化

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- エントロピーを数値で捕らえ、管理可能にする


---

# 計測なくして管理なし（1/2）

> *数値化されない負債は優先順位に入らず放置される*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **「測れないものは改善できない」— Lord Kelvin**
- 
- **計測のゴール**
- - どこにエントロピーが集中しているかを特定する
- - リファクタリング投資の優先順位を決める
- - 改善の効果を定量的に示す（ステークホルダーへの説明責任）


---

# 計測なくして管理なし（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- 
- **代表的な計測アプローチ**
- - 構造的複雑度（Cyclomatic Complexity）


---

# 計測なくして管理なし（2/2）（2/2）

> *数値化されない負債は優先順位に入らず放置される*

- - 認知的複雑度（Cognitive Complexity）
- - 変更頻度 × 複雑度のホットスポット分析
- - 依存グラフの循環検出
- - DORA Metrics（変更障害率・リードタイム）


---

# Cyclomatic Complexity：コードの「状態数」（1/2）

> *分岐経路数がテストコストとバグ率の先行指標になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **定義（McCabe, 1976年）**
- CC = E - N + 2P
- （E=エッジ数, N=ノード数, P=連結成分数）
- 
- **簡易計算**: 条件分岐（if / else if / case / while / for / catch）の数 + 1
- 


---

# Cyclomatic Complexity：コードの「状態数」（2/2）（1/2）

> *分岐経路数がテストコストとバグ率の先行指標になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **目安**
- - CC 1-10: 単純・テスト容易
- - CC 11-20: 複雑さあり・注意


---

# Cyclomatic Complexity：コードの「状態数」（2/2）（2/2）

> *分岐経路数がテストコストとバグ率の先行指標になる*

- - CC 21-50: 高複雑・リファクタ推奨
- - CC 51+: テスト不能レベル・危険
- 
- **エントロピー解釈**: CC ≈ そのコードが取りうる実行パス数 = ミクロ状態数 Ω の近似


---

# 認知的複雑度（Cognitive Complexity）（1/2）

> *人間の理解コストを定量化しリファクタ優先度を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- **Sonarqube が提唱（2018年、G. Ann Campbell）**
- 
- Cyclomatic の限界：ループのネストを考慮しない → 読みにくさを過小評価
- 
- **ルール**
- - ネストが深くなるたびにペナルティ +n（深さに比例）


---

# 認知的複雑度（Cognitive Complexity）（2/2）

> *人間の理解コストを定量化しリファクタ優先度を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- - break / continue ラベル・再帰も加点
- - メソッドチェーン・三項演算子は加点なし（読みやすい）
- 
- **例**: CC=5でも Cognitive Complexity=18 になりうる（深いネストのため）
- 
- **エントロピー解釈**: 人間が「次の行を予測する」ための情報エントロピー H(X) に対応


---

# SVG図: 複雑度とバグ率の相関（1/2）（1/2）

> *複雑度が閾値を超えるとバグ率が指数的に上昇する*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:12px;fill:#ddd}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}.ax{stroke:#555;stroke-width:1.5;fill:none}</style>
-   </defs>
-   <!-- axes -->
-   <line x1='70' y1='300' x2='700' y2='300' class='ax'/>
-   <line x1='70' y1='50' x2='70' y2='300' class='ax'/>
-   <text x='385' y='340' text-anchor='middle' class='lb'>Cyclomatic Complexity (CC)</text>
-   <text x='20' y='175' text-anchor='middle' class='lb' transform='rotate(-90,20,175)'>バグ密度（bugs/KLOC）</text>
-   <!-- x-axis labels -->
-   <text x='115' y='318' text-anchor='middle' class='lb'>5</text>


---

# SVG図: 複雑度とバグ率の相関（1/2）（2/2）

> *複雑度が閾値を超えるとバグ率が指数的に上昇する*

-   <text x='205' y='318' text-anchor='middle' class='lb'>10</text>
-   <text x='295' y='318' text-anchor='middle' class='lb'>15</text>
-   <text x='385' y='318' text-anchor='middle' class='lb'>20</text>
-   <text x='475' y='318' text-anchor='middle' class='lb'>25</text>
-   <text x='565' y='318' text-anchor='middle' class='lb'>30</text>
-   <text x='655' y='318' text-anchor='middle' class='lb'>35</text>
-   <!-- scatter dots -->
-   <circle cx='100' cy='285' r='5' fill='#22c55e' opacity='0.8'/>
-   <circle cx='115' cy='278' r='5' fill='#22c55e' opacity='0.8'/>
-   <circle cx='130' cy='270' r='5' fill='#22c55e' opacity='0.8'/>
-   <circle cx='150' cy='265' r='5' fill='#22c55e' opacity='0.8'/>


---

# SVG図: 複雑度とバグ率の相関（2/2）（1/2）

> *複雑度が閾値を超えるとバグ率が指数的に上昇する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
-   <circle cx='170' cy='260' r='5' fill='#3b82f6' opacity='0.8'/>
-   <circle cx='185' cy='255' r='5' fill='#3b82f6' opacity='0.8'/>
-   <circle cx='200' cy='245' r='5' fill='#3b82f6' opacity='0.8'/>
-   <circle cx='215' cy='235' r='5' fill='#3b82f6' opacity='0.8'/>
-   <circle cx='240' cy='225' r='6' fill='#fbbf24' opacity='0.8'/>
-   <circle cx='260' cy='210' r='6' fill='#fbbf24' opacity='0.8'/>
-   <circle cx='285' cy='195' r='6' fill='#fbbf24' opacity='0.8'/>
-   <circle cx='310' cy='178' r='7' fill='#f97316' opacity='0.8'/>
-   <circle cx='340' cy='160' r='7' fill='#f97316' opacity='0.8'/>
-   <circle cx='375' cy='138' r='8' fill='#ef4444' opacity='0.8'/>
-   <circle cx='410' cy='115' r='8' fill='#ef4444' opacity='0.8'/>


---

# SVG図: 複雑度とバグ率の相関（2/2）（2/2）

> *複雑度が閾値を超えるとバグ率が指数的に上昇する*

-   <circle cx='450' cy='95' r='9' fill='#ef4444' opacity='0.9'/>
-   <circle cx='495' cy='76' r='9' fill='#ef4444' opacity='0.9'/>
-   <circle cx='540' cy='62' r='10' fill='#dc2626' opacity='0.9'/>
-   <!-- trend line -->
-   <path d='M85,290 Q300,200 600,55' stroke='#fff' stroke-width='1.5' stroke-dasharray='5,4' fill='none'/>
-   <!-- risk zones -->
-   <text x='110' y='245' class='lb' fill='#22c55e'>低リスク</text>
-   <text x='190' y='205' class='lb' fill='#fbbf24'>要注意</text>
-   <text x='350' y='115' class='lb' fill='#ef4444'>高リスク</text>
-   <text x='470' y='62' class='lb' fill='#dc2626'>危険域</text>
-   <text x='385' y='25' text-anchor='middle' class='tt'>Cyclomatic Complexity とバグ密度の相関</text>
- </svg>


---

# 変更頻度 × 複雑度のホットスポット分析（1/2）

> *変更頻度の高い複雑ファイルが負債の最優先返済対象*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- **Adam Thornhillの手法（「Your Code as a Crime Scene」）**
- 
- - **X軸**: Cyclomatic Complexity（構造的複雑度）
- - **Y軸**: git変更頻度（過去N週間のコミット数）
- - **バブルサイズ**: コード行数
- 


---

# 変更頻度 × 複雑度のホットスポット分析（2/2）（1/2）

> *変更頻度の高い複雑ファイルが負債の最優先返済対象*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **4象限の解釈**
- - 高複雑 × 高頻度 = **ホットスポット（最優先リファクタ対象）**
- - 高複雑 × 低頻度 = 「眠れる地雷」（急がないが管理が必要）


---

# 変更頻度 × 複雑度のホットスポット分析（2/2）（2/2）

> *変更頻度の高い複雑ファイルが負債の最優先返済対象*

- - 低複雑 × 高頻度 = 健全（よく変わるが単純）
- - 低複雑 × 低頻度 = 安定（放置可）
- 
- **実装**: `git log --format='%H' -- <file> | wc -l` × `lizard <file>`


---

# TypeScript: 複雑度計算の実装例

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- 複雑度とgit変更頻度からホットスポットスコアを算出する実装例


---

# TypeScript: 複雑度計算の実装例（コード例）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>


---

# TypeScript: 複雑度計算の実装例（コード例）（コード例）

```typescript
import { execSync } from 'node:child_process';

interface HotspotScore {
  file: string;
  cyclomaticComplexity: number;
  changeFrequency: number;
  hotspotScore: number;  // complexity × frequency
}

function calcChangeFrequency(file: string, weeks = 26): number {
  const since = new Date();
  since.setDate(since.getDate() - weeks * 7);
  const log = execSync(
    `git log --since='${since.toISOString()}' --format='%H' -- ${file}`
  ).toString();
  return log.trim().split('\n').filter(Boolean).length;
}

function calcCyclomaticComplexity(src: string): number {
  // Count decision points: if/else if/for/while/case/catch/&&/||
  const patterns = /\b(if|else if|for|while|case|catch)\b|&&|\|\|/g;
  return (src.match(patterns)?.length ?? 0) + 1;
}

function rankHotspots(files: string[]): HotspotScore[] {
  return files
    .map((file) => {
      const src = require('fs').readFileSync(file, 'utf-8');
      const cc = calcCyclomaticComplexity(src);
      const freq = calcChangeFrequency(file);
      return { file, cyclomaticComplexity: cc, changeFrequency: freq,
               hotspotScore: cc * freq };
    })
    .sort((a, b) => b.hotspotScore - a.hotspotScore);
}
```


---

# 依存グラフと循環依存（エントロピー爆発）（1/2）（1/2）

> *循環依存がモジュール独立性をゼロにし変更伝播を爆発させる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **循環依存 = 熱力学的な「閉じた系」**
- - A → B → C → A: 変更が環状に伝播し収束しない
- - 「どこからでも影響を受ける」= ミクロ状態数 Ω の爆発


---

# 依存グラフと循環依存（エントロピー爆発）（1/2）（2/2）

> *循環依存がモジュール独立性をゼロにし変更伝播を爆発させる*

- 
- **検出コマンド**
- ```bash
- npx madge --circular src/           # 循環依存の一覧


---

# 依存グラフと循環依存（エントロピー爆発）（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- npx dependency-cruiser --validate .dependency-cruiser.js src/
- ```
- 


---

# 依存グラフと循環依存（エントロピー爆発）（2/2）（2/2）

> *循環依存がモジュール独立性をゼロにし変更伝播を爆発させる*

- **対処法: 依存逆転（DIP）**
- - 具体的実装ではなくインターフェースに依存させる
- - 循環を「一方向グラフ」に変換してエントロピーを制限
- 
- **目標**: モジュール依存グラフが DAG（有向非巡回グラフ）であること


---

# DORA Metricsとエントロピーの関係

> *デプロイ頻度低下が技術的エントロピーの定量シグナル*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **4つのDORA Metrics（DevOps Research and Assessment）**
- 
| メトリクス | 低エントロピー組織 | 高エントロピー組織 |
|-----------|-----------------|-----------------|
| デプロイ頻度 | 毎日〜週複数回 | 月1回以下 |
| 変更リードタイム | 1時間〜1日 | 1週間〜1ヶ月 |
| **変更障害率** | **< 15%** | **> 45%** |
| 回復時間（MTTR） | < 1時間 | 1週間以上 |
- 
- **エントロピー解釈**
- - 変更障害率 ↑ = 変更の副作用が広がる = 依存エントロピーが高い
- - 回復時間 ↑ = 障害の原因特定が困難 = 構造エントロピーが高い


---

# SVG図: 技術的負債ダッシュボード構成（1/2）（1/2）

> *4指標のダッシュボードが返済優先度を可視化する*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.kv{font-family:sans-serif;font-size:22px;font-weight:bold;fill:#fff}.kl{font-family:sans-serif;font-size:11px;fill:#aaa}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>技術的負債 エントロピーダッシュボード</text>
-   <!-- KPI cards row 1 -->
-   <rect x='20' y='35' width='160' height='65' rx='6' fill='#1e3a5f'/>
-   <text x='100' y='57' text-anchor='middle' class='kl'>平均 Cyclomatic CC</text>
-   <text x='100' y='85' text-anchor='middle' class='kv' fill='#ef4444'>18.4</text>
-   <rect x='200' y='35' width='160' height='65' rx='6' fill='#1e3a5f'/>
-   <text x='280' y='57' text-anchor='middle' class='kl'>ホットスポット数</text>


---

# SVG図: 技術的負債ダッシュボード構成（1/2）（2/2）

> *4指標のダッシュボードが返済優先度を可視化する*

-   <text x='280' y='85' text-anchor='middle' class='kv' fill='#f97316'>23</text>
-   <rect x='380' y='35' width='160' height='65' rx='6' fill='#1e3a5f'/>
-   <text x='460' y='57' text-anchor='middle' class='kl'>循環依存</text>
-   <text x='460' y='85' text-anchor='middle' class='kv' fill='#ef4444'>7</text>
-   <rect x='560' y='35' width='160' height='65' rx='6' fill='#1e3a5f'/>
-   <text x='640' y='57' text-anchor='middle' class='kl'>変更障害率</text>
-   <text x='640' y='85' text-anchor='middle' class='kv' fill='#fbbf24'>32%</text>
-   <!-- hotspot bar chart -->
-   <text x='20' y='130' class='lb' fill='#aaa'>ホットスポット上位5ファイル（CC × 変更頻度）</text>
-   <rect x='20' y='140' width='500' height='14' rx='3' fill='#ef4444'/>
-   <text x='525' y='152' class='lb'>UserService.ts  (score: 840)</text>


---

# SVG図: 技術的負債ダッシュボード構成（2/2）（1/2）

> *4指標のダッシュボードが返済優先度を可視化する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
-   <rect x='20' y='162' width='390' height='14' rx='3' fill='#f97316'/>
-   <text x='525' y='174' class='lb'>OrderProcessor.ts  (score: 650)</text>
-   <rect x='20' y='184' width='300' height='14' rx='3' fill='#fbbf24'/>
-   <text x='525' y='196' class='lb'>PaymentGateway.ts  (score: 500)</text>
-   <rect x='20' y='206' width='220' height='14' rx='3' fill='#22c55e'/>
-   <text x='525' y='218' class='lb'>AuthMiddleware.ts  (score: 370)</text>
-   <rect x='20' y='228' width='150' height='14' rx='3' fill='#3b82f6'/>
-   <text x='525' y='240' class='lb'>CacheManager.ts  (score: 250)</text>
-   <!-- DORA metrics -->
-   <text x='20' y='275' class='lb' fill='#aaa'>DORA Metrics</text>
-   <rect x='20' y='285' width='165' height='55' rx='5' fill='#0f172a'/>


---

# SVG図: 技術的負債ダッシュボード構成（2/2）（2/2）

> *4指標のダッシュボードが返済優先度を可視化する*

-   <text x='102' y='305' text-anchor='middle' class='kl'>デプロイ頻度</text>
-   <text x='102' y='328' text-anchor='middle' class='lb' fill='#fbbf24'>週1〜2回</text>
-   <rect x='197' y='285' width='165' height='55' rx='5' fill='#0f172a'/>
-   <text x='279' y='305' text-anchor='middle' class='kl'>リードタイム</text>
-   <text x='279' y='328' text-anchor='middle' class='lb' fill='#fbbf24'>3〜5日</text>
-   <rect x='374' y='285' width='165' height='55' rx='5' fill='#0f172a'/>
-   <text x='456' y='305' text-anchor='middle' class='kl'>変更障害率</text>
-   <text x='456' y='328' text-anchor='middle' class='lb' fill='#ef4444'>32% ↑</text>
-   <rect x='551' y='285' width='165' height='55' rx='5' fill='#0f172a'/>
-   <text x='633' y='305' text-anchor='middle' class='kl'>MTTR</text>
-   <text x='633' y='328' text-anchor='middle' class='lb' fill='#fbbf24'>4時間</text>
- </svg>


---

<!-- _class: lead -->
# Part 4: リファクタリング・負債返済の実践戦略

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- エントロピーに「抵抗」するための具体的な手法


---

# ストラテジー1: ボーイスカウトルール（1/2）

> *触ったコードを毎回少しきれいにする累積効果*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **「キャンプ場を去るときには、来た時よりきれいにせよ」— ロバート・C・マーティン**
- 
- **実践: 触ったコードを少しだけ改善する**
- - バグ修正のついでに命名を改善
- - 機能追加のついでに関数を分割
- - 「ついで」の改善を PR レビューで称賛する文化


---

# ストラテジー1: ボーイスカウトルール（2/2）

> *触ったコードを毎回少しきれいにする累積効果*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- 
- **熱力学的意味**: 毎回少量のエネルギーを注入して、エントロピーの自然増大を相殺する
- 
- **計測**: Cognitive Complexity の週次トレンドをグラフ化
- - 上昇トレンド → ボーイスカウトが機能していない
- - 横ばい〜下降 → エネルギー投入が自然増大を上回っている


---

# ストラテジー2: ストラングラーフィグパターン（1/2）

> *既存コードを絞め殺しながら新設計に置き換える手法*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **由来**: 絞め殺しイチジクは宿主木を包み込みながら成長し、やがて宿主を置換する
- 
- **手順**
- 1. 新しい機能は新しいコンポーネントに実装する
- 2. レガシーコードへの呼び出しをファサード（Facade）で包む
- 3. 段階的にファサードの実装を新コードに差し替えていく


---

# ストラテジー2: ストラングラーフィグパターン（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- 4. レガシーが完全に包まれたら削除する
- 
- **エントロピー的意味**


---

# ストラテジー2: ストラングラーフィグパターン（2/2）（2/2）

> *既存コードを絞め殺しながら新設計に置き換える手法*

- - 高エントロピーな旧系を **隔離** し、低エントロピーな新系で置換
- - 全書き直し（Big Bang Rewrite）は失敗率が高い ← 系全体を一度に再構築はコスト過大
- 
- **適用条件**: レガシーAPIが明確に定義されていること


---

# ストラテジー3: ADR（Architecture Decision Records）（1/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- **ADR とは**: アーキテクチャ上の意思決定を記録するMarkdownドキュメント
- 
- **なぜエントロピー対策か？**


---

# ストラテジー3: ADR（Architecture Decision Records）（1/2）（2/2）

> *意思決定の背景を記録し将来の再発見コストをゼロにする*

- - 「なぜこの設計にしたか」の文脈が失われると、後から変更できなくなる
- - 文脈の消失 = 知識エントロピーの増大
- 
- **テンプレート**
- ```markdown


---

# ストラテジー3: ADR（Architecture Decision Records）（2/2）（1/2）

> *意思決定の背景を記録し将来の再発見コストをゼロにする*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- # ADR-0012: UserService のキャッシュ戦略
- Status: Accepted
- Context: 月次レポートのクエリが N+1 問題を引き起こしていた


---

# ストラテジー3: ADR（Architecture Decision Records）（2/2）（2/2）

> *意思決定の背景を記録し将来の再発見コストをゼロにする*

- Decision: Redis のスライディングウィンドウキャッシュを採用
- Consequences: キャッシュ整合性の責任をサービス層に持たせる
- ```
- 
- **保管場所**: `docs/adr/` にコードと同じリポジトリで管理する


---

# SVG図: 負債返済ロードマップ設計（1/2）（1/2）

> *ROI順の返済計画が90日以内に体感速度改善をもたらす*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.hd{font-family:sans-serif;font-size:12px;font-weight:bold;fill:#fff}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>負債返済ロードマップ（4フェーズ）</text>
-   <!-- Phase 1 -->
-   <rect x='20' y='40' width='160' height='290' rx='8' fill='#1e3a5f'/>
-   <rect x='20' y='40' width='160' height='36' rx='8' fill='#3b82f6'/>
-   <text x='100' y='64' text-anchor='middle' class='hd'>Phase 1</text>
-   <text x='100' y='96' text-anchor='middle' class='lb' fill='#93c5fd'>計測・可視化</text>
-   <text x='100' y='116' text-anchor='middle' class='lb'>（Sprint 1-2）</text>
-   <text x='35' y='145' class='lb'>• CC計測ツール導入</text>
-   <text x='35' y='163' class='lb'>• ホットスポット特定</text>
-   <text x='35' y='181' class='lb'>• 循環依存の洗い出し</text>


---

# SVG図: 負債返済ロードマップ設計（1/2）（2/2）

> *ROI順の返済計画が90日以内に体感速度改善をもたらす*

-   <text x='35' y='199' class='lb'>• DORA計測開始</text>
-   <text x='35' y='217' class='lb'>• ADRテンプレート設置</text>
-   <!-- Phase 2 -->
-   <rect x='200' y='40' width='160' height='290' rx='8' fill='#1e3a5f'/>
-   <rect x='200' y='40' width='160' height='36' rx='8' fill='#22c55e'/>
-   <text x='280' y='64' text-anchor='middle' class='hd'>Phase 2</text>
-   <text x='280' y='96' text-anchor='middle' class='lb' fill='#86efac'>隔離・安定化</text>
-   <text x='280' y='116' text-anchor='middle' class='lb'>（Sprint 3-6）</text>
-   <text x='215' y='145' class='lb'>• ホットスポストに</text>
-   <text x='215' y='163' class='lb'>  テスト追加</text>
-   <text x='215' y='181' class='lb'>• Strangler Facade</text>
-   <text x='215' y='199' class='lb'>  をレガシーに被せる</text>
-   <text x='215' y='217' class='lb'>• 循環依存を解消</text>
-   <text x='215' y='235' class='lb'>• モジュール境界整備</text>


---

# SVG図: 負債返済ロードマップ設計（2/2）（1/2）

> *ROI順の返済計画が90日以内に体感速度改善をもたらす*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
-   <!-- Phase 3 -->
-   <rect x='380' y='40' width='160' height='290' rx='8' fill='#1e3a5f'/>
-   <rect x='380' y='40' width='160' height='36' rx='8' fill='#f97316'/>
-   <text x='460' y='64' text-anchor='middle' class='hd'>Phase 3</text>
-   <text x='460' y='96' text-anchor='middle' class='lb' fill='#fed7aa'>置換・最適化</text>
-   <text x='460' y='116' text-anchor='middle' class='lb'>（Sprint 7-12）</text>
-   <text x='395' y='145' class='lb'>• Strangler実装を</text>
-   <text x='395' y='163' class='lb'>  新設計に移行</text>
-   <text x='395' y='181' class='lb'>• ボーイスカウト定着</text>
-   <text x='395' y='199' class='lb'>• 命名・型を統一</text>
-   <text x='395' y='217' class='lb'>• CC目標値を設定</text>
-   <!-- Phase 4 -->
-   <rect x='560' y='40' width='160' height='290' rx='8' fill='#1e3a5f'/>


---

# SVG図: 負債返済ロードマップ設計（2/2）（2/2）

> *ROI順の返済計画が90日以内に体感速度改善をもたらす*

-   <rect x='560' y='40' width='160' height='36' rx='8' fill='#8b5cf6'/>
-   <text x='640' y='64' text-anchor='middle' class='hd'>Phase 4</text>
-   <text x='640' y='96' text-anchor='middle' class='lb' fill='#c4b5fd'>予防・文化</text>
-   <text x='640' y='116' text-anchor='middle' class='lb'>（継続）</text>
-   <text x='575' y='145' class='lb'>• CIにCC閾値ゲート</text>
-   <text x='575' y='163' class='lb'>• 週次エントロピー</text>
-   <text x='575' y='181' class='lb'>  レポート</text>
-   <text x='575' y='199' class='lb'>• ホットスポット</text>
-   <text x='575' y='217' class='lb'>  ゼロ目標</text>
-   <text x='575' y='235' class='lb'>• ADR義務化</text>
-   <!-- arrows between phases -->
-   <polygon points='186,185 198,179 198,191' fill='#aaa'/>
-   <polygon points='366,185 378,179 378,191' fill='#aaa'/>
-   <polygon points='546,185 558,179 558,191' fill='#aaa'/>
- </svg>


---

# リファクタリングの「冷却」サイクル（1/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- **熱力学アナロジー：冷却には時間とエネルギーが必要**
- 
- **Sprint配分のモデル**


---

# リファクタリングの「冷却」サイクル（1/2）（2/2）

> *機能追加と整理の交互サイクルが品質を安定させる*

- - 開発 70% / リファクタリング 20% / 探索・学習 10%（Google '20%ルール'）
- - ただし「リファクタリング専用スプリント」は危険 ← ビジネス価値ゼロに見える
- 
- **推奨**: 機能開発と一体化（ボーイスカウト＋ホットスポット優先）


---

# リファクタリングの「冷却」サイクル（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- 
- **「技術的負債の利子」を計算する**
- - 変更1件あたりの余計な工数 × 変更頻度 = 月次コスト


---

# リファクタリングの「冷却」サイクル（2/2）（2/2）

> *機能追加と整理の交互サイクルが品質を安定させる*

- - これがリファクタリング投資の上限額
- 
- **ステークホルダーへの伝え方**
- 「CC=30のモジュールは CC=8に比べて変更コストが約4倍かかっています」


---

# TypeScript: 依存性逆転で結合度を下げる

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- 依存性逆転（DIP）でモジュール間の循環依存を解消する実装例


---

# TypeScript: 依存性逆転で結合度を下げる（コード例）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>


---

# TypeScript: 依存性逆転で結合度を下げる（コード例）（コード例）

```typescript
// Before: 高エントロピー（UserService が DB に直接依存）
class UserService {
  private db = new PostgresDatabase();  // 具象クラスに依存
  async getUser(id: string) {
    return this.db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  }
}

// After: 低エントロピー（インターフェース経由で依存を反転）
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class UserService {
  constructor(private repo: UserRepository) {}  // 抽象に依存
  async getUser(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }
}

// テスト時は MockUserRepository を注入
// 本番は PostgresUserRepository を注入
// → 変更の伝播が止まり、Connascence が CoN（最弱）に削減
```


---

# テストはエントロピーの「断熱材」（1/2）

> *テストカバレッジが変更による意図しない劣化を防止する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- **断熱材の役割**: 内部の秩序を外部環境の乱れから守る
- 
- **テストスイートの「断熱効果」**
- - 変更後にテストが通る → 秩序が維持されたことの証明
- - テストがない = 変更がエントロピーを増大させてもフィードバックがない
- 


---

# テストはエントロピーの「断熱材」（2/2）

> *テストカバレッジが変更による意図しない劣化を防止する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- **テストピラミッドとエントロピー**
- - ユニットテスト（底辺）: 局所的エントロピーをチェック
- - インテグレーションテスト（中段）: モジュール間のエントロピー伝播を検知
- - E2Eテスト（頂点）: システム全体のエントロピー増大を検知（遅い）
- 
- **目標**: カバレッジよりも「変更が壊れたことを即座に検知できる」テスト設計


---

# モジュール境界でエントロピーを閉じ込める（1/2）（1/2）

> *凝集性の高いモジュールが複雑性の伝播を遮断する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **物理学のアナロジー：断熱壁で系を分割する**
- - 壁があることで、一方の系のエントロピー増大が他方に伝播しない
- - 宇宙全体のエントロピーは増大しても、箱の中は管理できる


---

# モジュール境界でエントロピーを閉じ込める（1/2）（2/2）

> *凝集性の高いモジュールが複雑性の伝播を遮断する*

- 
- **モジュール境界の設計原則**
- - 公開APIは最小限（Public Surface）← 壁の「穴」を小さくする
- - 内部実装は隠蔽（詳細は変わりやすい = 高エントロピー源）
- - 依存方向は単一方向（DAG）


---

# モジュール境界でエントロピーを閉じ込める（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- 
- **Barrel Export の罠**
- ```typescript


---

# モジュール境界でエントロピーを閉じ込める（2/2）（2/2）

> *凝集性の高いモジュールが複雑性の伝播を遮断する*

- // NG: すべてを公開 → 壁に無数の穴
- export * from './internal';
- // OK: 意図した公開APIのみ
- export { UserService } from './user-service';
- ```


---

# TypeScript: モジュール境界チェックの実装

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- 依存クルーザーを使ったモジュール境界の自動検証設定例


---

# TypeScript: モジュール境界チェックの実装（コード例）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>


---

# TypeScript: モジュール境界チェックの実装（コード例）（コード例）

```javascript
// .dependency-cruiser.js — 許可される依存方向を宣言
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies increase entropy',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-cross-domain',
      severity: 'warn',
      comment: 'Domain A must not import from Domain B directly',
      from: { path: '^src/domain-a' },
      to: { path: '^src/domain-b' },
    },
    {
      name: 'no-infrastructure-in-domain',
      severity: 'error',
      comment: 'Domain layer must not depend on infrastructure',
      from: { path: '^src/domain' },
      to: { path: '^src/infrastructure' },
    },
  ],
  options: { tsPreCompilationDeps: true },
};
```


---

# SVG図: マイクロサービスによるエントロピー隔離（1/2）（1/2）

> *サービス境界がエントロピーを局所化し全体を守る*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.hd{font-family:sans-serif;font-size:12px;font-weight:bold;fill:#fff}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>モジュール境界によるエントロピー隔離</text>
-   <!-- Monolith -->
-   <rect x='20' y='40' width='320' height='300' rx='8' fill='#1e293b' stroke='#ef4444' stroke-width='2'/>
-   <text x='180' y='62' text-anchor='middle' class='hd' fill='#ef4444'>モノリス（高エントロピー）</text>
-   <rect x='40' y='75' width='260' height='50' rx='4' fill='#7f1d1d' opacity='0.9'/>


---

# SVG図: マイクロサービスによるエントロピー隔離（1/2）（2/2）

> *サービス境界がエントロピーを局所化し全体を守る*

-   <text x='170' y='105' text-anchor='middle' class='lb'>UserService（CC=28, 循環依存あり）</text>
-   <rect x='40' y='135' width='260' height='50' rx='4' fill='#7f1d1d' opacity='0.9'/>
-   <text x='170' y='165' text-anchor='middle' class='lb'>OrderService（CC=35, テストなし）</text>
-   <rect x='40' y='195' width='260' height='50' rx='4' fill='#7f1d1d' opacity='0.9'/>
-   <text x='170' y='225' text-anchor='middle' class='lb'>PaymentService（CC=22, 密結合）</text>
-   <text x='170' y='275' text-anchor='middle' class='lb' fill='#ef4444'>→ 1箇所の変更が全体に伝播</text>
-   <text x='170' y='295' text-anchor='middle' class='lb' fill='#ef4444'>→ エントロピーが共有される</text>
-   <!-- Arrow -->
-   <polygon points='350,185 370,179 370,191' fill='#22c55e'/>
-   <text x='360' y='177' text-anchor='middle' class='lb' fill='#22c55e'>分割</text>


---

# SVG図: マイクロサービスによるエントロピー隔離（2/2）（1/2）

> *サービス境界がエントロピーを局所化し全体を守る*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
-   <!-- Microservices -->
-   <rect x='385' y='40' width='350' height='300' rx='8' fill='#0f172a' stroke='#22c55e' stroke-width='2'/>
-   <text x='560' y='62' text-anchor='middle' class='hd' fill='#22c55e'>マイクロサービス（隔離）</text>
-   <rect x='400' y='75' width='140' height='65' rx='4' fill='#14532d' stroke='#22c55e' stroke-width='1'/>
-   <text x='470' y='102' text-anchor='middle' class='lb'>User MS</text>
-   <text x='470' y='118' text-anchor='middle' class='lb' fill='#86efac'>CC=8, 境界明確</text>
-   <rect x='555' y='75' width='140' height='65' rx='4' fill='#14532d' stroke='#22c55e' stroke-width='1'/>
-   <text x='625' y='102' text-anchor='middle' class='lb'>Order MS</text>
-   <text x='625' y='118' text-anchor='middle' class='lb' fill='#86efac'>CC=12, API明確</text>


---

# SVG図: マイクロサービスによるエントロピー隔離（2/2）（2/2）

> *サービス境界がエントロピーを局所化し全体を守る*

-   <rect x='400' y='155' width='140' height='65' rx='4' fill='#14532d' stroke='#22c55e' stroke-width='1'/>
-   <text x='470' y='182' text-anchor='middle' class='lb'>Payment MS</text>
-   <text x='470' y='198' text-anchor='middle' class='lb' fill='#86efac'>CC=10, 独立</text>
-   <rect x='555' y='155' width='140' height='65' rx='4' fill='#1e3a5f' stroke='#3b82f6' stroke-width='1'/>
-   <text x='625' y='182' text-anchor='middle' class='lb'>Notif MS</text>
-   <text x='625' y='198' text-anchor='middle' class='lb' fill='#93c5fd'>CC=6, 新設計</text>
-   <text x='560' y='265' text-anchor='middle' class='lb' fill='#22c55e'>→ 変更は各サービス内に閉じる</text>
-   <text x='560' y='285' text-anchor='middle' class='lb' fill='#22c55e'>→ エントロピーが隔離される</text>
-   <!-- API Gateway label -->
-   <text x='560' y='330' text-anchor='middle' class='lb' fill='#aaa'>API Gateway / Event Bus で疎結合通信</text>
- </svg>


---

# ワークショップ演習：あなたのシステムのエントロピーマップ（1/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **15分間の演習**
- 
- **Step 1: 現状スキャン（5分）**


---

# ワークショップ演習：あなたのシステムのエントロピーマップ（1/2）（2/2）

> *自システムの複雑度マップを30分で作成できる*

- - 自チームのリポジトリで最もホットスポットだと感じるモジュールを3つ挙げよ
- - 「変更のたびに怖い」「誰も触りたがらない」ファイルを特定する
- 
- **Step 2: エントロピー分類（5分）**


---

# ワークショップ演習：あなたのシステムのエントロピーマップ（2/2）（1/2）

> *自システムの複雑度マップを30分で作成できる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- - それぞれのモジュールについて：
-   - Accidental（偶発的）か Essential（本質的）か？
-   - 孤立系化しているか？（テストなし・文書なし・知っている人がいない）


---

# ワークショップ演習：あなたのシステムのエントロピーマップ（2/2）（2/2）

> *自システムの複雑度マップを30分で作成できる*

- 
- **Step 3: ロードマップ設計（5分）**
- - 最優先ホットスポットに対する3アクションを書き出す
- - 「今日から始められること」を1つ決める


---

<!-- _class: lead -->
# Part 5: 組織・プロセス・パターン比較事例

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- エントロピーは個人ではなく組織とプロセスによって決まる


---

# コンウェイの法則：組織構造がエントロピーを決める（1/2）

> *チーム境界がシステム境界となり負債の形を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- **コンウェイの法則（1968年）**
- 「システムを設計する組織は、その組織のコミュニケーション構造を写したシステムを作る」
- 
- **エントロピー解釈**
- - 組織のコミュニケーション経路 = コードの依存グラフ
- - 部門間のサイロ = モジュール間の不明確な境界


---

# コンウェイの法則：組織構造がエントロピーを決める（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- - 情報が流れない組織 = 知識エントロピーが高い組織
- 
- **逆コンウェイ戦略（Inverse Conway Maneuver）**


---

# コンウェイの法則：組織構造がエントロピーを決める（2/2）（2/2）

> *チーム境界がシステム境界となり負債の形を決める*

- - 欲しいアーキテクチャに合わせてチームを設計する
- - マイクロサービス採用 → まずサービス単位でチームを分割する
- 
- **実践**: Team Topologies の4チームタイプ（Stream-aligned / Platform / Enabling / Complicated Subsystem）


---

# チームのエントロピー：人員入れ替えとコード劣化（1/2）

> *メンバー交代ごとに文脈損失がコード品質を下げる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- **知識の「蒸発」とエントロピー**
- - チームメンバーの退職・異動 → 暗黙知が失われる = 知識エントロピー増大
- - 新しいメンバーが既存コードの「意図」を把握できない → 複雑な修正が増える
- 
- **Bus Factor（バスファクター）**
- - 「バスに轢かれた場合にプロジェクトが停止する人数」


---

# チームのエントロピー：人員入れ替えとコード劣化（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- - Bus Factor = 1 → 極めて高い知識エントロピーの警告サイン
- 
- **対策**


---

# チームのエントロピー：人員入れ替えとコード劣化（2/2）（2/2）

> *メンバー交代ごとに文脈損失がコード品質を下げる*

- - ADR でアーキテクチャ意図を記録
- - ペアプログラミング・モブプログラミングで知識を分散
- - コードレビューで「知識の共有」を必須プロセスに
- - オンボーディングドキュメントの定期更新


---

# SVG図: スプリントサイクルとエントロピーの増減（1/2）（1/2）

> *スプリント内の整理時間配分が長期品質を決める*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}.ax{stroke:#555;stroke-width:1.5;fill:none}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>スプリントサイクルとエントロピーの増減</text>
-   <!-- axes -->
-   <line x1='60' y1='300' x2='720' y2='300' class='ax'/>
-   <line x1='60' y1='50' x2='60' y2='300' class='ax'/>
-   <text x='390' y='340' text-anchor='middle' class='lb'>スプリント番号</text>


---

# SVG図: スプリントサイクルとエントロピーの増減（1/2）（2/2）

> *スプリント内の整理時間配分が長期品質を決める*

-   <text x='20' y='175' text-anchor='middle' class='lb' transform='rotate(-90,20,175)'>エントロピー</text>
-   <!-- Sprint cycles (saw-tooth with refactoring) -->
-   <path d='M60,260 L120,240 L120,255 L180,232 L180,248 L240,222 L240,218 L300,200 L300,215 L360,188 L360,185 L420,165 L420,162 L480,148 L480,145 L540,132 L540,128 L600,118 L600,114 L660,105' stroke='#3b82f6' stroke-width='2' fill='none'/>
-   <!-- no-refactoring curve -->
-   <path d='M60,260 Q200,200 400,130 Q550,80 660,60' stroke='#ef4444' stroke-width='1.5' stroke-dasharray='6,4' fill='none'/>
-   <!-- sprint phase labels -->
-   <text x='90' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S1</text>
-   <text x='150' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S2</text>
-   <text x='210' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S3</text>


---

# SVG図: スプリントサイクルとエントロピーの増減（2/2）（1/2）

> *スプリント内の整理時間配分が長期品質を決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
-   <text x='270' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S4</text>
-   <text x='330' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S5</text>
-   <text x='390' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S6</text>
-   <text x='450' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S7</text>
-   <text x='510' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S8</text>
-   <text x='570' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S9</text>
-   <text x='630' y='285' text-anchor='middle' class='lb' fill='#fbbf24'>S10</text>
-   <!-- refactoring drops annotation -->


---

# SVG図: スプリントサイクルとエントロピーの増減（2/2）（2/2）

> *スプリント内の整理時間配分が長期品質を決める*

-   <text x='120' y='228' class='lb' fill='#22c55e'>↓RF</text>
-   <text x='300' y='185' class='lb' fill='#22c55e'>↓RF</text>
-   <text x='480' y='118' class='lb' fill='#22c55e'>↓RF</text>
-   <!-- legend -->
-   <rect x='480' y='55' width='240' height='65' rx='5' fill='#1e293b' opacity='0.85'/>
-   <line x1='495' y1='78' x2='525' y2='78' stroke='#3b82f6' stroke-width='2'/>
-   <text x='532' y='82' class='lb'>定期RF込みのエントロピー</text>
-   <line x1='495' y1='100' x2='525' y2='100' stroke='#ef4444' stroke-width='1.5' stroke-dasharray='5,4'/>
-   <text x='532' y='104' class='lb'>RF無し（放置シナリオ）</text>
- </svg>


---

# レビュープロセスはエントロピーへの抵抗力（1/2）（1/2）

> *コードレビューが外部からのエネルギー注入として機能する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **コードレビューの熱力学的意味**
- - 「外部の目」= 外部エネルギー源
- - レビュアーが指摘 = エントロピー増大の事前防止


---

# レビュープロセスはエントロピーへの抵抗力（1/2）（2/2）

> *コードレビューが外部からのエネルギー注入として機能する*

- 
- **効果的なレビューの焦点（エントロピー視点）**
- - 命名の一貫性（情報エントロピーを下げる）
- - 新たな循環依存の導入を防ぐ（構造エントロピー）


---

# レビュープロセスはエントロピーへの抵抗力（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
- - 重複ロジックの指摘（Ω の増大を防ぐ）
- - 「なぜこの設計か」の説明を求める（知識エントロピー）
- 


---

# レビュープロセスはエントロピーへの抵抗力（2/2）（2/2）

> *コードレビューが外部からのエネルギー注入として機能する*

- **アンチパターン**
- - スタイルだけのレビュー（Formatter に任せるべき）
- - LGTM 連発（エントロピーを見逃す）
- - 「後でリファクタするから」承認（負債を正式に増やす）


---

# プラットフォームエンジニアリング：基盤的エントロピー制御（1/2）

> *共通基盤の高品質維持が全チームの負債蓄積を抑制する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- **プラットフォームエンジニアリングとは**
- - 開発チームが自律的にデプロイ・運用できる「舗装道路（Golden Path）」を構築
- 
- **エントロピー制御の仕組み**
- - テンプレートとスキャフォールディング → 開始状態の Ω を制限
- - 共通ライブラリ（ロギング・認証・観測性）→ 実装バリアントを減らす


---

# プラットフォームエンジニアリング：基盤的エントロピー制御（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- - CI/CDパイプライン → ゲートでエントロピー増大を自動検出
- 
- **効果**


---

# プラットフォームエンジニアリング：基盤的エントロピー制御（2/2）（2/2）

> *共通基盤の高品質維持が全チームの負債蓄積を抑制する*

- - 各チームが「ゼロから決める」バリアントを最小化 → Ω 抑制
- - 良い設計が「デフォルト」になる → エントロピー増大率が組織全体で下がる
- 
- **IDP（Internal Developer Platform）**: Backstage / Port / Cortex などのツール活用


---

# SVG図: 組織・プロセス・コードのエントロピー相互作用（1/2）（1/2）

> *3層のエントロピーが相互に増幅し合う構造を示す*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.hd{font-family:sans-serif;font-size:13px;font-weight:bold;fill:#fff}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>組織・プロセス・コードの3層エントロピーモデル</text>
-   <!-- Layer 3: Organization -->
-   <rect x='40' y='40' width='680' height='75' rx='8' fill='#1e3a5f' stroke='#3b82f6' stroke-width='1.5'/>


---

# SVG図: 組織・プロセス・コードのエントロピー相互作用（1/2）（2/2）

> *3層のエントロピーが相互に増幅し合う構造を示す*

-   <text x='380' y='65' text-anchor='middle' class='hd' fill='#93c5fd'>Layer 3: 組織エントロピー</text>
-   <text x='380' y='85' text-anchor='middle' class='lb'>チーム構造・コミュニケーション・知識分布・Bus Factor・意思決定速度</text>
-   <text x='380' y='103' text-anchor='middle' class='lb' fill='#60a5fa'>制御手段: Team Topologies, ADR, ドキュメント, ペアプロ</text>
-   <!-- Arrow down -->
-   <polygon points='375,122 385,122 380,136' fill='#aaa'/>
-   <!-- Layer 2: Process -->
-   <rect x='40' y='143' width='680' height='75' rx='8' fill='#1e293b' stroke='#f97316' stroke-width='1.5'/>


---

# SVG図: 組織・プロセス・コードのエントロピー相互作用（2/2）（1/2）

> *3層のエントロピーが相互に増幅し合う構造を示す*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
-   <text x='380' y='168' text-anchor='middle' class='hd' fill='#fed7aa'>Layer 2: プロセスエントロピー</text>
-   <text x='380' y='188' text-anchor='middle' class='lb'>スプリント設計・レビュー文化・CI/CD・デプロイ頻度・変更障害率</text>
-   <text x='380' y='206' text-anchor='middle' class='lb' fill='#fb923c'>制御手段: DORA計測, ボーイスカウト文化, プラットフォームエンジニアリング</text>
-   <!-- Arrow down -->
-   <polygon points='375,225 385,225 380,239' fill='#aaa'/>
-   <!-- Layer 1: Code -->
-   <rect x='40' y='246' width='680' height='75' rx='8' fill='#0f172a' stroke='#22c55e' stroke-width='1.5'/>


---

# SVG図: 組織・プロセス・コードのエントロピー相互作用（2/2）（2/2）

> *3層のエントロピーが相互に増幅し合う構造を示す*

-   <text x='380' y='271' text-anchor='middle' class='hd' fill='#86efac'>Layer 1: コードエントロピー</text>
-   <text x='380' y='291' text-anchor='middle' class='lb'>Cyclomatic Complexity・循環依存・Connascence・情報エントロピー</text>
-   <text x='380' y='309' text-anchor='middle' class='lb' fill='#4ade80'>制御手段: Strangler Fig, DIP, モジュール境界, テスト断熱材</text>
-   <!-- feedback arrow up -->
-   <text x='715' y='195' text-anchor='middle' class='lb' fill='#aaa' transform='rotate(90,715,195)'>← フィードバック（ボトムアップ）</text>
-   <line x1='723' y1='320' x2='723' y2='68' stroke='#555' stroke-width='1' stroke-dasharray='4,3'/>
-   <polygon points='718,68 728,68 723,55' fill='#555'/>
- </svg>


---

# 事例比較：低エントロピー組織 vs 高エントロピー組織

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
| 観点 | 低エントロピー組織 | 高エントロピー組織 |
|-----|----------------|----------------|
| デプロイ | 毎日・自動 | 月1回・手動承認 |
| レビュー | 設計議論あり | LGTM多発 |
| ドキュメント | ADRがコミット | 口伝のみ |
| 新人参加 | 2週間で独立 | 3ヶ月間影響待ち |
| 障害対応 | 原因特定 < 1時間 | 数日間迷走 |
| リファクタ | 機能に組み込み | 「いつかやる」 |
- 
- **典型的な転落パターン**
- 「初期は低エントロピー → 急成長期に人員増加 → 秩序が追いつかず高エントロピー化」


---

# DDD：境界コンテキストはエントロピーの「容器」（1/2）

> *ドメイン境界がエントロピーを意味的に閉じ込める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **ドメイン駆動設計（DDD）のBounded Context**
- - 同じ言葉が異なるドメインで異なる意味を持つことを明示的に扱う
- - 例：「注文」は受注管理と配送管理で構造が異なる
- 
- **エントロピー的意味**
- - Bounded Context = 「容器」でエントロピーを閉じ込める


---

# DDD：境界コンテキストはエントロピーの「容器」（2/2）

> *ドメイン境界がエントロピーを意味的に閉じ込める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- - Context Map でドメイン間の依存を管理 → 相互エントロピー伝播を防ぐ
- - Ubiquitous Language = そのContext内の情報エントロピーを最小化する共通言語
- 
- **マイクロサービスとの関係**
- - 「1マイクロサービス = 1Bounded Context」が基本原則
- - ただし Context の境界が曖昧なまま分割すると逆にエントロピーが増大する


---

<!-- _class: lead -->
# Part 6: まとめ・Q&A

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- エントロピーフレームワークで技術的負債を再定義する


---

# SVG図: エントロピーと技術的負債の統一フレームワーク（1/2）（1/2）

> *全概念を1図に統合した設計判断の参照フレーム*

- <svg viewBox='0 0 760 360' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns='http://www.w3.org/2000/svg'>
-   <defs>
-     <style>.lb{font-family:sans-serif;font-size:11px;fill:#ddd}.hd{font-family:sans-serif;font-size:12px;font-weight:bold;fill:#fff}.tt{font-family:sans-serif;font-size:14px;font-weight:bold;fill:#fff}</style>
-   </defs>
-   <text x='380' y='22' text-anchor='middle' class='tt'>エントロピー・技術的負債 統一フレームワーク</text>
-   <!-- Center circle: Second Law -->
-   <circle cx='380' cy='185' r='60' fill='#1e3a5f' stroke='#3b82f6' stroke-width='2'/>
-   <text x='380' y='178' text-anchor='middle' class='hd' fill='#93c5fd'>熱力学</text>
-   <text x='380' y='194' text-anchor='middle' class='hd' fill='#93c5fd'>第二法則</text>


---

# SVG図: エントロピーと技術的負債の統一フレームワーク（1/2）（2/2）

> *全概念を1図に統合した設計判断の参照フレーム*

-   <text x='380' y='210' text-anchor='middle' class='lb'>ΔS ≥ 0</text>
-   <!-- Node: Measure -->
-   <rect x='20' y='60' width='145' height='55' rx='6' fill='#14532d' stroke='#22c55e' stroke-width='1.5'/>
-   <text x='92' y='83' text-anchor='middle' class='hd' fill='#86efac'>計測</text>
-   <text x='92' y='100' text-anchor='middle' class='lb'>CC・認知的複雑度</text>
-   <text x='92' y='114' text-anchor='middle' class='lb'>ホットスポット分析</text>
-   <!-- Node: Isolate -->
-   <rect x='595' y='60' width='145' height='55' rx='6' fill='#78350f' stroke='#f97316' stroke-width='1.5'/>
-   <text x='667' y='83' text-anchor='middle' class='hd' fill='#fed7aa'>隔離</text>
-   <text x='667' y='100' text-anchor='middle' class='lb'>Bounded Context</text>


---

# SVG図: エントロピーと技術的負債の統一フレームワーク（2/2）（1/2）

> *全概念を1図に統合した設計判断の参照フレーム*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">テストカバレッジと技術的負債の相関</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">テストカバレッジ (%)</text>
  <text x="28" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,28,200)">技術的負債スコア</text>
  <!-- X axis ticks -->
  <line x1="80" y1="320" x2="80" y2="326" stroke="#888" stroke-width="1"/>
  <text x="80" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">0%</text>
  <line x1="240" y1="320" x2="240" y2="326" stroke="#888" stroke-width="1"/>
  <text x="240" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">25%</text>
  <line x1="400" y1="320" x2="400" y2="326" stroke="#888" stroke-width="1"/>
  <text x="400" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">50%</text>
  <line x1="560" y1="320" x2="560" y2="326" stroke="#888" stroke-width="1"/>
  <text x="560" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">75%</text>
  <line x1="720" y1="320" x2="720" y2="326" stroke="#888" stroke-width="1"/>
  <text x="720" y="338" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">100%</text>
  <!-- Scatter points (inverse correlation) -->
  <circle cx="90" cy="85" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="110" cy="100" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="130" cy="95" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="160" cy="120" r="6" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="135" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="240" cy="150" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="290" cy="170" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="340" cy="185" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="390" cy="200" r="6" fill="#ff9800" fill-opacity="0.8"/>
  <circle cx="440" cy="220" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="490" cy="240" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="540" cy="255" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="600" cy="270" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="660" cy="290" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <circle cx="700" cy="300" r="6" fill="#4caf50" fill-opacity="0.8"/>
  <!-- Trend line -->
  <line x1="85" y1="88" x2="710" y2="300" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="500" y="200" fill="#f9a825" font-size="13" font-family="sans-serif">負の相関: r ≈ -0.87</text>
  <!-- Zone labels -->
  <rect x="82" y="62" width="120" height="30" rx="5" fill="#e91e63" fill-opacity="0.15"/>
  <text x="142" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高負債ゾーン</text>
  <rect x="590" y="280" width="120" height="30" rx="5" fill="#4caf50" fill-opacity="0.15"/>
  <text x="650" y="300" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">低負債ゾーン</text>
</svg>
-   <text x='667' y='114' text-anchor='middle' class='lb'>モジュール境界・DIP</text>
-   <!-- Node: Inject Energy -->
-   <rect x='20' y='265' width='145' height='55' rx='6' fill='#581c87' stroke='#a855f7' stroke-width='1.5'/>
-   <text x='92' y='288' text-anchor='middle' class='hd' fill='#d8b4fe'>エネルギー投入</text>
-   <text x='92' y='305' text-anchor='middle' class='lb'>Refactoring</text>
-   <text x='92' y='319' text-anchor='middle' class='lb'>ボーイスカウト</text>
-   <!-- Node: Culture -->
-   <rect x='595' y='265' width='145' height='55' rx='6' fill='#1e3a5f' stroke='#3b82f6' stroke-width='1.5'/>
-   <text x='667' y='288' text-anchor='middle' class='hd' fill='#93c5fd'>文化・組織</text>


---

# SVG図: エントロピーと技術的負債の統一フレームワーク（2/2）（2/2）

> *全概念を1図に統合した設計判断の参照フレーム*

-   <text x='667' y='305' text-anchor='middle' class='lb'>Conway対策・ADR</text>
-   <text x='667' y='319' text-anchor='middle' class='lb'>Platform Engineering</text>
-   <!-- Lines from center to nodes -->
-   <line x1='325' y1='155' x2='165' y2='105' stroke='#aaa' stroke-width='1'/>
-   <line x1='435' y1='155' x2='595' y2='105' stroke='#aaa' stroke-width='1'/>
-   <line x1='325' y1='215' x2='165' y2='275' stroke='#aaa' stroke-width='1'/>
-   <line x1='435' y1='215' x2='595' y2='275' stroke='#aaa' stroke-width='1'/>
-   <!-- outer ring label -->
-   <text x='380' y='355' text-anchor='middle' class='lb' fill='#aaa'>4要素の組み合わせで技術的負債に抵抗する</text>
- </svg>


---

# 3つの原則：測れ・隔離せよ・注エネルギーし続けよ（1/2）（1/2）

> *この3原則を守ればエントロピーの増大を制御できる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">クリーンアーキテクチャとエントロピーゾーン</text>
  <!-- Concentric circles representing layers -->
  <!-- Outer: Infrastructure (high entropy risk) -->
  <circle cx="400" cy="215" r="155" fill="#e91e63" fill-opacity="0.12" stroke="#e91e63" stroke-width="2"/>
  <text x="540" y="100" fill="#e91e63" font-size="13" font-family="sans-serif">Infrastructure</text>
  <text x="540" y="116" fill="#e91e63" font-size="11" font-family="sans-serif">（高エントロピーリスク）</text>
  <!-- Interface adapters -->
  <circle cx="400" cy="215" r="115" fill="#ff9800" fill-opacity="0.12" stroke="#ff9800" stroke-width="2"/>
  <text x="503" y="148" fill="#ff9800" font-size="12" font-family="sans-serif">Interface Adapters</text>
  <!-- Use cases -->
  <circle cx="400" cy="215" r="75" fill="#f9a825" fill-opacity="0.12" stroke="#f9a825" stroke-width="2"/>
  <text x="448" y="183" fill="#f9a825" font-size="12" font-family="sans-serif">Use Cases</text>
  <!-- Entities (low entropy, stable) -->
  <circle cx="400" cy="215" r="40" fill="#4caf50" fill-opacity="0.3" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="211" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Entities</text>
  <text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-family="sans-serif">（安定）</text>
  <!-- Dependency arrows pointing inward -->
  <line x1="560" y1="215" x2="450" y2="215" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
  <polygon points="450,215 463,209 463,221" fill="#ffffff" fill-opacity="0.4"/>
  <!-- Legend on left -->
  <rect x="45" y="280" width="16" height="16" rx="3" fill="#4caf50"/>
  <text x="68" y="293" fill="#ffffff" font-size="12" font-family="sans-serif">低エントロピー（変化少）</text>
  <rect x="45" y="305" width="16" height="16" rx="3" fill="#e91e63"/>
  <text x="68" y="318" fill="#ffffff" font-size="12" font-family="sans-serif">高エントロピーリスク（変化多）</text>
  <!-- Rule -->
  <text x="400" y="370" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">依存は内側へ。エントロピーは外側に閉じ込める。</text>
</svg>
- **原則1：測れ（Measure）**
- - 見えないエントロピーは管理できない
- - Cyclomatic Complexity / Cognitive Complexity / DORA Metrics を継続計測


---

# 3つの原則：測れ・隔離せよ・注エネルギーし続けよ（1/2）（2/2）

> *この3原則を守ればエントロピーの増大を制御できる*

- - ホットスポットマップを週次で更新し、チームで共有する
- 
- **原則2：隔離せよ（Isolate）**
- - 高エントロピーな領域を他の系から切り離す


---

# 3つの原則：測れ・隔離せよ・注エネルギーし続けよ（2/2）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">エントロピー蓄積：時間とともに増大する無秩序</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">時間（開発フェーズ）</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">エントロピー（無秩序度）</text>
  <!-- Entropy curve - rising exponential -->
  <polyline points="80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40" fill="none" stroke="#e91e63" stroke-width="3"/>
  <!-- Area fill -->
  <polygon points="80,320 80,310 150,305 220,295 290,278 360,255 430,225 500,188 570,145 640,95 710,40 710,320" fill="#e91e63" fill-opacity="0.15"/>
  <!-- Ideal flat line -->
  <line x1="80" y1="290" x2="710" y2="290" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Labels -->
  <text x="620" y="55" fill="#e91e63" font-size="13" font-family="sans-serif">実際の推移</text>
  <text x="620" y="280" fill="#4caf50" font-size="13" font-family="sans-serif">理想状態</text>
  <!-- Phase markers -->
  <line x1="260" y1="60" x2="260" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="60" x2="480" y2="320" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="170" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">初期</text>
  <text x="370" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">成長期</text>
  <text x="595" y="345" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">レガシー化</text>
</svg>
- - Bounded Context / モジュール境界 / Strangler Fig Pattern
- - 循環依存の排除は最優先のアーキテクチャ品質指標
- 


---

# 3つの原則：測れ・隔離せよ・注エネルギーし続けよ（2/2）（2/2）

> *この3原則を守ればエントロピーの増大を制御できる*

- **原則3：注エネルギーし続けよ（Inject Energy Continuously）**
- - リファクタリングは一時イベントではなく継続プロセス
- - スプリントごとにボーイスカウトコストを予算に組み込む
- - テスト・レビュー・ADR は「エネルギー貯蔵装置」


---

# 明日からできるアクションプラン（1/2）

> *今週中に複雑度計測を実行し返済対象1ファイルを決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">技術的負債：複利で増大するコスト</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="720" y2="320" stroke="#ffffff" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="320" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">経過時間</text>
  <text x="30" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" transform="rotate(-90,30,200)">返済コスト</text>
  <!-- Compound curve -->
  <polyline points="80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38" fill="none" stroke="#e91e63" stroke-width="3.5"/>
  <polygon points="80,320 80,315 140,312 200,307 260,299 320,285 380,265 440,237 500,200 560,155 620,100 680,38 680,320" fill="#e91e63" fill-opacity="0.2"/>
  <!-- Linear comparison -->
  <line x1="80" y1="315" x2="680" y2="200" stroke="#4caf50" stroke-width="2" stroke-dasharray="8,4"/>
  <!-- Arrow for compound effect -->
  <line x1="550" y1="155" x2="550" y2="210" stroke="#f9a825" stroke-width="2"/>
  <polygon points="550,145 544,162 556,162" fill="#f9a825"/>
  <text x="555" y="185" fill="#f9a825" font-size="12" font-family="sans-serif">複利効果</text>
  <text x="560" y="210" fill="#4caf50" font-size="12" font-family="sans-serif">線形返済（理想）</text>
  <text x="680" y="32" fill="#e91e63" font-size="12" font-family="sans-serif">実際のコスト</text>
  <!-- Tick marks y-axis -->
  <text x="70" y="324" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">0</text>
  <text x="70" y="200" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">中</text>
  <text x="70" y="80" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
</svg>
- **今週できること（工数0〜2時間）**
- - [ ] `npx madge --circular src/` を実行して循環依存の数を把握する
- - [ ] 最もホットスポットだと感じるファイルのCC値を計測する
- - [ ] `docs/adr/` ディレクトリを作って最初のADRを書く
- 
- **来月できること（1〜2スプリント）**


---

# 明日からできるアクションプラン（2/2）（1/2）

> *今週中に複雑度計測を実行し返済対象1ファイルを決める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">リファクタリングサイクル</text>
  <!-- Center circle -->
  <circle cx="400" cy="210" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">負債</text>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">管理</text>
  <!-- Four steps as rounded boxes -->
  <!-- Step 1: Identify (top) -->
  <rect x="300" y="60" width="200" height="54" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="400" y="83" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold" font-family="sans-serif">1. 識別</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">負債の発見・計測</text>
  <!-- Step 2: Plan (right) -->
  <rect x="570" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
  <text x="660" y="178" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold" font-family="sans-serif">2. 計画</text>
  <text x="660" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">優先度・ROI評価</text>
  <!-- Step 3: Refactor (bottom) -->
  <rect x="300" y="300" width="200" height="54" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="323" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">3. 実装</text>
  <text x="400" y="343" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">リファクタリング実施</text>
  <!-- Step 4: Verify (left) -->
  <rect x="50" y="155" width="180" height="54" rx="10" fill="#16213e" stroke="#ff9800" stroke-width="2"/>
  <text x="140" y="178" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold" font-family="sans-serif">4. 検証</text>
  <text x="140" y="198" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">品質確認・回帰テスト</text>
  <!-- Arrows (using polylines + polygons instead of markers) -->
  <!-- 1→2 top-right -->
  <line x1="490" y1="100" x2="590" y2="160" stroke="#ffffff" stroke-width="2"/>
  <polygon points="590,160 576,152 582,167" fill="#ffffff"/>
  <!-- 2→3 right-bottom -->
  <line x1="620" y1="205" x2="490" y2="306" stroke="#ffffff" stroke-width="2"/>
  <polygon points="490,306 498,293 507,306" fill="#ffffff"/>
  <!-- 3→4 bottom-left -->
  <line x1="310" y1="324" x2="225" y2="205" stroke="#ffffff" stroke-width="2"/>
  <polygon points="225,205 231,220 218,219" fill="#ffffff"/>
  <!-- 4→1 left-top -->
  <line x1="190" y1="158" x2="312" y2="107" stroke="#ffffff" stroke-width="2"/>
  <polygon points="312,107 299,112 302,97" fill="#ffffff"/>
</svg>
- - [ ] CI/CD に CC 閾値チェックを追加する（PR で CC > 15 を警告）
- - [ ] ホットスポット上位3ファイルにテストを追加する
- - [ ] チームで「ボーイスカウトルール」を明示的に合意する


---

# 明日からできるアクションプラン（2/2）（2/2）

> *今週中に複雑度計測を実行し返済対象1ファイルを決める*

- 
- **3ヶ月以内（組織的取り組み）**
- - [ ] 週次エントロピーレポートをチームダッシュボードに組み込む
- - [ ] Team Topologies の観点でチーム構造を見直す


---

# 参考文献・リソース（1/2）（1/2）

> *Martin・Feathers・Cunninghamの著作が理論と実践を網羅*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コード品質劣化タイムライン</text>
  <!-- Timeline axis -->
  <line x1="60" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="2"/>
  <!-- Arrow head -->
  <polygon points="740,200 724,193 724,207" fill="#ffffff"/>
  <!-- Quality metric bars (vertical from timeline) -->
  <!-- v1.0 -->
  <rect x="100" y="80" width="60" height="120" rx="4" fill="#4caf50" fill-opacity="0.85"/>
  <text x="130" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v1.0</text>
  <text x="130" y="72" text-anchor="middle" fill="#4caf50" font-size="12" font-family="sans-serif">高品質</text>
  <!-- v2.0 -->
  <rect x="220" y="120" width="60" height="80" rx="4" fill="#8bc34a" fill-opacity="0.85"/>
  <text x="250" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v2.0</text>
  <!-- v3.0 -->
  <rect x="340" y="150" width="60" height="50" rx="4" fill="#ff9800" fill-opacity="0.85"/>
  <text x="370" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v3.0</text>
  <!-- v4.0 -->
  <rect x="460" y="168" width="60" height="32" rx="4" fill="#ff5722" fill-opacity="0.85"/>
  <text x="490" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v4.0</text>
  <!-- v5.0 -->
  <rect x="580" y="182" width="60" height="18" rx="4" fill="#e91e63" fill-opacity="0.85"/>
  <text x="610" y="220" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">v5.0</text>
  <!-- Refactoring intervention -->
  <line x1="460" y1="60" x2="460" y2="190" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="462" y="58" fill="#f9a825" font-size="11" font-family="sans-serif">リファクタリング</text>
  <text x="462" y="71" fill="#f9a825" font-size="11" font-family="sans-serif">介入ポイント</text>
  <!-- Axis label -->
  <text x="745" y="204" fill="#ffffff" font-size="13" font-family="sans-serif">時間</text>
  <!-- Y-axis hint -->
  <text x="58" y="85" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">高</text>
  <text x="58" y="204" text-anchor="end" fill="#888" font-size="11" font-family="sans-serif">低</text>
  <line x1="60" y1="80" x2="60" y2="200" stroke="#555" stroke-width="1"/>
  <text x="10" y="150" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif" transform="rotate(-90,10,150)">コード品質</text>
  <!-- Debt label -->
  <text x="400" y="280" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">技術的負債は静かに・確実に蓄積する</text>
  <text x="400" y="305" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">放置すればするほど返済コストは増大する</text>
</svg>
- **書籍**
- - [Clean Code — Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- - [Your Code as a Crime Scene — Adam Thornhill](https://pragprog.com/titles/atcrime2/your-code-as-a-crime-scene-second-edition/)


---

# 参考文献・リソース（1/2）（2/2）

> *Martin・Feathers・Cunninghamの著作が理論と実践を網羅*

- - [Team Topologies — Skelton & Pais](https://teamtopologies.com/book)
- - [Accelerate — Nicole Forsgren et al.](https://itrevolution.com/accelerate-book/)
- 
- **論文・記事**


---

# 参考文献・リソース（2/2）（1/2）

> *Martin・Feathers・Cunninghamの著作が理論と実践を網羅*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">熱力学第二法則とコード：秩序 → 無秩序</text>
  <!-- Left box: Order -->
  <rect x="60" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="200" y="112" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">秩序ある状態</text>
  <!-- Clean code visualization -->
  <rect x="90" y="128" width="220" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="152" width="180" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <rect x="90" y="176" width="200" height="16" rx="4" fill="#4caf50" fill-opacity="0.4"/>
  <rect x="90" y="200" width="160" height="16" rx="4" fill="#4caf50" fill-opacity="0.6"/>
  <rect x="90" y="224" width="210" height="16" rx="4" fill="#4caf50" fill-opacity="0.5"/>
  <text x="200" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">整然としたコード構造</text>
  <text x="200" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">明確な責務・依存関係</text>
  <!-- Right box: Disorder -->
  <rect x="460" y="80" width="280" height="240" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="112" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">無秩序な状態</text>
  <!-- Messy code visualization -->
  <rect x="490" y="130" width="150" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="540" y="150" width="80" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <rect x="480" y="168" width="200" height="14" rx="3" fill="#e91e63" fill-opacity="0.6"/>
  <rect x="520" y="186" width="120" height="14" rx="3" fill="#e91e63" fill-opacity="0.3"/>
  <rect x="490" y="204" width="180" height="14" rx="3" fill="#e91e63" fill-opacity="0.5"/>
  <rect x="510" y="222" width="100" height="14" rx="3" fill="#e91e63" fill-opacity="0.4"/>
  <text x="600" y="274" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">絡み合う依存関係</text>
  <text x="600" y="293" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">不明確な責務・重複</text>
  <!-- Arrow in center -->
  <line x1="345" y1="200" x2="455" y2="200" stroke="#f9a825" stroke-width="3"/>
  <polygon points="455,200 439,193 439,207" fill="#f9a825"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">自然な</text>
  <text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">推移</text>
  <!-- Bottom note -->
  <text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="14" font-family="sans-serif">エネルギー（努力）を投入しなければ、秩序は維持できない</text>
</svg>
- - [Technical Debt — Ward Cunningham (1992)](http://c2.com/doc/oopsla92.html)
- - [A Taxonomy of Tech Debt — Martin Fowler](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
- - [Connascence — Meilir Page-Jones](https://connascence.io/)


---

# 参考文献・リソース（2/2）（2/2）

> *Martin・Feathers・Cunninghamの著作が理論と実践を網羅*

- 
- **ツール**
- - [Madge（循環依存検出）](https://github.com/pahen/madge)
- - [dependency-cruiser（依存ルール検証）](https://github.com/sverweij/dependency-cruiser)
- - [Lizard（CC計測）](https://github.com/terryyin/lizard)


---

<!-- _class: lead -->
# Q&A / ディスカッション

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold" font-family="sans-serif">コードクリーンアップ：Before / After</text>
  <!-- Before panel -->
  <rect x="40" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="90" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">Before（負債あり）</text>
  <!-- Tangled lines -->
  <line x1="80" y1="130" x2="240" y2="160" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="80" y1="150" x2="300" y2="130" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="100" y1="180" x2="270" y2="150" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="150" y1="200" x2="90" y2="170" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="200" y1="180" x2="110" y2="220" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="260" y1="190" x2="80" y2="210" stroke="#e91e63" stroke-opacity="0.6" stroke-width="1.5"/>
  <!-- Nodes -->
  <circle cx="80" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="240" cy="160" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="300" cy="130" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="150" cy="200" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="200" cy="230" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="270" cy="210" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <circle cx="80" cy="260" r="12" fill="#e91e63" fill-opacity="0.8"/>
  <text x="200" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">循環依存・密結合</text>
  <text x="200" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：高</text>
  <!-- After panel -->
  <rect x="440" y="60" width="320" height="290" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold" font-family="sans-serif">After（負債解消）</text>
  <!-- Clean layered structure -->
  <rect x="490" y="110" width="220" height="40" rx="6" fill="#4caf50" fill-opacity="0.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">プレゼンテーション層</text>
  <line x1="600" y1="150" x2="600" y2="165" stroke="#4caf50" stroke-width="2"/>
  <polygon points="600,165 594,152 606,152" fill="#4caf50"/>
  <rect x="490" y="168" width="220" height="40" rx="6" fill="#2196f3" fill-opacity="0.5"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ビジネスロジック層</text>
  <line x1="600" y1="208" x2="600" y2="223" stroke="#2196f3" stroke-width="2"/>
  <polygon points="600,223 594,210 606,210" fill="#2196f3"/>
  <rect x="490" y="226" width="220" height="40" rx="6" fill="#9c27b0" fill-opacity="0.5"/>
  <text x="600" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">データアクセス層</text>
  <text x="600" y="315" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">疎結合・明確な境界</text>
  <text x="600" y="335" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">変更コスト：低</text>
  <!-- Center arrow -->
  <line x1="365" y1="205" x2="435" y2="205" stroke="#f9a825" stroke-width="3"/>
  <polygon points="435,205 419,198 419,212" fill="#f9a825"/>
</svg>
- **ご質問・ディスカッション**
- 
- 「エントロピーは増大する。抵抗は可能だが、ゼロにはできない。
-  だから私たちはエンジニアであり続ける」
- 
- ありがとうございました

