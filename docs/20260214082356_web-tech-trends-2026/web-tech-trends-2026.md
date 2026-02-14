---
marp: true
theme: gaia
size: 16:9
paginate: true
---

# 2026年のWeb技術トレンド予測

- 開発者・エンジニアのための完全ガイド
- フロントエンド / ランタイム / WebAPI / AI統合開発


---

# 本日のアジェンダ

- **1. フロントエンドフレームワーク** - React 19, Vue 4, Svelte 5の最新動向
- **2. ランタイム・ビルドツール** - Bun, Deno, Vite 6のパフォーマンス革命
- **3. WebプラットフォームAPI** - View Transitions, Popoverなどネイティブ機能の充実
- **4. AI統合開発** - GitHub Copilot, Cursor, Claude Codeが変える開発フロー


---

# 2026年のWeb開発を取り巻く状況

- **エコシステムの成熟**: 主要ツールが安定版に到達、選択肢が明確化
- **パフォーマンス競争**: Rust製ツールの台頭で10倍以上の高速化
- **標準化の加速**: Webプラットフォーム標準APIがフレームワーク機能を代替
- **AI統合の日常化**: コード生成・レビューがワークフローの一部に
- **開発者体験の重視**: DX向上がツール選定の最優先事項


---

# このプレゼンテーションの使い方

- **自己ペースで学習**: 各セクション独立、興味ある部分から読める
- **実践的な情報**: コード例、ベンチマーク、選定基準を豊富に掲載
- **参考資料完備**: 公式ドキュメント、記事へのリンクで深掘り可能
- **チーム共有に最適**: 技術選定会議や勉強会の資料として活用


---

# フロントエンドフレームワークの潮流

- **React**: 依然として最大シェア、Server Componentsで新時代へ
- **Vue**: 安定と革新のバランス、Vapor Modeで性能向上
- **Svelte**: Runes導入でリアクティビティを再定義
- **新興勢力**: Solid.js（Signals）、Qwik（Resumability）が注目
- **選定の鍵**: チーム習熟度 > 最新トレンド


---

# React 19: 新機能概要

- **Server Components**: サーバーサイドレンダリングの新標準
- **Server Actions**: フォーム処理・データ更新の簡素化
- **React Compiler**: 自動メモ化でuseMemo/useCallback不要に
- **use() Hook**: Promise/Contextを統一的に扱う新API
- **Suspense強化**: データフェッチングとの完全統合

<!--
React 19は2025年Q4にRC版リリース、2026年Q1に正式版を予定
-->

---

# React 19: Server Components詳解

- サーバーで実行、バンドルサイズゼロ
- 直接DBアクセス可能、シークレット使用OK

```tsx
// Server Component（デフォルト）
export default async function ProductList() {
  const products = await db.products.findMany()
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

// Client Component（'use client'で明示）
'use client'
export function AddToCartButton({ productId }) {
  return <button onClick={() => addToCart(productId)}>カートに追加</button>
}
```


---

# React 19: React Compiler

- **自動最適化**: コンポーネントとHookを自動でメモ化
- **useMemo/useCallback削減**: 手動最適化がほぼ不要に
- **段階的導入**: ファイル・ディレクトリ単位で有効化可能

```javascript
// Before: 手動メモ化が必要
const val = useMemo(() => expensiveCalc(a, b), [a, b])

// After: Compilerが自動で最適化
const val = expensiveCalc(a, b)
```


---

# Vue 4への道のり

- **Vapor Mode**: コンパイル時最適化でVirtual DOM削減
- **パフォーマンス向上**: 初期レンダリング最大50%高速化
- **後方互換性**: Vue 3コードがそのまま動作
- **リリース時期**: 2026年Q2-Q3を予定


---

# Svelte 5とRunes

- **Runes**: 新しいリアクティビティプリミティブ（$state, $derived, $effect）
- **明示的リアクティビティ**: 変数の「どこが」リアクティブか一目瞭然
- **TypeScript統合強化**: 型推論が大幅改善
- **2024年12月正式リリース**: 既に本番利用可能


---

# Svelte 5: コード比較

- 可読性向上: リアクティブな値が明確
- デバッグ容易: 依存関係が追跡しやすい

