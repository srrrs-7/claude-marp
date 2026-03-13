---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "偶然生まれた標準"
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
# 偶然生まれた標準

- インターネットを動かす「仮決め」たちの物語
- 
- 完璧な設計より「とりあえず動く」が世界を変えた


---

<!-- _class: lead -->
# 規格の誕生秘話

- なぜその番号？ なぜその配列？ — 答えは「たまたま」


---

# ポート80番はなぜ80か

> *1991年の恣意的な番号選択が毎秒数十億リクエストを処理する世界標準になった*

- - Tim Berners-Lee が1991年にほぼ恣意的に選択
- - 当時の空きポートの中から「覚えやすい」番号を採用
- - IANA（番号割り当て機関）への登録は先着順
- - 今や毎秒数十億のリクエストがポート80/443を通過
- 
- <svg viewBox='0 0 800 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='200' fill='none'/><rect x='30' y='70' width='100' height='50' rx='8' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='80' y='100' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>Port 21</text><text x='80' y='135' text-anchor='middle' fill='#aaa' font-size='10'>FTP (1971)</text><rect x='160' y='70' width='100' height='50' rx='8' fill='#e67e22' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='210' y='100' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>Port 22</text><text x='210' y='135' text-anchor='middle' fill='#aaa' font-size='10'>SSH (1995)</text><rect x='290' y='70' width='100' height='50' rx='8' fill='#f1c40f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='340' y='100' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>Port 25</text><text x='340' y='135' text-anchor='middle' fill='#aaa' font-size='10'>SMTP (1982)</text><rect x='420' y='40' width='120' height='80' rx='8' fill='#2ecc71' style='filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))'/><text x='480' y='75' text-anchor='middle' fill='white' font-size='16' font-weight='bold'>Port 80</text><text x='480' y='100' text-anchor='middle' fill='#d5f5e3' font-size='11'>HTTP (1991)</text><text x='480' y='135' text-anchor='middle' fill='#2ecc71' font-size='9'>「たまたま空いていた」</text><rect x='570' y='70' width='100' height='50' rx='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='620' y='100' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>Port 443</text><text x='620' y='135' text-anchor='middle' fill='#aaa' font-size='10'>HTTPS (1994)</text><rect x='700' y='70' width='80' height='50' rx='8' fill='#9b59b6' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='740' y='100' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>3306</text><text x='740' y='135' text-anchor='middle' fill='#aaa' font-size='10'>MySQL</text></svg>


---

# QWERTY配列の呪縛

> *技術的に劣るQWERTYが150年間生き残るネットワーク外部性の典型事例*

- - 1873年: タイプライターの機械的ジャム防止のために設計
- - よく使う文字ペアを離すことで打鍵速度を制限
- - 1936年: Dvorak配列が特許取得 — 科学的に高速
- - しかしDvorakは普及せず: **ネットワーク外部性の勝利**
- - 150年後、物理的制約が消えても配列は不変
- 
- <svg viewBox='0 0 800 180' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='180' fill='none'/><rect x='50' y='20' width='300' height='140' rx='10' fill='#1a1a2e' stroke='#e74c3c' stroke-width='2'/><text x='200' y='48' text-anchor='middle' fill='#e74c3c' font-size='14' font-weight='bold'>QWERTY (1873)</text><text x='200' y='75' text-anchor='middle' fill='#fff' font-size='13' font-family='monospace'>Q W E R T Y U I O P</text><text x='200' y='100' text-anchor='middle' fill='#aaa' font-size='10'>機械的制約で設計</text><text x='200' y='120' text-anchor='middle' fill='#aaa' font-size='10'>普及率: 99%+</text><text x='200' y='140' text-anchor='middle' fill='#e74c3c' font-size='10'>ロックイン状態</text><rect x='450' y='20' width='300' height='140' rx='10' fill='#1a1a2e' stroke='#2ecc71' stroke-width='2'/><text x='600' y='48' text-anchor='middle' fill='#2ecc71' font-size='14' font-weight='bold'>Dvorak (1936)</text><text x='600' y='75' text-anchor='middle' fill='#fff' font-size='13' font-family='monospace'>. , P Y F G C R L /</text><text x='600' y='100' text-anchor='middle' fill='#aaa' font-size='10'>科学的に最適化</text><text x='600' y='120' text-anchor='middle' fill='#aaa' font-size='10'>普及率: &lt;1%</text><text x='600' y='140' text-anchor='middle' fill='#2ecc71' font-size='10'>技術的に優秀でも敗北</text></svg>


