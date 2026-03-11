#!/usr/bin/env bun
/**
 * Patch script: add inline SVGs to submarine-cable slides-data.json
 * Target: ≥29 slides with SVGs (currently 5)
 * We add SVGs to 25 additional slides for a total of 30
 */

import { readFileSync, writeFileSync } from "node:fs";

const dataPath =
	"/workspace/main/docs/20260220060000_submarine-cable/slides-data.json";
const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const slides = data.slides;

// Color palette
const BG = "#1a1a2e";
const ACCENT1 = "#f9a825";
const ACCENT2 = "#e91e63";
const TEXT = "#ffffff";
const BOX = "#16213e";
const ACCENT3 = "#4fc3f7";
const GREEN = "#69f0ae";
const ORANGE = "#ff7043";

// SVG helper: satellite vs cable comparison
const svgSatelliteVsCable = `<svg viewBox="0 0 800 400" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="${BG}"/>
  <text x="400" y="32" text-anchor="middle" fill="${ACCENT1}" font-size="20" font-weight="bold" font-family="sans-serif">衛星通信 vs 海底ケーブル</text>
  <!-- Satellite side -->
  <rect x="40" y="55" width="320" height="310" rx="10" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="200" y="82" text-anchor="middle" fill="${ACCENT3}" font-size="16" font-weight="bold" font-family="sans-serif">衛星通信 (Starlink)</text>
  <!-- satellite icon -->
  <circle cx="200" cy="130" r="22" fill="none" stroke="${ACCENT3}" stroke-width="2"/>
  <line x1="178" y1="130" x2="156" y2="110" stroke="${ACCENT3}" stroke-width="2"/>
  <line x1="222" y1="130" x2="244" y2="110" stroke="${ACCENT3}" stroke-width="2"/>
  <rect x="150" y="104" width="22" height="12" fill="${ACCENT3}" rx="2"/>
  <rect x="228" y="104" width="22" height="12" fill="${ACCENT3}" rx="2"/>
  <text x="200" y="170" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">帯域: 数〜数十 Tbps</text>
  <text x="200" y="192" text-anchor="middle" fill="${ORANGE}" font-size="13" font-family="sans-serif">遅延: 20〜40 ms (LEO)</text>
  <text x="200" y="214" text-anchor="middle" fill="${ORANGE}" font-size="13" font-family="sans-serif">降雨・障害の影響あり</text>
  <text x="200" y="236" text-anchor="middle" fill="${GREEN}" font-size="13" font-family="sans-serif">地形を選ばない</text>
  <text x="200" y="258" text-anchor="middle" fill="${GREEN}" font-size="13" font-family="sans-serif">即時展開可能</text>
  <text x="200" y="290" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-family="sans-serif">Starlink全衛星 = ケーブル1〜2本分</text>
  <text x="200" y="310" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">→ 補完だが代替不可</text>
  <!-- Cable side -->
  <rect x="440" y="55" width="320" height="310" rx="10" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="600" y="82" text-anchor="middle" fill="${ACCENT1}" font-size="16" font-weight="bold" font-family="sans-serif">海底ケーブル</text>
  <!-- cable icon -->
  <path d="M520 130 Q600 110 680 130" fill="none" stroke="${ACCENT1}" stroke-width="6"/>
  <circle cx="520" cy="130" r="8" fill="${ACCENT1}"/>
  <circle cx="680" cy="130" r="8" fill="${ACCENT1}"/>
  <text x="600" y="170" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">帯域: 数百 Tbps / 本</text>
  <text x="600" y="192" text-anchor="middle" fill="${GREEN}" font-size="13" font-family="sans-serif">遅延: 数十〜200 ms</text>
  <text x="600" y="214" text-anchor="middle" fill="${GREEN}" font-size="13" font-family="sans-serif">天候の影響なし</text>
  <text x="600" y="236" text-anchor="middle" fill="${ORANGE}" font-size="13" font-family="sans-serif">敷設: 数年・数千億円</text>
  <text x="600" y="258" text-anchor="middle" fill="${ORANGE}" font-size="13" font-family="sans-serif">切断修復に数週間〜数ヶ月</text>
  <text x="600" y="290" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-family="sans-serif">全トラフィックの 99% を担う</text>
  <text x="600" y="310" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">→ インターネットの本体</text>
</svg>`;

// SVG: bandwidth capacity timeline
const svgBandwidthTimeline = `<svg viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="380" fill="${BG}"/>
  <text x="400" y="32" text-anchor="middle" fill="${ACCENT1}" font-size="19" font-weight="bold" font-family="sans-serif">海底ケーブル帯域容量の進化</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="740" y2="320" stroke="${TEXT}" stroke-width="1.5"/>
  <line x1="80" y1="320" x2="80" y2="55" stroke="${TEXT}" stroke-width="1.5"/>
  <!-- Y axis label -->
  <text x="20" y="190" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif" transform="rotate(-90,20,190)">容量 (Tbps)</text>
  <!-- X labels -->
  <text x="130" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">1988</text>
  <text x="230" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">1995</text>
  <text x="340" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">2000</text>
  <text x="450" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">2010</text>
  <text x="560" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">2018</text>
  <text x="680" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">2024</text>
  <!-- Y labels -->
  <text x="72" y="316" text-anchor="end" fill="${TEXT}" font-size="11" font-family="sans-serif">0</text>
  <text x="72" y="240" text-anchor="end" fill="${TEXT}" font-size="11" font-family="sans-serif">200</text>
  <text x="72" y="170" text-anchor="end" fill="${TEXT}" font-size="11" font-family="sans-serif">400</text>
  <text x="72" y="105" text-anchor="end" fill="${TEXT}" font-size="11" font-family="sans-serif">600</text>
  <!-- Grid lines -->
  <line x1="80" y1="240" x2="740" y2="240" stroke="${BOX}" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="80" y1="170" x2="740" y2="170" stroke="${BOX}" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="80" y1="105" x2="740" y2="105" stroke="${BOX}" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Bars: each bar height proportional to capacity -->
  <!-- TAT-8 1988: 0.04 Tbps ≈ negligible, show tiny -->
  <rect x="115" y="314" width="30" height="6" fill="${ACCENT3}" rx="2"/>
  <text x="130" y="307" text-anchor="middle" fill="${ACCENT3}" font-size="9" font-family="sans-serif">0.04</text>
  <!-- 1995: ~1 Tbps -->
  <rect x="215" y="312" width="30" height="8" fill="${ACCENT3}" rx="2"/>
  <text x="230" y="305" text-anchor="middle" fill="${ACCENT3}" font-size="9" font-family="sans-serif">1</text>
  <!-- 2000: ~10 Tbps -->
  <rect x="325" y="300" width="30" height="20" fill="${ACCENT1}" rx="2"/>
  <text x="340" y="293" text-anchor="middle" fill="${ACCENT1}" font-size="9" font-family="sans-serif">10</text>
  <!-- 2010: ~100 Tbps -->
  <rect x="435" y="240" width="30" height="80" fill="${ACCENT1}" rx="2"/>
  <text x="450" y="233" text-anchor="middle" fill="${ACCENT1}" font-size="9" font-family="sans-serif">100</text>
  <!-- 2018: ~400 Tbps -->
  <rect x="545" y="170" width="30" height="150" fill="${ACCENT2}" rx="2"/>
  <text x="560" y="163" text-anchor="middle" fill="${ACCENT2}" font-size="9" font-family="sans-serif">400</text>
  <!-- 2024: ~600 Tbps+ -->
  <rect x="665" y="108" width="30" height="212" fill="${ACCENT2}" rx="2"/>
  <text x="680" y="101" text-anchor="middle" fill="${ACCENT2}" font-size="10" font-weight="bold" font-family="sans-serif">600+</text>
  <text x="400" y="368" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">AI・クラウド需要で急拡大 → 敷設ラッシュ再燃中</text>
</svg>`;

