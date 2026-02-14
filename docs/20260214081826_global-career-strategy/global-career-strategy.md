---
marp: true
theme: gaia
size: 16:9
paginate: true
style: |
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# 世界で年収を伸ばすスキル・資格と海外就業戦略

- 対象: マネージャー / シニアエンジニア
- ゴール: 転職 vs 海外就職の意思決定
- 範囲: スキル・資格・市場価値・円安戦略


---

# この60分で得るもの

- 年収を決める構造を分解して理解する
- 資格のROIを地域・職種別に判断できる
- 円安下での収入最大化シナリオを比較できる
- 90日/1年/3年の実行計画を作れる


---

# 先に結論: 3つのキーメッセージ

- 日本人は海外市場で働くことで収入上限を上げやすい
- 年収は希少な課題解決能力 × 影響範囲 × 交渉力で決まる
- 資格は目的ではなく高単価職に入る信用ショートカット


---

<!-- _class: lead -->
# セクション1: 市場全体像

- 世界の賃金差・通貨差・需要差を俯瞰する


---

# 報酬差を作る3要因

- 職種: IC/EM/Architectで報酬レンジが異なる
- 地域: 同職種でも市場単価が大きく異なる
- 通貨: 円建て生活者は為替の影響を強く受ける

<svg viewBox="0 0 520 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- 職種 -->
  <rect x="20" y="30" width="140" height="50" rx="10" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="90" y="62" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">職種</text>
  <!-- 地域 -->
  <rect x="20" y="105" width="140" height="50" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="90" y="137" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">地域</text>
  <!-- 通貨 -->
  <rect x="20" y="180" width="140" height="50" rx="10" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="90" y="212" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">通貨</text>
  <!-- 年収 -->
  <rect x="340" y="90" width="150" height="70" rx="10" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="415" y="133" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">年収</text>
  <!-- Arrows -->
  <line x1="160" y1="55" x2="334" y2="115" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="334,115 327.6,109.1 325.3,115.7" fill="#546E7A"/>
  <line x1="160" y1="130" x2="334" y2="125" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="334,125 325.9,121.7 326.1,128.7" fill="#546E7A"/>
  <line x1="160" y1="205" x2="334" y2="140" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="334,140 325.3,139.5 327.7,146.1" fill="#546E7A"/>
  <!-- Legend -->
  <rect x="20" y="245" width="480" height="2" rx="1" fill="#B0BEC5"/>
</svg>

<!--
出典: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
出典: https://fred.stlouisfed.org/series/DEXJPUS
-->

---

# 米国ソフトウェア職の賃金ベンチマーク

- 米BLSでSoftware Developersの年次賃金中央値は高水準
- 同職種の雇用見通しは全職種平均を上回る成長率
- 高成長市場の単価は日本市場の交渉基準を押し上げる

<!--
出典: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
-->

---

# 日本側の賃金現実をどう読むか

- 日本市場は職種定義が曖昧で単価が伸びにくい
- 転職時にジョブ型で職責を明確化すると単価改善しやすい
- 海外市場のレンジを基準に交渉材料を作る

<!--
出典: https://www.nta.go.jp/publication/statistics/kokuzeicho/minkan/index.htm
-->

---

# 円安は何を変えるか

- 外貨建て収入の円換算を押し上げる
- 国内給与のみだと実質購買力の防衛が難しい
- 通貨分散はキャリア戦略そのもの

