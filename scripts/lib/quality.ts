/**
 * Shared slide quality metrics used by stats.ts, validate-slides-schema.ts,
 * and generate-index.ts. Single source of truth for LABEL_TITLE_RE and grade computation.
 */

import {
	GRADE_A_MIN,
	GRADE_B_MIN,
	GRADE_C_MIN,
	READING_SPEED_EN,
	READING_SPEED_JA,
} from "./constants.js";

/** Generic label titles — content slides should state conclusions, not just topic nouns. */
export const LABEL_TITLE_RE =
	/^(アジェンダ|目次|概要|まとめ|結論|はじめに|導入|背景|課題|解決策|参考文献|おわりに|終わりに|ご清聴ありがとうございました|ありがとうございました|質疑応答|デモ|agenda|overview|introduction|conclusion|summary|background|problem|solution|next steps?|references?|thank you|q&a|demo|outline|contents?)$/i;

export interface SlideRecord {
	title?: string;
	subtitle?: string;
	content?: string[];
	code?: string;
	speakerNotes?: string;
	layout?: string;
}

/** True if the title is assertive (states a conclusion rather than a topic label). */
export function isAssertive(title: string): boolean {
	return !LABEL_TITLE_RE.test(title.trim());
}

/** True if the slide contains an inline SVG or image directive. */
export function hasSvg(slide: SlideRecord): boolean {
	return (slide.content ?? []).some(
		(c) => c.toLowerCase().includes("<svg") || c.startsWith("!["),
	);
}

/**
 * Estimate reading time in minutes.
 *
 * @param slides  - Array of slide records
 * @param language - "ja" (Japanese, ~350 chars/min) | "en" (English, ~200 chars/min)
 *
 * Counts title + content + speakerNotes characters.
 */
export function estimateMins(
	slides: SlideRecord[],
	language: "ja" | "en" = "ja",
): number {
	let chars = 0;
	for (const s of slides) {
		chars += (s.title ?? "").length;
		for (const c of s.content ?? []) chars += c.length;
		chars += (s.speakerNotes ?? "").length;
	}
	const speed = language === "en" ? READING_SPEED_EN : READING_SPEED_JA;
	return Math.max(1, Math.ceil(chars / speed));
}

export interface DeckMetrics {
	svgRatio: number; // 0..1
	assertiveRatio: number; // 0..1
	subtitleRatio: number; // 0..1
	readingMins: number;
	grade: "A" | "B" | "C" | "D";
}

/**
 * Compute all quality metrics for a deck.
 *
 * Grade scoring (100 pts max):
 *   SVG coverage   40 pts  (figure-first principle)
 *   Assertive titles 40 pts (Google / Amazon standard)
 *   Subtitle (BLUF)  20 pts
 *
 * A ≥ 70 | B ≥ 50 | C ≥ 30 | D < 30
 */
export function computeDeckMetrics(
	slides: SlideRecord[],
	language: "ja" | "en" = "ja",
): DeckMetrics {
	if (slides.length === 0) {
		return {
			svgRatio: 0,
			assertiveRatio: 0,
			subtitleRatio: 0,
			readingMins: 0,
			grade: "D",
		};
	}

	const contentSlides = slides.filter(
		(s) => (s.layout ?? "default") === "default",
	);
	const svgCount = slides.filter(hasSvg).length;
	const withSubtitle = contentSlides.filter((s) => s.subtitle).length;
	const assertiveCount = contentSlides.filter((s) =>
		isAssertive(s.title ?? ""),
	).length;

	const svgRatio = svgCount / slides.length;
	const subtitleRatio =
		contentSlides.length > 0 ? withSubtitle / contentSlides.length : 0;
	const assertiveRatio =
		contentSlides.length > 0 ? assertiveCount / contentSlides.length : 0;

	const score = svgRatio * 40 + assertiveRatio * 40 + subtitleRatio * 20;
	const grade =
		score >= GRADE_A_MIN
			? "A"
			: score >= GRADE_B_MIN
				? "B"
				: score >= GRADE_C_MIN
					? "C"
					: "D";

	return {
		svgRatio,
		assertiveRatio,
		subtitleRatio,
		readingMins: estimateMins(slides, language),
		grade,
	};
}

