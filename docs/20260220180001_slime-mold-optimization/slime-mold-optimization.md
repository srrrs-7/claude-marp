---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "スライム菌の最適化"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# スライム菌が東京の地下鉄を設計した話

- 単細胞生物が解いた最適化問題
- 
- 生物の知恵がアルゴリズムを超える瞬間


---

<!-- _class: lead -->
# 単細胞生物の驚異

- 脳も神経もない生物が、なぜ最適解を見つけるのか


---

# 粘菌（Physarum polycephalum）とは何か

- - 真性粘菌の一種、和名「モジホコリ」
- - 脳・神経系を持たない単細胞生物
- - 管状ネットワークで栄養を輸送
- - 環境に応じてネットワーク形状を動的に変化
- 
- <svg viewBox='0 0 800 280' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='280' fill='none'/><ellipse cx='400' cy='140' rx='250' ry='100' fill='#2d5016' opacity='0.3' style='filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'/><circle cx='300' cy='120' r='25' fill='#4a7c23'/><circle cx='500' cy='120' r='20' fill='#4a7c23'/><circle cx='350' cy='180' r='22' fill='#4a7c23'/><circle cx='450' cy='160' r='18' fill='#4a7c23'/><circle cx='400' cy='100' r='15' fill='#4a7c23'/><line x1='300' y1='120' x2='400' y2='100' stroke='#6ba33e' stroke-width='4'/><line x1='400' y1='100' x2='500' y2='120' stroke='#6ba33e' stroke-width='4'/><line x1='300' y1='120' x2='350' y2='180' stroke='#6ba33e' stroke-width='6'/><line x1='350' y1='180' x2='450' y2='160' stroke='#6ba33e' stroke-width='3'/><line x1='450' y1='160' x2='500' y2='120' stroke='#6ba33e' stroke-width='5'/><line x1='350' y1='180' x2='400' y2='100' stroke='#6ba33e' stroke-width='2'/><text x='400' y='260' text-anchor='middle' fill='#ccc' font-size='14'>管状ネットワーク構造 — 太い管ほど多くの栄養を輸送</text></svg>


---

# 2010年のScience論文

- - 中垣俊之教授らの研究（北海道大学）
- - 粘菌に東京近郊の食物源を配置
- - 形成されたネットワークがJR路線図に酷似
- - 論文: "Rules for Biologically Inspired Adaptive Network Design" (Science, 2010)
- 
- <svg viewBox='0 0 800 300' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='300' fill='none'/><text x='200' y='30' text-anchor='middle' fill='#f39c12' font-size='16' font-weight='bold'>東京鉄道網</text><text x='600' y='30' text-anchor='middle' fill='#2ecc71' font-size='16' font-weight='bold'>粘菌ネットワーク</text><circle cx='200' cy='150' r='8' fill='#e74c3c'/><text x='200' y='175' text-anchor='middle' fill='#ccc' font-size='11'>東京</text><circle cx='130' cy='90' r='6' fill='#f39c12'/><text x='130' y='80' text-anchor='middle' fill='#aaa' font-size='10'>大宮</text><circle cx='280' cy='90' r='6' fill='#f39c12'/><text x='280' y='80' text-anchor='middle' fill='#aaa' font-size='10'>千葉</text><circle cx='120' cy='200' r='6' fill='#f39c12'/><text x='120' y='220' text-anchor='middle' fill='#aaa' font-size='10'>横浜</text><circle cx='280' cy='200' r='6' fill='#f39c12'/><text x='280' y='220' text-anchor='middle' fill='#aaa' font-size='10'>成田</text><circle cx='160' cy='140' r='5' fill='#f39c12'/><text x='145' y='135' text-anchor='middle' fill='#aaa' font-size='10'>新宿</text><line x1='200' y1='150' x2='130' y2='90' stroke='#f39c12' stroke-width='3'/><line x1='200' y1='150' x2='280' y2='90' stroke='#f39c12' stroke-width='2'/><line x1='200' y1='150' x2='120' y2='200' stroke='#f39c12' stroke-width='3'/><line x1='200' y1='150' x2='280' y2='200' stroke='#f39c12' stroke-width='1.5'/><line x1='200' y1='150' x2='160' y2='140' stroke='#f39c12' stroke-width='2'/><circle cx='600' cy='150' r='8' fill='#27ae60'/><circle cx='530' cy='90' r='6' fill='#2ecc71'/><circle cx='680' cy='90' r='6' fill='#2ecc71'/><circle cx='520' cy='200' r='6' fill='#2ecc71'/><circle cx='680' cy='200' r='6' fill='#2ecc71'/><circle cx='560' cy='140' r='5' fill='#2ecc71'/><line x1='600' y1='150' x2='530' y2='90' stroke='#2ecc71' stroke-width='4'/><line x1='600' y1='150' x2='680' y2='90' stroke='#2ecc71' stroke-width='2'/><line x1='600' y1='150' x2='520' y2='200' stroke='#2ecc71' stroke-width='4'/><line x1='600' y1='150' x2='680' y2='200' stroke='#2ecc71' stroke-width='1.5'/><line x1='600' y1='150' x2='560' y2='140' stroke='#2ecc71' stroke-width='2.5'/><text x='400' y='155' text-anchor='middle' fill='#ecf0f1' font-size='28'>≈</text><text x='400' y='280' text-anchor='middle' fill='#999' font-size='12'>線の太さ = 輸送量/乗客数の相対比率</text></svg>