<svg viewBox="0 0 560 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- 円安進行 -->
  <rect x="190" y="10" width="180" height="50" rx="10" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="280" y="42" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">円安進行</text>
  <!-- 輸入コスト上昇 -->
  <rect x="20" y="110" width="220" height="50" rx="10" fill="#D32F2F" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="130" y="142" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">輸入コスト上昇</text>
  <!-- 外貨収入の円換算増 -->
  <rect x="300" y="110" width="240" height="50" rx="10" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="420" y="142" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">外貨収入の円換算増</text>
  <!-- 国内生活コスト圧力 -->
  <rect x="10" y="220" width="240" height="50" rx="10" fill="#F44336" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="130" y="252" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">国内生活コスト圧力</text>
  <!-- 手取り防衛 -->
  <rect x="320" y="220" width="200" height="50" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="420" y="252" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">手取り防衛</text>
  <!-- Arrows -->
  <line x1="235" y1="60" x2="145" y2="104" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="145,104 153.7,103.6 150.6,97.3" fill="#546E7A"/>
  <line x1="325" y1="60" x2="405" y2="104" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="405,104 399.7,97.1 396.3,103.2" fill="#546E7A"/>
  <line x1="130" y1="160" x2="130" y2="214" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="130,214 133.5,206 126.5,206" fill="#546E7A"/>
  <line x1="420" y1="160" x2="420" y2="214" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="420,214 423.5,206 416.5,206" fill="#546E7A"/>
  <!-- Legend -->
  <rect x="20" y="290" width="12" height="12" rx="3" fill="#D32F2F"/>
  <text x="38" y="301" font-size="12" font-family="sans-serif" fill="#37474F">リスク</text>
  <rect x="100" y="290" width="12" height="12" rx="3" fill="#4CAF50"/>
  <text x="118" y="301" font-size="12" font-family="sans-serif" fill="#37474F">機会</text>
  <rect x="180" y="290" width="12" height="12" rx="3" fill="#E65100"/>
  <text x="198" y="301" font-size="12" font-family="sans-serif" fill="#37474F">トリガー</text>
</svg>

<!--
出典: https://fred.stlouisfed.org/series/DEXJPUS
-->

---

<!-- _class: lead -->
# セクション2: 年収アップに効くスキル

- 技術と非技術を分けてROIで見る


---

# 年収決定式: 希少性 × 影響範囲 × 交渉力

- 希少性: 代替されにくい専門性
- 影響範囲: チーム/事業PLに与える効果
- 交渉力: オファー設計と条件交渉の技術
- 3要素を同時に伸ばすと年収は非線形に上がる


---

# グローバルで評価されやすい技術スキル

- Cloud Architecture: 可用性・コスト最適化
- Security Engineering: 監査・脅威対応・設計
- Data/ML Engineering: 収益接続するデータ活用
- Platform/SRE: 開発生産性と信頼性の改善


---

# 非技術スキルのインパクト

- 英語: 会議参加ではなく意思決定に影響する発話力
- ドキュメント: 非同期環境で評価を獲得する
- ステークホルダー調整: 影響範囲を拡張する
- 報酬交渉: オファー総額を最適化する


---

# スキルスタック戦略（T字→π字）

- 1本目: 現在の強みを深掘る
- 2本目: 高単価隣接領域を追加する
- 横軸: 英語・設計・ビジネス理解で橋渡しする

<svg viewBox="0 0 700 140" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- T字 -->
  <rect x="10" y="30" width="110" height="50" rx="10" fill="#78909C" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="65" y="62" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">T字</text>
  <!-- π字 -->
  <rect x="185" y="30" width="110" height="50" rx="10" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="240" y="62" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">π字</text>
  <!-- 高単価ロール適合 -->
  <rect x="360" y="30" width="170" height="50" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="445" y="62" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">高単価ロール適合</text>
  <!-- 年収上限拡大 -->
  <rect x="595" y="30" width="90" height="50" rx="10" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="640" y="55" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">年収上限</text>
  <text x="640" y="72" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">拡大</text>
  <!-- Arrows -->
  <line x1="120" y1="55" x2="179" y2="55" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="179,55 171,51.5 171,58.5" fill="#546E7A"/>
  <line x1="295" y1="55" x2="354" y2="55" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="354,55 346,51.5 346,58.5" fill="#546E7A"/>
  <line x1="530" y1="55" x2="589" y2="55" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="589,55 581,51.5 581,58.5" fill="#546E7A"/>
  <!-- Legend -->
  <rect x="10" y="105" width="680" height="2" rx="1" fill="#B0BEC5"/>
  <text x="10" y="125" font-size="12" font-family="sans-serif" fill="#78909C">スキルスタック進化: 単一専門 → 複合専門 → 高付加価値</text>
</svg>


---

<!-- _class: lead -->
# セクション3: 資格のROI

- 資格を年収上昇に接続する使い方を整理する


---

# 資格は信用ショートカット

- 資格単体で給与が上がるわけではない
- 高単価職の選考通過率を上げる効果がある
- 実務実績と組み合わせて初めて強い


