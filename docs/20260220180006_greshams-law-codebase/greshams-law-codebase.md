---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "グレシャムの法則とコード"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# グレシャムの法則とコードベース

- **悪いコードが良いコードを駆逐する**
- 
- 16世紀の貨幣経済学が現代のソフトウェア開発に突きつける警告


---

<!-- _class: lead -->
# 貨幣経済の法則

- 500年前の経済法則がコードベースに当てはまる理由


---

# グレシャムの法則とは

- - **「悪貨は良貨を駆逐する」** — トーマス・グレシャム（1558年）
- - 額面が同じだが品位（金含有量）が異なる硬貨が共存すると...
- - 人々は **良貨を退蔵** し、**悪貨で支払う** 合理的行動をとる
- - 結果: 市場には悪貨だけが残る
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">悪貨は良貨を駆逐する</text><circle cx="180" cy="140" r="60" fill="#ffd700" opacity="0.9"/><text x="180" y="135" text-anchor="middle" fill="#1a1a2e" font-size="14" font-weight="bold">良貨</text><text x="180" y="155" text-anchor="middle" fill="#1a1a2e" font-size="11">金95%</text><circle cx="620" cy="140" r="60" fill="#8B7355" opacity="0.9"/><text x="620" y="135" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">悪貨</text><text x="620" y="155" text-anchor="middle" fill="#fff" font-size="11">金50%</text><line x1="250" y1="120" x2="370" y2="90" stroke="#4eff4e" stroke-width="2" stroke-dasharray="5,3"/><text x="310" y="82" text-anchor="middle" fill="#4eff4e" font-size="12">退蔵・消滅</text><rect x="370" y="65" width="60" height="40" rx="5" fill="#16213e" stroke="#4eff4e" stroke-width="1"/><text x="400" y="90" text-anchor="middle" fill="#4eff4e" font-size="18">X</text><line x1="550" y1="120" x2="430" y2="90" stroke="#e94560" stroke-width="2"/><polygon points="435,85 425,93 433,95" fill="#e94560"/><text x="490" y="82" text-anchor="middle" fill="#e94560" font-size="12">流通拡大</text><rect x="320" y="190" width="160" height="50" rx="8" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="400" y="213" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">市場 = 悪貨だけ</text><text x="400" y="230" text-anchor="middle" fill="#aaa" font-size="11">良貨は姿を消す</text></svg>


---

# なぜ悪貨が勝つか — ゲーム理論的構造

- - 各個人にとって「良貨を温存し悪貨で支払う」は**合理的な最適解**
- - しかし全員が同じ行動をとると **市場全体が劣化** する
- - 典型的な**囚人のジレンマ**構造 — 個人合理性 ≠ 集団合理性
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="42" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">コードベース版 囚人のジレンマ</text><rect x="300" y="60" width="200" height="30" rx="4" fill="#0f3460"/><text x="350" y="80" text-anchor="middle" fill="#fff" font-size="12">良いコード書く</text><text x="450" y="80" text-anchor="middle" fill="#fff" font-size="12">悪いコード書く</text><rect x="150" y="95" width="150" height="30" rx="4" fill="#0f3460"/><text x="225" y="115" text-anchor="middle" fill="#fff" font-size="12">良いコード書く</text><rect x="300" y="95" width="100" height="65" rx="4" fill="#16213e" stroke="#4eff4e" stroke-width="1"/><text x="350" y="125" text-anchor="middle" fill="#4eff4e" font-size="12">全員Win</text><text x="350" y="145" text-anchor="middle" fill="#aaa" font-size="11">品質維持</text><rect x="400" y="95" width="100" height="65" rx="4" fill="#16213e" stroke="#ffcc00" stroke-width="1"/><text x="450" y="125" text-anchor="middle" fill="#ffcc00" font-size="12">自分だけ損</text><text x="450" y="145" text-anchor="middle" fill="#aaa" font-size="11">時間浪費</text><rect x="150" y="160" width="150" height="30" rx="4" fill="#0f3460"/><text x="225" y="180" text-anchor="middle" fill="#fff" font-size="12">悪いコード書く</text><rect x="300" y="160" width="100" height="65" rx="4" fill="#16213e" stroke="#ffcc00" stroke-width="1"/><text x="350" y="190" text-anchor="middle" fill="#ffcc00" font-size="12">自分だけ得</text><text x="350" y="210" text-anchor="middle" fill="#aaa" font-size="11">速く出せる</text><rect x="400" y="160" width="100" height="65" rx="4" fill="#16213e" stroke="#e94560" stroke-width="2"/><text x="450" y="190" text-anchor="middle" fill="#e94560" font-size="12" font-weight="bold">全員Lose</text><text x="450" y="210" text-anchor="middle" fill="#aaa" font-size="11">泥沼化</text><text x="610" y="195" fill="#e94560" font-size="13" font-weight="bold">← ナッシュ均衡</text><text x="610" y="215" fill="#aaa" font-size="11">（ここに収束する）</text></svg>