---

# 粘菌はどうやって最適化するか

- - **探索フェーズ**: 全方向にネットワークを拡張
- - **強化フェーズ**: 食物源間の短い経路の管が太くなる
- - **収束フェーズ**: 使われない管が退化・消滅
- 
- <svg viewBox='0 0 800 240' style='max-height:45vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='240' fill='none'/><rect x='30' y='60' width='200' height='80' rx='12' fill='#2980b9' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='130' y='95' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>1. 探索</text><text x='130' y='118' text-anchor='middle' fill='#d4e6f1' font-size='12'>全方向に拡張</text><polygon points='245,100 275,85 275,115' fill='#ecf0f1'/><rect x='290' y='60' width='200' height='80' rx='12' fill='#27ae60' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='390' y='95' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>2. 強化</text><text x='390' y='118' text-anchor='middle' fill='#d5f5e3' font-size='12'>短い経路を太く</text><polygon points='505,100 535,85 535,115' fill='#ecf0f1'/><rect x='550' y='60' width='200' height='80' rx='12' fill='#8e44ad' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='650' y='95' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>3. 収束</text><text x='650' y='118' text-anchor='middle' fill='#e8daef' font-size='12'>不要な管が消滅</text><text x='400' y='200' text-anchor='middle' fill='#999' font-size='13'>正のフィードバックループによる自己組織化</text></svg>


---

# 数学的等価性 — ダイクストラ法との比較

- - 粘菌の管径変化は **最短経路問題** の近似解
- - ダイクストラ法: O(V log V) の計算コスト
- - 粘菌: 並列・分散処理で同等の結果を達成
- - 局所ルールのみでグローバル最適に収束する理由:
-   - 流量に比例した管径変化（正のフィードバック）
-   - エネルギーコスト最小化（自然淘汰圧）
- 
- <svg viewBox='0 0 800 200' style='max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='200' fill='none'/><rect x='50' y='30' width='300' height='140' rx='10' fill='#1a1a2e' stroke='#3498db' stroke-width='2'/><text x='200' y='60' text-anchor='middle' fill='#3498db' font-size='15' font-weight='bold'>ダイクストラ法</text><text x='200' y='90' text-anchor='middle' fill='#aaa' font-size='12'>中央集権的・逐次処理</text><text x='200' y='115' text-anchor='middle' fill='#aaa' font-size='12'>完全な最短経路を保証</text><text x='200' y='140' text-anchor='middle' fill='#aaa' font-size='12'>O(V log V) の計算量</text><rect x='450' y='30' width='300' height='140' rx='10' fill='#1a1a2e' stroke='#2ecc71' stroke-width='2'/><text x='600' y='60' text-anchor='middle' fill='#2ecc71' font-size='15' font-weight='bold'>粘菌アルゴリズム</text><text x='600' y='90' text-anchor='middle' fill='#aaa' font-size='12'>分散・並列処理</text><text x='600' y='115' text-anchor='middle' fill='#aaa' font-size='12'>準最適解に高速収束</text><text x='600' y='140' text-anchor='middle' fill='#aaa' font-size='12'>耐障害性・適応性あり</text></svg>


---

<!-- _class: lead -->
# ソフトウェアへの応用

- 自然の最適化戦略をコードに翻訳する


---

# ルーティングアルゴリズムへの示唆

