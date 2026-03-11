---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "インターネットの真の起源"
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
# インターネット誕生の神話と真実
— ARPANETは核戦争のためではなかった

- 「核攻撃に耐えるネットワーク」という伝説は誤りだった
- 研究者の日常的なニーズから生まれた本当の理由
- インターネット普及に貢献した本当のヒーローたち


---

# アジェンダ

- 1. ARPANETの神話
- 2. 本当の開発動機
- 3. パケット通信の誕生
- 4. 商業インターネットへの転換
- 5. 「偶然の帝国」が示す教訓


---

<!-- _class: lead -->
# ARPANETの神話


---

# 「核戦争対応ネットワーク」という神話（1/2）

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><rect x="40" y="40" width="320" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="75" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">広まった神話</text><text x="200" y="100" text-anchor="middle" fill="#ffffff" font-size="12">「核攻撃後も通信できる</text><text x="200" y="118" text-anchor="middle" fill="#ffffff" font-size="12">分散ネットワーク」</text><rect x="440" y="40" width="320" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="75" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">実際の起源（1969年）</text><text x="600" y="100" text-anchor="middle" fill="#ffffff" font-size="12">4大学の高価なコンピュータ</text><text x="600" y="118" text-anchor="middle" fill="#ffffff" font-size="12">資源を共有するため</text><polygon points="375,90 415,75 415,105" fill="#4caf50"/><text x="395" y="93" text-anchor="middle" fill="#4caf50" font-size="11">VS</text><rect x="40" y="180" width="200" height="50" rx="6" fill="#16213e" stroke="#888" stroke-width="1"/><text x="140" y="200" text-anchor="middle" fill="#aaaaaa" font-size="11">UCLA</text><text x="140" y="218" text-anchor="middle" fill="#aaaaaa" font-size="10">1969接続</text><rect x="260" y="180" width="200" height="50" rx="6" fill="#16213e" stroke="#888" stroke-width="1"/><text x="360" y="200" text-anchor="middle" fill="#aaaaaa" font-size="11">UCSB</text><text x="360" y="218" text-anchor="middle" fill="#aaaaaa" font-size="10">1969接続</text><rect x="480" y="180" width="200" height="50" rx="6" fill="#16213e" stroke="#888" stroke-width="1"/><text x="580" y="200" text-anchor="middle" fill="#aaaaaa" font-size="11">SRI / ユタ大</text><text x="580" y="218" text-anchor="middle" fill="#aaaaaa" font-size="10">1969接続</text><line x1="240" y1="205" x2="260" y2="205" stroke="#f9a825" stroke-width="2"/><line x1="460" y1="205" x2="480" y2="205" stroke="#f9a825" stroke-width="2"/><text x="400" y="290" text-anchor="middle" fill="#f9a825" font-size="13">主目的: 高価なコンピュータ資源の共有</text></svg>
- **広まった神話：**
- 「インターネットは核攻撃後も通信できるよう米国国防省が設計した分散ネットワーク」
- **実際の起源（1969年）：**
- ARPAの資金提供を受けた4大学（UCLA, UCSB, SRI, ユタ大）の接続
- 当初の主目的：高価なコンピュータ資源の共有


---

# 「核戦争対応ネットワーク」という神話（2/2）

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><rect x="30" y="30" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="140" y="62" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Paul Baran 研究</text><text x="140" y="82" text-anchor="middle" fill="#cccccc" font-size="11">RAND研究所（1960年代）</text><text x="140" y="98" text-anchor="middle" fill="#cccccc" font-size="10">「核攻撃に強いネット」研究</text><rect x="290" y="30" width="220" height="80" rx="8" fill="#16213e" stroke="#888" stroke-width="1" stroke-dasharray="6,3"/><text x="400" y="62" text-anchor="middle" fill="#888888" font-size="13" font-weight="bold">採用されなかった</text><text x="400" y="82" text-anchor="middle" fill="#888888" font-size="11">Baranの提案は</text><text x="400" y="98" text-anchor="middle" fill="#888888" font-size="11">ARPANETに使われず</text><rect x="550" y="30" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="660" y="62" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">ARPANET</text><text x="660" y="82" text-anchor="middle" fill="#cccccc" font-size="11">独立して設計された</text><text x="660" y="98" text-anchor="middle" fill="#cccccc" font-size="11">資源共有が目的</text><line x1="250" y1="70" x2="290" y2="70" stroke="#e91e63" stroke-width="2"/><polygon points="288,64 298,70 288,76" fill="#e91e63"/><line x1="510" y1="70" x2="548" y2="70" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/><polygon points="546,64 556,70 546,76" fill="#888888"/><rect x="150" y="170" width="500" height="80" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="400" y="202" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">歴史の単純化が「神話」を生んだ</text><text x="400" y="224" text-anchor="middle" fill="#cccccc" font-size="12">軍の資金 + 研究者の実用ニーズ = 混同</text><text x="400" y="242" text-anchor="middle" fill="#aaaaaa" font-size="10">Larry Roberts: 「核攻撃への対応は設計目標ではなかった」</text></svg>
- 異なる大学のコンピュータが互いにアクセスできるようにしたかった
- **Paul Baran（1960年代）の研究との混同：** RAND研究所のBaran は確かに「核攻撃に強いネットワーク」を研究
- しかし彼の提案は採用されなかった — ARPANETはBaran の研究とは独立して設計された
- 歴史の単純化が「神話」を生んだ


