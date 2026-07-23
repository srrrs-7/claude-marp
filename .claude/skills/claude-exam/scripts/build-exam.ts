#!/usr/bin/env bun
/**
 * build-exam.ts <examDir>
 *
 * Multilingual exam-booklet builder.
 *
 * 1. If items-part*.json exist, merge them (sorted by part number) into
 *    items.json — renumber ids Q1..Qn, attach exam/language/title/scenarios.
 * 2. Detect every language variant present in the dir:
 *      - items.json            → its own `language` field (the primary language)
 *      - items.<lang>.json     → an additional translated variant (same ids/answers/refs)
 * 3. For EACH language variant, generate:
 *      - exam.<lang>.md      booklet (no answers)
 *      - answers.<lang>.md   answer key + rationale + references
 *      - <EXAM>.<lang>.html  self-contained (cover + booklet + answer key) for PDF export
 *    and generate one README.md (in the primary language).
 *
 * Chrome (cover text, section headings, labels) is fully localized via LABELS.
 * Item content (stem/options/rationale/distractors) comes from the JSON, so a
 * translated items.<lang>.json is all that a new language needs.
 *
 * PDF export is a separate step — see scripts/topdf.sh:
 *      bun build-exam.ts exams/<dir>
 *      for f in exams/<dir>/*.html; do scripts/topdf.sh "$f" "pdf/<base>_<lang>.pdf"; done
 */