// SVG: ownership concentration (hyperscalers)
const svgOwnershipConcentration = `<svg viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="380" fill="${BG}"/>
  <text x="400" y="32" text-anchor="middle" fill="${ACCENT1}" font-size="19" font-weight="bold" font-family="sans-serif">国際帯域の所有構造（2025年推計）</text>
  <!-- Donut chart area -->
  <!-- We'll use a bar chart to avoid url(#) gradients -->
  <!-- Players -->
  <rect x="60" y="60" width="680" height="60" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="90" y="86" fill="${ACCENT1}" font-size="14" font-weight="bold" font-family="sans-serif">ハイパースケーラー (Google / Meta / Amazon / Microsoft)</text>
  <text x="90" y="108" fill="${TEXT}" font-size="13" font-family="sans-serif">国際帯域の 60%超 を所有・占有（2025年推計）</text>
  <!-- Bar chart: ownership share -->
  <text x="400" y="155" text-anchor="middle" fill="${TEXT}" font-size="14" font-family="sans-serif">所有・利用帯域シェア（推計）</text>
  <!-- Bar: Google -->
  <rect x="80" y="170" width="200" height="36" fill="${ACCENT1}" rx="4"/>
  <text x="288" y="193" fill="${ACCENT1}" font-size="13" font-family="sans-serif">Google: ~25%</text>
  <!-- Bar: Meta -->
  <rect x="80" y="216" width="140" height="36" fill="${ACCENT2}" rx="4"/>
  <text x="228" y="239" fill="${ACCENT2}" font-size="13" font-family="sans-serif">Meta: ~17%</text>
  <!-- Bar: Amazon -->
  <rect x="80" y="262" width="120" height="36" fill="${ACCENT3}" rx="4"/>
  <text x="208" y="285" fill="${ACCENT3}" font-size="13" font-family="sans-serif">Amazon: ~12%</text>
  <!-- Bar: Microsoft -->
  <rect x="80" y="308" width="100" height="36" fill="${GREEN}" rx="4"/>
  <text x="188" y="331" fill="${GREEN}" font-size="13" font-family="sans-serif">Microsoft: ~10%</text>
  <!-- Bar: Telecom consortia -->
  <rect x="80" y="170" width="0" height="0" fill="none"/>
  <rect x="520" y="170" width="220" height="174" rx="4" fill="${BOX}" stroke="#555" stroke-width="1"/>
  <text x="630" y="200" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">テレコムコンソーシアム</text>
  <text x="630" y="222" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">NTT, KDDI, AT&amp;T 等</text>
  <text x="630" y="260" text-anchor="middle" fill="#aaa" font-size="22" font-weight="bold" font-family="sans-serif">~36%</text>
  <text x="630" y="310" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-family="sans-serif">ハイパースケーラーが</text>
  <text x="630" y="330" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-family="sans-serif">急速に比率を拡大</text>
</svg>`;

// SVG: cable laying ship diagram
const svgCableShip = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="30" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">海底ケーブル敷設プロセス</text>
  <!-- Ocean -->
  <rect x="0" y="180" width="800" height="180" fill="#0d2137"/>
  <text x="60" y="210" fill="${ACCENT3}" font-size="12" font-family="sans-serif" opacity="0.7">海面</text>
  <!-- Seabed -->
  <rect x="0" y="310" width="800" height="50" fill="#0a1628"/>
  <text x="60" y="336" fill="#555" font-size="11" font-family="sans-serif">海底（深度 〜6,000m）</text>
  <!-- Cable ship -->
  <rect x="120" y="130" width="160" height="55" rx="8" fill="#2a4a6a" stroke="${ACCENT3}" stroke-width="1.5"/>
  <polygon points="280,157 320,157 300,185" fill="#2a4a6a" stroke="${ACCENT3}" stroke-width="1.5"/>
  <rect x="170" y="108" width="30" height="25" fill="#1e3a5a" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="200" y="165" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">Cable Ship</text>
  <text x="200" y="180" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-family="sans-serif">世界に 60〜70隻</text>
  <!-- Cable deployment line -->
  <path d="M300 185 Q400 260 500 310" fill="none" stroke="${ACCENT1}" stroke-width="4"/>
  <!-- Arrow -->
  <polygon points="496,304 508,314 503,302" fill="${ACCENT1}"/>
  <!-- Cable on seabed -->
  <path d="M500 310 Q600 315 700 312" fill="none" stroke="${ACCENT1}" stroke-width="4"/>
  <!-- Depth indicators -->
  <line x1="440" y1="185" x2="440" y2="310" stroke="#555" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="448" y="250" fill="#aaa" font-size="11" font-family="sans-serif">水深</text>
  <text x="448" y="264" fill="#aaa" font-size="11" font-family="sans-serif">〜6,000m</text>
  <!-- Steps -->
  <rect x="500" y="60" width="260" height="110" rx="8" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="630" y="84" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">敷設フロー</text>
  <text x="516" y="104" fill="${TEXT}" font-size="11" font-family="sans-serif">① ルート調査・海底地形スキャン</text>
  <text x="516" y="120" fill="${TEXT}" font-size="11" font-family="sans-serif">② ケーブルを船に積み込み（数千km）</text>
  <text x="516" y="136" fill="${TEXT}" font-size="11" font-family="sans-serif">③ 精密敷設（誤差 数m以内）</text>
  <text x="516" y="152" fill="${TEXT}" font-size="11" font-family="sans-serif">④ 中継器設置・接続テスト</text>
  <text x="516" y="170" fill="${ACCENT2}" font-size="11" font-family="sans-serif">修理依頼から着工まで数週間〜数ヶ月待ち</text>
