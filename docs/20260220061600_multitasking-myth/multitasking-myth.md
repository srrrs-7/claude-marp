---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "注意と認知の限界"
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
# マルチタスクという幻想
— 脳は同時に2つのことができない

- マルチタスクは「同時処理」ではなく「高速切り替え」
- 切り替えコストが集中力と生産性を蝕む
- 「つながり続ける」文化が認知に与えるコスト
![w:700 center](assets/title-brain.svg)


---

# アジェンダ

- 1. マルチタスクの神話
- 2. 注意の切り替えコスト
- 3. スマートフォンの認知コスト
- 4. 「ディープワーク」の概念
- 5. 生産性を回復する方法


---

<!-- _class: lead -->
# マルチタスクの神話


---

# 脳はシングルコアである（1/2）

- **認知科学の結論：**
- 人間の注意資源は一度に一つのことにしか向けられない
- 「マルチタスク」= 実際には高速なタスク切り替え
- <svg viewBox="0 0 720 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="720" height="220" fill="#1a1a2e"/><rect x="20" y="40" width="200" height="60" rx="8" fill="#e91e63"/><text x="120" y="76" text-anchor="middle" fill="white" font-size="15" font-weight="bold">タスク A</text><rect x="260" y="40" width="200" height="60" rx="8" fill="#283593"/><text x="360" y="76" text-anchor="middle" fill="white" font-size="15" font-weight="bold">タスク B</text><rect x="500" y="40" width="200" height="60" rx="8" fill="#1b5e20"/><text x="600" y="76" text-anchor="middle" fill="white" font-size="15" font-weight="bold">タスク C</text><rect x="280" y="130" width="160" height="50" rx="8" fill="#f9a825"/><text x="360" y="158" text-anchor="middle" fill="#1a1a2e" font-size="14" font-weight="bold">脳の処理チャネル</text><text x="360" y="172" text-anchor="middle" fill="#1a1a2e" font-size="11">（同時処理不可）</text><polygon points="120,100 120,130 350,130 350,100" fill="none" stroke="#e91e63" stroke-width="2"/><polygon points="350,125 340,115 360,115" fill="#e91e63"/><polygon points="600,100 600,130 370,130 370,100" fill="none" stroke="#4caf50" stroke-width="2"/><polygon points="370,125 360,115 380,115" fill="#4caf50"/><text x="360" y="205" text-anchor="middle" fill="#aaaaaa" font-size="12">1つのチャネルに複数タスクは通れない</text></svg>


---

# 脳はシングルコアである（2/2）

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">マルチタスカー vs モノタスカー — 認知能力比較</text><rect x="30" y="50" width="340" height="180" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">自称マルチタスカー (Ophir 2009)</text><rect x="50" y="90" width="300" height="18" rx="4" fill="#333"/><rect x="50" y="90" width="90" height="18" rx="4" fill="#e91e63" opacity="0.8"/><text x="360" y="104" fill="#e91e63" font-size="10" font-family="sans-serif">30%</text><text x="50" y="88" fill="#aaa" font-size="10" font-family="sans-serif">無関係情報の無視能力</text><rect x="50" y="118" width="300" height="18" rx="4" fill="#333"/><rect x="50" y="118" width="80" height="18" rx="4" fill="#e91e63" opacity="0.8"/><text x="360" y="132" fill="#e91e63" font-size="10" font-family="sans-serif">27%</text><text x="50" y="116" fill="#aaa" font-size="10" font-family="sans-serif">作業記憶の管理</text><rect x="50" y="146" width="300" height="18" rx="4" fill="#333"/><rect x="50" y="146" width="100" height="18" rx="4" fill="#e91e63" opacity="0.8"/><text x="360" y="160" fill="#e91e63" font-size="10" font-family="sans-serif">33%</text><text x="50" y="144" fill="#aaa" font-size="10" font-family="sans-serif">タスク切り替え速度</text><text x="200" y="212" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">3項目すべてで劣る</text><text x="200" y="230" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">頻繁にマルチタスクする人ほど苦手</text><rect x="430" y="50" width="340" height="180" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/><text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">モノタスカー</text><rect x="450" y="90" width="300" height="18" rx="4" fill="#333"/><rect x="450" y="90" width="260" height="18" rx="4" fill="#69f0ae" opacity="0.7"/><text x="760" y="104" fill="#69f0ae" font-size="10" font-family="sans-serif">87%</text><text x="450" y="88" fill="#aaa" font-size="10" font-family="sans-serif">無関係情報の無視能力</text><rect x="450" y="118" width="300" height="18" rx="4" fill="#333"/><rect x="450" y="118" width="250" height="18" rx="4" fill="#69f0ae" opacity="0.7"/><text x="760" y="132" fill="#69f0ae" font-size="10" font-family="sans-serif">83%</text><text x="450" y="116" fill="#aaa" font-size="10" font-family="sans-serif">作業記憶の管理</text><rect x="450" y="146" width="300" height="18" rx="4" fill="#333"/><rect x="450" y="146" width="240" height="18" rx="4" fill="#69f0ae" opacity="0.7"/><text x="760" y="160" fill="#69f0ae" font-size="10" font-family="sans-serif">80%</text><text x="450" y="144" fill="#aaa" font-size="10" font-family="sans-serif">タスク切り替え速度</text><text x="600" y="212" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">3項目すべてで優れる</text><text x="600" y="230" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">例外: 自動化された行動（歩行）は同時実行可能</text></svg>
- **「マルチタスクが得意」な人は存在するか：**
- Ophir et al.（2009年 PNAS）：
- 自称マルチタスカーは実はモノタスカーより劣る
- 「マルチタスクをよくする人 = マルチタスクが下手な人が好んでする習慣」
- 例外：自動化された行動（歩行）は同時実行が可能


