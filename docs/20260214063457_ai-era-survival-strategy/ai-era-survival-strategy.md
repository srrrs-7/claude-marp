---
marp: false
theme: gaia
size: 16:9
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
  section {
    font-family: 'Noto Sans JP', sans-serif;
  }
  section h1, section h2 {
    color: #e65100;
  }
  section strong {
    color: #f57c00;
  }
  section a {
    color: #ff9800;
  }
  section code {
    background-color: #fff3e0;
  }
  /* コードブロックのフォントサイズを縮小してはみ出しを防ぐ */
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# AI時代のソフトウェアエンジニアの生存戦略

- 社内勉強会

<!--
タイトルスライド。30分の発表を想定。
-->

---

# 目次

- 1. AI時代の開発現場
- 2. AIツールの選定と導入
- 3. AI協働の実践テクニック
- 4. レビュー戦略とコード品質
- 5. 進化し続ける人材へ

<!--
全体の流れ。現状認識→ツール選定→実践→品質管理→キャリアの順で展開。
-->

---

# 前提と対象者

- 対象: AIツールを使い始めた/検討中のエンジニア
- 前提知識: 基本的なプログラミング経験
- ゴール: AI時代のエンジニアリングベストプラクティスを持ち帰る

<!--
聴衆の前提知識を確認。ツール紹介ではなく、実践的な活用法にフォーカス。
-->

---

<!-- _class: lead -->
# AI時代の開発現場


---

# 現在地の確認

- AIコーディングツールは「補助」から「協働」へ進化
- Claude Code / Cursor / GitHub Copilot — 実用レベルの精度
- 「速く書く」から「正しく指示する」へのパラダイムシフト
- 問われるのは「AIと何を作れるか」

<!--
開発現場の構造変化を強調。AIは単なるツールではなく協働パートナー。
-->

---

# AIツールの進化史

- 2021年: Copilot登場（補完ベース）
- 2023年: ChatGPT統合、会話型へ進化
- 2024年: Claude Code / Cursor — マルチファイル編集
- 2025年: エージェント型、自律的なタスク実行

<svg viewBox="0 0 750 200" style="max-height:70vh;width:auto;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="ft1"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
  </defs>
  <!-- Timeline axis -->
  <line x1="60" y1="100" x2="690" y2="100" stroke="#B0BEC5" stroke-width="3"/>
  <!-- 2021 -->
  <circle cx="120" cy="100" r="18" fill="#1565C0" filter="url(#ft1)"/>
  <text x="120" y="106" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="12" font-weight="bold">&#39;21</text>
  <text x="120" y="70" text-anchor="middle" fill="#37474F" font-family="sans-serif" font-size="13" font-weight="bold">GitHub Copilot</text>
  <text x="120" y="145" text-anchor="middle" fill="#78909C" font-family="sans-serif" font-size="11">補完ベース</text>
  <!-- 2023 -->
  <circle cx="310" cy="100" r="18" fill="#2E7D32" filter="url(#ft1)"/>
  <text x="310" y="106" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="12" font-weight="bold">&#39;23</text>
  <text x="310" y="70" text-anchor="middle" fill="#37474F" font-family="sans-serif" font-size="13" font-weight="bold">ChatGPT統合</text>
  <text x="310" y="145" text-anchor="middle" fill="#78909C" font-family="sans-serif" font-size="11">会話型へ進化</text>
  <!-- 2024 -->
  <circle cx="500" cy="100" r="18" fill="#E65100" filter="url(#ft1)"/>
  <text x="500" y="106" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="12" font-weight="bold">&#39;24</text>
  <text x="500" y="70" text-anchor="middle" fill="#37474F" font-family="sans-serif" font-size="13" font-weight="bold">Claude Code</text>
  <text x="500" y="145" text-anchor="middle" fill="#78909C" font-family="sans-serif" font-size="11">マルチファイル編集</text>
  <!-- 2025 -->
  <circle cx="630" cy="100" r="18" fill="#7B1FA2" filter="url(#ft1)"/>
  <text x="630" y="106" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="12" font-weight="bold">&#39;25</text>
  <text x="630" y="70" text-anchor="middle" fill="#37474F" font-family="sans-serif" font-size="13" font-weight="bold">エージェント型</text>
  <text x="630" y="145" text-anchor="middle" fill="#78909C" font-family="sans-serif" font-size="11">自律的タスク実行</text>
  <!-- Progress arrow -->
  <polygon points="695,100 685,92 685,108" fill="#B0BEC5"/>
  <!-- Legend -->
  <rect x="150" y="170" width="450" height="25" rx="5" fill="#F5F5F5" stroke="#E0E0E0"/>
  <circle cx="185" cy="182" r="6" fill="#1565C0"/>
  <text x="197" y="187" fill="#37474F" font-family="sans-serif" font-size="10">補完</text>
  <circle cx="260" cy="182" r="6" fill="#2E7D32"/>
  <text x="272" y="187" fill="#37474F" font-family="sans-serif" font-size="10">会話型</text>
  <circle cx="345" cy="182" r="6" fill="#E65100"/>
  <text x="357" y="187" fill="#37474F" font-family="sans-serif" font-size="10">マルチファイル</text>
  <circle cx="460" cy="182" r="6" fill="#7B1FA2"/>
  <text x="472" y="187" fill="#37474F" font-family="sans-serif" font-size="10">エージェント</text>
