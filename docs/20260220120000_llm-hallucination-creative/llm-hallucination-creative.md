---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "LLMのハルシネーションを逆手に取る"
footer: "© 2026 — Creative Hallucination Workshop"
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
# LLMのハルシネーションを逆手に取る

- 創作・ブレインストーミングでAIの「嘘」を武器にする
- Creative Hallucination Workshop — 2026


---

# アジェンダ

> *幻覚を創造に変える5つのユースケースと実践設計を学ぶ*

- **Part 1** ハルシネーションとは（10分）
- **Part 2** 逆転の発想（5分）
- **Part 3** ユースケース分類（15分）
- **Part 4** 実践テクニック（15分）
- **Part 5** リスクと限界（10分）
- **Part 6** まとめ（5分）


---

# 本日のゴール

> *幻覚を制御して創造的アウトプットを量産できるようになる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="42" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">本日のゴール</text>
<!-- Four goal cards in 2x2 grid -->
<rect x="30" y="65" width="360" height="130" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/>
<text x="60" y="98" fill="#f9a825" font-size="22">🔬</text>
<text x="105" y="94" fill="#ffffff" font-size="14" font-weight="bold">技術的理解</text>
<text x="105" y="114" fill="#9ca3af" font-size="12">ハルシネーションのメカニズムを</text>
<text x="105" y="132" fill="#9ca3af" font-size="12">トークン予測から理解する</text>
<text x="60" y="178" fill="#e91e63" font-size="22">🎨</text>
<text x="105" y="174" fill="#ffffff" font-size="14" font-weight="bold">視点の転換</text>
<text x="105" y="194" fill="#9ca3af" font-size="12">「バグ」を「創造ツール」として</text>
<text x="410" y="65" width="360" height="130" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<rect x="410" y="65" width="360" height="130" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="440" y="98" fill="#4ade80" font-size="22">⚡</text>
<text x="485" y="94" fill="#ffffff" font-size="14" font-weight="bold">実践プロンプト習得</text>
<text x="485" y="114" fill="#9ca3af" font-size="12">明日から使えるパターンを</text>
<text x="485" y="132" fill="#9ca3af" font-size="12">5つ習得する</text>
<text x="440" y="178" fill="#f9a825" font-size="22">⚖️</text>
<text x="485" y="174" fill="#ffffff" font-size="14" font-weight="bold">リスク判断</text>
<text x="485" y="194" fill="#9ca3af" font-size="12">適切な活用シーンを自分で判断</text>
<rect x="30" y="210" width="360" height="60" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="1.5"/>
<rect x="410" y="210" width="360" height="60" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<!-- Big takeaway box -->
<rect x="30" y="305" width="740" height="68" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="332" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">終了時の状態</text>
<text x="400" y="358" text-anchor="middle" fill="#ffffff" font-size="13">ハルシネーションを「恐れる存在」から「使いこなす道具」に変える</text>
</svg>
- ハルシネーションのメカニズムを技術的に理解する
- 「バグ」を「創造ツール」として捉え直す視点を得る
- 明日から使える実践的プロンプトパターンを習得する
- リスクを踏まえた適切な活用シーンを判断できる


---

<!-- _class: lead -->
# Part 1

- ハルシネーションとは


---

# そもそも「ハルシネーション」とは

> *幻覚は確率的言語生成の本質であり消去不能な特性だ*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Brain icon area -->
<ellipse cx="200" cy="180" rx="90" ry="80" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="200" y="170" text-anchor="middle" fill="#f9a825" font-size="36">🧠</text>
<text x="200" y="210" text-anchor="middle" fill="#ffffff" font-size="13">LLM</text>
<!-- Arrow right -->
<line x1="295" y1="180" x2="355" y2="180" stroke="#e91e63" stroke-width="3"/>
<polygon points="352,174 364,180 352,186" fill="#e91e63"/>
<!-- Output box -->
<rect x="365" y="130" width="200" height="100" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="465" y="162" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">自信満々の出力</text>
<text x="465" y="185" text-anchor="middle" fill="#ffffff" font-size="12">「1985年にXXX社が</text>
<text x="465" y="203" text-anchor="middle" fill="#ffffff" font-size="12">発明した...」</text>
<!-- Cross/wrong marker -->
<text x="600" y="175" fill="#e91e63" font-size="40">✗</text>
<!-- Fact check -->
<rect x="650" y="130" width="130" height="100" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="715" y="162" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">事実確認</text>
<text x="715" y="185" text-anchor="middle" fill="#ffffff" font-size="12">存在しない</text>
<text x="715" y="203" text-anchor="middle" fill="#ffffff" font-size="12">情報…</text>
<!-- Bottom labels -->
<text x="200" y="310" text-anchor="middle" fill="#9ca3af" font-size="13">確率的テキスト生成</text>
<text x="465" y="285" text-anchor="middle" fill="#e91e63" font-size="13">ハルシネーション</text>
<line x1="465" y1="232" x2="465" y2="270" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4"/>
<polygon points="461,268 465,278 469,268" fill="#e91e63"/>
<text x="400" y="360" text-anchor="middle" fill="#6b7280" font-size="12">モデルは「嘘をついている」のではなく「確率的に最もらしいテキスト」を生成している</text>
</svg>
- LLMが**事実と異なる情報**を自信を持って出力する現象
- 例: 実在しない論文・人物・APIを引用する
- 例: 歴史的事実を「それらしく」誤って述べる
- **重要**: モデルは「嘘をついている」のではなく、「確率的に最もそれらしいテキスト」を生成している
- ゆえに — 用途によっては「正確さ」は不要


---

# なぜ起きるのか — トークン予測の仕組み

- <svg viewBox="0 0 760 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="280" fill="#1e1e2e" rx="12"/>

<!-- Step 1: Input -->
<rect x="20" y="100" width="130" height="60" fill="#1f2937" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))"/>
<text x="85" y="125" text-anchor="middle" fill="#9ca3af" font-size="12">入力テキスト</text>
<text x="85" y="145" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold">"東京の首都は"</text>

<!-- Arrow 1 -->
<line x1="152" y1="130" x2="185" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="183,125 193,130 183,135" fill="#6b7280"/>

<!-- Step 2: Tokenize -->
<rect x="195" y="100" width="120" height="60" fill="#1f2937" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))"/>
<text x="255" y="122" text-anchor="middle" fill="#9ca3af" font-size="11">トークン分割</text>
<text x="255" y="140" text-anchor="middle" fill="#a78bfa" font-size="12">[東京][の][首][都][は]</text>
<text x="255" y="155" text-anchor="middle" fill="#6b7280" font-size="10">各単語→ID変換</text>

<!-- Arrow 2 -->
<line x1="317" y1="130" x2="350" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="348,125 358,130 348,135" fill="#6b7280"/>

<!-- Step 3: Model -->
<rect x="360" y="80" width="120" height="100" fill="#374151" rx="8" style="filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5))"/>
<text x="420" y="110" text-anchor="middle" fill="#9ca3af" font-size="11">Transformerが</text>
<text x="420" y="126" text-anchor="middle" fill="#9ca3af" font-size="11">確率分布を計算</text>
<text x="420" y="148" text-anchor="middle" fill="#facc15" font-size="18">⚙️</text>
<text x="420" y="168" text-anchor="middle" fill="#6b7280" font-size="10">数十億パラメータ</text>

<!-- Arrow 3 -->
<line x1="482" y1="130" x2="515" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="513,125 523,130 513,135" fill="#6b7280"/>

<!-- Step 4: Probabilities -->
<rect x="525" y="60" width="210" height="140" fill="#1f2937" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))"/>
<text x="630" y="82" text-anchor="middle" fill="#9ca3af" font-size="11">次トークンの確率分布</text>
<text x="565" y="102" fill="#4ade80" font-size="12">"東京" → 42%</text>
<text x="565" y="118" fill="#4ade80" font-size="12">"京都" → 28%</text>
<text x="565" y="134" fill="#facc15" font-size="12">"大阪" → 15%</text>
<text x="565" y="150" fill="#f87171" font-size="12">"宇宙" → 3%</text>
<text x="565" y="166" fill="#6b7280" font-size="12">...その他 → 12%</text>
<text x="565" y="192" fill="#f87171" font-size="11">↑ 高温度だとここも選ばれる</text>

<!-- Bottom annotation -->
<text x="380" y="240" text-anchor="middle" fill="#6b7280" font-size="13">「確率的サンプリング」= 毎回同じとは限らない → ハルシネーションの源</text>

<!-- Step label -->
<text x="85" y="85" text-anchor="middle" fill="#6b7280" font-size="11">① 入力</text>
<text x="255" y="85" text-anchor="middle" fill="#6b7280" font-size="11">② トークン化</text>
<text x="420" y="68" text-anchor="middle" fill="#6b7280" font-size="11">③ 推論</text>
<text x="630" y="48" text-anchor="middle" fill="#6b7280" font-size="11">④ サンプリング</text>
</svg>


---

# temperature が確率分布を変える

- <svg viewBox="0 0 760 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="340" fill="#1e1e2e" rx="12"/>

<!-- Left: Low temp -->
<text x="195" y="32" text-anchor="middle" fill="#4ade80" font-size="15" font-weight="bold">temperature = 0.2（決定論的）</text>
<line x1="50" y1="290" x2="340" y2="290" stroke="#374151" stroke-width="1"/>

<!-- Bars: low temp -->
<rect x="70" y="80" width="55" height="210" fill="#4ade80" rx="4"/>
<text x="97" y="72" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="bold">70%</text>
<text x="97" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">東京</text>

<rect x="148" y="245" width="55" height="45" fill="#4ade80" opacity="0.55" rx="4"/>
<text x="175" y="237" text-anchor="middle" fill="#4ade80" font-size="12">15%</text>
<text x="175" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">京都</text>

<rect x="226" y="260" width="55" height="30" fill="#4ade80" opacity="0.35" rx="4"/>
<text x="253" y="252" text-anchor="middle" fill="#4ade80" font-size="12">10%</text>
<text x="253" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">大阪</text>

<rect x="304" y="275" width="30" height="15" fill="#4ade80" opacity="0.25" rx="4"/>
<text x="319" y="267" text-anchor="middle" fill="#4ade80" font-size="11">5%</text>
<text x="319" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">他</text>

<!-- Divider -->
<line x1="385" y1="25" x2="385" y2="320" stroke="#4b5563" stroke-width="1" stroke-dasharray="5"/>

