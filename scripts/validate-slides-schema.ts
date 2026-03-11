#!/usr/bin/env bun

import { Glob } from "bun";
import { z } from "zod";
import { generationResultSchema } from "../src/generate/slide-schema.js";
import {
	type SlideRecord,
	estimateMins,
	hasSvg,
	isAssertive,
} from "./lib/quality.js";

interface ValidationError {
	file: string;
	errors: string[];
}

interface QualityWarning {
	slideIndex: number;
	title: string;
	type: string;
	message: string;
}

// ---------------------------------------------------------------------------
// Quality helpers (Google / Amazon best practices)
// ---------------------------------------------------------------------------

/** Max recommended chars per bullet (Japanese ~50, English ~80). */
const MAX_BULLET_CHARS = 60;

/** Return duplicate titles within a single deck */
function findDuplicateTitles(slides: Array<{ title?: string }>): string[] {
	const seen = new Map<string, number>();
	for (const slide of slides) {
		const t = (slide.title ?? "").trim();
		if (t) seen.set(t, (seen.get(t) ?? 0) + 1);
	}
	return [...seen.entries()].filter(([, n]) => n > 1).map(([t]) => t);
}

/**
 * Check slide quality against Google / Amazon presentation principles.
 * Returns a list of warnings (not errors — deck is still valid).
 */
function checkQuality(
	slides: Array<{
		title?: string;
		subtitle?: string;
		content?: string[];
		code?: string;
		layout?: string;
		speakerNotes?: string;
	}>,
): QualityWarning[] {
	const warnings: QualityWarning[] = [];

	let consecutiveTextOnly = 0;

	for (let i = 0; i < slides.length; i++) {
		const slide = slides[i];
		const title = (slide.title ?? "").trim();
		const layout = slide.layout ?? "default";
		const content = slide.content ?? [];
		const slideHasSvg = hasSvg(slide as SlideRecord);
		const hasCode = !!slide.code;
		const isContentSlide = layout === "default";

		// ── 1. Assertive title check (label title on content slide) ────────
		if (isContentSlide && !isAssertive(title)) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "label_title",
				message: `Generic label title "${title}" — state the conclusion instead (e.g. "コストが40%削減できる理由" not "コスト削減")`,
			});
		}

		// ── 2. Long bullet warning ──────────────────────────────────────────
		for (const item of content) {
			if (
				!item.startsWith("|") &&
				!item.startsWith("![") &&
				!item.includes("<svg") &&
				item.length > MAX_BULLET_CHARS
			) {
				warnings.push({
					slideIndex: i + 1,
					title,
					type: "long_bullet",
					message: `Bullet too long (${item.length} chars > ${MAX_BULLET_CHARS}): "${item.slice(0, 40)}…" — split or condense for readability`,
				});
				break; // one warning per slide
			}
		}

		// ── 3. Missing subtitle on key content slides ───────────────────────
		// Only flag if it's a long (≥ 4 bullets) content slide with no subtitle and no SVG
		if (
			isContentSlide &&
			content.length >= 4 &&
			!slideHasSvg &&
			!hasCode &&
			!slide.subtitle
		) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "missing_subtitle",
				message: `Dense text slide with no subtitle (BLUF) — add "subtitle" field with the "so what?" one-liner`,
			});
		}

		// ── 4. Consecutive text-only slides ────────────────────────────────
		if (isContentSlide && !slideHasSvg && !hasCode) {
			consecutiveTextOnly++;
			if (consecutiveTextOnly >= 3) {
				warnings.push({
					slideIndex: i + 1,
					title,
					type: "consecutive_text",
					message: `3+ consecutive text-only slides (slides ${i - 1}–${i + 1}) — insert an SVG diagram to break the pattern`,
				});
			}
		} else {
			consecutiveTextOnly = 0;
		}

		// ── 5. Missing speaker notes on content slides ─────────────────────
		if (isContentSlide && !slide.speakerNotes && content.length > 0) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "missing_notes",
				message: `No speaker notes — add "why this matters" / evidence / transition to next slide`,
			});
		}
	}

	// ── 6. Narrative arc check (deck-level) ──────────────────────────────
	const contentSlides = slides.filter(
		(s) => (s.layout ?? "default") === "default",
	);
	const assertiveCount = contentSlides.filter((s) =>
		isAssertive(s.title ?? ""),
	).length;
	const assertiveRatio =
		contentSlides.length > 0 ? assertiveCount / contentSlides.length : 1;

	if (contentSlides.length >= 5 && assertiveRatio < 0.6) {
		warnings.push({
			slideIndex: 0,
			title: "(deck-level)",
			type: "weak_narrative",
			message: `Only ${Math.round(assertiveRatio * 100)}% of content slides have assertive titles (target ≥60%). Titles should state conclusions, not just topics.`,
		});
	}

	return warnings;
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
			const quality = showQuality ? checkQuality(slides) : [];

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

	const totalHours = Math.floor(totalReadingMins / 60);
	const remainMins = totalReadingMins % 60;
	const timeStr =
		totalHours > 0 ? `${totalHours}h ${remainMins}m` : `${totalReadingMins}m`;

	console.log(
		`\n📊 Summary: ${validCount} valid, ${invalidCount} invalid` +
			(dupeWarnings > 0 ? `, ${dupeWarnings} with duplicate titles` : "") +
			(qualityWarningCount > 0
				? `, ${qualityWarningCount} quality warnings`
				: "") +
			` | ${totalSlideCount} slides | ~${timeStr} total reading time`,
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

	process.exit(invalidCount > 0 ? 1 : 0);
}

validateAllSlides();
