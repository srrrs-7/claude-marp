---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "アリのコロニーに学ぶ分散システム"
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
  
  section {
    font-size: 1.05em;
  }
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section.center {
    text-align: center;
  }
  section table {
    font-size: 0.85em;
  }
  
---

<!-- _class: lead -->
# アリのコロニーに学ぶ分散システム

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><circle cx="400" cy="200" r="60" fill="#f9a825"/><text x="400" y="196" text-anchor="middle" fill="#1a1a2e" font-size="16" font-weight="bold">コロニー</text><text x="400" y="214" text-anchor="middle" fill="#1a1a2e" font-size="13">知性の源</text><circle cx="160" cy="100" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="160" y="105" text-anchor="middle" fill="#ffffff" font-size="11">アリA</text><line x1="182" y1="112" x2="342" y2="168" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><circle cx="640" cy="100" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="640" y="105" text-anchor="middle" fill="#ffffff" font-size="11">アリB</text><line x1="618" y1="112" x2="458" y2="168" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><circle cx="100" cy="280" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="100" y="285" text-anchor="middle" fill="#ffffff" font-size="11">アリC</text><line x1="122" y1="272" x2="342" y2="225" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><circle cx="700" cy="280" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="700" y="285" text-anchor="middle" fill="#ffffff" font-size="11">アリD</text><line x1="678" y1="272" x2="458" y2="225" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><circle cx="400" cy="340" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="345" text-anchor="middle" fill="#ffffff" font-size="11">アリE</text><line x1="400" y1="318" x2="400" y2="260" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,3"/><text x="400" y="30" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="bold">自律分散 = コロニーの知恵</text></svg>
- **女王は命令していない**
- 
- 創発・P2P設計・自己組織化の原理を自然から学ぶ
- 
- 180分 ワークショップ

<!--
オープニング。衝撃的な事実からスタートして興味を引く。
-->

---

# 女王は命令していない（1/2）

- <svg viewBox='0 0 780 340' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='340' fill='#1a1a2e' rx='12'/>
-   <text x='390' y='38' text-anchor='middle' font-size='20' font-weight='bold' fill='#e94560'>よくある誤解</text>
-   <rect x='40' y='55' width='320' height='120' rx='10' fill='#16213e' stroke='#e94560' stroke-width='2'/>
-   <text x='200' y='82' text-anchor='middle' font-size='14' fill='#e94560' font-weight='bold'>❌ 中央集権モデル（誤解）</text>
-   <text x='60' y='108' font-size='13' fill='#aaa'>女王アリ</text>
-   <text x='60' y='128' font-size='13' fill='#aaa'>　└ 命令 → 働きアリA</text>
-   <text x='60' y='148' font-size='13' fill='#aaa'>　└ 命令 → 働きアリB</text>
-   <text x='60' y='168' font-size='13' fill='#aaa'>　└ 命令 → 働きアリC</text>
-   <rect x='420' y='55' width='320' height='120' rx='10' fill='#0f3460' stroke='#00b4d8' stroke-width='2'/>

<!--
女王アリは実際には命令を出していない。産卵に専念するだけ。コロニー全体の知性は個々の単純なルールから生まれる。
-->

---

# 女王は命令していない（2/2）

-   <text x='580' y='82' text-anchor='middle' font-size='14' fill='#00b4d8' font-weight='bold'>✅ 分散自律モデル（実態）</text>
-   <text x='440' y='108' font-size='13' fill='#aaa'>女王アリ = 産卵専門（命令なし）</text>
-   <text x='440' y='128' font-size='13' fill='#aaa'>働きアリA ⇄ フェロモン ⇄ 働きアリB</text>
-   <text x='440' y='148' font-size='13' fill='#aaa'>　　　　↕ 環境情報 ↕</text>
-   <text x='440' y='168' font-size='13' fill='#aaa'>働きアリC ⇄ フェロモン ⇄ 働きアリD</text>
-   <text x='390' y='210' text-anchor='middle' font-size='18' font-weight='bold' fill='#ffd166'>💡 コロニーの知性は「個々のルール」から創発する</text>
-   <rect x='60' y='230' width='660' height='80' rx='8' fill='#0f3460' opacity='0.7'/>
-   <text x='390' y='258' text-anchor='middle' font-size='14' fill='#e0e0e0'>アリ1匹の知能は低い。でも100万匹が集まると…</text>
-   <text x='390' y='282' text-anchor='middle' font-size='14' fill='#e0e0e0'>最短経路探索・食料調達・巣の温度管理・外敵撃退</text>
-   <text x='390' y='304' text-anchor='middle' font-size='13' fill='#00b4d8'>→ これが「創発（Emergence）」</text>
- </svg>

<!--
女王アリは実際には命令を出していない。産卵に専念するだけ。コロニー全体の知性は個々の単純なルールから生まれる。
-->

---

# アジェンダ（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><rect x="40" y="40" width="340" height="140" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="68" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Ch.1 アリのコロニーとは</text><text x="60" y="96" fill="#ffffff" font-size="12">- フェロモンコミュニケーション</text><text x="60" y="116" fill="#ffffff" font-size="12">- スティグマジー</text><text x="60" y="136" fill="#ffffff" font-size="12">- 役割の自発的分業</text><text x="60" y="156" fill="#ffffff" font-size="12">- 自己組織化と耐障害性</text><rect x="420" y="40" width="340" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="68" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">Ch.2 創発とは何か</text><text x="440" y="96" fill="#ffffff" font-size="12">- 創発の定義</text><text x="440" y="116" fill="#ffffff" font-size="12">- 単純ルール→複雑行動</text><text x="440" y="136" fill="#ffffff" font-size="12">- 創発の条件</text><text x="440" y="156" fill="#ffffff" font-size="12">- Boidsとの比較</text><rect x="40" y="220" width="340" height="140" rx="10" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="210" y="248" text-anchor="middle" fill="#00b4d8" font-size="14" font-weight="bold">Ch.3 分散システム翻訳</text><text x="60" y="276" fill="#ffffff" font-size="12">- コロニー↔システム対応</text><text x="60" y="296" fill="#ffffff" font-size="12">- P2P設計・Gossip</text><text x="60" y="316" fill="#ffffff" font-size="12">- CAP定理</text><text x="60" y="336" fill="#ffffff" font-size="12">- スケールアウト・耐障害性</text><rect x="420" y="220" width="340" height="140" rx="10" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="590" y="248" text-anchor="middle" fill="#7c4dff" font-size="14" font-weight="bold">Ch.4-6 事例・実践・まとめ</text><text x="440" y="276" fill="#ffffff" font-size="12">- Kafka, DynamoDB, k8s</text><text x="440" y="296" fill="#ffffff" font-size="12">- BitTorrent, Consul</text><text x="440" y="316" fill="#ffffff" font-size="12">- 設計実践・演習</text><text x="440" y="336" fill="#ffffff" font-size="12">- まとめ・Q&amp;A</text></svg>
- **Ch.1** アリのコロニーの実態（生物学的根拠）
- **Ch.2** 創発とは何か
- **Ch.3** 分散システムへの翻訳
- **Ch.4** 実際のシステム事例（Kafka・DynamoDB・K8s）


---

# アジェンダ（2/2）

- **Ch.5** 設計実践・ケーススタディ
- **Ch.6** まとめ・Q&A
- 
- > 🎯 目標: アリから学んだ設計原則を自分のシステムに適用できる


---

<!-- _class: lead -->
# Ch.1 アリのコロニーとは

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><circle cx="400" cy="180" r="80" fill="#f9a825" opacity="0.15"/><circle cx="400" cy="180" r="55" fill="#f9a825" opacity="0.25"/><circle cx="400" cy="180" r="30" fill="#f9a825"/><text x="400" y="185" text-anchor="middle" fill="#1a1a2e" font-size="13" font-weight="bold">コロニー</text><line x1="200" y1="80" x2="375" y2="155" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><circle cx="185" cy="70" r="15" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="185" y="75" text-anchor="middle" fill="#ffffff" font-size="10">偵察</text><line x1="550" y1="90" x2="428" y2="158" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><circle cx="565" cy="80" r="15" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="565" y="85" text-anchor="middle" fill="#ffffff" font-size="10">採食</text><line x1="180" y1="280" x2="372" y2="205" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><circle cx="165" cy="290" r="15" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="165" y="295" text-anchor="middle" fill="#ffffff" font-size="10">育児</text><line x1="600" y1="280" x2="428" y2="205" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><circle cx="615" cy="290" r="15" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/><text x="615" y="295" text-anchor="middle" fill="#ffffff" font-size="10">建設</text><text x="400" y="350" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">Chapter 1: アリのコロニーとは</text><text x="400" y="375" text-anchor="middle" fill="#aaaaaa" font-size="12">自律・分業・創発の源</text></svg>
- **生物学的根拠 — アリの実態を知る**
- 
- なぜ中央集権なしで、コロニーは最適解を見つけるのか


---

# アリのコロニーとは（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="35" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">コロニーの構成員</text><rect x="30" y="55" width="220" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">女王アリ</text><text x="50" y="104" fill="#aaaaaa" font-size="11">- 産卵のみ担当</text><text x="50" y="122" fill="#aaaaaa" font-size="11">- 命令は出さない</text><text x="50" y="140" fill="#aaaaaa" font-size="11">- 寿命: 数十年</text><text x="50" y="158" fill="#aaaaaa" font-size="11">- 1コロニー1匹</text><rect x="290" y="55" width="220" height="130" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">働きアリ</text><text x="310" y="104" fill="#aaaaaa" font-size="11">- 採食・育児・建設</text><text x="310" y="122" fill="#aaaaaa" font-size="11">- 自律的に役割決定</text><text x="310" y="140" fill="#aaaaaa" font-size="11">- 寿命: 数週間〜数ヶ月</text><text x="310" y="158" fill="#aaaaaa" font-size="11">- 数百〜数百万匹</text><rect x="550" y="55" width="220" height="130" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="660" y="80" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">雄アリ</text><text x="570" y="104" fill="#aaaaaa" font-size="11">- 交配のみ担当</text><text x="570" y="122" fill="#aaaaaa" font-size="11">- 交配後に死亡</text><text x="570" y="140" fill="#aaaaaa" font-size="11">- 季節限定で出現</text><text x="570" y="158" fill="#aaaaaa" font-size="11">- 一時的な存在</text><rect x="150" y="220" width="500" height="140" rx="8" fill="#0f3460" stroke="#7c4dff" stroke-width="1.5"/><text x="400" y="245" text-anchor="middle" fill="#7c4dff" font-size="13" font-weight="bold">コロニーの本質</text><text x="400" y="270" text-anchor="middle" fill="#ffffff" font-size="12">中央制御なし — 局所的なルールから全体知性が生まれる</text><text x="400" y="292" text-anchor="middle" fill="#ffffff" font-size="12">各個体は単純なアルゴリズムを実行しているだけ</text><text x="400" y="314" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">= 分散システムの完璧なモデル</text><text x="400" y="345" text-anchor="middle" fill="#aaaaaa" font-size="11">種によって1万〜2000万匹規模のコロニーを形成</text></svg>
- **規模と多様性**
- - 種類: 世界に約2万種、日本に約300種
- - コロニー規模: 数百〜2,000万匹（軍隊アリ）
- - 寿命: 女王アリ = 最長30年、働きアリ = 数週間〜数ヶ月
- 


---

# アリのコロニーとは（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">アリのコロニー vs 分散システム</text><rect x="30" y="50" width="360" height="310" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="76" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">アリのコロニー</text><text x="50" y="105" fill="#aaaaaa" font-size="12">個体: 働きアリ</text><text x="50" y="128" fill="#aaaaaa" font-size="12">通信: フェロモン</text><text x="50" y="151" fill="#aaaaaa" font-size="12">状態: 環境に記録</text><text x="50" y="174" fill="#aaaaaa" font-size="12">障害対応: 他が代替</text><text x="50" y="197" fill="#aaaaaa" font-size="12">意思決定: 多数決的収束</text><text x="50" y="220" fill="#aaaaaa" font-size="12">スケール: 自動的に拡張</text><text x="50" y="243" fill="#aaaaaa" font-size="12">リーダー: 存在しない</text><rect x="410" y="50" width="360" height="310" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="76" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">分散システム</text><text x="430" y="105" fill="#aaaaaa" font-size="12">個体: マイクロサービス</text><text x="430" y="128" fill="#aaaaaa" font-size="12">通信: メッセージング</text><text x="430" y="151" fill="#aaaaaa" font-size="12">状態: 分散KVストア</text><text x="430" y="174" fill="#aaaaaa" font-size="12">障害対応: レプリケーション</text><text x="430" y="197" fill="#aaaaaa" font-size="12">意思決定: Consensus</text><text x="430" y="220" fill="#aaaaaa" font-size="12">スケール: オートスケール</text><text x="430" y="243" fill="#aaaaaa" font-size="12">リーダー: Raft選出</text><line x1="400" y1="90" x2="400" y2="340" stroke="#7c4dff" stroke-width="1" stroke-dasharray="4,4"/><text x="400" y="330" text-anchor="middle" fill="#7c4dff" font-size="11">↕ 対応</text></svg>
- **役割の自律分担**
- - 女王アリ: 産卵専門（コロニーに1〜数匹）
- - 働きアリ: 採餌・巣作り・育児・警備（役割は自律的に切替）
- - 雄アリ: 交尾のみ（役割終了後は死亡）
- 
- > 🐜 1匹あたりの脳は約25万ニューロン（人間は860億）