</svg>

<!--
わずか4年で劇的な進化。単一行補完から自律エージェントへ。
-->

---

# 生産性への影響（研究データ）

- GitHub研究: 開発速度 55% 向上
- 反復作業の時間を 60% 削減
- 開発者の満足度 75% 向上
- ただし、レビュー時間は 1.3倍 に増加

<!--
定量的なデータで効果を示す。一方でレビューコスト増は課題として後述。
-->

---

# 企業での導入事例

- Shopify: 全エンジニアにCopilot導入、開発速度30%向上
- Mercari: Claude活用で技術的負債解消を加速
- Stripe: AI生成コードが全コミットの40%超に
- 共通点: ガイドライン整備とレビュー体制の強化

<!--
実際の企業事例。成功の鍵はガイドライン整備。
-->

---

# よくある誤解と現実

- 誤解: AIがすべてを書けば人間は不要
- 現実: 設計・判断・レビューの重要性が増大
- 誤解: AI生成コードは常に正しい
- 現実: ハルシネーション、セキュリティリスクあり

<!--
過度な期待と過度な懸念の両方に対処。バランスの取れた理解が重要。
-->

---

<!-- _class: lead -->
# AIツールの選定と導入


---

# 主要AIツール比較

- GitHub Copilot: IDE統合、最も普及、企業向けプラン充実
- Cursor: VSCode派生、AI-first設計、マルチファイル編集
- Claude Code: CLI + Agent、自律的タスク実行、コンテキスト長い
- 選定基準: チーム規模、技術スタック、セキュリティ要件

<!--
それぞれの特徴と強み。万能ツールはなく、用途に応じて選択。
-->

---

# ツール選定のポイント

- 開発フロー: 単一ファイル補完 vs マルチファイル編集
- セキュリティ: オンプレミス対応、データ保持ポリシー
- コスト: 個人 $10-20/月、企業 $19-39/ユーザー/月
- 学習コスト: チームの習熟度、既存ワークフローとの親和性

<!--
選定は多面的。技術的な性能だけでなく、組織的要因も考慮。
-->

---

# 組織導入のベストプラクティス

- 段階的導入: パイロットチーム → 段階的拡大
- ガイドライン策定: 利用範囲、禁止事項、レビュー基準
- トレーニング: プロンプト技術、レビューポイント
- 効果測定: 生産性、品質、開発者満足度

<!--
組織全体での導入は戦略的に。失敗事例の多くは無計画な全社展開。
-->

---

# セキュリティ・コンプライアンス

- 機密情報の扱い: プロンプトにAPIキー、個人情報を含めない
- ライセンス管理: AI生成コードの著作権リスク
- データ保持: トレーニングデータへの利用可否を確認
- 監査対応: 生成履歴のロギング、レビュー記録の保持

<!--
セキュリティは最優先事項。便利さとリスクのバランス。
-->

