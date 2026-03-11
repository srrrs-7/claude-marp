import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219230000_isms-guide/slides-data.json";
const data = JSON.parse(readFileSync(path, "utf-8"));
const BG = "#1a1a2e",
	BOX = "#16213e",
	A1 = "#f9a825",
	A2 = "#e91e63",
	TXT = "#ffffff",
	GRN = "#4caf50",
	BLU = "#2196f3",
	ORG = "#ff6f00";
const w = (s: string, h = 400) =>
	`<svg viewBox="0 0 800 ${h}" style="max-height:70vh;width:auto;display:block;margin:0 auto;letter-spacing:0" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;

// Slide 6: Cyber threat stats
const svg6 = w(
	`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="35" font-size="18" fill="${A1}" text-anchor="middle" font-weight="bold">サイバー脅威の現状 — 主要統計</text>
<rect x="30" y="55" width="220" height="130" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="140" y="82" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">ランサムウェア</text>
<text x="140" y="108" font-size="34" fill="${A1}" text-anchor="middle" font-weight="bold">6倍</text>
<text x="140" y="132" font-size="11" fill="${TXT}" text-anchor="middle">2019→2023年の被害増加</text>
<text x="140" y="155" font-size="10" fill="#aaa" text-anchor="middle">平均身代金: $1.5M (2023)</text>
<rect x="290" y="55" width="220" height="130" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="82" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">情報漏えいコスト</text>
<text x="400" y="108" font-size="34" fill="${A1}" text-anchor="middle" font-weight="bold">$4.45M</text>
<text x="400" y="132" font-size="11" fill="${TXT}" text-anchor="middle">平均コスト (IBM 2023)</text>
<text x="400" y="155" font-size="10" fill="#aaa" text-anchor="middle">日本: 約5.3億円</text>
<rect x="550" y="55" width="220" height="130" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="660" y="82" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">サプライチェーン攻撃</text>
<text x="660" y="108" font-size="34" fill="${A1}" text-anchor="middle" font-weight="bold">742%</text>
<text x="660" y="132" font-size="11" fill="${TXT}" text-anchor="middle">2019→2022年の増加率</text>
<text x="660" y="155" font-size="10" fill="#aaa" text-anchor="middle">ENISA報告</text>
<text x="400" y="215" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">なぜISMSが必要か</text>
<rect x="50" y="230" width="700" height="50" rx="6" fill="${BOX}"/>
<text x="400" y="251" font-size="12" fill="${TXT}" text-anchor="middle">法令遵守（個人情報保護法・サイバーセキュリティ基本法）</text>
<text x="400" y="270" font-size="12" fill="${TXT}" text-anchor="middle">取引先・顧客からのセキュリティ要求への対応</text>
<rect x="50" y="295" width="700" height="50" rx="6" fill="${BOX}"/>
<text x="400" y="316" font-size="12" fill="${A2}" text-anchor="middle">ISMS認証 = 組織的・体系的なリスク管理の証明</text>
<text x="400" y="336" font-size="12" fill="${TXT}" text-anchor="middle">事後対応 → 事前予防へのパラダイムシフト</text>
<text x="400" y="378" font-size="11" fill="#aaa" text-anchor="middle">出典: IBM Cost of a Data Breach 2023, ENISA Threat Landscape 2023</text>`,
	400,
);

// Slide 8: ISMS history timeline
const svg8 = w(
	`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" font-size="17" fill="${A1}" text-anchor="middle" font-weight="bold">ISMSの歴史と変遷</text>
<line x1="60" y1="200" x2="740" y2="200" stroke="${A1}" stroke-width="3"/>
<polygon points="740,194 756,200 740,206" fill="${A1}"/>
${[
	[60, "1995", "BS 7799", "英国規格"],
	[180, "2000", "ISO/IEC\n17799", "国際規格化"],
	[300, "2005", "ISO/IEC\n27001:2005", "ISMS認証開始"],
	[430, "2013", "ISO/IEC\n27001:2013", "大幅改訂"],
	[560, "2022", "ISO/IEC\n27001:2022", "最新版"],
	[690, "2024", "移行期限", "〜10月末"],
]
	.map(([x, yr, title, sub]) => {
		const nx = Number(x);
		const above = [60, 300, 560].includes(nx);
		const ty = above ? 120 : 240;
		const lineY1 = above ? 140 : 200;
		const lineY2 = above ? 200 : 240;
		const lines = String(title).split("\n");
		return `<circle cx="${nx}" cy="200" r="7" fill="${A1}"/>
<line x1="${nx}" y1="${lineY1}" x2="${nx}" y2="${lineY2}" stroke="#555" stroke-width="1" stroke-dasharray="4"/>
<text x="${nx}" y="${ty}" font-size="10" fill="${A1}" text-anchor="middle" font-weight="bold">${yr}</text>
${lines.map((l, i) => `<text x="${nx}" y="${ty + 14 + i * 13}" font-size="9" fill="${TXT}" text-anchor="middle">${l}</text>`).join("")}
<text x="${nx}" y="${ty + 14 + lines.length * 13 + 4}" font-size="8" fill="#aaa" text-anchor="middle">${sub}</text>`;
	})
	.join("")}
<rect x="50" y="320" width="700" height="60" rx="6" fill="${BOX}"/>
<text x="400" y="345" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">2022年版の主な変更点</text>
<text x="400" y="365" font-size="11" fill="${TXT}" text-anchor="middle">管理策: 114項目 → 93項目（統合・整理・新設11項目）/ 4カテゴリ制（組織・人的・物理・技術）</text>
<text x="400" y="380" font-size="11" fill="${TXT}" text-anchor="middle">新設: 脅威インテリジェンス・クラウドセキュリティ・ICTサプライチェーン・データ漏えい等</text>`,
	400,
);

// Slide 9: ISO 27001 structure overview
const svg9 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="30" font-size="17" fill="${A1}" text-anchor="middle" font-weight="bold">ISO/IEC 27001:2022 — 全体構造</text>
<rect x="250" y="50" width="300" height="45" rx="8" fill="${A2}"/>
<text x="400" y="70" font-size="13" fill="${TXT}" text-anchor="middle" font-weight="bold">箇条4〜10（本文）</text>
<text x="400" y="87" font-size="11" fill="${TXT}" text-anchor="middle">ISMS要求事項 — HLS準拠</text>
${[
	[50, 130, "箇条4\nコンテキスト", A1],
	[190, 130, "箇条5\nリーダーシップ", A1],
	[330, 130, "箇条6\n計画", A1],
	[470, 130, "箇条7\n支援", A1],
	[610, 130, "箇条8\n運用", A1],
]
	.map(
		([
			x,
			y,
			label,
			c,
		]) => `<rect x="${x}" y="${y}" width="120" height="60" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 60}" y="${Number(y) + 28}" font-size="10" fill="${c}" text-anchor="middle" font-weight="bold">${String(label).split("\n")[0]}</text>
<text x="${Number(x) + 60}" y="${Number(y) + 44}" font-size="10" fill="${TXT}" text-anchor="middle">${String(label).split("\n")[1]}</text>`,
	)
	.join("")}
${[
	[130, 215, "箇条9\nパフォーマンス評価", BLU],
	[390, 215, "箇条10\n改善", BLU],
]
	.map(
		([
			x,
			y,
			label,
			c,
		]) => `<rect x="${x}" y="${y}" width="210" height="60" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 105}" y="${Number(y) + 28}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${String(label).split("\n")[0]}</text>
