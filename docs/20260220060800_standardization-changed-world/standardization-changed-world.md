---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "標準化の経済学"
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
# 標準化が変えた世界
— コンテナ・時刻・単位の革命

- 20フィートのコンテナが世界貿易を変えた
- 時間帯の統一が鉄道帝国を作った
- 規格化の見えないコストとネットワーク効果


---

# アジェンダ

- <svg viewBox="0 0 800 340" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="340" fill="#1a1a2e"/><rect x="40" y="30" width="340" height="60" rx="8" fill="#2d2d4e" stroke="#f9a825" stroke-width="2"/><text x="210" y="68" text-anchor="middle" fill="#f9a825" font-size="20" font-family="sans-serif">1. コンテナ革命</text><rect x="420" y="30" width="340" height="60" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="590" y="68" text-anchor="middle" fill="#e91e63" font-size="20" font-family="sans-serif">2. 標準時と鉄道の誕生</text><rect x="40" y="130" width="340" height="60" rx="8" fill="#2d2d4e" stroke="#4fc3f7" stroke-width="2"/><text x="210" y="168" text-anchor="middle" fill="#4fc3f7" font-size="20" font-family="sans-serif">3. メートル法という政治</text><rect x="420" y="130" width="340" height="60" rx="8" fill="#2d2d4e" stroke="#a5d6a7" stroke-width="2"/><text x="590" y="168" text-anchor="middle" fill="#a5d6a7" font-size="20" font-family="sans-serif">4. デジタル標準の経済学</text><rect x="200" y="230" width="400" height="60" rx="8" fill="#2d2d4e" stroke="#ce93d8" stroke-width="2"/><text x="400" y="268" text-anchor="middle" fill="#ce93d8" font-size="20" font-family="sans-serif">5. 標準化の光と影</text></svg>


---

<!-- _class: lead -->
# コンテナ革命


---

# 20フィートの箱が世界を変えた（1/2）

> *コンテナ1本が荷役コストを97%削減し世界貿易を10倍にした*

- **コンテナ以前（1950年代）：**
- 荷積み・荷降ろしに船員・港湾労働者が何日もかかる
- バラ積み貨物の損傷・盗難が多発
- 輸送コストが製品価格の25〜30%
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="30" y="20" width="340" height="160" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="200" y="55" text-anchor="middle" fill="#e91e63" font-size="18" font-weight="bold" font-family="sans-serif">BEFORE 1956</text><text x="200" y="85" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">バラ積み貨物</text><text x="200" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">港湾労働者が手作業で積み替え</text><text x="200" y="131" text-anchor="middle" fill="#e91e63" font-size="15" font-family="sans-serif">数日かかる / 損傷・盗難多発</text><text x="200" y="160" text-anchor="middle" fill="#ffcc02" font-size="14" font-family="sans-serif">コスト: $5.83/トン</text><polygon points="390,100 410,88 410,112" fill="#f9a825"/><rect x="430" y="20" width="340" height="160" rx="8" fill="#2d2d4e" stroke="#a5d6a7" stroke-width="2"/><text x="600" y="55" text-anchor="middle" fill="#a5d6a7" font-size="18" font-weight="bold" font-family="sans-serif">AFTER 1956</text><text x="600" y="85" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">標準化コンテナ</text><text x="600" y="108" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">クレーンで数分で積み替え完了</text><text x="600" y="131" text-anchor="middle" fill="#a5d6a7" font-size="15" font-family="sans-serif">数時間 / 損傷・盗難ゼロ</text><text x="600" y="160" text-anchor="middle" fill="#ffcc02" font-size="14" font-family="sans-serif">コスト: $0.16/トン</text></svg>
- **Malcolm McLean（1956年）：**
- 標準化された金属コンテナで世界初の定期輸送


---

# 20フィートの箱が世界を変えた（2/2）

> *Malcolm McLeanの発明1つが世界のサプライチェーンを再設計した*

