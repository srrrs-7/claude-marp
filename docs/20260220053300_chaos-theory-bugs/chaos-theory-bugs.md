---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "カオス理論とソフトウェアバグ"
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
# カオス理論とバグ

- バタフライ効果と本番障害の因果連鎖
- 決定論的システムの予測不可能性
- なぜ「再現しないバグ」が存在するか

<div class="fig">
<svg viewBox="0 0 800 220" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="220" fill="#1a1a2e"/><text x="400" y="50" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#f9a825">🦋 微小な変化 → 巨大な結果</text><circle cx="80" cy="130" r="8" fill="#e91e63"/><path d="M88 130 Q200 60 320 130 Q440 200 560 90 Q680 30 760 130" stroke="#f9a825" stroke-width="3" fill="none"/><text x="80" y="175" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">初期状態</text><text x="760" y="175" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle">予測不能</text><line x1="80" x2="760" y1="190" y2="190" stroke="#555" stroke-width="1"/><text x="420" y="210" font-family="sans-serif" font-size="12" fill="#888" text-anchor="middle">時間 →</text></svg>
</div>


---

# アジェンダ

> *初期条件の微小差が本番障害に指数爆発する5つの切り口*

1. カオス理論とは何か
2. バタフライ効果の数学
3. ソフトウェアにおけるカオス
4. 再現しないバグの本質
5. カオスエンジニアリングへの応用


---

<!-- _class: invert lead -->
# カオス理論の誕生


---

<!-- _class: invert fit-88 -->
# 1961年：ローレンツの偶然の発見（1/2）

> *0.02%の丸め誤差が2ヶ月後の予測を完全に変えた歴史的発見*

- 気象学者 Edward Lorenz が気象シミュレーションを再実行
- **途中から再開するために小数点以下を丸めた：**
- 0.506127 → 0.506（0.02%の差）

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="60" y="30" width="280" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="57" text-anchor="middle" font-family="monospace" font-size="16" fill="#f9a825">0.506127</text><text x="200" y="77" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">実際の初期値</text><rect x="460" y="30" width="280" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="57" text-anchor="middle" font-family="monospace" font-size="16" fill="#e91e63">0.506</text><text x="600" y="77" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">丸めた値（差: 0.02%）</text><line x1="340" y1="60" x2="460" y2="60" stroke="#555" stroke-width="2"/><polygon points="455,55 465,60 455,65" fill="#555"/><text x="400" y="50" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#888">丸め</text><text x="400" y="140" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#f9a825">たった 0.02% の差が...</text><text x="400" y="170" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#aaa">2ヶ月後の予測を完全に変えてしまった</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# 1961年：ローレンツの偶然の発見（2/2）

> *同じ初期点から全く異なる軌跡—初期誤差は指数関数的に拡大*

- **2ヶ月後の予測が完全に異なる結果になった**
- この発見が「カオス理論」の出発点
- → **初期条件のわずかな差が、最終結果に指数関数的な差をもたらす**

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><text x="100" y="30" font-family="sans-serif" font-size="13" fill="#aaa" text-anchor="middle">同じ開始点</text><text x="680" y="30" font-family="sans-serif" font-size="13" fill="#e91e63" text-anchor="middle">2ヶ月後</text><polyline points="80,100 200,98 300,95 380,90 440,80 500,65 560,45 600,30 640,20" stroke="#4caf50" stroke-width="2.5" fill="none"/><polyline points="80,100 200,102 300,108 380,118 440,135 500,155 560,175 600,188 640,195" stroke="#e91e63" stroke-width="2.5" fill="none"/><circle cx="80" cy="100" r="6" fill="#f9a825"/><text x="400" y="110" font-family="sans-serif" font-size="12" fill="#888" text-anchor="middle">同じ開始 → 全く異なる軌跡</text><text x="655" y="22" font-family="sans-serif" font-size="11" fill="#4caf50">予測A</text><text x="655" y="195" font-family="sans-serif" font-size="11" fill="#e91e63">予測B</text><line x1="720" y1="20" x2="720" y2="195" stroke="#555" stroke-width="1" stroke-dasharray="4,4"/><text x="760" y="110" font-family="sans-serif" font-size="11" fill="#f9a825" text-anchor="middle">発散</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# バタフライ効果の数式的な理解（1/2）

> *λ>0でδ(t)は指数爆発—カオス系に長期予測は原理的に不可能*

