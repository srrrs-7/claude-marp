import type { SlidesConfig } from "../config/schema.js";
import type { GenerationResult, SlideContent } from "./slide-schema.js";

const SVG_CONTAINMENT_STYLE =
	"max-height:70vh;max-width:100%;display:block;margin:0 auto;";

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

	if (config.marp.style) {
		lines.push("style: |");
		for (const line of config.marp.style.split("\n")) {
			lines.push(`  ${line}`);
		}
	}

	lines.push("---");
	return lines.join("\n");
}

function renderSlide(slide: SlideContent): string {
	const parts: string[] = [];

	if (slide.layout === "center") {
		parts.push("<!-- _class: lead -->");
	} else if (slide.layout === "section") {
		parts.push("<!-- _class: lead -->");
	}

	parts.push(`# ${slide.title}`);
	parts.push("");

	for (const item of slide.content) {
		parts.push(`- ${item}`);
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
	const slides: string[] = [];

	for (const slide of result.slides) {
		slides.push(renderSlide(slide));
	}

	const markdown = `${frontMatter}\n\n${slides.join("\n\n---\n\n")}\n`;
	return normalizeSvg(markdown);
}
