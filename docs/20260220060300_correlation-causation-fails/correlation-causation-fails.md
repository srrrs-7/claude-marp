---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "相関と因果"
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
# 相関と因果の混同
— 「チョコレートを食べると賢くなる」は本当か

- 相関係数が高い ≠ 因果関係がある
- 科学論文・メディア・AIが犯しがちな根本的誤り
- 因果推論という新しい統計学の誕生


---

# アジェンダ

> *高い相関係数は因果関係の存在を1%も保証しない基本原則*

- 1. 相関と因果の違い
- 2. 疑似相関の実例
- 3. 交絡因子という罠
- 4. 因果推論の方法論
- 5. AIと機械学習への応用


---

<!-- _class: lead -->
# 相関と因果の違い


---

# 相関 vs 因果：推論の落とし穴

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><rect x="40" y="40" width="200" height="80" rx="12" fill="#2d2d5e" stroke="#f9a825" stroke-width="2"/><text x="140" y="75" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">A が増える</text><text x="140" y="95" text-anchor="middle" fill="#ffffff" font-size="12">（チョコレート消費量）</text><rect x="560" y="40" width="200" height="80" rx="12" fill="#2d2d5e" stroke="#f9a825" stroke-width="2"/><text x="660" y="75" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">B が増える</text><text x="660" y="95" text-anchor="middle" fill="#ffffff" font-size="12">（ノーベル賞受賞者数）</text><text x="400" y="88" text-anchor="middle" fill="#e91e63" font-size="18" font-weight="bold">r = 0.79</text><line x1="240" y1="80" x2="360" y2="80" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,4"/><polygon points="360,74 380,80 360,86" fill="#e91e63"/><line x1="420" y1="80" x2="560" y2="80" stroke="#e91e63" stroke-width="2" stroke-dasharray="6,4"/><text x="400" y="72" text-anchor="middle" fill="#e91e63" font-size="11">相関</text><rect x="40" y="260" width="200" height="80" rx="12" fill="#2d2d5e" stroke="#4caf50" stroke-width="2"/><text x="140" y="295" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">A を変える</text><text x="140" y="315" text-anchor="middle" fill="#ffffff" font-size="12">（介入・操作）</text><rect x="560" y="260" width="200" height="80" rx="12" fill="#2d2d5e" stroke="#4caf50" stroke-width="2"/><text x="660" y="295" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">B が変わる</text><text x="660" y="315" text-anchor="middle" fill="#ffffff" font-size="12">（測定可能な変化）</text><line x1="240" y1="300" x2="520" y2="300" stroke="#4caf50" stroke-width="3"/><polygon points="520,294 540,300 520,306" fill="#4caf50"/><text x="400" y="290" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">因果</text><text x="400" y="195" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">≠</text><rect x="300" y="165" width="200" height="40" rx="8" fill="#e91e6322" stroke="#e91e63" stroke-width="1"/><text x="400" y="191" text-anchor="middle" fill="#e91e63" font-size="13">高い相関 ≠ 因果関係</text></svg>


---

# チョコレート消費量とノーベル賞受賞者数（1/2）

> *r=0.79の高相関でも背後に「豊かさ」という交絡因子がある*

- **Franz Messerli（2012年 NEJM）：**
- 国別のチョコレート消費量とノーベル賞受賞者数の相関
- r = 0.791（非常に高い相関）
- →「チョコレートは認知機能を向上させる？」
- ---
- **実際の理由：交絡因子「豊かさ」**
- 豊かな国 → チョコレートも食べる + 研究投資も多い


---