---

<!-- _class: lead -->
# コードベースへの適用

- なぜ悪いコードは増殖し、良いコードは消滅するのか


---

# 悪いコードの「生存優位性」

- - **コピペしやすい**: 既存の悪いコードはそのままコピーできる
- - **動いている**: テストに通る = 「正しい」と見なされる
- - **変更コストが低く見える**: 正しく書き直すより、パッチを当てるほうが速い
- - 良いコードを書く「**機会費用**」が常に存在する
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">技術的負債の蓄積曲線</text><line x1="80" y1="210" x2="720" y2="210" stroke="#aaa" stroke-width="2"/><line x1="80" y1="210" x2="80" y2="55" stroke="#aaa" stroke-width="2"/><text x="400" y="237" text-anchor="middle" fill="#aaa" font-size="12">時間 (プロジェクト経過)</text><text x="45" y="130" text-anchor="middle" fill="#aaa" font-size="11" transform="rotate(-90,45,130)">変更コスト</text><path d="M 90 200 Q 200 195, 300 180 Q 400 155, 500 110 Q 600 60, 700 55" fill="none" stroke="#e94560" stroke-width="3"/><path d="M 90 200 Q 200 198, 300 195 Q 400 190, 500 183 Q 600 175, 700 165" fill="none" stroke="#4eff4e" stroke-width="3"/><text x="720" y="55" fill="#e94560" font-size="11">負債放置</text><text x="720" y="165" fill="#4eff4e" font-size="11">継続改善</text><rect x="250" y="85" width="220" height="50" rx="6" fill="#16213e" stroke="#ffcc00" stroke-width="1"/><text x="360" y="107" text-anchor="middle" fill="#ffcc00" font-size="12">この差が指数関数的に拡大</text><text x="360" y="125" text-anchor="middle" fill="#aaa" font-size="11">→ いずれ変更不能に陥る</text></svg>


---

# 「汚染」のメカニズム — 割れ窓理論

