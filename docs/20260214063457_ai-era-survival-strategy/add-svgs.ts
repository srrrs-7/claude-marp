import { readFileSync, writeFileSync } from "node:fs";

const path =
	"/workspace/main/docs/20260214063457_ai-era-survival-strategy/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const slides = data.slides;

// SVG helpers
const BG = "#1a1a2e";
const BOX = "#16213e";
const ACC1 = "#f9a825";
const ACC2 = "#e91e63";
const TXT = "#ffffff";
const GRAY = "#aaaaaa";

function svgWrap(inner: string, h = 400): string {
	return `<svg viewBox="0 0 800 ${h}" xmlns="http://www.w3.org/2000/svg" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">${inner}</svg>`;
}

// [4] 現在地の確認 — paradigm shift arrow diagram
const svgParadigmShift = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<rect x="30" y="60" width="320" height="100" rx="12" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="190" y="100" fill="${ACC2}" font-size="14" text-anchor="middle" font-family="sans-serif">従来のパラダイム</text>
<text x="190" y="128" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「速く書く」= 価値</text>
<text x="190" y="148" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">実装速度が競争優位</text>
<rect x="450" y="60" width="320" height="100" rx="12" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="610" y="100" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">AI時代のパラダイム</text>
<text x="610" y="128" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">「正しく指示する」= 価値</text>
<text x="610" y="148" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">設計・判断・レビュー力が核心</text>
<polygon points="390,105 430,105 430,95 460,110 430,125 430,115 390,115" fill="${ACC1}"/>
<rect x="30" y="220" width="220" height="70" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="140" y="252" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">補完ツール</text>
<text x="140" y="275" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Copilot (2021)</text>
<rect x="290" y="220" width="220" height="70" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="400" y="252" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">会話型AI</text>
<text x="400" y="275" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">ChatGPT統合 (2023)</text>
<rect x="550" y="220" width="220" height="70" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="660" y="252" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">エージェント型</text>
<text x="660" y="275" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">Claude Code (2025)</text>
<line x1="140" y1="290" x2="140" y2="330" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="400" y1="290" x2="400" y2="330" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="660" y1="290" x2="660" y2="330" stroke="${ACC1}" stroke-width="1" stroke-dasharray="4,3"/>
<text x="400" y="370" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">「AIと何を作れるか」が問われる時代へ</text>
`);

// [7] 生産性への影響 — bar chart
const svgProductivity = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="40" fill="${TXT}" font-size="16" text-anchor="middle" font-family="sans-serif">AIツール導入効果（研究データ）</text>
<rect x="80" y="120" width="120" height="165" rx="4" fill="${ACC1}"/>
<text x="140" y="115" fill="${ACC1}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">55%</text>
<text x="140" y="305" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">開発速度向上</text>
<rect x="240" y="148" width="120" height="137" rx="4" fill="${ACC1}" opacity="0.8"/>
<text x="300" y="143" fill="${ACC1}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">60%</text>
<text x="300" y="305" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">反復作業削減</text>
<rect x="400" y="100" width="120" height="185" rx="4" fill="${ACC1}" opacity="0.6"/>
<text x="460" y="95" fill="${ACC1}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">75%</text>
<text x="460" y="305" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">開発者満足度</text>
<rect x="560" y="230" width="120" height="55" rx="4" fill="${ACC2}" opacity="0.8"/>
<text x="620" y="225" fill="${ACC2}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">+30%</text>
<text x="620" y="305" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">レビュー時間増加</text>
<line x1="60" y1="285" x2="740" y2="285" stroke="${GRAY}" stroke-width="1"/>
<text x="740" y="360" fill="${GRAY}" font-size="10" text-anchor="end" font-family="sans-serif">Source: GitHub Research 2022</text>
`);

