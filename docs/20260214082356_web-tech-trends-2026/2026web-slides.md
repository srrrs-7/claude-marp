---
marp: true
theme: gaia
size: 16:9
paginate: true
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
  
---

# 2026年のWeb技術トレンド予測

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="50" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">2026 Web技術 4大トレンド</text>
<circle cx="400" cy="210" r="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Web</text>
<text x="400" y="223" text-anchor="middle" fill="#ffffff" font-size="11">2026</text>
<rect x="60" y="80" width="160" height="50" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="140" y="101" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">FW進化</text>
<text x="140" y="119" text-anchor="middle" fill="#ffffff" font-size="11">React/Vue/Svelte</text>
<line x1="220" y1="105" x2="345" y2="165" stroke="#2196f3" stroke-width="1.5"/>
<rect x="580" y="80" width="160" height="50" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="660" y="101" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">ランタイム</text>
<text x="660" y="119" text-anchor="middle" fill="#ffffff" font-size="11">Bun/Deno/Node</text>
<line x1="580" y1="105" x2="455" y2="165" stroke="#4caf50" stroke-width="1.5"/>
<rect x="60" y="290" width="160" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="140" y="311" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Web API</text>
<text x="140" y="329" text-anchor="middle" fill="#ffffff" font-size="11">標準化加速</text>
<line x1="220" y1="315" x2="345" y2="255" stroke="#e91e63" stroke-width="1.5"/>
<rect x="580" y="290" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="660" y="311" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">AI統合</text>
<text x="660" y="329" text-anchor="middle" fill="#ffffff" font-size="11">Copilot/Cursor</text>
<line x1="580" y1="315" x2="455" y2="255" stroke="#f9a825" stroke-width="1.5"/>
</svg>
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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="40" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">2026年 Web開発の5大変化</text>

<rect x="100" y="80" width="600" height="36" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/>
<rect x="100" y="80" width="510" height="36" rx="6" fill="#2196f3" opacity="0.25"/>
<text x="120" y="104" fill="#2196f3" font-size="14" font-weight="bold">エコシステム成熟</text>

<rect x="100" y="140" width="600" height="36" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
<rect x="100" y="140" width="501" height="36" rx="6" fill="#4caf50" opacity="0.25"/>
<text x="120" y="164" fill="#4caf50" font-size="14" font-weight="bold">パフォーマンス競争</text>

<rect x="100" y="200" width="600" height="36" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
<rect x="100" y="200" width="395" height="36" rx="6" fill="#e91e63" opacity="0.25"/>
<text x="120" y="224" fill="#e91e63" font-size="14" font-weight="bold">標準化加速</text>

<rect x="100" y="260" width="600" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<rect x="100" y="260" width="497" height="36" rx="6" fill="#f9a825" opacity="0.25"/>
<text x="120" y="284" fill="#f9a825" font-size="14" font-weight="bold">AI統合の日常化</text>

<rect x="100" y="320" width="600" height="36" rx="6" fill="#16213e" stroke="#ab47bc" stroke-width="1.5"/>
<rect x="100" y="320" width="428" height="36" rx="6" fill="#ab47bc" opacity="0.25"/>
<text x="120" y="344" fill="#ab47bc" font-size="14" font-weight="bold">DX重視</text>

</svg>
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

- <svg viewBox="0 0 800 390" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="390" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">フレームワーク人気比較 2026</text>

<text x="130" y="92" text-anchor="end" fill="#ffffff" font-size="14">React</text>
<rect x="140" y="70" width="340" height="36" rx="4" fill="#2196f3" opacity="0.8"/>
<text x="488" y="92" fill="#2196f3" font-size="13">68%</text>

<text x="130" y="150" text-anchor="end" fill="#ffffff" font-size="14">Vue</text>
<rect x="140" y="128" width="210" height="36" rx="4" fill="#4caf50" opacity="0.8"/>
<text x="358" y="150" fill="#4caf50" font-size="13">42%</text>

<text x="130" y="208" text-anchor="end" fill="#ffffff" font-size="14">Svelte</text>
<rect x="140" y="186" width="140" height="36" rx="4" fill="#e91e63" opacity="0.8"/>
<text x="288" y="208" fill="#e91e63" font-size="13">28%</text>

<text x="130" y="266" text-anchor="end" fill="#ffffff" font-size="14">Solid.js</text>
<rect x="140" y="244" width="90" height="36" rx="4" fill="#f9a825" opacity="0.8"/>
<text x="238" y="266" fill="#f9a825" font-size="13">18%</text>

<text x="130" y="324" text-anchor="end" fill="#ffffff" font-size="14">Qwik</text>
<rect x="140" y="302" width="50" height="36" rx="4" fill="#ab47bc" opacity="0.8"/>
<text x="198" y="324" fill="#ab47bc" font-size="13">10%</text>

<text x="400" y="375" text-anchor="middle" fill="#888" font-size="11">State of JS 2025調査より（複数回答）</text>
</svg>
- **React**: 依然として最大シェア、Server Componentsで新時代へ
- **Vue**: 安定と革新のバランス、Vapor Modeで性能向上
- **Svelte**: Runes導入でリアクティビティを再定義
- **新興勢力**: Solid.js（Signals）、Qwik（Resumability）が注目
- **選定の鍵**: チーム習熟度 > 最新トレンド


---

# React 19: 新機能概要

- <svg viewBox="0 0 800 390" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="390" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">React 19 主要機能マップ</text>
<circle cx="400" cy="210" r="130" fill="none" stroke="#333" stroke-width="1"/>
<circle cx="400" cy="210" r="90" fill="none" stroke="#333" stroke-width="1"/>
<circle cx="400" cy="210" r="50" fill="none" stroke="#333" stroke-width="1"/>
<circle cx="400" cy="210" r="10" fill="#f9a825"/>

<circle cx="400" cy="80" r="30" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<line x1="400" y1="210" x2="400" y2="80" stroke="#2196f3" stroke-width="1" opacity="0.4"/>
<text x="400" y="76" text-anchor="middle" fill="#2196f3" font-size="10" font-weight="bold">Server</text>
<text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="9">Components</text>

<circle cx="512" cy="145" r="30" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<line x1="400" y1="210" x2="512" y2="145" stroke="#4caf50" stroke-width="1" opacity="0.4"/>
<text x="512" y="141" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Server</text>
<text x="512" y="155" text-anchor="middle" fill="#ffffff" font-size="9">Actions</text>

<circle cx="512" cy="275" r="30" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<line x1="400" y1="210" x2="512" y2="275" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
<text x="512" y="271" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold">React</text>
<text x="512" y="285" text-anchor="middle" fill="#ffffff" font-size="9">Compiler</text>

<circle cx="400" cy="340" r="30" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<line x1="400" y1="210" x2="400" y2="340" stroke="#f9a825" stroke-width="1" opacity="0.4"/>
<text x="400" y="336" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold">use()</text>
<text x="400" y="350" text-anchor="middle" fill="#ffffff" font-size="9">Hook</text>

<circle cx="288" cy="275" r="30" fill="#16213e" stroke="#ab47bc" stroke-width="2"/>
<line x1="400" y1="210" x2="288" y2="275" stroke="#ab47bc" stroke-width="1" opacity="0.4"/>
<text x="288" y="271" text-anchor="middle" fill="#ab47bc" font-size="10" font-weight="bold">Suspense</text>
<text x="288" y="285" text-anchor="middle" fill="#ffffff" font-size="9">強化</text>

<circle cx="288" cy="145" r="30" fill="#16213e" stroke="#00bcd4" stroke-width="2"/>
<line x1="400" y1="210" x2="288" y2="145" stroke="#00bcd4" stroke-width="1" opacity="0.4"/>
<text x="288" y="141" text-anchor="middle" fill="#00bcd4" font-size="10" font-weight="bold">New</text>
<text x="288" y="155" text-anchor="middle" fill="#ffffff" font-size="9">Hooks</text>

</svg>
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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Server Components アーキテクチャ</text>
<rect x="60" y="70" width="200" height="80" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="160" y="100" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">Server</text>
<text x="160" y="120" text-anchor="middle" fill="#ffffff" font-size="11">DB直接アクセス</text>
<text x="160" y="138" text-anchor="middle" fill="#ffffff" font-size="11">バンドルサイズ0</text>
<rect x="540" y="70" width="200" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="640" y="100" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Client</text>
<text x="640" y="120" text-anchor="middle" fill="#ffffff" font-size="11">'use client'で明示</text>
<text x="640" y="138" text-anchor="middle" fill="#ffffff" font-size="11">インタラクティブ</text>
<line x1="260" y1="110" x2="385" y2="110" stroke="#f9a825" stroke-width="2"/>
<polygon points="385,103 399,110 385,117" fill="#f9a825"/>
<rect x="300" y="85" width="90" height="26" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
<text x="345" y="103" text-anchor="middle" fill="#f9a825" font-size="10">RSC Payload</text>
<rect x="100" y="200" width="600" height="50" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="222" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">Next.js App Router</text>
<text x="400" y="240" text-anchor="middle" fill="#ffffff" font-size="11">ServerとClientを自動的にルーティング</text>
<rect x="100" y="290" width="280" height="50" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="240" y="312" text-anchor="middle" fill="#2196f3" font-size="12">Server Component</text>
<text x="240" y="330" text-anchor="middle" fill="#ffffff" font-size="10">async/await OK, secrets OK</text>
<rect x="420" y="290" width="280" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
<text x="560" y="312" text-anchor="middle" fill="#e91e63" font-size="12">Client Component</text>
<text x="560" y="330" text-anchor="middle" fill="#ffffff" font-size="10">useState, useEffect, events</text>
</svg>
- サーバーで実行、バンドルサイズゼロ
- 直接DBアクセス可能、シークレット使用OK


