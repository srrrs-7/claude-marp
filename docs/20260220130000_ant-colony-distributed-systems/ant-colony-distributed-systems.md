---
marp: true
theme: gaia
size: 16:9
paginate: true
header: "アリのコロニーに学ぶ分散システム"
footer: "© 2026"
style: |
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section.center {
    text-align: center;
  }
  section table {
    font-size: 0.85em;
  }
  
---

<!-- _class: lead -->
# アリのコロニーに学ぶ分散システム

- **女王は命令していない**
- 
- 創発・P2P設計・自己組織化の原理を自然から学ぶ
- 
- 180分 ワークショップ

<!--
オープニング。衝撃的な事実からスタートして興味を引く。
-->

---

# 女王は命令していない

- <svg viewBox='0 0 780 340' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='340' fill='#1a1a2e' rx='12'/>
-   <text x='390' y='38' text-anchor='middle' font-size='20' font-weight='bold' fill='#e94560'>よくある誤解</text>
-   <rect x='40' y='55' width='320' height='120' rx='10' fill='#16213e' stroke='#e94560' stroke-width='2'/>
-   <text x='200' y='82' text-anchor='middle' font-size='14' fill='#e94560' font-weight='bold'>❌ 中央集権モデル（誤解）</text>
-   <text x='60' y='108' font-size='13' fill='#aaa'>女王アリ</text>
-   <text x='60' y='128' font-size='13' fill='#aaa'>　└ 命令 → 働きアリA</text>
-   <text x='60' y='148' font-size='13' fill='#aaa'>　└ 命令 → 働きアリB</text>
-   <text x='60' y='168' font-size='13' fill='#aaa'>　└ 命令 → 働きアリC</text>
-   <rect x='420' y='55' width='320' height='120' rx='10' fill='#0f3460' stroke='#00b4d8' stroke-width='2'/>
-   <text x='580' y='82' text-anchor='middle' font-size='14' fill='#00b4d8' font-weight='bold'>✅ 分散自律モデル（実態）</text>
-   <text x='440' y='108' font-size='13' fill='#aaa'>女王アリ = 産卵専門（命令なし）</text>
-   <text x='440' y='128' font-size='13' fill='#aaa'>働きアリA ⇄ フェロモン ⇄ 働きアリB</text>
-   <text x='440' y='148' font-size='13' fill='#aaa'>　　　　↕ 環境情報 ↕</text>
-   <text x='440' y='168' font-size='13' fill='#aaa'>働きアリC ⇄ フェロモン ⇄ 働きアリD</text>
-   <text x='390' y='210' text-anchor='middle' font-size='18' font-weight='bold' fill='#ffd166'>💡 コロニーの知性は「個々のルール」から創発する</text>
-   <rect x='60' y='230' width='660' height='80' rx='8' fill='#0f3460' opacity='0.7'/>
-   <text x='390' y='258' text-anchor='middle' font-size='14' fill='#e0e0e0'>アリ1匹の知能は低い。でも100万匹が集まると…</text>
-   <text x='390' y='282' text-anchor='middle' font-size='14' fill='#e0e0e0'>最短経路探索・食料調達・巣の温度管理・外敵撃退</text>
-   <text x='390' y='304' text-anchor='middle' font-size='13' fill='#00b4d8'>→ これが「創発（Emergence）」</text>
- </svg>

<!--
女王アリは実際には命令を出していない。産卵に専念するだけ。コロニー全体の知性は個々の単純なルールから生まれる。
-->

---

# アジェンダ

- **Ch.1** アリのコロニーの実態（生物学的根拠）
- **Ch.2** 創発とは何か
- **Ch.3** 分散システムへの翻訳
- **Ch.4** 実際のシステム事例（Kafka・DynamoDB・K8s）
- **Ch.5** 設計実践・ケーススタディ
- **Ch.6** まとめ・Q&A
- 
- > 🎯 目標: アリから学んだ設計原則を自分のシステムに適用できる


---

<!-- _class: lead -->
# Ch.1 アリのコロニーとは

- **生物学的根拠 — アリの実態を知る**
- 
- なぜ中央集権なしで、コロニーは最適解を見つけるのか


---

# アリのコロニーとは

- **規模と多様性**
- - 種類: 世界に約2万種、日本に約300種
- - コロニー規模: 数百〜2,000万匹（軍隊アリ）
- - 寿命: 女王アリ = 最長30年、働きアリ = 数週間〜数ヶ月
- 
- **役割の自律分担**
- - 女王アリ: 産卵専門（コロニーに1〜数匹）
- - 働きアリ: 採餌・巣作り・育児・警備（役割は自律的に切替）
- - 雄アリ: 交尾のみ（役割終了後は死亡）
- 
- > 🐜 1匹あたりの脳は約25万ニューロン（人間は860億）


---

