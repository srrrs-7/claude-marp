---
description: Symptom → cause → fix table for rendering, export, environment, and multi-agent issues
paths:
  - "docs/**"
  - "src/**"
  - "scripts/**"
  - "Makefile"
  - ".devcontainer/**"
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `class: invert` not in output | `marp.class` not set in `slides.config.yaml` | Add `class: "invert"` under `marp:` key — pipeline auto-emits it |
| Header/footer/style not rendered | Placed at YAML top level in `slides.config.yaml` (Zod strips unknown keys) | Move under `marp:` key in config YAML |
| Files render to wrong directory | `output.dir` is relative path | Use full path: `"docs/<timestamp>_<slug>"` |
| SVG shadows/arrows missing in HTML | `url(#id)` refs break in Marp's foreignObject context | `bun scripts/fix-svg-url-refs.ts` → re-export |
| Content clipped at the bottom of a slide | Text exceeds the content box; auto-fit already at its smallest step | `bun run validate:quality` → look for `overflowing_slide`, then split the slide |
| A diagram is squeezed to a sliver | The slide's text fills the box, so the `.fig` flex item gets almost nothing | Move bullets to a second slide — the diagram takes whatever is left over by design |
| Body text unexpectedly tiny | `marp.style` sets `section { font-size: N em }`; `em` resolves against 16px, not the theme's 35px | Use `px`, or delete the override |
| A wall of base64 text on a slide | `![](data:image/svg+xml;base64,…)` — markdown-it refuses SVG data URIs | `bun run fix:data-uri` → re-render |
| A code block swallows the rest of the deck | `slide.code` contains its own ``` fence | Fixed in the renderer (it now opens with a longer fence); re-render |
| Site links to an outdated render of a deck | `output.baseName` empty and index/pipeline disagreed on the filename | Both now use `resolveBaseName()`; delete leftover `<other-name>.md` / `dist/<other-name>.html` |
| SVG images not showing in `dist/` | Marp CLI doesn't inline external `<img src="assets/">` | `fixAssetPaths()` auto-rewrites to `../assets/`; verify `assets/` dir exists |
| Slide content overflowing (bullets) | 8+ bullet points on one slide | `bun run split:bullets` → re-render |
| Slide content overflowing (code) | Code block > 12 lines or code+bullets combined | `bun run split` → re-render |
| 32K token API error | Large content output inline instead of via Write tool | Use Write tool for all large output; set `CLAUDE_CODE_MAX_OUTPUT_TOKENS` |
| Render fails for one deck but not others | Need to iterate on a single deck without full rebuild | `bun run single <partial-name>` — partial name matching, render+export one deck |
| Parallel worker stalls / falls back to sequential | subagent を1つずつ起動して待っている（`mode: "bypassPermissions"` は Deprecated で無関係） | 全 subagent を1メッセージ内で `Agent` 呼び出しする |
| Worker completes but output file missing | Overlapping file paths between workers (cache conflict) | Assign strictly non-overlapping `slides-data-part{N}.json` paths |
| Subagent の返り値が巨大で応答が切れる | 成果物本体を返り値に入れた | 本体は Write でファイルへ。返り値はパス+枚数+品質メタのみ |
| 並列にしたのに速くならない | subagent を1つずつ起動して待っている | 全 subagent を **1メッセージ内で同時に** `Agent` 呼び出しする |
| 触ってないデッキの `slides-data.json` が勝手に diff に出る | 一部デッキがスペースインデントでコミット済み。どこを Write/Edit しても PostToolUse の `bun run format` が repo 全体を tab に直す | 意図しない差分は `git checkout -- docs` で戻す。恒久対応は一度 `bun run format` の結果をコミットする |
| host で `bun run …` が biome/tsgo バイナリ不在で落ちる | `node_modules` はコンテナ用 Linux バイナリ（darwin 非互換） | host では常に `make <target>` 経由。host bun で `bun install` し直さない（そもそも hook がブロックする） |
| host で bun 系コマンドが hook にブロックされる | `.claude/hooks/pre-bash-guard.sh` の厳格ルール（仕様どおり） | `make <target>` / `make bun ARGS="…"` / `make run CMD="…"` でコンテナ実行に切り替える |
| `make …` が `Cannot connect to the Docker daemon` | colima が起動していない | `colima start` → リトライ |
| `make …` のたびにコンテナのコールドスタートで遅い | 毎回 `run --rm` になっている | 先に `make up`（以降は自動で `exec` 経路）。作業終了後は `make down` |
| コンテナ内の `make …` が docker を探しに行って落ちる | 本来は `/.dockerenv` 検出で直接実行に切り替わる — 落ちるなら EXEC 判定ロジックの退行 | Makefile 冒頭の `ifneq ($(wildcard /.dockerenv),)` ブロックを確認 |
