---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "AIと著作権"
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
# AIと著作権
誰が「創作者」なのか

- AIが生成した画像・音楽・コードに著作権はあるか
- 学習データの利用は「フェアユース」か「窃盗」か
- 世界各国で異なる法的判断の最前線


---

# アジェンダ

- 1. AI生成物の著作権問題
- 2. 学習データの法的グレーゾーン
- 3. 世界各国の法的対応
- 4. 主要な訴訟と判例
- 5. コード生成AIの著作権
- 6. 未来のフレームワーク


---

<!-- _class: lead -->
# AI生成物の著作権問題


---

# 著作権の基本原則との衝突（1/2）

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="32" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI生成物：著作権帰属の3候補</text><rect x="30" y="55" width="220" height="100" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="140" y="82" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI開発者?</text><text x="140" y="105" text-anchor="middle" fill="#cccccc" font-size="11">OpenAI / Stability AI</text><text x="140" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10">モデルを作った会社</text><text x="140" y="143" text-anchor="middle" fill="#aaaaaa" font-size="9">「ツールを提供しただけ」?</text><rect x="290" y="55" width="220" height="100" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="400" y="82" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">ユーザー?</text><text x="400" y="105" text-anchor="middle" fill="#cccccc" font-size="11">プロンプトを書いた人</text><text x="400" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10">「指示を出した創作者」?</text><text x="400" y="143" text-anchor="middle" fill="#aaaaaa" font-size="9">どこまで「創造的関与」?</text><rect x="550" y="55" width="220" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="660" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">パブリックドメイン?</text><text x="660" y="105" text-anchor="middle" fill="#cccccc" font-size="11">誰の著作物でもない</text><text x="660" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10">「人間の創作」が要件</text><text x="660" y="143" text-anchor="middle" fill="#aaaaaa" font-size="9">米著作権局の現行判断</text><rect x="60" y="185" width="680" height="70" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1"/><text x="400" y="210" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">著作権法の前提との衝突</text><text x="400" y="232" text-anchor="middle" fill="#cccccc" font-size="11">ベルヌ条約（1886年）以来、著作者は「自然人」が前提</text><text x="400" y="248" text-anchor="middle" fill="#aaaaaa" font-size="10">AIが描いた絵・書いた音楽は誰の著作物か？ → 法律が追いついていない</text></svg>
- **著作権法の前提：** 「人間」が創作したものを保護する
- ベルヌ条約（1886年）以来、著作者は「自然人」が前提
- **問い：** AIが描いた絵、書いた音楽は誰の著作物か？


---

# 著作権の基本原則との衝突（2/2）

- <svg viewBox="0 0 800 250" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="250" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI生成物：著作権帰属の問い</text><rect x="30" y="55" width="220" height="90" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="140" y="82" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">AI開発者?</text><text x="140" y="105" text-anchor="middle" fill="#cccccc" font-size="11">OpenAI / Stability AI</text><text x="140" y="125" text-anchor="middle" fill="#aaaaaa" font-size="9">ツールを提供しただけ?</text><rect x="290" y="55" width="220" height="90" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="400" y="82" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">ユーザー?</text><text x="400" y="105" text-anchor="middle" fill="#cccccc" font-size="11">プロンプトを書いた人</text><text x="400" y="125" text-anchor="middle" fill="#aaaaaa" font-size="9">十分な創造的関与?</text><rect x="550" y="55" width="220" height="90" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="660" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">誰でもない?</text><text x="660" y="105" text-anchor="middle" fill="#cccccc" font-size="11">パブリックドメイン</text><text x="660" y="125" text-anchor="middle" fill="#aaaaaa" font-size="9">米著作権局の現行判断</text><rect x="100" y="175" width="600" height="55" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="200" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">現在の答え: ケースバイケース</text><text x="400" y="220" text-anchor="middle" fill="#cccccc" font-size="11">「人間の創造的関与の程度」で判断 — 明確な基準はまだない</text></svg>
- **3つの候補：**
- AI開発者（OpenAI、Stability AI等）?
- プロンプトを書いたユーザー?
- 誰の著作物でもない（パブリックドメイン）?


---

