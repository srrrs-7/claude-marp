import { readFileSync, writeFileSync } from "fs";
const path = "docs/20260219130000_mfa-isms-guide/slides-data.json";
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

// Slide 7: MFA history
const svg7 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="16" fill="${A1}" text-anchor="middle" font-weight="bold">MFAの発展史</text>
<line x1="60" y1="190" x2="740" y2="190" stroke="${A1}" stroke-width="2"/>
<polygon points="736,184 752,190 736,196" fill="${A1}"/>
${[
	[70, "1990s", "ハードウェア\nトークン", "RSA SecurID"],
	[190, "2000s", "SMS OTP", "モバイル普及"],
	[320, "2010", "TOTP\n(RFC 6238)", "Google Auth"],
	[450, "2012", "FIDO U2F", "Google主導"],
	[570, "2018", "FIDO2\nWebAuthn", "W3C標準化"],
	[680, "2022+", "Passkeys", "Apple/Google\n/Microsoft"],
]
	.map(([x, yr, title, sub], i) => {
		const nx = Number(x);
		const above = [70, 320, 570].includes(nx);
		const ty = above ? 100 : 220;
		return `<circle cx="${nx}" cy="190" r="6" fill="${A1}"/>
<line x1="${nx}" y1="${above ? 130 : 190}" x2="${nx}" y2="${above ? 190 : 220}" stroke="#555" stroke-width="1" stroke-dasharray="3"/>
<text x="${nx}" y="${ty}" font-size="9" fill="${A1}" text-anchor="middle" font-weight="bold">${yr}</text>
${String(title)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="${nx}" y="${ty + 13 + li * 12}" font-size="9" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}
<text x="${nx}" y="${ty + 13 + String(title).split("\n").length * 12 + 4}" font-size="8" fill="#aaa" text-anchor="middle">${sub}</text>`;
	})
	.join("")}
<rect x="30" y="310" width="740" height="60" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="332" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">フィッシング耐性の進化</text>
<text x="400" y="352" font-size="11" fill="${TXT}" text-anchor="middle">SMS/TOTP → フィッシングで傍受可能 → FIDO2/Passkeys → フィッシング不可能（秘密鍵はデバイスから出ない）</text>`,
	380,
);

// Slide 16: Risk-based authentication
const svg16 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">リスクベース認証（Adaptive MFA）</text>
<rect x="50" y="50" width="700" height="50" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="72" font-size="12" fill="${TXT}" text-anchor="middle">アクセス時のリスクシグナルをリアルタイム評価 → MFA要否・強度を動的に決定</text>
<text x="400" y="88" font-size="11" fill="#aaa" text-anchor="middle">ユーザー体験を損なわず、高リスク時のみ追加認証を要求</text>
<text x="200" y="125" font-size="12" fill="${BLU}" text-anchor="middle" font-weight="bold">リスクシグナル</text>
<text x="590" y="125" font-size="12" fill="${A2}" text-anchor="middle" font-weight="bold">判定結果</text>
<line x1="390" y1="110" x2="390" y2="300" stroke="#444" stroke-width="1" stroke-dasharray="4"/>
${[
	[50, 135, BLU, "デバイス情報", "登録済み/新規/管理対象外"],
	[50, 175, BLU, "場所・IPアドレス", "通常の場所/海外/Tor"],
	[50, 215, BLU, "時刻・行動", "業務時間内/深夜/異常なパターン"],
	[50, 255, BLU, "リソース機密度", "一般/機密/財務/顧客情報"],
]
	.map(
		([
			x,
			y,
			c,
			title,
			desc,
		]) => `<rect x="${x}" y="${y}" width="330" height="30" rx="4" fill="${BOX}" stroke="${c}" stroke-width="1"/>
