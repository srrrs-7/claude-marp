---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "10倍エンジニア神話"
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
# 10倍エンジニアは実在するか

- 生産性研究の結論
- 
- 神話と研究の間にある真実


---

<!-- _class: lead -->
# 神話の起源

- 「10倍」という数字はどこから来たのか
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="50" y="40" width="160" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="130" y="70" font-family="sans-serif" font-size="12" fill="#f9a825" text-anchor="middle" font-weight="bold">1968年</text><text x="130" y="92" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">Sackman研究</text><text x="130" y="110" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">「28倍の差」観察</text><text x="130" y="128" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">n=12の小規模実験</text><polygon points="230,100 250,90 250,110" fill="#aaa"/><line x1="210" y1="100" x2="250" y2="100" stroke="#aaa" stroke-width="2"/><rect x="270" y="40" width="160" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="350" y="70" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">神話化</text><text x="350" y="92" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">「10倍」に丸められる</text><text x="350" y="110" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">文脈が削除される</text><text x="350" y="128" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">SNSで拡散</text><polygon points="450,100 470,90 470,110" fill="#aaa"/><line x1="430" y1="100" x2="470" y2="100" stroke="#aaa" stroke-width="2"/><rect x="490" y="40" width="260" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="620" y="70" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">有害な文化</text><text x="620" y="92" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">「天才エンジニア」崇拝</text><text x="620" y="110" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">チームワーク軽視</text><text x="620" y="128" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">採用基準の歪み</text></svg>


---

# 「10倍」の出処 — Sackman 1968年研究（1/2）

- - Sackman, Erikson & Grant (1968): プログラマー間の性能比較
- - デバッグ時間に最大28倍、コーディング速度に最大25倍の差
- - しかし実験設計に重大な問題:
-   - サンプル数わずか12名


---

# 「10倍」の出処 — Sackman 1968年研究（2/2）

-   - 「コードの品質」は一切測定していない
-   - 経験年数の差を考慮していない
- 
- <svg viewBox='0 0 800 180' style='max-height:35vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='180' fill='none'/><line x1='100' y1='150' x2='750' y2='150' stroke='#555' stroke-width='2'/><line x1='100' y1='150' x2='100' y2='20' stroke='#555' stroke-width='2'/><text x='60' y='90' text-anchor='middle' fill='#999' font-size='10' transform='rotate(-90 60 90)'>時間(分)</text><rect x='140' y='130' width='40' height='20' fill='#2ecc71'/><text x='160' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P1</text><rect x='200' y='110' width='40' height='40' fill='#27ae60'/><text x='220' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P2</text><rect x='260' y='100' width='40' height='50' fill='#f1c40f'/><text x='280' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P3</text><rect x='320' y='85' width='40' height='65' fill='#f39c12'/><text x='340' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P4</text><rect x='380' y='70' width='40' height='80' fill='#e67e22'/><text x='400' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P5</text><rect x='440' y='60' width='40' height='90' fill='#e67e22'/><text x='460' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P6</text><rect x='500' y='50' width='40' height='100' fill='#d35400'/><text x='520' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P7</text><rect x='560' y='40' width='40' height='110' fill='#e74c3c'/><text x='580' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P8</text><rect x='620' y='30' width='40' height='120' fill='#c0392b'/><text x='640' y='170' text-anchor='middle' fill='#aaa' font-size='9'>P9</text><text x='400' y='15' text-anchor='middle' fill='#e74c3c' font-size='10'>28倍の差 — しかしn=12、品質は未測定</text></svg>


---

# Twitterでの炎上と神話化

- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e"/><text x="400" y="25" font-family="sans-serif" font-size="14" fill="#f9a825" text-anchor="middle" font-weight="bold">2019年 Kirani ツイート炎上 — 神話が拡散するまで</text><rect x="30" y="40" width="140" height="110" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="100" y="65" font-family="sans-serif" font-size="11" fill="#2196f3" text-anchor="middle" font-weight="bold">ツイート投稿</text><text x="100" y="85" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">「ダークモードを使う」</text><text x="100" y="100" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">「MTGに出ない」</text><text x="100" y="118" font-family="sans-serif" font-size="9" fill="#e91e63" text-anchor="middle">1.5万RT</text><polygon points="175,95 195,85 195,105" fill="#aaa"/><line x1="170" y1="95" x2="195" y2="95" stroke="#aaa" stroke-width="2"/><rect x="200" y="40" width="140" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="270" y="65" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="bold">炎上</text><text x="270" y="85" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">反論・批判続出</text><text x="270" y="100" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">技術コミュニティ</text><text x="270" y="115" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">大分裂</text><polygon points="345,95 365,85 365,105" fill="#aaa"/><line x1="340" y1="95" x2="365" y2="95" stroke="#aaa" stroke-width="2"/><rect x="370" y="40" width="160" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="450" y="65" font-family="sans-serif" font-size="11" fill="#e91e63" text-anchor="middle" font-weight="bold">有害な影響</text><text x="450" y="85" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">ロックスター文化助長</text><text x="450" y="100" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">チームワーク軽視</text><text x="450" y="115" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">採用基準の歪み</text><rect x="560" y="40" width="210" height="110" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="665" y="65" font-family="sans-serif" font-size="11" fill="#4caf50" text-anchor="middle" font-weight="bold">教訓</text><text x="665" y="85" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">神話は研究より速く伝播</text><text x="665" y="100" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">文脈なきデータは危険</text><text x="665" y="115" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">データで神話を解体せよ</text></svg>
- - 2019年: Shekhar Kirani「10xエンジニアの見分け方」ツイート
- - 有害な「ロックスター文化」を助長、チームワーク軽視の正当化に悪用
- - 採用基準の歪み: 「天才」を探して現実の人材を逃す


---

<!-- _class: lead -->
# 実際の研究が示すもの

- データは何を語っているのか
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e"/><text x="400" y="25" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">神話 vs. 研究が示す現実</text><rect x="50" y="45" width="300" height="115" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="70" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">神話（通説）</text><text x="200" y="92" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">天才エンジニアは生まれつき10倍優秀</text><text x="200" y="110" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">個人の才能が全てを決める</text><text x="200" y="128" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">チームより「スーパースター」を雇え</text><rect x="450" y="45" width="300" height="115" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="70" font-family="sans-serif" font-size="12" fill="#4caf50" text-anchor="middle" font-weight="bold">研究の現実</text><text x="600" y="92" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">生産性差はコンテキスト依存</text><text x="600" y="110" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">チーム環境が最大の要因（40%）</text><text x="600" y="128" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">「適合度」が個人能力より重要</text><text x="380" y="108" font-family="sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">≠</text></svg>


---

# 生産性のばらつきは実在する

- - 複数の追試で個人差 2〜10倍は確認されている
- - しかし「コード行数」は適切な指標か？
- - 最もエレガントな解決策は往々にしてコードが少ない
- - **削除したコード** こそ最大の貢献かもしれない
- 
- <svg viewBox='0 0 800 200' style='max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='200' fill='none'/><line x1='80' y1='170' x2='750' y2='170' stroke='#555' stroke-width='2'/><line x1='80' y1='170' x2='80' y2='20' stroke='#555' stroke-width='2'/><text x='40' y='100' text-anchor='middle' fill='#999' font-size='10' transform='rotate(-90 40 100)'>人数</text><text x='415' y='195' text-anchor='middle' fill='#999' font-size='10'>生産性（相対値）</text><rect x='120' y='150' width='50' height='20' fill='#3498db' opacity='0.6'/><rect x='180' y='120' width='50' height='50' fill='#3498db' opacity='0.7'/><rect x='240' y='70' width='50' height='100' fill='#3498db' opacity='0.8'/><rect x='300' y='40' width='50' height='130' fill='#3498db'/><rect x='360' y='55' width='50' height='115' fill='#3498db' opacity='0.9'/><rect x='420' y='80' width='50' height='90' fill='#3498db' opacity='0.8'/><rect x='480' y='110' width='50' height='60' fill='#3498db' opacity='0.7'/><rect x='540' y='135' width='50' height='35' fill='#2ecc71' opacity='0.7'/><rect x='600' y='150' width='50' height='20' fill='#2ecc71' opacity='0.6'/><rect x='660' y='160' width='50' height='10' fill='#e74c3c' opacity='0.6'/><text x='340' y='35' text-anchor='middle' fill='#3498db' font-size='10'>大多数</text><text x='660' y='155' text-anchor='middle' fill='#e74c3c' font-size='9'>「10x」</text><path d='M 120,155 Q 250,80 350,40 Q 450,60 550,130 Q 650,160 700,168' fill='none' stroke='#f39c12' stroke-width='2' stroke-dasharray='4,4'/></svg>


---

# 「何の10倍か」問題

