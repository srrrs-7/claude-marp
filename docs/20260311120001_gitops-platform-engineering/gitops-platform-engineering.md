---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "GitOps & Platform Engineering"
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
# GitOps & Platform Engineering

- クラウドネイティブ時代のデプロイメント・プラットフォーム戦略
- ArgoCD / Flux / Kubernetes による実践ガイド

<!--
GitOpsとPlatform Engineeringの全体像を解説するセッションです。
-->

---

# アジェンダ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">アジェンダ</text><rect x="30" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="100" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">Developer</text><polygon points="175,110 190,104 190,116" fill="#60a5fa"/><line x1="170" y1="110" x2="192" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="200" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="270" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">Git Repo</text><text x="270" y="128" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Source of Truth</text><polygon points="345,110 360,104 360,116" fill="#60a5fa"/><line x1="340" y1="110" x2="362" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="370" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="440" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">CI Pipeline</text><text x="440" y="128" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Build &amp; Test</text><polygon points="515,110 530,104 530,116" fill="#60a5fa"/><line x1="510" y1="110" x2="532" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="540" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="610" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">CD Agent</text><text x="610" y="128" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">ArgoCD / Flux</text><line x1="610" y1="140" x2="610" y2="230" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/><polygon points="604,228 616,228 610,242" fill="#60a5fa"/><rect x="480" y="250" width="260" height="100" rx="10" fill="#0f3460" stroke="#a78bfa" stroke-width="2"/><text x="610" y="280" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Kubernetes Cluster</text><rect x="500" y="295" width="100" height="36" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="550" y="318" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Pod (App)</text><rect x="620" y="295" width="100" height="36" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="670" y="318" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Pod (App)</text><text x="100" y="290" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Pull-based Sync</text><line x1="100" y1="300" x2="480" y2="300" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/><text x="200" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Immutable infrastructure / Declarative config / Automated reconciliation</text></svg>
- 1. Platform Engineering とは何か
- 2. GitOps の基本概念と 4 原則
- 3. GitOps ワークフロー全体像
- 4. ツールチェーン（Kubernetes / ArgoCD）
- 5. ArgoCD セットアップ・Application 定義
- 6. Flux vs ArgoCD 比較

<!--
セッションの全体構成を説明します。
-->

---

# Platform Engineering とは何か

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <!-- Outer ring label -->
  <circle cx="400" cy="250" r="220" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="8,4" opacity="0.5"/>
  <!-- Middle ring -->
  <circle cx="400" cy="250" r="150" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,4" opacity="0.6"/>
  <!-- Center IDP circle -->
  <circle cx="400" cy="250" r="75" fill="#2d1b69" stroke="#a78bfa" stroke-width="3"/>
  <text x="400" y="243" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">Internal</text>
  <text x="400" y="262" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold" font-family="sans-serif">Developer</text>
  <text x="400" y="281" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold" font-family="sans-serif">Platform</text>

  <!-- Satellite items on middle ring -->
  <!-- Top -->
  <rect x="330" y="60" width="140" height="44" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="87" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">CI/CD Pipeline</text>
  <line x1="400" y1="104" x2="400" y2="175" stroke="#60a5fa" stroke-width="1.5" opacity="0.7"/>

  <!-- Right top -->
  <rect x="580" y="120" width="150" height="44" rx="10" fill="#1e3a5f" stroke="#34d399" stroke-width="2"/>
  <text x="655" y="147" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">Observability</text>
  <line x1="580" y1="142" x2="492" y2="204" stroke="#34d399" stroke-width="1.5" opacity="0.7"/>

  <!-- Right bottom -->
  <rect x="590" y="300" width="140" height="44" rx="10" fill="#1e3a5f" stroke="#f59e0b" stroke-width="2"/>
  <text x="660" y="327" text-anchor="middle" fill="#f59e0b" font-size="13" font-family="sans-serif">Security / Policy</text>
  <line x1="590" y1="322" x2="475" y2="295" stroke="#f59e0b" stroke-width="1.5" opacity="0.7"/>

  <!-- Bottom -->
  <rect x="330" y="396" width="140" height="44" rx="10" fill="#1e3a5f" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="423" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Infrastructure</text>
  <line x1="400" y1="396" x2="400" y2="325" stroke="#a78bfa" stroke-width="1.5" opacity="0.7"/>

  <!-- Left bottom -->
  <rect x="70" y="300" width="140" height="44" rx="10" fill="#1e3a5f" stroke="#f472b6" stroke-width="2"/>
  <text x="140" y="327" text-anchor="middle" fill="#f472b6" font-size="13" font-family="sans-serif">Self-service Portal</text>
  <line x1="210" y1="322" x2="326" y2="293" stroke="#f472b6" stroke-width="1.5" opacity="0.7"/>

  <!-- Left top -->
  <rect x="70" y="120" width="140" height="44" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="140" y="147" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Container Platform</text>
  <line x1="210" y1="142" x2="327" y2="204" stroke="#60a5fa" stroke-width="1.5" opacity="0.7"/>

  <!-- Outer ring label -->
  <text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif" opacity="0.7">Platform Engineering — 開発者体験の向上</text>
</svg>
- IDP（Internal Developer Platform）を中心に開発者体験を向上させる取り組み

<!--
Platform EngineeringはIDPを中心とした開発者向けのセルフサービス基盤を提供します。
-->

---

# 従来 DevOps vs Platform Engineering

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <!-- Divider -->
  <line x1="400" y1="40" x2="400" y2="470" stroke="#a78bfa" stroke-width="2" stroke-dasharray="6,4" opacity="0.5"/>

  <!-- Left: Traditional DevOps -->
  <text x="200" y="65" text-anchor="middle" fill="#f472b6" font-size="17" font-weight="bold" font-family="sans-serif">従来の DevOps</text>
  <rect x="40" y="80" width="320" height="360" rx="12" fill="#2a1a3e" stroke="#f472b6" stroke-width="1.5" opacity="0.9"/>

  <!-- Left items -->
  <rect x="60" y="105" width="280" height="46" rx="8" fill="#3b1f4f" stroke="#f472b6" stroke-width="1"/>
  <text x="200" y="133" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">チームごとに独自スクリプト</text>

  <rect x="60" y="165" width="280" height="46" rx="8" fill="#3b1f4f" stroke="#f472b6" stroke-width="1"/>
  <text x="200" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ツール・手順が不統一</text>

  <rect x="60" y="225" width="280" height="46" rx="8" fill="#3b1f4f" stroke="#f472b6" stroke-width="1"/>
  <text x="200" y="253" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">知識のサイロ化</text>

  <rect x="60" y="285" width="280" height="46" rx="8" fill="#3b1f4f" stroke="#f472b6" stroke-width="1"/>
  <text x="200" y="313" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">オンボーディングに時間がかかる</text>

  <rect x="60" y="345" width="280" height="46" rx="8" fill="#3b1f4f" stroke="#f472b6" stroke-width="1"/>
  <text x="200" y="373" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">インフラ変更が属人的</text>

  <text x="200" y="455" text-anchor="middle" fill="#f472b6" font-size="12" font-family="sans-serif" opacity="0.8">スケールしにくい</text>

  <!-- Right: Platform Engineering -->
  <text x="600" y="65" text-anchor="middle" fill="#34d399" font-size="17" font-weight="bold" font-family="sans-serif">Platform Engineering</text>
  <rect x="440" y="80" width="320" height="360" rx="12" fill="#1a3a2e" stroke="#34d399" stroke-width="1.5" opacity="0.9"/>

  <rect x="460" y="105" width="280" height="46" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1"/>
  <text x="600" y="133" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">共通 IDP（Internal Developer Platform）</text>

  <rect x="460" y="165" width="280" height="46" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1"/>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">標準化されたツールチェーン</text>

  <rect x="460" y="225" width="280" height="46" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1"/>
  <text x="600" y="253" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">セルフサービスによる生産性向上</text>

  <rect x="460" y="285" width="280" height="46" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1"/>
  <text x="600" y="313" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">テンプレート化で素早いオンボーディング</text>

  <rect x="460" y="345" width="280" height="46" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1"/>
  <text x="600" y="373" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">GitOpsで変更を可視化・追跡</text>

  <text x="600" y="455" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif" opacity="0.8">組織全体でスケール可能</text>

  <!-- VS badge -->
  <circle cx="400" cy="250" r="22" fill="#1a1a2e" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="256" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">VS</text>
</svg>
- 標準化・自動化・セルフサービスが Platform Engineering の鍵

<!--
従来のDevOpsとPlatform Engineeringの違いを比較します。
-->

---

# GitOps 4 原則

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold" font-family="sans-serif">GitOps 4原則</text>
  <line x1="400" y1="60" x2="400" y2="470" stroke="#a78bfa" stroke-width="1.5" opacity="0.4"/>
  <line x1="60" y1="265" x2="740" y2="265" stroke="#a78bfa" stroke-width="1.5" opacity="0.4"/>
  <rect x="65" y="65" width="320" height="185" rx="14" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <circle cx="105" cy="105" r="22" fill="#60a5fa"/>
  <text x="105" y="112" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold" font-family="sans-serif">1</text>
  <text x="225" y="103" text-anchor="middle" fill="#60a5fa" font-size="15" font-weight="bold" font-family="sans-serif">Declarative</text>
  <text x="225" y="122" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">（宣言的）</text>
  <text x="140" y="158" fill="#d1d5db" font-size="12" font-family="sans-serif">・システム全体を宣言的に記述</text>
  <text x="140" y="178" fill="#d1d5db" font-size="12" font-family="sans-serif">・Kubernetes マニフェスト / Helm</text>
  <text x="140" y="198" fill="#d1d5db" font-size="12" font-family="sans-serif">・"How" ではなく "What" を定義</text>
  <text x="140" y="225" fill="#d1d5db" font-size="12" font-family="sans-serif">・再現性と一貫性を保証</text>
  <rect x="415" y="65" width="320" height="185" rx="14" fill="#1a2e1a" stroke="#34d399" stroke-width="2"/>
  <circle cx="455" cy="105" r="22" fill="#34d399"/>
  <text x="455" y="112" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold" font-family="sans-serif">2</text>
  <text x="575" y="103" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Versioned &amp; Immutable</text>
  <text x="575" y="122" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">（バージョン管理・不変）</text>
  <text x="490" y="158" fill="#d1d5db" font-size="12" font-family="sans-serif">・Git が唯一の変更記録源</text>
  <text x="490" y="178" fill="#d1d5db" font-size="12" font-family="sans-serif">・全変更に audit log が残る</text>
  <text x="490" y="198" fill="#d1d5db" font-size="12" font-family="sans-serif">・ロールバックは git revert</text>
  <text x="490" y="225" fill="#d1d5db" font-size="12" font-family="sans-serif">・ブランチ戦略で環境分離</text>
  <rect x="65" y="280" width="320" height="185" rx="14" fill="#2e1a1a" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="105" cy="320" r="22" fill="#f59e0b"/>
  <text x="105" y="327" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold" font-family="sans-serif">3</text>
  <text x="225" y="318" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="bold" font-family="sans-serif">Pulled Automatically</text>
  <text x="225" y="337" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">（自動 Pull）</text>
  <text x="140" y="373" fill="#d1d5db" font-size="12" font-family="sans-serif">・エージェントが自動で状態を同期</text>
  <text x="140" y="393" fill="#d1d5db" font-size="12" font-family="sans-serif">・Push ではなく Pull ベース</text>
  <text x="140" y="413" fill="#d1d5db" font-size="12" font-family="sans-serif">・クレデンシャル不要（inbound のみ）</text>
  <text x="140" y="440" fill="#d1d5db" font-size="12" font-family="sans-serif">・ArgoCD / Flux が代表実装</text>
  <rect x="415" y="280" width="320" height="185" rx="14" fill="#1e1a2e" stroke="#a78bfa" stroke-width="2"/>
  <circle cx="455" cy="320" r="22" fill="#a78bfa"/>
  <text x="455" y="327" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold" font-family="sans-serif">4</text>
  <text x="575" y="318" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">Continuously Reconciled</text>
  <text x="575" y="337" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">（継続的 Reconcile）</text>
  <text x="490" y="373" fill="#d1d5db" font-size="12" font-family="sans-serif">・実態と宣言の差分を検出</text>
  <text x="490" y="393" fill="#d1d5db" font-size="12" font-family="sans-serif">・自動修復（Self-healing）</text>
  <text x="490" y="413" fill="#d1d5db" font-size="12" font-family="sans-serif">・Drift 検知で安全運用</text>
  <text x="490" y="440" fill="#d1d5db" font-size="12" font-family="sans-serif">・継続的な状態監視</text>
</svg>
- Declarative / Versioned / Pulled / Reconciled — GitOps の核心

<!--
GitOpsの4原則を四象限ダイアグラムで解説します。
-->

---

# GitOps ワークフロー全体像

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">GitOps ワークフロー全体像</text>

  <!-- Developer -->
  <rect x="20" y="190" width="110" height="70" rx="10" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="75" y="220" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Developer</text>
  <text x="75" y="238" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">コード変更</text>

  <!-- Arrow 1 -->
  <line x1="130" y1="225" x2="168" y2="225" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="168,219 180,225 168,231" fill="#60a5fa"/>
  <text x="155" y="215" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">git push</text>

  <!-- Git Repo -->
  <rect x="180" y="185" width="120" height="80" rx="10" fill="#1a2e4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="240" y="218" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Git Repo</text>
  <text x="240" y="236" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">app/ infra/</text>
  <text x="240" y="252" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Single Source of Truth</text>

  <!-- Arrow 2 -->
  <line x1="300" y1="225" x2="338" y2="225" stroke="#34d399" stroke-width="2"/>
  <polygon points="338,219 350,225 338,231" fill="#34d399"/>
  <text x="319" y="215" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">trigger</text>

  <!-- CI Pipeline -->
  <rect x="350" y="170" width="120" height="110" rx="10" fill="#1a3a2e" stroke="#34d399" stroke-width="2"/>
  <text x="410" y="200" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">CI Pipeline</text>
  <text x="410" y="218" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Test / Build</text>
  <text x="410" y="234" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Docker Build</text>
  <text x="410" y="250" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Image Push</text>
  <text x="410" y="268" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Update manifest</text>

  <!-- Arrow 3 -->
  <line x1="470" y1="225" x2="508" y2="225" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="508,219 520,225 508,231" fill="#a78bfa"/>
  <text x="489" y="215" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">pull</text>

  <!-- CD / ArgoCD -->
  <rect x="520" y="185" width="130" height="80" rx="10" fill="#2a1a4a" stroke="#a78bfa" stroke-width="2"/>
  <text x="585" y="215" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="sans-serif">ArgoCD / Flux</text>
  <text x="585" y="233" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Reconcile Loop</text>
  <text x="585" y="250" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Drift Detection</text>

  <!-- Arrow 4 -->
  <line x1="650" y1="225" x2="688" y2="225" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="688,219 700,225 688,231" fill="#f59e0b"/>
  <text x="669" y="215" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">apply</text>

  <!-- Kubernetes -->
  <rect x="700" y="185" width="85" height="80" rx="10" fill="#2e2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="742" y="218" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold" font-family="sans-serif">K8s</text>
  <text x="742" y="236" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Cluster</text>
  <text x="742" y="252" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Deploy</text>

  <!-- Container Registry (below CI) -->
  <rect x="335" y="330" width="150" height="55" rx="10" fill="#1a2e2e" stroke="#34d399" stroke-width="1.5"/>
  <text x="410" y="356" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">Container Registry</text>
  <text x="410" y="374" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">ECR / GCR / GHCR</text>

  <!-- Arrow CI → Registry -->
  <line x1="410" y1="280" x2="410" y2="330" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="404,330 410,342 416,330" fill="#34d399"/>

  <!-- Arrow Registry → ArgoCD -->
  <line x1="485" y1="358" x2="570" y2="280" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="568,272 578,280 568,287" fill="#a78bfa"/>

  <!-- Feedback arrow: K8s status back -->
  <path d="M742 265 Q742 430 400 430 Q240 430 240 265" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.6"/>
  <polygon points="236,265 240,277 244,265" fill="#60a5fa" opacity="0.6"/>
  <text x="490" y="448" text-anchor="middle" fill="#60a5fa" font-size="10" font-family="sans-serif" opacity="0.8">Status Feedback / Audit Log</text>
</svg>
- Developer → Git → CI → CD Agent → K8s という一方向のフロー

<!--
GitOpsの全体的なワークフローを図解します。
-->

---

# Pull-based vs Push-based デプロイ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="32" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Pull-based vs Push-based デプロイ</text>

  <!-- Left: Push-based -->
  <rect x="30" y="50" width="350" height="400" rx="14" fill="#2e1a1a" stroke="#f472b6" stroke-width="2"/>
  <text x="205" y="85" text-anchor="middle" fill="#f472b6" font-size="15" font-weight="bold" font-family="sans-serif">Push-based</text>

  <!-- CI/CD box -->
  <rect x="55" y="100" width="120" height="50" rx="8" fill="#3b1f2e" stroke="#f472b6" stroke-width="1.5"/>
  <text x="115" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">CI/CD System</text>

  <!-- Arrow push out -->
  <line x1="175" y1="125" x2="225" y2="125" stroke="#f472b6" stroke-width="2"/>
  <polygon points="225,119 237,125 225,131" fill="#f472b6"/>
  <text x="200" y="115" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">kubectl apply</text>

  <!-- K8s cluster -->
  <rect x="237" y="100" width="120" height="50" rx="8" fill="#3b1f2e" stroke="#f472b6" stroke-width="1.5"/>
  <text x="297" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">K8s Cluster</text>

  <!-- Credentials warning -->
  <rect x="55" y="175" width="300" height="40" rx="6" fill="#4a1a1a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="205" y="200" text-anchor="middle" fill="#ef4444" font-size="12" font-family="sans-serif">クラスタ認証情報が CI に必要</text>

  <!-- Characteristics -->
  <text x="65" y="250" fill="#f9a8d4" font-size="12" font-family="sans-serif">特徴:</text>
  <text x="65" y="272" fill="#d1d5db" font-size="12" font-family="sans-serif">・外部システムがクラスタを直接操作</text>
  <text x="65" y="292" fill="#d1d5db" font-size="12" font-family="sans-serif">・kubeconfig をCIに保管する必要あり</text>
  <text x="65" y="312" fill="#d1d5db" font-size="12" font-family="sans-serif">・デプロイの失敗が外部から見えにくい</text>
  <text x="65" y="332" fill="#d1d5db" font-size="12" font-family="sans-serif">・Jenkins / GitHub Actions 等で多い</text>
  <text x="65" y="360" fill="#ef4444" font-size="12" font-family="sans-serif">リスク: 認証情報漏洩・設定ドリフト</text>
  <text x="65" y="380" fill="#ef4444" font-size="12" font-family="sans-serif">ドリフト検知なし・手動操作の混入</text>

  <!-- Right: Pull-based -->
  <rect x="420" y="50" width="350" height="400" rx="14" fill="#1a2e1a" stroke="#34d399" stroke-width="2"/>
  <text x="595" y="85" text-anchor="middle" fill="#34d399" font-size="15" font-weight="bold" font-family="sans-serif">Pull-based (GitOps)</text>

  <!-- Git Repo -->
  <rect x="445" y="100" width="100" height="50" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1.5"/>
  <text x="495" y="130" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Git Repo</text>

  <!-- Arrow pull -->
  <line x1="545" y1="125" x2="585" y2="125" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="585,119 597,125 585,131" fill="#34d399"/>
  <text x="565" y="115" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">watch &amp; pull</text>

  <!-- ArgoCD inside cluster -->
  <rect x="597" y="88" width="150" height="74" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1.5"/>
  <text x="672" y="112" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">ArgoCD / Flux</text>
  <text x="672" y="130" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">（クラスタ内部で動作）</text>
  <text x="672" y="148" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Reconcile Loop</text>

  <!-- Secure badge -->
  <rect x="445" y="175" width="300" height="40" rx="6" fill="#1a3a1a" stroke="#34d399" stroke-width="1.5"/>
  <text x="595" y="200" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">外部への認証情報不要（inbound のみ）</text>

  <!-- Characteristics -->
  <text x="455" y="250" fill="#6ee7b7" font-size="12" font-family="sans-serif">特徴:</text>
  <text x="455" y="272" fill="#d1d5db" font-size="12" font-family="sans-serif">・エージェントがクラスタ内で動作</text>
  <text x="455" y="292" fill="#d1d5db" font-size="12" font-family="sans-serif">・Git に push するだけでデプロイ完了</text>
  <text x="455" y="312" fill="#d1d5db" font-size="12" font-family="sans-serif">・ドリフトを自動検知・修復</text>
  <text x="455" y="332" fill="#d1d5db" font-size="12" font-family="sans-serif">・ArgoCD / Flux が代表実装</text>
  <text x="455" y="360" fill="#34d399" font-size="12" font-family="sans-serif">メリット: セキュリティ向上</text>
  <text x="455" y="380" fill="#34d399" font-size="12" font-family="sans-serif">自動 Self-healing・監査証跡が完全</text>

  <!-- VS badge -->
  <circle cx="400" cy="250" r="20" fill="#1a1a2e" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="256" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">VS</text>
</svg>
- GitOps は Pull-based — クラスタ内エージェントが安全に同期

<!--
PullベースとPushベースのデプロイ方式の違いを比較します。
-->

---

# Git as Single Source of Truth

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Git as Single Source of Truth</text>

  <!-- Central Git repo -->
  <rect x="300" y="190" width="200" height="110" rx="14" fill="#2d1b69" stroke="#a78bfa" stroke-width="3"/>
  <text x="400" y="235" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold" font-family="sans-serif">Git Repository</text>
  <text x="400" y="258" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">app manifests</text>
  <text x="400" y="278" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">infra configs / policies</text>

  <!-- Top: Developers -->
  <rect x="320" y="30" width="160" height="55" rx="10" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="58" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Developers</text>
  <text x="400" y="75" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">PR / Code Review</text>
  <line x1="400" y1="85" x2="400" y2="190" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="394,185 400,197 406,185" fill="#60a5fa"/>
  <text x="430" y="140" fill="#d1d5db" font-size="10" font-family="sans-serif">git push</text>

  <!-- Left: ArgoCD -->
  <rect x="60" y="210" width="160" height="55" rx="10" fill="#2a1a4a" stroke="#a78bfa" stroke-width="2"/>
  <text x="140" y="238" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="sans-serif">ArgoCD / Flux</text>
  <text x="140" y="256" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Reconcile Loop</text>
  <line x1="220" y1="237" x2="300" y2="245" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="295,239 307,245 295,251" fill="#a78bfa"/>
  <text x="255" y="228" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">pull</text>

  <!-- Right: Kubernetes -->
  <rect x="580" y="210" width="160" height="55" rx="10" fill="#2e2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="660" y="238" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold" font-family="sans-serif">K8s Cluster</text>
  <text x="660" y="256" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Running State</text>
  <line x1="500" y1="250" x2="580" y2="238" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="574,232 586,238 574,244" fill="#f59e0b"/>
  <text x="540" y="228" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">apply</text>

  <!-- Bottom-left: Security / Policy -->
  <rect x="80" y="370" width="160" height="55" rx="10" fill="#1a3a2e" stroke="#34d399" stroke-width="2"/>
  <text x="160" y="395" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">Policy / OPA</text>
  <text x="160" y="413" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Compliance Checks</text>
  <line x1="220" y1="397" x2="330" y2="300" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="324,294 336,300 324,306" fill="#34d399"/>

  <!-- Bottom-right: Observability -->
  <rect x="560" y="370" width="160" height="55" rx="10" fill="#1e2a1a" stroke="#34d399" stroke-width="2"/>
  <text x="640" y="395" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">Observability</text>
  <text x="640" y="413" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Metrics / Alerts</text>
  <line x1="600" y1="370" x2="480" y2="300" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="482,294 474,306 486,304" fill="#34d399"/>

  <!-- Bottom: CI Pipeline -->
  <rect x="320" y="370" width="160" height="55" rx="10" fill="#1a2e4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="395" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">CI Pipeline</text>
  <text x="400" y="413" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Test / Build / Notify</text>
  <line x1="400" y1="370" x2="400" y2="300" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="394,302 400,290 406,302" fill="#60a5fa"/>

  <!-- SSOT label -->
  <rect x="310" y="148" width="180" height="30" rx="6" fill="#3b2a6e" stroke="#a78bfa" stroke-width="1"/>
  <text x="400" y="168" text-anchor="middle" fill="#e9d5ff" font-size="11" font-family="sans-serif">Single Source of Truth</text>
</svg>
- Git リポジトリがすべてのコンポーネントの参照元となる

<!--
GitをSingle Source of Truthとして活用するアーキテクチャを説明します。
-->

---

<!-- _class: lead -->
# ツールチェーン

- Kubernetes・ArgoCD・Flux を中心とした実践的なスタック
- 次のセクションで各ツールを詳しく解説

<!--
ツールチェーンのセクションに入ります。
-->

---

