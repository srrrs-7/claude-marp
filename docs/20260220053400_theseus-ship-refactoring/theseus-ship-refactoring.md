---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "ソフトウェアのアイデンティティ問題"
footer: "© 2026"
style: |
  /* ── Overflow prevention ──────────────────────────────── */
    section { overflow: hidden; }
    section * { max-width: 100%; box-sizing: border-box; }
    section h1 { overflow-wrap: break-word; word-break: break-word; }
  
    /* ── Readability ──────────────────────────────────────── */
    section li {
      line-height: 1.7;
      margin-bottom: 0.1em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    section p { line-height: 1.7; overflow-wrap: break-word; }
  
    /* ── Images (all, not only SVG) ───────────────────────── */
    section img:not([src$=".svg"]) {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    section svg {
      max-height: 70vh;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    section img[src$=".svg"] {
      max-height: 70vh;
      max-width: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  
    /* ── Code blocks ──────────────────────────────────────── */
    section pre { overflow: hidden; }
    section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }
  
    /* ── Tables ───────────────────────────────────────────── */
    section table {
      font-size: 0.78em;
      width: 100%;
      overflow: hidden;
      word-break: break-word;
      border-collapse: collapse;
    }
    section th, section td {
      padding: 0.35em 0.6em;
      overflow-wrap: break-word;
      word-break: break-word;
    }
  
    /* ── Subtitle / BLUF callout (blockquote) ─────────────── */
    section blockquote {
      font-size: 0.88em;
      line-height: 1.55;
      padding: 0.25em 0.8em;
      margin: 0.15em 0 0.35em;
      opacity: 0.88;
      overflow-wrap: break-word;
    }
    section blockquote p { margin: 0; }
  
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# テセウスの船と
リファクタリング

- 全部書き直したら、それは同じソフトウェアか
- 同一性の哲学とソフトウェアのアイデンティティ
- Big Rewrite の本当のリスク
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e"/><rect x="60" y="80" width="200" height="90" rx="8" fill="#2d2d44" stroke="#f9a825" stroke-width="2"/><text x="160" y="125" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">オリジナルの船</text><text x="160" y="145" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">板: 100%オリジナル</text><rect x="540" y="80" width="200" height="90" rx="8" fill="#2d2d44" stroke="#e91e63" stroke-width="2"/><text x="640" y="125" font-size="13" fill="#e91e63" text-anchor="middle" font-family="sans-serif">リファクタリング後</text><text x="640" y="145" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">板: 0%オリジナル</text><line x1="270" y1="125" x2="530" y2="125" stroke="#f9a825" stroke-width="2" stroke-dasharray="6,4"/><polygon points="530,120 542,125 530,130" fill="#f9a825"/><text x="400" y="115" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">段階的置換</text><text x="400" y="175" font-size="14" fill="white" text-anchor="middle" font-family="sans-serif">これは「同じ」ソフトウェアか？</text></svg>


---

# テセウスの船とは（1/2）

- 古代ギリシャの思考実験
- ---
- アテナイの英雄テセウスの船が港に保存されていた
- 板が腐るたびに新しい板に交換し続けた


---

# テセウスの船とは（2/2）

- **最終的に元の板は1枚も残っていない**
- ---
- これは「同じ船」と言えるか？
- 
- ホッブズの拡張：交換した古い板を集めて元通り組み立てたら、どちらが「本物」か
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="30" y="30" width="160" height="60" rx="6" fill="#3a3a5c" stroke="#f9a825" stroke-width="2"/><text x="110" y="58" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">船 (t=0)</text><text x="110" y="76" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">板: 全てオリジナル</text><rect x="220" y="30" width="160" height="60" rx="6" fill="#3a3a5c" stroke="#f9a825" stroke-width="2"/><text x="300" y="58" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">船 (t=50%)</text><text x="300" y="76" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">板: 半分交換</text><rect x="410" y="30" width="160" height="60" rx="6" fill="#3a3a5c" stroke="#e91e63" stroke-width="2"/><text x="490" y="58" font-size="12" fill="#e91e63" text-anchor="middle" font-family="sans-serif">船 (t=100%)</text><text x="490" y="76" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">板: 全て新品</text><rect x="600" y="30" width="160" height="60" rx="6" fill="#2d2d44" stroke="#aaa" stroke-width="1" stroke-dasharray="4,3"/><text x="680" y="58" font-size="12" fill="#aaa" text-anchor="middle" font-family="sans-serif">旧板を再組立</text><text x="680" y="76" font-size="10" fill="#777" text-anchor="middle" font-family="sans-serif">どちらが本物?</text><line x1="190" y1="60" x2="218" y2="60" stroke="#f9a825" stroke-width="1.5"/><polygon points="218,56 228,60 218,64" fill="#f9a825"/><line x1="380" y1="60" x2="408" y2="60" stroke="#f9a825" stroke-width="1.5"/><polygon points="408,56 418,60 408,64" fill="#f9a825"/><line x1="570" y1="60" x2="598" y2="60" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,3"/><polygon points="598,56 608,60 598,64" fill="#aaa"/><text x="400" y="140" font-size="13" fill="white" text-anchor="middle" font-family="sans-serif">連続性 vs. 素材 — どちらが「同一性」を定義する？</text><line x1="200" y1="155" x2="200" y2="165" stroke="#f9a825" stroke-width="1.5"/><text x="200" y="180" font-size="11" fill="#f9a825" text-anchor="middle" font-family="sans-serif">連続性説</text><line x1="490" y1="155" x2="490" y2="165" stroke="#e91e63" stroke-width="1.5"/><text x="490" y="180" font-size="11" fill="#e91e63" text-anchor="middle" font-family="sans-serif">素材説</text></svg>


---

<!-- _class: lead -->
# ソフトウェアと同一性


---

# リファクタリングはテセウスの船か（1/2）

- **ファイルを1つずつ書き直す場合：**
- → 機能は同じ、コードは別物。これは同じソフトウェアか？
- 
- **モジュールを段階的に置き換える場合：**
- → ある時点で元のコードが0になる。同一性はどこで失われる？
- <svg viewBox="0 0 800 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="210" fill="#1a1a2e"/><text x="400" y="25" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">コンポーネント段階的置換</text><rect x="30" y="40" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="80" y="62" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">Auth (旧)</text><rect x="140" y="40" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="190" y="62" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">DB (旧)</text><rect x="250" y="40" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="300" y="62" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">UI (旧)</text><rect x="360" y="40" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="410" y="62" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">API (旧)</text><text x="520" y="62" font-size="20" fill="#aaa" text-anchor="middle" font-family="sans-serif">…</text><text x="30" y="106" font-size="10" fill="#aaa" font-family="sans-serif">Step 2</text><rect x="30" y="115" width="100" height="36" rx="4" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="1.5"/><text x="80" y="137" font-size="10" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">Auth (新)</text><rect x="140" y="115" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="190" y="137" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">DB (旧)</text><rect x="250" y="115" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="300" y="137" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">UI (旧)</text><rect x="360" y="115" width="100" height="36" rx="4" fill="#3a3a5c" stroke="#f9a825" stroke-width="1.5"/><text x="410" y="137" font-size="10" fill="#f9a825" text-anchor="middle" font-family="sans-serif">API (旧)</text><text x="30" y="181" font-size="10" fill="#aaa" font-family="sans-serif">Step N</text><rect x="30" y="188" width="100" height="14" rx="3" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="1"/><rect x="140" y="188" width="100" height="14" rx="3" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="1"/><rect x="250" y="188" width="100" height="14" rx="3" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="1"/><rect x="360" y="188" width="100" height="14" rx="3" fill="#1e3a5f" stroke="#4fc3f7" stroke-width="1"/><text x="490" y="197" font-size="10" fill="#4fc3f7" font-family="sans-serif">全て新品 → 同じソフト?</text></svg>


---

# リファクタリングはテセウスの船か（2/2）

- 
- **Gitのコミット履歴：**
- → 初期コミットからの差分が「同一性」を定義する？
- ---
- プログラマーが毎日直面する哲学的問題


---

# Big Rewrite の歴史的失敗（1/2）

- **Netscape Navigator → Mozilla（1998-2002）**
- ゼロからの書き直しを決断。競合にシェアを奪われ壊滅的な4年間
- 
- **Apple の Copland プロジェクト（1994-1996）**
- Mac OS の全面書き直しが失敗。Jobs の NeXT 買収で打開
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e"/><text x="400" y="22" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">Big Rewrite タイムライン</text><line x1="40" y1="90" x2="760" y2="90" stroke="#444" stroke-width="2"/><polygon points="756,85 768,90 756,95" fill="#444"/><rect x="60" y="55" width="140" height="35" rx="4" fill="#4a1a2a" stroke="#e91e63" stroke-width="1.5"/><text x="130" y="72" font-size="10" fill="#e91e63" text-anchor="middle" font-family="sans-serif">Copland (Apple)</text><text x="130" y="84" font-size="9" fill="#aaa" text-anchor="middle" font-family="sans-serif">1994–1996 失敗</text><line x1="130" y1="90" x2="130" y2="110" stroke="#e91e63" stroke-width="1"/><text x="130" y="122" font-size="9" fill="#e91e63" text-anchor="middle" font-family="sans-serif">2年で中止</text><rect x="270" y="45" width="200" height="45" rx="4" fill="#4a1a2a" stroke="#e91e63" stroke-width="1.5"/><text x="370" y="65" font-size="10" fill="#e91e63" text-anchor="middle" font-family="sans-serif">Netscape → Mozilla</text><text x="370" y="79" font-size="9" fill="#aaa" text-anchor="middle" font-family="sans-serif">1998–2002 シェア消滅</text><line x1="370" y1="90" x2="370" y2="110" stroke="#e91e63" stroke-width="1"/><text x="370" y="122" font-size="9" fill="#e91e63" text-anchor="middle" font-family="sans-serif">4年の停滞</text><rect x="540" y="55" width="180" height="35" rx="4" fill="#4a1a2a" stroke="#e91e63" stroke-width="1.5"/><text x="630" y="72" font-size="10" fill="#e91e63" text-anchor="middle" font-family="sans-serif">Windows Vista</text><text x="630" y="84" font-size="9" fill="#aaa" text-anchor="middle" font-family="sans-serif">2004–2006 品質問題</text><line x1="630" y1="90" x2="630" y2="110" stroke="#e91e63" stroke-width="1"/><text x="630" y="122" font-size="9" fill="#e91e63" text-anchor="middle" font-family="sans-serif">大規模遅延</text><text x="80" y="150" font-size="9" fill="#888" font-family="sans-serif">1994</text><text x="310" y="150" font-size="9" fill="#888" font-family="sans-serif">1998</text><text x="550" y="150" font-size="9" fill="#888" font-family="sans-serif">2004</text></svg>


---

# Big Rewrite の歴史的失敗（2/2）

- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><rect x="30" y="20" width="740" height="60" rx="8" fill="#2a1a1a" stroke="#e91e63" stroke-width="2"/><text x="400" y="46" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-style="italic">「ソフトウェアをゼロから書き直してはいけない。これはプログラマーが</text><text x="400" y="66" text-anchor="middle" fill="#f9a825" font-size="13" font-family="sans-serif" font-style="italic">犯しうる最大の単一ミスだ」— Joel Spolsky（2000）</text><rect x="30" y="100" width="220" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="140" y="125" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">Vista (2004-2006)</text><text x="140" y="145" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">大規模遅延・品質問題</text><rect x="290" y="100" width="220" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="400" y="125" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">知識の損失</text><text x="400" y="145" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">埋め込まれた知恵が消える</text><rect x="550" y="100" width="220" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="660" y="125" text-anchor="middle" fill="#e91e63" font-size="12" font-family="sans-serif" font-weight="bold">競合に遅れ</text><text x="660" y="145" text-anchor="middle" fill="#aaa" font-size="11" font-family="sans-serif">市場シェアを失う</text><polygon points="255,130 285,130 275,124 275,136" fill="#e91e63"/><polygon points="515,130 545,130 535,124 535,136" fill="#e91e63"/></svg>
- **Microsoft Windows Vista（2004-2006）**
- コードベースのリセット試み、大規模遅延と品質問題
- ---
- Joel Spolsky（2000）：「**ソフトウェアをゼロから書き直してはいけない**。これはプログラマーが犯しうる最大の単一ミスだ」


---

<!-- _class: lead -->
# なぜ元のコードに価値があるか

- <svg viewBox="0 0 800 320" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="320" fill="#1a1a2e"/><text x="400" y="38" font-size="18" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">なぜ元のコードに価値があるか</text><rect x="80" y="65" width="180" height="80" rx="10" fill="#2d2d44" stroke="#f9a825" stroke-width="2"/><text x="170" y="100" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">埋め込まれた知識</text><text x="170" y="120" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">バグ修正の歴史</text><rect x="310" y="65" width="180" height="80" rx="10" fill="#2d2d44" stroke="#4fc3f7" stroke-width="2"/><text x="400" y="100" font-size="13" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">エッジケース対応</text><text x="400" y="120" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">本番で鍛えられた処理</text><rect x="540" y="65" width="180" height="80" rx="10" fill="#2d2d44" stroke="#e91e63" stroke-width="2"/><text x="630" y="100" font-size="13" fill="#e91e63" text-anchor="middle" font-family="sans-serif">暗黙の仕様</text><text x="630" y="120" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">文書化されていない要件</text><rect x="200" y="200" width="180" height="80" rx="10" fill="#2d2d44" stroke="#a5d6a7" stroke-width="2"/><text x="290" y="235" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">チームの判断履歴</text><text x="290" y="255" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">なぜこう設計したか</text><rect x="420" y="200" width="180" height="80" rx="10" fill="#2d2d44" stroke="#ce93d8" stroke-width="2"/><text x="510" y="235" font-size="13" fill="#ce93d8" text-anchor="middle" font-family="sans-serif">パフォーマンス最適化</text><text x="510" y="255" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">過去の障害から学んだ改善</text></svg>


---

# 古いコードには「知識」が埋め込まれている

- 醜く見えるコードの多くは理由がある：
- 
- ```javascript
// なぜこんな条件が？
if (userId !== 'legacy_user_42') {
  validateEmail(email);
}
```
- → 2008年のバグ修正の痕跡。削除したら再発する


---

# 古いコードには「知識」が埋め込まれている（コード例）

```javascript
// なぜこんな条件が？
if (userId !== 'legacy_user_42') {
  validateEmail(email);
}
// → 2008年の特殊ケース対応。削除したら本番障害が再発する
```


---

# チェスタトンのフェンス原理（1/2）

- 「なぜここにフェンスがあるのかわからないなら、撤去する権限はない」
- — G.K. Chesterton（1929）
- ---
- ソフトウェアへの適用：


---

# チェスタトンのフェンス原理（2/2）

- コードの「なぜ」がわからなければ、削除してはいけない
- 
- 理解してから変更する → **リファクタリングの前提条件**
- 
- テストがあれば「なぜ」を安全に実験できる


---

<!-- _class: lead -->
# 段階的置換のパターン

- <svg viewBox="0 0 800 300" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="300" fill="#1a1a2e"/><text x="400" y="36" font-size="18" fill="#f9a825" text-anchor="middle" font-family="sans-serif" font-weight="bold">段階的置換のパターン</text><rect x="60" y="60" width="200" height="80" rx="8" fill="#4a1a2a" stroke="#e91e63" stroke-width="2"/><text x="160" y="95" font-size="13" fill="#e91e63" text-anchor="middle" font-family="sans-serif">Big Bang Rewrite</text><text x="160" y="114" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">全て止めて書き直す</text><rect x="300" y="60" width="200" height="80" rx="8" fill="#1e3a2a" stroke="#4fc3f7" stroke-width="2"/><text x="400" y="95" font-size="13" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">ストラングラーフィグ</text><text x="400" y="114" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">機能単位で徐々に置換</text><rect x="540" y="60" width="200" height="80" rx="8" fill="#1a2a3a" stroke="#a5d6a7" stroke-width="2"/><text x="640" y="95" font-size="13" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">ブランチ・バイ・抽象化</text><text x="640" y="114" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">抽象レイヤーで切り替え</text><text x="160" y="180" font-size="11" fill="#e91e63" text-anchor="middle" font-family="sans-serif">リスク: 高</text><text x="160" y="196" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">埋め込み知識を失う危険</text><text x="400" y="180" font-size="11" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">リスク: 低</text><text x="400" y="196" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">継続的デリバリーが可能</text><text x="640" y="180" font-size="11" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">リスク: 中</text><text x="640" y="196" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">設計コストが高い</text><text x="400" y="260" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">テセウスの船を「正しくやる」= ストラングラーフィグ</text></svg>


---

# ストラングラーフィグパターン（1/2）

- Martin Fowler が提唱した段階的置換の手法
- 名前の由来：絞め殺しイチジク（宿主を徐々に置換する植物）
- ---
- **手順：**
- 1. 新システムを並行稼動させる
- <svg viewBox="0 0 800 180" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="180" fill="#1a1a2e"/><rect x="50" y="30" width="200" height="120" rx="8" fill="#3a3a5c" stroke="#f9a825" stroke-width="2"/><text x="150" y="80" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">旧システム</text><text x="150" y="100" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">Legacy</text><rect x="560" y="30" width="200" height="120" rx="8" fill="#1e3a2a" stroke="#4fc3f7" stroke-width="2"/><text x="660" y="80" font-size="13" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">新システム</text><text x="660" y="100" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">New</text><rect x="300" y="60" width="160" height="60" rx="6" fill="#2d2d44" stroke="#e91e63" stroke-width="2"/><text x="380" y="88" font-size="12" fill="#e91e63" text-anchor="middle" font-family="sans-serif">プロキシ</text><text x="380" y="106" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">ルーティング制御</text><line x1="300" y1="90" x2="252" y2="90" stroke="#f9a825" stroke-width="1.5"/><polygon points="252,85 240,90 252,95" fill="#f9a825"/><line x1="462" y1="90" x2="558" y2="90" stroke="#4fc3f7" stroke-width="1.5" stroke-dasharray="5,3"/><polygon points="558,85 570,90 558,95" fill="#4fc3f7"/><text x="500" y="75" font-size="9" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">機能移行中</text></svg>


---

# ストラングラーフィグパターン（2/2）

- 2. 機能ごとにルーティングを切り替える
- 3. 旧システムの機能が0になったら廃止
- ---
- これは**テセウスの船を適切にやる方法**
- 元のアイデンティティ（機能）を保ちながら、部品を置換する


---

# ソフトウェアの同一性を何が決めるか

- <svg viewBox="0 0 800 310" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="310" fill="#1a1a2e"/><text x="400" y="30" font-size="14" fill="#f9a825" text-anchor="middle" font-family="sans-serif">ソフトウェア同一性の4つの立場</text><rect x="30" y="50" width="170" height="100" rx="8" fill="#2d2d44" stroke="#f9a825" stroke-width="2"/><text x="115" y="85" font-size="12" fill="#f9a825" text-anchor="middle" font-family="sans-serif">機能的同一性</text><text x="115" y="104" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">同じ入出力</text><text x="115" y="120" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">= ユーザー視点</text><rect x="220" y="50" width="170" height="100" rx="8" fill="#2d2d44" stroke="#4fc3f7" stroke-width="2"/><text x="305" y="85" font-size="12" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">構造的同一性</text><text x="305" y="104" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">同じコードベース</text><text x="305" y="120" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">= 開発者視点</text><rect x="410" y="50" width="170" height="100" rx="8" fill="#2d2d44" stroke="#a5d6a7" stroke-width="2"/><text x="495" y="85" font-size="12" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">歴史的同一性</text><text x="495" y="104" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">同じGitリポジトリ</text><text x="495" y="120" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">= 組織視点</text><rect x="600" y="50" width="170" height="100" rx="8" fill="#2d2d44" stroke="#ce93d8" stroke-width="2"/><text x="685" y="85" font-size="12" fill="#ce93d8" text-anchor="middle" font-family="sans-serif">意味的同一性</text><text x="685" y="104" font-size="10" fill="#aaa" text-anchor="middle" font-family="sans-serif">同じ問題を解決</text><text x="685" y="120" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">= 設計者視点</text><rect x="180" y="195" width="440" height="70" rx="10" fill="#1e3a1a" stroke="#f9a825" stroke-width="2"/><text x="400" y="225" font-size="13" fill="#f9a825" text-anchor="middle" font-family="sans-serif">ビジネス価値（機能）が最重要</text><text x="400" y="247" font-size="11" fill="#aaa" text-anchor="middle" font-family="sans-serif">ユーザーが価値を感じれば「同一」のソフトウェア</text><line x1="115" y1="150" x2="300" y2="193" stroke="#f9a825" stroke-width="1" stroke-dasharray="3,3"/><line x1="305" y1="150" x2="350" y2="193" stroke="#4fc3f7" stroke-width="1" stroke-dasharray="3,3"/><line x1="495" y1="150" x2="450" y2="193" stroke="#a5d6a7" stroke-width="1" stroke-dasharray="3,3"/><line x1="685" y1="150" x2="500" y2="193" stroke="#ce93d8" stroke-width="1" stroke-dasharray="3,3"/></svg>
- どれが「正しい」同一性かは立場によって異なる
- → **ビジネス価値（機能）が最も重要**


---

# まとめ：哲学的リファクタリング論

- ✅ **Big Rewrite は歴史的に失敗する** — 埋め込まれた知識を失うから
- ✅ **チェスタトンのフェンス** — 理由がわからないコードを削除するな
- ✅ **テセウスの船を正しくやる** — ストラングラーフィグパターン
- ✅ **ソフトウェアの同一性はユーザーが決める** — 機能が保たれれば同一
- 
- 「動いているコードには、文書化されていない理由がある」
- <svg viewBox="0 0 800 120" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="120" fill="#1a1a2e"/><rect x="30" y="20" width="160" height="80" rx="6" fill="#1e3a2a" stroke="#a5d6a7" stroke-width="1.5"/><text x="110" y="55" font-size="11" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">チェスタトンの</text><text x="110" y="70" font-size="11" fill="#a5d6a7" text-anchor="middle" font-family="sans-serif">フェンス</text><text x="110" y="88" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">理解してから変更</text><line x1="192" y1="60" x2="228" y2="60" stroke="#f9a825" stroke-width="1.5"/><polygon points="228,55 240,60 228,65" fill="#f9a825"/><rect x="242" y="20" width="160" height="80" rx="6" fill="#1e2a3a" stroke="#4fc3f7" stroke-width="1.5"/><text x="322" y="55" font-size="11" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">ストラングラー</text><text x="322" y="70" font-size="11" fill="#4fc3f7" text-anchor="middle" font-family="sans-serif">フィグ</text><text x="322" y="88" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">段階的に置換</text><line x1="404" y1="60" x2="440" y2="60" stroke="#f9a825" stroke-width="1.5"/><polygon points="440,55 452,60 440,65" fill="#f9a825"/><rect x="454" y="20" width="160" height="80" rx="6" fill="#2a1a3a" stroke="#ce93d8" stroke-width="1.5"/><text x="534" y="55" font-size="11" fill="#ce93d8" text-anchor="middle" font-family="sans-serif">機能的同一性</text><text x="534" y="70" font-size="11" fill="#ce93d8" text-anchor="middle" font-family="sans-serif">を保つ</text><text x="534" y="88" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">ユーザー価値優先</text><line x1="616" y1="60" x2="652" y2="60" stroke="#f9a825" stroke-width="1.5"/><polygon points="652,55 664,60 652,65" fill="#f9a825"/><rect x="666" y="20" width="112" height="80" rx="6" fill="#3a2a1a" stroke="#f9a825" stroke-width="2"/><text x="722" y="55" font-size="11" fill="#f9a825" text-anchor="middle" font-family="sans-serif">安全な</text><text x="722" y="70" font-size="11" fill="#f9a825" text-anchor="middle" font-family="sans-serif">リファクタ</text><text x="722" y="88" font-size="9" fill="#777" text-anchor="middle" font-family="sans-serif">哲学的に正しい</text></svg>

