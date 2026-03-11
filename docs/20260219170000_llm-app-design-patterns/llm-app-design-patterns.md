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

<!-- _class: lead -->
# LLMアプリ設計パターン完全ガイド

- RAG・Fine-tuning・Agents・評価フレームワーク
- アーキテクト・テックリード向け実践ガイド
- 2026年版


---

# アジェンダ（1/2）

- **Section 1:** LLMアプリの基礎と技術選定
- **Section 2:** プロンプトエンジニアリング
- **Section 3:** RAG設計パターン（16スライド）
- **Section 4:** Fine-tuning（13スライド）
- **Section 5:** AIエージェント設計（17スライド）


---

# アジェンダ（2/2）

- **Section 6:** 評価フレームワーク（12スライド）
- **Section 7:** プロダクション設計パターン（14スライド）
- **Section 8:** 設計選択ガイド・まとめ（8スライド）
- ---
- 全100スライド・所要時間：約60分


---

# LLMアプリ開発の現在地（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **なぜ設計パターンが必要か**
- LLMは強力だが「万能ツール」ではない — 使い方を間違えると高コスト・低品質・セキュリティリスク
- **3つの現実的課題**
- ① ハルシネーション — 事実と異なる回答を自信を持って返す


---

# LLMアプリ開発の現在地（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- ② 知識カットオフ — 最新情報・内部データにアクセスできない
- ③ コスト爆発 — 非効率な実装は月数十万円のAPI費用に
- **本ガイドのゴール**
- 「どのパターンをいつ使うか」の意思決定フレームワークを提供


---

<!-- _class: lead -->
# Section 1: LLMアプリの基礎

- 技術選定・アーキテクチャ・トレードオフ


---

# LLMの仕組みと限界（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **LLMの本質**: 次のトークンを確率的に予測するニューラルネットワーク
- **強み**
- 自然言語理解・生成、コード生成、推論、要約、翻訳
- **根本的な限界**


---

# LLMの仕組みと限界（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ハルシネーション（確率的生成のため「それらしい嘘」を生成）
- 知識カットオフ（学習データの日付で知識が固定）
- コンテキスト制限（入力長に上限 — GPT-4o: 128K、Claude 3.5: 200K）
- 決定論的でない（同じ入力でも毎回異なる出力）
- 内部状態なし（ステートレス — セッション間で記憶を保持しない）


---

# 4つの主要アプローチ概観（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **① プロンプトエンジニアリング** — モデルを変えずに指示を工夫
- 適用場面: ほぼすべてのタスク。最初に試すべきアプローチ
- **② RAG（検索拡張生成）** — 外部知識をリアルタイムで注入
- 適用場面: 最新情報・社内文書・大規模知識ベース


---

# 4つの主要アプローチ概観（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **③ Fine-tuning** — モデルの重みを特定タスク向けに更新
- 適用場面: 特定スタイル・ドメイン特化・プロンプトでは達成困難な品質
- **④ AIエージェント** — ツールを使い複数ステップで自律実行
- 適用場面: 複雑な推論・外部API連携・繰り返し作業の自動化


---

# アーキテクチャの共通コンポーネント

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **入力層**: ユーザー入力の受付・バリデーション・サニタイズ
- **プロンプト構築層**: テンプレート管理・コンテキスト注入・Few-shot例
- **LLM呼び出し層**: モデル選択・パラメータ管理・リトライ・フォールバック
- **後処理層**: 出力パース・バリデーション・フィルタリング
- **観測可能性層**: ログ・トレース・コスト追跡・評価メトリクス
- **キャッシュ層**: セマンティックキャッシュ・レスポンスキャッシュ


---

# コスト・レイテンシ・品質のトレードオフ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **プロンプトエンジニアリング**: コスト○ レイテンシ○ 品質△（上限あり）
- **RAG**: コスト△（ベクターDB費用追加） レイテンシ△（検索時間） 品質○
- **Fine-tuning**: コスト✗（学習費用高） レイテンシ○（小モデル可） 品質◎
- **エージェント**: コスト✗（多回呼び出し） レイテンシ✗（秒〜分） 品質◎
- ---
- **鉄則**: 複雑なアプローチを先に採用しない
- Prompt → RAG → Fine-tuning → Agents の順で評価


---

# 技術選定フレームワーク（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **Step 1: プロンプトエンジニアリングで解けるか？**
- → Few-shot / CoT / システムプロンプトで80%の品質が出るなら採用
- **Step 2: 最新情報・社内データが必要か？**
- → Yes → RAG を検討
- **Step 3: 特定のスタイル・形式・ドメイン知識が必要か？**


---

# 技術選定フレームワーク（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- → プロンプトで達成困難 → Fine-tuning を検討
- **Step 4: 複数ステップの推論・外部ツール実行が必要か？**
- → Yes → エージェントを検討
- **Step 5: 複数のアプローチの組み合わせ**
- → RAG + Fine-tuning、RAG + エージェント など組み合わせも有効


---

# ベースモデル選択（2026年版）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **クローズドモデル（API）**
- GPT-4o — OpenAI。コーディング・推論に強み。Function Calling成熟
- Claude 3.5 Sonnet — Anthropic。長文コンテキスト・安全性。コードに優秀
- Gemini 1.5 Pro — Google。1Mコンテキスト。マルチモーダル強み


---

# ベースモデル選択（2026年版）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **オープンモデル（セルフホスト）**
- Llama 3.1 70B — Meta。商用利用可。高品質でコスト効率良
- Mistral Large — 欧州産。多言語・コーディング。Apache 2.0
- Qwen 2.5 72B — Alibaba。日本語・中国語に強み
- **選択基準**: データ主権、コスト上限、レイテンシ要件、言語サポート


---

# プロダクション要件チェックリスト（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **機能要件**
- □ 精度・品質の定義（どのメトリクスで何%以上か）
- □ レイテンシ要件（P50/P95/P99）
- □ スループット要件（同時リクエスト数）
- **非機能要件**


---

# プロダクション要件チェックリスト（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- □ コスト上限（月間APIコスト予算）
- □ データ主権・プライバシー規制（GDPR等）
- □ 可用性要件（SLA）
- □ セキュリティ要件（データの機密分類）
- □ 観測可能性（ログ・トレース・アラート）


---

<!-- _class: lead -->
# Section 2: プロンプトエンジニアリング

- 設計の基礎 — すべてのアプローチの土台


---

# プロンプトエンジニアリングの基礎（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **構造化プロンプトの4要素**
- ① **Role（役割）**: 「あなたはシニアソフトウェアエンジニアです」
- ② **Task（タスク）**: 明確で具体的な指示。動詞で始める
- ③ **Context（文脈）**: 背景情報・制約・対象者


---

# プロンプトエンジニアリングの基礎（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- ④ **Format（形式）**: 出力形式の明示（JSON、箇条書き、N文字以内）
- **効果的なプロンプトの原則**
- 具体的であること（「良い文章を書いて」→「技術ブログ記事を500字で」）
- 例を示すこと（Few-shot）
- 段階的思考を促すこと（CoT）


---

# CoT・ToT・GoTパターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **Chain-of-Thought（CoT）**
- 「ステップバイステップで考えてください」で推論精度が大幅向上
- 数学・論理・コード生成に特に有効
- **Tree-of-Thought（ToT）**
- 複数の推論パスを探索し最良を選択


---

# CoT・ToT・GoTパターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- 複雑な問題解決・計画立案に有効。コスト↑
- **Graph-of-Thought（GoT）**
- 推論を有向グラフで表現。関係性の複雑なタスクに適合
- **Self-Consistency**
- 同じ質問を複数回実行し多数決。精度↑コスト↑


---

# Few-shot / Zero-shot 戦略（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **Zero-shot**: 例なしで直接指示
- 「以下のレビューを Positive/Negative/Neutral に分類してください」
- → シンプルなタスクに有効。プロンプトが短い
- **One-shot**: 例を1つ提示
- → 出力形式の統一に有効


---

# Few-shot / Zero-shot 戦略（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **Few-shot**: 例を3〜8個提示
- → 複雑なタスク・ドメイン特化に有効
- **選択ガイド**
- まずZero-shotで試す → 品質不足 → Few-shot追加
- 例の品質が結果に直結（悪い例はむしろ有害）
- 例は多様性を確保（同じパターンの繰り返し不可）


---

# システムプロンプト設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **システムプロンプトの役割**
- モデルの「人格・役割・制約」を定義。ユーザー入力より優先度高
- **設計パターン**
- ① ペルソナ定義: 「あなたは〇〇社の製品サポートエキスパートです」
- ② 制約明示: 「製品以外のトピックには応じないでください」


---

# システムプロンプト設計（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ③ 出力フォーマット指定: 「必ずJSON形式で返答してください」
- ④ 安全ガードレール: 「有害・違法なコンテンツを生成しないでください」
- **ベストプラクティス**
- 短く明確に（長すぎると重要指示が埋もれる）
- バージョン管理必須（Git + プロンプトレジストリ）
- プロンプトインジェクション対策を組み込む


---

# プロンプトテンプレート管理（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **なぜプロンプトのバージョン管理が必要か**
- プロンプト変更がモデル更新と同等の本番影響を持つ
- A/Bテストなしの変更は品質劣化リスク
- **管理方法**
- ① Git管理: プロンプトをコードと同様にコミット


---

# プロンプトテンプレート管理（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- ② プロンプトレジストリ: LangSmith / Promptfoo / 独自DB
- ③ セマンティックバージョニング: v1.2.3 形式
- **デプロイ戦略**
- カナリアリリース（5%のトラフィックで新プロンプトを検証）
- フィーチャーフラグによる即時ロールバック機能


---

# 構造化出力（JSON mode・Function Calling）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- LLMの出力を型安全に扱う手法


---

# 構造化出力（JSON mode・Function Calling）（コード例）

```python
# OpenAI JSON mode + Pydantic
from pydantic import BaseModel
from openai import OpenAI

class ProductReview(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    score: float  # 0.0 - 1.0
    key_points: list[str]

client = OpenAI()
response = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=[{"role": "user", "content": f"レビュー分析: {review_text}"}],
    response_format=ProductReview,  # 型安全な出力
)
result = response.choices[0].message.parsed
print(result.sentiment, result.score)
```


---

# プロンプトエンジニアリングの限界

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **プロンプトだけでは解決できない問題**
- ① 知識の鮮度 — 学習データ以降の情報は取得不可 → RAGが必要
- ② 大規模知識ベース — コンテキスト長を超える文書群 → RAGが必要
- ③ 一貫したスタイル — 大量のFew-shotは非効率 → Fine-tuningが必要
- ④ 複数ステップの外部操作 — DB更新・API呼び出し → エージェントが必要
- ⑤ ドメイン専門用語 — 特殊な語彙・フォーマット → Fine-tuningが必要
- **次のステップ**: 上記に当てはまる場合、他のアプローチを検討


---

<!-- _class: lead -->
# Section 3: RAG設計パターン

- Retrieval-Augmented Generation — 検索拡張生成


---

# RAGアーキテクチャ（Naive RAG）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **RAGの基本フロー**
- ① Indexing: 文書 → チャンキング → Embedding → ベクターDB保存
- ② Retrieval: クエリ → Embedding → 類似度検索 → Top-K文書取得
- ③ Generation: クエリ + 取得文書 → プロンプト構築 → LLM生成
- **RAGが解決する問題**


---

