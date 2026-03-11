---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Claudeの最新機能2026"
footer: "© 2026 Claude Code"
style: |
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# Claudeの最新機能 2026

- Anthropic Claude 4シリーズ 完全ガイド
- エンジニア・開発者向け最新アップデート総まとめ

<!--
2026年のClaudeの主要アップデートを網羅的に解説します。Claude 4シリーズ、Claude Code、API、エージェントSDKの順に説明します。
-->

---

# 目次

- **Part 1: Claude 4シリーズ**
- Claude 4シリーズ全体像・モデルラインナップ比較
- Opus 4.6 / Sonnet 4.6 / Haiku 4.5 各モデルの特徴
- **Part 2: Claude Code**
- Claude Codeとは / アーキテクチャ / ツール・MCP連携
- Agent Teamsによる並列実行 / 実践デモ / hooks設定
- **Part 3: API & エージェントSDK**
- Agents SDK / 新APIエンドポイント / ストリーミング強化

<!--
本日のアジェンダです。3つのパートに分けて解説します。
-->

---

# Claude 4シリーズ全体像

- <svg viewBox="0 0 800 440" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="440" fill="#1e1b4b" rx="12"/>
  <!-- Title row -->
  <text x="400" y="38" text-anchor="middle" font-size="20" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Claude 4 ファミリー 全体像</text>
  <!-- Hierarchy arrows -->
  <line x1="400" y1="70" x2="400" y2="100" stroke="#6d28d9" stroke-width="2"/>
  <!-- Top level: Opus -->
  <rect x="240" y="100" width="320" height="70" rx="10" fill="#4c1d95" style="filter: drop-shadow(0 4px 8px rgba(124,58,237,0.5))"/>
  <text x="400" y="130" text-anchor="middle" font-size="17" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Claude Opus 4.6</text>
  <text x="400" y="152" text-anchor="middle" font-size="13" fill="#ddd6fe" font-family="sans-serif">最高知性・複雑推論・研究・設計</text>
  <!-- Connector lines -->
  <line x1="290" y1="170" x2="180" y2="220" stroke="#6d28d9" stroke-width="2"/>
  <line x1="510" y1="170" x2="620" y2="220" stroke="#6d28d9" stroke-width="2"/>
  <!-- Sonnet -->
  <rect x="60" y="220" width="250" height="70" rx="10" fill="#164e63" style="filter: drop-shadow(0 4px 8px rgba(6,182,212,0.4))"/>
  <text x="185" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#67e8f9" font-family="sans-serif">Claude Sonnet 4.6</text>
  <text x="185" y="272" text-anchor="middle" font-size="13" fill="#a5f3fc" font-family="sans-serif">バランス型・コーディング・汎用</text>
  <!-- Haiku -->
  <rect x="490" y="220" width="250" height="70" rx="10" fill="#064e3b" style="filter: drop-shadow(0 4px 8px rgba(16,185,129,0.4))"/>
  <text x="615" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">Claude Haiku 4.5</text>
  <text x="615" y="272" text-anchor="middle" font-size="13" fill="#a7f3d0" font-family="sans-serif">軽量・高速・低コスト・エッジ</text>
  <!-- Connector to use cases -->
  <line x1="185" y1="290" x2="185" y2="340" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="170" x2="400" y2="340" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="615" y1="290" x2="615" y2="340" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Use case boxes -->
  <rect x="60" y="340" width="250" height="50" rx="8" fill="#0e7490" opacity="0.7"/>
  <text x="185" y="360" text-anchor="middle" font-size="12" fill="#cffafe" font-family="sans-serif">研究・コード生成・Claude Code</text>
  <text x="185" y="378" text-anchor="middle" font-size="12" fill="#cffafe" font-family="sans-serif">エージェント・マルチステップ</text>
  <rect x="275" y="340" width="250" height="50" rx="8" fill="#5b21b6" opacity="0.7"/>
  <text x="400" y="360" text-anchor="middle" font-size="12" fill="#ede9fe" font-family="sans-serif">API・長文要約・分析・RAG</text>
  <text x="400" y="378" text-anchor="middle" font-size="12" fill="#ede9fe" font-family="sans-serif">複雑なツール連携タスク</text>
  <rect x="490" y="340" width="250" height="50" rx="8" fill="#065f46" opacity="0.7"/>
  <text x="615" y="360" text-anchor="middle" font-size="12" fill="#d1fae5" font-family="sans-serif">チャット・分類・軽量推論</text>
  <text x="615" y="378" text-anchor="middle" font-size="12" fill="#d1fae5" font-family="sans-serif">リアルタイム・IoT・モバイル</text>
  <!-- Context window badge -->
  <rect x="20" y="408" width="760" height="24" rx="6" fill="#312e81" opacity="0.8"/>
  <text x="400" y="424" text-anchor="middle" font-size="12" fill="#c7d2fe" font-family="sans-serif">全モデル共通: 200K トークンコンテキストウィンドウ ／ 拡張思考モード対応</text>
</svg>

<!--
Claude 4シリーズは3モデル体制。Opus 4.6が最高知性、Sonnet 4.6がバランス型、Haiku 4.5が軽量高速モデルです。全モデルが200Kコンテキストをサポートします。
-->

---

# モデルラインナップ比較

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#1e1b4b" rx="12"/>
  <!-- Header -->
  <rect x="0" y="0" width="800" height="50" rx="12" fill="#312e81"/>
  <rect x="0" y="38" width="800" height="12" fill="#312e81"/>
  <text x="400" y="32" text-anchor="middle" font-size="18" font-weight="bold" fill="#a78bfa" font-family="sans-serif">モデル比較マトリクス</text>
  <!-- Table headers -->
  <rect x="20" y="60" width="160" height="40" rx="6" fill="#4c1d95"/>
  <text x="100" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#ddd6fe" font-family="sans-serif">項目</text>
  <rect x="190" y="60" width="175" height="40" rx="6" fill="#4c1d95"/>
  <text x="277" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Opus 4.6</text>
  <rect x="375" y="60" width="175" height="40" rx="6" fill="#164e63"/>
  <text x="462" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#67e8f9" font-family="sans-serif">Sonnet 4.6</text>
  <rect x="560" y="60" width="220" height="40" rx="6" fill="#064e3b"/>
  <text x="670" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">Haiku 4.5</text>
  <!-- Row 1: Intelligence -->
  <rect x="20" y="108" width="760" height="44" rx="4" fill="#1e1b4b"/>
  <text x="100" y="135" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">知性・推論</text>
  <text x="277" y="132" text-anchor="middle" font-size="13" fill="#fbbf24" font-family="sans-serif">★★★★★</text>
  <text x="277" y="148" text-anchor="middle" font-size="11" fill="#c4b5fd" font-family="sans-serif">最高水準</text>
  <text x="462" y="132" text-anchor="middle" font-size="13" fill="#fbbf24" font-family="sans-serif">★★★★☆</text>
  <text x="462" y="148" text-anchor="middle" font-size="11" fill="#67e8f9" font-family="sans-serif">高水準</text>
  <text x="670" y="132" text-anchor="middle" font-size="13" fill="#fbbf24" font-family="sans-serif">★★★☆☆</text>
  <text x="670" y="148" text-anchor="middle" font-size="11" fill="#6ee7b7" font-family="sans-serif">標準</text>
  <!-- Row 2: Speed -->
  <rect x="20" y="156" width="760" height="44" rx="4" fill="#0f172a"/>
  <text x="100" y="183" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">速度・レイテンシ</text>
  <text x="277" y="183" text-anchor="middle" font-size="12" fill="#c4b5fd" font-family="sans-serif">低速（深い思考）</text>
  <text x="462" y="183" text-anchor="middle" font-size="12" fill="#67e8f9" font-family="sans-serif">中速（最適化済み）</text>
  <text x="670" y="183" text-anchor="middle" font-size="12" fill="#6ee7b7" font-family="sans-serif">超高速（&lt;1s）</text>
  <!-- Row 3: Cost -->
  <rect x="20" y="204" width="760" height="44" rx="4" fill="#1e1b4b"/>
  <text x="100" y="231" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">コスト</text>
  <text x="277" y="231" text-anchor="middle" font-size="12" fill="#fb7185" font-family="sans-serif">$15 / $75 per MTok</text>
  <text x="462" y="231" text-anchor="middle" font-size="12" fill="#fbbf24" font-family="sans-serif">$3 / $15 per MTok</text>
  <text x="670" y="231" text-anchor="middle" font-size="12" fill="#4ade80" font-family="sans-serif">$0.25 / $1.25 per MTok</text>
  <!-- Row 4: Context -->
  <rect x="20" y="252" width="760" height="44" rx="4" fill="#0f172a"/>
  <text x="100" y="279" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">コンテキスト</text>
  <text x="277" y="279" text-anchor="middle" font-size="12" fill="#c4b5fd" font-family="sans-serif">200K tokens</text>
  <text x="462" y="279" text-anchor="middle" font-size="12" fill="#67e8f9" font-family="sans-serif">200K tokens</text>
  <text x="670" y="279" text-anchor="middle" font-size="12" fill="#6ee7b7" font-family="sans-serif">200K tokens</text>
  <!-- Row 5: Best for -->
  <rect x="20" y="300" width="760" height="50" rx="4" fill="#1e1b4b"/>
  <text x="100" y="322" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">最適ユースケース</text>
  <text x="277" y="318" text-anchor="middle" font-size="11" fill="#c4b5fd" font-family="sans-serif">研究・複雑設計</text>
  <text x="277" y="336" text-anchor="middle" font-size="11" fill="#c4b5fd" font-family="sans-serif">エージェント・Claude Code</text>
  <text x="462" y="318" text-anchor="middle" font-size="11" fill="#67e8f9" font-family="sans-serif">API統合・コーディング</text>
  <text x="462" y="336" text-anchor="middle" font-size="11" fill="#67e8f9" font-family="sans-serif">RAG・長文分析</text>
  <text x="670" y="318" text-anchor="middle" font-size="11" fill="#6ee7b7" font-family="sans-serif">チャット・分類</text>
  <text x="670" y="336" text-anchor="middle" font-size="11" fill="#6ee7b7" font-family="sans-serif">リアルタイム処理</text>
  <!-- Extended thinking badge -->
  <rect x="20" y="358" width="760" height="44" rx="8" fill="#3b0764"/>
  <text x="400" y="378" text-anchor="middle" font-size="13" font-weight="bold" fill="#e879f9" font-family="sans-serif">拡張思考モード（Extended Thinking）: Opus / Sonnet で利用可能</text>
  <text x="400" y="396" text-anchor="middle" font-size="11" fill="#d946ef" font-family="sans-serif">thinking トークンバジェット設定で推論深度をコントロール</text>
</svg>

<!--
3モデルの詳細比較です。コスト・速度・ユースケースに応じてモデルを選択します。拡張思考モードはOpusとSonnetで利用可能です。
-->

---

# Claude Opus 4.6 の特徴

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#1e1b4b" rx="12"/>
  <!-- Header bar -->
  <rect x="0" y="0" width="800" height="56" rx="12" fill="#4c1d95"/>
  <rect x="0" y="44" width="800" height="12" fill="#4c1d95"/>
  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Claude Opus 4.6 — 最高知性モデル</text>
  <!-- Left: Capability bars -->
  <rect x="20" y="72" width="360" height="326" rx="10" fill="#2d1b69" opacity="0.8"/>
  <text x="200" y="98" text-anchor="middle" font-size="14" font-weight="bold" fill="#a78bfa" font-family="sans-serif">能力プロファイル</text>
  <!-- Bar chart items -->
  <text x="36" y="124" font-size="12" fill="#ddd6fe" font-family="sans-serif">推論・数学</text>
  <rect x="120" y="110" width="240" height="18" rx="4" fill="#312e81"/>
  <rect x="120" y="110" width="228" height="18" rx="4" fill="#7c3aed"/>
  <text x="355" y="124" font-size="11" fill="#c4b5fd" font-family="sans-serif">95%</text>
  <text x="36" y="154" font-size="12" fill="#ddd6fe" font-family="sans-serif">コーディング</text>
  <rect x="120" y="140" width="240" height="18" rx="4" fill="#312e81"/>
  <rect x="120" y="140" width="216" height="18" rx="4" fill="#7c3aed"/>
  <text x="340" y="154" font-size="11" fill="#c4b5fd" font-family="sans-serif">90%</text>
  <text x="36" y="184" font-size="12" fill="#ddd6fe" font-family="sans-serif">科学・研究</text>
  <rect x="120" y="170" width="240" height="18" rx="4" fill="#312e81"/>
  <rect x="120" y="170" width="230" height="18" rx="4" fill="#6d28d9"/>
  <text x="354" y="184" font-size="11" fill="#c4b5fd" font-family="sans-serif">96%</text>
  <text x="36" y="214" font-size="12" fill="#ddd6fe" font-family="sans-serif">長文理解</text>
  <rect x="120" y="200" width="240" height="18" rx="4" fill="#312e81"/>
  <rect x="120" y="200" width="220" height="18" rx="4" fill="#7c3aed"/>
  <text x="344" y="214" font-size="11" fill="#c4b5fd" font-family="sans-serif">92%</text>
  <text x="36" y="244" font-size="12" fill="#ddd6fe" font-family="sans-serif">多言語対応</text>
  <rect x="120" y="230" width="240" height="18" rx="4" fill="#312e81"/>
  <rect x="120" y="230" width="210" height="18" rx="4" fill="#8b5cf6"/>
  <text x="334" y="244" font-size="11" fill="#c4b5fd" font-family="sans-serif">88%</text>
  <!-- Extended thinking visualization -->
  <text x="200" y="278" text-anchor="middle" font-size="13" font-weight="bold" fill="#e879f9" font-family="sans-serif">拡張思考 (Extended Thinking)</text>
  <rect x="36" y="286" width="324" height="52" rx="8" fill="#3b0764" opacity="0.9"/>
  <text x="198" y="308" text-anchor="middle" font-size="11" fill="#f0abfc" font-family="sans-serif">thinkingトークンバジェット: 最大32K tokens</text>
  <text x="198" y="326" text-anchor="middle" font-size="11" fill="#f0abfc" font-family="sans-serif">ステップバイステップ推論の可視化が可能</text>
  <text x="200" y="368" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">価格: $15/$75 per MTok (in/out)</text>
  <!-- Right: Feature cards -->
  <rect x="396" y="72" width="384" height="148" rx="10" fill="#1e3a5f" opacity="0.9"/>
  <text x="588" y="98" text-anchor="middle" font-size="14" font-weight="bold" fill="#06b6d4" font-family="sans-serif">主要ユースケース</text>
  <text x="412" y="120" font-size="12" fill="#bae6fd" font-family="sans-serif">▶ 高度な科学・数学的推論</text>
  <text x="412" y="140" font-size="12" fill="#bae6fd" font-family="sans-serif">▶ 複雑なソフトウェア設計・アーキテクチャ</text>
  <text x="412" y="160" font-size="12" fill="#bae6fd" font-family="sans-serif">▶ マルチステップ自律エージェント</text>
  <text x="412" y="180" font-size="12" fill="#bae6fd" font-family="sans-serif">▶ 長大ドキュメントの分析・要約</text>
  <text x="412" y="200" font-size="12" fill="#bae6fd" font-family="sans-serif">▶ Claude Code (主要モデル)</text>
  <!-- Right bottom: New features -->
  <rect x="396" y="228" width="184" height="170" rx="10" fill="#0f3460" opacity="0.9"/>
  <text x="488" y="252" text-anchor="middle" font-size="13" font-weight="bold" fill="#38bdf8" font-family="sans-serif">新機能</text>
  <text x="412" y="274" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ Multimodal強化</text>
  <text x="412" y="294" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ Tool use並列化</text>
  <text x="412" y="314" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ 構造化出力</text>
  <text x="412" y="334" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ 強化されたRAG</text>
  <text x="412" y="354" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ コンピュータ操作</text>
  <text x="412" y="374" font-size="11" fill="#7dd3fc" font-family="sans-serif">✦ ビジョン精度向上</text>
  <!-- Right bottom: Benchmarks -->
  <rect x="592" y="228" width="188" height="170" rx="10" fill="#1a0533" opacity="0.9"/>
  <text x="686" y="252" text-anchor="middle" font-size="13" font-weight="bold" fill="#e879f9" font-family="sans-serif">ベンチマーク</text>
  <text x="608" y="274" font-size="11" fill="#f0abfc" font-family="sans-serif">MMLU: 92.3%</text>
  <text x="608" y="294" font-size="11" fill="#f0abfc" font-family="sans-serif">HumanEval: 91.5%</text>
  <text x="608" y="314" font-size="11" fill="#f0abfc" font-family="sans-serif">MATH: 89.7%</text>
  <text x="608" y="334" font-size="11" fill="#f0abfc" font-family="sans-serif">GPQA: 75.2%</text>
  <text x="608" y="354" font-size="11" fill="#f0abfc" font-family="sans-serif">SWE-bench: 62.4%</text>
  <text x="608" y="374" font-size="11" fill="#f0abfc" font-family="sans-serif">MMMU: 77.8%</text>
</svg>

<!--
Opus 4.6は最高知性モデルです。拡張思考モードで複雑な問題を段階的に推論し、Claude Codeの主要モデルとして活用されています。
-->

---

