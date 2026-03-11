import { readFileSync, writeFileSync } from "fs";

const BASE = "/workspace/main/docs/20260220063800_english-global-standard";

// Slide 3: 数字で見る英語の支配力 — infographic
const svgEnglishDominance = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="380" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語の支配力：数字で見る</text>
  <!-- 1.5B speakers -->
  <rect x="40" y="60" width="170" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="125" y="95" fill="#f9a825" font-size="28" font-family="sans-serif" text-anchor="middle" font-weight="bold">15億</text>
  <text x="125" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">英語話者数</text>
  <text x="125" y="133" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">母語3.8億+第二言語11億</text>
  <text x="125" y="150" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">非母語が母語の約3倍</text>
  <!-- 60% internet -->
  <rect x="230" y="60" width="155" height="100" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="307" y="95" fill="#f9a825" font-size="28" font-family="sans-serif" text-anchor="middle" font-weight="bold">60%+</text>
  <text x="307" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">Web コンテンツ</text>
  <text x="307" y="133" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">英語の割合</text>
  <!-- 95% science -->
  <rect x="405" y="60" width="155" height="100" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="482" y="95" fill="#e91e63" font-size="28" font-family="sans-serif" text-anchor="middle" font-weight="bold">95%+</text>
  <text x="482" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">科学論文</text>
  <text x="482" y="133" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">英語で発表</text>
  <!-- aviation -->
  <rect x="580" y="60" width="175" height="100" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="667" y="95" fill="#e91e63" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">唯一の</text>
  <text x="667" y="113" fill="#e91e63" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">公用語</text>
  <text x="667" y="133" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">国際航空管制</text>
  <!-- native vs non-native bar -->
  <text x="400" y="205" fill="#ffffff" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">母語話者 vs 非母語話者（全英語話者 15億人）</text>
  <rect x="80" y="220" width="228" height="38" rx="4" fill="#e91e63" opacity="0.8"/>
  <text x="194" y="244" fill="#ffffff" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">母語 3.8億 (25%)</text>
  <rect x="308" y="220" width="412" height="38" rx="4" fill="#f9a825" opacity="0.8"/>
  <text x="514" y="244" fill="#1a1a2e" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">非母語 11億 (75%)</text>
  <text x="400" y="310" fill="#aaaaaa" font-size="12" font-family="sans-serif" text-anchor="middle">英語はもはやイギリスやアメリカの言語ではない</text>
  <text x="400" y="332" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">世界中の人々が「互いに会話するため」に使う言語</text>
  <text x="400" y="362" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">歴史上、一つの言語がここまで支配的になったことはない</text>
</svg>`;

// Slide 5: 大英帝国と言語拡散
const svgEmpire = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">大英帝国による英語の拡散メカニズム</text>
  <!-- UK center -->
  <ellipse cx="400" cy="175" rx="60" ry="40" fill="#16213e" stroke="#f9a825" stroke-width="2.5"/>
  <text x="400" y="172" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">大英帝国</text>
  <text x="400" y="188" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">19c ピーク</text>
  <!-- radiating colonies -->
  <line x1="345" y1="148" x2="210" y2="90" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="100" y="60" width="110" height="55" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="155" y="83" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">北米</text>
  <text x="155" y="100" fill="#ffffff" font-size="9" font-family="sans-serif" text-anchor="middle">植民地支配</text>
  <text x="155" y="112" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">→ 定着</text>
  <line x1="400" y1="135" x2="400" y2="65" stroke="#f9a825" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="340" y="30" width="120" height="40" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="52" fill="#f9a825" font-size="11" font-family="sans-serif" text-anchor="middle">オーストラリア</text>
  <line x1="455" y1="148" x2="590" y2="90" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="590" y="60" width="110" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="645" y="83" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">インド</text>
  <text x="645" y="100" fill="#ffffff" font-size="9" font-family="sans-serif" text-anchor="middle">教育言語を英語に</text>
  <text x="645" y="112" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">マコーレー1835</text>
  <line x1="345" y1="205" x2="210" y2="260" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="100" y="250" width="110" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="155" y="273" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">アフリカ</text>
  <text x="155" y="290" fill="#ffffff" font-size="9" font-family="sans-serif" text-anchor="middle">行政・教育に</text>
  <text x="155" y="302" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">英語を強制</text>
  <line x1="455" y1="205" x2="590" y2="260" stroke="#e91e63" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="590" y="250" width="110" height="55" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="645" y="273" fill="#e91e63" font-size="11" font-family="sans-serif" text-anchor="middle">中東・他</text>
  <text x="645" y="290" fill="#ffffff" font-size="9" font-family="sans-serif" text-anchor="middle">植民地エリートが</text>
  <text x="645" y="302" fill="#aaaaaa" font-size="9" font-family="sans-serif" text-anchor="middle">英語を習得</text>
  <!-- result -->
  <text x="400" y="345" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">「英語を話す現地人」が帝国統治の道具 → 独立後も英語が残る</text>
</svg>`;

