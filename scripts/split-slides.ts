#!/usr/bin/env bun
/**
 * Split Slides — TypeScript replacement for split-bullet-overflow.py and split-code-diagrams.py
 *
 * Modes:
 *   --mode bullets  Split slides with 8+ bullet points into two slides (1/2, 2/2)
 *   --mode code     Split slides with both code and content into separate slides
 *
 * Usage:
 *   bun run scripts/split-slides.ts --mode bullets --all
 *   bun run scripts/split-slides.ts --mode code --all
 *   bun run scripts/split-slides.ts --mode bullets docs/20260214.../slides-data.json
 *   bun run scripts/split-slides.ts --mode code   docs/20260214.../slides-data.json
 */

import { Glob } from "bun";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SlideObject {
	title: string;
	content: string[];
	code?: string;
	codeLanguage?: string;
	layout?: string;
	subtitle?: string;
	speakerNotes?: string;
	[key: string]: unknown;
}

interface SlidesData {
	slides: SlideObject[];
	[key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Bullet split (max 7 bullets per slide)
// ---------------------------------------------------------------------------

const MAX_BULLETS = 7;

function splitBullets(slides: SlideObject[]): [SlideObject[], number] {
	const result: SlideObject[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const content = slide.content ?? [];
		const bullets = content.filter(
			(c) => !c.startsWith("|") && !c.startsWith("!["),
		);
		const nonBullets = content.filter(
			(c) => c.startsWith("|") || c.startsWith("!["),
		);

		if (bullets.length > MAX_BULLETS) {
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
		} else {
			result.push(slide);
		}
	}

	return [result, splitCount];
}

// ---------------------------------------------------------------------------
// Code split (separate code block from bullet content)
// ---------------------------------------------------------------------------

function splitCode(slides: SlideObject[]): [SlideObject[], number] {
	const result: SlideObject[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const hasCode = Boolean(slide.code?.trim());
		const hasContent = (slide.content ?? []).length > 0;

		if (hasCode && hasContent) {
			splitCount++;
			// Slide 1: explanation only (preserve layout/subtitle)
			const slide1: SlideObject = {
				title: slide.title,
				content: slide.content,
			};
			if (slide.layout) slide1.layout = slide.layout;
			if (slide.subtitle) slide1.subtitle = slide.subtitle;
			result.push(slide1);

			// Slide 2: code block only
			result.push({
				title: `${slide.title}（コード例）`,
				content: [],
				code: slide.code,
				codeLanguage: slide.codeLanguage ?? "text",
			});
		} else {
			result.push(slide);
		}
	}

	return [result, splitCount];
}

// ---------------------------------------------------------------------------
// Process single file
// ---------------------------------------------------------------------------

async function processFile(
	path: string,
	mode: "bullets" | "code",
): Promise<number> {
	let data: SlidesData;
	try {
		data = (await Bun.file(path).json()) as SlidesData;
	} catch {
		console.error(`❌ Cannot read: ${path}`);
		return 0;
	}

	const original = data.slides.length;
	let splitCount: number;

	if (mode === "bullets") {
		[data.slides, splitCount] = splitBullets(data.slides);
	} else {
		[data.slides, splitCount] = splitCode(data.slides);
	}

	if (splitCount > 0) {
		await Bun.write(path, JSON.stringify(data, null, 2));
		const dirName = path.split("/").slice(-2, -1)[0] ?? path;
		console.log(
			`✅ ${dirName}: split ${splitCount} slides (${original} → ${data.slides.length})`,
		);
	}

	return splitCount;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const modeIdx = args.indexOf("--mode");
const modeArg = modeIdx >= 0 ? args[modeIdx + 1] : undefined;

if (!modeArg || (modeArg !== "bullets" && modeArg !== "code")) {
	console.error(
		"Usage: bun run scripts/split-slides.ts --mode <bullets|code> [--all | <path>]",
	);
	process.exit(1);
}

const mode = modeArg as "bullets" | "code";
const isAll = args.includes("--all");
const pathArg = args.find(
	(a, i) => !a.startsWith("-") && args[i - 1] !== "--mode",
);

if (isAll) {
	const glob = new Glob("docs/*/slides-data.json");
	const files = Array.from(glob.scanSync()).sort();
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