---

# UNIXエポックは1970年1月1日

> *PDP-7の都合で決まった日付が55年後に2038年問題という世界的技術負債に化ける*

- - PDP-7/11の32ビット整数で扱いやすい日付として選択
- - 1970年1月1日00:00:00 UTC = タイムスタンプ0
- - **2038年1月19日問題**: 32ビット符号付き整数がオーバーフロー
- - 「仮決め」の55年後に世界的な技術的負債が発覚
- 
- <svg viewBox='0 0 800 180' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='180' fill='none'/><line x1='80' y1='90' x2='750' y2='90' stroke='#555' stroke-width='2'/><circle cx='150' cy='90' r='8' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='75' text-anchor='middle' fill='#3498db' font-size='11' font-weight='bold'>1970</text><text x='150' y='115' text-anchor='middle' fill='#aaa' font-size='9'>Epoch = 0</text><circle cx='300' cy='90' r='6' fill='#f39c12'/><text x='300' y='75' text-anchor='middle' fill='#f39c12' font-size='10'>2000</text><text x='300' y='115' text-anchor='middle' fill='#aaa' font-size='9'>Y2K問題</text><circle cx='450' cy='90' r='6' fill='#2ecc71'/><text x='450' y='75' text-anchor='middle' fill='#2ecc71' font-size='10'>2026</text><text x='450' y='115' text-anchor='middle' fill='#aaa' font-size='9'>現在</text><circle cx='620' cy='90' r='10' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='620' y='75' text-anchor='middle' fill='#e74c3c' font-size='11' font-weight='bold'>2038</text><text x='620' y='115' text-anchor='middle' fill='#e74c3c' font-size='9'>32bit overflow!</text><text x='620' y='135' text-anchor='middle' fill='#e74c3c' font-size='9'>2,147,483,647秒</text><text x='400' y='165' text-anchor='middle' fill='#999' font-size='11'>PDP-7の都合で決まった日付が全世界のシステムの基準に</text></svg>


---

<!-- _class: lead -->
# プロトコルの偶然

- RFC、エイプリルフール、そしてナプキンの設計図


---

# HTTPステータスコード 418 — I'm a teapot

> *エイプリルフールのジョークが削除提案を跳ね返しGoogleも実装した永続仕様になった*

- - 1998年エイプリルフール: RFC 2324「HTCPCP」
- - 「Hyper Text Coffee Pot Control Protocol」のジョーク仕様
- - ステータス 418: 「I'm a teapot（私はティーポットです）」
- - 2017年: 削除提案 → コミュニティが猛反対 → 存続決定
- - Google, Microsoft も418をイースターエッグとして実装
- 
- <svg viewBox='0 0 800 160' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='160' fill='none'/><rect x='30' y='30' width='110' height='45' rx='6' fill='#27ae60'/><text x='85' y='57' text-anchor='middle' fill='white' font-size='11'>200 OK</text><rect x='160' y='30' width='140' height='45' rx='6' fill='#f39c12'/><text x='230' y='57' text-anchor='middle' fill='white' font-size='11'>301 Redirect</text><rect x='320' y='30' width='140' height='45' rx='6' fill='#e74c3c'/><text x='390' y='57' text-anchor='middle' fill='white' font-size='11'>404 Not Found</text><rect x='480' y='10' width='160' height='70' rx='8' fill='#9b59b6' style='filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.5))'/><text x='560' y='40' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>418</text><text x='560' y='60' text-anchor='middle' fill='#e8daef' font-size='10'>I'm a teapot</text><rect x='660' y='30' width='110' height='45' rx='6' fill='#e74c3c'/><text x='715' y='57' text-anchor='middle' fill='white' font-size='11'>500 Error</text><text x='400' y='120' text-anchor='middle' fill='#999' font-size='11'>エイプリルフールのジョークが正式な仕様として永続化</text><text x='400' y='140' text-anchor='middle' fill='#9b59b6' font-size='10'>RFC 2324 — 「削除しない」というコミュニティの意思</text></svg>


---

# UTF-8 — ナプキンに描かれた天才設計

> *1992年にレストランで20分設計した可変長方式がWeb全体98%の文字コード標準になった*

