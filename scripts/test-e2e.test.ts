/**
 * End-to-end smoke test: JSON → Markdown → HTML
 *
 * Uses --dry-run for the export step to avoid spawning Marp CLI in CI,
 * but does perform a full render (JSON → .md) with real file I/O.
 */

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const TMP_DIR = resolve("tmp-e2e-test");
const CONFIG_PATH = resolve(TMP_DIR, "slides.config.yaml");
const DATA_PATH = resolve(TMP_DIR, "slides-data.json");

const SAMPLE_CONFIG = `
topic: "E2E Test Presentation"
language: "en"
slides:
  count: 3
output:
  dir: "${TMP_DIR}"
  baseName: "test-output"
marp:
  theme: "default"
  paginate: true
`.trim();

const SAMPLE_DATA = JSON.stringify({
	slides: [
		{ title: "Title Slide", content: ["Welcome"], layout: "center" },
		{
			title: "This is the key insight",
			subtitle: "So what? Everything changes",
			content: ["Point one", "Point two", "Point three"],
		},
		{
			title: "Code Example Works",
			content: ["Here is some code:"],
			code: "const x = 42;",
			codeLanguage: "typescript",
		},
	],
});

beforeAll(() => {
	mkdirSync(TMP_DIR, { recursive: true });
	Bun.write(CONFIG_PATH, SAMPLE_CONFIG);
	Bun.write(DATA_PATH, SAMPLE_DATA);
});

afterAll(() => {
	rmSync(TMP_DIR, { recursive: true, force: true });
});

describe("E2E: render pipeline (JSON → Markdown)", () => {
	test("renders slides-data.json to .md file", async () => {
		const proc = Bun.spawn(
			["bun", "run", "slides", "render", "-c", CONFIG_PATH, "--in", DATA_PATH],
			{ stdout: "pipe", stderr: "pipe" },
		);
		const exitCode = await proc.exited;
		expect(exitCode).toBe(0);

		const mdPath = resolve(TMP_DIR, "test-output.md");
		const md = await Bun.file(mdPath).text();
		expect(md).toContain("marp: true");
		expect(md).toContain("# Title Slide");
		expect(md).toContain("# This is the key insight");
		expect(md).toContain("> *So what? Everything changes*");
		expect(md).toContain("# Code Example Works");
		expect(md).toContain("```typescript");
		expect(md).toContain("const x = 42;");
		expect(md).toContain("---"); // slide separator
	});

	test("dry-run render does not write file", async () => {
		const dryPath = resolve(TMP_DIR, "dry-output.md");
		// Use a different baseName config
		const dryConfig = SAMPLE_CONFIG.replace("test-output", "dry-output");
		const dryConfigPath = resolve(TMP_DIR, "dry.config.yaml");
		await Bun.write(dryConfigPath, dryConfig);

		const proc = Bun.spawn(
			[
				"bun",
				"run",
				"slides",
				"render",
				"-c",
				dryConfigPath,
				"--in",
				DATA_PATH,
				"--dry-run",
			],
			{ stdout: "pipe", stderr: "pipe" },
		);
		const exitCode = await proc.exited;
		const out = await new Response(proc.stdout).text();
		expect(exitCode).toBe(0);
		expect(out).toContain("DRY RUN");
		expect(await Bun.file(dryPath).exists()).toBe(false);
	});

	test("export dry-run does not spawn Marp CLI", async () => {
		const mdPath = resolve(TMP_DIR, "test-output.md");
		const proc = Bun.spawn(
			[
				"bun",
				"run",
				"slides",
				"export",
				"-c",
				CONFIG_PATH,
				"--in",
				mdPath,
				"--dry-run",
			],
			{ stdout: "pipe", stderr: "pipe" },
		);
		const exitCode = await proc.exited;
		const out = await new Response(proc.stdout).text();
		expect(exitCode).toBe(0);
		expect(out).toContain("DRY RUN");
	});
});
