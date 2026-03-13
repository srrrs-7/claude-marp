---
marp: true
theme: gaia
size: 16:9
paginate: true
footer: "© 2026 Management Best Practices Workshop"
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
  
  section {
    font-size: 28px;
  }
  section h1 {
    font-size: 48px;
    margin-bottom: 0.5em;
  }
  section h2 {
    font-size: 40px;
    margin-bottom: 0.5em;
  }
  section ul {
    font-size: 24px;
  }
  section pre code {
    font-size: 0.6em;
    line-height: 1.4;
  }
  section.lead {
    text-align: center;
  }
  section svg {
    max-width: 100%;
    max-height: 70vh;
    display: block;
    margin: 0 auto;
  }
  
---

<!-- _class: lead -->
# 部下のマネージメント
経営層のための包括ガイド

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#f9a825" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">部下のマネージメント</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">経営層のための包括ガイド — 60分ワークショップ</text>
</svg>
- **60分ワークショップ**
- シニアマネージャー・経営層向け
- 2026年2月14日

<!--
タイトルスライド。参加者の自己紹介とアイスブレイクを5分程度実施。
-->

---

# 本日のアジェンダ (1/2)

> *本日の6テーマを60分で体系的に習得できる構成になっている*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">本日のアジェンダ（1/2）</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1. 効果的な1on1ミーティング</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">関係構築・成長支援の核心</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">2. フィードバックとコーチング</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">SBIA / GROWモデル活用法</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">3. モチベーション管理</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">自己決定理論 / バーンアウト予防</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">4. チームビルディング</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">心理的安全性 / Googleの知見</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">5. パフォーマンス評価</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">OKR / MBO / 評価バイアス</text>
</svg>
- **1. 効果的な1on1ミーティング** — 個別対話の設計
- **2. フィードバックとコーチング** — 成長を促進する対話技術
- **3. モチベーション管理** — 内発的動機づけの科学
- **4. チームビルディング** — 高パフォーマンスチームの構築

<!--
全8セクション構成。各セクション5-7分、質疑応答10分の時間配分。前半4つはマネージャーの基本スキルに焦点。
-->

---

# 本日のアジェンダ (2/2)

> *後半3テーマは現代マネジメントの必須スキルを網羅している*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">本日のアジェンダ（2/2）</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">6. 世代間ギャップ</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">X / Y / Z 世代のマネジメント</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">7. リモートマネジメント</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">非同期ファースト / ハイブリッド設計</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">8. D&I（多様性・包括性）</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">インクルーシブリーダーシップ</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">9. まとめ・アクションアイテム</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">今日から使える10のツール</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">目標: このワークショップ後に実践できること</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">最低3つのツールを持ち帰る</text>
</svg>
- **5. パフォーマンス評価** — 公平で効果的な評価システム
- **6. 世代間ギャップ** — 多世代組織のマネジメント
- **7. リモートマネジメント** — ハイブリッド時代の新常識
- **8. ダイバーシティ＆インクルージョン** — 多様性を力に変える

<!--
後半4つは組織・環境の変化に対応するスキル。すべてのセクションは相互に関連しており、統合的に実践する必要がある。
-->

---

# マネージメントの影響力

> *マネージャーの行動1つで部下の生産性は最大40%変動する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">マネージャーの影響力ピラミッド</text>
  <!-- Level 1: Individual -->
  <polygon points="400,320 170,320 285,250" fill="#16213e" stroke="#4caf50" stroke-width="2"/>
  <text x="285" y="292" fill="#4caf50" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">個人パフォーマンス</text>
  <!-- Level 2: Team -->
  <polygon points="400,245 285,245 285,175 400,175" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <!-- Full level 2 trapezoid -->
  <polygon points="285,250 515,250 460,175 340,175" fill="#16213e" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="218" fill="#f9a825" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">チームエンゲージメント</text>
  <!-- Level 3: Organization -->
  <polygon points="340,170 460,170 420,100 380,100" fill="#16213e" stroke="#e91e63" stroke-width="2"/>
  <text x="400" y="140" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">組織文化</text>
  <!-- Apex: Vision -->
  <polygon points="380,95 420,95 400,55" fill="#f9a825" stroke="#f9a825" stroke-width="2"/>
  <text x="400" y="82" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Vision</text>
  <!-- Stats on right -->
  <rect x="540" y="80" width="220" height="230" fill="#16213e" rx="8"/>
  <text x="650" y="110" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Gallup 調査結果</text>
  <text x="650" y="140" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">従業員エンゲージメント</text>
  <text x="650" y="165" fill="#f9a825" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">70%</text>
  <text x="650" y="185" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">はマネージャーに依存</text>
  <line x1="570" y1="205" x2="730" y2="205" stroke="#f9a825" stroke-width="1"/>
  <text x="650" y="230" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">優秀なマネージャーの</text>
  <text x="650" y="252" fill="#4caf50" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">+21%</text>
  <text x="650" y="272" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">生産性向上効果</text>
  <!-- Bottom label -->
  <text x="400" y="365" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">マネージャーは組織成果の最大レバー</text>
</svg>
- 優れたマネージャーがチーム生産性を**50%向上**させる（Google研究）
- 従業員エンゲージメントの**70%**はマネージャーで決まる（Gallup）
- 離職理由の**75%**は直属上司との関係（SHRM調査）

<!--
マネージメントの戦略的重要性を数字で示す。経営層の責任として、マネージャーを育成する文化の醸成、マネジメント品質の標準化、データに基づく継続的改善が求められる。
-->

---

<!-- _class: lead -->
# 効果的な1on1ミーティング

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#f9a825" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">効果的な1on1ミーティング</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">週次30-60分 — 部下のための時間</text>
</svg>
- 個別対話の設計と実践

<!--
1on1はマネジメントの最も基本的かつ強力なツール。ここから深堀りしていく。
-->

---

# 1on1の4つの目的（優先順位順）

> *1on1の4目的を正しく優先付けることで関係構築効率が倍増*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="46" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1の4つの目的 — 時間配分の目安</text>
  <text x="205" y="92" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">① 関係構築 (最優先)</text>
  <rect x="215" y="76" width="405" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="628" y="92" fill="#f9a825" font-size="12" font-family="sans-serif">信頼・ラポール形成</text>
  <text x="205" y="147" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">② キャリア開発</text>
  <rect x="215" y="131" width="338" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="561" y="147" fill="#e91e63" font-size="12" font-family="sans-serif">成長・スキル向上支援</text>
  <text x="205" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">③ 問題解決</text>
  <rect x="215" y="186" width="270" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="493" y="202" fill="#29b6f6" font-size="12" font-family="sans-serif">障害除去・サポート</text>
  <text x="205" y="257" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">④ 業務進捗 (最低優先)</text>
  <rect x="215" y="241" width="135" height="28" fill="#9e9e9e" rx="3" opacity="0.9"/>
  <text x="358" y="257" fill="#9e9e9e" font-size="12" font-family="sans-serif">Slackで十分カバー可能</text>
</svg>
- 1. **関係構築** — 信頼とラポールの形成
- 2. **キャリア開発** — 成長とスキル向上の支援
- 3. **問題解決** — 障害の除去とサポート
- 4. **業務進捗** — プロジェクト状況の確認（最優先ではない）

<!--
1on1の本質は関係構築。業務報告に終始しないよう注意。業務進捗は最も低い優先度であり、Slackやツールで十分カバーできる。1on1は部下のための時間であり、アジェンダは部下が設定する。
-->

---

# 1on1の基本ルール

> *週1回30分の1on1が部下エンゲージメントを23%向上させる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="45" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 基本ルール</text>
  <text x="210" y="72" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">すべき</text>
  <text x="570" y="72" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">避けるべき</text>
  <line x1="400" y1="55" x2="400" y2="390" stroke="#ffffff" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>
  <text x="75" y="95" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">毎週同じ時間・場所で実施</text>
  <text x="75" y="133" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">部下がアジェンダを決める</text>
  <text x="75" y="171" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">メモは部下が取る</text>
  <text x="75" y="209" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">傾聴7 : 発言3を心がける</text>
  <text x="75" y="247" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">安心できる場所を選ぶ</text>
  <text x="435" y="95" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">業務報告に終始する</text>
  <text x="435" y="133" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">キャンセルを習慣にする</text>
  <text x="435" y="171" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">携帯を見ながら話を聞く</text>
  <text x="435" y="209" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">評価の場として使う</text>
  <text x="435" y="247" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">一方的に話し続ける</text>
</svg>
- **頻度**: 週1回 or 隔週（最低月1回・固定枠で定例化）
- **主役は部下**: アジェンダは部下が設定、マネージャーは70%聞く
- **全集中**: デバイスを閉じ、メモは共有ドキュメントで記録

<!--
時間は30-60分で役職により調整。カレンダーに定例化し、キャンセルは厳禁。キャンセルは「あなたは優先度が低い」というメッセージになる。前回のアクションアイテムをフォローアップすることで継続性を担保。
-->

---

