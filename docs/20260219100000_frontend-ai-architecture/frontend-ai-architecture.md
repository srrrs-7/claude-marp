---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "フロントエンドアーキテクチャとAIの相性 2026"
footer: "© 2026"
style: |
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# フロントエンドアーキテクチャとAIの相性

- 完全ガイド 2026
- フルスタック・テックリード向け深掘り講座
- アーキテクチャ選択 × AI機能実装 × 相性分析


---

# アジェンダ (1/2)

- **Ch1** フロントエンドアーキテクチャの現在地
- **Ch2** AI開発ツールとフロントエンド
- **Ch3** AIをプロダクトに組み込む
- **Ch4** アーキテクチャ × AI相性分析
- **Ch5** AI対応コンポーネント設計


---

# アジェンダ (2/2)

- **Ch6** パフォーマンスと最適化
- **Ch7** テスト戦略
- **Ch8** セキュリティ考慮点
- **Ch9** 将来展望・まとめ


---

# フロントエンドの10年変遷

- 2014: React登場 — コンポーネント指向SPA時代の幕開け
- 2017: Next.js登場 — SSR × Reactの実用化
- 2020: Jamstack最盛期 — 静的生成(SSG/ISR)が主流へ
- 2022: React Server Components — サーバー・クライアント境界の再定義
- 2023: Islands Architecture(Astro 3.0) — 選択的ハイドレーション
- 2024: AI開発ツール爆発的普及 — Cursor/v0/Copilot
- 2026: AIファーストフロントエンド — エージェントUI・オンデバイス推論


---

# AIがすべてを変えた 2024–2026

- **開発体験の変革**: Cursor/Windsurf → コード補完がペアプログラミングに進化
- **UI生成の台頭**: v0/Lovable → デザインからReactコードが秒単位で生成
- **AI機能の民主化**: Vercel AI SDK → ストリーミングUIが数十行で実装可能
- **アーキテクチャへの影響**: RSC + Server Actions = API Keyの安全な隠蔽が容易に
- **次のフロンティア**: エージェントUI × Human-in-the-Loop × オンデバイス推論


---

<!-- _class: lead -->
# Ch 1

- フロントエンドアーキテクチャの現在地


---

# 主要アーキテクチャパターン一覧

![w:900 center](assets/arch-evolution.svg)


---

# CSR / SPA — リッチUXの代償

- **メリット**: リッチなインタラクション・オフライン対応(PWA)・開発体験が良い
- **デメリット**: 初回JS読み込みが遅い・SEO困難・バンドルサイズ肥大化
- **AIとの相性課題**: クライアントからAI APIを直接呼ぶとAPIキーがDevToolsで丸見え
- **対策**: BFF(Backend for Frontend)またはAPI Proxyを必ず経由する
- **代表実装**: React SPA, Vue SPA, Angular
- **AI相性スコア**: ★★☆☆☆ — BFF追加で★★★★に改善可能


---

# SSR / SSG / ISR — サーバー起点レンダリング

- **SSR** (Server-Side Rendering): リクエスト毎にサーバーでHTML生成 → SEO◎・初回表示速い
- **SSG** (Static Site Generation): ビルド時にHTML生成 → 最速・動的コンテンツは苦手
- **ISR** (Incremental Static Regeneration): 指定間隔で再生成 → 静的の速さ+動的更新
- **AIとの相性**: サーバーサイドでAI APIを安全に呼び出せる → APIキー保護◎
- **ユースケース**: ブログ/EC(SSG)、ダッシュボード(SSR)、カタログ(ISR)
- **AI相性スコア**: ★★★☆☆ — サーバー側でAI呼び出し可能


---

# React Server Components — 境界の再定義

