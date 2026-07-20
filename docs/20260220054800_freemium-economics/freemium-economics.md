---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "フリーミアムの経済学"
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
# フリーミアムは
本当に儲かるか

- 転換率1-5%の経済学
- Spotifyの収益構造とフリーユーザーのコスト
- フリーミアムが失敗する条件


---

# アジェンダ

> *転換率・コスト構造・失敗条件の3軸でフリーミアムの経済学を解剖する*

1. フリーミアムの定義と経済学
2. 転換率の現実
3. フリーユーザーの「本当のコスト」
4. 成功事例と失敗事例
5. フリーミアム設計の原則


---

<!-- _class: invert lead -->
# フリーミアムの経済学


---

<!-- _class: invert fit-82 -->
# 「Freemium」という造語の起源（1/2）

> *Free+Premiumの構造: 99%無料ユーザーを1-5%が支える*

<div class="fig">
<svg viewBox="0 0 800 280" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="280" fill="#1a1a2e"/><rect x="60" y="30" width="680" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="58" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">Freemium = Free + Premium</text><text x="400" y="78" text-anchor="middle" fill="#cccccc" font-size="12">Fred Wilson（VC）2006年のブログ記事で造語</text><rect x="60" y="120" width="300" height="120" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="210" y="148" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Free 層</text><text x="210" y="170" text-anchor="middle" fill="#cccccc" font-size="12">基本機能を無料で提供</text><text x="210" y="190" text-anchor="middle" fill="#aaaaaa" font-size="11">ユーザー獲得</text><text x="210" y="210" text-anchor="middle" fill="#aaaaaa" font-size="11">ネットワーク効果</text><text x="210" y="228" text-anchor="middle" fill="#aaaaaa" font-size="10">口コミ・広告</text><rect x="440" y="120" width="300" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="590" y="148" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Premium 層</text><text x="590" y="170" text-anchor="middle" fill="#cccccc" font-size="12">高度な機能・容量・サポート</text><text x="590" y="190" text-anchor="middle" fill="#aaaaaa" font-size="11">有料転換（1-5%）</text><text x="590" y="210" text-anchor="middle" fill="#aaaaaa" font-size="11">収益の主源</text><text x="590" y="228" text-anchor="middle" fill="#aaaaaa" font-size="10">フリー層コストを補填</text><polygon points="360,178 400,165 400,191" fill="#e91e63"/><polygon points="440,178 400,165 400,191" fill="#e91e63"/><text x="400" y="183" text-anchor="middle" fill="#e91e63" font-size="11">支援</text></svg>
</div>

- Fred Wilson（VC）が2006年のブログ記事で造語
- 「Free」+「Premium」の合成語
- **基本モデル：** 基本機能を無料で提供（Free）、高度な機能・容量・サポートは有料（Premium）


---

<!-- _class: invert fit-70 -->
# 「Freemium」という造語の起源（2/2）

> *限界コストほぼゼロのデジタル財でのみ成立する構造*

<div class="fig">
<svg viewBox="0 0 800 260" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">フリーミアム成立の3条件</text><rect x="30" y="50" width="220" height="100" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="140" y="78" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">条件1</text><text x="140" y="100" text-anchor="middle" fill="#cccccc" font-size="11">限界コスト≒ゼロ</text><text x="140" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10">デジタル財の特性</text><rect x="290" y="50" width="220" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">条件2</text><text x="400" y="100" text-anchor="middle" fill="#cccccc" font-size="11">価値体験後に転換</text><text x="400" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10">1〜5%が有料に</text><rect x="550" y="50" width="220" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="660" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">条件3</text><text x="660" y="100" text-anchor="middle" fill="#cccccc" font-size="11">有料収益 &gt; Free コスト</text><text x="660" y="120" text-anchor="middle" fill="#aaaaaa" font-size="10">LTV &gt; CAC</text><rect x="100" y="180" width="600" height="55" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1"/><text x="400" y="205" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">フリーユーザーが有料ユーザーを補助する構造</text><text x="400" y="225" text-anchor="middle" fill="#aaaaaa" font-size="10">95-99%の無料ユーザー → 1-5%が収益を生み全体を支える</text></svg>
</div>

- フリーユーザーが有料ユーザーを補助する構造
- **前提となる経済学的条件：**
1. 追加ユーザーの限界コストが極めて低い（デジタル財）
2. 無料で試した後、価値を感じたユーザーが転換する
3. 有料ユーザーの利益がフリーユーザーのコストを上回る


---

<!-- _class: invert lead -->
# 転換率の現実


