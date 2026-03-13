---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "リスク補償理論"
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
# リスク補償効果
— 安全装置が危険を増す逆説

- ヘルメットをかぶるとより無謀な運転をする
- 安全性の向上がリスク行動を引き起こすメカニズム
- テクノロジー・医療・法規制への応用


---

# アジェンダ

> *安全装置が油断を誘発しリスクを元の水準に戻してしまう*

- 1. リスク補償とは何か
- 2. 交通安全のパラドックス
- 3. 医療・公衆衛生への応用
- 4. テクノロジーにおける事例
- 5. 政策・設計への含意


---

<!-- _class: lead -->
# リスク補償とは


---

# リスクホメオスタシス理論

> *安全が高まると行動が変わりリスクは目標値へ回帰する*

- Gerald Wilde（1982）— 人は「許容リスクレベル」を内部的に持つ
- 安全が高まると → より大きなリスクを取るように行動を変える
- 実際の事故率はほぼ一定に保たれる傾向がある
- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="360" fill="#1a1a2e" rx="12"/><text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold" font-family="sans-serif">リスクホメオスタシス均衡モデル</text><rect x="60" y="60" width="160" height="60" rx="8" fill="#283593"/><text x="140" y="86" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">安全装置の</text><text x="140" y="104" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">導入</text><rect x="320" y="60" width="160" height="60" rx="8" fill="#e91e63"/><text x="400" y="86" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">主観的安全感</text><text x="400" y="104" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">の上昇</text><rect x="580" y="60" width="160" height="60" rx="8" fill="#283593"/><text x="660" y="86" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">リスク行動</text><text x="660" y="104" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">の増加</text><polygon points="226,90 238,86 238,94" fill="#f9a825"/><line x1="220" y1="90" x2="238" y2="90" stroke="#f9a825" stroke-width="2"/><polygon points="486,90 498,86 498,94" fill="#f9a825"/><line x1="480" y1="90" x2="498" y2="90" stroke="#f9a825" stroke-width="2"/><rect x="320" y="200" width="160" height="60" rx="8" fill="#4a148c"/><text x="400" y="226" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">許容リスク</text><text x="400" y="244" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">レベル（目標値）</text><line x1="660" y1="120" x2="660" y2="250" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/><line x1="660" y1="250" x2="480" y2="250" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/><polygon points="480,246 468,250 480,254" fill="#f9a825"/><line x1="140" y1="120" x2="140" y2="230" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,4"/><line x1="140" y1="230" x2="320" y2="230" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,4"/><polygon points="320,226 332,230 320,234" fill="#aaa"/><text x="400" y="300" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">→ 行動が変化し、リスクは目標値へと回帰する</text><text x="400" y="330" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">事故率は安全装置の導入前後でほぼ変わらない</text></svg>


---

# リスク補償の発生メカニズム

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e" rx="12"/><text x="400" y="36" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold" font-family="sans-serif">リスク補償の3段階サイクル</text><circle cx="180" cy="180" r="70" fill="#283593" stroke="#5c6bc0" stroke-width="2"/><text x="180" y="172" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">①認知</text><text x="180" y="192" text-anchor="middle" fill="#a5d6a7" font-size="12" font-family="sans-serif">安全装置を</text><text x="180" y="208" text-anchor="middle" fill="#a5d6a7" font-size="12" font-family="sans-serif">認識する</text><circle cx="400" cy="290" r="70" fill="#e91e63" stroke="#f06292" stroke-width="2"/><text x="400" y="282" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">②評価</text><text x="400" y="302" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">「今は安全だ」</text><text x="400" y="318" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">と判断する</text><circle cx="620" cy="180" r="70" fill="#4a148c" stroke="#9c27b0" stroke-width="2"/><text x="620" y="172" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">③行動</text><text x="620" y="192" text-anchor="middle" fill="#ce93d8" font-size="12" font-family="sans-serif">より大きな</text><text x="620" y="208" text-anchor="middle" fill="#ce93d8" font-size="12" font-family="sans-serif">リスクを取る</text><line x1="248" y1="210" x2="334" y2="260" stroke="#f9a825" stroke-width="2"/><polygon points="334,260 323,255 328,267" fill="#f9a825"/><line x1="466" y1="260" x2="552" y2="210" stroke="#f9a825" stroke-width="2"/><polygon points="552,210 543,220 554,222" fill="#f9a825"/><line x1="614" y1="110" x2="450" y2="60" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,4"/><line x1="450" y1="60" x2="200" y2="110" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,4"/><polygon points="200,110 192,98 204,100" fill="#aaa"/><text x="400" y="52" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">事故発生 → 再び安全装置を意識</text><text x="180" y="280" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">例：ヘルメット装着</text><text x="620" y="280" text-anchor="middle" fill="#ce93d8" font-size="11" font-family="sans-serif">例：速度を上げる</text><text x="400" y="376" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">このサイクルが繰り返されることで事故率は元の水準に戻る</text></svg>


