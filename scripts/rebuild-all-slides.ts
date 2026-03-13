#!/usr/bin/env bun
/**
 * Rebuild All Slides — TypeScript rewrite of rebuild-all-slides.sh
 *
 * Usage:
 *   bun run scripts/rebuild-all-slides.ts                   # Rebuild all (incremental)
 *   bun run scripts/rebuild-all-slides.ts render            # Render only
 *   bun run scripts/rebuild-all-slides.ts export            # Export only
 *   bun run scripts/rebuild-all-slides.ts --force           # Force full rebuild
 *   bun run scripts/rebuild-all-slides.ts render --force    # Force render only
 *
 * Performance:
 *   - Render step runs in parallel (RENDER_PARALLEL concurrent jobs).
 *     Each deck writes to its own output dir → no conflicts.
 *   - Export is always sequential (Marp CLI internal cache constraint).
 *   - Incremental: mtime/size cache stored in .cache/rebuild/build-cache.json
 */

import { existsSync } from "node:fs";
import { Glob } from "bun";
import { c } from "./lib/colors.js";
import { RENDER_PARALLEL } from "./lib/constants.js";
import { isFresh, readCache, updateEntry, writeCache } from "./lib/cache.js";
import { run } from "./lib/spawn.js";

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

type Mode = "all" | "render" | "export";

function parseArgs(): { mode: Mode; force: boolean } {
	let mode: Mode = "all";
	let force = false;
	for (const arg of process.argv.slice(2)) {
		if (arg === "render" || arg === "export" || arg === "all") mode = arg;
		if (arg === "--force") force = true;
	}
	return { mode, force };
}

// ---------------------------------------------------------------------------
// Counters
// ---------------------------------------------------------------------------

