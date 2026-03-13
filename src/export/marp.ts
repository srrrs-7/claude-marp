import { existsSync } from "node:fs";
import { basename, dirname, relative, resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir } from "../utils/files.js";

/**
 * Fix relative asset paths in exported HTML.
 *
 * Marp CLI outputs `<img src="assets/...">` as-is from the markdown,
 * but when HTML lives in `dist/`, the correct path is `../assets/...`.
 * This rewrites src attributes to use the relative path from distDir
 * back to the markdown source directory.
 */
async function fixAssetPaths(
	htmlPath: string,
	inputDir: string,
): Promise<void> {
	const file = Bun.file(htmlPath);
	const html = await file.text();

	const distDir = dirname(htmlPath);
	const rel = relative(distDir, inputDir);
	if (rel === "") return; // same directory, no fix needed

	// Warn if assets/ directory doesn't exist
	const assetsDir = resolve(inputDir, "assets");
	if (!existsSync(assetsDir) && html.includes("assets/")) {
		console.warn(
			`⚠️  assets/ directory not found at ${assetsDir} — referenced assets may be broken`,
		);
	}

	// Fix src="assets/..." and data-src="assets/..." in any tag
	let fixed = html.replace(
		/(\bsrc="|data-src=")(?!https?:\/\/|data:|\/)(assets\/[^"]+)(")/g,
		(_, before, path, after) => `${before}${rel}/${path}${after}`,
	);

	// Fix srcset="assets/..." (may contain multiple entries)
	fixed = fixed.replace(
		/(\bsrcset=")([^"]+)(")/g,
		(_, before, srcset, after) => {
			const updated = srcset.replace(
				/(?<![:/\w])assets\/([^\s,"]+)/g,
				(match: string) => `${rel}/${match}`,
			);
			return `${before}${updated}${after}`;
		},
	);

	if (fixed !== html) {
		await Bun.write(htmlPath, fixed);
	}
}

export async function exportSlides(
	inputPath: string,
	format: "html" | "pdf" | "pptx",
	config: SlidesConfig,
	dryRun = false,
): Promise<string> {
	if (!existsSync(inputPath)) {
		throw new Error(
			`Markdown file not found: ${inputPath}\nRun "bun run slides render" first to generate it.`,
		);
	}

	const distDir = resolve(config.output.dir, "dist");
	ensureDir(distDir);

	const fileName = basename(inputPath, ".md");
	const outputPath = resolve(distDir, `${fileName}.${format}`);

	if (dryRun) {
		console.log(`DRY RUN: would export to ${outputPath}`);
		return outputPath;
	}

	const args = [
		"bunx",
		"@marp-team/marp-cli",
		"--no-config",
		"--allow-local-files",
		inputPath,
		"--output",
		outputPath,
	];

	if (format === "html") {
		args.push("--html");
	}

	const MARP_TIMEOUT_MS = 120_000; // 2 minutes

	const proc = Bun.spawn(args, {
		stdout: "inherit",
		stderr: "inherit",
	});

	const timeoutHandle = setTimeout(() => {
		console.error(
			`\nMarp CLI timed out after ${MARP_TIMEOUT_MS / 1000}s — killing process`,
		);
		proc.kill("SIGTERM");
	}, MARP_TIMEOUT_MS);

	const exitCode = await proc.exited;
	clearTimeout(timeoutHandle);

	if (exitCode !== 0) {
		throw new Error(`Marp CLI exited with code ${exitCode}`);
	}

	if (format === "html") {
		await fixAssetPaths(outputPath, resolve(dirname(inputPath)));
	}

	return outputPath;
}
