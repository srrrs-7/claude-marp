---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "時間の物理学"
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
  
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# 「時間」は存在しないか
— 物理学が語る時間の正体

- 過去・現在・未来は幻想かもしれない
- 熱力学・相対性理論・量子力学が示す時間の奇妙な性質
- 「今この瞬間」は物理的に定義できない


---

# アジェンダ

> *物理学の全理論が「時間は幻想かもしれない」と示唆する*

- 1. 時間の矢：なぜ過去と未来は違うのか
- 2. アインシュタインの相対性理論と時間
- 3. 熱力学とエントロピー
- 4. 量子力学における時間
- 5. 「現在」は存在するのか


---

<!-- _class: lead -->
# 時間の矢


---

# 物理法則に時間の方向はない（1/2）

> *物理法則はt→-t対称で「過去→未来」を区別しない*

- **物理法則の時間対称性：**
- ニュートン力学・量子力学・相対性理論
- → いずれも時間を逆転させても同じ式が成立する
- = 物理法則は「過去→未来」を特別扱いしない
- **では「時間の矢」はどこから来るか？**
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold" font-family="sans-serif">物理法則の時間対称性</text><rect x="60" y="60" width="200" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="160" y="85" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">ニュートン力学</text><text x="160" y="105" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">F=ma (t→-t で不変)</text><rect x="300" y="60" width="200" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="85" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">量子力学</text><text x="400" y="105" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">シュレーディンガー方程式</text><rect x="540" y="60" width="200" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="640" y="85" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">相対性理論</text><text x="640" y="105" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">ローレンツ変換</text><line x1="400" y1="120" x2="400" y2="160" stroke="#e91e63" stroke-width="2"/><polygon points="395,155 405,155 400,165" fill="#e91e63"/><rect x="200" y="165" width="400" height="50" rx="8" fill="#e91e63" fill-opacity="0.2" stroke="#e91e63" stroke-width="2"/><text x="400" y="187" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif" font-weight="bold">すべて時間逆転対称 (T対称)</text><text x="400" y="207" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">t → -t としても方程式は変わらない</text><text x="400" y="255" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">∴ 物理法則に「過去」「未来」の区別はない</text></svg>


---

# 物理法則に時間の方向はない（2/2）

> *エントロピー増大だけが時間の矢の唯一の物理的根拠*

- 私たちは過去を覚えているが未来は覚えていない
- 割れたコップは元に戻らない
- → これは物理法則ではなく**統計的確率の問題**
- **熱力学第2法則：**
- エントロピー（無秩序さ）は増大し続ける
- 「時間の矢」の唯一の物理的根拠
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">エントロピーと時間の矢</text><rect x="50" y="50" width="200" height="160" rx="8" fill="#0f3460" stroke="#4a90d9" stroke-width="2"/><text x="150" y="75" text-anchor="middle" fill="#4a90d9" font-size="12" font-family="sans-serif">低エントロピー（過去）</text><circle cx="110" cy="120" r="6" fill="#f9a825"/><circle cx="130" cy="110" r="6" fill="#f9a825"/><circle cx="150" cy="125" r="6" fill="#f9a825"/><circle cx="170" cy="115" r="6" fill="#f9a825"/><circle cx="190" cy="120" r="6" fill="#f9a825"/><circle cx="120" cy="145" r="6" fill="#f9a825"/><circle cx="160" cy="140" r="6" fill="#f9a825"/><text x="150" y="195" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">整然とした状態</text><text x="150" y="212" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">S 小</text><line x1="270" y1="130" x2="340" y2="130" stroke="#e91e63" stroke-width="3"/><polygon points="335,124 350,130 335,136" fill="#e91e63"/><text x="310" y="120" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">時間経過</text><text x="310" y="148" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">ΔS ≥ 0</text><rect x="360" y="50" width="200" height="160" rx="8" fill="#0f3460" stroke="#e91e63" stroke-width="2"/><text x="460" y="75" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">高エントロピー（未来）</text><circle cx="380" cy="100" r="6" fill="#f9a825"/><circle cx="430" cy="170" r="6" fill="#f9a825"/><circle cx="500" cy="90" r="6" fill="#f9a825"/><circle cx="390" cy="150" r="6" fill="#f9a825"/><circle cx="460" cy="115" r="6" fill="#f9a825"/><circle cx="530" cy="160" r="6" fill="#f9a825"/><circle cx="415" cy="135" r="6" fill="#f9a825"/><text x="460" y="195" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">無秩序な状態</text><text x="460" y="212" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">S 大</text><rect x="590" y="70" width="160" height="120" rx="8" fill="#1a1a2e" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/><text x="670" y="100" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">逆向きは</text><text x="670" y="120" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">起こらない</text><text x="670" y="145" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">統計的確率が</text><text x="670" y="163" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">極めて低い</text><text x="400" y="255" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">熱力学第2法則：エントロピーは常に増大する → 時間の矢の根拠</text></svg>