# 1on1の時間配分（60分の場合）

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 時間配分（60分モデル）</text>
  <!-- Horizontal bar representation -->
  <!-- Check-in: 10min -->
  <rect x="60" y="80" width="58" height="60" fill="#f9a825" rx="4"/>
  <text x="89" y="106" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">チェック</text>
  <text x="89" y="122" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">イン</text>
  <text x="89" y="158" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">10分</text>
  <!-- Career: 15min -->
  <rect x="122" y="80" width="87" height="60" fill="#e91e63" rx="4"/>
  <text x="165" y="106" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">キャリア</text>
  <text x="165" y="122" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">開発</text>
  <text x="165" y="158" fill="#e91e63" font-size="13" text-anchor="middle" font-family="sans-serif">15分</text>
  <!-- Issues: 20min -->
  <rect x="213" y="80" width="116" height="60" fill="#29b6f6" rx="4"/>
  <text x="271" y="106" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">課題・</text>
  <text x="271" y="122" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">ブロッカー</text>
  <text x="271" y="158" fill="#29b6f6" font-size="13" text-anchor="middle" font-family="sans-serif">20分</text>
  <!-- Progress: 10min -->
  <rect x="333" y="80" width="58" height="60" fill="#4caf50" rx="4"/>
  <text x="362" y="106" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">進捗</text>
  <text x="362" y="122" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">確認</text>
  <text x="362" y="158" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">10分</text>
  <!-- Wrap: 5min -->
  <rect x="395" y="80" width="29" height="60" fill="#ab47bc" rx="4"/>
  <text x="409" y="106" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">まと</text>
  <text x="409" y="122" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">め</text>
  <text x="409" y="158" fill="#ab47bc" font-size="12" text-anchor="middle" font-family="sans-serif">5分</text>
  <!-- Key principles box -->
  <rect x="450" y="70" width="310" height="270" fill="#16213e" rx="8"/>
  <text x="605" y="98" fill="#f9a825" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 黄金律</text>
  <text x="470" y="130" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="130" fill="#ffffff" font-size="13" font-family="sans-serif">部下がアジェンダを決める</text>
  <text x="470" y="160" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="160" fill="#ffffff" font-size="13" font-family="sans-serif">毎週同じ時間・場所</text>
  <text x="470" y="190" fill="#4caf50" font-size="22" font-family="sans-serif">✓</text>
  <text x="500" y="190" fill="#ffffff" font-size="13" font-family="sans-serif">メモは部下が取る</text>
  <text x="470" y="220" fill="#e91e63" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="220" fill="#ffffff" font-size="13" font-family="sans-serif">業務報告に終始しない</text>
  <text x="470" y="250" fill="#e91e63" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="250" fill="#ffffff" font-size="13" font-family="sans-serif">キャンセルを習慣化しない</text>
  <text x="470" y="280" fill="#e91e63" font-size="22" font-family="sans-serif">✗</text>
  <text x="500" y="280" fill="#ffffff" font-size="13" font-family="sans-serif">マネージャーが話しすぎる</text>
  <!-- Bottom summary -->
  <text x="400" y="370" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">1on1は「部下のための」時間 — 聴く:話す = 7:3</text>
</svg>
- チェックイン 5分 → 部下の議題 30分 → キャリア 15分 → 業務FB 10分

<!--
部下の議題に最も多くの時間を割く。業務報告は最後の10分のみ。キャリア・成長の話を毎回15分確保することで長期的な信頼と成長を促進。この時間配分は目安であり、部下の状況に応じて柔軟に調整する。
-->

---

# 1on1での効果的な質問

> *質問の質が1on1の成果を決める：オープン質問率70%以上を目標に*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1での効果的な質問集</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">キャリア</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「5年後どうなりたい？」「今の役割で一番やりがいを感じる瞬間は？」</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">モチベーション</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「今週何が一番楽しかった？」「何が最もフラストレーションだった？」</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">課題発見</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「私(上司)が何かすることで、あなたの仕事を楽にできる？」</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">成長</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「最近学んだことは何？」「挑戦してみたいことはある？」</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">関係構築</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「私はあなたのことをどれだけ理解できている?」</text>
</svg>
- **関係構築**: 「最近どう？」「仕事以外で楽しいことは？」
- **キャリア**: 「3年後、どんなスキルを身につけたい？」
- **問題解決**: 「今、何が一番のチャレンジ？」
- **自己改善**: 「私のマネジメントで改善してほしいことは？」

<!--
オープンクエスチョンで対話を促進。「はい/いいえ」で終わる質問ではなく、考えを引き出す質問を心がける。部下からのフィードバックを積極的に求める姿勢が心理的安全性を高める。深掘り質問「もう少し詳しく教えて」「それはなぜ重要？」も効果的。
-->

---

# 1on1：成功パターン vs 失敗パターン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="45" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">1on1 成功 vs 失敗パターン</text>
  <text x="210" y="72" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">すべき</text>
  <text x="570" y="72" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">避けるべき</text>
  <line x1="400" y1="55" x2="400" y2="390" stroke="#ffffff" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>
  <text x="75" y="95" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">「今日話したいことある?」から始める</text>
  <text x="75" y="133" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">沈黙を恐れない(考える時間)</text>
  <text x="75" y="171" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">約束したことを必ず実行する</text>
  <text x="75" y="209" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">感情(エモーション)に共感する</text>
  <text x="75" y="247" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">具体的なアクションで終わる</text>
  <text x="435" y="95" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">「進捗どう?」から始める</text>
  <text x="435" y="133" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">アドバイスをすぐに提供する</text>
  <text x="435" y="171" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">先週の宿題確認を忘れる</text>
  <text x="435" y="209" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">解決策ばかり提案する</text>
  <text x="435" y="247" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">次のアクションなしで終わる</text>
</svg>
- 失敗: 業務報告のみ・一方的に話す・頻繁にキャンセル・マルチタスク
- 成功: 部下がアジェンダ設定・70%聞く・固定枠厳守・メモを共有記録

<!--
よくある失敗を自覚させる。1on1の質が組織文化を反映することを強調。失敗パターンに心当たりがあれば、明日から改善できる。メモを取らないと前回の内容を忘れ、部下は「この人は話を聞いていない」と感じる。
-->

---

<!-- _class: lead -->
# フィードバックとコーチング

- 成長を促進する対話技術

<!--
フィードバックは評価ではなく、成長支援のツール。コーチングとティーチングの使い分けが鍵。
-->

---

# フィードバックの3原則

> *フィードバックの3原則を守れば受け手の防衛反応が激減する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#e91e63" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#e91e63" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#e91e63" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">フィードバックとコーチング</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">評価ではなく成長支援 — SBIAとGROWで変わるチーム</text>
</svg>
- **心理的安全性が前提** — 信頼関係の上に成り立つ
- **タイミング** — 行動の48時間以内に、継続的に実施
- **双方向性** — 一方的な通告ではなく対話、次のステップを一緒に決める

<!--
フィードバックの前提条件は心理的安全性。感情的にならず具体例を用意すること。年次評価だけでなく日常的にフィードバックする文化が重要。部下の視点も聞いた上で、改善策を共に考える双方向性がポイント。
-->

---

# SBIAフレームワーク

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">SBIAフレームワーク — 効果的フィードバック</text>
  <!-- S: Situation -->
  <rect x="50" y="70" width="160" height="110" fill="#16213e" stroke="#f9a825" stroke-width="3" rx="8"/>
  <text x="130" y="105" fill="#f9a825" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">S</text>
  <text x="130" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Situation</text>
  <text x="130" y="152" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">状況・場面</text>
  <text x="130" y="170" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">「先週の会議で」</text>
  <!-- Arrow -->
  <polygon points="218,125 233,118 233,132" fill="#ffffff"/>
  <line x1="212" y1="125" x2="233" y2="125" stroke="#ffffff" stroke-width="2"/>
  <!-- B: Behavior -->
  <rect x="240" y="70" width="160" height="110" fill="#16213e" stroke="#e91e63" stroke-width="3" rx="8"/>
  <text x="320" y="105" fill="#e91e63" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">B</text>
  <text x="320" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Behavior</text>
  <text x="320" y="152" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">具体的行動</text>
  <text x="320" y="170" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">「〜という発言が」</text>
  <!-- Arrow -->
  <polygon points="408,125 423,118 423,132" fill="#ffffff"/>
  <line x1="402" y1="125" x2="423" y2="125" stroke="#ffffff" stroke-width="2"/>
  <!-- I: Impact -->
  <rect x="430" y="70" width="160" height="110" fill="#16213e" stroke="#29b6f6" stroke-width="3" rx="8"/>
  <text x="510" y="105" fill="#29b6f6" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">I</text>
  <text x="510" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Impact</text>
  <text x="510" y="152" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">影響・結果</text>
  <text x="510" y="170" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">「チームに〜影響」</text>
  <!-- Arrow -->
  <polygon points="598,125 613,118 613,132" fill="#ffffff"/>
  <line x1="592" y1="125" x2="613" y2="125" stroke="#ffffff" stroke-width="2"/>
  <!-- A: Action -->
  <rect x="620" y="70" width="160" height="110" fill="#16213e" stroke="#4caf50" stroke-width="3" rx="8"/>
  <text x="700" y="105" fill="#4caf50" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">A</text>
  <text x="700" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Action</text>
  <text x="700" y="152" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">期待する行動</text>
  <text x="700" y="170" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">「今後は〜してほしい」</text>
  <!-- Example -->
  <rect x="50" y="210" width="700" height="90" fill="#16213e" rx="8"/>
  <text x="400" y="238" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">実例</text>
  <text x="400" y="262" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">「先週の全体会議で（S）、仕様未確認のまま断言した発言が（B）、</text>
  <text x="400" y="284" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">クライアントの混乱を招きました（I）。事前確認を徹底してください（A）。」</text>
  <!-- Key point -->
  <text x="400" y="355" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">評価ではなく行動に焦点を当てる — 人格批判は厳禁</text>
</svg>
- **S**ituation → **B**ehavior → **I**mpact → **A**ction
- 具体的行動に焦点を当て、曖昧さを排除する構造的フィードバック

<!--
S: 「昨日のプレゼンで」（いつ・どこで）→ B: 「データの根拠を示さずに結論を述べていた」（観察した行動）→ I: 「聴衆が納得していないように見えた」（影響）→ A: 「次回は主要データを2-3つ示してから結論を述べよう」（具体的改善）。悪い例: 「プレゼンが下手だ」（抽象的・評価的）。SBIAは構造的で再現性が高い。
-->

---

# フィードバックの黄金比率

> *ポジティブ:ネガティブ=5:1の黄金比率が最も成長を促進する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="46" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">フィードバックの黄金比率 (Losada Line)</text>
  <text x="205" y="92" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ポジティブ (認める)</text>
  <rect x="215" y="76" width="338" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="561" y="92" fill="#4caf50" font-size="12" font-family="sans-serif">75% — 強みを見る</text>
  <text x="205" y="147" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">改善提案 (指摘する)</text>
  <rect x="215" y="131" width="113" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="336" y="147" fill="#e91e63" font-size="12" font-family="sans-serif">25% — 行動に焦点</text>
  <text x="205" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">最低 3:1 を維持</text>
  <rect x="215" y="186" width="270" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="493" y="202" fill="#f9a825" font-size="12" font-family="sans-serif">否定1に対し肯定3以上</text>
  <text x="205" y="257" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">理想比率 5:1</text>
  <rect x="215" y="241" width="374" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="597" y="257" fill="#f9a825" font-size="12" font-family="sans-serif">高パフォーマンスチーム</text>
