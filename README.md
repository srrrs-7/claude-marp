# claude-marp

Marp形式のスライドを生成するCLIツール。YAML設定ファイルでMarpテーマ・スライド構成を定義し、構造化されたJSONデータからMarpマークダウンをレンダリングする。スライド内容はClaude CodeやCodexでローカル生成する前提。

## セットアップ

```bash
bun install
```

## 使い方

### 対話型でスライド作成（推奨）

Claude Code上で `/create-slides` スキルを使うと、ヒアリング → 構成設計 → データ生成 → レンダリング → レビュー → デザイン調整 → エクスポートまで対話的に進められる。

### 手動ワークフロー

#### 1. 設定ファイル作成

```bash
bun run slides init
```

`slides.config.yaml` が生成される。`topic`・`audience`・`goal` を編集する。

#### 2. スライドデータ作成

Claude Code / Codexでスライド内容のJSONを生成する。スキーマ:

```json
{
  "slides": [
    {
      "title": "スライドタイトル",
      "content": ["箇条書き1", "箇条書き2"],
      "code": "コードブロック（任意）",
      "codeLanguage": "typescript",
      "mermaid": "Mermaidダイアグラム（任意）",
      "speakerNotes": "スピーカーノート（任意）",
      "layout": "default"
    }
  ]
}
```

`layout`: `"default"` (通常) / `"center"` (タイトル/まとめ) / `"section"` (セクション見出し)

#### 3. レンダリング

```bash
bun run slides render --in docs/slides-data.json
```

`docs/` にMarpマークダウンが出力される。

#### 4. エクスポート

```bash
bun run slides export -f html --in docs/my-slides.md
```

`docs/dist/` にHTMLが出力される。

#### 5. プレビュー

VSCodeで `.md` ファイルを開くと、Marp拡張が `marp: true` を検知してスライドプレビューを表示する。

## 設定 (slides.config.yaml)

```yaml
topic: "プレゼンテーマ"          # 必須
audience: "developers"          # 対象者
goal: "目的の説明"               # プレゼンの目的
language: "ja"                  # 出力言語

slides:
  count: 10                     # スライド枚数
  includeTableOfContents: true
  includeTitleSlide: true
  includeSummarySlide: true

marp:
  theme: "gaia"                 # gaia | default | uncover
  size: "16:9"
  paginate: true
  header: ""
  footer: ""
  style: ""                     # カスタムCSS

content:
  codeBlocks: true
  codeLanguage: "typescript"
  mermaidDiagrams: true
  bulletPointsMax: 5
  speakerNotes: true

output:
  dir: "./docs"
  baseName: ""                  # 空 = topicから自動生成
```

## 開発

```bash
bun run typecheck   # 型チェック (tsgo)
bun run check       # Biome lint + format確認
bun run format      # 自動フォーマット
```

## Claude Code連携

| スキル | 説明 |
|--------|------|
| `/create-slides` | 対話型でスライドを一から作成（ヒアリング～エクスポートまで） |
| `/generate` | JSONデータからMarpマークダウンをレンダリング |
| `/review-slides` | 生成済みスライドをレビューして改善提案 |

## 制約事項

- **PDF出力**: Chromiumが必要。初期状態ではHTML出力を推奨。
