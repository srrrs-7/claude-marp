import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220063000_singapore-city-experiment";

// Slide 3: 1965→2025 変貌 — timeline
const svgTimeline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">シンガポール 1965 → 2025 の変貌</text>
  <!-- timeline line -->
  <line x1="80" y1="160" x2="720" y2="160" stroke="#f9a825" stroke-width="3"/>
  <!-- milestones -->
  <!-- 1965 -->
  <circle cx="100" cy="160" r="10" fill="#e91e63"/>
  <text x="100" y="148" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle">1965</text>
  <text x="100" y="185" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">独立</text>
  <text x="100" y="200" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">GDP低所得</text>
  <!-- 1970 -->
  <circle cx="220" cy="160" r="8" fill="#f9a825"/>
  <text x="220" y="148" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">1970s</text>
  <text x="220" y="185" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">工業化</text>
  <text x="220" y="200" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">外資誘致</text>
  <!-- 1980 -->
  <circle cx="360" cy="160" r="8" fill="#f9a825"/>
  <text x="360" y="148" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">1980s</text>
  <text x="360" y="185" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">金融ハブ化</text>
  <text x="360" y="200" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">HDB整備完了</text>
  <!-- 2000 -->
  <circle cx="530" cy="160" r="8" fill="#f9a825"/>
  <text x="530" y="148" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">2000s</text>
  <text x="530" y="185" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">知識経済</text>
  <text x="530" y="200" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">テック集積</text>
  <!-- 2025 -->
  <circle cx="700" cy="160" r="10" fill="#f9a825"/>
  <text x="700" y="148" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle">2025</text>
  <text x="700" y="185" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">GDP/capita</text>
  <text x="700" y="200" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">$65,000</text>
  <!-- before/after comparison boxes -->
  <rect x="50" y="240" width="300" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="200" y="262" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">1965年の課題</text>
  <text x="200" y="282" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">天然資源なし、飲料水もマレーシアから輸入</text>
  <text x="200" y="300" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">「生き残れないかもしれない」</text>
  <text x="200" y="318" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">—リー・クアンユー</text>
  <rect x="450" y="240" width="300" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="600" y="262" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">2025年の達成</text>
  <text x="600" y="282" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">汚職指数: 世界最低クラス</text>
  <text x="600" y="300" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">1人あたりGDP: 日本の約2倍</text>
  <text x="600" y="318" fill="#f9a825" font-size="10" font-family="sans-serif" text-anchor="middle">60年で第三世界から先進国へ</text>
</svg>`;

// Slide 6: 実用主義の設計図
const svgPragmatism = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">実用主義（Pragmatism）の政策判断フレーム</text>
  <!-- center: core principle -->
  <ellipse cx="400" cy="170" rx="90" ry="55" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="400" y="163" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">機能するか？</text>
  <text x="400" y="182" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">イデオロギーより</text>
  <text x="400" y="198" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">実効性で決める</text>
  <!-- surrounding policy examples -->
  <rect x="30" y="60" width="160" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="82" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語を公用語に</text>
  <text x="110" y="100" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">外資誘致と国際化</text>
  <line x1="190" y1="87" x2="312" y2="145" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="30" y="240" width="160" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="262" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">ガム販売禁止</text>
  <text x="110" y="280" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">公共空間美化</text>
  <line x1="190" y1="267" x2="312" y2="195" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="615" y="60" width="165" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="697" y="82" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">高い公務員給与</text>
  <text x="697" y="100" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">汚職防止のため</text>
  <line x1="615" y1="87" x2="490" y2="145" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="615" y="240" width="165" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="697" y="262" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">鞭打ち刑の維持</text>
  <text x="697" y="280" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">犯罪抑止のため</text>
  <line x1="615" y1="267" x2="490" y2="195" stroke="#f9a825" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="400" y="345" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">「正しいか」ではなく「機能するか」で判断する文化</text>
</svg>`;

