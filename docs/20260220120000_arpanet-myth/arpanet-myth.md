---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ARPANETの本当の動機"
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
  
  section { font-size: 1.05em; }
  section pre code { font-size: 0.58em; line-height: 1.4; }
  section h1 { font-size: 1.6em; }
  section h2 { font-size: 1.3em; }
  
---

<!-- _class: lead -->
# 核戦争が生んだインターネット説は嘘だった

- ARPANETの本当の動機
- 
- 通説を疑い、一次資料に当たる

<!--
有名な「ARPANETは核戦争に耐えるために設計された」という話。実はこれは大きな誤解・神話です。今日はその神話がどこから来たのか、そして本当の動機は何だったのかを一次資料と証言を元に解説します。
-->

---

# アジェンダ

- **Part 1:** 「核戦争に耐えるため」という通説
- **Part 2:** 本当の文脈 — 冷戦・ARPA・コンピュータ科学
- **Part 3:** ポール・バランと混同の源泉
- **Part 4:** ARPANETの実際の設計と構築
- **Part 5:** 一次資料が語る真実
- **Part 6:** ARPANETが実際に生んだもの
- **Part 7:** 歴史の正確さがなぜ重要か

<!--
7つのパートで構成。前半で神話の解体、後半でARPANETの真実と遺産を扱います。
-->

---

<!-- _class: lead -->
# Part 1: 「核戦争に耐えるため」という通説

- 誰もが一度は聞いたことがある「あの話」


---

# あなたもこの話を聞いたことがあるはず（1/2）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話 vs 事実</text>
  <!-- Myth side -->
  <rect x="40" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">神話（広く流布）</text>
  <text x="60" y="112" fill="#e91e63" font-size="13" font-family="sans-serif">「ARPANETは核攻撃に耐えるため</text>
  <text x="60" y="130" fill="#e91e63" font-size="13" font-family="sans-serif">に設計された」</text>
  <text x="60" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: 教科書・Wikipedia・メディア</text>
  <text x="60" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 軍の核サバイバル技術</text>
  <text x="60" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 分散型設計が核耐性の証拠</text>
  <text x="60" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ ポール・バランが設計した</text>
  <text x="60" y="250" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分正しくて</text>
  <text x="60" y="272" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分大きく誤解</text>
  <!-- Fact side -->
  <rect x="420" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="#69f0ae" font-size="16" font-weight="bold" font-family="sans-serif">事実（一次資料）</text>
  <text x="435" y="112" fill="#69f0ae" font-size="13" font-family="sans-serif">「研究者のリソース共有のために</text>
  <text x="435" y="130" fill="#69f0ae" font-size="13" font-family="sans-serif">設計された」</text>
  <text x="435" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: ARPA文書・設計者証言</text>
  <text x="435" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 高価なコンピュータの共有</text>
  <text x="435" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 3台の端末問題を解く</text>
  <text x="435" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ バランの研究は別物</text>
  <text x="435" y="250" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">核耐性は副産物</text>
  <text x="435" y="272" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">（設計目標ではない）</text>
</svg>
- **よく語られる説:**
- 「ARPANETは核攻撃で一部が破壊されても通信を維持できるよう設計された」
- 「分散型ネットワークは核戦争サバイバルのための発明だ」
- 

<!--
多くのエンジニアがこの話を「常識」として知っています。しかし「誰が」「なぜ」設計したかを具体的に聞かれると、多くの場合は曖昧な答えしか返ってきません。
-->

---

# あなたもこの話を聞いたことがあるはず（2/2）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話 vs 事実</text>
  <!-- Myth side -->
  <rect x="40" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">神話（広く流布）</text>
  <text x="60" y="112" fill="#e91e63" font-size="13" font-family="sans-serif">「ARPANETは核攻撃に耐えるため</text>
  <text x="60" y="130" fill="#e91e63" font-size="13" font-family="sans-serif">に設計された」</text>
  <text x="60" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: 教科書・Wikipedia・メディア</text>
  <text x="60" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 軍の核サバイバル技術</text>
  <text x="60" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 分散型設計が核耐性の証拠</text>
  <text x="60" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ ポール・バランが設計した</text>
  <text x="60" y="250" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分正しくて</text>
  <text x="60" y="272" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分大きく誤解</text>
  <!-- Fact side -->
  <rect x="420" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="#69f0ae" font-size="16" font-weight="bold" font-family="sans-serif">事実（一次資料）</text>
  <text x="435" y="112" fill="#69f0ae" font-size="13" font-family="sans-serif">「研究者のリソース共有のために</text>
  <text x="435" y="130" fill="#69f0ae" font-size="13" font-family="sans-serif">設計された」</text>
  <text x="435" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: ARPA文書・設計者証言</text>
  <text x="435" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 高価なコンピュータの共有</text>
  <text x="435" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 3台の端末問題を解く</text>
  <text x="435" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ バランの研究は別物</text>
  <text x="435" y="250" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">核耐性は副産物</text>
  <text x="435" y="272" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">（設計目標ではない）</text>
</svg>
- **どこで聞いた？**
- 教科書・IT入門書・Wikipedia・ドキュメンタリー番組
- 技術系ブログ・SNS・講演でのアイスブレーク
- 
- → これは **半分正しくて、半分大きく誤解されている**

<!--
多くのエンジニアがこの話を「常識」として知っています。しかし「誰が」「なぜ」設計したかを具体的に聞かれると、多くの場合は曖昧な答えしか返ってきません。
-->

---

# 通説の広まり方 — 誰が、いつ、どう伝えたか（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話の誕生と拡大 — タイムライン</text>
  <!-- Timeline line -->
  <line x1="60" y1="160" x2="740" y2="160" stroke="#555" stroke-width="2"/>
  <!-- 1964: Baran research -->
  <circle cx="100" cy="160" r="10" fill="#4fc3f7"/>
  <text x="100" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">1964</text>
  <text x="100" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バランの</text>
  <text x="100" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">RAND論文</text>
  <text x="100" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（核耐性研究）</text>
  <!-- 1969: ARPANET -->
  <circle cx="200" cy="160" r="10" fill="#69f0ae"/>
  <text x="200" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1969</text>
  <text x="200" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="200" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">稼働開始</text>
  <text x="200" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（リソース共有）</text>
  <!-- 1972: Email -->
  <circle cx="290" cy="160" r="8" fill="#f9a825"/>
  <text x="290" y="145" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1972</text>
  <text x="290" y="178" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">メール発明</text>
  <!-- 1980s: Media amplification -->
  <circle cx="400" cy="160" r="12" fill="#e91e63"/>
  <text x="400" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">1980〜90s</text>
  <text x="400" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">メディアが</text>
  <text x="400" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">「核耐性説」を</text>
  <text x="400" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">繰り返し引用</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TIME / Newsweek</text>
  <!-- 1996: Where Wizards -->
  <circle cx="510" cy="160" r="10" fill="#69f0ae"/>
  <text x="510" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
  <text x="510" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Where Wizards</text>
  <text x="510" y="192" text-anchor="middle" fill="#69f0ae" font-size="10" font-family="sans-serif">神話を否定</text>
  <text x="510" y="206" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（学術的認知）</text>
  <!-- Late 1990s: Wikipedia -->
  <circle cx="610" cy="160" r="12" fill="#e91e63"/>
  <text x="610" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2000s</text>
  <text x="610" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Wikipedia</text>
  <text x="610" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">草創期に「事実」</text>
  <text x="610" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">として世界拡散</text>
  <!-- Today -->
  <circle cx="710" cy="160" r="10" fill="#ff7043"/>
  <text x="710" y="145" text-anchor="middle" fill="#ff7043" font-size="11" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="710" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">教科書・授業の</text>
  <text x="710" y="192" text-anchor="middle" fill="#ff7043" font-size="10" font-family="sans-serif">定番説明文</text>
  <!-- Key insight -->
  <rect x="80" y="255" width="640" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">混同のメカニズム</text>
  <text x="400" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">バランの核耐性研究（1964）+ ARPANETの同時期創設（1969）= 「一緒のもの」と誤認</text>
</svg>
- **1970年代: Stewart Brandの語り**
- 『The Media Lab』などでARPANETを「核戦争サバイバル技術」として紹介
- 
- **1980〜90年代: メディアの増幅**
- TIME誌・Newsweekがインターネット特集でこの説を繰り返し引用

<!--
誤情報の伝播メカニズムの典型例。権威ある媒体が繰り返すことで「常識」になっていきます。
-->

---

# 通説の広まり方 — 誰が、いつ、どう伝えたか（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話の誕生と拡大 — タイムライン</text>
  <!-- Timeline line -->
  <line x1="60" y1="160" x2="740" y2="160" stroke="#555" stroke-width="2"/>
  <!-- 1964: Baran research -->
  <circle cx="100" cy="160" r="10" fill="#4fc3f7"/>
  <text x="100" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">1964</text>
  <text x="100" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バランの</text>
  <text x="100" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">RAND論文</text>
  <text x="100" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（核耐性研究）</text>
  <!-- 1969: ARPANET -->
  <circle cx="200" cy="160" r="10" fill="#69f0ae"/>
  <text x="200" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1969</text>
  <text x="200" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="200" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">稼働開始</text>
  <text x="200" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（リソース共有）</text>
  <!-- 1972: Email -->
  <circle cx="290" cy="160" r="8" fill="#f9a825"/>
  <text x="290" y="145" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1972</text>
  <text x="290" y="178" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">メール発明</text>
  <!-- 1980s: Media amplification -->
  <circle cx="400" cy="160" r="12" fill="#e91e63"/>
  <text x="400" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">1980〜90s</text>
  <text x="400" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">メディアが</text>
  <text x="400" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">「核耐性説」を</text>
  <text x="400" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">繰り返し引用</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TIME / Newsweek</text>
  <!-- 1996: Where Wizards -->
  <circle cx="510" cy="160" r="10" fill="#69f0ae"/>
  <text x="510" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
  <text x="510" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Where Wizards</text>
  <text x="510" y="192" text-anchor="middle" fill="#69f0ae" font-size="10" font-family="sans-serif">神話を否定</text>
  <text x="510" y="206" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（学術的認知）</text>
  <!-- Late 1990s: Wikipedia -->
  <circle cx="610" cy="160" r="12" fill="#e91e63"/>
  <text x="610" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2000s</text>
  <text x="610" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Wikipedia</text>
  <text x="610" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">草創期に「事実」</text>
  <text x="610" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">として世界拡散</text>
  <!-- Today -->
  <circle cx="710" cy="160" r="10" fill="#ff7043"/>
  <text x="710" y="145" text-anchor="middle" fill="#ff7043" font-size="11" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="710" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">教科書・授業の</text>
  <text x="710" y="192" text-anchor="middle" fill="#ff7043" font-size="10" font-family="sans-serif">定番説明文</text>
  <!-- Key insight -->
  <rect x="80" y="255" width="640" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">混同のメカニズム</text>
  <text x="400" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">バランの核耐性研究（1964）+ ARPANETの同時期創設（1969）= 「一緒のもの」と誤認</text>
</svg>
- 
- **1990年代後半: Web普及で固定化**
- Wikipedia草創期にこの説が「事実」として記述され、世界中に拡散
- 
- **2000年代以降: 教科書への採用**
- 情報リテラシー教材・大学IT入門授業の定番説明文になる

<!--
誤情報の伝播メカニズムの典型例。権威ある媒体が繰り返すことで「常識」になっていきます。
-->

---

# 神話の「証拠」として引用されるもの（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- **よく引用されるポール・バランの1964年RAND論文**
- 「On Distributed Communications Networks」
- → 確かに核攻撃耐性の通信網を論じている
- → しかし **ARPANETとは別の研究** で、軍に採用されなかった
- 

<!--
Paul Baranの研究は本当に存在します。ただしそれはARPANETの設計書ではない。この2つを混同したことが神話の根本原因です。
-->

---

# 神話の「証拠」として引用されるもの（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- **ARPAの1969年の予算申請書**
- → リソース共有・研究促進が主目的
- → 「核攻撃耐性」という文字はほとんど登場しない
- 
- **問題の本質:**
- バランの研究（核耐性）とARPANET（リソース共有）を**同一視**している

<!--
Paul Baranの研究は本当に存在します。ただしそれはARPANETの設計書ではない。この2つを混同したことが神話の根本原因です。
-->

---

<!-- _class: lead -->
# Part 2: 本当の文脈 — 冷戦・ARPA・コンピュータ科学

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">冷戦とARPAの設立背景（1957〜1958年）</text>
  <!-- Sputnik event -->
  <rect x="40" y="50" width="200" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">スプートニクショック</text>
  <text x="140" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">1957年10月4日</text>
  <text x="140" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ソ連が世界初の人工衛星を</text>
  <text x="140" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">打ち上げ</text>
  <text x="140" y="152" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">「技術で後れを取った」</text>
  <!-- Arrow -->
  <line x1="240" y1="110" x2="278" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,105 288,110 276,115" fill="#aaa"/>
  <!-- ARPA formation -->
  <rect x="290" y="50" width="220" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ARPA 設立（1958年2月）</text>
  <text x="305" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">アイゼンハワー大統領が署名</text>
  <text x="305" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 「技術的奇襲を防ぐ」</text>
  <text x="305" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">方法: 大学・民間への研究委託</text>
  <text x="305" y="150" fill="#4fc3f7" font-size="11" font-family="sans-serif">→ 基礎研究を加速する機関</text>
  <!-- Arrow -->
  <line x1="510" y1="110" x2="548" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="546,105 558,110 546,115" fill="#aaa"/>
  <!-- IPTO -->
  <rect x="560" y="50" width="200" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="660" y="74" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">IPTO 設立（1962年）</text>
  <text x="575" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider が初代所長</text>
  <text x="575" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">使命: コンピュータ科学の</text>
  <text x="575" y="128" fill="#ffffff" font-size="11" font-family="sans-serif">基礎研究を推進</text>
  <text x="575" y="148" fill="#69f0ae" font-size="11" font-family="sans-serif">→ ARPANETの思想的起源</text>
  <!-- Key point box -->
  <rect x="40" y="195" width="720" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="218" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な区別</text>
  <rect x="60" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="210" y="252" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">ARPA = 軍の機関 ✓</text>
  <text x="210" y="272" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 予算は軍事費から</text>
  <text x="210" y="290" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 議会承認に安保貢献が必要</text>
  <rect x="440" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="#69f0ae" stroke-width="1"/>
  <text x="590" y="252" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">目的 = 研究推進 ✓</text>
  <text x="590" y="272" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 研究者の問題を解く</text>
  <text x="590" y="290" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 核攻撃対策ではない</text>
