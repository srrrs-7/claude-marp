---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "完全変態とソフトウェアマイグレーション"
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
# 完全変態

- モノリスがマイクロサービスに変わるとき
- 
- 昆虫の驚異的な変身から学ぶシステム移行の哲学


---

# 目次

- - 1. 完全変態とは何か
- - 2. 4段階の変身プロセス
- - 3. ソフトウェアマイグレーションとの対応
- - 4. Strangler Fig Pattern
- - 5. 蛹の中で起きていること
- - 6. 変態の教訓 -- 移行の設計原則


---

<!-- _class: lead -->
# 完全変態とは


---

# 昆虫の完全変態 (Holometabolism)

- - **完全変態**: 卵 → 幼虫 → 蛹 → 成虫の4段階
- - 昆虫の約80%が完全変態を行う(チョウ、カブトムシ、ハチ等)
- - 対義語: **不完全変態** = 蛹の段階がない(バッタ、カマキリ等)
- - 約3.5億年前に進化した戦略
- 
- なぜ完全変態は成功したのか？
- → **幼虫と成虫で異なるニッチを占められる**


---

# 4段階の変身プロセス

![w:900 center](assets/complete-metamorphosis.svg)


---

# 蛹の中の驚異 -- Imaginal Disc

- - 蛹の中で幼虫の体は**酵素によってほぼ完全に分解**される
- - しかし**imaginal disc**(成虫原基)は生き残る
- - imaginal discは幼虫時代から存在する「未来の設計図」
-   - 翅のdisc、脚のdisc、目のdisc...
-   - 幼虫の体液(栄養)を使って成虫の体を構築
- 
- **「古いシステムのリソースを使って新システムを構築する」**


---

# Imaginal Disc と Strangler Fig（図解）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="360" fill="#1a1a2e"/>
<text x="400" y="34" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">蛹の中で起きていること — Imaginal Disc</text>
<ellipse cx="400" cy="185" rx="180" ry="120" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
<text x="400" y="165" text-anchor="middle" fill="#aaaaaa" font-size="12">幼虫の組織が酵素で分解</text>
<text x="400" y="183" text-anchor="middle" fill="#aaaaaa" font-size="12">（旧モノリスのリソース化）</text>
<ellipse cx="400" cy="205" rx="50" ry="32" fill="#e91e63" opacity="0.9"/>
<text x="400" y="201" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Imaginal</text>
<text x="400" y="217" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Disc</text>
<text x="400" y="253" text-anchor="middle" fill="#f9a825" font-size="10">生き残る「未来の設計図」</text>
<line x1="220" y1="185" x2="345" y2="185" stroke="#aaaaaa" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="140" y="162" text-anchor="middle" fill="#aaaaaa" font-size="10">幼虫の脚</text>
<text x="140" y="178" text-anchor="middle" fill="#aaaaaa" font-size="10">が溶解</text>
<text x="140" y="200" text-anchor="middle" fill="#aaaaaa" font-size="10">翅の原基</text>
<text x="140" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10">が成長</text>
<line x1="455" y1="185" x2="570" y2="185" stroke="#aaaaaa" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="640" y="162" text-anchor="middle" fill="#aaaaaa" font-size="10">目の原基</text>
<text x="640" y="178" text-anchor="middle" fill="#aaaaaa" font-size="10">が発達</text>
<text x="640" y="200" text-anchor="middle" fill="#aaaaaa" font-size="10">口器の</text>
<text x="640" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10">再構築</text>
<rect x="120" y="295" width="260" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="250" y="316" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">モノリスの旧コード = 幼虫の組織</text>
<text x="250" y="330" text-anchor="middle" fill="#ffffff" font-size="10">「溶かして」新システムの栄養に</text>
<rect x="420" y="295" width="260" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
<text x="550" y="316" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">新マイクロサービス = Imaginal Disc</text>
<text x="550" y="330" text-anchor="middle" fill="#ffffff" font-size="10">旧システムの中で育つ新設計</text>
</svg>


---

<!-- _class: lead -->
# ソフトウェアとの対応


---

# 完全変態 × マイグレーション対応図

![w:900 center](assets/software-migration-mapping.svg)


---

# 幼虫 = モノリスの成長期

- - 幼虫は**ひたすら食べて大きくなる**
- - モノリスも**ひたすら機能を追加して大きくなる**
- - 幼虫の脱皮(5回) = メジャーリリース
-   - 外殻を脱ぎ捨てるが内部構造は同じ
-   - リファクタリングせずにバージョンアップ
- - **幼虫の限界**: ある大きさを超えると脱皮では対応できない
- - **モノリスの限界**: ある規模を超えるとスケールしない