# Kubernetes アーキテクチャ復習

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Kubernetes アーキテクチャ</text>

  <!-- Control Plane box -->
  <rect x="30" y="45" width="360" height="300" rx="14" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="210" y="72" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="sans-serif">Control Plane</text>

  <!-- API Server -->
  <rect x="55" y="85" width="145" height="50" rx="8" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="127" y="113" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold" font-family="sans-serif">API Server</text>

  <!-- etcd -->
  <rect x="220" y="85" width="145" height="50" rx="8" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="292" y="113" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold" font-family="sans-serif">etcd</text>
  <text x="292" y="128" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">（状態ストア）</text>

  <!-- Scheduler -->
  <rect x="55" y="155" width="145" height="50" rx="8" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="127" y="183" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold" font-family="sans-serif">Scheduler</text>

  <!-- Controller Manager -->
  <rect x="220" y="155" width="145" height="50" rx="8" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="292" y="180" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold" font-family="sans-serif">Controller Manager</text>

  <!-- Cloud Controller -->
  <rect x="55" y="225" width="310" height="50" rx="8" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="210" y="253" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold" font-family="sans-serif">Cloud Controller Manager</text>
  <text x="210" y="268" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">（クラウドプロバイダとの連携）</text>

  <!-- Control Plane label at bottom -->
  <text x="210" y="330" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif" opacity="0.8">kubectl / API → API Server経由で操作</text>

  <!-- Worker Node box -->
  <rect x="420" y="45" width="350" height="300" rx="14" fill="#1a2e1a" stroke="#34d399" stroke-width="2"/>
  <text x="595" y="72" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="sans-serif">Worker Node</text>

  <!-- kubelet -->
  <rect x="445" y="85" width="145" height="50" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1.5"/>
  <text x="517" y="113" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">kubelet</text>
  <text x="517" y="128" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Pod ライフサイクル管理</text>

  <!-- kube-proxy -->
  <rect x="608" y="85" width="145" height="50" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1.5"/>
  <text x="680" y="113" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">kube-proxy</text>
  <text x="680" y="128" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">ネットワーク規則</text>

  <!-- Container Runtime -->
  <rect x="445" y="155" width="310" height="50" rx="8" fill="#1f4a3a" stroke="#34d399" stroke-width="1.5"/>
  <text x="600" y="180" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">Container Runtime</text>
  <text x="600" y="198" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">containerd / CRI-O</text>

  <!-- Pods -->
  <rect x="445" y="225" width="145" height="50" rx="8" fill="#2a3a2a" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="517" y="250" text-anchor="middle" fill="#a7f3d0" font-size="12" font-family="sans-serif">Pod A</text>
  <text x="517" y="268" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">container(s)</text>

  <rect x="608" y="225" width="145" height="50" rx="8" fill="#2a3a2a" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="680" y="250" text-anchor="middle" fill="#a7f3d0" font-size="12" font-family="sans-serif">Pod B</text>
  <text x="680" y="268" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">container(s)</text>

  <text x="595" y="330" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif" opacity="0.8">複数ノードがクラスタを構成</text>

  <!-- kubectl (external) -->
  <rect x="290" y="390" width="220" height="55" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="417" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">kubectl / GitOps Agent</text>
  <text x="400" y="435" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">クラスタ操作 / 状態同期</text>

  <!-- Arrow from kubectl to API Server -->
  <line x1="340" y1="390" x2="210" y2="135" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,4"/>
  <polygon points="212,127 208,139 218,137" fill="#a78bfa"/>

  <!-- Arrow kubectl to Worker -->
  <line x1="460" y1="390" x2="595" y2="345" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.5"/>
</svg>
- Control Plane + Worker Node の二層構成で宣言的ワークロード管理を実現

<!--
GitOpsを理解するためのKubernetesアーキテクチャの基礎を復習します。
-->

---

# ArgoCD 概要

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">ArgoCD 概要</text>

  <!-- Central ArgoCD -->
  <rect x="300" y="185" width="200" height="100" rx="14" fill="#2d1b69" stroke="#a78bfa" stroke-width="3"/>
  <text x="400" y="225" text-anchor="middle" fill="#a78bfa" font-size="16" font-weight="bold" font-family="sans-serif">ArgoCD</text>
  <text x="400" y="248" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">GitOps CD for Kubernetes</text>
  <text x="400" y="268" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">CNCF Incubating</text>

  <!-- Feature 1: Git Sync -->
  <rect x="30" y="40" width="190" height="80" rx="10" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="125" y="68" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Git 自動同期</text>
  <text x="125" y="86" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">リポジトリを継続監視</text>
  <text x="125" y="104" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">差分を自動適用</text>
  <line x1="220" y1="80" x2="300" y2="210" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="296,204 308,210 296,216" fill="#60a5fa"/>

  <!-- Feature 2: Multi-cluster -->
  <rect x="580" y="40" width="190" height="80" rx="10" fill="#1a2e1a" stroke="#34d399" stroke-width="2"/>
  <text x="675" y="68" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">マルチクラスタ対応</text>
  <text x="675" y="86" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">複数 K8s クラスタを</text>
  <text x="675" y="104" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">一元管理</text>
  <line x1="580" y1="80" x2="500" y2="210" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="503,204 499,216 509,214" fill="#34d399"/>

  <!-- Feature 3: Web UI -->
  <rect x="30" y="250" width="190" height="80" rx="10" fill="#2e1a1a" stroke="#f472b6" stroke-width="2"/>
  <text x="125" y="278" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="bold" font-family="sans-serif">Web UI / CLI / API</text>
  <text x="125" y="296" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">直感的なダッシュボード</text>
  <text x="125" y="314" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">リアルタイム状態表示</text>
  <line x1="220" y1="290" x2="300" y2="265" stroke="#f472b6" stroke-width="1.5"/>
  <polygon points="296,259 308,265 296,271" fill="#f472b6"/>

  <!-- Feature 4: SSO / RBAC -->
  <rect x="580" y="250" width="190" height="80" rx="10" fill="#2e2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="675" y="278" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold" font-family="sans-serif">SSO / RBAC</text>
  <text x="675" y="296" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">OIDC / LDAP 連携</text>
  <text x="675" y="314" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">細かい権限管理</text>
  <line x1="580" y1="290" x2="500" y2="265" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="503,259 499,271 509,269" fill="#f59e0b"/>

  <!-- Feature 5: Rollback -->
  <rect x="140" y="400" width="190" height="80" rx="10" fill="#1a2e4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="235" y="428" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Rollback / 履歴管理</text>
  <text x="235" y="446" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">ワンクリックでロールバック</text>
  <text x="235" y="464" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">デプロイ履歴を可視化</text>
  <line x1="280" y1="400" x2="370" y2="285" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="369,277 373,289 381,283" fill="#60a5fa"/>

  <!-- Feature 6: Helm/Kustomize -->
  <rect x="470" y="400" width="190" height="80" rx="10" fill="#1a3a2e" stroke="#34d399" stroke-width="2"/>
  <text x="565" y="428" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">Helm / Kustomize</text>
  <text x="565" y="446" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">複数テンプレートエンジン</text>
  <text x="565" y="464" text-anchor="middle" fill="#d1d5db" font-size="11" font-family="sans-serif">サポート</text>
  <line x1="520" y1="400" x2="430" y2="285" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="428,277 424,289 434,287" fill="#34d399"/>
</svg>
- CNCF Incubating プロジェクト — GitOps CD の事実上の標準

<!--
ArgoCDの主要機能と特徴を概要図で解説します。
-->

---

# ArgoCD アーキテクチャ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">ArgoCD アーキテクチャ</text>

  <!-- ArgoCD boundary -->
  <rect x="160" y="50" width="480" height="320" rx="16" fill="#1e1a30" stroke="#a78bfa" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="400" y="75" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif" opacity="0.8">ArgoCD (クラスタ内)</text>

  <!-- API Server -->
  <rect x="195" y="90" width="150" height="60" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/>
  <text x="270" y="122" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">API Server</text>
  <text x="270" y="140" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">REST / gRPC</text>

  <!-- Repo Server -->
  <rect x="455" y="90" width="150" height="60" rx="10" fill="#1a2e4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="530" y="122" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold" font-family="sans-serif">Repo Server</text>
  <text x="530" y="140" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Git clone / render</text>

  <!-- Application Controller -->
  <rect x="250" y="210" width="300" height="60" rx="10" fill="#1a3a2e" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="243" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">Application Controller</text>
  <text x="400" y="260" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Reconcile / Sync / Health Check</text>

  <!-- Redis Cache -->
  <rect x="195" y="305" width="150" height="50" rx="10" fill="#2e1a1a" stroke="#f472b6" stroke-width="1.5"/>
  <text x="270" y="333" text-anchor="middle" fill="#f9a8d4" font-size="12" font-weight="bold" font-family="sans-serif">Redis Cache</text>
  <text x="270" y="348" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">状態キャッシュ</text>

  <!-- Dex (OIDC) -->
  <rect x="455" y="305" width="150" height="50" rx="10" fill="#2e2a1a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="530" y="333" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold" font-family="sans-serif">Dex (OIDC)</text>
  <text x="530" y="348" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">SSO 認証</text>

  <!-- Internal arrows -->
  <!-- API Server ↔ App Controller -->
  <line x1="320" y1="150" x2="330" y2="210" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="326,204 330,216 334,204" fill="#a78bfa"/>
  <!-- Repo Server ↔ App Controller -->
  <line x1="490" y1="150" x2="465" y2="210" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="462,204 465,216 469,204" fill="#60a5fa"/>
  <!-- App Controller ↔ Redis -->
  <line x1="330" y1="270" x2="290" y2="305" stroke="#f472b6" stroke-width="1.5"/>
  <polygon points="286,299 290,311 294,299" fill="#f472b6"/>
  <!-- API Server ↔ Dex -->
  <line x1="345" y1="150" x2="480" y2="305" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>

  <!-- External: Git Repo -->
  <rect x="545" y="400" width="150" height="55" rx="10" fill="#1e2a4a" stroke="#60a5fa" stroke-width="2"/>
  <text x="620" y="425" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">Git Repository</text>
  <text x="620" y="443" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Manifests / Helm</text>
  <line x1="590" y1="400" x2="555" y2="150" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,4"/>
  <polygon points="552,144 555,156 559,144" fill="#60a5fa"/>

  <!-- External: K8s API -->
  <rect x="100" y="400" width="150" height="55" rx="10" fill="#1a3a2e" stroke="#34d399" stroke-width="2"/>
  <text x="175" y="425" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">K8s API Server</text>
  <text x="175" y="443" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">リソース適用</text>
  <line x1="210" y1="400" x2="355" y2="270" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,4"/>
  <polygon points="353,262 357,274 361,262" fill="#34d399"/>

  <!-- External: User/kubectl -->
  <rect x="20" y="100" width="130" height="55" rx="10" fill="#2a1a4a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="85" y="125" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">User / CLI</text>
  <text x="85" y="143" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">Web UI / argocd</text>
  <line x1="150" y1="127" x2="195" y2="120" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="190,114 202,120 190,126" fill="#a78bfa"/>
</svg>
- API Server / Repo Server / Application Controller / Redis / Dex で構成

<!--
ArgoCDの内部コンポーネントと連携を詳しく説明します。
-->

---

# ArgoCD セットアップ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">ArgoCD セットアップ</text><rect x="80" y="60" width="640" height="70" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Developer Layer</text><text x="400" y="116" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">Self-service Portal · Golden Paths · Backstage Catalog</text><polygon points="394,132 406,132 400,148" fill="#60a5fa"/><rect x="80" y="155" width="640" height="70" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="190" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Platform Layer</text><text x="400" y="211" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">IDP · CI/CD · Observability · Security · Networking</text><polygon points="394,228 406,228 400,244" fill="#34d399"/><rect x="80" y="250" width="640" height="70" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="285" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Infrastructure Layer</text><text x="400" y="306" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">Kubernetes · Cloud Providers · On-Premise · IaC (Terraform)</text><rect x="80" y="340" width="640" height="44" rx="10" fill="#0f1f0f" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="367" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Team Topologies: Platform Team enables Stream-Aligned Teams</text></svg>
- Namespace 作成 → インストール → 初期パスワード取得 → ポートフォワード
- 最小 3 コマンドで動作確認まで完了

```bash
# 1. Namespace 作成 & インストール
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 2. 初期管理者パスワードを取得
kubectl get secret argocd-initial-admin-secret \
  -n argocd -o jsonpath="{.data.password}" | base64 -d

# 3. UI へポートフォワード
kubectl port-forward svc/argocd-server -n argocd 8080:443
# → https://localhost:8080  admin / <上記パスワード>

# (オプション) CLI ログイン
argocd login localhost:8080 --username admin --insecure
```

<!--
ArgoCDのインストールから初回アクセスまでの手順を示します。
-->

---

# Application 定義 (YAML)

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Application 定義 (YAML)</text><circle cx="400" cy="200" r="120" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="8,4"/><rect x="320" y="60" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Git Repository</text><polygon points="530,155 520,145 540,145" fill="#60a5fa"/><rect x="545" y="130" width="160" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="2"/><text x="625" y="155" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Desired State</text><polygon points="550,262 540,272 560,272" fill="#e91e63"/><rect x="545" y="270" width="160" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="625" y="300" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">Actual State</text><polygon points="268,270 258,260 278,260" fill="#34d399"/><rect x="95" y="270" width="160" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="175" y="295" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">Reconcile</text><text x="175" y="311" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Apply Diff</text><polygon points="255,148 265,138 245,138" fill="#a78bfa"/><rect x="95" y="130" width="160" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="175" y="155" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Observe</text><text x="175" y="171" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Watch Cluster</text><rect x="340" y="172" width="120" height="56" rx="8" fill="#0f3460" stroke="#ffffff" stroke-width="1.5"/><text x="400" y="198" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ArgoCD</text><text x="400" y="218" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Controller</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Continuous reconciliation loop — drift auto-healed within seconds</text></svg>
- ArgoCD Application CRD — リポジトリと同期先クラスタを宣言

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/app-manifests.git
    targetRevision: main
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true      # 削除されたリソースを自動除去
      selfHeal: true   # ドリフトを自動修復
    syncOptions:
      - CreateNamespace=true
```

<!--
ArgoCD Application CRDのYAML定義例。automated syncでGitOpsを完全自動化できます。
-->

---

# Flux vs ArgoCD 比較

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif">Flux vs ArgoCD 機能比較</text>

  <!-- Header row -->
  <rect x="30" y="45" width="240" height="42" rx="6" fill="#2d1b69" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="150" y="71" text-anchor="middle" fill="#e9d5ff" font-size="13" font-weight="bold" font-family="sans-serif">機能 / 特徴</text>

  <rect x="280" y="45" width="230" height="42" rx="6" fill="#1a3a5a" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="395" y="71" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold" font-family="sans-serif">ArgoCD</text>

  <rect x="520" y="45" width="250" height="42" rx="6" fill="#1a3a2e" stroke="#34d399" stroke-width="1.5"/>
  <text x="645" y="71" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold" font-family="sans-serif">Flux</text>

  <!-- Row data -->
  <!-- Row 1 -->
  <rect x="30" y="97" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="122" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">アーキテクチャ</text>
  <rect x="280" y="97" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="122" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">モノリシック (All-in-one)</text>
  <rect x="520" y="97" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="122" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">マイクロサービス (CRD)</text>

  <!-- Row 2 -->
  <rect x="30" y="145" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="170" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">Web UI</text>
  <rect x="280" y="145" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="170" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">あり（豊富）</text>
  <rect x="520" y="145" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="170" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="sans-serif">なし（別途 Weave GitOps）</text>

  <!-- Row 3 -->
  <rect x="30" y="193" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="218" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">マルチテナント</text>
  <rect x="280" y="193" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="218" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">RBAC で対応</text>
  <rect x="520" y="193" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="218" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">ネイティブ対応</text>

  <!-- Row 4 -->
  <rect x="30" y="241" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="266" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">Helm サポート</text>
  <rect x="280" y="241" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="266" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">あり</text>
  <rect x="520" y="241" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="266" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">あり (HelmRelease CRD)</text>

  <!-- Row 5 -->
  <rect x="30" y="289" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="314" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">SSO / OIDC</text>
  <rect x="280" y="289" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="314" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">組み込み (Dex)</text>
  <rect x="520" y="289" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="314" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="sans-serif">外部に委任</text>

  <!-- Row 6 -->
  <rect x="30" y="337" width="240" height="40" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="362" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">セットアップ難易度</text>
  <rect x="280" y="337" width="230" height="40" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="362" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="sans-serif">やや複雑</text>
  <rect x="520" y="337" width="250" height="40" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="362" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">シンプル (kubectl apply)</text>

  <!-- Row 7: Best for -->
  <rect x="30" y="385" width="240" height="55" rx="4" fill="#1e1a30" stroke="#a78bfa" stroke-width="1" opacity="0.6"/>
  <text x="150" y="417" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">向いているケース</text>
  <rect x="280" y="385" width="230" height="55" rx="4" fill="#1a2a40" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  <text x="395" y="407" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="sans-serif">UI重視・大規模チーム</text>
  <text x="395" y="427" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="sans-serif">多数クラスタ管理</text>
  <rect x="520" y="385" width="250" height="55" rx="4" fill="#1a2e20" stroke="#34d399" stroke-width="1" opacity="0.6"/>
  <text x="645" y="407" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">GitOps純粋主義・軽量</text>
  <text x="645" y="427" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">マルチテナント環境</text>
</svg>
- UI 重視なら ArgoCD、軽量・マルチテナントなら Flux が選択肢

<!--
FluxとArgoCDの機能比較マトリクスを解説します。ユースケースに応じて選択してください。
-->

---

# Helm + ArgoCD 統合

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Helm + ArgoCD 統合</text><rect x="280" y="55" width="240" height="55" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="82" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Developer Portal</text><text x="400" y="99" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Backstage / Custom UI</text><line x1="400" y1="110" x2="400" y2="140" stroke="#60a5fa" stroke-width="1.5"/><polygon points="394,138 406,138 400,150" fill="#60a5fa"/><rect x="250" y="150" width="300" height="55" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="177" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Platform API / Orchestrator</text><text x="400" y="194" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Crossplane · Backstage Scaffolder</text><line x1="160" y1="205" x2="250" y2="205" stroke="#34d399" stroke-width="1.5"/><line x1="550" y1="205" x2="640" y2="205" stroke="#34d399" stroke-width="1.5"/><polygon points="158,199 146,205 158,211" fill="#34d399"/><polygon points="642,199 654,205 642,211" fill="#34d399"/><rect x="50" y="175" width="130" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="115" y="202" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">CI/CD</text><text x="115" y="218" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">GitHub Actions</text><rect x="620" y="175" width="130" height="55" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="685" y="202" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">Observability</text><text x="685" y="218" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Grafana / OTel</text><line x1="320" y1="205" x2="320" y2="270" stroke="#e91e63" stroke-width="1.5"/><line x1="480" y1="205" x2="480" y2="270" stroke="#e91e63" stroke-width="1.5"/><polygon points="314,268 326,268 320,280" fill="#e91e63"/><polygon points="474,268 486,268 480,280" fill="#e91e63"/><rect x="200" y="280" width="160" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="280" y="307" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Kubernetes</text><text x="280" y="323" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Cluster Fleet</text><rect x="440" y="280" width="160" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="520" y="307" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Cloud Infra</text><text x="520" y="323" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">AWS / GCP / Azure</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">IDP abstracts complexity — developers focus on code, not infrastructure</text></svg>
- ArgoCD は Helm チャートを直接デプロイ可能
- Application リソースで `repoURL` と `chart` を指定
- `targetRevision` でチャートバージョンを固定
- values.yaml を Git で管理し GitOps と統合

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.example.com
    chart: my-app
    targetRevision: 1.2.3
    helm:
      valueFiles:
        - values.yaml
        - values-prod.yaml
      parameters:
        - name: image.tag
          value: v2.1.0
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```


---

# Kustomize + ArgoCD

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Kustomize + ArgoCD</text><rect x="30" y="70" width="140" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="100" y="98" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Developer</text><text x="100" y="116" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Selects Template</text><polygon points="172,100 187,94 187,106" fill="#60a5fa"/><line x1="170" y1="100" x2="189" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="195" y="70" width="160" height="60" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="275" y="98" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">Scaffolder</text><text x="275" y="116" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Backstage / Yeoman</text><polygon points="357,100 372,94 372,106" fill="#60a5fa"/><line x1="355" y1="100" x2="374" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="380" y="70" width="160" height="60" rx="10" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="460" y="98" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">Repo Created</text><text x="460" y="116" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Git + CI Config</text><polygon points="542,100 557,94 557,106" fill="#60a5fa"/><line x1="540" y1="100" x2="559" y2="100" stroke="#60a5fa" stroke-width="2"/><rect x="565" y="70" width="160" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="645" y="98" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Auto Deploy</text><text x="645" y="116" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">GitOps Pipeline</text><rect x="150" y="180" width="500" height="140" rx="10" fill="#0f2035" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="6,3"/><text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Golden Path Template Bundle</text><rect x="170" y="220" width="120" height="44" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="230" y="247" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Dockerfile</text><rect x="310" y="220" width="120" height="44" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="370" y="247" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">K8s Manifests</text><rect x="450" y="220" width="120" height="44" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="510" y="247" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">CI/CD YAML</text><rect x="170" y="278" width="120" height="30" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="230" y="298" text-anchor="middle" fill="#34d399" font-size="10" font-family="sans-serif">OTel Config</text><rect x="310" y="278" width="120" height="30" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="370" y="298" text-anchor="middle" fill="#34d399" font-size="10" font-family="sans-serif">RBAC Policy</text><rect x="450" y="278" width="120" height="30" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="510" y="298" text-anchor="middle" fill="#34d399" font-size="10" font-family="sans-serif">Secret Template</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">New service ready in minutes with all org standards pre-applied</text></svg>
- Kustomize はオーバーレイでリソースをカスタマイズ
- base/ + overlays/prod/ の構成で環境差分を管理
- ArgoCD は `kustomize` ソースタイプを自動検出

```yaml
# ディレクトリ構成
k8s/
  base/
    deployment.yaml
    service.yaml
    kustomization.yaml
  overlays/
    staging/
      kustomization.yaml   # patchesStrategicMerge
    production/
      kustomization.yaml
---
# ArgoCD Application (Kustomize)
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app-prod
spec:
  source:
    repoURL: https://github.com/org/repo
    path: k8s/overlays/production
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: production
```


---

<!-- _class: lead -->
# Infrastructure as Code

- インフラをコードで定義・管理するアプローチ
- 再現性・自動化・バージョン管理を実現


---

# IaC コンセプト全体像

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="40" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">IaC コンセプト全体像</text>

  <!-- Step 1: Code -->
  <rect x="40" y="90" width="160" height="90" rx="10" fill="#3b1f6e"/>
  <rect x="40" y="90" width="160" height="8" rx="4" fill="#a78bfa"/>
  <text x="120" y="130" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#a78bfa">コード</text>
  <text x="120" y="152" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">main.tf</text>
  <text x="120" y="170" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">variables.tf</text>

  <!-- Arrow 1 -->
  <line x1="200" y1="135" x2="258" y2="135" stroke="#a78bfa" stroke-width="2.5"/>
  <polygon points="258,128 270,135 258,142" fill="#a78bfa"/>

  <!-- Step 2: Version Control -->
  <rect x="270" y="90" width="160" height="90" rx="10" fill="#1e3a5f"/>
  <rect x="270" y="90" width="160" height="8" rx="4" fill="#60a5fa"/>
  <text x="350" y="130" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#60a5fa">バージョン管理</text>
  <text x="350" y="152" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bfdbfe">Git Repository</text>
  <text x="350" y="170" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bfdbfe">PR / Review</text>

  <!-- Arrow 2 -->
  <line x1="430" y1="135" x2="488" y2="135" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="488,128 500,135 488,142" fill="#60a5fa"/>

  <!-- Step 3: CI/CD Pipeline -->
  <rect x="500" y="90" width="160" height="90" rx="10" fill="#1a3a2e"/>
  <rect x="500" y="90" width="160" height="8" rx="4" fill="#34d399"/>
  <text x="580" y="130" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399">CI/CD</text>
  <text x="580" y="152" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a7f3d0">Validate</text>
  <text x="580" y="170" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a7f3d0">Plan / Apply</text>

  <!-- Arrow down from CI/CD -->
  <line x1="580" y1="180" x2="580" y2="240" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="573,240 580,252 587,240" fill="#34d399"/>

  <!-- Step 4: Provisioning -->
  <rect x="500" y="252" width="160" height="90" rx="10" fill="#2d1b4e"/>
  <rect x="500" y="252" width="160" height="8" rx="4" fill="#f59e0b"/>
  <text x="580" y="292" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f59e0b">プロビジョニング</text>
  <text x="580" y="314" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fde68a">Terraform</text>
  <text x="580" y="332" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fde68a">Pulumi</text>

  <!-- Arrow left from Provisioning -->
  <line x1="500" y1="297" x2="442" y2="297" stroke="#f59e0b" stroke-width="2.5"/>
  <polygon points="442,290 430,297 442,304" fill="#f59e0b"/>

  <!-- Step 5: Infrastructure -->
  <rect x="270" y="252" width="160" height="90" rx="10" fill="#1a2e40"/>
  <rect x="270" y="252" width="160" height="8" rx="4" fill="#38bdf8"/>
  <text x="350" y="292" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#38bdf8">インフラ</text>
  <text x="350" y="314" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bae6fd">VMs / K8s</text>
  <text x="350" y="332" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bae6fd">Network / DB</text>

  <!-- Arrow left from Infrastructure -->
  <line x1="270" y1="297" x2="212" y2="297" stroke="#38bdf8" stroke-width="2.5"/>
  <polygon points="212,290 200,297 212,304" fill="#38bdf8"/>

  <!-- Step 6: State / Feedback -->
  <rect x="40" y="252" width="160" height="90" rx="10" fill="#1f2d1a"/>
  <rect x="40" y="252" width="160" height="8" rx="4" fill="#86efac"/>
  <text x="120" y="292" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#86efac">State管理</text>
  <text x="120" y="314" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bbf7d0">tfstate</text>
  <text x="120" y="332" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bbf7d0">ドリフト検知</text>

  <!-- Arrow up from State back to Code (feedback loop) -->
  <line x1="120" y1="252" x2="120" y2="192" stroke="#86efac" stroke-width="1.5" stroke-dasharray="6,4"/>
  <polygon points="113,192 120,180 127,192" fill="#86efac"/>

  <!-- Benefits section at bottom -->
  <rect x="40" y="390" width="720" height="90" rx="8" fill="#111827" style="opacity:0.8"/>
  <text x="400" y="415" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">IaC の主なメリット</text>
  <text x="180" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">再現性・冪等性</text>
  <text x="350" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">バージョン管理・レビュー</text>
  <text x="530" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">自動化・スケール</text>
  <text x="700" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">監査・コンプライアンス</text>
  <text x="265" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">ドリフト防止</text>
  <text x="535" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">コスト管理</text>