```javascript
// Svelte 4: 暗黙的リアクティビティ
let count = 0
$: doubled = count * 2

// Svelte 5: Runes（明示的）
let count = $state(0)
let doubled = $derived(count * 2)
```


---

# Solid.js: Signals-first設計

- **細粒度リアクティビティ**: Virtual DOMなし、直接DOM更新
- **Signals API**: createSignal, createEffect, createMemoの3つが核
- **React風文法**: JSXでReact開発者が学習容易
- **超高速**: ベンチマークでReact/Vueを上回る性能

```javascript
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>
}
```


---

# Qwik: Resumability革命

- **Hydrationゼロ**: サーバーで実行状態をシリアライズ、クライアントで復元
- **遅延実行**: ユーザー操作まで一切JSを実行しない
- **初期表示最速**: TTI（Time to Interactive）が劇的に改善
- **Qwik City**: メタフレームワークで実用レベル


---

# フレームワーク性能比較

- **JS-Framework-Benchmark結果（2026年1月）**:
- - Solid.js: スコア 1.08（最速）
- - Svelte 5: スコア 1.12 / Vue 3: スコア 1.28 / React 18: スコア 1.52
- **バンドルサイズ**: Svelte 2.5KB / Solid 7KB / Vue 34KB / React 42KB


---

# フレームワーク選定フローチャート

- プロジェクト特性とチームスキルに応じた選定フロー

<svg viewBox="0 0 700 520" style="max-height:70vh;width:auto;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fs1"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
    <marker id="fa1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#546E7A"/>
    </marker>
  </defs>
  <!-- Start: 新規プロジェクト -->
  <rect x="250" y="15" width="200" height="48" rx="10" fill="#37474F" filter="url(#fs1)"/>
  <text x="350" y="45" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="16" font-weight="bold">新規プロジェクト</text>
  <!-- Arrow A→B -->
  <line x1="350" y1="63" x2="350" y2="105" stroke="#546E7A" stroke-width="2" marker-end="url(#fa1)"/>
  <!-- Decision: チームスキル -->
  <polygon points="350,110 470,170 350,230 230,170" fill="#FF9800" filter="url(#fs1)"/>
  <text x="350" y="175" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">チームスキル</text>
  <!-- Branch left: React経験 -->
  <line x1="230" y1="170" x2="145" y2="170" stroke="#546E7A" stroke-width="2"/>
  <line x1="145" y1="170" x2="145" y2="285" stroke="#546E7A" stroke-width="2" marker-end="url(#fa1)"/>
  <text x="175" y="158" text-anchor="middle" fill="#455A64" font-family="sans-serif" font-size="12">React経験</text>
  <!-- React 19 -->
  <rect x="60" y="290" width="170" height="48" rx="10" fill="#1565C0" filter="url(#fs1)"/>
  <text x="145" y="320" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="16" font-weight="bold">React 19</text>
  <!-- Branch center: Vue経験 -->
  <line x1="350" y1="230" x2="350" y2="285" stroke="#546E7A" stroke-width="2" marker-end="url(#fa1)"/>
  <text x="390" y="260" text-anchor="start" fill="#455A64" font-family="sans-serif" font-size="12">Vue経験</text>
  <!-- Vue 3/4 -->
  <rect x="265" y="290" width="170" height="48" rx="10" fill="#2E7D32" filter="url(#fs1)"/>
  <text x="350" y="320" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="16" font-weight="bold">Vue 3/4</text>
  <!-- Branch right: 新規学習OK -->
  <line x1="470" y1="170" x2="555" y2="170" stroke="#546E7A" stroke-width="2"/>
  <line x1="555" y1="170" x2="555" y2="270" stroke="#546E7A" stroke-width="2" marker-end="url(#fa1)"/>
  <text x="525" y="158" text-anchor="middle" fill="#455A64" font-family="sans-serif" font-size="12">新規学習OK</text>
  <!-- Decision: 規模 -->
  <polygon points="555,275 645,320 555,365 465,320" fill="#FF9800" filter="url(#fs1)"/>
  <text x="555" y="325" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">規模</text>
  <!-- 大規模 → React 19 (dashed) -->
  <line x1="465" y1="320" x2="230" y2="320" stroke="#546E7A" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#fa1)"/>
  <text x="345" y="350" text-anchor="middle" fill="#455A64" font-family="sans-serif" font-size="12">大規模</text>
  <!-- 中小規模 → Svelte/Solid -->
  <line x1="555" y1="365" x2="555" y2="405" stroke="#546E7A" stroke-width="2" marker-end="url(#fa1)"/>
  <text x="610" y="392" text-anchor="start" fill="#455A64" font-family="sans-serif" font-size="12">中小規模</text>
  <!-- Svelte/Solid -->
  <rect x="470" y="410" width="170" height="48" rx="10" fill="#7B1FA2" filter="url(#fs1)"/>
  <text x="555" y="440" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="16" font-weight="bold">Svelte / Solid</text>
  <!-- Legend -->
  <rect x="90" y="480" width="520" height="30" rx="5" fill="#F5F5F5" stroke="#E0E0E0"/>
  <rect x="110" y="487" width="14" height="14" rx="3" fill="#37474F"/>
  <text x="130" y="499" fill="#37474F" font-family="sans-serif" font-size="11">起点</text>
  <rect x="185" y="487" width="14" height="14" rx="3" fill="#FF9800"/>
  <text x="205" y="499" fill="#37474F" font-family="sans-serif" font-size="11">判定</text>
  <rect x="260" y="487" width="14" height="14" rx="3" fill="#1565C0"/>
  <text x="280" y="499" fill="#37474F" font-family="sans-serif" font-size="11">React</text>
  <rect x="340" y="487" width="14" height="14" rx="3" fill="#2E7D32"/>
  <text x="360" y="499" fill="#37474F" font-family="sans-serif" font-size="11">Vue</text>
  <rect x="410" y="487" width="14" height="14" rx="3" fill="#7B1FA2"/>
  <text x="430" y="499" fill="#37474F" font-family="sans-serif" font-size="11">Svelte/Solid</text>
