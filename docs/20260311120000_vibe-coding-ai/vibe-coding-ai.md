---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Vibe Coding & AI駆動開発"
footer: "© 2026 Internal Training"
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
  
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  
---

<!-- _class: lead -->
# Vibe Coding & AI駆動開発

- 2026年の開発現場を変える新しいパラダイム
- AIと人間が協働する次世代ソフトウェア開発
- Claude Code を中心とした実践的ガイド

<!--
タイトルスライド。Vibe Codingとは自然言語でAIに意図を伝え、AIがコードを生成・実行するスタイルの開発手法。
-->

---

# アジェンダ（1/2）

> *AIコーディングの現在地からClaude Codeの設計まで4テーマで開発革命の全体像を把握する*

- 1. AIコーディングの現在地 2026
- 2. Vibe Coding とは何か
- 3. 従来開発 vs AI駆動開発
- 4. Claude Code の概要とアーキテクチャ

<!--
全体構成を示すアジェンダスライド。
-->

---

# アジェンダ（2/2）

> *プロンプト設計からエージェント並列実行まで実践パターンで即日活用できる技術を網羅する*

- 5. セットアップ・基本的な使い方
- 6. プロンプト設計 & ツール使用の仕組み
- 7. コンテキスト管理・CLAUDE.md・Hooks
- 8. エージェントループ・並列実行・実践パターン

<!--
全体構成を示すアジェンダスライド。
-->

---

# AIコーディングの現在地 2026

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="45" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">AIコーディングの進化 2020→2026</text>

  <!-- Timeline line -->
  <line x1="60" y1="250" x2="740" y2="250" stroke="#a78bfa" stroke-width="3"/>

  <!-- Arrow at end -->
  <polygon points="740,243 756,250 740,257" fill="#a78bfa"/>

  <!-- Year markers and circles -->
  <!-- 2020 -->
  <circle cx="100" cy="250" r="14" fill="#a78bfa"/>
  <text x="100" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1a1a2e" text-anchor="middle">2020</text>
  <rect x="50" y="150" width="100" height="72" rx="8" fill="#2d2d5e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="100" y="170" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Copilot登場</text>
  <text x="100" y="188" font-family="sans-serif" font-size="10" fill="#c4b5fd" text-anchor="middle">コード補完</text>
  <text x="100" y="205" font-family="sans-serif" font-size="10" fill="#c4b5fd" text-anchor="middle">サジェスト</text>
  <line x1="100" y1="222" x2="100" y2="236" stroke="#a78bfa" stroke-width="1.5"/>

  <!-- 2022 -->
  <circle cx="240" cy="250" r="14" fill="#60a5fa"/>
  <text x="240" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1a1a2e" text-anchor="middle">2022</text>
  <rect x="190" y="282" width="100" height="80" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="240" y="302" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">ChatGPT/GPT-4</text>
  <text x="240" y="320" font-family="sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">自然言語での</text>
  <text x="240" y="337" font-family="sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">コード生成</text>
  <line x1="240" y1="264" x2="240" y2="282" stroke="#60a5fa" stroke-width="1.5"/>

  <!-- 2023 -->
  <circle cx="390" cy="250" r="14" fill="#34d399"/>
  <text x="390" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1a1a2e" text-anchor="middle">2023</text>
  <rect x="338" y="148" width="105" height="80" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="1.5"/>
  <text x="390" y="170" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Claude / GPT-4</text>
  <text x="390" y="188" font-family="sans-serif" font-size="10" fill="#6ee7b7" text-anchor="middle">長文コンテキスト</text>
  <text x="390" y="205" font-family="sans-serif" font-size="10" fill="#6ee7b7" text-anchor="middle">エージェント機能</text>
  <line x1="390" y1="228" x2="390" y2="236" stroke="#34d399" stroke-width="1.5"/>

  <!-- 2024 -->
  <circle cx="540" cy="250" r="14" fill="#f472b6"/>
  <text x="540" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1a1a2e" text-anchor="middle">2024</text>
  <rect x="488" y="282" width="104" height="80" rx="8" fill="#3d1a3d" stroke="#f472b6" stroke-width="1.5"/>
  <text x="540" y="302" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Claude Code α</text>
  <text x="540" y="320" font-family="sans-serif" font-size="10" fill="#f9a8d4" text-anchor="middle">CLIエージェント</text>
  <text x="540" y="337" font-family="sans-serif" font-size="10" fill="#f9a8d4" text-anchor="middle">ツール呼び出し</text>
  <line x1="540" y1="264" x2="540" y2="282" stroke="#f472b6" stroke-width="1.5"/>

  <!-- 2026 -->
  <circle cx="690" cy="250" r="16" fill="#fbbf24"/>
  <text x="690" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1a1a2e" text-anchor="middle">2026</text>
  <rect x="636" y="148" width="108" height="80" rx="8" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="690" y="168" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fef3c7" text-anchor="middle">Vibe Coding</text>
  <text x="690" y="186" font-family="sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">AI駆動開発</text>
  <text x="690" y="203" font-family="sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">完全自律エージェント</text>
  <line x1="690" y1="228" x2="690" y2="234" stroke="#fbbf24" stroke-width="1.5"/>

  <!-- Bottom label -->
  <text x="400" y="460" font-family="sans-serif" font-size="12" fill="#a78bfa" text-anchor="middle">AIアシスト → AI主導 へのパラダイムシフト</text>
</svg>

<!--
2020年のGitHub Copilot登場から2026年のVibe Codingまでの進化を時系列で整理。
-->

---

# Vibe Coding とは何か

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="45" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Vibe Coding サイクル</text>

  <!-- Center circle -->
  <circle cx="400" cy="260" r="55" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="255" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">Vibe</text>
  <text x="400" y="273" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">Coding</text>

  <!-- Step 1: 意図 (top) -->
  <rect x="305" y="68" width="190" height="72" rx="12" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="96" font-family="sans-serif" font-size="16" font-weight="bold" fill="#60a5fa" text-anchor="middle">① 意図</text>
  <text x="400" y="116" font-family="sans-serif" font-size="12" fill="#93c5fd" text-anchor="middle">「こんなものを作りたい」</text>
  <text x="400" y="132" font-family="sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">自然言語で目的を伝える</text>
  <!-- Arrow down from step1 to center -->
  <line x1="400" y1="140" x2="400" y2="200" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="394,198 406,198 400,208" fill="#60a5fa"/>

  <!-- Step 2: 対話 (right) -->
  <rect x="570" y="218" width="185" height="72" rx="12" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="662" y="246" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399" text-anchor="middle">② 対話</text>
  <text x="662" y="266" font-family="sans-serif" font-size="12" fill="#6ee7b7" text-anchor="middle">AIとのやり取り</text>
  <text x="662" y="282" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">質問・明確化・提案</text>
  <!-- Arrow from step2 to center (left arrow) -->
  <line x1="570" y1="254" x2="458" y2="265" stroke="#34d399" stroke-width="2"/>
  <polygon points="461,259 461,271 451,265" fill="#34d399"/>

  <!-- Step 3: 生成 (bottom) -->
  <rect x="305" y="368" width="190" height="72" rx="12" fill="#3d1a3d" stroke="#f472b6" stroke-width="2"/>
  <text x="400" y="396" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f472b6" text-anchor="middle">③ 生成</text>
  <text x="400" y="416" font-family="sans-serif" font-size="12" fill="#f9a8d4" text-anchor="middle">コード・設計・文書の生成</text>
  <text x="400" y="432" font-family="sans-serif" font-size="11" fill="#fbcfe8" text-anchor="middle">自動実行・ファイル操作</text>
  <!-- Arrow up from step3 to center -->
  <line x1="400" y1="368" x2="400" y2="318" stroke="#f472b6" stroke-width="2"/>
  <polygon points="394,320 406,320 400,310" fill="#f472b6"/>

  <!-- Step 4: レビュー (left) -->
  <rect x="45" y="218" width="185" height="72" rx="12" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="137" y="246" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fbbf24" text-anchor="middle">④ レビュー</text>
  <text x="137" y="266" font-family="sans-serif" font-size="12" fill="#fde68a" text-anchor="middle">人間が確認・修正</text>
  <text x="137" y="282" font-family="sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">承認・フィードバック</text>
  <!-- Arrow from center to step4 -->
  <line x1="345" y1="265" x2="230" y2="254" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="233,248 233,260 223,254" fill="#fbbf24"/>

  <!-- Cycle arrows (curved arc labels) -->
  <text x="560" y="175" font-family="sans-serif" font-size="11" fill="#a78bfa" text-anchor="middle" transform="rotate(-30,560,175)">→</text>
  <text x="560" y="360" font-family="sans-serif" font-size="11" fill="#a78bfa" text-anchor="middle" transform="rotate(30,560,360)">→</text>

  <!-- Bottom note -->
  <text x="400" y="472" font-family="sans-serif" font-size="12" fill="#c4b5fd" text-anchor="middle">人間はゴールを設定し、AIが実行・提案するコラボレーションモデル</text>
</svg>

<!--
意図→対話→生成→レビューのサイクルを繰り返すコラボレーションモデル。人間はゴール設定とレビューに集中し、AIが実行を担う。
-->

---

# 従来開発 vs AI駆動開発

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">従来開発 vs AI駆動開発</text>

  <!-- Divider -->
  <line x1="400" y1="60" x2="400" y2="480" stroke="#a78bfa" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Left panel header: 従来開発 -->
  <rect x="20" y="62" width="360" height="44" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="200" y="90" font-family="sans-serif" font-size="17" font-weight="bold" fill="#60a5fa" text-anchor="middle">従来開発</text>

  <!-- Right panel header: AI駆動開発 -->
  <rect x="420" y="62" width="360" height="44" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="600" y="90" font-family="sans-serif" font-size="17" font-weight="bold" fill="#34d399" text-anchor="middle">AI駆動開発（Vibe Coding）</text>

  <!-- Row 1: 設計 -->
  <rect x="20" y="118" width="360" height="60" rx="6" fill="#1e2a4a"/>
  <text x="40" y="141" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd">設計</text>
  <text x="40" y="161" font-family="sans-serif" font-size="12" fill="#bfdbfe">人間が詳細設計書を書く</text>
  <text x="40" y="175" font-family="sans-serif" font-size="11" fill="#93c5fd">UML/仕様書を手動作成</text>

  <rect x="420" y="118" width="360" height="60" rx="6" fill="#1a2e28"/>
  <text x="440" y="141" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7">設計</text>
  <text x="440" y="161" font-family="sans-serif" font-size="12" fill="#a7f3d0">意図を伝えるとAIが設計提案</text>
  <text x="440" y="175" font-family="sans-serif" font-size="11" fill="#6ee7b7">対話で要件を深掘り・精緻化</text>

  <!-- Row 2: 実装 -->
  <rect x="20" y="186" width="360" height="60" rx="6" fill="#1e2a4a"/>
  <text x="40" y="209" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd">実装</text>
  <text x="40" y="229" font-family="sans-serif" font-size="12" fill="#bfdbfe">全コードを手書き</text>
  <text x="40" y="243" font-family="sans-serif" font-size="11" fill="#93c5fd">タイプミス・バグが混入しやすい</text>

  <rect x="420" y="186" width="360" height="60" rx="6" fill="#1a2e28"/>
  <text x="440" y="209" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7">実装</text>
  <text x="440" y="229" font-family="sans-serif" font-size="12" fill="#a7f3d0">AIがコードを自動生成・編集</text>
  <text x="440" y="243" font-family="sans-serif" font-size="11" fill="#6ee7b7">人間はレビュー・承認に集中</text>

  <!-- Row 3: テスト -->
  <rect x="20" y="254" width="360" height="60" rx="6" fill="#1e2a4a"/>
  <text x="40" y="277" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd">テスト</text>
  <text x="40" y="297" font-family="sans-serif" font-size="12" fill="#bfdbfe">テストケースを手動作成</text>
  <text x="40" y="311" font-family="sans-serif" font-size="11" fill="#93c5fd">カバレッジ確保に時間がかかる</text>

  <rect x="420" y="254" width="360" height="60" rx="6" fill="#1a2e28"/>
  <text x="440" y="277" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7">テスト</text>
  <text x="440" y="297" font-family="sans-serif" font-size="12" fill="#a7f3d0">AIがテスト自動生成・実行</text>
  <text x="440" y="311" font-family="sans-serif" font-size="11" fill="#6ee7b7">高カバレッジを自動維持</text>

  <!-- Row 4: イテレーション速度 -->
  <rect x="20" y="322" width="360" height="60" rx="6" fill="#1e2a4a"/>
  <text x="40" y="345" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd">速度</text>
  <text x="40" y="365" font-family="sans-serif" font-size="12" fill="#bfdbfe">週〜月単位のサイクル</text>
  <text x="40" y="379" font-family="sans-serif" font-size="11" fill="#93c5fd">ボトルネックは実装速度</text>

  <rect x="420" y="322" width="360" height="60" rx="6" fill="#1a2e28"/>
  <text x="440" y="345" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7">速度</text>
  <text x="440" y="365" font-family="sans-serif" font-size="12" fill="#a7f3d0">時間〜日単位のイテレーション</text>
  <text x="440" y="379" font-family="sans-serif" font-size="11" fill="#6ee7b7">ボトルネックは意思決定</text>

  <!-- Row 5: スキル要件 -->
  <rect x="20" y="390" width="360" height="60" rx="6" fill="#1e2a4a"/>
  <text x="40" y="413" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd">スキル</text>
  <text x="40" y="433" font-family="sans-serif" font-size="12" fill="#bfdbfe">言語・フレームワーク精通が必要</text>
  <text x="40" y="447" font-family="sans-serif" font-size="11" fill="#93c5fd">習得コストが高い</text>

  <rect x="420" y="390" width="360" height="60" rx="6" fill="#1a2e28"/>
  <text x="440" y="413" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7">スキル</text>
  <text x="440" y="433" font-family="sans-serif" font-size="12" fill="#a7f3d0">目的・要件定義能力が重要</text>
  <text x="440" y="447" font-family="sans-serif" font-size="11" fill="#6ee7b7">プロンプト設計・レビュー力</text>
</svg>

<!--
設計・実装・テスト・速度・スキル要件の5軸で比較。AI駆動では人間の役割が実装者からディレクター・レビュアーへシフトする。
-->

---

# Claude Code 概要

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="44" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Claude Code 主要機能</text>

  <!-- Center node -->
  <circle cx="400" cy="265" r="60" fill="#2d1b5e" stroke="#a78bfa" stroke-width="3"/>
  <text x="400" y="259" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Claude</text>
  <text x="400" y="277" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">Code</text>

  <!-- Feature 1: コード編集 (top-left) -->
  <line x1="358" y1="218" x2="248" y2="150" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="251,143 256,154 244,151" fill="#60a5fa"/>
  <rect x="100" y="88" width="148" height="60" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="174" y="111" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">コード編集</text>
  <text x="174" y="128" font-family="sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">Read/Edit/Write</text>
  <text x="174" y="143" font-family="sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">ファイル操作</text>

  <!-- Feature 2: Bash実行 (top) -->
  <line x1="400" y1="205" x2="400" y2="148" stroke="#34d399" stroke-width="2"/>
  <polygon points="394,150 406,150 400,140" fill="#34d399"/>
  <rect x="326" y="78" width="148" height="60" rx="10" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="101" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">Bash実行</text>
  <text x="400" y="118" font-family="sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">テスト・ビルド</text>
  <text x="400" y="133" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">コマンド自動実行</text>

  <!-- Feature 3: Web検索 (top-right) -->
  <line x1="442" y1="218" x2="554" y2="150" stroke="#f472b6" stroke-width="2"/>
  <polygon points="549,143 556,154 544,151" fill="#f472b6"/>
  <rect x="552" y="88" width="148" height="60" rx="10" fill="#3d1a3d" stroke="#f472b6" stroke-width="2"/>
  <text x="626" y="111" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6" text-anchor="middle">Web検索</text>
  <text x="626" y="128" font-family="sans-serif" font-size="11" fill="#f9a8d4" text-anchor="middle">最新情報取得</text>
  <text x="626" y="143" font-family="sans-serif" font-size="11" fill="#fbcfe8" text-anchor="middle">ドキュメント参照</text>

  <!-- Feature 4: エージェントチーム (right) -->
  <line x1="460" y1="265" x2="566" y2="265" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="564,259 576,265 564,271" fill="#fbbf24"/>
  <rect x="576" y="235" width="178" height="60" rx="10" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="665" y="258" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">エージェント</text>
  <text x="665" y="274" font-family="sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">並列タスク実行</text>
  <text x="665" y="289" font-family="sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">サブエージェント委任</text>

  <!-- Feature 5: コンテキスト管理 (bottom-right) -->
  <line x1="442" y1="312" x2="554" y2="380" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="549,373 556,384 544,381" fill="#a78bfa"/>
  <rect x="552" y="352" width="148" height="60" rx="10" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2"/>
  <text x="626" y="375" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">コンテキスト</text>
  <text x="626" y="392" font-family="sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">CLAUDE.md連携</text>
  <text x="626" y="407" font-family="sans-serif" font-size="11" fill="#ddd6fe" text-anchor="middle">長期記憶・設定</text>

  <!-- Feature 6: MCP連携 (bottom-left) -->
  <line x1="358" y1="312" x2="248" y2="380" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="251,373 256,384 244,381" fill="#38bdf8"/>
  <rect x="100" y="352" width="148" height="60" rx="10" fill="#0c2a3d" stroke="#38bdf8" stroke-width="2"/>
  <text x="174" y="375" font-family="sans-serif" font-size="13" font-weight="bold" fill="#38bdf8" text-anchor="middle">MCP連携</text>
  <text x="174" y="392" font-family="sans-serif" font-size="11" fill="#7dd3fc" text-anchor="middle">外部ツール統合</text>
  <text x="174" y="407" font-family="sans-serif" font-size="11" fill="#bae6fd" text-anchor="middle">プロトコル拡張</text>

  <!-- Feature 7: Hooks (left) -->
  <line x1="340" y1="265" x2="234" y2="265" stroke="#fb923c" stroke-width="2"/>
  <polygon points="236,259 224,265 236,271" fill="#fb923c"/>
  <rect x="46" y="235" width="178" height="60" rx="10" fill="#3d1800" stroke="#fb923c" stroke-width="2"/>
  <text x="135" y="258" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fb923c" text-anchor="middle">Hooks &amp; Settings</text>
  <text x="135" y="274" font-family="sans-serif" font-size="11" fill="#fdba74" text-anchor="middle">自動化トリガー</text>
  <text x="135" y="289" font-family="sans-serif" font-size="11" fill="#fed7aa" text-anchor="middle">カスタムワークフロー</text>
</svg>

<!--
Claude Codeの7つの主要機能を放射状に配置。コード編集・Bash実行・Web検索・エージェント・コンテキスト管理・MCP連携・Hooks。
-->

---

# Claude Code アーキテクチャ

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="44" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Claude Code アーキテクチャ</text>

  <!-- Layer 1: Human / Terminal -->
  <rect x="50" y="70" width="180" height="70" rx="12" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="140" y="100" font-family="sans-serif" font-size="15" font-weight="bold" fill="#60a5fa" text-anchor="middle">開発者</text>
  <text x="140" y="120" font-family="sans-serif" font-size="12" fill="#93c5fd" text-anchor="middle">Terminal / IDE</text>
  <text x="140" y="135" font-family="sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">自然言語で指示</text>

  <!-- Arrow: Developer → CLI -->
  <line x1="230" y1="105" x2="290" y2="105" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="288,99 300,105 288,111" fill="#60a5fa"/>

  <!-- Layer 2: Claude Code CLI -->
  <rect x="300" y="70" width="200" height="70" rx="12" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="99" font-family="sans-serif" font-size="15" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code CLI</text>
  <text x="400" y="118" font-family="sans-serif" font-size="12" fill="#c4b5fd" text-anchor="middle">エージェントループ</text>
  <text x="400" y="133" font-family="sans-serif" font-size="11" fill="#ddd6fe" text-anchor="middle">ツール選択・実行管理</text>

  <!-- Arrow: CLI → Claude API -->
  <line x1="500" y1="105" x2="560" y2="105" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="558,99 570,105 558,111" fill="#a78bfa"/>

  <!-- Layer 3: Claude API -->
  <rect x="570" y="70" width="180" height="70" rx="12" fill="#3d1a3d" stroke="#f472b6" stroke-width="2"/>
  <text x="660" y="100" font-family="sans-serif" font-size="15" font-weight="bold" fill="#f472b6" text-anchor="middle">Claude API</text>
  <text x="660" y="118" font-family="sans-serif" font-size="12" fill="#f9a8d4" text-anchor="middle">claude-sonnet-4</text>
  <text x="660" y="133" font-family="sans-serif" font-size="11" fill="#fbcfe8" text-anchor="middle">LLM推論エンジン</text>

  <!-- Bidirectional arrows (return) -->
  <line x1="560" y1="118" x2="500" y2="118" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="502,112 490,118 502,124" fill="#f472b6"/>
  <line x1="290" y1="118" x2="230" y2="118" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="232,112 220,118 232,124" fill="#60a5fa"/>

  <!-- Vertical arrows: CLI → Tools -->
  <line x1="400" y1="140" x2="400" y2="190" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="394,188 406,188 400,198" fill="#a78bfa"/>
  <text x="412" y="172" font-family="sans-serif" font-size="11" fill="#c4b5fd">ツール呼び出し</text>

  <!-- Tools row -->
  <!-- Tool: Read/Write/Edit -->
  <rect x="30" y="200" width="150" height="80" rx="10" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="105" y="226" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">ファイルシステム</text>
  <text x="105" y="246" font-family="sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">Read / Write</text>
  <text x="105" y="262" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Edit / Glob / Grep</text>
  <text x="105" y="276" font-family="sans-serif" font-size="10" fill="#6ee7b7" text-anchor="middle">ソースコード管理</text>

  <!-- Tool: Bash -->
  <rect x="205" y="200" width="150" height="80" rx="10" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="280" y="226" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">Bash / Shell</text>
  <text x="280" y="246" font-family="sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">コマンド実行</text>
  <text x="280" y="262" font-family="sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">テスト・ビルド</text>
  <text x="280" y="276" font-family="sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">git / npm / bun</text>

  <!-- Tool: Web -->
  <rect x="380" y="200" width="150" height="80" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="455" y="226" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">Web / Search</text>
  <text x="455" y="246" font-family="sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">WebFetch</text>
  <text x="455" y="262" font-family="sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">WebSearch</text>
  <text x="455" y="276" font-family="sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">ドキュメント参照</text>

  <!-- Tool: MCP -->
  <rect x="555" y="200" width="150" height="80" rx="10" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2"/>
  <text x="630" y="226" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">MCP Servers</text>
  <text x="630" y="246" font-family="sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">外部サービス</text>
  <text x="630" y="262" font-family="sans-serif" font-size="11" fill="#ddd6fe" text-anchor="middle">DB / Slack / etc.</text>
  <text x="630" y="276" font-family="sans-serif" font-size="10" fill="#c4b5fd" text-anchor="middle">プロトコル統合</text>

  <!-- Arrows from CLI to tools -->
  <line x1="340" y1="155" x2="105" y2="200" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="365" y1="165" x2="280" y2="200" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="435" y1="165" x2="455" y2="200" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="460" y1="155" x2="630" y2="200" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Result return arrow -->
  <line x1="400" y1="290" x2="400" y2="350" stroke="#a78bfa" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="394,348 406,348 400,358" fill="#a78bfa"/>

  <!-- Bottom: CLAUDE.md + settings.json -->
  <rect x="170" y="360" width="460" height="70" rx="12" fill="#1a2e28" stroke="#34d399" stroke-width="1.5"/>
  <text x="400" y="385" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399" text-anchor="middle">プロジェクト設定層</text>
  <text x="290" y="408" font-family="sans-serif" font-size="12" fill="#6ee7b7" text-anchor="middle">CLAUDE.md</text>
  <text x="400" y="408" font-family="sans-serif" font-size="12" fill="#a7f3d0" text-anchor="middle">|</text>
  <text x="510" y="408" font-family="sans-serif" font-size="12" fill="#6ee7b7" text-anchor="middle">.claude/settings.json</text>
  <text x="400" y="424" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">コンテキスト・ルール・Hooks を定義</text>

  <line x1="400" y1="358" x2="400" y2="360" stroke="#a78bfa" stroke-width="2"/>
</svg>

<!--
開発者→CLI→Claude API の双方向フローと、CLIが呼び出すツール実行層（FS/Bash/Web/MCP）を示す構成図。
-->

---

# セットアップ & 初期設定

> *APIキー設定5分でAI駆動開発が即日スタートできる*

- Node.js 18+ と npm が前提
- グローバルインストール後、APIキーを設定
- CLAUDE.md をプロジェクトルートに配置するだけで有効化


---

# セットアップ & 初期設定（コード例）

```bash
# インストール
npm install -g @anthropic-ai/claude-code

# APIキー設定
export ANTHROPIC_API_KEY="sk-ant-..."

# プロジェクトで起動
cd my-project
claude

# 初期化（CLAUDE.md テンプレート生成）
claude /init
```


---

# 基本的な使い方

> *自然言語だけでファイル操作・コマンド実行を自動化*

- 対話モードとワンショット実行の2つのモード
- ファイル操作・コマンド実行・Web検索を自動選択
- --dangerously-skip-permissions で承認なし自動実行


---

# 基本的な使い方（コード例）

```bash
# 対話モード（最も一般的）
claude

# ワンショット実行
claude -p "src/api/user.ts のバグを修正して"

# 特定ファイルを読み込んで質問
claude -p "このコードをレビューして" --file src/app.ts

# 自動実行モード（CI/CD向け）
claude --dangerously-skip-permissions \
  -p "テストを実行して失敗を修正して"
```