- 「トラックの荷台をそのまま船に積む」
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold" font-family="sans-serif">コンテナ革命の数値インパクト</text><rect x="40" y="50" width="170" height="150" rx="6" fill="#3a1a2e"/><rect x="40" y="50" width="170" height="150" rx="6" fill="none" stroke="#e91e63" stroke-width="2"/><text x="125" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">荷役コスト</text><text x="125" y="110" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">97%</text><text x="125" y="135" text-anchor="middle" fill="#a0a0a0" font-size="12" font-family="sans-serif">削減</text><text x="125" y="160" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">$5.83 → $0.16/t</text><text x="125" y="185" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">（1956年比）</text><rect x="230" y="50" width="170" height="150" rx="6" fill="#1a2e1a"/><rect x="230" y="50" width="170" height="150" rx="6" fill="none" stroke="#a5d6a7" stroke-width="2"/><text x="315" y="80" text-anchor="middle" fill="#a5d6a7" font-size="13" font-family="sans-serif">世界貿易量</text><text x="315" y="110" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">10x</text><text x="315" y="135" text-anchor="middle" fill="#a0a0a0" font-size="12" font-family="sans-serif">増加</text><text x="315" y="160" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">1960年比</text><text x="315" y="185" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">主因: コンテナ化</text><rect x="420" y="50" width="170" height="150" rx="6" fill="#1a1a3e"/><rect x="420" y="50" width="170" height="150" rx="6" fill="none" stroke="#4fc3f7" stroke-width="2"/><text x="505" y="80" text-anchor="middle" fill="#4fc3f7" font-size="13" font-family="sans-serif">積み込み速度</text><text x="505" y="110" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">30x</text><text x="505" y="135" text-anchor="middle" fill="#a0a0a0" font-size="12" font-family="sans-serif">高速化</text><text x="505" y="160" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">数日 → 数時間</text><text x="505" y="185" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">港湾滞在時間</text><rect x="610" y="50" width="170" height="150" rx="6" fill="#2e1a1a"/><rect x="610" y="50" width="170" height="150" rx="6" fill="none" stroke="#f9a825" stroke-width="2"/><text x="695" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">標準規格採択</text><text x="695" y="110" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">ISO</text><text x="695" y="135" text-anchor="middle" fill="#a0a0a0" font-size="12" font-family="sans-serif">1968年</text><text x="695" y="160" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">20ft / 40ft</text><text x="695" y="185" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">国際統一規格</text></svg>
- **革命の数値：**
- コンテナ前：1トン荷揚げ5.83ドル → コンテナ後：0.16ドル
- 世界貿易量：1960年比で約10倍（主因はコンテナ化）
- 「コンテナは自由貿易より国際貿易を促進した」— Marc Levinson


---

# 標準時と鉄道（1/2）

> *鉄道事故防止の必要性が1884年の世界標準時を生み出した*

- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">標準時誕生の歴史タイムライン</text><line x1="60" y1="80" x2="740" y2="80" stroke="#4fc3f7" stroke-width="3"/><polygon points="740,80 728,72 728,88" fill="#4fc3f7"/><circle cx="130" cy="80" r="10" fill="#e91e63"/><text x="130" y="110" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">〜1840年</text><text x="130" y="128" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">各都市が独自の</text><text x="130" y="144" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">太陽時を使用</text><circle cx="300" cy="80" r="10" fill="#f9a825"/><text x="300" y="110" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">1840年</text><text x="300" y="128" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">GWR鉄道が</text><text x="300" y="144" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">「ロンドン時刻」採用</text><circle cx="490" cy="80" r="10" fill="#a5d6a7"/><text x="490" y="110" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">1847年</text><text x="490" y="128" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">英国鉄道会社が</text><text x="490" y="144" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">グリニッジ時刻統一</text><circle cx="670" cy="80" r="10" fill="#ce93d8"/><text x="670" y="110" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">1884年</text><text x="670" y="128" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">国際子午線会議</text><text x="670" y="144" text-anchor="middle" fill="#ffffff" font-size="12" font-family="sans-serif">GMT世界標準採択</text><line x1="130" y1="70" x2="130" y2="45" stroke="#e91e63" stroke-width="1" stroke-dasharray="4"/><line x1="300" y1="70" x2="300" y2="45" stroke="#f9a825" stroke-width="1" stroke-dasharray="4"/><line x1="490" y1="70" x2="490" y2="45" stroke="#a5d6a7" stroke-width="1" stroke-dasharray="4"/><line x1="670" y1="70" x2="670" y2="45" stroke="#ce93d8" stroke-width="1" stroke-dasharray="4"/><text x="400" y="195" text-anchor="middle" fill="#808080" font-size="11" font-family="sans-serif">鉄道の普及が標準時の必要性を生み出した — 技術が社会制度を変えた例</text></svg>
- **鉄道以前：**
- 各都市が独自の「地方太陽時」を使用
- ロンドン・バーミンガム間で14分のズレ
- **鉄道会社の問題：**
- 時刻表が作れない → 衝突事故のリスク
- グレート・ウェスタン鉄道が1840年に「ロンドン時刻」統一


---

# 標準時と鉄道（2/2）

> *標準化は力関係も反映する—グリニッジはイギリス覇権の産物*

- **標準時の誕生（1884年）：**
- 国際子午線会議でグリニッジ標準時（GMT）採択
- 地球を24の時間帯に分割
- → 国際鉄道・海運・通信を可能にした
- 標準化は「力関係」も表す：グリニッジはイギリスの覇権の産物


---

# デジタル標準の経済学（1/2）

> *オープン標準TCP/IPがネットワーク効果で世界を飲み込んだ*

