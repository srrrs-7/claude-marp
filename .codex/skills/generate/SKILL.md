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
- コードブロック: **8行推奨**、12行最大
- コード + 箇条書きの組み合わせに注意（7-10行なら箇条書き2項目まで）
- 空白スライドを作らない

4. `docs/<timestamp>_<title>/slides-data.json` に保存
5. `bun run slides render --in <path>/slides-data.json`
6. 必要に応じてエクスポート: `bun run slides export -f html --in <path>/<name>.md`

**出力先:** すべてのファイルは `docs/<yyyymmddhhmmss>_<title>/` 配下に集約される