</svg>
- スプートニクから始まる、研究者たちの問題意識


---

# スプートニクショックとARPAの設立（1957〜1958年）（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">冷戦とARPAの設立背景（1957〜1958年）</text>
  <!-- Sputnik event -->
  <rect x="40" y="50" width="200" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">スプートニクショック</text>
  <text x="140" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">1957年10月4日</text>
  <text x="140" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">ソ連が世界初の人工衛星を</text>
  <text x="140" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">打ち上げ</text>
  <text x="140" y="152" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">「技術で後れを取った」</text>
  <!-- Arrow -->
  <line x1="240" y1="110" x2="278" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,105 288,110 276,115" fill="#aaa"/>
  <!-- ARPA formation -->
  <rect x="290" y="50" width="220" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ARPA 設立（1958年2月）</text>
  <text x="305" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">アイゼンハワー大統領が署名</text>
  <text x="305" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 「技術的奇襲を防ぐ」</text>
  <text x="305" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">方法: 大学・民間への研究委託</text>
  <text x="305" y="150" fill="#4fc3f7" font-size="11" font-family="sans-serif">→ 基礎研究を加速する機関</text>
  <!-- Arrow -->
  <line x1="510" y1="110" x2="548" y2="110" stroke="#aaa" stroke-width="2"/>
  <polygon points="546,105 558,110 546,115" fill="#aaa"/>
  <!-- IPTO -->
  <rect x="560" y="50" width="200" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="660" y="74" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">IPTO 設立（1962年）</text>
  <text x="575" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider が初代所長</text>
  <text x="575" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">使命: コンピュータ科学の</text>
  <text x="575" y="128" fill="#ffffff" font-size="11" font-family="sans-serif">基礎研究を推進</text>
  <text x="575" y="148" fill="#69f0ae" font-size="11" font-family="sans-serif">→ ARPANETの思想的起源</text>
  <!-- Key point box -->
  <rect x="40" y="195" width="720" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="218" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な区別</text>
  <rect x="60" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="210" y="252" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold" font-family="sans-serif">ARPA = 軍の機関 ✓</text>
  <text x="210" y="272" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 予算は軍事費から</text>
  <text x="210" y="290" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 議会承認に安保貢献が必要</text>
  <rect x="440" y="232" width="300" height="68" rx="6" fill="#1a1a2e" stroke="#69f0ae" stroke-width="1"/>
  <text x="590" y="252" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">目的 = 研究推進 ✓</text>
  <text x="590" y="272" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 研究者の問題を解く</text>
  <text x="590" y="290" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">→ 核攻撃対策ではない</text>
</svg>
- **1957年10月4日: スプートニク1号打ち上げ成功**
- ソ連が世界初の人工衛星を軌道に乗せる
- アメリカ全土に衝撃 — 「技術で後れを取った」
- 
- **1958年2月: ARPA設立（Advanced Research Projects Agency）**

<!--
ARPAは確かに軍の機関です。ただし実施機関ではなく、研究委託機関。プログラムマネージャーが大学や研究所に予算を配分する仕組みでした。
-->

---

# スプートニクショックとARPAの設立（1957〜1958年）（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Licklider の「銀河間コンピュータネットワーク」構想</text>
  <!-- Person box -->
  <rect x="40" y="50" width="200" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">J.C.R. Licklider</text>
  <text x="140" y="94" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学者・CS者</text>
  <text x="140" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">MIT → BBN → ARPA</text>
  <text x="140" y="132" text-anchor="middle" fill="#4fc3f7" font-size="11" font-family="sans-serif">「コンピュータの父」の一人</text>
  <text x="140" y="152" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1915〜1990</text>
  <!-- Vision box -->
  <rect x="280" y="50" width="480" height="140" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="520" y="74" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1963年4月メモ「銀河間コンピュータネットワーク」</text>
  <text x="295" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">「全米の研究者がネットワーク経由でコンピュータを共有する」</text>
  <text x="295" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「高価なコンピュータを複数拠点でシェアして研究を加速」</text>
  <text x="295" y="134" fill="#ffffff" font-size="11" font-family="sans-serif">IBM 7094 の年間リース料: 約 $1,000,000 (1962年)</text>
  <text x="295" y="154" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">→ タイムシェアリングをネットワーク越しに拡張する発想</text>
  <text x="295" y="175" fill="#aaa" font-size="11" font-family="sans-serif">核戦争への言及: ゼロ</text>
  <!-- Bottom: connection to ARPANET -->
  <rect x="40" y="220" width="720" height="90" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1"/>
  <text x="400" y="244" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPANETへの直接的な思想的継承</text>
  <text x="80" y="266" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider（1960）: 人間とコンピュータの共生を提唱</text>
  <text x="80" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">↓ Bob Taylor（1966）: 「3台の端末問題」を解く = ARPANETの直接的動機</text>
  <text x="80" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">↓ ARPANET（1969）: 研究者間のリソース共有ネットワークとして稼働</text>
</svg>
- アイゼンハワー大統領が署名
- 目的: 「技術的奇襲を防ぐ」先進研究機関
- 
- **重要な点:**
- ARPAは軍直属だが、基礎研究を大学・民間に委託する機関
- 「核戦争に勝つ」ではなく **「技術で追い越される前に研究せよ」** が使命

<!--
ARPAは確かに軍の機関です。ただし実施機関ではなく、研究委託機関。プログラムマネージャーが大学や研究所に予算を配分する仕組みでした。
-->

---

# J.C.R. Licklider — "Man-Computer Symbiosis"の夢（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Licklider の「銀河間コンピュータネットワーク」構想</text>
  <!-- Person box -->
  <rect x="40" y="50" width="200" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">J.C.R. Licklider</text>
  <text x="140" y="94" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学者・CS者</text>
  <text x="140" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">MIT → BBN → ARPA</text>
  <text x="140" y="132" text-anchor="middle" fill="#4fc3f7" font-size="11" font-family="sans-serif">「コンピュータの父」の一人</text>
  <text x="140" y="152" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1915〜1990</text>
  <!-- Vision box -->
  <rect x="280" y="50" width="480" height="140" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="520" y="74" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1963年4月メモ「銀河間コンピュータネットワーク」</text>
  <text x="295" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">「全米の研究者がネットワーク経由でコンピュータを共有する」</text>
  <text x="295" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「高価なコンピュータを複数拠点でシェアして研究を加速」</text>
  <text x="295" y="134" fill="#ffffff" font-size="11" font-family="sans-serif">IBM 7094 の年間リース料: 約 $1,000,000 (1962年)</text>
  <text x="295" y="154" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">→ タイムシェアリングをネットワーク越しに拡張する発想</text>
  <text x="295" y="175" fill="#aaa" font-size="11" font-family="sans-serif">核戦争への言及: ゼロ</text>
  <!-- Bottom: connection to ARPANET -->
  <rect x="40" y="220" width="720" height="90" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1"/>
  <text x="400" y="244" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPANETへの直接的な思想的継承</text>
  <text x="80" y="266" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider（1960）: 人間とコンピュータの共生を提唱</text>
  <text x="80" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">↓ Bob Taylor（1966）: 「3台の端末問題」を解く = ARPANETの直接的動機</text>
  <text x="80" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">↓ ARPANET（1969）: 研究者間のリソース共有ネットワークとして稼働</text>
</svg>
- **J.C.R. Licklider（1915〜1990）**
- 心理学者・コンピュータ科学者、MIT→BBN→ARPA
- 
- **1960年論文: "Man-Computer Symbiosis"**
- 「人間とコンピュータが共生し、知的作業を共同で行う未来」
- 「コンピュータは計算機ではなく、思考のパートナー」

<!--
Lickliderは後に「コンピュータの父」の一人と呼ばれます。彼のビジョンは明確にリソース共有と人間の知的活動の拡張でした。核戦争の「か」の字もありません。
-->

---

# J.C.R. Licklider — "Man-Computer Symbiosis"の夢（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Licklider の「銀河間コンピュータネットワーク」構想</text>
  <!-- Person box -->
  <rect x="40" y="50" width="200" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">J.C.R. Licklider</text>
  <text x="140" y="94" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学者・CS者</text>
  <text x="140" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">MIT → BBN → ARPA</text>
  <text x="140" y="132" text-anchor="middle" fill="#4fc3f7" font-size="11" font-family="sans-serif">「コンピュータの父」の一人</text>
  <text x="140" y="152" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1915〜1990</text>
  <!-- Vision box -->
  <rect x="280" y="50" width="480" height="140" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="520" y="74" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1963年4月メモ「銀河間コンピュータネットワーク」</text>
  <text x="295" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">「全米の研究者がネットワーク経由でコンピュータを共有する」</text>
  <text x="295" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「高価なコンピュータを複数拠点でシェアして研究を加速」</text>
  <text x="295" y="134" fill="#ffffff" font-size="11" font-family="sans-serif">IBM 7094 の年間リース料: 約 $1,000,000 (1962年)</text>
  <text x="295" y="154" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">→ タイムシェアリングをネットワーク越しに拡張する発想</text>
  <text x="295" y="175" fill="#aaa" font-size="11" font-family="sans-serif">核戦争への言及: ゼロ</text>
  <!-- Bottom: connection to ARPANET -->
  <rect x="40" y="220" width="720" height="90" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1"/>
  <text x="400" y="244" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPANETへの直接的な思想的継承</text>
  <text x="80" y="266" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider（1960）: 人間とコンピュータの共生を提唱</text>
  <text x="80" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">↓ Bob Taylor（1966）: 「3台の端末問題」を解く = ARPANETの直接的動機</text>
  <text x="80" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">↓ ARPANET（1969）: 研究者間のリソース共有ネットワークとして稼働</text>
</svg>
- 
- **1962年: IPTO初代所長に就任**
- Information Processing Techniques Office（情報処理技術局）
- 
- **1963年4月: 「銀河間コンピュータネットワーク」メモ**
- 全米の研究者がネットワーク経由でコンピュータを共有する構想
- → ARPANETの**思想的起源**

<!--
Lickliderは後に「コンピュータの父」の一人と呼ばれます。彼のビジョンは明確にリソース共有と人間の知的活動の拡張でした。核戦争の「か」の字もありません。
-->

---

# IPTO設立と「銀河間コンピュータネットワーク」構想（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Licklider の「銀河間コンピュータネットワーク」構想</text>
  <!-- Person box -->
  <rect x="40" y="50" width="200" height="140" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="74" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">J.C.R. Licklider</text>
  <text x="140" y="94" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">心理学者・CS者</text>
  <text x="140" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">MIT → BBN → ARPA</text>
  <text x="140" y="132" text-anchor="middle" fill="#4fc3f7" font-size="11" font-family="sans-serif">「コンピュータの父」の一人</text>
  <text x="140" y="152" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">1915〜1990</text>
  <!-- Vision box -->
  <rect x="280" y="50" width="480" height="140" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="520" y="74" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1963年4月メモ「銀河間コンピュータネットワーク」</text>
  <text x="295" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">「全米の研究者がネットワーク経由でコンピュータを共有する」</text>
  <text x="295" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「高価なコンピュータを複数拠点でシェアして研究を加速」</text>
  <text x="295" y="134" fill="#ffffff" font-size="11" font-family="sans-serif">IBM 7094 の年間リース料: 約 $1,000,000 (1962年)</text>
  <text x="295" y="154" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">→ タイムシェアリングをネットワーク越しに拡張する発想</text>
  <text x="295" y="175" fill="#aaa" font-size="11" font-family="sans-serif">核戦争への言及: ゼロ</text>
  <!-- Bottom: connection to ARPANET -->
  <rect x="40" y="220" width="720" height="90" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1"/>
  <text x="400" y="244" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPANETへの直接的な思想的継承</text>
  <text x="80" y="266" fill="#ffffff" font-size="11" font-family="sans-serif">Licklider（1960）: 人間とコンピュータの共生を提唱</text>
  <text x="80" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">↓ Bob Taylor（1966）: 「3台の端末問題」を解く = ARPANETの直接的動機</text>
  <text x="80" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">↓ ARPANET（1969）: 研究者間のリソース共有ネットワークとして稼働</text>
</svg>
- **Lickliderが1963年のメモで書いたこと:**
- 「各地の研究者が同じコンピュータリソースを使える環境を作りたい」
- 「高価なコンピュータを複数の拠点で共有することで研究を加速する」
- 
- **当時のコンピュータの現実:**
- IBM 7094: 年間リース料 約$1,000,000（1962年）