</svg>
- コード → バージョン管理 → CI/CD → プロビジョニング → インフラ の一貫したフロー
- State ファイルが現在のインフラ状態を記録し、ドリフト検知に利用


---

# Terraform ワークフロー

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Terraform ワークフロー</text>

  <!-- Main flow: Write → Init → Plan → Apply → Destroy -->

  <!-- Write Code -->
  <rect x="30" y="100" width="130" height="80" rx="10" fill="#3b1f6e"/>
  <rect x="30" y="100" width="130" height="7" rx="4" fill="#a78bfa"/>
  <text x="95" y="135" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#a78bfa">Write</text>
  <text x="95" y="155" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">HCL コード記述</text>
  <text x="95" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">*.tf ファイル</text>

  <!-- Arrow Write→Init -->
  <line x1="160" y1="140" x2="200" y2="140" stroke="#a78bfa" stroke-width="2.5"/>
  <polygon points="200,133 212,140 200,147" fill="#a78bfa"/>

  <!-- Init -->
  <rect x="212" y="100" width="130" height="80" rx="10" fill="#1e3a5f"/>
  <rect x="212" y="100" width="130" height="7" rx="4" fill="#60a5fa"/>
  <text x="277" y="135" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#60a5fa">Init</text>
  <text x="277" y="155" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">プロバイダー初期化</text>
  <text x="277" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">terraform init</text>

  <!-- Arrow Init→Plan -->
  <line x1="342" y1="140" x2="382" y2="140" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="382,133 394,140 382,147" fill="#60a5fa"/>

  <!-- Plan -->
  <rect x="394" y="100" width="130" height="80" rx="10" fill="#1a3a2e"/>
  <rect x="394" y="100" width="130" height="7" rx="4" fill="#34d399"/>
  <text x="459" y="135" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#34d399">Plan</text>
  <text x="459" y="155" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">差分プレビュー</text>
  <text x="459" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">terraform plan</text>

  <!-- Arrow Plan→Apply -->
  <line x1="524" y1="140" x2="564" y2="140" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="564,133 576,140 564,147" fill="#34d399"/>

  <!-- Apply -->
  <rect x="576" y="100" width="130" height="80" rx="10" fill="#1a2a1a"/>
  <rect x="576" y="100" width="130" height="7" rx="4" fill="#86efac"/>
  <text x="641" y="135" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#86efac">Apply</text>
  <text x="641" y="155" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bbf7d0">リソース作成/更新</text>
  <text x="641" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bbf7d0">terraform apply</text>

  <!-- Divider line -->
  <line x1="40" y1="230" x2="760" y2="230" stroke="#374151" stroke-width="1" stroke-dasharray="6,4"/>

  <!-- Sub-flows below -->

  <!-- Plan detail box -->
  <rect x="310" y="255" width="260" height="110" rx="8" fill="#0f1f2e"/>
  <text x="440" y="278" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Plan 詳細</text>
  <text x="440" y="298" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">+ 追加リソース (green)</text>
  <text x="440" y="316" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">~ 変更リソース (yellow)</text>
  <text x="440" y="334" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">- 削除リソース (red)</text>
  <text x="440" y="354" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">レビュー後 Apply へ</text>

  <!-- Destroy box -->
  <rect x="576" y="255" width="170" height="110" rx="8" fill="#2d1215"/>
  <rect x="576" y="255" width="170" height="7" rx="4" fill="#f87171"/>
  <text x="661" y="285" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f87171">Destroy</text>
  <text x="661" y="305" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fca5a5">全リソース削除</text>
  <text x="661" y="323" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fca5a5">terraform destroy</text>
  <text x="661" y="345" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">注意: 本番環境</text>
  <text x="661" y="362" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">では慎重に</text>

  <!-- Arrow from Apply down to Destroy indicator -->
  <line x1="641" y1="180" x2="641" y2="255" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,4"/>

  <!-- State file explanation -->
  <rect x="40" y="255" width="260" height="110" rx="8" fill="#0f1f2e"/>
  <text x="170" y="278" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">State ファイル</text>
  <text x="170" y="298" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">terraform.tfstate</text>
  <text x="170" y="316" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">インフラの現状記録</text>
  <text x="170" y="334" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">S3 などにリモート保存</text>
  <text x="170" y="354" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">チーム共有に必須</text>

  <!-- Arrow from Apply to state -->
  <line x1="459" y1="180" x2="459" y2="230" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="459" y1="230" x2="170" y2="230" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="170" y1="230" x2="170" y2="255" stroke="#6b7280" stroke-width="1.5"/>

  <!-- Bottom note -->
  <rect x="40" y="390" width="720" height="80" rx="8" fill="#111827"/>
  <text x="400" y="415" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">推奨プラクティス</text>
  <text x="200" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">Plan 結果は必ずレビュー</text>
  <text x="400" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">State はリモートバックエンドに保存</text>
  <text x="620" y="440" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">-target は緊急時のみ</text>
  <text x="295" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">ロック機能でチーム競合防止</text>
  <text x="530" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">CI/CD で自動化推奨</text>
</svg>
- Write → Init → Plan → Apply の 4 ステップが基本サイクル
- Plan で変更内容を事前確認し、意図しない変更を防止


---

# Terraform 基本構文

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Terraform 基本構文</text><rect x="30" y="70" width="330" height="200" rx="12" fill="#0f2035" stroke="#60a5fa" stroke-width="2"/><text x="195" y="100" text-anchor="middle" fill="#60a5fa" font-size="14" font-weight="bold" font-family="sans-serif">Stream-Aligned Teams</text><rect x="55" y="115" width="130" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="120" y="143" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Team Alpha</text><rect x="210" y="115" width="130" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="275" y="143" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Team Beta</text><rect x="55" y="185" width="130" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="120" y="213" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Team Gamma</text><rect x="210" y="185" width="130" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/><text x="275" y="213" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Team Delta</text><text x="195" y="255" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Business value delivery</text><rect x="440" y="70" width="330" height="200" rx="12" fill="#1a2a0f" stroke="#34d399" stroke-width="2"/><text x="605" y="100" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif">Platform Team</text><rect x="490" y="115" width="230" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="605" y="140" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">IDP · CI/CD · Observability</text><rect x="490" y="175" width="230" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/><text x="605" y="200" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Security · Networking · IaC</text><text x="605" y="255" text-anchor="middle" fill="#a0a0b0" font-size="10" font-family="sans-serif">Platform capability delivery</text><line x1="365" y1="170" x2="440" y2="170" stroke="#f9a825" stroke-width="2"/><polygon points="438,164 450,170 438,176" fill="#f9a825"/><text x="402" y="162" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">X-as-a-Service</text><line x1="440" y1="190" x2="365" y2="190" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/><polygon points="367,184 355,190 367,196" fill="#e91e63"/><text x="402" y="207" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">Feedback</text><text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Team Topologies: Enabling — not blocking — collaboration model</text><text x="400" y="345" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Platform provides self-service APIs · Stream teams own product delivery</text></svg>
- main.tf でリソース定義、variables.tf で入力変数、outputs.tf で出力値を管理
- モジュール分割で再利用性を高める
- `terraform.tfvars` で環境別の変数値を上書き

```hcl
# main.tf
provider "aws" {
  region = var.region
}

resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type
  tags = { Name = var.name }
}

# variables.tf
variable "region"        { default = "ap-northeast-1" }
variable "ami_id"        { type    = string }
variable "instance_type" { default = "t3.micro" }
variable "name"          { type    = string }

# outputs.tf
output "instance_id" {
  value = aws_instance.web.id
}
output "public_ip" {
  value = aws_instance.web.public_ip
}
```


---

# OpenTofu 移行戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Terraform → OpenTofu 移行ロードマップ</text>

  <!-- Timeline bar -->
  <rect x="60" y="75" width="680" height="8" rx="4" fill="#374151"/>

  <!-- Phase 1 -->
  <circle cx="140" cy="79" r="14" fill="#a78bfa" stroke="#1a1a2e" stroke-width="2"/>
  <text x="140" y="84" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">1</text>
  <rect x="70" y="110" width="140" height="140" rx="8" fill="#3b1f6e"/>
  <text x="140" y="132" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">Phase 1</text>
  <text x="140" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">現状評価</text>
  <line x1="120" y1="162" x2="160" y2="162" stroke="#6b7280" stroke-width="1"/>
  <text x="140" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">バージョン確認</text>
  <text x="140" y="198" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">プロバイダー一覧</text>
  <text x="140" y="216" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">依存関係マップ</text>
  <text x="140" y="234" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">〜 Week 1</text>

  <!-- Arrow 1→2 -->
  <line x1="210" y1="79" x2="265" y2="79" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="265,73 277,79 265,85" fill="#60a5fa"/>

  <!-- Phase 2 -->
  <circle cx="300" cy="79" r="14" fill="#60a5fa" stroke="#1a1a2e" stroke-width="2"/>
  <text x="300" y="84" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">2</text>
  <rect x="230" y="110" width="140" height="140" rx="8" fill="#1e3a5f"/>
  <text x="300" y="132" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Phase 2</text>
  <text x="300" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">テスト環境移行</text>
  <line x1="280" y1="162" x2="320" y2="162" stroke="#6b7280" stroke-width="1"/>
  <text x="300" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">OpenTofu インストール</text>
  <text x="300" y="198" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">State 互換確認</text>
  <text x="300" y="216" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">CI/CD 更新</text>
  <text x="300" y="234" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">Week 2-3</text>

  <!-- Arrow 2→3 -->
  <line x1="370" y1="79" x2="425" y2="79" stroke="#34d399" stroke-width="2"/>
  <polygon points="425,73 437,79 425,85" fill="#34d399"/>

  <!-- Phase 3 -->
  <circle cx="460" cy="79" r="14" fill="#34d399" stroke="#1a1a2e" stroke-width="2"/>
  <text x="460" y="84" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">3</text>
  <rect x="390" y="110" width="140" height="140" rx="8" fill="#1a3a2e"/>
  <text x="460" y="132" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#34d399">Phase 3</text>
  <text x="460" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">ステージング検証</text>
  <line x1="440" y1="162" x2="480" y2="162" stroke="#6b7280" stroke-width="1"/>
  <text x="460" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">プロバイダー互換テスト</text>
  <text x="460" y="198" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">Plan/Apply 比較</text>
  <text x="460" y="216" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">チームトレーニング</text>
  <text x="460" y="234" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">Week 4-5</text>

  <!-- Arrow 3→4 -->
  <line x1="530" y1="79" x2="585" y2="79" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="585,73 597,79 585,85" fill="#f59e0b"/>

  <!-- Phase 4 -->
  <circle cx="620" cy="79" r="14" fill="#f59e0b" stroke="#1a1a2e" stroke-width="2"/>
  <text x="620" y="84" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">4</text>
  <rect x="550" y="110" width="140" height="140" rx="8" fill="#2d1f0a"/>
  <text x="620" y="132" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">Phase 4</text>
  <text x="620" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">本番移行</text>
  <line x1="600" y1="162" x2="640" y2="162" stroke="#6b7280" stroke-width="1"/>
  <text x="620" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fde68a">Blue/Green 切替</text>
  <text x="620" y="198" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fde68a">ロールバック準備</text>
  <text x="620" y="216" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fde68a">監視強化</text>
  <text x="620" y="234" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">Week 6+</text>

  <!-- Key differences section -->
  <rect x="60" y="280" width="680" height="90" rx="8" fill="#111827"/>
  <text x="400" y="304" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">Terraform vs OpenTofu — 主な違い</text>
  <text x="160" y="328" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">ライセンス</text>
  <text x="160" y="348" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">BSL → MPL-2.0</text>
  <text x="360" y="328" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">互換性</text>
  <text x="360" y="348" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">State / HCL 互換</text>
  <text x="560" y="328" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f59e0b">コミュニティ</text>
  <text x="560" y="348" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">Linux Foundation傘下</text>
  <text x="700" y="328" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f87171">差異</text>
  <text x="700" y="348" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">新機能・CLI差分</text>

  <!-- Risk indicators -->
  <rect x="60" y="395" width="680" height="80" rx="8" fill="#0d1117"/>
  <text x="400" y="418" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">移行リスク管理</text>
  <circle cx="115" cy="448" r="6" fill="#34d399"/>
  <text x="145" y="453" font-family="sans-serif" font-size="11" fill="#e5e7eb">低: State ファイル形式</text>
  <circle cx="300" cy="448" r="6" fill="#f59e0b"/>
  <text x="330" y="453" font-family="sans-serif" font-size="11" fill="#e5e7eb">中: プロバイダー互換性</text>
  <circle cx="495" cy="448" r="6" fill="#f87171"/>
  <text x="525" y="453" font-family="sans-serif" font-size="11" fill="#e5e7eb">高: カスタムプロバイダー</text>
  <text x="400" y="470" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">→ tofu コマンドは terraform と同等の構文を維持</text>
</svg>
- Terraform の BSL ライセンス問題に対応した OSS フォーク
- State ファイルと HCL 構文に互換性あり — 段階的移行が可能


---

# Pulumi vs Terraform 比較

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Pulumi vs Terraform 比較マトリクス</text>

  <!-- Table header -->
  <rect x="40" y="60" width="720" height="44" rx="6" fill="#2d1f4e"/>
  <text x="200" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">比較項目</text>
  <text x="450" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">Terraform / OpenTofu</text>
  <text x="670" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">Pulumi</text>

  <!-- Divider lines -->
  <line x1="340" y1="60" x2="340" y2="460" stroke="#374151" stroke-width="1"/>
  <line x1="560" y1="60" x2="560" y2="460" stroke="#374151" stroke-width="1"/>

  <!-- Row 1: Language -->
  <rect x="40" y="104" width="720" height="44" rx="0" fill="#111827"/>
  <text x="200" y="131" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">言語</text>
  <text x="450" y="131" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">HCL (独自DSL)</text>
  <text x="670" y="131" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">Python / TS / Go / .NET</text>

  <!-- Row 2: Learning Curve -->
  <rect x="40" y="148" width="720" height="44" rx="0" fill="#0d1117"/>
  <text x="200" y="175" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">学習コスト</text>
  <text x="450" y="175" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">低 (HCL シンプル)</text>
  <text x="670" y="175" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">中〜高 (汎用言語知識要)</text>

  <!-- Row 3: State -->
  <rect x="40" y="192" width="720" height="44" rx="0" fill="#111827"/>
  <text x="200" y="219" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">State 管理</text>
  <text x="450" y="219" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">tfstate (ローカル/S3等)</text>
  <text x="670" y="219" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">Pulumi Cloud / セルフホスト</text>

  <!-- Row 4: Ecosystem -->
  <rect x="40" y="236" width="720" height="44" rx="0" fill="#0d1117"/>
  <text x="200" y="263" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">エコシステム</text>
  <text x="450" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">広大 (Registry 充実)</text>
  <text x="670" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">成長中 (TF プロバイダー流用可)</text>

  <!-- Row 5: Testing -->
  <rect x="40" y="280" width="720" height="44" rx="0" fill="#111827"/>
  <text x="200" y="307" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">テスト</text>
  <text x="450" y="307" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">terraform test (1.6+)</text>
  <text x="670" y="307" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">言語ネイティブ (unittest等)</text>

  <!-- Row 6: Drift Detection -->
  <rect x="40" y="324" width="720" height="44" rx="0" fill="#0d1117"/>
  <text x="200" y="351" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">ドリフト検知</text>
  <text x="450" y="351" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">terraform plan</text>
  <text x="670" y="351" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">pulumi refresh</text>

  <!-- Row 7: Commercial -->
  <rect x="40" y="368" width="720" height="44" rx="0" fill="#111827"/>
  <text x="200" y="395" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e5e7eb">ライセンス</text>
  <text x="450" y="395" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#93c5fd">BSL (TF) / MPL (OTF)</text>
  <text x="670" y="395" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#6ee7b7">Apache 2.0</text>

  <!-- Bottom recommendation -->
  <rect x="40" y="420" width="720" height="60" rx="8" fill="#1f2d3d"/>
  <text x="400" y="443" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">選択基準</text>
  <text x="270" y="463" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bfdbfe">チームに運用経験あり → Terraform/OpenTofu</text>
  <text x="590" y="463" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a7f3d0">プログラミング重視 → Pulumi</text>

  <!-- Row borders -->
  <rect x="40" y="60" width="720" height="404" rx="6" fill="none" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="104" x2="760" y2="104" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="148" x2="760" y2="148" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="192" x2="760" y2="192" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="236" x2="760" y2="236" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="280" x2="760" y2="280" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="324" x2="760" y2="324" stroke="#374151" stroke-width="1"/>
  <line x1="40" y1="368" x2="760" y2="368" stroke="#374151" stroke-width="1"/>
</svg>
- Terraform は HCL によるシンプルさ、Pulumi は汎用言語での柔軟性が強み
- 既存チームのスキルセットと運用実績で選択する


---

# State 管理戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Terraform State 管理: S3 + DynamoDB</text>

  <!-- === TOP: Developers / CI ===-->
  <rect x="80" y="60" width="120" height="50" rx="8" fill="#3b1f6e"/>
  <text x="140" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa">開発者</text>
  <text x="140" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#c4b5fd">terraform apply</text>

  <rect x="330" y="60" width="140" height="50" rx="8" fill="#1e3a5f"/>
  <text x="400" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#60a5fa">CI/CD Pipeline</text>
  <text x="400" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">GitHub Actions</text>

  <rect x="600" y="60" width="120" height="50" rx="8" fill="#1a3a2e"/>
  <text x="660" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#34d399">Terraform CLI</text>
  <text x="660" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">plan / apply</text>

  <!-- Arrows from dev and CI/CD to TF CLI -->
  <line x1="200" y1="85" x2="598" y2="85" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="598,79 610,85 598,91" fill="#6b7280"/>
  <line x1="470" y1="85" x2="598" y2="85" stroke="#6b7280" stroke-width="1.5"/>

  <!-- Backend config -->
  <line x1="660" y1="110" x2="660" y2="165" stroke="#34d399" stroke-width="2"/>
  <polygon points="653,165 660,177 667,165" fill="#34d399"/>

  <!-- Backend box -->
  <rect x="190" y="177" width="440" height="70" rx="8" fill="#111827"/>
  <rect x="190" y="177" width="440" height="7" rx="4" fill="#60a5fa"/>
  <text x="410" y="205" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">Remote Backend 設定</text>
  <text x="410" y="228" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">backend "s3" &#123; bucket, key, region, dynamodb_table &#125;</text>

  <!-- Two boxes: S3 and DynamoDB -->
  <!-- Arrow to S3 -->
  <line x1="300" y1="247" x2="240" y2="300" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="233,296 240,310 247,298" fill="#f59e0b"/>

  <!-- Arrow to DynamoDB -->
  <line x1="520" y1="247" x2="570" y2="300" stroke="#f87171" stroke-width="2"/>
  <polygon points="563,297 570,310 577,298" fill="#f87171"/>

  <!-- S3 box -->
  <rect x="80" y="310" width="280" height="110" rx="10" fill="#2d2010"/>
  <rect x="80" y="310" width="280" height="8" rx="4" fill="#f59e0b"/>
  <text x="220" y="336" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f59e0b">S3 Bucket</text>
  <text x="220" y="358" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fde68a">terraform.tfstate 保存</text>
  <text x="220" y="378" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fde68a">バージョニング有効化</text>
  <text x="220" y="398" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fde68a">暗号化 (SSE-KMS)</text>
  <text x="220" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">パブリックアクセスブロック</text>

  <!-- DynamoDB box -->
  <rect x="440" y="310" width="280" height="110" rx="10" fill="#2d1515"/>
  <rect x="440" y="310" width="280" height="8" rx="4" fill="#f87171"/>
  <text x="580" y="336" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f87171">DynamoDB Table</text>
  <text x="580" y="358" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fca5a5">State ロック管理</text>
  <text x="580" y="378" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fca5a5">LockID (パーティションキー)</text>
  <text x="580" y="398" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fca5a5">同時実行競合防止</text>
  <text x="580" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">PAY_PER_REQUEST モード推奨</text>

  <!-- Lock flow annotation -->
  <rect x="80" y="440" width="640" height="44" rx="8" fill="#0d1117"/>
  <text x="400" y="457" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa">ロックフロー:</text>
  <text x="400" y="475" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">apply 開始 → DynamoDB にロック取得 → S3 で state 読書き → ロック解放</text>
</svg>
- S3 でバージョニング付き tfstate 保存、DynamoDB で排他ロック管理
- チーム開発ではリモートバックエンドが必須


---

# モジュール設計パターン

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Terraform モジュール 階層設計</text>

  <!-- Root Module at top -->
  <rect x="280" y="55" width="240" height="65" rx="10" fill="#3b1f6e"/>
  <rect x="280" y="55" width="240" height="8" rx="4" fill="#a78bfa"/>
  <text x="400" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">Root Module</text>
  <text x="400" y="102" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">environments/prod/main.tf</text>

  <!-- Arrows from root to infrastructure modules -->
  <line x1="340" y1="120" x2="200" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="193,171 200,185 207,172" fill="#a78bfa"/>

  <line x1="400" y1="120" x2="400" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="393,175 400,187 407,175" fill="#a78bfa"/>

  <line x1="460" y1="120" x2="600" y2="175" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="593,172 600,185 607,171" fill="#a78bfa"/>

  <!-- Infrastructure Modules (Level 2) -->
  <!-- Network Module -->
  <rect x="80" y="185" width="180" height="65" rx="8" fill="#1e3a5f"/>
  <rect x="80" y="185" width="180" height="7" rx="4" fill="#60a5fa"/>
  <text x="170" y="208" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Network Module</text>
  <text x="170" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">modules/network</text>
  <text x="170" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">VPC / Subnet / GW</text>

  <!-- Compute Module -->
  <rect x="310" y="185" width="180" height="65" rx="8" fill="#1e3a5f"/>
  <rect x="310" y="185" width="180" height="7" rx="4" fill="#60a5fa"/>
  <text x="400" y="208" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Compute Module</text>
  <text x="400" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">modules/compute</text>
  <text x="400" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">EC2 / ASG / LB</text>

  <!-- Database Module -->
  <rect x="540" y="185" width="180" height="65" rx="8" fill="#1e3a5f"/>
  <rect x="540" y="185" width="180" height="7" rx="4" fill="#60a5fa"/>
  <text x="630" y="208" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#60a5fa">Database Module</text>
  <text x="630" y="228" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">modules/database</text>
  <text x="630" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">RDS / ElastiCache</text>

  <!-- Arrows to submodules -->
  <!-- Network → security -->
  <line x1="140" y1="250" x2="120" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="113,302 120,315 127,303" fill="#34d399"/>

  <!-- Network → dns -->
  <line x1="200" y1="250" x2="220" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="213,303 220,315 227,302" fill="#34d399"/>

  <!-- Compute → eks -->
  <line x1="370" y1="250" x2="340" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="333,302 340,315 347,303" fill="#34d399"/>

  <!-- Compute → iam -->
  <line x1="430" y1="250" x2="460" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="453,303 460,315 467,302" fill="#34d399"/>

  <!-- Database → rds -->
  <line x1="600" y1="250" x2="570" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="563,302 570,315 577,303" fill="#34d399"/>

  <!-- Database → redis -->
  <line x1="660" y1="250" x2="680" y2="305" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="673,303 680,315 687,302" fill="#34d399"/>

  <!-- Sub-modules (Level 3) -->
  <rect x="60" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="115" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">security-group</text>
  <text x="115" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">SG rules</text>

  <rect x="185" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="240" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">route53</text>
  <text x="240" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">DNS zones</text>

  <rect x="290" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="345" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">eks-cluster</text>
  <text x="345" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">K8s cluster</text>

  <rect x="415" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="470" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">iam-roles</text>
  <text x="470" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">IRSA / SA</text>

  <rect x="540" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="595" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">rds-cluster</text>
  <text x="595" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">Aurora / RDS</text>

  <rect x="665" y="315" width="110" height="50" rx="6" fill="#1a3a2e"/>
  <text x="720" y="337" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">elasticache</text>
  <text x="720" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a7f3d0">Redis cluster</text>

  <!-- Best practices at bottom -->
  <rect x="40" y="390" width="720" height="90" rx="8" fill="#111827"/>
  <text x="400" y="413" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">モジュール設計原則</text>
  <text x="160" y="438" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">単一責任</text>
  <text x="160" y="456" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">1 module = 1 concern</text>
  <text x="320" y="438" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">バージョン固定</text>
  <text x="320" y="456" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">source = "git::...?ref=v1.2"</text>
  <text x="510" y="438" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">変数・出力</text>
  <text x="510" y="456" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">明確な variables / outputs</text>
  <text x="680" y="438" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e5e7eb">テスト</text>
  <text x="680" y="456" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">terratest 活用</text>
</svg>
- Root → Infrastructure → Sub-module の 3 階層でコンポーネントを整理
- 単一責任・バージョン固定・明確な変数/出力 がモジュール設計の原則


---

