---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "フロントエンドアーキテクチャとAIの相性 2026"
footer: "© 2026"
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

> *フロントエンドアーキテクチャとAI開発ツール・AI機能実装・セキュリティを体系的に網羅*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">アジェンダ (1/2)</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- **Ch1** フロントエンドアーキテクチャの現在地
- **Ch2** AI開発ツールとフロントエンド
- **Ch3** AIをプロダクトに組み込む
- **Ch4** アーキテクチャ × AI相性分析
- **Ch5** AI対応コンポーネント設計


---

# アジェンダ (2/2)

> *パフォーマンス・テスト・セキュリティ・将来展望の4章でAIフロントエンド開発を完全習得*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">アジェンダ (2/2)</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
- **Ch6** パフォーマンスと最適化
- **Ch7** テスト戦略
- **Ch8** セキュリティ考慮点
- **Ch9** 将来展望・まとめ


---

# フロントエンドの10年変遷（1/2）

> *2014年Reactから2025年RSC・Islandsまで、フロントエンドは4世代進化した*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">フロントエンドの10年変遷</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- 2014: React登場 — コンポーネント指向SPA時代の幕開け
- 2017: Next.js登場 — SSR × Reactの実用化
- 2020: Jamstack最盛期 — 静的生成(SSG/ISR)が主流へ


---

# フロントエンドの10年変遷（2/2）

> *RSC・Islands・Micro Frontendsへと進化し2026年はAIファーストUIが標準になる*

- 2022: React Server Components — サーバー・クライアント境界の再定義
- 2023: Islands Architecture(Astro 3.0) — 選択的ハイドレーション
- 2024: AI開発ツール爆発的普及 — Cursor/v0/Copilot
- 2026: AIファーストフロントエンド — エージェントUI・オンデバイス推論


---

# AIがすべてを変えた 2024–2026

> *Cursor/v0/Vercel AI SDKでUI生成・ストリーミング実装・APIキー保護がすべて変わった*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AIがすべてを変えた 2024–2026</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
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

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">フロントエンドアーキテクチャの進化</text>

  <!-- Timeline line -->
  <line x1="60" y1="200" x2="900" y2="200" stroke="#374151" stroke-width="2"/>

  <!-- MPA -->
  <circle cx="90" cy="200" r="14" fill="#374151" stroke="#6b7280" stroke-width="2"/>
  <text x="90" y="175" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">〜2013</text>
  <rect x="40" y="220" width="100" height="70" rx="6" fill="#1f2937" stroke="#4b5563" stroke-width="1.5"/>
  <text x="90" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">MPA</text>
  <text x="90" y="256" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">サーバー</text>
  <text x="90" y="270" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">レンダリング</text>
  <text x="90" y="285" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">JSPなど</text>

  <!-- Arrow -->
  <line x1="104" y1="200" x2="200" y2="200" stroke="#374151" stroke-width="1.5"/>
  <polygon points="204,200 196,195 196,205" fill="#374151"/>

  <!-- SPA -->
  <circle cx="220" cy="200" r="14" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="220" y="175" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">2014–</text>
  <rect x="170" y="220" width="100" height="70" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="220" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">SPA / CSR</text>
  <text x="220" y="256" text-anchor="middle" font-size="10" fill="#93c5fd" font-family="sans-serif">React / Vue</text>
  <text x="220" y="270" text-anchor="middle" font-size="10" fill="#93c5fd" font-family="sans-serif">Angular</text>
  <text x="220" y="285" text-anchor="middle" font-size="10" fill="#93c5fd" font-family="sans-serif">クライアントJS</text>

  <!-- Arrow -->
  <line x1="234" y1="200" x2="340" y2="200" stroke="#374151" stroke-width="1.5"/>
  <polygon points="344,200 336,195 336,205" fill="#374151"/>

  <!-- SSR/SSG -->
  <circle cx="360" cy="200" r="14" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="360" y="175" text-anchor="middle" font-size="11" fill="#4ade80" font-family="sans-serif">2017–</text>
  <rect x="300" y="220" width="120" height="70" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="360" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">SSR / SSG</text>
  <text x="360" y="256" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">Next.js / Nuxt</text>
  <text x="360" y="270" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">Gatsby / Hugo</text>
  <text x="360" y="285" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">SEO ◎ / 高速</text>

  <!-- Arrow -->
  <line x1="374" y1="200" x2="480" y2="200" stroke="#374151" stroke-width="1.5"/>
  <polygon points="484,200 476,195 476,205" fill="#374151"/>

  <!-- RSC -->
  <circle cx="500" cy="200" r="14" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="500" y="175" text-anchor="middle" font-size="11" fill="#fb923c" font-family="sans-serif">2022–</text>
  <rect x="440" y="220" width="120" height="70" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="500" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#fb923c" font-family="sans-serif">RSC</text>
  <text x="500" y="256" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">Server Components</text>
  <text x="500" y="270" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">Server Actions</text>
  <text x="500" y="285" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">AIキー保護 ★</text>

  <!-- Arrow -->
  <line x1="514" y1="200" x2="610" y2="200" stroke="#374151" stroke-width="1.5"/>
  <polygon points="614,200 606,195 606,205" fill="#374151"/>

  <!-- Islands -->
  <circle cx="630" cy="200" r="14" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
  <text x="630" y="175" text-anchor="middle" font-size="11" fill="#a5b4fc" font-family="sans-serif">2023–</text>
  <rect x="570" y="220" width="120" height="70" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="630" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">Islands</text>
  <text x="630" y="256" text-anchor="middle" font-size="10" fill="#c7d2fe" font-family="sans-serif">Astro / Fresh</text>
  <text x="630" y="270" text-anchor="middle" font-size="10" fill="#c7d2fe" font-family="sans-serif">選択的ハイドレ</text>
  <text x="630" y="285" text-anchor="middle" font-size="10" fill="#818cf8" font-family="sans-serif">AI島 ★★</text>

  <!-- Arrow -->
  <line x1="644" y1="200" x2="740" y2="200" stroke="#374151" stroke-width="1.5"/>
  <polygon points="744,200 736,195 736,205" fill="#374151"/>

  <!-- Edge AI -->
  <circle cx="760" cy="200" r="14" fill="#312e81" stroke="#8b5cf6" stroke-width="2"/>
  <text x="760" y="175" text-anchor="middle" font-size="11" fill="#c4b5fd" font-family="sans-serif">2024–</text>
  <rect x="700" y="220" width="120" height="70" rx="6" fill="#312e81" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="760" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Edge-first</text>
  <text x="760" y="256" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">CF Workers</text>
  <text x="760" y="270" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">Vercel Edge</text>
  <text x="760" y="285" text-anchor="middle" font-size="10" fill="#a78bfa" font-family="sans-serif">TTFT最小 ★★★</text>

  <!-- Arrow -->
  <line x1="774" y1="200" x2="860" y2="200" stroke="#f97316" stroke-width="2"/>
  <polygon points="864,200 856,195 856,205" fill="#f97316"/>

  <!-- AI-first -->
  <circle cx="880" cy="200" r="18" fill="#7c2d12" stroke="#f97316" stroke-width="2.5" style="filter:drop-shadow(0 0 8px rgba(249,115,22,0.5))"/>
  <text x="880" y="175" text-anchor="middle" font-size="11" fill="#fb923c" font-family="sans-serif">2026</text>
  <rect x="820" y="220" width="120" height="70" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="880" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#fb923c" font-family="sans-serif">AI-first</text>
  <text x="880" y="256" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">Agent UI</text>
  <text x="880" y="270" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">On-device AI</text>
  <text x="880" y="285" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">WebGPU ★★★</text>

  <!-- AI相性 label at top -->
  <text x="480" y="145" text-anchor="middle" font-size="13" fill="#f97316" font-family="sans-serif">← AIとの相性スコアが右に進むほど向上 →</text>

  <!-- Bottom note -->
  <text x="480" y="430" text-anchor="middle" font-size="12" fill="#6b7280" font-family="sans-serif">各アーキテクチャはスタック可能 — Next.js App Router は SSR + RSC + Edge を統合</text>
</svg>


---

# CSR / SPA — リッチUXの代償

> *CSR/SPAでAI APIを直接呼ぶとAPIキーがDevToolsで丸見えになる—BFF経由が必須*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">CSR / SPA — リッチUXの代償</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **メリット**: リッチなインタラクション・オフライン対応(PWA)・開発体験が良い
- **デメリット**: 初回JS読み込みが遅い・SEO困難・バンドルサイズ肥大化
- **AIとの相性課題**: クライアントからAI APIを直接呼ぶとAPIキーがDevToolsで丸見え
- **対策**: BFF(Backend for Frontend)またはAPI Proxyを必ず経由する
- **代表実装**: React SPA, Vue SPA, Angular
- **AI相性スコア**: ★★☆☆☆ — BFF追加で★★★★に改善可能


---

# SSR / SSG / ISR — サーバー起点レンダリング

> *SSR/ISRはサーバー側でAI APIを安全に呼び出せAPIキーをブラウザに渡さずに済む*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">SSR / SSG / ISR — サーバー起点レンダリング</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **SSR** (Server-Side Rendering): リクエスト毎にサーバーでHTML生成 → SEO◎・初回表示速い
- **SSG** (Static Site Generation): ビルド時にHTML生成 → 最速・動的コンテンツは苦手
- **ISR** (Incremental Static Regeneration): 指定間隔で再生成 → 静的の速さ+動的更新
- **AIとの相性**: サーバーサイドでAI APIを安全に呼び出せる → APIキー保護◎
- **ユースケース**: ブログ/EC(SSG)、ダッシュボード(SSR)、カタログ(ISR)
- **AI相性スコア**: ★★★☆☆ — サーバー側でAI呼び出し可能


---

# React Server Components — 境界の再定義

> *RSC+Server Actionsでクライアントにゼロバンドルで配信しAPIキーを完全に保護できる*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">React Server Components — 境界の再定義</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- コンポーネントをサーバーで実行 → クライアントにJS不要(ゼロバンドル可能)
- データフェッチをコンポーネント内に直接記述、クライアントにデータを渡さない
- **AIとの相性**: AIレスポンスをサーバーフェッチし、HTMLとして配信 → APIキー完全保護
- Streaming RSC: `<Suspense>` でAIレスポンスを段階的にストリーム配信
- Server Actions: クライアントから直接サーバー関数を呼び出せる → AIトリガーに最適
- **AI相性スコア**: ★★★★★ — Next.js App Routerの最大の強み


---

# Islands Architecture — 選択的ハイドレーション

> *IslandsでAIウィジェットを独立した島に分離しクラッシュが静的コンテンツに波及しない*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Islands Architecture — 選択的ハイドレーション</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
- 静的HTML主体 + 必要な部分だけJS(島)を読み込む
- Astroが代表実装: `<Component client:load />` で明示的にハイドレート
- フレームワーク非依存: React/Vue/Svelte を同一ページで混在可能
- **AIとの相性**: AIチャットウィジェットを独立した島として配置 → 他コンテンツに影響なし
- AIウィジェットがクラッシュしても静的コンテンツは正常動作（アイソレーション◎）
- **AI相性スコア**: ★★★★☆ — アイソレーション×段階的追加に最適


---

# Micro Frontends — チーム独立開発