---

<!-- _class: lead -->
# 本当の開発動機


---

# 研究者の実用的な需要（1/2）

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><rect x="30" y="20" width="170" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="115" y="50" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">UCLA</text><text x="115" y="72" text-anchor="middle" fill="#cccccc" font-size="10">IBM メインフレーム</text><text x="115" y="88" text-anchor="middle" fill="#cccccc" font-size="10">$500/時間</text><rect x="315" y="20" width="170" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="50" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">UCSB</text><text x="400" y="72" text-anchor="middle" fill="#cccccc" font-size="10">CDC 6400</text><text x="400" y="88" text-anchor="middle" fill="#cccccc" font-size="10">$300/時間</text><rect x="600" y="20" width="170" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="685" y="50" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">SRI</text><text x="685" y="72" text-anchor="middle" fill="#cccccc" font-size="10">SDS 940</text><text x="685" y="88" text-anchor="middle" fill="#cccccc" font-size="10">$400/時間</text><text x="115" y="118" text-anchor="middle" fill="#e91e63" font-size="9">使いたければ現地へ行く</text><text x="400" y="118" text-anchor="middle" fill="#e91e63" font-size="9">他大学は接続不可</text><text x="685" y="118" text-anchor="middle" fill="#e91e63" font-size="9">高コスト・非効率</text><rect x="200" y="195" width="400" height="70" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="400" y="223" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">Licklider のビジョン（1963年）</text><text x="400" y="245" text-anchor="middle" fill="#cccccc" font-size="11">「研究者が世界中のコンピュータ資源を共有できる</text><text x="400" y="260" text-anchor="middle" fill="#cccccc" font-size="11">銀河系間コンピュータネットワーク」</text><line x1="200" y1="85" x2="248" y2="230" stroke="#aaaaaa" stroke-width="1" stroke-dasharray="4,3"/><line x1="400" y1="150" x2="400" y2="195" stroke="#aaaaaa" stroke-width="1" stroke-dasharray="4,3"/><line x1="600" y1="85" x2="552" y2="230" stroke="#aaaaaa" stroke-width="1" stroke-dasharray="4,3"/></svg>
- **1960年代の研究環境：** 各大学が独自の大型コンピュータを持っていた
- コンピュータ時間は非常に高価（1時間数百ドル）
- 別大学のコンピュータを使いたい場合は現地に行くしかなかった
- **J.C.R. Lickliderの「銀河系間コンピュータネットワーク」（1963年）：** 研究者が世界中のコンピュータ資源を共有できるビジョン


---

# 研究者の実用的な需要（2/2）

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><rect x="40" y="30" width="340" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="210" y="58" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Larry Roberts の証言</text><text x="210" y="80" text-anchor="middle" fill="#cccccc" font-size="11">「核攻撃への対応は設計目標ではなかった」</text><text x="210" y="100" text-anchor="middle" fill="#cccccc" font-size="11">「主目的は大学間の資源共有と</text><text x="210" y="118" text-anchor="middle" fill="#cccccc" font-size="11">研究コラボレーション」</text><rect x="420" y="30" width="340" height="100" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="590" y="58" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">実際の資金構造</text><text x="590" y="80" text-anchor="middle" fill="#cccccc" font-size="11">ARPA（軍）の資金提供</text><text x="590" y="100" text-anchor="middle" fill="#cccccc" font-size="11">+</text><text x="590" y="118" text-anchor="middle" fill="#cccccc" font-size="11">研究者の実用ニーズ</text><rect x="200" y="165" width="400" height="75" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="193" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">「計算センターを繋ぐことで</text><text x="400" y="213" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">研究効率を上げる」</text><text x="400" y="232" text-anchor="middle" fill="#aaaaaa" font-size="10">核戦争対応 ≠ ARPANETの設計思想</text></svg>
- 「計算センターを繋ぐことで研究効率を上げる」
- **Larry Roberts（ARPAnet設計者）：** 「核攻撃への対応は設計目標ではなかった」と明言
- 「主目的は大学間の資源共有と研究コラボレーション」
- 軍の資金援助 + 研究者の実用ニーズ の組み合わせ


---