# ドリフト検知と修復

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">ドリフト検知と修復フロー</text>

  <!-- Step 1: Scheduled Scan -->
  <rect x="290" y="60" width="220" height="65" rx="10" fill="#1e3a5f"/>
  <rect x="290" y="60" width="220" height="8" rx="4" fill="#60a5fa"/>
  <text x="400" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">定期スキャン</text>
  <text x="400" y="108" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#bfdbfe">terraform plan (cron / ArgoCD)</text>

  <!-- Arrow down -->
  <line x1="400" y1="125" x2="400" y2="170" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="393,170 400,182 407,170" fill="#60a5fa"/>

  <!-- Step 2: Drift Detection Diamond -->
  <polygon points="400,182 480,222 400,262 320,222" fill="#2d1f4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="218" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#a78bfa">ドリフト</text>
  <text x="400" y="236" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2d9f3">検出？</text>

  <!-- No branch → right → no action -->
  <line x1="480" y1="222" x2="580" y2="222" stroke="#34d399" stroke-width="2"/>
  <polygon points="580,215 592,222 580,229" fill="#34d399"/>
  <rect x="592" y="195" width="140" height="54" rx="8" fill="#1a3a2e"/>
  <text x="662" y="220" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#34d399">ドリフトなし</text>
  <text x="662" y="238" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">正常完了</text>
  <text x="536" y="215" font-family="sans-serif" font-size="11" fill="#34d399">No</text>

  <!-- Yes branch → down -->
  <line x1="400" y1="262" x2="400" y2="305" stroke="#f87171" stroke-width="2.5"/>
  <polygon points="393,305 400,317 407,305" fill="#f87171"/>
  <text x="380" y="290" font-family="sans-serif" font-size="11" fill="#f87171">Yes</text>

  <!-- Step 3: Alert -->
  <rect x="290" y="317" width="220" height="60" rx="10" fill="#2d1215"/>
  <rect x="290" y="317" width="220" height="7" rx="4" fill="#f87171"/>
  <text x="400" y="342" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f87171">アラート送信</text>
  <text x="400" y="360" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fca5a5">Slack / PagerDuty / OpsGenie</text>

  <!-- Arrow down -->
  <line x1="400" y1="377" x2="400" y2="405" stroke="#f59e0b" stroke-width="2.5"/>
  <polygon points="393,405 400,417 407,405" fill="#f59e0b"/>

  <!-- Step 4: Decision diamond -->
  <polygon points="400,417 470,450 400,483 330,450" fill="#2d2010" stroke="#f59e0b" stroke-width="2"/>
  <text x="400" y="447" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">自動修復</text>
  <text x="400" y="462" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fde68a">可能？</text>

  <!-- Yes → auto fix left -->
  <line x1="330" y1="450" x2="225" y2="450" stroke="#34d399" stroke-width="2"/>
  <polygon points="225,443 213,450 225,457" fill="#34d399"/>
  <rect x="80" y="425" width="133" height="50" rx="8" fill="#1a3a2e"/>
  <text x="147" y="447" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">terraform apply</text>
  <text x="147" y="465" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">自動修復</text>
  <text x="277" y="443" font-family="sans-serif" font-size="11" fill="#34d399">Yes</text>

  <!-- No → manual right -->
  <line x1="470" y1="450" x2="570" y2="450" stroke="#f87171" stroke-width="2"/>
  <polygon points="570,443 582,450 570,457" fill="#f87171"/>
  <rect x="582" y="425" width="150" height="50" rx="8" fill="#2d1215"/>
  <text x="657" y="447" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f87171">手動対応</text>
  <text x="657" y="465" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fca5a5">インシデント起票</text>
  <text x="472" y="443" font-family="sans-serif" font-size="11" fill="#f87171">No</text>

  <!-- Side annotations -->
  <rect x="30" y="60" width="220" height="115" rx="8" fill="#111827"/>
  <text x="140" y="83" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">ドリフト検知ツール</text>
  <text x="50" y="105" font-family="sans-serif" font-size="11" fill="#e5e7eb">• terraform plan -detailed-exitcode</text>
  <text x="50" y="123" font-family="sans-serif" font-size="11" fill="#e5e7eb">• Atlantis (PR-based plan)</text>
  <text x="50" y="141" font-family="sans-serif" font-size="11" fill="#e5e7eb">• Driftctl / Infracost</text>
  <text x="50" y="159" font-family="sans-serif" font-size="11" fill="#e5e7eb">• ArgoCD (K8s drift)</text>

  <rect x="548" y="60" width="220" height="115" rx="8" fill="#111827"/>
  <text x="658" y="83" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#60a5fa">修復戦略</text>
  <text x="568" y="105" font-family="sans-serif" font-size="11" fill="#e5e7eb">• import でコード化</text>
  <text x="568" y="123" font-family="sans-serif" font-size="11" fill="#e5e7eb">• 手動変更を禁止 (IaC only)</text>
  <text x="568" y="141" font-family="sans-serif" font-size="11" fill="#e5e7eb">• Override よりコード修正優先</text>
  <text x="568" y="159" font-family="sans-serif" font-size="11" fill="#e5e7eb">• 定期的な state refresh</text>
</svg>
- 定期的な terraform plan でドリフトを自動検出し、Slack アラートで通知
- 手動変更の禁止と IaC のみによる修復フローを徹底する


---

<!-- _class: lead -->
# Internal Developer Platform

- 開発者が自律的にインフラ・デプロイを操作できる基盤
- セルフサービスポータルで認知負荷を大幅に削減


---

# IDP コンセプト図

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Internal Developer Platform (IDP) 全体像</text>

  <!-- === LEFT: Developer ===-->
  <rect x="20" y="170" width="120" height="160" rx="10" fill="#3b1f6e"/>
  <rect x="20" y="170" width="120" height="8" rx="4" fill="#a78bfa"/>
  <!-- Developer icon (simplified) -->
  <circle cx="80" cy="210" r="18" fill="#a78bfa" style="opacity:0.3"/>
  <circle cx="80" cy="203" r="10" fill="#a78bfa"/>
  <rect x="60" y="216" width="40" height="20" rx="6" fill="#a78bfa"/>
  <text x="80" y="250" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#a78bfa">開発者</text>
  <text x="80" y="268" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e2d9f3">コード書く</text>
  <text x="80" y="284" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e2d9f3">デプロイ依頼</text>
  <text x="80" y="300" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e2d9f3">環境管理</text>

  <!-- Arrow Developer → Portal -->
  <line x1="140" y1="250" x2="188" y2="250" stroke="#a78bfa" stroke-width="2.5"/>
  <polygon points="188,243 200,250 188,257" fill="#a78bfa"/>

  <!-- === CENTER: Self-Service Portal ===-->
  <rect x="200" y="100" width="260" height="300" rx="12" fill="#111827"/>
  <rect x="200" y="100" width="260" height="10" rx="6" fill="#60a5fa"/>
  <text x="330" y="128" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">セルフサービスポータル</text>
  <text x="330" y="147" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9ca3af">Backstage / Port / Cortex</text>

  <!-- Portal items -->
  <rect x="216" y="158" width="228" height="38" rx="6" fill="#1e3a5f"/>
  <text x="330" y="183" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">サービスカタログ</text>

  <rect x="216" y="204" width="228" height="38" rx="6" fill="#1e3a5f"/>
  <text x="330" y="229" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">環境プロビジョニング</text>

  <rect x="216" y="250" width="228" height="38" rx="6" fill="#1e3a5f"/>
  <text x="330" y="275" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">ドキュメント / API</text>

  <rect x="216" y="296" width="228" height="38" rx="6" fill="#1e3a5f"/>
  <text x="330" y="321" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">デプロイパイプライン</text>

  <rect x="216" y="342" width="228" height="38" rx="6" fill="#1e3a5f"/>
  <text x="330" y="367" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">監視 / コスト可視化</text>

  <!-- Arrow Portal → Infrastructure -->
  <line x1="460" y1="250" x2="508" y2="250" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="508,243 520,250 508,257" fill="#60a5fa"/>

  <!-- === RIGHT: Infrastructure ===-->
  <rect x="520" y="80" width="260" height="340" rx="12" fill="#0d1117"/>
  <rect x="520" y="80" width="260" height="10" rx="6" fill="#34d399"/>
  <text x="650" y="108" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">インフラ層</text>

  <!-- Infrastructure items -->
  <rect x="536" y="118" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="141" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">Kubernetes (EKS/GKE)</text>

  <rect x="536" y="162" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">CI/CD (GitHub Actions)</text>

  <rect x="536" y="206" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="229" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">IaC (Terraform/Pulumi)</text>

  <rect x="536" y="250" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="273" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">Secrets (Vault/AWS SM)</text>

  <rect x="536" y="294" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="317" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">Observability (Datadog)</text>

  <rect x="536" y="338" width="228" height="36" rx="6" fill="#1a3a2e"/>
  <text x="650" y="361" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">クラウド (AWS/GCP/Azure)</text>

  <!-- Value labels at bottom -->
  <rect x="20" y="450" width="760" height="38" rx="8" fill="#1f2d3d"/>
  <text x="400" y="465" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">IDPの価値:</text>
  <text x="400" y="480" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">認知負荷軽減 / 開発速度向上 / セキュリティ標準化 / コスト管理 / オンボーディング短縮</text>
</svg>
- 開発者 → セルフサービスポータル → インフラ層 の三層アーキテクチャ
- Backstage / Port / Cortex が代表的な IDP 実装


---

# Backstage アーキテクチャ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Backstage アーキテクチャ</text>

  <!-- Core box: Frontend (React) -->
  <rect x="270" y="60" width="260" height="60" rx="10" fill="#2d1f4e"/>
  <rect x="270" y="60" width="260" height="8" rx="4" fill="#a78bfa"/>
  <text x="400" y="86" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">Frontend (React App)</text>
  <text x="400" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">プラグインベース UI / @backstage/core</text>

  <!-- Arrow down to backend -->
  <line x1="400" y1="120" x2="400" y2="160" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="393,160 400,172 407,160" fill="#a78bfa"/>

  <!-- Backend (Node.js) -->
  <rect x="270" y="172" width="260" height="60" rx="10" fill="#1e3a5f"/>
  <rect x="270" y="172" width="260" height="8" rx="4" fill="#60a5fa"/>
  <text x="400" y="198" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">Backend (Node.js)</text>
  <text x="400" y="220" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">Plugin APIs / REST / GraphQL</text>

  <!-- Arrow down to catalog -->
  <line x1="400" y1="232" x2="400" y2="272" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="393,272 400,284 407,272" fill="#60a5fa"/>

  <!-- Catalog DB -->
  <rect x="270" y="284" width="260" height="55" rx="10" fill="#1a3a2e"/>
  <rect x="270" y="284" width="260" height="8" rx="4" fill="#34d399"/>
  <text x="400" y="308" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">Software Catalog (DB)</text>
  <text x="400" y="328" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">Entities: Component / API / System</text>

  <!-- Plugin boxes left side -->
  <!-- Arrow left from backend -->
  <line x1="270" y1="202" x2="220" y2="202" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="220" y1="202" x2="220" y2="370" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="220" y1="300" x2="160" y2="300" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="160,293 148,300 160,307" fill="#6b7280"/>

  <line x1="220" y1="360" x2="160" y2="360" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="160,353 148,360 160,367" fill="#6b7280"/>

  <line x1="220" y1="230" x2="160" y2="230" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="160,223 148,230 160,237" fill="#6b7280"/>

  <!-- Left plugins -->
  <rect x="30" y="210" width="120" height="40" rx="6" fill="#2d1f4e"/>
  <text x="90" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">TechDocs Plugin</text>

  <rect x="30" y="278" width="120" height="40" rx="6" fill="#2d1f4e"/>
  <text x="90" y="303" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">Search Plugin</text>

  <rect x="30" y="340" width="120" height="40" rx="6" fill="#2d1f4e"/>
  <text x="90" y="365" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">GitHub Plugin</text>

  <!-- Plugin boxes right side -->
  <line x1="530" y1="202" x2="580" y2="202" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="580" y1="202" x2="580" y2="370" stroke="#6b7280" stroke-width="1.5"/>
  <line x1="580" y1="230" x2="640" y2="230" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="640,223 652,230 640,237" fill="#6b7280"/>
  <line x1="580" y1="300" x2="640" y2="300" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="640,293 652,300 640,307" fill="#6b7280"/>
  <line x1="580" y1="360" x2="640" y2="360" stroke="#6b7280" stroke-width="1.5"/>
  <polygon points="640,353 652,360 640,367" fill="#6b7280"/>

  <!-- Right plugins -->
  <rect x="652" y="210" width="120" height="40" rx="6" fill="#1e3a5f"/>
  <text x="712" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Kubernetes Plugin</text>

  <rect x="652" y="278" width="120" height="40" rx="6" fill="#1e3a5f"/>
  <text x="712" y="303" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Scaffolder Plugin</text>

  <rect x="652" y="340" width="120" height="40" rx="6" fill="#1e3a5f"/>
  <text x="712" y="365" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">Cost Insights</text>

  <!-- catalog-info.yaml sources at bottom -->
  <rect x="30" y="420" width="740" height="62" rx="8" fill="#111827"/>
  <text x="400" y="443" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">エンティティ登録: catalog-info.yaml</text>
  <text x="200" y="465" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">apiVersion: backstage.io/v1alpha1</text>
  <text x="480" y="465" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e5e7eb">kind: Component / API / System / Group / User</text>
  <text x="400" y="477" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9ca3af">Git リポジトリに置くと自動インポート</text>
</svg>
- React フロントエンド + Node.js バックエンド + Software Catalog DB の構成
- プラグインシステムで TechDocs / Kubernetes / Scaffolder などを拡張


---

# サービスカタログ設計

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Backstage サービスカタログ: エンティティ関係</text>

  <!-- Domain -->
  <rect x="300" y="55" width="200" height="55" rx="10" fill="#2d1f4e"/>
  <rect x="300" y="55" width="200" height="8" rx="4" fill="#a78bfa"/>
  <text x="400" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#a78bfa">Domain</text>
  <text x="400" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">ビジネスドメイン全体</text>

  <!-- Arrow Domain → System -->
  <line x1="400" y1="110" x2="400" y2="148" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="393,148 400,160 407,148" fill="#a78bfa"/>
  <text x="415" y="135" font-family="sans-serif" font-size="10" fill="#9ca3af">contains</text>

  <!-- System -->
  <rect x="300" y="160" width="200" height="55" rx="10" fill="#1e3a5f"/>
  <rect x="300" y="160" width="200" height="8" rx="4" fill="#60a5fa"/>
  <text x="400" y="185" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60a5fa">System</text>
  <text x="400" y="205" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bfdbfe">関連コンポーネントの集合</text>

  <!-- Arrows from System to Component and API -->
  <line x1="340" y1="215" x2="220" y2="270" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="213,267 220,280 227,268" fill="#60a5fa"/>

  <line x1="460" y1="215" x2="580" y2="270" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="573,267 580,280 587,268" fill="#60a5fa"/>

  <text x="258" y="252" font-family="sans-serif" font-size="10" fill="#9ca3af">provides</text>
  <text x="520" y="252" font-family="sans-serif" font-size="10" fill="#9ca3af">provides</text>

  <!-- Component -->
  <rect x="100" y="280" width="200" height="55" rx="10" fill="#1a3a2e"/>
  <rect x="100" y="280" width="200" height="8" rx="4" fill="#34d399"/>
  <text x="200" y="305" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399">Component</text>
  <text x="200" y="325" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">service / website / library</text>

  <!-- API -->
  <rect x="500" y="280" width="200" height="55" rx="10" fill="#1a2d40"/>
  <rect x="500" y="280" width="200" height="8" rx="4" fill="#38bdf8"/>
  <text x="600" y="305" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8">API</text>
  <text x="600" y="325" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#bae6fd">openapi / graphql / grpc</text>

  <!-- Component ↔ API (dependsOn) -->
  <line x1="300" y1="310" x2="500" y2="310" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="500,303 512,310 500,317" fill="#6b7280"/>
  <text x="400" y="302" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9ca3af">dependsOn / consumesApi</text>

  <!-- Group and User (bottom left) -->
  <rect x="100" y="390" width="160" height="50" rx="8" fill="#2d1f4e"/>
  <text x="180" y="412" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa">Group</text>
  <text x="180" y="430" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">チーム / 組織</text>

  <rect x="280" y="390" width="160" height="50" rx="8" fill="#2d1f4e"/>
  <text x="360" y="412" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa">User</text>
  <text x="360" y="430" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2d9f3">個人メンバー</text>

  <!-- Component → Owner (Group) -->
  <line x1="180" y1="390" x2="180" y2="340" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="173,340 180,328 187,340" fill="#a78bfa"/>
  <text x="110" y="368" font-family="sans-serif" font-size="10" fill="#9ca3af">owner</text>

  <!-- Resource box -->
  <rect x="500" y="390" width="200" height="50" rx="8" fill="#1a3a2e"/>
  <text x="600" y="412" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">Resource</text>
  <text x="600" y="430" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a7f3d0">DB / S3 / Queue</text>

  <!-- Component → Resource -->
  <line x1="560" y1="390" x2="260" y2="340" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="253,336 260,326 267,340" fill="#34d399"/>
  <text x="450" y="372" font-family="sans-serif" font-size="10" fill="#9ca3af">dependsOn</text>

  <!-- Legend at bottom right -->
  <rect x="590" y="455" width="180" height="32" rx="6" fill="#111827"/>
  <line x1="600" y1="471" x2="630" y2="471" stroke="#6b7280" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="640" y="475" font-family="sans-serif" font-size="11" fill="#9ca3af">関連 (relation)</text>
  <line x1="600" y1="487" x2="630" y2="487" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="630,481 642,487 630,493" fill="#60a5fa"/>
  <!-- (note: second line needs another approach since we already have polygon) -->
</svg>
- Domain → System → Component / API の階層でサービスを分類・管理
- catalog-info.yaml を各リポジトリに置くと自動インポートされる


---

# セルフサービスポータル

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">セルフサービスポータル — リソース取得フロー</text>

  <!-- Developer box -->
  <rect x="30" y="80" width="130" height="70" rx="10" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="95" y="112" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa" font-weight="bold">👩‍💻 Developer</text>
  <text x="95" y="132" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff">リクエスト送信</text>

  <!-- Arrow 1 -->
  <line x1="162" y1="115" x2="208" y2="115" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="208,110 218,115 208,120" fill="#60a5fa"/>

  <!-- Self-Service Portal box -->
  <rect x="220" y="75" width="150" height="80" rx="10" fill="#2d2d4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="295" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#60a5fa" font-weight="bold">🖥️ セルフサービス</text>
  <text x="295" y="126" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#60a5fa" font-weight="bold">ポータル</text>
  <text x="295" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">(Backstage / Custom)</text>

  <!-- Arrow 2 -->
  <line x1="372" y1="115" x2="418" y2="115" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="418,110 428,115 418,120" fill="#60a5fa"/>

  <!-- Automation Engine box -->
  <rect x="430" y="75" width="150" height="80" rx="10" fill="#2d2d4e" stroke="#34d399" stroke-width="2"/>
  <text x="505" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#34d399" font-weight="bold">⚙️ Automation</text>
  <text x="505" y="126" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#34d399" font-weight="bold">Engine</text>
  <text x="505" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">(Crossplane / TF)</text>

  <!-- Arrow 3 -->
  <line x1="582" y1="115" x2="628" y2="115" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="628,110 638,115 628,120" fill="#60a5fa"/>

  <!-- Cloud Resources box -->
  <rect x="640" y="75" width="130" height="80" rx="10" fill="#2d2d4e" stroke="#fbbf24" stroke-width="2"/>
  <text x="705" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">☁️ Cloud</text>
  <text x="705" y="126" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">Resources</text>
  <text x="705" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">DB / K8s / Network</text>

  <!-- Divider -->
  <line x1="30" y1="210" x2="770" y2="210" stroke="#444466" stroke-width="1" stroke-dasharray="5,4"/>

  <!-- Section: Steps detail -->
  <text x="400" y="235" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#a78bfa" font-weight="bold">詳細ステップ</text>

  <!-- Step boxes row -->
  <!-- Step 1 -->
  <rect x="30" y="255" width="145" height="90" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="102" y="278" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">① テンプレート選択</text>
  <text x="102" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">カタログから</text>
  <text x="102" y="314" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">サービステンプレートを</text>
  <text x="102" y="330" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">選択</text>

  <!-- Step 2 -->
  <rect x="195" y="255" width="145" height="90" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="267" y="278" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">② パラメータ入力</text>
  <text x="267" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">環境・サイズ・</text>
  <text x="267" y="314" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">リージョンなどを</text>
  <text x="267" y="330" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">フォームで入力</text>

  <!-- Step 3 -->
  <rect x="360" y="255" width="145" height="90" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/>
  <text x="432" y="278" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">③ 承認ワークフロー</text>
  <text x="432" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">ポリシーに基づき</text>
  <text x="432" y="314" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">自動 or 手動で</text>
  <text x="432" y="330" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">承認</text>

  <!-- Step 4 -->
  <rect x="525" y="255" width="145" height="90" rx="8" fill="#16213e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="597" y="278" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24" font-weight="bold">④ 自動プロビジョニング</text>
  <text x="597" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">IaC実行で</text>
  <text x="597" y="314" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">リソースを自動</text>
  <text x="597" y="330" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">生成</text>

  <!-- Arrows between steps -->
  <line x1="177" y1="300" x2="193" y2="300" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="193,295 203,300 193,305" fill="#60a5fa"/>
  <line x1="342" y1="300" x2="358" y2="300" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="358,295 368,300 358,305" fill="#60a5fa"/>
  <line x1="507" y1="300" x2="523" y2="300" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="523,295 533,300 523,305" fill="#60a5fa"/>

  <!-- Benefit tags at bottom -->
  <rect x="100" y="375" width="175" height="38" rx="6" fill="#2d1e4e" stroke="#a78bfa" stroke-width="1"/>
  <text x="187" y="399" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa">✓ チケット待ち不要</text>

  <rect x="315" y="375" width="175" height="38" rx="6" fill="#1e2e3e" stroke="#60a5fa" stroke-width="1"/>
  <text x="402" y="399" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa">✓ ガバナンス維持</text>

  <rect x="530" y="375" width="175" height="38" rx="6" fill="#1e3e2e" stroke="#34d399" stroke-width="1"/>
  <text x="617" y="399" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">✓ 標準化された構成</text>

  <!-- Bottom note -->
  <text x="400" y="462" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888888">Platform Team が管理するテンプレートを開発者が自律的に利用</text>
</svg>


---

# ゴールデンパス設計

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">ゴールデンパス設計 — 標準化レーン</text>

  <!-- Left label -->
  <text x="30" y="140" font-family="sans-serif" font-size="12" fill="#888888">自由度</text>
  <text x="30" y="158" font-family="sans-serif" font-size="12" fill="#888888">（低）</text>
  <text x="30" y="430" font-family="sans-serif" font-size="12" fill="#888888">自由度</text>
  <text x="30" y="448" font-family="sans-serif" font-size="12" fill="#888888">（高）</text>

  <!-- Vertical axis arrow -->
  <line x1="65" y1="450" x2="65" y2="90" stroke="#555577" stroke-width="1.5"/>
  <polygon points="60,90 65,78 70,90" fill="#555577"/>

  <!-- Golden Path Lane (center, highlighted) -->
  <rect x="80" y="85" width="680" height="110" rx="12" fill="#2d2d0e" stroke="#fbbf24" stroke-width="2.5"/>
  <text x="130" y="125" font-family="sans-serif" font-size="14" fill="#fbbf24" font-weight="bold">⭐ Golden Path</text>
  <text x="130" y="148" font-family="sans-serif" font-size="11" fill="#eeeecc">推奨ルート: 標準テンプレート・承認済みツール・ベストプラクティス組み込み済み</text>
  <text x="130" y="168" font-family="sans-serif" font-size="11" fill="#eeeecc">→ 最速の開発速度 / 最高のコンプライアンス / Platform Teamのフルサポート</text>

  <!-- Badges on golden path -->
  <rect x="450" y="95" width="90" height="24" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="495" y="112" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">✓ セキュリティ済み</text>
  <rect x="555" y="95" width="80" height="24" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="595" y="112" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">✓ コスト最適</text>
  <rect x="648" y="95" width="96" height="24" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="696" y="112" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">✓ 監視設定済み</text>

  <!-- Paved road lane -->
  <rect x="80" y="215" width="680" height="90" rx="10" fill="#1e2a3e" stroke="#60a5fa" stroke-width="2"/>
  <text x="130" y="252" font-family="sans-serif" font-size="14" fill="#60a5fa" font-weight="bold">🛣️ Paved Road</text>
  <text x="130" y="274" font-family="sans-serif" font-size="11" fill="#ccddee">ガイド付きルート: 標準から外れるが Platform Team がサポート可能な範囲</text>
  <text x="130" y="292" font-family="sans-serif" font-size="11" fill="#ccddee">→ 追加レビュー必要 / 一部サポート対象外あり</text>

  <!-- Off-road lane -->
  <rect x="80" y="325" width="680" height="90" rx="10" fill="#2e1e1e" stroke="#f87171" stroke-width="2"/>
  <text x="130" y="362" font-family="sans-serif" font-size="14" fill="#f87171" font-weight="bold">⚠️ Off-road</text>
  <text x="130" y="384" font-family="sans-serif" font-size="11" fill="#eecccc">独自ルート: 標準外のツール・設定を使用。完全に自己責任</text>
  <text x="130" y="402" font-family="sans-serif" font-size="11" fill="#eecccc">→ サポートなし / セキュリティ審査必須 / 移行コスト高</text>

  <!-- Flow direction -->
  <text x="400" y="468" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa">目標: できる限り多くのチームをGolden Pathへ誘導する</text>

  <!-- Arrow pointing to golden path -->
  <line x1="400" y1="462" x2="400" y2="200" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,4"/>
  <polygon points="395,200 400,190 405,200" fill="#a78bfa"/>