---

# 蛹 = 移行期間

- - 蛹の外見は静か。しかし中身は激変している
- - **ソフトウェア移行も同じ:**
-   - ユーザーから見た挙動は変わらない(外殻 = API)
-   - 内部は完全に作り直されている
-   - 古い組織が溶けて新しい組織に再構築される
- - **重要**: 蛹の中でも生物は**生きている**
-   - 移行中もサービスは稼働し続ける必要がある


---

# 変態中もサービスは稼働する（図解）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="340" fill="#1a1a2e"/>
<text x="400" y="34" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">蛹の移行原則 — 生きたまま変態する</text>
<rect x="40" y="80" width="170" height="90" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="125" y="118" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">外殻 (API)</text>
<text x="125" y="138" text-anchor="middle" fill="#ffffff" font-size="11">変わらない</text>
<text x="125" y="155" text-anchor="middle" fill="#aaaaaa" font-size="10">Facade Pattern</text>
<rect x="250" y="80" width="170" height="90" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="335" y="118" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">内部構造</text>
<text x="335" y="138" text-anchor="middle" fill="#ffffff" font-size="11">激変する</text>
<text x="335" y="155" text-anchor="middle" fill="#aaaaaa" font-size="10">Strangler Fig</text>
<rect x="460" y="80" width="170" height="90" rx="10" fill="#16213e" stroke="#4db6ac" stroke-width="2"/>
<text x="545" y="118" text-anchor="middle" fill="#4db6ac" font-size="12" font-weight="bold">サービス継続</text>
<text x="545" y="138" text-anchor="middle" fill="#ffffff" font-size="11">止まらない</text>
<text x="545" y="155" text-anchor="middle" fill="#aaaaaa" font-size="10">Zero Downtime</text>
<rect x="40" y="210" width="590" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="335" y="238" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">変態の3原則</text>
<text x="120" y="268" text-anchor="middle" fill="#ffffff" font-size="11">① APIを変えるな</text>
<text x="335" y="268" text-anchor="middle" fill="#ffffff" font-size="11">② 段階的に移行せよ</text>
<text x="550" y="268" text-anchor="middle" fill="#ffffff" font-size="11">③ 常にサービス継続</text>
<text x="120" y="280" text-anchor="middle" fill="#aaaaaa" font-size="9">外殻の維持</text>
<text x="335" y="280" text-anchor="middle" fill="#aaaaaa" font-size="9">一度に全部変えない</text>
<text x="550" y="280" text-anchor="middle" fill="#aaaaaa" font-size="9">蛹も生きている</text>
</svg>


---

<!-- _class: lead -->
# Strangler Fig Pattern


---

# 絞め殺しイチジクの知恵

![w:900 center](assets/strangler-fig-pattern.svg)


---

# Martin Fowlerの提案 (2004)（1/2）

- - **Strangler Fig Pattern**: Martin Fowlerが命名
- - 熱帯のイチジクは宿主の木に巻きついて成長
- - やがて宿主を「絞め殺して」自立する
- - **ソフトウェアへの応用:**


---

# Martin Fowlerの提案 (2004)（2/2）

-   - 新システムを旧システムの周りに構築
-   - 機能を1つずつ新システムに移行
-   - 最終的に旧システムを除去
- 
- **Big Bang移行(一気に切り替え)の反対概念**


---

# Strangler Fig = 蛹の中のImaginal Disc（1/2）

- - **Imaginal disc**: 幼虫の中に潜む「未来の設計図」
-   - 幼虫の体(旧システム)の栄養を使って成長
-   - 幼虫が溶けても生き残る
- - **新マイクロサービス**: モノリスの中に潜む「未来の設計」


---

# Strangler Fig = 蛹の中のImaginal Disc（2/2）

-   - モノリスのデータとインフラを使って構築
-   - モノリスが除去されても動き続ける
- 
- **生物学的に最も正確なアナロジー**


---

# 成虫 = マイクロサービスの飛翔

- - **成虫の特徴**: 飛行能力、生殖能力、分散
- - **マイクロサービスの特徴**:
-   - **飛行** = 独立デプロイ(どこにでも配置可能)
-   - **生殖** = 新サービスを容易に生み出せる
-   - **分散** = 複数の環境で同時に動作
- - 幼虫にはできなかったことが成虫にはできる
- - モノリスにはできなかったことがマイクロサービスにはできる


---

<!-- _class: lead -->
# 移行の設計原則


---

# 変態から学ぶ移行の5原則

