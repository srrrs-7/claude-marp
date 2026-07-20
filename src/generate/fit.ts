/**
 * Slide auto-fit.
 *
 * A slide is a fixed 1280x720 box. Flex layout (see BASE_CSS in markdown.ts)
 * guarantees diagrams shrink into whatever space is left, but text cannot
 * shrink itself: a title plus seven two-line bullets simply needs more vertical
 * space than the slide has, and the surplus is clipped by `overflow: hidden`.
 *
 * This module estimates how tall a slide's text will be and, when it does not
 * fit, picks a font scale that makes it fit. The scale is applied as a
 * `fit-NN` class on the slide, defined in BASE_CSS as a fraction of
 * `--marpit-root-font-size` — the variable Marpit derives from the section
 * font-size, so the fraction is correct for themes and for decks that override
 * the base size in `marp.style`.
 *
 * The model is deliberately approximate. It is calibrated against headless
 * Chromium measurements of the rendered decks and is tuned to err towards
 * scaling slightly too much rather than too little, since a marginally small
 * slide still reads while a clipped one loses content outright.
 */

import type { SlideContent } from "./slide-schema.js";

// ---------------------------------------------------------------------------
// Slide geometry (Marp 16:9 = 1280x720, themes pad by 70px)
// ---------------------------------------------------------------------------

const CONTENT_HEIGHT_PX = 720 - 70 * 2;
const CONTENT_WIDTH_PX = 1280 - 70 * 2;

/** Section font-size of the built-in Marp themes, in px. */
export const DEFAULT_BASE_FONT_PX = 35;

// ---------------------------------------------------------------------------
// Type metrics, in multiples of the section font size ("section-em")
// ---------------------------------------------------------------------------

const H1_FONT = 1.8;
const H1_LINE = 1.35;
const QUOTE_FONT = 0.88;
const QUOTE_LINE = 1.55;
const QUOTE_BOX = 0.88; // padding + margins
const LIST_MARGIN = 2.0; // ul margin-top + margin-bottom
const LIST_INDENT = 1.2; // ul padding-left
const LI_LINE = 1.5; // BASE_CSS line-height
const LI_GAP = 0.1; // li margin-bottom
const TABLE_FONT = 0.78;
const TABLE_ROW = 1.55; // one row incl. cell padding
const TABLE_MARGIN = 1.0;
const CODE_FONT = 0.58;
const CODE_LINE = 1.4;
const CODE_BOX = 1.2; // pre padding + margins

/** A content item that carries its own fenced code block. */
const FENCED_CODE_RE = /(?:^|\n)\s{0,3}```/;

/** Vertical space a diagram must keep to stay legible. */
const FIGURE_MIN = 3.0;

/** Average width of a Latin glyph, relative to the font size. */
const LATIN_CHAR_WIDTH = 0.55;

/** Gaia adds `letter-spacing: 1.25px`, ~0.036em at the default 35px. */
const LETTER_SPACING = 0.036;

/**
 * Font scales offered to a slide, largest first.
 *
 * Anything below the smallest step is a content problem rather than a layout
 * one — `estimateFit()` reports it so the deck can be split instead.
 */
export const FIT_STEPS = [0.94, 0.88, 0.82, 0.76, 0.7, 0.64, 0.58] as const;

/**
 * Correction applied to the raw height estimate.
 *
 * Measured against headless Chromium over the 2,002 slides that were clipped
 * before auto-fit existed, the raw model over-predicts by ~12% at the median
 * (it charges full line-height to every wrapped line and ignores that a smaller
 * font also fits more characters per line). Correcting keeps the chosen scale
 * from shrinking slides further than they need.
 */
const CALIBRATION = 0.92;

/**
 * Fraction of the content box the estimate is allowed to claim.
 *
 * Clipping loses content outright; slightly smaller type does not, so the two
 * are not traded off symmetrically. Measured over 7,618 rendered slides, the
 * choice of margin behaves like this — "clipped" counts slides Chromium still
 * cut off, "scaled" counts slides that gained a font-scale class they did not
 * need before:
 *
 *     0.96 → 126 clipped,  236 newly scaled
 *     0.88 →  19 clipped,  512 newly scaled
 *     0.84 →   7 clipped,  560 newly scaled   ← chosen
 *     0.80 →   1 clipped,  731 newly scaled
 *
 * 0.84 sits past the knee: it removes almost all clipping, and the slides it
 * shrinks drop one 6% step, which is not perceptible.
 */
const SAFETY_MARGIN = 0.84;

// ---------------------------------------------------------------------------
// Text measurement
// ---------------------------------------------------------------------------

/** Strip inline markdown so emphasis markers are not measured as glyphs. */
function plainText(markdown: string): string {
	return markdown
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links / images
		.replace(/[*_`~]/g, "")
		.replace(/<[^>]+>/g, "");
}

/**
 * Width of a string in multiples of its own font size.
 *
 * Full-width characters (CJK, kana, full-width punctuation) occupy one em;
 * Latin glyphs average a little over half that.
 */
