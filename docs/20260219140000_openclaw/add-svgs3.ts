import { readFileSync, writeFileSync } from "fs";

const path = "docs/20260219140000_openclaw/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const slides = data.slides;

function addSvg(idx: number, svgStr: string) {
	if (!slides[idx].content?.some((c: string) => c.startsWith("<svg"))) {
		slides[idx].content = [svgStr, ...slides[idx].content];
	}
}

// idx 4: OpenClawとは何か（2/2）
addSvg(
	4,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw: 特徴一覧</text>
  <rect x="40" y="50" width="335" height="165" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="207" y="80" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">ローカル優先</text>
  <text x="207" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• データはローカルに保持</text>
  <text x="207" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• プライバシー完全保護</text>
  <text x="207" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• オフライン動作可能</text>
  <text x="207" y="170" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">クラウド依存ゼロ</text>
  <rect x="425" y="50" width="335" height="165" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="592" y="80" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">オープンソース</text>
  <text x="592" y="103" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• MIT ライセンス</text>
  <text x="592" y="121" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• コミュニティ開発</text>
  <text x="592" y="139" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">• カスタマイズ自由</text>
  <text x="592" y="170" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">ベンダーロックインなし</text>
</svg>`,
);

// idx 9: Moltbookとバイラル拡散の背景（1/2）
addSvg(
	9,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw バイラル拡散の軌跡</text>
  <line x1="60" y1="180" x2="740" y2="180" stroke="#444" stroke-width="1.5"/>
  <line x1="60" y1="60" x2="60" y2="185" stroke="#444" stroke-width="1.5"/>
  <polyline points="80,175 160,170 240,160 320,140 400,115 480,85 560,60 620,50" fill="none" stroke="#f9a825" stroke-width="2.5"/>
  <circle cx="320" cy="140" r="5" fill="#f9a825"/>
  <text x="320" y="130" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Moltbook</text>
  <text x="320" y="120" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">リリース</text>
  <circle cx="480" cy="85" r="5" fill="#e91e63"/>
  <text x="480" y="75" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">バイラル</text>
  <circle cx="560" cy="60" r="5" fill="#e91e63"/>
  <text x="560" y="50" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">10k Stars</text>
  <text x="80" y="200" fill="#aaa" font-size="9" font-family="sans-serif">Jan 2026</text>
  <text x="380" y="200" fill="#aaa" font-size="9" font-family="sans-serif">Feb 2026</text>
  <text x="660" y="200" fill="#aaa" font-size="9" font-family="sans-serif">Mar 2026</text>
  <text x="30" y="70" fill="#aaa" font-size="9" font-family="sans-serif" transform="rotate(-90,30,120)">Stars</text>
</svg>`,
);

// idx 18: Gatewayとは（コントロールプレーン）（2/2）
addSvg(
	18,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Gateway コントロールプレーン</text>
  <rect x="300" y="45" width="200" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="70" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">Gateway</text>
  <text x="400" y="88" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ルーティング・認証・制御</text>
  <rect x="30" y="150" width="160" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="110" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Local Models</text>
  <text x="110" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Ollama / LlamaCpp</text>
  <rect x="210" y="150" width="160" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="290" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Cloud APIs</text>
  <text x="290" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">OpenAI / Anthropic</text>
  <rect x="390" y="150" width="160" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="470" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Tool Registry</text>
  <text x="470" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MCP サーバー</text>
  <rect x="610" y="150" width="160" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="690" y="178" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Memory Store</text>
  <text x="690" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">SQLite / Vector DB</text>
  <line x1="400" y1="100" x2="110" y2="150" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="100" x2="290" y2="150" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="100" x2="470" y2="150" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="100" x2="690" y2="150" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,
);