---

# React 19: Server Components詳解（コード例）

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


---

# React 19: React Compiler（コード例）

```javascript
// Before: 手動メモ化が必要
const val = useMemo(() => expensiveCalc(a, b), [a, b])

// After: Compilerが自動で最適化
const val = expensiveCalc(a, b)
```


---

# Vue 4への道のり

- <svg viewBox="0 0 800 390" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="390" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Vue 4 Vapor Mode パフォーマンス比較</text>

<text x="200" y="98" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">初期レンダリング</text>
<rect x="250" y="80" width="150" height="30" rx="4" fill="#4caf50" opacity="0.85"/>
<text x="408" y="100" fill="#4caf50" font-size="12">50% (Vue4)</text>
<rect x="250" y="118" width="300" height="30" rx="4" fill="#555" opacity="0.7"/>
<text x="558" y="138" fill="#aaa" font-size="12">100% (Vue3)</text>

<text x="200" y="188" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">メモリ使用量</text>
<rect x="250" y="170" width="180" height="30" rx="4" fill="#4caf50" opacity="0.85"/>
<text x="438" y="190" fill="#4caf50" font-size="12">60% (Vue4)</text>
<rect x="250" y="208" width="300" height="30" rx="4" fill="#555" opacity="0.7"/>
<text x="558" y="228" fill="#aaa" font-size="12">100% (Vue3)</text>

<text x="200" y="278" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">バンドルサイズ</text>
<rect x="250" y="260" width="195" height="30" rx="4" fill="#4caf50" opacity="0.85"/>
<text x="453" y="280" fill="#4caf50" font-size="12">65% (Vue4)</text>
<rect x="250" y="298" width="300" height="30" rx="4" fill="#555" opacity="0.7"/>
<text x="558" y="318" fill="#aaa" font-size="12">100% (Vue3)</text>

<text x="400" y="370" text-anchor="middle" fill="#888" font-size="11">低いほど高速・省メモリ</text>
</svg>
- **Vapor Mode**: コンパイル時最適化でVirtual DOM削減
- **パフォーマンス向上**: 初期レンダリング最大50%高速化
- **後方互換性**: Vue 3コードがそのまま動作
- **リリース時期**: 2026年Q2-Q3を予定


---

# Svelte 5とRunes

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Svelte 5 Runes リアクティビティ</text>
<rect x="60" y="70" width="200" height="260" rx="10" fill="#16213e" stroke="#555" stroke-width="1.5"/>
<text x="160" y="100" text-anchor="middle" fill="#aaa" font-size="14" font-weight="bold">Svelte 4</text>
<rect x="80" y="115" width="160" height="36" rx="6" fill="#333"/>
<text x="160" y="138" text-anchor="middle" fill="#aaa" font-size="12">let count = 0</text>
<rect x="80" y="160" width="160" height="36" rx="6" fill="#333"/>
<text x="160" y="183" text-anchor="middle" fill="#aaa" font-size="11">$: doubled = count*2</text>
<text x="160" y="230" text-anchor="middle" fill="#777" font-size="11">暗黙的リアクティブ</text>
<text x="160" y="250" text-anchor="middle" fill="#777" font-size="11">デバッグ困難</text>
<rect x="540" y="70" width="200" height="260" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="640" y="100" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Svelte 5 Runes</text>
<rect x="560" y="115" width="160" height="36" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
<text x="640" y="138" text-anchor="middle" fill="#e91e63" font-size="11">$state(0)</text>
<rect x="560" y="160" width="160" height="36" rx="6" fill="#1a1a2e" stroke="#4caf50" stroke-width="1"/>
<text x="640" y="183" text-anchor="middle" fill="#4caf50" font-size="11">$derived(...)</text>
<rect x="560" y="205" width="160" height="36" rx="6" fill="#1a1a2e" stroke="#2196f3" stroke-width="1"/>
<text x="640" y="228" text-anchor="middle" fill="#2196f3" font-size="11">$effect(...)</text>
<text x="640" y="290" text-anchor="middle" fill="#4caf50" font-size="11">明示的・型安全</text>
<text x="400" y="210" text-anchor="middle" fill="#f9a825" font-size="28">→</text>
</svg>
- **Runes**: 新しいリアクティビティプリミティブ（$state, $derived, $effect）
- **明示的リアクティビティ**: 変数の「どこが」リアクティブか一目瞭然
- **TypeScript統合強化**: 型推論が大幅改善
- **2024年12月正式リリース**: 既に本番利用可能


---

# Svelte 5: コード比較

- 可読性向上: リアクティブな値が明確
- デバッグ容易: 依存関係が追跡しやすい


---

# Svelte 5: コード比較（コード例）

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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Solid.js Signals アーキテクチャ</text>
<rect x="50" y="70" width="200" height="100" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="150" y="105" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">Signal</text>
<text x="150" y="125" text-anchor="middle" fill="#ffffff" font-size="11">createSignal()</text>
<text x="150" y="143" text-anchor="middle" fill="#ffffff" font-size="11">値の保持・更新</text>
<rect x="300" y="70" width="200" height="100" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="105" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Memo</text>
<text x="400" y="125" text-anchor="middle" fill="#ffffff" font-size="11">createMemo()</text>
<text x="400" y="143" text-anchor="middle" fill="#ffffff" font-size="11">派生値・キャッシュ</text>
<rect x="550" y="70" width="200" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="650" y="105" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Effect</text>
<text x="650" y="125" text-anchor="middle" fill="#ffffff" font-size="11">createEffect()</text>
<text x="650" y="143" text-anchor="middle" fill="#ffffff" font-size="11">副作用・DOM更新</text>
<line x1="250" y1="120" x2="295" y2="120" stroke="#f9a825" stroke-width="2"/>
<polygon points="295,113 309,120 295,127" fill="#f9a825"/>
<line x1="500" y1="120" x2="545" y2="120" stroke="#f9a825" stroke-width="2"/>
<polygon points="545,113 559,120 545,127" fill="#f9a825"/>
<rect x="150" y="230" width="500" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Virtual DOMなし → 直接DOM更新</text>
<text x="400" y="270" text-anchor="middle" fill="#ffffff" font-size="11">変更があった箇所だけ精密に更新 → 最速</text>
<rect x="150" y="300" width="500" height="50" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="1"/>
<text x="400" y="322" text-anchor="middle" fill="#4caf50" font-size="12">JS-Framework-Benchmark: スコア 1.08（最速クラス）</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="11">React 1.52 / Vue 1.28 / Svelte 1.12 と比較</text>
</svg>
- **細粒度リアクティビティ**: Virtual DOMなし、直接DOM更新
- **Signals API**: createSignal, createEffect, createMemoの3つが核
- **React風文法**: JSXでReact開発者が学習容易
- **超高速**: ベンチマークでReact/Vueを上回る性能


---

# Solid.js: Signals-first設計（コード例）

```javascript
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>
}
```


---

# Qwik: Resumability革命

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Qwik Resumability vs Hydration</text>
<rect x="40" y="60" width="320" height="280" rx="10" fill="#16213e" stroke="#555" stroke-width="1.5"/>
<text x="200" y="90" text-anchor="middle" fill="#aaa" font-size="14" font-weight="bold">従来のHydration</text>
<rect x="60" y="99" width="280" height="28" rx="4" fill="#555"/><text x="200" y="115" text-anchor="middle" fill="#ffffff" font-size="11">サーバーでHTML生成</text><rect x="60" y="139" width="280" height="28" rx="4" fill="#666"/><text x="200" y="155" text-anchor="middle" fill="#ffffff" font-size="11">クライアントにJS送信</text><rect x="60" y="179" width="280" height="28" rx="4" fill="#777"/><text x="200" y="195" text-anchor="middle" fill="#ffffff" font-size="11">全JSを実行・解析</text><rect x="60" y="219" width="280" height="28" rx="4" fill="#888"/><text x="200" y="235" text-anchor="middle" fill="#ffffff" font-size="11">イベント再アタッチ</text><rect x="60" y="259" width="280" height="28" rx="4" fill="#999"/><text x="200" y="275" text-anchor="middle" fill="#ffffff" font-size="11">やっとインタラクティブ</text>
<text x="200" y="320" text-anchor="middle" fill="#e53935" font-size="12">TTI: 遅い</text>
<rect x="440" y="60" width="320" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="600" y="90" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Qwik Resumability</text>
<rect x="460" y="99" width="280" height="28" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="600" y="115" text-anchor="middle" fill="#e91e63" font-size="11">サーバーでHTML+状態生成</text><rect x="460" y="139" width="280" height="28" rx="4" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/><text x="600" y="155" text-anchor="middle" fill="#4caf50" font-size="11">HTMLをクライアントへ</text><rect x="460" y="179" width="280" height="28" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/><text x="600" y="195" text-anchor="middle" fill="#2196f3" font-size="11">JSは必要になるまで待機</text><rect x="460" y="219" width="280" height="28" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="600" y="235" text-anchor="middle" fill="#f9a825" font-size="11">操作時のみJS読み込み</text><rect x="460" y="259" width="280" height="28" rx="4" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/><text x="600" y="275" text-anchor="middle" fill="#4caf50" font-size="11">即インタラクティブ</text>
<text x="600" y="320" text-anchor="middle" fill="#4caf50" font-size="12">TTI: 劇的に短縮</text>
</svg>
- **Hydrationゼロ**: サーバーで実行状態をシリアライズ、クライアントで復元
- **遅延実行**: ユーザー操作まで一切JSを実行しない
- **初期表示最速**: TTI（Time to Interactive）が劇的に改善
- **Qwik City**: メタフレームワークで実用レベル