</svg>`;

// SVG: threat causes pie (fishing/anchors vs natural vs sabotage)
const svgThreatCauses = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="30" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">切断原因の内訳（統計）</text>
  <!-- Large arc-like bar representation -->
  <!-- Fishing/Anchors: 70-80% -->
  <rect x="60" y="65" width="510" height="65" rx="6" fill="${ACCENT2}"/>
  <text x="80" y="94" fill="${TEXT}" font-size="15" font-weight="bold" font-family="sans-serif">漁業・アンカー事故</text>
  <text x="80" y="116" fill="${TEXT}" font-size="13" font-family="sans-serif">トロール網・錨の引っかかり（浅海・大陸棚）</text>
  <text x="585" y="104" fill="${TEXT}" font-size="22" font-weight="bold" font-family="sans-serif">70〜80%</text>
  <!-- Natural: 10-15% -->
  <rect x="60" y="148" width="115" height="55" rx="6" fill="${ACCENT1}"/>
  <text x="118" y="172" text-anchor="middle" fill="${BG}" font-size="13" font-weight="bold" font-family="sans-serif">自然障害</text>
  <text x="118" y="190" text-anchor="middle" fill="${BG}" font-size="12" font-family="sans-serif">地震・海流</text>
  <text x="185" y="175" fill="${ACCENT1}" font-size="16" font-weight="bold" font-family="sans-serif">10〜15%</text>
  <!-- Equipment: 5% -->
  <rect x="60" y="222" width="55" height="50" rx="6" fill="${ACCENT3}"/>
  <text x="88" y="244" text-anchor="middle" fill="${BG}" font-size="11" font-weight="bold" font-family="sans-serif">機器</text>
  <text x="88" y="260" text-anchor="middle" fill="${BG}" font-size="10" font-family="sans-serif">故障</text>
  <text x="124" y="250" fill="${ACCENT3}" font-size="14" font-weight="bold" font-family="sans-serif">~5%</text>
  <!-- Sabotage: 1-2% -->
  <rect x="60" y="285" width="25" height="46" rx="4" fill="${ORANGE}"/>
  <text x="95" y="315" fill="${ORANGE}" font-size="13" font-weight="bold" font-family="sans-serif">意図的破壊工作 (1〜2% ただし急増中)</text>
  <!-- Key insight -->
  <rect x="480" y="148" width="280" height="183" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="620" y="172" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">なぜ防げないのか</text>
  <text x="496" y="196" fill="${TEXT}" font-size="11" font-family="sans-serif">- 海図掲載はあるが遵守は任意</text>
  <text x="496" y="214" fill="${TEXT}" font-size="11" font-family="sans-serif">- 嵐・視界不良でのアンカー投下</text>
  <text x="496" y="232" fill="${TEXT}" font-size="11" font-family="sans-serif">- 水深200m以下は保護コーティングのみ</text>
  <text x="496" y="252" fill="${TEXT}" font-size="11" font-family="sans-serif">- 漁船の数は世界中で数百万隻</text>
  <text x="496" y="280" fill="${ACCENT1}" font-size="11" font-family="sans-serif">ケーブル1本の年間切断確率:</text>
  <text x="496" y="298" fill="${ACCENT1}" font-size="14" font-weight="bold" font-family="sans-serif">約 0.1〜0.5 回</text>
  <text x="496" y="318" fill="#aaa" font-size="10" font-family="sans-serif">（全400本 → 年間40〜200件の切断）</text>
</svg>`;

// SVG: Red Sea chokepoint
const svgRedSeaChokepoint = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">紅海チョークポイントの脆弱性</text>
  <!-- Map background - simplified -->
  <rect x="40" y="45" width="720" height="280" rx="8" fill="#0d2137"/>
  <!-- Europe region -->
  <rect x="160" y="55" width="120" height="60" rx="6" fill="#1a3a5a"/>
  <text x="220" y="82" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-weight="bold" font-family="sans-serif">欧州</text>
  <!-- Middle East -->
  <rect x="340" y="130" width="100" height="50" rx="6" fill="#1a3a5a"/>
  <text x="390" y="158" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">中東</text>
  <!-- Asia region -->
  <rect x="560" y="55" width="140" height="60" rx="6" fill="#1a3a5a"/>
  <text x="630" y="82" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-weight="bold" font-family="sans-serif">アジア</text>
  <!-- Africa region -->
  <rect x="160" y="200" width="140" height="60" rx="6" fill="#1a3a5a"/>
  <text x="230" y="228" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">アフリカ</text>
  <!-- Cable lines through Red Sea -->
  <path d="M280 85 Q340 120 390 135 Q440 160 560 80" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <path d="M280 95 Q338 128 388 145 Q442 168 560 90" fill="none" stroke="${ACCENT2}" stroke-width="2.5"/>
  <path d="M280 105 Q335 135 385 155 Q445 176 560 100" fill="none" stroke="${ACCENT3}" stroke-width="2"/>
  <!-- Red Sea chokepoint marker -->
  <circle cx="390" cy="145" r="18" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="390" y="145" text-anchor="middle" dominant-baseline="middle" fill="${ACCENT2}" font-size="18" font-weight="bold" font-family="sans-serif">!</text>
  <!-- Label -->
  <rect x="410" y="90" width="180" height="65" rx="6" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="500" y="110" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">紅海チョークポイント</text>
  <text x="500" y="128" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">欧〜アジアケーブルの ~70%</text>
  <text x="500" y="146" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">2024年4本同時切断</text>
  <!-- Alternative route -->
  <path d="M280 230 Q230 270 240 300 Q380 330 500 280 Q580 240 560 110" fill="none" stroke="#555" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="310" y="300" fill="#888" font-size="11" font-family="sans-serif">アフリカ回り迂回</text>
  <text x="310" y="315" fill="${ORANGE}" font-size="11" font-family="sans-serif">(レイテンシ 2〜5倍)</text>
  <!-- Stats box -->
  <rect x="50" y="240" width="250" height="76" rx="6" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="175" y="258" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">2024年紅海障害の影響</text>
  <text x="66" y="274" fill="${TEXT}" font-size="11" font-family="sans-serif">欧〜アジア帯域: 25〜30% 喪失</text>
  <text x="66" y="290" fill="${TEXT}" font-size="11" font-family="sans-serif">インド: 国際帯域 55% 影響</text>
  <text x="66" y="306" fill="${TEXT}" font-size="11" font-family="sans-serif">修復: 最長 5〜6ヶ月</text>
</svg>`;

// SVG: BGP rerouting diagram
const svgBGPRerouting = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">BGP自動再ルーティングの仕組み</text>
  <!-- Node A: Tokyo -->
  <circle cx="120" cy="180" r="36" fill="${BOX}" stroke="${ACCENT3}" stroke-width="2"/>
  <text x="120" y="176" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-weight="bold" font-family="sans-serif">東京</text>
  <text x="120" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">AS4713</text>
  <!-- Node B: Singapore -->
  <circle cx="330" cy="120" r="30" fill="${BOX}" stroke="${ACCENT3}" stroke-width="2"/>
  <text x="330" y="116" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">SG</text>
  <text x="330" y="132" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">経由点</text>
  <!-- Node C: Dubai (cut) -->
  <circle cx="500" cy="180" r="30" fill="#3a1a1a" stroke="${ACCENT2}" stroke-width="2"/>
  <text x="500" y="176" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-weight="bold" font-family="sans-serif">紅海</text>
  <text x="500" y="192" text-anchor="middle" fill="${ACCENT2}" font-size="10" font-family="sans-serif">✕ 切断</text>
  <!-- Node D: Frankfurt -->
  <circle cx="680" cy="180" r="36" fill="${BOX}" stroke="${ACCENT3}" stroke-width="2"/>
  <text x="680" y="176" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-weight="bold" font-family="sans-serif">欧州</text>
  <text x="680" y="192" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">AS3320</text>
  <!-- Normal route (crossed out) -->
  <line x1="156" y1="180" x2="470" y2="180" stroke="${ACCENT2}" stroke-width="2.5" stroke-dasharray="8,4"/>
  <line x1="530" y1="180" x2="644" y2="180" stroke="${ACCENT2}" stroke-width="2.5" stroke-dasharray="8,4"/>
  <text x="400" y="170" text-anchor="middle" fill="${ACCENT2}" font-size="11" font-family="sans-serif">通常経路（切断）</text>
  <!-- Reroute path -->
  <path d="M156 180 Q240 60 330 120" fill="none" stroke="${GREEN}" stroke-width="3"/>
  <path d="M360 120 Q530 60 644 180" fill="none" stroke="${GREEN}" stroke-width="3"/>
  <!-- Arrow at end -->
  <polygon points="640,176 656,180 640,184" fill="${GREEN}"/>
  <text x="400" y="75" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">BGP再ルーティング（自動）</text>
  <!-- Cape route -->
  <circle cx="330" cy="290" r="28" fill="${BOX}" stroke="#555" stroke-width="1.5"/>
  <text x="330" y="287" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">喜望峰</text>
  <text x="330" y="302" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">迂回</text>
  <path d="M156 190 Q200 280 302 290" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="5,3"/>
  <path d="M358 290 Q500 310 644 190" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- Latency impact box -->
  <rect x="540" y="240" width="220" height="95" rx="6" fill="${BOX}" stroke="${ORANGE}" stroke-width="1.5"/>
  <text x="650" y="260" text-anchor="middle" fill="${ORANGE}" font-size="12" font-weight="bold" font-family="sans-serif">レイテンシ影響</text>
  <text x="556" y="278" fill="${TEXT}" font-size="11" font-family="sans-serif">通常: 東京〜ロンドン 230ms</text>
  <text x="556" y="296" fill="${ORANGE}" font-size="11" font-family="sans-serif">迂回: 350〜500ms (+100%)</text>
  <text x="556" y="316" fill="${TEXT}" font-size="11" font-family="sans-serif">輻輳時: パケットロス多発</text>
  <text x="556" y="332" fill="#aaa" font-size="10" font-family="sans-serif">FX・ゲーム・ビデオ会議に影響</text>
</svg>`;

