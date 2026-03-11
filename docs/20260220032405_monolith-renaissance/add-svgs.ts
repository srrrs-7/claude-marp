import { readFileSync, writeFileSync } from "node:fs";

const path =
	"/workspace/main/docs/20260220032405_monolith-renaissance/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const slides = data.slides;

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const GRAY = "#aaaaaa";

function svgWrap(inner: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">${inner}</svg>`;
}

// [3] マイクロサービスが約束したもの — promises vs reality
const svgPromises = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">マイクロサービスが約束したもの</text>
<rect x="40" y="60" width="330" height="300" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="205" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">約束されたメリット</text>
<text x="205" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">独立デプロイ</text>
<text x="205" y="148" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">スケールの自由</text>
<text x="205" y="176" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">技術の多様性</text>
<text x="205" y="204" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">障害分離</text>
<text x="205" y="232" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">チームの自律性</text>
<text x="205" y="270" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Netflix / Amazon が証明</text>
<text x="205" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">業界が一斉に採用</text>
<rect x="430" y="60" width="330" height="300" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="595" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">現実のコスト</text>
<text x="595" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">運用負荷の爆発</text>
<text x="595" y="148" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">デバッグ地獄</text>
<text x="595" y="176" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">高いインフラコスト</text>
<text x="595" y="204" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">テストの複雑化</text>
<text x="595" y="232" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ネットワークレイテンシ</text>
<text x="595" y="270" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">2〜3人チームには有害</text>
<text x="595" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">分散モノリスの罠</text>
`);

// [5] なぜ全員が採用したのか — adoption hype
const svgAdoptionHype = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">マイクロサービス採用の連鎖反応</text>
<rect x="300" y="55" width="200" height="60" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="400" y="82" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">FAANG の成功事例</text>
<text x="400" y="103" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Netflix / Amazon / Uber</text>
<line x1="400" y1="115" x2="400" y2="145" stroke="${ACC1}" stroke-width="1.5"/>
<polygon points="395,145 400,158 405,145" fill="${ACC1}"/>
<rect x="270" y="158" width="260" height="50" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="400" y="183" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「成功企業がやっている = 正しい」</text>
<text x="400" y="200" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">コンファメーションバイアス</text>
<line x1="400" y1="208" x2="220" y2="248" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="400" y1="208" x2="580" y2="248" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<rect x="80" y="248" width="270" height="55" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="215" y="273" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">カンファレンストレンド</text>
<text x="215" y="293" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">KubeCon / MicroXchg 急増</text>
<rect x="450" y="248" width="270" height="55" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="585" y="273" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">採用市場の需要</text>
<text x="585" y="293" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">マイクロサービス経験必須</text>
<line x1="215" y1="303" x2="380" y2="338" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="585" y1="303" x2="420" y2="338" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<rect x="260" y="338" width="280" height="45" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="400" y="362" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">業界全体が一斉採用</text>
<text x="400" y="378" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">規模・成熟度を問わず</text>
`);