---

# フェロモンコミュニケーション（1/2）

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#f8f9fa' rx='10'/>
-   <text x='390' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='#2d3436'>フェロモン経路の形成プロセス</text>
-   <rect x='20' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='130' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>① ランダム探索</text>
-   <text x='130' y='90' text-anchor='middle' font-size='11' fill='#636e72'>フェロモン痕跡なし</text>
-   <rect x='40' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>
-   <text x='70' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='160' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='190' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='100' y1='115' x2='130' y2='140' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <line x1='100' y1='115' x2='90' y2='160' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <line x1='100' y1='115' x2='140' y2='170' stroke='#636e72' stroke-width='1' stroke-dasharray='4,4'/>
-   <text x='130' y='220' text-anchor='middle' font-size='10' fill='#636e72'>バラバラに探索</text>
-   <rect x='280' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='390' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>② 発見・フェロモン付与</text>
-   <text x='390' y='90' text-anchor='middle' font-size='11' fill='#636e72'>食料を見つけたアリが痕跡</text>
-   <rect x='300' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>

<!--
フェロモンは揮発するため、短い経路ほど往復が早く濃度が高まる。これが正のフィードバックになり最短経路に収束する。
-->

---

# フェロモンコミュニケーション（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">フェロモン強度と経路選択</text><rect x="80" y="60" width="60" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="110" y="95" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">巣</text><rect x="660" y="60" width="60" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="690" y="95" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">餌場</text><path d="M140 90 Q250 40 400 50 Q550 60 660 90" stroke="#f9a825" stroke-width="6" fill="none" opacity="0.9"/><text x="400" y="42" text-anchor="middle" fill="#f9a825" font-size="11">強化された経路（多数が通過）</text><path d="M140 90 Q250 160 400 200 Q550 240 660 90" stroke="#aaaaaa" stroke-width="2" fill="none" opacity="0.5" stroke-dasharray="6,4"/><text x="400" y="230" text-anchor="middle" fill="#aaaaaa" font-size="11">使われなくなった迂回路（蒸発）</text><circle cx="200" cy="72" r="8" fill="#f9a825"/><circle cx="320" cy="54" r="8" fill="#f9a825"/><circle cx="480" cy="54" r="8" fill="#f9a825"/><circle cx="600" cy="72" r="8" fill="#f9a825"/><text x="400" y="290" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">正のフィードバックループ</text><rect x="120" y="310" width="200" height="60" rx="6" fill="#0f3460" stroke="#f9a825" stroke-width="1.5"/><text x="220" y="334" text-anchor="middle" fill="#f9a825" font-size="11">多くのアリが通る</text><text x="220" y="355" text-anchor="middle" fill="#ffffff" font-size="10">↓ フェロモン濃度UP</text><rect x="480" y="310" width="200" height="60" rx="6" fill="#0f3460" stroke="#e91e63" stroke-width="1.5"/><text x="580" y="334" text-anchor="middle" fill="#e91e63" font-size="11">最短経路が選ばれる</text><text x="580" y="355" text-anchor="middle" fill="#ffffff" font-size="10">↓ さらに多く通る</text><line x1="320" y1="340" x2="480" y2="340" stroke="#7c4dff" stroke-width="2"/><polygon points="478,334 490,340 478,346" fill="#7c4dff"/></svg>
-   <text x='330' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='420' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='450' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='360' y1='115' x2='420' y2='115' stroke='#fdcb6e' stroke-width='3'/>
-   <text x='390' y='148' text-anchor='middle' font-size='11' fill='#e17055'>フェロモン付与</text>
-   <text x='390' y='220' text-anchor='middle' font-size='10' fill='#636e72'>短い経路ほど</text>
-   <text x='390' y='235' text-anchor='middle' font-size='10' fill='#636e72'>フェロモン濃度高</text>
-   <rect x='540' y='45' width='220' height='250' rx='8' fill='#dfe6e9'/>
-   <text x='650' y='70' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>③ 最短経路に収束</text>
-   <text x='650' y='90' text-anchor='middle' font-size='11' fill='#636e72'>正のフィードバック</text>
-   <rect x='560' y='100' width='60' height='30' rx='5' fill='#74b9ff'/>
-   <text x='590' y='120' text-anchor='middle' font-size='11' fill='white'>巣</text>
-   <rect x='680' y='100' width='60' height='30' rx='5' fill='#55efc4'/>
-   <text x='710' y='120' text-anchor='middle' font-size='11' fill='white'>食料</text>
-   <line x1='620' y1='115' x2='680' y2='115' stroke='#e17055' stroke-width='6' opacity='0.8'/>
-   <text x='650' y='148' text-anchor='middle' font-size='11' fill='#e17055'>最短経路が強化</text>
-   <text x='650' y='200' text-anchor='middle' font-size='10' fill='#636e72'>全員がこの経路を</text>
-   <text x='650' y='215' text-anchor='middle' font-size='10' fill='#636e72'>たどるようになる</text>
-   <text x='390' y='305' text-anchor='middle' font-size='12' fill='#6c5ce7' font-weight='bold'>→ 中央制御なしで最適化が自律的に完了する</text>
- </svg>

<!--
フェロモンは揮発するため、短い経路ほど往復が早く濃度が高まる。これが正のフィードバックになり最短経路に収束する。
-->

---

# スティグマジー — 環境媒介型協調（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">スティグマジー: 環境を介した間接協調</text><rect x="60" y="60" width="200" height="120" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="160" y="86" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">アリAの行動</text><text x="80" y="110" fill="#aaaaaa" font-size="11">環境に痕跡を残す</text><text x="80" y="130" fill="#aaaaaa" font-size="11">（フェロモン分泌）</text><text x="80" y="150" fill="#aaaaaa" font-size="11">直接通信なし</text><rect x="300" y="60" width="200" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="86" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">環境（土・空気）</text><text x="320" y="110" fill="#aaaaaa" font-size="11">痕跡を蓄積・保持</text><text x="320" y="130" fill="#aaaaaa" font-size="11">時間で蒸発（減衰）</text><text x="320" y="150" fill="#aaaaaa" font-size="11">共有メモリとして機能</text><rect x="540" y="60" width="200" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="640" y="86" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">アリBの反応</text><text x="560" y="110" fill="#aaaaaa" font-size="11">環境の痕跡を読む</text><text x="560" y="130" fill="#aaaaaa" font-size="11">行動を調整する</text><text x="560" y="150" fill="#aaaaaa" font-size="11">再度痕跡を強化</text><line x1="260" y1="120" x2="300" y2="120" stroke="#00b4d8" stroke-width="2"/><polygon points="298,114 310,120 298,126" fill="#00b4d8"/><line x1="500" y1="120" x2="540" y2="120" stroke="#e91e63" stroke-width="2"/><polygon points="538,114 550,120 538,126" fill="#e91e63"/><rect x="160" y="230" width="480" height="130" rx="10" fill="#0f3460" stroke="#7c4dff" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#7c4dff" font-size="13" font-weight="bold">分散システムとの対応</text><text x="200" y="285" fill="#ffffff" font-size="12">スティグマジー</text><text x="480" y="285" fill="#ffffff" font-size="12">分散システム</text><text x="200" y="308" fill="#aaaaaa" font-size="11">環境（土/空気）</text><text x="480" y="308" fill="#aaaaaa" font-size="11">分散KVストア / メッセージキュー</text><text x="200" y="330" fill="#aaaaaa" font-size="11">痕跡の蒸発</text><text x="480" y="330" fill="#aaaaaa" font-size="11">TTL / イベント期限切れ</text><line x1="395" y1="270" x2="395" y2="340" stroke="#7c4dff" stroke-width="1" stroke-dasharray="3,3"/></svg>
- **スティグマジー（Stigmergy）とは**
- - 「環境に痕跡を残す」ことで間接的に協調する仕組み
- - 誰かが状態を見て次の行動を決める（直接通信不要）
- 
- **アリの巣の建設**
- - アリAが土を運んで置く → 環境が変化


---

# スティグマジー — 環境媒介型協調（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">スティグマジーの実装パターン</text><rect x="30" y="55" width="350" height="150" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="205" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">イベントソーシング</text><text x="50" y="106" fill="#aaaaaa" font-size="11">イベントログ = 環境への痕跡</text><text x="50" y="126" fill="#aaaaaa" font-size="11">サービスはイベントを発行・購読</text><text x="50" y="146" fill="#aaaaaa" font-size="11">直接通信なしで状態共有</text><text x="50" y="166" fill="#aaaaaa" font-size="11">例: Kafka Topic</text><rect x="420" y="55" width="350" height="150" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">ブラックボード型アーキテクチャ</text><text x="440" y="106" fill="#aaaaaa" font-size="11">共有データストア = 環境</text><text x="440" y="126" fill="#aaaaaa" font-size="11">各サービスが読み書きして協調</text><text x="440" y="146" fill="#aaaaaa" font-size="11">疎結合・非同期</text><text x="440" y="166" fill="#aaaaaa" font-size="11">例: Redis / DynamoDB</text><rect x="30" y="240" width="740" height="130" rx="8" fill="#0f3460" stroke="#00b4d8" stroke-width="2"/><text x="400" y="268" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">スティグマジーのメリット</text><text x="60" y="296" fill="#ffffff" font-size="12">1. 送信者と受信者が同時にオンラインである必要がない</text><text x="60" y="318" fill="#ffffff" font-size="12">2. 通信相手を知らなくてよい（超疎結合）</text><text x="60" y="340" fill="#ffffff" font-size="12">3. システム全体の状態が「環境」に自然と蓄積される</text></svg>
- - アリBがその変化を感知して続きを建設
- - 設計図も指示も不要で巣が完成
- 
- **工学への示唆**
- - イベントソーシング: イベントログが「環境の痕跡」
- - 共有キュー: タスクを置いた状態が「スティグマジー信号」
- - Git: コミットログが「分散協調の痕跡」


---

# 役割の自発的分業（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">閾値モデルによる役割分担</text><rect x="30" y="50" width="360" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="76" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">役割割り当てプロセス</text><rect x="50" y="90" width="320" height="55" rx="6" fill="#0f3460"/><text x="210" y="114" text-anchor="middle" fill="#ffffff" font-size="11">タスク刺激の検知</text><text x="210" y="132" text-anchor="middle" fill="#aaaaaa" font-size="10">（ゴミが溜まっている / 幼虫が空腹）</text><line x1="210" y1="145" x2="210" y2="165" stroke="#f9a825" stroke-width="1.5"/><polygon points="203,163 210,175 217,163" fill="#f9a825"/><rect x="50" y="175" width="320" height="55" rx="6" fill="#0f3460"/><text x="210" y="199" text-anchor="middle" fill="#ffffff" font-size="11">個体固有の閾値と比較</text><text x="210" y="217" text-anchor="middle" fill="#aaaaaa" font-size="10">（刺激 ≥ 閾値 → 行動する）</text><line x1="210" y1="230" x2="210" y2="250" stroke="#f9a825" stroke-width="1.5"/><polygon points="203,248 210,260 217,248" fill="#f9a825"/><rect x="50" y="260" width="320" height="55" rx="6" fill="#0f3460"/><text x="210" y="284" text-anchor="middle" fill="#ffffff" font-size="11">タスク実行で刺激減少</text><text x="210" y="302" text-anchor="middle" fill="#aaaaaa" font-size="10">（他のアリは別のタスクへ）</text><rect x="420" y="50" width="360" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="76" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">マイクロサービスへの翻訳</text><text x="440" y="106" fill="#aaaaaa" font-size="12">閾値 → サービスのキャパシティ設定</text><text x="440" y="130" fill="#aaaaaa" font-size="12">刺激 → キューの深さ/メトリクス</text><text x="440" y="154" fill="#aaaaaa" font-size="12">行動 → オートスケールのトリガー</text><text x="440" y="178" fill="#aaaaaa" font-size="12">役割変化 → 動的タスクルーティング</text><text x="440" y="225" fill="#ffffff" font-size="12">例: Kubernetes HPA</text><text x="440" y="248" fill="#aaaaaa" font-size="11">CPU使用率（刺激）が閾値超過</text><text x="440" y="268" fill="#aaaaaa" font-size="11">→ Podが自動追加（役割分担）</text><text x="440" y="288" fill="#aaaaaa" font-size="11">→ 負荷が分散（刺激減少）</text></svg>
- **指示なく役割が決まる仕組み**
- - 遺伝子の閾値モデル: 各個体が異なる「反応しきい値」を持つ
- - 採餌が必要 → 閾値の低いアリが先に反応して採餌に出る
- - 残った仕事 → 次に閾値の低いアリが担当
- 
- **動的役割切替**


---

