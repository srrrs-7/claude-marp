import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { YAMLParseError, parse } from "yaml";
import { z } from "zod";
import { CONFIG_FILENAME } from "../constants.js";
import { type SlidesConfig, slidesConfigSchema } from "./schema.js";

function validateConfig(data: unknown, configPath: string): SlidesConfig {
	try {
		return slidesConfigSchema.parse(data);
	} catch (err) {
		if (err instanceof z.ZodError) {
			const issues = err.issues
				.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
				.join("\n");
			throw new Error(`Config validation failed in ${configPath}:\n${issues}`);
		}
		throw err;
	}
}

const DEFAULTS_FILENAME = "slides.defaults.yaml";

/**
 * Deep-merge two plain objects. `override` values win over `base` values.
 * Arrays are replaced (not concatenated). Non-object values are replaced.
 */
function deepMerge(
	base: Record<string, unknown>,
	override: Record<string, unknown>,
): Record<string, unknown> {
	const result: Record<string, unknown> = structuredClone(base);
	for (const [key, val] of Object.entries(override)) {
		if (
			val !== null &&
			typeof val === "object" &&
			!Array.isArray(val) &&
			typeof result[key] === "object" &&
			result[key] !== null &&
			!Array.isArray(result[key])
		) {
			result[key] = deepMerge(
				result[key] as Record<string, unknown>,
				val as Record<string, unknown>,
			);
		} else {
			result[key] = val;
		}
	}
	return result;
}

export async function loadConfig(configPath?: string): Promise<SlidesConfig> {
	const resolvedPath = resolve(configPath ?? CONFIG_FILENAME);

	if (!existsSync(resolvedPath)) {
		throw new Error(
			`Config file not found: ${resolvedPath}\nRun "bun run slides init" to create one.`,
		);
	}

	const raw = await Bun.file(resolvedPath).text();

	let parsed: unknown;
	try {
		parsed = parse(raw);
	} catch (err) {
		if (err instanceof YAMLParseError) {
			const pos = err.linePos?.[0];
			const location = pos ? ` (line ${pos.line}, col ${pos.col})` : "";
			throw new Error(
				`Invalid YAML in ${resolvedPath}${location}:\n  ${err.message}`,
			);
		}
		throw err;
	}

	// Load optional project-level defaults (slides.defaults.yaml in cwd)
	const defaultsPath = resolve(DEFAULTS_FILENAME);
	if (existsSync(defaultsPath)) {
		const defaultsRaw = await Bun.file(defaultsPath).text();
		let defaults: unknown;
		try {
			defaults = parse(defaultsRaw);
		} catch {
			// Malformed defaults file — ignore silently
			defaults = null;
		}
		if (defaults && typeof defaults === "object") {
			const merged = deepMerge(
				defaults as Record<string, unknown>,
				parsed as Record<string, unknown>,
			);
			return validateConfig(merged, resolvedPath);
		}
	}

	return validateConfig(parsed, resolvedPath);
}