</svg>
- 理想比率: **ポジティブ 4 : 改善 1**（4:1の法則）
- ポジティブも具体的に — SBIフレームワークを使用
- サンドイッチ手法は避ける — 改善FBは単独で明確に伝える

<!--
高パフォーマーには5:1、課題のある人には3:1に調整。ポジティブフィードバックの価値は「何を続けるべきか」を明確にすること。強みを認識しさらに伸ばす効果がある。サンドイッチ手法（良い→悪い→良い）は「良いフィードバックの裏に批判がある」と学習させてしまい逆効果。
-->

---

# 難しい会話の7ステップ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">難しい会話の7ステップ</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">1. 準備</text>
  <text x="735" y="101" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">事実確認 / 感情整理 / 目標設定</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">2. 場の設定</text>
  <text x="735" y="153" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">1on1・プライベートな場所で</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">3. 事実の提示</text>
  <text x="735" y="205" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">SBIA(状況・行動・影響・期待)で具体的に</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">4. 相手の話を聞く</text>
  <text x="735" y="257" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">反論を遮らず共感を示す</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">5. 共同解決策</text>
  <text x="735" y="309" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「一緒に考えよう」の姿勢</text>
</svg>
- パフォーマンス問題には構造的アプローチで冷静に対処する
- 準備 → 事実提示 → 影響説明 → 理解確認 → 改善計画 → サポート → フォローアップ

<!--
1. 準備: 具体的な事例とデータを収集。2. 事実の提示: 感情ではなく観察した行動を伝える。3. 影響の説明: チーム・顧客・ビジネスへの影響を具体的に。4. 理解の確認: 相手の視点と事情を聞く。5. 改善計画: 具体的なアクションと期限を合意。6. サポート提供: リソース・トレーニングを提示。7. フォローアップ: 週次でチェックイン。「あなたはいつも〜」「あなたのせいで〜」は避ける。HR部門との連携も重要。
-->

---

# コーチング vs ティーチング

> *コーチングとティーチングの使い分けが部下成長速度を左右する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="40" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">コーチング vs ティーチング — 使い分けガイド</text>
  <!-- Coaching column -->
  <rect x="40" y="60" width="330" height="290" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="8"/>
  <text x="205" y="92" fill="#f9a825" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">コーチング</text>
  <text x="60" y="125" fill="#ffffff" font-size="13" font-family="sans-serif">「どう思う?」「何が必要?」</text>
  <text x="60" y="152" fill="#ffffff" font-size="13" font-family="sans-serif">相手が答えを持っている場合</text>
  <text x="60" y="179" fill="#ffffff" font-size="13" font-family="sans-serif">長期的な成長を目指す時</text>
  <text x="60" y="206" fill="#ffffff" font-size="13" font-family="sans-serif">自律性・主体性を育てる</text>
  <rect x="70" y="240" width="280" height="35" fill="#f9a825" rx="4"/>
  <text x="210" y="262" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">70%の1on1で使うべき</text>
  <!-- Teaching column -->
  <rect x="430" y="60" width="330" height="290" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="8"/>
  <text x="595" y="92" fill="#e91e63" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">ティーチング</text>
  <text x="450" y="125" fill="#ffffff" font-size="13" font-family="sans-serif">「〜するといい」「こうやる」</text>
  <text x="450" y="152" fill="#ffffff" font-size="13" font-family="sans-serif">新しいスキル・知識が必要</text>
  <text x="450" y="179" fill="#ffffff" font-size="13" font-family="sans-serif">緊急時・短期解決が必要</text>
  <text x="450" y="206" fill="#ffffff" font-size="13" font-family="sans-serif">安全・コンプライアンス</text>
  <rect x="460" y="240" width="280" height="35" fill="#e91e63" rx="4"/>
  <text x="600" y="262" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">30%で状況に応じて使う</text>
</svg>
- **ティーチング**: 答えを教える — 知識不足時・緊急時・新人育成
- **コーチング**: 質問で引き出す — 課題解決・意思決定・キャリア開発
- 状況に応じた使い分けが重要（基礎知識なし→教える、応用力→引き出す）

<!--
ティーチングは即効性があるが依存性のリスクがある。コーチングは自律性を向上させ長期的成長につながる。マネージャーは両方のスキルが必要。シニア層には特にコーチングが重要。「教えたくなる衝動」を抑え、まず質問から入る習慣を身につける。
-->

---

# GROWモデル

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">GROWモデル — コーチング会話フレームワーク</text>
  <!-- Circular flow - approximate with boxes and arrows -->
  <!-- G: Goal -->
  <rect x="300" y="55" width="200" height="70" fill="#16213e" stroke="#f9a825" stroke-width="3" rx="8"/>
  <text x="400" y="85" fill="#f9a825" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">G: Goal</text>
  <text x="400" y="108" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">「何を達成したい？」</text>
  <!-- R: Reality -->
  <rect x="560" y="165" width="200" height="70" fill="#16213e" stroke="#e91e63" stroke-width="3" rx="8"/>
  <text x="660" y="195" fill="#e91e63" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">R: Reality</text>
  <text x="660" y="218" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">「現状はどうか？」</text>
  <!-- O: Options -->
  <rect x="300" y="280" width="200" height="70" fill="#16213e" stroke="#29b6f6" stroke-width="3" rx="8"/>
  <text x="400" y="310" fill="#29b6f6" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">O: Options</text>
  <text x="400" y="333" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">「どんな手段がある？」</text>
  <!-- W: Way forward -->
  <rect x="40" y="165" width="200" height="70" fill="#16213e" stroke="#4caf50" stroke-width="3" rx="8"/>
  <text x="140" y="195" fill="#4caf50" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">W: Will</text>
  <text x="140" y="218" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">「何をいつやる？」</text>
  <!-- Arrows G -> R -->
  <polygon points="520,118 536,111 536,125" fill="#f9a825"/>
  <path d="M 500 125 Q 530 145 540 165" fill="none" stroke="#f9a825" stroke-width="2"/>
  <!-- Arrows R -> O -->
  <polygon points="634,296 626,281 640,281" fill="#e91e63"/>
  <path d="M 660 235 Q 640 265 620 280" fill="none" stroke="#e91e63" stroke-width="2"/>
  <!-- Arrows O -> W -->
  <polygon points="282,323 266,316 266,330" fill="#29b6f6"/>
  <path d="M 300 315 Q 270 315 264 300" fill="none" stroke="#29b6f6" stroke-width="2"/>
  <!-- Arrows W -> G -->
  <polygon points="178,148 170,133 184,133" fill="#4caf50"/>
  <path d="M 140 165 Q 160 145 200 130" fill="none" stroke="#4caf50" stroke-width="2"/>
  <!-- Center: Coach role -->
  <text x="400" y="195" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">コーチは</text>
  <text x="400" y="215" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">「問いを立てる」</text>
</svg>
- コーチングの基本サイクル: Goal → Reality → Options → Will
- 質問中心で進め、答えは部下自身が見つける

<!--
G (Goal): 「この会話で何を達成したい？」→ R (Reality): 「今どんな状況？何が起きている？」→ O (Options): 「どんなアプローチが考えられる？他にどんな方法がある？」3-5個ブレスト → W (Will): 「具体的に何をする？いつまでに？」コミットメントと次のステップを決める。GROWは最もシンプルで実践的なコーチングモデル。
-->

---

# 強力な質問の技術

> *強力な質問は答えではなく洞察を引き出し、自律性を育てる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">強力な質問の技術 — オープンクエスチョン</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">未来志向</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「それが実現したらどんな状態になる?」</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">価値観</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「あなたにとって仕事で一番大切なことは?」</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">内省</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「なぜそう感じる?」「背景に何がある?」</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">行動</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「明日から何か1つやるとしたら?」</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">スケーリング</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「10点満点で今何点?」「1点上げるには?」</text>
</svg>
- ✅ **オープン**: 「どんな進捗？どう感じてる？」
- ✅ **深掘り**: 「もう少し詳しく」「それはなぜ重要？」
- ✅ **未来志向**: 「理想の状態はどんな感じ？」
- ❌ **避ける**: 誘導尋問「〜だよね？」、一度に複数質問

<!--
質問の質がコーチングの質を決める。沈黙を恐れない—考える時間を与えることも重要。クローズド質問「うまくいってる？」(Yes/No)よりオープンクエスチョンが対話を広げる。「もし制約がなかったら何をする？」という未来志向の質問も効果的。
-->

---

<!-- _class: lead -->
# モチベーション管理

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#e91e63" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#e91e63" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#e91e63" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">モチベーション管理</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">内発的動機づけを高める環境設計</text>
</svg>
- 内発的動機づけの科学

<!--
理論を知ることで、表面的な対処療法を避ける。自己決定理論が現代では最も有効。
-->

---

# モチベーション理論の全体像

> *SDT・Herzberg・Maslowの3理論を統合してモチベーション設計する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">モチベーション理論の全体像</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">マズロー欲求5段階</text>
  <text x="735" y="101" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">生理→安全→社会→承認→自己実現</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">ハーズバーグ2要因</text>
  <text x="735" y="153" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">衛生要因(不満除去) + 動機づけ要因(満足増加)</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">自己決定理論(Deci & Ryan)</text>
  <text x="735" y="205" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">自律性+有能感+関係性 = 内発的動機の3要素</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">フロー理論(Csikszentmihalyi)</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">スキル×難易度バランスで没入状態を作る</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">SCARF モデル(Rock)</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">地位・確実性・自律性・関係性・公平性</text>
</svg>
- マズローの欲求階層: 下位の欲求が満たされないと上位に進めない
- ハーズバーグ: 衛生要因（不満防止）と動機づけ要因（満足創出）は別物
- **給与を上げても長期的モチベーションは上がらない**

<!--
マズロー: 生理→安全→社会的→承認→自己実現の5段階。ハーズバーグ: 衛生要因（給与、労働環境、人間関係）は不満を防ぐが満足を生まない。動機づけ要因（達成感、承認、成長、責任）が真のモチベーション源。両理論を統合して理解することが重要。
-->

---

# 自己決定理論（最も重要）

