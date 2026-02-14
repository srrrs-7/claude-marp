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

const SVG_CONTAINMENT_STYLE =
	"max-height:70vh;max-width:100%;display:block;margin:0 auto;";

function normalizeSvgTags(content: string): string {
	return content.replace(/<svg([^>]*)>/g, (_match, attrs: string) => {
		// Remove hardcoded width/height attributes
		let cleaned = attrs
			.replace(/\s+width\s*=\s*"[^"]*"/g, "")
			.replace(/\s+height\s*=\s*"[^"]*"/g, "");

		// Check for existing style attribute
		const styleMatch = cleaned.match(/\s+style\s*=\s*"([^"]*)"/);
		if (styleMatch) {
			const existing = styleMatch[1];
			if (!existing.includes("max-height") || !existing.includes("max-width")) {
				cleaned = cleaned.replace(
					/\s+style\s*=\s*"[^"]*"/,
					` style="${SVG_CONTAINMENT_STYLE}"`,
				);
			}
		} else {
			cleaned += ` style="${SVG_CONTAINMENT_STYLE}"`;
		}

		return `<svg${cleaned}>`;
	});
}

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