<!-- Right: High temp -->
<text x="575" y="32" text-anchor="middle" fill="#f87171" font-size="15" font-weight="bold">temperature = 1.5（創造的）</text>
<line x1="420" y1="290" x2="730" y2="290" stroke="#374151" stroke-width="1"/>

<!-- Bars: high temp (more uniform) -->
<rect x="440" y="183" width="55" height="107" fill="#f87171" rx="4"/>
<text x="467" y="175" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold">36%</text>
<text x="467" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">東京</text>

<rect x="518" y="200" width="55" height="90" fill="#f87171" opacity="0.85" rx="4"/>
<text x="545" y="192" text-anchor="middle" fill="#f87171" font-size="12">30%</text>
<text x="545" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">京都</text>

<rect x="596" y="222" width="55" height="68" fill="#f87171" opacity="0.65" rx="4"/>
<text x="623" y="214" text-anchor="middle" fill="#f87171" font-size="12">23%</text>
<text x="623" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">大阪</text>

<rect x="674" y="257" width="40" height="33" fill="#f87171" opacity="0.5" rx="4"/>
<text x="694" y="249" text-anchor="middle" fill="#f87171" font-size="11">11%</text>
<text x="694" y="308" text-anchor="middle" fill="#9ca3af" font-size="12">宇宙</text>

<!-- Caption -->
<text x="380" y="335" text-anchor="middle" fill="#6b7280" font-size="12">高temperatureほど「意外なトークン」が選ばれやすくなる → 多様性・ハルシネーション増加</text>
</svg>


---

# 従来の認識 —「修正すべきバグ」

> *バグ扱いの幻覚は修正しようとすると創造性まで失われる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Title bar -->
<rect x="20" y="20" width="760" height="44" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="400" y="47" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold">従来アプローチ: ハルシネーション = 修正すべきバグ</text>
<!-- KPI bar -->
<text x="60" y="105" fill="#9ca3af" font-size="13" font-weight="bold">ハルシネーション率 KPI (低いほど良い)</text>
<rect x="60" y="115" width="680" height="28" fill="#16213e" rx="6" stroke="#4b5563" stroke-width="1"/>
<!-- Progress bar sections -->
<rect x="60" y="115" width="272" height="28" fill="#e91e63" rx="6"/>
<rect x="332" y="115" width="204" height="28" fill="#f9a825" rx="0"/>
<rect x="536" y="115" width="68" height="28" fill="#4ade80" rx="0"/>
<rect x="604" y="115" width="136" height="28" fill="#1f2937" rx="0"/>
<text x="196" y="134" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">高リスク 40%</text>
<text x="434" y="134" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">中リスク 30%</text>
<text x="570" y="134" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">低 10%</text>
<text x="672" y="134" text-anchor="middle" fill="#9ca3af" font-size="12">目標 20%</text>
<!-- Three fix strategies -->
<rect x="60" y="175" width="200" height="120" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="160" y="200" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">RAG</text>
<text x="160" y="220" text-anchor="middle" fill="#ffffff" font-size="12">外部知識ベース</text>
<text x="160" y="240" text-anchor="middle" fill="#9ca3af" font-size="11">事実情報を検索・注入</text>
<text x="160" y="270" text-anchor="middle" fill="#4ade80" font-size="13">↓ 正確性向上</text>
<rect x="300" y="175" width="200" height="120" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="200" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ファインチューニング</text>
<text x="400" y="220" text-anchor="middle" fill="#ffffff" font-size="12">ドメイン特化学習</text>
<text x="400" y="240" text-anchor="middle" fill="#9ca3af" font-size="11">正確なデータで再訓練</text>
<text x="400" y="270" text-anchor="middle" fill="#4ade80" font-size="13">↓ 誤り削減</text>
<rect x="540" y="175" width="220" height="120" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="650" y="200" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">0トレランス</text>
<text x="650" y="220" text-anchor="middle" fill="#ffffff" font-size="12">本番環境での基本方針</text>
<text x="650" y="240" text-anchor="middle" fill="#9ca3af" font-size="11">ハルシネーション許容ゼロ</text>
<text x="650" y="270" text-anchor="middle" fill="#4ade80" font-size="13">↓ リスク最小化</text>
<!-- BUT annotation -->
<rect x="200" y="330" width="400" height="44" fill="#1f2937" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="400" y="357" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">しかし… 正確さが不要な用途では話が変わる</text>
</svg>
- RAG・ファインチューニングで「正確さ」を追求するのが主流
- ハルシネーション率をKPIとして監視・削減
- プロダクション環境では **0トレランス** が基本
- しかし…
- 「正確さが不要な用途」では話が変わる


---

<!-- _class: lead -->
# Part 2

- ハルシネーションを武器に


---

# ランダム性こそ創造性のエンジン

> *ランダム性が多様なアイデアを生み、人間の選択肢を広げる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Human brain left -->
<ellipse cx="160" cy="180" rx="100" ry="90" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
<text x="160" y="165" text-anchor="middle" fill="#f9a825" font-size="30">💡</text>
<text x="160" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">人間の創造性</text>
<text x="160" y="222" text-anchor="middle" fill="#9ca3af" font-size="12">予測不能な連想</text>
<text x="160" y="240" text-anchor="middle" fill="#9ca3af" font-size="11">ジャズ・夢・発明</text>
<!-- Equals sign -->
<text x="310" y="195" text-anchor="middle" fill="#e91e63" font-size="40" font-weight="bold">≈</text>
<!-- LLM right -->
<ellipse cx="460" cy="180" rx="100" ry="90" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
<text x="460" y="165" text-anchor="middle" fill="#e91e63" font-size="30">🤖</text>
<text x="460" y="200" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">LLMのハルシネーション</text>
<text x="460" y="222" text-anchor="middle" fill="#9ca3af" font-size="12">訓練データから逸脱した連想</text>
<text x="460" y="240" text-anchor="middle" fill="#9ca3af" font-size="11">確率的サンプリング</text>
<!-- Arrow to output -->
<line x1="565" y1="180" x2="620" y2="180" stroke="#4ade80" stroke-width="3"/>
<polygon points="617,174 629,180 617,186" fill="#4ade80"/>
<!-- Result box -->
<rect x="630" y="130" width="150" height="100" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="705" y="162" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">創造ツール</text>
<text x="705" y="185" text-anchor="middle" fill="#ffffff" font-size="12">ブレスト相手</text>
<text x="705" y="205" text-anchor="middle" fill="#ffffff" font-size="12">壁打ちAI</text>
<!-- Bottom insight -->
<rect x="100" y="310" width="600" height="48" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="338" text-anchor="middle" fill="#f9a825" font-size="14">「正解のない問い」に対して多様な候補を大量生成する能力</text>
</svg>
- 人間の創造性も「予測不能な連想」から生まれる
- ジャズのインプロビゼーション、夢の中のストーリー…
- LLMのハルシネーション = **訓練データから逸脱した連想**
- 「正解のない問い」に対して — 多様な候補を大量生成する能力
- ブレストや創作の「壁打ち相手」として最適


---

# 「嘘」と「フィクション」の境界線

- <svg viewBox="0 0 760 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="290" fill="#1e1e2e" rx="12"/>

<!-- Spectrum bar: 4 color zones -->
<rect x="50" y="90" width="160" height="44" fill="#3b82f6" rx="4"/>
<rect x="210" y="90" width="160" height="44" fill="#4ade80" rx="4"/>
<rect x="370" y="90" width="180" height="44" fill="#facc15" rx="4"/>
<rect x="550" y="90" width="160" height="44" fill="#f87171" rx="4"/>

<!-- Zone labels inside bars -->
<text x="130" y="117" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">事実・データ</text>
<text x="290" y="117" text-anchor="middle" fill="#111" font-size="13" font-weight="bold">解釈・推測</text>
<text x="460" y="117" text-anchor="middle" fill="#111" font-size="13" font-weight="bold">創作・フィクション</text>
<text x="630" y="117" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">純粋な嘘</text>

<!-- Use case icons below bar -->
<text x="130" y="160" text-anchor="middle" fill="#9ca3af" font-size="12">📊 レポート</text>
<text x="130" y="178" text-anchor="middle" fill="#9ca3af" font-size="11">技術文書・FAQ</text>

<text x="290" y="160" text-anchor="middle" fill="#9ca3af" font-size="12">💡 仮説・ブレスト</text>
<text x="290" y="178" text-anchor="middle" fill="#9ca3af" font-size="11">デバッグ・反論</text>

<text x="460" y="160" text-anchor="middle" fill="#d1d5db" font-size="12">📝 小説・歌詞</text>
<text x="460" y="178" text-anchor="middle" fill="#d1d5db" font-size="11">詩・世界観設定</text>

<text x="630" y="160" text-anchor="middle" fill="#9ca3af" font-size="12">⚠️ 誤情報拡散</text>
<text x="630" y="178" text-anchor="middle" fill="#9ca3af" font-size="11">ファクトチェック必須</text>

<!-- Hallucination zone bracket -->
<line x1="210" y1="75" x2="550" y2="75" stroke="#facc15" stroke-width="2"/>
<line x1="210" y1="70" x2="210" y2="80" stroke="#facc15" stroke-width="2"/>
<line x1="550" y1="70" x2="550" y2="80" stroke="#facc15" stroke-width="2"/>
<text x="380" y="62" text-anchor="middle" fill="#facc15" font-size="13" font-weight="bold">🎨 ハルシネーション活用ゾーン</text>

<!-- Bottom arrows -->
<text x="130" y="230" text-anchor="middle" fill="#6b7280" font-size="12">正確さ最優先</text>
<text x="630" y="230" text-anchor="middle" fill="#6b7280" font-size="12">創造性・多様性優先</text>
<line x1="50" y1="245" x2="710" y2="245" stroke="#374151" stroke-width="1"/>
<polygon points="706,240 716,245 706,250" fill="#374151"/>
<text x="380" y="265" text-anchor="middle" fill="#4b5563" font-size="12">← 事実要求 ————————————————————— 創造性要求 →</text>
</svg>


---

<!-- _class: lead -->
# Part 3

- 5つの活用パターン


---

# UC1 — フィクション・小説執筆