- ローレンツ方程式（大幅に簡略化）：
- 誤差の成長：δ(t) = δ₀ × e^(λt)
- λ（リアプノフ指数）> 0 のとき → 初期誤差が指数関数的に拡大

<div class="fig">
<svg viewBox="0 0 800 230" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="230" fill="#1a1a2e"/><line x1="60" y1="20" x2="60" y2="200" stroke="#555" stroke-width="2"/><line x1="60" y1="200" x2="760" y2="200" stroke="#555" stroke-width="2"/><text x="40" y="25" font-family="sans-serif" font-size="12" fill="#aaa" text-anchor="middle">δ(t)</text><text x="765" y="204" font-family="sans-serif" font-size="12" fill="#aaa">t</text><polyline points="60,198 120,196 180,190 240,178 300,158 360,128 420,90 480,50 510,30" stroke="#e91e63" stroke-width="3" fill="none"/><polyline points="60,198 180,197 300,195 420,192 540,188 660,185 760,182" stroke="#4caf50" stroke-width="2" fill="none" stroke-dasharray="6,4"/><text x="530" y="45" font-family="sans-serif" font-size="13" fill="#e91e63">λ &gt; 0（カオス）</text><text x="680" y="178" font-family="sans-serif" font-size="13" fill="#4caf50">λ &lt; 0（安定）</text><text x="400" y="220" font-family="sans-serif" font-size="12" fill="#888" text-anchor="middle">時間が経つほど誤差が指数関数的に爆発する</text></svg>
</div>


---

<!-- _class: invert fit-76 -->
# バタフライ効果の数式的な理解（2/2）

> *t=10で22000倍、t=100で天文学的—誤差管理の限界を知る*

- **具体例：** λ = 1 の場合
- t=1 : 誤差は e倍（2.7倍）
- t=10 : 誤差は e¹⁰倍（22,026倍）
- t=100 : 天文学的な差に

<div class="fig">
<svg viewBox="0 0 800 180" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="180" fill="#1a1a2e"/><rect x="40" y="30" width="90" height="110" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="85" y="58" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#4caf50">t = 1</text><text x="85" y="85" text-anchor="middle" font-family="monospace" font-size="20" fill="white">2.7x</text><text x="85" y="115" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">管理可能</text><rect x="180" y="20" width="100" height="120" rx="6" fill="#16213e" stroke="#ff9800" stroke-width="2"/><text x="230" y="48" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ff9800">t = 5</text><text x="230" y="78" text-anchor="middle" font-family="monospace" font-size="18" fill="white">148x</text><text x="230" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">警戒</text><rect x="340" y="10" width="110" height="130" rx="6" fill="#16213e" stroke="#ff5722" stroke-width="2"/><text x="395" y="38" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ff5722">t = 10</text><text x="395" y="72" text-anchor="middle" font-family="monospace" font-size="16" fill="white">22,026x</text><text x="395" y="110" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">危険</text><rect x="510" y="20" width="260" height="120" rx="6" fill="#b71c1c" stroke="#e91e63" stroke-width="2"/><text x="640" y="48" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">t = 100</text><text x="640" y="85" text-anchor="middle" font-family="sans-serif" font-size="15" fill="white">2.7 × 10⁴³ 倍</text><text x="640" y="115" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffcdd2">長期予測は原理的に不可能</text><text x="400" y="168" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">時間とともに誤差は天文学的なスケールに到達する</text></svg>
</div>


---

<!-- _class: invert lead -->
# ソフトウェアにおけるカオス


---

# 「再現しないバグ」の正体（1/2）

- 「手元では再現しない」バグの多くはカオス的な原因を持つ：

<div class="fig">
<svg viewBox="0 0 800 260" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="260" fill="#1a1a2e"/><rect x="320" y="20" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825">再現しないバグ</text><rect x="30" y="140" width="160" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="110" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">タイミング依存</text><text x="110" y="179" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">レースコンディション</text><rect x="210" y="140" width="160" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="290" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">メモリレイアウト</text><text x="290" y="179" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">ASLR</text><rect x="430" y="140" width="160" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="510" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">浮動小数点</text><text x="510" y="179" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">丸め誤差</text><rect x="610" y="140" width="160" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="690" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e91e63">外部状態依存</text><text x="690" y="179" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">ネットワーク・時計</text><line x1="400" y1="70" x2="110" y2="140" stroke="#555" stroke-width="1.5"/><polygon points="110,140 105,130 115,130" fill="#555"/><line x1="400" y1="70" x2="290" y2="140" stroke="#555" stroke-width="1.5"/><polygon points="290,140 285,130 295,130" fill="#555"/><line x1="400" y1="70" x2="510" y2="140" stroke="#555" stroke-width="1.5"/><polygon points="510,140 505,130 515,130" fill="#555"/><line x1="400" y1="70" x2="690" y2="140" stroke="#555" stroke-width="1.5"/><polygon points="690,140 685,130 695,130" fill="#555"/><text x="400" y="240" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">すべて「初期条件の微小な差」が原因</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# 「再現しないバグ」の正体（2/2）

