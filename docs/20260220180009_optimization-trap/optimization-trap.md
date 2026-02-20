---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "最適化の罠"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# 最適化の罠

- **効率化するほど脆くなるシステムの逆説**
- 
- なぜ最も効率的なシステムが最も危険なのか


---

<!-- _class: lead -->
# 効率化と脆弱性のトレードオフ

- 歴史が証明する「最適化の代償」


---

# ジャストインタイムとCOVID-19

- - **トヨタ生産方式（JIT）**: 在庫ゼロ、必要な時に必要な量だけ調達
- - 世界中の製造業がJITを採用 → **究極の効率化**を達成
- - 2020年: COVID-19 → サプライチェーン寸断 → 半導体不足、マスク不足
- - **在庫ゼロ = バッファゼロ = 衝撃吸収能力ゼロ**
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">JITサプライチェーンの崩壊</text><rect x="50" y="65" width="120" height="50" rx="8" fill="#0f3460"/><text x="110" y="95" text-anchor="middle" fill="#fff" font-size="12">原材料</text><line x1="170" y1="90" x2="220" y2="90" stroke="#4eff4e" stroke-width="2"/><polygon points="215,84 225,90 215,96" fill="#4eff4e"/><rect x="225" y="65" width="120" height="50" rx="8" fill="#0f3460"/><text x="285" y="95" text-anchor="middle" fill="#fff" font-size="12">部品製造</text><line x1="345" y1="90" x2="395" y2="90" stroke="#4eff4e" stroke-width="2"/><polygon points="390,84 400,90 390,96" fill="#4eff4e"/><rect x="400" y="65" width="120" height="50" rx="8" fill="#0f3460"/><text x="460" y="95" text-anchor="middle" fill="#fff" font-size="12">組立工場</text><line x1="520" y1="90" x2="570" y2="90" stroke="#4eff4e" stroke-width="2"/><polygon points="565,84 575,90 565,96" fill="#4eff4e"/><rect x="575" y="65" width="120" height="50" rx="8" fill="#0f3460"/><text x="635" y="95" text-anchor="middle" fill="#fff" font-size="12">出荷</text><text x="400" y="140" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">在庫バッファ = ゼロ (JIT)</text><line x1="200" y1="155" x2="200" y2="185" stroke="#e94560" stroke-width="3"/><text x="200" y="200" text-anchor="middle" fill="#e94560" font-size="30" font-weight="bold">X</text><text x="200" y="225" text-anchor="middle" fill="#e94560" font-size="12">COVID-19 で寸断</text><line x1="250" y1="190" x2="700" y2="190" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><text x="500" y="225" text-anchor="middle" fill="#e94560" font-size="13" font-weight="bold">→ 全工程が連鎖停止</text></svg>


---

# 生態系の多様性と効率性

- - **単一栽培（モノカルチャー）**: 収量最大化のために1種類だけを植える
- - 1845年アイルランド: じゃがいも単一栽培 → 疫病で**全作物が壊滅** → 大飢饉
- - **多様性 = 非効率だが耐障害性が高い**: 一部が倒れても全体は生き残る
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">多様性 vs 効率性のトレードオフ</text><line x1="80" y1="210" x2="380" y2="210" stroke="#aaa" stroke-width="2"/><line x1="80" y1="210" x2="80" y2="60" stroke="#aaa" stroke-width="2"/><text x="230" y="235" text-anchor="middle" fill="#aaa" font-size="12">効率性 →</text><text x="50" y="135" text-anchor="middle" fill="#aaa" font-size="11" transform="rotate(-90,50,135)">耐障害性</text><path d="M 90 80 Q 180 90, 230 130 Q 280 170, 370 200" fill="none" stroke="#4eff4e" stroke-width="3"/><circle cx="120" cy="85" r="5" fill="#4eff4e"/><text x="115" y="75" fill="#4eff4e" font-size="10">多様</text><circle cx="350" cy="195" r="5" fill="#e94560"/><text x="345" y="185" fill="#e94560" font-size="10">単一</text><rect x="430" y="60" width="160" height="80" rx="10" fill="#0f3460"/><text x="510" y="85" text-anchor="middle" fill="#4eff4e" font-size="13" font-weight="bold">多品種農場</text><text x="510" y="105" text-anchor="middle" fill="#fff" font-size="11">効率60% / 耐性90%</text><text x="510" y="125" text-anchor="middle" fill="#4eff4e" font-size="11">疫病 → 一部のみ影響</text><rect x="430" y="155" width="160" height="80" rx="10" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="510" y="180" text-anchor="middle" fill="#e94560" font-size="13" font-weight="bold">単一栽培</text><text x="510" y="200" text-anchor="middle" fill="#fff" font-size="11">効率95% / 耐性5%</text><text x="510" y="220" text-anchor="middle" fill="#e94560" font-size="11">疫病 → 全滅</text><text x="700" y="120" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">効率性と</text><text x="700" y="140" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">耐障害性は</text><text x="700" y="160" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">トレードオフ</text></svg>