<!--
コンピュータは当時極めて高価でした。現代で言えば「AIスパコンを各大学が個別に持つのは無駄だからネットワークで共有しよう」に近い発想です。
-->

---

# IPTO設立と「銀河間コンピュータネットワーク」構想（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- 各大学が同じ機種を個別購入するのは非効率
- 
- **タイムシェアリングの発想:**
- 1台のコンピュータを複数ユーザーが時分割で共有
- → ネットワーク経由にすれば **地理的距離も超えられる**
- 
- これが ARPANET の根本的動機

<!--
コンピュータは当時極めて高価でした。現代で言えば「AIスパコンを各大学が個別に持つのは無駄だからネットワークで共有しよう」に近い発想です。
-->

---

# 1966年のBob Taylor — 3台の端末問題（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- **Bob Taylor（IPTO 3代目所長）が直面した問題:**
- 
- オフィスの中に3台の端末がある
- - **TX-2**（MIT） — 接続するための端末①
- - **AN/FSQ-32**（SDC、カリフォルニア） — 端末②
- - **IBM 360**（大学施設） — 端末③

<!--
これはTaylor自身が後年のインタビューで語っています。核戦争の話は一切出てきません。純粋に「不便だから」という、エンジニアリング的動機です。
-->

---

# 1966年のBob Taylor — 3台の端末問題（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- 
- 「3台にアクセスするために3回ログインし直す必要がある」
- 「端末のコマンド体系もバラバラで非効率極まりない」
- 
- **→ 「1台の端末からすべての研究用コンピュータにアクセスしたい」**
- これがARPANET立案の **直接の動機** （Taylor本人の証言）

<!--
これはTaylor自身が後年のインタビューで語っています。核戦争の話は一切出てきません。純粋に「不便だから」という、エンジニアリング的動機です。
-->

---

# 本当の動機: リソース共有とコスト削減（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- **ARPANETの設計目標（1966年提案書より）:**
- ① 高価なコンピュータリソースを複数拠点で共有する
- ② ARPA資金提供を受けた研究者間の連携を強化する
- ③ 異種コンピュータ間の相互運用性を実現する
- 
- **公式記録に「核攻撃耐性」は:**

<!--
Katie Hafner and Matthew Lyonの著書「Where Wizards Stay Up Late」(1996)がこれらの文書を詳細に調査し、核攻撃耐性が主目的でないことを示しました。
-->

---

# 本当の動機: リソース共有とコスト削減（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- ARPANET計画書（1966）— 言及なし
- BBNへのRFP（1968）— 言及なし
- 最初の技術仕様書 — 言及なし
- 
- **結論:**
- ARPANETは **「研究者の不便を解消するため」** に作られた
- 核戦争は設計の主目的ではなかった

<!--
Katie Hafner and Matthew Lyonの著書「Where Wizards Stay Up Late」(1996)がこれらの文書を詳細に調査し、核攻撃耐性が主目的でないことを示しました。
-->

---

<!-- _class: lead -->
# Part 3: ポール・バランと混同の源泉

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- 核耐性ネットワークを本当に研究した人物


---

# ポール・バランが本当に研究したもの（RAND、1960〜64年）（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- **Paul Baran（1926〜2011）**
- RAND Corporationの研究員、ポーランド系アメリカ人
- 
- **研究の動機（本物の核戦争対策）:**
- 「核攻撃後に軍の指揮命令系統が生き残るには？」
- 「中央集権型通信網が破壊されたら、反撃命令が出せない」
- 

<!--
バランの研究は確かに存在し、重要でした。しかし彼が設計したのはARPANETではありません。彼の研究はパケット交換の理論的基礎の一つになりましたが、ARPANETの直接の設計書ではありません。
-->

---

# ポール・バランが本当に研究したもの（RAND、1960〜64年）（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">バランの研究 vs ARPANET — 完全に別物</text>
  <!-- Baran box -->
  <rect x="40" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">ポール・バランの研究</text>
  <text x="200" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (1960〜1964)</text>
  <text x="55" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 核攻撃後の軍指揮命令系統維持</text>
  <text x="55" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 軍の音声電話網</text>
  <text x="55" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">結果: AT&amp;T等が実現不可能と判断</text>
  <text x="55" y="174" fill="#e91e63" font-size="11" font-family="sans-serif">→ 1964年に棚上げ</text>
  <text x="55" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">バラン自身の発言:</text>
  <text x="55" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETを設計したのは私ではない」</text>
  <text x="55" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（生涯この誤解を訂正し続けた）</text>
  <!-- Not equal sign -->
  <text x="393" y="172" text-anchor="middle" fill="#e91e63" font-size="36" font-weight="bold" font-family="sans-serif">≠</text>
  <!-- ARPANET box -->
  <rect x="440" y="50" width="320" height="230" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">ARPANET</text>
  <text x="600" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ARPA / BBN (1966〜1969)</text>
  <text x="455" y="120" fill="#ffffff" font-size="11" font-family="sans-serif">目的: 研究者のリソース共有</text>
  <text x="455" y="138" fill="#ffffff" font-size="11" font-family="sans-serif">対象: 大学・研究機関のコンピュータ</text>
  <text x="455" y="156" fill="#ffffff" font-size="11" font-family="sans-serif">実現: BBNが設計・構築</text>
  <text x="455" y="174" fill="#69f0ae" font-size="11" font-family="sans-serif">→ 1969年稼働</text>
  <text x="455" y="198" fill="#ffffff" font-size="11" font-family="sans-serif">Larry Roberts:</text>
  <text x="455" y="216" fill="#ffffff" font-size="11" font-family="sans-serif">「設計目的はリソース共有だった」</text>
  <text x="455" y="234" fill="#aaa" font-size="10" font-family="sans-serif">（IEEE Annals 1988年）</text>
  <!-- Bottom note -->
  <rect x="40" y="295" width="720" height="35" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="400" y="317" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">バランのアイデア（パケット交換）は参照されたが、ARPANETの設計書ではない — 「二重の誤り」</text>
</svg>
- **1964年報告書シリーズ: 11巻**
- 「On Distributed Communications Networks」
- 分散型通信網の理論的設計 — **軍の音声電話網**のため
- 
- **RANDと軍の反応:**
- AT&Tなどの電話会社が実現可能性を疑い、採用されず
- バランの研究は **紙の上の提案で終わった**

<!--
バランの研究は確かに存在し、重要でした。しかし彼が設計したのはARPANETではありません。彼の研究はパケット交換の理論的基礎の一つになりましたが、ARPANETの直接の設計書ではありません。
-->

---

# 分散型ネットワークの3分類（バランの図）

![w:860 center](assets/network-topology.svg)

<!--
バランは1964年の報告書にこの3分類を示しました。中央集権型は一点破壊で全滅。分散型は一部が破壊されても他のルートで通信が維持できる。この図がARPANETの設計思想の「証拠」として誤用されてきました。
-->

---

# バランの研究と軍 — ARPANETとは別物（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">パケット交換の独立発明 — 核戦争は必要条件ではなかった</text>
  <!-- Baran left -->
  <rect x="40" y="55" width="240" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="160" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">ポール・バラン (1964)</text>
  <text x="160" y="98" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (米)</text>
  <text x="55" y="118" fill="#ffffff" font-size="11" font-family="sans-serif">動機: 核攻撃後の通信維持</text>
  <text x="55" y="136" fill="#ffffff" font-size="11" font-family="sans-serif">軍事目的</text>
  <text x="55" y="160" fill="#e91e63" font-size="11" font-family="sans-serif">「分散型ネットワーク」</text>
  <text x="55" y="178" fill="#e91e63" font-size="11" font-family="sans-serif">「パケット分割通信」</text>
  <text x="55" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（採用されず棚上げ）</text>
  <!-- Same result in the middle -->
  <rect x="320" y="100" width="160" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="126" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">パケット交換</text>
  <text x="400" y="146" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Packet Switching</text>
  <text x="400" y="164" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">時代の必然</text>
  <!-- Arrows -->
  <line x1="280" y1="148" x2="318" y2="148" stroke="#f9a825" stroke-width="2"/>
  <polygon points="316,143 328,148 316,153" fill="#f9a825"/>
  <line x1="480" y1="148" x2="518" y2="148" stroke="#f9a825" stroke-width="2"/>
  <polygon points="480,143 480,153 518,148" fill="#f9a825"/>
  <!-- Davies right -->
  <rect x="520" y="55" width="240" height="185" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="640" y="78" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">Donald Davies (1965〜66)</text>
  <text x="640" y="98" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">英国NPL (英)</text>
  <text x="535" y="118" fill="#ffffff" font-size="11" font-family="sans-serif">動機: 公衆データ通信の効率化</text>
  <text x="535" y="136" fill="#ffffff" font-size="11" font-family="sans-serif">民間・効率化目的</text>
  <text x="535" y="160" fill="#69f0ae" font-size="11" font-family="sans-serif">「packet」という用語を命名</text>
  <text x="535" y="178" fill="#69f0ae" font-size="11" font-family="sans-serif">核戦争との関係: 皆無</text>
  <text x="535" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（独立に同じ概念に到達）</text>
  <!-- Key insight -->
  <rect x="40" y="262" width="720" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="282" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">結論: 核戦争対策はパケット交換の「必要条件」ではなかった</text>
  <text x="400" y="298" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">異なる動機から同じ技術が独立に生まれた = 「時代の必然」</text>
</svg>
- **バランの研究が採用されなかった理由:**
- AT&T: 「既存電話網を分散型に替える必要はない」
- 空軍: 「技術的に実現困難」と判断
- → バランの提案は **1964年に棚上げ**
- 
- **ARPANETとの関係:**
- Larry Roberts（ARPANET技術責任者）はバランの論文を読んでいた

<!--
バランは自分の研究がARPANETの設計書として使われたという誤解を生涯訂正し続けました。
-->

---

# バランの研究と軍 — ARPANETとは別物（2/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">パケット交換の独立発明 — 核戦争は必要条件ではなかった</text>
  <!-- Baran left -->
  <rect x="40" y="55" width="240" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="160" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">ポール・バラン (1964)</text>
  <text x="160" y="98" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">RAND Corporation (米)</text>
  <text x="55" y="118" fill="#ffffff" font-size="11" font-family="sans-serif">動機: 核攻撃後の通信維持</text>
  <text x="55" y="136" fill="#ffffff" font-size="11" font-family="sans-serif">軍事目的</text>
  <text x="55" y="160" fill="#e91e63" font-size="11" font-family="sans-serif">「分散型ネットワーク」</text>
  <text x="55" y="178" fill="#e91e63" font-size="11" font-family="sans-serif">「パケット分割通信」</text>
  <text x="55" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（採用されず棚上げ）</text>
  <!-- Same result in the middle -->
  <rect x="320" y="100" width="160" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="126" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">パケット交換</text>
  <text x="400" y="146" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">Packet Switching</text>
  <text x="400" y="164" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">時代の必然</text>
  <!-- Arrows -->
  <line x1="280" y1="148" x2="318" y2="148" stroke="#f9a825" stroke-width="2"/>
  <polygon points="316,143 328,148 316,153" fill="#f9a825"/>
  <line x1="480" y1="148" x2="518" y2="148" stroke="#f9a825" stroke-width="2"/>
  <polygon points="480,143 480,153 518,148" fill="#f9a825"/>
  <!-- Davies right -->
  <rect x="520" y="55" width="240" height="185" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="640" y="78" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">Donald Davies (1965〜66)</text>
  <text x="640" y="98" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">英国NPL (英)</text>
  <text x="535" y="118" fill="#ffffff" font-size="11" font-family="sans-serif">動機: 公衆データ通信の効率化</text>
  <text x="535" y="136" fill="#ffffff" font-size="11" font-family="sans-serif">民間・効率化目的</text>
  <text x="535" y="160" fill="#69f0ae" font-size="11" font-family="sans-serif">「packet」という用語を命名</text>
  <text x="535" y="178" fill="#69f0ae" font-size="11" font-family="sans-serif">核戦争との関係: 皆無</text>
  <text x="535" y="198" fill="#aaa" font-size="10" font-family="sans-serif">（独立に同じ概念に到達）</text>
  <!-- Key insight -->
  <rect x="40" y="262" width="720" height="44" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="282" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">結論: 核戦争対策はパケット交換の「必要条件」ではなかった</text>
  <text x="400" y="298" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">異なる動機から同じ技術が独立に生まれた = 「時代の必然」</text>
</svg>
- パケット交換の**アイデアは参照**したが、設計は独立
- 
- **バラン自身の発言:**
- 「ARPANETを設計したのは私ではない」
- 「私の研究が影響を与えたとは思うが、別物だ」
- 
- → 「バランがARPANETを核耐性のため設計した」は **二重の誤り**

<!--
バランは自分の研究がARPANETの設計書として使われたという誤解を生涯訂正し続けました。
-->

---

