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
 */

/**
 * Inline style applied to every SVG root element.
 * Ensures the SVG stays within slide boundaries and is centered.
 */
export const SVG_CONTAINMENT_STYLE =
	"max-height:70vh;max-width:100%;display:block;margin:0 auto;";

/**
 * Normalize inline SVGs embedded in Marp markdown.
 *
 * - Removes hardcoded `width` and `height` attributes (both single- and
 *   double-quoted) from `<svg>` tags so CSS can control sizing.
 * - Adds or updates the `style` attribute with SVG_CONTAINMENT_STYLE
 *   if the existing style lacks `max-height` or `max-width` rules.
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
			// Only inject containment styles if either is missing
			if (
				!existingStyle.includes("max-height") ||
				!existingStyle.includes("max-width")
			) {
				cleaned = cleaned
					.replace(
						/\s+style\s*=\s*"[^"]*"/,
						` style="${SVG_CONTAINMENT_STYLE}"`,
					)
					.replace(
						/\s+style\s*=\s*'[^']*'/,
						` style="${SVG_CONTAINMENT_STYLE}"`,
					);
			}
		} else {
			// No style attribute — add containment style
			cleaned += ` style="${SVG_CONTAINMENT_STYLE}"`;
		}

		return `<svg${cleaned}>`;
	});
}