# フェロモンコミュニケーション

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#f8f9fa' rx='10'/>
-   <text x='390' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='#2d3436'>フェロモン経路の形成プロセス</text>
-   <rect x='20' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='130' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>① ランダム探索</text>
-   <text x='130' y='90' text-anchor='middle' font-size='11' fill='#636e72'>フェロモン痕跡なし</text>
-   <rect x='40' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>
-   <text x='70' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='160' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='190' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='100' y1='115' x2='130' y2='140' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <line x1='100' y1='115' x2='90' y2='160' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <line x1='100' y1='115' x2='140' y2='170' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <text x='130' y='220' text-anchor='middle' font-size='10' fill='#636e72'>バラバラに探索</text>
-   <rect x='280' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='390' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>② 発見・フェロモン付与</text>
-   <text x='390' y='90' text-anchor='middle' font-size='11' fill='#636e72'>食料を見つけたアリが痕跡</text>
-   <rect x='300' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>
-   <text x='330' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='420' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='450' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='360' y1='115' x2='420' y2='115' stroke='#fdcb6e' stroke-width='3'/>
-   <text x='390' y='148' text-anchor='middle' font-size='11' fill='#e17055'>フェロモン付与</text>
-   <text x='390' y='220' text-anchor='middle' font-size='10' fill='#636e72'>短い経路ほど</text>
-   <text x='390' y='235' text-anchor='middle' font-size='10' fill='#636e72'>フェロモン濃度高</text>
-   <rect x='540' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='650' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>③ 最短経路に収束</text>
-   <text x='650' y='90' text-anchor='middle' font-size='11' fill='#636e72'>正のフィードバック</text>
-   <rect x='560' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>
-   <text x='590' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='680' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='710' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='620' y1='115' x2='680' y2='115' stroke='#e17055' stroke-width='6' opacity='0.8'/>
-   <text x='650' y='148' text-anchor='middle' font-size='11' fill='#e17055'>最短経路が強化</text>
-   <text x='650' y='200' text-anchor='middle' font-size='10' fill='#636e72'>全員がこの経路を</text>
-   <text x='650' y='215' text-anchor='middle' font-size='10' fill='#636e72'>たどるようになる</text>
-   <text x='390' y='305' text-anchor='middle' font-size='12' fill='#6c5ce7' font-weight='bold'>→ 中央制御なしで最適化が自律的に完了する</text>
- </svg>

<!--
フェロモンは揮発するため、短い経路ほど往復が早く濃度が高まる。これが正のフィードバックになり最短経路に収束する。
-->

---

# スティグマジー — 環境媒介型協調

- **スティグマジー（Stigmergy）とは**
- - 「環境に痕跡を残す」ことで間接的に協調する仕組み
- - 誰かが状態を見て次の行動を決める（直接通信不要）
- 
- **アリの巣の建設**
- - アリAが土を運んで置く → 環境が変化
- - アリBがその変化を感知して続きを建設
- - 設計図も指示も不要で巣が完成
- 
- **工学への示唆**
- - イベントソーシング: イベントログが「環境の痕跡」
- - 共有キュー: タスクを置いた状態が「スティグマジー信号」
- - Git: コミットログが「分散協調の痕跡」


---

# 役割の自発的分業

- **指示なく役割が決まる仕組み**
- - 遺伝子の閾値モデル: 各個体が異なる「反応しきい値」を持つ
- - 採餌が必要 → 閾値の低いアリが先に反応して採餌に出る
- - 残った仕事 → 次に閾値の低いアリが担当
- 
- **動的役割切替**
- - 採餌班が全滅 → 育児班が採餌に切替（コスト最小化）
- - コロニー全体の状態に応じて自律的に最適化
- 
- **分散システムへの示唆**
- - コンシューマーグループの自動リバランス（Kafka）
- - Pod の自動スケジューリング（Kubernetes）
- - ヘルスチェック失敗時の自動フェイルオーバー


---

# 自己組織化と耐障害性

- <svg viewBox='0 0 780 300' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='300' fill='#f8f9fa' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#2d3436'>耐障害性：コロニーは一部崩壊しても機能する</text>
-   <rect x='20' y='45' width='360' height='110' rx='8' fill='#ffeaa7'/>
-   <text x='200' y='68' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>障害発生前</text>
-   <circle cx='80' cy='110' r='18' fill='#74b9ff'/>
-   <text x='80' y='115' text-anchor='middle' font-size='10' fill='white'>採餌</text>
-   <circle cx='140' cy='90' r='18' fill='#55efc4'/>
-   <text x='140' y='95' text-anchor='middle' font-size='10' fill='white'>育児</text>
-   <circle cx='200' cy='120' r='18' fill='#fd79a8'/>
-   <text x='200' y='125' text-anchor='middle' font-size='10' fill='white'>建設</text>
-   <circle cx='260' cy='95' r='18' fill='#a29bfe'/>
-   <text x='260' y='100' text-anchor='middle' font-size='10' fill='white'>警備</text>
-   <circle cx='320' cy='115' r='18' fill='#74b9ff'/>
-   <text x='320' y='120' text-anchor='middle' font-size='10' fill='white'>採餌</text>
-   <text x='200' y='148' text-anchor='middle' font-size='11' fill='#636e72'>全役割が正常稼働中</text>
-   <rect x='400' y='45' width='360' height='110' rx='8' fill='#fab1a0'/>
-   <text x='580' y='68' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>採餌班 50% 死亡後</text>
-   <circle cx='460' cy='110' r='18' fill='#b2bec3'/>
-   <text x='460' y='115' text-anchor='middle' font-size='10' fill='white'>死亡</text>
-   <circle cx='520' cy='90' r='18' fill='#55efc4'/>
-   <text x='520' y='95' text-anchor='middle' font-size='10' fill='white'>育児</text>
-   <circle cx='580' cy='120' r='18' fill='#fd79a8'/>
-   <text x='580' y='125' text-anchor='middle' font-size='10' fill='white'>建設</text>
-   <circle cx='640' cy='95' r='18' fill='#a29bfe'/>
-   <text x='640' y='100' text-anchor='middle' font-size='10' fill='white'>警備</text>
-   <circle cx='700' cy='115' r='18' fill='#b2bec3'/>
-   <text x='700' y='120' text-anchor='middle' font-size='10' fill='white'>死亡</text>
-   <text x='580' y='148' text-anchor='middle' font-size='11' fill='#d63031'>採餌班が半減</text>
-   <text x='390' y='188' text-anchor='middle' font-size='20' fill='#2d3436'>↓ 自律対応</text>
-   <rect x='200' y='208' width='380' height='60' rx='8' fill='#00b894' opacity='0.2' stroke='#00b894' stroke-width='2'/>
-   <text x='390' y='232' text-anchor='middle' font-size='13' fill='#00b894' font-weight='bold'>育児班・建設班が採餌に切替 → コロニー存続</text>
-   <text x='390' y='256' text-anchor='middle' font-size='12' fill='#636e72'>指示なし・リーダーなし・SPOF なし</text>
-   <text x='390' y='284' text-anchor='middle' font-size='12' fill='#6c5ce7' font-weight='bold'>→ これが Chaos Engineering の自然界版</text>
- </svg>

