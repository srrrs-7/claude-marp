---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "経路依存と技術ロックイン"
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
# QWERTYキーボードのロックイン
— なぜ非効率が生き残るのか

- タイプライターの時代に設計されたキー配列が今も使われる理由
- 切り替えコストと慣性が技術革新を阻む構造
- QWERTY・鉄道軌間・核兵器まで貫く経路依存の法則

<div class="fig">
<svg viewBox="0 0 800 220" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="220" fill="#1a1a2e" rx="12"/><text x="400" y="36" font-family="monospace" font-size="22" fill="#f9a825" text-anchor="middle" font-weight="bold">QWERTY — 1873年から変わらないキー配列</text><rect x="40" y="60" width="720" height="52" fill="#2d2d4e" rx="8"/><text x="65" y="93" font-family="monospace" font-size="28" fill="#e0e0e0" letter-spacing="10">Q W E R T Y U I O P</text><rect x="40" y="120" width="720" height="52" fill="#2d2d4e" rx="8"/><text x="80" y="153" font-family="monospace" font-size="28" fill="#e0e0e0" letter-spacing="10">A S D F G H J K L</text><rect x="40" y="180" width="720" height="32" fill="#2d2d4e" rx="6"/><text x="100" y="202" font-family="monospace" font-size="20" fill="#aaa" letter-spacing="14">Z X C V B N M</text></svg>
</div>


---

# アジェンダ

> *最適でない規格が一度定着すると技術的優位では覆せない仕組みを解明*

1. QWERTYの起源
2. Dvorak配列との比較
3. 切り替えコストと慣性
4. 他のロックイン事例
5. ロックインを破る条件


---

<!-- _class: invert lead -->
# QWERTYの起源


---

<!-- _class: invert fit-94 -->
# タイプライターの呪い（1/2）

> *キー絡まり防止の理由が消えてもQWERTYは慣性で生き残った*

- **QWERTY配列（1873年）：**
- クリストファー・ショールズがRemington社向けに設計
- **目的：キーの絡まり防止**
- 隣接するキーが連続して使われないようにあえて分散

<div class="fig">
<svg viewBox="0 0 800 280" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="280" fill="#1a1a2e" rx="12"/><text x="400" y="32" font-family="sans-serif" font-size="18" fill="#f9a825" text-anchor="middle" font-weight="bold">タイプライターのキー絡まりメカニズム</text><rect x="60" y="55" width="160" height="100" fill="#2d2d4e" rx="10" stroke="#f9a825" stroke-width="2"/><text x="140" y="95" font-family="sans-serif" font-size="14" fill="#e0e0e0" text-anchor="middle">連続するキー</text><text x="140" y="115" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">例: T-H-E</text><text x="140" y="135" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle">→ 絡まり発生!</text><polygon points="230,105 260,95 260,115" fill="#f9a825"/><line x1="220" y1="105" x2="260" y2="105" stroke="#f9a825" stroke-width="2"/><rect x="270" y="55" width="180" height="100" fill="#2d2d4e" rx="10" stroke="#e91e63" stroke-width="2"/><text x="360" y="90" font-family="sans-serif" font-size="14" fill="#e91e63" text-anchor="middle" font-weight="bold">機械的な問題</text><text x="360" y="110" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">打鍵アームが</text><text x="360" y="128" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">交差して詰まる</text><polygon points="460,105 490,95 490,115" fill="#f9a825"/><line x1="450" y1="105" x2="490" y2="105" stroke="#f9a825" stroke-width="2"/><rect x="500" y="55" width="180" height="100" fill="#2d2d4e" rx="10" stroke="#4caf50" stroke-width="2"/><text x="590" y="90" font-family="sans-serif" font-size="14" fill="#4caf50" text-anchor="middle" font-weight="bold">QWERTY解決策</text><text x="590" y="110" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">頻出ペアを</text><text x="590" y="128" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">意図的に分散配置</text><rect x="100" y="185" width="580" height="50" fill="#2d2d4e" rx="8" stroke="#e91e63" stroke-width="1" stroke-dasharray="6,3"/><text x="390" y="208" font-family="sans-serif" font-size="14" fill="#e91e63" text-anchor="middle" font-weight="bold">電動化・デジタル化でこの問題は消滅</text><text x="390" y="226" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">→ しかしQWERTYは「慣性」で生き残った</text></svg>
</div>


---

<!-- _class: invert fit-82 -->
# タイプライターの呪い（2/2）

> *最も使う文字がホームポジションにない—非効率が今も標準*

- 物理的なキー絡まりは存在しない → QWERTYの理由が消えた
- しかしQWERTYはそのまま引き継がれた
- ---
- **人間工学的な問題：**
- 最も使うキー（e, t, a, o）がホームポジションにない
- 左手に負荷が偏る（英語で左手57%、右手43%）
- 多くのタイピスト疾患の一因とされる