// [9] よくある誤解と現実 — two-column truth/myth
const svgMythReality = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<rect x="30" y="30" width="360" height="340" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="210" y="65" fill="${ACC2}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">誤解 (Myth)</text>
<text x="210" y="110" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">AIがすべてを書ける</text>
<text x="210" y="130" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ 人間は不要になる</text>
<line x1="80" y1="155" x2="340" y2="155" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="210" y="195" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">AI生成コードは常に正確</text>
<text x="210" y="215" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ レビュー不要</text>
<line x1="80" y1="240" x2="340" y2="240" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="210" y="280" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">AIツール = 万能ソリューション</text>
<text x="210" y="300" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ 導入すればOK</text>
<rect x="410" y="30" width="360" height="340" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="590" y="65" fill="${ACC1}" font-size="16" text-anchor="middle" font-weight="bold" font-family="sans-serif">現実 (Reality)</text>
<text x="590" y="110" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">設計・判断・レビューは人間に</text>
<text x="590" y="130" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ 重要性が増大している</text>
<line x1="460" y1="155" x2="720" y2="155" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="590" y="195" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">ハルシネーション・脆弱性あり</text>
<text x="590" y="215" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ 厳格なレビューが必須</text>
<line x1="460" y1="240" x2="720" y2="240" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="590" y="280" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">ガイドライン・体制整備が必須</text>
<text x="590" y="300" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">→ 戦略的導入が成功の鍵</text>
`);

// [11] 主要AIツール比較 — tool comparison radar-like
const svgToolComparison = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">主要AIツール比較マトリクス</text>
<rect x="30" y="55" width="180" height="30" rx="4" fill="${BOX}"/>
<text x="120" y="75" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">評価軸</text>
<rect x="220" y="55" width="170" height="30" rx="4" fill="${BOX}" stroke="${ACC1}" stroke-width="1"/>
<text x="305" y="75" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">GitHub Copilot</text>
<rect x="400" y="55" width="170" height="30" rx="4" fill="${BOX}" stroke="#4fc3f7" stroke-width="1"/>
<text x="485" y="75" fill="#4fc3f7" font-size="12" text-anchor="middle" font-family="sans-serif">Cursor</text>
<rect x="580" y="55" width="170" height="30" rx="4" fill="${BOX}" stroke="${ACC2}" stroke-width="1"/>
<text x="665" y="75" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">Claude Code</text>
<rect x="30" y="95" width="740" height="1" fill="${GRAY}" opacity="0.3"/>
<text x="120" y="125" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">IDE統合</text>
<text x="305" y="125" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<text x="485" y="125" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<text x="665" y="125" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★☆☆☆</text>
<rect x="30" y="135" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="165" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">マルチファイル編集</text>
<text x="305" y="165" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<text x="485" y="165" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★☆</text>
<text x="665" y="165" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<rect x="30" y="175" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="205" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">エージェント自律性</text>
<text x="305" y="205" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★☆☆☆</text>
<text x="485" y="205" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<text x="665" y="205" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<rect x="30" y="215" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="245" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">コンテキスト長</text>
<text x="305" y="245" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<text x="485" y="245" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<text x="665" y="245" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<rect x="30" y="255" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="285" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">企業向け機能</text>
<text x="305" y="285" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★★★</text>
<text x="485" y="285" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<text x="665" y="285" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">★★★☆☆</text>
<rect x="30" y="295" width="740" height="1" fill="${GRAY}" opacity="0.2"/>
<text x="120" y="330" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">月額費用</text>
<text x="305" y="330" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$10-19/月</text>
<text x="485" y="330" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$20/月</text>
<text x="665" y="330" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">$20+/月</text>
<text x="400" y="380" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">用途に応じてツールを使い分けるのがベストプラクティス</text>
`);