<!--
コロニーは中央指揮なしで障害に対応する。このレジリエンスこそが分散システム設計の目標。
-->

---

<!-- _class: lead -->
# Ch.2 創発とは何か

- **Emergence — 部分の総和を超える全体**
- 
- 単純なルールが複雑な知性を生む仕組み


---

# 創発（Emergence）の定義

- **創発とは**
- - 個々の要素の性質からは予測できない
- - 全体としての新しい性質・パターンが現れる現象
- - 上位レベルの制御なしに発生する
- 
- **創発の例**
- - 🐜 アリのコロニー: 個体は愚かでも集合知が高い
- - 🐦 鳥の群れ（Murmuration）: 3ルールだけで複雑な動き
- - 🧠 意識: ニューロン単体に意識はないが脳全体には宿る
- - 🌐 インターネット: 個々のルーターは経路を知らない
- 
- > 「全体は部分の総和より大きい」— アリストテレス


---

# 単純ルール → 複雑行動

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>アリの3つの基本ルール → コロニーの知性</text>
-   <rect x='20' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='132' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>Rule 1: フェロモン追従</text>
-   <text x='40' y='96' font-size='11' fill='#aaa'>if フェロモン検知:</text>
-   <text x='40' y='114' font-size='11' fill='#aaa'>  高濃度方向へ進む</text>
-   <text x='40' y='132' font-size='11' fill='#aaa'>else:</text>
-   <text x='40' y='150' font-size='11' fill='#aaa'>  ランダムウォーク</text>
-   <text x='132' y='195' text-anchor='middle' font-size='11' fill='#00b4d8'>→ 最短経路発見</text>
-   <rect x='277' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>Rule 2: 食料分配</text>
-   <text x='297' y='96' font-size='11' fill='#aaa'>if 食料持ち帰り:</text>
-   <text x='297' y='114' font-size='11' fill='#aaa'>  仲間に口移し</text>
-   <text x='297' y='132' font-size='11' fill='#aaa'>if 腹が減った:</text>
-   <text x='297' y='150' font-size='11' fill='#aaa'>  持っている個体を探す</text>
-   <text x='390' y='195' text-anchor='middle' font-size='11' fill='#ffd166'>→ 食料の最適分配</text>
-   <rect x='534' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#ff6b9d' stroke-width='2'/>
-   <text x='647' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#ff6b9d'>Rule 3: 役割切替</text>
-   <text x='554' y='96' font-size='11' fill='#aaa'>if 仕事の需要 &gt; 閾値:</text>
-   <text x='554' y='114' font-size='11' fill='#aaa'>  その仕事を始める</text>
-   <text x='554' y='132' font-size='11' fill='#aaa'>if 需要 &lt; 閾値:</text>
-   <text x='554' y='150' font-size='11' fill='#aaa'>  他の仕事を探す</text>
-   <text x='647' y='195' text-anchor='middle' font-size='11' fill='#ff6b9d'>→ 自律的な分業</text>
-   <text x='390' y='240' text-anchor='middle' font-size='24' fill='#e0e0e0'>↓ 組み合わせると</text>
-   <rect x='100' y='258' width='580' height='48' rx='8' fill='#0f3460'/>
-   <text x='390' y='278' text-anchor='middle' font-size='14' fill='#e0e0e0' font-weight='bold'>最短経路探索 ＋ 食料最適分配 ＋ 耐障害性ある組織運営</text>
-   <text x='390' y='298' text-anchor='middle' font-size='12' fill='#00b4d8'>= 中央制御なしの高度な集合知</text>
- </svg>

<!--
たった3つの局所的なルールがコロニーレベルの知性を生む。これが創発の本質。
-->

---

# 創発の条件

- **創発が起きるための4条件**
- - **ローカル情報のみ**: 各エージェントは全体を知らない（局所的判断）
- - **非線形性**: 小さな変化が大きな効果を生む（フェロモンの蒸発・強化）
- - **正のフィードバック**: 成功した行動が増幅される（経路が強化される）
- - **負のフィードバック**: 暴走を防ぐ抑制機構（フェロモンの自然蒸発）
- 
- **反創発の条件（失敗パターン）**
- - 中央が全体を把握しようとする → スケールしない
- - フィードバックがない → 最適化されない
- - エージェントが同質すぎる → 多様性が失われる
- 
- > 🔑 ローカルルール ＋ フィードバックループ ＝ グローバル最適


---

# Boids（鳥の群れ）との比較

- **創発の普遍性 — 同じ原理は至る所に**
- 
| 現象 | ルール数 | 結果 |
|------|----------|------|
| アリのコロニー | 3〜5 | 最短経路・分業・巣建設 |
| Boids（鳥の群れ） | 3 | 複雑な集団飛行 |
| ニューロン発火 | 単純なAND/OR | 思考・意識 |
| 株式市場 | 売買ルール | 価格形成・バブル |
| P2Pネットワーク | 接続ルール | 自律的ルーティング |
- 
- **Boids の3ルール（Craig Reynolds, 1987）**
- - Separation: 近すぎる仲間から離れる
- - Alignment: 近くの仲間と同じ方向に向く
- - Cohesion: 近くの仲間の中心に向かう