# 交絡因子「豊かさ」の構造

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><ellipse cx="400" cy="80" rx="120" ry="45" fill="#f9a825" opacity="0.9"/><text x="400" y="73" text-anchor="middle" fill="#1a1a2e" font-size="15" font-weight="bold">交絡因子</text><text x="400" y="93" text-anchor="middle" fill="#1a1a2e" font-size="13">豊かさ（GDP）</text><ellipse cx="160" cy="290" rx="120" ry="45" fill="#2d2d5e" stroke="#e91e63" stroke-width="2"/><text x="160" y="283" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">チョコレート</text><text x="160" y="303" text-anchor="middle" fill="#ffffff" font-size="12">消費量 ↑</text><ellipse cx="640" cy="290" rx="120" ry="45" fill="#2d2d5e" stroke="#e91e63" stroke-width="2"/><text x="640" y="283" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ノーベル賞</text><text x="640" y="303" text-anchor="middle" fill="#ffffff" font-size="12">受賞者数 ↑</text><line x1="310" y1="115" x2="220" y2="250" stroke="#f9a825" stroke-width="2.5"/><polygon points="215,248 225,262 232,250" fill="#f9a825"/><line x1="490" y1="115" x2="580" y2="250" stroke="#f9a825" stroke-width="2.5"/><polygon points="575,248 585,262 592,250" fill="#f9a825"/><line x1="280" y1="290" x2="500" y2="290" stroke="#e91e63" stroke-width="2" stroke-dasharray="8,5"/><text x="400" y="278" text-anchor="middle" fill="#e91e63" font-size="12">見かけ上の相関 r=0.79</text><text x="235" y="195" fill="#f9a825" font-size="12">原因</text><text x="530" y="195" fill="#f9a825" font-size="12">原因</text><rect x="260" y="340" width="280" height="30" rx="6" fill="#e91e6322" stroke="#e91e63" stroke-width="1"/><text x="400" y="361" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">直接の因果関係はない</text></svg>


---

# チョコレート消費量とノーベル賞受賞者数（2/2）

> *相関係数だけを見ると誤った政策立案につながる*

- チョコレートとノーベル賞に直接の因果関係はない
- ---
- **アイスクリーム売上と溺死者数：**
- 夏に両方増える → 原因は「夏（気温）」という交絡因子
- ---
- 相関は「何かが関係しているかもしれない」というヒント
- 因果は「Aを変えるとBが変わる」という主張


---

<!-- _class: lead -->
# 疑似相関と交絡因子


---

# アイスクリーム販売と溺死事故：スプリアス相関

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><ellipse cx="400" cy="70" rx="130" ry="48" fill="#f9a825" opacity="0.9"/><text x="400" y="63" text-anchor="middle" fill="#1a1a2e" font-size="15" font-weight="bold">気温上昇（夏）</text><text x="400" y="83" text-anchor="middle" fill="#1a1a2e" font-size="12">真の原因（交絡因子）</text><rect x="30" y="260" width="220" height="80" rx="14" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="2"/><text x="140" y="290" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">アイスクリーム販売</text><text x="140" y="312" text-anchor="middle" fill="#ffffff" font-size="13">売上 ↑↑↑</text><rect x="550" y="260" width="220" height="80" rx="14" fill="#2d2d5e" stroke="#ef9a9a" stroke-width="2"/><text x="660" y="290" text-anchor="middle" fill="#ef9a9a" font-size="14" font-weight="bold">プール・海での溺死</text><text x="660" y="312" text-anchor="middle" fill="#ffffff" font-size="13">事故数 ↑↑↑</text><line x1="320" y1="108" x2="185" y2="258" stroke="#f9a825" stroke-width="2.5"/><polygon points="179,254 190,268 197,256" fill="#f9a825"/><line x1="480" y1="108" x2="615" y2="258" stroke="#f9a825" stroke-width="2.5"/><polygon points="611,254 622,268 629,256" fill="#f9a825"/><line x1="250" y1="300" x2="540" y2="300" stroke="#e91e63" stroke-width="2" stroke-dasharray="10,6"/><text x="400" y="288" text-anchor="middle" fill="#e91e63" font-size="12">偽の因果（疑似相関）</text><polygon points="540,294 558,300 540,306" fill="#e91e63"/><text x="175" y="195" fill="#f9a825" font-size="12" text-anchor="middle">暑いから</text><text x="625" y="195" fill="#f9a825" font-size="12" text-anchor="middle">暑いから</text><rect x="220" y="340" width="360" height="28" rx="6" fill="#e91e6322" stroke="#e91e63" stroke-width="1"/><text x="400" y="359" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">アイスが溺死を引き起こすわけではない</text></svg>


