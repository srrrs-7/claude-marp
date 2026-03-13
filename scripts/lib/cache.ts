/**
 * Incremental build cache.
 *
 * Stores {mtime, size} per file path to detect changes without hashing.
 * Cache file: .cache/build-cache.json (add to .gitignore if not present)
 */

import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export interface CacheEntry {
	mtime: number;
	size: number;
}

export type BuildCache = Map<string, CacheEntry>;

/** Read cache from disk. Returns empty map if file doesn't exist. */
export function readCache(cacheFile: string): BuildCache {
	if (!existsSync(cacheFile)) return new Map();
	try {
		const raw = JSON.parse(Bun.file(cacheFile).textSync());
		return new Map(Object.entries(raw) as [string, CacheEntry][]);
	} catch {
		return new Map();
	}
}

/** Write cache to disk atomically. */
export async function writeCache(
	cacheFile: string,
	cache: BuildCache,
): Promise<void> {
	const dir = dirname(cacheFile);
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
	const obj = Object.fromEntries(cache);
	const tmp = `${cacheFile}.tmp`;
	await Bun.write(tmp, JSON.stringify(obj, null, 2));
	const { rename } = await import("node:fs/promises");
	await rename(tmp, cacheFile);
}

/**
 * Returns true if the file on disk matches the cached entry (not changed).
 * Returns false if the file has changed or is not in cache.
 */
export async function isFresh(
	filePath: string,
	cache: BuildCache,
): Promise<boolean> {
	const entry = cache.get(filePath);
	if (!entry) return false;
	if (!existsSync(filePath)) return false;
	try {
		const stat = await Bun.file(filePath).stat();
		return stat.mtime === entry.mtime && stat.size === entry.size;
	} catch {
		return false;
	}
}

/** Update the cache entry for a file from its current disk state. */
export async function updateEntry(
	filePath: string,
	cache: BuildCache,
): Promise<void> {
	try {
		const stat = await Bun.file(filePath).stat();
		cache.set(filePath, { mtime: stat.mtime, size: stat.size });
	} catch {
		// If file doesn't exist, remove from cache
		cache.delete(filePath);
	}
}