// SVG: redundancy limitation diagram
const svgRedundancyLimitation = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">「冗長構成なのになぜ壊れるのか」</text>
  <!-- Left: multiple cables same route -->
  <rect x="40" y="50" width="340" height="275" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="210" y="76" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">危険なパターン</text>
  <!-- Chokepoint -->
  <rect x="155" y="95" width="110" height="36" rx="6" fill="#3a1a1a" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="210" y="118" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">チョークポイント</text>
  <!-- 3 cables same path -->
  <line x1="80" y1="150" x2="370" y2="150" stroke="${ACCENT2}" stroke-width="3"/>
  <line x1="80" y1="165" x2="370" y2="165" stroke="${ACCENT2}" stroke-width="3"/>
  <line x1="80" y1="180" x2="370" y2="180" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="210" y="210" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">3本のケーブルが同ルート</text>
  <text x="210" y="228" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">同じ陸揚げ局に接続</text>
  <!-- X mark -->
  <line x1="185" y1="140" x2="235" y2="190" stroke="${ACCENT2}" stroke-width="5"/>
  <line x1="235" y1="140" x2="185" y2="190" stroke="${ACCENT2}" stroke-width="5"/>
  <text x="210" y="260" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">一点障害で全滅</text>
  <text x="210" y="280" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">主要 vs 迂回: 5〜10倍の容量差</text>
  <text x="210" y="298" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">修理船の供給不足も常態化</text>
  <!-- Right: better pattern -->
  <rect x="420" y="50" width="340" height="275" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="590" y="76" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">望ましいパターン</text>
  <!-- Diverse routes -->
  <circle cx="470" cy="180" r="22" fill="#1a3a1a" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="470" y="184" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">A端</text>
  <circle cx="710" cy="180" r="22" fill="#1a3a1a" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="710" y="184" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">B端</text>
  <!-- Route 1 -->
  <path d="M492 172 Q590 120 688 172" fill="none" stroke="${GREEN}" stroke-width="2.5"/>
  <text x="590" y="138" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">経路① (異なるルート)</text>
  <!-- Route 2 -->
  <path d="M492 188 Q590 240 688 188" fill="none" stroke="${ACCENT3}" stroke-width="2.5"/>
  <text x="590" y="252" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-family="sans-serif">経路② (異なる陸揚げ局)</text>
  <text x="590" y="280" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">地理的に分散した冗長性</text>
  <text x="590" y="300" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">同一チョークポイントを通らない</text>
</svg>`;

// SVG: repair process timeline
const svgRepairProcess = `<svg viewBox="0 0 800 330" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="330" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">ケーブル切断から修復までのタイムライン</text>
  <!-- Timeline bar -->
  <line x1="60" y1="130" x2="740" y2="130" stroke="#555" stroke-width="2"/>
  <!-- Steps -->
  <!-- Step 1: Detection -->
  <circle cx="100" cy="130" r="12" fill="${ACCENT1}"/>
  <text x="100" y="108" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">検知</text>
  <text x="100" y="155" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">数分〜数時間</text>
  <text x="100" y="170" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">OTDRで</text>
  <text x="100" y="184" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">位置特定</text>
  <!-- Step 2: Ship dispatch -->
  <circle cx="250" cy="130" r="12" fill="${ACCENT1}"/>
  <text x="250" y="108" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">船手配</text>
  <text x="250" y="155" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">数日〜数週間</text>
  <text x="250" y="170" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">修理船は</text>
  <text x="250" y="184" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">世界共有</text>
  <!-- Step 3: Transit -->
  <circle cx="420" cy="130" r="12" fill="${ACCENT2}"/>
  <text x="420" y="108" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">移動</text>
  <text x="420" y="155" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">数日〜数週間</text>
  <text x="420" y="170" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">現場まで</text>
  <text x="420" y="184" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">の航行</text>
  <!-- Step 4: Repair -->
  <circle cx="590" cy="130" r="12" fill="${ACCENT2}"/>
  <text x="590" y="108" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">修理</text>
  <text x="590" y="155" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">数日〜数週間</text>
  <text x="590" y="170" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">深海引き上げ・</text>
  <text x="590" y="184" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">接続・テスト</text>
  <!-- Step 5: Restore -->
  <circle cx="730" cy="130" r="12" fill="${GREEN}"/>
  <text x="730" y="108" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">復旧</text>
  <text x="730" y="155" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">完了</text>
  <!-- Summary -->
  <rect x="60" y="210" width="680" height="100" rx="8" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="400" y="230" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">実績別修復期間</text>
  <text x="160" y="255" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-family="sans-serif">浅海・近海</text>
  <text x="160" y="273" text-anchor="middle" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">1〜2週間</text>
  <text x="370" y="255" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-family="sans-serif">深海・遠方</text>
  <text x="370" y="273" text-anchor="middle" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">2〜3ヶ月</text>
  <text x="600" y="255" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-family="sans-serif">複数同時切断</text>
  <text x="600" y="273" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">最長 5〜6ヶ月</text>
  <text x="400" y="300" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">修理コスト: 100万〜300万ドル / 件　修理船日当: 数十万ドル</text>