---

# インターネットの集中化リスク

- - インターネット全体が少数のプロバイダーに依存
- - **2021年6月 Fastly障害**: Reddit, Twitch, The Guardian, Amazon等が同時停止
- - **2023年 Cloudflare障害**: 数百万サイトが影響
- - 分散型ネットワークが実は**高度に集中化**されている逆説
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">集中化されたインターネットの依存関係</text><circle cx="400" cy="110" r="45" fill="#e94560" opacity="0.8"/><text x="400" y="105" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">CDN/Cloud</text><text x="400" y="120" text-anchor="middle" fill="#fff" font-size="10">(単一障害点)</text><rect x="80" y="180" width="100" height="35" rx="6" fill="#0f3460"/><text x="130" y="202" text-anchor="middle" fill="#fff" font-size="11">Reddit</text><rect x="210" y="180" width="100" height="35" rx="6" fill="#0f3460"/><text x="260" y="202" text-anchor="middle" fill="#fff" font-size="11">Twitch</text><rect x="340" y="180" width="100" height="35" rx="6" fill="#0f3460"/><text x="390" y="202" text-anchor="middle" fill="#fff" font-size="11">Amazon</text><rect x="470" y="180" width="100" height="35" rx="6" fill="#0f3460"/><text x="520" y="202" text-anchor="middle" fill="#fff" font-size="11">Guardian</text><rect x="600" y="180" width="100" height="35" rx="6" fill="#0f3460"/><text x="650" y="202" text-anchor="middle" fill="#fff" font-size="11">+数百万</text><line x1="370" y1="145" x2="130" y2="180" stroke="#e94560" stroke-width="1.5"/><line x1="385" y1="150" x2="260" y2="180" stroke="#e94560" stroke-width="1.5"/><line x1="400" y1="155" x2="390" y2="180" stroke="#e94560" stroke-width="1.5"/><line x1="415" y1="150" x2="520" y2="180" stroke="#e94560" stroke-width="1.5"/><line x1="430" y1="145" x2="650" y2="180" stroke="#e94560" stroke-width="1.5"/><text x="400" y="245" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">1つの障害 → 全サービス同時停止</text></svg>


---

<!-- _class: lead -->
# ソフトウェアシステムの最適化の罠

- 効率を追求したアーキテクチャが生む意図せぬ脆弱性


---

# マイクロサービスの「最適分割」の罠

