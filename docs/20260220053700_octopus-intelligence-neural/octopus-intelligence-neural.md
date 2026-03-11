---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "分散知性の生物学"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }
  
---

<!-- _class: lead -->
# タコの知性と
ニューラルネット

- 腕に脳が分散している生物から学ぶ
- 中央集権型 vs 分散型知性の比較
- ニューラルネットワーク設計への示唆
- <svg viewBox="0 0 800 380" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="380" fill="#1a1a2e"/><ellipse cx="400" cy="160" rx="70" ry="55" fill="#e91e63" opacity="0.9"/><text x="400" y="165" text-anchor="middle" fill="white" font-size="13" font-weight="bold">中央脳 30%</text><line x1="400" y1="215" x2="240" y2="300" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="310" y2="330" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="380" y2="340" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="450" y2="340" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="520" y2="330" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="590" y2="300" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="200" y2="270" stroke="#f9a825" stroke-width="3"/><line x1="400" y1="215" x2="620" y2="270" stroke="#f9a825" stroke-width="3"/><ellipse cx="240" cy="310" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="310" cy="340" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="380" cy="350" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="450" cy="350" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="520" cy="340" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="590" cy="310" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="200" cy="280" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><ellipse cx="620" cy="280" rx="35" ry="22" fill="#f9a825" opacity="0.85"/><text x="240" y="315" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="310" y="345" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="380" y="355" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="450" y="355" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="520" y="345" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="590" y="315" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="200" y="285" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="620" y="285" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">腕</text><text x="400" y="40" text-anchor="middle" fill="white" font-size="18" font-weight="bold">タコの神経分布：腕に70%が宿る</text><rect x="60" y="65" width="18" height="18" fill="#e91e63"/><text x="85" y="79" fill="white" font-size="13">中央脳 (30%)</text><rect x="200" y="65" width="18" height="18" fill="#f9a825"/><text x="225" y="79" fill="white" font-size="13">8本の腕 (70%)</text></svg>


---

# タコはなぜ異質か（1/2）

- タコの基本スペック：
- - **ニューロン数：** 約5億個（ネコとほぼ同じ）
- - **脳の分布：** 中央脳に30%、**8本の腕に70%**
- - **色覚：** 色盲なのに皮膚で色を感知する可能性
- <svg viewBox="0 0 800 220" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="220" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="15" font-weight="bold">ニューロン数比較（単位：億個）</text><rect x="60" y="45" width="680" height="30" fill="#16213e" rx="4"/><rect x="60" y="45" width="510" height="30" fill="#e91e63" rx="4"/><text x="575" y="66" fill="white" font-size="13" font-weight="bold">ネコ 5億</text><rect x="60" y="90" width="680" height="30" fill="#16213e" rx="4"/><rect x="60" y="90" width="510" height="30" fill="#f9a825" rx="4"/><text x="575" y="111" fill="#1a1a2e" font-size="13" font-weight="bold">タコ 5億</text><rect x="60" y="135" width="680" height="30" fill="#16213e" rx="4"/><rect x="60" y="135" width="136" height="30" fill="#4fc3f7" rx="4"/><text x="200" y="156" fill="white" font-size="13" font-weight="bold">イカ 1.4億</text><rect x="60" y="180" width="680" height="30" fill="#16213e" rx="4"/><rect x="60" y="180" width="34" height="30" fill="#81c784" rx="4"/><text x="98" y="201" fill="white" font-size="13" font-weight="bold">タコノマクラ（ウニ） 0.35億</text><text x="55" y="66" text-anchor="end" fill="white" font-size="12">ネコ</text><text x="55" y="111" text-anchor="end" fill="white" font-size="12">タコ</text><text x="55" y="156" text-anchor="end" fill="white" font-size="12">イカ</text><text x="55" y="201" text-anchor="end" fill="white" font-size="12">ウニ</text></svg>


---

# タコはなぜ異質か（2/2）