---

<!-- _class: lead -->
# AI協働の実践テクニック


---

# AI協働の開発フロー

- 人間が設計・要件を定義し、AIが実装を担う
- 生成→レビュー→修正のイテレーションを高速に回す
- AIは「ドラフト生成器」、人間は「品質ゲートキーパー」

<svg viewBox="0 0 700 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fc1"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
    <marker id="ac1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#546E7A"/>
    </marker>
  </defs>
  <!-- A: 要件定義・設計 (Human) -->
  <rect x="30" y="60" width="160" height="50" rx="10" fill="#1565C0" filter="url(#fc1)"/>
  <text x="110" y="91" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">要件定義・設計</text>
  <line x1="190" y1="85" x2="238" y2="85" stroke="#546E7A" stroke-width="2" marker-end="url(#ac1)"/>
  <!-- B: AIが実装 (AI) -->
  <rect x="245" y="60" width="150" height="50" rx="10" fill="#4CAF50" filter="url(#fc1)"/>
  <text x="320" y="91" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">AIが実装</text>
  <line x1="395" y1="85" x2="438" y2="85" stroke="#546E7A" stroke-width="2" marker-end="url(#ac1)"/>
  <!-- C: 人間がレビュー (Human) -->
  <rect x="445" y="60" width="170" height="50" rx="10" fill="#1565C0" filter="url(#fc1)"/>
  <text x="530" y="91" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">人間がレビュー</text>
  <!-- 承認 → D: マージ -->
  <line x1="530" y1="110" x2="530" y2="155" stroke="#546E7A" stroke-width="2" marker-end="url(#ac1)"/>
  <text x="555" y="138" text-anchor="start" fill="#2E7D32" font-family="sans-serif" font-size="12" font-weight="bold">承認</text>
  <rect x="460" y="165" width="140" height="50" rx="10" fill="#E65100" filter="url(#fc1)"/>
  <text x="530" y="196" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="15" font-weight="bold">マージ</text>
  <!-- 修正指示 loop (dashed) back to B -->
  <path d="M 445,95 Q 420,95 420,130 Q 420,160 320,160 Q 280,160 280,115" fill="none" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#ac1)"/>
  <text x="360" y="155" text-anchor="middle" fill="#E53935" font-family="sans-serif" font-size="12" font-weight="bold">修正指示</text>
  <!-- Legend -->
  <rect x="100" y="230" width="500" height="25" rx="5" fill="#F5F5F5" stroke="#E0E0E0"/>
  <rect x="120" y="235" width="14" height="14" rx="3" fill="#1565C0"/>
  <text x="140" y="247" fill="#37474F" font-family="sans-serif" font-size="11">人間タスク</text>
  <rect x="230" y="235" width="14" height="14" rx="3" fill="#4CAF50"/>
  <text x="250" y="247" fill="#37474F" font-family="sans-serif" font-size="11">AIタスク</text>
  <rect x="330" y="235" width="14" height="14" rx="3" fill="#E65100"/>
  <text x="350" y="247" fill="#37474F" font-family="sans-serif" font-size="11">完了</text>
  <line x1="420" y1="242" x2="450" y2="242" stroke="#E53935" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="460" y="247" fill="#37474F" font-family="sans-serif" font-size="11">修正ループ</text>
</svg>

<!--
基本的なフロー。従来との違いは実装フェーズがAIに移り、人間は設計とレビューに集中。
-->

---

# プロンプトエンジニアリングの基礎

- 明確な指示: 「リファクタリングして」→「X関数をY形式に変換」
- コンテキスト提供: 関連ファイル、型定義、既存パターン
- 段階的な要求: 大きなタスクを小さなステップに分割
- 制約の明示: 使用ライブラリ、命名規則、行数制限

<!--
良い出力は良いプロンプトから。曖昧な指示は曖昧な結果を生む。
-->

---

# プロンプト例: 良い vs 悪い

- ❌ 悪い: 「認証機能を追加して」
- ✅ 良い: 「JWTベースの認証ミドルウェアを追加。Express使用、既存のuserスキーマを利用、トークン有効期限24時間」
- ポイント: 技術スタック、既存コードとの関係、具体的な仕様

