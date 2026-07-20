import type { SlidesConfig } from "../config/schema.js";
// SVG utilities live in src/utils/svg.ts (canonical source).
// Re-exported here for backwards compatibility — fix-svg-overflow.ts and external callers
// import from this module. New code should import from "../utils/svg.js" directly.
export { SVG_CONTAINMENT_STYLE, normalizeSvg } from "../utils/svg.js";
import { normalizeSvg } from "../utils/svg.js";
import { FIT_STEPS, estimateFit, resolveBaseFontPx } from "./fit.js";
import type { GenerationResult, SlideContent } from "./slide-schema.js";

/**
 * Font-scale ladder used by the auto-fit pass (see `./fit.ts`).
 *
 * `--marpit-root-font-size` is the section font-size Marpit derives from the
 * theme, and it already reflects a `section { font-size: … }` override in a
 * deck's `marp.style` — so the fraction is right for every deck without having
 * to hard-code the theme's 35px here.
 */
const FIT_CSS = FIT_STEPS.map(
	(scale) =>
		`  section.fit-${Math.round(scale * 100)} { font-size: calc(var(--marpit-root-font-size, 1em) * ${scale}); }`,
).join("\n");

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
  /* ── Slide layout ─────────────────────────────────────────
     The slide is a fixed 1280x720 box, so its blocks are laid out as a flex
     column: text keeps its natural height and diagrams absorb whatever space
     is left over. Without this a diagram sizes itself from its aspect ratio
     alone and pushes the bullets off the bottom of the slide.
     This also activates Gaia's own \`section.lead\` centering, which is dead
     while the section is display:block. */
  section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  section > * { flex: 0 0 auto; min-width: 0; }
  section * { max-width: 100%; box-sizing: border-box; }
  section h1 { overflow-wrap: break-word; word-break: break-word; }

  /* ── Auto-fit ─────────────────────────────────────────────
     Applied per slide by estimateFit() when the text would otherwise be
     clipped. Text cannot shrink itself the way a diagram can. */
${FIT_CSS}

  /* ── Readability ──────────────────────────────────────── */
  section li {
    line-height: 1.5;
    margin-bottom: 0.1em;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  section p { line-height: 1.7; overflow-wrap: break-word; }

  /* ── Figures (inline SVG + standalone images) ─────────────
     \`vh\` is deliberately not used anywhere here. Marp scales the slide with a
     CSS transform, so vh resolves against the browser window rather than the
     slide — on a tall window \`max-height:70vh\` exceeds the whole slide and
     caps nothing. These blocks are bounded by flex layout instead. */
  section > .fig,
  section > p:has(> img) {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.2em 0;
  }
  /* The SVG fills the wrapper; preserveAspectRatio letterboxes the drawing
     inside it, so it scales down instead of overflowing. */
  section > .fig > svg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  /* \`!important\` overrides the inline width Marp emits for \`![w:800]\`. */
  section > p:has(> img) > img {
    max-height: 100% !important;
    max-width: 100% !important;
    object-fit: contain;
    height: auto;
    width: auto;
  }
  /* Fallback for images/SVGs that are not a direct child of the section
     (hand-written markdown, table cells): keep them inside the slide. */
  section img, section svg { max-width: 100%; }

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

/** A content item that carries its own fenced code block. */
const FENCED_CODE_RE = /(?:^|\n)\s{0,3}```/;

/** Content items that are already written as a markdown list item. */
const LIST_MARKER_RE = /^\s*(?:[-*+]|\d+[.)])\s+/;

/**
 * Split a slide's `content` array into markdown blocks.
 *
 * Every item used to be emitted as one consecutive run of lines, which made
 * markdown treat anything following a bullet as a *lazy continuation* of that
 * list item: tables silently rendered as literal `| a | b |` text inside a
 * `<li>`, and diagrams ended up nested in a list instead of being a block the
 * layout can size. Blocks are therefore separated by blank lines, and each
 * diagram is wrapped in a `.fig` element the slide's flex column can shrink.
 *
 * An inline SVG may be spread over several `content` items (one per line), so
 * an item opening with `<svg` consumes items until the closing tag.
 */
function renderContentBlocks(items: readonly string[]): string[] {
	// A blank item renders as an empty bullet: a marker with no text, costing a
	// full line of vertical space on a slide that is already tight.
	const content = items.filter((item) => item.trim() !== "");
	const blocks: string[] = [];
	let i = 0;

	while (i < content.length) {
		const item = content[i] as string;
		const trimmed = item.trimStart();

		if (trimmed.startsWith("<svg")) {
			// Inline diagram — may span multiple content items.
			const svgLines: string[] = [item];
			i++;
			if (!item.includes("</svg>")) {
				while (i < content.length) {
					const line = content[i] as string;
					svgLines.push(line);
					i++;
					if (line.includes("</svg>")) break;
				}
			}
			blocks.push(`<div class="fig">\n${svgLines.join("\n")}\n</div>`);
			continue;
		}

		if (trimmed.startsWith("![")) {
			// Standalone image directive — its own paragraph, never a list item.
			blocks.push(item);
			i++;
			continue;
		}

		if (FENCED_CODE_RE.test(item)) {
			// A content item carrying its own ``` block. Prefixing it with "- "
			// opened the fence inside a list item while the closing fence sat at
			// column 0, so the block never closed and ate the rest of the deck.
			blocks.push(item);
			i++;
			continue;
		}

		if (item.startsWith("|")) {
			// Table rows must stay contiguous and must not follow a bullet directly.
			const rows: string[] = [];
			while (i < content.length && (content[i] as string).startsWith("|")) {
				rows.push(content[i] as string);
				i++;
			}
			blocks.push(rows.join("\n"));
			continue;
		}

		const bullets: string[] = [];
		while (i < content.length) {
			const next = content[i] as string;
			const nextTrimmed = next.trimStart();
			if (
				next.startsWith("|") ||
				nextTrimmed.startsWith("![") ||
				nextTrimmed.startsWith("<svg") ||
				FENCED_CODE_RE.test(next)
			) {
				break;
			}
			// An item that already carries its own list marker is emitted as-is.
			// Prefixing it again produced `- - text`, i.e. a nested list under an
			// empty parent bullet — an extra indent level and an extra line.
			bullets.push(LIST_MARKER_RE.test(next) ? next : `- ${next}`);
			i++;
		}
		blocks.push(bullets.join("\n"));
	}

	return blocks;
}