interface Counters {
	total: number;
	success: number;
	failed: number;
	skipped: number;
	cached: number;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const { mode, force } = parseArgs();
const CACHE_FILE = ".cache/rebuild/build-cache.json";
const cache = readCache(CACHE_FILE);

console.log(c.blue("=== Rebuild All Slides ==="));
console.log(
	`Mode: ${c.yellow(mode)}${force ? " (force rebuild)" : " (incremental)"}\n`,
);

// ---------------------------------------------------------------------------
// Phase 1 — Collect decks, compute hashes, determine what needs rebuilding
// ---------------------------------------------------------------------------

const glob = new Glob("docs/*/slides.config.yaml");
const allDirs = Array.from(glob.scanSync())
	.map((p) => p.replace(/slides\.config\.yaml$/, ""))
	.sort();

const dirsToRender: string[] = [];
const dirsToExport: string[] = [];
const counters: Counters = {
	total: 0,
	success: 0,
	failed: 0,
	skipped: 0,
	cached: 0,
};

for (const dir of allDirs) {
	const dirName = dir.replace(/\/$/, "").split("/").pop() ?? dir;
	const configFile = `${dir}slides.config.yaml`;
	const dataFile = `${dir}slides-data.json`;

	counters.total++;

	if (!existsSync(configFile) || !existsSync(dataFile)) {
		console.log(
			`  ${c.yellow(`⚠ Skipped ${dirName}: missing config or data`)}`,
		);
		counters.skipped++;
		continue;
	}

	if (
		!force &&
		(await isFresh(configFile, cache)) &&
		(await isFresh(dataFile, cache))
	) {
		console.log(`  ${c.yellow(`⊘ Cached: ${dirName}`)}`);
		counters.cached++;
		counters.success++;
		continue;
	}

	if (mode === "all" || mode === "render") dirsToRender.push(dir);
	if (mode === "all" || mode === "export") dirsToExport.push(dir);
}

console.log();

// ---------------------------------------------------------------------------
// Phase 2 — Parallel render
// ---------------------------------------------------------------------------

const renderFailed = new Set<string>();

if (dirsToRender.length > 0) {
	console.log(
		c.blue(
			`── Rendering ${dirsToRender.length} decks (${RENDER_PARALLEL} parallel) ──`,
		),
	);
	console.log();

	// Process in batches
	for (let i = 0; i < dirsToRender.length; i += RENDER_PARALLEL) {
		const batch = dirsToRender.slice(i, i + RENDER_PARALLEL);
		const results = await Promise.all(
			batch.map(async (dir) => {
				const dirName = dir.replace(/\/$/, "").split("/").pop() ?? dir;
				const configFile = `${dir}slides.config.yaml`;
				const dataFile = `${dir}slides-data.json`;
				const result = await run([
					"bun",
					"run",
					"slides",
					"render",
					"-c",
					configFile,
					"--in",
					dataFile,
				]);
				return { dir, dirName, result };
			}),
		);

		for (const { dir, dirName, result } of results) {
			if (result.code === 0) {
				console.log(`  ${c.green(`✓ Rendered: ${dirName}`)}`);
			} else {
				console.log(`  ${c.red(`✗ Render failed: ${dirName}`)}`);
				if (result.out) {
					for (const line of result.out.trimEnd().split("\n")) {
						console.log(`    ${line}`);
					}
				}
				if (result.err) {
					for (const line of result.err.trimEnd().split("\n")) {
						console.log(`    ${line}`);
					}
				}
				renderFailed.add(dir);
				counters.failed++;
			}
		}
	}

	// Save render-only cache entries
	if (mode === "render") {
		for (const dir of dirsToRender) {
			if (!renderFailed.has(dir)) {
				await updateEntry(`${dir}slides.config.yaml`, cache);
				await updateEntry(`${dir}slides-data.json`, cache);
				counters.success++;
			}
		}
	}

	console.log();
}

// ---------------------------------------------------------------------------
// Phase 3 — Sequential export
// ---------------------------------------------------------------------------

const filteredExport = dirsToExport.filter((dir) => !renderFailed.has(dir));

if (filteredExport.length > 0) {
	console.log(
		c.blue(`── Exporting ${filteredExport.length} decks (sequential) ──`),
	);
	console.log();

	for (const dir of filteredExport) {
		const dirName = dir.replace(/\/$/, "").split("/").pop() ?? dir;
		const configFile = `${dir}slides.config.yaml`;

		// Find the markdown file
		const mdGlob = new Glob(`${dir}*.md`);
		const mdFiles = Array.from(mdGlob.scanSync());
		const mdFile = mdFiles[0];

		if (!mdFile) {
			console.log(`  ${c.red(`✗ No .md file for export: ${dirName}`)}`);
			counters.failed++;
			continue;
		}

		console.log(`  ${c.green(`→ Exporting: ${dirName}`)}`);
		const result = await run([
			"bun",
			"run",
			"slides",
			"export",
			"-c",
			configFile,
			"-f",
			"html",
			"--in",
			mdFile,
		]);

		if (result.code === 0) {
			console.log(`  ${c.green("✓ Done")}`);

			// Update cache entries
			await updateEntry(configFile, cache);
			const dataFile = `${dir}slides-data.json`;
			await updateEntry(dataFile, cache);
			counters.success++;
		} else {
			console.log(`  ${c.red(`✗ Export failed: ${dirName}`)}`);
			if (result.out) {
				for (const line of result.out.trimEnd().split("\n")) {
					console.log(`    ${line}`);
				}
			}
			if (result.err) {
				for (const line of result.err.trimEnd().split("\n")) {
					console.log(`    ${line}`);
				}
			}
			counters.failed++;
		}
		console.log();
	}
}

// Persist updated cache to disk
await writeCache(CACHE_FILE, cache);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log(c.blue("=== Summary ==="));
console.log(`Total presentations : ${counters.total}`);
console.log(
	`${c.green("Successful          :")} ${counters.success} (${c.yellow(`${counters.cached} from cache`)})`,
);
console.log(`${c.red("Failed              :")} ${counters.failed}`);
console.log(`${c.yellow("Skipped             :")} ${counters.skipped}`);

if (counters.failed > 0) {
	process.exit(1);
}