# RAGアーキテクチャ（Naive RAG）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- 知識カットオフ → 常に最新文書を参照
- ハルシネーション低減 → 根拠となるソースを提供
- 大規模知識ベース → 文書全体をコンテキストに入れる必要なし
- **Naive RAGの課題**
- 低品質なチャンキング、検索精度の限界、長文への対応困難


---

# Embedding + Vector DBの仕組み（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **Embeddingとは**
- テキストを意味を保ったまま数値ベクトル（例: 1536次元）に変換
- 意味的に近いテキストは高次元空間で近い位置に配置
- **類似度検索**
- コサイン類似度 / ドット積 / ユークリッド距離


---

# Embedding + Vector DBの仕組み（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- k-NN（完全探索）vs ANN（近似最近傍）— HNSW, IVF-PQ
- **インデックス構造**
- HNSW（Hierarchical Navigable Small World）: 高速・高精度。メモリ大
- IVF-PQ: メモリ効率良。精度トレードオフあり
- **次元数の注意点**
- 次元数↑ = 精度↑ コスト↑ 次元の呪いに注意


---

# チャンキング戦略（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **Fixed-size Chunking**
- 固定文字数（例: 512トークン）でオーバーラップ付き分割
- 実装簡単。意味の分断リスクあり
- **Semantic Chunking**
- 意味の境界（段落・文章の転換点）で分割
- 品質↑ 実装複雑↑


---

# チャンキング戦略（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **Hierarchical Chunking（Parent-Child）**
- 大きなチャンク（Summary）と小さなチャンク（Detail）を二重インデックス
- 検索は小チャンク → 提供は大チャンク
- **Sentence-Window Chunking**
- 文単位でインデックス → 周辺N文をコンテキストとして提供
- **推奨**: まずFixed-size（512/128 overlap）から始め、品質不足で改善


---

# Embeddingモデル比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **OpenAI text-embedding-3-large**
- 次元: 3072（削減可能）、MTEB 64.6、コスト: $0.13/1M tokens
- バランス良。OpenAI API利用中なら第一選択
- **Cohere embed-v3**
- 多言語対応（100言語）、Reranking APIが優秀


---

# Embeddingモデル比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **BGE-M3（BAAI、オープン）**
- 多言語・マルチ機能（Dense+Sparse+ColBERT）、セルフホスト可
- **E5-mistral-7b（オープン）**
- LLMベースEmbedding。高品質。推論コスト高
- **日本語特化**
- ruri-large（cl-nagoya）: 日本語MTEBでトップクラス


---

# ベクターDB比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **Pinecone** — フルマネージド。スケール簡単。コスト高。ベンダーロック
- **Weaviate** — OSS+マネージド。GraphQLクエリ。マルチモーダル対応
- **Qdrant** — OSS。Rust製で高速。フィルタリング強力。セルフホスト最有力
- **pgvector（PostgreSQL拡張）** — 既存PGインフラ活用。スケール限界あり


---

# ベクターDB比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **ChromaDB** — 開発・プロトタイプ向け。ローカル起動が容易
- **Milvus** — 大規模（10億ベクター）対応。Zilliz Cloud版あり
- ---
- **選択基準**: 既存インフラ → pgvector / 新規フルマネージド → Pinecone / セルフホスト本番 → Qdrant


---

# 高度な検索技術（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **HyDE（Hypothetical Document Embeddings）**
- クエリ → LLMで仮想的な回答文を生成 → その文をEmbeddingして検索
- 短いクエリの検索精度が大幅改善。レイテンシ・コスト増
- **Reranking**
- 初回検索（Top-50）→ 再順序付け（Cross-encoder）→ Top-5を採用


---

# 高度な検索技術（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- Cohere Rerank / BGE-Reranker が高精度
- **MMR（Maximal Marginal Relevance）**
- 関連性と多様性のバランスを保った検索結果を返す
- 類似した文書の重複取得を防ぐ
- **Self-Query Retrieval**
- LLMがクエリを解析し、メタデータフィルター付き検索クエリを生成


---

# Hybrid Search（Dense + Sparse）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **Dense Search（ベクター検索）の弱点**
- 新語・固有名詞・専門用語に弱い（学習データにない単語）
- 例: 「AWS re:Invent 2025」「GPT-5o」などの新用語
- **Sparse Search（BM25キーワード検索）**
- TF-IDFベースの古典的全文検索。新語・固有名詞に強い


---

# Hybrid Search（Dense + Sparse）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- 意味的類似性を考慮しない
- **Hybrid Searchの仕組み**
- Dense スコア + Sparse スコア を RRF（Reciprocal Rank Fusion）で統合
- 実装: Qdrant Hybrid / Weaviate Hybrid / Elasticsearch ELSER
- **推奨構成**
- プロダクションでは Hybrid Search をデフォルトに設定


---

# Advanced RAGアーキテクチャ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **Modular RAG（モジュラーRAG）**
- Pre-Retrieval → Retrieval → Post-Retrieval → Generation の各段階を独立モジュール化
- **Pre-Retrieval改善**
- クエリ書き換え（Query Rewriting）
- クエリ分解（Sub-question Decomposition）


---

# Advanced RAGアーキテクチャ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- HyDE
- **Post-Retrieval改善**
- Reranking（再順位付け）
- コンテキスト圧縮（LLMLingua — 重要部分のみ抽出）
- **Agentic RAG**
- RAGをエージェントのツールとして使用。必要に応じて反復検索


---

# GraphRAG（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **GraphRAGとは**
- 文書をチャンクではなく「知識グラフ（エンティティと関係）」として表現
- Microsoft Research が2024年に発表
- **通常RAGとの違い**
- 通常RAG: 局所的な類似チャンクを検索
- GraphRAG: エンティティ間の関係・コミュニティサマリーを活用


---

# GraphRAG（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **強み**
- 「全体像を要約して」などのグローバルクエリに強い
- 複数文書にまたがる関係の推論が可能
- **弱み・注意点**
- インデックス構築コストが高い（GPT-4を大量使用）
- 小規模文書セットには過剰
- 適用場面: 研究論文・法律文書・複雑な技術文書


---

# マルチモーダルRAG（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **マルチモーダルRAGとは**
- テキスト・画像・表・PDFの混合文書を統合的に検索・活用
- **実装アプローチ**
- ① テキスト抽出: OCR（Tesseract/AWS Textract）でテキスト化してRAG
- ② キャプション生成: LLMで画像/表をテキスト説明に変換してインデックス


---

# マルチモーダルRAG（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ③ マルチベクター: テキスト・画像それぞれをEmbeddingして別々にインデックス
- **ColPali（推奨）**
- PDF/スキャン文書のページ全体をVision Embeddingで直接インデックス
- OCR不要。レイアウト情報を保持
- **ユースケース**
- 技術マニュアル（図解含む）、財務報告書（表含む）、スライドセット


---

# RAGパイプライン実装

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- LlamaIndexを使ったシンプルなRAGパイプライン


---

# RAGパイプライン実装（コード例）

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI

# 文書読み込み + Sentence-Window チャンキング
documents = SimpleDirectoryReader("./docs").load_data()
node_parser = SentenceWindowNodeParser.from_defaults(
    window_size=3,  # 前後3文をコンテキストとして付与
    window_metadata_key="window",
)
# インデックス構築（Embedding + ベクターDB）
index = VectorStoreIndex.from_documents(
    documents,
    transformations=[node_parser],
    embed_model=OpenAIEmbedding(model="text-embedding-3-large"),
)
# クエリエンジン（Reranking付き）
query_engine = index.as_query_engine(
    similarity_top_k=10,   # まず10件取得
    node_postprocessors=[CohereRerank(top_n=3)],  # 3件に絞る
)
response = query_engine.query("LLMの評価指標は？")
print(response)
```


---

# RAG評価指標（RAGAS）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **RAGAS（RAG Assessment）の4指標**
- ① **Faithfulness（忠実性）**: 回答が取得文書の内容に基づいているか
- ハルシネーション検出の主要指標。高いほど良い（目標: 0.8以上）
- ② **Answer Relevancy（回答関連性）**: 回答がクエリに関連しているか


---

# RAG評価指標（RAGAS）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- ③ **Context Precision（文脈精度）**: 取得文書にどれだけ関連コンテキストが含まれるか
- ④ **Context Recall（文脈再現率）**: 正解に必要なコンテキストをどれだけ取得できたか
- **実装**
- from ragas import evaluate → 自動評価パイプライン
- LLM-as-a-Judgeを活用（GPT-4oで各指標を評価）


---

# RAGのデバッグ・改善ループ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **問題診断フロー**
- 品質が低い → Faithfulness低い？ → 検索は合ってるが生成が失敗 → プロンプト改善
- 品質が低い → Context Recall低い？ → 必要な文書が取得できていない → チャンキング/検索改善
- **よくある原因と対策**


---

# RAGのデバッグ・改善ループ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- チャンクサイズが大きすぎる → サイズを128〜256に縮小
- Embeddingモデルが不適切 → ドメイン特化モデルへ変更
- 検索上位K件が少ない → Top-Kを増やしてRerankで絞る
- クエリが短い → HyDEで拡張
- **デバッグツール**: LangSmith / Arize Phoenix でトレース可視化


---

# RAGアンチパターン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ❌ **チャンクサイズを考えずに固定**: 文書タイプによって最適サイズが異なる
- ❌ **Top-K=3で固定**: クエリの複雑さに応じて動的に変更すべき
- ❌ **Embeddingモデルを変えずにデータ再利用**: モデル変更時はインデックス再構築必須
- ❌ **検索結果を評価しない**: Retrievalの品質を単体でモニタリングすべき
- ❌ **全文書を同じ優先度で扱う**: ドキュメントの信頼性・鮮度に重み付けを
- ❌ **メタデータフィルターを使わない**: 日付・部門・バージョンでフィルタリングが効果的
- ❌ **RAGだけで機密情報管理**: アクセス制御（ABAC）を必ずRAGに組み込む


---

# RAG いつ使うべきか（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **RAGが適している場面**
- ✅ 最新情報が必要（ニュース・製品情報・法規制）
- ✅ 社内文書・ナレッジベースへの質問応答
- ✅ 根拠・ソースの提示が必要なユースケース
- ✅ 数百〜数百万文書の大規模知識ベース


---

# RAG いつ使うべきか（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ✅ 知識が頻繁に更新される（再インデックスのみで対応可）
- **RAGが不適切な場面**
- ❌ 特定のスタイル・口調・形式の習得（→ Fine-tuning）
- ❌ ドメイン専門用語の解釈（→ Fine-tuning）
- ❌ 文書が存在しない純粋な推論タスク（→ プロンプト）
- ❌ リアルタイム行動が必要（→ エージェント）


---

<!-- _class: lead -->
# Section 4: Fine-tuning

- モデルの重みを更新してドメイン適応


---

# Fine-tuningとは・なぜ必要か（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **Fine-tuningの定義**
- 事前学習済みモデルの重みを、特定タスクのデータで追加学習すること
- **RAGでは解決できない問題**
- ① 特定のトーン・スタイルの習得（企業ブランドボイス）
- ② ドメイン専門用語の正確な解釈（医療・法律・金融）


---

# Fine-tuningとは・なぜ必要か（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- ③ 特定のフォーマットへの一貫した出力
- ④ 推論時にコンテキストを注入せずに知識を内包させたい
- **Fine-tuningの効果**
- 小型モデル（7B）でGPT-4レベルの特定タスク精度を実現可能
- 推論コスト削減（大型モデルから小型特化モデルへ）
- レイテンシ改善


---

# Fine-tuningの種類（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **Full Fine-tuning**
- 全パラメータを更新。最高精度。GPU要件が高く費用大
- GPT-3 175B → A100 80GB × 8台 × 数日
- **LoRA（Low-Rank Adaptation）**
- 重みの変分を低ランク行列で近似。パラメータの1〜10%のみ更新
- A100 × 1台で7Bモデルをファインチューニング可能


---

# Fine-tuningの種類（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **QLoRA（Quantized LoRA）**
- 4bit量子化 + LoRA。VRAM使用量をさらに削減
- 24GB GPU（RTX 3090）で13Bモデルが可能
- **Adapter Tuning**
- モデルのレイヤー間に小さなアダプタ層を追加。モデル本体は凍結
- **推奨**: ほぼ全ての用途でQLoRAから始める


---

# LoRA詳解（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **LoRAの数学的仕組み**
- 通常の重み更新: W → W + ΔW（ΔWは同じサイズ）
- LoRA: ΔW ≈ A × B（低ランク行列の積で近似）
- A: (d × r)、B: (r × k)、r << d,k（典型的なr=4〜64）
- **パラメータ削減例（LLama-2 7B、r=8）**


---

# LoRA詳解（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- Full Fine-tuning: 7B パラメータ更新
- LoRA: 約8M パラメータのみ更新（約0.1%）
- **ハイパーパラメータ**
- rank（r）: 低いほど高速・省メモリ。高いほど表現力↑
- alpha（スケーリング係数）: 通常はrの2倍が出発点
- target_modules: attention層（q_proj, v_proj）が基本


---

# データセット設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **データ量の目安（Instruction Tuning）**
- 最小: 100〜500サンプル（特定タスクの形式学習）
- 推奨: 1,000〜10,000サンプル（品質のある多様なデータ）
- 大規模: 100K+ サンプル（RLHF・汎用ファインチューニング）
- **データ品質が最重要**


---

# データセット設計（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- 1,000件の高品質データ > 10,000件の低品質データ
- **フォーマット（Instruction Following形式）**
- {"instruction": "〇〇してください", "input": "入力データ", "output": "期待される出力"}
- **データソース**
- 社内ログ・既存QA・専門家によるアノテーション・合成データ（GPT-4で生成）
- **注意点**: テストデータは必ず分離（汚染防止）


---

# Instruction Tuning vs RLHF vs DPO（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **Instruction Tuning（SFT）**
- 高品質なInstruction-Responseペアで教師あり学習
- 最もシンプル。データ準備が鍵
- **RLHF（人間のフィードバックからの強化学習）**
- 人間の選好データ → Reward Model学習 → PPOで最適化


---

# Instruction Tuning vs RLHF vs DPO（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- GPT-4・Claude・Llamaで採用。コスト・実装複雑度が高い
- **DPO（Direct Preference Optimization）**
- RLHFの簡略版。選好ペア（chosen/rejected）で直接最適化
- Reward Modelが不要。RLHFと同等の品質でシンプル
- → **現在の主流**: SFT → DPO の2段階が標準的
- **ORPO / SimPO**: DPOの後継。参照モデル不要でさらにシンプル


---

# Fine-tuning実装（QLoRA）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- Hugging Face TRL + QLoRAによる実装例


---

# Fine-tuning実装（QLoRA）（コード例）

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer, SFTConfig

# 4bit量子化でモデルをロード
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B",
    quantization_config=bnb_config,
)
# LoRA設定
lora_config = LoraConfig(
    r=16, lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
)
model = get_peft_model(model, lora_config)
# 学習
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=SFTConfig(output_dir="./output", num_train_epochs=3),
)
trainer.train()
```