# 商業インターネットへの転換（1/2）

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><line x1="60" y1="250" x2="760" y2="250" stroke="#444" stroke-width="2"/><line x1="60" y1="250" x2="60" y2="40" stroke="#444" stroke-width="2"/><text x="400" y="282" text-anchor="middle" fill="#888" font-size="11">年代</text><circle cx="120" cy="220" r="6" fill="#f9a825"/><text x="120" y="238" text-anchor="middle" fill="#f9a825" font-size="9">1969</text><text x="120" y="210" text-anchor="middle" fill="#cccccc" font-size="9">ARPANET</text><circle cx="240" cy="200" r="6" fill="#f9a825"/><text x="240" y="238" text-anchor="middle" fill="#f9a825" font-size="9">1983</text><text x="240" y="190" text-anchor="middle" fill="#cccccc" font-size="9">TCP/IP</text><circle cx="360" cy="175" r="6" fill="#e91e63"/><text x="360" y="238" text-anchor="middle" fill="#e91e63" font-size="9">1991</text><text x="360" y="162" text-anchor="middle" fill="#e91e63" font-size="9">NSFnet商用解禁</text><text x="360" y="150" text-anchor="middle" fill="#e91e63" font-size="9">+ WWW</text><circle cx="490" cy="120" r="6" fill="#4caf50"/><text x="490" y="238" text-anchor="middle" fill="#4caf50" font-size="9">1993</text><text x="490" y="108" text-anchor="middle" fill="#4caf50" font-size="9">Mosaic</text><text x="490" y="96" text-anchor="middle" fill="#4caf50" font-size="9">ブラウザ</text><circle cx="620" cy="75" r="6" fill="#2196f3"/><text x="620" y="238" text-anchor="middle" fill="#2196f3" font-size="9">1995</text><text x="620" y="63" text-anchor="middle" fill="#2196f3" font-size="9">ドットコム</text><text x="620" y="51" text-anchor="middle" fill="#2196f3" font-size="9">ブーム</text><polyline points="120,220 240,200 360,175 490,120 620,75" fill="none" stroke="#f9a825" stroke-width="2"/><rect x="200" y="20" width="260" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="330" y="42" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Tim Berners-Lee のWWW</text><text x="330" y="60" text-anchor="middle" fill="#cccccc" font-size="10">特許取得せず無償公開 → 爆発的普及</text></svg>
- **1991年：NSFnetの商用利用解禁** — それまでインターネットは学術・政府利用のみ
- 商用企業の接続が許可されると爆発的に普及
- **Tim Berners-Lee のWWW（1991年）：** CERNの物理学者が研究文書共有のために作った


---

# 商業インターネットへの転換（2/2）

- 特許取得せず無償公開 → Webの爆発的普及
- 「インターネットの核攻撃対応設計」への意図はゼロ
- **Mosaic ブラウザ（1993年）：** NCSA（国立スーパーコンピュータ応用研究所）が開発
- 画像を表示できる最初の一般向けブラウザ
- インターネットを「普通の人が使えるもの」にした


---

# まとめ：偶然の帝国

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><rect x="30" y="30" width="340" height="70" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="200" y="58" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">ARPANETの真の動機</text><text x="200" y="78" text-anchor="middle" fill="#cccccc" font-size="11">「核戦争」ではなく「資源共有」</text><text x="200" y="93" text-anchor="middle" fill="#cccccc" font-size="10">高価なコンピュータを研究者で共有するため</text><rect x="430" y="30" width="340" height="70" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="58" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">Webと無償公開</text><text x="600" y="78" text-anchor="middle" fill="#cccccc" font-size="11">物理学者・学生の「実用ニーズ」</text><text x="600" y="93" text-anchor="middle" fill="#cccccc" font-size="10">最大のイノベーションは「無償公開」の決断</text><rect x="30" y="130" width="340" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="158" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">軍事起源神話の正体</text><text x="200" y="178" text-anchor="middle" fill="#cccccc" font-size="11">単純化した歴史の産物</text><text x="200" y="193" text-anchor="middle" fill="#cccccc" font-size="10">Baran研究 ≠ ARPANET設計</text><rect x="430" y="130" width="340" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="158" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">教訓：偶然の帝国</text><text x="600" y="178" text-anchor="middle" fill="#cccccc" font-size="11">世界を変えようとした人より</text><text x="600" y="193" text-anchor="middle" fill="#cccccc" font-size="10">具体的な問題を解こうとした人が作る</text><rect x="150" y="225" width="500" height="40" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1"/><text x="400" y="250" text-anchor="middle" fill="#e91e63" font-size="12">最も変革的な技術は「偶然」の産物だった</text></svg>
- ✅ **ARPANETは「核戦争対応」ではなく「資源共有」のために作られた**
- ✅ **Webはブラウザは物理学者・学生の「実用ニーズ」から生まれた**
- ✅ **最大のイノベーションは「無償公開」という決断**
- ✅ **インターネットの軍事起源神話は単純化した歴史の産物**