export function textWidthEm(text: string): number {
	let width = 0;
	for (const ch of plainText(text)) {
		const code = ch.codePointAt(0) ?? 0;
		const fullWidth =
			(code >= 0x1100 && code <= 0x115f) ||
			(code >= 0x2e80 && code <= 0xa4cf) ||
			(code >= 0xac00 && code <= 0xd7a3) ||
			(code >= 0xf900 && code <= 0xfaff) ||
			(code >= 0xfe30 && code <= 0xfe6f) ||
			(code >= 0xff00 && code <= 0xff60) ||
			(code >= 0xffe0 && code <= 0xffe6);
		width += (fullWidth ? 1 : LATIN_CHAR_WIDTH) + LETTER_SPACING;
	}
	return width;
}

/** Number of wrapped lines, where `capacity` is the usable width in section-em. */
function lineCount(text: string, fontEm: number, capacity: number): number {
	const width = textWidthEm(text) * fontEm;
	return Math.max(1, Math.ceil(width / capacity));
}

// ---------------------------------------------------------------------------
// Slide height estimate
// ---------------------------------------------------------------------------

export interface FitResult {
	/** Estimated height of the slide's content, in section-em. */
	requiredEm: number;
	/** Height available on the slide, in section-em. */
	budgetEm: number;
	/** Font scale to apply — 1 when the slide already fits. */
	scale: number;
	/** Class name to attach, or null when no scaling is needed. */
	className: string | null;
	/** True when even the smallest step leaves the slide over budget. */
	overBudget: boolean;
}

/**
 * Read the deck's own section font-size out of `marp.style`.
 *
 * A value in `em` resolves against the inherited 16px rather than the theme's
 * 35px — a long-standing trap in this repo's configs — so it is resolved the
 * same way the browser does rather than the way the author probably meant.
 */
export function resolveBaseFontPx(style: string | undefined): number {
	if (!style) return DEFAULT_BASE_FONT_PX;
	const match = style.match(
		/(?:^|})\s*section\s*\{[^}]*?font-size\s*:\s*([\d.]+)(px|em|rem)/,
	);
	if (!match) return DEFAULT_BASE_FONT_PX;
	const value = Number(match[1]);
	if (!Number.isFinite(value) || value <= 0) return DEFAULT_BASE_FONT_PX;
	return match[2] === "px" ? value : value * 16;
}

/** Estimate whether a slide fits, and by how much it must shrink if not. */
export function estimateFit(
	slide: SlideContent,
	baseFontPx = DEFAULT_BASE_FONT_PX,
): FitResult {
	const budgetEm = CONTENT_HEIGHT_PX / baseFontPx;
	const widthEm = CONTENT_WIDTH_PX / baseFontPx;

	let required = 0;

	// Title
	required += lineCount(slide.title, H1_FONT, widthEm) * H1_FONT * H1_LINE;

	// Subtitle / BLUF callout
	if (slide.subtitle) {
		const lines = lineCount(slide.subtitle, QUOTE_FONT, widthEm - 1.6);
		required += lines * QUOTE_FONT * QUOTE_LINE + QUOTE_BOX;
	}

	// Content blocks
	const bullets: string[] = [];
	let tableRows = 0;
	let figures = 0;
	let codeLines = 0;

	// Mirrors renderContentBlocks(): an inline SVG may span several items, and
	// its interior lines are markup, not bullets.
	let insideSvg = false;
	for (const item of slide.content) {
		const trimmed = item.trimStart();
		if (insideSvg) {
			if (item.includes("</svg>")) insideSvg = false;
			continue;
		}
		if (trimmed.startsWith("<svg")) {
			figures++;
			insideSvg = !item.includes("</svg>");
		} else if (trimmed.startsWith("![")) {
			figures++;
		} else if (item.startsWith("|")) {
			// Separator rows (| --- |) do not render as a row of their own.
			if (!/^\|[\s:|-]+\|?$/.test(item.trim())) tableRows++;
		} else if (FENCED_CODE_RE.test(item)) {
			// A content item carrying its own ``` block renders as a code block,
			// not as bullet text.
			codeLines += item.split("\n").length;
		} else if (trimmed !== "") {
			bullets.push(item);
		}
	}

	if (bullets.length > 0) {
		required += LIST_MARGIN;
		for (const bullet of bullets) {
			required +=
				lineCount(bullet, 1, widthEm - LIST_INDENT) * LI_LINE + LI_GAP;
		}
	}

	if (tableRows > 0) {
		required += TABLE_MARGIN + tableRows * TABLE_FONT * TABLE_ROW;
	}

	if (slide.code) codeLines += slide.code.split("\n").length;
	if (codeLines > 0) {
		required += CODE_BOX + codeLines * CODE_FONT * CODE_LINE;
	}

	// Diagrams shrink to fit, but reserve enough that they stay readable.
	required += Math.min(figures, 2) * FIGURE_MIN;
	required *= CALIBRATION;

	// The margin gates the "does it fit at all" decision as well as the step
	// choice. Applying it only to the step left the largest group of clipped
	// slides untouched: slides the model predicted would fit, and which
	// therefore never got a class at all.
	const usableEm = budgetEm * SAFETY_MARGIN;

	if (required <= usableEm) {
		return {
			requiredEm: required,
			budgetEm,
			scale: 1,
			className: null,
			overBudget: false,
		};
	}

	const needed = usableEm / required;
	const step = FIT_STEPS.find((s) => s <= needed);
	const scale = step ?? FIT_STEPS[FIT_STEPS.length - 1];

	return {
		requiredEm: required,
		budgetEm,
		scale,
		className: `fit-${Math.round(scale * 100)}`,
		overBudget: step === undefined,
	};
}
