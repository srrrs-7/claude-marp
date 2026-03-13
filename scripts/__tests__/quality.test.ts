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
	validateSlideQuality,
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

describe("validateSlideQuality", () => {
	test("returns empty array for ideal slide", () => {
		const slides = [
			{
				title: "このアーキテクチャが99.9%可用性を保証する理由",
				layout: "default" as const,
				content: ["![diagram](assets/d.svg)"],
				subtitle: "key insight here",
				speakerNotes: "explain why this matters",
			},
		];
		const warnings = validateSlideQuality(slides);
		// Should have no label_title, long_bullet, or missing_subtitle
		expect(warnings.filter((w) => w.type === "label_title")).toHaveLength(0);
		expect(warnings.filter((w) => w.type === "long_bullet")).toHaveLength(0);
		expect(warnings.filter((w) => w.type === "missing_subtitle")).toHaveLength(
			0,
		);
	});

	test("flags label titles on content slides", () => {
		const slides = [
			{
				title: "まとめ",
				layout: "default" as const,
				content: ["item"],
				speakerNotes: "notes",
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "label_title")).toBe(true);
	});

	test("does not flag label titles on section slides", () => {
		const slides = [
			{
				title: "まとめ",
				layout: "section" as const,
				content: [],
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "label_title")).toBe(false);
	});

	test("flags bullets exceeding MAX_BULLET_CHARS", () => {
		const longBullet = "a".repeat(80);
		const slides = [
			{
				title: "有効なアサーティブなタイトルです",
				layout: "default" as const,
				content: [longBullet],
				speakerNotes: "notes",
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "long_bullet")).toBe(true);
	});

	test("does not flag table rows as long bullets", () => {
		const slides = [
			{
				title: "比較表でコスト削減効果を示す",
				layout: "default" as const,
				content: [
					"| Header 1 | Header 2 | Header 3 | Header 4 | Header 5 |",
					"| --- | --- | --- | --- | --- |",
					"| a".repeat(20) + " |",
				],
				speakerNotes: "notes",
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "long_bullet")).toBe(false);
	});

	test("flags missing subtitle on dense text slides (4+ bullets)", () => {
		const slides = [
			{
				title: "このシステムが高速である4つの理由",
				layout: "default" as const,
				content: ["item 1", "item 2", "item 3", "item 4"],
				speakerNotes: "notes",
				// no subtitle
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "missing_subtitle")).toBe(true);
	});

	test("does not flag missing subtitle when SVG present", () => {
		const slides = [
			{
				title: "このアーキテクチャが安全な理由",
				layout: "default" as const,
				content: ["item 1", "item 2", "item 3", "item 4", "![d](assets/d.svg)"],
				speakerNotes: "notes",
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "missing_subtitle")).toBe(false);
	});

	test("flags consecutive text-only slides (3+)", () => {
		const slides = Array.from({ length: 4 }, (_, i) => ({
			title: `スライド${i + 1}で重要な主張を述べる`,
			layout: "default" as const,
			content: ["text only"],
			speakerNotes: "notes",
		}));
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "consecutive_text")).toBe(true);
	});

	test("resets consecutive text counter after SVG slide", () => {
		const slides = [
			{
				title: "主張1を述べる",
				layout: "default" as const,
				content: ["text"],
				speakerNotes: "n",
			},
			{
				title: "主張2を述べる",
				layout: "default" as const,
				content: ["text"],
				speakerNotes: "n",
			},
			{
				title: "図解で主張を示す",
				layout: "default" as const,
				content: ["![d](assets/d.svg)"],
				speakerNotes: "n",
			},
			{
				title: "主張3を述べる",
				layout: "default" as const,
				content: ["text"],
				speakerNotes: "n",
			},
			{
				title: "主張4を述べる",
				layout: "default" as const,
				content: ["text"],
				speakerNotes: "n",
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "consecutive_text")).toBe(false);
	});

	test("flags missing speaker notes on content slides", () => {
		const slides = [
			{
				title: "このデータが重要な理由",
				layout: "default" as const,
				content: ["some content"],
				// no speakerNotes
			},
		];
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "missing_notes")).toBe(true);
	});

	test("flags weak narrative for deck with <60% assertive titles", () => {
		const slides = Array.from({ length: 10 }, (_, i) => ({
			title: i < 7 ? "まとめ" : "この結果が重要な理由を説明する",
			layout: "default" as const,
			content: ["content"],
			speakerNotes: "notes",
		}));
		const warnings = validateSlideQuality(slides);
		expect(warnings.some((w) => w.type === "weak_narrative")).toBe(true);
	});

	test("slideIndex in warnings is 1-based", () => {
		const slides = [
			{
				title: "まとめ",
				layout: "default" as const,
				content: ["x"],
				speakerNotes: "n",
			},
		];
		const warnings = validateSlideQuality(slides);
		const w = warnings.find((w) => w.type === "label_title");
		expect(w?.slideIndex).toBe(1);
	});
});