- コンポーネントをサーバーで実行 → クライアントにJS不要(ゼロバンドル可能)
- データフェッチをコンポーネント内に直接記述、クライアントにデータを渡さない
- **AIとの相性**: AIレスポンスをサーバーフェッチし、HTMLとして配信 → APIキー完全保護
- Streaming RSC: `<Suspense>` でAIレスポンスを段階的にストリーム配信
- Server Actions: クライアントから直接サーバー関数を呼び出せる → AIトリガーに最適
- **AI相性スコア**: ★★★★★ — Next.js App Routerの最大の強み


---

# Islands Architecture — 選択的ハイドレーション

- 静的HTML主体 + 必要な部分だけJS(島)を読み込む
- Astroが代表実装: `<Component client:load />` で明示的にハイドレート
- フレームワーク非依存: React/Vue/Svelte を同一ページで混在可能
- **AIとの相性**: AIチャットウィジェットを独立した島として配置 → 他コンテンツに影響なし
- AIウィジェットがクラッシュしても静的コンテンツは正常動作（アイソレーション◎）
- **AI相性スコア**: ★★★★☆ — アイソレーション×段階的追加に最適


---

# Micro Frontends — チーム独立開発

- チームごとに独立したフロントエンドを開発・デプロイ
- 統合方法: Module Federation / iframe / Web Components / ESM CDN
- **AIとの相性**: AIチームが `ai-chat-mfe` として独立デプロイ可能
- AIモデルのアップデートが他チームのデプロイに影響しない（独立性◎）
- ランタイム統合なら各チームが独自のAI SDKバージョンを維持可能
- **AI相性スコア**: ★★★☆☆ — 大規模組織での独立運用に強み


---

<!-- _class: lead -->
# Ch 2

- AI開発ツールとフロントエンド


---

# AI開発ツール全体像（2026年）

![w:900 center](assets/ai-tools-map.svg)


---

# コード補完系: Copilot / Cursor / Windsurf

- **GitHub Copilot**: IDEプラグイン型・コンテキスト補完・企業導入◎・GitHub連携
- **Cursor**: エディタ統合型・チャット+インライン編集・コンポーネントリファクタに強い
- **Windsurf**: エージェント型・ファイル横断編集・大規模リファクタに最適
- **フロントエンド特化の強み**: Reactフック生成・型定義補完・テストコード自動生成
- **効果が高い場面**: 定型的なCRUDコンポーネント・型定義・テストケース生成
- **効果が低い場面**: 独自アーキテクチャのコア設計・複雑なパフォーマンス最適化


---

# UI生成系: v0 / Lovable / Builder.io

- **v0 by Vercel**: プロンプト → React + shadcn/ui + Tailwind を即生成
- **Lovable**: ビジュアルデザイン → フルアプリケーション生成・バックエンドも対応
- **Builder.io AI**: 既存Figmaデザイン → コンポーネントコード変換
- **共通の注意点**: 生成コードは「たたき台」 → 命名・アクセシビリティは必ずレビュー
- **アーキテクチャ制約**: 生成ツールは既存アーキテクチャを理解しない → 統合作業が必要
- **最大の価値**: プロトタイプ速度の向上（ゼロ→形になるまでが10x速い）


---

# アーキテクチャ × AIコード生成の相性原則

- **コンポーネント粒度**: 小さく分割されているほどAI補完が精確（単一責任原則◎）
- **TypeScript型定義**: Props型・ReturnType が明確なほどAI補完品質UP
- **テストカバレッジ**: テストがあるとAIによるリファクタ安全性UP
- **命名一貫性**: 命名規則が統一されているとAIが文脈を正確に把握
- **まとめ**: クリーンコードの原則 ≒ AIとの相性を高める設計原則と一致する
- 逆説: 「AIに頼りやすいコード」=「人間にも読みやすいコード」


---

# AI親和性の高いコンポーネント設計原則