- - **割れ窓理論**: 1枚の割れた窓を放置すると、建物全体が荒れる
- - コードベースも同じ: **1つの悪いパターンが全体の基準を下げる**
- - 新しい開発者は既存コードを「お手本」にする → 悪いパターンが増殖
- - 「みんなこう書いてるから」— 同調圧力による品質低下
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">コードベース汚染の拡散パターン</text><rect x="350" y="55" width="100" height="40" rx="8" fill="#e94560"/><text x="400" y="80" text-anchor="middle" fill="#fff" font-size="12">最初の悪コード</text><line x1="370" y1="95" x2="250" y2="120" stroke="#e94560" stroke-width="1.5"/><polygon points="254,115 246,123 258,122" fill="#e94560"/><line x1="430" y1="95" x2="550" y2="120" stroke="#e94560" stroke-width="1.5"/><polygon points="546,115 554,123 542,122" fill="#e94560"/><rect x="190" y="120" width="120" height="35" rx="6" fill="#533483"/><text x="250" y="142" text-anchor="middle" fill="#fff" font-size="11">コピペ模倣</text><rect x="490" y="120" width="120" height="35" rx="6" fill="#533483"/><text x="550" y="142" text-anchor="middle" fill="#fff" font-size="11">パターン踏襲</text><line x1="210" y1="155" x2="130" y2="175" stroke="#533483" stroke-width="1.5"/><polygon points="134,170 126,178 138,177" fill="#533483"/><line x1="290" y1="155" x2="340" y2="175" stroke="#533483" stroke-width="1.5"/><polygon points="336,170 344,178 332,177" fill="#533483"/><line x1="510" y1="155" x2="460" y2="175" stroke="#533483" stroke-width="1.5"/><polygon points="464,170 456,178 468,177" fill="#533483"/><line x1="590" y1="155" x2="660" y2="175" stroke="#533483" stroke-width="1.5"/><polygon points="656,170 664,178 652,177" fill="#533483"/><rect x="80" y="175" width="100" height="30" rx="5" fill="#8B4513" opacity="0.7"/><text x="130" y="195" text-anchor="middle" fill="#fff" font-size="10">汚染モジュールA</text><rect x="300" y="175" width="100" height="30" rx="5" fill="#8B4513" opacity="0.7"/><text x="350" y="195" text-anchor="middle" fill="#fff" font-size="10">汚染モジュールB</text><rect x="420" y="175" width="100" height="30" rx="5" fill="#8B4513" opacity="0.7"/><text x="470" y="195" text-anchor="middle" fill="#fff" font-size="10">汚染モジュールC</text><rect x="620" y="175" width="100" height="30" rx="5" fill="#8B4513" opacity="0.7"/><text x="670" y="195" text-anchor="middle" fill="#fff" font-size="10">汚染モジュールD</text><text x="400" y="230" text-anchor="middle" fill="#ffcc00" font-size="13" font-weight="bold">1つの悪コード → 全体の基準が低下</text></svg>


---

# 締切が「悪貨」を生む — デスマーチスパイラル

- - 締切 → 「とりあえず動くコード」→ 技術的負債の蓄積
- - 負債 → 次の開発が遅くなる → さらに厳しい締切 → さらなる妥協
- - **負のスパイラル**: 速度を求めるほど遅くなるパラドックス
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">デスマーチスパイラル</text><rect x="330" y="55" width="140" height="40" rx="8" fill="#e94560"/><text x="400" y="80" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">厳しい締切</text><line x1="470" y1="75" x2="530" y2="95" stroke="#e94560" stroke-width="2"/><polygon points="525,89 535,97 523,98" fill="#e94560"/><rect x="530" y="85" width="160" height="40" rx="8" fill="#533483"/><text x="610" y="110" text-anchor="middle" fill="#fff" font-size="13">クイックフィックス</text><line x1="610" y1="125" x2="610" y2="155" stroke="#533483" stroke-width="2"/><polygon points="604,150 616,150 610,160" fill="#533483"/><rect x="530" y="160" width="160" height="40" rx="8" fill="#8B4513"/><text x="610" y="185" text-anchor="middle" fill="#fff" font-size="13">技術的負債 ↑</text><line x1="530" y1="180" x2="470" y2="200" stroke="#8B4513" stroke-width="2"/><polygon points="475,195 465,203 477,202" fill="#8B4513"/><rect x="310" y="190" width="160" height="40" rx="8" fill="#0f3460"/><text x="390" y="215" text-anchor="middle" fill="#fff" font-size="13">開発速度 ↓</text><line x1="310" y1="210" x2="250" y2="190" stroke="#0f3460" stroke-width="2"/><polygon points="255,185 245,193 257,192" fill="#0f3460"/><rect x="130" y="170" width="120" height="40" rx="8" fill="#e94560"/><text x="190" y="195" text-anchor="middle" fill="#fff" font-size="13">更なる締切圧</text><line x1="190" y1="170" x2="250" y2="100" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><polygon points="245,105 255,95 247,107" fill="#e94560"/><text x="400" y="258" text-anchor="middle" fill="#ffcc00" font-size="14" font-weight="bold">速度を求めるほど遅くなるパラドックス</text></svg>


---

# リファクタリングが「駆逐される」理由

