---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "Claude Code スキルガイドライン"
footer: "© 2026 Claude Code Skills Guide"
style: |
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

- チームリーダー・マネージャーのための完全ガイド
- 2026年2月


---

# アジェンダ

- 1. **Claude Code スキルとは** — 仕組みと種類
- 2. **既存スキル一覧** — 6スキルの詳細解説
- 3. **実践ユースケース** — 5シナリオの効果測定
- 4. **カスタムスキル作成** — 設計ガイドライン
- 5. **チーム導入戦略** — ロードマップ・ガバナンス
- 6. **まとめ** — 今日から始める3ステップ


---

# なぜ今、スキルが重要か

- <svg viewBox='0 0 780 210' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='20' width='215' height='170' rx='12' fill='#5B21B6'/><circle cx='137' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='137' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>01</text><text x='137' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>標準化</text><text x='137' y='147' text-anchor='middle' fill='#DDD6FE' font-size='13'>誰でも同品質</text><text x='137' y='167' text-anchor='middle' fill='#C4B5FD' font-size='12'>プロンプト不要</text><rect x='283' y='20' width='215' height='170' rx='12' fill='#1D4ED8'/><circle cx='390' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='390' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>02</text><text x='390' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>再利用</text><text x='390' y='147' text-anchor='middle' fill='#BFDBFE' font-size='13'>一度作れば</text><text x='390' y='167' text-anchor='middle' fill='#93C5FD' font-size='12'>何度でも活用</text><rect x='536' y='20' width='215' height='170' rx='12' fill='#065F46'/><circle cx='643' cy='72' r='32' fill='rgba(255,255,255,0.15)'/><text x='643' y='81' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>03</text><text x='643' y='122' text-anchor='middle' fill='white' font-size='18' font-weight='bold'>組織資産化</text><text x='643' y='147' text-anchor='middle' fill='#A7F3D0' font-size='13'>ナレッジの</text><text x='643' y='167' text-anchor='middle' fill='#6EE7B7' font-size='12'>属人化を排除</text></svg>


---

<!-- _class: lead -->
# Claude Code スキルとは


---

# スキルとは何か

- スキル = 特定タスクに特化した **AI エージェントの行動定義**
- `SKILL.md` ファイルにワークフロー・ルール・チェックリストを記述
- `/コマンド` で呼び出し: `/create-slides`, `/ship`, `/agent-teams` など
- フェーズごとの対話設計でミスを防止し、品質を保証
- 一度定義すれば、チーム全員が同品質で使えるテンプレート
- 組み込みスキル（6種）とチーム固有のカスタムスキルが利用可能


---

# SKILL.md の仕組み — 実行フロー

- <svg viewBox='0 0 800 130' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='40' width='130' height='50' rx='8' fill='#5B21B6'/><text x='75' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>SKILL.md</text><text x='75' y='78' text-anchor='middle' fill='#DDD6FE' font-size='11'>定義ファイル</text><line x1='140' y1='65' x2='165' y2='65' stroke='#A78BFA' stroke-width='2'/><polygon points='172,65 162,60 162,70' fill='#A78BFA'/><rect x='172' y='40' width='130' height='50' rx='8' fill='#1D4ED8'/><text x='237' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>/コマンド</text><text x='237' y='78' text-anchor='middle' fill='#BFDBFE' font-size='11'>呼び出し</text><line x1='302' y1='65' x2='327' y2='65' stroke='#60A5FA' stroke-width='2'/><polygon points='334,65 324,60 324,70' fill='#60A5FA'/><rect x='334' y='40' width='130' height='50' rx='8' fill='#065F46'/><text x='399' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>フェーズ実行</text><text x='399' y='78' text-anchor='middle' fill='#A7F3D0' font-size='11'>対話・処理</text><line x1='464' y1='65' x2='489' y2='65' stroke='#34D399' stroke-width='2'/><polygon points='496,65 486,60 486,70' fill='#34D399'/><rect x='496' y='40' width='130' height='50' rx='8' fill='#92400E'/><text x='561' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>バリデーション</text><text x='561' y='78' text-anchor='middle' fill='#FDE68A' font-size='11'>品質検証</text><line x1='626' y1='65' x2='651' y2='65' stroke='#FBBF24' stroke-width='2'/><polygon points='658,65 648,60 648,70' fill='#FBBF24'/><rect x='658' y='40' width='130' height='50' rx='8' fill='#1F2937'/><rect x='658' y='40' width='130' height='50' rx='8' fill='none' stroke='#6B7280' stroke-width='1.5'/><text x='723' y='61' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>完了・報告</text><text x='723' y='78' text-anchor='middle' fill='#9CA3AF' font-size='11'>出力確認</text></svg>
- `.claude/skills/<name>/SKILL.md` に配置するだけで `/コマンド` として自動登録
- **エラー時**: セルフヒーリングループ（最大3回リトライ）で自動修正


---

# スキルの種類 — 組み込み vs カスタム

- <svg viewBox='0 0 760 230' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='20' width='340' height='200' rx='12' fill='rgba(91,33,182,0.3)' stroke='#7C3AED' stroke-width='2'/><text x='190' y='55' text-anchor='middle' fill='#DDD6FE' font-size='16' font-weight='bold'>組み込みスキル（6種）</text><text x='190' y='78' text-anchor='middle' fill='#C4B5FD' font-size='13'>プロジェクトに標準搭載・即使用可能</text><text x='50' y='108' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='108' fill='white' font-size='13'>/create-slides</text><text x='50' y='130' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='130' fill='white' font-size='13'>/generate</text><text x='50' y='152' fill='#A78BFA' font-size='13'>▸</text><text x='65' y='152' fill='white' font-size='13'>/review-slides</text><text x='205' y='108' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='108' fill='white' font-size='13'>/ship</text><text x='205' y='130' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='130' fill='white' font-size='13'>/agent-teams</text><text x='205' y='152' fill='#A78BFA' font-size='13'>▸</text><text x='220' y='152' fill='white' font-size='13'>/validate</text><text x='190' y='200' text-anchor='middle' fill='#8B5CF6' font-size='11'>設定不要・すぐ使える</text><rect x='400' y='20' width='340' height='200' rx='12' fill='rgba(29,78,216,0.3)' stroke='#3B82F6' stroke-width='2'/><text x='570' y='55' text-anchor='middle' fill='#BFDBFE' font-size='16' font-weight='bold'>カスタムスキル</text><text x='570' y='78' text-anchor='middle' fill='#93C5FD' font-size='13'>チーム固有のワークフローを定義</text><text x='425' y='108' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='108' fill='white' font-size='13'>/weekly-report</text><text x='425' y='130' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='130' fill='white' font-size='13'>/doc-update</text><text x='425' y='152' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='152' fill='white' font-size='13'>/onboarding</text><text x='425' y='174' fill='#60A5FA' font-size='13'>▸</text><text x='440' y='174' fill='white' font-size='13'>/deploy-check</text><text x='570' y='200' text-anchor='middle' fill='#3B82F6' font-size='11'>チームのナレッジを資産化</text></svg>