# 役割の自発的分業（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">動的ロードバランシング</text><rect x="30" y="55" width="100" height="60" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="80" y="91" text-anchor="middle" fill="#f9a825" font-size="11">ゲートウェイ</text><line x1="130" y1="85" x2="180" y2="85" stroke="#f9a825" stroke-width="2"/><polygon points="178,79 190,85 178,91" fill="#f9a825"/><rect x="190" y="55" width="100" height="55" rx="6" fill="#0f3460" stroke="#e91e63" stroke-width="2"/><text x="240" y="87" text-anchor="middle" fill="#ffffff" font-size="11">Worker1</text><text x="240" y="102" text-anchor="middle" fill="#e91e63" font-size="10">高負荷</text><rect x="190" y="130" width="100" height="55" rx="6" fill="#16213e" stroke="#00b4d8" stroke-width="1.5"/><text x="240" y="162" text-anchor="middle" fill="#ffffff" font-size="11">Worker2</text><text x="240" y="177" text-anchor="middle" fill="#00b4d8" font-size="10">中負荷</text><rect x="190" y="205" width="100" height="55" rx="6" fill="#16213e" stroke="#00b4d8" stroke-width="1.5"/><text x="240" y="237" text-anchor="middle" fill="#ffffff" font-size="11">Worker3</text><text x="240" y="252" text-anchor="middle" fill="#00b4d8" font-size="10">低負荷</text><line x1="130" y1="85" x2="130" y2="232" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="130" y1="157" x2="190" y2="157" stroke="#f9a825" stroke-width="1.5"/><polygon points="188,151 200,157 188,163" fill="#f9a825"/><line x1="130" y1="232" x2="190" y2="232" stroke="#f9a825" stroke-width="1.5"/><polygon points="188,226 200,232 188,238" fill="#f9a825"/><rect x="350" y="55" width="420" height="300" rx="10" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="560" y="80" text-anchor="middle" fill="#7c4dff" font-size="13" font-weight="bold">アリ型ロードバランシングの原理</text><text x="370" y="110" fill="#f9a825" font-size="12" font-weight="bold">中央制御なし</text><text x="370" y="133" fill="#aaaaaa" font-size="11">各Workerが自分の負荷を報告</text><text x="370" y="155" fill="#f9a825" font-size="12" font-weight="bold">フェロモン = メトリクス</text><text x="370" y="178" fill="#aaaaaa" font-size="11">負荷情報を環境（サービスメッシュ）に公開</text><text x="370" y="200" fill="#f9a825" font-size="12" font-weight="bold">正のフィードバック</text><text x="370" y="223" fill="#aaaaaa" font-size="11">空きWorkerに優先的にルーティング</text><text x="370" y="245" fill="#f9a825" font-size="12" font-weight="bold">蒸発 = TTL</text><text x="370" y="268" fill="#aaaaaa" font-size="11">古い負荷情報は自動的に無効化</text><text x="370" y="305" fill="#ffffff" font-size="11">実装例: Envoy/Istio のメトリクスベースLB</text><text x="370" y="330" fill="#ffffff" font-size="11">実装例: Consul ヘルスチェック</text></svg>
- - 採餌班が全滅 → 育児班が採餌に切替（コスト最小化）
- - コロニー全体の状態に応じて自律的に最適化
- 
- **分散システムへの示唆**
- - コンシューマーグループの自動リバランス（Kafka）
- - Pod の自動スケジューリング（Kubernetes）
- - ヘルスチェック失敗時の自動フェイルオーバー


---

# 自己組織化と耐障害性（1/2）

- <svg viewBox='0 0 780 300' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='300' fill='#f8f9fa' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#2d3436'>耐障害性：コロニーは一部崩壊しても機能する</text>
-   <rect x='20' y='45' width='360' height='110' rx='8' fill='#ffeaa7'/>
-   <text x='200' y='68' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>障害発生前</text>
-   <circle cx='80' cy='110' r='18' fill='#74b9ff'/>
-   <text x='80' y='115' text-anchor='middle' font-size='10' fill='white'>採餌</text>
-   <circle cx='140' cy='90' r='18' fill='#55efc4'/>
-   <text x='140' y='95' text-anchor='middle' font-size='10' fill='white'>育児</text>
-   <circle cx='200' cy='120' r='18' fill='#fd79a8'/>
-   <text x='200' y='125' text-anchor='middle' font-size='10' fill='white'>建設</text>
-   <circle cx='260' cy='95' r='18' fill='#a29bfe'/>
-   <text x='260' y='100' text-anchor='middle' font-size='10' fill='white'>警備</text>
-   <circle cx='320' cy='115' r='18' fill='#74b9ff'/>
-   <text x='320' y='120' text-anchor='middle' font-size='10' fill='white'>採餌</text>
-   <text x='200' y='148' text-anchor='middle' font-size='11' fill='#636e72'>全役割が正常稼働中</text>
-   <rect x='400' y='45' width='360' height='110' rx='8' fill='#fab1a0'/>

<!--
コロニーは中央指揮なしで障害に対応する。このレジリエンスこそが分散システム設計の目標。
-->

---

# 自己組織化と耐障害性（2/2）

-   <text x='580' y='68' text-anchor='middle' font-size='13' font-weight='bold' fill='#2d3436'>採餌班 50% 死亡後</text>
-   <circle cx='460' cy='110' r='18' fill='#b2bec3'/>
-   <text x='460' y='115' text-anchor='middle' font-size='10' fill='white'>死亡</text>
-   <circle cx='520' cy='90' r='18' fill='#55efc4'/>
-   <text x='520' y='95' text-anchor='middle' font-size='10' fill='white'>育児</text>
-   <circle cx='580' cy='120' r='18' fill='#fd79a8'/>
-   <text x='580' y='125' text-anchor='middle' font-size='10' fill='white'>建設</text>
-   <circle cx='640' cy='95' r='18' fill='#a29bfe'/>
-   <text x='640' y='100' text-anchor='middle' font-size='10' fill='white'>警備</text>
-   <circle cx='700' cy='115' r='18' fill='#b2bec3'/>
-   <text x='700' y='120' text-anchor='middle' font-size='10' fill='white'>死亡</text>
-   <text x='580' y='148' text-anchor='middle' font-size='11' fill='#d63031'>採餌班が半減</text>
-   <text x='390' y='188' text-anchor='middle' font-size='20' fill='#2d3436'>↓ 自律対応</text>
-   <rect x='200' y='208' width='380' height='60' rx='8' fill='#00b894' opacity='0.2' stroke='#00b894' stroke-width='2'/>
-   <text x='390' y='232' text-anchor='middle' font-size='13' fill='#00b894' font-weight='bold'>育児班・建設班が採餌に切替 → コロニー存続</text>
-   <text x='390' y='256' text-anchor='middle' font-size='12' fill='#636e72'>指示なし・リーダーなし・SPOF なし</text>
-   <text x='390' y='284' text-anchor='middle' font-size='12' fill='#6c5ce7' font-weight='bold'>→ これが Chaos Engineering の自然界版</text>
- </svg>

<!--
コロニーは中央指揮なしで障害に対応する。このレジリエンスこそが分散システム設計の目標。
-->

---

<!-- _class: lead -->
# Ch.2 創発とは何か

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><circle cx="400" cy="190" r="70" fill="#e91e63" opacity="0.15"/><circle cx="400" cy="190" r="45" fill="#e91e63" opacity="0.25"/><circle cx="400" cy="190" r="22" fill="#e91e63"/><text x="400" y="195" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">創発</text><circle cx="200" cy="130" r="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="135" text-anchor="middle" fill="#f9a825" font-size="10">個体A</text><circle cx="600" cy="130" r="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="135" text-anchor="middle" fill="#f9a825" font-size="10">個体B</text><circle cx="200" cy="260" r="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="265" text-anchor="middle" fill="#f9a825" font-size="10">個体C</text><circle cx="600" cy="260" r="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="265" text-anchor="middle" fill="#f9a825" font-size="10">個体D</text><line x1="218" y1="138" x2="378" y2="178" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="582" y1="138" x2="422" y2="178" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="218" y1="252" x2="378" y2="202" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="582" y1="252" x2="422" y2="202" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><text x="400" y="320" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">1+1+1+1 > 4</text><text x="400" y="350" text-anchor="middle" fill="#aaaaaa" font-size="12">部分の総和を超える全体の性質</text><text x="400" y="378" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">Chapter 2: 創発とは何か</text></svg>
- **Emergence — 部分の総和を超える全体**
- 
- 単純なルールが複雑な知性を生む仕組み


---

# 創発（Emergence）の定義（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">創発: 階層的に現れる新性質</text><rect x="30" y="50" width="740" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">レベル3: システム全体</text><text x="400" y="104" text-anchor="middle" fill="#ffffff" font-size="12">最適経路探索・集合知・問題解決能力（個体には存在しない）</text><rect x="80" y="170" width="640" height="75" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="196" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">レベル2: グループ相互作用</text><text x="400" y="220" text-anchor="middle" fill="#ffffff" font-size="12">フェロモン経路・分業パターン・群れ行動</text><rect x="200" y="275" width="400" height="75" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="400" y="301" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">レベル1: 個体</text><text x="400" y="325" text-anchor="middle" fill="#ffffff" font-size="12">単純な刺激-反応ルール 5〜7種類のみ</text><line x1="400" y1="140" x2="400" y2="170" stroke="#7c4dff" stroke-width="2"/><polygon points="393,168 400,180 407,168" fill="#7c4dff"/><line x1="400" y1="245" x2="400" y2="275" stroke="#7c4dff" stroke-width="2"/><polygon points="393,273 400,285 407,273" fill="#7c4dff"/></svg>
- **創発とは**
- - 個々の要素の性質からは予測できない
- - 全体としての新しい性質・パターンが現れる現象
- - 上位レベルの制御なしに発生する
- 
- **創発の例**


---

# 創発（Emergence）の定義（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">創発 vs 集約 — 違いは？</text><rect x="30" y="55" width="360" height="150" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">創発的性質</text><text x="50" y="108" fill="#aaaaaa" font-size="12">- 個体レベルでは存在しない</text><text x="50" y="130" fill="#aaaaaa" font-size="12">- 予測不可能（設計されていない）</text><text x="50" y="152" fill="#aaaaaa" font-size="12">- 相互作用から生まれる</text><text x="50" y="174" fill="#aaaaaa" font-size="12">例: アリの最適経路、意識</text><rect x="420" y="55" width="360" height="150" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="600" y="80" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">集約的性質</text><text x="440" y="108" fill="#aaaaaa" font-size="12">- 個体の足し合わせ</text><text x="440" y="130" fill="#aaaaaa" font-size="12">- 予測可能（設計通り）</text><text x="440" y="152" fill="#aaaaaa" font-size="12">- 個体の総和</text><text x="440" y="174" fill="#aaaaaa" font-size="12">例: 総重量、総コスト</text><rect x="100" y="240" width="600" height="120" rx="8" fill="#0f3460" stroke="#7c4dff" stroke-width="2"/><text x="400" y="266" text-anchor="middle" fill="#7c4dff" font-size="13" font-weight="bold">分散システム設計への示唆</text><text x="400" y="294" text-anchor="middle" fill="#ffffff" font-size="12">創発を「設計する」のではなく「生まれやすい環境を整える」</text><text x="400" y="318" text-anchor="middle" fill="#f9a825" font-size="13">局所ルール + 相互作用 → 全体最適化</text><text x="400" y="344" text-anchor="middle" fill="#aaaaaa" font-size="11">中央制御を減らすほど創発が起きやすい</text></svg>
- - 🐜 アリのコロニー: 個体は愚かでも集合知が高い
- - 🐦 鳥の群れ（Murmuration）: 3ルールだけで複雑な動き
- - 🧠 意識: ニューロン単体に意識はないが脳全体には宿る
- - 🌐 インターネット: 個々のルーターは経路を知らない
- 
- > 「全体は部分の総和より大きい」— アリストテレス


---

# 単純ルール → 複雑行動（1/2）

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>アリの3つの基本ルール → コロニーの知性</text>
-   <rect x='20' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='132' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>Rule 1: フェロモン追従</text>
-   <text x='40' y='96' font-size='11' fill='#aaa'>if フェロモン検知:</text>
-   <text x='40' y='114' font-size='11' fill='#aaa'>  高濃度方向へ進む</text>
-   <text x='40' y='132' font-size='11' fill='#aaa'>else:</text>
-   <text x='40' y='150' font-size='11' fill='#aaa'>  ランダムウォーク</text>
-   <text x='132' y='195' text-anchor='middle' font-size='11' fill='#00b4d8'>→ 最短経路発見</text>
-   <rect x='277' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>Rule 2: 食料分配</text>
-   <text x='297' y='96' font-size='11' fill='#aaa'>if 食料持ち帰り:</text>
-   <text x='297' y='114' font-size='11' fill='#aaa'>  仲間に口移し</text>

<!--
たった3つの局所的なルールがコロニーレベルの知性を生む。これが創発の本質。
-->

---

