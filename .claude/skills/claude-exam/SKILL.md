---
name: claude-exam
description: Anthropic Claude認定試験（CCAO-F / CCDV-F / CCA-F / CCAR-P）の実践的な模擬問題を、公式ブループリントの配点どおりに並列生成する。解答根拠と参照リンク付き
user-invocable: true
argument-hint: "[CCAO-F|CCDV-F|CCA-F|CCAR-P] [問題数] [en|ja] （既定は英語。例: \"CCDV-F 30\" / \"CCDV-F 30 ja\"）"
---

# Claude Certification Exam Generator

`pdf/Claude_Certification_Practice_Exams*.pdf`（Set1–3）の作問様式を踏襲し、**シナリオ先行・根拠付き・出典リンク付き**の模擬問題を生成する。

参照ファイル（生成前に必ず読む）:

| ファイル | 中身 |
|---|---|
| `references/blueprints.md` | 4試験のドメイン配点・出題数・試験形式（配点表の唯一の正） |
| `references/item-style.md` | 作問規則・ディストラクタ設計・NGパターン・良い例/悪い例 |
| `references/links.md` | ドメイン別の公式ドキュメントURL（全URL到達確認済み） |
| `assets/item-schema.json` | 問題JSONのスキーマ |
| `scripts/build-exam.ts` | `items.json` / `items.<lang>.json` から冊子（`exam.<lang>.md` / `answers.<lang>.md` / `<EXAM>.<lang>.html`）と `README.md` を多言語生成 |
| `scripts/topdf.sh` | 自己完結HTML → PDF（ヘッドレスChromium）。Chromiumは `CHROME_BIN` / Playwright cache / PATH から自動探索 |
| `scripts/check-exam.ts` | 生成物の機械チェック（スキーマ・正答分布・重複・リンク死活） |

---

## Phase 0 — ヒアリング

**引数で埋まっている項目は聞かない。** `"CCDV-F 30 ja"` のように指定されたら即Phase 1へ。

| 項目 | 既定値 | 質問 |
|---|---|---|
| 対象試験 | — | どの試験ですか？（CCAO-F / CCDV-F / CCA-F / CCAR-P） |
| 問題数 | 本番同数（下表） | 何問作りますか？（本番: CCAO-F 60 / CCDV-F 53 / CCA-F 60 / CCAR-P 63） |
| 言語 | `en`（英語）| 日本語 / 英語 / 対訳。**明示指定がなければ英語で作問する。** 対訳指定時は ja と en の両方を出す |
| 難易度 | `本番相当` | 本番相当 / 難（引っかけ強め） |
| 出力 | `exam.md` + `answers.md` + `items.json` | 問題冊子と解答冊子を分けますか？ |

**ショートハンド（即実行、確認しない）**: `"60問"` `"全部並列"` `"続けて"` `"本番と同じ構成"` `"CCDV-F"` 単体 → 既定値で走る。

---

## Phase 1 — 出題割当表（親が作る）

`references/blueprints.md` の配点から **ドメイン別出題数** を計算し、表で提示して承認を得る。

```
問題数 N × ドメイン重み → 四捨五入 → 合計がNになるよう最大重みドメインで調整
```

同時に決めること:

- **形式内訳**: 複数選択（select TWO）を全体の **10–15%** に混ぜる。それ以外は単一選択
- **シナリオ束**: CCA-F は本番がシナリオベース。共通シナリオ1つに 5–8 問をぶら下げる束を作る（CCAR-P は 2–3 問の小束）
- **出力先**: `exams/<yyyymmddhhmmss>_<exam>-<slug>/`

---

## Phase 2 — 並列生成（**必ず全ワーカーを1メッセージで同時起動**）

**1ワーカー = 1ドメイン（またはシナリオ束）。10問を超えるドメインは 8–10 問ずつに分割する。**
親は自分で作問しない。分解・起動・統合のみ。

各ワーカーへのプロンプトに必ず含める:

1. **担当**: 試験コード / ドメインID・正式名 / 問題数 / うち複数選択◯問 / 通し番号レンジ
2. **専用出力パス**: `exams/<dir>/items-part{N}.json`（他ワーカーと絶対に重ねない）
3. **参照必須**: このスキルの `references/item-style.md`（作問規則）、`references/links.md`（該当ドメイン節のURLのみ使う。**URLを新規に創作しない**）、`assets/item-schema.json`
4. **シナリオ束の場合**: 共通シナリオ本文を丸ごと渡す（各ワーカーが勝手に書き換えない）
5. **返り値の形式**（本体はWriteでファイルへ。返り値に問題文を入れない）:

```
書き込んだファイル: exams/<dir>/items-part3.json
担当: CCDV-F D2 Applications & Integration / 9問（うち複数選択1）/ Q12-Q20
正答分布: A×2 B×4 C×2 D×1（複数選択1問はAB）
使用した参照URL数: 9（すべて links.md 由来）
未解決の問題: なし
```