---

<!-- _class: invert fit-94 -->
# 業界別の転換率データ（1/2）

> *Spotify27%・Dropbox4%・LinkedIn0.75%の転換率の現実*

<div class="fig">
<svg viewBox="0 0 800 300" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">Free → Paid 転換率比較</text><rect x="60" y="55" width="175" height="190" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/><rect x="60" y="106" width="175" height="139" rx="0" fill="#4caf50" opacity="0.6"/><text x="147" y="85" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">Spotify</text><text x="147" y="260" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">27%</text><rect x="265" y="55" width="175" height="190" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="2"/><rect x="265" y="208" width="175" height="37" rx="0" fill="#2196f3" opacity="0.6"/><text x="352" y="85" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">Dropbox</text><text x="352" y="260" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">4%</text><rect x="470" y="55" width="175" height="190" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><rect x="470" y="235" width="175" height="10" rx="0" fill="#e91e63" opacity="0.6"/><text x="557" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">LinkedIn</text><text x="557" y="260" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">0.75%</text><rect x="150" y="270" width="500" height="24" rx="4" fill="#16213e" stroke="#888" stroke-width="1"/><text x="400" y="287" text-anchor="middle" fill="#aaaaaa" font-size="11">一般的なSaaS: 1-5%</text></svg>
</div>

- **実際の転換率（Free→Paid）：**
- Spotify：約27%（業界トップ水準）
- Dropbox：約4%　／　LinkedIn Premium：約0.5-1%
- 一般的なSaaS：1-5%


---

<!-- _class: invert fit-82 -->
# 業界別の転換率データ（2/2）

> *95-99%が無料のままでも成立するのは限界コストがゼロだから*

<div class="fig">
<svg viewBox="0 0 800 260" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">フリーミアムの現実：95-99%は無料のまま</text><circle cx="400" cy="140" r="100" fill="none" stroke="#444" stroke-width="2"/><path d="M 400 40 A 100 100 0 1 1 399.9 40 Z" fill="#16213e" stroke="#888" stroke-width="1"/><path d="M 400 40 A 100 100 0 0 1 489 182 Z" fill="#f9a825" opacity="0.8"/><text x="400" y="170" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">95-99%</text><text x="400" y="195" text-anchor="middle" fill="#888888" font-size="12">無料のまま</text><text x="560" y="100" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">1-5%</text><text x="560" y="118" text-anchor="middle" fill="#f9a825" font-size="11">有料転換</text><text x="560" y="136" text-anchor="middle" fill="#cccccc" font-size="10">全収益を生む</text><rect x="30" y="215" width="340" height="32" rx="4" fill="#16213e" stroke="#4caf50" stroke-width="1"/><text x="200" y="236" text-anchor="middle" fill="#4caf50" font-size="11">成立条件: 限界コスト≒ゼロ</text><rect x="430" y="215" width="340" height="32" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="600" y="236" text-anchor="middle" fill="#e91e63" font-size="11">コスト爆増なら → 破綻</text></svg>
</div>

- **逆に見ると：** フリーミアムモデルでは **95-99%のユーザーが無料のまま**
- **これが成立する条件：** デジタル財のフリーユーザーあたりの限界コストが限りなくゼロに近いこと
- → 追加1ユーザーでサーバーコストが爆増するなら破綻


---

<!-- _class: invert lead -->
# Spotifyの収益構造


---

<!-- _class: invert fit-76 -->
# Spotifyはなぜフリーを維持できるか（1/2）

> *6億ユーザー中2.4億が有料化した40%転換率が強さの源泉*