- - **BGP (Border Gateway Protocol)**: 経路の「太さ」= トラフィック量
- - **OSPF (Open Shortest Path First)**: コストベースの経路選択
- - **SDN (Software-Defined Networking)**: 中央制御 vs 粘菌的分散
- 
- <svg viewBox='0 0 800 280' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='280' fill='none'/><circle cx='400' cy='140' r='30' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='145' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>Core</text><circle cx='200' cy='80' r='22' fill='#3498db'/><text x='200' y='85' text-anchor='middle' fill='white' font-size='10'>Router A</text><circle cx='600' cy='80' r='22' fill='#3498db'/><text x='600' y='85' text-anchor='middle' fill='white' font-size='10'>Router B</text><circle cx='200' cy='220' r='22' fill='#3498db'/><text x='200' y='225' text-anchor='middle' fill='white' font-size='10'>Router C</text><circle cx='600' cy='220' r='22' fill='#3498db'/><text x='600' y='225' text-anchor='middle' fill='white' font-size='10'>Router D</text><line x1='370' y1='125' x2='222' y2='88' stroke='#e67e22' stroke-width='5'/><line x1='430' y1='125' x2='578' y2='88' stroke='#e67e22' stroke-width='3'/><line x1='370' y1='160' x2='222' y2='212' stroke='#e67e22' stroke-width='2'/><line x1='430' y1='160' x2='578' y2='212' stroke='#e67e22' stroke-width='4'/><line x1='200' y1='102' x2='200' y2='198' stroke='#7f8c8d' stroke-width='1.5' stroke-dasharray='5,5'/><line x1='600' y1='102' x2='600' y2='198' stroke='#7f8c8d' stroke-width='1.5' stroke-dasharray='5,5'/><text x='400' y='270' text-anchor='middle' fill='#999' font-size='12'>線の太さ = トラフィック量（粘菌の管径に対応）</text></svg>


---

# 分散システムの自己組織化

- - サービスメッシュ（Istio / Envoy）が粘菌と同じ原理で動作
- - 通信頻度が高い経路を優先的にキャッシュ・最適化
- - サーキットブレーカー = 粘菌の管の退化メカニズム
- 
- <svg viewBox='0 0 800 260' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='260' fill='none'/><rect x='50' y='40' width='100' height='50' rx='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='100' y='70' text-anchor='middle' fill='white' font-size='11'>Service A</text><rect x='250' y='40' width='100' height='50' rx='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='300' y='70' text-anchor='middle' fill='white' font-size='11'>Service B</text><rect x='450' y='40' width='100' height='50' rx='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='500' y='70' text-anchor='middle' fill='white' font-size='11'>Service C</text><rect x='650' y='40' width='100' height='50' rx='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='700' y='70' text-anchor='middle' fill='white' font-size='11'>Service D</text><line x1='150' y1='65' x2='250' y2='65' stroke='#2ecc71' stroke-width='6'/><line x1='350' y1='65' x2='450' y2='65' stroke='#2ecc71' stroke-width='3'/><line x1='550' y1='65' x2='650' y2='65' stroke='#e74c3c' stroke-width='1' stroke-dasharray='5,3'/><rect x='150' y='140' width='100' height='50' rx='8' fill='#9b59b6' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='170' text-anchor='middle' fill='white' font-size='11'>Envoy</text><rect x='350' y='140' width='100' height='50' rx='8' fill='#9b59b6' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='170' text-anchor='middle' fill='white' font-size='11'>Envoy</text><rect x='550' y='140' width='100' height='50' rx='8' fill='#9b59b6' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='600' y='170' text-anchor='middle' fill='white' font-size='11'>Envoy</text><line x1='100' y1='90' x2='200' y2='140' stroke='#7f8c8d' stroke-width='1' stroke-dasharray='3,3'/><line x1='300' y1='90' x2='400' y2='140' stroke='#7f8c8d' stroke-width='1' stroke-dasharray='3,3'/><line x1='500' y1='90' x2='600' y2='140' stroke='#7f8c8d' stroke-width='1' stroke-dasharray='3,3'/><text x='400' y='230' text-anchor='middle' fill='#2ecc71' font-size='12'>太い線 = 高頻度通信（強化）</text><text x='400' y='250' text-anchor='middle' fill='#e74c3c' font-size='12'>点線 = サーキットブレーカー作動（退化）</text></svg>


---

# 負荷分散の生物学的証明