> *自律性・有能感・関係性の3欲求充足が内発的動機の源泉*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">自己決定理論 — 内発的動機の3要素</text>
  <!-- Three circles -->
  <!-- Autonomy -->
  <circle cx="200" cy="200" r="110" fill="#f9a825" opacity="0.85"/>
  <text x="200" y="185" fill="#1a1a2e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">自律性</text>
  <text x="200" y="208" fill="#1a1a2e" font-size="13" text-anchor="middle" font-family="sans-serif">Autonomy</text>
  <text x="200" y="230" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">自分で決められる</text>
  <!-- Competence -->
  <circle cx="420" cy="160" r="110" fill="#e91e63" opacity="0.85"/>
  <text x="420" y="145" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">有能感</text>
  <text x="420" y="168" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">Competence</text>
  <text x="420" y="190" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">できる・成長している</text>
  <!-- Relatedness -->
  <circle cx="600" cy="220" r="110" fill="#29b6f6" opacity="0.85"/>
  <text x="600" y="205" fill="#1a1a2e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">関係性</text>
  <text x="600" y="228" fill="#1a1a2e" font-size="13" text-anchor="middle" font-family="sans-serif">Relatedness</text>
  <text x="600" y="250" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">つながっている</text>
  <!-- Inner motivation label -->
  <text x="400" y="370" fill="#f9a825" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">3つが揃うと内発的動機が持続 → エンゲージメント最大化</text>
</svg>
- **自律性** — 自分で決められる（Howを任せる）
- **有能感** — できる・成長している（適切な難易度の課題）
- **関係性** — 仲間とつながっている（チームの一体感）

<!--
3つの心理的欲求が満たされると内発的動機づけが高まる。自律性: マイクロマネジメントを避け、意思決定への参加機会を設ける。有能感: 小さな成功体験の積み重ねとスキル向上の可視化。関係性: 心理的安全性と貢献の承認。内発的動機づけは持続可能で、外発的報酬だけでは長続きしない。
-->

---

# 認識と報酬の設計

> *金銭報酬よりも承認と成長機会がエンゲージメントに効く*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">認識と報酬の設計 — 何が効くか</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">即時承認</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">行動直後(24時間以内) — 強化効果が最大</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">公開表彰 vs 個別感謝</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">人によって異なる — 事前に好みを確認</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">意味の言語化</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「なぜこの仕事が重要か」を伝える</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">成長の可視化</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">3ヶ月前と今を比較して見せる</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">非金銭的報酬</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">裁量権・学習機会・選択肢 > ボーナス（長期）</text>
</svg>
- **金銭的報酬** — 市場競争力のある給与は最低限の衛生要因
- **非金銭的報酬** — 公的承認・成長機会・柔軟性（より強力）
- **即時性** — 良い行動の直後に承認、年次評価まで待たない

<!--
非金銭的報酬の具体例: 全体会議での表彰、社内ニュース掲載、カンファレンス参加、新プロジェクトへのアサイン、リモートワーク・フレックス、昇進・スキルアップ機会。承認は無料で最も効果的なツール。小さな貢献も見逃さない姿勢が重要。
-->

---

# バーンアウトの予防

> *バーンアウトの初期サインを見逃さない：週次1on1での観察が鍵*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="45" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">バーンアウト予防 早期サイン vs 対策</text>
  <text x="210" y="72" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">すべき</text>
  <text x="570" y="72" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">避けるべき</text>
  <line x1="400" y1="55" x2="400" y2="390" stroke="#ffffff" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>
  <text x="75" y="95" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">エネルギーチェックを週次実施</text>
  <text x="75" y="133" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">仕事量を定期的に見直す</text>
  <text x="75" y="171" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">強みに合った業務配分</text>
  <text x="75" y="209" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">「休むこと」を公式に認める</text>
  <text x="75" y="247" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">サバティカル / オフラインデーを導入</text>
  <text x="435" y="95" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">「頑張れ」だけ言って様子見</text>
  <text x="435" y="133" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">残業を美徳として扱う</text>
  <text x="435" y="171" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">ピープルプレジャーを放置</text>
  <text x="435" y="209" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">サインを見て見ぬふりをする</text>
  <text x="435" y="247" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">1on1でバーンアウトを避けて話す</text>
</svg>
- **兆候**: 生産性低下・シニシズム・欠勤増加・感情の平坦化
- **予防**: ワークロード管理・休暇強制取得・役割の明確化
- **マネージャー自身のケアも重要** — ロールモデルとして休む・境界を守る

<!--
バーンアウトは個人の問題ではなく組織の問題。早期発見と構造的対処が必要。「休むな」文化の撲滅、曖昧さがストレス源になるため役割の明確化、コントロール感（自律性の付与）、メンタルヘルスリソースの整備が重要な予防策。マネージャー自身がバーンアウトしていては部下を守れない。
-->

---

<!-- _class: lead -->
# チームビルディング

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#4caf50" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#4caf50" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#4caf50" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">チームビルディング</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">Google Project Aristotle が明かした チーム成功の真実</text>
</svg>
- 高パフォーマンスチームの構築

<!--
チーム力は個人スキルの合計ではない。「どう働くか」が「誰がいるか」より重要。
-->

---

# Googleプロジェクトアリストテレス

> *心理的安全性がプロジェクトアリストテレスで最重要要因と判明*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">心理的安全性の4段階モデル</text>
  <!-- Stage 1 -->
  <rect x="40" y="70" width="170" height="240" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="8"/>
  <text x="125" y="105" fill="#29b6f6" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 1</text>
  <text x="125" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">参加の安全</text>
  <text x="125" y="160" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">「いてもいい」</text>
  <text x="125" y="185" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">メンバーとして</text>
  <text x="125" y="203" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">認められる感覚</text>
  <text x="125" y="280" fill="#29b6f6" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">基盤</text>
  <!-- Stage 2 -->
  <rect x="220" y="70" width="170" height="240" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="8"/>
  <text x="305" y="105" fill="#f9a825" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 2</text>
  <text x="305" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">学習の安全</text>
  <text x="305" y="160" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">「失敗できる」</text>
  <text x="305" y="185" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">質問・実験・</text>
  <text x="305" y="203" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">失敗から学べる</text>
  <text x="305" y="280" fill="#f9a825" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">成長</text>
  <!-- Stage 3 -->
  <rect x="400" y="70" width="170" height="240" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="8"/>
  <text x="485" y="105" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 3</text>
  <text x="485" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">貢献の安全</text>
  <text x="485" y="160" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">「発言できる」</text>
  <text x="485" y="185" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">アイデア・意見を</text>
  <text x="485" y="203" fill="#ffffff" font-size="11" text-anchor="middle" font-family="sans-serif">積極的に出せる</text>
  <text x="485" y="280" fill="#e91e63" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">参加</text>
  <!-- Stage 4 -->
  <rect x="580" y="70" width="180" height="240" fill="#f9a825" rx="8"/>
  <text x="670" y="105" fill="#1a1a2e" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stage 4</text>
  <text x="670" y="130" fill="#1a1a2e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">挑戦の安全</text>
  <text x="670" y="160" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">「現状に挑める」</text>
  <text x="670" y="185" fill="#1a1a2e" font-size="11" text-anchor="middle" font-family="sans-serif">革新的提案・</text>
  <text x="670" y="203" fill="#1a1a2e" font-size="11" text-anchor="middle" font-family="sans-serif">現状打破が歓迎</text>
  <text x="670" y="280" fill="#1a1a2e" font-size="22" font-weight="bold" text-anchor="middle" font-family="sans-serif">革新</text>
  <!-- Bottom: Google finding -->
  <text x="400" y="360" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">Google Project Aristotle: 心理的安全性がチーム成功要因 No.1</text>
</svg>
- 5年間・180チーム調査の結果
- **心理的安全性が圧倒的1位** — 対人リスクを取っても大丈夫な環境
- 誰がチームにいるかより、**どう働くか**が成果を決める

<!--
重要度順: 1. 心理的安全性、2. 相互信頼（チームメイトは約束を守る）、3. 構造と明確性（役割・目標が明確）、4. 仕事の意味（個人的に意義がある）、5. インパクト（仕事が重要だと信じている）。心理的安全性がないと他の要素も機能しない。スター選手を集めても、心理的安全性がなければ機能不全に陥る。
-->

---

# 心理的安全性の構築

> *失敗を罰せず学習機会にするマネージャーの行動が安全性を作る*

- **失敗を学習機会に**: 「何を学んだか」を問い、自分の失敗を率先して共有
- **質問を歓迎**: 「愚かな質問はない」を実践し、質問した人を褒める
- **異なる意見を求める**: 反対意見を歓迎し、感謝する
- **弱さを見せる**: 「分からない」「助けが必要」と言えるリーダー

<!--
心理的安全性は宣言ではなく日々の行動で作る。リーダーが模範を示す。「なぜ失敗したか」ではなく「何を学んだか」とフレーミングを変えることで、チームメンバーが安心して挑戦できる。完璧主義を捨てることがリーダーに求められる。
-->

---

# チーム規範の確立

> *チーム規範を明文化して共有することでアライメントが確保できる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">チーム規範の確立 — 5つの必須要素</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">会議の規範</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">必ず議題・終了時間を事前共有 | アクション記録必須</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">コミュニケーション規範</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">24時間以内返信 | 批判より提案 | 透明性優先</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">意思決定の規範</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">誰が何をいつ決めるか明示 | 異論は会議中に</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">フィードバックの規範</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">週次ポジティブ共有 | 定期振り返り</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">失敗の扱い方規範</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">失敗の報告を歓迎 | 責任ではなく学習にフォーカス</text>
</svg>
- **コミュニケーション**: 応答時間の期待値、非同期優先、会議ルール
- **コラボレーション**: レビュー24h以内、ドキュメント文化、透明性
- **ワークライフ**: 営業時間外は緊急時のみ、休暇中は完全オフライン
- **作り方**: チーム全員で話し合って決める（押し付けない、四半期で見直し）

<!--
明文化された規範が曖昧さを排除。口頭伝達だけに頼らないドキュメント文化が特にリモート環境で重要。規範はトップダウンで押し付けるのではなく、チーム全員で合意形成するプロセスが大切。定期的に見直して陳腐化を防ぐ。
-->