# ドナルド・デービス — パケット交換の独立発明（英国NPL）（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">IMP（Interface Message Processor）— ルーターの祖先</text>
  <!-- Host A -->
  <rect x="40" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="90" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト A</text>
  <text x="90" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 7094</text>
  <!-- IMP A -->
  <rect x="170" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="215" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP A</text>
  <text x="215" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="215" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="215" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">400kg, 2kW</text>
  <!-- Network in middle -->
  <rect x="300" y="130" width="200" height="80" rx="8" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="400" y="158" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">パケット交換</text>
  <text x="400" y="176" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ネットワーク</text>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50kbps 専用回線</text>
  <!-- IMP B -->
  <rect x="540" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="585" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP B</text>
  <text x="585" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="585" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="585" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">$65,000/台</text>
  <!-- Host B -->
  <rect x="660" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="710" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト B</text>
  <text x="710" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">SDS Sigma 7</text>
  <!-- Arrows -->
  <line x1="140" y1="150" x2="170" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="168,145 180,150 168,155" fill="#f9a825"/>
  <line x1="260" y1="150" x2="300" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="298,145 310,150 298,155" fill="#f9a825"/>
  <line x1="500" y1="150" x2="540" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="538,145 550,150 538,155" fill="#f9a825"/>
  <line x1="630" y1="150" x2="660" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="658,145 670,150 658,155" fill="#f9a825"/>
  <!-- IMPs role -->
  <rect x="40" y="230" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">IMPの革新的役割</text>
  <text x="60" y="272" fill="#ffffff" font-size="11" font-family="sans-serif">各ホストはIMPのプロトコルに従うだけでよい（異種コンピュータ間の「翻訳機」）</text>
  <text x="60" y="290" fill="#ffffff" font-size="11" font-family="sans-serif">→ 現代のルーターの原型　→ 核攻撃対策ではなく相互運用性のための装置</text>
</svg>
- **Donald Davies（1924〜2000）**
- 英国国立物理学研究所（NPL）の研究員
- 
- **1965〜66年: パケット交換の独立発明**
- バランとは独立に、全く同じ概念に到達
- 「packet（パケット）」という用語を命名したのはDavies
- 

<!--
Daviesのケースは非常に重要です。核戦争とは全く無関係の動機から、同じ技術が生まれました。これはパケット交換が核戦争対策のために生まれたわけではないことを示す独立した証拠です。
-->

---

# ドナルド・デービス — パケット交換の独立発明（英国NPL）（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">IMP（Interface Message Processor）— ルーターの祖先</text>
  <!-- Host A -->
  <rect x="40" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="90" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト A</text>
  <text x="90" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 7094</text>
  <!-- IMP A -->
  <rect x="170" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="215" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP A</text>
  <text x="215" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="215" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="215" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">400kg, 2kW</text>
  <!-- Network in middle -->
  <rect x="300" y="130" width="200" height="80" rx="8" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="400" y="158" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">パケット交換</text>
  <text x="400" y="176" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ネットワーク</text>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50kbps 専用回線</text>
  <!-- IMP B -->
  <rect x="540" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="585" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP B</text>
  <text x="585" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="585" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="585" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">$65,000/台</text>
  <!-- Host B -->
  <rect x="660" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="710" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト B</text>
  <text x="710" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">SDS Sigma 7</text>
  <!-- Arrows -->
  <line x1="140" y1="150" x2="170" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="168,145 180,150 168,155" fill="#f9a825"/>
  <line x1="260" y1="150" x2="300" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="298,145 310,150 298,155" fill="#f9a825"/>
  <line x1="500" y1="150" x2="540" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="538,145 550,150 538,155" fill="#f9a825"/>
  <line x1="630" y1="150" x2="660" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="658,145 670,150 658,155" fill="#f9a825"/>
  <!-- IMPs role -->
  <rect x="40" y="230" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">IMPの革新的役割</text>
  <text x="60" y="272" fill="#ffffff" font-size="11" font-family="sans-serif">各ホストはIMPのプロトコルに従うだけでよい（異種コンピュータ間の「翻訳機」）</text>
  <text x="60" y="290" fill="#ffffff" font-size="11" font-family="sans-serif">→ 現代のルーターの原型　→ 核攻撃対策ではなく相互運用性のための装置</text>
</svg>
- **Daviesの動機:**
- 公衆データ通信網の効率化
- 核戦争との関係は **皆無**
- 
- **重要な示唆:**
- 同じ時期に英米で独立に発明された
- → パケット交換は **「時代の必然」** だった
- → 核戦争対策は必須の動機ではなかった

<!--
Daviesのケースは非常に重要です。核戦争とは全く無関係の動機から、同じ技術が生まれました。これはパケット交換が核戦争対策のために生まれたわけではないことを示す独立した証拠です。
-->

---

<!-- _class: lead -->
# Part 4: ARPANETの実際の設計と構築

- 技術者たちが本当に解こうとした問題


---

# 技術的課題 — 異種コンピュータをどう繋ぐか（1/2）

- **1960年代のコンピュータの現実:**
- IBM 7094、DEC PDP-10、SDS Sigma 7…
- メーカー・機種ごとに命令セット・OS・通信方式が全く異なる
- 
- **誰も解けていなかった問題:**
- 「MITのIBMマシンとUCLAのSDS機が通信できるか？」
- → 当時は不可能だった

<!--
現代のクラウドAPIの設計に近い問題意識です。「異なる環境のコンピュータをどう繋ぐか」はエンジニアリングの核心的な課題でした。
-->

---

# 技術的課題 — 異種コンピュータをどう繋ぐか（2/2）

- 
- **ARPANETが解くべき技術課題:**
- ① 異種コンピュータ間の共通インターフェース設計
- ② 長距離通信の信頼性確保
- ③ 複数ユーザーが同時に使える帯域の確保
- 
- → これらはすべて **リソース共有のための工学的課題**

<!--
現代のクラウドAPIの設計に近い問題意識です。「異なる環境のコンピュータをどう繋ぐか」はエンジニアリングの核心的な課題でした。
-->

---

# パケット交換 vs 回線交換

![w:860 center](assets/packet-vs-circuit.svg)

<!--
回線交換は電話の仕組みです。通話中は専用回線を占有するため、コンピュータ通信のような「バースト型」トラフィックには非効率でした。パケット交換は回線を多くのユーザーで共有できるため、コンピュータ通信に適していました。
-->

---

# IMP（Interface Message Processor）（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">IMP（Interface Message Processor）— ルーターの祖先</text>
  <!-- Host A -->
  <rect x="40" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="90" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト A</text>
  <text x="90" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 7094</text>
  <!-- IMP A -->
  <rect x="170" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="215" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP A</text>
  <text x="215" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="215" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="215" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">400kg, 2kW</text>
  <!-- Network in middle -->
  <rect x="300" y="130" width="200" height="80" rx="8" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="400" y="158" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">パケット交換</text>
  <text x="400" y="176" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ネットワーク</text>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50kbps 専用回線</text>
  <!-- IMP B -->
  <rect x="540" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="585" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP B</text>
  <text x="585" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="585" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="585" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">$65,000/台</text>
  <!-- Host B -->
  <rect x="660" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="710" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト B</text>
  <text x="710" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">SDS Sigma 7</text>
  <!-- Arrows -->
  <line x1="140" y1="150" x2="170" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="168,145 180,150 168,155" fill="#f9a825"/>
  <line x1="260" y1="150" x2="300" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="298,145 310,150 298,155" fill="#f9a825"/>
  <line x1="500" y1="150" x2="540" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="538,145 550,150 538,155" fill="#f9a825"/>
  <line x1="630" y1="150" x2="660" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="658,145 670,150 658,155" fill="#f9a825"/>
  <!-- IMPs role -->
  <rect x="40" y="230" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">IMPの革新的役割</text>
  <text x="60" y="272" fill="#ffffff" font-size="11" font-family="sans-serif">各ホストはIMPのプロトコルに従うだけでよい（異種コンピュータ間の「翻訳機」）</text>
  <text x="60" y="290" fill="#ffffff" font-size="11" font-family="sans-serif">→ 現代のルーターの原型　→ 核攻撃対策ではなく相互運用性のための装置</text>
</svg>
- **BBN Technologies（ボルト・ベラネク・アンド・ニューマン）**
- 1968年のRFP（提案依頼書）でARPAが設計を委託
- 
- **IMPの役割:**
- 各ホストコンピュータの「前に置く」専用ルーター
- ホスト側はIMPのプロトコルに従うだけでよい
- → 異種コンピュータ間の **「翻訳機」**

<!--
IMPはルーターの祖先です。ホストコンピュータは複雑なネットワーク処理を知らなくてよく、IMPに任せるという設計は現代のネットワーク設計の基本原則を先取りしていました。
-->

---

# IMP（Interface Message Processor）（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">IMP（Interface Message Processor）— ルーターの祖先</text>
  <!-- Host A -->
  <rect x="40" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="90" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト A</text>
  <text x="90" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 7094</text>
  <!-- IMP A -->
  <rect x="170" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="215" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP A</text>
  <text x="215" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="215" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="215" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">400kg, 2kW</text>
  <!-- Network in middle -->
  <rect x="300" y="130" width="200" height="80" rx="8" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="400" y="158" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">パケット交換</text>
  <text x="400" y="176" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">ネットワーク</text>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50kbps 専用回線</text>
  <!-- IMP B -->
  <rect x="540" y="105" width="90" height="90" rx="8" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="585" y="130" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">IMP B</text>
  <text x="585" y="148" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Honeywell</text>
  <text x="585" y="164" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">DEC 316</text>
  <text x="585" y="182" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">$65,000/台</text>
  <!-- Host B -->
  <rect x="660" y="120" width="100" height="60" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="710" y="147" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">ホスト B</text>
  <text x="710" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">SDS Sigma 7</text>
  <!-- Arrows -->
  <line x1="140" y1="150" x2="170" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="168,145 180,150 168,155" fill="#f9a825"/>
  <line x1="260" y1="150" x2="300" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="298,145 310,150 298,155" fill="#f9a825"/>
  <line x1="500" y1="150" x2="540" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="538,145 550,150 538,155" fill="#f9a825"/>
  <line x1="630" y1="150" x2="660" y2="150" stroke="#f9a825" stroke-width="2"/>
  <polygon points="658,145 670,150 658,155" fill="#f9a825"/>
  <!-- IMPs role -->
  <rect x="40" y="230" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="252" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">IMPの革新的役割</text>
  <text x="60" y="272" fill="#ffffff" font-size="11" font-family="sans-serif">各ホストはIMPのプロトコルに従うだけでよい（異種コンピュータ間の「翻訳機」）</text>
  <text x="60" y="290" fill="#ffffff" font-size="11" font-family="sans-serif">→ 現代のルーターの原型　→ 核攻撃対策ではなく相互運用性のための装置</text>
</svg>
- 
- **IMPの実態:**
- ハードウェア: Honeywell DEC 316（改造版）
- 重量: 400kg超、消費電力: 2kW
- 1台のコスト: 約 $65,000（1969年）
- 
- → 核攻撃対策ではなく **相互運用性のための装置**

<!--
IMPはルーターの祖先です。ホストコンピュータは複雑なネットワーク処理を知らなくてよく、IMPに任せるという設計は現代のネットワーク設計の基本原則を先取りしていました。
-->

---

# 1969年10月29日 — 「lo」: 最初の送信と最初のクラッシュ（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">ARPANETの成長 — 軍事施設はなかった</text>
  <!-- 1969 -->
  <rect x="40" y="50" width="200" height="145" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="140" y="72" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1969年 4ノード</text>
  <text x="55" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">① UCLA（カリフォルニア大学）</text>
  <text x="55" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">② SRI（スタンフォード研究所）</text>
  <text x="55" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">③ UCSB（カリフォルニア大学SB）</text>
  <text x="55" y="148" fill="#ffffff" font-size="11" font-family="sans-serif">④ U of Utah（ユタ大学）</text>
  <text x="140" y="176" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全て大学・研究機関</text>
  <text x="140" y="194" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">軍事施設: ゼロ</text>
  <!-- 1972 -->
  <rect x="270" y="50" width="200" height="145" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="370" y="72" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1972年 23ノード</text>
  <text x="285" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">MIT・Harvard・CMU</text>
  <text x="285" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">BBN・RAND（民間研究所）</text>
  <text x="285" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">最大トラフィック: 電子メール</text>
  <text x="285" y="150" fill="#aaa" font-size="10" font-family="sans-serif">（設計者が計画していなかった）</text>
  <text x="370" y="178" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">研究コミュニティが中心</text>
  <!-- 1983 -->
  <rect x="500" y="50" width="260" height="145" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="630" y="72" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">1983年 分割</text>
  <text x="515" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">MILNET（軍専用）← 分離</text>
  <text x="515" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">ARPANET（研究用）← 継続</text>
  <text x="515" y="132" fill="#4fc3f7" font-size="11" font-family="sans-serif">TCP/IPへの切り替えも同年</text>
  <text x="515" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「インターネット誕生」</text>
  <text x="630" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">「軍のネット」は分離後</text>
  <!-- Bottom note -->
  <rect x="40" y="218" width="720" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な事実</text>
  <text x="60" y="262" fill="#ffffff" font-size="12" font-family="sans-serif">最初の4ノードに軍事施設がないことは「核戦争対策が主目的でない」証拠の一つ</text>
  <text x="60" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">軍が使うようになったのはARPANETが発展してから — 「軍事技術の民間転用」ではなく</text>
  <text x="60" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">「民間研究技術を軍も使うようになった」が正確な表現</text>
</svg>
- **最初の接続: UCLA → SRI（スタンフォード研究所）**
- 
- UCLA（Charles Kline）がSRIへ送信しようとしたコマンド:
- "login"
- 
- SRIで受信されたのは:
- "lo"

<!--
このエピソードは技術史の中でも特に有名で愛されています。壮大な実験の最初がシステムクラッシュというのは、ある意味で最も「エンジニアリングらしい」スタートでした。
-->

---