- **① 単一責任**: 1コンポーネント = 1機能 → AIが正確にコンテキストを把握
- **② 明示的なProps型**: `interface ButtonProps { label: string; onClick: () => void }` 必須
- **③ 副作用の分離**: Custom Hooks に副作用を集約 → コンポーネントは純粋に保つ
- **④ 命名の一貫性**: `useXxx` / `XxxComponent` / `XxxProvider` のプレフィックス規則
- **⑤ JSDocコメント**: 複雑なロジックにコメント → AIが意図を誤解しない
- **⑥ テストと型の整合**: テスト名×Props型が整合すると補完精度が大幅UP


---

# AIが書いたコードのレビューポイント

- **セキュリティ**: `dangerouslySetInnerHTML` の使用確認・XSS・インジェクション
- **パフォーマンス**: 不要なre-render（依存配列の漏れ・新しいオブジェクト参照）
- **アクセシビリティ**: `aria-label`/`role` 属性の欠落・キーボード操作対応
- **型安全性**: `any` 型・型アサション(`as`)の多用を警戒
- **エラーハンドリング**: ネットワークエラー・null参照の考慮漏れ
- **テスト可能性**: ハードコードされた依存・グローバル状態への直接アクセス


---

<!-- _class: lead -->
# Ch 3

- AIをプロダクトに組み込む


---

# AI機能の分類と実装パターン

- **① 同期型**: テキスト分類・センチメント分析 → 通常のfetch/axios・応答時間<1s
- **② ストリーミング型**: テキスト生成・チャット → SSE/ReadableStream・数秒〜数十秒
- **③ 非同期処理型**: 画像生成・音声変換 → polling/webhook・数十秒〜数分
- **④ リアルタイム型**: 音声通話AI・ライブ翻訳 → WebSocket双方向通信
- **選択基準**: 応答時間・双方向性・エラーリカバリの要件で決定
- **最重要**: ストリーミング型が現代AIアプリの主流 → UX改善効果が最大


---

# Vercel AI SDK — フロントエンドAIの標準ツールキット

![w:900 center](assets/vercel-ai-sdk.svg)


---

# ストリーミングUI 3つのパターン

![w:900 center](assets/streaming-patterns.svg)


---

# useChat / useCompletion — Vercel AI SDK

- Vercel AI SDK の `useChat` フックでチャットUIを数十行で実装できる

```tsx
import { useChat } from 'ai/react'

export function ChatUI() {
  const { messages, input, handleInputChange,
          handleSubmit, isLoading } = useChat({ api: '/api/chat' })

  return (
    <div>
      {messages.map(m => (
        <div key={m.id} data-role={m.role}>{m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '生成中...' : '送信'}
        </button>
      </form>
    </div>
  )
}
```


---

# Server Actions × AI Streaming (Next.js 15)

- RSC + Server Actions でAPIキーをサーバーに閉じ込めながらAIストリーミングを実現

```typescript
'use server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'

export async function generateResponse(prompt: string) {
  const stream = createStreamableValue('')
  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      system: 'あなたは親切なアシスタントです。',
      prompt,
    })
    for await (const delta of textStream) { stream.update(delta) }
    stream.done()
  })()
  return { output: stream.value }  // streamable value を返す
}
```


---

# SSE vs WebSocket vs ReadableStream 比較

- **SSE** (Server-Sent Events): HTTP/1.1互換・一方向・実装シンプル → AI応答配信の主流
- **WebSocket**: 双方向・低レイテンシ → 音声AI・リアルタイム翻訳など双方向が必要な場合
- **ReadableStream** (Vercel AI SDK): fetchベース・Edge対応・最もシンプルな実装
- **推奨**: テキスト生成/チャット → ReadableStream or SSE / 双方向通話 → WebSocket
- **注意**: SSEはHTTP/2 multiplexingで複数ストリームを効率化できる


---

# BFF パターン — APIキーを安全に管理

![w:900 center](assets/bff-pattern.svg)


---

# RAG UI パターン — 社内ドキュメント検索

