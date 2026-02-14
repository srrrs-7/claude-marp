# claude-marp

構造化されたJSONデータとYAML設定から、プロフェッショナルなMarpスライドを生成するCLIツール。

スライドの内容はClaude CodeやCodexでローカル生成し、本ツールがMarpマークダウンへのレンダリングとHTML/PDFエクスポートを担う。行動心理学・Googleベストプラクティスに基づくスライド設計ルールを内蔵。

## クイックスタート

```bash
bun install
```

### 方法A: 対話型（推奨）

Claude Code上で `/create-slides` を実行。ヒアリングから最終エクスポートまで対話的に進む。

### 方法B: 手動ワークフロー

```bash
# 1. 設定ファイル作成
bun run slides init

# 2. スライドデータJSON作成（Claude Code / Codexで生成）
# 3. レンダリング
bun run slides render --in docs/slides-data.json

# 4. HTMLエクスポート
bun run slides export -f html --in docs/my-slides.md
```

## パイプライン

```
slides.config.yaml ─┐
                     ├─→ Marpマークダウン ─→ HTML/PDF エクスポート
slides-data.json ────┘
     (Zod検証)            (render)            (export)
```

各スライドは `docs/<yyyymmddhhmmss>_<title>/` に専用ディレクトリを作成し、設定・データ・マークダウン・エクスポート済みファイルをすべて格納する。

```
docs/
└── 20260214063457_ai-era-survival-strategy/
    ├── slides.config.yaml
    ├── slides-data.json
    ├── ai-era-survival-strategy.md
    └── ai-era-survival-strategy.html   # エクスポート後
```

## CLIコマンド

| コマンド | 説明 |
|----------|------|
| `bun run slides init` | `slides.config.yaml` テンプレートを生成 |
| `bun run slides render --in <data.json>` | JSONからMarpマークダウンをレンダリング |
| `bun run slides export -f <html\|pdf\|pptx> --in <file.md>` | マークダウンをエクスポート |

共通オプション: `-c <config.yaml>` / `--config <config.yaml>` で設定ファイルを指定（デフォルト: `slides.config.yaml`）

## 技術スタック

