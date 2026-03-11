import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219140000_ai-dystopia-utopia/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const slides = data.slides;

function addSvg(idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

// idx 3: 第1章 セクションヘッダー
addSvg(
	3,
	`<svg viewBox="0 0 800 220" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="220" fill="#1a1a2e"/>
  <text x="400" y="50" text-anchor="middle" fill="#f9a825" font-size="16" font-family="sans-serif">第1章: AIディストピアの世界</text>
  <rect x="60" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="155" y="120" text-anchor="middle" fill="#e91e63" font-size="20" font-family="sans-serif">⚠</text>
  <text x="155" y="148" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">監視社会</text>
  <text x="155" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">プライバシー喪失</text>
  <rect x="305" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="120" text-anchor="middle" fill="#e91e63" font-size="20" font-family="sans-serif">🔒</text>
  <text x="400" y="148" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">不平等の拡大</text>
  <text x="400" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">格差・支配構造</text>
  <rect x="550" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="645" y="120" text-anchor="middle" fill="#e91e63" font-size="20" font-family="sans-serif">💀</text>
  <text x="645" y="148" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">制御不能AI</text>
  <text x="645" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">アライメント失敗</text>
</svg>`,
);

// idx 6: 2045年の世界 ― 共通する前提
addSvg(
	6,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">2026 → 2045 タイムライン</text>
  <line x1="60" y1="110" x2="740" y2="110" stroke="#444" stroke-width="2"/>
  <circle cx="130" cy="110" r="8" fill="#f9a825"/>
  <text x="130" y="100" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">2026</text>
  <text x="130" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AGI 研究</text>
  <text x="130" y="150" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">加速</text>
  <circle cx="290" cy="110" r="8" fill="#f9a825"/>
  <text x="290" y="100" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">2030</text>
  <text x="290" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">汎用 AI</text>
  <text x="290" y="150" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">普及</text>
  <circle cx="450" cy="110" r="8" fill="#e91e63"/>
  <text x="450" y="100" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">2035</text>
  <text x="450" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">転換点</text>
  <text x="450" y="150" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">(分岐)</text>
  <circle cx="610" cy="110" r="8" fill="#e91e63"/>
  <text x="610" y="100" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">2040</text>
  <text x="610" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">社会構造</text>
  <text x="610" y="150" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">再編</text>
  <circle cx="720" cy="110" r="10" fill="#888"/>
  <text x="720" y="100" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">2045</text>
  <text x="720" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">未来の</text>
  <text x="720" y="150" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">姿</text>
  <polygon points="738,110 752,104 752,116" fill="#444"/>
  <text x="450" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">2035年の選択がディストピアかユートピアを決める</text>
</svg>`,
);

// idx 25: 技術史上の転換点と選択
addSvg(
	25,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">技術転換点と社会的選択</text>
  <rect x="30" y="55" width="200" height="80" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="130" y="82" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">印刷革命 (1440)</text>
  <text x="130" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">情報民主化</text>
  <text x="130" y="116" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">or 異端弾圧</text>
  <rect x="250" y="55" width="200" height="80" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="350" y="82" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">産業革命 (1760)</text>
  <text x="350" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">生産性革命</text>
  <text x="350" y="116" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">or 労働搾取</text>
  <rect x="470" y="55" width="200" height="80" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="570" y="82" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">インターネット (1990s)</text>
  <text x="570" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">情報共有</text>
  <text x="570" y="116" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">or 監視・格差</text>
  <rect x="200" y="165" width="400" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="192" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">AI革命 (2025〜)</text>
  <text x="400" y="212" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">人類史上最大の分岐点 — 今、選択が求められる</text>
  <polygon points="398,162 393,155 403,155" fill="#f9a825"/>
</svg>`,
);

// idx 34: 第4章 セクション
addSvg(
	34,
	`<svg viewBox="0 0 800 220" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="220" fill="#1a1a2e"/>
  <text x="400" y="50" text-anchor="middle" fill="#f9a825" font-size="16" font-family="sans-serif">第4章: AIユートピアの世界</text>
  <rect x="60" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="155" y="122" text-anchor="middle" fill="#f9a825" font-size="22" font-family="sans-serif">♥</text>
  <text x="155" y="148" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">医療革命</text>
  <text x="155" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">疾病との戦い</text>
  <rect x="305" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="122" text-anchor="middle" fill="#f9a825" font-size="22" font-family="sans-serif">✦</text>
  <text x="400" y="148" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">教育革命</text>
  <text x="400" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">個別最適化学習</text>
  <rect x="550" y="75" width="190" height="110" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="645" y="122" text-anchor="middle" fill="#f9a825" font-size="22" font-family="sans-serif">◈</text>
  <text x="645" y="148" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">科学加速</text>
  <text x="645" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">研究・発見の高速化</text>
</svg>`,
);

// idx 40: 創造性の爆発 — AIと人間の共創
addSvg(
	40,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">AI × 人間の共創モデル</text>
  <ellipse cx="270" cy="130" rx="130" ry="85" fill="#f9a825" opacity="0.15" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="125" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Human</text>
  <text x="200" y="143" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">創造力・価値観</text>
  <text x="200" y="159" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">意図・倫理</text>
  <ellipse cx="530" cy="130" rx="130" ry="85" fill="#e91e63" opacity="0.15" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="125" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">AI</text>
  <text x="600" y="143" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">速度・スケール</text>
  <text x="600" y="159" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">パターン認識</text>
  <text x="400" y="125" text-anchor="middle" fill="#ffffff" font-size="13" font-family="sans-serif">共創</text>
  <text x="400" y="143" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Zone</text>
  <text x="400" y="205" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">人間の創造性 × AI の実行力 = 新たな文明</text>
</svg>`,
);

// idx 44: 労働の再定義とベーシックインカム
addSvg(
	44,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">労働変容と所得分配</text>
  <rect x="40" y="55" width="320" height="75" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">消えゆく職種</text>
  <text x="200" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ルーティン作業 · データ入力</text>
  <text x="200" y="116" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">定型的判断業務</text>
  <rect x="440" y="55" width="320" height="75" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="600" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">生まれる職種</text>
  <text x="600" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AI監督・倫理審査</text>
  <text x="600" y="116" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">創造的協働・ケア労働</text>
  <rect x="160" y="160" width="480" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="185" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Universal Basic Income (UBI)</text>
  <text x="400" y="205" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AI生産性向上の恩恵を全市民に分配する仕組み</text>
</svg>`,
);

// idx 50: コード生成エージェント 関係ない → チェックして選ぶ - this is ai-dystopia
// Let me pick appropriate slides for this presentation
// idx 50 is in ai-dystopia - let me use the title
addSvg(
	50,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">社会変化への適応パターン</text>
  <rect x="40" y="55" width="335" height="160" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="207" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">抵抗パターン</text>
  <text x="207" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 変化を拒絶・無視</text>
  <text x="207" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 既存の仕組みを守る</text>
  <text x="207" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 技術への恐怖</text>
  <text x="207" y="175" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">→ 取り残されるリスク</text>
  <rect x="425" y="55" width="335" height="160" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="592" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">適応パターン</text>
  <text x="592" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 変化を機会として捉える</text>
  <text x="592" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 新しいスキルを学ぶ</text>
  <text x="592" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• AIと協働する</text>
  <text x="592" y="175" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">→ 新時代の担い手に</text>
</svg>`,
);

// idx 59: 政策立案者への提言
addSvg(
	59,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">政策立案者への提言</text>
  <rect x="40" y="50" width="335" height="170" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="207" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">規制・ガバナンス</text>
  <text x="207" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• AI Safety 義務化</text>
  <text x="207" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 透明性・説明責任</text>
  <text x="207" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 国際協調フレームワーク</text>
  <text x="207" y="157" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• バイアス監査の義務化</text>
  <text x="207" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">EU AI Act が先行モデル</text>
  <rect x="425" y="50" width="335" height="170" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="592" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">社会インフラ整備</text>
  <text x="592" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• デジタルリテラシー教育</text>
  <text x="592" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 再教育プログラム</text>
  <text x="592" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• UBI 実証実験</text>
  <text x="592" y="157" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• デジタル格差解消</text>
  <text x="592" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">技術と社会の並走が重要</text>
</svg>`,
);

// idx 65: 私たちが今できること
addSvg(
	65,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">私たちが今できること</text>
  <rect x="40" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="147" y="83" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">学ぶ</text>
  <text x="147" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AIリテラシー向上</text>
  <text x="147" y="123" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">批判的思考</text>
  <text x="147" y="141" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">倫理的視点</text>
  <rect x="292" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="399" y="83" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">関与する</text>
  <text x="399" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">政策議論に参加</text>
  <text x="399" y="123" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AI企業へ圧力</text>
  <text x="399" y="141" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">民主的コントロール</text>
  <rect x="545" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="652" y="83" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">行動する</text>
  <text x="652" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">責任ある AI 活用</text>
  <text x="652" y="123" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">多様性への配慮</text>
  <text x="652" y="141" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">次世代への投資</text>
</svg>`,
);

// idx 72: まとめ — 未来を選ぶのは私たち
addSvg(
	72,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">まとめ: 未来への分岐</text>
  <polygon points="400,60 130,190 670,190" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="265" y1="125" x2="535" y2="125" stroke="#444" stroke-width="1"/>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">今の選択・行動</text>
  <text x="230" y="115" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">ディストピア</text>
  <text x="570" y="115" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">ユートピア</text>
  <text x="240" y="160" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">無関心・規制なし</text>
  <text x="240" y="178" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">格差・監視・制御不能</text>
  <text x="560" y="160" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">民主的ガバナンス</text>
  <text x="560" y="178" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">教育・共創・包摂</text>
  <text x="400" y="218" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">未来は決まっていない — あなたが選ぶ</text>
</svg>`,
);

// idx 77: AIと民主主義
addSvg(
	77,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">AIと民主主義: リスクと機会</text>
  <rect x="40" y="50" width="335" height="165" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="207" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">民主主義へのリスク</text>
  <text x="207" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• ディープフェイク・情報操作</text>
  <text x="207" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• フィルターバブルの固定化</text>
  <text x="207" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 政治広告の自動最適化</text>
  <text x="207" y="157" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 投票操作・世論誘導</text>
  <rect x="425" y="50" width="335" height="165" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="592" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">民主主義への機会</text>
  <text x="592" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 政策立案の証拠基盤強化</text>
  <text x="592" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 市民参加ツール</text>
  <text x="592" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 誤情報検出システム</text>
  <text x="592" y="157" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• 透明な行政 AI</text>
</svg>`,
);

// idx 83: Q&A
addSvg(
	83,
	`<svg viewBox="0 0 800 220" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="220" fill="#1a1a2e"/>
  <text x="400" y="40" text-anchor="middle" fill="#f9a825" font-size="16" font-family="sans-serif">ディスカッションテーマ</text>
  <rect x="60" y="65" width="310" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="215" y="92" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">あなたの組織は？</text>
  <text x="215" y="112" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AIをどう使い始めるべきか</text>
  <text x="215" y="130" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">リスクを最小化しながら</text>
  <text x="215" y="148" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">価値を最大化するには？</text>
  <text x="215" y="170" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">（グループワーク 5分）</text>
  <rect x="430" y="65" width="310" height="130" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="585" y="92" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">社会として？</text>
  <text x="585" y="112" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">どんな AI ガバナンスが</text>
  <text x="585" y="130" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">必要か</text>
  <text x="585" y="148" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">誰が決めるべきか？</text>
  <text x="585" y="170" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">（グループワーク 5分）</text>
</svg>`,
);

writeFileSync(path, JSON.stringify(data, null, 2));
const result = JSON.parse(require("fs").readFileSync(path, "utf-8"));
const svgCount = result.slides.filter((s: any) =>
	s.content?.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVGs: ${svgCount}/${result.slides.length} (${Math.round((svgCount * 100) / result.slides.length)}%)`,
);
