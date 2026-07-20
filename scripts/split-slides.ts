#!/usr/bin/env bun
/**
 * Split Slides — break up slides that would overflow their frame.
 *
 * Modes:
 *   --mode bullets  Split slides with more than MAX_BULLETS_PER_SLIDE bullets into (1/2) + (2/2)
 *   --mode code     Split slides carrying both a code block and bullets into two slides
 *
 * Usage:
 *   bun run scripts/split-slides.ts --mode bullets --all
 *   bun run scripts/split-slides.ts --mode code   --all
 *   bun run scripts/split-slides.ts --mode bullets docs/20260214.../slides-data.json
 */

import { Glob } from "bun";
import { DATA_FILENAME } from "../src/constants.js";
import type { SlideContent } from "../src/generate/slide-schema.js";
import { saveSlidesData } from "../src/model/presentation.js";
import { MAX_BULLETS_PER_SLIDE } from "./lib/constants.js";

type Mode = "bullets" | "code";

const MODES: Mode[] = ["bullets", "code"];

interface SplitResult {
	slides: SlideContent[];
	splitCount: number;
}

/** Content items rendered verbatim (table rows, image directives) aren't bullets. */
function isBullet(item: string): boolean {
	return !item.startsWith("|") && !item.startsWith("![");
}

// ---------------------------------------------------------------------------
// Bullet split
// ---------------------------------------------------------------------------

function splitBullets(slides: SlideContent[]): SplitResult {
	const result: SlideContent[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const content = slide.content ?? [];
		const bullets = content.filter(isBullet);
		const nonBullets = content.filter((c) => !isBullet(c));

		if (bullets.length <= MAX_BULLETS_PER_SLIDE) {
			result.push(slide);
			continue;
		}

		splitCount++;
		const mid = Math.floor(bullets.length / 2);
		result.push({
			...slide,
			title: `${slide.title}（1/2）`,
			content: [...bullets.slice(0, mid), ...nonBullets],
		});
		result.push({
			...slide,
			title: `${slide.title}（2/2）`,
			content: [...bullets.slice(mid), ...nonBullets],
		});
	}

	return { slides: result, splitCount };
}

// ---------------------------------------------------------------------------
// Code split
// ---------------------------------------------------------------------------

function splitCode(slides: SlideContent[]): SplitResult {
	const result: SlideContent[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const hasCode = Boolean(slide.code?.trim());
		const hasContent = (slide.content ?? []).length > 0;

		if (!hasCode || !hasContent) {
			result.push(slide);
			continue;
		}

		splitCount++;
		// Slide 1: explanation only (keeps layout/subtitle)
		const explanation: SlideContent = {
			title: slide.title,
			content: slide.content,
		};
		if (slide.layout) explanation.layout = slide.layout;
		if (slide.subtitle) explanation.subtitle = slide.subtitle;
		result.push(explanation);

		// Slide 2: code block only
		result.push({
			title: `${slide.title}（コード例）`,
			content: [],
			code: slide.code,
			codeLanguage: slide.codeLanguage ?? "text",
		});
	}

	return { slides: result, splitCount };
}

const SPLITTERS: Record<Mode, (slides: SlideContent[]) => SplitResult> = {
	bullets: splitBullets,
	code: splitCode,
};

// ---------------------------------------------------------------------------
// Process a single deck
// ---------------------------------------------------------------------------

async function processFile(path: string, mode: Mode): Promise<number> {
	let data: { slides: SlideContent[] };
	try {
		data = (await Bun.file(path).json()) as { slides: SlideContent[] };
	} catch {
		console.error(`❌ Cannot read: ${path}`);
		return 0;
	}

	const original = data.slides.length;
	const { slides, splitCount } = SPLITTERS[mode](data.slides);

	if (splitCount > 0) {
		await saveSlidesData(path, slides);
		const dirName = path.split("/").slice(-2, -1)[0] ?? path;
		console.log(
			`✅ ${dirName}: split ${splitCount} slides (${original} → ${slides.length})`,
		);
	}

	return splitCount;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function usage(): never {
	console.error(
		"Usage: bun run scripts/split-slides.ts --mode <bullets|code> [--all | <path>]",
	);
	process.exit(1);
}

const args = process.argv.slice(2);
const modeIdx = args.indexOf("--mode");
const modeArg = modeIdx >= 0 ? args[modeIdx + 1] : undefined;

if (!modeArg || !MODES.includes(modeArg as Mode)) usage();
const mode = modeArg as Mode;

const pathArg = args.find(
	(a, i) => !a.startsWith("-") && args[i - 1] !== "--mode",
);

if (args.includes("--all")) {
	const files = Array.from(
		new Glob(`docs/*/${DATA_FILENAME}`).scanSync(),
	).sort();
	let total = 0;
	for (const file of files) {
		total += await processFile(file, mode);
	}
	console.log(`\n📊 Total: ${total} slides split (mode: ${mode})`);
} else if (pathArg) {
	await processFile(pathArg, mode);
} else {
	console.error("Provide --all or a path to a slides-data.json file");
	process.exit(1);
}
