// Patch script: add inline SVGs to management-best-practices slides
import { readFileSync, writeFileSync } from "fs";

const filePath = new URL("slides-data.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(filePath, "utf-8"));

const BG = "#1a1a2e";
const BOX = "#16213e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";

const svgStyle = `viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"`;

// SVG: Management Impact pyramid (slide 3)
const managementImpact = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">マネージャーの影響力ピラミッド</text>
  <!-- Level 1: Individual -->
  <polygon points="400,320 170,320 285,250" fill="${BOX}" stroke="#4caf50" stroke-width="2"/>
  <text x="285" y="292" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">個人パフォーマンス</text>
  <!-- Level 2: Team -->
  <polygon points="400,245 285,245 285,175 400,175" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2"/>
  <!-- Full level 2 trapezoid -->
  <polygon points="285,250 515,250 460,175 340,175" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2"/>
  <text x="400" y="218" fill="${ACCENT1}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">チームエンゲージメント</text>
  <!-- Level 3: Organization -->
  <polygon points="340,170 460,170 420,100 380,100" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2"/>
  <text x="400" y="140" fill="${ACCENT2}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">組織文化</text>
  <!-- Apex: Vision -->
  <polygon points="380,95 420,95 400,55" fill="${ACCENT1}" stroke="${ACCENT1}" stroke-width="2"/>
  <text x="400" y="82" fill="${BG}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Vision</text>
  <!-- Stats on right -->
  <rect x="540" y="80" width="220" height="230" fill="${BOX}" rx="8"/>
  <text x="650" y="110" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Gallup 調査結果</text>
  <text x="650" y="140" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">従業員エンゲージメント</text>
  <text x="650" y="165" fill="${ACCENT1}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">70%</text>
  <text x="650" y="185" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">はマネージャーに依存</text>
  <line x1="570" y1="205" x2="730" y2="205" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="650" y="230" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">優秀なマネージャーの</text>
  <text x="650" y="252" fill="#4caf50" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">+21%</text>
  <text x="650" y="272" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">生産性向上効果</text>
  <!-- Bottom label -->
  <text x="400" y="365" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">マネージャーは組織成果の最大レバー</text>
</svg>`;

// SVG: 1on1 time allocation pie (slide 7)
const oneOnOneTime = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 時間配分（60分モデル）</text>
  <!-- Horizontal bar representation -->
  <!-- Check-in: 10min -->
  <rect x="60" y="80" width="58" height="60" fill="${ACCENT1}" rx="4"/>
  <text x="89" y="106" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">チェック</text>
  <text x="89" y="122" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">イン</text>
  <text x="89" y="158" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">10分</text>
  <!-- Career: 15min -->
  <rect x="122" y="80" width="87" height="60" fill="${ACCENT2}" rx="4"/>
  <text x="165" y="106" fill="${TEXT}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">キャリア</text>
  <text x="165" y="122" fill="${TEXT}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">開発</text>
  <text x="165" y="158" fill="${ACCENT2}" font-size="13" text-anchor="middle" font-family="sans-serif">15分</text>
  <!-- Issues: 20min -->
  <rect x="213" y="80" width="116" height="60" fill="#29b6f6" rx="4"/>
  <text x="271" y="106" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">課題・</text>
  <text x="271" y="122" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">ブロッカー</text>
  <text x="271" y="158" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">20分</text>
  <!-- Progress: 10min -->
  <rect x="333" y="80" width="58" height="60" fill="#4caf50" rx="4"/>
  <text x="362" y="106" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">進捗</text>
  <text x="362" y="122" fill="${BG}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">確認</text>
  <text x="362" y="158" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">10分</text>
  <!-- Wrap: 5min -->
  <rect x="395" y="80" width="29" height="60" fill="#ab47bc" rx="4"/>
  <text x="409" y="106" fill="${TEXT}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">まと</text>
  <text x="409" y="122" fill="${TEXT}" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">め</text>
  <text x="409" y="158" fill="#ab47bc" font-size="12" text-anchor="middle" font-family="sans-serif">5分</text>
  <!-- Key principles box -->
  <rect x="450" y="70" width="310" height="270" fill="${BOX}" rx="8"/>
  <text x="605" y="98" fill="${ACCENT1}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 黄金律</text>
  <text x="470" y="130" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="130" fill="${TEXT}" font-size="13" font-family="sans-serif">部下がアジェンダを決める</text>
  <text x="470" y="160" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="160" fill="${TEXT}" font-size="13" font-family="sans-serif">毎週同じ時間・場所</text>
  <text x="470" y="190" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="190" fill="${TEXT}" font-size="13" font-family="sans-serif">メモは部下が取る</text>
  <text x="470" y="220" fill="${ACCENT2}" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="220" fill="${TEXT}" font-size="13" font-family="sans-serif">業務報告に終始しない</text>
  <text x="470" y="250" fill="${ACCENT2}" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="250" fill="${TEXT}" font-size="13" font-family="sans-serif">キャンセルを習慣化しない</text>
  <text x="470" y="280" fill="${ACCENT2}" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="280" fill="${TEXT}" font-size="13" font-family="sans-serif">マネージャーが話しすぎる</text>
  <!-- Bottom summary -->
  <text x="400" y="370" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">1on1は「部下のための」時間 — 聴く:話す = 7:3</text>
</svg>`;

// SVG: SBIA Feedback Framework (slide 12)
const sbiaFramework = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">SBIAフレームワーク — 効果的フィードバック</text>
  <!-- S: Situation -->
  <rect x="50" y="70" width="160" height="110" fill="${BOX}" stroke="${ACCENT1}" stroke-width="3" rx="8"/>
  <text x="130" y="105" fill="${ACCENT1}" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">S</text>
  <text x="130" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Situation</text>
  <text x="130" y="152" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">状況・場面</text>
  <text x="130" y="170" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">「先週の会議で」</text>
  <!-- Arrow -->
  <polygon points="218,125 233,118 233,132" fill="${TEXT}"/>
  <line x1="212" y1="125" x2="233" y2="125" stroke="${TEXT}" stroke-width="2"/>
  <!-- B: Behavior -->
  <rect x="240" y="70" width="160" height="110" fill="${BOX}" stroke="${ACCENT2}" stroke-width="3" rx="8"/>
  <text x="320" y="105" fill="${ACCENT2}" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">B</text>
  <text x="320" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Behavior</text>
  <text x="320" y="152" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">具体的行動</text>
  <text x="320" y="170" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">「〜という発言が」</text>
  <!-- Arrow -->
  <polygon points="408,125 423,118 423,132" fill="${TEXT}"/>
  <line x1="402" y1="125" x2="423" y2="125" stroke="${TEXT}" stroke-width="2"/>
  <!-- I: Impact -->
  <rect x="430" y="70" width="160" height="110" fill="${BOX}" stroke="#29b6f6" stroke-width="3" rx="8"/>
  <text x="510" y="105" fill="#29b6f6" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">I</text>
  <text x="510" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Impact</text>
  <text x="510" y="152" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">影響・結果</text>
  <text x="510" y="170" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">「チームに〜影響」</text>
  <!-- Arrow -->
  <polygon points="598,125 613,118 613,132" fill="${TEXT}"/>
  <line x1="592" y1="125" x2="613" y2="125" stroke="${TEXT}" stroke-width="2"/>
  <!-- A: Action -->
  <rect x="620" y="70" width="160" height="110" fill="${BOX}" stroke="#4caf50" stroke-width="3" rx="8"/>
  <text x="700" y="105" fill="#4caf50" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">A</text>
  <text x="700" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Action</text>
  <text x="700" y="152" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">期待する行動</text>
  <text x="700" y="170" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">「今後は〜してほしい」</text>
  <!-- Example -->
  <rect x="50" y="210" width="700" height="90" fill="${BOX}" rx="8"/>
  <text x="400" y="238" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">実例</text>
  <text x="400" y="262" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「先週の全体会議で（S）、仕様未確認のまま断言した発言が（B）、</text>
  <text x="400" y="284" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">クライアントの混乱を招きました（I）。事前確認を徹底してください（A）。」</text>
  <!-- Key point -->
  <text x="400" y="355" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">評価ではなく行動に焦点を当てる — 人格批判は厳禁</text>
</svg>`;

// SVG: GROW Model (slide 16)
const growModel = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">GROWモデル — コーチング会話フレームワーク</text>
  <!-- Circular flow - approximate with boxes and arrows -->
  <!-- G: Goal -->
  <rect x="300" y="55" width="200" height="70" fill="${BOX}" stroke="${ACCENT1}" stroke-width="3" rx="8"/>
  <text x="400" y="85" fill="${ACCENT1}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">G: Goal</text>
  <text x="400" y="108" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「何を達成したい？」</text>
  <!-- R: Reality -->
  <rect x="560" y="165" width="200" height="70" fill="${BOX}" stroke="${ACCENT2}" stroke-width="3" rx="8"/>
  <text x="660" y="195" fill="${ACCENT2}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">R: Reality</text>
  <text x="660" y="218" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「現状はどうか？」</text>
  <!-- O: Options -->
  <rect x="300" y="280" width="200" height="70" fill="${BOX}" stroke="#29b6f6" stroke-width="3" rx="8"/>
  <text x="400" y="310" fill="#29b6f6" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">O: Options</text>
  <text x="400" y="333" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「どんな手段がある？」</text>
  <!-- W: Way forward -->
  <rect x="40" y="165" width="200" height="70" fill="${BOX}" stroke="#4caf50" stroke-width="3" rx="8"/>
  <text x="140" y="195" fill="#4caf50" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">W: Will</text>
  <text x="140" y="218" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「何をいつやる？」</text>
  <!-- Arrows G -> R -->
  <polygon points="520,118 536,111 536,125" fill="${ACCENT1}"/>
  <path d="M 500 125 Q 530 145 540 165" fill="none" stroke="${ACCENT1}" stroke-width="2"/>
  <!-- Arrows R -> O -->
  <polygon points="634,296 626,281 640,281" fill="${ACCENT2}"/>
  <path d="M 660 235 Q 640 265 620 280" fill="none" stroke="${ACCENT2}" stroke-width="2"/>
  <!-- Arrows O -> W -->
  <polygon points="282,323 266,316 266,330" fill="#29b6f6"/>
  <path d="M 300 315 Q 270 315 264 300" fill="none" stroke="#29b6f6" stroke-width="2"/>
  <!-- Arrows W -> G -->
  <polygon points="178,148 170,133 184,133" fill="#4caf50"/>
  <path d="M 140 165 Q 160 145 200 130" fill="none" stroke="#4caf50" stroke-width="2"/>
  <!-- Center: Coach role -->
  <text x="400" y="195" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">コーチは</text>
  <text x="400" y="215" fill="${TEXT}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">「問いを立てる」</text>
</svg>`;

// SVG: Self-determination theory (slide 20)
const selfDetermination = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">自己決定理論 — 内発的動機の3要素</text>
  <!-- Three circles -->
  <!-- Autonomy -->
  <circle cx="200" cy="200" r="110" fill="${ACCENT1}" opacity="0.85"/>
  <text x="200" y="185" fill="${BG}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">自律性</text>
  <text x="200" y="208" fill="${BG}" font-size="13" text-anchor="middle" font-family="sans-serif">Autonomy</text>
  <text x="200" y="230" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">自分で決められる</text>
  <!-- Competence -->
  <circle cx="420" cy="160" r="110" fill="${ACCENT2}" opacity="0.85"/>
  <text x="420" y="145" fill="${TEXT}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">有能感</text>
  <text x="420" y="168" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">Competence</text>
  <text x="420" y="190" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">できる・成長している</text>
  <!-- Relatedness -->
  <circle cx="600" cy="220" r="110" fill="#29b6f6" opacity="0.85"/>
  <text x="600" y="205" fill="${BG}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">関係性</text>
  <text x="600" y="228" fill="${BG}" font-size="13" text-anchor="middle" font-family="sans-serif">Relatedness</text>
  <text x="600" y="250" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">つながっている</text>
  <!-- Inner motivation label -->
  <text x="400" y="370" fill="${ACCENT1}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">3つが揃うと内発的動機が持続 → エンゲージメント最大化</text>
</svg>`;

// SVG: Psychological Safety model (slide 25)
const psychSafety = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">心理的安全性の4段階モデル</text>
  <!-- Stage 1 -->
  <rect x="40" y="70" width="170" height="240" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="8"/>
  <text x="125" y="105" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 1</text>
  <text x="125" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">参加の安全</text>
  <text x="125" y="160" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「いてもいい」</text>
  <text x="125" y="185" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">メンバーとして</text>
  <text x="125" y="203" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">認められる感覚</text>
  <text x="125" y="280" fill="#29b6f6" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤</text>
  <!-- Stage 2 -->
  <rect x="220" y="70" width="170" height="240" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="8"/>
  <text x="305" y="105" fill="${ACCENT1}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 2</text>
  <text x="305" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">学習の安全</text>
  <text x="305" y="160" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「失敗できる」</text>
  <text x="305" y="185" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">質問・実験・</text>
  <text x="305" y="203" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">失敗から学べる</text>
  <text x="305" y="280" fill="${ACCENT1}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長</text>
  <!-- Stage 3 -->
  <rect x="400" y="70" width="170" height="240" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="8"/>
  <text x="485" y="105" fill="${ACCENT2}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 3</text>
  <text x="485" y="130" fill="${TEXT}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">貢献の安全</text>
  <text x="485" y="160" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">「発言できる」</text>
  <text x="485" y="185" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">アイデア・意見を</text>
  <text x="485" y="203" fill="${TEXT}" font-size="11" text-anchor="middle" font-family="sans-serif">積極的に出せる</text>
  <text x="485" y="280" fill="${ACCENT2}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">参加</text>
  <!-- Stage 4 -->
  <rect x="580" y="70" width="180" height="240" fill="${ACCENT1}" rx="8"/>
  <text x="670" y="105" fill="${BG}" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 4</text>
  <text x="670" y="130" fill="${BG}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">挑戦の安全</text>
  <text x="670" y="160" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">「現状に挑める」</text>
  <text x="670" y="185" fill="${BG}" font-size="11" text-anchor="middle" font-family="sans-serif">革新的提案・</text>
  <text x="670" y="203" fill="${BG}" font-size="11" text-anchor="middle" font-family="sans-serif">現状打破が歓迎</text>
  <text x="670" y="280" fill="${BG}" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">革新</text>
  <!-- Bottom: Google finding -->
  <text x="400" y="360" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">Google Project Aristotle: 心理的安全性がチーム成功要因 No.1</text>
</svg>`;

// SVG: Performance evaluation 2x2 (slide 28)
const performanceMatrix = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">パフォーマンス × ポテンシャル マトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="${TEXT}" stroke-width="2"/>
  <!-- Quadrant borders -->
  <line x1="420" y1="60" x2="420" y2="340" stroke="${TEXT}" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="100" y1="200" x2="740" y2="200" stroke="${TEXT}" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Quadrant 1: High perf, high pot - Stars -->
  <rect x="425" y="65" width="310" height="130" fill="#4caf50" opacity="0.2" rx="4"/>
  <text x="580" y="105" fill="#4caf50" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">スター</text>
  <text x="580" y="128" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">高パフォーマンス</text>
  <text x="580" y="148" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">高ポテンシャル</text>
  <text x="580" y="172" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">→ 挑戦的な機会を提供</text>
  <!-- Quadrant 2: High perf, low pot - Solid contributors -->
  <rect x="105" y="65" width="310" height="130" fill="${ACCENT1}" opacity="0.2" rx="4"/>
  <text x="260" y="105" fill="${ACCENT1}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">堅実な貢献者</text>
  <text x="260" y="128" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">高パフォーマンス</text>
  <text x="260" y="148" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">低ポテンシャル</text>
  <text x="260" y="172" fill="${ACCENT1}" font-size="12" text-anchor="middle" font-family="sans-serif">→ 専門性を深化・表彰</text>
  <!-- Quadrant 3: Low perf, high pot - Emerging -->
  <rect x="425" y="205" width="310" height="130" fill="${ACCENT2}" opacity="0.2" rx="4"/>
  <text x="580" y="248" fill="${ACCENT2}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">ダイヤモンドの原石</text>
  <text x="580" y="271" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">低パフォーマンス</text>
  <text x="580" y="291" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">高ポテンシャル</text>
  <text x="580" y="315" fill="${ACCENT2}" font-size="12" text-anchor="middle" font-family="sans-serif">→ コーチング集中投資</text>
  <!-- Quadrant 4: Low perf, low pot - Under performers -->
  <rect x="105" y="205" width="310" height="130" fill="#9e9e9e" opacity="0.2" rx="4"/>
  <text x="260" y="248" fill="#9e9e9e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">要改善</text>
  <text x="260" y="271" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">低パフォーマンス</text>
  <text x="260" y="291" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">低ポテンシャル</text>
  <text x="260" y="315" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">→ PIP / 役割変更検討</text>
  <!-- Axis labels -->
  <text x="420" y="368" fill="${TEXT}" font-size="14" text-anchor="middle" font-family="sans-serif">パフォーマンス →</text>
  <text x="50" y="200" fill="${TEXT}" font-size="14" text-anchor="middle" transform="rotate(-90,50,200)" font-family="sans-serif">ポテンシャル →</text>
</svg>`;

// SVG: Remote work 4 challenges (slide 37)
const remoteChallenges = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">リモートマネジメント 4大課題と解決策</text>
  <!-- Challenge 1: Communication -->
  <rect x="40" y="65" width="340" height="130" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="8"/>
  <text x="75" y="93" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">① コミュニケーション断絶</text>
  <text x="60" y="118" fill="${TEXT}" font-size="12" font-family="sans-serif">課題: 情報が届かない/伝わらない</text>
  <text x="60" y="140" fill="#4caf50" font-size="12" font-family="sans-serif">→ 非同期ファースト + 定期チェックイン</text>
  <text x="60" y="162" fill="#4caf50" font-size="12" font-family="sans-serif">→ Slackチャンネル設計の見直し</text>
  <text x="60" y="184" fill="#4caf50" font-size="12" font-family="sans-serif">→ Video ON ポリシー</text>
  <!-- Challenge 2: Trust -->
  <rect x="420" y="65" width="340" height="130" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="8"/>
  <text x="455" y="93" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">② 信頼関係構築の困難</text>
  <text x="440" y="118" fill="${TEXT}" font-size="12" font-family="sans-serif">課題: 「見えない」不安</text>
  <text x="440" y="140" fill="#4caf50" font-size="12" font-family="sans-serif">→ アウトカムベースの評価へ転換</text>
  <text x="440" y="162" fill="#4caf50" font-size="12" font-family="sans-serif">→ バーチャル雑談タイム設置</text>
  <text x="440" y="184" fill="#4caf50" font-size="12" font-family="sans-serif">→ 意図的な1on1頻度アップ</text>
  <!-- Challenge 3: Culture -->
  <rect x="40" y="215" width="340" height="130" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="8"/>
  <text x="75" y="243" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">③ チームカルチャー希薄化</text>
  <text x="60" y="268" fill="${TEXT}" font-size="12" font-family="sans-serif">課題: 一体感・所属感の低下</text>
  <text x="60" y="290" fill="#4caf50" font-size="12" font-family="sans-serif">→ バーチャルチームイベント</text>
  <text x="60" y="312" fill="#4caf50" font-size="12" font-family="sans-serif">→ 四半期対面合宿</text>
  <text x="60" y="334" fill="#4caf50" font-size="12" font-family="sans-serif">→ チーム価値観の明文化</text>
  <!-- Challenge 4: Burnout -->
  <rect x="420" y="215" width="340" height="130" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="8"/>
  <text x="455" y="243" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">④ バーンアウトリスク増大</text>
  <text x="440" y="268" fill="${TEXT}" font-size="12" font-family="sans-serif">課題: 仕事とプライベートの境界崩壊</text>
  <text x="440" y="290" fill="#4caf50" font-size="12" font-family="sans-serif">→ コアタイムの明確化</text>
  <text x="440" y="312" fill="#4caf50" font-size="12" font-family="sans-serif">→ 「ログオフ権」の尊重</text>
  <text x="440" y="334" fill="#4caf50" font-size="12" font-family="sans-serif">→ 定期的なエネルギーチェック</text>
</svg>`;

// SVG: D&I Strategic value (slide 42)
const diValue = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">D&I の戦略的ビジネス価値</text>
  <!-- Center D&I -->
  <ellipse cx="400" cy="210" rx="80" ry="50" fill="${ACCENT1}"/>
  <text x="400" y="205" fill="${BG}" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">D&I</text>
  <text x="400" y="225" fill="${BG}" font-size="12" text-anchor="middle" font-family="sans-serif">多様性・包括性</text>
  <!-- Outcome 1: Innovation -->
  <rect x="40" y="80" width="160" height="70" fill="${BOX}" stroke="${ACCENT1}" stroke-width="2" rx="6"/>
  <text x="120" y="108" fill="${ACCENT1}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">イノベーション</text>
  <text x="120" y="132" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">+45% 新製品率</text>
  <line x1="200" y1="115" x2="320" y2="185" stroke="${ACCENT1}" stroke-width="1.5"/>
  <!-- Outcome 2: Decision quality -->
  <rect x="600" y="80" width="160" height="70" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="680" y="108" fill="${ACCENT2}" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">意思決定精度</text>
  <text x="680" y="132" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">+87% 精度向上</text>
  <line x1="600" y1="115" x2="480" y2="185" stroke="${ACCENT2}" stroke-width="1.5"/>
  <!-- Outcome 3: Talent retention -->
  <rect x="40" y="250" width="160" height="70" fill="${BOX}" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="120" y="278" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">人材定着率</text>
  <text x="120" y="302" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">離職率 -35%</text>
  <line x1="200" y1="285" x2="320" y2="240" stroke="#29b6f6" stroke-width="1.5"/>
  <!-- Outcome 4: Financial performance -->
  <rect x="600" y="250" width="160" height="70" fill="${BOX}" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="680" y="278" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">財務パフォーマンス</text>
  <text x="680" y="302" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ROE +36%向上</text>
  <line x1="600" y1="285" x2="480" y2="240" stroke="#4caf50" stroke-width="1.5"/>
  <!-- Source -->
  <text x="400" y="375" fill="${TEXT}" font-size="12" text-anchor="middle" font-family="sans-serif">出典: McKinsey Diversity Wins 2020, Cloverpop研究</text>
</svg>`;

// SVG: OKR vs MBO comparison (slide 30)
const okrVsMbo = `<svg ${svgStyle} xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="35" fill="${ACCENT1}" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">OKR vs MBO — 比較フレームワーク</text>
  <!-- Header -->
  <rect x="60" y="55" width="320" height="45" fill="${ACCENT1}" rx="6"/>
  <text x="220" y="85" fill="${BG}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">OKR</text>
  <rect x="420" y="55" width="320" height="45" fill="${BOX}" stroke="${ACCENT2}" stroke-width="2" rx="6"/>
  <text x="580" y="85" fill="${ACCENT2}" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">MBO</text>
  <!-- Rows -->
  <!-- Set by -->
  <text x="60" y="125" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">目標設定</text>
  <rect x="160" y="108" width="220" height="30" fill="${BOX}" rx="3"/>
  <text x="270" y="128" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">ボトムアップ + 透明性</text>
  <rect x="420" y="108" width="320" height="30" fill="${BOX}" rx="3"/>
  <text x="580" y="128" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">トップダウン・組織内非公開</text>
  <!-- Cycle -->
  <text x="60" y="165" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">サイクル</text>
  <rect x="160" y="148" width="220" height="30" fill="${BOX}" rx="3"/>
  <text x="270" y="168" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">四半期 (3ヶ月)</text>
  <rect x="420" y="148" width="320" height="30" fill="${BOX}" rx="3"/>
  <text x="580" y="168" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">年次 (12ヶ月)</text>
  <!-- Target -->
  <text x="60" y="205" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">達成目標</text>
  <rect x="160" y="188" width="220" height="30" fill="${BOX}" rx="3"/>
  <text x="270" y="208" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">野心的 (60-70%達成が理想)</text>
  <rect x="420" y="188" width="320" height="30" fill="${BOX}" rx="3"/>
  <text x="580" y="208" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">100%達成が前提</text>
  <!-- Link to compensation -->
  <text x="60" y="245" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">報酬連動</text>
  <rect x="160" y="228" width="220" height="30" fill="${BOX}" rx="3"/>
  <text x="270" y="248" fill="${ACCENT1}" font-size="13" text-anchor="middle" font-family="sans-serif">原則リンクしない</text>
  <rect x="420" y="228" width="320" height="30" fill="${BOX}" rx="3"/>
  <text x="580" y="248" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">直接リンク (ボーナス連動)</text>
  <!-- Focus -->
  <text x="60" y="285" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">重視</text>
  <rect x="160" y="268" width="220" height="30" fill="${BOX}" rx="3"/>
  <text x="270" y="288" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">学習・挑戦</text>
  <rect x="420" y="268" width="320" height="30" fill="${BOX}" rx="3"/>
  <text x="580" y="288" fill="${TEXT}" font-size="13" text-anchor="middle" font-family="sans-serif">アカウンタビリティ</text>
  <!-- Recommendation -->
  <rect x="60" y="325" width="680" height="45" fill="${ACCENT1}" rx="6"/>
  <text x="400" y="352" fill="${BG}" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨: OKRをエンゲージメント/成長に、MBOを最低基準管理に使い分ける</text>
</svg>`;

// Map SVGs to slide indices
const svgPatches: Record<number, string> = {
	3: managementImpact,
	7: oneOnOneTime,
	12: sbiaFramework,
	16: growModel,
	20: selfDetermination,
	24: psychSafety,
	28: performanceMatrix,
	30: okrVsMbo,
	37: remoteChallenges,
	42: diValue,
};

// Apply patches
for (const [idx, svg] of Object.entries(svgPatches)) {
	const i = Number(idx);
	if (data.slides[i]) {
		data.slides[i].content = [svg, ...data.slides[i].content];
	}
}

writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(
	`Patched ${Object.keys(svgPatches).length} slides in management-best-practices`,
);