# 1969年10月29日 — 「lo」: 最初の送信と最初のクラッシュ（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">ARPANETの成長 — 軍事施設はなかった</text>
  <!-- 1969 -->
  <rect x="40" y="50" width="200" height="145" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="140" y="72" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">1969年 4ノード</text>
  <text x="55" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">① UCLA（カリフォルニア大学）</text>
  <text x="55" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">② SRI（スタンフォード研究所）</text>
  <text x="55" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">③ UCSB（カリフォルニア大学SB）</text>
  <text x="55" y="148" fill="#ffffff" font-size="11" font-family="sans-serif">④ U of Utah（ユタ大学）</text>
  <text x="140" y="176" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全て大学・研究機関</text>
  <text x="140" y="194" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">軍事施設: ゼロ</text>
  <!-- 1972 -->
  <rect x="270" y="50" width="200" height="145" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="370" y="72" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1972年 23ノード</text>
  <text x="285" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">MIT・Harvard・CMU</text>
  <text x="285" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">BBN・RAND（民間研究所）</text>
  <text x="285" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">最大トラフィック: 電子メール</text>
  <text x="285" y="150" fill="#aaa" font-size="10" font-family="sans-serif">（設計者が計画していなかった）</text>
  <text x="370" y="178" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">研究コミュニティが中心</text>
  <!-- 1983 -->
  <rect x="500" y="50" width="260" height="145" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="630" y="72" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">1983年 分割</text>
  <text x="515" y="94" fill="#ffffff" font-size="11" font-family="sans-serif">MILNET（軍専用）← 分離</text>
  <text x="515" y="112" fill="#ffffff" font-size="11" font-family="sans-serif">ARPANET（研究用）← 継続</text>
  <text x="515" y="132" fill="#4fc3f7" font-size="11" font-family="sans-serif">TCP/IPへの切り替えも同年</text>
  <text x="515" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「インターネット誕生」</text>
  <text x="630" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">「軍のネット」は分離後</text>
  <!-- Bottom note -->
  <rect x="40" y="218" width="720" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な事実</text>
  <text x="60" y="262" fill="#ffffff" font-size="12" font-family="sans-serif">最初の4ノードに軍事施設がないことは「核戦争対策が主目的でない」証拠の一つ</text>
  <text x="60" y="284" fill="#ffffff" font-size="11" font-family="sans-serif">軍が使うようになったのはARPANETが発展してから — 「軍事技術の民間転用」ではなく</text>
  <text x="60" y="302" fill="#69f0ae" font-size="11" font-family="sans-serif">「民間研究技術を軍も使うようになった」が正確な表現</text>
</svg>
- 
- **何が起きたか:**
- "l"、"o" を受信した直後、SRIのシステムがクラッシュ
- → 世界初のインターネット送信は **"lo"** で終了
- 
- **歴史的皮肉:**
- 意図せず「Hello」に似た最初のメッセージになった
- クラッシュは数時間後に復旧、完全な「login」に成功

<!--
このエピソードは技術史の中でも特に有名で愛されています。壮大な実験の最初がシステムクラッシュというのは、ある意味で最も「エンジニアリングらしい」スタートでした。
-->

---

# 初期ARPANETの4ノード（1969年）

![w:860 center](assets/arpanet-1969.svg)

<!--
最初の4ノードはすべて西海岸の大学・研究機関でした。軍事施設は一つもありません。これも「軍の核戦争対策のため」という説に疑問を投げかける事実です。
-->

---

# 核攻撃耐性は「副産物」だったか — 証拠を読む（1/2）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話 vs 事実</text>
  <!-- Myth side -->
  <rect x="40" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">神話（広く流布）</text>
  <text x="60" y="112" fill="#e91e63" font-size="13" font-family="sans-serif">「ARPANETは核攻撃に耐えるため</text>
  <text x="60" y="130" fill="#e91e63" font-size="13" font-family="sans-serif">に設計された」</text>
  <text x="60" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: 教科書・Wikipedia・メディア</text>
  <text x="60" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 軍の核サバイバル技術</text>
  <text x="60" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 分散型設計が核耐性の証拠</text>
  <text x="60" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ ポール・バランが設計した</text>
  <text x="60" y="250" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分正しくて</text>
  <text x="60" y="272" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分大きく誤解</text>
  <!-- Fact side -->
  <rect x="420" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="#69f0ae" font-size="16" font-weight="bold" font-family="sans-serif">事実（一次資料）</text>
  <text x="435" y="112" fill="#69f0ae" font-size="13" font-family="sans-serif">「研究者のリソース共有のために</text>
  <text x="435" y="130" fill="#69f0ae" font-size="13" font-family="sans-serif">設計された」</text>
  <text x="435" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: ARPA文書・設計者証言</text>
  <text x="435" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 高価なコンピュータの共有</text>
  <text x="435" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 3台の端末問題を解く</text>
  <text x="435" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ バランの研究は別物</text>
  <text x="435" y="250" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">核耐性は副産物</text>
  <text x="435" y="272" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">（設計目標ではない）</text>
</svg>
- **分散型ネットワークには確かに耐障害性がある:**
- 一つのノードが落ちても別ルートで通信できる
- → これはパケット交換の **副作用として存在する**
- 
- **しかし意図的な設計目標ではなかった:**
- 設計文書に核攻撃耐性の要件なし
- 最初の4ノードに軍事施設なし

<!--
Vint CerfはTCP/IPの共同発明者として最も権威ある証人の一人です。彼が明確に否定しているにもかかわらず、神話は生き続けています。
-->

---

# 核攻撃耐性は「副産物」だったか — 証拠を読む（2/2）

- <svg viewBox="0 0 800 360" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話 vs 事実</text>
  <!-- Myth side -->
  <rect x="40" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="80" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold" font-family="sans-serif">神話（広く流布）</text>
  <text x="60" y="112" fill="#e91e63" font-size="13" font-family="sans-serif">「ARPANETは核攻撃に耐えるため</text>
  <text x="60" y="130" fill="#e91e63" font-size="13" font-family="sans-serif">に設計された」</text>
  <text x="60" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: 教科書・Wikipedia・メディア</text>
  <text x="60" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 軍の核サバイバル技術</text>
  <text x="60" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 分散型設計が核耐性の証拠</text>
  <text x="60" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ ポール・バランが設計した</text>
  <text x="60" y="250" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分正しくて</text>
  <text x="60" y="272" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">半分大きく誤解</text>
  <!-- Fact side -->
  <rect x="420" y="50" width="340" height="280" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="80" text-anchor="middle" fill="#69f0ae" font-size="16" font-weight="bold" font-family="sans-serif">事実（一次資料）</text>
  <text x="435" y="112" fill="#69f0ae" font-size="13" font-family="sans-serif">「研究者のリソース共有のために</text>
  <text x="435" y="130" fill="#69f0ae" font-size="13" font-family="sans-serif">設計された」</text>
  <text x="435" y="160" fill="#ffffff" font-size="12" font-family="sans-serif">出所: ARPA文書・設計者証言</text>
  <text x="435" y="178" fill="#ffffff" font-size="12" font-family="sans-serif">→ 高価なコンピュータの共有</text>
  <text x="435" y="196" fill="#ffffff" font-size="12" font-family="sans-serif">→ 3台の端末問題を解く</text>
  <text x="435" y="214" fill="#ffffff" font-size="12" font-family="sans-serif">→ バランの研究は別物</text>
  <text x="435" y="250" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">核耐性は副産物</text>
  <text x="435" y="272" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">（設計目標ではない）</text>
</svg>
- 1969年〜1972年の設計会議の議事録に記述なし
- 
- **Vint Cerf（TCP/IP共同発明者）の証言:**
- 「核耐性はARPANETの設計目標ではなかった」
- 「この神話は後から貼り付けられたラベルだ」
- 
- → 副産物を **「主目的」にすり替えた** のが神話の正体

<!--
Vint CerfはTCP/IPの共同発明者として最も権威ある証人の一人です。彼が明確に否定しているにもかかわらず、神話は生き続けています。
-->

---

<!-- _class: lead -->
# Part 5: 一次資料が語る真実

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">一次資料が示す証拠</text>
  <!-- Document list -->
  <rect x="40" y="50" width="720" height="240" rx="8" fill="#16213e" stroke="#444" stroke-width="1"/>
  <!-- 1966 proposal -->
  <rect x="60" y="68" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#69f0ae" stroke-width="1"/>
  <text x="76" y="86" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1966年 Bob Taylor &amp; Larry Roberts 提案書</text>
  <text x="76" y="102" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPA資金提供を受けた研究者間でコンピュータリソースを共有する」　核攻撃への言及: ゼロ</text>
  <!-- 1968 RFP -->
  <rect x="60" y="120" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="76" y="138" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1968年 ARPANET RFP（提案依頼書）</text>
  <text x="76" y="154" fill="#ffffff" font-size="11" font-family="sans-serif">要件: 異種コンピュータの相互接続・信頼性・拡張性　軍事要件: ゼロ</text>
  <!-- 1969 BBN report -->
  <rect x="60" y="172" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="76" y="190" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1969年 BBN技術報告書 №1822（IMP仕様書）</text>
  <text x="76" y="206" fill="#ffffff" font-size="11" font-family="sans-serif">詳細な技術仕様　核攻撃への言及: ゼロ　軍事要件: ゼロ</text>
  <!-- Cerf testimony -->
  <rect x="60" y="224" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="76" y="242" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Vint Cerf（TCP/IP共同発明者）証言</text>
  <text x="76" y="258" fill="#e91e63" font-size="11" font-family="sans-serif">「核耐性はARPANETの設計目標ではなかった。この神話は後から貼り付けられたラベルだ」</text>
</svg>
- 文書・証言・研究書が示す事実


---

# 当時のARPA内部文書が示す優先事項（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">一次資料が示す証拠</text>
  <!-- Document list -->
  <rect x="40" y="50" width="720" height="240" rx="8" fill="#16213e" stroke="#444" stroke-width="1"/>
  <!-- 1966 proposal -->
  <rect x="60" y="68" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#69f0ae" stroke-width="1"/>
  <text x="76" y="86" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1966年 Bob Taylor &amp; Larry Roberts 提案書</text>
  <text x="76" y="102" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPA資金提供を受けた研究者間でコンピュータリソースを共有する」　核攻撃への言及: ゼロ</text>
  <!-- 1968 RFP -->
  <rect x="60" y="120" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="76" y="138" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1968年 ARPANET RFP（提案依頼書）</text>
  <text x="76" y="154" fill="#ffffff" font-size="11" font-family="sans-serif">要件: 異種コンピュータの相互接続・信頼性・拡張性　軍事要件: ゼロ</text>
  <!-- 1969 BBN report -->
  <rect x="60" y="172" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#f9a825" stroke-width="1"/>
  <text x="76" y="190" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1969年 BBN技術報告書 №1822（IMP仕様書）</text>
  <text x="76" y="206" fill="#ffffff" font-size="11" font-family="sans-serif">詳細な技術仕様　核攻撃への言及: ゼロ　軍事要件: ゼロ</text>
  <!-- Cerf testimony -->
  <rect x="60" y="224" width="680" height="42" rx="4" fill="#1a1a2e" stroke="#e91e63" stroke-width="1"/>
  <text x="76" y="242" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">Vint Cerf（TCP/IP共同発明者）証言</text>
  <text x="76" y="258" fill="#e91e63" font-size="11" font-family="sans-serif">「核耐性はARPANETの設計目標ではなかった。この神話は後から貼り付けられたラベルだ」</text>
</svg>
- **1966年 Bob Taylor & Larry Roberts 提案書:**
- 「ARPA資金提供を受けた研究者間でコンピュータリソースを共有する」
- 「別々のコンピュータ施設への重複投資を削減する」
- 
- **1968年 ARPANET RFP（提案依頼書）:**
- 要件の大部分: 異種コンピュータの相互接続、信頼性、拡張性

<!--
これらの文書はオンラインで公開されています。実際に読んでみると「核攻撃」という言葉を見つけることはほぼできません。
-->

---

# 当時のARPA内部文書が示す優先事項（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- 核攻撃への言及: **ゼロ**
- 
- **1969年 BBN技術報告書 №1822:**
- IMPの詳細仕様書
- 軍事要件の記述: **ゼロ**
- 
- → 一次資料を読めば、核戦争が主目的でないことは明らか

<!--
これらの文書はオンラインで公開されています。実際に読んでみると「核攻撃」という言葉を見つけることはほぼできません。
-->

---

# Bob Taylor、Larry Robertsの証言（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">Bob Taylorの「3台の端末問題」（1966年）</text>
  <!-- Before: 3 separate terminals -->
  <rect x="40" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">問題 — 非効率な現状</text>
  <!-- Terminal 1 -->
  <rect x="65" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="110" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末①</text>
  <text x="110" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TX-2 (MIT)</text>
  <!-- Terminal 2 -->
  <rect x="175" y="88" width="90" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="220" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末②</text>
  <text x="220" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">AN/FSQ-32 (SDC)</text>
  <!-- Terminal 3 -->
  <rect x="285" y="88" width="75" height="55" rx="4" fill="#1a1a2e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="323" y="110" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">端末③</text>
  <text x="323" y="126" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">IBM 360</text>
  <text x="210" y="170" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">3回ログインし直す必要あり</text>
  <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">コマンド体系がバラバラ</text>
  <text x="210" y="210" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">「非効率極まりない！」</text>
  <text x="210" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">（Taylor本人の2004年証言）</text>
  <text x="210" y="262" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">核戦争の「か」の字もない</text>
  <!-- After: ARPANET solution -->
  <rect x="420" y="48" width="340" height="250" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="590" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">解決 — ARPANET</text>
  <!-- Single terminal -->
  <rect x="535" y="88" width="110" height="55" rx="6" fill="#1a3a1a" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="110" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">1台の端末</text>
  <text x="590" y="130" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">すべてに接続</text>
  <!-- Connection lines -->
  <line x1="590" y1="143" x2="480" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="590" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <line x1="590" y1="143" x2="700" y2="175" stroke="#69f0ae" stroke-width="1.5"/>
  <!-- Remote computers -->
  <rect x="440" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="480" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MIT</text>
  <rect x="548" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="588" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SDC</text>
  <rect x="656" y="175" width="80" height="36" rx="4" fill="#16213e" stroke="#555" stroke-width="1"/>
  <text x="696" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">各大学</text>
  <text x="590" y="240" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">統一インターフェースで</text>
  <text x="590" y="258" text-anchor="middle" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">全リソースにアクセス</text>
  <text x="590" y="278" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">これがARPANETの直接の動機</text>