# Claude Sonnet 4.6 の特徴

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#0c1a2e" rx="12"/>
  <!-- Header -->
  <rect x="0" y="0" width="800" height="56" rx="12" fill="#0e4f6e"/>
  <rect x="0" y="44" width="800" height="12" fill="#0e4f6e"/>
  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#67e8f9" font-family="sans-serif">Claude Sonnet 4.6 — バランス型モデル</text>
  <!-- Balance visualization (center) -->
  <text x="400" y="82" text-anchor="middle" font-size="13" fill="#94a3b8" font-family="sans-serif">Intelligence × Speed × Cost の最適バランス</text>
  <!-- Triangle balance diagram -->
  <polygon points="400,110 280,290 520,290" fill="none" stroke="#0891b2" stroke-width="2"/>
  <!-- Intelligence vertex -->
  <circle cx="400" cy="110" r="28" fill="#164e63" stroke="#06b6d4" stroke-width="2"/>
  <text x="400" y="105" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">知性</text>
  <text x="400" y="120" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">★★★★</text>
  <!-- Speed vertex -->
  <circle cx="280" cy="290" r="28" fill="#164e63" stroke="#06b6d4" stroke-width="2"/>
  <text x="280" y="286" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">速度</text>
  <text x="280" y="300" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">★★★★</text>
  <!-- Cost vertex -->
  <circle cx="520" cy="290" r="28" fill="#164e63" stroke="#06b6d4" stroke-width="2"/>
  <text x="520" y="286" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">コスト</text>
  <text x="520" y="300" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">★★★★</text>
  <!-- Center fill -->
  <polygon points="400,138 300,270 500,270" fill="#0891b2" opacity="0.2"/>
  <text x="400" y="215" text-anchor="middle" font-size="15" font-weight="bold" fill="#06b6d4" font-family="sans-serif">OPTIMAL</text>
  <!-- Left panel: Use cases -->
  <rect x="20" y="72" width="240" height="340" rx="10" fill="#0f2840" opacity="0.9"/>
  <text x="140" y="98" text-anchor="middle" font-size="13" font-weight="bold" fill="#38bdf8" font-family="sans-serif">主要ユースケース</text>
  <text x="36" y="120" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ APIプロダクション統合</text>
  <text x="36" y="142" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ コーディング支援・レビュー</text>
  <text x="36" y="164" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ RAG / ベクトル検索連携</text>
  <text x="36" y="186" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ 長文ドキュメント要約</text>
  <text x="36" y="208" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ 多ターン会話エージェント</text>
  <text x="36" y="230" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ データ分析・変換</text>
  <text x="36" y="252" font-size="11" fill="#bae6fd" font-family="sans-serif">▶ マルチモーダル処理</text>
  <!-- Price tag -->
  <rect x="36" y="272" width="184" height="50" rx="8" fill="#0c4a6e"/>
  <text x="128" y="294" text-anchor="middle" font-size="12" fill="#7dd3fc" font-family="sans-serif">$3 / $15</text>
  <text x="128" y="312" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">per MTok (in/out)</text>
  <!-- Extended thinking -->
  <rect x="36" y="332" width="184" height="64" rx="8" fill="#1e3a5f"/>
  <text x="128" y="352" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8" font-family="sans-serif">拡張思考対応</text>
  <text x="128" y="370" text-anchor="middle" font-size="10" fill="#7dd3fc" font-family="sans-serif">thinking budget: 16K</text>
  <text x="128" y="386" text-anchor="middle" font-size="10" fill="#7dd3fc" font-family="sans-serif">コスト効率の良い深い推論</text>
  <!-- Right panel: Performance -->
  <rect x="560" y="72" width="220" height="340" rx="10" fill="#0f2840" opacity="0.9"/>
  <text x="670" y="98" text-anchor="middle" font-size="13" font-weight="bold" fill="#38bdf8" font-family="sans-serif">パフォーマンス</text>
  <text x="576" y="120" font-size="11" fill="#94a3b8" font-family="sans-serif">HumanEval</text>
  <rect x="576" y="128" width="188" height="14" rx="3" fill="#1e3a5f"/>
  <rect x="576" y="128" width="160" height="14" rx="3" fill="#0891b2"/>
  <text x="740" y="140" text-anchor="end" font-size="10" fill="#67e8f9" font-family="sans-serif">85%</text>
  <text x="576" y="162" font-size="11" fill="#94a3b8" font-family="sans-serif">MMLU</text>
  <rect x="576" y="170" width="188" height="14" rx="3" fill="#1e3a5f"/>
  <rect x="576" y="170" width="170" height="14" rx="3" fill="#0891b2"/>
  <text x="740" y="182" text-anchor="end" font-size="10" fill="#67e8f9" font-family="sans-serif">90%</text>
  <text x="576" y="204" font-size="11" fill="#94a3b8" font-family="sans-serif">SWE-bench</text>
  <rect x="576" y="212" width="188" height="14" rx="3" fill="#1e3a5f"/>
  <rect x="576" y="212" width="145" height="14" rx="3" fill="#0891b2"/>
  <text x="740" y="224" text-anchor="end" font-size="10" fill="#67e8f9" font-family="sans-serif">77%</text>
  <text x="576" y="246" font-size="11" fill="#94a3b8" font-family="sans-serif">MATH</text>
  <rect x="576" y="254" width="188" height="14" rx="3" fill="#1e3a5f"/>
  <rect x="576" y="254" width="155" height="14" rx="3" fill="#0891b2"/>
  <text x="740" y="266" text-anchor="end" font-size="10" fill="#67e8f9" font-family="sans-serif">82%</text>
  <!-- Highlights -->
  <rect x="576" y="282" width="188" height="114" rx="8" fill="#0c4a6e"/>
  <text x="670" y="302" text-anchor="middle" font-size="12" font-weight="bold" fill="#06b6d4" font-family="sans-serif">2026年強化点</text>
  <text x="576" y="322" font-size="10" fill="#bae6fd" font-family="sans-serif">✦ 並列ツール呼び出し最適化</text>
  <text x="576" y="340" font-size="10" fill="#bae6fd" font-family="sans-serif">✦ コード生成精度 +15%</text>
  <text x="576" y="358" font-size="10" fill="#bae6fd" font-family="sans-serif">✦ JSON出力の安定性向上</text>
  <text x="576" y="376" font-size="10" fill="#bae6fd" font-family="sans-serif">✦ 画像理解精度向上</text>
</svg>

<!--
Sonnet 4.6は知性・速度・コストの最適バランスモデルです。APIプロダクション環境でのコーディング支援やRAG連携に最適です。
-->

---

# Claude Haiku 4.5 の特徴

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#022c22" rx="12"/>
  <!-- Header -->
  <rect x="0" y="0" width="800" height="56" rx="12" fill="#064e3b"/>
  <rect x="0" y="44" width="800" height="12" fill="#064e3b"/>
  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">Claude Haiku 4.5 — 軽量・超高速モデル</text>
  <!-- Speed gauge -->
  <circle cx="160" cy="210" r="100" fill="none" stroke="#065f46" stroke-width="12"/>
  <circle cx="160" cy="210" r="100" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="220 408" stroke-dashoffset="-94"/>
  <text x="160" y="200" text-anchor="middle" font-size="22" font-weight="bold" fill="#34d399" font-family="sans-serif">&lt;500</text>
  <text x="160" y="222" text-anchor="middle" font-size="13" fill="#6ee7b7" font-family="sans-serif">ms</text>
  <text x="160" y="244" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">平均レイテンシ</text>
  <text x="160" y="330" text-anchor="middle" font-size="13" font-weight="bold" fill="#a7f3d0" font-family="sans-serif">超高速レスポンス</text>
  <!-- Center: Key features -->
  <rect x="290" y="72" width="220" height="330" rx="10" fill="#053a2a" opacity="0.9"/>
  <text x="400" y="98" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">主な特徴</text>
  <!-- Feature icons -->
  <rect x="306" y="108" width="188" height="42" rx="8" fill="#065f46"/>
  <text x="400" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">超低コスト</text>
  <text x="400" y="142" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">$0.25/$1.25 per MTok</text>
  <rect x="306" y="158" width="188" height="42" rx="8" fill="#065f46"/>
  <text x="400" y="176" text-anchor="middle" font-size="12" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">200Kコンテキスト</text>
  <text x="400" y="192" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">長文対応・軽量処理</text>
  <rect x="306" y="208" width="188" height="42" rx="8" fill="#065f46"/>
  <text x="400" y="226" text-anchor="middle" font-size="12" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">ストリーミング最適化</text>
  <text x="400" y="242" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">TTFTを最小化</text>
  <rect x="306" y="258" width="188" height="42" rx="8" fill="#065f46"/>
  <text x="400" y="276" text-anchor="middle" font-size="12" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">Tool use対応</text>
  <text x="400" y="292" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">並列ツール呼び出し</text>
  <rect x="306" y="308" width="188" height="42" rx="8" fill="#065f46"/>
  <text x="400" y="326" text-anchor="middle" font-size="12" font-weight="bold" fill="#6ee7b7" font-family="sans-serif">Vision対応</text>
  <text x="400" y="342" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">画像・ドキュメント解析</text>
  <!-- Right: Use cases -->
  <rect x="530" y="72" width="250" height="330" rx="10" fill="#053a2a" opacity="0.9"/>
  <text x="655" y="98" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">ユースケース</text>
  <text x="546" y="124" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ チャットボット・カスタマーCS</text>
  <text x="546" y="148" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ テキスト分類・タグ付け</text>
  <text x="546" y="172" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ 構造化データ抽出</text>
  <text x="546" y="196" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ モデレーション・フィルタ</text>
  <text x="546" y="220" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ 翻訳・要約パイプライン</text>
  <text x="546" y="244" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ エッジ/モバイルデプロイ</text>
  <text x="546" y="268" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ IoT・組み込みAI</text>
  <text x="546" y="292" font-size="12" fill="#a7f3d0" font-family="sans-serif">▶ バッチ処理・ETL</text>
  <!-- Cost comparison box -->
  <rect x="546" y="308" width="218" height="78" rx="8" fill="#064e3b"/>
  <text x="655" y="328" text-anchor="middle" font-size="12" font-weight="bold" fill="#10b981" font-family="sans-serif">コスト比較</text>
  <text x="555" y="348" font-size="11" fill="#6ee7b7" font-family="sans-serif">Haiku 4.5: $0.25/MTok</text>
  <text x="555" y="366" font-size="11" fill="#6ee7b7" font-family="sans-serif">Sonnet 4.6: $3/MTok (12x)</text>
  <text x="555" y="384" font-size="11" fill="#6ee7b7" font-family="sans-serif">Opus 4.6: $15/MTok (60x)</text>
</svg>

<!--
Haiku 4.5は超高速・低コストモデルです。500ms未満のレイテンシで、チャットボット・分類・エッジAIに最適です。Opus比で60分の1のコストで動作します。
-->

---

<!-- _class: lead -->
# Section: Claude Code

- AIネイティブな開発環境の新標準
- ターミナルから直接操作するコーディングエージェント

<!--
ここからPart 2: Claude Codeについて解説します。
-->

---

# Claude Code とは何か

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#0f172a" rx="12"/>
  <!-- Terminal window mock -->
  <rect x="20" y="20" width="460" height="380" rx="10" fill="#1e293b" style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5))"/>
  <!-- Terminal title bar -->
  <rect x="20" y="20" width="460" height="36" rx="10" fill="#334155"/>
  <rect x="20" y="44" width="460" height="12" fill="#334155"/>
  <circle cx="46" cy="38" r="7" fill="#ef4444"/>
  <circle cx="70" cy="38" r="7" fill="#f59e0b"/>
  <circle cx="94" cy="38" r="7" fill="#22c55e"/>
  <text x="240" y="42" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="monospace">claude-code — zsh</text>
  <!-- Terminal content -->
  <text x="36" y="80" font-size="12" fill="#4ade80" font-family="monospace">$ claude</text>
  <text x="36" y="100" font-size="11" fill="#64748b" font-family="monospace">Claude Code v2.1.0 (claude-opus-4-6)</text>
  <text x="36" y="120" font-size="11" fill="#64748b" font-family="monospace">Working directory: /workspace/my-project</text>
  <text x="36" y="148" font-size="11" fill="#94a3b8" font-family="monospace">&gt; このプロジェクトにRESTful APIを</text>
  <text x="36" y="164" font-size="11" fill="#94a3b8" font-family="monospace">  追加してDBと連携させてください</text>
  <text x="36" y="192" font-size="11" fill="#a78bfa" font-family="monospace">● ファイル構造を分析中...</text>
  <text x="36" y="210" font-size="11" fill="#a78bfa" font-family="monospace">● src/api/routes.ts を作成</text>
  <text x="36" y="228" font-size="11" fill="#a78bfa" font-family="monospace">● src/db/connection.ts を更新</text>
  <text x="36" y="246" font-size="11" fill="#a78bfa" font-family="monospace">● テストを生成中...</text>
  <text x="36" y="264" font-size="11" fill="#4ade80" font-family="monospace">✓ 4ファイル作成, 2ファイル更新完了</text>
  <text x="36" y="290" font-size="11" fill="#94a3b8" font-family="monospace">&gt; npm test を実行してください</text>
  <text x="36" y="316" font-size="11" fill="#60a5fa" font-family="monospace">$ npm test</text>
  <text x="36" y="334" font-size="11" fill="#4ade80" font-family="monospace">✓ 42 tests passed (2.3s)</text>
  <text x="36" y="360" font-size="11" fill="#94a3b8" font-family="monospace">&gt; _</text>
  <!-- Right: Feature cards -->
  <rect x="500" y="20" width="280" height="116" rx="10" fill="#1e293b"/>
  <text x="640" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#7c3aed" font-family="sans-serif">Claude Code とは</text>
  <text x="516" y="68" font-size="11" fill="#cbd5e1" font-family="sans-serif">Anthropic公式CLIコーディングエージェント</text>
  <text x="516" y="86" font-size="11" fill="#cbd5e1" font-family="sans-serif">ターミナルから自然言語でコード操作</text>
  <text x="516" y="104" font-size="11" fill="#cbd5e1" font-family="sans-serif">ファイル読み書き・コマンド実行・Git操作</text>
  <text x="516" y="122" font-size="11" fill="#cbd5e1" font-family="sans-serif">MCP・ツール・Agent Teamsに完全対応</text>
  <!-- Feature list -->
  <rect x="500" y="146" width="280" height="254" rx="10" fill="#1e293b"/>
  <text x="640" y="172" text-anchor="middle" font-size="13" font-weight="bold" fill="#06b6d4" font-family="sans-serif">主要機能</text>
  <!-- Feature items -->
  <rect x="516" y="182" width="248" height="34" rx="6" fill="#0f172a"/>
  <text x="524" y="202" font-size="11" fill="#67e8f9" font-family="sans-serif">⚡ 自律的なコード生成・修正</text>
  <rect x="516" y="222" width="248" height="34" rx="6" fill="#0f172a"/>
  <text x="524" y="242" font-size="11" fill="#67e8f9" font-family="sans-serif">🔧 ツール連携（Bash/Git/FS）</text>
  <rect x="516" y="262" width="248" height="34" rx="6" fill="#0f172a"/>
  <text x="524" y="282" font-size="11" fill="#67e8f9" font-family="sans-serif">🌐 MCP（Model Context Protocol）</text>
  <rect x="516" y="302" width="248" height="34" rx="6" fill="#0f172a"/>
  <text x="524" y="322" font-size="11" fill="#67e8f9" font-family="sans-serif">👥 Agent Teamsで並列実行</text>
  <rect x="516" y="342" width="248" height="34" rx="6" fill="#0f172a"/>
  <text x="524" y="362" font-size="11" fill="#67e8f9" font-family="sans-serif">🔒 Hooks・権限管理システム</text>
  <rect x="516" y="382" width="248" height="28" rx="6" fill="#312e81"/>
  <text x="640" y="400" text-anchor="middle" font-size="11" fill="#a5b4fc" font-family="sans-serif">npm install -g @anthropic-ai/claude-code</text>
</svg>

<!--
Claude CodeはAnthropicが開発した公式CLIコーディングエージェントです。自然言語でターミナルからコードを操作し、ファイル読み書き・コマンド実行・Git操作まで自律的に行います。
-->

---

# Claude Code のアーキテクチャ

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#0f172a" rx="12"/>
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Claude Code システムアーキテクチャ</text>
  <!-- User layer -->
  <rect x="300" y="44" width="200" height="40" rx="8" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/>
  <text x="400" y="69" text-anchor="middle" font-size="13" fill="#c4b5fd" font-family="sans-serif">ユーザー (自然言語入力)</text>
  <!-- Arrow down -->
  <line x1="400" y1="84" x2="400" y2="108" stroke="#7c3aed" stroke-width="2"/>
  <polygon points="393,104 400,116 407,104" fill="#7c3aed"/>
  <!-- CLI layer -->
  <rect x="200" y="116" width="400" height="44" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
  <text x="400" y="142" text-anchor="middle" font-size="13" font-weight="bold" fill="#67e8f9" font-family="sans-serif">Claude Code CLI (Node.js / TypeScript)</text>
  <!-- Arrow down -->
  <line x1="400" y1="160" x2="400" y2="182" stroke="#06b6d4" stroke-width="2"/>
  <polygon points="393,178 400,190 407,178" fill="#06b6d4"/>
  <!-- Core agent layer -->
  <rect x="140" y="190" width="520" height="52" rx="8" fill="#164e63" stroke="#0891b2" stroke-width="2"/>
  <text x="400" y="212" text-anchor="middle" font-size="13" font-weight="bold" fill="#a5f3fc" font-family="sans-serif">Agent Loop エンジン</text>
  <text x="400" y="232" text-anchor="middle" font-size="11" fill="#67e8f9" font-family="sans-serif">Plan → Execute → Observe → Reflect → Repeat</text>
  <!-- API call -->
  <line x1="260" y1="242" x2="200" y2="272" stroke="#0891b2" stroke-width="1.5"/>
  <polygon points="196,267 196,279 208,274" fill="#0891b2"/>
  <!-- Tool calls -->
  <line x1="400" y1="242" x2="400" y2="272" stroke="#0891b2" stroke-width="1.5"/>
  <polygon points="393,268 400,280 407,268" fill="#0891b2"/>
  <!-- Settings/hooks -->
  <line x1="540" y1="242" x2="600" y2="272" stroke="#0891b2" stroke-width="1.5"/>
  <polygon points="596,267 604,274 604,262" fill="#0891b2"/>
  <!-- Bottom: Claude API -->
  <rect x="20" y="280" width="220" height="56" rx="8" fill="#4c1d95" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="130" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Anthropic API</text>
  <text x="130" y="322" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">claude-opus-4-6 / sonnet-4-6</text>
  <!-- Bottom: Tools -->
  <rect x="270" y="280" width="260" height="56" rx="8" fill="#0c4a6e" stroke="#0891b2" stroke-width="1.5"/>
  <text x="400" y="300" text-anchor="middle" font-size="12" font-weight="bold" fill="#38bdf8" font-family="sans-serif">ビルトインツール</text>
  <text x="290" y="318" font-size="10" fill="#7dd3fc" font-family="sans-serif">Bash  Read  Write  Edit  Glob  Grep</text>
  <text x="290" y="332" font-size="10" fill="#7dd3fc" font-family="sans-serif">WebFetch  WebSearch  NotebookEdit</text>
  <!-- Bottom: Settings -->
  <rect x="560" y="280" width="220" height="56" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
  <text x="670" y="300" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">設定 / Hooks</text>
  <text x="580" y="318" font-size="10" fill="#6ee7b7" font-family="sans-serif">.claude/settings.json</text>
  <text x="580" y="332" font-size="10" fill="#6ee7b7" font-family="sans-serif">PostToolUse / PreToolUse hooks</text>
  <!-- MCP layer -->
  <line x1="400" y1="336" x2="400" y2="358" stroke="#06b6d4" stroke-width="1.5"/>
  <polygon points="393,354 400,366 407,354" fill="#06b6d4"/>
  <rect x="140" y="366" width="520" height="40" rx="8" fill="#0f2d40" stroke="#0369a1" stroke-width="1.5"/>
  <text x="400" y="382" text-anchor="middle" font-size="12" font-weight="bold" fill="#38bdf8" font-family="sans-serif">MCP (Model Context Protocol) サーバー群</text>
  <text x="400" y="398" text-anchor="middle" font-size="10" fill="#7dd3fc" font-family="sans-serif">DB / GitHub / Slack / Linear / Filesystem / カスタムMCPサーバー</text>
