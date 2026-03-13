---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "自由意志と神経科学"
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
# 自由意志は幻想か
— 神経科学が挑む哲学の難問

- 「行動する300ミリ秒前に脳は決定している」— Libet実験
- 決定論と量子ランダム性の間に「自由意志」の余地はあるか
- 法律・道徳・AI設計への根本的な含意


---

# アジェンダ

> *決定論的脳活動が意識的決断の0.5秒前に発火する実験的証拠*

- 1. Libet実験の衝撃
- 2. 決定論と自由意志の哲学
- 3. 量子ランダム性は助けになるか
- 4. 「自由意志」の再定義
- 5. 法律・道徳・AIへの含意


---

<!-- _class: lead -->
# Libet実験

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a1a2e"/><text x="400" y="60" text-anchor="middle" font-size="28" font-weight="bold" fill="#f9a825" font-family="sans-serif">Libet実験（1983）</text><text x="400" y="95" text-anchor="middle" font-size="16" fill="#cccccc" font-family="sans-serif">「意識の前に脳が動く」—自由意志論争を覆した実験</text><rect x="60" y="130" width="680" height="4" rx="2" fill="#444466"/><circle cx="160" cy="132" r="10" fill="#e91e63"/><text x="160" y="165" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif">準備電位</text><text x="160" y="182" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif">発生</text><text x="160" y="200" text-anchor="middle" font-size="12" fill="#888888" font-family="sans-serif">-550ms</text><circle cx="340" cy="132" r="10" fill="#f9a825"/><text x="340" y="165" text-anchor="middle" font-size="13" fill="#f9a825" font-family="sans-serif">意識的な</text><text x="340" y="182" text-anchor="middle" font-size="13" fill="#f9a825" font-family="sans-serif">「決意」</text><text x="340" y="200" text-anchor="middle" font-size="12" fill="#888888" font-family="sans-serif">-200ms</text><circle cx="560" cy="132" r="10" fill="#4caf50"/><text x="560" y="165" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif">筋肉への</text><text x="560" y="182" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif">神経信号</text><text x="560" y="200" text-anchor="middle" font-size="12" fill="#888888" font-family="sans-serif">0ms</text><circle cx="680" cy="132" r="10" fill="#29b6f6"/><text x="680" y="165" text-anchor="middle" font-size="13" fill="#29b6f6" font-family="sans-serif">手首が</text><text x="680" y="182" text-anchor="middle" font-size="13" fill="#29b6f6" font-family="sans-serif">動く</text><text x="680" y="200" text-anchor="middle" font-size="12" fill="#888888" font-family="sans-serif">+100ms</text><line x1="160" y1="132" x2="340" y2="132" stroke="#555577" stroke-width="2" stroke-dasharray="6,3"/><line x1="340" y1="132" x2="560" y2="132" stroke="#555577" stroke-width="2"/><line x1="560" y1="132" x2="680" y2="132" stroke="#555577" stroke-width="2"/><rect x="180" y="230" width="340" height="50" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="350" y="251" text-anchor="middle" font-size="14" fill="#e91e63" font-family="sans-serif" font-weight="bold">脳の無意識活動</text><text x="350" y="270" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">準備電位 → 意識的決意まで 350ms のギャップ</text><rect x="240" y="310" width="320" height="50" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="400" y="331" text-anchor="middle" font-size="14" fill="#f9a825" font-family="sans-serif" font-weight="bold">Libet の解釈</text><text x="400" y="350" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">「拒否権（Veto）」はまだ意識に残る</text></svg>


---

# 行動の前に脳が決める（1/2）

> *意識的決意より300〜500ms前に準備電位が出現—脳は先行して動く*

