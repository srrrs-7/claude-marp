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
├── slides.config.yaml          # プレゼンテーション設定（必須）
├── slides-data.json            # スライドデータ（必須）
├── <baseName>.md               # Marpマークダウン（レンダリング結果）
├── assets/                     # 静的アセット（SVG図解等、任意）
│   └── *.svg
└── dist/                       # エクスポート成果物
    ├── <baseName>.html         # HTML出力
    ├── <baseName>.pdf          # PDF出力（オプション）
    └── <baseName>.pptx         # PowerPoint出力（オプション）
```

---

## 命名規則

### ディレクトリ名

- **形式**: `<yyyymmddhhmmss>_<slug>`
- **タイムスタンプ**: `yyyymmddhhmmss` 形式（14桁、例: `20260214073222`）
- **スラッグ**: トピックを英数字とハイフンに変換（例: `growing-industries-investment`）
- ハイフン区切り推奨（`web-tech-trends-2026`）。アンダースコアも可（`aws_iam_permissions_guide`）

### ファイル名（`<baseName>`）

- `slides.config.yaml` の `output.baseName` で決定
- **ハイフン区切り**で統一（例: `management-best-practices`）
- マークダウン: `<baseName>.md`
- エクスポート: `dist/<baseName>.html`

```yaml
# slides.config.yaml の例
output:
  dir: "docs/20260214082958_management-best-practices"
  baseName: "management-best-practices"    # → management-best-practices.md, dist/management-best-practices.html
```

### 禁止されるファイル名パターン

- ❌ タイムスタンプ付きファイル名: `20260214082958_management-best-practices.md`
- ❌ 省略形や無関係な名前: `slides.md`, `2026-slides.md`, `ai-slides.md`
- ❌ ハイフン始まりのファイル名: `-slides.md`
- ✅ baseName そのまま: `management-best-practices.md`

---

## ファイル配置の原則

### プレゼンテーションディレクトリ直下

- `slides.config.yaml` — 設定ファイル（必須）
- `slides-data.json` — スライドデータ（必須）
- `<baseName>.md` — Marpマークダウン（必須、1ファイルのみ）

### assets/ サブディレクトリ

スライドから参照するSVG図解などの静的アセットを配置：

- マークダウンから `![w:800 center](assets/filename.svg)` で参照（サイズ指定必須）
- **注意**: Marp CLIはHTMLエクスポート時にSVGをインライン化**しない**。`src/export/marp.ts` の `fixAssetPaths()` が `src="assets/"` → `src="../assets/"` に自動修正する
- `dist/` のHTMLは `../assets/` への相対パスで参照するため、`assets/` ディレクトリが必要
- SVG以外のアセット（画像等）も同様に `assets/` に配置

### dist/ サブディレクトリ

エクスポート成果物（HTML/PDF/PPTX）は**必ず `dist/` サブディレクトリ**に出力：

- `dist/<baseName>.html` — HTML出力
- `dist/<baseName>.pdf` — PDF出力（オプション）
- `dist/<baseName>.pptx` — PowerPoint出力（オプション）

**理由**: ソースファイル（設定・データ・マークダウン・アセット）と成果物（HTML/PDF）を明確に分離。

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

**出力先**: `output.dir` で指定したディレクトリに `<baseName>.md` を生成
- `slides.config.yaml` の `output.dir` 設定に従う
- **余計なサブディレクトリを作らない**

### export コマンド

```bash
bun run slides export -f html --in <baseName>.md
```

**出力先**: `dist/` サブディレクトリに `<baseName>.html` を生成
- マークダウンファイルと同じディレクトリに `dist/` を作成
- 既存の `dist/` があれば上書き

---

## 禁止事項

### ❌ 余計な階層を作らない

```
# NG: 余計な docs/ サブディレクトリ
docs/20260214073222_growing-industries-investment/
└── docs/                      ← 不要な階層
    ├── example.md
    └── dist/
```

### ❌ dist/ 以外にエクスポート成果物を配置しない

```
# NG: HTML がプレゼンテーションディレクトリ直下
docs/20260214073222_example/
├── example.md
└── example.html               ← dist/ に入れるべき
```

### ❌ 1ディレクトリに複数のマークダウンを作らない

```
# NG: 複数の .md ファイル
docs/20260214073222_example/
├── example.md                 ← baseName版
└── 20260214073222_example.md  ← タイムスタンプ付き重複
```

### ❌ assets/ のSVGを dist/ にコピーしない

```
# NG: dist/ にSVGのコピー
docs/20260214073222_example/
├── assets/
│   └── diagram.svg
└── dist/
    ├── example.html           ← ../assets/diagram.svg を参照（自動修正済み）
    └── diagram.svg            ← 不要（HTMLが ../assets/ を参照する）
```

---

## チェックリスト

**slides.config.yaml 生成時（/create-slides 等）:**
- [ ] `output.dir` は **必ず** プロジェクトルートからのフルパスを指定（例: `"docs/20260214073222_example"`）
- [ ] `output.baseName` はハイフン区切り（例: `"example-topic"`）
- [ ] 相対パス `"."` や `"./docs"` は使用しない

render コマンド実装・修正時:
- [ ] マークダウンは `output.dir` で指定したディレクトリに `<baseName>.md` として出力
- [ ] 余計なサブディレクトリ（`docs/` など）を作らない
- [ ] 1ディレクトリに1つの `.md` ファイルのみ

export コマンド実装・修正時:
- [ ] HTML/PDF/PPTX は必ず `dist/` サブディレクトリに出力
- [ ] `dist/` ディレクトリが存在しない場合は自動作成

SVGアセット配置時:
- [ ] スタンドアロンSVGは `assets/` ディレクトリに配置
- [ ] マークダウンからは `![alt](assets/filename.svg)` で参照
- [ ] `dist/` にSVGをコピーしない（Marp CLIがインライン化）

スライド作成スキル（`/create-slides` など）実装時:
- [ ] 上記の構造に従ってファイルを配置
- [ ] ユーザーに正しいパスを提示
- [ ] `output.dir` がフルパスで設定されていることを確認