---

# 呼び出し方と統合

- `/skill-name` でコマンドラインから直接呼び出し（設定不要）
- Claude Code CLI と完全統合: `.claude/skills/` 配下を自動スキャン
- Codex (OpenAI) にも同じスキルを配布可能: `.codex/skills/`

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

- <svg viewBox='0 0 760 230' style='max-height:63vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='10' width='330' height='210' rx='12' fill='rgba(127,29,29,0.4)' stroke='#EF4444' stroke-width='2'/><text x='185' y='48' text-anchor='middle' fill='#FCA5A5' font-size='20' font-weight='bold'>BEFORE</text><line x1='50' y1='60' x2='320' y2='60' stroke='#EF4444' stroke-width='1' opacity='0.5'/><text x='50' y='88' fill='#FECACA' font-size='13'>毎回プロンプトを手書き</text><text x='50' y='112' fill='#FECACA' font-size='13'>品質がバラバラ</text><text x='50' y='136' fill='#FECACA' font-size='13'>ノウハウが属人化</text><text x='50' y='160' fill='#FECACA' font-size='13'>新人は使いこなせない</text><text x='50' y='184' fill='#FECACA' font-size='13'>繰り返し作業に時間を浪費</text><line x1='355' y1='115' x2='395' y2='115' stroke='#34D399' stroke-width='3'/><polygon points='402,115 392,109 392,121' fill='#34D399'/><rect x='410' y='10' width='330' height='210' rx='12' fill='rgba(6,78,59,0.4)' stroke='#10B981' stroke-width='2'/><text x='575' y='48' text-anchor='middle' fill='#6EE7B7' font-size='20' font-weight='bold'>AFTER</text><line x1='440' y1='60' x2='710' y2='60' stroke='#10B981' stroke-width='1' opacity='0.5'/><text x='440' y='88' fill='#A7F3D0' font-size='13'>/コマンドで即起動</text><text x='440' y='112' fill='#A7F3D0' font-size='13'>品質が均一・再現性あり</text><text x='440' y='136' fill='#A7F3D0' font-size='13'>ナレッジが組織の資産に</text><text x='440' y='160' fill='#A7F3D0' font-size='13'>新人でも即日高品質</text><text x='440' y='184' fill='#A7F3D0' font-size='13'>繰り返し作業を自動化</text></svg>


---

<!-- _class: lead -->
# 既存スキル一覧


---

# /create-slides — プレゼン自動作成

- **目的**: 対話型でスライドをゼロから自動生成（8フェーズ）
- **入力**: トピック・対象者・時間・デザインを対話式で質問
- **出力**: HTML/PDF スライド（Marp形式、50枚規模も対応）
- **特徴**: アウトライン確認 → JSON生成 → レビューループ → セルフヒーリング
- **適用場面**: 技術資料・研修資料・提案書の迅速な作成
- **効果**: 5時間の資料作成 → 30〜45分（**90%削減**）


---

# /generate & /review-slides

- **`/generate` — 高速レンダリング**
-   → 既存の `slides-data.json` から即 HTML 生成（非対話）
-   → テンプレート再利用による高速スライド量産に最適
- 
- **`/review-slides` — スライドレビュー**
-   → 生成済み `.md` ファイルのレビューと改善提案を自動生成
-   → チェック項目: コンテンツ品質・デザイン整合性・情報密度
-   → 重要プレゼン前の品質ゲートとして活用


---

# /ship — Git 操作の自動化

- **目的**: ステージング → コミット → プッシュを一括実行
- **特徴**: AI がコミットメッセージを自動生成（日本語/英語）
- **安全機能**: 危険な操作（force push 等）は明示的確認が必要
- **適用場面**: 作業完了後の素早いコミット・チーム共有

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

- <svg viewBox='0 0 780 275' style='max-height:65vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='8' width='760' height='42' rx='8' fill='#374151'/><text x='390' y='34' text-anchor='middle' fill='#9CA3AF' font-size='14'>tmux session</text><rect x='10' y='58' width='760' height='68' rx='0' fill='#1E1B4B'/><rect x='10' y='58' width='760' height='68' rx='0' fill='none' stroke='#4C1D95' stroke-width='2'/><text x='390' y='86' text-anchor='middle' fill='#A78BFA' font-size='15' font-weight='bold'>Leader (pane 0)</text><text x='390' y='110' text-anchor='middle' fill='#6D6D9E' font-size='12'>タスク分解 / 割当 / 進捗管理 / レビュー結果判定</text><rect x='10' y='136' width='375' height='65' fill='#0F172A'/><rect x='10' y='136' width='375' height='65' fill='none' stroke='#1D4ED8' stroke-width='2'/><text x='197' y='162' text-anchor='middle' fill='#60A5FA' font-size='14' font-weight='bold'>Impl-1 (pane 1)</text><text x='197' y='184' text-anchor='middle' fill='#3B5998' font-size='12'>Claude Code — 実装ワーカー</text><rect x='395' y='136' width='375' height='65' fill='#0F172A'/><rect x='395' y='136' width='375' height='65' fill='none' stroke='#1D4ED8' stroke-width='2'/><text x='582' y='162' text-anchor='middle' fill='#60A5FA' font-size='14' font-weight='bold'>Impl-2 (pane 2)</text><text x='582' y='184' text-anchor='middle' fill='#3B5998' font-size='12'>Claude Code — 実装ワーカー</text><rect x='10' y='211' width='375' height='55' fill='#0F2D2A'/><rect x='10' y='211' width='375' height='55' fill='none' stroke='#065F46' stroke-width='2'/><text x='197' y='235' text-anchor='middle' fill='#34D399' font-size='14' font-weight='bold'>Review-1 (pane 3)</text><text x='197' y='255' text-anchor='middle' fill='#6EE7B7' font-size='12'>Codex — コードレビュー</text><rect x='395' y='211' width='375' height='55' fill='#0F2D2A'/><rect x='395' y='211' width='375' height='55' fill='none' stroke='#065F46' stroke-width='2'/><text x='582' y='235' text-anchor='middle' fill='#34D399' font-size='14' font-weight='bold'>Review-2 (pane 4)</text><text x='582' y='255' text-anchor='middle' fill='#6EE7B7' font-size='12'>Codex — コードレビュー</text></svg>