---

# フレームワーク性能比較

- <svg viewBox="0 0 800 390" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="390" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">JS Framework Benchmark 2026</text>
<text x="400" y="58" text-anchor="middle" fill="#aaa" font-size="12">スコア（1.0=ネイティブJS、低いほど速い）</text>

<text x="100" y="100" text-anchor="end" fill="#ffffff" font-size="13">Solid.js</text>
<rect x="110" y="80" width="14" height="36" rx="3" fill="#4caf50" opacity="0.5"/>
<rect x="124" y="80" width="48" height="36" rx="3" fill="#4caf50" opacity="0.8"/>
<text x="180" y="102" fill="#4caf50" font-size="13">1.08</text>

<text x="100" y="152" text-anchor="end" fill="#ffffff" font-size="13">Svelte 5</text>
<rect x="110" y="132" width="14" height="36" rx="3" fill="#4caf50" opacity="0.5"/>
<rect x="124" y="132" width="72" height="36" rx="3" fill="#e91e63" opacity="0.8"/>
<text x="204" y="154" fill="#e91e63" font-size="13">1.12</text>

<text x="100" y="204" text-anchor="end" fill="#ffffff" font-size="13">Vue 3</text>
<rect x="110" y="184" width="14" height="36" rx="3" fill="#4caf50" opacity="0.5"/>
<rect x="124" y="184" width="168" height="36" rx="3" fill="#2196f3" opacity="0.8"/>
<text x="300" y="206" fill="#2196f3" font-size="13">1.28</text>

<text x="100" y="256" text-anchor="end" fill="#ffffff" font-size="13">React 18</text>
<rect x="110" y="236" width="14" height="36" rx="3" fill="#4caf50" opacity="0.5"/>
<rect x="124" y="236" width="312" height="36" rx="3" fill="#00bcd4" opacity="0.8"/>
<text x="444" y="258" fill="#00bcd4" font-size="13">1.52</text>

<text x="100" y="308" text-anchor="end" fill="#ffffff" font-size="13">Angular</text>
<rect x="110" y="288" width="14" height="36" rx="3" fill="#4caf50" opacity="0.5"/>
<rect x="124" y="288" width="366" height="36" rx="3" fill="#e53935" opacity="0.8"/>
<text x="498" y="310" fill="#e53935" font-size="13">1.61</text>

<line x1="124" y1="70" x2="124" y2="350" stroke="#4caf50" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="124" y="360" text-anchor="middle" fill="#4caf50" font-size="10">1.0 (baseline)</text>
</svg>
- **JS-Framework-Benchmark結果（2026年1月）**:
- - Solid.js: スコア 1.08（最速）
- - Svelte 5: スコア 1.12 / Vue 3: スコア 1.28 / React 18: スコア 1.52
- **バンドルサイズ**: Svelte 2.5KB / Solid 7KB / Vue 34KB / React 42KB


---

# フレームワーク選定フローチャート

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">フレームワーク選定フロー</text>
<rect x="300" y="50" width="200" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="77" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">新規プロジェクト</text>
<line x1="400" y1="94" x2="400" y2="115" stroke="#aaa" stroke-width="1.5"/>
<polygon points="393,115 400,129 407,115" fill="#aaa"/>
<rect x="270" y="130" width="260" height="44" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/>
<text x="400" y="155" text-anchor="middle" fill="#2196f3" font-size="13">チームにReact経験あり?</text>
<line x1="270" y1="152" x2="150" y2="220" stroke="#aaa" stroke-width="1.5"/>
<text x="190" y="198" fill="#4caf50" font-size="11">YES</text>
<rect x="60" y="220" width="160" height="44" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="140" y="247" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">React 19</text>
<line x1="530" y1="152" x2="640" y2="220" stroke="#aaa" stroke-width="1.5"/>
<text x="610" y="198" fill="#e91e63" font-size="11">NO</text>
<rect x="560" y="220" width="180" height="44" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/>
<text x="650" y="245" text-anchor="middle" fill="#2196f3" font-size="12">規模は大きい?</text>
<line x1="650" y1="264" x2="650" y2="290" stroke="#aaa" stroke-width="1.5"/>
<text x="667" y="285" fill="#e91e63" font-size="11">NO</text>
<rect x="570" y="290" width="160" height="44" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="650" y="317" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Svelte 5</text>
<line x1="560" y1="242" x2="400" y2="290" stroke="#aaa" stroke-width="1.5"/>
<text x="460" y="280" fill="#f9a825" font-size="11">大規模</text>
<rect x="320" y="290" width="160" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Vue 3/4</text>
</svg>
- プロジェクト特性とチームスキルに応じた選定フロー


---

# フレームワーク選定フローチャート（図解）

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">フレームワーク選定フロー</text>
<rect x="300" y="50" width="200" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="77" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">新規プロジェクト</text>
<line x1="400" y1="94" x2="400" y2="115" stroke="#aaa" stroke-width="1.5"/>
<polygon points="393,115 400,129 407,115" fill="#aaa"/>
<rect x="270" y="130" width="260" height="44" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/>
<text x="400" y="155" text-anchor="middle" fill="#2196f3" font-size="13">チームにReact経験あり?</text>
<line x1="270" y1="152" x2="150" y2="220" stroke="#aaa" stroke-width="1.5"/>
<text x="190" y="198" fill="#4caf50" font-size="11">YES</text>
<rect x="60" y="220" width="160" height="44" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="140" y="247" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">React 19</text>
<line x1="530" y1="152" x2="640" y2="220" stroke="#aaa" stroke-width="1.5"/>
<text x="610" y="198" fill="#e91e63" font-size="11">NO</text>
<rect x="560" y="220" width="180" height="44" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="1.5"/>
<text x="650" y="245" text-anchor="middle" fill="#2196f3" font-size="12">規模は大きい?</text>
<line x1="650" y1="264" x2="650" y2="290" stroke="#aaa" stroke-width="1.5"/>
<text x="667" y="285" fill="#e91e63" font-size="11">NO</text>
<rect x="570" y="290" width="160" height="44" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="650" y="317" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Svelte 5</text>
<line x1="560" y1="242" x2="400" y2="290" stroke="#aaa" stroke-width="1.5"/>
<text x="460" y="280" fill="#f9a825" font-size="11">大規模</text>
<rect x="320" y="290" width="160" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Vue 3/4</text>
</svg>


---

# メタフレームワークの進化

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">メタフレームワーク 2026</text>

<rect x="60" y="80" width="680" height="70" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="120" y="112" fill="#2196f3" font-size="18" font-weight="bold">Next.js 15</text>
<rect x="320" y="92" width="130" height="28" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="385" y="111" text-anchor="middle" fill="#ffffff" font-size="12">Base: React 19</text>
<rect x="470" y="92" width="130" height="28" rx="6" fill="#16213e" stroke="#2196f3" stroke-width="1"/>
<text x="535" y="111" text-anchor="middle" fill="#ffffff" font-size="12">Tool: Turbopack</text>

<rect x="60" y="180" width="680" height="70" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="120" y="212" fill="#4caf50" font-size="18" font-weight="bold">Nuxt 4</text>
<rect x="320" y="192" width="130" height="28" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1"/>
<text x="385" y="211" text-anchor="middle" fill="#ffffff" font-size="12">Base: Vue 3.5</text>
<rect x="470" y="192" width="130" height="28" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1"/>
<text x="535" y="211" text-anchor="middle" fill="#ffffff" font-size="12">Tool: Nitro 2</text>

<rect x="60" y="280" width="680" height="70" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="120" y="312" fill="#e91e63" font-size="18" font-weight="bold">SvelteKit 2</text>
<rect x="320" y="292" width="130" height="28" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
<text x="385" y="311" text-anchor="middle" fill="#ffffff" font-size="12">Base: Svelte 5</text>
<rect x="470" y="292" width="130" height="28" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
<text x="535" y="311" text-anchor="middle" fill="#ffffff" font-size="12">Tool: Vite 5</text>

</svg>
- **Next.js 15**: React 19対応、Turbopack安定化
- **Nuxt 4**: Vue 3.5統合、Nitro 2エンジン
- **SvelteKit 2**: Vite 5ベース、型安全ルーティング


---

