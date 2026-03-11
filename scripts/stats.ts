#!/usr/bin/env bun
/**
 * bun run stats — Project-wide slide quality statistics
 *
 * Reports aggregate metrics across all presentations:
 *   - Slide counts, reading time
 *   - SVG coverage (figure-first principle)
 *   - Subtitle (BLUF) coverage
 *   - Assertive title ratio (Google/Amazon quality standard)
 *   - Quality grade distribution (A/B/C/D)
 */

import { Glob } from "bun";
import { parse as parseYaml } from "yaml";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SlideData {
	title?: string;
	subtitle?: string;
	content?: string[];
	code?: string;
	layout?: string;
	speakerNotes?: string;
}

interface DeckStats {
	dir: string;
	topic: string;
	slideCount: number;
	readingMins: number;
	svgRatio: number; // 0..1
	subtitleRatio: number; // ratio of content slides with subtitle
	assertiveRatio: number; // ratio of content slides with assertive title
	grade: "A" | "B" | "C" | "D";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LABEL_TITLE_RE =
	/^(アジェンダ|目次|概要|まとめ|結論|はじめに|導入|背景|課題|解決策|参考文献|おわりに|終わりに|ご清聴ありがとうございました|ありがとうございました|質疑応答|デモ|agenda|overview|introduction|conclusion|summary|background|problem|solution|next steps?|references?|thank you|q&a|demo|outline|contents?)$/i;

function isAssertive(title: string): boolean {
	return !LABEL_TITLE_RE.test(title.trim());
}

function hasSvg(slide: SlideData): boolean {
	const content = slide.content ?? [];
	return content.some((c) => c.includes("<svg") || c.startsWith("!["));
}

function estimateMins(slides: SlideData[]): number {
	let chars = 0;
	for (const s of slides) {
		chars += (s.title ?? "").length;
		for (const c of s.content ?? []) chars += c.length;
		chars += (s.speakerNotes ?? "").length;
	}
	return Math.ceil(chars / 350);
}

function grade(
	svgRatio: number,
	assertiveRatio: number,
	subtitleRatio: number,
): "A" | "B" | "C" | "D" {
	const score =
		svgRatio * 40 + // SVG: figure-first (40pts)
		assertiveRatio * 40 + // assertive titles (40pts)
		subtitleRatio * 20; // subtitle/BLUF (20pts)

	if (score >= 70) return "A";
	if (score >= 50) return "B";
	if (score >= 30) return "C";
	return "D";
}

function bar(ratio: number, width = 20): string {
	const filled = Math.round(ratio * width);
	return "█".repeat(filled) + "░".repeat(width - filled);
}

function pct(ratio: number): string {
	return `${Math.round(ratio * 100)}%`.padStart(4);
}

// Colors
const G = (s: string) => `\x1b[32m${s}\x1b[0m`;
const Y = (s: string) => `\x1b[33m${s}\x1b[0m`;
const R = (s: string) => `\x1b[31m${s}\x1b[0m`;
const B = (s: string) => `\x1b[34m${s}\x1b[0m`;
const DIM = (s: string) => `\x1b[2m${s}\x1b[0m`;
const BOLD = (s: string) => `\x1b[1m${s}\x1b[0m`;

function gradeColor(g: string): string {
	if (g === "A") return G(g);
	if (g === "B") return B(g);
	if (g === "C") return Y(g);
	return R(g);
}

// ---------------------------------------------------------------------------
// Collect stats
// ---------------------------------------------------------------------------

async function collectStats(): Promise<DeckStats[]> {
	const glob = new Glob("docs/*/slides-data.json");
	const results: DeckStats[] = [];

	for (const dataPath of glob.scanSync()) {
		const dir = dataPath.split("/").slice(0, 2).join("/");
		const configPath = `${dir}/slides.config.yaml`;

		let topic = dir
			.split("/")[1]
			.replace(/^\d{14}_/, "")
			.replace(/-/g, " ");
		try {
			const yaml = parseYaml(await Bun.file(configPath).text()) as {
				topic?: string;
			};
			if (yaml.topic) topic = yaml.topic;
		} catch {
			/* no config */
		}

		let slides: SlideData[] = [];
		try {
			const data = (await Bun.file(dataPath).json()) as {
				slides?: SlideData[];
			};
			slides = data.slides ?? [];
		} catch {
			continue;
		}

		const contentSlides = slides.filter(
			(s) => (s.layout ?? "default") === "default",
		);
		const svgCount = slides.filter(hasSvg).length;
		const withSubtitle = contentSlides.filter((s) => s.subtitle).length;
		const assertiveCount = contentSlides.filter((s) =>
			isAssertive(s.title ?? ""),
		).length;

		const svgRatio = slides.length > 0 ? svgCount / slides.length : 0;
		const subtitleRatio =
			contentSlides.length > 0 ? withSubtitle / contentSlides.length : 0;
		const assertiveRatio =
			contentSlides.length > 0 ? assertiveCount / contentSlides.length : 0;

		results.push({
			dir,
			topic,
			slideCount: slides.length,
			readingMins: estimateMins(slides),
			svgRatio,
			subtitleRatio,
			assertiveRatio,
			grade: grade(svgRatio, assertiveRatio, subtitleRatio),
		});
	}

	return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const decks = await collectStats();

if (decks.length === 0) {
	console.log("No presentations found in docs/");
	process.exit(0);
}

// Aggregates
const totalSlides = decks.reduce((s, d) => s + d.slideCount, 0);
const totalMins = decks.reduce((s, d) => s + d.readingMins, 0);
const avgSvg = decks.reduce((s, d) => s + d.svgRatio, 0) / decks.length;
const avgAssertive =
	decks.reduce((s, d) => s + d.assertiveRatio, 0) / decks.length;
const avgSubtitle =
	decks.reduce((s, d) => s + d.subtitleRatio, 0) / decks.length;
const gradeDist = { A: 0, B: 0, C: 0, D: 0 };
for (const d of decks) gradeDist[d.grade]++;

const hours = Math.floor(totalMins / 60);
const mins = totalMins % 60;

// Print overview
console.log(BOLD("\n📊 Slide Collection Statistics\n"));
console.log(`  Presentations : ${BOLD(String(decks.length))}`);
console.log(`  Total slides  : ${BOLD(String(totalSlides))}`);
console.log(`  Reading time  : ${BOLD(`${hours}h ${mins}m`)}`);

console.log(
	BOLD("\n── Quality Metrics (aggregate) ──────────────────────────────\n"),
);
console.log(
	`  SVG coverage    ${bar(avgSvg)} ${pct(avgSvg)}  ${avgSvg >= 0.5 ? G("✓ target ≥50%") : R("✗ below 50%")}`,
);
console.log(
	`  Assertive titles${bar(avgAssertive)} ${pct(avgAssertive)}  ${avgAssertive >= 0.6 ? G("✓ target ≥60%") : R("✗ below 60%")}`,
);
console.log(
	`  Subtitle (BLUF) ${bar(avgSubtitle)} ${pct(avgSubtitle)}  ${avgSubtitle >= 0.3 ? G("✓") : Y("low — add subtitle fields")}`,
);

console.log(
	BOLD("\n── Grade Distribution ───────────────────────────────────────\n"),
);
console.log(
	`  ${G("A")} (≥70pts) ${String(gradeDist.A).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.A / decks.length) * 40))}`,
);
console.log(
	`  ${B("B")} (≥50pts) ${String(gradeDist.B).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.B / decks.length) * 40))}`,
);
console.log(
	`  ${Y("C")} (≥30pts) ${String(gradeDist.C).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.C / decks.length) * 40))}`,
);
console.log(
	`  ${R("D")} (<30pts) ${String(gradeDist.D).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.D / decks.length) * 40))}`,
);

// --verbose: show per-deck breakdown
if (process.argv.includes("--verbose") || process.argv.includes("-v")) {
	console.log(
		BOLD("\n── Per-deck breakdown ───────────────────────────────────────\n"),
	);
	console.log(DIM("  Grade  SVG    Assert  Subtitle  Slides  Topic"));
	console.log(DIM("  ─────  ─────  ──────  ────────  ──────  ─────"));

	const sorted = [...decks].sort((a, b) => {
		const gOrder = { A: 0, B: 1, C: 2, D: 3 };
		return gOrder[a.grade] - gOrder[b.grade];
	});

	for (const d of sorted) {
		const topic = d.topic.length > 45 ? d.topic.slice(0, 42) + "…" : d.topic;
		console.log(
			`  ${gradeColor(d.grade)}      ${pct(d.svgRatio)}  ${pct(d.assertiveRatio)}    ${pct(d.subtitleRatio)}    ${String(d.slideCount).padStart(4)}    ${topic}`,
		);
	}
}

// Opportunities
const lowSvg = decks.filter((d) => d.svgRatio < 0.3).length;
const lowAssertive = decks.filter((d) => d.assertiveRatio < 0.4).length;
const noSubtitle = decks.filter((d) => d.subtitleRatio === 0).length;

if (lowSvg + lowAssertive + noSubtitle > 0) {
	console.log(
		BOLD("\n── Improvement Opportunities ────────────────────────────────\n"),
	);
	if (lowSvg > 0)
		console.log(
			Y(
				`  ${lowSvg} decks with <30% SVG coverage — add diagrams (figure-first principle)`,
			),
		);
	if (lowAssertive > 0)
		console.log(
			Y(
				`  ${lowAssertive} decks with <40% assertive titles — rewrite label titles as conclusions`,
			),
		);
	if (noSubtitle > 0)
		console.log(
			DIM(
				`  ${noSubtitle} decks with 0% subtitle (BLUF) — add "subtitle" field to key slides`,
			),
		);
	console.log(
		DIM(`\n  Run: bun run validate:quality  to see per-slide detail`),
	);
}

console.log();