---

# クラウド資格の優先度

- AWS: 求人数・導入母数が大きく汎用性が高い
- GCP: Data/ML文脈で差別化しやすい
- Azure: エンタープライズ案件で有効
- 選定基準は狙う市場と職務記述書


---

# セキュリティ資格の優先度

- CISSP: 設計・統制・マネジメント文脈で強い
- CCSP: クラウドセキュリティで有効
- OSCP系: 実践技術ロールで差別化
- 規制業界では資格要件が報酬に直結しやすい


---

# PM/アーキ資格の優先度

- PMP: 複数職種を束ねる役割で有効
- TOGAF系: エンタープライズ設計で有効
- 管理職志向なら技術資格と組み合わせる


---

# 資格投資の意思決定マトリクス

- 労力: 学習時間と受験コスト
- 回収: 希望職種への到達確率
- 流動性: 国・企業を跨いで通用するか

<svg viewBox="0 0 500 440" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
  <text x="250" y="28" text-anchor="middle" font-size="18" font-family="sans-serif" font-weight="bold" fill="#37474F">資格投資の優先度</text>
  <!-- Quadrant backgrounds -->
  <rect x="60" y="45" width="200" height="170" fill="#FFEBEE"/>
  <rect x="260" y="45" width="200" height="170" fill="#E8F5E9"/>
  <rect x="60" y="215" width="200" height="170" fill="#ECEFF1"/>
  <rect x="260" y="215" width="200" height="170" fill="#E3F2FD"/>
  <!-- Quadrant labels -->
  <text x="160" y="85" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#C62828" font-weight="bold">条件付き</text>
  <text x="360" y="85" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#2E7D32" font-weight="bold">先行投資</text>
  <text x="160" y="355" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#78909C" font-weight="bold">見送り</text>
  <text x="360" y="355" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#1565C0" font-weight="bold">今すぐ実行</text>
  <!-- Axes -->
  <line x1="60" y1="215" x2="460" y2="215" stroke="#B0BEC5" stroke-width="1" stroke-dasharray="4"/>
  <line x1="260" y1="45" x2="260" y2="385" stroke="#B0BEC5" stroke-width="1" stroke-dasharray="4"/>
  <!-- Axis labels -->
  <text x="60" y="405" font-size="13" font-family="sans-serif" fill="#78909C">← 低回収</text>
  <text x="410" y="405" font-size="13" font-family="sans-serif" fill="#78909C">高回収 →</text>
  <text x="42" y="380" font-size="13" font-family="sans-serif" fill="#78909C" transform="rotate(-90 42 380)">← 低労力</text>
  <text x="42" y="110" font-size="13" font-family="sans-serif" fill="#78909C" transform="rotate(-90 42 110)">高労力 →</text>
  <!-- Data points -->
  <circle cx="372" cy="174" r="22" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))" opacity="0.9"/>
  <text x="372" y="170" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">AWS/</text>
  <text x="372" y="184" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">Security</text>
  <circle cx="304" cy="198" r="20" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))" opacity="0.9"/>
  <text x="304" y="203" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif" font-weight="bold">PM系</text>
  <circle cx="200" cy="147" r="20" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))" opacity="0.9"/>
  <text x="200" y="152" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">niche</text>
  <!-- Legend bar -->
  <rect x="60" y="420" width="400" height="2" rx="1" fill="#B0BEC5"/>
  <circle cx="80" cy="435" r="6" fill="#4CAF50"/>
  <text x="92" y="439" font-size="11" font-family="sans-serif" fill="#37474F">AWS/Security</text>
  <circle cx="200" cy="435" r="6" fill="#2196F3"/>
  <text x="212" y="439" font-size="11" font-family="sans-serif" fill="#37474F">PM系</text>
  <circle cx="280" cy="435" r="6" fill="#FF9800"/>
  <text x="292" y="439" font-size="11" font-family="sans-serif" fill="#37474F">niche資格</text>
</svg>

<!--
出典: https://home.pearsonvue.com/Test-owners/Value-of-Certification.aspx
-->

---

<!-- _class: lead -->
# セクション4: 市場価値の測定

- 感覚ではなく指標で自分を評価する


---

# 市場価値を測る4指標