</svg>

<!--
Claude Codeは「Agent Loop」を中心としたアーキテクチャです。Plan→Execute→Observe→Reflectのループをビルトインツール・API・MCPサーバーと連携しながら実行します。
-->

---

# ツール利用・MCP連携

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#0f172a" rx="12"/>
  <!-- Center: Claude Code -->
  <circle cx="400" cy="210" r="55" fill="#1e1b4b" stroke="#7c3aed" stroke-width="3"/>
  <text x="400" y="205" text-anchor="middle" font-size="13" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Claude</text>
  <text x="400" y="222" text-anchor="middle" font-size="13" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Code</text>
  <!-- Built-in tools on left -->
  <text x="30" y="26" font-size="14" font-weight="bold" fill="#67e8f9" font-family="sans-serif">ビルトインツール</text>
  <!-- Tool items -->
  <rect x="20" y="36" width="140" height="28" rx="6" fill="#0c4a6e"/>
  <text x="90" y="55" text-anchor="middle" font-size="11" fill="#bae6fd" font-family="sans-serif">Bash（コマンド実行）</text>
  <rect x="20" y="72" width="140" height="28" rx="6" fill="#0c4a6e"/>
  <text x="90" y="91" text-anchor="middle" font-size="11" fill="#bae6fd" font-family="sans-serif">Read / Write / Edit</text>
  <rect x="20" y="108" width="140" height="28" rx="6" fill="#0c4a6e"/>
  <text x="90" y="127" text-anchor="middle" font-size="11" fill="#bae6fd" font-family="sans-serif">Glob / Grep（検索）</text>
  <rect x="20" y="144" width="140" height="28" rx="6" fill="#0c4a6e"/>
  <text x="90" y="163" text-anchor="middle" font-size="11" fill="#bae6fd" font-family="sans-serif">WebFetch / Search</text>
  <rect x="20" y="180" width="140" height="28" rx="6" fill="#0c4a6e"/>
  <text x="90" y="199" text-anchor="middle" font-size="11" fill="#bae6fd" font-family="sans-serif">NotebookEdit</text>
  <!-- Arrows from left tools to center -->
  <line x1="164" y1="60" x2="348" y2="185" stroke="#0891b2" stroke-width="1.5"/>
  <polygon points="340,183 350,192 352,180" fill="#0891b2"/>
  <line x1="164" y1="86" x2="348" y2="195" stroke="#0891b2" stroke-width="1.5"/>
  <line x1="164" y1="122" x2="348" y2="205" stroke="#0891b2" stroke-width="1.5"/>
  <line x1="164" y1="158" x2="348" y2="213" stroke="#0891b2" stroke-width="1.5"/>
  <line x1="164" y1="194" x2="348" y2="222" stroke="#0891b2" stroke-width="1.5"/>
  <!-- MCP servers on right -->
  <text x="640" y="26" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">MCPサーバー</text>
  <rect x="640" y="36" width="144" height="28" rx="6" fill="#064e3b"/>
  <text x="712" y="55" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">GitHub / GitLab</text>
  <rect x="640" y="72" width="144" height="28" rx="6" fill="#064e3b"/>
  <text x="712" y="91" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">PostgreSQL / MongoDB</text>
  <rect x="640" y="108" width="144" height="28" rx="6" fill="#064e3b"/>
  <text x="712" y="127" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">Slack / Linear / Jira</text>
  <rect x="640" y="144" width="144" height="28" rx="6" fill="#064e3b"/>
  <text x="712" y="163" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">AWS / GCP / Azure</text>
  <rect x="640" y="180" width="144" height="28" rx="6" fill="#064e3b"/>
  <text x="712" y="199" text-anchor="middle" font-size="11" fill="#a7f3d0" font-family="sans-serif">カスタムMCPサーバー</text>
  <!-- Arrows from center to right -->
  <line x1="452" y1="185" x2="636" y2="60" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="628,56 640,60 632,68" fill="#10b981"/>
  <line x1="452" y1="195" x2="636" y2="86" stroke="#10b981" stroke-width="1.5"/>
  <line x1="452" y1="205" x2="636" y2="122" stroke="#10b981" stroke-width="1.5"/>
  <line x1="452" y1="213" x2="636" y2="158" stroke="#10b981" stroke-width="1.5"/>
  <line x1="452" y1="222" x2="636" y2="194" stroke="#10b981" stroke-width="1.5"/>
  <!-- Bottom: Parallel tool use -->
  <rect x="140" y="290" width="520" height="116" rx="10" fill="#1e293b" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="400" y="314" text-anchor="middle" font-size="14" font-weight="bold" fill="#a78bfa" font-family="sans-serif">並列ツール呼び出し (Tool Use Parallelization)</text>
  <!-- Parallel execution visualization -->
  <rect x="156" y="326" width="100" height="24" rx="4" fill="#4c1d95"/>
  <text x="206" y="342" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">Read: file1.ts</text>
  <rect x="266" y="326" width="100" height="24" rx="4" fill="#4c1d95"/>
  <text x="316" y="342" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">Read: file2.ts</text>
  <rect x="376" y="326" width="100" height="24" rx="4" fill="#4c1d95"/>
  <text x="426" y="342" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">Grep: pattern</text>
  <rect x="486" y="326" width="138" height="24" rx="4" fill="#4c1d95"/>
  <text x="555" y="342" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">WebFetch: docs.url</text>
  <text x="400" y="372" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">同時実行 → レイテンシを最大70%削減 → 結果をマージして次のステップへ</text>
  <line x1="206" y1="350" x2="206" y2="364" stroke="#7c3aed" stroke-width="1"/>
  <line x1="316" y1="350" x2="316" y2="364" stroke="#7c3aed" stroke-width="1"/>
  <line x1="426" y1="350" x2="426" y2="364" stroke="#7c3aed" stroke-width="1"/>
  <line x1="555" y1="350" x2="555" y2="364" stroke="#7c3aed" stroke-width="1"/>
  <line x1="206" y1="364" x2="555" y2="364" stroke="#7c3aed" stroke-width="1"/>
  <line x1="380" y1="364" x2="380" y2="376" stroke="#7c3aed" stroke-width="1"/>
  <polygon points="374,372 380,384 386,372" fill="#7c3aed"/>
  <text x="400" y="394" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">統合結果 → 次のAgent Loopステップへ</text>
</svg>

<!--
Claude CodeはビルトインツールとサードパーティのMCPサーバーを並列呼び出しします。並列ツール実行でレイテンシを最大70%削減できます。
-->

---

# Agent Teams による並列実行

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="420" fill="#0f172a" rx="12"/>
  <!-- Title -->
  <text x="400" y="28" text-anchor="middle" font-size="15" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Agent Teams: tmux並列ワーカー実行アーキテクチャ</text>
  <!-- Team Leader -->
  <rect x="300" y="40" width="200" height="50" rx="10" fill="#4c1d95" stroke="#7c3aed" stroke-width="2"/>
  <text x="400" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#c4b5fd" font-family="sans-serif">Team Leader</text>
  <text x="400" y="80" text-anchor="middle" font-size="10" fill="#ddd6fe" font-family="sans-serif">タスク分割 / ワーカー管理 / 統合</text>
  <!-- Arrows down to workers -->
  <line x1="340" y1="90" x2="140" y2="148" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="133,143 140,155 147,143" fill="#7c3aed"/>
  <line x1="370" y1="90" x2="290" y2="148" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="283,143 290,155 297,143" fill="#7c3aed"/>
  <line x1="400" y1="90" x2="400" y2="148" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="393,143 400,155 407,143" fill="#7c3aed"/>
  <line x1="430" y1="90" x2="510" y2="148" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="503,143 510,155 517,143" fill="#7c3aed"/>
  <line x1="460" y1="90" x2="660" y2="148" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="653,143 660,155 667,143" fill="#7c3aed"/>
  <!-- Worker nodes -->
  <!-- Worker 1 -->
  <rect x="60" y="155" width="160" height="70" rx="8" fill="#164e63" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="140" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#67e8f9" font-family="sans-serif">impl-worker-1</text>
  <text x="140" y="195" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">スライド 1-10</text>
  <text x="140" y="213" text-anchor="middle" font-size="9" fill="#7dd3fc" font-family="sans-serif">Claude Opus 4.6</text>
  <!-- Worker 2 -->
  <rect x="210" y="155" width="160" height="70" rx="8" fill="#164e63" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="290" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#67e8f9" font-family="sans-serif">impl-worker-2</text>
  <text x="290" y="195" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">スライド 11-20</text>
  <text x="290" y="213" text-anchor="middle" font-size="9" fill="#7dd3fc" font-family="sans-serif">Claude Opus 4.6</text>
  <!-- Worker 3 -->
  <rect x="320" y="155" width="160" height="70" rx="8" fill="#164e63" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="400" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#67e8f9" font-family="sans-serif">impl-worker-3</text>
  <text x="400" y="195" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">スライド 21-30</text>
  <text x="400" y="213" text-anchor="middle" font-size="9" fill="#7dd3fc" font-family="sans-serif">Claude Sonnet 4.6</text>
  <!-- Worker 4 -->
  <rect x="430" y="155" width="160" height="70" rx="8" fill="#164e63" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="510" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#67e8f9" font-family="sans-serif">impl-worker-4</text>
  <text x="510" y="195" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">スライド 31-40</text>
  <text x="510" y="213" text-anchor="middle" font-size="9" fill="#7dd3fc" font-family="sans-serif">Claude Sonnet 4.6</text>
  <!-- Worker 5 -->
  <rect x="580" y="155" width="160" height="70" rx="8" fill="#164e63" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="660" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#67e8f9" font-family="sans-serif">review-worker</text>
  <text x="660" y="195" text-anchor="middle" font-size="10" fill="#a5f3fc" font-family="sans-serif">品質レビュー</text>
  <text x="660" y="213" text-anchor="middle" font-size="9" fill="#7dd3fc" font-family="sans-serif">Claude Opus 4.6</text>
  <!-- File workspace -->
  <rect x="60" y="242" width="630" height="54" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="375" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#94a3b8" font-family="sans-serif">.agent-teams/&lt;session-id&gt;/ ファイルベースワークスペース</text>
  <text x="375" y="284" text-anchor="middle" font-size="10" fill="#64748b" font-family="sans-serif">team.json / tasks/ / status/ / reviews/ / log/　— gitignore済み</text>
  <!-- Task lifecycle -->
  <rect x="60" y="306" width="680" height="100" rx="10" fill="#0f172a" stroke="#4c1d95" stroke-width="1.5"/>
  <text x="400" y="328" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">タスクライフサイクル</text>
  <!-- States -->
  <rect x="72" y="338" width="92" height="28" rx="5" fill="#334155"/>
  <text x="118" y="357" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">pending</text>
  <line x1="164" y1="352" x2="176" y2="352" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="172,347 180,352 172,357" fill="#7c3aed"/>
  <rect x="180" y="338" width="92" height="28" rx="5" fill="#1e3a5f"/>
  <text x="226" y="357" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">in_progress</text>
  <line x1="272" y1="352" x2="284" y2="352" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="280,347 288,352 280,357" fill="#7c3aed"/>
  <rect x="288" y="338" width="92" height="28" rx="5" fill="#1e3a5f"/>
  <text x="334" y="357" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">impl_done</text>
  <line x1="380" y1="352" x2="392" y2="352" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="388,347 396,352 388,357" fill="#7c3aed"/>
  <rect x="396" y="338" width="92" height="28" rx="5" fill="#1e3a5f"/>
  <text x="442" y="357" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">in_review</text>
  <line x1="488" y1="352" x2="500" y2="352" stroke="#7c3aed" stroke-width="1.5"/>
  <polygon points="496,347 504,352 496,357" fill="#7c3aed"/>
  <rect x="504" y="338" width="100" height="28" rx="5" fill="#1e3a5f"/>
  <text x="554" y="357" text-anchor="middle" font-size="10" fill="#67e8f9" font-family="sans-serif">review_done</text>
  <line x1="604" y1="352" x2="616" y2="352" stroke="#10b981" stroke-width="1.5"/>
  <polygon points="612,347 620,352 612,357" fill="#10b981"/>
  <rect x="620" y="338" width="100" height="28" rx="5" fill="#064e3b"/>
  <text x="670" y="357" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">completed</text>
  <text x="400" y="394" text-anchor="middle" font-size="10" fill="#64748b" font-family="sans-serif">needs_revision → in_progress のリトライ: 最大3サイクル</text>
</svg>

<!--
Agent Teamsはtmuxベースの並列実行システムです。Team Leaderがタスクを分割し、複数のimpl-workerが並列でスライドを生成し、review-workerが品質をチェックします。
-->

---

# Claude Code 実践デモ — コード生成

- **シナリオ:** 既存のExpressサーバーにJWT認証付きREST APIを追加
- **Claude Codeへの指示:** 自然言語のみ — ファイル操作・テストは自動実行

```bash
# Step 1: プロジェクト分析（自動）
$ claude
> JWT認証付きのユーザー管理APIエンドポイントを追加してください
  GET /api/users, POST /api/users, PUT /api/users/:id を実装し
  Prismaでデータベース連携、Zodでバリデーションしてください

● src/middleware/auth.ts を作成中...
● src/api/users/routes.ts を作成中...
● src/api/users/schema.ts を作成中...
● prisma/schema.prisma を更新中...
● src/api/users/__tests__/users.test.ts を作成中...

# 生成された認証ミドルウェア (auth.ts)
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request, res: Response, next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    next();
  } catch { res.status(403).json({ error: 'Invalid token' }); }
};

✓ 6ファイル作成, prismaスキーマ更新, 28テスト全通過 (4.1s)
```

<!--
実際のデモです。Claude Codeは自然言語の指示から、認証ミドルウェア・APIルート・バリデーション・テストを自動生成し、28のテストがすべてパスしました。
-->

---

# hooks・設定のカスタマイズ

- **PostToolUse Hooks** — ツール実行後に自動アクションを定義

