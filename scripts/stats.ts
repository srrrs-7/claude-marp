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

import { c } from "./lib/colors.js";
import {
	ASSERTIVE_TARGET_RATIO,
	SVG_TARGET_RATIO,
	SUBTITLE_GOOD_RATIO,
} from "./lib/constants.js";
import { EXIT } from "./lib/exit-codes.js";
import { collectPresentations } from "./lib/presentation-loader.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function bar(ratio: number, width = 20): string {
	const filled = Math.round(ratio * width);
	return "█".repeat(filled) + "░".repeat(width - filled);
}

function pct(ratio: number): string {
	return `${Math.round(ratio * 100)}%`.padStart(4);
}

function gradeColor(g: string): string {
	if (g === "A") return c.green(g);
	if (g === "B") return c.blue(g);
	if (g === "C") return c.yellow(g);
	return c.red(g);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const decks = await collectPresentations();

const exportFormat = (() => {
	const idx = process.argv.indexOf("--export");
	return idx !== -1 ? process.argv[idx + 1] : null;
})();

if (decks.length === 0) {
	console.log("No presentations found in docs/");
	process.exit(0);
}

// Aggregates
const totalSlides = decks.reduce((s, d) => s + d.slides.length, 0);
const totalMins = decks.reduce((s, d) => s + d.metrics.readingMins, 0);
const avgSvg = decks.reduce((s, d) => s + d.metrics.svgRatio, 0) / decks.length;
const avgAssertive =
	decks.reduce((s, d) => s + d.metrics.assertiveRatio, 0) / decks.length;
const avgSubtitle =
	decks.reduce((s, d) => s + d.metrics.subtitleRatio, 0) / decks.length;
const gradeDist = { A: 0, B: 0, C: 0, D: 0 };
for (const d of decks) gradeDist[d.metrics.grade]++;

const hours = Math.floor(totalMins / 60);
const mins = totalMins % 60;

// Print overview
console.log(c.bold("\n📊 Slide Collection Statistics\n"));
console.log(`  Presentations : ${c.bold(String(decks.length))}`);
console.log(`  Total slides  : ${c.bold(String(totalSlides))}`);
console.log(`  Reading time  : ${c.bold(`${hours}h ${mins}m`)}`);

console.log(
	c.bold("\n── Quality Metrics (aggregate) ──────────────────────────────\n"),
);
console.log(
	`  SVG coverage    ${bar(avgSvg)} ${pct(avgSvg)}  ${avgSvg >= SVG_TARGET_RATIO ? c.green("✓ target ≥50%") : c.red("✗ below 50%")}`,
);
console.log(
	`  Assertive titles${bar(avgAssertive)} ${pct(avgAssertive)}  ${avgAssertive >= ASSERTIVE_TARGET_RATIO ? c.green("✓ target ≥60%") : c.red("✗ below 60%")}`,
);
console.log(
	`  Subtitle (BLUF) ${bar(avgSubtitle)} ${pct(avgSubtitle)}  ${avgSubtitle >= SUBTITLE_GOOD_RATIO ? c.green("✓") : c.yellow("low — add subtitle fields")}`,
);

console.log(
	c.bold("\n── Grade Distribution ───────────────────────────────────────\n"),
);
console.log(
	`  ${c.green("A")} (≥70pts) ${String(gradeDist.A).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.A / decks.length) * 40))}`,
);
console.log(
	`  ${c.blue("B")} (≥50pts) ${String(gradeDist.B).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.B / decks.length) * 40))}`,
);
console.log(
	`  ${c.yellow("C")} (≥30pts) ${String(gradeDist.C).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.C / decks.length) * 40))}`,
);
console.log(
	`  ${c.red("D")} (<30pts) ${String(gradeDist.D).padStart(3)} decks  ${"█".repeat(Math.round((gradeDist.D / decks.length) * 40))}`,
);

// --worst: show only C/D grade decks as improvement targets
const isWorst = process.argv.includes("--worst") || process.argv.includes("-w");
if (isWorst) {
	const targets = decks
		.filter((d) => d.metrics.grade === "C" || d.metrics.grade === "D")
		.sort((a, b) => {
			const gOrder = { A: 0, B: 1, C: 2, D: 3 };
			return gOrder[b.grade] - gOrder[a.grade]; // D first
		});

	if (targets.length === 0) {
		console.log(
			c.green("\n  No C/D grade decks — all presentations are B or better!\n"),
		);
	} else {
		console.log(
			c.bold(
				`\n── Improvement Targets (${targets.length} decks) ────────────────────────\n`,
			),
		);
		console.log(c.dim("  Grade  SVG    Assert  Subtitle  Slides  Topic"));
		console.log(c.dim("  ─────  ─────  ──────  ────────  ──────  ─────"));
		for (const d of targets) {
			const issues: string[] = [];
			if (d.metrics.svgRatio < 0.3) issues.push("SVG");
			if (d.metrics.assertiveRatio < 0.4) issues.push("Titles");
			if (d.metrics.subtitleRatio === 0) issues.push("BLUF");
			const topic = d.topic.length > 38 ? `${d.topic.slice(0, 35)}…` : d.topic;
			const issueStr =
				issues.length > 0 ? c.red(` ← fix: ${issues.join(", ")}`) : "";
			console.log(
				`  ${gradeColor(d.metrics.grade)}      ${pct(d.metrics.svgRatio)}  ${pct(d.metrics.assertiveRatio)}    ${pct(d.metrics.subtitleRatio)}    ${String(d.slides.length).padStart(4)}    ${topic}${issueStr}`,
			);
		}
		console.log(
			c.dim("\n  Run: bun run validate:quality  to see per-slide detail"),
		);
	}
}

// --verbose: show per-deck breakdown
if (
	!isWorst &&
	(process.argv.includes("--verbose") || process.argv.includes("-v"))
) {
	console.log(
		c.bold("\n── Per-deck breakdown ───────────────────────────────────────\n"),
	);
	console.log(c.dim("  Grade  SVG    Assert  Subtitle  Slides  Topic"));
	console.log(c.dim("  ─────  ─────  ──────  ────────  ──────  ─────"));

	const sorted = [...decks].sort((a, b) => {
		const gOrder = { A: 0, B: 1, C: 2, D: 3 };
		return gOrder[a.grade] - gOrder[b.grade];
	});

	for (const d of sorted) {
		const topic = d.topic.length > 45 ? `${d.topic.slice(0, 42)}…` : d.topic;
		console.log(
			`  ${gradeColor(d.metrics.grade)}      ${pct(d.metrics.svgRatio)}  ${pct(d.metrics.assertiveRatio)}    ${pct(d.metrics.subtitleRatio)}    ${String(d.slides.length).padStart(4)}    ${topic}`,
		);
	}
}

// Opportunities
const lowSvg = decks.filter((d) => d.metrics.svgRatio < 0.3).length;
const lowAssertive = decks.filter((d) => d.metrics.assertiveRatio < 0.4).length;
const noSubtitle = decks.filter((d) => d.metrics.subtitleRatio === 0).length;

if (lowSvg + lowAssertive + noSubtitle > 0) {
	console.log(
		c.bold("\n── Improvement Opportunities ────────────────────────────────\n"),
	);
	if (lowSvg > 0)
		console.log(
			c.yellow(
				`  ${lowSvg} decks with <30% SVG coverage — add diagrams (figure-first principle)`,
			),
		);
	if (lowAssertive > 0)
		console.log(
			c.yellow(
				`  ${lowAssertive} decks with <40% assertive titles — rewrite label titles as conclusions`,
			),
		);
	if (noSubtitle > 0)
		console.log(
			c.dim(
				`  ${noSubtitle} decks with 0% subtitle (BLUF) — add "subtitle" field to key slides`,
			),
		);
	console.log(
		c.dim("\n  Run: bun run validate:quality  to see per-slide detail"),
	);
}

console.log();

// --export csv: write all deck metrics to a CSV file
if (exportFormat === "csv") {
	const csvPath = "slide-stats.csv";
	const header =
		"dir,topic,slides,readingMins,svgRatio,assertiveRatio,subtitleRatio,grade";
	const rows = decks.map((d) =>
		[
			d.dir,
			`"${d.topic.replace(/"/g, '""')}"`,
			d.slides.length,
			d.metrics.readingMins,
			d.metrics.svgRatio.toFixed(3),
			d.metrics.assertiveRatio.toFixed(3),
			d.metrics.subtitleRatio.toFixed(3),
			d.metrics.grade,
		].join(","),
	);
	const csv = [header, ...rows].join("\n");
	await Bun.write(csvPath, csv);
	console.log(`\n📄 Exported ${decks.length} rows to ${csvPath}`);
}
