---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "規格戦争の経済学"
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
# VHSとベータマックスの戦争
— 優れた技術が負ける理由

- 画質・音質で優れたBetaがVHSに負けた理由
- ネットワーク効果と「ロックイン」の経済学
- Blu-ray・スマートフォン・AI開発への応用


---

# アジェンダ

> *技術優位よりエコシステム戦略と普及速度が規格戦争を決する*

1. ビデオ規格戦争の経緯
2. なぜBetaは負けたのか
3. ネットワーク効果の経済学
4. 経路依存という概念
5. 現代技術戦争への応用


---

<!-- _class: invert lead -->
# ビデオ規格戦争


---

<!-- _class: invert fit-64 -->
# Beta vs VHS（1975〜1988年）（1/2）

> *技術的優位より録画時間2時間という実用性がVHS勝利を決めた*

- **Betamax（ソニー、1975年）：**
- 先行参入・高画質・コンパクトな本体
- 当初の評価：「技術的に優れた規格」
- **VHS（JVC、1976年）：**
- 録画時間が長い（当初2時間 vs Beta 1時間）
- 映画1本が収まる長さが普及の鍵

<div class="fig">
<svg viewBox="0 0 800 220" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="220" fill="#1a1a2e"/><text x="180" y="35" font-size="18" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">Betamax（1975）</text><text x="600" y="35" font-size="18" fill="#e91e63" font-family="sans-serif" text-anchor="middle" font-weight="bold">VHS（1976）</text><line x1="395" y1="20" x2="395" y2="200" stroke="#555" stroke-width="2"/><text x="180" y="75" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">録画時間：1時間</text><text x="600" y="75" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">録画時間：2時間</text><text x="180" y="110" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">画質：高い</text><text x="600" y="110" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">画質：普通</text><text x="180" y="145" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">本体サイズ：小</text><text x="600" y="145" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">本体サイズ：大</text><text x="180" y="180" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">ライセンス：非公開</text><text x="600" y="180" font-size="14" fill="#ccc" font-family="sans-serif" text-anchor="middle">ライセンス：積極開放</text></svg>
</div>


---

<!-- _class: invert fit-64 -->
# Beta vs VHS（1975〜1988年）（2/2）

> *ライセンスを開放し機種を増やしたJVCの戦略がBetaを葬った*

- **ソニーの戦略ミス：**
- 他社へのライセンス拒否 → 単独規格の維持
- JVCはPanasonic・日立・Sharpなどに積極ライセンス
- → VHS対応機種が急増
- **1988年：ソニーがVHS機器の生産を開始し事実上敗北**
- ビデオレンタル店がVHS中心になるとBetaは選ばれなくなった

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="30" font-size="16" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">VHS対応メーカー数の推移</text><line x1="60" y1="160" x2="760" y2="160" stroke="#555" stroke-width="2"/><line x1="60" y1="160" x2="60" y2="50" stroke="#555" stroke-width="2"/><text x="60" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1976</text><text x="200" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1978</text><text x="340" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1980</text><text x="480" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1982</text><text x="620" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1984</text><text x="760" y="175" font-size="12" fill="#aaa" font-family="sans-serif" text-anchor="middle">1986</text><polyline points="60,155 200,140 340,110 480,80 620,65 760,58" stroke="#e91e63" stroke-width="3" fill="none"/><text x="770" y="58" font-size="12" fill="#e91e63" font-family="sans-serif">VHS</text><polyline points="60,155 200,153 340,152 480,152 620,153 760,154" stroke="#f9a825" stroke-width="3" fill="none"/><text x="770" y="154" font-size="12" fill="#f9a825" font-family="sans-serif">Beta</text></svg>
</div>


---

<!-- _class: invert fit-76 -->
# ネットワーク効果と経路依存（1/2）

> *レンタル店のVHSコンテンツが増えるほどVHSが選ばれる正循環*

- **ネットワーク効果：**
- 利用者が増えるほど製品の価値が高まる
- VHS：レンタル店のVHSコンテンツが増える → VHSを買う人が増える
- → さらにレンタルコンテンツが増える（正のフィードバック）
- **経路依存（Path Dependency）：**