- - **寿命：** 1〜2年（この短命で高知性を獲得）
- 最も近い知性を持つ脊椎動物（魚・鳥・哺乳類）と5億年以上前に分岐した**独立した知性の進化**
- <svg viewBox="0 0 800 240" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="240" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="15" font-weight="bold">収斂進化：独立して発達した高知性</text><line x1="80" y1="120" x2="720" y2="120" stroke="#f9a825" stroke-width="3"/><polygon points="720,115 735,120 720,125" fill="#f9a825"/><text x="80" y="145" fill="#aaa" font-size="11">5.4億年前</text><text x="280" y="145" fill="#aaa" font-size="11">3億年前</text><text x="500" y="145" fill="#aaa" font-size="11">1億年前</text><text x="680" y="145" fill="#aaa" font-size="11">現在</text><circle cx="100" cy="120" r="8" fill="#e91e63"/><text x="100" y="105" text-anchor="middle" fill="#e91e63" font-size="12" font-weight="bold">軟体動物</text><text x="100" y="92" text-anchor="middle" fill="#e91e63" font-size="11">分岐</text><line x1="100" y1="120" x2="160" y2="65" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><circle cx="160" cy="60" r="7" fill="#f9a825"/><text x="160" y="48" text-anchor="middle" fill="#f9a825" font-size="12">タコの祖先</text><line x1="100" y1="120" x2="160" y2="175" stroke="#4fc3f7" stroke-width="2" stroke-dasharray="5,4"/><circle cx="160" cy="178" r="7" fill="#4fc3f7"/><text x="160" y="200" text-anchor="middle" fill="#4fc3f7" font-size="12">脊椎動物の祖先</text><circle cx="680" cy="60" r="10" fill="#f9a825"/><text x="680" y="47" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">タコ</text><text x="680" y="35" text-anchor="middle" fill="white" font-size="11">5億ニューロン</text><circle cx="680" cy="178" r="10" fill="#4fc3f7"/><text x="680" y="195" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">霊長類</text><text x="680" y="210" text-anchor="middle" fill="white" font-size="11">1000億ニューロン</text><line x1="160" y1="60" x2="680" y2="60" stroke="#f9a825" stroke-width="2"/><line x1="160" y1="178" x2="680" y2="178" stroke="#4fc3f7" stroke-width="2"/><text x="400" y="80" text-anchor="middle" fill="#f9a825" font-size="11">独立した知性の進化経路</text></svg>


---

<!-- _class: lead -->
# 分散知性のアーキテクチャ


---

# 腕が「考える」という革命的な設計（1/2）

- タコの腕は中央脳の指令なしに自律的に動く：
- 中央脳：「右前の腕でエサをとれ」と大まかな指令のみ
- 腕：自分でどう動かすか、どう把持するかを判断
- → **エッジコンピューティングの生物版**
- <svg viewBox="0 0 800 230" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="230" fill="#1a1a2e"/><text x="400" y="25" text-anchor="middle" fill="white" font-size="15" font-weight="bold">分散制御アーキテクチャ</text><rect x="330" y="40" width="140" height="50" rx="8" fill="#e91e63"/><text x="400" y="61" text-anchor="middle" fill="white" font-size="13" font-weight="bold">中央脳</text><text x="400" y="78" text-anchor="middle" fill="white" font-size="11">「腕Aで掴め」</text><line x1="370" y1="90" x2="160" y2="140" stroke="#f9a825" stroke-width="2"/><line x1="385" y1="90" x2="270" y2="140" stroke="#f9a825" stroke-width="2"/><line x1="400" y1="90" x2="400" y2="140" stroke="#f9a825" stroke-width="2"/><line x1="415" y1="90" x2="530" y2="140" stroke="#f9a825" stroke-width="2"/><line x1="430" y1="90" x2="640" y2="140" stroke="#f9a825" stroke-width="2"/><rect x="100" y="140" width="120" height="50" rx="6" fill="#f9a825"/><text x="160" y="161" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">腕 1</text><text x="160" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">自律判断</text><rect x="210" y="140" width="120" height="50" rx="6" fill="#f9a825"/><text x="270" y="161" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">腕 2</text><text x="270" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">自律判断</text><rect x="340" y="140" width="120" height="50" rx="6" fill="#f9a825"/><text x="400" y="161" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">腕 3</text><text x="400" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">自律判断</text><rect x="470" y="140" width="120" height="50" rx="6" fill="#f9a825"/><text x="530" y="161" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">腕 4</text><text x="530" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">自律判断</text><rect x="580" y="140" width="120" height="50" rx="6" fill="#f9a825"/><text x="640" y="161" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">腕 5〜8</text><text x="640" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">自律判断</text><text x="160" y="215" text-anchor="middle" fill="#aaa" font-size="10">局所ニューロン群</text><text x="400" y="215" text-anchor="middle" fill="#aaa" font-size="10">局所ニューロン群</text><text x="640" y="215" text-anchor="middle" fill="#aaa" font-size="10">局所ニューロン群</text></svg>


