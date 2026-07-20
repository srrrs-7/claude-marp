---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "マンガに学ぶUXデザイン"
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
# マンガに学ぶUXデザイン
視線誘導・情報設計・感情設計の技法

- 100年の歴史を持つマンガの「読ませる技術」
- それはUIデザインの原則と驚くほど一致する
- コマ割り・視線誘導・感情曲線の応用


---

<!-- _class: invert fit-88 -->
# アジェンダ

> *マンガの視線・コマ・感情設計がUI原則に直結することを示す*

1. なぜマンガとUXデザインを比較するのか
2. 視線誘導の技法
3. 情報設計とコマ割り
4. 感情設計のテクニック
5. マンガ発のUX原則
6. 実践への応用


---

<!-- _class: invert lead -->
# なぜマンガとUXデザインを比較するのか


---

<!-- _class: invert fit-70 -->
# マンガ = 紙の上のUXデザイン

> *限られた紙面での視線制御はUIの画面制御と同じ問題*

![w:800 center](assets/manga-vs-ui.svg)

- **マンガ家が解決している問題：**
- 限られた紙面に情報を配置し、読者の視線を制御する
- 感情の起伏を設計し、ページをめくらせ続ける
- 複雑な物語を誰でも理解できる形で伝える
- ---
- **UIデザイナーが解決している問題：**
- 限られた画面に情報を配置し、ユーザーの視線を制御する


---

<!-- _class: invert fit-70 -->
# 手塚治虫が発明したもの

> *60年前のマンガ技法が現代UI/UX原則と一致する理由*

![w:800 center](assets/tezuka-techniques.svg)

- **映画的手法の導入（1950年代）：**
- パン・ズーム・モンタージュをマンガに翻訳
- コマのサイズと配置で「時間の速度」を制御
- 見開きページで「WOWモーメント」を創出
- ---
- これらは全て、現代のUI/UXデザインの基本原則
- → **マンガは60年前からUXデザインを実践していた**


---

<!-- _class: invert lead -->
# 視線誘導の技法


---

# マンガとUIの視線フロー比較

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert fit-58 -->
# 視線誘導の3原則

> *読み順+サイズ+コントラストの3原則で視線を設計できる*

![w:800 center](assets/eye-tracking-flow.svg)

- **1. 自然な読み順に逆らわない**
- マンガ：右→左、上→下（日本語の読み順）
- UI：左→右、上→下（F字パターン・Z字パターン）
- **2. 大きい要素が視線を引く**
- マンガ：大ゴマ = 重要なシーン / UI：ヒーロー画像 = メインメッセージ
- **3. コントラストが注目を集める**
- マンガ：ベタ（黒）と余白 / UI：色・サイズ・余白のコントラスト


---

<!-- _class: invert lead -->
# 情報設計とコマ割り


---

<!-- _class: invert fit-76 -->
# コマ割り = レイアウトグリッド（1/2）

> *均等コマは安定感・不均等コマは緊張感—UIも同じ原理*

![w:800 center](assets/panel-grid.svg)

- **マンガのコマ割りルール：**
- 均等なコマ割り → 安定感・日常シーン
- 不均等なコマ割り → 緊張感・アクション
- コマを壊す（枠線越え）→ 驚き・衝撃


---

<!-- _class: invert fit-76 -->
# コマ割り = レイアウトグリッド（2/2）

> *均等グリッドはダッシュボード、非対称は訴求力を高める*

![w:800 center](assets/panel-grid-comparison.svg)

- ---
- **UIのグリッドシステム：**
- 均等グリッド → ダッシュボード・一覧画面
- 非対称レイアウト → ランディングページ・プロモーション


---

<!-- _class: invert fit-70 -->
# 情報の「密度」をコントロールする

> *コマ数=認知負荷の管理—マンガ家もUXデザイナーも同じ専門家*

![w:800 center](assets/info-density.svg)

- **マンガ：** 1ページあたりのコマ数で情報密度を調整
- アクション：1-3コマ（疾走感）→ 情報少・感情多
- 日常会話：5-7コマ（安定感）→ 情報多・感情安定
- 見開き：1コマ（衝撃）→ 情報集中・感情最大
- ---
- **UI：** 1スクリーンあたりの要素数で認知負荷を調整
- → マンガ家もUXデザイナーも**認知負荷管理の専門家**


---

<!-- _class: invert lead -->
# 感情設計のテクニック


---

# マンガの感情設計 → UI応用マッピング

