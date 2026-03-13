import { describe, expect, test } from "bun:test";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { loadConfig } from "../config/loader.js";

const TMP = resolve(import.meta.dir, "../../.tmp-test");

function writeTmp(name: string, content: string): string {
	const path = resolve(TMP, name);
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, content);
	return path;
}

describe("loadConfig", () => {
	test("loads a valid config file", async () => {
		const path = writeTmp("valid.yaml", `topic: "Test Deck"\n`);
		const config = await loadConfig(path);
		expect(config.topic).toBe("Test Deck");
	});

	test("throws for missing file", async () => {
		await expect(loadConfig(resolve(TMP, "nonexistent.yaml"))).rejects.toThrow(
			"Config file not found",
		);
	});

	test("throws with helpful message for invalid YAML syntax", async () => {
		const path = writeTmp("bad-syntax.yaml", `topic: "unclosed\nfoo: bar\n`);
		await expect(loadConfig(path)).rejects.toThrow("Invalid YAML");
	});

	test("throws with field path for Zod validation errors", async () => {
		// slides.count out of range (max 200)
		const path = writeTmp(
			"invalid-schema.yaml",
			`topic: "Test"\nslides:\n  count: 9999\n`,
		);
		await expect(loadConfig(path)).rejects.toThrow("Config validation failed");
	});

	test("applies defaults for optional fields", async () => {
		const path = writeTmp("minimal.yaml", `topic: "Minimal"\n`);
		const config = await loadConfig(path);
		expect(config.marp.theme).toBeTruthy();
		expect(config.slides.count).toBeGreaterThan(0);
	});

	// Cleanup
	test("cleanup tmp dir", () => {
		try {
			rmSync(TMP, { recursive: true });
		} catch {
			// ignore
		}
		expect(true).toBe(true);
	});
});