- **インデックス構築**: ドキュメントアップロード → チャンク分割 → Embedding → ベクトルDB保存
- **クエリフロー**: ユーザー質問 → クエリEmbedding → 類似検索 → コンテキスト付きLLM呼び出し
- **引用元表示UI**: 回答に使われたドキュメント名・ページ番号を表示（信頼性UP）
- **実装スタック**: LangChain.js / Vercel AI SDK + Pinecone / ChromaDB
- **フロントエンド責務**: ファイルアップロードUI・検索状態表示・引用ハイライト
- **アーキテクチャ**: Next.js Route Handlers が Embedding→検索→LLM呼び出しをサーバー側で処理


---

# マルチターン会話の状態管理

- **① クライアント側** (useState/Zustand): シンプル・ページリロードで消える
- **② サーバーDB** (PostgreSQL/KV): 永続化・マルチデバイス対応・認証必須
- **③ RSC + Server Actions**: サーバー管理・クライアントは軽量・Next.js最適解
- **会話履歴の長さ制限**: トークン数管理が必須 → 古いメッセージを要約・切り捨て
- **Vercel AI SDK**: `useChat` が会話履歴を自動管理 → `/api/chat` にメッセージ配列を送信


---

# マルチモーダルUI — 画像・音声入力

- **画像入力**: `<input type="file" accept="image/*">` → FileReader → Base64 → Vision API
- **ドラッグ&ドロップ**: `onDrop` で File オブジェクト取得 → プレビュー表示 → API送信
- **音声入力**: `MediaRecorder API` → 音声録音 → Whisper API → テキスト変換
- **ビデオ分析**: Canvas で フレーム抽出 → Base64 → GPT-4o Vision で解析
- **Vercel AI SDK**: `useChat` の `experimental_attachments` でファイル添付対応済み


---

# Edge Runtime × AI推論

- **Vercel Edge Functions**: ユーザーに近いCDNエッジでAI推論 → TTFT最小化
- **Cloudflare Workers**: Workers AI + エッジ推論 → ゼロコールドスタート
- **エッジの制限**: Node.js API非対応・実行時間上限あり・使えるパッケージが限られる
- **AI SDKのEdge対応**: Vercel AI SDK は全関数がEdge Runtimeで動作する設計
- **Durable Objects** (Cloudflare): エッジでの状態管理 → 会話履歴をエッジに保持可能


---

<!-- _class: lead -->
# Ch 4

- アーキテクチャ × AI相性分析


---

# SPA × AI — 課題と対処法

- **課題①: APIキー漏洩**: DevToolsのNetworkタブでAI APIキーが丸見えになる
- **課題②: CORS**: AI APIの多くはブラウザからの直接呼び出しをブロック
- **課題③: バンドルサイズ**: AI SDKをクライアントに含めると数十KB肥大化
- **対策①: BFF必須**: Next.js Route Handlers や Express で AIプロキシを実装
- **対策②: 動的インポート**: AIウィジェットを `React.lazy()` で遅延読み込み
- **AI相性スコア**: ★★☆☆☆ → BFF追加 + 動的インポートで ★★★★ に改善


---

# Next.js App Router × AI — 最高相性の理由

- **Server Components**: AIレスポンスをサーバーフェッチ → APIキーがブラウザに届かない
- **Server Actions**: クライアントから直接サーバー関数を呼ぶ → RPCライクなAI呼び出し
- **Streaming RSC**: `<Suspense>` × `createStreamableUI` でAI応答を段階的に描画
- **Route Handlers**: `/api/chat` をEdge Runtimeで動かして全世界に低レイテンシ配信
- **Caching**: `fetch` キャッシュ × `revalidate` でAIレスポンスをISRキャッシュ
- **AI相性スコア**: ★★★★★ — サーバー/クライアント分離がAIに完璧にマッチ


---

# React Server Components × AI Streaming

- RSCのSuspense境界とServer Actionsを組み合わせたAIストリーミング実装