```json
// .claude/settings.json — フック設定例
{
  "hooks": {
    "PostToolUse": [
      {
        // スライドデータ書き込み後に自動バリデーション
        "matcher": "Write",
        "hooks": [{
          "type": "command",
          "command": "bun run validate"
        }]
      },
      {
        // TypeScriptファイル編集後に型チェック＋フォーマット
        "matcher": "Edit",
        "hooks": [
          { "type": "command", "command": "bun run typecheck" },
          { "type": "command", "command": "bun run format" }
        ]
      },
      {
        // SVGファイル保存後にurl(#id)違反を自動チェック
        "matcher": { "tool": "Write", "file_pattern": "**/*.svg" },
        "hooks": [{
          "type": "command",
          "command": "bun scripts/fix-svg-url-refs.ts"
        }]
      }
    ]
  },
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

<!--
settings.jsonでフックを設定することで、ファイル書き込み後の自動バリデーション、型チェック、フォーマット、SVG検証などを自動化できます。
-->

---

<!-- _class: lead -->
# Section: API & エージェントSDK

- プログラマブルなClaudeを最大限活用する
- 新しいAPIエンドポイント・SDK・ストリーミング強化

<!--
ここからPart 3: APIとエージェントSDKについて解説します。
-->

---

# Claude API概要

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="36" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Claude API エンドポイント構成</text><!-- Client --><rect x="30" y="70" width="130" height="60" rx="10" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="95" y="97" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">Your</text><text x="95" y="115" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">Application</text><!-- Arrow right --><line x1="160" y1="100" x2="220" y2="100" stroke="#06b6d4" stroke-width="2"/><polygon points="220,95 232,100 220,105" fill="#06b6d4"/><!-- API Gateway --><rect x="232" y="70" width="140" height="60" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="302" y="97" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">API Gateway</text><text x="302" y="115" text-anchor="middle" fill="#a5f3fc" font-size="11" font-family="sans-serif">api.anthropic.com</text><!-- Arrow right --><line x1="372" y1="100" x2="432" y2="100" stroke="#06b6d4" stroke-width="2"/><polygon points="432,95 444,100 432,105" fill="#06b6d4"/><!-- Claude Models --><rect x="444" y="55" width="160" height="95" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="2"/><text x="524" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">Claude Models</text><text x="524" y="102" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">claude-opus-4-5</text><text x="524" y="118" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">claude-sonnet-4-5</text><text x="524" y="134" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">claude-haiku-3-5</text><!-- Authentication --><rect x="30" y="170" width="130" height="55" rx="8" fill="#312e81" stroke="#6d28d9" stroke-width="1.5"/><text x="95" y="196" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">Authentication</text><text x="95" y="213" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">x-api-key header</text><!-- Rate Limits --><rect x="180" y="170" width="130" height="55" rx="8" fill="#1e3a5f" stroke="#0e7490" stroke-width="1.5"/><text x="245" y="196" text-anchor="middle" fill="#a5f3fc" font-size="12" font-family="sans-serif">Rate Limits</text><text x="245" y="213" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">RPM / TPM制御</text><!-- Streaming --><rect x="330" y="170" width="130" height="55" rx="8" fill="#1c2a1e" stroke="#16a34a" stroke-width="1.5"/><text x="395" y="196" text-anchor="middle" fill="#86efac" font-size="12" font-family="sans-serif">Streaming</text><text x="395" y="213" text-anchor="middle" fill="#bbf7d0" font-size="11" font-family="sans-serif">SSE対応</text><!-- Batches --><rect x="480" y="170" width="130" height="55" rx="8" fill="#3b1f0a" stroke="#ea580c" stroke-width="1.5"/><text x="545" y="196" text-anchor="middle" fill="#fb923c" font-size="12" font-family="sans-serif">Batch API</text><text x="545" y="213" text-anchor="middle" fill="#fed7aa" font-size="11" font-family="sans-serif">50%コスト削減</text><!-- Code Example --><rect x="30" y="255" width="740" height="145" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="50" y="280" fill="#64748b" font-size="12" font-family="monospace">// Messages API 基本呼び出し</text><text x="50" y="300" fill="#a78bfa" font-size="12" font-family="monospace">const</text><text x="102" y="300" fill="#fff" font-size="12" font-family="monospace">response = await anthropic.messages.create({</text><text x="70" y="320" fill="#06b6d4" font-size="12" font-family="monospace">model:</text><text x="118" y="320" fill="#86efac" font-size="12" font-family="monospace">"claude-opus-4-5"</text><text x="240" y="320" fill="#fff" font-size="12" font-family="monospace">,</text><text x="70" y="340" fill="#06b6d4" font-size="12" font-family="monospace">max_tokens:</text><text x="155" y="340" fill="#fb923c" font-size="12" font-family="monospace">1024</text><text x="180" y="340" fill="#fff" font-size="12" font-family="monospace">,</text><text x="70" y="360" fill="#06b6d4" font-size="12" font-family="monospace">messages:</text><text x="145" y="360" fill="#fff" font-size="12" font-family="monospace">[{ role:</text><text x="220" y="360" fill="#86efac" font-size="12" font-family="monospace">"user"</text><text x="258" y="360" fill="#fff" font-size="12" font-family="monospace">, content:</text><text x="325" y="360" fill="#86efac" font-size="12" font-family="monospace">"Hello!"</text><text x="375" y="360" fill="#fff" font-size="12" font-family="monospace">}]</text><text x="50" y="385" fill="#fff" font-size="12" font-family="monospace">});</text></svg>

<!--
Claude APIはMessages APIを中心に構成。認証はAPIキー、レート制限はRPM/TPMで管理。ストリーミングとバッチAPIも利用可能。
-->

---

# Tool Useパターン

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="36" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Tool Use（Function Calling）フロー</text><!-- Step 1 --><rect x="20" y="65" width="140" height="65" rx="10" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="90" y="90" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">① ユーザー入力</text><text x="90" y="108" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">「東京の天気は?」</text><text x="90" y="122" text-anchor="middle" fill="#a5f3fc" font-size="10" font-family="sans-serif">+ tools 定義</text><!-- Arrow --><line x1="160" y1="97" x2="195" y2="97" stroke="#06b6d4" stroke-width="2"/><polygon points="195,92 207,97 195,102" fill="#06b6d4"/><!-- Step 2 --><rect x="207" y="65" width="140" height="65" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="277" y="90" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">② Claude判断</text><text x="277" y="108" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">tool_useブロック</text><text x="277" y="122" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">get_weather呼出</text><!-- Arrow --><line x1="347" y1="97" x2="382" y2="97" stroke="#06b6d4" stroke-width="2"/><polygon points="382,92 394,97 382,102" fill="#06b6d4"/><!-- Step 3 --><rect x="394" y="65" width="140" height="65" rx="10" fill="#1c2a1e" stroke="#16a34a" stroke-width="2"/><text x="464" y="90" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold" font-family="sans-serif">③ Tool実行</text><text x="464" y="108" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">Weather API呼出</text><text x="464" y="122" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">結果: 25°C 晴れ</text><!-- Arrow --><line x1="534" y1="97" x2="569" y2="97" stroke="#06b6d4" stroke-width="2"/><polygon points="569,92 581,97 569,102" fill="#06b6d4"/><!-- Step 4 --><rect x="581" y="65" width="140" height="65" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="2"/><text x="651" y="90" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">④ 最終回答</text><text x="651" y="108" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">tool_result送信</text><text x="651" y="122" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">自然言語で回答</text><!-- Tool Definition Box --><rect x="20" y="160" width="360" height="115" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="35" y="182" fill="#64748b" font-size="11" font-family="monospace">// Tool定義</text><text x="35" y="200" fill="#a78bfa" font-size="11" font-family="monospace">{</text><text x="50" y="218" fill="#06b6d4" font-size="11" font-family="monospace">name:</text><text x="92" y="218" fill="#86efac" font-size="11" font-family="monospace">"get_weather"</text><text x="180" y="218" fill="#fff" font-size="11" font-family="monospace">,</text><text x="50" y="236" fill="#06b6d4" font-size="11" font-family="monospace">description:</text><text x="130" y="236" fill="#86efac" font-size="11" font-family="monospace">"天気を取得"</text><text x="215" y="236" fill="#fff" font-size="11" font-family="monospace">,</text><text x="50" y="254" fill="#06b6d4" font-size="11" font-family="monospace">input_schema:</text><text x="148" y="254" fill="#fff" font-size="11" font-family="monospace">{ city: string }</text><text x="35" y="270" fill="#a78bfa" font-size="11" font-family="monospace">}</text><!-- Response Block --><rect x="400" y="160" width="380" height="115" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="415" y="182" fill="#64748b" font-size="11" font-family="monospace">// Claudeのレスポンス</text><text x="415" y="200" fill="#a78bfa" font-size="11" font-family="monospace">{</text><text x="430" y="218" fill="#06b6d4" font-size="11" font-family="monospace">type:</text><text x="468" y="218" fill="#86efac" font-size="11" font-family="monospace">"tool_use"</text><text x="530" y="218" fill="#fff" font-size="11" font-family="monospace">,</text><text x="430" y="236" fill="#06b6d4" font-size="11" font-family="monospace">name:</text><text x="468" y="236" fill="#86efac" font-size="11" font-family="monospace">"get_weather"</text><text x="553" y="236" fill="#fff" font-size="11" font-family="monospace">,</text><text x="430" y="254" fill="#06b6d4" font-size="11" font-family="monospace">input:</text><text x="472" y="254" fill="#fff" font-size="11" font-family="monospace">{ city:</text><text x="524" y="254" fill="#86efac" font-size="11" font-family="monospace">"Tokyo"</text><text x="570" y="254" fill="#fff" font-size="11" font-family="monospace">}</text><text x="415" y="270" fill="#a78bfa" font-size="11" font-family="monospace">}</text><!-- Parallel Tools Note --><rect x="20" y="295" width="760" height="110" rx="8" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="400" y="318" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">高度なパターン</text><rect x="40" y="330" width="210" height="60" rx="6" fill="#312e81" stroke="#6d28d9" stroke-width="1"/><text x="145" y="352" text-anchor="middle" fill="#e9d5ff" font-size="12" font-weight="bold" font-family="sans-serif">並列Tool呼び出し</text><text x="145" y="370" text-anchor="middle" fill="#c4b5fd" font-size="11" font-family="sans-serif">複数ツールを同時実行</text><text x="145" y="386" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">レイテンシ削減</text><rect x="295" y="330" width="210" height="60" rx="6" fill="#1e3a5f" stroke="#0e7490" stroke-width="1"/><text x="400" y="352" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">ストリーミングTool</text><text x="400" y="370" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">SSEでリアルタイム</text><text x="400" y="386" text-anchor="middle" fill="#a5f3fc" font-size="11" font-family="sans-serif">tool_use_delta</text><rect x="550" y="330" width="210" height="60" rx="6" fill="#1c2a1e" stroke="#16a34a" stroke-width="1"/><text x="655" y="352" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold" font-family="sans-serif">Tool Choice制御</text><text x="655" y="370" text-anchor="middle" fill="#bbf7d0" font-size="11" font-family="sans-serif">auto / any / specific</text><text x="655" y="386" text-anchor="middle" fill="#86efac" font-size="11" font-family="sans-serif">force_tool指定可能</text></svg>

<!--
Tool UseはClaudeが外部APIや関数を呼び出せる機能。tool_useブロックでツール名と引数を返し、アプリ側で実行後にtool_resultとして返す。並列実行やストリーミングにも対応。
-->

---

# Multi-turn会話設計

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="36" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Multi-turn会話 メッセージ構造</text><!-- Turn 1 User --><rect x="20" y="55" width="340" height="55" rx="8" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="35" y="77" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">Turn 1 — User</text><text x="35" y="97" fill="#fff" font-size="12" font-family="sans-serif">「Pythonでソートアルゴリズムを教えて」</text><!-- Arrow down --><line x1="190" y1="110" x2="190" y2="130" stroke="#06b6d4" stroke-width="2"/><polygon points="185,130 190,142 195,130" fill="#06b6d4"/><!-- Turn 1 Assistant --><rect x="20" y="142" width="340" height="55" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="35" y="164" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">Turn 1 — Assistant</text><text x="35" y="184" fill="#fff" font-size="12" font-family="sans-serif">「バブルソートから始めましょう...」</text><!-- Arrow down --><line x1="190" y1="197" x2="190" y2="217" stroke="#06b6d4" stroke-width="2"/><polygon points="185,217 190,229 195,217" fill="#06b6d4"/><!-- Turn 2 User --><rect x="20" y="229" width="340" height="55" rx="8" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="35" y="251" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">Turn 2 — User</text><text x="35" y="271" fill="#fff" font-size="12" font-family="sans-serif">「クイックソートも比較して」</text><!-- Arrow down --><line x1="190" y1="284" x2="190" y2="304" stroke="#06b6d4" stroke-width="2"/><polygon points="185,304 190,316 195,304" fill="#06b6d4"/><!-- Turn 2 Assistant --><rect x="20" y="316" width="340" height="55" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="35" y="338" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">Turn 2 — Assistant</text><text x="35" y="358" fill="#fff" font-size="12" font-family="sans-serif">「前のバブルソートと比較すると...」</text><!-- Right panel: Design Patterns --><rect x="400" y="55" width="380" height="315" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="590" y="82" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">設計パターン</text><!-- System prompt --><rect x="415" y="95" width="350" height="60" rx="6" fill="#1e1b4b" stroke="#6d28d9" stroke-width="1"/><text x="435" y="115" fill="#a78bfa" font-size="12" font-weight="bold" font-family="sans-serif">System Prompt</text><text x="435" y="133" fill="#e9d5ff" font-size="11" font-family="sans-serif">会話の初期コンテキストを設定</text><text x="435" y="149" fill="#c4b5fd" font-size="11" font-family="sans-serif">ペルソナ・制約・フォーマット指定</text><!-- Context window --><rect x="415" y="170" width="350" height="60" rx="6" fill="#1e1b4b" stroke="#0e7490" stroke-width="1"/><text x="435" y="190" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">コンテキスト管理</text><text x="435" y="208" fill="#cffafe" font-size="11" font-family="sans-serif">全ターンを messages[] 配列で保持</text><text x="435" y="224" fill="#a5f3fc" font-size="11" font-family="sans-serif">200K tokens = 長期会話も対応</text><!-- Truncation --><rect x="415" y="245" width="350" height="60" rx="6" fill="#1e1b4b" stroke="#b45309" stroke-width="1"/><text x="435" y="265" fill="#fbbf24" font-size="12" font-weight="bold" font-family="sans-serif">Truncation戦略</text><text x="435" y="283" fill="#fde68a" font-size="11" font-family="sans-serif">古いターンをサマリで圧縮</text><text x="435" y="299" fill="#fbbf24" font-size="11" font-family="sans-serif">重要情報をSystem Promptに昇格</text><!-- Stateless note --><rect x="415" y="320" width="350" height="42" rx="6" fill="#1c2a1e" stroke="#16a34a" stroke-width="1"/><text x="435" y="340" fill="#86efac" font-size="12" font-weight="bold" font-family="sans-serif">ステートレス設計</text><text x="435" y="356" fill="#bbf7d0" font-size="11" font-family="sans-serif">API側は状態を保持しない — アプリ側で管理</text></svg>

<!--
ClaudeのAPIはステートレス。全ターンの会話履歴をmessages配列に入れて毎回送る。System Promptで初期コンテキストを設定し、長い会話はサマリで圧縮する戦略が有効。
-->

---

# エージェントSDKアーキテクチャ

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Anthropic Agent SDK アーキテクチャ</text><!-- User/Orchestrator --><rect x="310" y="55" width="180" height="55" rx="10" fill="#312e81" stroke="#7c3aed" stroke-width="2.5"/><text x="400" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">Orchestrator</text><text x="400" y="98" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">タスク分解・調整</text><!-- Down arrow to agents row --><line x1="400" y1="110" x2="400" y2="140" stroke="#7c3aed" stroke-width="2"/><polygon points="395,140 400,152 405,140" fill="#7c3aed"/><!-- Agent 1 --><rect x="60" y="152" width="155" height="60" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="137" y="177" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">Sub-Agent A</text><text x="137" y="195" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">データ収集</text><text x="137" y="209" text-anchor="middle" fill="#7dd3fc" font-size="10" font-family="sans-serif">Web Search Tool</text><!-- Agent 2 --><rect x="322" y="152" width="155" height="60" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="400" y="177" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">Sub-Agent B</text><text x="400" y="195" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">コード生成</text><text x="400" y="209" text-anchor="middle" fill="#7dd3fc" font-size="10" font-family="sans-serif">Code Exec Tool</text><!-- Agent 3 --><rect x="583" y="152" width="155" height="60" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="660" y="177" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">Sub-Agent C</text><text x="660" y="195" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">品質チェック</text><text x="660" y="209" text-anchor="middle" fill="#7dd3fc" font-size="10" font-family="sans-serif">Review Tool</text><!-- Lines from orchestrator to agents --><line x1="400" y1="152" x2="400" y2="152" stroke="#7c3aed" stroke-width="1"/><line x1="310" y1="140" x2="137" y2="152" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="400" y1="140" x2="400" y2="152" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="490" y1="140" x2="660" y2="152" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/><!-- Tools layer --><rect x="20" y="240" width="760" height="55" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="400" y="263" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold" font-family="sans-serif">Tools Layer</text><rect x="35" y="273" width="120" height="14" rx="4" fill="#1e3a5f"/><text x="95" y="284" text-anchor="middle" fill="#a5f3fc" font-size="10" font-family="sans-serif">Web Search</text><rect x="170" y="273" width="120" height="14" rx="4" fill="#1c2a1e"/><text x="230" y="284" text-anchor="middle" fill="#86efac" font-size="10" font-family="sans-serif">Code Executor</text><rect x="305" y="273" width="120" height="14" rx="4" fill="#2d1b69"/><text x="365" y="284" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">File System</text><rect x="440" y="273" width="120" height="14" rx="4" fill="#3b1f0a"/><text x="500" y="284" text-anchor="middle" fill="#fb923c" font-size="10" font-family="sans-serif">Database</text><rect x="575" y="273" width="120" height="14" rx="4" fill="#1e1b4b"/><text x="635" y="284" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">API Calls</text><rect x="705" y="273" width="60" height="14" rx="4" fill="#1e3a5f"/><text x="735" y="284" text-anchor="middle" fill="#7dd3fc" font-size="10" font-family="sans-serif">…more</text><!-- Key Features --><rect x="20" y="310" width="370" height="95" rx="8" fill="#2d1b69" stroke="#6d28d9" stroke-width="1.5"/><text x="205" y="332" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">SDKの主要機能</text><text x="40" y="352" fill="#e9d5ff" font-size="12" font-family="sans-serif">• Agent定義: name, tools, system_prompt</text><text x="40" y="372" fill="#e9d5ff" font-size="12" font-family="sans-serif">• Handoff: エージェント間委任</text><text x="40" y="392" fill="#e9d5ff" font-size="12" font-family="sans-serif">• Context管理: 自動ターン処理</text><!-- Safety Features --><rect x="410" y="310" width="370" height="95" rx="8" fill="#1e3a5f" stroke="#0e7490" stroke-width="1.5"/><text x="595" y="332" text-anchor="middle" fill="#a5f3fc" font-size="13" font-weight="bold" font-family="sans-serif">安全機能</text><text x="430" y="352" fill="#cffafe" font-size="12" font-family="sans-serif">• Computer Use: 人間の監視</text><text x="430" y="372" fill="#cffafe" font-size="12" font-family="sans-serif">• Permission Check: ツール実行前確認</text><text x="430" y="392" fill="#cffafe" font-size="12" font-family="sans-serif">• Max Turns: ループ防止</text></svg>

<!--
Agent SDKはOrchestrator-Subagentパターンで構成。複数のエージェントが並列で異なるツールを使って協調作業。Handoff機能でエージェント間の委任が可能。
-->

---

# エージェント実装例

- Anthropic SDK を使った基本的なエージェントループの実装

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// ツール定義
const tools = [
  {
    name: "web_search",
    description: "Webを検索して最新情報を取得",
    input_schema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"]
    }
  }
];

async function runAgent(userMessage: string) {
  const messages = [{ role: "user", content: userMessage }];

  while (true) {
    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      tools,
      messages
    });

    if (response.stop_reason === "end_turn") break;

    // Tool実行ループ
    const toolResults = await executeTools(response.content);
    messages.push(
      { role: "assistant", content: response.content },
      { role: "user", content: toolResults }
    );
  }
}
```