<text x="${Number(x) + 105}" y="${Number(y) + 46}" font-size="11" fill="${TXT}" text-anchor="middle">${String(label).split("\n")[1]}</text>`,
	)
	.join("")}
<line x1="400" y1="95" x2="400" y2="130" stroke="#555" stroke-width="1"/>
<rect x="150" y="295" width="500" height="60" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="320" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">Annex A — 93の情報セキュリティ管理策（参照規範）</text>
<text x="400" y="342" font-size="11" fill="${TXT}" text-anchor="middle">組織的(37) ・ 人的(8) ・ 物理的(14) ・ 技術的(34)</text>
<line x1="400" y1="275" x2="400" y2="295" stroke="#555" stroke-width="1"/>`,
	380,
);

// Slide 11: HLS structure
const svg11 = w(
	`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="30" font-size="17" fill="${A1}" text-anchor="middle" font-weight="bold">HLS（高位構造）— マネジメントシステムの共通骨格</text>
<rect x="200" y="50" width="400" height="40" rx="6" fill="${A2}"/>
<text x="400" y="76" font-size="13" fill="${TXT}" text-anchor="middle" font-weight="bold">HLS (High Level Structure)</text>
${[
	["ISO 27001\nISMS", 80, GRN],
	["ISO 9001\n品質", 230, BLU],
	["ISO 14001\n環境", 380, A1],
	["ISO 45001\n安全衛生", 530, ORG],
]
	.map(
		([
			label,
			x,
			c,
		]) => `<rect x="${x}" y="110" width="140" height="55" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 70}" y="${133}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${String(label).split("\n")[0]}</text>
<text x="${Number(x) + 70}" y="${150}" font-size="10" fill="${TXT}" text-anchor="middle">${String(label).split("\n")[1]}</text>`,
	)
	.join("")}
${[80, 230, 380, 530].map((x) => `<line x1="${x + 70}" y1="90" x2="${x + 70}" y2="110" stroke="#555" stroke-width="1"/>`).join("")}
<text x="400" y="195" font-size="14" fill="${A1}" text-anchor="middle" font-weight="bold">共通構造の利点</text>
${[
	[50, 215, "統合マネジメント", "ISO 9001+27001 を\n一体運用できる"],
	[230, 215, "移行の容易さ", "他規格認証済なら\n共通条文を流用"],
	[410, 215, "審査の効率化", "共通項目をまとめ\n審査できる"],
	[590, 215, "用語の統一", "リスク・文書管理等\n概念が統一"],
]
	.map(
		([
			x,
			y,
			title,
			desc,
		]) => `<rect x="${x}" y="${y}" width="170" height="85" rx="6" fill="${BOX}"/>
<text x="${Number(x) + 85}" y="${Number(y) + 22}" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, i) =>
			`<text x="${Number(x) + 85}" y="${Number(y) + 42 + i * 17}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<rect x="100" y="320" width="600" height="55" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="345" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">PDCAサイクルとの対応</text>
<text x="400" y="363" font-size="11" fill="${TXT}" text-anchor="middle">Plan(箇条6) → Do(箇条8) → Check(箇条9) → Act(箇条10)</text>`,
	400,
);

// Slide 12: Clause 4-5 context & leadership
const svg12 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">箇条4・5 — コンテキストとリーダーシップ</text>
<rect x="30" y="45" width="360" height="150" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="210" y="68" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">箇条4: 組織のコンテキスト</text>
${[
	"4.1 内外の課題（SWOT・PESTLE）",
	"4.2 利害関係者のニーズ",
	"4.3 ISMSのスコープ定義",
	"4.4 ISMSの確立・実施・維持・改善",
]
	.map(
		(t, i) =>
			`<text x="50" y="${90 + i * 22}" font-size="11" fill="${TXT}">${t}</text>`,
	)
	.join("")}
<rect x="410" y="45" width="360" height="150" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="590" y="68" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">箇条5: リーダーシップ</text>
${[
	"5.1 リーダーシップとコミットメント",
	"5.2 情報セキュリティ方針の策定",
	"5.3 役割・責任・権限の割り当て",
	"→ CISO/ISMSオーナーの任命",
]
	.map(
		(t, i) =>
			`<text x="425" y="${90 + i * 22}" font-size="11" fill="${TXT}">${t}</text>`,
	)
	.join("")}