---

# Dvorak配列と切り替えコスト（1/2）

> *Dvorakは手の移動距離をQWERTYの1/3に削減するが誰も変えない*

- **Dvorak配列（1936年）：**
- 頻出文字をホームポジションに集中
- 英語で手の移動距離がQWERTYの1/3

<div class="fig">
<svg viewBox="0 0 800 300" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="300" fill="#1a1a2e" rx="12"/><text x="200" y="30" font-family="sans-serif" font-size="16" fill="#e91e63" text-anchor="middle" font-weight="bold">QWERTY</text><text x="600" y="30" font-family="sans-serif" font-size="16" fill="#4caf50" text-anchor="middle" font-weight="bold">Dvorak</text><rect x="20" y="42" width="360" height="38" fill="#2d2d4e" rx="6"/><text x="200" y="67" font-family="monospace" font-size="17" fill="#aaa" text-anchor="middle" letter-spacing="6">Q W E R T Y U I O P</text><rect x="20" y="86" width="360" height="38" fill="#3a2d2d" rx="6" stroke="#e91e63" stroke-width="2"/><text x="200" y="111" font-family="monospace" font-size="17" fill="#e91e63" text-anchor="middle" letter-spacing="7">A S D F G H J K L</text><rect x="20" y="130" width="360" height="38" fill="#2d2d4e" rx="6"/><text x="200" y="155" font-family="monospace" font-size="17" fill="#aaa" text-anchor="middle" letter-spacing="9">Z X C V B N M</text><rect x="420" y="42" width="360" height="38" fill="#2d2d4e" rx="6"/><text x="600" y="67" font-family="monospace" font-size="17" fill="#aaa" text-anchor="middle" letter-spacing="5">' , . P Y F G C R L</text><rect x="420" y="86" width="360" height="38" fill="#1a3a2d" rx="6" stroke="#4caf50" stroke-width="2"/><text x="600" y="111" font-family="monospace" font-size="17" fill="#4caf50" text-anchor="middle" letter-spacing="7">A O E U I D H T N S</text><rect x="420" y="130" width="360" height="38" fill="#2d2d4e" rx="6"/><text x="600" y="155" font-family="monospace" font-size="17" fill="#aaa" text-anchor="middle" letter-spacing="10">; Q J K X B M W V Z</text><text x="200" y="195" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle">ホームポジション使用率: 32%</text><text x="600" y="195" font-family="sans-serif" font-size="13" fill="#4caf50" text-anchor="middle">ホームポジション使用率: 70%</text><rect x="60" y="210" width="280" height="18" fill="#2d2d4e" rx="4"/><rect x="60" y="210" width="90" height="18" fill="#e91e63" rx="4"/><text x="200" y="243" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">手の移動距離: 100%</text><rect x="460" y="210" width="280" height="18" fill="#2d2d4e" rx="4"/><rect x="460" y="210" width="93" height="18" fill="#4caf50" rx="4"/><text x="600" y="243" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">手の移動距離: 33%</text><text x="400" y="278" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle">Dvorakはe, t, a, o, i をすべてホームポジションに配置</text></svg>
</div>


---

<!-- _class: invert fit-82 -->
# Dvorak配列と切り替えコスト（2/2）

> *切り替えコストとネットワーク効果が合理的な改善を阻む*

2. 互換性：他人のキーボードが使えなくなる
3. ネットワーク効果：全員が変えない限り変えると損
4. キーボード購入コスト
- ---
- **実際の効率差：**
- 複数の研究でDvorakが5〜10%速い程度
- 切り替えコストを上回る効果があるかは議論が続く


---

# 他のロックイン事例（1/2）

> *ローマ馬車幅から始まる鉄道軌間は数十兆円の変更コストで固定*

- **鉄道軌間（ゲージ）：**
- ローマの馬車幅（4フィート8.5インチ）がそのまま標準軌間に
- 日本は新幹線と在来線でゲージが違い新幹線に在来線直通不可