- Compensation: 基本給+賞与+株式
- Offer Rate: 応募あたりオファー率
- Time to Fill: 自分の採用難易度
- Scope: 任される予算・人数・売上影響


---

# 自己診断スコアカード

- 技術深度（0-5）
- 事業インパクト（0-5）
- 英語実戦力（0-5）
- 交渉力（0-5）
- 外貨収入比率（0-5）


---

# キャリア分岐: IC / EM / Architect

- IC: 専門性深掘りで高単価
- EM: 組織成果責任で報酬上限拡大
- Architect: 横断影響力で希少性を獲得
- 自分の強みに合う分岐を選ぶ

<svg viewBox="0 0 600 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- 現在地 -->
  <rect x="230" y="10" width="140" height="50" rx="10" fill="#37474F" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="42" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">現在地</text>
  <!-- IC -->
  <rect x="20" y="120" width="120" height="50" rx="10" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="80" y="152" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">IC</text>
  <!-- EM -->
  <rect x="240" y="120" width="120" height="50" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="152" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">EM</text>
  <!-- Architect -->
  <rect x="460" y="120" width="120" height="50" rx="10" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="520" y="152" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">Architect</text>
  <!-- 専門性プレミアム -->
  <rect x="5" y="230" width="150" height="50" rx="10" fill="#1565C0" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="80" y="260" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">専門性プレミアム</text>
  <!-- 組織責任プレミアム -->
  <rect x="220" y="230" width="160" height="50" rx="10" fill="#2E7D32" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="260" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">組織責任プレミアム</text>
  <!-- 横断設計プレミアム -->
  <rect x="440" y="230" width="155" height="50" rx="10" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="517" y="260" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">横断設計プレミアム</text>
  <!-- Arrows from 現在地 -->
  <line x1="265" y1="60" x2="95" y2="114" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="95,114 103.7,114.9 101.6,108.2" fill="#546E7A"/>
  <line x1="300" y1="60" x2="300" y2="114" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="300,114 303.5,106 296.5,106" fill="#546E7A"/>
  <line x1="335" y1="60" x2="505" y2="114" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="505,114 498.4,108.2 496.3,114.9" fill="#546E7A"/>
  <!-- Arrows to premiums -->
  <line x1="80" y1="170" x2="80" y2="224" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="80,224 83.5,216 76.5,216" fill="#546E7A"/>
  <line x1="300" y1="170" x2="300" y2="224" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="300,224 303.5,216 296.5,216" fill="#546E7A"/>
  <line x1="520" y1="170" x2="517" y2="224" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="517,224 520.9,216.2 513.9,215.8" fill="#546E7A"/>
  <!-- Legend -->
  <rect x="20" y="300" width="12" height="12" rx="3" fill="#2196F3"/>
  <text x="38" y="311" font-size="12" font-family="sans-serif" fill="#37474F">IC</text>
  <rect x="80" y="300" width="12" height="12" rx="3" fill="#4CAF50"/>
  <text x="98" y="311" font-size="12" font-family="sans-serif" fill="#37474F">EM</text>
  <rect x="140" y="300" width="12" height="12" rx="3" fill="#FF9800"/>
  <text x="158" y="311" font-size="12" font-family="sans-serif" fill="#37474F">Architect</text>
</svg>


---

<!-- _class: lead -->
# セクション5: 円安下の海外就業戦略

- 働き方ごとの収益・リスクを比較する


---

# 3つの就業モデル比較

- 現地雇用: 最も報酬上限が高いが移住コストあり
- 海外リモート雇用: 移住なしで外貨収入を得やすい
- 業務委託/契約: 単価上振れ余地と不安定性が共存


---

# 手取り最適化の考え方

- 年収総額ではなく可処分所得で比較する
- 税率・社会保険・生活費・為替を同時に評価する
- 通貨の受取比率を戦略的に設計する