---

# プロンプト設計のベストプラクティス

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">良いプロンプト vs 悪いプロンプト</text>

  <!-- Divider line -->
  <line x1="400" y1="58" x2="400" y2="480" stroke="#a78bfa" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Left header: 悪い例 -->
  <rect x="20" y="60" width="362" height="40" rx="8" fill="#4a1c1c" stroke="#f87171" stroke-width="2"/>
  <text x="200" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f87171" text-anchor="middle">悪いプロンプト例</text>

  <!-- Right header: 良い例 -->
  <rect x="420" y="60" width="362" height="40" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="600" y="85" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399" text-anchor="middle">良いプロンプト例</text>

  <!-- Pair 1 -->
  <rect x="20" y="112" width="362" height="72" rx="8" fill="#2a1a1a" stroke="#f87171" stroke-width="1.5"/>
  <text x="38" y="134" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f87171">例1: 曖昧な指示</text>
  <text x="38" y="154" font-family="sans-serif" font-size="12" fill="#fca5a5">「ログイン機能を作って」</text>
  <text x="38" y="174" font-family="sans-serif" font-size="11" fill="#f87171">→ 何のアプリか、技術スタック不明</text>

  <rect x="420" y="112" width="362" height="72" rx="8" fill="#1a2e28" stroke="#34d399" stroke-width="1.5"/>
  <text x="438" y="134" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">例1: 具体的な指示</text>
  <text x="438" y="154" font-family="sans-serif" font-size="11" fill="#a7f3d0">「Next.js + Prisma構成のアプリに</text>
  <text x="438" y="170" font-family="sans-serif" font-size="11" fill="#a7f3d0">メール・パスワード認証を追加して」</text>

  <!-- Pair 2 -->
  <rect x="20" y="194" width="362" height="72" rx="8" fill="#2a1a1a" stroke="#f87171" stroke-width="1.5"/>
  <text x="38" y="216" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f87171">例2: 巨大タスク一括</text>
  <text x="38" y="236" font-family="sans-serif" font-size="12" fill="#fca5a5">「EC サイトを全部作って」</text>
  <text x="38" y="256" font-family="sans-serif" font-size="11" fill="#f87171">→ 範囲が広すぎてコンテキスト爆発</text>

  <rect x="420" y="194" width="362" height="72" rx="8" fill="#1a2e28" stroke="#34d399" stroke-width="1.5"/>
  <text x="438" y="216" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">例2: 段階的分割</text>
  <text x="438" y="236" font-family="sans-serif" font-size="11" fill="#a7f3d0">「まず商品一覧APIだけ実装して。</text>
  <text x="438" y="252" font-family="sans-serif" font-size="11" fill="#a7f3d0">次のステップは後で指示します」</text>

  <!-- Pair 3 -->
  <rect x="20" y="276" width="362" height="72" rx="8" fill="#2a1a1a" stroke="#f87171" stroke-width="1.5"/>
  <text x="38" y="298" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f87171">例3: 成果物が不明</text>
  <text x="38" y="318" font-family="sans-serif" font-size="12" fill="#fca5a5">「このコードを良くして」</text>
  <text x="38" y="338" font-family="sans-serif" font-size="11" fill="#f87171">→ 何が問題かAIが判断できない</text>

  <rect x="420" y="276" width="362" height="72" rx="8" fill="#1a2e28" stroke="#34d399" stroke-width="1.5"/>
  <text x="438" y="298" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">例3: 期待値を明示</text>
  <text x="438" y="318" font-family="sans-serif" font-size="11" fill="#a7f3d0">「このAPIのエラーハンドリングを改善して。</text>
  <text x="438" y="334" font-family="sans-serif" font-size="11" fill="#a7f3d0">TypeErrorを適切にキャッチすること」</text>

  <!-- Pair 4 -->
  <rect x="20" y="358" width="362" height="72" rx="8" fill="#2a1a1a" stroke="#f87171" stroke-width="1.5"/>
  <text x="38" y="380" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f87171">例4: 制約なし</text>
  <text x="38" y="400" font-family="sans-serif" font-size="12" fill="#fca5a5">「テストを書いて」</text>
  <text x="38" y="420" font-family="sans-serif" font-size="11" fill="#f87171">→ フレームワーク・方針が不明</text>

  <rect x="420" y="358" width="362" height="72" rx="8" fill="#1a2e28" stroke="#34d399" stroke-width="1.5"/>
  <text x="438" y="380" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">例4: 制約を指定</text>
  <text x="438" y="400" font-family="sans-serif" font-size="11" fill="#a7f3d0">「vitest でユニットテストを書いて。</text>
  <text x="438" y="416" font-family="sans-serif" font-size="11" fill="#a7f3d0">正常系と異常系を各3ケース以上」</text>

  <!-- Bottom tip -->
  <text x="400" y="468" font-family="sans-serif" font-size="12" fill="#fbbf24" text-anchor="middle">ポイント: 具体的・段階的・期待値明示 の3原則</text>
</svg>

<!--
良いプロンプトの3原則: 具体的・段階的・期待値明示。曖昧な指示はAIの出力品質を大幅に下げる。
-->

---

# ツール使用の仕組み

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="44" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">ツール使用の仕組み — シーケンス図</text>

  <!-- Participant labels -->
  <rect x="40" y="68" width="100" height="36" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="90" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">開発者</text>

  <rect x="210" y="68" width="120" height="36" rx="8" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2"/>
  <text x="270" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code</text>

  <rect x="400" y="68" width="120" height="36" rx="8" fill="#3d1a3d" stroke="#f472b6" stroke-width="2"/>
  <text x="460" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6" text-anchor="middle">Claude API</text>

  <rect x="590" y="68" width="130" height="36" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="655" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">ツール実行層</text>

  <!-- Lifelines -->
  <line x1="90" y1="104" x2="90" y2="460" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="270" y1="104" x2="270" y2="460" stroke="#a78bfa" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="460" y1="104" x2="460" y2="460" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="655" y1="104" x2="655" y2="460" stroke="#34d399" stroke-width="1" stroke-dasharray="4,4"/>

  <!-- Step 1: User → Claude Code -->
  <line x1="90" y1="138" x2="262" y2="138" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="260,132 272,138 260,144" fill="#60a5fa"/>
  <rect x="100" y="122" width="155" height="18" rx="3" fill="#1a1a2e"/>
  <text x="177" y="134" font-family="sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">① ユーザー指示（自然言語）</text>

  <!-- Step 2: Claude Code → Claude API -->
  <line x1="270" y1="168" x2="452" y2="168" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="450,162 462,168 450,174" fill="#a78bfa"/>
  <rect x="278" y="152" width="172" height="18" rx="3" fill="#1a1a2e"/>
  <text x="364" y="164" font-family="sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">② プロンプト + コンテキスト送信</text>

  <!-- Step 3: Claude API → Claude Code (tool_use) -->
  <line x1="460" y1="198" x2="278" y2="198" stroke="#f472b6" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="280,192 268,198 280,204" fill="#f472b6"/>
  <rect x="278" y="182" width="178" height="18" rx="3" fill="#1a1a2e"/>
  <text x="367" y="194" font-family="sans-serif" font-size="11" fill="#f9a8d4" text-anchor="middle">③ tool_use ブロック返却</text>

  <!-- Step 4: Claude Code → Tool Layer -->
  <line x1="270" y1="228" x2="647" y2="228" stroke="#34d399" stroke-width="2"/>
  <polygon points="645,222 657,228 645,234" fill="#34d399"/>
  <rect x="310" y="212" width="195" height="18" rx="3" fill="#1a1a2e"/>
  <text x="407" y="224" font-family="sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">④ ツール実行（Bash/Read/Write…）</text>

  <!-- Step 5: Tool → Claude Code (result) -->
  <line x1="655" y1="258" x2="278" y2="258" stroke="#34d399" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="280,252 268,258 280,264" fill="#34d399"/>
  <rect x="310" y="242" width="195" height="18" rx="3" fill="#1a1a2e"/>
  <text x="407" y="254" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">⑤ 実行結果を返す</text>

  <!-- Step 6: Claude Code → Claude API (tool_result) -->
  <line x1="270" y1="288" x2="452" y2="288" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="450,282 462,288 450,294" fill="#a78bfa"/>
  <rect x="278" y="272" width="172" height="18" rx="3" fill="#1a1a2e"/>
  <text x="364" y="284" font-family="sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">⑥ tool_result を API に送信</text>

  <!-- Step 7: Claude API → Claude Code (next response) -->
  <line x1="460" y1="318" x2="278" y2="318" stroke="#f472b6" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="280,312 268,318 280,324" fill="#f472b6"/>
  <rect x="278" y="302" width="178" height="18" rx="3" fill="#1a1a2e"/>
  <text x="367" y="314" font-family="sans-serif" font-size="11" fill="#f9a8d4" text-anchor="middle">⑦ 次の応答 or 完了メッセージ</text>

  <!-- Loop label -->
  <rect x="248" y="160" width="28" height="170" rx="4" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="235" y="248" font-family="sans-serif" font-size="10" fill="#a78bfa" text-anchor="middle" transform="rotate(-90,235,248)">エージェントループ</text>

  <!-- Step 8: Claude Code → User -->
  <line x1="270" y1="358" x2="98" y2="358" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="100,352 88,358 100,364" fill="#60a5fa"/>
  <rect x="100" y="342" width="165" height="18" rx="3" fill="#1a1a2e"/>
  <text x="182" y="354" font-family="sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">⑧ 最終結果を表示</text>

  <!-- Bottom note -->
  <text x="400" y="430" font-family="sans-serif" font-size="12" fill="#fbbf24" text-anchor="middle">ループはストップ条件（完了/エラー/確認要求）まで継続</text>
</svg>

<!--
Claude APIがtool_useブロックを返し、CLIがツールを実行してtool_resultを再送するシーケンス。このループがエージェント動作の核心。
-->

---

# コンテキスト管理戦略

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">コンテキスト管理戦略</text>

  <!-- Context Window visualization -->
  <rect x="40" y="60" width="320" height="360" rx="12" fill="#1e2040" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="200" y="88" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">コンテキストウィンドウ</text>

  <!-- System prompt section -->
  <rect x="56" y="100" width="288" height="52" rx="8" fill="#2d1b5e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="200" y="122" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c4b5fd" text-anchor="middle">System Prompt</text>
  <text x="200" y="140" font-family="sans-serif" font-size="11" fill="#ddd6fe" text-anchor="middle">CLAUDE.md 内容 + 基本ルール</text>

  <!-- File contents section -->
  <rect x="56" y="162" width="288" height="52" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="200" y="184" font-family="sans-serif" font-size="12" font-weight="bold" fill="#93c5fd" text-anchor="middle">読み込みファイル内容</text>
  <text x="200" y="202" font-family="sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">Read したソースコード・設定ファイル</text>

  <!-- Tool results section -->
  <rect x="56" y="224" width="288" height="52" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="1.5"/>
  <text x="200" y="246" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6ee7b7" text-anchor="middle">ツール実行結果</text>
  <text x="200" y="264" font-family="sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Bash出力・検索結果・エラーログ</text>

  <!-- Conversation history -->
  <rect x="56" y="286" width="288" height="52" rx="8" fill="#3d3000" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="200" y="308" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fde68a" text-anchor="middle">会話履歴</text>
  <text x="200" y="326" font-family="sans-serif" font-size="11" fill="#fef3c7" text-anchor="middle">過去のやり取り・承認済み内容</text>

  <!-- Warning: limit bar -->
  <rect x="56" y="348" width="288" height="32" rx="6" fill="#3d1a1a" stroke="#f87171" stroke-width="1.5"/>
  <text x="200" y="368" font-family="sans-serif" font-size="11" font-weight="bold" fill="#f87171" text-anchor="middle">上限: ~200K tokens（要管理）</text>

  <!-- Right side: Strategies -->
  <rect x="400" y="60" width="360" height="360" rx="12" fill="#1a2030" stroke="#60a5fa" stroke-width="2"/>
  <text x="580" y="88" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">管理戦略</text>

  <!-- Strategy 1 -->
  <rect x="416" y="100" width="328" height="60" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="432" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">1. CLAUDE.md に知識を外部化</text>
  <text x="432" y="138" font-family="sans-serif" font-size="11" fill="#bfdbfe">プロジェクトルール・慣習はファイルに記録</text>
  <text x="432" y="154" font-family="sans-serif" font-size="11" fill="#93c5fd">会話に含めずAIが自動参照</text>

  <!-- Strategy 2 -->
  <rect x="416" y="170" width="328" height="60" rx="8" fill="#1a3d32" stroke="#34d399" stroke-width="1.5"/>
  <text x="432" y="190" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">2. タスクを細分化</text>
  <text x="432" y="208" font-family="sans-serif" font-size="11" fill="#a7f3d0">大きなタスクは小さなセッションに分割</text>
  <text x="432" y="224" font-family="sans-serif" font-size="11" fill="#6ee7b7">/clear で定期的にコンテキストをリセット</text>

  <!-- Strategy 3 -->
  <rect x="416" y="240" width="328" height="60" rx="8" fill="#3d3000" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="432" y="260" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">3. 必要ファイルのみ Read</text>
  <text x="432" y="278" font-family="sans-serif" font-size="11" fill="#fde68a">全ファイル読み込みを避ける</text>
  <text x="432" y="294" font-family="sans-serif" font-size="11" fill="#fef3c7">Grep/Glob で対象を絞り込む</text>

  <!-- Strategy 4 -->
  <rect x="416" y="310" width="328" height="60" rx="8" fill="#2d1b5e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="432" y="330" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">4. サブエージェント活用</text>
  <text x="432" y="348" font-family="sans-serif" font-size="11" fill="#c4b5fd">独立タスクは別エージェントに委任</text>
  <text x="432" y="364" font-family="sans-serif" font-size="11" fill="#ddd6fe">並列処理でコンテキスト分散</text>

  <!-- Bottom note -->
  <text x="400" y="450" font-family="sans-serif" font-size="12" fill="#f472b6" text-anchor="middle">コンテキスト枯渇 = 応答品質低下 → 早めの管理が重要</text>
</svg>

<!--
コンテキストウィンドウの構造（System Prompt / ファイル / ツール結果 / 会話履歴）と4つの管理戦略を解説。
-->

---

# CLAUDE.md 設計パターン

> *規約をAIに覚えさせるとレビュー指摘が80%減る*

- プロジェクトルートに配置するとAIが自動参照
- コーディング規約・禁止事項・コマンド集を記述
- 詳細すぎず、必要な情報だけを厳選する


---

# CLAUDE.md 設計パターン（コード例）

```markdown
# CLAUDE.md

## プロジェクト概要
Next.js 15 + Prisma + PostgreSQL の ECサイト

## 技術スタック
- Runtime: Node.js 20 / Bun 1.3
- ORM: Prisma 6
- テスト: Vitest + Testing Library

## コーディング規約
- TypeScript strict モード必須
- 関数コンポーネントのみ（class 禁止）
- コメントは日本語で記述

## よく使うコマンド
```bash
bun dev        # 開発サーバー起動
bun test       # テスト実行
bun db:migrate # マイグレーション実行
```
```


---

# Hooks & Settings 活用

> *書き込み後の自動フォーマットで品質担保をゼロコスト化*

- 特定イベント発生時に自動コマンドを実行
- Write/Edit 後のフォーマット・型チェックを自動化
- 承認なしで実行するコマンドのホワイトリスト管理


---