---

# /validate — スキーマ検証

- **目的**: スライドデータと設定ファイルの事前品質チェック
- **入力**: `slides-data.json` + `slides.config.yaml`
- **検証内容**: フィールド名・型・enum値・必須項目
- **自動修正**: `bun run fix` で一般的なエラーを自動修正
- **PostToolUse フック**: `slides-data.json` 書き込み時に自動実行
- **適用場面**: 生成後・レンダリング前の品質ゲートとして必須


---

# 全スキル比較マトリクス

- <svg viewBox='0 0 760 285' style='max-height:68vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='360' height='80' rx='8' fill='#3B0764'/><text x='190' y='38' text-anchor='middle' fill='#C4B5FD' font-size='14' font-weight='bold'>/create-slides</text><text x='190' y='58' text-anchor='middle' fill='white' font-size='12'>プレゼン自動作成（8フェーズ）</text><text x='190' y='76' text-anchor='middle' fill='#A78BFA' font-size='11'>対話型 | HTML/PDF出力 | 90%削減</text><rect x='390' y='10' width='360' height='80' rx='8' fill='#1E3A8A'/><text x='570' y='38' text-anchor='middle' fill='#BFDBFE' font-size='14' font-weight='bold'>/generate</text><text x='570' y='58' text-anchor='middle' fill='white' font-size='12'>JSON → Marp → HTML 高速変換</text><text x='570' y='76' text-anchor='middle' fill='#60A5FA' font-size='11'>非対話 | 量産向け | 高速</text><rect x='10' y='103' width='360' height='80' rx='8' fill='#064E3B'/><text x='190' y='131' text-anchor='middle' fill='#A7F3D0' font-size='14' font-weight='bold'>/review-slides</text><text x='190' y='151' text-anchor='middle' fill='white' font-size='12'>スライドレビュー・改善提案</text><text x='190' y='169' text-anchor='middle' fill='#34D399' font-size='11'>品質向上 | 既存MD対応</text><rect x='390' y='103' width='360' height='80' rx='8' fill='#7C2D12'/><text x='570' y='131' text-anchor='middle' fill='#FED7AA' font-size='14' font-weight='bold'>/ship</text><text x='570' y='151' text-anchor='middle' fill='white' font-size='12'>Git: Stage → Commit → Push</text><text x='570' y='169' text-anchor='middle' fill='#FB923C' font-size='11'>一括操作 | AIメッセージ生成</text><rect x='10' y='196' width='360' height='80' rx='8' fill='#1F2937'/><rect x='10' y='196' width='360' height='80' rx='8' fill='none' stroke='#4B5563' stroke-width='1.5'/><text x='190' y='224' text-anchor='middle' fill='#E5E7EB' font-size='14' font-weight='bold'>/agent-teams</text><text x='190' y='244' text-anchor='middle' fill='white' font-size='12'>Claude + Codex 並列実行</text><text x='190' y='262' text-anchor='middle' fill='#9CA3AF' font-size='11'>tmux | 大規模タスク | 2-4倍速</text><rect x='390' y='196' width='360' height='80' rx='8' fill='#14532D'/><text x='570' y='224' text-anchor='middle' fill='#BBF7D0' font-size='14' font-weight='bold'>/validate</text><text x='570' y='244' text-anchor='middle' fill='white' font-size='12'>スキーマ検証・エラー検出</text><text x='570' y='262' text-anchor='middle' fill='#4ADE80' font-size='11'>自動修正 | 品質ゲート</text></svg>


---

# スキル選択ガイド

- **新規プレゼン作成**: `/create-slides`（対話型・品質重視）
- **既存テンプレートから量産**: `/generate`（高速・非対話）
- **作成済みスライドの改善**: `/review-slides`
- **作業完了後のコミット**: `/ship`
- **大規模・複数ファイル並列処理**: `/agent-teams`
- **データ品質チェック**: `/validate`（他スキル実行前に使用）


---

<!-- _class: lead -->
# 実践ユースケース


---

# 5つのユースケース概要