- **TCP/IP（1970年代）：**
- インターネットの通信規格 → 誰でも接続できるオープン標準
- 独占的な標準ではなくコモンズとして普及
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">ネットワーク効果と標準化</text><circle cx="160" cy="110" r="55" fill="none" stroke="#4fc3f7" stroke-width="2"/><text x="160" y="100" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold" font-family="sans-serif">オープン</text><text x="160" y="118" text-anchor="middle" fill="#4fc3f7" font-size="13" font-family="sans-serif">標準</text><text x="160" y="140" text-anchor="middle" fill="#a5d6a7" font-size="11" font-family="sans-serif">TCP/IP, HTTP</text><polygon points="225,110 240,102 240,118" fill="#f9a825"/><text x="268" y="114" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">参加者増加</text><polygon points="320,110 335,102 335,118" fill="#f9a825"/><circle cx="400" cy="110" r="55" fill="none" stroke="#a5d6a7" stroke-width="2"/><text x="400" y="100" text-anchor="middle" fill="#a5d6a7" font-size="13" font-weight="bold" font-family="sans-serif">ネットワーク</text><text x="400" y="118" text-anchor="middle" fill="#a5d6a7" font-size="13" font-family="sans-serif">価値向上</text><text x="400" y="140" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">Metcalfe's Law</text><polygon points="465,110 480,102 480,118" fill="#f9a825"/><text x="508" y="114" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">さらに参加者増</text><polygon points="560,110 575,102 575,118" fill="#f9a825"/><circle cx="640" cy="110" r="55" fill="none" stroke="#e91e63" stroke-width="2"/><text x="640" y="100" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">標準が</text><text x="640" y="118" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">デファクト化</text><text x="640" y="140" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="sans-serif">市場を支配</text><text x="400" y="185" text-anchor="middle" fill="#808080" font-size="11" font-family="sans-serif">参加者が増えるほど標準の価値が高まる正のフィードバックループ</text></svg>
- **HTML/HTTPの開放（Tim Berners-Lee 1991年）：**
- 特許を取らずに無償公開 → Webの爆発的普及
- 「もし特許を取っていたらWebは生まれなかった」


---

# デジタル標準の経済学（2/2）

> *標準を制した企業がネットワーク効果で市場を独占する*

- **標準戦争：**
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold" font-family="sans-serif">標準戦争の事例</text><rect x="30" y="45" width="220" height="130" rx="8" fill="#2d2d4e" stroke="#4fc3f7" stroke-width="2"/><text x="140" y="72" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold" font-family="sans-serif">USB規格戦争</text><text x="140" y="98" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">USB-C vs Lightning</text><text x="140" y="120" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">Apple独自規格を維持</text><text x="140" y="143" text-anchor="middle" fill="#a5d6a7" font-size="12" font-family="sans-serif">EU規制で2024年USB-C統一</text><text x="140" y="163" text-anchor="middle" fill="#808080" font-size="11" font-family="sans-serif">規制が標準化を強制</text><rect x="290" y="45" width="220" height="130" rx="8" fill="#2d2d4e" stroke="#e91e63" stroke-width="2"/><text x="400" y="72" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold" font-family="sans-serif">光ディスク戦争</text><text x="400" y="98" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">HD-DVD vs Blu-ray</text><text x="400" y="120" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">2008年まで対立</text><text x="400" y="143" text-anchor="middle" fill="#a5d6a7" font-size="12" font-family="sans-serif">Blu-rayが勝利</text><text x="400" y="163" text-anchor="middle" fill="#808080" font-size="11" font-family="sans-serif">Sonyのコンテンツ戦略</text><rect x="550" y="45" width="220" height="130" rx="8" fill="#2d2d4e" stroke="#ce93d8" stroke-width="2"/><text x="660" y="72" text-anchor="middle" fill="#ce93d8" font-size="14" font-weight="bold" font-family="sans-serif">動画フォーマット</text><text x="660" y="98" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">VHS vs Betamax</text><text x="660" y="120" text-anchor="middle" fill="#e0e0e0" font-size="12" font-family="sans-serif">高品質よりも普及優先</text><text x="660" y="143" text-anchor="middle" fill="#a5d6a7" font-size="12" font-family="sans-serif">VHSが勝利</text><text x="660" y="163" text-anchor="middle" fill="#808080" font-size="11" font-family="sans-serif">録画時間と配給ネットワーク</text></svg>
- - USB-C vs Lightning（AppleがついにEU規制で降伏）
- - DVDフォーラム vs Blu-ray
- **ネットワーク効果と標準：**
- 標準を制した企業がネットワーク効果で市場を独占する


---

# まとめ：見えない支配インフラ

> *標準化は技術進化の阻害ではなく国際協力と市場拡大の土台になる*

- ✅ **コンテナ標準化が国際貿易コストを95%削減**
- ✅ **標準時は鉄道の要請から生まれた技術的インフラ**
- ✅ **デジタル標準（TCP/IP、HTTP）は開放性がカギ**
- ✅ **標準を制した者が市場を制する（ネットワーク効果）**
- 
- 「標準化は退屈だが、それが文明を可能にする」

