---
marp: true
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
  /* Mermaid図解をスライドに収める */
  section .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 70vh;
    max-width: 100%;
  }
  
  section .mermaid svg {
    max-width: 100%;
    max-height: 70vh;
    height: auto;
    width: auto;
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


---

# AIツールの進化史（図解）

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0;letter-spacing:0">
  <!-- Background -->
  <rect width="800" height="400" fill="#f8f9fa" rx="12"/>

  <!-- Timeline line -->
  <line x1="80" y1="200" x2="740" y2="200" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8,4"/>

  <!-- 2021 - Copilot -->
  <circle cx="140" cy="200" r="28" fill="#3b82f6" opacity="0.9"/>
  <text x="140" y="206" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">2021</text>
  <rect x="85" y="100" width="110" height="60" rx="8" fill="#3b82f6" opacity="0.15"/>
  <text x="140" y="122" text-anchor="middle" fill="#1e40af" font-size="12" font-weight="bold" font-family="sans-serif">GitHub Copilot</text>
  <text x="140" y="140" text-anchor="middle" fill="#475569" font-size="10" font-family="sans-serif">コード補完ベース</text>
  <line x1="140" y1="160" x2="140" y2="172" stroke="#3b82f6" stroke-width="2"/>

  <!-- Arrow from 2021 to 2023 -->
  <line x1="168" y1="200" x2="282" y2="200" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="282,195 292,200 282,205" fill="#94a3b8"/>

  <!-- 2023 - ChatGPT Integration -->
  <circle cx="340" cy="200" r="28" fill="#8b5cf6" opacity="0.9"/>
  <text x="340" y="206" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">2023</text>
  <rect x="275" y="240" width="130" height="60" rx="8" fill="#8b5cf6" opacity="0.15"/>
  <text x="340" y="262" text-anchor="middle" fill="#5b21b6" font-size="12" font-weight="bold" font-family="sans-serif">ChatGPT統合</text>
  <text x="340" y="280" text-anchor="middle" fill="#475569" font-size="10" font-family="sans-serif">会話型プログラミング</text>
  <line x1="340" y1="228" x2="340" y2="240" stroke="#8b5cf6" stroke-width="2"/>

  <!-- Arrow from 2023 to 2024 -->
  <line x1="368" y1="200" x2="482" y2="200" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="482,195 492,200 482,205" fill="#94a3b8"/>

  <!-- 2024 - Claude Code / Cursor -->
  <circle cx="530" cy="200" r="28" fill="#f59e0b" opacity="0.9"/>
  <text x="530" y="206" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">2024</text>
  <rect x="457" y="100" width="146" height="60" rx="8" fill="#f59e0b" opacity="0.15"/>
  <text x="530" y="122" text-anchor="middle" fill="#92400e" font-size="12" font-weight="bold" font-family="sans-serif">Claude Code / Cursor</text>
  <text x="530" y="140" text-anchor="middle" fill="#475569" font-size="10" font-family="sans-serif">マルチファイル編集</text>
  <line x1="530" y1="160" x2="530" y2="172" stroke="#f59e0b" stroke-width="2"/>

  <!-- Arrow from 2024 to 2025 -->
  <line x1="558" y1="200" x2="662" y2="200" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="662,195 672,200 662,205" fill="#94a3b8"/>

  <!-- 2025 - Agent Type -->
  <circle cx="710" cy="200" r="32" fill="#ef4444" opacity="0.9" stroke="#ef4444" stroke-width="2"/>
  <text x="710" y="206" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">2025</text>
  <rect x="640" y="240" width="140" height="60" rx="8" fill="#ef4444" opacity="0.15"/>
  <text x="710" y="262" text-anchor="middle" fill="#991b1b" font-size="12" font-weight="bold" font-family="sans-serif">エージェント型AI</text>
  <text x="710" y="280" text-anchor="middle" fill="#475569" font-size="10" font-family="sans-serif">自律的タスク実行</text>
  <line x1="710" y1="232" x2="710" y2="240" stroke="#ef4444" stroke-width="2"/>

  <!-- Capability scale label -->
  <text x="80" y="360" fill="#94a3b8" font-size="10" font-family="sans-serif">補完</text>
  <text x="740" y="360" text-anchor="end" fill="#94a3b8" font-size="10" font-family="sans-serif">自律</text>
  <line x1="100" y1="355" x2="720" y2="355" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Gradient bar for capability (no url(#id) - use individual colored segments) -->
  <rect x="100" y="350" width="155" height="6" rx="3" fill="#3b82f6" opacity="0.4"/>
  <rect x="255" y="350" width="155" height="6" fill="#7c6ecc" opacity="0.4"/>
  <rect x="410" y="350" width="155" height="6" fill="#c27c28" opacity="0.4"/>
  <rect x="565" y="350" width="155" height="6" rx="3" fill="#ef4444" opacity="0.4"/>
</svg>

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


---

# AI協働の開発フロー（図解）

<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="800" height="360" fill="#f8f9fa" rx="12"/>

  <!-- Step 1: 要件定義・設計 -->
  <rect x="30" y="120" width="150" height="70" rx="10" fill="#3b82f6" opacity="0.9"/>
  <text x="105" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">要件定義・設計</text>
  <text x="105" y="170" text-anchor="middle" fill="#dbeafe" font-size="10" font-family="sans-serif">人間が主導</text>
  <!-- Human icon -->
  <circle cx="105" cy="95" r="14" fill="#3b82f6" opacity="0.2"/>
  <text x="105" y="100" text-anchor="middle" fill="#1e40af" font-size="16" font-family="sans-serif">👤</text>

  <!-- Arrow 1→2 -->
  <line x1="180" y1="155" x2="225" y2="155" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="225,150 235,155 225,160" fill="#94a3b8"/>

  <!-- Step 2: AIが実装 -->
  <rect x="235" y="120" width="150" height="70" rx="10" fill="#8b5cf6" opacity="0.9"/>
  <text x="310" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">AIが実装</text>
  <text x="310" y="170" text-anchor="middle" fill="#ede9fe" font-size="10" font-family="sans-serif">コード生成・編集</text>
  <!-- AI icon -->
  <circle cx="310" cy="95" r="14" fill="#8b5cf6" opacity="0.2"/>
  <text x="310" y="100" text-anchor="middle" fill="#5b21b6" font-size="16" font-family="sans-serif">🤖</text>

  <!-- Arrow 2→3 -->
  <line x1="385" y1="155" x2="430" y2="155" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="430,150 440,155 430,160" fill="#94a3b8"/>

  <!-- Step 3: 人間がレビュー -->
  <rect x="440" y="120" width="150" height="70" rx="10" fill="#f59e0b" opacity="0.9"/>
  <text x="515" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">人間がレビュー</text>
  <text x="515" y="170" text-anchor="middle" fill="#fef3c7" font-size="10" font-family="sans-serif">品質・設計を確認</text>
  <!-- Human icon -->
  <circle cx="515" cy="95" r="14" fill="#f59e0b" opacity="0.2"/>
  <text x="515" y="100" text-anchor="middle" fill="#92400e" font-size="16" font-family="sans-serif">👤</text>

  <!-- Branch: 修正指示 (loop back) -->
  <line x1="515" y1="190" x2="515" y2="260" stroke="#ef4444" stroke-width="2"/>
  <line x1="515" y1="260" x2="310" y2="260" stroke="#ef4444" stroke-width="2"/>
  <line x1="310" y1="260" x2="310" y2="195" stroke="#ef4444" stroke-width="2"/>
  <polygon points="305,195 310,185 315,195" fill="#ef4444"/>
  <rect x="370" y="245" width="80" height="22" rx="4" fill="#fef2f2"/>
  <text x="410" y="260" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold" font-family="sans-serif">修正指示</text>

  <!-- Branch: 承認 → マージ -->
  <line x1="590" y1="155" x2="635" y2="155" stroke="#22c55e" stroke-width="2"/>
  <polygon points="635,150 645,155 635,160" fill="#22c55e"/>
  <rect x="392" y="130" width="46" height="18" rx="4" fill="white" opacity="0.3"/>
  <text x="567" y="143" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="bold" font-family="sans-serif">承認</text>

  <!-- Step 4: マージ -->
  <rect x="645" y="120" width="130" height="70" rx="10" fill="#22c55e" opacity="0.9"/>
  <text x="710" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">マージ</text>
  <text x="710" y="170" text-anchor="middle" fill="#dcfce7" font-size="10" font-family="sans-serif">本番反映</text>
  <!-- Check icon -->
  <circle cx="710" cy="95" r="14" fill="#22c55e" opacity="0.2"/>
  <text x="710" y="100" text-anchor="middle" fill="#166534" font-size="16" font-family="sans-serif">✅</text>

  <!-- Legend -->
  <rect x="30" y="310" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.6"/>
  <text x="48" y="321" fill="#475569" font-size="10" font-family="sans-serif">人間の作業</text>
  <rect x="130" y="310" width="12" height="12" rx="2" fill="#8b5cf6" opacity="0.6"/>
  <text x="148" y="321" fill="#475569" font-size="10" font-family="sans-serif">AIの作業</text>
  <rect x="230" y="310" width="12" height="12" rx="2" fill="#ef4444" opacity="0.6"/>
  <text x="248" y="321" fill="#475569" font-size="10" font-family="sans-serif">フィードバックループ</text>
</svg>

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


---

# CLAUDE.md / .cursorrules 活用（コード例）

```markdown
# CLAUDE.md
## Tech Stack
- Bun 1.3 + TypeScript
- Zod for validation
## Rules
- Use .js extension for imports
- Max 8 lines per code block in slides
```


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


---

# コード例: 型定義とバリデーション（コード例）

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


---

# テスト自動生成（コード例）

```typescript
// プロンプト例
"divide関数の単体テストをJestで生成。
ゼロ除算、負数、小数のケースを含めて"
```


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

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <!-- Background -->
  <rect width="800" height="450" fill="#f8f9fa" rx="12"/>

  <!-- Step 1: AI生成PR -->
  <rect x="310" y="20" width="180" height="50" rx="10" fill="#3b82f6" opacity="0.9"/>
  <text x="400" y="50" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">AI生成PR</text>

  <!-- Arrow down -->
  <line x1="400" y1="70" x2="400" y2="95" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="395,95 400,105 405,95" fill="#94a3b8"/>

  <!-- Step 2: 自動チェック (diamond) -->
  <polygon points="400,105 480,145 400,185 320,145" fill="#f59e0b" opacity="0.9"/>
  <text x="400" y="142" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">自動チェック</text>
  <text x="400" y="155" text-anchor="middle" fill="#fef3c7" font-size="9" font-family="sans-serif">lint / test / type</text>

  <!-- Fail branch (left) -->
  <line x1="320" y1="145" x2="200" y2="145" stroke="#ef4444" stroke-width="2"/>
  <polygon points="200,140 190,145 200,150" fill="#ef4444"/>
  <text x="260" y="138" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold" font-family="sans-serif">Fail</text>
  <rect x="100" y="120" width="90" height="50" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="145" y="148" text-anchor="middle" fill="#dc2626" font-size="12" font-weight="bold" font-family="sans-serif">修正</text>

  <!-- Pass arrow down -->
  <line x1="400" y1="185" x2="400" y2="210" stroke="#22c55e" stroke-width="2"/>
  <polygon points="395,210 400,220 405,210" fill="#22c55e"/>
  <text x="415" y="200" fill="#16a34a" font-size="10" font-weight="bold" font-family="sans-serif">Pass</text>

  <!-- Step 3: リスク判定 (diamond) -->
  <polygon points="400,220 480,260 400,300 320,260" fill="#8b5cf6" opacity="0.9"/>
  <text x="400" y="258" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">リスク判定</text>

  <!-- HIGH branch (left) -->
  <line x1="320" y1="260" x2="160" y2="260" stroke="#ef4444" stroke-width="2"/>
  <polygon points="160,255 150,260 160,265" fill="#ef4444"/>
  <text x="240" y="253" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold" font-family="sans-serif">HIGH</text>
  <rect x="30" y="235" width="120" height="50" rx="8" fill="#ef4444" opacity="0.12" stroke="#ef4444" stroke-width="1.5"/>
  <text x="90" y="257" text-anchor="middle" fill="#dc2626" font-size="11" font-weight="bold" font-family="sans-serif">人間が精査</text>
  <text x="90" y="273" text-anchor="middle" fill="#6b7280" font-size="9" font-family="sans-serif">設計・セキュリティ</text>

  <!-- MID branch (center-down) -->
  <line x1="400" y1="300" x2="400" y2="325" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="395,325 400,335 405,325" fill="#f59e0b"/>
  <text x="430" y="315" fill="#d97706" font-size="10" font-weight="bold" font-family="sans-serif">MID</text>
  <rect x="310" y="335" width="180" height="50" rx="8" fill="#f59e0b" opacity="0.12" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="400" y="358" text-anchor="middle" fill="#b45309" font-size="11" font-weight="bold" font-family="sans-serif">AIレビュー+人間確認</text>
  <text x="400" y="374" text-anchor="middle" fill="#6b7280" font-size="9" font-family="sans-serif">AIが要約→人間が最終判断</text>

  <!-- LOW branch (right) -->
  <line x1="480" y1="260" x2="620" y2="260" stroke="#22c55e" stroke-width="2"/>
  <polygon points="620,255 630,260 620,265" fill="#22c55e"/>
  <text x="550" y="253" text-anchor="middle" fill="#16a34a" font-size="10" font-weight="bold" font-family="sans-serif">LOW</text>
  <rect x="630" y="235" width="140" height="50" rx="8" fill="#22c55e" opacity="0.12" stroke="#22c55e" stroke-width="1.5"/>
  <text x="700" y="257" text-anchor="middle" fill="#166534" font-size="11" font-weight="bold" font-family="sans-serif">AIレビューのみ</text>
  <text x="700" y="273" text-anchor="middle" fill="#6b7280" font-size="9" font-family="sans-serif">定型・低リスク変更</text>

  <!-- All converge to 承認 -->
  <!-- HIGH → 承認 -->
  <line x1="90" y1="285" x2="90" y2="415" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="90" y1="415" x2="340" y2="415" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- MID → 承認 -->
  <line x1="400" y1="385" x2="400" y2="400" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- LOW → 承認 -->
  <line x1="700" y1="285" x2="700" y2="415" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="700" y1="415" x2="460" y2="415" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- 承認 box -->
  <rect x="340" y="400" width="120" height="36" rx="8" fill="#22c55e" opacity="0.9"/>
  <text x="400" y="423" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">承認 ✓</text>
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


---

# AIレビュアーの活用（コード例）

```markdown
# プロンプト例
"以下のPRをレビューして。
セキュリティ脆弱性、エッジケース、
パフォーマンス問題に注目"
```


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