# 単純ルール → 複雑行動（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">ACO アルゴリズム — 単純ルール4つ</text><rect x="30" y="55" width="360" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">ルール1: フェロモン追従</text><text x="50" y="106" fill="#aaaaaa" font-size="11">次ノードを確率的に選択</text><text x="50" y="126" fill="#aaaaaa" font-size="11">P(i→j) ∝ τᵢⱼᵅ × ηᵢⱼᵝ</text><text x="50" y="146" fill="#aaaaaa" font-size="11">τ=フェロモン量, η=ヒューリスティック</text><text x="50" y="166" fill="#aaaaaa" font-size="11">α,β でバランスを調整</text><rect x="410" y="55" width="360" height="130" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">ルール2: フェロモン付与</text><text x="430" y="106" fill="#aaaaaa" font-size="11">経路完了後に強化</text><text x="430" y="126" fill="#aaaaaa" font-size="11">Δτ = Q / Lₖ</text><text x="430" y="146" fill="#aaaaaa" font-size="11">Q=定数, L=経路長</text><text x="430" y="166" fill="#aaaaaa" font-size="11">短い経路ほど強く強化</text><rect x="30" y="225" width="360" height="130" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="210" y="250" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">ルール3: 蒸発</text><text x="50" y="276" fill="#aaaaaa" font-size="11">τᵢⱼ ← (1-ρ) × τᵢⱼ</text><text x="50" y="296" fill="#aaaaaa" font-size="11">ρ=蒸発率（0〜1）</text><text x="50" y="316" fill="#aaaaaa" font-size="11">古い解が忘れられる効果</text><text x="50" y="336" fill="#aaaaaa" font-size="11">局所最適からの脱出</text><rect x="410" y="225" width="360" height="130" rx="8" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="590" y="250" text-anchor="middle" fill="#7c4dff" font-size="12" font-weight="bold">ルール4: デーモン行動</text><text x="430" y="276" fill="#aaaaaa" font-size="11">グローバル最良解の強化</text><text x="430" y="296" fill="#aaaaaa" font-size="11">（ACS の場合）</text><text x="430" y="316" fill="#aaaaaa" font-size="11">中央集権的な補助的操作</text><text x="430" y="336" fill="#aaaaaa" font-size="11">収束速度を向上</text></svg>
-   <text x='297' y='132' font-size='11' fill='#aaa'>if 腹が減った:</text>
-   <text x='297' y='150' font-size='11' fill='#aaa'>  持っている個体を探す</text>
-   <text x='390' y='195' text-anchor='middle' font-size='11' fill='#ffd166'>→ 食料の最適分配</text>
-   <rect x='534' y='48' width='225' height='170' rx='10' fill='#16213e' stroke='#ff6b9d' stroke-width='2'/>
-   <text x='647' y='72' text-anchor='middle' font-size='13' font-weight='bold' fill='#ff6b9d'>Rule 3: 役割切替</text>
-   <text x='554' y='96' font-size='11' fill='#aaa'>if 仕事の需要 &gt; 閾値:</text>
-   <text x='554' y='114' font-size='11' fill='#aaa'>  その仕事を始める</text>
-   <text x='554' y='132' font-size='11' fill='#aaa'>if 需要 &lt; 閾値:</text>
-   <text x='554' y='150' font-size='11' fill='#aaa'>  他の仕事を探す</text>
-   <text x='647' y='195' text-anchor='middle' font-size='11' fill='#ff6b9d'>→ 自律的な分業</text>
-   <text x='390' y='240' text-anchor='middle' font-size='24' fill='#e0e0e0'>↓ 組み合わせると</text>
-   <rect x='100' y='258' width='580' height='48' rx='8' fill='#0f3460'/>
-   <text x='390' y='278' text-anchor='middle' font-size='14' fill='#e0e0e0' font-weight='bold'>最短経路探索 ＋ 食料最適分配 ＋ 耐障害性ある組織運営</text>
-   <text x='390' y='298' text-anchor='middle' font-size='12' fill='#00b4d8'>= 中央制御なしの高度な集合知</text>
- </svg>

<!--
たった3つの局所的なルールがコロニーレベルの知性を生む。これが創発の本質。
-->

---

# 創発の条件（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">創発が起きる4条件</text><rect x="30" y="55" width="360" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">1. 局所的相互作用</text><text x="50" y="106" fill="#aaaaaa" font-size="12">個体は近隣とのみ相互作用</text><text x="50" y="128" fill="#aaaaaa" font-size="12">大域的な情報は不要</text><text x="50" y="150" fill="#aaaaaa" font-size="12">例: フェロモン接触範囲内のアリ</text><text x="50" y="172" fill="#aaaaaa" font-size="12">→ P2P / ゴシッププロトコル</text><rect x="410" y="55" width="360" height="140" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="590" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">2. ポジティブフィードバック</text><text x="430" y="106" fill="#aaaaaa" font-size="12">良い行動が増幅される仕組み</text><text x="430" y="128" fill="#aaaaaa" font-size="12">フェロモン強化 → さらに追従</text><text x="430" y="150" fill="#aaaaaa" font-size="12">例: 人気経路がさらに強化</text><text x="430" y="172" fill="#aaaaaa" font-size="12">→ キャッシュヒット率向上</text><rect x="30" y="230" width="360" height="140" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="210" y="255" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">3. ネガティブフィードバック</text><text x="50" y="281" fill="#aaaaaa" font-size="12">暴走を防ぐ減衰機構</text><text x="50" y="303" fill="#aaaaaa" font-size="12">フェロモン蒸発で古い情報を忘却</text><text x="50" y="325" fill="#aaaaaa" font-size="12">→ TTL / レート制限</text><rect x="410" y="230" width="360" height="140" rx="8" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="590" y="255" text-anchor="middle" fill="#7c4dff" font-size="13" font-weight="bold">4. ランダム性</text><text x="430" y="281" fill="#aaaaaa" font-size="12">確率的な選択で多様性確保</text><text x="430" y="303" fill="#aaaaaa" font-size="12">局所最適からの脱出</text><text x="430" y="325" fill="#aaaaaa" font-size="12">→ ジッタ / カナリアリリース</text></svg>
- **創発が起きるための4条件**
- - **ローカル情報のみ**: 各エージェントは全体を知らない（局所的判断）
- - **非線形性**: 小さな変化が大きな効果を生む（フェロモンの蒸発・強化）
- - **正のフィードバック**: 成功した行動が増幅される（経路が強化される）
- - **負のフィードバック**: 暴走を防ぐ抑制機構（フェロモンの自然蒸発）
- 


---

# 創発の条件（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">創発条件のシステム実装対応表</text><rect x="30" y="50" width="740" height="50" rx="6" fill="#0f3460"/><text x="50" y="81" fill="#f9a825" font-size="12" font-weight="bold">創発条件</text><text x="250" y="81" fill="#f9a825" font-size="12" font-weight="bold">アリのコロニー</text><text x="500" y="81" fill="#f9a825" font-size="12" font-weight="bold">分散システム</text><rect x="30" y="100" width="740" height="50" rx="4" fill="#16213e"/><text x="50" y="131" fill="#ffffff" font-size="12">局所的相互作用</text><text x="250" y="131" fill="#aaaaaa" font-size="12">フェロモン接触</text><text x="500" y="131" fill="#aaaaaa" font-size="12">ゴシップ / P2P</text><rect x="30" y="152" width="740" height="50" rx="4" fill="#0f3460"/><text x="50" y="183" fill="#ffffff" font-size="12">ポジティブFB</text><text x="250" y="183" fill="#aaaaaa" font-size="12">経路強化</text><text x="500" y="183" fill="#aaaaaa" font-size="12">キャッシュ / CDN</text><rect x="30" y="204" width="740" height="50" rx="4" fill="#16213e"/><text x="50" y="235" fill="#ffffff" font-size="12">ネガティブFB</text><text x="250" y="235" fill="#aaaaaa" font-size="12">フェロモン蒸発</text><text x="500" y="235" fill="#aaaaaa" font-size="12">TTL / サーキットブレーカ</text><rect x="30" y="256" width="740" height="50" rx="4" fill="#0f3460"/><text x="50" y="287" fill="#ffffff" font-size="12">ランダム性</text><text x="250" y="287" fill="#aaaaaa" font-size="12">確率的選択</text><text x="500" y="287" fill="#aaaaaa" font-size="12">ジッタ / カオスエンジニアリング</text><rect x="30" y="330" width="740" height="45" rx="6" fill="#0f3460" stroke="#e91e63" stroke-width="1.5"/><text x="400" y="358" text-anchor="middle" fill="#e91e63" font-size="13">4条件が揃うと → 中央制御なしに全体最適化が達成される</text></svg>
- **反創発の条件（失敗パターン）**
- - 中央が全体を把握しようとする → スケールしない
- - フィードバックがない → 最適化されない
- - エージェントが同質すぎる → 多様性が失われる
- 
- > 🔑 ローカルルール ＋ フィードバックループ ＝ グローバル最適


---

# Boids（鳥の群れ）との比較

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">Boids vs ACO — 創発の2モデル</text><rect x="30" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="205" y="76" text-anchor="middle" fill="#00b4d8" font-size="13" font-weight="bold">Boids（鳥の群れ）</text><text x="50" y="105" fill="#f9a825" font-size="11" font-weight="bold">3ルール:</text><text x="50" y="127" fill="#aaaaaa" font-size="11">1. 分離: 近すぎたら離れる</text><text x="50" y="149" fill="#aaaaaa" font-size="11">2. 整列: 隣と同じ向きへ</text><text x="50" y="171" fill="#aaaaaa" font-size="11">3. 結合: 群れの中心へ</text><text x="50" y="205" fill="#f9a825" font-size="11" font-weight="bold">特徴:</text><text x="50" y="227" fill="#aaaaaa" font-size="11">- 位置・速度の連続更新</text><text x="50" y="249" fill="#aaaaaa" font-size="11">- 環境への痕跡なし</text><text x="50" y="271" fill="#aaaaaa" font-size="11">- 純粋に個体間の相互作用</text><text x="50" y="305" fill="#ffffff" font-size="11">例: TCP輻輳制御, サービスメッシュ</text><text x="50" y="325" fill="#ffffff" font-size="11">の隣接ノード調整</text><rect x="420" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="595" y="76" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ACO（蟻コロニー）</text><text x="440" y="105" fill="#e91e63" font-size="11" font-weight="bold">4ルール:</text><text x="440" y="127" fill="#aaaaaa" font-size="11">1. フェロモン追従</text><text x="440" y="149" fill="#aaaaaa" font-size="11">2. フェロモン付与</text><text x="440" y="171" fill="#aaaaaa" font-size="11">3. 蒸発（減衰）</text><text x="440" y="193" fill="#aaaaaa" font-size="11">4. 確率的探索</text><text x="440" y="227" fill="#e91e63" font-size="11" font-weight="bold">特徴:</text><text x="440" y="249" fill="#aaaaaa" font-size="11">- 環境に状態を記録</text><text x="440" y="271" fill="#aaaaaa" font-size="11">- 間接的な通信（スティグマジー）</text><text x="440" y="293" fill="#aaaaaa" font-size="11">- 最適化問題に強い</text><text x="440" y="327" fill="#ffffff" font-size="11">例: ルーティング最適化, CDN</text></svg>
- **創発の普遍性 — 同じ原理は至る所に**
- 
| 現象 | ルール数 | 結果 |
|------|----------|------|
| アリのコロニー | 3〜5 | 最短経路・分業・巣建設 |
| Boids（鳥の群れ） | 3 | 複雑な集団飛行 |
| ニューロン発火 | 単純なAND/OR | 思考・意識 |
| 株式市場 | 売買ルール | 価格形成・バブル |
| P2Pネットワーク | 接続ルール | 自律的ルーティング |
- 
- **Boids の3ルール（Craig Reynolds, 1987）**
- - Separation: 近すぎる仲間から離れる
- - Alignment: 近くの仲間と同じ方向に向く
- - Cohesion: 近くの仲間の中心に向かう


---

<!-- _class: lead -->
# Ch.3 分散システムへの翻訳

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><rect x="60" y="80" width="280" height="180" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="115" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">アリの世界</text><circle cx="200" cy="170" r="30" fill="#f9a825" opacity="0.3"/><text x="200" y="175" text-anchor="middle" fill="#f9a825" font-size="12">コロニー</text><text x="100" y="215" fill="#aaaaaa" font-size="11">フェロモン</text><text x="100" y="233" fill="#aaaaaa" font-size="11">役割分担</text><text x="100" y="251" fill="#aaaaaa" font-size="11">創発的行動</text><rect x="460" y="80" width="280" height="180" rx="12" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="115" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">システムの世界</text><circle cx="600" cy="170" r="30" fill="#e91e63" opacity="0.3"/><text x="600" y="175" text-anchor="middle" fill="#e91e63" font-size="12">クラスタ</text><text x="500" y="215" fill="#aaaaaa" font-size="11">メッセージング</text><text x="500" y="233" fill="#aaaaaa" font-size="11">マイクロサービス</text><text x="500" y="251" fill="#aaaaaa" font-size="11">自己修復</text><line x1="340" y1="170" x2="460" y2="170" stroke="#7c4dff" stroke-width="3"/><polygon points="452,163 465,170 452,177" fill="#7c4dff"/><text x="400" y="165" text-anchor="middle" fill="#7c4dff" font-size="12">翻訳</text><text x="400" y="340" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">Chapter 3: 分散システムへの翻訳</text></svg>
- **コロニーの原理をエンジニアリングに写像する**
- 
- アリの概念と分散システム設計の1:1マッピング


---

# コロニー ↔ 分散システム対応表（1/2）

- <svg viewBox='0 0 780 340' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='340' fill='#f8f9fa' rx='10'/>
-   <rect x='0' y='0' width='780' height='40' rx='10' fill='#2d3436'/>
-   <text x='195' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='white'>🐜 アリのコロニー</text>
-   <text x='390' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='#ffd166'>対応</text>
-   <text x='585' y='26' text-anchor='middle' font-size='14' font-weight='bold' fill='white'>💻 分散システム</text>
-   <line x1='390' y1='0' x2='390' y2='340' stroke='#dfe6e9' stroke-width='1'/>
-   <rect x='0' y='40' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='65' text-anchor='middle' font-size='12' fill='#2d3436'>フェロモン経路</text>
-   <text x='390' y='65' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='65' text-anchor='middle' font-size='12' fill='#2d3436'>イベントログ・メッセージキュー</text>
-   <rect x='0' y='80' width='780' height='40' fill='white'/>
-   <text x='195' y='105' text-anchor='middle' font-size='12' fill='#2d3436'>フェロモン蒸発</text>
-   <text x='390' y='105' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='105' text-anchor='middle' font-size='12' fill='#2d3436'>TTL・キャッシュ期限・ログローテーション</text>
-   <rect x='0' y='120' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='145' text-anchor='middle' font-size='12' fill='#2d3436'>スティグマジー</text>
-   <text x='390' y='145' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>