</svg>
- **Bob Taylor（ARPANETの発案者）:**
- 「私がARPANETを提案した理由は、3台の端末への接続を1台にまとめたかったから」
- 「核戦争の話は私の頭の中には全くなかった」
- — 2004年インタビュー（Computer History Museum）
- 
- **Larry Roberts（ARPANETの技術責任者）:**

<!--
Computer History Museaumsのオーラル・ヒストリー・プログラムには、これらの証言の動画が残っています。一次情報として非常に価値があります。
-->

---

# Bob Taylor、Larry Robertsの証言（2/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話の誕生と拡大 — タイムライン</text>
  <!-- Timeline line -->
  <line x1="60" y1="160" x2="740" y2="160" stroke="#555" stroke-width="2"/>
  <!-- 1964: Baran research -->
  <circle cx="100" cy="160" r="10" fill="#4fc3f7"/>
  <text x="100" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">1964</text>
  <text x="100" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バランの</text>
  <text x="100" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">RAND論文</text>
  <text x="100" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（核耐性研究）</text>
  <!-- 1969: ARPANET -->
  <circle cx="200" cy="160" r="10" fill="#69f0ae"/>
  <text x="200" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1969</text>
  <text x="200" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="200" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">稼働開始</text>
  <text x="200" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（リソース共有）</text>
  <!-- 1972: Email -->
  <circle cx="290" cy="160" r="8" fill="#f9a825"/>
  <text x="290" y="145" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1972</text>
  <text x="290" y="178" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">メール発明</text>
  <!-- 1980s: Media amplification -->
  <circle cx="400" cy="160" r="12" fill="#e91e63"/>
  <text x="400" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">1980〜90s</text>
  <text x="400" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">メディアが</text>
  <text x="400" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">「核耐性説」を</text>
  <text x="400" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">繰り返し引用</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TIME / Newsweek</text>
  <!-- 1996: Where Wizards -->
  <circle cx="510" cy="160" r="10" fill="#69f0ae"/>
  <text x="510" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
  <text x="510" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Where Wizards</text>
  <text x="510" y="192" text-anchor="middle" fill="#69f0ae" font-size="10" font-family="sans-serif">神話を否定</text>
  <text x="510" y="206" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（学術的認知）</text>
  <!-- Late 1990s: Wikipedia -->
  <circle cx="610" cy="160" r="12" fill="#e91e63"/>
  <text x="610" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2000s</text>
  <text x="610" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Wikipedia</text>
  <text x="610" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">草創期に「事実」</text>
  <text x="610" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">として世界拡散</text>
  <!-- Today -->
  <circle cx="710" cy="160" r="10" fill="#ff7043"/>
  <text x="710" y="145" text-anchor="middle" fill="#ff7043" font-size="11" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="710" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">教科書・授業の</text>
  <text x="710" y="192" text-anchor="middle" fill="#ff7043" font-size="10" font-family="sans-serif">定番説明文</text>
  <!-- Key insight -->
  <rect x="80" y="255" width="640" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">混同のメカニズム</text>
  <text x="400" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">バランの核耐性研究（1964）+ ARPANETの同時期創設（1969）= 「一緒のもの」と誤認</text>
</svg>
- 「ARPANETの設計目的は研究コミュニティのリソース共有だった」
- 「分散型設計の利点に耐障害性があるのは事実だが、それが目的ではなかった」
- — IEEE Annals of the History of Computing (1988)
- 
- **設計者たちの一致した証言:**
- 「核戦争対策」を主目的に挙げた設計者は **一人もいない**

<!--
Computer History Museaumsのオーラル・ヒストリー・プログラムには、これらの証言の動画が残っています。一次情報として非常に価値があります。
-->

---

# 「Where Wizards Stay Up Late」(1996)が明かした事実（1/2）

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">神話の誕生と拡大 — タイムライン</text>
  <!-- Timeline line -->
  <line x1="60" y1="160" x2="740" y2="160" stroke="#555" stroke-width="2"/>
  <!-- 1964: Baran research -->
  <circle cx="100" cy="160" r="10" fill="#4fc3f7"/>
  <text x="100" y="145" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold" font-family="sans-serif">1964</text>
  <text x="100" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">バランの</text>
  <text x="100" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">RAND論文</text>
  <text x="100" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（核耐性研究）</text>
  <!-- 1969: ARPANET -->
  <circle cx="200" cy="160" r="10" fill="#69f0ae"/>
  <text x="200" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1969</text>
  <text x="200" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="200" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">稼働開始</text>
  <text x="200" y="208" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（リソース共有）</text>
  <!-- 1972: Email -->
  <circle cx="290" cy="160" r="8" fill="#f9a825"/>
  <text x="290" y="145" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1972</text>
  <text x="290" y="178" text-anchor="middle" fill="#ffffff" font-size="9" font-family="sans-serif">メール発明</text>
  <!-- 1980s: Media amplification -->
  <circle cx="400" cy="160" r="12" fill="#e91e63"/>
  <text x="400" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">1980〜90s</text>
  <text x="400" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">メディアが</text>
  <text x="400" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">「核耐性説」を</text>
  <text x="400" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">繰り返し引用</text>
  <text x="400" y="218" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">TIME / Newsweek</text>
  <!-- 1996: Where Wizards -->
  <circle cx="510" cy="160" r="10" fill="#69f0ae"/>
  <text x="510" y="145" text-anchor="middle" fill="#69f0ae" font-size="11" font-weight="bold" font-family="sans-serif">1996</text>
  <text x="510" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Where Wizards</text>
  <text x="510" y="192" text-anchor="middle" fill="#69f0ae" font-size="10" font-family="sans-serif">神話を否定</text>
  <text x="510" y="206" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">（学術的認知）</text>
  <!-- Late 1990s: Wikipedia -->
  <circle cx="610" cy="160" r="12" fill="#e91e63"/>
  <text x="610" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold" font-family="sans-serif">2000s</text>
  <text x="610" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Wikipedia</text>
  <text x="610" y="192" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">草創期に「事実」</text>
  <text x="610" y="206" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">として世界拡散</text>
  <!-- Today -->
  <circle cx="710" cy="160" r="10" fill="#ff7043"/>
  <text x="710" y="145" text-anchor="middle" fill="#ff7043" font-size="11" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="710" y="178" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">教科書・授業の</text>
  <text x="710" y="192" text-anchor="middle" fill="#ff7043" font-size="10" font-family="sans-serif">定番説明文</text>
  <!-- Key insight -->
  <rect x="80" y="255" width="640" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="278" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">混同のメカニズム</text>
  <text x="400" y="300" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">バランの核耐性研究（1964）+ ARPANETの同時期創設（1969）= 「一緒のもの」と誤認</text>
</svg>
- **著者: Katie Hafner & Matthew Lyon**
- ARPANETの歴史を徹底的に取材した最初の本格的ドキュメント
- 
- **調査方法:**
- ARPANETに関わった数十人への直接インタビュー
- ARPA内部文書・BBN報告書・技術仕様書の精査
- 

<!--
この本は今でもARPANET史の最重要文献の一つです。エンジニアにも読みやすい内容なので、ぜひ読んでみてください。
-->

---

# 「Where Wizards Stay Up Late」(1996)が明かした事実（2/2）

- **明かされた事実:**
- 「核攻撃耐性」が設計の主目的だったという証拠は存在しない
- 設計者全員が「リソース共有が目的だった」と証言
- バランの研究とARPANETは別物だと明示
- 
- **この本が果たした役割:**
- 1996年以降、この神話への疑義が学術的に認知される
- しかしポップカルチャーでの神話は生き続けた

<!--
この本は今でもARPANET史の最重要文献の一つです。エンジニアにも読みやすい内容なので、ぜひ読んでみてください。
-->

---

# 神話の伝播経路 — ブランドからWikipediaまで

![w:860 center](assets/myth-propagation.svg)

<!--
誤情報の拡散パスを追うと、少数の権威ある情報源からの引用が連鎖していることがわかります。Wikpediaは特に影響力が大きく、現在は修正されていますが、コピーされたコンテンツが世界中に残っています。
-->

---

<!-- _class: lead -->
# Part 6: ARPANETが実際に生んだもの

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">メール発明 — 設計者が計画しなかったキラーアプリ（1971年）</text>
  <!-- Person -->
  <rect x="40" y="55" width="200" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Ray Tomlinson</text>
  <text x="140" y="96" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">BBN研究員</text>
  <text x="55" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETの隙間時間に</text>
  <text x="55" y="132" fill="#ffffff" font-size="11" font-family="sans-serif">個人プロジェクトとして実装」</text>
  <text x="55" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「別のコンピュータの人に</text>
  <text x="55" y="164" fill="#aaa" font-size="10" font-family="sans-serif">メッセージを送れたら面白い」</text>
  <!-- @ symbol -->
  <rect x="280" y="55" width="240" height="120" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="400" y="78" text-anchor="middle" fill="#4fc3f7" font-size="40" font-weight="bold" font-family="sans-serif">@</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ユーザー名@ホスト名</text>
  <text x="295" y="140" fill="#ffffff" font-size="11" font-family="sans-serif">「他の使われ方をほぼしない」</text>
  <text x="295" y="156" fill="#aaa" font-size="10" font-family="sans-serif">文字として選択</text>
  <text x="295" y="170" fill="#4fc3f7" font-size="11" font-family="sans-serif">→ 現代メールアドレスの形式</text>
  <!-- Impact -->
  <rect x="560" y="55" width="200" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPAの反応</text>
  <text x="575" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">当初は公式サポートなし</text>
  <text x="575" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">1972年に最大のトラフィックへ</text>
  <text x="575" y="134" fill="#69f0ae" font-size="11" font-family="sans-serif">設計者が計画しなかった</text>
  <text x="575" y="152" fill="#69f0ae" font-size="11" font-family="sans-serif">最重要ユースケース</text>
  <text x="575" y="170" fill="#aaa" font-size="10" font-family="sans-serif">ユーザーが自然に使い始めた</text>
  <!-- Bottom lesson -->
  <rect x="40" y="200" width="720" height="96" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な教訓</text>
  <text x="60" y="248" fill="#ffffff" font-size="12" font-family="sans-serif">最も重要なユースケースは設計者が計画していなかった</text>
  <text x="60" y="268" fill="#69f0ae" font-size="12" font-family="sans-serif">→ オープンなインフラが持つ予測不可能な可能性</text>
  <text x="60" y="288" fill="#aaa" font-size="11" font-family="sans-serif">核戦争対策のシステムなら、電子メールという「文民用途」は設計外だった</text>
</svg>
- 計画されていたもの、計画外のもの


---

# メール — 誰も計画していなかったキラーアプリ（1971年）（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">メール発明 — 設計者が計画しなかったキラーアプリ（1971年）</text>
  <!-- Person -->
  <rect x="40" y="55" width="200" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Ray Tomlinson</text>
  <text x="140" y="96" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">BBN研究員</text>
  <text x="55" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">「ARPANETの隙間時間に</text>
  <text x="55" y="132" fill="#ffffff" font-size="11" font-family="sans-serif">個人プロジェクトとして実装」</text>
  <text x="55" y="150" fill="#aaa" font-size="10" font-family="sans-serif">「別のコンピュータの人に</text>
  <text x="55" y="164" fill="#aaa" font-size="10" font-family="sans-serif">メッセージを送れたら面白い」</text>
  <!-- @ symbol -->
  <rect x="280" y="55" width="240" height="120" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="400" y="78" text-anchor="middle" fill="#4fc3f7" font-size="40" font-weight="bold" font-family="sans-serif">@</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">ユーザー名@ホスト名</text>
  <text x="295" y="140" fill="#ffffff" font-size="11" font-family="sans-serif">「他の使われ方をほぼしない」</text>
  <text x="295" y="156" fill="#aaa" font-size="10" font-family="sans-serif">文字として選択</text>
  <text x="295" y="170" fill="#4fc3f7" font-size="11" font-family="sans-serif">→ 現代メールアドレスの形式</text>
  <!-- Impact -->
  <rect x="560" y="55" width="200" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">ARPAの反応</text>
  <text x="575" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">当初は公式サポートなし</text>
  <text x="575" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">1972年に最大のトラフィックへ</text>
  <text x="575" y="134" fill="#69f0ae" font-size="11" font-family="sans-serif">設計者が計画しなかった</text>
  <text x="575" y="152" fill="#69f0ae" font-size="11" font-family="sans-serif">最重要ユースケース</text>
  <text x="575" y="170" fill="#aaa" font-size="10" font-family="sans-serif">ユーザーが自然に使い始めた</text>
  <!-- Bottom lesson -->
  <rect x="40" y="200" width="720" height="96" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="222" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">重要な教訓</text>
  <text x="60" y="248" fill="#ffffff" font-size="12" font-family="sans-serif">最も重要なユースケースは設計者が計画していなかった</text>
  <text x="60" y="268" fill="#69f0ae" font-size="12" font-family="sans-serif">→ オープンなインフラが持つ予測不可能な可能性</text>
  <text x="60" y="288" fill="#aaa" font-size="11" font-family="sans-serif">核戦争対策のシステムなら、電子メールという「文民用途」は設計外だった</text>