---

<!-- _class: lead -->
# Ch.3 分散システムへの翻訳

- **コロニーの原理をエンジニアリングに写像する**
- 
- アリの概念と分散システム設計の1:1マッピング


---

# コロニー ↔ 分散システム対応表

- <svg viewBox='0 0 780 340' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='340' fill='#f8f9fa' rx='10'/>
-   <rect x='0' y='0' width='780' height='40' rx='10' fill='#2d3436'/>
-   <text x='195' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='white'>🐜 アリのコロニー</text>
-   <text x='390' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='#ffd166'>対応</text>
-   <text x='585' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='white'>💻 分散システム</text>
-   <line x1='390' y1='0' x2='390' y2='340' stroke='#dfe6e9' stroke-width='1'/>
-   <rect x='0' y='40' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='65' text-anchor='middle' font-size='12' fill='#2d3436'>フェロモン経路</text>
-   <text x='390' y='65' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='65' text-anchor='middle' font-size='12' fill='#2d3436'>イベントログ・メッセージキュー</text>
-   <rect x='0' y='80' width='780' height='40' fill='white'/>
-   <text x='195' y='105' text-anchor='middle' font-size='12' fill='#2d3436'>フェロモン蒸発</text>
-   <text x='390' y='105' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='105' text-anchor='middle' font-size='12' fill='#2d3436'>TTL・キャッシュ期限・ログローテーション</text>
-   <rect x='0' y='120' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='145' text-anchor='middle' font-size='12' fill='#2d3436'>スティグマジー</text>
-   <text x='390' y='145' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='145' text-anchor='middle' font-size='12' fill='#2d3436'>イベントソーシング・共有キュー</text>
-   <rect x='0' y='160' width='780' height='40' fill='white'/>
-   <text x='195' y='185' text-anchor='middle' font-size='12' fill='#2d3436'>役割の閾値切替</text>
-   <text x='390' y='185' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='185' text-anchor='middle' font-size='12' fill='#2d3436'>コンシューマーリバランス・オートスケール</text>
-   <rect x='0' y='200' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='225' text-anchor='middle' font-size='12' fill='#2d3436'>女王なし・分散制御</text>
-   <text x='390' y='225' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='225' text-anchor='middle' font-size='12' fill='#2d3436'>リーダーレス設計・P2P</text>
-   <rect x='0' y='240' width='780' height='40' fill='white'/>
-   <text x='195' y='265' text-anchor='middle' font-size='12' fill='#2d3436'>局所情報のみで判断</text>
-   <text x='390' y='265' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='265' text-anchor='middle' font-size='12' fill='#2d3436'>ローカルキャッシュ・結果整合性</text>
-   <rect x='0' y='280' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='305' text-anchor='middle' font-size='12' fill='#2d3436'>一部死亡しても存続</text>
-   <text x='390' y='305' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='305' text-anchor='middle' font-size='12' fill='#2d3436'>フォールトトレランス・Chaos Engineering</text>
-   <rect x='0' y='320' width='780' height='20' rx='0' fill='#6c5ce7' opacity='0.15'/>
-   <text x='390' y='334' text-anchor='middle' font-size='11' fill='#6c5ce7' font-weight='bold'>アリのコロニーは分散システムの自然界モデル</text>
- </svg>

<!--
アリのコロニーが実装している概念は、現代の分散システムが目指しているものそのもの。
-->

---

# P2P設計とは

- **中央集権 vs 分散 — 設計思想の根本的な違い**
- 
| 比較軸 | 中央集権（Master-Slave） | P2P（分散） |
|--------|--------------------------|-------------|
| 制御 | 単一のMasterが全制御 | 各ノードが自律判断 |
| SPOF | Masterがダウン = 全停止 | 一部障害は局所的 |
| スケール | Master がボトルネック | 線形スケール可能 |
| 一貫性 | 強整合性を保ちやすい | 結果整合性が基本 |
| 複雑性 | シンプルで理解しやすい | プロトコルが複雑 |
- 
- > 🐜 アリのコロニーはP2P設計の極致：女王が落ちてもコロニーは生き続ける


---