// [13] 組織導入のベストプラクティス — phased rollout
const svgPhasedRollout = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">段階的導入ロードマップ</text>
<rect x="30" y="65" width="160" height="240" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="110" y="95" fill="${GRAY}" font-size="13" text-anchor="middle" font-family="sans-serif">Phase 1</text>
<text x="110" y="115" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">パイロット</text>
<text x="110" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">3〜5人チーム</text>
<text x="110" y="165" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ツール選定</text>
<text x="110" y="185" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">初期ガイドライン</text>
<text x="110" y="215" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">1〜2ヶ月</text>
<polygon points="200,155 230,155 230,145 260,165 230,185 230,175 200,175" fill="${ACC1}" opacity="0.7"/>
<rect x="270" y="65" width="160" height="240" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="350" y="95" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">Phase 2</text>
<text x="350" y="115" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">部門展開</text>
<text x="350" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">複数チーム</text>
<text x="350" y="165" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ガイドライン整備</text>
<text x="350" y="185" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">効果測定開始</text>
<text x="350" y="215" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">2〜4ヶ月</text>
<polygon points="440,155 470,155 470,145 500,165 470,185 470,175 440,175" fill="${ACC1}" opacity="0.7"/>
<rect x="510" y="65" width="160" height="240" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="590" y="95" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">Phase 3</text>
<text x="590" y="115" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">全社展開</text>
<text x="590" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">全エンジニア</text>
<text x="590" y="165" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">継続改善サイクル</text>
<text x="590" y="185" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">メトリクス最適化</text>
<text x="590" y="215" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">4〜6ヶ月</text>
<rect x="30" y="330" width="740" height="35" rx="6" fill="${BOX}"/>
<text x="400" y="352" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">失敗の多くは無計画な全社一斉展開 — 小さく始めて段階的に拡大</text>
`);

// [22] 実装方針 — human/AI division spectrum
const svgDivisionSpectrum = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">人間 × AI 役割分担スペクトラム</text>
<rect x="50" y="65" width="700" height="50" rx="8" fill="${BOX}"/>
<rect x="50" y="65" width="233" height="50" rx="8" fill="#1a3a1a"/>
<rect x="283" y="65" width="234" height="50" fill="#2a2a1a"/>
<rect x="517" y="65" width="233" height="50" rx="8" fill="#3a1a1a"/>
<text x="166" y="96" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">AIに任せる</text>
<text x="400" y="96" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">協働ゾーン</text>
<text x="633" y="96" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">人間が握る</text>
<text x="166" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ボイラープレート</text>
<text x="166" y="162" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">型定義・スキーマ</text>
<text x="166" y="179" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">単体テスト</text>
<text x="166" y="196" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">リファクタリング</text>
<text x="400" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">API設計</text>
<text x="400" y="162" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">エラーハンドリング</text>
<text x="400" y="179" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">統合テスト設計</text>
<text x="400" y="196" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">コードレビュー</text>
<text x="633" y="145" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">アーキテクチャ</text>
<text x="633" y="162" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ビジネスロジック</text>
<text x="633" y="179" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">セキュリティ判断</text>
<text x="633" y="196" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">トレードオフ評価</text>
<text x="400" y="260" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">人間が設計・指示し、AIが実装するモデルが最も効率的</text>
<text x="400" y="290" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">グレーゾーンは対話的に進める — 人間が最終決定権を持つ</text>
`);

// [26] テスト自動生成 — coverage pyramid
const svgTestCoverage = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AIによるテスト自動生成カバレッジ</text>
<polygon points="400,70 200,300 600,300" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<polygon points="400,70 300,185 500,185" fill="#1a3a1a" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="145" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">AIが最も得意</text>
<text x="400" y="163" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">境界値・ゼロ除算</text>
<text x="400" y="178" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">型エラー・null ケース</text>
<line x1="200" y1="220" x2="600" y2="220" stroke="${GRAY}" stroke-width="0.8" stroke-dasharray="4,3"/>
<text x="400" y="244" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">AIで効率化できる（80%達成）</text>
<text x="400" y="262" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">API正常系・統合テスト基本パターン</text>
<text x="400" y="330" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">人間が追加するエッジケース</text>
<text x="400" y="350" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">ビジネスルール・競合状態・本番障害再現</text>
<text x="120" y="185" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">単体テスト</text>
<text x="120" y="250" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">統合テスト</text>
<text x="120" y="315" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">E2Eテスト</text>
`);

// [28] リファクタリング自動化 — before/after
const svgRefactoring = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AIリファクタリングの効果</text>
<rect x="30" y="60" width="340" height="280" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="1.5"/>
<text x="200" y="88" fill="${ACC2}" font-size="14" text-anchor="middle" font-family="sans-serif">Before</text>
<rect x="50" y="100" width="300" height="30" rx="4" fill="#2a1a1a"/>
<text x="200" y="120" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">重複コード: 数十箇所</text>
<rect x="50" y="140" width="300" height="30" rx="4" fill="#2a1a1a"/>
<text x="200" y="160" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">any型: 150箇所</text>
<rect x="50" y="180" width="300" height="30" rx="4" fill="#2a1a1a"/>
<text x="200" y="200" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">O(n²) ループ: 8箇所</text>
<rect x="50" y="220" width="300" height="30" rx="4" fill="#2a1a1a"/>
<text x="200" y="240" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">複雑度スコア: 47</text>
<rect x="50" y="260" width="300" height="30" rx="4" fill="#2a1a1a"/>
<text x="200" y="280" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">コードカバレッジ: 43%</text>
<polygon points="380,190 400,190 400,180 430,200 400,220 400,210 380,210" fill="${ACC1}"/>
<rect x="440" y="60" width="330" height="280" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="605" y="88" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">After (AIリファクタリング)</text>
<rect x="460" y="100" width="290" height="30" rx="4" fill="#1a3a1a"/>
<text x="605" y="120" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">共通関数化: -80% 削減</text>
<rect x="460" y="140" width="290" height="30" rx="4" fill="#1a3a1a"/>
<text x="605" y="160" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">型安全: any型 ≈ 0</text>
<rect x="460" y="180" width="290" height="30" rx="4" fill="#1a3a1a"/>
<text x="605" y="200" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">O(n log n): 全改善</text>
<rect x="460" y="220" width="290" height="30" rx="4" fill="#1a3a1a"/>
<text x="605" y="240" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">複雑度スコア: 12</text>
<rect x="460" y="260" width="290" height="30" rx="4" fill="#1a3a1a"/>
<text x="605" y="280" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">コードカバレッジ: 82%</text>
<text x="200" y="370" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">注: ビジネスロジックの変更は人間が確認</text>
<text x="605" y="370" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">AIが提案 → 人間が承認の2段階</text>
`);