- - 各サービスを**個別に最適化** → サービス間通信の複雑度が爆発
- - **分散システムの8つの誤り**: ネットワークは信頼できる、遅延はゼロ...
- - サービス数 n → 通信パス数は最大 **n(n-1)/2** に増加
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">サービス分割による通信複雑度の増大</text><rect x="60" y="60" width="250" height="190" rx="12" fill="#16213e"/><text x="185" y="85" text-anchor="middle" fill="#4eff4e" font-size="14" font-weight="bold">モノリス (1サービス)</text><rect x="100" y="100" width="170" height="130" rx="8" fill="#0f3460"/><text x="185" y="140" text-anchor="middle" fill="#fff" font-size="13">全機能が1つ</text><text x="185" y="165" text-anchor="middle" fill="#fff" font-size="12">通信パス: 0</text><text x="185" y="190" text-anchor="middle" fill="#4eff4e" font-size="12">障害点: 1</text><rect x="390" y="60" width="370" height="190" rx="12" fill="#16213e"/><text x="575" y="85" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">マイクロサービス (6)</text><circle cx="460" cy="130" r="20" fill="#533483"/><text x="460" y="134" text-anchor="middle" fill="#fff" font-size="9">Auth</text><circle cx="540" cy="110" r="20" fill="#533483"/><text x="540" y="114" text-anchor="middle" fill="#fff" font-size="9">User</text><circle cx="620" cy="130" r="20" fill="#533483"/><text x="620" y="134" text-anchor="middle" fill="#fff" font-size="9">Order</text><circle cx="460" cy="200" r="20" fill="#533483"/><text x="460" y="204" text-anchor="middle" fill="#fff" font-size="9">Pay</text><circle cx="540" cy="220" r="20" fill="#533483"/><text x="540" y="224" text-anchor="middle" fill="#fff" font-size="9">Notify</text><circle cx="620" cy="200" r="20" fill="#533483"/><text x="620" y="204" text-anchor="middle" fill="#fff" font-size="9">Stock</text><line x1="475" y1="120" x2="525" y2="115" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="555" y1="120" x2="605" y2="125" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="460" y1="150" x2="460" y2="180" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="620" y1="150" x2="620" y2="180" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="475" y1="195" x2="525" y2="215" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="555" y1="215" x2="605" y2="205" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="480" y1="130" x2="600" y2="130" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="480" y1="200" x2="600" y2="200" stroke="#e94560" stroke-width="1" opacity="0.6"/><line x1="540" y1="130" x2="540" y2="200" stroke="#e94560" stroke-width="1" opacity="0.6"/><text x="575" y="250" text-anchor="middle" fill="#e94560" font-size="12">通信パス: 15 / 障害点: 6+</text></svg>


---

# データベースのN+1最適化地獄

- - N+1クエリ問題を解消 → **Eager Loading** に変更
- - しかしデータ量増大 → **キャッシュ戦略**を導入
- - キャッシュ不整合 → **キャッシュ無効化ロジック**が複雑化
- - 最終的に: **最適化のための最適化**が新たな複雑性を生む

```javascript
// Level 1: N+1問題
users.forEach(u => db.query('SELECT * FROM orders WHERE user_id = ?', u.id))

// Level 2: Eager Loading で解決
db.query('SELECT * FROM users JOIN orders ON ...')

// Level 3: キャッシュ追加
const cached = await redis.get(`user:${id}:orders`)
if (!cached) { /* DB query + cache set */ }

// Level 4: キャッシュ無効化の地獄
// orders更新時にuser, order, aggregate, ranking全てのキャッシュを無効化...
```


---

# CI/CDパイプラインの並列化の罠

- - パイプラインを**並列化** → ビルド時間を短縮（効率化）
- - しかし並列テストが**共有状態**に依存 → フレーキーテスト増加
- - テスト信頼性低下 → 「赤いテストは無視する」文化が蔓延
- - **効率化がテストの意味そのものを破壊する**逆説
- 
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="220" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">並列化 → フレーキーテスト → 信頼崩壊</text><rect x="60" y="60" width="130" height="40" rx="8" fill="#0f3460"/><text x="125" y="85" text-anchor="middle" fill="#fff" font-size="12">ビルド並列化</text><line x1="190" y1="80" x2="240" y2="80" stroke="#e94560" stroke-width="2"/><polygon points="235,74 245,80 235,86" fill="#e94560"/><rect x="245" y="60" width="130" height="40" rx="8" fill="#533483"/><text x="310" y="85" text-anchor="middle" fill="#fff" font-size="12">共有状態競合</text><line x1="375" y1="80" x2="425" y2="80" stroke="#e94560" stroke-width="2"/><polygon points="420,74 430,80 420,86" fill="#e94560"/><rect x="430" y="60" width="150" height="40" rx="8" fill="#8B4513"/><text x="505" y="85" text-anchor="middle" fill="#fff" font-size="12">フレーキーテスト</text><line x1="580" y1="80" x2="630" y2="80" stroke="#e94560" stroke-width="2"/><polygon points="625,74 635,80 625,86" fill="#e94560"/><rect x="635" y="60" width="120" height="40" rx="8" fill="#e94560"/><text x="695" y="85" text-anchor="middle" fill="#fff" font-size="12">信頼崩壊</text><rect x="150" y="130" width="500" height="55" rx="10" fill="#16213e" stroke="#ffcc00" stroke-width="2"/><text x="400" y="155" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">「赤いテストは無視する」文化の蔓延</text><text x="400" y="175" text-anchor="middle" fill="#aaa" font-size="12">→ テストの存在意義そのものが失われる</text></svg>