<text x="${Number(x) + 10}" y="${Number(y) + 20}" font-size="10" fill="${c}" font-weight="bold">${title}</text>
<text x="${Number(x) + 140}" y="${Number(y) + 20}" font-size="10" fill="${TXT}">${desc}</text>`,
	)
	.join("")}
${[
	[410, 135, GRN, "リスク低", "MFA不要 → 直接アクセス許可"],
	[410, 175, A1, "リスク中", "TOTP/Push通知 → 認証後許可"],
	[410, 215, A2, "リスク高", "FIDO2必須 → 管理者承認"],
	[410, 255, "#880000", "ブロック", "アクセス拒否 → 調査"],
]
	.map(
		([
			x,
			y,
			c,
			level,
			action,
		]) => `<rect x="${x}" y="${y}" width="340" height="30" rx="4" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 10}" y="${Number(y) + 20}" font-size="11" fill="${c}" font-weight="bold">${level}</text>
<text x="${Number(x) + 100}" y="${Number(y) + 20}" font-size="10" fill="${TXT}">${action}</text>`,
	)
	.join("")}
<rect x="30" y="305" width="740" height="60" rx="6" fill="${BOX}" stroke="${GRN}" stroke-width="1"/>
<text x="400" y="326" font-size="12" fill="${GRN}" text-anchor="middle" font-weight="bold">主要製品: Microsoft Entra ID (Conditional Access) / Okta Adaptive MFA / Duo Security</text>
<text x="400" y="345" font-size="11" fill="${TXT}" text-anchor="middle">機械学習でベースライン行動を学習 → 逸脱時に自動でMFA要求または接続ブロック</text>`,
	380,
);

// Slide 20: ISO 27001 access control requirements
const svg20 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">ISO 27001:2022 — アクセス制御とMFAの要求</text>
${[
	[
		30,
		50,
		"8.2 特権アクセス権の管理",
		A2,
		[
			"• 特権アカウントの払い出しは厳格な承認プロセス",
			"• 特権操作にはMFA必須（審査官が証跡を確認）",
			"• PAMツールによる操作記録・セッション録画",
		],
	],
	[
		410,
		50,
		"8.3 情報アクセス制限",
		BLU,
		[
			"• Need-to-Know: 最小権限の原則",
			"• 定期的なアクセス権レビュー（四半期推奨）",
			"• 高機密データへのアクセスはMFA強制",
		],
	],
	[
		30,
		190,
		"8.5 セキュアな認証",
		GRN,
		[
			"• 認証に関するすべての要件を文書化",
			"• MFAポリシー: 誰に・どの条件で・どの方式を",
			"• パスワードポリシーとMFAの組み合わせ方針",
		],
	],
	[
		410,
		190,
		"6.7 リモートワーク",
		A1,
		[
			"• リモートアクセスには原則MFA必須",
			"• VPN + MFA の組み合わせが一般的",
			"• 管理対象外デバイスの制御方針",
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
		]) => `<rect x="${x}" y="${y}" width="360" height="125" rx="6" fill="${BOX}" stroke="${c}" stroke-width="2"/>
<text x="${Number(x) + 180}" y="${Number(y) + 20}" font-size="11" fill="${c}" text-anchor="middle" font-weight="bold">${title}</text>
${(items as string[]).map((item, i) => `<text x="${Number(x) + 15}" y="${Number(y) + 38 + i * 22}" font-size="10" fill="${TXT}">${item}</text>`).join("")}`,
	)
	.join("")}
