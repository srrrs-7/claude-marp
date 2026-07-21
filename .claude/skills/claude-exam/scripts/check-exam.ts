#!/usr/bin/env bun
/**
 * check-exam.ts — machine check for a generated practice-exam item set.
 *
 *   bun .claude/skills/claude-exam/scripts/check-exam.ts <items.json> [--no-net]
 *
 * No external dependencies on purpose: the skill must run even in a checkout
 * where `bun install` has never been executed.
 *
 * Exit code 0 = no ERROR lines, 1 = at least one ERROR (or unusable input).
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const LINKS_MD = resolve(HERE, "../references/links.md");

const LETTERS = ["A", "B", "C", "D"] as const;
type Letter = (typeof LETTERS)[number];

const ANSWER_SHARE_MAX = 0.4; // one letter may not be correct in >40% of items
const BALANCE_MIN_ITEMS = 10; // below this, letter distribution is noise — warn, don't fail
const MULTI_RATIO_MIN = 0.05;
const MULTI_RATIO_MAX = 0.2;
const STEM_SIMILARITY_MAX = 0.9;
const NET_CONCURRENCY = 6;
const NET_TIMEOUT_MS = 15_000;

// ── output helpers ──────────────────────────────────────────────────────────

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code: string, s: string) =>
	useColor ? `\x1b[${code}m${s}\x1b[0m` : s;
const bold = (s: string) => paint("1", s);
const red = (s: string) => paint("31", s);
const yellow = (s: string) => paint("33", s);
const green = (s: string) => paint("32", s);
const dim = (s: string) => paint("2", s);

const errors: string[] = [];
const warnings: string[] = [];

function error(msg: string): void {
	errors.push(msg);
	console.log(`${red("ERROR:")} ${msg}`);
}

function warn(msg: string): void {
	warnings.push(msg);
	console.log(`${yellow("WARN:")} ${msg}`);
}

function section(title: string): void {
	console.log(`\n${bold(`── ${title} `.padEnd(72, "─"))}`);
}

function die(msg: string): never {
	console.log(`${red("ERROR:")} ${msg}`);
	console.log(`\n${red("FAILED")} — 1 error, 0 warnings`);
	process.exit(1);
}

// ── types (structural, validated by hand below) ─────────────────────────────

type Item = {
	id: string;
	domain: string;
	domainName: string;
	type: string;
	scenarioId?: string;
	stem: string;
	options: Record<string, string>;
	answer: string[];
	rationale: string;
	distractors: Record<string, string>;
	trap?: string;
	refs: string[];
};

type Scenario = { id: string; title: string; body: string };

const isObject = (v: unknown): v is Record<string, unknown> =>
	typeof v === "object" && v !== null && !Array.isArray(v);

// ── load ────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const noNet = argv.includes("--no-net");
const target = argv.find((a) => !a.startsWith("--"));

if (!target) {
	die("usage: bun check-exam.ts <path-to-items.json> [--no-net]");
}

const inputPath = resolve(process.cwd(), target);
const file = Bun.file(inputPath);
if (!(await file.exists())) {
	die(`input file not found: ${inputPath}`);
}

let raw: unknown;
try {
	raw = JSON.parse(await file.text());
} catch (e) {
	die(`could not parse JSON (${inputPath}): ${(e as Error).message}`);
}

if (!isObject(raw)) {
	die("top-level JSON value must be an object");
}
if (!Array.isArray(raw.items) || raw.items.length === 0) {
	die("`items` must be a non-empty array");
}

console.log(bold(`\ncheck-exam — ${inputPath}`));
console.log(
	dim(
		`exam=${String(raw.exam ?? "?")} language=${String(raw.language ?? "?")} items=${raw.items.length}${noNet ? " (--no-net)" : ""}`,
	),
);

const VALID_EXAMS = ["CCAO-F", "CCDV-F", "CCA-F", "CCAR-P"];
const VALID_LANGUAGES = ["ja", "en", "ja-en"];

section("1. Structure");

if (typeof raw.exam !== "string" || !VALID_EXAMS.includes(raw.exam)) {
	error(
		`top-level \`exam\` must be one of ${VALID_EXAMS.join(" / ")} (got ${JSON.stringify(raw.exam)})`,
	);
}
if (
	typeof raw.language !== "string" ||
	!VALID_LANGUAGES.includes(raw.language)
) {
	error(
		`top-level \`language\` must be one of ${VALID_LANGUAGES.join(" / ")} (got ${JSON.stringify(raw.language)})`,
	);
}

const scenarios: Scenario[] = [];
if (raw.scenarios !== undefined) {
	if (!Array.isArray(raw.scenarios)) {
		error("`scenarios` must be an array when present");
	} else {
		for (const [i, s] of raw.scenarios.entries()) {
			if (!isObject(s)) {
				error(`scenarios[${i}] is not an object`);
				continue;
			}
			const id = typeof s.id === "string" ? s.id : "";
			if (!/^sc-\d+$/.test(id)) {
				error(
					`scenarios[${i}].id must match ^sc-\\d+$ (got ${JSON.stringify(s.id)})`,
				);
			}
			if (typeof s.title !== "string" || s.title.trim() === "") {
				error(`scenarios[${i}] (${id}) has an empty \`title\``);
			}
			if (typeof s.body !== "string" || s.body.length < 80) {
				error(
					`scenarios[${i}] (${id}) \`body\` must be a string of at least 80 chars`,
				);
			}
			scenarios.push({
				id,
				title: String(s.title ?? ""),
				body: String(s.body ?? ""),
			});
		}
		const seen = new Set<string>();
		for (const s of scenarios) {
			if (seen.has(s.id)) error(`duplicate scenario id: ${s.id}`);
			seen.add(s.id);
		}
	}
}

const REQUIRED_ITEM_FIELDS = [
	"id",
	"domain",
	"domainName",
	"type",
	"stem",
	"options",
	"answer",
	"rationale",
	"distractors",
	"refs",
];
const ALLOWED_ITEM_FIELDS = new Set([
	...REQUIRED_ITEM_FIELDS,
	"scenarioId",
	"trap",
]);

const items: Item[] = [];
const seenIds = new Set<string>();

for (const [i, v] of raw.items.entries()) {
	const where = `items[${i}]`;
	if (!isObject(v)) {
		error(`${where} is not an object`);
		continue;
	}
	const id = typeof v.id === "string" ? v.id : `${where}`;

	for (const f of REQUIRED_ITEM_FIELDS) {
		if (v[f] === undefined) error(`${id}: missing required field \`${f}\``);
	}
	for (const f of Object.keys(v)) {
		if (!ALLOWED_ITEM_FIELDS.has(f)) error(`${id}: unknown field \`${f}\``);
	}

	if (typeof v.id !== "string" || !/^Q\d+$/.test(v.id)) {
		error(`${where}: \`id\` must match ^Q\\d+$ (got ${JSON.stringify(v.id)})`);
	} else if (seenIds.has(v.id)) {
		error(`duplicate item id: ${v.id}`);
	} else {
		seenIds.add(v.id);
	}

	if (typeof v.domain !== "string" || !/^D[1-8]$/.test(v.domain)) {
		error(
			`${id}: \`domain\` must match ^D[1-8]$ (got ${JSON.stringify(v.domain)})`,
		);
	}
	if (typeof v.domainName !== "string" || v.domainName.trim() === "") {
		error(`${id}: \`domainName\` must be a non-empty string`);
	}
	if (v.type !== "single" && v.type !== "multi") {
		error(
			`${id}: \`type\` must be "single" or "multi" (got ${JSON.stringify(v.type)})`,
		);
	}
	if (typeof v.stem !== "string" || v.stem.length < 80) {
		error(`${id}: \`stem\` must be a string of at least 80 chars`);
	}
	if (typeof v.rationale !== "string" || v.rationale.length < 60) {
		error(`${id}: \`rationale\` must be a string of at least 60 chars`);
	}
	if (
		v.scenarioId !== undefined &&
		(typeof v.scenarioId !== "string" || !/^sc-\d+$/.test(v.scenarioId))
	) {
		error(
			`${id}: \`scenarioId\` must match ^sc-\\d+$ (got ${JSON.stringify(v.scenarioId)})`,
		);
	}

	if (!isObject(v.options)) {
		error(`${id}: \`options\` must be an object with keys A–D`);
	} else {
		for (const L of LETTERS) {
			const opt = v.options[L];
			if (typeof opt !== "string" || opt.trim() === "") {
				error(`${id}: option ${L} is missing or empty`);
			}
		}
		for (const k of Object.keys(v.options)) {
			if (!(LETTERS as readonly string[]).includes(k)) {
				error(`${id}: \`options\` has unexpected key \`${k}\``);
			}
		}
	}

	if (!Array.isArray(v.answer) || v.answer.length === 0) {
		error(`${id}: \`answer\` must be a non-empty array of option letters`);
	} else {
		for (const a of v.answer) {
			if (
				typeof a !== "string" ||
				!(LETTERS as readonly string[]).includes(a)
			) {
				error(
					`${id}: \`answer\` contains a non-option letter ${JSON.stringify(a)}`,
				);
			}
		}
		if (new Set(v.answer).size !== v.answer.length) {
			error(`${id}: \`answer\` contains duplicate letters`);
		}
	}

	if (!isObject(v.distractors)) {
		error(`${id}: \`distractors\` must be an object keyed by option letter`);
	}

	if (!Array.isArray(v.refs) || v.refs.length === 0) {
		error(`${id}: \`refs\` must contain at least one URL`);
	} else {
		for (const r of v.refs) {
			if (typeof r !== "string" || !/^https?:\/\//.test(r)) {
				error(
					`${id}: \`refs\` entry is not an http(s) URL: ${JSON.stringify(r)}`,
				);
			}
		}
	}

	items.push({
		id: typeof v.id === "string" ? v.id : id,
		domain: String(v.domain ?? "?"),
		domainName: String(v.domainName ?? ""),
		type: String(v.type ?? ""),
		scenarioId: typeof v.scenarioId === "string" ? v.scenarioId : undefined,
		stem: typeof v.stem === "string" ? v.stem : "",
		options: isObject(v.options) ? (v.options as Record<string, string>) : {},
		answer: Array.isArray(v.answer)
			? (v.answer.filter((a) => typeof a === "string") as string[])
			: [],
		rationale: typeof v.rationale === "string" ? v.rationale : "",
		distractors: isObject(v.distractors)
			? (v.distractors as Record<string, string>)
			: {},
		trap: typeof v.trap === "string" ? v.trap : undefined,
		refs: Array.isArray(v.refs)
			? (v.refs.filter((r) => typeof r === "string") as string[])
			: [],
	});
}

// Sequential numbering: Q1..Qn with no gaps and no duplicates.
const numbers = items
	.map((it) => Number.parseInt(it.id.replace(/^Q/, ""), 10))
	.filter((n) => Number.isFinite(n))
	.sort((a, b) => a - b);
for (let i = 0; i < numbers.length; i++) {
	if (numbers[i] !== i + 1) {
		error(
			`item ids are not sequential from Q1 — expected Q${i + 1}, found Q${numbers[i]} (gap or duplicate around here)`,
		);
		break;
	}
}

if (errors.length === 0)
	console.log(
		green(`OK — ${items.length} items, ${scenarios.length} scenarios`),
	);

// ── 2. answer sanity ────────────────────────────────────────────────────────

section("2. Answer sanity");

for (const it of items) {
	if (it.type === "single" && it.answer.length !== 1) {
		error(
			`${it.id}: type=single must have exactly 1 answer letter (got ${it.answer.length})`,
		);
	}
	if (it.type === "multi" && it.answer.length !== 2) {
		error(
			`${it.id}: type=multi must have exactly 2 answer letters (got ${it.answer.length})`,
		);
	}

	const answerSet = new Set(it.answer);
	for (const L of LETTERS) {
		if (answerSet.has(L)) {
			if (it.distractors[L] !== undefined) {
				error(
					`${it.id}: answer letter ${L} must not appear in \`distractors\``,
				);
			}
		} else if (
			typeof it.distractors[L] !== "string" ||
			it.distractors[L].trim() === ""
		) {
			error(`${it.id}: wrong option ${L} has no \`distractors\` explanation`);
		}
	}
	for (const k of Object.keys(it.distractors)) {
		if (!(LETTERS as readonly string[]).includes(k)) {
			error(`${it.id}: \`distractors\` has unexpected key \`${k}\``);
		}
	}
}

if (errors.length === 0)
	console.log(green("OK — every wrong option is explained, no answer leaks"));

// ── 3. answer-key balance ───────────────────────────────────────────────────

section("3. Answer-key balance");

const letterCount: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
for (const it of items) {
	for (const a of it.answer) {
		if ((LETTERS as readonly string[]).includes(a)) letterCount[a as Letter]++;
	}
}
const totalAnswerSlots =
	Object.values(letterCount).reduce((a, b) => a + b, 0) || 1;

console.log("  letter  count   share   bar");
for (const L of LETTERS) {
	const share = letterCount[L] / totalAnswerSlots;
	const bar = "█".repeat(Math.round(share * 40));
	console.log(
		`  ${L}       ${String(letterCount[L]).padStart(5)}  ${(share * 100).toFixed(1).padStart(5)}%  ${bar}`,
	);
}
// Below BALANCE_MIN_ITEMS the distribution is noise, not skew — warn instead of failing.
for (const L of LETTERS) {
	const share = letterCount[L] / totalAnswerSlots;
	if (share > ANSWER_SHARE_MAX) {
		const msg = `answer key is skewed — ${L} is correct in ${(share * 100).toFixed(1)}% of answer slots (max ${ANSWER_SHARE_MAX * 100}%)`;
		if (items.length >= BALANCE_MIN_ITEMS) error(msg);
		else warn(`${msg} — only ${items.length} items, so this may be noise`);
	}
}

// ── 4. multi-response ratio ─────────────────────────────────────────────────

section("4. Multi-response ratio");

const multiCount = items.filter((it) => it.type === "multi").length;
const multiRatio = multiCount / items.length;
console.log(
	`  multi: ${multiCount}/${items.length} (${(multiRatio * 100).toFixed(1)}%)`,
);
if (multiRatio < MULTI_RATIO_MIN || multiRatio > MULTI_RATIO_MAX) {
	warn(
		`multi-response items are ${(multiRatio * 100).toFixed(1)}% of the set — expected ${MULTI_RATIO_MIN * 100}–${MULTI_RATIO_MAX * 100}%`,
	);
}

// ── 5. duplicate stems ──────────────────────────────────────────────────────

section("5. Duplicate stems");

/**
 * Cheap similarity, deliberately not an edit distance: two stems count as
 * near-duplicates when their normalized first 120 characters match AND their
 * total lengths are within 10% of each other. That catches the real failure
 * mode (two workers writing the same question from the same source bullet)
 * without an O(n²·len) diff over a 60-item set.
 */
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const HEAD = 120;

