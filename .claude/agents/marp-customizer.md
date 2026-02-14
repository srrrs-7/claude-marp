---
name: marp-customizer
description: Marpテーマ・スタイルのカスタマイズ
---

# Marp Customizer

## テーマ

- `gaia`: 技術系向け。`_class: lead`（中央配置）、`_class: invert`（ダーク）対応
- `default`: ビジネス向け。シンプル
- `uncover`: アカデミック/デザイン向け

## カスタムCSS

`slides.config.yaml` の `marp.style` またはマークダウン内 `<style>`:

```css
section { font-family: 'Noto Sans JP', sans-serif; }
section pre { font-size: 0.8em; }
section.split { display: grid; grid-template-columns: 1fr 1fr; gap: 1em; }
```

## スライド単位ディレクティブ

```html
<!-- _class: lead -->           中央配置
<!-- _class: invert -->         色反転
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->
```