---

# 腕が「考える」という革命的な設計（2/2）

- 切断された腕でも1時間程度は自律的に動き続ける → 各腕が独立した「マイクロコントローラー」を持つ
- <svg viewBox="0 0 800 250" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="250" fill="#1a1a2e"/><text x="400" y="28" text-anchor="middle" fill="white" font-size="15" font-weight="bold">応答速度の比較：中央経由 vs 局所処理</text><rect x="60" y="50" width="320" height="150" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="220" y="78" text-anchor="middle" fill="#4fc3f7" font-size="14" font-weight="bold">ヒト（中央集権型）</text><text x="220" y="105" text-anchor="middle" fill="white" font-size="13">手の神経 → 脊髄 → 脳</text><text x="220" y="128" text-anchor="middle" fill="white" font-size="13">→ 脳で判断 → 脊髄 → 手</text><text x="220" y="165" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">100〜200 ms</text><rect x="420" y="50" width="320" height="150" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="580" y="78" text-anchor="middle" fill="#e91e63" font-size="14" font-weight="bold">タコ（分散型）</text><text x="580" y="105" text-anchor="middle" fill="white" font-size="13">刺激 → 腕の局所ニューロン</text><text x="580" y="128" text-anchor="middle" fill="white" font-size="13">→ その場で判断・実行</text><text x="580" y="165" text-anchor="middle" fill="#f9a825" font-size="20" font-weight="bold">数 ms</text><text x="220" y="220" text-anchor="middle" fill="#aaa" font-size="12">長距離信号伝達が必要</text><text x="580" y="220" text-anchor="middle" fill="#aaa" font-size="12">中央脳を経由しない</text></svg>


---

<!-- _class: lead -->
# タコとニューラルネットの比較


---

# 中央集権 vs 分散の性能比較

| 特性 | 中央集権型脳（人間） | 分散型脳（タコ） |
|:---|:---|:---|
| 応答速度 | 遅い（長距離通信） | 速い（局所処理） |
| 故障耐性 | 脳損傷→機能喪失 | 腕損傷→他は正常 |
| 複雑な統合 | 得意 | 苦手 |
| 並列処理 | 限定的 | 8腕が同時並行 |
| 配線コスト | 高い | 低い |
- <svg viewBox="0 0 800 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="210" fill="#1a1a2e"/><text x="400" y="25" text-anchor="middle" fill="white" font-size="14" font-weight="bold">性能比較レーダー（概念図）</text><polygon points="400,40 520,90 490,190 310,190 280,90" fill="#4fc3f7" fill-opacity="0.18" stroke="#4fc3f7" stroke-width="2"/><polygon points="400,70 480,100 460,175 340,175 320,100" fill="#e91e63" fill-opacity="0.18" stroke="#e91e63" stroke-width="2"/><text x="400" y="35" text-anchor="middle" fill="#aaa" font-size="10">複雑な統合</text><text x="535" y="93" fill="#aaa" font-size="10">並列処理</text><text x="493" y="200" text-anchor="middle" fill="#aaa" font-size="10">故障耐性</text><text x="300" y="200" text-anchor="middle" fill="#aaa" font-size="10">応答速度</text><text x="255" y="93" fill="#aaa" font-size="10">配線効率</text><rect x="530" y="80" width="14" height="14" fill="#4fc3f7" fill-opacity="0.6" stroke="#4fc3f7" stroke-width="1"/><text x="549" y="92" fill="white" font-size="12">ヒト（中央集権）</text><rect x="530" y="105" width="14" height="14" fill="#e91e63" fill-opacity="0.6" stroke="#e91e63" stroke-width="1"/><text x="549" y="117" fill="white" font-size="12">タコ（分散型）</text></svg>