</svg>
- **Ray Tomlinson（BBN研究員）:**
- 1971年、ARPANETの隙間時間に個人プロジェクトとして実装
- 「別のコンピュータにいるユーザーにメッセージを送れたら面白い」
- 
- **@マークの発明:**
- ユーザー名とホスト名を区切る文字として @を選択
- 「他の使われ方をほぼしない文字だったから」

<!--
Tomlinsonはよく「メールを発明した」と紹介されますが、彼自身は「最初のメールプログラムを書いただけ」と言っています。重要なのは、それがいかに急速に普及したかです。
-->

---

# メール — 誰も計画していなかったキラーアプリ（1971年）（2/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">RFC文化 — コミュニティによる協調設計</text>
  <!-- RFC concept -->
  <rect x="40" y="50" width="240" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="160" y="74" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">RFC 1 (1969年4月)</text>
  <text x="55" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">Steve Crockerが発行</text>
  <text x="55" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「私たちの考えを共有します</text>
  <text x="55" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">批判・改善案をください」</text>
  <text x="55" y="152" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Request for Comments</text>
  <!-- Key features -->
  <rect x="320" y="50" width="440" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="540" y="74" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">RFC文化の特徴</text>
  <text x="335" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">誰でも提案できる（学生も研究者も）</text>
  <text x="335" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">採用は実装と合意によって決まる</text>
  <text x="335" y="132" fill="#ffffff" font-size="11" font-family="sans-serif">失敗したRFCも記録として残る</text>
  <text x="335" y="152" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">権威による押し付けではなく合意形成</text>
  <!-- Legacy -->
  <rect x="40" y="198" width="720" height="100" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="400" y="220" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">現代への継承</text>
  <rect x="60" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="160" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">W3C / IETF / ISO</text>
  <text x="160" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">標準化団体の基本哲学</text>
  <rect x="300" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="400" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">GitHubのPullRequest</text>
  <text x="400" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">RFCの精神の現代的継承</text>
  <rect x="540" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="640" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">オープンソース文化</text>
  <text x="640" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">フラットな合意形成</text>
</svg>
- 
- **ARPAの反応:**
- 当初は公式サポートしていなかった
- ユーザーが自然と使い始め、1972年には最大のトラフィックに成長
- 
- **教訓:**
- 最も重要なユースケースは **設計者が計画していなかった**
- → オープンなインフラが持つ予測不可能な可能性

<!--
Tomlinsonはよく「メールを発明した」と紹介されますが、彼自身は「最初のメールプログラムを書いただけ」と言っています。重要なのは、それがいかに急速に普及したかです。
-->

---

# RFC文化 — 「お願い」から始まる標準化（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">RFC文化 — コミュニティによる協調設計</text>
  <!-- RFC concept -->
  <rect x="40" y="50" width="240" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="160" y="74" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">RFC 1 (1969年4月)</text>
  <text x="55" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">Steve Crockerが発行</text>
  <text x="55" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">「私たちの考えを共有します</text>
  <text x="55" y="130" fill="#ffffff" font-size="11" font-family="sans-serif">批判・改善案をください」</text>
  <text x="55" y="152" fill="#f9a825" font-size="12" font-weight="bold" font-family="sans-serif">Request for Comments</text>
  <!-- Key features -->
  <rect x="320" y="50" width="440" height="120" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="1.5"/>
  <text x="540" y="74" text-anchor="middle" fill="#69f0ae" font-size="13" font-weight="bold" font-family="sans-serif">RFC文化の特徴</text>
  <text x="335" y="96" fill="#ffffff" font-size="11" font-family="sans-serif">誰でも提案できる（学生も研究者も）</text>
  <text x="335" y="114" fill="#ffffff" font-size="11" font-family="sans-serif">採用は実装と合意によって決まる</text>
  <text x="335" y="132" fill="#ffffff" font-size="11" font-family="sans-serif">失敗したRFCも記録として残る</text>
  <text x="335" y="152" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">権威による押し付けではなく合意形成</text>
  <!-- Legacy -->
  <rect x="40" y="198" width="720" height="100" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1"/>
  <text x="400" y="220" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">現代への継承</text>
  <rect x="60" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="160" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">W3C / IETF / ISO</text>
  <text x="160" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">標準化団体の基本哲学</text>
  <rect x="300" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="400" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">GitHubのPullRequest</text>
  <text x="400" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">RFCの精神の現代的継承</text>
  <rect x="540" y="234" width="200" height="50" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="640" y="255" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">オープンソース文化</text>
  <text x="640" y="273" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">フラットな合意形成</text>
</svg>
- **RFC（Request for Comments）= コメントのお願い**
- 1969年4月、Steve Crockerが RFC 1 を発行
- 
- **RFC 1の精神:**
- 「私たちの考えを共有します。批判・改善案をください」
- 権威による押し付けではなく、**コミュニティによる協調設計**
- 

<!--
RFC文化は技術的な標準化の方法論として革命的でした。上から下への命令ではなく、フラットなコミュニティによる合意形成。GitHubのPRはこの精神の現代的継承です。
-->

---

# RFC文化 — 「お願い」から始まる標準化（2/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">TCP/IP — インターネットを可能にした設計原則（1974年）</text>
  <!-- NCP box -->
  <rect x="40" y="55" width="200" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">NCP（旧プロトコル）</text>
  <text x="55" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">ARPANETの内部のみで機能</text>
  <text x="55" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">異ネットワーク間: 不可能</text>
  <text x="55" y="138" fill="#e91e63" font-size="11" font-family="sans-serif">「閉じたネットワーク」</text>
  <!-- Arrow -->
  <line x1="240" y1="105" x2="278" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,100 288,105 276,110" fill="#aaa"/>
  <!-- TCP/IP box -->
  <rect x="290" y="48" width="220" height="260" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="400" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">TCP/IP（1974年）</text>
  <text x="400" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Vint Cerf &amp; Bob Kahn</text>
  <text x="305" y="116" fill="#69f0ae" font-size="11" font-family="sans-serif">「どんなネットワークも</text>
  <text x="305" y="132" fill="#69f0ae" font-size="11" font-family="sans-serif">繋げられる」</text>
  <text x="305" y="154" fill="#ffffff" font-size="11" font-family="sans-serif">エンドツーエンド原則</text>
  <text x="305" y="172" fill="#ffffff" font-size="11" font-family="sans-serif">ネットワーク自体はシンプルに</text>
  <text x="305" y="190" fill="#ffffff" font-size="11" font-family="sans-serif">複雑さは端点へ</text>
  <text x="305" y="218" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1983年1月1日:</text>
  <text x="305" y="236" fill="#f9a825" font-size="11" font-family="sans-serif">NCP→TCP/IP切り替え</text>
  <text x="305" y="254" fill="#4fc3f7" font-size="11" font-family="sans-serif">「インターネット誕生日」</text>
  <text x="305" y="292" fill="#aaa" font-size="10" font-family="sans-serif">核耐性の言及: なし</text>
  <!-- Internet box -->
  <rect x="560" y="55" width="200" height="100" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">インターネット</text>
  <text x="575" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">ネットワークのネットワーク</text>
  <text x="575" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">普遍的な接続性</text>
  <text x="575" y="138" fill="#69f0ae" font-size="11" font-family="sans-serif">世界中に拡大</text>
  <!-- Arrow -->
  <line x1="510" y1="105" x2="558" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="556,100 568,105 556,110" fill="#aaa"/>
</svg>
- **RFC文化の特徴:**
- 誰でも提案できる（学生も研究者も）
- 採用されるかは実装と合意によって決まる
- 失敗したRFCも記録として残る（透明性）
- 
- **現代への影響:**
- W3C・IETF・ISOなど標準化団体の基本哲学に継承
- オープンソース文化の「プルリクエスト」に精神が受け継がれている

<!--
RFC文化は技術的な標準化の方法論として革命的でした。上から下への命令ではなく、フラットなコミュニティによる合意形成。GitHubのPRはこの精神の現代的継承です。
-->

---

# TCP/IP — サーフとカーンの革命（1974年）（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">TCP/IP — インターネットを可能にした設計原則（1974年）</text>
  <!-- NCP box -->
  <rect x="40" y="55" width="200" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="140" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">NCP（旧プロトコル）</text>
  <text x="55" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">ARPANETの内部のみで機能</text>
  <text x="55" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">異ネットワーク間: 不可能</text>
  <text x="55" y="138" fill="#e91e63" font-size="11" font-family="sans-serif">「閉じたネットワーク」</text>
  <!-- Arrow -->
  <line x1="240" y1="105" x2="278" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="276,100 288,105 276,110" fill="#aaa"/>
  <!-- TCP/IP box -->
  <rect x="290" y="48" width="220" height="260" rx="8" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="400" y="72" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">TCP/IP（1974年）</text>
  <text x="400" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">Vint Cerf &amp; Bob Kahn</text>
  <text x="305" y="116" fill="#69f0ae" font-size="11" font-family="sans-serif">「どんなネットワークも</text>
  <text x="305" y="132" fill="#69f0ae" font-size="11" font-family="sans-serif">繋げられる」</text>
  <text x="305" y="154" fill="#ffffff" font-size="11" font-family="sans-serif">エンドツーエンド原則</text>
  <text x="305" y="172" fill="#ffffff" font-size="11" font-family="sans-serif">ネットワーク自体はシンプルに</text>
  <text x="305" y="190" fill="#ffffff" font-size="11" font-family="sans-serif">複雑さは端点へ</text>
  <text x="305" y="218" fill="#f9a825" font-size="11" font-weight="bold" font-family="sans-serif">1983年1月1日:</text>
  <text x="305" y="236" fill="#f9a825" font-size="11" font-family="sans-serif">NCP→TCP/IP切り替え</text>
  <text x="305" y="254" fill="#4fc3f7" font-size="11" font-family="sans-serif">「インターネット誕生日」</text>
  <text x="305" y="292" fill="#aaa" font-size="10" font-family="sans-serif">核耐性の言及: なし</text>
  <!-- Internet box -->
  <rect x="560" y="55" width="200" height="100" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="1.5"/>
  <text x="660" y="78" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">インターネット</text>
  <text x="575" y="98" fill="#ffffff" font-size="11" font-family="sans-serif">ネットワークのネットワーク</text>
  <text x="575" y="116" fill="#ffffff" font-size="11" font-family="sans-serif">普遍的な接続性</text>
  <text x="575" y="138" fill="#69f0ae" font-size="11" font-family="sans-serif">世界中に拡大</text>
  <!-- Arrow -->
  <line x1="510" y1="105" x2="558" y2="105" stroke="#aaa" stroke-width="2"/>
  <polygon points="556,100 568,105 556,110" fill="#aaa"/>
</svg>
- **ARPANETの最初のプロトコル: NCP（Network Control Program）**
- 1970年設計、ARPANETの内部のみで機能
- 異なるネットワーク間の通信（インターネット）には対応できない
- 
- **1974年: Vint Cerf & Bob Kahn**
- 論文: "A Protocol for Packet Network Intercommunication"
- TCP（後にTCPとIPに分割）の設計原則を発表

<!--
Cerf and Kahnの設計は「ネットワークのネットワーク」を可能にしました。この「どんなネットワークも接続できる」という普遍性が、現代インターネットの爆発的拡大を可能にしました。
-->

---

# TCP/IP — サーフとカーンの革命（1974年）（2/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">NSFNETへの移行と商業化 — 軍から公共インフラへ</text>
  <!-- Timeline -->
  <line x1="60" y1="140" x2="740" y2="140" stroke="#555" stroke-width="2"/>
  <!-- 1983 split -->
  <circle cx="120" cy="140" r="10" fill="#e91e63"/>
  <text x="120" y="122" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">1983</text>
  <text x="120" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">MILNET</text>
  <text x="120" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">分離</text>
  <text x="120" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">軍専用ネットに</text>
  <!-- 1986 NSFNET -->
  <circle cx="240" cy="140" r="10" fill="#f9a825"/>
  <text x="240" y="122" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1986</text>
  <text x="240" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">NSFNET</text>
  <text x="240" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">構築</text>
  <text x="240" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">全米科学財団</text>
  <!-- 1990 ARPANET end -->
  <circle cx="380" cy="140" r="10" fill="#4fc3f7"/>
  <text x="380" y="122" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">1990</text>
  <text x="380" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="380" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">廃止</text>
  <text x="380" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">誰も気づかなかった</text>
  <!-- 1991-1995 commercialization -->
  <circle cx="540" cy="140" r="14" fill="#69f0ae"/>
  <text x="540" y="120" text-anchor="middle" fill="#69f0ae" font-size="10" font-weight="bold" font-family="sans-serif">1991〜95</text>
  <text x="540" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">商業化</text>
  <text x="540" y="176" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">民営化</text>
  <text x="540" y="192" text-anchor="middle" fill="#69f0ae" font-size="9" font-family="sans-serif">AOL・CompuServe</text>
  <!-- Today -->
  <circle cx="700" cy="140" r="12" fill="#f9a825"/>
  <text x="700" y="120" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="700" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">世界共有</text>
  <text x="700" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">公共インフラ</text>
  <!-- Bottom insight -->
  <rect x="40" y="218" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">「軍事技術の民間転用」という説の問題</text>
  <text x="60" y="262" fill="#ffffff" font-size="11" font-family="sans-serif">正しい表現: 「研究者が自分たちの問題を解くために作ったものを、後に軍・民間が使うようになった」</text>
  <text x="60" y="282" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">→ 起源は純粋な工学的動機 → 軍事応用は後発</text>