<svg viewBox="0 0 600 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- Gross Pay -->
  <rect x="10" y="100" width="140" height="55" rx="10" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="80" y="134" text-anchor="middle" fill="white" font-size="17" font-family="sans-serif" font-weight="bold">Gross Pay</text>
  <!-- Tax -->
  <rect x="220" y="15" width="140" height="50" rx="10" fill="#D32F2F" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="290" y="47" text-anchor="middle" fill="white" font-size="17" font-family="sans-serif" font-weight="bold">Tax</text>
  <!-- Social Insurance -->
  <rect x="220" y="100" width="160" height="55" rx="10" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="120" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">Social</text>
  <text x="300" y="140" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">Insurance</text>
  <!-- RSU/Bonus -->
  <rect x="220" y="190" width="140" height="50" rx="10" fill="#7B1FA2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="290" y="222" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">RSU/Bonus</text>
  <!-- Net Disposable -->
  <rect x="440" y="90" width="150" height="70" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="515" y="118" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">Net</text>
  <text x="515" y="140" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">Disposable</text>
  <!-- Arrows from Gross Pay -->
  <line x1="150" y1="115" x2="214" y2="50" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="214,50 205.9,53.2 210.9,58.2" fill="#546E7A"/>
  <line x1="150" y1="127" x2="214" y2="127" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="214,127 206,123.5 206,130.5" fill="#546E7A"/>
  <line x1="150" y1="140" x2="214" y2="205" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="214,205 210.9,196.8 205.9,201.8" fill="#546E7A"/>
  <!-- Arrows to Net Disposable -->
  <line x1="360" y1="40" x2="434" y2="105" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="434,105 430.3,97.1 425.7,102.4" fill="#546E7A"/>
  <line x1="380" y1="127" x2="434" y2="125" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="434,125 425.9,121.8 426.1,128.8" fill="#546E7A"/>
  <line x1="360" y1="215" x2="434" y2="145" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="434,145 425.8,148 430.6,153" fill="#546E7A"/>
  <!-- Legend -->
  <rect x="10" y="265" width="12" height="12" rx="3" fill="#D32F2F"/>
  <text x="28" y="276" font-size="12" font-family="sans-serif" fill="#37474F">控除</text>
  <rect x="80" y="265" width="12" height="12" rx="3" fill="#7B1FA2"/>
  <text x="98" y="276" font-size="12" font-family="sans-serif" fill="#37474F">変動報酬</text>
  <rect x="180" y="265" width="12" height="12" rx="3" fill="#4CAF50"/>
  <text x="198" y="276" font-size="12" font-family="sans-serif" fill="#37474F">手取り</text>
</svg>


---

# 海外選考突破の実務

- 英文CVは成果指標ベースで記述する
- 設計面接はトレードオフ説明を重視する
- 行動面接はSTARでリーダーシップを証明する
- 推薦と公開実績で信頼を補強する


---

# オファー交渉の要点

- 交渉対象を基本給だけに限定しない
- サインオン/RSU/査定時期/職位を同時交渉する
- 複数オファーで交渉力を作る
- 通貨建てと支払いタイミングを確認する


---

<!-- _class: lead -->
# セクション6: リスクと制度

- 攻めと同時に制度リスクを管理する


---

# ビザ・労働制度の確認項目

- 就労資格の要件と更新条件
- 雇用主変更時の制約
- 帯同家族の就労可否
- 退職時の在留資格リスク

<!--
出典: https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations
-->

---

# 税務・社会保険の論点

- 居住性判定で課税範囲が変わる
- 二重課税の回避ルールを確認する
- 社会保険の加入先と給付を整理する
- 契約形態ごとの控除可能項目を把握する

<!--
出典: https://www.nta.go.jp/english/taxes/individual/index.htm
-->

---

# 為替・雇用・健康リスクの管理

- 為替: 受取通貨の分散と換金ルール
- 雇用: 緊急時の生活防衛資金を確保
- 健康: 保険と医療アクセスを優先確認
- 法務: 契約条項を事前に弁護士確認


---

<!-- _class: lead -->
# セクション7: 意思決定フレーム

- 転職か海外就職かを構造化して判断する


---

# 意思決定ツリー

- 最優先を年収最大化に置くか
- 移住許容度と家庭条件はどうか
- 英語業務遂行力が基準を超えるか
- 制度リスクを受容できるか