---

# Goodhartの法則 — 測定値が目標になる瞬間

- - **Goodhartの法則**: 「測定値が目標になった瞬間、良い測定値でなくなる」
- - ベロシティ最適化 → ストーリーポイントの水増し
- - カバレッジ最適化 → 意味のないテストが増殖
- - レスポンスタイム最適化 → 遅いリクエストを切り捨てる
- 
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="220" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">Goodhartの法則 — メトリクスの腐敗</text><rect x="60" y="60" width="200" height="55" rx="8" fill="#0f3460"/><text x="160" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">測定値</text><text x="160" y="100" text-anchor="middle" fill="#4eff4e" font-size="11">現実を反映</text><line x1="260" y1="88" x2="320" y2="88" stroke="#ffcc00" stroke-width="2"/><polygon points="315,82 325,88 315,94" fill="#ffcc00"/><text x="290" y="78" text-anchor="middle" fill="#ffcc00" font-size="10">目標化</text><rect x="325" y="60" width="200" height="55" rx="8" fill="#533483"/><text x="425" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">目標</text><text x="425" y="100" text-anchor="middle" fill="#ffcc00" font-size="11">数字を追う行動に変質</text><line x1="525" y1="88" x2="585" y2="88" stroke="#e94560" stroke-width="2"/><polygon points="580,82 590,88 580,94" fill="#e94560"/><rect x="590" y="60" width="160" height="55" rx="8" fill="#e94560"/><text x="670" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">腐った指標</text><text x="670" y="100" text-anchor="middle" fill="#fff" font-size="11">現実と乖離</text><rect x="100" y="135" width="180" height="40" rx="6" fill="#16213e"/><text x="190" y="160" text-anchor="middle" fill="#aaa" font-size="11">ベロシティ → ポイント水増し</text><rect x="310" y="135" width="180" height="40" rx="6" fill="#16213e"/><text x="400" y="160" text-anchor="middle" fill="#aaa" font-size="11">カバレッジ → 空テスト増殖</text><rect x="520" y="135" width="180" height="40" rx="6" fill="#16213e"/><text x="610" y="160" text-anchor="middle" fill="#aaa" font-size="11">応答時間 → 遅い処理を切捨</text><text x="400" y="210" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">最適化すべき「何を」が腐敗する</text></svg>


---

<!-- _class: lead -->
# レジリエンスの設計

- 最適化の罠を回避する設計原則


---

# Slack（余裕）の経済学

- - **余裕のないシステムは外乱に無力**: 稼働率100%のサーバーは新リクエストを処理できない
- - Googleの**20%ルール**: 「非効率」がイノベーションを生む（Gmail, AdSense）
- - **デマルコの法則**: チーム稼働率80%が最も生産的、100%は逆効果
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">余裕あり vs 余裕なしのシステム応答</text><rect x="60" y="60" width="300" height="170" rx="12" fill="#16213e" stroke="#4eff4e" stroke-width="2"/><text x="210" y="85" text-anchor="middle" fill="#4eff4e" font-size="14" font-weight="bold">余裕あり (稼働率 70%)</text><rect x="90" y="100" width="210" height="25" rx="4" fill="#0f3460"/><rect x="90" y="100" width="147" height="25" rx="4" fill="#4eff4e" opacity="0.7"/><text x="195" y="117" text-anchor="middle" fill="#fff" font-size="10">通常負荷</text><rect x="90" y="140" width="210" height="25" rx="4" fill="#0f3460"/><rect x="90" y="140" width="189" height="25" rx="4" fill="#ffcc00" opacity="0.7"/><text x="195" y="157" text-anchor="middle" fill="#1a1a2e" font-size="10">外乱時 → 吸収可能</text><text x="210" y="200" text-anchor="middle" fill="#4eff4e" font-size="13">応答: 正常に処理</text><rect x="440" y="60" width="300" height="170" rx="12" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="590" y="85" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">余裕なし (稼働率 95%)</text><rect x="470" y="100" width="210" height="25" rx="4" fill="#0f3460"/><rect x="470" y="100" width="200" height="25" rx="4" fill="#e94560" opacity="0.7"/><text x="575" y="117" text-anchor="middle" fill="#fff" font-size="10">通常負荷</text><rect x="470" y="140" width="210" height="25" rx="4" fill="#0f3460"/><rect x="470" y="140" width="240" height="25" rx="4" fill="#e94560" opacity="0.9"/><text x="575" y="157" text-anchor="middle" fill="#fff" font-size="10">外乱時 → 溢れる!</text><text x="590" y="200" text-anchor="middle" fill="#e94560" font-size="13">応答: 障害 / タイムアウト</text></svg>