// idx 23: ローカル実行モデルの意義（2/2）
addSvg(
	23,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">ローカル vs クラウド LLM 比較</text>
  <rect x="30" y="55" width="340" height="155" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="200" y="85" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif">ローカル実行</text>
  <text x="200" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">プライバシー完全保護</text>
  <text x="200" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">レイテンシ: 低い(GPU依存)</text>
  <text x="200" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コスト: ハードウェア固定費</text>
  <text x="200" y="162" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">モデル品質: やや低め</text>
  <text x="200" y="190" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">企業機密データに最適</text>
  <rect x="430" y="55" width="340" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="600" y="85" text-anchor="middle" fill="#e91e63" font-size="13" font-family="sans-serif">クラウド API</text>
  <text x="600" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">プライバシー: 要契約確認</text>
  <text x="600" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">レイテンシ: ネット依存</text>
  <text x="600" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コスト: 従量課金</text>
  <text x="600" y="162" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">モデル品質: 最高水準</text>
  <text x="600" y="190" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">汎用・高品質タスクに</text>
</svg>`,
);

// idx 27: メモリの基本思想「Markdown as Truth」（1/2）
addSvg(
	27,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Markdown as Truth 設計思想</text>
  <rect x="100" y="55" width="600" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="82" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">すべての知識は Markdown ファイルに保存</text>
  <text x="400" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">人間が読める · Git でバージョン管理 · 外部ツールで処理可能</text>
  <rect x="60" y="155" width="185" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="152" y="182" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">人間が閲覧・編集</text>
  <text x="152" y="200" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">markdown エディタで OK</text>
  <rect x="275" y="155" width="185" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="367" y="182" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">AI がアクセス</text>
  <text x="367" y="200" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">RAG / ベクター検索</text>
  <rect x="490" y="155" width="185" height="65" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="582" y="182" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">バックアップ・共有</text>
  <text x="582" y="200" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">Git / rsync で簡単</text>
  <line x1="400" y1="125" x2="152" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="125" x2="367" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="125" x2="582" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,
);

// idx 29: メモリファイル構造
addSvg(
	29,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">メモリファイル ディレクトリ構造</text>
  <rect x="80" y="50" width="640" height="170" rx="8" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="110" y="78" fill="#f9a825" font-size="12" font-family="monospace">~/.openclaw/memory/</text>
  <text x="130" y="100" fill="#aaa" font-size="11" font-family="monospace">├── core/</text>
  <text x="150" y="118" fill="#e91e63" font-size="10" font-family="monospace">│   ├── profile.md       # ユーザープロファイル</text>
  <text x="150" y="136" fill="#e91e63" font-size="10" font-family="monospace">│   └── preferences.md   # 設定・好み</text>
  <text x="130" y="154" fill="#aaa" font-size="11" font-family="monospace">├── projects/</text>
  <text x="150" y="172" fill="#888" font-size="10" font-family="monospace">│   └── {project-name}/  # プロジェクト別知識</text>
  <text x="130" y="192" fill="#aaa" font-size="11" font-family="monospace">└── conversations/</text>
  <text x="150" y="210" fill="#888" font-size="10" font-family="monospace">    └── YYYY-MM-DD.md    # 日次会話ログ</text>
</svg>`,
);

