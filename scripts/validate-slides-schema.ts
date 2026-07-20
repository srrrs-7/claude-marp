#!/usr/bin/env bun
/**
 * bun run validate [--quality] — Zod-validate every deck's slides-data.json.
 *
 * Exit codes:
 *   0 — all valid, no issues
 *   1 — schema errors (invalid slides-data.json)
 *   2 — quality warnings only (--quality flag, no schema errors)
 */

import { Glob } from "bun";
import { z } from "zod";
import { DATA_FILENAME } from "../src/constants.js";
import { generationResultSchema } from "../src/generate/slide-schema.js";
import { EXIT } from "./lib/exit-codes.js";
import {
	type SlideRecord,
	estimateMins,
	validateSlideQuality,
} from "./lib/quality.js";

/** How many cross-deck duplicate titles to print before truncating. */
const MAX_CROSS_DECK_REPORTED = 20;

/** Outcome of reading + schema-validating one slides-data.json. */
type DeckResult =
	| { file: string; ok: true; slides: SlideRecord[] }
	| { file: string; ok: false; errors: string[] };

/** Return titles that appear more than once within a single deck. */
function findDuplicateTitles(slides: SlideRecord[]): string[] {
	const seen = new Map<string, number>();
	for (const slide of slides) {
		const t = (slide.title ?? "").trim();
		if (t) seen.set(t, (seen.get(t) ?? 0) + 1);
	}
	return [...seen.entries()].filter(([, n]) => n > 1).map(([t]) => t);
}

/** Read and schema-validate a single deck. Never throws. */
async function readDeck(file: string): Promise<DeckResult> {
	try {
		const data = await Bun.file(file).json();
		const parsed = generationResultSchema.parse(data);
		return { file, ok: true, slides: parsed.slides };
	} catch (error) {
		const errors =
			error instanceof z.ZodError
				? error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
				: [error instanceof Error ? error.message : String(error)];
		return { file, ok: false, errors };
	}
}

/**
 * Titles shared by two or more *different* decks. Copy-pasted decks are a
 * common failure mode, so this catches drift the per-deck check can't see.
 */
function findCrossDeckDuplicates(
	decks: DeckResult[],
): Array<[title: string, deckNames: string[]]> {
	const titleToDecks = new Map<string, Set<string>>();
	for (const deck of decks) {
		if (!deck.ok) continue;
		const deckName = deck.file.split("/")[1] ?? deck.file;
		for (const slide of deck.slides) {
			const t = (slide.title ?? "").trim();
			if (!t) continue;
			const bucket = titleToDecks.get(t);
			if (bucket) bucket.add(deckName);
			else titleToDecks.set(t, new Set([deckName]));
		}
	}
	return [...titleToDecks.entries()]
		.filter(([, deckNames]) => deckNames.size > 1)
		.map(([title, deckNames]) => [title, [...deckNames]]);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function validateAllSlides(): Promise<never> {
	const files = Array.from(new Glob(`docs/**/${DATA_FILENAME}`).scanSync());

	if (files.length === 0) {
		console.log(`ℹ️  No ${DATA_FILENAME} files found in docs/`);
		process.exit(EXIT.SUCCESS);
	}

	// --quality flag shows per-slide quality warnings
	const showQuality = process.argv.includes("--quality");

	console.log(
		`🔍 Validating slides data files${showQuality ? " (quality mode)" : ""}...\n`,
	);

	// Read every deck exactly once — both the per-deck report and the
	// cross-deck title scan below run off this single pass.
	const decks = await Promise.all(files.map(readDeck));

	let validCount = 0;
	let totalSlideCount = 0;
	let totalReadingMins = 0;
	let dupeWarnings = 0;
	let qualityWarningCount = 0;
	const invalid: Array<{ file: string; errors: string[] }> = [];

	for (const deck of decks) {
		if (!deck.ok) {
			console.log(`❌ ${deck.file}`);
			for (const err of deck.errors) console.log(`   - ${err}`);
			invalid.push({ file: deck.file, errors: deck.errors });
			continue;
		}

		const { file, slides } = deck;
		const dupes = findDuplicateTitles(slides);
		const mins = estimateMins(slides);
		const quality = showQuality ? validateSlideQuality(slides) : [];

		totalSlideCount += slides.length;
		totalReadingMins += mins;
		qualityWarningCount += quality.length;
		validCount++;

		if (dupes.length > 0 || quality.length > 0) {
			console.log(`⚠️  ${file} (${slides.length} slides, ~${mins} min)`);
			for (const t of dupes) console.log(`   - Duplicate title: "${t}"`);
			for (const w of quality) {
				console.log(`   [${w.type}] slide ${w.slideIndex}: ${w.message}`);
			}
			if (dupes.length > 0) dupeWarnings++;
		} else {
			console.log(`✅ ${file} (${slides.length} slides, ~${mins} min)`);
		}
	}

	const crossDeckDupes = findCrossDeckDuplicates(decks);
	if (crossDeckDupes.length > 0) {
		console.log(`\n🔁 Cross-deck duplicate titles (${crossDeckDupes.length}):`);
		for (const [title, deckNames] of crossDeckDupes.slice(
			0,
			MAX_CROSS_DECK_REPORTED,
		)) {
			console.log(`   "${title}" — in: ${deckNames.join(", ")}`);
		}
		if (crossDeckDupes.length > MAX_CROSS_DECK_REPORTED) {
			console.log(
				`   ... and ${crossDeckDupes.length - MAX_CROSS_DECK_REPORTED} more`,
			);
		}
	}

	const totalHours = Math.floor(totalReadingMins / 60);
	const timeStr =
		totalHours > 0
			? `${totalHours}h ${totalReadingMins % 60}m`
			: `${totalReadingMins}m`;

	const summaryParts = [
		`${validCount} valid`,
		`${invalid.length} invalid`,
		...(dupeWarnings > 0 ? [`${dupeWarnings} with duplicate titles`] : []),
		...(qualityWarningCount > 0
			? [`${qualityWarningCount} quality warnings`]
			: []),
		...(crossDeckDupes.length > 0
			? [`${crossDeckDupes.length} cross-deck duplicate titles`]
			: []),
	];
	console.log(
		`\n📊 Summary: ${summaryParts.join(", ")} | ${totalSlideCount} slides | ~${timeStr} total reading time`,
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

	if (invalid.length > 0) {
		console.log("\n❌ Validation failed. Fix the following errors:\n");
		for (const { file, errors } of invalid) {
			console.log(`${file}:`);
			for (const err of errors) console.log(`  - ${err}`);
			console.log();
		}
		console.log("💡 Common fixes:");
		console.log('  - Change "bullets" field to "content"');
		console.log('  - Use valid layout values: "default", "center", "section"');
		console.log("  - Ensure all required fields are present");
		process.exit(EXIT.ERROR);
	}

	console.log("\n✨ All slides data files are valid!");
	process.exit(
		showQuality && qualityWarningCount > 0 ? EXIT.WARNINGS : EXIT.SUCCESS,
	);
}

await validateAllSlides();