---

# モデル評価と過学習の検出（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **評価セットの重要性**
- 学習データとは独立した評価セット（20%程度）を必ず用意
- **過学習のサイン**
- Train Loss↓ / Eval Loss↑ の乖離が広がる
- 学習データと同じ表現しか生成しなくなる
- **過学習の対策**
- Early Stopping（Eval Lossが改善しなくなったら学習停止）


---

# モデル評価と過学習の検出（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- Weight Decay（正則化）
- Dropout（LoRAのlora_dropout）
- データ拡張
- **評価メトリクス**
- 生成タスク: ROUGE / BLEU / BERTScore
- 分類タスク: Accuracy / F1
- ドメイン特化: LLM-as-a-Judge でカスタム評価


---

# 量子化・最適化（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **なぜ量子化するか**
- モデルサイズ・VRAM削減、推論速度向上
- **量子化手法比較**
- FP16（16bit）: 精度高。標準的。7B = 14GB VRAM
- GPTQ（4bit/8bit）: 高精度量子化。GPU推論向け


---

# 量子化・最適化（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- AWQ（4bit）: 活性化を考慮した量子化。GPTQより高精度
- GGUF（旧GGML）: CPU/GPU混合推論。llama.cpp対応
- **VRAM早見表（7Bモデル）**
- FP16: 14GB / INT8: 7GB / INT4: 4GB
- **プロダクション推奨**
- GPU専有: AWQ 4bit / CPU含む: GGUF Q4_K_M


---

# プロダクション展開（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **vLLM（推奨・GPU）**
- PagedAttentionによる高スループット推論サーバー
- OpenAI互換API。バッチ処理で最大スループット最大化
- Llama 3.1 8B: A100 1枚で〜2000 tokens/sec
- **TGI（Text Generation Inference）**
- Hugging Face製。Kubernetes対応。マネージドクラウドあり


---

# プロダクション展開（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **Ollama**
- ローカル・開発環境向け。GGUF形式を簡単実行
- **クラウドマネージド**
- AWS SageMaker JumpStart / Bedrock Custom Model
- Google Vertex AI Fine-tuning
- **コスト考慮事項**
- 専用GPU vs サーバーレス推論（AWS Lambda + GGUF）


---

# Fine-tuningコスト計算（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **学習コスト（A100 80GB）**
- Llama-3.1 8B QLoRA（10K samples, 3 epoch）: 〜$5〜20
- Llama-3.1 70B QLoRA（10K samples）: 〜$50〜200
- **クラウドサービス比較**
- OpenAI Fine-tuning（GPT-3.5）: $8/1M training tokens


---

# Fine-tuningコスト計算（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- AWS Bedrock（Titan）: $0.008/1K training tokens
- Modal.com / RunPod: $2〜4/h（A100）
- **推論コスト比較**
- GPT-4o: $5/1M input tokens
- Fine-tuned Llama-3.1 8B (vLLM): 〜$0.1/1M tokens（自社GPU）
- **ROI計算**: 月間1B tokens → GPT-4o: $5000 / Llama-tuned: $100


---

# RAG vs Fine-tuning の選択基準（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **RAGを選ぶ場合**
- ✅ 知識が頻繁に更新される（週次・日次）
- ✅ 情報のソース・根拠を提示する必要がある
- ✅ 大規模文書コーパス（100K+ ページ）
- ✅ プロトタイプを素早く作りたい
- **Fine-tuningを選ぶ場合**


---

# RAG vs Fine-tuning の選択基準（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- ✅ 特定スタイル・トーン・フォーマットの一貫性
- ✅ ドメイン専門用語・略語の正確な解釈
- ✅ 知識が比較的静的（月次更新以下）
- ✅ 推論コストを長期的に削減したい
- **両方使う（推奨パターン）**
- Fine-tuned モデル + RAG = 最高品質
- 例: カスタマイズされた医療モデル + 最新ガイドライン検索


---

# Fine-tuningアンチパターン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ❌ **プロンプトで解決できる問題をFine-tuning**: まずプロンプト改善を試みる
- ❌ **少量・低品質データでのFine-tuning**: 100件の粗悪データは有害
- ❌ **評価データなしのFine-tuning**: ベースラインとの比較なしでは効果測定不可
- ❌ **知識注入目的のFine-tuning**: 知識は RAG で注入、Fine-tuningは挙動変更用
- ❌ **過学習を無視**: Eval Lossを監視せずにエポック数を増やし続ける
- ❌ **Fine-tuning後に元モデルを廃棄**: LoRAアダプタのみ保存し元モデルは再利用
- ❌ **セキュリティ考慮なし**: 訓練データにPII・機密情報が含まれていないか確認必須


---

<!-- _class: lead -->
# Section 5: AIエージェント設計

- 自律的推論とツール実行による複雑タスクの解決


---

# AIエージェントとは・コアコンセプト（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **AIエージェントの定義**
- 目標を達成するために、ツールを使いながら複数ステップを自律的に実行するLLMシステム
- **エージェントの4つのコアコンポーネント**
- ① **LLM（Brain）**: 推論・計画・意思決定の中枢
- ② **Tools（Hands）**: 外部API・DB・コード実行・Web検索など


---

# AIエージェントとは・コアコンセプト（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ③ **Memory（Memory）**: 短期（コンテキスト）+ 長期（外部ストレージ）
- ④ **Planner（Planning）**: タスク分解・実行順序の決定
- **エージェントが必要な場面**
- 単一のLLM呼び出しでは解決できない複雑なマルチステップタスク
- 外部システム（DB・API・ファイルシステム）との連携が必要なタスク


---

# ReActパターン詳解（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **ReAct（Reasoning + Acting）**
- 思考（Thought）→ 行動（Action）→ 観察（Observation）のループ
- Yao et al., 2023 が提唱。最も広く使われるエージェントパターン
- **実行フロー例**（「東京の天気は？」）
- Thought: 天気情報が必要。天気APIを呼ぶべきか


---

# ReActパターン詳解（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- Action: weather_tool(location='Tokyo')
- Observation: {'temp': 12, 'condition': 'Cloudy'}
- Thought: 取得できた。回答を生成できる
- Answer: 東京は12度で曇りです
- **強み**: 推論過程が透明。デバッグしやすい
- **弱み**: ステップ数に比例してコスト・レイテンシが増加


---

# Plan-and-Executeパターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **Plan-and-Executeとは**
- 最初に全体計画を立て、各ステップを順次実行するパターン
- ReActとの違い: 事前に計画を立ててからアクション
- **フロー**
- ① Planner LLM: タスクをN個のサブタスクに分解


---

# Plan-and-Executeパターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- ② Executor: 各サブタスクをツールで実行
- ③ Replanner: 実行結果を見て計画を動的に修正
- **適用場面**
- 長期的・複雑なタスク（レポート作成・コードリファクタリング）
- 事前に全体像を把握する必要があるタスク
- **LangGraph実装**: StateGraph + Plan node + Execute node


---

# Reflexionパターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **Reflexionとは**
- 実行結果を振り返り、自己評価・改善を繰り返すパターン
- Shinn et al., 2023 が提唱
- **フロー**
- ① タスク実行（ReActベース）
- ② Evaluator: 結果が目標を達成したか判定


---

# Reflexionパターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ③ Reflector: 失敗原因の言語化（反省文の生成）
- ④ 反省を踏まえて再実行
- **強み**
- 初回失敗からの回復能力。品質↑
- コーディングタスク・推論問題で特に有効
- **弱み**
- 反省ループが無限に続く可能性（最大試行回数の設定が必須）


---

