#!/usr/bin/env bun
/**
 * Split slides that have both bullet content AND a code block into two slides.
 * Replaces scripts/split-code-diagrams.py
 *
 * Slide A: Title + bullet points (explanation) — preserves subtitle, speakerNotes, layout
 * Slide B: Title + "（コード例）" + code block only
 *
 * Usage:
 *   bun run scripts/split-code-diagrams.ts --all
 *   bun run scripts/split-code-diagrams.ts docs/my-deck/slides-data.json
 */

import { Glob } from "bun";
// MAX_BULLET_CHARS is available from "./lib/constants.js" for future use in overflow checks.

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

function splitCodeDiagrams(slides: Slide[]): {
	slides: Slide[];
	splitCount: number;
} {
	const newSlides: Slide[] = [];
	let splitCount = 0;

	for (const slide of slides) {
		const hasCode = !!slide.code;
		const hasContent = (slide.content ?? []).length > 0;

		if (hasCode && hasContent) {
			splitCount++;

			// Slide 1: explanation only — preserve subtitle, speakerNotes, layout
			const { code: _code, codeLanguage: _lang, ...slideBase } = slide;
			const slide1: Slide = { ...slideBase };
			newSlides.push(slide1);

			// Slide 2: code block only — no subtitle/speakerNotes
			const slide2: Slide = {
				title: `${slide.title ?? ""}（コード例）`,
				content: [],
				code: slide.code,
				codeLanguage: slide.codeLanguage ?? "text",
				layout: slide.layout,
			};
			newSlides.push(slide2);
		} else {
			newSlides.push(slide);
		}
	}

	return { slides: newSlides, splitCount };
}

async function processFile(filePath: string): Promise<boolean> {
	const file = Bun.file(filePath);
	if (!(await file.exists())) {
		console.error(`❌ File not found: ${filePath}`);
		return false;
	}

	console.log(`📄 Processing: ${filePath}`);

	try {
		const data = (await file.json()) as SlideData;
		const originalCount = data.slides.length;
		const { slides, splitCount } = splitCodeDiagrams(data.slides);
		data.slides = slides;

		await Bun.write(filePath, JSON.stringify(data, null, 2));
		console.log(`  ✅ Split ${splitCount} slides`);
		console.log(`  📊 ${originalCount} → ${slides.length} slides\n`);

		// Update slides.count in config to reflect new slide count
		const configPath = filePath.replace(
			"slides-data.json",
			"slides.config.yaml",
		);
		if (await Bun.file(configPath).exists()) {
			try {
				const { parse: parseYaml, stringify: stringifyYaml } = await import(
					"yaml"
				);
				const configText = await Bun.file(configPath).text();
				const config = parseYaml(configText) as Record<string, unknown>;
				if (config.slides && typeof config.slides === "object") {
					(config.slides as Record<string, unknown>).count = slides.length;
				} else {
					config.slides = { count: slides.length };
				}
				await Bun.write(configPath, stringifyYaml(config));
			} catch {
				// Config update is best-effort — don't fail the split
			}
		}

		return true;
	} catch (err) {
		console.error(
			`❌ Error processing ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
		);
		return false;
	}
}

async function main() {
	const args = process.argv.slice(2);

	if (args[0] === "--all") {
		const glob = new Glob("docs/**/slides-data.json");
		const files = Array.from(glob.scanSync()).sort();
		let success = 0;
		const total = files.length;
		for (const f of files) {
			if (await processFile(f)) success++;
		}
		console.log(`📊 Summary: ${success}/${total} presentations processed`);
	} else if (args[0]) {
		const ok = await processFile(args[0]);
		process.exit(ok ? 0 : 1);
	} else {
		console.error("Usage:");
		console.error("  bun run scripts/split-code-diagrams.ts --all");
		console.error(
			"  bun run scripts/split-code-diagrams.ts docs/my-deck/slides-data.json",
		);
		process.exit(1);
	}
}

main();