</svg>
- 
- **設計思想:**
- 「どんなネットワークもつなげられる」 — エンドツーエンド原則
- 「ネットワーク自体はシンプルに、複雑さは端点へ」
- 
- **1983年1月1日: ARPANETがNCP→TCP/IPに切り替え**
- 「インターネット」の誕生日として認識される

<!--
Cerf and Kahnの設計は「ネットワークのネットワーク」を可能にしました。この「どんなネットワークも接続できる」という普遍性が、現代インターネットの爆発的拡大を可能にしました。
-->

---

# NSFNETへの移行 — 軍用から学術・商業へ（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">NSFNETへの移行と商業化 — 軍から公共インフラへ</text>
  <!-- Timeline -->
  <line x1="60" y1="140" x2="740" y2="140" stroke="#555" stroke-width="2"/>
  <!-- 1983 split -->
  <circle cx="120" cy="140" r="10" fill="#e91e63"/>
  <text x="120" y="122" text-anchor="middle" fill="#e91e63" font-size="10" font-weight="bold" font-family="sans-serif">1983</text>
  <text x="120" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">MILNET</text>
  <text x="120" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">分離</text>
  <text x="120" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">軍専用ネットに</text>
  <!-- 1986 NSFNET -->
  <circle cx="240" cy="140" r="10" fill="#f9a825"/>
  <text x="240" y="122" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">1986</text>
  <text x="240" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">NSFNET</text>
  <text x="240" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">構築</text>
  <text x="240" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">全米科学財団</text>
  <!-- 1990 ARPANET end -->
  <circle cx="380" cy="140" r="10" fill="#4fc3f7"/>
  <text x="380" y="122" text-anchor="middle" fill="#4fc3f7" font-size="10" font-weight="bold" font-family="sans-serif">1990</text>
  <text x="380" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ARPANET</text>
  <text x="380" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">廃止</text>
  <text x="380" y="188" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">誰も気づかなかった</text>
  <!-- 1991-1995 commercialization -->
  <circle cx="540" cy="140" r="14" fill="#69f0ae"/>
  <text x="540" y="120" text-anchor="middle" fill="#69f0ae" font-size="10" font-weight="bold" font-family="sans-serif">1991〜95</text>
  <text x="540" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">商業化</text>
  <text x="540" y="176" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">民営化</text>
  <text x="540" y="192" text-anchor="middle" fill="#69f0ae" font-size="9" font-family="sans-serif">AOL・CompuServe</text>
  <!-- Today -->
  <circle cx="700" cy="140" r="12" fill="#f9a825"/>
  <text x="700" y="120" text-anchor="middle" fill="#f9a825" font-size="10" font-weight="bold" font-family="sans-serif">現在</text>
  <text x="700" y="158" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">世界共有</text>
  <text x="700" y="172" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">公共インフラ</text>
  <!-- Bottom insight -->
  <rect x="40" y="218" width="720" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">「軍事技術の民間転用」という説の問題</text>
  <text x="60" y="262" fill="#ffffff" font-size="11" font-family="sans-serif">正しい表現: 「研究者が自分たちの問題を解くために作ったものを、後に軍・民間が使うようになった」</text>
  <text x="60" y="282" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">→ 起源は純粋な工学的動機 → 軍事応用は後発</text>
</svg>
- **1983年: ARPANETが二分割**
- MILNET（軍専用）と ARPANET（研究用）に分離
- → 「軍のネットワーク」から「研究者のネットワーク」へ
- 
- **1986年: NSFNETの構築**
- 全米科学財団（NSF）が高速バックボーンネットワーク構築
- 大学・研究機関の接続が急拡大

<!--
面白いのは、ARPANETが廃止されたのに誰も気づかなかったことです。それだけNSFNETへの移行がシームレスでした。インターネットはゆっくりと軍から離れていきました。
-->

---

# NSFNETへの移行 — 軍用から学術・商業へ（2/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">歴史の正確さがイノベーション政策に与える影響</text>
  <!-- Wrong narrative -->
  <rect x="40" y="50" width="340" height="220" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="74" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">神話に基づく主張（誤）</text>
  <text x="55" y="100" fill="#ffffff" font-size="12" font-family="sans-serif">「インターネットは軍事技術の副産物」</text>
  <text x="55" y="124" fill="#ffffff" font-size="11" font-family="sans-serif">↓ 「だから軍事研究に投資せよ」</text>
  <text x="55" y="148" fill="#e91e63" font-size="11" font-family="sans-serif">問題: 基礎研究の価値が</text>
  <text x="55" y="166" fill="#e91e63" font-size="11" font-family="sans-serif">「軍事応用」に矮小化される</text>
  <text x="55" y="192" fill="#ffffff" font-size="11" font-family="sans-serif">ARPA予算承認に「安保貢献」が</text>
  <text x="55" y="210" fill="#ffffff" font-size="11" font-family="sans-serif">必要だった → 意図的に</text>
  <text x="55" y="228" fill="#ff7043" font-size="11" font-family="sans-serif">narrative を利用した可能性</text>
  <text x="55" y="250" fill="#aaa" font-size="10" font-family="sans-serif">（論文・書籍での指摘）</text>
  <!-- Right narrative -->
  <rect x="420" y="50" width="340" height="220" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="74" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">正確な歴史に基づく主張</text>
  <text x="435" y="100" fill="#ffffff" font-size="12" font-family="sans-serif">「研究者の問題解決が世界を変えた」</text>
  <text x="435" y="124" fill="#ffffff" font-size="11" font-family="sans-serif">↓ 「基礎研究・実用研究への投資を」</text>
  <text x="435" y="148" fill="#69f0ae" font-size="11" font-family="sans-serif">「不便を解消しようとした</text>
  <text x="435" y="166" fill="#69f0ae" font-size="11" font-family="sans-serif">エンジニアの純粋な動機が</text>
  <text x="435" y="184" fill="#69f0ae" font-size="11" font-family="sans-serif">50年後の世界インフラになった」</text>
  <text x="435" y="214" fill="#ffffff" font-size="11" font-family="sans-serif">→ より説得力のある</text>
  <text x="435" y="232" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">基礎研究投資の正当化</text>
</svg>
- 
- **1990年: ARPANETの正式廃止**
- NSFNETが実質的な後継として機能
- 
- **1991〜1995年: 商業化・民営化**
- NSFが商業利用禁止ポリシーを撤廃
- AOL・CompuServeなどが一般向けインターネット接続を提供開始
- → 「軍事技術」から **「世界共有の公共インフラ」** へ

<!--
面白いのは、ARPANETが廃止されたのに誰も気づかなかったことです。それだけNSFNETへの移行がシームレスでした。インターネットはゆっくりと軍から離れていきました。
-->

---

<!-- _class: lead -->
# Part 7: 歴史の正確さがなぜ重要か

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="320" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="18" font-weight="bold" font-family="sans-serif">歴史の正確さがイノベーション政策に与える影響</text>
  <!-- Wrong narrative -->
  <rect x="40" y="50" width="340" height="220" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="210" y="74" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">神話に基づく主張（誤）</text>
  <text x="55" y="100" fill="#ffffff" font-size="12" font-family="sans-serif">「インターネットは軍事技術の副産物」</text>
  <text x="55" y="124" fill="#ffffff" font-size="11" font-family="sans-serif">↓ 「だから軍事研究に投資せよ」</text>
  <text x="55" y="148" fill="#e91e63" font-size="11" font-family="sans-serif">問題: 基礎研究の価値が</text>
  <text x="55" y="166" fill="#e91e63" font-size="11" font-family="sans-serif">「軍事応用」に矮小化される</text>
  <text x="55" y="192" fill="#ffffff" font-size="11" font-family="sans-serif">ARPA予算承認に「安保貢献」が</text>
  <text x="55" y="210" fill="#ffffff" font-size="11" font-family="sans-serif">必要だった → 意図的に</text>
  <text x="55" y="228" fill="#ff7043" font-size="11" font-family="sans-serif">narrative を利用した可能性</text>
  <text x="55" y="250" fill="#aaa" font-size="10" font-family="sans-serif">（論文・書籍での指摘）</text>
  <!-- Right narrative -->
  <rect x="420" y="50" width="340" height="220" rx="10" fill="#16213e" stroke="#69f0ae" stroke-width="2"/>
  <text x="590" y="74" text-anchor="middle" fill="#69f0ae" font-size="14" font-weight="bold" font-family="sans-serif">正確な歴史に基づく主張</text>
  <text x="435" y="100" fill="#ffffff" font-size="12" font-family="sans-serif">「研究者の問題解決が世界を変えた」</text>
  <text x="435" y="124" fill="#ffffff" font-size="11" font-family="sans-serif">↓ 「基礎研究・実用研究への投資を」</text>
  <text x="435" y="148" fill="#69f0ae" font-size="11" font-family="sans-serif">「不便を解消しようとした</text>
  <text x="435" y="166" fill="#69f0ae" font-size="11" font-family="sans-serif">エンジニアの純粋な動機が</text>
  <text x="435" y="184" fill="#69f0ae" font-size="11" font-family="sans-serif">50年後の世界インフラになった」</text>
  <text x="435" y="214" fill="#ffffff" font-size="11" font-family="sans-serif">→ より説得力のある</text>
  <text x="435" y="232" fill="#69f0ae" font-size="12" font-weight="bold" font-family="sans-serif">基礎研究投資の正当化</text>
</svg>
- 神話が持つ力と、それが引き起こす誤解


---

# イノベーションの実際のドライバー

![w:860 center](assets/innovation-drivers.svg)

<!--
ARPANETの例は「軍事技術の民間転用」という単純なモデルを覆します。実際の動機は研究者の実用的な問題解決でした。この区別は重要です。
-->

---

# 「神話化」が予算・政策に与える影響（1/2）

- **「核戦争対策のための研究費」という正当化:**
- 冷戦期、ARPA予算の議会承認に「安保への貢献」は重要だった
- 一部の関係者は意図的にこの narrative を使った可能性
- 
- **現代への影響:**
- 「インターネットは軍事技術の副産物」という誤解

<!--
「インターネットは軍事技術の副産物だから、軍事研究に投資すべき」という論法は、正確な歴史を知ると成立しません。「研究者が自分の問題を解くために作ったものが世界を変えた」の方が、基礎研究投資の正当化として説得力があります。
-->

---

# 「神話化」が予算・政策に与える影響（2/2）

- → 基礎研究の価値が「軍事応用」に矮小化される
- 
- **本当の教訓（正確な歴史から）:**
- 「研究者の不便を解消するための純粋な工学的動機が、
- 50年後の世界を変えたインフラを生んだ」
- 
- → **基礎研究・実用研究への投資の重要性** はこちらの方が強い主張

<!--
「インターネットは軍事技術の副産物だから、軍事研究に投資すべき」という論法は、正確な歴史を知ると成立しません。「研究者が自分の問題を解くために作ったものが世界を変えた」の方が、基礎研究投資の正当化として説得力があります。
-->

---

<!-- _class: lead -->
# まとめ — 通説を疑い、一次資料に当たる

- **今日の5つのKey Takeaway:**
- 
- ① ARPANETは「核戦争対策」ではなく **「研究者のリソース共有」** のために作られた
- ② ポール・バランの核耐性研究は本物だが、ARPANETとは **別物**
- ③ 設計者全員が「核戦争は設計目的でなかった」と **証言している**
- ④ 神話は少数の権威ある情報源から伝言ゲームで広がった
- ⑤ 「不便を解消するための工学」が世界を変えた — 基礎研究の真の価値

<!--
この話のポイントは「ARPANETを貶める」ことではありません。本当の動機の方がむしろ感動的です。研究者たちが自分たちの問題を解こうとした純粋な工学的努力が、半世紀後の世界インフラになったという話です。
-->

---

# 参考文献・一次資料（1/2）

- **書籍・論文:**
- [Where Wizards Stay Up Late (Hafner & Lyon, 1996)](https://www.simonandschuster.com/books/Where-Wizards-Stay-Up-Late/Katie-Hafner/9780684832678)
- [On Distributed Communications Networks (Paul Baran, RAND 1964)](https://www.rand.org/pubs/research_memoranda/RM3420.html)
- [A Protocol for Packet Network Intercommunication (Cerf & Kahn, 1974)](https://ieeexplore.ieee.org/document/1092259)
- 
- **一次資料・証言:**

<!--
特にHafner & Lyonの本とBob TaylorのComputer History Museumのインタビューは必読です。
-->

---

# 参考文献・一次資料（2/2）

- [Bob Taylor Oral History (Computer History Museum, 2008)](https://www.computerhistory.org/collections/catalog/102702015)
- [RFC 1 — Host Software (Steve Crocker, 1969)](https://www.rfc-editor.org/rfc/rfc1)
- [ARPANET Technical Completion Report (1978)](https://www.darpa.mil/attachments/ARPANET_Technical_Completion_Report.pdf)
- 
- **解説記事:**
- [The Internet's Origins: Myths and Facts (IEEE)](https://spectrum.ieee.org/the-real-story-of-the-internet)
- [ARPANET and the Origins of the Internet (DARPA公式)](https://www.darpa.mil/about-us/timeline/arpanet)

<!--
特にHafner & Lyonの本とBob TaylorのComputer History Museumのインタビューは必読です。
-->