# Gossipプロトコル

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>Gossipプロトコル ＝ フェロモン伝播の工学的実装</text>
-   <text x='195' y='56' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>Step 1: 情報発生</text>
-   <circle cx='80' cy='110' r='24' fill='#e17055'/>
-   <text x='80' y='115' text-anchor='middle' font-size='11' fill='white' font-weight='bold'>Node A</text>
-   <text x='80' y='148' text-anchor='middle' font-size='10' fill='#aaa'>状態変化を検知</text>
-   <circle cx='200' cy='90' r='20' fill='#636e72'/>
-   <text x='200' y='95' text-anchor='middle' font-size='10' fill='white'>Node B</text>
-   <circle cx='300' cy='125' r='20' fill='#636e72'/>
-   <text x='300' y='130' text-anchor='middle' font-size='10' fill='white'>Node C</text>
-   <line x1='104' y1='100' x2='180' y2='92' stroke='#e17055' stroke-width='2' stroke-dasharray='5,3'/>
-   <polygon points='180,88 192,92 182,98' fill='#e17055'/>
-   <text x='145' y='82' font-size='10' fill='#e17055'>gossip</text>
-   <text x='585' y='56' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>Step 2: 伝播（数ラウンド後）</text>
-   <circle cx='480' cy='100' r='20' fill='#e17055'/>
-   <text x='480' y='105' text-anchor='middle' font-size='10' fill='white'>Node A</text>
-   <circle cx='560' cy='80' r='20' fill='#00b4d8'/>
-   <text x='560' y='85' text-anchor='middle' font-size='10' fill='white'>Node B</text>
-   <circle cx='640' cy='110' r='20' fill='#00b4d8'/>
-   <text x='640' y='115' text-anchor='middle' font-size='10' fill='white'>Node C</text>
-   <circle cx='520' cy='145' r='20' fill='#00b4d8'/>
-   <text x='520' y='150' text-anchor='middle' font-size='10' fill='white'>Node D</text>
-   <circle cx='600' cy='145' r='20' fill='#00b4d8'/>
-   <text x='600' y='150' text-anchor='middle' font-size='10' fill='white'>Node E</text>
-   <line x1='500' y1='100' x2='542' y2='87' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='580' y1='88' x2='625' y2='105' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='500' y1='110' x2='502' y2='128' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='540' y1='145' x2='582' y2='145' stroke='#00b4d8' stroke-width='1.5'/>
-   <text x='390' y='195' text-anchor='middle' font-size='13' fill='#aaa'>O(log N) ラウンドで全ノードに情報が届く</text>
-   <rect x='40' y='215' width='700' height='85' rx='8' fill='#0f3460'/>
-   <text x='390' y='238' text-anchor='middle' font-size='13' font-weight='bold' fill='#e0e0e0'>アリとの対応</text>
-   <text x='60' y='260' font-size='12' fill='#aaa'>フェロモン放出 = Gossip メッセージ送信</text>
-   <text x='60' y='278' font-size='12' fill='#aaa'>フェロモン蒸発 = メッセージの TTL / 古い状態の失効</text>
-   <text x='60' y='296' font-size='12' fill='#aaa'>経路強化 = 複数ノードから同じ情報を受け取り確度が上がる</text>
- </svg>

<!--
GossipプロトコルはCassandra、Consul、Bitcoinなどで使われる。フェロモン伝播と数学的に同じ特性を持つ。
-->

---

# CAP定理と結果整合性

- **CAP定理: 分散システムの基本制約**
- - **C**onsistency（一貫性）: 全ノードが同じデータを返す
- - **A**vailability（可用性）: 常にレスポンスを返す
- - **P**artition Tolerance（分断耐性）: ネットワーク分断時も動作
- - **→ 3つ同時には達成できない（2つを選ぶ）**
- 
- **アリのコロニーはどれを選ぶか？**
- - AP を選択：分断（アリが孤立）しても動き続ける
- - 一貫性は犠牲：各アリは古いフェロモン情報で動く
- - 結果的に整合：時間が経てば全体が最適解に収束
- 
- > 🐜 コロニーは「結果整合性（Eventual Consistency）」で運営されている


---

# スケールアウト設計

- **アリはなぜ線形にスケールするのか**
- - 各アリは独立して動作（グローバル状態不要）
- - 通信はローカルのみ（隣のアリ・フェロモン）
- - コーディネーターが不要 → ボトルネックなし
- 
- **分散システムのスケールアウト原則**
- - **ステートレス設計**: サーバーに状態を持たせない
- - **シェアードナッシング**: ノード間の共有リソースを最小化
- - **一貫性ハッシング**: データを分散してホットスポット回避
- - **非同期通信**: 呼び出し元をブロックしない
- 
- > 🔑 アリを1000万匹追加しても女王は変わらない = 水平スケールの理想形


---

# 耐障害性設計

- **障害前提設計（Design for Failure）**
- - アリのコロニーは「障害は必ず起きる」という前提で動く
- - 個々のアリの死は「通常のイベント」として扱われる
- - コロニーレベルでは何事もなかったように動き続ける
- 
- **Chaos Engineering との対応**
- - Netflix Chaos Monkey = 意図的にアリを殺すこと
- - 障害注入テスト = フェロモン経路を意図的に断つ
- - 本番環境での訓練 = コロニーが日々行っていること
- 
- **実装パターン**
- - Circuit Breaker: 障害の伝播を遮断
- - Bulkhead: 障害の影響範囲を限定
- - Retry with Backoff: 一時的な障害をローカルで解消


---

<!-- _class: lead -->
# Ch.4 実際のシステム事例

- **アリの原理を実装した実際のシステム**
- 
- Kafka / DynamoDB / Kubernetes / BitTorrent / Consul


---