<!--
具体例で良いプロンプトの条件を示す。詳細度が成功の鍵。
-->

---

# CLAUDE.md / .cursorrules 活用

- プロジェクト固有のルールを記述
- 技術スタック、命名規則、アーキテクチャパターン
- 禁止事項（使わないライブラリ、避けるパターン）
- 自動的にコンテキストとして読み込まれる

```markdown
# CLAUDE.md
## Tech Stack
- Bun 1.3 + TypeScript
- Zod for validation
## Rules
- Use .js extension for imports
- Max 8 lines per code block in slides
```

<!--
プロジェクトルールの文書化。一度書けば繰り返し指示不要。
-->

---

# 実装方針 — AIとの分担戦略

- AIに任せる: ボイラープレート、型定義、テスト、リファクタリング
- 人間が握る: アーキテクチャ、ビジネスロジック、セキュリティ判断
- グレーゾーン: API設計、エラーハンドリング（協働）

<!--
明確な分担が効率化の鍵。グレーゾーンは対話的に進める。
-->

---

# コード例: 型定義とバリデーション

- AIの得意分野: 定型的なスキーマ定義
- 人間の役割: ビジネスルールの検証

```typescript
// AIに任せる: Zodスキーマ
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});
// 人間が判断: ドメインロジック
const canVote = (user) => user.age >= 18;
```

<!--
具体的なTS例で分担を可視化。型定義はAI、判断は人間。
-->

---

# 実践例: CRUD API生成

- プロンプト: 「Userリソース用のCRUD APIを作成。Express + Prisma使用。」
- AIが生成: ルート定義、バリデーション、エラーハンドリング
- 人間が確認: 認可ロジック、SQL injection対策、レート制限

<!--
実際のユースケース。AIが80%を生成、人間が安全性を確認。
-->

---

# テスト自動生成

- 単体テスト: 関数を渡せば境界値テストを自動生成
- 統合テスト: APIエンドポイントから正常系・異常系を生成
- カバレッジ: AIで80%達成、人間がエッジケースを追加

```typescript
// プロンプト例
"divide関数の単体テストをJestで生成。
ゼロ除算、負数、小数のケースを含めて"
```

<!--
テスト作成はAIの得意分野。人間はテストケースの網羅性を確認。
-->

---

# リファクタリング自動化

- コード重複の排除: AIが共通パターンを検出
- 型安全性の向上: any型の置き換え
- パフォーマンス改善: O(n²) → O(n log n)の提案
- 注意: ビジネスロジックを変えないことを確認

<!--
リファクタリングの自動化。ただし動作不変の保証は人間が責任を持つ。
-->

---

<!-- _class: lead -->
# レビュー戦略とコード品質


---

# AI生成コードのレビュー課題

- 量の増加: PR行数が2-3倍に
- 品質のばらつき: 優れたコードと問題コードが混在
- 従来のレビュー方法では破綻する
- 対策: リスクベースレビュー、自動化の活用

<!--
レビューコスト増大は現実の課題。全行読むのは非現実的。
-->

---

# リスクベースレビュー戦略

- 優先度HIGH: 認証・認可、SQL、外部API、決済処理
- 優先度MID: ビジネスロジック、エラーハンドリング
- 優先度LOW: 型定義、定型コード、テストコード
- ツール活用: 静的解析でLOWを自動化

<!--
リスクに応じた優先度付け。限られた時間を重要な部分に集中。
-->

---

# 効率的なレビューフロー