- <svg viewBox='0 0 780 165' style='max-height:52vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='140' height='145' rx='10' fill='#4C1D95'/><rect x='10' y='10' width='140' height='42' rx='10' fill='#6D28D9'/><rect x='10' y='30' width='140' height='22' fill='#6D28D9'/><text x='80' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>01</text><text x='80' y='78' text-anchor='middle' fill='#DDD6FE' font-size='13' font-weight='bold'>プレゼン</text><text x='80' y='98' text-anchor='middle' fill='#C4B5FD' font-size='11'>資料自動作成</text><text x='80' y='118' text-anchor='middle' fill='#A78BFA' font-size='12' font-weight='bold'>-90%</text><text x='80' y='140' text-anchor='middle' fill='#8B5CF6' font-size='10'>/create-slides</text><rect x='160' y='10' width='140' height='145' rx='10' fill='#1E3A8A'/><rect x='160' y='10' width='140' height='42' rx='10' fill='#2563EB'/><rect x='160' y='30' width='140' height='22' fill='#2563EB'/><text x='230' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>02</text><text x='230' y='78' text-anchor='middle' fill='#BFDBFE' font-size='13' font-weight='bold'>並列開発</text><text x='230' y='98' text-anchor='middle' fill='#93C5FD' font-size='11'>コードレビュー</text><text x='230' y='118' text-anchor='middle' fill='#60A5FA' font-size='12' font-weight='bold'>-75%</text><text x='230' y='140' text-anchor='middle' fill='#3B82F6' font-size='10'>/agent-teams</text><rect x='310' y='10' width='140' height='145' rx='10' fill='#064E3B'/><rect x='310' y='10' width='140' height='42' rx='10' fill='#059669'/><rect x='310' y='30' width='140' height='22' fill='#059669'/><text x='380' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>03</text><text x='380' y='78' text-anchor='middle' fill='#A7F3D0' font-size='13' font-weight='bold'>ドキュメント</text><text x='380' y='98' text-anchor='middle' fill='#6EE7B7' font-size='11'>自動整備</text><text x='380' y='118' text-anchor='middle' fill='#34D399' font-size='12' font-weight='bold'>大幅削減</text><text x='380' y='140' text-anchor='middle' fill='#10B981' font-size='10'>カスタムスキル</text><rect x='460' y='10' width='140' height='145' rx='10' fill='#78350F'/><rect x='460' y='10' width='140' height='42' rx='10' fill='#D97706'/><rect x='460' y='30' width='140' height='22' fill='#D97706'/><text x='530' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>04</text><text x='530' y='78' text-anchor='middle' fill='#FDE68A' font-size='13' font-weight='bold'>オンボーディング</text><text x='530' y='98' text-anchor='middle' fill='#FCD34D' font-size='11'>加速</text><text x='530' y='118' text-anchor='middle' fill='#FBBF24' font-size='12' font-weight='bold'>-60%</text><text x='530' y='140' text-anchor='middle' fill='#F59E0B' font-size='10'>カスタムスキル</text><rect x='610' y='10' width='140' height='145' rx='10' fill='#1F2937'/><rect x='610' y='10' width='140' height='42' rx='10' fill='#4B5563'/><rect x='610' y='30' width='140' height='22' fill='#4B5563'/><text x='680' y='38' text-anchor='middle' fill='white' font-size='22' font-weight='bold'>05</text><text x='680' y='78' text-anchor='middle' fill='#E5E7EB' font-size='13' font-weight='bold'>進捗レポート</text><text x='680' y='98' text-anchor='middle' fill='#D1D5DB' font-size='11'>自動生成</text><text x='680' y='118' text-anchor='middle' fill='#9CA3AF' font-size='12' font-weight='bold'>-83%</text><text x='680' y='140' text-anchor='middle' fill='#6B7280' font-size='10'>カスタムスキル</text></svg>


---

# UC1: 技術資料の自動作成

- **シナリオ**: 毎週の技術共有会・社内勉強会のスライドを効率化
- **従来の課題**: 資料作成に毎回 **3〜5時間** を要していた
- **解決策**: `/create-slides` で対話型生成
- **手順**: ① `/create-slides` 起動 → ② トピック・対象者・時間を回答 → ③ 生成スライドをレビュー
- **月次換算**: 4回/月 × 12ヶ月 = 年48回の効率化
- **年間削減**: 約 **200時間**（エンジニア1名分の稼働に相当）


---

# UC1: 導入効果の数値

- **作業時間**: 3〜5時間 → 30〜45分（**90%削減**）
- **品質向上**: アウトライン確認 + フィードバックループで反復改善
- **副次効果**: 登壇のハードルが下がりチーム全員が発表に参加
- **スケール**: 月4回の勉強会すべてに適用で年200時間節約
- **ROI**: ツール習得 2時間 → 初回から元が取れる


---

# UC2: 並列コードレビュー・リファクタリング

- **シナリオ**: 大規模リファクタリング（20ファイル以上）を効率化
- **従来の課題**: 順次処理で **3日** かかる作業
- **解決策**: `/agent-teams` で並列分散処理
- **手順**: ① Leader がファイルをタスク分割 → ② 実装ワーカーが並列リファクタリング → ③ Codex レビューワーが自動コードレビュー
- **タスク管理**: `.agent-teams/` の JSON で進捗を可視化
- **リスク低減**: 各タスクが独立したファイルセットで競合なし


---

# UC2: 導入効果 — 時間比較

- <svg viewBox='0 0 760 200' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><text x='380' y='25' text-anchor='middle' fill='#D1D5DB' font-size='14' font-weight='bold'>導入前後の作業時間比較</text><text x='55' y='58' text-anchor='end' fill='#9CA3AF' font-size='11'>並列開発</text><text x='55' y='93' text-anchor='end' fill='#9CA3AF' font-size='11'>プレゼン</text><text x='55' y='128' text-anchor='end' fill='#9CA3AF' font-size='11'>ドキュメント</text><text x='55' y='163' text-anchor='end' fill='#9CA3AF' font-size='11'>レポート</text><rect x='60' y='42' width='580' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='648' y='57' fill='#FCA5A5' font-size='11'>3日</text><rect x='60' y='77' width='380' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='448' y='92' fill='#FCA5A5' font-size='11'>5時間</text><rect x='60' y='112' width='340' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='408' y='127' fill='#FCA5A5' font-size='11'>100時間</text><rect x='60' y='147' width='175' height='22' rx='4' fill='#EF4444' opacity='0.7'/><text x='243' y='162' fill='#FCA5A5' font-size='11'>30分</text><rect x='60' y='42' width='145' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='210' y='57' fill='#6EE7B7' font-size='11'>8時間(-75%)</text><rect x='60' y='77' width='38' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='103' y='92' fill='#6EE7B7' font-size='11'>45分(-90%)</text><rect x='60' y='112' width='35' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='100' y='127' fill='#6EE7B7' font-size='11'>半日(-96%)</text><rect x='60' y='147' width='18' height='22' rx='4' fill='#10B981' opacity='0.9'/><text x='82' y='162' fill='#6EE7B7' font-size='11'>5分(-83%)</text><rect x='540' y='150' width='14' height='14' rx='2' fill='#EF4444'/><text x='558' y='161' fill='#FCA5A5' font-size='11'>導入前</text><rect x='620' y='150' width='14' height='14' rx='2' fill='#10B981'/><text x='638' y='161' fill='#6EE7B7' font-size='11'>導入後</text></svg>


---

# UC3: ドキュメント自動整備