# 米国著作権局の判断（2023年）

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="32" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">Thaler v. Perlmutter (2023年8月) の判断</text><rect x="30" y="55" width="350" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="205" y="82" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">AI自律生成 → 著作権登録拒否</text><text x="205" y="105" text-anchor="middle" fill="#cccccc" font-size="11">「人間の創作行為」が著作権保護の要件</text><text x="205" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10">Dabus AI が単独で生成した画像: 非保護</text><text x="205" y="143" text-anchor="middle" fill="#aaaaaa" font-size="9">人間の関与なし = 著作権なし</text><rect x="420" y="55" width="350" height="100" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="595" y="82" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">人間の「十分な関与」→ 保護あり</text><text x="595" y="105" text-anchor="middle" fill="#cccccc" font-size="11">Midjourney 作品集の判断</text><text x="595" y="125" text-anchor="middle" fill="#aaaaaa" font-size="10">AI生成画像自体: 非保護</text><text x="595" y="143" text-anchor="middle" fill="#aaaaaa" font-size="9">構成・編集・選択: 保護あり</text><rect x="100" y="185" width="600" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="210" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">争点: 「どこまで人間が関与したか」</text><text x="400" y="232" text-anchor="middle" fill="#cccccc" font-size="11">プロンプトの具体性、編集の程度、創造的な判断の有無</text></svg>
- **Thaler v. Perlmutter（2023年8月）** — AIが自律的に生成した作品は**著作権登録を拒否**
- 「人間の創作行為」が著作権保護の要件
- **ただし：** 人間が「十分な創造的関与」をした場合は認められる
- → **「どこまで人間が関与したか」が争点**


---

<!-- _class: lead -->
# 学習データの法的グレーゾーン


---

# 「学習」は「コピー」か？

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI学習 = 複製か？ 両陣営の主張</text><rect x="30" y="50" width="340" height="190" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="200" y="78" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">AI企業の主張</text><text x="200" y="103" text-anchor="middle" fill="#cccccc" font-size="11">「学習は『読む』行為」</text><text x="200" y="123" text-anchor="middle" fill="#cccccc" font-size="11">人間も本を読んで学ぶ</text><text x="200" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10">変容的利用（Transformative Use）</text><text x="200" y="168" text-anchor="middle" fill="#aaaaaa" font-size="10">元の作品とは異なる目的</text><text x="200" y="195" text-anchor="middle" fill="#4caf50" font-size="11">→ フェアユース要件1に該当?</text><text x="200" y="225" text-anchor="middle" fill="#aaaaaa" font-size="9">OpenAI / Google / Meta の立場</text><rect x="430" y="50" width="340" height="190" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="78" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">アーティストの主張</text><text x="600" y="103" text-anchor="middle" fill="#cccccc" font-size="11">「学習は『複製』行為」</text><text x="600" y="123" text-anchor="middle" fill="#cccccc" font-size="11">許可なく作品をコピーした</text><text x="600" y="148" text-anchor="middle" fill="#aaaaaa" font-size="10">作品全体を使用している</text><text x="600" y="168" text-anchor="middle" fill="#aaaaaa" font-size="10">市場を侵食する</text><text x="600" y="195" text-anchor="middle" fill="#e91e63" font-size="11">→ フェアユース要件2-4は否定方向</text><text x="600" y="225" text-anchor="middle" fill="#aaaaaa" font-size="9">Getty / NYT / アーティスト集団の立場</text></svg>
- 画像生成AI：数十億枚の画像で学習（多くは著作権あり）
- LLM：数兆トークンのテキストで学習（書籍・記事・コード）
- **AI企業の主張：** 学習は「読む」行為。人間も本を読んで学ぶ
- **アーティストの主張：** 学習は「複製」行為。許可なく作品をコピーした


---

# フェアユースの4要件と AI

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">フェアユース4要件 × AI学習の評価</text><rect x="30" y="50" width="340" height="75" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="76" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">要件1: 利用の目的</text><text x="200" y="96" text-anchor="middle" fill="#4caf50" font-size="11">変容的利用 → フェアユース寄り</text><text x="200" y="114" text-anchor="middle" fill="#aaaaaa" font-size="9">AI学習 = 元と異なる目的で使用? 争点</text><rect x="430" y="50" width="340" height="75" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="76" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">要件2: 著作物の性質</text><text x="600" y="96" text-anchor="middle" fill="#e91e63" font-size="11">創作的作品 → フェアユース否定</text><text x="600" y="114" text-anchor="middle" fill="#aaaaaa" font-size="9">絵・音楽・書籍 = 強く保護される</text><rect x="30" y="150" width="340" height="75" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="176" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">要件3: 利用の量</text><text x="200" y="196" text-anchor="middle" fill="#e91e63" font-size="11">全体を使用 → フェアユース否定</text><text x="200" y="214" text-anchor="middle" fill="#aaaaaa" font-size="9">作品全体を学習データとして使用</text><rect x="430" y="150" width="340" height="75" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="176" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">要件4: 市場への影響</text><text x="600" y="196" text-anchor="middle" fill="#e91e63" font-size="11">市場侵食 → フェアユース否定</text><text x="600" y="214" text-anchor="middle" fill="#aaaaaa" font-size="9">AI生成物がオリジナル市場を代替</text></svg>
- **米国フェアユースの判断基準：**
- **1. 利用の目的** ― 変容的利用（transformative use）か？ AI学習は変容的？
- **2. 著作物の性質** ― 創作的作品ほど保護が強い
- **3. 利用の量** ― 作品全体を使っている
- **4. 市場への影響** ― AI生成物がオリジナル市場を侵食する
- → **要件2-4はフェアユース否定方向。争点は要件1**