// [30] AI生成コードのレビュー課題 — volume problem
const svgReviewProblem = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AI導入後のPR量の変化</text>
<rect x="80" y="300" width="80" height="50" rx="4" fill="${GRAY}"/>
<text x="120" y="295" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">前</text>
<text x="120" y="325" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">PR/週</text>
<text x="120" y="345" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">10本</text>
<rect x="230" y="200" width="80" height="150" rx="4" fill="${ACC1}" opacity="0.7"/>
<text x="270" y="195" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">2倍</text>
<text x="270" y="325" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">PR/週</text>
<text x="270" y="345" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">20本</text>
<rect x="380" y="130" width="80" height="220" rx="4" fill="${ACC1}"/>
<text x="420" y="125" fill="${ACC1}" font-size="12" text-anchor="middle" font-family="sans-serif">3倍</text>
<text x="420" y="325" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">行数/PR</text>
<text x="420" y="345" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">+200%</text>
<rect x="530" y="80" width="80" height="270" rx="4" fill="${ACC2}"/>
<text x="570" y="75" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">⚠ 危機</text>
<text x="570" y="325" fill="${TXT}" font-size="11" text-anchor="middle" font-family="sans-serif">レビュー</text>
<text x="570" y="345" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">追いつかない</text>
<line x1="60" y1="350" x2="680" y2="350" stroke="${GRAY}" stroke-width="1"/>
<rect x="60" y="370" width="640" height="20" rx="4" fill="${BOX}"/>
<text x="380" y="384" fill="${ACC1}" font-size="11" text-anchor="middle" font-family="sans-serif">解決策: リスクベースレビュー + 静的解析自動化</text>
`);

// [33] 静的解析ツール連携 — tool ecosystem
const svgStaticAnalysis = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">静的解析ツールエコシステム</text>
<rect x="320" y="155" width="160" height="70" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="400" y="185" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">AI生成コード</text>
<text x="400" y="205" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">PR作成</text>
<rect x="30" y="60" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="120" y="85" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Biome / ESLint</text>
<text x="120" y="105" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">構文・スタイル自動修正</text>
<rect x="30" y="160" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="120" y="185" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">TypeScript strict</text>
<text x="120" y="205" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">型安全性の強制</text>
<rect x="30" y="260" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="120" y="285" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">Semgrep</text>
<text x="120" y="305" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">カスタムルール検出</text>
<rect x="590" y="60" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="680" y="85" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">SonarQube</text>
<text x="680" y="105" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">脆弱性・重複検出</text>
<rect x="590" y="160" width="180" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="680" y="185" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">GitHub Actions</text>
<text x="680" y="205" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">CI/CD自動実行</text>
<rect x="590" y="260" width="180" height="60" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="1"/>
<text x="680" y="285" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">人間レビュー</text>
<text x="680" y="305" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">ビジネスロジック・設計</text>
<line x1="210" y1="90" x2="320" y2="175" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="210" y1="190" x2="320" y2="190" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="210" y1="290" x2="320" y2="205" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="480" y1="175" x2="590" y2="90" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="480" y1="190" x2="590" y2="190" stroke="${GRAY}" stroke-width="1" stroke-dasharray="4,3"/>
<line x1="480" y1="205" x2="590" y2="290" stroke="${ACC2}" stroke-width="1.5"/>
`);