<!--
エージェントループのコア実装。stop_reasonがend_turnになるまでツール実行を繰り返す。messages配列に全ターンを追加して次のAPIコールに渡す。
-->

---

<!-- _class: lead -->
# 拡張コンテキスト & メモリ

- 200K トークンと永続メモリ戦略


---

# 200Kトークンコンテキストの活用

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">200K トークンコンテキストウィンドウ</text><!-- Context Window Visualization --><rect x="30" y="55" width="490" height="245" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/><text x="275" y="80" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold" font-family="sans-serif">200,000 Tokens コンテキストウィンドウ</text><!-- System Prompt segment --><rect x="45" y="92" width="460" height="30" rx="4" fill="#2d1b69"/><text x="60" y="112" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">System Prompt</text><text x="380" y="112" fill="#9f7aea" font-size="10" font-family="sans-serif">~2K tokens</text><!-- Documents segment --><rect x="45" y="128" width="460" height="70" rx="4" fill="#1e3a5f"/><text x="60" y="150" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">ドキュメント / コードベース</text><text x="60" y="168" fill="#7dd3fc" font-size="11" font-family="sans-serif">PDF全文 / ソースコード全体 / 長文レポート</text><text x="370" y="168" fill="#38bdf8" font-size="10" font-family="sans-serif">~100K tokens</text><!-- Conversation History --><rect x="45" y="204" width="460" height="50" rx="4" fill="#1c2a1e"/><text x="60" y="224" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">会話履歴</text><text x="60" y="242" fill="#bbf7d0" font-size="11" font-family="sans-serif">過去のやりとり全件</text><text x="380" y="242" fill="#4ade80" font-size="10" font-family="sans-serif">~50K tokens</text><!-- Current Input --><rect x="45" y="260" width="460" height="30" rx="4" fill="#3b1f0a"/><text x="60" y="280" fill="#fb923c" font-size="11" font-weight="bold" font-family="sans-serif">現在の入力</text><text x="380" y="280" fill="#f97316" font-size="10" font-family="sans-serif">~1K tokens</text><!-- Use Cases --><rect x="540" y="55" width="240" height="245" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="660" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">ユースケース</text><!-- Use case items --><rect x="555" y="92" width="210" height="36" rx="5" fill="#312e81"/><text x="575" y="107" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">コードベース全体理解</text><text x="575" y="122" fill="#c4b5fd" font-size="10" font-family="sans-serif">大規模リポジトリを一括分析</text><rect x="555" y="135" width="210" height="36" rx="5" fill="#1e3a5f"/><text x="575" y="150" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">長文ドキュメント処理</text><text x="575" y="165" fill="#cffafe" font-size="10" font-family="sans-serif">法律文書・研究論文を丸ごと</text><rect x="555" y="178" width="210" height="36" rx="5" fill="#1c2a1e"/><text x="575" y="193" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">マルチドキュメント比較</text><text x="575" y="208" fill="#bbf7d0" font-size="10" font-family="sans-serif">複数資料を同時参照・比較</text><rect x="555" y="221" width="210" height="36" rx="5" fill="#3b1f0a"/><text x="575" y="236" fill="#fb923c" font-size="11" font-weight="bold" font-family="sans-serif">長期会話コンテキスト</text><text x="575" y="251" fill="#fed7aa" font-size="10" font-family="sans-serif">数時間の会話を保持</text><!-- Stats bar --><rect x="30" y="318" width="760" height="85" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1.5"/><text x="400" y="340" text-anchor="middle" fill="#a5f3fc" font-size="13" font-weight="bold" font-family="sans-serif">200K トークン = 実際どれくらい?</text><text x="100" y="368" text-anchor="middle" fill="#cffafe" font-size="12" font-family="sans-serif">約150,000語</text><text x="100" y="386" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">英語本 1.5冊分</text><line x1="200" y1="350" x2="200" y2="395" stroke="#334155" stroke-width="1"/><text x="300" y="368" text-anchor="middle" fill="#cffafe" font-size="12" font-family="sans-serif">約10,000行</text><text x="300" y="386" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">コードベース相当</text><line x1="400" y1="350" x2="400" y2="395" stroke="#334155" stroke-width="1"/><text x="520" y="368" text-anchor="middle" fill="#cffafe" font-size="12" font-family="sans-serif">PDFレポート</text><text x="520" y="386" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">300ページ以上</text><line x1="620" y1="350" x2="620" y2="395" stroke="#334155" stroke-width="1"/><text x="710" y="368" text-anchor="middle" fill="#cffafe" font-size="12" font-family="sans-serif">会話ターン</text><text x="710" y="386" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">数百ターン以上</text></svg>

<!--
200Kトークンコンテキストは業界最大クラス。コードベース全体、長文ドキュメント、長期会話など実用的なユースケースを網羅。約150,000語、300ページのPDF相当。
-->

---

# Memory & Persistence戦略

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Memory戦略 4類型</text><!-- In-Context Memory --><rect x="20" y="55" width="370" height="155" rx="10" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="40" y="80" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">① In-Context Memory</text><text x="40" y="100" fill="#e9d5ff" font-size="12" font-family="sans-serif">• 会話履歴をmessages[]で保持</text><text x="40" y="120" fill="#e9d5ff" font-size="12" font-family="sans-serif">• セッション内で即時参照</text><text x="40" y="140" fill="#e9d5ff" font-size="12" font-family="sans-serif">• 上限: 200K tokens</text><rect x="40" y="152" width="160" height="46" rx="5" fill="#1e1b4b"/><text x="120" y="171" text-anchor="middle" fill="#86efac" font-size="11" font-family="sans-serif">メリット</text><text x="120" y="188" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">即時・正確</text><rect x="220" y="152" width="155" height="46" rx="5" fill="#1e1b4b"/><text x="297" y="171" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">デメリット</text><text x="297" y="188" text-anchor="middle" fill="#fca5a5" font-size="10" font-family="sans-serif">セッション終了で消滅</text><!-- External Memory --><rect x="410" y="55" width="370" height="155" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="430" y="80" fill="#a5f3fc" font-size="14" font-weight="bold" font-family="sans-serif">② External Memory</text><text x="430" y="100" fill="#cffafe" font-size="12" font-family="sans-serif">• データベースに永続化</text><text x="430" y="120" fill="#cffafe" font-size="12" font-family="sans-serif">• セッション跨ぎで利用</text><text x="430" y="140" fill="#cffafe" font-size="12" font-family="sans-serif">• PostgreSQL / Redis 等</text><rect x="430" y="152" width="160" height="46" rx="5" fill="#0f172a"/><text x="510" y="171" text-anchor="middle" fill="#86efac" font-size="11" font-family="sans-serif">メリット</text><text x="510" y="188" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">永続・スケーラブル</text><rect x="600" y="152" width="165" height="46" rx="5" fill="#0f172a"/><text x="682" y="171" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">デメリット</text><text x="682" y="188" text-anchor="middle" fill="#fca5a5" font-size="10" font-family="sans-serif">実装コスト高</text><!-- Summary Memory --><rect x="20" y="225" width="370" height="155" rx="10" fill="#1c2a1e" stroke="#16a34a" stroke-width="2"/><text x="40" y="250" fill="#86efac" font-size="14" font-weight="bold" font-family="sans-serif">③ Summary Memory</text><text x="40" y="270" fill="#bbf7d0" font-size="12" font-family="sans-serif">• 過去会話をClaudeが要約</text><text x="40" y="290" fill="#bbf7d0" font-size="12" font-family="sans-serif">• 圧縮してSystem Promptに</text><text x="40" y="310" fill="#bbf7d0" font-size="12" font-family="sans-serif">• トークン節約に最適</text><rect x="40" y="322" width="160" height="46" rx="5" fill="#0f172a"/><text x="120" y="341" text-anchor="middle" fill="#86efac" font-size="11" font-family="sans-serif">メリット</text><text x="120" y="358" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">コスト効率的</text><rect x="220" y="322" width="155" height="46" rx="5" fill="#0f172a"/><text x="297" y="341" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">デメリット</text><text x="297" y="358" text-anchor="middle" fill="#fca5a5" font-size="10" font-family="sans-serif">細部が失われる可能性</text><!-- Vector Memory --><rect x="410" y="225" width="370" height="155" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="430" y="250" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">④ Vector Memory (RAG)</text><text x="430" y="270" fill="#e9d5ff" font-size="12" font-family="sans-serif">• ベクトルDB (Pinecone等)</text><text x="430" y="290" fill="#e9d5ff" font-size="12" font-family="sans-serif">• 意味的類似度で検索</text><text x="430" y="310" fill="#e9d5ff" font-size="12" font-family="sans-serif">• 関連情報のみ注入</text><rect x="430" y="322" width="160" height="46" rx="5" fill="#0f172a"/><text x="510" y="341" text-anchor="middle" fill="#86efac" font-size="11" font-family="sans-serif">メリット</text><text x="510" y="358" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">大規模知識ベース対応</text><rect x="600" y="322" width="165" height="46" rx="5" fill="#0f172a"/><text x="682" y="341" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">デメリット</text><text x="682" y="358" text-anchor="middle" fill="#fca5a5" font-size="10" font-family="sans-serif">インデックス管理必要</text></svg>

<!--
メモリ戦略は4タイプ。In-Context（即時）、External DB（永続）、Summary（圧縮）、Vector RAG（大規模）。用途に応じて組み合わせることが多い。
-->

---

# RAGとClaudeの組み合わせ

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">RAG（検索拡張生成）パイプライン</text><!-- User Query --><rect x="20" y="60" width="130" height="55" rx="8" fill="#312e81" stroke="#7c3aed" stroke-width="2"/><text x="85" y="84" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">User</text><text x="85" y="102" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">「質問入力」</text><!-- Arrow 1 --><line x1="150" y1="88" x2="188" y2="88" stroke="#06b6d4" stroke-width="2"/><polygon points="188,83 200,88 188,93" fill="#06b6d4"/><!-- Embedding Model --><rect x="200" y="60" width="140" height="55" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="270" y="84" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">Embedding</text><text x="270" y="102" text-anchor="middle" fill="#cffafe" font-size="11" font-family="sans-serif">クエリをベクトル化</text><!-- Arrow 2 --><line x1="340" y1="88" x2="378" y2="88" stroke="#06b6d4" stroke-width="2"/><polygon points="378,83 390,88 378,93" fill="#06b6d4"/><!-- Vector DB --><rect x="390" y="48" width="140" height="80" rx="8" fill="#2d1b69" stroke="#7c3aed" stroke-width="2"/><text x="460" y="76" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">Vector DB</text><text x="460" y="94" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">Pinecone / Chroma</text><text x="460" y="112" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">Top-K 検索</text><!-- Arrow 3 --><line x1="530" y1="88" x2="568" y2="88" stroke="#06b6d4" stroke-width="2"/><polygon points="568,83 580,88 568,93" fill="#06b6d4"/><!-- Retrieved Chunks --><rect x="580" y="60" width="200" height="55" rx="8" fill="#1c2a1e" stroke="#16a34a" stroke-width="2"/><text x="680" y="84" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold" font-family="sans-serif">関連チャンク取得</text><text x="680" y="102" text-anchor="middle" fill="#bbf7d0" font-size="11" font-family="sans-serif">Top-3〜5チャンク</text><!-- Down arrow to Claude --><line x1="680" y1="115" x2="680" y2="148" stroke="#16a34a" stroke-width="2"/><polygon points="675,148 680,160 685,148" fill="#16a34a"/><!-- Prompt Assembly --><rect x="200" y="160" width="560" height="55" rx="8" fill="#3b1f0a" stroke="#ea580c" stroke-width="2"/><text x="480" y="183" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="bold" font-family="sans-serif">Prompt組み立て</text><text x="480" y="202" text-anchor="middle" fill="#fed7aa" font-size="11" font-family="sans-serif">Context: [チャンク1] [チャンク2] [チャンク3] + Question: [ユーザー質問]</text><!-- Arrow down to Claude --><line x1="480" y1="215" x2="480" y2="248" stroke="#ea580c" stroke-width="2"/><polygon points="475,248 480,260 485,248" fill="#ea580c"/><!-- Claude --><rect x="310" y="260" width="340" height="60" rx="10" fill="#312e81" stroke="#7c3aed" stroke-width="2.5"/><text x="480" y="287" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">Claude (LLM)</text><text x="480" y="307" text-anchor="middle" fill="#e9d5ff" font-size="12" font-family="sans-serif">コンテキストを参照して回答生成</text><!-- Arrow down to response --><line x1="480" y1="320" x2="480" y2="348" stroke="#7c3aed" stroke-width="2"/><polygon points="475,348 480,360 485,348" fill="#7c3aed"/><!-- Response --><rect x="200" y="360" width="560" height="45" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1.5"/><text x="480" y="384" text-anchor="middle" fill="#a5f3fc" font-size="13" font-family="sans-serif">根拠に基づいた正確な回答 + 出典情報</text><!-- Indexing side flow --><rect x="20" y="160" width="160" height="245" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="100" y="182" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold" font-family="sans-serif">インデックス構築</text><rect x="30" y="192" width="140" height="30" rx="4" fill="#1e3a5f"/><text x="100" y="212" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">ドキュメント分割</text><line x1="100" y1="222" x2="100" y2="237" stroke="#334155" stroke-width="1"/><polygon points="96,237 100,246 104,237" fill="#334155"/><rect x="30" y="246" width="140" height="30" rx="4" fill="#1e3a5f"/><text x="100" y="266" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">チャンク化</text><line x1="100" y1="276" x2="100" y2="291" stroke="#334155" stroke-width="1"/><polygon points="96,291 100,300 104,291" fill="#334155"/><rect x="30" y="300" width="140" height="30" rx="4" fill="#1e3a5f"/><text x="100" y="320" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">Embedding生成</text><line x1="100" y1="330" x2="100" y2="345" stroke="#334155" stroke-width="1"/><polygon points="96,345 100,354 104,345" fill="#334155"/><rect x="30" y="354" width="140" height="30" rx="4" fill="#2d1b69"/><text x="100" y="374" text-anchor="middle" fill="#c4b5fd" font-size="11" font-family="sans-serif">Vector DB保存</text></svg>

<!--
RAGはVector DBで関連チャンクを検索し、Claudeのプロンプトに注入する手法。ハルシネーション削減と最新情報対応が主な利点。インデックス構築とクエリ時の2フェーズ。
-->

---

<!-- _class: lead -->
# マルチモーダル機能

- 画像・ドキュメント・コンピュータ操作


---

# 画像理解・分析機能

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Claude 画像理解・分析機能</text><!-- Image input section --><rect x="20" y="55" width="240" height="200" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/><text x="140" y="80" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold" font-family="sans-serif">入力フォーマット</text><!-- Base64 --><rect x="35" y="92" width="210" height="38" rx="5" fill="#2d1b69"/><text x="55" y="108" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">Base64エンコード</text><text x="55" y="124" fill="#e9d5ff" font-size="10" font-family="sans-serif">ローカル画像を直接送信</text><!-- URL --><rect x="35" y="136" width="210" height="38" rx="5" fill="#1e3a5f"/><text x="55" y="152" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">URL参照</text><text x="55" y="168" fill="#cffafe" font-size="10" font-family="sans-serif">公開URLの画像を指定</text><!-- File types --><rect x="35" y="180" width="210" height="38" rx="5" fill="#1c2a1e"/><text x="55" y="196" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">対応形式</text><text x="55" y="212" fill="#bbf7d0" font-size="10" font-family="sans-serif">JPEG / PNG / GIF / WebP</text><!-- Max size --><rect x="35" y="224" width="210" height="24" rx="5" fill="#3b1f0a"/><text x="55" y="240" fill="#fb923c" font-size="10" font-family="sans-serif">最大: 5MB / 8,000 × 8,000px</text><!-- Capabilities --><rect x="280" y="55" width="510" height="200" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="535" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">主要機能</text><!-- 6 capability boxes in 3x2 grid --><rect x="295" y="92" width="150" height="50" rx="5" fill="#312e81"/><text x="370" y="113" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">画像内テキスト認識</text><text x="370" y="130" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">OCR・スキャン文書</text><rect x="460" y="92" width="150" height="50" rx="5" fill="#1e3a5f"/><text x="535" y="113" text-anchor="middle" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">図表・グラフ解析</text><text x="535" y="130" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">データ抽出・解釈</text><rect x="625" y="92" width="150" height="50" rx="5" fill="#1c2a1e"/><text x="700" y="113" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">UI/UXスクリーン</text><text x="700" y="130" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">レイアウト・要素解析</text><rect x="295" y="152" width="150" height="50" rx="5" fill="#3b1f0a"/><text x="370" y="173" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold" font-family="sans-serif">写真シーン理解</text><text x="370" y="190" text-anchor="middle" fill="#fed7aa" font-size="10" font-family="sans-serif">物体・人物・場所認識</text><rect x="460" y="152" width="150" height="50" rx="5" fill="#2d1b69"/><text x="535" y="173" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">コード画像解析</text><text x="535" y="190" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">スクショからコード生成</text><rect x="625" y="152" width="150" height="50" rx="5" fill="#1e3a5f"/><text x="700" y="173" text-anchor="middle" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">複数画像比較</text><text x="700" y="190" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">Before/After分析等</text><!-- API example --><rect x="20" y="270" width="760" height="135" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="40" y="292" fill="#64748b" font-size="11" font-family="monospace">// 画像を含むMessages API呼び出し</text><text x="40" y="312" fill="#a78bfa" font-size="11" font-family="monospace">messages:</text><text x="110" y="312" fill="#fff" font-size="11" font-family="monospace">[{</text><text x="60" y="330" fill="#06b6d4" font-size="11" font-family="monospace">role:</text><text x="100" y="330" fill="#86efac" font-size="11" font-family="monospace">"user"</text><text x="140" y="330" fill="#fff" font-size="11" font-family="monospace">, content: [</text><text x="80" y="348" fill="#fff" font-size="11" font-family="monospace">{</text><text x="96" y="348" fill="#06b6d4" font-size="11" font-family="monospace">type:</text><text x="134" y="348" fill="#86efac" font-size="11" font-family="monospace">"image"</text><text x="180" y="348" fill="#fff" font-size="11" font-family="monospace">, source: {</text><text x="275" y="348" fill="#06b6d4" font-size="11" font-family="monospace">type:</text><text x="313" y="348" fill="#86efac" font-size="11" font-family="monospace">"base64"</text><text x="358" y="348" fill="#fff" font-size="11" font-family="monospace">, media_type:</text><text x="448" y="348" fill="#86efac" font-size="11" font-family="monospace">"image/jpeg"</text><text x="527" y="348" fill="#fff" font-size="11" font-family="monospace">, data:</text><text x="566" y="348" fill="#86efac" font-size="11" font-family="monospace">base64Data</text><text x="634" y="348" fill="#fff" font-size="11" font-family="monospace">}}</text><text x="80" y="366" fill="#fff" font-size="11" font-family="monospace">{</text><text x="96" y="366" fill="#06b6d4" font-size="11" font-family="monospace">type:</text><text x="134" y="366" fill="#86efac" font-size="11" font-family="monospace">"text"</text><text x="172" y="366" fill="#fff" font-size="11" font-family="monospace">, text:</text><text x="208" y="366" fill="#86efac" font-size="11" font-family="monospace">"この画像を詳しく分析してください"</text><text x="440" y="366" fill="#fff" font-size="11" font-family="monospace">}</text><text x="40" y="390" fill="#fff" font-size="11" font-family="monospace">  ]}]</text></svg>