# Apache Kafka

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>Apache Kafka ＝ フェロモン経路の工学的実装</text>
-   <rect x='20' y='45' width='180' height='220' rx='8' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='110' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#00b4d8'>Producers</text>
-   <rect x='35' y='80' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='100' text-anchor='middle' font-size='11' fill='#aaa'>Service A</text>
-   <rect x='35' y='120' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='140' text-anchor='middle' font-size='11' fill='#aaa'>Service B</text>
-   <rect x='35' y='160' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='180' text-anchor='middle' font-size='11' fill='#aaa'>Service C</text>
-   <text x='110' y='235' text-anchor='middle' font-size='10' fill='#636e72'>🐜 食料を発見して</text>
-   <text x='110' y='250' text-anchor='middle' font-size='10' fill='#636e72'>フェロモンを放出するアリ</text>
-   <rect x='280' y='45' width='220' height='220' rx='8' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#ffd166'>Kafka Broker (Topic)</text>
-   <rect x='295' y='80' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='97' text-anchor='middle' font-size='10' fill='#aaa'>Partition 0: [msg1][msg2][msg3]</text>
-   <rect x='295' y='115' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='132' text-anchor='middle' font-size='10' fill='#aaa'>Partition 1: [msg4][msg5][msg6]</text>
-   <rect x='295' y='150' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='167' text-anchor='middle' font-size='10' fill='#aaa'>Partition 2: [msg7][msg8][msg9]</text>
-   <text x='390' y='215' text-anchor='middle' font-size='10' fill='#636e72'>🐜 フェロモン経路（揮発しない）</text>
-   <text x='390' y='232' text-anchor='middle' font-size='10' fill='#636e72'>Retentionで管理（TTL）</text>
-   <rect x='580' y='45' width='180' height='220' rx='8' fill='#16213e' stroke='#55efc4' stroke-width='2'/>
-   <text x='670' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#55efc4'>Consumers</text>
-   <rect x='595' y='80' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='100' text-anchor='middle' font-size='11' fill='#aaa'>Worker 1</text>
-   <rect x='595' y='120' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='140' text-anchor='middle' font-size='11' fill='#aaa'>Worker 2</text>
-   <rect x='595' y='160' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='180' text-anchor='middle' font-size='11' fill='#aaa'>Worker 3</text>
-   <text x='670' y='235' text-anchor='middle' font-size='10' fill='#636e72'>🐜 フェロモンを追跡する</text>
-   <text x='670' y='250' text-anchor='middle' font-size='10' fill='#636e72'>働きアリ（自律的）</text>
-   <line x1='200' y1='155' x2='278' y2='155' stroke='#e17055' stroke-width='2'/>
-   <polygon points='274,150 286,155 274,160' fill='#e17055'/>
-   <line x1='502' y1='155' x2='578' y2='155' stroke='#e17055' stroke-width='2'/>
-   <polygon points='574,150 586,155 574,160' fill='#e17055'/>
-   <rect x='130' y='278' width='520' height='32' rx='6' fill='#0f3460'/>
-   <text x='390' y='298' text-anchor='middle' font-size='12' fill='#ffd166'>Consumer自動リバランス ＝ 役割の自発的切替（アリの閾値モデル）</text>
- </svg>

<!--
KafkaのConsumer Group自動リバランスは、アリの役割切替メカニズムと同じ原理。障害時も自動で再割り当てされる。
-->

---

# Amazon DynamoDB

- **DynamoDB ＝ スティグマジー的な結果整合性**
- 
- **アーキテクチャの特徴**
- - 一貫性ハッシングでデータを複数ノードに分散
- - 各ノードは独立してリクエストを処理
- - ノード間でゴシッププロトコルで状態を共有
- 
- **結果整合性の動作**
- - 書き込み → 一部のレプリカに即座に反映
- - 他のレプリカには非同期で伝播（スティグマジー）
- - 読み取り → 最終的には全レプリカで同じ値
- 
- **アリとの対応**
- - 書き込み = アリが環境（巣）を変化させる
- - 非同期伝播 = 他のアリが変化を検知して反応
- - 結果整合 = コロニー全体が最終的に同期


---

# Kubernetes

- **Kubernetes ＝ 創発的オーケストレーション**
- 
- **宣言的API（Desired State）**
- - 「こうあるべき状態」を宣言するだけ
- - Controllerが現状との差分を検知して自動修正
- - 人間が手順を指示しない = 指示なし設計
- 
- **スケジューラーの創発的振る舞い**
- - 各Nodeのリソース状況をローカルに把握
- - PodをNodeに割り当てる（閾値モデルと同様）
- - 障害時はPodを自動で別Nodeに再スケジュール
- 
- **アリとの対応**
- - Desired State = コロニーの「あるべき姿」
- - Controller = 各アリの局所判断ルール
- - 自動回復 = コロニーの耐障害性


---

# BitTorrent

- **BitTorrent ＝ 純粋なP2Pコンテンツ配信**
- 
- **中央サーバーなしのファイル配信**
- - トラッカー（またはDHT）でピアを発見
- - ピア同士がチャンクを交換（中央なし）
- - ダウンロードしながら同時にアップロード
- 
- **アリとの完全な対応**
- - ファイルチャンク = 食料の断片
- - ピア発見 = フェロモンで仲間を見つける
- - チャンク交換 = 口移しによる食料分配
- - ファイル再構成 = コロニー全体での協調達成
- 
- > 🔑 中央が落ちてもネットワークが機能し続ける = アリの耐障害性


---

# Consul / etcd

- **分散サービスディスカバリ ＝ フェロモンマップ**
- 
- **Consul の機能**
- - サービスレジストリ: どのサービスがどこにいるか
- - ヘルスチェック: 生存しているかを定期確認
- - KVストア: 分散設定情報の共有
- 
- **Raftコンセンサスアルゴリズム（etcd）**
- - 過半数の合意でデータを確定（多数決原理）
- - リーダー選出 → 障害時は自動で新リーダー
- - アリの「最も行動した個体が道を作る」に類似
- 
- **アリとの対応**
- - サービスレジストリ = 経路フェロモンの地図
- - ヘルスチェック = 経路が生きているか確認
- - 自動的なリーダー選出 = 女王不在時の対応


---

