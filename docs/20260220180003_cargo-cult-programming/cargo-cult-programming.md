---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "カーゴカルト・プログラミング"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# カーゴカルト・プログラミングの解剖

- **理解なき儀式がチームを蝕む**
- 
- なぜ私たちは「おまじない」を書くのか
- なぜ組織は「流行」に飛びつくのか
- そして、どうすれば脱却できるのか


---

# カーゴカルトの起源

- 第二次大戦中、メラネシアの島々に物資が空から届いた
- 戦後、島民は**木製の飛行機**と**藁の管制塔**を作り、物資の再来を祈った
- リチャード・ファインマン（1974年）が科学における形式主義を批判して命名
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><rect x='50' y='200' width='700' height='8' fill='#555' rx='4'/><rect x='50' y='190' width='700' height='3' fill='#777' stroke-dasharray='20,15'/><polygon points='400,60 340,140 360,140 350,170 450,170 440,140 460,140' fill='#8B4513' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><line x1='370' y1='95' x2='430' y2='95' stroke='#A0522D' stroke-width='3'/><line x1='380' y1='115' x2='420' y2='115' stroke='#A0522D' stroke-width='3'/><rect x='385' y='140' width='30' height='30' fill='#654321'/><text x='400' y='240' text-anchor='middle' fill='#aaa' font-size='14'>木製の滑走路</text><text x='150' y='80' fill='#ffd700' font-size='16'>本物の飛行機は</text><text x='150' y='100' fill='#ffd700' font-size='16'>来ない...</text><circle cx='650' cy='60' r='25' fill='none' stroke='#ffd700' stroke-width='2'/><line x1='650' y1='35' x2='650' y2='15' stroke='#ffd700' stroke-width='2'/><line x1='675' y1='60' x2='695' y2='60' stroke='#ffd700' stroke-width='2'/><line x1='650' y1='85' x2='650' y2='105' stroke='#ffd700' stroke-width='2'/><line x1='625' y1='60' x2='605' y2='60' stroke='#ffd700' stroke-width='2'/><text x='650' y='130' text-anchor='middle' fill='#aaa' font-size='12'>形だけの管制塔</text></svg>


---

<!-- _class: lead -->
# プログラミング現場のカーゴカルト

- コード・アーキテクチャ・プロセス、3つの階層で蔓延する


---

# コードレベルのカーゴカルト

- **動く理由を知らないコードのコピペ**
- StackOverflowから「動いた」コードをそのまま貼り付け
- **おまじないコメント・設定**
- 「消すとなぜか壊れる」空行やコメント
- **例外の握り潰し**
- try-catch で全てを飲み込む「安全」なコード

```typescript
// カーゴカルトの典型例
try {
  const data = await fetch(url);
  return data.json();
} catch (e) {
  // なぜか必要（消すと動かない）
  return null;
}
```


---

# アーキテクチャレベルのカーゴカルト

- 「Netflixがマイクロサービスだからうちも」
- スケール・チーム構造・ドメイン複雑性を無視した導入
- 
- <svg viewBox='0 0 800 300' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#4ecdc4' font-size='16' font-weight='bold'>5人チーム</text><rect x='120' y='45' width='160' height='100' fill='#2d5016' rx='10' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='200' y='85' text-anchor='middle' fill='#fff' font-size='13'>モノリス</text><text x='200' y='105' text-anchor='middle' fill='#aaa' font-size='11'>シンプル・高速</text><text x='200' y='125' text-anchor='middle' fill='#4ecdc4' font-size='12'>適切</text><text x='600' y='30' text-anchor='middle' fill='#ff6b6b' font-size='16' font-weight='bold'>5人チーム（カーゴカルト）</text><rect x='480' y='45' width='60' height='40' fill='#5a1a1a' rx='5'/><text x='510' y='70' text-anchor='middle' fill='#fff' font-size='9'>Auth</text><rect x='550' y='45' width='60' height='40' fill='#5a1a1a' rx='5'/><text x='580' y='70' text-anchor='middle' fill='#fff' font-size='9'>User</text><rect x='620' y='45' width='60' height='40' fill='#5a1a1a' rx='5'/><text x='650' y='70' text-anchor='middle' fill='#fff' font-size='9'>Order</text><rect x='515' y='95' width='60' height='40' fill='#5a1a1a' rx='5'/><text x='545' y='120' text-anchor='middle' fill='#fff' font-size='9'>API GW</text><rect x='585' y='95' width='60' height='40' fill='#5a1a1a' rx='5'/><text x='615' y='120' text-anchor='middle' fill='#fff' font-size='9'>Queue</text><text x='600' y='165' text-anchor='middle' fill='#ff6b6b' font-size='12'>過剰な複雑性</text><text x='200' y='200' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>重要: コンテキストが違う</text><text x='200' y='230' text-anchor='middle' fill='#aaa' font-size='12'>Netflix: 数千人のエンジニア、数億ユーザー</text><text x='200' y='250' text-anchor='middle' fill='#aaa' font-size='12'>あなたのチーム: 5人、数千ユーザー</text><text x='200' y='280' text-anchor='middle' fill='#aaa' font-size='12'>同じ解法が最適とは限らない</text></svg>


