import { existsSync, mkdirSync } from "node:fs";

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 60);
}

export async function ensureDir(dirPath: string): Promise<void> {
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}
}
