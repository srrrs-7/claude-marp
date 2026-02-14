import { resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir } from "../utils/files.js";

export async function exportSlides(
	inputPath: string,
	format: "html" | "pdf" | "pptx",
	config: SlidesConfig,
): Promise<string> {
	const distDir = resolve(config.output.dir, "dist");
	await ensureDir(distDir);

	const ext = format === "pptx" ? "pptx" : format;
	const baseName = resolve(inputPath).replace(/\.md$/, "");
	const fileName = baseName.split("/").pop();
	const outputPath = resolve(distDir, `${fileName}.${ext}`);

	const args = [
		"bunx",
		"@marp-team/marp-cli",
		inputPath,
		"--output",
		outputPath,
	];

	if (format === "html") {
		args.push("--html");
	}

	if (format === "pdf") {
		console.log(
			"Note: PDF export requires Chromium. If it fails, install Chromium or use HTML export.",
		);
	}

	console.log(`Exporting to ${format}: ${outputPath}`);

	const proc = Bun.spawn(args, {
		stdout: "inherit",
		stderr: "inherit",
	});

	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		throw new Error(`Marp CLI exited with code ${exitCode}`);
	}

	console.log(`Export complete: ${outputPath}`);
	return outputPath;
}