</svg>


---

# Scaffoldingテンプレート — Backstage Scaffolder

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Scaffoldingテンプレート — Backstage Scaffolder</text><rect x="30" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="100" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">Developer</text><polygon points="175,110 190,104 190,116" fill="#60a5fa"/><line x1="170" y1="110" x2="192" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="200" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="270" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">Git Repo</text><text x="270" y="128" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="sans-serif">Source of Truth</text><polygon points="345,110 360,104 360,116" fill="#60a5fa"/><line x1="340" y1="110" x2="362" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="370" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="440" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">CI Pipeline</text><text x="440" y="128" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Build &amp; Test</text><polygon points="515,110 530,104 530,116" fill="#60a5fa"/><line x1="510" y1="110" x2="532" y2="110" stroke="#60a5fa" stroke-width="2"/><rect x="540" y="80" width="140" height="60" rx="10" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="610" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">CD Agent</text><text x="610" y="128" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">ArgoCD / Flux</text><line x1="610" y1="140" x2="610" y2="230" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/><polygon points="604,228 616,228 610,242" fill="#60a5fa"/><rect x="480" y="250" width="260" height="100" rx="10" fill="#0f3460" stroke="#a78bfa" stroke-width="2"/><text x="610" y="280" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">Kubernetes Cluster</text><rect x="500" y="295" width="100" height="36" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="550" y="318" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Pod (App)</text><rect x="620" y="295" width="100" height="36" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/><text x="670" y="318" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Pod (App)</text><text x="100" y="290" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Pull-based Sync</text><line x1="100" y1="300" x2="480" y2="300" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/><text x="200" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Immutable infrastructure / Declarative config / Automated reconciliation</text></svg>
- Backstage scaffolderでサービスの雛形を自動生成
- テンプレートYAMLでパラメータ・Gitリポジトリ作成・CIパイプライン設定を一括管理

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: go-microservice
  title: Go Microservice
spec:
  owner: platform-team
  type: service
  parameters:
    - title: Service Info
      properties:
        name:
          title: Service Name
          type: string
        owner:
          title: Owner Team
          type: string
  steps:
    - id: fetch
      name: Fetch Template
      action: fetch:template
      input:
        url: ./skeleton
    - id: publish
      name: Create GitHub Repo
      action: publish:github
      input:
        repoUrl: github.com?repo=${{ parameters.name }}
    - id: register
      name: Register in Catalog
      action: catalog:register
```


---

<!-- _class: lead -->
# CI/CDパイプライン

- コードコミットからプロダクションデプロイまでの自動化フロー
- GitOps原則に基づく宣言的パイプライン設計


---

# GitOpsパイプライン全体像

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">GitOpsパイプライン全体像</text>

  <!-- Stage 1: Code Commit -->
  <rect x="20" y="70" width="110" height="80" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="75" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">① Code</text>
  <text x="75" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">Commit</text>
  <text x="75" y="132" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">git push</text>
  <text x="75" y="146" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Pull Request</text>

  <!-- Arrow -->
  <line x1="132" y1="110" x2="152" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="152,105 162,110 152,115" fill="#60a5fa"/>

  <!-- Stage 2: CI Build -->
  <rect x="164" y="70" width="110" height="80" rx="8" fill="#2d2d4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="219" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">② CI Build</text>
  <text x="219" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Test / Lint</text>
  <text x="219" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Build Image</text>
  <text x="219" y="146" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Security Scan</text>

  <!-- Arrow -->
  <line x1="276" y1="110" x2="296" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="296,105 306,110 296,115" fill="#60a5fa"/>

  <!-- Stage 3: Image Registry -->
  <rect x="308" y="70" width="110" height="80" rx="8" fill="#2d2d4e" stroke="#34d399" stroke-width="2"/>
  <text x="363" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399" font-weight="bold">③ Registry</text>
  <text x="363" y="114" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Push Image</text>
  <text x="363" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Tag: SHA/SemVer</text>
  <text x="363" y="146" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Sign (Cosign)</text>

  <!-- Arrow -->
  <line x1="420" y1="110" x2="440" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="440,105 450,110 440,115" fill="#60a5fa"/>

  <!-- Stage 4: Update GitOps Repo -->
  <rect x="452" y="70" width="110" height="80" rx="8" fill="#2d2d4e" stroke="#fbbf24" stroke-width="2"/>
  <text x="507" y="93" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">④ GitOps</text>
  <text x="507" y="109" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">Repo更新</text>
  <text x="507" y="125" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">image tag更新</text>
  <text x="507" y="141" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">PR → merge</text>

  <!-- Arrow -->
  <line x1="564" y1="110" x2="584" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="584,105 594,110 584,115" fill="#60a5fa"/>

  <!-- Stage 5: GitOps Controller -->
  <rect x="596" y="70" width="110" height="80" rx="8" fill="#2d2d4e" stroke="#f87171" stroke-width="2"/>
  <text x="651" y="93" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f87171" font-weight="bold">⑤ ArgoCD</text>
  <text x="651" y="109" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f87171" font-weight="bold">/ Flux</text>
  <text x="651" y="125" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">diff検出</text>
  <text x="651" y="141" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">自動 Sync</text>

  <!-- Arrow down from ArgoCD to Deploy -->
  <line x1="651" y1="152" x2="651" y2="185" stroke="#34d399" stroke-width="2"/>
  <polygon points="646,185 651,195 656,185" fill="#34d399"/>

  <!-- Deploy to K8s -->
  <rect x="560" y="197" width="185" height="70" rx="8" fill="#1e3e2e" stroke="#34d399" stroke-width="2"/>
  <text x="652" y="226" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">⑥ Kubernetes Deploy</text>
  <text x="652" y="248" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Rolling / Canary / Blue-Green</text>

  <!-- Horizontal pipeline line -->
  <line x1="75" y1="190" x2="560" y2="190" stroke="#444466" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Bottom section: Environments row -->
  <text x="400" y="295" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#a78bfa" font-weight="bold">デプロイ環境フロー</text>

  <!-- Dev env -->
  <rect x="30" y="315" width="155" height="65" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="107" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">Dev</text>
  <text x="107" y="362" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">自動デプロイ</text>
  <text x="107" y="376" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">mainブランチ毎</text>

  <!-- Arrow -->
  <line x1="187" y1="348" x2="212" y2="348" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="212,343 222,348 212,353" fill="#60a5fa"/>

  <!-- Staging env -->
  <rect x="224" y="315" width="155" height="65" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="301" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">Staging</text>
  <text x="301" y="362" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Smoke Test後</text>
  <text x="301" y="376" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">自動昇格</text>

  <!-- Arrow -->
  <line x1="381" y1="348" x2="406" y2="348" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="406,343 416,348 406,353" fill="#60a5fa"/>

  <!-- Prod env -->
  <rect x="418" y="315" width="155" height="65" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/>
  <text x="495" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">Production</text>
  <text x="495" y="362" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">手動承認 or</text>
  <text x="495" y="376" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Progressive Delivery</text>

  <!-- Rollback arrow -->
  <rect x="618" y="315" width="155" height="65" rx="8" fill="#2e1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="695" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f87171" font-weight="bold">⟳ Rollback</text>
  <text x="695" y="362" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">git revert で</text>
  <text x="695" y="376" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">即座に戻せる</text>

  <!-- Bottom note -->
  <text x="400" y="432" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888888">全操作がGitに記録され、監査・ロールバックが常に可能</text>

  <!-- Observability icons bottom -->
  <rect x="100" y="448" width="130" height="30" rx="5" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1"/>
  <text x="165" y="468" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">📊 Metrics収集</text>
  <rect x="335" y="448" width="130" height="30" rx="5" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1"/>
  <text x="400" y="468" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#60a5fa">📝 Audit Log</text>
  <rect x="570" y="448" width="130" height="30" rx="5" fill="#2d2d4e" stroke="#34d399" stroke-width="1"/>
  <text x="635" y="468" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">🔔 Alert通知</text>
</svg>


---

# GitHub Actions統合 — GitOps Workflow

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">GitHub Actions統合 — GitOps Workflow</text><rect x="80" y="60" width="640" height="70" rx="10" fill="#2d1b69" stroke="#a78bfa" stroke-width="2"/><text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Developer Layer</text><text x="400" y="116" text-anchor="middle" fill="#a78bfa" font-size="12" font-family="sans-serif">Self-service Portal · Golden Paths · Backstage Catalog</text><polygon points="394,132 406,132 400,148" fill="#60a5fa"/><rect x="80" y="155" width="640" height="70" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/><text x="400" y="190" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Platform Layer</text><text x="400" y="211" text-anchor="middle" fill="#60a5fa" font-size="12" font-family="sans-serif">IDP · CI/CD · Observability · Security · Networking</text><polygon points="394,228 406,228 400,244" fill="#34d399"/><rect x="80" y="250" width="640" height="70" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/><text x="400" y="285" text-anchor="middle" fill="#ffffff" font-size="15" font-family="sans-serif">Infrastructure Layer</text><text x="400" y="306" text-anchor="middle" fill="#34d399" font-size="12" font-family="sans-serif">Kubernetes · Cloud Providers · On-Premise · IaC (Terraform)</text><rect x="80" y="340" width="640" height="44" rx="10" fill="#0f1f0f" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="367" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Team Topologies: Platform Team enables Stream-Aligned Teams</text></svg>
- mainブランチへのマージをトリガーにイメージビルド・GitOpsリポジトリ更新を自動実行

```yaml
name: GitOps Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build & Push Image
        run: |
          IMAGE=ghcr.io/${{ github.repository }}
          TAG=${{ github.sha }}
          docker build -t $IMAGE:$TAG .
          docker push $IMAGE:$TAG
      - name: Update GitOps Repo
        env:
          GH_TOKEN: ${{ secrets.GITOPS_TOKEN }}
        run: |
          git clone https://github.com/org/gitops-repo
          cd gitops-repo
          yq e '.image.tag = "${{ github.sha }}"' \
            -i apps/myapp/values.yaml
          git commit -am "chore: bump myapp to ${{ github.sha }}"
          git push
