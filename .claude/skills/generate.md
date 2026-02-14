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
    "mermaid": "mermaid定義（任意）",
    "speakerNotes": "ノート（任意）",
    "layout": "default | center | section"
  }]
}
```

4. `docs/slides-data.json` に保存
5. `bun run slides render --in docs/slides-data.json`
6. 必要に応じてエクスポート: `bun run slides export -f html --in docs/<name>.md`