---

# 注意の切り替えコスト（1/2）

- **「スイッチングコスト」：**
- タスクAからタスクBに切り替えると「残存注意」が残る
- 完全に集中するまでに平均23分かかる（Mark 2005年）
- <svg viewBox="0 0 720 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="720" height="240" fill="#1a1a2e"/><text x="360" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">タスク切り替え後の集中度回復曲線</text><line x1="60" y1="200" x2="680" y2="200" stroke="#555" stroke-width="1"/><line x1="60" y1="200" x2="60" y2="40" stroke="#555" stroke-width="1"/><text x="52" y="204" text-anchor="end" fill="#aaa" font-size="10">0%</text><text x="52" y="157" text-anchor="end" fill="#aaa" font-size="10">50%</text><text x="52" y="110" text-anchor="end" fill="#aaa" font-size="10">80%</text><text x="52" y="63" text-anchor="end" fill="#aaa" font-size="10">100%</text><line x1="60" y1="157" x2="680" y2="157" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/><line x1="60" y1="110" x2="680" y2="110" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/><line x1="60" y1="63" x2="680" y2="63" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/><path d="M60,200 C100,200 140,195 180,185 C240,170 300,145 360,120 C420,100 480,75 560,65 C620,60 660,58 680,57" fill="none" stroke="#e91e63" stroke-width="3"/><line x1="60" y1="40" x2="60" y2="210" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,3"/><text x="62" y="220" fill="#f9a825" font-size="10">切り替え</text><line x1="560" y1="40" x2="560" y2="210" stroke="#4caf50" stroke-width="2" stroke-dasharray="6,3"/><text x="490" y="220" fill="#4caf50" font-size="10">完全回復</text><text x="310" y="235" text-anchor="middle" fill="#aaa" font-size="11">平均 23 分</text><polygon points="68,215 56,215 62,205" fill="#f9a825"/><polygon points="552,215 564,215 558,205" fill="#4caf50"/><line x1="62" y1="215" x2="558" y2="215" stroke="#aaa" stroke-width="1"/></svg>


---

# 注意の切り替えコスト（2/2）

- 合計6回の注意切り替え × 再集中までのコスト
- → 深い思考に費やせる時間が大幅に減少
- <svg viewBox="0 0 720 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="720" height="220" fill="#1a1a2e"/><text x="360" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">スマートフォンの存在が認知に与える影響</text><rect x="60" y="50" width="280" height="130" rx="10" fill="#1b2a3b" stroke="#4caf50" stroke-width="2"/><text x="200" y="75" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">スマホなし（引き出しの中）</text><rect x="80" y="90" width="240" height="22" rx="4" fill="#4caf50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="12">作業記憶容量: 100%</text><rect x="80" y="120" width="240" height="22" rx="4" fill="#4caf50"/><text x="200" y="135" text-anchor="middle" fill="white" font-size="12">集中スコア: 100%</text><rect x="80" y="150" width="240" height="22" rx="4" fill="#4caf50"/><text x="200" y="165" text-anchor="middle" fill="white" font-size="12">認知負荷: 低</text><rect x="380" y="50" width="280" height="130" rx="10" fill="#2a1b1b" stroke="#e91e63" stroke-width="2"/><text x="520" y="75" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">スマホあり（机の上）</text><rect x="400" y="90" width="168" height="22" rx="4" fill="#e91e63"/><rect x="568" y="90" width="72" height="22" rx="4" fill="#333"/><text x="520" y="105" text-anchor="middle" fill="white" font-size="12">作業記憶容量: 60%</text><rect x="400" y="120" width="144" height="22" rx="4" fill="#e91e63"/><rect x="544" y="120" width="96" height="22" rx="4" fill="#333"/><text x="520" y="135" text-anchor="middle" fill="white" font-size="12">集中スコア: 53%</text><rect x="400" y="150" width="240" height="22" rx="4" fill="#b71c1c"/><text x="520" y="165" text-anchor="middle" fill="white" font-size="12">認知負荷: 高（画面を見なくても）</text><text x="360" y="205" text-anchor="middle" fill="#aaa" font-size="11">Ward et al. 2017 — スマホは存在するだけで注意を奪う</text></svg>


---

# ディープワークと生産性（1/2）