![w:900 center](assets/diagram-02.svg)


---

<!-- _class: invert fit-76 -->
# 「見開き」の力 = フルスクリーン体験（1/2）

> *情報をゼロにして1つの絵だけで感情を伝える設計力*

![w:800 center](assets/wow-moment.svg)

- マンガの見開きページ：**読者が息を呑む瞬間**
- 情報量をゼロにして、1つの絵だけで感情を伝える
- ---
- UIでの応用：


---

<!-- _class: invert fit-76 -->
# 「見開き」の力 = フルスクリーン体験（2/2）

> *「何も見せない」完了画面が達成感を最大化する*

![w:800 center](assets/fullscreen-modal.svg)

- フルスクリーンモーダル → 重要なアクション確認
- スプラッシュスクリーン → ブランドの第一印象
- 完了画面のアニメーション → 達成感の演出
- → **「何も見せない」ことで最も強い印象を残す**


---

<!-- _class: invert lead -->
# マンガ発のUX原則


---

<!-- _class: invert fit-76 -->
# 原則1：ガター（コマ間の余白）の力（1/2）

> *コマ間の空白でユーザーが場面転換を脳内補完する*

![w:800 center](assets/gutter-whitespace.svg)

- **ガター = マンガのコマとコマの間の空白**
- 読者はガターで「時間の経過」や「場面転換」を脳内補完する
- スコット・マクラウドが「クロージャー」と呼んだ認知プロセス
- ---


---

<!-- _class: invert fit-70 -->
# 原則1：ガター（コマ間の余白）の力（2/2）

> *余白は「何もない」ではなく意味のある設計要素*

![w:800 center](assets/gutter-rhythm.svg)

- **UIでの応用：**
- ステップインジケーター間の空白 → 進行感
- カード間のスペーシング → 情報のチャンク化
- ページ遷移のトランジション → 文脈の切り替え
- → **余白は「何もない」のではなく「意味がある」**


---

<!-- _class: invert fit-76 -->
# 原則2：吹き出し = 情報の階層化（1/2）

> *形状でメッセージの種類を分類する視覚的階層システム*

![w:800 center](assets/speech-bubble-ui.svg)

- **マンガの吹き出しシステム：**
- 通常の吹き出し → 普通の会話
- ギザギザ吹き出し → 叫び・驚き
- モノローグ（角丸四角）→ 内心・ナレーション


---

<!-- _class: invert fit-88 -->
# 原則2：吹き出し = 情報の階層化（2/2）

> *吹き出し3種類をUIコンポーネントに直接マッピングできる*

- ---
- **UIでの応用：**
- ツールチップ → 補足情報（吹き出し的）
- トースト通知 → 一時的メッセージ
- アラートバナー → 緊急の情報（ギザギザ=赤いアラート）


---

<!-- _class: invert lead -->
# 実践への応用


---

<!-- _class: invert fit-88 -->
# マンガ的UXデザインチェックリスト

> *視線誘導から感情曲線まで6軸でUI品質を点検できる*

- **視線誘導：** ユーザーの視線は自然な順序で流れているか？
- **情報密度：** 1画面に詰め込みすぎていないか？（コマ数管理）
- **感情曲線：** ユーザージャーニーに起伏があるか？
- **余白の意味：** ホワイトスペースは意図的に設計されているか？
- **WOWモーメント：** 「見開き」に相当する体験はあるか？
- **情報の階層：** 情報の重要度は視覚的に区別されているか？


---

<!-- _class: invert lead fit-94 -->
# まとめ

- マンガは**100年かけて磨かれたUXデザインの宝庫**
- 視線誘導・情報設計・感情設計の原則はUIデザインと共通
- 「コマ割り=レイアウト」「ガター=余白」「見開き=フルスクリーン」
- マンガ家は「読者がページをめくり続ける」体験を設計している
- **UXデザイナーは「ユーザーがスクロールし続ける」体験を設計している**


---

<!-- _class: invert fit-88 -->
# 参考文献

> *McCloud・Krug・Laws of UXで理論的根拠を完備*

- **書籍:**
- [Understanding Comics - Scott McCloud](https://www.amazon.com/dp/006097625X)
- [マンガの描き方 - 手塚治虫](https://www.amazon.co.jp/dp/4334727441)
- **UXデザイン:**
- [Don't Make Me Think - Steve Krug](https://www.amazon.com/dp/0321965515)
- [Laws of UX - Jon Yablonski](https://lawsofux.com/)