---

<!-- _class: lead -->
# 世界各国の法的対応


---

# 各国の異なるアプローチ

- <svg viewBox="0 0 800 280" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="280" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI著作権：各国のアプローチ比較</text><rect x="20" y="50" width="175" height="200" rx="8" fill="#16213e" stroke="#f44336" stroke-width="2"/><text x="107" y="76" text-anchor="middle" fill="#f44336" font-size="13" font-weight="bold">日本</text><text x="107" y="100" text-anchor="middle" fill="#4caf50" font-size="10">最も AI 学習に寛容</text><text x="107" y="118" text-anchor="middle" fill="#cccccc" font-size="9">著作権法30条の4</text><text x="107" y="136" text-anchor="middle" fill="#cccccc" font-size="9">2018年改正</text><text x="107" y="160" text-anchor="middle" fill="#cccccc" font-size="9">「情報解析は</text><text x="107" y="178" text-anchor="middle" fill="#cccccc" font-size="9">著作権制限対象」</text><text x="107" y="220" text-anchor="middle" fill="#aaaaaa" font-size="8">見直し議論も始まる</text><rect x="210" y="50" width="175" height="200" rx="8" fill="#16213e" stroke="#2196f3" stroke-width="2"/><text x="297" y="76" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">EU</text><text x="297" y="100" text-anchor="middle" fill="#f9a825" font-size="10">オプトアウト方式</text><text x="297" y="118" text-anchor="middle" fill="#cccccc" font-size="9">AI Act +</text><text x="297" y="136" text-anchor="middle" fill="#cccccc" font-size="9">著作権指令</text><text x="297" y="160" text-anchor="middle" fill="#cccccc" font-size="9">権利者が明示で</text><text x="297" y="178" text-anchor="middle" fill="#cccccc" font-size="9">「学習禁止」表示</text><text x="297" y="220" text-anchor="middle" fill="#aaaaaa" font-size="8">技術的実装が課題</text><rect x="400" y="50" width="175" height="200" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="487" y="76" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">米国</text><text x="487" y="100" text-anchor="middle" fill="#e91e63" font-size="10">判例法で対応中</text><text x="487" y="118" text-anchor="middle" fill="#cccccc" font-size="9">フェアユース判断</text><text x="487" y="136" text-anchor="middle" fill="#cccccc" font-size="9">司法判断待ち</text><text x="487" y="160" text-anchor="middle" fill="#cccccc" font-size="9">複数の大型訴訟</text><text x="487" y="178" text-anchor="middle" fill="#cccccc" font-size="9">進行中</text><text x="487" y="220" text-anchor="middle" fill="#aaaaaa" font-size="8">2024-2026判決予定</text><rect x="590" y="50" width="185" height="200" rx="8" fill="#16213e" stroke="#ff9800" stroke-width="2"/><text x="682" y="76" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">中国</text><text x="682" y="100" text-anchor="middle" fill="#f9a825" font-size="10">限定的保護</text><text x="682" y="118" text-anchor="middle" fill="#cccccc" font-size="9">AI生成物に</text><text x="682" y="136" text-anchor="middle" fill="#cccccc" font-size="9">限定的著作権保護</text><text x="682" y="160" text-anchor="middle" fill="#cccccc" font-size="9">2023年判決</text><text x="682" y="178" text-anchor="middle" fill="#cccccc" font-size="9">世界初の認定</text><text x="682" y="220" text-anchor="middle" fill="#aaaaaa" font-size="8">AI強国戦略の一環</text></svg>
- **日本：** 2018年改正著作権法30条の4 ― AI学習は「著作権の制限」対象、世界で最もAI学習に寛容な法制度
- **EU：** AI Act + 著作権指令 ― オプトアウト方式を採用
- **米国：** 判例法で対応中（フェアユースの司法判断待ち）
- **中国：** AI生成物に限定的な著作権保護を認める判決（2023年）