<svg viewBox="0 0 620 460" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- 意思決定開始 -->
  <rect x="210" y="10" width="180" height="50" rx="10" fill="#37474F" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="42" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">意思決定開始</text>
  <!-- 年収最大化が最優先? (diamond) -->
  <polygon points="300,90 450,145 300,200 150,145" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="140" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">年収最大化が</text>
  <text x="300" y="158" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">最優先?</text>
  <!-- 国内ハイレンジ転職 -->
  <rect x="470" y="120" width="140" height="50" rx="10" fill="#78909C" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="540" y="142" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif" font-weight="bold">国内ハイレンジ</text>
  <text x="540" y="158" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif" font-weight="bold">転職</text>
  <!-- 移住可能? (diamond) -->
  <polygon points="300,230 420,275 300,320 180,275" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="280" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">移住可能?</text>
  <!-- 現地雇用を優先検討 -->
  <rect x="40" y="340" width="180" height="50" rx="10" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="130" y="370" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">現地雇用を優先検討</text>
  <!-- 海外リモート/契約 -->
  <rect x="380" y="340" width="190" height="50" rx="10" fill="#7B1FA2" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="475" y="370" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">海外リモート/契約</text>
  <!-- ビザ・税務確認 -->
  <rect x="210" y="420" width="180" height="50" rx="8" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="300" y="450" text-anchor="middle" fill="white" font-size="15" font-family="sans-serif" font-weight="bold">ビザ・税務確認</text>
  <!-- Labels -->
  <text x="460" y="118" font-size="14" font-family="sans-serif" fill="#D32F2F" font-weight="bold">No</text>
  <text x="290" y="218" font-size="14" font-family="sans-serif" fill="#2E7D32" font-weight="bold">Yes</text>
  <text x="168" y="330" font-size="14" font-family="sans-serif" fill="#2E7D32" font-weight="bold">Yes</text>
  <text x="410" y="330" font-size="14" font-family="sans-serif" fill="#D32F2F" font-weight="bold">No</text>
  <!-- Arrows -->
  <line x1="300" y1="60" x2="300" y2="90" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="300,90 303.5,82 296.5,82" fill="#546E7A"/>
  <line x1="450" y1="145" x2="464" y2="145" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="464,145 456,141.5 456,148.5" fill="#546E7A"/>
  <line x1="300" y1="200" x2="300" y2="230" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="300,230 303.5,222 296.5,222" fill="#546E7A"/>
  <line x1="210" y1="290" x2="145" y2="334" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="145,334 153.6,332.4 149.7,326.6" fill="#546E7A"/>
  <line x1="390" y1="290" x2="460" y2="334" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="460,334 455.1,326.8 451.4,332.7" fill="#546E7A"/>
  <line x1="130" y1="390" x2="225" y2="420" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="225,420 218.4,414.3 216.3,420.9" fill="#546E7A"/>
  <line x1="475" y1="390" x2="375" y2="420" stroke="#546E7A" stroke-width="2.5"/>
  <polygon points="375,420 383.7,421.1 381.7,414.3" fill="#546E7A"/>
</svg>


---

# ケース別推奨戦略

- 独身・高機動: 現地雇用チャレンジ
- 家族あり・安定重視: 海外リモート雇用
- 高スキル自走型: 外貨建て契約 + 複数顧客
- 全ケースで資格より先に職務要件適合を優先


---

# 意思決定を失敗させる典型

- 年収総額だけで比較して手取りを見ない
- 資格取得で満足し職務転換しない
- 英語を試験スコアだけで判断する
- 為替を短期予想で賭ける


---

<!-- _class: lead -->
# セクション8: 実行計画

- 短期・中期・長期で再現性のある計画に落とす


---

# 90日アクションプラン

- 職種ターゲットを1つに固定する
- 求人50件を分析して要件差分を抽出
- 不足スキル1つ・資格1つに集中投資する
- 英文CVと職務経歴を成果指標で再作成する


---

# 1年アクションプラン

- 高難度プロジェクトで成果実績を作る
- 国際案件または英語環境での実務経験を積む
- 希望市場で通用する資格を1-2個取得する
- 年2回は報酬交渉か転職活動を実施する


---

# 3年アクションプラン

- 外貨収入比率を段階的に引き上げる
- IC/EM/Architectの主戦場を確定する
- 地理・通貨・契約形態の分散を実装する
- 資産形成とキャリア戦略を統合する

