#!/usr/bin/env bun
/**
 * bun run doctor — Project health check
 *
 * Verifies the local environment and reports the state of all presentations:
 * - Runtime / toolchain versions
 * - Schema validation pass rate
 * - SVG url(#id) violations
 * - Presentations missing dist/ HTML export
 * - Presentations missing slides.config.yaml
 */

import { Glob } from "bun";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ok(msg: string) {
	console.log(`  ✅ ${msg}`);
}
function warn(msg: string) {
	console.log(`  ⚠️  ${msg}`);
}
function fail(msg: string) {
	console.log(`  ❌ ${msg}`);
}
function section(title: string) {
	console.log(`\n── ${title} ${"─".repeat(Math.max(0, 50 - title.length))}`);
}

async function run(cmd: string): Promise<{ out: string; code: number }> {
	const proc = Bun.spawn(cmd.split(" "), {
		stdout: "pipe",
		stderr: "pipe",
	});
	const out = await new Response(proc.stdout).text();
	const code = await proc.exited;
	return { out: out.trim(), code };
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

async function checkToolchain() {
	section("Toolchain");

	// Bun
	const bun = await run("bun --version");
	if (bun.code === 0) {
		const v = bun.out.replace(/^v/, "");
		const [maj, min] = v.split(".").map(Number);
		if (maj > 1 || (maj === 1 && min >= 3)) {
			ok(`bun ${bun.out} (≥1.3.5 required)`);
		} else {
			warn(`bun ${bun.out} — upgrade to ≥1.3.5 recommended`);
		}
	} else {
		fail("bun not found — install from https://bun.sh");
	}

	// marp-cli
	const marp = await run("bunx @marp-team/marp-cli --version");
	if (marp.code === 0) {
		ok(`marp-cli ${marp.out}`);
	} else {
		fail("marp-cli not available (bunx @marp-team/marp-cli)");
	}

	// biome
	const biome = await run("bunx biome --version");
	if (biome.code === 0) {
		ok(`biome ${biome.out}`);
	} else {
		warn("biome not available — run: bun install");
	}

	// python3 (deprecated — split scripts are now TypeScript)
	const py = await run("python3 --version");
	if (py.code === 0) {
		ok(`${py.out} (python3 available)`);
	} else {
		ok("python3 not found — not needed (split scripts are TypeScript now)");
	}
}

async function checkSlides() {
	section("Slide Decks");

	const configGlob = new Glob("docs/*/slides.config.yaml");
	const dataGlob = new Glob("docs/*/slides-data.json");

	const configs = new Set(
		Array.from(configGlob.scanSync()).map((p) => p.split("/")[1]),
	);
	const dataFiles = new Set(
		Array.from(dataGlob.scanSync()).map((p) => p.split("/")[1]),
	);

	const allDirs = new Set([...configs, ...dataFiles]);
	let missingConfig = 0;
	let missingData = 0;
	let missingExport = 0;
	let totalSlides = 0;
	let totalDecks = 0;

	for (const dir of allDirs) {
		if (!configs.has(dir)) {
			missingConfig++;
			warn(`Missing slides.config.yaml: docs/${dir}`);
		}
		if (!dataFiles.has(dir)) {
			missingData++;
			warn(`Missing slides-data.json: docs/${dir}`);
		}

		// Count slides
		const dataPath = `docs/${dir}/slides-data.json`;
		try {
			const data = (await Bun.file(dataPath).json()) as {
				slides?: unknown[];
			};
			totalSlides += data.slides?.length ?? 0;
			totalDecks++;
		} catch {
			// file missing — already reported above
		}

		// Check for HTML export in dist/
		const htmlGlob = new Glob(`docs/${dir}/dist/*.html`);
		const htmlFiles = Array.from(htmlGlob.scanSync());
		if (htmlFiles.length === 0 && configs.has(dir) && dataFiles.has(dir)) {
			missingExport++;
		}
	}

	ok(`${totalDecks} decks found (${totalSlides} total slides)`);
	if (missingConfig === 0) ok("All decks have slides.config.yaml");
	else fail(`${missingConfig} decks missing slides.config.yaml`);
	if (missingData === 0) ok("All decks have slides-data.json");
	else fail(`${missingData} decks missing slides-data.json`);
	if (missingExport === 0) ok("All decks exported to HTML");
	else
		warn(
			`${missingExport} decks not yet exported to dist/ — run: bun run rebuild:export`,
		);
}

async function checkSvgViolations() {
	section("SVG Health");

	const svgGlob = new Glob("docs/**/*.svg");
	const svgFiles = Array.from(svgGlob.scanSync());

	let violations = 0;
	let missingViewBox = 0;

	for (const file of svgFiles) {
		const content = await Bun.file(file).text();
		// Strip XML/HTML comments before checking to avoid false positives
		const stripped = content.replace(/<!--[\s\S]*?-->/g, "");
		const urlRefs = (stripped.match(/url\(#/g) ?? []).length;
		if (urlRefs > 0) {
			violations += urlRefs;
			warn(`url(#id) ×${urlRefs}: ${file}`);
		}
		if (!content.includes("viewBox")) {
			missingViewBox++;
			warn(`Missing viewBox: ${file}`);
		}
	}

	ok(`${svgFiles.length} SVG files scanned`);
	if (violations === 0) ok("No url(#id) violations");
	else
		fail(
			`${violations} url(#id) violations found — run: bun scripts/fix-svg-url-refs.ts`,
		);
	if (missingViewBox === 0) ok("All SVGs have viewBox");
	else warn(`${missingViewBox} SVGs missing viewBox attribute`);
}

async function checkMermaidResidue() {
	section("Mermaid Residue");

	const mdGlob = new Glob("docs/**/*.md");
	let found = 0;
	for (const file of mdGlob.scanSync()) {
		const content = await Bun.file(file).text();
		if (content.includes("```mermaid")) {
			found++;
			warn(`Unconverted Mermaid block: ${file}`);
		}
	}
	if (found === 0) ok("No Mermaid residue in markdown files");
	else fail(`${found} files with unconverted Mermaid blocks`);
}

async function checkSchemaValidation() {
	section("Schema Validation");
	const validate = await run("bun run validate");
	// Count lines containing ✅ and ❌
	const validLines = validate.out
		.split("\n")
		.filter((l) => l.includes("✅")).length;
	const invalidLines = validate.out
		.split("\n")
		.filter((l) => l.includes("❌")).length;
	if (validate.code === 0) {
		ok(`All ${validLines} slide data files pass schema validation`);
	} else {
		fail(`${invalidLines} file(s) failed schema validation`);
		// Show first few errors
		const errLines = validate.out
			.split("\n")
			.filter((l) => l.includes("❌") || l.includes("   -"))
			.slice(0, 10);
		for (const l of errLines) console.log(`     ${l.trim()}`);
	}
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("🩺 Claude Marp — Project Health Check\n");

await checkToolchain();
await checkSlides();
await checkSvgViolations();
await checkMermaidResidue();
await checkSchemaValidation();

console.log("\n── Done ──────────────────────────────────────────────\n");