<div class="fig">
<svg viewBox="0 0 800 260" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="260" fill="#1a1a2e" rx="12"/><text x="400" y="28" font-family="sans-serif" font-size="16" fill="#f9a825" text-anchor="middle" font-weight="bold">経路依存性（Path Dependency）のメカニズム</text><rect x="30" y="45" width="140" height="50" fill="#2d2d4e" rx="8" stroke="#f9a825" stroke-width="2"/><text x="100" y="68" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">偶然の選択</text><text x="100" y="86" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">初期条件</text><polygon points="176,70 200,62 200,78" fill="#4caf50"/><line x1="170" y1="70" x2="200" y2="70" stroke="#4caf50" stroke-width="2"/><rect x="205" y="45" width="140" height="50" fill="#2d2d4e" rx="8" stroke="#4caf50" stroke-width="2"/><text x="275" y="68" font-family="sans-serif" font-size="13" fill="#4caf50" text-anchor="middle" font-weight="bold">採用・普及</text><text x="275" y="86" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">初期ユーザー増加</text><polygon points="351,70 375,62 375,78" fill="#4caf50"/><line x1="345" y1="70" x2="375" y2="70" stroke="#4caf50" stroke-width="2"/><rect x="380" y="45" width="140" height="50" fill="#2d2d4e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="450" y="68" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="bold">インフラ投資</text><text x="450" y="86" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">周辺技術・教育</text><polygon points="526,70 550,62 550,78" fill="#4caf50"/><line x1="520" y1="70" x2="550" y2="70" stroke="#4caf50" stroke-width="2"/><rect x="555" y="45" width="140" height="50" fill="#2d2d4e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="625" y="68" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle" font-weight="bold">ネットワーク効果</text><text x="625" y="86" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">価値が増大</text><line x1="625" y1="95" x2="625" y2="125" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,3"/><line x1="625" y1="125" x2="100" y2="125" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,3"/><polygon points="100,111 92,125 108,125" fill="#e91e63"/><text x="362" y="118" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">強化ループ（正のフィードバック）</text><rect x="30" y="145" width="740" height="45" fill="#2d2d4e" rx="8" stroke="#e91e63" stroke-width="2"/><text x="400" y="165" font-family="sans-serif" font-size="14" fill="#e91e63" text-anchor="middle" font-weight="bold">ロックイン完成</text><text x="400" y="182" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">代替技術が優れていても切り替えコストが利益を上回る → 現状維持</text><rect x="60" y="205" width="190" height="42" fill="#2d2d4e" rx="6"/><text x="155" y="222" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">QWERTY</text><text x="155" y="238" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">タイピスト教育インフラ</text><rect x="305" y="205" width="190" height="42" fill="#2d2d4e" rx="6"/><text x="400" y="222" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">標準軌間 1435mm</text><text x="400" y="238" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">世界の鉄道インフラ</text><rect x="550" y="205" width="190" height="42" fill="#2d2d4e" rx="6"/><text x="645" y="222" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle">COBOL</text><text x="645" y="238" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">金融系レガシーシステム</text></svg>
</div>


---

# 他のロックイン事例（2/2）（1/2）

> *COBOLとFAXは人材不足とネットワーク効果で廃止できない*

- Pythonに移行したくても「COBOLわかる人がいない」問題
- ---
- **FAX：**
- 日本の企業・行政でのFAX依存。電子化したくても全員が変えないと無意味


---

# 他のロックイン事例（2/2）（2/2）

