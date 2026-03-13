#!/usr/bin/env bun

import { unlink } from "node:fs/promises";
import { Glob } from "bun";
import { z } from "zod";
import { VALID_LAYOUTS } from "../src/constants.js";
import { generationResultSchema } from "../src/generate/slide-schema.js";

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
	const glob = new Glob("docs/**/slides-data.json");
	const files = Array.from(glob.scanSync());

	if (files.length === 0) {
		console.log("ℹ️  No slides-data.json files found in docs/");
		return;
	}

	let fixedCount = 0;
	let unchangedCount = 0;

	console.log("🔧 Auto-fixing slides data files...\n");

	for (const file of files) {
		try {
			const originalData = await Bun.file(file).json();
			const data = JSON.parse(JSON.stringify(originalData));
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
					// Write backup before modifying
					const backupPath = `${file}.bak`;
					await Bun.write(backupPath, JSON.stringify(originalData, null, 2));
					try {
						await Bun.write(file, JSON.stringify(data, null, 2));
						await unlink(backupPath); // Remove backup on success
					} catch (writeError) {
						console.error(
							`   ⚠️  Write failed, backup preserved at ${backupPath}`,
						);
						throw writeError;
					}
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
