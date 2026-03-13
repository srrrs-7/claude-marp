#!/usr/bin/env bun
/**
 * Split slides with more than MAX_BULLETS plain bullets into two slides (1/2) and (2/2).
 * Replaces scripts/split-bullet-overflow.py
 *
 * Usage:
 *   bun run scripts/split-bullet-overflow.ts --all
 *   bun run scripts/split-bullet-overflow.ts docs/my-deck/slides-data.json
 */

import { Glob } from "bun";

const MAX_BULLETS = 7;

interface Slide {
	title?: string;
	subtitle?: string;
	content?: string[];
	code?: string;
	codeLanguage?: string;
	speakerNotes?: string;
	layout?: string;
}

interface SlideData {
	slides: Slide[];
}

function splitBullets(slides: Slide[]): {
	slides: Slide[];
	splitCount: number;
} {
	const newSlides: Slide[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const content = slide.content ?? [];
		// Only count plain bullets (not table rows or image directives)
		const bullets = content.filter(
			(c) => !c.startsWith("|") && !c.startsWith("!["),
		);
		const nonBullets = content.filter(
			(c) => c.startsWith("|") || c.startsWith("!["),
		);

		if (bullets.length > MAX_BULLETS) {
			splitCount++;
			const mid = Math.floor(bullets.length / 2);

			// Slide 1: first half — preserve all fields
			const slide1: Slide = {
				...slide,
				title: `${slide.title ?? ""}（1/2）`,
				content: [...bullets.slice(0, mid), ...nonBullets],
			};
			// subtitle/speakerNotes only on first slide
			newSlides.push(slide1);

			// Slide 2: second half — no subtitle/speakerNotes (continuation)
			const { subtitle: _sub, speakerNotes: _notes, ...rest } = slide;
			const slide2: Slide = {
				...rest,
				title: `${slide.title ?? ""}（2/2）`,
				content: [...bullets.slice(mid), ...nonBullets],
			};
			newSlides.push(slide2);
		} else {
			newSlides.push(slide);
		}
	}

	return { slides: newSlides, splitCount };
}

async function processFile(filePath: string): Promise<number> {
	const file = Bun.file(filePath);
	if (!(await file.exists())) {
		console.error(`❌ File not found: ${filePath}`);
		return 0;
	}

	try {
		const data = (await file.json()) as SlideData;
		const original = data.slides.length;
		const { slides, splitCount } = splitBullets(data.slides);

		if (splitCount > 0) {
			data.slides = slides;
			await Bun.write(filePath, JSON.stringify(data, null, 2));
			const dirName = filePath.split("/").slice(-2, -1)[0];
			console.log(
				`✅ ${dirName}: split ${splitCount} slides (${original} → ${slides.length})`,
			);
		}

		return splitCount;
	} catch (err) {
		console.error(
			`❌ Error processing ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
		);
		return 0;
	}
}

async function main() {
	const args = process.argv.slice(2);

	if (args[0] === "--all") {
		const glob = new Glob("docs/**/slides-data.json");
		const files = Array.from(glob.scanSync()).sort();
		let total = 0;
		for (const f of files) {
			total += await processFile(f);
		}
		console.log(`\n📊 Total: ${total} slides split`);
	} else if (args[0]) {
		await processFile(args[0]);
	} else {
		console.error("Usage:");
		console.error("  bun run scripts/split-bullet-overflow.ts --all");
		console.error(
			"  bun run scripts/split-bullet-overflow.ts docs/my-deck/slides-data.json",
		);
		process.exit(1);
	}
}

main();