# Hooks & Settings 活用（コード例）

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(bun run *)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command",
            "command": "bun run format" }
        ]
      }
    ]
  }
}
```


---

# エージェントループの仕組み

- <svg viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">エージェントループの仕組み</text>

  <!-- Start node -->
  <ellipse cx="400" cy="82" rx="70" ry="26" fill="#2d1b5e" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="87" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">ユーザー指示</text>

  <!-- Arrow down -->
  <line x1="400" y1="108" x2="400" y2="138" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="394,136 406,136 400,146" fill="#a78bfa"/>

  <!-- Step 1: Plan -->
  <rect x="290" y="148" width="220" height="52" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="170" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">① 計画・推論</text>
  <text x="400" y="190" font-family="sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">タスクを分析・サブタスクに分解</text>

  <!-- Arrow -->
  <line x1="400" y1="200" x2="400" y2="230" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="394,228 406,228 400,238" fill="#60a5fa"/>

  <!-- Step 2: Tool Selection -->
  <rect x="290" y="240" width="220" height="52" rx="10" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="262" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">② ツール選択</text>
  <text x="400" y="282" font-family="sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">最適なツールを決定・呼び出し</text>

  <!-- Arrow -->
  <line x1="400" y1="292" x2="400" y2="322" stroke="#34d399" stroke-width="2"/>
  <polygon points="394,320 406,320 400,330" fill="#34d399"/>

  <!-- Step 3: Execute -->
  <rect x="290" y="332" width="220" height="52" rx="10" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="400" y="354" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">③ 実行 &amp; 観察</text>
  <text x="400" y="374" font-family="sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">ツール実行 → 結果を取得</text>

  <!-- Decision diamond -->
  <polygon points="400,408 460,432 400,456 340,432" fill="#3d1a3d" stroke="#f472b6" stroke-width="2"/>
  <text x="400" y="428" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6" text-anchor="middle">完了?</text>
  <text x="400" y="445" font-family="sans-serif" font-size="10" fill="#f9a8d4" text-anchor="middle">確認要求?</text>

  <!-- Arrow from Step3 to Decision -->
  <line x1="400" y1="384" x2="400" y2="408" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="394,406 406,406 400,416" fill="#fbbf24"/>

  <!-- YES path: exit -->
  <line x1="460" y1="432" x2="620" y2="432" stroke="#34d399" stroke-width="2"/>
  <polygon points="618,426 630,432 618,438" fill="#34d399"/>
  <text x="538" y="424" font-family="sans-serif" font-size="11" fill="#34d399" text-anchor="middle">完了</text>
  <ellipse cx="672" cy="432" rx="52" ry="24" fill="#1a3d32" stroke="#34d399" stroke-width="2"/>
  <text x="672" y="437" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">応答出力</text>

  <!-- NO path: loop back -->
  <line x1="340" y1="432" x2="200" y2="432" stroke="#f472b6" stroke-width="2"/>
  <line x1="200" y1="432" x2="200" y2="265" stroke="#f472b6" stroke-width="2"/>
  <line x1="200" y1="265" x2="290" y2="265" stroke="#f472b6" stroke-width="2"/>
  <polygon points="288,259 300,265 288,271" fill="#f472b6"/>
  <text x="248" y="424" font-family="sans-serif" font-size="11" fill="#f472b6" text-anchor="middle">未完了</text>
  <text x="168" y="350" font-family="sans-serif" font-size="11" fill="#f9a8d4" text-anchor="middle" transform="rotate(-90,168,350)">ループ継続</text>

  <!-- Confirmation branch -->
  <line x1="400" y1="456" x2="400" y2="476" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="410" y="472" font-family="sans-serif" font-size="10" fill="#fbbf24">確認要求 → ユーザーに問い合わせ</text>

  <!-- Side notes -->
  <text x="536" y="170" font-family="sans-serif" font-size="11" fill="#c4b5fd">Claude API で推論</text>
  <text x="536" y="265" font-family="sans-serif" font-size="11" fill="#6ee7b7">Bash/Read/Write</text>
  <text x="536" y="355" font-family="sans-serif" font-size="11" fill="#fde68a">結果をコンテキストに追加</text>
</svg>

<!--
計画→ツール選択→実行&観察→完了判定のループ。未完了なら再度計画フェーズに戻る。確認要求時はユーザーに問い合わせる。
-->

---

# ファイル編集フロー: Read → Edit → Write

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="45" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">ファイル編集フロー: Read → Edit → Write</text>

  <!-- Step boxes -->
  <!-- Read -->
  <rect x="40" y="110" width="160" height="80" rx="10" fill="#2d1b69" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))"/>
  <text x="120" y="145" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#a78bfa" text-anchor="middle">Read ツール</text>
  <text x="120" y="168" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd" text-anchor="middle">ファイル内容を読込</text>

  <!-- Arrow 1 -->
  <line x1="200" y1="150" x2="268" y2="150" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="268,143 280,150 268,157" fill="#60a5fa"/>

  <!-- Edit -->
  <rect x="280" y="110" width="160" height="80" rx="10" fill="#1e3a5f" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))"/>
  <text x="360" y="145" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#60a5fa" text-anchor="middle">Edit ツール</text>
  <text x="360" y="168" font-family="Arial, sans-serif" font-size="12" fill="#93c5fd" text-anchor="middle">差分を適用・変更</text>

  <!-- Arrow 2 -->
  <line x1="440" y1="150" x2="508" y2="150" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="508,143 520,150 508,157" fill="#34d399"/>

  <!-- Write -->
  <rect x="520" y="110" width="160" height="80" rx="10" fill="#064e3b" style="filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))"/>
  <text x="600" y="145" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#34d399" text-anchor="middle">Write ツール</text>
  <text x="600" y="168" font-family="Arial, sans-serif" font-size="12" fill="#6ee7b7" text-anchor="middle">ファイルに書き出し</text>

  <!-- Divider line -->
  <line x1="40" y1="230" x2="760" y2="230" stroke="#374151" stroke-width="1"/>

  <!-- Detail boxes -->
  <!-- Read detail -->
  <rect x="40" y="250" width="220" height="210" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="150" y="278" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">Read の用途</text>
  <text x="55" y="305" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 既存ファイル確認</text>
  <text x="55" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コンテキスト取得</text>
  <text x="55" y="351" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 変更前の内容把握</text>
  <text x="55" y="374" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 複数ファイル並列読込</text>
  <text x="55" y="397" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 行番号確認</text>
  <text x="55" y="420" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• スキーマ確認</text>

  <!-- Edit detail -->
  <rect x="290" y="250" width="220" height="210" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="400" y="278" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">Edit の用途</text>
  <text x="305" y="305" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 特定箇所の変更</text>
  <text x="305" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 最小差分で編集</text>
  <text x="305" y="351" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 既存ファイルの修正</text>
  <text x="305" y="374" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• リファクタリング</text>
  <text x="305" y="397" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• バグ修正</text>
  <text x="305" y="420" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 全置換オプション</text>

  <!-- Write detail -->
  <rect x="540" y="250" width="220" height="210" rx="8" fill="#022c22" stroke="#34d399" stroke-width="1"/>
  <text x="650" y="278" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">Write の用途</text>
  <text x="555" y="305" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 新規ファイル作成</text>
  <text x="555" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 完全上書き書き込み</text>
  <text x="555" y="351" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 大容量コンテンツ</text>
  <text x="555" y="374" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• JSON/SVGファイル</text>
  <text x="555" y="397" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 生成物の出力</text>
  <text x="555" y="420" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 設定ファイル</text>

  <!-- Rule note -->
  <rect x="40" y="470" width="720" height="22" rx="4" fill="#2d1b4e"/>
  <text x="400" y="485" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">ルール: Editは必ずRead後に実行 / 2KB超のコンテンツはWriteを使用</text>
</svg>

<!--
Claude Codeのファイル操作は3つのツールで構成される。Readで内容を把握し、Editで差分を適用し、Writeで新規作成または完全上書きを行う。EditはRead後に必ず実行すること。
-->

---

# テスト駆動AI開発 (AI-TDD)

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">TDD + AI 開発サイクル</text>

  <!-- Central circle -->
  <circle cx="400" cy="270" r="55" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="265" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI-TDD</text>
  <text x="400" y="283" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">サイクル</text>

  <!-- Step 1: テスト作成 (top-left) -->
  <rect x="60" y="70" width="160" height="75" rx="10" fill="#1f1035" stroke="#a78bfa" stroke-width="2"/>
  <text x="140" y="101" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">① テスト作成</text>
  <text x="140" y="120" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">失敗テストを先に書く</text>
  <text x="140" y="136" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">仕様をコードで定義</text>

  <!-- Arrow 1 -> center (top-left to center) -->
  <line x1="220" y1="130" x2="348" y2="228" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="340,222 355,230 345,240" fill="#a78bfa"/>

  <!-- Step 2: AI実装 (top-right) -->
  <rect x="580" y="70" width="160" height="75" rx="10" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="660" y="101" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">② AI 実装</text>
  <text x="660" y="120" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">テストを通すコードを</text>
  <text x="660" y="136" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">Claude Codeが生成</text>

  <!-- Arrow center -> step 2 -->
  <line x1="452" y1="228" x2="580" y2="130" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="572,124 585,118 580,133" fill="#60a5fa"/>

  <!-- Step 3: 検証 (bottom-right) -->
  <rect x="580" y="360" width="160" height="75" rx="10" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="660" y="391" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#34d399" text-anchor="middle">③ 検証</text>
  <text x="660" y="410" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">テスト実行・確認</text>
  <text x="660" y="426" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">全グリーンを目指す</text>

  <!-- Arrow step 2 -> step 3 -->
  <line x1="660" y1="145" x2="660" y2="360" stroke="#34d399" stroke-width="2"/>
  <polygon points="653,352 660,365 667,352" fill="#34d399"/>

  <!-- Step 4: リファクタ (bottom-left) -->
  <rect x="60" y="360" width="160" height="75" rx="10" fill="#1c1c10" stroke="#fbbf24" stroke-width="2"/>
  <text x="140" y="391" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fbbf24" text-anchor="middle">④ リファクタ</text>
  <text x="140" y="410" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">AIがコード改善提案</text>
  <text x="140" y="426" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">品質・可読性向上</text>

  <!-- Arrow step 3 -> step 4 -->
  <line x1="580" y1="397" x2="220" y2="397" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="228,390 215,397 228,404" fill="#fbbf24"/>

  <!-- Arrow step 4 -> step 1 (back to top) -->
  <line x1="140" y1="360" x2="140" y2="145" stroke="#a78bfa" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="133,153 140,140 147,153" fill="#a78bfa"/>

  <!-- Benefits panel -->
  <rect x="300" y="80" width="200" height="120" rx="8" fill="#0f172a" stroke="#475569" stroke-width="1"/>
  <text x="400" y="103" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8" text-anchor="middle">AI-TDDのメリット</text>
  <text x="315" y="123" font-family="Arial, sans-serif" font-size="11" fill="#cbd5e1">✓ 仕様が明確になる</text>
  <text x="315" y="141" font-family="Arial, sans-serif" font-size="11" fill="#cbd5e1">✓ AIが意図を理解しやすい</text>
  <text x="315" y="159" font-family="Arial, sans-serif" font-size="11" fill="#cbd5e1">✓ 品質が自動で担保</text>
  <text x="315" y="177" font-family="Arial, sans-serif" font-size="11" fill="#cbd5e1">✓ 回帰防止</text>
</svg>

<!--
TDDとAIを組み合わせることで、AIが意図を理解しやすくなり、品質が自動で担保される。テストを先に書いてからAIに実装させるアプローチが最も効果的。
-->

---

# コードレビューをAIに任せる

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">AIが入るコードレビューフロー</text>

  <!-- Developer box -->
  <rect x="30" y="100" width="130" height="70" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="95" y="130" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">開発者</text>
  <text x="95" y="152" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">コード作成</text>

  <!-- Arrow 1 -->
  <line x1="160" y1="135" x2="218" y2="135" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="210,128 222,135 210,142" fill="#60a5fa"/>

  <!-- PR box -->
  <rect x="220" y="100" width="130" height="70" rx="10" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="285" y="130" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">PR 作成</text>
  <text x="285" y="152" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">GitHub Push</text>

  <!-- Arrow 2 -->
  <line x1="350" y1="135" x2="408" y2="135" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="400,128 412,135 400,142" fill="#60a5fa"/>

  <!-- AI Review box (highlighted) -->
  <rect x="410" y="80" width="150" height="110" rx="10" fill="#1a0a3d" stroke="#a78bfa" stroke-width="3"/>
  <text x="485" y="112" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI レビュー</text>
  <text x="485" y="133" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">Claude Code</text>
  <text x="485" y="151" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">自動コメント生成</text>
  <text x="485" y="169" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">問題点の指摘</text>

  <!-- Arrow 3 -->
  <line x1="560" y1="135" x2="618" y2="135" stroke="#34d399" stroke-width="2"/>
  <polygon points="610,128 622,135 610,142" fill="#34d399"/>

  <!-- Human Review box -->
  <rect x="620" y="100" width="145" height="70" rx="10" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="693" y="128" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">人間レビュー</text>
  <text x="693" y="148" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">最終判断・承認</text>
  <text x="693" y="163" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">コンテキスト確認</text>

  <!-- AI Review details panel -->
  <rect x="30" y="230" width="350" height="240" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="205" y="258" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI レビューの検出項目</text>
  <text x="50" y="283" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">🔍 コードスメル・デッドコード</text>
  <text x="50" y="308" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">🔒 セキュリティ脆弱性</text>
  <text x="50" y="333" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">⚡ パフォーマンス問題</text>
  <text x="50" y="358" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">📝 命名規則・コーディング規約</text>
  <text x="50" y="383" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">🧪 テストカバレッジの不足</text>
  <text x="50" y="408" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">📚 ドキュメント不足</text>
  <text x="50" y="433" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">🔄 重複コード・DRY違反</text>
  <text x="50" y="458" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">✅ ベストプラクティス準拠確認</text>

  <!-- Benefits panel -->
  <rect x="410" y="230" width="355" height="240" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="588" y="258" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">導入効果</text>
  <text x="430" y="283" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• レビュー速度: 数時間 → 数分</text>
  <text x="430" y="308" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 一貫したスタイル指摘</text>
  <text x="430" y="333" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 24時間・週7日対応</text>
  <text x="430" y="358" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 人間は高レベル判断に集中</text>
  <text x="430" y="383" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 感情に左右されない指摘</text>
  <text x="430" y="408" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コードベース全体の一貫性</text>
  <text x="430" y="433" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 新人育成のフィードバック</text>
  <text x="430" y="458" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• レビュー待ちボトルネック解消</text>
</svg>

<!--
AIがPRレビューの初回チェックを担当することで、レビュー待ち時間が数時間から数分に短縮される。人間は高レベルな判断と最終承認に集中できる。
-->

---

# リファクタリングフロー with AI

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="42" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">AIリファクタリングフロー</text>

  <!-- Step 1: 既存コード -->
  <rect x="30" y="80" width="160" height="90" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="110" y="110" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">① 既存コード</text>
  <text x="110" y="132" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">レガシー・技術的負債</text>
  <text x="110" y="152" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">複雑・重複・冗長</text>

  <!-- Arrow 1 -->
  <line x1="190" y1="125" x2="248" y2="125" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="240,118 252,125 240,132" fill="#60a5fa"/>

  <!-- Step 2: AI分析 -->
  <rect x="250" y="80" width="160" height="90" rx="10" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="330" y="108" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">② AI 分析</text>
  <text x="330" y="130" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">コード構造の理解</text>
  <text x="330" y="150" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">問題点の特定</text>

  <!-- Arrow 2 -->
  <line x1="410" y1="125" x2="468" y2="125" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="460,118 472,125 460,132" fill="#34d399"/>

  <!-- Step 3: リファクタ提案 -->
  <rect x="470" y="80" width="160" height="90" rx="10" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="550" y="106" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">③ 提案生成</text>
  <text x="550" y="128" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">改善コードの提示</text>
  <text x="550" y="148" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">複数の選択肢</text>

  <!-- Arrow 3 -->
  <line x1="630" y1="125" x2="688" y2="125" stroke="#fbbf24" stroke-width="2.5"/>
  <polygon points="680,118 692,125 680,132" fill="#fbbf24"/>

  <!-- Step 4: 適用 -->
  <rect x="690" y="80" width="80" height="90" rx="10" fill="#1c1c10" stroke="#fbbf24" stroke-width="2"/>
  <text x="730" y="113" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">④ 適用</text>
  <text x="730" y="132" font-family="Arial, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">Edit ツール</text>
  <text x="730" y="150" font-family="Arial, sans-serif" font-size="10" fill="#fde68a" text-anchor="middle">で自動適用</text>

  <!-- Detail sections row 2 -->
  <!-- AI分析の視点 -->
  <rect x="30" y="200" width="230" height="270" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="145" y="228" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI分析の視点</text>
  <text x="48" y="252" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 循環的複雑度の計測</text>
  <text x="48" y="275" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 重複コード検出</text>
  <text x="48" y="298" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 長すぎる関数の特定</text>
  <text x="48" y="321" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 依存関係の整理</text>
  <text x="48" y="344" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• SOLID原則の確認</text>
  <text x="48" y="367" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 命名の一貫性</text>
  <text x="48" y="390" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• テスタビリティ評価</text>
  <text x="48" y="413" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 型安全性の確認</text>
  <text x="48" y="436" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 非同期処理の最適化</text>

  <!-- リファクタリング手法 -->
  <rect x="285" y="200" width="230" height="270" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="400" y="228" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">主なリファクタ手法</text>
  <text x="300" y="252" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 関数の抽出・分割</text>
  <text x="300" y="275" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• クラスの責任分離</text>
  <text x="300" y="298" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• デザインパターン適用</text>
  <text x="300" y="321" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 条件式の整理</text>
  <text x="300" y="344" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• マジックナンバー除去</text>
  <text x="300" y="367" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 型定義の強化</text>
  <text x="300" y="390" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• エラーハンドリング改善</text>
  <text x="300" y="413" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• パフォーマンス最適化</text>
  <text x="300" y="436" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• ログ・デバッグ整理</text>

  <!-- ポイント -->
  <rect x="540" y="200" width="230" height="270" rx="8" fill="#022c22" stroke="#34d399" stroke-width="1"/>
  <text x="655" y="228" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">成功のポイント</text>
  <text x="556" y="252" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• テストがある状態で実施</text>
  <text x="556" y="275" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 小さい単位で段階的に</text>
  <text x="556" y="298" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 変更前後の動作確認</text>
  <text x="556" y="321" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• AIの提案を理解してから適用</text>
  <text x="556" y="344" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コンテキストを十分提供</text>
  <text x="556" y="367" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コードベース全体を渡す</text>
  <text x="556" y="390" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• レビュー後にコミット</text>
  <text x="556" y="413" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• チームと変更を共有</text>
  <text x="556" y="436" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• ドキュメントも更新</text>
</svg>

<!--
既存コードをAIに渡して分析させ、リファクタリング提案を受け取る。テストがある状態で小さい単位で段階的に進めることが成功のポイント。
-->

---

# セキュリティ考慮事項

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">AIコーディング セキュリティリスクと対策</text>

  <!-- Header row -->
  <rect x="20" y="58" width="200" height="38" rx="4" fill="#374151"/>
  <text x="120" y="82" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">リスク項目</text>

  <rect x="225" y="58" width="175" height="38" rx="4" fill="#7f1d1d"/>
  <text x="312" y="82" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fca5a5" text-anchor="middle">リスクレベル</text>

  <rect x="405" y="58" width="375" height="38" rx="4" fill="#064e3b"/>
  <text x="593" y="82" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#6ee7b7" text-anchor="middle">推奨対策</text>

  <!-- Row 1 -->
  <rect x="20" y="100" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="122" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">機密情報の漏洩</text>
  <text x="30" y="141" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">APIキー・パスワード</text>

  <rect x="225" y="100" width="175" height="52" rx="3" fill="#450a0a"/>
  <text x="312" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ef4444" text-anchor="middle">高 ▲▲▲</text>

  <rect x="405" y="100" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="122" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">.env除外 / シークレット管理サービス利用</text>
  <text x="415" y="141" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">AIへの入力前にマスキング</text>

  <!-- Row 2 -->
  <rect x="20" y="156" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="178" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">インジェクション生成</text>
  <text x="30" y="197" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">SQLi / XSS / コマンド</text>

  <rect x="225" y="156" width="175" height="52" rx="3" fill="#450a0a"/>
  <text x="312" y="186" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ef4444" text-anchor="middle">高 ▲▲▲</text>

  <rect x="405" y="156" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="178" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">セキュリティレビューを必須化</text>
  <text x="415" y="197" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">SAST / DAST ツールとの組み合わせ</text>

  <!-- Row 3 -->
  <rect x="20" y="212" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="234" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">脆弱な依存関係</text>
  <text x="30" y="253" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">古いライブラリの使用</text>

  <rect x="225" y="212" width="175" height="52" rx="3" fill="#78350f"/>
  <text x="312" y="242" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">中 ▲▲</text>

  <rect x="405" y="212" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="234" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">Dependabot / Snyk 等の自動更新</text>
  <text x="415" y="253" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">AIへの最新パッケージ指定</text>

  <!-- Row 4 -->
  <rect x="20" y="268" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="290" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">過剰な権限付与</text>
  <text x="30" y="309" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">最小権限原則違反</text>

  <rect x="225" y="268" width="175" height="52" rx="3" fill="#78350f"/>
  <text x="312" y="298" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">中 ▲▲</text>

  <rect x="405" y="268" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="290" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">コードレビュー時に権限設計を確認</text>
  <text x="415" y="309" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">最小権限をAIへ指示に含める</text>

  <!-- Row 5 -->
  <rect x="20" y="324" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="346" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">コンテキスト汚染</text>
  <text x="30" y="365" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">誤ったコードの学習</text>

  <rect x="225" y="324" width="175" height="52" rx="3" fill="#1a3a1a"/>
  <text x="312" y="354" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">低 ▲</text>

  <rect x="405" y="324" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="346" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">クリーンなコードベースを維持</text>
  <text x="415" y="365" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">悪いパターンのコメントを明示</text>

  <!-- Row 6 -->
  <rect x="20" y="380" width="200" height="52" rx="3" fill="#1f1035"/>
  <text x="30" y="402" font-family="Arial, sans-serif" font-size="12" fill="#c4b5fd">過信による見落とし</text>
  <text x="30" y="421" font-family="Arial, sans-serif" font-size="11" fill="#8b8ba0">AIのコードを無審査</text>

  <rect x="225" y="380" width="175" height="52" rx="3" fill="#450a0a"/>
  <text x="312" y="410" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ef4444" text-anchor="middle">高 ▲▲▲</text>

  <rect x="405" y="380" width="375" height="52" rx="3" fill="#0a1628"/>
  <text x="415" y="402" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">必ず人間がレビュー・テスト実行</text>
  <text x="415" y="421" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">「AIを信頼するが確認する」姿勢</text>

  <!-- Footer note -->
  <rect x="20" y="442" width="760" height="48" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>
  <text x="400" y="462" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">原則: AIが生成したコードも通常のセキュリティ基準を適用する</text>
  <text x="400" y="481" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">自動スキャン + 人間レビュー + セキュリティテストの3層防御</text>
</svg>

<!--
AIが生成したコードにも通常のセキュリティ基準を適用する。特に機密情報の漏洩とAIへの過信による見落としは高リスク。自動スキャン+人間レビュー+セキュリティテストの3層防御が重要。
-->

---

# Cursor vs Claude Code 比較

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Cursor vs Claude Code 比較</text>

  <!-- Header row -->
  <rect x="20" y="58" width="220" height="38" rx="4" fill="#374151"/>
  <text x="130" y="82" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">比較項目</text>

  <rect x="246" y="58" width="245" height="38" rx="4" fill="#1e3a5f"/>
  <text x="369" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">Cursor</text>
  <text x="369" y="91" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">AI-first IDE</text>

  <rect x="497" y="58" width="283" height="38" rx="4" fill="#2d1b69"/>
  <text x="639" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code</text>
  <text x="639" y="91" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">CLI エージェント</text>

  <!-- Row 1: インターフェース -->
  <rect x="20" y="100" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="129" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">インターフェース</text>

  <rect x="246" y="100" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="129" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0" text-anchor="middle">GUI (VS Code ベース)</text>

  <rect x="497" y="100" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="129" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0" text-anchor="middle">CLI / ターミナル</text>

  <!-- Row 2: コーディング支援 -->
  <rect x="20" y="152" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="181" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">コーディング支援</text>

  <rect x="246" y="152" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="170" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">◎ インライン補完</text>
  <text x="369" y="189" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">リアルタイム提案</text>

  <rect x="497" y="152" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="170" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">○ チャット形式</text>
  <text x="639" y="189" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">指示ベースで生成</text>

  <!-- Row 3: ファイル操作 -->
  <rect x="20" y="204" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="233" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">ファイル・プロジェクト操作</text>

  <rect x="246" y="204" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="222" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">○ GUI での操作</text>
  <text x="369" y="241" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">エディタ内完結</text>

  <rect x="497" y="204" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="222" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">◎ Bash / Read / Write</text>
  <text x="639" y="241" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">OS全体の操作可能</text>

  <!-- Row 4: コンテキスト -->
  <rect x="20" y="256" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="285" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">コンテキスト長</text>

  <rect x="246" y="256" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="274" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">○ 長い（GPT-4/Claude）</text>
  <text x="369" y="293" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">モデル依存</text>

  <rect x="497" y="256" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="274" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">◎ 200K トークン</text>
  <text x="639" y="293" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">大規模プロジェクト対応</text>

  <!-- Row 5: 自動化 -->
  <rect x="20" y="308" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="337" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">タスク自動化</text>

  <rect x="246" y="308" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="326" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">△ 限定的</text>
  <text x="369" y="345" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">エディタ内操作のみ</text>

  <rect x="497" y="308" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="326" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">◎ フル自動化</text>
  <text x="639" y="345" font-family="Arial, sans-serif" font-size="11" fill="#34d399" text-anchor="middle">CI/CD・デプロイまで</text>

  <!-- Row 6: 価格 -->
  <rect x="20" y="360" width="220" height="48" rx="3" fill="#1e293b"/>
  <text x="130" y="389" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">価格</text>

  <rect x="246" y="360" width="245" height="48" rx="3" fill="#0c1e40"/>
  <text x="369" y="378" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">$20/月〜（Pro）</text>
  <text x="369" y="397" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">サブスクリプション型</text>

  <rect x="497" y="360" width="283" height="48" rx="3" fill="#1f1035"/>
  <text x="639" y="378" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">API従量課金</text>
  <text x="639" y="397" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">使った分だけ</text>

  <!-- Row 7: 向いてる用途 -->
  <rect x="20" y="412" width="220" height="68" rx="3" fill="#1e293b"/>
  <text x="130" y="441" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">向いている用途</text>

  <rect x="246" y="412" width="245" height="68" rx="3" fill="#0c1e40"/>
  <text x="369" y="432" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">日常コーディング</text>
  <text x="369" y="451" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">リアルタイム補完</text>
  <text x="369" y="470" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">GUI好きの開発者</text>

  <rect x="497" y="412" width="283" height="68" rx="3" fill="#1f1035"/>
  <text x="639" y="432" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">大規模タスク・自動化</text>
  <text x="639" y="451" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">スクリプト・CI統合</text>
  <text x="639" y="470" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">CLI好きのエンジニア</text>
</svg>

<!--
CursorはGUI型AI-IDEとして日常コーディングに優れ、Claude CodeはCLIエージェントとして大規模タスクや自動化に強い。コンテキスト長はClaude Codeが200Kトークンで圧倒的に優位。
-->

---

# GitHub Copilot vs Claude Code

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">GitHub Copilot vs Claude Code</text>

  <!-- GitHub Copilot column -->
  <rect x="30" y="60" width="340" height="50" rx="8" fill="#24292e" stroke="#6e5494" stroke-width="2"/>
  <text x="200" y="82" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#c084fc" text-anchor="middle">GitHub Copilot</text>
  <text x="200" y="101" font-family="Arial, sans-serif" font-size="11" fill="#a78bfa" text-anchor="middle">コード補完に特化</text>

  <!-- Claude Code column -->
  <rect x="430" y="60" width="340" height="50" rx="8" fill="#1a0a3d" stroke="#a78bfa" stroke-width="2"/>
  <text x="600" y="82" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code</text>
  <text x="600" y="101" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">エージェント型AI</text>

  <!-- Comparison items -->
  <!-- インライン補完 -->
  <rect x="30" y="125" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="50" y="145" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">インライン補完</text>
  <text x="50" y="163" font-family="Arial, sans-serif" font-size="12" fill="#34d399">◎ エディタ内リアルタイム</text>

  <rect x="430" y="125" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="450" y="145" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">インライン補完</text>
  <text x="450" y="163" font-family="Arial, sans-serif" font-size="12" fill="#fbbf24">△ チャット形式が主</text>

  <!-- 複数ファイル操作 -->
  <rect x="30" y="180" width="340" height="50" rx="5" fill="#0c1e40" stroke="#1e3a5f" stroke-width="1"/>
  <text x="50" y="200" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">複数ファイル操作</text>
  <text x="50" y="218" font-family="Arial, sans-serif" font-size="12" fill="#fbbf24">△ 限定的なコンテキスト</text>

  <rect x="430" y="180" width="340" height="50" rx="5" fill="#0c1e40" stroke="#1e3a5f" stroke-width="1"/>
  <text x="450" y="200" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">複数ファイル操作</text>
  <text x="450" y="218" font-family="Arial, sans-serif" font-size="12" fill="#34d399">◎ プロジェクト全体対応</text>

  <!-- コマンド実行 -->
  <rect x="30" y="235" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="50" y="255" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">コマンド実行</text>
  <text x="50" y="273" font-family="Arial, sans-serif" font-size="12" fill="#ef4444">✗ 非対応</text>

  <rect x="430" y="235" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="450" y="255" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">コマンド実行</text>
  <text x="450" y="273" font-family="Arial, sans-serif" font-size="12" fill="#34d399">◎ Bash フル対応</text>

  <!-- GitHub連携 -->
  <rect x="30" y="290" width="340" height="50" rx="5" fill="#0c1e40" stroke="#1e3a5f" stroke-width="1"/>
  <text x="50" y="310" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">GitHub連携</text>
  <text x="50" y="328" font-family="Arial, sans-serif" font-size="12" fill="#34d399">◎ PR/Issues 深い統合</text>

  <rect x="430" y="290" width="340" height="50" rx="5" fill="#0c1e40" stroke="#1e3a5f" stroke-width="1"/>
  <text x="450" y="310" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">GitHub連携</text>
  <text x="450" y="328" font-family="Arial, sans-serif" font-size="12" fill="#fbbf24">○ gh CLI 経由</text>

  <!-- コンテキスト長 -->
  <rect x="30" y="345" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="50" y="365" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">コンテキスト長</text>
  <text x="50" y="383" font-family="Arial, sans-serif" font-size="12" fill="#fbbf24">△ 8K〜32K程度</text>

  <rect x="430" y="345" width="340" height="50" rx="5" fill="#1f1035" stroke="#4c1d95" stroke-width="1"/>
  <text x="450" y="365" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">コンテキスト長</text>
  <text x="450" y="383" font-family="Arial, sans-serif" font-size="12" fill="#34d399">◎ 200K トークン</text>

  <!-- Summary -->
  <rect x="30" y="408" width="340" height="70" rx="8" fill="#13102a" stroke="#6e5494" stroke-width="1"/>
  <text x="200" y="430" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#c084fc" text-anchor="middle">Copilot が輝く場面</text>
  <text x="200" y="451" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">• 日常コーディングの加速</text>
  <text x="200" y="469" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">• エディタ離れずに完結したい</text>

  <rect x="430" y="408" width="340" height="70" rx="8" fill="#1a0a3d" stroke="#a78bfa" stroke-width="1"/>
  <text x="600" y="430" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code が輝く場面</text>
  <text x="600" y="451" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">• 大規模リファクタ・自動化</text>
  <text x="600" y="469" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">• プロジェクト全体の把握が必要</text>
</svg>

<!--
Copilotはエディタ内インライン補完に特化し、Claude Codeはエージェント型で複数ファイル操作・コマンド実行・CI/CD統合まで対応。使用場面によって使い分けるか、ハイブリッド運用が最適。
-->

---

# ツール選定マトリクス

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">ツール選定マトリクス</text>

  <!-- Column Headers -->
  <rect x="190" y="52" width="135" height="42" rx="4" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="257" y="68" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa" text-anchor="middle">GitHub</text>
  <text x="257" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa" text-anchor="middle">Copilot</text>

  <rect x="330" y="52" width="135" height="42" rx="4" fill="#2d1b69" stroke="#a78bfa" stroke-width="1"/>
  <text x="397" y="68" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude</text>
  <text x="397" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa" text-anchor="middle">Code</text>

  <rect x="470" y="52" width="135" height="42" rx="4" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="537" y="68" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa" text-anchor="middle">Cursor</text>
  <text x="537" y="86" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">AI-IDE</text>

  <rect x="610" y="52" width="165" height="42" rx="4" fill="#064e3b" stroke="#34d399" stroke-width="1"/>
  <text x="693" y="68" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#34d399" text-anchor="middle">Copilot</text>
  <text x="693" y="86" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">Workspace</text>

  <!-- Row labels and data -->
  <!-- Row 1 -->
  <rect x="20" y="100" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="120" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">コード補完</text>
  <text x="102" y="138" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">日常コーディング</text>

  <rect x="190" y="100" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="127" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="330" y="100" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="127" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="470" y="100" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="127" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="610" y="100" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="127" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <!-- Row 2 -->
  <rect x="20" y="150" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="170" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">大規模リファクタ</text>
  <text x="102" y="188" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">コードベース全体</text>

  <rect x="190" y="150" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="177" font-family="Arial, sans-serif" font-size="16" fill="#ef4444" text-anchor="middle">△</text>

  <rect x="330" y="150" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="177" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="470" y="150" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="177" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="610" y="150" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="177" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <!-- Row 3 -->
  <rect x="20" y="200" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="220" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">CI/CD 自動化</text>
  <text x="102" y="238" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">デプロイパイプライン</text>

  <rect x="190" y="200" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="227" font-family="Arial, sans-serif" font-size="16" fill="#ef4444" text-anchor="middle">✗</text>

  <rect x="330" y="200" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="227" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="470" y="200" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="227" font-family="Arial, sans-serif" font-size="16" fill="#ef4444" text-anchor="middle">△</text>

  <rect x="610" y="200" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="227" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <!-- Row 4 -->
  <rect x="20" y="250" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="270" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">テスト生成</text>
  <text x="102" y="288" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">ユニット/E2E</text>

  <rect x="190" y="250" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="277" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="330" y="250" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="277" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="470" y="250" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="277" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="610" y="250" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="277" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <!-- Row 5 -->
  <rect x="20" y="300" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="320" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">PR レビュー</text>
  <text x="102" y="338" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">コードレビュー支援</text>

  <rect x="190" y="300" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="327" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="330" y="300" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="327" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="470" y="300" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="327" font-family="Arial, sans-serif" font-size="16" fill="#ef4444" text-anchor="middle">△</text>

  <rect x="610" y="300" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="327" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <!-- Row 6 -->
  <rect x="20" y="350" width="165" height="45" rx="3" fill="#1e293b"/>
  <text x="102" y="370" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">ドキュメント生成</text>
  <text x="102" y="388" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">README/API Doc</text>

  <rect x="190" y="350" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="257" y="377" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="330" y="350" width="135" height="45" rx="3" fill="#1f1035"/>
  <text x="397" y="377" font-family="Arial, sans-serif" font-size="16" fill="#34d399" text-anchor="middle">◎</text>

  <rect x="470" y="350" width="135" height="45" rx="3" fill="#0c1e40"/>
  <text x="537" y="377" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <rect x="610" y="350" width="165" height="45" rx="3" fill="#022c22"/>
  <text x="693" y="377" font-family="Arial, sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">○</text>

  <!-- Legend -->
  <rect x="20" y="410" width="760" height="75" rx="6" fill="#0f172a" stroke="#374151" stroke-width="1"/>
  <text x="40" y="432" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">凡例:</text>
  <text x="100" y="432" font-family="Arial, sans-serif" font-size="14" fill="#34d399">◎</text>
  <text x="120" y="432" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7">最適</text>
  <text x="165" y="432" font-family="Arial, sans-serif" font-size="14" fill="#fbbf24">○</text>
  <text x="185" y="432" font-family="Arial, sans-serif" font-size="11" fill="#fde68a">使用可</text>
  <text x="235" y="432" font-family="Arial, sans-serif" font-size="14" fill="#ef4444">△</text>
  <text x="255" y="432" font-family="Arial, sans-serif" font-size="11" fill="#fca5a5">限定的</text>
  <text x="305" y="432" font-family="Arial, sans-serif" font-size="14" fill="#ef4444">✗</text>
  <text x="325" y="432" font-family="Arial, sans-serif" font-size="11" fill="#fca5a5">非対応</text>
  <text x="40" y="460" font-family="Arial, sans-serif" font-size="11" fill="#64748b">推奨: 用途に応じてツールを使い分ける。大規模・自動化タスクはClaude Code、日常補完はCopilot/Cursor</text>
  <text x="40" y="477" font-family="Arial, sans-serif" font-size="11" fill="#64748b">組み合わせも有効: IDE内はCopilot + 大タスクはClaude Code のハイブリッド運用</text>
</svg>

<!--
用途別にどのツールが最適かを示すマトリクス。コード補完はCopilot/Cursor、大規模リファクタ・CI/CD自動化・テスト生成・PRレビューはClaude Codeが最適。組み合わせ利用も有効。
-->

---

# 実践: 新機能実装デモ

> *自然言語要件だけで実装〜テストを完全自動化できる*

- Claude Codeで新機能を実装する基本的なコマンド例
- 自然言語で要件を伝えるだけで実装からテストまで自動化
- 既存コードのコンテキストを自動読込して整合性を保つ


---

# 実践: 新機能実装デモ（コード例）

```bash
# 新機能の実装を依頼
claude "ユーザー認証機能を追加してください。
JWT トークンベースで、/api/login と /api/logout
エンドポイントを実装し、既存のUserモデルを使用してください"