# 事例比較まとめ

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#f8f9fa' rx='10'/>
-   <rect x='0' y='0' width='780' height='38' rx='10' fill='#2d3436'/>
-   <text x='100' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>システム</text>
-   <text x='260' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>アリの原理</text>
-   <text x='450' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>整合性モデル</text>
-   <text x='640' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>スケール方式</text>
-   <line x1='170' y1='0' x2='170' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <line x1='360' y1='0' x2='360' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <line x1='540' y1='0' x2='540' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <rect x='0' y='38' width='780' height='44' fill='#fff9c4'/>
-   <text x='100' y='65' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Apache Kafka</text>
-   <text x='260' y='58' text-anchor='middle' font-size='11' fill='#636e72'>フェロモン経路</text>
-   <text x='260' y='74' text-anchor='middle' font-size='11' fill='#636e72'>役割の自律切替</text>
-   <text x='450' y='65' text-anchor='middle' font-size='11' fill='#636e72'>結果整合性</text>
-   <text x='640' y='65' text-anchor='middle' font-size='11' fill='#636e72'>Partitionで水平分散</text>
-   <rect x='0' y='82' width='780' height='44' fill='white'/>
-   <text x='100' y='109' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>DynamoDB</text>
-   <text x='260' y='102' text-anchor='middle' font-size='11' fill='#636e72'>スティグマジー</text>
-   <text x='260' y='118' text-anchor='middle' font-size='11' fill='#636e72'>非同期伝播</text>
-   <text x='450' y='109' text-anchor='middle' font-size='11' fill='#636e72'>Eventual Consistency</text>
-   <text x='640' y='109' text-anchor='middle' font-size='11' fill='#636e72'>一貫性ハッシング</text>
-   <rect x='0' y='126' width='780' height='44' fill='#e8f5e9'/>
-   <text x='100' y='153' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Kubernetes</text>
-   <text x='260' y='146' text-anchor='middle' font-size='11' fill='#636e72'>閾値ベース役割分担</text>
-   <text x='260' y='162' text-anchor='middle' font-size='11' fill='#636e72'>宣言的自律修復</text>
-   <text x='450' y='153' text-anchor='middle' font-size='11' fill='#636e72'>Desired State</text>
-   <text x='640' y='153' text-anchor='middle' font-size='11' fill='#636e72'>Node追加で線形</text>
-   <rect x='0' y='170' width='780' height='44' fill='white'/>
-   <text x='100' y='197' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>BitTorrent</text>
-   <text x='260' y='190' text-anchor='middle' font-size='11' fill='#636e72'>口移し食料分配</text>
-   <text x='260' y='206' text-anchor='middle' font-size='11' fill='#636e72'>P2P経路発見</text>
-   <text x='450' y='197' text-anchor='middle' font-size='11' fill='#636e72'>結果整合性</text>
-   <text x='640' y='197' text-anchor='middle' font-size='11' fill='#636e72'>ピア追加で自動</text>
-   <rect x='0' y='214' width='780' height='44' fill='#e3f2fd'/>
-   <text x='100' y='241' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Consul / etcd</text>
-   <text x='260' y='234' text-anchor='middle' font-size='11' fill='#636e72'>フェロモンマップ</text>
-   <text x='260' y='250' text-anchor='middle' font-size='11' fill='#636e72'>多数決原理</text>
-   <text x='450' y='241' text-anchor='middle' font-size='11' fill='#636e72'>強整合性（Raft）</text>
-   <text x='640' y='241' text-anchor='middle' font-size='11' fill='#636e72'>奇数ノードで冗長化</text>
-   <rect x='0' y='270' width='780' height='50' rx='0' fill='#6c5ce7' opacity='0.12'/>
-   <text x='390' y='293' text-anchor='middle' font-size='13' fill='#4a4a8a' font-weight='bold'>共通点: ローカル情報のみで判断 → グローバル最適に収束</text>
-   <text x='390' y='312' text-anchor='middle' font-size='11' fill='#6c5ce7'>設計思想の根底にアリのコロニーと同じ原理が流れている</text>
- </svg>

<!--
5つのシステムはそれぞれ異なる問題を解いているが、設計思想の根底はすべてアリのコロニーと同じ原理。
-->

---

<!-- _class: lead -->
# Ch.5 設計実践

- **アリの原理を自分のシステムに適用する**
- 
- 落とし穴の回避 → フレームワーク → ケーススタディ


---

# よくある落とし穴

- **「創発を期待しすぎる」Anti-Pattern**
- 
- **❌ 落とし穴1: 設計なしに自律に任せる**
- - 誤解:「分散にすれば勝手に最適化される」
- - 現実: ルールの設計が不適切だと発散・カオスになる
- 
- **❌ 落とし穴2: 観測性を捨てる**
- - 誤解:「分散なんだから全体は把握できなくていい」
- - 現実: 創発の結果を観測する仕組みが必須（分散トレーシング）
- 
- **❌ 落とし穴3: 一貫性を完全に諦める**
- - 誤解:「結果整合性なら何でもいい」
- - 現実: ユーザー体験に影響する箇所は強整合性が必要
- 
- > 🐜 アリも「ルール」は精密に設計されている。自律 ≠ 無秩序


---

# 自システムへの適用フレームワーク