> *プロットの飛躍と意外な展開を幻覚で意図的に生成できる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Title -->
<rect x="20" y="18" width="760" height="40" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="43" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">UC1: フィクション・小説執筆フロー</text>
<!-- Step boxes -->
<rect x="30" y="90" width="140" height="80" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="100" y="120" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">①お題設定</text>
<text x="100" y="140" text-anchor="middle" fill="#9ca3af" font-size="11">ジャンル・世界観</text>
<text x="100" y="158" text-anchor="middle" fill="#9ca3af" font-size="11">固有名詞OK</text>
<!-- Arrow -->
<line x1="172" y1="130" x2="200" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="198,124 210,130 198,136" fill="#6b7280"/>
<!-- Step 2 -->
<rect x="212" y="90" width="140" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="282" y="120" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">②高温度生成</text>
<text x="282" y="140" text-anchor="middle" fill="#9ca3af" font-size="11">temp 0.9〜1.2</text>
<text x="282" y="158" text-anchor="middle" fill="#9ca3af" font-size="11">複数バリエーション</text>
<!-- Arrow -->
<line x1="354" y1="130" x2="382" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="380,124 392,130 380,136" fill="#6b7280"/>
<!-- Step 3 -->
<rect x="394" y="90" width="140" height="80" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="464" y="120" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="bold">③人間が選択</text>
<text x="464" y="140" text-anchor="middle" fill="#9ca3af" font-size="11">世界観チェック</text>
<text x="464" y="158" text-anchor="middle" fill="#9ca3af" font-size="11">一貫性確認</text>
<!-- Arrow -->
<line x1="536" y1="130" x2="564" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="562,124 574,130 562,136" fill="#6b7280"/>
<!-- Step 4 -->
<rect x="576" y="90" width="180" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="666" y="120" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">④深掘り展開</text>
<text x="666" y="140" text-anchor="middle" fill="#9ca3af" font-size="11">続きを生成</text>
<text x="666" y="158" text-anchor="middle" fill="#9ca3af" font-size="11">キャラ設定・プロット</text>
<!-- Key metrics -->
<rect x="30" y="210" width="220" height="80" fill="#16213e" rx="8"/>
<text x="140" y="235" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">推奨設定</text>
<text x="140" y="258" text-anchor="middle" fill="#f9a825" font-size="13">temperature: 0.9〜1.2</text>
<text x="140" y="278" text-anchor="middle" fill="#9ca3af" font-size="12">top-p: 0.90〜0.95</text>
<rect x="290" y="210" width="220" height="80" fill="#16213e" rx="8"/>
<text x="400" y="235" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">特徴</text>
<text x="400" y="258" text-anchor="middle" fill="#4ade80" font-size="12">実在しなくてOK</text>
<text x="400" y="278" text-anchor="middle" fill="#9ca3af" font-size="12">「それらしい」が正解</text>
<rect x="550" y="210" width="220" height="80" fill="#16213e" rx="8"/>
<text x="660" y="235" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">レビュー必要度</text>
<text x="660" y="258" text-anchor="middle" fill="#4ade80" font-size="13">低〜中</text>
<text x="660" y="278" text-anchor="middle" fill="#9ca3af" font-size="12">世界観の一貫性のみ</text>
<!-- Bottom note -->
<text x="400" y="345" text-anchor="middle" fill="#6b7280" font-size="12">読者が「信じてくれれば勝ち」— 事実確認は不要なジャンル</text>
</svg>
- **活用場面**: 書き出し・プロット・キャラクター設定の壁打ち
- 「それらしい」が正解な唯一の用途 — 実在しなくてよい
- 世界設定・固有名詞・歴史背景は自由に創造してOK
- 読者が「信じてくれれば勝ち」のジャンル
- **推奨 temperature**: 0.9〜1.2
- **レビュー必要度**: 低〜中（世界観の一貫性チェックのみ）


---

# プロンプト例: 小説の書き出し生成

- **目的**: 独自世界観の小説冒頭を複数パターン生成


---

# プロンプト例: 小説の書き出し生成（コード例）

```text
system: あなたはSF小説家です。正確な事実より
        「読者を引き込む力」を優先してください。

user: 2157年、火星コロニーで起きた謎の停電事件を
      描く小説の冒頭を、文体の異なる3パターン書いて。
      固有名詞・組織名・技術名は自由に創作してください。

# ポイント
# 「自由に創作」でハルシネーションを意図的に誘発
# 3パターン = 多様な候補からベストを選ぶ
# system で「正確さ不要」を明示する
```


---

# UC2 — 歌詞・詩の生成

> *予測不能な言葉の連想が詩的表現の質を高める*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Music note decoration -->
<text x="60" y="90" fill="#f9a825" font-size="48" opacity="0.3">♪</text>
<text x="680" y="90" fill="#e91e63" font-size="48" opacity="0.3">♫</text>
<!-- Title -->
<text x="400" y="55" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">歌詞・詩の生成における「ハルシネーション活用」</text>
<!-- Flow: Emotion -> Metaphor -> Lyric -->
<rect x="50" y="110" width="180" height="90" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/>
<text x="140" y="145" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">感情テーマ</text>
<text x="140" y="168" text-anchor="middle" fill="#ffffff" font-size="12">孤独・喜び・怒り</text>
<text x="140" y="186" text-anchor="middle" fill="#9ca3af" font-size="11">= 詩の出発点</text>
<!-- Arrow -->
<line x1="232" y1="155" x2="265" y2="155" stroke="#6b7280" stroke-width="2"/>
<polygon points="263,149 275,155 263,161" fill="#6b7280"/>
<!-- Metaphor generation box -->
<rect x="277" y="110" width="230" height="90" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/>
<text x="392" y="140" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">LLMの詩的連想</text>
<text x="392" y="160" text-anchor="middle" fill="#ffffff" font-size="12">「太陽が泣いている」</text>
<text x="392" y="178" text-anchor="middle" fill="#ffffff" font-size="12">「コードが叫ぶ夜」</text>
<text x="392" y="195" text-anchor="middle" fill="#9ca3af" font-size="10">ハルシネーション的比喩が美しさを生む</text>
<!-- Arrow -->
<line x1="509" y1="155" x2="542" y2="155" stroke="#6b7280" stroke-width="2"/>
<polygon points="540,149 552,155 540,161" fill="#6b7280"/>
<!-- Lyric output -->
<rect x="554" y="110" width="210" height="90" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="659" y="140" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="bold">歌詞・詩の完成</text>
<text x="659" y="160" text-anchor="middle" fill="#ffffff" font-size="12">複数パターン生成</text>
<text x="659" y="178" text-anchor="middle" fill="#9ca3af" font-size="12">人間が選・磨く</text>
<!-- Temperature slider visualization -->
<text x="400" y="252" text-anchor="middle" fill="#9ca3af" font-size="13" font-weight="bold">推奨 temperature: 1.0〜1.3（高め）</text>
<rect x="100" y="262" width="600" height="16" fill="#374151" rx="8"/>
<rect x="100" y="262" width="480" height="16" fill="#e91e63" rx="8" opacity="0.6"/>
<circle cx="580" cy="270" r="12" fill="#f9a825" stroke="#ffffff" stroke-width="2"/>
<text x="100" y="298" fill="#9ca3af" font-size="11">0.2</text>
<text x="350" y="298" text-anchor="middle" fill="#9ca3af" font-size="11">1.0</text>
<text x="700" y="298" text-anchor="middle" fill="#9ca3af" font-size="11">2.0</text>
<!-- Key insight -->
<rect x="100" y="320" width="600" height="48" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="348" text-anchor="middle" fill="#f9a825" font-size="13">「音の連想」「感情の比喩」は — 事実と異なっていいからこそ美しい</text>
</svg>
- **活用場面**: リリック・ライティング、ポエトリー、コピーライティング
- 詩的表現では「事実と異なる比喩」こそが美しさを生む
- 「太陽が泣いている」→ ハルシネーション的発想が詩になる
- **韻・リズム重視** → モデルの「音の連想」を活かす
- **推奨 temperature**: 1.0〜1.3
- **レビュー必要度**: 低（感情・音感チェックのみ）


---

# プロンプト例: 歌詞ブレスト

- **目的**: 感情テーマから複数の歌詞スケッチを生成


---

# プロンプト例: 歌詞ブレスト（コード例）

```text
user: テーマ「孤独な深夜のデバッグ」で、
      J-ROCKっぽいサビ候補を5つ生成してください。

      条件:
      - 各サビは4行
      - 比喩・擬人化・造語を積極的に使う
      - 意外性のある表現を優先する
      - 「コード」「エラー」などIT用語OK
      - 押韻は厳密でなくてよい
```


---

# UC3 — ブレインストーミング支援

> *幻覚を使えば人間が思いつかない発想の種を大量に得られる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Center: LLM Brainstorm engine -->
<ellipse cx="400" cy="200" rx="90" ry="75" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
<text x="400" y="188" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">LLM</text>
<text x="400" y="208" text-anchor="middle" fill="#ffffff" font-size="12">ブレスト</text>
<text x="400" y="226" text-anchor="middle" fill="#9ca3af" font-size="11">エンジン</text>
<!-- Input: weird combos -->
<rect x="20" y="160" width="170" height="60" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="105" y="186" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">奇妙な組み合わせ</text>
<text x="105" y="206" text-anchor="middle" fill="#9ca3af" font-size="11">ピザ×ブロックチェーン×瞑想</text>
<line x1="192" y1="190" x2="308" y2="190" stroke="#e91e63" stroke-width="2" stroke-dasharray="5"/>
<polygon points="305,184 317,190 305,196" fill="#e91e63"/>
<!-- Output nodes: ideas -->
<rect x="520" y="60" width="160" height="52" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="82" text-anchor="middle" fill="#4ade80" font-size="12">アイデア候補 ×20</text>
<text x="600" y="100" text-anchor="middle" fill="#9ca3af" font-size="11">ありえないものも含む</text>
<line x1="492" y1="160" x2="522" y2="106" stroke="#4ade80" stroke-width="1.5" stroke-dasharray="4"/>
<polygon points="516,108 525,100 527,112" fill="#4ade80"/>
<rect x="520" y="150" width="160" height="52" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="172" text-anchor="middle" fill="#4ade80" font-size="12">多様な視点</text>
<text x="600" y="190" text-anchor="middle" fill="#9ca3af" font-size="11">予想外の連想</text>
<line x1="492" y1="190" x2="519" y2="176" stroke="#4ade80" stroke-width="1.5"/>
<polygon points="516,170 521,180 510,178" fill="#4ade80"/>
<rect x="520" y="240" width="160" height="52" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="262" text-anchor="middle" fill="#4ade80" font-size="12">突破口アイデア</text>
<text x="600" y="280" text-anchor="middle" fill="#9ca3af" font-size="11">「ありえない組み合わせ」</text>
<line x1="492" y1="220" x2="520" y2="267" stroke="#4ade80" stroke-width="1.5" stroke-dasharray="4"/>
<polygon points="515,264 523,272 526,260" fill="#4ade80"/>
<!-- Rule annotation -->
<rect x="20" y="300" width="460" height="48" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="250" y="322" text-anchor="middle" fill="#f9a825" font-size="13">ブレストのルール: 「批判しない」「量を重視」</text>
<text x="250" y="340" text-anchor="middle" fill="#9ca3af" font-size="12">LLMのハルシネーション = 訓練データの枠を超えた組み合わせ</text>
</svg>
- **活用場面**: 新機能アイデア・ビジネスモデル・問題解決策の発散
- ブレストのルール = **「批判しない」「量を重視」** → LLMと相性抜群
- 「ありえない組み合わせ」が突破口になることが多い
- ハルシネーション = 訓練データの枠を超えた組み合わせ
- **推奨 temperature**: 1.0〜1.4
- **レビュー必要度**: 高（実現可能性は人間が評価）