- ---
- **電気の周波数（東日本50Hz vs 西日本60Hz）：**
- 明治時代にドイツ製・米国製発電機を別々に導入したまま

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e" rx="12"/><text x="400" y="28" font-family="sans-serif" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">ロックイン事例の比較</text><rect x="20" y="45" width="118" height="30" fill="#2d2d4e" rx="5"/><text x="79" y="65" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">事例</text><rect x="142" y="45" width="118" height="30" fill="#2d2d4e" rx="5"/><text x="201" y="65" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">起源</text><rect x="264" y="45" width="118" height="30" fill="#2d2d4e" rx="5"/><text x="323" y="65" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">問題</text><rect x="386" y="45" width="118" height="30" fill="#2d2d4e" rx="5"/><text x="445" y="65" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">切替コスト</text><rect x="508" y="45" width="118" height="30" fill="#2d2d4e" rx="5"/><text x="567" y="65" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">ネット効果</text><rect x="630" y="45" width="148" height="30" fill="#2d2d4e" rx="5"/><text x="704" y="65" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">解決見込み</text><rect x="20" y="79" width="118" height="28" fill="#1a3a2d" rx="4"/><text x="79" y="98" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle">QWERTY</text><rect x="142" y="79" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="201" y="98" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">1873年</text><rect x="264" y="79" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="323" y="98" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">効率低下</text><rect x="386" y="79" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="445" y="98" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">再学習数ヶ月</text><rect x="508" y="79" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="567" y="98" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">高い</text><rect x="630" y="79" width="148" height="28" fill="#2a2a3e" rx="4"/><text x="704" y="98" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">ほぼなし</text><rect x="20" y="111" width="118" height="28" fill="#1a3a2d" rx="4"/><text x="79" y="130" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle">鉄道軌間</text><rect x="142" y="111" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="201" y="130" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">ローマ時代</text><rect x="264" y="111" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="323" y="130" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">直通不可</text><rect x="386" y="111" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="445" y="130" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">数十兆円</text><rect x="508" y="111" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="567" y="130" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">非常に高い</text><rect x="630" y="111" width="148" height="28" fill="#2a2a3e" rx="4"/><text x="704" y="130" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">ほぼなし</text><rect x="20" y="143" width="118" height="28" fill="#1a3a2d" rx="4"/><text x="79" y="162" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle">COBOL/FAX</text><rect x="142" y="143" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="201" y="162" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">1950〜60年代</text><rect x="264" y="143" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="323" y="162" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">技術的負債</text><rect x="386" y="143" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="445" y="162" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">移行工数大</text><rect x="508" y="143" width="118" height="28" fill="#2a2a3e" rx="4"/><text x="567" y="162" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">中〜高</text><rect x="630" y="143" width="148" height="28" fill="#2a2a3e" rx="4"/><text x="704" y="162" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle">規制改革待ち</text><rect x="20" y="175" width="118" height="20" fill="#1a3a2d" rx="4"/><text x="79" y="189" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle">電源周波数</text><rect x="142" y="175" width="118" height="20" fill="#2a2a3e" rx="4"/><text x="201" y="189" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">明治時代</text><rect x="264" y="175" width="118" height="20" fill="#2a2a3e" rx="4"/><text x="323" y="189" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">50/60Hz分断</text><rect x="386" y="175" width="118" height="20" fill="#2a2a3e" rx="4"/><text x="445" y="189" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">数百兆円</text><rect x="508" y="175" width="118" height="20" fill="#2a2a3e" rx="4"/><text x="567" y="189" font-family="sans-serif" font-size="11" fill="#e0e0e0" text-anchor="middle">超高い</text><rect x="630" y="175" width="148" height="20" fill="#2a2a3e" rx="4"/><text x="704" y="189" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle">ほぼなし</text></svg>
</div>


---

<!-- _class: invert fit-76 -->
# まとめ：慣性を超える条件

> *ロックインを破るには圧倒的優位・強制調整・後方互換の3条件が必要*

- ✅ **QWERTYは「悪い技術が生き残る」経路依存の象徴**
- ✅ **切り替えコスト + ネットワーク効果 = ロックイン**
- ✅ **鉄道・COBOL・FAX・電源周波数でも同じ構造**
- ✅ **ロックインを破る条件：全員が同時に移行する仕組み（標準化・規制）**
- 「歴史の偶然が、技術の未来を決める」— Paul David

<div class="fig">
<svg viewBox="0 0 800 220" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="220" fill="#1a1a2e" rx="12"/><text x="400" y="28" font-family="sans-serif" font-size="15" fill="#f9a825" text-anchor="middle" font-weight="bold">ロックインを破る3つの条件</text><rect x="40" y="45" width="210" height="140" fill="#1a3a2d" rx="10" stroke="#4caf50" stroke-width="2"/><text x="145" y="80" font-family="sans-serif" font-size="28" fill="#4caf50" text-anchor="middle">1</text><text x="145" y="108" font-family="sans-serif" font-size="14" fill="#e0e0e0" text-anchor="middle" font-weight="bold">圧倒的な優位性</text><text x="145" y="128" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">切替コストを大幅に</text><text x="145" y="146" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">上回るメリット</text><text x="145" y="164" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle">例: スマートフォン</text><rect x="295" y="45" width="210" height="140" fill="#2d1a3a" rx="10" stroke="#9c27b0" stroke-width="2"/><text x="400" y="80" font-family="sans-serif" font-size="28" fill="#9c27b0" text-anchor="middle">2</text><text x="400" y="108" font-family="sans-serif" font-size="14" fill="#e0e0e0" text-anchor="middle" font-weight="bold">強制的な調整</text><text x="400" y="128" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">規制・標準化による</text><text x="400" y="146" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">一斉移行の強制</text><text x="400" y="164" font-family="sans-serif" font-size="11" fill="#9c27b0" text-anchor="middle">例: USB-C統一規制</text><rect x="550" y="45" width="210" height="140" fill="#2d2d1a" rx="10" stroke="#f9a825" stroke-width="2"/><text x="655" y="80" font-family="sans-serif" font-size="28" fill="#f9a825" text-anchor="middle">3</text><text x="655" y="108" font-family="sans-serif" font-size="14" fill="#e0e0e0" text-anchor="middle" font-weight="bold">後方互換性</text><text x="655" y="128" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">旧システムとの</text><text x="655" y="146" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">共存期間を設ける</text><text x="655" y="164" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle">例: フリーゲージ導入</text><text x="400" y="205" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">3条件が揃ったとき、初めてロックインは解除される</text></svg>
</div>

