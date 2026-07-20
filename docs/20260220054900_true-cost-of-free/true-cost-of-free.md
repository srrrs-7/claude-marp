---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "注意経済と無料の代償"
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
# 「無料」の本当のコスト計算

- 注意経済における時間の値段
- "If you're not paying, you're the product"の定量化
- 見えないコストを可視化する

![w:700 center](assets/free-service-model.svg)


---

# アジェンダ

> *注意・時間・データの3種のコストを定量化し「無料」の真の価格を明かす*

1. 注意経済とは何か
2. あなたの「注意」の市場価格
3. SNSの「無料」の実際のコスト
4. データは何円で取引されているか
5. 真のコストを踏まえた判断


---

<!-- _class: invert lead -->
# 注意経済の登場


---

<!-- _class: invert fit-76 -->
# 注意経済のバリューチェーン

> *人間の注意が希少資源となりプラットフォームが広告として販売する構造が成立*

- Herbert Simon（1971）：「情報の豊かさは注意の貧しさを生む」
- 人間の「注意（アテンション）」が最も希少なリソースになった経済
- 企業はコンテンツ・UIで注意を奪い合い、広告として販売する

![w:750 center](assets/attention-economy-chain.svg)


---

<!-- _class: invert fit-88 -->
# 数字で見る注意の争奪戦

> *TikTokは年間580時間を確保し日本人の可処分時間の約16%を占有する*

- 人間の平均注意持続時間：**8秒**（2015年Microsoft調査）
- Facebookは平均**58分/日**を確保
- YouTubeは平均**40分/セッション**
- TikTokは平均**95分/日**（2024年）
- ---
- 毎日1〜2時間の「注意」を無意識に「支払っている」


---

<!-- _class: invert lead -->
# あなたの注意の市場価格


---

# GoogleとMetaの「ユーザー単価」

- **ARPU（Average Revenue Per User）：** 企業が1ユーザーから得る年間収益

![w:680 center](assets/arpu-comparison.svg)


---

<!-- _class: invert fit-94 -->
# Instagramの「真のコスト」計算

> *1日30分の利用で年間20万円の時間コストを払っている計算*

- **仮定：** 1日30分のInstagram利用
- 30分/日 × 365日 = **182.5時間/年**
- 日本の平均時給（2024年）：約1,113円 → 時間的コスト：**約20万円/年**

![w:780 center](assets/instagram-cost-breakdown.svg)


---

<!-- _class: invert fit-70 -->
# Instagramの精神的コスト

> *年間20万円の時間コストを払い企業にARPU $19-72の広告収益を渡す非対称構造*

- **精神的コスト（研究より）：**
- 若者のInstagram使用と不安・抑うつの相関が示されている
- Meta内部資料（2021年内部告発）：
- 「Instagramは10代の女子の32%が体への不満を悪化させると知っている」
- ---
- **税務的価値：** Metaが得る$19〜$72の広告収益
- → **あなたは20万円のコストを払い、Metaに$19を渡している**


---

<!-- _class: invert lead -->
# データの売買価格


---

# あなたのデータは何円で取引されているか

- **データブローカー市場の規模（2024）：** 約3,000億ドル

![w:760 center](assets/data-market-value.svg)


---

<!-- _class: invert fit-76 -->
# まとめ：「無料」を正しく評価する

> *時間コスト換算で多くの「無料」サービスは有料より高くつく現実を認識する*

- **「無料」なのはお金だけ。時間・注意・データ・精神的コストがある**
- **Meta・Googleのユーザー単価は$19〜$214** — あなたはそれを「支払っている」
- **時間コストを計算すると多くの「無料」サービスは有料より高い**

![w:750 center](assets/free-vs-paid-comparison.svg)