> *Micro Frontendsでai-chat-mfeを独立デプロイし他チームのリリースサイクルから切り離す*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Micro Frontends — チーム独立開発</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
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

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">AI開発ツール全体像（2026年）</text>

  <!-- Axes -->
  <line x1="80" y1="60" x2="80" y2="420" stroke="#374151" stroke-width="1.5"/>
  <line x1="80" y1="420" x2="900" y2="420" stroke="#374151" stroke-width="1.5"/>
  <text x="80" y="55" text-anchor="middle" font-size="12" fill="#6b7280" font-family="sans-serif">自動化レベル</text>
  <text x="480" y="450" text-anchor="middle" font-size="12" fill="#6b7280" font-family="sans-serif">ユースケース特化度 →</text>
  <!-- Y axis labels -->
  <text x="70" y="90" text-anchor="end" font-size="11" fill="#6b7280" font-family="sans-serif">高</text>
  <text x="70" y="420" text-anchor="end" font-size="11" fill="#6b7280" font-family="sans-serif">低</text>

  <!-- Category: コード補完系 -->
  <text x="200" y="395" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">── コード補完系 ──</text>

  <!-- GitHub Copilot -->
  <ellipse cx="180" cy="330" rx="65" ry="32" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="180" y="325" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">GitHub Copilot</text>
  <text x="180" y="342" text-anchor="middle" font-size="10" fill="#93c5fd" font-family="sans-serif">補完・チャット</text>

  <!-- Cursor -->
  <ellipse cx="310" cy="295" rx="60" ry="32" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="310" y="290" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Cursor</text>
  <text x="310" y="308" text-anchor="middle" font-size="10" fill="#93c5fd" font-family="sans-serif">チャット+編集</text>

  <!-- Windsurf -->
  <ellipse cx="420" cy="245" rx="60" ry="32" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
  <text x="420" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">Windsurf</text>
  <text x="420" y="258" text-anchor="middle" font-size="10" fill="#c7d2fe" font-family="sans-serif">エージェント型</text>

  <!-- Category: UI生成系 -->
  <text x="660" y="395" text-anchor="middle" font-size="11" fill="#4ade80" font-family="sans-serif">── UI生成系 ──</text>

  <!-- v0 -->
  <ellipse cx="620" cy="200" rx="60" ry="32" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="620" y="195" text-anchor="middle" font-size="13" font-weight="bold" fill="#4ade80" font-family="sans-serif">v0 by Vercel</text>
  <text x="620" y="213" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">React UI生成</text>

  <!-- Lovable -->
  <ellipse cx="750" cy="170" rx="65" ry="32" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="750" y="165" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">Lovable</text>
  <text x="750" y="183" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">フルアプリ生成</text>

  <!-- Builder.io -->
  <ellipse cx="860" cy="140" rx="65" ry="32" fill="#0c1a14" stroke="#16a34a" stroke-width="1.5"/>
  <text x="860" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">Builder.io AI</text>
  <text x="860" y="153" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">Figma→コード</text>

  <!-- Category: AI SDK -->
  <text x="240" y="120" text-anchor="middle" font-size="11" fill="#fb923c" font-family="sans-serif">── AI統合SDK ──</text>

  <!-- Vercel AI SDK -->
  <rect x="100" y="68" width="180" height="60" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="190" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#fb923c" font-family="sans-serif">Vercel AI SDK</text>
  <text x="190" y="110" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">useChat / streamText</text>

  <!-- LangChain.js -->
  <rect x="310" y="68" width="160" height="60" rx="8" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="390" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#fb923c" font-family="sans-serif">LangChain.js</text>
  <text x="390" y="110" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">RAG / Chain / Agent</text>

  <!-- Legend arrows -->
  <text x="480" y="468" text-anchor="middle" font-size="11" fill="#4b5563" font-family="sans-serif">汎用ツール（左）→ 特化ツール（右） / 補助的（下）→ 自律的（上）</text>
</svg>


---

# コード補完系: Copilot / Cursor / Windsurf

> *Cursor/Copilot/Windsurfはフック生成・型定義補完・定型CRUDコンポーネント生成で効果大*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">コード補完系: Copilot / Cursor / Windsurf</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
- **GitHub Copilot**: IDEプラグイン型・コンテキスト補完・企業導入◎・GitHub連携
- **Cursor**: エディタ統合型・チャット+インライン編集・コンポーネントリファクタに強い
- **Windsurf**: エージェント型・ファイル横断編集・大規模リファクタに最適
- **フロントエンド特化の強み**: Reactフック生成・型定義補完・テストコード自動生成
- **効果が高い場面**: 定型的なCRUDコンポーネント・型定義・テストケース生成
- **効果が低い場面**: 独自アーキテクチャのコア設計・複雑なパフォーマンス最適化


---

# UI生成系: v0 / Lovable / Builder.io

> *v0/Lovable/Builder.ioの生成コードは命名・アクセシビリティのレビューと統合作業が必須*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">UI生成系: v0 / Lovable / Builder.io</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **v0 by Vercel**: プロンプト → React + shadcn/ui + Tailwind を即生成
- **Lovable**: ビジュアルデザイン → フルアプリケーション生成・バックエンドも対応
- **Builder.io AI**: 既存Figmaデザイン → コンポーネントコード変換
- **共通の注意点**: 生成コードは「たたき台」 → 命名・アクセシビリティは必ずレビュー
- **アーキテクチャ制約**: 生成ツールは既存アーキテクチャを理解しない → 統合作業が必要
- **最大の価値**: プロトタイプ速度の向上（ゼロ→形になるまでが10x速い）


---

# アーキテクチャ × AIコード生成の相性原則

> *小粒度コンポーネント・TypeScript型定義・命名一貫性がAIコード補完品質を決定する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">アーキテクチャ × AIコード生成の相性原則</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **コンポーネント粒度**: 小さく分割されているほどAI補完が精確（単一責任原則◎）
- **TypeScript型定義**: Props型・ReturnType が明確なほどAI補完品質UP
- **テストカバレッジ**: テストがあるとAIによるリファクタ安全性UP
- **命名一貫性**: 命名規則が統一されているとAIが文脈を正確に把握
- **まとめ**: クリーンコードの原則 ≒ AIとの相性を高める設計原則と一致する
- 逆説: 「AIに頼りやすいコード」=「人間にも読みやすいコード」


---

# AI親和性の高いコンポーネント設計原則

> *単一責任・明示的Props型・Custom Hooks分離・JSDocコメントがAI親和性を最大化する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AI親和性の高いコンポーネント設計原則</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- **① 単一責任**: 1コンポーネント = 1機能 → AIが正確にコンテキストを把握
- **② 明示的なProps型**: `interface ButtonProps { label: string; onClick: () => void }` 必須
- **③ 副作用の分離**: Custom Hooks に副作用を集約 → コンポーネントは純粋に保つ
- **④ 命名の一貫性**: `useXxx` / `XxxComponent` / `XxxProvider` のプレフィックス規則
- **⑤ JSDocコメント**: 複雑なロジックにコメント → AIが意図を誤解しない
- **⑥ テストと型の整合**: テスト名×Props型が整合すると補完精度が大幅UP


---

# AIが書いたコードのレビューポイント

> *AIコードレビューはXSS・不要re-render・aria属性欠落・any型・エラーハンドリング漏れを確認*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AIが書いたコードのレビューポイント</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
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

> *同期・ストリーミング・非同期処理・リアルタイムの4パターンを応答時間と双方向性で選択*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AI機能の分類と実装パターン</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- **① 同期型**: テキスト分類・センチメント分析 → 通常のfetch/axios・応答時間<1s
- **② ストリーミング型**: テキスト生成・チャット → SSE/ReadableStream・数秒〜数十秒
- **③ 非同期処理型**: 画像生成・音声変換 → polling/webhook・数十秒〜数分
- **④ リアルタイム型**: 音声通話AI・ライブ翻訳 → WebSocket双方向通信
- **選択基準**: 応答時間・双方向性・エラーリカバリの要件で決定
- **最重要**: ストリーミング型が現代AIアプリの主流 → UX改善効果が最大


---

# Vercel AI SDK — フロントエンドAIの標準ツールキット

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">Vercel AI SDK — アーキテクチャ</text>

  <!-- Layer 1: App layer -->
  <rect x="60" y="58" width="840" height="80" rx="10" fill="#1f2937" stroke="#4b5563" stroke-width="1.5"/>
  <text x="480" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#f9fafb" font-family="sans-serif">アプリケーション層 (React / Next.js / Svelte...)</text>
  <rect x="100" y="100" width="170" height="28" rx="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="185" y="118" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">useChat()</text>
  <rect x="290" y="100" width="170" height="28" rx="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="375" y="118" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">useCompletion()</text>
  <rect x="480" y="100" width="170" height="28" rx="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="565" y="118" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">useObject()</text>
  <rect x="670" y="100" width="190" height="28" rx="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="765" y="118" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">createStreamableUI()</text>

  <!-- Arrow down -->
  <line x1="480" y1="138" x2="480" y2="168" stroke="#6b7280" stroke-width="2"/>
  <polygon points="480,172 474,162 486,162" fill="#6b7280"/>

  <!-- Layer 2: Core SDK -->
  <rect x="60" y="172" width="840" height="100" rx="10" fill="#7c2d12" stroke="#f97316" stroke-width="2" style="filter:drop-shadow(0 4px 12px rgba(249,115,22,0.3))"/>
  <text x="480" y="200" text-anchor="middle" font-size="15" font-weight="bold" fill="#fb923c" font-family="sans-serif">AI SDK Core (ai パッケージ)</text>
  <rect x="100" y="210" width="140" height="48" rx="6" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#fed7aa" font-family="sans-serif">streamText()</text>
  <text x="170" y="248" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">テキスト生成</text>
  <rect x="260" y="210" width="140" height="48" rx="6" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="330" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#fed7aa" font-family="sans-serif">generateText()</text>
  <text x="330" y="248" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">同期生成</text>
  <rect x="420" y="210" width="140" height="48" rx="6" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="490" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#fed7aa" font-family="sans-serif">streamObject()</text>
  <text x="490" y="248" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">構造化出力</text>
  <rect x="580" y="210" width="140" height="48" rx="6" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="650" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#fed7aa" font-family="sans-serif">embed()</text>
  <text x="650" y="248" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">Embedding</text>
  <rect x="740" y="210" width="140" height="48" rx="6" fill="#78350f" stroke="#f97316" stroke-width="1.5"/>
  <text x="810" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#fed7aa" font-family="sans-serif">generateObject()</text>
  <text x="810" y="248" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">JSON生成</text>

  <!-- Arrow down -->
  <line x1="480" y1="272" x2="480" y2="302" stroke="#6b7280" stroke-width="2"/>
  <polygon points="480,306 474,296 486,296" fill="#6b7280"/>

  <!-- Layer 3: Provider adapters -->
  <rect x="60" y="306" width="840" height="70" rx="10" fill="#162032" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="480" y="330" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">プロバイダアダプタ層</text>
  <text x="145" y="358" text-anchor="middle" font-size="12" fill="#93c5fd" font-family="sans-serif">@ai-sdk/openai</text>
  <text x="290" y="358" text-anchor="middle" font-size="12" fill="#93c5fd" font-family="sans-serif">@ai-sdk/anthropic</text>
  <text x="440" y="358" text-anchor="middle" font-size="12" fill="#93c5fd" font-family="sans-serif">@ai-sdk/google</text>
  <text x="580" y="358" text-anchor="middle" font-size="12" fill="#93c5fd" font-family="sans-serif">@ai-sdk/mistral</text>
  <text x="730" y="358" text-anchor="middle" font-size="12" fill="#93c5fd" font-family="sans-serif">Ollama (OpenAI互換)</text>

  <!-- Arrow down -->
  <line x1="480" y1="376" x2="480" y2="406" stroke="#6b7280" stroke-width="2"/>
  <polygon points="480,410 474,400 486,400" fill="#6b7280"/>

  <!-- Layer 4: LLM providers -->
  <rect x="60" y="410" width="840" height="55" rx="10" fill="#0c1a14" stroke="#22c55e" stroke-width="1.5"/>
  <text x="480" y="432" text-anchor="middle" font-size="14" font-weight="bold" fill="#4ade80" font-family="sans-serif">LLMプロバイダ</text>
  <text x="190" y="455" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">OpenAI API</text>
  <text x="350" y="455" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Anthropic API</text>
  <text x="510" y="455" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Google Gemini</text>
  <text x="680" y="455" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Ollama (Local)</text>
  <text x="840" y="455" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">AWS Bedrock</text>