- - 使われる経路は強化される（管径増大）
- - 使われない経路は自然消滅する（コスト削減）
- - これは **Ant Colony Optimization (ACO)** とも共通する原理
- - 実際のCDN/ロードバランサーに応用可能:
-   - レスポンスタイムが良い経路に重み付け
-   - タイムアウトが多い経路のトラフィックを減少
- 
- <svg viewBox='0 0 800 200' style='max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='200' fill='none'/><rect x='30' y='70' width='120' height='60' rx='8' fill='#f39c12' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='90' y='105' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>Client</text><rect x='330' y='20' width='140' height='45' rx='8' fill='#27ae60'/><text x='400' y='48' text-anchor='middle' fill='white' font-size='12'>Server A (fast)</text><rect x='330' y='80' width='140' height='45' rx='8' fill='#3498db'/><text x='400' y='108' text-anchor='middle' fill='white' font-size='12'>Server B (ok)</text><rect x='330' y='140' width='140' height='45' rx='8' fill='#e74c3c'/><text x='400' y='168' text-anchor='middle' fill='white' font-size='12'>Server C (slow)</text><line x1='150' y1='90' x2='330' y2='42' stroke='#27ae60' stroke-width='6'/><line x1='150' y1='100' x2='330' y2='102' stroke='#3498db' stroke-width='3'/><line x1='150' y1='110' x2='330' y2='162' stroke='#e74c3c' stroke-width='1' stroke-dasharray='4,4'/><polygon points='485,42 515,30 515,55' fill='#27ae60'/><polygon points='485,102 515,90 515,115' fill='#3498db'/><rect x='530' y='20' width='120' height='45' rx='8' fill='#27ae60' opacity='0.6'/><text x='590' y='48' text-anchor='middle' fill='white' font-size='11'>重み: 60%</text><rect x='530' y='80' width='120' height='45' rx='8' fill='#3498db' opacity='0.6'/><text x='590' y='108' text-anchor='middle' fill='white' font-size='11'>重み: 35%</text><rect x='530' y='140' width='120' height='45' rx='8' fill='#e74c3c' opacity='0.4'/><text x='590' y='168' text-anchor='middle' fill='white' font-size='11'>重み: 5%</text></svg>


---

<!-- _class: lead -->
# より広い示唆

- 生物コンピューティングと「設計なき設計」


---

# 生物コンピューティングの現在

- - **DNA計算**: 組み合わせ最適化問題を分子レベルで解く
- - **粘菌コンピュータ**: 迷路解決、最短経路発見を実証
- - **ニューロモーフィックチップ**: 脳の構造を模倣したハードウェア
- - **量子生物学**: 光合成の量子効果を計算に応用する研究
- 
- <svg viewBox='0 0 800 220' style='max-height:45vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='220' fill='none'/><rect x='40' y='40' width='160' height='70' rx='10' fill='#1abc9c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='120' y='70' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>DNA計算</text><text x='120' y='90' text-anchor='middle' fill='#d1f2eb' font-size='10'>分子レベル並列</text><rect x='230' y='40' width='160' height='70' rx='10' fill='#e67e22' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='310' y='70' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>粘菌計算</text><text x='310' y='90' text-anchor='middle' fill='#fdebd0' font-size='10'>ネットワーク最適化</text><rect x='420' y='40' width='160' height='70' rx='10' fill='#8e44ad' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='500' y='70' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>ニューロモーフィック</text><text x='500' y='90' text-anchor='middle' fill='#e8daef' font-size='10'>脳型ハードウェア</text><rect x='610' y='40' width='160' height='70' rx='10' fill='#2980b9' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='690' y='70' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>量子生物学</text><text x='690' y='90' text-anchor='middle' fill='#d4e6f1' font-size='10'>光合成量子効果</text><line x1='120' y1='110' x2='120' y2='160' stroke='#1abc9c' stroke-width='2'/><line x1='310' y1='110' x2='310' y2='160' stroke='#e67e22' stroke-width='2'/><line x1='500' y1='110' x2='500' y2='160' stroke='#8e44ad' stroke-width='2'/><line x1='690' y1='110' x2='690' y2='160' stroke='#2980b9' stroke-width='2'/><rect x='40' y='160' width='730' height='40' rx='8' fill='#2c3e50' stroke='#95a5a6' stroke-width='1'/><text x='405' y='185' text-anchor='middle' fill='#ecf0f1' font-size='13'>自然の計算原理をソフトウェア・ハードウェアに翻訳</text></svg>


---

# 「設計なき設計」の哲学