<!--
アリのコロニーが実装している概念は、現代の分散システムが目指しているものそのもの。
-->

---

# コロニー ↔ 分散システム対応表（2/2）

-   <text x='585' y='145' text-anchor='middle' font-size='12' fill='#2d3436'>イベントソーシング・共有キュー</text>
-   <rect x='0' y='160' width='780' height='40' fill='white'/>
-   <text x='195' y='185' text-anchor='middle' font-size='12' fill='#2d3436'>役割の閾値切替</text>
-   <text x='390' y='185' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='185' text-anchor='middle' font-size='12' fill='#2d3436'>コンシューマーリバランス・オートスケール</text>
-   <rect x='0' y='200' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='225' text-anchor='middle' font-size='12' fill='#2d3436'>女王なし・分散制御</text>
-   <text x='390' y='225' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='225' text-anchor='middle' font-size='12' fill='#2d3436'>リーダーレス設計・P2P</text>
-   <rect x='0' y='240' width='780' height='40' fill='white'/>
-   <text x='195' y='265' text-anchor='middle' font-size='12' fill='#2d3436'>局所情報のみで判断</text>
-   <text x='390' y='265' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='265' text-anchor='middle' font-size='12' fill='#2d3436'>ローカルキャッシュ・結果整合性</text>
-   <rect x='0' y='280' width='780' height='40' fill='#dfe6e9'/>
-   <text x='195' y='305' text-anchor='middle' font-size='12' fill='#2d3436'>一部死亡しても存続</text>
-   <text x='390' y='305' text-anchor='middle' font-size='12' fill='#e17055'>⟷</text>
-   <text x='585' y='305' text-anchor='middle' font-size='12' fill='#2d3436'>フォールトトレランス・Chaos Engineering</text>
-   <rect x='0' y='320' width='780' height='20' rx='0' fill='#6c5ce7' opacity='0.15'/>
-   <text x='390' y='334' text-anchor='middle' font-size='11' fill='#6c5ce7' font-weight='bold'>アリのコロニーは分散システムの自然界モデル</text>
- </svg>

<!--
アリのコロニーが実装している概念は、現代の分散システムが目指しているものそのもの。
-->

---

# P2P設計とは

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">中央集権 vs P2P設計</text><rect x="30" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="205" y="76" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">中央集権型</text><circle cx="205" cy="160" r="28" fill="#e91e63" opacity="0.4"/><text x="205" y="165" text-anchor="middle" fill="#ffffff" font-size="10">中央</text><circle cx="100" cy="100" r="14" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="100" y="105" text-anchor="middle" fill="#aaaaaa" font-size="9">N1</text><line x1="114" y1="106" x2="178" y2="140" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="310" cy="100" r="14" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="310" y="105" text-anchor="middle" fill="#aaaaaa" font-size="9">N2</text><line x1="296" y1="106" x2="232" y2="140" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="80" cy="240" r="14" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="80" y="245" text-anchor="middle" fill="#aaaaaa" font-size="9">N3</text><line x1="94" y1="234" x2="178" y2="175" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="330" cy="240" r="14" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="330" y="245" text-anchor="middle" fill="#aaaaaa" font-size="9">N4</text><line x1="316" y1="234" x2="232" y2="175" stroke="#aaaaaa" stroke-width="1.5"/><text x="205" y="305" text-anchor="middle" fill="#e91e63" font-size="11">SPOFリスク: 中央がダウン</text><text x="205" y="325" text-anchor="middle" fill="#e91e63" font-size="11">→ 全体が停止</text><rect x="420" y="50" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="595" y="76" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">P2P型（アリ型）</text><circle cx="500" cy="130" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="500" y="135" text-anchor="middle" fill="#f9a825" font-size="9">N1</text><circle cx="600" cy="100" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="105" text-anchor="middle" fill="#f9a825" font-size="9">N2</text><circle cx="690" cy="140" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="690" y="145" text-anchor="middle" fill="#f9a825" font-size="9">N3</text><circle cx="670" cy="230" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="670" y="235" text-anchor="middle" fill="#f9a825" font-size="9">N4</text><circle cx="555" cy="250" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="555" y="255" text-anchor="middle" fill="#f9a825" font-size="9">N5</text><circle cx="460" cy="215" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="460" y="220" text-anchor="middle" fill="#f9a825" font-size="9">N6</text><line x1="514" y1="130" x2="586" y2="106" stroke="#f9a825" stroke-width="1.5"/><line x1="614" y1="104" x2="676" y2="132" stroke="#f9a825" stroke-width="1.5"/><line x1="686" y1="154" x2="676" y2="218" stroke="#f9a825" stroke-width="1.5"/><line x1="658" y1="236" x2="569" y2="250" stroke="#f9a825" stroke-width="1.5"/><line x1="541" y1="252" x2="474" y2="228" stroke="#f9a825" stroke-width="1.5"/><line x1="462" y1="201" x2="496" y2="138" stroke="#f9a825" stroke-width="1.5"/><text x="575" y="305" text-anchor="middle" fill="#f9a825" font-size="11">SPOF なし: 一部障害でも</text><text x="575" y="325" text-anchor="middle" fill="#f9a825" font-size="11">→ 動作継続</text></svg>
- **中央集権 vs 分散 — 設計思想の根本的な違い**
- 
| 比較軸 | 中央集権（Master-Slave） | P2P（分散） |
|--------|--------------------------|-------------|
| 制御 | 単一のMasterが全制御 | 各ノードが自律判断 |
| SPOF | Masterがダウン = 全停止 | 一部障害は局所的 |
| スケール | Master がボトルネック | 線形スケール可能 |
| 一貫性 | 強整合性を保ちやすい | 結果整合性が基本 |
| 複雑性 | シンプルで理解しやすい | プロトコルが複雑 |
- 
- > 🐜 アリのコロニーはP2P設計の極致：女王が落ちてもコロニーは生き続ける


---

# Gossipプロトコル（1/2）

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>Gossipプロトコル ＝ フェロモン伝播の工学的実装</text>
-   <text x='195' y='56' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>Step 1: 情報発生</text>
-   <circle cx='80' cy='110' r='24' fill='#e17055'/>
-   <text x='80' y='115' text-anchor='middle' font-size='11' fill='white' font-weight='bold'>Node A</text>
-   <text x='80' y='148' text-anchor='middle' font-size='10' fill='#aaa'>状態変化を検知</text>
-   <circle cx='200' cy='90' r='20' fill='#636e72'/>
-   <text x='200' y='95' text-anchor='middle' font-size='10' fill='white'>Node B</text>
-   <circle cx='300' cy='125' r='20' fill='#636e72'/>
-   <text x='300' y='130' text-anchor='middle' font-size='10' fill='white'>Node C</text>
-   <line x1='104' y1='100' x2='180' y2='92' stroke='#e17055' stroke-width='2' stroke-dasharray='5,3'/>
-   <polygon points='180,88 192,92 182,98' fill='#e17055'/>
-   <text x='145' y='82' font-size='10' fill='#e17055'>gossip</text>
-   <text x='585' y='56' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>Step 2: 伝播（数ラウンド後）</text>
-   <circle cx='480' cy='100' r='20' fill='#e17055'/>
-   <text x='480' y='105' text-anchor='middle' font-size='10' fill='white'>Node A</text>

<!--
GossipプロトコルはCassandra、Consul、Bitcoinなどで使われる。フェロモン伝播と数学的に同じ特性を持つ。
-->

---

# Gossipプロトコル（2/2）

-   <circle cx='560' cy='80' r='20' fill='#00b4d8'/>
-   <text x='560' y='85' text-anchor='middle' font-size='10' fill='white'>Node B</text>
-   <circle cx='640' cy='110' r='20' fill='#00b4d8'/>
-   <text x='640' y='115' text-anchor='middle' font-size='10' fill='white'>Node C</text>
-   <circle cx='520' cy='145' r='20' fill='#00b4d8'/>
-   <text x='520' y='150' text-anchor='middle' font-size='10' fill='white'>Node D</text>
-   <circle cx='600' cy='145' r='20' fill='#00b4d8'/>
-   <text x='600' y='150' text-anchor='middle' font-size='10' fill='white'>Node E</text>
-   <line x1='500' y1='100' x2='542' y2='87' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='580' y1='88' x2='625' y2='105' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='500' y1='110' x2='502' y2='128' stroke='#00b4d8' stroke-width='1.5'/>
-   <line x1='540' y1='145' x2='582' y2='145' stroke='#00b4d8' stroke-width='1.5'/>
-   <text x='390' y='195' text-anchor='middle' font-size='13' fill='#aaa'>O(log N) ラウンドで全ノードに情報が届く</text>
-   <rect x='40' y='215' width='700' height='85' rx='8' fill='#0f3460'/>
-   <text x='390' y='238' text-anchor='middle' font-size='13' font-weight='bold' fill='#e0e0e0'>アリとの対応</text>
-   <text x='60' y='260' font-size='12' fill='#aaa'>フェロモン放出 = Gossip メッセージ送信</text>
-   <text x='60' y='278' font-size='12' fill='#aaa'>フェロモン蒸発 = メッセージの TTL / 古い状態の失効</text>
-   <text x='60' y='296' font-size='12' fill='#aaa'>経路強化 = 複数ノードから同じ情報を受け取り確度が上がる</text>
- </svg>

<!--
GossipプロトコルはCassandra、Consul、Bitcoinなどで使われる。フェロモン伝播と数学的に同じ特性を持つ。
-->

---

# CAP定理と結果整合性（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">CAP定理: 3つのうち2つしか選べない</text><polygon points="400,60 180,330 620,330" fill="none" stroke="#7c4dff" stroke-width="2"/><circle cx="400" cy="60" r="50" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="54" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">C</text><text x="400" y="72" text-anchor="middle" fill="#f9a825" font-size="11">一貫性</text><circle cx="180" cy="330" r="50" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="180" y="324" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">A</text><text x="180" y="342" text-anchor="middle" fill="#e91e63" font-size="11">可用性</text><circle cx="620" cy="330" r="50" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="620" y="324" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">P</text><text x="620" y="342" text-anchor="middle" fill="#00b4d8" font-size="11">分断耐性</text><text x="290" y="200" text-anchor="middle" fill="#ffffff" font-size="11">CP系</text><text x="290" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10">HBase, Zookeeper</text><text x="510" y="200" text-anchor="middle" fill="#ffffff" font-size="11">AP系</text><text x="510" y="216" text-anchor="middle" fill="#aaaaaa" font-size="10">Cassandra, DynamoDB</text><text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="11">CA系</text><text x="400" y="356" text-anchor="middle" fill="#aaaaaa" font-size="10">単一ノードRDB（分散では非現実的）</text></svg>
- **CAP定理: 分散システムの基本制約**
- - **C**onsistency（一貫性）: 全ノードが同じデータを返す
- - **A**vailability（可用性）: 常にレスポンスを返す
- - **P**artition Tolerance（分断耐性）: ネットワーク分断時も動作
- - **→ 3つ同時には達成できない（2つを選ぶ）**
- 


---

# CAP定理と結果整合性（2/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">結果整合性 — アリ型の一貫性モデル</text><rect x="30" y="55" width="220" height="280" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">ノードA</text><rect x="50" y="95" width="160" height="36" rx="4" fill="#0f3460"/><text x="130" y="118" text-anchor="middle" fill="#ffffff" font-size="11">Write: x=1</text><rect x="50" y="148" width="160" height="36" rx="4" fill="#0f3460" opacity="0.6"/><text x="130" y="171" text-anchor="middle" fill="#aaaaaa" font-size="11">伝播中...</text><rect x="50" y="201" width="160" height="36" rx="4" fill="#0f3460"/><text x="130" y="224" text-anchor="middle" fill="#f9a825" font-size="11">Read: x=1 ✓</text><rect x="290" y="55" width="220" height="280" rx="8" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="400" y="80" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="bold">ノードB（一時的に古い）</text><rect x="310" y="95" width="160" height="36" rx="4" fill="#0f3460" opacity="0.4"/><text x="390" y="118" text-anchor="middle" fill="#aaaaaa" font-size="11">Read: x=0 (古い)</text><rect x="310" y="148" width="160" height="36" rx="4" fill="#0f3460" opacity="0.6"/><text x="390" y="171" text-anchor="middle" fill="#aaaaaa" font-size="11">更新受信中...</text><rect x="310" y="201" width="160" height="36" rx="4" fill="#0f3460"/><text x="390" y="224" text-anchor="middle" fill="#f9a825" font-size="11">Read: x=1 ✓ (収束)</text><rect x="550" y="55" width="220" height="280" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="1.5"/><text x="660" y="80" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">ノードC</text><rect x="570" y="95" width="160" height="36" rx="4" fill="#0f3460" opacity="0.4"/><text x="650" y="118" text-anchor="middle" fill="#aaaaaa" font-size="11">Read: x=0 (古い)</text><rect x="570" y="148" width="160" height="36" rx="4" fill="#0f3460" opacity="0.6"/><text x="650" y="171" text-anchor="middle" fill="#aaaaaa" font-size="11">更新受信中...</text><rect x="570" y="201" width="160" height="36" rx="4" fill="#0f3460"/><text x="650" y="224" text-anchor="middle" fill="#f9a825" font-size="11">Read: x=1 ✓ (収束)</text><text x="400" y="370" text-anchor="middle" fill="#e91e63" font-size="13">最終的に全ノードが同じ状態に収束 = アリのフェロモン伝播と同じ</text></svg>
- **アリのコロニーはどれを選ぶか？**
- - AP を選択：分断（アリが孤立）しても動き続ける
- - 一貫性は犠牲：各アリは古いフェロモン情報で動く
- - 結果的に整合：時間が経てば全体が最適解に収束
- 
- > 🐜 コロニーは「結果整合性（Eventual Consistency）」で運営されている