- <svg viewBox='0 0 800 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='200' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#f9a825' font-size='14' font-weight='bold'>UTF-8 可変長エンコーディング</text><rect x='40' y='50' width='340' height='50' rx='8' fill='#2d5016'/><text x='60' y='72' fill='#4ecdc4' font-size='12' font-weight='bold'>ASCII文字 (U+0000〜U+007F)</text><text x='60' y='91' fill='#fff' font-size='11' font-family='monospace'>0xxxxxxx  →  1バイト (128文字)</text><rect x='40' y='110' width='340' height='50' rx='8' fill='#1b4332'/><text x='60' y='130' fill='#a9d6e5' font-size='12' font-weight='bold'>日本語・漢字 (U+0800〜U+FFFF)</text><text x='60' y='149' fill='#fff' font-size='11' font-family='monospace'>1110xxxx 10xxxxxx 10xxxxxx  →  3バイト</text><rect x='420' y='50' width='340' height='110' rx='8' fill='#16213e' stroke='#e91e63' stroke-width='2'/><text x='590' y='75' text-anchor='middle' fill='#e91e63' font-size='13' font-weight='bold'>天才的な設計の核心</text><text x='590' y='100' text-anchor='middle' fill='#aaa' font-size='10'>1バイト目で長さがわかる</text><text x='590' y='118' text-anchor='middle' fill='#aaa' font-size='10'>ASCIIと完全互換</text><text x='590' y='136' text-anchor='middle' fill='#aaa' font-size='10'>同期復帰が容易</text><text x='590' y='154' text-anchor='middle' fill='#f9a825' font-size='10'>1992年、ナプキンに20分で設計</text><text x='400' y='185' text-anchor='middle' fill='#4ecdc4' font-size='11'>Web全体の98%が採用 — 文字コード戦争を終わらせた</text></svg>
- - 1992年: Ken Thompson と Rob Pike がレストランで設計
- - 要件: ASCIIとの完全な後方互換性を保つUnicode符号化
- - ナプキンに書かれた可変長エンコーディング方式
- - ASCII文字は1バイト、日本語は3バイト、絵文字は4バイト
- - 2026年現在、Web上のページの **98%** がUTF-8
- - 「偶然の天才設計」が世界の文字コード問題を解決


---

# BGPの「善意ベース」設計

> *認証ゼロの「信頼前提」設計がインターネット全体のルーティングを今日も支えている*

- - BGP: インターネットのAS（自律システム）間ルーティング
- - 1989年設計時の前提: 「参加者は信頼できる研究者のみ」
- - 経路情報の検証メカニズムがほぼ皆無
- - 結果: BGPハイジャックによる大規模障害が頻発
- 
- <svg viewBox='0 0 800 220' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='220' fill='none'/><circle cx='400' cy='110' r='40' fill='#2c3e50' stroke='#3498db' stroke-width='2'/><text x='400' y='115' text-anchor='middle' fill='#3498db' font-size='12' font-weight='bold'>Internet</text><circle cx='150' cy='60' r='30' fill='#27ae60' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='65' text-anchor='middle' fill='white' font-size='10'>AS-A</text><circle cx='650' cy='60' r='30' fill='#27ae60' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='650' y='65' text-anchor='middle' fill='white' font-size='10'>AS-B</text><circle cx='150' cy='170' r='30' fill='#27ae60' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='175' text-anchor='middle' fill='white' font-size='10'>AS-C</text><circle cx='650' cy='170' r='30' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='650' y='175' text-anchor='middle' fill='white' font-size='10'>AS-X</text><line x1='180' y1='72' x2='365' y2='98' stroke='#27ae60' stroke-width='2'/><line x1='620' y1='72' x2='435' y2='98' stroke='#27ae60' stroke-width='2'/><line x1='180' y1='162' x2='365' y2='120' stroke='#27ae60' stroke-width='2'/><line x1='620' y1='162' x2='435' y2='120' stroke='#e74c3c' stroke-width='3' stroke-dasharray='5,3'/><text x='550' y='155' fill='#e74c3c' font-size='10'>偽経路広告</text><text x='400' y='210' text-anchor='middle' fill='#999' font-size='11'>認証なし — 「善意」が前提の設計が世界のインフラを支える</text></svg>


---

<!-- _class: lead -->
# 標準化の力学

- 仮決めはなぜ永続し、最適解はなぜ敗北するのか


---

# なぜ仮決めが永続するか