# Tool use / Function Calling設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **Function Callingとは**
- LLMが自然言語の意図を解析し、適切な関数を選択・引数を生成する機能
- OpenAI / Anthropic / Gemini が標準でサポート
- **ツール定義の原則**
- ① 単一責任: 1ツール = 1機能。複数の機能を詰め込まない


---

# Tool use / Function Calling設計（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ② 明確な説明: ツールの目的・引数・戻り値を明確に記述
- ③ エラー処理: ツールは必ずエラー状態を返せるよう設計
- ④ 冪等性: 同じ引数での複数回実行が安全
- **ツールカテゴリ**
- 読み取り専用（検索・取得）/ 副作用あり（書き込み・送信・実行）
- 副作用ありツールは承認フローを組み込む


---

# ツール設計のベストプラクティス

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- Claude / OpenAI Function Callingのツール定義例


---

# ツール設計のベストプラクティス（コード例）

```python
# Anthropic Tool use 定義
tools = [
    {
        "name": "search_documents",
        "description": "社内ナレッジベースから関連文書を検索します。"
                       "最新の製品仕様・手順書・FAQの検索に使用してください。",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "検索クエリ。自然言語で記述"
                },
                "top_k": {
                    "type": "integer",
                    "description": "取得する文書数（1-10）",
                    "default": 5
                }
            },
            "required": ["query"]
        }
    }
]
# エージェント呼び出し
response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=tools,
    messages=[{"role": "user", "content": "最新の返品ポリシーを教えて"}]
)
```


---

# エージェントフレームワーク比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **LangGraph（推奨・本番向け）**
- グラフベースのステートフルエージェント。Human-in-the-loop対応
- 状態管理・分岐・ループが明示的。デバッグ・テストが容易
- **CrewAI**
- マルチエージェントフレームワーク。役割ベースのエージェント設計
- 直感的API。プロトタイプ・小規模本番に適する


---

# エージェントフレームワーク比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **AutoGen（Microsoft）**
- マルチエージェント会話フレームワーク。コーディングエージェントに強み
- **Swarm（OpenAI）**
- シンプルなハンドオフベースマルチエージェント。軽量
- **選択基準**
- 本番・複雑なフロー → LangGraph / プロトタイプ → CrewAI


---

# シングルエージェント vs マルチエージェント（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **シングルエージェント**
- 1つのLLMが全ツールにアクセスして全タスクを処理
- ✅ シンプル・低コスト・デバッグ容易
- ❌ ツール数↑でコンテキスト肥大・精度低下
- ❌ 複雑なタスクを1エージェントで処理すると品質限界
- **マルチエージェント**


---

# シングルエージェント vs マルチエージェント（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- 専門化された複数エージェントが協調して問題を解決
- ✅ 複雑なタスクの並列処理・専門化
- ✅ 各エージェントのコンテキストを最小化
- ❌ オーケストレーション複雑・コスト増・デバッグ難
- **判断基準**
- まずシングルエージェントで試す。限界に達したらマルチへ


---

# マルチエージェントパターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **Supervisorパターン（推奨）**
- Supervisor LLMが専門エージェントにタスクを割り当て・集約
- 実装: LangGraph Supervisor、CrewAI Manager
- **Hierarchicalパターン**
- 複数レベルのSupervisor（部門→チーム→個人）
- 大規模・複雑なタスクに適合


---

# マルチエージェントパターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **Peer-to-Peerパターン**
- エージェント同士が直接通信・協調
- Blackboard: 共有状態を介してコミュニケーション
- **Specialistパターン**
- Research Agent / Writer Agent / Critic Agent を役割分担
- 各エージェントは専門ツールセットのみ持つ（最小権限）


---

# メモリ管理（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **短期メモリ（コンテキストウィンドウ）**
- 会話履歴をそのままコンテキストに格納
- 制限: モデルのコンテキスト上限（128K〜200K tokens）
- 対策: Message Summarization（古い会話を要約して圧縮）
- **長期メモリ（外部ストレージ）**


---

# メモリ管理（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- エピソード記憶: 過去の会話・出来事（ベクターDB）
- セマンティック記憶: 事実・知識（RAG）
- 手続き記憶: スキル・ルール（プロンプト or Fine-tuning）
- **メモリアーキテクチャ（MemGPT / Letta）**
- コア記憶（常時コンテキスト）+ 外部記憶（検索で取得）
- 重要情報を自動的にコア記憶に書き込む


---

# エラーハンドリング・リトライ・フォールバック（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **エージェントで発生する主なエラー**
- ツール実行失敗（タイムアウト・API制限・権限エラー）
- LLM出力のパースエラー（不正なJSON・不正な引数）
- 無限ループ（目標を達成できず繰り返す）
- **リトライ戦略**
- Exponential Backoff（1s → 2s → 4s → 8s）


---

# エラーハンドリング・リトライ・フォールバック（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- 最大リトライ回数の設定（3回）
- **フォールバック**
- ツール失敗 → 代替ツール or ユーザーに確認
- 精度不足 → より強力なモデルにフォールバック
- **無限ループ防止**
- 最大ステップ数の強制終了（max_iterations=20）
- 目標達成の明示的な終了条件


---

# エージェントのセキュリティ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **主要なセキュリティリスク**
- ① **Prompt Injection**: 外部コンテンツが悪意ある指示を注入
- 例: Webページの内容に「全ファイルを削除して」が埋め込まれている
- ② **権限昇格**: エージェントが意図以上の権限でアクションを実行
- ③ **データ漏洩**: 機密データをLLMのコンテキストに無防備に入れる


---

# エージェントのセキュリティ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **対策**
- 最小権限の原則: 必要なツールのみ提供
- Human-in-the-loop: 副作用のある操作は人間の承認を要求
- 入力サニタイズ: 外部コンテンツをコンテキストに入れる前に検証
- サンドボックス: コード実行はコンテナで隔離（gVisor / Docker）
- 監査ログ: 全ツール呼び出しを記録・監視


---

# エージェントの観測可能性（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **エージェント観測可能性の重要性**
- 「なぜその判断をしたか」がブラックボックスになりがち
- デバッグ・改善・コスト管理に不可欠
- **計測すべきメトリクス**
- 推論ステップ数（steps per task）
- ツール呼び出し回数・成功率


---

# エージェントの観測可能性（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- トークン使用量・コスト（step毎・task毎）
- タスク完了率・失敗分類
- エンドツーエンドレイテンシ
- **トレーシングツール**
- LangSmith: LangChain/LangGraph専用。ビジュアルトレース
- Langfuse: OSS。マルチフレームワーク対応
- Arize Phoenix: OSS。Jupyter統合・評価機能


---

# エージェント実装例（LangGraph）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- LangGraphによるReActエージェント実装


---

# エージェント実装例（LangGraph）（コード例）

```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic
from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Web検索を実行して最新情報を取得します"""
    return web_search_api(query)

@tool
def run_python(code: str) -> str:
    """Pythonコードをサンドボックスで実行します"""
    return sandbox.execute(code)

llm = ChatAnthropic(model="claude-sonnet-4-6")
tools = [search_web, run_python]

# ReActエージェント生成
agent = create_react_agent(
    model=llm,
    tools=tools,
    checkpointer=MemorySaver(),  # 会話メモリ
)

# 実行
config = {"configurable": {"thread_id": "session-1"}}
for chunk in agent.stream(
    {"messages": [{"role": "user", "content": "Pythonの最新バージョンを調べてprint"}]},
    config=config
):
    print(chunk)
```


---

# エージェントのコスト最適化（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **コスト増加の主な原因**
- 不必要に強力なモデルを全ステップで使用
- ツール呼び出しの冗長なループ
- 大量のコンテキスト（全履歴をそのまま渡す）
- **最適化戦略**


---

# エージェントのコスト最適化（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- ① モデルルーティング: 簡単なステップは小型モデル（Haiku）、重要判断は大型モデル
- ② コンテキスト圧縮: LLMLingua で履歴を圧縮（50〜80%削減）
- ③ 早期終了: 目標達成を検出したら即座に終了
- ④ キャッシュ: 同一ツール呼び出しのキャッシュ（TTL付き）
- ⑤ バッチ処理: 独立したツール呼び出しを並列実行
- **目安**: エージェントの平均コストを単一LLM呼び出しの5〜10倍以内に


---

# エージェント いつ使うべきか（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **エージェントが適している場面**
- ✅ 複数のツール・APIを組み合わせる必要がある
- ✅ 実行順序が事前に決定できない（動的な計画が必要）
- ✅ 繰り返し実行・自律的なサイクルが必要
- ✅ コードの生成・実行・デバッグのサイクル


---

# エージェント いつ使うべきか（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **エージェントが不適切な場面**
- ❌ 単純なQ&A → 通常のLLM呼び出し
- ❌ 決まった手順のワークフロー → パイプラインで代替
- ❌ レイテンシが厳しい（<1秒）→ 事前キャッシュ・パイプライン
- ❌ 高信頼性が要求（金融・医療判断）→ Human-in-the-loop必須
- **鉄則**: エージェントはコストが高い。まず他の手段を試す


---

<!-- _class: lead -->
# Section 6: 評価フレームワーク

- 「動いている」と「良い」は別物 — 測定なき改善はない


---

# LLMアプリ評価の全体像（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **なぜ評価が難しいか**
- LLMの出力は確率的 → 同じ入力で毎回異なる出力
- 正解が一意でない（自然言語の多様性）
- **評価の4次元**
- ① **Correctness（正確性）**: 回答が事実として正しいか


---

# LLMアプリ評価の全体像（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ② **Faithfulness（忠実性）**: ソースに基づいているか（RAG）
- ③ **Relevance（関連性）**: 質問に答えているか
- ④ **Safety（安全性）**: 有害・偏見のある内容がないか
- **評価の分類**
- オフライン評価（開発・CI）vs オンライン評価（プロダクション）
- 自動評価（LLM-as-a-Judge）vs 人間評価


---

# オフライン評価 vs オンライン評価（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **オフライン評価（開発フェーズ）**
- 目的: デプロイ前の品質チェック
- 手法: ゴールデンデータセット（Q&Aペア）を使った自動評価
- 実装: pytest + LLM-as-a-Judge / RAGAS
- タイミング: CI/CDパイプラインに組み込み（PR毎に実行）


---

# オフライン評価 vs オンライン評価（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **オンライン評価（プロダクション）**
- 目的: 実ユーザーのインタラクションから品質を継続モニタリング
- 手法: ユーザーフィードバック（👍👎）、暗黙的シグナル（再質問率）
- 実装: Langfuse / LangSmith でトレース + 非同期評価
- **統合アプローチ**
- オフライン（CI）でベースライン確保 + オンライン（本番）で継続改善


---

# RAG評価（RAGAS詳解）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **RAGAS フレームワークの4指標**
- **① Faithfulness**: 回答内の各クレームが取得文書に裏付けられるか
- 実装: LLM-as-a-Judge で「文書に書いてあるか？」を判定
- 目標: 0.8以上（1.0が最高）
- **② Answer Relevancy**: 回答がクエリの意図に沿っているか


---

# RAG評価（RAGAS詳解）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- 逆算評価: 回答から疑似クエリを生成し元クエリとの類似度を測定
- **③ Context Precision**: Top-K文書中の関連文書の割合
- 高い = 不要な文書が少ない（ノイズが少ない）
- **④ Context Recall**: 正解に必要な情報が取得できているか
- 低い = 重要な文書を取り逃がしている


---

