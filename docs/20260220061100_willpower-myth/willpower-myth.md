---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "意志力の神話"
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
# 意志力は有限か？

- 自制心の科学と「意志力の枯渇」神話
- 2026-02-20


---

# 目次

> *動機・信念・環境設計が意志力の真の制御因子*

- - 1. 意志力の枯渇モデルとは
- - 2. 再現性の危機とモデルの崩壊
- - 3. 新しい意志力の理解
- - 4. 意志力は「信念」で変わる
- - 5. 実践的な自制心の戦略
- - 6. まとめ


---

<!-- _class: lead -->
# 1. 意志力の枯渇モデル


---

# Baumeisterの有名な実験 (1998)

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><rect x="30" y="20" width="340" height="280" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><rect x="430" y="20" width="340" height="280" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="55" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">グループA（意志力を消費）</text><text x="600" y="55" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold" font-family="sans-serif">グループB（自由に食べる）</text><circle cx="130" cy="130" r="30" fill="#e53935" opacity="0.85"/><text x="130" y="135" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">ラディッシュ</text><text x="200" y="130" fill="#aaa" font-size="22" font-family="sans-serif">→</text><circle cx="270" cy="130" r="30" fill="#555" opacity="0.6"/><line x1="250" y1="110" x2="290" y2="150" stroke="#e91e63" stroke-width="3"/><line x1="290" y1="110" x2="250" y2="150" stroke="#e91e63" stroke-width="3"/><text x="270" y="135" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">チョコ禁止</text><circle cx="530" cy="130" r="30" fill="#6d4c41" opacity="0.85"/><text x="530" y="135" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">チョコレート</text><text x="600" y="130" fill="#aaa" font-size="22" font-family="sans-serif">→</text><circle cx="670" cy="130" r="30" fill="#6d4c41" opacity="0.85"/><text x="670" y="135" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">チョコレート</text><rect x="60" y="190" width="280" height="50" rx="8" fill="#0d47a1" opacity="0.8"/><text x="200" y="212" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">難しいパズル → 早く諦める</text><text x="200" y="232" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">自我消耗した</text><rect x="460" y="190" width="280" height="50" rx="8" fill="#1b5e20" opacity="0.8"/><text x="600" y="212" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">難しいパズル → 長く粘る</text><text x="600" y="232" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">意志力が残っている</text><text x="400" y="310" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">→ Baumeister (1998) が「自我消耗（Ego Depletion）」理論を提唱</text></svg>


---

# 自我消耗モデルの影響

![w:900 center](assets/ego-depletion.svg)


---

<!-- _class: lead -->
# 2. 再現性の危機


---

# モデルの崩壊 — 2016年大規模再現実験