// [6] 分散コンピューティングの8つの誤謬 — fallacies grid
const svgFallacies = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">分散コンピューティングの誤謬 (Peter Deutsch, 1994)</text>
<rect x="30" y="60" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="207" y="88" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬1: ネットワークは信頼できる</text>
<text x="207" y="115" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">パケットロス・タイムアウト常に発生</text>
<rect x="415" y="60" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="592" y="88" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬2: レイテンシはゼロ</text>
<text x="592" y="115" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">ローカル関数呼び出しの1000倍コスト</text>
<rect x="30" y="155" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="207" y="183" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬3: 帯域幅は無限大</text>
<text x="207" y="210" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">シリアライズオーバーヘッド無視不可</text>
<rect x="415" y="155" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="592" y="183" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬4: ネットワークは安全</text>
<text x="592" y="210" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">サービス間通信も攻撃対象</text>
<rect x="30" y="250" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="207" y="278" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬5: トポロジーは変わらない</text>
<text x="207" y="305" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Kubernetes Pod は常に変動する</text>
<rect x="415" y="250" width="355" height="75" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="592" y="278" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">誤謬6: 管理者は1人</text>
<text x="592" y="305" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">分散システムは複数チームにまたがる</text>
<rect x="200" y="345" width="400" height="40" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="370" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">30年前の警告がマイクロサービス時代に再び表面化</text>
`);

// [7] マイクロサービスの現実コスト — cost breakdown
const svgRealCosts = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">マイクロサービス採用の隠れたコスト</text>
<rect x="40" y="60" width="215" height="290" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="147" y="88" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">運用コスト</text>
<rect x="55" y="100" width="185" height="25" rx="4" fill="#2a0a0a"/>
<text x="147" y="117" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">サービスディスカバリ</text>
<rect x="55" y="133" width="185" height="25" rx="4" fill="#2a0a0a"/>
<text x="147" y="150" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">サーキットブレーカー</text>
<rect x="55" y="166" width="185" height="25" rx="4" fill="#2a0a0a"/>
<text x="147" y="183" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">分散トレーシング</text>
<rect x="55" y="199" width="185" height="25" rx="4" fill="#2a0a0a"/>
<text x="147" y="216" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">サービスメッシュ</text>
<text x="147" y="295" fill="${ACC2}" font-size="20" text-anchor="middle" font-family="sans-serif">高</text>
<text x="147" y="320" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">習熟に6〜12ヶ月</text>
<rect x="293" y="60" width="215" height="290" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="88" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">インフラコスト</text>
<rect x="308" y="100" width="185" height="25" rx="4" fill="#2a1a0a"/>
<text x="400" y="117" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">コンテナオーケストレーション</text>
<rect x="308" y="133" width="185" height="25" rx="4" fill="#2a1a0a"/>
<text x="400" y="150" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ロードバランサー × N</text>
<rect x="308" y="166" width="185" height="25" rx="4" fill="#2a1a0a"/>
<text x="400" y="183" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ログ集約 (ELK stack)</text>
<rect x="308" y="199" width="185" height="25" rx="4" fill="#2a1a0a"/>
<text x="400" y="216" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">監視ダッシュボード × N</text>
<text x="400" y="295" fill="${ACC1}" font-size="20" text-anchor="middle" font-family="sans-serif">中〜高</text>
<text x="400" y="320" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Amazon: 90%削減事例も</text>
<rect x="546" y="60" width="215" height="290" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="653" y="88" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">開発コスト</text>
<rect x="561" y="100" width="185" height="25" rx="4" fill="#1a1a2a"/>
<text x="653" y="117" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">サービス間API設計</text>
<rect x="561" y="133" width="185" height="25" rx="4" fill="#1a1a2a"/>
<text x="653" y="150" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">分散トランザクション</text>
<rect x="561" y="166" width="185" height="25" rx="4" fill="#1a1a2a"/>
<text x="653" y="183" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">統合テスト環境再現</text>
<rect x="561" y="199" width="185" height="25" rx="4" fill="#1a1a2a"/>
<text x="653" y="216" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ローカル起動の複雑さ</text>
<text x="653" y="295" fill="${GRAY}" font-size="20" text-anchor="middle" font-family="sans-serif">中</text>
<text x="653" y="320" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">DX低下が生産性に直撃</text>
`);

