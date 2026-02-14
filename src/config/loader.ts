import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import { type SlidesConfig, slidesConfigSchema } from "./schema.js";

const CONFIG_FILENAME = "slides.config.yaml";

export async function loadConfig(configPath?: string): Promise<SlidesConfig> {
	const resolvedPath = resolve(configPath ?? CONFIG_FILENAME);

	if (!existsSync(resolvedPath)) {
		throw new Error(
			`Config file not found: ${resolvedPath}\nRun "bun run slides init" to create one.`,
		);
	}

	const raw = await Bun.file(resolvedPath).text();
	const parsed = parse(raw);
	return slidesConfigSchema.parse(parsed);
}
