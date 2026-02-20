---
marp: true
theme: gaia
class: invert
size: 16:9
paginate: true
header: "炭素認識コンピューティング"
footer: "© 2026"
style: |
  section pre code { font-size: 0.58em; line-height: 1.4; }

---

<!-- _class: lead -->
# 炭素認識コンピューティング

- コードが地球環境に与える影響と
- グリーンソフトウェアの設計
- 
- 2026.02.20


---

<!-- _class: lead -->
# データセンターの環境負荷

- ソフトウェアは「仮想」ではない — 物理的な電力を消費している


---

# ITの炭素フットプリント

- データセンターは世界の電力消費の**1〜2%**（航空業界に匹敵）
- GPT-3の学習1回 = **約500トンCO2e**（車120台の年間排出量相当）
- 2030年までにIT全体で世界のCO2排出の**6〜8%**と予測
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>セクター別CO2排出量比較</text><rect x='60' y='55' width='120' height='160' rx='6' fill='#e63946' fill-opacity='0.7' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='120' y='235' text-anchor='middle' fill='#ff8888' font-size='11'>航空業界</text><text x='120' y='140' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>2.5%</text><rect x='220' y='70' width='120' height='145' rx='6' fill='#f77f00' fill-opacity='0.7' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='280' y='235' text-anchor='middle' fill='#ffaa44' font-size='11'>IT全体</text><text x='280' y='148' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>2.1%</text><rect x='380' y='115' width='120' height='100' rx='6' fill='#4ecdc4' fill-opacity='0.7' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='440' y='235' text-anchor='middle' fill='#4ecdc4' font-size='11'>データセンター</text><text x='440' y='170' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>1.5%</text><rect x='540' y='150' width='120' height='65' rx='6' fill='#a78bfa' fill-opacity='0.7' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='600' y='235' text-anchor='middle' fill='#a78bfa' font-size='11'>AI学習</text><text x='600' y='188' text-anchor='middle' fill='#fff' font-size='14' font-weight='bold'>0.5%</text><text x='600' y='260' text-anchor='middle' fill='#ff6b6b' font-size='10'>急速に成長中</text><line x1='660' y1='150' x2='720' y2='80' stroke='#ff6b6b' stroke-width='2'/><polygon points='717,85 725,75 712,80' fill='#ff6b6b'/><text x='730' y='78' fill='#ff6b6b' font-size='10'>2030年</text><text x='730' y='92' fill='#ff6b6b' font-size='10'>6-8%予測</text></svg>

<!--
IEAの報告では2022年時点でデータセンターの電力消費は460TWh。AI学習の急増で2030年までに倍増する可能性がある。
-->

---

# 電力グリッドの炭素強度は変動する

- 同じ1kWhの電力でも、**時間帯**と**地域**でCO2排出量が10倍以上異なる
- 風力・太陽光が豊富な時間帯は炭素強度が低い
- 
- <svg viewBox='0 0 800 300' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>1日の炭素強度変動（gCO2/kWh）</text><line x1='80' y1='250' x2='740' y2='250' stroke='#555' stroke-width='1'/><line x1='80' y1='50' x2='80' y2='250' stroke='#555' stroke-width='1'/><text x='70' y='55' text-anchor='end' fill='#888' font-size='10'>500</text><text x='70' y='105' text-anchor='end' fill='#888' font-size='10'>400</text><text x='70' y='155' text-anchor='end' fill='#888' font-size='10'>300</text><text x='70' y='205' text-anchor='end' fill='#888' font-size='10'>200</text><text x='70' y='255' text-anchor='end' fill='#888' font-size='10'>100</text><path d='M80,120 Q120,115 160,100 Q200,90 240,85 Q280,100 320,130 Q360,160 400,180 Q440,190 480,170 Q520,140 560,100 Q600,80 640,70 Q680,90 720,130' fill='none' stroke='#ff6b6b' stroke-width='2.5'/><text x='730' y='135' fill='#ff6b6b' font-size='9'>炭素強度</text><path d='M80,200 Q120,210 160,220 Q200,230 240,235 Q280,220 320,180 Q360,140 400,110 Q440,100 480,120 Q520,160 560,210 Q600,230 640,240 Q680,220 720,190' fill='none' stroke='#4ecdc4' stroke-width='2' stroke-dasharray='6,4'/><text x='730' y='195' fill='#4ecdc4' font-size='9'>風力発電量</text><rect x='320' y='55' width='200' height='30' rx='6' fill='#14532d' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.4))'/><text x='420' y='75' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>風力が増えると炭素強度が下がる</text><text x='130' y='275' fill='#888' font-size='10'>0:00</text><text x='240' y='275' fill='#888' font-size='10'>6:00</text><text x='400' y='275' fill='#888' font-size='10'>12:00</text><text x='560' y='275' fill='#888' font-size='10'>18:00</text><text x='700' y='275' fill='#888' font-size='10'>24:00</text></svg>