</svg>


---

# メタフレームワークの進化

- **Next.js 15**: React 19対応、Turbopack安定化
- **Nuxt 4**: Vue 3.5統合、Nitro 2エンジン
- **SvelteKit 2**: Vite 5ベース、型安全ルーティング


---

# Islands Architecture

- **コンセプト**: ページ全体ではなく「島」だけをハイドレーション
- **Astro**: マルチフレームワーク対応
- **JS削減効果**: 通常のSPAより90%以上削減も可能


---

# フロントエンドFW: まとめ

- **React 19**: エコシステム最強、Server Componentsで新時代
- **Vue 3/4**: 安定性と革新のバランス
- **Svelte 5**: 学習曲線緩やか、中小規模に最適
- **選定の鉄則**: チーム > トレンド > 性能


---

# ランタイム戦争の現在地

- **Node.js**: 依然デファクトスタンダード、安定進化
- **Bun**: 2024年9月に1.0到達、全方位高速化
- **Deno**: 2.0でNode互換完成、セキュリティファースト
- **2026年の状況**: 3つが共存、プロジェクト特性で使い分け


---

# Bun 2.x: 全方位高速化

- **インストール速度**: npm比20-30倍高速
- **起動速度**: Node.js比4倍高速（Zig + JavaScriptCore）
- **TypeScript実行**: トランスパイル不要で直接実行
- **組み込みツール**: テスト・バンドラ・トランスパイラ内蔵


---

# Bun: 組み込みツール群

- 外部ツール不要、セットアップ簡単
- 統一されたDX

```bash
# テストランナー（Jest互換）
bun test

# バンドラー
bun build ./index.ts --outdir ./dist

# TypeScript実行
bun run index.ts

# パッケージインストール
bun install
```


---

# Deno 2.x: Node互換の完成

- **Node.js互換**: package.json、node_modules、npm完全サポート
- **セキュリティモデル**: デフォルトでネットワーク・ファイルアクセス禁止
- **TypeScript標準**: 追加設定なしでTS実行


---

# Node.js 22-24: 安定進化

- **Node.js 22 LTS**: V8 12.4、性能向上
- **Node.js 24**: ESM完全デフォルト化予定
- **エコシステム**: 最大最強、ほぼ全npmパッケージ対応


---

# ランタイム性能比較

- **起動時間**: Bun 8ms / Deno 18ms / Node.js 35ms
- **インストール速度**: Bun 1.2s / pnpm 3.5s / npm 24s
- **HTTP throughput**: Bun 145k / Deno 98k / Node.js 82k req/sec