---

# プロセスレベルのカーゴカルト

- 形骸化したアジャイルの儀式
- 
- <svg viewBox='0 0 800 300' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='200' y='30' text-anchor='middle' fill='#4ecdc4' font-size='15' font-weight='bold'>本来のアジャイル</text><rect x='50' y='45' width='130' height='50' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='115' y='65' text-anchor='middle' fill='#fff' font-size='11'>スタンドアップ</text><text x='115' y='80' text-anchor='middle' fill='#4ecdc4' font-size='9'>障害の共有と解決</text><rect x='200' y='45' width='130' height='50' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='265' y='65' text-anchor='middle' fill='#fff' font-size='11'>レトロスペクティブ</text><text x='265' y='80' text-anchor='middle' fill='#4ecdc4' font-size='9'>継続的改善</text><polygon points='185,70 195,65 195,75' fill='#4ecdc4'/><polygon points='335,70 345,65 345,75' fill='#4ecdc4'/><rect x='350' y='45' width='100' height='50' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='400' y='65' text-anchor='middle' fill='#fff' font-size='11'>改善の実行</text><text x='400' y='80' text-anchor='middle' fill='#4ecdc4' font-size='9'>実際に変わる</text><text x='600' y='30' text-anchor='middle' fill='#ff6b6b' font-size='15' font-weight='bold'>カーゴカルト版</text><rect x='500' y='45' width='130' height='50' fill='#5a1a1a' rx='8'/><text x='565' y='65' text-anchor='middle' fill='#fff' font-size='11'>スタンドアップ</text><text x='565' y='80' text-anchor='middle' fill='#ff6b6b' font-size='9'>進捗報告会と化す</text><rect x='650' y='45' width='130' height='50' fill='#5a1a1a' rx='8'/><text x='715' y='65' text-anchor='middle' fill='#fff' font-size='11'>レトロスペクティブ</text><text x='715' y='80' text-anchor='middle' fill='#ff6b6b' font-size='9'>愚痴大会で終了</text><polygon points='635,70 645,65 645,75' fill='#ff6b6b'/><text x='400' y='150' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>プロセスのカーゴカルト指標</text><rect x='80' y='170' width='200' height='40' fill='#2a2a4a' rx='6'/><text x='180' y='195' text-anchor='middle' fill='#ff6b6b' font-size='12'>ベロシティのゲーミング</text><rect x='300' y='170' width='200' height='40' fill='#2a2a4a' rx='6'/><text x='400' y='195' text-anchor='middle' fill='#ff6b6b' font-size='12'>スプリントが死の行進</text><rect x='520' y='170' width='200' height='40' fill='#2a2a4a' rx='6'/><text x='620' y='195' text-anchor='middle' fill='#ff6b6b' font-size='12'>計画のための計画</text><text x='400' y='260' text-anchor='middle' fill='#aaa' font-size='12'>形式を守っても、精神が伴わなければ意味がない</text></svg>


---

<!-- _class: lead -->
# なぜカーゴカルトは発生するか

- 心理学・組織論から見る3つの根本原因


---

# 認知的コスト節約

