---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "海底ケーブルと植民地支配の遺産"
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
# 植民地ルートを走るインターネット
海底ケーブルと権力の地理学

- 世界のインターネット通信の99%は海底ケーブルを通る
- そのルートは大英帝国の電信網と驚くほど一致する
- デジタル時代にも「地理的権力」は存在する


---

<!-- _class: invert fit-88 -->
# アジェンダ

> *6章で海底ケーブルと地政学的権力の全構造を解明する*

1. 海底ケーブルの基本事実
2. 大英帝国の電信網（1870年代）
3. 植民地ルートとの一致
4. GAFAMが築く新たなケーブル帝国
5. アフリカの「デジタル植民地」問題
6. 地理的権力の未来


---

<!-- _class: invert lead -->
# 海底ケーブルの基本事実

![w:900 center](assets/cable-basics.svg)


---

<!-- _class: invert fit-88 -->
# 知られざるインターネットの物理層

> *99%が直径17mmのケーブルを通る—衛星はわずか1%未満*

- **世界のインターネット通信の99%** は海底ケーブルを通る
- 現在稼働中のケーブル：約**550本**、総延長**140万km以上**
- ケーブルの直径：わずか**17mm**（庭のホース程度）
- 海底8,000mに敷設されるものもある
- 1本のケーブルで毎秒**数百テラビット**を伝送
- → 衛星通信は全体の**1%未満**（遅延が大きく帯域が小さい）


---

<!-- _class: invert lead -->
# 大英帝国の電信網


---

<!-- _class: invert fit-76 -->
# All Red Line（1870年代）

> *全ルートが英領のみ通過—通信支配が帝国支配と同義だった*

![w:900 center](assets/all-red-line.svg)

- **大英帝国が「全赤線」と呼んだ世界電信ネットワーク**
- ロンドンからカイロ、ボンベイ、シンガポール、シドニーへ
- 全てのケーブルが**イギリス領土のみ**を中継する設計
- 目的：戦時にも敵国に傍受されない通信路の確保
- ケーブル敷設・運営はイギリス企業が独占
- → **電信の支配 = 帝国の支配**だった


---

<!-- _class: invert fit-64 -->
# 電信がなぜ植民地支配に不可欠だったか

> *数ヶ月から数時間へ—リアルタイム情報が支配の武器になった*

![w:900 center](assets/telegraph-colonialism.svg)

- **ロンドンからインドへの通信時間：**
- 手紙：数ヶ月 → 電信：**数時間**
- 植民地の反乱を即座に察知し、軍隊を派遣できる
- 商品価格をリアルタイムで把握 → 交易の主導権を握る
- 現地の行政官を本国から直接管理できる
- → **通信インフラ = 支配のインフラ**


---

<!-- _class: invert lead -->
# 植民地ルートとの一致

![w:900 center](assets/colonial-route-match.svg)


---

# 150年前と今の構造比較

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert fit-88 -->
# ルートが一致する理由

> *港湾都市の固定化+地形制約+経済慣性が150年の継続性を説明*

- **1. 中継地点の固定化** ― 港湾都市は変わらない
- カイロ、ムンバイ、シンガポールは150年前から中継点
- **2. 地形的制約** ― ケーブルが通れる海底地形は限られる
- **3. 経済的合理性** ― 既存ルートに沿って敷設するのが安い
- **4. 需要の集中** ― 旧宗主国と旧植民地の経済的つながり
- → **物理的インフラは「歴史の慣性」から逃れられない**


---

<!-- _class: invert lead -->
# GAFAMが築く新たなケーブル帝国


---

<!-- _class: invert fit-70 -->
# テック企業の海底ケーブル投資

> *新規投資の70%超がGAFAM—通信会社からの権力移転が進行中*

![w:900 center](assets/cable-power-flow.svg)