---

# 疑似相関の代表例（1/2）

> *アイス販売と溺死の相関は「夏」という交絡因子の産物*

- **Tyler Vigen（Spurious Correlations）の事例：**
- - ニコラス・ケイジの映画出演数 × プールでの溺死者数（r=0.67）
- - 米国のチーズ消費量 × シーツへの絡まり死亡者数（r=0.95）
- - オーガニック食品売上 × 自閉症診断数（r=0.99）
- ---
- **なぜ疑似相関が生まれるか：**


---

# 疑似相関の発生メカニズム

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><rect x="30" y="30" width="220" height="90" rx="12" fill="#2d2d5e" stroke="#f9a825" stroke-width="2"/><text x="140" y="60" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">① 共通トレンド</text><text x="140" y="80" text-anchor="middle" fill="#cccccc" font-size="11">経済成長・人口増加が</text><text x="140" y="96" text-anchor="middle" fill="#cccccc" font-size="11">両変数を同時に押し上げる</text><rect x="290" y="30" width="220" height="90" rx="12" fill="#2d2d5e" stroke="#e91e63" stroke-width="2"/><text x="400" y="60" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">② 多重比較問題</text><text x="400" y="80" text-anchor="middle" fill="#cccccc" font-size="11">変数を大量に試すと</text><text x="400" y="96" text-anchor="middle" fill="#cccccc" font-size="11">偶然の高相関が必ず出る</text><rect x="550" y="30" width="220" height="90" rx="12" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="2"/><text x="660" y="60" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">③ 確証バイアス</text><text x="660" y="80" text-anchor="middle" fill="#cccccc" font-size="11">仮説を支持するデータ</text><text x="660" y="96" text-anchor="middle" fill="#cccccc" font-size="11">だけを探してしまう</text><rect x="100" y="200" width="600" height="60" rx="10" fill="#1a1a2e" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/><text x="400" y="228" text-anchor="middle" fill="#f9a825" font-size="13">p &lt; 0.05 を満たしても「偶然」の可能性</text><text x="400" y="248" text-anchor="middle" fill="#cccccc" font-size="12">20回試せば1回は有意になる（α=0.05の場合）</text><text x="400" y="310" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">→ 事前登録・複製研究・効果量の報告が重要</text></svg>


---

# 多重比較問題：試せば必ず見つかる

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">α=0.05 で 20回検定すると期待偽陽性 = 1回</text><rect x="30" y="50" width="740" height="200" rx="10" fill="#2d2d5e"/><text x="56" y="80" fill="#cccccc" font-size="11">変数ペア</text><rect x="120" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="162" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="204" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="246" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="288" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="330" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="372" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="414" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="456" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="498" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="540" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="582" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="624" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="666" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="708" y="60" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="120" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="162" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="204" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="246" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="288" y="92" width="36" height="24" rx="4" fill="#e91e63" opacity="0.95"/><rect x="330" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="372" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="414" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="456" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="498" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="540" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="582" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="624" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="666" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="708" y="92" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="120" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="162" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="204" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="246" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="288" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="330" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="372" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="414" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="456" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="498" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="540" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="582" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="624" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="666" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="708" y="124" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="120" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="162" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="204" y="156" width="36" height="24" rx="4" fill="#e91e63" opacity="0.95"/><rect x="246" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="288" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="330" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="372" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="414" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="456" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="498" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="540" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="582" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="624" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="666" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="708" y="156" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="120" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="162" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="204" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="246" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="288" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="330" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="372" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="414" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="456" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="498" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="540" y="188" width="36" height="24" rx="4" fill="#e91e63" opacity="0.95"/><rect x="582" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="624" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="666" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="708" y="188" width="36" height="24" rx="4" fill="#4caf50" opacity="0.8"/><rect x="30" y="268" width="740" height="26" rx="6" fill="#1a1a2e"/><text x="120" y="284" fill="#4caf50" font-size="11">p ≥ 0.05（非有意）</text><rect x="390" y="271" width="14" height="14" rx="3" fill="#e91e63"/><text x="410" y="284" fill="#e91e63" font-size="11">p &lt; 0.05（有意！）← 偶然</text><text x="400" y="330" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">データが大きいほど偶然の「発見」が増える</text></svg>