</svg>


---

# ストリーミングUI 3つのパターン

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">AI応答ストリーミング — 3パターン比較</text>

  <!-- Pattern 1: ReadableStream (Vercel AI SDK) -->
  <rect x="30" y="56" width="280" height="380" rx="12" fill="#1c1917" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="84" text-anchor="middle" font-size="14" font-weight="bold" fill="#fb923c" font-family="sans-serif">ReadableStream</text>
  <text x="170" y="102" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">Vercel AI SDK 標準</text>
  <!-- Flow -->
  <rect x="60" y="118" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="170" y="140" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">Client: fetch('/api/chat')</text>
  <line x1="170" y1="154" x2="170" y2="175" stroke="#f97316" stroke-width="1.5"/>
  <polygon points="170,179 164,169 176,169" fill="#f97316"/>
  <rect x="60" y="179" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1"/>
  <text x="170" y="201" text-anchor="middle" font-size="11" fill="#fed7aa" font-family="sans-serif">Server: streamText() → Response</text>
  <line x1="170" y1="215" x2="170" y2="236" stroke="#f97316" stroke-width="1.5"/>
  <polygon points="170,240 164,230 176,230" fill="#f97316"/>
  <rect x="60" y="240" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1"/>
  <text x="170" y="262" text-anchor="middle" font-size="11" fill="#fed7aa" font-family="sans-serif">Client: readStreamableValue()</text>
  <!-- Props list -->
  <text x="60" y="300" font-size="12" fill="#4ade80" font-family="sans-serif">✅ fetchベース・Edge対応</text>
  <text x="60" y="320" font-size="12" fill="#4ade80" font-family="sans-serif">✅ 実装が最もシンプル</text>
  <text x="60" y="340" font-size="12" fill="#4ade80" font-family="sans-serif">✅ Vercel AI SDKが自動管理</text>
  <text x="60" y="360" font-size="12" fill="#fbbf24" font-family="sans-serif">⚡ AI応答の主流パターン</text>
  <text x="60" y="395" font-size="11" fill="#6b7280" font-family="sans-serif">通信: HTTP/1.1 or HTTP/2</text>
  <text x="60" y="413" font-size="11" fill="#6b7280" font-family="sans-serif">方向: サーバー → クライアント</text>

  <!-- Pattern 2: SSE -->
  <rect x="340" y="56" width="280" height="380" rx="12" fill="#0c1a14" stroke="#22c55e" stroke-width="2"/>
  <text x="480" y="84" text-anchor="middle" font-size="14" font-weight="bold" fill="#4ade80" font-family="sans-serif">SSE</text>
  <text x="480" y="102" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Server-Sent Events</text>
  <!-- Flow -->
  <rect x="370" y="118" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="480" y="140" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">Client: EventSource 接続</text>
  <line x1="480" y1="154" x2="480" y2="175" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="480,179 474,169 486,169" fill="#22c55e"/>
  <rect x="370" y="179" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Server: data: ...\n\n を送信</text>
  <text x="480" y="212" text-anchor="middle" font-size="10" fill="#4ade80" font-family="sans-serif">text/event-stream</text>
  <line x1="480" y1="215" x2="480" y2="236" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="480,240 474,230 486,230" fill="#22c55e"/>
  <rect x="370" y="240" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="480" y="258" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Client: onmessage handler</text>
  <!-- Props list -->
  <text x="370" y="300" font-size="12" fill="#4ade80" font-family="sans-serif">✅ HTTP/1.1互換・シンプル</text>
  <text x="370" y="320" font-size="12" fill="#4ade80" font-family="sans-serif">✅ 自動再接続機能あり</text>
  <text x="370" y="340" font-size="12" fill="#4ade80" font-family="sans-serif">✅ テキストストリームに最適</text>
  <text x="370" y="360" font-size="12" fill="#fbbf24" font-family="sans-serif">❌ サーバー→クライアントのみ</text>
  <text x="370" y="395" font-size="11" fill="#6b7280" font-family="sans-serif">通信: HTTP/1.1 持続接続</text>
  <text x="370" y="413" font-size="11" fill="#6b7280" font-family="sans-serif">方向: サーバー → クライアント</text>

  <!-- Pattern 3: WebSocket -->
  <rect x="650" y="56" width="280" height="380" rx="12" fill="#162032" stroke="#3b82f6" stroke-width="2"/>
  <text x="790" y="84" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">WebSocket</text>
  <text x="790" y="102" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">双方向リアルタイム通信</text>
  <!-- Flow -->
  <rect x="680" y="118" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="790" y="140" text-anchor="middle" font-size="11" fill="#d1d5db" font-family="sans-serif">Client: WebSocket 接続確立</text>
  <line x1="790" y1="154" x2="790" y2="175" stroke="#3b82f6" stroke-width="1.5"/>
  <polygon points="790,179 784,169 796,169" fill="#3b82f6"/>
  <rect x="680" y="179" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="790" y="196" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">双方向メッセージ送受信</text>
  <text x="790" y="212" text-anchor="middle" font-size="10" fill="#60a5fa" font-family="sans-serif">ws.send() / ws.onmessage</text>
  <line x1="790" y1="215" x2="790" y2="236" stroke="#3b82f6" stroke-width="1.5"/>
  <polygon points="790,240 784,230 796,230" fill="#3b82f6"/>
  <rect x="680" y="240" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="790" y="262" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">低レイテンシ双方向更新</text>
  <!-- Props list -->
  <text x="680" y="300" font-size="12" fill="#4ade80" font-family="sans-serif">✅ 双方向通信</text>
  <text x="680" y="320" font-size="12" fill="#4ade80" font-family="sans-serif">✅ 低レイテンシ</text>
  <text x="680" y="340" font-size="12" fill="#fbbf24" font-family="sans-serif">❌ 実装が複雑</text>
  <text x="680" y="360" font-size="12" fill="#fbbf24" font-family="sans-serif">❌ スケーリングが難しい</text>
  <text x="680" y="395" font-size="11" fill="#6b7280" font-family="sans-serif">通信: TCP持続接続</text>
  <text x="680" y="413" font-size="11" fill="#6b7280" font-family="sans-serif">方向: 双方向</text>

  <!-- Bottom recommendation -->
  <text x="480" y="455" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">推奨: チャット/生成 → ReadableStream or SSE / 音声AI・リアルタイム翻訳 → WebSocket</text>
</svg>


---

# useChat / useCompletion — Vercel AI SDK

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">useChat / useCompletion — Vercel AI SDK</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
- Vercel AI SDK の `useChat` フックでチャットUIを数十行で実装できる


---

# useChat / useCompletion — Vercel AI SDK（コード例）

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

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Server Actions × AI Streaming (Next.js 15)</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- RSC + Server Actions でAPIキーをサーバーに閉じ込めながらAIストリーミングを実現


---

# Server Actions × AI Streaming (Next.js 15)（コード例）

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

> *テキスト生成はReadableStream/SSE・双方向音声通話はWebSocket—シンプルさで選択する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">SSE vs WebSocket vs ReadableStream 比較</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **SSE** (Server-Sent Events): HTTP/1.1互換・一方向・実装シンプル → AI応答配信の主流
- **WebSocket**: 双方向・低レイテンシ → 音声AI・リアルタイム翻訳など双方向が必要な場合
- **ReadableStream** (Vercel AI SDK): fetchベース・Edge対応・最もシンプルな実装
- **推奨**: テキスト生成/チャット → ReadableStream or SSE / 双方向通話 → WebSocket
- **注意**: SSEはHTTP/2 multiplexingで複数ストリームを効率化できる


---