// [8] 過剰エンジニアリングの罠 — over-engineering pitfall
const svgOverEngineering = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">組織規模 vs アーキテクチャ適切性</text>
<line x1="70" y1="340" x2="760" y2="340" stroke="${GRAY}" stroke-width="1.5"/>
<line x1="70" y1="340" x2="70" y2="60" stroke="${GRAY}" stroke-width="1.5"/>
<text x="415" y="380" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">チームサイズ（エンジニア数）</text>
<text x="30" y="200" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif" transform="rotate(-90,30,200)">生産性</text>
<text x="150" y="358" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">1〜10人</text>
<text x="350" y="358" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">10〜50人</text>
<text x="550" y="358" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">50〜100人</text>
<text x="710" y="358" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">100+人</text>
<polyline points="70,200 150,160 350,140 550,130 710,120" stroke="#4caf50" stroke-width="2.5" fill="none"/>
<text x="650" y="115" fill="#4caf50" font-size="11" font-family="sans-serif">モジュラーモノリス</text>
<polyline points="70,280 150,260 350,200 550,160 710,120" stroke="${ACC1}" stroke-width="2.5" fill="none" stroke-dasharray="8,4"/>
<text x="650" y="140" fill="${ACC1}" font-size="11" font-family="sans-serif">マイクロサービス</text>
<rect x="75" y="220" width="200" height="50" rx="6" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="175" y="243" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">スタートアップでの採用</text>
<text x="175" y="263" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">オーバーエンジニアリング</text>
<line x1="175" y1="270" x2="175" y2="300" stroke="${ACC2}" stroke-width="1" stroke-dasharray="4,3"/>
<text x="175" y="315" fill="${ACC2}" font-size="10" text-anchor="middle" font-family="sans-serif">PMF前に複雑さの罠</text>
<line x1="550" y1="130" x2="550" y2="340" stroke="${GRAY}" stroke-width="0.8" stroke-dasharray="4,3"/>
<text x="560" y="100" fill="${GRAY}" font-size="10" font-family="sans-serif">分岐点</text>
`);

// [10] Amazon Prime Video — cost savings
const svgAmazonCost = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">Amazon Prime Video: マイクロサービス → モノリスへ (2023)</text>
<rect x="60" y="70" width="300" height="250" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="210" y="100" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">Before: 分散アーキテクチャ</text>
<text x="210" y="135" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Step Functions ステート管理</text>
<text x="210" y="160" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">S3 経由データ転送</text>
<text x="210" y="185" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">多数のLambda関数</text>
<text x="210" y="220" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">問題: 大量データのサービス間</text>
<text x="210" y="238" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">転送コストが支配的に</text>
<text x="210" y="290" fill="${ACC2}" font-size="28" text-anchor="middle" font-family="sans-serif">高コスト</text>
<polygon points="375,185 395,185 395,175 425,195 395,215 395,205 375,205" fill="${ACC1}"/>
<rect x="440" y="70" width="300" height="250" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="590" y="100" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">After: モノリシック化</text>
<text x="590" y="135" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">単一プロセスへ統合</text>
<text x="590" y="160" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">インプロセス通信</text>
<text x="590" y="185" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">スケーラビリティ維持</text>
<text x="590" y="220" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">スケーラビリティも</text>
<text x="590" y="238" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">維持しながら達成</text>
<text x="590" y="285" fill="${ACC1}" font-size="28" text-anchor="middle" font-weight="bold" font-family="sans-serif">90%削減</text>
<rect x="60" y="345" width="680" height="35" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="1"/>
<text x="400" y="367" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">Amazonが自らAWSの「マイクロサービス推奨」に反証した衝撃的な事例</text>
`);