---

# スケールアウト設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">スケールアウト: アリ型の拡張</text><rect x="30" y="55" width="340" height="290" rx="10" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="200" y="80" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="bold">初期状態 (3ノード)</text><circle cx="200" cy="150" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="200" y="155" text-anchor="middle" fill="#f9a825" font-size="10">N1</text><circle cx="110" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="110" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N2</text><circle cx="290" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="290" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N3</text><line x1="178" y1="164" x2="132" y2="226" stroke="#f9a825" stroke-width="1.5"/><line x1="222" y1="164" x2="268" y2="226" stroke="#f9a825" stroke-width="1.5"/><line x1="138" y1="240" x2="262" y2="240" stroke="#f9a825" stroke-width="1.5"/><text x="200" y="310" text-anchor="middle" fill="#aaaaaa" font-size="11">処理能力: 100%</text><rect x="420" y="55" width="350" height="290" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">スケールアウト後 (6ノード)</text><circle cx="595" cy="130" r="22" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="595" y="135" text-anchor="middle" fill="#f9a825" font-size="10">N1</text><circle cx="500" cy="180" r="22" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="500" y="185" text-anchor="middle" fill="#f9a825" font-size="10">N2</text><circle cx="690" cy="180" r="22" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="690" y="185" text-anchor="middle" fill="#f9a825" font-size="10">N3</text><circle cx="460" cy="255" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="460" y="260" text-anchor="middle" fill="#e91e63" font-size="10">N4+</text><circle cx="595" cy="275" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="595" y="280" text-anchor="middle" fill="#e91e63" font-size="10">N5+</text><circle cx="730" cy="255" r="22" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="730" y="260" text-anchor="middle" fill="#e91e63" font-size="10">N6+</text><line x1="578" y1="140" x2="516" y2="170" stroke="#f9a825" stroke-width="1.5"/><line x1="612" y1="140" x2="674" y2="170" stroke="#f9a825" stroke-width="1.5"/><line x1="480" y1="192" x2="471" y2="243" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="595" y1="202" x2="595" y2="253" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="678" y1="195" x2="720" y2="243" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="4,2"/><text x="595" y="315" text-anchor="middle" fill="#e91e63" font-size="11">処理能力: 200%</text></svg>
- **アリはなぜ線形にスケールするのか**
- - 各アリは独立して動作（グローバル状態不要）
- - 通信はローカルのみ（隣のアリ・フェロモン）
- - コーディネーターが不要 → ボトルネックなし
- 
- **分散システムのスケールアウト原則**


---

# スケールアウト設計（2/2）

- - **ステートレス設計**: サーバーに状態を持たせない
- - **シェアードナッシング**: ノード間の共有リソースを最小化
- - **一貫性ハッシング**: データを分散してホットスポット回避
- - **非同期通信**: 呼び出し元をブロックしない
- 
- > 🔑 アリを1000万匹追加しても女王は変わらない = 水平スケールの理想形


---

# 耐障害性設計（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">障害発生 → 自動回復</text><rect x="30" y="55" width="340" height="300" rx="10" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="200" y="80" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">正常状態</text><circle cx="200" cy="160" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="200" y="165" text-anchor="middle" fill="#f9a825" font-size="10">N1</text><circle cx="110" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="110" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N2</text><circle cx="290" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="290" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N3</text><line x1="178" y1="174" x2="132" y2="226" stroke="#f9a825" stroke-width="2"/><line x1="222" y1="174" x2="268" y2="226" stroke="#f9a825" stroke-width="2"/><line x1="138" y1="240" x2="262" y2="240" stroke="#f9a825" stroke-width="2"/><text x="200" y="315" text-anchor="middle" fill="#00b4d8" font-size="11">全トラフィック正常</text><rect x="430" y="55" width="340" height="300" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">N1 障害後の自動回復</text><circle cx="600" cy="160" r="28" fill="#3a0000" stroke="#e91e63" stroke-width="2" stroke-dasharray="5,3"/><text x="600" y="158" text-anchor="middle" fill="#e91e63" font-size="9">N1</text><text x="600" y="172" text-anchor="middle" fill="#e91e63" font-size="9">DOWN</text><circle cx="510" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="510" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N2</text><circle cx="690" cy="240" r="28" fill="#0f3460" stroke="#f9a825" stroke-width="2"/><text x="690" y="245" text-anchor="middle" fill="#f9a825" font-size="10">N3</text><line x1="538" y1="240" x2="662" y2="240" stroke="#f9a825" stroke-width="3"/><text x="600" y="310" text-anchor="middle" fill="#f9a825" font-size="11">N2↔N3で継続 (フェイルオーバー)</text><text x="600" y="332" text-anchor="middle" fill="#aaaaaa" font-size="10">アリ: 個体消滅→他が代替</text></svg>
- **障害前提設計（Design for Failure）**
- - アリのコロニーは「障害は必ず起きる」という前提で動く
- - 個々のアリの死は「通常のイベント」として扱われる
- - コロニーレベルでは何事もなかったように動き続ける
- 
- **Chaos Engineering との対応**
- - Netflix Chaos Monkey = 意図的にアリを殺すこと


---

# 耐障害性設計（2/2）

- - 障害注入テスト = フェロモン経路を意図的に断つ
- - 本番環境での訓練 = コロニーが日々行っていること
- 
- **実装パターン**
- - Circuit Breaker: 障害の伝播を遮断
- - Bulkhead: 障害の影響範囲を限定
- - Retry with Backoff: 一時的な障害をローカルで解消


---

<!-- _class: lead -->
# Ch.4 実際のシステム事例

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold">Chapter 4: 実際のシステム事例</text><rect x="60" y="60" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="135" y="105" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Kafka</text><rect x="240" y="60" width="150" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="315" y="105" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">DynamoDB</text><rect x="420" y="60" width="150" height="80" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="495" y="105" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">Kubernetes</text><rect x="600" y="60" width="150" height="80" rx="8" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="675" y="105" text-anchor="middle" fill="#7c4dff" font-size="12" font-weight="bold">BitTorrent</text><rect x="150" y="185" width="150" height="80" rx="8" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="225" y="230" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">Consul</text><rect x="510" y="185" width="150" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="585" y="230" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">etcd</text><text x="400" y="330" text-anchor="middle" fill="#aaaaaa" font-size="13">これらすべてに「アリの知恵」が宿っている</text><text x="400" y="358" text-anchor="middle" fill="#f9a825" font-size="12">自律 / 分散 / 創発 / 耐障害</text></svg>
- **アリの原理を実装した実際のシステム**
- 
- Kafka / DynamoDB / Kubernetes / BitTorrent / Consul


---

# Apache Kafka（1/2）

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>Apache Kafka ＝ フェロモン経路の工学的実装</text>
-   <rect x='20' y='45' width='180' height='220' rx='8' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='110' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#00b4d8'>Producers</text>
-   <rect x='35' y='80' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='100' text-anchor='middle' font-size='11' fill='#aaa'>Service A</text>
-   <rect x='35' y='120' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='140' text-anchor='middle' font-size='11' fill='#aaa'>Service B</text>
-   <rect x='35' y='160' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='110' y='180' text-anchor='middle' font-size='11' fill='#aaa'>Service C</text>
-   <text x='110' y='235' text-anchor='middle' font-size='10' fill='#636e72'>🐜 食料を発見して</text>
-   <text x='110' y='250' text-anchor='middle' font-size='10' fill='#636e72'>フェロモンを放出するアリ</text>
-   <rect x='280' y='45' width='220' height='220' rx='8' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#ffd166'>Kafka Broker (Topic)</text>
-   <rect x='295' y='80' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='97' text-anchor='middle' font-size='10' fill='#aaa'>Partition 0: [msg1][msg2][msg3]</text>
-   <rect x='295' y='115' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='132' text-anchor='middle' font-size='10' fill='#aaa'>Partition 1: [msg4][msg5][msg6]</text>

<!--
KafkaのConsumer Group自動リバランスは、アリの役割切替メカニズムと同じ原理。障害時も自動で再割り当てされる。
-->

---

# Apache Kafka（2/2）

-   <rect x='295' y='150' width='190' height='25' rx='3' fill='#0f3460'/>
-   <text x='390' y='167' text-anchor='middle' font-size='10' fill='#aaa'>Partition 2: [msg7][msg8][msg9]</text>
-   <text x='390' y='215' text-anchor='middle' font-size='10' fill='#636e72'>🐜 フェロモン経路（揮発しない）</text>
-   <text x='390' y='232' text-anchor='middle' font-size='10' fill='#636e72'>Retentionで管理（TTL）</text>
-   <rect x='580' y='45' width='180' height='220' rx='8' fill='#16213e' stroke='#55efc4' stroke-width='2'/>
-   <text x='670' y='68' text-anchor='middle' font-size='12' font-weight='bold' fill='#55efc4'>Consumers</text>
-   <rect x='595' y='80' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='100' text-anchor='middle' font-size='11' fill='#aaa'>Worker 1</text>
-   <rect x='595' y='120' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='140' text-anchor='middle' font-size='11' fill='#aaa'>Worker 2</text>
-   <rect x='595' y='160' width='150' height='30' rx='4' fill='#0f3460'/>
-   <text x='670' y='180' text-anchor='middle' font-size='11' fill='#aaa'>Worker 3</text>
-   <text x='670' y='235' text-anchor='middle' font-size='10' fill='#636e72'>🐜 フェロモンを追跡する</text>
-   <text x='670' y='250' text-anchor='middle' font-size='10' fill='#636e72'>働きアリ（自律的）</text>
-   <line x1='200' y1='155' x2='278' y2='155' stroke='#e17055' stroke-width='2'/>
-   <polygon points='274,150 286,155 274,160' fill='#e17055'/>
-   <line x1='502' y1='155' x2='578' y2='155' stroke='#e17055' stroke-width='2'/>
-   <polygon points='574,150 586,155 574,160' fill='#e17055'/>
-   <rect x='130' y='278' width='520' height='32' rx='6' fill='#0f3460'/>
-   <text x='390' y='298' text-anchor='middle' font-size='12' fill='#ffd166'>Consumer自動リバランス ＝ 役割の自発的切替（アリの閾値モデル）</text>
- </svg>

<!--
KafkaのConsumer Group自動リバランスは、アリの役割切替メカニズムと同じ原理。障害時も自動で再割り当てされる。
-->

---

# Amazon DynamoDB（1/2）

- **DynamoDB ＝ スティグマジー的な結果整合性**
- 
- **アーキテクチャの特徴**
- - 一貫性ハッシングでデータを複数ノードに分散
- - 各ノードは独立してリクエストを処理
- - ノード間でゴシッププロトコルで状態を共有
- 
- **結果整合性の動作**


---

# Amazon DynamoDB（2/2）

- - 書き込み → 一部のレプリカに即座に反映
- - 他のレプリカには非同期で伝播（スティグマジー）
- - 読み取り → 最終的には全レプリカで同じ値
- 
- **アリとの対応**
- - 書き込み = アリが環境（巣）を変化させる
- - 非同期伝播 = 他のアリが変化を検知して反応
- - 結果整合 = コロニー全体が最終的に同期


---

# Kubernetes（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#00b4d8" font-size="15" font-weight="bold">Kubernetes アーキテクチャ — アリ型設計</text><rect x="30" y="50" width="260" height="300" rx="10" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="160" y="76" text-anchor="middle" fill="#00b4d8" font-size="12" font-weight="bold">Control Plane</text><rect x="50" y="90" width="200" height="40" rx="4" fill="#0f3460"/><text x="150" y="115" text-anchor="middle" fill="#ffffff" font-size="11">API Server</text><rect x="50" y="145" width="200" height="40" rx="4" fill="#0f3460"/><text x="150" y="170" text-anchor="middle" fill="#ffffff" font-size="11">Scheduler</text><rect x="50" y="200" width="200" height="40" rx="4" fill="#0f3460"/><text x="150" y="225" text-anchor="middle" fill="#ffffff" font-size="11">Controller Manager</text><rect x="50" y="255" width="200" height="40" rx="4" fill="#0f3460"/><text x="150" y="280" text-anchor="middle" fill="#ffffff" font-size="11">etcd（状態記憶）</text><rect x="330" y="50" width="440" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="550" y="76" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Worker Nodes</text><rect x="350" y="95" width="190" height="100" rx="6" fill="#0f3460"/><text x="445" y="118" text-anchor="middle" fill="#f9a825" font-size="11">Node 1</text><rect x="360" y="128" width="80" height="28" rx="4" fill="#16213e"/><text x="400" y="147" text-anchor="middle" fill="#aaaaaa" font-size="10">Pod A</text><rect x="450" y="128" width="80" height="28" rx="4" fill="#16213e"/><text x="490" y="147" text-anchor="middle" fill="#aaaaaa" font-size="10">Pod B</text><rect x="360" y="165" width="80" height="28" rx="4" fill="#16213e"/><text x="400" y="184" text-anchor="middle" fill="#aaaaaa" font-size="10">Pod C</text><rect x="550" y="95" width="190" height="100" rx="6" fill="#0f3460"/><text x="645" y="118" text-anchor="middle" fill="#f9a825" font-size="11">Node 2</text><rect x="560" y="128" width="80" height="28" rx="4" fill="#16213e"/><text x="600" y="147" text-anchor="middle" fill="#aaaaaa" font-size="10">Pod D</text><rect x="650" y="128" width="80" height="28" rx="4" fill="#16213e"/><text x="690" y="147" text-anchor="middle" fill="#aaaaaa" font-size="10">Pod E</text><text x="550" y="250" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">アリ型の対応</text><text x="550" y="272" fill="#aaaaaa" font-size="11">kubelet = 自律的な働きアリ</text><text x="550" y="294" fill="#aaaaaa" font-size="11">etcd = フェロモン（共有状態）</text><text x="550" y="316" fill="#aaaaaa" font-size="11">HPA = 閾値ベース役割分担</text><line x1="290" y1="200" x2="330" y2="200" stroke="#7c4dff" stroke-width="2"/><polygon points="328,194 340,200 328,206" fill="#7c4dff"/></svg>
- **Kubernetes ＝ 創発的オーケストレーション**
- 
- **宣言的API（Desired State）**
- - 「こうあるべき状態」を宣言するだけ
- - Controllerが現状との差分を検知して自動修正
- - 人間が手順を指示しない = 指示なし設計
- 
- **スケジューラーの創発的振る舞い**