</svg>`;

// SVG: cloud service impact scenario
const svgCloudImpact = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">クラウドサービスへの影響シナリオ</text>
  <!-- Normal scenario -->
  <rect x="40" y="48" width="336" height="285" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="208" y="72" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">通常時</text>
  <!-- Region Tokyo -->
  <rect x="65" y="88" width="120" height="50" rx="6" fill="#1a3a1a" stroke="${GREEN}" stroke-width="1"/>
  <text x="125" y="110" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">ap-northeast-1</text>
  <text x="125" y="126" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">東京</text>
  <!-- Region Ireland -->
  <rect x="195" y="88" width="120" height="50" rx="6" fill="#1a3a1a" stroke="${GREEN}" stroke-width="1"/>
  <text x="255" y="110" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">eu-west-1</text>
  <text x="255" y="126" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">アイルランド</text>
  <!-- Normal connection -->
  <line x1="185" y1="113" x2="195" y2="113" stroke="${GREEN}" stroke-width="2"/>
  <text x="208" y="162" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">レイテンシ: 150ms</text>
  <text x="208" y="180" text-anchor="middle" fill="${GREEN}" font-size="12" font-family="sans-serif">同期書き込み: 正常</text>
  <text x="208" y="220" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">影響を受けやすいサービス:</text>
  <text x="208" y="240" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Aurora Global DB</text>
  <text x="208" y="258" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Cloud Spanner</text>
  <text x="208" y="276" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">CDN オリジンフェッチ</text>
  <text x="208" y="296" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">認証サーバー集中構成</text>
  <!-- Failure scenario -->
  <rect x="424" y="48" width="336" height="285" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="592" y="72" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">ケーブル切断時</text>
  <!-- Region Tokyo -->
  <rect x="449" y="88" width="120" height="50" rx="6" fill="#1a3a1a" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="509" y="110" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">ap-northeast-1</text>
  <text x="509" y="126" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">東京</text>
  <!-- Region Ireland -->
  <rect x="579" y="88" width="120" height="50" rx="6" fill="#1a3a1a" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="639" y="110" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">eu-west-1</text>
  <text x="639" y="126" text-anchor="middle" fill="${TEXT}" font-size="10" font-family="sans-serif">アイルランド</text>
  <!-- Broken connection -->
  <line x1="569" y1="108" x2="579" y2="108" stroke="${ACCENT2}" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="574" y="102" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">✕</text>
  <text x="592" y="162" text-anchor="middle" fill="${ORANGE}" font-size="12" font-family="sans-serif">レイテンシ: 500ms以上</text>
  <text x="592" y="180" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-family="sans-serif">同期書き込み: 失敗</text>
  <text x="592" y="220" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">障害影響:</text>
  <text x="592" y="240" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">DBレプリケーション遅延</text>
  <text x="592" y="258" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">キャッシュミス → 高負荷</text>
  <text x="592" y="276" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">認証タイムアウト多発</text>
  <text x="592" y="296" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">→ アプリ機能停止</text>
</svg>`;

// SVG: geopolitical actors
const svgGeopoliticalActors = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">海底ケーブルをめぐる地政学的アクター</text>
  <!-- Russia box -->
  <rect x="40" y="50" width="220" height="130" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="150" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">ロシア</text>
  <text x="55" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">ヤンタール号: 特殊調査船</text>
  <text x="55" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">Belgorod原潜: 海底破壊能力疑い</text>
  <text x="55" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">NATOケーブルルートを調査中</text>
  <text x="55" y="154" fill="${ORANGE}" font-size="11" font-family="sans-serif">バルト海2024切断に関与疑惑</text>
  <!-- China box -->
  <rect x="290" y="50" width="220" height="130" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">中国</text>
  <text x="305" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">海上民兵: ケーブル通過域で活動</text>
  <text x="305" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">HMN Technologies: 建設業者</text>
  <text x="305" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">馬祖2023: ケーブル2本切断</text>
  <text x="305" y="154" fill="${ORANGE}" font-size="11" font-family="sans-serif">Yi Peng 3号: 調査拒否</text>
  <!-- Western response box -->
  <rect x="540" y="50" width="220" height="130" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="650" y="74" text-anchor="middle" fill="${GREEN}" font-size="14" font-weight="bold" font-family="sans-serif">NATO・西側</text>
  <text x="555" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">NATO海底インフラ調整セル設立</text>
  <text x="555" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">水中ドローン・音響センサー配備</text>
  <text x="555" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">英国: Royal Navy 定期パトロール</text>
  <text x="555" y="154" fill="${ACCENT3}" font-size="11" font-family="sans-serif">EU: 重要インフラ保護指令(2023)</text>
  <!-- Vulnerability row -->
  <rect x="40" y="200" width="720" height="130" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="222" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">グレーゾーン攻撃の課題</text>
  <rect x="60" y="235" width="200" height="78" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="160" y="254" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">法的曖昧さ</text>
  <text x="160" y="272" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">「武力攻撃」認定が困難</text>
  <text x="160" y="290" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">NATO5条の発動基準不明確</text>
  <text x="160" y="308" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">「事故」と区別できない</text>
  <rect x="300" y="235" width="200" height="78" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="400" y="254" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">外交的困難</text>
  <text x="400" y="272" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">証拠収集の限界（深海）</text>
  <text x="400" y="290" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">乗船調査を拒否可能</text>
  <text x="400" y="308" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">制裁への対抗措置リスク</text>
  <rect x="540" y="235" width="200" height="78" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="640" y="254" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">抑止力の弱さ</text>
  <text x="640" y="272" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">切断しなくても「脅し」に使える</text>
  <text x="640" y="290" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">平時に情報収集だけでも価値大</text>
  <text x="640" y="308" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">修理費用は相手国持ち</text>
</svg>`;

// SVG: engineer design patterns
const svgEngineerPatterns = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">ケーブル障害を前提とした設計パターン</text>
  <!-- Pattern 1: Geographic diversity -->
  <rect x="40" y="50" width="220" height="135" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="150" y="74" text-anchor="middle" fill="${ACCENT3}" font-size="13" font-weight="bold" font-family="sans-serif">地理的分散</text>
  <text x="55" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">同一チョークポイントを</text>
  <text x="55" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">通らない複数経路を確保</text>
  <text x="55" y="134" fill="${ACCENT1}" font-size="11" font-family="sans-serif">例: 紅海 + 喜望峰周り</text>
  <text x="55" y="152" fill="#aaa" font-size="10" font-family="sans-serif">クラウドリージョン選定基準に</text>
  <text x="55" y="166" fill="#aaa" font-size="10" font-family="sans-serif">ケーブルルートを含める</text>
  <!-- Pattern 2: Async -->
  <rect x="290" y="50" width="220" height="135" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">非同期化</text>
  <text x="305" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">国際通信をクリティカル</text>
  <text x="305" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">パスから外す設計</text>
  <text x="305" y="134" fill="${ACCENT1}" font-size="11" font-family="sans-serif">書き込み: ローカル確認後に</text>
  <text x="305" y="150" fill="${ACCENT1}" font-size="11" font-family="sans-serif">非同期でグローバル同期</text>
  <text x="305" y="168" fill="#aaa" font-size="10" font-family="sans-serif">最終整合性モデルで設計</text>
  <!-- Pattern 3: Local cache -->
  <rect x="540" y="50" width="220" height="135" rx="8" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="650" y="74" text-anchor="middle" fill="${GREEN}" font-size="13" font-weight="bold" font-family="sans-serif">ローカルキャッシュ強化</text>
  <text x="555" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">海外オリジンへの依存を減らす</text>
  <text x="555" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">地域CDN + ローカルDBを活用</text>
  <text x="555" y="136" fill="${GREEN}" font-size="11" font-family="sans-serif">認証: リージョンローカルで完結</text>
  <text x="555" y="154" fill="${GREEN}" font-size="11" font-family="sans-serif">コンテンツ: エッジキャッシュ</text>
  <text x="555" y="170" fill="#aaa" font-size="10" font-family="sans-serif">オリジン依存を最小化</text>
  <!-- Bottom: Testing -->
  <rect x="40" y="210" width="720" height="125" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1"/>
  <text x="400" y="232" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">障害訓練の実施</text>
  <rect x="60" y="244" width="200" height="76" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="160" y="263" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">カオスエンジニアリング</text>
  <text x="160" y="281" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">国際通信を意図的にブロック</text>
  <text x="160" y="299" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ケーブル断絶シミュレーション</text>
  <text x="160" y="315" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">を定期テストに組み込む</text>
  <rect x="300" y="244" width="200" height="76" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="400" y="263" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">レイテンシ劣化テスト</text>
  <text x="400" y="281" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">tc / netem で意図的に</text>
  <text x="400" y="299" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">遅延10倍の状態で動作確認</text>
  <text x="400" y="315" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タイムアウト値の見直し</text>
  <rect x="540" y="244" width="200" height="76" rx="6" fill="#1a1a2e" stroke="#555" stroke-width="1"/>
  <text x="640" y="263" text-anchor="middle" fill="${TEXT}" font-size="11" font-weight="bold" font-family="sans-serif">SLA・契約の見直し</text>
  <text x="640" y="281" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">不可抗力免責条項の確認</text>
  <text x="640" y="299" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">クラウドベンダー責任範囲</text>
  <text x="640" y="315" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">自社SLAへの影響検討</text>
</svg>`;