<text x="400" y="225" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">スコープ定義の重要性</text>
${[
	[50, 240, "物理的境界", "オフィス・データセンター・\nリモートワーク環境"],
	[230, 240, "組織的境界", "部門・子会社・\n委託先の含め方"],
	[410, 240, "情報資産範囲", "クラウド・SaaS・\nオンプレ混在"],
	[590, 240, "除外の根拠", "合理的な理由を\n文書化すること"],
]
	.map(
		([
			x,
			y,
			title,
			desc,
		]) => `<rect x="${x}" y="${y}" width="165" height="80" rx="6" fill="${BOX}"/>
<text x="${Number(x) + 82}" y="${Number(y) + 20}" font-size="11" fill="${A1}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, i) =>
			`<text x="${Number(x) + 82}" y="${Number(y) + 38 + i * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<rect x="100" y="340" width="600" height="30" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="360" font-size="11" fill="${TXT}" text-anchor="middle">スコープが曖昧 → 審査で不適合 → 再認証リスク。最初に明確化することが最重要</text>`,
	380,
);

// Slide 13: Clause 6 planning
const svg13 = w(
	`<rect width="800" height="400" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">箇条6 — 計画: リスクアセスメントプロセス</text>
${[
	[50, 60, "資産特定", "情報資産の\n洗い出し", A1],
	[200, 60, "脅威分析", "脅威・脆弱性\nの特定", A1],
	[350, 60, "リスク評価", "影響×可能性\nスコア算出", A1],
	[500, 60, "リスク対応", "4つの選択肢\n検討", A1],
	[650, 60, "SoA作成", "管理策適用\n宣言書", A1],
]
	.map(([x, y, title, desc, c], i) => {
		const nx = Number(x),
			ny = Number(y);
		const arrow =
			i < 4
				? `<polygon points="${nx + 145},${ny + 30} ${nx + 155},${ny + 25} ${nx + 155},${ny + 35}" fill="${c}"/>
<line x1="${nx + 140}" y1="${ny + 30}" x2="${nx + 155}" y2="${ny + 30}" stroke="${c}" stroke-width="2"/>`
				: "";
		return `<rect x="${nx}" y="${ny}" width="140" height="65" rx="8" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${nx + 70}" y="${ny + 22}" font-size="12" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${nx + 70}" y="${ny + 39 + li * 15}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}
${arrow}`;
	})
	.join("")}
<text x="400" y="160" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">6.1.2 リスク基準の設定（必須）</text>
<rect x="50" y="175" width="700" height="55" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="400" y="197" font-size="11" fill="${TXT}" text-anchor="middle">リスク受容基準: スコア閾値（例: 12以上は対応必須）/ 影響度・発生可能性の評価尺度（5段階等）</text>
<text x="400" y="218" font-size="11" fill="${TXT}" text-anchor="middle">定量的: 財務損失ベース / 定性的: 業務影響度ベース（どちらも可、一貫性が重要）</text>
<text x="400" y="255" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">6.2 情報セキュリティ目的 — 設定要件</text>
${[
	["測定可能", "KPI設定:\nパッチ適用率95%以上"],
	["整合性", "ISMSスコープ・\n方針と一致"],
	["リソース確保", "目的達成に必要な\n予算・人員を確保"],
	["モニタリング", "四半期レビュー・\n年次評価"],
]
	.map(
		(
			[title, desc],
			i,
		) => `<rect x="${50 + i * 178}" y="272" width="165" height="75" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="1"/>
<text x="${50 + i * 178 + 82}" y="292" font-size="11" fill="${GRN}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${50 + i * 178 + 82}" y="${310 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	400,
);

// Slide 14: Clause 7-8 support and operation
const svg14 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">箇条7・8 — 支援と運用</text>
<rect x="30" y="45" width="360" height="155" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="210" y="66" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">箇条7: 支援</text>
${[
	["7.1 資源", "人・物・予算・技術の確保"],
	["7.2 力量", "スキル特定・OJT・外部研修"],
	["7.3 認識", "全従業員への方針周知"],
	["7.4 コミュニケーション", "報告・情報共有ルール"],
	["7.5 文書化情報", "文書管理・版管理・アクセス制御"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="48" y="${90 + i * 22}" font-size="10" fill="${A1}" font-weight="bold">${k}</text>
<text x="175" y="${90 + i * 22}" font-size="10" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<rect x="410" y="45" width="360" height="155" rx="8" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="590" y="66" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">箇条8: 運用</text>
${[
	["8.1 運用の計画・管理", "ISMSプロセスの実施"],
	["8.2 リスクアセスメント", "定期的な再評価（年1回以上）"],
	["8.3 リスク対応", "リスク対応計画の実施"],
	["→ 変更管理", "ISMSへの影響評価・承認"],
	["→ 外部委託", "委託先の管理・契約要件"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="428" y="${90 + i * 22}" font-size="10" fill="${A2}" font-weight="bold">${k}</text>
<text x="560" y="${90 + i * 22}" font-size="10" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<text x="400" y="228" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">文書化情報の管理ポイント</text>
${[
	[
		"必須文書",
		"ISMS方針・SoA・リスクアセスメント結果\nリスク対応計画・情報セキュリティ目的",
		A1,
	],
	[
		"任意推奨文書",
		"手順書・作業指示書・チェックリスト\nインシデント記録・訓練記録",
		BLU,
	],
	["版管理要件", "改訂日・改訂者・承認者を記録\n旧版の廃棄・参照防止策", ORG],
]
	.map(
		(
			[title, desc, c],
			i,
		) => `<rect x="${40 + i * 245}" y="243" width="228" height="90" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="${40 + i * 245 + 114}" y="263" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${40 + i * 245 + 114}" y="${280 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 15: Clause 9-10 performance and improvement
const svg15 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">箇条9・10 — パフォーマンス評価と改善</text>
<rect x="30" y="45" width="355" height="165" rx="8" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="207" y="66" font-size="13" fill="${BLU}" text-anchor="middle" font-weight="bold">箇条9: パフォーマンス評価</text>
${[
	["9.1 監視・測定・分析・評価", "KPIモニタリング・有効性評価"],
	["9.2 内部監査", "年1回以上・全スコープカバー"],
	["  → 監査プログラム", "独立性確保・力量ある監査員"],
	["9.3 マネジメントレビュー", "トップマネジメントによる年次評価"],
	["  → インプット", "監査結果・KPI・リスク変化"],
	["  → アウトプット", "改善決定・リソース確保"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="48" y="${90 + i * 18}" font-size="9.5" fill="${BLU}" font-weight="bold">${k}</text>
<text x="225" y="${90 + i * 18}" font-size="9.5" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<rect x="415" y="45" width="355" height="165" rx="8" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="592" y="66" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">箇条10: 改善</text>
${[
	["10.1 継続的改善", "ISMSの有効性・適切性の向上"],
	["10.2 不適合と是正処置", ""],
	["  ① 不適合の特定", "根本原因分析（RCA）実施"],
	["  ② 是正処置の実施", "再発防止策の策定・実行"],
	["  ③ 有効性の評価", "処置後の効果検証・記録"],
	["  ④ 文書化", "不適合・処置・結果を記録"],
]
	.map(
		(
			[k, v],
			i,
		) => `<text x="432" y="${90 + i * 18}" font-size="9.5" fill="${GRN}" font-weight="bold">${k}</text>
<text x="600" y="${90 + i * 18}" font-size="9.5" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<text x="400" y="240" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">PDCAサイクルの実践</text>
${[
	["Plan\n(箇条6)", 80, A1],
	["Do\n(箇条8)", 240, A2],
	["Check\n(箇条9)", 480, BLU],
	["Act\n(箇条10)", 640, GRN],
]
	.map(([label, x, c]) => {
		const parts = String(label).split("\n");
		return `<circle cx="${Number(x) + 40}" cy="310" r="38" fill="${BOX}" stroke="${c}" stroke-width="3"/>
<text x="${Number(x) + 40}" y="305" font-size="13" fill="${c}" text-anchor="middle" font-weight="bold">${parts[0]}</text>
<text x="${Number(x) + 40}" y="322" font-size="9" fill="${TXT}" text-anchor="middle">${parts[1]}</text>`;
	})
	.join("")}
${[
	[176, 310, "→"],
	[378, 310, "→"],
	[536, 310, "→"],
]
	.map(
		([x, y, t]) =>
			`<text x="${x}" y="${Number(y) + 5}" font-size="20" fill="${A1}" text-anchor="middle">${t}</text>`,
	)
	.join("")}`,
	380,
);

// Slide 16: Annex A 93 controls overview
const svg16 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">Annex A — 93の情報セキュリティ管理策（2022年版）</text>
${[
	[
		30,
		50,
		"第5節 組織的管理策",
		"37項目",
		"5.1〜5.37",
		A1,
		"方針・役割・資産・サプライヤー\nインシデント・法令コンプライアンス",
	],
	[
		410,
		50,
		"第6節 人的管理策",
		"8項目",
		"6.1〜6.8",
		A2,
		"採用・教育・責任・テレワーク\n懲戒・退職プロセス",
	],
	[
		30,
		200,
		"第7節 物理的管理策",
		"14項目",
		"7.1〜7.14",
		GRN,
		"入退室管理・機器保護・クリアデスク\nケーブル・機器廃棄",
	],
	[
		410,
		200,
		"第8節 技術的管理策",
		"34項目",
		"8.1〜8.34",
		BLU,
		"アクセス管理・暗号化・マルウェア対策\nネットワーク・ログ・開発・クラウド",
	],
]
	.map(
		([
			x,
			y,
			title,
			count,
			range,
			c,
			desc,
		]) => `<rect x="${x}" y="${y}" width="360" height="130" rx="8" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 180}" y="${Number(y) + 24}" font-size="13" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
<text x="${Number(x) + 180}" y="${Number(y) + 44}" font-size="20" fill="${A1}" text-anchor="middle" font-weight="bold">${count}</text>
<text x="${Number(x) + 180}" y="${Number(y) + 62}" font-size="10" fill="#aaa" text-anchor="middle">${range}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 180}" y="${Number(y) + 82 + li * 17}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<rect x="150" y="345" width="500" height="28" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="364" font-size="11" fill="${A1}" text-anchor="middle">2013年版(114項目)から統合・再編。新設11項目（脅威インテリジェンス等）</text>`,
	380,
);

// Slide 17: Risk management chapter header
const svg17 = w(
	`<rect width="800" height="350" fill="${BG}"/>
<text x="400" y="35" font-size="18" fill="${A1}" text-anchor="middle" font-weight="bold">第3章 リスクマネジメント — ISO/IEC 27005:2022</text>
<rect x="100" y="60" width="600" height="50" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="82" font-size="13" fill="${TXT}" text-anchor="middle">ISO/IEC 27005:2022 = ISMSのリスクマネジメント専門ガイドライン</text>
<text x="400" y="100" font-size="11" fill="#aaa" text-anchor="middle">（ISO/IEC 27001 箇条6.1・8.2・8.3の実践的解説）</text>
${[
	[50, 130, "コンテキスト\n確立", "スコープ・基準・\n責任の明確化", "①"],
	[200, 130, "リスク\nアセスメント", "特定→分析\n→評価", "②"],
	[350, 130, "リスク\n対応", "4つの選択肢\nから決定", "③"],
	[500, 130, "リスク受容", "残留リスクを\nトップが承認", "④"],
	[650, 130, "モニタリング\n・レビュー", "定期的な\n見直し", "⑤"],
]
	.map(([x, y, label, desc, num], i) => {
		const nx = Number(x),
			ny = Number(y);
		const arrow =
			i < 4
				? `<polygon points="${nx + 145},${ny + 38} ${nx + 155},${ny + 33} ${nx + 155},${ny + 43}" fill="${A1}"/>
<line x1="${nx + 140}" y1="${ny + 38}" x2="${nx + 155}" y2="${ny + 38}" stroke="${A1}" stroke-width="2"/>`
				: "";
		return `<rect x="${nx}" y="${ny}" width="140" height="75" rx="8" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="${nx + 70}" y="${ny + 18}" font-size="14" fill="${A1}" text-anchor="middle" font-weight="bold">${num}</text>
${String(label)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${nx + 70}" y="${ny + 34 + li * 14}" font-size="11" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${nx + 70}" y="${ny + 58 + li * 12}" font-size="9" fill="#aaa" text-anchor="middle">${l}</text>`,
	)
	.join("")}
${arrow}`;
	})
	.join("")}
<text x="400" y="240" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">リスクマネジメントの2つのアプローチ</text>
${[
	[
		80,
		255,
		"シナリオベース\nアプローチ",
		"脅威シナリオを定義し\nリスクを特定する方法\n（規模が小さい組織向け）",
		BLU,
	],
	[
		420,
		255,
		"資産ベース\nアプローチ",
		"資産→脅威→脆弱性の\nチェーンでリスク特定\n（従来の一般的な方法）",
		GRN,
	],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="300" height="85" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 150}" y="${Number(y) + 20}" font-size="12" fill="${c}" text-anchor="middle" font-weight="bold">${String(title).replace("\n", " ")}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 150}" y="${Number(y) + 38 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	350,
);

// Slide 19: Asset identification
const svg19 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">資産の特定と評価</text>
<rect x="30" y="45" width="740" height="35" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="68" font-size="12" fill="${TXT}" text-anchor="middle">情報資産 = ISMSスコープ内で価値を持つすべての情報・情報システム・関連資産</text>
<text x="110" y="108" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">一次情報資産</text>
<text x="590" y="108" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">支援情報資産（一次資産を支える）</text>
${[
	[30, 118, "顧客データ・個人情報", A1],
	[30, 143, "財務情報・予算計画", A1],
	[30, 168, "知的財産・設計書", A1],
	[30, 193, "契約書・法的文書", A1],
	[210, 118, "ソースコード", A1],
	[210, 143, "研究開発データ", A1],
	[210, 168, "業務プロセス", A1],
	[210, 193, "従業員情報", A1],
]
	.map(
		([
			x,
			y,
			t,
			c,
		]) => `<rect x="${x}" y="${Number(y) - 14}" width="175" height="22" rx="3" fill="${BOX}"/>
<text x="${Number(x) + 88}" y="${y}" font-size="10" fill="${c}" text-anchor="middle">${t}</text>`,
	)
	.join("")}
${[
	[420, 118, "サーバ・クラウド", A2],
	[420, 143, "ネットワーク機器", A2],
	[420, 168, "エンドポイント", A2],
	[420, 193, "ストレージ・バックアップ", A2],
	[610, 118, "OS・ミドルウェア", A2],
	[610, 143, "業務アプリケーション", A2],
	[610, 168, "通信回線", A2],
	[610, 193, "人（スキル・知識）", A2],
]
	.map(
		([
			x,
			y,
			t,
			c,
		]) => `<rect x="${x}" y="${Number(y) - 14}" width="175" height="22" rx="3" fill="${BOX}"/>
<text x="${Number(x) + 88}" y="${y}" font-size="10" fill="${c}" text-anchor="middle">${t}</text>`,
	)
	.join("")}
<line x1="395" y1="95" x2="395" y2="215" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
<text x="400" y="240" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">資産評価の3軸（CIAベース）</text>
${[
	[
		50,
		255,
		"機密性\n(Confidentiality)",
		"不正アクセスから\n保護する必要性",
		A1,
	],
	[270, 255, "完全性\n(Integrity)", "改ざん・誤りから\n保護する必要性", A2],
	[490, 255, "可用性\n(Availability)", "必要な時に使える\n必要性", GRN],
	[650, 255, "評価スケール", "1〜3 or 1〜5\nで定量化する", BLU],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="155" height="90" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 77}" y="${Number(y) + 20 + li * 14}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 77}" y="${Number(y) + 53 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 20: Threat/vulnerability analysis
const svg20 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">脅威・脆弱性の分析</text>
<text x="200" y="58" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">脅威の分類</text>
<text x="590" y="58" font-size="13" fill="${BLU}" text-anchor="middle" font-weight="bold">脆弱性の分類</text>
<line x1="400" y1="45" x2="400" y2="220" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
${[
	[
		30,
		70,
		"意図的脅威",
		"不正アクセス・ランサムウェア\n標的型攻撃・内部不正・盗難",
		A2,
	],
	[30, 145, "偶発的脅威", "誤操作・誤送信・\nシステム障害・紛失", ORG],
	[30, 220, "環境的脅威", "自然災害（地震・洪水）\n停電・建物損傷", GRN],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="360" height="65" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="50" y="${Number(y) + 19}" font-size="11" fill="${c}" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="50" y="${Number(y) + 36 + li * 16}" font-size="10" fill="${TXT}">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
${[
	[410, 70, "技術的脆弱性", "パッチ未適用・設定ミス\n弱い認証・暗号化不備", A2],
	[410, 145, "組織的脆弱性", "教育不足・手順書なし\nアクセス権過剰付与", ORG],
	[410, 220, "物理的脆弱性", "入退室管理の不備\n機器の不適切な廃棄", GRN],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="360" height="65" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="430" y="${Number(y) + 19}" font-size="11" fill="${c}" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="430" y="${Number(y) + 36 + li * 16}" font-size="10" fill="${TXT}">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<text x="400" y="310" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">リスク = 脅威 × 脆弱性 × 資産価値</text>
<rect x="100" y="322" width="600" height="48" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="342" font-size="11" fill="${TXT}" text-anchor="middle">情報入手先: NIST NVD・JVN（脆弱性DB）・ENISA・IPA・ISACコミュニティ</text>
<text x="400" y="360" font-size="11" fill="${TXT}" text-anchor="middle">脅威インテリジェンス（Annex A 5.7 新設）= 外部情報の継続的収集・分析・活用</text>`,
	380,
);

// Slide 23: SoA (Statement of Applicability)
const svg23 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">適用宣言書（SoA）— Annex A 93管理策の適用判断</text>
<rect x="30" y="45" width="740" height="40" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="62" font-size="12" fill="${TXT}" text-anchor="middle">SoA = 全93管理策に対し「適用/除外」と理由・実施状況を記録した必須文書</text>
<text x="400" y="78" font-size="11" fill="#aaa" text-anchor="middle">（ISO/IEC 27001 箇条6.1.3 d) で明示要求）</text>
<text x="60" y="113" font-size="13" fill="${A1}" text-anchor="middle">管理策</text>
<text x="200" y="113" font-size="13" fill="${A1}" text-anchor="middle">適用</text>
<text x="320" y="113" font-size="13" fill="${A1}" text-anchor="middle">適用理由</text>
<text x="510" y="113" font-size="13" fill="${A1}" text-anchor="middle">実施状況</text>
<text x="680" y="113" font-size="13" fill="${A1}" text-anchor="middle">除外理由</text>
<line x1="30" y1="118" x2="770" y2="118" stroke="#555" stroke-width="1"/>
${[
	["5.1 情報セキュリティ方針", "✓", "法令要件・リスク対応", "完全実施", "—"],
	["8.24 暗号の使用", "✓", "顧客データ保護", "一部実施", "—"],
	[
		"7.4 物理的セキュリティ監視",
		"✗",
		"—",
		"—",
		"全社員がセキュリティ区域\nなし（オフィスのみ）",
	],
	["8.12 データ漏えい防止", "✓", "個人情報保護法対応", "計画中", "—"],
]
	.map(([ctrl, apply, reason, status, exclude], i) => {
		const y = 130 + i * 45;
		const bg = i % 2 === 0 ? "#0d0d1a" : BOX;
		return `<rect x="30" y="${y}" width="740" height="38" fill="${bg}"/>
<text x="60" y="${y + 20}" font-size="9.5" fill="${TXT}">${ctrl}</text>
<text x="200" y="${y + 20}" font-size="13" fill="${apply === "✓" ? GRN : A2}" text-anchor="middle">${apply}</text>
<text x="320" y="${y + 20}" font-size="9" fill="${TXT}" text-anchor="middle">${reason}</text>
<text x="510" y="${y + 20}" font-size="9" fill="${status === "完全実施" ? GRN : status === "計画中" ? A1 : TXT}" text-anchor="middle">${status}</text>
${String(exclude)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="680" y="${y + 14 + li * 14}" font-size="8" fill="#aaa" text-anchor="middle">${l}</text>`,
	)
	.join("")}`;
	})
	.join("")}
<rect x="30" y="315" width="740" height="55" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="1"/>
<text x="400" y="338" font-size="12" fill="${GRN}" text-anchor="middle" font-weight="bold">SoA作成のポイント</text>
<text x="400" y="356" font-size="11" fill="${TXT}" text-anchor="middle">除外は合理的理由が必要 / リスクアセスメント結果と紐付け / 年次レビュー・更新が必須</text>
<text x="400" y="372" font-size="11" fill="${TXT}" text-anchor="middle">認証審査で必ず確認される最重要文書 — 形式より実態との一致が重要</text>`,
	380,
);

// Slide 26: Annex A 4 categories
const svg26 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">Annex A 管理策の4カテゴリ構造（2022年版）</text>
${[
	[
		30,
		50,
		"第5節 組織的管理策",
		"37項目",
		A1,
		[
			"5.1〜5.5: 方針・役割",
			"5.6〜5.12: 資産・情報分類",
			"5.13〜5.18: アクセス・供給者",
			"5.19〜5.22: サプライヤー",
			"5.23〜5.28: クラウド・インシデント",
			"5.29〜5.37: BCP・法令・監査",
		],
	],
	[
		410,
		50,
		"第6節 人的管理策",
		"8項目",
		A2,
		[
			"6.1: 選考（採用前）",
			"6.2: 雇用条件・責任",
			"6.3: 情報セキュリティ啓発",
			"6.4: 懲戒プロセス",
			"6.5: 退職後の責任",
			"6.6〜6.8: 守秘義務・テレワーク",
		],
	],
	[
		30,
		225,
		"第7節 物理的管理策",
		"14項目",
		GRN,
		[
			"7.1〜7.4: 入退室・セキュリティ区域",
			"7.5〜7.8: デスク・スクリーン・機器",
			"7.9〜7.11: 持込/持出・保全",
			"7.12〜7.14: ケーブル・廃棄・監視",
		],
	],
	[
		410,
		225,
		"第8節 技術的管理策",
		"34項目",
		BLU,
		[
			"8.1〜8.6: エンドポイント・アクセス",
			"8.7〜8.13: マルウェア・バックアップ",
			"8.14〜8.20: ネットワーク・Web",
			"8.21〜8.34: 暗号・開発・脆弱性・クラウド",
		],
	],
]
	.map(
		([
			x,
			y,
			title,
			count,
			c,
			items,
		]) => `<rect x="${x}" y="${y}" width="360" height="155" rx="8" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 180}" y="${Number(y) + 22}" font-size="12" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
<text x="${Number(x) + 180}" y="${Number(y) + 40}" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">${count}</text>
${(items as string[]).map((item, i) => `<text x="${Number(x) + 20}" y="${Number(y) + 60 + i * 16}" font-size="9" fill="${TXT}">${item}</text>`).join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 27: Organizational controls (Annex A 5)
const svg27 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">組織的管理策（Annex A 5）— 主要項目と新設管理策</text>
<rect x="30" y="45" width="740" height="30" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="65" font-size="11" fill="${TXT}" text-anchor="middle">37項目（5.1〜5.37）— 2022年版で最も管理策数が多いカテゴリ</text>
<text x="90" y="100" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">新設管理策（2022年版）</text>
${[
	["5.7 脅威インテリジェンス", "脅威情報の収集・分析・活用"],
	["5.23 クラウドセキュリティ", "クラウドサービスの情報セキュリティ"],
	["5.30 事業継続のためのICT対応", "中断・障害時のICT継続性"],
]
	.map(
		(
			[k, v],
			i,
		) => `<rect x="30" y="${110 + i * 32}" width="740" height="26" rx="4" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="50" y="${128 + i * 32}" font-size="11" fill="${A2}" font-weight="bold">${k}</text>
<text x="300" y="${128 + i * 32}" font-size="10" fill="${TXT}">${v}</text>`,
	)
	.join("")}
<text x="120" y="220" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">重要管理策</text>
${[
	["5.1 情報セキュリティ方針", "経営者が承認・全員に伝達・定期見直し"],
	["5.9 情報・関連資産のインベントリ", "資産台帳の維持・所有者の割り当て"],
	["5.19 サプライヤー関係の情報セキュリティ", "委託契約への要件明記"],
	["5.24 インシデント管理の計画・準備", "対応手順・報告体制の整備"],
	["5.34 プライバシーとPII保護", "個人情報保護法との整合"],
]
	.map(
		(
			[k, v],
			i,
		) => `<rect x="30" y="${228 + i * 28}" width="740" height="22" rx="3" fill="${i % 2 ? BOX : "#0d0d1a"}"/>
<text x="50" y="${244 + i * 28}" font-size="10" fill="${A1}" font-weight="bold">${k}</text>
<text x="340" y="${244 + i * 28}" font-size="10" fill="${TXT}">${v}</text>`,
	)
	.join("")}`,
	380,
);

// Slide 28: Human controls (Annex A 6)
const svg28 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">人的管理策（Annex A 6）— ライフサイクル管理</text>
${[
	[
		30,
		50,
		"採用前",
		"Before",
		GRN,
		[
			"6.1 選考（スクリーニング）",
			"  身元確認・犯歴確認・学歴確認",
			"  役割に応じた深度で実施",
		],
	],
	[
		210,
		50,
		"雇用中",
		"During",
		A1,
		[
			"6.2 雇用条件",
			"  守秘義務・セキュリティ責任を契約に明記",
			"6.3 情報セキュリティ啓発・教育・訓練",
			"  年1回以上の研修・記録の保管",
		],
	],
	[
		500,
		50,
		"退職・異動",
		"After",
		A2,
		[
			"6.5 退職・変更後の責任",
			"  機密保持の継続義務",
			"6.6 守秘義務または秘密保持契約",
			"  退職時に再署名",
		],
	],
]
	.map(
		([
			x,
			y,
			title,
			sub,
			c,
			items,
		]) => `<rect x="${x}" y="${y}" width="${title === "雇用中" ? 280 : 170}" height="180" rx="8" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + (title === "雇用中" ? 140 : 85)}" y="${Number(y) + 22}" font-size="12" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
<text x="${Number(x) + (title === "雇用中" ? 140 : 85)}" y="${Number(y) + 38}" font-size="10" fill="#aaa" text-anchor="middle">${sub}</text>
${(items as string[]).map((item, i) => `<text x="${Number(x) + 12}" y="${Number(y) + 58 + i * 17}" font-size="9.5" fill="${TXT}">${item}</text>`).join("")}`,
	)
	.join("")}
<polygon points="195,135 210,130 210,140" fill="${A1}"/>
<line x1="200" y1="135" x2="210" y2="135" stroke="${A1}" stroke-width="2"/>
<polygon points="485,135 498,130 498,140" fill="${A1}"/>
<line x1="490" y1="135" x2="498" y2="135" stroke="${A1}" stroke-width="2"/>
<text x="400" y="262" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">新設: 6.7 リモートワーク / 6.8 情報セキュリティ事象の報告</text>
${[
	[
		30,
		275,
		"6.7 リモートワーク",
		"テレワーク環境のセキュリティ要件\n（端末管理・VPN・画面覗き見対策）",
		BLU,
	],
	[
		420,
		275,
		"6.8 情報セキュリティ事象の報告",
		"インシデントの迅速な報告体制\n（報告チャネル・報告義務の周知）",
		ORG,
	],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="380" height="80" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="${Number(x) + 190}" y="${Number(y) + 20}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 190}" y="${Number(y) + 38 + li * 17}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 29: Physical controls (Annex A 7)
const svg29 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">物理的管理策（Annex A 7）— 多層防御</text>
<rect x="280" y="45" width="240" height="35" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="400" y="68" font-size="12" fill="${TXT}" text-anchor="middle">外部（建物・敷地境界）</text>
<rect x="200" y="88" width="400" height="35" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="111" font-size="12" fill="${TXT}" text-anchor="middle">入館管理（受付・ICカード）</text>
<rect x="150" y="131" width="500" height="35" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="400" y="154" font-size="12" fill="${TXT}" text-anchor="middle">オフィスフロア（クリアデスク・スクリーンロック）</text>
<rect x="100" y="174" width="600" height="35" rx="6" fill="${BOX}" stroke="${BLU}" stroke-width="2"/>
<text x="400" y="197" font-size="12" fill="${TXT}" text-anchor="middle">サーバ室・機密区域（生体認証・2人規則・CCTV）</text>
<rect x="50" y="217" width="700" height="35" rx="6" fill="${BOX}" stroke="${ORG}" stroke-width="2"/>
<text x="400" y="240" font-size="12" fill="${TXT}" text-anchor="middle">機器・媒体（施錠・ケーブルロック・暗号化ストレージ）</text>
<text x="400" y="285" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">主要管理策のポイント</text>
${[
	[30, 295, "7.1 物理的境界", "サーバ室の壁・施錠扉\n窓・天井・床も対象"],
	[
		215,
		295,
		"7.6 セキュリティ区域\nでの作業",
		"一人作業禁止\n訪問者の常時同行",
	],
	[400, 295, "7.9 構外の資産", "ノートPC・スマホの\n持ち出し記録・暗号化"],
	[
		585,
		295,
		"7.14 機器の安全な廃棄\n・転用",
		"データ消去証明\n物理破壊または上書き",
	],
]
	.map(
		([
			x,
			y,
			title,
			desc,
		]) => `<rect x="${x}" y="${y}" width="175" height="80" rx="5" fill="${BOX}"/>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 87}" y="${Number(y) + 18 + li * 14}" font-size="9.5" fill="${A1}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 87}" y="${Number(y) + 50 + li * 16}" font-size="9" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 30: Technical controls overview (Annex A 8)
const svg30 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">技術的管理策（Annex A 8）— 34項目の全体像</text>
${[
	[
		30,
		45,
		"アクセス管理\n(8.2〜8.6)",
		BLU,
		"特権アクセス・認証・最小権限\n情報アクセス制限・ソースコード",
	],
	[
		240,
		45,
		"マルウェア・変更管理\n(8.7〜8.9)",
		A2,
		"マルウェア対策・設定管理\n変更管理プロセス",
	],
	[
		450,
		45,
		"情報削除・ログ\n(8.10〜8.16)",
		ORG,
		"ストレージ・ログ記録\n監視・特権ユーティリティ",
	],
	[
		660,
		45,
		"脆弱性管理\n(8.17〜8.20)",
		A1,
		"脆弱性管理・監査ログ\nWebフィルタリング・ネットワーク",
	],
	[
		30,
		195,
		"暗号・開発\n(8.21〜8.28)",
		GRN,
		"暗号化・PKI・セキュアな\n開発・テスト・バックアップ",
	],
	[
		240,
		195,
		"クラウドセキュリティ\n(8.23〜8.25)",
		BLU,
		"クラウド利用制御\nインターネット露出・フィルタ",
	],
	[
		450,
		195,
		"情報システム監査\n(8.33〜8.34)",
		ORG,
		"監査ツールの保護\nシステム監査への影響排除",
	],
	[
		660,
		195,
		"新設管理策",
		A2,
		"8.9 構成管理\n8.10 情報の削除\n8.11 データマスキング\n8.12 データ漏えい防止\n8.16 監視活動 など",
	],
]
	.map(
		([
			x,
			y,
			title,
			c,
			desc,
		]) => `<rect x="${x}" y="${y}" width="200" height="140" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 100}" y="${Number(y) + 18 + li * 14}" font-size="9.5" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 100}" y="${Number(y) + 52 + li * 16}" font-size="9" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 31: Access control and authentication
const svg31 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">アクセス管理と認証（Annex A 8.2〜8.6）</text>
${[
	[
		30,
		45,
		"8.2 特権アクセス権の管理",
		A2,
		[
			"原則: Just-in-Time 権限（使用時のみ付与）",
			"特権アカウントの申請・承認フロー",
			"四半期ごとのレビュー・棚卸し",
			"PAM（特権アクセス管理）ツールの活用",
		],
	],
	[
		410,
		45,
		"8.3 情報アクセス制限",
		BLU,
		[
			"Need-to-Know原則（必要最小限）",
			"情報分類に基づくアクセス制御",
			"RBAC/ABAC（役割/属性ベース）",
			"データオーナーによる定期レビュー",
		],
	],
	[
		30,
		200,
		"8.5 セキュアな認証",
		GRN,
		[
			"多要素認証（MFA）の適用範囲",
			"特権アカウント: 必須",
			"外部アクセス（VPN・クラウド）: 必須",
			"パスワードポリシー: 複雑性より長さ優先",
		],
	],
	[
		410,
		200,
		"8.6 容量・能力管理",
		A1,
		[
			"ストレージ・CPU・帯域の監視",
			"閾値アラート設定",
			"容量計画（6〜12ヶ月先見通し）",
			"DDoS対策（WAF・CDN）",
		],
	],
]
	.map(
		([
			x,
			y,
			title,
			c,
			items,
		]) => `<rect x="${x}" y="${y}" width="360" height="155" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 180}" y="${Number(y) + 20}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${(items as string[]).map((item, i) => `<text x="${Number(x) + 20}" y="${Number(y) + 40 + i * 22}" font-size="10" fill="${TXT}">${item}</text>`).join("")}`,
	)
	.join("")}
<rect x="30" y="370" width="740" height="0" rx="0" fill="none"/>`,
	380,
);

// Slide 32: Encryption and data protection
const svg32 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">暗号化とデータ保護（Annex A 8.24）</text>
<text x="200" y="58" font-size="13" fill="${A2}" text-anchor="middle" font-weight="bold">禁止アルゴリズム</text>
<text x="590" y="58" font-size="13" fill="${GRN}" text-anchor="middle" font-weight="bold">推奨アルゴリズム</text>
<line x1="400" y1="45" x2="400" y2="175" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
${[
	["MD5", 50],
	["SHA-1", 130],
	["DES/3DES", 210],
	["RC4", 290],
]
	.map(
		([name, x]) =>
			`<rect x="${x}" y="68" width="75" height="28" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="2"/>
<text x="${Number(x) + 37}" y="87" font-size="11" fill="${A2}" text-anchor="middle">${name}</text>`,
	)
	.join("")}
${[
	["AES-256", 415],
	["ChaCha20", 505],
	["SHA-256/512", 595],
	["RSA-2048+", 685],
]
	.map(
		([name, x]) =>
			`<rect x="${x}" y="68" width="85" height="28" rx="5" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="${Number(x) + 42}" y="87" font-size="10" fill="${GRN}" text-anchor="middle">${name}</text>`,
	)
	.join("")}
${[
	["ECDSA P-256", 415],
	["Ed25519", 505],
	["TLS 1.2/1.3", 595],
	["bcrypt/scrypt", 685],
]
	.map(
		([name, x]) =>
			`<rect x="${x}" y="100" width="85" height="28" rx="5" fill="${BOX}" stroke="${GRN}" stroke-width="2"/>
<text x="${Number(x) + 42}" y="119" font-size="10" fill="${GRN}" text-anchor="middle">${name}</text>`,
	)
	.join("")}
<text x="400" y="200" font-size="13" fill="${A1}" text-anchor="middle" font-weight="bold">暗号ポリシーの必須要素</text>
${[
	[30, 215, "鍵管理", "鍵の生成・配布・\n保管・廃棄・更新周期", BLU],
	[220, 215, "適用範囲", "保存データ・通信データ\n・バックアップ", A1],
	[410, 215, "アルゴリズム\n承認リスト", "禁止/推奨を明文化\n年次見直し", GRN],
	[600, 215, "コンプライアンス", "輸出規制・\n法域ごとの制約", ORG],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="170" height="90" rx="6" fill="${BOX}" stroke="${c}" stroke-width="1"/>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 85}" y="${Number(y) + 20 + li * 14}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 85}" y="${Number(y) + 50 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<rect x="30" y="320" width="740" height="50" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="343" font-size="11" fill="${TXT}" text-anchor="middle">HSM（ハードウェアセキュリティモジュール）: 鍵の安全な保管 / 量子コンピュータ対策（PQC）への移行計画も検討</text>
<text x="400" y="361" font-size="11" fill="${TXT}" text-anchor="middle">TLS 1.0/1.1は廃止 / 証明書の自動更新（Let's Encrypt・ACM）で管理負担を軽減</text>`,
	380,
);

// Slide 37: Stage 1 audit
const svg37 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">Stage 1 審査（文書審査）— 重点確認事項</text>
<rect x="30" y="45" width="740" height="30" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="66" font-size="11" fill="${TXT}" text-anchor="middle">目的: ISMSの設計が適切で Stage 2 に進める準備ができているか確認（通常1〜2日）</text>
<text x="90" y="98" font-size="12" fill="${A1}" text-anchor="middle">確認項目</text>
<text x="550" y="98" font-size="12" fill="${A1}" text-anchor="middle">審査官が確認すること</text>
<line x1="30" y1="104" x2="770" y2="104" stroke="#444" stroke-width="1"/>
${[
	["スコープ文書", "組織の境界・除外範囲・根拠が明確に記載されているか"],
	["情報セキュリティ方針", "経営者が署名・承認し、全員に伝達されているか"],
	["リスクアセスメント文書", "方法論が文書化され、全資産がカバーされているか"],
	["SoA（適用宣言書）", "全93管理策の適用/除外と理由が記載されているか"],
	["リスク対応計画", "優先度・担当者・期限が明記され、承認されているか"],
	["内部監査記録", "スコープ全体を網羅した監査が実施されているか"],
	["マネジメントレビュー記録", "インプット・アウトプット要件を満たしているか"],
]
	.map(
		(
			[item, check],
			i,
		) => `<rect x="30" y="${112 + i * 32}" width="740" height="26" rx="3" fill="${i % 2 ? BOX : "#0d0d1a"}"/>
<text x="50" y="${130 + i * 32}" font-size="10" fill="${A1}" font-weight="bold">${item}</text>
<text x="220" y="${130 + i * 32}" font-size="9.5" fill="${TXT}">${check}</text>`,
	)
	.join("")}
<rect x="30" y="345" width="740" height="28" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="400" y="364" font-size="11" fill="${A2}" text-anchor="middle">Stage 1 で重大な不備 → Stage 2 延期。文書を「整備」してから臨むこと</text>`,
	380,
);

// Slide 38: Stage 2 audit
const svg38 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">Stage 2 審査（現地審査）— 重点確認事項</text>
<rect x="30" y="45" width="740" height="30" rx="5" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="400" y="66" font-size="11" fill="${TXT}" text-anchor="middle">目的: 管理策が文書通りに実施され、有効に機能しているか証拠で確認（通常2〜4日）</text>
<text x="200" y="100" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">審査の3本柱</text>
${[
	[
		30,
		110,
		"①インタビュー",
		"「どうやってますか？」\n「見せてもらえますか？」\n担当者の実態確認",
		A2,
	],
	[
		290,
		110,
		"②文書・記録の確認",
		"手順書どおりの実施証跡\nログ・承認記録\n研修完了証明",
		A1,
	],
	[
		550,
		110,
		"③現地確認",
		"サーバ室の入退室\nPC画面・施錠状況\n実際の運用状況",
		GRN,
	],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="240" height="120" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 120}" y="${Number(y) + 22}" font-size="12" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 120}" y="${Number(y) + 44 + li * 18}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}
<text x="400" y="260" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">不適合の分類</text>
${[
	[30, 272, "重大な不適合\n(Major)", "認証取得不可\nまたは取消し", A2],
	[225, 272, "軽微な不適合\n(Minor)", "指定期間内に\n是正必要", ORG],
	[420, 272, "観察事項\n(Observation)", "改善推奨\n（義務なし）", A1],
	[620, 272, "適合所見\n(Conformity)", "うまくいっている\n好事例", GRN],
]
	.map(
		([
			x,
			y,
			title,
			desc,
			c,
		]) => `<rect x="${x}" y="${y}" width="175" height="85" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 87}" y="${Number(y) + 20 + li * 14}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${l}</text>`,
	)
	.join("")}
${String(desc)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${Number(x) + 87}" y="${Number(y) + 50 + li * 16}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}`,
	)
	.join("")}`,
	380,
);

// Slide 39: Common nonconformities 1
const svg39 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A2}" text-anchor="middle" font-weight="bold">よくある不適合① — リスクマネジメント</text>
${[
	[
		"不適合1: 方法論の文書化不備",
		"リスクアセスメントの方法論が文書化されておらず、誰が実施しても同じ結果にならない",
		"→ リスクアセスメント手順書を作成し、評価基準・スコア計算式を明文化する",
	],
	[
		"不適合2: スコープの漏れ",
		"クラウドサービス・テレワーク・サプライヤーがスコープから除外されている",
		"→ スコープ文書を見直し、除外する場合は合理的根拠を記載する",
	],
	[
		"不適合3: 更新の不実施",
		"リスクアセスメントが初回のみで年次更新されていない（新しいサービス・変更未反映）",
		"→ トリガーベースの見直し（重大変更時）＋年次定期レビューの両方を実施",
	],
	[
		"不適合4: 残留リスクの未承認",
		"リスク対応後の残留リスクをトップマネジメントが承認していない記録がない",
		"→ マネジメントレビュー議事録に残留リスク承認を明記する",
	],
]
	.map(
		(
			[title, problem, fix],
			i,
		) => `<rect x="30" y="${45 + i * 82}" width="740" height="75" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="50" y="${64 + i * 82}" font-size="11" fill="${A2}" font-weight="bold">${title}</text>
<text x="50" y="${82 + i * 82}" font-size="9.5" fill="#ccc">${problem}</text>
<text x="50" y="${100 + i * 82}" font-size="9.5" fill="${GRN}" font-weight="bold">${fix}</text>`,
	)
	.join("")}`,
	380,
);

// Slide 40: Common nonconformities 2
const svg40 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A2}" text-anchor="middle" font-weight="bold">よくある不適合② — 管理策の実施</text>
${[
	[
		"不適合1: SoAと実態の乖離",
		"SoAに「実施済み」と記載しているが、実際の運用証跡が存在しない（形骸化）",
		"→ 各管理策に対応する証跡（ログ・記録・承認書）の体系的な管理を徹底",
	],
	[
		"不適合2: アクセス権棚卸しの未実施",
		"アクセス権の定期棚卸しが実施されていない、または退職者のアカウントが残留",
		"→ 四半期ごとのアクセス権レビューと退職手続きチェックリストを整備",
	],
	[
		"不適合3: インシデント記録の不備",
		"セキュリティインシデントが記録されていない、または根本原因分析が行われていない",
		"→ インシデント管理手順書と記録テンプレートを整備し、全件記録を義務化",
	],
	[
		"不適合4: サプライヤー管理の不備",
		"委託先との契約にセキュリティ要件が含まれていない、または年次評価が未実施",
		"→ 契約書テンプレートにISMS要件を追加し、年次評価プロセスを確立",
	],
]
	.map(
		(
			[title, problem, fix],
			i,
		) => `<rect x="30" y="${45 + i * 82}" width="740" height="75" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="50" y="${64 + i * 82}" font-size="11" fill="${A2}" font-weight="bold">${title}</text>
<text x="50" y="${82 + i * 82}" font-size="9.5" fill="#ccc">${problem}</text>
<text x="50" y="${100 + i * 82}" font-size="9.5" fill="${GRN}" font-weight="bold">${fix}</text>`,
	)
	.join("")}`,
	380,
);

// Slide 41: Common nonconformities 3
const svg41 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A2}" text-anchor="middle" font-weight="bold">よくある不適合③ — 教育・文書管理</text>
${[
	[
		"不適合1: 教育記録の不備",
		"情報セキュリティ教育を受けていない従業員が多数存在（記録確認で判明）",
		"→ LMS（学習管理システム）等で受講状況を一元管理し、未受講者に督促",
	],
	[
		"不適合2: 文書の陳腐化",
		"方針・手順書の最終改訂が3年以上前で、現在の技術・法令・リスクに対応できていない",
		"→ 年次文書レビューをカレンダーに設定し、オーナーに通知・更新義務化",
	],
	[
		"不適合3: 版管理の不備",
		"複数バージョンの手順書が並存し、従業員が最新版を把握できていない",
		"→ 文書管理システム（DMS）で版管理・公開管理を一元化",
	],
	[
		"不適合4: 内部監査の形骸化",
		"内部監査が毎年同じ部門しかカバーしておらず、全スコープを網羅していない",
		"→ 3年間で全スコープをカバーする内部監査計画を策定し、力量ある監査員を確保",
	],
]
	.map(
		(
			[title, problem, fix],
			i,
		) => `<rect x="30" y="${45 + i * 82}" width="740" height="75" rx="6" fill="${BOX}" stroke="${A2}" stroke-width="1"/>
<text x="50" y="${64 + i * 82}" font-size="11" fill="${A2}" font-weight="bold">${title}</text>
<text x="50" y="${82 + i * 82}" font-size="9.5" fill="#ccc">${problem}</text>
<text x="50" y="${100 + i * 82}" font-size="9.5" fill="${GRN}" font-weight="bold">${fix}</text>`,
	)
	.join("")}`,
	380,
);

const svgMap: Record<number, string> = {
	6: svg6,
	8: svg8,
	9: svg9,
	11: svg11,
	12: svg12,
	13: svg13,
	14: svg14,
	15: svg15,
	16: svg16,
	17: svg17,
	19: svg19,
	20: svg20,
	23: svg23,
	26: svg26,
	27: svg27,
	28: svg28,
	29: svg29,
	30: svg30,
	31: svg31,
	32: svg32,
	37: svg37,
	38: svg38,
	39: svg39,
	40: svg40,
	41: svg41,
};

for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[Number.parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log(
	"Done: added",
	Object.keys(svgMap).length,
	"more SVGs to isms-guide",
);
