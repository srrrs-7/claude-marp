import type { SlidesConfig } from "../config/schema.js";
import type { GenerationResult, SlideContent } from "./slide-schema.js";

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

	if (slide.mermaid) {
		parts.push("```mermaid");
		parts.push(slide.mermaid);
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

	return `${frontMatter}\n\n${slides.join("\n\n---\n\n")}\n`;
}