# BFF パターン — APIキーを安全に管理

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">BFF パターン — APIキーを安全に管理</text>

  <!-- NG Pattern (top) -->
  <text x="200" y="68" text-anchor="middle" font-size="14" font-weight="bold" fill="#f87171" font-family="sans-serif">❌ NG: クライアント直接呼び出し</text>

  <!-- Browser -->
  <rect x="30" y="80" width="130" height="80" rx="8" fill="#1f2937" stroke="#4b5563" stroke-width="2"/>
  <text x="95" y="112" text-anchor="middle" font-size="13" fill="#f9fafb" font-family="sans-serif">ブラウザ</text>
  <text x="95" y="130" text-anchor="middle" font-size="10" fill="#ef4444" font-family="sans-serif">APIキー漏洩!</text>
  <text x="95" y="147" text-anchor="middle" font-size="10" fill="#ef4444" font-family="sans-serif">DevToolsで丸見え</text>

  <!-- Arrow NG -->
  <line x1="160" y1="120" x2="255" y2="120" stroke="#ef4444" stroke-width="2"/>
  <polygon points="259,120 251,115 251,125" fill="#ef4444"/>
  <text x="207" y="113" text-anchor="middle" font-size="10" fill="#ef4444" font-family="sans-serif">APIキー</text>
  <text x="207" y="127" text-anchor="middle" font-size="10" fill="#ef4444" font-family="sans-serif">= EXPOSED</text>

  <!-- AI API NG -->
  <rect x="260" y="80" width="130" height="80" rx="8" fill="#1c1917" stroke="#ef4444" stroke-width="2"/>
  <text x="325" y="115" text-anchor="middle" font-size="13" fill="#f87171" font-family="sans-serif">OpenAI API</text>
  <text x="325" y="133" text-anchor="middle" font-size="10" fill="#9ca3af" font-family="sans-serif">OPENAI_KEY=sk-...</text>

  <!-- Warning -->
  <rect x="420" y="88" width="200" height="62" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="520" y="112" text-anchor="middle" font-size="12" fill="#f87171" font-family="sans-serif">⚠️ セキュリティリスク</text>
  <text x="520" y="130" text-anchor="middle" font-size="11" fill="#fca5a5" font-family="sans-serif">APIキーが全ユーザーに公開</text>
  <text x="520" y="145" text-anchor="middle" font-size="11" fill="#fca5a5" font-family="sans-serif">課金リスク・不正利用</text>

  <!-- Divider -->
  <line x1="30" y1="185" x2="900" y2="185" stroke="#374151" stroke-width="1" stroke-dasharray="6,4"/>

  <!-- OK Pattern (bottom) -->
  <text x="340" y="210" text-anchor="middle" font-size="14" font-weight="bold" fill="#4ade80" font-family="sans-serif">✅ OK: BFF パターン</text>

  <!-- Browser OK -->
  <rect x="30" y="225" width="140" height="90" rx="8" fill="#1f2937" stroke="#4b5563" stroke-width="2"/>
  <text x="100" y="255" text-anchor="middle" font-size="13" fill="#f9fafb" font-family="sans-serif">ブラウザ</text>
  <text x="100" y="273" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">POST /api/chat</text>
  <text x="100" y="288" text-anchor="middle" font-size="10" fill="#4ade80" font-family="sans-serif">APIキーなし ✅</text>
  <text x="100" y="305" text-anchor="middle" font-size="10" fill="#9ca3af" font-family="sans-serif">Cookie/JWT認証</text>

  <!-- Arrow to BFF -->
  <line x1="170" y1="270" x2="265" y2="270" stroke="#22c55e" stroke-width="2"/>
  <polygon points="269,270 261,265 261,275" fill="#22c55e"/>
  <text x="217" y="258" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">認証済み</text>
  <text x="217" y="270" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">リクエスト</text>

  <!-- BFF Server -->
  <rect x="270" y="215" width="220" height="130" rx="10" fill="#14532d" stroke="#22c55e" stroke-width="2" style="filter:drop-shadow(0 4px 10px rgba(34,197,94,0.3))"/>
  <text x="380" y="243" text-anchor="middle" font-size="14" font-weight="bold" fill="#4ade80" font-family="sans-serif">BFF サーバー</text>
  <text x="380" y="261" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">Next.js Route Handler</text>
  <text x="290" y="282" font-size="10" fill="#86efac" font-family="sans-serif">✅ 認証チェック</text>
  <text x="290" y="298" font-size="10" fill="#86efac" font-family="sans-serif">✅ レート制限</text>
  <text x="290" y="314" font-size="10" fill="#86efac" font-family="sans-serif">✅ 入力バリデーション</text>
  <text x="290" y="330" font-size="10" fill="#86efac" font-family="sans-serif">✅ コスト管理</text>

  <!-- Arrow BFF to AI -->
  <line x1="490" y1="280" x2="585" y2="280" stroke="#f97316" stroke-width="2"/>
  <polygon points="589,280 581,275 581,285" fill="#f97316"/>
  <text x="537" y="268" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">OPENAI_KEY</text>
  <text x="537" y="280" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">サーバー側env</text>

  <!-- AI API OK -->
  <rect x="590" y="225" width="140" height="90" rx="8" fill="#1c1917" stroke="#f97316" stroke-width="2"/>
  <text x="660" y="260" text-anchor="middle" font-size="13" fill="#fb923c" font-family="sans-serif">OpenAI API</text>
  <text x="660" y="280" text-anchor="middle" font-size="10" fill="#fed7aa" font-family="sans-serif">安全に呼び出し</text>
  <text x="660" y="296" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">APIキー保護 ✅</text>

  <!-- Arrow back to browser -->
  <line x1="490" y1="295" x2="170" y2="295" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="166,295 174,290 174,300" fill="#3b82f6"/>
  <text x="330" y="350" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">ストリーミングレスポンス返送</text>

  <!-- Right side: Implementation tips -->
  <rect x="760" y="215" width="165" height="145" rx="8" fill="#1f2937" stroke="#374151" stroke-width="1"/>
  <text x="842" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#f9fafb" font-family="sans-serif">実装ポイント</text>
  <text x="778" y="262" font-size="11" fill="#d1d5db" font-family="sans-serif">・Clerk / NextAuth</text>
  <text x="778" y="280" font-size="11" fill="#d1d5db" font-family="sans-serif">・Upstash Rate Limit</text>
  <text x="778" y="298" font-size="11" fill="#d1d5db" font-family="sans-serif">・Zod バリデーション</text>
  <text x="778" y="316" font-size="11" fill="#d1d5db" font-family="sans-serif">・Edge Runtime対応</text>
  <text x="778" y="334" font-size="11" fill="#d1d5db" font-family="sans-serif">・ログ・監査</text>

  <!-- Bottom note -->
  <text x="480" y="440" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">APIキーは必ずサーバー側環境変数に保管 — NEXT_PUBLIC_ プレフィックスを絶対につけない</text>
</svg>


---

# RAG UI パターン — 社内ドキュメント検索

> *RAG UIはチャンク分割→Embedding→ベクトルDB→LLM呼び出し→引用表示のフロー*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">RAG UI パターン — 社内ドキュメント検索</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- **インデックス構築**: ドキュメントアップロード → チャンク分割 → Embedding → ベクトルDB保存
- **クエリフロー**: ユーザー質問 → クエリEmbedding → 類似検索 → コンテキスト付きLLM呼び出し
- **引用元表示UI**: 回答に使われたドキュメント名・ページ番号を表示（信頼性UP）
- **実装スタック**: LangChain.js / Vercel AI SDK + Pinecone / ChromaDB
- **フロントエンド責務**: ファイルアップロードUI・検索状態表示・引用ハイライト
- **アーキテクチャ**: Next.js Route Handlers が Embedding→検索→LLM呼び出しをサーバー側で処理


---

# マルチターン会話の状態管理

> *マルチターン会話はVercel AI SDK useChat使用—トークン数管理と永続化方式を設計必須*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">マルチターン会話の状態管理</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
- **① クライアント側** (useState/Zustand): シンプル・ページリロードで消える
- **② サーバーDB** (PostgreSQL/KV): 永続化・マルチデバイス対応・認証必須
- **③ RSC + Server Actions**: サーバー管理・クライアントは軽量・Next.js最適解
- **会話履歴の長さ制限**: トークン数管理が必須 → 古いメッセージを要約・切り捨て
- **Vercel AI SDK**: `useChat` が会話履歴を自動管理 → `/api/chat` にメッセージ配列を送信


---

# マルチモーダルUI — 画像・音声入力