---

# プロンプト例: アイデア発散

- **目的**: 「ありえない視点」から新規サービスアイデアを生成


---

# プロンプト例: アイデア発散（コード例）

```text
user: 「宅配ピザ × ブロックチェーン × 瞑想アプリ」を
      組み合わせたサービスアイデアを10個出してください。

      ルール:
      - 実現可能性を一切考慮しない
      - 「こんなのあったら面白い」を優先
      - 各アイデアは1〜2行で端的に
      - 既存サービスの名前は出さない

# 「実現可能性を考慮しない」がキーワード
# LLMの制約を外してハルシネーションを促進する
```


---

# UC4 — 代替案・反論の生成

> *反論・代替案の自動生成が意思決定の盲点を照らし出す*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Your idea box -->
<rect x="30" y="80" width="200" height="100" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/>
<text x="130" y="115" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">あなたのアイデア</text>
<text x="130" y="138" text-anchor="middle" fill="#ffffff" font-size="12">技術選定・設計</text>
<text x="130" y="158" text-anchor="middle" fill="#9ca3af" font-size="11">新プロジェクト提案など</text>
<!-- Arrow to LLM devil's advocate -->
<line x1="232" y1="130" x2="280" y2="130" stroke="#e91e63" stroke-width="2"/>
<polygon points="278,124 290,130 278,136" fill="#e91e63"/>
<rect x="292" y="80" width="220" height="100" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="3"/>
<text x="402" y="110" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">悪魔の代弁者</text>
<text x="402" y="130" text-anchor="middle" fill="#ffffff" font-size="13">辛口シニアエンジニア</text>
<text x="402" y="150" text-anchor="middle" fill="#9ca3af" font-size="11">LLM (temp 0.8〜1.1)</text>
<text x="402" y="168" text-anchor="middle" fill="#9ca3af" font-size="11">「必ず問題点を指摘」</text>
<!-- Objections output -->
<line x1="514" y1="130" x2="556" y2="130" stroke="#6b7280" stroke-width="2"/>
<polygon points="554,124 566,130 554,136" fill="#6b7280"/>
<rect x="568" y="50" width="200" height="220" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="668" y="78" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">反論・懸念点リスト</text>
<text x="668" y="102" text-anchor="middle" fill="#9ca3af" font-size="12">技術的問題点</text>
<text x="668" y="122" text-anchor="middle" fill="#9ca3af" font-size="12">組織的懸念</text>
<text x="668" y="142" text-anchor="middle" fill="#9ca3af" font-size="12">コスト問題</text>
<text x="668" y="162" text-anchor="middle" fill="#9ca3af" font-size="12">スケール課題</text>
<text x="668" y="182" text-anchor="middle" fill="#9ca3af" font-size="12">... 10個以上</text>
<text x="668" y="220" text-anchor="middle" fill="#f9a825" font-size="11">誤った反論でも</text>
<text x="668" y="238" text-anchor="middle" fill="#f9a825" font-size="11">盲点発見になる</text>
<!-- Bottom insight -->
<rect x="30" y="310" width="720" height="50" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="333" text-anchor="middle" fill="#f9a825" font-size="13">「本当に間違った反論」でも — 思考の発散・盲点発見の記録になる</text>
<text x="400" y="351" text-anchor="middle" fill="#9ca3af" font-size="12">反論の妥当性は必ず人間が検証する（レビュー必要度: 高）</text>
</svg>
- **活用場面**: 設計レビュー前の「悪魔の代弁者」役
- 自分のアイデアの穴を事前に洗い出す用途
- LLMは「それらしい反論」を大量生成するのが得意
- 実際に間違った反論でも — 思考の発散・盲点発見になる
- **推奨 temperature**: 0.8〜1.1
- **レビュー必要度**: 高（反論の妥当性は必ず検証）


---

# プロンプト例: 反論マシン

- **目的**: 自分の技術選定に対する鋭い反論を生成


---

# プロンプト例: 反論マシン（コード例）

```text
system: あなたは辛口のシニアエンジニアです。
        どんな提案にも必ず問題点を指摘します。

user: 新しいマイクロサービスに
      「Go + gRPC + CockroachDB」を採用しようとしています。
      この構成への反論・懸念点を10個挙げてください。
      技術的・組織的・コスト面を混ぜてください。

# system で「辛口」ペルソナを設定
# LLMが「正しい回答」より「批判的な回答」を出すよう誘導
```


---

# UC5 — デバッグ仮説・エラー原因の発散

> *デバッグ仮説の発散生成で見落としていた原因を発見できる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Bug icon -->
<text x="60" y="80" fill="#e91e63" font-size="36">🐛</text>
<!-- Mystery bug box -->
<rect x="30" y="100" width="200" height="100" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="130" y="130" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">謎の不具合</text>
<text x="130" y="152" text-anchor="middle" fill="#ffffff" font-size="12">本番のみ発生</text>
<text x="130" y="170" text-anchor="middle" fill="#9ca3af" font-size="11">再現しない</text>
<text x="130" y="188" text-anchor="middle" fill="#9ca3af" font-size="11">週1回タイムアウト</text>
<!-- Arrow to LLM -->
<line x1="232" y1="150" x2="270" y2="150" stroke="#6b7280" stroke-width="2"/>
<polygon points="268,144 280,150 268,156" fill="#6b7280"/>
<!-- LLM hypothesis generator -->
<rect x="282" y="100" width="200" height="100" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="382" y="130" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">LLM仮説生成器</text>
<text x="382" y="152" text-anchor="middle" fill="#ffffff" font-size="12">ありえないものも含む</text>
<text x="382" y="170" text-anchor="middle" fill="#9ca3af" font-size="11">temp 0.7〜1.0</text>
<text x="382" y="188" text-anchor="middle" fill="#9ca3af" font-size="11">20個以上列挙</text>
<!-- Arrow -->
<line x1="484" y1="150" x2="522" y2="150" stroke="#6b7280" stroke-width="2"/>
<polygon points="520,144 532,150 520,156" fill="#6b7280"/>
<!-- Hypotheses -->
<rect x="534" y="30" width="240" height="280" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="654" y="58" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">仮説リスト (確率順)</text>
<text x="554" y="82" fill="#4ade80" font-size="12">1. コネクションプール枯渇 ★★★</text>
<text x="554" y="102" fill="#4ade80" font-size="12">2. GC pause タイムアウト ★★★</text>
<text x="554" y="122" fill="#facc15" font-size="12">3. DNS TTL期限切れ ★★</text>
<text x="554" y="142" fill="#facc15" font-size="12">4. ECS タスク入替 ★★</text>
<text x="554" y="162" fill="#9ca3af" font-size="12">5. 月次バッチとの競合 ★</text>
<text x="554" y="182" fill="#9ca3af" font-size="12">... 15個以上</text>
<text x="554" y="218" fill="#e91e63" font-size="11">誤り仮説も</text>
<text x="554" y="236" fill="#e91e63" font-size="11">「除外した記録」になる</text>
<text x="554" y="256" fill="#6b7280" font-size="11">→ 調査の優先順位づけに</text>
<!-- Bottom note -->
<text x="400" y="360" text-anchor="middle" fill="#9ca3af" font-size="12">各仮説は実測・ログで検証 — LLMが出した「ありえなさそうな原因」が突破口になることも</text>
</svg>
- **活用場面**: 再現しない不具合・謎のパフォーマンス劣化の原因探索
- 「何が原因か分からない」状態に対して仮説を大量生成
- LLMが「それらしい原因」を列挙 → 実際の調査の優先順位付けに
- 誤った仮説でも「この可能性は除外した」という記録になる
- **推奨 temperature**: 0.7〜1.0
- **レビュー必要度**: 中（各仮説は実測で検証）


---

# プロンプト例: バグの仮説生成

- **目的**: 再現しない「本番のみ」エラーの原因候補を洗い出す


---

# プロンプト例: バグの仮説生成（コード例）

```text
user: 本番環境でのみ、特定のAPIエンドポイントが
      週1回程度タイムアウトします。
      ローカル・ステージングでは一切再現しません。

      スタック: Node.js 20, PostgreSQL 15, AWS ECS

      考えられる原因を「ありえなさそうなものも含めて」
      20個列挙してください。確率順に並べてください。

# 「ありえなさそうなものも含めて」が重要
# ハルシネーション的な回答が盲点を突くことがある
```


---

# ユースケース比較表

- <svg viewBox="0 0 760 330" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="330" fill="#1e1e2e" rx="12"/>

<!-- Header row -->
<rect x="10" y="12" width="740" height="38" fill="#374151" rx="6"/>
<text x="88" y="35" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="bold">ユースケース</text>
<text x="270" y="35" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="bold">創造性レベル</text>
<text x="430" y="35" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="bold">推奨 temp</text>
<text x="578" y="35" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="bold">人間レビュー</text>
<text x="700" y="35" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="bold">リスク</text>

<!-- Row 1 -->
<rect x="10" y="54" width="740" height="48" fill="#1f2937" rx="4"/>
<text x="88" y="74" text-anchor="middle" fill="#60a5fa" font-size="13">📝 小説・フィクション</text>
<text x="88" y="92" text-anchor="middle" fill="#6b7280" font-size="11">書き出し・プロット</text>
<text x="270" y="82" text-anchor="middle" fill="#4ade80" font-size="18">★★★★</text>
<text x="430" y="82" text-anchor="middle" fill="#facc15" font-size="13">0.9〜1.2</text>
<text x="578" y="82" text-anchor="middle" fill="#4ade80" font-size="12">低（世界観一貫性）</text>
<text x="700" y="82" text-anchor="middle" fill="#4ade80" font-size="13">低</text>