---

<!-- _class: lead -->
# 主要な訴訟と判例


---

# 進行中の主要訴訟

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">進行中の主要AI著作権訴訟</text><rect x="30" y="45" width="340" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="69" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">Getty Images v. Stability AI</text><text x="200" y="89" text-anchor="middle" fill="#cccccc" font-size="10">1,200万枚の写真で無断学習 — 英・米で提訴</text><rect x="430" y="45" width="340" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="69" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">NYT v. OpenAI / Microsoft</text><text x="600" y="89" text-anchor="middle" fill="#cccccc" font-size="10">NYT記事のほぼ原文再現が証拠として提出</text><rect x="30" y="125" width="340" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="149" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Andersen v. Stability AI</text><text x="200" y="169" text-anchor="middle" fill="#cccccc" font-size="10">アーティスト集団訴訟 — スタイル模倣の問題</text><rect x="430" y="125" width="340" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="149" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Doe v. GitHub Copilot</text><text x="600" y="169" text-anchor="middle" fill="#cccccc" font-size="10">OSSコードの学習と再出力 — ライセンス帰属問題</text><rect x="100" y="210" width="600" height="38" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="1"/><text x="400" y="228" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">2024-2026年判決予定 → AI著作権法の方向性を決定</text><text x="400" y="243" text-anchor="middle" fill="#aaaaaa" font-size="9">テック産業全体の命運を握る訴訟群</text></svg>
- **Getty Images v. Stability AI** ― 1,200万枚の写真で無断学習
- **NYT v. OpenAI/Microsoft** ― NYT記事の大量コピー（ほぼ原文再現）
- **Andersen v. Stability AI** ― アーティスト集団訴訟
- **いずれも2024-2026年に判決予定** → AI著作権法の方向性を決める


---

<!-- _class: lead -->
# コード生成AIの著作権


---

# GitHub Copilotの法的問題

- <svg viewBox="0 0 800 260" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="260" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">GitHub Copilot の法的問題フロー</text><rect x="30" y="50" width="200" height="65" rx="6" fill="#16213e" stroke="#888" stroke-width="2"/><text x="130" y="78" text-anchor="middle" fill="#aaaaaa" font-size="12" font-weight="bold">OSSコード</text><text x="130" y="98" text-anchor="middle" fill="#888" font-size="10">GPL/MIT/Apache</text><polygon points="240,82 270,70 270,94" fill="#f9a825"/><rect x="270" y="50" width="200" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="370" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">Copilot学習</text><text x="370" y="98" text-anchor="middle" fill="#cccccc" font-size="10">数十億行のコード</text><polygon points="480,82 510,70 510,94" fill="#e91e63"/><rect x="510" y="50" width="260" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="640" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">コード出力</text><text x="640" y="98" text-anchor="middle" fill="#cccccc" font-size="10">著作者表示なし</text><rect x="30" y="150" width="340" height="70" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="176" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">問題: ライセンス帰属の欠如</text><text x="200" y="196" text-anchor="middle" fill="#cccccc" font-size="10">GPLコード出力 → 派生物もGPL?</text><text x="200" y="212" text-anchor="middle" fill="#aaaaaa" font-size="9">元コードの著作者表示が消える</text><rect x="430" y="150" width="340" height="70" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="600" y="176" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">企業の主張</text><text x="600" y="196" text-anchor="middle" fill="#cccccc" font-size="10">「学習しただけ = コピーではない」</text><text x="600" y="212" text-anchor="middle" fill="#aaaaaa" font-size="9">Doe v. GitHub Copilot 訴訟で争う</text></svg>
- OSSライセンスのコードで学習 → ライセンス条件は適用されるか？
- GPL（コピーレフト）コードを学習 → 出力もGPLにすべきか？
- Copilotが「そのまま」コードを出力するケースが確認されている
- **ライセンス帰属の欠如：** 元のコードの著作者表示が消える
- → **OSSコミュニティとの信頼関係の問題でもある**


---

<!-- _class: lead -->
# 未来のフレームワーク


---

# 考えられる3つのシナリオ