<!--
Claudeは画像をBase64またはURLで受け取り分析。テキスト認識、図表解析、UI解析、シーン理解など幅広い画像理解が可能。複数画像の同時処理にも対応。
-->

---

# Document処理（PDF/HTML）

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">ドキュメント処理パイプライン</text><!-- Input formats --><rect x="20" y="55" width="200" height="250" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/><text x="120" y="80" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold" font-family="sans-serif">入力形式</text><!-- PDF --><rect x="35" y="92" width="170" height="44" rx="6" fill="#3b1f0a" stroke="#ea580c" stroke-width="1"/><text x="55" y="111" fill="#fb923c" font-size="18" font-family="sans-serif">📄</text><text x="82" y="111" fill="#fb923c" font-size="13" font-weight="bold" font-family="sans-serif">PDF</text><text x="82" y="128" fill="#fed7aa" font-size="10" font-family="sans-serif">最大 32MB / 100ページ</text><!-- HTML --><rect x="35" y="143" width="170" height="44" rx="6" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1"/><text x="55" y="162" fill="#06b6d4" font-size="18" font-family="sans-serif">🌐</text><text x="82" y="162" fill="#a5f3fc" font-size="13" font-weight="bold" font-family="sans-serif">HTML</text><text x="82" y="179" fill="#cffafe" font-size="10" font-family="sans-serif">Webページ・メール</text><!-- Text --><rect x="35" y="194" width="170" height="44" rx="6" fill="#1c2a1e" stroke="#16a34a" stroke-width="1"/><text x="55" y="213" fill="#16a34a" font-size="18" font-family="sans-serif">📝</text><text x="82" y="213" fill="#86efac" font-size="13" font-weight="bold" font-family="sans-serif">Plain Text</text><text x="82" y="230" fill="#bbf7d0" font-size="10" font-family="sans-serif">CSV / JSON / Markdown</text><!-- Word/Excel (coming) --><rect x="35" y="245" width="170" height="44" rx="6" fill="#2d1b69" stroke="#7c3aed" stroke-width="1"/><text x="55" y="264" fill="#7c3aed" font-size="18" font-family="sans-serif">📊</text><text x="82" y="264" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">DOCX / XLSX</text><text x="82" y="281" fill="#e9d5ff" font-size="10" font-family="sans-serif">Office形式 (拡張予定)</text><!-- Arrow to processing --><line x1="220" y1="180" x2="258" y2="180" stroke="#06b6d4" stroke-width="2"/><polygon points="258,175 270,180 258,185" fill="#06b6d4"/><!-- Processing box --><rect x="270" y="55" width="265" height="250" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="402" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">Claude処理能力</text><!-- Processing items --><rect x="285" y="92" width="235" height="40" rx="5" fill="#312e81"/><text x="402" y="108" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">構造化データ抽出</text><text x="402" y="124" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">テーブル・フォーム・メタデータ</text><rect x="285" y="140" width="235" height="40" rx="5" fill="#1e3a5f"/><text x="402" y="156" text-anchor="middle" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">サマリ・要約生成</text><text x="402" y="172" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">長文→要点抽出</text><rect x="285" y="188" width="235" height="40" rx="5" fill="#1c2a1e"/><text x="402" y="204" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">Q&amp;A / 質問応答</text><text x="402" y="220" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">ドキュメント内容への問い合わせ</text><rect x="285" y="236" width="235" height="40" rx="5" fill="#3b1f0a"/><text x="402" y="252" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold" font-family="sans-serif">翻訳・変換</text><text x="402" y="268" text-anchor="middle" fill="#fed7aa" font-size="10" font-family="sans-serif">多言語変換・フォーマット変換</text><!-- Arrow to output --><line x1="535" y1="180" x2="573" y2="180" stroke="#06b6d4" stroke-width="2"/><polygon points="573,175 585,180 573,185" fill="#06b6d4"/><!-- Output --><rect x="585" y="55" width="195" height="250" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1.5"/><text x="682" y="80" text-anchor="middle" fill="#a5f3fc" font-size="13" font-weight="bold" font-family="sans-serif">出力形式</text><rect x="600" y="92" width="165" height="38" rx="5" fill="#0f172a"/><text x="682" y="108" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">JSON構造化データ</text><text x="682" y="123" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">API連携に最適</text><rect x="600" y="138" width="165" height="38" rx="5" fill="#0f172a"/><text x="682" y="154" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">Markdown</text><text x="682" y="169" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">ドキュメント生成</text><rect x="600" y="184" width="165" height="38" rx="5" fill="#0f172a"/><text x="682" y="200" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">自然言語サマリ</text><text x="682" y="215" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">人間向け要約</text><rect x="600" y="230" width="165" height="38" rx="5" fill="#0f172a"/><text x="682" y="246" text-anchor="middle" fill="#7dd3fc" font-size="11" font-family="sans-serif">カスタムフォーマット</text><text x="682" y="261" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">プロンプトで指定</text><!-- Bottom example --><rect x="20" y="320" width="760" height="85" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="40" y="342" fill="#64748b" font-size="11" font-family="monospace">// PDF送信例</text><text x="40" y="360" fill="#a78bfa" font-size="11" font-family="monospace">{ type:</text><text x="100" y="360" fill="#86efac" font-size="11" font-family="monospace">"document"</text><text x="170" y="360" fill="#fff" font-size="11" font-family="monospace">, source: { type:</text><text x="280" y="360" fill="#86efac" font-size="11" font-family="monospace">"base64"</text><text x="340" y="360" fill="#fff" font-size="11" font-family="monospace">, media_type:</text><text x="425" y="360" fill="#86efac" font-size="11" font-family="monospace">"application/pdf"</text><text x="537" y="360" fill="#fff" font-size="11" font-family="monospace">, data:</text><text x="577" y="360" fill="#86efac" font-size="11" font-family="monospace">pdfBase64 </text><text x="645" y="360" fill="#fff" font-size="11" font-family="monospace">},</text><text x="40" y="378" fill="#fff" font-size="11" font-family="monospace">  title:</text><text x="86" y="378" fill="#86efac" font-size="11" font-family="monospace">"契約書.pdf"</text><text x="165" y="378" fill="#fff" font-size="11" font-family="monospace">, citations: { enabled:</text><text x="312" y="378" fill="#fb923c" font-size="11" font-family="monospace">true</text><text x="340" y="378" fill="#fff" font-size="11" font-family="monospace">}}</text><text x="400" y="398" fill="#64748b" font-size="10" font-family="monospace">// citationsを有効にすると回答に引用箇所のページ番号が付与される</text></svg>

<!--
ClaudeはPDF、HTML、テキスト等のドキュメントを直接処理。Citations機能でページ番号付き引用も可能。最大100ページ、32MBまでのPDFに対応。
-->

---

# コンピュータ操作（Computer Use）

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Computer Use — UIオートメーション</text><!-- Left: How it works --><rect x="20" y="55" width="360" height="260" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="1.5"/><text x="200" y="80" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="bold" font-family="sans-serif">仕組み</text><!-- Step 1: Screenshot --><rect x="35" y="92" width="330" height="48" rx="6" fill="#312e81"/><text x="60" y="112" fill="#e9d5ff" font-size="12" font-weight="bold" font-family="sans-serif">① スクリーンショット撮影</text><text x="60" y="130" fill="#c4b5fd" font-size="11" font-family="sans-serif">現在の画面状態をClaudeに送信</text><!-- Arrow --><line x1="200" y1="140" x2="200" y2="152" stroke="#7c3aed" stroke-width="1.5"/><polygon points="196,152 200,161 204,152" fill="#7c3aed"/><!-- Step 2: Analyze --><rect x="35" y="161" width="330" height="48" rx="6" fill="#1e3a5f"/><text x="60" y="181" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">② 画面分析・判断</text><text x="60" y="199" fill="#cffafe" font-size="11" font-family="sans-serif">UI要素を認識し、次の操作を決定</text><!-- Arrow --><line x1="200" y1="209" x2="200" y2="221" stroke="#7c3aed" stroke-width="1.5"/><polygon points="196,221 200,230 204,221" fill="#7c3aed"/><!-- Step 3: Action --><rect x="35" y="230" width="330" height="48" rx="6" fill="#1c2a1e"/><text x="60" y="250" fill="#86efac" font-size="12" font-weight="bold" font-family="sans-serif">③ アクション実行</text><text x="60" y="268" fill="#bbf7d0" font-size="11" font-family="sans-serif">クリック / キー入力 / スクロール</text><!-- Loop arrow --><text x="200" y="302" text-anchor="middle" fill="#7c3aed" font-size="20" font-family="sans-serif">↻</text><text x="200" y="320" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">タスク完了まで繰り返し</text><!-- Right: Tools & Use cases --><rect x="400" y="55" width="380" height="260" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1.5"/><text x="590" y="80" text-anchor="middle" fill="#a5f3fc" font-size="14" font-weight="bold" font-family="sans-serif">提供ツール</text><!-- Tools --><rect x="415" y="92" width="165" height="40" rx="5" fill="#0f172a"/><text x="497" y="108" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">computer</text><text x="497" y="124" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">スクリーン操作全般</text><rect x="600" y="92" width="165" height="40" rx="5" fill="#0f172a"/><text x="682" y="108" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">text_editor</text><text x="682" y="124" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">ファイル編集</text><rect x="415" y="140" width="165" height="40" rx="5" fill="#0f172a"/><text x="497" y="156" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">bash</text><text x="497" y="172" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">コマンド実行</text><rect x="600" y="140" width="165" height="40" rx="5" fill="#0f172a"/><text x="682" y="156" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">web_search</text><text x="682" y="172" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">情報収集</text><!-- Use cases --><text x="590" y="200" text-anchor="middle" fill="#a5f3fc" font-size="12" font-weight="bold" font-family="sans-serif">活用例</text><text x="420" y="220" fill="#cffafe" font-size="11" font-family="sans-serif">• Webブラウジング・フォーム入力</text><text x="420" y="240" fill="#cffafe" font-size="11" font-family="sans-serif">• ソフトウェアテスト自動化</text><text x="420" y="260" fill="#cffafe" font-size="11" font-family="sans-serif">• レガシーシステム操作</text><text x="420" y="280" fill="#cffafe" font-size="11" font-family="sans-serif">• データ入力・収集タスク</text><!-- Warning bottom --><rect x="20" y="330" width="760" height="75" rx="10" fill="#3b1f0a" stroke="#ea580c" stroke-width="1.5"/><text x="400" y="352" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="bold" font-family="sans-serif">重要: セキュリティガイドライン</text><text x="40" y="372" fill="#fed7aa" font-size="11" font-family="sans-serif">• 人間の監視が必要な環境で利用 • 最小権限原則でサンドボックス化</text><text x="40" y="392" fill="#fed7aa" font-size="11" font-family="sans-serif">• 機密情報へのアクセスは慎重に • 本番環境での自動実行は段階的導入</text></svg>

<!--
Computer UseはClaudeがスクリーンショットを見てクリックやタイプなどUI操作を行う機能。computer、text_editor、bashツールを組み合わせて複雑なタスクを自動化。セキュリティ注意が必要。
-->

---

<!-- _class: lead -->
# 安全性・Constitutional AI

- 安全・信頼・倫理的AIの実現


---

# Constitutional AIの仕組み

- <svg viewBox="0 0 800 420" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="420" fill="#1e1b4b"/><text x="400" y="34" text-anchor="middle" fill="#a78bfa" font-size="18" font-weight="bold" font-family="sans-serif">Constitutional AI（CAI）アーキテクチャ</text><!-- Phase 1: SL-CAI --><rect x="20" y="55" width="370" height="165" rx="10" fill="#2d1b69" stroke="#7c3aed" stroke-width="2"/><text x="205" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">Phase 1: SL-CAI（教師あり学習）</text><!-- Step boxes --><rect x="35" y="90" width="160" height="50" rx="6" fill="#312e81"/><text x="115" y="111" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">有害プロンプト生成</text><text x="115" y="128" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">Red-teaming</text><!-- Arrow --><line x1="195" y1="115" x2="218" y2="115" stroke="#a78bfa" stroke-width="1.5"/><polygon points="218,110 228,115 218,120" fill="#a78bfa"/><!-- Self-critique --><rect x="228" y="90" width="145" height="50" rx="6" fill="#1e3a5f"/><text x="300" y="111" text-anchor="middle" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">自己批評</text><text x="300" y="128" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">原則リストで評価</text><!-- Arrow down --><line x1="205" y1="140" x2="205" y2="155" stroke="#a78bfa" stroke-width="1.5"/><polygon points="201,155 205,165 209,155" fill="#a78bfa"/><!-- Revision --><rect x="35" y="165" width="340" height="45" rx="6" fill="#1c2a1e"/><text x="205" y="185" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">修正版生成 → ファインチューニングデータ作成</text><text x="205" y="202" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">人間のラベリングなしにアライメントデータを自動生成</text><!-- Phase 2: RL-CAI --><rect x="410" y="55" width="370" height="165" rx="10" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#a5f3fc" font-size="13" font-weight="bold" font-family="sans-serif">Phase 2: RL-CAI（強化学習）</text><rect x="425" y="90" width="160" height="50" rx="6" fill="#0f172a"/><text x="505" y="111" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">複数回答を生成</text><text x="505" y="128" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">SL-CAIモデルが出力</text><line x1="585" y1="115" x2="608" y2="115" stroke="#06b6d4" stroke-width="1.5"/><polygon points="608,110 618,115 608,120" fill="#06b6d4"/><rect x="618" y="90" width="145" height="50" rx="6" fill="#0f172a"/><text x="690" y="111" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold" font-family="sans-serif">原則でランク付け</text><text x="690" y="128" text-anchor="middle" fill="#38bdf8" font-size="10" font-family="sans-serif">AIが順位を判定</text><line x1="595" y1="140" x2="595" y2="155" stroke="#06b6d4" stroke-width="1.5"/><polygon points="591,155 595,165 599,155" fill="#06b6d4"/><rect x="425" y="165" width="340" height="45" rx="6" fill="#2d1b69"/><text x="595" y="185" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">RLAIF（AI Feedback強化学習）</text><text x="595" y="202" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">人間のフィードバックなしに報酬モデルを学習</text><!-- Constitution principles --><rect x="20" y="235" width="760" height="170" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/><text x="400" y="258" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold" font-family="sans-serif">Constitutional Principles（原則例）</text><rect x="35" y="268" width="220" height="55" rx="6" fill="#312e81"/><text x="145" y="286" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">有害性の回避</text><text x="145" y="304" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">危険・暴力的・差別的</text><text x="145" y="318" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">コンテンツの拒否</text><rect x="270" y="268" width="220" height="55" rx="6" fill="#1e3a5f"/><text x="380" y="286" text-anchor="middle" fill="#a5f3fc" font-size="11" font-weight="bold" font-family="sans-serif">誠実性・正直さ</text><text x="380" y="304" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">不確実な場合は明示</text><text x="380" y="318" text-anchor="middle" fill="#cffafe" font-size="10" font-family="sans-serif">誤情報の回避</text><rect x="505" y="268" width="220" height="55" rx="6" fill="#1c2a1e"/><text x="615" y="286" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold" font-family="sans-serif">自律性の尊重</text><text x="615" y="304" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">ユーザーの判断を尊重</text><text x="615" y="318" text-anchor="middle" fill="#bbf7d0" font-size="10" font-family="sans-serif">依存関係を作らない</text><!-- HHH --><rect x="35" y="338" width="730" height="52" rx="6" fill="#2d1b69"/><text x="400" y="358" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">HHH原則: Helpful（役に立つ）・Harmless（無害）・Honest（誠実）</text><text x="400" y="378" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">すべての回答がこの3軸でバランスを取るように学習</text></svg>

<!--
Constitutional AIはAnthropicが開発した手法。原則リストを使ってモデルが自己批評と修正を繰り返すSL-CAIと、AIフィードバックで強化学習するRL-CAIの2フェーズ。HHH原則が基盤。
-->

---

# プロンプトインジェクション対策