<!-- Row 2 -->
<rect x="10" y="106" width="740" height="48" fill="#111827" rx="4"/>
<text x="88" y="126" text-anchor="middle" fill="#60a5fa" font-size="13">🎵 歌詞・詩</text>
<text x="88" y="144" text-anchor="middle" fill="#6b7280" font-size="11">リリック・コピー</text>
<text x="270" y="134" text-anchor="middle" fill="#4ade80" font-size="18">★★★★</text>
<text x="430" y="134" text-anchor="middle" fill="#facc15" font-size="13">1.0〜1.3</text>
<text x="578" y="134" text-anchor="middle" fill="#4ade80" font-size="12">低（音感チェック）</text>
<text x="700" y="134" text-anchor="middle" fill="#4ade80" font-size="13">低</text>

<!-- Row 3 -->
<rect x="10" y="158" width="740" height="48" fill="#1f2937" rx="4"/>
<text x="88" y="178" text-anchor="middle" fill="#60a5fa" font-size="13">💡 ブレスト</text>
<text x="88" y="196" text-anchor="middle" fill="#6b7280" font-size="11">アイデア発散</text>
<text x="270" y="186" text-anchor="middle" fill="#facc15" font-size="18">★★★</text>
<text x="430" y="186" text-anchor="middle" fill="#facc15" font-size="13">1.0〜1.4</text>
<text x="578" y="186" text-anchor="middle" fill="#facc15" font-size="12">高（実現可能性）</text>
<text x="700" y="186" text-anchor="middle" fill="#facc15" font-size="13">中</text>

<!-- Row 4 -->
<rect x="10" y="210" width="740" height="48" fill="#111827" rx="4"/>
<text x="88" y="230" text-anchor="middle" fill="#60a5fa" font-size="13">🔍 反論・代替案</text>
<text x="88" y="248" text-anchor="middle" fill="#6b7280" font-size="11">設計レビュー前</text>
<text x="270" y="238" text-anchor="middle" fill="#facc15" font-size="18">★★★</text>
<text x="430" y="238" text-anchor="middle" fill="#facc15" font-size="13">0.8〜1.1</text>
<text x="578" y="238" text-anchor="middle" fill="#f87171" font-size="12">高（妥当性検証）</text>
<text x="700" y="238" text-anchor="middle" fill="#facc15" font-size="13">中</text>

<!-- Row 5 -->
<rect x="10" y="262" width="740" height="48" fill="#1f2937" rx="4"/>
<text x="88" y="282" text-anchor="middle" fill="#60a5fa" font-size="13">🐛 デバッグ仮説</text>
<text x="88" y="300" text-anchor="middle" fill="#6b7280" font-size="11">バグ原因の発散</text>
<text x="270" y="290" text-anchor="middle" fill="#6b7280" font-size="18">★★</text>
<text x="430" y="290" text-anchor="middle" fill="#facc15" font-size="13">0.7〜1.0</text>
<text x="578" y="290" text-anchor="middle" fill="#facc15" font-size="12">中（実測検証）</text>
<text x="700" y="290" text-anchor="middle" fill="#facc15" font-size="13">中</text>
</svg>


---

<!-- _class: lead -->
# Part 4

- 実践テクニック


---

# temperature / top-p を操る

- <svg viewBox="0 0 760 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="300" fill="#1e1e2e" rx="12"/>

<!-- Left: temperature -->
<text x="190" y="32" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold">temperature</text>
<text x="190" y="50" text-anchor="middle" fill="#6b7280" font-size="11">分布全体のスケールを変える</text>

<!-- Low temp bar -->
<text x="55" y="82" fill="#4ade80" font-size="12" font-weight="bold">低 (0.2)</text>
<rect x="55" y="88" width="56" height="16" fill="#4ade80" rx="3"/>
<rect x="116" y="91" width="30" height="10" fill="#4ade80" opacity="0.5" rx="3"/>
<rect x="151" y="93" width="16" height="8" fill="#4ade80" opacity="0.3" rx="3"/>
<rect x="172" y="95" width="10" height="6" fill="#4ade80" opacity="0.2" rx="3"/>
<text x="230" y="100" fill="#6b7280" font-size="11">予測可能・収束的</text>

<!-- High temp bar -->
<text x="55" y="130" fill="#f87171" font-size="12" font-weight="bold">高 (1.5)</text>
<rect x="55" y="136" width="38" height="14" fill="#f87171" rx="3"/>
<rect x="98" y="136" width="34" height="14" fill="#f87171" opacity="0.9" rx="3"/>
<rect x="137" y="136" width="29" height="14" fill="#f87171" opacity="0.8" rx="3"/>
<rect x="171" y="136" width="24" height="14" fill="#f87171" opacity="0.7" rx="3"/>
<rect x="200" y="136" width="20" height="14" fill="#f87171" opacity="0.6" rx="3"/>
<rect x="225" y="136" width="16" height="14" fill="#f87171" opacity="0.5" rx="3"/>
<text x="250" y="148" fill="#6b7280" font-size="11">多様・ランダム・創造的</text>

<!-- Sweet spot -->
<rect x="45" y="168" width="300" height="30" fill="#374151" rx="6"/>
<text x="195" y="187" text-anchor="middle" fill="#facc15" font-size="12">🎯 創作向け推奨: temperature 0.9〜1.3</text>

<!-- Divider -->
<line x1="385" y1="20" x2="385" y2="275" stroke="#374151" stroke-width="1" stroke-dasharray="4"/>

<!-- Right: top-p -->
<text x="575" y="32" text-anchor="middle" fill="#a78bfa" font-size="15" font-weight="bold">top-p (nucleus sampling)</text>
<text x="575" y="50" text-anchor="middle" fill="#6b7280" font-size="11">累積確率でトークン候補を絞る</text>

<!-- Token probability bars -->
<text x="410" y="78" fill="#9ca3af" font-size="11">候補トークンを確率の高い順に並べると…</text>

<rect x="410" y="84" width="62" height="18" fill="#4ade80" rx="3"/>
<text x="441" y="97" text-anchor="middle" fill="#111" font-size="11" font-weight="bold">40%</text>

<rect x="477" y="84" width="50" height="18" fill="#4ade80" opacity="0.8" rx="3"/>
<text x="502" y="97" text-anchor="middle" fill="#111" font-size="11">30%</text>

<rect x="532" y="84" width="37" height="18" fill="#facc15" opacity="0.7" rx="3"/>
<text x="551" y="97" text-anchor="middle" fill="#111" font-size="10">20%</text>

<rect x="574" y="84" width="20" height="18" fill="#f87171" opacity="0.5" rx="3"/>
<text x="584" y="97" text-anchor="middle" fill="#fff" font-size="10">7%</text>

<rect x="599" y="84" width="10" height="18" fill="#f87171" opacity="0.3" rx="3"/>
<text x="604" y="97" text-anchor="middle" fill="#fff" font-size="10">3%</text>

<!-- top-p=0.9 line -->
<text x="410" y="124" fill="#60a5fa" font-size="11">top-p=0.9 → 累積90%まで使用</text>
<line x1="410" y1="128" x2="595" y2="128" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="3"/>
<line x1="592" y1="124" x2="592" y2="132" stroke="#60a5fa" stroke-width="2"/>
<text x="598" y="127" fill="#f87171" font-size="10">↑cut</text>

<!-- top-p=0.5 line -->
<text x="410" y="150" fill="#4ade80" font-size="11">top-p=0.5 → 累積50%まで使用（保守的）</text>
<line x1="410" y1="154" x2="480" y2="154" stroke="#4ade80" stroke-width="1.5" stroke-dasharray="3"/>
<line x1="477" y1="150" x2="477" y2="158" stroke="#4ade80" stroke-width="2"/>
<text x="483" y="153" fill="#f87171" font-size="10">↑cut</text>

<!-- Sweet spot -->
<rect x="400" y="168" width="340" height="30" fill="#374151" rx="6"/>
<text x="570" y="187" text-anchor="middle" fill="#facc15" font-size="12">🎯 創作向け推奨: top-p 0.90〜0.95</text>
</svg>


---

# 「正確さを求めない」プロンプト設計

> *「正確さを求めない」プロンプトが幻覚を意図的に引き出す鍵*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Left: Don't use -->
<rect x="20" y="30" width="360" height="340" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/>
<text x="200" y="62" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">❌ 通常プロンプト</text>
<text x="200" y="85" text-anchor="middle" fill="#9ca3af" font-size="12">「正確に」「事実に基づいて」</text>
<text x="200" y="108" text-anchor="middle" fill="#9ca3af" font-size="12">「根拠を示して」「確認してから」</text>
<rect x="50" y="130" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="200" y="156" text-anchor="middle" fill="#6b7280" font-size="12">→ 保守的・無難な回答が出る</text>
<rect x="50" y="185" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="200" y="211" text-anchor="middle" fill="#6b7280" font-size="12">→ 多様性が失われる</text>
<rect x="50" y="240" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="200" y="266" text-anchor="middle" fill="#6b7280" font-size="12">→ 創造性が抑制される</text>
<rect x="50" y="295" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="200" y="321" text-anchor="middle" fill="#e91e63" font-size="12">✗ 創作・ブレストには不向き</text>
<!-- Right: Use this -->
<rect x="420" y="30" width="360" height="340" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="62" text-anchor="middle" fill="#4ade80" font-size="15" font-weight="bold">✅ ハルシネーション活用</text>
<text x="600" y="85" text-anchor="middle" fill="#9ca3af" font-size="12">「自由に」「想像で」「大量に」</text>
<text x="600" y="108" text-anchor="middle" fill="#9ca3af" font-size="12">「ありえなくてもいい」「制約なし」</text>
<rect x="450" y="130" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="600" y="156" text-anchor="middle" fill="#f9a825" font-size="12">→ 多様なアイデアが生まれる</text>
<rect x="450" y="185" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="600" y="211" text-anchor="middle" fill="#f9a825" font-size="12">→ 意外性のある候補が出る</text>
<rect x="450" y="240" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="600" y="266" text-anchor="middle" fill="#f9a825" font-size="12">→ 盲点・突破口が見つかる</text>
<rect x="450" y="295" width="300" height="44" fill="#1f2937" rx="6"/>
<text x="600" y="321" text-anchor="middle" fill="#4ade80" font-size="12">✓ ブレスト・創作に最適</text>
</svg>
- 通常のプロンプト設計と**逆の発想**が必要
- ❌ 「正確に」「事実に基づいて」「根拠を示して」
- ✅ 「自由に」「想像で」「ありえなくてもいい」「大量に」
- **「制約を外す言葉」がハルシネーションのスイッチ**
- モデルに「創作モード」を明示することが最重要