| 測定軸 | 高生産性者の特徴 | 問題点 |
|--------|-----------------|--------|
| コード行数 | 大量のコードを書く | 多い=良いとは限らない |
| 機能実装数 | 素早く機能を完成 | 品質・保守性は？ |
| バグ修正速度 | 高速にバグを潰す | 根本原因は解決？ |
| 影響範囲 | 組織全体に貢献 | 測定が困難 |
| チーム加速 | 周囲を高速化 | 因果関係が不明 |
- 
- 測定軸によって「10倍エンジニア」は全く別の人になる


---

# コンテキスト依存性

- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="22" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">同一人物の生産性はコンテキストで大きく変動する</text><rect x="30" y="35" width="100" height="145" rx="6" fill="#16213e" stroke="#aaa" stroke-width="1"/><text x="80" y="58" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">エンジニアX</text><rect x="160" y="35" width="80" height="145" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="200" y="55" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">得意ドメイン</text><rect x="165" y="110" width="70" height="65" rx="3" fill="#f9a825" opacity="0.8"/><text x="200" y="148" font-family="sans-serif" font-size="10" fill="#1a1a2e" text-anchor="middle" font-weight="bold">10x</text><rect x="260" y="35" width="80" height="145" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="300" y="55" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">未知ドメイン</text><rect x="265" y="163" width="70" height="12" rx="3" fill="#e91e63" opacity="0.8"/><text x="300" y="183" font-family="sans-serif" font-size="10" fill="#e91e63" text-anchor="middle">0.5x</text><rect x="360" y="35" width="80" height="145" rx="4" fill="#16213e" stroke="#4caf50" stroke-width="1"/><text x="400" y="55" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">熟知のコード</text><rect x="365" y="80" width="70" height="95" rx="3" fill="#4caf50" opacity="0.8"/><text x="400" y="133" font-family="sans-serif" font-size="10" fill="#1a1a2e" text-anchor="middle" font-weight="bold">7x</text><rect x="460" y="35" width="80" height="145" rx="4" fill="#16213e" stroke="#2196f3" stroke-width="1"/><text x="500" y="55" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">新規プロジェクト</text><rect x="465" y="140" width="70" height="35" rx="3" fill="#2196f3" opacity="0.8"/><text x="500" y="163" font-family="sans-serif" font-size="10" fill="#fff" text-anchor="middle">2x</text><rect x="560" y="35" width="80" height="145" rx="4" fill="#16213e" stroke="#ff9800" stroke-width="1"/><text x="600" y="55" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">最適ツール</text><rect x="565" y="90" width="70" height="85" rx="3" fill="#ff9800" opacity="0.8"/><text x="600" y="138" font-family="sans-serif" font-size="10" fill="#1a1a2e" text-anchor="middle" font-weight="bold">6x</text><rect x="660" y="35" width="110" height="145" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="715" y="65" font-family="sans-serif" font-size="10" fill="#4caf50" text-anchor="middle" font-weight="bold">結論</text><text x="715" y="88" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">「10倍」は</text><text x="715" y="105" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">固有能力でなく</text><text x="715" y="122" font-family="sans-serif" font-size="9" fill="#f9a825" text-anchor="middle">適合度</text><text x="715" y="140" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">正しい人を</text><text x="715" y="157" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">正しい場所に</text></svg>
- - **普遍的「10倍」は存在しない — あるのは「適合度」**
- - 得意ドメインなら10倍、未知のドメインなら0.5倍
- - 「正しい人を正しい場所に」が本質


---

# チーム効果の方が大きい

- - Google「Project Aristotle」(2015): 生産性の最大要因は心理的安全性
- - チーム環境が生産性を最大5倍変動させる
- - 個人の能力差(2-10x) < チーム環境の影響(1-5x per person)
- 
- <svg viewBox='0 0 800 200' style='max-height:40vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='200' fill='none'/><text x='400' y='25' text-anchor='middle' fill='#ecf0f1' font-size='14' font-weight='bold'>生産性の決定要因</text><rect x='50' y='50' width='300' height='50' rx='6' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='80' text-anchor='middle' fill='white' font-size='12'>チーム環境・心理的安全性: 40%</text><rect x='50' y='110' width='220' height='50' rx='6' fill='#f39c12' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='160' y='140' text-anchor='middle' fill='white' font-size='12'>ドメイン適合度: 25%</text><rect x='50' y='170' width='150' height='30' rx='6' fill='#3498db'/><text x='125' y='190' text-anchor='middle' fill='white' font-size='11'>ツール・プロセス: 20%</text><rect x='450' y='50' width='300' height='150' rx='10' fill='#1a1a2e' stroke='#2ecc71' stroke-width='2'/><text x='600' y='80' text-anchor='middle' fill='#2ecc71' font-size='13' font-weight='bold'>個人の「固有能力」</text><text x='600' y='110' text-anchor='middle' fill='#aaa' font-size='11'>寄与率: 約15%</text><text x='600' y='140' text-anchor='middle' fill='#aaa' font-size='11'>しかも環境で大きく変動</text><text x='600' y='170' text-anchor='middle' fill='#f39c12' font-size='11'>「天才を雇う」より</text><text x='600' y='190' text-anchor='middle' fill='#f39c12' font-size='11'>「環境を整える」方が効果的</text></svg>