import {
	existsSync,
	readFileSync,
	readdirSync,
	unlinkSync,
	writeFileSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";

const LINKS_ABS = resolve(import.meta.dir, "../references/links.md");

type Lang = string;

type Item = {
	id: string;
	domain: string;
	domainName: string;
	type: "single" | "multi";
	scenarioId?: string;
	stem: string;
	options: Record<string, string>;
	answer: string[];
	rationale: string;
	distractors: Record<string, string>;
	trap?: string;
	refs: string[];
};
type LocalizedScenario = {
	id: string;
	title: Record<Lang, string>;
	body: Record<Lang, string>;
};
type ExamMeta = {
	name: string;
	realCount: number;
	price: string;
	pdfBase: string;
	note?: Record<Lang, string>;
	domains: { id: string; name: string; weight: string }[];
};

// pdfBase historically ends in the default set size "_20" — swap that suffix
// for the actual item count so differently-sized sets never overwrite each
// other's PDFs in pdf/.
const pdfBaseFor = (meta: ExamMeta, count: number): string =>
	meta.pdfBase.replace(/_\d+$/, `_${count}`);

// ── exam metadata ────────────────────────────────────────────────────────────
const EXAM_META: Record<string, ExamMeta> = {
	"CCAO-F": {
		name: "Claude Certified Associate – Foundations (CCAO-F)",
		realCount: 60,
		price: "$99",
		pdfBase: "CCAO-F_Associate_practice_20",
		domains: [
			{ id: "D1", name: "Prompting & Task Execution", weight: "14" },
			{ id: "D2", name: "Output Evaluation & Validation", weight: "21" },
			{ id: "D3", name: "Product & Model Selection", weight: "12" },
			{
				id: "D4",
				name: "Workflow Integration & Solution Design",
				weight: "16",
			},
			{ id: "D5", name: "Configuration & Knowledge Management", weight: "12" },
			{ id: "D6", name: "Governance, Risk & Responsible Use", weight: "15" },
			{ id: "D7", name: "Troubleshooting & Optimization", weight: "10" },
		],
	},
	"CCDV-F": {
		name: "Claude Certified Developer – Foundations (CCDV-F)",
		realCount: 53,
		price: "$125",
		pdfBase: "CCDV-F_Developer_practice_20",
		domains: [
			{ id: "D1", name: "Agents & Workflows", weight: "14.7" },
			{ id: "D2", name: "Applications & Integration", weight: "33.1" },
			{ id: "D3", name: "Claude Code", weight: "3.1" },
			{ id: "D4", name: "Eval, Testing & Debugging", weight: "2.6" },
			{ id: "D5", name: "Model Selection & Optimization", weight: "16.8" },
			{ id: "D6", name: "Prompt & Context Engineering", weight: "11.0" },
			{ id: "D7", name: "Security & Safety", weight: "8.1" },
			{ id: "D8", name: "Tools & MCPs", weight: "10.6" },
		],
	},
	"CCA-F": {
		name: "Claude Certified Architect – Foundations (CCA-F)",
		realCount: 60,
		price: "$125",
		pdfBase: "CCA-F_Architect_Foundations_practice_20",
		note: {
			en: "The live exam is 60 items, all scenario-based (a.k.a. CCAR-F)",
			ja: "本番は 60 問・全問シナリオベース（別称 CCAR-F）",
		},
		domains: [
			{ id: "D1", name: "Agentic Architecture & Orchestration", weight: "27" },
			{ id: "D2", name: "Claude Code Configuration & Workflows", weight: "20" },
			{
				id: "D3",
				name: "Prompt Engineering & Structured Output",
				weight: "20",
			},
			{ id: "D4", name: "Tool Design & MCP Integration", weight: "18" },
			{ id: "D5", name: "Context Management & Reliability", weight: "15" },
		],
	},
	"CCAR-P": {
		name: "Claude Certified Architect – Professional (CCAR-P)",
		realCount: 63,
		price: "$175",
		pdfBase: "CCAR-P_Architect_Professional_practice_20",
		domains: [
			{ id: "D1", name: "Solution Design & Architecture", weight: "17" },
			{
				id: "D2",
				name: "Models, Prompting & Context Engineering",
				weight: "13",
			},
			{ id: "D3", name: "Integration", weight: "19" },
			{ id: "D4", name: "Evaluation, Testing & Optimization", weight: "16" },
			{ id: "D5", name: "Governance, Safety & Risk", weight: "14" },
			{
				id: "D6",
				name: "Stakeholder Communication & Lifecycle Management",
				weight: "14",
			},
			{
				id: "D7",
				name: "Developer Productivity & Operational Enablement",
				weight: "7",
			},
		],
	},
};

// ── shared scenarios (CCA-F) — localized ─────────────────────────────────────
const CCAF_SCENARIOS: LocalizedScenario[] = [
	{
		id: "sc-1",
		title: {
			en: "E-commerce Customer-Support Resolution Agent",
			ja: "ECカスタマーサポート解決エージェント",
		},
		body: {
			en: "You are building a customer-support resolution agent for an e-commerce platform with the Claude Agent SDK. It receives customer inquiries (delayed orders, refunds, accounts) and connects to core systems through the custom MCP tools `get_customer` / `lookup_order` / `process_refund` / `escalate_to_human`. `process_refund` is a high-impact tool that actually issues refunds to customers. The goal is to resolve 65% of inquiries without human involvement and escalate complex, high-risk cases to a human agent. Peak inbound volume is 12,000 inquiries per day. The following questions concern this system.",
			ja: "あなたはECプラットフォームのカスタマーサポート解決エージェントを Claude Agent SDK で構築している。顧客からの問い合わせ（注文遅延・返金・アカウント）を受け、カスタムMCPツール `get_customer` / `lookup_order` / `process_refund` / `escalate_to_human` を通じて基幹システムに接続する。`process_refund` は実際に顧客へ返金を実行する高影響ツールである。目標は問い合わせの65%を人手を介さず解決し、複雑・高リスクな案件は人間のエージェントにエスカレーションすること。ピーク時の流入は1日12,000件。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-2",
		title: {
			en: "Claude Code PR-Review CI Pipeline",
			ja: "Claude Code による PR レビュー CI パイプライン",
		},
		body: {
			en: "You are the architect on a platform team that owns 900 services, and you are designing a CI pipeline that hands pull-request review and routine fixes to Claude Code. It runs as a nightly batch in headless mode, emitting comments and patches per service. The repository contains a CLAUDE.md that states the review policy, several subagent definitions, PostToolUse hooks that run tests and linters, and commands that touch production deploys. Most rewrites are mechanical, but a little under 10% require judgment about behavior. The following questions concern this pipeline.",
			ja: "あなたは 900 サービスを抱えるプラットフォームチームのアーキテクトで、プルリクエストのレビューと定型的な修正を Claude Code に任せる CI パイプラインを設計している。夜間バッチとして headless モードで実行し、サービス単位でコメントとパッチを出す。リポジトリにはレビュー方針を書いた CLAUDE.md、複数のサブエージェント定義、テストとリンタを走らせる PostToolUse フック、そして本番デプロイを触るコマンドがある。書き換えの大半は機械的だが、1割弱は挙動の判断を要する。以下の設問はこのパイプラインに関するものである。",
		},
	},
	{
		id: "sc-3",
		title: {
			en: "Invoice-Processing Agent",
			ja: "請求書処理エージェント",
		},
		body: {
			en: "You work at an accounting BPO firm and are building an agent that processes invoice PDFs arriving from suppliers. It ingests PDFs averaging 12 pages each and integrates with the accounting system through the custom MCP tools `parse_invoice` / `match_purchase_order` / `schedule_payment` / `flag_for_review`. `schedule_payment` is a high-impact tool that actually schedules payments. The goal is to automatically advance 80% of invoices whose line items match the purchase order all the way to a scheduled payment, and route mismatches or high-value invoices to human review. Monthly volume is 40,000 invoices. The following questions concern this system.",
			ja: "あなたは経理BPO企業で、取引先から届く請求書PDFを処理するエージェントを構築している。1通あたり平均12ページのPDFを取り込み、カスタムMCPツール `parse_invoice` / `match_purchase_order` / `schedule_payment` / `flag_for_review` を通じて会計システムに連携する。`schedule_payment` は実際に支払いを予約する高影響ツールである。目標は明細が発注書と一致する請求書の80%を自動で支払予約まで進め、不一致・高額は人間のレビューに回すこと。月間の処理量は40,000通。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-4",
		title: {
			en: "Healthcare Prior-Authorization Triage Agent",
			ja: "医療事前承認トリアージ・エージェント",
		},
		body: {
			en: "You are the architect for a health insurer building a prior-authorization triage agent on the Claude Agent SDK. It receives authorization requests from provider portals (clinical notes plus a coded procedure request) and connects to core systems through the custom MCP tools `get_patient_record` / `check_coverage_policy` / `approve_authorization` / `escalate_to_clinician`. `approve_authorization` is a high-impact tool that actually commits an approval decision to the claims system. The goal is to auto-approve the 60% of requests that clearly meet coverage policy and route everything ambiguous or high-risk to a clinical reviewer. Peak volume is 3,000 requests per day in a regulated environment. The following questions concern this system.",
			ja: "あなたは医療保険会社のアーキテクトとして、Claude Agent SDK で事前承認トリアージ・エージェントを構築している。医療機関ポータルから届く承認申請（診療メモと処置コード）を受け、カスタムMCPツール `get_patient_record` / `check_coverage_policy` / `approve_authorization` / `escalate_to_clinician` で基幹システムに接続する。`approve_authorization` は承認判定を実際に請求システムへ確定させる高影響ツールである。目標は補償方針を明確に満たす60%の申請を自動承認し、曖昧・高リスクな案件は臨床レビュアーに回すこと。規制環境下でピーク時1日3,000件を処理する。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-5",
		title: {
			en: "Claude Code Monorepo Migration Fleet",
			ja: "Claude Code モノレポ移行フリート",
		},
		body: {
			en: "You are designing a migration program that uses Claude Code to move 1,400 packages in a monorepo from a deprecated HTTP client to its replacement. Claude Code runs headless in CI, package by package, with a repo-level CLAUDE.md describing the migration recipe, subagent definitions for edit and verify roles, PostToolUse hooks that run the package's tests, and a permission configuration. Some packages also contain scripts that can touch production infrastructure. About 90% of migrations are mechanical; the rest need judgment about behavior changes. The following questions concern this pipeline.",
			ja: "あなたは、モノレポ内の1,400パッケージを非推奨のHTTPクライアントから後継ライブラリへ移行するプログラムを、Claude Code を使って設計している。Claude Code はCI上で headless モードでパッケージ単位に実行され、移行手順を書いたリポジトリ直下の CLAUDE.md、編集役と検証役のサブエージェント定義、パッケージのテストを走らせる PostToolUse フック、権限設定を持つ。一部のパッケージには本番インフラを触りうるスクリプトも含まれる。移行の約9割は機械的だが、残りは挙動変化の判断を要する。以下の設問はこのパイプラインに関するものである。",
		},
	},
	{
		id: "sc-6",
		title: {
			en: "Wealth-Management Research Assistant",
			ja: "資産運用リサーチ・アシスタント",
		},
		body: {
			en: "You are building a research assistant for a wealth-management firm's advisors. It answers questions by combining retrieval over a corpus of 80,000 filings and research notes with live systems reached through the custom MCP tools `search_filings` / `get_portfolio_positions` / `get_market_price` / `send_client_report`. `send_client_report` is a high-impact tool that actually delivers a report to an end client. Answers must distinguish stable knowledge (filings, methodology) from live state (prices, positions), and advisors expect cited sources. Around 400 advisors use it daily. The following questions concern this system.",
			ja: "あなたは資産運用会社のアドバイザー向けリサーチ・アシスタントを構築している。8万件の開示資料・リサーチノートに対する検索（RAG）と、カスタムMCPツール `search_filings` / `get_portfolio_positions` / `get_market_price` / `send_client_report` で到達するライブ系システムを組み合わせて回答する。`send_client_report` は実際に顧客へレポートを送付する高影響ツールである。回答では安定した知識（開示資料・手法）とライブな状態（価格・ポジション）を区別し、出典の提示が求められる。約400人のアドバイザーが毎日利用する。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-7",
		title: {
			en: "Logistics Dispatch & Notification Agent",
			ja: "物流ディスパッチ・通知エージェント",
		},
		body: {
			en: "You are the architect for a parcel carrier's dispatch agent. When shipments are delayed or misrouted it investigates and remediates through the custom MCP tools `track_shipment` / `reroute_shipment` / `issue_credit` / `notify_customer`. `issue_credit` is a high-impact tool that actually grants monetary credits to customer accounts, and `reroute_shipment` changes physical routing. The agent handles 25,000 shipment exceptions per day, and the business tracks resolution accuracy, cost of credits issued, and time-to-notification as its key metrics. The following questions concern this system.",
			ja: "あなたは宅配事業者のディスパッチ・エージェントを設計するアーキテクトである。配送の遅延・誤配送が起きると、カスタムMCPツール `track_shipment` / `reroute_shipment` / `issue_credit` / `notify_customer` を通じて調査・是正する。`issue_credit` は顧客アカウントへ実際に金銭クレジットを付与する高影響ツールで、`reroute_shipment` は物理的な配送経路を変更する。1日25,000件の配送例外を処理し、事業側は解決精度・付与クレジットのコスト・通知までの時間を主要指標として追っている。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-8",
		title: {
			en: "Contract-Review Structured-Output Workflow",
			ja: "契約レビュー構造化出力ワークフロー",
		},
		body: {
			en: "You are building a contract-review workflow for a legal-operations team. Inbound vendor contracts (30–80 pages) flow through a fixed sequence: `extract_clauses` pulls clause text, Claude compares each clause to the firm's negotiation playbook via `compare_to_playbook`, drafts proposed edits with `draft_redlines`, and `send_to_counsel` routes the package to an attorney. Downstream systems consume the clause analysis as strict JSON conforming to a published schema; a malformed document blocks the whole batch. Volume is 900 contracts per month. The following questions concern this workflow.",
			ja: "あなたはリーガルオペレーションチームの契約レビュー・ワークフローを構築している。受領したベンダー契約（30〜80ページ）は固定の手順を流れる: `extract_clauses` が条項テキストを抽出し、Claude が `compare_to_playbook` で各条項を自社の交渉プレイブックと照合し、`draft_redlines` で修正案を起案し、`send_to_counsel` が弁護士へ一式を回付する。下流システムは条項分析を公開スキーマ準拠の厳格なJSONとして消費し、不正な1件がバッチ全体を止める。処理量は月900契約。以下の設問はこのワークフローに関するものである。",
		},
	},
	{
		id: "sc-9",
		title: {
			en: "Claude Code Enablement for a 40-Developer Fintech",
			ja: "40人開発組織への Claude Code 展開",
		},
		body: {
			en: "You are rolling out Claude Code to a fintech engineering organization of 40 developers across four teams. The monorepo has a root CLAUDE.md, per-team rules files, a set of custom skills, and MCP servers for the ticket tracker and the feature-flag service. Deploy scripts that can reach production live in the same repo, and the compliance team requires that AI-driven changes be reviewable and that production access be controlled. Developers range from enthusiastic early adopters to skeptics burned by a previous tool. The following questions concern this rollout.",
			ja: "あなたはフィンテック企業の4チーム・40人の開発組織へ Claude Code を展開している。モノレポにはルートの CLAUDE.md、チーム別のルールファイル、カスタムスキル群、チケットトラッカーとフィーチャーフラグサービスの MCP サーバがある。本番に到達しうるデプロイスクリプトが同じリポジトリにあり、コンプライアンスチームは AI による変更のレビュー可能性と本番アクセスの統制を要求している。開発者は熱心な早期採用者から、以前のツールで痛い目を見た懐疑派までいる。以下の設問はこの展開に関するものである。",
		},
	},
	{
		id: "sc-10",
		title: {
			en: "Multi-Agent Competitive-Intelligence Orchestrator",
			ja: "マルチエージェント競合調査オーケストレータ",
		},
		body: {
			en: "You are designing a competitive-intelligence system in which a supervisor agent decomposes a weekly research brief into per-competitor units, fans them out to research subagents that use `web_search` and `fetch_page` over roughly 60 external sources, and synthesizes their returns into one report. `write_report_section` stores drafted sections, and `publish_brief` is a high-impact tool that actually distributes the finished brief to 300 executives. Fetched web content is untrusted third-party input. The run must finish within a 4-hour overnight window. The following questions concern this system.",
			ja: "あなたは競合調査システムを設計している。スーパーバイザー・エージェントが週次の調査依頼を競合企業単位に分解し、`web_search` と `fetch_page` で約60の外部ソースを調べるリサーチ・サブエージェント群にファンアウトし、返ってきた結果を1本のレポートに統合する。`write_report_section` は起案済みセクションを保存し、`publish_brief` は完成したブリーフを実際に役員300人へ配信する高影響ツールである。取得したWebコンテンツは信頼できない第三者入力である。実行は夜間4時間の枠内に収める必要がある。以下の設問はこのシステムに関するものである。",
		},
	},
	{
		id: "sc-11",
		title: {
			en: "Regulated Policy-Renewal Notice Pipeline",
			ja: "規制下の保険更新通知パイプライン",
		},
		body: {
			en: "You are building a pipeline that drafts policy-renewal notices for an insurer. For each of 200,000 policies per quarter it loads policy terms with `get_policy_terms`, generates a personalized notice with `generate_notice` under a 30,000-token system prompt containing regulated template wording, and either queues the letter for physical mail with `queue_for_print` — a high-impact, irreversible tool — or routes edge cases to `flag_compliance_review`. Regulators require that mandatory disclosures appear verbatim, and marketing wants each notice personalized to the policyholder. The following questions concern this pipeline.",
			ja: "あなたは保険会社の更新通知を起案するパイプラインを構築している。四半期あたり20万契約それぞれについて、`get_policy_terms` で契約条件を読み込み、規制上のテンプレート文言を含む30,000トークンのシステムプロンプトのもと `generate_notice` で個別化した通知文を生成し、`queue_for_print`（実際に郵送キューへ投入する取り消し不能の高影響ツール）へ送るか、エッジケースを `flag_compliance_review` に回す。規制当局は必須開示文言の逐語一致を要求し、マーケティングは契約者ごとの個別化を求めている。以下の設問はこのパイプラインに関するものである。",
		},
	},
];

// ── localized chrome (everything that is NOT item content) ───────────────────
type Labels = {
	htmlLang: string;
	fontStack: string;
	typeSingle: string;
	typeMulti: string;
	blueprint: string;
	howtoTitle: string;
	// dynamic: realCount, minsPer, n(items), multi
	howto: (
		realCount: number,
		minsPer: string,
		n: number,
		multi: number,
	) => string[];
	coverDisc: string;
	bookletHeading: string;
	answerHeading: string;
	scoring: (n: number) => string;
	whyWrong: string;
	refsLabel: string;
	correctLabel: string;
	scenarioLabel: string;
	footDisc: string;
	answersMdTitle: (name: string) => string;
	answersMdScoring: (n: number) => string;
	// README
	readme: {
		title: (name: string, n: number) => string;
		targetRow: string;
		thisSetRow: string;
		estTimeRow: string;
		genDateRow: string;
		targetVal: (exam: string, m: ExamMeta) => string;
		thisSetVal: (n: number, multi: number) => string;
		estTimeVal: (mins: number) => string;
		genDate: string;
		domainBreakHdr: string;
		domainCols: string; // "| ドメイン | 公式配点 | 本問題集 |"
		howtoHdr: string;
		howtoBody: (exam: string, m: ExamMeta, count: number) => string;
		scoreSheetHdr: string;
		scoreCols: string; // "| ドメイン | 出題数 | 正答数 | 正答率 |"
		totalLabel: string;
		scaledNote: string;
		verifyHdr: string;
	};
};

const DISCLAIMER_MD = `## Disclaimer / 免責事項

This is independent study material based on the published Anthropic exam blueprints.
It is not affiliated with, endorsed by, or sponsored by Anthropic.
The items are illustrative only and are **NOT** from the live exam bank.

本問題集は、Anthropic が公開している認定試験ブループリントに基づいて独自に作成した学習用教材です。
Anthropic とは無関係であり、Anthropic による承認・推奨を受けたものではありません。
掲載している問題はすべて出題形式を示すための例題であり、実際の試験問題ではありません。`;

const COVER_DISC_BILINGUAL =
	"Independent study material — not affiliated with Anthropic; items are illustrative, not from the live exam bank. / 独立した学習用教材です。Anthropic とは無関係で、実際の試験問題ではありません。";
const FOOT_DISC_BILINGUAL =
	"Independent study material based on published Anthropic blueprints. Not affiliated with, endorsed by, or sponsored by Anthropic. Items are illustrative only and are NOT from the live exam bank.<br>本問題集は Anthropic 公開ブループリントに基づく独立教材です。Anthropic とは無関係であり、承認・推奨を受けたものではありません。掲載問題はすべて例題で、実際の試験問題ではありません。";

const CJK_FONT = '"Noto Sans CJK JP","Noto Sans JP",sans-serif';
const LATIN_FONT = '"Noto Sans","DejaVu Sans",Arial,sans-serif';

const LABELS: Record<Lang, Labels> = {
	en: {
		htmlLang: "en",
		fontStack: LATIN_FONT,
		typeSingle: "Single response",
		typeMulti: "Multiple response (select TWO)",
		blueprint: "Blueprint",
		howtoTitle: "How to use this set",
		howto: (realCount, minsPer, n, multi) => [
			`The live exam is 120 minutes / **${realCount} items** (~${minsPer} min each). This set is **${n} items** (${multi} multiple-response).`,
			"The answer key is at the end. Do not look until you have finished every item.",
			"Memorize the **reasoning**, not the letter — on the real exam the option order and wording change.",
			"Record each miss by domain; the fastest fix is to go back to the official docs for the domains you keep dropping.",
			"Multiple-response items give no partial credit — you must select **both** correct options.",
		],
		coverDisc: COVER_DISC_BILINGUAL,
		bookletHeading: "Question Booklet",
		answerHeading: "Answer Key &amp; Rationale",
		scoring: (n) =>
			`Scoring: correct ÷ ${n} = your accuracy. Approx scaled score = 100 + 900 × accuracy (pass 720 ≈ 72% accuracy).`,
		whyWrong: "Why the others are wrong",
		refsLabel: "References",
		correctLabel: "Correct:",
		scenarioLabel: "Scenario",
		footDisc: FOOT_DISC_BILINGUAL,
		answersMdTitle: (name) => `${name} — Answer Key & Rationale`,
		answersMdScoring: (n) =>
			`**Scoring:** correct ÷ ${n} is your accuracy. Approx scaled score = \`100 + 900 × accuracy\` (pass line 720 ≈ 72% accuracy). Record the domain of every miss and transfer it to the score sheet in README.md.`,
		readme: {
			title: (name, n) => `# ${name} Practice Exam — ${n} items`,
			targetRow: "Target exam",
			thisSetRow: "This set",
			estTimeRow: "Estimated time",
			genDateRow: "Generated",
			targetVal: (exam, m) =>
				`${exam} (live: ${m.realCount} items / 120 min / ${m.price} / 720-1000 to pass)`,
			thisSetVal: (n, multi) => `${n} items (${multi} multiple-response)`,
			estTimeVal: (mins) => `~${mins} min`,
			genDate: "2026-07-21",
			domainBreakHdr: "## Domain breakdown",
			domainCols: "| Domain | Official weight | This set |",
			howtoHdr: "## How to use",
			howtoBody: (exam, m, count) =>
				`1. Time yourself on \`exam.en.md\` (or \`${pdfBaseFor(m, count)}_en.pdf\`).\n2. Score with \`answers.en.md\` and fill the domain rows in the score sheet below.\n3. For weak domains, review the matching links in \`.claude/skills/claude-exam/references/links.md\`.`,
			scoreSheetHdr: "## Score sheet",
			scoreCols: "| Domain | Items | Correct | Accuracy |",
			totalLabel: "**Total**",
			scaledNote:
				"Approx scaled score = `100 + 900 × accuracy` (pass line 720 ≈ 72% accuracy)",
			verifyHdr: "## Verify",
		},
	},
	ja: {
		htmlLang: "ja",
		fontStack: CJK_FONT,
		typeSingle: "Single response",
		typeMulti: "Multiple response (select TWO)",
		blueprint: "Blueprint",
		howtoTitle: "How to use this set",
		howto: (realCount, minsPer, n, multi) => [
			`本番は120分・**${realCount}問**（1問約${minsPer}分）。本セットは **${n}問**（うち複数選択 ${multi}問）`,
			"解答・解説は巻末にあります。全問解き終えるまで見ないでください",
			"正解の「文字」ではなく**根拠**を覚える。本番では選択肢の順序も文言も変わります",
			"間違えた問題はドメイン別に記録する。偏って落としているドメインの公式ドキュメントに戻るのが最短です",
			"複数選択（Multiple response）は部分点なし。2つとも正しく選べて初めて正答です",
		],
		coverDisc: COVER_DISC_BILINGUAL,
		bookletHeading: "問題冊子 / Question Booklet",
		answerHeading: "解答・解説 / Answer Key &amp; Rationale",
		scoring: (n) =>
			`採点: 正答数 ÷ ${n} が正答率。スケールドスコア目安 = 100 + 900 × 正答率（合格 720 ≒ 正答率72%）。`,
		whyWrong: "なぜ他が違うか",
		refsLabel: "参照",
		correctLabel: "Correct:",
		scenarioLabel: "Scenario",
		footDisc: FOOT_DISC_BILINGUAL,
		answersMdTitle: (name) => `${name} — 解答・解説`,
		answersMdScoring: (n) =>
			`**採点方法:** 正答数 ÷ ${n} が正答率。スケールドスコアの目安は \`100 + 900 × 正答率\`（合格ライン 720 ≒ 正答率72%）。間違えた問題のドメインを記録し、README.md の採点表に転記してください。`,
		readme: {
			title: (name, n) => `# ${name} 模擬試験 — ${n}問`,
			targetRow: "対象試験",
			thisSetRow: "この問題集",
			estTimeRow: "想定所要時間",
			genDateRow: "生成日",
			targetVal: (exam, m) =>
				`${exam}（本番: ${m.realCount}問 / 120分 / ${m.price} / 720-1000で合格）`,
			thisSetVal: (n, multi) => `${n}問（うち複数選択 ${multi}問）`,
			estTimeVal: (mins) => `約${mins}分`,
			genDate: "2026-07-21",
			domainBreakHdr: "## ドメイン別内訳",
			domainCols: "| ドメイン | 公式配点 | 本問題集 |",
			howtoHdr: "## 使い方",
			howtoBody: (exam, m, count) =>
				`1. \`exam.ja.md\`（または \`${pdfBaseFor(m, count)}_ja.pdf\`）を時間を計って解く\n2. 巻末／\`answers.ja.md\` で採点し、下の表にドメイン別の正誤を記入する\n3. 正答率が低いドメインは \`.claude/skills/claude-exam/references/links.md\` の該当リンクで復習する`,
			scoreSheetHdr: "## 採点表",
			scoreCols: "| ドメイン | 出題数 | 正答数 | 正答率 |",
			totalLabel: "**合計**",
			scaledNote:
				"スケールドスコア目安 = `100 + 900 × 正答率`（合格ライン 720 ≒ 正答率72%）",
			verifyHdr: "## 検証",
		},
	},
};

function L(lang: Lang): Labels {
	return LABELS[lang] ?? LABELS.en;
}

// ── URL -> title map from links.md ───────────────────────────────────────────
function buildUrlTitleMap(): Map<string, string> {
	const map = new Map<string, string>();
	if (!existsSync(LINKS_ABS)) return map;
	const text = readFileSync(LINKS_ABS, "utf-8");
	for (const line of text.split("\n")) {
		if (!line.includes("http")) continue;
		const cells = line.split("|").map((c) => c.trim());
		const urlIdx = cells.findIndex((c) => /^https?:\/\//.test(c));
		if (urlIdx < 0) continue;
		const url = cells[urlIdx].replace(/[.,;:]+$/, "");
		let title = "";
		for (let i = urlIdx - 1; i >= 0; i--) {
			if (cells[i]) {
				title = cells[i];
				break;
			}
		}
		if (!map.has(url)) map.set(url, title || url);
	}
	return map;
}

// ── merge items-part*.json -> items.json (only if parts exist) ───────────────
function mergeParts(examDir: string): void {
	const partNum = (f: string) =>
		Number.parseInt(f.match(/\d+/)?.[0] ?? "0", 10);
	const parts = readdirSync(examDir)
		.filter((f) => /^items-part\d+\.json$/.test(f))
		.sort((a, b) => partNum(a) - partNum(b));
	if (parts.length === 0) return; // nothing to merge — items.json already authored
	let exam = "";
	let language = "ja";
	const items: Item[] = [];
	for (const p of parts) {
		const data = JSON.parse(readFileSync(join(examDir, p), "utf-8"));
		exam = data.exam ?? exam;
		language = data.language ?? language;
		for (const it of data.items) items.push(it);
	}
	items.forEach((it, i) => {
		it.id = `Q${i + 1}`;
	});
	// Attach the referenced shared scenarios (localized to the set's language)
	// so items.json is self-contained and passes check-exam's scenario check.
	const scenarioIds: string[] = [];
	for (const it of items)
		if (it.scenarioId && !scenarioIds.includes(it.scenarioId))
			scenarioIds.push(it.scenarioId);
	const scenarios = scenarioIds.map((id) => {
		const s = CCAF_SCENARIOS.find((x) => x.id === id);
		if (!s) throw new Error(`unknown scenarioId ${id} in merged parts`);
		return {
			id: s.id,
			title: s.title[language] ?? s.title.en,
			body: s.body[language] ?? s.body.en,
		};
	});
	const out: Record<string, unknown> = {
		exam,
		language,
		title: `${exam} practice set (${items.length} items)`,
		generatedFor: `Practice set — ${items.length} items`,
		...(scenarios.length > 0 ? { scenarios } : {}),
		items,
	};
	writeFileSync(
		join(examDir, "items.json"),
		`${JSON.stringify(out, null, "\t")}\n`,
	);
}

type Variant = { lang: Lang; file: string; exam: string; items: Item[] };

function loadVariants(examDir: string): {
	primaryLang: Lang;
	variants: Variant[];
} {
	const files = readdirSync(examDir).filter((f) =>
		/^items(\.[a-z-]+)?\.json$/.test(f),
	);
	// primary first
	files.sort((a, b) => (a === "items.json" ? -1 : b === "items.json" ? 1 : 0));
	const variants: Variant[] = [];
	let primaryLang: Lang = "en";
	for (const f of files) {
		const data = JSON.parse(readFileSync(join(examDir, f), "utf-8"));
		const m = f.match(/^items\.([a-z-]+)\.json$/);
		const lang: Lang = data.language ?? (m ? m[1] : "en");
		if (f === "items.json") primaryLang = lang;
		variants.push({ lang, file: f, exam: data.exam, items: data.items });
	}
	return { primaryLang, variants };
}

function scenariosFor(exam: string, items: Item[]): LocalizedScenario[] {
	if (exam !== "CCA-F") return [];
	const order: string[] = [];
	for (const it of items)
		if (it.scenarioId && !order.includes(it.scenarioId))
			order.push(it.scenarioId);
	return order.map((id) => {
		const s = CCAF_SCENARIOS.find((x) => x.id === id);
		if (!s) throw new Error(`unknown scenarioId ${id}`);
		return s;
	});
}

function typeLabel(lang: Lang, t: string): string {
	return t === "multi" ? L(lang).typeMulti : L(lang).typeSingle;
}

// ── markdown booklet ─────────────────────────────────────────────────────────
function genExamMd(
	exam: string,
	lang: Lang,
	items: Item[],
	scenarios: LocalizedScenario[],
): string {
	const meta = EXAM_META[exam];
	const lb = L(lang);
	const minsPer = (120 / meta.realCount).toFixed(1);
	const multi = items.filter((i) => i.type === "multi").length;
	const blueprint = meta.domains
		.map((d) => `${d.id} ${d.name} ${d.weight}%`)
		.join(" ・ ");
	const out: string[] = [];
	out.push("# CLAUDE CERTIFICATION PROGRAM\n");
	out.push(`## ${meta.name}\n`);
	out.push(
		`**${items.length} items | 120 minutes | ${meta.price} | 720/1000 to pass**${meta.note ? `（${meta.note[lang] ?? meta.note.en}）` : ""}\n`,
	);
	out.push(`${lb.blueprint}: ${blueprint}\n`);
	out.push(`### ${lb.howtoTitle}\n`);
	out.push(
		`${lb
			.howto(meta.realCount, minsPer, items.length, multi)
			.map((h) => `- ${h}`)
			.join("\n")}\n`,
	);
	out.push("---\n");
	const shown = new Set<string>();
	for (const it of items) {
		if (it.scenarioId && !shown.has(it.scenarioId)) {
			shown.add(it.scenarioId);
			const s = scenarios.find((x) => x.id === it.scenarioId);
			if (s)
				out.push(
					`> **${lb.scenarioLabel} — ${s.title[lang] ?? s.title.en}:** ${s.body[lang] ?? s.body.en}\n`,
				);
		}
		out.push(`### ${it.id} ${typeLabel(lang, it.type)}\n`);
		out.push(`**${it.domain} — ${it.domainName.toUpperCase()}**\n`);
		out.push(`${it.stem}\n`);
		out.push(
			`A. ${it.options.A}\nB. ${it.options.B}\nC. ${it.options.C}\nD. ${it.options.D}\n`,
		);
		out.push("---\n");
	}
	out.push(DISCLAIMER_MD);
	return out.join("\n");
}

function genAnswersMd(exam: string, lang: Lang, items: Item[]): string {
	const meta = EXAM_META[exam];
	const lb = L(lang);
	const urlTitle = buildUrlTitleMap();
	const out: string[] = [];
	out.push(`# ${lb.answersMdTitle(meta.name)}\n`);
	out.push("## Answer Key & Rationale\n");
	out.push(`${lb.answersMdScoring(items.length)}\n`);
	out.push("---\n");
	for (const it of items) {
		out.push(
			`### ${it.id} Correct: ${it.answer.join(", ")} (${it.domain} — ${it.domainName})\n`,
		);
		out.push(`${it.rationale}\n`);
		out.push(`**${lb.whyWrong}**\n`);
		for (const Lt of ["A", "B", "C", "D"]) {
			if (it.distractors[Lt]) out.push(`- **${Lt}.** ${it.distractors[Lt]}`);
		}
		out.push("");
		out.push(`**${lb.refsLabel}:**\n`);
		for (const url of it.refs) {
			const t = urlTitle.get(url) ?? url;
			out.push(`- [${t}](${url})`);
		}
		out.push("");
		out.push("---\n");
	}
	out.push(DISCLAIMER_MD);
	return out.join("\n");
}

function genReadmeMd(
	exam: string,
	lang: Lang,
	items: Item[],
	dirName: string,
): string {
	const meta = EXAM_META[exam];
	const r = L(lang).readme;
	const multi = items.filter((i) => i.type === "multi").length;
	const byDomain = new Map<string, number>();
	for (const it of items)
		byDomain.set(it.domain, (byDomain.get(it.domain) ?? 0) + 1);
	const mins = Math.round((120 / meta.realCount) * items.length);
	const out: string[] = [];
	out.push(`${r.title(meta.name, items.length)}\n`);
	out.push("| | |");
	out.push("|---|---|");
	out.push(`| ${r.targetRow} | ${r.targetVal(exam, meta)} |`);
	out.push(`| ${r.thisSetRow} | ${r.thisSetVal(items.length, multi)} |`);
	out.push(`| ${r.estTimeRow} | ${r.estTimeVal(mins)} |`);
	out.push(`| ${r.genDateRow} | ${r.genDate} |\n`);
	out.push(`${r.domainBreakHdr}\n`);
	out.push(r.domainCols);
	out.push("|---|---|---|");
	for (const d of meta.domains)
		out.push(
			`| ${d.id} ${d.name} | ${d.weight}% | ${byDomain.get(d.id) ?? 0} |`,
		);
	out.push("");
	out.push(`${r.howtoHdr}\n`);
	out.push(`${r.howtoBody(exam, meta, items.length)}\n`);
	out.push(`${r.scoreSheetHdr}\n`);
	out.push(r.scoreCols);
	out.push("|---|---|---|---|");
	for (const d of meta.domains)
		out.push(`| ${d.id} ${d.name} | ${byDomain.get(d.id) ?? 0} | | |`);
	out.push(`| ${r.totalLabel} | ${items.length} | | |\n`);
	out.push(`${r.scaledNote}\n`);
	out.push(`${r.verifyHdr}\n`);
	out.push(
		`    bun .claude/skills/claude-exam/scripts/check-exam.ts exams/${dirName}/items.json\n`,
	);
	return out.join("\n");
}

// ── HTML (self-contained booklet + answer key) ───────────────────────────────
function esc(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s: string): string {
	let t = esc(s);
	t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
	t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
	return t;
}

function genHtml(
	exam: string,
	lang: Lang,
	items: Item[],
	scenarios: LocalizedScenario[],
): string {
	const meta = EXAM_META[exam];
	const lb = L(lang);
	const urlTitle = buildUrlTitleMap();
	const minsPer = (120 / meta.realCount).toFixed(1);
	const multi = items.filter((i) => i.type === "multi").length;
	const blueprint = meta.domains
		.map((d) => `${d.id} ${d.name} <b>${d.weight}%</b>`)
		.join(" ・ ");

	const parts: string[] = [];
	parts.push(`<section class="cover">
    <div class="prog">CLAUDE CERTIFICATION PROGRAM</div>
    <h1>${esc(meta.name)}</h1>
    <div class="badge">${items.length} items &nbsp;|&nbsp; 120 minutes &nbsp;|&nbsp; ${meta.price} &nbsp;|&nbsp; 720/1000 to pass</div>
    ${meta.note ? `<div class="note">${esc(meta.note[lang] ?? meta.note.en)}</div>` : ""}
    <div class="blueprint"><b>${lb.blueprint}</b><br>${blueprint}</div>
    <ul class="howto">
      ${lb
				.howto(meta.realCount, minsPer, items.length, multi)
				.map((h) => `<li>${inline(h)}</li>`)
				.join("\n      ")}
    </ul>
    <div class="disc">${esc(lb.coverDisc)}</div>
  </section>`);

	parts.push(`<h2 class="sech">${lb.bookletHeading}</h2>`);
	const shown = new Set<string>();
	for (const it of items) {
		if (it.scenarioId && !shown.has(it.scenarioId)) {
			shown.add(it.scenarioId);
			const s = scenarios.find((x) => x.id === it.scenarioId);
			if (s)
				parts.push(
					`<div class="scenario"><b>${lb.scenarioLabel} — ${esc(s.title[lang] ?? s.title.en)}</b><br>${inline(s.body[lang] ?? s.body.en)}</div>`,
				);
		}
		const opts = ["A", "B", "C", "D"]
			.map(
				(Lt) =>
					`<li><span class="ol">${Lt}.</span> ${inline(it.options[Lt])}</li>`,
			)
			.join("");
		parts.push(`<div class="q">
      <div class="qh"><span class="qid">${it.id}</span> <span class="qtype ${it.type}">${typeLabel(lang, it.type)}</span> <span class="qdom">${it.domain} — ${esc(it.domainName)}</span></div>
      <div class="stem">${inline(it.stem)}</div>
      <ol class="opts">${opts}</ol>
    </div>`);
	}

	parts.push(`<h2 class="sech pb">${lb.answerHeading}</h2>`);
	parts.push(`<div class="scoring">${esc(lb.scoring(items.length))}</div>`);
	for (const it of items) {
		const wrong = ["A", "B", "C", "D"]
			.filter((Lt) => it.distractors[Lt])
			.map((Lt) => `<li><b>${Lt}.</b> ${inline(it.distractors[Lt])}</li>`)
			.join("");
		const refs = it.refs
			.map((u) => {
				const t = urlTitle.get(u) ?? u;
				return `<li><a href="${esc(u)}">${esc(t)}</a></li>`;
			})
			.join("");
		parts.push(`<div class="ans">
      <div class="ah"><span class="qid">${it.id}</span> ${lb.correctLabel} <span class="correct">${it.answer.join(", ")}</span> <span class="qdom">${it.domain} — ${esc(it.domainName)}</span></div>
      <div class="rat">${inline(it.rationale)}</div>
      <div class="wl"><b>${lb.whyWrong}</b><ul>${wrong}</ul></div>
      <div class="rl"><b>${lb.refsLabel}</b><ul>${refs}</ul></div>
    </div>`);
	}
	parts.push(`<div class="disc foot">${lb.footDisc}</div>`);

	const css = `
  :root { --ink:#1a1a1a; --sub:#555; --line:#d8d8d8; --brand:#b8552e; --accent:#0b5; --panel:#f7f5f2; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: ${lb.fontStack}; color: var(--ink); font-size: 10.5pt; line-height: 1.6; margin: 0; }
  code { font-family: "DejaVu Sans Mono",monospace; background: #eee; padding: 0 3px; border-radius: 3px; font-size: 0.86em; }
  a { color: var(--brand); text-decoration: none; word-break: break-all; }
  .cover { min-height: 96vh; padding: 8mm 4mm; display: flex; flex-direction: column; justify-content: center; }
  .cover .prog { letter-spacing: 3px; color: var(--sub); font-size: 9pt; }
  .cover h1 { font-size: 24pt; margin: 6px 0 14px; line-height: 1.25; color: var(--brand); }
  .badge { display: inline-block; background: var(--ink); color: #fff; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 10pt; }
  .cover .note { margin-top: 10px; color: var(--sub); font-size: 9.5pt; }
  .blueprint { margin: 20px 0; padding: 12px 14px; background: var(--panel); border-left: 4px solid var(--brand); border-radius: 4px; font-size: 9.5pt; }
  .howto { margin: 8px 0 0; padding-left: 20px; color: #333; }
  .howto li { margin: 4px 0; }
  .cover .disc { margin-top: 24px; color: #999; font-size: 8pt; border-top: 1px solid var(--line); padding-top: 8px; }
  .sech { font-size: 15pt; color: var(--brand); border-bottom: 2px solid var(--brand); padding-bottom: 4px; margin: 18px 4mm 14px; }
  .pb { page-break-before: always; }
  .scenario { background: var(--panel); border: 1px solid var(--line); border-left: 4px solid #888; border-radius: 4px; padding: 10px 12px; margin: 14px 4mm; font-size: 9.7pt; }
  .q, .ans { margin: 0 4mm 14px; padding-bottom: 12px; border-bottom: 1px solid var(--line); page-break-inside: avoid; }
  .qh, .ah { font-size: 9pt; color: var(--sub); margin-bottom: 5px; }
  .qid { font-weight: 800; color: var(--ink); font-size: 10.5pt; }
  .qtype { display: inline-block; padding: 1px 6px; border-radius: 3px; background: #eef; color: #335; font-size: 8pt; }
  .qtype.multi { background: #fce8d8; color: #a5461f; }
  .qdom { color: #999; font-size: 8pt; }
  .stem { margin: 4px 0 8px; }
  .opts { list-style: none; margin: 0; padding: 0; }
  .opts li { margin: 3px 0; padding-left: 4px; }
  .ol { font-weight: 700; color: var(--brand); margin-right: 4px; }
  .scoring { margin: 0 4mm 14px; color: var(--sub); font-size: 9pt; background: var(--panel); padding: 8px 10px; border-radius: 4px; }
  .correct { display: inline-block; background: var(--accent); color: #fff; font-weight: 800; padding: 0 8px; border-radius: 3px; }
  .rat { margin: 4px 0 8px; }
  .wl ul, .rl ul { margin: 4px 0; padding-left: 18px; }
  .wl li, .rl li { margin: 2px 0; font-size: 9.5pt; }
  .wl { color: #333; } .rl { color: #333; margin-top: 6px; }
  .disc.foot { margin: 20px 4mm; color: #999; font-size: 8pt; border-top: 1px solid var(--line); padding-top: 8px; }
  @page { size: A4; margin: 12mm 10mm; }
  `;
	return `<!doctype html><html lang="${lb.htmlLang}"><head><meta charset="utf-8"><title>${esc(meta.name)} — practice</title><style>${css}</style></head><body>${parts.join("\n")}</body></html>`;
}

// ── main ─────────────────────────────────────────────────────────────────────
const examDir = process.argv[2];
if (!examDir) {
	console.error("usage: bun build-exam.ts <examDir>");
	process.exit(1);
}
const dirAbs = resolve(process.cwd(), examDir);
const dirName = basename(dirAbs);

mergeParts(dirAbs);
const { primaryLang, variants } = loadVariants(dirAbs);
if (variants.length === 0) throw new Error(`no items*.json in ${examDir}`);

// remove legacy unsuffixed outputs so language-suffixed files are unambiguous
for (const legacy of ["exam.md", "answers.md"]) {
	const p = join(dirAbs, legacy);
	if (existsSync(p)) unlinkSync(p);
}
{
	const primaryExam = variants[0].exam;
	const legacyHtml = join(dirAbs, `${primaryExam}.html`);
	if (existsSync(legacyHtml)) unlinkSync(legacyHtml);
}

const built: string[] = [];
const manifest: string[] = [];
for (const v of variants) {
	const meta = EXAM_META[v.exam];
	if (!meta) throw new Error(`unknown exam code ${v.exam}`);
	const scenarios = scenariosFor(v.exam, v.items);
	writeFileSync(
		join(dirAbs, `exam.${v.lang}.md`),
		genExamMd(v.exam, v.lang, v.items, scenarios),
	);
	writeFileSync(
		join(dirAbs, `answers.${v.lang}.md`),
		genAnswersMd(v.exam, v.lang, v.items),
	);
	const htmlName = `${v.exam}.${v.lang}.html`;
	writeFileSync(
		join(dirAbs, htmlName),
		genHtml(v.exam, v.lang, v.items, scenarios),
	);
	const pdfName = `${pdfBaseFor(meta, v.items.length)}_${v.lang}.pdf`;
	built.push(`${htmlName} (${pdfName})`);
	// manifest row: <html basename>\t<target pdf filename> — consumed by the
	// topdf step so PDF naming stays in one place (EXAM_META.pdfBase).
	manifest.push(`${htmlName}\t${pdfName}`);
}

// pdf-manifest.tsv drives the PDF export loop:
//   while IFS=$'\t' read -r html pdf; do topdf.sh "<dir>/$html" "pdf/$pdf"; done < <dir>/pdf-manifest.tsv
writeFileSync(join(dirAbs, "pdf-manifest.tsv"), `${manifest.join("\n")}\n`);

// README in the primary language
{
	const primary = variants.find((v) => v.lang === primaryLang) ?? variants[0];
	writeFileSync(
		join(dirAbs, "README.md"),
		genReadmeMd(primary.exam, primary.lang, primary.items, dirName),
	);
}

console.log(
	`built ${variants[0].exam} [${variants.map((v) => v.lang).join(", ")}] -> ${built.join(", ")}, README.md`,
);