---

# パターン1 — 制約を外す

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="48" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">パターン1: 制約を外す</text>
<!-- Before box -->
<rect x="30" y="80" width="340" height="160" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/>
<text x="200" y="108" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">❌ 制約あり（通常）</text>
<text x="60" y="135" fill="#9ca3af" font-size="12">「新しいSNSのアイデアを」</text>
<text x="60" y="158" fill="#9ca3af" font-size="12">「実現可能で市場性のある」</text>
<text x="60" y="181" fill="#9ca3af" font-size="12">「ものを教えてください」</text>
<rect x="50" y="198" width="300" height="28" fill="#374151" rx="4"/>
<text x="200" y="217" text-anchor="middle" fill="#6b7280" font-size="12">→ 無難な3〜5案が出るだけ</text>
<!-- Arrow -->
<line x1="372" y1="160" x2="424" y2="160" stroke="#6b7280" stroke-width="2"/>
<polygon points="422,154 434,160 422,166" fill="#6b7280"/>
<text x="398" y="148" text-anchor="middle" fill="#f9a825" font-size="11">逆転</text>
<!-- After box -->
<rect x="436" y="80" width="340" height="160" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="606" y="108" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">✅ 制約を外す</text>
<text x="466" y="135" fill="#9ca3af" font-size="12">「実現不可能でもOK」</text>
<text x="466" y="158" fill="#9ca3af" font-size="12">「法律・倫理・技術制約は無視」</text>
<text x="466" y="181" fill="#9ca3af" font-size="12">「20個、とにかく面白さ優先」</text>
<rect x="456" y="198" width="300" height="28" fill="#374151" rx="4"/>
<text x="606" y="217" text-anchor="middle" fill="#4ade80" font-size="12">→ 突破口になる案が混じる</text>
<!-- Bottom insight -->
<rect x="100" y="290" width="600" height="68" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="318" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">「制約を外す言葉」がハルシネーションのスイッチ</text>
<text x="400" y="342" text-anchor="middle" fill="#9ca3af" font-size="12">LLMの「保守的な回答」を回避 → 創造的アウトプットへ</text>
</svg>
- **目的**: LLMの「保守的な回答」を回避する


---

# パターン1 — 制約を外す（コード例）

```bash
# ❌ 通常プロンプト → 無難なアイデアが出る
「新しいSNSのアイデアを教えてください。
 実現可能で市場性のあるものを」

# ✅ ハルシネーション活用プロンプト
「新しいSNSのアイデアを20個出してください。
 - 実現不可能でもOK
 - 法律・倫理・技術的制約は無視してください
 - 現実に存在しない技術を使ってもOK
 - とにかく面白さ優先"
# → 思わぬ組み合わせが突破口になることがある
```


---

# パターン2 — 多様性を引き出す

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="48" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold">パターン2: 多様性を引き出す</text>
<!-- Without diversity forcing -->
<rect x="30" y="75" width="340" height="140" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/>
<text x="200" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">❌ 多様性指定なし</text>
<text x="60" y="125" fill="#9ca3af" font-size="12">「睡眠改善アプリの機能を10個」</text>
<rect x="50" y="140" width="300" height="24" fill="#374151" rx="4"/>
<text x="200" y="157" text-anchor="middle" fill="#6b7280" font-size="11">→ 似たアイデアのループ</text>
<rect x="50" y="170" width="300" height="24" fill="#374151" rx="4"/>
<text x="200" y="187" text-anchor="middle" fill="#6b7280" font-size="11">→ 同じターゲット層向け</text>
<!-- With diversity forcing -->
<rect x="430" y="75" width="340" height="140" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="100" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="bold">✅ 多様性を強制</text>
<text x="460" y="125" fill="#9ca3af" font-size="11">各アイデアは異なるターゲット層</text>
<text x="460" y="145" fill="#9ca3af" font-size="11">技術スタックを重複させない</text>
<text x="460" y="165" fill="#9ca3af" font-size="11">SF・ローテク・子ども向けを含める</text>
<rect x="450" y="178" width="300" height="24" fill="#374151" rx="4"/>
<text x="600" y="195" text-anchor="middle" fill="#4ade80" font-size="11">→ 収束を防ぎ多彩な案が出る</text>
<!-- Arrow between -->
<line x1="372" y1="145" x2="428" y2="145" stroke="#6b7280" stroke-width="2"/>
<polygon points="426,139 438,145 426,151" fill="#6b7280"/>
<!-- Bottom: Diversity dimensions -->
<text x="400" y="262" text-anchor="middle" fill="#9ca3af" font-size="13" font-weight="bold">多様性の強制軸</text>
<rect x="30" y="275" width="180" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="120" y="302" text-anchor="middle" fill="#f9a825" font-size="13">ターゲット層</text>
<text x="120" y="322" text-anchor="middle" fill="#9ca3af" font-size="11">子ども/高齢者/プロ</text>
<text x="120" y="340" text-anchor="middle" fill="#9ca3af" font-size="11">ペルソナを分散</text>
<rect x="230" y="275" width="180" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="320" y="302" text-anchor="middle" fill="#f9a825" font-size="13">技術スタック</text>
<text x="320" y="322" text-anchor="middle" fill="#9ca3af" font-size="11">SF/ハイテク/ローテク</text>
<text x="320" y="340" text-anchor="middle" fill="#9ca3af" font-size="11">スタックを重複禁止</text>
<rect x="430" y="275" width="180" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="520" y="302" text-anchor="middle" fill="#f9a825" font-size="13">状況・場面</text>
<text x="520" y="322" text-anchor="middle" fill="#9ca3af" font-size="11">平日朝/深夜/通勤中</text>
<text x="520" y="340" text-anchor="middle" fill="#9ca3af" font-size="11">シーンで分散</text>
<rect x="630" y="275" width="140" height="80" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="700" y="302" text-anchor="middle" fill="#f9a825" font-size="13">感情状態</text>
<text x="700" y="322" text-anchor="middle" fill="#9ca3af" font-size="11">不安/楽観/疲弊</text>
<text x="700" y="340" text-anchor="middle" fill="#9ca3af" font-size="11">感情で分散</text>
</svg>
- **目的**: 類似した回答のループを防ぐ


---

# パターン2 — 多様性を引き出す（コード例）

```bash
# 多様性強制テクニック
user: 「睡眠改善アプリ」のユニークな機能を10個。

      制約:
      - 各アイデアは異なるターゲット層に向ける
      - アイデア間で技術スタックを重複させない
      - 1つはSFっぽい、1つは超ローテク、
        1つは子ども向け、1つは高齢者向けを含める

# 「異なる〇〇に向ける」で多様性を強制
# ペルソナ・状況を分けることで収束を防ぐ
```


---

# 出力の評価とフィルタリング

- <svg viewBox="0 0 760 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="220" fill="#1e1e2e" rx="12"/>

<!-- Step 1: Generate -->
<rect x="20" y="60" width="120" height="70" fill="#4c1d95" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5))"/>
<text x="80" y="88" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">Step 1</text>
<text x="80" y="104" text-anchor="middle" fill="#e5e7eb" font-size="11">LLMが生成</text>
<text x="80" y="120" text-anchor="middle" fill="#9ca3af" font-size="10">20〜30個</text>
<text x="80" y="145" text-anchor="middle" fill="#a78bfa" font-size="11">⚙️ LLM</text>

<!-- Arrow -->
<line x1="142" y1="95" x2="168" y2="95" stroke="#6b7280" stroke-width="2"/>
<polygon points="166,90 176,95 166,100" fill="#6b7280"/>

<!-- Step 2: Pool -->
<rect x="178" y="60" width="120" height="70" fill="#1f2937" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))"/>
<text x="238" y="88" text-anchor="middle" fill="#9ca3af" font-size="12" font-weight="bold">Step 2</text>
<text x="238" y="104" text-anchor="middle" fill="#e5e7eb" font-size="11">アイデアプール</text>
<text x="238" y="120" text-anchor="middle" fill="#facc15" font-size="10">多様な候補が揃う</text>
<text x="238" y="145" text-anchor="middle" fill="#6b7280" font-size="11">📦 大量生成</text>

<!-- Arrow -->
<line x1="300" y1="95" x2="326" y2="95" stroke="#6b7280" stroke-width="2"/>
<polygon points="324,90 334,95 324,100" fill="#6b7280"/>

<!-- Step 3: Human Filter -->
<rect x="336" y="60" width="120" height="70" fill="#14532d" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5))"/>
<text x="396" y="88" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="bold">Step 3</text>
<text x="396" y="104" text-anchor="middle" fill="#e5e7eb" font-size="11">人間がキュレーション</text>
<text x="396" y="120" text-anchor="middle" fill="#9ca3af" font-size="10">直感で3〜5個選ぶ</text>
<text x="396" y="145" text-anchor="middle" fill="#4ade80" font-size="11">👤 Human</text>

<!-- Arrow -->
<line x1="458" y1="95" x2="484" y2="95" stroke="#6b7280" stroke-width="2"/>
<polygon points="482,90 492,95 482,100" fill="#6b7280"/>

<!-- Step 4: Selected -->
<rect x="494" y="60" width="120" height="70" fill="#1f2937" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))"/>
<text x="554" y="88" text-anchor="middle" fill="#9ca3af" font-size="12" font-weight="bold">Step 4</text>
<text x="554" y="104" text-anchor="middle" fill="#e5e7eb" font-size="11">選定アイデア</text>
<text x="554" y="120" text-anchor="middle" fill="#facc15" font-size="10">価値ある候補</text>
<text x="554" y="145" text-anchor="middle" fill="#6b7280" font-size="11">✅ 厳選</text>

<!-- Arrow -->
<line x1="616" y1="95" x2="642" y2="95" stroke="#6b7280" stroke-width="2"/>
<polygon points="640,90 650,95 640,100" fill="#6b7280"/>

<!-- Step 5: Deep Dive -->
<rect x="652" y="60" width="100" height="70" fill="#4c1d95" rx="8" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5))"/>
<text x="702" y="88" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">Step 5</text>
<text x="702" y="104" text-anchor="middle" fill="#e5e7eb" font-size="11">LLMで深掘り</text>
<text x="702" y="120" text-anchor="middle" fill="#9ca3af" font-size="10">洗練・展開</text>
<text x="702" y="145" text-anchor="middle" fill="#a78bfa" font-size="11">⚙️ LLM</text>