<rect x="100" y="333" width="600" height="40" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="2"/>
<text x="400" y="351" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">ISO 27001 審査でのMFA確認ポイント</text>
<text x="400" y="367" font-size="10" fill="${TXT}" text-anchor="middle">①方針文書の存在 ②適用範囲の明確化 ③実施証跡（ログ）④例外管理のプロセス</text>`,
	380,
);

// Slide 24: Regulatory framework mapping
const svg24 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">関連法規制・フレームワークとMFAの対応</text>
<text x="100" y="60" font-size="12" fill="${A1}" text-anchor="middle">法令/規制</text>
<text x="310" y="60" font-size="12" fill="${A1}" text-anchor="middle">MFA要件</text>
<text x="580" y="60" font-size="12" fill="${A1}" text-anchor="middle">詳細</text>
<line x1="30" y1="65" x2="770" y2="65" stroke="#444" stroke-width="1"/>
${[
	[
		"個人情報保護法\n(日本)",
		"推奨/一部必須",
		"要配慮個人情報取扱システムへのアクセスに強い認証推奨",
	],
	[
		"NIST SP 800-63B",
		"AAL2+で必須",
		"AAL2: MFA必須 / AAL3: ハードウェアMFA+生体",
	],
	[
		"PCI DSS v4.0",
		"必須",
		"カード保有者データ環境へのアクセスは全ユーザーMFA必須",
	],
	[
		"SOC 2 Type II",
		"推奨/監査対象",
		"Trust Services Criteria CC6.1: 論理アクセス制御",
	],
	["HIPAA", "推奨", "ePHIへのアクセス管理の一環として強い認証推奨"],
	[
		"金融庁ガイドライン",
		"必須傾向",
		"インターネットバンキング等への不正ログイン対策",
	],
]
	.map(([law, req, detail], i) => {
		const y = 72 + i * 48;
		const bg = i % 2 === 0 ? "#0d0d1a" : BOX;
		const reqColor = String(req).includes("必須")
			? A2
			: String(req).includes("推奨")
				? A1
				: GRN;
		return `<rect x="30" y="${y}" width="740" height="42" rx="3" fill="${bg}"/>
${String(law)
	.split("\n")
	.map(
		(l, li) =>
			`<text x="100" y="${y + 16 + li * 14}" font-size="10" fill="${TXT}" text-anchor="middle">${l}</text>`,
	)
	.join("")}
<text x="310" y="${y + 21}" font-size="10" fill="${reqColor}" text-anchor="middle" font-weight="bold">${req}</text>
<text x="400" y="${y + 21}" font-size="9" fill="${TXT}">${detail.substring(0, 55)}</text>`;
	})
	.join("")}`,
	380,
);

// Slide 27: ISMS compliance checklist for MFA
const svg27 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">ISMSコンプライアンス チェックリスト（MFA）</text>
<text x="90" y="58" font-size="11" fill="${A1}" text-anchor="middle">カテゴリ</text>
<text x="350" y="58" font-size="11" fill="${A1}" text-anchor="middle">チェック項目</text>
<text x="650" y="58" font-size="11" fill="${A1}" text-anchor="middle">証跡</text>
<line x1="30" y1="63" x2="770" y2="63" stroke="#444" stroke-width="1"/>
${[
	["方針", "MFAポリシーが文書化・承認・周知されているか", "方針文書・承認記録"],
	["適用範囲", "どのシステム・ユーザーにMFAが必須かが明確か", "MFA適用範囲表"],
	[
		"実施状況",
		"MFA有効化率が目標値（例95%以上）を達成しているか",
		"IdPの設定・レポート",
	],
	[
		"例外管理",
		"MFA例外（緊急アカウント等）の承認・監視があるか",
		"例外申請記録・ログ",
	],
	[
		"ログ・監視",
		"MFA認証イベントのログが90日以上保存されているか",
		"SIEMの設定確認",
	],
	["訓練", "従業員へのMFA使用・フィッシング対策教育の記録", "研修完了証明"],
	[
		"レビュー",
		"MFAポリシーの年次見直しが実施されているか",
		"マネジメントレビュー記録",
	],
]
	.map(([cat, item, evidence], i) => {
		const y = 70 + i * 42;
		const bg = i % 2 === 0 ? "#0d0d1a" : BOX;
		return `<rect x="30" y="${y}" width="740" height="36" rx="3" fill="${bg}"/>
<rect x="33" y="${y + 8}" width="12" height="12" rx="2" fill="none" stroke="${GRN}" stroke-width="2"/>
<text x="90" y="${y + 22}" font-size="10" fill="${A1}" text-anchor="middle" font-weight="bold">${cat}</text>
<text x="185" y="${y + 22}" font-size="9.5" fill="${TXT}">${item}</text>
<text x="650" y="${y + 22}" font-size="9" fill="#aaa" text-anchor="middle">${evidence}</text>`;
	})
	.join("")}