> *ASLR・浮動小数点・外部状態—全て初期条件の微小差が原因*

- ASLR（Address Space Layout Randomization）で毎回アドレスが変わる
- **3. 浮動小数点の丸め誤差**
- 最適化レベルで計算順序が変わり結果が異なる
- **4. 外部状態の依存**
- ネットワーク遅延・時計・環境変数・ファイルシステムの状態


---

# バタフライ効果が起きた本番障害の実例（1/2）

- **事例：Amazon S3の2017年障害**

<div class="fig">
<svg viewBox="0 0 800 240" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="240" fill="#1a1a2e"/><rect x="20" y="30" width="160" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="100" y="52" text-anchor="middle" font-family="monospace" font-size="12" fill="#f9a825">コマンド入力ミス</text><text x="100" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">引数を1つ多く指定</text><rect x="230" y="30" width="160" height="50" rx="6" fill="#16213e" stroke="#ff9800" stroke-width="1.5"/><text x="310" y="52" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ff9800">想定外の削除</text><text x="310" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">サーバー大量再起動</text><rect x="440" y="30" width="160" height="50" rx="6" fill="#16213e" stroke="#ff5722" stroke-width="1.5"/><text x="520" y="52" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ff5722">依存サービス連鎖</text><text x="520" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">S3依存の全サービス</text><rect x="640" y="30" width="140" height="50" rx="6" fill="#b71c1c" stroke="#e91e63" stroke-width="2"/><text x="710" y="52" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white">全米規模ダウン</text><text x="710" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffcdd2">数時間 / $1.5億/時</text><line x1="180" y1="55" x2="230" y2="55" stroke="#f9a825" stroke-width="2"/><polygon points="228,50 238,55 228,60" fill="#f9a825"/><line x1="390" y1="55" x2="440" y2="55" stroke="#ff9800" stroke-width="2"/><polygon points="438,50 448,55 438,60" fill="#ff9800"/><line x1="600" y1="55" x2="640" y2="55" stroke="#ff5722" stroke-width="2"/><polygon points="638,50 648,55 638,60" fill="#ff5722"/><rect x="20" y="120" width="760" height="100" rx="8" fill="#0d1b2a" stroke="#333" stroke-width="1"/><text x="400" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825">カオスの教訓</text><text x="400" y="170" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">「たった1つの引数ミス」が「数時間の全米障害」に直結</text><text x="400" y="195" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">初期条件の感度 → バタフライ効果のソフトウェア版</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# バタフライ効果が起きた本番障害の実例（2/2）

> *WAFルールの微小変更→全世界27分停止—典型的カオス的障害*

- **事例：Cloudflare 2019年障害**
- 原因：正規表現のバックトラッキング（Re2DoS）
- 影響：CPU使用率100% → 全サービスダウン 27分

<div class="fig">
<svg viewBox="0 0 800 190" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="190" fill="#1a1a2e"/><rect x="20" y="30" width="130" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="85" y="52" text-anchor="middle" font-family="monospace" font-size="11" fill="#f9a825">(a+)+b の正規表現</text><text x="85" y="68" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">WAFルール変更</text><rect x="200" y="30" width="130" height="50" rx="6" fill="#16213e" stroke="#ff9800" stroke-width="1.5"/><text x="265" y="52" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ff9800">バックトラック爆発</text><text x="265" y="68" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">指数的CPU消費</text><rect x="380" y="30" width="130" height="50" rx="6" fill="#16213e" stroke="#ff5722" stroke-width="1.5"/><text x="445" y="52" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ff5722">CPU 100%</text><text x="445" y="68" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">全ワーカーが停止</text><rect x="560" y="30" width="220" height="50" rx="6" fill="#b71c1c" stroke="#e91e63" stroke-width="2"/><text x="670" y="52" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">全サービスダウン 27分</text><text x="670" y="68" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ffcdd2">全世界のCloudflare利用者に影響</text><line x1="150" y1="55" x2="200" y2="55" stroke="#f9a825" stroke-width="2"/><polygon points="198,50 208,55 198,60" fill="#f9a825"/><line x1="330" y1="55" x2="380" y2="55" stroke="#ff9800" stroke-width="2"/><polygon points="378,50 388,55 378,60" fill="#ff9800"/><line x1="510" y1="55" x2="560" y2="55" stroke="#ff5722" stroke-width="2"/><polygon points="558,50 568,55 558,60" fill="#ff5722"/><rect x="20" y="110" width="760" height="55" rx="6" fill="#0d1b2a" stroke="#333" stroke-width="1"/><text x="400" y="133" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f9a825">WAFルールの「わずかな変更」→「全世界障害」</text><text x="400" y="152" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">微小な初期変化が指数関数的に増幅するカオス的バグの典型例</text></svg>
</div>