<div class="fig">
<svg viewBox="0 0 800 230" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="230" fill="#1a1a2e"/><text x="400" y="28" font-size="16" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">VHS ネットワーク効果のフィードバックループ</text><rect x="270" y="40" width="180" height="44" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="360" y="58" font-size="13" fill="#fff" font-family="sans-serif" text-anchor="middle">VHSユーザー増加</text><text x="360" y="76" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">（需要拡大）</text><rect x="550" y="100" width="180" height="44" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="640" y="118" font-size="13" fill="#fff" font-family="sans-serif" text-anchor="middle">レンタル店VHSタイトル</text><text x="640" y="136" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">増加</text><rect x="270" y="165" width="180" height="44" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="360" y="183" font-size="13" fill="#fff" font-family="sans-serif" text-anchor="middle">VHSプレーヤーの</text><text x="360" y="201" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">購入動機が高まる</text><rect x="20" y="100" width="180" height="44" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="110" y="118" font-size="13" fill="#fff" font-family="sans-serif" text-anchor="middle">メーカーがVHS機器</text><text x="110" y="136" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">を増産</text><line x1="450" y1="62" x2="550" y2="110" stroke="#e91e63" stroke-width="2"/><polygon points="550,110 540,102 544,114" fill="#e91e63"/><line x1="640" y1="144" x2="560" y2="165" stroke="#e91e63" stroke-width="2"/><polygon points="560,165 556,153 568,160" fill="#e91e63"/><line x1="270" y1="185" x2="200" y2="145" stroke="#e91e63" stroke-width="2"/><polygon points="200,145 198,157 210,150" fill="#e91e63"/><line x1="110" y1="100" x2="290" y2="62" stroke="#e91e63" stroke-width="2"/><polygon points="290,62 282,72 294,70" fill="#e91e63"/></svg>
</div>


---

<!-- _class: invert fit-76 -->
# ネットワーク効果と経路依存（2/2）

> *一度勝者が決まると技術的劣位でも覆すのは極めて難しい*

- 早期の選択が後の選択肢を制約する
- 一度勝者が決まると技術的劣位でも覆すのが難しくなる
- **「技術的優位が勝負を決めない」事例：**
- Windows vs Mac（市場シェアはWindows圧勝）
- VHS vs Beta
- Android vs iOS（シェアはAndroidが多い）

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="28" font-size="16" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">VHS市場シェア推移（1978〜1988年）</text><line x1="60" y1="160" x2="760" y2="160" stroke="#555" stroke-width="2"/><line x1="60" y1="160" x2="60" y2="50" stroke="#555" stroke-width="2"/><text x="40" y="163" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="end">0%</text><text x="40" y="107" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="end">50%</text><text x="40" y="55" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="end">100%</text><line x1="55" y1="107" x2="65" y2="107" stroke="#555" stroke-width="1"/><text x="100" y="175" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1978</text><text x="240" y="175" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1980</text><text x="380" y="175" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1982</text><text x="520" y="175" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1984</text><text x="660" y="175" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1986</text><polyline points="100,148 240,130 380,103 520,74 660,57" stroke="#e91e63" stroke-width="3" fill="none"/><text x="665" y="52" font-size="12" fill="#e91e63" font-family="sans-serif">VHS</text><polyline points="100,152 240,145 380,135 520,125 660,120" stroke="#f9a825" stroke-width="3" fill="none"/><text x="665" y="120" font-size="12" fill="#f9a825" font-family="sans-serif">Beta</text></svg>
</div>


---

<!-- _class: invert fit-82 -->
# 現代技術戦争への応用（1/2）

> *PS3へのBlu-ray搭載がVHSと同じ普及戦略でHD-DVDを倒した*

- **Blu-ray vs HD-DVD（2006〜2008年）：**
- Blu-ray：ソニーが積極的にライセンス & Paramount独占契約
- BD陣営がPSゲーム機（PS3）でBDを普及 → 勝利
- 前回の失敗から学んだソニーの戦略転換
- **スマートフォンOS戦争（2007〜）：**