- - **ネットワーク外部性**: 使う人が多いほど価値が増す
- - **移行コスト**: 全員が同時に変更しなければならない
- - **互換性の罠**: 後方互換を維持するほど変更が困難に
- 
- <svg viewBox='0 0 800 220' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width='800' height='220' fill='none'/><circle cx='400' cy='110' r='90' fill='none' stroke='#e74c3c' stroke-width='2'/><text x='400' y='70' text-anchor='middle' fill='#e74c3c' font-size='13' font-weight='bold'>ロックインの悪循環</text><rect x='200' y='25' width='140' height='40' rx='6' fill='#3498db' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='270' y='50' text-anchor='middle' fill='white' font-size='11'>利用者増加</text><rect x='520' y='45' width='140' height='40' rx='6' fill='#f39c12' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='590' y='70' text-anchor='middle' fill='white' font-size='11'>移行コスト上昇</text><rect x='520' y='145' width='140' height='40' rx='6' fill='#e74c3c' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='590' y='170' text-anchor='middle' fill='white' font-size='11'>互換性要件増大</text><rect x='200' y='155' width='140' height='40' rx='6' fill='#9b59b6' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='270' y='180' text-anchor='middle' fill='white' font-size='11'>変更不能に</text><polygon points='340,50 350,45 350,55' fill='#ecf0f1'/><line x1='340' y1='50' x2='520' y2='60' stroke='#ecf0f1' stroke-width='1.5'/><polygon points='590,85 585,95 595,95' fill='#ecf0f1'/><line x1='590' y1='85' x2='590' y2='145' stroke='#ecf0f1' stroke-width='1.5'/><polygon points='520,170 510,165 510,175' fill='#ecf0f1'/><line x1='520' y1='170' x2='340' y2='175' stroke='#ecf0f1' stroke-width='1.5'/><polygon points='270,155 265,145 275,145' fill='#ecf0f1'/><line x1='270' y1='155' x2='270' y2='65' stroke='#ecf0f1' stroke-width='1.5'/></svg>


---

# IETF「ラフコンセンサスと動くコード」

> *完璧な仕様より動く実装を優先する哲学がTCP/IP・HTTP・DNSの成功を支えた*

- - Internet Engineering Task Force の基本哲学
- - 「We reject kings, presidents, and voting.」
- - 「We believe in rough consensus and running code.」
- - 完璧な仕様書より、動く実装が優先される
- - 「ハミング」で合意を測定（挙手ではなく声の大きさ）
- - この哲学がTCP/IP、HTTP、DNSなどの成功を支えた


---

# 現在進行形の偶然

> *JSON・REST・WebSocketはすべて意図せず標準化された。OpenAI API形式も同じ道を歩む*

- <svg viewBox='0 0 800 180' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='180' fill='#1a1a2e' rx='12'/><text x='400' y='25' text-anchor='middle' fill='#f9a825' font-size='13' font-weight='bold'>偶然生まれた標準のタイムライン</text><line x1='60' y1='75' x2='760' y2='75' stroke='#444' stroke-width='2'/><circle cx='120' cy='75' r='8' fill='#e91e63'/><text x='120' y='55' text-anchor='middle' fill='#e91e63' font-size='11' font-weight='bold'>2000</text><text x='120' y='100' text-anchor='middle' fill='#fff' font-size='10'>REST</text><text x='120' y='115' text-anchor='middle' fill='#aaa' font-size='9'>博士論文が</text><text x='120' y='128' text-anchor='middle' fill='#aaa' font-size='9'>標準に</text><circle cx='280' cy='75' r='8' fill='#f9a825'/><text x='280' y='55' text-anchor='middle' fill='#f9a825' font-size='11' font-weight='bold'>2001</text><text x='280' y='100' text-anchor='middle' fill='#fff' font-size='10'>JSON</text><text x='280' y='115' text-anchor='middle' fill='#aaa' font-size='9'>既存構文を</text><text x='280' y='128' text-anchor='middle' fill='#aaa' font-size='9'>「発見」</text><circle cx='480' cy='75' r='8' fill='#4ecdc4'/><text x='480' y='55' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>2011</text><text x='480' y='100' text-anchor='middle' fill='#fff' font-size='10'>WebSocket</text><text x='480' y='115' text-anchor='middle' fill='#aaa' font-size='9'>HTTP限界を</text><text x='480' y='128' text-anchor='middle' fill='#aaa' font-size='9'>後付け回避</text><circle cx='660' cy='75' r='10' fill='#a78bfa'/><text x='660' y='55' text-anchor='middle' fill='#a78bfa' font-size='11' font-weight='bold'>2022〜</text><text x='660' y='100' text-anchor='middle' fill='#fff' font-size='10'>LLM API</text><text x='660' y='115' text-anchor='middle' fill='#aaa' font-size='9'>OpenAI形式が</text><text x='660' y='128' text-anchor='middle' fill='#aaa' font-size='9'>デファクトに</text><text x='400' y='165' text-anchor='middle' fill='#888' font-size='10'>すべて「意図しない標準化」— 設計より普及速度が勝った</text></svg>
- - **JSON** (2001): Douglas CrockfordがJavaScriptの既存構文を「発見」
-   - 新しい発明ではなく「既にあったもの」に名前を付けた
- - **REST** (2000): Roy Fieldingの博士論文から予想外に普及
-   - 本来は学術的な分析フレームワーク
- - **WebSocket** (2011): HTTPの限界を回避する後付け拡張
-   - 「本来やるべきでない方法」が標準に