let dupFound = 0;
for (let i = 0; i < items.length; i++) {
	for (let j = i + 1; j < items.length; j++) {
		const a = normalize(items[i].stem);
		const b = normalize(items[j].stem);
		if (a === "" || b === "") continue;
		if (a === b) {
			error(`${items[i].id} and ${items[j].id} have identical stems`);
			dupFound++;
			continue;
		}
		const lenRatio =
			Math.min(a.length, b.length) / Math.max(a.length, b.length);
		if (
			lenRatio >= STEM_SIMILARITY_MAX &&
			a.slice(0, HEAD) === b.slice(0, HEAD)
		) {
			error(
				`${items[i].id} and ${items[j].id} are near-duplicate stems (same opening, length ratio ${lenRatio.toFixed(2)})`,
			);
			dupFound++;
		}
	}
}
if (dupFound === 0)
	console.log(green("OK — no duplicate or near-duplicate stems"));

// ── 6. scenario integrity ───────────────────────────────────────────────────

section("6. Scenario integrity");

const declared = new Set(scenarios.map((s) => s.id));
const used = new Set<string>();
for (const it of items) {
	if (!it.scenarioId) continue;
	used.add(it.scenarioId);
	if (!declared.has(it.scenarioId)) {
		error(
			`${it.id} references scenarioId ${it.scenarioId}, which is not in the top-level \`scenarios\` array`,
		);
	}
}
for (const s of scenarios) {
	if (!used.has(s.id)) {
		error(
			`scenario ${s.id} ("${s.title}") is declared but no item references it`,
		);
	}
}
console.log(`  scenarios declared: ${declared.size}, referenced: ${used.size}`);