<!--
WattTimeやElectricityMaps のデータでは、例えばドイツでは風力の強い深夜にCO2強度が50gCO2/kWhまで下がり、石炭火力のピーク時には500gCO2/kWhを超える。
-->

---

<!-- _class: lead -->
# 炭素認識コンピューティングとは

- ワークロードを「いつ・どこで」実行するかで排出量を最適化する


---

# 時間シフト（Temporal Shifting）

- バッチ処理・機械学習ジョブを**炭素強度の低い時間帯**にスケジューリング
- Googleの「Carbon-Intelligent Computing」: 非即時タスクの実行時刻を自動調整
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>タスクスケジューリングと炭素強度の連動</text><rect x='60' y='50' width='100' height='50' rx='8' fill='#e63946' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='110' y='72' text-anchor='middle' fill='#fff' font-size='10' font-weight='bold'>バッチジョブ</text><text x='110' y='88' text-anchor='middle' fill='#ffd6d6' font-size='9'>14:00 (高炭素)</text><line x1='160' y1='75' x2='220' y2='75' stroke='#ff6b6b' stroke-width='2' stroke-dasharray='5,3'/><text x='190' y='65' text-anchor='middle' fill='#ff6b6b' font-size='18'>X</text><rect x='60' y='120' width='100' height='50' rx='8' fill='#e63946' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='110' y='142' text-anchor='middle' fill='#fff' font-size='10' font-weight='bold'>ML学習</text><text x='110' y='158' text-anchor='middle' fill='#ffd6d6' font-size='9'>10:00 (高炭素)</text><line x1='160' y1='145' x2='220' y2='145' stroke='#ff6b6b' stroke-width='2' stroke-dasharray='5,3'/><text x='190' y='135' text-anchor='middle' fill='#ff6b6b' font-size='18'>X</text><rect x='240' y='80' width='140' height='70' rx='10' fill='#264653' stroke='#4ecdc4' stroke-width='1.5'/><text x='310' y='105' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Carbon-Aware</text><text x='310' y='122' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>Scheduler</text><text x='310' y='140' text-anchor='middle' fill='#888' font-size='9'>WattTime API参照</text><line x1='380' y1='100' x2='450' y2='75' stroke='#4ecdc4' stroke-width='2'/><polygon points='447,70 457,75 447,80' fill='#4ecdc4'/><line x1='380' y1='130' x2='450' y2='145' stroke='#4ecdc4' stroke-width='2'/><polygon points='447,140 457,145 447,150' fill='#4ecdc4'/><rect x='460' y='50' width='120' height='50' rx='8' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='520' y='72' text-anchor='middle' fill='#4ecdc4' font-size='10' font-weight='bold'>バッチジョブ</text><text x='520' y='88' text-anchor='middle' fill='#b7e4c7' font-size='9'>03:00 (低炭素)</text><rect x='460' y='120' width='120' height='50' rx='8' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='520' y='142' text-anchor='middle' fill='#4ecdc4' font-size='10' font-weight='bold'>ML学習</text><text x='520' y='158' text-anchor='middle' fill='#b7e4c7' font-size='9'>02:00 (低炭素)</text><rect x='620' y='70' width='140' height='90' rx='10' fill='#14532d' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='690' y='95' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>CO2削減</text><text x='690' y='118' text-anchor='middle' fill='#fff' font-size='16' font-weight='bold'>-40%</text><text x='690' y='140' text-anchor='middle' fill='#b7e4c7' font-size='9'>同じ処理、低い排出</text><line x1='580' y1='105' x2='618' y2='105' stroke='#4ecdc4' stroke-width='1.5'/><polygon points='615,100 625,105 615,110' fill='#4ecdc4'/><text x='400' y='220' text-anchor='middle' fill='#ccc' font-size='11'>リアルタイム処理は対象外 — 遅延が許容できるジョブのみ</text><text x='400' y='248' text-anchor='middle' fill='#ffd93d' font-size='12' font-weight='bold'>Google: 非即時ワークロードの実行時刻を自動シフトし年間排出量を大幅削減</text></svg>