---

# Kubernetes（2/2）

- - 各Nodeのリソース状況をローカルに把握
- - PodをNodeに割り当てる（閾値モデルと同様）
- - 障害時はPodを自動で別Nodeに再スケジュール
- 
- **アリとの対応**
- - Desired State = コロニーの「あるべき姿」
- - Controller = 各アリの局所判断ルール
- - 自動回復 = コロニーの耐障害性


---

# BitTorrent（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#7c4dff" font-size="15" font-weight="bold">BitTorrent — P2Pスウォーム</text><circle cx="400" cy="200" r="20" fill="#7c4dff"/><text x="400" y="205" text-anchor="middle" fill="#ffffff" font-size="10">Seed</text><circle cx="200" cy="100" r="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="105" text-anchor="middle" fill="#f9a825" font-size="9">P1</text><circle cx="400" cy="80" r="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="85" text-anchor="middle" fill="#f9a825" font-size="9">P2</text><circle cx="600" cy="100" r="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="105" text-anchor="middle" fill="#f9a825" font-size="9">P3</text><circle cx="120" cy="230" r="16" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="120" y="235" text-anchor="middle" fill="#e91e63" font-size="9">P4</text><circle cx="680" cy="230" r="16" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="680" y="235" text-anchor="middle" fill="#e91e63" font-size="9">P5</text><circle cx="200" cy="330" r="16" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="200" y="335" text-anchor="middle" fill="#00b4d8" font-size="9">P6</text><circle cx="600" cy="330" r="16" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="600" y="335" text-anchor="middle" fill="#00b4d8" font-size="9">P7</text><line x1="387" y1="186" x2="214" y2="108" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="400" y1="180" x2="400" y2="96" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="413" y1="186" x2="586" y2="108" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="382" y1="200" x2="136" y2="228" stroke="#aaaaaa" stroke-width="1"/><line x1="418" y1="200" x2="664" y2="228" stroke="#aaaaaa" stroke-width="1"/><line x1="200" y1="116" x2="200" y2="314" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/><line x1="200" y1="116" x2="136" y2="222" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/><text x="400" y="380" text-anchor="middle" fill="#aaaaaa" font-size="12">各ピアが受信しながら同時に送信 = アリの分業</text></svg>
- **BitTorrent ＝ 純粋なP2Pコンテンツ配信**
- 
- **中央サーバーなしのファイル配信**
- - トラッカー（またはDHT）でピアを発見
- - ピア同士がチャンクを交換（中央なし）
- - ダウンロードしながら同時にアップロード
- 


---

# BitTorrent（2/2）

- **アリとの完全な対応**
- - ファイルチャンク = 食料の断片
- - ピア発見 = フェロモンで仲間を見つける
- - チャンク交換 = 口移しによる食料分配
- - ファイル再構成 = コロニー全体での協調達成
- 
- > 🔑 中央が落ちてもネットワークが機能し続ける = アリの耐障害性


---

# Consul / etcd（1/2）

- **分散サービスディスカバリ ＝ フェロモンマップ**
- 
- **Consul の機能**
- - サービスレジストリ: どのサービスがどこにいるか
- - ヘルスチェック: 生存しているかを定期確認
- - KVストア: 分散設定情報の共有
- 
- **Raftコンセンサスアルゴリズム（etcd）**


---

# Consul / etcd（2/2）

- - 過半数の合意でデータを確定（多数決原理）
- - リーダー選出 → 障害時は自動で新リーダー
- - アリの「最も行動した個体が道を作る」に類似
- 
- **アリとの対応**
- - サービスレジストリ = 経路フェロモンの地図
- - ヘルスチェック = 経路が生きているか確認
- - 自動的なリーダー選出 = 女王不在時の対応


---

# 事例比較まとめ（1/2）

- <svg viewBox='0 0 780 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='320' fill='#f8f9fa' rx='10'/>
-   <rect x='0' y='0' width='780' height='38' rx='10' fill='#2d3436'/>
-   <text x='100' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>システム</text>
-   <text x='260' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>アリの原理</text>
-   <text x='450' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>整合性モデル</text>
-   <text x='640' y='24' text-anchor='middle' font-size='12' font-weight='bold' fill='white'>スケール方式</text>
-   <line x1='170' y1='0' x2='170' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <line x1='360' y1='0' x2='360' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <line x1='540' y1='0' x2='540' y2='320' stroke='#dfe6e9' stroke-width='1'/>
-   <rect x='0' y='38' width='780' height='44' fill='#fff9c4'/>
-   <text x='100' y='65' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Apache Kafka</text>
-   <text x='260' y='58' text-anchor='middle' font-size='11' fill='#636e72'>フェロモン経路</text>
-   <text x='260' y='74' text-anchor='middle' font-size='11' fill='#636e72'>役割の自律切替</text>
-   <text x='450' y='65' text-anchor='middle' font-size='11' fill='#636e72'>結果整合性</text>
-   <text x='640' y='65' text-anchor='middle' font-size='11' fill='#636e72'>Partitionで水平分散</text>
-   <rect x='0' y='82' width='780' height='44' fill='white'/>
-   <text x='100' y='109' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>DynamoDB</text>
-   <text x='260' y='102' text-anchor='middle' font-size='11' fill='#636e72'>スティグマジー</text>
-   <text x='260' y='118' text-anchor='middle' font-size='11' fill='#636e72'>非同期伝播</text>
-   <text x='450' y='109' text-anchor='middle' font-size='11' fill='#636e72'>Eventual Consistency</text>

<!--
5つのシステムはそれぞれ異なる問題を解いているが、設計思想の根底はすべてアリのコロニーと同じ原理。
-->

---

# 事例比較まとめ（2/2）

-   <text x='640' y='109' text-anchor='middle' font-size='11' fill='#636e72'>一貫性ハッシング</text>
-   <rect x='0' y='126' width='780' height='44' fill='#e8f5e9'/>
-   <text x='100' y='153' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Kubernetes</text>
-   <text x='260' y='146' text-anchor='middle' font-size='11' fill='#636e72'>閾値ベース役割分担</text>
-   <text x='260' y='162' text-anchor='middle' font-size='11' fill='#636e72'>宣言的自律修復</text>
-   <text x='450' y='153' text-anchor='middle' font-size='11' fill='#636e72'>Desired State</text>
-   <text x='640' y='153' text-anchor='middle' font-size='11' fill='#636e72'>Node追加で線形</text>
-   <rect x='0' y='170' width='780' height='44' fill='white'/>
-   <text x='100' y='197' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>BitTorrent</text>
-   <text x='260' y='190' text-anchor='middle' font-size='11' fill='#636e72'>口移し食料分配</text>
-   <text x='260' y='206' text-anchor='middle' font-size='11' fill='#636e72'>P2P経路発見</text>
-   <text x='450' y='197' text-anchor='middle' font-size='11' fill='#636e72'>結果整合性</text>
-   <text x='640' y='197' text-anchor='middle' font-size='11' fill='#636e72'>ピア追加で自動</text>
-   <rect x='0' y='214' width='780' height='44' fill='#e3f2fd'/>
-   <text x='100' y='241' text-anchor='middle' font-size='12' fill='#2d3436' font-weight='bold'>Consul / etcd</text>
-   <text x='260' y='234' text-anchor='middle' font-size='11' fill='#636e72'>フェロモンマップ</text>
-   <text x='260' y='250' text-anchor='middle' font-size='11' fill='#636e72'>多数決原理</text>
-   <text x='450' y='241' text-anchor='middle' font-size='11' fill='#636e72'>強整合性（Raft）</text>
-   <text x='640' y='241' text-anchor='middle' font-size='11' fill='#636e72'>奇数ノードで冗長化</text>
-   <rect x='0' y='270' width='780' height='50' rx='0' fill='#6c5ce7' opacity='0.12'/>
-   <text x='390' y='293' text-anchor='middle' font-size='13' fill='#4a4a8a' font-weight='bold'>共通点: ローカル情報のみで判断 → グローバル最適に収束</text>
-   <text x='390' y='312' text-anchor='middle' font-size='11' fill='#6c5ce7'>設計思想の根底にアリのコロニーと同じ原理が流れている</text>
- </svg>

<!--
5つのシステムはそれぞれ異なる問題を解いているが、設計思想の根底はすべてアリのコロニーと同じ原理。
-->

---

<!-- _class: lead -->
# Ch.5 設計実践

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="370" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">Chapter 5: 設計実践</text><rect x="200" y="80" width="400" height="240" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="400" cy="200" r="50" fill="#f9a825" opacity="0.2"/><circle cx="400" cy="200" r="30" fill="#f9a825" opacity="0.4"/><circle cx="400" cy="200" r="14" fill="#f9a825"/><line x1="300" y1="130" x2="386" y2="192" stroke="#f9a825" stroke-width="2"/><polygon points="381,186 390,198 382,190" fill="#f9a825"/><line x1="500" y1="130" x2="414" y2="192" stroke="#e91e63" stroke-width="2"/><polygon points="418,185 411,197 419,192" fill="#e91e63"/><line x1="300" y1="270" x2="386" y2="208" stroke="#00b4d8" stroke-width="2"/><polygon points="381,213 390,201 382,209" fill="#00b4d8"/><line x1="500" y1="270" x2="414" y2="208" stroke="#7c4dff" stroke-width="2"/><polygon points="418,213 411,201 419,208" fill="#7c4dff"/><circle cx="300" cy="130" r="16" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="300" y="135" text-anchor="middle" fill="#f9a825" font-size="9">分析</text><circle cx="500" cy="130" r="16" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="500" y="135" text-anchor="middle" fill="#e91e63" font-size="9">設計</text><circle cx="300" cy="270" r="16" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="300" y="275" text-anchor="middle" fill="#00b4d8" font-size="9">実装</text><circle cx="500" cy="270" r="16" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="500" y="275" text-anchor="middle" fill="#7c4dff" font-size="9">検証</text></svg>
- **アリの原理を自分のシステムに適用する**
- 
- 落とし穴の回避 → フレームワーク → ケーススタディ


---

# よくある落とし穴（1/2）

- **「創発を期待しすぎる」Anti-Pattern**
- 
- **❌ 落とし穴1: 設計なしに自律に任せる**
- - 誤解:「分散にすれば勝手に最適化される」
- - 現実: ルールの設計が不適切だと発散・カオスになる
- 
- **❌ 落とし穴2: 観測性を捨てる**


---

# よくある落とし穴（2/2）

- - 誤解:「分散なんだから全体は把握できなくていい」
- - 現実: 創発の結果を観測する仕組みが必須（分散トレーシング）
- 
- **❌ 落とし穴3: 一貫性を完全に諦める**
- - 誤解:「結果整合性なら何でもいい」
- - 現実: ユーザー体験に影響する箇所は強整合性が必要
- 
- > 🐜 アリも「ルール」は精密に設計されている。自律 ≠ 無秩序


---

# 自システムへの適用フレームワーク（1/2）

- <svg viewBox='0 0 780 310' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;">
-   <defs/>
-   <rect width='780' height='310' fill='#1a1a2e' rx='10'/>
-   <text x='390' y='28' text-anchor='middle' font-size='16' font-weight='bold' fill='#e0e0e0'>3ステップ適用フレームワーク</text>
-   <rect x='20' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#00b4d8' stroke-width='2'/>
-   <text x='132' y='76' text-anchor='middle' font-size='28' fill='#00b4d8'>①</text>
-   <text x='132' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#00b4d8'>ローカルルールの設計</text>
-   <text x='40' y='126' font-size='11' fill='#aaa'>各ノードが持つべき</text>
-   <text x='40' y='144' font-size='11' fill='#aaa'>判断ルールを定義する</text>
-   <text x='40' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='40' y='188' font-size='11' fill='#aaa'>「キューが N 件超えたら</text>
-   <text x='40' y='206' font-size='11' fill='#aaa'>　新Workerを起動」</text>
-   <text x='40' y='240' font-size='11' fill='#aaa'>「エラー率が X% 超で</text>
-   <text x='40' y='258' font-size='11' fill='#aaa'>　CB を開く」</text>
-   <rect x='277' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#ffd166' stroke-width='2'/>
-   <text x='390' y='76' text-anchor='middle' font-size='28' fill='#ffd166'>②</text>
-   <text x='390' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#ffd166'>フィードバックループの設計</text>

