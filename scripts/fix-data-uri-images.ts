#!/usr/bin/env bun
/**
 * Fix base64 data-URI images
 * --------------------------
 * `![w:800 center](data:image/svg+xml;base64,…)` never renders.
 *
 * markdown-it — the parser Marp is built on — rejects `data:` URLs except
 * `data:image/{gif,png,jpeg,webp}`, so an SVG data URI fails link validation
 * and the whole directive falls through to the output as literal text. The
 * result is a multi-kilobyte base64 string wrapped across a hundred lines,
 * which is both unreadable and the largest single source of slide overflow.
 *
 * This decodes each such directive back to an inline `<svg>`, which this repo
 * already renders correctly (and which the render pipeline normalizes and wraps
 * in a `.fig` block).
 *
 * Usage:
 *   bun run scripts/fix-data-uri-images.ts            # fix all decks
 *   bun run scripts/fix-data-uri-images.ts --dry-run  # report only
 */

import { resolve } from "node:path";
import { DATA_FILENAME } from "../src/constants.js";
import type { SlideContent } from "../src/generate/slide-schema.js";
import { saveSlidesData } from "../src/model/presentation.js";
import { c } from "./lib/colors.js";
import { EXIT } from "./lib/exit-codes.js";

/**
 * `![alt](data:image/svg+xml…)` — every form Marp cannot render.
 *
 * Covers both `;base64,` payloads and the plain-text variants
 * (`;charset=utf-8,` / `;utf8,` / no parameter), which may be percent-encoded.
 */
const DATA_URI_IMAGE_RE =
	/^!\[[^\]]*\]\(data:image\/svg\+xml(;base64|;charset=utf-8|;utf8)?,([\s\S]+)\)$/i;

/** Decode one content item, or return null when it is not an SVG data URI. */
export function decodeDataUriImage(item: string): string | null {
	const match = item.trim().match(DATA_URI_IMAGE_RE);
	if (!match?.[2]) return null;
	const payload = match[2];
	let raw: string;
	if (match[1]?.toLowerCase() === ";base64") {
		try {
			raw = Buffer.from(payload, "base64").toString("utf-8");
		} catch {
			return null;
		}
	} else {
		// Plain-text payloads are usually written unencoded. A literal `%` in the
		// markup (e.g. "20%") makes decodeURIComponent throw, so fall back to the
		// text as written rather than dropping the diagram.
		try {
			raw = decodeURIComponent(payload);
		} catch {
			raw = payload;
		}
	}
	const svg = raw.trim();
	return svg.startsWith("<svg") ? svg : null;
}

function convertSlide(slide: SlideContent): number {
	let converted = 0;
	slide.content = slide.content.map((item) => {
		const svg = decodeDataUriImage(item);
		if (svg === null) return item;
		converted++;
		return svg;
	});
	return converted;
}

async function main(): Promise<void> {
	const dryRun = process.argv.includes("--dry-run");
	const docsDir = resolve(import.meta.dir, "..", "docs");
	const glob = new Bun.Glob(`*/${DATA_FILENAME}`);

	let decksChanged = 0;
	let itemsConverted = 0;

	for await (const relative of glob.scan({ cwd: docsDir })) {
		const dataPath = resolve(docsDir, relative);
		const data = JSON.parse(await Bun.file(dataPath).text()) as {
			slides: SlideContent[];
		};

		let deckCount = 0;
		for (const slide of data.slides ?? []) deckCount += convertSlide(slide);
		if (deckCount === 0) continue;

		decksChanged++;
		itemsConverted += deckCount;
		console.log(
			`  ${c.green("✓")} ${relative.split("/")[0]} ${c.dim(`(${deckCount} images)`)}`,
		);
		if (!dryRun) await saveSlidesData(dataPath, data.slides);
	}

	const suffix = dryRun ? ` ${c.yellow("(dry run — nothing written)")}` : "";
	console.log(
		`\n${c.bold("Done")}: ${itemsConverted} data-URI images in ${decksChanged} decks${suffix}`,
	);
	if (itemsConverted > 0 && !dryRun) {
		console.log(c.dim("Re-render the affected decks: bun run rebuild"));
	}
}

if (import.meta.main) {
	main().catch((error) => {
		console.error(error);
		process.exit(EXIT.ERROR);
	});
}
