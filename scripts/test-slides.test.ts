#!/usr/bin/env bun
/**
 * Regression test suite for Marp slide presentations.
 *
 * Codifies known failure modes discovered across sessions:
 * - Schema validation errors (wrong field names, invalid layouts)
 * - SVG ID collisions within files
 * - Broken asset paths in dist/ HTML
 * - Mermaid residue in markdown
 * - Prohibited url(#id) references in SVGs
 * - Missing HTML exports
 *
 * Run: bun test scripts/test-slides.ts
 */

import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { Glob } from "bun";
import { generationResultSchema } from "../src/generate/slide-schema.js";

// Collect presentation directories
const docsDir = resolve(import.meta.dir, "../docs");
const presentationDirs = Array.from(
	new Glob("*/slides.config.yaml").scanSync(docsDir),
).map((p) => dirname(resolve(docsDir, p)));

describe("Schema validation", () => {
	const jsonFiles = Array.from(
		new Glob("*/slides-data.json").scanSync(docsDir),
	).map((p) => resolve(docsDir, p));

	for (const file of jsonFiles) {
		test(`${basename(dirname(file))}/slides-data.json is valid`, async () => {
			const data = await Bun.file(file).json();
			const result = generationResultSchema.safeParse(data);
			if (!result.success) {
				const errors = result.error.issues
					.map((i) => `${i.path.join(".")}: ${i.message}`)
					.join("\n");
				expect(result.success).toBe(true);
				throw new Error(`Schema errors:\n${errors}`);
			}
		});
	}

	test("No slides-data.json uses 'bullets' field", async () => {
		for (const file of jsonFiles) {
			const text = await Bun.file(file).text();
			expect(text).not.toContain('"bullets"');
		}
	});
});

describe("SVG integrity", () => {
	const svgFiles = Array.from(
		new Glob("**/assets/*.svg").scanSync(docsDir),
	).map((p) => resolve(docsDir, p));

	for (const file of svgFiles) {
		const relPath = file.replace(`${docsDir}/`, "");

		test(`${relPath} has no url(#id) references`, async () => {
			const content = await Bun.file(file).text();
			// Strip XML/HTML comments before checking
			const withoutComments = content.replace(/<!--[\s\S]*?-->/g, "");
			const matches = withoutComments.match(/url\(#[^)]+\)/g);
			if (matches) {
				throw new Error(
					`Prohibited url(#id) references found: ${matches.join(", ")}`,
				);
			}
		});

		test(`${relPath} has viewBox attribute`, async () => {
			const content = await Bun.file(file).text();
			expect(content).toContain("viewBox");
		});
	}

	// Check for blank lines in inline SVGs (only in markdown, not standalone files)
	// Standalone SVGs in assets/ are referenced via <img> and don't affect Marp parsing
	const mdFiles = Array.from(new Glob("*/*.md").scanSync(docsDir)).map((p) =>
		resolve(docsDir, p),
	);

	for (const file of mdFiles) {
		const relPath = file.replace(`${docsDir}/`, "");

		test(`${relPath} has no duplicate SVG IDs`, async () => {
			const content = await Bun.file(file).text();
			const idMatches = content.matchAll(/\bid=["']([^"']+)["']/g);
			const ids: string[] = [];
			const duplicates: string[] = [];
			for (const match of idMatches) {
				if (ids.includes(match[1])) {
					duplicates.push(match[1]);
				}
				ids.push(match[1]);
			}
			if (duplicates.length > 0) {
				throw new Error(
					`Duplicate SVG IDs: ${[...new Set(duplicates)].join(", ")}`,
				);
			}
		});
	}
});

describe("Asset paths in HTML exports", () => {
	const htmlFiles = Array.from(new Glob("*/dist/*.html").scanSync(docsDir)).map(
		(p) => resolve(docsDir, p),
	);

	for (const file of htmlFiles) {
		const relPath = file.replace(`${docsDir}/`, "");

		test(`${relPath} has no broken asset paths`, async () => {
			const content = await Bun.file(file).text();
			// Should NOT have src="assets/" (should be src="../assets/")
			const broken = content.match(/src="assets\/[^"]+"/g);
			if (broken) {
				throw new Error(
					`Broken asset paths (missing ../): ${broken.join(", ")}`,
				);
			}
		});

		test(`${relPath} has no raw SVG text artifacts`, async () => {
			const content = await Bun.file(file).text();
			// <p><text> is a sign of SVG leaking into HTML as raw text
			expect(content).not.toContain("<p><text>");
		});
	}
});

describe("Mermaid residue", () => {
	const mdFiles = Array.from(new Glob("*/*.md").scanSync(docsDir)).map((p) =>
		resolve(docsDir, p),
	);

	for (const file of mdFiles) {
		const relPath = file.replace(`${docsDir}/`, "");

		test(`${relPath} has no Mermaid code blocks`, async () => {
			const content = await Bun.file(file).text();
			expect(content).not.toMatch(/^```mermaid/m);
		});
	}
});

describe("Export existence", () => {
	for (const dir of presentationDirs) {
		const dirName = basename(dir);
		const distDir = resolve(dir, "dist");

		test(`${dirName}/dist/ has at least one HTML file`, () => {
			if (!existsSync(distDir)) {
				throw new Error(`dist/ directory missing for ${dirName}`);
			}
			const htmlFiles = Array.from(new Glob("*.html").scanSync(distDir));
			expect(htmlFiles.length).toBeGreaterThan(0);
		});
	}
});