---

# Vite 6: 次世代ビルドツール

- **Rollup 4統合**: プラグインエコシステム強化
- **Environment API**: SSR・MPA対応の抽象化
- **高速HMR**: 大規模プロジェクトでも即座に反映
- **2025年12月リリース**: 既に主流ツールの地位確立


---

# Turbopack: Vercelの秘密兵器

- **Rustベース**: webpackより10倍高速
- **増分コンピューティング**: 変更差分のみ再計算
- **Next.js 15統合**: `next dev --turbo`で有効化


---

# ビルドツール速度比較

- **開発ビルド（1000モジュール）**:
- Turbopack 1.2s / Vite 2.8s / esbuild 3.1s / webpack 12.5s
- **本番ビルド**:
- esbuild 3.8s / Vite 8.2s / webpack 35s


---

# パッケージマネージャー比較

- **npm**: 安定、広く使われる、やや遅い
- **pnpm**: ハードリンクで高速・省スペース、モノレポ対応
- **bun**: 最速、ただしエコシステム発展中
- **2026年推奨**: pnpm（バランス良）、Bun（速度重視）


---

# ランタイム・ビルド: まとめ

- **Node.js**: 安定性・エコシステム重視なら鉄板
- **Bun**: 開発速度・DX重視の新規プロジェクトで挑戦
- **Vite**: フレームワーク問わず開発ビルドツールのデファクト


---

# WebプラットフォームAPIの充実

- **トレンド**: ブラウザネイティブ機能がフレームワーク機能を代替
- **メリット**: バンドルサイズ削減、標準化、長期安定性
- **2026年の注目API**: View Transitions、Popover、Speculation Rules


---

# View Transitions API

- **機能**: ページ遷移時に滑らかなアニメーション
- **対応**: Chrome/Edge 111+、Safari 18+（2026年全ブラウザ対応）
- **SPA風体験**: MPAでもスムーズ遷移


---

# View Transitions: 実装例

- JavaScriptは最小限
- CSSでアニメーション制御

```javascript
// ページ遷移をアニメーション化
document.startViewTransition(() => {
  document.body.innerHTML = newPageHTML
})

// CSS（カスタムアニメーション）
@keyframes fade-in { from { opacity: 0 } }
::view-transition-new(root) {
  animation: 300ms ease-out fade-in
}
```


---

# Popover API

- **機能**: ネイティブのポップオーバー・ダイアログ
- **対応**: Chrome/Edge 114+、Safari 17+
- **メリット**: z-index管理不要、アクセシビリティ対応自動


---

# Popover API: 実装パターン

- JavaScript不要でアクセシビリティ対応
- ESCキーで自動的に閉じる

```html
<button popovertarget="menu">開く</button>

<div id="menu" popover>
  <p>コンテンツ</p>
  <button popovertarget="menu" popovertargetaction="hide">閉じる</button>
</div>
```


---

# Speculation Rules API

- **機能**: 投機的なプリレンダリング・プリフェッチ
- **対応**: Chrome/Edge 121+
- **高速化**: 次ページを事前レンダリング、遷移が瞬時に


---

# Container Queries

- **機能**: 親要素サイズに応じたレスポンシブデザイン
- **対応**: 全ブラウザ対応
- **革新性**: メディアクエリ→コンテナクエリ


---

# :has()セレクタの威力

- **機能**: 「子要素を持つ親」を選択（親セレクタ）
- **対応**: 全ブラウザ対応
- **革新性**: CSSだけで親要素をスタイリング可能

```css
/* エラーを含むフォームを赤枠に */
form:has(.error) { border: 2px solid red; }

/* 画像を含むカードを特別スタイル */
.card:has(img) { grid-column: span 2; }
```


---

# WebプラットフォームAPI: まとめ

- **View Transitions**: ページ遷移UX向上
- **Popover**: アクセシビリティ対応が楽に
- **Container Queries**: 真のコンポーネント指向CSS
- **戦略**: 新機能を積極採用→バンドルサイズ削減


---

# AI統合開発の現状

- **2026年の当たり前**: コード補完・生成・レビューにAI利用
- **主要ツール**: GitHub Copilot、Cursor、Claude Code
- **生産性向上**: 調査では20-40%の効率化報告
- **役割変化**: コード書き→設計・レビュー・テスト重視へ