エージェント選択: `subagent_type: "general-purpose"`、`model` は指定しない（作問は品質が直接成果物になるL2作業なので既定の上位モデルのままにする）。

**10ワーカーを超える場合は 5–7 体ずつの波に分ける。**

---

## Phase 3 — 統合（親が逐次でやる）

1. `bun .claude/skills/claude-exam/scripts/build-exam.ts exams/<dir>` を実行
   - `items-part*.json` があればマージ → `items.json`（通し番号を振り直す）
   - `items.json`（主言語）＋ 存在する `items.<lang>.json` の **全言語分** について、`exam.<lang>.md` / `answers.<lang>.md` / `<EXAM>.<lang>.html`（表紙・問題・解答を含む自己完結HTML）と `README.md` を生成
2. `bun .claude/skills/claude-exam/scripts/check-exam.ts exams/<dir>/items.json` を実行（言語別ファイルがあれば `items.<lang>.json` も同様にチェック）
   - スキーマ違反 / 正答が特定文字に偏り（どれか1文字が40%超）/ 設問文の重複 / `links.md` 外のURL / リンク死活 を検出
   - `--no-net` でリンク死活チェックをスキップ
3. 指摘が出たら **該当ワーカーだけ** 再起動して直す（全体再生成はしない）
4. 各言語の HTML を PDF 化する。`build-exam.ts` が書き出す `pdf-manifest.tsv`（`<html>\t<pdf名>`）をそのまま流す:
   ```bash
   d=exams/<dir>
   while IFS=$'\t' read -r html pdf; do
     .claude/skills/claude-exam/scripts/topdf.sh "$d/$html" "pdf/$pdf"
   done < "$d/pdf-manifest.tsv"
   ```
   出力は `pdf/<pdfBase>_<lang>.pdf`。`bun run generate:index` で `docs/pdf/` にミラーされ公開される（`docs/pdf/` もコミットする）。PDF名の基底 `pdfBase` は `build-exam.ts` の `EXAM_META` が唯一の正。

**多言語の作り方:** 主言語で `items.json` を作り、翻訳版は同じ構造・同じ `id`/`answer`/`refs` のまま `items.<lang>.json`（例 `items.ja.json`）を置くだけ。`build-exam.ts` が全言語分の冊子とHTMLを自動生成する。表紙・見出し・ラベル等の定型文は `build-exam.ts` の `LABELS` に言語別に定義済み（`en`/`ja`）。新言語は `LABELS` に1エントリ追加する。

`assets/exam-template.md` が冊子の雛形。

---

## Phase 4 — 受験モードと採点

ユーザーが「受ける」と言った場合、親が出題する:

- 1問ずつ提示 → 回答を受け取る → **その場では正誤を出さない**（本番同様）
- 全問終了後にまとめて採点。ドメイン別正答率を表で出す
- 弱いドメインについて `references/links.md` の該当リンクを提示して復習導線を作る

素点 → スケールドスコアの近似（本番は 100–1000、合格 720 の criterion-referenced）:

```
scaled ≒ 100 + 900 × (正答数 / 総問題数)   ※あくまで目安。合格ラインの目安は正答率 ~72%
```

---

## 出力構成

```
exams/20260720143000_ccdv-f-set4/
├── README.md            # 内訳・採点表・使い方（主言語）
├── items.json           # 主言語の機械可読データ（採点・再出題・シャッフル用）
├── items.<lang>.json    # 翻訳版（対訳指定時。id/answer/refs は items.json と同一）
├── exam.<lang>.md       # 問題冊子（正答なし）— 言語ごと
├── answers.<lang>.md    # 解答・根拠・参照リンク — 言語ごと
├── <EXAM>.<lang>.html   # PDF用の自己完結HTML — 言語ごと
├── pdf-manifest.tsv     # <html>\t<pdf名>。topdf.sh の入力
└── items-part*.json     # 統合後に削除する

pdf/<pdfBase>_<lang>.pdf # 最終PDF（例 CCDV-F_Developer_practice_20_en.pdf）
```

---

## 絶対規則

- **既定言語は英語。** ユーザーが `ja` / 日本語 / 対訳を明示しない限り、作問は英語（`items.json` の `language: "en"`）で行う。対訳指定時のみ `items.ja.json` を追加し、両言語のPDFを出す
- **URLを創作しない。** 参照リンクは `references/links.md` に載っているものだけを使う。新しいURLが必要なら親が `curl -o /dev/null -w '%{http_code}'` で到達確認し、`links.md` に追記してから使う
- **本番問題の再現・流出は扱わない。** 生成するのは公開ブループリントに沿った独自作問のみ。冊子には出典表記を必ず入れる（`assets/exam-template.md` の免責文）
- **問題文・解説は必ず Write でファイルへ。** インラインで長文を出すと32Kトークン上限に当たる
- **1問1ドメイン。** 複数ドメインにまたがる問題は、主たるドメインに寄せて設問を絞る
- 事実（モデル名・API名・価格・機能）は `references/links.md` のドキュメントで裏取りする。曖昧なら **その機能を問題にしない**
