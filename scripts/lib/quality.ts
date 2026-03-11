/**
 * Shared slide quality metrics used by stats.ts, validate-slides-schema.ts,
 * and generate-index.ts. Single source of truth for LABEL_TITLE_RE and grade computation.
 */

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
		(c) => c.includes("<svg") || c.startsWith("!["),
	);
}

/**
 * Estimate reading time in minutes (Japanese: ~350 chars/min).
 * Counts title + content + speakerNotes characters.
 */
export function estimateMins(slides: SlideRecord[]): number {
	let chars = 0;
	for (const s of slides) {
		chars += (s.title ?? "").length;
		for (const c of s.content ?? []) chars += c.length;
		chars += (s.speakerNotes ?? "").length;
	}
	return Math.max(1, Math.ceil(chars / 350));
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
export function computeDeckMetrics(slides: SlideRecord[]): DeckMetrics {
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
	const grade = score >= 70 ? "A" : score >= 50 ? "B" : score >= 30 ? "C" : "D";

	return {
		svgRatio,
		assertiveRatio,
		subtitleRatio,
		readingMins: estimateMins(slides),
		grade,
	};
}