```tsx
// app/ai-page/page.tsx (Server Component)
import { Suspense } from 'react'
import { generateResponse } from '../actions'
import { StreamingOutput } from '@/components/StreamingOutput'

export default async function AIPage() {
  const { output } = await generateResponse('最新のReactトレンドを教えて')
  return (
    <main>
      <h1>AI回答</h1>
      <Suspense fallback={<div aria-live="polite">生成中...</div>}>
        <StreamingOutput stream={output} />
      </Suspense>
    </main>
  )
}
```


---

# Islands Architecture × AI

- Astroでメインコンテンツは静的HTML → AIチャットウィジェットだけを島として配置
- `<ChatWidget client:load />` で必要なタイミングにのみJSをハイドレート
- AIウィジェットがJSエラーでクラッシュしても静的コンテンツは正常動作
- **段階的なAI機能追加**: 既存静的サイトに `client:visible` で遅延ロードAI機能を追加
- **AI相性スコア**: ★★★★☆ — アイソレーション性と段階的導入のしやすさが強み


---

# Micro Frontends × AI

- AIチームが `ai-assistant-mfe` として独立開発・デプロイ → 他チームに影響なし
- **Module Federation**: Webpack 5 でAIコンポーネントを動的にリモートロード
- AIモデルのアップデート・SDK更新が他チームのリリースサイクルに干渉しない
- **独立したバンドル**: AIウィジェットのみ遅延ロード → 非AI部分の速度を維持
- **AI相性スコア**: ★★★☆☆ — 組織規模と独立デプロイが必要な場合に強み


---

# Edge-first × AI — レイテンシ最小化

- **Cloudflare Workers + Workers AI**: ユーザーに最も近いエッジでAI推論実行
- **Vercel Edge + OpenAI Streaming**: CDNエッジ → OpenAI API → ストリーミング返送
- **TTFT削減効果**: リージョン配置で東京ユーザーへのTTFTが50-80ms短縮
- **Durable Objects**: エッジで会話状態を管理 → DBへのラウンドトリップを省略
- **AI相性スコア**: ★★★★★ — グローバルユーザーへの低レイテンシAI配信に最適


---

# GraphQL × AI — 型安全なAIインターフェース

- **Schemaでレスポンス型を強制**: AIの出力をGraphQL型で定義 → クライアントに型安全を保証
- **Subscription**: GraphQLサブスクリプションでAIストリーミングを実現（WebSocketベース）
- **DataLoader**: N+1問題をバッチ化 → AI embeddings生成のバッチ最適化
- **注意**: REST + SSE のほうが実装シンプル → 既存GraphQL環境でのみ採用を検討
- **AI相性スコア**: ★★★☆☆ — 型安全重視・既存GraphQL環境での採用が合理的


---

# 総合相性マトリクス

![w:900 center](assets/arch-ai-compat.svg)


---

# 推奨スタック — ユースケース別

![w:900 center](assets/recommended-stack.svg)


---

<!-- _class: lead -->
# Ch 5

- AI対応コンポーネント設計


---

# AIコンポーネントの責務分離

![w:900 center](assets/component-design.svg)


---

# Streaming Text コンポーネント実装

- ストリーミングテキストをリアルタイムで表示するコンポーネント

```tsx
'use client'
import { useState, useEffect } from 'react'
import { readStreamableValue } from 'ai/rsc'

interface Props { stream: AsyncIterable<string> }

export function StreamingText({ stream }: Props) {
  const [text, setText] = useState('')

  useEffect(() => {
    ;(async () => {
      for await (const delta of readStreamableValue(stream)) {
        setText(prev => prev + (delta ?? ''))
      }
    })()
  }, [stream])

  return <p aria-live="polite">{text}<span className="animate-pulse">▌</span></p>
}
```


---

# Optimistic UI — AI応答を即座に表示

- メッセージ送信を楽観的に表示し、失敗時にロールバックするパターン