<!--
この3ステップを踏まずに分散設計すると、意図しないカオスになる。アリのコロニーも進化で精巧なルールを獲得している。
-->

---

# 自システムへの適用フレームワーク（2/2）

-   <text x='297' y='126' font-size='11' fill='#aaa'>正と負のフィードバック</text>
-   <text x='297' y='144' font-size='11' fill='#aaa'>をバランスよく設計</text>
-   <text x='297' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='297' y='188' font-size='11' fill='#aaa'>正: 成功した経路を</text>
-   <text x='297' y='206' font-size='11' fill='#aaa'>　キャッシュで強化</text>
-   <text x='297' y='240' font-size='11' fill='#aaa'>負: TTL でキャッシュを</text>
-   <text x='297' y='258' font-size='11' fill='#aaa'>　無効化（蒸発）</text>
-   <rect x='534' y='50' width='225' height='220' rx='10' fill='#16213e' stroke='#55efc4' stroke-width='2'/>
-   <text x='647' y='76' text-anchor='middle' font-size='28' fill='#55efc4'>③</text>
-   <text x='647' y='102' text-anchor='middle' font-size='13' font-weight='bold' fill='#55efc4'>観測性の確保</text>
-   <text x='554' y='126' font-size='11' fill='#aaa'>創発の結果を可視化</text>
-   <text x='554' y='144' font-size='11' fill='#aaa'>して理解・調整する</text>
-   <text x='554' y='170' font-size='11' fill='#ffd166'>例:</text>
-   <text x='554' y='188' font-size='11' fill='#aaa'>分散トレーシング</text>
-   <text x='554' y='206' font-size='11' fill='#aaa'>（Jaeger / Zipkin）</text>
-   <text x='554' y='240' font-size='11' fill='#aaa'>メトリクス集約</text>
-   <text x='554' y='258' font-size='11' fill='#aaa'>（Prometheus / Grafana）</text>
- </svg>

<!--
この3ステップを踏まずに分散設計すると、意図しないカオスになる。アリのコロニーも進化で精巧なルールを獲得している。
-->

---

# ケーススタディ演習（1/2）

- **グループワーク（30分）**
- 
- **問題: ECサイトの在庫管理システムを分散設計せよ**
- 
- **制約条件**
- - 1日1億件の在庫照会リクエスト
- - フラッシュセール時は10倍のスパイク


---

# ケーススタディ演習（2/2）

- - 在庫の二重販売は絶対に防ぐ
- - 1ノード障害時もサービス継続
- 
- **検討ポイント（アリの原理を使って）**
- - どのデータを「フェロモン経路」に流すか
- - 「結果整合性 vs 強整合性」どこで使い分けるか
- - 「スティグマジー」的に設計できる部分はどこか


---

# グループディスカッション（1/2）

- **発表・フィードバック**
- 
- **各グループ（5分）**
- - 設計の全体像を図で説明
- - アリのどの原理を適用したか
- - 最も難しかったトレードオフは何か


---

# グループディスカッション（2/2）

- 
- **フィードバック観点**
- - SPOFはないか
- - 「強整合性が必要な場所」を正確に見極めているか
- - スケールアウトの経路はクリアか
- 
- > 🐜 正解はない。コロニーも環境に合わせて進化し続ける


---

<!-- _class: lead -->
# Ch.6 まとめ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="370" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold">Chapter 6: まとめ</text><circle cx="400" cy="140" r="80" fill="#e91e63" opacity="0.1"/><circle cx="400" cy="140" r="55" fill="#e91e63" opacity="0.2"/><circle cx="400" cy="140" r="32" fill="#e91e63" opacity="0.6"/><text x="400" y="135" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">アリの</text><text x="400" y="152" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">知恵</text><line x1="355" y1="115" x2="245" y2="75" stroke="#f9a825" stroke-width="2"/><circle cx="230" cy="68" r="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="230" y="73" text-anchor="middle" fill="#f9a825" font-size="9">創発</text><line x1="445" y1="115" x2="555" y2="75" stroke="#e91e63" stroke-width="2"/><circle cx="570" cy="68" r="18" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="570" y="73" text-anchor="middle" fill="#e91e63" font-size="9">分散</text><line x1="400" y1="220" x2="400" y2="270" stroke="#00b4d8" stroke-width="2"/><circle cx="400" cy="285" r="18" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="400" y="290" text-anchor="middle" fill="#00b4d8" font-size="9">自律</text><line x1="355" y1="165" x2="265" y2="225" stroke="#7c4dff" stroke-width="2"/><circle cx="250" cy="238" r="18" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="250" y="243" text-anchor="middle" fill="#7c4dff" font-size="9">耐障害</text><line x1="445" y1="165" x2="535" y2="225" stroke="#00b4d8" stroke-width="2"/><circle cx="550" cy="238" r="18" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="550" y="243" text-anchor="middle" fill="#00b4d8" font-size="9">適応</text></svg>
- **女王なき組織設計の哲学**
- 
- 今日学んだことを自分のシステムへ


---

# 今日学んだこと（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">学習マップ: アリ → 分散システム</text><rect x="30" y="50" width="220" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="140" y="83" text-anchor="middle" fill="#f9a825" font-size="11">フェロモン通信</text><line x1="250" y1="77" x2="310" y2="77" stroke="#7c4dff" stroke-width="2"/><polygon points="308,71 320,77 308,83" fill="#7c4dff"/><rect x="320" y="50" width="220" height="55" rx="6" fill="#0f3460" stroke="#7c4dff" stroke-width="1.5"/><text x="430" y="83" text-anchor="middle" fill="#ffffff" font-size="11">Gossipプロトコル</text><rect x="30" y="130" width="220" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="140" y="163" text-anchor="middle" fill="#e91e63" font-size="11">スティグマジー</text><line x1="250" y1="157" x2="310" y2="157" stroke="#7c4dff" stroke-width="2"/><polygon points="308,151 320,157 308,163" fill="#7c4dff"/><rect x="320" y="130" width="220" height="55" rx="6" fill="#0f3460" stroke="#7c4dff" stroke-width="1.5"/><text x="430" y="163" text-anchor="middle" fill="#ffffff" font-size="11">イベントソーシング</text><rect x="30" y="210" width="220" height="55" rx="6" fill="#16213e" stroke="#00b4d8" stroke-width="2"/><text x="140" y="243" text-anchor="middle" fill="#00b4d8" font-size="11">役割分担（閾値）</text><line x1="250" y1="237" x2="310" y2="237" stroke="#7c4dff" stroke-width="2"/><polygon points="308,231 320,237 308,243" fill="#7c4dff"/><rect x="320" y="210" width="220" height="55" rx="6" fill="#0f3460" stroke="#7c4dff" stroke-width="1.5"/><text x="430" y="243" text-anchor="middle" fill="#ffffff" font-size="11">HPA / オートスケール</text><rect x="30" y="290" width="220" height="55" rx="6" fill="#16213e" stroke="#7c4dff" stroke-width="2"/><text x="140" y="323" text-anchor="middle" fill="#7c4dff" font-size="11">創発的最適化</text><line x1="250" y1="317" x2="310" y2="317" stroke="#7c4dff" stroke-width="2"/><polygon points="308,311 320,317 308,323" fill="#7c4dff"/><rect x="320" y="290" width="220" height="55" rx="6" fill="#0f3460" stroke="#7c4dff" stroke-width="1.5"/><text x="430" y="323" text-anchor="middle" fill="#ffffff" font-size="11">ACO最適化アルゴリズム</text><rect x="580" y="50" width="190" height="300" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="675" y="76" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">実システム事例</text><text x="600" y="106" fill="#aaaaaa" font-size="11">Apache Kafka</text><text x="600" y="132" fill="#aaaaaa" font-size="11">Amazon DynamoDB</text><text x="600" y="158" fill="#aaaaaa" font-size="11">Kubernetes</text><text x="600" y="184" fill="#aaaaaa" font-size="11">BitTorrent</text><text x="600" y="210" fill="#aaaaaa" font-size="11">Consul / etcd</text></svg>
- **5つのキーコンセプト**
- 
- 1. **女王は命令しない** — 中央制御なしでコロニーは動く
- 2. **フェロモン = フィードバックループ** — 正と負の均衡が最適化を生む
- 3. **創発の条件** — ローカルルール ＋ フィードバック ＝ グローバル最適


---

# 今日学んだこと（2/2）

- 4. **P2P = アリのコロニーの工学的実装** — Kafka・DynamoDB・K8sに流れる同じ原理
- 5. **観測性は必須** — 自律システムの結果を可視化して初めて「設計」になる
- 
- > 🐜 2億年以上前から存在するアリのコロニーは、  
- > 　現代の分散システム設計の教科書だった


---

# 女王なき組織設計の哲学（1/2）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">中央制御 vs 自律分散: 哲学的比較</text><rect x="30" y="55" width="350" height="300" rx="10" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="205" y="80" text-anchor="middle" fill="#aaaaaa" font-size="13" font-weight="bold">中央集権型（従来）</text><text x="205" y="114" text-anchor="middle" fill="#e91e63" font-size="20">♛</text><line x1="205" y1="130" x2="120" y2="175" stroke="#aaaaaa" stroke-width="1.5"/><line x1="205" y1="130" x2="205" y2="175" stroke="#aaaaaa" stroke-width="1.5"/><line x1="205" y1="130" x2="290" y2="175" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="120" cy="185" r="12" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="205" cy="185" r="12" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><circle cx="290" cy="185" r="12" fill="#16213e" stroke="#aaaaaa" stroke-width="1.5"/><text x="205" y="240" text-anchor="middle" fill="#aaaaaa" font-size="11">単一障害点 / ボトルネック</text><text x="205" y="260" text-anchor="middle" fill="#aaaaaa" font-size="11">スケール困難</text><text x="205" y="280" text-anchor="middle" fill="#aaaaaa" font-size="11">設計者の限界が上限</text><rect x="420" y="55" width="350" height="300" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="595" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">自律分散型（アリ型）</text><circle cx="500" cy="140" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="595" cy="120" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="690" cy="140" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="545" cy="200" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><circle cx="645" cy="200" r="14" fill="#16213e" stroke="#f9a825" stroke-width="2"/><line x1="514" y1="140" x2="581" y2="124" stroke="#f9a825" stroke-width="1.5"/><line x1="609" y1="124" x2="676" y2="136" stroke="#f9a825" stroke-width="1.5"/><line x1="510" y1="150" x2="535" y2="190" stroke="#f9a825" stroke-width="1.5"/><line x1="609" y1="130" x2="555" y2="190" stroke="#f9a825" stroke-width="1.5"/><line x1="680" y1="150" x2="655" y2="190" stroke="#f9a825" stroke-width="1.5"/><line x1="559" y1="200" x2="631" y2="200" stroke="#f9a825" stroke-width="1.5"/><text x="595" y="250" text-anchor="middle" fill="#f9a825" font-size="11">SPOF なし / 水平スケール</text><text x="595" y="270" text-anchor="middle" fill="#f9a825" font-size="11">自己修復 / 創発的最適化</text><text x="595" y="290" text-anchor="middle" fill="#f9a825" font-size="11">設計者の想定を超えた知性</text></svg>
- **技術を超えた示唆**
- 
- **システム設計への示唆**
- - SPOFをなくすことは「女王をなくす」こと
- - 障害を前提に設計することは「アリが死ぬことを前提にする」こと
- - スケールアウトは「コロニーを増やす」こと


---

# 女王なき組織設計の哲学（2/2）

- 
- **組織設計への示唆**
- - トップダウン命令系統は中央集権モデル
- - 自律的チームは P2P モデル
- - 明確なルール（Values）と情報共有（フェロモン）があれば指示なしでも動く
- 
- > 🌱 「自律分散」はシステムの話ではなく、複雑な世界を生き抜く普遍的な戦略


---

# 参考文献・ツール（1/2）

- **書籍**
- - [The Ants — Wilson & Hölldobler (1990)](https://www.hup.harvard.edu/catalog.php?isbn=9780674040755): アリ研究の聖典
- - [Emergence — Steven Johnson (2001)](https://www.simonandschuster.com/books/Emergence/Steven-Johnson/9780684868769): 創発の一般向け解説
- - [Designing Distributed Systems — Burns (2018)](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/): 分散システム設計パターン
- 
- **論文・技術資料**


---

# 参考文献・ツール（2/2）

- - [Kafka: a Distributed Messaging System (LinkedIn, 2011)](https://www.microsoft.com/en-us/research/publication/kafka-a-distributed-messaging-system-for-log-processing/)
- - [Dynamo: Amazon's Highly Available Key-value Store (2007)](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html)
- 
- **ツール**
- - [NetLogo](https://ccl.northwestern.edu/netlogo/): アリのシミュレーション
- - [Chaos Monkey](https://netflix.github.io/chaosmonkey/): Netflix の耐障害性テスト


---

<!-- _class: lead -->
# Q&A / 連絡先（1/2）

- **ご質問・ディスカッション**
- 
- 🐜 アリのコロニーに学んだ分散システム設計
- 
- 「女王は命令していない — 創発とP2P設計」


---

<!-- _class: lead -->
# Q&A / 連絡先（2/2）

- 
- ---
- 
- 本日はご参加いただきありがとうございました！
- 
- > 設計に迷ったら、アリを思い出してください

