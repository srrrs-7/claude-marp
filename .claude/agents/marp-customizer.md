---
name: marp-customizer
description: Marpテーマ・スタイルのカスタマイズ
tools: Read, Edit, Write, Glob, Grep, Bash
model: sonnet
effort: low
---

# Marp Customizer

## テーマ

- `gaia`: 技術系向け。`_class: lead`（中央配置）、`_class: invert`（ダーク）対応
- `default`: ビジネス向け。シンプル
- `uncover`: アカデミック/デザイン向け

## カスタムCSS

`slides.config.yaml` の `marp.style` またはマークダウン内 `<style>`:

> `section pre code` は書かない。`src/generate/markdown.ts` の `BASE_CSS` が
> `font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word;` を全デッキに自動注入する。
> `marp.style` は BASE_CSS の後に連結されるため、ここで再定義すると自動設定を上書きしてしまう。

```css
/* カスタマイズ例 */
section { font-family: 'Noto Sans JP', sans-serif; }
section.split { display: grid; grid-template-columns: 1fr 1fr; gap: 1em; }
```

**コードブロック overflow 防止:** 自動注入の `0.58em` で12行までが枠内に収まる。それでも溢れる場合はCSSではなく `bun run split` でスライドを分割する

## スライド単位ディレクティブ

```html
<!-- _class: lead -->           中央配置
<!-- _class: invert -->         色反転
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->
```
