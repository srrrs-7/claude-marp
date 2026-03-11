---
name: generate
description: スライドデータJSONを生成してMarpマークダウンにレンダリング、HTMLエクスポートまで実行
user_invocable: true
---

# Generate Slides

1. `slides.config.yaml` が無ければ `bun run slides init` で作成
2. config の topic/audience/goal/content 設定を読む
3. slide schema に従ったJSONを生成:

```json
{
  "slides": [{
    "title": "タイトル",
    "content": ["箇条書き1", "箇条書き2"],
    "code": "コード（任意）",
    "codeLanguage": "typescript",
    "speakerNotes": "ノート（任意）",
    "layout": "default | center | section"
  }]
}
```

**コンテンツ制約:**
- 箇条書き: **max 6〜7項目**（8項目以上は2スライドに分割）
- コードブロック: **8行推奨**、**12行絶対最大**
- コード + 箇条書きの組み合わせ: コード7〜10行なら箇条書き最大2項目
- 空白スライドを作らない
- **図解ファースト**: 全スライドの50%以上にSVG図解を含めること

**SVG記述ルール（JSON埋め込み時）:**
- `viewBox` 必須
- `style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0"` 必須
- `url(#id)` 参照禁止（filter/marker-end/gradient → インラインスタイルで代替）
- ダブルクォートは `\"` にエスケープ

**⚠️ 生成ルール（必須）:**
- JSON はインラインで出力しない。必ず Write tool でファイルに直接書き込む
- **20枚以上のデッキはチャンク分割**: 20枚ずつ `slides-data-part1.json`, `slides-data-part2.json` ... に書き込み、結合して `slides-data.json` を生成、中間ファイルを削除
- SVGヘビーデッキ（SVG比率≥50%）はチャンクを**15枚**に制限（トークン膨張対策）
- 書き込み後にスライド数を確認し、計画枚数と一致しない場合は不足分を追加

4. `docs/<timestamp>_<title>/slides-data.json` に保存（Write tool で直接書き込み）
5. スライド数確認: `bun -e "const d=JSON.parse(require('fs').readFileSync('<path>/slides-data.json','utf-8')); console.log(d.slides.length)"`
6. バリデーション: `bun run validate`
7. 自動修正: `bun run fix && bun run split && python3 scripts/split-bullet-overflow.py <path>/slides-data.json`
8. レンダリング: `bun run slides render -c <config> --in <path>/slides-data.json`
   - gaiaテーマの場合、`slides.config.yaml` の `marp.class: invert` が自動的にフロントマターに出力される（手動追加不要）
9. エクスポート: `bun run slides export -c <config> -f html --in <path>/<name>.md`
11. SVG検証: `bun scripts/fix-svg-url-refs.ts`（url(#id)違反があれば自動修正→再エクスポート）
12. インデックス更新: `bun run generate:index`

**出力先:** すべてのファイルは `docs/<yyyymmddhhmmss>_<title>/` 配下に集約される
