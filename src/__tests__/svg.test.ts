import { describe, expect, test } from "bun:test";
import { SVG_CONTAINMENT_STYLE, normalizeSvg } from "../utils/svg.js";

describe("SVG_CONTAINMENT_STYLE", () => {
	test("contains max-height, max-width, display, margin", () => {
		expect(SVG_CONTAINMENT_STYLE).toContain("max-height");
		expect(SVG_CONTAINMENT_STYLE).toContain("max-width");
		expect(SVG_CONTAINMENT_STYLE).toContain("display:block");
		expect(SVG_CONTAINMENT_STYLE).toContain("margin:0 auto");
	});
});

describe("normalizeSvg", () => {
	test("removes hardcoded width attribute (double-quoted)", () => {
		const input = `<svg width="800" height="600" viewBox="0 0 800 600">`;
		const result = normalizeSvg(input);
		expect(result).not.toContain('width="800"');
		expect(result).not.toContain('height="600"');
		expect(result).toContain("viewBox");
	});

	test("removes hardcoded width attribute (single-quoted)", () => {
		const input = `<svg width='800' height='600' viewBox='0 0 800 600'>`;
		const result = normalizeSvg(input);
		expect(result).not.toContain("width='800'");
		expect(result).not.toContain("height='600'");
	});

	test("adds containment style when no style attribute", () => {
		const input = `<svg viewBox="0 0 100 100">`;
		const result = normalizeSvg(input);
		expect(result).toContain("max-height");
		expect(result).toContain("max-width");
	});

	test("replaces incomplete style attribute (missing max-height)", () => {
		const input = `<svg style="color:red" viewBox="0 0 100 100">`;
		const result = normalizeSvg(input);
		expect(result).toContain("max-height");
	});

	test("strips vh-based sizing (vh resolves against the window, not the slide)", () => {
		const input = `<svg style="max-height:70vh;max-width:100%" viewBox="0 0 100 100">`;
		const result = normalizeSvg(input);
		expect(result).not.toContain("vh");
		expect(result).toContain("height:100%");
	});

	test("keeps author declarations that are not about sizing", () => {
		const input = `<svg style="filter:drop-shadow(2px 2px 3px rgba(0,0,0,.15));width:800px" viewBox="0 0 100 100">`;
		const result = normalizeSvg(input);
		expect(result).toContain("filter:drop-shadow(2px 2px 3px rgba(0,0,0,.15))");
		expect(result).not.toContain("width:800px");
	});

	test("does not modify non-SVG content", () => {
		const input = "Hello <div>world</div>";
		expect(normalizeSvg(input)).toBe(input);
	});

	test("handles multiple SVG tags in the same string", () => {
		const input = [
			`<svg width="100" height="100">content1</svg>`,
			`<svg width="200" height="200">content2</svg>`,
		].join("\n");
		const result = normalizeSvg(input);
		expect(result).not.toContain('width="100"');
		expect(result).not.toContain('width="200"');
	});
});