- **Benjamin Libet（1983年）の実験：**
- 被験者に「好きなときに手首を曲げてください」と指示
- 脳波（EEG）と「いつ動こうと思ったか」を同時計測
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="220" fill="#1a1a2e" rx="8"/><text x="400" y="30" text-anchor="middle" font-size="15" fill="#f9a825" font-family="sans-serif" font-weight="bold">実験プロトコル</text><rect x="40" y="55" width="160" height="60" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="120" y="82" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">EEG電極で</text><text x="120" y="100" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">脳波計測</text><rect x="240" y="55" width="160" height="60" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="320" y="82" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">時計の針で</text><text x="320" y="100" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">「決意」時刻を報告</text><rect x="440" y="55" width="160" height="60" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="520" y="82" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">筋電図（EMG）で</text><text x="520" y="100" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">動作タイミング計測</text><rect x="600" y="55" width="160" height="60" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="680" y="82" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif" font-weight="bold">準備電位が先行</text><text x="680" y="100" text-anchor="middle" font-size="13" fill="#ffffff" font-family="sans-serif">300〜500ms</text><polygon points="200,85 230,75 230,95" fill="#888888"/><polygon points="400,85 430,75 430,95" fill="#888888"/><polygon points="590,85 600,75 600,95" fill="#e91e63"/><rect x="200" y="150" width="400" height="45" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="400" y="170" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif" font-weight="bold">主な発見</text><text x="400" y="188" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">意識的意図より 350ms 前に準備電位が検出された</text></svg>
- **結果：**
- 「動こうと思った」意識的な感覚より
- **300〜500ミリ秒前** に脳の準備電位（Readiness Potential）が出現


---

# 行動の前に脳が決める（2/2）（1/2）

> *Libet批判の準備電位ノイズ説にVetoの余地が残る可能性がある*

- = 脳はあなたが「決めた」と思う前にすでに準備していた
- ---
- **解釈の論争：**
- Libet自身：「拒否権（Veto）は残る」自由意志は完全否定されない


---

# 行動の前に脳が決める（2/2）（2/2）

> *Haynes(2008)がfMRIで最大7秒前に行動を予測、Libet批判への反証*

- 批判：準備電位は「動くかもしれない」の確率的ノイズかもしれない
- ---
- **後続研究（2008年：Haynes）：**
- fMRIで最大7秒前に行動を予測できることを発見


---

# 決定論と相容主義（1/2）

> *量子ランダム性は自由意志の救いにならない—ランダムは自由ではない*

- **ハード決定論：**
- 物理法則が完全に決定しているなら自由意志は幻想
- ラプラスの悪魔：初期条件が分かれば未来は計算できる
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="200" fill="#1a1a2e" rx="8"/><text x="400" y="28" text-anchor="middle" font-size="15" fill="#f9a825" font-family="sans-serif" font-weight="bold">3つの哲学的立場</text><rect x="30" y="45" width="220" height="130" rx="10" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="140" y="75" text-anchor="middle" font-size="14" fill="#e91e63" font-family="sans-serif" font-weight="bold">ハード決定論</text><text x="140" y="98" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">全ての出来事は</text><text x="140" y="116" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">因果的に決定される</text><text x="140" y="134" text-anchor="middle" font-size="12" fill="#ffaaaa" font-family="sans-serif">→ 自由意志は幻想</text><text x="140" y="155" text-anchor="middle" font-size="11" fill="#888888" font-family="sans-serif">Spinoza, Holbach</text><rect x="290" y="45" width="220" height="130" rx="10" fill="#2d2d4e" stroke="#29b6f6" stroke-width="2"/><text x="400" y="75" text-anchor="middle" font-size="14" fill="#29b6f6" font-family="sans-serif" font-weight="bold">非両立論（リバタリアン）</text><text x="400" y="98" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">決定論は間違い、または</text><text x="400" y="116" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">量子的不確定性がある</text><text x="400" y="134" text-anchor="middle" font-size="12" fill="#aaddff" font-family="sans-serif">→ 真の自由意志が存在</text><text x="400" y="155" text-anchor="middle" font-size="11" fill="#888888" font-family="sans-serif">Kane, Penrose</text><rect x="550" y="45" width="220" height="130" rx="10" fill="#2d2d4e" stroke="#4caf50" stroke-width="2"/><text x="660" y="75" text-anchor="middle" font-size="14" fill="#4caf50" font-family="sans-serif" font-weight="bold">相容主義</text><text x="660" y="98" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">決定論と自由意志は</text><text x="660" y="116" text-anchor="middle" font-size="12" fill="#cccccc" font-family="sans-serif">両立できる</text><text x="660" y="134" text-anchor="middle" font-size="12" fill="#aaffaa" font-family="sans-serif">→ 実用的自由意志</text><text x="660" y="155" text-anchor="middle" font-size="11" fill="#888888" font-family="sans-serif">Dennett, Frankfurt</text></svg>
- **量子ランダム性は救いか？：**
- 量子力学は根本的にランダムだが
- 「ランダムな決定」は「自由な決定」ではない


---

# 決定論と相容主義（2/2）（1/2）