---

# GitHub Copilot: 進化の軌跡

- **2021年**: コード補完として登場
- **2023年**: Copilot Chat（対話型）、CLI
- **2024-25年**: Workspace、PR要約、セキュリティスキャン
- **2026年**: エージェント機能強化
- **普及率**: Fortune 500の50%以上が導入


---

# Cursor: AI-firstエディタ

- **Composer Mode**: 複数ファイルを一括生成・編集
- **Agent Mode**: タスクを指示すると自律的に実装
- **Codebase理解**: プロジェクト全体をインデックス化
- **VSCode互換**: 拡張機能・設定をそのまま移行可能


---

# Claude Code: CLIエージェント

- **CLI統合**: ターミナルから自然言語で操作
- **ファイル操作**: 読み取り、編集、作成を自動化
- **Git連携**: コミット、PR作成を支援

```bash
# 自然言語でタスク指示
claude "すべてのTODOコメントを抽出してissue化"

# 複数ファイル横断
claude "認証ロジックをミドルウェアに分離"
```


---

# AI駆動開発フロー

- 人間とAIの役割分担を明確化した開発プロセス

<svg viewBox="0 0 750 330" style="max-height:70vh;width:auto;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="fs2"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
    <marker id="fa2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#546E7A"/>
    </marker>
  </defs>
  <!-- Row 1: 要件定義 → AI設計案 → 人間レビュー → AI実装 -->
  <rect x="20" y="25" width="130" height="45" rx="8" fill="#1565C0" filter="url(#fs2)"/>
  <text x="85" y="53" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">要件定義</text>
  <line x1="150" y1="47" x2="188" y2="47" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <rect x="195" y="25" width="130" height="45" rx="8" fill="#4CAF50" filter="url(#fs2)"/>
  <text x="260" y="53" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">AI設計案</text>
  <line x1="325" y1="47" x2="363" y2="47" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <rect x="370" y="25" width="150" height="45" rx="8" fill="#1565C0" filter="url(#fs2)"/>
  <text x="445" y="53" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">人間レビュー</text>
  <line x1="520" y1="47" x2="568" y2="47" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <rect x="575" y="25" width="120" height="45" rx="8" fill="#4CAF50" filter="url(#fs2)"/>
  <text x="635" y="53" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">AI実装</text>
  <!-- Arrow down -->
  <line x1="635" y1="70" x2="635" y2="140" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <!-- Row 2: AIテスト → 人間テスト → 合格? → マージ -->
  <rect x="575" y="150" width="120" height="45" rx="8" fill="#4CAF50" filter="url(#fs2)"/>
  <text x="635" y="178" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">AIテスト</text>
  <line x1="575" y1="172" x2="527" y2="172" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <rect x="370" y="150" width="150" height="45" rx="8" fill="#1565C0" filter="url(#fs2)"/>
  <text x="445" y="178" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">人間テスト</text>
  <line x1="370" y1="172" x2="312" y2="172" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <!-- Decision: 合格? -->
  <polygon points="250,172 310,142 250,112 190,142" fill="#FF9800" filter="url(#fs2)"/>
  <text x="250" y="147" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="13" font-weight="bold">合格?</text>
  <!-- Yes → マージ -->
  <line x1="190" y1="142" x2="148" y2="142" stroke="#546E7A" stroke-width="2" marker-end="url(#fa2)"/>
  <text x="170" y="133" text-anchor="middle" fill="#2E7D32" font-family="sans-serif" font-size="12" font-weight="bold">Yes</text>
  <rect x="20" y="120" width="120" height="45" rx="8" fill="#E65100" filter="url(#fs2)"/>
  <text x="80" y="148" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold">マージ</text>
  <!-- No → AI実装 (dashed loop) -->
  <line x1="250" y1="112" x2="250" y2="15" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3"/>
  <line x1="250" y1="15" x2="635" y2="15" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3"/>
  <line x1="635" y1="15" x2="635" y2="20" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#fa2)"/>
  <text x="440" y="10" text-anchor="middle" fill="#E53935" font-family="sans-serif" font-size="12" font-weight="bold">No（修正）</text>
  <!-- Legend -->
  <rect x="100" y="220" width="550" height="28" rx="5" fill="#F5F5F5" stroke="#E0E0E0"/>
  <rect x="120" y="226" width="14" height="14" rx="3" fill="#1565C0"/>
  <text x="140" y="238" fill="#37474F" font-family="sans-serif" font-size="11">人間タスク</text>
  <rect x="230" y="226" width="14" height="14" rx="3" fill="#4CAF50"/>
  <text x="250" y="238" fill="#37474F" font-family="sans-serif" font-size="11">AIタスク</text>
  <rect x="330" y="226" width="14" height="14" rx="3" fill="#FF9800"/>
  <text x="350" y="238" fill="#37474F" font-family="sans-serif" font-size="11">判定</text>
  <rect x="410" y="226" width="14" height="14" rx="3" fill="#E65100"/>
  <text x="430" y="238" fill="#37474F" font-family="sans-serif" font-size="11">完了</text>
  <line x1="490" y1="233" x2="520" y2="233" stroke="#E53935" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="530" y="238" fill="#37474F" font-family="sans-serif" font-size="11">修正ループ</text>
