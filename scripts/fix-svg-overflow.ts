#!/usr/bin/env bun
/**
 * Fix SVG Overflow
 * ----------------
 * Normalizes inline SVGs in Marp markdown files and standalone SVG assets
 * to prevent overflow from slide boundaries.
 *
 * What it does:
 * - Removes hardcoded width/height attributes from <svg> tags
 * - Adds containment style (max-height, max-width, display, margin)
 * - Processes both .md files (inline SVGs) and .svg asset files
 *
 * Usage:
 *   bun run fix-svg                         # Fix all presentations
 *   bun run scripts/fix-svg-overflow.ts <path/to/file.md>  # Fix single file
 */

import { resolve } from "node:path";
import { normalizeSvg as normalizeSvgTags } from "../src/generate/markdown.js";

async function processFile(filePath: string): Promise<boolean> {
	const file = Bun.file(filePath);
	if (!(await file.exists())) {
		console.error(`  File not found: ${filePath}`);
		return false;
	}

	const original = await file.text();
	if (!original.includes("<svg")) {
		return false; // No SVGs to process
	}

	const fixed = normalizeSvgTags(original);
	if (fixed === original) {
		return false; // No changes needed
	}

	await Bun.write(filePath, fixed);
	return true;
}

async function processAllPresentations(): Promise<void> {
	const docsDir = resolve(import.meta.dir, "..", "docs");
	const glob = new Bun.Glob("**/*.{md,svg}");

	let total = 0;
	let fixed = 0;

	console.log("Scanning docs/ for SVGs to fix...\n");

	for await (const path of glob.scan({ cwd: docsDir })) {
		const fullPath = resolve(docsDir, path);
		total++;
		if (await processFile(fullPath)) {
			fixed++;
			console.log(`  Fixed: ${path}`);
		}
	}

	console.log(`\nDone: ${fixed}/${total} files updated`);
}

// Main
const args = process.argv.slice(2);
if (args.length > 0) {
	const filePath = resolve(args[0]);
	const changed = await processFile(filePath);
	if (changed) {
		console.log(`Fixed: ${filePath}`);
	} else {
		console.log(`No changes needed: ${filePath}`);
	}
} else {
	await processAllPresentations();
}
