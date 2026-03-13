/**
 * Thin Presentation model.
 *
 * Encapsulates a deck's config + slides as a single unit, providing
 * load/save operations with atomic writes to prevent data loss.
 */

import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { loadConfig } from "../config/loader.js";
import type { SlidesConfig } from "../config/schema.js";
import {
	type SlideContent,
	generationResultSchema,
} from "../generate/slide-schema.js";

export interface Presentation {
	/** Absolute path to the deck directory */
	dir: string;
	config: SlidesConfig;
	slides: SlideContent[];
}

/**
 * Load a presentation from disk.
 * Reads slides.config.yaml and slides-data.json from the given directory.
 */
export async function loadPresentation(deckDir: string): Promise<Presentation> {
	const absDir = resolve(deckDir);
	const configPath = resolve(absDir, "slides.config.yaml");
	const dataPath = resolve(absDir, "slides-data.json");

	const config = await loadConfig(configPath);
	const raw = await Bun.file(dataPath).json();
	const data = generationResultSchema.parse(raw);

	return {
		dir: absDir,
		config,
		slides: data.slides,
	};
}

/**
 * Save slides back to slides-data.json using an atomic write (tmp + rename).
 * This prevents data loss if the process is interrupted mid-write.
 */
export async function savePresentation(pres: Presentation): Promise<void> {
	const dataPath = resolve(pres.dir, "slides-data.json");
	const tmpPath = `${dataPath}.tmp`;
	const payload = JSON.stringify({ slides: pres.slides }, null, 2);
	await Bun.write(tmpPath, payload);
	await rename(tmpPath, dataPath);
}