---

# ディープラーニングとタコ型の対比（1/2）

- **従来のディープラーニング（人間型）：**
- 全データを中央のGPUに集めて処理
- → 通信コスト・プライバシー問題・スケール限界
- **フェデレーテッドラーニング（タコ型）：**
- <svg viewBox="0 0 800 200" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="200" fill="#1a1a2e"/><text x="200" y="25" text-anchor="middle" fill="white" font-size="13" font-weight="bold">従来型：データを中央集約</text><text x="600" y="25" text-anchor="middle" fill="white" font-size="13" font-weight="bold">フェデレーテッド：差分のみ送信</text><rect x="165" y="75" width="70" height="40" rx="6" fill="#e91e63"/><text x="200" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">中央GPU</text><circle cx="60" cy="155" r="22" fill="#4fc3f7"/><text x="60" y="160" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末A</text><circle cx="130" cy="165" r="22" fill="#4fc3f7"/><text x="130" y="170" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末B</text><circle cx="200" cy="168" r="22" fill="#4fc3f7"/><text x="200" y="173" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末C</text><circle cx="270" cy="165" r="22" fill="#4fc3f7"/><text x="270" y="170" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末D</text><circle cx="340" cy="155" r="22" fill="#4fc3f7"/><text x="340" y="160" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末E</text><line x1="82" y1="140" x2="175" y2="105" stroke="#ff5252" stroke-width="2"/><line x1="150" y1="148" x2="185" y2="110" stroke="#ff5252" stroke-width="2"/><line x1="200" y1="146" x2="200" y2="115" stroke="#ff5252" stroke-width="2"/><line x1="250" y1="148" x2="215" y2="110" stroke="#ff5252" stroke-width="2"/><line x1="318" y1="140" x2="225" y2="105" stroke="#ff5252" stroke-width="2"/><text x="200" y="185" text-anchor="middle" fill="#ff5252" font-size="10">全生データを送信 ← プライバシーリスク</text><rect x="565" y="75" width="70" height="40" rx="6" fill="#f9a825"/><text x="600" y="100" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">集約サーバー</text><circle cx="460" cy="155" r="22" fill="#81c784"/><text x="460" y="153" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末A</text><text x="460" y="165" text-anchor="middle" fill="#1a1a2e" font-size="9">局所学習</text><circle cx="530" cy="165" r="22" fill="#81c784"/><text x="530" y="163" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末B</text><text x="530" y="175" text-anchor="middle" fill="#1a1a2e" font-size="9">局所学習</text><circle cx="600" cy="168" r="22" fill="#81c784"/><text x="600" y="166" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末C</text><text x="600" y="178" text-anchor="middle" fill="#1a1a2e" font-size="9">局所学習</text><circle cx="670" cy="165" r="22" fill="#81c784"/><text x="670" y="163" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末D</text><text x="670" y="175" text-anchor="middle" fill="#1a1a2e" font-size="9">局所学習</text><circle cx="740" cy="155" r="22" fill="#81c784"/><text x="740" y="153" text-anchor="middle" fill="#1a1a2e" font-size="10" font-weight="bold">端末E</text><text x="740" y="165" text-anchor="middle" fill="#1a1a2e" font-size="9">局所学習</text><line x1="480" y1="140" x2="575" y2="105" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><line x1="548" y1="148" x2="585" y2="110" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><line x1="600" y1="146" x2="600" y2="115" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><line x1="652" y1="148" x2="615" y2="110" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><line x1="718" y1="140" x2="625" y2="105" stroke="#f9a825" stroke-width="2" stroke-dasharray="4,3"/><text x="600" y="185" text-anchor="middle" fill="#81c784" font-size="10">モデル差分のみ送信 ← プライバシー保護</text></svg>


---

# ディープラーニングとタコ型の対比（2/2）

- 各デバイス（腕）が局所的に学習
- 重みの更新情報のみを中央に送る
- → データをデバイス外に出さずに学習
- ---
- Google・Apple がスマートフォンのキーボード予測に採用
- タコは5億年前にこのアーキテクチャを発明していた