---

# 因果グラフ（DAG）で考える

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><text x="400" y="32" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">有向非巡回グラフ（DAG）による因果構造の表現</text><ellipse cx="130" cy="110" rx="90" ry="38" fill="#2d2d5e" stroke="#f9a825" stroke-width="2"/><text x="130" y="106" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">教育年数</text><text x="130" y="124" text-anchor="middle" fill="#cccccc" font-size="11">(X)</text><ellipse cx="400" cy="110" rx="90" ry="38" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="2"/><text x="400" y="106" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">年収</text><text x="400" y="124" text-anchor="middle" fill="#cccccc" font-size="11">(Y)</text><ellipse cx="670" cy="110" rx="90" ry="38" fill="#2d2d5e" stroke="#e91e63" stroke-width="2"/><text x="670" y="106" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">家庭の裕福さ</text><text x="670" y="124" text-anchor="middle" fill="#cccccc" font-size="11">(Z：交絡)</text><ellipse cx="265" cy="260" rx="90" ry="38" fill="#2d2d5e" stroke="#4caf50" stroke-width="2"/><text x="265" y="256" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">職種</text><text x="265" y="274" text-anchor="middle" fill="#cccccc" font-size="11">(M：媒介)</text><ellipse cx="535" cy="260" rx="90" ry="38" fill="#2d2d5e" stroke="#4caf50" stroke-width="2"/><text x="535" y="256" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">社会的地位</text><text x="535" y="274" text-anchor="middle" fill="#cccccc" font-size="11">(M：媒介)</text><line x1="220" y1="110" x2="305" y2="110" stroke="#f9a825" stroke-width="2"/><polygon points="305,104 320,110 305,116" fill="#f9a825"/><line x1="580" y1="110" x2="495" y2="110" stroke="#e91e63" stroke-width="2"/><polygon points="495,104 480,110 495,116" fill="#e91e63"/><line x1="580" y1="130" x2="300" y2="245" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/><polygon points="297,243 295,258 308,248" fill="#e91e63"/><line x1="175" y1="140" x2="235" y2="228" stroke="#f9a825" stroke-width="1.5"/><polygon points="231,226 230,241 243,232" fill="#f9a825"/><line x1="355" y1="140" x2="510" y2="228" stroke="#4fc3f7" stroke-width="1.5"/><polygon points="508,226 515,240 520,228" fill="#4fc3f7"/><line x1="355" y1="110" x2="295" y2="246" stroke="#f9a825" stroke-width="1.5"/><polygon points="292,244 292,258 305,249" fill="#f9a825"/><text x="400" y="345" text-anchor="middle" fill="#cccccc" font-size="12">DAGを描くことで「どの変数を制御すべきか」が明確になる</text></svg>


---

# 因果推論の方法論（1/2）

> *RCT・DiD・操作変数法が観察データから因果を取り出す*

- **「Gold Standard」：ランダム化比較試験（RCT）**
- - 参加者をランダムに介入群と対照群に分ける
- - 薬の臨床試験・政策評価で標準的
- - ただし倫理上・コスト上できない場合が多い
- ---
- **観察データからの因果推論（Judea Pearl）：**
- - 操作変数法（IV）：外生的な変動を利用