// [34] AIレビュアーの活用 — AI + human review flow
const svgAIReviewFlow = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AI + 人間 ハイブリッドレビューモデル</text>
<rect x="50" y="65" width="130" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="115" y="91" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AI生成</text>
<text x="115" y="111" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">PRを作成</text>
<polygon points="185,90 215,90 215,80 245,95 215,110 215,100 185,100" fill="${ACC1}" opacity="0.7"/>
<rect x="250" y="65" width="130" height="60" rx="8" fill="${BOX}" stroke="#4fc3f7" stroke-width="1.5"/>
<text x="315" y="91" fill="#4fc3f7" font-size="12" text-anchor="middle" font-family="sans-serif">AI 1次レビュー</text>
<text x="315" y="111" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">バグ・セキュリティ</text>
<polygon points="385,90 415,90 415,80 445,95 415,110 415,100 385,100" fill="${ACC1}" opacity="0.7"/>
<rect x="450" y="65" width="130" height="60" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="515" y="91" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">自動チェック</text>
<text x="515" y="111" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">静的解析・テスト</text>
<polygon points="585,90 615,90 615,80 645,95 615,110 615,100 585,100" fill="${ACC1}" opacity="0.7"/>
<rect x="650" y="65" width="120" height="60" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="710" y="91" fill="${ACC2}" font-size="12" text-anchor="middle" font-family="sans-serif">人間 最終判断</text>
<text x="710" y="111" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">設計・ロジック</text>
<rect x="100" y="200" width="600" height="140" rx="10" fill="${BOX}"/>
<text x="400" y="225" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">人間が集中すべき4つの領域</text>
<text x="240" y="260" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">認証・認可ロジック</text>
<text x="560" y="260" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ビジネスルール妥当性</text>
<text x="240" y="300" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">アーキテクチャ整合性</text>
<text x="560" y="300" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">データ整合性・副作用</text>
<text x="400" y="325" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">AIは第一次フィルター、最終判断は常に人間</text>
`);

// [38] AI時代に求められるスキルセット — T-shape
const svgTShape = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AI時代のT字型人材モデル</text>
<rect x="150" y="60" width="500" height="60" rx="6" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="400" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">横軸: AI活用 × 設計力 × コミュニケーション × 学習力</text>
<text x="400" y="108" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">広く薄く — 時代の変化に対応する汎用スキル</text>
<rect x="340" y="120" width="120" height="240" rx="6" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="400" y="150" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">縦軸</text>
<text x="400" y="175" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">プログラミング</text>
<text x="400" y="195" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">基礎理論</text>
<text x="400" y="230" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ドメイン</text>
<text x="400" y="250" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">専門知識</text>
<text x="400" y="290" fill="${GRAY}" font-size="10" text-anchor="middle" font-family="sans-serif">深い専門性</text>
<text x="185" y="115" fill="${GRAY}" font-size="11" font-family="sans-serif">AI活用力</text>
<text x="185" y="135" fill="${GRAY}" font-size="11" font-family="sans-serif">プロンプト設計</text>
<text x="600" y="115" fill="${GRAY}" font-size="11" font-family="sans-serif">設計スキル</text>
<text x="600" y="135" fill="${GRAY}" font-size="11" font-family="sans-serif">アーキテクチャ</text>
<rect x="50" y="370" width="340" height="25" rx="5" fill="#1a2a1a"/>
<text x="220" y="387" fill="#4caf50" font-size="11" text-anchor="middle" font-family="sans-serif">技術力 × AI活用力 = 高生産性エンジニア</text>
<rect x="410" y="370" width="340" height="25" rx="5" fill="#1a1a2a"/>
<text x="580" y="387" fill="${ACC2}" font-size="11" text-anchor="middle" font-family="sans-serif">3スキル掛け算 = 唯一無二の人材</text>
`);