// SVG: global cable stats overview
const svgCableStats = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">海底ケーブルの規模感</text>
  <!-- Stat cards -->
  <rect x="40" y="50" width="160" height="120" rx="10" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="120" y="85" text-anchor="middle" fill="${ACCENT1}" font-size="30" font-weight="bold" font-family="sans-serif">400+</text>
  <text x="120" y="110" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">本のケーブル</text>
  <text x="120" y="130" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">世界全体</text>
  <text x="120" y="160" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">（2024年時点）</text>

  <rect x="220" y="50" width="160" height="120" rx="10" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="300" y="82" text-anchor="middle" fill="${ACCENT3}" font-size="24" font-weight="bold" font-family="sans-serif">130万km</text>
  <text x="300" y="108" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">総延長</text>
  <text x="300" y="130" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">地球30周以上</text>
  <text x="300" y="158" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">月まで3.4往復分</text>

  <rect x="400" y="50" width="160" height="120" rx="10" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="480" y="82" text-anchor="middle" fill="${ACCENT2}" font-size="28" font-weight="bold" font-family="sans-serif">99%+</text>
  <text x="480" y="108" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">トラフィック</text>
  <text x="480" y="130" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">全国際通信</text>
  <text x="480" y="158" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">衛星は1%未満</text>

  <rect x="580" y="50" width="180" height="120" rx="10" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="670" y="82" text-anchor="middle" fill="${GREEN}" font-size="22" font-weight="bold" font-family="sans-serif">10兆ドル+</text>
  <text x="670" y="106" text-anchor="middle" fill="${TEXT}" font-size="13" font-family="sans-serif">金融決済 / 日</text>
  <text x="670" y="128" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">SWIFT・FX市場</text>
  <text x="670" y="156" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ケーブル依存</text>

  <!-- Additional stats row -->
  <rect x="40" y="195" width="720" height="120" rx="8" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="400" y="218" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">知られていない事実</text>
  <text x="130" y="245" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">年間切断件数</text>
  <text x="130" y="265" text-anchor="middle" fill="${ACCENT2}" font-size="18" font-weight="bold" font-family="sans-serif">100〜200件</text>
  <text x="130" y="286" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">（公表されない事例も多い）</text>
  <text x="400" y="245" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">修理船の世界合計</text>
  <text x="400" y="265" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">60〜70隻</text>
  <text x="400" y="286" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">（建造に5〜7年かかる）</text>
  <text x="650" y="245" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">敷設コスト（1km）</text>
  <text x="650" y="265" text-anchor="middle" fill="${GREEN}" font-size="18" font-weight="bold" font-family="sans-serif">数百万〜</text>
  <text x="650" y="283" text-anchor="middle" fill="${GREEN}" font-size="18" font-weight="bold" font-family="sans-serif">数千万円</text>
</svg>`;

// SVG: Baltic Sea incident
const svgBalticIncident = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">バルト海ケーブル切断事件（2024年11月）</text>
  <!-- Map area -->
  <rect x="40" y="45" width="440" height="290" rx="8" fill="#0d2137"/>
  <!-- Country labels -->
  <rect x="100" y="60" width="80" height="35" rx="4" fill="#1a3a5a"/>
  <text x="140" y="82" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">フィンランド</text>
  <rect x="90" y="200" width="80" height="35" rx="4" fill="#1a3a5a"/>
  <text x="130" y="222" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">エストニア</text>
  <rect x="270" y="230" width="70" height="35" rx="4" fill="#1a3a5a"/>
  <text x="305" y="252" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">ドイツ</text>
  <rect x="370" y="130" width="80" height="35" rx="4" fill="#1a3a5a"/>
  <text x="410" y="152" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">スウェーデン</text>
  <!-- Cable 1: Estlink-2 -->
  <path d="M140 95 Q155 155 130 195" fill="none" stroke="${ACCENT1}" stroke-width="3"/>
  <text x="75" y="148" fill="${ACCENT1}" font-size="10" font-family="sans-serif">Estlink-2</text>
  <text x="75" y="161" fill="#aaa" font-size="9" font-family="sans-serif">(電力ケーブル)</text>
  <!-- Cable 2: C-Lion 1 -->
  <path d="M140 95 Q220 160 270 225" fill="none" stroke="${ACCENT3}" stroke-width="3"/>
  <text x="215" y="178" fill="${ACCENT3}" font-size="10" font-family="sans-serif">C-Lion 1</text>
  <text x="215" y="191" fill="#aaa" font-size="9" font-family="sans-serif">(通信ケーブル)</text>
  <!-- Cut markers -->
  <circle cx="145" cy="148" r="10" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="145" y="152" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">✕</text>
  <circle cx="215" cy="173" r="10" fill="none" stroke="${ACCENT2}" stroke-width="3"/>
  <text x="215" y="177" text-anchor="middle" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">✕</text>
  <!-- Ship path -->
  <path d="M365 80 Q300 120 220 160 Q190 200 380 165" fill="none" stroke="${ORANGE}" stroke-width="2" stroke-dasharray="6,3"/>
  <!-- Ship icon -->
  <rect x="360" y="68" width="40" height="16" rx="3" fill="#2a3a4a" stroke="${ORANGE}" stroke-width="1.5"/>
  <text x="380" y="80" text-anchor="middle" fill="${ORANGE}" font-size="8" font-family="sans-serif">Yi Peng 3</text>
  <text x="200" y="330" text-anchor="middle" fill="${ORANGE}" font-size="11" font-family="sans-serif">中国船「Yi Peng 3」が切断海域を通過後、スウェーデン海域で停船・調査拒否</text>
  <!-- Info box -->
  <rect x="500" y="45" width="260" height="290" rx="8" fill="${BOX}" stroke="#444" stroke-width="1"/>
  <text x="630" y="70" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">事件の概要</text>
  <text x="516" y="94" fill="${TEXT}" font-size="11" font-family="sans-serif">日時: 2024年11月17〜18日</text>
  <text x="516" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">Estlink-2 電力ケーブル切断</text>
  <text x="516" y="130" fill="${TEXT}" font-size="11" font-family="sans-serif">C-Lion 1 通信ケーブル切断</text>
  <text x="516" y="148" fill="${ACCENT2}" font-size="11" font-family="sans-serif">同日・同一海域で発生</text>
  <text x="516" y="178" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">証拠</text>
  <text x="516" y="196" fill="${TEXT}" font-size="11" font-family="sans-serif">海底にアンカー引きずり痕</text>
  <text x="516" y="214" fill="${TEXT}" font-size="11" font-family="sans-serif">数週間NATOが乗船要求</text>
  <text x="516" y="232" fill="${ORANGE}" font-size="11" font-family="sans-serif">中国側が乗船調査を拒絶</text>
  <text x="516" y="262" fill="${ACCENT1}" font-size="11" font-weight="bold" font-family="sans-serif">意義</text>
  <text x="516" y="280" fill="${TEXT}" font-size="11" font-family="sans-serif">「グレーゾーン戦争」の典型事例</text>
  <text x="516" y="298" fill="${TEXT}" font-size="11" font-family="sans-serif">証拠があっても対応困難</text>
  <text x="516" y="316" fill="${ACCENT2}" font-size="11" font-family="sans-serif">欧州の安全保障議論に直結</text>
</svg>`;