---

<!-- _class: lead -->
# 皮膚で「見る」タコ


---

# 色盲なのに色を偽装できる謎（1/2）

- タコの目：**単色（色盲）**
- タコの皮膚擬態：**数百万の色パターンを再現**
- **仮説（2015年 Sci Adv）：** 瞳孔の形を変えることで異なる波長の光を順次受光
- <svg viewBox="0 0 800 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="210" fill="#1a1a2e"/><text x="400" y="25" text-anchor="middle" fill="white" font-size="14" font-weight="bold">皮膚光受容：分散センサーネットワーク</text><ellipse cx="200" cy="115" rx="80" ry="60" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="200" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">皮膚</text><circle cx="160" cy="115" r="8" fill="#f9a825" opacity="0.8"/><circle cx="185" cy="105" r="6" fill="#f9a825" opacity="0.7"/><circle cx="210" cy="118" r="7" fill="#f9a825" opacity="0.85"/><circle cx="235" cy="108" r="6" fill="#f9a825" opacity="0.7"/><circle cx="175" cy="130" r="7" fill="#f9a825" opacity="0.75"/><circle cx="220" cy="132" r="6" fill="#f9a825" opacity="0.8"/><text x="200" y="155" text-anchor="middle" fill="#f9a825" font-size="11">オプシン含有細胞</text><text x="200" y="170" text-anchor="middle" fill="#aaa" font-size="10">光を直接感知</text><rect x="330" y="60" width="100" height="50" rx="6" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="380" y="82" text-anchor="middle" fill="#4fc3f7" font-size="11" font-weight="bold">目（単色）</text><text x="380" y="100" text-anchor="middle" fill="#aaa" font-size="10">瞳孔形状を変化</text><line x1="430" y1="85" x2="520" y2="85" stroke="#4fc3f7" stroke-width="2"/><polygon points="520,80 535,85 520,90" fill="#4fc3f7"/><rect x="540" y="60" width="120" height="50" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="600" y="82" text-anchor="middle" fill="#e91e63" font-size="11" font-weight="bold">時系列情報</text><text x="600" y="100" text-anchor="middle" fill="#aaa" font-size="10">明暗パターンから色推定</text><line x1="600" y1="110" x2="600" y2="145" stroke="#e91e63" stroke-width="2"/><polygon points="595,145 600,160 605,145" fill="#e91e63"/><rect x="540" y="160" width="120" height="35" rx="6" fill="#e91e63" opacity="0.7"/><text x="600" y="183" text-anchor="middle" fill="white" font-size="12" font-weight="bold">クロマトフォア制御</text><text x="600" y="200" text-anchor="middle" fill="#aaa" font-size="10">皮膚の色素細胞を操作</text></svg>


---

# 色盲なのに色を偽装できる謎（2/2）

- → 時系列の明暗情報から色を推定する
- （オプシンが皮膚にも存在し、直接光を感知する可能性も）
- ---
- センサーが「ない」なら処理方法を変える
- → **ハードウェアの制約をソフトウェアで超える**


---

<!-- _class: lead -->
# 設計への応用


---

# エッジAIとタコ型アーキテクチャ（1/2）

