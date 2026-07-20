---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "東京の鉄道定時運行"
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
# 東京の電車はなぜ1分も遅れないのか
定時運行の科学

- 新幹線の年間平均遅延：0.9分
- 1日1,300万人を運ぶ東京の鉄道が秒単位で動く仕組み
- テクノロジー・設計・文化の三位一体


---

<!-- _class: invert fit-76 -->
# アジェンダ

> *6テーマで東京定時運行の技術・文化・設計原則を体系的に学ぶ*

![w:800 center](assets/svg-agenda.svg)

1. 世界が驚く東京の定時運行
2. ATC：自動列車制御の仕組み
3. ATOS：AI運行管理システム
4. ホーム設計と乗降の最適化
5. 人間の技術：乗務員の職人芸
6. システム設計への教訓


---

<!-- _class: invert lead -->
# 世界が驚く東京の定時運行


---

<!-- _class: invert fit-76 -->
# 各国の鉄道定時率比較

> *日本は「1分」基準でも99.3%、欧米の5〜10倍厳格*

![w:800 center](assets/svg-punctuality.svg)

- **日本（新幹線）：** 定時率 99.3%（遅延の定義：1分以上）
- **日本（在来線）：** 定時率 約95%（首都圏、1分以上基準）
- **ドイツ（DB）：** 定時率 65%（6分以上を遅延とカウント）
- **イギリス（National Rail）：** 定時率 70%（5分以上）
- **アメリカ（Amtrak）：** 定時率 50%（10分以上）
- → **日本は基準が「1分」で厳しいのに、なお世界最高**


---

<!-- _class: invert fit-88 -->
# 「遅延証明書」という文化

> *5分遅延が社会問題になる国は世界で日本だけ*

- 電車が5分以上遅延すると**遅延証明書**が発行される
- 会社・学校に遅刻した時の「公式な言い訳」
- → 世界で日本だけの制度（他国では遅延は「日常」）
- 5分遅延で謝罪アナウンス、15分で駅員が頭を下げる
- 2018年：つくばエクスプレスが**20秒早発で公式謝罪**
- → **定時運行は技術だけでなく「文化的期待値」の問題**


---

<!-- _class: invert lead -->
# ATC：自動列車制御の仕組み


---

<!-- _class: invert fit-70 -->
# ATC（Automatic Train Control）

> *15秒ごとに速度指令を更新し時速285kmを秒単位制御*

![w:800 center](assets/svg-atc.svg)

- **軌道回路** ― レールに電流を流し、列車の位置を検知
- 先行列車との距離に応じて**自動で速度制限**をかける
- 運転士が速度超過 → システムが自動ブレーキ
- 山手線：最短**2分間隔**で運行可能（ATCなしでは不可能）
- ---
- 新幹線のDS-ATC：**15秒ごとに速度指令を更新**
- → 時速285kmの列車を**秒単位で制御**するリアルタイムシステム


---

# 定時運行を支えるシステム全体像

![w:900 center](assets/diagram-01.svg)


---

<!-- _class: invert lead -->
# ATOS：AI運行管理システム


---

<!-- _class: invert fit-58 -->
# ATOS（Autonomous Decentralized Transport Operation control System）

> *1日12,000本を同時最適化、人間では不可能なスケール*

![w:800 center](assets/svg-atos.svg)

- **JR東日本が開発した世界最先端の運行管理システム**
- 首都圏24線区、約1,600駅をリアルタイムで一元管理
- 列車遅延発生時：**自動でダイヤ復旧案を生成**
- 折り返し運転・列車順序変更・接続列車の調整を自動化
- 1日約12,000本の列車を同時に最適化
- → **人間では不可能な規模の最適化問題をAIが解く**


---

<!-- _class: invert fit-64 -->
# 遅延回復の驚異的な速さ

> *3分の遅延を3〜4周で自己修復する分散制御の実例*

![w:800 center](assets/svg-recovery.svg)

- **山手線で3分の遅延が発生した場合：**
- ATOSが全列車の速度・停車時間を自動調整
- 各駅の停車時間を2-3秒ずつ短縮
- 3-4周で遅延がほぼ解消される
- → **自己修復するシステム**
- ---
- 分散システムでいう**自動スケーリング + リバランシング**と同じ概念


---

<!-- _class: invert lead -->
# ホーム設計と乗降の最適化


---

<!-- _class: invert fit-76 -->
# 乗降時間を最小化する設計

> *整列乗車という暗黙のAPIが全体スループットを決める*

![w:800 center](assets/svg-boarding.svg)

- **整列乗車** ― ホームにマーキングされた位置に並ぶ
- 降車客が先 → 乗車客が後：暗黙のプロトコル
- ホームドア ― 安全確保 + 列車停車位置の精度向上
- ワイドドア車両（東西線）― ドア幅1.8m（通常1.3m）
- **目標：1駅あたりの停車時間30秒以内**
- → 乗降の「プロトコル」が全体のスループットを決める


---

<!-- _class: invert lead -->
# 人間の技術：乗務員の職人芸


---

<!-- _class: invert fit-76 -->
# 秒単位の停車技術

> *±10cm精度の手動停車が最終品質を担保する理由*

![w:800 center](assets/svg-driver.svg)

- 運転士の停車位置精度：**±10cm以内**（ホームドア対応）
- ブレーキ操作は手動 ― ATOでも最終調整は人間
- 「指差確認」― 全ての操作を声に出して指差す安全習慣
- 車掌の乗降確認 → 0.5秒単位でドア閉鎖タイミングを判断
- 新人の訓練期間：**約1年**（シミュレーター + 実地訓練）
- → **テクノロジー + 人間の技術の組み合わせが最適解**


---

<!-- _class: invert lead -->
# システム設計への教訓


---

<!-- _class: invert fit-82 -->
# 東京の鉄道から学ぶシステム設計原則

> *多層防御×自己回復×標準化で99.3%信頼性を実現*

![w:800 center](assets/svg-principles.svg)

- **1. 多層防御** ― ATC + ATOS + 人間 の3層で信頼性確保
- **2. 自動回復** ― 遅延を自動で吸収するレジリエンス設計
- **3. プロトコルの標準化** ― 整列乗車という「暗黙のAPI」
- **4. 秒単位のSLA** ― 「1分」を遅延とする厳格な品質基準
- **5. 人間 + 機械のハイブリッド** ― 完全自動化より協調が効率的


---

<!-- _class: invert lead fit-70 -->
# まとめ

![w:800 center](assets/svg-summary.svg)

- 東京の定時運行は**技術・設計・文化の三位一体**で実現している
- ATC（安全制御）+ ATOS（最適化）+ 人間（微調整）の多層構造
- 「遅延は恥」という文化的期待値がシステム全体の品質を引き上げる
- 1日1,300万人を秒単位で運ぶ ― 世界最大級のリアルタイムシステム
- **教訓：** 99.3%の信頼性は偶然では達成できない。設計の積み重ねが必要


---

<!-- _class: invert fit-88 -->
# 参考文献

> *定時運行システムの数値と設計原則を検証できる一次資料集*

- **書籍・論文:**
- [新幹線のひみつ - JR東海](https://www.amazon.co.jp/)
- [ATOS: Transport Operation System (IEEE)](https://ieeexplore.ieee.org/)
- **データ:**
- [JR東日本 安全報告書](https://www.jreast.co.jp/)
- [国土交通省 鉄道統計](https://www.mlit.go.jp/)

