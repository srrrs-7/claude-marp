import { describe, expect, test } from "bun:test";
import type { SlidesConfig } from "../config/schema.js";
import { slidesConfigSchema } from "../config/schema.js";
import { renderMarpMarkdown } from "../generate/markdown.js";

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

	test("separates a table from preceding bullets with a blank line", () => {
		// Without the blank line the rows become a lazy continuation of the last
		// list item and render as literal text inside <li> instead of a table.
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{ title: "T", content: ["intro", "| A | B |", "| --- | --- |"] },
				],
			},
			config,
		);
		expect(result).toContain("- intro\n\n| A | B |\n| --- | --- |");
	});

	test("wraps inline SVG in a .fig block instead of a list item", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{ title: "T", content: ["lead in", '<svg viewBox="0 0 8 4"></svg>'] },
				],
			},
			config,
		);
		expect(result).toContain('<div class="fig">');
		expect(result).toContain("</div>");
		expect(result).not.toContain("- <svg");
		expect(result).toContain('- lead in\n\n<div class="fig">');
	});

	test("keeps a multi-line inline SVG inside one .fig block", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{
				slides: [
					{
						title: "T",
						content: [
							'<svg viewBox="0 0 8 4">',
							'  <rect width="8" height="4" />',
							"</svg>",
							"after",
						],
					},
				],
			},
			config,
		);
		const fig = result.slice(
			result.indexOf('<div class="fig">'),
			result.indexOf("</div>") + 6,
		);
		expect(fig).toContain("<rect");
		expect(fig).toContain("</svg>");
		expect(result).toContain("- after");
		expect(result).not.toContain("- <rect");
	});

	test("does not double-prefix items that already carry a list marker", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["- already a bullet", "plain"] }] },
			config,
		);
		expect(result).toContain("- already a bullet");
		expect(result).not.toContain("- - already");
		expect(result).toContain("- plain");
	});

	test("drops blank content items instead of emitting empty bullets", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["first", "", "   ", "second"] }] },
			config,
		);
		expect(result).toContain("- first\n- second");
		expect(result).not.toMatch(/^- *$/m);
	});

	test("base CSS uses no vh units (vh resolves against the window)", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [] }] },
			config,
		);
		// Strip CSS comments first — they name vh on purpose, to explain the ban.
		const css = result
			.slice(0, result.lastIndexOf("---"))
			.replace(/\/\*[\s\S]*?\*\//g, "");
		expect(css).not.toMatch(/[\d.]+vh/);
		expect(css).toContain("flex-direction: column");
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

	test("uses a longer fence when the code contains its own ``` fence", () => {
		// A short fence closed the block early and everything after it — the rest
		// of the deck — was swallowed into the code element.
		const config = makeConfig();
		const code = "# CLAUDE.md\n\n```bash\nbun test\n```\n";
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [], code, codeLanguage: "markdown" }] },
			config,
		);
		expect(result).toContain("````markdown");
		expect(result).toContain(code);
		// The outer fence must be closed by one of equal length.
		const body = result.slice(result.indexOf("````markdown"));
		expect(body.trimEnd().endsWith("````")).toBe(true);
	});

	test("emits a content item with its own fence as a block, not a bullet", () => {
		// `- ```js` opened a fence inside a list item whose closing fence sat at
		// column 0, so the block never closed and swallowed the following slides.
		const config = makeConfig();
		const snippet = "```javascript\nconst x = 1;\n```";
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["intro", snippet, "after"] }] },
			config,
		);
		expect(result).not.toContain("- ```");
		expect(result).toContain(`- intro\n\n${snippet}\n\n- after`);
	});

	test("keeps the plain fence when the code has no backticks", () => {
		const config = makeConfig();
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [], code: "const x = 1;" }] },
			config,
		);
		expect(result).toContain("```text\nconst x = 1;\n```");
	});

	test("injects marp.class into front matter when set", () => {
		const config = makeConfig({ class: "invert" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [] }] },
			config,
		);
		expect(result).toContain("class: invert");
	});

	test("repeats the deck class on slides that need a local _class", () => {
		// `_class` replaces the deck-level `class`, so a lead slide in an invert
		// deck rendered light unless "invert" is repeated here.
		const config = makeConfig({ class: "invert" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: [], layout: "center" }] },
			config,
		);
		expect(result).toContain("<!-- _class: invert lead -->");
	});

	test("omits the local _class when the slide adds nothing to it", () => {
		const config = makeConfig({ class: "invert" });
		const result = renderMarpMarkdown(
			{ slides: [{ title: "T", content: ["short"] }] },
			config,
		);
		expect(result).not.toContain("_class:");
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