// idx 33: Embeddingプロバイダー比較
addSvg(
	33,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">Embedding プロバイダー比較</text>
  <rect x="40" y="50" width="130" height="175" rx="6" fill="#16213e" stroke="#444" stroke-width="1"/>
  <text x="105" y="75" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">項目</text>
  <text x="105" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">品質</text>
  <text x="105" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">速度</text>
  <text x="105" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コスト</text>
  <text x="105" y="195" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">プライバシー</text>
  <rect x="185" y="50" width="155" height="175" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="262" y="75" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">OpenAI</text>
  <text x="262" y="105" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">★★★★★</text>
  <text x="262" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">★★★★☆</text>
  <text x="262" y="165" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">有料(低コスト)</text>
  <text x="262" y="195" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">クラウド送信</text>
  <rect x="355" y="50" width="155" height="175" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="432" y="75" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">nomic-embed</text>
  <text x="432" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">★★★★☆</text>
  <text x="432" y="135" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">★★★☆☆</text>
  <text x="432" y="165" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">無料(ローカル)</text>
  <text x="432" y="195" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">完全ローカル</text>
  <rect x="525" y="50" width="155" height="175" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="602" y="75" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">mxbai-embed</text>
  <text x="602" y="105" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">★★★★☆</text>
  <text x="602" y="135" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">★★★★★</text>
  <text x="602" y="165" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">無料(ローカル)</text>
  <text x="602" y="195" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">完全ローカル</text>
</svg>`,
);

// idx 38: MCP (Model Context Protocol) とは
addSvg(
	38,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">MCP: Model Context Protocol アーキテクチャ</text>
  <rect x="300" y="50" width="200" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="75" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">LLM Host</text>
  <text x="400" y="93" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Claude / OpenClaw</text>
  <rect x="50" y="155" width="155" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="127" y="180" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">File System</text>
  <text x="127" y="198" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">read/write/list</text>
  <rect x="230" y="155" width="155" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="307" y="180" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Web Search</text>
  <text x="307" y="198" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Brave / Tavily</text>
  <rect x="415" y="155" width="155" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="492" y="180" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GitHub</text>
  <text x="492" y="198" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">repos / issues</text>
  <rect x="600" y="155" width="155" height="60" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="677" y="180" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Custom Tools</text>
  <text x="677" y="198" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">カスタム MCP</text>
  <line x1="400" y1="105" x2="127" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="307" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="492" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="400" y1="105" x2="677" y2="155" stroke="#888" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,
);

// idx 42: ツール実行とサンドボックス
addSvg(
	42,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">ツール実行 セキュリティモデル</text>
  <rect x="50" y="55" width="700" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">AI → ツール呼び出しリクエスト生成</text>
  <text x="400" y="96" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">tool_name + parameters を JSON で生成</text>
  <rect x="50" y="130" width="325" height="85" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="212" y="158" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">リスク評価</text>
  <text x="212" y="178" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">read → 自動実行 OK</text>
  <text x="212" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">write/exec → ユーザー確認</text>
  <rect x="425" y="130" width="325" height="85" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="587" y="158" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">サンドボックス実行</text>
  <text x="587" y="178" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Docker / chroot</text>
  <text x="587" y="196" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ネットワーク制限付き</text>
  <line x1="400" y1="105" x2="212" y2="130" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="105" x2="587" y2="130" stroke="#888" stroke-width="1.5"/>
  <polygon points="209,126 212,135 215,126" fill="#888"/>
  <polygon points="584,126 587,135 590,126" fill="#888"/>
</svg>`,
);

// idx 48: エージェントモード
addSvg(
	48,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw エージェントモード</text>
  <rect x="40" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="147" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Chat モード</text>
  <text x="147" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">対話型インタラクション</text>
  <text x="147" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ツール使用可能</text>
  <text x="147" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">メモリ参照</text>
  <text x="147" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">基本的な使い方</text>
  <rect x="293" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">Agent モード</text>
  <text x="400" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">自律的タスク実行</text>
  <text x="400" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">複数ツール連続使用</text>
  <text x="400" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">計画→実行→検証</text>
  <text x="400" y="185" text-anchor="middle" fill="#e91e63" font-size="10" font-family="sans-serif">複雑タスク向け</text>
  <rect x="546" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="653" y="85" text-anchor="middle" fill="#aaa" font-size="12" font-family="sans-serif">Scheduled モード</text>
  <text x="653" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">定期実行タスク</text>
  <text x="653" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">cron ライク</text>
  <text x="653" y="144" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">バックグラウンド処理</text>
  <text x="653" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">自動化向け</text>
</svg>`,
);

// idx 52: マルチエージェント協調（1/2）
addSvg(
	52,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw マルチエージェント協調</text>
  <rect x="300" y="45" width="200" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="70" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">Orchestrator</text>
  <text x="400" y="88" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスク分解・結果統合</text>
  <rect x="60" y="150" width="175" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="147" y="177" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Research Agent</text>
  <text x="147" y="197" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">情報収集・要約</text>
  <rect x="255" y="150" width="175" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="342" y="177" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Code Agent</text>
  <text x="342" y="197" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">コード生成・実行</text>
  <rect x="450" y="150" width="175" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="537" y="177" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Review Agent</text>
  <text x="537" y="197" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">品質チェック</text>
  <rect x="645" y="150" width="115" height="65" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="702" y="177" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Writer</text>
  <text x="702" y="197" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">文章生成</text>
  <line x1="400" y1="100" x2="147" y2="150" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="342" y2="150" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="537" y2="150" stroke="#888" stroke-width="1.5"/>
  <line x1="400" y1="100" x2="702" y2="150" stroke="#888" stroke-width="1.5"/>
</svg>`,
);

