import { describe, expect, test } from "bun:test";
import {
	DEFAULT_BASE_FONT_PX,
	FIT_STEPS,
	estimateFit,
	resolveBaseFontPx,
	textWidthEm,
} from "../generate/fit.js";
import type { SlideContent } from "../generate/slide-schema.js";

function slide(overrides: Partial<SlideContent> = {}): SlideContent {
	return { title: "T", content: [], ...overrides };
}

/** A bullet of roughly one rendered line at the default 35px base. */
const SHORT = "短い箇条書き";
/** A bullet long enough to wrap onto a second line. */
const LONG =
	"これはスライドの一行にはとても収まらない長さの箇条書きで、確実に折り返します";

describe("textWidthEm", () => {
	test("counts full-width characters as one em and Latin as roughly half", () => {
		const cjk = textWidthEm("あいうえお");
		const latin = textWidthEm("abcde");
		expect(cjk).toBeGreaterThan(latin);
		expect(cjk / latin).toBeGreaterThan(1.5);
	});

	test("ignores markdown emphasis markers", () => {
		expect(textWidthEm("**強調**")).toBeCloseTo(textWidthEm("強調"), 5);
	});
});

describe("resolveBaseFontPx", () => {
	test("falls back to the theme default when no override is present", () => {
		expect(resolveBaseFontPx(undefined)).toBe(DEFAULT_BASE_FONT_PX);
		expect(resolveBaseFontPx("section pre code { font-size: 0.58em; }")).toBe(
			DEFAULT_BASE_FONT_PX,
		);
	});

	test("reads a px override", () => {
		expect(resolveBaseFontPx("section { font-size: 22px; }")).toBe(22);
	});

	test("resolves an em override against 16px, the way the browser does", () => {
		// `1.05em` reads as "5% larger" but inherits from 16px, not the theme's
		// 35px — the deck actually renders at 16.8px.
		expect(resolveBaseFontPx("section { font-size: 1.05em; }")).toBeCloseTo(
			16.8,
			5,
		);
	});
});

describe("estimateFit", () => {
	test("leaves a sparse slide alone", () => {
		const fit = estimateFit(slide({ content: [SHORT, SHORT] }));
		expect(fit.scale).toBe(1);
		expect(fit.className).toBeNull();
		expect(fit.overBudget).toBe(false);
	});

	test("shrinks a slide whose bullets exceed the content box", () => {
		const fit = estimateFit(slide({ content: Array(8).fill(LONG) }));
		expect(fit.scale).toBeLessThan(1);
		expect(fit.className).toBe(`fit-${Math.round(fit.scale * 100)}`);
		expect([...FIT_STEPS] as number[]).toContain(fit.scale);
	});

	test("shrinks more as content grows", () => {
		const light = estimateFit(slide({ content: Array(6).fill(LONG) }));
		const heavy = estimateFit(slide({ content: Array(14).fill(LONG) }));
		expect(heavy.scale).toBeLessThanOrEqual(light.scale);
	});

	test("flags a slide that cannot fit even at the smallest step", () => {
		const fit = estimateFit(slide({ content: Array(40).fill(LONG) }));
		expect(fit.overBudget).toBe(true);
		expect(fit.scale).toBe(FIT_STEPS[FIT_STEPS.length - 1]);
	});

	test("reserves room for a diagram", () => {
		const bullets = Array(5).fill(LONG);
		const withoutFigure = estimateFit(slide({ content: bullets }));
		const withFigure = estimateFit(
			slide({ content: ['<svg viewBox="0 0 8 4"></svg>', ...bullets] }),
		);
		expect(withFigure.requiredEm).toBeGreaterThan(withoutFigure.requiredEm);
	});

	test("does not count the interior lines of a multi-line SVG as bullets", () => {
		const oneItem = estimateFit(
			slide({ content: ['<svg viewBox="0 0 8 4"><rect /></svg>'] }),
		);
		const manyItems = estimateFit(
			slide({
				content: ['<svg viewBox="0 0 8 4">', "  <rect />", "</svg>"],
			}),
		);
		expect(manyItems.requiredEm).toBeCloseTo(oneItem.requiredEm, 5);
	});

	test("ignores table separator rows, which render as no row at all", () => {
		const withSeparator = estimateFit(
			slide({ content: ["| a | b |", "| --- | --- |", "| 1 | 2 |"] }),
		);
		const withoutSeparator = estimateFit(
			slide({ content: ["| a | b |", "| 1 | 2 |"] }),
		);
		expect(withSeparator.requiredEm).toBeCloseTo(
			withoutSeparator.requiredEm,
			5,
		);
	});

	test("scales relative to the deck's own base font size", () => {
		const content = Array(8).fill(LONG);
		// A deck already rendering at 22px has proportionally more room for text,
		// so it needs less shrinking than the same content at 35px.
		const atDefault = estimateFit(slide({ content }), DEFAULT_BASE_FONT_PX);
		const atSmallBase = estimateFit(slide({ content }), 22);
		expect(atSmallBase.scale).toBeGreaterThan(atDefault.scale);
	});
});