---

<!-- _class: lead -->
# 交通安全のパラドックス


---

# ヘルメット着用と事故率の関係

> *ヘルメット非着用の方が車が広く避けるという逆説*

- サイクリストのヘルメット着用 → 路肩を走る距離が短くなる現象
- Ian Walker（2006）— ヘルメット非着用時の方が車は広く避けて通る
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="12"/><text x="400" y="32" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ヘルメット着用と車の追い越し距離（模式図）</text><line x1="80" y1="260" x2="740" y2="260" stroke="#555" stroke-width="2"/><line x1="80" y1="260" x2="80" y2="70" stroke="#555" stroke-width="2"/><text x="400" y="286" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">走行状況</text><text x="55" y="266" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">0</text><text x="55" y="186" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50</text><text x="55" y="106" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">100</text><text x="30" y="180" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif" transform="rotate(-90,30,180)">追い越し距離(cm)</text><line x1="80" y1="186" x2="740" y2="186" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/><line x1="80" y1="106" x2="740" y2="106" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/><rect x="160" y="136" width="140" height="124" fill="#e91e63" opacity="0.85" rx="4"/><text x="230" y="128" text-anchor="middle" fill="#f48fb1" font-size="12" font-family="sans-serif">ヘルメット着用</text><text x="230" y="256" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">約75cm</text><rect x="500" y="106" width="140" height="154" fill="#42a5f5" opacity="0.85" rx="4"/><text x="570" y="98" text-anchor="middle" fill="#90caf9" font-size="12" font-family="sans-serif">ヘルメット非着用</text><text x="570" y="256" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">約82cm</text><line x1="230" y1="136" x2="570" y2="106" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,4"/><polygon points="570,106 558,106 563,115" fill="#f9a825"/><text x="400" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ヘルメット非着用の方が車は広く避ける — 逆説的な安全効果</text></svg>


---

# ペルツマン効果：シートベルト義務化

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="34" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">安全装置の実際効果 vs 期待効果（ペルツマン効果）</text><line x1="100" y1="310" x2="740" y2="310" stroke="#555" stroke-width="2"/><line x1="100" y1="310" x2="100" y2="60" stroke="#555" stroke-width="2"/><text x="420" y="338" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">義務化からの経過年数</text><text x="70" y="315" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">0</text><text x="66" y="225" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50</text><text x="66" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">100</text><text x="36" y="200" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif" transform="rotate(-90,36,200)">死亡者数（相対値）</text><text x="186" y="325" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1年</text><text x="313" y="325" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">3年</text><text x="440" y="325" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">5年</text><text x="567" y="325" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">7年</text><text x="694" y="325" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">10年</text><polyline points="100,220 186,160 313,110 440,80 567,68 694,62" fill="none" stroke="#42a5f5" stroke-width="3"/><text x="700" y="58" fill="#42a5f5" font-size="11" font-family="sans-serif">期待効果</text><polyline points="100,220 186,195 313,175 440,165 567,160 694,158" fill="none" stroke="#e91e63" stroke-width="3"/><text x="700" y="154" fill="#f06292" font-size="11" font-family="sans-serif">実際効果</text><line x1="100" y1="220" x2="100" y2="220" stroke="none"/><text x="400" y="220" text-anchor="middle" fill="#f9a825" font-size="18" font-family="sans-serif">↕</text><text x="530" y="216" fill="#f9a825" font-size="11" font-family="sans-serif">リスク補償による</text><text x="530" y="230" fill="#f9a825" font-size="11" font-family="sans-serif">効果の減衰</text><rect x="100" y="220" width="4" height="4" fill="#aaa"/><text x="60" y="222" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">義務化</text><text x="400" y="362" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">運転者の死亡は減少したが、歩行者・自転車乗用者の死亡が増加 → 総計は横ばい（Peltzman, 1975）</text></svg>


---

# テクノロジーへの応用

> *2FA・自動運転・預金保険でも同じ油断メカニズムが働く*

