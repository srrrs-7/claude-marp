import { resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir, slugify } from "../utils/files.js";
import { renderMarpMarkdown } from "./markdown.js";
import { generationResultSchema } from "./slide-schema.js";

export async function renderSlides(
	dataPath: string,
	config: SlidesConfig,
): Promise<void> {
	const raw = await Bun.file(dataPath).json();
	const data = generationResultSchema.parse(raw);
	const markdown = renderMarpMarkdown(data, config);

	const baseName = config.output.baseName || `${slugify(config.topic)}-slides`;
	const outputDir = resolve(config.output.dir);
	ensureDir(outputDir);

	const outputPath = resolve(outputDir, `${baseName}.md`);
	await Bun.write(outputPath, markdown);
	console.log(`Rendered: ${outputPath}`);
}