---

# RCT vs 観察研究：比較図

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><text x="200" y="38" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">RCT（ランダム化比較試験）</text><text x="600" y="38" text-anchor="middle" fill="#4fc3f7" font-size="15" font-weight="bold">観察研究</text><line x1="400" y1="20" x2="400" y2="370" stroke="#444" stroke-width="1" stroke-dasharray="4,4"/><rect x="30" y="55" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#f9a825" stroke-width="1.5"/><text x="200" y="80" text-anchor="middle" fill="#ffffff" font-size="12">参加者を完全ランダムに割り当て</text><text x="200" y="98" text-anchor="middle" fill="#cccccc" font-size="11">→ 交絡因子が均等に分散される</text><rect x="430" y="55" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="1.5"/><text x="600" y="80" text-anchor="middle" fill="#ffffff" font-size="12">実際の行動・状況を記録</text><text x="600" y="98" text-anchor="middle" fill="#cccccc" font-size="11">→ 交絡因子が残りやすい</text><rect x="30" y="130" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#f9a825" stroke-width="1.5"/><text x="200" y="155" text-anchor="middle" fill="#ffffff" font-size="12">因果効果を直接推定できる</text><text x="200" y="173" text-anchor="middle" fill="#cccccc" font-size="11">（内部妥当性が高い）</text><rect x="430" y="130" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="1.5"/><text x="600" y="155" text-anchor="middle" fill="#ffffff" font-size="12">大規模・長期データが取れる</text><text x="600" y="173" text-anchor="middle" fill="#cccccc" font-size="11">（外部妥当性が高い場合も）</text><rect x="30" y="205" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#e91e63" stroke-width="1.5"/><text x="200" y="230" text-anchor="middle" fill="#e91e63" font-size="12">倫理上・コスト上の制約大</text><text x="200" y="248" text-anchor="middle" fill="#cccccc" font-size="11">（喫煙・貧困などで実施不可）</text><rect x="430" y="205" width="340" height="55" rx="10" fill="#2d2d5e" stroke="#e91e63" stroke-width="1.5"/><text x="600" y="230" text-anchor="middle" fill="#e91e63" font-size="12">交絡バイアスのリスク</text><text x="600" y="248" text-anchor="middle" fill="#cccccc" font-size="11">（統計的手法で対処が必要）</text><rect x="100" y="300" width="600" height="50" rx="10" fill="#f9a82522" stroke="#f9a825" stroke-width="1.5"/><text x="400" y="323" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">理想：RCTで検証 + 観察研究で外部妥当性を確認</text><text x="400" y="342" text-anchor="middle" fill="#cccccc" font-size="11">観察データのみの場合 → IV法・DiD・RDDなどで因果を推定</text></svg>


---

# 差分の差分法（DiD）：政策効果の推定