// SVG: financial system dependency
const svgFinancialDependency = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">金融システムのケーブル依存</text>
  <!-- SWIFT box -->
  <rect x="40" y="50" width="220" height="120" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1.5"/>
  <text x="150" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="14" font-weight="bold" font-family="sans-serif">SWIFT</text>
  <text x="55" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">国際銀行間送金の 99%</text>
  <text x="55" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">海底ケーブル経由で処理</text>
  <text x="55" y="134" fill="${ACCENT2}" font-size="11" font-family="sans-serif">切断 → 送金遅延・停止</text>
  <text x="55" y="154" fill="#aaa" font-size="10" font-family="sans-serif">日本円決済含め全グローバル取引</text>
  <!-- FX market -->
  <rect x="290" y="50" width="220" height="120" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1.5"/>
  <text x="400" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">FX・株式市場</text>
  <text x="305" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">マイクロ秒単位の裁定取引</text>
  <text x="305" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">レイテンシ増大で市場崩壊</text>
  <text x="305" y="134" fill="${ACCENT2}" font-size="11" font-family="sans-serif">HFT収益: 数十億円/日が消失</text>
  <text x="305" y="154" fill="#aaa" font-size="10" font-family="sans-serif">東京↔ロンドン↔NY間の遅延増</text>
  <!-- Cloud finance -->
  <rect x="540" y="50" width="220" height="120" rx="8" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="650" y="74" text-anchor="middle" fill="${ACCENT3}" font-size="14" font-weight="bold" font-family="sans-serif">クラウド決済</text>
  <text x="555" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">Stripe / Visa / PayPal</text>
  <text x="555" y="114" fill="${TEXT}" font-size="11" font-family="sans-serif">グローバルデータセンター同期</text>
  <text x="555" y="134" fill="${ACCENT3}" font-size="11" font-family="sans-serif">切断 → 決済タイムアウト多発</text>
  <text x="555" y="154" fill="#aaa" font-size="10" font-family="sans-serif">ECサイト・POSに直接影響</text>
  <!-- Impact row -->
  <rect x="40" y="195" width="720" height="120" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1"/>
  <text x="400" y="218" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">過去の実例 — 2008年エジプト沖切断</text>
  <text x="200" y="244" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">SEA-ME-WE 4 + FLAG</text>
  <text x="200" y="264" text-anchor="middle" fill="${ORANGE}" font-size="12" font-family="sans-serif">同日切断</text>
  <text x="400" y="244" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">インド国際帯域</text>
  <text x="400" y="264" text-anchor="middle" fill="${ACCENT2}" font-size="14" font-weight="bold" font-family="sans-serif">50% 喪失</text>
  <text x="610" y="240" text-anchor="middle" fill="${TEXT}" font-size="12" font-family="sans-serif">インドIT企業</text>
  <text x="610" y="258" text-anchor="middle" fill="${ORANGE}" font-size="12" font-family="sans-serif">数日間業務停止</text>
  <text x="400" y="298" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-family="sans-serif">最悪シナリオ: 紅海+台湾海峡同時切断 → グローバルGDP損害 数千億円/日</text>
</svg>`;

// SVG: NSA wiretapping / landing station
const svgWiretapping = `<svg viewBox="0 0 800 340" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="340" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">陸揚げ局と盗聴の急所</text>
  <!-- Cable underwater -->
  <rect x="0" y="220" width="800" height="120" fill="#0d2137"/>
  <path d="M50 260 Q200 250 350 258 Q500 265 650 255 Q720 252 800 258" fill="none" stroke="${ACCENT1}" stroke-width="4"/>
  <text x="400" y="286" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">海底光ファイバーケーブル（暗号化されたデータが流れる）</text>
  <!-- Landing station -->
  <rect x="680" y="155" width="90" height="70" rx="6" fill="#1a3a1a" stroke="${GREEN}" stroke-width="2"/>
  <text x="725" y="180" text-anchor="middle" fill="${GREEN}" font-size="11" font-weight="bold" font-family="sans-serif">陸揚げ局</text>
  <text x="725" y="196" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">Landing</text>
  <text x="725" y="212" text-anchor="middle" fill="${GREEN}" font-size="11" font-family="sans-serif">Station</text>
  <!-- Cable comes up -->
  <line x1="725" y1="225" x2="725" y2="220" stroke="${ACCENT1}" stroke-width="4"/>
  <!-- Internet backbone connection -->
  <line x1="680" y1="185" x2="580" y2="130" stroke="${ACCENT3}" stroke-width="2"/>
  <rect x="490" y="100" width="120" height="50" rx="6" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1"/>
  <text x="550" y="124" text-anchor="middle" fill="${ACCENT3}" font-size="11" font-weight="bold" font-family="sans-serif">国内インターネット</text>
  <text x="550" y="140" text-anchor="middle" fill="${ACCENT3}" font-size="10" font-family="sans-serif">バックボーン</text>
  <!-- Wiretap point -->
  <circle cx="725" cy="185" r="18" fill="none" stroke="${ACCENT2}" stroke-width="2.5"/>
  <text x="750" y="130" fill="${ACCENT2}" font-size="12" font-weight="bold" font-family="sans-serif">盗聴の急所</text>
  <text x="750" y="148" fill="${ACCENT2}" font-size="11" font-family="sans-serif">↙ 陸揚げ局で</text>
  <text x="750" y="163" fill="${ACCENT2}" font-size="11" font-family="sans-serif">生データにアクセス可能</text>
  <!-- Info boxes -->
  <rect x="40" y="50" width="260" height="140" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="170" y="74" text-anchor="middle" fill="${ACCENT1}" font-size="13" font-weight="bold" font-family="sans-serif">スノーデン文書（2013）</text>
  <text x="55" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">NSA「MUSCULAR」作戦:</text>
  <text x="55" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">GoogleデータセンターICケーブルを盗聴</text>
  <text x="55" y="132" fill="${TEXT}" font-size="11" font-family="sans-serif">GCHQ「Tempora」:</text>
  <text x="55" y="148" fill="${TEXT}" font-size="11" font-family="sans-serif">英国陸揚げ局で大量傍受</text>
  <text x="55" y="170" fill="${ACCENT2}" font-size="11" font-family="sans-serif">「友好国」領土内の陸揚げ局</text>
  <rect x="330" y="50" width="310" height="140" rx="8" fill="${BOX}" stroke="${ACCENT2}" stroke-width="1"/>
  <text x="485" y="74" text-anchor="middle" fill="${ACCENT2}" font-size="13" font-weight="bold" font-family="sans-serif">中国リスク</text>
  <text x="345" y="96" fill="${TEXT}" font-size="11" font-family="sans-serif">HMN Technologies（旧Huawei Marine）:</text>
  <text x="345" y="112" fill="${TEXT}" font-size="11" font-family="sans-serif">世界の主要ケーブル工事を受注</text>
  <text x="345" y="132" fill="${ORANGE}" font-size="11" font-family="sans-serif">バックドア・盗聴装置の疑惑</text>
  <text x="345" y="152" fill="${TEXT}" font-size="11" font-family="sans-serif">米国: HMN Technologiesを</text>
  <text x="345" y="168" fill="${TEXT}" font-size="11" font-family="sans-serif">米国向けケーブル工事から排除</text>