---

<!-- _class: lead -->
# AI時代の再定義

- 全員の生産性が底上げされたとき、何が変わるか
- <svg viewBox="0 0 800 190" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="190" fill="#1a1a2e"/><text x="400" y="25" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">AI補助による生産性ベースライン変化</text><line x1="60" y1="155" x2="740" y2="155" stroke="#555" stroke-width="2"/><line x1="60" y1="155" x2="60" y2="40" stroke="#555" stroke-width="2"/><text x="40" y="100" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle" transform="rotate(-90,40,100)">生産性</text><text x="400" y="175" font-family="sans-serif" font-size="9" fill="#aaa" text-anchor="middle">エンジニア（生産性順）</text><rect x="80" y="130" width="35" height="25" fill="#3498db" opacity="0.5"/><rect x="125" y="115" width="35" height="40" fill="#3498db" opacity="0.6"/><rect x="170" y="100" width="35" height="55" fill="#3498db" opacity="0.7"/><rect x="215" y="85" width="35" height="70" fill="#3498db" opacity="0.8"/><rect x="260" y="75" width="35" height="80" fill="#3498db"/><rect x="305" y="65" width="35" height="90" fill="#3498db"/><rect x="350" y="55" width="35" height="100" fill="#2ecc71" opacity="0.7"/><rect x="395" y="45" width="35" height="110" fill="#2ecc71"/><rect x="440" y="30" width="35" height="125" fill="#f39c12"/><rect x="485" y="25" width="35" height="130" fill="#e74c3c"/><text x="502" y="20" font-family="sans-serif" font-size="8" fill="#e74c3c" text-anchor="middle">旧10x</text><line x1="60" y1="100" x2="740" y2="100" stroke="#3498db" stroke-width="1" stroke-dasharray="4,3"/><text x="750" y="104" font-family="sans-serif" font-size="8" fill="#3498db">旧avg</text><line x1="60" y1="75" x2="740" y2="75" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/><text x="750" y="79" font-family="sans-serif" font-size="8" fill="#f9a825">新avg</text><text x="290" y="170" font-family="sans-serif" font-size="9" fill="#f9a825" text-anchor="middle">AI補助でベースラインが上昇 → 相対差が縮小</text></svg>


---

# AI補助でベースラインが上がる

- - GitHub Copilot使用で平均 **55%高速化** (GitHub, 2022)
- - 経験の浅い開発者ほど恩恵が大きい（最大200%向上）
- - 全員が底上げされると相対的な差は縮小する
- - 「10倍」だった人が「3倍」に、「1倍」だった人が「2倍」に
- - AI時代の10倍は「AIを最も効果的に使える人」？


---

# 新しい「希少能力」

- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="22" font-family="sans-serif" font-size="13" fill="#f9a825" text-anchor="middle" font-weight="bold">AI時代に希少になる能力 vs. コモディティ化する能力</text><rect x="30" y="38" width="340" height="145" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="62" font-family="sans-serif" font-size="12" fill="#e91e63" text-anchor="middle" font-weight="bold">コモディティ化（AIが代替）</text><text x="200" y="85" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">コード生成・補完</text><text x="200" y="103" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">定型的なバグ修正</text><text x="200" y="121" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">ボイラープレート作成</text><text x="200" y="139" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">基本的なリファクタリング</text><text x="200" y="157" font-family="sans-serif" font-size="10" fill="#aaa" text-anchor="middle">ドキュメント生成</text><rect x="430" y="38" width="340" height="145" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="62" font-family="sans-serif" font-size="12" fill="#4caf50" text-anchor="middle" font-weight="bold">希少化（人間の価値）</text><text x="600" y="85" font-family="sans-serif" font-size="10" fill="#f9a825" text-anchor="middle">問題定義・正しい問いを立てる</text><text x="600" y="103" font-family="sans-serif" font-size="10" fill="#f9a825" text-anchor="middle">アーキテクチャのトレードオフ判断</text><text x="600" y="121" font-family="sans-serif" font-size="10" fill="#f9a825" text-anchor="middle">「作らない」「消す」判断</text><text x="600" y="139" font-family="sans-serif" font-size="10" fill="#f9a825" text-anchor="middle">AI生成コードの倫理審査</text><text x="600" y="157" font-family="sans-serif" font-size="10" fill="#f9a825" text-anchor="middle">組織への技術的影響力</text><text x="400" y="98" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">↔</text></svg>
- - コード生成は希少でなくなる → 何が希少になるか
- - **問題定義**: 正しい問いを立てる能力
- - **アーキテクチャ判断**: トレードオフを理解し決断する能力


