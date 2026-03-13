/**
 * Shared presentation loader.
 *
 * Encapsulates the common "glob docs/ → parse config → load slides → compute metrics"
 * pattern used by stats.ts, validate-slides-schema.ts, and generate-index.ts.
 *
 * Callers that need additional fields (e.g. theme, htmlPath) can extend
 * PresentationData or use the raw fields from config.
 */

import { Glob } from "bun";
import { parse as parseYaml } from "yaml";
import {
	type DeckMetrics,
	type SlideRecord,
	computeDeckMetrics,
} from "./quality.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PresentationData {
	/** Full relative path: "docs/20260214_example" */
	dir: string;
	/** Directory name without docs/ prefix: "20260214_example" */
	dirName: string;
	/** Human-readable topic from config.topic, or derived from dirName */
	topic: string;
	/** Language from config.language ("ja" | "en"), defaults to "ja" */
	language: "ja" | "en";
	/** Raw config object for callers that need extra fields (theme, output, etc.) */
	config: Record<string, unknown>;
	/** Slide records loaded from slides-data.json */
	slides: SlideRecord[];
	/** Computed quality metrics */
	metrics: DeckMetrics;
}

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

/**
 * Collect all presentations from docs/.
 *
 * - Skips directories without slides.config.yaml
 * - Skips directories where slides-data.json cannot be read/parsed
 *   (logs a warning instead of crashing)
 * - Returns presentations sorted by dirName (alphabetical = chronological)
 */
export async function collectPresentations(): Promise<PresentationData[]> {
	const docsDir = "docs";
	const glob = new Glob(`${docsDir}/*/slides.config.yaml`);
	const configPaths = Array.from(glob.scanSync()).sort();

	const presentations: PresentationData[] = [];

	for (const configPath of configPaths) {
		const dirName = configPath.split("/")[1];
		const dir = `${docsDir}/${dirName}`;

		// Parse config
		let config: Record<string, unknown> = {};
		try {
			const configText = await Bun.file(configPath).text();
			const parsed = parseYaml(configText);
			if (parsed && typeof parsed === "object") {
				config = parsed as Record<string, unknown>;
			}
		} catch {
			// Malformed config — use empty object (safe defaults)
		}

		const topic =
			typeof config.topic === "string"
				? config.topic
				: dirName.replace(/^\d{14}_/, "").replace(/-/g, " ");

		const language: "ja" | "en" = config.language === "en" ? "en" : "ja";

		// Load slides-data.json
		let slides: SlideRecord[] = [];
		const dataPath = `${dir}/slides-data.json`;
		try {
			const data = (await Bun.file(dataPath).json()) as {
				slides?: SlideRecord[];
			};
			slides = data.slides ?? [];
		} catch (err) {
			if (err instanceof SyntaxError) {
				console.warn(`⚠️  JSON parse error in ${dataPath}: ${err.message}`);
			}
			// Missing file — skip silently
			continue;
		}

		const metrics = computeDeckMetrics(slides, language);

		presentations.push({
			dir,
			dirName,
			topic,
			language,
			config,
			slides,
			metrics,
		});
	}

	return presentations;
}