- 人間の脳は**エネルギー消費を最小化**しようとする
- 「理解する」より「コピーする」方が圧倒的に速い
- 締切プレッシャー下では特に顕著
- 
- <svg viewBox='0 0 800 250' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='250' fill='#1a1a2e' rx='12'/><text x='400' y='30' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>理解コスト vs 模倣コスト</text><rect x='80' y='50' width='280' height='30' fill='#4ecdc4' rx='4'/><text x='85' y='70' fill='#1a1a2e' font-size='12' font-weight='bold'>深い理解: 時間コスト大</text><rect x='80' y='90' width='80' height='30' fill='#ff6b6b' rx='4'/><text x='85' y='110' fill='#fff' font-size='12' font-weight='bold'>コピペ: 速い</text><text x='500' y='60' fill='#aaa' font-size='12'>原理の学習 + 適用 + 検証</text><text x='500' y='100' fill='#aaa' font-size='12'>StackOverflowから貼るだけ</text><line x1='80' y1='140' x2='720' y2='140' stroke='#555' stroke-width='1'/><text x='400' y='170' text-anchor='middle' fill='#ffd700' font-size='13'>しかし長期的には...</text><rect x='80' y='185' width='120' height='30' fill='#4ecdc4' rx='4' opacity='0.8'/><text x='85' y='205' fill='#1a1a2e' font-size='11'>理解: 保守コスト低</text><rect x='80' y='220' width='600' height='20' fill='#ff6b6b' rx='4' opacity='0.6'/><text x='85' y='235' fill='#fff' font-size='11'>コピペ: 技術負債が蓄積し、修正コストが指数的に増大</text></svg>


---

# 組織的同調圧力

- **「みんなやってるから」** — FOMO (Fear of Missing Out)
- テック系メディアの「成功事例」記事が同調を加速
- ベンチマーキングの罠: 他社の表面だけを真似る
- 
- <svg viewBox='0 0 800 220' style='max-height:45vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='220' fill='#1a1a2e' rx='12'/><text x='400' y='30' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>同調のカスケード</text><circle cx='100' cy='110' r='35' fill='#4ecdc4' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='100' y='105' text-anchor='middle' fill='#1a1a2e' font-size='10'>FAANG</text><text x='100' y='120' text-anchor='middle' fill='#1a1a2e' font-size='10'>企業</text><polygon points='145,110 160,105 160,115' fill='#ffd700'/><circle cx='210' cy='110' r='30' fill='#e67e22' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='210' y='105' text-anchor='middle' fill='#fff' font-size='9'>テック</text><text x='210' y='118' text-anchor='middle' fill='#fff' font-size='9'>メディア</text><polygon points='245,110 260,105 260,115' fill='#ffd700'/><circle cx='320' cy='80' r='25' fill='#ff6b6b' opacity='0.8'/><text x='320' y='85' text-anchor='middle' fill='#fff' font-size='9'>CTO A</text><circle cx='320' cy='140' r='25' fill='#ff6b6b' opacity='0.8'/><text x='320' y='145' text-anchor='middle' fill='#fff' font-size='9'>CTO B</text><polygon points='350,80 365,75 365,85' fill='#ffd700'/><polygon points='350,140 365,135 365,145' fill='#ffd700'/><circle cx='430' cy='80' r='22' fill='#9b59b6' opacity='0.7'/><text x='430' y='85' text-anchor='middle' fill='#fff' font-size='8'>チームA</text><circle cx='430' cy='140' r='22' fill='#9b59b6' opacity='0.7'/><text x='430' y='145' text-anchor='middle' fill='#fff' font-size='8'>チームB</text><polygon points='455,80 470,75 470,85' fill='#ffd700'/><polygon points='455,140 470,135 470,145' fill='#ffd700'/><text x='550' y='85' fill='#ff6b6b' font-size='11'>「K8s導入しなきゃ」</text><text x='550' y='145' fill='#ff6b6b' font-size='11'>「うちもGraphQL」</text><text x='400' y='200' text-anchor='middle' fill='#aaa' font-size='12'>発信源の文脈は伝播しない。結論だけが広がる。</text></svg>


---

# 成功の誤帰因