// [39] スキルの掛け算 — multiplier diagram
const svgSkillMultiplier = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">スキルの掛け算効果</text>
<rect x="50" y="60" width="200" height="80" rx="8" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="150" y="93" fill="${TXT}" font-size="13" text-anchor="middle" font-family="sans-serif">技術力のみ</text>
<text x="150" y="120" fill="${GRAY}" font-size="12" text-anchor="middle" font-family="sans-serif">代替可能な人材</text>
<rect x="300" y="60" width="200" height="80" rx="8" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">技術力 × AI活用</text>
<text x="400" y="110" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">高い生産性</text>
<text x="400" y="128" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">10x エンジニア相当</text>
<rect x="550" y="60" width="200" height="80" rx="8" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="650" y="83" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">技術 × AI × 設計</text>
<text x="650" y="105" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">唯一無二の存在</text>
<text x="650" y="123" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">代替不可能</text>
<rect x="60" y="190" width="180" height="150" rx="6" fill="${BOX}" stroke="${GRAY}" stroke-width="0.8"/>
<rect x="60" y="310" width="180" height="30" rx="3" fill="${GRAY}" opacity="0.3"/>
<text x="150" y="330" fill="${TXT}" font-size="14" text-anchor="middle" font-family="sans-serif">価値: 1×</text>
<rect x="310" y="190" width="180" height="150" rx="6" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<rect x="310" y="255" width="180" height="85" rx="3" fill="${ACC1}" opacity="0.3"/>
<text x="400" y="330" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">価値: 3〜5×</text>
<rect x="560" y="190" width="180" height="150" rx="6" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<rect x="560" y="200" width="180" height="140" rx="3" fill="${ACC2}" opacity="0.25"/>
<text x="650" y="330" fill="${ACC2}" font-size="14" text-anchor="middle" font-family="sans-serif">価値: 10×+</text>
<text x="400" y="380" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">スキルは足し算ではなく掛け算 — 組み合わせで指数関数的に価値が上がる</text>
`);

// [41] 今日から始めるアクション — action checklist
const svgActionPlan = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">今日から始める30日アクションプラン</text>
<rect x="40" y="60" width="340" height="310" rx="10" fill="${BOX}"/>
<text x="210" y="90" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">Week 1-2: ツール習熟</text>
<text x="210" y="120" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">1つのAIツールを選んで毎日使う</text>
<text x="210" y="145" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">プロンプトパターンをメモする</text>
<text x="210" y="170" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">効果的な使い方を記録・共有</text>
<line x1="60" y1="185" x2="360" y2="185" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="210" y="215" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">Week 3-4: 環境整備</text>
<text x="210" y="245" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">CLAUDE.md を作成・更新</text>
<text x="210" y="270" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">レビューチェックリストを整備</text>
<text x="210" y="295" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">チームでガイドラインを議論</text>
<text x="210" y="350" fill="${GRAY}" font-size="11" text-anchor="middle" font-family="sans-serif">小さく始めて段階的に拡大</text>
<rect x="420" y="60" width="340" height="310" rx="10" fill="${BOX}"/>
<text x="590" y="90" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">成功指標の設定</text>
<text x="590" y="125" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">PR作成速度 (before/after)</text>
<text x="590" y="155" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">テストカバレッジの変化</text>
<text x="590" y="185" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">レビュー指摘数の推移</text>
<line x1="440" y1="205" x2="740" y2="205" stroke="${GRAY}" stroke-width="0.5" stroke-dasharray="4,3"/>
<text x="590" y="240" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">よくある躓きポイント</text>
<text x="590" y="275" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">プロンプトが曖昧すぎる</text>
<text x="590" y="305" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AIを信頼しすぎてレビュー省略</text>
<text x="590" y="335" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">チームへの展開が遅れる</text>
`);

