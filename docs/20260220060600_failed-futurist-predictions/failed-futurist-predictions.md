---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "未来予測の失敗学"
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
# 外れた未来予測から学ぶ
— なぜ専門家の予測は外れるのか

- 「2000年には空飛ぶ車が普及する」
- 専門家の予測精度はチンパンジーよりわずかに高い
- 予測が外れる構造的な理由と、外れない予測の作り方
- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="40" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#f9a825" font-weight="bold">予測 vs 現実のギャップ</text><rect x="60" y="70" width="140" height="90" rx="8" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"/><text x="130" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">専門家の</text><text x="130" y="128" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">自信度</text><text x="130" y="152" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#e91e63" font-weight="bold">★★★★★</text><rect x="250" y="70" width="140" height="90" rx="8" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"/><text x="320" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">実際の</text><text x="320" y="128" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">予測精度</text><text x="320" y="152" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#f9a825" font-weight="bold">★★☆☆☆</text><rect x="440" y="70" width="140" height="90" rx="8" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"/><text x="510" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">チンパンジー</text><text x="510" y="128" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">（ランダム）</text><text x="510" y="152" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#aaaaaa" font-weight="bold">★★☆☆☆</text><rect x="630" y="70" width="140" height="90" rx="8" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"/><text x="700" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">スーパー</text><text x="700" y="128" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff">フォーキャスター</text><text x="700" y="152" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#4caf50" font-weight="bold">★★★★☆</text><line x1="130" y1="180" x2="130" y2="210" stroke="#555" stroke-width="1"/><line x1="320" y1="180" x2="320" y2="210" stroke="#555" stroke-width="1"/><line x1="510" y1="180" x2="510" y2="210" stroke="#555" stroke-width="1"/><line x1="700" y1="180" x2="700" y2="210" stroke="#555" stroke-width="1"/><text x="130" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">過信</text><text x="320" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">現実</text><text x="510" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">基準線</text><text x="700" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">目標</text><text x="400" y="290" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825">自信と精度の乖離が「外れ予測」を生む</text></svg>


---

# アジェンダ

> *専門家予測の失敗構造とスーパーフォーキャスターの手法を解説*

- 1. 専門家予測の精度は？
- 2. 有名な外れ予測の事例
- 3. 予測が外れる理由の分析
- 4. スーパーフォーキャスターの手法
- 5. 良い予測の作り方


---

<!-- _class: lead -->
# 専門家予測の精度


---

# Philip Tetlock の20年間の研究（1/2）

> *専門家の予測精度はランダムよりわずかに高い程度にすぎない*

- **「Expert Political Judgment」（2005年）：**
- 300人の専門家に2万件の予測を依頼し追跡調査
- ---
- **結果：**
- - 専門家の予測精度はチンパンジー（ランダム）より「わずかに」高い
- - 「ヘッジホッグ型」（1つの大きな考えに固執）は最も精度が低い
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#f9a825" font-weight="bold">予測精度スコア比較（Brier Score ベース）</text><rect x="60" y="45" width="200" height="40" rx="4" fill="#2d2d4e"/><rect x="60" y="45" width="42" height="40" rx="4" fill="#aaaaaa"/><text x="270" y="72" text-anchor="end" font-family="sans-serif" font-size="13" fill="#ffffff">チンパンジー（ランダム）</text><text x="110" y="72" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">21%</text><rect x="60" y="100" width="200" height="40" rx="4" fill="#2d2d4e"/><rect x="60" y="100" width="52" height="40" rx="4" fill="#e91e63"/><text x="270" y="127" text-anchor="end" font-family="sans-serif" font-size="13" fill="#ffffff">ヘッジホッグ型専門家</text><text x="115" y="127" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff">26%</text><rect x="60" y="155" width="200" height="40" rx="4" fill="#2d2d4e"/><rect x="60" y="155" width="90" height="40" rx="4" fill="#f9a825"/><text x="270" y="182" text-anchor="end" font-family="sans-serif" font-size="13" fill="#ffffff">キツネ型専門家</text><text x="115" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#1a1a2e">45%</text><rect x="60" y="210" width="200" height="40" rx="4" fill="#2d2d4e"/><rect x="60" y="210" width="160" height="40" rx="4" fill="#4caf50"/><text x="270" y="237" text-anchor="end" font-family="sans-serif" font-size="13" fill="#ffffff">スーパーフォーキャスター</text><text x="145" y="237" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#1a1a2e">80%</text><text x="400" y="72" text-anchor="start" font-family="sans-serif" font-size="11" fill="#888">基準線</text><text x="400" y="127" text-anchor="start" font-family="sans-serif" font-size="11" fill="#e91e63">メディア最愛の専門家</text><text x="400" y="182" text-anchor="start" font-family="sans-serif" font-size="11" fill="#f9a825">多角的視点の持ち主</text><text x="400" y="237" text-anchor="start" font-family="sans-serif" font-size="11" fill="#4caf50">GJPトップ2%</text></svg>