# LLM-as-a-Judge（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **LLM-as-a-Judgeとは**
- 評価者としてLLMを使い、別のLLMの出力を自動スコアリング
- 人間評価の代替として急速に普及
- **実装パターン**
- ① Single-model Judge: GPT-4oが「1〜5点で評価してください」
- ② Reference-based: 正解例と比較して評価
- ③ Pairwise: A vs B どちらが良いかをLLMに選ばせる


---

# LLM-as-a-Judge（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **メリット**
- スケーラブル・低コスト・速い（人間比）
- **バイアスと落とし穴**
- Position Bias（順序で結果が変わる）
- Self-Enhancement Bias（自社モデルを高く評価する傾向）
- Verbosity Bias（長い回答を高評価する傾向）
- 対策: 複数モデルでクロス評価


---

# 人間評価のベストプラクティス（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **人間評価が必要な場面**
- 安全性・倫理・文化的センシティビティ
- LLM評価の校正（Ground Truth構築）
- ビジネス要件への適合（ブランドボイス等）
- **評価設計原則**
- ① 明確なルーブリック: 採点基準を数値化・例示付きで定義


---

# 人間評価のベストプラクティス（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- ② ブラインド評価: 評価者がモデル名を知らない状態で評価
- ③ Inter-annotator Agreement: 複数評価者の一致率を測定（Cohen's κ）
- ④ サンプルの多様性: エッジケース・エラーケースを意図的に含める
- **ツール**
- Label Studio / Argilla（OSS）
- Scale AI / Toloka（外部アノテーション）


---

# コード生成評価（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **HumanEval / MBPP**
- OpenAIのベンチマーク。Pythonコーディング問題164件
- 評価: pass@k（k回試行のうち1回でも正解するか）
- **pass@k計算**
- pass@1: コードが1回で正解するか（品質）
- pass@10: 10回試行のうち1回でも正解するか（カバレッジ）


---

# コード生成評価（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **SWE-bench**
- 実際のGitHubイシューを解決する能力を評価
- より実践的なベンチマーク。Claude 3.5が49.0%（2025年）
- **カスタム評価**
- ユニットテストの実行率 / Lint通過率 / セキュリティスキャン
- CI統合: 生成コードを実際にテストスイートで実行


---

# 評価パイプライン実装

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- RAGAS + LangSmith による自動評価パイプライン


---

# 評価パイプライン実装（コード例）

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_recall
from datasets import Dataset
from langsmith import Client

# 評価データセット
test_cases = [
    {
        "question": "RAGとは何ですか？",
        "answer": rag_pipeline.query("RAGとは何ですか？"),
        "contexts": rag_pipeline.retrieve("RAGとは何ですか？"),
        "ground_truth": "Retrieval-Augmented Generationの略で..."
    },
    # ... 100件の評価ケース
]
dataset = Dataset.from_list(test_cases)