> *画像/音声/動画の各入力形式にMediaRecorder/FileReader/Canvas APIで対応しVision APIへ送信*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">マルチモーダルUI — 画像・音声入力</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- **画像入力**: `<input type="file" accept="image/*">` → FileReader → Base64 → Vision API
- **ドラッグ&ドロップ**: `onDrop` で File オブジェクト取得 → プレビュー表示 → API送信
- **音声入力**: `MediaRecorder API` → 音声録音 → Whisper API → テキスト変換
- **ビデオ分析**: Canvas で フレーム抽出 → Base64 → GPT-4o Vision で解析
- **Vercel AI SDK**: `useChat` の `experimental_attachments` でファイル添付対応済み


---

# Edge Runtime × AI推論

> *Vercel Edge FunctionsはEdge全関数対応でTTFT最小化—Node.js非対応制限に注意*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Edge Runtime × AI推論</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
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

> *SPA×AIはBFF必須・動的インポートでAPIキー漏洩・CORS・バンドルサイズ問題を解決する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">SPA × AI — 課題と対処法</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **課題①: APIキー漏洩**: DevToolsのNetworkタブでAI APIキーが丸見えになる
- **課題②: CORS**: AI APIの多くはブラウザからの直接呼び出しをブロック
- **課題③: バンドルサイズ**: AI SDKをクライアントに含めると数十KB肥大化
- **対策①: BFF必須**: Next.js Route Handlers や Express で AIプロキシを実装
- **対策②: 動的インポート**: AIウィジェットを `React.lazy()` で遅延読み込み
- **AI相性スコア**: ★★☆☆☆ → BFF追加 + 動的インポートで ★★★★ に改善


---

# Next.js App Router × AI — 最高相性の理由

> *RSC+Server Actions+Streaming RSC+Edge Runtime CachingがNext.js App Router最高相性の理由*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Next.js App Router × AI — 最高相性の理由</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **Server Components**: AIレスポンスをサーバーフェッチ → APIキーがブラウザに届かない
- **Server Actions**: クライアントから直接サーバー関数を呼ぶ → RPCライクなAI呼び出し
- **Streaming RSC**: `<Suspense>` × `createStreamableUI` でAI応答を段階的に描画
- **Route Handlers**: `/api/chat` をEdge Runtimeで動かして全世界に低レイテンシ配信
- **Caching**: `fetch` キャッシュ × `revalidate` でAIレスポンスをISRキャッシュ
- **AI相性スコア**: ★★★★★ — サーバー/クライアント分離がAIに完璧にマッチ


---

# React Server Components × AI Streaming

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">React Server Components × AI Streaming</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- RSCのSuspense境界とServer Actionsを組み合わせたAIストリーミング実装


---

# React Server Components × AI Streaming（コード例）

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

> *Islands Architectureはclient:loadでAIウィジェットを分離し段階的なAI機能追加に最適*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Islands Architecture × AI</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
- Astroでメインコンテンツは静的HTML → AIチャットウィジェットだけを島として配置
- `<ChatWidget client:load />` で必要なタイミングにのみJSをハイドレート
- AIウィジェットがJSエラーでクラッシュしても静的コンテンツは正常動作
- **段階的なAI機能追加**: 既存静的サイトに `client:visible` で遅延ロードAI機能を追加
- **AI相性スコア**: ★★★★☆ — アイソレーション性と段階的導入のしやすさが強み


---

# Micro Frontends × AI

> *Module FederationでAIコンポーネントをリモートロードしAIチームが他チームに影響なく独立デプロイ*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Micro Frontends × AI</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- AIチームが `ai-assistant-mfe` として独立開発・デプロイ → 他チームに影響なし
- **Module Federation**: Webpack 5 でAIコンポーネントを動的にリモートロード
- AIモデルのアップデート・SDK更新が他チームのリリースサイクルに干渉しない
- **独立したバンドル**: AIウィジェットのみ遅延ロード → 非AI部分の速度を維持
- **AI相性スコア**: ★★★☆☆ — 組織規模と独立デプロイが必要な場合に強み


---

# Edge-first × AI — レイテンシ最小化

> *エッジAIはTTFTを50-80ms短縮しDurable Objectsで会話状態をDBラウンドトリップなしで管理*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Edge-first × AI — レイテンシ最小化</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
- **Cloudflare Workers + Workers AI**: ユーザーに最も近いエッジでAI推論実行
- **Vercel Edge + OpenAI Streaming**: CDNエッジ → OpenAI API → ストリーミング返送
- **TTFT削減効果**: リージョン配置で東京ユーザーへのTTFTが50-80ms短縮
- **Durable Objects**: エッジで会話状態を管理 → DBへのラウンドトリップを省略
- **AI相性スコア**: ★★★★★ — グローバルユーザーへの低レイテンシAI配信に最適


---

# GraphQL × AI — 型安全なAIインターフェース

> *GraphQL SchemaでAI出力型を強制しSubscriptionでストリーミング—既存GraphQL環境での採用推奨*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">GraphQL × AI — 型安全なAIインターフェース</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **Schemaでレスポンス型を強制**: AIの出力をGraphQL型で定義 → クライアントに型安全を保証
- **Subscription**: GraphQLサブスクリプションでAIストリーミングを実現（WebSocketベース）
- **DataLoader**: N+1問題をバッチ化 → AI embeddings生成のバッチ最適化
- **注意**: REST + SSE のほうが実装シンプル → 既存GraphQL環境でのみ採用を検討
- **AI相性スコア**: ★★★☆☆ — 型安全重視・既存GraphQL環境での採用が合理的


---

# 総合相性マトリクス

- <svg viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">アーキテクチャ × AI相性 総合マトリクス</text>

  <!-- Table header -->
  <rect x="30" y="52" width="900" height="44" rx="6" fill="#1f2937"/>
  <text x="135" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#9ca3af" font-family="sans-serif">アーキテクチャ</text>
  <text x="310" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">APIキー保護</text>
  <text x="430" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">ストリーミング</text>
  <text x="560" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">エッジ対応</text>
  <text x="680" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">RAG/Agent</text>
  <text x="820" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">総合スコア</text>

  <!-- Dividers vertical -->
  <line x1="240" y1="52" x2="240" y2="490" stroke="#374151" stroke-width="1"/>
  <line x1="380" y1="52" x2="380" y2="490" stroke="#374151" stroke-width="1"/>
  <line x1="500" y1="52" x2="500" y2="490" stroke="#374151" stroke-width="1"/>
  <line x1="620" y1="52" x2="620" y2="490" stroke="#374151" stroke-width="1"/>
  <line x1="740" y1="52" x2="740" y2="490" stroke="#374151" stroke-width="1"/>

  <!-- SPA/CSR row -->
  <rect x="30" y="96" width="900" height="52" rx="0" fill="#111827"/>
  <text x="135" y="120" text-anchor="middle" font-size="13" fill="#60a5fa" font-family="sans-serif">SPA / CSR</text>
  <text x="135" y="136" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">React, Vue SPA</text>
  <rect x="275" y="104" width="70" height="28" rx="4" fill="#7f1d1d" stroke="#ef4444" stroke-width="1"/>
  <text x="310" y="122" text-anchor="middle" font-size="12" fill="#f87171" font-family="sans-serif">★☆☆</text>
  <rect x="395" y="104" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="430" y="122" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="515" y="104" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="550" y="122" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="635" y="104" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="670" y="122" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="755" y="104" width="145" height="28" rx="4" fill="#1f2937" stroke="#6b7280" stroke-width="1"/>
  <text x="827" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">★★☆☆☆</text>

  <!-- SSR/SSG row -->
  <rect x="30" y="148" width="900" height="52" rx="0" fill="#0c1a14"/>
  <text x="135" y="172" text-anchor="middle" font-size="13" fill="#4ade80" font-family="sans-serif">SSR / SSG / ISR</text>
  <text x="135" y="188" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">Next.js Pages, Nuxt</text>
  <rect x="275" y="156" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="310" y="174" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="395" y="156" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="430" y="174" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="515" y="156" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="550" y="174" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="635" y="156" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="670" y="174" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="755" y="156" width="145" height="28" rx="4" fill="#0c1a14" stroke="#22c55e" stroke-width="1"/>
  <text x="827" y="174" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">★★★☆☆</text>

  <!-- Next.js App Router row (BEST) -->
  <rect x="30" y="200" width="900" height="52" rx="0" fill="#1c1917" style="filter:drop-shadow(0 0 8px rgba(249,115,22,0.2))"/>
  <text x="135" y="222" text-anchor="middle" font-size="13" fill="#fb923c" font-family="sans-serif">Next.js App Router</text>
  <text x="135" y="238" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">RSC + Server Actions ★</text>
  <rect x="275" y="208" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="310" y="226" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="395" y="208" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="430" y="226" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="515" y="208" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="550" y="226" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="635" y="208" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="670" y="226" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="755" y="208" width="145" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="827" y="226" text-anchor="middle" font-size="13" font-weight="bold" fill="#4ade80" font-family="sans-serif">★★★★★</text>

  <!-- Islands row -->
  <rect x="30" y="252" width="900" height="52" rx="0" fill="#111827"/>
  <text x="135" y="276" text-anchor="middle" font-size="13" fill="#a5b4fc" font-family="sans-serif">Islands Architecture</text>
  <text x="135" y="292" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">Astro, Fresh</text>
  <rect x="275" y="260" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="310" y="278" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="395" y="260" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="430" y="278" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="515" y="260" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="550" y="278" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="635" y="260" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="670" y="278" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★★</text>
  <rect x="755" y="260" width="145" height="28" rx="4" fill="#162032" stroke="#3b82f6" stroke-width="1"/>
  <text x="827" y="278" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">★★★★☆</text>

  <!-- MFE row -->
  <rect x="30" y="304" width="900" height="52" rx="0" fill="#0c1a14"/>
  <text x="135" y="328" text-anchor="middle" font-size="13" fill="#fbbf24" font-family="sans-serif">Micro Frontends</text>
  <text x="135" y="344" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">Module Federation</text>
  <rect x="275" y="312" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="310" y="330" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★</text>
  <rect x="395" y="312" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="430" y="330" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="515" y="312" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="550" y="330" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★☆</text>
  <rect x="635" y="312" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="670" y="330" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★★</text>
  <rect x="755" y="312" width="145" height="28" rx="4" fill="#1f2937" stroke="#6b7280" stroke-width="1"/>
  <text x="827" y="330" text-anchor="middle" font-size="12" font-weight="bold" fill="#9ca3af" font-family="sans-serif">★★★☆☆</text>

  <!-- Edge-first row -->
  <rect x="30" y="356" width="900" height="52" rx="0" fill="#111827"/>
  <text x="135" y="380" text-anchor="middle" font-size="13" fill="#c4b5fd" font-family="sans-serif">Edge-first</text>
  <text x="135" y="396" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">CF Workers, Vercel Edge</text>
  <rect x="275" y="364" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="310" y="382" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="395" y="364" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="430" y="382" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="515" y="364" width="70" height="28" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="550" y="382" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">★★★★</text>
  <rect x="635" y="364" width="70" height="28" rx="4" fill="#78350f" stroke="#f97316" stroke-width="1"/>
  <text x="670" y="382" text-anchor="middle" font-size="12" fill="#fb923c" font-family="sans-serif">★★★</text>
  <rect x="755" y="364" width="145" height="28" rx="4" fill="#162032" stroke="#3b82f6" stroke-width="1"/>
  <text x="827" y="382" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">★★★★★</text>

  <!-- Bottom note -->
  <text x="480" y="465" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">★★★★★ 最優秀 / ★★★★ 優秀 / ★★★ 良好 / ★★ 要追加実装 / ★ 非推奨（AI用途）</text>
</svg>


---

# 推奨スタック — ユースケース別

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">推奨スタック — ユースケース別</text>

  <!-- Use Case 1: Chat App -->
  <rect x="30" y="56" width="280" height="380" rx="12" fill="#1c1917" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="86" text-anchor="middle" font-size="15" font-weight="bold" fill="#fb923c" font-family="sans-serif">チャットアプリ</text>
  <text x="170" y="104" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">カスタマーサポート / AI assistant</text>

  <rect x="60" y="118" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#fed7aa" font-family="sans-serif">Next.js App Router</text>

  <rect x="60" y="162" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="184" text-anchor="middle" font-size="12" font-weight="bold" fill="#fed7aa" font-family="sans-serif">Vercel AI SDK (useChat)</text>

  <rect x="60" y="206" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="228" text-anchor="middle" font-size="12" font-weight="bold" fill="#fed7aa" font-family="sans-serif">Server Actions + streamText</text>

  <rect x="60" y="250" width="220" height="36" rx="6" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#fed7aa" font-family="sans-serif">OpenAI / Anthropic API</text>

  <rect x="60" y="294" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="170" y="316" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">Upstash (Rate Limit + KV)</text>

  <rect x="60" y="338" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="170" y="360" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">Vercel Edge + Clerk Auth</text>

  <text x="170" y="408" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">TTFT: 〜200ms (Edge)</text>
  <text x="170" y="424" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">月コスト: $50〜$200</text>

  <!-- Use Case 2: RAG -->
  <rect x="340" y="56" width="280" height="380" rx="12" fill="#0c1a14" stroke="#22c55e" stroke-width="2"/>
  <text x="480" y="86" text-anchor="middle" font-size="15" font-weight="bold" fill="#4ade80" font-family="sans-serif">RAG システム</text>
  <text x="480" y="104" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">社内知識検索 / ドキュメントQA</text>

  <rect x="370" y="118" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="480" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#86efac" font-family="sans-serif">Next.js App Router</text>

  <rect x="370" y="162" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="480" y="184" text-anchor="middle" font-size="12" font-weight="bold" fill="#86efac" font-family="sans-serif">Vercel AI SDK + LangChain.js</text>

  <rect x="370" y="206" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="480" y="228" text-anchor="middle" font-size="12" font-weight="bold" fill="#86efac" font-family="sans-serif">Pinecone / Supabase Vector</text>

  <rect x="370" y="250" width="220" height="36" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="480" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#86efac" font-family="sans-serif">nomic-embed / text-embedding-3</text>

  <rect x="370" y="294" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="480" y="316" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">GPT-4o / Claude 3.5 Sonnet</text>

  <rect x="370" y="338" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="480" y="360" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">Semantic Cache (Momento)</text>

  <text x="480" y="408" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">精度: TOP-K=5, チャンク512token</text>
  <text x="480" y="424" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">月コスト: $100〜$500</text>

  <!-- Use Case 3: Agent UI -->
  <rect x="650" y="56" width="280" height="380" rx="12" fill="#162032" stroke="#3b82f6" stroke-width="2"/>
  <text x="790" y="86" text-anchor="middle" font-size="15" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Agent UI</text>
  <text x="790" y="104" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">自律タスク実行 / ワークフロー</text>

  <rect x="680" y="118" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="790" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#93c5fd" font-family="sans-serif">Next.js App Router</text>

  <rect x="680" y="162" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="790" y="184" text-anchor="middle" font-size="12" font-weight="bold" fill="#93c5fd" font-family="sans-serif">Vercel AI SDK (streamObject)</text>

  <rect x="680" y="206" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="790" y="228" text-anchor="middle" font-size="12" font-weight="bold" fill="#93c5fd" font-family="sans-serif">Claude 3.5 / GPT-4o (tools)</text>

  <rect x="680" y="250" width="220" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="790" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#93c5fd" font-family="sans-serif">MCP サーバー連携</text>

  <rect x="680" y="294" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="790" y="316" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">Upstash Redis (状態管理)</text>

  <rect x="680" y="338" width="220" height="36" rx="6" fill="#374151" stroke="#6b7280" stroke-width="1"/>
  <text x="790" y="360" text-anchor="middle" font-size="12" fill="#d1d5db" font-family="sans-serif">Human-in-the-Loop UI</text>

  <text x="790" y="408" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">タスク完了率: 70-85%</text>
  <text x="790" y="424" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">月コスト: $200〜$1000</text>
</svg>


---

<!-- _class: lead -->
# Ch 5

- AI対応コンポーネント設計


---

# AIコンポーネントの責務分離

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">AIコンポーネントの責務分離パターン</text>

  <!-- Left: Layer diagram -->
  <!-- Provider layer -->
  <rect x="30" y="60" width="430" height="380" rx="12" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
  <text x="245" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">AIProvider (Context / 状態管理)</text>
  <text x="245" y="104" text-anchor="middle" font-size="11" fill="#818cf8" font-family="sans-serif">会話履歴 / ストリーミング状態 / エラー管理</text>

  <!-- Container layer -->
  <rect x="60" y="116" width="370" height="290" rx="10" fill="#162032" stroke="#3b82f6" stroke-width="2"/>
  <text x="245" y="140" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">ChatContainer (Container Component)</text>
  <text x="245" y="157" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">データフェッチ / ビジネスロジック / サイドエフェクト</text>

  <!-- Pure components layer -->
  <rect x="85" y="172" width="320" height="220" rx="8" fill="#0c1a14" stroke="#22c55e" stroke-width="1.5"/>
  <text x="245" y="196" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">Pure Components (表示のみ)</text>

  <!-- MessageList -->
  <rect x="105" y="210" width="130" height="60" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="170" y="234" text-anchor="middle" font-size="11" font-weight="bold" fill="#4ade80" font-family="sans-serif">MessageList</text>
  <text x="170" y="252" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">messages: Message[]</text>
  <text x="170" y="266" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">isStreaming: boolean</text>

  <!-- InputForm -->
  <rect x="255" y="210" width="130" height="60" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="320" y="234" text-anchor="middle" font-size="11" font-weight="bold" fill="#4ade80" font-family="sans-serif">InputForm</text>
  <text x="320" y="252" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">onSubmit: fn</text>
  <text x="320" y="266" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">disabled: boolean</text>

  <!-- StreamingText + ErrorBoundary -->
  <rect x="105" y="286" width="130" height="60" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="170" y="308" text-anchor="middle" font-size="11" font-weight="bold" fill="#4ade80" font-family="sans-serif">StreamingText</text>
  <text x="170" y="326" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">stream: Iterable</text>
  <text x="170" y="340" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">aria-live: polite</text>

  <rect x="255" y="286" width="130" height="60" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
  <text x="320" y="308" text-anchor="middle" font-size="11" font-weight="bold" fill="#4ade80" font-family="sans-serif">ErrorBoundary</text>
  <text x="320" y="326" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">fallback: ReactNode</text>
  <text x="320" y="340" text-anchor="middle" font-size="10" fill="#86efac" font-family="sans-serif">onRetry: fn</text>

  <!-- Custom Hooks (right side) -->
  <rect x="500" y="60" width="430" height="380" rx="12" fill="#1f2937" stroke="#4b5563" stroke-width="1.5"/>
  <text x="715" y="88" text-anchor="middle" font-size="15" font-weight="bold" fill="#f9fafb" font-family="sans-serif">Custom Hooks (副作用の分離)</text>

  <!-- useAIChat -->
  <rect x="530" y="108" width="370" height="100" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="715" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#fb923c" font-family="sans-serif">useAIChat()</text>
  <text x="545" y="152" font-size="11" fill="#fed7aa" font-family="sans-serif">// 会話状態 + ストリーミング管理</text>
  <text x="545" y="170" font-size="11" fill="#fbbf24" font-family="sans-serif">returns: { messages, sendMessage, isLoading, error }</text>
  <text x="545" y="188" font-size="11" fill="#fed7aa" font-family="sans-serif">// Vercel AI SDK useChat() をラップ</text>
  <text x="545" y="200" font-size="11" fill="#fed7aa" font-family="sans-serif">// 独自エラーハンドリング追加可能</text>

  <!-- useStreamingText -->
  <rect x="530" y="222" width="370" height="80" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="715" y="244" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">useStreamingText(stream)</text>
  <text x="545" y="266" font-size="11" fill="#93c5fd" font-family="sans-serif">// ReadableStream → リアクティブなstring</text>
  <text x="545" y="285" font-size="11" fill="#93c5fd" font-family="sans-serif">returns: { text, isComplete }</text>

  <!-- useOptimisticMessages -->
  <rect x="530" y="316" width="370" height="80" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="715" y="338" text-anchor="middle" font-size="13" font-weight="bold" fill="#4ade80" font-family="sans-serif">useOptimisticMessages()</text>
  <text x="545" y="360" font-size="11" fill="#86efac" font-family="sans-serif">// 楽観的更新 + ロールバック</text>
  <text x="545" y="379" font-size="11" fill="#86efac" font-family="sans-serif">returns: { messages, add, rollback }</text>

  <!-- Principle at bottom -->
  <text x="480" y="456" text-anchor="middle" font-size="12" fill="#9ca3af" font-family="sans-serif">原則: Hooks = ロジック / Pure Components = 表示 / Provider = グローバル状態</text>
</svg>


---

# Streaming Text コンポーネント実装

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Streaming Text コンポーネント実装</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- ストリーミングテキストをリアルタイムで表示するコンポーネント


---

# Streaming Text コンポーネント実装（コード例）

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

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Optimistic UI — AI応答を即座に表示</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- メッセージ送信を楽観的に表示し、失敗時にロールバックするパターン


---

# Optimistic UI — AI応答を即座に表示（コード例）

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

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Error Boundary × AI フォールバック</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
- AI機能専用のErrorBoundaryでUXを保護し、再試行フローを提供する


---

# Error Boundary × AI フォールバック（コード例）

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

> *Skeleton→Partial→Fullの3段階表示でTTFTを最重要指標としてユーザー体験を設計する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">プログレッシブUI — 3段階の表示戦略</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- **① Skeleton** (0–500ms): アウトラインのみ → ユーザーは「ロード中」と認識
- **② Partial** (500ms–2s): 最初のトークンが届き始め → テキストが現れる
- **③ Full** (2s–): 全文表示 + アクションボタン（コピー・再生成）が出現
- **UXの重要点**: ユーザーはテキストが出た瞬間から読み始める → **TTFTが最重要指標**
- 実装: `isLoading` → Skeleton → ストリーミング開始で即切替 → `isDone` でアクション表示


---

# アクセシビリティ × ストリーミングUI

> *aria-live・aria-busy・role=log・フォーカス管理でスクリーンリーダーをストリーミングUIに対応させる*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">アクセシビリティ × ストリーミングUI</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
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

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">AI機能固有のパフォーマンス指標</text>

  <!-- Timeline header -->
  <text x="50" y="72" font-size="13" font-weight="bold" fill="#9ca3af" font-family="sans-serif">リクエスト送信</text>
  <text x="480" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#9ca3af" font-family="sans-serif">時間軸 →</text>
  <text x="900" y="72" text-anchor="end" font-size="13" font-weight="bold" fill="#9ca3af" font-family="sans-serif">生成完了</text>

  <!-- Main timeline -->
  <line x1="50" y1="100" x2="900" y2="100" stroke="#374151" stroke-width="2"/>

  <!-- TTFT segment -->
  <rect x="50" y="84" width="200" height="32" rx="4" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="150" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#fb923c" font-family="sans-serif">TTFT</text>
  <line x1="150" y1="116" x2="150" y2="140" stroke="#f97316" stroke-width="1.5"/>

  <!-- Streaming segment -->
  <rect x="250" y="84" width="500" height="32" rx="4" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="500" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">ストリーミング速度 (Throughput)</text>

  <!-- Total segment -->
  <rect x="50" y="84" width="750" height="32" rx="4" fill="none" stroke="#6b7280" stroke-width="1" stroke-dasharray="6,3"/>

  <!-- Completion marker -->
  <rect x="800" y="84" width="100" height="32" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="850" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#4ade80" font-family="sans-serif">完了</text>

  <!-- TTFT explanation -->
  <rect x="30" y="148" width="280" height="130" rx="8" fill="#1c1917" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="172" text-anchor="middle" font-size="14" font-weight="bold" fill="#fb923c" font-family="sans-serif">TTFT</text>
  <text x="170" y="190" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">Time to First Token</text>
  <text x="50" y="214" font-size="12" fill="#fed7aa" font-family="sans-serif">リクエスト送信から</text>
  <text x="50" y="232" font-size="12" fill="#fed7aa" font-family="sans-serif">最初のトークン到着まで</text>
  <text x="50" y="254" font-size="12" fill="#fbbf24" font-family="sans-serif">目標: 200ms以下 (Edge)</text>
  <text x="50" y="270" font-size="12" fill="#fbbf24" font-family="sans-serif">重要度: ★★★★★</text>

  <!-- Throughput explanation -->
  <rect x="340" y="148" width="280" height="130" rx="8" fill="#162032" stroke="#3b82f6" stroke-width="2"/>
  <text x="480" y="172" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">スループット</text>
  <text x="480" y="190" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">Tokens per Second (TPS)</text>
  <text x="360" y="214" font-size="12" fill="#bfdbfe" font-family="sans-serif">ストリーミング速度</text>
  <text x="360" y="232" font-size="12" fill="#bfdbfe" font-family="sans-serif">GPT-4o: ~50-100 TPS</text>
  <text x="360" y="250" font-size="12" fill="#60a5fa" font-family="sans-serif">目標: 30 TPS以上</text>
  <text x="360" y="270" font-size="12" fill="#60a5fa" font-family="sans-serif">重要度: ★★★★☆</text>

  <!-- Total Time explanation -->
  <rect x="650" y="148" width="280" height="130" rx="8" fill="#0c1a14" stroke="#22c55e" stroke-width="2"/>
  <text x="790" y="172" text-anchor="middle" font-size="14" font-weight="bold" fill="#4ade80" font-family="sans-serif">Total Time</text>
  <text x="790" y="190" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">生成完了までの全体時間</text>
  <text x="670" y="214" font-size="12" fill="#d1fae5" font-family="sans-serif">= TTFT + (Tokens ÷ TPS)</text>
  <text x="670" y="232" font-size="12" fill="#d1fae5" font-family="sans-serif">500token: 〜5-10秒</text>
  <text x="670" y="250" font-size="12" fill="#4ade80" font-family="sans-serif">目標: 体感10秒以内</text>
  <text x="670" y="270" font-size="12" fill="#4ade80" font-family="sans-serif">重要度: ★★★★☆</text>

  <!-- Perceived Performance -->
  <rect x="30" y="300" width="900" height="100" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="480" y="328" text-anchor="middle" font-size="14" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">体感パフォーマンス (Perceived Performance)</text>
  <text x="80" y="356" font-size="12" fill="#c7d2fe" font-family="sans-serif">● TTFT &lt; 500ms: "リアルタイム感" → ユーザー満足度 HIGH</text>
  <text x="80" y="378" font-size="12" fill="#c7d2fe" font-family="sans-serif">● 500ms &lt; TTFT &lt; 2s: "考えている感" → Skeleton表示で体感改善</text>
  <text x="500" y="356" font-size="12" fill="#c7d2fe" font-family="sans-serif">● TTFT &gt; 2s: "応答が遅い" → 離脱率UP</text>
  <text x="500" y="378" font-size="12" fill="#818cf8" font-family="sans-serif">重要: TTFT最小化 &gt; Total Time最小化</text>

  <!-- Bottom note -->
  <text x="480" y="440" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">従来指標 (LCP/TTI) とは異なる — AI固有のUX指標として別途計測が必要</text>
</svg>


---

# Time to First Token (TTFT) 最適化

> *エッジ配置・軽量モデル・Prompt CachingでシステムプロンプトのTTFTを90%削減できる*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Time to First Token (TTFT) 最適化</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **モデル配置**: ユーザーに近いリージョン/エッジに配置 → RTT削減で50-100ms改善
- **モデル選択**: GPT-4o → GPT-4o mini で TTFT を30-50%削減（品質はほぼ同等）
- **Prompt Caching**: Anthropicのキャッシュ機能でシステムプロンプトのTTFTを90%削減
- **並列フェッチ**: ストリーミング開始前にDB・外部APIをParallel fetchで事前取得
- **ウォームアップ**: Route Handlerを事前リクエストでコールドスタートを回避


---

# ストリーミングバッファリング戦略

> *SSE文字単位が体験優先・WebSocket文章単位が効率優先—Vercel AI SDKはsmoothStreamでカスタマイズ*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">ストリーミングバッファリング戦略</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **文字/トークン単位**: 最高のストリーミング体験・ネットワーク負荷が大きい
- **文章単位**: 句点・改行でバースト送信・ネットワーク効率◎・少しカクつく
- **時間間隔**: 100ms毎にバッファをflush → バランス型
- **推奨**: SSEで文字/トークン単位（体験優先）・WebSocketで文章単位（効率優先）
- **Vercel AI SDK**: デフォルトでトークン単位ストリーミング → カスタマイズは `smoothStream()` を使用


---

# AI応答のキャッシュ設計

> *AI応答をRedis/Semantic CacheでキャッシュしAPIコストを最大80%削減できるがTTL設計が重要*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AI応答のキャッシュ設計</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- **Exact Match Cache**: 完全一致クエリをKV（Redis/Upstash）にキャッシュ
- **Semantic Cache**: ベクトル類似度で近いクエリをキャッシュ → GPTCache / Momento
- **TTL設計**: 時事情報は短TTL(1h)・FAQ/静的情報は長TTL(24h〜7d)
- **注意**: 非決定論的生成(temperature>0)のキャッシュ共有は品質劣化リスクあり
- **コスト削減効果**: 同一クエリへのキャッシュで API コストを最大80%削減事例あり


---

# バンドルサイズ最適化

> *AI SDKを動的インポート・Server Component移行・Lazy Loadingで初回バンドルを最小化する*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">バンドルサイズ最適化</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
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

> *AI統合テストはLLMをモック化・ゴールデンファイル・スモークE2Eのみでコストと速度を確保*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">AI統合テストの課題</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- **非決定論的**: 同じ入力でも異なる出力 → アサーション条件を柔軟に設計する必要あり
- **コスト**: テストのたびにAPI費用が発生 → CI実行回数をコントロールする必要あり
- **レート制限**: CIで大量テストを並列実行するとAPIレート制限に到達する
- **ストリーミング**: ReadableStreamの非同期テストは通常のPromiseテストより複雑
- **対策**: AIを完全にモック化・ゴールデンファイルテスト・E2Eはスモークテストのみ
- **テスト分類**: Unit(AIモック) / Integration(MSWモック) / E2E(本物API・CI限定実行)


---

# LLMモック戦略 — MSWでストリームをシミュレート

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">LLMモック戦略 — MSWでストリームをシミュレート</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
- MSW(Mock Service Worker)でSSEストリームをテスト用にシミュレート


---

# LLMモック戦略 — MSWでストリームをシミュレート（コード例）

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

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">ストリーミングUIのテスト</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- Testing Libraryでストリーミングテキストが最終的に表示されることを検証


---

# ストリーミングUIのテスト（コード例）

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

> *APIキー漏洩・プロンプトインジェクション・XSS・SSRF・過剰権限がAIの5大クライアントリスク*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">クライアントサイドのAIリスク</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **① APIキー漏洩**: クライアントにAPIキーを含めると誰でも取得・不正利用可能
- **② プロンプトインジェクション**: ユーザー入力でシステムプロンプトを改変・脱獄
- **③ コンテンツインジェクション**: AI出力にJavaScriptやHTMLを埋め込んでXSS
- **④ SSRF**: AI経由で内部ネットワーク・メタデータAPIへのアクセスを誘導
- **⑤ 過度な権限**: Function Callingでファイル削除・DBアクセスなど危険な操作を許可
- **最重要原則**: AIは外部入力を含む → 全出力を「信頼しない入力」として扱う


---

# プロンプトインジェクション対策

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">プロンプトインジェクション対策</text><rect x="80" y="60" width="640" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">UI Layer — React / Next.js</text><text x="400" y="108" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Streaming Text · useChat · Optimistic UI · Error Boundary</text><polygon points="394,122 406,122 400,138" fill="#60a5fa"/><rect x="80" y="145" width="640" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="173" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">API / BFF Layer</text><text x="400" y="193" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Route Handlers · Server Actions · Edge Runtime · API Key Safety</text><polygon points="394,207 406,207 400,223" fill="#34d399"/><rect x="80" y="230" width="640" height="60" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">AI SDK / Inference Layer</text><text x="400" y="278" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Vercel AI SDK · OpenAI · Anthropic · Gemini · Local Models</text><polygon points="394,292 406,292 400,308" fill="#e91e63"/><rect x="80" y="315" width="640" height="55" rx="10" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="342" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Model Layer</text><text x="400" y="362" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM / Vision Model · Embedding · Vector DB · RAG Pipeline</text></svg>
- 構造化プロンプト + 入力サニタイズ + 長さ制限でインジェクションを防ぐ


---

# プロンプトインジェクション対策（コード例）

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

> *BFF+認証チェック+ユーザー毎レート制限+IP制限の組み合わせがAPI Key管理のベストプラクティス*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">API Key管理 — 3つのパターン</text><rect x="30" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Client-side</text><rect x="55" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="205" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">WebGPU / WebAssembly</text><text x="205" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Transformers.js · MediaPipe</text><rect x="55" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="205" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Privacy · Offline · Low latency</text><rect x="55" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="205" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Limited model size</text><text x="205" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Browser memory constraints</text><rect x="420" y="65" width="350" height="280" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="595" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Server-side</text><rect x="445" y="110" width="300" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="595" y="133" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">API Route / Server Action</text><text x="595" y="151" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime · Node.js</text><rect x="445" y="175" width="300" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="595" y="198" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">Pros: Powerful models · API key safe</text><rect x="445" y="240" width="300" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="595" y="263" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cons: Network latency</text><text x="595" y="281" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Requires streaming for UX</text><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Choose based on model size, privacy requirements, and latency budget</text></svg>
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

> *WebGPU+Transformers.jsでブラウザ内LLM推論が現実的になりプライバシー重視機能に最適*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">WebGPU × オンデバイス推論</text><rect x="30" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM API</text><text x="95" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">SSE Stream</text><polygon points="162,107 177,101 177,113" fill="#60a5fa"/><line x1="160" y1="107" x2="179" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="185" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="255" y="107" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">ReadableStream</text><text x="255" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Edge Runtime</text><polygon points="327,107 342,101 342,113" fill="#60a5fa"/><line x1="325" y1="107" x2="344" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="350" y="80" width="140" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="420" y="107" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">StreamingText</text><text x="420" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">React Component</text><polygon points="492,107 507,101 507,113" fill="#60a5fa"/><line x1="490" y1="107" x2="509" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="515" y="80" width="130" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="107" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">DOM Update</text><text x="580" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Token by token</text><polygon points="647,107 662,101 662,113" fill="#60a5fa"/><line x1="645" y1="107" x2="664" y2="107" stroke="#60a5fa" stroke-width="2"/><rect x="670" y="80" width="110" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="725" y="107" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">User sees</text><text x="725" y="124" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">text appear</text><rect x="80" y="180" width="640" height="160" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="210" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Token Flow Timeline</text><rect x="110" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="150" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 1</text><rect x="205" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="245" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 2</text><rect x="300" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="340" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 3</text><rect x="395" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="435" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 4</text><rect x="490" y="225" width="80" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="530" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">Token 5</text><rect x="585" y="225" width="90" height="26" rx="4" fill="#1e3a5f" stroke="#a78bfa" stroke-width="1"/><text x="630" y="243" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">...more</text><line x1="110" y1="280" x2="680" y2="280" stroke="#374151" stroke-width="1.5"/><text x="110" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">0ms</text><text x="250" y="298" fill="#a0a0b0" font-size="10" font-family="sans-serif">TTFT: ~200ms</text><text x="450" y="298" fill="#34d399" font-size="10" font-family="sans-serif">Progressive render</text><text x="400" y="365" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Never wait for full response — stream tokens to DOM as they arrive</text></svg>
- **WebGPU API**: ブラウザからGPUに直接アクセス → WebGLより10-100x高速な計算
- **Transformers.js**: Hugging FaceのWebGPU対応ライブラリ → 100+モデルをブラウザで動作
- **WebLLM**: ブラウザ内LLM実行 → Llama 3.2-3B (3GB) が Chrome / Safari で動作済み
- **ユースケース**: プライバシー重視機能(医療・法律)・オフライン動作・レイテンシゼロ
- **現実的な制約**: モデルダウンロード3-5GB・推論速度はサーバーの1/5〜1/10程度


---

# MCP × フロントエンド

> *MCPが標準化されることでAIエージェントがDOM操作・フォーム入力でUIを直接操作できるようになる*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">MCP × フロントエンド</text><rect x="50" y="70" width="180" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="97" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">User Request</text><text x="140" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">+ Context</text><polygon points="232,100 247,94 247,106" fill="#60a5fa"/><line x1="230" y1="100" x2="249" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="255" y="70" width="200" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="355" y="97" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Feature Flag</text><text x="355" y="115" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LaunchDarkly / Flagsmith</text><line x1="355" y1="130" x2="355" y2="165" stroke="#60a5fa" stroke-width="2"/><polygon points="349,163 361,163 355,177" fill="#60a5fa"/><rect x="175" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="257" y="207" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">AI Feature ON</text><text x="257" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">LLM Response</text><rect x="365" y="180" width="165" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="447" y="207" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">AI Feature OFF</text><text x="447" y="225" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Fallback UX</text><rect x="570" y="70" width="190" height="230" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5"/><text x="665" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Flag Dimensions</text><rect x="585" y="115" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="138" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">User segment</text><rect x="585" y="160" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="183" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">A/B percentage</text><rect x="585" y="205" width="160" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="665" y="228" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Region / plan</text><rect x="585" y="250" width="160" height="36" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="665" y="273" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Kill switch</text><text x="300" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Progressive rollout with instant rollback capability for AI features</text></svg>
- **Model Context Protocol**: AIとツールの標準通信プロトコル（Anthropic発）
- **ブラウザ拡張 × MCP**: Chrome拡張がMCPサーバーとして機能 → AIがブラウザを操作
- **Web Automationエージェント**: MCPでDOM操作・フォーム入力・ナビゲーションを標準化
- **フロントエンドのUI操作をAIが直接実行**: アクセシビリティツリーを通じたUI理解
- **展望**: MCP対応フロントエンドが標準になることでAIエージェントの利用率が急増


---

# エージェントUI パターン

- <svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <text x="480" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#e6edf3" font-family="sans-serif">エージェントUI — タスク実行フロー</text>

  <!-- Step 1: Input -->
  <rect x="30" y="65" width="150" height="80" rx="8" fill="#1f2937" stroke="#4b5563" stroke-width="2"/>
  <text x="105" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#f9fafb" font-family="sans-serif">① 指示入力</text>
  <text x="105" y="115" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">自然言語で</text>
  <text x="105" y="130" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">タスク指示</text>

  <!-- Arrow -->
  <line x1="180" y1="105" x2="215" y2="105" stroke="#6b7280" stroke-width="2"/>
  <polygon points="219,105 211,100 211,110" fill="#6b7280"/>

  <!-- Step 2: Planning -->
  <rect x="220" y="65" width="150" height="80" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="2"/>
  <text x="295" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#fb923c" font-family="sans-serif">② プランニング</text>
  <text x="295" y="115" text-anchor="middle" font-size="11" fill="#fed7aa" font-family="sans-serif">LLMがタスクを</text>
  <text x="295" y="130" text-anchor="middle" font-size="11" fill="#fed7aa" font-family="sans-serif">ステップ分解</text>

  <!-- Arrow -->
  <line x1="370" y1="105" x2="405" y2="105" stroke="#6b7280" stroke-width="2"/>
  <polygon points="409,105 401,100 401,110" fill="#6b7280"/>

  <!-- Step 3: Tool execution -->
  <rect x="410" y="65" width="150" height="80" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="485" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">③ ツール実行</text>
  <text x="485" y="115" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">Function Calling</text>
  <text x="485" y="130" text-anchor="middle" font-size="11" fill="#93c5fd" font-family="sans-serif">API/DB/Web操作</text>

  <!-- Arrow -->
  <line x1="560" y1="105" x2="595" y2="105" stroke="#6b7280" stroke-width="2"/>
  <polygon points="599,105 591,100 591,110" fill="#6b7280"/>

  <!-- Step 4: Human check -->
  <rect x="600" y="65" width="160" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
  <text x="680" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">④ ヒューマン</text>
  <text x="680" y="108" text-anchor="middle" font-size="13" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">チェック</text>
  <text x="680" y="128" text-anchor="middle" font-size="11" fill="#c7d2fe" font-family="sans-serif">承認 / 修正指示</text>

  <!-- Arrow -->
  <line x1="760" y1="105" x2="795" y2="105" stroke="#6b7280" stroke-width="2"/>
  <polygon points="799,105 791,100 791,110" fill="#6b7280"/>

  <!-- Step 5: Complete -->
  <rect x="800" y="65" width="140" height="80" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="870" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#4ade80" font-family="sans-serif">⑤ 完了</text>
  <text x="870" y="115" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">結果提示</text>
  <text x="870" y="130" text-anchor="middle" font-size="11" fill="#86efac" font-family="sans-serif">アクション提案</text>

  <!-- Feedback loop arrow -->
  <line x1="680" y1="145" x2="680" y2="180" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="680" y1="180" x2="295" y2="180" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="295" y1="180" x2="295" y2="155" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="295,151 289,161 301,161" fill="#6366f1"/>
  <text x="487" y="175" text-anchor="middle" font-size="10" fill="#818cf8" font-family="sans-serif">修正指示→再プランニング</text>

  <!-- UI Components section -->
  <text x="480" y="215" text-anchor="middle" font-size="15" font-weight="bold" fill="#e6edf3" font-family="sans-serif">UIコンポーネント設計</text>

  <!-- TaskProgress -->
  <rect x="30" y="230" width="210" height="130" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="135" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#fb923c" font-family="sans-serif">TaskProgressBar</text>
  <text x="50" y="278" font-size="11" fill="#fed7aa" font-family="sans-serif">■ ステップ一覧 (完了/実行中)</text>
  <text x="50" y="296" font-size="11" fill="#fed7aa" font-family="sans-serif">■ 現在実行中のツール名</text>
  <text x="50" y="314" font-size="11" fill="#fed7aa" font-family="sans-serif">■ 経過時間 / 推定残り時間</text>
  <text x="50" y="332" font-size="11" fill="#fbbf24" font-family="sans-serif">■ キャンセルボタン</text>
  <text x="50" y="350" font-size="11" fill="#fbbf24" font-family="sans-serif">■ aria-live="polite"</text>

  <!-- ToolCallDisplay -->
  <rect x="260" y="230" width="210" height="130" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="365" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">ToolCallDisplay</text>
  <text x="280" y="278" font-size="11" fill="#93c5fd" font-family="sans-serif">■ ツール名 + 引数プレビュー</text>
  <text x="280" y="296" font-size="11" fill="#93c5fd" font-family="sans-serif">■ 実行前 確認ダイアログ</text>
  <text x="280" y="314" font-size="11" fill="#93c5fd" font-family="sans-serif">■ 結果の折りたたみ表示</text>
  <text x="280" y="332" font-size="11" fill="#93c5fd" font-family="sans-serif">■ エラー時の詳細表示</text>

  <!-- HumanApproval -->
  <rect x="490" y="230" width="210" height="130" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
  <text x="595" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#a5b4fc" font-family="sans-serif">HumanApproval</text>
  <text x="510" y="278" font-size="11" fill="#c7d2fe" font-family="sans-serif">■ 実行予定アクション一覧</text>
  <text x="510" y="296" font-size="11" fill="#c7d2fe" font-family="sans-serif">■ 承認 / 却下 / 修正ボタン</text>
  <text x="510" y="314" font-size="11" fill="#c7d2fe" font-family="sans-serif">■ 修正コメント入力欄</text>
  <text x="510" y="332" font-size="11" fill="#818cf8" font-family="sans-serif">■ タイムアウト警告</text>

  <!-- AgentTrace -->
  <rect x="720" y="230" width="210" height="130" rx="8" fill="#0c1a14" stroke="#22c55e" stroke-width="1.5"/>
  <text x="825" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#4ade80" font-family="sans-serif">AgentTrace</text>
  <text x="740" y="278" font-size="11" fill="#86efac" font-family="sans-serif">■ 思考プロセスの可視化</text>
  <text x="740" y="296" font-size="11" fill="#86efac" font-family="sans-serif">■ デバッグ用トレース</text>
  <text x="740" y="314" font-size="11" fill="#86efac" font-family="sans-serif">■ コスト/トークン表示</text>
  <text x="740" y="332" font-size="11" fill="#86efac" font-family="sans-serif">■ 折りたたみ可能なUI</text>

  <!-- Bottom note -->
  <text x="480" y="440" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="sans-serif">エージェントUIのキー原則: 透明性（何をしているか）× 制御可能性（いつでも止められる）</text>
</svg>


---

# フロントエンドエンジニアの必須AIスキルロードマップ

> *Copilot活用→Vercel AI SDK→RAG UI→Edge AI/WebGPUの4レベルがフロントエンドAIスキルロードマップ*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">フロントエンドエンジニアの必須AIスキルロードマップ</text><rect x="50" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#a78bfa" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Browser</text><rect x="70" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="130" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">WebGPU Model</text><rect x="70" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="130" y="175" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">WASM Runtime</text><rect x="70" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="130" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">0ms latency</text><rect x="250" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="330" y="90" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Edge Node</text><rect x="270" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="330" y="125" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Cloudflare Workers</text><rect x="270" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="330" y="175" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Vercel Edge</text><rect x="270" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="330" y="225" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">~20ms latency</text><rect x="450" y="60" width="160" height="200" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="530" y="90" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Regional DC</text><rect x="470" y="105" width="120" height="40" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="530" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Full LLM API</text><rect x="470" y="155" width="120" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="530" y="175" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GPU Inference</text><rect x="470" y="205" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="530" y="225" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">~200ms latency</text><rect x="650" y="60" width="130" height="200" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="715" y="90" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Central DC</text><rect x="665" y="105" width="100" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="715" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Frontier LLM</text><rect x="665" y="155" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="175" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Complex tasks</text><rect x="665" y="205" width="100" height="40" rx="6" fill="#16213e" stroke="#a0a0b0" stroke-width="1.5"/><text x="715" y="225" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">~1000ms+</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tiered AI deployment — route by task complexity and latency requirement</text><text x="400" y="340" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Simple tasks → edge/browser. Complex reasoning → central DC with full LLM.</text></svg>
- **Level 1** AI補助開発: Copilot/Cursor活用・プロンプトエンジニアリング基礎
- **Level 2** AI機能実装: Vercel AI SDK・ストリーミングUI・BFFパターン
- **Level 3** RAG/Agent UI設計: LangChain.js・ベクトルDB・エージェント状態UI
- **Level 4** エッジAI・オンデバイス: Transformers.js・WebGPU・Workers AI
- **共通基盤**: TypeScript型安全・パフォーマンス計測(TTFT)・セキュリティ(インジェクション対策)


---

# まとめ — フロントエンド × AI ベストプラクティス

> *BFF必須・TTFT優先・Next.js RSC・ErrorBoundary・LLMモック化が5大AIフロントエンド原則*

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">まとめ — フロントエンド × AI ベストプラクティス</text><rect x="30" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#e91e63" stroke-width="2"/><text x="140" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Bad UX</text><rect x="50" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="141" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Block UI until complete</text><rect x="50" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="196" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Spinner only</text><rect x="50" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="251" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">No error feedback</text><rect x="50" y="280" width="180" height="36" rx="6" fill="#3a0a0a" stroke="#e91e63" stroke-width="1.5"/><text x="140" y="303" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">User leaves page</text><rect x="290" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#34d399" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Good UX</text><rect x="310" y="115" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="141" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Streaming tokens instantly</text><rect x="310" y="170" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="196" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Optimistic skeleton UI</text><rect x="310" y="225" width="180" height="44" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="400" y="251" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Typed indicator + abort</text><rect x="310" y="280" width="180" height="36" rx="6" fill="#0a3a1a" stroke="#34d399" stroke-width="1.5"/><text x="400" y="303" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">User stays engaged</text><rect x="550" y="70" width="220" height="260" rx="12" fill="#0f2035" stroke="#f9a825" stroke-width="2"/><text x="660" y="100" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Techniques</text><rect x="565" y="115" width="190" height="36" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/><text x="660" y="138" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">TTFT optimization</text><rect x="565" y="162" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="185" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Prefetch on hover</text><rect x="565" y="209" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="232" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Edge caching (stable)</text><rect x="565" y="256" width="190" height="36" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="660" y="279" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">AbortController</text><rect x="565" y="303" width="190" height="22" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="660" y="319" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Progressive enhancement</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Perceived performance often matters more than actual latency</text></svg>
- **① APIキーは絶対にクライアントに置かない** → BFF / Server Actions 必須
- **② TTFT最優先** → Edge配置・小型モデル選択・Prompt Caching
- **③ Next.js App Router + RSC + Server Actions** = 現時点のAI最適フロントエンド構成
- **④ AIコンポーネントはErrorBoundaryで包む** → AI障害がUX全体に波及しない
- **⑤ LLMをモック化してCI/CDを高速・低コストに保つ** → MSW活用
- **参考**: [Vercel AI SDK](https://sdk.vercel.ai) / [AI SDK Examples](https://github.com/vercel/ai) / [WebLLM](https://webllm.mlc.ai) / [Transformers.js](https://huggingface.co/docs/transformers.js)