---

# 対立の建設的管理

> *対立を避けずに建設的に扱うことで意思決定品質が向上する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">対立の建設的管理 — トーマスキルマンモデル</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">協力 (理想)</text>
  <text x="735" y="101" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">WIN-WIN — 最も高い成果 | 時間はかかる</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">妥協 (現実的)</text>
  <text x="735" y="153" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">共に少し譲歩 — 中程度の成果 | 迅速</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#9e9e9e" font-size="13" font-weight="bold" font-family="sans-serif">回避 (状況依存)</text>
  <text x="735" y="205" fill="#9e9e9e" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">重要でない問題 / 感情的な時に使う</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">競争 (緊急時のみ)</text>
  <text x="735" y="257" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">緊急・重要決定 / 安全問題のみ使用</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">適応 (関係優先時)</text>
  <text x="735" y="309" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">長期的関係維持のために一時妥協</text>
</svg>
- **タスク対立**（アイデアの対立）→ 創造性向上に活用
- **関係対立**（個人的反感）→ 有害、即対処が必要
- 解決: 個別ヒアリング → 共通目標確認 → 対話の場 → 合意文書化

<!--
対立は悪ではない。タスク対立は建設的に管理すれば創造性を向上させる。「アイデアを批判する、人を批判しない」「なぜを5回聞く」「データと事実に基づく議論」。対立解決: 1. 両者の話を個別に聞く、2. 共通の目標を確認、3. 対面での対話の場を設定、4. 解決策を一緒に考える、5. 合意事項を文書化、6. フォローアップ。早期発見がエスカレート防止の鍵。
-->

---

<!-- _class: lead -->
# パフォーマンス評価

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">パフォーマンス × ポテンシャル マトリクス</text>
  <!-- Axes -->
  <line x1="100" y1="60" x2="100" y2="340" stroke="#ffffff" stroke-width="2"/>
  <line x1="100" y1="340" x2="740" y2="340" stroke="#ffffff" stroke-width="2"/>
  <!-- Quadrant borders -->
  <line x1="420" y1="60" x2="420" y2="340" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="100" y1="200" x2="740" y2="200" stroke="#ffffff" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Quadrant 1: High perf, high pot - Stars -->
  <rect x="425" y="65" width="310" height="130" fill="#4caf50" opacity="0.2" rx="4"/>
  <text x="580" y="105" fill="#4caf50" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">スター</text>
  <text x="580" y="128" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">高パフォーマンス</text>
  <text x="580" y="148" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">高ポテンシャル</text>
  <text x="580" y="172" fill="#4caf50" font-size="12" text-anchor="middle" font-family="sans-serif">→ 挑戦的な機会を提供</text>
  <!-- Quadrant 2: High perf, low pot - Solid contributors -->
  <rect x="105" y="65" width="310" height="130" fill="#f9a825" opacity="0.2" rx="4"/>
  <text x="260" y="105" fill="#f9a825" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">堅実な貢献者</text>
  <text x="260" y="128" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">高パフォーマンス</text>
  <text x="260" y="148" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">低ポテンシャル</text>
  <text x="260" y="172" fill="#f9a825" font-size="12" text-anchor="middle" font-family="sans-serif">→ 専門性を深化・表彰</text>
  <!-- Quadrant 3: Low perf, high pot - Emerging -->
  <rect x="425" y="205" width="310" height="130" fill="#e91e63" opacity="0.2" rx="4"/>
  <text x="580" y="248" fill="#e91e63" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">ダイヤモンドの原石</text>
  <text x="580" y="271" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">低パフォーマンス</text>
  <text x="580" y="291" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">高ポテンシャル</text>
  <text x="580" y="315" fill="#e91e63" font-size="12" text-anchor="middle" font-family="sans-serif">→ コーチング集中投資</text>
  <!-- Quadrant 4: Low perf, low pot - Under performers -->
  <rect x="105" y="205" width="310" height="130" fill="#9e9e9e" opacity="0.2" rx="4"/>
  <text x="260" y="248" fill="#9e9e9e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">要改善</text>
  <text x="260" y="271" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">低パフォーマンス</text>
  <text x="260" y="291" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">低ポテンシャル</text>
  <text x="260" y="315" fill="#9e9e9e" font-size="12" text-anchor="middle" font-family="sans-serif">→ PIP / 役割変更検討</text>
  <!-- Axis labels -->
  <text x="420" y="368" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">パフォーマンス →</text>
  <text x="50" y="200" fill="#ffffff" font-size="14" text-anchor="middle" transform="rotate(-90,50,200)" font-family="sans-serif">ポテンシャル →</text>
</svg>
- 公平で効果的な評価システム

<!--
評価の本質的な矛盾を理解し、育成重視の文化を醸成する。
-->

---

# 評価の二つの目的

> *評価はフィードバックと意思決定の2目的を明確に分けて行う*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#f9a825" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">パフォーマンス評価</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">成長を促す評価 vs 評価のための評価</text>
</svg>
- **育成（Development）**: 強みと改善点の特定、キャリア開発支援
- **選別（Selection）**: 報酬決定、昇進判断（防衛的になりやすい）
- **ベストプラクティス**: 育成と選別を時期・会議で分離、継続的FBで年次評価に頼らない

<!--
評価の矛盾を認識することが第一歩。育成のためにはオープンで率直な対話が必要だが、報酬決定に影響するとわかると部下は防衛的になる。育成会議と評価会議を完全に分け、360度評価で多面的視点を取り入れることが有効。
-->

---

# OKR vs MBO

> *OKRは野心的な目標設定に強く、MBOは達成管理に適している*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">OKR vs MBO — 比較フレームワーク</text>
  <!-- Header -->
  <rect x="60" y="55" width="320" height="45" fill="#f9a825" rx="6"/>
  <text x="220" y="85" fill="#1a1a2e" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">OKR</text>
  <rect x="420" y="55" width="320" height="45" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="580" y="85" fill="#e91e63" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">MBO</text>
  <!-- Rows -->
  <!-- Set by -->
  <text x="60" y="125" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">目標設定</text>
  <rect x="160" y="108" width="220" height="30" fill="#16213e" rx="3"/>
  <text x="270" y="128" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">ボトムアップ + 透明性</text>
  <rect x="420" y="108" width="320" height="30" fill="#16213e" rx="3"/>
  <text x="580" y="128" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">トップダウン・組織内非公開</text>
  <!-- Cycle -->
  <text x="60" y="165" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">サイクル</text>
  <rect x="160" y="148" width="220" height="30" fill="#16213e" rx="3"/>
  <text x="270" y="168" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">四半期 (3ヶ月)</text>
  <rect x="420" y="148" width="320" height="30" fill="#16213e" rx="3"/>
  <text x="580" y="168" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">年次 (12ヶ月)</text>
  <!-- Target -->
  <text x="60" y="205" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">達成目標</text>
  <rect x="160" y="188" width="220" height="30" fill="#16213e" rx="3"/>
  <text x="270" y="208" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">野心的 (60-70%達成が理想)</text>
  <rect x="420" y="188" width="320" height="30" fill="#16213e" rx="3"/>
  <text x="580" y="208" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">100%達成が前提</text>
  <!-- Link to compensation -->
  <text x="60" y="245" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">報酬連動</text>
  <rect x="160" y="228" width="220" height="30" fill="#16213e" rx="3"/>
  <text x="270" y="248" fill="#f9a825" font-size="13" text-anchor="middle" font-family="sans-serif">原則リンクしない</text>
  <rect x="420" y="228" width="320" height="30" fill="#16213e" rx="3"/>
  <text x="580" y="248" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">直接リンク (ボーナス連動)</text>
  <!-- Focus -->
  <text x="60" y="285" fill="#ffffff" font-size="13" font-weight="bold" font-family="sans-serif">重視</text>
  <rect x="160" y="268" width="220" height="30" fill="#16213e" rx="3"/>
  <text x="270" y="288" fill="#4caf50" font-size="13" text-anchor="middle" font-family="sans-serif">学習・挑戦</text>
  <rect x="420" y="268" width="320" height="30" fill="#16213e" rx="3"/>
  <text x="580" y="288" fill="#ffffff" font-size="13" text-anchor="middle" font-family="sans-serif">アカウンタビリティ</text>
  <!-- Recommendation -->
  <rect x="60" y="325" width="680" height="45" fill="#f9a825" rx="6"/>
  <text x="400" y="352" fill="#1a1a2e" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">推奨: OKRをエンゲージメント/成長に、MBOを最低基準管理に使い分ける</text>
</svg>
- **OKR**: 野心的目標（60-70%で成功）、四半期見直し、報酬と切り離す
- **MBO**: 達成可能な目標（100%期待）、年次評価、報酬連動
- **ハイブリッド**: 業務目標はMBO、挑戦目標はOKR

<!--
OKRはイノベーション・スタートアップ・成長企業に適し、MBOは安定業務・大企業・規制産業に適する。OKR例: O「市場リーダーになる」→ KR「シェア30%達成」。MBO例: 「売上前年比110%」。どちらが優れているかではなく、組織文化とビジネスモデルに合わせて選択。報酬はMBOのみに連動させ、OKRは挑戦のための指標とする。
-->

---

# 評価バイアスの認識

> *8つの評価バイアスを認識するだけで公平性が大幅に向上する*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">キャリア開発計画の作り方</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Step 1: 現状把握</text>
  <text x="735" y="101" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">強み分析 (StrengthsFinder等) + 目標ギャップ特定</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Step 2: ゴール設定</text>
  <text x="735" y="153" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">3年・1年・3ヶ月の具体的目標を部下と共に設定</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">Step 3: 行動計画</text>
  <text x="735" y="205" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">経験70% + 研修20% + コーチ10% の70-20-10原則</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">Step 4: 進捗確認</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">月次1on1でマイルストーン確認・調整</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">Step 5: 支援提供</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">機会 / 資源 / フィードバックを積極的に提供</text>
</svg>
- **ハロー効果**: 一つの優れた特性が全体評価を引き上げる
- **近接性効果**: 最近の出来事に引きずられ前半を忘れる
- **類似性バイアス**: 自分と似た人を高評価してしまう
- **対策**: 構造化された評価基準・複数評価者・キャリブレーション会議