- <svg viewBox="0 0 800 480" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="480" fill="#0f0a1e"/><text x="400" y="36" text-anchor="middle" fill="#06b6d4" font-size="18" font-weight="bold" font-family="sans-serif">プロンプトインジェクション攻撃フローと対策</text><!-- Attack flow --><rect x="30" y="60" width="140" height="50" rx="8" fill="#7c3aed" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="100" y="88" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif" font-weight="bold">悪意ある入力</text><line x1="170" y1="85" x2="210" y2="85" stroke="#ef4444" stroke-width="2"/><polygon points="210,80 222,85 210,90" fill="#ef4444"/><rect x="222" y="60" width="140" height="50" rx="8" fill="#374151"/><text x="292" y="82" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="sans-serif">システムプロンプト</text><text x="292" y="100" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="sans-serif">無効化の試み</text><line x1="362" y1="85" x2="402" y2="85" stroke="#ef4444" stroke-width="2"/><polygon points="402,80 414,85 402,90" fill="#ef4444"/><rect x="414" y="60" width="140" height="50" rx="8" fill="#374151"/><text x="484" y="82" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="sans-serif">権限昇格・</text><text x="484" y="100" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="sans-serif">データ漏洩</text><line x1="554" y1="85" x2="594" y2="85" stroke="#ef4444" stroke-width="2"/><polygon points="594,80 606,85 594,90" fill="#ef4444"/><rect x="606" y="60" width="140" height="50" rx="8" fill="#991b1b"/><text x="676" y="88" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif" font-weight="bold">被害発生</text><!-- Defense layers --><text x="400" y="150" text-anchor="middle" fill="#06b6d4" font-size="15" font-weight="bold" font-family="sans-serif">多層防御アーキテクチャ</text><!-- Layer 1 --><rect x="40" y="165" width="720" height="60" rx="10" fill="#1e1040" stroke="#7c3aed" stroke-width="2"/><text x="60" y="190" fill="#06b6d4" font-size="13" font-weight="bold" font-family="sans-serif">Layer 1: 入力サニタイズ</text><text x="60" y="210" fill="#d1d5db" font-size="12" font-family="sans-serif">• 特殊文字エスケープ　• 長さ制限　• 許可リスト方式でコンテンツ検証</text><!-- Layer 2 --><rect x="40" y="235" width="720" height="60" rx="10" fill="#0c1a2e" stroke="#06b6d4" stroke-width="2"/><text x="60" y="260" fill="#06b6d4" font-size="13" font-weight="bold" font-family="sans-serif">Layer 2: システムプロンプト強化</text><text x="60" y="280" fill="#d1d5db" font-size="12" font-family="sans-serif">• 役割と制約の明示　• 「以下を無視せよ」等の検出パターン追加　• Constitutional AI準拠</text><!-- Layer 3 --><rect x="40" y="305" width="720" height="60" rx="10" fill="#0f2818" stroke="#10b981" stroke-width="2"/><text x="60" y="330" fill="#10b981" font-size="13" font-weight="bold" font-family="sans-serif">Layer 3: 出力検証</text><text x="60" y="350" fill="#d1d5db" font-size="12" font-family="sans-serif">• PII/秘密情報のレッドアクション　• センシティブキーワードフィルタリング　• 構造バリデーション</text><!-- Layer 4 --><rect x="40" y="375" width="720" height="60" rx="10" fill="#1a0f00" stroke="#f59e0b" stroke-width="2"/><text x="60" y="400" fill="#f59e0b" font-size="13" font-weight="bold" font-family="sans-serif">Layer 4: 監視・ログ</text><text x="60" y="420" fill="#d1d5db" font-size="12" font-family="sans-serif">• 異常パターン検出　• リアルタイムアラート　• 全セッション監査ログ保持</text><!-- Shield icon --><text x="750" y="300" text-anchor="middle" fill="#7c3aed" font-size="48" font-family="sans-serif">🛡</text></svg>

<!--
プロンプトインジェクション攻撃は、悪意ある入力でシステムプロンプトを無効化し、不正な動作を引き起こす手法。多層防御が最も効果的な対策。
-->

---

# 権限モデルと安全な設計

- <svg viewBox="0 0 800 460" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="460" fill="#0f0a1e"/><text x="400" y="34" text-anchor="middle" fill="#06b6d4" font-size="18" font-weight="bold" font-family="sans-serif">最小権限原則に基づくClaude権限設計</text><!-- Central Hub --><circle cx="400" cy="230" r="55" fill="#7c3aed" style="filter: drop-shadow(0 0 12px rgba(124,58,237,0.6))"/><text x="400" y="224" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif">Claude</text><text x="400" y="242" text-anchor="middle" fill="#e9d5ff" font-size="12" font-family="sans-serif">エージェント</text><!-- Permission zones --><circle cx="400" cy="230" r="110" fill="none" stroke="#4b5563" stroke-width="1" stroke-dasharray="5,5"/><circle cx="400" cy="230" r="170" fill="none" stroke="#374151" stroke-width="1" stroke-dasharray="5,5"/><!-- Read zone --><rect x="280" y="80" width="110" height="44" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1.5"/><text x="335" y="99" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif" font-weight="bold">READ</text><text x="335" y="117" text-anchor="middle" fill="#a7f3d0" font-size="10" font-family="sans-serif">ファイル・DB参照</text><line x1="335" y1="124" x2="370" y2="178" stroke="#10b981" stroke-width="1.5"/><polygon points="366,178 374,178 370,170" fill="#10b981"/><!-- Write zone --><rect x="460" y="90" width="120" height="44" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/><text x="520" y="109" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="sans-serif" font-weight="bold">WRITE</text><text x="520" y="127" text-anchor="middle" fill="#bfdbfe" font-size="10" font-family="sans-serif">承認済みのみ</text><line x1="475" y1="134" x2="435" y2="178" stroke="#3b82f6" stroke-width="1.5"/><polygon points="431,178 439,178 435,170" fill="#3b82f6"/><!-- Execute zone --><rect x="580" y="200" width="120" height="44" rx="8" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/><text x="640" y="219" text-anchor="middle" fill="#fcd34d" font-size="11" font-family="sans-serif" font-weight="bold">EXECUTE</text><text x="640" y="237" text-anchor="middle" fill="#fde68a" font-size="10" font-family="sans-serif">ホワイトリスト制</text><line x1="580" y1="222" x2="458" y2="222" stroke="#f59e0b" stroke-width="1.5"/><polygon points="462,218 462,226 454,222" fill="#f59e0b"/><!-- Network zone --><rect x="550" y="320" width="120" height="44" rx="8" fill="#4a1942" stroke="#a855f7" stroke-width="1.5"/><text x="610" y="339" text-anchor="middle" fill="#d8b4fe" font-size="11" font-family="sans-serif" font-weight="bold">NETWORK</text><text x="610" y="357" text-anchor="middle" fill="#e9d5ff" font-size="10" font-family="sans-serif">許可ドメインのみ</text><line x1="555" y1="320" x2="440" y2="270" stroke="#a855f7" stroke-width="1.5"/><polygon points="436,274 444,266 444,274" fill="#a855f7"/><!-- Human approval --><rect x="120" y="300" width="140" height="44" rx="8" fill="#1a0f00" stroke="#ef4444" stroke-width="2"/><text x="190" y="319" text-anchor="middle" fill="#fca5a5" font-size="11" font-family="sans-serif" font-weight="bold">人間の承認必須</text><text x="190" y="337" text-anchor="middle" fill="#fecaca" font-size="10" font-family="sans-serif">破壊的操作</text><line x1="260" y1="322" x2="350" y2="270" stroke="#ef4444" stroke-width="2"/><polygon points="346,274 354,266 354,274" fill="#ef4444"/><!-- Audit log --><rect x="80" y="170" width="140" height="44" rx="8" fill="#0c1a2e" stroke="#06b6d4" stroke-width="1.5"/><text x="150" y="189" text-anchor="middle" fill="#67e8f9" font-size="11" font-family="sans-serif" font-weight="bold">監査ログ</text><text x="150" y="207" text-anchor="middle" fill="#a5f3fc" font-size="10" font-family="sans-serif">全操作記録</text><line x1="220" y1="192" x2="345" y2="210" stroke="#06b6d4" stroke-width="1.5"/><polygon points="341,206 349,214 341,214" fill="#06b6d4"/><!-- Labels --><text x="400" y="420" text-anchor="middle" fill="#9ca3af" font-size="11" font-family="sans-serif">内側の円: 読み取り専用ゾーン　外側の円: 書き込み/実行ゾーン（要承認）</text></svg>

<!--
最小権限原則（Principle of Least Privilege）をClaude統合に適用する。読み取り・書き込み・実行・ネットワークの各権限を分離し、破壊的操作は必ず人間の承認を要求する設計が重要。
-->

---

<!-- _class: lead -->
# 実践パターン集

- Claude APIを使った実装の
- ベストプラクティスを学ぶ

<!--
ここからは実際の開発現場で役立つ実践的なパターンを紹介します。コード生成、データ分析、CI/CD統合など具体的な実装例を見ていきます。
-->

---

# コード生成ベストプラクティス

- コンテキスト設計が品質を決める

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

async function generateCode(requirement: string, context: CodeContext) {
  const systemPrompt = `あなたは${context.language}の専門エンジニアです。
以下の制約に従ってコードを生成してください:
- コードスタイル: ${context.style}
- テストフレームワーク: ${context.testFramework}
- 既存の依存関係: ${context.dependencies.join(", ")}
- セキュリティ要件: 入力バリデーション必須、SQLインジェクション対策

必ずTypeScriptの型定義を含め、JSDocコメントを付与すること。`;

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `要件: ${requirement}\n\n既存コード:\n\`\`\`${context.language}\n${context.existingCode}\n\`\`\``
          }
        ]
      }
    ]
  });

  // Extract code blocks from response
  const content = response.content[0];
  if (content.type === "text") {
    return extractCodeBlocks(content.text);
  }
}
```

<!--
コード生成の品質はシステムプロンプトの設計に大きく依存する。言語・スタイル・テストフレームワーク・セキュリティ要件を明示し、既存コードのコンテキストを提供することで、一貫性の高いコードが生成される。
-->

---

# データ分析パイプライン

- <svg viewBox="0 0 800 450" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="450" fill="#0f0a1e"/><text x="400" y="32" text-anchor="middle" fill="#06b6d4" font-size="17" font-weight="bold" font-family="sans-serif">Claude駆動データ分析パイプライン</text><!-- Stage 1: Data Ingestion --><rect x="20" y="55" width="140" height="80" rx="10" fill="#1e1040" stroke="#7c3aed" stroke-width="2"/><text x="90" y="82" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">データ取込</text><text x="90" y="100" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">CSV/JSON/</text><text x="90" y="116" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="sans-serif">API/DB</text><!-- Arrow 1 --><line x1="160" y1="95" x2="190" y2="95" stroke="#06b6d4" stroke-width="2"/><polygon points="190,90 202,95 190,100" fill="#06b6d4"/><!-- Stage 2: Claude Analysis --><rect x="202" y="55" width="160" height="80" rx="10" fill="#1a0a3e" stroke="#7c3aed" stroke-width="2.5"/><text x="282" y="82" text-anchor="middle" fill="#e9d5ff" font-size="12" font-weight="bold" font-family="sans-serif">Claude分析</text><text x="282" y="100" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">パターン検出</text><text x="282" y="116" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="sans-serif">異常値識別</text><!-- Arrow 2 --><line x1="362" y1="95" x2="392" y2="95" stroke="#06b6d4" stroke-width="2"/><polygon points="392,90 404,95 392,100" fill="#06b6d4"/><!-- Stage 3: Insight Generation --><rect x="404" y="55" width="160" height="80" rx="10" fill="#0c1a2e" stroke="#06b6d4" stroke-width="2"/><text x="484" y="82" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="bold" font-family="sans-serif">インサイト生成</text><text x="484" y="100" text-anchor="middle" fill="#a5f3fc" font-size="10" font-family="sans-serif">自然言語レポート</text><text x="484" y="116" text-anchor="middle" fill="#a5f3fc" font-size="10" font-family="sans-serif">可視化提案</text><!-- Arrow 3 --><line x1="564" y1="95" x2="594" y2="95" stroke="#06b6d4" stroke-width="2"/><polygon points="594,90 606,95 594,100" fill="#06b6d4"/><!-- Stage 4: Action --><rect x="606" y="55" width="160" height="80" rx="10" fill="#0f2818" stroke="#10b981" stroke-width="2"/><text x="686" y="82" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">アクション</text><text x="686" y="100" text-anchor="middle" fill="#a7f3d0" font-size="10" font-family="sans-serif">レポート出力</text><text x="686" y="116" text-anchor="middle" fill="#a7f3d0" font-size="10" font-family="sans-serif">アラート送信</text><!-- Code example --><rect x="20" y="155" width="380" height="175" rx="8" fill="#111827" stroke="#374151" stroke-width="1"/><text x="35" y="178" fill="#6b7280" font-size="11" font-family="monospace">// Claudeによる自動分析リクエスト</text><text x="35" y="198" fill="#10b981" font-size="11" font-family="monospace">const analysis = await claude.messages.create(&#123;  </text><text x="35" y="216" fill="#93c5fd" font-size="11" font-family="monospace">  model: <tspan fill="#fbbf24">"claude-opus-4-5"</tspan>,</text><text x="35" y="234" fill="#93c5fd" font-size="11" font-family="monospace">  messages: [&#123;role: <tspan fill="#fbbf24">"user"</tspan>,</text><text x="35" y="252" fill="#d1d5db" font-size="11" font-family="monospace">    content: `データを分析して:</text><text x="35" y="270" fill="#d1d5db" font-size="11" font-family="monospace">      $&#123;JSON.stringify(dataset, null, 2)&#125;`</text><text x="35" y="288" fill="#6b7280" font-size="11" font-family="monospace">  &#125;], tools: [statisticsTool]</text><text x="35" y="306" fill="#10b981" font-size="11" font-family="monospace">&#125;);</text><!-- Metrics --><rect x="420" y="155" width="360" height="175" rx="8" fill="#111827" stroke="#374151" stroke-width="1"/><text x="600" y="178" text-anchor="middle" fill="#06b6d4" font-size="13" font-weight="bold" font-family="sans-serif">分析能力</text><!-- Metric bars --><text x="440" y="205" fill="#9ca3af" font-size="11" font-family="sans-serif">外れ値検出</text><rect x="540" y="192" width="200" height="16" rx="4" fill="#1f2937"/><rect x="540" y="192" width="184" height="16" rx="4" fill="#7c3aed"/><text x="750" y="205" fill="#c4b5fd" font-size="11" font-family="sans-serif">92%</text><text x="440" y="233" fill="#9ca3af" font-size="11" font-family="sans-serif">トレンド予測</text><rect x="540" y="220" width="200" height="16" rx="4" fill="#1f2937"/><rect x="540" y="220" width="170" height="16" rx="4" fill="#06b6d4"/><text x="750" y="233" fill="#67e8f9" font-size="11" font-family="sans-serif">85%</text><text x="440" y="261" fill="#9ca3af" font-size="11" font-family="sans-serif">相関発見</text><rect x="540" y="248" width="200" height="16" rx="4" fill="#1f2937"/><rect x="540" y="248" width="192" height="16" rx="4" fill="#10b981"/><text x="750" y="261" fill="#6ee7b7" font-size="11" font-family="sans-serif">96%</text><text x="440" y="289" fill="#9ca3af" font-size="11" font-family="sans-serif">レポート生成</text><rect x="540" y="276" width="200" height="16" rx="4" fill="#1f2937"/><rect x="540" y="276" width="200" height="16" rx="4" fill="#f59e0b"/><text x="750" y="289" fill="#fcd34d" font-size="11" font-family="sans-serif">100%</text><text x="440" y="317" fill="#9ca3af" font-size="11" font-family="sans-serif">処理速度</text><rect x="540" y="304" width="200" height="16" rx="4" fill="#1f2937"/><rect x="540" y="304" width="160" height="16" rx="4" fill="#a855f7"/><text x="750" y="317" fill="#d8b4fe" font-size="11" font-family="sans-serif">80%</text><!-- Bottom summary --><rect x="20" y="345" width="760" height="85" rx="8" fill="#1a1040" stroke="#7c3aed" stroke-width="1"/><text x="400" y="368" text-anchor="middle" fill="#06b6d4" font-size="13" font-weight="bold" font-family="sans-serif">主要ユースケース</text><text x="80" y="395" text-anchor="middle" fill="#c4b5fd" font-size="11" font-family="sans-serif" font-weight="bold">売上予測</text><text x="80" y="413" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">時系列分析</text><text x="240" y="395" text-anchor="middle" fill="#67e8f9" font-size="11" font-family="sans-serif" font-weight="bold">品質管理</text><text x="240" y="413" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">異常検知</text><text x="400" y="395" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif" font-weight="bold">顧客分析</text><text x="400" y="413" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">セグメント化</text><text x="560" y="395" text-anchor="middle" fill="#fcd34d" font-size="11" font-family="sans-serif" font-weight="bold">リスク評価</text><text x="560" y="413" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">パターン識別</text><text x="720" y="395" text-anchor="middle" fill="#d8b4fe" font-size="11" font-family="sans-serif" font-weight="bold">ログ分析</text><text x="720" y="413" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">根本原因特定</text></svg>

<!--
Claude APIを活用したデータ分析パイプラインでは、データ取込から分析・インサイト生成・アクションまでを自動化できる。自然言語での分析指示が可能で、統計ツールとの連携も強力。
-->

---

# CI/CD統合パターン