<!--
Googleは2020年からCarbon-Intelligent Computingを導入。データセンター内の非即時ワークロード（バッチ処理、一部の内部ML学習）の実行タイミングを自動調整。
-->

---

# 地域シフト（Spatial Shifting）

- 計算ワークロードを**再エネ比率の高いリージョン**に移動する
- マルチクラウド/マルチリージョンの新しい設計理由
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>リージョン別炭素強度（gCO2/kWh）</text><rect x='50' y='55' width='140' height='80' rx='8' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='120' y='78' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>北欧</text><text x='120' y='100' text-anchor='middle' fill='#fff' font-size='20' font-weight='bold'>20</text><text x='120' y='120' text-anchor='middle' fill='#b7e4c7' font-size='9'>水力 + 風力</text><rect x='220' y='55' width='140' height='80' rx='8' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='290' y='78' text-anchor='middle' fill='#a9d6e5' font-size='11' font-weight='bold'>フランス</text><text x='290' y='100' text-anchor='middle' fill='#fff' font-size='20' font-weight='bold'>60</text><text x='290' y='120' text-anchor='middle' fill='#a9d6e5' font-size='9'>原子力</text><rect x='390' y='55' width='140' height='80' rx='8' fill='#774936' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='460' y='78' text-anchor='middle' fill='#ddb892' font-size='11' font-weight='bold'>日本</text><text x='460' y='100' text-anchor='middle' fill='#fff' font-size='20' font-weight='bold'>450</text><text x='460' y='120' text-anchor='middle' fill='#ddb892' font-size='9'>火力発電中心</text><rect x='560' y='55' width='140' height='80' rx='8' fill='#7f1d1d' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='630' y='78' text-anchor='middle' fill='#ff8888' font-size='11' font-weight='bold'>インド</text><text x='630' y='100' text-anchor='middle' fill='#fff' font-size='20' font-weight='bold'>700</text><text x='630' y='120' text-anchor='middle' fill='#ff8888' font-size='9'>石炭火力中心</text><text x='120' y='160' text-anchor='middle' fill='#4ecdc4' font-size='24'>1x</text><text x='290' y='160' text-anchor='middle' fill='#a9d6e5' font-size='24'>3x</text><text x='460' y='160' text-anchor='middle' fill='#ddb892' font-size='24'>22x</text><text x='630' y='160' text-anchor='middle' fill='#ff8888' font-size='24'>35x</text><rect x='150' y='190' width='500' height='55' rx='8' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='213' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>同じ計算でもリージョンで排出量が35倍違う</text><text x='400' y='233' text-anchor='middle' fill='#ccc' font-size='10'>レイテンシとデータ主権の制約の中で最適化する</text></svg>

<!--
AWSのus-west-2(オレゴン)は水力発電比率が高く炭素強度が低い。ap-northeast-1(東京)は火力依存で高い。リージョン選択は環境に直結する。
-->

---

# 需要シェーピング

