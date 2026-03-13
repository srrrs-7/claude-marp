import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir, slugify } from "../utils/files.js";
import { renderMarpMarkdown } from "./markdown.js";
import { generationResultSchema } from "./slide-schema.js";

export async function renderSlides(
	dataPath: string,
	config: SlidesConfig,
	dryRun = false,
): Promise<void> {
	const raw = await Bun.file(dataPath).json();
	const data = generationResultSchema.parse(raw);
	const markdown = renderMarpMarkdown(data, config);

	const baseName = config.output.baseName || `${slugify(config.topic)}-slides`;
	const outputDir = resolve(config.output.dir);
	ensureDir(outputDir);

	const outputPath = resolve(outputDir, `${baseName}.md`);
	if (dryRun) {
		console.log(
			`DRY RUN: would write to ${outputPath} (${markdown.length} chars)`,
		);
		return;
	}
	// Atomic write: write to .tmp then rename to prevent partial writes
	const tmpPath = `${outputPath}.tmp`;
	await Bun.write(tmpPath, markdown);
	await rename(tmpPath, outputPath);
	console.log(`Rendered: ${outputPath}`);
}