---

# 「乗数効果」エンジニア

- - 自分が10倍 vs チーム全員を2倍にする人
- - 後者の方が組織への総貢献は遥かに大きい
- 
- <svg viewBox='0 0 800 220' style='max-height:45vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='220' fill='none'/><rect x='50' y='30' width='300' height='170' rx='10' fill='#1a1a2e' stroke='#e74c3c' stroke-width='2'/><text x='200' y='55' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>10xエンジニア</text><text x='200' y='80' text-anchor='middle' fill='#aaa' font-size='11'>個人生産性: 10</text><text x='200' y='100' text-anchor='middle' fill='#aaa' font-size='11'>チーム5人の合計: 10+1+1+1+1</text><text x='200' y='125' text-anchor='middle' fill='#f39c12' font-size='16' font-weight='bold'>= 14</text><text x='200' y='155' text-anchor='middle' fill='#aaa' font-size='10'>ボトルネックリスク: 高</text><text x='200' y='175' text-anchor='middle' fill='#aaa' font-size='10'>バス因子: 1</text><rect x='450' y='30' width='300' height='170' rx='10' fill='#1a1a2e' stroke='#2ecc71' stroke-width='2'/><text x='600' y='55' text-anchor='middle' fill='#2ecc71' font-size='14' font-weight='bold'>乗数エンジニア</text><text x='600' y='80' text-anchor='middle' fill='#aaa' font-size='11'>個人生産性: 2</text><text x='600' y='100' text-anchor='middle' fill='#aaa' font-size='11'>チーム5人を各2倍: 2+2+2+2+2</text><text x='600' y='125' text-anchor='middle' fill='#2ecc71' font-size='16' font-weight='bold'>= 10</text><text x='600' y='155' text-anchor='middle' fill='#aaa' font-size='10'>ボトルネックリスク: 低</text><text x='600' y='175' text-anchor='middle' fill='#aaa' font-size='10'>チーム全体が成長</text><text x='400' y='215' text-anchor='middle' fill='#999' font-size='11'>10人チームなら: 10+9=19 vs 2x10=20 — 乗数効果が逆転</text></svg>


---

# 採用への含意（1/2）

- - 「10倍エンジニアを探す」採用戦略の問題点:
-   - 過度なコーディングテストへの偏重
-   - 「天才」バイアスによる多様性の欠如
-   - チーム適合性の軽視


---

# 採用への含意（2/2）

- - より効果的な採用基準:
-   - コミュニケーション能力と協調性
-   - 学習意欲と成長マインドセット
-   - ドメインへの適合度と興味


---

<!-- _class: lead -->
# まとめ

- 10倍エンジニアより
- **チームを10倍にするエンジニア** を目指せ
- 
- 生産性は個人の属性ではなく
- 環境・適合度・チームの関数


---

# 参考文献

- - **Research:**
-   - [Sackman et al. "Exploratory experimental studies comparing online and offline programming performance" (1968)](https://dl.acm.org/doi/10.1145/362851.362858)
-   - [Google "Project Aristotle" (re:Work, 2015)](https://rework.withgoogle.com/guides/understanding-team-effectiveness/)
-   - [GitHub "Copilot Impact Study" (2022)](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/)
- - **Articles:**
-   - ["The Myth of the 10x Developer" (Bossavit, 2013)](https://www.construx.com/blog/the-origins-of-10x-how-valid-is-the-underlying-research/)
-   - ["Is There a 10x Gap?" (Construx)](https://www.construx.com/blog/productivity-variations-among-software-developers-and-teams/)