- **ランタイム:** Bun 1.3.5
- **言語:** TypeScript（ESM）
- **バリデーション:** Zod
- **スライドエンジン:** [Marp CLI](https://github.com/marp-team/marp-cli)
- **リンター/フォーマッター:** Biome
- **型チェック:** tsgo（`@typescript/native-preview`）

## スライドデータJSON

```json
{
  "slides": [
    {
      "title": "プレゼンタイトル",
      "content": ["キーポイント1", "キーポイント2"],
      "layout": "center"
    },
    {
      "title": "アーキテクチャ",
      "content": ["コンポーネントA", "コンポーネントB"],
      "code": "const server = Bun.serve({ port: 3000 })",
      "codeLanguage": "typescript",
      "mermaid": "graph TD\n  Client-->API\n  API-->DB",
      "speakerNotes": "ここで構成の全体像を説明する",
      "layout": "default"
    },
    {
      "title": "次のステップ",
      "content": ["ステップ1", "ステップ2", "ステップ3"],
      "layout": "section"
    }
  ]
}
```

| フィールド | 必須 | 説明 |
|------------|------|------|
| `title` | Yes | スライドタイトル |
| `content` | Yes | 箇条書き配列（最大5つ推奨） |
| `layout` | No | `"default"` / `"center"` (タイトル/まとめ) / `"section"` (セクション見出し) |
| `code` | No | コードブロック |
| `codeLanguage` | No | コードの言語（デフォルト: config値） |
| `mermaid` | No | Mermaidダイアグラム定義 |
| `speakerNotes` | No | 発表者ノート（HTMLコメントとして出力） |

## 設定 (slides.config.yaml)

```yaml
topic: "プレゼンテーマ"             # 必須（ファイル名の自動生成にも使用）
audience: "developers"             # 対象者
goal: "目的の説明"                  # プレゼンのゴール
language: "ja"                     # 出力言語

slides:
  count: 10                        # 目安スライド枚数
  includeTableOfContents: true     # 目次スライド
  includeTitleSlide: true          # タイトルスライド
  includeSummarySlide: true        # まとめスライド

marp:
  theme: "gaia"                    # gaia | default | uncover
  size: "16:9"                     # スライドサイズ
  paginate: true                   # ページ番号
  header: ""                       # ヘッダーテキスト
  footer: ""                       # フッターテキスト
  style: ""                        # カスタムCSS

content:
  codeBlocks: true                 # コードブロック有効
  codeLanguage: "typescript"       # デフォルト言語
  mermaidDiagrams: true            # Mermaid図有効
  bulletPointsMax: 5               # 箇条書き上限
  speakerNotes: true               # スピーカーノート有効

output:
  dir: "./docs"                    # マークダウン出力先
  baseName: ""                     # 空 = topicからslug自動生成
```

### テーマ選択

| テーマ | 特徴 | 適したシーン |
|--------|------|-------------|
| `gaia` | カラフル・力強い | 技術カンファレンス、勉強会、LT |
| `gaia` + `invert` | ダークモード | コード中心、夜間イベント |
| `default` | 白背景・落ち着き | 社内報告、ビジネス提案 |
| `uncover` | ミニマル | デザイン系、アカデミック |

## Claude Code連携

### スキル（スラッシュコマンド）

| コマンド | 説明 |
|----------|------|
| `/create-slides` | 対話型で一から作成（ヒアリング → 構成 → 生成 → レビュー → エクスポート） |
| `/generate` | JSONデータ生成 → レンダリング → エクスポート |
| `/review-slides` | 生成済みスライドのレビューと改善提案 |

### エージェント

| エージェント | 役割 |
|-------------|------|
| `slide-creator` | 8フェーズの対話型スライド作成ワークフロー |
| `marp-customizer` | テーマ・CSS・ディレクティブの調整ガイド |

### ルール（自動適用）

| ルール | 対象パス | 内容 |
|--------|---------|------|
| `slide-design` | `docs/**`, `slides.config.yaml` | 行動心理学・Googleベストプラクティスに基づく設計ルール |
| `schemas` | `src/config/schema.ts`, `src/generate/slide-schema.ts` | スキーマ変更時のチェックリスト |
| `marp` | `src/generate/markdown.ts`, `src/export/marp.ts`, `docs/**` | Marpフォーマット仕様 |

## プレビュー

VSCodeでMarp拡張（`marp-team.marp-vscode`）を使用。生成された `.md` を開くと `marp: true` を検知して自動プレビュー。

## プロジェクト構造

```
src/
├── index.ts                  # エントリーポイント
├── cli/commands.ts           # CLIコマンド定義・引数パーサー
├── config/
│   ├── schema.ts             # slides.config.yaml の Zodスキーマ
│   ├── defaults.ts           # デフォルト設定YAML
│   └── loader.ts             # YAML読み込み・バリデーション
├── generate/
│   ├── slide-schema.ts       # スライドデータJSON の Zodスキーマ
│   ├── pipeline.ts           # JSON読み込み → バリデーション → レンダリング → 書き出し
│   └── markdown.ts           # Marpマークダウン生成（front-matter + スライド）
├── export/
│   └── marp.ts               # Marp CLIによるHTML/PDF/PPTXエクスポート
└── utils/
    └── files.ts              # ファイル操作ユーティリティ
```

## 開発

```bash
bun run typecheck   # 型チェック (tsgo)
bun run check       # Biome lint + format確認
bun run format      # 自動フォーマット
```

## 制約事項

- **PDF出力**: Chromiumが必要。HTML出力を推奨。
- **テスト**: 未整備。追加時は `bun:test` を使用。