// idx 56: プロジェクト管理との統合（1/2）
addSvg(
	56,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">プロジェクト管理 統合フロー</text>
  <rect x="30" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="95" y="85" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">GitHub</text>
  <text x="95" y="102" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">Issues / PRs</text>
  <rect x="195" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="260" y="85" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">OpenClaw</text>
  <text x="260" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">AI タスク処理</text>
  <rect x="360" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="425" y="85" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Code Editor</text>
  <text x="425" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">実装・デバッグ</text>
  <rect x="525" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="590" y="85" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">CI/CD</text>
  <text x="590" y="102" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">テスト・デプロイ</text>
  <rect x="690" y="60" width="100" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="740" y="85" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Slack</text>
  <text x="740" y="102" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">通知</text>
  <polygon points="193,87 193,81 183,87" fill="#f9a825"/>
  <line x1="160" y1="87" x2="193" y2="87" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="358,87 358,81 348,87" fill="#e91e63"/>
  <line x1="325" y1="87" x2="358" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="523,87 523,81 513,87" fill="#e91e63"/>
  <line x1="490" y1="87" x2="523" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="688,87 688,81 678,87" fill="#888"/>
  <line x1="655" y1="87" x2="688" y2="87" stroke="#888" stroke-width="1.5"/>
  <rect x="100" y="155" width="600" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="180" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">OpenClaw がすべてのツールの「頭脳」として機能</text>
  <text x="400" y="200" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">タスクを自律的に判断し、適切なツールを選択・実行</text>
</svg>`,
);

// idx 61: セキュリティモデル（1/2）
addSvg(
	61,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw セキュリティ多層防御</text>
  <rect x="80" y="50" width="640" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="75" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Layer 1: ネットワーク分離 — ローカル専用、アウトバウンド制御</text>
  <rect x="80" y="113" width="640" height="45" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="400" y="138" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Layer 2: ツール権限 — 最小権限・ユーザー承認フロー</text>
  <rect x="80" y="171" width="640" height="45" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="400" y="196" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Layer 3: データ暗号化 — メモリファイルのローカル暗号化</text>
</svg>`,
);

// idx 64: パフォーマンスベンチマーク（1/2）
addSvg(
	64,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">パフォーマンス: レイテンシ比較</text>
  <text x="70" y="60" fill="#aaa" font-size="11" font-family="sans-serif">レスポンスタイム (ms)</text>
  <line x1="100" y1="195" x2="750" y2="195" stroke="#444" stroke-width="1"/>
  <line x1="100" y1="70" x2="100" y2="200" stroke="#444" stroke-width="1"/>
  <rect x="140" y="100" width="90" height="95" fill="#e91e63" opacity="0.7"/>
  <text x="185" y="210" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Claude API</text>
  <text x="185" y="92" text-anchor="middle" fill="#e91e63" font-size="9" font-family="sans-serif">1200ms</text>
  <rect x="280" y="130" width="90" height="65" fill="#f9a825" opacity="0.7"/>
  <text x="325" y="210" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">OpenClaw+Cloud</text>
  <text x="325" y="122" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">800ms</text>
  <rect x="420" y="150" width="90" height="45" fill="#f9a825" opacity="0.9"/>
  <text x="465" y="210" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Cache Hit</text>
  <text x="465" y="142" text-anchor="middle" fill="#f9a825" font-size="9" font-family="sans-serif">120ms</text>
  <rect x="560" y="170" width="90" height="25" fill="#888" opacity="0.8"/>
  <text x="605" y="210" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">ローカル (GPU)</text>
  <text x="605" y="162" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">80ms</text>
  <text x="95" y="77" fill="#aaa" font-size="8" font-family="sans-serif">1200</text>
  <text x="95" y="140" fill="#aaa" font-size="8" font-family="sans-serif">600</text>
  <text x="95" y="200" fill="#aaa" font-size="8" font-family="sans-serif">0</text>
</svg>`,
);

// idx 66: コスト最適化戦略
addSvg(
	66,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw コスト最適化フロー</text>
  <rect x="30" y="60" width="155" height="70" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="107" y="88" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">リクエスト</text>
  <text x="107" y="107" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">ユーザー入力</text>
  <rect x="215" y="60" width="155" height="70" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="292" y="83" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Semantic Cache</text>
  <text x="292" y="101" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">類似クエリ判定</text>
  <text x="292" y="118" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">→ Hit: 90%コスト削減</text>
  <rect x="400" y="60" width="155" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="477" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Model Router</text>
  <text x="477" y="101" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">複雑度判定</text>
  <text x="477" y="118" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Haiku / Sonnet 選択</text>
  <rect x="585" y="60" width="185" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="677" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Prompt Caching</text>
  <text x="677" y="101" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">同一プレフィックス</text>
  <text x="677" y="118" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">最大90%トークン削減</text>
  <polygon points="213,95 213,89 203,95" fill="#f9a825"/>
  <line x1="185" y1="95" x2="213" y2="95" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="398,95 398,89 388,95" fill="#e91e63"/>
  <line x1="370" y1="95" x2="398" y2="95" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="583,95 583,89 573,95" fill="#e91e63"/>
  <line x1="555" y1="95" x2="583" y2="95" stroke="#e91e63" stroke-width="1.5"/>
  <rect x="200" y="170" width="400" height="50" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="195" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">平均コスト削減: 70〜90%</text>
  <text x="400" y="212" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">ユーザー体感速度も大幅向上</text>
</svg>`,
);