// [43] まとめ — key takeaways visual
const svgSummary = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="40" fill="${TXT}" font-size="16" text-anchor="middle" font-family="sans-serif">3つのキーメッセージ</text>
<rect x="40" y="70" width="720" height="85" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="2"/>
<text x="400" y="100" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">1. AIは「脅威」ではなく「最強の協働パートナー」</text>
<text x="400" y="128" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">設計・判断・レビュー力がある人ほど、AIで10倍の成果を出せる</text>
<rect x="40" y="175" width="720" height="85" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="400" y="205" fill="${ACC1}" font-size="14" text-anchor="middle" font-family="sans-serif">2. 設計力とレビュー力がコア価値</text>
<text x="400" y="233" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">実装はAIが担う時代。人間が担うのはアーキテクチャと品質ゲート</text>
<rect x="40" y="280" width="720" height="85" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="400" y="310" fill="${ACC2}" font-size="14" text-anchor="middle" font-family="sans-serif">3. 進化し続ける人材へ</text>
<text x="400" y="338" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">学習速度 × AI活用力 × 専門深度 — 変化を味方につけた人が勝つ</text>
`);

// Index mapping: slide index -> SVG string to prepend
const svgMap: Record<number, string> = {
	4: svgParadigmShift,
	7: svgProductivity,
	9: svgMythReality,
	11: svgToolComparison,
	13: svgPhasedRollout,
	22: svgDivisionSpectrum,
	26: svgTestCoverage,
	28: svgRefactoring,
	30: svgReviewProblem,
	33: svgStaticAnalysis,
	34: svgAIReviewFlow,
	38: svgTShape,
	39: svgSkillMultiplier,
	41: svgActionPlan,
	43: svgSummary,
};

// Also add to: 14 (security), 25 (CRUD), 36 (checklist), 40 (resources)
const svgSecurity = svgWrap(`
<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" fill="${TXT}" font-size="15" text-anchor="middle" font-family="sans-serif">AIツール利用のセキュリティリスクマップ</text>
<rect x="40" y="60" width="340" height="130" rx="10" fill="${BOX}" stroke="${ACC2}" stroke-width="2"/>
<text x="210" y="88" fill="${ACC2}" font-size="13" text-anchor="middle" font-family="sans-serif">高リスク領域</text>
<text x="210" y="118" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">APIキー・パスワードをプロンプトに含む</text>
<text x="210" y="143" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">個人情報・機密データの送信</text>
<text x="210" y="168" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">AI生成コードの無検証デプロイ</text>
<rect x="420" y="60" width="340" height="130" rx="10" fill="${BOX}" stroke="${ACC1}" stroke-width="1.5"/>
<text x="590" y="88" fill="${ACC1}" font-size="13" text-anchor="middle" font-family="sans-serif">中リスク領域</text>
<text x="590" y="118" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">ライセンス未確認コードの使用</text>
<text x="590" y="143" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">サードパーティ依存の過剰追加</text>
<text x="590" y="168" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">トレーニングデータへの情報漏洩</text>
<rect x="40" y="215" width="720" height="150" rx="10" fill="${BOX}" stroke="${GRAY}" stroke-width="1"/>
<text x="400" y="243" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">対策チェックリスト</text>
<text x="200" y="273" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">機密情報の除外ルール整備</text>
<text x="200" y="298" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">データ保持ポリシーの確認</text>
<text x="200" y="323" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">オンプレ/セルフホスト検討</text>
<text x="600" y="273" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">生成履歴ロギング</text>
<text x="600" y="298" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">定期的セキュリティ監査</text>
<text x="600" y="323" fill="${TXT}" font-size="12" text-anchor="middle" font-family="sans-serif">OWASP AI Security準拠</text>
`);

svgMap[14] = svgSecurity;

// Apply SVGs
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
	`Done. Added SVGs to ${addedCount} slides in ai-era-survival-strategy.`,
);

// Verify coverage
const totalSlides = slides.length;
const svgSlides = slides.filter((s: { content?: string[] }) =>
	s.content?.some(
		(c: string) => c.startsWith("<svg") || c.includes("](assets/"),
	),
).length;
console.log(
	`Coverage: ${svgSlides}/${totalSlides} = ${Math.round((svgSlides / totalSlides) * 100)}%`,
);