---

# カオスエンジニアリングという「意図的非効率」

- - **本番環境で意図的に障害を起こす** = 一見「非効率」の極み
- - しかし**障害への耐性**が劇的に向上 → 長期的にはコスト削減
- - Netflix: Chaos Monkeyで毎日ランダムにサーバー停止
- - Amazon: GameDay演習で大規模障害をシミュレーション
- - **「壊す時間」は投資であり浪費ではない**


---

# 疎結合と冗長性の経済価値

- - **冗長性はコスト**: サーバー2台運用 = 費用2倍
- - **障害コスト**: ダウンタイム1時間 = 売上損失 + 信頼失墜 + 復旧工数
- - **期待値計算**: 冗長投資 << 障害損失 x 発生確率
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">冗長投資 vs 障害損失の期待値</text><rect x="60" y="60" width="300" height="70" rx="10" fill="#0f3460"/><text x="210" y="85" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">冗長構成のコスト</text><text x="210" y="105" text-anchor="middle" fill="#4eff4e" font-size="14">年間 $50,000</text><rect x="60" y="145" width="300" height="90" rx="10" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="210" y="170" text-anchor="middle" fill="#e94560" font-size="13" font-weight="bold">障害損失の期待値</text><text x="210" y="195" text-anchor="middle" fill="#fff" font-size="12">$500,000/件 x 年2回確率</text><text x="210" y="215" text-anchor="middle" fill="#e94560" font-size="14">= $1,000,000/年</text><rect x="440" y="100" width="300" height="80" rx="10" fill="#16213e" stroke="#4eff4e" stroke-width="2"/><text x="590" y="125" text-anchor="middle" fill="#4eff4e" font-size="15" font-weight="bold">ROI = 20倍</text><text x="590" y="150" text-anchor="middle" fill="#ffcc00" font-size="13">冗長性は「保険」ではなく「投資」</text><line x1="360" y1="95" x2="440" y2="130" stroke="#4eff4e" stroke-width="2"/><polygon points="435,125 445,133 433,132" fill="#4eff4e"/><line x1="360" y1="190" x2="440" y2="150" stroke="#e94560" stroke-width="2"/><polygon points="435,153 445,147 435,145" fill="#e94560"/></svg>


---

# 「最適化するな、適応させよ」

- - **固定最適解より適応能力**: 環境が変わると最適解も変わる
- - **アンチフラジャイル（Taleb）**: ストレスで壊れるのではなく**強くなる**システム
- - 進化生物学: 生き残るのは最も強い種ではなく**最も適応できる種**
- - ソフトウェアへの応用: Feature Flag、A/Bテスト、段階的リリース
- - **完璧な設計より、素早く方向転換できる設計が勝つ**


---

<!-- _class: lead -->
# まとめ — 脆さを認識するエンジニアリング

- **最適化されたシステムは美しいが壊れやすい**
- 
- 本物のエンジニアリングとは:
- 
- - 効率化と耐障害性の**トレードオフを認識**する
- - **意図的な余裕（Slack）**をシステムに組み込む
- - 冗長性を**コストではなく投資**として正当化する
- - **適応能力**を最適化の上位目標に置く


---

# 参考文献

- **書籍:**
- - [Nassim Nicholas Taleb "Antifragile" (2012)](https://en.wikipedia.org/wiki/Antifragile_(book))
- - [Tom DeMarco "Slack" (2001)](https://www.oreilly.com/library/view/slack/0767907698/)
- 
- **ソフトウェア工学:**
- - [Martin Fowler "Microservices"](https://martinfowler.com/articles/microservices.html)
- - [Fallacies of Distributed Computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)
- 
- **カオスエンジニアリング:**
- - [Principles of Chaos Engineering](https://principlesofchaos.org/)
- - [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law)

