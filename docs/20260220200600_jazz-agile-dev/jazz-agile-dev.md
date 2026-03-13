---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ジャズと即興的開発"
footer: "© 2026"
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
# ジャズと即興的開発

- コード進行から学ぶアジャイル開発の哲学
- 
- 計画と即興のバランスはどこにあるのか？


---

# 目次

> *即興→類似構造→コード進行→アンサンブル→リハーモナイゼーション→設計原則の6章*

- - 1. ジャズの即興演奏とは
- - 2. ジャズとソフトウェア開発の類似構造
- - 3. コード進行 = アーキテクチャ
- - 4. アンサンブルとチーム開発
- - 5. リハーモナイゼーション = リファクタリング
- - 6. 即興的開発の設計原則


---

<!-- _class: lead -->
# ジャズの即興演奏


---

# 即興は「自由」ではない

> *コード進行とスケールという制約の中で創造性が生まれる*

![w:900 center](assets/constraint-creativity.svg)
![w:900 center](assets/sprint-improvisation.svg)
- - ジャズの即興演奏は**完全な自由**ではない
- - **コード進行**(和声の枠組み)の上で即興する
- - **スケール**(音階)という制約の中で創造する
- - **リズムセクション**が土台を提供する
- - **形式**(AABA, 12小節ブルースなど)が構造を与える
- 
- 制約こそが創造性を引き出す


---

<!-- _class: lead -->
# ジャズとソフトウェアの構造的類似


---

# 驚くほど似ている2つの世界

![w:900 center](assets/jazz-software.svg)


---

# コード進行 = アーキテクチャ

![w:900 center](assets/chord-progressions.svg)


---

# 「スタンダード」の存在（1/2）

> *スタンダードとデザインパターンが共通語彙でチームを加速*

![w:900 center](assets/sprint-improvisation.svg)
- - ジャズには**スタンダードナンバー**がある
-   - Autumn Leaves, All The Things You Are, etc.
-   - 同じ曲を異なるミュージシャンが異なる解釈で演奏
- - ソフトウェアにも**デザインパターン**がある


---

# 「スタンダード」の存在（2/2）

> *共通語彙があることでコミュニケーションが根本的に速くなる*

-   - MVC, Observer, Strategy, etc.
-   - 同じパターンを異なるチームが異なる実装で適用
- 
- **共通の語彙**がコミュニケーションを加速する


---

<!-- _class: lead -->
# アンサンブルとチーム開発


---

# ジャズアンサンブルの役割分担

![w:900 center](assets/jazz-ensemble.svg)


---

# アジャイルチームとの対応（1/2）

> *聴き合いがインフラとフィーチャーの協調を可能にする*

![w:900 center](assets/listening-model.svg)
- - **リズムセクション** = インフラ/プラットフォームチーム
-   - 安定した土台を提供し続ける
- - **ソリスト** = フィーチャー開発者
-   - 土台の上で自由に創造する


---

# アジャイルチームとの対応（2/2）

> *指示ではなく聴き合いでチームが機能する根本原理*

![w:900 center](assets/agile-jazz-comparison.svg)
- - **コンダクター** = テックリード/アーキテクト
-   - 全体の方向性を示すが細部は任せる
- 
- **指示ではなく「聴き合い」でチームが機能する**


---

<!-- _class: lead -->
# リハーモナイゼーション


---

# リハーモナイゼーション = リファクタリング

![w:900 center](assets/reharmonization.svg)


---

# 変え方の哲学（1/2）

> *外部振る舞いを保ちつつ内部構造を刷新するのが本質*

- - **ジャズ**: メロディを保ちつつコード進行を刷新
-   - 同じ曲が全く新しい響きになる
-   - リスナーには「同じ曲」と認識される
- - **リファクタリング**: 外部振る舞いを保ちつつ内部構造を刷新


---

# 変え方の哲学（2/2）

-   - 同じ機能がより良い設計になる
-   - ユーザーには「同じ機能」と認識される
- 
- **外側を変えずに中身を変える** -- 両者の本質


---

<!-- _class: lead -->
# 即興的開発の設計原則

![w:900 center](assets/design-principles.svg)


---

# ジャズから学ぶ6つの原則

> *即興に見える演奏は膨大な訓練と制約の上にある*

![w:900 center](assets/jazz-principles.svg)
- - **1. 構造の中の自由**: 制約がある方が創造的になれる
- - **2. 聴くことが最優先**: コードレビュー = 他の演奏を聴く
- - **3. 間違いを活かす**: バグを機能に変える柔軟性
- - **4. 繰り返しの中の進化**: イテレーションで洗練される
- - **5. 共通語彙の力**: パターン言語がチームを加速
- - **6. 即興には訓練が必要**: 自由に見える即興は膨大な練習の上にある


---

# まとめ

> *アーキテクチャという枠の中の即興がアジャイルの本質*

- - ジャズの即興は完全な自由ではなく「構造化された自由」
- - アジャイル開発も同じ: アーキテクチャという枠の中の即興
- - チーム開発は指示ではなく「聴き合い」で機能する
- - リファクタリングはリハーモナイゼーション
- 
- **「最高のソフトウェアチームはジャズバンドのように演奏する。」**


---

# 参考文献

- - **Books:**
- - [Agile Software Development - Robert C. Martin (2002)](https://en.wikipedia.org/wiki/Agile_software_development)
- - [The Jazz Process - Adrian Cho (2010)](https://www.informit.com/store/jazz-process-collaboration-innovation-and-agility-9780321636461)
- - **Research:**
- - [Group Creativity: Innovation through Collaboration - Sawyer (2003)](https://keithsawyer.com/books/group-creativity/)

