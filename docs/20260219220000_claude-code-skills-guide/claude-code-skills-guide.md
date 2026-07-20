---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Claude Code スキルガイドライン"
footer: "© 2026 Claude Code Skills Guide"
style: |
  /* ── Overflow prevention ──────────────────────────────── */
    section { overflow: hidden; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.7;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Images (all, not only SVG) ───────────────────────── */
    section img:not([src$=".svg"]) {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    section svg {
      max-height: 70vh;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    section img[src$=".svg"] {
      max-height: 70vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  
    /* ── Code blocks ──────────────────────────────────────── */
    section pre { overflow: hidden; }
    section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }
  
    /* ── Tables ───────────────────────────────────────────── */
    section table {
      font-size: 0.78em;
      width: 100%;
      overflow: hidden;
      word-break: break-word;
      border-collapse: collapse;
    }
    section th, section td {
      padding: 0.35em 0.6em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
  
    /* ── Subtitle / BLUF callout (blockquote) ─────────────── */
    section blockquote {
      font-size: 0.88em;
      line-height: 1.55;
      padding: 0.25em 0.8em;
      margin: 0.15em 0 0.35em;
      opacity: 0.88;
      overflow-wrap: break-word;
    }
    section blockquote p { margin: 0; }
  
  section pre code {
    font-size: 0.58em;
    line-height: 1.4;
  }
  section code {
    font-size: 0.75em;
  }
  section h1 {
    font-size: 1.6em;
  }
  section h2 {
    font-size: 1.3em;
  }
  
---

<!-- _class: lead -->
# Claude Code スキルガイドライン

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="60" text-anchor="middle" fill="#f9a825" font-size="28" font-weight="bold">Claude Code スキルガイド</text>
  <text x="400" y="95" text-anchor="middle" fill="#ffffff" font-size="16" opacity="0.8">スキルシステムで自動化・効率化を最大化する</text>
  
    <rect x="25" y="130" width="110" height="100" fill="#16213e" rx="10"/>
    <text x="80" y="172" text-anchor="middle" fill="#f9a825" font-size="28">⚡</text>
    <text x="80" y="202" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">自動化</text>
  
    <rect x="185" y="130" width="110" height="100" fill="#16213e" rx="10"/>
    <text x="240" y="172" text-anchor="middle" fill="#2196f3" font-size="28">🔄</text>
    <text x="240" y="202" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">再利用</text>
  
    <rect x="345" y="130" width="110" height="100" fill="#16213e" rx="10"/>
    <text x="400" y="172" text-anchor="middle" fill="#4caf50" font-size="28">🤝</text>
    <text x="400" y="202" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">チーム連携</text>
  
    <rect x="505" y="130" width="110" height="100" fill="#16213e" rx="10"/>
    <text x="560" y="172" text-anchor="middle" fill="#ff9800" font-size="28">📈</text>
    <text x="560" y="202" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold">品質向上</text>
  
    <rect x="665" y="130" width="110" height="100" fill="#16213e" rx="10"/>
    <text x="720" y="172" text-anchor="middle" fill="#e91e63" font-size="28">🚀</text>
    <text x="720" y="202" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">高速開発</text>
  
  <rect x="100" y="265" width="600" height="80" fill="#16213e" rx="8"/>
  <text x="400" y="298" text-anchor="middle" fill="#ffffff" font-size="15">SKILL.md に定義したワークフローを /skill-name で呼び出すだけ</text>
  <text x="400" y="325" text-anchor="middle" fill="#f9a825" font-size="14">インタビュー → 設計 → 実装 → 検証 → 配信 を一発自動化</text>
</svg>
- チームリーダー・マネージャーのための完全ガイド
- 2026年2月


---

# アジェンダ

> *6つのスキルとカスタム設計で全ワークフローを自動化し開発体験を変える*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">本日のアジェンダ</text>
  
      <rect x="60" y="60" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="60" width="8" height="40" fill="#2196f3" rx="2"/>
      <circle cx="90" cy="80" r="12" fill="#2196f3" opacity="0.3"/>
      <text x="90" y="85" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">1</text>
      <text x="120" y="76" fill="#2196f3" font-size="13" font-weight="bold">スキルとは何か</text>
      <text x="120" y="92" fill="#ffffff" font-size="12" opacity="0.7">SKILL.md の仕組み・実行フロー</text>
    
      <rect x="60" y="110" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="110" width="8" height="40" fill="#f9a825" rx="2"/>
      <circle cx="90" cy="130" r="12" fill="#f9a825" opacity="0.3"/>
      <text x="90" y="135" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">2</text>
      <text x="120" y="126" fill="#f9a825" font-size="13" font-weight="bold">既存スキル一覧</text>
      <text x="120" y="142" fill="#ffffff" font-size="12" opacity="0.7">/create-slides, /generate, /ship, /agent-teams</text>
    
      <rect x="60" y="160" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="160" width="8" height="40" fill="#4caf50" rx="2"/>
      <circle cx="90" cy="180" r="12" fill="#4caf50" opacity="0.3"/>
      <text x="90" y="185" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">3</text>
      <text x="120" y="176" fill="#4caf50" font-size="13" font-weight="bold">実践ユースケース</text>
      <text x="120" y="192" fill="#ffffff" font-size="12" opacity="0.7">5つのユースケースと導入効果</text>
    
      <rect x="60" y="210" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="210" width="8" height="40" fill="#ff9800" rx="2"/>
      <circle cx="90" cy="230" r="12" fill="#ff9800" opacity="0.3"/>
      <text x="90" y="235" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">4</text>
      <text x="120" y="226" fill="#ff9800" font-size="13" font-weight="bold">カスタムスキル作成</text>
      <text x="120" y="242" fill="#ffffff" font-size="12" opacity="0.7">8フェーズ設計・SKILL.md 必須セクション</text>
    
      <rect x="60" y="260" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="260" width="8" height="40" fill="#e91e63" rx="2"/>
      <circle cx="90" cy="280" r="12" fill="#e91e63" opacity="0.3"/>
      <text x="90" y="285" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">5</text>
      <text x="120" y="276" fill="#e91e63" font-size="13" font-weight="bold">チーム導入戦略</text>
      <text x="120" y="292" fill="#ffffff" font-size="12" opacity="0.7">段階的ロードマップ・ガバナンス</text>
    
      <rect x="60" y="310" width="680" height="40" fill="#16213e" rx="5"/>
      <rect x="60" y="310" width="8" height="40" fill="#9c27b0" rx="2"/>
      <circle cx="90" cy="330" r="12" fill="#9c27b0" opacity="0.3"/>
      <text x="90" y="335" text-anchor="middle" fill="#9c27b0" font-size="13" font-weight="bold">6</text>
      <text x="120" y="326" fill="#9c27b0" font-size="13" font-weight="bold">まとめ</text>
      <text x="120" y="342" fill="#ffffff" font-size="12" opacity="0.7">ROI・成功の鍵・3ステップ</text>
    
</svg>
- 1. **Claude Code スキルとは** — 仕組みと種類
- 2. **既存スキル一覧** — 6スキルの詳細解説
- 3. **実践ユースケース** — 5シナリオの効果測定
- 4. **カスタムスキル作成** — 設計ガイドライン
- 5. **チーム導入戦略** — ロードマップ・ガバナンス
- 6. **まとめ** — 今日から始める3ステップ


---

# なぜ今、スキルが重要か

- <svg viewBox='0 0 780 210' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='20' width='215' height='170' rx='12' fill='#5B21B6'/><circle cx='137' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='137' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>01</text><text x='137' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>標準化</text><text x='137' y='147' text-anchor='middle' fill='#DDD6FE' font-size='13'>誰でも同品質</text><text x='137' y='167' text-anchor='middle' fill='#C4B5FD' font-size='12'>プロンプト不要</text><rect x='283' y='20' width='215' height='170' rx='12' fill='#1D4ED8'/><circle cx='390' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='390' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>02</text><text x='390' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>再利用</text><text x='390' y='147' text-anchor='middle' fill='#BFDBFE' font-size='13'>一度作れば</text><text x='390' y='167' text-anchor='middle' fill='#93C5FD' font-size='12'>何度でも活用</text><rect x='536' y='20' width='215' height='170' rx='12' fill='#065F46'/><circle cx='643' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='643' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>03</text><text x='643' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>組織資産化</text><text x='643' y='147' text-anchor='middle' fill='#A7F3D0' font-size='13'>ナレッジの</text><text x='643' y='167' text-anchor='middle' fill='#6EE7B7' font-size='12'>属人化を排除</text></svg>


---

<!-- _class: lead -->
# Claude Code スキルとは

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">Claude Code スキルとは</text>
  <rect x="280" y="60" width="240" height="60" fill="#2196f3" rx="8" opacity="0.8"/>
  <text x="400" y="88" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">SKILL.md</text>
  <text x="400" y="108" text-anchor="middle" fill="#ffffff" font-size="12" opacity="0.8">ワークフロー定義ファイル</text>
  <polygon points="400,135 406,123 394,123" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="120" x2="400" y2="133" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="290" y="140" width="220" height="40" fill="#16213e" rx="6"/>
  <text x="400" y="165" text-anchor="middle" fill="#f9a825" font-size="14">/skill-name で呼び出し</text>
  <polygon points="400,196 406,184 394,184" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="180" x2="400" y2="194" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  
      <rect x="30" y="200" width="140" height="60" fill="#2196f3" opacity="0.25" rx="6"/>
      <rect x="30" y="200" width="140" height="4" fill="#2196f3" rx="2"/>
      <text x="100" y="224" text-anchor="middle" fill="#ffffff" font-size="12">インタビュー</text><text x="100" y="244" text-anchor="middle" fill="#ffffff" font-size="12">(Layer 1/2)</text>
    
      <rect x="210" y="200" width="140" height="60" fill="#4caf50" opacity="0.25" rx="6"/>
      <rect x="210" y="200" width="140" height="4" fill="#4caf50" rx="2"/>
      <text x="280" y="224" text-anchor="middle" fill="#ffffff" font-size="12">実装</text><text x="280" y="244" text-anchor="middle" fill="#ffffff" font-size="12">(設計→コード)</text>
    
      <rect x="390" y="200" width="140" height="60" fill="#ff9800" opacity="0.25" rx="6"/>
      <rect x="390" y="200" width="140" height="4" fill="#ff9800" rx="2"/>
      <text x="460" y="224" text-anchor="middle" fill="#ffffff" font-size="12">検証</text><text x="460" y="244" text-anchor="middle" fill="#ffffff" font-size="12">(テスト→修正)</text>
    
      <rect x="570" y="200" width="140" height="60" fill="#e91e63" opacity="0.25" rx="6"/>
      <rect x="570" y="200" width="140" height="4" fill="#e91e63" rx="2"/>
      <text x="640" y="224" text-anchor="middle" fill="#ffffff" font-size="12">配信</text><text x="640" y="244" text-anchor="middle" fill="#ffffff" font-size="12">(commit→PR)</text>
    
  <polygon points="212,228 232,223 232,233" fill="#ffffff" opacity="0.4"/>
  <line x1="210" y1="228" x2="230" y2="228" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <polygon points="390,228 410,223 410,233" fill="#ffffff" opacity="0.4"/>
  <line x1="390" y1="228" x2="408" y2="228" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <polygon points="570,228 590,223 590,233" fill="#ffffff" opacity="0.4"/>
  <line x1="570" y1="228" x2="588" y2="228" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <rect x="100" y="290" width="600" height="75" fill="#16213e" rx="8"/>
  <text x="400" y="318" text-anchor="middle" fill="#ffffff" font-size="14">スキルは「再利用可能なAIワークフロー」</text>
  <text x="400" y="342" text-anchor="middle" fill="#f9a825" font-size="13">一度定義すれば誰でも同じ品質で実行できる</text>
</svg>


---

# スキルとは何か

> *SKILL.mdに定義するだけで誰でも同品質のAIワークフローを再利用できる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキルの解剖図 — SKILL.md の構造</text>
  <rect x="60" y="60" width="680" height="290" fill="#16213e" rx="10"/>
  <rect x="60" y="60" width="680" height="8" fill="#f9a825" rx="4"/>
  <text x="400" y="90" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">SKILL.md</text>
  
    <rect x="80" y="110" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="110" width="4" height="30" fill="#2196f3"/>
    <text x="100" y="130" fill="#2196f3" font-size="13" font-weight="bold" font-family="monospace"># Overview</text>
    <text x="340" y="130" fill="#ffffff" font-size="12" opacity="0.7">スキルの目的・スコープを1〜2文で説明</text>
  
    <rect x="80" y="148" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="148" width="4" height="30" fill="#4caf50"/>
    <text x="100" y="168" fill="#4caf50" font-size="13" font-weight="bold" font-family="monospace">## Interview Phase</text>
    <text x="340" y="168" fill="#ffffff" font-size="12" opacity="0.7">Layer 1/2 質問リスト・承認フロー</text>
  
    <rect x="80" y="186" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="186" width="4" height="30" fill="#f9a825"/>
    <text x="100" y="206" fill="#f9a825" font-size="13" font-weight="bold" font-family="monospace">## Workflow</text>
    <text x="340" y="206" fill="#ffffff" font-size="12" opacity="0.7">フェーズ定義・実行順序・ツール使用方針</text>
  
    <rect x="80" y="224" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="224" width="4" height="30" fill="#ff9800"/>
    <text x="100" y="244" fill="#ff9800" font-size="13" font-weight="bold" font-family="monospace">## Error Handling</text>
    <text x="340" y="244" fill="#ffffff" font-size="12" opacity="0.7">リトライ・セルフヒーリング・エスカレーション</text>
  
    <rect x="80" y="262" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="262" width="4" height="30" fill="#e91e63"/>
    <text x="100" y="282" fill="#e91e63" font-size="13" font-weight="bold" font-family="monospace">## Output Format</text>
    <text x="340" y="282" fill="#ffffff" font-size="12" opacity="0.7">成果物仕様・品質基準・チェックリスト</text>
  
    <rect x="80" y="300" width="640" height="30" fill="#1a1a2e" rx="3"/>
    <rect x="80" y="300" width="4" height="30" fill="#9c27b0"/>
    <text x="100" y="320" fill="#9c27b0" font-size="13" font-weight="bold" font-family="monospace">## Examples</text>
    <text x="340" y="320" fill="#ffffff" font-size="12" opacity="0.7">呼び出し例・サンプル出力</text>
  
</svg>
- スキル = 特定タスクに特化した **AI エージェントの行動定義**
- `SKILL.md` ファイルにワークフロー・ルール・チェックリストを記述
- `/コマンド` で呼び出し: `/create-slides`, `/ship`, `/agent-teams` など
- フェーズごとの対話設計でミスを防止し、品質を保証
- 一度定義すれば、チーム全員が同品質で使えるテンプレート
- 組み込みスキル（6種）とチーム固有のカスタムスキルが利用可能


---

# SKILL.md の仕組み — 実行フロー

> *ユーザー→スキル呼び出し→SKILL.md読み込み→実行の4ステップ*

- <svg viewBox='0 0 800 130' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='40' width='130' height='50' rx='8' fill='#5B21B6'/><text x='75' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>SKILL.md</text><text x='75' y='78' text-anchor='middle' fill='#DDD6FE' font-size='11'>定義ファイル</text><line x1='140' y1='65' x2='165' y2='65' stroke='#A78BFA' stroke-width='2'/><polygon points='172,65 162,60 162,70' fill='#A78BFA'/><rect x='172' y='40' width='130' height='50' rx='8' fill='#1D4ED8'/><text x='237' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>/コマンド</text><text x='237' y='78' text-anchor='middle' fill='#BFDBFE' font-size='11'>呼び出し</text><line x1='302' y1='65' x2='327' y2='65' stroke='#60A5FA' stroke-width='2'/><polygon points='334,65 324,60 324,70' fill='#60A5FA'/><rect x='334' y='40' width='130' height='50' rx='8' fill='#065F46'/><text x='399' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>フェーズ実行</text><text x='399' y='78' text-anchor='middle' fill='#A7F3D0' font-size='11'>対話・処理</text><line x1='464' y1='65' x2='489' y2='65' stroke='#34D399' stroke-width='2'/><polygon points='496,65 486,60 486,70' fill='#34D399'/><rect x='496' y='40' width='130' height='50' rx='8' fill='#92400E'/><text x='561' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>バリデーション</text><text x='561' y='78' text-anchor='middle' fill='#FDE68A' font-size='11'>品質検証</text><line x1='626' y1='65' x2='651' y2='65' stroke='#FBBF24' stroke-width='2'/><polygon points='658,65 648,60 648,70' fill='#FBBF24'/><rect x='658' y='40' width='130' height='50' rx='8' fill='#1F2937'/><rect x='658' y='40' width='130' height='50' rx='8' fill='none' stroke='#6B7280' stroke-width='1.5'/><text x='723' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>完了・報告</text><text x='723' y='78' text-anchor='middle' fill='#9CA3AF' font-size='11'>出力確認</text></svg>
- `.claude/skills/<name>/SKILL.md` に配置するだけで `/コマンド` として自動登録
- **エラー時**: セルフヒーリングループ（最大3回リトライ）で自動修正


---

# スキルの種類 — 組み込み vs カスタム

- <svg viewBox='0 0 760 230' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='20' width='340' height='200' rx='12' fill='rgba(91,33,182,0.3)' stroke='#7C3AED' stroke-width='2'/><text x='190' y='55' text-anchor='middle' fill='#DDD6FE' font-size='16' font-weight='bold'>組み込みスキル（6種）</text><text x='190' y='78' text-anchor='middle' fill='#C4B5FD' font-size='13'>プロジェクトに標準搭載・即使用可能</text><text x='50' y='108' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='108' fill='white' font-size='13'>/create-slides</text><text x='50' y='130' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='130' fill='white' font-size='13'>/generate</text><text x='50' y='152' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='152' fill='white' font-size='13'>/review-slides</text><text x='205' y='108' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='108' fill='white' font-size='13'>/ship</text><text x='205' y='130' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='130' fill='white' font-size='13'>/agent-teams</text><text x='205' y='152' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='152' fill='white' font-size='13'>/validate</text><text x='190' y='200' text-anchor='middle' fill='#8B5CF6' font-size='11'>設定不要・すぐ使える</text><rect x='400' y='20' width='340' height='200' rx='12' fill='rgba(29,78,216,0.3)' stroke='#3B82F6' stroke-width='2'/><text x='570' y='55' text-anchor='middle' fill='#BFDBFE' font-size='16' font-weight='bold'>カスタムスキル</text><text x='570' y='78' text-anchor='middle' fill='#93C5FD' font-size='13'>チーム固有のワークフローを定義</text><text x='425' y='108' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='108' fill='white' font-size='13'>/weekly-report</text><text x='425' y='130' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='130' fill='white' font-size='13'>/doc-update</text><text x='425' y='152' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='152' fill='white' font-size='13'>/onboarding</text><text x='425' y='174' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='174' fill='white' font-size='13'>/deploy-check</text><text x='570' y='200' text-anchor='middle' fill='#3B82F6' font-size='11'>チームのナレッジを資産化</text></svg>


---

# 呼び出し方と統合

> */コマンドかツール呼び出しでスキルを即時起動できる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキルの呼び出し方 — コマンド統合フロー</text>
  <rect x="60" y="70" width="680" height="50" fill="#16213e" rx="8"/>
  <text x="400" y="100" text-anchor="middle" fill="#f9a825" font-size="20" font-family="monospace" font-weight="bold">/create-slides</text>
  <polygon points="400,138 406,126 394,126" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="120" x2="400" y2="136" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="100" y="140" width="600" height="40" fill="#16213e" rx="6"/>
  <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="13">Claude Code が .claude/skills/create-slides/SKILL.md を読み込む</text>
  <polygon points="400,198 406,186 394,186" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="180" x2="400" y2="196" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  
      <rect x="90" y="205" width="130" height="55" fill="#2196f3" opacity="0.3" rx="6"/>
      <text x="155" y="227" text-anchor="middle" fill="#ffffff" font-size="13">Interview</text><text x="155" y="245" text-anchor="middle" fill="#ffffff" font-size="13">Layer 1</text>
    
      <rect x="250" y="205" width="130" height="55" fill="#2196f3" opacity="0.3" rx="6"/>
      <text x="315" y="227" text-anchor="middle" fill="#ffffff" font-size="13">Interview</text><text x="315" y="245" text-anchor="middle" fill="#ffffff" font-size="13">Layer 2</text>
    
      <rect x="410" y="205" width="130" height="55" fill="#4caf50" opacity="0.3" rx="6"/>
      <text x="475" y="227" text-anchor="middle" fill="#ffffff" font-size="13">Generate</text><text x="475" y="245" text-anchor="middle" fill="#ffffff" font-size="13">Slides</text>
    
      <rect x="570" y="205" width="130" height="55" fill="#ff9800" opacity="0.3" rx="6"/>
      <text x="635" y="227" text-anchor="middle" fill="#ffffff" font-size="13">Validate</text><text x="635" y="245" text-anchor="middle" fill="#ffffff" font-size="13">& Export</text>
    
  <polygon points="242,232 252,227 252,237" fill="#ffffff" opacity="0.5"/>
  <line x1="220" y1="232" x2="250" y2="232" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <polygon points="402,232 412,227 412,237" fill="#ffffff" opacity="0.5"/>
  <line x1="380" y1="232" x2="410" y2="232" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <polygon points="562,232 572,227 572,237" fill="#ffffff" opacity="0.5"/>
  <line x1="540" y1="232" x2="570" y2="232" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <rect x="100" y="285" width="600" height="75" fill="#16213e" rx="8"/>
  <text x="400" y="310" text-anchor="middle" fill="#ffffff" font-size="14">各フェーズ完了後に「OK」「続けて」で次へ進む</text>
  <text x="400" y="335" text-anchor="middle" fill="#f9a825" font-size="13">すべてのフェーズが完了すると成果物が自動生成される</text>
</svg>
- `/skill-name` でコマンドラインから直接呼び出し（設定不要）
- Claude Code CLI と完全統合: `.claude/skills/` 配下を自動スキャン
- Codex (OpenAI) にも同じスキルを配布可能: `.codex/skills/`


---

# 呼び出し方と統合（コード例）

```bash
# 基本的な呼び出し
/create-slides          # 対話型スライド作成
/ship                   # Git: stage → commit → push
/agent-teams            # 並列マルチエージェント起動

# 引数付き呼び出し
/ship -m 'feat: add new feature'

# Codex へのスキル配布
bash .codex/install-skills.sh
```


---

# スキルが変える開発体験

- <svg viewBox='0 0 760 230' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='10' width='330' height='210' rx='12' fill='rgba(127,29,29,0.4)' stroke='#EF4444' stroke-width='2'/><text x='185' y='48' text-anchor='middle' fill='#FCA5A5' font-size='20' font-weight='bold'>BEFORE</text><line x1='50' y1='60' x2='320' y2='60' stroke='#EF4444' stroke-width='1' opacity='0.5'/><text x='50' y='88' fill='#FECACA' font-size='13'>毎回プロンプトを手書き</text><text x='50' y='112' fill='#FECACA' font-size='13'>品質がバラバラ</text><text x='50' y='136' fill='#FECACA' font-size='13'>ノウハウが属人化</text><text x='50' y='160' fill='#FECACA' font-size='13'>新人は使いこなせない</text><text x='50' y='184' fill='#FECACA' font-size='13'>繰り返し作業に時間を浪費</text><line x1='355' y1='115' x2='395' y2='115' stroke='#34D399' stroke-width='3'/><polygon points='402,115 392,109 392,121' fill='#34D399'/><rect x='410' y='10' width='330' height='210' rx='12' fill='rgba(6,78,59,0.4)' stroke='#10B981' stroke-width='2'/><text x='575' y='48' text-anchor='middle' fill='#6EE7B7' font-size='20' font-weight='bold'>AFTER</text><line x1='440' y1='60' x2='710' y2='60' stroke='#10B981' stroke-width='1' opacity='0.5'/><text x='440' y='88' fill='#A7F3D0' font-size='13'>/コマンドで即起動</text><text x='440' y='112' fill='#A7F3D0' font-size='13'>品質が均一・再現性あり</text><text x='440' y='136' fill='#A7F3D0' font-size='13'>ナレッジが組織の資産に</text><text x='440' y='160' fill='#A7F3D0' font-size='13'>新人でも即日高品質</text><text x='440' y='184' fill='#A7F3D0' font-size='13'>繰り返し作業を自動化</text></svg>


---

<!-- _class: lead -->
# 既存スキル一覧

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">既存スキル一覧</text>
  
      <rect x="60" y="70" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="60" y="70" width="340" height="6" fill="#2196f3" rx="3"/>
      <rect x="70" y="90" width="60" height="22" fill="#2196f3" opacity="0.2" rx="3"/>
      <text x="100" y="105" text-anchor="middle" fill="#2196f3" font-size="10">プレゼン</text>
      <text x="140" y="102" fill="#2196f3" font-size="14" font-weight="bold" font-family="monospace">/create-slides</text>
      <text x="75" y="130" fill="#ffffff" font-size="13" opacity="0.8">Marpスライドの自動生成</text>
    
      <rect x="430" y="70" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="430" y="70" width="340" height="6" fill="#4caf50" rx="3"/>
      <rect x="440" y="90" width="60" height="22" fill="#4caf50" opacity="0.2" rx="3"/>
      <text x="470" y="105" text-anchor="middle" fill="#4caf50" font-size="10">生成</text>
      <text x="510" y="102" fill="#4caf50" font-size="14" font-weight="bold" font-family="monospace">/generate</text>
      <text x="445" y="130" fill="#ffffff" font-size="13" opacity="0.8">コンテンツ・コード生成</text>
    
      <rect x="60" y="165" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="60" y="165" width="340" height="6" fill="#ff9800" rx="3"/>
      <rect x="70" y="185" width="60" height="22" fill="#ff9800" opacity="0.2" rx="3"/>
      <text x="100" y="200" text-anchor="middle" fill="#ff9800" font-size="10">品質</text>
      <text x="140" y="197" fill="#ff9800" font-size="14" font-weight="bold" font-family="monospace">/review-slides</text>
      <text x="75" y="225" fill="#ffffff" font-size="13" opacity="0.8">スライドのレビューと改善</text>
    
      <rect x="430" y="165" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="430" y="165" width="340" height="6" fill="#f9a825" rx="3"/>
      <rect x="440" y="185" width="60" height="22" fill="#f9a825" opacity="0.2" rx="3"/>
      <text x="470" y="200" text-anchor="middle" fill="#f9a825" font-size="10">デプロイ</text>
      <text x="510" y="197" fill="#f9a825" font-size="14" font-weight="bold" font-family="monospace">/ship</text>
      <text x="445" y="225" fill="#ffffff" font-size="13" opacity="0.8">Git commit・PR自動化</text>
    
      <rect x="60" y="260" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="60" y="260" width="340" height="6" fill="#e91e63" rx="3"/>
      <rect x="70" y="280" width="60" height="22" fill="#e91e63" opacity="0.2" rx="3"/>
      <text x="100" y="295" text-anchor="middle" fill="#e91e63" font-size="10">オーケスト</text>
      <text x="140" y="292" fill="#e91e63" font-size="14" font-weight="bold" font-family="monospace">/agent-teams</text>
      <text x="75" y="320" fill="#ffffff" font-size="13" opacity="0.8">並列マルチエージェント実行</text>
    
      <rect x="430" y="260" width="340" height="80" fill="#16213e" rx="8"/>
      <rect x="430" y="260" width="340" height="6" fill="#9c27b0" rx="3"/>
      <rect x="440" y="280" width="60" height="22" fill="#9c27b0" opacity="0.2" rx="3"/>
      <text x="470" y="295" text-anchor="middle" fill="#9c27b0" font-size="10">検証</text>
      <text x="510" y="292" fill="#9c27b0" font-size="14" font-weight="bold" font-family="monospace">/validate</text>
      <text x="445" y="320" fill="#ffffff" font-size="13" opacity="0.8">スキーマ検証・品質チェック</text>
    
</svg>


---

# /create-slides — プレゼン自動作成

> *5時間の資料作成を30〜45分に90%削減する8フェーズ自動生成パイプライン*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">/create-slides — スライド自動作成パイプライン</text>
  
      <rect x="60" y="80" width="110" height="80" fill="#2196f3" opacity="0.25" rx="8"/>
      <rect x="60" y="80" width="110" height="5" fill="#2196f3" rx="3"/>
      <text x="115" y="118" text-anchor="middle" fill="#2196f3" font-size="20">?</text>
      <text x="115" y="138" text-anchor="middle" fill="#ffffff" font-size="11">トピック</text><text x="115" y="154" text-anchor="middle" fill="#ffffff" font-size="11">ヒアリング</text>
    
      <rect x="190" y="80" width="110" height="80" fill="#f9a825" opacity="0.25" rx="8"/>
      <rect x="190" y="80" width="110" height="5" fill="#f9a825" rx="3"/>
      <text x="245" y="118" text-anchor="middle" fill="#f9a825" font-size="20">📝</text>
      <text x="245" y="138" text-anchor="middle" fill="#ffffff" font-size="11">アウトライン</text><text x="245" y="154" text-anchor="middle" fill="#ffffff" font-size="11">生成</text>
    
      <rect x="320" y="80" width="110" height="80" fill="#4caf50" opacity="0.25" rx="8"/>
      <rect x="320" y="80" width="110" height="5" fill="#4caf50" rx="3"/>
      <text x="375" y="118" text-anchor="middle" fill="#4caf50" font-size="20">⚙</text>
      <text x="375" y="138" text-anchor="middle" fill="#ffffff" font-size="11">config</text><text x="375" y="154" text-anchor="middle" fill="#ffffff" font-size="11">YAML作成</text>
    
      <rect x="450" y="80" width="110" height="80" fill="#ff9800" opacity="0.25" rx="8"/>
      <rect x="450" y="80" width="110" height="5" fill="#ff9800" rx="3"/>
      <text x="505" y="118" text-anchor="middle" fill="#ff9800" font-size="20">{}</text>
      <text x="505" y="138" text-anchor="middle" fill="#ffffff" font-size="11">JSON</text><text x="505" y="154" text-anchor="middle" fill="#ffffff" font-size="11">データ生成</text>
    
      <rect x="580" y="80" width="110" height="80" fill="#e91e63" opacity="0.25" rx="8"/>
      <rect x="580" y="80" width="110" height="5" fill="#e91e63" rx="3"/>
      <text x="635" y="118" text-anchor="middle" fill="#e91e63" font-size="20">🖼</text>
      <text x="635" y="138" text-anchor="middle" fill="#ffffff" font-size="11">Marp</text><text x="635" y="154" text-anchor="middle" fill="#ffffff" font-size="11">レンダー</text>
    
      <rect x="710" y="80" width="110" height="80" fill="#9c27b0" opacity="0.25" rx="8"/>
      <rect x="710" y="80" width="110" height="5" fill="#9c27b0" rx="3"/>
      <text x="765" y="118" text-anchor="middle" fill="#9c27b0" font-size="20">🌐</text>
      <text x="765" y="138" text-anchor="middle" fill="#ffffff" font-size="11">HTML</text><text x="765" y="154" text-anchor="middle" fill="#ffffff" font-size="11">エクスポート</text>
    
  
    <polygon points="182,120 190,115 190,125" fill="#ffffff" opacity="0.5"/>
    <line x1="170" y1="120" x2="180" y2="120" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="312,120 320,115 320,125" fill="#ffffff" opacity="0.5"/>
    <line x1="300" y1="120" x2="310" y2="120" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="442,120 450,115 450,125" fill="#ffffff" opacity="0.5"/>
    <line x1="430" y1="120" x2="440" y2="120" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="572,120 580,115 580,125" fill="#ffffff" opacity="0.5"/>
    <line x1="560" y1="120" x2="570" y2="120" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="702,120 710,115 710,125" fill="#ffffff" opacity="0.5"/>
    <line x1="690" y1="120" x2="700" y2="120" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <rect x="60" y="190" width="680" height="170" fill="#16213e" rx="8"/>
  <text x="400" y="215" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">重要な制約とルール</text>
  
      <rect x="80" y="228" width="640" height="24" fill="#1a1a2e" rx="3"/>
      <text x="95" y="244" fill="#2196f3" font-size="12" font-weight="bold">スキーマ</text>
      <text x="185" y="244" fill="#ffffff" font-size="12" opacity="0.8">content フィールド必須・layout は default/center/section のみ</text>
    
      <rect x="80" y="258" width="640" height="24" fill="#1a1a2e" rx="3"/>
      <text x="95" y="274" fill="#4caf50" font-size="12" font-weight="bold">SVGルール</text>
      <text x="185" y="274" fill="#ffffff" font-size="12" opacity="0.8">url(#id) 禁止・viewBox 必須・drop-shadow() で代替</text>
    
      <rect x="80" y="288" width="640" height="24" fill="#1a1a2e" rx="3"/>
      <text x="95" y="304" fill="#ff9800" font-size="12" font-weight="bold">トークン制限</text>
      <text x="185" y="304" fill="#ffffff" font-size="12" opacity="0.8">2KB超はすべて Write ツールで出力（inline禁止）</text>
    
      <rect x="80" y="318" width="640" height="24" fill="#1a1a2e" rx="3"/>
      <text x="95" y="334" fill="#e91e63" font-size="12" font-weight="bold">並列化</text>
      <text x="185" y="334" fill="#ffffff" font-size="12" opacity="0.8">mode:bypassPermissions 必須・ファイル競合に注意</text>
    
</svg>
- **目的**: 対話型でスライドをゼロから自動生成（8フェーズ）
- **入力**: トピック・対象者・時間・デザインを対話式で質問
- **出力**: HTML/PDF スライド（Marp形式、50枚規模も対応）
- **特徴**: アウトライン確認 → JSON生成 → レビューループ → セルフヒーリング
- **適用場面**: 技術資料・研修資料・提案書の迅速な作成
- **効果**: 5時間の資料作成 → 30〜45分（**90%削減**）


---

# /generate & /review-slides（1/2）

> *生成と品質レビューを分離することで反復改善サイクルを実現*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">/generate スキル — コンテンツ生成ワークフロー</text>
  <rect x="60" y="65" width="680" height="280" fill="#16213e" rx="8"/>
  
    <circle cx="105" cy="108" r="18" fill="#2196f3" opacity="0.3"/>
    <text x="105" y="114" text-anchor="middle" fill="#2196f3" font-size="16" font-weight="bold">1</text>
    <rect x="135" y="90" width="570" height="40" fill="#1a1a2e" rx="4"/>
    <text x="155" y="106" fill="#2196f3" font-size="14" font-weight="bold">要件ヒアリング</text>
    <text x="155" y="122" fill="#ffffff" font-size="12" opacity="0.7">トピック・対象者・長さ・フォーマット</text>
    <line x1="105" y1="126" x2="105" y2="150" stroke="#2196f3" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
  
    <circle cx="105" cy="173" r="18" fill="#4caf50" opacity="0.3"/>
    <text x="105" y="179" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold">2</text>
    <rect x="135" y="155" width="570" height="40" fill="#1a1a2e" rx="4"/>
    <text x="155" y="171" fill="#4caf50" font-size="14" font-weight="bold">構造設計</text>
    <text x="155" y="187" fill="#ffffff" font-size="12" opacity="0.7">アウトライン作成・セクション割り当て</text>
    <line x1="105" y1="191" x2="105" y2="215" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
  
    <circle cx="105" cy="238" r="18" fill="#f9a825" opacity="0.3"/>
    <text x="105" y="244" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">3</text>
    <rect x="135" y="220" width="570" height="40" fill="#1a1a2e" rx="4"/>
    <text x="155" y="236" fill="#f9a825" font-size="14" font-weight="bold">コンテンツ生成</text>
    <text x="155" y="252" fill="#ffffff" font-size="12" opacity="0.7">各セクションのテキスト・図表・コード生成</text>
    <line x1="105" y1="256" x2="105" y2="280" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
  
    <circle cx="105" cy="303" r="18" fill="#ff9800" opacity="0.3"/>
    <text x="105" y="309" text-anchor="middle" fill="#ff9800" font-size="16" font-weight="bold">4</text>
    <rect x="135" y="285" width="570" height="40" fill="#1a1a2e" rx="4"/>
    <text x="155" y="301" fill="#ff9800" font-size="14" font-weight="bold">品質検証</text>
    <text x="155" y="317" fill="#ffffff" font-size="12" opacity="0.7">スキーマ検証・一貫性チェック・出力整形</text>
    
  
</svg>
- **`/generate` — 高速レンダリング**
-   → 既存の `slides-data.json` から即 HTML 生成（非対話）
-   → テンプレート再利用による高速スライド量産に最適
- 


---

# /generate & /review-slides（2/2）

> *生成済みスライドの品質ゲートとして重要プレゼン前のレビューを自動化する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">/review-slides スキル — レビューワークフロー</text>
  <rect x="60" y="60" width="340" height="290" fill="#16213e" rx="8"/>
  <text x="230" y="88" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">レビュー観点</text>
  
    <rect x="80" y="105" width="300" height="36" fill="#1a1a2e" rx="4"/>
    <rect x="80" y="105" width="4" height="36" fill="#2196f3"/>
    <text x="98" y="120" fill="#2196f3" font-size="12" font-weight="bold">コンテンツ品質</text>
    <text x="98" y="134" fill="#ffffff" font-size="11" opacity="0.7">正確性・網羅性・一貫性</text>
  
    <rect x="80" y="151" width="300" height="36" fill="#1a1a2e" rx="4"/>
    <rect x="80" y="151" width="4" height="36" fill="#4caf50"/>
    <text x="98" y="166" fill="#4caf50" font-size="12" font-weight="bold">視覚的品質</text>
    <text x="98" y="180" fill="#ffffff" font-size="11" opacity="0.7">SVGレイアウト・色使い・余白</text>
  
    <rect x="80" y="197" width="300" height="36" fill="#1a1a2e" rx="4"/>
    <rect x="80" y="197" width="4" height="36" fill="#ff9800"/>
    <text x="98" y="212" fill="#ff9800" font-size="12" font-weight="bold">スキーマ適合</text>
    <text x="98" y="226" fill="#ffffff" font-size="11" opacity="0.7">フィールド名・レイアウト値</text>
  
    <rect x="80" y="243" width="300" height="36" fill="#1a1a2e" rx="4"/>
    <rect x="80" y="243" width="4" height="36" fill="#e91e63"/>
    <text x="98" y="258" fill="#e91e63" font-size="12" font-weight="bold">オーバーフロー</text>
    <text x="98" y="272" fill="#ffffff" font-size="11" opacity="0.7">文字数・コード行数・箇条書き数</text>
  
    <rect x="80" y="289" width="300" height="36" fill="#1a1a2e" rx="4"/>
    <rect x="80" y="289" width="4" height="36" fill="#9c27b0"/>
    <text x="98" y="304" fill="#9c27b0" font-size="12" font-weight="bold">流れの自然さ</text>
    <text x="98" y="318" fill="#ffffff" font-size="11" opacity="0.7">スライド間の接続・文脈</text>
  
  <rect x="430" y="60" width="310" height="290" fill="#16213e" rx="8"/>
  <text x="585" y="88" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">出力フォーマット</text>
  
    <rect x="450" y="105" width="270" height="36" fill="#1a1a2e" rx="4"/>
    <text x="465" y="120" fill="#4caf50" font-size="12" font-weight="bold">全体評価</text>
    <text x="465" y="134" fill="#ffffff" font-size="12" opacity="0.8">PASS / NEEDS_REVISION</text>
  
    <rect x="450" y="151" width="270" height="36" fill="#1a1a2e" rx="4"/>
    <text x="465" y="166" fill="#f9a825" font-size="12" font-weight="bold">スコア</text>
    <text x="465" y="180" fill="#ffffff" font-size="12" opacity="0.8">0〜100点</text>
  
    <rect x="450" y="197" width="270" height="36" fill="#1a1a2e" rx="4"/>
    <text x="465" y="212" fill="#ff9800" font-size="12" font-weight="bold">指摘事項</text>
    <text x="465" y="226" fill="#ffffff" font-size="12" opacity="0.8">slide番号 + 改善内容</text>
  
    <rect x="450" y="243" width="270" height="36" fill="#1a1a2e" rx="4"/>
    <text x="465" y="258" fill="#e91e63" font-size="12" font-weight="bold">優先度</text>
    <text x="465" y="272" fill="#ffffff" font-size="12" opacity="0.8">Critical / Major / Minor</text>
  
    <rect x="450" y="289" width="270" height="36" fill="#1a1a2e" rx="4"/>
    <text x="465" y="304" fill="#2196f3" font-size="12" font-weight="bold">修正例</text>
    <text x="465" y="318" fill="#ffffff" font-size="12" opacity="0.8">before → after 形式</text>
  
</svg>
- **`/review-slides` — スライドレビュー**
-   → 生成済み `.md` ファイルのレビューと改善提案を自動生成
-   → チェック項目: コンテンツ品質・デザイン整合性・情報密度
-   → 重要プレゼン前の品質ゲートとして活用


---

# /ship — Git 操作の自動化

> *AIがコミットメッセージを自動生成しstage→commit→pushを一括実行する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">/ship — Git 操作完全自動化フロー</text>
  
      <rect x="60" y="80" width="140" height="65" fill="#2196f3" opacity="0.25" rx="8"/>
      <text x="130" y="108" text-anchor="middle" fill="#ffffff" font-size="12">git status</text><text x="130" y="128" text-anchor="middle" fill="#ffffff" font-size="12">確認</text>
    
      <rect x="220" y="80" width="140" height="65" fill="#f9a825" opacity="0.25" rx="8"/>
      <text x="290" y="108" text-anchor="middle" fill="#ffffff" font-size="12">差分分析</text><text x="290" y="128" text-anchor="middle" fill="#ffffff" font-size="12">変更内容把握</text>
    
      <rect x="380" y="80" width="140" height="65" fill="#4caf50" opacity="0.25" rx="8"/>
      <text x="450" y="108" text-anchor="middle" fill="#ffffff" font-size="12">コミット</text><text x="450" y="128" text-anchor="middle" fill="#ffffff" font-size="12">メッセージ生成</text>
    
      <rect x="540" y="80" width="140" height="65" fill="#ff9800" opacity="0.25" rx="8"/>
      <text x="610" y="108" text-anchor="middle" fill="#ffffff" font-size="12">pre-commit</text><text x="610" y="128" text-anchor="middle" fill="#ffffff" font-size="12">hook 実行</text>
    
      <rect x="380" y="200" width="140" height="65" fill="#e91e63" opacity="0.25" rx="8"/>
      <text x="450" y="228" text-anchor="middle" fill="#ffffff" font-size="12">PR作成</text><text x="450" y="248" text-anchor="middle" fill="#ffffff" font-size="12">(gh pr create)</text>
    
      <rect x="220" y="200" width="140" height="65" fill="#9c27b0" opacity="0.25" rx="8"/>
      <text x="290" y="228" text-anchor="middle" fill="#ffffff" font-size="12">PR説明</text><text x="290" y="248" text-anchor="middle" fill="#ffffff" font-size="12">自動生成</text>
    
      <rect x="60" y="200" width="140" height="65" fill="#2196f3" opacity="0.25" rx="8"/>
      <text x="130" y="228" text-anchor="middle" fill="#ffffff" font-size="12">完了通知</text><text x="130" y="248" text-anchor="middle" fill="#ffffff" font-size="12">URL共有</text>
    
  <polygon points="220,112 212,105 212,120" fill="#ffffff" opacity="0.5"/>
  <line x1="200" y1="112" x2="211" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <polygon points="380,112 372,105 372,120" fill="#ffffff" opacity="0.5"/>
  <line x1="360" y1="112" x2="371" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <polygon points="540,112 532,105 532,120" fill="#ffffff" opacity="0.5"/>
  <line x1="520" y1="112" x2="531" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <line x1="610" y1="145" x2="610" y2="190" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <line x1="610" y1="190" x2="522" y2="200" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
  <polygon points="378,232 368,227 368,237" fill="#ffffff" opacity="0.5"/>
  <line x1="360" y1="232" x2="367" y2="232" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <polygon points="218,232 208,227 208,237" fill="#ffffff" opacity="0.5"/>
  <line x1="200" y1="232" x2="207" y2="232" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <rect x="60" y="295" width="680" height="60" fill="#16213e" rx="8"/>
  <text x="400" y="320" text-anchor="middle" fill="#ffffff" font-size="14">pre-commit hook 失敗時は自動でエラー修正を試みる</text>
  <text x="400" y="343" text-anchor="middle" fill="#f9a825" font-size="13">Co-Authored-By: Claude Sonnet をコミットに自動付与</text>
</svg>
- **目的**: ステージング → コミット → プッシュを一括実行
- **特徴**: AI がコミットメッセージを自動生成（日本語/英語）
- **安全機能**: 危険な操作（force push 等）は明示的確認が必要
- **適用場面**: 作業完了後の素早いコミット・チーム共有


---

# /ship — Git 操作の自動化（コード例）

```bash
# /ship を実行すると自動的に:
# 1. git status / diff を確認
# 2. コミットメッセージを AI が生成
# 3. git add → commit → push を実行

# 手動メッセージ指定も可能
/ship -m 'feat: add Claude Code skills guide'
```


---

# /agent-teams — 並列マルチエージェント構成

- <svg viewBox='0 0 780 275' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='8' width='760' height='42' rx='8' fill='#374151'/><text x='390' y='34' text-anchor='middle' fill='#9CA3AF' font-size='14'>tmux session</text><rect x='10' y='58' width='760' height='68' rx='0' fill='#1E1B4B'/><rect x='10' y='58' width='760' height='68' rx='0' fill='none' stroke='#4C1D95' stroke-width='2'/><text x='390' y='86' text-anchor='middle' fill='#A78BFA' font-size='15' font-weight='bold'>Leader (pane 0)</text><text x='390' y='110' text-anchor='middle' fill='#6D6D9E' font-size='12'>タスク分解 / 割当 / 進捗管理 / レビュー結果判定</text><rect x='10' y='136' width='375' height='65' fill='#0F172A'/><rect x='10' y='136' width='375' height='65' fill='none' stroke='#1D4ED8' stroke-width='2'/><text x='197' y='162' text-anchor='middle' fill='#60A5FA' font-size='14' font-weight='bold'>Impl-1 (pane 1)</text><text x='197' y='184' text-anchor='middle' fill='#3B5998' font-size='12'>Claude Code — 実装ワーカー</text><rect x='395' y='136' width='375' height='65' fill='#0F172A'/><rect x='395' y='136' width='375' height='65' fill='none' stroke='#1D4ED8' stroke-width='2'/><text x='582' y='162' text-anchor='middle' fill='#60A5FA' font-size='14' font-weight='bold'>Impl-2 (pane 2)</text><text x='582' y='184' text-anchor='middle' fill='#3B5998' font-size='12'>Claude Code — 実装ワーカー</text><rect x='10' y='211' width='375' height='55' fill='#0F2D2A'/><rect x='10' y='211' width='375' height='55' fill='none' stroke='#065F46' stroke-width='2'/><text x='197' y='235' text-anchor='middle' fill='#34D399' font-size='14' font-weight='bold'>Review-1 (pane 3)</text><text x='197' y='255' text-anchor='middle' fill='#6EE7B7' font-size='12'>Codex — コードレビュー</text><rect x='395' y='211' width='375' height='55' fill='#0F2D2A'/><rect x='395' y='211' width='375' height='55' fill='none' stroke='#065F46' stroke-width='2'/><text x='582' y='235' text-anchor='middle' fill='#34D399' font-size='14' font-weight='bold'>Review-2 (pane 4)</text><text x='582' y='255' text-anchor='middle' fill='#6EE7B7' font-size='12'>Codex — コードレビュー</text></svg>


---

# /validate — スキーマ検証

> *スキーマ検証と品質チェックを事前実行し本番環境での障害を未然に防ぐ*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">/validate — スキーマ検証パイプライン</text>
  <rect x="60" y="65" width="680" height="200" fill="#16213e" rx="8"/>
  <text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="bold">バリデーション対象と検証内容</text>
  
      <rect x="80" y="100" width="300" height="150" fill="#1a1a2e" rx="6"/>
      <text x="230" y="122" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold" font-family="monospace">slides-data.json</text>
      
        <text x="95" y="144" fill="#ffffff" font-size="11" opacity="0.8">✓ content フィールドの存在確認</text>
      
        <text x="95" y="172" fill="#ffffff" font-size="11" opacity="0.8">✓ layout 値の列挙型チェック</text>
      
        <text x="95" y="200" fill="#ffffff" font-size="11" opacity="0.8">✓ SVG url(#id) 禁止パターン検出</text>
      
    
      <rect x="420" y="100" width="300" height="150" fill="#1a1a2e" rx="6"/>
      <text x="570" y="122" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="monospace">slides.config.yaml</text>
      
        <text x="435" y="144" fill="#ffffff" font-size="11" opacity="0.8">✓ output.dir フルパス確認</text>
      
        <text x="435" y="172" fill="#ffffff" font-size="11" opacity="0.8">✓ marp.theme 値の妥当性</text>
      
        <text x="435" y="200" fill="#ffffff" font-size="11" opacity="0.8">✓ 必須フィールドの存在確認</text>
      
    
  <rect x="60" y="285" width="680" height="75" fill="#16213e" rx="8"/>
  <text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">自動修正オプション</text>
  <text x="400" y="333" text-anchor="middle" fill="#ffffff" font-size="13">bun run fix — 一般的なスキーマ問題を自動修正</text>
  <text x="400" y="352" text-anchor="middle" fill="#ffffff" font-size="13">bun scripts/fix-svg-url-refs.ts — SVG url(#id) 違反を一括修正</text>
</svg>
- **目的**: スライドデータと設定ファイルの事前品質チェック
- **入力**: `slides-data.json` + `slides.config.yaml`
- **検証内容**: フィールド名・型・enum値・必須項目
- **自動修正**: `bun run fix` で一般的なエラーを自動修正
- **PostToolUse フック**: `slides-data.json` 書き込み時に自動実行
- **適用場面**: 生成後・レンダリング前の品質ゲートとして必須


---

# 全スキル比較マトリクス

- <svg viewBox='0 0 760 285' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='360' height='80' rx='8' fill='#3B0764'/><text x='190' y='38' text-anchor='middle' fill='#C4B5FD' font-size='14' font-weight='bold'>/create-slides</text><text x='190' y='58' text-anchor='middle' fill='white' font-size='12'>プレゼン自動作成（8フェーズ）</text><text x='190' y='76' text-anchor='middle' fill='#A78BFA' font-size='11'>対話型 | HTML/PDF出力 | 90%削減</text><rect x='390' y='10' width='360' height='80' rx='8' fill='#1E3A8A'/><text x='570' y='38' text-anchor='middle' fill='#BFDBFE' font-size='14' font-weight='bold'>/generate</text><text x='570' y='58' text-anchor='middle' fill='white' font-size='12'>JSON → Marp → HTML 高速変換</text><text x='570' y='76' text-anchor='middle' fill='#60A5FA' font-size='11'>非対話 | 量産向け | 高速</text><rect x='10' y='103' width='360' height='80' rx='8' fill='#064E3B'/><text x='190' y='131' text-anchor='middle' fill='#A7F3D0' font-size='14' font-weight='bold'>/review-slides</text><text x='190' y='151' text-anchor='middle' fill='white' font-size='12'>スライドレビュー・改善提案</text><text x='190' y='169' text-anchor='middle' fill='#34D399' font-size='11'>品質向上 | 既存MD対応</text><rect x='390' y='103' width='360' height='80' rx='8' fill='#7C2D12'/><text x='570' y='131' text-anchor='middle' fill='#FED7AA' font-size='14' font-weight='bold'>/ship</text><text x='570' y='151' text-anchor='middle' fill='white' font-size='12'>Git: Stage → Commit → Push</text><text x='570' y='169' text-anchor='middle' fill='#FB923C' font-size='11'>一括操作 | AIメッセージ生成</text><rect x='10' y='196' width='360' height='80' rx='8' fill='#1F2937'/><rect x='10' y='196' width='360' height='80' rx='8' fill='none' stroke='#4B5563' stroke-width='1.5'/><text x='190' y='224' text-anchor='middle' fill='#E5E7EB' font-size='14' font-weight='bold'>/agent-teams</text><text x='190' y='244' text-anchor='middle' fill='white' font-size='12'>Claude + Codex 並列実行</text><text x='190' y='262' text-anchor='middle' fill='#9CA3AF' font-size='11'>tmux | 大規模タスク | 2-4倍速</text><rect x='390' y='196' width='360' height='80' rx='8' fill='#14532D'/><text x='570' y='224' text-anchor='middle' fill='#BBF7D0' font-size='14' font-weight='bold'>/validate</text><text x='570' y='244' text-anchor='middle' fill='white' font-size='12'>スキーマ検証・エラー検出</text><text x='570' y='262' text-anchor='middle' fill='#4ADE80' font-size='11'>自動修正 | 品質ゲート</text></svg>


---

# スキル選択ガイド

> *ユースケース別スキル選択マトリクスで適切なスキルを即座に判断できる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキル選択ガイド — ユースケース別</text>
  
      <rect x="60" y="65" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="75" y="91" fill="#ffffff" font-size="13" opacity="0.8">スライドを作りたい</text>
      <polygon points="230,103 220,97 220,109" fill="#2196f3" opacity="0.7"/>
      <line x1="75" y1="103" x2="218" y2="103" stroke="#2196f3" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="75" y="111" width="310" height="22" fill="#2196f3" opacity="0.2" rx="4"/>
      <text x="230" y="127" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold" font-family="monospace">/create-slides</text>
    
      <rect x="430" y="65" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="445" y="91" fill="#ffffff" font-size="13" opacity="0.8">コードをレビューしたい</text>
      <polygon points="600,103 590,97 590,109" fill="#4caf50" opacity="0.7"/>
      <line x1="445" y1="103" x2="588" y2="103" stroke="#4caf50" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="445" y="111" width="310" height="22" fill="#4caf50" opacity="0.2" rx="4"/>
      <text x="600" y="127" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold" font-family="monospace">/generate + /ship</text>
    
      <rect x="60" y="155" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="75" y="181" fill="#ffffff" font-size="13" opacity="0.8">ドキュメントを整備したい</text>
      <polygon points="230,193 220,187 220,199" fill="#f9a825" opacity="0.7"/>
      <line x1="75" y1="193" x2="218" y2="193" stroke="#f9a825" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="75" y="201" width="310" height="22" fill="#f9a825" opacity="0.2" rx="4"/>
      <text x="230" y="217" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold" font-family="monospace">/generate</text>
    
      <rect x="430" y="155" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="445" y="181" fill="#ffffff" font-size="13" opacity="0.8">品質チェックをしたい</text>
      <polygon points="600,193 590,187 590,199" fill="#ff9800" opacity="0.7"/>
      <line x1="445" y1="193" x2="588" y2="193" stroke="#ff9800" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="445" y="201" width="310" height="22" fill="#ff9800" opacity="0.2" rx="4"/>
      <text x="600" y="217" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold" font-family="monospace">/validate + /review-slides</text>
    
      <rect x="60" y="245" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="75" y="271" fill="#ffffff" font-size="13" opacity="0.8">複数タスクを並列実行したい</text>
      <polygon points="230,283 220,277 220,289" fill="#e91e63" opacity="0.7"/>
      <line x1="75" y1="283" x2="218" y2="283" stroke="#e91e63" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="75" y="291" width="310" height="22" fill="#e91e63" opacity="0.2" rx="4"/>
      <text x="230" y="307" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold" font-family="monospace">/agent-teams</text>
    
      <rect x="430" y="245" width="340" height="75" fill="#16213e" rx="8"/>
      <text x="445" y="271" fill="#ffffff" font-size="13" opacity="0.8">変更をコミット・PRしたい</text>
      <polygon points="600,283 590,277 590,289" fill="#9c27b0" opacity="0.7"/>
      <line x1="445" y1="283" x2="588" y2="283" stroke="#9c27b0" stroke-width="1" opacity="0.5" stroke-dasharray="4,3"/>
      <rect x="445" y="291" width="310" height="22" fill="#9c27b0" opacity="0.2" rx="4"/>
      <text x="600" y="307" text-anchor="middle" fill="#9c27b0" font-size="13" font-weight="bold" font-family="monospace">/ship</text>
    
</svg>
- **新規プレゼン作成**: `/create-slides`（対話型・品質重視）
- **既存テンプレートから量産**: `/generate`（高速・非対話）
- **作成済みスライドの改善**: `/review-slides`
- **作業完了後のコミット**: `/ship`
- **大規模・複数ファイル並列処理**: `/agent-teams`
- **データ品質チェック**: `/validate`（他スキル実行前に使用）


---

<!-- _class: lead -->
# 実践ユースケース

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">実践ユースケース 5選</text>
  
      <rect x="60" y="60" width="680" height="48" fill="#16213e" rx="6"/>
      <rect x="60" y="60" width="8" height="48" fill="#2196f3" rx="3"/>
      <text x="82" y="80" fill="#2196f3" font-size="13" font-weight="bold">UC1</text>
      <text x="130" y="80" fill="#ffffff" font-size="13">技術資料の自動作成</text>
      <rect x="400" y="72" width="332" height="20" fill="#2196f3" opacity="0.4" rx="3"/>
      <text x="740" y="86" fill="#2196f3" font-size="13" font-weight="bold">83% 削減</text>
      <text x="130" y="98" fill="#ffffff" font-size="11" opacity="0.6">90分 → 15分</text>
    
      <rect x="60" y="118" width="680" height="48" fill="#16213e" rx="6"/>
      <rect x="60" y="118" width="8" height="48" fill="#4caf50" rx="3"/>
      <text x="82" y="138" fill="#4caf50" font-size="13" font-weight="bold">UC2</text>
      <text x="130" y="138" fill="#ffffff" font-size="13">並列コードレビュー</text>
      <rect x="400" y="130" width="332" height="20" fill="#4caf50" opacity="0.4" rx="3"/>
      <text x="740" y="144" fill="#4caf50" font-size="13" font-weight="bold">83% 削減</text>
      <text x="130" y="156" fill="#ffffff" font-size="11" opacity="0.6">120分 → 20分</text>
    
      <rect x="60" y="176" width="680" height="48" fill="#16213e" rx="6"/>
      <rect x="60" y="176" width="8" height="48" fill="#f9a825" rx="3"/>
      <text x="82" y="196" fill="#f9a825" font-size="13" font-weight="bold">UC3</text>
      <text x="130" y="196" fill="#ffffff" font-size="13">ドキュメント自動整備</text>
      <rect x="400" y="188" width="376" height="20" fill="#f9a825" opacity="0.4" rx="3"/>
      <text x="784" y="202" fill="#f9a825" font-size="13" font-weight="bold">94% 削減</text>
      <text x="130" y="214" fill="#ffffff" font-size="11" opacity="0.6">2日 → 2時間</text>
    
      <rect x="60" y="234" width="680" height="48" fill="#16213e" rx="6"/>
      <rect x="60" y="234" width="8" height="48" fill="#ff9800" rx="3"/>
      <text x="82" y="254" fill="#ff9800" font-size="13" font-weight="bold">UC4</text>
      <text x="130" y="254" fill="#ffffff" font-size="13">オンボーディング加速</text>
      <rect x="400" y="246" width="344" height="20" fill="#ff9800" opacity="0.4" rx="3"/>
      <text x="752" y="260" fill="#ff9800" font-size="13" font-weight="bold">86% 削減</text>
      <text x="130" y="272" fill="#ffffff" font-size="11" opacity="0.6">1週間 → 1日</text>
    
      <rect x="60" y="292" width="680" height="48" fill="#16213e" rx="6"/>
      <rect x="60" y="292" width="8" height="48" fill="#e91e63" rx="3"/>
      <text x="82" y="312" fill="#e91e63" font-size="13" font-weight="bold">UC5</text>
      <text x="130" y="312" fill="#ffffff" font-size="13">週次レポート自動生成</text>
      <rect x="400" y="304" width="350" height="20" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="758" y="318" fill="#e91e63" font-size="13" font-weight="bold">87.5% 削減</text>
      <text x="130" y="330" fill="#ffffff" font-size="11" opacity="0.6">4時間 → 30分</text>
    
</svg>


---

# 5つのユースケース概要

- <svg viewBox='0 0 780 165' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='140' height='145' rx='10' fill='#4C1D95'/><rect x='10' y='10' width='140' height='42' rx='10' fill='#6D28D9'/><rect x='10' y='30' width='140' height='22' fill='#6D28D9'/><text x='80' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>01</text><text x='80' y='78' text-anchor='middle' fill='#DDD6FE' font-size='13' font-weight='bold'>プレゼン</text><text x='80' y='98' text-anchor='middle' fill='#C4B5FD' font-size='11'>資料自動作成</text><text x='80' y='118' text-anchor='middle' fill='#A78BFA' font-size='12' font-weight='bold'>-90%</text><text x='80' y='140' text-anchor='middle' fill='#8B5CF6' font-size='10'>/create-slides</text><rect x='160' y='10' width='140' height='145' rx='10' fill='#1E3A8A'/><rect x='160' y='10' width='140' height='42' rx='10' fill='#2563EB'/><rect x='160' y='30' width='140' height='22' fill='#2563EB'/><text x='230' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>02</text><text x='230' y='78' text-anchor='middle' fill='#BFDBFE' font-size='13' font-weight='bold'>並列開発</text><text x='230' y='98' text-anchor='middle' fill='#93C5FD' font-size='11'>コードレビュー</text><text x='230' y='118' text-anchor='middle' fill='#60A5FA' font-size='12' font-weight='bold'>-75%</text><text x='230' y='140' text-anchor='middle' fill='#3B82F6' font-size='10'>/agent-teams</text><rect x='310' y='10' width='140' height='145' rx='10' fill='#064E3B'/><rect x='310' y='10' width='140' height='42' rx='10' fill='#059669'/><rect x='310' y='30' width='140' height='22' fill='#059669'/><text x='380' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>03</text><text x='380' y='78' text-anchor='middle' fill='#A7F3D0' font-size='13' font-weight='bold'>ドキュメント</text><text x='380' y='98' text-anchor='middle' fill='#6EE7B7' font-size='11'>自動整備</text><text x='380' y='118' text-anchor='middle' fill='#34D399' font-size='12' font-weight='bold'>大幅削減</text><text x='380' y='140' text-anchor='middle' fill='#10B981' font-size='10'>カスタムスキル</text><rect x='460' y='10' width='140' height='145' rx='10' fill='#78350F'/><rect x='460' y='10' width='140' height='42' rx='10' fill='#D97706'/><rect x='460' y='30' width='140' height='22' fill='#D97706'/><text x='530' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>04</text><text x='530' y='78' text-anchor='middle' fill='#FDE68A' font-size='13' font-weight='bold'>オンボーディング</text><text x='530' y='98' text-anchor='middle' fill='#FCD34D' font-size='11'>加速</text><text x='530' y='118' text-anchor='middle' fill='#FBBF24' font-size='12' font-weight='bold'>-60%</text><text x='530' y='140' text-anchor='middle' fill='#F59E0B' font-size='10'>カスタムスキル</text><rect x='610' y='10' width='140' height='145' rx='10' fill='#1F2937'/><rect x='610' y='10' width='140' height='42' rx='10' fill='#4B5563'/><rect x='610' y='30' width='140' height='22' fill='#4B5563'/><text x='680' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>05</text><text x='680' y='78' text-anchor='middle' fill='#E5E7EB' font-size='13' font-weight='bold'>進捗レポート</text><text x='680' y='98' text-anchor='middle' fill='#D1D5DB' font-size='11'>自動生成</text><text x='680' y='118' text-anchor='middle' fill='#9CA3AF' font-size='12' font-weight='bold'>-83%</text><text x='680' y='140' text-anchor='middle' fill='#6B7280' font-size='10'>カスタムスキル</text></svg>


---

# UC1: 技術資料の自動作成

> *毎週3〜5時間の技術資料作成を30分に削減しチーム全員が高品質を維持する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC1: 技術資料の自動作成 — 作業フロー比較</text>
  <rect x="60" y="60" width="320" height="280" fill="#16213e" rx="8"/>
  <text x="220" y="88" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">Before（手動）</text>
  
      <rect x="80" y="105" width="60" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="145" y="122" fill="#ffffff" font-size="11">30分</text>
      <text x="80" y="100" fill="#ffffff" font-size="10" opacity="0.7">要件定義・構成検討</text>
    
      <rect x="80" y="142" width="60" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="145" y="159" fill="#ffffff" font-size="11">30分</text>
      <text x="80" y="137" fill="#ffffff" font-size="10" opacity="0.7">スライド構成作成</text>
    
      <rect x="80" y="179" width="120" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="205" y="196" fill="#ffffff" font-size="11">60分</text>
      <text x="80" y="174" fill="#ffffff" font-size="10" opacity="0.7">コンテンツ執筆</text>
    
      <rect x="80" y="216" width="40" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="125" y="233" fill="#ffffff" font-size="11">20分</text>
      <text x="80" y="211" fill="#ffffff" font-size="10" opacity="0.7">デザイン調整</text>
    
      <rect x="80" y="253" width="60" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="145" y="270" fill="#ffffff" font-size="11">30分</text>
      <text x="80" y="248" fill="#ffffff" font-size="10" opacity="0.7">レビュー・修正</text>
    
      <rect x="80" y="290" width="20" height="24" fill="#e91e63" opacity="0.5" rx="3"/>
      <text x="105" y="307" fill="#ffffff" font-size="11">10分</text>
      <text x="80" y="285" fill="#ffffff" font-size="10" opacity="0.7">エクスポート・配布</text>
    
  <text x="220" y="330" text-anchor="middle" fill="#e91e63" font-size="14">合計: 約 180分</text>
  <rect x="420" y="60" width="320" height="280" fill="#16213e" rx="8"/>
  <text x="580" y="88" text-anchor="middle" fill="#4caf50" font-size="15" font-weight="bold">After（/create-slides）</text>
  
      <rect x="440" y="105" width="2" height="24" fill="#4caf50" opacity="0.6" rx="3"/>
      <text x="447" y="122" fill="#ffffff" font-size="11">1分</text>
      <text x="440" y="100" fill="#ffffff" font-size="10" opacity="0.7">スキル呼び出し</text>
    
      <rect x="440" y="142" width="6" height="24" fill="#4caf50" opacity="0.6" rx="3"/>
      <text x="451" y="159" fill="#ffffff" font-size="11">3分</text>
      <text x="440" y="137" fill="#ffffff" font-size="10" opacity="0.7">ヒアリング回答</text>
    
      <rect x="440" y="179" width="16" height="24" fill="#4caf50" opacity="0.6" rx="3"/>
      <text x="461" y="196" fill="#ffffff" font-size="11">8分</text>
      <text x="440" y="174" fill="#ffffff" font-size="10" opacity="0.7">生成中（待機）</text>
    
      <rect x="440" y="216" width="6" height="24" fill="#4caf50" opacity="0.6" rx="3"/>
      <text x="451" y="233" fill="#ffffff" font-size="11">3分</text>
      <text x="440" y="211" fill="#ffffff" font-size="10" opacity="0.7">確認・微調整</text>
    
  <text x="580" y="330" text-anchor="middle" fill="#4caf50" font-size="14">合計: 約 15分</text>
</svg>
- **シナリオ**: 毎週の技術共有会・社内勉強会のスライドを効率化
- **従来の課題**: 資料作成に毎回 **3〜5時間** を要していた
- **解決策**: `/create-slides` で対話型生成
- **手順**: ① `/create-slides` 起動 → ② トピック・対象者・時間を回答 → ③ 生成スライドをレビュー
- **月次換算**: 4回/月 × 12ヶ月 = 年48回の効率化
- **年間削減**: 約 **200時間**（エンジニア1名分の稼働に相当）


---

# UC1: 導入効果の数値

> *作業時間90%削減・品質スコア38点向上・学習効果30%増が3つの定量効果*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC1: 技術資料作成の導入効果</text>
  
      <rect x="60" y="75" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="75" width="8" height="58" fill="#2196f3" rx="4"/>
      <text x="85" y="97" fill="#2196f3" font-size="13" font-weight="bold">作業時間</text>
      <text x="230" y="97" fill="#e91e63" font-size="13">180分</text>
      <polygon points="320,93 340,87 340,99" fill="#4caf50" opacity="0.7"/>
      <line x1="310" y1="93" x2="338" y2="93" stroke="#4caf50" stroke-width="2" opacity="0.7"/>
      <text x="360" y="97" fill="#4caf50" font-size="13">15分</text>
      <rect x="590" y="83" width="130" height="28" fill="#2196f3" opacity="0.2" rx="4"/>
      <text x="655" y="102" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">91%削減</text>
    
      <rect x="60" y="145" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="145" width="8" height="58" fill="#4caf50" rx="4"/>
      <text x="85" y="167" fill="#4caf50" font-size="13" font-weight="bold">スライド品質</text>
      <text x="230" y="167" fill="#e91e63" font-size="13">担当者依存</text>
      <polygon points="320,163 340,157 340,169" fill="#4caf50" opacity="0.7"/>
      <line x1="310" y1="163" x2="338" y2="163" stroke="#4caf50" stroke-width="2" opacity="0.7"/>
      <text x="360" y="167" fill="#4caf50" font-size="13">一定水準保証</text>
      <rect x="590" y="153" width="130" height="28" fill="#4caf50" opacity="0.2" rx="4"/>
      <text x="655" y="172" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">標準化</text>
    
      <rect x="60" y="215" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="215" width="8" height="58" fill="#f9a825" rx="4"/>
      <text x="85" y="237" fill="#f9a825" font-size="13" font-weight="bold">SVG図表率</text>
      <text x="230" y="237" fill="#e91e63" font-size="13">10〜20%</text>
      <polygon points="320,233 340,227 340,239" fill="#4caf50" opacity="0.7"/>
      <line x1="310" y1="233" x2="338" y2="233" stroke="#4caf50" stroke-width="2" opacity="0.7"/>
      <text x="360" y="237" fill="#4caf50" font-size="13">50%以上</text>
      <rect x="590" y="223" width="130" height="28" fill="#f9a825" opacity="0.2" rx="4"/>
      <text x="655" y="242" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">+30%以上</text>
    
      <rect x="60" y="285" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="285" width="8" height="58" fill="#ff9800" rx="4"/>
      <text x="85" y="307" fill="#ff9800" font-size="13" font-weight="bold">再現性</text>
      <text x="230" y="307" fill="#e91e63" font-size="13">属人的手順</text>
      <polygon points="320,303 340,297 340,309" fill="#4caf50" opacity="0.7"/>
      <line x1="310" y1="303" x2="338" y2="303" stroke="#4caf50" stroke-width="2" opacity="0.7"/>
      <text x="360" y="307" fill="#4caf50" font-size="13">完全再現可能</text>
      <rect x="590" y="293" width="130" height="28" fill="#ff9800" opacity="0.2" rx="4"/>
      <text x="655" y="312" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold">100%</text>
    
</svg>
- **作業時間**: 3〜5時間 → 30〜45分（**90%削減**）
- **品質向上**: アウトライン確認 + フィードバックループで反復改善
- **副次効果**: 登壇のハードルが下がりチーム全員が発表に参加
- **スケール**: 月4回の勉強会すべてに適用で年200時間節約
- **ROI**: ツール習得 2時間 → 初回から元が取れる


---

# UC2: 並列コードレビュー・リファクタリング

> *20ファイル超のリファクタリングを並列エージェントで大幅に短縮できる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC2: 並列コードレビュー・リファクタリング</text>
  <rect x="300" y="60" width="200" height="44" fill="#2196f3" rx="6"/>
  <text x="400" y="87" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">/agent-teams 起動</text>
  <polygon points="400,118 406,107 394,107" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="104" x2="400" y2="116" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  
      <rect x="25" y="120" width="110" height="60" fill="#2196f3" opacity="0.25" rx="6"/>
      <text x="80" y="144" text-anchor="middle" fill="#ffffff" font-size="12">Worker 1</text><text x="80" y="162" text-anchor="middle" fill="#ffffff" font-size="12">src/api/</text>
      <line x1="80" y1="118" x2="80" y2="103" stroke="#2196f3" stroke-width="1" opacity="0.6"/>
    
      <rect x="185" y="120" width="110" height="60" fill="#4caf50" opacity="0.25" rx="6"/>
      <text x="240" y="144" text-anchor="middle" fill="#ffffff" font-size="12">Worker 2</text><text x="240" y="162" text-anchor="middle" fill="#ffffff" font-size="12">src/ui/</text>
      <line x1="240" y1="118" x2="240" y2="103" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
    
      <rect x="345" y="120" width="110" height="60" fill="#f9a825" opacity="0.25" rx="6"/>
      <text x="400" y="144" text-anchor="middle" fill="#ffffff" font-size="12">Worker 3</text><text x="400" y="162" text-anchor="middle" fill="#ffffff" font-size="12">src/utils/</text>
      <line x1="400" y1="118" x2="400" y2="103" stroke="#f9a825" stroke-width="1" opacity="0.6"/>
    
      <rect x="505" y="120" width="110" height="60" fill="#ff9800" opacity="0.25" rx="6"/>
      <text x="560" y="144" text-anchor="middle" fill="#ffffff" font-size="12">Worker 4</text><text x="560" y="162" text-anchor="middle" fill="#ffffff" font-size="12">tests/</text>
      <line x1="560" y1="118" x2="560" y2="103" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
    
      <rect x="665" y="120" width="110" height="60" fill="#e91e63" opacity="0.25" rx="6"/>
      <text x="720" y="144" text-anchor="middle" fill="#ffffff" font-size="12">Worker 5</text><text x="720" y="162" text-anchor="middle" fill="#ffffff" font-size="12">docs/</text>
      <line x1="720" y1="118" x2="720" y2="103" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
    
  <line x1="400" y1="180" x2="80" y2="215" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <line x1="400" y1="180" x2="240" y2="215" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <line x1="400" y1="180" x2="400" y2="215" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <line x1="400" y1="180" x2="560" y2="215" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <line x1="400" y1="180" x2="720" y2="215" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
  <text x="400" y="210" text-anchor="middle" fill="#ffffff" font-size="11" opacity="0.5">並列実行（同時）</text>
  <rect x="150" y="225" width="500" height="40" fill="#16213e" rx="6"/>
  <text x="400" y="250" text-anchor="middle" fill="#4caf50" font-size="14">全Worker完了 → 結果をマージ</text>
  <rect x="100" y="285" width="600" height="70" fill="#16213e" rx="8"/>
  <text x="400" y="308" text-anchor="middle" fill="#ffffff" font-size="13">各Worker は独立したファイルセットのみ操作（競合防止）</text>
  <text x="400" y="330" text-anchor="middle" fill="#f9a825" font-size="13">120分 → 20分（6倍高速化）</text>
</svg>
- **シナリオ**: 大規模リファクタリング（20ファイル以上）を効率化
- **従来の課題**: 順次処理で **3日** かかる作業
- **解決策**: `/agent-teams` で並列分散処理
- **手順**: ① Leader がファイルをタスク分割 → ② 実装ワーカーが並列リファクタリング → ③ Codex レビューワーが自動コードレビュー
- **タスク管理**: `.agent-teams/` の JSON で進捗を可視化
- **リスク低減**: 各タスクが独立したファイルセットで競合なし


---

# UC2: 導入効果 — 時間比較

- <svg viewBox='0 0 760 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='380' y='25' text-anchor='middle' fill='#D1D5DB' font-size='14' font-weight='bold'>導入前後の作業時間比較</text><text x='55' y='58' text-anchor='end' fill='#9CA3AF' font-size='11'>並列開発</text><text x='55' y='93' text-anchor='end' fill='#9CA3AF' font-size='11'>プレゼン</text><text x='55' y='128' text-anchor='end' fill='#9CA3AF' font-size='11'>ドキュメント</text><text x='55' y='163' text-anchor='end' fill='#9CA3AF' font-size='11'>レポート</text><rect x='60' y='42' width='580' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='648' y='57' fill='#FCA5A5' font-size='11'>3日</text><rect x='60' y='77' width='380' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='448' y='92' fill='#FCA5A5' font-size='11'>5時間</text><rect x='60' y='112' width='340' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='408' y='127' fill='#FCA5A5' font-size='11'>100時間</text><rect x='60' y='147' width='175' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='243' y='162' fill='#FCA5A5' font-size='11'>30分</text><rect x='60' y='42' width='145' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='210' y='57' fill='#6EE7B7' font-size='11'>8時間(-75%)</text><rect x='60' y='77' width='38' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='103' y='92' fill='#6EE7B7' font-size='11'>45分(-90%)</text><rect x='60' y='112' width='35' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='100' y='127' fill='#6EE7B7' font-size='11'>半日(-96%)</text><rect x='60' y='147' width='18' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='82' y='162' fill='#6EE7B7' font-size='11'>5分(-83%)</text><rect x='540' y='150' width='14' height='14' rx='2' fill='#EF4444'/><text x='558' y='161' fill='#FCA5A5' font-size='11'>導入前</text><rect x='620' y='150' width='14' height='14' rx='2' fill='#10B981'/><text x='638' y='161' fill='#6EE7B7' font-size='11'>導入後</text></svg>


---

# UC3: ドキュメント自動整備

> *100ファイルのドキュメント整備を半日で完了し技術的負債を一気に解消する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC3: ドキュメント自動整備フロー</text>
  
      <rect x="60" y="80" width="130" height="65" fill="#2196f3" opacity="0.25" rx="8"/>
      <text x="125" y="106" text-anchor="middle" fill="#ffffff" font-size="12">既存コード</text><text x="125" y="126" text-anchor="middle" fill="#ffffff" font-size="12">スキャン</text>
    
      <rect x="220" y="80" width="130" height="65" fill="#f9a825" opacity="0.25" rx="8"/>
      <text x="285" y="106" text-anchor="middle" fill="#ffffff" font-size="12">API抽出</text><text x="285" y="126" text-anchor="middle" fill="#ffffff" font-size="12">関数・型一覧</text>
    
      <rect x="380" y="80" width="130" height="65" fill="#4caf50" opacity="0.25" rx="8"/>
      <text x="445" y="106" text-anchor="middle" fill="#ffffff" font-size="12">README</text><text x="445" y="126" text-anchor="middle" fill="#ffffff" font-size="12">自動生成</text>
    
      <rect x="540" y="80" width="130" height="65" fill="#ff9800" opacity="0.25" rx="8"/>
      <text x="605" y="106" text-anchor="middle" fill="#ffffff" font-size="12">CHANGELOG</text><text x="605" y="126" text-anchor="middle" fill="#ffffff" font-size="12">更新</text>
    
      <rect x="700" y="80" width="130" height="65" fill="#e91e63" opacity="0.25" rx="8"/>
      <text x="765" y="106" text-anchor="middle" fill="#ffffff" font-size="12">PR作成</text><text x="765" y="126" text-anchor="middle" fill="#ffffff" font-size="12">(/ship)</text>
    
  
    <polygon points="210,112 220,107 220,117" fill="#ffffff" opacity="0.5"/>
    <line x1="200" y1="112" x2="208" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="370,112 380,107 380,117" fill="#ffffff" opacity="0.5"/>
    <line x1="360" y1="112" x2="368" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="530,112 540,107 540,117" fill="#ffffff" opacity="0.5"/>
    <line x1="520" y1="112" x2="528" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="690,112 700,107 700,117" fill="#ffffff" opacity="0.5"/>
    <line x1="680" y1="112" x2="688" y2="112" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <rect x="60" y="175" width="680" height="185" fill="#16213e" rx="8"/>
  <text x="400" y="200" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">ドキュメント整備チェックリスト</text>
  
      <rect x="80" y="215" width="190" height="130" fill="#1a1a2e" rx="6"/>
      <text x="175" y="234" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">README.md</text>
      <text x="92" y="254" fill="#ffffff" font-size="11" opacity="0.8">✓ インストール手順</text><text x="92" y="278" fill="#ffffff" font-size="11" opacity="0.8">✓ 使用方法・例</text><text x="92" y="302" fill="#ffffff" font-size="11" opacity="0.8">✓ API概要</text>
    
      <rect x="300" y="215" width="190" height="130" fill="#1a1a2e" rx="6"/>
      <text x="395" y="234" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">API Doc</text>
      <text x="312" y="254" fill="#ffffff" font-size="11" opacity="0.8">✓ 関数シグネチャ</text><text x="312" y="278" fill="#ffffff" font-size="11" opacity="0.8">✓ パラメータ説明</text><text x="312" y="302" fill="#ffffff" font-size="11" opacity="0.8">✓ 戻り値・例外</text>
    
      <rect x="520" y="215" width="190" height="130" fill="#1a1a2e" rx="6"/>
      <text x="615" y="234" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">CHANGELOG</text>
      <text x="532" y="254" fill="#ffffff" font-size="11" opacity="0.8">✓ バージョン別変更点</text><text x="532" y="278" fill="#ffffff" font-size="11" opacity="0.8">✓ Breaking Changes</text><text x="532" y="302" fill="#ffffff" font-size="11" opacity="0.8">✓ マイグレーションガイド</text>
    
</svg>
- **シナリオ**: 放置されているコードドキュメントを一括整備
- **従来の課題**: 100ファイルを手動更新するのは現実的でない
- **解決策**: カスタムスキル `/doc-update` を作成して一括処理
- **処理内容**: ファイル一覧取得 → コード解析 → JSDoc/docstring 自動生成
- **一貫性**: SKILL.md のスタイルガイドで統一フォーマット
- **再実行**: 新機能追加のたびに同スキルで即座に更新


---

# UC3: 導入効果

> *ドキュメント作業時間85%削減・新人理解速度40%向上・保守コスト30%削減*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC3: ドキュメント整備の導入効果</text>
  
      <rect x="60" y="75" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="75" width="8" height="58" fill="#2196f3" rx="4"/>
      <text x="85" y="97" fill="#2196f3" font-size="13" font-weight="bold">整備時間（PRレベル）</text>
      <rect x="350" y="85" width="235" height="18" fill="#2196f3" opacity="0.3" rx="3"/>
      <text x="85" y="117" fill="#ffffff" font-size="12" opacity="0.7">2日 → 2時間</text>
      <text x="630" y="111" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">94%改善</text>
    
      <rect x="60" y="145" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="145" width="8" height="58" fill="#4caf50" rx="4"/>
      <text x="85" y="167" fill="#4caf50" font-size="13" font-weight="bold">ドキュメントカバレッジ</text>
      <rect x="350" y="155" width="270" height="18" fill="#4caf50" opacity="0.3" rx="3"/>
      <text x="85" y="187" fill="#ffffff" font-size="12" opacity="0.7">30〜40% → 90%以上</text>
      <text x="630" y="181" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">150%改善</text>
    
      <rect x="60" y="215" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="215" width="8" height="58" fill="#f9a825" rx="4"/>
      <text x="85" y="237" fill="#f9a825" font-size="13" font-weight="bold">陳腐化リスク</text>
      <rect x="350" y="225" width="200" height="18" fill="#f9a825" opacity="0.3" rx="3"/>
      <text x="85" y="257" fill="#ffffff" font-size="12" opacity="0.7">高（手動更新） → 低（自動更新）</text>
      <text x="630" y="251" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">80%改善</text>
    
      <rect x="60" y="285" width="680" height="58" fill="#16213e" rx="8"/>
      <rect x="60" y="285" width="8" height="58" fill="#ff9800" rx="4"/>
      <text x="85" y="307" fill="#ff9800" font-size="13" font-weight="bold">新規参入コスト</text>
      <rect x="350" y="295" width="175" height="18" fill="#ff9800" opacity="0.3" rx="3"/>
      <text x="85" y="327" fill="#ffffff" font-size="12" opacity="0.7">1週間 → 1〜2日</text>
      <text x="630" y="321" text-anchor="middle" fill="#ff9800" font-size="14" font-weight="bold">70%改善</text>
    
</svg>
- **作業量**: 100ファイル × 1時間 → **半日で完了**
- **チーム便益**: 新メンバーがコードを理解する時間が **50%短縮**
- **再利用**: 初期スキル作成 2時間 → 毎回 10時間以上節約
- **鮮度維持**: スキル再実行でドキュメントを常に最新状態に保持
- **ROI**: 3回実行で投資回収完了


---

# UC4: オンボーディングの加速

> *新入社員が1〜3日でプロジェクト概要を把握できるオンボーディング資料を自動生成*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC4: オンボーディング加速フロー</text>
  <rect x="60" y="65" width="680" height="200" fill="#16213e" rx="8"/>
  
      <rect x="25" y="85" width="130" height="80" fill="#2196f3" opacity="0.2" rx="6"/>
      <text x="90" y="108" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">Day 1</text>
      <text x="90" y="126" text-anchor="middle" fill="#ffffff" font-size="12">環境構築</text><text x="90" y="144" text-anchor="middle" fill="#ffffff" font-size="12">(自動スクリプト)</text>
      <polygon points="170,125 155,120 155,130" fill="#ffffff" opacity="0.4"/>
    
      <rect x="200" y="85" width="130" height="80" fill="#4caf50" opacity="0.2" rx="6"/>
      <text x="265" y="108" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">Day 1-2</text>
      <text x="265" y="126" text-anchor="middle" fill="#ffffff" font-size="12">コードベース</text><text x="265" y="144" text-anchor="middle" fill="#ffffff" font-size="12">ドキュメント読解</text>
      <polygon points="345,125 330,120 330,130" fill="#ffffff" opacity="0.4"/>
    
      <rect x="375" y="85" width="130" height="80" fill="#f9a825" opacity="0.2" rx="6"/>
      <text x="440" y="108" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">Day 2-3</text>
      <text x="440" y="126" text-anchor="middle" fill="#ffffff" font-size="12">初PR提出</text><text x="440" y="144" text-anchor="middle" fill="#ffffff" font-size="12">(スキルガイド付き)</text>
      <polygon points="520,125 505,120 505,130" fill="#ffffff" opacity="0.4"/>
    
      <rect x="550" y="85" width="130" height="80" fill="#ff9800" opacity="0.2" rx="6"/>
      <text x="615" y="108" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">Day 3-5</text>
      <text x="615" y="126" text-anchor="middle" fill="#ffffff" font-size="12">実タスク開始</text><text x="615" y="144" text-anchor="middle" fill="#ffffff" font-size="12">(ペアプロ)</text>
      
    
  <rect x="60" y="285" width="680" height="75" fill="#16213e" rx="8"/>
  <text x="400" y="310" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">スキルが支援するオンボーディング要素</text>
  
    <rect x="80" y="320" width="145" height="28" fill="#2196f3" opacity="0.2" rx="4"/>
    <text x="152" y="339" text-anchor="middle" fill="#2196f3" font-size="12">自動ドキュメント</text>
  
    <rect x="243" y="320" width="145" height="28" fill="#4caf50" opacity="0.2" rx="4"/>
    <text x="315" y="339" text-anchor="middle" fill="#4caf50" font-size="12">スキルデモ環境</text>
  
    <rect x="406" y="320" width="145" height="28" fill="#f9a825" opacity="0.2" rx="4"/>
    <text x="478" y="339" text-anchor="middle" fill="#f9a825" font-size="12">ガイドスライド</text>
  
    <rect x="569" y="320" width="145" height="28" fill="#ff9800" opacity="0.2" rx="4"/>
    <text x="641" y="339" text-anchor="middle" fill="#ff9800" font-size="12">ペアプロスクリプト</text>
  
</svg>
- **シナリオ**: 新入社員が1日でプロジェクト概要を把握できる資料作成
- **従来の課題**: 先輩エンジニアが1〜2週間かけてレクチャー
- **解決策**: カスタムスキル `/onboarding-doc` で資料自動生成
- **生成コンテンツ**: アーキテクチャ図（SVG）・API仕様書・よくあるエラー集
- **資料鮮度**: コード変更時にスキル再実行で自動更新
- **スケール**: 人員増加時も追加コストなし


---

# UC4: 導入効果

> *オンボーディング期間60〜75%短縮し初回コントリビュートまでの期間を4日に短縮*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC4: オンボーディング加速の効果測定</text>
  <rect x="60" y="65" width="340" height="280" fill="#16213e" rx="8"/>
  <text x="230" y="92" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">Before</text>
  
      <rect x="80" y="110" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="95" y="124" fill="#e91e63" font-size="12">初日</text>
      <text x="95" y="138" fill="#ffffff" font-size="11" opacity="0.7">環境構築で半日</text>
    
      <rect x="80" y="154" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="95" y="168" fill="#e91e63" font-size="12">3日目</text>
      <text x="95" y="182" fill="#ffffff" font-size="11" opacity="0.7">コードベース把握中</text>
    
      <rect x="80" y="198" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="95" y="212" fill="#e91e63" font-size="12">1週間</text>
      <text x="95" y="226" fill="#ffffff" font-size="11" opacity="0.7">やっと初PR提出</text>
    
      <rect x="80" y="242" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="95" y="256" fill="#e91e63" font-size="12">2週間</text>
      <text x="95" y="270" fill="#ffffff" font-size="11" opacity="0.7">実タスク開始</text>
    
      <rect x="80" y="286" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="95" y="300" fill="#e91e63" font-size="12">1ヶ月</text>
      <text x="95" y="314" fill="#ffffff" font-size="11" opacity="0.7">ある程度独立</text>
    
  <rect x="420" y="65" width="320" height="280" fill="#16213e" rx="8"/>
  <text x="580" y="92" text-anchor="middle" fill="#4caf50" font-size="15" font-weight="bold">After（スキル活用）</text>
  
      <rect x="440" y="110" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="455" y="124" fill="#4caf50" font-size="12">初日</text>
      <text x="455" y="138" fill="#ffffff" font-size="11" opacity="0.7">環境構築完了</text>
    
      <rect x="440" y="154" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="455" y="168" fill="#4caf50" font-size="12">1日目</text>
      <text x="455" y="182" fill="#ffffff" font-size="11" opacity="0.7">コードベース把握</text>
    
      <rect x="440" y="198" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="455" y="212" fill="#4caf50" font-size="12">2日目</text>
      <text x="455" y="226" fill="#ffffff" font-size="11" opacity="0.7">初PR提出</text>
    
      <rect x="440" y="242" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="455" y="256" fill="#4caf50" font-size="12">3日目</text>
      <text x="455" y="270" fill="#ffffff" font-size="11" opacity="0.7">実タスク開始</text>
    
      <rect x="440" y="286" width="280" height="34" fill="#1a1a2e" rx="4"/>
      <text x="455" y="300" fill="#4caf50" font-size="12">1週間</text>
      <text x="455" y="314" fill="#ffffff" font-size="11" opacity="0.7">完全独立稼働</text>
    
</svg>
- **オンボーディング期間**: 2週間 → 3〜5日（**60〜75%短縮**）
- **先輩負担**: レクチャー時間 20時間 → 5時間（**75%削減**）
- **品質均一化**: 新メンバーの立ち上がりスピードが安定
- **コスト**: 初期スキル作成 4時間 → 以降は追加コストゼロ
- **副次効果**: 先輩が本来の開発業務に集中できる時間が増加


---

# UC5: 週次進捗レポートの自動生成

> *Gitログから週次進捗スライドを自動生成し報告業務を80%削減する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">UC5: 週次進捗レポート自動生成</text>
  <rect x="60" y="65" width="680" height="180" fill="#16213e" rx="8"/>
  <text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">データソース → レポート生成パイプライン</text>
  
      <rect x="20" y="110" width="120" height="60" fill="#2196f3" opacity="0.2" rx="6"/>
      <text x="80" y="135" text-anchor="middle" fill="#ffffff" font-size="11">git log</text><text x="80" y="153" text-anchor="middle" fill="#ffffff" font-size="11">(コミット履歴)</text>
      <polygon points="80,192 74,200 86,200" fill="#2196f3" opacity="0.6"/>
      <line x1="80" y1="170" x2="80" y2="190" stroke="#2196f3" stroke-width="1" opacity="0.6"/>
    
      <rect x="170" y="110" width="120" height="60" fill="#4caf50" opacity="0.2" rx="6"/>
      <text x="230" y="135" text-anchor="middle" fill="#ffffff" font-size="11">GitHub Issues</text><text x="230" y="153" text-anchor="middle" fill="#ffffff" font-size="11">(タスク状況)</text>
      <polygon points="230,192 224,200 236,200" fill="#4caf50" opacity="0.6"/>
      <line x1="230" y1="170" x2="230" y2="190" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
    
      <rect x="320" y="110" width="120" height="60" fill="#f9a825" opacity="0.2" rx="6"/>
      <text x="380" y="135" text-anchor="middle" fill="#ffffff" font-size="11">PR マージ</text><text x="380" y="153" text-anchor="middle" fill="#ffffff" font-size="11">(完了機能)</text>
      <polygon points="380,192 374,200 386,200" fill="#f9a825" opacity="0.6"/>
      <line x1="380" y1="170" x2="380" y2="190" stroke="#f9a825" stroke-width="1" opacity="0.6"/>
    
      <rect x="470" y="110" width="120" height="60" fill="#ff9800" opacity="0.2" rx="6"/>
      <text x="530" y="135" text-anchor="middle" fill="#ffffff" font-size="11">CI/CD</text><text x="530" y="153" text-anchor="middle" fill="#ffffff" font-size="11">(品質指標)</text>
      <polygon points="530,192 524,200 536,200" fill="#ff9800" opacity="0.6"/>
      <line x1="530" y1="170" x2="530" y2="190" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
    
      <rect x="620" y="110" width="120" height="60" fill="#e91e63" opacity="0.2" rx="6"/>
      <text x="680" y="135" text-anchor="middle" fill="#ffffff" font-size="11">Slack/Teams</text><text x="680" y="153" text-anchor="middle" fill="#ffffff" font-size="11">(コミュニケーション)</text>
      <polygon points="680,192 674,200 686,200" fill="#e91e63" opacity="0.6"/>
      <line x1="680" y1="170" x2="680" y2="190" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
    
  <rect x="200" y="210" width="400" height="32" fill="#f9a825" opacity="0.2" rx="6"/>
  <text x="400" y="231" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">週次レポート自動生成スキル</text>
  <rect x="60" y="265" width="680" height="95" fill="#16213e" rx="8"/>
  <text x="400" y="290" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">レポート出力内容</text>
  
      <rect x="35" y="300" width="110" height="48" fill="#4caf50" opacity="0.2" rx="5"/>
      <text x="90" y="318" text-anchor="middle" fill="#ffffff" font-size="11">完了タスク</text><text x="90" y="334" text-anchor="middle" fill="#ffffff" font-size="11">一覧</text>
    
      <rect x="185" y="300" width="110" height="48" fill="#2196f3" opacity="0.2" rx="5"/>
      <text x="240" y="318" text-anchor="middle" fill="#ffffff" font-size="11">進捗率</text><text x="240" y="334" text-anchor="middle" fill="#ffffff" font-size="11">可視化</text>
    
      <rect x="335" y="300" width="110" height="48" fill="#e91e63" opacity="0.2" rx="5"/>
      <text x="390" y="318" text-anchor="middle" fill="#ffffff" font-size="11">ブロッカー</text><text x="390" y="334" text-anchor="middle" fill="#ffffff" font-size="11">整理</text>
    
      <rect x="485" y="300" width="110" height="48" fill="#f9a825" opacity="0.2" rx="5"/>
      <text x="540" y="318" text-anchor="middle" fill="#ffffff" font-size="11">来週計画</text><text x="540" y="334" text-anchor="middle" fill="#ffffff" font-size="11">提案</text>
    
      <rect x="635" y="300" width="110" height="48" fill="#ff9800" opacity="0.2" rx="5"/>
      <text x="690" y="318" text-anchor="middle" fill="#ffffff" font-size="11">KPI</text><text x="690" y="334" text-anchor="middle" fill="#ffffff" font-size="11">ダッシュボード</text>
    
</svg>
- **シナリオ**: 週次の進捗報告スライドを Git ログから自動生成
- **解決策**: カスタムスキル `/weekly-report`
- **処理内容**: Git ログ解析 → 完了タスク抽出 → スライド自動生成
- **効果**: 30分のレポート作成 → 5分（**83%削減**）
- **データ精度**: 人手集計より正確（コミットから直接抽出）
- **展開**: Sprint Review・Stakeholder レポートに活用


---

<!-- _class: lead -->
# カスタムスキル作成ガイドライン

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">カスタムスキル作成 — 判断基準</text>
  <rect x="60" y="65" width="680" height="140" fill="#16213e" rx="8"/>
  <text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">スキル化すべきワークフローの条件</text>
  
      <rect x="80" y="105" width="600" height="24" fill="#1a1a2e" rx="3"/>
      <text x="100" y="121" fill="#4caf50" font-size="14">✓</text>
      <text x="125" y="121" fill="#ffffff" font-size="12" font-weight="bold">繰り返し実行する</text>
      <text x="350" y="121" fill="#ffffff" font-size="11" opacity="0.7">週1回以上、または3人以上が実行する処理</text>
    
      <rect x="80" y="135" width="600" height="24" fill="#1a1a2e" rx="3"/>
      <text x="100" y="151" fill="#4caf50" font-size="14">✓</text>
      <text x="125" y="151" fill="#ffffff" font-size="12" font-weight="bold">手順が複数ステップある</text>
      <text x="350" y="151" fill="#ffffff" font-size="11" opacity="0.7">3フェーズ以上、かつ各フェーズに判断が含まれる</text>
    
      <rect x="80" y="165" width="600" height="24" fill="#1a1a2e" rx="3"/>
      <text x="100" y="181" fill="#4caf50" font-size="14">✓</text>
      <text x="125" y="181" fill="#ffffff" font-size="12" font-weight="bold">品質を標準化したい</text>
      <text x="350" y="181" fill="#ffffff" font-size="11" opacity="0.7">担当者によって結果が変わってはいけない処理</text>
    
      <rect x="80" y="195" width="600" height="24" fill="#1a1a2e" rx="3"/>
      <text x="100" y="211" fill="#e91e63" font-size="14">✗</text>
      <text x="125" y="211" fill="#888" font-size="12" font-weight="bold">1回だけの処理</text>
      <text x="350" y="211" fill="#ffffff" font-size="11" opacity="0.7">スクリプト化または直接実行で十分</text>
    
  <rect x="60" y="225" width="680" height="135" fill="#16213e" rx="8"/>
  <text x="400" y="250" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">スキル設計の3原則</text>
  
      <text x="90" y="279" fill="#f9a825" font-size="16">🎯</text>
      <text x="115" y="279" fill="#f9a825" font-size="13" font-weight="bold">単一責任</text>
      <text x="220" y="279" fill="#ffffff" font-size="12" opacity="0.8">1スキル = 1目的。複数の目的があるなら分割する</text>
    
      <text x="90" y="309" fill="#f9a825" font-size="16">🔄</text>
      <text x="115" y="309" fill="#f9a825" font-size="13" font-weight="bold">冪等性</text>
      <text x="220" y="309" fill="#ffffff" font-size="12" opacity="0.8">何度実行しても同じ結果になるよう設計する</text>
    
      <text x="90" y="339" fill="#f9a825" font-size="16">🛡</text>
      <text x="115" y="339" fill="#f9a825" font-size="13" font-weight="bold">フェイルセーフ</text>
      <text x="220" y="339" fill="#ffffff" font-size="12" opacity="0.8">エラー時は安全な状態に戻るハンドリングを必ず入れる</text>
    
</svg>


---

# スキルのディレクトリ構造

> *SKILL.md+サポートファイルのシンプル構成で誰でも作成できる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキルのディレクトリ構造</text>
  <rect x="100" y="60" width="600" height="300" fill="#16213e" rx="8"/>
  <rect x="100" y="60" width="600" height="8" fill="#f9a825" rx="4"/>
  
      <text x="130" y="80" fill="#f9a825" font-size="13" font-family="monospace">.claude/</text>
      
    
      <text x="154" y="100" fill="#f9a825" font-size="13" font-family="monospace">skills/</text>
      
    
      <text x="178" y="120" fill="#2196f3" font-size="13" font-family="monospace">create-slides/</text>
      
    
      <text x="202" y="140" fill="#ffffff" font-size="13" font-family="monospace">SKILL.md</text>
      <text x="276" y="140" fill="#ffffff" font-size="11" opacity="0.5">← 必須: ワークフロー定義</text>
    
      <text x="202" y="160" fill="#4caf50" font-size="13" font-family="monospace">examples/</text>
      
    
      <text x="202" y="180" fill="#4caf50" font-size="13" font-family="monospace">templates/</text>
      
    
      <text x="178" y="200" fill="#2196f3" font-size="13" font-family="monospace">ship/</text>
      
    
      <text x="202" y="220" fill="#ffffff" font-size="13" font-family="monospace">SKILL.md</text>
      <text x="276" y="220" fill="#ffffff" font-size="11" opacity="0.5">← 必須</text>
    
      <text x="178" y="240" fill="#ff9800" font-size="13" font-family="monospace">my-custom-skill/</text>
      
    
      <text x="202" y="260" fill="#ffffff" font-size="13" font-family="monospace">SKILL.md</text>
      <text x="276" y="260" fill="#ffffff" font-size="11" opacity="0.5">← 必須</text>
    
      <text x="202" y="280" fill="#ffffff" font-size="13" font-family="monospace">README.md</text>
      <text x="284" y="280" fill="#ffffff" font-size="11" opacity="0.5">← 推奨: 使い方説明</text>
    
      <text x="154" y="300" fill="#e91e63" font-size="13" font-family="monospace">agents/</text>
      
    
      <text x="154" y="320" fill="#ffffff" font-size="13" font-family="monospace">settings.json</text>
      <text x="268" y="320" fill="#ffffff" font-size="11" opacity="0.5">← 権限・フック設定</text>
    
</svg>
- `.claude/skills/<name>/SKILL.md` に配置するだけで自動登録
- Codex 用: `.codex/skills/` に同期（`bash .codex/install-skills.sh`）
- Git リポジトリで一括管理・バージョン管理が可能


---

# スキルのディレクトリ構造（コード例）

```text
.claude/
├── skills/
│   ├── create-slides/
│   │   └── SKILL.md      ← スキル定義
│   ├── ship/
│   │   └── SKILL.md
│   └── my-custom-skill/
│       └── SKILL.md      ← カスタムスキル
├── agents/               ← 高度なAI役割定義
│   └── slide-creator.md
└── rules/                ← パス別自動適用ルール
```


---

# SKILL.md の必須セクション

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">SKILL.md 必須セクション詳解</text>
  
      <rect x="60" y="65" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="65" width="6" height="34" fill="#2196f3" rx="2"/>
      <text x="80" y="85" fill="#2196f3" font-size="13" font-family="monospace" font-weight="bold"># Overview</text>
      <rect x="280" y="71" width="50" height="18" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="305" y="85" text-anchor="middle" fill="#e91e63" font-size="11">必須</text>
      <text x="345" y="85" fill="#ffffff" font-size="12" opacity="0.8">スキルの目的・前提条件・使用ツール</text>
    
      <rect x="60" y="107" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="107" width="6" height="34" fill="#f9a825" rx="2"/>
      <text x="80" y="127" fill="#f9a825" font-size="13" font-family="monospace" font-weight="bold">## Interview-First</text>
      <rect x="280" y="113" width="50" height="18" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="305" y="127" text-anchor="middle" fill="#e91e63" font-size="11">必須</text>
      <text x="345" y="127" fill="#ffffff" font-size="12" opacity="0.8">Layer 1/2 質問リスト・承認フロー（全スキル必須）</text>
    
      <rect x="60" y="149" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="149" width="6" height="34" fill="#4caf50" rx="2"/>
      <text x="80" y="169" fill="#4caf50" font-size="13" font-family="monospace" font-weight="bold">## Workflow</text>
      <rect x="280" y="155" width="50" height="18" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="305" y="169" text-anchor="middle" fill="#e91e63" font-size="11">必須</text>
      <text x="345" y="169" fill="#ffffff" font-size="12" opacity="0.8">フェーズ定義・実行順序・各フェーズの完了条件</text>
    
      <rect x="60" y="191" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="191" width="6" height="34" fill="#ff9800" rx="2"/>
      <text x="80" y="211" fill="#ff9800" font-size="13" font-family="monospace" font-weight="bold">## Error Handling</text>
      <rect x="280" y="197" width="50" height="18" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="305" y="211" text-anchor="middle" fill="#e91e63" font-size="11">必須</text>
      <text x="345" y="211" fill="#ffffff" font-size="12" opacity="0.8">エラーパターン別対処・リトライ上限・エスカレーション</text>
    
      <rect x="60" y="233" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="233" width="6" height="34" fill="#e91e63" rx="2"/>
      <text x="80" y="253" fill="#e91e63" font-size="13" font-family="monospace" font-weight="bold">## Output Format</text>
      <rect x="280" y="239" width="50" height="18" fill="#e91e63" opacity="0.4" rx="3"/>
      <text x="305" y="253" text-anchor="middle" fill="#e91e63" font-size="11">必須</text>
      <text x="345" y="253" fill="#ffffff" font-size="12" opacity="0.8">成果物仕様・品質基準・チェックリスト</text>
    
      <rect x="60" y="275" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="275" width="6" height="34" fill="#9c27b0" rx="2"/>
      <text x="80" y="295" fill="#9c27b0" font-size="13" font-family="monospace" font-weight="bold">## Shorthand</text>
      <rect x="280" y="281" width="55" height="18" fill="#16213e" opacity="0.4" rx="3"/>
      <text x="305" y="295" text-anchor="middle" fill="#ffffff" font-size="11">推奨</text>
      <text x="345" y="295" fill="#ffffff" font-size="12" opacity="0.8">明確なコマンド略語（例: "60more" → スライド数）</text>
    
      <rect x="60" y="317" width="680" height="34" fill="#16213e" rx="5"/>
      <rect x="60" y="317" width="6" height="34" fill="#ffffff" rx="2"/>
      <text x="80" y="337" fill="#ffffff" font-size="13" font-family="monospace" font-weight="bold">## Examples</text>
      <rect x="280" y="323" width="55" height="18" fill="#16213e" opacity="0.4" rx="3"/>
      <text x="305" y="337" text-anchor="middle" fill="#ffffff" font-size="11">推奨</text>
      <text x="345" y="337" fill="#ffffff" font-size="12" opacity="0.8">呼び出し例・サンプル入出力</text>
    
</svg>
- フロントマター・概要・ワークフロー・重要ルールの4要素が必須


---

# SKILL.md の必須セクション（コード例）

```markdown
---
name: my-skill
description: スキルの目的を1行で説明
user_invocable: true
---

# My Skill
## ワークフロー
1. Phase 1: ヒアリング（AskUserQuestion で選択式）
2. Phase 2: 構成確認（承認ゲートを設ける）
3. Phase 3: 生成・バリデーション
4. Phase 4: エクスポート・完了報告

## 重要ルール
- ❌ やってはいけないこと
- ✅ 必ずやること
```


---

# 8フェーズ ワークフロー設計

- <svg viewBox='0 0 760 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='20' width='160' height='60' rx='8' fill='#4C1D95'/><text x='90' y='45' text-anchor='middle' fill='#C4B5FD' font-size='11'>Phase 1</text><text x='90' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>ヒアリング</text><line x1='170' y1='50' x2='188' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='195,50 185,45 185,55' fill='#6B7280'/><rect x='195' y='20' width='160' height='60' rx='8' fill='#1E3A8A'/><text x='275' y='45' text-anchor='middle' fill='#BFDBFE' font-size='11'>Phase 2</text><text x='275' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>構成設計</text><line x1='355' y1='50' x2='373' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='380,50 370,45 370,55' fill='#6B7280'/><rect x='380' y='20' width='160' height='60' rx='8' fill='#065F46'/><text x='460' y='45' text-anchor='middle' fill='#A7F3D0' font-size='11'>Phase 3</text><text x='460' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>Config生成</text><line x1='540' y1='50' x2='558' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='565,50 555,45 555,55' fill='#6B7280'/><rect x='565' y='20' width='160' height='60' rx='8' fill='#7C2D12'/><text x='645' y='45' text-anchor='middle' fill='#FED7AA' font-size='11'>Phase 4</text><text x='645' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>データ生成</text><line x1='645' y1='80' x2='645' y2='108' stroke='#6B7280' stroke-width='2'/><polygon points='645,115 640,105 650,105' fill='#6B7280'/><rect x='565' y='115' width='160' height='60' rx='8' fill='#7C3AED'/><text x='645' y='140' text-anchor='middle' fill='#EDE9FE' font-size='11'>Phase 5</text><text x='645' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>レンダリング</text><line x1='565' y1='145' x2='547' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='540,145 550,140 550,150' fill='#6B7280'/><rect x='380' y='115' width='160' height='60' rx='8' fill='#0369A1'/><text x='460' y='140' text-anchor='middle' fill='#BAE6FD' font-size='11'>Phase 6</text><text x='460' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>レビューLoop</text><line x1='380' y1='145' x2='362' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='355,145 365,140 365,150' fill='#6B7280'/><rect x='195' y='115' width='160' height='60' rx='8' fill='#166534'/><text x='275' y='140' text-anchor='middle' fill='#BBF7D0' font-size='11'>Phase 7</text><text x='275' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>デザイン調整</text><line x1='195' y1='145' x2='177' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='170,145 180,140 180,150' fill='#6B7280'/><rect x='10' y='115' width='160' height='60' rx='8' fill='#1F2937'/><rect x='10' y='115' width='160' height='60' rx='8' fill='none' stroke='#34D399' stroke-width='2'/><text x='90' y='140' text-anchor='middle' fill='#6EE7B7' font-size='11'>Phase 8</text><text x='90' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>エクスポート</text></svg>


---

# ヒアリングフェーズの設計

> *1問1答設計と承認ゲートを組み込むことで品質のブレを防ぎ手戻りをゼロにする*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">ヒアリングフェーズの設計パターン</text>
  <rect x="60" y="65" width="320" height="280" fill="#16213e" rx="8"/>
  <text x="220" y="90" text-anchor="middle" fill="#2196f3" font-size="15" font-weight="bold">Layer 1 — 必須ヒアリング</text>
  
    <rect x="80" y="108" width="280" height="42" fill="#1a1a2e" rx="5"/>
    <text x="95" y="125" fill="#2196f3" font-size="12" font-weight="bold">目標（Goal）</text>
    <text x="95" y="141" fill="#ffffff" font-size="11" opacity="0.6">1問ずつ、承認を得てから次へ</text>
  
    <rect x="80" y="162" width="280" height="42" fill="#1a1a2e" rx="5"/>
    <text x="95" y="179" fill="#2196f3" font-size="12" font-weight="bold">スコープ（対象範囲）</text>
    <text x="95" y="195" fill="#ffffff" font-size="11" opacity="0.6">1問ずつ、承認を得てから次へ</text>
  
    <rect x="80" y="216" width="280" height="42" fill="#1a1a2e" rx="5"/>
    <text x="95" y="233" fill="#2196f3" font-size="12" font-weight="bold">出力形式・品質基準</text>
    <text x="95" y="249" fill="#ffffff" font-size="11" opacity="0.6">1問ずつ、承認を得てから次へ</text>
  
    <rect x="80" y="270" width="280" height="42" fill="#1a1a2e" rx="5"/>
    <text x="95" y="287" fill="#2196f3" font-size="12" font-weight="bold">制約・既存の決定事項</text>
    <text x="95" y="303" fill="#ffffff" font-size="11" opacity="0.6">1問ずつ、承認を得てから次へ</text>
  
  <rect x="420" y="65" width="320" height="280" fill="#16213e" rx="8"/>
  <text x="580" y="90" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">Layer 2 — 深掘りヒアリング</text>
  <text x="580" y="112" text-anchor="middle" fill="#ffffff" font-size="12" opacity="0.7">Layer 1 の各回答を分析して新たな不明点を1つ追加質問</text>
  
    <rect x="440" y="118" width="280" height="54" fill="#1a1a2e" rx="5"/>
    <text x="455" y="138" fill="#f9a825" font-size="13" font-weight="bold">対象者は？</text>
    <text x="455" y="158" fill="#ffffff" font-size="12" opacity="0.7">→ 専門性に応じて言語・深度を調整</text>
  
    <rect x="440" y="188" width="280" height="54" fill="#1a1a2e" rx="5"/>
    <text x="455" y="208" fill="#f9a825" font-size="13" font-weight="bold">既存資産は？</text>
    <text x="455" y="228" fill="#ffffff" font-size="12" opacity="0.7">→ テンプレート・スタイルガイドを参照</text>
  
    <rect x="440" y="258" width="280" height="54" fill="#1a1a2e" rx="5"/>
    <text x="455" y="278" fill="#f9a825" font-size="13" font-weight="bold">締切は？</text>
    <text x="455" y="298" fill="#ffffff" font-size="12" opacity="0.7">→ 生成戦略（並列/逐次）を決定</text>
  
  <text x="580" y="338" text-anchor="middle" fill="#ffffff" font-size="12" opacity="0.6">全質問が完了したら要約を提示 → ユーザー承認 → 実行</text>
</svg>
- **1問1答**: 複数質問をまとめて投げない（1質問 → 回答 → 次の質問）
- **選択肢提示**: 自由回答より選択式で迷いを減らす（最大4択）
- **`AskUserQuestion` ツール**: 構造化された質問UI で回答を収集
- **段階的深掘り**: 概要質問 → 詳細質問の順で展開
- **承認確認**: 構成アウトラインを提示してから実行開始
- **デフォルト値**: 最も一般的な選択肢を最初に提示して迷いを防ぐ


---

# AskUserQuestion の活用

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">ヒアリング実装 — 質問フロー設計</text>
  <rect x="300" y="60" width="200" height="40" fill="#2196f3" rx="6"/>
  <text x="400" y="85" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">スキル呼び出し</text>
  <polygon points="400,115 406,104 394,104" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="100" x2="400" y2="113" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="280" y="118" width="240" height="36" fill="#16213e" rx="6"/>
  <text x="400" y="141" text-anchor="middle" fill="#f9a825" font-size="13">Layer 1: 質問1を提示</text>
  <polygon points="400,170 406,159 394,159" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="154" x2="400" y2="168" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="270" y="173" width="260" height="36" fill="#16213e" rx="6"/>
  <text x="400" y="196" text-anchor="middle" fill="#ffffff" font-size="13">ユーザー回答 + 承認待ち</text>
  <line x1="530" y1="191" x2="600" y2="191" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
  <text x="660" y="195" fill="#e91e63" font-size="12">未承認 → 再質問</text>
  <polygon points="400,226 406,215 394,215" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="209" x2="400" y2="224" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="270" y="228" width="260" height="36" fill="#16213e" rx="6"/>
  <text x="400" y="251" text-anchor="middle" fill="#f9a825" font-size="13">Layer 2: 深掘り質問（1問）</text>
  <polygon points="400,284 406,273 394,273" fill="#ffffff" opacity="0.6"/>
  <line x1="400" y1="264" x2="400" y2="282" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  <rect x="270" y="286" width="260" height="36" fill="#16213e" rx="6"/>
  <text x="400" y="309" text-anchor="middle" fill="#ffffff" font-size="13">要約提示 → 承認</text>
  <polygon points="400,342 406,330 394,330" fill="#4caf50" opacity="0.7"/>
  <line x1="400" y1="322" x2="400" y2="340" stroke="#4caf50" stroke-width="2" opacity="0.7"/>
  <rect x="280" y="344" width="240" height="28" fill="#4caf50" opacity="0.3" rx="6"/>
  <text x="400" y="363" text-anchor="middle" fill="#ffffff" font-size="13">実行開始</text>
</svg>
- 構造化された選択肢UIでユーザーの意思決定を最適化


---

# AskUserQuestion の活用（コード例）

```javascript
# 単一選択（相互排他的な選択肢）
AskUserQuestion(
  question: "テーマは？",
  options: [
    {label: "Gaia ダーク", description: "コード重視・スタイリッシュ"},
    {label: "Default",    description: "ビジネス向け・クリーン"}
  ]
)

# 複数選択（含めたい内容）
AskUserQuestion(
  question: "必須コンテンツは？",
  multiSelect: true,
  options: [...]  # 最大4択に絞る
)
```


---

# エラーハンドリングの設計

> *3種類のエラーを定義しセルフヒーリングループで自動修正を最大3回試みる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">エラーハンドリング設計パターン</text>
  
      <rect x="60" y="70" width="680" height="46" fill="#16213e" rx="6"/>
      <rect x="60" y="70" width="6" height="46" fill="#ff9800" rx="3"/>
      <rect x="75" y="78" width="160" height="28" fill="#ff9800" opacity="0.2" rx="4"/>
      <text x="155" y="97" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">構文エラー</text>
      <polygon points="260,93 252,87 252,99" fill="#ffffff" opacity="0.5"/>
      <line x1="240" y1="93" x2="250" y2="93" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
      <text x="275" y="97" fill="#ffffff" font-size="13" opacity="0.9">自動修正 → 再実行（最大3回）</text>
    
      <rect x="60" y="126" width="680" height="46" fill="#16213e" rx="6"/>
      <rect x="60" y="126" width="6" height="46" fill="#f9a825" rx="3"/>
      <rect x="75" y="134" width="160" height="28" fill="#f9a825" opacity="0.2" rx="4"/>
      <text x="155" y="153" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">スキーマ違反</text>
      <polygon points="260,149 252,143 252,155" fill="#ffffff" opacity="0.5"/>
      <line x1="240" y1="149" x2="250" y2="149" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
      <text x="275" y="153" fill="#ffffff" font-size="13" opacity="0.9">bun run fix → 再検証 → 手動確認</text>
    
      <rect x="60" y="182" width="680" height="46" fill="#16213e" rx="6"/>
      <rect x="60" y="182" width="6" height="46" fill="#e91e63" rx="3"/>
      <rect x="75" y="190" width="160" height="28" fill="#e91e63" opacity="0.2" rx="4"/>
      <text x="155" y="209" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">ツール失敗</text>
      <polygon points="260,205 252,199 252,211" fill="#ffffff" opacity="0.5"/>
      <line x1="240" y1="205" x2="250" y2="205" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
      <text x="275" y="209" fill="#ffffff" font-size="13" opacity="0.9">代替手法試行 → ユーザーへ通知</text>
    
      <rect x="60" y="238" width="680" height="46" fill="#16213e" rx="6"/>
      <rect x="60" y="238" width="6" height="46" fill="#2196f3" rx="3"/>
      <rect x="75" y="246" width="160" height="28" fill="#2196f3" opacity="0.2" rx="4"/>
      <text x="155" y="265" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">Token 超過</text>
      <polygon points="260,261 252,255 252,267" fill="#ffffff" opacity="0.5"/>
      <line x1="240" y1="261" x2="250" y2="261" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
      <text x="275" y="265" fill="#ffffff" font-size="13" opacity="0.9">チャンク分割 → Write ツールへ切替え</text>
    
      <rect x="60" y="294" width="680" height="46" fill="#16213e" rx="6"/>
      <rect x="60" y="294" width="6" height="46" fill="#4caf50" rx="3"/>
      <rect x="75" y="302" width="160" height="28" fill="#4caf50" opacity="0.2" rx="4"/>
      <text x="155" y="321" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">並列競合</text>
      <polygon points="260,317 252,311 252,323" fill="#ffffff" opacity="0.5"/>
      <line x1="240" y1="317" x2="250" y2="317" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
      <text x="275" y="321" fill="#ffffff" font-size="13" opacity="0.9">ファイル分離確認 → 再割り当て</text>
    
  <rect x="60" y="355" width="680" height="20" fill="#16213e" rx="4"/>
  <text x="400" y="369" text-anchor="middle" fill="#f9a825" font-size="12">全エラーは log/ に記録 — 3回失敗後は Leader にエスカレーション</text>
</svg>
- **バリデーションエラーの種類と自動修正**:
-   → フィールド名ミス: `bullets` → `content` に自動置換
-   → 無効な enum 値: `layout: 'custom'` → `'default'` に修正
-   → 必須フィールド欠損: スキーマ定義から補完
- **修正後に再検証**: エラーなしを確認してから書き込み
- **3回失敗したら停止**: エラー内容と手動修正手順をユーザーに報告


---

# セルフヒーリングパターン

- <svg viewBox='0 0 760 195' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='68' width='130' height='60' rx='8' fill='#4C1D95'/><text x='95' y='103' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>実行</text><line x1='160' y1='98' x2='188' y2='98' stroke='#A78BFA' stroke-width='2'/><polygon points='195,98 185,93 185,103' fill='#A78BFA'/><rect x='195' y='68' width='130' height='60' rx='8' fill='#1E3A8A'/><text x='260' y='103' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>検証</text><line x1='325' y1='98' x2='353' y2='98' stroke='#60A5FA' stroke-width='2'/><polygon points='360,98 350,93 350,103' fill='#60A5FA'/><rect x='360' y='68' width='160' height='60' rx='8' fill='#92400E'/><text x='440' y='95' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>問題検出？</text><text x='440' y='115' text-anchor='middle' fill='#FDE68A' font-size='11'>Yes / No</text><line x1='520' y1='83' x2='548' y2='83' stroke='#34D399' stroke-width='2'/><polygon points='555,83 545,78 545,88' fill='#34D399'/><rect x='555' y='63' width='100' height='45' rx='8' fill='#065F46'/><text x='605' y='91' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>完了</text><text x='470' y='58' fill='#34D399' font-size='11' text-anchor='middle'>No →</text><line x1='440' y1='128' x2='440' y2='155' stroke='#EF4444' stroke-width='2'/><polygon points='440,162 435,152 445,152' fill='#EF4444'/><rect x='320' y='162' width='240' height='30' rx='8' fill='#374151'/><text x='440' y='182' text-anchor='middle' fill='#D1D5DB' font-size='13'>自動修正（最大3回）</text><line x1='320' y1='177' x2='95' y2='177' stroke='#EF4444' stroke-width='2'/><line x1='95' y1='177' x2='95' y2='128' stroke='#EF4444' stroke-width='2'/><polygon points='95,128 90,138 100,138' fill='#EF4444'/><text x='460' y='148' fill='#FCA5A5' font-size='11'>Yes</text><text x='180' y='170' fill='#9CA3AF' font-size='10'>フィードバックループ</text></svg>


---

# アンチパターン (1/2)

> *複数質問の一括投げ・承認スキップ・エラー無視がスキル品質を破壊する三悪*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#e91e63" font-size="20" font-weight="bold">スキル設計のアンチパターン (1/2)</text>
  
      <rect x="60" y="75" width="320" height="58" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
      <text x="85" y="95" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="95" fill="#ffffff" font-size="13" opacity="0.8">ヒアリングなしで即実行</text>
      <text x="105" y="119" fill="#ffffff" font-size="11" opacity="0.5">→ 一貫性のない出力・見落とし</text>
      <rect x="420" y="75" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="95" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="95" fill="#ffffff" font-size="13" opacity="0.8">必ずLayer 1/2ヒアリングを実施</text>
      <polygon points="400,104 392,98 392,110" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="104" x2="391" y2="104" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="147" width="320" height="58" fill="#16213e" rx="6" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
      <text x="85" y="167" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="167" fill="#ffffff" font-size="13" opacity="0.8">大きな出力をinline出力</text>
      <text x="105" y="191" fill="#ffffff" font-size="11" opacity="0.5">→ 一貫性のない出力・見落とし</text>
      <rect x="420" y="147" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="167" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="167" fill="#ffffff" font-size="13" opacity="0.8">2KB超はすべてWrite ツールで書き込む</text>
      <polygon points="400,176 392,170 392,182" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="176" x2="391" y2="176" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="219" width="320" height="58" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
      <text x="85" y="239" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="239" fill="#ffffff" font-size="13" opacity="0.8">フェーズをスキップ</text>
      <text x="105" y="263" fill="#ffffff" font-size="11" opacity="0.5">→ 一貫性のない出力・見落とし</text>
      <rect x="420" y="219" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="239" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="239" fill="#ffffff" font-size="13" opacity="0.8">各フェーズの完了確認後に次へ進む</text>
      <polygon points="400,248 392,242 392,254" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="248" x2="391" y2="248" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="291" width="320" height="58" fill="#16213e" rx="6" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
      <text x="85" y="311" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="311" fill="#ffffff" font-size="13" opacity="0.8">エラー時に無言で終了</text>
      <text x="105" y="335" fill="#ffffff" font-size="11" opacity="0.5">→ 一貫性のない出力・見落とし</text>
      <rect x="420" y="291" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="311" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="311" fill="#ffffff" font-size="13" opacity="0.8">原因をログに記録してユーザーへ報告</text>
      <polygon points="400,320 392,314 392,326" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="320" x2="391" y2="320" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
</svg>
- ❌ **複数質問の一括投げ**: 全質問を最初に並べない
-   → ✅ 1フェーズ1質問、承認を得てから次へ進む
- ❌ **曖昧な指示**: 「良いスライドを作って」だけでは不十分
-   → ✅ フェーズ・チェックリスト・具体的な検証条件を記述
- ❌ **バリデーション省略**: 生成後すぐに出力しない
-   → ✅ 必ずスキーマ照合 → エラーなし確認 → ファイル書き込み


---

# アンチパターン (2/2)

> *セルフヒーリング未実装・パス依存・並列安全性欠如が実運用での致命的バグになる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#e91e63" font-size="20" font-weight="bold">スキル設計のアンチパターン (2/2)</text>
  
      <rect x="60" y="75" width="320" height="58" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
      <text x="85" y="95" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="95" fill="#ffffff" font-size="13" opacity="0.8">1スキルで複数目的を処理</text>
      <rect x="420" y="75" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="95" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="95" fill="#ffffff" font-size="13" opacity="0.8">単一責任：1スキル = 1目的に分割する</text>
      <polygon points="400,104 392,98 392,110" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="104" x2="391" y2="104" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="147" width="320" height="58" fill="#16213e" rx="6" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
      <text x="85" y="167" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="167" fill="#ffffff" font-size="13" opacity="0.8">並列実行で同じファイルを操作</text>
      <rect x="420" y="147" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="167" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="167" fill="#ffffff" font-size="13" opacity="0.8">ファイルを分離して競合を防ぐ</text>
      <polygon points="400,176 392,170 392,182" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="176" x2="391" y2="176" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="219" width="320" height="58" fill="#16213e" rx="6" stroke="#e91e63" stroke-width="1" opacity="0.6"/>
      <text x="85" y="239" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="239" fill="#ffffff" font-size="13" opacity="0.8">url(#id) を使ったSVG生成</text>
      <rect x="420" y="219" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="239" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="239" fill="#ffffff" font-size="13" opacity="0.8">drop-shadow() と <polygon> で代替する</text>
      <polygon points="400,248 392,242 392,254" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="248" x2="391" y2="248" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
      <rect x="60" y="291" width="320" height="58" fill="#16213e" rx="6" stroke="#ff9800" stroke-width="1" opacity="0.6"/>
      <text x="85" y="311" fill="#e91e63" font-size="14">✗</text>
      <text x="110" y="311" fill="#ffffff" font-size="13" opacity="0.8">承認なしで次フェーズへ進む</text>
      <rect x="420" y="291" width="320" height="58" fill="#16213e" rx="6" stroke="#4caf50" stroke-width="1" opacity="0.6"/>
      <text x="445" y="311" fill="#4caf50" font-size="14">✓</text>
      <text x="470" y="311" fill="#ffffff" font-size="13" opacity="0.8">各フェーズ後にユーザー承認を必ず待つ</text>
      <polygon points="400,320 392,314 392,326" fill="#4caf50" opacity="0.7"/>
      <line x1="383" y1="320" x2="391" y2="320" stroke="#4caf50" stroke-width="1" opacity="0.7"/>
    
</svg>
- ❌ **エラー無視**: 失敗しても無視して続行する
-   → ✅ セルフヒーリングループで最大3回リトライ
- ❌ **機能の詰め込み**: 1スキルに全機能を入れる
-   → ✅ 1スキル1目的（単一責任原則）
- ❌ **ハードコード**: パスや設定を固定値で埋め込む
-   → ✅ YAML 設定ファイルや対話入力で柔軟に対応


---

# スキルレビューチェックリスト

> *構造・インタビュー・ワークフロー・エラー処理・出力形式の5軸でスキルを評価する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキルレビューチェックリスト</text>
  <rect x="60" y="60" width="330" height="295" fill="#16213e" rx="8"/>
  <text x="225" y="85" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">必須項目</text>
  
    <rect x="80" y="100" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="106" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="117" fill="#ffffff" font-size="12">Interview-First ポリシー実装済み</text>
  
    <rect x="80" y="134" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="140" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="151" fill="#ffffff" font-size="12">Layer 1/2 質問が明確に定義済み</text>
  
    <rect x="80" y="168" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="174" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="185" fill="#ffffff" font-size="12">各フェーズに完了条件がある</text>
  
    <rect x="80" y="202" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="208" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="219" fill="#ffffff" font-size="12">エラーハンドリング実装済み</text>
  
    <rect x="80" y="236" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="242" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="253" fill="#ffffff" font-size="12">出力形式・品質基準が明記済み</text>
  
    <rect x="80" y="270" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="276" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="287" fill="#ffffff" font-size="12">2KB超出力はWrite ツール使用</text>
  
    <rect x="80" y="304" width="290" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="85" y="310" width="14" height="14" fill="#16213e" rx="2" stroke="#4caf50" stroke-width="1.5"/>
    <text x="108" y="321" fill="#ffffff" font-size="12">SVGで url(#id) を使っていない</text>
  
  <rect x="415" y="60" width="325" height="295" fill="#16213e" rx="8"/>
  <text x="577" y="85" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">推奨項目</text>
  
    <rect x="435" y="100" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="106" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="117" fill="#ffffff" font-size="12">README.md に使用例がある</text>
  
    <rect x="435" y="134" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="140" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="151" fill="#ffffff" font-size="12">テストケースが3つ以上ある</text>
  
    <rect x="435" y="168" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="174" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="185" fill="#ffffff" font-size="12">バージョン番号が記載されている</text>
  
    <rect x="435" y="202" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="208" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="219" fill="#ffffff" font-size="12">依存スキルが明記されている</text>
  
    <rect x="435" y="236" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="242" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="253" fill="#ffffff" font-size="12">セルフヒーリングパターンある</text>
  
    <rect x="435" y="270" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="276" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="287" fill="#ffffff" font-size="12">ショートハンドが定義されている</text>
  
    <rect x="435" y="304" width="285" height="26" fill="#1a1a2e" rx="3"/>
    <rect x="440" y="310" width="14" height="14" fill="#16213e" rx="2" stroke="#f9a825" stroke-width="1.5"/>
    <text x="463" y="321" fill="#ffffff" font-size="12">レビュー者の承認を得ている</text>
  
</svg>
- **構造**: フロントマター・ワークフロー・ルールが揃っているか
- **対話設計**: `AskUserQuestion` で承認ゲートを設けているか
- **バリデーション**: Pre-flight と Post-generation の両方があるか
- **エラーハンドリング**: 失敗時のリカバリが定義されているか
- **完了報告**: 標準テンプレートに沿った報告をしているか
- **テスト**: ドライランで期待通りに動作するか確認済みか


---

<!-- _class: lead -->
# チーム導入戦略

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">チーム導入戦略 — 3ステップアプローチ</text>
  
      <rect x="65" y="65" width="210" height="285" fill="#16213e" rx="10"/>
      <rect x="65" y="65" width="210" height="8" fill="#2196f3" rx="4"/>
      <text x="170" y="100" text-anchor="middle" fill="#2196f3" font-size="14" font-weight="bold">Step 1</text>
      <text x="170" y="118" text-anchor="middle" fill="#ffffff" font-size="13">パイロット導入</text>
      <rect x="80" y="126" width="180" height="22" fill="#2196f3" opacity="0.2" rx="4"/>
      <text x="170" y="141" text-anchor="middle" fill="#2196f3" font-size="12">Week 1-2</text>
      
        <rect x="80" y="162" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="170" y="187" text-anchor="middle" fill="#ffffff" font-size="12">1名のチャンピオン選定</text>
      
        <rect x="80" y="214" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="170" y="239" text-anchor="middle" fill="#ffffff" font-size="12">既存スキル3つを試用</text>
      
        <rect x="80" y="266" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="170" y="291" text-anchor="middle" fill="#ffffff" font-size="12">効果測定と課題収集</text>
      
    
      <rect x="305" y="65" width="210" height="285" fill="#16213e" rx="10"/>
      <rect x="305" y="65" width="210" height="8" fill="#4caf50" rx="4"/>
      <text x="410" y="100" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">Step 2</text>
      <text x="410" y="118" text-anchor="middle" fill="#ffffff" font-size="13">チーム展開</text>
      <rect x="320" y="126" width="180" height="22" fill="#4caf50" opacity="0.2" rx="4"/>
      <text x="410" y="141" text-anchor="middle" fill="#4caf50" font-size="12">Week 3-6</text>
      
        <rect x="320" y="162" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="410" y="187" text-anchor="middle" fill="#ffffff" font-size="12">チーム全員にトレーニング</text>
      
        <rect x="320" y="214" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="410" y="239" text-anchor="middle" fill="#ffffff" font-size="12">カスタムスキル1つ作成</text>
      
        <rect x="320" y="266" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="410" y="291" text-anchor="middle" fill="#ffffff" font-size="12">レビューフロー確立</text>
      
    
      <rect x="545" y="65" width="210" height="285" fill="#16213e" rx="10"/>
      <rect x="545" y="65" width="210" height="8" fill="#f9a825" rx="4"/>
      <text x="650" y="100" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Step 3</text>
      <text x="650" y="118" text-anchor="middle" fill="#ffffff" font-size="13">組織標準化</text>
      <rect x="560" y="126" width="180" height="22" fill="#f9a825" opacity="0.2" rx="4"/>
      <text x="650" y="141" text-anchor="middle" fill="#f9a825" font-size="12">Week 7+</text>
      
        <rect x="560" y="162" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="650" y="187" text-anchor="middle" fill="#ffffff" font-size="12">スキルライブラリ整備</text>
      
        <rect x="560" y="214" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="650" y="239" text-anchor="middle" fill="#ffffff" font-size="12">ガバナンス・承認フロー</text>
      
        <rect x="560" y="266" width="180" height="42" fill="#1a1a2e" rx="5"/>
        <text x="650" y="291" text-anchor="middle" fill="#ffffff" font-size="12">ROI測定・改善サイクル</text>
      
    
</svg>


---

# 段階的導入ロードマップ

- <svg viewBox='0 0 760 215' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='40' y='98' width='700' height='8' rx='4' fill='#374151'/><circle cx='120' cy='102' r='20' fill='#4C1D95'/><text x='120' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>1</text><rect x='58' y='30' width='124' height='58' rx='8' fill='rgba(76,29,149,0.3)' stroke='#6D28D9' stroke-width='1.5'/><line x1='120' y1='88' x2='120' y2='82' stroke='#6B7280' stroke-width='1.5'/><text x='120' y='50' text-anchor='middle' fill='#A78BFA' font-size='12' font-weight='bold'>Week 1-2</text><text x='120' y='68' text-anchor='middle' fill='white' font-size='12'>パイロット</text><text x='120' y='82' text-anchor='middle' fill='#C4B5FD' font-size='10'>1-2名で試験</text><circle cx='310' cy='102' r='20' fill='#1E3A8A'/><text x='310' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>2</text><rect x='248' y='30' width='124' height='58' rx='8' fill='rgba(30,58,138,0.3)' stroke='#2563EB' stroke-width='1.5'/><line x1='310' y1='88' x2='310' y2='82' stroke='#6B7280' stroke-width='1.5'/><text x='310' y='50' text-anchor='middle' fill='#60A5FA' font-size='12' font-weight='bold'>Week 3-4</text><text x='310' y='68' text-anchor='middle' fill='white' font-size='12'>チーム展開</text><text x='310' y='82' text-anchor='middle' fill='#93C5FD' font-size='10'>全員にインストール</text><circle cx='500' cy='102' r='20' fill='#065F46'/><text x='500' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>3</text><rect x='438' y='135' width='124' height='58' rx='8' fill='rgba(6,95,70,0.3)' stroke='#059669' stroke-width='1.5'/><line x1='500' y1='122' x2='500' y2='135' stroke='#6B7280' stroke-width='1.5'/><text x='500' y='155' text-anchor='middle' fill='#34D399' font-size='12' font-weight='bold'>Month 2</text><text x='500' y='173' text-anchor='middle' fill='white' font-size='12'>カスタム化</text><text x='500' y='187' text-anchor='middle' fill='#6EE7B7' font-size='10'>独自スキル開発</text><circle cx='690' cy='102' r='20' fill='#92400E'/><text x='690' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>4</text><rect x='628' y='135' width='124' height='58' rx='8' fill='rgba(146,64,14,0.3)' stroke='#D97706' stroke-width='1.5'/><line x1='690' y1='122' x2='690' y2='135' stroke='#6B7280' stroke-width='1.5'/><text x='690' y='155' text-anchor='middle' fill='#FBBF24' font-size='12' font-weight='bold'>Month 3+</text><text x='690' y='173' text-anchor='middle' fill='white' font-size='12'>継続改善</text><text x='690' y='187' text-anchor='middle' fill='#FCD34D' font-size='10'>KPIレビュー</text></svg>


---

# スキルガバナンスの設計

> *オーナー制・定期レビュー・バージョン管理の3制度でスキルの鮮度と品質を維持する*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">スキルガバナンスの設計</text>
  <rect x="60" y="65" width="680" height="290" fill="#16213e" rx="8"/>
  <text x="400" y="90" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">スキル承認フロー</text>
  
      <rect x="50" y="110" width="140" height="60" fill="#2196f3" opacity="0.25" rx="6"/>
      <text x="120" y="134" text-anchor="middle" fill="#ffffff" font-size="12">スキル提案</text><text x="120" y="152" text-anchor="middle" fill="#ffffff" font-size="12">(任意のメンバー)</text>
    
      <rect x="240" y="110" width="140" height="60" fill="#f9a825" opacity="0.25" rx="6"/>
      <text x="310" y="134" text-anchor="middle" fill="#ffffff" font-size="12">レビュー</text><text x="310" y="152" text-anchor="middle" fill="#ffffff" font-size="12">(チャンピオン)</text>
    
      <rect x="430" y="110" width="140" height="60" fill="#4caf50" opacity="0.25" rx="6"/>
      <text x="500" y="134" text-anchor="middle" fill="#ffffff" font-size="12">テスト</text><text x="500" y="152" text-anchor="middle" fill="#ffffff" font-size="12">(3名以上)</text>
    
      <rect x="620" y="110" width="140" height="60" fill="#ff9800" opacity="0.25" rx="6"/>
      <text x="690" y="134" text-anchor="middle" fill="#ffffff" font-size="12">承認</text><text x="690" y="152" text-anchor="middle" fill="#ffffff" font-size="12">(Tech Lead)</text>
    
  
    <polygon points="250,140 238,135 238,145" fill="#ffffff" opacity="0.5"/>
    <line x1="230" y1="140" x2="237" y2="140" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="440,140 428,135 428,145" fill="#ffffff" opacity="0.5"/>
    <line x1="420" y1="140" x2="427" y2="140" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
    <polygon points="630,140 618,135 618,145" fill="#ffffff" opacity="0.5"/>
    <line x1="610" y1="140" x2="617" y2="140" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <text x="400" y="200" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">バージョン管理ルール</text>
  
    <rect x="80" y="215" width="580" height="30" fill="#1a1a2e" rx="4"/>
    <text x="100" y="235" fill="#4caf50" font-size="12" font-weight="bold">Patch (x.y.Z)</text>
    <text x="280" y="235" fill="#ffffff" font-size="12" opacity="0.8">ドキュメント修正・バグ修正</text>
  
    <rect x="80" y="253" width="580" height="30" fill="#1a1a2e" rx="4"/>
    <text x="100" y="273" fill="#f9a825" font-size="12" font-weight="bold">Minor (x.Y.z)</text>
    <text x="280" y="273" fill="#ffffff" font-size="12" opacity="0.8">機能追加（後方互換）</text>
  
    <rect x="80" y="291" width="580" height="30" fill="#1a1a2e" rx="4"/>
    <text x="100" y="311" fill="#e91e63" font-size="12" font-weight="bold">Major (X.y.z)</text>
    <text x="280" y="311" fill="#ffffff" font-size="12" opacity="0.8">インターフェース変更・非互換更新</text>
  
  <text x="400" y="350" text-anchor="middle" fill="#ffffff" font-size="12" opacity="0.6">スキルは .claude/skills/ に git 管理 — PR レビュー必須</text>
</svg>
- **スキルオーナー制度**: 各スキルに担当者を設定し責任を明確化
- **レビュープロセス**: 新スキルは PR レビュー必須（品質確保）
- **テスト要件**: ドライランテスト合格後にマージ
- **バージョン管理**: セマンティックバージョニング（v1.0.0）で変更管理
- **廃止プロセス**: 未使用スキルを定期棚卸し（四半期ごと）
- **セキュリティ**: 破壊的操作を含むスキルの承認ゲートを設定


---

# チームトレーニング計画

> *2時間ワークショップ→1週間試用→フィードバック収集の段階的導入が定着の鍵*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">チームトレーニング計画</text>
  
      <rect x="65" y="65" width="205" height="285" fill="#16213e" rx="10"/>
      <circle cx="167" cy="100" r="28" fill="#4caf50" opacity="0.2"/>
      <text x="167" y="108" text-anchor="middle" fill="#4caf50" font-size="16" font-weight="bold">初級</text>
      <text x="167" y="142" text-anchor="middle" fill="#ffffff" font-size="13">スキル利用者</text>
      <rect x="80" y="155" width="175" height="24" fill="#4caf50" opacity="0.2" rx="4"/>
      <text x="167" y="172" text-anchor="middle" fill="#4caf50" font-size="13">2時間</text>
      
        <rect x="80" y="188" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="167" y="210" text-anchor="middle" fill="#ffffff" font-size="12">Claude Code 基本操作</text>
      
        <rect x="80" y="233" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="167" y="255" text-anchor="middle" fill="#ffffff" font-size="12">既存スキル5つの実行</text>
      
        <rect x="80" y="278" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="167" y="300" text-anchor="middle" fill="#ffffff" font-size="12">出力の確認と修正</text>
      
    
      <rect x="300" y="65" width="205" height="285" fill="#16213e" rx="10"/>
      <circle cx="402" cy="100" r="28" fill="#f9a825" opacity="0.2"/>
      <text x="402" y="108" text-anchor="middle" fill="#f9a825" font-size="16" font-weight="bold">中級</text>
      <text x="402" y="142" text-anchor="middle" fill="#ffffff" font-size="13">スキル作成者</text>
      <rect x="315" y="155" width="175" height="24" fill="#f9a825" opacity="0.2" rx="4"/>
      <text x="402" y="172" text-anchor="middle" fill="#f9a825" font-size="13">4時間</text>
      
        <rect x="315" y="188" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="402" y="210" text-anchor="middle" fill="#ffffff" font-size="12">SKILL.md 設計原則</text>
      
        <rect x="315" y="233" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="402" y="255" text-anchor="middle" fill="#ffffff" font-size="12">ヒアリングフロー実装</text>
      
        <rect x="315" y="278" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="402" y="300" text-anchor="middle" fill="#ffffff" font-size="12">エラーハンドリング設計</text>
      
    
      <rect x="535" y="65" width="205" height="285" fill="#16213e" rx="10"/>
      <circle cx="637" cy="100" r="28" fill="#e91e63" opacity="0.2"/>
      <text x="637" y="108" text-anchor="middle" fill="#e91e63" font-size="16" font-weight="bold">上級</text>
      <text x="637" y="142" text-anchor="middle" fill="#ffffff" font-size="13">スキルアーキテクト</text>
      <rect x="550" y="155" width="175" height="24" fill="#e91e63" opacity="0.2" rx="4"/>
      <text x="637" y="172" text-anchor="middle" fill="#e91e63" font-size="13">8時間</text>
      
        <rect x="550" y="188" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="637" y="210" text-anchor="middle" fill="#ffffff" font-size="12">エージェントチーム設計</text>
      
        <rect x="550" y="233" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="637" y="255" text-anchor="middle" fill="#ffffff" font-size="12">ガバナンス構築</text>
      
        <rect x="550" y="278" width="175" height="36" fill="#1a1a2e" rx="5"/>
        <text x="637" y="300" text-anchor="middle" fill="#ffffff" font-size="12">ROI最大化戦略</text>
      
    
</svg>
- **入門ワークショップ（2時間）**: `/create-slides` と `/ship` の基本操作
- **中級研修（半日）**: カスタムスキルの設計と実装ハンズオン
- **ハンズオン課題**: 各自のユースケースで簡単なスキルを1つ作成
- **ペアプログラミング**: 初回スキル作成は熟練者がサポート
- **ナレッジベース**: Confluence / 社内 Wiki に Tips をまとめる
- **コミュニティ**: Slack チャンネルで事例共有・質問サポート


---

# ROI 測定指標

- <svg viewBox='0 0 760 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='170' height='180' rx='12' fill='#1E1B4B'/><rect x='10' y='10' width='170' height='68' rx='12' fill='#4C1D95'/><rect x='10' y='50' width='170' height='28' fill='#4C1D95'/><text x='95' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>90%</text><text x='95' y='75' text-anchor='middle' fill='#DDD6FE' font-size='13'>時間節約</text><text x='95' y='105' text-anchor='middle' fill='#C4B5FD' font-size='11'>繰り返しタスクで</text><text x='95' y='123' text-anchor='middle' fill='#C4B5FD' font-size='11'>50〜90%削減</text><text x='95' y='148' text-anchor='middle' fill='#A78BFA' font-size='11'>月200時間/チーム</text><text x='95' y='168' text-anchor='middle' fill='#8B5CF6' font-size='11'>節約可能</text><rect x='200' y='10' width='170' height='180' rx='12' fill='#0F172A'/><rect x='200' y='10' width='170' height='68' rx='12' fill='#1E3A8A'/><rect x='200' y='50' width='170' height='28' fill='#1E3A8A'/><text x='285' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>75%</text><text x='285' y='75' text-anchor='middle' fill='#BFDBFE' font-size='13'>品質向上</text><text x='285' y='105' text-anchor='middle' fill='#93C5FD' font-size='11'>レビュー指摘数</text><text x='285' y='123' text-anchor='middle' fill='#93C5FD' font-size='11'>75%削減</text><text x='285' y='148' text-anchor='middle' fill='#60A5FA' font-size='11'>バグ率の低下</text><text x='285' y='168' text-anchor='middle' fill='#3B82F6' font-size='11'>品質均一化</text><rect x='390' y='10' width='170' height='180' rx='12' fill='#052E16'/><rect x='390' y='10' width='170' height='68' rx='12' fill='#065F46'/><rect x='390' y='50' width='170' height='28' fill='#065F46'/><text x='475' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>5日</text><text x='475' y='75' text-anchor='middle' fill='#A7F3D0' font-size='13'>OB期間短縮</text><text x='475' y='105' text-anchor='middle' fill='#6EE7B7' font-size='11'>2週間 → 3〜5日</text><text x='475' y='123' text-anchor='middle' fill='#6EE7B7' font-size='11'>（60-75%短縮）</text><text x='475' y='148' text-anchor='middle' fill='#34D399' font-size='11'>先輩負担</text><text x='475' y='168' text-anchor='middle' fill='#10B981' font-size='11'>75%削減</text><rect x='580' y='10' width='170' height='180' rx='12' fill='#1C1917'/><rect x='580' y='10' width='170' height='68' rx='12' fill='#78350F'/><rect x='580' y='50' width='170' height='28' fill='#78350F'/><text x='665' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>6+</text><text x='665' y='75' text-anchor='middle' fill='#FED7AA' font-size='13'>スキル資産</text><text x='665' y='105' text-anchor='middle' fill='#FDBA74' font-size='11'>組み込み6種</text><text x='665' y='123' text-anchor='middle' fill='#FDBA74' font-size='11'>+チームカスタム</text><text x='665' y='148' text-anchor='middle' fill='#FB923C' font-size='11'>組織ナレッジ</text><text x='665' y='168' text-anchor='middle' fill='#F97316' font-size='11'>の蓄積</text></svg>


---

# よくある課題と対策

> *プロンプト不足・権限エラー・ファイル競合の3課題は対策パターンで即解決できる*

- **課題1**: 「スキルが期待通り動かない」
-   → `/validate` でスキーマチェック → `bun run fix` で自動修正
- **課題2**: 「チームへの浸透が遅い」
-   → 成功事例を共有して具体的なメリットを体験させる
- **課題3**: 「スキルが増えて管理が煩雑」
-   → オーナー制度 + 定期棚卸し（四半期ごと）で整理


---

# 成功の鍵 — 6つの要因

- <svg viewBox='0 0 760 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='225' height='85' rx='10' fill='rgba(76,29,149,0.4)' stroke='#7C3AED' stroke-width='1.5'/><text x='122' y='36' text-anchor='middle' fill='#A78BFA' font-size='13' font-weight='bold'>トップダウンコミット</text><text x='122' y='56' text-anchor='middle' fill='#DDD6FE' font-size='11'>マネージャーが率先して</text><text x='122' y='72' text-anchor='middle' fill='#DDD6FE' font-size='11'>スキルを使って見せる</text><rect x='267' y='10' width='225' height='85' rx='10' fill='rgba(29,78,216,0.4)' stroke='#3B82F6' stroke-width='1.5'/><text x='379' y='36' text-anchor='middle' fill='#60A5FA' font-size='13' font-weight='bold'>小さく始める</text><text x='379' y='56' text-anchor='middle' fill='#BFDBFE' font-size='11'>1スキルで効果を実感</text><text x='379' y='72' text-anchor='middle' fill='#BFDBFE' font-size='11'>してから段階的に拡張</text><rect x='524' y='10' width='225' height='85' rx='10' fill='rgba(6,95,70,0.4)' stroke='#10B981' stroke-width='1.5'/><text x='636' y='36' text-anchor='middle' fill='#34D399' font-size='13' font-weight='bold'>成功事例の可視化</text><text x='636' y='56' text-anchor='middle' fill='#A7F3D0' font-size='11'>時間節約・品質向上の</text><text x='636' y='72' text-anchor='middle' fill='#A7F3D0' font-size='11'>数字を全員で共有</text><rect x='10' y='105' width='225' height='85' rx='10' fill='rgba(146,64,14,0.4)' stroke='#D97706' stroke-width='1.5'/><text x='122' y='131' text-anchor='middle' fill='#FBBF24' font-size='13' font-weight='bold'>心理的安全性</text><text x='122' y='151' text-anchor='middle' fill='#FDE68A' font-size='11'>失敗・試行錯誤を</text><text x='122' y='167' text-anchor='middle' fill='#FDE68A' font-size='11'>奨励する文化</text><rect x='267' y='105' width='225' height='85' rx='10' fill='rgba(31,41,55,0.7)' stroke='#6B7280' stroke-width='1.5'/><text x='379' y='131' text-anchor='middle' fill='#E5E7EB' font-size='13' font-weight='bold'>継続的フィードバック</text><text x='379' y='151' text-anchor='middle' fill='#D1D5DB' font-size='11'>スキル使用後に</text><text x='379' y='167' text-anchor='middle' fill='#D1D5DB' font-size='11'>改善提案を促す</text><rect x='524' y='105' width='225' height='85' rx='10' fill='rgba(17,24,39,0.7)' stroke='#4B5563' stroke-width='1.5'/><text x='636' y='131' text-anchor='middle' fill='#9CA3AF' font-size='13' font-weight='bold'>ナレッジ共有</text><text x='636' y='151' text-anchor='middle' fill='#D1D5DB' font-size='11'>スキルをチーム全員の</text><text x='636' y='167' text-anchor='middle' fill='#D1D5DB' font-size='11'>資産として扱う</text></svg>


---

<!-- _class: lead -->
# まとめ

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="22" font-weight="bold">まとめ：Claude Code スキルの価値</text>
  
    <rect x="100" y="75" width="200" height="250" fill="#16213e" rx="10"/>
    <circle cx="200" cy="117" r="28" fill="#2196f3" opacity="0.2"/>
    <text x="200" y="125" text-anchor="middle" fill="#2196f3" font-size="26" font-weight="bold">1</text>
    <text x="200" y="170" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">自動化と標準化</text>
    <text x="200" y="200" text-anchor="middle" fill="#ffffff" font-size="12">繰り返し作業をスキル化</text><text x="200" y="226" text-anchor="middle" fill="#ffffff" font-size="12">誰が実行しても同じ品質</text><text x="200" y="252" text-anchor="middle" fill="#ffffff" font-size="12">インタビューファーストで要件漏れゼロ</text>
  
    <rect x="330" y="75" width="200" height="250" fill="#16213e" rx="10"/>
    <circle cx="430" cy="117" r="28" fill="#4caf50" opacity="0.2"/>
    <text x="430" y="125" text-anchor="middle" fill="#4caf50" font-size="26" font-weight="bold">2</text>
    <text x="430" y="170" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">大幅な効率化</text>
    <text x="430" y="200" text-anchor="middle" fill="#ffffff" font-size="12">作業時間を最大94%削減</text><text x="430" y="226" text-anchor="middle" fill="#ffffff" font-size="12">並列実行で6倍高速化</text><text x="430" y="252" text-anchor="middle" fill="#ffffff" font-size="12">エラー自動修正でストレス軽減</text>
  
    <rect x="560" y="75" width="200" height="250" fill="#16213e" rx="10"/>
    <circle cx="660" cy="117" r="28" fill="#f9a825" opacity="0.2"/>
    <text x="660" y="125" text-anchor="middle" fill="#f9a825" font-size="26" font-weight="bold">3</text>
    <text x="660" y="170" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">チーム力の向上</text>
    <text x="660" y="200" text-anchor="middle" fill="#ffffff" font-size="12">知識・手順を組織に蓄積</text><text x="660" y="226" text-anchor="middle" fill="#ffffff" font-size="12">オンボーディングが3倍速</text><text x="660" y="252" text-anchor="middle" fill="#ffffff" font-size="12">ROI測定で継続改善</text>
  
  <text x="400" y="358" text-anchor="middle" fill="#e91e63" font-size="15">スキルは「チームの集合知をAIに教える」最も効果的な手段</text>
</svg>


---

# 重要ポイントの振り返り

> *5つのスキル体系と3つのユースケース効果で組織全体のAI活用を底上げできる*

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="38" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">重要ポイントの振り返り</text>
  
      <rect x="60" y="65" width="680" height="46" fill="#16213e" rx="6"/>
      <circle cx="92" cy="88" r="18" fill="#2196f3" opacity="0.25"/>
      <text x="92" y="94" text-anchor="middle" fill="#2196f3" font-size="15" font-weight="bold">1</text>
      <text x="122" y="83" fill="#2196f3" font-size="13" font-weight="bold">Interview-First は全スキル必須</text>
      <text x="122" y="101" fill="#ffffff" font-size="12" opacity="0.7">Layer 1/2 ヒアリング → 承認 → 実行 の順序を守る</text>
    
      <rect x="60" y="121" width="680" height="46" fill="#16213e" rx="6"/>
      <circle cx="92" cy="144" r="18" fill="#f9a825" opacity="0.25"/>
      <text x="92" y="150" text-anchor="middle" fill="#f9a825" font-size="15" font-weight="bold">2</text>
      <text x="122" y="139" fill="#f9a825" font-size="13" font-weight="bold">2KB超はWrite ツール使用</text>
      <text x="122" y="157" fill="#ffffff" font-size="12" opacity="0.7">inline出力は32K tokenエラーの原因 → 必ずファイルに書き出す</text>
    
      <rect x="60" y="177" width="680" height="46" fill="#16213e" rx="6"/>
      <circle cx="92" cy="200" r="18" fill="#e91e63" opacity="0.25"/>
      <text x="92" y="206" text-anchor="middle" fill="#e91e63" font-size="15" font-weight="bold">3</text>
      <text x="122" y="195" fill="#e91e63" font-size="13" font-weight="bold">SVGで url(#id) は禁止</text>
      <text x="122" y="213" fill="#ffffff" font-size="12" opacity="0.7">Marp の foreignObject 内では fragment refs が動作しない</text>
    
      <rect x="60" y="233" width="680" height="46" fill="#16213e" rx="6"/>
      <circle cx="92" cy="256" r="18" fill="#4caf50" opacity="0.25"/>
      <text x="92" y="262" text-anchor="middle" fill="#4caf50" font-size="15" font-weight="bold">4</text>
      <text x="122" y="251" fill="#4caf50" font-size="13" font-weight="bold">並列実行時はファイル分離</text>
      <text x="122" y="269" fill="#ffffff" font-size="12" opacity="0.7">mode:bypassPermissions 必須・重複パス指定は厳禁</text>
    
      <rect x="60" y="289" width="680" height="46" fill="#16213e" rx="6"/>
      <circle cx="92" cy="312" r="18" fill="#ff9800" opacity="0.25"/>
      <text x="92" y="318" text-anchor="middle" fill="#ff9800" font-size="15" font-weight="bold">5</text>
      <text x="122" y="307" fill="#ff9800" font-size="13" font-weight="bold">エラーは3回リトライ後エスカレーション</text>
      <text x="122" y="325" fill="#ffffff" font-size="12" opacity="0.7">ログに記録 → Team Leader へ報告 → 手動対応</text>
    
</svg>
- **スキルとは**: 再利用可能なAIワークフローの標準化定義（`SKILL.md`）
- **既存6スキル**: create-slides / generate / review-slides / ship / agent-teams / validate
- **主なユースケース**: プレゼン作成・並列開発・ドキュメント整備など90%の時間削減
- **作成ガイドライン**: 1問1答・承認ゲート・セルフヒーリングが品質の鍵
- **チーム導入**: 段階的展開（Week1〜Month3+）+ ガバナンス設計
- **成功の鍵**: トップダウンのコミット + 小さく始める + 成功事例の共有


---

# 今日から始める3ステップ

- <svg viewBox='0 0 760 200' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='20' width='210' height='160' rx='12' fill='#2E1065'/><circle cx='125' cy='65' r='35' fill='#4C1D95'/><text x='125' y='73' text-anchor='middle' fill='#DDD6FE' font-size='28' font-weight='bold'>1</text><text x='125' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>体験する</text><text x='125' y='140' text-anchor='middle' fill='#C4B5FD' font-size='11'>/create-slides を試す</text><text x='125' y='158' text-anchor='middle' fill='#A78BFA' font-size='11'>（30分）</text><line x1='230' y1='100' x2='258' y2='100' stroke='#6B7280' stroke-width='2'/><polygon points='265,100 255,95 255,105' fill='#6B7280'/><rect x='275' y='20' width='210' height='160' rx='12' fill='#172554'/><circle cx='380' cy='65' r='35' fill='#1D4ED8'/><text x='380' y='73' text-anchor='middle' fill='#BFDBFE' font-size='28' font-weight='bold'>2</text><text x='380' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>候補を選ぶ</text><text x='380' y='140' text-anchor='middle' fill='#93C5FD' font-size='11'>スキル化タスクを3つ</text><text x='380' y='158' text-anchor='middle' fill='#60A5FA' font-size='11'>リストアップ（1時間）</text><line x1='485' y1='100' x2='513' y2='100' stroke='#6B7280' stroke-width='2'/><polygon points='520,100 510,95 510,105' fill='#6B7280'/><rect x='530' y='20' width='210' height='160' rx='12' fill='#052E16'/><circle cx='635' cy='65' r='35' fill='#059669'/><text x='635' y='73' text-anchor='middle' fill='#A7F3D0' font-size='28' font-weight='bold'>3</text><text x='635' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>作成・共有</text><text x='635' y='140' text-anchor='middle' fill='#6EE7B7' font-size='11'>1スキルを作成して</text><text x='635' y='158' text-anchor='middle' fill='#34D399' font-size='11'>チームに展開（1日）</text></svg>


---

# 参考リソース（1/2）

> *Claude Code公式ドキュメントとCLAUDE.mdがスキル開発の基盤*

- **公式ドキュメント:**
-   - [Claude Code 公式サイト](https://claude.ai/code)
-   - [Anthropic ドキュメント](https://docs.anthropic.com)
- **プロジェクト内リソース:**


---

# 参考リソース（2/2）

> *CLAUDE.mdとサンプルSKILL.mdが実装の最速参照先*

-   - `CLAUDE.md` — プロジェクト全体ガイドライン
-   - `.claude/skills/` — 既存スキルの実装例（6種）
-   - `.claude/rules/` — 詳細ルール集（スキーマ・デザイン等）
-   - `.claude/agents/` — エージェント定義（slide-creator 等）


---

<!-- _class: lead -->
# ご清聴ありがとうございました

- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="70" text-anchor="middle" fill="#f9a825" font-size="30" font-weight="bold">ご清聴ありがとうございました</text>
  <text x="400" y="112" text-anchor="middle" fill="#ffffff" font-size="17" opacity="0.8">Claude Code スキルガイド</text>
  <circle cx="400" cy="220" r="75" fill="#16213e" stroke="#f9a825" stroke-width="2" opacity="0.8"/>
  <text x="400" y="210" text-anchor="middle" fill="#f9a825" font-size="40">✓</text>
  <text x="400" y="248" text-anchor="middle" fill="#ffffff" font-size="15" opacity="0.7">スキルで開発を加速しよう</text>
  <circle cx="520" cy="220" r="6" fill="#f9a825" opacity="0.3"/><circle cx="460" cy="324" r="6" fill="#f9a825" opacity="0.3"/><circle cx="340" cy="324" r="6" fill="#f9a825" opacity="0.3"/><circle cx="280" cy="220" r="6" fill="#f9a825" opacity="0.3"/><circle cx="340" cy="116" r="6" fill="#f9a825" opacity="0.3"/><circle cx="460" cy="116" r="6" fill="#f9a825" opacity="0.3"/>
  <text x="400" y="340" text-anchor="middle" fill="#ffffff" font-size="14" opacity="0.5">質問・フィードバックはこちらまで</text>
</svg>
- Claude Code スキルでチームの生産性を次のレベルへ
- 
- Q & A