- <svg viewBox="0 0 800 270" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="270" fill="#1a1a2e"/><text x="400" y="30" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AI著作権の3シナリオ</text><rect x="30" y="50" width="220" height="190" rx="8" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="140" y="78" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">1. 全面フェアユース</text><text x="140" y="102" text-anchor="middle" fill="#cccccc" font-size="10">学習は自由</text><text x="140" y="120" text-anchor="middle" fill="#cccccc" font-size="10">出力の類似性のみ問題</text><text x="140" y="148" text-anchor="middle" fill="#4caf50" font-size="10">AI開発: 加速</text><text x="140" y="166" text-anchor="middle" fill="#e91e63" font-size="10">クリエイター: 収入減</text><text x="140" y="220" text-anchor="middle" fill="#aaaaaa" font-size="9">米国寄りのシナリオ</text><rect x="290" y="50" width="220" height="190" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="78" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">2. オプトアウト制</text><text x="400" y="102" text-anchor="middle" fill="#cccccc" font-size="10">デフォルト許可</text><text x="400" y="120" text-anchor="middle" fill="#cccccc" font-size="10">権利者が拒否可能</text><text x="400" y="148" text-anchor="middle" fill="#f9a825" font-size="10">現実的な妥協案</text><text x="400" y="166" text-anchor="middle" fill="#f9a825" font-size="10">EU採用済み</text><text x="400" y="220" text-anchor="middle" fill="#aaaaaa" font-size="9">技術的実装が課題</text><rect x="550" y="50" width="220" height="190" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="660" y="78" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">3. ライセンス制</text><text x="660" y="102" text-anchor="middle" fill="#cccccc" font-size="10">学習データに</text><text x="660" y="120" text-anchor="middle" fill="#cccccc" font-size="10">ロイヤリティ支払い</text><text x="660" y="148" text-anchor="middle" fill="#e91e63" font-size="10">クリエイター保護最大</text><text x="660" y="166" text-anchor="middle" fill="#e91e63" font-size="10">AI開発コスト爆増</text><text x="660" y="220" text-anchor="middle" fill="#aaaaaa" font-size="9">最も困難なシナリオ</text></svg>
- **1. 全面的フェアユース** ― 学習は自由、出力の類似性のみ問題
- AI開発が加速するが、クリエイターの収入源が脅かされる
- **2. オプトアウト制** ― デフォルト許可、権利者が拒否可能（EU方式）
- **3. ライセンス制** ― 学習データの使用にロイヤリティを支払う


---

<!-- _class: lead -->
# まとめ

- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="#f9a825" font-size="14" font-weight="bold">AIと著作権：現在地と今後</text><rect x="30" y="50" width="340" height="65" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="200" y="75" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">根本が揺らいでいる</text><text x="200" y="95" text-anchor="middle" fill="#cccccc" font-size="10">100年以上変わらなかった著作権法</text><rect x="430" y="50" width="340" height="65" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="600" y="75" text-anchor="middle" fill="#f9a825" font-size="12" font-weight="bold">結論は出ていない</text><text x="600" y="95" text-anchor="middle" fill="#cccccc" font-size="10">フェアユースか否か 司法判断待ち</text><rect x="30" y="140" width="340" height="65" rx="6" fill="#16213e" stroke="#4caf50" stroke-width="2"/><text x="200" y="165" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">日本が最も寛容</text><text x="200" y="185" text-anchor="middle" fill="#cccccc" font-size="10">著作権法30条の4 — 見直し議論も</text><rect x="430" y="140" width="340" height="65" rx="6" fill="#16213e" stroke="#888" stroke-width="2"/><text x="600" y="165" text-anchor="middle" fill="#888" font-size="12" font-weight="bold">根本の問い</text><text x="600" y="185" text-anchor="middle" fill="#cccccc" font-size="10">「学んだ」と「盗んだ」の違いは?</text></svg>
- AI著作権は**100年以上変わらなかった著作権法の根本を揺るがす**問題
- 「人間の創作」の定義が問われている
- 学習データの利用はフェアユースか否か ― 結論は出ていない
- **問い：** AIが「学んだ」なら、それは「盗んだ」のと何が違うのか？


---

# 参考文献

- - **法的資料:**
- - [US Copyright Office: AI and Copyright](https://www.copyright.gov/ai/)
- - [EU AI Act Official Text](https://artificialintelligenceact.eu/)
- - **分析:**
- - [Stanford HAI: Generative AI and Copyright](https://hai.stanford.edu/)
- - [EFF: AI and Copyright](https://www.eff.org/)