<svg viewBox="0 0 720 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
  <text x="360" y="28" text-anchor="middle" font-size="18" font-family="sans-serif" font-weight="bold" fill="#37474F">3年ロードマップ</text>
  <!-- Timeline bar -->
  <rect x="40" y="95" width="640" height="8" rx="4" fill="#B0BEC5"/>
  <!-- Phase circles -->
  <circle cx="120" cy="99" r="14" fill="#2196F3" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="120" y="104" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">1</text>
  <circle cx="290" cy="99" r="14" fill="#4CAF50" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="290" y="104" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">2</text>
  <circle cx="460" cy="99" r="14" fill="#FF9800" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="460" y="104" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">3</text>
  <circle cx="620" cy="99" r="14" fill="#E65100" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="620" y="104" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif" font-weight="bold">4</text>
  <!-- Phase labels (top) -->
  <text x="120" y="65" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="bold" fill="#2196F3">0-6ヶ月</text>
  <text x="290" y="65" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="bold" fill="#4CAF50">6-12ヶ月</text>
  <text x="460" y="65" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="bold" fill="#FF9800">1-2年</text>
  <text x="620" y="65" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="bold" fill="#E65100">2-3年</text>
  <!-- Phase cards -->
  <rect x="40" y="130" width="150" height="80" rx="8" fill="#E3F2FD" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="115" y="152" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1565C0">要件分析</text>
  <text x="115" y="170" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1565C0">CV再構築</text>
  <text x="115" y="188" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1565C0">初回応募</text>
  <rect x="210" y="130" width="160" height="80" rx="8" fill="#E8F5E9" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="290" y="152" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#2E7D32">資格取得</text>
  <text x="290" y="170" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#2E7D32">英語実戦</text>
  <text x="290" y="188" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#2E7D32">報酬交渉</text>
  <rect x="385" y="130" width="150" height="80" rx="8" fill="#FFF3E0" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="460" y="155" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#E65100">職務転換</text>
  <text x="460" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#E65100">外貨収入拡大</text>
  <rect x="545" y="130" width="150" height="80" rx="8" fill="#FBE9E7" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15))"/>
  <text x="620" y="155" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#BF360C">市場分散</text>
  <text x="620" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#BF360C">上位ロール定着</text>
  <!-- Legend -->
  <rect x="40" y="230" width="640" height="2" rx="1" fill="#B0BEC5"/>
  <rect x="40" y="245" width="12" height="12" rx="3" fill="#2196F3"/>
  <text x="58" y="256" font-size="11" font-family="sans-serif" fill="#37474F">準備</text>
  <rect x="110" y="245" width="12" height="12" rx="3" fill="#4CAF50"/>
  <text x="128" y="256" font-size="11" font-family="sans-serif" fill="#37474F">実行</text>
  <rect x="180" y="245" width="12" height="12" rx="3" fill="#FF9800"/>
  <text x="198" y="256" font-size="11" font-family="sans-serif" fill="#37474F">拡大</text>
  <rect x="250" y="245" width="12" height="12" rx="3" fill="#E65100"/>
  <text x="268" y="256" font-size="11" font-family="sans-serif" fill="#37474F">定着</text>
</svg>


---

# 参考文献（一次情報）1/2

- [U.S. BLS: Software Developers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)
- [FRED: JPY/USD (DEXJPUS)](https://fred.stlouisfed.org/series/DEXJPUS)
- [NTA: Tax information for individuals](https://www.nta.go.jp/english/taxes/individual/index.htm)
- [USCIS: H-1B Specialty Occupations](https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations)
- [Pearson VUE: Value of IT Certification](https://home.pearsonvue.com/Test-owners/Value-of-Certification.aspx)


---

# 参考文献（一次情報）2/2

- [OECD Data Portal](https://data.oecd.org/)
- [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2024/)
- [World Bank Open Data](https://data.worldbank.org/)
- [IMF Data](https://data.imf.org/)
- [BOJ Statistics](https://www.boj.or.jp/en/statistics/index.htm/)


---

<!-- _class: lead -->
# まとめと行動宣言

- 今日決める: 目指す職種と市場を1つに絞る
- 今週やる: 求人要件分析と不足スキル特定
- 今月やる: 応募資料更新と初回応募開始
- この四半期で意思決定を完了する