- **シナリオ**: 放置されているコードドキュメントを一括整備
- **従来の課題**: 100ファイルを手動更新するのは現実的でない
- **解決策**: カスタムスキル `/doc-update` を作成して一括処理
- **処理内容**: ファイル一覧取得 → コード解析 → JSDoc/docstring 自動生成
- **一貫性**: SKILL.md のスタイルガイドで統一フォーマット
- **再実行**: 新機能追加のたびに同スキルで即座に更新


---

# UC3: 導入効果

- **作業量**: 100ファイル × 1時間 → **半日で完了**
- **チーム便益**: 新メンバーがコードを理解する時間が **50%短縮**
- **再利用**: 初期スキル作成 2時間 → 毎回 10時間以上節約
- **鮮度維持**: スキル再実行でドキュメントを常に最新状態に保持
- **ROI**: 3回実行で投資回収完了


---

# UC4: オンボーディングの加速

- **シナリオ**: 新入社員が1日でプロジェクト概要を把握できる資料作成
- **従来の課題**: 先輩エンジニアが1〜2週間かけてレクチャー
- **解決策**: カスタムスキル `/onboarding-doc` で資料自動生成
- **生成コンテンツ**: アーキテクチャ図（SVG）・API仕様書・よくあるエラー集
- **資料鮮度**: コード変更時にスキル再実行で自動更新
- **スケール**: 人員増加時も追加コストなし


---

# UC4: 導入効果

- **オンボーディング期間**: 2週間 → 3〜5日（**60〜75%短縮**）
- **先輩負担**: レクチャー時間 20時間 → 5時間（**75%削減**）
- **品質均一化**: 新メンバーの立ち上がりスピードが安定
- **コスト**: 初期スキル作成 4時間 → 以降は追加コストゼロ
- **副次効果**: 先輩が本来の開発業務に集中できる時間が増加


---

# UC5: 週次進捗レポートの自動生成

- **シナリオ**: 週次の進捗報告スライドを Git ログから自動生成
- **解決策**: カスタムスキル `/weekly-report`
- **処理内容**: Git ログ解析 → 完了タスク抽出 → スライド自動生成
- **効果**: 30分のレポート作成 → 5分（**83%削減**）
- **データ精度**: 人手集計より正確（コミットから直接抽出）
- **展開**: Sprint Review・Stakeholder レポートに活用


---

<!-- _class: lead -->
# カスタムスキル作成ガイドライン


---

# スキルのディレクトリ構造

- `.claude/skills/<name>/SKILL.md` に配置するだけで自動登録
- Codex 用: `.codex/skills/` に同期（`bash .codex/install-skills.sh`）
- Git リポジトリで一括管理・バージョン管理が可能

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

- フロントマター・概要・ワークフロー・重要ルールの4要素が必須

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

- <svg viewBox='0 0 760 200' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='20' width='160' height='60' rx='8' fill='#4C1D95'/><text x='90' y='45' text-anchor='middle' fill='#C4B5FD' font-size='11'>Phase 1</text><text x='90' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>ヒアリング</text><line x1='170' y1='50' x2='188' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='195,50 185,45 185,55' fill='#6B7280'/><rect x='195' y='20' width='160' height='60' rx='8' fill='#1E3A8A'/><text x='275' y='45' text-anchor='middle' fill='#BFDBFE' font-size='11'>Phase 2</text><text x='275' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>構成設計</text><line x1='355' y1='50' x2='373' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='380,50 370,45 370,55' fill='#6B7280'/><rect x='380' y='20' width='160' height='60' rx='8' fill='#065F46'/><text x='460' y='45' text-anchor='middle' fill='#A7F3D0' font-size='11'>Phase 3</text><text x='460' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>Config生成</text><line x1='540' y1='50' x2='558' y2='50' stroke='#6B7280' stroke-width='2'/><polygon points='565,50 555,45 555,55' fill='#6B7280'/><rect x='565' y='20' width='160' height='60' rx='8' fill='#7C2D12'/><text x='645' y='45' text-anchor='middle' fill='#FED7AA' font-size='11'>Phase 4</text><text x='645' y='63' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>データ生成</text><line x1='645' y1='80' x2='645' y2='108' stroke='#6B7280' stroke-width='2'/><polygon points='645,115 640,105 650,105' fill='#6B7280'/><rect x='565' y='115' width='160' height='60' rx='8' fill='#7C3AED'/><text x='645' y='140' text-anchor='middle' fill='#EDE9FE' font-size='11'>Phase 5</text><text x='645' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>レンダリング</text><line x1='565' y1='145' x2='547' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='540,145 550,140 550,150' fill='#6B7280'/><rect x='380' y='115' width='160' height='60' rx='8' fill='#0369A1'/><text x='460' y='140' text-anchor='middle' fill='#BAE6FD' font-size='11'>Phase 6</text><text x='460' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>レビューLoop</text><line x1='380' y1='145' x2='362' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='355,145 365,140 365,150' fill='#6B7280'/><rect x='195' y='115' width='160' height='60' rx='8' fill='#166534'/><text x='275' y='140' text-anchor='middle' fill='#BBF7D0' font-size='11'>Phase 7</text><text x='275' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>デザイン調整</text><line x1='195' y1='145' x2='177' y2='145' stroke='#6B7280' stroke-width='2'/><polygon points='170,145 180,140 180,150' fill='#6B7280'/><rect x='10' y='115' width='160' height='60' rx='8' fill='#1F2937'/><rect x='10' y='115' width='160' height='60' rx='8' fill='none' stroke='#34D399' stroke-width='2'/><text x='90' y='140' text-anchor='middle' fill='#6EE7B7' font-size='11'>Phase 8</text><text x='90' y='158' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>エクスポート</text></svg>


---

# ヒアリングフェーズの設計

- **1問1答**: 複数質問をまとめて投げない（1質問 → 回答 → 次の質問）
- **選択肢提示**: 自由回答より選択式で迷いを減らす（最大4択）
- **`AskUserQuestion` ツール**: 構造化された質問UI で回答を収集
- **段階的深掘り**: 概要質問 → 詳細質問の順で展開
- **承認確認**: 構成アウトラインを提示してから実行開始
- **デフォルト値**: 最も一般的な選択肢を最初に提示して迷いを防ぐ


---

# AskUserQuestion の活用

- 構造化された選択肢UIでユーザーの意思決定を最適化

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