- ユーザー体験を損なわず**需要を低炭素時間帯に誘導**する設計
- 「後で処理してもよいですか？」というUXの提案
- 
- <svg viewBox='0 0 800 260' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='260' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>需要シェーピングの実例</text><rect x='40' y='50' width='220' height='100' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='150' y='78' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>Spotify</text><text x='150' y='100' text-anchor='middle' fill='#ccc' font-size='10'>WiFi接続時に楽曲を</text><text x='150' y='116' text-anchor='middle' fill='#ccc' font-size='10'>バックグラウンドDL</text><text x='150' y='136' text-anchor='middle' fill='#888' font-size='9'>モバイル通信を削減</text><rect x='290' y='50' width='220' height='100' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='78' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>Windows Update</text><text x='400' y='100' text-anchor='middle' fill='#ccc' font-size='10'>アクティブ時間外に</text><text x='400' y='116' text-anchor='middle' fill='#ccc' font-size='10'>アップデートを配信</text><text x='400' y='136' text-anchor='middle' fill='#888' font-size='9'>ピーク電力需要を回避</text><rect x='540' y='50' width='220' height='100' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='650' y='78' text-anchor='middle' fill='#4ecdc4' font-size='12' font-weight='bold'>CI/CD パイプライン</text><text x='650' y='100' text-anchor='middle' fill='#ccc' font-size='10'>非緊急ビルドを</text><text x='650' y='116' text-anchor='middle' fill='#ccc' font-size='10'>低炭素時間帯にキュー</text><text x='650' y='136' text-anchor='middle' fill='#888' font-size='9'>即時性が不要なジョブ</text><rect x='100' y='180' width='600' height='50' rx='8' fill='#14532d' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='203' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>ユーザーに選択肢を提供する</text><text x='400' y='220' text-anchor='middle' fill='#ccc' font-size='10'>「今すぐ処理（標準）」vs「低炭素モードで処理（ポイント付与）」</text></svg>

<!--
需要シェーピングはユーザーに押し付けるのではなく、選択肢として提供する。ゲーミフィケーション（エコポイント等）との組み合わせも有効。
-->

---

<!-- _class: lead -->
# 実装の最前線

- OSSツールとクラウドプロバイダーの取り組み


---

# Carbon Aware SDK

- **Green Software Foundation**が開発するOSSライブラリ
- 電力グリッドのCO2強度APIを統一的に利用可能
- WattTime / ElectricityMaps のデータをラップ

```typescript
// Carbon Aware SDK - タスクの最適実行時刻を取得
const forecast = await carbonAware.getEmissionsForecast({
  location: 'eastus',
  startTime: '2026-02-20T00:00:00Z',
  endTime: '2026-02-21T00:00:00Z',
  windowSize: 30  // 30分単位
});

// 最低炭素強度の時間帯を選択
const optimalWindow = forecast.optimalDataPoints[0];
console.log(`Best time: ${optimalWindow.timestamp}`);
console.log(`Carbon: ${optimalWindow.value} gCO2/kWh`);
```

<!--
Green Software Foundation（Microsoft、Google、Accenture等が設立）が中心。Carbon Aware SDKはC#/Python/TypeScriptで利用可能。
-->

---

# クラウドプロバイダーのツール