<svg viewBox="0 0 720 480" style="max-height:70vh;width:auto;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fr1"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
    <marker id="ar1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#546E7A"/>
    </marker>
  </defs>
  <!-- A: AI生成PR -->
  <rect x="275" y="10" width="170" height="45" rx="10" fill="#37474F" filter="url(#fr1)"/>
  <text x="360" y="38" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">AI生成PR</text>
  <line x1="360" y1="55" x2="360" y2="80" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <!-- B: 自動チェック (Decision) -->
  <polygon points="360,90 460,135 360,180 260,135" fill="#FF9800" filter="url(#fr1)"/>
  <text x="360" y="140" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">自動チェック</text>
  <!-- Fail → Z: 修正 -->
  <line x1="460" y1="135" x2="578" y2="135" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <text x="510" y="128" text-anchor="middle" fill="#E53935" font-family="sans-serif" font-size="12" font-weight="bold">Fail</text>
  <rect x="585" y="112" width="110" height="45" rx="8" fill="#E53935" filter="url(#fr1)"/>
  <text x="640" y="140" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">修正</text>
  <!-- Pass → C: リスク判定 -->
  <line x1="360" y1="180" x2="360" y2="210" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <text x="385" y="200" text-anchor="start" fill="#2E7D32" font-family="sans-serif" font-size="12" font-weight="bold">Pass</text>
  <!-- C: リスク判定 (Decision) -->
  <polygon points="360,220 460,265 360,310 260,265" fill="#FF9800" filter="url(#fr1)"/>
  <text x="360" y="270" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">リスク判定</text>
  <!-- HIGH → D: 人間が精査 -->
  <line x1="260" y1="265" x2="178" y2="265" stroke="#546E7A" stroke-width="2"/>
  <line x1="110" y1="265" x2="110" y2="345" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <line x1="178" y1="265" x2="110" y2="265" stroke="#546E7A" stroke-width="2"/>
  <text x="210" y="255" text-anchor="middle" fill="#D32F2F" font-family="sans-serif" font-size="12" font-weight="bold">HIGH</text>
  <rect x="30" y="350" width="160" height="45" rx="8" fill="#D32F2F" filter="url(#fr1)"/>
  <text x="110" y="378" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">人間が精査</text>
  <!-- MID → E: AIレビュー+人間確認 -->
  <line x1="360" y1="310" x2="360" y2="345" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <text x="385" y="332" text-anchor="start" fill="#F57C00" font-family="sans-serif" font-size="12" font-weight="bold">MID</text>
  <rect x="260" y="350" width="200" height="45" rx="8" fill="#F57C00" filter="url(#fr1)"/>
  <text x="360" y="378" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="12" font-weight="bold">AIレビュー+人間確認</text>
  <!-- LOW → F: AIレビューのみ -->
  <line x1="460" y1="265" x2="610" y2="265" stroke="#546E7A" stroke-width="2"/>
  <line x1="610" y1="265" x2="610" y2="345" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <text x="530" y="255" text-anchor="middle" fill="#2E7D32" font-family="sans-serif" font-size="12" font-weight="bold">LOW</text>
  <rect x="530" y="350" width="160" height="45" rx="8" fill="#2E7D32" filter="url(#fr1)"/>
  <text x="610" y="378" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">AIレビューのみ</text>
  <!-- All → G: 承認 -->
  <line x1="110" y1="395" x2="110" y2="425" stroke="#546E7A" stroke-width="2"/>
  <line x1="110" y1="425" x2="310" y2="425" stroke="#546E7A" stroke-width="2"/>
  <line x1="360" y1="395" x2="360" y2="425" stroke="#546E7A" stroke-width="2"/>
  <line x1="610" y1="395" x2="610" y2="425" stroke="#546E7A" stroke-width="2"/>
  <line x1="610" y1="425" x2="410" y2="425" stroke="#546E7A" stroke-width="2"/>
  <line x1="360" y1="425" x2="360" y2="440" stroke="#546E7A" stroke-width="2" marker-end="url(#ar1)"/>
  <rect x="290" y="448" width="140" height="45" rx="10" fill="#1565C0" filter="url(#fr1)"/>
  <text x="360" y="477" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="15" font-weight="bold">承認</text>
</svg>

<!--
自動化とリスク判定を組み合わせたフロー。効率と品質を両立。
-->

---

# 静的解析ツール連携

- ESLint / Biome: 構文、スタイル、基本的なバグ検出
- SonarQube: セキュリティ脆弱性、コード重複
- Semgrep: カスタムルールで組織固有のパターン検出
- TypeScript strict mode: 型安全性の強制

<!--
静的解析で機械的に検出可能な問題は自動化。人間は本質的な問題に集中。
-->