<rect x="30" y="365" width="740" height="0" fill="none"/>`,
	380,
);

// Slide 28: Audit log requirements
const svg28 = w(
	`<rect width="800" height="380" fill="${BG}"/>
<text x="400" y="28" font-size="15" fill="${A1}" text-anchor="middle" font-weight="bold">監査証跡・ログ要件（ISMS観点）</text>
<rect x="30" y="45" width="740" height="35" rx="5" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="68" font-size="11" fill="${TXT}" text-anchor="middle">ISO 27001 Annex A 8.15 ログの記録 + 8.16 監視活動 が要求する最低限のMFAログ</text>
<text x="100" y="100" font-size="12" fill="${A1}" text-anchor="middle">イベント種別</text>
<text x="380" y="100" font-size="12" fill="${A1}" text-anchor="middle">記録すべき情報</text>
<text x="640" y="100" font-size="12" fill="${A1}" text-anchor="middle">保存期間</text>
<line x1="30" y1="106" x2="770" y2="106" stroke="#444" stroke-width="1"/>
${[
	[
		"MFA認証成功",
		"ユーザーID・タイムスタンプ・IPアドレス・デバイス・MFA方式",
		"90日〜1年",
	],
	[
		"MFA認証失敗",
		"同上 + 失敗理由（無効なコード・タイムアウト等）",
		"90日〜1年",
	],
	["MFA設定変更", "変更者・変更内容・承認者・変更前後の状態", "3年〜"],
	["MFA一時無効化", "無効化理由・承認者・期間・再有効化記録", "3年〜"],
	["特権アカウントMFA", "上記全項目 + セッション録画（PAM）", "5年〜"],
]
	.map(([evt, info, period], i) => {
		const y = 113 + i * 42;
		const bg = i % 2 === 0 ? "#0d0d1a" : BOX;
		return `<rect x="30" y="${y}" width="740" height="36" rx="3" fill="${bg}"/>
<text x="100" y="${y + 22}" font-size="10" fill="${A2}" text-anchor="middle" font-weight="bold">${evt}</text>
<text x="230" y="${y + 22}" font-size="8.5" fill="${TXT}">${info.substring(0, 55)}</text>
<text x="640" y="${y + 22}" font-size="10" fill="${GRN}" text-anchor="middle">${period}</text>`;
	})
	.join("")}
<rect x="30" y="328" width="740" height="42" rx="6" fill="${BOX}" stroke="${A1}" stroke-width="1"/>
<text x="400" y="348" font-size="12" fill="${A1}" text-anchor="middle" font-weight="bold">ログの完全性確保</text>
<text x="400" y="364" font-size="10" fill="${TXT}" text-anchor="middle">ログのハッシュチェーン・WORM（書き換え不可）ストレージ・SIEMへのリアルタイム転送で証拠能力を確保</text>`,
	380,
);

const svgMap: Record<number, string> = {
	7: svg7,
	16: svg16,
	20: svg20,
	24: svg24,
	27: svg27,
	28: svg28,
};
for (const [k, v] of Object.entries(svgMap)) {
	const s = data.slides[Number.parseInt(k)];
	if (s) s.content = [v, ...s.content];
}
writeFileSync(path, JSON.stringify(data, null, 2));
console.log(
	"Done: added",
	Object.keys(svgMap).length,
	"more SVGs to mfa-isms-guide",
);