- **Cal Newport「Deep Work」（2016年）：**
- ディープワーク：認知能力を限界まで使う邪魔のない集中作業
- シャローワーク：メール・会議・SNSなどの分散した作業
- <svg viewBox="0 0 720 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="720" height="210" fill="#1a1a2e"/><text x="360" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ディープワーク vs シャローワーク</text><rect x="40" y="45" width="300" height="140" rx="10" fill="#0d2137" stroke="#1565c0" stroke-width="2"/><text x="190" y="70" text-anchor="middle" fill="#42a5f5" font-size="13" font-weight="bold">シャローワーク</text><text x="190" y="92" text-anchor="middle" fill="#aaa" font-size="11">メール / SNS / 定例会議</text><rect x="60" y="105" width="260" height="16" rx="4" fill="#1565c0" opacity="0.6"/><text x="190" y="117" text-anchor="middle" fill="white" font-size="10">認知負荷: 低</text><rect x="60" y="128" width="260" height="16" rx="4" fill="#1565c0" opacity="0.6"/><text x="190" y="140" text-anchor="middle" fill="white" font-size="10">成果: 代替可能・すぐ陳腐化</text><rect x="60" y="151" width="260" height="16" rx="4" fill="#c62828" opacity="0.8"/><text x="190" y="163" text-anchor="middle" fill="white" font-size="10">集中の断片化: 高</text><rect x="380" y="45" width="300" height="140" rx="10" fill="#0d2813" stroke="#2e7d32" stroke-width="2"/><text x="530" y="70" text-anchor="middle" fill="#66bb6a" font-size="13" font-weight="bold">ディープワーク</text><text x="530" y="92" text-anchor="middle" fill="#aaa" font-size="11">設計 / 執筆 / コーディング / 研究</text><rect x="400" y="105" width="260" height="16" rx="4" fill="#2e7d32" opacity="0.8"/><text x="530" y="117" text-anchor="middle" fill="white" font-size="10">認知負荷: 高（フロー状態）</text><rect x="400" y="128" width="260" height="16" rx="4" fill="#2e7d32" opacity="0.8"/><text x="530" y="140" text-anchor="middle" fill="white" font-size="10">成果: 希少・高価値・差別化</text><rect x="400" y="151" width="260" height="16" rx="4" fill="#1b5e20" opacity="0.8"/><text x="530" y="163" text-anchor="middle" fill="white" font-size="10">集中の断片化: 極低</text><text x="360" y="198" text-anchor="middle" fill="#f9a825" font-size="11">「深く考える能力」が21世紀の希少スキル</text></svg>


---

# ディープワークと生産性（2/2）

- 「つながり続ける」文化はこの能力を破壊する
- **実用的戦略：**
- - タイムブロッキング：集中時間をカレンダーで確保
- - 通知の完全オフ（特定時間帯）
- - メール確認を1日2〜3回に制限
- - 「一つのことに完全に集中する」練習


---

# まとめ：シングルタスクの力

- ✅ **マルチタスク = 高速切り替え。脳は同時処理できない**
- ✅ **注意の切り替えには平均23分の再集中コストがある**
- ✅ **スマートフォンの存在だけで認知パフォーマンスが低下**
- ✅ **「深い思考」は21世紀最も稀少で価値あるスキル**
- <svg viewBox="0 0 720 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="720" height="200" fill="#1a1a2e"/><text x="360" y="25" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">シングルタスク vs マルチタスク — 生産性比較</text><text x="140" y="55" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">マルチタスカー</text><rect x="40" y="65" width="200" height="22" rx="4" fill="#e91e63" opacity="0.9"/><text x="148" y="81" fill="white" font-size="11">実行時間 +40%</text><rect x="40" y="95" width="120" height="22" rx="4" fill="#e91e63" opacity="0.7"/><text x="108" y="111" fill="white" font-size="11">精度 -50%</text><rect x="40" y="125" width="160" height="22" rx="4" fill="#e91e63" opacity="0.5"/><text x="128" y="141" fill="white" font-size="11">ストレス +60%</text><rect x="40" y="155" width="90" height="22" rx="4" fill="#c62828" opacity="0.9"/><text x="87" y="171" fill="white" font-size="11">深い学習: 低</text><text x="570" y="55" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">シングルタスカー</text><rect x="470" y="65" width="200" height="22" rx="4" fill="#4caf50" opacity="0.9"/><text x="572" y="81" fill="white" font-size="11">実行時間 基準</text><rect x="470" y="95" width="200" height="22" rx="4" fill="#4caf50" opacity="0.9"/><text x="572" y="111" fill="white" font-size="11">精度 100%</text><rect x="470" y="125" width="200" height="22" rx="4" fill="#4caf50" opacity="0.9"/><text x="572" y="141" fill="white" font-size="11">ストレス 低</text><rect x="470" y="155" width="200" height="22" rx="4" fill="#2e7d32" opacity="0.9"/><text x="572" y="171" fill="white" font-size="11">深い学習: 高（フロー状態）</text><line x1="350" y1="50" x2="350" y2="190" stroke="#555" stroke-width="1" stroke-dasharray="4,4"/><text x="353" y="190" fill="#aaa" font-size="10">比較</text></svg>
- 「マルチタスクとは、複数のことを等しく下手にする技術だ」— Marilyn vos Savant