<!--
バイアスは誰にでもある。認識することで軽減可能。中心化傾向（全員を「普通」と評価）も要注意。対策: 継続的メモ・四半期レビューで近接性効果を防ぐ。構造化された評価基準でハロー効果を抑制。多様な評価者パネルで類似性バイアスを排除。
-->

---

# キャリア開発計画

> *IDP作成で年間目標を30日・90日・1年の具体的行動に落とす*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="46" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">評価バイアス 認知度チェック（自己評価用）</text>
  <text x="205" y="92" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ハロー効果</text>
  <rect x="215" y="76" width="383" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="606" y="92" fill="#e91e63" font-size="12" font-family="sans-serif">一側面が全体評価に影響</text>
  <text x="205" y="147" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">近接誤差</text>
  <rect x="215" y="131" width="351" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="574" y="147" fill="#e91e63" font-size="12" font-family="sans-serif">直近イベントに引きずられる</text>
  <text x="205" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">中心化傾向</text>
  <rect x="215" y="186" width="324" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="547" y="202" fill="#f9a825" font-size="12" font-family="sans-serif">差をつけることを避ける</text>
  <text x="205" y="257" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">類似性バイアス</text>
  <rect x="215" y="241" width="293" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="516" y="257" fill="#f9a825" font-size="12" font-family="sans-serif">自分と似た人を高評価</text>
  <text x="205" y="312" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">対比誤差</text>
  <rect x="215" y="296" width="261" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="484" y="312" fill="#29b6f6" font-size="12" font-family="sans-serif">前後の被評価者と比較</text>
</svg>
- 現状分析 → 目標設定 → ギャップ分析 → アクションプラン → 定期レビュー
- **70-20-10ルール**: 経験70% + 他者から20% + 研修10%
- キャリア開発は個人任せにせず、マネージャーと組織が積極的に支援

<!--
1. 現状分析: 現在のスキル・強み・興味、キャリアアンカー。2. 目標設定: 短期（1年）、中期（3年）、長期（5年）。マネジメントトラック vs スペシャリストトラック。3. ギャップ分析: 必要なスキル・経験との差。4. アクションプラン: トレーニング、プロジェクト、メンタリング、ストレッチアサインメント。5. 定期レビュー: 四半期ごとに進捗確認と調整。
-->

---

<!-- _class: lead -->
# 世代間ギャップ

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#29b6f6" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#29b6f6" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#29b6f6" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">世代間ギャップ</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">X / Y / Z 世代の価値観を理解してマネジメント</text>
</svg>
- 多世代組織のマネジメント

<!--
ステレオタイプに注意。個人差が大きい。あくまでトレンドとして理解し、個別対応が基本。
-->

---

# 世代別の価値観と特徴

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="38" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">世代別 価値観と特徴</text>
  <!-- Gen X -->
  <rect x="30" y="55" width="220" height="290" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="140" y="83" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">X世代 (1965-1980)</text>
  <text x="45" y="115" fill="#ffffff" font-size="12" font-family="sans-serif">独立心が強い</text>
  <text x="45" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">安定志向・成果主義</text>
  <text x="45" y="165" fill="#ffffff" font-size="12" font-family="sans-serif">メール / 電話 / 対面</text>
  <text x="45" y="190" fill="#ffffff" font-size="12" font-family="sans-serif">仕事とプライベート明確</text>
  <rect x="50" y="310" width="160" height="25" fill="#29b6f6" rx="3"/>
  <text x="130" y="327" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">自律性を与える</text>
  <!-- Gen Y/Millennial -->
  <rect x="290" y="55" width="220" height="290" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="400" y="83" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Y世代 (1981-1996)</text>
  <text x="305" y="115" fill="#ffffff" font-size="12" font-family="sans-serif">意味・目的を求める</text>
  <text x="305" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">フィードバック大好き</text>
  <text x="305" y="165" fill="#ffffff" font-size="12" font-family="sans-serif">Slack / チャット優先</text>
  <text x="305" y="190" fill="#ffffff" font-size="12" font-family="sans-serif">ワークライフバランス</text>
  <rect x="310" y="310" width="160" height="25" fill="#f9a825" rx="3"/>
  <text x="390" y="327" fill="#1a1a2e" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">目的・成長機会を示す</text>
  <!-- Gen Z -->
  <rect x="550" y="55" width="220" height="290" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="660" y="83" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Z世代 (1997-2012)</text>
  <text x="565" y="115" fill="#ffffff" font-size="12" font-family="sans-serif">ソーシャルネイティブ</text>
  <text x="565" y="140" fill="#ffffff" font-size="12" font-family="sans-serif">価値観 / D&I 重視</text>
  <text x="565" y="165" fill="#ffffff" font-size="12" font-family="sans-serif">TikTok / 動画・短文</text>
  <text x="565" y="190" fill="#ffffff" font-size="12" font-family="sans-serif">転職に抵抗感なし</text>
  <rect x="570" y="310" width="160" height="25" fill="#e91e63" rx="3"/>
  <text x="650" y="327" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">インクルージョン体現</text>
</svg>
- 世代ごとに異なる仕事観・コミュニケーション・期待値
- 違いを対立ではなく、多様性として活用する

<!--
ベビーブーマー（1946-1964）: 仕事中心、忠誠心、対面コミュニケーション。X世代（1965-1980）: 自律性、実用主義、非公式コミュニケーション。ミレニアル（1981-1996）: WLB、目的意識、協働志向。Z世代（1997-2012）: デジタルネイティブ、多様性、即座のFB、柔軟性重視。
-->

---

# 世代間ブリッジング戦略

> *Gen Z・ミレニアル・X世代の期待の違いを理解して対話を変える*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="45" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">世代間ブリッジング戦略</text>
  <text x="210" y="72" fill="#4caf50" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">すべき</text>
  <text x="570" y="72" fill="#e91e63" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">避けるべき</text>
  <line x1="400" y1="55" x2="400" y2="390" stroke="#ffffff" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>
  <text x="75" y="95" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">各世代の強みを「相互学習」に活かす</text>
  <text x="75" y="133" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">コミュニケーション手段を世代別に調整</text>
  <text x="75" y="171" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">メンタリング + リバースメンタリング</text>
  <text x="75" y="209" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">会議ファシリテーションで全員に発言機会</text>
  <text x="75" y="247" fill="#4caf50" font-size="20" font-family="sans-serif">✓</text>
  <text x="108" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">業績基準は世代共通・手段は柔軟に</text>
  <text x="435" y="95" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="95" fill="#ffffff" font-size="13" font-family="sans-serif">「昔はこうだった」を武器にする</text>
  <text x="435" y="133" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="133" fill="#ffffff" font-size="13" font-family="sans-serif">一つのコミュニケーション手段を強制</text>
  <text x="435" y="171" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="171" fill="#ffffff" font-size="13" font-family="sans-serif">X世代 = 古い / Z世代 = 若い と決めつけ</text>
  <text x="435" y="209" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="209" fill="#ffffff" font-size="13" font-family="sans-serif">世代でひとくくりにして個人を見ない</text>
  <text x="435" y="247" fill="#e91e63" font-size="20" font-family="sans-serif">✗</text>
  <text x="468" y="247" fill="#ffffff" font-size="13" font-family="sans-serif">年功序列 vs 実力主義 を二項対立に</text>
</svg>
- **期待値の明示化**: 各世代の前提を共有、コミュニケーションチャネルを多様に
- **柔軟なアプローチ**: 一律ルールではなく個別対応
- **リバースメンタリング**: 若手から学ぶ仕組み（月1-2回・30-60分）

<!--
リバースメンタリングの対象: 最新テクノロジー（AI、ソーシャルメディア、ツール）、新しい働き方、若手の価値観・トレンド、DEIへの新しい視点。シニアリーダーと若手をペアリングし、双方向学習で実施。効果: 世代間の相互理解、若手のエンゲージメント向上、シニアのスキル更新。「昔はこうだった」を押し付けない。
-->

---

<!-- _class: lead -->
# リモートマネジメント

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#f9a825" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">リモートマネジメント</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">距離を越えた信頼構築 — 非同期ファーストの設計</text>
</svg>
- ハイブリッド時代の新常識

<!--
リモートは「オフィスワークの劣化版」ではない。新しいマネジメントモデルが必要。
-->

---

# リモートワークの4大課題

> *リモートワークの孤立感・認知可視化・成果評価・文化維持が課題*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">リモートマネジメント 4大課題と解決策</text>
  <!-- Challenge 1: Communication -->
  <rect x="40" y="65" width="340" height="130" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="8"/>
  <text x="75" y="93" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">① コミュニケーション断絶</text>
  <text x="60" y="118" fill="#ffffff" font-size="12" font-family="sans-serif">課題: 情報が届かない/伝わらない</text>
  <text x="60" y="140" fill="#4caf50" font-size="12" font-family="sans-serif">→ 非同期ファースト + 定期チェックイン</text>
  <text x="60" y="162" fill="#4caf50" font-size="12" font-family="sans-serif">→ Slackチャンネル設計の見直し</text>
  <text x="60" y="184" fill="#4caf50" font-size="12" font-family="sans-serif">→ Video ON ポリシー</text>
  <!-- Challenge 2: Trust -->
  <rect x="420" y="65" width="340" height="130" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="8"/>
  <text x="455" y="93" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">② 信頼関係構築の困難</text>
  <text x="440" y="118" fill="#ffffff" font-size="12" font-family="sans-serif">課題: 「見えない」不安</text>
  <text x="440" y="140" fill="#4caf50" font-size="12" font-family="sans-serif">→ アウトカムベースの評価へ転換</text>
  <text x="440" y="162" fill="#4caf50" font-size="12" font-family="sans-serif">→ バーチャル雑談タイム設置</text>
  <text x="440" y="184" fill="#4caf50" font-size="12" font-family="sans-serif">→ 意図的な1on1頻度アップ</text>
  <!-- Challenge 3: Culture -->
  <rect x="40" y="215" width="340" height="130" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="8"/>
  <text x="75" y="243" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">③ チームカルチャー希薄化</text>
  <text x="60" y="268" fill="#ffffff" font-size="12" font-family="sans-serif">課題: 一体感・所属感の低下</text>
  <text x="60" y="290" fill="#4caf50" font-size="12" font-family="sans-serif">→ バーチャルチームイベント</text>
  <text x="60" y="312" fill="#4caf50" font-size="12" font-family="sans-serif">→ 四半期対面合宿</text>
  <text x="60" y="334" fill="#4caf50" font-size="12" font-family="sans-serif">→ チーム価値観の明文化</text>
  <!-- Challenge 4: Burnout -->
  <rect x="420" y="215" width="340" height="130" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="8"/>
  <text x="455" y="243" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">④ バーンアウトリスク増大</text>
  <text x="440" y="268" fill="#ffffff" font-size="12" font-family="sans-serif">課題: 仕事とプライベートの境界崩壊</text>
  <text x="440" y="290" fill="#4caf50" font-size="12" font-family="sans-serif">→ コアタイムの明確化</text>
  <text x="440" y="312" fill="#4caf50" font-size="12" font-family="sans-serif">→ 「ログオフ権」の尊重</text>
  <text x="440" y="334" fill="#4caf50" font-size="12" font-family="sans-serif">→ 定期的なエネルギーチェック</text>