- <svg viewBox="0 0 800 350" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="350" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">政策施行前後の比較（DiD：差分の差分法）</text><line x1="60" y1="300" x2="740" y2="300" stroke="#555" stroke-width="1.5"/><line x1="60" y1="300" x2="60" y2="50" stroke="#555" stroke-width="1.5"/><line x1="400" y1="295" x2="400" y2="305" stroke="#888" stroke-width="1.5"/><text x="400" y="318" text-anchor="middle" fill="#888" font-size="11">政策施行</text><text x="60" y="320" fill="#888" font-size="10">0</text><text x="720" y="320" fill="#888" font-size="10">時間</text><text x="30" y="55" fill="#888" font-size="10" transform="rotate(-90,30,55)">結果変数</text><line x1="100" y1="210" x2="400" y2="180" stroke="#4fc3f7" stroke-width="2.5"/><line x1="400" y1="180" x2="700" y2="100" stroke="#4fc3f7" stroke-width="2.5"/><text x="710" y="98" fill="#4fc3f7" font-size="12" font-weight="bold">介入群</text><line x1="100" y1="240" x2="400" y2="210" stroke="#cccccc" stroke-width="2.5" stroke-dasharray="6,4"/><line x1="400" y1="210" x2="700" y2="180" stroke="#cccccc" stroke-width="2.5" stroke-dasharray="6,4"/><text x="710" y="178" fill="#cccccc" font-size="12">対照群</text><line x1="400" y1="210" x2="700" y2="155" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/><text x="660" y="142" fill="#f9a825" font-size="11">反事実</text><line x1="700" y1="100" x2="700" y2="155" stroke="#e91e63" stroke-width="3"/><polygon points="694,155 700,168 706,155" fill="#e91e63"/><text x="715" y="132" fill="#e91e63" font-size="13" font-weight="bold">DiD</text><text x="715" y="148" fill="#e91e63" font-size="11">効果</text><rect x="120" y="260" width="560" height="28" rx="6" fill="#f9a82520" stroke="#f9a825" stroke-width="1"/><text x="400" y="279" text-anchor="middle" fill="#f9a825" font-size="12">DiD = (介入後 - 介入前)介入群 - (介入後 - 介入前)対照群</text></svg>


---

# Pearlの因果推論の梯子

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><rect x="200" y="290" width="400" height="60" rx="12" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="2"/><text x="400" y="316" text-anchor="middle" fill="#4fc3f7" font-size="15" font-weight="bold">Level 1：相関（Seeing）</text><text x="400" y="338" text-anchor="middle" fill="#cccccc" font-size="12">「AとBは一緒に動く？」統計・ML</text><rect x="200" y="185" width="400" height="60" rx="12" fill="#2d2d5e" stroke="#f9a825" stroke-width="2"/><text x="400" y="211" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">Level 2：介入（Doing）</text><text x="400" y="233" text-anchor="middle" fill="#cccccc" font-size="12">「Aを変えたらBはどうなる？」RCT・do-計算子</text><rect x="200" y="80" width="400" height="60" rx="12" fill="#2d2d5e" stroke="#e91e63" stroke-width="2"/><text x="400" y="106" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">Level 3：反事実（Imagining）</text><text x="400" y="128" text-anchor="middle" fill="#cccccc" font-size="12">「もしAでなければ？」因果推論の最高峰</text><line x1="400" y1="248" x2="400" y2="288" stroke="#cccccc" stroke-width="2"/><polygon points="394,285 400,295 406,285" fill="#cccccc"/><line x1="400" y1="143" x2="400" y2="183" stroke="#cccccc" stroke-width="2"/><polygon points="394,180 400,190 406,180" fill="#cccccc"/><text x="620" y="322" fill="#4fc3f7" font-size="11">動物・機械学習</text><text x="620" y="217" fill="#f9a825" font-size="11">人間・因果ML</text><text x="620" y="112" fill="#e91e63" font-size="11">人間のみ可能</text><text x="400" y="28" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">因果の梯子を登るほど、より深い「なぜ」に迫れる</text></svg>


---

# 機械学習と因果推論（1/2）

> *MLモデルは相関を学習するだけで因果を理解しない*

- **ML の課題：相関に過学習する**
- 画像認識モデルが「空の色」でコケを分類した事例
- 医療AIが「医療機器の存在」を患者の重症度と誤学習
- ---
- **分布シフト問題：**
- 訓練データと本番データの相関構造が変わると失敗する


---