```


---

# コンテナイメージビルド戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">コンテナイメージビルド戦略</text>

  <!-- Left column: Multi-stage build -->
  <text x="200" y="70" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#60a5fa" font-weight="bold">マルチステージビルド</text>

  <!-- Stage: builder -->
  <rect x="50" y="88" width="300" height="62" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="2"/>
  <text x="85" y="112" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">FROM golang:1.22 AS builder</text>
  <text x="85" y="132" font-family="sans-serif" font-size="11" fill="#cccccc">全SDKインストール / コンパイル実行</text>
  <text x="85" y="148" font-family="sans-serif" font-size="10" fill="#888888">サイズ: ~800MB</text>

  <!-- Arrow -->
  <line x1="200" y1="152" x2="200" y2="172" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="195,172 200,182 205,172" fill="#60a5fa"/>

  <!-- Stage: runtime -->
  <rect x="50" y="184" width="300" height="62" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/>
  <text x="85" y="208" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">FROM gcr.io/distroless AS runtime</text>
  <text x="85" y="226" font-family="sans-serif" font-size="11" fill="#cccccc">COPY --from=builder /app/server .</text>
  <text x="85" y="244" font-family="sans-serif" font-size="10" fill="#888888">サイズ: ~20MB（攻撃面最小）</text>

  <!-- Benefit badge -->
  <rect x="90" y="260" width="220" height="30" rx="6" fill="#1e3e2e" stroke="#34d399" stroke-width="1"/>
  <text x="200" y="280" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">97.5% サイズ削減 / Shell無し</text>

  <!-- Divider -->
  <line x1="395" y1="60" x2="395" y2="470" stroke="#444466" stroke-width="1" stroke-dasharray="5,4"/>

  <!-- Right column: Image Tag Strategy -->
  <text x="600" y="70" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#a78bfa" font-weight="bold">イメージタグ戦略</text>

  <!-- Tag types -->
  <!-- SHA tag -->
  <rect x="420" y="88" width="355" height="60" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="445" y="110" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">SHA タグ (immutable)</text>
  <text x="445" y="130" font-family="sans-serif" font-size="11" fill="#cccccc">app:sha-a1b2c3d4  ← 本番推奨</text>
  <text x="445" y="146" font-family="sans-serif" font-size="10" fill="#888888">特定コミットを一意に識別</text>

  <!-- SemVer tag -->
  <rect x="420" y="164" width="355" height="60" rx="8" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="445" y="186" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">SemVer タグ (releaseable)</text>
  <text x="445" y="206" font-family="sans-serif" font-size="11" fill="#cccccc">app:v1.2.3  ← リリース管理</text>
  <text x="445" y="222" font-family="sans-serif" font-size="10" fill="#888888">Gitタグと連動、変更不可</text>

  <!-- latest tag (discouraged) -->
  <rect x="420" y="240" width="355" height="60" rx="8" fill="#2e1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="445" y="262" font-family="sans-serif" font-size="12" fill="#f87171" font-weight="bold">latest タグ ⚠️ (mutable)</text>
  <text x="445" y="282" font-family="sans-serif" font-size="11" fill="#cccccc">app:latest  ← 本番禁止</text>
  <text x="445" y="298" font-family="sans-serif" font-size="10" fill="#888888">何を指すか不明、再現性なし</text>

  <!-- Image Signing -->
  <rect x="420" y="316" width="355" height="60" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/>
  <text x="445" y="338" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">イメージ署名 (Cosign)</text>
  <text x="445" y="358" font-family="sans-serif" font-size="11" fill="#cccccc">cosign sign --key cosign.key app:sha-xxx</text>
  <text x="445" y="374" font-family="sans-serif" font-size="10" fill="#888888">改ざん検知 / サプライチェーンセキュリティ</text>

  <!-- Bottom: Build Cache Strategy -->
  <rect x="50" y="315" width="300" height="105" rx="8" fill="#2d2d4e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="200" y="340" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">ビルドキャッシュ戦略</text>
  <text x="75" y="362" font-family="sans-serif" font-size="11" fill="#cccccc">• レイヤーキャッシュ: 依存関係を先にCOPY</text>
  <text x="75" y="382" font-family="sans-serif" font-size="11" fill="#cccccc">• Buildkit inline cache: --cache-to/from</text>
  <text x="75" y="402" font-family="sans-serif" font-size="11" fill="#cccccc">• Registry cache: type=registry,ref=...</text>

  <!-- Bottom note -->
  <text x="400" y="460" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888888">再現性・セキュリティ・ビルド速度のトリプル最適化</text>
</svg>


---

# セキュリティスキャン統合

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">セキュリティスキャン統合 — CI/CDパイプライン</text>

  <!-- Pipeline lane background -->
  <rect x="20" y="55" width="760" height="80" rx="10" fill="#16213e" stroke="#444466" stroke-width="1"/>

  <!-- Pipeline stages with security gates -->
  <!-- Stage: Commit -->
  <rect x="35" y="68" width="90" height="54" rx="6" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="80" y="91" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa" font-weight="bold">Code</text>
  <text x="80" y="107" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa" font-weight="bold">Commit</text>

  <!-- Arrow -->
  <line x1="127" y1="95" x2="145" y2="95" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="145,90 155,95 145,100" fill="#60a5fa"/>

  <!-- Stage: SAST -->
  <rect x="157" y="68" width="90" height="54" rx="6" fill="#2e2e1e" stroke="#fbbf24" stroke-width="2"/>
  <text x="202" y="89" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fbbf24" font-weight="bold">🔍 SAST</text>
  <text x="202" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">静的解析</text>
  <text x="202" y="118" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888888">Semgrep/CodeQL</text>

  <!-- Arrow -->
  <line x1="249" y1="95" x2="267" y2="95" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="267,90 277,95 267,100" fill="#60a5fa"/>

  <!-- Stage: SCA -->
  <rect x="279" y="68" width="90" height="54" rx="6" fill="#2e2e1e" stroke="#fbbf24" stroke-width="2"/>
  <text x="324" y="89" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fbbf24" font-weight="bold">📦 SCA</text>
  <text x="324" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">依存関係</text>
  <text x="324" y="118" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888888">Snyk/Dependabot</text>

  <!-- Arrow -->
  <line x1="371" y1="95" x2="389" y2="95" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="389,90 399,95 389,100" fill="#60a5fa"/>

  <!-- Stage: Container Scan -->
  <rect x="401" y="68" width="90" height="54" rx="6" fill="#2e2e1e" stroke="#f87171" stroke-width="2"/>
  <text x="446" y="89" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171" font-weight="bold">🐳 Image</text>
  <text x="446" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">コンテナ</text>
  <text x="446" y="118" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888888">Trivy/Grype</text>

  <!-- Arrow -->
  <line x1="493" y1="95" x2="511" y2="95" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="511,90 521,95 511,100" fill="#60a5fa"/>

  <!-- Stage: Secret Scan -->
  <rect x="523" y="68" width="90" height="54" rx="6" fill="#2e2e1e" stroke="#f87171" stroke-width="2"/>
  <text x="568" y="89" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#f87171" font-weight="bold">🔑 Secret</text>
  <text x="568" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">秘密情報</text>
  <text x="568" y="118" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888888">Gitleaks/TruffleHog</text>

  <!-- Arrow -->
  <line x1="615" y1="95" x2="633" y2="95" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="633,90 643,95 633,100" fill="#60a5fa"/>

  <!-- Stage: Deploy -->
  <rect x="645" y="68" width="120" height="54" rx="6" fill="#1e3e2e" stroke="#34d399" stroke-width="2"/>
  <text x="705" y="89" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399" font-weight="bold">✅ Deploy</text>
  <text x="705" y="105" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">全ゲート通過後</text>
  <text x="705" y="119" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888888">署名済みイメージ</text>

  <!-- Details section -->
  <!-- SAST details -->
  <rect x="30" y="160" width="170" height="130" rx="8" fill="#16213e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="115" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24" font-weight="bold">SAST 詳細</text>
  <text x="45" y="202" font-family="sans-serif" font-size="10" fill="#cccccc">• SQLインジェクション検出</text>
  <text x="45" y="220" font-family="sans-serif" font-size="10" fill="#cccccc">• XSS 脆弱性検出</text>
  <text x="45" y="238" font-family="sans-serif" font-size="10" fill="#cccccc">• ハードコードパスワード</text>
  <text x="45" y="256" font-family="sans-serif" font-size="10" fill="#cccccc">• 危険な関数の使用</text>
  <text x="45" y="278" font-family="sans-serif" font-size="9" fill="#888888">PR ブロック / SARIF出力</text>

  <!-- Container scan details -->
  <rect x="220" y="160" width="170" height="130" rx="8" fill="#16213e" stroke="#f87171" stroke-width="1.5"/>
  <text x="305" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f87171" font-weight="bold">Image Scan 詳細</text>
  <text x="235" y="202" font-family="sans-serif" font-size="10" fill="#cccccc">• OS パッケージCVE</text>
  <text x="235" y="220" font-family="sans-serif" font-size="10" fill="#cccccc">• アプリ依存CVE</text>
  <text x="235" y="238" font-family="sans-serif" font-size="10" fill="#cccccc">• CRITICAL/HIGH でブロック</text>
  <text x="235" y="256" font-family="sans-serif" font-size="10" fill="#cccccc">• SBOM自動生成</text>
  <text x="235" y="278" font-family="sans-serif" font-size="9" fill="#888888">継続スキャン (Push時)</text>

  <!-- Policy Enforcement -->
  <rect x="410" y="160" width="170" height="130" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="495" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">Policy Gate</text>
  <text x="425" y="202" font-family="sans-serif" font-size="10" fill="#cccccc">• OPA/Rego ポリシー</text>
  <text x="425" y="220" font-family="sans-serif" font-size="10" fill="#cccccc">• CRITICAL 0件必須</text>
  <text x="425" y="238" font-family="sans-serif" font-size="10" fill="#cccccc">• ライセンス違反チェック</text>
  <text x="425" y="256" font-family="sans-serif" font-size="10" fill="#cccccc">• 署名検証 (Cosign)</text>
  <text x="425" y="278" font-family="sans-serif" font-size="9" fill="#888888">Policy-as-Code 管理</text>

  <!-- Runtime security -->
  <rect x="600" y="160" width="170" height="130" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/>
  <text x="685" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">Runtime Security</text>
  <text x="615" y="202" font-family="sans-serif" font-size="10" fill="#cccccc">• Falco 異常検知</text>
  <text x="615" y="220" font-family="sans-serif" font-size="10" fill="#cccccc">• Network Policy</text>
  <text x="615" y="238" font-family="sans-serif" font-size="10" fill="#cccccc">• Seccomp / AppArmor</text>
  <text x="615" y="256" font-family="sans-serif" font-size="10" fill="#cccccc">• Pod Security Standards</text>
  <text x="615" y="278" font-family="sans-serif" font-size="9" fill="#888888">Shift-Right セキュリティ</text>

  <!-- Shift-left vs shift-right bar -->
  <rect x="30" y="315" width="350" height="40" rx="6" fill="#2d2d0e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="205" y="340" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24">⬅ Shift-Left: 開発フェーズで早期発見</text>

  <rect x="420" y="315" width="350" height="40" rx="6" fill="#1e3e2e" stroke="#34d399" stroke-width="1.5"/>
  <text x="595" y="340" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399">Shift-Right: 本番での継続監視 ➡</text>

  <!-- Bottom summary -->
  <text x="400" y="390" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa" font-weight="bold">DevSecOps: セキュリティをパイプラインに組み込む</text>
  <text x="400" y="416" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888888">脆弱性修正コスト: 開発時 1x → テスト時 10x → 本番時 100x</text>

  <!-- Key metrics -->
  <rect x="100" y="435" width="180" height="38" rx="6" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1"/>
  <text x="190" y="459" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">MTTR 70% 短縮</text>
  <rect x="520" y="435" width="180" height="38" rx="6" fill="#2d2d4e" stroke="#34d399" stroke-width="1"/>
  <text x="610" y="459" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399">CVE 90% 早期検出</text>
</svg>


---

# Progressive Delivery概念

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Progressive Delivery — 概念比較</text>

  <!-- === Canary === -->
  <rect x="20" y="55" width="235" height="385" rx="12" fill="#16213e" stroke="#fbbf24" stroke-width="2"/>
  <text x="137" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#fbbf24" font-weight="bold">🐤 Canary Release</text>

  <!-- Traffic bars -->
  <rect x="50" y="100" width="175" height="28" rx="4" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="137" y="119" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">100% → v1 (stable)</text>

  <rect x="50" y="138" width="35" height="28" rx="4" fill="#fbbf24"/>
  <rect x="90" y="138" width="135" height="28" rx="4" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="62" y="157" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#1a1a00">20%</text>
  <text x="162" y="157" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fbbf24">80% v1</text>

  <rect x="50" y="176" width="87" height="28" rx="4" fill="#fbbf24"/>
  <rect x="142" y="176" width="83" height="28" rx="4" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="95" y="195" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#1a1a00">50% v2</text>
  <text x="183" y="195" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fbbf24">50% v1</text>

  <rect x="50" y="214" width="175" height="28" rx="4" fill="#34d399"/>
  <text x="137" y="233" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#1a1a00" font-weight="bold">100% v2 (promoted)</text>

  <line x1="137" y1="98" x2="137" y2="100" stroke="#fbbf24" stroke-width="1"/>

  <text x="40" y="268" font-family="sans-serif" font-size="10" fill="#cccccc">• 段階的トラフィック移行</text>
  <text x="40" y="286" font-family="sans-serif" font-size="10" fill="#cccccc">• メトリクスで自動昇格/ロールバック</text>
  <text x="40" y="304" font-family="sans-serif" font-size="10" fill="#cccccc">• リスクを最小化</text>
  <text x="40" y="322" font-family="sans-serif" font-size="10" fill="#cccccc">• Argo Rollouts / Flagger</text>

  <rect x="40" y="345" width="175" height="30" rx="5" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="127" y="365" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">リスク: 低 / 移行: 遅め</text>

  <!-- === Blue-Green === -->
  <rect x="283" y="55" width="235" height="385" rx="12" fill="#16213e" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#60a5fa" font-weight="bold">🔵🟢 Blue-Green</text>

  <!-- Blue env -->
  <rect x="305" y="100" width="190" height="52" rx="6" fill="#1e2a4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="122" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">Blue (v1) — LIVE</text>
  <text x="400" y="142" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">全トラフィック受信中</text>

  <!-- Green env -->
  <rect x="305" y="168" width="190" height="52" rx="6" fill="#1e3e2e" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">Green (v2) — Standby</text>
  <text x="400" y="210" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">新バージョン準備完了</text>

  <!-- Switch arrow -->
  <line x1="400" y1="222" x2="400" y2="242" stroke="#ffffff" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="395,242 400,252 405,242" fill="#ffffff"/>
  <text x="400" y="264" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" font-weight="bold">⚡ 瞬時切り替え</text>

  <text x="293" y="292" font-family="sans-serif" font-size="10" fill="#cccccc">• ダウンタイムほぼゼロ</text>
  <text x="293" y="310" font-family="sans-serif" font-size="10" fill="#cccccc">• 即座のロールバック可能</text>
  <text x="293" y="328" font-family="sans-serif" font-size="10" fill="#cccccc">• 2倍のインフラコスト</text>
  <text x="293" y="346" font-family="sans-serif" font-size="10" fill="#cccccc">• DB スキーマ変更に注意</text>

  <rect x="305" y="365" width="190" height="30" rx="5" fill="#1e2a4e" stroke="#60a5fa" stroke-width="1"/>
  <text x="400" y="385" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#60a5fa">リスク: 中 / 移行: 速い</text>

  <!-- === Feature Flags === -->
  <rect x="546" y="55" width="235" height="385" rx="12" fill="#16213e" stroke="#a78bfa" stroke-width="2"/>
  <text x="663" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#a78bfa" font-weight="bold">🚩 Feature Flags</text>

  <!-- Flag visualization -->
  <rect x="570" y="100" width="190" height="40" rx="6" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="663" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">new_checkout_ui: ON (5%)</text>
  <text x="663" y="135" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">Beta users only</text>

  <rect x="570" y="152" width="190" height="40" rx="6" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="663" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">dark_mode: ON (50%)</text>
  <text x="663" y="187" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">Random sampling</text>

  <rect x="570" y="204" width="190" height="40" rx="6" fill="#2e1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="663" y="222" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f87171">payment_v2: OFF</text>
  <text x="663" y="239" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">Disabled globally</text>

  <text x="556" y="270" font-family="sans-serif" font-size="10" fill="#cccccc">• デプロイとリリースを分離</text>
  <text x="556" y="288" font-family="sans-serif" font-size="10" fill="#cccccc">• ユーザーセグメント制御</text>
  <text x="556" y="306" font-family="sans-serif" font-size="10" fill="#cccccc">• A/Bテスト統合</text>
  <text x="556" y="324" font-family="sans-serif" font-size="10" fill="#cccccc">• LaunchDarkly / Unleash</text>
  <text x="556" y="342" font-family="sans-serif" font-size="10" fill="#cccccc">• フラグ負債に注意</text>

  <rect x="570" y="365" width="190" height="30" rx="5" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1"/>
  <text x="663" y="385" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">リスク: 低 / 制御: 細かい</text>

  <!-- Bottom comparison -->
  <text x="400" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888888">組み合わせ利用が推奨: Canary + Feature Flags で段階リリースを最大化</text>
</svg>


---

# Canaryデプロイフロー

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Canaryデプロイフロー — トラフィック分割</text>

  <!-- Load Balancer / Ingress -->
  <rect x="320" y="60" width="160" height="55" rx="10" fill="#2d2d4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="84" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">🌐 Ingress</text>
  <text x="400" y="102" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">Load Balancer</text>

  <!-- Traffic split visualization -->
  <!-- Step 1: 0% -->
  <text x="130" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">Phase 1</text>
  <!-- Full blue bar -->
  <rect x="30" y="170" width="200" height="24" rx="4" fill="#60a5fa"/>
  <text x="130" y="187" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e" font-weight="bold">100% → Stable (v1)</text>
  <!-- Stable box -->
  <rect x="55" y="205" width="150" height="45" rx="8" fill="#1e2a4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="130" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">Stable (v1)</text>
  <text x="130" y="242" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">3 replicas</text>
  <!-- Canary box (empty) -->
  <rect x="55" y="262" width="150" height="45" rx="8" fill="#2d2d4e" stroke="#444466" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="130" y="283" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666688">Canary (v2)</text>
  <text x="130" y="299" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#666688">0 replicas</text>

  <!-- Arrow right -->
  <line x1="235" y1="235" x2="265" y2="235" stroke="#444466" stroke-width="1.5"/>
  <polygon points="265,230 275,235 265,240" fill="#444466"/>

  <!-- Step 2: 20% -->
  <text x="400" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">Phase 2</text>
  <rect x="300" y="170" width="160" height="24" rx="4" fill="#60a5fa"/>
  <rect x="460" y="170" width="40" height="24" rx="4" fill="#fbbf24"/>
  <text x="380" y="187" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#1a1a2e" font-weight="bold">80% v1</text>
  <text x="480" y="187" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#1a1a00">20%</text>
  <rect x="310" y="205" width="100" height="45" rx="8" fill="#1e2a4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="360" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">Stable v1</text>
  <text x="360" y="242" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">3 replicas</text>
  <rect x="420" y="205" width="100" height="45" rx="8" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="470" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">Canary v2</text>
  <text x="470" y="242" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">1 replica</text>

  <!-- Metrics check -->
  <rect x="305" y="265" width="215" height="50" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="412" y="285" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa" font-weight="bold">📊 メトリクス監視</text>
  <text x="412" y="303" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Error Rate / Latency / Success Rate</text>

  <!-- Arrow right -->
  <line x1="540" y1="235" x2="560" y2="235" stroke="#444466" stroke-width="1.5"/>
  <polygon points="560,230 570,235 560,240" fill="#444466"/>

  <!-- Step 3: Promote or Rollback -->
  <text x="660" y="160" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">Phase 3</text>

  <!-- Promote path -->
  <rect x="575" y="170" width="185" height="55" rx="8" fill="#1e3e2e" stroke="#34d399" stroke-width="2"/>
  <text x="667" y="192" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">✅ Promote</text>
  <rect x="585" y="202" width="165" height="18" rx="4" fill="#34d399"/>
  <text x="667" y="215" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#1a1a00" font-weight="bold">100% → v2 (new stable)</text>

  <!-- Rollback path -->
  <rect x="575" y="240" width="185" height="55" rx="8" fill="#2e1e1e" stroke="#f87171" stroke-width="2"/>
  <text x="667" y="262" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f87171" font-weight="bold">⟳ Rollback</text>
  <rect x="585" y="272" width="165" height="18" rx="4" fill="#60a5fa"/>
  <text x="667" y="285" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#1a1a2e" font-weight="bold">100% → v1 (restored)</text>

  <!-- Arrows from ingress to steps -->
  <line x1="400" y1="116" x2="130" y2="168" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="116" x2="400" y2="168" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="116" x2="660" y2="168" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Automation tools -->
  <rect x="30" y="340" width="225" height="50" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="142" y="362" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">自動化ツール</text>
  <text x="142" y="382" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">Argo Rollouts / Flagger</text>

  <rect x="290" y="340" width="225" height="50" rx="8" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="402" y="362" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">メトリクスプロバイダー</text>
  <text x="402" y="382" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">Prometheus / Datadog</text>

  <rect x="550" y="340" width="220" height="50" rx="8" fill="#2d2d4e" stroke="#34d399" stroke-width="1.5"/>
  <text x="660" y="362" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">通知</text>
  <text x="660" y="382" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">Slack / PagerDuty</text>

  <!-- Bottom note -->
  <text x="400" y="430" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888888">メトリクス悪化を検知したら自動ロールバック → 本番影響を最小化</text>
  <text x="400" y="460" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">分析ウィンドウ: 通常 5〜15分 / 昇格条件: Success Rate ≥ 99%</text>
</svg>


---

# Blue-Greenデプロイ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Blue-Greenデプロイ — 環境切り替えフロー</text>

  <!-- Users / Traffic -->
  <rect x="330" y="55" width="140" height="50" rx="8" fill="#2d2d4e" stroke="#ffffff" stroke-width="2"/>
  <text x="400" y="77" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" font-weight="bold">👥 Users</text>
  <text x="400" y="97" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">All Traffic</text>

  <!-- Router / LB -->
  <rect x="330" y="130" width="140" height="50" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="152" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">🔀 Router</text>
  <text x="400" y="170" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">DNS / Load Balancer</text>

  <!-- Arrow from Users to Router -->
  <line x1="400" y1="107" x2="400" y2="128" stroke="#ffffff" stroke-width="1.5"/>
  <polygon points="395,128 400,138 405,128" fill="#ffffff"/>

  <!-- === BEFORE state === -->
  <text x="200" y="215" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#cccccc" font-weight="bold">Before</text>

  <!-- Blue env LIVE -->
  <rect x="60" y="230" width="280" height="100" rx="10" fill="#1e2a4e" stroke="#60a5fa" stroke-width="3"/>
  <text x="200" y="260" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#60a5fa" font-weight="bold">🔵 Blue (v1)</text>
  <text x="200" y="284" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">Status: LIVE — 全トラフィック受信</text>
  <text x="200" y="304" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">3 replicas / healthy</text>

  <!-- Green env (standby) -->
  <rect x="460" y="230" width="280" height="100" rx="10" fill="#1e1e1e" stroke="#444466" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="600" y="260" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#444466" font-weight="bold">🟢 Green (v2)</text>
  <text x="600" y="284" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666688">Status: Idle / Preparing</text>
  <text x="600" y="304" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#666688">0 replicas (scaled down)</text>

  <!-- Arrow from Router to Blue (before) -->
  <line x1="360" y1="182" x2="220" y2="228" stroke="#60a5fa" stroke-width="2.5"/>
  <polygon points="213,223 220,228 225,218" fill="#60a5fa"/>

  <!-- === SWITCH PROCESS === -->
  <!-- Deploy new version -->
  <rect x="465" y="355" width="270" height="36" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="600" y="378" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">① Green に v2 デプロイ &amp; smoke test</text>

  <!-- Switch DNS/LB -->
  <rect x="465" y="400" width="270" height="36" rx="6" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="600" y="423" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa">② Router を Blue→Green へ切り替え</text>

  <!-- Keep blue for rollback -->
  <rect x="65" y="355" width="270" height="36" rx="6" fill="#1e2a4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="200" y="378" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa">③ Blue は待機状態で保持（ロールバック用）</text>

  <!-- Rollback arrow -->
  <rect x="65" y="400" width="270" height="36" rx="6" fill="#2e1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="200" y="423" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f87171">⟳ 問題発生 → 即座に Blue に戻す</text>

  <!-- Switch arrow in diagram -->
  <line x1="440" y1="185" x2="460" y2="185" stroke="#34d399" stroke-width="2.5" stroke-dasharray="6,3"/>
  <polygon points="460,180 470,185 460,190" fill="#34d399"/>
  <text x="450" y="176" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399" font-weight="bold">SWITCH</text>

  <!-- After arrow to green -->
  <line x1="440" y1="195" x2="590" y2="230" stroke="#34d399" stroke-width="2.5" stroke-dasharray="6,3"/>
  <polygon points="585,225 590,230 582,235" fill="#34d399"/>

  <!-- Bottom note -->
  <text x="400" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888888">切り替え時間: DNS TTL (数秒〜分) or LB ルール変更 (即時)</text>
  <text x="400" y="485" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">注意: DBマイグレーションは後方互換性を保つこと（Blue/Greenで同一DBを使用）</text>
</svg>


---

# Feature Flags統合

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Feature Flags — 全体アーキテクチャ</text>

  <!-- Client Apps (left) -->
  <rect x="20" y="75" width="130" height="55" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="85" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">📱 Web App</text>
  <text x="85" y="118" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Frontend</text>

  <rect x="20" y="145" width="130" height="55" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="85" y="168" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">🔧 Backend API</text>
  <text x="85" y="188" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Microservices</text>

  <rect x="20" y="215" width="130" height="55" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="85" y="238" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">📦 Worker</text>
  <text x="85" y="258" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Background Jobs</text>

  <!-- Arrows to SDK -->
  <line x1="152" y1="103" x2="195" y2="103" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="195,98 205,103 195,108" fill="#60a5fa"/>
  <line x1="152" y1="173" x2="195" y2="173" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="195,168 205,173 195,178" fill="#60a5fa"/>
  <line x1="152" y1="243" x2="195" y2="243" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="195,238 205,243 195,248" fill="#60a5fa"/>

  <!-- SDK layer -->
  <rect x="207" y="75" width="120" height="230" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="2"/>
  <text x="267" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">SDK</text>
  <text x="267" y="125" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">フラグ評価</text>
  <text x="267" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">ローカルキャッシュ</text>
  <text x="267" y="165" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">ストリーミング更新</text>
  <text x="267" y="185" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888888">Go / Java / JS / Py</text>
  <line x1="230" y1="195" x2="304" y2="195" stroke="#444466" stroke-width="1"/>
  <text x="267" y="215" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">ユーザーコンテキスト</text>
  <text x="267" y="233" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">属性で評価:</text>
  <text x="267" y="250" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888888">userId / region /</text>
  <text x="267" y="267" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888888">plan / beta_user</text>
  <text x="267" y="292" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888888">等</text>

  <!-- Arrow to Feature Flag Service -->
  <line x1="329" y1="190" x2="365" y2="190" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="365,185 375,190 365,195" fill="#60a5fa"/>

  <!-- Feature Flag Service (center) -->
  <rect x="377" y="65" width="185" height="280" rx="10" fill="#2d2d0e" stroke="#fbbf24" stroke-width="2.5"/>
  <text x="469" y="92" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">🚩 Feature Flag</text>
  <text x="469" y="110" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">Service</text>
  <text x="469" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888888">LaunchDarkly / Unleash</text>
  <line x1="395" y1="140" x2="544" y2="140" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Flag list -->
  <rect x="390" y="150" width="160" height="26" rx="4" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="470" y="168" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">new_ui: ON 20%</text>
  <rect x="390" y="183" width="160" height="26" rx="4" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="470" y="201" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#fbbf24">dark_mode: ON 50%</text>
  <rect x="390" y="216" width="160" height="26" rx="4" fill="#2e1e1e" stroke="#f87171" stroke-width="1"/>
  <text x="470" y="234" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f87171">payment_v2: OFF</text>
  <rect x="390" y="249" width="160" height="26" rx="4" fill="#1e3e2e" stroke="#34d399" stroke-width="1"/>
  <text x="470" y="267" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">beta_api: ON (beta)</text>

  <line x1="395" y1="285" x2="544" y2="285" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="469" y="310" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Targeting Rules</text>
  <text x="469" y="328" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Rollout %</text>

  <!-- Arrows to right components -->
  <line x1="564" y1="150" x2="600" y2="130" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="596,125 603,130 597,137" fill="#60a5fa"/>
  <line x1="564" y1="200" x2="600" y2="200" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="600,195 610,200 600,205" fill="#60a5fa"/>
  <line x1="564" y1="270" x2="600" y2="290" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="596,285 603,290 597,297" fill="#60a5fa"/>

  <!-- Right: Admin UI -->
  <rect x="612" y="75" width="165" height="70" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="694" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">🖥️ Admin UI</text>
  <text x="694" y="118" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">フラグの作成/編集</text>
  <text x="694" y="134" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">ターゲット設定</text>

  <!-- Analytics -->
  <rect x="612" y="165" width="165" height="70" rx="8" fill="#2d2d4e" stroke="#34d399" stroke-width="1.5"/>
  <text x="694" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">📊 Analytics</text>
  <text x="694" y="208" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">A/Bテスト結果</text>
  <text x="694" y="226" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">フラグ影響分析</text>

  <!-- Audit Log -->
  <rect x="612" y="255" width="165" height="70" rx="8" fill="#2d2d4e" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="694" y="280" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24" font-weight="bold">📋 Audit Log</text>
  <text x="694" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">変更履歴</text>
  <text x="694" y="316" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">誰がいつ変更したか</text>

  <!-- Bottom note -->
  <text x="400" y="380" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a78bfa" font-weight="bold">デプロイとリリースの分離が可能に</text>
  <text x="400" y="405" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888888">コードは常に本番に存在し、フラグで機能のON/OFFを制御</text>

  <!-- Lifecycle -->
  <rect x="30" y="425" width="740" height="50" rx="8" fill="#16213e" stroke="#444466" stroke-width="1"/>
  <text x="100" y="445" font-family="sans-serif" font-size="10" fill="#a78bfa">① 作成</text>
  <text x="185" y="445" font-family="sans-serif" font-size="10" fill="#60a5fa">② 段階展開</text>
  <text x="300" y="445" font-family="sans-serif" font-size="10" fill="#34d399">③ 全展開</text>
  <text x="400" y="445" font-family="sans-serif" font-size="10" fill="#fbbf24">④ 効果測定</text>
  <text x="510" y="445" font-family="sans-serif" font-size="10" fill="#f87171">⑤ フラグ削除</text>
  <text x="620" y="445" font-family="sans-serif" font-size="10" fill="#888888">⚠️ 負債化防止</text>
  <text x="400" y="465" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888888">フラグのライフサイクル管理: 定期的なクリーンアップが重要</text>
</svg>


---

<!-- _class: lead -->
# 可観測性

- システムの内部状態を外部から理解するための3本柱
- Metrics・Logs・Tracesを組み合わせてシステム全体を把握する


---

# Observability 3本柱

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Observability 3本柱 — 相互関係</text>

  <!-- Central triangle base points: (400,420), (100,120), (700,120) -->

  <!-- Triangle edges -->
  <!-- Left edge: Metrics (100,120) to bottom (400,420) -->
  <line x1="100" y1="120" x2="400" y2="420" stroke="#60a5fa" stroke-width="2"/>
  <!-- Right edge: Traces (700,120) to bottom (400,420) -->
  <line x1="700" y1="120" x2="400" y2="420" stroke="#34d399" stroke-width="2"/>
  <!-- Top edge: Metrics to Traces -->
  <line x1="100" y1="120" x2="700" y2="120" stroke="#a78bfa" stroke-width="2"/>

  <!-- Metrics node (top-left) -->
  <rect x="30" y="58" width="180" height="120" rx="12" fill="#1e2a4e" stroke="#60a5fa" stroke-width="2.5"/>
  <text x="120" y="88" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#60a5fa" font-weight="bold">📊 Metrics</text>
  <text x="120" y="112" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">数値の時系列データ</text>
  <text x="120" y="132" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• CPU / Memory 使用率</text>
  <text x="120" y="150" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• リクエスト数 / レイテンシ</text>
  <text x="120" y="168" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• エラー率</text>

  <!-- Traces node (top-right) -->
  <rect x="592" y="58" width="180" height="120" rx="12" fill="#1e3e2e" stroke="#34d399" stroke-width="2.5"/>
  <text x="682" y="88" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#34d399" font-weight="bold">🔗 Traces</text>
  <text x="682" y="112" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">リクエストの追跡</text>
  <text x="682" y="132" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• 分散トレーシング</text>
  <text x="682" y="150" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• サービス間の依存</text>
  <text x="682" y="168" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• ボトルネック特定</text>

  <!-- Logs node (bottom) -->
  <rect x="300" y="385" width="200" height="100" rx="12" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="400" y="412" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#a78bfa" font-weight="bold">📝 Logs</text>
  <text x="400" y="434" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">イベントの詳細記録</text>
  <text x="400" y="452" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• エラーの詳細情報</text>
  <text x="400" y="470" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">• 構造化ログ (JSON)</text>

  <!-- Center label -->
  <rect x="330" y="220" width="140" height="65" rx="10" fill="#1a1a2e" stroke="#fbbf24" stroke-width="2"/>
  <text x="400" y="245" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24" font-weight="bold">Correlation</text>
  <text x="400" y="263" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Trace ID で</text>
  <text x="400" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">3つを紐付け</text>

  <!-- Relationship labels on edges -->
  <text x="205" y="300" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#60a5fa">異常検知→詳細調査</text>
  <text x="595" y="300" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#34d399">追跡→ログ確認</text>
  <text x="400" y="108" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#a78bfa">どこで遅い？→何が起きた？</text>

  <!-- Tools row at bottom right -->
  <rect x="30" y="310" width="220" height="58" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="140" y="332" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">Metrics ツール</text>
  <text x="140" y="352" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Prometheus / Grafana</text>
  <text x="140" y="368" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Datadog / CloudWatch</text>

  <rect x="555" y="205" width="220" height="58" rx="8" fill="#16213e" stroke="#34d399" stroke-width="1.5"/>
  <text x="665" y="227" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#34d399" font-weight="bold">Traces ツール</text>
  <text x="665" y="247" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Jaeger / Zipkin</text>
  <text x="665" y="263" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Tempo / X-Ray</text>
</svg>


---

# OpenTelemetry統合アーキテクチャ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">OpenTelemetry 統合アーキテクチャ</text>

  <!-- === Sources layer (left) === -->
  <text x="90" y="70" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">アプリケーション層</text>

  <rect x="20" y="82" width="140" height="45" rx="7" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="90" y="101" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">Go Service</text>
  <text x="90" y="120" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">OTel SDK 自動計装</text>

  <rect x="20" y="140" width="140" height="45" rx="7" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="90" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">Java Service</text>
  <text x="90" y="178" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">OTel Javaagent</text>

  <rect x="20" y="198" width="140" height="45" rx="7" fill="#2d2d4e" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="90" y="217" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a78bfa" font-weight="bold">Node.js Service</text>
  <text x="90" y="236" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">@opentelemetry/sdk</text>

  <rect x="20" y="256" width="140" height="45" rx="7" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="90" y="275" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">Kubernetes</text>
  <text x="90" y="294" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Infra metrics</text>

  <rect x="20" y="314" width="140" height="45" rx="7" fill="#2d2d4e" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="90" y="333" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#60a5fa" font-weight="bold">Nginx / Envoy</text>
  <text x="90" y="352" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Proxy metrics</text>

  <!-- Arrows to collector -->
  <line x1="162" y1="105" x2="228" y2="180" stroke="#a78bfa" stroke-width="1.2"/>
  <polygon points="223,176 230,182 225,188" fill="#a78bfa"/>
  <line x1="162" y1="163" x2="228" y2="200" stroke="#a78bfa" stroke-width="1.2"/>
  <polygon points="223,196 230,202 225,208" fill="#a78bfa"/>
  <line x1="162" y1="220" x2="228" y2="220" stroke="#a78bfa" stroke-width="1.2"/>
  <polygon points="228,215 238,220 228,225" fill="#a78bfa"/>
  <line x1="162" y1="279" x2="228" y2="244" stroke="#60a5fa" stroke-width="1.2"/>
  <polygon points="227,239 233,245 222,248" fill="#60a5fa"/>
  <line x1="162" y1="337" x2="228" y2="260" stroke="#60a5fa" stroke-width="1.2"/>
  <polygon points="227,256 232,262 222,264" fill="#60a5fa"/>

  <!-- === OTel Collector (center) === -->
  <rect x="240" y="115" width="190" height="270" rx="12" fill="#2d2d0e" stroke="#fbbf24" stroke-width="2.5"/>
  <text x="335" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24" font-weight="bold">OTel Collector</text>

  <!-- Pipeline blocks inside collector -->
  <rect x="258" y="160" width="154" height="45" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="335" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">Receivers</text>
  <text x="335" y="197" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">OTLP / Prometheus / Jaeger</text>

  <line x1="335" y1="207" x2="335" y2="225" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="330,225 335,233 340,225" fill="#fbbf24"/>

  <rect x="258" y="235" width="154" height="45" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="335" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">Processors</text>
  <text x="335" y="272" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Filter / Batch / Sample</text>

  <line x1="335" y1="282" x2="335" y2="300" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="330,300 335,308 340,300" fill="#fbbf24"/>

  <rect x="258" y="310" width="154" height="45" rx="6" fill="#3d3000" stroke="#fbbf24" stroke-width="1"/>
  <text x="335" y="330" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24" font-weight="bold">Exporters</text>
  <text x="335" y="347" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Prometheus / Tempo / Loki</text>

  <!-- === Backends (right) === -->
  <text x="640" y="70" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">バックエンド層</text>

  <!-- Metrics backend -->
  <rect x="460" y="82" width="175" height="60" rx="8" fill="#1e2a4e" stroke="#60a5fa" stroke-width="2"/>
  <text x="547" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#60a5fa" font-weight="bold">📊 Prometheus</text>
  <text x="547" y="125" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Metrics ストレージ</text>

  <!-- Traces backend -->
  <rect x="460" y="160" width="175" height="60" rx="8" fill="#1e3e2e" stroke="#34d399" stroke-width="2"/>
  <text x="547" y="183" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#34d399" font-weight="bold">🔗 Tempo / Jaeger</text>
  <text x="547" y="203" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Traces ストレージ</text>

  <!-- Logs backend -->
  <rect x="460" y="238" width="175" height="60" rx="8" fill="#2d2d4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="547" y="261" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#a78bfa" font-weight="bold">📝 Loki / Elastic</text>
  <text x="547" y="281" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Logs ストレージ</text>

  <!-- Visualization -->
  <rect x="460" y="316" width="175" height="60" rx="8" fill="#3d3000" stroke="#fbbf24" stroke-width="2"/>
  <text x="547" y="339" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#fbbf24" font-weight="bold">📈 Grafana</text>
  <text x="547" y="359" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">統合ダッシュボード</text>

  <!-- Arrows from collector to backends -->
  <line x1="432" y1="260" x2="458" y2="112" stroke="#60a5fa" stroke-width="1.5"/>
  <polygon points="453,108 460,113 455,119" fill="#60a5fa"/>
  <line x1="432" y1="300" x2="458" y2="190" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="453,186 460,191 455,197" fill="#34d399"/>
  <line x1="432" y1="330" x2="458" y2="268" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="453,264 460,269 455,275" fill="#a78bfa"/>
  <line x1="432" y1="356" x2="458" y2="346" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="458,341 466,346 458,351" fill="#fbbf24"/>

  <!-- Grafana connects to all backends -->
  <line x1="636" y1="316" x2="660" y2="145" stroke="#fbbf24" stroke-width="1.2" stroke-dasharray="4,3"/>
  <line x1="636" y1="316" x2="660" y2="222" stroke="#fbbf24" stroke-width="1.2" stroke-dasharray="4,3"/>
  <line x1="636" y1="316" x2="660" y2="300" stroke="#fbbf24" stroke-width="1.2" stroke-dasharray="4,3"/>

  <!-- Alertmanager -->
  <rect x="650" y="148" width="135" height="50" rx="7" fill="#2e1e1e" stroke="#f87171" stroke-width="1.5"/>
  <text x="717" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f87171" font-weight="bold">🔔 Alertmanager</text>
  <text x="717" y="188" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#cccccc">Slack / PagerDuty</text>

  <line x1="636" y1="112" x2="650" y2="165" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Bottom note -->
  <text x="400" y="432" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888888">OTel Collector はベンダー中立のハブ — バックエンドを自由に切り替え可能</text>
  <text x="400" y="458" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#fbbf24">Trace ID で Metrics → Logs → Traces をシームレスに横断調査</text>
</svg>


---

# Grafana Stack ダッシュボード

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <!-- Background -->
  <rect width="800" height="500" fill="#1a1a2e"/>

  <!-- Title -->
  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">Grafana Observability Stack</text>

  <!-- Grafana Center Box -->
  <rect x="310" y="195" width="180" height="70" rx="10" fill="#f46800" opacity="0.9"/>
  <text x="400" y="226" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff" font-family="sans-serif">Grafana</text>
  <text x="400" y="248" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Dashboard / Visualization</text>

  <!-- Prometheus Box -->
  <rect x="60" y="100" width="160" height="65" rx="8" fill="#e6522c" opacity="0.85"/>
  <text x="140" y="128" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff" font-family="sans-serif">Prometheus</text>
  <text x="140" y="150" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Metrics Collection</text>

  <!-- Loki Box -->
  <rect x="60" y="310" width="160" height="65" rx="8" fill="#a78bfa" opacity="0.85"/>
  <text x="140" y="338" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff" font-family="sans-serif">Loki</text>
  <text x="140" y="360" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Log Aggregation</text>

  <!-- Tempo Box -->
  <rect x="580" y="100" width="160" height="65" rx="8" fill="#34d399" opacity="0.85"/>
  <text x="660" y="128" text-anchor="middle" font-size="15" font-weight="bold" fill="#1a1a2e" font-family="sans-serif">Tempo</text>
  <text x="660" y="150" text-anchor="middle" font-size="11" fill="#1a1a2e" font-family="sans-serif">Distributed Tracing</text>

  <!-- AlertManager Box -->
  <rect x="580" y="310" width="160" height="65" rx="8" fill="#60a5fa" opacity="0.85"/>
  <text x="660" y="338" text-anchor="middle" font-size="15" font-weight="bold" fill="#1a1a2e" font-family="sans-serif">AlertManager</text>
  <text x="660" y="360" text-anchor="middle" font-size="11" fill="#1a1a2e" font-family="sans-serif">Alert Routing</text>

  <!-- Arrow: Prometheus -> Grafana -->
  <line x1="220" y1="132" x2="308" y2="210" stroke="#e6522c" stroke-width="2"/>
  <polygon points="308,210 298,202 302,214" fill="#e6522c"/>

  <!-- Arrow: Loki -> Grafana -->
  <line x1="220" y1="342" x2="308" y2="260" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="308,260 298,262 304,252" fill="#a78bfa"/>

  <!-- Arrow: Tempo -> Grafana -->
  <line x1="580" y1="132" x2="492" y2="210" stroke="#34d399" stroke-width="2"/>
  <polygon points="492,210 498,200 504,212" fill="#34d399"/>

  <!-- Arrow: AlertManager -> Grafana -->
  <line x1="580" y1="342" x2="492" y2="260" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="492,260 502,254 500,266" fill="#60a5fa"/>

  <!-- Data Sources Label -->
  <text x="400" y="430" text-anchor="middle" font-size="13" fill="#94a3b8" font-family="sans-serif">K8s / Applications / Infrastructure</text>

  <!-- Arrow up from bottom -->
  <line x1="140" y1="420" x2="140" y2="378" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="140,378 135,390 145,390" fill="#94a3b8"/>
  <line x1="660" y1="420" x2="660" y2="378" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="660,378 655,390 665,390" fill="#94a3b8"/>

  <!-- Bottom source boxes -->
  <rect x="60" y="420" width="160" height="30" rx="5" fill="#2d2d44"/>
  <text x="140" y="440" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Logs / Metrics / Traces</text>
  <rect x="580" y="420" width="160" height="30" rx="5" fill="#2d2d44"/>
  <text x="660" y="440" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Rules / Alerts</text>

  <!-- Legend -->
  <rect x="310" y="300" width="180" height="80" rx="6" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="400" y="320" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Unified Observability</text>
  <text x="400" y="338" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">Metrics  Logs  Traces</text>
  <text x="400" y="356" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Correlated in one UI</text>
  <text x="400" y="374" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Grafana Datasource Integration</text>
</svg>
- Prometheus（メトリクス）・Loki（ログ）・Tempo（トレース）を統合可視化
- AlertManager によるアラートルーティングも Grafana UI から管理


---

# アラート設計パターン

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">アラート設計パターン</text>

  <!-- Alert Source -->
  <rect x="30" y="80" width="140" height="55" rx="8" fill="#e6522c" opacity="0.9"/>
  <text x="100" y="104" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" font-family="sans-serif">Alert Rules</text>
  <text x="100" y="122" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Prometheus/Loki</text>

  <!-- Arrow -->
  <line x1="170" y1="107" x2="205" y2="107" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="205,107 195,102 195,112" fill="#94a3b8"/>

  <!-- AlertManager -->
  <rect x="205" y="80" width="150" height="55" rx="8" fill="#f46800" opacity="0.9"/>
  <text x="280" y="104" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" font-family="sans-serif">AlertManager</text>
  <text x="280" y="122" text-anchor="middle" font-size="11" fill="#ffffff" font-family="sans-serif">Route / Deduplicate</text>

  <!-- Arrows down from AlertManager -->
  <line x1="240" y1="135" x2="180" y2="200" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="180,200 178,188 188,193" fill="#60a5fa"/>

  <line x1="280" y1="135" x2="280" y2="200" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="280,200 275,188 285,188" fill="#a78bfa"/>

  <line x1="320" y1="135" x2="380" y2="200" stroke="#34d399" stroke-width="2"/>
  <polygon points="380,200 374,190 384,190" fill="#34d399"/>

  <!-- Receiver boxes -->
  <rect x="100" y="200" width="140" height="55" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="170" y="224" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">PagerDuty</text>
  <text x="170" y="242" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">On-call P1/P2</text>

  <rect x="210" y="200" width="140" height="55" rx="8" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="280" y="224" text-anchor="middle" font-size="13" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Slack</text>
  <text x="280" y="242" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Team Notification</text>

  <rect x="320" y="200" width="140" height="55" rx="8" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <text x="390" y="224" text-anchor="middle" font-size="13" font-weight="bold" fill="#34d399" font-family="sans-serif">Email</text>
  <text x="390" y="242" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Weekly Report</text>

  <!-- Escalation -->
  <rect x="505" y="80" width="260" height="220" rx="10" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="635" y="105" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" font-family="sans-serif">Escalation Policy</text>

  <rect x="520" y="115" width="230" height="35" rx="6" fill="#e6522c" opacity="0.8"/>
  <text x="635" y="138" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">P1 Critical — 即時対応 (5min)</text>

  <rect x="520" y="158" width="230" height="35" rx="6" fill="#f46800" opacity="0.8"/>
  <text x="635" y="181" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">P2 High — 30分以内</text>

  <rect x="520" y="201" width="230" height="35" rx="6" fill="#a78bfa" opacity="0.8"/>
  <text x="635" y="224" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif">P3 Medium — 4時間以内</text>

  <rect x="520" y="244" width="230" height="35" rx="6" fill="#334155" opacity="0.8"/>
  <text x="635" y="267" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">P4 Low — 翌営業日</text>

  <!-- Inhibition rules box -->
  <rect x="30" y="310" width="450" height="80" rx="8" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="255" y="333" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="sans-serif">Inhibition Rules（抑制ルール）</text>
  <text x="255" y="355" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">上位アラート発火時に下位アラートを抑制</text>
  <text x="255" y="375" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">例: Node Down → Pod Crash を抑制</text>

  <!-- Silencing box -->
  <rect x="505" y="310" width="260" height="80" rx="8" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="635" y="333" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="sans-serif">Silencing（サイレンス）</text>
  <text x="635" y="355" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">メンテナンス時間帯の</text>
  <text x="635" y="375" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">アラート抑制設定</text>

  <!-- Footer note -->
  <text x="400" y="460" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">Grouping / Deduplication / Routing — AlertManager Core Features</text>
</svg>
- Inhibition Rules で上位障害発生時の下位アラートノイズを抑制
- P1〜P4 の重大度分類でエスカレーションポリシーを定義


---

# SLO/SLA 設定フレームワーク

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">SLO/SLA設定フレームワーク</text>

  <!-- SLI Layer (bottom) -->
  <rect x="100" y="370" width="600" height="80" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="400" y="400" text-anchor="middle" font-size="16" font-weight="bold" fill="#60a5fa" font-family="sans-serif">SLI — Service Level Indicator</text>
  <text x="400" y="422" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">実際に計測される指標: Latency, Availability, Error Rate, Throughput</text>
  <text x="400" y="440" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">例: 99.5% requests completed &lt; 200ms over last 30 days</text>

  <!-- Arrow up -->
  <line x1="400" y1="370" x2="400" y2="310" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="400,310 394,322 406,322" fill="#60a5fa"/>

  <!-- SLO Layer (middle) -->
  <rect x="150" y="220" width="500" height="90" rx="10" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="400" y="252" text-anchor="middle" font-size="16" font-weight="bold" fill="#a78bfa" font-family="sans-serif">SLO — Service Level Objective</text>
  <text x="400" y="272" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">内部目標値: SLIに対する具体的な達成目標</text>
  <text x="400" y="292" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">例: 可用性 99.9% / エラーレート &lt; 0.1% / レイテンシ p99 &lt; 500ms</text>

  <!-- Arrow up -->
  <line x1="400" y1="220" x2="400" y2="160" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="400,160 394,172 406,172" fill="#a78bfa"/>

  <!-- SLA Layer (top) -->
  <rect x="200" y="75" width="400" height="85" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="108" text-anchor="middle" font-size="16" font-weight="bold" fill="#34d399" font-family="sans-serif">SLA — Service Level Agreement</text>
  <text x="400" y="130" text-anchor="middle" font-size="12" fill="#94a3b8" font-family="sans-serif">顧客との契約: SLOを外部公約として定義</text>
  <text x="400" y="150" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">違反時にはペナルティ / クレジット発生</text>

  <!-- Error Budget box -->
  <rect x="560" y="210" width="205" height="140" rx="8" fill="#2d2a16" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="662" y="232" text-anchor="middle" font-size="13" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Error Budget</text>
  <text x="662" y="252" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">SLO 99.9% の場合</text>
  <text x="662" y="272" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">月間 = 43.2分の許容</text>
  <text x="662" y="292" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Burn Rate 監視で</text>
  <text x="662" y="312" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">残予算を可視化</text>
  <text x="662" y="332" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">消耗時 → Release Freeze</text>

  <!-- Left side notes -->
  <rect x="35" y="210" width="105" height="140" rx="8" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="87" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="sans-serif">計測 Tools</text>
  <text x="87" y="252" text-anchor="middle" font-size="10" fill="#60a5fa" font-family="sans-serif">Prometheus</text>
  <text x="87" y="270" text-anchor="middle" font-size="10" fill="#a78bfa" font-family="sans-serif">Grafana SLO</text>
  <text x="87" y="288" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">Sloth</text>
  <text x="87" y="306" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">OpenSLO</text>
  <text x="87" y="324" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Nobl9</text>
  <text x="87" y="342" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Google SRE</text>
</svg>
- SLI → SLO → SLA の階層で信頼性目標を体系化
- Error Budget を消費率（Burn Rate）で監視し Release Freeze の判断基準に活用


---

<!-- _class: lead -->
# セキュリティ

- GitOps + Platform Engineering におけるセキュリティ戦略
- Supply Chain Security・Secret管理・Policy as Code・RBAC の実践


---

# Supply Chain Security 全体像

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">Supply Chain Security 全体像</text>

  <!-- Stage 1: Code -->
  <rect x="20" y="75" width="120" height="70" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="80" y="102" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Code</text>
  <text x="80" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">SAST / Secrets</text>
  <text x="80" y="133" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Scan (Gitleaks)</text>

  <!-- Arrow -->
  <line x1="140" y1="110" x2="158" y2="110" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="158,110 148,105 148,115" fill="#60a5fa"/>

  <!-- Stage 2: Build -->
  <rect x="158" y="75" width="120" height="70" rx="8" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="218" y="102" text-anchor="middle" font-size="13" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Build</text>
  <text x="218" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Reproducible</text>
  <text x="218" y="133" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Builds / SBOM</text>

  <!-- Arrow -->
  <line x1="278" y1="110" x2="296" y2="110" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="296,110 286,105 286,115" fill="#a78bfa"/>

  <!-- Stage 3: Image -->
  <rect x="296" y="75" width="120" height="70" rx="8" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <text x="356" y="102" text-anchor="middle" font-size="13" font-weight="bold" fill="#34d399" font-family="sans-serif">Image</text>
  <text x="356" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Trivy / Grype</text>
  <text x="356" y="133" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Vuln Scan</text>

  <!-- Arrow -->
  <line x1="416" y1="110" x2="434" y2="110" stroke="#34d399" stroke-width="2"/>
  <polygon points="434,110 424,105 424,115" fill="#34d399"/>

  <!-- Stage 4: Sign -->
  <rect x="434" y="75" width="120" height="70" rx="8" fill="#2d2a16" stroke="#fbbf24" stroke-width="2"/>
  <text x="494" y="102" text-anchor="middle" font-size="13" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Sign</text>
  <text x="494" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Cosign / Sigstore</text>
  <text x="494" y="133" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Keyless Signing</text>

  <!-- Arrow -->
  <line x1="554" y1="110" x2="572" y2="110" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="572,110 562,105 562,115" fill="#fbbf24"/>

  <!-- Stage 5: Deploy -->
  <rect x="572" y="75" width="120" height="70" rx="8" fill="#3d1515" stroke="#f87171" stroke-width="2"/>
  <text x="632" y="102" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171" font-family="sans-serif">Deploy</text>
  <text x="632" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Policy Gates</text>
  <text x="632" y="133" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Admission Control</text>

  <!-- Divider -->
  <line x1="30" y1="175" x2="770" y2="175" stroke="#334155" stroke-width="1" stroke-dasharray="6,4"/>

  <!-- Tools row -->
  <text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" font-family="sans-serif">主要ツールエコシステム</text>

  <!-- Tool boxes row 1 -->
  <rect x="30" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1"/>
  <text x="85" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Sigstore</text>
  <text x="85" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">署名・検証基盤</text>

  <rect x="155" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#a78bfa" stroke-width="1"/>
  <text x="210" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#a78bfa" font-family="sans-serif">in-toto</text>
  <text x="210" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">サプライチェーン証明</text>

  <rect x="280" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#34d399" stroke-width="1"/>
  <text x="335" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#34d399" font-family="sans-serif">SLSA</text>
  <text x="335" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">成熟度フレームワーク</text>

  <rect x="405" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#fbbf24" stroke-width="1"/>
  <text x="460" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Rekor</text>
  <text x="460" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">透明性ログ</text>

  <rect x="530" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#f87171" stroke-width="1"/>
  <text x="585" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#f87171" font-family="sans-serif">Fulcio</text>
  <text x="585" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">短命証明書CA</text>

  <rect x="655" y="215" width="110" height="50" rx="6" fill="#16213e" stroke="#60a5fa" stroke-width="1"/>
  <text x="710" y="236" text-anchor="middle" font-size="11" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Syft / Grype</text>
  <text x="710" y="253" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">SBOM/脆弱性スキャン</text>

  <!-- SLSA Levels -->
  <rect x="30" y="295" width="740" height="80" rx="8" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="400" y="318" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="sans-serif">SLSA レベル</text>

  <rect x="50" y="328" width="130" height="34" rx="5" fill="#334155"/>
  <text x="115" y="350" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">L1: ビルド文書化</text>

  <rect x="200" y="328" width="130" height="34" rx="5" fill="#1e3a5f"/>
  <text x="265" y="350" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">L2: ホスト型サービス</text>

  <rect x="350" y="328" width="130" height="34" rx="5" fill="#2d1b4e"/>
  <text x="415" y="350" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">L3: 検証可能なビルド</text>

  <rect x="500" y="328" width="130" height="34" rx="5" fill="#1a3a2a"/>
  <text x="565" y="350" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">L4: 二人制 / 隔離環境</text>

  <!-- Policy enforcement box -->
  <rect x="30" y="395" width="740" height="60" rx="8" fill="#2d2a16" stroke="#fbbf24" stroke-width="1"/>
  <text x="400" y="420" text-anchor="middle" font-size="13" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Policy Enforcement</text>
  <text x="400" y="442" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">署名未検証イメージのデプロイを拒否 — Kyverno / OPA Gatekeeper</text>
</svg>
- コード→ビルド→イメージ→署名→デプロイの各フェーズにセキュリティゲートを配置
- SLSA レベル4 達成で二人制レビューと隔離ビルド環境を実現


---

# SBOM 管理戦略

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">SBOM 管理戦略</text>

  <!-- Phase 1: Generate -->
  <rect x="30" y="70" width="165" height="340" rx="10" fill="#16213e" stroke="#60a5fa" stroke-width="2"/>
  <text x="112" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">1. 生成</text>
  <text x="112" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Generate</text>

  <rect x="45" y="130" width="135" height="35" rx="5" fill="#1e3a5f"/>
  <text x="112" y="152" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">Syft</text>

  <rect x="45" y="172" width="135" height="35" rx="5" fill="#1e3a5f"/>
  <text x="112" y="194" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">Trivy (--format spdx)</text>

  <rect x="45" y="214" width="135" height="35" rx="5" fill="#1e3a5f"/>
  <text x="112" y="236" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">cdxgen</text>

  <text x="112" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">Format:</text>
  <text x="112" y="293" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">SPDX / CycloneDX</text>
  <text x="112" y="311" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">JSON / XML / Tag-Value</text>

  <!-- Arrow -->
  <line x1="195" y1="240" x2="215" y2="240" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="215,240 205,235 205,245" fill="#60a5fa"/>

  <!-- Phase 2: Store -->
  <rect x="215" y="70" width="165" height="340" rx="10" fill="#16213e" stroke="#a78bfa" stroke-width="2"/>
  <text x="297" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#a78bfa" font-family="sans-serif">2. 保管</text>
  <text x="297" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Store</text>

  <rect x="230" y="130" width="135" height="35" rx="5" fill="#2d1b4e"/>
  <text x="297" y="152" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">OCI Registry</text>

  <rect x="230" y="172" width="135" height="35" rx="5" fill="#2d1b4e"/>
  <text x="297" y="194" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Grype DB</text>

  <rect x="230" y="214" width="135" height="35" rx="5" fill="#2d1b4e"/>
  <text x="297" y="236" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Dependency Track</text>

  <text x="297" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">署名付き添付:</text>
  <text x="297" y="293" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">cosign attach sbom</text>
  <text x="297" y="311" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">--sbom sbom.spdx.json</text>

  <!-- Arrow -->
  <line x1="380" y1="240" x2="400" y2="240" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="400,240 390,235 390,245" fill="#a78bfa"/>

  <!-- Phase 3: Analyze -->
  <rect x="400" y="70" width="165" height="340" rx="10" fill="#16213e" stroke="#34d399" stroke-width="2"/>
  <text x="482" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">3. 分析</text>
  <text x="482" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Analyze</text>

  <rect x="415" y="130" width="135" height="35" rx="5" fill="#1a3a2a"/>
  <text x="482" y="152" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">Grype (CVE scan)</text>

  <rect x="415" y="172" width="135" height="35" rx="5" fill="#1a3a2a"/>
  <text x="482" y="194" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">OSS Review Toolkit</text>

  <rect x="415" y="214" width="135" height="35" rx="5" fill="#1a3a2a"/>
  <text x="482" y="236" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">License Compliance</text>

  <text x="482" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">出力:</text>
  <text x="482" y="293" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">脆弱性レポート</text>
  <text x="482" y="311" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ライセンスリスク一覧</text>

  <!-- Arrow -->
  <line x1="565" y1="240" x2="585" y2="240" stroke="#34d399" stroke-width="2"/>
  <polygon points="585,240 575,235 575,245" fill="#34d399"/>

  <!-- Phase 4: Act -->
  <rect x="585" y="70" width="185" height="340" rx="10" fill="#16213e" stroke="#fbbf24" stroke-width="2"/>
  <text x="677" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#fbbf24" font-family="sans-serif">4. 対応</text>
  <text x="677" y="118" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Act</text>

  <rect x="600" y="130" width="155" height="35" rx="5" fill="#2d2a16"/>
  <text x="677" y="152" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">Policy Gate (CI失敗)</text>

  <rect x="600" y="172" width="155" height="35" rx="5" fill="#2d2a16"/>
  <text x="677" y="194" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">自動PR作成 (Renovate)</text>

  <rect x="600" y="214" width="155" height="35" rx="5" fill="#2d2a16"/>
  <text x="677" y="236" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">Admission Block</text>

  <text x="677" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">閾値:</text>
  <text x="677" y="293" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Critical CVE → Block</text>
  <text x="677" y="311" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">High CVE → Warn</text>

  <!-- Footer -->
  <rect x="30" y="430" width="740" height="40" rx="6" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="400" y="455" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">SBOM = ソフトウェア部品表 (Software Bill of Materials) — Log4Shell等の即時影響範囲特定に活用</text>
</svg>
- 生成（Syft/cdxgen）→保管（OCI Registry/Dependency Track）→分析（Grype）→対応（Policy Gate）の4フェーズ
- Log4Shell 等のゼロデイ発生時に即時影響範囲を特定可能


---

# Policy as Code (OPA/Kyverno)

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#f9a825" font-family="sans-serif">Policy as Code (OPA/Kyverno)</text><circle cx="400" cy="200" r="120" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="8,4"/><rect x="320" y="60" width="160" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Git Repository</text><polygon points="530,155 520,145 540,145" fill="#60a5fa"/><rect x="545" y="130" width="160" height="50" rx="8" fill="#16213e" stroke="#60a5fa" stroke-width="2"/><text x="625" y="155" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="sans-serif">Desired State</text><polygon points="550,262 540,272 560,272" fill="#e91e63"/><rect x="545" y="270" width="160" height="50" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="625" y="300" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">Actual State</text><polygon points="268,270 258,260 278,260" fill="#34d399"/><rect x="95" y="270" width="160" height="50" rx="8" fill="#16213e" stroke="#34d399" stroke-width="2"/><text x="175" y="295" text-anchor="middle" fill="#34d399" font-size="13" font-family="sans-serif">Reconcile</text><text x="175" y="311" text-anchor="middle" fill="#34d399" font-size="11" font-family="sans-serif">Apply Diff</text><polygon points="255,148 265,138 245,138" fill="#a78bfa"/><rect x="95" y="130" width="160" height="50" rx="8" fill="#16213e" stroke="#a78bfa" stroke-width="2"/><text x="175" y="155" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="sans-serif">Observe</text><text x="175" y="171" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Watch Cluster</text><rect x="340" y="172" width="120" height="56" rx="8" fill="#0f3460" stroke="#ffffff" stroke-width="1.5"/><text x="400" y="198" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">ArgoCD</text><text x="400" y="218" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">Controller</text><text x="400" y="370" text-anchor="middle" fill="#a0a0b0" font-size="11" font-family="sans-serif">Continuous reconciliation loop — drift auto-healed within seconds</text></svg>
- Kyverno ClusterPolicy で最新タグイメージのデプロイを拒否
- OPA Gatekeeper では Rego でカスタムポリシーを記述

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-latest-tag
spec:
  validationFailureAction: Enforce
  rules:
  - name: require-image-tag
    match:
      any:
      - resources:
          kinds: [Pod]
    validate:
      message: "latestタグの使用は禁止"
      pattern:
        spec:
          containers:
          - image: "*:*"
```


