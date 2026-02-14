---
description: Presentation output directory structure and file placement rules
paths:
  - docs/**/*
  - src/generate/pipeline.ts
  - src/export/marp.ts
  - src/cli/commands.ts
---

# 出力ディレクトリ構造ルール

プレゼンテーション作成時の出力先とファイル配置の規則。

---

## 標準ディレクトリ構造

各プレゼンテーションは `docs/` 配下に専用ディレクトリを持つ。

```
docs/<yyyymmddhhmmss>_<slug>/
├── slides.config.yaml          # プレゼンテーション設定
├── slides-data.json            # スライドデータ（JSON）
├── <name>.md                   # Marpマークダウン（レンダリング結果）
└── dist/                       # エクスポート成果物
    ├── <name>.html             # HTML出力
    ├── <name>.pdf              # PDF出力（オプション）
    └── <name>.pptx             # PowerPoint出力（オプション）
```

### ディレクトリ命名規則

- **タイムスタンプ**: `yyyymmddhhmmss` 形式（例: `20260214073222`）
- **スラッグ**: トピックを英数字とハイフンに変換（例: `growing-industries-investment`）
- **形式**: `<yyyymmddhhmmss>_<slug>`

---

## ファイル配置の原則

### プレゼンテーションディレクトリ直下

以下のファイルはプレゼンテーションディレクトリの**直下**に配置：

- `slides.config.yaml` — 設定ファイル（必須）
- `slides-data.json` — スライドデータ（JSON形式、必須）
- `*.md` — Marpマークダウン（レンダリング結果、必須）

### dist/ サブディレクトリ

エクスポート成果物（HTML/PDF/PPTX）は**必ず `dist/` サブディレクトリ**に出力：

- `dist/<name>.html` — HTML出力
- `dist/<name>.pdf` — PDF出力（オプション）
- `dist/<name>.pptx` — PowerPoint出力（オプション）

**理由**: ソースファイル（設定・データ・マークダウン）と成果物（HTML/PDF）を明確に分離し、管理を容易にする。

---

## レンダリング・エクスポートの動作

### ⚠️ 重要: output.dir 設定

**`slides.config.yaml` の `output.dir` は必ずプロジェクトルートからのフルパスを指定:**

```yaml
output:
  dir: "docs/20260214073222_example"  # ✅ 正しい（フルパス）
  baseName: "example"
```

```yaml
output:
  dir: "."                            # ❌ 間違い（相対パス）
  baseName: "example"
```

**理由**: 相対パス `"."` は**実行ディレクトリ**（通常 `/workspace/main`）を基準に解決されるため、設定ファイルと異なる場所に出力されてしまう。

### render コマンド

```bash
bun run slides render --in slides-data.json
```

**出力先**: `output.dir` で指定したディレクトリに `<name>.md` を生成
- `slides.config.yaml` の `output.dir` 設定に従う
- **余計なサブディレクトリを作らない**

### export コマンド

```bash
bun run slides export -f html --in <name>.md
```

**出力先**: `dist/` サブディレクトリに `<name>.html` を生成
- マークダウンファイルと同じディレクトリに `dist/` を作成
- 既存の `dist/` があれば上書き

---

## 禁止事項

### ❌ 余計な階層を作らない

```
# NG: 余計な docs/ サブディレクトリ
docs/20260214073222_growing-industries-investment/
└── docs/                      ← 不要な階層
    ├── 2026-slides.md
    └── dist/
        └── 2026-slides.html
```

```
# OK: フラットな構造
docs/20260214073222_growing-industries-investment/
├── slides.config.yaml
├── slides-data.json
├── 2026-slides.md
└── dist/
    └── 2026-slides.html
```

### ❌ dist/ 以外にエクスポート成果物を配置しない

```
# NG: HTML がプレゼンテーションディレクトリ直下
docs/20260214073222_growing-industries-investment/
├── 2026-slides.md
└── 2026-slides.html           ← dist/ に入れるべき
```

```
# OK: HTML は dist/ 内
docs/20260214073222_growing-industries-investment/
├── 2026-slides.md
└── dist/
    └── 2026-slides.html
```

---

## チェックリスト

**slides.config.yaml 生成時（/create-slides 等）:**
- [ ] `output.dir` は **必ず** プロジェクトルートからのフルパスを指定（例: `"docs/20260214073222_example"`）
- [ ] 相対パス `"."` や `"./docs"` は使用しない（実行ディレクトリ基準で解決されるため）

render コマンド実装・修正時:
- [ ] マークダウンは `output.dir` で指定したディレクトリに出力
- [ ] 余計なサブディレクトリ（`docs/` など）を作らない

export コマンド実装・修正時:
- [ ] HTML/PDF/PPTX は必ず `dist/` サブディレクトリに出力
- [ ] `dist/` ディレクトリが存在しない場合は自動作成

スライド作成スキル（`/create-slides` など）実装時:
- [ ] 上記の構造に従ってファイルを配置
- [ ] ユーザーに正しいパスを提示
- [ ] `output.dir` がフルパスで設定されていることを確認