```typescript
const [messages, setMessages] = useState<Message[]>([])

async function sendMessage(text: string) {
  const tempId = Date.now()
  // 楽観的に即座に追加
  setMessages(prev => [...prev,
    { id: tempId, role: 'user', content: text, status: 'sending' }
  ])
  try {
    const reply = await fetchAIResponse(text)
    setMessages(prev => [
      ...prev.map(m => m.id === tempId ? { ...m, status: 'sent' } : m),
      { id: Date.now(), role: 'assistant', content: reply }
    ])
  } catch {
    setMessages(prev =>
      prev.map(m => m.id === tempId ? { ...m, status: 'failed' } : m)
    )
  }
}
```


---

# Error Boundary × AI フォールバック

- AI機能専用のErrorBoundaryでUXを保護し、再試行フローを提供する

```tsx
class AIErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    if (this.state.hasError) return (
      <div role="alert" className="ai-fallback">
        <p>⚠️ AI機能が一時的に利用できません</p>
        <button onClick={() => this.setState({ hasError: false })}>
          再試行
        </button>
      </div>
    )
    return this.props.children
  }
}
```


---

# プログレッシブUI — 3段階の表示戦略

- **① Skeleton** (0–500ms): アウトラインのみ → ユーザーは「ロード中」と認識
- **② Partial** (500ms–2s): 最初のトークンが届き始め → テキストが現れる
- **③ Full** (2s–): 全文表示 + アクションボタン（コピー・再生成）が出現
- **UXの重要点**: ユーザーはテキストが出た瞬間から読み始める → **TTFTが最重要指標**
- 実装: `isLoading` → Skeleton → ストリーミング開始で即切替 → `isDone` でアクション表示


---

# アクセシビリティ × ストリーミングUI

- **`aria-live="polite"`**: ストリーミングテキストをスクリーンリーダーが段階的に読み上げ
- **`aria-busy="true/false"`**: ローディング状態をスクリーンリーダーに通知
- **`role="log"`**: チャット履歴要素に付与 → スクリーンリーダーが新着メッセージを通知
- **フォーカス管理**: メッセージ送信後、返答エリアに自動フォーカス移動
- **`prefers-reduced-motion`**: ストリーミングカーソルアニメーションを無効化
- **`prefers-contrast`**: ハイコントラストモードでAIとユーザーメッセージを区別


---

<!-- _class: lead -->
# Ch 6

- パフォーマンスと最適化


---

# AI機能固有のパフォーマンス指標

![w:900 center](assets/perf-metrics.svg)


---

# Time to First Token (TTFT) 最適化

- **モデル配置**: ユーザーに近いリージョン/エッジに配置 → RTT削減で50-100ms改善
- **モデル選択**: GPT-4o → GPT-4o mini で TTFT を30-50%削減（品質はほぼ同等）
- **Prompt Caching**: Anthropicのキャッシュ機能でシステムプロンプトのTTFTを90%削減
- **並列フェッチ**: ストリーミング開始前にDB・外部APIをParallel fetchで事前取得
- **ウォームアップ**: Route Handlerを事前リクエストでコールドスタートを回避


---

# ストリーミングバッファリング戦略

- **文字/トークン単位**: 最高のストリーミング体験・ネットワーク負荷が大きい
- **文章単位**: 句点・改行でバースト送信・ネットワーク効率◎・少しカクつく
- **時間間隔**: 100ms毎にバッファをflush → バランス型
- **推奨**: SSEで文字/トークン単位（体験優先）・WebSocketで文章単位（効率優先）
- **Vercel AI SDK**: デフォルトでトークン単位ストリーミング → カスタマイズは `smoothStream()` を使用


---

# AI応答のキャッシュ設計

- **Exact Match Cache**: 完全一致クエリをKV（Redis/Upstash）にキャッシュ
- **Semantic Cache**: ベクトル類似度で近いクエリをキャッシュ → GPTCache / Momento
- **TTL設計**: 時事情報は短TTL(1h)・FAQ/静的情報は長TTL(24h〜7d)
- **注意**: 非決定論的生成(temperature>0)のキャッシュ共有は品質劣化リスクあり
- **コスト削減効果**: 同一クエリへのキャッシュで API コストを最大80%削減事例あり