# 実装後、自動でテストも生成
claude "実装した認証機能のユニットテストを作成し、
bun test で全テストが通ることを確認してください"

# コードレビューも依頼可能
claude "実装したコードをレビューして、
セキュリティ上の問題点があれば修正してください"
```


---

# 実践: バグ修正デモ

> *エラーをそのまま貼るだけで修正〜回帰確認まで完結*

- バグ報告から修正・検証まで Claude Code が一貫して対応
- エラーメッセージやスタックトレースをそのまま渡すと効果的
- 修正後にテストを実行して回帰がないことを自動確認


---

# 実践: バグ修正デモ（コード例）

```bash
# エラーメッセージをそのまま渡してバグ修正
claude "以下のエラーが発生しています。原因を特定して修正してください:
TypeError: Cannot read properties of undefined (reading 'id')
  at UserService.getUser (src/services/user.ts:42)
  at async Handler (src/routes/users.ts:18)"

# 修正後に再現テストも追加
claude "修正したバグの再現テストを追加して、
今後同じバグが発生しないようにしてください"

# ログから問題を特定
claude "本番ログを分析して、パフォーマンス問題の
原因を特定してください: $(cat logs/prod.log)"
```


---

# 実践: テスト自動生成

- 既存コードのテストをClaude Codeが自動生成
- カバレッジ目標を指定して不足箇所を埋める


---

# 実践: テスト自動生成（コード例）

```typescript
# テスト生成の依頼
claude "src/services/payment.ts の全関数に対して
ユニットテストを作成してください。
カバレッジ 90% 以上を目標にしてください"

# 生成されたテスト例 (payment.test.ts)
import { expect, test, describe, mock } from 'bun:test';
import { PaymentService } from './payment';

describe('PaymentService', () => {
  test('正常な支払いが処理される', async () => {
    const service = new PaymentService();
    const result = await service.process({
      amount: 1000, currency: 'JPY'
    });
    expect(result.status).toBe('success');
  });

  test('無効な金額でエラーが発生する', async () => {
    const service = new PaymentService();
    expect(() => service.process({ amount: -1 }))
      .toThrow('Invalid amount');
  });
});
```


---

# チーム開発への適用

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">チーム全体のAI駆動開発ワークフロー</text>

  <!-- Planning phase -->
  <rect x="20" y="60" width="145" height="80" rx="8" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="92" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">企画・設計</text>
  <text x="92" y="108" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">PM + PdM</text>
  <text x="92" y="126" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">AI仕様整理支援</text>

  <!-- Arrow -->
  <line x1="165" y1="100" x2="203" y2="100" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="195,93 207,100 195,107" fill="#60a5fa"/>

  <!-- Development phase -->
  <rect x="205" y="60" width="145" height="80" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="277" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">実装</text>
  <text x="277" y="108" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">フロント/バック</text>
  <text x="277" y="126" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">Claude Codeで加速</text>

  <!-- Arrow -->
  <line x1="350" y1="100" x2="388" y2="100" stroke="#34d399" stroke-width="2"/>
  <polygon points="380,93 392,100 380,107" fill="#34d399"/>

  <!-- Review phase -->
  <rect x="390" y="60" width="145" height="80" rx="8" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="462" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">レビュー</text>
  <text x="462" y="108" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">AI初回レビュー</text>
  <text x="462" y="126" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">人間が最終確認</text>

  <!-- Arrow -->
  <line x1="535" y1="100" x2="573" y2="100" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="565,93 577,100 565,107" fill="#fbbf24"/>

  <!-- Deploy phase -->
  <rect x="575" y="60" width="145" height="80" rx="8" fill="#1c1c10" stroke="#fbbf24" stroke-width="2"/>
  <text x="647" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">デプロイ</text>
  <text x="647" y="108" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">CI/CD + AI監視</text>
  <text x="647" y="126" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">自動テスト実行</text>

  <!-- AI integration layer -->
  <rect x="20" y="168" width="760" height="38" rx="6" fill="#1a0a3d" stroke="#a78bfa" stroke-width="1"/>
  <text x="400" y="181" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI 統合レイヤー (Claude Code / Copilot / Cursor) — 全工程に横断</text>
  <text x="400" y="198" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">コード生成 / テスト / ドキュメント / レビュー / デバッグ を各工程で支援</text>

  <!-- Role details -->
  <rect x="20" y="225" width="175" height="255" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="107" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">PM の活用</text>
  <text x="35" y="273" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• 要件定義の整理</text>
  <text x="35" y="293" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• ユーザーストーリー作成</text>
  <text x="35" y="313" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• リリースノート生成</text>
  <text x="35" y="333" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• 進捗レポート自動化</text>
  <text x="35" y="353" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• ロードマップ策定支援</text>
  <text x="35" y="373" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• 競合分析</text>
  <text x="35" y="393" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• KPI設定支援</text>
  <text x="35" y="413" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• ミーティング議事録</text>
  <text x="35" y="433" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• タスク分解</text>

  <rect x="210" y="225" width="180" height="255" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="300" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">フロントエンド</text>
  <text x="225" y="273" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• コンポーネント生成</text>
  <text x="225" y="293" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• スタイリング最適化</text>
  <text x="225" y="313" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• アクセシビリティ確認</text>
  <text x="225" y="333" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• テスト自動生成</text>
  <text x="225" y="353" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• バグ修正支援</text>
  <text x="225" y="373" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• パフォーマンス改善</text>
  <text x="225" y="393" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• API連携コード</text>
  <text x="225" y="413" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• TypeScript型生成</text>
  <text x="225" y="433" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• ドキュメント生成</text>

  <rect x="405" y="225" width="180" height="255" rx="8" fill="#022c22" stroke="#34d399" stroke-width="1"/>
  <text x="495" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">バックエンド</text>
  <text x="420" y="273" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• API設計・実装</text>
  <text x="420" y="293" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• DB スキーマ設計</text>
  <text x="420" y="313" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• セキュリティ実装</text>
  <text x="420" y="333" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• マイグレーション</text>
  <text x="420" y="353" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• パフォーマンス最適</text>
  <text x="420" y="373" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• エラーハンドリング</text>
  <text x="420" y="393" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• ログ設計</text>
  <text x="420" y="413" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• インフラコード(IaC)</text>
  <text x="420" y="433" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• Docker/K8s設定</text>

  <rect x="600" y="225" width="180" height="255" rx="8" fill="#1c1c10" stroke="#fbbf24" stroke-width="1"/>
  <text x="690" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fbbf24" text-anchor="middle">SRE / DevOps</text>
  <text x="615" y="273" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• CI/CDパイプライン</text>
  <text x="615" y="293" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• 監視設定自動化</text>
  <text x="615" y="313" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• インシデント分析</text>
  <text x="615" y="333" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• アラート設定</text>
  <text x="615" y="353" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• コスト最適化</text>
  <text x="615" y="373" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• セキュリティ監査</text>
  <text x="615" y="393" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• Runbook生成</text>
  <text x="615" y="413" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• 障害対応支援</text>
  <text x="615" y="433" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">• キャパシティ計画</text>
</svg>

<!--
AI駆動開発はチーム全体に適用できる。PM・フロントエンド・バックエンド・DevOpsそれぞれの役割でAIが価値を発揮する。共通のAI統合レイヤーが全工程を横断的に支援。
-->

---

# ペアプログラミング with AI

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">ペアプログラミング with AI</text>

  <!-- Human icon area -->
  <rect x="30" y="60" width="150" height="160" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <!-- Simple human figure -->
  <circle cx="105" cy="100" r="22" fill="#a78bfa"/>
  <rect x="90" y="125" width="30" height="50" rx="5" fill="#7c3aed"/>
  <rect x="80" y="130" width="15" height="35" rx="5" fill="#7c3aed"/>
  <rect x="110" y="130" width="15" height="35" rx="5" fill="#7c3aed"/>
  <rect x="88" y="174" width="14" height="35" rx="5" fill="#6d28d9"/>
  <rect x="103" y="174" width="14" height="35" rx="5" fill="#6d28d9"/>
  <text x="105" y="225" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#c4b5fd" text-anchor="middle">Human</text>
  <text x="105" y="210" font-family="Arial, sans-serif" font-size="11" fill="#a78bfa" text-anchor="middle">開発者</text>

  <!-- AI icon area -->
  <rect x="620" y="60" width="150" height="160" rx="10" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <!-- Simple AI icon -->
  <rect x="665" y="80" width="60" height="60" rx="8" fill="#1d4ed8"/>
  <circle cx="685" cy="103" r="7" fill="#60a5fa"/>
  <circle cx="705" cy="103" r="7" fill="#60a5fa"/>
  <rect x="683" y="118" width="14" height="4" rx="2" fill="#93c5fd"/>
  <line x1="665" y1="90" x2="655" y2="80" stroke="#60a5fa" stroke-width="2"/>
  <line x1="725" y1="90" x2="735" y2="80" stroke="#60a5fa" stroke-width="2"/>
  <line x1="695" y1="140" x2="695" y2="155" stroke="#60a5fa" stroke-width="2"/>
  <rect x="680" y="155" width="30" height="12" rx="3" fill="#1d4ed8"/>
  <text x="695" y="200" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#93c5fd" text-anchor="middle">AI</text>
  <text x="695" y="215" font-family="Arial, sans-serif" font-size="11" fill="#60a5fa" text-anchor="middle">Claude Code</text>

  <!-- Central session flow -->
  <rect x="210" y="60" width="380" height="160" rx="10" fill="#0f172a" stroke="#475569" stroke-width="1"/>
  <text x="400" y="88" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="middle">ペアプロセッション</text>

  <!-- Flow arrows left to right -->
  <line x1="180" y1="120" x2="208" y2="120" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="200,113 212,120 200,127" fill="#a78bfa"/>

  <!-- Session steps inside the box -->
  <rect x="220" y="100" width="100" height="36" rx="4" fill="#1a0a3d" stroke="#a78bfa" stroke-width="1"/>
  <text x="270" y="118" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">問題を伝える</text>
  <text x="270" y="130" font-family="Arial, sans-serif" font-size="10" fill="#8b8ba0" text-anchor="middle">要件・仕様</text>

  <line x1="320" y1="118" x2="338" y2="118" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="332,112 342,118 332,124" fill="#60a5fa"/>

  <rect x="340" y="100" width="100" height="36" rx="4" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="390" y="118" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">AI が実装案</text>
  <text x="390" y="130" font-family="Arial, sans-serif" font-size="10" fill="#60a5fa" text-anchor="middle">を提示</text>

  <line x1="440" y1="118" x2="458" y2="118" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="452,112 462,118 452,124" fill="#34d399"/>

  <rect x="460" y="100" width="100" height="36" rx="4" fill="#022c22" stroke="#34d399" stroke-width="1"/>
  <text x="510" y="118" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">人間が確認・</text>
  <text x="510" y="130" font-family="Arial, sans-serif" font-size="10" fill="#34d399" text-anchor="middle">フィードバック</text>

  <line x1="560" y1="118" x2="590" y2="118" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="582,112 592,118 582,124" fill="#fbbf24"/>

  <!-- Loop back arrow -->
  <path d="M 580 150 Q 400 190 240 150" stroke="#475569" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
  <polygon points="248,143 238,152 250,158" fill="#475569"/>
  <text x="400" y="188" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">繰り返し改善</text>

  <line x1="590" y1="120" x2="618" y2="120" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="610,113 622,120 610,127" fill="#a78bfa"/>

  <!-- Bottom role split -->
  <rect x="30" y="250" width="360" height="230" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="210" y="275" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#a78bfa" text-anchor="middle">人間の役割（ドライバー）</text>
  <text x="50" y="300" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 問題の文脈・ビジネス要件を伝える</text>
  <text x="50" y="322" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• AIの出力をレビュー・検証する</text>
  <text x="50" y="344" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 方向性・品質基準を決定する</text>
  <text x="50" y="366" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• エッジケースや制約を指摘</text>
  <text x="50" y="388" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• チームとのコミュニケーション</text>
  <text x="50" y="410" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 最終的な責任を持つ</text>
  <text x="50" y="432" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 倫理・セキュリティの判断</text>
  <text x="50" y="454" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• AIが見落とす創造的解決策</text>

  <rect x="410" y="250" width="360" height="230" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="590" y="275" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#60a5fa" text-anchor="middle">AIの役割（ナビゲーター）</text>
  <text x="428" y="300" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 実装コードの高速生成</text>
  <text x="428" y="322" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 複数の実装アプローチを提示</text>
  <text x="428" y="344" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• バグの検出・修正提案</text>
  <text x="428" y="366" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• テストコードの自動生成</text>
  <text x="428" y="388" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• ドキュメント・コメント作成</text>
  <text x="428" y="410" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• リファクタリング提案</text>
  <text x="428" y="432" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• ライブラリ・API調査</text>
  <text x="428" y="454" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コードベースの横断検索</text>
</svg>

<!--
AIをナビゲーター、人間をドライバーとするペアプロが最も効果的なパターン。人間がコンテキストと方向性を決め、AIが実装の速度と品質を担保する。
-->

---

# PR レビューフロー

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">GitHub PR + AI レビュー統合フロー</text>

  <!-- Row 1: Developer -->
  <rect x="30" y="60" width="120" height="60" rx="8" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="90" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">開発者</text>
  <text x="90" y="107" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">コード完成</text>

  <line x1="150" y1="90" x2="188" y2="90" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="180,83 192,90 180,97" fill="#60a5fa"/>

  <rect x="190" y="60" width="120" height="60" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="250" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">git push</text>
  <text x="250" y="107" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">ブランチ作成</text>

  <line x1="310" y1="90" x2="348" y2="90" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="340,83 352,90 340,97" fill="#60a5fa"/>

  <rect x="350" y="60" width="130" height="60" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="415" y="88" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">PR 作成</text>
  <text x="415" y="107" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">gh pr create</text>

  <!-- Trigger arrow down -->
  <line x1="415" y1="120" x2="415" y2="155" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4,2"/>
  <polygon points="408,148 415,160 422,148" fill="#a78bfa"/>
  <text x="435" y="145" font-family="Arial, sans-serif" font-size="10" fill="#8b8ba0">自動トリガー</text>

  <!-- GitHub Actions CI -->
  <rect x="295" y="160" width="240" height="70" rx="8" fill="#1a0a3d" stroke="#a78bfa" stroke-width="2"/>
  <text x="415" y="188" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">GitHub Actions</text>
  <text x="415" y="207" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">CI: テスト・Lint・ビルド</text>
  <text x="415" y="222" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">Claude Code AIレビュー起動</text>

  <!-- Parallel arrows down -->
  <line x1="360" y1="230" x2="310" y2="268" stroke="#34d399" stroke-width="2"/>
  <polygon points="305,262 308,274 317,265" fill="#34d399"/>

  <line x1="470" y1="230" x2="510" y2="268" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="503,262 513,274 518,264" fill="#fbbf24"/>

  <!-- CI Results box -->
  <rect x="190" y="270" width="160" height="60" rx="8" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="270" y="297" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#34d399" text-anchor="middle">CI 結果</text>
  <text x="270" y="316" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">Pass / Fail</text>

  <!-- AI Review box -->
  <rect x="440" y="270" width="185" height="60" rx="8" fill="#1c1c10" stroke="#fbbf24" stroke-width="2"/>
  <text x="532" y="293" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24" text-anchor="middle">AI レビュー結果</text>
  <text x="532" y="312" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">コメント自動投稿</text>

  <!-- Arrows to Human Review -->
  <line x1="270" y1="330" x2="310" y2="368" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="305,362 312,374 318,364" fill="#60a5fa"/>

  <line x1="532" y1="330" x2="490" y2="368" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="487,362 488,374 498,366" fill="#60a5fa"/>

  <!-- Human Review -->
  <rect x="295" y="370" width="240" height="60" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="415" y="398" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">人間レビュー</text>
  <text x="415" y="416" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">最終判断 + Approve/Request Changes</text>

  <!-- Arrow to Merge -->
  <line x1="535" y1="400" x2="590" y2="400" stroke="#34d399" stroke-width="2"/>
  <polygon points="583,393 595,400 583,407" fill="#34d399"/>

  <rect x="592" y="375" width="130" height="50" rx="8" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="657" y="400" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">Merge</text>
  <text x="657" y="416" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">main ブランチ</text>

  <!-- Left panel: AI review items -->
  <rect x="30" y="160" width="255" height="305" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="157" y="185" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI レビュー観点</text>
  <text x="48" y="210" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コードスタイル一貫性</text>
  <text x="48" y="233" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• セキュリティ脆弱性</text>
  <text x="48" y="256" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• パフォーマンス問題</text>
  <text x="48" y="279" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• テストカバレッジ</text>
  <text x="48" y="302" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• ドキュメント不足</text>
  <text x="48" y="325" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 命名規則違反</text>
  <text x="48" y="348" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 重複コード</text>
  <text x="48" y="371" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 型安全性の問題</text>
  <text x="48" y="394" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• SOLID原則違反</text>
  <text x="48" y="417" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• エラーハンドリング漏れ</text>
  <text x="48" y="440" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 非推奨API使用</text>
  <text x="48" y="460" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 依存ライブラリ脆弱性</text>

  <!-- Right: timeline note -->
  <rect x="635" y="60" width="145" height="300" rx="8" fill="#0f172a" stroke="#475569" stroke-width="1"/>
  <text x="707" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8" text-anchor="middle">時間比較</text>
  <text x="650" y="108" font-family="Arial, sans-serif" font-size="11" fill="#64748b">従来:</text>
  <text x="650" y="126" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">レビュー待ち</text>
  <text x="650" y="144" font-family="Arial, sans-serif" font-size="11" fill="#fca5a5">1〜2日</text>
  <line x1="650" y1="155" x2="770" y2="155" stroke="#374151" stroke-width="1"/>
  <text x="650" y="175" font-family="Arial, sans-serif" font-size="11" fill="#64748b">AI導入後:</text>
  <text x="650" y="193" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">初回レビュー</text>
  <text x="650" y="211" font-family="Arial, sans-serif" font-size="11" fill="#34d399">数分</text>
  <text x="650" y="232" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0">人間最終確認</text>
  <text x="650" y="250" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24">30分〜数時間</text>
  <line x1="650" y1="262" x2="770" y2="262" stroke="#374151" stroke-width="1"/>
  <text x="650" y="282" font-family="Arial, sans-serif" font-size="11" fill="#64748b">効果:</text>
  <text x="650" y="300" font-family="Arial, sans-serif" font-size="11" fill="#34d399">速度 10x↑</text>
  <text x="650" y="318" font-family="Arial, sans-serif" font-size="11" fill="#34d399">品質 一貫性↑</text>
  <text x="650" y="336" font-family="Arial, sans-serif" font-size="11" fill="#34d399">負荷 軽減↑</text>
</svg>

<!--
GitHub PRにAIレビューを統合することで、初回レビューが数分で完了し、人間は最終判断に集中できる。レビュー速度10倍向上と品質の一貫性向上が期待できる。
-->

---

# CI/CDとの統合

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">GitHub Actions + Claude Code CI/CDパイプライン</text>

  <!-- Trigger -->
  <rect x="20" y="60" width="130" height="60" rx="8" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="85" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#a78bfa" text-anchor="middle">Trigger</text>
  <text x="85" y="104" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">push / PR</text>

  <line x1="150" y1="90" x2="185" y2="90" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="177,83 189,90 177,97" fill="#60a5fa"/>

  <!-- Checkout & Setup -->
  <rect x="187" y="60" width="130" height="60" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="252" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa" text-anchor="middle">Checkout</text>
  <text x="252" y="104" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">+ 環境セットアップ</text>

  <line x1="317" y1="90" x2="352" y2="90" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="344,83 356,90 344,97" fill="#60a5fa"/>

  <!-- Lint + Test -->
  <rect x="354" y="60" width="130" height="60" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="2"/>
  <text x="419" y="83" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#60a5fa" text-anchor="middle">Lint / Test</text>
  <text x="419" y="100" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">bun test</text>
  <text x="419" y="114" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd" text-anchor="middle">bun run check</text>

  <line x1="484" y1="90" x2="519" y2="90" stroke="#34d399" stroke-width="2"/>
  <polygon points="511,83 523,90 511,97" fill="#34d399"/>

  <!-- Build -->
  <rect x="521" y="60" width="130" height="60" rx="8" fill="#022c22" stroke="#34d399" stroke-width="2"/>
  <text x="586" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#34d399" text-anchor="middle">Build</text>
  <text x="586" y="104" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle">成果物の生成</text>

  <line x1="651" y1="90" x2="686" y2="90" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="678,83 690,90 678,97" fill="#fbbf24"/>

  <!-- Deploy -->
  <rect x="688" y="60" width="95" height="60" rx="8" fill="#1c1c10" stroke="#fbbf24" stroke-width="2"/>
  <text x="735" y="86" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24" text-anchor="middle">Deploy</text>
  <text x="735" y="104" font-family="Arial, sans-serif" font-size="11" fill="#fde68a" text-anchor="middle">本番反映</text>

  <!-- AI Integration stage (vertical bar) -->
  <rect x="20" y="145" width="765" height="50" rx="6" fill="#1a0a3d" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="400" y="165" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">Claude Code AI 統合ステップ (各ジョブ後に自動実行)</text>
  <text x="400" y="185" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd" text-anchor="middle">コードレビュー → テスト生成 → セキュリティスキャン → 改善提案 → ドキュメント更新</text>

  <!-- Detail panels -->
  <rect x="20" y="213" width="232" height="270" rx="8" fill="#1f1035" stroke="#a78bfa" stroke-width="1"/>
  <text x="136" y="238" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a78bfa" text-anchor="middle">AI コードレビュー</text>
  <text x="36" y="262" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• PR の全変更を分析</text>
  <text x="36" y="284" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 問題点をコメント投稿</text>
  <text x="36" y="306" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• セキュリティ指摘</text>
  <text x="36" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• パフォーマンス提案</text>
  <text x="36" y="350" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• コーディング規約確認</text>
  <text x="36" y="375" font-family="Arial, sans-serif" font-size="11" font-style="italic" fill="#8b8ba0">actions/claude-review@v1</text>
  <text x="36" y="395" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd">ANTHROPIC_API_KEY: secret</text>
  <text x="36" y="415" font-family="Arial, sans-serif" font-size="11" fill="#c4b5fd">on: [pull_request]</text>

  <rect x="268" y="213" width="232" height="270" rx="8" fill="#0c1e40" stroke="#60a5fa" stroke-width="1"/>
  <text x="384" y="238" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#60a5fa" text-anchor="middle">AI テスト生成</text>
  <text x="284" y="262" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 新規関数のテスト自動作成</text>
  <text x="284" y="284" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• カバレッジ不足を検知</text>
  <text x="284" y="306" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• エッジケースを提案</text>
  <text x="284" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• E2Eシナリオの生成</text>
  <text x="284" y="350" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• テストの実行・確認</text>
  <text x="284" y="375" font-family="Arial, sans-serif" font-size="11" font-style="italic" fill="#8b8ba0">claude code --print "..."</text>
  <text x="284" y="395" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">bun test --coverage</text>
  <text x="284" y="415" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">coverage: min 80%</text>

  <rect x="516" y="213" width="268" height="270" rx="8" fill="#022c22" stroke="#34d399" stroke-width="1"/>
  <text x="650" y="238" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#34d399" text-anchor="middle">AI セキュリティ + ドキュメント</text>
  <text x="532" y="262" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 依存ライブラリの脆弱性検出</text>
  <text x="532" y="284" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• シークレット漏洩スキャン</text>
  <text x="532" y="306" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• インジェクション箇所の特定</text>
  <text x="532" y="328" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• 変更箇所のドキュメント更新</text>
  <text x="532" y="350" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• CHANGELOGの自動生成</text>
  <text x="532" y="372" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• API仕様書の同期更新</text>
  <text x="532" y="394" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">• リリースノート作成</text>
  <text x="532" y="416" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7">on: [push, merge_group]</text>
  <text x="532" y="435" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7">branches: [main, release/*]</text>
  <text x="532" y="454" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7">if: success() &amp;&amp; !failure()</text>
  <text x="532" y="473" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7">needs: [lint, test, build]</text>
</svg>

<!--
GitHub ActionsにClaude Codeを統合することで、コードレビュー・テスト生成・セキュリティスキャン・ドキュメント更新が自動化される。ANTHROPIC_API_KEYをシークレットに設定して安全に利用する。
-->

---

<!-- _class: lead -->
# 高度なテクニック

- AIエージェントの能力を最大限に引き出す応用技術


---

# マルチエージェント並列実行

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="40" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">マルチエージェント並列実行</text>

  <!-- Orchestrator -->
  <rect x="300" y="60" width="200" height="50" rx="8" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="91" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#a78bfa">Orchestrator</text>

  <!-- Arrows from orchestrator to agents -->
  <!-- Arrow to Agent 1 -->
  <line x1="270" y1="95" x2="160" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="160,175 155,160 170,163" fill="#a78bfa"/>
  <!-- Arrow to Agent 2 -->
  <line x1="340" y1="110" x2="290" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="290,175 282,162 296,161" fill="#a78bfa"/>
  <!-- Arrow to Agent 3 -->
  <line x1="460" y1="110" x2="510" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="510,175 504,161 518,162" fill="#a78bfa"/>
  <!-- Arrow to Agent 4 -->
  <line x1="530" y1="95" x2="640" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="640,175 630,163 645,160" fill="#a78bfa"/>

  <!-- Agent boxes -->
  <!-- Agent 1 -->
  <rect x="80" y="180" width="150" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="155" y="205" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Agent 1</text>
  <text x="155" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">feature-auth.ts</text>

  <!-- Agent 2 -->
  <rect x="255" y="180" width="150" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="330" y="205" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Agent 2</text>
  <text x="330" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">feature-api.ts</text>

  <!-- Agent 3 -->
  <rect x="430" y="180" width="150" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="505" y="205" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Agent 3</text>
  <text x="505" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">feature-ui.tsx</text>

  <!-- Agent 4 -->
  <rect x="605" y="180" width="150" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="680" y="205" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Agent 4</text>
  <text x="680" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">tests/*.test.ts</text>

  <!-- Progress bars -->
  <!-- Agent 1 progress -->
  <rect x="85" y="250" width="140" height="12" rx="6" fill="#0f172a"/>
  <rect x="85" y="250" width="112" height="12" rx="6" fill="#34d399"/>
  <text x="155" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">80%</text>

  <!-- Agent 2 progress -->
  <rect x="260" y="250" width="140" height="12" rx="6" fill="#0f172a"/>
  <rect x="260" y="250" width="84" height="12" rx="6" fill="#34d399"/>
  <text x="330" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">60%</text>

  <!-- Agent 3 progress -->
  <rect x="435" y="250" width="140" height="12" rx="6" fill="#0f172a"/>
  <rect x="435" y="250" width="98" height="12" rx="6" fill="#fbbf24"/>
  <text x="505" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">70%</text>

  <!-- Agent 4 progress -->
  <rect x="610" y="250" width="140" height="12" rx="6" fill="#0f172a"/>
  <rect x="610" y="250" width="42" height="12" rx="6" fill="#f87171"/>
  <text x="680" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f87171">30%</text>

  <!-- Parallel execution label -->
  <rect x="50" y="300" width="700" height="2" fill="#4c1d95" opacity="0.6"/>
  <text x="400" y="330" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#c4b5fd">全エージェントが独立ファイルを同時処理 — ファイル競合なし</text>

  <!-- Results merge -->
  <rect x="270" y="355" width="260" height="50" rx="8" fill="#0f3460" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="376" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Merge Results</text>
  <text x="400" y="394" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">PR / Commit</text>

  <!-- Arrows to merge -->
  <line x1="155" y1="295" x2="310" y2="355" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="310,355 302,342 316,341" fill="#34d399"/>
  <line x1="330" y1="295" x2="360" y2="355" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="360,355 353,342 366,342" fill="#34d399"/>
  <line x1="505" y1="295" x2="440" y2="355" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="440,355 434,342 447,342" fill="#34d399"/>
  <line x1="680" y1="295" x2="490" y2="355" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="490,355 482,342 496,341" fill="#34d399"/>

  <!-- Time comparison -->
  <text x="400" y="440" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa">逐次実行: 4x時間 → 並列実行: 1x時間（理論値）</text>
  <text x="400" y="465" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">mode: "bypassPermissions" が必須</text>
</svg>
- 複数のエージェントが独立したファイルを同時並行で処理
- mode: "bypassPermissions" + run_in_background: true が必須


---

# サブエージェント設計

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">サブエージェント設計 — 委譲ツリー</text>

  <!-- Parent Agent -->
  <rect x="275" y="55" width="250" height="60" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="80" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#a78bfa">Parent Agent</text>
  <text x="400" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd">Task: 大きな機能を実装する</text>

  <!-- Arrow down to sub-agents -->
  <line x1="310" y1="115" x2="200" y2="200" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="200,200 194,186 208,187" fill="#a78bfa"/>
  <line x1="400" y1="115" x2="400" y2="200" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="400,200 393,186 407,186" fill="#a78bfa"/>
  <line x1="490" y1="115" x2="600" y2="200" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="600,200 592,187 606,186" fill="#a78bfa"/>

  <!-- Sub-agents row 1 -->
  <rect x="110" y="205" width="170" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="195" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Sub-Agent A</text>
  <text x="195" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">DB スキーマ設計</text>

  <rect x="315" y="205" width="170" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Sub-Agent B</text>
  <text x="400" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">API エンドポイント</text>

  <rect x="520" y="205" width="170" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="605" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Sub-Agent C</text>
  <text x="605" y="248" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">フロントエンド UI</text>

  <!-- Sub-sub agents (from Agent A) -->
  <line x1="165" y1="260" x2="120" y2="325" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="120,325 115,312 128,312" fill="#60a5fa"/>
  <line x1="225" y1="260" x2="250" y2="325" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="250,325 244,312 257,312" fill="#60a5fa"/>

  <rect x="60" y="330" width="130" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="125" y="350" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Migration</text>
  <text x="125" y="367" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">生成・実行</text>

  <rect x="205" y="330" width="130" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="270" y="350" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Seed Data</text>
  <text x="270" y="367" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">生成・投入</text>

  <!-- Sub-sub agents (from Agent B) -->
  <line x1="380" y1="260" x2="380" y2="325" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="380,325 373,312 387,312" fill="#60a5fa"/>
  <line x1="420" y1="260" x2="450" y2="325" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="450,325 444,312 457,312" fill="#60a5fa"/>

  <rect x="315" y="330" width="130" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="380" y="350" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Route Handler</text>
  <text x="380" y="367" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">実装</text>

  <rect x="460" y="330" width="130" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="525" y="350" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Validation</text>
  <text x="525" y="367" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">スキーマ定義</text>

  <!-- Sub from C -->
  <line x1="605" y1="260" x2="650" y2="325" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="650,325 644,312 657,312" fill="#60a5fa"/>

  <rect x="605" y="330" width="130" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="670" y="350" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Components</text>
  <text x="670" y="367" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">実装・テスト</text>

  <!-- Key principle -->
  <rect x="60" y="400" width="680" height="50" rx="8" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="400" y="422" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#c4b5fd">各サブエージェントは独立したコンテキストを持ち、結果を親に返す</text>
  <text x="400" y="442" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">Task tool の mode: "bypassPermissions" + run_in_background: true で並列起動</text>
</svg>
- 親エージェントが大タスクをサブエージェントに委譲するツリー構造
- 各サブエージェントは独立したコンテキストで動作し結果を返す


---

# カスタムエージェント作成

- `.claude/agents/` ディレクトリにMDファイルを配置するだけ
- 専門知識・制約・ペルソナを定義して再利用可能な専門家を作成


---

# カスタムエージェント作成（コード例）

```markdown
# .claude/agents/slide-creator.md
---
name: slide-creator
description: |
  Marpスライド生成の専門エージェント。
  スライドデータJSONを生成してレンダリングまで実行する。
  Use when: /create-slides コマンド実行時