<!-- Role labels -->
<text x="80" y="195" text-anchor="middle" fill="#a78bfa" font-size="11">LLMが発散</text>
<text x="396" y="195" text-anchor="middle" fill="#4ade80" font-size="11">人間が収束</text>
<text x="702" y="195" text-anchor="middle" fill="#a78bfa" font-size="11">LLMが深化</text>
</svg>
- LLM = **発散**、人間 = **収束** の役割分担


---

<!-- _class: lead -->
# ライブデモ: ブレストセッション

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="44" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">ライブデモ: ブレストセッション</text>
<!-- Large interactive icon -->
<ellipse cx="400" cy="185" rx="120" ry="100" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
<text x="400" y="170" text-anchor="middle" fill="#f9a825" font-size="48">🎯</text>
<text x="400" y="218" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">参加者のお題を募集</text>
<!-- Instruction cards -->
<rect x="30" y="310" width="220" height="66" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="140" y="336" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Step 1</text>
<text x="140" y="356" text-anchor="middle" fill="#9ca3af" font-size="12">お題を出してください</text>
<rect x="290" y="310" width="220" height="66" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="400" y="336" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Step 2</text>
<text x="400" y="356" text-anchor="middle" fill="#9ca3af" font-size="12">LLMでブレスト実演</text>
<rect x="550" y="310" width="220" height="66" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="660" y="336" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="bold">Step 3</text>
<text x="660" y="356" text-anchor="middle" fill="#9ca3af" font-size="12">出力をみんなで評価</text>
</svg>
- ここで実際にブレストをやってみましょう
- 参加者のお題を募集します


---

<!-- _class: lead -->
# Part 5

- リスクと限界


---

# 使うべきでないシーン

> *事実・法律・医療・数値など検証必須の領域では幻覚は有害*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="44" text-anchor="middle" fill="#e91e63" font-size="18" font-weight="bold">⚠️ ハルシネーション活用 禁止ゾーン</text>
<!-- Warning grid 2x3 -->
<rect x="20" y="65" width="230" height="90" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="135" y="95" text-anchor="middle" fill="#e91e63" font-size="24">🏥</text>
<text x="135" y="118" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">医療・法律・財務</text>
<text x="135" y="138" text-anchor="middle" fill="#9ca3af" font-size="11">誤情報が命取りになりうる</text>
<rect x="285" y="65" width="230" height="90" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="400" y="95" text-anchor="middle" fill="#e91e63" font-size="24">📖</text>
<text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">技術文書・API仕様</text>
<text x="400" y="138" text-anchor="middle" fill="#9ca3af" font-size="11">静かに誤情報が混入する</text>
<rect x="550" y="65" width="230" height="90" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="665" y="95" text-anchor="middle" fill="#e91e63" font-size="24">📚</text>
<text x="665" y="118" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">引用・参考文献</text>
<text x="665" y="138" text-anchor="middle" fill="#9ca3af" font-size="11">存在しない論文を引用しがち</text>
<rect x="20" y="175" width="230" height="90" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="135" y="205" text-anchor="middle" fill="#e91e63" font-size="24">🔐</text>
<text x="135" y="228" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">セキュリティ設定</text>
<text x="135" y="248" text-anchor="middle" fill="#9ca3af" font-size="11">誤りがバグ・脆弱性に直結</text>
<rect x="285" y="175" width="230" height="90" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="2"/>
<text x="400" y="205" text-anchor="middle" fill="#e91e63" font-size="24">📰</text>
<text x="400" y="228" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">ニュース・ファクトチェック</text>
<text x="400" y="248" text-anchor="middle" fill="#9ca3af" font-size="11">情報源の検証が必須</text>
<rect x="550" y="175" width="230" height="90" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="2"/>
<text x="665" y="205" text-anchor="middle" fill="#f9a825" font-size="24">✓</text>
<text x="665" y="228" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">創作・ブレスト</text>
<text x="665" y="248" text-anchor="middle" fill="#4ade80" font-size="11">ここだけOK</text>
<!-- Bottom rule -->
<rect x="100" y="296" width="600" height="64" fill="#16213e" rx="8" stroke="#e91e63" stroke-width="1.5"/>
<text x="400" y="322" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">大原則: 正確さが必要な領域にはハルシネーションを持ち込まない</text>
<text x="400" y="348" text-anchor="middle" fill="#9ca3af" font-size="12">「使えるアイデア」と「事実として使う情報」を明確に分ける</text>
</svg>
- ⚠️ **医療・法律・財務アドバイス** — 誤情報が命取りになりうる
- ⚠️ **技術文書・API仕様の作成** — ハルシネーションが静かに混入する
- ⚠️ **引用・参考文献の自動生成** — 存在しない論文を引用しがち
- ⚠️ **セキュリティ設定・認証コード** — 誤りがバグ・脆弱性に直結
- ⚠️ **ニュース・ファクトチェックが必要な情報** — 情報源検証が必須


---

# 事実確認が必要な領域

> *事実確認が必要な領域での幻覚は信頼損失と法的リスクを生む*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="44" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">事実確認チェックリスト — ハルシネーション活用後に必須</text>
<!-- Items with check boxes -->
<rect x="40" y="68" width="720" height="48" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1.5"/>
<text x="70" y="97" fill="#e91e63" font-size="20">!</text>
<text x="110" y="92" fill="#ffffff" font-size="13" font-weight="bold">数値・統計データ</text>
<text x="110" y="108" fill="#9ca3af" font-size="12">LLMは「それらしい数字」を作ることがある → 必ず一次ソースで確認</text>
<rect x="40" y="126" width="720" height="48" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1.5"/>
<text x="70" y="155" fill="#e91e63" font-size="20">!</text>
<text x="110" y="150" fill="#ffffff" font-size="13" font-weight="bold">人名・組織名・製品名</text>
<text x="110" y="166" fill="#9ca3af" font-size="12">架空のものが混入しやすい → 実在確認必須</text>
<rect x="40" y="184" width="720" height="48" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/>
<text x="70" y="213" fill="#f9a825" font-size="20">!</text>
<text x="110" y="208" fill="#ffffff" font-size="13" font-weight="bold">API・ライブラリのバージョン</text>
<text x="110" y="224" fill="#9ca3af" font-size="12">ドキュメントで必ず確認 → 存在しないメソッドが生成されることがある</text>
<rect x="40" y="242" width="720" height="48" fill="#16213e" rx="6" stroke="#f9a825" stroke-width="1.5"/>
<text x="70" y="271" fill="#f9a825" font-size="20">!</text>
<text x="110" y="266" fill="#ffffff" font-size="13" font-weight="bold">歴史的事実・年号</text>
<text x="110" y="282" fill="#9ca3af" font-size="12">創作ではOK → 事実として使う場合は要確認</text>
<rect x="40" y="300" width="720" height="72" fill="#16213e" rx="8" stroke="#4ade80" stroke-width="2"/>
<text x="400" y="328" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">黄金ルール</text>
<text x="400" y="352" text-anchor="middle" fill="#ffffff" font-size="13">「アイデア・インスピレーション」として使う ≠ 「事実」として使う</text>
</svg>
- ハルシネーション活用後も**人間による検証が必須**な項目
- 数値・統計データ（LLMは「それらしい数字」を作ることがある）
- 人名・組織名・製品名（架空のものが混入する）
- APIの使い方・ライブラリのバージョン（ドキュメントで必ず確認）
- 歴史的事実・年号（創作ではOKでも事実として使う場合は要確認）
- **ルール**: 「使えるアイデア」と「事実として使う情報」を明確に分ける


---

# 創造性 vs 信頼性のトレードオフ

- <svg viewBox="0 0 760 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="760" height="320" fill="#1e1e2e" rx="12"/>

<!-- Y axis -->
<line x1="80" y1="260" x2="700" y2="260" stroke="#4b5563" stroke-width="2"/>
<line x1="80" y1="260" x2="80" y2="28" stroke="#4b5563" stroke-width="2"/>
<polygon points="695,255 705,260 695,265" fill="#4b5563"/>
<polygon points="75,32 80,22 85,32" fill="#4b5563"/>

<!-- Axis labels -->
<text x="390" y="290" text-anchor="middle" fill="#9ca3af" font-size="13">temperature（創造性/ランダム性）</text>
<text x="28" y="145" text-anchor="middle" fill="#9ca3af" font-size="13" transform="rotate(-90 28 145)">信頼性・正確さ</text>

<!-- Tick marks -->
<text x="148" y="275" text-anchor="middle" fill="#6b7280" font-size="11">0.2</text>
<text x="280" y="275" text-anchor="middle" fill="#6b7280" font-size="11">0.7</text>
<text x="420" y="275" text-anchor="middle" fill="#6b7280" font-size="11">1.0</text>
<text x="570" y="275" text-anchor="middle" fill="#6b7280" font-size="11">1.5</text>

<!-- Reliability curve (decreasing): simple cubic-like curve -->
<path d="M 100 50 C 200 58, 310 110, 420 185 S 580 248 680 258" fill="none" stroke="#4ade80" stroke-width="3"/>

<!-- Creativity curve (increasing) -->
<path d="M 100 258 C 200 252, 320 230, 420 185 S 570 100 680 42" fill="none" stroke="#f87171" stroke-width="3"/>

<!-- Intersection point marker -->
<circle cx="420" cy="185" r="7" fill="#facc15" style="filter:drop-shadow(0 0 6px rgba(250,204,21,0.7))"/>

<!-- Sweet spot box -->
<rect x="355" y="155" width="150" height="55" fill="#374151" rx="8" opacity="0.95" style="filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5))"/>
<text x="430" y="178" text-anchor="middle" fill="#facc15" font-size="12" font-weight="bold">🎯 スイートスポット</text>
<text x="430" y="196" text-anchor="middle" fill="#facc15" font-size="12" font-weight="bold">temp 0.9〜1.3</text>

<!-- Zone labels -->
<rect x="90" y="34" width="120" height="44" fill="#1f2937" rx="6" opacity="0.9"/>
<text x="150" y="54" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="bold">事実確認用途</text>
<text x="150" y="70" text-anchor="middle" fill="#6b7280" font-size="11">RAG・技術文書</text>