// [11] Segment 撤退 — consolidation result
const svgSegment = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">Segment の撤退 (2020): 130+ サービス → 1 モノリス</text>
<rect x="40" y="60" width="320" height="290" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="200" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">130+ マイクロサービス時代</text>
<text x="200" y="125" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">循環依存の発生</text>
<text x="200" y="150" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">カスケード障害</text>
<text x="200" y="175" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">デプロイ調整コスト</text>
<text x="200" y="200" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">エンジニア認知負荷MAX</text>
<text x="200" y="240" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">問題が臨界点に達した</text>
<polygon points="370,195 400,195 400,185 430,200 400,215 400,205 370,215" fill="${ACC1}"/>
<rect x="440" y="60" width="320" height="290" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="600" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">Centrifuge (統合後)</text>
<text x="600" y="125" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">レイテンシ改善</text>
<text x="600" y="150" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">障害率低下</text>
<text x="600" y="175" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">デプロイ簡素化</text>
<text x="600" y="200" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">認知負荷の大幅削減</text>
<text x="600" y="240" fill="${ACC1}" font-size="11" text-anchor="middle" font-family="sans-serif">"1 boring monolith"</text>
<text x="600" y="260" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">退屈なモノリスに価値あり</text>
`);

// [13] DHH とマジェスティックモノリス — philosophy
const svgDHH = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">The Majestic Monolith — DHHの哲学</text>
<rect x="40" y="60" width="720" height="90" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="92" fill="${ACC1}" font-size="14" text-anchor="middle" font-style="italic" font-family="sans-serif">"マイクロサービスは複雑さを</text>
<text x="400" y="118" fill="${ACC1}" font-size="14" text-anchor="middle" font-style="italic" font-family="sans-serif">組織的に正当化するための口実だ"</text>
<text x="740" y="145" fill="${GRAY}" font-size="11" text-anchor="end" font-family="sans-serif">— DHH (Ruby on Rails 作者)</text>
<rect x="40" y="175" width="340" height="180" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="210" y="205" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">Basecamp / Hey の実績</text>
<text x="210" y="240" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">数百万ユーザー対応</text>
<text x="210" y="265" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">少数精鋭チーム</text>
<text x="210" y="290" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">単一 Rails アプリ</text>
<text x="210" y="335" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">シンプルさが最大の武器</text>
<rect x="420" y="175" width="340" height="180" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="590" y="205" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">コンウェイの法則的解釈</text>
<text x="590" y="240" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">組織問題を</text>
<text x="590" y="258" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">アーキテクチャに転嫁</text>
<text x="590" y="290" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">小さい組織 =</text>
<text x="590" y="310" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">小さいアーキテクチャ</text>
<text x="590" y="335" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">それで十分</text>
`);

// [14] Stack Overflow の実績 — scale facts
const svgStackOverflow = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">Stack Overflow: モノリスで月14億PVを処理</text>
<rect x="40" y="60" width="340" height="300" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="210" y="90" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">インフラ構成</text>
<text x="210" y="130" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ASP.NET モノリス</text>
<text x="210" y="158" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Webサーバー × 9台</text>
<text x="210" y="186" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">SQL Server × 1台 (主DB)</text>
<text x="210" y="214" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Redis キャッシュ</text>
<text x="210" y="242" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Cloudflare CDN</text>
<text x="210" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">サービス分割なし</text>
<text x="210" y="312" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">数十名のエンジニアで運用</text>
<rect x="420" y="60" width="340" height="300" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="590" y="90" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">処理規模</text>
<text x="590" y="135" fill="${ACC1}" font-size="24" text-anchor="middle" font-weight="bold" font-family="sans-serif">14億</text>
<text x="590" y="158" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">月間ページビュー</text>
<text x="590" y="200" fill="${ACC1}" font-size="18" text-anchor="middle" font-weight="bold" font-family="sans-serif">世界最大級</text>
<text x="590" y="223" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">開発者コミュニティ</text>
<rect x="440" y="258" width="300" height="60" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="1"/>
<text x="590" y="283" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">"シンプルさは複雑さに勝る</text>
<text x="590" y="303" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">— もし機能するなら"</text>
`);

// [16] 「モノリス」という言葉の誤解 — definition clarification
const svgDefinition = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">「モノリス」の正確な定義</text>
<rect x="40" y="60" width="335" height="300" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="207" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">誤解 (多くの人のイメージ)</text>
<rect x="60" y="105" width="295" height="200" rx="8" fill="#2a0a0a"/>
<text x="207" y="140" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">混沌としたスパゲッティコード</text>
<text x="207" y="165" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">全てが密結合</text>
<text x="207" y="185" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">変更が怖い巨大な塊</text>
<text x="207" y="205" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">Big Ball of Mud</text>
<text x="207" y="225" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">時代遅れのアンチパターン</text>
<text x="207" y="310" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">設計の失敗 ≠ デプロイ形態</text>
<rect x="425" y="60" width="335" height="300" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="592" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">正確な定義</text>
<rect x="445" y="105" width="295" height="200" rx="8" fill="#1a2a1a"/>
<text x="592" y="140" fill="${ACC1}" font-size="11" text-anchor="middle" font-family="sans-serif">単一プロセスとして</text>
<text x="592" y="160" fill="${ACC1}" font-size="11" text-anchor="middle" font-family="sans-serif">デプロイされるシステム</text>
<text x="592" y="195" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">デプロイ境界 ≠ コード境界</text>
<text x="592" y="220" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">内部は整理されていていい</text>
<text x="592" y="245" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Modular Monolith が可能</text>
<text x="592" y="310" fill="${ACC1}" font-size="11" text-anchor="middle" font-family="sans-serif">デプロイ ≠ 設計の良し悪し</text>
`);

