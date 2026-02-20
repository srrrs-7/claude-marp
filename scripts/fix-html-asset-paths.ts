#!/usr/bin/env bun
/**
 * Fix broken asset paths in exported HTML files.
 * Rewrites src="assets/..." to src="../assets/..." so that
 * HTML files in dist/ can resolve images from the parent assets/ directory.
 */

import { Glob } from "bun";

async function fixHtmlAssetPaths(): Promise<void> {
	let fixed = 0;
	let skipped = 0;

	for await (const path of new Glob("docs/*/dist/*.html").scan({ cwd: "." })) {
		const file = Bun.file(path);
		const html = await file.text();

		const fixedHtml = html.replace(
			/(<img\s[^>]*?\bsrc=")(?!https?:\/\/|data:|\/|\.\.\/)( assets\/[^"]+)(")/g,
			(_, before, assetPath, after) =>
				`${before}../${assetPath.trim()}${after}`,
		);

		// Also handle without leading space
		const fixedHtml2 = fixedHtml.replace(
			/(<img\s[^>]*?\bsrc=")(assets\/[^"]+)(")/g,
			(_, before, assetPath, after) => `${before}../${assetPath}${after}`,
		);

		if (fixedHtml2 !== html) {
			await Bun.write(path, fixedHtml2);
			console.log(`  Fixed: ${path}`);
			fixed++;
		} else {
			skipped++;
		}
	}

	console.log(`\nDone: ${fixed} fixed, ${skipped} already correct`);
}

fixHtmlAssetPaths().catch(console.error);