</svg>`;

// SVG: recovery architecture patterns
const svgRecoveryArch = `<svg viewBox="0 0 800 360" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" fill="${BG}"/>
  <text x="400" y="28" text-anchor="middle" fill="${ACCENT1}" font-size="18" font-weight="bold" font-family="sans-serif">ケーブル断絶時の障害伝播と対策アーキテクチャ</text>
  <!-- Flow diagram -->
  <!-- Cable cut event -->
  <rect x="320" y="48" width="160" height="40" rx="6" fill="${ACCENT2}" />
  <text x="400" y="73" text-anchor="middle" fill="${TEXT}" font-size="13" font-weight="bold" font-family="sans-serif">ケーブル切断</text>
  <!-- Arrow down -->
  <line x1="400" y1="88" x2="400" y2="108" stroke="#aaa" stroke-width="2"/>
  <polygon points="395,108 405,108 400,118" fill="#aaa"/>
  <!-- BGP reroute -->
  <rect x="280" y="118" width="240" height="36" rx="6" fill="${BOX}" stroke="${ACCENT3}" stroke-width="1.5"/>
  <text x="400" y="141" text-anchor="middle" fill="${ACCENT3}" font-size="12" font-family="sans-serif">BGP自動再ルーティング（数分以内）</text>
  <!-- Arrow -->
  <line x1="400" y1="154" x2="400" y2="172" stroke="#aaa" stroke-width="2"/>
  <polygon points="395,172 405,172 400,182" fill="#aaa"/>
  <!-- Split paths -->
  <line x1="400" y1="182" x2="200" y2="210" stroke="#aaa" stroke-width="1.5"/>
  <line x1="400" y1="182" x2="600" y2="210" stroke="#aaa" stroke-width="1.5"/>
  <!-- Left: congestion -->
  <rect x="80" y="210" width="240" height="60" rx="6" fill="${BOX}" stroke="${ORANGE}" stroke-width="1.5"/>
  <text x="200" y="234" text-anchor="middle" fill="${ORANGE}" font-size="12" font-weight="bold" font-family="sans-serif">輻輳・遅延増大</text>
  <text x="200" y="254" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">迂回経路の容量不足</text>
  <!-- Right: capacity ok -->
  <rect x="480" y="210" width="240" height="60" rx="6" fill="${BOX}" stroke="${GREEN}" stroke-width="1.5"/>
  <text x="600" y="234" text-anchor="middle" fill="${GREEN}" font-size="12" font-weight="bold" font-family="sans-serif">部分的に正常維持</text>
  <text x="600" y="254" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">CDNキャッシュ・ローカル処理</text>
  <!-- Mitigation -->
  <rect x="40" y="300" width="720" height="48" rx="8" fill="${BOX}" stroke="${ACCENT1}" stroke-width="1"/>
  <text x="400" y="322" text-anchor="middle" fill="${ACCENT1}" font-size="12" font-weight="bold" font-family="sans-serif">対策: 事前設計</text>
  <text x="400" y="340" text-anchor="middle" fill="${TEXT}" font-size="11" font-family="sans-serif">地理的分散 + 非同期化 + ローカルキャッシュ強化 + カオスエンジニアリング訓練</text>
</svg>`;

// Now map SVGs to slides by index
// Current SVG slides: 5, 6, 16, 24, 45
// We'll add to slides that don't yet have SVGs

interface SlideData {
	title: string;
	content: string[];
	layout?: string;
	speakerNotes?: string;
}

function addSvgFirst(slide: SlideData, svgHtml: string): SlideData {
	// Add SVG as first element if no SVG/asset already
	const hasAsset = slide.content.some(
		(c) => c.includes("assets/") || c.includes("<svg"),
	);
	if (hasAsset) return slide;
	return { ...slide, content: [svgHtml, ...slide.content] };
}

// Map: slide index -> SVG content
const svgMap: Record<number, string> = {
	3: svgCableStats, // インターネットの99% slide 1
	4: svgBandwidthTimeline, // インターネットの99% slide 2
	7: svgBandwidthTimeline, // ケーブルの歴史
	10: svgOwnershipConcentration, // テレコム vs ハイパースケーラー 1
	11: svgOwnershipConcentration, // テレコム vs ハイパースケーラー 2
	12: svgOwnershipConcentration, // ハイパースケーラー独自ケーブル 1
	13: svgOwnershipConcentration, // ハイパースケーラー独自ケーブル 2
	14: svgCableShip, // 敷設船 1
	15: svgCableShip, // 敷設船 2
	17: svgThreatCauses, // 自然障害 1
	18: svgThreatCauses, // 自然障害 2
	19: svgThreatCauses, // 漁船・アンカー 1
	20: svgThreatCauses, // 漁船・アンカー 2
	21: svgBalticIncident, // バルト海 1
	22: svgBalticIncident, // バルト海 2
	25: svgRedSeaChokepoint, // チョークポイント 1
	26: svgRedSeaChokepoint, // チョークポイント 2
	27: svgGeopoliticalActors, // ロシア調査船 1
	28: svgGeopoliticalActors, // ロシア調査船 2
	29: svgWiretapping, // 盗聴疑惑 1
	30: svgWiretapping, // 盗聴疑惑 2
	31: svgBGPRerouting, // BGPルーティング 1
	32: svgBGPRerouting, // BGPルーティング 2
	33: svgCloudImpact, // クラウドサービス影響 1
	34: svgCloudImpact, // クラウドサービス影響 2
	35: svgFinancialDependency, // 金融システム 1
	36: svgFinancialDependency, // 金融システム 2
	37: svgRepairProcess, // 修復タイムライン 1
	38: svgRepairProcess, // 修復タイムライン 2
	39: svgRedundancyLimitation, // 冗長化の限界 1
	40: svgRedundancyLimitation, // 冗長化の限界 2
	43: svgGeopoliticalActors, // 各国の監視 1
	44: svgGeopoliticalActors, // 各国の監視 2
	47: svgEngineerPatterns, // インフラ依存の再認識 1
	48: svgEngineerPatterns, // インフラ依存の再認識 2
	49: svgRecoveryArch, // 障害時アーキテクチャ 1
	50: svgRecoveryArch, // 障害時アーキテクチャ 2
};

let modifiedCount = 0;
for (const [idxStr, svgContent] of Object.entries(svgMap)) {
	const idx = parseInt(idxStr);
	if (idx >= slides.length) continue;
	const before = slides[idx].content.join("");
	slides[idx] = addSvgFirst(slides[idx], svgContent) as (typeof slides)[0];
	const after = slides[idx].content.join("");
	if (before !== after) modifiedCount++;
}

writeFileSync(dataPath, JSON.stringify(data, null, "\t"), "utf-8");

// Count SVG slides
const svgSlides = slides.filter((s: SlideData) =>
	s.content.some((c: string) => c.includes("<svg") || c.includes("assets/")),
);
console.log(
	`Done. Modified ${modifiedCount} slides. Total slides with SVG: ${svgSlides.length}/${slides.length} (${Math.round((svgSlides.length * 100) / slides.length)}%)`,
);