<div class="fig">
<svg viewBox="0 0 800 210" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="210" fill="#1a1a2e"/><text x="400" y="28" font-size="16" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">Blu-ray vs HD-DVD 戦略比較</text><rect x="30" y="45" width="350" height="150" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="205" y="68" font-size="15" fill="#e91e63" font-family="sans-serif" text-anchor="middle" font-weight="bold">Blu-ray（勝者）</text><text x="55" y="95" font-size="12" fill="#ccc" font-family="sans-serif">✓ Sony・Panasonic・Philips連合</text><text x="55" y="118" font-size="12" fill="#ccc" font-family="sans-serif">✓ PS3への標準搭載（2006年）</text><text x="55" y="141" font-size="12" fill="#ccc" font-family="sans-serif">✓ WarnerBros独占契約（2008年）</text><text x="55" y="164" font-size="12" fill="#ccc" font-family="sans-serif">✓ 積極的ライセンス展開</text><rect x="420" y="45" width="350" height="150" rx="8" fill="#2d2d4e" stroke="#555" stroke-width="2"/><text x="595" y="68" font-size="15" fill="#aaa" font-family="sans-serif" text-anchor="middle" font-weight="bold">HD-DVD（敗者）</text><text x="445" y="95" font-size="12" fill="#888" font-family="sans-serif">✗ Toshiba単独推進</text><text x="445" y="118" font-size="12" fill="#888" font-family="sans-serif">✗ Xbox360での採用（オプション）</text><text x="445" y="141" font-size="12" fill="#888" font-family="sans-serif">✗ コンテンツ獲得競争で劣勢</text><text x="445" y="164" font-size="12" fill="#888" font-family="sans-serif">✗ 2008年2月に撤退表明</text></svg>
</div>


---

<!-- _class: invert fit-76 -->
# 現代技術戦争への応用（2/2）

> *OpenAI vs Metaのオープン対クローズ戦争はVHS対Betaの再演*

- Androidのオープンライセンス戦略（VHSと同じ）
- iOSはクローズドエコシステムで高付加価値戦略（Betaと同じ）
- → 両方が生き残る異例のケース
- **AIモデル開発（2023〜）：**
- OpenAI vs Meta（LLaMA）vs Google
- オープン vs クローズドの同じ構図が再現

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="26" font-size="16" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">規格戦争パターンの反復</text><rect x="30" y="40" width="140" height="50" rx="6" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="100" y="62" font-size="13" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">VHS vs Beta</text><text x="100" y="80" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">1975-1988</text><rect x="220" y="40" width="140" height="50" rx="6" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="290" y="62" font-size="13" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">Blu-ray vs</text><text x="290" y="78" font-size="13" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">HD-DVD</text><text x="290" y="98" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">2006-2008</text><rect x="410" y="40" width="140" height="50" rx="6" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="480" y="62" font-size="13" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">Android vs</text><text x="480" y="78" font-size="13" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">iOS</text><text x="480" y="98" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">2007-現在</text><rect x="600" y="40" width="160" height="50" rx="6" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="680" y="62" font-size="13" fill="#e91e63" font-family="sans-serif" text-anchor="middle" font-weight="bold">OpenAI vs</text><text x="680" y="78" font-size="13" fill="#e91e63" font-family="sans-serif" text-anchor="middle" font-weight="bold">Meta/Google</text><text x="680" y="98" font-size="11" fill="#aaa" font-family="sans-serif" text-anchor="middle">2023-現在</text><line x1="170" y1="65" x2="220" y2="65" stroke="#555" stroke-width="2"/><polygon points="220,65 212,60 212,70" fill="#555"/><line x1="360" y1="65" x2="410" y2="65" stroke="#555" stroke-width="2"/><polygon points="410,65 402,60 402,70" fill="#555"/><line x1="550" y1="65" x2="600" y2="65" stroke="#555" stroke-width="2"/><polygon points="600,65 592,60 592,70" fill="#555"/><rect x="30" y="115" width="730" height="70" rx="8" fill="#2d2d4e" stroke="#555" stroke-width="1"/><text x="395" y="138" font-size="14" fill="#f9a825" font-family="sans-serif" text-anchor="middle" font-weight="bold">共通パターン</text><text x="395" y="160" font-size="13" fill="#ccc" font-family="sans-serif" text-anchor="middle">オープン戦略 vs クローズド戦略 → エコシステム形成 → ネットワーク効果 → 勝者独占</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# まとめ：技術は勝負を決めない

> *技術優位でなくライセンス戦略とネットワーク効果が規格を決めた*

- ✅ **Betaは技術的に優れていたがVHSに負けた**
- ✅ **勝因：録画時間・ライセンス戦略・ネットワーク効果**
- ✅ **技術の優劣よりエコシステム形成と普及速度が重要**
- ✅ **経路依存：一度勝者が決まると覆すのは極めて難しい**
- 「最良の製品が市場に勝つとは限らない。最初に市場を作った製品が勝つ」