---

<!-- _class: lead -->
# アインシュタインと時間


---

# 相対性理論：時間は伸び縮みする（1/2）

> *光速近くで旅すると地球では224年が経過する*

- **特殊相対性理論（1905年）：**
- 速く動くほど時間は遅れる（時間の遅れ）
- 光速99.9%で10年旅すると地球では224年経過
- **一般相対性理論（1915年）：**
- 重力が強いほど時間は遅れる
- GPS衛星は1日に38マイクロ秒ずれる → 補正なしで8km誤差
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ツイン・パラドックス（双子のパラドックス）</text><rect x="30" y="50" width="120" height="200" rx="8" fill="#0f3460" stroke="#4a90d9" stroke-width="2"/><text x="90" y="80" text-anchor="middle" fill="#4a90d9" font-size="13" font-weight="bold" font-family="sans-serif">地球の双子</text><text x="90" y="105" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif">🧑</text><text x="90" y="145" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">静止</text><text x="90" y="165" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">40歳</text><text x="90" y="220" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">10年後…</text><text x="90" y="240" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">50歳</text><line x1="160" y1="90" x2="300" y2="90" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="295,85 310,90 295,95" fill="#e91e63"/><rect x="310" y="50" width="180" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="75" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">宇宙船 v = 0.999c</text><text x="400" y="97" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">🚀</text><text x="400" y="125" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">γ ≈ 22.4倍時間が遅れる</text><line x1="310" y1="190" x2="160" y2="190" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,3"/><polygon points="165,185 150,190 165,195" fill="#e91e63"/><rect x="30" y="160" width="120" height="80" rx="8" fill="#0f3460" stroke="#4a90d9" stroke-width="2" opacity="0.6"/><text x="90" y="185" text-anchor="middle" fill="#4a90d9" font-size="11" font-family="sans-serif">帰還後の双子</text><text x="90" y="215" text-anchor="middle" fill="white" font-size="22" font-family="sans-serif">👤</text><text x="400" y="185" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">宇宙で10年旅</text><text x="400" y="207" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">→ 224年後の地球へ</text><rect x="550" y="50" width="220" height="180" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="660" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ローレンツ因子</text><text x="660" y="105" text-anchor="middle" fill="white" font-size="14" font-family="monospace">γ = 1/√(1−v²/c²)</text><text x="660" y="135" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">v=0.999c → γ≈22.4</text><line x1="590" y1="150" x2="730" y2="150" stroke="#aaaacc" stroke-width="1"/><text x="660" y="168" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">宇宙側 10年</text><text x="660" y="188" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">= 地球側 224年</text><text x="400" y="268" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">時間は絶対的ではなく、運動状態によって変化する</text></svg>


---

# 相対性理論：時間は伸び縮みする（2/2）

> *ブロック宇宙論では過去・現在・未来が等しく実在する*

- **ブロック宇宙論（Block Universe）：**
- アインシュタイン自身の解釈：
- 「過去・現在・未来はすべて等しく実在する」
- 時間は流れておらず、私たちが4次元時空を移動しているだけ
- 「今この瞬間」は相対的であり、普遍的な「現在」は存在しない
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ブロック宇宙（Eternalism）</text><rect x="60" y="45" width="680" height="200" rx="4" fill="#0f3460" fill-opacity="0.5" stroke="#4a90d9" stroke-width="1" stroke-dasharray="5,3"/><text x="400" y="68" text-anchor="middle" fill="#4a90d9" font-size="12" font-family="sans-serif">4次元時空ブロック — すべての時刻が同等に「実在」する</text><rect x="100" y="80" width="100" height="140" rx="4" fill="#e91e63" fill-opacity="0.25" stroke="#e91e63" stroke-width="2"/><text x="150" y="105" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">過去</text><text x="150" y="130" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">🌱</text><text x="150" y="155" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">Big Bang</text><text x="150" y="175" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">恐竜時代</text><text x="150" y="195" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">…</text><rect x="350" y="80" width="100" height="140" rx="4" fill="#f9a825" fill-opacity="0.3" stroke="#f9a825" stroke-width="2"/><text x="400" y="105" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">現在？</text><text x="400" y="130" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">👤</text><text x="400" y="160" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">「今」は観測者</text><text x="400" y="178" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">によって異なる</text><rect x="600" y="80" width="100" height="140" rx="4" fill="#4a90d9" fill-opacity="0.25" stroke="#4a90d9" stroke-width="2"/><text x="650" y="105" text-anchor="middle" fill="#4a90d9" font-size="12" font-family="sans-serif">未来</text><text x="650" y="130" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">🌌</text><text x="650" y="155" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">遠い未来</text><text x="650" y="175" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">…</text><line x1="200" y1="150" x2="345" y2="150" stroke="#aaaacc" stroke-width="1" stroke-dasharray="3,3"/><line x1="455" y1="150" x2="595" y2="150" stroke="#aaaacc" stroke-width="1" stroke-dasharray="3,3"/><text x="275" y="145" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">光円錐</text><text x="527" y="145" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">光円錐</text><text x="400" y="270" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">時間は「流れる」のではなく、私たちが4次元ブロックの中を移動している</text></svg>