# Islands Architecture

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Islands Architecture</text>
<rect x="60" y="55" width="680" height="300" rx="10" fill="#16213e" stroke="#555" stroke-width="1.5"/>
<text x="400" y="85" text-anchor="middle" fill="#aaa" font-size="13">静的HTML（サーバーレンダリング）</text>
<rect x="80" y="100" width="250" height="100" rx="8" fill="#1a2a1a" stroke="#4caf50" stroke-width="2"/>
<text x="205" y="125" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">Interactive Island</text>
<text x="205" y="145" text-anchor="middle" fill="#ffffff" font-size="11">カート・検索コンポーネント</text>
<text x="205" y="163" text-anchor="middle" fill="#4caf50" font-size="10">JSをハイドレーション</text>
<rect x="350" y="100" width="370" height="45" rx="6" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
<text x="535" y="127" text-anchor="middle" fill="#666" font-size="12">静的コンテンツ（JS不要）</text>
<rect x="350" y="155" width="175" height="45" rx="6" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
<text x="437" y="182" text-anchor="middle" fill="#666" font-size="11">静的テキスト</text>
<rect x="535" y="155" width="185" height="45" rx="6" fill="#1a2a2a" stroke="#2196f3" stroke-width="2"/>
<text x="627" y="175" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">Island 2</text>
<text x="627" y="191" text-anchor="middle" fill="#ffffff" font-size="10">動画プレーヤー</text>
<rect x="80" y="215" width="630" height="45" rx="6" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
<text x="395" y="242" text-anchor="middle" fill="#666" font-size="12">フッター（静的）</text>
<text x="400" y="295" text-anchor="middle" fill="#f9a825" font-size="12">JS削減効果: 通常SPAより90%削減も可能</text>
</svg>
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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">ランタイム戦争 2026</text>

<rect x="60" y="80" width="680" height="68" rx="10" fill="#16213e" stroke="#8bc34a" stroke-width="2"/>
<text x="150" y="110" text-anchor="middle" fill="#8bc34a" font-size="20" font-weight="bold">Node.js</text>
<text x="150" y="132" text-anchor="middle" fill="#ffffff" font-size="11">LTS 22/24</text>
<line x1="240" y1="90" x2="240" y2="140" stroke="#333" stroke-width="1"/>
<text x="460" y="118" text-anchor="middle" fill="#ffffff" font-size="13">安定性・エコシステム</text>

<rect x="60" y="170" width="680" height="68" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="150" y="200" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">Bun</text>
<text x="150" y="222" text-anchor="middle" fill="#ffffff" font-size="11">1.x系</text>
<line x1="240" y1="180" x2="240" y2="230" stroke="#333" stroke-width="1"/>
<text x="460" y="208" text-anchor="middle" fill="#ffffff" font-size="13">最速・DX重視</text>

<rect x="60" y="260" width="680" height="68" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="150" y="290" text-anchor="middle" fill="#2196f3" font-size="20" font-weight="bold">Deno</text>
<text x="150" y="312" text-anchor="middle" fill="#ffffff" font-size="11">2.x系</text>
<line x1="240" y1="270" x2="240" y2="320" stroke="#333" stroke-width="1"/>
<text x="460" y="298" text-anchor="middle" fill="#ffffff" font-size="13">セキュリティ・標準準拠</text>

<text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="12">3つが共存 — プロジェクト特性で選択</text>
</svg>
- **Node.js**: 依然デファクトスタンダード、安定進化
- **Bun**: 2024年9月に1.0到達、全方位高速化
- **Deno**: 2.0でNode互換完成、セキュリティファースト
- **2026年の状況**: 3つが共存、プロジェクト特性で使い分け


---

# Bun 2.x: 全方位高速化

- <svg viewBox="0 0 800 390" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="390" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Bun 2.x パフォーマンス比較</text>

<text x="180" y="95" text-anchor="end" fill="#ffffff" font-size="13">インストール速度</text>

<rect x="190" y="70" width="2000" height="22" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="2196" y="85" fill="#f9a825" font-size="11">Bun 20x</text>

<rect x="190" y="98" width="570" height="22" rx="3" fill="#2196f3" opacity="0.85"/>
<text x="766" y="113" fill="#2196f3" font-size="11">pnpm 5.7x</text>

<rect x="190" y="126" width="100" height="22" rx="3" fill="#aaa" opacity="0.85"/>
<text x="296" y="141" fill="#aaa" font-size="11">npm 1x</text>


<text x="180" y="215" text-anchor="end" fill="#ffffff" font-size="13">起動速度</text>

<rect x="190" y="190" width="440" height="22" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="636" y="205" fill="#f9a825" font-size="11">Bun 4.4x</text>

<rect x="190" y="218" width="190" height="22" rx="3" fill="#2196f3" opacity="0.85"/>
<text x="386" y="233" fill="#2196f3" font-size="11">Deno 1.9x</text>

<rect x="190" y="246" width="100" height="22" rx="3" fill="#aaa" opacity="0.85"/>
<text x="296" y="261" fill="#aaa" font-size="11">Node 1x</text>


<text x="180" y="335" text-anchor="end" fill="#ffffff" font-size="13">HTTP req/s</text>

<rect x="190" y="310" width="177" height="22" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="373" y="325" fill="#f9a825" font-size="11">Bun 1.77x</text>

<rect x="190" y="338" width="120" height="22" rx="3" fill="#2196f3" opacity="0.85"/>
<text x="316" y="353" fill="#2196f3" font-size="11">Deno 1.2x</text>

<rect x="190" y="366" width="100" height="22" rx="3" fill="#aaa" opacity="0.85"/>
<text x="296" y="381" fill="#aaa" font-size="11">Node 1x</text>


</svg>
- **インストール速度**: npm比20-30倍高速
- **起動速度**: Node.js比4倍高速（Zig + JavaScriptCore）
- **TypeScript実行**: トランスパイル不要で直接実行
- **組み込みツール**: テスト・バンドラ・トランスパイラ内蔵


---

# Bun: 組み込みツール群

- 外部ツール不要、セットアップ簡単
- 統一されたDX


---

# Bun: 組み込みツール群（コード例）

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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Deno 2.x: セキュリティモデル</text>
<rect x="100" y="65" width="600" height="280" rx="12" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="400" y="95" text-anchor="middle" fill="#2196f3" font-size="15" font-weight="bold">Deno Runtime</text>
<rect x="140" y="110" width="520" height="50" rx="8" fill="#0d1117" stroke="#333" stroke-width="1"/>
<text x="400" y="140" text-anchor="middle" fill="#ffffff" font-size="13">TypeScript / JavaScript コード</text>
<rect x="140" y="175" width="240" height="50" rx="8" fill="#1a1a2e" stroke="#4caf50" stroke-width="1.5"/>
<text x="260" y="197" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">Permission Guard</text>
<text x="260" y="214" text-anchor="middle" fill="#ffffff" font-size="10">--allow-read/net/write</text>
<rect x="400" y="175" width="260" height="50" rx="8" fill="#1a1a2e" stroke="#e91e63" stroke-width="1.5"/>
<text x="530" y="197" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">npm互換レイヤー</text>
<text x="530" y="214" text-anchor="middle" fill="#ffffff" font-size="10">package.json / node_modules</text>
<rect x="140" y="245" width="520" height="50" rx="8" fill="#0a0a1a" stroke="#555" stroke-width="1"/>
<text x="400" y="267" text-anchor="middle" fill="#aaa" font-size="12">V8 Engine</text>
<text x="400" y="283" text-anchor="middle" fill="#666" font-size="10">+ Tokio (Rust非同期ランタイム)</text>
</svg>
- **Node.js互換**: package.json、node_modules、npm完全サポート
- **セキュリティモデル**: デフォルトでネットワーク・ファイルアクセス禁止
- **TypeScript標準**: 追加設定なしでTS実行


---

# Node.js 22-24: 安定進化

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Node.js 進化タイムライン</text>
<line x1="80" y1="200" x2="720" y2="200" stroke="#444" stroke-width="2"/>

<circle cx="120" cy="200" r="10" fill="#555"/>
<line x1="120" y1="190" x2="120" y2="140" stroke="#555" stroke-width="1.5"/>
<text x="120" y="130" text-anchor="middle" fill="#555" font-size="12" font-weight="bold">v18 LTS</text>
<text x="120" y="230" text-anchor="middle" fill="#888" font-size="11">2022</text>

<circle cx="250" cy="200" r="10" fill="#666"/>
<line x1="250" y1="190" x2="250" y2="140" stroke="#666" stroke-width="1.5"/>
<text x="250" y="130" text-anchor="middle" fill="#666" font-size="12" font-weight="bold">v20 LTS</text>
<text x="250" y="230" text-anchor="middle" fill="#888" font-size="11">2023</text>

<circle cx="400" cy="200" r="10" fill="#2196f3"/>
<line x1="400" y1="190" x2="400" y2="140" stroke="#2196f3" stroke-width="1.5"/>
<text x="400" y="130" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">v22 LTS</text>
<text x="400" y="230" text-anchor="middle" fill="#888" font-size="11">2024</text>

<circle cx="530" cy="200" r="10" fill="#4caf50"/>
<line x1="530" y1="190" x2="530" y2="140" stroke="#4caf50" stroke-width="1.5"/>
<text x="530" y="130" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">v23</text>
<text x="530" y="230" text-anchor="middle" fill="#888" font-size="11">2025</text>

<circle cx="680" cy="200" r="10" fill="#f9a825"/>
<line x1="680" y1="190" x2="680" y2="140" stroke="#f9a825" stroke-width="1.5"/>
<text x="680" y="130" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">v24</text>
<text x="680" y="230" text-anchor="middle" fill="#888" font-size="11">2026</text>

<rect x="560" y="260" width="200" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="660" y="285" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">v24 注目機能</text>
<text x="660" y="305" text-anchor="middle" fill="#ffffff" font-size="11">ESM完全デフォルト化</text>
</svg>
- **Node.js 22 LTS**: V8 12.4、性能向上
- **Node.js 24**: ESM完全デフォルト化予定
- **エコシステム**: 最大最強、ほぼ全npmパッケージ対応