// Slide 8: HDB住宅政策
const svgHDB = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">HDB 住宅開発庁：住宅で社会を設計する</text>
  <!-- building blocks showing ethnic integration -->
  <rect x="80" y="60" width="240" height="250" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="85" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">HDB棟の構成</text>
  <!-- floors representing ethnic groups -->
  <rect x="95" y="100" width="210" height="35" rx="4" fill="#f9a825" opacity="0.7"/>
  <text x="200" y="122" fill="#1a1a2e" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">中国系 74%</text>
  <rect x="95" y="142" width="210" height="35" rx="4" fill="#e91e63" opacity="0.7"/>
  <text x="200" y="164" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">マレー系 13%</text>
  <rect x="95" y="184" width="210" height="35" rx="4" fill="#4fc3f7" opacity="0.7"/>
  <text x="200" y="206" fill="#1a1a2e" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">インド系 9%</text>
  <rect x="95" y="226" width="210" height="35" rx="4" fill="#81c784" opacity="0.7"/>
  <text x="200" y="248" fill="#1a1a2e" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">その他 4%</text>
  <text x="200" y="290" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">EIP: 比率を法的に設定</text>
  <!-- stats boxes right -->
  <rect x="380" y="80" width="180" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="470" y="105" fill="#f9a825" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">80%</text>
  <text x="470" y="127" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">国民がHDB在住</text>
  <rect x="580" y="80" width="165" height="65" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="662" y="105" fill="#e91e63" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">90%+</text>
  <text x="662" y="127" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">持ち家率（世界最高）</text>
  <!-- community box -->
  <rect x="380" y="175" width="365" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="562" y="200" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">コミュニティ設計</text>
  <text x="562" y="222" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">1階: 必ず商店・フードコート</text>
  <text x="562" y="242" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">民族を超えた交流の核</text>
  <text x="562" y="262" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">→ ゲットー化を構造的に防止</text>
  <text x="562" y="282" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">住宅政策で民族紛争を予防する社会工学</text>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">世界最高クラスの持ち家率 × 民族統合 = 「設計された共生」</text>
</svg>`;

// Slide 12 (交通管理): COE/ERP
const svgTransport = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">交通量を「市場メカニズム」で制御</text>
  <!-- COE box -->
  <rect x="50" y="65" width="320" height="140" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="92" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">COE（車所有権オークション）</text>
  <text x="210" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">価格: 約$60,000 (800万円)</text>
  <text x="210" y="135" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">有効期間: 10年</text>
  <text x="210" y="155" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">車の本体価格以上のCOEが必要</text>
  <text x="210" y="175" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">→ 所有台数を総量規制</text>
  <text x="210" y="195" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">10年後更新しなければ廃車義務</text>
  <!-- ERP box -->
  <rect x="430" y="65" width="320" height="140" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="590" y="92" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">ERP（時間帯別通行料）</text>
  <text x="590" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">混雑時間帯: 高額課金</text>
  <text x="590" y="135" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">閑散時間帯: 低額または無料</text>
  <text x="590" y="155" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">ETC方式で自動課金</text>
  <text x="590" y="175" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">→ 交通量を時間的に平準化</text>
  <text x="590" y="195" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">渋滞を価格シグナルで解消</text>
  <!-- result box -->
  <rect x="175" y="245" width="450" height="65" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="270" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">エンジニアリングとの対比</text>
  <text x="400" y="292" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">AWSの従量課金モデル: 需要に応じてコスト変動</text>
  <text x="400" y="310" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">市場メカニズムでリソース配分を最適化</text>
  <text x="400" y="350" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">「規制」ではなく「市場設計」で問題を解決</text>
</svg>`;