---

# 量子力学と時間（1/2）

> *Wheeler-DeWitt方程式から時間変数が消える*

- **ホイーラー・ドウィット方程式：**
- 量子重力理論を記述する方程式 — 時間変数が現れない
- = 宇宙の基本方程式に「時間」は含まれていない？
- **量子もつれと時間：**
- 過去・未来の量子状態は現在の観測で決まる（遅延選択実験）
- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">Wheeler-DeWitt方程式 — 時間のない量子重力</text><rect x="150" y="50" width="500" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="80" text-anchor="middle" fill="white" font-size="18" font-family="monospace">Ĥ |Ψ⟩ = 0</text><text x="400" y="108" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">ハミルトン演算子 × 宇宙の波動関数 = 0（時間微分なし）</text><line x1="210" y1="130" x2="210" y2="165" stroke="#e91e63" stroke-width="2"/><polygon points="205,160 215,160 210,170" fill="#e91e63"/><line x1="590" y1="130" x2="590" y2="165" stroke="#e91e63" stroke-width="2"/><polygon points="585,160 595,160 590,170" fill="#e91e63"/><rect x="60" y="170" width="300" height="70" rx="8" fill="#0f3460" stroke="#4a90d9" stroke-width="2"/><text x="210" y="195" text-anchor="middle" fill="#4a90d9" font-size="12" font-weight="bold" font-family="sans-serif">シュレーディンガー方程式（通常）</text><text x="210" y="218" text-anchor="middle" fill="white" font-size="14" font-family="monospace">iℏ ∂Ψ/∂t = ĤΨ</text><text x="210" y="238" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">時間変数 t が明示的に存在</text><rect x="440" y="170" width="300" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">Wheeler-DeWitt（量子重力）</text><text x="590" y="218" text-anchor="middle" fill="white" font-size="14" font-family="monospace">Ĥ|Ψ⟩ = 0</text><text x="590" y="238" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">時間変数が消える</text><text x="400" y="275" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">宇宙全体を量子的に記述すると、時間は基本変数でなくなる</text></svg>


---

# 量子力学と時間（2/2）

> *Rovelliは「時間は存在せず変化だけがある」と主張*

- 因果関係が時間の方向と一致しない場合がある
- **ループ量子重力理論：**
- Carlo Rovelli：時間は創発的な概念
- 「時間は存在しない — あるのは変化だけ」
- 根本的な物理に時間は不要かもしれない
- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">遅延選択実験 — 過去が未来で決まる？</text><rect x="30" y="50" width="120" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="90" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">光子源</text><text x="90" y="98" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">単一光子</text><line x1="150" y1="80" x2="220" y2="80" stroke="#4a90d9" stroke-width="2"/><polygon points="215,74 230,80 215,86" fill="#4a90d9"/><rect x="230" y="60" width="100" height="40" rx="4" fill="#0f3460" stroke="#4a90d9" stroke-width="2"/><text x="280" y="85" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">ビームスプリッタ</text><line x1="330" y1="80" x2="420" y2="80" stroke="#4a90d9" stroke-width="2" stroke-dasharray="4,3"/><line x1="280" y1="100" x2="280" y2="170" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,3"/><line x1="420" y1="80" x2="420" y2="170" stroke="#4a90d9" stroke-width="2" stroke-dasharray="4,3"/><line x1="280" y1="170" x2="420" y2="170" stroke="#e91e63" stroke-width="2" stroke-dasharray="4,3"/><rect x="370" y="150" width="100" height="40" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="420" y="168" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">後置ビームスプリッタ</text><text x="420" y="183" text-anchor="middle" fill="#aaaacc" font-size="9" font-family="sans-serif">（後から設置を決める）</text><rect x="560" y="60" width="200" height="170" rx="8" fill="#0f3460" stroke="#f9a825" stroke-width="1"/><text x="660" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">観測結果</text><text x="660" y="110" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">後置あり → 干渉縞</text><text x="660" y="130" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">（波として振る舞った）</text><line x1="590" y1="140" x2="730" y2="140" stroke="#aaaacc" stroke-width="1"/><text x="660" y="162" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">後置なし → 粒子検出</text><text x="660" y="182" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">（粒子として振る舞った）</text><text x="660" y="218" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">「後の選択」が</text><text x="660" y="232" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">「過去の経路」を決定</text><text x="400" y="255" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">量子世界では因果の時間順序が古典的直観と異なる</text></svg>


