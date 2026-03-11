import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219130000_ai-agent-design-patterns/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const slides = data.slides;

function addSvg(idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

// idx 0: AI エージェント設計パターン (title slide)
addSvg(
	0,
	`<svg viewBox="0 0 800 300" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="300" fill="#1a1a2e"/>
  <circle cx="400" cy="150" r="60" fill="#16213e" stroke="#f9a825" stroke-width="3"/>
  <text x="400" y="145" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">AI Agent</text>
  <text x="400" y="163" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Core</text>
  <circle cx="160" cy="80" r="42" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="160" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Core</text>
  <text x="160" y="92" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Patterns</text>
  <line x1="342" y1="123" x2="200" y2="99" stroke="#888" stroke-width="1.5"/>
  <circle cx="640" cy="80" r="42" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="640" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Orchestration</text>
  <text x="640" y="92" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Patterns</text>
  <line x1="458" y1="123" x2="601" y2="99" stroke="#888" stroke-width="1.5"/>
  <circle cx="160" cy="225" r="42" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="160" y="221" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Reliability</text>
  <text x="160" y="237" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Patterns</text>
  <line x1="342" y1="177" x2="200" y2="204" stroke="#888" stroke-width="1.5"/>
  <circle cx="640" cy="225" r="42" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="640" y="221" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Best</text>
  <text x="640" y="237" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Practices</text>
  <line x1="458" y1="177" x2="601" y2="204" stroke="#888" stroke-width="1.5"/>
</svg>`,
);

// idx 3: 1. AI エージェントとは
addSvg(
	3,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <rect x="60" y="20" width="200" height="80" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="160" y="55" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Traditional Software</text>
  <text x="160" y="75" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Input → Rule → Output</text>
  <rect x="310" y="20" width="200" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="410" y="55" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM</text>
  <text x="410" y="75" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Input → Reason → Output</text>
  <rect x="560" y="20" width="180" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="650" y="55" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">AI Agent</text>
  <text x="650" y="75" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Perceive→Plan→Act</text>
  <polygon points="278,60 300,54 300,66" fill="#888"/>
  <line x1="260" y1="60" x2="300" y2="60" stroke="#888" stroke-width="1.5"/>
  <polygon points="528,60 550,54 550,66" fill="#f9a825"/>
  <line x1="510" y1="60" x2="550" y2="60" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="100" y="140" width="130" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="165" y="166" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Perception</text>
  <text x="165" y="182" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">環境を観測</text>
  <rect x="260" y="140" width="130" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="325" y="166" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Reasoning</text>
  <text x="325" y="182" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">計画・判断</text>
  <rect x="420" y="140" width="130" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="485" y="166" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Action</text>
  <text x="485" y="182" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ツール実行</text>
  <rect x="580" y="140" width="120" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="640" y="166" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Learning</text>
  <text x="640" y="182" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">フィードバック</text>
  <polygon points="238,170 258,164 258,176" fill="#888"/>
  <line x1="230" y1="170" x2="258" y2="170" stroke="#888" stroke-width="1.5"/>
  <polygon points="398,170 418,164 418,176" fill="#888"/>
  <line x1="390" y1="170" x2="418" y2="170" stroke="#888" stroke-width="1.5"/>
  <polygon points="558,170 578,164 578,176" fill="#888"/>
  <line x1="550" y1="170" x2="578" y2="170" stroke="#888" stroke-width="1.5"/>
</svg>`,
);

// idx 6: なぜ設計パターンが必要か
addSvg(
	6,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">設計パターンがもたらす価値</text>
  <rect x="30" y="50" width="165" height="175" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="112" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">再利用性</text>
  <text x="112" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">実証済みの解法を</text>
  <text x="112" y="116" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">繰り返し適用</text>
  <text x="112" y="148" text-anchor="middle" fill="#f9a825" font-size="28" font-family="sans-serif">⟳</text>
  <rect x="215" y="50" width="165" height="175" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="297" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">共通言語</text>
  <text x="297" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">チーム間で設計を</text>
  <text x="297" y="116" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">明確に伝達</text>
  <text x="297" y="148" text-anchor="middle" fill="#f9a825" font-size="28" font-family="sans-serif">💬</text>
  <rect x="400" y="50" width="165" height="175" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="482" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">品質向上</text>
  <text x="482" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">既知の問題を</text>
  <text x="482" y="116" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">事前に回避</text>
  <text x="482" y="148" text-anchor="middle" fill="#f9a825" font-size="28" font-family="sans-serif">✓</text>
  <rect x="585" y="50" width="185" height="175" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="677" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">スケーラビリティ</text>
  <text x="677" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">複雑なシステムを</text>
  <text x="677" y="116" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">体系的に構築</text>
  <text x="677" y="148" text-anchor="middle" fill="#f9a825" font-size="28" font-family="sans-serif">▲</text>
</svg>`,
);

// idx 8: 2. Core Patterns (section header)
addSvg(
	8,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Core Patterns 概要</text>
  <rect x="50" y="55" width="160" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="130" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">ReAct</text>
  <text x="130" y="103" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">思考→行動→観察</text>
  <text x="130" y="119" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">反復ループ</text>
  <rect x="230" y="55" width="160" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="310" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Tool Use</text>
  <text x="310" y="103" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">外部ツール呼び出し</text>
  <text x="310" y="119" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">能力拡張</text>
  <rect x="410" y="55" width="160" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="490" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Memory</text>
  <text x="490" y="103" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">短期・長期記憶</text>
  <text x="490" y="119" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">状態管理</text>
  <rect x="590" y="55" width="160" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="670" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Planning</text>
  <text x="670" y="103" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">タスク分解</text>
  <text x="670" y="119" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">目標達成</text>
  <rect x="150" y="175" width="500" height="60" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="200" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">すべての Core Patterns は Perceive → Plan → Act サイクルを実装</text>
  <text x="400" y="220" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">組み合わせて使うことでより強力なエージェントを構築できる</text>
  <line x1="130" y1="140" x2="400" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="310" y1="140" x2="400" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="490" y1="140" x2="400" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="670" y1="140" x2="400" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="4,3"/>
</svg>`,
);

// idx 10: ReAct: Thought-Action-Observation サイクル
addSvg(
	10,
	`<svg viewBox="0 0 800 270" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="270" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">ReAct サイクル</text>
  <circle cx="400" cy="145" r="38" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="141" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">LLM</text>
  <text x="400" y="157" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">Core</text>
  <ellipse cx="180" cy="80" rx="70" ry="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="180" y="76" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Thought</text>
  <text x="180" y="92" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">推論・計画</text>
  <ellipse cx="620" cy="80" rx="70" ry="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="620" y="76" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Action</text>
  <text x="620" y="92" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ツール実行</text>
  <ellipse cx="400" cy="230" rx="70" ry="33" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="226" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Observation</text>
  <text x="400" y="242" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">結果観察</text>
  <line x1="248" y1="90" x2="367" y2="123" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="358,119 370,123 362,132" fill="#f9a825"/>
  <line x1="435" y1="125" x2="552" y2="92" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="552,92 563,89 556,98" fill="#f9a825"/>
  <line x1="613" y1="115" x2="450" y2="207" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="452,207 441,212 447,200" fill="#f9a825"/>
  <line x1="350" y1="210" x2="230" y2="113" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="235,115 224,111 231,122" fill="#f9a825"/>
  <text x="270" y="158" fill="#aaa" font-size="10" font-family="sans-serif" transform="rotate(-35,270,158)">解析</text>
  <text x="510" y="115" fill="#aaa" font-size="10" font-family="sans-serif" transform="rotate(25,510,115)">実行</text>
</svg>`,
);

// idx 14: Tool Use パターン
addSvg(
	14,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Tool Use パターン</text>
  <rect x="290" y="45" width="220" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="72" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">AI Agent (LLM)</text>
  <text x="400" y="92" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ツール選択・パラメータ生成</text>
  <rect x="30" y="160" width="140" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="100" y="188" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Web Search</text>
  <text x="100" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">リアルタイム情報</text>
  <rect x="190" y="160" width="140" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="260" y="188" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Code Exec</text>
  <text x="260" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">計算・処理</text>
  <rect x="350" y="160" width="140" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="420" y="188" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Database</text>
  <text x="420" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">永続データ取得</text>
  <rect x="510" y="160" width="140" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="580" y="188" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">API Call</text>
  <text x="580" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">外部サービス</text>
  <rect x="650" y="160" width="120" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="710" y="188" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">File I/O</text>
  <text x="710" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ファイル操作</text>
  <line x1="400" y1="105" x2="100" y2="160" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="260" y2="160" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="420" y2="160" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="580" y2="160" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="710" y2="160" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,
);

// idx 18: Memory パターン概要
addSvg(
	18,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Memory パターン: 4層構造</text>
  <rect x="40" y="50" width="340" height="90" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="210" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">短期メモリ (In-Context)</text>
  <text x="210" y="98" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">現在の会話履歴・作業状態</text>
  <text x="210" y="114" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コンテキストウィンドウ内に保持</text>
  <rect x="420" y="50" width="340" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="590" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">長期メモリ (External)</text>
  <text x="590" y="98" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">ベクターDB・KVストア</text>
  <text x="590" y="114" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">セッション超えて保持</text>
  <rect x="40" y="160" width="340" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="210" y="188" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">エピソードメモリ</text>
  <text x="210" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">過去の対話・経験の記録</text>
  <text x="210" y="222" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">類似事例の検索・活用</text>
  <rect x="420" y="160" width="340" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="590" y="188" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">意味メモリ</text>
  <text x="590" y="206" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">知識・事実・ルールの保存</text>
  <text x="590" y="222" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">RAGによる知識検索</text>
</svg>`,
);

// idx 21: エージェントのステート管理
addSvg(
	21,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">エージェント ステートマシン</text>
  <rect x="60" y="60" width="120" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="120" y="83" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Idle</text>
  <text x="120" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">待機中</text>
  <rect x="245" y="60" width="120" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="305" y="83" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Planning</text>
  <text x="305" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスク分解</text>
  <rect x="430" y="60" width="120" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="490" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Executing</text>
  <text x="490" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ツール実行中</text>
  <rect x="615" y="60" width="120" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="675" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Reflecting</text>
  <text x="675" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">結果評価</text>
  <rect x="430" y="175" width="120" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="490" y="198" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Done</text>
  <text x="490" y="215" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">完了</text>
  <polygon points="243,87 243,81 233,87" fill="#f9a825"/>
  <line x1="180" y1="87" x2="243" y2="87" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="428,87 428,81 418,87" fill="#e91e63"/>
  <line x1="365" y1="87" x2="428" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="613,87 613,81 603,87" fill="#e91e63"/>
  <line x1="550" y1="87" x2="613" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="675" y1="115" x2="675" y2="150" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="675" y1="150" x2="305" y2="150" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="305,118 299,118 305,108" fill="#f9a825"/>
  <line x1="305" y1="115" x2="305" y2="150" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="490" y="150" fill="#aaa" font-size="10" font-family="sans-serif">再計画</text>
  <line x1="490" y1="115" x2="490" y2="175" stroke="#888" stroke-width="1.5"/>
  <polygon points="484,170 490,180 496,170" fill="#888"/>
</svg>`,
);

// idx 23: 3. Orchestration Patterns
addSvg(
	23,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Orchestration Patterns 比較</text>
  <rect x="30" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Single Agent</text>
  <circle cx="140" cy="130" r="30" fill="#1a1a2e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="135" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">Agent</text>
  <text x="140" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">単一 LLM + Tools</text>
  <text x="140" y="202" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">シンプル・高速</text>
  <rect x="270" y="50" width="240" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="390" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Orchestrator-Subagents</text>
  <circle cx="390" cy="108" r="22" fill="#1a1a2e" stroke="#e91e63" stroke-width="2"/>
  <text x="390" y="113" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">Orch</text>
  <circle cx="320" cy="160" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="320" y="165" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Sub1</text>
  <circle cx="390" cy="165" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="390" y="170" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Sub2</text>
  <circle cx="460" cy="160" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="460" y="165" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Sub3</text>
  <line x1="379" y1="128" x2="330" y2="143" stroke="#888" stroke-width="1.5"/>
  <line x1="390" y1="130" x2="390" y2="147" stroke="#888" stroke-width="1.5"/>
  <line x1="401" y1="128" x2="450" y2="143" stroke="#888" stroke-width="1.5"/>
  <text x="390" y="205" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスク分散・専門化</text>
  <rect x="530" y="50" width="240" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="650" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Swarm</text>
  <circle cx="600" cy="130" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="600" y="135" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">A1</text>
  <circle cx="650" cy="105" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="650" y="110" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">A2</text>
  <circle cx="700" cy="130" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="700" y="135" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">A3</text>
  <circle cx="650" cy="158" r="18" fill="#1a1a2e" stroke="#888" stroke-width="1.5"/>
  <text x="650" y="163" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">A4</text>
  <line x1="615" y1="120" x2="637" y2="113" stroke="#888" stroke-width="1"/>
  <line x1="666" y1="113" x2="685" y2="120" stroke="#888" stroke-width="1"/>
  <line x1="697" y1="145" x2="663" y2="153" stroke="#888" stroke-width="1"/>
  <line x1="635" y1="153" x2="612" y2="143" stroke="#888" stroke-width="1"/>
  <text x="650" y="205" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">自律協調・創発</text>
</svg>`,
);

// idx 29: Parallel Agents パターン
addSvg(
	29,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Parallel Agents パターン</text>
  <rect x="310" y="45" width="180" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="66" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Orchestrator</text>
  <text x="400" y="84" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスク分散・結果集約</text>
  <rect x="40" y="145" width="140" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Worker A</text>
  <text x="110" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">サブタスク 1</text>
  <rect x="200" y="145" width="140" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="270" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Worker B</text>
  <text x="270" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">サブタスク 2</text>
  <rect x="360" y="145" width="140" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="430" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Worker C</text>
  <text x="430" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">サブタスク 3</text>
  <rect x="520" y="145" width="140" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="590" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Worker D</text>
  <text x="590" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">サブタスク 4</text>
  <line x1="400" y1="95" x2="110" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="270" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="430" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="590" y2="145" stroke="#888" stroke-width="1.5"/>
  <polygon points="107,141 110,150 113,141" fill="#888"/>
  <polygon points="267,141 270,150 273,141" fill="#888"/>
  <polygon points="427,141 430,150 433,141" fill="#888"/>
  <polygon points="587,141 590,150 593,141" fill="#888"/>
  <rect x="260" y="225" width="280" height="30" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="245" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">結果マージ → 最終レスポンス</text>
</svg>`,
);

// idx 32: Swarm パターン
addSvg(
	32,
	`<svg viewBox="0 0 800 270" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="270" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Swarm パターン: 自律協調</text>
  <circle cx="400" cy="140" r="25" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="145" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">共有目標</text>
  <circle cx="180" cy="80" r="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="180" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Agent A</text>
  <text x="180" y="92" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">専門: 検索</text>
  <circle cx="620" cy="80" r="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="620" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Agent B</text>
  <text x="620" y="92" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">専門: 分析</text>
  <circle cx="180" cy="210" r="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="180" y="206" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Agent C</text>
  <text x="180" y="222" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">専門: 実行</text>
  <circle cx="620" cy="210" r="35" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="620" y="206" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Agent D</text>
  <text x="620" y="222" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">専門: 検証</text>
  <line x1="210" y1="95" x2="378" y2="130" stroke="#888" stroke-width="1"/>
  <line x1="590" y1="95" x2="422" y2="130" stroke="#888" stroke-width="1"/>
  <line x1="210" y1="198" x2="378" y2="152" stroke="#888" stroke-width="1"/>
  <line x1="590" y1="198" x2="422" y2="152" stroke="#888" stroke-width="1"/>
  <line x1="213" y1="102" x2="586" y2="98" stroke="#888" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="213" y1="200" x2="586" y2="200" stroke="#888" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="180" y1="115" x2="180" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="620" y1="115" x2="620" y2="175" stroke="#888" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="400" y="260" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">エージェント間の直接通信・動的役割分担</text>
</svg>`,
);

// idx 36: なぜ Reliability が重要か
addSvg(
	36,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Reliability リスク マトリクス</text>
  <text x="60" y="80" fill="#aaa" font-size="11" font-family="sans-serif">高</text>
  <text x="60" y="170" fill="#aaa" font-size="11" font-family="sans-serif">低</text>
  <text x="150" y="250" fill="#aaa" font-size="11" font-family="sans-serif">影響小</text>
  <text x="600" y="250" fill="#aaa" font-size="11" font-family="sans-serif">影響大</text>
  <text x="20" y="165" fill="#aaa" font-size="10" font-family="sans-serif" transform="rotate(-90,30,145)">発生頻度</text>
  <rect x="80" y="50" width="660" height="185" fill="none" stroke="#444" stroke-width="1"/>
  <rect x="80" y="50" width="330" height="92" fill="#16213e" opacity="0.5"/>
  <rect x="410" y="50" width="330" height="92" fill="#e91e63" opacity="0.15"/>
  <rect x="80" y="142" width="330" height="93" fill="#16213e" opacity="0.3"/>
  <rect x="410" y="142" width="330" height="93" fill="#e91e63" opacity="0.25"/>
  <text x="245" y="100" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">幻覚・誤回答</text>
  <text x="245" y="118" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">検証ループで対処</text>
  <text x="575" y="96" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">ループ・暴走</text>
  <text x="575" y="114" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タイムアウト必須</text>
  <text x="245" y="190" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">API エラー</text>
  <text x="245" y="208" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">リトライで解決</text>
  <text x="575" y="190" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">権限昇格・注入</text>
  <text x="575" y="208" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">HiTL + サンドボックス</text>
  <line x1="80" y1="142" x2="740" y2="142" stroke="#444" stroke-width="1"/>
  <line x1="410" y1="50" x2="410" y2="235" stroke="#444" stroke-width="1"/>
</svg>`,
);

// idx 38: Human-in-the-Loop (HiTL)
addSvg(
	38,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Human-in-the-Loop パターン</text>
  <rect x="30" y="55" width="130" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="95" y="80" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">User</text>
  <text x="95" y="97" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">タスク入力</text>
  <rect x="215" y="55" width="130" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="280" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Agent</text>
  <text x="280" y="97" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">計画・実行</text>
  <rect x="400" y="55" width="150" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="475" y="76" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Risk Check</text>
  <text x="475" y="94" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">高リスク操作?</text>
  <rect x="610" y="55" width="150" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="685" y="78" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Human Review</text>
  <text x="685" y="96" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">承認 / 却下</text>
  <rect x="400" y="175" width="150" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="475" y="198" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Auto Execute</text>
  <text x="475" y="216" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">自動実行</text>
  <polygon points="213,82 213,76 203,82" fill="#f9a825"/>
  <line x1="160" y1="82" x2="213" y2="82" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="398,82 398,76 388,82" fill="#e91e63"/>
  <line x1="345" y1="82" x2="398" y2="82" stroke="#e91e63" stroke-width="1.5"/>
  <text x="548" y="72" fill="#f9a825" font-size="10" font-family="sans-serif">YES</text>
  <polygon points="608,82 608,76 598,82" fill="#f9a825"/>
  <line x1="550" y1="82" x2="608" y2="82" stroke="#f9a825" stroke-width="1.5"/>
  <text x="483" y="168" fill="#888" font-size="10" font-family="sans-serif">NO</text>
  <line x1="475" y1="110" x2="475" y2="175" stroke="#888" stroke-width="1.5"/>
  <polygon points="469,171 475,182 481,171" fill="#888"/>
  <line x1="685" y1="110" x2="685" y2="155" stroke="#888" stroke-width="1.5"/>
  <line x1="685" y1="155" x2="280" y2="155" stroke="#888" stroke-width="1.5"/>
  <line x1="280" y1="155" x2="280" y2="110" stroke="#888" stroke-width="1.5"/>
  <polygon points="274,114 280,104 286,114" fill="#888"/>
  <text x="480" y="150" fill="#aaa" font-size="9" font-family="sans-serif">承認→再実行</text>
</svg>`,
);

// idx 41: 検証ループパターン
addSvg(
	41,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">検証ループパターン</text>
  <rect x="60" y="60" width="140" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="130" y="85" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Generate</text>
  <text x="130" y="102" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">出力生成</text>
  <rect x="260" y="60" width="140" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="330" y="85" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Validate</text>
  <text x="330" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">スキーマ/ルール検証</text>
  <rect x="460" y="60" width="140" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="530" y="85" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Pass?</text>
  <text x="530" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">検証結果判定</text>
  <rect x="660" y="60" width="110" height="55" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="715" y="85" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Done</text>
  <text x="715" y="102" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">完了</text>
  <rect x="330" y="175" width="200" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="430" y="198" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Self-Correct</text>
  <text x="430" y="216" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">エラー情報付きで再生成</text>
  <polygon points="258,87 258,81 248,87" fill="#f9a825"/>
  <line x1="200" y1="87" x2="258" y2="87" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="458,87 458,81 448,87" fill="#e91e63"/>
  <line x1="400" y1="87" x2="458" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <text x="600" y="78" fill="#888" font-size="10" font-family="sans-serif">YES</text>
  <polygon points="658,87 658,81 648,87" fill="#888"/>
  <line x1="600" y1="87" x2="658" y2="87" stroke="#888" stroke-width="1.5"/>
  <text x="543" y="152" fill="#e91e63" font-size="10" font-family="sans-serif">NO</text>
  <line x1="530" y1="115" x2="530" y2="155" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="530" y1="155" x2="430" y2="175" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="430" y1="230" x2="430" y2="248" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="430" y1="248" x2="130" y2="248" stroke="#e91e63" stroke-width="1.5"/>
  <line x1="130" y1="248" x2="130" y2="115" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="124,119 130,109 136,119" fill="#e91e63"/>
</svg>`,
);

// idx 46: 観測可能性 (Observability)
addSvg(
	46,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Observability: 3つの柱</text>
  <rect x="30" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="78" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Traces</text>
  <text x="140" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">リクエスト追跡</text>
  <text x="140" y="116" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Span / TraceID</text>
  <rect x="50" y="135" width="180" height="35" rx="4" fill="#1a1a2e"/>
  <text x="80" y="156" fill="#888" font-size="9" font-family="sans-serif">→ tool_call [12ms]</text>
  <text x="80" y="172" fill="#888" font-size="9" font-family="sans-serif">  → search [8ms]</text>
  <text x="80" y="188" fill="#888" font-size="9" font-family="sans-serif">  → parse [4ms]</text>
  <text x="80" y="205" fill="#888" font-size="9" font-family="sans-serif">→ generate [230ms]</text>
  <rect x="290" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">Metrics</text>
  <text x="400" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">定量的な指標</text>
  <text x="400" y="116" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">レイテンシ / エラー率</text>
  <rect x="310" y="130" width="180" height="80" rx="4" fill="#1a1a2e"/>
  <rect x="330" y="195" width="15" height="10" fill="#f9a825"/>
  <rect x="355" y="180" width="15" height="25" fill="#f9a825"/>
  <rect x="380" y="160" width="15" height="45" fill="#e91e63"/>
  <rect x="405" y="170" width="15" height="35" fill="#f9a825"/>
  <rect x="430" y="155" width="15" height="50" fill="#f9a825"/>
  <rect x="455" y="175" width="15" height="30" fill="#f9a825"/>
  <rect x="550" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="660" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">Logs</text>
  <text x="660" y="100" text-anchor="middle" fill="#ffffff" font-size="10" font-family="sans-serif">構造化ログ</text>
  <text x="660" y="116" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">JSON / イベント</text>
  <text x="572" y="145" fill="#888" font-size="9" font-family="sans-serif">{</text>
  <text x="572" y="160" fill="#888" font-size="9" font-family="sans-serif">  "event": "tool_call",</text>
  <text x="572" y="175" fill="#888" font-size="9" font-family="sans-serif">  "tool": "search",</text>
  <text x="572" y="190" fill="#888" font-size="9" font-family="sans-serif">  "latency_ms": 12,</text>
  <text x="572" y="205" fill="#888" font-size="9" font-family="sans-serif">  "status": "ok"</text>
  <text x="572" y="220" fill="#888" font-size="9" font-family="sans-serif">}</text>
</svg>`,
);

// idx 48: 5. 実アーキテクチャ事例
addSvg(
	48,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">実アーキテクチャ事例 概要</text>
  <rect x="30" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">コード生成エージェント</text>
  <text x="140" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">要件 → 設計 → 実装 → テスト</text>
  <text x="140" y="130" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">ReAct + Tool Use</text>
  <text x="140" y="148" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">+ 検証ループ</text>
  <rect x="290" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">リサーチエージェント</text>
  <text x="400" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">計画 → 検索 → 分析 → 執筆</text>
  <text x="400" y="130" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">Plan-then-Execute</text>
  <text x="400" y="148" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">+ Parallel Agents</text>
  <rect x="550" y="50" width="220" height="185" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="660" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">RAGエージェント</text>
  <text x="660" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">クエリ展開 → 検索 → 回答</text>
  <text x="660" y="130" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">Advanced RAG</text>
  <text x="660" y="148" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">+ Memory パターン</text>
</svg>`,
);

// idx 51: リサーチエージェントの設計
addSvg(
	51,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">リサーチエージェント アーキテクチャ</text>
  <rect x="300" y="45" width="200" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="68" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Planner Agent</text>
  <text x="400" y="85" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">研究計画・サブクエリ生成</text>
  <rect x="60" y="145" width="155" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="137" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Search Agent</text>
  <text x="137" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Web 情報収集</text>
  <rect x="245" y="145" width="155" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="322" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Analysis Agent</text>
  <text x="322" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">データ分析</text>
  <rect x="430" y="145" width="155" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="507" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Critic Agent</text>
  <text x="507" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">品質検証</text>
  <rect x="615" y="145" width="155" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="692" y="168" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Writer Agent</text>
  <text x="692" y="185" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">レポート生成</text>
  <line x1="400" y1="95" x2="137" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="322" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="507" y2="145" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="95" x2="692" y2="145" stroke="#888" stroke-width="1.5"/>
  <rect x="260" y="230" width="280" height="28" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="249" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Synthesizer: 結果統合 → 最終レポート</text>
</svg>`,
);

// idx 55: Advanced RAG パターン
addSvg(
	55,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Advanced RAG パイプライン</text>
  <rect x="30" y="55" width="120" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="90" y="80" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Query</text>
  <text x="90" y="97" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">ユーザー質問</text>
  <rect x="180" y="45" width="130" height="75" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="245" y="68" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Query</text>
  <text x="245" y="84" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Rewrite</text>
  <text x="245" y="104" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">クエリ最適化</text>
  <rect x="340" y="45" width="130" height="75" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="405" y="68" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Hybrid</text>
  <text x="405" y="84" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Search</text>
  <text x="405" y="104" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Dense+Sparse</text>
  <rect x="500" y="45" width="130" height="75" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="565" y="68" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Re-rank</text>
  <text x="565" y="84" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">+ Filter</text>
  <text x="565" y="104" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">関連度スコア</text>
  <rect x="660" y="55" width="110" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="715" y="78" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Generate</text>
  <text x="715" y="95" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">最終回答</text>
  <polygon points="178,82 178,76 168,82" fill="#f9a825"/>
  <line x1="150" y1="82" x2="178" y2="82" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="338,82 338,76 328,82" fill="#f9a825"/>
  <line x1="310" y1="82" x2="338" y2="82" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="498,82 498,76 488,82" fill="#e91e63"/>
  <line x1="470" y1="82" x2="498" y2="82" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="658,82 658,76 648,82" fill="#888"/>
  <line x1="630" y1="82" x2="658" y2="82" stroke="#888" stroke-width="1.5"/>
  <rect x="100" y="165" width="600" height="70" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="190" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Advanced RAG の特徴</text>
  <text x="200" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Multi-vector 検索</text>
  <text x="400" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Self-RAG (自己反省)</text>
  <text x="600" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Contextual Compression</text>
</svg>`,
);

// idx 57: 6. 実装ベストプラクティス
addSvg(
	57,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">実装ベストプラクティス 6領域</text>
  <rect x="30" y="55" width="220" height="80" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">システムプロンプト設計</text>
  <text x="140" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">明確な役割・制約・例示</text>
  <rect x="290" y="55" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">コンテキスト管理</text>
  <text x="400" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ウィンドウ最適化・圧縮</text>
  <rect x="550" y="55" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="660" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Prompt Caching</text>
  <text x="660" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コスト削減・高速化</text>
  <rect x="30" y="165" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="140" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">評価・テスト</text>
  <text x="140" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">自動評価・人間評価</text>
  <rect x="290" y="165" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">セキュリティ</text>
  <text x="400" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">インジェクション対策</text>
  <rect x="550" y="165" width="220" height="80" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="660" y="195" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">コスト管理</text>
  <text x="660" y="215" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">トークン最適化</text>
</svg>`,
);

// idx 58: システムプロンプト設計
addSvg(
	58,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">システムプロンプト 構造</text>
  <rect x="60" y="50" width="680" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="77" fill="#f9a825" font-size="12" font-family="sans-serif">Role Definition</text>
  <text x="200" y="96" fill="#aaa" font-size="10" font-family="sans-serif">あなたは〇〇の専門家です。以下のツールを使って...</text>
  <rect x="60" y="125" width="680" height="55" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="150" fill="#e91e63" font-size="12" font-family="sans-serif">Constraints &amp; Rules</text>
  <text x="200" y="168" fill="#aaa" font-size="10" font-family="sans-serif">〇〇してはいけない。不明な場合は確認する...</text>
  <rect x="60" y="193" width="320" height="50" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="220" y="216" fill="#888" font-size="11" font-family="sans-serif">Output Format</text>
  <text x="220" y="232" fill="#888" font-size="10" font-family="sans-serif">JSON / Markdown 指定</text>
  <rect x="420" y="193" width="320" height="50" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="580" y="216" fill="#888" font-size="11" font-family="sans-serif">Few-shot Examples</text>
  <text x="580" y="232" fill="#888" font-size="10" font-family="sans-serif">1-3 個の良い例示</text>
</svg>`,
);

// idx 62: エージェントの評価・テスト戦略
addSvg(
	62,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">エージェント評価の4層ピラミッド</text>
  <polygon points="400,50 700,220 100,220" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="190" y1="170" x2="610" y2="170" stroke="#444" stroke-width="1"/>
  <line x1="250" y1="130" x2="550" y2="130" stroke="#444" stroke-width="1"/>
  <line x1="320" y1="90" x2="480" y2="90" stroke="#444" stroke-width="1"/>
  <text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Human Eval</text>
  <text x="400" y="118" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">LLM-as-Judge</text>
  <text x="400" y="158" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Integration Tests</text>
  <text x="400" y="200" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Unit Tests (ツール・スキーマ)</text>
  <text x="730" y="78" fill="#888" font-size="9" font-family="sans-serif">精度高</text>
  <text x="730" y="200" fill="#888" font-size="9" font-family="sans-serif">速度高</text>
  <text x="60" y="78" fill="#aaa" font-size="9" font-family="sans-serif">低速/高品質</text>
  <text x="60" y="200" fill="#aaa" font-size="9" font-family="sans-serif">高速/低コスト</text>
</svg>`,
);

// idx 63: エージェントセキュリティ
addSvg(
	63,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">エージェントセキュリティ 対策</text>
  <rect x="30" y="50" width="220" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="140" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Prompt Injection</text>
  <text x="140" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">悪意のある入力</text>
  <text x="140" y="114" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ 入力サニタイズ</text>
  <text x="140" y="130" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ ガードレール設置</text>
  <rect x="290" y="50" width="220" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">権限昇格</text>
  <text x="400" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">過剰なツール権限</text>
  <text x="400" y="114" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ 最小権限原則</text>
  <text x="400" y="130" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ HiTL 承認フロー</text>
  <rect x="550" y="50" width="220" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="660" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">データ漏洩</text>
  <text x="660" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">機密情報の流出</text>
  <text x="660" y="114" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ PII フィルタリング</text>
  <text x="660" y="130" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">→ 出力検査</text>
  <rect x="30" y="165" width="220" height="75" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="140" y="190" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Sandbox 実行</text>
  <text x="140" y="210" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">コード実行の隔離</text>
  <rect x="290" y="165" width="220" height="75" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="400" y="190" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Rate Limiting</text>
  <text x="400" y="210" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">API 乱用防止</text>
  <rect x="550" y="165" width="220" height="75" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="660" y="190" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Audit Logging</text>
  <text x="660" y="210" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">全操作の追跡</text>
</svg>`,
);

// idx 64: コスト管理と最適化
addSvg(
	64,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">コスト最適化 戦略</text>
  <rect x="40" y="55" width="680" height="45" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <rect x="40" y="55" width="680" height="45" rx="6" fill="#e91e63" opacity="0.2"/>
  <text x="400" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">コスト最大要因: 入力トークン × API 呼び出し回数</text>
  <text x="400" y="93" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">特に長いシステムプロンプト + 大量の会話履歴</text>
  <rect x="40" y="115" width="155" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="117" y="140" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Caching</text>
  <text x="117" y="158" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">同一プレフィックス</text>
  <text x="117" y="174" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">最大90%削減</text>
  <text x="117" y="192" text-anchor="middle" fill="#f9a825" font-size="20" font-family="sans-serif">↓90%</text>
  <rect x="215" y="115" width="155" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="292" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Context 圧縮</text>
  <text x="292" y="158" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">要約・選択的保持</text>
  <text x="292" y="174" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">50-70%削減</text>
  <rect x="390" y="115" width="155" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="467" y="140" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Model 選択</text>
  <text x="467" y="158" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスク別モデル</text>
  <text x="467" y="174" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Haiku 活用</text>
  <rect x="565" y="115" width="155" height="120" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="642" y="140" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Batching</text>
  <text x="642" y="158" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">非同期バッチ処理</text>
  <text x="642" y="174" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">50%割引</text>
</svg>`,
);

// idx 66: 7. まとめ・Q&A
addSvg(
	66,
	`<svg viewBox="0 0 800 260" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">AIエージェント設計パターン まとめ</text>
  <rect x="30" y="50" width="340" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="76" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Core Patterns</text>
  <text x="200" y="96" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ReAct · Tool Use · Memory · Planning</text>
  <text x="200" y="114" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">基盤となる4つのパターン</text>
  <rect x="430" y="50" width="340" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="76" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Orchestration</text>
  <text x="600" y="96" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Single · Orchestrator · Parallel · Swarm</text>
  <text x="600" y="114" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">複数エージェントの協調</text>
  <rect x="30" y="155" width="340" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="200" y="181" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Reliability</text>
  <text x="200" y="201" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">HiTL · 検証ループ · エラー回復</text>
  <text x="200" y="219" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">本番運用の信頼性確保</text>
  <rect x="430" y="155" width="340" height="85" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="600" y="181" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Best Practices</text>
  <text x="600" y="201" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">設計 · テスト · セキュリティ · コスト</text>
  <text x="600" y="219" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">実装品質の向上</text>
</svg>`,
);

writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Done. Counting SVGs...");
const result = JSON.parse(require("fs").readFileSync(path, "utf-8"));
const svgCount = result.slides.filter((s: any) =>
	s.content?.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVGs: ${svgCount}/${result.slides.length} (${Math.round((svgCount * 100) / result.slides.length)}%)`,
);
