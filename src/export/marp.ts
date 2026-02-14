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

	const fixed = html.replace(
		/(<img\s[^>]*?\bsrc=")(?!https?:\/\/|data:|\/)(assets\/[^"]+)(")/g,
		(_, before, path, after) => `${before}${rel}/${path}${after}`,
	);

	if (fixed !== html) {
		await Bun.write(htmlPath, fixed);
	}
}

export async function exportSlides(
	inputPath: string,
	format: "html" | "pdf" | "pptx",
	config: SlidesConfig,
): Promise<string> {
	const distDir = resolve(config.output.dir, "dist");
	ensureDir(distDir);

	const fileName = basename(inputPath, ".md");
	const outputPath = resolve(distDir, `${fileName}.${format}`);

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

	const proc = Bun.spawn(args, {
		stdout: "inherit",
		stderr: "inherit",
	});

	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		throw new Error(`Marp CLI exited with code ${exitCode}`);
	}

	if (format === "html") {
		await fixAssetPaths(outputPath, resolve(dirname(inputPath)));
	}

	return outputPath;
}
