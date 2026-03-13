#!/usr/bin/env bun
/**
 * Exit codes:
 *   0 — all valid, no issues
 *   1 — schema errors (invalid slides-data.json)
 *   2 — quality warnings only (--quality flag, no schema errors)
 */

import { Glob } from "bun";
import { z } from "zod";
import { generationResultSchema } from "../src/generate/slide-schema.js";
import { EXIT } from "./lib/exit-codes.js";
import {
	type QualityWarning,
	type SlideRecord,
	estimateMins,
	validateSlideQuality,
} from "./lib/quality.js";

interface ValidationError {
	file: string;
	errors: string[];
}

/** Return duplicate titles within a single deck */
function findDuplicateTitles(slides: Array<{ title?: string }>): string[] {
	const seen = new Map<string, number>();
	for (const slide of slides) {
		const t = (slide.title ?? "").trim();
		if (t) seen.set(t, (seen.get(t) ?? 0) + 1);
	}
	return [...seen.entries()].filter(([, n]) => n > 1).map(([t]) => t);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function validateAllSlides() {
	const glob = new Glob("docs/**/slides-data.json");
	const files = Array.from(glob.scanSync());

	if (files.length === 0) {
		console.log("ℹ️  No slides-data.json files found in docs/");
		return;
	}

	let validCount = 0;
	let invalidCount = 0;
	let totalSlideCount = 0;
	let totalReadingMins = 0;
	let dupeWarnings = 0;
	let qualityWarningCount = 0;
	const errors: ValidationError[] = [];

	// --quality flag shows per-slide quality warnings
	const showQuality = process.argv.includes("--quality");

	console.log(
		`🔍 Validating slides data files${showQuality ? " (quality mode)" : ""}...\n`,
	);

	for (const file of files) {
		try {
			const data = await Bun.file(file).json();
			generationResultSchema.parse(data);

			const slides = data.slides ?? [];
			const dupes = findDuplicateTitles(slides);
			const mins = estimateMins(slides as SlideRecord[]);
			const quality = showQuality
				? validateSlideQuality(slides as SlideRecord[])
				: [];

			totalSlideCount += slides.length;
			totalReadingMins += mins;
			qualityWarningCount += quality.length;

			const hasIssues = dupes.length > 0 || quality.length > 0;

			if (hasIssues) {
				console.log(`⚠️  ${file} (${slides.length} slides, ~${mins} min)`);
				for (const t of dupes) console.log(`   - Duplicate title: "${t}"`);
				for (const w of quality)
					console.log(`   [${w.type}] slide ${w.slideIndex}: ${w.message}`);
				if (dupes.length > 0) dupeWarnings++;
			} else {
				console.log(`✅ ${file} (${slides.length} slides, ~${mins} min)`);
			}
			validCount++;
		} catch (error) {
			console.log(`❌ ${file}`);
			const fileErrors: string[] = [];

			if (error instanceof z.ZodError) {
				for (const issue of error.issues) {
					const errorMsg = `${issue.path.join(".")}: ${issue.message}`;
					console.log(`   - ${errorMsg}`);
					fileErrors.push(errorMsg);
				}
			} else {
				const errorMsg = error instanceof Error ? error.message : String(error);
				console.log(`   - ${errorMsg}`);
				fileErrors.push(errorMsg);
			}

			errors.push({ file, errors: fileErrors });
			invalidCount++;
		}
	}

	// ── Cross-deck duplicate title detection ──────────────────────────────────
	const titleToDeck = new Map<string, string[]>();
	for (const file of files) {
		try {
			const data = await Bun.file(file).json();
			const slides = data.slides ?? [];
			for (const slide of slides) {
				const t = ((slide.title as string) ?? "").trim();
				if (!t) continue;
				const decks = titleToDeck.get(t) ?? [];
				decks.push(file);
				titleToDeck.set(t, decks);
			}
		} catch {
			// already reported as invalid above
		}
	}
	const crossDeckDupes = [...titleToDeck.entries()].filter(([, decks]) => {
		// Only flag if same title appears in 2+ DIFFERENT decks
		const uniqueDecks = new Set(
			decks.map((f) => f.split("/").slice(0, 2).join("/")),
		);
		return uniqueDecks.size > 1;
	});
	if (crossDeckDupes.length > 0) {
		console.log(`\n🔁 Cross-deck duplicate titles (${crossDeckDupes.length}):`);
		for (const [title, decks] of crossDeckDupes.slice(0, 20)) {
			const uniqueDecks = [...new Set(decks.map((f) => f.split("/")[1]))];
			console.log(`   "${title}" — in: ${uniqueDecks.join(", ")}`);
		}
		if (crossDeckDupes.length > 20) {
			console.log(`   ... and ${crossDeckDupes.length - 20} more`);
		}
	}

	const totalHours = Math.floor(totalReadingMins / 60);
	const remainMins = totalReadingMins % 60;
	const timeStr =
		totalHours > 0 ? `${totalHours}h ${remainMins}m` : `${totalReadingMins}m`;

	console.log(
		`\n📊 Summary: ${validCount} valid, ${invalidCount} invalid${dupeWarnings > 0 ? `, ${dupeWarnings} with duplicate titles` : ""}${
			qualityWarningCount > 0 ? `, ${qualityWarningCount} quality warnings` : ""
		}${crossDeckDupes.length > 0 ? `, ${crossDeckDupes.length} cross-deck duplicate titles` : ""} | ${totalSlideCount} slides | ~${timeStr} total reading time`,
	);

	if (showQuality && qualityWarningCount > 0) {
		console.log(
			"\n💡 Quality tips (Google/Amazon best practices):\n" +
				"  - Assertive titles: state the conclusion, not just the topic\n" +
				'  - BLUF: add "subtitle" field for the one-line "so what?"\n' +
				"  - Max 60 chars per bullet — short, scannable points\n" +
				"  - Insert SVG every 2-3 slides — picture superiority effect",
		);
	}

	if (invalidCount > 0) {
		console.log("\n❌ Validation failed. Fix the following errors:\n");
		for (const { file, errors: fileErrors } of errors) {
			console.log(`${file}:`);
			for (const err of fileErrors) {
				console.log(`  - ${err}`);
			}
			console.log();
		}
		console.log("💡 Common fixes:");
		console.log('  - Change "bullets" field to "content"');
		console.log('  - Use valid layout values: "default", "center", "section"');
		console.log("  - Ensure all required fields are present");
	} else {
		console.log("\n✨ All slides data files are valid!");
	}

	if (invalidCount > 0) {
		process.exit(EXIT.ERROR);
	} else if (showQuality && qualityWarningCount > 0) {
		process.exit(EXIT.WARNINGS);
	} else {
		process.exit(EXIT.SUCCESS);
	}
}

validateAllSlides();