// ── 7. reference links ──────────────────────────────────────────────────────

section("7. Reference links");

const allRefs = new Set<string>();
for (const it of items) for (const r of it.refs) allRefs.add(r);

const linksFile = Bun.file(LINKS_MD);
let allowedUrls: Set<string> | null = null;

if (await linksFile.exists()) {
	const text = await linksFile.text();
	// Trailing ) ] , . » are Markdown/prose punctuation, not part of the URL.
	const found = text.match(/https:\/\/[^\s<>()[\]"'`]+/g) ?? [];
	allowedUrls = new Set(found.map((u) => u.replace(/[.,;:]+$/, "")));
	console.log(`  links.md: ${allowedUrls.size} unique URLs`);
	for (const r of [...allRefs].sort()) {
		if (!allowedUrls.has(r) && !allowedUrls.has(r.replace(/\/$/, ""))) {
			error(`invented URL — not present in references/links.md: ${r}`);
		}
	}
} else {
	warn(
		`references/links.md not found at ${LINKS_MD} — skipping the invented-URL check`,
	);
}
console.log(`  refs used by items: ${allRefs.size} unique URLs`);

// ── 8. link liveness ────────────────────────────────────────────────────────

section("8. Link liveness");

if (noNet) {
	console.log(dim("  skipped (--no-net)"));
} else {
	const urls = [...allRefs].sort();
	let checked = 0;

	async function probe(url: string): Promise<void> {
		const attempt = async (method: "HEAD" | "GET") => {
			const ctl = new AbortController();
			const timer = setTimeout(() => ctl.abort(), NET_TIMEOUT_MS);
			try {
				return await fetch(url, {
					method,
					redirect: "follow",
					signal: ctl.signal,
				});
			} finally {
				clearTimeout(timer);
			}
		};
		try {
			let res = await attempt("HEAD");
			// Plenty of doc hosts answer HEAD with 403/405; retry once with GET.
			if (!res.ok) res = await attempt("GET");
			if (!res.ok) error(`dead link (HTTP ${res.status}): ${url}`);
		} catch (e) {
			error(`unreachable link (${(e as Error).name}): ${url}`);
		}
		checked++;
	}

	const queue = [...urls];
	const workers = Array.from(
		{ length: Math.min(NET_CONCURRENCY, queue.length) },
		async () => {
			for (;;) {
				const url = queue.shift();
				if (!url) return;
				await probe(url);
			}
		},
	);
	await Promise.all(workers);
	console.log(`  checked ${checked} URLs`);
}

// ── 9. domain coverage ──────────────────────────────────────────────────────

section("9. Domain coverage");

const byDomain = new Map<string, { count: number; name: string }>();
for (const it of items) {
	const cur = byDomain.get(it.domain) ?? { count: 0, name: it.domainName };
	cur.count++;
	if (!cur.name) cur.name = it.domainName;
	byDomain.set(it.domain, cur);
}

console.log("  domain  items   share   name");
for (const [domain, { count, name }] of [...byDomain.entries()].sort()) {
	const share = ((count / items.length) * 100).toFixed(1).padStart(5);
	console.log(
		`  ${domain.padEnd(6)}  ${String(count).padStart(5)}  ${share}%  ${name}`,
	);
}
console.log(
	dim("  compare against the blueprint weights in references/blueprints.md"),
);

// ── summary ─────────────────────────────────────────────────────────────────

console.log("");
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
if (errors.length > 0) {
	console.log(
		`${red("FAILED")} — ${plural(errors.length, "error")}, ${plural(warnings.length, "warning")}`,
	);
	process.exit(1);
}
console.log(
	`${green("PASSED")} — 0 errors, ${plural(warnings.length, "warning")}`,
);
process.exit(0);