// [19] Bounded Context — DDD module mapping
const svgBoundedContext = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">DDD Bounded Context → モジュール境界</text>
<rect x="30" y="60" width="210" height="230" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="135" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">Billing</text>
<text x="135" y="115" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Public API:</text>
<text x="135" y="135" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">charge(orderId, amount)</text>
<line x1="50" y1="155" x2="220" y2="155" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="135" y="175" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">Internal (非公開):</text>
<text x="135" y="195" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">Invoice, PaymentGW</text>
<rect x="295" y="60" width="210" height="230" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="400" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">Orders</text>
<text x="400" y="115" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Public API:</text>
<text x="400" y="135" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">create(items), complete(id)</text>
<line x1="315" y1="155" x2="485" y2="155" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="400" y="175" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">Internal (非公開):</text>
<text x="400" y="195" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">OrderProcessor, Validator</text>
<rect x="560" y="60" width="210" height="230" rx="10" fill="${BOX}" stroke="#4fc3f7" stroke-width="2"/>
<text x="665" y="88" fill="#4fc3f7" font-size="13" text-anchor="middle" font-family="sans-serif">Inventory</text>
<text x="665" y="115" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">Public API:</text>
<text x="665" y="135" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">check(items), reserve(id)</text>
<line x1="580" y1="155" x2="750" y2="155" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="665" y="175" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">Internal (非公開):</text>
<text x="665" y="195" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">StockTracker, Warehouse</text>
<line x1="240" y1="175" x2="295" y2="175" stroke="${ACC1}" stroke-width="1.5" stroke-dasharray="5,3"/>
<polygon points="285,170 295,175 285,180" fill="${ACC1}"/>
<line x1="505" y1="175" x2="560" y2="175" stroke="${ACC2}" stroke-width="1.5" stroke-dasharray="5,3"/>
<polygon points="550,170 560,175 550,180" fill="${ACC2}"/>
<rect x="80" y="320" width="640" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="400" y="343" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">Public API のみを介して通信 — 内部実装は隠蔽</text>
<text x="400" y="365" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">将来のサービス分割に備えた境界設計。テーブルの直接共有禁止。</text>
`);

// [27] データ整合性 — transaction comparison
const svgTransactions = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">トランザクション: モノリス vs マイクロサービス</text>
<rect x="30" y="60" width="340" height="290" rx="10" fill="${BOX}" stroke="#4caf50" stroke-width="2"/>
<text x="200" y="88" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">モノリス: ローカルトランザクション</text>
<text x="200" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">BEGIN TRANSACTION</text>
<text x="200" y="143" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Order.create(items)</text>
<text x="200" y="166" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Inventory.reduce(items)</text>
<text x="200" y="189" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Billing.charge(amount)</text>
<text x="200" y="212" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">COMMIT</text>
<text x="200" y="250" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">ACID 保証</text>
<text x="200" y="270" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">即時ロールバック可能</text>
<text x="200" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">実装シンプル</text>
<rect x="430" y="60" width="340" height="290" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="600" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">マイクロサービス: Sagaパターン</text>
<text x="600" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">1. OrderSvc.create()</text>
<text x="600" y="143" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">2. InventorySvc.reserve()</text>
<text x="600" y="166" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">3. BillingSvc.charge()</text>
<text x="600" y="189" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">各ステップで補償Txが必要</text>
<text x="600" y="250" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">最終整合性のみ</text>
<text x="600" y="270" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">中間状態がユーザーに見える</text>
<text x="600" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">実装コスト高い</text>
`);