---

# Secret 管理アーキテクチャ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">Secret管理アーキテクチャ</text>

  <!-- Vault -->
  <rect x="290" y="65" width="220" height="75" rx="10" fill="#2d2a16" stroke="#fbbf24" stroke-width="2"/>
  <text x="400" y="93" text-anchor="middle" font-size="16" font-weight="bold" fill="#fbbf24" font-family="sans-serif">HashiCorp Vault</text>
  <text x="400" y="113" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">Secret Engine / Auth Method</text>
  <text x="400" y="130" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">KV / PKI / DB / AWS / K8s Auth</text>

  <!-- External Secrets Operator -->
  <rect x="55" y="215" width="210" height="70" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="160" y="241" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">External Secrets Operator</text>
  <text x="160" y="260" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ExternalSecret CR → K8s Secret</text>
  <text x="160" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">自動同期 / TTL管理</text>

  <!-- Secrets Store CSI Driver -->
  <rect x="535" y="215" width="210" height="70" rx="8" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="640" y="241" text-anchor="middle" font-size="13" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Secrets Store CSI Driver</text>
  <text x="640" y="260" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Volume Mount → Pod内ファイル</text>
  <text x="640" y="275" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">環境変数への自動同期</text>

  <!-- Arrow: Vault -> ESO -->
  <line x1="310" y1="140" x2="210" y2="215" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="210,215 212,202 222,210" fill="#fbbf24"/>

  <!-- Arrow: Vault -> CSI -->
  <line x1="490" y1="140" x2="590" y2="215" stroke="#fbbf24" stroke-width="2"/>
  <polygon points="590,215 580,207 590,202" fill="#fbbf24"/>

  <!-- K8s Secret -->
  <rect x="290" y="340" width="220" height="60" rx="8" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <text x="400" y="366" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">K8s Secret</text>
  <text x="400" y="386" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="sans-serif">自動生成・更新・ローテーション</text>

  <!-- Arrow: ESO -> K8s Secret -->
  <line x1="200" y1="285" x2="310" y2="340" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="310,340 302,330 314,330" fill="#60a5fa"/>

  <!-- Arrow: CSI -> K8s Secret -->
  <line x1="600" y1="285" x2="490" y2="340" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="490,340 488,328 500,330" fill="#a78bfa"/>

  <!-- Pod -->
  <rect x="290" y="430" width="220" height="45" rx="8" fill="#16213e" stroke="#334155" stroke-width="1.5"/>
  <text x="400" y="457" text-anchor="middle" font-size="13" fill="#94a3b8" font-family="sans-serif">Application Pod</text>

  <!-- Arrow: K8s Secret -> Pod -->
  <line x1="400" y1="400" x2="400" y2="430" stroke="#34d399" stroke-width="2"/>
  <polygon points="400,430 394,418 406,418" fill="#34d399"/>

  <!-- Cloud Providers -->
  <rect x="30" y="65" width="120" height="55" rx="6" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="90" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="sans-serif">AWS SM</text>
  <text x="90" y="108" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Secrets Manager</text>

  <rect x="650" y="65" width="120" height="55" rx="6" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="710" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="sans-serif">Azure KV</text>
  <text x="710" y="108" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Key Vault</text>

  <!-- Arrow: AWS SM -> ESO -->
  <line x1="90" y1="120" x2="100" y2="215" stroke="#334155" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="100,215 94,203 106,203" fill="#334155"/>

  <!-- Arrow: Azure KV -> CSI -->
  <line x1="710" y1="120" x2="690" y2="215" stroke="#334155" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="690,215 686,203 698,203" fill="#334155"/>

  <!-- GCP label -->
  <rect x="340" y="165" width="120" height="35" rx="5" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="400" y="187" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">GCP Secret Manager</text>