---

# ランタイム性能比較

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">ランタイム性能比較 2026</text>

<text x="200" y="90" text-anchor="end" fill="#ffffff" font-size="12" font-weight="bold">起動時間 (ms)</text>

<rect x="210" y="70" width="80" height="20" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="296" y="84" fill="#f9a825" font-size="11">Bun: 8ms</text>

<rect x="210" y="96" width="180" height="20" rx="3" fill="#2196f3" opacity="0.85"/>
<text x="396" y="110" fill="#2196f3" font-size="11">Deno: 18ms</text>

<rect x="210" y="122" width="350" height="20" rx="3" fill="#aaa" opacity="0.85"/>
<text x="566" y="136" fill="#aaa" font-size="11">Node: 35ms</text>

<text x="200" y="190" text-anchor="end" fill="#ffffff" font-size="12" font-weight="bold">インストール (s)</text>

<rect x="210" y="170" width="18" height="20" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="234" y="184" fill="#f9a825" font-size="11">Bun: 1.2s</text>

<rect x="210" y="196" width="54" height="20" rx="3" fill="#4caf50" opacity="0.85"/>
<text x="270" y="210" fill="#4caf50" font-size="11">pnpm: 3.5s</text>

<rect x="210" y="222" width="369" height="20" rx="3" fill="#aaa" opacity="0.85"/>
<text x="585" y="236" fill="#aaa" font-size="11">npm: 24s</text>

<text x="200" y="290" text-anchor="end" fill="#ffffff" font-size="12" font-weight="bold">HTTP req/sec (k)</text>

<rect x="210" y="270" width="363" height="20" rx="3" fill="#f9a825" opacity="0.85"/>
<text x="579" y="284" fill="#f9a825" font-size="11">Bun: 145k</text>

<rect x="210" y="296" width="245" height="20" rx="3" fill="#2196f3" opacity="0.85"/>
<text x="461" y="310" fill="#2196f3" font-size="11">Deno: 98k</text>

<rect x="210" y="322" width="205" height="20" rx="3" fill="#aaa" opacity="0.85"/>
<text x="421" y="336" fill="#aaa" font-size="11">Node: 82k</text>

</svg>
- **起動時間**: Bun 8ms / Deno 18ms / Node.js 35ms
- **インストール速度**: Bun 1.2s / pnpm 3.5s / npm 24s
- **HTTP throughput**: Bun 145k / Deno 98k / Node.js 82k req/sec


---

# Vite 6: 次世代ビルドツール

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Vite 6 ビルドパイプライン</text>

<rect x="200" y="60" width="400" height="54" rx="8" fill="#16213e" stroke="#555" stroke-width="2"/>
<text x="400" y="84" text-anchor="middle" fill="#555" font-size="14" font-weight="bold">Source Files</text>
<text x="400" y="102" text-anchor="middle" fill="#ffffff" font-size="11">.ts/.tsx/.vue/.svelte</text>
<line x1="400" y1="114" x2="400" y2="128" stroke="#555" stroke-width="1.5"/><polygon points="393,128 400,142 407,128" fill="#555"/>

<rect x="200" y="150" width="400" height="54" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="400" y="174" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">ESBuild Transform</text>
<text x="400" y="192" text-anchor="middle" fill="#ffffff" font-size="11">TypeScript/JSX変換</text>
<line x1="400" y1="204" x2="400" y2="218" stroke="#555" stroke-width="1.5"/><polygon points="393,218 400,232 407,218" fill="#555"/>

<rect x="200" y="240" width="400" height="54" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="264" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Rollup 4 Bundle</text>
<text x="400" y="282" text-anchor="middle" fill="#ffffff" font-size="11">Tree-shaking・最適化</text>
<line x1="400" y1="294" x2="400" y2="308" stroke="#555" stroke-width="1.5"/><polygon points="393,308 400,322 407,308" fill="#555"/>

<rect x="200" y="330" width="400" height="54" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="354" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Output</text>
<text x="400" y="372" text-anchor="middle" fill="#ffffff" font-size="11">ESM + Legacy builds</text>


</svg>
- **Rollup 4統合**: プラグインエコシステム強化
- **Environment API**: SSR・MPA対応の抽象化
- **高速HMR**: 大規模プロジェクトでも即座に反映
- **2025年12月リリース**: 既に主流ツールの地位確立


---

# Turbopack: Vercelの秘密兵器

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Turbopack 増分コンパイル</text>
<rect x="60" y="60" width="680" height="130" rx="10" fill="#16213e" stroke="#555" stroke-width="1.5"/>
<text x="400" y="90" text-anchor="middle" fill="#aaa" font-size="13">従来のwebpack: 全モジュール再計算</text>
<rect x="70" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="97" y="132" text-anchor="middle" fill="#aaa" font-size="10">M1</text><rect x="134" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="161" y="132" text-anchor="middle" fill="#aaa" font-size="10">M2</text><rect x="198" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="225" y="132" text-anchor="middle" fill="#aaa" font-size="10">M3</text><rect x="262" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="289" y="132" text-anchor="middle" fill="#aaa" font-size="10">M4</text><rect x="326" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="353" y="132" text-anchor="middle" fill="#aaa" font-size="10">M5</text><rect x="390" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="417" y="132" text-anchor="middle" fill="#aaa" font-size="10">M6</text><rect x="454" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="481" y="132" text-anchor="middle" fill="#aaa" font-size="10">M7</text><rect x="518" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="545" y="132" text-anchor="middle" fill="#aaa" font-size="10">M8</text><rect x="582" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="609" y="132" text-anchor="middle" fill="#aaa" font-size="10">M9</text><rect x="646" y="100" width="54" height="54" rx="4" fill="#333" stroke="#555" stroke-width="1"/><text x="673" y="132" text-anchor="middle" fill="#aaa" font-size="10">M10</text>
<rect x="60" y="220" width="680" height="130" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="250" text-anchor="middle" fill="#f9a825" font-size="13">Turbopack: 変更ファイルのみ再計算</text>
<rect x="70" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="97" y="292" text-anchor="middle" fill="#555" font-size="10">M1</text><rect x="134" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="161" y="292" text-anchor="middle" fill="#555" font-size="10">M2</text><rect x="198" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="225" y="292" text-anchor="middle" fill="#555" font-size="10">M3</text><rect x="262" y="260" width="54" height="54" rx="4" fill="#f9a825" stroke="#f9a825" stroke-width="2"/><text x="289" y="292" text-anchor="middle" fill="#000" font-size="10">変更</text><rect x="326" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="353" y="292" text-anchor="middle" fill="#555" font-size="10">M5</text><rect x="390" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="417" y="292" text-anchor="middle" fill="#555" font-size="10">M6</text><rect x="454" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="481" y="292" text-anchor="middle" fill="#555" font-size="10">M7</text><rect x="518" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="545" y="292" text-anchor="middle" fill="#555" font-size="10">M8</text><rect x="582" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="609" y="292" text-anchor="middle" fill="#555" font-size="10">M9</text><rect x="646" y="260" width="54" height="54" rx="4" fill="#1a1a2e" stroke="#333" stroke-width="1"/><text x="673" y="292" text-anchor="middle" fill="#555" font-size="10">M10</text>
<text x="400" y="380" text-anchor="middle" fill="#4caf50" font-size="13">webpack比 10倍高速 / Next.js 15で有効化</text>
</svg>
- **Rustベース**: webpackより10倍高速
- **増分コンピューティング**: 変更差分のみ再計算
- **Next.js 15統合**: `next dev --turbo`で有効化


---

# ビルドツール速度比較

- <svg viewBox="0 0 800 310" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="310" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">ビルドツール速度比較</text>
<text x="400" y="58" text-anchor="middle" fill="#aaa" font-size="12">開発ビルド（1000モジュール）</text>

<text x="120" y="95" text-anchor="end" fill="#ffffff" font-size="13">Turbopack</text>
<rect x="130" y="75" width="46" height="36" rx="4" fill="#f9a825" opacity="0.8"/>
<text x="184" y="97" fill="#f9a825" font-size="13">1.2s</text>

<text x="120" y="147" text-anchor="end" fill="#ffffff" font-size="13">Vite</text>
<rect x="130" y="127" width="108" height="36" rx="4" fill="#4caf50" opacity="0.8"/>
<text x="246" y="149" fill="#4caf50" font-size="13">2.8s</text>

<text x="120" y="199" text-anchor="end" fill="#ffffff" font-size="13">esbuild</text>
<rect x="130" y="179" width="119" height="36" rx="4" fill="#2196f3" opacity="0.8"/>
<text x="257" y="201" fill="#2196f3" font-size="13">3.1s</text>

<text x="120" y="251" text-anchor="end" fill="#ffffff" font-size="13">webpack</text>
<rect x="130" y="231" width="481" height="36" rx="4" fill="#e53935" opacity="0.8"/>
<text x="619" y="253" fill="#e53935" font-size="13">12.5s</text>

</svg>
- **開発ビルド（1000モジュール）**:
- Turbopack 1.2s / Vite 2.8s / esbuild 3.1s / webpack 12.5s
- **本番ビルド**:
- esbuild 3.8s / Vite 8.2s / webpack 35s


---

# パッケージマネージャー比較

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">パッケージマネージャー比較</text>