// Slide 8: Why not French
const svgAmericanPower = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">なぜフランス語でなく英語が勝ったか — 権力の移行</text>
  <!-- timeline -->
  <line x1="80" y1="140" x2="720" y2="140" stroke="#f9a825" stroke-width="2.5"/>
  <!-- French dominance -->
  <rect x="80" y="65" width="240" height="60" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="200" y="90" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">18世紀まで</text>
  <text x="200" y="110" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">フランス語が外交共通語</text>
  <line x1="200" y1="125" x2="200" y2="140" stroke="#e91e63" stroke-width="2"/>
  <circle cx="200" cy="140" r="8" fill="#e91e63"/>
  <!-- 1919 pivot -->
  <rect x="310" y="65" width="185" height="60" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="402" y="90" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">1919年</text>
  <text x="402" y="110" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">ベルサイユ条約で英語初登場</text>
  <line x1="402" y1="125" x2="402" y2="140" stroke="#f9a825" stroke-width="2"/>
  <circle cx="402" cy="140" r="8" fill="#f9a825"/>
  <!-- American dominance -->
  <rect x="500" y="65" width="215" height="60" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="607" y="90" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">20世紀〜現在</text>
  <text x="607" y="108" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">WW2後: アメリカが超大国</text>
  <line x1="607" y1="125" x2="607" y2="140" stroke="#f9a825" stroke-width="2"/>
  <circle cx="607" cy="140" r="8" fill="#f9a825"/>
  <!-- causes box -->
  <rect x="80" y="185" width="290" height="120" rx="8" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="225" y="210" fill="#e91e63" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語覇権の決定要因</text>
  <text x="225" y="232" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">WW1/WW2でヨーロッパが疲弊</text>
  <text x="225" y="252" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">アメリカが軍事・経済で台頭</text>
  <text x="225" y="272" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">マーシャル・プラン → 文化浸透</text>
  <text x="225" y="290" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">言語覇権 = 軍事力 × 経済力</text>
  <!-- result box -->
  <rect x="430" y="185" width="290" height="120" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="575" y="210" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語覇権の定着</text>
  <text x="575" y="232" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">ハリウッド映画: 世界に浸透</text>
  <text x="575" y="252" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">IBM・Intel・シリコンバレー</text>
  <text x="575" y="272" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">GAFAM: 全てアメリカ企業</text>
  <text x="575" y="290" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">ネットワーク効果で固定化</text>
  <text x="400" y="352" fill="#888888" font-size="11" font-family="sans-serif" text-anchor="middle">言語の覇権は偶然ではなく、軍事・経済・文化の力の蓄積で決まる</text>