</svg>
- **可視性の欠如** — 誰が何をしているか分からない不安
- **エンゲージメント低下** — 孤立感、帰属意識の希薄化
- **コラボレーション障壁** — 偶発的な会話・アイデア交換の減少
- **境界の曖昧化** — 常時接続の圧力、燃え尽きリスク

<!--
4大課題それぞれに対策: 可視性→透明なタスク管理と過剰コミュニケーション。エンゲージメント→意図的な関係構築と1on1強化。コラボレーション→非同期ツールと意図的な同期セッション。境界→明確なオフ時間ルール。マインドセットシフト: アウトプット重視（労働時間ではなく成果で評価）。
-->

---

# 非同期ファーストの原則

> *非同期ファーストで時間帯問わず最高パフォーマンスを引き出す*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">非同期ファーストの原則</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">録画 > 生放送</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">会議は録画 → 視聴しやすい時間に見る</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">文章 > 口頭</text>
  <text x="735" y="153" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">意思決定をドキュメントに残す</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">スレッド > DM</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">Slackスレッドで議論を可視化・検索可能に</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">デフォルト非同期</text>
  <text x="735" y="257" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">緊急以外は即時返答を期待しない</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">チェックインメトリクス</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">アウトプットで評価 — 時間ではなく成果で</text>
</svg>
- **デフォルトは文書化**: Slack/Teams、ドキュメント優先
- **意思決定の記録**: なぜその決定をしたか文書化（RFC方式）
- **応答時間の明示**: 24時間以内など、期待値を共有

<!--
非同期は効率と包摂性を高める。タイムゾーン・育児・集中時間を尊重。具体的施策: RFC方式（提案→非同期コメント→必要時のみ会議）、会議は録画共有、ステータスは週次/日次書面。ツール: Notion/Confluence、Loom、GitHub Issues。同期ミーティングは本当に必要な時のみ。
-->

---

# ハイブリッドワークの設計

> *ハイブリッド設計の失敗例：出社強制は離職率30%増加につながる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="46" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">ハイブリッドワーク 設計パラメータ</text>
  <text x="205" y="92" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">オフィス出社頻度 (推奨)</text>
  <rect x="215" y="76" width="180" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="403" y="92" fill="#f9a825" font-size="12" font-family="sans-serif">週2日 — コラボ中心</text>
  <text x="205" y="147" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">リモート比率</text>
  <rect x="215" y="131" width="270" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="493" y="147" fill="#29b6f6" font-size="12" font-family="sans-serif">週3日 — 集中作業</text>
  <text x="205" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">コアタイム (全員オンライン)</text>
  <rect x="215" y="186" width="225" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="448" y="202" fill="#e91e63" font-size="12" font-family="sans-serif">10-15時 推奨</text>
  <text x="205" y="257" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">チームビルディング対面頻度</text>
  <rect x="215" y="241" width="113" height="28" fill="#4caf50" rx="3" opacity="0.9"/>
  <text x="336" y="257" fill="#4caf50" font-size="12" font-family="sans-serif">月1-2回 合宿</text>
  <text x="205" y="312" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">1on1 リモート許容率</text>
  <rect x="215" y="296" width="360" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="583" y="312" fill="#f9a825" font-size="12" font-family="sans-serif">80%はビデオで十分</text>
</svg>
- **全員リモート原則**: 会議は全員が個別デバイスから参加
- **評価の公平性**: 成果ベース、オフィス滞在時間は評価に無関係
- **意図的なオフィス利用**: コラボレーション・社交のために設計

<!--
ハイブリッドは最も難しいモデル。中途半端が最悪。よくある失敗: オフィス勤務者が昇進で有利、ハイブリッド会議でリモート参加者が不利。立ち話の内容も文書化する文化が重要。出社ポリシーは強制ではなく目的ベース。明確な原則とルールが必要。
-->

---

# リモートでの信頼構築

> *リモートでの信頼構築はアウトプット可視化と週次同期が鍵*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">リモートでの信頼構築 — 実践チェックリスト</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">約束を守る</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">期日・コミットメントは100%履行 — 信頼の基盤</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">脆弱性を見せる</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「わからない」「間違えた」を公言できる文化</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">意図的な雑談</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">仕事外の話題に毎日5分投資する</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">成果の可視化</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">チームの貢献を定期的に全員の前で共有</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">仮想コーヒーチャット</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">ランダムペアでの非公式会話を設定</text>
</svg>
- **チェックイン**: 会議冒頭5分の雑談・近況共有
- **対面機会の活用**: 四半期オフサイト、オンボーディングは対面推奨
- **過剰コミュニケーション**: 進捗・課題・決定をオーバーシェア

<!--
リモートでは意図的な関係構築が必要。偶然に任せない。バーチャルチームビルディング: オンラインゲーム、バーチャルコーヒーチャット、趣味チャンネル。対面は戦略的に: 四半期オフサイト、新メンバーのオンボーディング、重要キックオフ。見えないことが不安を生むため透明性が鍵。
-->

---

<!-- _class: lead -->
# ダイバーシティ＆インクルージョン

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#4caf50" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#4caf50" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#4caf50" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">ダイバーシティ＆インクルージョン</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">多様性は義務ではなく競争優位 — McKinsey研究が証明</text>
</svg>
- 多様性を力に変える

<!--
D&Iは「正しいこと」であり、かつ「賢いビジネス判断」。データで示す。
-->

---

# D&Iの戦略的価値

> *D&I施策は企業業績と直結：多様性指数上位企業は利益率+33%*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="35" fill="#f9a825" font-size="20" font-weight="bold" text-anchor="middle" font-family="sans-serif">D&I の戦略的ビジネス価値</text>
  <!-- Center D&I -->
  <ellipse cx="400" cy="210" rx="80" ry="50" fill="#f9a825"/>
  <text x="400" y="205" fill="#1a1a2e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">D&I</text>
  <text x="400" y="225" fill="#1a1a2e" font-size="12" text-anchor="middle" font-family="sans-serif">多様性・包括性</text>
  <!-- Outcome 1: Innovation -->
  <rect x="40" y="80" width="160" height="70" fill="#16213e" stroke="#f9a825" stroke-width="2" rx="6"/>
  <text x="120" y="108" fill="#f9a825" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">イノベーション</text>
  <text x="120" y="132" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">+45% 新製品率</text>
  <line x1="200" y1="115" x2="320" y2="185" stroke="#f9a825" stroke-width="1.5"/>
  <!-- Outcome 2: Decision quality -->
  <rect x="600" y="80" width="160" height="70" fill="#16213e" stroke="#e91e63" stroke-width="2" rx="6"/>
  <text x="680" y="108" fill="#e91e63" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">意思決定精度</text>
  <text x="680" y="132" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">+87% 精度向上</text>
  <line x1="600" y1="115" x2="480" y2="185" stroke="#e91e63" stroke-width="1.5"/>
  <!-- Outcome 3: Talent retention -->
  <rect x="40" y="250" width="160" height="70" fill="#16213e" stroke="#29b6f6" stroke-width="2" rx="6"/>
  <text x="120" y="278" fill="#29b6f6" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">人材定着率</text>
  <text x="120" y="302" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">離職率 -35%</text>
  <line x1="200" y1="285" x2="320" y2="240" stroke="#29b6f6" stroke-width="1.5"/>
  <!-- Outcome 4: Financial performance -->
  <rect x="600" y="250" width="160" height="70" fill="#16213e" stroke="#4caf50" stroke-width="2" rx="6"/>
  <text x="680" y="278" fill="#4caf50" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">財務パフォーマンス</text>
  <text x="680" y="302" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">ROE +36%向上</text>
  <line x1="600" y1="285" x2="480" y2="240" stroke="#4caf50" stroke-width="1.5"/>
  <!-- Source -->
  <text x="400" y="375" fill="#ffffff" font-size="12" text-anchor="middle" font-family="sans-serif">出典: McKinsey Diversity Wins 2020, Cloverpop研究</text>
</svg>
- 多様なチームは**35%イノベーション力が高い**（McKinsey）
- ジェンダー多様性上位25%企業は**15%業績向上**
- 人種的多様性上位25%企業は**35%業績向上**

<!--
ビジネスケース: 異なる視点が創造性を高める。多様な顧客を理解するには多様なチームが必要。グローバル市場での競争力。優秀な人材はD&I重視企業を選ぶ。特に若い世代で顕著。D&Iは社会的責任であると同時に競争優位の源泉。
-->

---

# インクルーシブリーダーシップ

> *インクルーシブリーダーシップの6行動でチーム心理安全性が向上*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">インクルーシブリーダーシップの6要素</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">コミットメント</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">多様性をリーダーシップ議題の最優先に置く</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">勇気</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">自分のバイアスを認め、挑戦的な会話をする</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">認知の開放性</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">自分と異なる視点を積極的に求める</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">謙虚さ</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「知らないこと」を認める — 部下から学ぶ</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">好奇心</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">異なる背景・経験に対して純粋に興味を持つ</text>
</svg>
- **多様な声を引き出す**: 「〜さん、どう思う？」と指名、声の大きい人に支配させない
- **発言を公平に扱う**: アイデアの質で評価、「繰り返し」問題に注意
- **マイクロアグレッションに介入**: その場で指摘、教育的アプローチ