---

<!-- _class: invert lead -->
# カオスエンジニアリング


---

<!-- _class: invert fit-88 -->
# カオスモンキー：意図的に障害を起こす（1/2）

> *偶発障害を制御された実験に変える—NetflixのChaos Monkey哲学*

- Netflix が2011年に開発したカオスエンジニアリングツール
- **哲学：** 本番環境で偶発的に起きる障害なら、意図的に制御された形で先に経験した方が安全

<div class="fig">
<svg viewBox="0 0 800 200" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="200" fill="#1a1a2e"/><circle cx="160" cy="100" r="60" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="160" y="94" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63">偶発的な</text><text x="160" y="112" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63">障害</text><circle cx="640" cy="100" r="60" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="640" y="94" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">制御された</text><text x="640" y="112" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">実験</text><rect x="280" y="75" width="240" height="50" rx="8" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="97" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825">Chaos Monkey</text><text x="400" y="115" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">意図的に変換</text><line x1="220" y1="100" x2="280" y2="100" stroke="#f9a825" stroke-width="2"/><polygon points="278,95 288,100 278,105" fill="#f9a825"/><line x1="520" y1="100" x2="580" y2="100" stroke="#4caf50" stroke-width="2"/><polygon points="578,95 588,100 578,105" fill="#4caf50"/><text x="160" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">予測不能・損害大</text><text x="640" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">学習可能・安全</text></svg>
</div>


---

<!-- _class: invert fit-88 -->
# カオスモンキー：意図的に障害を起こす（2/2）

> *Chaos Monkey・Latency Monkey等で故障耐性を意図的に鍛える*

- **Simian Army の種類：**
- Chaos Monkey：ランダムにサーバーを強制終了
- Latency Monkey：ネットワーク遅延を注入
- Conformity Monkey：設定違反のインスタンスを検出
- Security Monkey：セキュリティグループの異常を検出


---

# カオスを「設計」する

> *Feature Flag・変更管理・監視でカオスを設計に組み込む*

| カオス理論の概念 | エンジニアリングの対応 |
|:---|:---|
| 初期条件の感度 | 入力バリデーションの徹底 |
| ストレンジアトラクタ | 定常状態の監視 |
| リアプノフ指数 | エラーレートの監視 |
| バタフライ効果 | 変更管理・Feature Flag |
| カオスの縁 | キャパシティプランニング |


---

# まとめ：カオスと共存する設計

<div class="fig">
<svg viewBox="0 0 800 300" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="300" fill="#1a1a2e"/><rect x="20" y="20" width="360" height="55" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="200" y="43" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">決定論的システムでも長期予測は不可能</text><text x="200" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">カオスを受け入れる設計思想へ</text><rect x="420" y="20" width="360" height="55" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="43" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">冪等性の設計</text><text x="600" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">何度実行しても同じ結果に</text><rect x="20" y="110" width="360" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="133" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825">観測可能性（Observability）</text><text x="200" y="153" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">カオスを「見える化」する</text><rect x="420" y="110" width="360" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="133" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f9a825">意図的な障害注入</text><text x="600" y="153" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#aaa">制御されたカオスで備える</text><rect x="120" y="200" width="560" height="55" rx="8" fill="#0d3349" stroke="#e91e63" stroke-width="2"/><text x="400" y="223" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63">「再現しないバグ」はバグではなくカオスの証拠</text><text x="400" y="243" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#aaa">制御できないなら、観察することが唯一の武器だ</text></svg>
</div>