// Slide 14: 批判と課題
const svgFreedom = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">自由 vs 効率 ：シンガポールのトレードオフ</text>
  <!-- scale/balance visualization -->
  <line x1="400" y1="60" x2="400" y2="120" stroke="#f9a825" stroke-width="3"/>
  <line x1="200" y1="120" x2="600" y2="120" stroke="#f9a825" stroke-width="3"/>
  <!-- left pan: freedom -->
  <line x1="200" y1="120" x2="200" y2="155" stroke="#e91e63" stroke-width="2"/>
  <rect x="100" y="155" width="200" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="180" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">自由</text>
  <text x="200" y="200" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">報道の自由 126位</text>
  <text x="200" y="218" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">集会に許可が必要</text>
  <text x="200" y="234" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">事実上一党支配</text>
  <!-- right pan: efficiency -->
  <line x1="600" y1="120" x2="600" y2="140" stroke="#f9a825" stroke-width="2"/>
  <rect x="500" y="140" width="200" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="600" y="165" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">効率・繁栄</text>
  <text x="600" y="185" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">GDP世界トップ5</text>
  <text x="600" y="203" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">汚職最少クラス</text>
  <text x="600" y="221" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">行政効率: 世界最高水準</text>
  <!-- question box -->
  <rect x="150" y="290" width="500" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="312" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">問い: 効率と自由は本当にトレードオフなのか？</text>
  <text x="400" y="332" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">最高の「ユーザー体験」は自由か、それとも設計か？</text>
</svg>`;

// Slide 16: Platform design analogies
const svgPlatform = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">シンガポールモデル × プラットフォーム設計</text>
  <!-- 5 analogies -->
  <rect x="30" y="55" width="220" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="140" y="80" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">全てを設計する</text>
  <text x="140" y="98" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">Apple的クローズド</text>
  <text x="140" y="114" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">エコシステム</text>
  <rect x="290" y="55" width="220" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="80" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">市場メカニズムで制御</text>
  <text x="400" y="98" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">AWSの従量課金</text>
  <text x="400" y="114" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">モデル</text>
  <rect x="550" y="55" width="220" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="660" y="80" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">多民族共生の仕組み</text>
  <text x="660" y="98" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">マルチテナント</text>
  <text x="660" y="114" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">アーキテクチャ</text>
  <rect x="100" y="180" width="240" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="220" y="205" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">デジタルID基盤</text>
  <text x="220" y="223" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">OAuth / SSO統合</text>
  <text x="220" y="240" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">SingPass の思想</text>
  <rect x="460" y="180" width="240" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="580" y="205" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">効率 vs 自由</text>
  <text x="580" y="223" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">セキュリティ vs</text>
  <text x="580" y="240" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">使いやすさ</text>
  <!-- conclusion -->
  <rect x="150" y="300" width="500" height="45" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="322" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">国家設計とプラットフォーム設計は驚くほど相似形</text>
  <text x="400" y="338" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">スケールは違えど、同じトレードオフと向き合っている</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// index 3: 1965→2025変貌
data.slides[3].content = [
	`![w:800 center](assets/svg-timeline.svg)`,
	...data.slides[3].content,
];
// index 6: 実用主義
data.slides[6].content = [
	`![w:800 center](assets/svg-pragmatism.svg)`,
	...data.slides[6].content,
];
// index 8: HDB
data.slides[8].content = [
	`![w:800 center](assets/svg-hdb.svg)`,
	...data.slides[8].content,
];
// index 12: 交通管理
data.slides[12].content = [
	`![w:800 center](assets/svg-transport.svg)`,
	...data.slides[12].content,
];
// index 14: 批判と課題
data.slides[14].content = [
	`![w:800 center](assets/svg-freedom.svg)`,
	...data.slides[14].content,
];
// index 16: テック業界への示唆
data.slides[16].content = [
	`![w:800 center](assets/svg-platform.svg)`,
	...data.slides[16].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-timeline.svg`, svgTimeline);
writeFileSync(`${BASE}/assets/svg-pragmatism.svg`, svgPragmatism);
writeFileSync(`${BASE}/assets/svg-hdb.svg`, svgHDB);
writeFileSync(`${BASE}/assets/svg-transport.svg`, svgTransport);
writeFileSync(`${BASE}/assets/svg-freedom.svg`, svgFreedom);
writeFileSync(`${BASE}/assets/svg-platform.svg`, svgPlatform);

console.log("singapore-city: SVGs written and slides-data.json updated.");
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