// idx 71: まとめ
addSvg(
	71,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw まとめ</text>
  <rect x="40" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="147" y="85" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">プライバシー</text>
  <text x="147" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">完全ローカル動作</text>
  <text x="147" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">データ漏洩ゼロ</text>
  <text x="147" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">企業導入に最適</text>
  <rect x="293" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">拡張性</text>
  <text x="400" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">MCP エコシステム</text>
  <text x="400" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">カスタムツール追加</text>
  <text x="400" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">無限に拡張可能</text>
  <rect x="546" y="55" width="215" height="155" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="653" y="85" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif">コスト効率</text>
  <text x="653" y="108" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Semantic Cache</text>
  <text x="653" y="126" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">最大90%削減</text>
  <text x="653" y="185" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">ROI 最大化</text>
</svg>`,
);

// idx 74: インストール方法
addSvg(
	74,
	`<svg viewBox="0 0 800 220" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="220" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">インストール フロー</text>
  <rect x="30" y="55" width="155" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="107" y="80" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">1. Clone</text>
  <text x="107" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">git clone</text>
  <text x="107" y="112" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">openclaw/openclaw</text>
  <rect x="205" y="55" width="155" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="282" y="80" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">2. Install</text>
  <text x="282" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">bun install</text>
  <text x="282" y="112" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">依存パッケージ</text>
  <rect x="380" y="55" width="155" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="457" y="80" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">3. Config</text>
  <text x="457" y="98" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">config.yaml 編集</text>
  <text x="457" y="112" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">API キー設定</text>
  <rect x="555" y="55" width="155" height="65" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="632" y="80" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">4. Run</text>
  <text x="632" y="98" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">bun start</text>
  <text x="632" y="112" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">Web UI: localhost:3000</text>
  <polygon points="203,87 203,81 193,87" fill="#e91e63"/>
  <line x1="185" y1="87" x2="203" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="378,87 378,81 368,87" fill="#e91e63"/>
  <line x1="360" y1="87" x2="378" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="553,87 553,81 543,87" fill="#888"/>
  <line x1="535" y1="87" x2="553" y2="87" stroke="#888" stroke-width="1.5"/>
  <rect x="150" y="155" width="500" height="45" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="180" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Docker を使えばワンコマンドで完了: docker compose up</text>
</svg>`,
);

// idx 80: コントリビューション方法
addSvg(
	80,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">コントリビューション ワークフロー</text>
  <rect x="50" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="115" y="83" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Fork</text>
  <text x="115" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">リポジトリ複製</text>
  <rect x="210" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="275" y="83" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Branch</text>
  <text x="275" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">機能ブランチ作成</text>
  <rect x="370" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="435" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Implement</text>
  <text x="435" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">実装・テスト</text>
  <rect x="530" y="60" width="130" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="595" y="83" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">PR</text>
  <text x="595" y="100" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Pull Request 送信</text>
  <rect x="690" y="60" width="90" height="55" rx="6" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="735" y="83" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Merge</text>
  <text x="735" y="100" text-anchor="middle" fill="#888" font-size="10" font-family="sans-serif">マージ</text>
  <polygon points="208,87 208,81 198,87" fill="#f9a825"/>
  <line x1="180" y1="87" x2="208" y2="87" stroke="#f9a825" stroke-width="1.5"/>
  <polygon points="368,87 368,81 358,87" fill="#e91e63"/>
  <line x1="340" y1="87" x2="368" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="528,87 528,81 518,87" fill="#e91e63"/>
  <line x1="500" y1="87" x2="528" y2="87" stroke="#e91e63" stroke-width="1.5"/>
  <polygon points="688,87 688,81 678,87" fill="#888"/>
  <line x1="660" y1="87" x2="688" y2="87" stroke="#888" stroke-width="1.5"/>
  <rect x="100" y="155" width="600" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="180" text-anchor="middle" fill="#f9a825" font-size="12" font-family="sans-serif">コントリビューター向けガイド</text>
  <text x="400" y="200" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">docs/CONTRIBUTING.md — テスト通過・型エラーゼロが必須</text>
</svg>`,
);