</svg>
- Vault を中央 Secret Store とし ESO / CSI Driver で K8s Secret を自動同期
- AWS Secrets Manager・Azure Key Vault 等のクラウドネイティブ Secret とも統合可能


---

# RBAC 設計パターン

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">RBAC 設計パターン (Kubernetes)</text>

  <!-- ServiceAccount -->
  <rect x="30" y="80" width="160" height="60" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <text x="110" y="106" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">ServiceAccount</text>
  <text x="110" y="126" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">namespace: app-ns</text>

  <!-- Arrow: SA -> RoleBinding -->
  <line x1="190" y1="110" x2="250" y2="200" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="250,200 244,188 254,188" fill="#60a5fa"/>

  <!-- Role -->
  <rect x="30" y="230" width="160" height="60" rx="8" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <text x="110" y="256" text-anchor="middle" font-size="14" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Role</text>
  <text x="110" y="274" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">rules: [verbs, resources]</text>

  <!-- Arrow: Role -> RoleBinding -->
  <line x1="190" y1="260" x2="250" y2="250" stroke="#a78bfa" stroke-width="2"/>
  <polygon points="250,250 238,245 240,256" fill="#a78bfa"/>

  <!-- RoleBinding -->
  <rect x="250" y="180" width="160" height="70" rx="8" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <text x="330" y="208" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">RoleBinding</text>
  <text x="330" y="228" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">binds SA ↔ Role</text>
  <text x="330" y="243" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">namespace-scoped</text>

  <!-- ClusterRole -->
  <rect x="30" y="370" width="160" height="60" rx="8" fill="#3d1515" stroke="#f87171" stroke-width="2"/>
  <text x="110" y="396" text-anchor="middle" font-size="14" font-weight="bold" fill="#f87171" font-family="sans-serif">ClusterRole</text>
  <text x="110" y="414" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">cluster-wide resources</text>

  <!-- ClusterRoleBinding -->
  <rect x="250" y="370" width="160" height="60" rx="8" fill="#2d2a16" stroke="#fbbf24" stroke-width="2"/>
  <text x="330" y="392" text-anchor="middle" font-size="14" font-weight="bold" fill="#fbbf24" font-family="sans-serif">ClusterRoleBinding</text>
  <text x="330" y="412" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">cluster-wide binding</text>

  <!-- Arrow: ClusterRole -> CRB -->
  <line x1="190" y1="400" x2="250" y2="400" stroke="#f87171" stroke-width="2"/>
  <polygon points="250,400 240,395 240,405" fill="#f87171"/>

  <!-- Arrow: SA -> CRB -->
  <line x1="110" y1="140" x2="110" y2="370" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="110" y1="370" x2="250" y2="400" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="250,400 238,396 240,406" fill="#60a5fa"/>

  <!-- Best practices box -->
  <rect x="460" y="70" width="310" height="380" rx="10" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="615" y="98" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" font-family="sans-serif">RBAC ベストプラクティス</text>

  <rect x="475" y="110" width="280" height="40" rx="5" fill="#1e3a5f"/>
  <text x="615" y="127" text-anchor="middle" font-size="12" fill="#60a5fa" font-family="sans-serif">最小権限の原則</text>
  <text x="615" y="143" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">必要なverbs/resourcesのみ許可</text>

  <rect x="475" y="158" width="280" height="40" rx="5" fill="#2d1b4e"/>
  <text x="615" y="175" text-anchor="middle" font-size="12" fill="#a78bfa" font-family="sans-serif">Namespace分離</text>
  <text x="615" y="191" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ClusterRoleより Role優先</text>

  <rect x="475" y="206" width="280" height="40" rx="5" fill="#1a3a2a"/>
  <text x="615" y="223" text-anchor="middle" font-size="12" fill="#34d399" font-family="sans-serif">専用 ServiceAccount</text>
  <text x="615" y="239" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">defaultアカウント使用禁止</text>

  <rect x="475" y="254" width="280" height="40" rx="5" fill="#2d2a16"/>
  <text x="615" y="271" text-anchor="middle" font-size="12" fill="#fbbf24" font-family="sans-serif">定期的な権限監査</text>
  <text x="615" y="287" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">kubectl-who-can / rbac-tool</text>

  <rect x="475" y="302" width="280" height="40" rx="5" fill="#3d1515"/>
  <text x="615" y="319" text-anchor="middle" font-size="12" fill="#f87171" font-family="sans-serif">wildcardの禁止</text>
  <text x="615" y="335" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">verbs: ["*"] は全て禁止</text>

  <rect x="475" y="350" width="280" height="55" rx="5" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <text x="615" y="368" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="sans-serif">Aggregated ClusterRole</text>
  <text x="615" y="386" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ラベルで権限を動的集約</text>
  <text x="615" y="400" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">rbac.authorization.k8s.io/aggregate-to-view</text>
</svg>
- ServiceAccount → Role → RoleBinding の三層構造で最小権限を徹底
- ClusterRole の wildcard (verbs: ["*"]) は全面禁止、定期的な kubectl-who-can による監査を実施


---

<!-- _class: lead -->
# 組織・導入戦略

- Platform Engineering の組織設計と段階的な導入アプローチ
- チーム構成・ロードマップ・成熟度モデルで持続可能な変革を推進


---

# 導入ロードマップ

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">導入ロードマップ</text>

  <!-- Phase 0 -->
  <rect x="30" y="65" width="150" height="390" rx="10" fill="#16213e" stroke="#475569" stroke-width="1.5"/>
  <rect x="30" y="65" width="150" height="40" rx="10" fill="#334155"/>
  <text x="105" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#94a3b8" font-family="sans-serif">Phase 0</text>
  <text x="105" y="108" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">準備 (1-2ヶ月)</text>
  <text x="105" y="135" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">現状調査</text>
  <text x="105" y="153" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">チーム形成</text>
  <text x="105" y="171" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ツール選定</text>
  <text x="105" y="189" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">POC環境構築</text>
  <text x="105" y="207" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">KPIの定義</text>

  <!-- Phase 1 -->
  <rect x="193" y="65" width="150" height="390" rx="10" fill="#1e3a5f" stroke="#60a5fa" stroke-width="2"/>
  <rect x="193" y="65" width="150" height="40" rx="10" fill="#1e4a7f"/>
  <text x="268" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Phase 1</text>
  <text x="268" y="108" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">基盤構築 (3-6ヶ月)</text>
  <text x="268" y="135" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">Git リポジトリ整備</text>
  <text x="268" y="155" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">CI/CD パイプライン</text>
  <text x="268" y="175" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">IaC (Terraform)</text>
  <text x="268" y="195" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">Container Registry</text>
  <text x="268" y="215" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">基本Monitoring</text>
  <text x="268" y="250" text-anchor="middle" font-size="10" fill="#334155" font-family="sans-serif">Milestone:</text>
  <text x="268" y="268" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">デプロイ自動化率</text>
  <text x="268" y="284" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">50% 達成</text>

  <!-- Phase 2 -->
  <rect x="356" y="65" width="150" height="390" rx="10" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <rect x="356" y="65" width="150" height="40" rx="10" fill="#3d2b6e"/>
  <text x="431" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Phase 2</text>
  <text x="431" y="108" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">GitOps化 (6-12ヶ月)</text>
  <text x="431" y="135" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">ArgoCD 導入</text>
  <text x="431" y="155" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">App-of-Apps 設計</text>
  <text x="431" y="175" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Secret管理(ESO)</text>
  <text x="431" y="195" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Policy as Code</text>
  <text x="431" y="215" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">SLO策定</text>
  <text x="431" y="250" text-anchor="middle" font-size="10" fill="#334155" font-family="sans-serif">Milestone:</text>
  <text x="431" y="268" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">全環境GitOps化</text>
  <text x="431" y="284" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Manual deploy = 0</text>

  <!-- Phase 3 -->
  <rect x="519" y="65" width="150" height="390" rx="10" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <rect x="519" y="65" width="150" height="40" rx="10" fill="#2a5a3a"/>
  <text x="594" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#34d399" font-family="sans-serif">Phase 3</text>
  <text x="594" y="108" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">高度化 (12-18ヶ月)</text>
  <text x="594" y="135" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">IDPポータル構築</text>
  <text x="594" y="155" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">Self-serviceテンプレ</text>
  <text x="594" y="175" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">Supply Chain Sec</text>
  <text x="594" y="195" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">FinOps統合</text>
  <text x="594" y="215" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">Chaos Engineering</text>
  <text x="594" y="250" text-anchor="middle" font-size="10" fill="#334155" font-family="sans-serif">Milestone:</text>
  <text x="594" y="268" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">開発者セルフサービス</text>
  <text x="594" y="284" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">率 80%+</text>

  <!-- Phase 4 -->
  <rect x="682" y="65" width="88" height="390" rx="10" fill="#2d2a16" stroke="#fbbf24" stroke-width="2"/>
  <rect x="682" y="65" width="88" height="40" rx="10" fill="#4d4a2e"/>
  <text x="726" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Phase 4</text>
  <text x="726" y="108" text-anchor="middle" font-size="9" fill="#475569" font-family="sans-serif">最適化</text>
  <text x="726" y="135" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">AI/ML Ops</text>
  <text x="726" y="153" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">予測スケール</text>
  <text x="726" y="171" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">コスト最適化</text>
  <text x="726" y="189" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">継続改善</text>

  <!-- Timeline bar at bottom -->
  <rect x="30" y="470" width="740" height="18" rx="4" fill="#16213e" stroke="#334155" stroke-width="1"/>
  <rect x="30" y="470" width="163" height="18" rx="4" fill="#334155"/>
  <rect x="193" y="470" width="163" height="18" rx="4" fill="#1e4a7f"/>
  <rect x="356" y="470" width="163" height="18" rx="4" fill="#3d2b6e"/>
  <rect x="519" y="470" width="163" height="18" rx="4" fill="#2a5a3a"/>
  <rect x="682" y="470" width="88" height="18" rx="4" fill="#4d4a2e"/>
</svg>
- Phase 0（準備）→ Phase 1（基盤）→ Phase 2（GitOps化）→ Phase 3（高度化）→ Phase 4（最適化）
- 各フェーズに明確な Milestone を設定し ROI を継続的に測定


---

# チーム構成モデル

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">チーム構成モデル</text>

  <!-- Platform Team -->
  <rect x="30" y="65" width="340" height="380" rx="12" fill="#16213e" stroke="#a78bfa" stroke-width="2"/>
  <rect x="30" y="65" width="340" height="45" rx="12" fill="#2d1b4e"/>
  <text x="200" y="94" text-anchor="middle" font-size="16" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Platform Team</text>

  <!-- Platform members -->
  <rect x="50" y="125" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1"/>
  <text x="120" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Platform Engineer</text>
  <text x="120" y="165" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">IDP / 基盤構築</text>

  <rect x="210" y="125" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1"/>
  <text x="280" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">SRE</text>
  <text x="280" y="165" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">信頼性 / SLO管理</text>

  <rect x="50" y="190" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1"/>
  <text x="120" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Security Engineer</text>
  <text x="120" y="230" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Policy / SecOps</text>

  <rect x="210" y="190" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1"/>
  <text x="280" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">DevOps Lead</text>
  <text x="280" y="230" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">CI/CD / GitOps</text>

  <!-- Platform responsibilities -->
  <rect x="50" y="258" width="300" height="165" rx="6" fill="#1a1a2e" stroke="#334155" stroke-width="1"/>
  <text x="200" y="280" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="sans-serif">提供するもの (Golden Path)</text>
  <text x="200" y="300" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">K8s クラスター管理</text>
  <text x="200" y="318" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">CI/CD テンプレート</text>
  <text x="200" y="336" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Secret / RBAC 管理</text>
  <text x="200" y="354" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Observability Stack</text>
  <text x="200" y="372" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">IDP Self-service Portal</text>
  <text x="200" y="390" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">コスト可視化 (FinOps)</text>

  <!-- Arrows / interaction -->
  <line x1="370" y1="255" x2="430" y2="255" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="430,255 418,249 418,261" fill="#34d399"/>
  <text x="400" y="245" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">APIs / Portals</text>
  <line x1="430" y1="285" x2="370" y2="285" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="370,285 382,279 382,291" fill="#fbbf24"/>
  <text x="400" y="305" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">Feedback</text>

  <!-- Product Teams -->
  <rect x="430" y="65" width="340" height="380" rx="12" fill="#16213e" stroke="#60a5fa" stroke-width="2"/>
  <rect x="430" y="65" width="340" height="45" rx="12" fill="#1e3a5f"/>
  <text x="600" y="94" text-anchor="middle" font-size="16" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Product Teams (x N)</text>

  <!-- Product team members -->
  <rect x="450" y="125" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#60a5fa" stroke-width="1"/>
  <text x="520" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Backend Dev</text>
  <text x="520" y="165" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">API / Service開発</text>

  <rect x="610" y="125" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#60a5fa" stroke-width="1"/>
  <text x="680" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Frontend Dev</text>
  <text x="680" y="165" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">UI / BFF開発</text>

  <rect x="450" y="190" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#60a5fa" stroke-width="1"/>
  <text x="520" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">QA Engineer</text>
  <text x="520" y="230" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">テスト自動化</text>

  <rect x="610" y="190" width="140" height="50" rx="6" fill="#1a1a2e" stroke="#60a5fa" stroke-width="1"/>
  <text x="680" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Product Owner</text>
  <text x="680" y="230" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">要件定義</text>

  <!-- Product team focus -->
  <rect x="450" y="258" width="300" height="165" rx="6" fill="#1a1a2e" stroke="#334155" stroke-width="1"/>
  <text x="600" y="280" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="sans-serif">集中できること</text>
  <text x="600" y="300" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">ビジネスロジックの実装</text>
  <text x="600" y="318" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">機能開発・リリース速度</text>
  <text x="600" y="336" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">プラットフォームの活用</text>
  <text x="600" y="354" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">SLO遵守・アラート対応</text>
  <text x="600" y="372" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">フィードバックの提供</text>
  <text x="600" y="390" text-anchor="middle" font-size="11" fill="#60a5fa" font-family="sans-serif">インフラ管理は不要</text>

  <!-- Topology label -->
  <text x="400" y="472" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">Team Topologies: Platform Team → Enabling / X-as-a-Service</text>
</svg>
- Platform Team が Golden Path（IDP・CI/CD・Observability）を提供し Product Team は機能開発に集中
- Team Topologies の「X-as-a-Service」モデルで認知負荷を低減


---

# よくある落とし穴

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">よくある落とし穴 — アンチパターン &amp; 対策</text>

  <!-- Header row -->
  <rect x="30" y="60" width="350" height="35" rx="5" fill="#3d1515"/>
  <text x="205" y="83" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171" font-family="sans-serif">アンチパターン</text>
  <rect x="420" y="60" width="350" height="35" rx="5" fill="#1a3a2a"/>
  <text x="595" y="83" text-anchor="middle" font-size="13" font-weight="bold" fill="#34d399" font-family="sans-serif">対策 / ベストプラクティス</text>

  <!-- Row 1 -->
  <rect x="30" y="100" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">ビッグバン移行</text>
  <text x="205" y="140" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">全サービスを一気にGitOps化しようとする</text>
  <rect x="420" y="100" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">パイロット→段階移行</text>
  <text x="595" y="140" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">1チーム・1サービスで実証後に展開</text>

  <!-- Row 2 -->
  <rect x="30" y="160" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">過度なカスタマイズ</text>
  <text x="205" y="200" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ツールをカスタマイズし過ぎて保守不能に</text>
  <rect x="420" y="160" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">Upstream準拠</text>
  <text x="595" y="200" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">デフォルト設定優先、拡張は最小限に</text>

  <!-- Row 3 -->
  <rect x="30" y="220" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">Platform Teamの孤立</text>
  <text x="205" y="260" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">開発チームのニーズを無視した基盤構築</text>
  <rect x="420" y="220" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">製品思考 (Product Thinking)</text>
  <text x="595" y="260" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">定期的なフィードバックループの確立</text>

  <!-- Row 4 -->
  <rect x="30" y="280" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="300" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">ドキュメント不足</text>
  <text x="205" y="320" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">使い方が分からず開発者が使わない</text>
  <rect x="420" y="280" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="300" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">Developer Portal (Backstage)</text>
  <text x="595" y="320" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">ドキュメント・カタログを一元管理</text>

  <!-- Row 5 -->
  <rect x="30" y="340" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="360" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">Secretのハードコーディング</text>
  <text x="205" y="380" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Gitリポジトリに認証情報を直接コミット</text>
  <rect x="420" y="340" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="360" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">ESO + Vault</text>
  <text x="595" y="380" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Gitleaks でCIブロック、Secret自動ローテーション</text>

  <!-- Row 6 -->
  <rect x="30" y="400" width="350" height="55" rx="4" fill="#2a1010" stroke="#f87171" stroke-width="1"/>
  <text x="205" y="420" text-anchor="middle" font-size="12" font-weight="bold" fill="#f87171" font-family="sans-serif">可観測性の後回し</text>
  <text x="205" y="440" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">障害発生時に原因究明ができない</text>
  <rect x="420" y="400" width="350" height="55" rx="4" fill="#101a15" stroke="#34d399" stroke-width="1"/>
  <text x="595" y="420" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">Observability First</text>
  <text x="595" y="440" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">Phase 1からGrafana Stack導入</text>

  <!-- Arrow divider -->
  <line x1="390" y1="60" x2="390" y2="455" stroke="#334155" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="405" y="83" text-anchor="middle" font-size="14" fill="#334155" font-family="sans-serif">→</text>
</svg>
- ビッグバン移行・過度なカスタマイズ・Platform Team の孤立が三大失敗パターン
- パイロット検証と製品思考（Product Thinking）で失敗リスクを最小化


---

# 成熟度モデル

- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
  <rect width="800" height="500" fill="#1a1a2e"/>

  <text x="400" y="36" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="sans-serif">Platform Engineering 成熟度モデル</text>

  <!-- Level bars -->
  <!-- Level 1 -->
  <rect x="30" y="70" width="140" height="390" rx="8" fill="#16213e" stroke="#475569" stroke-width="1.5"/>
  <rect x="30" y="70" width="140" height="40" rx="8" fill="#334155"/>
  <text x="100" y="97" text-anchor="middle" font-size="14" font-weight="bold" fill="#94a3b8" font-family="sans-serif">Level 1</text>
  <text x="100" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#94a3b8" font-family="sans-serif">Ad-hoc</text>
  <text x="100" y="155" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">手動デプロイ</text>
  <text x="100" y="173" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">ドキュメントなし</text>
  <text x="100" y="191" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">各チームが独自</text>
  <text x="100" y="209" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">に運用</text>
  <text x="100" y="235" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">---</text>
  <text x="100" y="255" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">目標:</text>
  <text x="100" y="273" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">脱・手作業</text>

  <!-- Level 2 -->
  <rect x="182" y="70" width="140" height="390" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <rect x="182" y="70" width="140" height="40" rx="8" fill="#1e4a7f"/>
  <text x="252" y="97" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Level 2</text>
  <text x="252" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" font-family="sans-serif">Repeatable</text>
  <text x="252" y="155" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">基本CI/CD</text>
  <text x="252" y="173" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">IaC導入済み</text>
  <text x="252" y="191" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">コンテナ化完了</text>
  <text x="252" y="209" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">基本監視あり</text>
  <text x="252" y="235" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">---</text>
  <text x="252" y="255" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">目標:</text>
  <text x="252" y="273" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">標準化</text>

  <!-- Level 3 -->
  <rect x="334" y="70" width="140" height="390" rx="8" fill="#2d1b4e" stroke="#a78bfa" stroke-width="2"/>
  <rect x="334" y="70" width="140" height="40" rx="8" fill="#3d2b6e"/>
  <text x="404" y="97" text-anchor="middle" font-size="14" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Level 3</text>
  <text x="404" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#a78bfa" font-family="sans-serif">Defined</text>
  <text x="404" y="155" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">GitOps全面導入</text>
  <text x="404" y="173" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">SLO策定済み</text>
  <text x="404" y="191" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Policy as Code</text>
  <text x="404" y="209" text-anchor="middle" font-size="11" fill="#a78bfa" font-family="sans-serif">Platform Team</text>
  <text x="404" y="235" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">---</text>
  <text x="404" y="255" text-anchor="middle" font-size="10" fill="#a78bfa" font-family="sans-serif">目標:</text>
  <text x="404" y="273" text-anchor="middle" font-size="10" fill="#a78bfa" font-family="sans-serif">自動化率80%</text>

  <!-- Level 4 -->
  <rect x="486" y="70" width="140" height="390" rx="8" fill="#1a3a2a" stroke="#34d399" stroke-width="2"/>
  <rect x="486" y="70" width="140" height="40" rx="8" fill="#2a5a3a"/>
  <text x="556" y="97" text-anchor="middle" font-size="14" font-weight="bold" fill="#34d399" font-family="sans-serif">Level 4</text>
  <text x="556" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#34d399" font-family="sans-serif">Managed</text>
  <text x="556" y="155" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">IDPセルフサービス</text>
  <text x="556" y="173" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">Supply Chain Sec</text>
  <text x="556" y="191" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">FinOps統合</text>
  <text x="556" y="209" text-anchor="middle" font-size="11" fill="#34d399" font-family="sans-serif">DORA改善測定</text>
  <text x="556" y="235" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">---</text>
  <text x="556" y="255" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">目標:</text>
  <text x="556" y="273" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">開発者満足度↑</text>

  <!-- Level 5 -->
  <rect x="638" y="70" width="132" height="390" rx="8" fill="#2d2a16" stroke="#fbbf24" stroke-width="2.5"/>
  <rect x="638" y="70" width="132" height="40" rx="8" fill="#4d4a2e"/>
  <text x="704" y="97" text-anchor="middle" font-size="14" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Level 5</text>
  <text x="704" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#fbbf24" font-family="sans-serif">Optimizing</text>
  <text x="704" y="155" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">AI/ML Operations</text>
  <text x="704" y="173" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">予測的スケール</text>
  <text x="704" y="191" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">自己修復システム</text>
  <text x="704" y="209" text-anchor="middle" font-size="11" fill="#fbbf24" font-family="sans-serif">継続的改善文化</text>
  <text x="704" y="235" text-anchor="middle" font-size="10" fill="#475569" font-family="sans-serif">---</text>
  <text x="704" y="255" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">目標:</text>
  <text x="704" y="273" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">業界リーダー</text>

  <!-- Progress staircase visual at bottom -->
  <rect x="30" y="390" width="140" height="20" rx="3" fill="#334155" opacity="0.8"/>
  <rect x="182" y="370" width="140" height="40" rx="3" fill="#1e4a7f" opacity="0.8"/>
  <rect x="334" y="345" width="140" height="65" rx="3" fill="#3d2b6e" opacity="0.8"/>
  <rect x="486" y="315" width="140" height="95" rx="3" fill="#2a5a3a" opacity="0.8"/>
  <rect x="638" y="278" width="132" height="132" rx="3" fill="#4d4a2e" opacity="0.8"/>

  <text x="100" y="405" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="sans-serif">L1</text>
  <text x="252" y="392" text-anchor="middle" font-size="10" fill="#60a5fa" font-family="sans-serif">L2</text>
  <text x="404" y="375" text-anchor="middle" font-size="10" fill="#a78bfa" font-family="sans-serif">L3</text>
  <text x="556" y="355" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">L4</text>
  <text x="704" y="330" text-anchor="middle" font-size="10" fill="#fbbf24" font-family="sans-serif">L5</text>

  <!-- Footer -->
  <text x="400" y="478" text-anchor="middle" font-size="11" fill="#475569" font-family="sans-serif">CNCF Platforms Working Group / Gartner Platform Engineering参考</text>
</svg>
- Level 1（Ad-hoc）→ Level 3（GitOps全面導入）→ Level 5（AI/ML Ops・自己修復）の5段階
- CNCF Platforms Working Group / Gartner 参考 — 現在地の把握と次のステップの特定に活用


---

<!-- _class: lead -->
# まとめ & 次のアクション

- GitOps はすべての変更を Git で管理し、宣言的・自動的に環境へ適用する運用哲学
- Platform Engineering は開発者体験（DevEx）向上を製品思考で実現し認知負荷を削減
- Observability（Grafana Stack）・SLO・Error Budget が信頼性文化の基盤
- Supply Chain Security（SBOM・Sigstore・SLSA）でソフトウェアの信頼性を証明
- 【次のアクション】① パイロットチームを選定 ② ArgoCD + Grafana Stack を導入 ③ SLO を策定 ④ Platform Team を組成

