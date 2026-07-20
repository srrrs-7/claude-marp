/**
 * Thin Presentation model — type-safe, validated deck loader.
 *
 * Encapsulates a deck's config + slides as a single unit, providing
 * load/save operations with atomic writes to prevent data loss.
 *
 * Use this model in scripts that need to read AND write slides-data.json
 * with full Zod validation. For read-only analytics, use
 * scripts/lib/presentation-loader.ts instead (faster, no validation).
 *
 * Example:
 *   const pres = await loadPresentation("docs/20260101_my-deck");
 *   pres.slides = pres.slides.filter(s => s.layout !== "section");
 *   await savePresentation(pres);
 */

import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { loadConfig } from "../config/loader.js";
import type { SlidesConfig } from "../config/schema.js";
import { CONFIG_FILENAME, DATA_FILENAME } from "../constants.js";
import {
	type SlideContent,
	generationResultSchema,
} from "../generate/slide-schema.js";

/**
 * Indentation for slides-data.json.
 *
 * Must match biome.json's `formatter.indentStyle` — otherwise every script that
 * rewrites a deck produces a whole-file diff that `bun run format` then undoes.
 */
const JSON_INDENT = "\t";

export interface Presentation {
	/** Absolute path to the deck directory */
	dir: string;
	config: SlidesConfig;
	slides: SlideContent[];
}

/**
 * Canonical writer for slides-data.json.
 *
 * Atomic (tmp + rename) so an interrupted process can't truncate a deck, and
 * Biome-compatible so mutations produce minimal diffs. Every script that
 * rewrites deck data must go through this.
 */
export async function saveSlidesData(
	dataPath: string,
	slides: readonly SlideContent[],
): Promise<void> {
	const payload = `${JSON.stringify({ slides }, null, JSON_INDENT)}\n`;
	const tmpPath = `${dataPath}.tmp`;
	await Bun.write(tmpPath, payload);
	await rename(tmpPath, dataPath);
}

/**
 * Load a presentation from disk.
 * Reads slides.config.yaml and slides-data.json from the given directory.
 */
export async function loadPresentation(deckDir: string): Promise<Presentation> {
	const absDir = resolve(deckDir);
	const configPath = resolve(absDir, CONFIG_FILENAME);
	const dataPath = resolve(absDir, DATA_FILENAME);

	const config = await loadConfig(configPath);
	const raw = await Bun.file(dataPath).json();
	const data = generationResultSchema.parse(raw);

	return {
		dir: absDir,
		config,
		slides: data.slides,
	};
}

/** Save a loaded presentation's slides back to its slides-data.json. */
export async function savePresentation(pres: Presentation): Promise<void> {
	await saveSlidesData(resolve(pres.dir, DATA_FILENAME), pres.slides);
}