- 主要クラウドベンダーが炭素排出量の可視化と最適化を提供
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><rect x='40' y='40' width='220' height='130' rx='10' fill='#f77f00' fill-opacity='0.15' stroke='#f77f00' stroke-width='1.5'/><text x='150' y='68' text-anchor='middle' fill='#f77f00' font-size='13' font-weight='bold'>AWS</text><text x='150' y='90' text-anchor='middle' fill='#ccc' font-size='10'>Customer Carbon</text><text x='150' y='106' text-anchor='middle' fill='#ccc' font-size='10'>Footprint Tool</text><text x='150' y='130' text-anchor='middle' fill='#888' font-size='9'>サービス別CO2排出量</text><text x='150' y='148' text-anchor='middle' fill='#888' font-size='9'>リージョン最適化提案</text><rect x='290' y='40' width='220' height='130' rx='10' fill='#4ecdc4' fill-opacity='0.15' stroke='#4ecdc4' stroke-width='1.5'/><text x='400' y='68' text-anchor='middle' fill='#4ecdc4' font-size='13' font-weight='bold'>Google Cloud</text><text x='400' y='90' text-anchor='middle' fill='#ccc' font-size='10'>Carbon Footprint</text><text x='400' y='106' text-anchor='middle' fill='#ccc' font-size='10'>Dashboard</text><text x='400' y='130' text-anchor='middle' fill='#888' font-size='9'>プロジェクト別排出量</text><text x='400' y='148' text-anchor='middle' fill='#888' font-size='9'>低炭素リージョン推奨</text><rect x='540' y='40' width='220' height='130' rx='10' fill='#a78bfa' fill-opacity='0.15' stroke='#a78bfa' stroke-width='1.5'/><text x='650' y='68' text-anchor='middle' fill='#a78bfa' font-size='13' font-weight='bold'>Azure</text><text x='650' y='90' text-anchor='middle' fill='#ccc' font-size='10'>Emissions Impact</text><text x='650' y='106' text-anchor='middle' fill='#ccc' font-size='10'>Dashboard</text><text x='650' y='130' text-anchor='middle' fill='#888' font-size='9'>Scope 1,2,3対応</text><text x='650' y='148' text-anchor='middle' fill='#888' font-size='9'>炭素認識ジョブスケジューラ</text><rect x='100' y='200' width='600' height='50' rx='8' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='222' text-anchor='middle' fill='#ffd93d' font-size='12' font-weight='bold'>共通点: 「測定」→「可視化」→「最適化提案」のサイクル</text><text x='400' y='240' text-anchor='middle' fill='#ccc' font-size='10'>まず現状を知ることが、削減の第一歩</text></svg>

<!--
AWSは2024年にCustomer Carbon Footprint Toolを全アカウントで提供開始。Google Cloudは2023年からリージョン別Carbon-free Energy Percentageを公開。
-->

---

# SCI（Software Carbon Intensity）

- **ISO標準化**されたソフトウェアの炭素排出指標
- SCI = ((E x I) + M) / R
- 
- <svg viewBox='0 0 800 300' style='max-height:60vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='300' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='14' font-weight='bold'>SCI スコア計算式</text><text x='400' y='58' text-anchor='middle' fill='#fff' font-size='18' font-weight='bold'>SCI = ((E x I) + M) / R</text><rect x='50' y='80' width='160' height='80' rx='10' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='130' y='108' text-anchor='middle' fill='#4ecdc4' font-size='14' font-weight='bold'>E</text><text x='130' y='128' text-anchor='middle' fill='#ccc' font-size='10'>エネルギー消費</text><text x='130' y='145' text-anchor='middle' fill='#888' font-size='9'>(kWh)</text><rect x='230' y='80' width='160' height='80' rx='10' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='310' y='108' text-anchor='middle' fill='#a9d6e5' font-size='14' font-weight='bold'>I</text><text x='310' y='128' text-anchor='middle' fill='#ccc' font-size='10'>炭素強度</text><text x='310' y='145' text-anchor='middle' fill='#888' font-size='9'>(gCO2/kWh)</text><rect x='410' y='80' width='160' height='80' rx='10' fill='#774936' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='490' y='108' text-anchor='middle' fill='#ddb892' font-size='14' font-weight='bold'>M</text><text x='490' y='128' text-anchor='middle' fill='#ccc' font-size='10'>ハードウェア製造</text><text x='490' y='145' text-anchor='middle' fill='#888' font-size='9'>(gCO2e embodied)</text><rect x='590' y='80' width='160' height='80' rx='10' fill='#5a189a' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'/><text x='670' y='108' text-anchor='middle' fill='#e0aaff' font-size='14' font-weight='bold'>R</text><text x='670' y='128' text-anchor='middle' fill='#ccc' font-size='10'>機能単位</text><text x='670' y='145' text-anchor='middle' fill='#888' font-size='9'>(APIコール, ユーザー等)</text><rect x='100' y='190' width='600' height='80' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='215' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>SCIの活用方法</text><text x='400' y='238' text-anchor='middle' fill='#ccc' font-size='11'>KPIとして「1 APIコールあたり X gCO2e」を継続的に計測</text><text x='400' y='258' text-anchor='middle' fill='#ccc' font-size='11'>CI/CDパイプラインに組み込み、リグレッション検出</text></svg>