- - 中央集権的な「設計者」が不在でも最適構造が現れる
- - インターネット、オープンソース、市場経済も同じ原理
- - 創発（Emergence）: 単純なルールの集合が複雑な振る舞いを生む
- 
- <svg viewBox='0 0 800 250' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='250' fill='none'/><rect x='50' y='30' width='300' height='190' rx='12' fill='#1a1a2e' stroke='#e74c3c' stroke-width='2'/><text x='200' y='60' text-anchor='middle' fill='#e74c3c' font-size='15' font-weight='bold'>中央集権型</text><circle cx='200' cy='120' r='25' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='125' text-anchor='middle' fill='white' font-size='11'>設計者</text><circle cx='130' cy='180' r='12' fill='#7f8c8d'/><circle cx='170' cy='185' r='12' fill='#7f8c8d'/><circle cx='230' cy='185' r='12' fill='#7f8c8d'/><circle cx='270' cy='180' r='12' fill='#7f8c8d'/><line x1='200' y1='145' x2='130' y2='168' stroke='#e74c3c' stroke-width='1.5'/><line x1='200' y1='145' x2='170' y2='173' stroke='#e74c3c' stroke-width='1.5'/><line x1='200' y1='145' x2='230' y2='173' stroke='#e74c3c' stroke-width='1.5'/><line x1='200' y1='145' x2='270' y2='168' stroke='#e74c3c' stroke-width='1.5'/><rect x='450' y='30' width='300' height='190' rx='12' fill='#1a1a2e' stroke='#2ecc71' stroke-width='2'/><text x='600' y='60' text-anchor='middle' fill='#2ecc71' font-size='15' font-weight='bold'>分散自己組織化型</text><circle cx='530' cy='110' r='14' fill='#2ecc71'/><circle cx='600' cy='90' r='14' fill='#2ecc71'/><circle cx='670' cy='110' r='14' fill='#2ecc71'/><circle cx='540' cy='170' r='14' fill='#2ecc71'/><circle cx='600' cy='180' r='14' fill='#2ecc71'/><circle cx='660' cy='170' r='14' fill='#2ecc71'/><line x1='530' y1='110' x2='600' y2='90' stroke='#27ae60' stroke-width='2'/><line x1='600' y1='90' x2='670' y2='110' stroke='#27ae60' stroke-width='2'/><line x1='530' y1='110' x2='540' y2='170' stroke='#27ae60' stroke-width='1.5'/><line x1='600' y1='90' x2='600' y2='180' stroke='#27ae60' stroke-width='1.5'/><line x1='670' y1='110' x2='660' y2='170' stroke='#27ae60' stroke-width='1.5'/><line x1='540' y1='170' x2='600' y2='180' stroke='#27ae60' stroke-width='2'/><line x1='600' y1='180' x2='660' y2='170' stroke='#27ae60' stroke-width='2'/></svg>


---

# 進化が解いた問題をAIはまだ解けない

| 指標 | 粘菌 | 現代のAI |
|------|------|----------|
| エネルギー効率 | 極めて高い | GPU大量消費 |
| 耐障害性 | 自己修復可能 | 単一障害点あり |
| 適応性 | リアルタイム | 再学習が必要 |
| スケーラビリティ | 自然に拡張 | 設計が必要 |
| 解の質 | 準最適 | タスク依存 |
- 
- 40億年の進化 vs 70年のコンピュータ科学


---

<!-- _class: lead -->
# まとめ

- 最適なアーキテクチャは、設計されるのではなく、
- **使われることで生まれる**
- 
- 粘菌が教えてくれること:
- - 局所ルールがグローバル最適を生む
- - 使われない経路は消えるべき
- - 冗長性は耐障害性のコスト


---

# 参考文献

- - **Research:**
-   - [Tero et al. "Rules for Biologically Inspired Adaptive Network Design" (Science, 2010)](https://www.science.org/doi/10.1126/science.1177894)
-   - [Nakagaki et al. "Intelligent behaviors of amoeboid movement" (2000)](https://doi.org/10.1038/35035159)
- - **Applications:**
-   - [Physarum Machines (Adamatzky, 2010)](https://www.worldscientific.com/worldscibooks/10.1142/7968)
-   - [Ant Colony Optimization (Dorigo & Stutzle)](https://mitpress.mit.edu/books/ant-colony-optimization)
- - **Further Reading:**
-   - [Slime Mold Simulations (Sage Jenson)](https://cargocollective.com/sagejenson/physarum)
-   - [Bio-inspired Computing (Nature Reviews)](https://www.nature.com/subjects/biologically-inspired-computing)