// idx 83: コミュニティとサポート（1/2）
addSvg(
	83,
	`<svg viewBox="0 0 800 240" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="240" fill="#1a1a2e"/>
  <text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-family="sans-serif">OpenClaw コミュニティ</text>
  <circle cx="400" cy="120" r="45" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="115" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">OpenClaw</text>
  <text x="400" y="133" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">Community</text>
  <circle cx="160" cy="70" r="35" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="160" y="67" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">GitHub</text>
  <text x="160" y="83" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">Issues/PRs</text>
  <line x1="192" y1="82" x2="358" y2="107" stroke="#888" stroke-width="1"/>
  <circle cx="640" cy="70" r="35" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="640" y="67" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">Discord</text>
  <text x="640" y="83" text-anchor="middle" fill="#aaa" font-size="9" font-family="sans-serif">リアルタイム</text>
  <line x1="608" y1="82" x2="442" y2="107" stroke="#888" stroke-width="1"/>
  <circle cx="160" cy="190" r="35" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="160" y="187" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Docs</text>
  <text x="160" y="203" text-anchor="middle" fill="#888" font-size="9" font-family="sans-serif">ドキュメント</text>
  <line x1="192" y1="178" x2="358" y2="140" stroke="#888" stroke-width="1"/>
  <circle cx="640" cy="190" r="35" fill="#16213e" stroke="#888" stroke-width="1.5"/>
  <text x="640" y="187" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">Twitter/X</text>
  <text x="640" y="203" text-anchor="middle" fill="#888" font-size="9" font-family="sans-serif">最新情報</text>
  <line x1="608" y1="178" x2="442" y2="140" stroke="#888" stroke-width="1"/>
</svg>`,
);

// idx 86: Q&A
addSvg(
	86,
	`<svg viewBox="0 0 800 220" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="220" fill="#1a1a2e"/>
  <text x="400" y="40" text-anchor="middle" fill="#f9a825" font-size="16" font-family="sans-serif">OpenClaw — Q&amp;A</text>
  <rect x="60" y="65" width="310" height="130" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="215" y="93" text-anchor="middle" fill="#f9a825" font-size="11" font-family="sans-serif">よくある質問</text>
  <text x="215" y="115" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Q: クラウド API と同時使用は？</text>
  <text x="215" y="133" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">A: Gateway で透過的に切替可能</text>
  <text x="215" y="155" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Q: Windows 対応は？</text>
  <text x="215" y="173" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">A: WSL2 で動作確認済み</text>
  <rect x="430" y="65" width="310" height="130" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="585" y="93" text-anchor="middle" fill="#e91e63" font-size="11" font-family="sans-serif">始め方</text>
  <text x="585" y="115" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">github.com/openclaw/openclaw</text>
  <text x="585" y="133" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">⭐ Star してフォロー</text>
  <text x="585" y="155" text-anchor="middle" fill="#aaa" font-size="10" font-family="sans-serif">Discord に参加</text>
  <text x="585" y="173" text-anchor="middle" fill="#f9a825" font-size="10" font-family="sans-serif">PR / Issue 歓迎!</text>
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