<!--
SCIはGreen Software FoundationがISO標準として策定。Rの選び方が重要で、APIコール・ユーザーセッション・トランザクションなどアプリケーション特性に応じて設定する。
-->

---

<!-- _class: lead -->
# ソフトウェア設計への反映

- コードレベルで炭素排出量を削減するパターン


---

# グリーンコーディングパターン

- **効率的なアルゴリズム選択**がCO2削減に直結する
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>グリーンコーディング5原則</text><rect x='40' y='50' width='140' height='90' rx='8' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='110' y='75' text-anchor='middle' fill='#4ecdc4' font-size='11' font-weight='bold'>1. 計算削減</text><text x='110' y='95' text-anchor='middle' fill='#ccc' font-size='9'>不要なループ排除</text><text x='110' y='110' text-anchor='middle' fill='#ccc' font-size='9'>キャッシュ活用</text><text x='110' y='125' text-anchor='middle' fill='#888' font-size='8'>O(n2)→O(n log n)</text><rect x='200' y='50' width='140' height='90' rx='8' fill='#1b4965' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='270' y='75' text-anchor='middle' fill='#a9d6e5' font-size='11' font-weight='bold'>2. データ転送</text><text x='270' y='95' text-anchor='middle' fill='#ccc' font-size='9'>圧縮・CDN活用</text><text x='270' y='110' text-anchor='middle' fill='#ccc' font-size='9'>不要なAPI呼出削減</text><text x='270' y='125' text-anchor='middle' fill='#888' font-size='8'>GraphQL活用</text><rect x='360' y='50' width='140' height='90' rx='8' fill='#774936' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='430' y='75' text-anchor='middle' fill='#ddb892' font-size='11' font-weight='bold'>3. 常駐排除</text><text x='430' y='95' text-anchor='middle' fill='#ccc' font-size='9'>サーバーレス活用</text><text x='430' y='110' text-anchor='middle' fill='#ccc' font-size='9'>アイドルリソース削減</text><text x='430' y='125' text-anchor='middle' fill='#888' font-size='8'>Lambda/Functions</text><rect x='520' y='50' width='140' height='90' rx='8' fill='#5a189a' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='590' y='75' text-anchor='middle' fill='#e0aaff' font-size='11' font-weight='bold'>4. ストレージ</text><text x='590' y='95' text-anchor='middle' fill='#ccc' font-size='9'>データライフサイクル</text><text x='590' y='110' text-anchor='middle' fill='#ccc' font-size='9'>TTL設定・古データ削除</text><text x='590' y='125' text-anchor='middle' fill='#888' font-size='8'>S3 Lifecycle Policy</text><rect x='680' y='50' width='80' height='90' rx='8' fill='#e63946' fill-opacity='0.3' stroke='#e63946' stroke-width='1'/><text x='720' y='75' text-anchor='middle' fill='#ff8888' font-size='11' font-weight='bold'>5. 言語</text><text x='720' y='95' text-anchor='middle' fill='#ccc' font-size='9'>Rust/Go >></text><text x='720' y='110' text-anchor='middle' fill='#ccc' font-size='9'>Python/Ruby</text><text x='720' y='125' text-anchor='middle' fill='#888' font-size='8'>70倍の効率差</text><rect x='100' y='170' width='600' height='80' rx='10' fill='#264653' style='filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'/><text x='400' y='198' text-anchor='middle' fill='#ffd93d' font-size='12' font-weight='bold'>「パフォーマンス最適化 = 炭素最適化」</text><text x='400' y='220' text-anchor='middle' fill='#ccc' font-size='10'>処理時間が半分 = 電力消費が半分 = CO2排出が半分</text><text x='400' y='240' text-anchor='middle' fill='#888' font-size='10'>Porto大学の研究: プログラミング言語による消費電力は最大70倍の差</text></svg>