> *相容主義は決定論と自由意志を「外的強制なしの行動」で両立させる*

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold" font-family="sans-serif">相容主義：自由意志の再定義スペクトル</text><rect x="40" y="50" width="720" height="30" rx="6" fill="#16213e"/><rect x="40" y="50" width="240" height="30" rx="6" fill="#c62828" opacity="0.8"/><rect x="280" y="50" width="240" height="30" rx="6" fill="#f57f17" opacity="0.8"/><rect x="520" y="50" width="240" height="30" rx="6" fill="#2e7d32" opacity="0.8"/><text x="160" y="70" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">ハード決定論</text><text x="400" y="70" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">相容主義（主流）</text><text x="640" y="70" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">リバタリアン</text><text x="160" y="100" text-anchor="middle" fill="#ef9a9a" font-size="11" font-family="sans-serif">自由意志は幻想</text><text x="400" y="100" text-anchor="middle" fill="#fff9c4" font-size="11" font-family="sans-serif">決定論と両立する自由意志</text><text x="640" y="100" text-anchor="middle" fill="#a5d6a7" font-size="11" font-family="sans-serif">真の自由意志が存在</text><rect x="230" y="120" width="340" height="110" rx="10" fill="#0d47a1" opacity="0.85"/><text x="400" y="145" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">相容主義の核心</text><text x="400" y="168" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">自由意志 = 外的強制なしに</text><text x="400" y="186" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif">自分の欲求に従って行動できること</text><text x="400" y="208" text-anchor="middle" fill="#69f0ae" font-size="11" font-family="sans-serif">決定論が正しくても「自由意志の感覚」は保持できる</text><text x="400" y="248" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">代表: Daniel Dennett、Philip Strawson（哲学の主流派）</text><text x="160" y="248" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">Spinoza, Laplace</text><text x="640" y="248" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">Kane, Penrose</text></svg>
- コイントスは自由ではない → 量子的ランダムも同様
- ---
- **相容主義（Compatibilism）：**


---

# 決定論と相容主義（2/2）（2/2）

> *相容主義が主流：外的強制なしに自分の欲求に従えば自由意志は成立する*

- 最も広く受け入れられている哲学的立場
- 自由意志 = 外的強制なしに自分の欲求に従って行動できること
- 決定論と両立する「自由意志」の再定義
- ---
- Daniel Dennett・Philip Strawsonが代表的な論者


---

# 法律・道徳・AIへの含意（1/2）

> *自由意志がないなら刑罰は応報より予防・更生として再設計すべき*

- **刑事責任の基盤：**
- 自由意志がないなら「罰」は意味をなすか
- → 「罰」は応報（過去への報復）より
- 予防・更生（未来への介入）として再解釈
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="200" fill="#1a1a2e" rx="8"/><text x="400" y="28" text-anchor="middle" font-size="15" fill="#f9a825" font-family="sans-serif" font-weight="bold">神経活動 → 行動 → 社会的評価の因果連鎖</text><rect x="20" y="60" width="140" height="50" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="90" y="83" text-anchor="middle" font-size="12" fill="#e91e63" font-family="sans-serif" font-weight="bold">脳の神経活動</text><text x="90" y="100" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">準備電位・前頭前野</text><rect x="200" y="60" width="130" height="50" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="265" y="83" text-anchor="middle" font-size="12" fill="#f9a825" font-family="sans-serif" font-weight="bold">意識的意図</text><text x="265" y="100" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">主観的感覚</text><rect x="370" y="60" width="130" height="50" rx="8" fill="#2d2d4e" stroke="#29b6f6" stroke-width="2"/><text x="435" y="83" text-anchor="middle" font-size="12" fill="#29b6f6" font-family="sans-serif" font-weight="bold">行動・決断</text><text x="435" y="100" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">運動実行</text><rect x="540" y="60" width="130" height="50" rx="8" fill="#2d2d4e" stroke="#4caf50" stroke-width="2"/><text x="605" y="83" text-anchor="middle" font-size="12" fill="#4caf50" font-family="sans-serif" font-weight="bold">社会的結果</text><text x="605" y="100" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">他者への影響</text><rect x="680" y="60" width="110" height="50" rx="8" fill="#2d2d4e" stroke="#ab47bc" stroke-width="2"/><text x="735" y="83" text-anchor="middle" font-size="12" fill="#ab47bc" font-family="sans-serif" font-weight="bold">法的判断</text><text x="735" y="100" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">責任・更生</text><polygon points="160,85 190,75 190,95" fill="#888888"/><polygon points="330,85 360,75 360,95" fill="#888888"/><polygon points="500,85 530,75 530,95" fill="#888888"/><polygon points="670,85 680,75 680,95" fill="#888888"/><rect x="150" y="145" width="500" height="40" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="162" text-anchor="middle" font-size="12" fill="#f9a825" font-family="sans-serif" font-weight="bold">「意思決定能力」の有無が法的責任の核心</text><text x="400" y="178" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">前頭葉損傷・精神疾患 → 責任軽減事由として認められつつある</text></svg>
- **脳科学と法廷：**