</svg>`;

// Slide 10: Hollywood/tech English
const svgSoftPower = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語を強化し続ける3つのソフトパワー</text>
  <!-- Hollywood -->
  <rect x="40" y="70" width="220" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="150" y="100" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">映画・音楽</text>
  <text x="150" y="125" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ハリウッド: 世界興収30%+</text>
  <text x="150" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">英語楽曲: Billboard70%</text>
  <text x="150" y="172" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">娯楽 = 英語に触れる</text>
  <text x="150" y="190" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">日常的な時間</text>
  <text x="150" y="210" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">選んで学ぶより自然に習得</text>
  <!-- Tech -->
  <rect x="290" y="70" width="220" height="160" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="100" fill="#e91e63" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">テクノロジー</text>
  <text x="400" y="125" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">GAFAM: 全てUSA企業</text>
  <text x="400" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">GitHub: 英語でコード</text>
  <text x="400" y="172" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">ドキュメント・Stack Overflow</text>
  <text x="400" y="190" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">全て英語が優先</text>
  <text x="400" y="210" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">エンジニアは英語必須</text>
  <!-- Academia -->
  <rect x="540" y="70" width="220" height="160" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="650" y="100" fill="#f9a825" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">学術</text>
  <text x="650" y="125" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">QS上位大の過半数が英語圏</text>
  <text x="650" y="148" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">論文95%+が英語</text>
  <text x="650" y="172" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">英語 = 知識へのアクセス</text>
  <text x="650" y="190" fill="#aaaaaa" font-size="10" font-family="sans-serif" text-anchor="middle">研究者に英語は必須</text>
  <text x="650" y="210" fill="#888888" font-size="9" font-family="sans-serif" text-anchor="middle">Nature, Science 全て英語</text>
  <!-- summary -->
  <rect x="150" y="275" width="500" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="298" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">3つが相互強化：英語を学ぶほど価値が高まる</text>
  <text x="400" y="318" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">娯楽・テクノロジー・学術の全てが英語覇権を維持・拡大する</text>
</svg>`;

// Slide 13: Internet & English
const svgInternet = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">インターネットは英語で設計された</text>
  <!-- stack boxes -->
  <rect x="80" y="55" width="640" height="52" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="80" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">ARPANET (1969) — 米国国防総省プロジェクト</text>
  <text x="400" y="97" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">初期Webサイト 99% が英語 (1995年)</text>
  <rect x="80" y="120" width="310" height="52" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="235" y="145" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">HTTP / HTML</text>
  <text x="235" y="162" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">英語キーワードで構成</text>
  <rect x="410" y="120" width="310" height="52" rx="6" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="565" y="145" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">RFC 仕様書</text>
  <text x="565" y="162" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">全て英語で書かれる</text>
  <rect x="80" y="185" width="310" height="52" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="235" y="210" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">ドメイン名</text>
  <text x="235" y="227" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">長らくASCII（英字）のみ</text>
  <rect x="410" y="185" width="310" height="52" rx="6" fill="#16213e" stroke="#e91e63" stroke-width="1.5"/>
  <text x="565" y="210" fill="#e91e63" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">プログラミング言語</text>
  <text x="565" y="227" fill="#ffffff" font-size="10" font-family="sans-serif" text-anchor="middle">全キーワードが英語</text>
  <!-- result -->
  <rect x="120" y="280" width="560" height="60" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="305" fill="#f9a825" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold">インターネットの技術層が英語圏の思考で設計された</text>
  <text x="400" y="325" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">→ 英語を読めないプログラマーは構造的に不利な世界</text>
  <text x="400" y="355" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">技術的必然ではなく歴史的偶然 + 文化的慣性</text>