- <svg viewBox="0 0 800 450" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="450" fill="#0f0a1e"/><text x="400" y="32" text-anchor="middle" fill="#06b6d4" font-size="17" font-weight="bold" font-family="sans-serif">Claude統合CI/CDパイプライン</text><!-- Pipeline stages --><rect x="10" y="55" width="90" height="60" rx="8" fill="#1e1040" stroke="#7c3aed" stroke-width="2"/><text x="55" y="80" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">コード</text><text x="55" y="98" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">Push</text><!-- Arrow --><line x1="100" y1="85" x2="118" y2="85" stroke="#06b6d4" stroke-width="2"/><polygon points="118,80 130,85 118,90" fill="#06b6d4"/><!-- Claude Review --><rect x="130" y="50" width="120" height="70" rx="8" fill="#1a0a3e" stroke="#a855f7" stroke-width="2.5"/><text x="190" y="76" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">Claude</text><text x="190" y="94" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">コードレビュー</text><text x="190" y="110" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">AI</text><!-- Arrow --><line x1="250" y1="85" x2="268" y2="85" stroke="#06b6d4" stroke-width="2"/><polygon points="268,80 280,85 268,90" fill="#06b6d4"/><!-- Build --><rect x="280" y="55" width="90" height="60" rx="8" fill="#0c1a2e" stroke="#3b82f6" stroke-width="2"/><text x="325" y="80" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold" font-family="sans-serif">ビルド</text><text x="325" y="98" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold" font-family="sans-serif">&amp; テスト</text><!-- Arrow --><line x1="370" y1="85" x2="388" y2="85" stroke="#06b6d4" stroke-width="2"/><polygon points="388,80 400,85 388,90" fill="#06b6d4"/><!-- Claude Security --><rect x="400" y="50" width="120" height="70" rx="8" fill="#1a0a3e" stroke="#a855f7" stroke-width="2.5"/><text x="460" y="76" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">Claude</text><text x="460" y="94" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">セキュリティ</text><text x="460" y="110" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">AI</text><!-- Arrow --><line x1="520" y1="85" x2="538" y2="85" stroke="#06b6d4" stroke-width="2"/><polygon points="538,80 550,85 538,90" fill="#06b6d4"/><!-- Deploy --><rect x="550" y="55" width="90" height="60" rx="8" fill="#0f2818" stroke="#10b981" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">ステージ</text><text x="595" y="98" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">デプロイ</text><!-- Arrow --><line x1="640" y1="85" x2="658" y2="85" stroke="#06b6d4" stroke-width="2"/><polygon points="658,80 670,85 658,90" fill="#06b6d4"/><!-- Claude Monitor --><rect x="670" y="50" width="120" height="70" rx="8" fill="#1a0a3e" stroke="#a855f7" stroke-width="2.5"/><text x="730" y="76" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">Claude</text><text x="730" y="94" text-anchor="middle" fill="#e9d5ff" font-size="11" font-weight="bold" font-family="sans-serif">監視分析</text><text x="730" y="110" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">AI</text><!-- Detail panels --><rect x="10" y="140" width="370" height="140" rx="8" fill="#111827" stroke="#374151" stroke-width="1"/><text x="195" y="162" text-anchor="middle" fill="#a855f7" font-size="13" font-weight="bold" font-family="sans-serif">Claude コードレビュー機能</text><text x="25" y="186" fill="#d1d5db" font-size="11" font-family="sans-serif">• バグ・脆弱性の自動検出（CVE照合）</text><text x="25" y="207" fill="#d1d5db" font-size="11" font-family="sans-serif">• コードスタイル・パフォーマンス改善提案</text><text x="25" y="228" fill="#d1d5db" font-size="11" font-family="sans-serif">• テストカバレッジ不足箇所の特定</text><text x="25" y="249" fill="#d1d5db" font-size="11" font-family="sans-serif">• PR説明文の自動生成・レビューコメント</text><text x="25" y="270" fill="#d1d5db" font-size="11" font-family="sans-serif">• アーキテクチャ一貫性チェック</text><rect x="420" y="140" width="370" height="140" rx="8" fill="#111827" stroke="#374151" stroke-width="1"/><text x="605" y="162" text-anchor="middle" fill="#10b981" font-size="13" font-weight="bold" font-family="sans-serif">Claude セキュリティスキャン</text><text x="435" y="186" fill="#d1d5db" font-size="11" font-family="sans-serif">• OWASP Top 10 脆弱性スキャン</text><text x="435" y="207" fill="#d1d5db" font-size="11" font-family="sans-serif">• シークレット・APIキーの漏洩検出</text><text x="435" y="228" fill="#d1d5db" font-size="11" font-family="sans-serif">• 依存関係の既知脆弱性チェック</text><text x="435" y="249" fill="#d1d5db" font-size="11" font-family="sans-serif">• IaC設定ミス（Terraform/K8s）検出</text><text x="435" y="270" fill="#d1d5db" font-size="11" font-family="sans-serif">• コンプライアンス違反の自動レポート</text><!-- GitHub Actions YAML snippet --><rect x="10" y="295" width="780" height="140" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/><text x="25" y="316" fill="#6b7280" font-size="11" font-family="monospace"># .github/workflows/claude-review.yml</text><text x="25" y="334" fill="#f0883e" font-size="11" font-family="monospace">- name: </text><text x="100" y="334" fill="#a5d6ff" font-size="11" font-family="monospace">Claude Code Review</text><text x="25" y="352" fill="#f0883e" font-size="11" font-family="monospace">  uses: </text><text x="90" y="352" fill="#a5d6ff" font-size="11" font-family="monospace">anthropics/claude-code-action@v2</text><text x="25" y="370" fill="#f0883e" font-size="11" font-family="monospace">  with:</text><text x="25" y="388" fill="#d2a8ff" font-size="11" font-family="monospace">    claude_model: </text><text x="165" y="388" fill="#a5d6ff" font-size="11" font-family="monospace">claude-opus-4-5</text><text x="25" y="406" fill="#d2a8ff" font-size="11" font-family="monospace">    review_focus: </text><text x="165" y="406" fill="#a5d6ff" font-size="11" font-family="monospace">"security,performance,style"</text><text x="25" y="424" fill="#d2a8ff" font-size="11" font-family="monospace">    auto_fix: </text><text x="120" y="424" fill="#79c0ff" font-size="11" font-family="monospace">true</text></svg>

<!--
CI/CDパイプラインにClaudeを統合することで、コードレビューとセキュリティスキャンを自動化できる。GitHub Actionsのアクションとして利用でき、PRへの自動コメントや修正提案が可能。
-->

---

# エラーハンドリング戦略

- 堅牢なAPI統合のための実装パターン

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { APIError, RateLimitError, APIConnectionError } from "@anthropic-ai/sdk";

const client = new Anthropic();

// 指数バックオフによるリトライ戦略
async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RateLimitError) {
        // レート制限: Retry-After ヘッダを尊重
        const retryAfter = error.headers?.["retry-after"];
        const delay = retryAfter
          ? parseInt(retryAfter) * 1000
          : baseDelay * Math.pow(2, attempt);
        if (attempt < maxRetries) {
          await sleep(delay + Math.random() * 1000); // ジッター追加
          continue;
        }
      } else if (error instanceof APIConnectionError) {
        // 接続エラー: リトライ可能
        if (attempt < maxRetries) {
          await sleep(baseDelay * Math.pow(2, attempt));
          continue;
        }
      } else if (error instanceof APIError && error.status >= 500) {
        // サーバーエラー: リトライ可能
        if (attempt < maxRetries) {
          await sleep(baseDelay * Math.pow(2, attempt));
          continue;
        }
      }
      throw error; // リトライ不可能なエラーは再スロー
    }
  }
  throw new Error("Max retries exceeded");
}
```

<!--
APIエラーは種類によって対処が異なる。レート制限はRetry-Afterヘッダを尊重し、接続エラーやサーバーエラーは指数バックオフでリトライ。認証エラーなどはリトライせず即時失敗させる。
-->

---

# コスト最適化の手法

- <svg viewBox="0 0 800 450" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="450" fill="#0f0a1e"/><text x="400" y="32" text-anchor="middle" fill="#06b6d4" font-size="17" font-weight="bold" font-family="sans-serif">Claude APIコスト最適化戦略</text><!-- Cost breakdown donut chart (simplified as segments) --><circle cx="150" cy="180" r="80" fill="none" stroke="#7c3aed" stroke-width="30" stroke-dasharray="150 352" stroke-dashoffset="0"/><circle cx="150" cy="180" r="80" fill="none" stroke="#06b6d4" stroke-width="30" stroke-dasharray="100 352" stroke-dashoffset="-150"/><circle cx="150" cy="180" r="80" fill="none" stroke="#10b981" stroke-width="30" stroke-dasharray="60 352" stroke-dashoffset="-250"/><circle cx="150" cy="180" r="80" fill="none" stroke="#f59e0b" stroke-width="30" stroke-dasharray="42 352" stroke-dashoffset="-310"/><text x="150" y="175" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="sans-serif">コスト</text><text x="150" y="193" text-anchor="middle" fill="#9ca3af" font-size="11" font-family="sans-serif">内訳</text><!-- Legend --><rect x="240" y="100" width="14" height="14" rx="3" fill="#7c3aed"/><text x="260" y="113" fill="#c4b5fd" font-size="12" font-family="sans-serif">入力トークン (43%)</text><rect x="240" y="125" width="14" height="14" rx="3" fill="#06b6d4"/><text x="260" y="138" fill="#67e8f9" font-size="12" font-family="sans-serif">出力トークン (28%)</text><rect x="240" y="150" width="14" height="14" rx="3" fill="#10b981"/><text x="260" y="163" fill="#6ee7b7" font-size="12" font-family="sans-serif">冗長プロンプト (17%)</text><rect x="240" y="175" width="14" height="14" rx="3" fill="#f59e0b"/><text x="260" y="188" fill="#fcd34d" font-size="12" font-family="sans-serif">リトライ (12%)</text><!-- Optimization strategies --><text x="400" y="235" text-anchor="middle" fill="#06b6d4" font-size="14" font-weight="bold" font-family="sans-serif">削減戦略</text><!-- Strategy cards --><rect x="10" y="250" width="175" height="90" rx="8" fill="#1e1040" stroke="#7c3aed" stroke-width="1.5"/><text x="98" y="272" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">モデル選択</text><text x="98" y="292" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Haiku → Sonnet → Opus</text><text x="98" y="310" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">タスク複雑度で使い分け</text><text x="98" y="328" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold" font-family="sans-serif">最大80%削減</text><rect x="200" y="250" width="175" height="90" rx="8" fill="#0c1a2e" stroke="#06b6d4" stroke-width="1.5"/><text x="288" y="272" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="bold" font-family="sans-serif">プロンプトキャッシュ</text><text x="288" y="292" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">system prompt を</text><text x="288" y="310" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">cache_control でキャッシュ</text><text x="288" y="328" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold" font-family="sans-serif">最大90%削減</text><rect x="390" y="250" width="175" height="90" rx="8" fill="#0f2818" stroke="#10b981" stroke-width="1.5"/><text x="478" y="272" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">バッチ処理</text><text x="478" y="292" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Message Batches API</text><text x="478" y="310" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">非同期一括処理</text><text x="478" y="328" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold" font-family="sans-serif">50%割引適用</text><rect x="580" y="250" width="210" height="90" rx="8" fill="#1a0f00" stroke="#f59e0b" stroke-width="1.5"/><text x="685" y="272" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold" font-family="sans-serif">出力制限</text><text x="685" y="292" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">max_tokens を適切に設定</text><text x="685" y="310" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">構造化出力でトークン節約</text><text x="685" y="328" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold" font-family="sans-serif">30%削減</text><!-- Bottom code example --><rect x="10" y="355" width="780" height="80" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/><text x="25" y="375" fill="#6b7280" font-size="11" font-family="monospace">// プロンプトキャッシュの実装例</text><text x="25" y="393" fill="#d2a8ff" font-size="11" font-family="monospace">system: [&#123;type: </text><text x="160" y="393" fill="#a5d6ff" font-size="11" font-family="monospace">"text"</text><text x="202" y="393" fill="#d2a8ff" font-size="11" font-family="monospace">, text: longSystemPrompt, cache_control: &#123;</text><text x="510" y="393" fill="#79c0ff" font-size="11" font-family="monospace">type: </text><text x="555" y="393" fill="#a5d6ff" font-size="11" font-family="monospace">"ephemeral"</text><text x="650" y="393" fill="#d2a8ff" font-size="11" font-family="monospace">&#125;&#125;]</text><text x="25" y="420" fill="#6b7280" font-size="11" font-family="monospace">// 次回以降のリクエストでキャッシュヒット → 入力コスト90%削減</text></svg>

<!--
Claude APIのコスト最適化は4つの戦略が核心。①タスクに応じたモデル選択、②プロンプトキャッシュによる繰り返しコスト削減、③Message Batches APIによる50%割引、④max_tokensの適切な設定による出力制限。
-->

---

<!-- _class: lead -->
# まとめ

- 2026年、Claudeで開発の未来を切り拓く

<!--
ここまでClaude 2026の主要機能と実践パターンを見てきました。最後に全体をまとめ、これからのロードマップを紹介します。
-->

---

# 2026年のClaude活用ロードマップ

- <svg viewBox="0 0 800 450" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="450" fill="#0f0a1e"/><text x="400" y="32" text-anchor="middle" fill="#06b6d4" font-size="17" font-weight="bold" font-family="sans-serif">Claude 2026 エンジニア活用ロードマップ</text><!-- Timeline line --><line x1="60" y1="230" x2="760" y2="230" stroke="#374151" stroke-width="3"/><!-- Q1 2026 --><circle cx="120" cy="230" r="16" fill="#7c3aed" style="filter: drop-shadow(0 0 8px rgba(124,58,237,0.8))"/><text x="120" y="235" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Q1</text><!-- Q1 content above --><line x1="120" y1="214" x2="120" y2="165" stroke="#7c3aed" stroke-width="1.5"/><rect x="40" y="110" width="160" height="55" rx="8" fill="#1e1040" stroke="#7c3aed" stroke-width="1.5"/><text x="120" y="132" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold" font-family="sans-serif">基礎統合</text><text x="120" y="150" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Claude API導入</text><text x="120" y="163" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">コードレビュー自動化</text><!-- Q1 below --><line x1="120" y1="246" x2="120" y2="280" stroke="#7c3aed" stroke-width="1.5"/><text x="120" y="298" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">達成目標</text><text x="120" y="314" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">開発速度 +30%</text><!-- Q2 2026 --><circle cx="290" cy="230" r="16" fill="#06b6d4" style="filter: drop-shadow(0 0 8px rgba(6,182,212,0.8))"/><text x="290" y="235" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Q2</text><!-- Q2 content below --><line x1="290" y1="246" x2="290" y2="280" stroke="#06b6d4" stroke-width="1.5"/><rect x="210" y="280" width="160" height="55" rx="8" fill="#0c1a2e" stroke="#06b6d4" stroke-width="1.5"/><text x="290" y="302" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="bold" font-family="sans-serif">エージェント化</text><text x="290" y="320" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Computer Use本番投入</text><text x="290" y="333" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Multi-Agent構築</text><!-- Q2 above --><line x1="290" y1="214" x2="290" y2="170" stroke="#06b6d4" stroke-width="1.5"/><text x="290" y="155" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">達成目標</text><text x="290" y="170" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">自動化率 60%</text><!-- Q3 2026 --><circle cx="510" cy="230" r="16" fill="#10b981" style="filter: drop-shadow(0 0 8px rgba(16,185,129,0.8))"/><text x="510" y="235" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Q3</text><!-- Q3 content above --><line x1="510" y1="214" x2="510" y2="165" stroke="#10b981" stroke-width="1.5"/><rect x="430" y="110" width="160" height="55" rx="8" fill="#0f2818" stroke="#10b981" stroke-width="1.5"/><text x="510" y="132" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">最適化フェーズ</text><text x="510" y="150" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">コスト最適化実施</text><text x="510" y="163" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">セキュリティ強化</text><!-- Q3 below --><line x1="510" y1="246" x2="510" y2="280" stroke="#10b981" stroke-width="1.5"/><text x="510" y="298" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">達成目標</text><text x="510" y="314" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">コスト -50%</text><!-- Q4 2026 --><circle cx="700" cy="230" r="16" fill="#f59e0b" style="filter: drop-shadow(0 0 8px rgba(245,158,11,0.8))"/><text x="700" y="235" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Q4</text><!-- Q4 content below --><line x1="700" y1="246" x2="700" y2="280" stroke="#f59e0b" stroke-width="1.5"/><rect x="620" y="280" width="160" height="55" rx="8" fill="#1a0f00" stroke="#f59e0b" stroke-width="1.5"/><text x="700" y="302" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold" font-family="sans-serif">全社展開</text><text x="700" y="320" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">全チームAI協働</text><text x="700" y="333" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">次世代機能評価</text><!-- Q4 above --><line x1="700" y1="214" x2="700" y2="170" stroke="#f59e0b" stroke-width="1.5"/><text x="700" y="155" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold" font-family="sans-serif">達成目標</text><text x="700" y="170" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">生産性 2x達成</text><!-- Bottom summary cards --><rect x="10" y="360" width="180" height="75" rx="8" fill="#1e1040" stroke="#7c3aed" stroke-width="1"/><text x="100" y="382" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">今日からできること</text><text x="100" y="400" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Claude API無料枠で</text><text x="100" y="416" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">プロトタイプ作成</text><rect x="210" y="360" width="180" height="75" rx="8" fill="#0c1a2e" stroke="#06b6d4" stroke-width="1"/><text x="300" y="382" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="bold" font-family="sans-serif">推奨スタートモデル</text><text x="300" y="400" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Claude 3.5 Haiku</text><text x="300" y="416" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">（低コスト・高速）</text><rect x="410" y="360" width="180" height="75" rx="8" fill="#0f2818" stroke="#10b981" stroke-width="1"/><text x="500" y="382" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">学習リソース</text><text x="500" y="400" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">docs.anthropic.com</text><text x="500" y="416" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Claude Cookbook</text><rect x="610" y="360" width="180" height="75" rx="8" fill="#1a0f00" stroke="#f59e0b" stroke-width="1"/><text x="700" y="382" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold" font-family="sans-serif">コミュニティ</text><text x="700" y="400" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">Anthropic Discord</text><text x="700" y="416" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="sans-serif">GitHub Discussions</text></svg>

<!--
2026年のClaude活用ロードマップは4つのフェーズで進める。Q1で基礎統合・コードレビュー自動化、Q2でエージェント化・Multi-Agent構築、Q3でコスト最適化・セキュリティ強化、Q4で全社展開と生産性2x達成を目指す。
-->