</svg>


---

# AI活用の生産性データ

- **GitHub調査（2024）**: Copilot利用で実装速度55%向上
- **実測例**:
- - ボイラープレートコード: 80%時間削減
- - テストコード作成: 60%削減
- **注意**: 複雑なアーキテクチャ設計では効果限定的


---

# AIペアプログラミングのコツ

- **明確な指示**: 曖昧な要求→期待外れ。具体的に型・仕様を指定
- **段階的生成**: 一度に全部→複雑すぎてミス。小さく作って積み上げ
- **コンテキスト提供**: 関連ファイル・型定義をAIに見せる
- **レビュー必須**: AIコードを無批判に受け入れない


---

# AIコード生成のリスク

- **セキュリティ脆弱性**: SQL injection、XSSなどを見逃す可能性
- **ライセンス問題**: 学習データ由来のコード
- **品質ばらつき**: テストなしで本番投入は危険
- **対策**: 自動テスト、セキュリティスキャン、人間レビューの徹底


---

# AI時代のコードレビュー

- **人間がチェックすべき項目**:
- - アーキテクチャ設計の妥当性
- - セキュリティ脆弱性（OWASP Top 10）
- - エッジケース・エラーハンドリング
- **AIに任せられる**: 文法、スタイル、単純なバグ検出


---

# AI統合開発: まとめ

- **GitHub Copilot**: 最も成熟、大企業に安心
- **Cursor**: スピード重視、スタートアップ向け
- **Claude Code**: CLI特化、自動化好きに最適
- **開発者の役割**: 設計・判断・レビューにシフト


---

# 2026 Web技術トレンド総括

- **フロントエンドFW**: React 19、Vue 4、Svelte 5が主流
- **ランタイム**: Bunの高速化が魅力、Node.js安定性も重要
- **WebAPI**: ネイティブ機能充実でフレームワーク依存度低下
- **AI開発**: 補完・生成が当たり前に
- **全体傾向**: パフォーマンス・DX・標準化が三大テーマ


---

# あなたの学習ロードマップ

- **Phase 1（3ヶ月）**: 現在のフレームワークを深掘り
- **Phase 2（3ヶ月）**: Vite/Bunなどビルドツール刷新
- **Phase 3（3ヶ月）**: WebプラットフォームAPI試用
- **Phase 4（3ヶ月）**: AI開発ツール導入
- **継続**: 週次でトレンドチェック


---

# 参考資料・リンク集

- **公式ドキュメント**:
- - [React 19](https://react.dev) / [Vue 3](https://vuejs.org)
- **ベンチマーク**: [JS Framework Benchmark](https://krausest.github.io/js-framework-benchmark)
- **AI開発**: [GitHub Copilot](https://github.com/features/copilot) / [Cursor](https://cursor.sh)


---

# Thank You & 次のアクション

- **今日から始められること**:
- 1. 現プロジェクトのビルド時間を計測
- 2. AI開発ツールのトライアルを試す
- 3. View Transitions APIを小規模プロジェクトで実験
- 4. チームで技術選定会議を開催
- **質問・フィードバック歓迎**: Web技術は常に進化、継続学習が鍵

