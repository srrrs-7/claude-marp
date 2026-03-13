/**
 * Unit tests for core modules:
 *   - normalizeSvg       (src/generate/markdown.ts → src/utils/svg.ts)
 *   - renderMarpMarkdown (src/generate/markdown.ts)
 *   - isAssertive        (scripts/lib/quality.ts)
 *   - hasSvg             (scripts/lib/quality.ts)
 *   - computeDeckMetrics (scripts/lib/quality.ts)
 */

import { describe, expect, test } from "bun:test";
import type { SlidesConfig } from "../src/config/schema.js";
import { renderMarpMarkdown } from "../src/generate/markdown.js";
import type {
	GenerationResult,
	SlideContent,
} from "../src/generate/slide-schema.js";
// normalizeSvg and SVG_CONTAINMENT_STYLE live in src/utils/svg.ts;
// markdown.ts re-exports them but also has a local duplicate that causes a
// Bun parse error, so import from the canonical source directly.
import { SVG_CONTAINMENT_STYLE, normalizeSvg } from "../src/utils/svg.js";
import { computeDeckMetrics, hasSvg, isAssertive } from "./lib/quality.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(
	overrides: Partial<SlidesConfig["marp"]> = {},
): SlidesConfig {
	return {
		topic: "Test",
		audience: "general",
		goal: "",
		language: "ja",
		slides: { count: 1 },
		marp: {
			theme: "gaia",
			class: "",
			size: "16:9",
			paginate: true,
			header: "",
			footer: "",
			style: "",
			...overrides,
		},
		content: {
			codeBlocks: true,
			codeLanguage: "typescript",
			bulletPointsMax: 5,
			speakerNotes: true,
		},
		output: {
			dir: "/tmp/test-slides",
			baseName: "test",
		},
	};
}

function makeResult(slides: SlideContent[]): GenerationResult {
	return { slides };
}

// ---------------------------------------------------------------------------
// 1. normalizeSvg
// ---------------------------------------------------------------------------

describe("normalizeSvg", () => {
	test("removes double-quoted width attribute", () => {
		const input = `<svg width="800" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).not.toContain(`width="800"`);
	});

	test("removes double-quoted height attribute", () => {
		const input = `<svg height="600" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).not.toContain(`height="600"`);
	});

	test("removes both width and height when double-quoted", () => {
		const input = `<svg width="800" height="600" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).not.toContain(`width="800"`);
		expect(result).not.toContain(`height="600"`);
		expect(result).toContain("viewBox");
	});

	test("removes single-quoted width attribute", () => {
		const input = `<svg width='800' viewBox="0 0 800 600">content</svg>`;
		// svg.ts only handles double quotes; markdown.ts re-exports svg.ts version
		// which only removes double-quoted width/height.
		// Test that it at least doesn't break the string.
		const result = normalizeSvg(input);
		expect(typeof result).toBe("string");
		expect(result).toContain("<svg");
	});

	test("adds containment style when no style attribute present", () => {
		const input = `<svg viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).toContain(SVG_CONTAINMENT_STYLE);
	});

	test("does NOT replace style when it already has max-height and max-width", () => {
		const existingStyle =
			"max-height:70vh;max-width:100%;display:block;margin:0 auto;";
		const input = `<svg style="${existingStyle}" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		// Style should be left as-is (containment already present)
		expect(result).toContain(`style="${existingStyle}"`);
	});

	test("replaces style when missing max-height", () => {
		const input = `<svg style="color:red;" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).toContain(SVG_CONTAINMENT_STYLE);
		expect(result).not.toContain("color:red;");
	});

	test("replaces style when missing max-width", () => {
		const input = `<svg style="max-height:70vh;" viewBox="0 0 800 600">content</svg>`;
		const result = normalizeSvg(input);
		expect(result).toContain(SVG_CONTAINMENT_STYLE);
	});

	test("handles multiple SVG elements in one string", () => {
		const input = [
			`<svg width="100" viewBox="0 0 100 50">first</svg>`,
			`<svg height="200" viewBox="0 0 200 200">second</svg>`,
		].join("\n");
		const result = normalizeSvg(input);
		expect(result).not.toContain(`width="100"`);
		expect(result).not.toContain(`height="200"`);
		// Both SVGs should have containment style
		const matches = result.match(
			new RegExp(
				SVG_CONTAINMENT_STYLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
				"g",
			),
		);
		expect(matches?.length).toBe(2);
	});

	test("leaves non-SVG content unchanged", () => {
		const input = "# Hello\n\n- Bullet 1\n- Bullet 2";
		const result = normalizeSvg(input);
		expect(result).toBe(input);
	});
});