---

# AIが生む新しい「偶然の標準」

> *最初に普及したOpenAI形式がAnthropicやGoogleも追随する業界デファクトに定着した*

- <svg viewBox='0 0 800 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='200' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#f9a825' font-size='14' font-weight='bold'>OpenAI Chat API — 意図せず業界標準に</text><rect x='40' y='50' width='340' height='115' rx='10' fill='#16213e' stroke='#e91e63' stroke-width='2'/><text x='210' y='73' text-anchor='middle' fill='#e91e63' font-size='12' font-weight='bold'>OpenAI (2022年〜)</text><text x='60' y='95' fill='#fff' font-size='10' font-family='monospace'>[{role: user,</text><text x='60' y='113' fill='#fff' font-size='10' font-family='monospace'>  content: 質問}]</text><text x='210' y='145' text-anchor='middle' fill='#aaa' font-size='10'>最初に普及したAPIフォーマット</text><polygon points='388,108 418,103 418,113' fill='#f9a825'/><line x1='380' y1='108' x2='418' y2='108' stroke='#f9a825' stroke-width='2'/><rect x='430' y='50' width='330' height='115' rx='10' fill='#16213e' stroke='#4ecdc4' stroke-width='2'/><text x='595' y='73' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>互換API採用 (2023-26)</text><text x='450' y='95' fill='#aaa' font-size='11'>Anthropic Claude API</text><text x='450' y='113' fill='#aaa' font-size='11'>Google Gemini API</text><text x='450' y='131' fill='#aaa' font-size='11'>Mistral / Ollama / LM Studio</text><text x='595' y='152' text-anchor='middle' fill='#f9a825' font-size='10'>全社が互換フォーマット採用</text><text x='400' y='185' text-anchor='middle' fill='#ccc' font-size='10'>MCP (Model Context Protocol) — 次の偶然の標準候補</text></svg>
- - OpenAIのChat Completions APIフォーマットがデファクトスタンダード化
- - `{role: 'user', content: '...'}` — 意図せず業界標準に
- - Anthropic、Google、Mistralも互換フォーマットを提供
- - 「最初に普及したAPIが標準になる」パターンの再現
- - MCP (Model Context Protocol) — 次の「偶然の標準」候補


---

<!-- _class: lead -->
# まとめ

- 完璧な設計より「とりあえず動く」が世界を変える
- 
- **今日の仮決めが明日の地盤になる**
- 
- 標準とは「最良の選択」ではなく
- 「最初にみんなが使い始めたもの」


---

# 参考文献（1/2）

- - **RFCs & Standards:**
-   - [RFC 2324 — HTCPCP (I'm a teapot)](https://www.rfc-editor.org/rfc/rfc2324)
-   - [RFC 2616 — HTTP/1.1](https://www.rfc-editor.org/rfc/rfc2616)
-   - [The Tao of IETF (IETF Philosophy)](https://www.ietf.org/about/participate/tao/)
- - **Books:**


---

# 参考文献（2/2）

-   - ["The Design of Everyday Things" (Don Norman)](https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/)
-   - ["Inventing the Internet" (Janet Abbate)](https://mitpress.mit.edu/books/inventing-internet)
- - **Articles:**
-   - ["The History of UTF-8" (Rob Pike)](https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt)
-   - ["BGP Security: No Quick Fix" (APNIC)](https://blog.apnic.net/)