---

# 法律・道徳・AIへの含意（2/2）

> *AIと人間が同じ決定論的プロセスなら自律性の再定義が急務*

- 前頭葉損傷・精神疾患を責任軽減事由とする判例が増加
- 「行為者の選択能力」が法的責任の焦点
- ---
- **AIへの含意：**
- AIが人間と同じ「決定論的」プロセスで動くなら
- なぜ人間だけが責任を持つのか？
- 「自律性（Autonomy）」の再定義が必要


---

# まとめ：自由意志の実用的意味

> *自由意志の感覚は消えない、責任は応報でなく能力と状況で再構築できる*

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="320" fill="#1a1a2e" rx="8"/><text x="400" y="35" text-anchor="middle" font-size="18" fill="#f9a825" font-family="sans-serif" font-weight="bold">自由意志論争：主要な発見と実用的含意</text><rect x="30" y="60" width="220" height="100" rx="10" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="140" y="85" text-anchor="middle" font-size="13" fill="#e91e63" font-family="sans-serif" font-weight="bold">Libet実験（1983）</text><text x="140" y="105" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">意識より前に脳が準備</text><text x="140" y="122" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">Haynes(2008): 7秒前に予測</text><text x="140" y="139" text-anchor="middle" font-size="11" fill="#ffaaaa" font-family="sans-serif">→ 意識的決定の「先行性」に疑問</text><rect x="290" y="60" width="220" height="100" rx="10" fill="#2d2d4e" stroke="#29b6f6" stroke-width="2"/><text x="400" y="85" text-anchor="middle" font-size="13" fill="#29b6f6" font-family="sans-serif" font-weight="bold">哲学的立場</text><text x="400" y="105" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">ハード決定論・リバタリアン</text><text x="400" y="122" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">相容主義（主流）</text><text x="400" y="139" text-anchor="middle" font-size="11" fill="#aaddff" font-family="sans-serif">→ 「外的強制なし」で再定義</text><rect x="550" y="60" width="220" height="100" rx="10" fill="#2d2d4e" stroke="#4caf50" stroke-width="2"/><text x="660" y="85" text-anchor="middle" font-size="13" fill="#4caf50" font-family="sans-serif" font-weight="bold">社会・法律・AI</text><text x="660" y="105" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">応報から予防・更生へ</text><text x="660" y="122" text-anchor="middle" font-size="11" fill="#cccccc" font-family="sans-serif">脳科学が法廷に登場</text><text x="660" y="139" text-anchor="middle" font-size="11" fill="#aaffaa" font-family="sans-serif">→ 自律性の再定義が急務</text><polygon points="250,110 275,100 275,120" fill="#555577"/><polygon points="510,110 535,100 535,120" fill="#555577"/><rect x="200" y="200" width="400" height="70" rx="12" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="228" text-anchor="middle" font-size="15" fill="#f9a825" font-family="sans-serif" font-weight="bold">実用的な結論</text><text x="400" y="250" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">「自由意志の感覚」は消えない—それ自体が人間の本質</text><text x="400" y="268" text-anchor="middle" font-size="13" fill="#cccccc" font-family="sans-serif">責任・道徳は「能力と状況」に基づいて再構築できる</text><rect x="30" y="290" width="740" height="22" rx="4" fill="#0d0d1a"/><text x="400" y="305" text-anchor="middle" font-size="11" fill="#888888" font-family="sans-serif">自由意志と神経科学 — リベットの実験と決定論の問題</text></svg>
- ✅ **Libet実験：意識的決定より前に脳が準備を始める**
- ✅ **ハード決定論：物理法則下で真の自由意志はないかもしれない**
- ✅ **相容主義：「外的強制なしに行動できる」として再定義**
- ✅ **法律・道徳は「責任」から「予防・更生」へシフトしつつある**
- 
- 「自由意志の感覚は消えない。それ自体が人間の本質的な特徴かもしれない」