---

# 「現在」は存在するか（1/2）

> *同時性の相対性で普遍的な「今」は定義できない*

- **同時性の相対性：**
- 異なる速度で動く観測者にとって「同時」の出来事は異なる
- 宇宙の反対側の「今この瞬間」は定義できない
- **光の遅延：**
- 太陽を見るのは8分前の姿、アンドロメダ銀河は250万年前
- <svg viewBox="0 0 800 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="290" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">同時性の相対性 — 「今」は誰の今か</text><line x1="60" y1="240" x2="740" y2="240" stroke="#aaaacc" stroke-width="1"/><text x="400" y="258" text-anchor="middle" fill="#aaaacc" font-size="11" font-family="sans-serif">空間軸</text><line x1="400" y1="50" x2="400" y2="250" stroke="#aaaacc" stroke-width="1" stroke-dasharray="4,3"/><text x="415" y="65" fill="#aaaacc" font-size="11" font-family="sans-serif">時間軸</text><line x1="80" y1="240" x2="400" y2="80" stroke="#f9a825" stroke-width="2"/><line x1="720" y1="240" x2="400" y2="80" stroke="#f9a825" stroke-width="2"/><text x="400" y="75" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">光円錐の頂点（今）</text><line x1="150" y1="180" x2="650" y2="180" stroke="#4a90d9" stroke-width="2"/><text x="670" y="185" fill="#4a90d9" font-size="11" font-family="sans-serif">A の現在面</text><line x1="110" y1="200" x2="620" y2="160" stroke="#e91e63" stroke-width="2" stroke-dasharray="5,3"/><text x="625" y="158" fill="#e91e63" font-size="11" font-family="sans-serif">B の現在面</text><circle cx="400" cy="180" r="5" fill="white"/><text x="400" y="175" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">観測者</text><rect x="30" y="60" width="180" height="70" rx="6" fill="#16213e" stroke="#4a90d9" stroke-width="1"/><text x="120" y="82" text-anchor="middle" fill="#4a90d9" font-size="11" font-weight="bold" font-family="sans-serif">静止した観測者 A</text><text x="120" y="100" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">水平な「現在面」</text><text x="120" y="120" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">宇宙の全点が同時</text><rect x="590" y="60" width="180" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="680" y="82" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">運動する観測者 B</text><text x="680" y="100" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">傾いた「現在面」</text><text x="680" y="120" text-anchor="middle" fill="#aaaacc" font-size="10" font-family="sans-serif">異なる時刻が「同時」</text><text x="400" y="278" text-anchor="middle" fill="#aaaacc" font-size="12" font-family="sans-serif">遠方での「今」は観測者によって異なり、普遍的な現在は存在しない</text></svg>


---

# 「現在」は存在するか（2/2）

> *意識の「今」は実際には0.5秒前の過去である*

- 観測とは常に過去を見ることである
- **脳が作る「今」：**
- 神経処理に約0.5秒かかるため、意識的な「今」は実際には過去
- 私たちは常に過去を「現在」として体験している
- 「現在」は物理的実体ではなく、意識が作り出す幻想かもしれない


---

# まとめ：時間という幻想

> *時間は物理法則の外側にある創発的な概念かもしれない*

- ✅ **物理法則自体は時間に方向を持たない**
- ✅ **「時間の矢」はエントロピー増大（統計的事実）から生まれる**
- ✅ **相対性理論：時間は伸縮し、普遍的な「今」は存在しない**
- ✅ **量子重力：時間は基本方程式から消える**
- 
- 「時間とは、自然が何もかも同時に起こらないようにする仕組みだ」— John Wheeler