<rect x="60" y="80" width="680" height="66" rx="10" fill="#16213e" stroke="#e53935" stroke-width="2"/>
<text x="140" y="112" text-anchor="middle" fill="#e53935" font-size="18" font-weight="bold">npm</text>
<text x="280" y="102" fill="#ffffff" font-size="12">インストール速度</text>
<rect x="280" y="110" width="15" height="16" rx="3" fill="#e53935" opacity="0.7"/>
<text x="490" y="102" fill="#ffffff" font-size="12">ディスク使用量</text>
<rect x="490" y="110" width="100" height="16" rx="3" fill="#e53935" opacity="0.5"/>

<rect x="60" y="170" width="680" height="66" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="140" y="202" text-anchor="middle" fill="#4caf50" font-size="18" font-weight="bold">pnpm</text>
<text x="280" y="192" fill="#ffffff" font-size="12">インストール速度</text>
<rect x="280" y="200" width="102" height="16" rx="3" fill="#4caf50" opacity="0.7"/>
<text x="490" y="192" fill="#ffffff" font-size="12">ディスク使用量</text>
<rect x="490" y="200" width="30" height="16" rx="3" fill="#4caf50" opacity="0.5"/>

<rect x="60" y="260" width="680" height="66" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="140" y="292" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">bun</text>
<text x="280" y="282" fill="#ffffff" font-size="12">インストール速度</text>
<rect x="280" y="290" width="200" height="16" rx="3" fill="#f9a825" opacity="0.7"/>
<text x="490" y="282" fill="#ffffff" font-size="12">ディスク使用量</text>
<rect x="490" y="290" width="50" height="16" rx="3" fill="#f9a825" opacity="0.5"/>

<text x="400" y="360" text-anchor="middle" fill="#aaa" font-size="11">2026年推奨: pnpm（バランス）/ bun（速度重視）</text>
</svg>
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

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">2026年 注目 Web Platform API</text>

<rect x="80" y="130" width="180" height="80" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="170" y="162" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">View Transitions</text>
<text x="170" y="182" text-anchor="middle" fill="#ffffff" font-size="10">ページ遷移アニメーション</text>
<text x="170" y="196" text-anchor="middle" fill="#ffffff" font-size="10"></text>

<rect x="270" y="130" width="180" height="80" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="360" y="162" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">Popover API</text>
<text x="360" y="182" text-anchor="middle" fill="#ffffff" font-size="10">ネイティブポップオーバー</text>
<text x="360" y="196" text-anchor="middle" fill="#ffffff" font-size="10"></text>

<rect x="80" y="250" width="180" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="170" y="282" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Speculation Rules</text>
<text x="170" y="302" text-anchor="middle" fill="#ffffff" font-size="10">投機的プリレンダリング</text>
<text x="170" y="316" text-anchor="middle" fill="#ffffff" font-size="10"></text>

<rect x="270" y="250" width="180" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="360" y="282" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Container Queries</text>
<text x="360" y="302" text-anchor="middle" fill="#ffffff" font-size="10">コンテナ依存レスポンシブ</text>
<text x="360" y="316" text-anchor="middle" fill="#ffffff" font-size="10"></text>

<rect x="200" y="170" width="200" height="60" rx="10" fill="#16213e" stroke="#ab47bc" stroke-width="2"/>
<text x="300" y="196" text-anchor="middle" fill="#ab47bc" font-size="13" font-weight="bold">:has() Selector</text>
<text x="300" y="216" text-anchor="middle" fill="#ffffff" font-size="10">親セレクタ革命</text>
</svg>
- **トレンド**: ブラウザネイティブ機能がフレームワーク機能を代替
- **メリット**: バンドルサイズ削減、標準化、長期安定性
- **2026年の注目API**: View Transitions、Popover、Speculation Rules


---

# View Transitions API

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="340" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">View Transitions API フロー</text>
<rect x="40" y="70" width="200" height="120" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="140" y="100" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">Page A</text>
<rect x="60" y="115" width="160" height="55" rx="4" fill="#0d1117"/>
<text x="140" y="148" text-anchor="middle" fill="#ffffff" font-size="12">コンテンツ</text>
<rect x="560" y="70" width="200" height="120" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="660" y="100" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Page B</text>
<rect x="580" y="115" width="160" height="55" rx="4" fill="#0d1117"/>
<text x="660" y="148" text-anchor="middle" fill="#ffffff" font-size="12">新コンテンツ</text>
<rect x="280" y="85" width="240" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="110" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">startViewTransition()</text>
<text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="11">1. 現在の画面をキャプチャ</text>
<text x="400" y="147" text-anchor="middle" fill="#ffffff" font-size="11">2. DOM更新</text>
<text x="400" y="164" text-anchor="middle" fill="#ffffff" font-size="11">3. アニメーション実行</text>
<line x1="240" y1="130" x2="275" y2="130" stroke="#aaa" stroke-width="1.5"/>
<line x1="520" y1="130" x2="555" y2="130" stroke="#aaa" stroke-width="1.5"/>
<rect x="100" y="240" width="600" height="50" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="262" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">ブラウザ対応: Chrome 111+, Safari 18+, Firefox 130+</text>
<text x="400" y="280" text-anchor="middle" fill="#ffffff" font-size="11">2026年: 全主要ブラウザで利用可能</text>
</svg>
- **機能**: ページ遷移時に滑らかなアニメーション
- **対応**: Chrome/Edge 111+、Safari 18+（2026年全ブラウザ対応）
- **SPA風体験**: MPAでもスムーズ遷移


---

# View Transitions: 実装例

- JavaScriptは最小限
- CSSでアニメーション制御


---

# View Transitions: 実装例（コード例）

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

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Popover API: ネイティブ実装</text>
<rect x="100" y="70" width="600" height="260" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="100" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Top Layer (ブラウザ管理)</text>
<rect x="130" y="115" width="540" height="180" rx="8" fill="#0a0a1a" stroke="#333" stroke-width="1"/>
<rect x="150" y="135" width="240" height="140" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="270" y="165" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">popover 要素</text>
<text x="270" y="185" text-anchor="middle" fill="#ffffff" font-size="11">z-index 管理不要</text>
<text x="270" y="202" text-anchor="middle" fill="#ffffff" font-size="11">ESC で自動クローズ</text>
<text x="270" y="219" text-anchor="middle" fill="#ffffff" font-size="11">フォーカス管理自動</text>
<text x="270" y="236" text-anchor="middle" fill="#4caf50" font-size="10">aria-* 自動付与</text>
<rect x="420" y="135" width="220" height="80" rx="8" fill="#16213e" stroke="#aaa" stroke-width="1"/>
<text x="530" y="165" text-anchor="middle" fill="#aaa" font-size="12">従来のカスタム実装</text>
<text x="530" y="183" text-anchor="middle" fill="#666" font-size="10">z-index競合リスク</text>
<text x="530" y="199" text-anchor="middle" fill="#666" font-size="10">アクセシビリティ手動</text>
<line x1="390" y1="175" x2="415" y2="175" stroke="#f9a825" stroke-width="2"/>
<text x="403" y="168" text-anchor="middle" fill="#f9a825" font-size="16">→</text>
</svg>
- **機能**: ネイティブのポップオーバー・ダイアログ
- **対応**: Chrome/Edge 114+、Safari 17+
- **メリット**: z-index管理不要、アクセシビリティ対応自動


---

# Popover API: 実装パターン

- JavaScript不要でアクセシビリティ対応
- ESCキーで自動的に閉じる


---

# Popover API: 実装パターン（コード例）

```html
<button popovertarget="menu">開く</button>

<div id="menu" popover>
  <p>コンテンツ</p>
  <button popovertarget="menu" popovertargetaction="hide">閉じる</button>
</div>
```


---

# Speculation Rules API

- <svg viewBox="0 0 800 370" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="370" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Speculation Rules API</text>
<rect x="60" y="70" width="680" height="80" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="400" y="100" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">現在のページ</text>
<text x="400" y="122" text-anchor="middle" fill="#ffffff" font-size="12">ユーザーがリンクにホバー or スクロール</text>
<line x1="400" y1="150" x2="400" y2="170" stroke="#aaa" stroke-width="1.5"/>
<polygon points="393,170 400,184 407,170" fill="#aaa"/>
<rect x="120" y="185" width="260" height="80" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="250" y="215" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">prefetch</text>
<text x="250" y="235" text-anchor="middle" fill="#ffffff" font-size="11">HTMLのみ先読み</text>
<text x="250" y="253" text-anchor="middle" fill="#ffffff" font-size="10">低コスト・高速</text>
<rect x="420" y="185" width="260" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="550" y="215" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">prerender</text>
<text x="550" y="235" text-anchor="middle" fill="#ffffff" font-size="11">完全レンダリング済み</text>
<text x="550" y="253" text-anchor="middle" fill="#ffffff" font-size="10">遷移が瞬時</text>
<rect x="200" y="300" width="400" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
<text x="400" y="322" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">対応: Chrome/Edge 121+</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="11">JSON形式でルールを宣言するだけ</text>
</svg>
- **機能**: 投機的なプリレンダリング・プリフェッチ
- **対応**: Chrome/Edge 121+
- **高速化**: 次ページを事前レンダリング、遷移が瞬時に


---

# Container Queries