<rect x="558" y="26" width="130" height="44" fill="#1f2937" rx="6" opacity="0.9"/>
<text x="623" y="46" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold">創作・ブレスト</text>
<text x="623" y="62" text-anchor="middle" fill="#6b7280" font-size="11">小説・歌詞・発散</text>

<!-- Vertical dashed line at sweet spot -->
<line x1="420" y1="150" x2="420" y2="260" stroke="#facc15" stroke-width="1" stroke-dasharray="5"/>

<!-- Legend -->
<line x1="90" y1="308" x2="120" y2="308" stroke="#4ade80" stroke-width="3"/>
<text x="125" y="312" fill="#4ade80" font-size="12">信頼性</text>
<line x1="200" y1="308" x2="230" y2="308" stroke="#f87171" stroke-width="3"/>
<text x="235" y="312" fill="#f87171" font-size="12">創造性</text>
</svg>


---

# 人間のキュレーションが不可欠

> *AIの出力は人間が選別・検証してこそ価値になる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Role division -->
<rect x="20" y="30" width="360" height="300" fill="#16213e" rx="12" stroke="#e91e63" stroke-width="2"/>
<text x="200" y="65" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold">🤖 LLM の役割</text>
<text x="200" y="95" text-anchor="middle" fill="#f9a825" font-size="14">発散フェーズ</text>
<text x="200" y="122" text-anchor="middle" fill="#ffffff" font-size="13">多様なドラフトを大量生成</text>
<text x="200" y="148" text-anchor="middle" fill="#9ca3af" font-size="12">20〜50個のアイデア候補</text>
<text x="200" y="172" text-anchor="middle" fill="#9ca3af" font-size="12">ありえないものも含めて</text>
<text x="200" y="196" text-anchor="middle" fill="#9ca3af" font-size="12">意外な組み合わせを提示</text>
<rect x="60" y="220" width="240" height="40" fill="#374151" rx="6"/>
<text x="180" y="245" text-anchor="middle" fill="#e91e63" font-size="12">最終責任なし — あくまでアシスタント</text>
<rect x="420" y="30" width="360" height="300" fill="#16213e" rx="12" stroke="#4ade80" stroke-width="2"/>
<text x="600" y="65" text-anchor="middle" fill="#4ade80" font-size="16" font-weight="bold">👤 人間の役割</text>
<text x="600" y="95" text-anchor="middle" fill="#f9a825" font-size="14">収束フェーズ</text>
<text x="600" y="122" text-anchor="middle" fill="#ffffff" font-size="13">価値を見極め磨き上げる</text>
<text x="600" y="148" text-anchor="middle" fill="#9ca3af" font-size="12">3〜5個に厳選</text>
<text x="600" y="172" text-anchor="middle" fill="#9ca3af" font-size="12">品質・倫理・事実の検証</text>
<text x="600" y="196" text-anchor="middle" fill="#9ca3af" font-size="12">最終判断・磨き上げ</text>
<rect x="460" y="220" width="240" height="40" fill="#374151" rx="6"/>
<text x="580" y="245" text-anchor="middle" fill="#4ade80" font-size="12">最終責任あり — アウトプットの主体</text>
<!-- Center arrow both ways -->
<line x1="382" y1="180" x2="418" y2="180" stroke="#f9a825" stroke-width="3"/>
<polygon points="415,174 427,180 415,186" fill="#f9a825"/>
<line x1="418" y1="200" x2="382" y2="200" stroke="#f9a825" stroke-width="3"/>
<polygon points="385,194 373,200 385,206" fill="#f9a825"/>
<!-- Bottom note -->
<rect x="100" y="348" width="600" height="38" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="371" text-anchor="middle" fill="#f9a825" font-size="13">「創造性の民主化」であって「人間の代替」ではない</text>
</svg>
- ハルシネーション活用はあくまで**インプット拡張の手段**
- LLM = **多様なドラフトを大量生成するアシスタント**
- 人間 = **価値を見極め、磨き上げるエディター**
- 「創造性の民主化」であって「人間の代替」ではない
- 最終的なアウトプットの責任は**常に人間**にある


---

<!-- _class: lead -->
# Part 6

- まとめ


---

<!-- _class: lead -->
# ハルシネーションは「道具」である

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<!-- Large tool metaphor -->
<text x="400" y="100" text-anchor="middle" fill="#f9a825" font-size="64">🔧</text>
<text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold">ハルシネーションは「道具」</text>
<!-- Three properties -->
<rect x="40" y="195" width="215" height="100" fill="#16213e" rx="10" stroke="#f9a825" stroke-width="2"/>
<text x="148" y="228" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">特性</text>
<text x="148" y="252" text-anchor="middle" fill="#ffffff" font-size="13">バグではなく特性</text>
<text x="148" y="272" text-anchor="middle" fill="#9ca3af" font-size="12">使いこなすもの</text>
<rect x="295" y="195" width="215" height="100" fill="#16213e" rx="10" stroke="#e91e63" stroke-width="2"/>
<text x="403" y="228" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">用途選別</text>
<text x="403" y="252" text-anchor="middle" fill="#ffffff" font-size="13">正確さが不要な場面</text>
<text x="403" y="272" text-anchor="middle" fill="#9ca3af" font-size="12">創作・ブレストに限る</text>
<rect x="550" y="195" width="210" height="100" fill="#16213e" rx="10" stroke="#4ade80" stroke-width="2"/>
<text x="655" y="228" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">強み</text>
<text x="655" y="252" text-anchor="middle" fill="#ffffff" font-size="13">発散・多様性・量産</text>
<text x="655" y="272" text-anchor="middle" fill="#9ca3af" font-size="12">意外性のある候補</text>
<!-- Bottom -->
<rect x="150" y="325" width="500" height="44" fill="#16213e" rx="8" stroke="#f9a825" stroke-width="1.5"/>
<text x="400" y="352" text-anchor="middle" fill="#f9a825" font-size="14">キーワード: 発散・多様性・意外性・ドラフト量産</text>
</svg>
- バグでも欠陥でもなく — **特性**として使いこなす
- 正確さが不要な場面では、むしろ「強み」
- キーワード: 発散・多様性・意外性・ドラフト量産


---

# 今日から使えるチェックリスト（1/2）

> *用途別パラメータを事前設定すると再現性が高まる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
<rect width="800" height="400" fill="#1a1a2e" rx="12"/>
<text x="400" y="40" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">ハルシネーション活用 実践チェックリスト</text>
<!-- Steps as timeline -->
<line x1="80" y1="80" x2="80" y2="370" stroke="#f9a825" stroke-width="2" stroke-dasharray="6"/>
<circle cx="80" cy="100" r="14" fill="#f9a825"/>
<text x="80" y="105" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">1</text>
<text x="110" y="98" fill="#ffffff" font-size="13" font-weight="bold">用途確認: 「正確さが不要」か？</text>
<text x="110" y="116" fill="#9ca3af" font-size="12">YES → 続ける / NO → 通常のプロンプトへ</text>
<circle cx="80" cy="150" r="14" fill="#e91e63"/>
<text x="80" y="155" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">2</text>
<text x="110" y="148" fill="#ffffff" font-size="13" font-weight="bold">temperature を 0.9〜1.3 に設定</text>
<text x="110" y="166" fill="#9ca3af" font-size="12">top-p は 0.90〜0.95 を推奨</text>
<circle cx="80" cy="200" r="14" fill="#e91e63"/>
<text x="80" y="205" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">3</text>
<text x="110" y="198" fill="#ffffff" font-size="13" font-weight="bold">プロンプトに「自由に」「ありえなくてもOK」を追加</text>
<text x="110" y="216" fill="#9ca3af" font-size="12">制約を外す言葉がハルシネーションのスイッチ</text>
<circle cx="80" cy="250" r="14" fill="#e91e63"/>
<text x="80" y="255" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">4</text>
<text x="110" y="248" fill="#ffffff" font-size="13" font-weight="bold">一度に 10〜20個以上生成（量が命）</text>
<text x="110" y="266" fill="#9ca3af" font-size="12">多様性の強制軸を追加するとさらに効果的</text>
<circle cx="80" cy="300" r="14" fill="#4ade80"/>
<text x="80" y="305" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">5</text>
<text x="110" y="298" fill="#ffffff" font-size="13" font-weight="bold">出力から「面白いもの」を人間が選ぶ</text>
<text x="110" y="316" fill="#9ca3af" font-size="12">直感で3〜5個を厳選</text>
<circle cx="80" cy="350" r="14" fill="#4ade80"/>
<text x="80" y="355" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">6</text>
<text x="110" y="348" fill="#ffffff" font-size="13" font-weight="bold">選んだアイデアを深掘り &amp; 事実情報は別途検証</text>
<text x="110" y="366" fill="#9ca3af" font-size="12">深掘りはLLMで / 事実確認は一次ソースで</text>
</svg>
- [ ] 用途を確認: 「正確さが不要」か？
- [ ] temperature を 0.9〜1.3 に設定する
- [ ] プロンプトに「自由に」「ありえなくてもOK」を追加


---

# 今日から使えるチェックリスト（2/2）

> *チェックリストを持つことで幻覚活用と事実確認を使い分けられる*

- [ ] 一度に 10〜20個以上生成する（量が命）
- [ ] 出力から「面白いもの」を人間が選ぶ
- [ ] 選んだアイデアをさらに深掘りする（別プロンプトで）
- [ ] 事実として使う情報は別途検証する


---

# 参考リンク（1/2）

> *幻覚研究の最前線は「制御可能な創造性」の実現を目指している*

- **研究・論文:**
- [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
- [Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629)
- [TruthfulQA: Measuring How Models Mimic Human Falsehoods](https://arxiv.org/abs/2109.07958)
- **技術ドキュメント:**
- [OpenAI API: Temperature parameter](https://platform.openai.com/docs/api-reference/chat)
- [Anthropic: Claude API Reference](https://docs.anthropic.com/)


---

# 参考リンク（2/2）  / Q&A（1/2）

> *質疑応答で理解を深め実務への適用を具体化する*

- **実践ガイド:**
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Lil'Log: Hallucination in Large Language Models](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
- **ツール・ライブラリ:**


---

# 参考リンク（2/2）  / Q&A（2/2）

> *持ち帰るべき問いは「自分の業務のどこに幻覚が使えるか」だ*

- [LangChain](https://www.langchain.com/) — プロンプト管理・チェーン構築
- [Guidance (guidance-ai)](https://github.com/guidance-ai/guidance) — 出力の構造化・制御
- ---
- **Q&A — ご質問をどうぞ！**