- **タコ型設計の原則をシステムに適用：**
- 1. **エッジで処理する** — 全データを中央に送らない（レイテンシ・帯域削減）
- 2. **局所自律性を持つ** — 中央が落ちても各ノードは動き続ける
- <svg viewBox="0 0 800 210" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="210" fill="#1a1a2e"/><text x="400" y="25" text-anchor="middle" fill="white" font-size="14" font-weight="bold">タコ型エッジAIアーキテクチャ</text><rect x="320" y="40" width="160" height="50" rx="8" fill="#e91e63"/><text x="400" y="62" text-anchor="middle" fill="white" font-size="13" font-weight="bold">オーケストレーター</text><text x="400" y="80" text-anchor="middle" fill="white" font-size="11">（中央脳：疎な調整のみ）</text><line x1="380" y1="90" x2="140" y2="140" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><line x1="390" y1="90" x2="280" y2="140" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><line x1="400" y1="90" x2="400" y2="140" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><line x1="410" y1="90" x2="520" y2="140" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><line x1="420" y1="90" x2="660" y2="140" stroke="#f9a825" stroke-width="2" stroke-dasharray="5,4"/><rect x="80" y="140" width="120" height="55" rx="6" fill="#f9a825"/><text x="140" y="163" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">自動運転</text><text x="140" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">センサー局所判断</text><rect x="220" y="140" width="120" height="55" rx="6" fill="#f9a825"/><text x="280" y="163" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">スマートフォン</text><text x="280" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">FL学習</text><rect x="340" y="140" width="120" height="55" rx="6" fill="#f9a825"/><text x="400" y="163" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">IoTセンサー</text><text x="400" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">エッジ推論</text><rect x="460" y="140" width="120" height="55" rx="6" fill="#f9a825"/><text x="520" y="163" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">工場ロボット</text><text x="520" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">局所制御</text><rect x="600" y="140" width="120" height="55" rx="6" fill="#f9a825"/><text x="660" y="163" text-anchor="middle" fill="#1a1a2e" font-size="11" font-weight="bold">医療デバイス</text><text x="660" y="178" text-anchor="middle" fill="#1a1a2e" font-size="10">プライバシー保護</text></svg>


---

# エッジAIとタコ型アーキテクチャ（2/2）

- 3. **疎な中央通信** — 結果・差分のみを中央に送る
- 4. **故障を前提とする** — 腕1本が死んでも残り7本で機能
- ---
- **適用例：**
- 自動運転（各センサーが局所判断）・IoT・エッジAI


---

# まとめ：タコが教える分散知性

- ✅ **中央集権は「統合」に強く、「速度」に弱い**
- ✅ **分散は「速度・耐障害性」に強く、「統合」に弱い**
- ✅ **ハイブリッド設計** — タコも中央脳と分散腕の両方を持つ
- ✅ **エッジで処理、差分を集中** — フェデレーテッドラーニングの本質
- 「タコは、人間が今まさに設計しようとしているシステムを、5億年前に発明していた」
- <svg viewBox="0 0 800 160" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect width="800" height="160" fill="#1a1a2e"/><rect x="40" y="30" width="160" height="100" rx="8" fill="#16213e" stroke="#4fc3f7" stroke-width="2"/><text x="120" y="58" text-anchor="middle" fill="#4fc3f7" font-size="13" font-weight="bold">タコ</text><text x="120" y="78" text-anchor="middle" fill="white" font-size="11">分散神経系</text><text x="120" y="96" text-anchor="middle" fill="white" font-size="11">5億年前に実装</text><text x="120" y="115" text-anchor="middle" fill="#f9a825" font-size="11">〜5億ニューロン〜</text><line x1="200" y1="80" x2="290" y2="80" stroke="#f9a825" stroke-width="2"/><polygon points="290,75 305,80 290,85" fill="#f9a825"/><rect x="305" y="30" width="190" height="100" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="2"/><text x="400" y="58" text-anchor="middle" fill="#f9a825" font-size="13" font-weight="bold">フェデレーテッドAI</text><text x="400" y="78" text-anchor="middle" fill="white" font-size="11">分散学習・エッジ処理</text><text x="400" y="96" text-anchor="middle" fill="white" font-size="11">2017〜現在</text><text x="400" y="115" text-anchor="middle" fill="#f9a825" font-size="11">Google・Apple採用</text><line x1="495" y1="80" x2="555" y2="80" stroke="#f9a825" stroke-width="2"/><polygon points="555,75 570,80 555,85" fill="#f9a825"/><rect x="570" y="30" width="190" height="100" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="2"/><text x="665" y="58" text-anchor="middle" fill="#e91e63" font-size="13" font-weight="bold">未来のAI設計</text><text x="665" y="78" text-anchor="middle" fill="white" font-size="11">自律エージェント群</text><text x="665" y="96" text-anchor="middle" fill="white" font-size="11">疎な協調・局所判断</text><text x="665" y="115" text-anchor="middle" fill="#f9a825" font-size="11">タコ型アーキテクチャ</text></svg>