// [28] スケーリング戦略 — scaling comparison
const svgScaling = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">スケーリング戦略の比較</text>
<rect x="40" y="60" width="330" height="290" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1.5"/>
<text x="205" y="90" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">モノリス水平スケール</text>
<rect x="55" y="110" width="300" height="50" rx="6" fill="#16213e" stroke="${GRAY}" stroke-width="0.8"/>
<text x="205" y="142" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">アプリ全体 × 3 レプリカ</text>
<text x="205" y="188" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">シンプルだが非効率な部分も</text>
<text x="205" y="215" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">メリット: 設定シンプル</text>
<text x="205" y="240" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">プロファイリングが容易</text>
<text x="205" y="278" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">ボトルネック: 単一プロセスで計測</text>
<text x="205" y="300" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">原因を即特定できる</text>
<rect x="430" y="60" width="330" height="290" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1.5"/>
<text x="595" y="90" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">マイクロサービス選択的スケール</text>
<rect x="445" y="110" width="100" height="30" rx="4" fill="${ACC2}" opacity="0.6"/>
<text x="495" y="130" fill="${TXT}" font-size="10" text-anchor="middle" font-family="sans-serif">Video × 10</text>
<rect x="555" y="110" width="80" height="30" rx="4" fill="${BOX}" stroke="${GRAY}" stroke-width="0.5"/>
<text x="595" y="130" fill="${TXT}" font-size="10" text-anchor="middle" font-family="sans-serif">Auth × 1</text>
<rect x="645" y="110" width="80" height="30" rx="4" fill="${BOX}" stroke="${GRAY}" stroke-width="0.5"/>
<text x="685" y="130" fill="${TXT}" font-size="10" text-anchor="middle" font-family="sans-serif">API × 2</text>
<text x="595" y="188" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">効率的だが複雑</text>
<text x="595" y="215" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">デメリット: ボトルネック特定が先決</text>
<text x="595" y="240" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">90%のサービスはDB律速</text>
<text x="595" y="278" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">DB スケールは共通課題</text>
<text x="595" y="300" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">アーキテクチャで解決しない</text>
`);

// [29] 開発者体験の差 — DX comparison
const svgDXComparison = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">開発者体験 (DX) の差</text>
<rect x="30" y="55" width="180" height="30" rx="4" fill="${BOX}"/>
<text x="120" y="75" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">評価軸</text>
<rect x="220" y="55" width="240" height="30" rx="4" fill="${BOX}" stroke="#4caf50" stroke-width="1.5"/>
<text x="340" y="75" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">モノリス</text>
<rect x="475" y="55" width="295" height="30" rx="4" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="622" y="75" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">マイクロサービス</text>
<text x="120" y="120" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">ローカル起動</text>
<text x="340" y="120" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">./start で即起動</text>
<text x="622" y="120" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">docker-compose up (20分)</text>
<rect x="30" y="132" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="165" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">デバッグ</text>
<text x="340" y="165" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">IDEブレークポイント</text>
<text x="622" y="165" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">分散トレーシング + ログ</text>
<rect x="30" y="177" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="210" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">テスト実行</text>
<text x="340" y="210" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">rspec (数分)</text>
<text x="622" y="210" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">統合環境再現 (数時間)</text>
<rect x="30" y="222" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="255" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">Onboarding</text>
<text x="340" y="255" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">1リポジトリを理解</text>
<text x="622" y="255" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">10+リポジトリを把握</text>
<rect x="30" y="267" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="300" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">デプロイ</text>
<text x="340" y="300" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">1パイプライン</text>
<text x="622" y="300" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">N × パイプライン管理</text>
<rect x="30" y="330" width="740" height="55" rx="8" fill="${BOX}"/>
<text x="400" y="355" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">開発者生産性は目に見えないコスト</text>
<text x="400" y="375" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">アーキテクチャ決定時に軽視されがちだが、長期的に最大のコスト要因になる</text>
`);

