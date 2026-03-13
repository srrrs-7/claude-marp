import { describe, expect, test } from "bun:test";
import {
	GRADE_A_MIN,
	GRADE_B_MIN,
	GRADE_C_MIN,
	READING_SPEED_EN,
	READING_SPEED_JA,
} from "../lib/constants.js";
import {
	computeDeckMetrics,
	estimateMins,
	hasSvg,
	isAssertive,
} from "../lib/quality.js";

describe("isAssertive", () => {
	test("returns false for generic label titles", () => {
		expect(isAssertive("まとめ")).toBe(false);
		expect(isAssertive("概要")).toBe(false);
		expect(isAssertive("agenda")).toBe(false);
		expect(isAssertive("Summary")).toBe(false);
	});

	test("returns true for assertive conclusion titles", () => {
		expect(isAssertive("コストが40%削減できる理由")).toBe(true);
		expect(isAssertive("New architecture guarantees 99.9% uptime")).toBe(true);
	});
});

describe("hasSvg", () => {
	test("detects inline SVG", () => {
		expect(hasSvg({ content: ["<svg viewBox='0 0 100 100'></svg>"] })).toBe(
			true,
		);
	});

	test("detects image directive", () => {
		expect(hasSvg({ content: ["![diagram](assets/diagram.svg)"] })).toBe(true);
	});

	test("returns false for plain text", () => {
		expect(hasSvg({ content: ["plain text bullet"] })).toBe(false);
	});

	test("returns false for empty slide", () => {
		expect(hasSvg({})).toBe(false);
	});
});

describe("estimateMins", () => {
	test("returns at least 1 minute for a non-empty deck", () => {
		expect(estimateMins([{ title: "hi", content: [] }])).toBeGreaterThanOrEqual(
			1,
		);
	});

	test("returns 1 for empty deck (Math.max(1, ceil(0/350)) = 1)", () => {
		// estimateMins counts chars; empty array → 0 chars → Math.max(1, 0) = 1
		expect(estimateMins([])).toBe(1);
	});

	test("scales with content length", () => {
		const longSlides = Array.from({ length: 10 }, () => ({
			title: "a".repeat(100),
			content: ["b".repeat(200)],
		}));
		expect(estimateMins(longSlides)).toBeGreaterThan(1);
	});
});

describe("computeDeckMetrics", () => {
	test("returns D grade for empty deck", () => {
		expect(computeDeckMetrics([]).grade).toBe("D");
	});

	test("returns A grade for high-quality deck", () => {
		const slides = Array.from({ length: 10 }, (_, i) => ({
			title: `このスライドで${i + 1}番目の主張を述べる`,
			content: ["![diagram](assets/d.svg)"],
			subtitle: "So what: important conclusion",
			layout: "default" as const,
		}));
		const metrics = computeDeckMetrics(slides);
		expect(metrics.assertiveRatio).toBeGreaterThan(0.6);
		expect(metrics.svgRatio).toBeGreaterThan(0.5);
		expect(metrics.grade).toBe("A");
	});

	test("counts only default-layout slides for assertive ratio", () => {
		const slides = [
			{ title: "概要", layout: "section" as const, content: [] },
			{
				title: "結論を明確に述べる具体的な主張",
				layout: "default" as const,
				content: [],
			},
		];
		const metrics = computeDeckMetrics(slides);
		// section slide should not count against assertive ratio
		expect(metrics.assertiveRatio).toBe(1);
	});

	test("svgRatio reflects proportion of slides with SVG", () => {
		const slides = [
			{ title: "スライド1の主張", content: ["![d](assets/d.svg)"] },
			{ title: "スライド2の主張", content: ["plain text"] },
		];
		const metrics = computeDeckMetrics(slides);
		expect(metrics.svgRatio).toBe(0.5);
	});

	test("readingMins is positive for non-empty deck", () => {
		const slides = [{ title: "タイトル", content: ["本文テキスト"] }];
		expect(computeDeckMetrics(slides).readingMins).toBeGreaterThanOrEqual(1);
	});

	test("English language gives more readingMins than Japanese for same content", () => {
		const slides = [{ title: "a".repeat(1000), content: [] }];
		const jaMetrics = computeDeckMetrics(slides, "ja");
		const enMetrics = computeDeckMetrics(slides, "en");
		expect(enMetrics.readingMins).toBeGreaterThan(jaMetrics.readingMins);
	});
});

describe("constants", () => {
	test("GRADE thresholds are correctly ordered", () => {
		expect(GRADE_A_MIN).toBeGreaterThan(GRADE_B_MIN);
		expect(GRADE_B_MIN).toBeGreaterThan(GRADE_C_MIN);
		expect(GRADE_C_MIN).toBeGreaterThan(0);
	});

	test("English reading speed is slower than Japanese", () => {
		// EN speed is lower chars/min → more minutes for same content
		expect(READING_SPEED_EN).toBeLessThan(READING_SPEED_JA);
	});
});

describe("estimateMins language parameter", () => {
	test("defaults to Japanese speed", () => {
		const chars = READING_SPEED_JA; // exactly 1 minute at JA speed
		const slide = { title: "a".repeat(chars), content: [] };
		expect(estimateMins([slide])).toBe(1);
	});

	test("uses English speed when language='en'", () => {
		const chars = READING_SPEED_EN; // exactly 1 minute at EN speed
		const slide = { title: "a".repeat(chars), content: [] };
		expect(estimateMins([slide], "en")).toBe(1);
	});
});
