import { existsSync, mkdirSync } from "node:fs";

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 60);
}

/**
 * The file stem the render pipeline writes for a deck (`<stem>.md`,
 * `dist/<stem>.html`).
 *
 * Single source of truth: generate-index.ts used to fall back to "whatever
 * .html in dist/ matches the directory slug", which is a *different* file when
 * `baseName` is empty. Decks in that state ended up published as a stale render
 * from an earlier build while `rebuild` kept refreshing the other name.
 */
export function resolveBaseName(
	baseName: string | undefined,
	topic: string,
): string {
	return baseName || `${slugify(topic)}-slides`;
}

export function ensureDir(dirPath: string): void {
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}
}
