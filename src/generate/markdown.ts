import type { SlidesConfig } from "../config/schema.js";
import type { GenerationResult, SlideContent } from "./slide-schema.js";

export const SVG_CONTAINMENT_STYLE =
	"max-height:70vh;max-width:100%;display:block;margin:0 auto;";

/**
 * Base CSS injected into every presentation's front matter.
 *
 * Goals:
 *   1. Prevent content from overflowing slide boundaries
 *   2. Improve readability (line-height, spacing, word-wrap)
 *   3. Style the subtitle/BLUF blockquote callout
 *
 * These rules are prepended before marp.style so user CSS always wins.
 */
const BASE_CSS = `
  /* ── Overflow prevention ──────────────────────────────── */
  section { overflow: hidden; }
  section * { max-width: 100%; box-sizing: border-box; }
  section h1 { overflow-wrap: break-word; word-break: break-word; }

  /* ── Readability ──────────────────────────────────────── */
  section li {
    line-height: 1.7;
    margin-bottom: 0.1em;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  section p { line-height: 1.7; overflow-wrap: break-word; }

  /* ── Images (all, not only SVG) ───────────────────────── */
  section img:not([src$=".svg"]) {
    max-height: 65vh;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin: 0 auto;
  }
  section svg {
    max-height: 70vh;
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  section img[src$=".svg"] {
    max-height: 70vh;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin: 0 auto;
  }

  /* ── Code blocks ──────────────────────────────────────── */
  section pre { overflow: hidden; }
  section pre code { font-size: 0.58em; line-height: 1.4; overflow-wrap: break-word; }

  /* ── Tables ───────────────────────────────────────────── */
  section table {
    font-size: 0.78em;
    width: 100%;
    overflow: hidden;
    word-break: break-word;
    border-collapse: collapse;
  }
  section th, section td {
    padding: 0.35em 0.6em;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  /* ── Subtitle / BLUF callout (blockquote) ─────────────── */
  section blockquote {
    font-size: 0.88em;
    line-height: 1.55;
    padding: 0.25em 0.8em;
    margin: 0.15em 0 0.35em;
    opacity: 0.88;
    overflow-wrap: break-word;
  }
  section blockquote p { margin: 0; }
`.trimStart();

/**
 * Normalize inline SVGs to prevent overflow from slide boundaries.
 * - Removes hardcoded width/height attributes (CSS handles sizing)
 * - Adds containment style if missing or incomplete
 */
export function normalizeSvg(svg: string): string {
	return svg.replace(/<svg([^>]*)>/g, (_match, attrs: string) => {
		// Remove hardcoded width/height attributes (let CSS control sizing)
		let cleaned = attrs
			.replace(/\s+width\s*=\s*"[^"]*"/g, "")
			.replace(/\s+height\s*=\s*"[^"]*"/g, "");

		// Check for existing style attribute
		const styleMatch = cleaned.match(/\s+style\s*=\s*"([^"]*)"/);
		if (styleMatch) {
			const existing = styleMatch[1];
			// Only replace if it doesn't already contain containment rules
			if (!existing.includes("max-height") || !existing.includes("max-width")) {
				cleaned = cleaned.replace(
					/\s+style\s*=\s*"[^"]*"/,
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

function buildFrontMatter(config: SlidesConfig): string {
	const lines: string[] = ["---", "marp: true"];

	lines.push(`theme: ${config.marp.theme}`);
	if (config.marp.class) {
		lines.push(`class: ${config.marp.class}`);
	}
	lines.push(`size: ${config.marp.size}`);

	if (config.marp.paginate) {
		lines.push("paginate: true");
	}

	if (config.marp.header) {
		lines.push(`header: "${config.marp.header}"`);
	}

	if (config.marp.footer) {
		lines.push(`footer: "${config.marp.footer}"`);
	}

	// Always inject BASE_CSS for overflow prevention + readability.
	// User's marp.style is appended after so it can override any base rule.
	const mergedStyle = config.marp.style
		? `${BASE_CSS}\n${config.marp.style}`
		: BASE_CSS;
	lines.push("style: |");
	for (const line of mergedStyle.split("\n")) {
		lines.push(`  ${line}`);
	}

	lines.push("---");
	return lines.join("\n");
}

function renderSlide(slide: SlideContent): string {
	const parts: string[] = [];

	if (slide.layout === "center" || slide.layout === "section") {
		parts.push("<!-- _class: lead -->");
	}

	parts.push(`# ${slide.title}`);

	if (slide.subtitle) {
		parts.push("");
		parts.push(`> *${slide.subtitle}*`);
	}

	parts.push("");

	for (const item of slide.content) {
		// Table rows (starting with |) and separator lines must not be prefixed
		if (item.startsWith("|") || item.startsWith("![")) {
			parts.push(item);
		} else {
			parts.push(`- ${item}`);
		}
	}

	if (slide.content.length > 0) {
		parts.push("");
	}

	if (slide.code) {
		const lang = slide.codeLanguage ?? "text";
		parts.push(`\`\`\`${lang}`);
		parts.push(slide.code);
		parts.push("```");
		parts.push("");
	}

	if (slide.speakerNotes) {
		parts.push("<!--");
		parts.push(slide.speakerNotes);
		parts.push("-->");
	}

	return parts.join("\n");
}

export function renderMarpMarkdown(
	result: GenerationResult,
	config: SlidesConfig,
): string {
	const frontMatter = buildFrontMatter(config);
	const slides = result.slides.map(renderSlide);
	const markdown = `${frontMatter}\n\n${slides.join("\n\n---\n\n")}\n`;
	return normalizeSvg(markdown);
}