- **バリデーションエラーの種類と自動修正**:
-   → フィールド名ミス: `bullets` → `content` に自動置換
-   → 無効な enum 値: `layout: 'custom'` → `'default'` に修正
-   → 必須フィールド欠損: スキーマ定義から補完
- **修正後に再検証**: エラーなしを確認してから書き込み
- **3回失敗したら停止**: エラー内容と手動修正手順をユーザーに報告


---

# セルフヒーリングパターン

- <svg viewBox='0 0 760 195' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='30' y='68' width='130' height='60' rx='8' fill='#4C1D95'/><text x='95' y='103' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>実行</text><line x1='160' y1='98' x2='188' y2='98' stroke='#A78BFA' stroke-width='2'/><polygon points='195,98 185,93 185,103' fill='#A78BFA'/><rect x='195' y='68' width='130' height='60' rx='8' fill='#1E3A8A'/><text x='260' y='103' text-anchor='middle' fill='white' font-size='15' font-weight='bold'>検証</text><line x1='325' y1='98' x2='353' y2='98' stroke='#60A5FA' stroke-width='2'/><polygon points='360,98 350,93 350,103' fill='#60A5FA'/><rect x='360' y='68' width='160' height='60' rx='8' fill='#92400E'/><text x='440' y='95' text-anchor='middle' fill='white' font-size='13' font-weight='bold'>問題検出？</text><text x='440' y='115' text-anchor='middle' fill='#FDE68A' font-size='11'>Yes / No</text><line x1='520' y1='83' x2='548' y2='83' stroke='#34D399' stroke-width='2'/><polygon points='555,83 545,78 545,88' fill='#34D399'/><rect x='555' y='63' width='100' height='45' rx='8' fill='#065F46'/><text x='605' y='91' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>完了</text><text x='470' y='58' fill='#34D399' font-size='11' text-anchor='middle'>No →</text><line x1='440' y1='128' x2='440' y2='155' stroke='#EF4444' stroke-width='2'/><polygon points='440,162 435,152 445,152' fill='#EF4444'/><rect x='320' y='162' width='240' height='30' rx='8' fill='#374151'/><text x='440' y='182' text-anchor='middle' fill='#D1D5DB' font-size='13'>自動修正（最大3回）</text><line x1='320' y1='177' x2='95' y2='177' stroke='#EF4444' stroke-width='2'/><line x1='95' y1='177' x2='95' y2='128' stroke='#EF4444' stroke-width='2'/><polygon points='95,128 90,138 100,138' fill='#EF4444'/><text x='460' y='148' fill='#FCA5A5' font-size='11'>Yes</text><text x='180' y='170' fill='#9CA3AF' font-size='10'>フィードバックループ</text></svg>


---

# アンチパターン (1/2)

- ❌ **複数質問の一括投げ**: 全質問を最初に並べない
-   → ✅ 1フェーズ1質問、承認を得てから次へ進む
- ❌ **曖昧な指示**: 「良いスライドを作って」だけでは不十分
-   → ✅ フェーズ・チェックリスト・具体的な検証条件を記述
- ❌ **バリデーション省略**: 生成後すぐに出力しない
-   → ✅ 必ずスキーマ照合 → エラーなし確認 → ファイル書き込み


---

# アンチパターン (2/2)

- ❌ **エラー無視**: 失敗しても無視して続行する
-   → ✅ セルフヒーリングループで最大3回リトライ
- ❌ **機能の詰め込み**: 1スキルに全機能を入れる
-   → ✅ 1スキル1目的（単一責任原則）
- ❌ **ハードコード**: パスや設定を固定値で埋め込む
-   → ✅ YAML 設定ファイルや対話入力で柔軟に対応


---

# スキルレビューチェックリスト

- **構造**: フロントマター・ワークフロー・ルールが揃っているか
- **対話設計**: `AskUserQuestion` で承認ゲートを設けているか
- **バリデーション**: Pre-flight と Post-generation の両方があるか
- **エラーハンドリング**: 失敗時のリカバリが定義されているか
- **完了報告**: 標準テンプレートに沿った報告をしているか
- **テスト**: ドライランで期待通りに動作するか確認済みか


---

<!-- _class: lead -->
# チーム導入戦略


---

# 段階的導入ロードマップ

- <svg viewBox='0 0 760 215' style='max-height:62vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='40' y='98' width='700' height='8' rx='4' fill='#374151'/><circle cx='120' cy='102' r='20' fill='#4C1D95'/><text x='120' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>1</text><rect x='58' y='30' width='124' height='58' rx='8' fill='rgba(76,29,149,0.3)' stroke='#6D28D9' stroke-width='1.5'/><line x1='120' y1='88' x2='120' y2='82' stroke='#6B7280' stroke-width='1.5'/><text x='120' y='50' text-anchor='middle' fill='#A78BFA' font-size='12' font-weight='bold'>Week 1-2</text><text x='120' y='68' text-anchor='middle' fill='white' font-size='12'>パイロット</text><text x='120' y='82' text-anchor='middle' fill='#C4B5FD' font-size='10'>1-2名で試験</text><circle cx='310' cy='102' r='20' fill='#1E3A8A'/><text x='310' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>2</text><rect x='248' y='30' width='124' height='58' rx='8' fill='rgba(30,58,138,0.3)' stroke='#2563EB' stroke-width='1.5'/><line x1='310' y1='88' x2='310' y2='82' stroke='#6B7280' stroke-width='1.5'/><text x='310' y='50' text-anchor='middle' fill='#60A5FA' font-size='12' font-weight='bold'>Week 3-4</text><text x='310' y='68' text-anchor='middle' fill='white' font-size='12'>チーム展開</text><text x='310' y='82' text-anchor='middle' fill='#93C5FD' font-size='10'>全員にインストール</text><circle cx='500' cy='102' r='20' fill='#065F46'/><text x='500' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>3</text><rect x='438' y='135' width='124' height='58' rx='8' fill='rgba(6,95,70,0.3)' stroke='#059669' stroke-width='1.5'/><line x1='500' y1='122' x2='500' y2='135' stroke='#6B7280' stroke-width='1.5'/><text x='500' y='155' text-anchor='middle' fill='#34D399' font-size='12' font-weight='bold'>Month 2</text><text x='500' y='173' text-anchor='middle' fill='white' font-size='12'>カスタム化</text><text x='500' y='187' text-anchor='middle' fill='#6EE7B7' font-size='10'>独自スキル開発</text><circle cx='690' cy='102' r='20' fill='#92400E'/><text x='690' y='108' text-anchor='middle' fill='white' font-size='12' font-weight='bold'>4</text><rect x='628' y='135' width='124' height='58' rx='8' fill='rgba(146,64,14,0.3)' stroke='#D97706' stroke-width='1.5'/><line x1='690' y1='122' x2='690' y2='135' stroke='#6B7280' stroke-width='1.5'/><text x='690' y='155' text-anchor='middle' fill='#FBBF24' font-size='12' font-weight='bold'>Month 3+</text><text x='690' y='173' text-anchor='middle' fill='white' font-size='12'>継続改善</text><text x='690' y='187' text-anchor='middle' fill='#FCD34D' font-size='10'>KPIレビュー</text></svg>