<!--
ダイバーシティ: パーティーに招待されること。インクルージョン: 踊りに誘われること。「繰り返し」問題: 女性のアイデアを男性が言い直して評価される現象。マイクロアグレッションにはその場で介入。リーダーが模範を示す。
-->

---

# 無意識バイアスの克服

> *無意識バイアストレーニングで採用・評価の公平性が30%改善*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="46" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">無意識バイアス 種類と対策優先度</text>
  <text x="205" y="92" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">アフィニティバイアス</text>
  <rect x="215" y="76" width="396" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="619" y="92" fill="#e91e63" font-size="12" font-family="sans-serif">自分と似た人を好む</text>
  <text x="205" y="147" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">確証バイアス</text>
  <rect x="215" y="131" width="360" height="28" fill="#e91e63" rx="3" opacity="0.9"/>
  <text x="583" y="147" fill="#e91e63" font-size="12" font-family="sans-serif">既存見解を強化する情報だけ見る</text>
  <text x="205" y="202" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ハロー / ホーン効果</text>
  <rect x="215" y="186" width="324" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="547" y="202" fill="#f9a825" font-size="12" font-family="sans-serif">一点が全体評価に影響</text>
  <text x="205" y="257" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">帰属バイアス</text>
  <rect x="215" y="241" width="293" height="28" fill="#f9a825" rx="3" opacity="0.9"/>
  <text x="516" y="257" fill="#f9a825" font-size="12" font-family="sans-serif">成功→努力 / 失敗→属性に帰属</text>
  <text x="205" y="312" fill="#ffffff" font-size="13" text-anchor="end" font-family="sans-serif">ステレオタイプ脅威</text>
  <rect x="215" y="296" width="261" height="28" fill="#29b6f6" rx="3" opacity="0.9"/>
  <text x="484" y="312" fill="#29b6f6" font-size="12" font-family="sans-serif">集団的ステレオタイプへの恐怖</text>
</svg>
- **採用**: 構造化面接・ブラインドレジュメ・多様な面接パネル
- **昇進**: 明確な基準・複数評価者・「ポテンシャル」より実績
- **日常**: 意思決定プロセスの透明化、データ駆動で主観を排除

<!--
無意識バイアスの種類: アフィニティバイアス（似た人を好む）、確証バイアス（先入観を確認する情報だけ見る）、帰属エラー。個人の意識改革だけでは不十分。システム・プロセスの変革が必要。構造的アプローチで仕組みとしてバイアスを排除する。
-->

---

# 心理的安全性 × D&I

> *心理的安全性とD&Iの相乗効果でイノベーション創出率が倍増*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <rect x="0" y="155" width="800" height="90" fill="#f9a825" opacity="0.15"/>
  <line x1="60" y1="195" x2="740" y2="195" stroke="#f9a825" stroke-width="1.5" opacity="0.5"/>
  <text x="400" y="188" fill="#f9a825" font-size="24" font-weight="bold" text-anchor="middle" font-family="sans-serif">心理的安全性 × D&I</text>
  <text x="400" y="218" fill="#ffffff" font-size="14" text-anchor="middle" font-family="sans-serif">心理的安全性がなければ多様性は機能しない</text>
</svg>
- 心理的安全性なしにインクルージョンは実現しない
- 多様性は心理的安全性を挑戦する — しかし適切に管理すれば相乗効果
- 両方があって初めて**学習する組織**が生まれる

<!--
統合的施策: 1. 学習する文化—失言を許容しつつ学習機会に。2. オープンな対話—タブーなしで話せる環境。3. アライシップ—マジョリティが声を上げる。4. 継続的取り組み—一度きりのトレーニングでは不十分、四半期ごとのD&I目標。D&Iと心理的安全性は表裏一体。
-->

---

# マネージメントの原則：まとめ (1/2)

> *今日の6テーマは全て今週の1on1から実践できる行動に落とせる*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">マネージメントの原則：まとめ（1/2）</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1on1は部下のための時間</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">関係構築 > 業務確認 | 毎週定期実施</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">フィードバックは行動に</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">SBIAで具体的に | ポジティブ比率 5:1</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">コーチングを優先</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">答えを教えず問いを立てる | GROWモデル活用</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">内発的動機の3要素</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">自律性+有能感+関係性を意図的に設計</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">心理的安全性が先</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">4段階: 参加→学習→貢献→挑戦を順番に育てる</text>
</svg>
- 1. **1on1は投資** — 最優先事項、キャンセル厳禁
- 2. **フィードバックは贈り物** — SBIで具体的に、4:1の比率
- 3. **コーチングで自律性** — 答えを教えず、質問で引き出す
- 4. **内発的動機づけ** — 自律性・有能感・関係性の3つの柱

<!--
前半まとめ。これら4つの原則は日常のマネジメント行動に直結。すべて明日から実践可能。
-->

---

# マネージメントの原則：まとめ (2/2)

> *継続的な実践と自己フィードバックが優れたマネージャーを作る*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">マネージメントの原則：まとめ（2/2）</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">評価バイアスを自覚する</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">OKR × フィードバック文化でバイアスを薄める</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">世代を超えたブリッジング</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">X/Y/Z それぞれの強みを相互学習に活用</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">非同期ファーストの設計</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">リモートでも信頼は構築できる — 意図的な投資</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">D&Iは競争優位</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">ROE +36% | 意思決定精度 +87%</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">黄金律: 傾聴×共感×行動</text>
  <text x="735" y="309" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">マネージャーの最大スキルは「聴くこと」</text>
</svg>
- 5. **心理的安全性が土台** — 失敗を学習機会に変える文化
- 6. **公平な評価** — バイアス認識と構造化プロセス
- 7. **世代・多様性を力に** — 違いを対立ではなく資産に
- 8. **リモート＝新しいモデル** — アウトプット重視、非同期ファースト

<!--
後半まとめ。共通テーマは「信頼と透明性」。すべての原則は相互に関連しており、断片的ではなく統合的に実践する。
-->

---

# 今日のアクションアイテム

> *今日帰ってから24時間以内に着手できる3つの具体的アクション*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">今日のアクションアイテム — 明日から実践</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">1on1を設定する</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">今週中に全メンバーと30分1on1を設定</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">SBIAを練習する</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">今週1件、フィードバックをSBIAで伝える</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">強みを承認する</text>
  <text x="735" y="205" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">今日中に誰か1人の貢献を具体的に伝える</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">GROWを試す</text>
  <text x="735" y="257" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">次の1on1でGROWモデルを一回使ってみる</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">チーム規範を見直す</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">チームの暗黙のルールを明文化する</text>
</svg>
- **1. 来週の1on1を確認** — 定例化・部下がアジェンダ設定しているか？
- **2. ポジティブFBを3つ** — 今週中にSBIで具体的なフィードバック
- **3. 自分へのFBを求める** — 「改善してほしいことは？」と部下に聞く

<!--
即実践できる行動に絞った。追加: 4. チーム規範を確認—明文化されているか？ 5. キャリア開発の会話—1人の部下と「3年後どうなっていたい？」と対話。小さな行動から始める。完璧を目指さず継続を重視。
-->

---

# リソースと参考文献

> *マネジメント科学の一次情報源：Google re:Work・HBR・CCL*

- <svg viewBox="0 0 800 400" style="max-height:70vh;max-width:100%;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#1a1a2e"/>
  <text x="400" y="52" fill="#f9a825" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">リソースと参考文献</text>
  <rect x="40" y="75" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="101" fill="#f9a825" font-size="13" font-weight="bold" font-family="sans-serif">Radical Candor (Kim Scott)</text>
  <text x="735" y="101" fill="#f9a825" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">「完全な透明性」— 思いやりを持ちつつ直接的に</text>
  <rect x="40" y="127" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="153" fill="#e91e63" font-size="13" font-weight="bold" font-family="sans-serif">The Manager's Path (Camille Fournier)</text>
  <text x="735" y="153" fill="#e91e63" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">エンジニアリングマネジメントの決定版</text>
  <rect x="40" y="179" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="205" fill="#29b6f6" font-size="13" font-weight="bold" font-family="sans-serif">An Elegant Puzzle (Will Larson)</text>
  <text x="735" y="205" fill="#29b6f6" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">システム思考でのマネジメント</text>
  <rect x="40" y="231" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="257" fill="#4caf50" font-size="13" font-weight="bold" font-family="sans-serif">Project Aristotle (Google)</text>
  <text x="735" y="257" fill="#4caf50" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">チーム成功要因研究 — 心理的安全性が1位</text>
  <rect x="40" y="283" width="720" height="46" fill="#16213e" rx="4"/>
  <text x="65" y="309" fill="#ab47bc" font-size="13" font-weight="bold" font-family="sans-serif">Self-Determination Theory (Deci & Ryan)</text>
  <text x="735" y="309" fill="#ab47bc" font-size="12" font-weight="bold" text-anchor="end" font-family="sans-serif">内発的動機の科学的根拠</text>
</svg>
- **書籍**: [Radical Candor](https://www.radicalcandor.com/) / [The Manager's Path](https://www.oreilly.com/library/view/the-managers-path/9781491973882/) / [Drive](https://www.danpink.com/books/drive/)
- **研究**: [Project Aristotle](https://rework.withgoogle.com/guides/understanding-team-effectiveness/) / [State of Remote Work](https://buffer.com/state-of-remote-work)
- **ツール**: [15Five](https://www.15five.com/) / [Lattice](https://lattice.com/) / [Culture Amp](https://www.cultureamp.com/)

<!--
継続学習のためのリソース。Radical Candor: フィードバック文化。The Manager's Path: テックマネジメント。Drive: モチベーション理論。組織で共有し、学習する文化を醸成。
-->

---

# Q&A / ディスカッション

> *今日の議論を深化させる3つの問いを持ち帰ってください*

- **あなたの組織で最も困難なマネジメント課題は？**
- **今日学んだ中で、最も実践したいことは？**
- **ありがとうございました！**

<!--
質疑応答に10-15分。時間が余ればグループディスカッション。月次マネジメント勉強会やピアコーチングを提案。アンケート実施推奨。
-->