<!--
Porto大学の'Energy Efficiency across Programming Languages'研究では、C/Rustが最も電力効率が高く、Python/Rubyが最も低いことが示されている。言語選択もエコロジーの一部。
-->

---

# AIモデルの「炭素効率」

- 大規模モデルの精度と炭素排出のトレードオフを意識する
- 
- <svg viewBox='0 0 800 280' style='max-height:55vh;width:auto;display:block;margin:0 auto;letter-spacing:0' style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"><rect x='0' y='0' width='800' height='280' fill='#1a1a2e' rx='12'/><text x='400' y='28' text-anchor='middle' fill='#ffd93d' font-size='13' font-weight='bold'>精度 vs 炭素排出のトレードオフ</text><line x1='100' y1='230' x2='700' y2='230' stroke='#555' stroke-width='1'/><line x1='100' y1='50' x2='100' y2='230' stroke='#555' stroke-width='1'/><text x='90' y='55' text-anchor='end' fill='#888' font-size='10'>精度</text><text x='700' y='250' text-anchor='end' fill='#888' font-size='10'>CO2排出量 (tCO2e)</text><circle cx='180' cy='170' r='15' fill='#2d6a4f' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='180' y='200' text-anchor='middle' fill='#4ecdc4' font-size='9'>蒸留モデル</text><text x='180' y='212' text-anchor='middle' fill='#888' font-size='8'>0.1t / 精度90%</text><circle cx='300' cy='120' r='20' fill='#1b4965' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='300' y='155' text-anchor='middle' fill='#a9d6e5' font-size='9'>量子化モデル</text><text x='300' y='167' text-anchor='middle' fill='#888' font-size='8'>1t / 精度94%</text><circle cx='450' cy='90' r='28' fill='#774936' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='450' y='130' text-anchor='middle' fill='#ddb892' font-size='9'>標準モデル</text><text x='450' y='142' text-anchor='middle' fill='#888' font-size='8'>50t / 精度96%</text><circle cx='620' cy='75' r='35' fill='#7f1d1d' style='filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'/><text x='620' y='125' text-anchor='middle' fill='#ff8888' font-size='9'>巨大モデル</text><text x='620' y='137' text-anchor='middle' fill='#888' font-size='8'>500t / 精度97%</text><text x='540' y='200' text-anchor='middle' fill='#ff6b6b' font-size='10'>精度+1%のために</text><text x='540' y='215' text-anchor='middle' fill='#ff6b6b' font-size='10'>CO2が10倍</text><rect x='180' y='55' width='150' height='25' rx='4' fill='#14532d'/><text x='255' y='72' text-anchor='middle' fill='#4ecdc4' font-size='10' font-weight='bold'>最適なトレードオフ</text></svg>

<!--
モデル蒸留(distillation)や量子化(quantization)で、精度の低下を最小限に抑えながらモデルサイズと消費電力を大幅に削減できる。ファインチューニング vs フルトレーニングの判断も炭素効率の観点から重要。
-->

---

<!-- _class: lead -->
# まとめ

- コードは仮想ではない
- 
- 1行のコードが電力を消費し、CO2を排出し、地球に影響を与える
- 
- **時間シフト**・**地域シフト**・**需要シェーピング**で
- ソフトウェアの炭素排出を最適化できる
- 
- 「速いコード = グリーンなコード」
- 
- 持続可能なソフトウェア設計の時代が始まっている


---

# 参考文献

- **Foundations & Standards:**
- - [Green Software Foundation](https://greensoftware.foundation/)
- - [SCI Specification (ISO Standard)](https://sci.greensoftware.foundation/)
- - [Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk)
- 
- **Research & Tools:**
- - [Google Carbon-Intelligent Computing (2020)](https://blog.google/outreach-initiatives/sustainability/carbon-intelligent-computing-platform/)
- - [Pereira et al. 'Energy Efficiency across Programming Languages' (SLE 2017)](https://sites.google.com/view/energy-efficiency-languages)
- - [ElectricityMaps](https://www.electricitymaps.com/)