- **Aがあり、Bが成功した → AがBの原因？**
- 相関と因果の混同は人間の根本的バイアス
- 「Googleがコードレビューしてるから成功した」のではない
- 
- <svg viewBox='0 0 800 250' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='250' fill='#1a1a2e' rx='12'/><text x='250' y='30' text-anchor='middle' fill='#ff6b6b' font-size='14' font-weight='bold'>誤った因果推論</text><rect x='60' y='50' width='140' height='50' fill='#5a1a1a' rx='8'/><text x='130' y='80' text-anchor='middle' fill='#fff' font-size='12'>マイクロサービス</text><polygon points='210,75 225,70 225,80' fill='#ff6b6b'/><rect x='235' y='50' width='140' height='50' fill='#5a1a1a' rx='8'/><text x='305' y='80' text-anchor='middle' fill='#fff' font-size='12'>成功企業</text><text x='215' y='120' text-anchor='middle' fill='#ff6b6b' font-size='18'>?</text><line x1='60' y1='130' x2='380' y2='130' stroke='#555' stroke-width='1'/><text x='570' y='30' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>正しい因果分析</text><rect x='420' y='50' width='120' height='40' fill='#1b4332' rx='8'/><text x='480' y='75' text-anchor='middle' fill='#fff' font-size='11'>優秀な人材</text><rect x='560' y='50' width='120' height='40' fill='#1b4332' rx='8'/><text x='620' y='75' text-anchor='middle' fill='#fff' font-size='11'>豊富な資金</text><rect x='490' y='110' width='120' height='40' fill='#1b4332' rx='8'/><text x='550' y='135' text-anchor='middle' fill='#fff' font-size='11'>適切な判断</text><polygon points='480,95 490,115 475,110' fill='#4ecdc4'/><polygon points='620,95 610,115 625,110' fill='#4ecdc4'/><polygon points='550,155 545,165 555,165' fill='#4ecdc4'/><rect x='490' y='170' width='120' height='40' fill='#2d5016' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='550' y='195' text-anchor='middle' fill='#fff' font-size='12'>成功</text><text x='400' y='240' text-anchor='middle' fill='#aaa' font-size='12'>成功の原因はプラクティスではなく、文脈と判断力にある</text></svg>


---

<!-- _class: lead -->
# 脱却のための処方箋

- 理解に基づく技術選定へ


---

# 「なぜ」を5回問う

- ファーストプリンシプル思考で技術選定を見直す
- 
- <svg viewBox='0 0 800 300' style='max-height:58vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='400' y='30' text-anchor='middle' fill='#ffd700' font-size='15' font-weight='bold'>なぜなぜ分析ツリー</text><rect x='280' y='45' width='240' height='35' fill='#5a1a1a' rx='8'/><text x='400' y='68' text-anchor='middle' fill='#fff' font-size='12'>「K8sを導入したい」</text><line x1='400' y1='80' x2='400' y2='95' stroke='#ffd700' stroke-width='2'/><rect x='280' y='95' width='240' height='35' fill='#4a3a1a' rx='8'/><text x='400' y='112' text-anchor='middle' fill='#ffd700' font-size='11'>なぜ? → スケーラビリティが必要</text><line x1='400' y1='130' x2='400' y2='145' stroke='#ffd700' stroke-width='2'/><rect x='280' y='145' width='240' height='35' fill='#3a4a1a' rx='8'/><text x='400' y='162' text-anchor='middle' fill='#ffd700' font-size='11'>なぜ? → ピーク時に10倍のトラフィック</text><line x1='400' y1='180' x2='400' y2='195' stroke='#ffd700' stroke-width='2'/><rect x='280' y='195' width='240' height='35' fill='#1a4a3a' rx='8'/><text x='400' y='212' text-anchor='middle' fill='#ffd700' font-size='11'>なぜ? → 月1回のセールイベント</text><line x1='400' y1='230' x2='400' y2='245' stroke='#ffd700' stroke-width='2'/><rect x='250' y='245' width='300' height='40' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='263' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>結論: オートスケーリングで十分</text><text x='400' y='278' text-anchor='middle' fill='#4ecdc4' font-size='10'>K8sは不要だった</text></svg>


---

# コンテキスト適合の評価フレームワーク

- 技術選定の4軸で自社の立ち位置を評価する
- 
- <svg viewBox='0 0 800 320' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='320' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>コンテキスト適合マトリクス</text><line x1='400' y1='45' x2='400' y2='290' stroke='#555' stroke-width='2'/><line x1='80' y1='165' x2='720' y2='165' stroke='#555' stroke-width='2'/><text x='400' y='55' text-anchor='middle' fill='#aaa' font-size='11'>スケール: 大</text><text x='400' y='305' text-anchor='middle' fill='#aaa' font-size='11'>スケール: 小</text><text x='90' y='170' fill='#aaa' font-size='11'>チーム: 小</text><text x='680' y='170' fill='#aaa' font-size='11'>チーム: 大</text><rect x='130' y='65' width='200' height='70' fill='#2a2a4a' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='230' y='90' text-anchor='middle' fill='#e67e22' font-size='12' font-weight='bold'>危険ゾーン</text><text x='230' y='110' text-anchor='middle' fill='#aaa' font-size='10'>小チーム + 大スケール技術</text><text x='230' y='125' text-anchor='middle' fill='#ff6b6b' font-size='10'>カーゴカルトの温床</text><rect x='470' y='65' width='200' height='70' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='570' y='90' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>適切</text><text x='570' y='110' text-anchor='middle' fill='#aaa' font-size='10'>大チーム + 大スケール技術</text><text x='570' y='125' text-anchor='middle' fill='#4ecdc4' font-size='10'>Netflix, Google</text><rect x='130' y='195' width='200' height='70' fill='#1b4332' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='230' y='220' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>適切</text><text x='230' y='240' text-anchor='middle' fill='#aaa' font-size='10'>小チーム + シンプル技術</text><text x='230' y='255' text-anchor='middle' fill='#4ecdc4' font-size='10'>スタートアップの正解</text><rect x='470' y='195' width='200' height='70' fill='#2a2a4a' rx='8' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='570' y='220' text-anchor='middle' fill='#e67e22' font-size='12' font-weight='bold'>過少投資</text><text x='570' y='240' text-anchor='middle' fill='#aaa' font-size='10'>大チーム + シンプル技術</text><text x='570' y='255' text-anchor='middle' fill='#e67e22' font-size='10'>成長の壁にぶつかる</text></svg>