---

# スキルガバナンスの設計

- **スキルオーナー制度**: 各スキルに担当者を設定し責任を明確化
- **レビュープロセス**: 新スキルは PR レビュー必須（品質確保）
- **テスト要件**: ドライランテスト合格後にマージ
- **バージョン管理**: セマンティックバージョニング（v1.0.0）で変更管理
- **廃止プロセス**: 未使用スキルを定期棚卸し（四半期ごと）
- **セキュリティ**: 破壊的操作を含むスキルの承認ゲートを設定


---

# チームトレーニング計画

- **入門ワークショップ（2時間）**: `/create-slides` と `/ship` の基本操作
- **中級研修（半日）**: カスタムスキルの設計と実装ハンズオン
- **ハンズオン課題**: 各自のユースケースで簡単なスキルを1つ作成
- **ペアプログラミング**: 初回スキル作成は熟練者がサポート
- **ナレッジベース**: Confluence / 社内 Wiki に Tips をまとめる
- **コミュニティ**: Slack チャンネルで事例共有・質問サポート


---

# ROI 測定指標

- <svg viewBox='0 0 760 200' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='170' height='180' rx='12' fill='#1E1B4B'/><rect x='10' y='10' width='170' height='68' rx='12' fill='#4C1D95'/><rect x='10' y='50' width='170' height='28' fill='#4C1D95'/><text x='95' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>90%</text><text x='95' y='75' text-anchor='middle' fill='#DDD6FE' font-size='13'>時間節約</text><text x='95' y='105' text-anchor='middle' fill='#C4B5FD' font-size='11'>繰り返しタスクで</text><text x='95' y='123' text-anchor='middle' fill='#C4B5FD' font-size='11'>50〜90%削減</text><text x='95' y='148' text-anchor='middle' fill='#A78BFA' font-size='11'>月200時間/チーム</text><text x='95' y='168' text-anchor='middle' fill='#8B5CF6' font-size='11'>節約可能</text><rect x='200' y='10' width='170' height='180' rx='12' fill='#0F172A'/><rect x='200' y='10' width='170' height='68' rx='12' fill='#1E3A8A'/><rect x='200' y='50' width='170' height='28' fill='#1E3A8A'/><text x='285' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>75%</text><text x='285' y='75' text-anchor='middle' fill='#BFDBFE' font-size='13'>品質向上</text><text x='285' y='105' text-anchor='middle' fill='#93C5FD' font-size='11'>レビュー指摘数</text><text x='285' y='123' text-anchor='middle' fill='#93C5FD' font-size='11'>75%削減</text><text x='285' y='148' text-anchor='middle' fill='#60A5FA' font-size='11'>バグ率の低下</text><text x='285' y='168' text-anchor='middle' fill='#3B82F6' font-size='11'>品質均一化</text><rect x='390' y='10' width='170' height='180' rx='12' fill='#052E16'/><rect x='390' y='10' width='170' height='68' rx='12' fill='#065F46'/><rect x='390' y='50' width='170' height='28' fill='#065F46'/><text x='475' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>5日</text><text x='475' y='75' text-anchor='middle' fill='#A7F3D0' font-size='13'>OB期間短縮</text><text x='475' y='105' text-anchor='middle' fill='#6EE7B7' font-size='11'>2週間 → 3〜5日</text><text x='475' y='123' text-anchor='middle' fill='#6EE7B7' font-size='11'>（60-75%短縮）</text><text x='475' y='148' text-anchor='middle' fill='#34D399' font-size='11'>先輩負担</text><text x='475' y='168' text-anchor='middle' fill='#10B981' font-size='11'>75%削減</text><rect x='580' y='10' width='170' height='180' rx='12' fill='#1C1917'/><rect x='580' y='10' width='170' height='68' rx='12' fill='#78350F'/><rect x='580' y='50' width='170' height='28' fill='#78350F'/><text x='665' y='46' text-anchor='middle' fill='white' font-size='28' font-weight='bold'>6+</text><text x='665' y='75' text-anchor='middle' fill='#FED7AA' font-size='13'>スキル資産</text><text x='665' y='105' text-anchor='middle' fill='#FDBA74' font-size='11'>組み込み6種</text><text x='665' y='123' text-anchor='middle' fill='#FDBA74' font-size='11'>+チームカスタム</text><text x='665' y='148' text-anchor='middle' fill='#FB923C' font-size='11'>組織ナレッジ</text><text x='665' y='168' text-anchor='middle' fill='#F97316' font-size='11'>の蓄積</text></svg>


---

# よくある課題と対策

- **課題1**: 「スキルが期待通り動かない」
-   → `/validate` でスキーマチェック → `bun run fix` で自動修正
- **課題2**: 「チームへの浸透が遅い」
-   → 成功事例を共有して具体的なメリットを体験させる
- **課題3**: 「スキルが増えて管理が煩雑」
-   → オーナー制度 + 定期棚卸し（四半期ごと）で整理


---

# 成功の鍵 — 6つの要因