- - **1. 止まらない**: 蛹の中でも生物は生きている → ゼロダウンタイム
- - **2. 外殻を維持**: APIの互換性を保つ → Facade Pattern
- - **3. 段階的に溶かす**: 一度に全てを変えない → 漸進的移行
- - **4. 設計図を先に**: imaginal discを先に作る → 新アーキテクチャを先に設計
- - **5. 栄養を再利用**: 旧システムのリソースを新に活用 → データ移行


---

# 不完全変態 vs 完全変態（1/2）

- - **不完全変態(バッタ型)** = インクリメンタルなリファクタリング
-   - 毎回少しずつ形が変わる
-   - 根本的な構造変化はない
-   - 安全だが限界がある


---

# 不完全変態 vs 完全変態（2/2）

- - **完全変態(チョウ型)** = アーキテクチャの全面刷新
-   - 一度「溶けて」から再構築する
-   - リスクは高いが、根本的に異なる能力を獲得
- 
- **どちらが正解かはコンテキスト次第**


---

# 2つの変態戦略の比較（図解）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="360" fill="#1a1a2e"/>
<text x="400" y="34" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">不完全変態 vs 完全変態 — アーキテクチャ戦略の選択</text>
<rect x="30" y="60" width="340" height="260" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="200" y="88" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">不完全変態（バッタ型）</text>
<text x="200" y="108" text-anchor="middle" fill="#aaaaaa" font-size="11">インクリメンタルなリファクタリング</text>
<text x="50" y="138" fill="#ffffff" font-size="11">• 幼虫 → 幼虫 → ... → 成虫</text>
<text x="50" y="158" fill="#ffffff" font-size="11">• 形が少しずつ変わる</text>
<text x="50" y="178" fill="#ffffff" font-size="11">• 蛹がない = 完全停止なし</text>
<text x="50" y="198" fill="#ffffff" font-size="11">• 根本的な構造変化は起きない</text>
<rect x="50" y="218" width="300" height="60" rx="6" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
<text x="200" y="238" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold">ソフトウェア版</text>
<text x="60" y="256" fill="#ffffff" font-size="10">✓ 安全だが限界がある</text>
<text x="60" y="270" fill="#aaaaaa" font-size="10">✗ 根本的な能力向上が難しい</text>
<rect x="430" y="60" width="340" height="260" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="600" y="88" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">完全変態（チョウ型）</text>
<text x="600" y="108" text-anchor="middle" fill="#aaaaaa" font-size="11">アーキテクチャの全面刷新</text>
<text x="450" y="138" fill="#ffffff" font-size="11">• 卵 → 幼虫 → 蛹 → 成虫</text>
<text x="450" y="158" fill="#ffffff" font-size="11">• 一度「溶けて」から再構築</text>
<text x="450" y="178" fill="#ffffff" font-size="11">• 幼虫と成虫で別の能力</text>
<text x="450" y="198" fill="#ffffff" font-size="11">• 3.5億年の進化が証明</text>
<rect x="450" y="218" width="300" height="60" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
<text x="600" y="238" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold">ソフトウェア版</text>
<text x="460" y="256" fill="#ffffff" font-size="10">✓ 根本的に異なる能力を獲得</text>
<text x="460" y="270" fill="#aaaaaa" font-size="10">✗ リスクが高い、計画が重要</text>
<text x="400" y="340" text-anchor="middle" fill="#aaaaaa" font-size="12">どちらが正解かはコンテキスト次第 — 変化の規模と許容リスクで選ぶ</text>
</svg>


---

# まとめ

- - 昆虫の完全変態は3.5億年の進化が証明した移行戦略
- - モノリス → マイクロサービスは完全変態そのもの
- - Strangler Fig Pattern = 蛹の中のimaginal disc
- - 「止まらない」「外殻を維持」「段階的に溶かす」
- - Big Bang移行は進化が棄却した戦略
- 
- **「最も成功した移行は、外からは何も変わっていないように見える。」**


---

# 参考文献

- - **Biology:**
- - [Holometabolism - Wikipedia](https://en.wikipedia.org/wiki/Holometabolism)
- - [What Happens Inside a Chrysalis - Scientific American](https://www.scientificamerican.com/article/caterpillar-butterfly-metamorphosis-explained/)
- - **Software Architecture:**
- - [Strangler Fig Application - Martin Fowler (2004)](https://martinfowler.com/bliki/StranglerFigApplication.html)
- - [Building Microservices - Sam Newman (2021)](https://samnewman.io/books/building_microservices_2nd_edition/)