</svg>`;

// Slide 16: Future of English
const svgFuture = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0">
  <rect width="800" height="370" fill="#1a1a2e"/>
  <text x="400" y="30" fill="#ffffff" font-size="17" font-family="sans-serif" text-anchor="middle" font-weight="bold">英語の覇権は続くか？ 2つのシナリオ</text>
  <!-- scenario A -->
  <rect x="40" y="60" width="330" height="200" rx="10" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="205" y="88" fill="#f9a825" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">シナリオA: 英語覇権継続</text>
  <text x="205" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">ネットワーク効果</text>
  <text x="205" y="135" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">「皆が使うから皆が使う」</text>
  <text x="205" y="160" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">中国語台頭も代替せず</text>
  <text x="205" y="180" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">母語話者9億でも学術・ビジネス</text>
  <text x="205" y="197" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">では英語を代替できていない</text>
  <text x="205" y="222" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">蓋然性: 高い（〜2040年）</text>
  <text x="205" y="242" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">共通文化としての地位は残る</text>
  <!-- scenario B -->
  <rect x="430" y="60" width="330" height="200" rx="10" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="595" y="88" fill="#e91e63" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">シナリオB: 翻訳技術で解消</text>
  <text x="595" y="115" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">AIリアルタイム翻訳</text>
  <text x="595" y="135" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">Meta/Googleが普及させれば</text>
  <text x="595" y="160" fill="#ffffff" font-size="12" font-family="sans-serif" text-anchor="middle">言語障壁が技術で解消</text>
  <text x="595" y="180" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">英語必要性は低下する</text>
  <text x="595" y="200" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">各言語の価値が相対的に上昇</text>
  <text x="595" y="222" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">2030年代以降に徐々に影響</text>
  <text x="595" y="242" fill="#888888" font-size="10" font-family="sans-serif" text-anchor="middle">多言語能力の価値が再評価</text>
  <!-- conclusion -->
  <rect x="120" y="295" width="560" height="50" rx="8" fill="#16213e" stroke="#f9a825" stroke-width="1.5"/>
  <text x="400" y="320" fill="#f9a825" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">多言語能力 = 複数の「思考フレームワーク」を持つこと</text>
  <text x="400" y="338" fill="#aaaaaa" font-size="11" font-family="sans-serif" text-anchor="middle">翻訳されない文化的文脈・ニュアンスの価値は消えない</text>
</svg>`;

// --- Patch slides-data.json ---
const data = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));

// index 3: 数字で見る英語の支配力
data.slides[3].content = [
	`![w:800 center](assets/svg-english-dominance.svg)`,
	...data.slides[3].content,
];
// index 5: 「太陽の沈まない帝国」と言語
data.slides[5].content = [
	`![w:800 center](assets/svg-empire.svg)`,
	...data.slides[5].content,
];
// index 7: なぜフランス語でなく英語か
data.slides[7].content = [
	`![w:800 center](assets/svg-american-power.svg)`,
	...data.slides[7].content,
];
// index 9: ハリウッド・音楽・テック
data.slides[9].content = [
	`![w:800 center](assets/svg-soft-power.svg)`,
	...data.slides[9].content,
];
// index 11: インターネットは英語で生まれた
data.slides[11].content = [
	`![w:800 center](assets/svg-internet.svg)`,
	...data.slides[11].content,
];
// index 14: 英語の覇権は続くか？
data.slides[14].content = [
	`![w:800 center](assets/svg-future.svg)`,
	...data.slides[14].content,
];

writeFileSync(`${BASE}/slides-data.json`, JSON.stringify(data, null, "\t"));
writeFileSync(`${BASE}/assets/svg-english-dominance.svg`, svgEnglishDominance);
writeFileSync(`${BASE}/assets/svg-empire.svg`, svgEmpire);
writeFileSync(`${BASE}/assets/svg-american-power.svg`, svgAmericanPower);
writeFileSync(`${BASE}/assets/svg-soft-power.svg`, svgSoftPower);
writeFileSync(`${BASE}/assets/svg-internet.svg`, svgInternet);
writeFileSync(`${BASE}/assets/svg-future.svg`, svgFuture);

console.log(
	"english-global-standard: SVGs written and slides-data.json updated.",
);
const updated = JSON.parse(readFileSync(`${BASE}/slides-data.json`, "utf-8"));
let svgCount = 0;
for (const s of updated.slides) {
	if (s.content && s.content.some((c: string) => c.includes(".svg")))
		svgCount++;
}
console.log(`SVG-bearing slides: ${svgCount} / ${updated.slides.length}`);