> *d=0.62の自我消耗効果が大規模追試でd=0.04に崩壊した*

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="35" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="sans-serif">自我消耗の効果量 (Cohen's d)</text><line x1="80" y1="50" x2="80" y2="310" stroke="#555" stroke-width="2"/><line x1="80" y1="310" x2="750" y2="310" stroke="#555" stroke-width="2"/><text x="68" y="55" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.6</text><text x="68" y="105" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.5</text><text x="68" y="155" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.4</text><text x="68" y="205" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.3</text><text x="68" y="255" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.1</text><text x="68" y="305" text-anchor="end" fill="#aaa" font-size="11" font-family="sans-serif">0.0</text><rect x="130" y="60" width="100" height="250" fill="#f9a825" opacity="0.9" rx="4"/><text x="180" y="50" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">d=0.62</text><text x="180" y="330" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">原著論文</text><text x="180" y="345" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">(1998)</text><rect x="280" y="105" width="100" height="205" fill="#f9a825" opacity="0.7" rx="4"/><text x="330" y="95" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">d=0.53</text><text x="330" y="330" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">追試平均</text><text x="330" y="345" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">(2000年代)</text><rect x="430" y="297" width="100" height="13" fill="#e91e63" opacity="0.9" rx="4"/><text x="480" y="290" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">d=0.04</text><text x="480" y="330" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">多施設RCT</text><text x="480" y="345" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">(2016, n=2000+)</text><line x1="80" y1="260" x2="750" y2="260" stroke="#69f0ae" stroke-width="1" stroke-dasharray="6,4"/><text x="755" y="264" fill="#69f0ae" font-size="10" font-family="sans-serif">d=0.1</text><text x="620" y="160" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">23研究室</text><text x="620" y="180" fill="#aaa" font-size="12" font-family="sans-serif">2,000人以上</text><text x="620" y="200" fill="#e91e63" font-size="12" font-family="sans-serif">効果ほぼゼロ</text></svg>
- - **2016年**: 23研究室・2000人以上の事前登録再現実験
- - 自我消耗効果 d=0.04 → 実質ゼロ (出版バイアス・p-hackingが原因)


---

# グルコース仮説も否定

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="white" font-size="15" font-weight="bold" font-family="sans-serif">「意志力はグルコースを消費する」仮説の検証</text><rect x="30" y="50" width="220" height="240" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="140" y="75" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">主張</text><text x="140" y="100" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">意志力の消費</text><text x="140" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">=血糖値の低下</text><rect x="60" y="135" width="160" height="30" rx="6" fill="#f9a825" opacity="0.2"/><text x="140" y="155" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">「砂糖水で回復」</text><text x="140" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Gailliot et al. 2007</text><rect x="270" y="50" width="500" height="240" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="520" y="75" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">反証</text><rect x="290" y="85" width="460" height="45" rx="6" fill="#0d0d1a"/><text x="290" y="102" fill="#e91e63" font-size="11" font-family="sans-serif">  問題1: 脳のグルコース消費は全身の約20%（常時一定）</text><text x="290" y="122" fill="#aaa" font-size="10" font-family="sans-serif">  認知負荷で有意に増えるという証拠なし</text><rect x="290" y="140" width="460" height="45" rx="6" fill="#0d0d1a"/><text x="290" y="157" fill="#e91e63" font-size="11" font-family="sans-serif">  問題2: 口をゆすぐだけ（飲まなくても）で効果あり</text><text x="290" y="177" fill="#aaa" font-size="10" font-family="sans-serif">  → 実際のエネルギー消費ではなく「報酬の期待」</text><rect x="290" y="195" width="460" height="45" rx="6" fill="#0d0d1a"/><text x="290" y="212" fill="#e91e63" font-size="11" font-family="sans-serif">  問題3: 血糖値と意志力に相関なし（複数の独立研究）</text><text x="290" y="232" fill="#aaa" font-size="10" font-family="sans-serif">  バッテリーモデルは比喩としても不正確</text><text x="400" y="300" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">結論: グルコース仮説は否定された</text></svg>


---

<!-- _class: lead -->
# 3. 新しい理解


---

# 意志力は「動機」の問題

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif">プロセスモデル: 意志力は「優先度の配分」</text><rect x="20" y="50" width="150" height="60" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="95" y="77" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">長時間の</text><text x="95" y="97" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">自制課題</text><polygon points="180,80 200,75 200,85" fill="#aaa"/><line x1="170" y1="80" x2="200" y2="80" stroke="#aaa" stroke-width="2"/><rect x="200" y="50" width="160" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="280" y="77" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">報酬への</text><text x="280" y="97" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">注意増加</text><polygon points="370,80 390,75 390,85" fill="#aaa"/><line x1="360" y1="80" x2="390" y2="80" stroke="#aaa" stroke-width="2"/><rect x="390" y="50" width="160" height="60" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="470" y="77" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">目標達成の</text><text x="470" y="97" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">動機低下</text><polygon points="560,80 580,75 580,85" fill="#aaa"/><line x1="550" y1="80" x2="580" y2="80" stroke="#aaa" stroke-width="2"/><rect x="580" y="50" width="180" height="60" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/><text x="670" y="77" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">「疲れた」＝</text><text x="670" y="97" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">諦める選択</text><rect x="180" y="160" width="440" height="80" rx="12" fill="#0d47a1" opacity="0.85"/><text x="400" y="190" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">実験: 自我消耗後でも金銭的報酬があると</text><text x="400" y="212" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">同じパフォーマンスを維持できる</text><text x="400" y="232" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">(Inzlicht &amp; Schmeichel, 2012)</text><text x="400" y="278" text-anchor="middle" fill="#69f0ae" font-size="12" font-family="sans-serif">意志力は有限リソースではなく、優先度の配分問題</text></svg>


---

<!-- _class: lead -->
# 4. 信念が意志力を変える


---

# Carol Dweckの発見

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif">信念が実際のパフォーマンスを決める (Dweck, 2013)</text><rect x="30" y="50" width="340" height="230" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="80" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">「意志力は有限」と信じる人</text><rect x="60" y="100" width="280" height="12" rx="6" fill="#333"/><rect x="60" y="100" width="80" height="12" rx="6" fill="#e91e63"/><text x="200" y="130" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">困難な課題 → 早く諦める</text><text x="200" y="150" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">「もう無理」と感じやすい</text><text x="200" y="175" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">自己成就予言として機能</text><rect x="50" y="195" width="300" height="50" rx="8" fill="#2a0a0a"/><text x="200" y="217" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">文化比較: 欧米被験者で顕著</text><text x="200" y="237" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">消耗効果あり</text><rect x="430" y="50" width="340" height="230" rx="12" fill="#16213e" stroke="#69f0ae" stroke-width="2"/><text x="600" y="80" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">「意志力は無限」と信じる人</text><rect x="460" y="100" width="280" height="12" rx="6" fill="#333"/><rect x="460" y="100" width="240" height="12" rx="6" fill="#69f0ae"/><text x="600" y="130" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">長時間の集中を維持</text><text x="600" y="150" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">困難でも継続しやすい</text><text x="600" y="175" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">信念が行動を変える</text><rect x="450" y="195" width="300" height="50" rx="8" fill="#0a2a0a"/><text x="600" y="217" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">文化比較: インドの被験者</text><text x="600" y="237" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">消耗効果を示さない</text><text x="400" y="298" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">「限界」は生物学的制約ではなく文化的信念</text></svg>


---

# 実際に起きていること

- <svg viewBox="0 0 800 290" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="290" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif">コスト-ベネフィット分析モデル</text><rect x="30" y="48" width="220" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="140" y="72" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">タスク継続のコスト</text><text x="140" y="98" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">精神的つらさ</text><text x="140" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">注意資源の配分</text><text x="140" y="138" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">機会コスト</text><text x="140" y="165" text-anchor="middle" fill="#e91e63" font-size="20" font-weight="bold" font-family="sans-serif">↑ 増加</text><text x="140" y="230" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">時間経過で感じるコスト増</text><rect x="290" y="100" width="220" height="96" rx="10" fill="#0d47a1" opacity="0.85"/><text x="400" y="130" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">脳の判断</text><text x="400" y="152" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">コスト &gt; ベネフィット</text><text x="400" y="174" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">→ やめる選択が合理的</text><rect x="550" y="48" width="220" height="200" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1"/><text x="660" y="72" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">継続のベネフィット</text><text x="660" y="98" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">報酬・達成感</text><text x="660" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">目標との一致度</text><text x="660" y="138" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">社会的コミットメント</text><text x="660" y="165" text-anchor="middle" fill="#69f0ae" font-size="20" font-weight="bold" font-family="sans-serif">↑ 高められる</text><text x="660" y="230" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">意義・報酬でベネフィット増</text><text x="400" y="272" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">「疲れた」はエネルギー切れではなく優先度の再計算</text></svg>


---

<!-- _class: lead -->
# 5. 実践的戦略


---

# 習慣ループで意志力を使わない

> *習慣化により意志力ゼロで良い行動を自動実行できる*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="15" font-weight="bold" font-family="sans-serif">習慣ループ: 自動化で意志力を節約</text><circle cx="200" cy="170" r="65" fill="none" stroke="#f9a825" stroke-width="3"/><text x="200" y="163" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">キュー</text><text x="200" y="183" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">(トリガー)</text><circle cx="600" cy="170" r="65" fill="none" stroke="#e91e63" stroke-width="3"/><text x="600" y="163" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ルーティン</text><text x="600" y="183" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">(行動)</text><circle cx="400" cy="290" r="55" fill="none" stroke="#69f0ae" stroke-width="3"/><text x="400" y="283" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">報酬</text><text x="400" y="303" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">(強化)</text><line x1="265" y1="155" x2="535" y2="155" stroke="#aaa" stroke-width="2"/><polygon points="535,150 550,155 535,160" fill="#aaa"/><line x1="575" y1="225" x2="445" y2="268" stroke="#aaa" stroke-width="2"/><polygon points="445,263 435,278 450,272" fill="#aaa"/><line x1="355" y1="268" x2="225" y2="225" stroke="#aaa" stroke-width="2"/><polygon points="225,220 210,235 225,230" fill="#aaa"/><text x="400" y="148" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">起動</text><text x="530" y="265" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">完了</text><text x="270" y="265" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">強化</text><rect x="30" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="115" y="72" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">キューの例</text><text x="115" y="92" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・時刻（朝7時）</text><text x="115" y="108" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・場所（デスク前）</text><text x="115" y="124" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・直前の行動</text><rect x="600" y="50" width="170" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="685" y="72" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">ルーティンの例</text><text x="685" y="92" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・運動30分</text><text x="685" y="108" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・深呼吸5回</text><text x="685" y="124" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">・タスク開始</text></svg>
- - **習慣化**すると意志力ゼロで行動できる
- - **キュー設計**が習慣定着の鍵


---

# 環境設計 vs 意志力

> *誘惑と戦うより誘惑を物理的に除去する環境設計が圧倒的に強い*

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif">環境設計 vs 意志力に頼る戦略</text><rect x="20" y="45" width="360" height="230" rx="12" fill="#2a0a0a" stroke="#e91e63" stroke-width="2"/><text x="200" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">意志力に頼る（旧来）</text><text x="50" y="102" fill="#aaa" font-size="11" font-family="sans-serif">スマホが近くにある → 自分で「見ない」</text><text x="50" y="126" fill="#aaa" font-size="11" font-family="sans-serif">お菓子が目の前 → 「食べない」と念じる</text><text x="50" y="150" fill="#aaa" font-size="11" font-family="sans-serif">Slack通知あり → 無視しようとする</text><text x="50" y="174" fill="#aaa" font-size="11" font-family="sans-serif">誘惑がある環境 → 根性で抵抗</text><rect x="60" y="195" width="280" height="55" rx="8" fill="#3a0a0a"/><text x="200" y="217" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">消耗する、失敗しやすい</text><text x="200" y="237" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">意志力は有限ではないが、注意は有限</text><rect x="420" y="45" width="360" height="230" rx="12" fill="#0a2a0a" stroke="#69f0ae" stroke-width="2"/><text x="600" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">環境設計（新戦略）</text><text x="450" y="102" fill="#aaa" font-size="11" font-family="sans-serif">スマホを別室に → 物理的に取り除く</text><text x="450" y="126" fill="#aaa" font-size="11" font-family="sans-serif">お菓子を買わない → 選択肢を消す</text><text x="450" y="150" fill="#aaa" font-size="11" font-family="sans-serif">Slack通知OFF → 誘惑を排除</text><text x="450" y="174" fill="#aaa" font-size="11" font-family="sans-serif">摩擦ゼロの環境 → 良い行動が自然に</text><rect x="460" y="195" width="280" height="55" rx="8" fill="#0a3a0a"/><text x="600" y="217" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">持続可能、失敗しにくい</text><text x="600" y="237" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">成功者は意志力が強いのではなく</text></svg>
- - **環境設計**が最も効果的な自制心戦略
- - 誘惑と戦うより**誘惑を消す**ほうが圧倒的に楽


---

# エンジニアの仕事に活かす

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">エンジニアリング現場での意志力科学の応用</text><rect x="20" y="50" width="360" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="200" y="74" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">動機の問題として捉える</text><text x="40" y="96" fill="#aaa" font-size="11" font-family="sans-serif">コードレビュー品質は「疲れ」でなく動機の低下</text><text x="40" y="116" fill="#aaa" font-size="11" font-family="sans-serif">PR の意義・インセンティブ設計で改善できる</text><text x="40" y="136" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 「午後は質が落ちる」という思い込みを捨てる</text><rect x="420" y="50" width="360" height="100" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="600" y="74" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">環境設計で強制する</text><text x="440" y="96" fill="#aaa" font-size="11" font-family="sans-serif">集中時間: Slack通知OFF、ブラウザ制限</text><text x="440" y="116" fill="#aaa" font-size="11" font-family="sans-serif">技術的負債: 「後で直す」ではなくCI/CDで強制</text><text x="440" y="136" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 仕組みで動く、意志力に頼らない</text><rect x="20" y="165" width="360" height="100" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1"/><text x="200" y="189" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">社会的コミットメント活用</text><text x="40" y="211" fill="#aaa" font-size="11" font-family="sans-serif">ペアプログラミング: 他者の存在が集中を維持</text><text x="40" y="231" fill="#aaa" font-size="11" font-family="sans-serif">スプリント計画: チームへの宣言が行動を促す</text><text x="40" y="251" fill="#f9a825" font-size="11" font-family="sans-serif">→ 動機付けが最強の生産性ツール</text><rect x="420" y="165" width="360" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="600" y="189" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">習慣化で自動化</text><text x="440" y="211" fill="#aaa" font-size="11" font-family="sans-serif">デイリースタンドアップ: ルーティン化で摩擦ゼロ</text><text x="440" y="231" fill="#aaa" font-size="11" font-family="sans-serif">テスト駆動開発: キューを設計して自動実行</text><text x="440" y="251" fill="#f9a825" font-size="11" font-family="sans-serif">→「やる気が出たら」ではなく仕組みで動く</text></svg>


---

# まとめ

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><rect x="20" y="15" width="760" height="50" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="400" y="38" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">神話: 意志力はバッテリー — 使うと減る</text><text x="400" y="56" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">→ 再現実験で否定 (d=0.04)。バッテリーモデルは比喩としても不正確</text><rect x="20" y="80" width="760" height="50" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="103" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">真実: 意志力は「優先度の配分」</text><text x="400" y="121" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">→ 動機・信念・環境によって大きく変わる</text><rect x="20" y="145" width="370" height="50" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1"/><text x="205" y="168" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">環境設計が最強の戦略</text><text x="205" y="186" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">→ 誘惑を消す、習慣化する</text><rect x="410" y="145" width="370" height="50" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1"/><text x="595" y="168" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">信念を変えれば行動が変わる</text><text x="595" y="186" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">→「有限だ」という思い込みを捨てる</text><text x="400" y="240" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">「気合い」より「設計」— 科学が支持する自制心の使い方</text></svg>


---

# 参考文献

> *意志力研究の転換点となった主要文献一覧*

- - **研究:**
- - Baumeister, R.F. et al. (1998) "Ego depletion" (原著論文)
- - Hagger, M.S. et al. (2016) "A multilab preregistered replication"
- - **書籍:**
- - Dweck, C.S. "Mindset" (2006)
- - Duckworth, A. "Grit" (2016)

