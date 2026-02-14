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
/* コードブロックのフォントサイズ調整（デフォルト推奨）*/
section pre code {
  font-size: 0.6em;
  line-height: 1.4;
}

/* その他のカスタマイズ例 */
section { font-family: 'Noto Sans JP', sans-serif; }
section.split { display: grid; grid-template-columns: 1fr 1fr; gap: 1em; }
```

**コードブロック overflow 防止:** `font-size: 0.6em` がデフォルト推奨。これにより12行までのコードがスライド枠内に収まる

## スライド単位ディレクティブ

```html
<!-- _class: lead -->           中央配置
<!-- _class: invert -->         色反転
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->
```
