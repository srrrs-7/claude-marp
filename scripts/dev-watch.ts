#!/usr/bin/env bun
/**
 * bun run dev — Development watch mode
 *
 * Watches docs/ for changes to slides-data.json or slides.config.yaml.
 * On change: finds the matching config and re-renders the deck automatically.
 *
 * Usage:
 *   bun run dev                   # Watch all docs/
 *   bun run dev docs/20260214xxx  # Watch a specific deck
 */

import { watch } from "node:fs";
import { resolve, dirname, join, basename } from "node:path";
import { Glob } from "bun";

const DEBOUNCE_MS = 400;
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function dim(s: string) {
	return `\x1b[2m${s}\x1b[0m`;
}
function green(s: string) {
	return `\x1b[32m${s}\x1b[0m`;
}
function yellow(s: string) {
	return `\x1b[33m${s}\x1b[0m`;
}
function red(s: string) {
	return `\x1b[31m${s}\x1b[0m`;
}
function bold(s: string) {
	return `\x1b[1m${s}\x1b[0m`;
}

function timestamp(): string {
	return new Date().toLocaleTimeString("ja-JP", { hour12: false });
}

async function findConfig(dir: string): Promise<string | null> {
	const candidate = join(dir, "slides.config.yaml");
	if (await Bun.file(candidate).exists()) return candidate;
	return null;
}

async function findDataFile(dir: string): Promise<string | null> {
	const candidate = join(dir, "slides-data.json");
	if (await Bun.file(candidate).exists()) return candidate;
	return null;
}

async function renderDeck(deckDir: string): Promise<void> {
	const config = await findConfig(deckDir);
	const data = await findDataFile(deckDir);

	if (!config || !data) {
		console.log(yellow(`  ⚠ Missing config or data in ${deckDir}`));
		return;
	}

	const label = basename(deckDir).slice(15); // strip timestamp prefix
	console.log(`\n${dim(timestamp())} ${bold("→ Rendering")} ${label}`);

	const proc = Bun.spawn(
		["bun", "run", "slides", "render", "-c", config, "--in", data],
		{ stdout: "pipe", stderr: "pipe", cwd: resolve(".") },
	);

	const [out, err, code] = await Promise.all([
		new Response(proc.stdout).text(),
		new Response(proc.stderr).text(),
		proc.exited,
	]);

	if (code === 0) {
		// Count slides
		let slideCount = "?";
		try {
			const parsed = (await Bun.file(data).json()) as { slides?: unknown[] };
			slideCount = String(parsed.slides?.length ?? "?");
		} catch {
			/* ignore */
		}
		console.log(green(`  ✓ ${label} rendered (${slideCount} slides)`));
		if (out.trim())
			console.log(
				dim(
					out
						.trim()
						.split("\n")
						.map((l) => `    ${l}`)
						.join("\n"),
				),
			);
	} else {
		console.log(red(`  ✗ Render failed for ${label}`));
		if (err.trim())
			console.log(
				red(
					err
						.trim()
						.split("\n")
						.map((l) => `    ${l}`)
						.join("\n"),
				),
			);
	}
}

function scheduleRender(deckDir: string): void {
	const existing = timers.get(deckDir);
	if (existing) clearTimeout(existing);
	timers.set(
		deckDir,
		setTimeout(async () => {
			timers.delete(deckDir);
			await renderDeck(deckDir);
		}, DEBOUNCE_MS),
	);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const watchTarget = process.argv[2] ?? "docs";
const absTarget = resolve(watchTarget);

console.log(bold("\n👁  Slide Dev Watch"));
console.log(`   Watching: ${absTarget}`);
console.log(
	dim("   Change slides-data.json or slides.config.yaml to trigger render.\n"),
);
console.log(dim("   Press Ctrl+C to stop.\n"));

// Collect all known deck dirs up-front for initial status
const configGlob = new Glob(`${watchTarget}/*/slides.config.yaml`);
const deckDirs = new Set<string>();
for (const p of configGlob.scanSync()) {
	deckDirs.add(resolve(dirname(p)));
}
console.log(
	dim(`   ${deckDirs.size} deck${deckDirs.size !== 1 ? "s" : ""} found.\n`),
);

// Watch the directory recursively
watch(absTarget, { recursive: true }, (_event, filename) => {
	if (!filename) return;

	// Only react to slides-data.json and slides.config.yaml
	const base = basename(filename);
	if (base !== "slides-data.json" && base !== "slides.config.yaml") return;

	// Derive the deck directory (one level under docs/)
	const parts = filename.replace(/\\/g, "/").split("/");
	if (parts.length < 2) return;
	const deckDir = resolve(absTarget, parts[0]);

	scheduleRender(deckDir);
});

// Keep the process alive
await new Promise(() => {}); // never resolves