- <svg viewBox='0 0 780 310' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='310' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>3ステップ適用フレームワーク</text>
-   <rect x='20' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='132' y='76' text-anchor='middle' font-size='28' fill='#00b4d8'>①</text>
-   <text x='132' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>ローカルルールの設計</text>
-   <text x='40' y='126' font-size='11' fill='#aaa'>各ノードが持つべき</text>
-   <text x='40' y='144' font-size='11' fill='#aaa'>判断ルールを定義する</text>
-   <text x='40' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='40' y='188' font-size='11' fill='#aaa'>「キューが N 件超えたら</text>
-   <text x='40' y='206' font-size='11' fill='#aaa'>　新Workerを起動」</text>
-   <text x='40' y='240' font-size='11' fill='#aaa'>「エラー率が X% 超で</text>
-   <text x='40' y='258' font-size='11' fill='#aaa'>　CB を開く」</text>
-   <rect x='277' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='76' text-anchor='middle' font-size='28' fill='#ffd166'>②</text>
-   <text x='390' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>フィードバックループの設計</text>
-   <text x='297' y='126' font-size='11' fill='#aaa'>正と負のフィードバック</text>
-   <text x='297' y='144' font-size='11' fill='#aaa'>をバランスよく設計</text>
-   <text x='297' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='297' y='188' font-size='11' fill='#aaa'>正: 成功した経路を</text>
-   <text x='297' y='206' font-size='11' fill='#aaa'>　キャッシュで強化</text>
-   <text x='297' y='240' font-size='11' fill='#aaa'>負: TTL でキャッシュを</text>
-   <text x='297' y='258' font-size='11' fill='#aaa'>　無効化（蒸発）</text>
-   <rect x='534' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#55efc4' stroke-width='2'/>
-   <text x='647' y='76' text-anchor='middle' font-size='28' fill='#55efc4'>③</text>
-   <text x='647' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#55efc4'>観測性の確保</text>
-   <text x='554' y='126' font-size='11' fill='#aaa'>創発の結果を可視化</text>
-   <text x='554' y='144' font-size='11' fill='#aaa'>して理解・調整する</text>
-   <text x='554' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='554' y='188' font-size='11' fill='#aaa'>分散トレーシング</text>
-   <text x='554' y='206' font-size='11' fill='#aaa'>（Jaeger / Zipkin）</text>
-   <text x='554' y='240' font-size='11' fill='#aaa'>メトリクス集約</text>
-   <text x='554' y='258' font-size='11' fill='#aaa'>（Prometheus / Grafana）</text>
- </svg>

<!--
この3ステップを踏まずに分散設計すると、意図しないカオスになる。アリのコロニーも進化で精巧なルールを獲得している。
-->

---

# ケーススタディ演習

- **グループワーク（30分）**
- 
- **問題: ECサイトの在庫管理システムを分散設計せよ**
- 
- **制約条件**
- - 1日1億件の在庫照会リクエスト
- - フラッシュセール時は10倍のスパイク
- - 在庫の二重販売は絶対に防ぐ
- - 1ノード障害時もサービス継続
- 
- **検討ポイント（アリの原理を使って）**
- - どのデータを「フェロモン経路」に流すか
- - 「結果整合性 vs 強整合性」どこで使い分けるか
- - 「スティグマジー」的に設計できる部分はどこか


---

# グループディスカッション

- **発表・フィードバック**
- 
- **各グループ（5分）**
- - 設計の全体像を図で説明
- - アリのどの原理を適用したか
- - 最も難しかったトレードオフは何か
- 
- **フィードバック観点**
- - SPOFはないか
- - 「強整合性が必要な場所」を正確に見極めているか
- - スケールアウトの経路はクリアか
- 
- > 🐜 正解はない。コロニーも環境に合わせて進化し続ける


---

<!-- _class: lead -->
# Ch.6 まとめ

- **女王なき組織設計の哲学**
- 
- 今日学んだことを自分のシステムへ


---

# 今日学んだこと

- **5つのキーコンセプト**
- 
- 1. **女王は命令しない** — 中央制御なしでコロニーは動く
- 2. **フェロモン = フィードバックループ** — 正と負の均衡が最適化を生む
- 3. **創発の条件** — ローカルルール ＋ フィードバック ＝ グローバル最適
- 4. **P2P = アリのコロニーの工学的実装** — Kafka・DynamoDB・K8sに流れる同じ原理
- 5. **観測性は必須** — 自律システムの結果を可視化して初めて「設計」になる
- 
- > 🐜 2億年以上前から存在するアリのコロニーは、  
- > 　現代の分散システム設計の教科書だった


---

# 女王なき組織設計の哲学

- **技術を超えた示唆**
- 
- **システム設計への示唆**
- - SPOFをなくすことは「女王をなくす」こと
- - 障害を前提に設計することは「アリが死ぬことを前提にする」こと
- - スケールアウトは「コロニーを増やす」こと
- 
- **組織設計への示唆**
- - トップダウン命令系統は中央集権モデル
- - 自律的チームは P2P モデル
- - 明確なルール（Values）と情報共有（フェロモン）があれば指示なしでも動く
- 
- > 🌱 「自律分散」はシステムの話ではなく、複雑な世界を生き抜く普遍的な戦略


---

# 参考文献・ツール

- **書籍**
- - [The Ants — Wilson & Hölldobler (1990)](https://www.hup.harvard.edu/catalog.php?isbn=9780674040755): アリ研究の聖典
- - [Emergence — Steven Johnson (2001)](https://www.simonandschuster.com/books/Emergence/Steven-Johnson/9780684868769): 創発の一般向け解説
- - [Designing Distributed Systems — Burns (2018)](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/): 分散システム設計パターン
- 
- **論文・技術資料**
- - [Kafka: a Distributed Messaging System (LinkedIn, 2011)](https://www.microsoft.com/en-us/research/publication/kafka-a-distributed-messaging-system-for-log-processing/)
- - [Dynamo: Amazon's Highly Available Key-value Store (2007)](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html)
- 
- **ツール**
- - [NetLogo](https://ccl.northwestern.edu/netlogo/): アリのシミュレーション
- - [Chaos Monkey](https://netflix.github.io/chaosmonkey/): Netflix の耐障害性テスト


---

<!-- _class: lead -->
# Q&A / 連絡先

- **ご質問・ディスカッション**
- 
- 🐜 アリのコロニーに学んだ分散システム設計
- 
- 「女王は命令していない — 創発とP2P設計」
- 
- ---
- 
- 本日はご参加いただきありがとうございました！
- 
- > 設計に迷ったら、アリを思い出してください