/** Max recommended chars per bullet (Japanese ~50, English ~80). */
export const MAX_BULLET_CHARS = 60;

export interface QualityWarning {
	slideIndex: number;
	title: string;
	type: string;
	message: string;
}

/**
 * Check a full deck against Google / Amazon presentation principles.
 * Returns a list of warnings (not errors — the deck is still valid).
 */
export function validateSlideQuality(slides: SlideRecord[]): QualityWarning[] {
	const warnings: QualityWarning[] = [];

	let consecutiveTextOnly = 0;

	for (let i = 0; i < slides.length; i++) {
		const slide = slides[i];
		const title = (slide.title ?? "").trim();
		const layout = slide.layout ?? "default";
		const content = slide.content ?? [];
		const slideHasSvg = hasSvg(slide);
		const hasCode = !!slide.code;
		const isContentSlide = layout === "default";

		// 1. Assertive title check
		if (isContentSlide && !isAssertive(title)) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "label_title",
				message: `Generic label title "${title}" — state the conclusion instead (e.g. "コストが40%削減できる理由" not "コスト削減")`,
			});
		}

		// 2. Long bullet warning
		for (const item of content) {
			if (
				!item.startsWith("|") &&
				!item.startsWith("![") &&
				!item.includes("<svg") &&
				item.length > MAX_BULLET_CHARS
			) {
				warnings.push({
					slideIndex: i + 1,
					title,
					type: "long_bullet",
					message: `Bullet too long (${item.length} chars > ${MAX_BULLET_CHARS}): "${item.slice(0, 40)}…" — split or condense for readability`,
				});
				break; // one warning per slide
			}
		}

		// 3. Missing subtitle on dense content slides
		if (
			isContentSlide &&
			content.length >= 4 &&
			!slideHasSvg &&
			!hasCode &&
			!slide.subtitle
		) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "missing_subtitle",
				message: `Dense text slide with no subtitle (BLUF) — add "subtitle" field with the "so what?" one-liner`,
			});
		}

		// 4. Consecutive text-only slides
		if (isContentSlide && !slideHasSvg && !hasCode) {
			consecutiveTextOnly++;
			if (consecutiveTextOnly >= 3) {
				warnings.push({
					slideIndex: i + 1,
					title,
					type: "consecutive_text",
					message: `3+ consecutive text-only slides (slides ${i - 1}–${i + 1}) — insert an SVG diagram to break the pattern`,
				});
			}
		} else {
			consecutiveTextOnly = 0;
		}

		// 5. Missing speaker notes on content slides
		if (isContentSlide && !slide.speakerNotes && content.length > 0) {
			warnings.push({
				slideIndex: i + 1,
				title,
				type: "missing_notes",
				message: `No speaker notes — add "why this matters" / evidence / transition to next slide`,
			});
		}
	}

	// 6. Narrative arc check (deck-level)
	const contentSlides = slides.filter(
		(s) => (s.layout ?? "default") === "default",
	);
	const assertiveCount = contentSlides.filter((s) =>
		isAssertive(s.title ?? ""),
	).length;
	const assertiveRatio =
		contentSlides.length > 0 ? assertiveCount / contentSlides.length : 1;

	if (contentSlides.length >= 5 && assertiveRatio < 0.6) {
		warnings.push({
			slideIndex: 0,
			title: "(deck-level)",
			type: "weak_narrative",
			message: `Only ${Math.round(assertiveRatio * 100)}% of content slides have assertive titles (target ≥60%). Titles should state conclusions, not just topics.`,
		});
	}

	return warnings;
}