- - リファクタリングの価値は **「見えない」**: バグが出ないこと、速度が落ちないこと
- - 一方、新機能は **「見える」**: デモできる、KPIに反映される
- - 経営層への説明: 「何も変わっていないように見えるけど3日かかりました」
- - **結果**: 新機能開発が常に優先され、改善は後回しに → 良貨の駆逐
- 
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="220" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">見える価値 vs 見えない価値</text><rect x="60" y="60" width="300" height="150" rx="12" fill="#0f3460"/><text x="210" y="90" text-anchor="middle" fill="#4eff4e" font-size="15" font-weight="bold">新機能 (見える)</text><text x="210" y="115" text-anchor="middle" fill="#fff" font-size="13">デモ可能</text><text x="210" y="135" text-anchor="middle" fill="#fff" font-size="13">KPI に直結</text><text x="210" y="155" text-anchor="middle" fill="#fff" font-size="13">経営層が理解しやすい</text><text x="210" y="185" text-anchor="middle" fill="#4eff4e" font-size="14" font-weight="bold">常に優先される</text><rect x="440" y="60" width="300" height="150" rx="12" fill="#16213e" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><text x="590" y="90" text-anchor="middle" fill="#e94560" font-size="15" font-weight="bold">リファクタリング (見えない)</text><text x="590" y="115" text-anchor="middle" fill="#aaa" font-size="13">見た目は変わらない</text><text x="590" y="135" text-anchor="middle" fill="#aaa" font-size="13">KPI に反映されにくい</text><text x="590" y="155" text-anchor="middle" fill="#aaa" font-size="13">説明が困難</text><text x="590" y="185" text-anchor="middle" fill="#e94560" font-size="14" font-weight="bold">常に後回しにされる</text></svg>


---

<!-- _class: lead -->
# 逆転の条件

- 「良貨」が生き残る制度的メカニズムをどう構築するか


---

# 「良貨が生き残る」制度的保護

- - 個人の善意に頼らず **仕組みで品質を守る** = 貨幣法の役割
- - **コードレビュー義務化**: マージ前に必ず第三者がチェック
- - **Linter/Formatter自動適用**: 悪いパターンをコミット前にブロック
- - **ADR（Architecture Decision Records）**: 設計判断を文書化し劣化を防ぐ
- 
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="260" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">制度的保護の多層防御</text><rect x="150" y="55" width="500" height="50" rx="10" fill="#e94560" opacity="0.8"/><text x="400" y="85" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">ADR / アーキテクチャガバナンス</text><rect x="200" y="115" width="400" height="45" rx="10" fill="#533483"/><text x="400" y="143" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">コードレビュー / PR承認ルール</text><rect x="250" y="170" width="300" height="45" rx="10" fill="#0f3460"/><text x="400" y="198" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Linter / Formatter / CI</text><rect x="300" y="225" width="200" height="35" rx="10" fill="#16213e" stroke="#4eff4e" stroke-width="2"/><text x="400" y="248" text-anchor="middle" fill="#4eff4e" font-size="13" font-weight="bold">コードベース</text><text x="720" y="80" fill="#e94560" font-size="11">戦略層</text><text x="720" y="138" fill="#533483" font-size="11">人的チェック</text><text x="720" y="193" fill="#0f3460" font-size="11">自動防御</text><text x="720" y="248" fill="#4eff4e" font-size="11">保護対象</text></svg>


---

# 技術的負債の「利子計算」

- - **技術的負債の可視化**: 抽象的な「品質」を **具体的な数字** に変換
- - **SQALE / SonarQube**: 修正にかかる工数を自動計算
- - 経営層向けの言語: 「この負債の利子は月あたり開発者2人月分です」
- - 「悪貨」のコストを見える化することで、「良貨」への投資を正当化

```javascript
// SonarQube Technical Debt Ratio
technical_debt_ratio = remediation_cost / development_cost

// Example: 40人日の修正コスト / 200人日の開発コスト
technical_debt_ratio = 40 / 200  // = 20%

// 月次利子: 新機能開発速度の低下
monthly_interest = velocity_loss * developer_daily_rate
// = 0.3 * 50,000 = 15,000円/日/人 の速度損失
```