---

# Philip Tetlock の20年間の研究（2/2）

> *メディアに出る断言型専門家ほど予測精度が低いという逆説*

- - 「キツネ型」（多様な視点を持つ）はより高い精度
- - 専門性の深さと予測精度には相関がない
- ---
- **メディアが呼ぶ専門家ほど自信過剰で精度が低い：**
- 確信を持って断言する専門家 → テレビ映りが良い
- 不確実性を正直に述べる専門家 → メディアに呼ばれない
- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#f9a825" font-weight="bold">ヘッジホッグ型 vs キツネ型</text><rect x="40" y="50" width="330" height="185" rx="10" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="205" y="80" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#e91e63" font-weight="bold">ヘッジホッグ型</text><text x="205" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">「一つの大きな真実」に固執</text><text x="205" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">予測を修正しない</text><text x="205" y="155" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">強い確信・断定的な言い回し</text><text x="205" y="180" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">メディア露出多い</text><text x="205" y="215" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#e91e63">予測精度：低い</text><rect x="430" y="50" width="330" height="185" rx="10" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="595" y="80" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#4caf50" font-weight="bold">キツネ型</text><text x="595" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">多様な視点・フレームを活用</text><text x="595" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">新情報で予測を積極更新</text><text x="595" y="155" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">不確実性を正直に表現</text><text x="595" y="180" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">地味で目立たない</text><text x="595" y="215" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4caf50">予測精度：高い</text><polygon points="385,135 415,125 415,145" fill="#f9a825"/><line x1="375" y1="135" x2="385" y2="135" stroke="#f9a825" stroke-width="2"/></svg>


---

# 有名な外れ予測（1/2）（1/2）

> *IBM・DEC・Gatesの技術予測3連発がことごとく外れた*

- **技術予測の失敗：**
- - IBM（1943年）：「世界のコンピュータ市場は5台分」
- - DEC創業者（1977年）：「個人がコンピュータを持つ理由はない」
- - Microsoftのゲイツ（1995年）：「インターネットは一時的な流行」


---

# 有名な外れ予測（1/2）（2/2）

> *技術予測の失敗は過信と単一視点への固執から生まれる*

- ---
- **過大評価された予測：**
- - 1964年：「2000年には核融合発電が普及」
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="400" y="24" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f9a825" font-weight="bold">技術予測の失敗タイムライン</text><line x1="60" y1="100" x2="740" y2="100" stroke="#444" stroke-width="2"/><polygon points="740,95 755,100 740,105" fill="#444"/><circle cx="120" cy="100" r="8" fill="#e91e63"/><text x="120" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">1943</text><text x="120" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e91e63">IBM</text><text x="120" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">市場は5台</text><circle cx="280" cy="100" r="8" fill="#e91e63"/><text x="280" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">1977</text><text x="280" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e91e63">DEC</text><text x="280" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">個人PCは不要</text><circle cx="460" cy="100" r="8" fill="#e91e63"/><text x="460" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">1995</text><text x="460" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e91e63">Gates</text><text x="460" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">Internet一時的</text><circle cx="640" cy="100" r="8" fill="#f9a825"/><text x="640" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cccccc">2007</text><text x="640" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f9a825">iPhone</text><text x="640" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cccccc">普及を予測できず</text><text x="400" y="185" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">赤=外れた予測  金=見逃した変化</text></svg>


---

# 有名な外れ予測（2/2）

> *過大・過小評価はランダムでなく領域によって偏る傾向がある*

- - 1980年代：「2000年には火星に人類が到達」
- - 2000年代：「2020年には汎用AIが完成」
- ---
- **過小評価された予測：**
- - スマートフォンの普及速度（2007年、iPhone発売時）
- - SNSの政治的影響力
- - COVID-19のパンデミック速度