---

# AIレビュアーの活用

- Claude / GPT-4にレビューを依頼
- チェック項目: バグ、セキュリティ、可読性、パフォーマンス
- 限界: ビジネスロジックの妥当性は判断できない
- 活用法: 第一次レビューをAI、最終判断は人間

```markdown
# プロンプト例
"以下のPRをレビューして。
セキュリティ脆弱性、エッジケース、
パフォーマンス問題に注目"
```

<!--
AIでAI生成コードをレビュー。ただし最終判断は人間が必須。
-->

---

# レビューチェックリスト

- ✅ 入力バリデーション: すべての外部入力を検証
- ✅ 認証・認可: 権限チェックが正しく実装されているか
- ✅ エラーハンドリング: 想定外エラーの処理
- ✅ テストカバレッジ: 重要な分岐を網羅
- ✅ ドキュメント: 複雑なロジックにコメント

<!--
チェックリストで見落とし防止。チーム共通の基準を持つ。
-->

---

<!-- _class: lead -->
# 進化し続ける人材へ


---

# AI時代に求められるスキルセット

- 技術スキル: プログラミング基礎 + AI活用力
- 設計スキル: アーキテクチャ、API設計、トレードオフ判断
- コミュニケーション: AIへの指示、チームレビュー、ドキュメント
- 学習力: 新ツール・技術への適応速度

<!--
T字型人材。技術の深さと、AI活用・設計・コミュニケーションの広さ。
-->

---

# スキルの掛け算

- 技術力 × 設計力 = 優秀なエンジニア
- 技術力 × AI活用力 = 高生産性エンジニア
- 技術力 × 設計力 × AI活用力 = 唯一無二の人材
- どれか一つでは差別化できない時代

<!--
スキルは掛け算。複数のスキルを組み合わせることで指数関数的に価値が上がる。
-->

---

# 学習リソース

- 公式ドキュメント: 各AIツールのベストプラクティス
- コミュニティ: GitHub Discussions、Discord、Reddit
- 書籍: 「Prompt Engineering Guide」
- 実践: 毎日AIとペアプロ、ワークフローを記録・改善

<!--
学習方法。最も効果的なのは実践と振り返り。
-->

---

# 今日から始めるアクション

- 1つのAIツールを選んで1週間使い込む
- プロジェクトにCLAUDE.mdまたは.cursorrulesを作成
- リスクベースレビューのチェックリストを作る
- チームでAI活用のガイドラインを議論

<!--
具体的なアクション。小さく始めて段階的に拡大。
-->

---

# キャリアの展望

- 「AIに置き換えられる」エンジニア: 実装だけができる
- 「AIを活用できる」エンジニア: AI + 設計 + レビュー
- 「AIを作る」エンジニア: ツール開発、カスタマイズ
- 選択は自分次第。今日の行動が未来を決める

<!--
キャリアパス。どのレベルを目指すかは個人の選択。
-->

---

<!-- _class: lead -->
# まとめ

- AIは「脅威」ではなく「最強の協働パートナー」
- 設計力とレビュー力が、これからのコア価値
- 進化し続ける人材へ — 変化を味方につけよう

<!--
3つのキーテイクアウェイ。ポジティブなメッセージで締める。
-->

---

# 参考文献・リソース (1/2)

- **研究・データ:**
- [GitHub Copilot生産性研究 (2022)](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/)
- [GitHub Copilot: Pareto効率 (2024)](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise/)
- **AIツール公式:**
- [GitHub Copilot](https://github.com/features/copilot) | [Cursor](https://cursor.sh/) | [Claude Code](https://claude.ai/code)

<!--
スライド内で引用したデータの出典。生産性55%向上はGitHub 2022年研究より。
-->

---

# 参考文献・リソース (2/2)

- **プロンプトエンジニアリング:**
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- **セキュリティ・ベストプラクティス:**
- [OWASP AI Security Guide](https://owasp.org/www-project-ai-security-and-privacy-guide/)
- [Google Testing Blog](https://testing.googleblog.com/)

<!--
学習リソース。プロンプト技術とセキュリティ対策の公式ガイド。
-->