function renderSlide(
	slide: SlideContent,
	baseFontPx: number,
	deckClass: string,
): string {
	const parts: string[] = [];

	// Marpit's `_class` *replaces* the deck-level `class` for this slide rather
	// than adding to it, so the deck's own classes have to be repeated here.
	// Without that, every lead slide in a `class: invert` deck rendered light
	// against an otherwise dark deck.
	const classes: string[] = deckClass ? deckClass.split(/\s+/) : [];
	if (slide.layout === "center" || slide.layout === "section") {
		classes.push("lead");
	}
	const fit = estimateFit(slide, baseFontPx);
	if (fit.className) classes.push(fit.className);
	// Emitting the deck class alone would be a no-op; only write the directive
	// when this slide actually needs something of its own.
	if (classes.length > (deckClass ? deckClass.split(/\s+/).length : 0)) {
		parts.push(`<!-- _class: ${classes.join(" ")} -->`);
	}

	parts.push(`# ${slide.title}`);

	if (slide.subtitle) {
		parts.push("");
		parts.push(`> *${slide.subtitle}*`);
	}

	for (const block of renderContentBlocks(slide.content)) {
		parts.push("");
		parts.push(block);
	}

	parts.push("");

	if (slide.code) {
		const lang = slide.codeLanguage ?? "text";
		// A snippet containing its own ``` fence (a CLAUDE.md excerpt, a README
		// sample) would close the block early, and everything after it — the rest
		// of the deck — got swallowed into the code element. Open with a fence
		// longer than the longest backtick run inside.
		const longestRun = Math.max(
			0,
			...(slide.code.match(/`+/g) ?? []).map((run) => run.length),
		);
		const fence = "`".repeat(Math.max(3, longestRun + 1));
		parts.push(`${fence}${lang}`);
		parts.push(slide.code);
		parts.push(fence);
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
	const baseFontPx = resolveBaseFontPx(config.marp.style);
	const slides = result.slides.map((slide) =>
		renderSlide(slide, baseFontPx, config.marp.class),
	);
	const markdown = `${frontMatter}\n\n${slides.join("\n\n---\n\n")}\n`;
	return normalizeSvg(markdown);
}