<div class="fig">
<svg viewBox="0 0 800 300" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="32" text-anchor="middle" fill="#4caf50" font-size="15" font-weight="bold">Spotify 2023 収益構造</text><rect x="30" y="50" width="220" height="210" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="140" y="78" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">月間アクティブ</text><text x="140" y="110" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="bold">6億</text><text x="140" y="135" text-anchor="middle" fill="#aaaaaa" font-size="11">総ユーザー</text><rect x="140" y="155" width="80" height="20" rx="3" fill="#4caf50" opacity="0.3"/><text x="180" y="170" text-anchor="middle" fill="#4caf50" font-size="10">無料: 3.6億</text><rect x="140" y="180" width="80" height="20" rx="3" fill="#f9a825" opacity="0.5"/><text x="180" y="195" text-anchor="middle" fill="#f9a825" font-size="10">有料: 2.4億</text><text x="140" y="240" text-anchor="middle" fill="#888888" font-size="10">転換率 40%</text><rect x="290" y="50" width="220" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">有料収益</text><text x="400" y="110" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">138億ユーロ</text><text x="400" y="135" text-anchor="middle" fill="#aaaaaa" font-size="10">2023年売上</text><rect x="290" y="165" width="220" height="95" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="192" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">フリーユーザーコスト</text><text x="400" y="215" text-anchor="middle" fill="#cccccc" font-size="11">著作権料: $0.004/再生</text><text x="400" y="233" text-anchor="middle" fill="#cccccc" font-size="11">広告収入でカバー</text><text x="400" y="251" text-anchor="middle" fill="#aaaaaa" font-size="10">フリーも収益源</text><rect x="540" y="50" width="230" height="210" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="655" y="78" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">フリーユーザーの価値</text><text x="655" y="105" text-anchor="middle" fill="#cccccc" font-size="11">広告収入の直接貢献</text><text x="655" y="125" text-anchor="middle" fill="#cccccc" font-size="11">有料への転換可能性</text><text x="655" y="145" text-anchor="middle" fill="#cccccc" font-size="11">口コミ・ネットワーク効果</text><text x="655" y="165" text-anchor="middle" fill="#cccccc" font-size="11">競合への流出防止</text><text x="655" y="185" text-anchor="middle" fill="#aaaaaa" font-size="10">Apple Music, YouTube Music</text></svg>
</div>

- **Spotifyの2023年業績：** 月間アクティブユーザー：6億人
- 有料サブスクライバー：2.4億人（転換率40%）、売上：138億ユーロ
- **フリーユーザーの「コスト」：** 楽曲再生ごとに著作権料が発生（約$0.004/再生）


---

<!-- _class: invert fit-76 -->
# Spotifyはなぜフリーを維持できるか（2/2）

> *広告収入・転換可能性・口コミ・競合防止の4源泉がフリーコストを正当化する*

<div class="fig">
<svg viewBox="0 0 800 250" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="250" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">フリーユーザーの4つの価値源</text><rect x="30" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="115" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">広告収入</text><text x="115" y="100" text-anchor="middle" fill="#cccccc" font-size="10">直接的収益貢献</text><rect x="220" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="305" y="80" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">転換可能性</text><text x="305" y="100" text-anchor="middle" fill="#cccccc" font-size="10">将来の有料化</text><rect x="410" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="495" y="80" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">口コミ効果</text><text x="495" y="100" text-anchor="middle" fill="#cccccc" font-size="10">ネットワーク拡大</text><rect x="600" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="685" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">競合防止</text><text x="685" y="100" text-anchor="middle" fill="#cccccc" font-size="10">Apple Music等へ</text><text x="685" y="116" text-anchor="middle" fill="#cccccc" font-size="10">流出を防ぐ</text><rect x="60" y="165" width="680" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="190" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">フリーユーザーコスト（著作権料 $0.004/再生）</text><text x="400" y="210" text-anchor="middle" fill="#cccccc" font-size="11">広告収入でカバー → ネット収支をプラスに保つ</text></svg>
</div>

- フリーユーザーへの広告収入でこれをカバー
- **フリーユーザーの「価値」：**
- 広告収入の直接貢献、有料への転換可能性
- 口コミ・ネットワーク効果、競合（Apple Music）への流出防止


---

<!-- _class: invert lead -->
# フリーミアムが失敗する条件


---

<!-- _class: invert fit-76 -->
# 失敗パターン：フリー層を拡大しすぎる（1/2）

> *Evernoteはフリー機能が十分すぎて誰も有料にならなかった*

