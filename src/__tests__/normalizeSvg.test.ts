import { describe, expect, test } from "bun:test";
import { SVG_CONTAINMENT_STYLE, normalizeSvg } from "../generate/markdown.js";

describe("normalizeSvg", () => {
	test("removes hardcoded width and height", () => {
		const svg = '<svg width="800" height="600" viewBox="0 0 800 600"></svg>';
		const result = normalizeSvg(svg);
		expect(result).not.toContain('width="800"');
		expect(result).not.toContain('height="600"');
	});

	test("adds containment style when none exists", () => {
		const svg = '<svg viewBox="0 0 100 100"></svg>';
		const result = normalizeSvg(svg);
		expect(result).toContain("max-height");
		expect(result).toContain("max-width");
	});

	test("skips style injection when both max-height and max-width present", () => {
		const svg =
			'<svg style="max-height:70vh;max-width:100%;display:block;margin:0 auto;"></svg>';
		const result = normalizeSvg(svg);
		// Should not duplicate styles
		expect((result.match(/max-height/g) ?? []).length).toBe(1);
	});

	test("merges containment when only max-height present", () => {
		const svg = '<svg style="max-height:80vh;color:red;"></svg>';
		const result = normalizeSvg(svg);
		expect(result).toContain("max-width");
		expect(result).toContain("max-height");
	});

	test("passes through non-SVG content unchanged", () => {
		const md = "# Hello\n\n- item 1\n- item 2";
		expect(normalizeSvg(md)).toBe(md);
	});

	test("SVG_CONTAINMENT_STYLE contains required properties", () => {
		expect(SVG_CONTAINMENT_STYLE).toContain("max-height");
		expect(SVG_CONTAINMENT_STYLE).toContain("max-width");
		expect(SVG_CONTAINMENT_STYLE).toContain("display:block");
		expect(SVG_CONTAINMENT_STYLE).toContain("margin:0 auto");
	});
});