- <svg viewBox="0 0 800 370" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="370" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">Container Queries</text>
<rect x="40" y="65" width="320" height="280" rx="10" fill="#16213e" stroke="#555" stroke-width="1.5"/>
<text x="200" y="95" text-anchor="middle" fill="#aaa" font-size="13">Media Query（従来）</text>
<text x="200" y="118" text-anchor="middle" fill="#666" font-size="11">viewport幅に依存</text>
<rect x="70" y="130" width="260" height="70" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
<text x="200" y="160" text-anchor="middle" fill="#777" font-size="11">コンポーネントA（狭い列）</text>
<text x="200" y="178" text-anchor="middle" fill="#666" font-size="10">viewportが広くても列が狭ければ効果なし</text>
<rect x="70" y="215" width="260" height="70" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
<text x="200" y="248" text-anchor="middle" fill="#777" font-size="11">コンポーネントB</text>
<rect x="440" y="65" width="320" height="280" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="600" y="95" text-anchor="middle" fill="#f9a825" font-size="13">Container Query（新）</text>
<text x="600" y="118" text-anchor="middle" fill="#ffffff" font-size="11">親コンテナ幅に依存</text>
<rect x="470" y="130" width="260" height="70" rx="6" fill="#1a1a2e" stroke="#4caf50" stroke-width="1.5"/>
<text x="600" y="160" text-anchor="middle" fill="#4caf50" font-size="11">狭い列 → シングル列</text>
<text x="600" y="178" text-anchor="middle" fill="#ffffff" font-size="10">@container (min-width: 400px)</text>
<rect x="470" y="215" width="260" height="70" rx="6" fill="#1a1a2e" stroke="#2196f3" stroke-width="1.5"/>
<text x="600" y="248" text-anchor="middle" fill="#2196f3" font-size="11">広い列 → グリッド</text>
</svg>
- **機能**: 親要素サイズに応じたレスポンシブデザイン
- **対応**: 全ブラウザ対応
- **革新性**: メディアクエリ→コンテナクエリ


---

# :has()セレクタの威力

- **機能**: 「子要素を持つ親」を選択（親セレクタ）
- **対応**: 全ブラウザ対応
- **革新性**: CSSだけで親要素をスタイリング可能


---

# :has()セレクタの威力（コード例）

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

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">AI統合開発 2026 エコシステム</text>

<rect x="80" y="80" width="240" height="80" rx="10" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="200" y="110" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">GitHub Copilot</text>
<text x="200" y="132" text-anchor="middle" fill="#ffffff" font-size="12">コード補完・PR要約</text>

<rect x="480" y="80" width="240" height="80" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="600" y="110" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Cursor</text>
<text x="600" y="132" text-anchor="middle" fill="#ffffff" font-size="12">AI-firstエディタ</text>

<rect x="80" y="220" width="240" height="80" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="200" y="250" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Claude Code</text>
<text x="200" y="272" text-anchor="middle" fill="#ffffff" font-size="12">CLIエージェント</text>

<rect x="480" y="220" width="240" height="80" rx="10" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="600" y="250" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Gemini Code</text>
<text x="600" y="272" text-anchor="middle" fill="#ffffff" font-size="12">Google統合</text>

<rect x="240" y="330" width="320" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">共通: コード生成・レビュー・テスト</text>
<text x="400" y="368" text-anchor="middle" fill="#ffffff" font-size="11">開発者の役割: 設計・判断・品質管理へシフト</text>
</svg>
- **2026年の当たり前**: コード補完・生成・レビューにAI利用
- **主要ツール**: GitHub Copilot、Cursor、Claude Code
- **生産性向上**: 調査では20-40%の効率化報告
- **役割変化**: コード書き→設計・レビュー・テスト重視へ


---

# GitHub Copilot: 進化の軌跡

- <svg viewBox="0 0 800 310" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="310" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">GitHub Copilot 進化タイムライン</text>
<line x1="80" y1="200" x2="720" y2="200" stroke="#444" stroke-width="2"/>

<circle cx="100" cy="200" r="12" fill="#555"/>
<text x="100" y="240" text-anchor="middle" fill="#888" font-size="11">2021</text>
<line x1="100" y1="188" x2="100" y2="145" stroke="#555" stroke-width="1.5"/>
<text x="100" y="135" text-anchor="middle" fill="#555" font-size="11" font-weight="bold">コード補完</text>


<circle cx="280" cy="200" r="12" fill="#2196f3"/>
<text x="280" y="240" text-anchor="middle" fill="#888" font-size="11">2023</text>
<line x1="280" y1="188" x2="280" y2="145" stroke="#2196f3" stroke-width="1.5"/>
<text x="280" y="135" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">Copilot Chat</text>
<text x="280" y="118" text-anchor="middle" fill="#2196f3" font-size="10">CLI</text>

<circle cx="460" cy="200" r="12" fill="#4caf50"/>
<text x="460" y="240" text-anchor="middle" fill="#888" font-size="11">2024</text>
<line x1="460" y1="188" x2="460" y2="145" stroke="#4caf50" stroke-width="1.5"/>
<text x="460" y="135" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">Workspace</text>
<text x="460" y="118" text-anchor="middle" fill="#4caf50" font-size="10">PR要約</text>

<circle cx="650" cy="200" r="12" fill="#f9a825"/>
<text x="650" y="240" text-anchor="middle" fill="#888" font-size="11">2026</text>
<line x1="650" y1="188" x2="650" y2="145" stroke="#f9a825" stroke-width="1.5"/>
<text x="650" y="135" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">エージェント</text>
<text x="650" y="118" text-anchor="middle" fill="#f9a825" font-size="10">機能強化</text>

</svg>
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


---

# Claude Code: CLIエージェント（コード例）

```bash
# 自然言語でタスク指示
claude "すべてのTODOコメントを抽出してissue化"

# 複数ファイル横断
claude "認証ロジックをミドルウェアに分離"
```


---

# AI駆動開発フロー

- <svg viewBox="0 0 800 350" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="350" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">AI駆動開発フロー</text>

<rect x="60" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="130" y="128" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">要件定義</text>
<text x="130" y="148" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="230" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="300" y="128" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI設計案</text>
<text x="300" y="148" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<rect x="400" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="470" y="128" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">人間レビュー</text>
<text x="470" y="148" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="570" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="640" y="128" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI実装</text>
<text x="640" y="148" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<line x1="200" y1="130" x2="225" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="225,123 239,130 225,137" fill="#aaa"/><line x1="370" y1="130" x2="395" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="395,123 409,130 395,137" fill="#aaa"/><line x1="540" y1="130" x2="565" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="565,123 579,130 565,137" fill="#aaa"/>

<rect x="60" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="130" y="268" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AIテスト</text>
<text x="130" y="288" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<rect x="230" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="300" y="268" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">人間テスト</text>
<text x="300" y="288" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="400" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="470" y="268" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">承認?</text>
<text x="470" y="288" text-anchor="middle" fill="#ffffff" font-size="11">判断</text>

<rect x="570" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="640" y="268" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">マージ</text>
<text x="640" y="288" text-anchor="middle" fill="#ffffff" font-size="11">完了</text>

<line x1="200" y1="270" x2="225" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="225,263 239,270 225,277" fill="#aaa"/><line x1="370" y1="270" x2="395" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="395,263 409,270 395,277" fill="#aaa"/><line x1="540" y1="270" x2="565" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="565,263 579,270 565,277" fill="#aaa"/>
<line x1="130" y1="160" x2="130" y2="235" stroke="#aaa" stroke-width="1.5"/>
<polygon points="123,235 130,249 137,235" fill="#aaa"/>
<line x1="470" y1="255" x2="470" y2="210" stroke="#e91e63" stroke-width="1.5"/>
<text x="490" y="230" fill="#e91e63" font-size="10">NG→再実装</text>
</svg>
- 人間とAIの役割分担を明確化した開発プロセス


---

# AI駆動開発フロー（図解）

- <svg viewBox="0 0 800 350" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="350" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">AI駆動開発フロー</text>

<rect x="60" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="130" y="128" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">要件定義</text>
<text x="130" y="148" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="230" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="300" y="128" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI設計案</text>
<text x="300" y="148" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<rect x="400" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="470" y="128" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">人間レビュー</text>
<text x="470" y="148" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="570" y="100" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="640" y="128" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI実装</text>
<text x="640" y="148" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<line x1="200" y1="130" x2="225" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="225,123 239,130 225,137" fill="#aaa"/><line x1="370" y1="130" x2="395" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="395,123 409,130 395,137" fill="#aaa"/><line x1="540" y1="130" x2="565" y2="130" stroke="#aaa" stroke-width="1.5"/><polygon points="565,123 579,130 565,137" fill="#aaa"/>

<rect x="60" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="130" y="268" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AIテスト</text>
<text x="130" y="288" text-anchor="middle" fill="#ffffff" font-size="11">AI</text>

<rect x="230" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="300" y="268" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">人間テスト</text>
<text x="300" y="288" text-anchor="middle" fill="#ffffff" font-size="11">人間</text>

<rect x="400" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="470" y="268" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">承認?</text>
<text x="470" y="288" text-anchor="middle" fill="#ffffff" font-size="11">判断</text>

<rect x="570" y="240" width="140" height="60" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="640" y="268" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">マージ</text>
<text x="640" y="288" text-anchor="middle" fill="#ffffff" font-size="11">完了</text>