<div class="fig">
<svg viewBox="0 0 800 280" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="32" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Evernote の失敗タイムライン</text><line x1="60" y1="140" x2="740" y2="140" stroke="#444" stroke-width="2"/><circle cx="130" cy="140" r="8" fill="#4caf50"/><text x="130" y="125" text-anchor="middle" fill="#4caf50" font-size="10">2011</text><text x="130" y="165" text-anchor="middle" fill="#cccccc" font-size="10">1億ユーザー</text><text x="130" y="180" text-anchor="middle" fill="#cccccc" font-size="9">成功例として称賛</text><circle cx="300" cy="140" r="8" fill="#f9a825"/><text x="300" y="125" text-anchor="middle" fill="#f9a825" font-size="10">2016</text><text x="300" y="165" text-anchor="middle" fill="#cccccc" font-size="10">フリー機能制限</text><text x="300" y="180" text-anchor="middle" fill="#cccccc" font-size="9">収益化失敗</text><circle cx="480" cy="140" r="8" fill="#e91e63"/><text x="480" y="125" text-anchor="middle" fill="#e91e63" font-size="10">2018</text><text x="480" y="165" text-anchor="middle" fill="#cccccc" font-size="10">大量ユーザー離脱</text><text x="480" y="180" text-anchor="middle" fill="#cccccc" font-size="9">信頼崩壊</text><circle cx="650" cy="140" r="8" fill="#888"/><text x="650" y="125" text-anchor="middle" fill="#888" font-size="10">2023</text><text x="650" y="165" text-anchor="middle" fill="#888" font-size="10">大幅縮小</text><text x="650" y="180" text-anchor="middle" fill="#888" font-size="9">イタリア移管</text><line x1="130" y1="140" x2="300" y2="140" stroke="#4caf50" stroke-width="3"/><line x1="300" y1="140" x2="480" y2="140" stroke="#e91e63" stroke-width="3"/><line x1="480" y1="140" x2="650" y2="140" stroke="#888" stroke-width="3"/><rect x="150" y="210" width="500" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="400" y="232" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">失敗の原因</text><text x="400" y="252" text-anchor="middle" fill="#cccccc" font-size="11">フリー機能が「十分すぎた」→ 有料転換動機ゼロ → 制限後に信頼喪失</text></svg>
</div>

- **Evernote の失敗（2023年大幅縮小）：**
- 2011年「1億ユーザー」でフリーミアムの成功例として称賛
- 大半がフリーユーザーで収益化に失敗
- 2016年からフリー機能を次々と制限 → ユーザーが一斉に離脱


---

<!-- _class: invert fit-88 -->
# 失敗パターン：フリー層を拡大しすぎる（2/2）

> *フリー制限後の信頼崩壊が示す最初から設計に組み込む原則*

- **失敗の原因：** フリー機能が「十分すぎた」→ 有料に転換する動機がなかった
- フリー制限後 → 信頼を失い有料にも移行されなかった
- **フリーミアム設計の原則：** 「フリーは最低限の価値を提供し、有料は大幅な価値向上を提供する」


---

<!-- _class: invert fit-76 -->
# まとめ：フリーミアムの経済学

> *転換率1-5%でも成立する数学的構造を理解して最初から設計に組み込む*

<div class="fig">
<svg viewBox="0 0 800 260" style="display:block;margin:0 auto;display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;"><rect width="800" height="260" fill="#1a1a2e"/><rect x="30" y="20" width="340" height="80" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="200" y="48" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">成立する条件</text><text x="200" y="68" text-anchor="middle" fill="#cccccc" font-size="11">デジタル財の限界コスト≒ゼロ</text><text x="200" y="85" text-anchor="middle" fill="#cccccc" font-size="10">転換率1-5%でも黒字になる</text><rect x="430" y="20" width="340" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="48" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Spotify成功の秘訣</text><text x="600" y="68" text-anchor="middle" fill="#cccccc" font-size="11">広告収入+高転換率+ネットワーク効果</text><text x="600" y="85" text-anchor="middle" fill="#cccccc" font-size="10">3つの収益源を組み合わせ</text><rect x="30" y="130" width="340" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="158" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">失敗パターン</text><text x="200" y="178" text-anchor="middle" fill="#cccccc" font-size="11">フリー機能が十分すぎる</text><text x="200" y="195" text-anchor="middle" fill="#cccccc" font-size="10">Evernote の轍を踏まない</text><rect x="430" y="130" width="340" height="80" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="600" y="158" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">設計原則</text><text x="600" y="178" text-anchor="middle" fill="#cccccc" font-size="11">最初からフリー制限を設計に組み込む</text><text x="600" y="195" text-anchor="middle" fill="#cccccc" font-size="10">信頼崩壊を事前に防ぐ</text><rect x="100" y="228" width="600" height="26" rx="6" fill="#16213e" stroke="#888" stroke-width="1"/><text x="400" y="246" text-anchor="middle" fill="#aaaaaa" font-size="11">「フリーミアムは戦略ではなく、それ自体がビジネスモデルだ」</text></svg>
</div>

- ✅ **転換率1-5%でも成立するのはデジタル財の限界コストがほぼゼロだから**
- ✅ **Spotifyが成功した理由：広告収入+高転換率+ネットワーク効果**
- ✅ **フリー機能が「十分すぎる」と誰も有料にならない**
- ✅ **フリー制限は信頼崩壊を招く — 最初から設計に組み込む必要がある**