---

# スーパーフォーキャスターの手法（1/2）

> *一般人がCIAアナリストより高い予測精度を出せた理由*

- **GJP（Good Judgment Project）の発見：**
- 一般人から選ばれた「スーパーフォーキャスター」が
- CIAのアナリストより高い予測精度を示した
- ---
- **スーパーフォーキャスターの共通特徴：**
- 1. 問題を「フェルミ推定」式に分解する
- <svg viewBox="0 0 800 230" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="230" fill="#1a1a2e"/><text x="400" y="26" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#f9a825" font-weight="bold">スーパーフォーキャスター vs CIA アナリスト</text><rect x="60" y="50" width="300" height="150" rx="10" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="210" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4caf50" font-weight="bold">スーパーフォーキャスター</text><text x="210" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">一般人（公募）</text><text x="210" y="128" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">機密情報なし</text><text x="210" y="151" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">オープン情報のみ使用</text><text x="210" y="183" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#4caf50" font-weight="bold">予測精度 ↑↑↑</text><rect x="440" y="50" width="300" height="150" rx="10" fill="#2d2d4e" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="590" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">CIA アナリスト</text><text x="590" y="105" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">専門訓練を受けたエリート</text><text x="590" y="128" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">機密情報にアクセス可能</text><text x="590" y="151" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cccccc">国家情報機関所属</text><text x="590" y="183" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#e91e63" font-weight="bold">予測精度 ↓</text><text x="400" y="145" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#f9a825" font-weight="bold">&gt;</text></svg>


---

# スーパーフォーキャスターの手法（2/2）

> *基準率・数値化・定期更新の3習慣が予測精度を大幅に向上させる*

- 2. 基準率（Base Rate）から出発する
- 3. 反証となる情報を積極的に探す
- 4. 予測を数値化し、定期的に更新する
- 5. グループで議論し異論を歓迎する
- ---
- **「私の予測が正しい確率は70%」という形式で表現**
- 自信と不確実性を同時に示す


---

# まとめ：外れる予測と当たる予測

> *確信の強さと精度は無関係、キャリブレーションこそが予測の本質*

- ✅ **専門家の予測精度はランダムよりわずかに高い程度**
- ✅ **確信が強い予測ほど外れやすい（ヘッジホッグの罠）**
- ✅ **スーパーフォーキャスター：基準率・分解・更新が鍵**
- ✅ **予測は「当たること」より「キャリブレーション」が重要**
- 
- 「予測が難しいのは未来だけではない。現在も難しい」— Niels Bohr
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#f9a825" font-weight="bold">外れる予測 vs 当たる予測の特徴</text><rect x="40" y="50" width="340" height="170" rx="10" fill="#3a1a2e" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="210" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#e91e63" font-weight="bold">外れる予測の特徴</text><text x="60" y="105" font-family="sans-serif" font-size="12" fill="#cccccc">✗  断定的・確率を使わない</text><text x="60" y="128" font-family="sans-serif" font-size="12" fill="#cccccc">✗  一つの理論・モデルに依存</text><text x="60" y="151" font-family="sans-serif" font-size="12" fill="#cccccc">✗  反証情報を無視する</text><text x="60" y="174" font-family="sans-serif" font-size="12" fill="#cccccc">✗  予測を更新しない</text><text x="60" y="197" font-family="sans-serif" font-size="12" fill="#cccccc">✗  遠い未来・広い範囲を対象</text><rect x="420" y="50" width="340" height="170" rx="10" fill="#1a2e1a" style="filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/><text x="590" y="78" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4caf50" font-weight="bold">当たる予測の特徴</text><text x="440" y="105" font-family="sans-serif" font-size="12" fill="#cccccc">✓  確率で表現（60%、75%）</text><text x="440" y="128" font-family="sans-serif" font-size="12" fill="#cccccc">✓  複数の視点・モデルを統合</text><text x="440" y="151" font-family="sans-serif" font-size="12" fill="#cccccc">✓  反証を積極的に探す</text><text x="440" y="174" font-family="sans-serif" font-size="12" fill="#cccccc">✓  新情報で定期的に更新</text><text x="440" y="197" font-family="sans-serif" font-size="12" fill="#cccccc">✓  近い未来・具体的な問い</text></svg>

