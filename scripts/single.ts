#!/usr/bin/env bun
/**
 * bun run single <deckDir> [render|export|all]
 *
 * Render and/or export a single presentation directory without running the full
 * rebuild pipeline. Designed for fast iteration on one deck at a time.
 *
 * Usage:
 *   bun run single docs/20260214xxx_topic          # render + export (default)
 *   bun run single docs/20260214xxx_topic render   # render only
 *   bun run single docs/20260214xxx_topic export   # export only (requires .md to exist)
 *
 * Accepts a partial directory name — matches the first docs/ entry containing
 * the argument as a substring, so you can type:
 *   bun run single aws-cognito
 */

import { Glob } from "bun";
import { basename, resolve } from "node:path";

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
	console.log(`
Usage: bun run single <deckDir> [render|export|all]

  <deckDir>   Full or partial path to a deck under docs/
              e.g. "docs/20260214xxx_topic" or just "aws-cognito"

  mode        render | export | all  (default: all)

Examples:
  bun run single docs/20260214073222_growing-industries-investment
  bun run single aws-cognito render
  bun run single cognito export
`);
	process.exit(0);
}

const query = args[0];
const mode = (args[1] ?? "all") as "render" | "export" | "all";

if (!["render", "export", "all"].includes(mode)) {
	console.error(`Unknown mode "${mode}". Use: render | export | all`);
	process.exit(1);
}

// ---------------------------------------------------------------------------
// Resolve deck directory (supports partial name matching)
// ---------------------------------------------------------------------------

async function resolveDeckDir(query: string): Promise<string> {
	// If it looks like an existing path, use directly
	const direct = resolve(query);
	if (await Bun.file(`${direct}/slides.config.yaml`).exists()) return direct;

	// Fuzzy match against docs/*/
	const glob = new Glob("docs/*/slides.config.yaml");
	const candidates: string[] = [];
	for (const p of glob.scanSync()) {
		const dir = p.replace("/slides.config.yaml", "");
		if (dir.toLowerCase().includes(query.toLowerCase())) {
			candidates.push(resolve(dir));
		}
	}

	if (candidates.length === 0) {
		console.error(`✗ No deck found matching "${query}"`);
		console.error(`  Run: ls docs/ | grep -i "${query}"`);
		process.exit(1);
	}
	if (candidates.length > 1) {
		console.error(`✗ Ambiguous — ${candidates.length} decks match "${query}":`);
		for (const c of candidates) console.error(`  ${basename(c)}`);
		console.error("  Use a more specific name.");
		process.exit(1);
	}
	return candidates[0];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;

async function spawn(
	cmd: string[],
): Promise<{ code: number; out: string; err: string }> {
	const proc = Bun.spawn(cmd, {
		stdout: "pipe",
		stderr: "pipe",
		cwd: resolve("."),
	});
	const [out, err, code] = await Promise.all([
		new Response(proc.stdout).text(),
		new Response(proc.stderr).text(),
		proc.exited,
	]);
	return { code, out, err };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const deckDir = await resolveDeckDir(query);
const dirName = basename(deckDir);
const configFile = `${deckDir}/slides.config.yaml`;
const dataFile = `${deckDir}/slides-data.json`;

console.log(bold(`\n▶ ${dirName}`));

// ── Validate required files ───────────────────────────────────────────────

if (!(await Bun.file(configFile).exists())) {
	console.error(red("  ✗ slides.config.yaml not found"));
	process.exit(1);
}
if (
	(mode === "render" || mode === "all") &&
	!(await Bun.file(dataFile).exists())
) {
	console.error(red("  ✗ slides-data.json not found"));
	process.exit(1);
}

// ── Render ────────────────────────────────────────────────────────────────

if (mode === "render" || mode === "all") {
	process.stdout.write("  Rendering ...  ");
	const { code, err } = await spawn([
		"bun",
		"run",
		"slides",
		"render",
		"-c",
		configFile,
		"--in",
		dataFile,
	]);
	if (code === 0) {
		const data = (await Bun.file(dataFile).json()) as { slides?: unknown[] };
		const count = data.slides?.length ?? "?";
		console.log(green(`✓  (${count} slides)`));
	} else {
		console.log(red("✗  failed"));
		if (err.trim())
			console.error(
				err
					.trim()
					.split("\n")
					.map((l) => `    ${l}`)
					.join("\n"),
			);
		process.exit(1);
	}
}

// ── Export ────────────────────────────────────────────────────────────────

if (mode === "export" || mode === "all") {
	// Find the .md file
	const mdGlob = new Glob(`${deckDir}/*.md`);
	const mdFiles = Array.from(mdGlob.scanSync());

	if (mdFiles.length === 0) {
		console.error(red("  ✗ No .md file found — run render first"));
		process.exit(1);
	}
	if (mdFiles.length > 1) {
		console.log(
			yellow(`  ⚠ Multiple .md files found, using: ${basename(mdFiles[0])}`),
		);
	}

	const mdFile = mdFiles[0];
	process.stdout.write("  Exporting  ...  ");

	const { code, err } = await spawn([
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

	if (code === 0) {
		const htmlName = basename(mdFile, ".md") + ".html";
		console.log(green(`✓  → dist/${htmlName}`));
	} else {
		console.log(red("✗  failed"));
		if (err.trim())
			console.error(
				err
					.trim()
					.split("\n")
					.map((l) => `    ${l}`)
					.join("\n"),
			);
		process.exit(1);
	}
}

console.log(dim("\n  Done.\n"));