---

# バンドルサイズ最適化

- **AI SDKのバンドルサイズ**: `ai` package ~60KB (gzip) → 遅延インポートで初回ロードに含めない
- **動的インポート**: `const { useChat } = await import('ai/react')` でチャット画面遷移時のみロード
- **Tree Shaking**: `@ai-sdk/openai` はTree-shaking対応 → 使わないプロバイダは除外される
- **Server Componentへ移行**: クライアントAI処理をServer Componentで代替 → クライアントJS削減
- **Lazy Loading**: AIウィジェットは最後に読み込み → LCPやTTIの悪化を防ぐ


---

<!-- _class: lead -->
# Ch 7

- テスト戦略


---

# AI統合テストの課題

- **非決定論的**: 同じ入力でも異なる出力 → アサーション条件を柔軟に設計する必要あり
- **コスト**: テストのたびにAPI費用が発生 → CI実行回数をコントロールする必要あり
- **レート制限**: CIで大量テストを並列実行するとAPIレート制限に到達する
- **ストリーミング**: ReadableStreamの非同期テストは通常のPromiseテストより複雑
- **対策**: AIを完全にモック化・ゴールデンファイルテスト・E2Eはスモークテストのみ
- **テスト分類**: Unit(AIモック) / Integration(MSWモック) / E2E(本物API・CI限定実行)


---

# LLMモック戦略 — MSWでストリームをシミュレート

- MSW(Mock Service Worker)でSSEストリームをテスト用にシミュレート

```typescript
import { http, HttpResponse } from 'msw'

export const aiHandlers = [
  http.post('/api/chat', () => {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(ctrl) {
        ['こんにちは', '！', ' 何か', 'お手伝い', 'できますか？'].forEach(c =>
          ctrl.enqueue(
            encoder.encode(`data: {"content":"${c}"}

`)
          )
        )
        ctrl.close()
      }
    })
    return new HttpResponse(stream,
      { headers: { 'Content-Type': 'text/event-stream' } }
    )
  })
]
```


---

# ストリーミングUIのテスト

- Testing Libraryでストリーミングテキストが最終的に表示されることを検証

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from './mocks/server'
import { aiHandlers } from './mocks/aiHandlers'
import { ChatUI } from './ChatUI'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('AIストリーミングレスポンスが表示される', async () => {
  server.use(...aiHandlers)
  render(<ChatUI />)
  await userEvent.type(screen.getByRole('textbox'), 'こんにちは{Enter}')
  await screen.findByText('こんにちは！ 何かお手伝いできますか？')
})
```


---

<!-- _class: lead -->
# Ch 8

- セキュリティ考慮点


---

# クライアントサイドのAIリスク

- **① APIキー漏洩**: クライアントにAPIキーを含めると誰でも取得・不正利用可能
- **② プロンプトインジェクション**: ユーザー入力でシステムプロンプトを改変・脱獄
- **③ コンテンツインジェクション**: AI出力にJavaScriptやHTMLを埋め込んでXSS
- **④ SSRF**: AI経由で内部ネットワーク・メタデータAPIへのアクセスを誘導
- **⑤ 過度な権限**: Function Callingでファイル削除・DBアクセスなど危険な操作を許可
- **最重要原則**: AIは外部入力を含む → 全出力を「信頼しない入力」として扱う


---

# プロンプトインジェクション対策

- 構造化プロンプト + 入力サニタイズ + 長さ制限でインジェクションを防ぐ

```typescript
// NG: ユーザー入力をシステムプロンプトに直接連結
const bad = `You are helpful. User: ${userInput} Answer:`

