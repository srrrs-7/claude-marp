#!/usr/bin/env bun

import { Glob } from "bun";
import { z } from "zod";
import { generationResultSchema } from "../src/generate/slide-schema.js";

interface Fix {
	type: string;
	description: string;
	count: number;
}

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
			const fixes: Fix[] = [];

			// Fix: Rename 'bullets' to 'content'
			if (data.slides && Array.isArray(data.slides)) {
				for (const slide of data.slides) {
					if ("bullets" in slide && !("content" in slide)) {
						slide.content = slide.bullets;
						slide.bullets = undefined;
						const fix = fixes.find((f) => f.type === "rename_bullets");
						if (fix) {
							fix.count++;
						} else {
							fixes.push({
								type: "rename_bullets",
								description: "Renamed 'bullets' to 'content'",
								count: 1,
							});
						}
					}
				}
			}

			// Fix: Invalid layout values
			if (data.slides && Array.isArray(data.slides)) {
				const validLayouts = ["default", "center", "section"];
				for (const slide of data.slides) {
					if (slide.layout && !validLayouts.includes(slide.layout)) {
						const oldLayout = slide.layout;
						slide.layout = "default";
						const fix = fixes.find((f) => f.type === "fix_layout");
						if (fix) {
							fix.count++;
						} else {
							fixes.push({
								type: "fix_layout",
								description: `Fixed invalid layout '${oldLayout}' → 'default'`,
								count: 1,
							});
						}
					}
				}
			}

			// Fix: Add missing required fields
			if (data.slides && Array.isArray(data.slides)) {
				for (let i = 0; i < data.slides.length; i++) {
					const slide = data.slides[i];

					if (!slide.title) {
						slide.title = `Slide ${i + 1}`;
						const fix = fixes.find((f) => f.type === "add_title");
						if (fix) {
							fix.count++;
						} else {
							fixes.push({
								type: "add_title",
								description: "Added missing title",
								count: 1,
							});
						}
					}

					if (!slide.layout) {
						slide.layout = "default";
						const fix = fixes.find((f) => f.type === "add_layout");
						if (fix) {
							fix.count++;
						} else {
							fixes.push({
								type: "add_layout",
								description: "Added missing layout",
								count: 1,
							});
						}
					}
				}
			}

			// Validate after fixes
			try {
				generationResultSchema.parse(data);

				if (fixes.length > 0) {
					// Write fixed data
					await Bun.write(file, JSON.stringify(data, null, 2));
					console.log(`✅ ${file}`);
					for (const fix of fixes) {
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
