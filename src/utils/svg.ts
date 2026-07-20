/**
 * SVG normalization utilities.
 *
 * Marp wraps each slide in `<svg><foreignObject><section>`, creating a nested
 * SVG context where all `url(#id)` fragment references break silently.
 * These utilities ensure inline SVGs render correctly within that context.
 *
 * Rules:
 *   - No `url(#id)` references (filter, marker-end, clip-path, linearGradient)
 *   - Every SVG root must have viewBox + containment style
 *   - Hardcoded width/height attributes are removed (CSS controls sizing)
 *
 * Sizing model
 * ------------
 * An inline `<svg>` with a `viewBox` but no width/height fills the width of its
 * containing block and derives its height from the aspect ratio. On a 1280x720
 * slide with 70px padding the content box is 1140x580, so an 800x400 diagram
 * renders 570px tall and leaves ~10px for the title and every bullet — the
 * single largest source of slide overflow in this repo.
 *
 * `vh` units cannot fix that: Marp scales the slide with a CSS transform, so
 * `70vh` resolves against the *browser window*, not the slide. On a tall window
 * `max-height:70vh` is larger than the whole slide and does nothing at all.
 *
 * The fix is layout, not caps: `renderSlide()` wraps each diagram in a
 * `<div class="fig">` flex item that absorbs only the space left over after the
 * title, subtitle and bullets, and the SVG fills that box with
 * `width:100%;height:100%`. `preserveAspectRatio` (default `xMidYMid meet`)
 * then letterboxes the drawing inside it, so it can never overflow.
 */

/**
 * Inline style applied to every SVG root element.
 *
 * `width`/`height` at 100% make the SVG fill its `.fig` wrapper, which is what
 * bounds it. `letter-spacing:0` stops the Gaia theme's `letter-spacing:1.25px`
 * from bleeding into `<text>` elements and pushing labels out of their shapes.
 */
export const SVG_CONTAINMENT_STYLE =
	"display:block;width:100%;height:100%;max-width:100%;max-height:100%;margin:0 auto;letter-spacing:0;";

/** Declarations that the containment style owns — dropped from author styles. */
const MANAGED_PROPERTIES = new Set([
	"width",
	"height",
	"max-width",
	"max-height",
	"min-width",
	"min-height",
	"letter-spacing",
]);

/**
 * Merge an author-supplied style attribute with SVG_CONTAINMENT_STYLE.
 *
 * Sizing declarations are dropped (the containment style owns them) while every
 * other declaration — `filter: drop-shadow(...)`, `font-family`, etc. — is kept.
 */
function mergeStyle(existing: string): string {
	const preserved = existing
		.split(";")
		.map((decl) => decl.trim())
		.filter((decl) => {
			if (decl === "") return false;
			const prop = decl.slice(0, decl.indexOf(":")).trim().toLowerCase();
			return !MANAGED_PROPERTIES.has(prop);
		});

	return preserved.length > 0
		? `${preserved.join(";")};${SVG_CONTAINMENT_STYLE}`
		: SVG_CONTAINMENT_STYLE;
}

/**
 * Normalize inline SVGs embedded in Marp markdown.
 *
 * - Removes hardcoded `width` and `height` attributes (both single- and
 *   double-quoted) from `<svg>` tags so CSS can control sizing.
 * - Rewrites the `style` attribute so the containment declarations always win,
 *   while preserving any non-sizing declarations the author wrote.
 */
export function normalizeSvg(svg: string): string {
	return svg.replace(/<svg([^>]*)>/g, (_match, attrs: string) => {
		// Remove hardcoded width/height attributes (let CSS control sizing)
		let cleaned = attrs
			// Double-quoted
			.replace(/\s+width\s*=\s*"[^"]*"/g, "")
			.replace(/\s+height\s*=\s*"[^"]*"/g, "")
			// Single-quoted
			.replace(/\s+width\s*=\s*'[^']*'/g, "")
			.replace(/\s+height\s*=\s*'[^']*'/g, "");

		// Check for existing style attribute (double or single quoted)
		const styleMatchDq = cleaned.match(/\s+style\s*=\s*"([^"]*)"/);
		const styleMatchSq = cleaned.match(/\s+style\s*=\s*'([^']*)'/);
		const existingStyle = styleMatchDq?.[1] ?? styleMatchSq?.[1];

		if (existingStyle !== undefined) {
			const merged = mergeStyle(existingStyle);
			cleaned = cleaned
				.replace(/\s+style\s*=\s*"[^"]*"/, ` style="${merged}"`)
				.replace(/\s+style\s*=\s*'[^']*'/, ` style="${merged}"`);
		} else {
			// No style attribute — add containment style
			cleaned += ` style="${SVG_CONTAINMENT_STYLE}"`;
		}

		return `<svg${cleaned}>`;
	});
}