// OK: 構造化プロンプト + サニタイズ
function buildSecurePrompt(userInput: string): ChatMessage[] {
  const sanitized = userInput
    .replace(/<[^>]*>/g, '')  // HTMLタグ除去
    .replace(/[{}\[\]]/g, '') // テンプレート文字除去
    .substring(0, 1000)       // 長さ制限
  return [
    { role: 'system', content: 'あなたは社内アシスタントです。' },
    // ユーザー入力を明示的にラベリングして区切る
    { role: 'user', content: `ユーザーの質問: ${sanitized}` }
  ]
}
```


---

# API Key管理 — 3つのパターン

- **❌ 最悪**: `REACT_APP_OPENAI_KEY` でクライアントに直接埋め込み → 絶対にNG
- **✅ 基本**: Next.js Route Handlers / Express API をプロキシとして使用
- **✅ ベスト**: BFF + レート制限 + 認証チェック + IP制限を組み合わせる
- **BFFの実装例**: `/api/chat` → 認証確認 → ユーザー毎レート制限 → OpenAI API呼び出し
- **Vercel環境変数**: `OPENAI_API_KEY`（`NEXT_PUBLIC_` プレフィックスなし）でサーバー専用化


---

<!-- _class: lead -->
# Ch 9

- 将来展望・まとめ


---

# WebGPU × オンデバイス推論

- **WebGPU API**: ブラウザからGPUに直接アクセス → WebGLより10-100x高速な計算
- **Transformers.js**: Hugging FaceのWebGPU対応ライブラリ → 100+モデルをブラウザで動作
- **WebLLM**: ブラウザ内LLM実行 → Llama 3.2-3B (3GB) が Chrome / Safari で動作済み
- **ユースケース**: プライバシー重視機能(医療・法律)・オフライン動作・レイテンシゼロ
- **現実的な制約**: モデルダウンロード3-5GB・推論速度はサーバーの1/5〜1/10程度


---

# MCP × フロントエンド

- **Model Context Protocol**: AIとツールの標準通信プロトコル（Anthropic発）
- **ブラウザ拡張 × MCP**: Chrome拡張がMCPサーバーとして機能 → AIがブラウザを操作
- **Web Automationエージェント**: MCPでDOM操作・フォーム入力・ナビゲーションを標準化
- **フロントエンドのUI操作をAIが直接実行**: アクセシビリティツリーを通じたUI理解
- **展望**: MCP対応フロントエンドが標準になることでAIエージェントの利用率が急増


---

# エージェントUI パターン

![w:900 center](assets/agent-ui-flow.svg)


---

# フロントエンドエンジニアの必須AIスキルロードマップ

- **Level 1** AI補助開発: Copilot/Cursor活用・プロンプトエンジニアリング基礎
- **Level 2** AI機能実装: Vercel AI SDK・ストリーミングUI・BFFパターン
- **Level 3** RAG/Agent UI設計: LangChain.js・ベクトルDB・エージェント状態UI
- **Level 4** エッジAI・オンデバイス: Transformers.js・WebGPU・Workers AI
- **共通基盤**: TypeScript型安全・パフォーマンス計測(TTFT)・セキュリティ(インジェクション対策)


---

# まとめ — フロントエンド × AI ベストプラクティス

- **① APIキーは絶対にクライアントに置かない** → BFF / Server Actions 必須
- **② TTFT最優先** → Edge配置・小型モデル選択・Prompt Caching
- **③ Next.js App Router + RSC + Server Actions** = 現時点のAI最適フロントエンド構成
- **④ AIコンポーネントはErrorBoundaryで包む** → AI障害がUX全体に波及しない
- **⑤ LLMをモック化してCI/CDを高速・低コストに保つ** → MSW活用
- **参考**: [Vercel AI SDK](https://sdk.vercel.ai) / [AI SDK Examples](https://github.com/vercel/ai) / [WebLLM](https://webllm.mlc.ai) / [Transformers.js](https://huggingface.co/docs/transformers.js)