// [30] コンウェイの法則 — org chart = architecture
const svgConway = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">コンウェイの法則: 組織 = アーキテクチャ</text>
<rect x="30" y="60" width="340" height="130" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="200" y="88" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">小チーム (2〜10人)</text>
<rect x="50" y="105" width="300" height="60" rx="6" fill="#1a2a1a" stroke="#4caf50" stroke-width="1"/>
<text x="200" y="138" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">1コードベース → モジュラーモノリスが自然</text>
<rect x="430" y="60" width="340" height="130" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="600" y="88" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">大組織 (100人+)</text>
<rect x="450" y="105" width="300" height="60" rx="6" fill="#2a1a1a" stroke="${ACC1}" stroke-width="1"/>
<text x="600" y="138" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">独立チーム → マイクロサービスが自然</text>
<rect x="150" y="220" width="500" height="80" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="248" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">逆コンウェイ戦略</text>
<text x="400" y="273" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">アーキテクチャを先に決め、組織をそれに合わせる</text>
<rect x="80" y="330" width="640" height="50" rx="8" fill="${BOX}"/>
<text x="400" y="353" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">マイクロサービス採用の本質 = 組織の複雑さをコードに転嫁</text>
<text x="400" y="373" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">チームが2〜3人なら、まずモノリスで十分</text>
`);

// [36] モノリス→マイクロへの正しいタイミング — signals
const svgSplitSignals = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">サービス分割の判断シグナル</text>
<rect x="40" y="60" width="330" height="290" rx="10" fill="${BOX}" stroke="#4caf50" stroke-width="2"/>
<text x="205" y="90" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">分割すべきシグナル</text>
<text x="205" y="128" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">デプロイ頻度が2倍以上乖離</text>
<text x="205" y="153" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">特定モジュールだけ頻繁にリリース</text>
<text x="205" y="188" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">コンフリクトが頻発するファイル</text>
<text x="205" y="213" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">同じファイルへの複数チームの競合</text>
<text x="205" y="248" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">スケール要件が桁違い</text>
<text x="205" y="273" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">動画処理だけCPU1000倍消費</text>
<text x="205" y="320" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">データで証明できる理由がある</text>
<rect x="430" y="60" width="330" height="290" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="595" y="90" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">危険なシグナル (分割しない)</text>
<text x="595" y="128" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「将来のスケールに備えて」</text>
<text x="595" y="153" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">YAGNI違反。今は不要</text>
<text x="595" y="188" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「みんなやってるから」</text>
<text x="595" y="213" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">流行への追従</text>
<text x="595" y="248" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「採用要件を満たすため」</text>
<text x="595" y="273" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">技術負債を正当化する口実</text>
<text x="595" y="320" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">MonolithFirst が基本戦略</text>
`);