- <svg viewBox='0 0 760 200' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='10' y='10' width='225' height='85' rx='10' fill='rgba(76,29,149,0.4)' stroke='#7C3AED' stroke-width='1.5'/><text x='122' y='36' text-anchor='middle' fill='#A78BFA' font-size='13' font-weight='bold'>トップダウンコミット</text><text x='122' y='56' text-anchor='middle' fill='#DDD6FE' font-size='11'>マネージャーが率先して</text><text x='122' y='72' text-anchor='middle' fill='#DDD6FE' font-size='11'>スキルを使って見せる</text><rect x='267' y='10' width='225' height='85' rx='10' fill='rgba(29,78,216,0.4)' stroke='#3B82F6' stroke-width='1.5'/><text x='379' y='36' text-anchor='middle' fill='#60A5FA' font-size='13' font-weight='bold'>小さく始める</text><text x='379' y='56' text-anchor='middle' fill='#BFDBFE' font-size='11'>1スキルで効果を実感</text><text x='379' y='72' text-anchor='middle' fill='#BFDBFE' font-size='11'>してから段階的に拡張</text><rect x='524' y='10' width='225' height='85' rx='10' fill='rgba(6,95,70,0.4)' stroke='#10B981' stroke-width='1.5'/><text x='636' y='36' text-anchor='middle' fill='#34D399' font-size='13' font-weight='bold'>成功事例の可視化</text><text x='636' y='56' text-anchor='middle' fill='#A7F3D0' font-size='11'>時間節約・品質向上の</text><text x='636' y='72' text-anchor='middle' fill='#A7F3D0' font-size='11'>数字を全員で共有</text><rect x='10' y='105' width='225' height='85' rx='10' fill='rgba(146,64,14,0.4)' stroke='#D97706' stroke-width='1.5'/><text x='122' y='131' text-anchor='middle' fill='#FBBF24' font-size='13' font-weight='bold'>心理的安全性</text><text x='122' y='151' text-anchor='middle' fill='#FDE68A' font-size='11'>失敗・試行錯誤を</text><text x='122' y='167' text-anchor='middle' fill='#FDE68A' font-size='11'>奨励する文化</text><rect x='267' y='105' width='225' height='85' rx='10' fill='rgba(31,41,55,0.7)' stroke='#6B7280' stroke-width='1.5'/><text x='379' y='131' text-anchor='middle' fill='#E5E7EB' font-size='13' font-weight='bold'>継続的フィードバック</text><text x='379' y='151' text-anchor='middle' fill='#D1D5DB' font-size='11'>スキル使用後に</text><text x='379' y='167' text-anchor='middle' fill='#D1D5DB' font-size='11'>改善提案を促す</text><rect x='524' y='105' width='225' height='85' rx='10' fill='rgba(17,24,39,0.7)' stroke='#4B5563' stroke-width='1.5'/><text x='636' y='131' text-anchor='middle' fill='#9CA3AF' font-size='13' font-weight='bold'>ナレッジ共有</text><text x='636' y='151' text-anchor='middle' fill='#D1D5DB' font-size='11'>スキルをチーム全員の</text><text x='636' y='167' text-anchor='middle' fill='#D1D5DB' font-size='11'>資産として扱う</text></svg>


---

<!-- _class: lead -->
# まとめ


---

# 重要ポイントの振り返り

- **スキルとは**: 再利用可能なAIワークフローの標準化定義（`SKILL.md`）
- **既存6スキル**: create-slides / generate / review-slides / ship / agent-teams / validate
- **主なユースケース**: プレゼン作成・並列開発・ドキュメント整備など90%の時間削減
- **作成ガイドライン**: 1問1答・承認ゲート・セルフヒーリングが品質の鍵
- **チーム導入**: 段階的展開（Week1〜Month3+）+ ガバナンス設計
- **成功の鍵**: トップダウンのコミット + 小さく始める + 成功事例の共有


---

# 今日から始める3ステップ

- <svg viewBox='0 0 760 200' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='20' y='20' width='210' height='160' rx='12' fill='#2E1065'/><circle cx='125' cy='65' r='35' fill='#4C1D95'/><text x='125' y='73' text-anchor='middle' fill='#DDD6FE' font-size='28' font-weight='bold'>1</text><text x='125' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>体験する</text><text x='125' y='140' text-anchor='middle' fill='#C4B5FD' font-size='11'>/create-slides を試す</text><text x='125' y='158' text-anchor='middle' fill='#A78BFA' font-size='11'>（30分）</text><line x1='230' y1='100' x2='258' y2='100' stroke='#6B7280' stroke-width='2'/><polygon points='265,100 255,95 255,105' fill='#6B7280'/><rect x='275' y='20' width='210' height='160' rx='12' fill='#172554'/><circle cx='380' cy='65' r='35' fill='#1D4ED8'/><text x='380' y='73' text-anchor='middle' fill='#BFDBFE' font-size='28' font-weight='bold'>2</text><text x='380' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>候補を選ぶ</text><text x='380' y='140' text-anchor='middle' fill='#93C5FD' font-size='11'>スキル化タスクを3つ</text><text x='380' y='158' text-anchor='middle' fill='#60A5FA' font-size='11'>リストアップ（1時間）</text><line x1='485' y1='100' x2='513' y2='100' stroke='#6B7280' stroke-width='2'/><polygon points='520,100 510,95 510,105' fill='#6B7280'/><rect x='530' y='20' width='210' height='160' rx='12' fill='#052E16'/><circle cx='635' cy='65' r='35' fill='#059669'/><text x='635' y='73' text-anchor='middle' fill='#A7F3D0' font-size='28' font-weight='bold'>3</text><text x='635' y='118' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>作成・共有</text><text x='635' y='140' text-anchor='middle' fill='#6EE7B7' font-size='11'>1スキルを作成して</text><text x='635' y='158' text-anchor='middle' fill='#34D399' font-size='11'>チームに展開（1日）</text></svg>


---

# 参考リソース

- **公式ドキュメント:**
-   - [Claude Code 公式サイト](https://claude.ai/code)
-   - [Anthropic ドキュメント](https://docs.anthropic.com)
- **プロジェクト内リソース:**
-   - `CLAUDE.md` — プロジェクト全体ガイドライン
-   - `.claude/skills/` — 既存スキルの実装例（6種）
-   - `.claude/rules/` — 詳細ルール集（スキーマ・デザイン等）
-   - `.claude/agents/` — エージェント定義（slide-creator 等）


---

<!-- _class: lead -->
# ご清聴ありがとうございました

- Claude Code スキルでチームの生産性を次のレベルへ
- 
- Q & A