---

# 「愚かに見える勇気」

- 業界トレンドに逆らう選択をした企業たち
- 
- <svg viewBox='0 0 800 260' style='max-height:50vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='260' fill='#1a1a2e' rx='12'/><rect x='40' y='30' width='340' height='90' fill='#1b4332' rx='10' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='210' y='55' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>Wealthsimple</text><text x='210' y='75' text-anchor='middle' fill='#fff' font-size='11'>モノリスを維持して急成長</text><text x='210' y='95' text-anchor='middle' fill='#aaa' font-size='10'>「MSAは私たちの規模には不要」</text><text x='210' y='112' text-anchor='middle' fill='#4ecdc4' font-size='10'>結果: 開発速度を維持し上場</text><rect x='420' y='30' width='340' height='90' fill='#1b4332' rx='10' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='590' y='55' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>Basecamp (37signals)</text><text x='590' y='75' text-anchor='middle' fill='#fff' font-size='11'>クラウドからオンプレに回帰</text><text x='590' y='95' text-anchor='middle' fill='#aaa' font-size='10'>「AWSに年間$3M払う必要はない」</text><text x='590' y='112' text-anchor='middle' fill='#4ecdc4' font-size='10'>結果: インフラコスト70%削減</text><rect x='200' y='150' width='400' height='80' fill='#2a2a4a' rx='10'/><text x='400' y='175' text-anchor='middle' fill='#ffd700' font-size='14' font-weight='bold'>共通点</text><text x='400' y='200' text-anchor='middle' fill='#fff' font-size='12'>自社のコンテキストを深く理解し</text><text x='400' y='220' text-anchor='middle' fill='#fff' font-size='12'>「業界標準」より「自社最適」を選んだ</text></svg>


---

# カーゴカルト検出チェックリスト

- あなたのチームは大丈夫？ 5つの危険信号
- 
- - [ ] 技術選定の理由を**3行以内で**説明できない
- - [ ] 「X社がやっているから」が主な根拠
- - [ ] 導入前にプロトタイプで検証していない
- - [ ] チーム全員が仕組みを理解していない
- - [ ] 「前のプロジェクトでもこうだった」が口癖
- 
- **2つ以上該当 → カーゴカルトの疑い**
- **4つ以上該当 → 即座に技術選定を見直すべき**


---

<!-- _class: lead -->
# まとめ

- **最良のプラクティスは**
- **「なぜ機能するか」を理解して**
- **初めて価値を持つ**
- 
- 形式ではなく本質を。模倣ではなく理解を。
- あなたのコンテキストに最適な選択を。


---

# 参考文献

- - **Research & Lectures:**
- - [Feynman, "Cargo Cult Science" (1974 Caltech)](http://calteches.library.caltech.edu/51/2/CargoCult.htm)
- - [Christensen, The Innovator's Dilemma (1997)](https://www.hbs.edu/faculty/Pages/item.aspx?num=46)
- - **Books:**
- - McConnell, *Code Complete* 2nd Edition (2004)
- - Forsgren et al., *Accelerate* (2018)
- - **Articles:**
- - ["You Are Not Google" - Oz Nova (2017)](https://blog.bradfieldcs.com/you-are-not-google-84912cf44afb)
- - ["Choose Boring Technology" - Dan McKinley](https://mcfunley.com/choose-boring-technology)