tools:
  - Read
  - Write
  - Bash
  - Edit
---

## 役割
スライド生成に特化したエージェント。
スキーマに従ったJSONを生成し、SVG付きの
Marpプレゼンテーションを作成する。

## 必須確認事項
- フィールド名は content（bullets は不可）
- SVG は url(#id) 参照を使わない
- JSON は Write ツールでファイルに書き出す
```


---

# エージェントチーム構成

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">エージェントチーム構成</text>

  <!-- Team Leader -->
  <rect x="275" y="55" width="250" height="60" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">Team Leader</text>
  <text x="400" y="99" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">タスク分割 → 割当 → マージ</text>

  <!-- Arrow down left to impl-workers -->
  <line x1="360" y1="115" x2="220" y2="195" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="220,195 213,182 227,181" fill="#60a5fa"/>
  <line x1="340" y1="115" x2="155" y2="195" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="155,195 148,182 162,181" fill="#60a5fa"/>

  <!-- Arrow down right to review-workers -->
  <line x1="440" y1="115" x2="580" y2="195" stroke="#34d399" stroke-width="2"/>
  <polygon points="580,195 573,182 587,181" fill="#34d399"/>
  <line x1="460" y1="115" x2="645" y2="195" stroke="#34d399" stroke-width="2"/>
  <polygon points="645,195 638,182 652,181" fill="#34d399"/>

  <!-- Section Labels -->
  <text x="185" y="185" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Impl Workers</text>
  <text x="615" y="185" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Review Workers</text>

  <!-- Impl Worker 1 -->
  <rect x="65" y="205" width="165" height="70" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="148" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">impl-worker-1</text>
  <text x="148" y="247" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">Claude Code</text>
  <text x="148" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bfdbfe">スライド 1-20 実装</text>

  <!-- Impl Worker 2 -->
  <rect x="245" y="205" width="165" height="70" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="328" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">impl-worker-2</text>
  <text x="328" y="247" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">Claude Code</text>
  <text x="328" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bfdbfe">スライド 21-40 実装</text>

  <!-- Review Worker 1 -->
  <rect x="425" y="205" width="165" height="70" rx="8" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="508" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">review-worker-1</text>
  <text x="508" y="247" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">Codex / Claude</text>
  <text x="508" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">品質レビュー</text>

  <!-- Review Worker 2 -->
  <rect x="605" y="205" width="165" height="70" rx="8" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="688" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">review-worker-2</text>
  <text x="688" y="247" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">Codex / Claude</text>
  <text x="688" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">SVG/Schema 検証</text>

  <!-- Lifecycle row -->
  <text x="400" y="310" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">タスクライフサイクル</text>

  <!-- States -->
  <rect x="25" y="325" width="110" height="38" rx="6" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="80" y="349" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">pending</text>

  <line x1="135" y1="344" x2="158" y2="344" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="158,344 151,339 151,349" fill="#a78bfa"/>

  <rect x="158" y="325" width="130" height="38" rx="6" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="223" y="349" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">in_progress</text>

  <line x1="288" y1="344" x2="311" y2="344" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="311,344 304,339 304,349" fill="#60a5fa"/>

  <rect x="311" y="325" width="130" height="38" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="376" y="349" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">impl_done</text>

  <line x1="441" y1="344" x2="464" y2="344" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="464,344 457,339 457,349" fill="#fbbf24"/>

  <rect x="464" y="325" width="130" height="38" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
  <text x="529" y="349" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">in_review</text>

  <line x1="594" y1="344" x2="617" y2="344" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="617,344 610,339 610,349" fill="#34d399"/>

  <rect x="617" y="325" width="150" height="38" rx="6" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="692" y="349" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">completed</text>

  <!-- Revision loop -->
  <path d="M 529 363 Q 529 400 376 400 Q 223 400 223 363" fill="none" stroke="#f87171" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="223,363 219,376 229,374" fill="#f87171"/>
  <text x="376" y="418" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f87171">needs_revision → 最大3サイクル</text>

  <!-- Command -->
  <rect x="100" y="440" width="600" height="40" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="400" y="456" text-anchor="middle" font-family="monospace" font-size="12" fill="#c4b5fd">bun run team &lt;session-id&gt; &lt;workspace&gt; [impl-count] [review-count]</text>
  <text x="400" y="472" text-anchor="middle" font-family="monospace" font-size="11" fill="#7c3aed">bun run team:status &lt;session-id&gt; --watch</text>
</svg>
- Team Leader が impl-worker と review-worker を統括
- タスクライフサイクル: pending → in_progress → impl_done → in_review → completed


---

# タスク分割戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">タスク分割戦略 — ウェーブ実行</text>

  <!-- Big Task -->
  <rect x="270" y="55" width="260" height="55" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">大きなタスク (60 スライド)</text>
  <text x="400" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">Team Leader が分割</text>

  <!-- Down arrow -->
  <line x1="400" y1="110" x2="400" y2="140" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="400,140 393,127 407,127" fill="#a78bfa"/>

  <!-- Wave label -->
  <text x="400" y="158" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd">5〜7 ワーカーずつバッチ実行（ウェーブ）</text>

  <!-- Wave 1 -->
  <rect x="30" y="170" width="740" height="2" fill="#7c3aed" opacity="0.5"/>
  <text x="30" y="188" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">Wave 1（同時起動）</text>

  <!-- Wave 1 tasks -->
  <rect x="30" y="195" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="80" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Part 1</text>
  <text x="80" y="230" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">1-10</text>

  <rect x="145" y="195" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="195" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Part 2</text>
  <text x="195" y="230" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">11-20</text>

  <rect x="260" y="195" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="310" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Part 3</text>
  <text x="310" y="230" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">21-30</text>

  <rect x="375" y="195" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="425" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Part 4</text>
  <text x="425" y="230" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">31-40</text>

  <rect x="490" y="195" width="100" height="45" rx="6" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="540" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Part 5</text>
  <text x="540" y="230" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">41-50</text>

  <!-- Wait label -->
  <text x="400" y="265" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">← 全 Wave 1 完了まで待機 →</text>

  <!-- Wave 2 -->
  <rect x="30" y="280" width="740" height="2" fill="#7c3aed" opacity="0.5"/>
  <text x="30" y="298" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">Wave 2（Wave 1 完了後に起動）</text>

  <!-- Wave 2 tasks -->
  <rect x="30" y="305" width="100" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="80" y="325" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">Part 6</text>
  <text x="80" y="340" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">51-60</text>

  <rect x="145" y="305" width="100" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="195" y="325" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">Review 1</text>
  <text x="195" y="340" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">1-30</text>

  <rect x="260" y="305" width="100" height="45" rx="6" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="310" y="325" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">Review 2</text>
  <text x="310" y="340" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">31-60</text>

  <!-- File isolation box -->
  <rect x="50" y="375" width="700" height="65" rx="8" fill="#0f172a" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="400" y="398" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">ファイル隔離の原則</text>
  <text x="400" y="418" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd">各ワーカーに非重複の出力ファイルを割り当てる</text>
  <text x="400" y="435" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">slides-data-partA1.json, partA2.json … — 重複すると Marp CLI がキャッシュ競合で破損</text>
</svg>
- 10件以上のワーカーはウェーブ（5〜7並列）に分けて実行
- ファイル隔離: 各ワーカーに非重複のパートファイルを割り当て


---

# コンテキスト圧縮テクニック

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">コンテキスト圧縮テクニック</text>

  <!-- Context window visualization -->
  <!-- Full context (before) -->
  <text x="200" y="75" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f87171">圧縮前</text>

  <rect x="80" y="85" width="240" height="300" rx="8" fill="#0f172a" stroke="#f87171" stroke-width="2"/>

  <!-- Context blocks - full -->
  <rect x="90" y="95" width="220" height="30" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="200" y="115" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fca5a5">古いチャット履歴 × 80%</text>

  <rect x="90" y="130" width="220" height="25" rx="4" fill="#7f1d1d" opacity="0.8"/>
  <text x="200" y="148" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fca5a5">中間ステップの出力 × 50%</text>

  <rect x="90" y="160" width="220" height="25" rx="4" fill="#7f1d1d" opacity="0.7"/>
  <text x="200" y="178" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fca5a5">冗長なデバッグログ × 40%</text>

  <rect x="90" y="190" width="220" height="25" rx="4" fill="#7f1d1d" opacity="0.6"/>
  <text x="200" y="208" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fca5a5">繰り返しツール呼び出し × 30%</text>

  <rect x="90" y="220" width="220" height="25" rx="4" fill="#14532d" opacity="0.9"/>
  <text x="200" y="238" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">有効なコード変更 ✓</text>

  <rect x="90" y="250" width="220" height="130" rx="4" fill="#1e3a5f" opacity="0.9"/>
  <text x="200" y="275" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在の指示・ファイル内容</text>
  <text x="200" y="295" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在の指示・ファイル内容</text>
  <text x="200" y="315" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在の指示・ファイル内容</text>
  <text x="200" y="335" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在の指示・ファイル内容</text>
  <text x="200" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在の指示・ファイル内容</text>

  <!-- Limit line -->
  <line x1="80" y1="385" x2="320" y2="385" stroke="#f87171" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="200" y="400" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f87171">200K limit ← 超過！</text>

  <!-- Arrow -->
  <line x1="335" y1="235" x2="460" y2="235" stroke="#a78bfa" stroke-width="3"/>
  <polygon points="460,235 450,228 450,242" fill="#a78bfa"/>
  <text x="400" y="225" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">圧縮</text>

  <!-- Compressed context (after) -->
  <text x="600" y="75" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">圧縮後</text>

  <rect x="480" y="85" width="240" height="200" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="2"/>

  <rect x="490" y="95" width="220" height="25" rx="4" fill="#14532d" opacity="0.9"/>
  <text x="600" y="113" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">サマリ: 完了したステップ</text>

  <rect x="490" y="125" width="220" height="25" rx="4" fill="#1e3a5f" opacity="0.9"/>
  <text x="600" y="143" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">有効コード変更のみ保持</text>

  <rect x="490" y="155" width="220" height="25" rx="4" fill="#1e3a5f" opacity="0.9"/>
  <text x="600" y="173" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">現在のファイル内容</text>

  <rect x="490" y="185" width="220" height="25" rx="4" fill="#1e3a5f" opacity="0.9"/>
  <text x="600" y="203" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">次のタスク指示</text>

  <rect x="490" y="215" width="220" height="60" rx="4" fill="#0c4a6e" opacity="0.9"/>
  <text x="600" y="240" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bae6fd">空きコンテキスト</text>
  <text x="600" y="258" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bae6fd">（新しい作業用）</text>

  <!-- Limit line after -->
  <line x1="480" y1="290" x2="720" y2="290" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="600" y="305" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">余裕あり ✓</text>

  <!-- Techniques -->
  <rect x="50" y="430" width="700" height="50" rx="8" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="400" y="450" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c4b5fd">圧縮テクニック</text>
  <text x="400" y="470" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">/compact コマンド ・ 新セッション開始 ・ MEMORY.md に重要事項を書き出す ・ サブエージェントに委譲</text>
</svg>
- /compact コマンドで古い履歴を要約に置換
- 重要事項は MEMORY.md に書き出して新セッションで継続


---

# メモリ管理パターン

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">メモリ管理パターン — MEMORY.md 活用</text>

  <!-- Central MEMORY.md node -->
  <rect x="290" y="180" width="220" height="70" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="210" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#a78bfa">MEMORY.md</text>
  <text x="400" y="232" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">長期記憶の永続化ストア</text>

  <!-- Session A -->
  <rect x="60" y="60" width="175" height="65" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="148" y="83" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Session A</text>
  <text x="148" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">決定事項を書き込む</text>
  <text x="148" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">アーキテクチャ選択を記録</text>

  <!-- Arrow A → MEMORY.md -->
  <line x1="235" y1="115" x2="305" y2="190" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="305,190 296,180 309,177" fill="#60a5fa"/>
  <text x="255" y="155" font-family="sans-serif" font-size="10" fill="#60a5fa">Write</text>

  <!-- Session B -->
  <rect x="565" y="60" width="175" height="65" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="652" y="83" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Session B</text>
  <text x="652" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">前回の決定を読み込む</text>
  <text x="652" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">コンテキスト継続</text>

  <!-- Arrow MEMORY.md → B -->
  <line x1="510" y1="195" x2="575" y2="125" stroke="#34d399" stroke-width="2"/>
  <polygon points="575,125 564,125 569,113" fill="#34d399"/>
  <text x="540" y="155" font-family="sans-serif" font-size="10" fill="#34d399">Read</text>

  <!-- Session C (current) -->
  <rect x="60" y="350" width="175" height="65" rx="8" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="148" y="373" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Session C</text>
  <text x="148" y="390" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">進捗・課題を更新</text>
  <text x="148" y="407" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">TODO リスト管理</text>

  <!-- Arrow C → MEMORY.md -->
  <line x1="235" y1="385" x2="305" y2="245" stroke="#34d399" stroke-width="2"/>
  <polygon points="305,245 296,255 309,258" fill="#34d399"/>
  <text x="255" y="310" font-family="sans-serif" font-size="10" fill="#34d399">Update</text>

  <!-- Sub-agent -->
  <rect x="565" y="350" width="175" height="65" rx="8" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="652" y="373" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Sub-Agent</text>
  <text x="652" y="390" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">タスク完了後に結果記録</text>
  <text x="652" y="407" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">エラーと解決策を記録</text>

  <!-- Arrow Sub-agent → MEMORY.md -->
  <line x1="565" y1="385" x2="495" y2="245" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="495,245 484,250 490,238" fill="#a78bfa"/>
  <text x="530" y="310" font-family="sans-serif" font-size="10" fill="#a78bfa">Append</text>

  <!-- MEMORY.md content labels -->
  <rect x="305" y="275" width="190" height="80" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="400" y="295" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#c4b5fd">MEMORY.md の内容</text>
  <text x="315" y="312" font-family="sans-serif" font-size="10" fill="#7c3aed">• アーキテクチャ決定</text>
  <text x="315" y="327" font-family="sans-serif" font-size="10" fill="#7c3aed">• 未解決のTODO</text>
  <text x="315" y="342" font-family="sans-serif" font-size="10" fill="#7c3aed">• エラーパターンと解決策</text>

  <!-- Rule box -->
  <rect x="50" y="440" width="700" height="40" rx="6" fill="#0f172a" stroke="#4c1d95" stroke-width="1"/>
  <text x="400" y="460" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd">セッション終了前: /save → MEMORY.md に重要事項を書き出す</text>
  <text x="400" y="476" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">セッション開始時: MEMORY.md を Read してコンテキスト復元</text>
</svg>
- MEMORY.md がセッション間の長期記憶の永続化ストアとして機能
- アーキテクチャ決定・TODO・エラーパターンを蓄積して引き継ぐ


---

# パフォーマンス最適化

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">パフォーマンス最適化 — 速度比較</text>

  <!-- Chart area -->
  <rect x="60" y="55" width="680" height="300" rx="8" fill="#0f172a" stroke="#4c1d95" stroke-width="1"/>

  <!-- Y axis label -->
  <text x="30" y="210" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd" transform="rotate(-90 30 210)">所要時間（分）</text>

  <!-- X axis -->
  <line x1="100" y1="320" x2="720" y2="320" stroke="#4c1d95" stroke-width="1.5"/>
  <!-- Y axis -->
  <line x1="100" y1="65" x2="100" y2="320" stroke="#4c1d95" stroke-width="1.5"/>

  <!-- Y-axis ticks -->
  <text x="90" y="320" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">0</text>
  <text x="90" y="270" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">10</text>
  <text x="90" y="220" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">20</text>
  <text x="90" y="170" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">30</text>
  <text x="90" y="120" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">40</text>
  <text x="90" y="75" text-anchor="end" font-family="sans-serif" font-size="10" fill="#6b7280">50</text>

  <!-- Grid lines -->
  <line x1="100" y1="270" x2="720" y2="270" stroke="#1e293b" stroke-width="1"/>
  <line x1="100" y1="220" x2="720" y2="220" stroke="#1e293b" stroke-width="1"/>
  <line x1="100" y1="170" x2="720" y2="170" stroke="#1e293b" stroke-width="1"/>
  <line x1="100" y1="120" x2="720" y2="120" stroke="#1e293b" stroke-width="1"/>

  <!-- Bar Group 1: 10 slides -->
  <text x="175" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">10枚</text>
  <!-- Sequential bar -->
  <rect x="135" y="250" width="35" height="70" fill="#f87171" rx="3"/>
  <text x="152" y="245" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171">14m</text>
  <!-- Parallel bar -->
  <rect x="178" y="290" width="35" height="30" fill="#34d399" rx="3"/>
  <text x="195" y="285" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#34d399">6m</text>

  <!-- Bar Group 2: 30 slides -->
  <text x="325" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">30枚</text>
  <!-- Sequential bar -->
  <rect x="285" y="155" width="35" height="165" fill="#f87171" rx="3"/>
  <text x="302" y="150" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171">33m</text>
  <!-- Parallel bar -->
  <rect x="328" y="255" width="35" height="65" fill="#34d399" rx="3"/>
  <text x="345" y="250" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#34d399">13m</text>

  <!-- Bar Group 3: 60 slides -->
  <text x="478" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">60枚</text>
  <!-- Sequential bar -->
  <rect x="435" y="70" width="35" height="250" fill="#f87171" rx="3"/>
  <text x="452" y="65" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171">50m</text>
  <!-- Parallel bar -->
  <rect x="480" y="210" width="35" height="110" fill="#34d399" rx="3"/>
  <text x="497" y="205" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#34d399">22m</text>

  <!-- Bar Group 4: 100 slides -->
  <text x="628" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">100枚</text>
  <!-- Sequential (clipped at chart top) -->
  <rect x="585" y="68" width="35" height="252" fill="#f87171" rx="3" opacity="0.6"/>
  <text x="602" y="63" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171">80m+</text>
  <!-- Parallel bar -->
  <rect x="630" y="185" width="35" height="135" fill="#34d399" rx="3"/>
  <text x="647" y="180" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#34d399">27m</text>

  <!-- Legend -->
  <rect x="500" y="68" width="14" height="14" fill="#f87171" rx="2"/>
  <text x="520" y="80" font-family="sans-serif" font-size="11" fill="#f87171">逐次実行</text>
  <rect x="580" y="68" width="14" height="14" fill="#34d399" rx="2"/>
  <text x="600" y="80" font-family="sans-serif" font-size="11" fill="#34d399">並列実行</text>

  <!-- Annotations -->
  <rect x="60" y="375" width="680" height="90" rx="8" fill="#0f172a"/>

  <text x="400" y="398" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">最適化のポイント</text>

  <!-- 3 columns -->
  <text x="180" y="420" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">並列化</text>
  <text x="180" y="438" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">Wave実行 5〜7並列</text>
  <text x="180" y="453" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bfdbfe">~2.5x 高速化</text>

  <text x="400" y="420" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">レイテンシ削減</text>
  <text x="400" y="438" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">不要なコンテキストを除去</text>
  <text x="400" y="453" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ddd6fe">応答速度向上</text>

  <text x="620" y="420" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">キャッシュ活用</text>
  <text x="620" y="438" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">Prompt Cache で再利用</text>
  <text x="620" y="453" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">トークンコスト削減</text>
</svg>
- 並列実行で理論上 ~2.5x 高速化、Prompt Cache でトークン節約
- コンテキストの軽量化が応答速度に直結


---

# コスト管理・トークン最適化

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">コスト管理・トークン最適化ダッシュボード</text>

  <!-- Dashboard frame -->
  <rect x="30" y="55" width="740" height="400" rx="10" fill="#0f172a" stroke="#4c1d95" stroke-width="1.5"/>

  <!-- Metric cards row -->
  <!-- Card 1: Total tokens -->
  <rect x="50" y="75" width="155" height="80" rx="8" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="128" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">総トークン消費</text>
  <text x="128" y="130" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#a78bfa">2.4M</text>
  <text x="128" y="148" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7c3aed">今月累計</text>

  <!-- Card 2: Cost -->
  <rect x="220" y="75" width="155" height="80" rx="8" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="298" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">推定コスト</text>
  <text x="298" y="130" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#34d399">$4.80</text>
  <text x="298" y="148" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">↓ 35% vs 先月</text>

  <!-- Card 3: Cache hit -->
  <rect x="390" y="75" width="155" height="80" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="468" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">キャッシュヒット率</text>
  <text x="468" y="130" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#60a5fa">68%</text>
  <text x="468" y="148" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#60a5fa">節約: 0.82M tokens</text>

  <!-- Card 4: Avg per task -->
  <rect x="560" y="75" width="190" height="80" rx="8" fill="#431407" stroke="#fb923c" stroke-width="1.5"/>
  <text x="655" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fdba74">タスク平均消費</text>
  <text x="655" y="130" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#fb923c">45K</text>
  <text x="655" y="148" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fb923c">tokens / task</text>

  <!-- Token breakdown donut-style pie area (simplified as bars) -->
  <text x="180" y="185" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">消費内訳</text>

  <!-- Stacked bar for breakdown -->
  <rect x="50" y="195" width="260" height="30" rx="4" fill="#a78bfa"/>
  <rect x="310" y="195" width="130" height="30" rx="0" fill="#60a5fa"/>
  <rect x="440" y="195" width="90" height="30" rx="0" fill="#34d399"/>
  <rect x="530" y="195" width="70" height="30" rx="0" fill="#fbbf24"/>
  <rect x="600" y="195" width="145" height="30" rx="4" fill="#f87171"/>

  <text x="180" y="215" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#1a1a2e" font-weight="bold">コード生成 35%</text>
  <text x="375" y="215" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e">SVG 18%</text>
  <text x="485" y="215" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e">分析 12%</text>
  <text x="565" y="215" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e">修正 9%</text>
  <text x="672" y="215" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e">その他 26%</text>

  <!-- Optimization strategies -->
  <text x="400" y="260" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">削減戦略</text>

  <!-- Strategy cards -->
  <rect x="50" y="272" width="330" height="80" rx="8" fill="#0c1a2e" stroke="#60a5fa" stroke-width="1"/>
  <text x="215" y="294" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">プロンプト最適化</text>
  <text x="65" y="312" font-family="sans-serif" font-size="11" fill="#93c5fd">• 冗長な説明を削除 → 短く明確に</text>
  <text x="65" y="328" font-family="sans-serif" font-size="11" fill="#93c5fd">• CLAUDE.md に共通指示を集約</text>
  <text x="65" y="344" font-family="sans-serif" font-size="11" fill="#93c5fd">• 出力フォーマットを明示して無駄削減</text>

  <rect x="410" y="272" width="330" height="80" rx="8" fill="#0c1a2e" stroke="#34d399" stroke-width="1"/>
  <text x="575" y="294" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">アーキテクチャ最適化</text>
  <text x="425" y="312" font-family="sans-serif" font-size="11" fill="#6ee7b7">• 大タスクをサブエージェントに委譲</text>
  <text x="425" y="328" font-family="sans-serif" font-size="11" fill="#6ee7b7">• Prompt Cache でシステムプロンプト再利用</text>
  <text x="425" y="344" font-family="sans-serif" font-size="11" fill="#6ee7b7">• 不要な Read/Write ループを排除</text>

  <!-- Bottom row -->
  <rect x="50" y="370" width="700" height="55" rx="8" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1"/>
  <text x="400" y="392" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">コスト計算式</text>
  <text x="400" y="412" text-anchor="middle" font-family="monospace" font-size="12" fill="#c4b5fd">コスト = (input tokens × $3/MTok) + (output tokens × $15/MTok)</text>
  <text x="400" y="430" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7c3aed">Prompt Cache 読み取り: $0.30/MTok（通常の10%） — キャッシュ活用で大幅削減可能</text>
</svg>
- Prompt Cache ヒット率を上げてトークンコストを最大70%削減
- プロンプトの短縮化・共通指示の CLAUDE.md 集約が効果的


---

<!-- _class: lead -->
# 実務適用

- 現場のプロジェクトでVibe Codingを活かす実践パターン


---

# プロジェクト立ち上げフロー

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">AI駆動プロジェクト立ち上げフロー</text>

  <!-- Step boxes with connecting arrows -->
  <!-- Step 1 -->
  <rect x="50" y="65" width="160" height="75" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
  <text x="130" y="90" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">1. 要件整理</text>
  <text x="130" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">CLAUDE.md 作成</text>
  <text x="130" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">目標・制約の明文化</text>

  <!-- Arrow 1→2 -->
  <line x1="210" y1="103" x2="243" y2="103" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="243,103 235,97 235,109" fill="#a78bfa"/>

  <!-- Step 2 -->
  <rect x="243" y="65" width="160" height="75" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="323" y="90" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">2. 環境構築</text>
  <text x="323" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">git init + CI/CD</text>
  <text x="323" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">依存関係インストール</text>

  <!-- Arrow 2→3 -->
  <line x1="403" y1="103" x2="436" y2="103" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="436,103 428,97 428,109" fill="#60a5fa"/>

  <!-- Step 3 -->
  <rect x="436" y="65" width="160" height="75" rx="10" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="516" y="90" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">3. 骨格実装</text>
  <text x="516" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">AIで雛形生成</text>
  <text x="516" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">スキーマ・ルート定義</text>

  <!-- Arrow 3→4 -->
  <line x1="596" y1="103" x2="629" y2="103" stroke="#34d399" stroke-width="2"/>
  <polygon points="629,103 621,97 621,109" fill="#34d399"/>

  <!-- Step 4 -->
  <rect x="629" y="65" width="130" height="75" rx="10" fill="#431407" stroke="#fb923c" stroke-width="2"/>
  <text x="694" y="90" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fb923c">4. テスト</text>
  <text x="694" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fdba74">AIがテスト生成</text>
  <text x="694" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fdba74">カバレッジ確認</text>

  <!-- Row 2 -->
  <!-- Step 5 -->
  <rect x="629" y="185" width="130" height="75" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
  <text x="694" y="210" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#818cf8">5. レビュー</text>
  <text x="694" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a5b4fc">AIコードレビュー</text>
  <text x="694" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a5b4fc">セキュリティ確認</text>

  <!-- Arrow 4→5 (down) -->
  <line x1="694" y1="140" x2="694" y2="185" stroke="#818cf8" stroke-width="2"/>
  <polygon points="694,185 688,177 700,177" fill="#818cf8"/>

  <!-- Arrow 5→6 (left) -->
  <line x1="629" y1="222" x2="596" y2="222" stroke="#818cf8" stroke-width="2"/>
  <polygon points="596,222 604,216 604,228" fill="#818cf8"/>

  <!-- Step 6 -->
  <rect x="436" y="185" width="160" height="75" rx="10" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="516" y="210" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">6. ドキュメント</text>
  <text x="516" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">README 自動生成</text>
  <text x="516" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">API仕様書生成</text>

  <!-- Arrow 6→7 -->
  <line x1="436" y1="222" x2="403" y2="222" stroke="#34d399" stroke-width="2"/>
  <polygon points="403,222 411,216 411,228" fill="#34d399"/>

  <!-- Step 7 -->
  <rect x="243" y="185" width="160" height="75" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="323" y="210" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">7. デプロイ</text>
  <text x="323" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">CI/CD 実行</text>
  <text x="323" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">本番環境への反映</text>

  <!-- Arrow 7→8 -->
  <line x1="243" y1="222" x2="210" y2="222" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="210,222 218,216 218,228" fill="#60a5fa"/>

  <!-- Step 8 -->
  <rect x="50" y="185" width="160" height="75" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
  <text x="130" y="210" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">8. モニタリング</text>
  <text x="130" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">AIでログ分析</text>
  <text x="130" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">改善サイクル継続</text>

  <!-- Cycle arrow back to step 1 -->
  <path d="M 130 260 Q 130 310 400 310 Q 670 310 694 260" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="694,260 688,272 700,272" fill="#a78bfa"/>
  <text x="400" y="330" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">継続的改善ループ</text>

  <!-- Time estimate -->
  <rect x="50" y="350" width="700" height="100" rx="8" fill="#0f172a" stroke="#4c1d95" stroke-width="1"/>
  <text x="400" y="373" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">AI駆動 vs. 従来開発 — 時間比較</text>
  <!-- Time bar traditional -->
  <text x="60" y="400" font-family="sans-serif" font-size="11" fill="#f87171">従来:</text>
  <rect x="110" y="388" width="540" height="16" rx="3" fill="#7f1d1d"/>
  <text x="660" y="400" font-family="sans-serif" font-size="11" fill="#f87171">2〜4 週間</text>
  <!-- Time bar AI -->
  <text x="60" y="425" font-family="sans-serif" font-size="11" fill="#34d399">AI駆動:</text>
  <rect x="110" y="413" width="180" height="16" rx="3" fill="#14532d"/>
  <text x="300" y="425" font-family="sans-serif" font-size="11" fill="#34d399">3〜5 日（〜6x 高速）</text>
</svg>
- AI駆動なら従来2〜4週間のセットアップが3〜5日に短縮
- CLAUDE.md 作成 → 骨格実装 → テスト → デプロイ → 継続改善


---

# 既存コードベースへの適用

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">既存コードベースへのAI導入ロードマップ</text>

  <!-- Timeline line -->
  <line x1="60" y1="250" x2="740" y2="250" stroke="#4c1d95" stroke-width="3"/>

  <!-- Phase 1: Week 1-2 -->
  <line x1="110" y1="250" x2="110" y2="185" stroke="#a78bfa" stroke-width="2"/>
  <circle cx="110" cy="250" r="8" fill="#a78bfa"/>
  <rect x="35" y="120" width="155" height="65" rx="8" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="113" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#a78bfa">Week 1-2</text>
  <text x="113" y="160" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c4b5fd">現状調査・CLAUDE.md 作成</text>
  <text x="113" y="175" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c4b5fd">コードベース把握</text>

  <!-- Phase 2: Week 3-4 -->
  <line x1="270" y1="250" x2="270" y2="315" stroke="#60a5fa" stroke-width="2"/>
  <circle cx="270" cy="250" r="8" fill="#60a5fa"/>
  <rect x="192" y="315" width="155" height="65" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="270" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#60a5fa">Week 3-4</text>
  <text x="270" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">テスト自動生成から開始</text>
  <text x="270" y="370" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#93c5fd">カバレッジ向上</text>

  <!-- Phase 3: Month 2 -->
  <line x1="430" y1="250" x2="430" y2="185" stroke="#34d399" stroke-width="2"/>
  <circle cx="430" cy="250" r="8" fill="#34d399"/>
  <rect x="352" y="120" width="155" height="65" rx="8" fill="#14532d" stroke="#34d399" stroke-width="1.5"/>
  <text x="430" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">Month 2</text>
  <text x="430" y="160" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">コードレビュー自動化</text>
  <text x="430" y="175" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6ee7b7">リファクタリング支援</text>

  <!-- Phase 4: Month 3 -->
  <line x1="590" y1="250" x2="590" y2="315" stroke="#fbbf24" stroke-width="2"/>
  <circle cx="590" cy="250" r="8" fill="#fbbf24"/>
  <rect x="512" y="315" width="155" height="65" rx="8" fill="#451a03" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="590" y="338" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fbbf24">Month 3</text>
  <text x="590" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fde68a">新機能開発でVibe Coding</text>
  <text x="590" y="370" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fde68a">フル活用フェーズへ</text>

  <!-- Phase 5: Ongoing -->
  <line x1="720" y1="250" x2="720" y2="185" stroke="#818cf8" stroke-width="2"/>
  <circle cx="720" cy="250" r="8" fill="#818cf8"/>
  <rect x="645" y="120" width="120" height="65" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="705" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#818cf8">継続</text>
  <text x="705" y="160" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a5b4fc">チーム展開</text>
  <text x="705" y="175" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a5b4fc">プロセス最適化</text>

  <!-- Risk / tip boxes -->
  <rect x="50" y="420" width="330" height="60" rx="8" fill="#0f172a" stroke="#f87171" stroke-width="1"/>
  <text x="215" y="442" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f87171">注意点</text>
  <text x="65" y="460" font-family="sans-serif" font-size="10" fill="#fca5a5">• 既存テストを先に充実させてからAI活用開始</text>
  <text x="65" y="474" font-family="sans-serif" font-size="10" fill="#fca5a5">• AIの出力は必ず人間がレビュー・承認</text>

  <rect x="420" y="420" width="330" height="60" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="1"/>
  <text x="585" y="442" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">成功のポイント</text>
  <text x="435" y="460" font-family="sans-serif" font-size="10" fill="#6ee7b7">• 小さなタスクから始めて信頼を積み上げる</text>
  <text x="435" y="474" font-family="sans-serif" font-size="10" fill="#6ee7b7">• CLAUDE.md にプロジェクト固有の知識を蓄積</text>
</svg>
- テスト自動生成から始め、徐々にAI活用範囲を拡大するロードマップ
- 既存テストを充実させてからAI活用を開始するのが成功の鍵


---

# ドキュメント自動生成

- README・API仕様書・変更履歴をAIが自動生成
- コードと常に同期した最新ドキュメントを維持


---

# ドキュメント自動生成（コード例）

```bash
# README 自動生成
claude "このプロジェクトの README.md を生成してください。
  - 概要・インストール・使い方・API一覧を含める
  - src/ を読んで正確な内容を記述すること"

# API仕様書生成
claude "src/api/ のルートハンドラから
  OpenAPI 3.0 仕様書を生成してください"

# 変更履歴更新
claude "git log --oneline -20 をもとに
  CHANGELOG.md を更新してください"
```


---

# コード品質向上サイクル

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">コード品質向上サイクル</text>

  <!-- Center circle -->
  <circle cx="400" cy="245" r="60" fill="#1e1b4b" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="238" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">品質</text>
  <text x="400" y="257" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">サイクル</text>

  <!-- Step 1: Lint (top) -->
  <rect x="310" y="55" width="180" height="70" rx="10" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">Lint</text>
  <text x="400" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">Biome / ESLint 自動実行</text>
  <text x="400" y="116" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c4b5fd">format + check</text>

  <!-- Arrow Lint → Review (clockwise, right) -->
  <line x1="490" y1="95" x2="570" y2="180" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="570,180 560,172 573,168" fill="#a78bfa"/>

  <!-- Step 2: Review (right) -->
  <rect x="575" y="180" width="180" height="70" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="665" y="207" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">Review</text>
  <text x="665" y="225" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93c5fd">AI コードレビュー</text>
  <text x="665" y="241" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bfdbfe">バグ・脆弱性検出</text>

  <!-- Arrow Review → Refactor (clockwise, bottom-right) -->
  <line x1="595" y1="250" x2="530" y2="330" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="530,330 521,320 534,316" fill="#60a5fa"/>

  <!-- Step 3: Refactor (bottom) -->
  <rect x="310" y="335" width="180" height="70" rx="10" fill="#14532d" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="362" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">Refactor</text>
  <text x="400" y="380" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6ee7b7">AIリファクタリング提案</text>
  <text x="400" y="396" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">可読性・保守性向上</text>

  <!-- Arrow Refactor → Test (clockwise, left) -->
  <line x1="310" y1="355" x2="238" y2="295" stroke="#34d399" stroke-width="2"/>
  <polygon points="238,295 229,305 240,309" fill="#34d399"/>

  <!-- Step 4: Test (left) -->
  <rect x="45" y="180" width="180" height="70" rx="10" fill="#431407" stroke="#fb923c" stroke-width="2"/>
  <text x="135" y="207" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#fb923c">Test</text>
  <text x="135" y="225" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fdba74">AIがテストケース生成</text>
  <text x="135" y="241" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fde68a">回帰テスト自動化</text>

  <!-- Arrow Test → Lint (clockwise, top-left) -->
  <line x1="205" y1="180" x2="315" y2="115" stroke="#fb923c" stroke-width="2"/>
  <polygon points="315,115 305,120 310,107" fill="#fb923c"/>

  <!-- Annotations -->
  <text x="400" y="460" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#c4b5fd">各ステップでAIが自動化 — 人間は承認・方向性の決定に集中</text>
  <text x="400" y="480" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7c3aed">bun run check → bun run fix → bun run test → PR作成</text>

  <!-- Quality improvement arrows at center -->
  <line x1="400" y1="185" x2="400" y2="200" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="400,200 394,192 406,192" fill="#a78bfa"/>
</svg>
- Lint → Review → Refactor → Test の継続サイクルをAIが加速
- 人間は方向性の決定と最終承認に集中できる


---

# 技術的負債解消戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">技術的負債 分類マトリクス × AI解消アプローチ</text>

  <!-- Axis labels -->
  <text x="400" y="72" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa">← 解消コスト（低） ────────────────── 解消コスト（高） →</text>
  <text x="16" y="300" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#60a5fa" transform="rotate(-90,16,300)">← 影響範囲（小）  ──  影響範囲（大） →</text>

  <!-- Grid -->
  <rect x="60" y="85" width="330" height="185" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="4"/>
  <rect x="410" y="85" width="330" height="185" fill="#16213e" stroke="#60a5fa" stroke-width="1.5" rx="4"/>
  <rect x="60" y="280" width="330" height="185" fill="#16213e" stroke="#34d399" stroke-width="1.5" rx="4"/>
  <rect x="410" y="280" width="330" height="185" fill="#16213e" stroke="#f472b6" stroke-width="1.5" rx="4"/>

  <!-- Quadrant labels -->
  <text x="225" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">低コスト・小範囲</text>
  <text x="575" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">高コスト・小範囲</text>
  <text x="225" y="303" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">低コスト・大範囲</text>
  <text x="575" y="303" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">高コスト・大範囲</text>

  <!-- Q1 content -->
  <text x="100" y="135" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 命名規則の揺れ</text>
  <text x="100" y="155" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 重複コード</text>
  <text x="100" y="175" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 小関数の未分割</text>
  <rect x="100" y="188" width="240" height="26" fill="#a78bfa" rx="5" style="filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.4))"/>
  <text x="220" y="205" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1a1a2e">AI自動リファクタ → 即解消</text>

  <!-- Q2 content -->
  <text x="450" y="135" font-family="sans-serif" font-size="12" fill="#e2e8f0">• レガシーAPI依存</text>
  <text x="450" y="155" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 型なしコード</text>
  <text x="450" y="175" font-family="sans-serif" font-size="12" fill="#e2e8f0">• テスト未整備</text>
  <rect x="450" y="188" width="240" height="26" fill="#60a5fa" rx="5" style="filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.4))"/>
  <text x="570" y="205" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1a1a2e">AIテスト生成 → 段階解消</text>

  <!-- Q3 content -->
  <text x="100" y="330" font-family="sans-serif" font-size="12" fill="#e2e8f0">• モジュール結合度高</text>
  <text x="100" y="350" font-family="sans-serif" font-size="12" fill="#e2e8f0">• ドキュメント欠如</text>
  <text x="100" y="370" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 設計パターン違反</text>
  <rect x="100" y="383" width="240" height="26" fill="#34d399" rx="5" style="filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.4))"/>
  <text x="220" y="400" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1a1a2e">AI設計提案 → 計画的改善</text>

  <!-- Q4 content -->
  <text x="450" y="330" font-family="sans-serif" font-size="12" fill="#e2e8f0">• アーキテクチャ刷新</text>
  <text x="450" y="350" font-family="sans-serif" font-size="12" fill="#e2e8f0">• DB設計の根本変更</text>
  <text x="450" y="370" font-family="sans-serif" font-size="12" fill="#e2e8f0">• フレームワーク移行</text>
  <rect x="450" y="383" width="240" height="26" fill="#f472b6" rx="5" style="filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.4))"/>
  <text x="570" y="400" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1a1a2e">AI移行計画 → 長期ロードマップ</text>

  <!-- Bottom note -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">AIは全象限の負債解消を加速 — 優先度順に自動化可能な項目から着手</text>
</svg>


---

# セキュリティスキャン自動化

- AIツールと連携したセキュリティスキャンを CI/CD に組み込む
- 定期スキャンと PR トリガーの両方を設定する


---

# セキュリティスキャン自動化（コード例）

```bash
# 依存関係脆弱性スキャン（npm audit + AI分析）
npm audit --json | claude analyze --focus security

# SAST（静的解析）
npx semgrep --config auto src/ --json | \
  claude summarize --severity high

# シークレット漏洩検出
git diff HEAD | gitleaks detect --pipe

# コンテナイメージスキャン
trivy image myapp:latest --format json | \
  claude fix-vulnerabilities --auto-pr

# CI設定例 (.github/workflows/security.yml)
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high
      - uses: returntocorp/semgrep-action@v1
```


---

# パフォーマンステスト自動化

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">AI支援 パフォーマンステストパイプライン</text>

  <!-- Pipeline stages -->
  <!-- Stage 1 -->
  <rect x="30" y="70" width="130" height="80" fill="#16213e" stroke="#60a5fa" stroke-width="2" rx="8"/>
  <text x="95" y="100" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">① 要件定義</text>
  <text x="95" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI がシナリオ</text>
  <text x="95" y="133" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">自動生成</text>

  <!-- Arrow 1→2 -->
  <line x1="160" y1="110" x2="195" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="195,105 205,110 195,115" fill="#60a5fa"/>

  <!-- Stage 2 -->
  <rect x="205" y="70" width="130" height="80" fill="#16213e" stroke="#a78bfa" stroke-width="2" rx="8"/>
  <text x="270" y="100" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">② スクリプト生成</text>
  <text x="270" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">k6 / Locust</text>
  <text x="270" y="133" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">コード自動生成</text>

  <!-- Arrow 2→3 -->
  <line x1="335" y1="110" x2="370" y2="110" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="370,105 380,110 370,115" fill="#a78bfa"/>

  <!-- Stage 3 -->
  <rect x="380" y="70" width="130" height="80" fill="#16213e" stroke="#34d399" stroke-width="2" rx="8"/>
  <text x="445" y="100" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">③ 実行・計測</text>
  <text x="445" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">CI/CD で</text>
  <text x="445" y="133" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">自動実行</text>

  <!-- Arrow 3→4 -->
  <line x1="510" y1="110" x2="545" y2="110" stroke="#34d399" stroke-width="2"/>
  <polygon points="545,105 555,110 545,115" fill="#34d399"/>

  <!-- Stage 4 -->
  <rect x="555" y="70" width="130" height="80" fill="#16213e" stroke="#f472b6" stroke-width="2" rx="8"/>
  <text x="620" y="100" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">④ AI分析</text>
  <text x="620" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">ボトルネック</text>
  <text x="620" y="133" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">自動特定</text>

  <!-- Feedback arrow from 4 back to 2 -->
  <path d="M 620 150 L 620 175 L 270 175 L 270 152" fill="none" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="265,152 270,142 275,152" fill="#f472b6"/>
  <text x="445" y="192" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f472b6">フィードバックループ（AI最適化提案）</text>

  <!-- Metrics section -->
  <text x="400" y="230" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">計測メトリクス</text>

  <!-- Metric cards -->
  <rect x="40" y="250" width="160" height="70" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" rx="6"/>
  <text x="120" y="275" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">レスポンスタイム</text>
  <text x="120" y="295" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">p50/p95/p99</text>
  <text x="120" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">ms 単位で可視化</text>

  <rect x="220" y="250" width="160" height="70" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5" rx="6"/>
  <text x="300" y="275" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">スループット</text>
  <text x="300" y="295" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">RPS</text>
  <text x="300" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">秒間リクエスト数</text>

  <rect x="400" y="250" width="160" height="70" fill="#0f172a" stroke="#34d399" stroke-width="1.5" rx="6"/>
  <text x="480" y="275" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">エラー率</text>
  <text x="480" y="295" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">%</text>
  <text x="480" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">閾値超過で自動通知</text>

  <rect x="580" y="250" width="160" height="70" fill="#0f172a" stroke="#f472b6" stroke-width="1.5" rx="6"/>
  <text x="660" y="275" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">リソース使用率</text>
  <text x="660" y="295" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">CPU/Mem</text>
  <text x="660" y="312" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">AI が異常を検知</text>

  <!-- AI insight box -->
  <rect x="80" y="345" width="640" height="90" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="8"/>
  <text x="400" y="370" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">AI分析の強み</text>
  <text x="190" y="393" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 異常パターン自動検出</text>
  <text x="400" y="393" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 回帰を瞬時に比較</text>
  <text x="610" y="393" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 改善策を提案</text>
  <text x="190" y="415" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• 最適負荷シナリオ提案</text>
  <text x="400" y="415" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• SLO違反を予測</text>
  <text x="610" y="415" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">• レポート自動生成</text>

  <!-- Footer -->
  <text x="400" y="480" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">継続的パフォーマンス監視 — デグレを本番前に検知</text>
</svg>


---

<!-- _class: lead -->
# 組織・文化

- AI駆動開発を組織に根付かせるための体制・文化づくり
- 技術だけでなく、人・プロセス・マインドセットが成功の鍵


---

# AI駆動開発チームの組織設計

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">AI駆動開発チーム 構成・役割分担</text>

  <!-- Central AI Core -->
  <ellipse cx="400" cy="250" rx="72" ry="52" fill="#16213e" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="244" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">AI Core</text>
  <text x="400" y="262" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">GitHub Copilot</text>
  <text x="400" y="277" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">Claude / GPT</text>

  <!-- Role: Product Manager -->
  <rect x="20" y="60" width="155" height="80" fill="#16213e" stroke="#60a5fa" stroke-width="2" rx="8"/>
  <text x="97" y="84" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">プロダクトマネージャー</text>
  <text x="97" y="103" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">要件定義 + AI仕様生成</text>
  <text x="97" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">優先度決定</text>
  <!-- Arrow PM → Center -->
  <line x1="175" y1="100" x2="328" y2="220" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="322,218 332,215 328,226" fill="#60a5fa"/>

  <!-- Role: AI Engineer -->
  <rect x="20" y="200" width="155" height="80" fill="#16213e" stroke="#34d399" stroke-width="2" rx="8"/>
  <text x="97" y="225" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">AIエンジニア</text>
  <text x="97" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">プロンプト設計</text>
  <text x="97" y="261" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIツール統合・評価</text>
  <!-- Arrow AI Eng → Center -->
  <line x1="175" y1="240" x2="328" y2="245" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="322,240 332,245 322,250" fill="#34d399"/>

  <!-- Role: Developer -->
  <rect x="20" y="340" width="155" height="80" fill="#16213e" stroke="#f472b6" stroke-width="2" rx="8"/>
  <text x="97" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">ソフトウェア開発者</text>
  <text x="97" y="384" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI協働コーディング</text>
  <text x="97" y="401" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">レビュー・品質担保</text>
  <!-- Arrow Dev → Center -->
  <line x1="175" y1="380" x2="328" y2="275" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="322,272 332,270 328,281" fill="#f472b6"/>

  <!-- Role: QA -->
  <rect x="625" y="60" width="155" height="80" fill="#16213e" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="702" y="84" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">QAエンジニア</text>
  <text x="702" y="103" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIテスト設計</text>
  <text x="702" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">自動化戦略</text>
  <!-- Arrow QA → Center -->
  <line x1="625" y1="100" x2="472" y2="220" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="468,218 472,227 478,217" fill="#fbbf24"/>

  <!-- Role: Architect -->
  <rect x="625" y="200" width="155" height="80" fill="#16213e" stroke="#a78bfa" stroke-width="2" rx="8"/>
  <text x="702" y="225" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">アーキテクト</text>
  <text x="702" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI活用設計原則</text>
  <text x="702" y="261" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">技術ガバナンス</text>
  <!-- Arrow Arch → Center -->
  <line x1="625" y1="240" x2="472" y2="245" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="478,240 468,245 478,250" fill="#a78bfa"/>

  <!-- Role: Ops -->
  <rect x="625" y="340" width="155" height="80" fill="#16213e" stroke="#38bdf8" stroke-width="2" rx="8"/>
  <text x="702" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#38bdf8">DevOpsエンジニア</text>
  <text x="702" y="384" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIパイプライン運用</text>
  <text x="702" y="401" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">インフラ自動化</text>
  <!-- Arrow Ops → Center -->
  <line x1="625" y1="380" x2="472" y2="275" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="468,272 472,281 478,271" fill="#38bdf8"/>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">全役割がAI Coreと連携 — 人間はクリエイティビティと判断に集中</text>
</svg>


---

# スキルアップ戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">エンジニア AIスキル習得ロードマップ</text>

  <!-- Timeline line -->
  <line x1="60" y1="100" x2="740" y2="100" stroke="#a78bfa" stroke-width="2"/>

  <!-- Phase markers -->
  <!-- Phase 1 -->
  <circle cx="130" cy="100" r="12" fill="#60a5fa" stroke="#1a1a2e" stroke-width="2"/>
  <text x="130" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">1</text>
  <text x="130" y="78" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">Month 1-2</text>
  <text x="130" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">基礎習得</text>

  <!-- Phase 2 -->
  <circle cx="295" cy="100" r="12" fill="#a78bfa" stroke="#1a1a2e" stroke-width="2"/>
  <text x="295" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">2</text>
  <text x="295" y="78" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">Month 3-4</text>
  <text x="295" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">実践応用</text>

  <!-- Phase 3 -->
  <circle cx="460" cy="100" r="12" fill="#34d399" stroke="#1a1a2e" stroke-width="2"/>
  <text x="460" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">3</text>
  <text x="460" y="78" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">Month 5-7</text>
  <text x="460" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">高度活用</text>

  <!-- Phase 4 -->
  <circle cx="625" cy="100" r="12" fill="#f472b6" stroke="#1a1a2e" stroke-width="2"/>
  <text x="625" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">4</text>
  <text x="625" y="78" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">Month 8+</text>
  <text x="625" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">エキスパート</text>

  <!-- Phase 1 content box -->
  <rect x="50" y="125" width="160" height="145" fill="#16213e" stroke="#60a5fa" stroke-width="1.5" rx="8"/>
  <text x="130" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">基礎スキル</text>
  <text x="65" y="168" font-family="sans-serif" font-size="11" fill="#e2e8f0">• AIツール概要理解</text>
  <text x="65" y="186" font-family="sans-serif" font-size="11" fill="#e2e8f0">• Copilot 入門</text>
  <text x="65" y="204" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 基本プロンプト作成</text>
  <text x="65" y="222" font-family="sans-serif" font-size="11" fill="#e2e8f0">• AIコード補完活用</text>
  <text x="65" y="240" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 倫理・限界の理解</text>
  <rect x="60" y="250" width="140" height="10" fill="#60a5fa" rx="3" style="opacity:0.3"/>
  <rect x="60" y="250" width="50" height="10" fill="#60a5fa" rx="3"/>

  <!-- Phase 2 content box -->
  <rect x="215" y="125" width="160" height="145" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="8"/>
  <text x="295" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">実践スキル</text>
  <text x="230" y="168" font-family="sans-serif" font-size="11" fill="#e2e8f0">• プロンプト最適化</text>
  <text x="230" y="186" font-family="sans-serif" font-size="11" fill="#e2e8f0">• AIテスト生成</text>
  <text x="230" y="204" font-family="sans-serif" font-size="11" fill="#e2e8f0">• コードレビュー自動化</text>
  <text x="230" y="222" font-family="sans-serif" font-size="11" fill="#e2e8f0">• ドキュメント自動生成</text>
  <text x="230" y="240" font-family="sans-serif" font-size="11" fill="#e2e8f0">• CI/CD AI組み込み</text>
  <rect x="225" y="250" width="140" height="10" fill="#a78bfa" rx="3" style="opacity:0.3"/>
  <rect x="225" y="250" width="80" height="10" fill="#a78bfa" rx="3"/>

  <!-- Phase 3 content box -->
  <rect x="380" y="125" width="160" height="145" fill="#16213e" stroke="#34d399" stroke-width="1.5" rx="8"/>
  <text x="460" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">高度スキル</text>
  <text x="395" y="168" font-family="sans-serif" font-size="11" fill="#e2e8f0">• マルチAIオーケストレーション</text>
  <text x="395" y="186" font-family="sans-serif" font-size="11" fill="#e2e8f0">• AIエージェント設計</text>
  <text x="395" y="204" font-family="sans-serif" font-size="11" fill="#e2e8f0">• RAG 活用</text>
  <text x="395" y="222" font-family="sans-serif" font-size="11" fill="#e2e8f0">• ファインチューニング</text>
  <text x="395" y="240" font-family="sans-serif" font-size="11" fill="#e2e8f0">• セキュリティ評価</text>
  <rect x="390" y="250" width="140" height="10" fill="#34d399" rx="3" style="opacity:0.3"/>
  <rect x="390" y="250" width="105" height="10" fill="#34d399" rx="3"/>

  <!-- Phase 4 content box -->
  <rect x="545" y="125" width="165" height="145" fill="#16213e" stroke="#f472b6" stroke-width="1.5" rx="8"/>
  <text x="627" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">エキスパートスキル</text>
  <text x="560" y="168" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 組織AI戦略策定</text>
  <text x="560" y="186" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 社内LLM構築</text>
  <text x="560" y="204" font-family="sans-serif" font-size="11" fill="#e2e8f0">• チーム教育・普及</text>
  <text x="560" y="222" font-family="sans-serif" font-size="11" fill="#e2e8f0">• AI倫理ガバナンス</text>
  <text x="560" y="240" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 新ツール評価・選定</text>
  <rect x="555" y="250" width="140" height="10" fill="#f472b6" rx="3" style="opacity:0.3"/>
  <rect x="555" y="250" width="140" height="10" fill="#f472b6" rx="3"/>

  <!-- Resources section -->
  <text x="400" y="300" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">推奨学習リソース</text>

  <rect x="50" y="315" width="200" height="55" fill="#0f172a" stroke="#60a5fa" stroke-width="1" rx="6"/>
  <text x="150" y="337" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">オンライン学習</text>
  <text x="150" y="356" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">Coursera / Udemy / DeepLearning.AI</text>

  <rect x="300" y="315" width="200" height="55" fill="#0f172a" stroke="#a78bfa" stroke-width="1" rx="6"/>
  <text x="400" y="337" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">社内勉強会</text>
  <text x="400" y="356" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">ハンズオン + コードレビュー</text>

  <rect x="550" y="315" width="200" height="55" fill="#0f172a" stroke="#34d399" stroke-width="1" rx="6"/>
  <text x="650" y="337" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">実践プロジェクト</text>
  <text x="650" y="356" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">社内PoC → 本番導入</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">継続学習文化の醸成 — 週1時間の学習で8ヶ月でエキスパートへ</text>
</svg>


---

# 生産性指標ダッシュボード

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Dashboard header -->
  <rect x="20" y="15" width="760" height="45" fill="#16213e" rx="6" stroke="#a78bfa" stroke-width="1"/>
  <text x="400" y="44" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">AI駆動開発 KPI ダッシュボード</text>
  <text x="700" y="44" font-family="sans-serif" font-size="12" fill="#94a3b8">2026-03-11 更新</text>

  <!-- KPI Cards Row 1 -->
  <!-- Card 1: Velocity -->
  <rect x="20" y="75" width="175" height="100" fill="#16213e" stroke="#34d399" stroke-width="2" rx="8"/>
  <text x="107" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">開発速度</text>
  <text x="107" y="132" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="bold" fill="#34d399">+47%</text>
  <text x="107" y="158" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">導入前比較</text>
  <!-- Mini bar chart -->
  <rect x="35" y="163" width="30" height="4" fill="#34d399" rx="2" style="opacity:0.4"/>
  <rect x="35" y="163" width="20" height="4" fill="#34d399" rx="2"/>

  <!-- Card 2: Bug rate -->
  <rect x="210" y="75" width="175" height="100" fill="#16213e" stroke="#60a5fa" stroke-width="2" rx="8"/>
  <text x="297" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">バグ発生率</text>
  <text x="297" y="132" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="bold" fill="#60a5fa">-38%</text>
  <text x="297" y="158" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI自動レビュー効果</text>
  <rect x="225" y="163" width="30" height="4" fill="#60a5fa" rx="2" style="opacity:0.4"/>
  <rect x="225" y="163" width="18" height="4" fill="#60a5fa" rx="2"/>

  <!-- Card 3: Code coverage -->
  <rect x="400" y="75" width="175" height="100" fill="#16213e" stroke="#a78bfa" stroke-width="2" rx="8"/>
  <text x="487" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">テストカバレッジ</text>
  <text x="487" y="132" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="bold" fill="#a78bfa">89%</text>
  <text x="487" y="158" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIテスト生成後</text>
  <rect x="415" y="163" width="30" height="4" fill="#a78bfa" rx="2" style="opacity:0.4"/>
  <rect x="415" y="163" width="26" height="4" fill="#a78bfa" rx="2"/>

  <!-- Card 4: PR review time -->
  <rect x="590" y="75" width="185" height="100" fill="#16213e" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="682" y="98" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">PRレビュー時間</text>
  <text x="682" y="132" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="bold" fill="#fbbf24">-62%</text>
  <text x="682" y="158" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI初回レビュー導入</text>
  <rect x="605" y="163" width="30" height="4" fill="#fbbf24" rx="2" style="opacity:0.4"/>
  <rect x="605" y="163" width="11" height="4" fill="#fbbf24" rx="2"/>

  <!-- Trend Chart Section -->
  <text x="30" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">月次トレンド（スプリント速度）</text>

  <!-- Chart background -->
  <rect x="20" y="225" width="470" height="180" fill="#0f172a" stroke="#334155" stroke-width="1" rx="6"/>

  <!-- Y-axis labels -->
  <text x="35" y="245" font-family="sans-serif" font-size="10" fill="#94a3b8">100</text>
  <text x="35" y="275" font-family="sans-serif" font-size="10" fill="#94a3b8">80</text>
  <text x="35" y="305" font-family="sans-serif" font-size="10" fill="#94a3b8">60</text>
  <text x="35" y="335" font-family="sans-serif" font-size="10" fill="#94a3b8">40</text>
  <text x="35" y="365" font-family="sans-serif" font-size="10" fill="#94a3b8">20</text>

  <!-- Grid lines -->
  <line x1="58" y1="242" x2="478" y2="242" stroke="#334155" stroke-width="0.5"/>
  <line x1="58" y1="272" x2="478" y2="272" stroke="#334155" stroke-width="0.5"/>
  <line x1="58" y1="302" x2="478" y2="302" stroke="#334155" stroke-width="0.5"/>
  <line x1="58" y1="332" x2="478" y2="332" stroke="#334155" stroke-width="0.5"/>
  <line x1="58" y1="362" x2="478" y2="362" stroke="#334155" stroke-width="0.5"/>

  <!-- Before AI line (dotted) -->
  <polyline points="70,352 130,348 190,344 250,342 310,338 370,334 430,330 470,328" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- After AI line -->
  <polyline points="70,352 130,338 190,312 250,290 310,272 370,258 430,248 470,244" fill="none" stroke="#34d399" stroke-width="2.5"/>

  <!-- X-axis labels -->
  <text x="70" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">9月</text>
  <text x="130" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">10月</text>
  <text x="190" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">11月</text>
  <text x="250" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">12月</text>
  <text x="310" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">1月</text>
  <text x="370" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">2月</text>
  <text x="430" y="395" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">3月</text>

  <!-- Legend -->
  <line x1="40" y1="410" x2="70" y2="410" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="80" y="414" font-family="sans-serif" font-size="11" fill="#94a3b8">AI導入前</text>
  <line x1="155" y1="410" x2="185" y2="410" stroke="#34d399" stroke-width="2.5"/>
  <text x="195" y="414" font-family="sans-serif" font-size="11" fill="#34d399">AI導入後</text>

  <!-- Additional metrics panel -->
  <text x="510" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">追加指標</text>
  <rect x="500" y="225" width="275" height="240" fill="#0f172a" stroke="#334155" stroke-width="1" rx="6"/>

  <text x="520" y="252" font-family="sans-serif" font-size="12" fill="#e2e8f0">デプロイ頻度</text>
  <rect x="520" y="258" width="215" height="12" fill="#334155" rx="3"/>
  <rect x="520" y="258" width="172" height="12" fill="#60a5fa" rx="3"/>
  <text x="738" y="269" font-family="sans-serif" font-size="11" fill="#60a5fa">80%</text>

  <text x="520" y="292" font-family="sans-serif" font-size="12" fill="#e2e8f0">MTTR（障害復旧）</text>
  <rect x="520" y="298" width="215" height="12" fill="#334155" rx="3"/>
  <rect x="520" y="298" width="140" height="12" fill="#a78bfa" rx="3"/>
  <text x="738" y="309" font-family="sans-serif" font-size="11" fill="#a78bfa">65%</text>

  <text x="520" y="332" font-family="sans-serif" font-size="12" fill="#e2e8f0">AI採用エンジニア比率</text>
  <rect x="520" y="338" width="215" height="12" fill="#334155" rx="3"/>
  <rect x="520" y="338" width="193" height="12" fill="#34d399" rx="3"/>
  <text x="738" y="349" font-family="sans-serif" font-size="11" fill="#34d399">90%</text>

  <text x="520" y="372" font-family="sans-serif" font-size="12" fill="#e2e8f0">コスト削減効果</text>
  <rect x="520" y="378" width="215" height="12" fill="#334155" rx="3"/>
  <rect x="520" y="378" width="107" height="12" fill="#fbbf24" rx="3"/>
  <text x="738" y="389" font-family="sans-serif" font-size="11" fill="#fbbf24">50%</text>

  <text x="520" y="412" font-family="sans-serif" font-size="12" fill="#e2e8f0">開発者満足度(eNPS)</text>
  <rect x="520" y="418" width="215" height="12" fill="#334155" rx="3"/>
  <rect x="520" y="418" width="184" height="12" fill="#f472b6" rx="3"/>
  <text x="738" y="429" font-family="sans-serif" font-size="11" fill="#f472b6">86%</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">データ駆動でAI活用を継続改善 — 数値で経営へ効果を証明する</text>
</svg>


---

# よくある失敗パターン

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">AI導入 よくある失敗パターン（アンチパターン）</text>

  <!-- Anti-pattern cards: 2x3 grid -->

  <!-- Card 1 -->
  <rect x="30" y="58" width="228" height="115" fill="#16213e" stroke="#f472b6" stroke-width="2" rx="8"/>
  <text x="52" y="82" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">❌ ツール依存症</text>
  <text x="52" y="102" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIが生成したコードを</text>
  <text x="52" y="118" font-family="sans-serif" font-size="11" fill="#e2e8f0">無検証でマージする</text>
  <rect x="44" y="133" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="144" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ 必ずレビュー・テストを実施</text>

  <!-- Card 2 -->
  <rect x="286" y="58" width="228" height="115" fill="#16213e" stroke="#f472b6" stroke-width="2" rx="8"/>
  <text x="308" y="82" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">❌ コンテキスト省略</text>
  <text x="308" y="102" font-family="sans-serif" font-size="11" fill="#e2e8f0">曖昧なプロンプトで</text>
  <text x="308" y="118" font-family="sans-serif" font-size="11" fill="#e2e8f0">期待外れな結果を受け取る</text>
  <rect x="300" y="133" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="400" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ 詳細な文脈・制約を提供する</text>

  <!-- Card 3 -->
  <rect x="542" y="58" width="228" height="115" fill="#16213e" stroke="#f472b6" stroke-width="2" rx="8"/>
  <text x="564" y="82" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">❌ セキュリティ軽視</text>
  <text x="564" y="102" font-family="sans-serif" font-size="11" fill="#e2e8f0">機密コードを外部LLMに</text>
  <text x="564" y="118" font-family="sans-serif" font-size="11" fill="#e2e8f0">無制限に送信する</text>
  <rect x="556" y="133" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="656" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ データ分類 + 送信ポリシー制定</text>

  <!-- Card 4 -->
  <rect x="30" y="195" width="228" height="115" fill="#16213e" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="52" y="219" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24">⚠ 一人で完結しない</text>
  <text x="52" y="239" font-family="sans-serif" font-size="11" fill="#e2e8f0">一部メンバーだけ活用し</text>
  <text x="52" y="255" font-family="sans-serif" font-size="11" fill="#e2e8f0">チームに知識が広がらない</text>
  <rect x="44" y="270" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="144" y="287" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ ペアプロ + 社内勉強会で共有</text>

  <!-- Card 5 -->
  <rect x="286" y="195" width="228" height="115" fill="#16213e" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="308" y="219" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24">⚠ 測定なし導入</text>
  <text x="308" y="239" font-family="sans-serif" font-size="11" fill="#e2e8f0">KPIを設定せず効果が</text>
  <text x="308" y="255" font-family="sans-serif" font-size="11" fill="#e2e8f0">不明のまま継続する</text>
  <rect x="300" y="270" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="400" y="287" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ 導入前後でメトリクスを比較</text>

  <!-- Card 6 -->
  <rect x="542" y="195" width="228" height="115" fill="#16213e" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="564" y="219" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24">⚠ スキル停滞</text>
  <text x="564" y="239" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIに任せすぎて基礎スキルの</text>
  <text x="564" y="255" font-family="sans-serif" font-size="11" fill="#e2e8f0">成長が止まる</text>
  <rect x="556" y="270" width="200" height="28" fill="#0f172a" rx="5" stroke="#34d399" stroke-width="1"/>
  <text x="656" y="287" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">✓ AI活用 + 自力思考を並行維持</text>

  <!-- Summary box -->
  <rect x="30" y="330" width="740" height="100" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="8"/>
  <text x="400" y="355" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">失敗を避けるための3原則</text>
  <text x="165" y="378" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">① 検証文化</text>
  <text x="165" y="396" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIは提案者、判断は人間</text>
  <text x="165" y="412" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">全成果物をレビュー必須化</text>

  <text x="400" y="378" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">② ガバナンス整備</text>
  <text x="400" y="396" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">使用ポリシーを早期に策定</text>
  <text x="400" y="412" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">セキュリティ基準を明文化</text>

  <text x="635" y="378" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">③ 継続改善</text>
  <text x="635" y="396" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">定期的な振り返りと調整</text>
  <text x="635" y="412" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">成功事例を社内展開</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">失敗パターンを知ることが成功への近道 — 先人の経験を活かす</text>
</svg>


---

# 成功事例・ROI

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">成功事例・ROI — 導入前後 生産性・コスト比較</text>

  <!-- Before vs After comparison bars -->
  <text x="200" y="70" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#94a3b8">導入前</text>
  <text x="580" y="70" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">導入後</text>

  <!-- Metric: Feature delivery time -->
  <text x="30" y="105" font-family="sans-serif" font-size="12" fill="#e2e8f0">機能開発時間</text>
  <!-- Before bar -->
  <rect x="30" y="112" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="30" y="112" width="300" height="22" fill="#64748b" rx="3"/>
  <text x="335" y="127" font-family="sans-serif" font-size="12" fill="#94a3b8">14日</text>
  <!-- After bar -->
  <rect x="380" y="112" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="380" y="112" width="138" height="22" fill="#34d399" rx="3"/>
  <text x="523" y="127" font-family="sans-serif" font-size="12" fill="#34d399">6.4日 (-54%)</text>

  <!-- Metric: Bug fix time -->
  <text x="30" y="155" font-family="sans-serif" font-size="12" fill="#e2e8f0">バグ修正時間</text>
  <rect x="30" y="162" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="30" y="162" width="260" height="22" fill="#64748b" rx="3"/>
  <text x="335" y="177" font-family="sans-serif" font-size="12" fill="#94a3b8">8h</text>
  <rect x="380" y="162" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="380" y="162" width="117" height="22" fill="#34d399" rx="3"/>
  <text x="502" y="177" font-family="sans-serif" font-size="12" fill="#34d399">3.6h (-55%)</text>

  <!-- Metric: Code review -->
  <text x="30" y="205" font-family="sans-serif" font-size="12" fill="#e2e8f0">コードレビュー時間</text>
  <rect x="30" y="212" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="30" y="212" width="240" height="22" fill="#64748b" rx="3"/>
  <text x="335" y="227" font-family="sans-serif" font-size="12" fill="#94a3b8">4h</text>
  <rect x="380" y="212" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="380" y="212" width="72" height="22" fill="#60a5fa" rx="3"/>
  <text x="457" y="227" font-family="sans-serif" font-size="12" fill="#60a5fa">1.2h (-70%)</text>

  <!-- Metric: Test creation -->
  <text x="30" y="255" font-family="sans-serif" font-size="12" fill="#e2e8f0">テスト作成工数</text>
  <rect x="30" y="262" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="30" y="262" width="280" height="22" fill="#64748b" rx="3"/>
  <text x="335" y="277" font-family="sans-serif" font-size="12" fill="#94a3b8">3日</text>
  <rect x="380" y="262" width="300" height="22" fill="#334155" rx="3"/>
  <rect x="380" y="262" width="90" height="22" fill="#a78bfa" rx="3"/>
  <text x="475" y="277" font-family="sans-serif" font-size="12" fill="#a78bfa">0.9日 (-70%)</text>

  <!-- Divider -->
  <line x1="30" y1="305" x2="770" y2="305" stroke="#334155" stroke-width="1"/>

  <!-- ROI Summary boxes -->
  <text x="400" y="328" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">ROI サマリー</text>

  <rect x="30" y="340" width="160" height="90" fill="#0f172a" stroke="#34d399" stroke-width="2" rx="8"/>
  <text x="110" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">開発コスト削減</text>
  <text x="110" y="396" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#34d399">35%</text>
  <text x="110" y="418" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">年間1200万円削減</text>

  <rect x="210" y="340" width="160" height="90" fill="#0f172a" stroke="#60a5fa" stroke-width="2" rx="8"/>
  <text x="290" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">投資回収期間</text>
  <text x="290" y="396" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#60a5fa">4ヶ月</text>
  <text x="290" y="418" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">ツール費用含む</text>

  <rect x="390" y="340" width="160" height="90" fill="#0f172a" stroke="#a78bfa" stroke-width="2" rx="8"/>
  <text x="470" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">リリース頻度</text>
  <text x="470" y="396" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#a78bfa">3×</text>
  <text x="470" y="418" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">月1回→週1回以上</text>

  <rect x="570" y="340" width="200" height="90" fill="#0f172a" stroke="#fbbf24" stroke-width="2" rx="8"/>
  <text x="670" y="365" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">エンジニア満足度</text>
  <text x="670" y="396" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#fbbf24">+42pt</text>
  <text x="670" y="418" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">eNPS 15→57</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">生産性・品質・コスト・満足度 — すべての指標でROI実証済み</text>
</svg>


---

<!-- _class: lead -->
# 未来展望

- LLMの指数的進化とAIコーディングの未来を展望する
- 2030年に向けたエンジニアの役割変化と準備


---

# LLM進化ロードマップ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">LLM進化ロードマップ 2024〜2030</text>

  <!-- Timeline base line -->
  <line x1="60" y1="120" x2="750" y2="120" stroke="#a78bfa" stroke-width="2.5"/>

  <!-- Year markers -->
  <!-- 2024 -->
  <line x1="90" y1="112" x2="90" y2="128" stroke="#a78bfa" stroke-width="2"/>
  <text x="90" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">2024</text>

  <!-- 2025 -->
  <line x1="205" y1="112" x2="205" y2="128" stroke="#a78bfa" stroke-width="2"/>
  <text x="205" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">2025</text>

  <!-- 2026 (NOW) -->
  <line x1="320" y1="105" x2="320" y2="135" stroke="#34d399" stroke-width="3"/>
  <text x="320" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">2026 ★</text>

  <!-- 2027 -->
  <line x1="435" y1="112" x2="435" y2="128" stroke="#a78bfa" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="435" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">2027</text>

  <!-- 2028 -->
  <line x1="550" y1="112" x2="550" y2="128" stroke="#a78bfa" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="550" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">2028</text>

  <!-- 2030 -->
  <line x1="725" y1="112" x2="725" y2="128" stroke="#f472b6" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="725" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f472b6">2030</text>

  <!-- Capability cards below timeline -->
  <!-- 2024 -->
  <rect x="25" y="158" width="150" height="130" fill="#16213e" stroke="#60a5fa" stroke-width="1.5" rx="6"/>
  <text x="100" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">GPT-4 / Claude 3</text>
  <text x="40" y="196" font-family="sans-serif" font-size="11" fill="#e2e8f0">• コード補完</text>
  <text x="40" y="212" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 自然言語理解</text>
  <text x="40" y="228" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 基本エージェント</text>
  <text x="40" y="244" font-family="sans-serif" font-size="11" fill="#e2e8f0">• マルチモーダル</text>
  <text x="40" y="260" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 200K コンテキスト</text>
  <text x="40" y="276" font-family="sans-serif" font-size="11" fill="#e2e8f0">• RAG統合</text>

  <!-- 2025 -->
  <rect x="140" y="158" width="155" height="130" fill="#16213e" stroke="#60a5fa" stroke-width="1.5" rx="6"/>
  <text x="217" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">GPT-4o / Claude 3.5</text>
  <text x="155" y="196" font-family="sans-serif" font-size="11" fill="#e2e8f0">• Vibe Coding</text>
  <text x="155" y="212" font-family="sans-serif" font-size="11" fill="#e2e8f0">• リポジトリ全体理解</text>
  <text x="155" y="228" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 自律エージェント</text>
  <text x="155" y="244" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 1M コンテキスト</text>
  <text x="155" y="260" font-family="sans-serif" font-size="11" fill="#e2e8f0">• Computer Use</text>
  <text x="155" y="276" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 推論モデル登場</text>

  <!-- 2026 - NOW -->
  <rect x="258" y="158" width="155" height="130" fill="#16213e" stroke="#34d399" stroke-width="2" rx="6"/>
  <text x="335" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">Claude 4 / GPT-5</text>
  <text x="270" y="196" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 完全自律コーディング</text>
  <text x="270" y="212" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 設計〜実装〜デプロイ</text>
  <text x="270" y="228" font-family="sans-serif" font-size="11" fill="#e2e8f0">• マルチエージェント協調</text>
  <text x="270" y="244" font-family="sans-serif" font-size="11" fill="#e2e8f0">• リアルタイム学習</text>
  <text x="270" y="260" font-family="sans-serif" font-size="11" fill="#e2e8f0">• 10M+ コンテキスト</text>
  <text x="270" y="276" font-family="sans-serif" font-size="11" fill="#e2e8f0">• SWE-bench 90%+</text>

  <!-- 2027 -->
  <rect x="376" y="158" width="150" height="130" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="6" stroke-dasharray="4,2"/>
  <text x="451" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">次世代モデル</text>
  <text x="391" y="196" font-family="sans-serif" font-size="11" fill="#94a3b8">• アーキテクチャ自動設計</text>
  <text x="391" y="212" font-family="sans-serif" font-size="11" fill="#94a3b8">• セキュリティ自動監査</text>
  <text x="391" y="228" font-family="sans-serif" font-size="11" fill="#94a3b8">• 要件→製品 直接変換</text>
  <text x="391" y="244" font-family="sans-serif" font-size="11" fill="#94a3b8">• コード理解AIネイティブ</text>
  <text x="391" y="260" font-family="sans-serif" font-size="11" fill="#94a3b8">• 自己修正ループ</text>

  <!-- 2028-2030 -->
  <rect x="542" y="158" width="220" height="130" fill="#16213e" stroke="#f472b6" stroke-width="1.5" rx="6" stroke-dasharray="4,2"/>
  <text x="652" y="178" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">AGI水準 (推定)</text>
  <text x="558" y="196" font-family="sans-serif" font-size="11" fill="#94a3b8">• 完全自律ソフトウェア開発</text>
  <text x="558" y="212" font-family="sans-serif" font-size="11" fill="#94a3b8">• ビジネスロジック自動抽出</text>
  <text x="558" y="228" font-family="sans-serif" font-size="11" fill="#94a3b8">• 人間監督下での完全実装</text>
  <text x="558" y="244" font-family="sans-serif" font-size="11" fill="#94a3b8">• 新言語・フレームワーク創出</text>
  <text x="558" y="260" font-family="sans-serif" font-size="11" fill="#94a3b8">• ソフトウェア産業の再定義</text>

  <!-- Capability growth curve -->
  <text x="400" y="318" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">能力曲線（指数成長）</text>

  <!-- Small chart -->
  <rect x="100" y="330" width="600" height="70" fill="#0f172a" stroke="#334155" stroke-width="1" rx="4"/>
  <polyline points="130,388 200,380 270,368 320,356 390,338 460,322 540,308 650,298 680,295" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
  <!-- Dot at NOW (2026) -->
  <circle cx="320" cy="356" r="6" fill="#34d399"/>
  <text x="320" y="350" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">今</text>
  <text x="130" y="398" font-family="sans-serif" font-size="10" fill="#94a3b8">2024</text>
  <text x="680" y="398" font-family="sans-serif" font-size="10" fill="#94a3b8">2030</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">指数的進化 — 今学ぶことが2030年の競争優位を決める</text>
</svg>


---

# AI Coding 2026-2030予測

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">AI Coding 2026-2030 普及率・能力予測</text>

  <!-- Chart area -->
  <rect x="70" y="55" width="700" height="300" fill="#0f172a" stroke="#334155" stroke-width="1" rx="6"/>

  <!-- Y-axis label -->
  <text x="20" y="215" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8" transform="rotate(-90,20,215)">普及率 / 能力スコア (%)</text>

  <!-- Y-axis grid and labels -->
  <line x1="95" y1="75" x2="750" y2="75" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="79" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">100</text>

  <line x1="95" y1="115" x2="750" y2="115" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="119" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">80</text>

  <line x1="95" y1="155" x2="750" y2="155" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="159" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">60</text>

  <line x1="95" y1="195" x2="750" y2="195" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="199" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">40</text>

  <line x1="95" y1="235" x2="750" y2="235" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="239" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">20</text>

  <line x1="95" y1="275" x2="750" y2="275" stroke="#1e293b" stroke-width="1"/>
  <text x="82" y="279" text-anchor="end" font-family="sans-serif" font-size="10" fill="#94a3b8">0</text>

  <!-- X-axis labels -->
  <text x="130" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">2024</text>
  <text x="240" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">2025</text>
  <text x="350" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">2026★</text>
  <text x="460" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">2027</text>
  <text x="570" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">2028</text>
  <text x="680" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f472b6">2030</text>

  <!-- Data series: AI adoption among developers (solid green) -->
  <!-- 2024:30% 2025:52% 2026:68% 2027:78% 2028:86% 2030:95% -->
  <polyline points="130,247 240,219 350,199 460,179 570,163 680,83" fill="none" stroke="#34d399" stroke-width="2.5"/>
  <!-- Dots -->
  <circle cx="130" cy="247" r="5" fill="#34d399"/>
  <circle cx="240" cy="219" r="5" fill="#34d399"/>
  <circle cx="350" cy="199" r="7" fill="#34d399" stroke="#1a1a2e" stroke-width="2"/>
  <circle cx="460" cy="179" r="5" fill="#34d399"/>
  <circle cx="570" cy="163" r="5" fill="#34d399"/>
  <circle cx="680" cy="83" r="5" fill="#34d399"/>
  <!-- Labels -->
  <text x="130" y="242" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">30%</text>
  <text x="240" y="214" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">52%</text>
  <text x="355" y="193" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">68%</text>
  <text x="460" y="174" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">78%</text>
  <text x="570" y="158" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">86%</text>
  <text x="680" y="78" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">95%</text>

  <!-- Data series: AI coding capability (solid purple) -->
  <!-- 2024:20% 2025:38% 2026:58% 2027:72% 2028:82% 2030:96% -->
  <polyline points="130,259 240,231 350,207 460,183 570,163 680,79" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
  <circle cx="130" cy="259" r="5" fill="#a78bfa"/>
  <circle cx="240" cy="231" r="5" fill="#a78bfa"/>
  <circle cx="350" cy="207" r="7" fill="#a78bfa" stroke="#1a1a2e" stroke-width="2"/>
  <circle cx="460" cy="183" r="5" fill="#a78bfa"/>
  <circle cx="570" cy="163" r="5" fill="#a78bfa"/>
  <circle cx="680" cy="79" r="5" fill="#a78bfa"/>
  <text x="130" y="272" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">20%</text>
  <text x="240" y="244" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">38%</text>
  <text x="355" y="218" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">58%</text>

  <!-- Data series: Autonomous AI tasks (dashed blue) -->
  <!-- 2024:5% 2025:12% 2026:28% 2027:45% 2028:62% 2030:88% -->
  <polyline points="130,271 240,261 350,243 460,219 570,191 680,99" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/>
  <circle cx="130" cy="271" r="5" fill="#60a5fa"/>
  <circle cx="240" cy="261" r="5" fill="#60a5fa"/>
  <circle cx="350" cy="243" r="7" fill="#60a5fa" stroke="#1a1a2e" stroke-width="2"/>
  <circle cx="460" cy="219" r="5" fill="#60a5fa"/>
  <circle cx="570" cy="191" r="5" fill="#60a5fa"/>
  <circle cx="680" cy="99" r="5" fill="#60a5fa"/>

  <!-- NOW vertical line -->
  <line x1="350" y1="60" x2="350" y2="360" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="355" y="72" font-family="sans-serif" font-size="10" fill="#34d399">NOW</text>

  <!-- Legend -->
  <rect x="70" y="390" width="700" height="75" fill="#16213e" stroke="#334155" stroke-width="1" rx="6"/>
  <line x1="100" y1="415" x2="140" y2="415" stroke="#34d399" stroke-width="2.5"/>
  <circle cx="120" cy="415" r="4" fill="#34d399"/>
  <text x="150" y="419" font-family="sans-serif" font-size="11" fill="#e2e8f0">開発者AI採用率</text>

  <line x1="290" y1="415" x2="330" y2="415" stroke="#a78bfa" stroke-width="2.5"/>
  <circle cx="310" cy="415" r="4" fill="#a78bfa"/>
  <text x="340" y="419" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIコーディング能力スコア</text>

  <line x1="520" y1="415" x2="560" y2="415" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/>
  <circle cx="540" cy="415" r="4" fill="#60a5fa"/>
  <text x="570" y="419" font-family="sans-serif" font-size="11" fill="#e2e8f0">自律タスク完了率</text>

  <text x="400" y="450" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">※ 各調査・論文・専門家予測の集合値 — 実際の進化は更に速い可能性あり</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">2030年には95%のエンジニアがAIを日常活用 — 今が転換点</text>
</svg>


---

# 開発者の役割変化

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">開発者の役割変化 — 従来 vs AI時代</text>

  <!-- Spectrum bar -->
  <text x="110" y="70" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#94a3b8">従来エンジニア</text>
  <text x="690" y="70" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">AI時代エンジニア</text>

  <!-- Gradient spectrum bar (using solid segments) -->
  <rect x="60" y="80" width="100" height="18" fill="#64748b" rx="3"/>
  <rect x="162" y="80" width="100" height="18" fill="#6b7280" rx="3"/>
  <rect x="264" y="80" width="100" height="18" fill="#6366f1" rx="3"/>
  <rect x="366" y="80" width="100" height="18" fill="#7c3aed" rx="3"/>
  <rect x="468" y="80" width="100" height="18" fill="#8b5cf6" rx="3"/>
  <rect x="570" y="80" width="100" height="18" fill="#a78bfa" rx="3"/>
  <rect x="672" y="80" width="100" height="18" fill="#c4b5fd" rx="3"/>

  <!-- Role labels on spectrum -->
  <text x="110" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">手動コーディング中心</text>
  <text x="314" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">AIアシスト開発</text>
  <text x="520" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">AI協働開発</text>
  <text x="720" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c4b5fd">AI指揮・監督</text>

  <!-- Comparison table -->
  <!-- Header -->
  <rect x="30" y="135" width="355" height="32" fill="#16213e" stroke="#64748b" stroke-width="1" rx="4"/>
  <text x="207" y="156" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#94a3b8">従来エンジニア</text>
  <rect x="415" y="135" width="355" height="32" fill="#16213e" stroke="#a78bfa" stroke-width="1" rx="4"/>
  <text x="592" y="156" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">AI時代エンジニア</text>

  <!-- Rows -->
  <!-- Row 1 -->
  <rect x="30" y="167" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="207" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">ボイラープレートを手書き</text>
  <rect x="415" y="167" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="592" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">AIがコード生成 → 人間がレビュー</text>

  <!-- Row 2 -->
  <rect x="30" y="203" width="355" height="36" fill="#16213e" rx="2"/>
  <text x="207" y="226" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">ドキュメントを手作業で作成</text>
  <rect x="415" y="203" width="355" height="36" fill="#16213e" rx="2"/>
  <text x="592" y="226" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">AIがドキュメント自動生成・更新</text>

  <!-- Row 3 -->
  <rect x="30" y="239" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="207" y="262" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">テストケースを手動設計</text>
  <rect x="415" y="239" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="592" y="262" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">AIがエッジケース含め自動生成</text>

  <!-- Row 4 -->
  <rect x="30" y="275" width="355" height="36" fill="#16213e" rx="2"/>
  <text x="207" y="298" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">バグ修正に時間消費</text>
  <rect x="415" y="275" width="355" height="36" fill="#16213e" rx="2"/>
  <text x="592" y="298" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">AI根本原因分析 + 修正案提示</text>

  <!-- Row 5 -->
  <rect x="30" y="311" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="207" y="334" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">コードレビューに多くの時間</text>
  <rect x="415" y="311" width="355" height="36" fill="#0f172a" rx="2"/>
  <text x="592" y="334" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">AIが初回レビュー → 人間は判断</text>

  <!-- Arrow in the middle -->
  <text x="395" y="262" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#a78bfa">→</text>

  <!-- New skills box -->
  <rect x="30" y="365" width="740" height="95" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="8"/>
  <text x="400" y="387" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">AI時代エンジニアの新スキルセット</text>

  <rect x="50" y="398" width="155" height="46" fill="#0f172a" stroke="#60a5fa" stroke-width="1" rx="5"/>
  <text x="127" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#60a5fa">プロンプト設計</text>
  <text x="127" y="434" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIに的確に指示する力</text>

  <rect x="220" y="398" width="155" height="46" fill="#0f172a" stroke="#34d399" stroke-width="1" rx="5"/>
  <text x="297" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">批判的評価</text>
  <text x="297" y="434" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI出力の検証・改善力</text>

  <rect x="390" y="398" width="155" height="46" fill="#0f172a" stroke="#a78bfa" stroke-width="1" rx="5"/>
  <text x="467" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#a78bfa">システム思考</text>
  <text x="467" y="434" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI含む全体最適化</text>

  <rect x="560" y="398" width="200" height="46" fill="#0f172a" stroke="#f472b6" stroke-width="1" rx="5"/>
  <text x="660" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#f472b6">コラボレーション</text>
  <text x="660" y="434" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">人間×AI チームマネジメント</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">コードを書く → 問題を解くへ — エンジニアの価値は上がる</text>
</svg>


---

# 今日からできるアクション

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">今日からできるアクション — 5ステップ</text>

  <!-- Step flow: horizontal with arrows -->

  <!-- Step 1 -->
  <rect x="30" y="65" width="130" height="155" fill="#16213e" stroke="#60a5fa" stroke-width="2.5" rx="10"/>
  <circle cx="95" cy="90" r="18" fill="#60a5fa"/>
  <text x="95" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">1</text>
  <text x="95" y="124" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">今日</text>
  <text x="95" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">Copilot/Claude</text>
  <text x="95" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">無料トライアル</text>
  <text x="95" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">を今日開始する</text>
  <text x="95" y="195" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">所要: 15分</text>
  <rect x="50" y="205" width="90" height="5" fill="#60a5fa" rx="2"/>

  <!-- Arrow 1→2 -->
  <line x1="160" y1="143" x2="185" y2="143" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="185,138 195,143 185,148" fill="#a78bfa"/>

  <!-- Step 2 -->
  <rect x="195" y="65" width="130" height="155" fill="#16213e" stroke="#a78bfa" stroke-width="2.5" rx="10"/>
  <circle cx="260" cy="90" r="18" fill="#a78bfa"/>
  <text x="260" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">2</text>
  <text x="260" y="124" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">今週</text>
  <text x="260" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">既存タスクに</text>
  <text x="260" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AIを組み込む</text>
  <text x="260" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">小さく試す</text>
  <text x="260" y="195" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">所要: 1-2時間</text>
  <rect x="215" y="205" width="90" height="5" fill="#a78bfa" rx="2"/>

  <!-- Arrow 2→3 -->
  <line x1="325" y1="143" x2="350" y2="143" stroke="#34d399" stroke-width="2"/>
  <polygon points="350,138 360,143 350,148" fill="#34d399"/>

  <!-- Step 3 -->
  <rect x="360" y="65" width="130" height="155" fill="#16213e" stroke="#34d399" stroke-width="2.5" rx="10"/>
  <circle cx="425" cy="90" r="18" fill="#34d399"/>
  <text x="425" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">3</text>
  <text x="425" y="124" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">今月</text>
  <text x="425" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">チームに共有</text>
  <text x="425" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">勉強会・LT開催</text>
  <text x="425" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">ベスト実践を収集</text>
  <text x="425" y="195" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">所要: 1スプリント</text>
  <rect x="380" y="205" width="90" height="5" fill="#34d399" rx="2"/>

  <!-- Arrow 3→4 -->
  <line x1="490" y1="143" x2="515" y2="143" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="515,138 525,143 515,148" fill="#fbbf24"/>

  <!-- Step 4 -->
  <rect x="525" y="65" width="130" height="155" fill="#16213e" stroke="#fbbf24" stroke-width="2.5" rx="10"/>
  <circle cx="590" cy="90" r="18" fill="#fbbf24"/>
  <text x="590" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">4</text>
  <text x="590" y="124" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">3ヶ月後</text>
  <text x="590" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">ワークフロー</text>
  <text x="590" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">全体をAI対応</text>
  <text x="590" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">KPIで効果測定</text>
  <text x="590" y="195" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">所要: 1四半期</text>
  <rect x="545" y="205" width="90" height="5" fill="#fbbf24" rx="2"/>

  <!-- Arrow 4→5 -->
  <line x1="655" y1="143" x2="675" y2="143" stroke="#f472b6" stroke-width="2"/>
  <polygon points="675,138 685,143 675,148" fill="#f472b6"/>

  <!-- Step 5 -->
  <rect x="680" y="65" width="105" height="155" fill="#16213e" stroke="#f472b6" stroke-width="2.5" rx="10"/>
  <circle cx="732" cy="90" r="18" fill="#f472b6"/>
  <text x="732" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">5</text>
  <text x="732" y="124" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f472b6">半年後</text>
  <text x="732" y="143" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">AI-first</text>
  <text x="732" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">組織へ転換</text>
  <text x="732" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">社外発信</text>
  <text x="732" y="195" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">所要: 継続</text>
  <rect x="692" y="205" width="80" height="5" fill="#f472b6" rx="2"/>

  <!-- Immediate action checklist -->
  <rect x="30" y="242" width="740" height="195" fill="#16213e" stroke="#a78bfa" stroke-width="1.5" rx="8"/>
  <text x="400" y="267" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">今日できる具体的アクション（チェックリスト）</text>

  <!-- Column 1 -->
  <text x="55" y="292" font-family="sans-serif" font-size="13" fill="#60a5fa">□</text>
  <text x="75" y="292" font-family="sans-serif" font-size="12" fill="#e2e8f0">GitHub Copilot 無料試用開始（30日）</text>
  <text x="55" y="314" font-family="sans-serif" font-size="13" fill="#60a5fa">□</text>
  <text x="75" y="314" font-family="sans-serif" font-size="12" fill="#e2e8f0">Claude.ai / ChatGPT にコードを貼って相談</text>
  <text x="55" y="336" font-family="sans-serif" font-size="13" fill="#60a5fa">□</text>
  <text x="75" y="336" font-family="sans-serif" font-size="12" fill="#e2e8f0">今日のバグをAIに解析してもらう</text>
  <text x="55" y="358" font-family="sans-serif" font-size="13" fill="#60a5fa">□</text>
  <text x="75" y="358" font-family="sans-serif" font-size="12" fill="#e2e8f0">既存関数のテストをAIで生成する</text>
  <text x="55" y="380" font-family="sans-serif" font-size="13" fill="#60a5fa">□</text>
  <text x="75" y="380" font-family="sans-serif" font-size="12" fill="#e2e8f0">AIドキュメント生成を1ファイルで試す</text>

  <!-- Column 2 -->
  <text x="420" y="292" font-family="sans-serif" font-size="13" fill="#34d399">□</text>
  <text x="440" y="292" font-family="sans-serif" font-size="12" fill="#e2e8f0">チームSlackに #ai-tools チャンネル作成</text>
  <text x="420" y="314" font-family="sans-serif" font-size="13" fill="#34d399">□</text>
  <text x="440" y="314" font-family="sans-serif" font-size="12" fill="#e2e8f0">AI活用事例を1つ社内Wikiに書く</text>
  <text x="420" y="336" font-family="sans-serif" font-size="13" fill="#34d399">□</text>
  <text x="440" y="336" font-family="sans-serif" font-size="12" fill="#e2e8f0">来週の勉強会スケジュールを設定</text>
  <text x="420" y="358" font-family="sans-serif" font-size="13" fill="#34d399">□</text>
  <text x="440" y="358" font-family="sans-serif" font-size="12" fill="#e2e8f0">AIセキュリティポリシーのドラフト作成</text>
  <text x="420" y="380" font-family="sans-serif" font-size="13" fill="#34d399">□</text>
  <text x="440" y="380" font-family="sans-serif" font-size="12" fill="#e2e8f0">マネージャーにAI導入提案書を送る</text>

  <!-- Footer -->
  <text x="400" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">最初の一歩が全て — 今日始めることが半年後の差を生む</text>
</svg>


---

<!-- _class: lead -->
# まとめ

- Vibe Coding はエンジニアの創造力を最大化するパラダイムシフト
- AIは敵ではなく、最強のペアプログラマー
- 品質・速度・コスト — すべてを同時に改善できる
- 組織文化とスキルアップが技術導入と同等に重要
- 今日の小さな一歩が、半年後の大きな差を生む
- 未来のエンジニアは「コードを書く人」から「問題を解く人」へ

<!--
最後のまとめスライド。Vibe Codingの本質は技術ではなく、人間の創造力をAIが拡張するという思想。参加者が今日から行動できるよう、具体的なメッセージで締める。
-->