# RAGAS 評価実行
result = evaluate(
    dataset=dataset,
    metrics=[faithfulness, answer_relevancy, context_recall],
    llm=ChatOpenAI(model="gpt-4o"),  # Judge LLM
)
print(result)
# {'faithfulness': 0.83, 'answer_relevancy': 0.91, 'context_recall': 0.76}
```


---

# 評価ツール比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **LangSmith（LangChain）**
- LangChain/LangGraph専用。ビジュアルトレース・プロンプト管理
- Datasets・Experiments機能でA/Bテストが容易
- **Braintrust**
- フレームワーク非依存。CI統合が得意
- GitHub Actions でPR毎に自動評価
- **Promptfoo**


---

# 評価ツール比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- OSS。プロンプト評価・比較に特化
- YAML設定でシンプルに評価を定義
- **Langfuse（OSS、推奨）**
- OSS/セルフホスト可。マルチフレームワーク
- 観測可能性 + 評価 + プロンプト管理を統合
- **選択基準**
- LangChain使用中 → LangSmith / OSS優先 → Langfuse


---

# A/Bテスト設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **LLMアプリのA/Bテスト**
- プロンプト変更・モデル変更・RAG設定変更の効果測定
- **設計原則**
- ① 1変数ずつ変更（複数変更は効果が分離できない）
- ② 統計的検定（t検定 / Mann-Whitney U）で有意差を確認
- ③ サンプルサイズ計算（効果量・検出力から必要サンプル数を算出）


---

# A/Bテスト設計（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **LLMアプリ特有の注意事項**
- ユーザーグループのランダム分割（Cookie/UserIDベース）
- 評価メトリクスの事前定義（何をもって「良い」とするか）
- ロールバック計画（悪化した場合の即座の切り戻し）
- **シャドウテスト（推奨）**
- 本番トラフィックを新旧両方に流し、ユーザーには既存版を返す


---

# 継続的評価・プロダクションモニタリング（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **モニタリングすべきKPI**
- 品質メトリクス: Faithfulness / Relevancy（LLM-as-a-Judge）
- ユーザーシグナル: 👍👎率 / 再質問率 / セッション離脱率
- パフォーマンス: レイテンシ（P50/P95） / トークン使用量
- 安全性: Toxicity / PII漏洩 / ポリシー違反率


---

# 継続的評価・プロダクションモニタリング（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **アラート設定**
- Faithfulness < 0.7 → Slack通知
- P95レイテンシ > 5秒 → PagerDuty
- コスト急増（前日比150%超）→ 自動制限
- **改善サイクル**
- 問題のあるトレースを自動サンプリング → 人間レビュー → ゴールデンセットに追加 → 評価で改善確認


---

# 評価アンチパターン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ❌ **「なんとなく動いてる」で評価なしにリリース**: 必ずベースラインを測定
- ❌ **評価データセットが小さすぎる（10件）**: 最低100件、理想は1000件以上
- ❌ **Train/Testの汚染**: 評価データを学習・プロンプト改善に使い回す
- ❌ **単一メトリクスへの過集中**: Faithfulness高くてもRelevancy低い場合がある
- ❌ **LLM Judgeの結果を盲信**: バイアスを理解した上でキャリブレーション
- ❌ **プロダクション後に評価しない**: デプロイ後も継続的なモニタリングが必須
- ❌ **ベンチマークのGameplay**: 評価セットを直接最適化するとオーバーフィット


---

<!-- _class: lead -->
# Section 7: プロダクション設計パターン

- 本番環境で信頼性・スケーラビリティ・コスト効率を実現する


---

# LLMアプリのシステムアーキテクチャ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **レイヤー構成**
- ① **クライアント層**: Web/Mobile UI、API消費者
- ② **ゲートウェイ層**: 認証・レート制限・ルーティング・ロギング
- ③ **オーケストレーション層**: RAG/エージェントパイプライン
- ④ **LLM層**: モデルAPI / セルフホストモデル


---

# LLMアプリのシステムアーキテクチャ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- ⑤ **データ層**: ベクターDB・キャッシュ・永続ストレージ
- ⑥ **観測可能性層**: ログ・メトリクス・トレース
- **設計原則**
- 各層の責務を明確に分離
- LLM呼び出しを薄いラッパーで抽象化（モデル切り替えを容易に）
- 全LLM呼び出しをログ・追跡（コスト管理・デバッグ）


---

# LLMゲートウェイパターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **LLMゲートウェイとは**
- アプリケーションとLLMプロバイダーの間に置く共通レイヤー
- **主な機能**
- ① モデルルーティング: タスク種別で最適モデルへ自動振り分け
-    簡単な分類 → Haiku($0.25/1M) / 複雑な推論 → Opus($15/1M)


---

# LLMゲートウェイパターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- ② プロバイダーフォールバック: OpenAI障害時にAnthropic/Geminiへ
- ③ レート制限: ユーザー毎・チーム毎のクォータ管理
- ④ 統合ログ: 全LLM呼び出しを一元記録
- ⑤ コスト帰属: プロジェクト・チーム毎にコスト集計
- **実装選択肢**
- LiteLLM（OSS）/ Portkey / Helicone / Kong AI Gateway


---

# セマンティックキャッシング（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **通常のキャッシュ（完全一致）の限界**
- 「東京の天気は？」と「東京の現在の気温は？」は意味が同じだが別クエリ
- **セマンティックキャッシュ**
- クエリをEmbeddingし、意味的に類似した過去のクエリ（コサイン距離 > 閾値）があればキャッシュを返す
- **実装**


---

# セマンティックキャッシング（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- GPTCache（OSS）/ LangChain CacheBackedEmbeddings
- Redis + pgvector でカスタム実装も可
- **効果・注意点**
- キャッシュヒット率30〜70%（同一ユーザーの繰り返し質問が多いドメイン）
- 類似度閾値の設定が重要（高すぎると誤ヒット、低すぎるとヒット率低下）
- TTL設定でキャッシュの鮮度管理（時事情報は短いTTL）


---

# ストリーミングレスポンス設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **なぜストリーミングか**
- LLMは全文生成まで数秒〜数十秒かかる
- 非ストリーミング: ユーザーが完成まで待つ（UX悪化）
- ストリーミング: 生成と同時にトークンを表示（体感速度↑）
- **実装方式**
- Server-Sent Events (SSE): シンプル・単方向。HTTP対応
- WebSocket: 双方向通信が必要な場合


---

# ストリーミングレスポンス設計（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- **バックエンド実装（FastAPI + SSE）**
- async for chunk in client.messages.stream(): yield chunk
- **フロントエンド**
- EventSource API または fetch with ReadableStream
- **注意点**
- ストリーミング中のエラーハンドリング（途中でコネクション切断）
- 途中でコンテンツフィルタに引っかかった場合の処理


---

# レート制限・コスト管理（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **APIレート制限の種類**
- RPM（Requests Per Minute）/ TPM（Tokens Per Minute）/ RPD（Requests Per Day）
- **対策**
- Exponential Backoff: 429エラー時に指数的待機
- リトライキュー: 失敗リクエストをキューに戻し後で再試行
- バッチ処理: リアルタイム不要なタスクは夜間バッチに


---

# レート制限・コスト管理（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **コスト管理**
- プロンプトキャッシング（Anthropic）: 同じシステムプロンプトを繰り返す場合90%削減
- 入力の圧縮: 不要なホワイトスペース・HTMLタグの除去
- モデルの格下げ: プロダクションで実際に必要なモデルサイズを測定
- **アラート**
- CloudWatch / Datadog でコスト閾値アラートを設定


---

# フォールバック・サーキットブレーカー（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **LLM APIの可用性**
- 主要プロバイダーでも月間SLA 99.9%（年間9時間の障害が許容される）
- マルチプロバイダー戦略が本番では必須
- **フォールバック戦略**
- Primary: GPT-4o → Fallback: Claude 3.5 Sonnet → Final: Gemini 1.5 Pro


---

# フォールバック・サーキットブレーカー（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- 実装: LiteLLM の fallback設定で自動切り替え
- **サーキットブレーカーパターン**
- Closed（正常） → エラー率↑ → Open（全リクエストをフォールバックへ）
- → Half-Open（定期的に回復テスト） → Closed（回復）
- **実装**: tenacity（Python）/ circuitbreaker ライブラリ
- エラー閾値: 5回連続失敗でCircuit Open


---

# プロンプトバージョン管理（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **プロンプトをGitで管理する**
- プロンプト変更 = コード変更と同等の影響範囲
- 変更履歴・差分・ロールバックが必要
- **管理ツール**
- LangSmith Hub: LangChain統合。プル型で実行時に最新版取得
- Promptfoo: YAML定義 + Git管理 + CI評価


---

# プロンプトバージョン管理（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- Langfuse Prompt Management: バージョン管理 + 本番での使用率追跡
- **デプロイフロー**
- PR作成 → 自動評価（Promptfoo CI）→ レビュー → マージ → 段階ロールアウト
- **プロダクション取得パターン**
- 実行時にレジストリから最新プロンプトを取得（コードデプロイ不要）
- フィーチャーフラグで即時ロールバック


---

# 観測可能性スタック（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **LLM観測可能性の3本柱**
- **① ログ（Logs）**
- 全LLM呼び出しの入力・出力・レイテンシ・コストを記録
- 構造化ログ（JSON）でクエリ・集計を容易に
- **② メトリクス（Metrics）**
- リクエスト数・エラー率・レイテンシ分布・コスト推移


---

# 観測可能性スタック（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- Prometheus + Grafana / Datadog
- **③ トレース（Traces）**
- エージェント・RAGパイプラインの各ステップを可視化
- Langfuse / LangSmith / OpenTelemetry
- **推奨スタック**
- Langfuse（OSS）+ Prometheus + Grafana
- または LangSmith（マネージド）


---

# スケーリング戦略（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **水平スケール**
- ステートレスなLLMオーケストレーション層はそのまま水平スケール可
- Kubernetes HPA（CPU/カスタムメトリクス）で自動スケール
- **非同期・バッチ処理**
- リアルタイム性不要なタスク（レポート生成・一括翻訳）は非同期キューへ


---

# スケーリング戦略（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- Celery / AWS SQS + Lambda / Cloud Run Jobs
- **LLM推論のスケール（セルフホスト）**
- vLLM の Continuous Batching: 複数リクエストを効率的にバッチ処理
- Ray Serve: モデルのレプリカ管理・負荷分散
- **プロンプトキャッシュ（Anthropic）**
- 同一システムプロンプトの繰り返し呼び出しで90%トークン削減


---

# セキュリティ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- **入力バリデーション**
- 最大トークン長の強制（コスト爆発防止）
- 不正なJSON・特殊文字のサニタイズ
- Prompt Injection検出（LLMGuard / Rebuff）
- **出力フィルタリング**
- PII検出・マスキング（AWS Comprehend / Microsoft Presidio）


---

# セキュリティ（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- コンテンツモデレーション（OpenAI Moderation API）
- 構造化出力バリデーション（型チェック・範囲チェック）
- **認証・認可**
- API KeyのローテーションはSecret Manager（AWS Secrets Manager）
- ユーザー毎のRAGアクセス制御（ABAC）
- **監査**
- 全LLM呼び出しをコンプライアンス目的で90日保持


---

# コスト最適化（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **モデル選択の最適化**
- タスク複雑度に応じたモデルルーティング（前述）
- 週次でモデル別コスト対品質の再評価
- **プロンプト最適化**
- Anthropic プロンプトキャッシング: 繰り返しシステムプロンプトを90%削減
- 入力の最小化: 余分なコンテキストを除去


---

# コスト最適化（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- Few-shot例の最適化: 3〜5例で品質が飽和することが多い
- **インフラ最適化**
- セマンティックキャッシュ（30〜70%ヒット率で大幅削減）
- バッチ処理（OpenAI Batch API: 50%割引）
- **モニタリング**
- コスト異常検知アラート（前日比150%超で通知）
- ユーザー毎・機能毎のコスト帰属


---

# LLMOpsパイプライン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- **LLMOpsとは**
- LLMアプリの開発・デプロイ・監視の継続的なオペレーション
- MLOpsのLLM特化版
- **CI/CDパイプライン**
- ① Pull Request → プロンプト変更の自動評価（Promptfoo）


---

# LLMOpsパイプライン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ② マージ → コンテナビルド → ステージング自動デプロイ
- ③ ステージングでの統合テスト → 品質ゲート通過で本番デプロイ
- **品質ゲート例**
- Faithfulness > 0.75 / Latency P95 < 3s / コスト増加率 < 20%
- **プロンプト改善サイクル**
- 本番ログ → 問題トレース特定 → プロンプト修正 → オフライン評価 → PRマージ → デプロイ


---

# デプロイパターン比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- **API（クラウドLLM）**
- ゼロインフラ管理。スケール自動。コストが高くなりやすい
- 最初の選択肢。プロトタイプ〜中規模本番に適する
- **コンテナ（Kubernetes + vLLM）**
- セルフホスト。GPU管理が必要。大規模トラフィックでコスト効率が良い
- EKS/GKE + Karpenter でGPUノードの自動スケール


---

# デプロイパターン比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **サーバーレス推論**
- AWS Lambda + Llama.cpp（GGUF）
- 低トラフィック・バースト的な利用に最適
- コールドスタートに注意（Provisioned Concurrencyで緩和）
- **マネージドMLサービス**
- AWS SageMaker / Google Vertex AI Endpoints
- GPUインフラ管理をアウトソース。中間的なコスト


---

<!-- _class: lead -->
# Section 8: 設計選択ガイド

- 意思決定フレームワーク・まとめ


---

# ユースケース別アプローチ比較マトリクス

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
| ユースケース | Prompt | RAG | Fine-tune | Agent |
| --- | --- | --- | --- | --- |
| カスタマーサポートQ&A | ○ | ◎ | △ | △ |
| コード生成 | ◎ | ○ | ◎ | ○ |
| 社内文書検索 | △ | ◎ | ✗ | ○ |
| データ分析・レポート | △ | ○ | △ | ◎ |
| 特定スタイルの文章生成 | ○ | △ | ◎ | △ |
| 複数APIの自動オーケストレーション | ✗ | ✗ | ✗ | ◎ |
| リアルタイムニュース要約 | ✗ | ◎ | ✗ | ○ |
- ◎=最適 ○=有効 △=限定的 ✗=不向き


---

# 段階的実装戦略（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **フェーズ1: プロンプトエンジニアリング（Week 1〜2）**
- ゼロコストで品質を最大化。基礎評価セットを構築
- 目標品質の60〜70%をここで達成
- **フェーズ2: RAG追加（Week 3〜6）**
- 外部知識が必要な場合に追加。Naive RAGから開始
- 評価メトリクス（RAGAS）を導入


---

# 段階的実装戦略（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- **フェーズ3: Fine-tuning検討（Month 2〜3）**
- プロンプト+RAGで品質目標に達しない場合のみ
- QLoRAで小規模実験 → 効果確認 → 本番化
- **フェーズ4: エージェント化（Month 3〜6）**
- 複数ステップ・ツール連携が必要になった時点で検討
- シングルエージェントから開始
- **原則**: 必要性が明確になってから次フェーズへ


---

# コスト・複雑さ・性能の総合比較（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **実装コスト（開発工数）**
- Prompt < RAG < Fine-tuning < Agent
- Prompt: 1〜2日 / RAG: 1〜2週 / Fine-tuning: 2〜4週 / Agent: 4〜8週
- **運用コスト（月次）**
- Prompt: 低 / RAG: 中（ベクターDB） / Fine-tuning: 中（推論インフラ） / Agent: 高（多回呼び出し）
- **性能ポテンシャル**


---

# コスト・複雑さ・性能の総合比較（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- 特定タスク最高性能: Fine-tuning + RAG の組み合わせ
- 最も広い適用範囲: Agent
- **デバッグ難易度**
- Prompt < Fine-tuning < RAG < Agent
- **スケーリング容易性**
- Prompt > RAG > Fine-tuning > Agent


---

# よくある失敗パターン（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">フォールバックチェーン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Request</text>
<rect x="220" y="100" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="290" y="121" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Primary</text>
<text x="290" y="139" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4o</text>
<rect x="220" y="200" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="290" y="221" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 1</text>
<text x="290" y="239" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude 3.5</text>
<rect x="220" y="300" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="290" y="321" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Fallback 2</text>
<text x="290" y="339" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini Pro</text>
<rect x="450" y="155" width="140" height="60" rx="8" fill="#e65100"/>
<text x="520" y="176" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Circuit</text>
<text x="520" y="194" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Breaker</text>
<rect x="650" y="80" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="715" y="101" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Success</text>
<text x="715" y="119" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<rect x="650" y="200" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="715" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Error</text>
<text x="715" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Response</text>
<rect x="650" y="320" width="130" height="60" rx="8" fill="#f57f17"/>
<text x="715" y="341" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Cached</text>
<text x="715" y="359" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Response</text>
<line x1="150" y1="190" x2="209.37040756688586" y2="139.11107922838357" stroke="#00e676" stroke-width="2"/>
<polygon points="220,130 213.27515580762167,143.66661884257536 205.46565932615005,134.5555396141918" fill="#00e676"/>
<line x1="220" y1="160" x2="220" y2="186" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,200 214,186 226,186" fill="#e91e63"/>
<line x1="220" y1="260" x2="220" y2="286" stroke="#e91e63" stroke-width="2"/>
<polygon points="220,300 214,286 226,286" fill="#e91e63"/>
<line x1="360" y1="130" x2="437.4780193260012" y2="168.7390096630006" stroke="#00e676" stroke-width="2"/>
<polygon points="450,175 434.7947377530014,174.10557280900008 440.16130089900093,163.3724465170011" fill="#00e676"/>
<line x1="360" y1="230" x2="437.4780193260012" y2="191.2609903369994" stroke="#ffcc80" stroke-width="2"/>
<polygon points="450,185 440.16130089900093,196.6275534829989 434.7947377530014,185.89442719099992" fill="#ffcc80"/>
<line x1="360" y1="330" x2="442.0310602963757" y2="211.5106906830129" stroke="#ce93d8" stroke-width="2"/>
<polygon points="450,200 446.9642134462384,214.92595055599475 437.097907146513,208.09543081003108" fill="#ce93d8"/>
<line x1="590" y1="165" x2="639.6798420371896" y2="119.46014479924284" stroke="#00e676" stroke-width="2"/>
<polygon points="650,110 643.7341898082936,123.88306964044729 635.6254942660855,115.03721995803839" fill="#00e676"/>
<line x1="590" y1="185" x2="638.8" y2="221.6" stroke="#e91e63" stroke-width="2"/>
<polygon points="650,230 635.1999999999999,226.4 642.4,216.79999999999998" fill="#e91e63"/>
<line x1="590" y1="195" x2="644.946082564192" y2="336.94404662416275" stroke="#ffcc80" stroke-width="2"/>
<polygon points="650,350 639.3506739745475,339.11001123950905 650.5414911538365,334.77808200881645" fill="#ffcc80"/>
<text x="400" y="395" text-anchor="middle" fill="#40c4ff" font-size="12">タイムアウト・レート制限・エラー時に自動フォールバック</text>
</svg>
- ❌ **評価なしでエージェント化**: 単純なRAGで解ける問題にエージェントを使う
- ❌ **初日からFine-tuning**: プロンプト改善を試みずに学習を始める
- ❌ **RAGの品質を測定しない**: RAGAS等での定量評価なしに本番化
- ❌ **モノリシックエージェント**: 全機能を1エージェントに詰め込む


---

# よくある失敗パターン（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ストリーミングレスポンスアーキテクチャ</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Browser</text>
<text x="90" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Client</text>
<rect x="215" y="100" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="280" y="121" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">API</text>
<text x="280" y="139" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
<rect x="215" y="210" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="280" y="231" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">SSE/</text>
<text x="280" y="249" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WebSocket</text>
<rect x="420" y="155" width="130" height="70" rx="8" fill="#e65100"/>
<text x="485" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<text x="485" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Proxy</text>
<rect x="620" y="100" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="121" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">GPT-4o</text>
<text x="690" y="139" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Stream</text>
<rect x="620" y="220" width="140" height="60" rx="8" fill="#16213e"/>
<text x="690" y="241" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Claude</text>
<text x="690" y="259" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold">Stream</text>
<line x1="150" y1="185" x2="204.3125920048324" y2="139.04319138052642" stroke="#40c4ff" stroke-width="2"/>
<polygon points="215,130 208.18824545362943,143.6235090927411 200.43693855603536,134.46287366831174" fill="#40c4ff"/>
<line x1="215" y1="160" x2="215" y2="196" stroke="#ffffff" stroke-width="2"/>
<polygon points="215,210 209,196 221,196" fill="#ffffff"/>
<line x1="345" y1="130" x2="407.9950990400244" y2="167.79705942401463" stroke="#40c4ff" stroke-width="2"/>
<polygon points="420,175 404.90812450745926,172.9420169782899 411.08207357258954,162.65210186973937" fill="#40c4ff"/>
<line x1="345" y1="240" x2="407.6470588235294" y2="206.58823529411765" stroke="#ce93d8" stroke-width="2"/>
<polygon points="420,200 410.4705882352941,211.88235294117646 404.8235294117647,201.29411764705884" fill="#ce93d8"/>
<line x1="550" y1="180" x2="608.6077314031057" y2="138.13733471206734" stroke="#f9a825" stroke-width="2"/>
<polygon points="620,130 612.0951605654203,143.01973553930776 605.1203022407911,133.25493388482693" fill="#f9a825"/>
<line x1="550" y1="190" x2="609.3704075668859" y2="240.88892077161643" stroke="#ce93d8" stroke-width="2"/>
<polygon points="620,250 605.4656593261501,245.4444603858082 613.2751558076217,236.33338115742464" fill="#ce93d8"/>
<line x1="150" y1="200" x2="215" y2="240" stroke="#00e676" stroke-width="2" stroke-dasharray="5"/>
<text x="165" y="268" fill="#00e676" font-size="11">Stream ←</text>
<rect x="30" y="285" width="740" height="90" rx="8" fill="#16213e"/>
<text x="400" y="308" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ストリーミングの利点</text>
<text x="160" y="333" text-anchor="middle" fill="#ffffff" font-size="12">TTFT 短縮</text>
<text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="12">UX 改善（逐次表示）</text>
<text x="630" y="333" text-anchor="middle" fill="#ffffff" font-size="12">早期キャンセル可能</text>
<text x="400" y="363" text-anchor="middle" fill="#40c4ff" font-size="11">Server-Sent Events (SSE) | AsyncGenerator | WebSocket</text>
</svg>
- ❌ **セキュリティ後回し**: Prompt Injectionやデータ漏洩を設計段階で考慮しない
- ❌ **コスト上限なし**: Agentのループでコスト爆発（月$10K超の事故も）
- ❌ **プロンプトのハードコーディング**: バージョン管理・実験なしで本番変更
- ❌ **1つのLLMプロバイダーへの依存**: フォールバックなしで可用性リスク


---

# 技術スタック選択ガイド（2026年版）（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">マルチモデルオーケストレーション</text>
<rect x="300" y="60" width="200" height="55" rx="8" fill="#e65100"/>
<text x="400" y="78.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Orchestrator</text>
<text x="400" y="96.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="400" y1="115" x2="400" y2="131" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,145 394,131 406,131" fill="#ffffff"/>
<rect x="300" y="145" width="200" height="55" rx="8" fill="#16213e"/>
<text x="400" y="163.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Task</text>
<text x="400" y="181.5" text-anchor="middle" fill="#40c4ff" font-size="13" font-weight="bold">Decomposer</text>
<line x1="300" y1="172" x2="133.83363056536837" y2="197.8481019120538" stroke="#82b1ff" stroke-width="2"/>
<polygon points="120,200 132.91138852767713,191.91940309832452 134.7558726030596,203.7768007257831" fill="#82b1ff"/>
<line x1="350" y1="200" x2="284" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="270,200 284,194 284,206" fill="#ffffff"/>
<line x1="450" y1="200" x2="516" y2="200" stroke="#ffffff" stroke-width="2"/>
<polygon points="530,200 516,206 516,194" fill="#ffffff"/>
<line x1="500" y1="172" x2="666.1663694346316" y2="197.8481019120538" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 665.2441273969404,203.7768007257831 667.0886114723229,191.91940309832452" fill="#a5d6a7"/>
<rect x="20" y="185" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="85" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist A</text>
<text x="85" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Reasoning）</text>
<rect x="200" y="185" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="265" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist B</text>
<text x="265" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Code Gen）</text>
<rect x="380" y="185" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="445" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist C</text>
<text x="445" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Retrieval）</text>
<rect x="560" y="185" width="130" height="60" rx="8" fill="#b71c1c"/>
<text x="625" y="206" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Specialist D</text>
<text x="625" y="224" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">（Vision）</text>
<line x1="85" y1="245" x2="286.3638876214512" y2="291.8288110747561" stroke="#82b1ff" stroke-width="2"/>
<polygon points="300,295 285.00480665348954,297.6728592369913 287.7229685894129,285.9847629125209" fill="#82b1ff"/>
<line x1="265" y1="245" x2="328.3512958792702" y2="287.2341972528468" stroke="#ce93d8" stroke-width="2"/>
<polygon points="340,295 325.0230947019188,292.2264990188739 331.6794970566216,282.2418954868197" fill="#ce93d8"/>
<line x1="445" y1="245" x2="409.3655062427143" y2="284.5938819525397" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="400,295 404.9057413652313,280.58009356280496 413.82527112019727,288.6076703422744" fill="#a5d6a7"/>
<line x1="625" y1="245" x2="473.3983416620686" y2="290.9398964660398" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="460,295 471.65829729037137,285.1977500394389 475.13838603376587,296.68204289264065" fill="#ffcdd2"/>
<rect x="280" y="295" width="240" height="55" rx="8" fill="#f57f17"/>
<text x="400" y="313.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Result</text>
<text x="400" y="331.5" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregator</text>
<line x1="400" y1="350" x2="400" y2="371" stroke="#00e676" stroke-width="2"/>
<polygon points="400,385 394,371 406,371" fill="#00e676"/>
<text x="400" y="398" text-anchor="middle" fill="#00e676" font-size="13" font-weight="bold">Final Response</text>
</svg>
- **オーケストレーション**
- 本番フロー: LangGraph / プロトタイプ: LangChain / マルチエージェント: CrewAI
- **RAG**
- フルマネージド: LlamaIndex Cloud / セルフホスト: LlamaIndex + Qdrant
- **ベクターDB**
- 新規スタート: Qdrant（OSS） / PostgreSQL既存: pgvector
- **観測可能性**


---

# 技術スタック選択ガイド（2026年版）（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">プロンプトチェーニングパイプライン</text>
<rect x="20" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="80" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">User</text>
<text x="80" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Query</text>
<rect x="165" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="225" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="225" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 1</text>
<rect x="310" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="370" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="370" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 1</text>
<rect x="455" y="155" width="120" height="70" rx="8" fill="#1976d2"/>
<text x="515" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Prompt</text>
<text x="515" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Template 2</text>
<rect x="600" y="155" width="120" height="70" rx="8" fill="#16213e"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Call 2</text>
<line x1="140" y1="190" x2="151" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="165,190 151,196 151,184" fill="#ffffff"/>
<line x1="285" y1="190" x2="296" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="310,190 296,196 296,184" fill="#ffffff"/>
<line x1="430" y1="190" x2="441" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="455,190 441,196 441,184" fill="#ffffff"/>
<line x1="575" y1="190" x2="586" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="600,190 586,196 586,184" fill="#ffffff"/>

<rect x="600" y="155" width="120" height="70" rx="8" fill="#2e7d32"/>
<text x="660" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Final</text>
<text x="660" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="720" y1="190" x2="746" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="760,190 746,196 746,184" fill="#00e676"/>
<text x="770" y="195" fill="#00e676" font-size="14" font-weight="bold">✓</text>
<rect x="20" y="280" width="760" height="80" rx="8" fill="#16213e"/>
<text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チェーンの利点</text>
<text x="160" y="340" text-anchor="middle" fill="#ffffff" font-size="12">複雑タスクの分解</text>
<text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="12">中間結果の検証</text>
<text x="640" y="340" text-anchor="middle" fill="#ffffff" font-size="12">コンテキスト管理</text>
</svg>
- OSS優先: Langfuse / LangChain使用中: LangSmith
- **LLMゲートウェイ**
- OSS: LiteLLM / マネージド: Portkey
- **評価**
- CI統合: Promptfoo / 包括的: RAGAS + Langfuse
- **推論（セルフホスト）**
- 本番GPU: vLLM / ローカル開発: Ollama


---

# 設計レビューチェックリスト（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">ルーターパターン（Query → Classify → Route）</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="230" y="155" width="140" height="70" rx="8" fill="#e65100"/>
<text x="300" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Classifier</text>
<text x="300" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">LLM</text>
<line x1="150" y1="190" x2="216" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="230,190 216,196 216,184" fill="#ffffff"/>
<rect x="470" y="60" width="140" height="60" rx="8" fill="#1565c0"/>
<text x="540" y="81" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Simple</text>
<text x="540" y="99" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Answer</text>
<rect x="470" y="145" width="140" height="60" rx="8" fill="#7b1fa2"/>
<text x="540" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">RAG</text>
<text x="540" y="184" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Pipeline</text>
<rect x="470" y="230" width="140" height="60" rx="8" fill="#2e7d32"/>
<text x="540" y="251" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Code</text>
<text x="540" y="269" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Executor</text>
<rect x="470" y="315" width="140" height="60" rx="8" fill="#b71c1c"/>
<text x="540" y="336" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Human</text>
<text x="540" y="354" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Escalate</text>
<line x1="370" y1="175" x2="459.3328495513676" y2="99.06707788133757" stroke="#82b1ff" stroke-width="2"/>
<polygon points="470,90 463.21874007194083,103.63871378789432 455.44695903079435,94.49544197478082" fill="#82b1ff"/>
<line x1="370" y1="185" x2="456.06947933706016" y2="176.393052066294" stroke="#ce93d8" stroke-width="2"/>
<polygon points="470,175 456.66650165118614,182.36327520755393 455.4724570229342,170.42282892503405" fill="#ce93d8"/>
<line x1="370" y1="195" x2="458.2617893717911" y2="252.3701630916642" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="470,260 454.9918592682186,257.40082478946806 461.5317194753636,247.3395013938604" fill="#a5d6a7"/>
<line x1="370" y1="205" x2="461.86266528793266" y2="333.60773140310573" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="470,345 456.98026446069224,337.0951605654203 466.7450661151731,330.12030224079115" fill="#ffcdd2"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Unified</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Output</text>
<line x1="610" y1="90" x2="671.1000984599445" y2="164.19297670136132" stroke="#82b1ff" stroke-width="2"/>
<polygon points="680,175 666.4685170462423,168.00722021852792 675.7316798736468,160.37873318419472" fill="#82b1ff"/>
<line x1="610" y1="175" x2="666.1407070887436" y2="183.02010101267766" stroke="#ce93d8" stroke-width="2"/>
<polygon points="680,185 665.2921789513198,188.95979797464466 666.9892352261675,177.08040405071065" fill="#ce93d8"/>
<line x1="610" y1="260" x2="669.3704075668859" y2="209.11107922838357" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="680,200 673.2751558076217,213.66661884257536 665.4656593261501,204.5555396141918" fill="#a5d6a7"/>
<line x1="610" y1="345" x2="673.1595528349542" y2="232.2150842232961" stroke="#ffcdd2" stroke-width="2"/>
<polygon points="680,220 678.3945889306525,235.14670443688715 667.9245167392559,229.28346400970503" fill="#ffcdd2"/>
<text x="400" y="390" text-anchor="middle" fill="#40c4ff" font-size="12">分類精度がシステム全体の品質を決定する</text>
</svg>
- **アーキテクチャ**
- □ なぜこのアプローチを選んだか（他との比較）が文書化されている
- □ フォールバック戦略（LLM障害時）が定義されている
- □ コスト上限とアラートが設定されている
- **品質**
- □ 評価メトリクスと目標値が定義されている
- □ ゴールデンデータセット（100件以上）が用意されている


---

# 設計レビューチェックリスト（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">エージェント ReAct ループ</text>
<rect x="300" y="60" width="200" height="60" rx="8" fill="#40c4ff"/>
<text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">User Query</text>
<rect x="300" y="155" width="200" height="60" rx="8" fill="#16213e"/>
<text x="400" y="176" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Thought</text>
<text x="400" y="194" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">（推論）</text>
<rect x="300" y="250" width="200" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Action</text>
<text x="400" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（ツール呼び出し）</text>
<rect x="300" y="345" width="200" height="45" rx="8" fill="#1565c0"/>
<text x="400" y="358.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Observation</text>
<text x="400" y="376.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">（結果取得）</text>
<rect x="570" y="230" width="170" height="60" rx="8" fill="#e65100"/>
<text x="655" y="251" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">External</text>
<text x="655" y="269" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Tools</text>
<rect x="570" y="320" width="170" height="60" rx="8" fill="#2e7d32"/>
<text x="655" y="341" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="655" y="359" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Answer</text>
<line x1="400" y1="120" x2="400" y2="141" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,155 394,141 406,141" fill="#ffffff"/>
<line x1="400" y1="215" x2="400" y2="236" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,250 394,236 406,236" fill="#ffffff"/>
<line x1="400" y1="310" x2="400" y2="331" stroke="#ffffff" stroke-width="2"/>
<polygon points="400,345 394,331 406,331" fill="#ffffff"/>
<line x1="500" y1="280" x2="556.5386647330284" y2="263.8460957905633" stroke="#ffcc80" stroke-width="2"/>
<polygon points="570,260 558.1869915004127,269.61523947640825 554.8903379656442,258.0769521047184" fill="#ffcc80"/>
<line x1="570" y1="305" x2="512.1554039897425" y2="338.05405486300435" stroke="#00e676" stroke-width="2"/>
<polygon points="500,345 509.17857035960145,332.8445960102576 515.1322376198834,343.2635137157511" fill="#00e676"/>
<line x1="300" y1="367" x2="100" y2="367" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="367" x2="100" y2="185" stroke="#40c4ff" stroke-width="2" stroke-dasharray="4"/>
<line x1="100" y1="185" x2="286" y2="185" stroke="#40c4ff" stroke-width="2"/>
<polygon points="300,185 286,191 286,179" fill="#40c4ff"/>
<text x="55" y="285" text-anchor="middle" fill="#40c4ff" font-size="12" transform="rotate(-90, 55, 285)">Loop</text>
<line x1="400" y1="305" x2="556.2130301765488" y2="332.5670053252733" stroke="#e91e63" stroke-width="2"/>
<polygon points="570,335 555.1703181730945,338.4757066781809 557.2557421800032,326.65830397236573" fill="#e91e63"/>
<text x="400" y="398" text-anchor="middle" fill="#aaa" font-size="12">ReAct = Reasoning + Acting — Yao et al. 2022</text>
</svg>
- □ CI/CDに自動評価が組み込まれている
- **セキュリティ**
- □ 入力バリデーション・サニタイズが実装されている
- □ 副作用のあるツールにHuman-in-the-loopが組み込まれている
- □ PII・機密データの扱いがレビューされている
- **観測可能性**
- □ 全LLM呼び出しのログ・トレースが取れている


---

# 参考リソース（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">RAG + リランキングパイプライン</text>
<rect x="20" y="155" width="110" height="70" rx="8" fill="#40c4ff"/>
<text x="75" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="175" y="155" width="120" height="70" rx="8" fill="#1565c0"/>
<text x="235" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Embed</text>
<text x="235" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">+ Search</text>
<rect x="340" y="100" width="120" height="60" rx="8" fill="#16213e"/>
<text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Top-K</text>
<text x="400" y="139" text-anchor="middle" fill="#aaa" font-size="12" font-weight="bold">Chunks</text>
<rect x="340" y="200" width="120" height="60" rx="8" fill="#7b1fa2"/>
<text x="400" y="221" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Reranker</text>
<text x="400" y="239" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Model</text>
<rect x="510" y="155" width="120" height="70" rx="8" fill="#e65100"/>
<text x="570" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Prompt</text>
<text x="570" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Build</text>
<rect x="670" y="155" width="110" height="70" rx="8" fill="#2e7d32"/>
<text x="725" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">LLM</text>
<text x="725" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Generate</text>
<line x1="130" y1="190" x2="161" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="175,190 161,196 161,184" fill="#ffffff"/>
<line x1="295" y1="180" x2="330.6344937572857" y2="140.40611804746032" stroke="#40c4ff" stroke-width="2"/>
<polygon points="340,130 335.0942586347687,144.419906437195 326.17472887980273,136.39232965772564" fill="#40c4ff"/>
<line x1="295" y1="195" x2="328.9490689567314" y2="221.4048314107911" stroke="#ffffff" stroke-width="2"/>
<polygon points="340,230 325.2654252756419,226.14094471504907 332.63271263782093,216.66871810653313" fill="#ffffff"/>
<line x1="460" y1="130" x2="499.5938819525397" y2="165.6344937572857" stroke="#ffcc80" stroke-width="2"/>
<polygon points="510,175 495.58009356280496,170.0942586347687 503.6076703422744,161.1747288798027" fill="#ffcc80"/>
<line x1="460" y1="230" x2="497.9950990400244" y2="207.20294057598537" stroke="#ce93d8" stroke-width="2"/>
<polygon points="510,200 501.08207357258954,212.34789813026063 494.90812450745926,202.0579830217101" fill="#ce93d8"/>
<line x1="630" y1="190" x2="656" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="670,190 656,196 656,184" fill="#ffffff"/>
<line x1="780" y1="190" x2="786" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="800,190 786,196 786,184" fill="#00e676"/>
<rect x="20" y="280" width="760" height="90" rx="8" fill="#16213e"/>
<text x="400" y="307" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">リランキングの効果</text>
<text x="160" y="335" text-anchor="middle" fill="#ffffff" font-size="12">BM25: キーワード一致</text>
<text x="400" y="335" text-anchor="middle" fill="#ffffff" font-size="12">Cross-Encoder: 文脈的関連性</text>
<text x="640" y="335" text-anchor="middle" fill="#ffffff" font-size="12">精度 +15〜30% 向上</text>
<text x="400" y="360" text-anchor="middle" fill="#40c4ff" font-size="11">Cohere Rerank / BGE Reranker / ColBERT</text>
</svg>
- **フレームワーク・ツール**
- [LangGraph](https://langchain-ai.github.io/langgraph/) — ステートフルエージェント
- [LlamaIndex](https://docs.llamaindex.ai/) — RAGフレームワーク
- [Langfuse](https://langfuse.com/) — LLMオブザーバビリティ（OSS）
- [RAGAS](https://docs.ragas.io/) — RAG評価フレームワーク
- **学習リソース**


---

# 参考リソース（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
<rect width="800" height="400" fill="#1a1a2e"/>
<text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">アンサンブル・投票パターン</text>
<rect x="30" y="155" width="120" height="70" rx="8" fill="#40c4ff"/>
<text x="90" y="195" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">Query</text>
<rect x="220" y="70" width="130" height="60" rx="8" fill="#1565c0"/>
<text x="285" y="91" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model A</text>
<text x="285" y="109" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">GPT-4</text>
<rect x="220" y="160" width="130" height="60" rx="8" fill="#7b1fa2"/>
<text x="285" y="181" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model B</text>
<text x="285" y="199" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Claude</text>
<rect x="220" y="250" width="130" height="60" rx="8" fill="#2e7d32"/>
<text x="285" y="271" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Model C</text>
<text x="285" y="289" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Gemini</text>
<line x1="150" y1="185" x2="211.1000984599446" y2="110.8070232986387" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,100 215.7316798736469,114.6212668158053 206.4685170462423,106.9927797814721" fill="#40c4ff"/>
<line x1="150" y1="190" x2="206" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="220,190 206,196 206,184" fill="#ffffff"/>
<line x1="150" y1="195" x2="211.1000984599446" y2="269.1929767013613" stroke="#40c4ff" stroke-width="2"/>
<polygon points="220,280 206.4685170462423,273.0072202185279 215.7316798736469,265.37873318419474" fill="#40c4ff"/>
<rect x="460" y="140" width="150" height="100" rx="8" fill="#e65100"/>
<text x="535" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Voting /</text>
<text x="535" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Aggregation</text>
<line x1="350" y1="100" x2="448.43281720069433" y2="167.11328445501886" stroke="#82b1ff" stroke-width="2"/>
<polygon points="460,175 445.05279625284527,172.07064851186414 451.8128381485434,162.15592039817358" fill="#82b1ff"/>
<line x1="350" y1="190" x2="446" y2="190" stroke="#ffffff" stroke-width="2"/>
<polygon points="460,190 446,196 446,184" fill="#ffffff"/>
<line x1="350" y1="280" x2="448.43281720069433" y2="212.88671554498114" stroke="#a5d6a7" stroke-width="2"/>
<polygon points="460,205 451.8128381485434,217.84407960182642 445.05279625284527,207.92935148813586" fill="#a5d6a7"/>
<rect x="680" y="155" width="100" height="70" rx="8" fill="#f57f17"/>
<text x="730" y="181" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Final</text>
<text x="730" y="199" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Output</text>
<line x1="610" y1="190" x2="666" y2="190" stroke="#00e676" stroke-width="2"/>
<polygon points="680,190 666,196 666,184" fill="#00e676"/>
<rect x="30" y="330" width="740" height="55" rx="8" fill="#16213e"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">投票戦略</text>
<text x="160" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Majority Vote</text>
<text x="400" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Weighted Average</text>
<text x="640" y="374" text-anchor="middle" fill="#ffffff" font-size="11">Best-of-N Sampling</text>
</svg>
- [Deep Learning AI — LLMOps](https://www.deeplearning.ai/courses/llmops/)
- [Hugging Face — Fine-tuning Guide](https://huggingface.co/docs/transformers/training)
- [LangGraph チュートリアル](https://langchain-ai.github.io/langgraph/tutorials/)
- **論文・レポート**
- RAGSurvey (Gao et al., 2023) / ReAct (Yao et al., 2023)
- LoRA (Hu et al., 2021) / GraphRAG (Edge et al., 2024)

