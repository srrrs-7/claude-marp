#!/usr/bin/env bun

import { Glob } from "bun";
import { z } from "zod";
import { DATA_FILENAME, VALID_LAYOUTS } from "../src/constants.js";
import { generationResultSchema } from "../src/generate/slide-schema.js";
import { saveSlidesData } from "../src/model/presentation.js";

// ---------------------------------------------------------------------------
// Fix tracker
// ---------------------------------------------------------------------------

class FixTracker {
	private map = new Map<string, { description: string; count: number }>();

	register(type: string, description: string): void {
		const existing = this.map.get(type);
		if (existing) {
			existing.count++;
		} else {
			this.map.set(type, { description, count: 1 });
		}
	}

	get size(): number {
		return this.map.size;
	}

	toArray(): Array<{ type: string; description: string; count: number }> {
		return Array.from(this.map.entries()).map(([type, v]) => ({
			type,
			...v,
		}));
	}
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function autoFixSlides() {
	const glob = new Glob(`docs/**/${DATA_FILENAME}`);
	const files = Array.from(glob.scanSync());

	if (files.length === 0) {
		console.log(`ℹ️  No ${DATA_FILENAME} files found in docs/`);
		return;
	}

	let fixedCount = 0;
	let unchangedCount = 0;

	console.log("🔧 Auto-fixing slides data files...\n");

	for (const file of files) {
		try {
			// Mutate a copy so a post-fix validation failure leaves the file alone.
			const data = structuredClone(await Bun.file(file).json());
			const tracker = new FixTracker();

			if (data.slides && Array.isArray(data.slides)) {
				for (let i = 0; i < data.slides.length; i++) {
					const slide = data.slides[i];

					// Fix: Rename 'bullets' to 'content'
					if ("bullets" in slide && !("content" in slide)) {
						slide.content = slide.bullets;
						slide.bullets = undefined;
						tracker.register(
							"rename_bullets",
							"Renamed 'bullets' to 'content'",
						);
					}

					// Fix: Invalid layout values
					if (
						slide.layout &&
						!(VALID_LAYOUTS as readonly string[]).includes(slide.layout)
					) {
						const oldLayout = slide.layout as string;
						slide.layout = "default";
						tracker.register(
							"fix_layout",
							`Fixed invalid layout '${oldLayout}' → 'default'`,
						);
					}

					// Fix: Add missing codeLanguage when code block exists
					if (slide.code && !slide.codeLanguage) {
						slide.codeLanguage = "text";
						tracker.register(
							"add_codeLanguage",
							'Added missing codeLanguage "text" for code blocks',
						);
					}

					// Fix: Add missing title
					if (!slide.title) {
						slide.title = `Slide ${i + 1}`;
						tracker.register("add_title", "Added missing title");
					}

					// Fix: Add missing layout
					if (!slide.layout) {
						slide.layout = "default";
						tracker.register("add_layout", "Added missing layout");
					}
				}
			}

			// Validate after fixes
			try {
				generationResultSchema.parse(data);

				if (tracker.size > 0) {
					// saveSlidesData writes atomically (tmp + rename), so a failed or
					// interrupted write leaves the original file untouched — no .bak needed.
					await saveSlidesData(file, data.slides);
					console.log(`✅ ${file}`);
					for (const fix of tracker.toArray()) {
						console.log(`   - ${fix.description} (${fix.count} slides)`);
					}
					fixedCount++;
				} else {
					console.log(`✓  ${file} (no fixes needed)`);
					unchangedCount++;
				}
			} catch (error) {
				console.log(`❌ ${file} (validation failed after fixes)`);
				if (error instanceof z.ZodError) {
					for (const issue of error.issues) {
						console.log(`   - ${issue.path.join(".")}: ${issue.message}`);
					}
				}
			}
		} catch (error) {
			console.log(`❌ ${file} (error reading file)`);
			console.log(
				`   - ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	console.log(`\n📊 Summary: ${fixedCount} fixed, ${unchangedCount} unchanged`);

	if (fixedCount > 0) {
		console.log("\n✨ Files have been auto-fixed and saved!");
	}
}

autoFixSlides();
