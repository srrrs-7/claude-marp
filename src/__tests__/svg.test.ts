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

	test("does not modify style with both max-height and max-width", () => {
		const style = "max-height:70vh;max-width:100%";
		const input = `<svg style="${style}" viewBox="0 0 100 100">`;
		const result = normalizeSvg(input);
		expect(result).toContain(style);
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