- **Google** ― 世界30本以上のケーブルに投資・所有
- **Meta（Facebook）** ― 2Africa（アフリカ一周ケーブル、37,000km）
- **Microsoft** ― Marea（大西洋横断、160Tbps）
- **Amazon** ― 自社AWSデータセンター接続用ケーブル
- 2024年時点：**新規海底ケーブル投資の70%以上がテック企業**
- → 通信会社からテック企業への**インフラ権力移転**が進行中


---

<!-- _class: invert fit-64 -->
# 「ケーブルを持つ者がルールを決める」

> *データ経路の物理的制御=デジタル主権の喪失—現代の帝国構造*

![w:900 center](assets/gafam-cables.svg)

- ケーブル所有 = **データの物理的経路を制御**できる
- どの国のどのデータセンターを経由するか決められる
- 障害時のトラフィック迂回を自社に有利に誘導できる
- 新興国にとって、ケーブル依存 = **デジタル主権の喪失**
- → かつてのイギリスがケーブルで帝国を管理したように
- → GAFAMがケーブルでデジタル世界を管理する


---

<!-- _class: invert lead -->
# アフリカの「デジタル植民地」問題


---

<!-- _class: invert fit-70 -->
# アフリカのインターネット接続の現実

> *ナイジェリアからケニアがロンドン経由—70%が大陸外を通る現実*

![w:900 center](assets/africa-routing.svg)

- アフリカの多くの国は**欧州経由**でインターネットに接続
- ナイジェリアからケニアへのデータが**ロンドン経由**で届く
- アフリカ内の国際通信の**70%以上が大陸外を経由**
- これはコスト増・遅延増・プライバシーリスクを意味する
- ---
- 旧宗主国のインフラに依存する構造 = **デジタル新植民地主義**
- → データの「通り道」が政治的権力を生んでいる


---

<!-- _class: invert fit-76 -->
# 中国の対抗戦略

> *PEACEケーブルが海底インフラを21世紀の地政学的領土にした*

![w:900 center](assets/china-strategy.svg)

- **PEACE Cable（2022年）** ― パキスタン-東アフリカ-フランス
- 一帯一路の「デジタルシルクロード」の一環
- HMN Technologies（華為海洋）がケーブル敷設を担当
- 米国・EU：「中国がケーブルに傍受装置を仕込むリスク」を警戒
- 結果：ケーブル敷設の地政学的審査が厳格化
- → **海底ケーブルは21世紀の「領土」になりつつある**


---

<!-- _class: invert lead -->
# 地理的権力の未来

![w:900 center](assets/future-of-internet.svg)


---

<!-- _class: invert fit-76 -->
# デジタル主権への動き

> *衛星も米国依存—インフラの地政学から完全に逃れることはできない*

![w:900 center](assets/digital-sovereignty.svg)

- **アフリカ連合：** 大陸内ケーブル網の構築を推進
- **EU：** GDPR + 欧州データ主権 → 域外経由を制限する動き
- **インド：** 自国接続ケーブルの多様化（中国経由を回避）
- **Starlink：** 衛星インターネットがケーブル依存を減らす可能性
- → しかし衛星も米国企業依存（SpaceX, Amazon Kuiper）
- → **インフラの地政学から完全に逃れることはできない**


---

<!-- _class: invert lead -->
# まとめ

- インターネットは「国境のないデジタル空間」ではない
- その物理的基盤は**150年前の植民地支配のルート**を踏襲している
- 通信インフラの支配 = 情報の支配 = 権力
- GAFAMは新たな「ケーブル帝国」を築きつつある
- **問い：** 誰が「インターネットの道路」を所有すべきか？


---

<!-- _class: invert fit-82 -->
# 参考文献

> *TeleGeographyと学術書でデジタル植民地構造を実証する*

- **書籍:**
- [The Undersea Network - Nicole Starosielski](https://www.amazon.com/dp/0822357550)
- [Tubes: A Journey to the Center of the Internet - Andrew Blum](https://www.amazon.com/dp/0061994952)
- **データ:**
- [Submarine Cable Map (TeleGeography)](https://www.submarinecablemap.com/)
- [Internet Society: Submarine Cables](https://www.internetsociety.org/)

