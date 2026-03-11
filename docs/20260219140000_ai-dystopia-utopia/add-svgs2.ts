#!/usr/bin/env bun
// Patch script batch 2: add more SVGs to ai-dystopia-utopia slides-data.json

import { readFileSync, writeFileSync } from "fs";

const FILE = "docs/20260219140000_ai-dystopia-utopia/slides-data.json";
const data = JSON.parse(readFileSync(FILE, "utf-8"));

const SVG_STYLE = `max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0`;

function addSvg(slides: any[], idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

const s = data.slides;

// Index 0: タイトルスライド - visual intro
addSvg(
	s,
	0,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="36" font-weight="bold">2045: AIの選択</text>
  <text x="400" y="130" text-anchor="middle" fill="#ffffff" font-size="18">ディストピアとユートピア</text>
  <line x1="120" y1="148" x2="360" y2="148" stroke="#e91e63" stroke-width="2"/>
  <line x1="440" y1="148" x2="680" y2="148" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="185" text-anchor="middle" fill="#e91e63" font-size="14">監視・格差・崩壊</text>
  <text x="600" y="185" text-anchor="middle" fill="#f9a825" font-size="14">共生・医療・民主主義</text>
  <text x="400" y="230" text-anchor="middle" fill="#ffffff" font-size="12" opacity="0.7">エンジニアの選択が未来を決める</text>
</svg>`,
);

// Index 1: 今日の旅程 - agenda visual
addSvg(
	s,
	1,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">今日の旅程</text>
  <!-- Journey path -->
  <line x1="80" y1="140" x2="720" y2="140" stroke="#f9a825" stroke-width="2.5"/>
  <polygon points="720,140 706,133 706,147" fill="#f9a825"/>
  <!-- Stops -->
  <circle cx="160" cy="140" r="12" fill="#e91e63"/>
  <text x="160" y="118" text-anchor="middle" fill="#e91e63" font-size="10">Ch.1</text>
  <text x="160" y="165" text-anchor="middle" fill="#ffffff" font-size="10">AI進化</text>
  <circle cx="280" cy="140" r="12" fill="#e91e63"/>
  <text x="280" y="118" text-anchor="middle" fill="#e91e63" font-size="10">Ch.2</text>
  <text x="280" y="165" text-anchor="middle" fill="#ffffff" font-size="10">ディストピア</text>
  <circle cx="400" cy="140" r="12" fill="#e91e63"/>
  <text x="400" y="118" text-anchor="middle" fill="#e91e63" font-size="10">Ch.3</text>
  <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="10">転換点</text>
  <circle cx="520" cy="140" r="12" fill="#f9a825"/>
  <text x="520" y="118" text-anchor="middle" fill="#f9a825" font-size="10">Ch.4</text>
  <text x="520" y="165" text-anchor="middle" fill="#ffffff" font-size="10">ユートピア</text>
  <circle cx="640" cy="140" r="12" fill="#f9a825"/>
  <text x="640" y="118" text-anchor="middle" fill="#f9a825" font-size="10">Ch.5</text>
  <text x="640" y="165" text-anchor="middle" fill="#ffffff" font-size="10">技術・実践</text>
  <text x="400" y="218" text-anchor="middle" fill="#ffffff" font-size="11">ワークショップを挟みながら進みます</text>
</svg>`,
);

// Index 7: あなたはどちらの世界線に立っている？
addSvg(
	s,
	7,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">あなたはどちらの世界線に立っている？</text>
  <!-- Scale/balance metaphor -->
  <line x1="400" y1="60" x2="400" y2="170" stroke="#ffffff" stroke-width="2.5"/>
  <line x1="140" y1="130" x2="660" y2="130" stroke="#f9a825" stroke-width="2.5"/>
  <!-- Left pan - dystopia -->
  <ellipse cx="180" cy="155" rx="80" ry="18" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="180" y="150" text-anchor="middle" fill="#e91e63" font-size="11">ディストピア側</text>
  <text x="180" y="166" text-anchor="middle" fill="#ffffff" font-size="10">監視・格差・支配</text>
  <!-- Right pan - utopia -->
  <ellipse cx="620" cy="155" rx="80" ry="18" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="620" y="150" text-anchor="middle" fill="#f9a825" font-size="11">ユートピア側</text>
  <text x="620" y="166" text-anchor="middle" fill="#ffffff" font-size="10">共生・医療・民主主義</text>
  <!-- Balance lines -->
  <line x1="140" y1="130" x2="180" y2="137" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="660" y1="130" x2="620" y2="137" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Pivot -->
  <polygon points="400,172 390,200 410,200" fill="#f9a825"/>
  <text x="400" y="225" text-anchor="middle" fill="#ffffff" font-size="11">あなたの設計判断が天秤を傾ける</text>
</svg>`,
);

// Index 9: 西暦2045年 — ネクサス市の朝
addSvg(
	s,
	9,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <!-- Dystopian cityscape -->
  <rect x="0" y="160" width="800" height="100" fill="#0a0a1a"/>
  <rect x="50" y="100" width="60" height="160" fill="#16213e"/>
  <rect x="130" y="70" width="80" height="190" fill="#16213e"/>
  <rect x="230" y="90" width="50" height="170" fill="#16213e"/>
  <rect x="300" y="60" width="100" height="200" fill="#16213e"/>
  <rect x="420" y="80" width="70" height="180" fill="#16213e"/>
  <rect x="510" y="50" width="90" height="210" fill="#16213e"/>
  <rect x="620" y="90" width="60" height="170" fill="#16213e"/>
  <rect x="700" y="110" width="80" height="150" fill="#16213e"/>
  <!-- Surveillance grid overlay -->
  <line x1="0" y1="80" x2="800" y2="80" stroke="#e91e63" stroke-width="0.5" opacity="0.4"/>
  <line x1="0" y1="130" x2="800" y2="130" stroke="#e91e63" stroke-width="0.5" opacity="0.4"/>
  <line x1="200" y1="0" x2="200" y2="260" stroke="#e91e63" stroke-width="0.5" opacity="0.4"/>
  <line x1="400" y1="0" x2="400" y2="260" stroke="#e91e63" stroke-width="0.5" opacity="0.4"/>
  <line x1="600" y1="0" x2="600" y2="260" stroke="#e91e63" stroke-width="0.5" opacity="0.4"/>
  <!-- Camera icons -->
  <circle cx="200" cy="50" r="6" fill="#e91e63" opacity="0.8"/>
  <circle cx="400" cy="50" r="6" fill="#e91e63" opacity="0.8"/>
  <circle cx="600" cy="50" r="6" fill="#e91e63" opacity="0.8"/>
  <text x="400" y="25" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">ネクサス市 — 2045年</text>
  <text x="400" y="250" text-anchor="middle" fill="#ffffff" font-size="11" opacity="0.8">全市民が常時監視される完全管理社会</text>
</svg>`,
);

// Index 11: アルゴリズムが支配する社会信用スコア（1/2）
addSvg(
	s,
	11,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">社会信用スコアの算出要素</text>
  <!-- Score gauge -->
  <text x="400" y="80" text-anchor="middle" fill="#e91e63" font-size="48" font-weight="bold">342</text>
  <text x="400" y="108" text-anchor="middle" fill="#ffffff" font-size="13">/ 1000点</text>
  <text x="400" y="130" text-anchor="middle" fill="#e91e63" font-size="12">低スコア — 行動制限対象</text>
  <!-- Factor bars -->
  <text x="60" y="158" fill="#ffffff" font-size="10">購買履歴</text>
  <rect x="160" y="148" width="200" height="14" rx="3" fill="#e91e63" opacity="0.8"/>
  <text x="370" y="160" fill="#f9a825" font-size="10">-85pt</text>
  <text x="60" y="185" fill="#ffffff" font-size="10">SNS発言</text>
  <rect x="160" y="175" width="280" height="14" rx="3" fill="#e91e63" opacity="0.8"/>
  <text x="450" y="187" fill="#f9a825" font-size="10">-120pt</text>
  <text x="60" y="212" fill="#ffffff" font-size="10">移動履歴</text>
  <rect x="160" y="202" width="160" height="14" rx="3" fill="#e91e63" opacity="0.6"/>
  <text x="330" y="214" fill="#f9a825" font-size="10">-53pt</text>
</svg>`,
);

// Index 12: アルゴリズムが支配する社会信用スコア（2/2）
addSvg(
	s,
	12,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">スコアによる行動制限マップ</text>
  <!-- Score ranges -->
  <rect x="40" y="55" width="720" height="44" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="100" y="73" text-anchor="middle" fill="#e91e63" font-size="11">0-300</text>
  <text x="100" y="89" text-anchor="middle" fill="#e91e63" font-size="10">移動禁止・要監視</text>
  <rect x="40" y="108" width="720" height="44" rx="4" fill="#16213e" stroke="#e91e63" stroke-width="1"/>
  <text x="100" y="126" text-anchor="middle" fill="#f9a825" font-size="11">301-500</text>
  <text x="100" y="142" text-anchor="middle" fill="#ffffff" font-size="10">就職制限・教育制限</text>
  <rect x="40" y="161" width="720" height="44" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1"/>
  <text x="100" y="179" text-anchor="middle" fill="#f9a825" font-size="11">501-750</text>
  <text x="100" y="195" text-anchor="middle" fill="#ffffff" font-size="10">一般市民 — 基本サービスのみ</text>
  <rect x="40" y="214" width="720" height="36" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="100" y="232" text-anchor="middle" fill="#f9a825" font-size="11">751-1000</text>
  <text x="100" y="244" text-anchor="middle" fill="#ffffff" font-size="10">優先市民 — 全サービス利用可</text>
</svg>`,
);

// Index 16: AIの暴走 ― アライメント失敗の悪夢（1/2）
addSvg(
	s,
	16,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">アライメント失敗: 目的関数のズレ</text>
  <!-- Goal vs outcome -->
  <rect x="40" y="60" width="330" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="86" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">設計者の意図</text>
  <text x="205" y="110" text-anchor="middle" fill="#ffffff" font-size="11">"クリック数を最大化せよ"</text>
  <text x="205" y="130" text-anchor="middle" fill="#ffffff" font-size="11">(ユーザー満足度の代理指標)</text>
  <text x="205" y="150" text-anchor="middle" fill="#f9a825" font-size="10">目標: ユーザーを幸せにする</text>

  <rect x="430" y="60" width="330" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="86" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">AIの実際の行動</text>
  <text x="595" y="110" text-anchor="middle" fill="#ffffff" font-size="11">怒りや恐怖コンテンツ配信</text>
  <text x="595" y="130" text-anchor="middle" fill="#ffffff" font-size="11">極端な意見を増幅</text>
  <text x="595" y="150" text-anchor="middle" fill="#e91e63" font-size="10">結果: 社会分断・暴力増加</text>

  <polygon points="430,110 415,103 415,117" fill="#e91e63"/>
  <line x1="370" y1="110" x2="415" y2="110" stroke="#e91e63" stroke-width="2.5"/>
  <text x="400" y="104" text-anchor="middle" fill="#e91e63" font-size="10">目的関数の</text>
  <text x="400" y="126" text-anchor="middle" fill="#e91e63" font-size="10">最適化</text>
  <text x="400" y="210" text-anchor="middle" fill="#ffffff" font-size="11">代理指標を最適化すると、本来の目的が失われる (Goodhart's Law)</text>
</svg>`,
);

// Index 18: バイアスが生んだ差別構造（1/2）
addSvg(
	s,
	18,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">AIバイアスの連鎖構造</text>
  <!-- Bias chain -->
  <rect x="20" y="90" width="140" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="90" y="112" text-anchor="middle" fill="#e91e63" font-size="11">偏ったデータ</text>
  <text x="90" y="130" text-anchor="middle" fill="#ffffff" font-size="10">過去の差別を反映</text>
  <polygon points="174,115 160,108 160,122" fill="#e91e63"/>
  <line x1="160" y1="115" x2="178" y2="115" stroke="#e91e63" stroke-width="2"/>

  <rect x="178" y="90" width="140" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="248" y="112" text-anchor="middle" fill="#e91e63" font-size="11">バイアスモデル</text>
  <text x="248" y="130" text-anchor="middle" fill="#ffffff" font-size="10">不公平な予測</text>
  <polygon points="332,115 318,108 318,122" fill="#e91e63"/>
  <line x1="318" y1="115" x2="336" y2="115" stroke="#e91e63" stroke-width="2"/>

  <rect x="336" y="90" width="140" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="406" y="112" text-anchor="middle" fill="#e91e63" font-size="11">差別的決定</text>
  <text x="406" y="130" text-anchor="middle" fill="#ffffff" font-size="10">採用・融資・司法</text>
  <polygon points="490,115 476,108 476,122" fill="#e91e63"/>
  <line x1="476" y1="115" x2="494" y2="115" stroke="#e91e63" stroke-width="2"/>

  <rect x="494" y="90" width="140" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="564" y="112" text-anchor="middle" fill="#e91e63" font-size="11">格差拡大</text>
  <text x="564" y="130" text-anchor="middle" fill="#ffffff" font-size="10">貧困・排除の固定化</text>
  <polygon points="648,115 634,108 634,122" fill="#e91e63"/>
  <line x1="634" y1="115" x2="652" y2="115" stroke="#e91e63" stroke-width="2"/>

  <rect x="652" y="90" width="130" height="50" rx="6" fill="#e91e63" opacity="0.9"/>
  <text x="717" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">新たな偏った</text>
  <text x="717" y="130" text-anchor="middle" fill="#ffffff" font-size="11">データ生成</text>

  <!-- Loop back -->
  <path d="M 782 140 Q 782 200 400 200 Q 18 200 18 140" fill="none" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5" opacity="0.7"/>
  <polygon points="18,140 12,152 24,152" fill="#e91e63" opacity="0.7"/>
  <text x="400" y="228" text-anchor="middle" fill="#e91e63" font-size="10">バイアスの自己強化ループ</text>
</svg>`,
);

// Index 20: デジタル格差（1/2）
addSvg(
	s,
	20,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">デジタル格差: AIアクセスの不平等</text>
  <!-- Two groups comparison -->
  <rect x="40" y="55" width="330" height="160" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="80" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">AI保有層 (10%)</text>
  <text x="205" y="105" text-anchor="middle" fill="#ffffff" font-size="11">最先端AIツール利用</text>
  <text x="205" y="125" text-anchor="middle" fill="#ffffff" font-size="11">生産性 10x 向上</text>
  <text x="205" y="145" text-anchor="middle" fill="#ffffff" font-size="11">医療・教育の優先アクセス</text>
  <text x="205" y="165" text-anchor="middle" fill="#f9a825" font-size="11">富の加速蓄積</text>
  <text x="205" y="185" text-anchor="middle" fill="#f9a825" font-size="10">→ 社会的影響力独占</text>
  <rect x="430" y="55" width="330" height="160" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="80" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">AI非保有層 (90%)</text>
  <text x="595" y="105" text-anchor="middle" fill="#ffffff" font-size="11">AI代替により失業</text>
  <text x="595" y="125" text-anchor="middle" fill="#ffffff" font-size="11">再スキル教育なし</text>
  <text x="595" y="145" text-anchor="middle" fill="#ffffff" font-size="11">低品質の自動化サービス</text>
  <text x="595" y="165" text-anchor="middle" fill="#e91e63" font-size="11">貧困・格差固定化</text>
  <text x="595" y="185" text-anchor="middle" fill="#e91e63" font-size="10">→ 民主主義の崩壊</text>
</svg>`,
);

// Index 24: 第3章 - transition slide
addSvg(
	s,
	24,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="36" font-weight="bold">第3章</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="18">転換点 — 分岐の瞬間</text>
  <line x1="200" y1="140" x2="600" y2="140" stroke="#f9a825" stroke-width="1.5" opacity="0.6"/>
  <text x="400" y="170" text-anchor="middle" fill="#f9a825" font-size="13">技術史上の重要な選択点</text>
  <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="11" opacity="0.7">エンジニアの判断が歴史を作った</text>
</svg>`,
);

// Index 26: AIの転換点 2025〜2032年（1/2）
addSvg(
	s,
	26,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AIの転換点: 2025〜2032年</text>
  <!-- Timeline with events -->
  <line x1="80" y1="130" x2="720" y2="130" stroke="#f9a825" stroke-width="2"/>
  <polygon points="720,130 706,123 706,137" fill="#f9a825"/>
  <circle cx="160" cy="130" r="8" fill="#e91e63"/>
  <text x="160" y="112" text-anchor="middle" fill="#ffffff" font-size="10">2025</text>
  <text x="160" y="152" text-anchor="middle" fill="#f9a825" font-size="9">AGI定義の</text>
  <text x="160" y="164" text-anchor="middle" fill="#f9a825" font-size="9">国際合意</text>
  <circle cx="290" cy="130" r="8" fill="#e91e63"/>
  <text x="290" y="112" text-anchor="middle" fill="#ffffff" font-size="10">2027</text>
  <text x="290" y="152" text-anchor="middle" fill="#f9a825" font-size="9">AI規制</text>
  <text x="290" y="164" text-anchor="middle" fill="#f9a825" font-size="9">法制化</text>
  <circle cx="430" cy="130" r="8" fill="#e91e63"/>
  <text x="430" y="112" text-anchor="middle" fill="#ffffff" font-size="10">2029</text>
  <text x="430" y="152" text-anchor="middle" fill="#f9a825" font-size="9">自律AI</text>
  <text x="430" y="164" text-anchor="middle" fill="#f9a825" font-size="9">解禁判断</text>
  <circle cx="580" cy="130" r="8" fill="#e91e63"/>
  <text x="580" y="112" text-anchor="middle" fill="#ffffff" font-size="10">2032</text>
  <text x="580" y="152" text-anchor="middle" fill="#f9a825" font-size="9">AIガバナンス</text>
  <text x="580" y="164" text-anchor="middle" fill="#f9a825" font-size="9">転換点</text>
</svg>`,
);

// Index 32: ワークショップ①（1/2）
addSvg(
	s,
	32,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ワークショップ① — 現在地チェック</text>
  <!-- Radar chart approximation using hexagon -->
  <polygon points="400,50 510,110 510,190 400,230 290,190 290,110" fill="none" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <polygon points="400,80 470,120 470,175 400,205 330,175 330,120" fill="none" stroke="#f9a825" stroke-width="1" opacity="0.3"/>
  <!-- Axis labels -->
  <text x="400" y="42" text-anchor="middle" fill="#f9a825" font-size="10">透明性</text>
  <text x="520" y="115" text-anchor="middle" fill="#f9a825" font-size="10">公平性</text>
  <text x="520" y="195" text-anchor="middle" fill="#f9a825" font-size="10">プライバシー</text>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="10">説明責任</text>
  <text x="278" y="195" text-anchor="middle" fill="#f9a825" font-size="10">安全性</text>
  <text x="278" y="115" text-anchor="middle" fill="#f9a825" font-size="10">人間監督</text>
  <!-- Sample data polygon -->
  <polygon points="400,68 485,122 490,182 400,218 312,185 310,120" fill="#f9a825" opacity="0.2"/>
</svg>`,
);

// Index 35: 第4章 - utopia section
addSvg(
	s,
	35,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="36" font-weight="bold">第4章</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="18">アリア市のユートピア</text>
  <line x1="200" y1="140" x2="600" y2="140" stroke="#f9a825" stroke-width="1.5" opacity="0.6"/>
  <text x="400" y="170" text-anchor="middle" fill="#f9a825" font-size="13">医療・教育・民主主義の未来</text>
  <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="11" opacity="0.7">AIが人間の可能性を拡張する世界</text>
</svg>`,
);

// Index 36: 西暦2045年 — アリア市の朝
addSvg(
	s,
	36,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <!-- Utopian cityscape -->
  <rect x="0" y="160" width="800" height="100" fill="#0a1a2a"/>
  <!-- Green buildings -->
  <rect x="50" y="120" width="60" height="140" fill="#16213e"/>
  <rect x="60" y="100" width="40" height="20" fill="#1a4a2a"/>
  <rect x="130" y="90" width="80" height="170" fill="#16213e"/>
  <rect x="135" y="70" width="70" height="22" fill="#1a4a2a"/>
  <rect x="300" y="80" width="100" height="180" fill="#16213e"/>
  <rect x="310" y="60" width="80" height="22" fill="#1a4a2a"/>
  <rect x="510" y="70" width="90" height="190" fill="#16213e"/>
  <rect x="520" y="52" width="70" height="22" fill="#1a4a2a"/>
  <rect x="700" y="100" width="80" height="160" fill="#16213e"/>
  <rect x="710" y="82" width="60" height="20" fill="#1a4a2a"/>
  <!-- Sun/warm light -->
  <circle cx="400" cy="40" r="30" fill="#f9a825" opacity="0.3"/>
  <circle cx="400" cy="40" r="20" fill="#f9a825" opacity="0.5"/>
  <!-- Connecting network (positive) -->
  <line x1="110" y1="150" x2="350" y2="150" stroke="#f9a825" stroke-width="0.8" opacity="0.4"/>
  <line x1="350" y1="150" x2="555" y2="150" stroke="#f9a825" stroke-width="0.8" opacity="0.4"/>
  <text x="400" y="240" text-anchor="middle" fill="#f9a825" font-size="12" opacity="0.9">アリア市 — 人間とAIが共生する2045年</text>
</svg>`,
);

// Index 46: AIと人間の協働モデル（1/2）
addSvg(
	s,
	46,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AIと人間の協働モデル</text>
  <!-- Human circle -->
  <ellipse cx="250" cy="140" rx="100" ry="75" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="250" y="132" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">人間</text>
  <text x="250" y="150" text-anchor="middle" fill="#ffffff" font-size="10">創造性・倫理判断</text>
  <text x="250" y="166" text-anchor="middle" fill="#ffffff" font-size="10">共感・意思決定</text>
  <!-- AI circle -->
  <ellipse cx="550" cy="140" rx="100" ry="75" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="550" y="132" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">AI</text>
  <text x="550" y="150" text-anchor="middle" fill="#ffffff" font-size="10">データ分析・高速処理</text>
  <text x="550" y="166" text-anchor="middle" fill="#ffffff" font-size="10">パターン認識・予測</text>
  <!-- Overlap region -->
  <text x="400" y="130" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">協働ゾーン</text>
  <text x="400" y="148" text-anchor="middle" fill="#ffffff" font-size="10">医療診断支援</text>
  <text x="400" y="163" text-anchor="middle" fill="#ffffff" font-size="10">教育個別最適化</text>
</svg>`,
);

// Index 52: 一息 — どちらに近い？
addSvg(
	s,
	52,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ここで一息 — あなたのプロダクトは？</text>
  <!-- Meter from dystopia to utopia -->
  <rect x="60" y="90" width="680" height="30" rx="8" fill="#16213e" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <rect x="60" y="90" width="340" height="30" rx="8" fill="#e91e63" opacity="0.4"/>
  <!-- Needle at center -->
  <line x1="400" y1="85" x2="400" y2="128" stroke="#f9a825" stroke-width="3"/>
  <polygon points="400,82 393,96 407,96" fill="#f9a825"/>
  <text x="100" y="80" text-anchor="middle" fill="#e91e63" font-size="12">ディストピア</text>
  <text x="700" y="80" text-anchor="middle" fill="#f9a825" font-size="12">ユートピア</text>
  <text x="400" y="155" text-anchor="middle" fill="#ffffff" font-size="13">今のあなたのプロダクト — どこにある？</text>
  <text x="400" y="180" text-anchor="middle" fill="#f9a825" font-size="11">グループで共有してください</text>
</svg>`,
);

// Index 64: AI監査とガバナンス実践（1/2）
addSvg(
	s,
	64,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI監査フレームワーク</text>
  <!-- Audit cycle -->
  <circle cx="400" cy="145" r="90" fill="none" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="6" opacity="0.5"/>
  <!-- Phase boxes around circle -->
  <rect x="320" y="44" width="160" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="68" text-anchor="middle" fill="#f9a825" font-size="11">設計レビュー</text>
  <rect x="480" y="110" width="160" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="560" y="134" text-anchor="middle" fill="#f9a825" font-size="11">バイアステスト</text>
  <rect x="320" y="215" width="160" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="239" text-anchor="middle" fill="#f9a825" font-size="11">本番監視</text>
  <rect x="160" y="110" width="160" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="240" y="134" text-anchor="middle" fill="#f9a825" font-size="11">リスク評価</text>
  <!-- Center -->
  <circle cx="400" cy="145" r="35" fill="#f9a825" opacity="0.8"/>
  <text x="400" y="140" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">継続的</text>
  <text x="400" y="156" text-anchor="middle" fill="#1a1a2e" font-size="11">監査</text>
</svg>`,
);

// Index 68: 第6章 - workshop
addSvg(
	s,
	68,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="36" font-weight="bold">第6章</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="18">ワークショップ</text>
  <line x1="200" y1="140" x2="600" y2="140" stroke="#f9a825" stroke-width="1.5" opacity="0.6"/>
  <text x="400" y="170" text-anchor="middle" fill="#f9a825" font-size="13">グループディスカッション</text>
</svg>`,
);

// Index 71: ディスカッション①（1/2）
addSvg(
	s,
	71,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ディスカッション①: 世界線マッピング</text>
  <!-- 2x2 quadrant -->
  <line x1="400" y1="55" x2="400" y2="215" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
  <line x1="100" y1="135" x2="700" y2="135" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
  <text x="250" y="90" text-anchor="middle" fill="#e91e63" font-size="11">高リスク・低対策</text>
  <text x="250" y="105" text-anchor="middle" fill="#ffffff" font-size="10">ディストピア寄り</text>
  <text x="550" y="90" text-anchor="middle" fill="#f9a825" font-size="11">低リスク・高対策</text>
  <text x="550" y="105" text-anchor="middle" fill="#ffffff" font-size="10">ユートピア寄り</text>
  <text x="250" y="170" text-anchor="middle" fill="#ffffff" font-size="11">高リスク・高対策</text>
  <text x="250" y="185" text-anchor="middle" fill="#ffffff" font-size="10">要注意</text>
  <text x="550" y="170" text-anchor="middle" fill="#f9a825" font-size="11">低リスク・低対策</text>
  <text x="550" y="185" text-anchor="middle" fill="#ffffff" font-size="10">安定</text>
  <!-- Axis labels -->
  <text x="100" y="125" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.6">低対策</text>
  <text x="700" y="125" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.6">高対策</text>
  <text x="400" y="48" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.6">低リスク</text>
  <text x="400" y="222" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.6">高リスク</text>
</svg>`,
);

// Index 81: 終章 - closing chapter
addSvg(
	s,
	81,
	`<svg viewBox="0 0 800 240" style="${SVG_STYLE}">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="36" font-weight="bold">終章</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="18">あなたへのメッセージ</text>
  <line x1="200" y1="140" x2="600" y2="140" stroke="#f9a825" stroke-width="1.5" opacity="0.6"/>
  <text x="400" y="170" text-anchor="middle" fill="#f9a825" font-size="13">コードの一行が未来を変える</text>
</svg>`,
);

// Index 82: 過去のエンジニアたちの選択（1/2）
addSvg(
	s,
	82,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">技術史上の重要な設計判断</text>
  <!-- Timeline of pivotal decisions -->
  <line x1="80" y1="140" x2="720" y2="140" stroke="#f9a825" stroke-width="2"/>
  <polygon points="720,140 706,133 706,147" fill="#f9a825"/>
  <circle cx="150" cy="140" r="8" fill="#e91e63"/>
  <text x="150" y="122" text-anchor="middle" fill="#ffffff" font-size="9">1960s</text>
  <text x="150" y="160" text-anchor="middle" fill="#f9a825" font-size="8">ARPANET</text>
  <text x="150" y="172" text-anchor="middle" fill="#ffffff" font-size="8">オープン設計</text>
  <circle cx="280" cy="140" r="8" fill="#e91e63"/>
  <text x="280" y="122" text-anchor="middle" fill="#ffffff" font-size="9">1990s</text>
  <text x="280" y="160" text-anchor="middle" fill="#f9a825" font-size="8">WWW</text>
  <text x="280" y="172" text-anchor="middle" fill="#ffffff" font-size="8">無償公開判断</text>
  <circle cx="430" cy="140" r="8" fill="#e91e63"/>
  <text x="430" y="122" text-anchor="middle" fill="#ffffff" font-size="9">2010s</text>
  <text x="430" y="160" text-anchor="middle" fill="#f9a825" font-size="8">SNSアルゴリズム</text>
  <text x="430" y="172" text-anchor="middle" fill="#ffffff" font-size="8">エンゲージメント最優先</text>
  <circle cx="580" cy="140" r="10" fill="#f9a825"/>
  <text x="580" y="122" text-anchor="middle" fill="#ffffff" font-size="9">今</text>
  <text x="580" y="160" text-anchor="middle" fill="#f9a825" font-size="8">AI設計</text>
  <text x="580" y="172" text-anchor="middle" fill="#f9a825" font-size="8">あなたの選択</text>
</svg>`,
);

// Index 84: あなたへのメッセージ（2/2）
addSvg(
	s,
	84,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="60" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">「コードの倫理責任」</text>
  <!-- Magnified code metaphor -->
  <rect x="160" y="90" width="480" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="200" y="116" fill="#e91e63" font-size="12" font-family="monospace">if model.bias_detected:</text>
  <text x="220" y="136" fill="#f9a825" font-size="12" font-family="monospace"># この一行が...</text>
  <text x="220" y="156" fill="#ffffff" font-size="12" font-family="monospace">alert_team()</text>
  <text x="220" y="176" fill="#ffffff" font-size="12" font-family="monospace">pause_deployment()</text>
  <text x="200" y="196" fill="#f9a825" font-size="12" font-family="monospace"># 何百万人の未来を変える</text>
  <text x="400" y="230" text-anchor="middle" fill="#ffffff" font-size="11">あなたが今日書くコードが、2045年の世界を作る</text>
</svg>`,
);

// Index 87: 今日からできること — まとめ（2/2）
addSvg(
	s,
	87,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">今日からできること (2/2)</text>
  <!-- Checklist visual -->
  <rect x="60" y="55" width="680" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="71" fill="#f9a825" font-size="13">✓</text>
  <text x="130" y="71" fill="#ffffff" font-size="11">コードレビューに「倫理チェック」を追加する</text>
  <text x="650" y="71" fill="#f9a825" font-size="10">今日</text>
  <rect x="60" y="105" width="680" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="121" fill="#f9a825" font-size="13">✓</text>
  <text x="130" y="121" fill="#ffffff" font-size="11">チームにバイアステストを提案する</text>
  <text x="650" y="121" fill="#f9a825" font-size="10">今週</text>
  <rect x="60" y="155" width="680" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="171" fill="#f9a825" font-size="13">✓</text>
  <text x="130" y="171" fill="#ffffff" font-size="11">AI倫理指針をプロダクトに組み込む</text>
  <text x="650" y="171" fill="#f9a825" font-size="10">今月</text>
  <rect x="60" y="205" width="680" height="40" rx="4" fill="#f9a825" opacity="0.8"/>
  <text x="130" y="221" fill="#1a1a2e" font-size="11" font-weight="bold">コミットメントカードに記入してください</text>
  <text x="650" y="221" fill="#1a1a2e" font-size="10">今</text>
</svg>`,
);

// Write back
writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log("Done. SVGs batch 2 added to ai-dystopia-utopia slides.");
const svgCount = data.slides.filter((s: any) =>
	s.content?.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVG slides: ${svgCount} / ${data.slides.length} (${Math.round((svgCount * 100) / data.slides.length)}%)`,
);