- **自動運転（Level 2）：** オートパイロットへの過信 → 注意散漫が増加
- **サイバーセキュリティ：** 強力なFW導入 → 内部セキュリティ意識が低下
- **金融：** 預金保険制度 → 銀行の過剰リスク投資（モラルハザード）
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="240" fill="#1a1a2e" rx="12"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">分野別リスク補償の構造</text><rect x="40" y="55" width="210" height="140" rx="8" fill="#1a237e" stroke="#5c6bc0" stroke-width="1.5"/><text x="145" y="78" text-anchor="middle" fill="#7986cb" font-size="12" font-weight="bold" font-family="sans-serif">自動車・交通</text><text x="145" y="100" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">ABS → 急ブレーキ多用</text><text x="145" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">シートベルト → 速度UP</text><text x="145" y="136" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">自動運転 → 注意散漫</text><text x="145" y="175" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">共通パターン:</text><text x="145" y="190" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">安全感 → 行動増大</text><rect x="295" y="55" width="210" height="140" rx="8" fill="#1b5e20" stroke="#66bb6a" stroke-width="1.5"/><text x="400" y="78" text-anchor="middle" fill="#a5d6a7" font-size="12" font-weight="bold" font-family="sans-serif">デジタル・セキュリティ</text><text x="400" y="100" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">FW強化 → 内部意識低下</text><text x="400" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">2FA → 弱いパスワード</text><text x="400" y="136" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">暗号化 → 送信量増加</text><text x="400" y="175" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">共通パターン:</text><text x="400" y="190" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">ツール依存 → 人的ミス</text><rect x="550" y="55" width="210" height="140" rx="8" fill="#4a148c" stroke="#ab47bc" stroke-width="1.5"/><text x="655" y="78" text-anchor="middle" fill="#ce93d8" font-size="12" font-weight="bold" font-family="sans-serif">金融</text><text x="655" y="100" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">預金保険 → 過剰投資</text><text x="655" y="118" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">Too Big to Fail</text><text x="655" y="136" text-anchor="middle" fill="white" font-size="11" font-family="sans-serif">→ さらに大きなリスク</text><text x="655" y="175" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">共通パターン:</text><text x="655" y="190" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">救済期待 → モラルHZ</text></svg>


---

# 設計への応用フレームワーク

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e" rx="12"/><text x="400" y="34" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">リスク補償を考慮した安全設計フレームワーク</text><rect x="50" y="60" width="320" height="130" rx="8" fill="#b71c1c" opacity="0.25" stroke="#e53935" stroke-width="1.5"/><text x="210" y="84" text-anchor="middle" fill="#ef9a9a" font-size="13" font-weight="bold" font-family="sans-serif">避けるべき設計</text><text x="210" y="108" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">「完全に安全です」と宣伝する</text><text x="210" y="128" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">リスクを見えなくする設計</text><text x="210" y="148" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">ユーザーをリスクから切り離す</text><text x="210" y="168" text-anchor="middle" fill="#ef9a9a" font-size="11" font-family="sans-serif">→ 過信・油断・無謀行動を誘発</text><rect x="430" y="60" width="320" height="130" rx="8" fill="#1b5e20" opacity="0.3" stroke="#66bb6a" stroke-width="1.5"/><text x="590" y="84" text-anchor="middle" fill="#a5d6a7" font-size="13" font-weight="bold" font-family="sans-serif">推奨する設計</text><text x="590" y="108" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">リスクを可視化・意識させる</text><text x="590" y="128" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">残存リスクを明示する</text><text x="590" y="148" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">段階的に能力を証明させる</text><text x="590" y="168" text-anchor="middle" fill="#a5d6a7" font-size="11" font-family="sans-serif">→ 適切な注意を持続させる</text><rect x="160" y="230" width="180" height="50" rx="8" fill="#283593"/><text x="250" y="251" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">フィードバック</text><text x="250" y="269" text-anchor="middle" fill="#90caf9" font-size="11" font-family="sans-serif">リスク状態を常に表示</text><rect x="360" y="230" width="180" height="50" rx="8" fill="#4a148c"/><text x="450" y="251" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">摩擦の維持</text><text x="450" y="269" text-anchor="middle" fill="#ce93d8" font-size="11" font-family="sans-serif">意図的な確認ステップ</text><rect x="560" y="230" width="180" height="50" rx="8" fill="#e65100"/><text x="650" y="251" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">教育の継続</text><text x="650" y="269" text-anchor="middle" fill="#ffcc80" font-size="11" font-family="sans-serif">仕組みを理解させる</text><line x1="250" y1="192" x2="250" y2="228" stroke="#f9a825" stroke-width="1.5"/><polygon points="250,228 245,218 255,218" fill="#f9a825"/><line x1="450" y1="192" x2="450" y2="228" stroke="#f9a825" stroke-width="1.5"/><polygon points="450,228 445,218 455,218" fill="#f9a825"/><line x1="650" y1="192" x2="650" y2="228" stroke="#f9a825" stroke-width="1.5"/><polygon points="650,228 645,218 655,218" fill="#f9a825"/><text x="400" y="322" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">「人を安全にしたいなら、安全だと感じさせすぎてはいけない」</text><text x="400" y="350" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">適度なリスク認識こそが最も効果的な安全促進策</text></svg>


---

# まとめ：安全設計の逆説

> *安全を意識させ続ける設計こそが最も効果的な安全策*

- リスク補償：人は安全が高まると、リスク行動を増やして均衡を保つ
- シートベルト・ABS・自動運転で確認された普遍的な現象
- 金融のモラルハザードも同じメカニズム
- 設計では「安全を意識させ続ける仕組み」が重要
- 「人を安全にしたいなら、安全だと感じさせすぎてはいけない」