---

# ボーイスカウトルール — 小さな改善の複利効果

- - **「来た時より良い状態にして去れ」** — ロバート・C・マーティン
- - 大規模リファクタリングではなく、**触ったコードを少しだけ改善**
- - 複利効果: 毎日1%の改善 → 年間37倍の品質向上（理論値）
- 
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="780" height="240" rx="15" fill="#1a1a2e" style="filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))"/><text x="400" y="40" text-anchor="middle" fill="#e94560" font-size="17" font-weight="bold">継続的改善の複利効果</text><line x1="80" y1="210" x2="720" y2="210" stroke="#aaa" stroke-width="2"/><line x1="80" y1="210" x2="80" y2="55" stroke="#aaa" stroke-width="2"/><text x="400" y="237" text-anchor="middle" fill="#aaa" font-size="12">時間 (月)</text><text x="45" y="130" text-anchor="middle" fill="#aaa" font-size="11" transform="rotate(-90,45,130)">コード品質</text><path d="M 90 200 C 200 198, 300 190, 400 170 C 500 140, 600 90, 700 60" fill="none" stroke="#4eff4e" stroke-width="3"/><path d="M 90 200 L 700 200" fill="none" stroke="#aaa" stroke-width="1" stroke-dasharray="4,3"/><path d="M 90 200 C 200 200, 300 202, 400 208 C 500 218, 600 230, 700 240" fill="none" stroke="#e94560" stroke-width="2" stroke-dasharray="5,3"/><text x="720" y="60" fill="#4eff4e" font-size="11">毎日1%改善</text><text x="720" y="200" fill="#aaa" font-size="11">現状維持</text><text x="720" y="240" fill="#e94560" font-size="11">毎日1%劣化</text><rect x="250" y="100" width="200" height="45" rx="6" fill="#16213e" stroke="#4eff4e" stroke-width="1"/><text x="350" y="120" text-anchor="middle" fill="#4eff4e" font-size="12">1.01^365 = 37.78</text><text x="350" y="137" text-anchor="middle" fill="#aaa" font-size="11">小さな改善が大きな差に</text></svg>


---

# 「壊す自由」の組織的付与

- - **Google**: エンジニアの20%は自律的な改善に使える（20%ルール）
- - **Netflix**: 「正しいことをする自由」が文化として根付いている
- - **技術的負債返済スプリント**: 4スプリントに1回、負債返済だけの期間を設ける
- - **ハックデー/イノベーションスプリント**: 定期的に「壊して作り直す」機会を制度化
- - 個人の善意ではなく **組織のシステムとして** 品質維持を保証する


---

<!-- _class: lead -->
# まとめ — 悪いコードを駆逐するために

- **悪いコードは「個人の怠惰」ではなく「構造的必然」**
- 
- グレシャムの法則が教えること:
- 
- - 個人の意志では品質は守れない
- - **制度的メカニズム** が必要（レビュー、Linter、ADR）
- - 技術的負債を **数字で可視化** し経営層と共有する
- - **ボーイスカウトルール** で小さな改善を積み重ねる
- - 「壊す自由」を **組織文化として** 保護する


---

# 参考文献

- **経済学・理論:**
- - [Gresham's Law - Wikipedia](https://en.wikipedia.org/wiki/Gresham%27s_law)
- - [Thomas Gresham (1558) 「悪貨は良貨を駆逐する」](https://www.econlib.org/library/Enc/GreshamsLaw.html)
- 
- **ソフトウェア工学:**
- - [Ward Cunningham (1992) "The WyCash Portfolio Management System" - 技術的負債メタファーの起源](http://wiki.c2.com/?WardExplainsDebtMetaphor)
- - [Robert C. Martin "Clean Code" (2008)](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- 
- **ツール・フレームワーク:**
- - [SonarQube - Technical Debt Management](https://www.sonarsource.com/products/sonarqube/)
- - [SQALE Method](http://www.sqale.org/)