// [41] 監視・可観測性 — observability comparison
const svgObservability = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">可観測性: モノリス vs マイクロサービス</text>
<rect x="30" y="60" width="340" height="290" rx="10" fill="${BOX}" stroke="#4caf50" stroke-width="2"/>
<text x="200" y="88" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">モノリスの可観測性</text>
<text x="200" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ログ: 1ストリームで全追跡可能</text>
<text x="200" y="148" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">メトリクス: 1ダッシュボード</text>
<text x="200" y="176" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">プロファイリング: pprof/py-spy</text>
<text x="200" y="204" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">エラー: 1プロジェクトで追跡</text>
<text x="200" y="260" fill="#4caf50" font-size="20" text-anchor="middle" font-family="sans-serif">シンプル</text>
<text x="200" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Prometheus + Grafana + Sentry</text>
<text x="200" y="310" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">3ツールで完結</text>
<rect x="430" y="60" width="340" height="290" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="600" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">マイクロサービスの可観測性</text>
<text x="600" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ログ: ELK Stack (集約必須)</text>
<text x="600" y="148" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">トレース: Jaeger/Zipkin</text>
<text x="600" y="176" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">メトリクス: N個のダッシュボード</text>
<text x="600" y="204" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">サービスメッシュ管理</text>
<text x="600" y="260" fill="${ACC2}" font-size="20" text-anchor="middle" font-family="sans-serif">複雑</text>
<text x="600" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">専任のSREチームが必要</text>
<text x="600" y="310" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">習熟に6〜12ヶ月</text>
`);

// [42] まとめ: 銀の弾丸はない — decision framework
const svgSummary = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">意思決定の3原則</text>
<rect x="40" y="60" width="720" height="80" rx="10" fill="${BOX}" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="90" fill="#4caf50" font-size="14" text-anchor="middle" font-family="sans-serif">原則1: チームサイズ・ドメイン成熟度・運用ノウハウで判断</text>
<text x="400" y="118" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">技術トレンドではなく、組織の現実に基づいて選択する</text>
<rect x="40" y="160" width="720" height="80" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="190" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">原則2: Modular Monolith で始め、必要が生じたら分割</text>
<text x="400" y="218" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">Amazon・Segment・Shopifyの事例: 複雑さへの回帰コストは高い</text>
<rect x="40" y="260" width="720" height="80" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="400" y="290" fill="${ACC2}" font-size="14" text-anchor="middle" font-family="sans-serif">原則3: アーキテクチャは手段、目的はビジネス価値の継続配信</text>
<text x="400" y="318" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">「正しいアーキテクチャ」は文脈によって変わる — 銀の弾丸はない</text>
`);

const svgMap: Record<number, string> = {
	3: svgPromises,
	5: svgAdoptionHype,
	6: svgFallacies,
	7: svgRealCosts,
	8: svgOverEngineering,
	10: svgAmazonCost,
	11: svgSegment,
	13: svgDHH,
	14: svgStackOverflow,
	16: svgDefinition,
	19: svgBoundedContext,
	27: svgTransactions,
	28: svgScaling,
	29: svgDXComparison,
	30: svgConway,
	36: svgSplitSignals,
	41: svgObservability,
	42: svgSummary,
};

let addedCount = 0;
for (const [idxStr, svg] of Object.entries(svgMap)) {
	const idx = Number(idxStr);
	const slide = slides[idx];
	if (!slide) continue;
	const hasExistingSvg = slide.content?.some(
		(c: string) => c.startsWith("<svg") || c.includes("](assets/"),
	);
	if (!hasExistingSvg) {
		slide.content = [svg, ...(slide.content || [])];
		addedCount++;
	}
}

writeFileSync(path, JSON.stringify(data, null, "\t"), "utf-8");
console.log(
	`Done. Added SVGs to ${addedCount} slides in monolith-renaissance.`,
);

const totalSlides = slides.length;
const svgSlides = slides.filter((s: { content?: string[] }) =>
	s.content?.some(
		(c: string) => c.startsWith("<svg") || c.includes("](assets/"),
	),
).length;
console.log(
	`Coverage: ${svgSlides}/${totalSlides} = ${Math.round((svgSlides / totalSlides) * 100)}%`,
);
