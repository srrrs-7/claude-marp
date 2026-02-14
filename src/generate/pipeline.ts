import { resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir, slugify } from "../utils/files.js";
import { renderMarpMarkdown } from "./markdown.js";
import {
	type GenerationResult,
	generationResultSchema,
} from "./slide-schema.js";

export interface PipelineResult {
	markdown: string;
	outputPath: string;
	data: GenerationResult;
}

export async function renderSlides(
	dataPath: string,
	config: SlidesConfig,
): Promise<PipelineResult> {
	const raw = await Bun.file(dataPath).json();
	const data = generationResultSchema.parse(raw);
	const markdown = renderMarpMarkdown(data, config);

	const baseName = config.output.baseName || `${slugify(config.topic)}-slides`;
	const outputDir = resolve(config.output.dir);
	await ensureDir(outputDir);

	const outputPath = resolve(outputDir, `${baseName}.md`);
	await Bun.write(outputPath, markdown);

	return { markdown, outputPath, data };
}
