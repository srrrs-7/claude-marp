#!/usr/bin/env bun
// Patch script batch 2: add more SVGs to openclaw slides-data.json

import { readFileSync, writeFileSync } from "fs";

const FILE = "docs/20260219140000_openclaw/slides-data.json";
const data = JSON.parse(readFileSync(FILE, "utf-8"));

const SVG_STYLE = `max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0`;

function addSvg(slides: any[], idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

const s = data.slides;

// Index 3: OpenClawとは何か（1/2）
addSvg(
	s,
	3,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">OpenClawとは何か — 概要</text>
  <!-- Feature cards in grid -->
  <rect x="40" y="55" width="340" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">オープンソースAIエージェント</text>
  <text x="210" y="103" text-anchor="middle" fill="#ffffff" font-size="11">自律タスク実行フレームワーク</text>
  <text x="210" y="121" text-anchor="middle" fill="#ffffff" font-size="10">MIT License · GitHub公開</text>
  <rect x="420" y="55" width="340" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="590" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">複数LLMサポート</text>
  <text x="590" y="103" text-anchor="middle" fill="#ffffff" font-size="11">Claude, GPT, Gemini, Ollama</text>
  <text x="590" y="121" text-anchor="middle" fill="#ffffff" font-size="10">ローカル・クラウド両対応</text>
  <rect x="40" y="155" width="340" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="210" y="182" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">長期メモリシステム</text>
  <text x="210" y="203" text-anchor="middle" fill="#ffffff" font-size="11">SQLite + ベクターDB</text>
  <text x="210" y="221" text-anchor="middle" fill="#ffffff" font-size="10">Markdownネイティブ管理</text>
  <rect x="420" y="155" width="340" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="590" y="182" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">スキルエコシステム</text>
  <text x="590" y="203" text-anchor="middle" fill="#ffffff" font-size="11">ClawHub コミュニティ</text>
  <text x="590" y="221" text-anchor="middle" fill="#ffffff" font-size="10">SKILL.md フォーマット</text>
</svg>`,
);

// Index 14: Phase別進化ロードマップ
addSvg(
	s,
	14,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Phase別進化ロードマップ</text>
  <!-- Phase boxes -->
  <rect x="30" y="55" width="170" height="160" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="115" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Phase 1</text>
  <text x="115" y="98" text-anchor="middle" fill="#f9a825" font-size="10">~2025/12</text>
  <text x="115" y="120" text-anchor="middle" fill="#ffffff" font-size="10">基本エージェント</text>
  <text x="115" y="138" text-anchor="middle" fill="#ffffff" font-size="10">単一LLM</text>
  <text x="115" y="156" text-anchor="middle" fill="#ffffff" font-size="10">Telegram統合</text>
  <rect x="220" y="55" width="170" height="160" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="305" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Phase 2</text>
  <text x="305" y="98" text-anchor="middle" fill="#f9a825" font-size="10">2026/01</text>
  <text x="305" y="120" text-anchor="middle" fill="#ffffff" font-size="10">マルチLLM</text>
  <text x="305" y="138" text-anchor="middle" fill="#ffffff" font-size="10">ClawHub公開</text>
  <text x="305" y="156" text-anchor="middle" fill="#ffffff" font-size="10">メモリ強化</text>
  <rect x="410" y="55" width="170" height="160" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="495" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Phase 3 ←今</text>
  <text x="495" y="98" text-anchor="middle" fill="#e91e63" font-size="10">2026/02</text>
  <text x="495" y="120" text-anchor="middle" fill="#ffffff" font-size="10">OSS化・財団移行</text>
  <text x="495" y="138" text-anchor="middle" fill="#ffffff" font-size="10">Sub-agents</text>
  <text x="495" y="156" text-anchor="middle" fill="#ffffff" font-size="10">1Mコンテキスト</text>
  <rect x="600" y="55" width="170" height="160" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5" opacity="0.7"/>
  <text x="685" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Phase 4</text>
  <text x="685" y="98" text-anchor="middle" fill="#f9a825" font-size="10">2026/Q2+</text>
  <text x="685" y="120" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.7">自律協働</text>
  <text x="685" y="138" text-anchor="middle" fill="#ffffff" font-size="10" opacity="0.7">全機能統合</text>
</svg>`,
);

// Index 15: 60日間の軌跡まとめ
addSvg(
	s,
	15,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">60日間の軌跡</text>
  <!-- Progress arc / stats -->
  <text x="200" y="90" text-anchor="middle" fill="#f9a825" font-size="40" font-weight="bold">30k+</text>
  <text x="200" y="115" text-anchor="middle" fill="#ffffff" font-size="12">GitHub Stars</text>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="40" font-weight="bold">500+</text>
  <text x="400" y="115" text-anchor="middle" fill="#ffffff" font-size="12">Contributors</text>
  <text x="600" y="90" text-anchor="middle" fill="#f9a825" font-size="40" font-weight="bold">200+</text>
  <text x="600" y="115" text-anchor="middle" fill="#ffffff" font-size="12">Skill Plugins</text>
  <!-- Bottom row -->
  <text x="200" y="170" text-anchor="middle" fill="#e91e63" font-size="32" font-weight="bold">3</text>
  <text x="200" y="193" text-anchor="middle" fill="#ffffff" font-size="12">リブランド回数</text>
  <text x="400" y="170" text-anchor="middle" fill="#e91e63" font-size="32" font-weight="bold">2</text>
  <text x="400" y="193" text-anchor="middle" fill="#ffffff" font-size="12">重大CVE発見</text>
  <text x="600" y="170" text-anchor="middle" fill="#e91e63" font-size="32" font-weight="bold">1</text>
  <text x="600" y="193" text-anchor="middle" fill="#ffffff" font-size="12">OpenAI買収</text>
  <text x="400" y="235" text-anchor="middle" fill="#f9a825" font-size="11">2025/10 〜 2026/03 — 60日間で業界を塗り替えた</text>
</svg>`,
);

// Index 17: Gatewayとは（1/2）
addSvg(
	s,
	17,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Gateway: コントロールプレーン</text>
  <!-- Gateway in center, connected to both sides -->
  <rect x="300" y="80" width="200" height="80" rx="8" fill="#e91e63" opacity="0.9"/>
  <text x="400" y="115" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">Gateway</text>
  <text x="400" y="133" text-anchor="middle" fill="#ffffff" font-size="10">コントロールプレーン</text>
  <!-- Left: Input sources -->
  <rect x="30" y="60" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="95" y="85" text-anchor="middle" fill="#ffffff" font-size="11">ユーザーリクエスト</text>
  <rect x="30" y="115" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="95" y="140" text-anchor="middle" fill="#ffffff" font-size="11">スケジュールタスク</text>
  <rect x="30" y="170" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="95" y="195" text-anchor="middle" fill="#ffffff" font-size="11">イベントトリガー</text>
  <!-- Right: Output handlers -->
  <rect x="640" y="60" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="705" y="85" text-anchor="middle" fill="#ffffff" font-size="11">認証・認可</text>
  <rect x="640" y="115" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="705" y="140" text-anchor="middle" fill="#ffffff" font-size="11">レート制限</text>
  <rect x="640" y="170" width="130" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="705" y="195" text-anchor="middle" fill="#ffffff" font-size="11">ルーティング</text>
  <!-- Arrows left to center -->
  <line x1="160" y1="80" x2="300" y2="110" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="160" y1="135" x2="300" y2="120" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="160" y1="190" x2="300" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Arrows center to right -->
  <line x1="500" y1="110" x2="640" y2="80" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="500" y1="120" x2="640" y2="135" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="500" y1="130" x2="640" y2="190" stroke="#f9a825" stroke-width="1.5"/>
</svg>`,
);

// Index 21: 対応LLM一覧
addSvg(
	s,
	21,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">対応LLM一覧</text>
  <!-- LLM cards -->
  <rect x="40" y="55" width="160" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="120" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Claude</text>
  <text x="120" y="105" text-anchor="middle" fill="#ffffff" font-size="10">Anthropic</text>
  <text x="120" y="122" text-anchor="middle" fill="#f9a825" font-size="9">推奨</text>
  <rect x="220" y="55" width="160" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="300" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">GPT-4</text>
  <text x="300" y="105" text-anchor="middle" fill="#ffffff" font-size="10">OpenAI</text>
  <text x="300" y="122" text-anchor="middle" fill="#f9a825" font-size="9">完全対応</text>
  <rect x="400" y="55" width="160" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="480" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Gemini</text>
  <text x="480" y="105" text-anchor="middle" fill="#ffffff" font-size="10">Google</text>
  <text x="480" y="122" text-anchor="middle" fill="#f9a825" font-size="9">完全対応</text>
  <rect x="580" y="55" width="180" height="80" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="670" y="85" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">Ollama</text>
  <text x="670" y="105" text-anchor="middle" fill="#ffffff" font-size="10">ローカル実行</text>
  <text x="670" y="122" text-anchor="middle" fill="#e91e63" font-size="9">プライバシー重視</text>
  <!-- Bottom row -->
  <text x="400" y="175" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">統一API: OpenAI互換フォーマット</text>
  <text x="400" y="198" text-anchor="middle" fill="#ffffff" font-size="11">1つのインターフェースで全LLMを切り替え可能</text>
  <text x="400" y="218" text-anchor="middle" fill="#ffffff" font-size="10">将来のLLMにも自動対応</text>
</svg>`,
);

// Index 22: ローカル実行モデルの意義（1/2）
addSvg(
	s,
	22,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ローカル実行 vs クラウドAPI</text>
  <rect x="40" y="55" width="330" height="170" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">ローカル (Ollama等)</text>
  <text x="205" y="108" text-anchor="middle" fill="#f9a825" font-size="11">プライバシー保護</text>
  <text x="205" y="128" text-anchor="middle" fill="#f9a825" font-size="11">コスト$0</text>
  <text x="205" y="148" text-anchor="middle" fill="#ffffff" font-size="11">オフライン動作可</text>
  <text x="205" y="168" text-anchor="middle" fill="#ffffff" font-size="11">速度: ハード依存</text>
  <text x="205" y="188" text-anchor="middle" fill="#e91e63" font-size="11">モデル品質: 限定的</text>
  <text x="205" y="210" text-anchor="middle" fill="#e91e63" font-size="10">セットアップ: 複雑</text>
  <rect x="430" y="55" width="330" height="170" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="82" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">クラウドAPI</text>
  <text x="595" y="108" text-anchor="middle" fill="#e91e63" font-size="11">データ送信あり</text>
  <text x="595" y="128" text-anchor="middle" fill="#e91e63" font-size="11">使用量課金</text>
  <text x="595" y="148" text-anchor="middle" fill="#ffffff" font-size="11">インターネット必須</text>
  <text x="595" y="168" text-anchor="middle" fill="#f9a825" font-size="11">速度: 高速</text>
  <text x="595" y="188" text-anchor="middle" fill="#f9a825" font-size="11">モデル品質: 最高水準</text>
  <text x="595" y="210" text-anchor="middle" fill="#f9a825" font-size="10">セットアップ: 簡単</text>
</svg>`,
);

// Index 26: インターフェース一覧
addSvg(
	s,
	26,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">OpenClaw インターフェース全体図</text>
  <!-- Center: OpenClaw core -->
  <ellipse cx="400" cy="145" rx="70" ry="50" fill="#e91e63" opacity="0.9"/>
  <text x="400" y="140" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">OpenClaw</text>
  <text x="400" y="158" text-anchor="middle" fill="#ffffff" font-size="10">Core Engine</text>
  <!-- Interface nodes -->
  <rect x="20" y="50" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="80" y="75" text-anchor="middle" fill="#ffffff" font-size="11">CLI</text>
  <line x1="140" y1="70" x2="330" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="20" y="160" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="80" y="185" text-anchor="middle" fill="#ffffff" font-size="11">WebUI</text>
  <line x1="140" y1="180" x2="330" y2="155" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="660" y="50" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="720" y="75" text-anchor="middle" fill="#ffffff" font-size="11">Telegram</text>
  <line x1="660" y1="70" x2="470" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="660" y="110" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="720" y="135" text-anchor="middle" fill="#ffffff" font-size="11">Slack</text>
  <line x1="660" y1="130" x2="470" y2="145" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="660" y="170" width="120" height="40" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="720" y="195" text-anchor="middle" fill="#ffffff" font-size="11">Discord</text>
  <line x1="660" y1="190" x2="470" y2="158" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="270" y="225" width="130" height="30" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="335" y="245" text-anchor="middle" fill="#ffffff" font-size="10">macOSアプリ</text>
  <line x1="380" y1="225" x2="400" y2="195" stroke="#f9a825" stroke-width="1.5"/>
</svg>`,
);

// Index 30: メモリファイル構造
addSvg(
	s,
	30,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">メモリファイル構造 (Markdown as Truth)</text>
  <!-- Directory tree visual -->
  <rect x="60" y="50" width="680" height="190" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="100" y="76" fill="#f9a825" font-size="12" font-family="monospace">~/.openclaw/memory/</text>
  <text x="120" y="101" fill="#ffffff" font-size="11" font-family="monospace">├── biography.md</text>
  <text x="380" y="101" fill="#f9a825" font-size="10">ユーザープロファイル</text>
  <text x="120" y="121" fill="#ffffff" font-size="11" font-family="monospace">├── facts/</text>
  <text x="380" y="121" fill="#f9a825" font-size="10">永続的知識</text>
  <text x="140" y="141" fill="#ffffff" font-size="11" font-family="monospace">│   ├── work.md</text>
  <text x="140" y="161" fill="#ffffff" font-size="11" font-family="monospace">│   └── preferences.md</text>
  <text x="120" y="181" fill="#ffffff" font-size="11" font-family="monospace">├── conversations/</text>
  <text x="380" y="181" fill="#f9a825" font-size="10">会話履歴</text>
  <text x="120" y="201" fill="#ffffff" font-size="11" font-family="monospace">└── tasks/</text>
  <text x="380" y="201" fill="#f9a825" font-size="10">タスク状態</text>
  <text x="120" y="221" fill="#f9a825" font-size="10" font-family="monospace">    └── active.md</text>
</svg>`,
);

// Index 37: スキルシステムの概念（1/2）
addSvg(
	s,
	37,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">スキルシステムの概念</text>
  <!-- Skill as plugin analogy -->
  <rect x="300" y="60" width="200" height="70" rx="8" fill="#e91e63" opacity="0.9"/>
  <text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">OpenClaw Agent</text>
  <text x="400" y="110" text-anchor="middle" fill="#ffffff" font-size="10">コアエンジン</text>
  <!-- Plugin slots -->
  <rect x="40" y="165" width="130" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="105" y="188" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Weather</text>
  <text x="105" y="205" text-anchor="middle" fill="#ffffff" font-size="9">天気スキル</text>
  <line x1="105" y1="165" x2="340" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="200" y="165" width="130" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="265" y="188" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Code</text>
  <text x="265" y="205" text-anchor="middle" fill="#ffffff" font-size="9">コード実行</text>
  <line x1="265" y1="165" x2="370" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="360" y="165" width="130" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="425" y="188" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Calendar</text>
  <text x="425" y="205" text-anchor="middle" fill="#ffffff" font-size="9">カレンダー連携</text>
  <line x1="425" y1="165" x2="430" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="520" y="165" width="130" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="585" y="188" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">Web Search</text>
  <text x="585" y="205" text-anchor="middle" fill="#ffffff" font-size="9">Web検索</text>
  <line x1="585" y1="165" x2="460" y2="130" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="650" y="165" width="110" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="705" y="188" text-anchor="middle" fill="#f9a825" font-size="11">+ 200+</text>
  <text x="705" y="205" text-anchor="middle" fill="#ffffff" font-size="9">スキル</text>
  <line x1="705" y1="165" x2="480" y2="130" stroke="#f9a825" stroke-width="1.5"/>
</svg>`,
);

// Index 41: ClawHubスキルディレクトリ
addSvg(
	s,
	41,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ClawHub — スキルマーケットプレイス</text>
  <!-- Category grid -->
  <rect x="30" y="55" width="170" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="115" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">生産性</text>
  <text x="115" y="97" text-anchor="middle" fill="#ffffff" font-size="10">カレンダー・メール</text>
  <text x="115" y="112" text-anchor="middle" fill="#f9a825" font-size="9">45スキル</text>
  <rect x="215" y="55" width="170" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="300" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">開発</text>
  <text x="300" y="97" text-anchor="middle" fill="#ffffff" font-size="10">Git・CI/CD・テスト</text>
  <text x="300" y="112" text-anchor="middle" fill="#f9a825" font-size="9">62スキル</text>
  <rect x="400" y="55" width="170" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="485" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">リサーチ</text>
  <text x="485" y="97" text-anchor="middle" fill="#ffffff" font-size="10">Web・論文・分析</text>
  <text x="485" y="112" text-anchor="middle" fill="#f9a825" font-size="9">38スキル</text>
  <rect x="585" y="55" width="185" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="677" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-weight="bold">ビジネス</text>
  <text x="677" y="97" text-anchor="middle" fill="#ffffff" font-size="10">CRM・分析・レポート</text>
  <text x="677" y="112" text-anchor="middle" fill="#f9a825" font-size="9">55スキル</text>
  <!-- Total stats -->
  <text x="400" y="168" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold">200+ スキル公開中</text>
  <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="12">毎週10+ 新スキル追加 · コミュニティ主導</text>
</svg>`,
);

// Index 47: /subagents spawn コマンド（1/2）
addSvg(
	s,
	47,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">/subagents spawn — 並列エージェント</text>
  <!-- Spawn diagram -->
  <rect x="300" y="50" width="200" height="50" rx="6" fill="#e91e63" opacity="0.9"/>
  <text x="400" y="75" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">メインエージェント</text>
  <text x="400" y="92" text-anchor="middle" fill="#ffffff" font-size="10">/subagents spawn N</text>
  <!-- Spawned agents -->
  <line x1="400" y1="100" x2="150" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="300" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="400" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="500" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="650" y2="150" stroke="#f9a825" stroke-width="1.5"/>
  <rect x="80" y="150" width="140" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="150" y="172" text-anchor="middle" fill="#f9a825" font-size="11">Sub-Agent 1</text>
  <text x="150" y="188" text-anchor="middle" fill="#ffffff" font-size="9">リサーチ</text>
  <rect x="230" y="150" width="140" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="300" y="172" text-anchor="middle" fill="#f9a825" font-size="11">Sub-Agent 2</text>
  <text x="300" y="188" text-anchor="middle" fill="#ffffff" font-size="9">コード生成</text>
  <rect x="330" y="150" width="140" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="172" text-anchor="middle" fill="#f9a825" font-size="11">Sub-Agent 3</text>
  <text x="400" y="188" text-anchor="middle" fill="#ffffff" font-size="9">テスト実行</text>
  <rect x="430" y="150" width="140" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="500" y="172" text-anchor="middle" fill="#f9a825" font-size="11">Sub-Agent 4</text>
  <text x="500" y="188" text-anchor="middle" fill="#ffffff" font-size="9">文書生成</text>
  <rect x="580" y="150" width="140" height="50" rx="4" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="650" y="172" text-anchor="middle" fill="#f9a825" font-size="11">Sub-Agent N</text>
  <text x="650" y="188" text-anchor="middle" fill="#ffffff" font-size="9">その他</text>
  <!-- Result merge -->
  <text x="400" y="235" text-anchor="middle" fill="#f9a825" font-size="11">並列実行後、メインエージェントが結果を統合</text>
</svg>`,
);

// Index 65: ClawHavocサプライチェーン攻撃（1/2）
addSvg(
	s,
	65,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">ClawHavoc サプライチェーン攻撃</text>
  <!-- Supply chain attack flow -->
  <rect x="20" y="90" width="130" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="85" y="115" text-anchor="middle" fill="#ffffff" font-size="11">正規スキル</text>
  <text x="85" y="133" text-anchor="middle" fill="#f9a825" font-size="9">ClawHub公開</text>
  <rect x="200" y="90" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="265" y="110" text-anchor="middle" fill="#e91e63" font-size="11">悪意ある</text>
  <text x="265" y="128" text-anchor="middle" fill="#e91e63" font-size="11">アップデート</text>
  <text x="265" y="142" text-anchor="middle" fill="#ffffff" font-size="9">バックドア埋め込み</text>
  <rect x="380" y="90" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="445" y="115" text-anchor="middle" fill="#e91e63" font-size="11">ユーザー自動更新</text>
  <text x="445" y="133" text-anchor="middle" fill="#ffffff" font-size="9">気づかずインストール</text>
  <rect x="560" y="90" width="130" height="55" rx="6" fill="#e91e63" opacity="0.9"/>
  <text x="625" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">システム侵害</text>
  <text x="625" y="130" text-anchor="middle" fill="#ffffff" font-size="9">データ窃取・RCE</text>
  <text x="625" y="143" text-anchor="middle" fill="#ffffff" font-size="9">横展開</text>
  <!-- Arrows -->
  <polygon points="188,117 174,110 174,124" fill="#e91e63"/>
  <line x1="150" y1="117" x2="188" y2="117" stroke="#e91e63" stroke-width="2"/>
  <polygon points="368,117 354,110 354,124" fill="#e91e63"/>
  <line x1="330" y1="117" x2="368" y2="117" stroke="#e91e63" stroke-width="2"/>
  <polygon points="548,117 534,110 534,124" fill="#e91e63"/>
  <line x1="510" y1="117" x2="548" y2="117" stroke="#e91e63" stroke-width="2"/>
  <!-- Mitigation -->
  <text x="400" y="195" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">対策: スキル署名検証 + 公式レビュープロセス + 自動更新を無効化</text>
</svg>`,
);

// Index 79: v2026.2.17最新機能（1/2）
addSvg(
	s,
	79,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">v2026.2.17 新機能ハイライト</text>
  <!-- Feature badges -->
  <rect x="40" y="55" width="220" height="80" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="150" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">1M Token Context</text>
  <text x="150" y="103" text-anchor="middle" fill="#ffffff" font-size="10">超長文処理対応</text>
  <text x="150" y="121" text-anchor="middle" fill="#f9a825" font-size="9">Gemini 1.5 Pro ベース</text>
  <rect x="290" y="55" width="220" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="82" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Sub-Agents</text>
  <text x="400" y="103" text-anchor="middle" fill="#ffffff" font-size="10">並列エージェント実行</text>
  <text x="400" y="121" text-anchor="middle" fill="#f9a825" font-size="9">/subagents spawn N</text>
  <rect x="540" y="55" width="220" height="80" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="650" y="82" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">OSS財団移行</text>
  <text x="650" y="103" text-anchor="middle" fill="#ffffff" font-size="10">OpenAI傘下で管理</text>
  <text x="650" y="121" text-anchor="middle" fill="#f9a825" font-size="9">コミュニティガバナンス</text>
  <!-- Second row -->
  <rect x="165" y="165" width="220" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="275" y="192" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">強化セキュリティ</text>
  <text x="275" y="210" text-anchor="middle" fill="#ffffff" font-size="10">CVE修正 + サンドボックス強化</text>
  <rect x="415" y="165" width="220" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="525" y="192" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">新スキルAPI v2</text>
  <text x="525" y="210" text-anchor="middle" fill="#ffffff" font-size="10">型安全 + バージョニング</text>
</svg>`,
);

// Index 82: OpenAI傘下でのビジョン（1/2）
addSvg(
	s,
	82,
	`<svg viewBox="0 0 800 260" style="${SVG_STYLE}">
  <rect width="800" height="260" fill="#1a1a2e"/>
  <text x="400" y="26" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">OpenAI傘下での「誰でもAIエージェント」ビジョン</text>
  <!-- Vision pyramid -->
  <polygon points="400,50 100,210 700,210" fill="none" stroke="#f9a825" stroke-width="2"/>
  <!-- Layers fill -->
  <polygon points="400,50 280,130 520,130" fill="#e91e63" opacity="0.2"/>
  <polygon points="280,130 160,210 540,210" fill="#f9a825" opacity="0.1"/>
  <!-- Layer labels -->
  <text x="400" y="102" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">高度ユーザー層</text>
  <text x="400" y="118" text-anchor="middle" fill="#ffffff" font-size="10">開発者・研究者</text>
  <text x="400" y="160" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">一般ユーザー層</text>
  <text x="400" y="178" text-anchor="middle" fill="#ffffff" font-size="10">プログラミング不要でAI活用</text>
  <!-- Arrow from bottom -->
  <text x="400" y="230" text-anchor="middle" fill="#f9a825" font-size="11">目標: 世界80億人がAIエージェントを持てる世界</text>
</svg>`,
);

// Write back
writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log("Done. SVGs batch 2 added to openclaw slides.");
const svgCount = data.slides.filter((s: any) =>
	s.content?.some((c: string) => c.startsWith("<svg")),
).length;
console.log(
	`SVG slides: ${svgCount} / ${data.slides.length} (${Math.round((svgCount * 100) / data.slides.length)}%)`,
);