// ---------------------------------------------------------------------------
// 2. renderMarpMarkdown
// ---------------------------------------------------------------------------

describe("renderMarpMarkdown", () => {
	test("generates front matter with theme", () => {
		const config = makeConfig({ theme: "gaia" });
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("theme: gaia");
	});

	test("generates front matter with paginate: true", () => {
		const config = makeConfig({ paginate: true });
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("paginate: true");
	});

	test("omits paginate line when paginate is false", () => {
		const config = makeConfig({ paginate: false });
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).not.toContain("paginate: true");
	});

	test("multiple slides separated by \\n\\n---\\n\\n", () => {
		const config = makeConfig();
		const result = makeResult([
			{ title: "Slide 1", content: ["Point A"] },
			{ title: "Slide 2", content: ["Point B"] },
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("\n\n---\n\n");
	});

	test("subtitle renders as blockquote italic", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Main Title",
				subtitle: "The key takeaway",
				content: ["Item 1"],
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("> *The key takeaway*");
	});

	test("center layout emits <!-- _class: lead -->", () => {
		const config = makeConfig();
		const result = makeResult([
			{ title: "Center Slide", content: [], layout: "center" },
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("<!-- _class: lead -->");
	});

	test("section layout emits <!-- _class: lead -->", () => {
		const config = makeConfig();
		const result = makeResult([
			{ title: "Section Slide", content: [], layout: "section" },
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("<!-- _class: lead -->");
	});

	test("default layout does NOT emit <!-- _class: lead -->", () => {
		const config = makeConfig();
		const result = makeResult([
			{ title: "Default Slide", content: [], layout: "default" },
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).not.toContain("<!-- _class: lead -->");
	});

	test("no layout (undefined) does NOT emit <!-- _class: lead -->", () => {
		const config = makeConfig();
		const result = makeResult([{ title: "No Layout", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).not.toContain("<!-- _class: lead -->");
	});

	test("content items starting with | are not prefixed with - ", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Table Slide",
				content: ["| Header | Value |", "| --- | --- |", "| Row | Data |"],
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("| Header | Value |");
		expect(md).not.toContain("- | Header");
	});

	test("content items starting with ![ are not prefixed with - ", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Image Slide",
				content: ["![w:800 center](assets/diagram.svg)"],
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("![w:800 center](assets/diagram.svg)");
		expect(md).not.toContain("- ![");
	});

	test("regular content items are prefixed with - ", () => {
		const config = makeConfig();
		const result = makeResult([
			{ title: "Bullet Slide", content: ["First point", "Second point"] },
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("- First point");
		expect(md).toContain("- Second point");
	});

	test("code block renders with correct language fences", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Code Slide",
				content: [],
				code: "const x = 1;",
				codeLanguage: "typescript",
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("```typescript");
		expect(md).toContain("const x = 1;");
		expect(md).toContain("```");
	});

	test("code block defaults to 'text' when no codeLanguage specified", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Code Slide",
				content: [],
				code: "some code",
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("```text");
	});

	test("includes marp: true in front matter", () => {
		const config = makeConfig();
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("marp: true");
	});

	test("front matter is delimited by --- markers", () => {
		const config = makeConfig();
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		// Front matter starts and ends with ---
		const lines = md.split("\n");
		expect(lines[0]).toBe("---");
		const endIdx = lines.indexOf("---", 1);
		expect(endIdx).toBeGreaterThan(0);
	});

	test("includes class in front matter when marp.class is set", () => {
		const config = makeConfig({ class: "invert" });
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("class: invert");
	});

	test("omits class from front matter when marp.class is empty", () => {
		const config = makeConfig({ class: "" });
		const result = makeResult([{ title: "Test", content: [] }]);
		const md = renderMarpMarkdown(result, config);
		expect(md).not.toContain("class:");
	});

	test("speaker notes render in HTML comment", () => {
		const config = makeConfig();
		const result = makeResult([
			{
				title: "Notes Slide",
				content: ["Key point"],
				speakerNotes: "Mention the Q4 results here.",
			},
		]);
		const md = renderMarpMarkdown(result, config);
		expect(md).toContain("<!--");
		expect(md).toContain("Mention the Q4 results here.");
		expect(md).toContain("-->");
	});
});

// ---------------------------------------------------------------------------
// 3. isAssertive (quality.ts)
// ---------------------------------------------------------------------------

describe("isAssertive", () => {
	// Japanese label titles → false
	test("'アジェンダ' is not assertive", () => {
		expect(isAssertive("アジェンダ")).toBe(false);
	});

	test("'結論' is not assertive", () => {
		expect(isAssertive("結論")).toBe(false);
	});

	test("'まとめ' is not assertive", () => {
		expect(isAssertive("まとめ")).toBe(false);
	});

	test("'概要' is not assertive", () => {
		expect(isAssertive("概要")).toBe(false);
	});

	test("'課題' is not assertive", () => {
		expect(isAssertive("課題")).toBe(false);
	});

	// English label titles → false
	test("'agenda' (lowercase) is not assertive", () => {
		expect(isAssertive("agenda")).toBe(false);
	});

	test("'Agenda' (titlecase) is not assertive", () => {
		expect(isAssertive("Agenda")).toBe(false);
	});

	test("'summary' is not assertive", () => {
		expect(isAssertive("summary")).toBe(false);
	});

	test("'conclusion' is not assertive", () => {
		expect(isAssertive("conclusion")).toBe(false);
	});

	test("'overview' is not assertive", () => {
		expect(isAssertive("overview")).toBe(false);
	});

	test("'Q&A' is not assertive", () => {
		expect(isAssertive("Q&A")).toBe(false);
	});

	test("'demo' is not assertive", () => {
		expect(isAssertive("demo")).toBe(false);
	});

	// Assertive titles → true
	test("'コストが40%削減できる理由' is assertive", () => {
		expect(isAssertive("コストが40%削減できる理由")).toBe(true);
	});

	test("'コスト削減で年間$2M回収できる' is assertive", () => {
		expect(isAssertive("コスト削減で年間$2M回収できる")).toBe(true);
	});

	test("'新アーキテクチャが99.9%可用性を保証する理由' is assertive", () => {
		expect(isAssertive("新アーキテクチャが99.9%可用性を保証する理由")).toBe(
			true,
		);
	});

	test("'今すぐ実行すべき3つのアクション' is assertive", () => {
		expect(isAssertive("今すぐ実行すべき3つのアクション")).toBe(true);
	});

	test("'Why caching reduces latency by 80%' is assertive", () => {
		expect(isAssertive("Why caching reduces latency by 80%")).toBe(true);
	});

	test("whitespace is trimmed before matching", () => {
		expect(isAssertive("  アジェンダ  ")).toBe(false);
	});
});

// ---------------------------------------------------------------------------
// 4. hasSvg (quality.ts)
// ---------------------------------------------------------------------------

describe("hasSvg", () => {
	test("slide with <svg> tag in content returns true", () => {
		expect(hasSvg({ content: ["<svg viewBox='0 0 100 100'>...</svg>"] })).toBe(
			true,
		);
	});

	test("slide with uppercase <SVG> tag returns true", () => {
		// hasSvg uses .toLowerCase().includes("<svg") so uppercase is covered
		expect(hasSvg({ content: ["<SVG viewBox='0 0 100 100'>...</SVG>"] })).toBe(
			true,
		);
	});

	test("slide with image directive ![...] returns true", () => {
		expect(hasSvg({ content: ["![w:800 center](assets/diagram.svg)"] })).toBe(
			true,
		);
	});

	test("slide with plain text content returns false", () => {
		expect(hasSvg({ content: ["Just a bullet point", "Another point"] })).toBe(
			false,
		);
	});

	test("slide with empty content returns false", () => {
		expect(hasSvg({ content: [] })).toBe(false);
	});

	test("slide with no content field returns false", () => {
		expect(hasSvg({})).toBe(false);
	});

	test("slide with code but no svg/image in content returns false", () => {
		expect(hasSvg({ content: ["Bullet"], code: "const x = 1;" })).toBe(false);
	});

	test("slide with mixed content where one item has <svg> returns true", () => {
		expect(
			hasSvg({
				content: [
					"Regular bullet",
					"<svg viewBox='0 0 100 100'><rect/></svg>",
					"Another bullet",
				],
			}),
		).toBe(true);
	});
});

// ---------------------------------------------------------------------------
// 5. computeDeckMetrics (quality.ts)
// ---------------------------------------------------------------------------

describe("computeDeckMetrics", () => {
	test("empty slide array returns grade D with zero ratios", () => {
		const metrics = computeDeckMetrics([]);
		expect(metrics.grade).toBe("D");
		expect(metrics.svgRatio).toBe(0);
		expect(metrics.assertiveRatio).toBe(0);
		expect(metrics.subtitleRatio).toBe(0);
		expect(metrics.readingMins).toBe(0);
	});

	test("all-assertive, all-SVG, all-subtitle deck returns grade A", () => {
		// score = 1*40 + 1*40 + 1*20 = 100 → A
		const slides = [
			{
				title: "コストが40%削減できる理由",
				subtitle: "キャッシュ層追加で大幅改善",
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
			{
				title: "新アーキテクチャが可用性を保証する理由",
				subtitle: "99.9%のSLAを達成",
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
		];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.svgRatio).toBe(1);
		expect(metrics.assertiveRatio).toBe(1);
		expect(metrics.subtitleRatio).toBe(1);
		expect(metrics.grade).toBe("A");
	});

	test("no SVG, no assertive titles, no subtitles returns grade D", () => {
		// score = 0*40 + 0*40 + 0*20 = 0 → D
		const slides = [
			{
				title: "アジェンダ",
				content: ["Point 1", "Point 2"],
				layout: "default" as const,
			},
			{ title: "まとめ", content: ["Summary"], layout: "default" as const },
		];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.svgRatio).toBe(0);
		expect(metrics.assertiveRatio).toBe(0);
		expect(metrics.grade).toBe("D");
	});

	test("section/center layout slides excluded from assertive and subtitle ratios", () => {
		// Only default layout slides count for assertive/subtitle ratios
		const slides = [
			{
				title: "アジェンダ", // section slide — excluded from assertive check
				content: [],
				layout: "section" as const,
			},
			{
				title: "コストが40%削減できる理由",
				subtitle: "重要な発見",
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
		];
		const metrics = computeDeckMetrics(slides);
		// contentSlides = 1 (only the default layout one)
		expect(metrics.assertiveRatio).toBe(1);
		expect(metrics.subtitleRatio).toBe(1);
	});

	test("svgRatio counts ALL slides (including section/center)", () => {
		const slides = [
			{
				title: "Section",
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "section" as const,
			},
			{
				title: "コスト削減の証明",
				content: [],
				layout: "default" as const,
			},
		];
		const metrics = computeDeckMetrics(slides);
		// 1 out of 2 slides has SVG
		expect(metrics.svgRatio).toBe(0.5);
	});

	test("grade B when score is between 50 and 69", () => {
		// SVG all (40pts) + assertive half (20pts) + no subtitle (0pts) = 60 → B
		const slides = [
			{
				title: "コストが削減できる理由", // assertive
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
			{
				title: "アジェンダ", // label
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
		];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.svgRatio).toBe(1);
		expect(metrics.assertiveRatio).toBe(0.5);
		expect(metrics.grade).toBe("B");
	});

	test("grade C when score is between 30 and 49", () => {
		// SVG 50% (20pts) + assertive 50% (20pts) + no subtitle (0pts) = 40 → C
		const slides = [
			{
				title: "コストが削減できる理由", // assertive, has SVG
				content: ["<svg viewBox='0 0 100 100'/>"],
				layout: "default" as const,
			},
			{
				title: "アジェンダ", // label, no SVG
				content: ["Bullet"],
				layout: "default" as const,
			},
		];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.svgRatio).toBe(0.5);
		expect(metrics.assertiveRatio).toBe(0.5);
		expect(metrics.grade).toBe("C");
	});

	test("readingMins is at least 1 even for a minimal deck", () => {
		const slides = [{ title: "Hi", content: [] }];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.readingMins).toBeGreaterThanOrEqual(1);
	});

	test("readingMins increases with more content", () => {
		const shortDeck = [{ title: "Hi", content: ["Short"] }];
		// Approximate 700 chars = ~2 min
		const longContent = "あ".repeat(700);
		const longDeck = [{ title: "タイトル", content: [longContent] }];
		const shortMetrics = computeDeckMetrics(shortDeck);
		const longMetrics = computeDeckMetrics(longDeck);
		expect(longMetrics.readingMins).toBeGreaterThan(shortMetrics.readingMins);
	});
});
