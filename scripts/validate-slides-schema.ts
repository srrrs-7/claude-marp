#!/usr/bin/env bun

import { Glob } from "bun";
import { z } from "zod";
import { generationResultSchema } from "../src/generate/slide-schema.js";

interface ValidationError {
	file: string;
	errors: string[];
}

async function validateAllSlides() {
	const glob = new Glob("docs/**/slides-data.json");
	const files = Array.from(glob.scanSync());

	if (files.length === 0) {
		console.log("ℹ️  No slides-data.json files found in docs/");
		return;
	}

	let validCount = 0;
	let invalidCount = 0;
	const errors: ValidationError[] = [];

	console.log("🔍 Validating slides data files...\n");

	for (const file of files) {
		try {
			const data = await Bun.file(file).json();
			generationResultSchema.parse(data);
			console.log(`✅ ${file}`);
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

	console.log(`\n📊 Summary: ${validCount} valid, ${invalidCount} invalid`);

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
