import { describe, expect, test } from "bun:test";
import { renderMarpMarkdown } from "../generate/markdown.js";
import type { SlidesConfig } from "../config/schema.js";
import { slidesConfigSchema } from "../config/schema.js";

function makeConfig(
	overrides: Partial<SlidesConfig["marp"]> = {},
): SlidesConfig {
	return slidesConfigSchema.parse({
		topic: "Test",
		marp: overrides,
	});
}

describe("renderMarpMarkdown", () => {
	test("produces valid Marp front matter", () => {
		const config = makeConfig({ theme: "gaia" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "Hello", content: ["world"] }] },
			config,
		);
		expect(result).toContain("marp: true");
		expect(result).toContain("theme: gaia");
		expect(result).toContain("---");
	});

	test("front matter and first slide joined with double newline only", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "Slide 1", content: [] }] },
			config,
		);
		const parts = result.split("\n\n---\n\n");
		// First part is front-matter + first slide joined by \n\n
		expect(parts.length).toBe(1); // single slide, no separator
		expect(result).toMatch(/---\n\n#/);
	});

	test("multiple slides separated by ---", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{ title: "Slide 1", content: [] },
					{ title: "Slide 2", content: [] },
				],
			},
			config,
		);
		expect(result).toContain("\n\n---\n\n");
	});

	test("renders bullet points with - prefix", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["point A", "point B"] }] },
			config,
		);
		expect(result).toContain("- point A");
		expect(result).toContain("- point B");
	});

	test("renders table rows verbatim (starting with |)", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["| Col1 | Col2 |"] }] },
			config,
		);
		expect(result).toContain("| Col1 | Col2 |");
		expect(result).not.toContain("- | Col1");
	});

	test("renders image directives verbatim (starting with ![)", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["![w:800](img.svg)"] }] },
			config,
		);
		expect(result).toContain("![w:800](img.svg)");
		expect(result).not.toContain("- ![");
	});

	test("renders subtitle as blockquote", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{
						title: "T",
						subtitle: "Key insight here",
						content: [],
					},
				],
			},
			config,
		);
		expect(result).toContain("> *Key insight here*");
	});

	test("renders center layout with _class: lead", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [], layout: "center" }] },
			config,
		);
		expect(result).toContain("<!-- _class: lead -->");
	});

	test("renders section layout with _class: lead", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [], layout: "section" }] },
			config,
		);
		expect(result).toContain("<!-- _class: lead -->");
	});

	test("renders code block with language", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{
						title: "T",
						content: [],
						code: "const x = 1;",
						codeLanguage: "typescript",
					},
				],
			},
			config,
		);
		expect(result).toContain("```typescript");
		expect(result).toContain("const x = 1;");
	});

	test("injects marp.class into front matter when set", () => {
		const config = makeConfig({ class: "invert" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [] }] },
			config,
		);
		expect(result).toContain("class: invert");
	});

	test("does not inject class field when empty", () => {
		const config = makeConfig({ class: "" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [] }] },
			config,
		);
		expect(result).not.toContain("class:");
	});

	test("normalizes inline SVG width/height attributes", () => {
		const config = makeConfig();
		const svgContent = `<svg width="800" height="600" viewBox="0 0 800 600"></svg>`;
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [svgContent] }] },
			config,
		);
		expect(result).not.toContain('width="800"');
		expect(result).not.toContain('height="600"');
		expect(result).toContain("max-height");
	});
});