# MLが相関バイアスにハマる仕組み

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="360" fill="#1a1a2e"/><rect x="30" y="40" width="340" height="130" rx="12" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="2"/><text x="200" y="65" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">訓練データ（病院A）</text><rect x="55" y="80" width="290" height="70" rx="8" fill="#2d2d5e"/><text x="200" y="105" text-anchor="middle" fill="#cccccc" font-size="12">患者が重症 → 医療機器が多い</text><text x="200" y="125" text-anchor="middle" fill="#f9a825" font-size="12">ML: 「機器の数 = 重症度」と学習</text><text x="200" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11">（偽相関を因果と誤認）</text><rect x="430" y="40" width="340" height="130" rx="12" fill="#3a1a1a" stroke="#e91e63" stroke-width="2"/><text x="600" y="65" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">本番環境（病院B）</text><rect x="455" y="80" width="290" height="70" rx="8" fill="#2d2d5e"/><text x="600" y="105" text-anchor="middle" fill="#cccccc" font-size="12">設備水準が異なる環境</text><text x="600" y="125" text-anchor="middle" fill="#e91e63" font-size="12">機器が少ない重症患者を</text><text x="600" y="145" text-anchor="middle" fill="#e91e63" font-size="11">「軽症」と誤分類 → 危険</text><line x1="370" y1="105" x2="430" y2="105" stroke="#888" stroke-width="2" stroke-dasharray="6,4"/><polygon points="428,99 442,105 428,111" fill="#888"/><text x="400" y="98" text-anchor="middle" fill="#888" font-size="11">配備</text><rect x="100" y="220" width="600" height="55" rx="10" fill="#2d2d5e" stroke="#4caf50" stroke-width="1.5"/><text x="400" y="245" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">解決策：因果構造を組み込む</text><text x="400" y="264" text-anchor="middle" fill="#cccccc" font-size="12">「機器の存在」ではなく「バイタルサイン」（真の原因）を特徴量に</text><text x="400" y="318" text-anchor="middle" fill="#cccccc" font-size="13">分布シフトに頑健なモデル = 相関ではなく因果を学ぶモデル</text></svg>


---

# 機械学習と因果推論（2/2）

> *因果を考慮しないMLは分布シフトで予測が崩壊する*

- 因果関係に基づくモデルはより頑健
- ---
- **因果ML（Causal ML）の台頭：**
- - DoWhy（Microsoft）
- - CausalML（Uber）
- - 「なぜ」を学習するAIへの転換


---

# まとめ：相関はヒント、因果は証明

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><rect x="30" y="20" width="360" height="60" rx="10" fill="#2d2d5e" stroke="#f9a825" stroke-width="1.5"/><text x="210" y="48" text-anchor="middle" fill="#f9a825" font-size="13">相関係数が高くても因果関係があるとは言えない</text><text x="210" y="67" text-anchor="middle" fill="#cccccc" font-size="11">r が高い = 交絡因子の可能性を調べる</text><rect x="410" y="20" width="360" height="60" rx="10" fill="#2d2d5e" stroke="#f9a825" stroke-width="1.5"/><text x="590" y="48" text-anchor="middle" fill="#f9a825" font-size="13">交絡因子を探すことが因果推論の第一歩</text><text x="590" y="67" text-anchor="middle" fill="#cccccc" font-size="11">DAGで因果構造を可視化する</text><rect x="30" y="110" width="360" height="60" rx="10" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="1.5"/><text x="210" y="138" text-anchor="middle" fill="#4fc3f7" font-size="13">RCT が最強、観察データでも推論可能</text><text x="210" y="157" text-anchor="middle" fill="#cccccc" font-size="11">IV・DiD・RDD などの準実験的手法</text><rect x="410" y="110" width="360" height="60" rx="10" fill="#2d2d5e" stroke="#4fc3f7" stroke-width="1.5"/><text x="590" y="138" text-anchor="middle" fill="#4fc3f7" font-size="13">AIも相関に騙される</text><text x="590" y="157" text-anchor="middle" fill="#cccccc" font-size="11">因果を学ぶ AI が次の課題（Causal ML）</text><rect x="150" y="210" width="500" height="50" rx="12" fill="#f9a82520" stroke="#f9a825" stroke-width="2"/><text x="400" y="233" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">「相関は証拠。因果は論証。</text><text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">この違いが科学を科学たらしめる」</text></svg>

