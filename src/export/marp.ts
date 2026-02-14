import { basename, resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir } from "../utils/files.js";

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

	return outputPath;
}