<line x1="200" y1="270" x2="225" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="225,263 239,270 225,277" fill="#aaa"/><line x1="370" y1="270" x2="395" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="395,263 409,270 395,277" fill="#aaa"/><line x1="540" y1="270" x2="565" y2="270" stroke="#aaa" stroke-width="1.5"/><polygon points="565,263 579,270 565,277" fill="#aaa"/>
<line x1="130" y1="160" x2="130" y2="235" stroke="#aaa" stroke-width="1.5"/>
<polygon points="123,235 130,249 137,235" fill="#aaa"/>
<line x1="470" y1="255" x2="470" y2="210" stroke="#e91e63" stroke-width="1.5"/>
<text x="490" y="230" fill="#e91e63" font-size="10">NG→再実装</text>
</svg>


---

# AI活用の生産性データ

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">AI活用 生産性向上データ</text>

<text x="220" y="92" text-anchor="end" fill="#ffffff" font-size="13">実装速度</text>
<rect x="230" y="70" width="220" height="36" rx="4" fill="#2196f3" opacity="0.85"/>
<text x="458" y="92" fill="#2196f3" font-size="14" font-weight="bold">55%削減</text>

<text x="220" y="144" text-anchor="end" fill="#ffffff" font-size="13">ボイラープレート作成</text>
<rect x="230" y="122" width="320" height="36" rx="4" fill="#4caf50" opacity="0.85"/>
<text x="558" y="144" fill="#4caf50" font-size="14" font-weight="bold">80%削減</text>

<text x="220" y="196" text-anchor="end" fill="#ffffff" font-size="13">テストコード作成</text>
<rect x="230" y="174" width="240" height="36" rx="4" fill="#e91e63" opacity="0.85"/>
<text x="478" y="196" fill="#e91e63" font-size="14" font-weight="bold">60%削減</text>

<text x="220" y="248" text-anchor="end" fill="#ffffff" font-size="13">バグ検出速度</text>
<rect x="230" y="226" width="160" height="36" rx="4" fill="#f9a825" opacity="0.85"/>
<text x="398" y="248" fill="#f9a825" font-size="14" font-weight="bold">40%削減</text>

<text x="220" y="300" text-anchor="end" fill="#ffffff" font-size="13">ドキュメント作成</text>
<rect x="230" y="278" width="260" height="36" rx="4" fill="#ab47bc" opacity="0.85"/>
<text x="498" y="300" fill="#ab47bc" font-size="14" font-weight="bold">65%削減</text>

<text x="400" y="360" text-anchor="middle" fill="#888" font-size="11">GitHub調査 2024 / 複数の企業調査の平均値</text>
</svg>
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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">AIコード生成のリスクと対策</text>

<rect x="40" y="70" width="300" height="66" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="190" y="94" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">セキュリティ脆弱性</text>
<text x="190" y="116" text-anchor="middle" fill="#ffffff" font-size="11">SQLi, XSS見落とし</text>
<line x1="345" y1="103" x2="415" y2="103" stroke="#aaa" stroke-width="1.5"/>
<polygon points="415,96 429,103 415,110" fill="#aaa"/>
<text x="380" y="96" text-anchor="middle" fill="#aaa" font-size="11">対策</text>
<rect x="420" y="70" width="340" height="66" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
<text x="590" y="106" text-anchor="middle" fill="#4caf50" font-size="12">自動セキュリティスキャン</text>

<rect x="40" y="160" width="300" height="66" rx="8" fill="#16213e" stroke="#e53935" stroke-width="2"/>
<text x="190" y="184" text-anchor="middle" fill="#e53935" font-size="13" font-weight="bold">ライセンス問題</text>
<text x="190" y="206" text-anchor="middle" fill="#ffffff" font-size="11">学習データ由来コード</text>
<line x1="345" y1="193" x2="415" y2="193" stroke="#aaa" stroke-width="1.5"/>
<polygon points="415,186 429,193 415,200" fill="#aaa"/>
<text x="380" y="186" text-anchor="middle" fill="#aaa" font-size="11">対策</text>
<rect x="420" y="160" width="340" height="66" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/>
<text x="590" y="196" text-anchor="middle" fill="#2196f3" font-size="12">ライセンスチェッカー導入</text>

<rect x="40" y="250" width="300" height="66" rx="8" fill="#16213e" stroke="#fb8c00" stroke-width="2"/>
<text x="190" y="274" text-anchor="middle" fill="#fb8c00" font-size="13" font-weight="bold">品質ばらつき</text>
<text x="190" y="296" text-anchor="middle" fill="#ffffff" font-size="11">テストなし本番投入</text>
<line x1="345" y1="283" x2="415" y2="283" stroke="#aaa" stroke-width="1.5"/>
<polygon points="415,276 429,283 415,290" fill="#aaa"/>
<text x="380" y="276" text-anchor="middle" fill="#aaa" font-size="11">対策</text>
<rect x="420" y="250" width="340" height="66" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="590" y="286" text-anchor="middle" fill="#f9a825" font-size="12">CI/CDで自動テスト必須</text>

</svg>
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

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">2026 Web技術 影響度まとめ</text>
<circle cx="481" cy="93" r="23" fill="#2196f3" opacity="0.7"/>
<line x1="400" y1="210" x2="481" y2="93" stroke="#2196f3" stroke-width="1" opacity="0.4"/>
<text x="481" y="97" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">FWパフォーマンス</text><circle cx="587.5" cy="150" r="19" fill="#4caf50" opacity="0.7"/>
<line x1="400" y1="210" x2="587.5" y2="150" stroke="#4caf50" stroke-width="1" opacity="0.4"/>
<text x="587.5" y="154" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">ランタイム競争</text><circle cx="600" cy="274" r="20" fill="#e91e63" opacity="0.7"/>
<line x1="400" y1="210" x2="600" y2="274" stroke="#e91e63" stroke-width="1" opacity="0.4"/>
<text x="600" y="278" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">Web標準化</text><circle cx="400" cy="333.5" r="24" fill="#f9a825" opacity="0.7"/>
<line x1="400" y1="210" x2="400" y2="333.5" stroke="#f9a825" stroke-width="1" opacity="0.4"/>
<text x="400" y="337.5" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">AI統合</text><circle cx="187.5" cy="278" r="21" fill="#ab47bc" opacity="0.7"/>
<line x1="400" y1="210" x2="187.5" y2="278" stroke="#ab47bc" stroke-width="1" opacity="0.4"/>
<text x="187.5" y="282" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">DX向上</text><circle cx="225" cy="154" r="18" fill="#00bcd4" opacity="0.7"/>
<line x1="400" y1="210" x2="225" y2="154" stroke="#00bcd4" stroke-width="1" opacity="0.4"/>
<text x="225" y="158" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">セキュリティ</text>
<circle cx="400" cy="210" r="10" fill="#f9a825"/>
<text x="400" y="214" text-anchor="middle" fill="#000" font-size="9" font-weight="bold">Web</text>
</svg>
- **フロントエンドFW**: React 19、Vue 4、Svelte 5が主流
- **ランタイム**: Bunの高速化が魅力、Node.js安定性も重要
- **WebAPI**: ネイティブ機能充実でフレームワーク依存度低下
- **AI開発**: 補完・生成が当たり前に
- **全体傾向**: パフォーマンス・DX・標準化が三大テーマ


---

# あなたの学習ロードマップ

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e" rx="12"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="17" font-weight="bold">学習ロードマップ</text>
<line x1="80" y1="200" x2="720" y2="200" stroke="#444" stroke-width="2"/>

<circle cx="140" cy="200" r="14" fill="#2196f3"/>
<line x1="140" y1="186" x2="140" y2="140" stroke="#2196f3" stroke-width="1.5"/>
<text x="140" y="130" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">Phase 1</text>
<text x="140" y="113" text-anchor="middle" fill="#ffffff" font-size="11">FW深掘り</text>
<text x="140" y="235" text-anchor="middle" fill="#888" font-size="11">3ヶ月</text>

<circle cx="310" cy="200" r="14" fill="#4caf50"/>
<line x1="310" y1="186" x2="310" y2="140" stroke="#4caf50" stroke-width="1.5"/>
<text x="310" y="130" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">Phase 2</text>
<text x="310" y="113" text-anchor="middle" fill="#ffffff" font-size="11">ビルドツール</text>
<text x="310" y="235" text-anchor="middle" fill="#888" font-size="11">3ヶ月</text>

<circle cx="490" cy="200" r="14" fill="#e91e63"/>
<line x1="490" y1="186" x2="490" y2="140" stroke="#e91e63" stroke-width="1.5"/>
<text x="490" y="130" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Phase 3</text>
<text x="490" y="113" text-anchor="middle" fill="#ffffff" font-size="11">Web API</text>
<text x="490" y="235" text-anchor="middle" fill="#888" font-size="11">3ヶ月</text>

<circle cx="660" cy="200" r="14" fill="#f9a825"/>
<line x1="660" y1="186" x2="660" y2="140" stroke="#f9a825" stroke-width="1.5"/>
<text x="660" y="130" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Phase 4</text>
<text x="660" y="113" text-anchor="middle" fill="#ffffff" font-size="11">AI開発ツール</text>
<text x="660" y="235" text-anchor="middle" fill="#888" font-size="11">3ヶ月</text>

<rect x="100" y="275" width="600" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="300" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">継続学習: 週次トレンドチェック</text>
<text x="400" y="322" text-anchor="middle" fill="#ffffff" font-size="11">State of JS / TC39 / Web.dev / Hacker News</text>
</svg>
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

