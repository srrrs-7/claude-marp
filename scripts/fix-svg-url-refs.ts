#!/usr/bin/env bun
/**
 * Fix SVG url(#id) references that break inside Marp's foreignObject context.
 *
 * Marp wraps each slide in <svg><foreignObject><section>, causing nested SVGs'
 * url(#id) fragment references (filter, marker) to fail in Chromium browsers.
 *
 * This script replaces:
 * - filter="url(#...)" → style="filter: drop-shadow(...)"
 * - marker-end="url(#...)" → explicit <polygon> arrow shapes
 * - Removes <defs> blocks (only contained filters and markers)
 * - Adds letter-spacing:0 to SVG style to prevent Gaia theme inheritance
 */

import { Glob } from "bun";

// Auto-discover all .md and .svg files under docs/
async function discoverTargetFiles(): Promise<string[]> {
	const files: string[] = [];
	for await (const path of new Glob("docs/**/*.{md,svg}").scan({
		cwd: ".",
	})) {
		files.push(path);
	}
	return files.sort();
}

/** Round to 1 decimal place, strip trailing zeros */
function r(n: number): string {
	return Number(n.toFixed(1)).toString();
}

/** Extract CSS drop-shadow() from an SVG <filter> definition */
function extractDropShadow(filterContent: string): string {
	const dx = filterContent.match(/dx="([^"]+)"/)?.[1] || "2";
	const dy = filterContent.match(/dy="([^"]+)"/)?.[1] || "2";
	const std = filterContent.match(/stdDeviation="([^"]+)"/)?.[1] || "3";
	const opacity = filterContent.match(/flood-opacity="([^"]+)"/)?.[1] || "0.15";
	return `drop-shadow(${dx}px ${dy}px ${std}px rgba(0,0,0,${opacity}))`;
}

/** Compute arrow polygon points at a line endpoint */
function arrowPoints(
	x2: number,
	y2: number,
	angle: number,
	len = 8,
	hw = 3.5,
): string {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	// Tip at (x2, y2)
	// Left base: behind tip + perpendicular offset
	const lx = x2 - len * c + hw * s;
	const ly = y2 - len * s - hw * c;
	// Right base: behind tip - perpendicular offset
	const rx = x2 - len * c - hw * s;
	const ry = y2 - len * s + hw * c;
	return `${r(x2)},${r(y2)} ${r(lx)},${r(ly)} ${r(rx)},${r(ry)}`;
}

function processSvgBlock(svg: string): string {
	let out = svg;

	// --- Parse <defs> ---
	const defsMatch = out.match(/<defs>([\s\S]*?)<\/defs>/);
	const defs = defsMatch?.[1] || "";

	// Map filter ID → CSS drop-shadow string
	const filters = new Map<string, string>();
	for (const m of defs.matchAll(
		/<filter\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/filter>/g,
	)) {
		filters.set(m[1], extractDropShadow(m[2]));
	}

	// Map marker ID → fill color
	const markers = new Map<string, string>();
	for (const m of defs.matchAll(
		/<marker\s+[^>]*id="([^"]+)"[\s\S]*?<\/marker>/g,
	)) {
		const fill = m[0].match(/fill="([^"]+)"/)?.[1] || "#546E7A";
		markers.set(m[1], fill);
	}

	// --- 1. Replace filter="url(#id)" → style="filter: ..." ---
	out = out.replace(/filter="url\(#([^)]+)\)"/g, (_, id) => {
		const css = filters.get(id) || "drop-shadow(2px 2px 3px rgba(0,0,0,0.15))";
		return `style="filter: ${css}"`;
	});

	// --- 2a. Replace <line ... marker-end="url(#id)" /> → <line/> + <polygon/> ---
	out = out.replace(
		/<line\s[^>]*marker-end="url\(#([^)]+)\)"[^>]*\/>/g,
		(full, markerId) => {
			const x1 = Number.parseFloat(full.match(/x1="([^"]+)"/)?.[1] || "0");
			const y1 = Number.parseFloat(full.match(/y1="([^"]+)"/)?.[1] || "0");
			const x2 = Number.parseFloat(full.match(/x2="([^"]+)"/)?.[1] || "0");
			const y2 = Number.parseFloat(full.match(/y2="([^"]+)"/)?.[1] || "0");
			const angle = Math.atan2(y2 - y1, x2 - x1);
			const fill = markers.get(markerId) || "#546E7A";
			const pts = arrowPoints(x2, y2, angle);

			// Remove marker-end attribute from line
			const cleanLine = full.replace(/\s*marker-end="url\(#[^)]+\)"/, "");
			return `${cleanLine}\n  <polygon points="${pts}" fill="${fill}"/>`;
		},
	);

	// --- 2b. Replace <path ... marker-end="url(#id)" /> → <path/> + <polygon/> ---
	out = out.replace(
		/<path\s[^>]*marker-end="url\(#([^)]+)\)"[^>]*\/>/g,
		(full, markerId) => {
			const fill = markers.get(markerId) || "#546E7A";
			// Extract endpoint from d attribute: last coordinate pair
			const d = full.match(/d="([^"]+)"/)?.[1] || "";
			const coords = d.match(/-?[\d.]+/g) || [];
			if (coords.length >= 4) {
				const x2 = Number.parseFloat(coords[coords.length - 2]);
				const y2 = Number.parseFloat(coords[coords.length - 1]);
				// Get a previous point for angle
				const x1 = Number.parseFloat(coords[coords.length - 4]);
				const y1 = Number.parseFloat(coords[coords.length - 3]);
				const angle = Math.atan2(y2 - y1, x2 - x1);
				const pts = arrowPoints(x2, y2, angle);
				const cleanPath = full.replace(/\s*marker-end="url\(#[^)]+\)"/, "");
				return `${cleanPath}\n  <polygon points="${pts}" fill="${fill}"/>`;
			}
			// Fallback: just remove the marker-end
			return full.replace(/\s*marker-end="url\(#[^)]+\)"/, "");
		},
	);

	// --- 2c. Remove remaining url(#id) refs (clip-path, fill with gradients) ---
	// For clip-path: remove the attribute (shape will render without clipping)
	out = out.replace(/\s*clip-path="url\(#[^)]+\)"/g, "");
	// For fill="url(#id)": replace with a fallback gray
	out = out.replace(/fill="url\(#[^)]+\)"/g, 'fill="#ccc"');
	// For stroke-dasharray with url: already handled above

	// --- 3. Remove <defs> block (only contained filters + markers) ---
	out = out.replace(/<defs>[\s\S]*?<\/defs>\n?/, "");

	// --- 4. Add letter-spacing:0 to outer SVG to prevent Gaia theme inheritance ---
	out = out.replace(/(<svg[^>]*style=")([^"]*?)(")/, (_, pre, style, post) => {
		const cleaned = style.replace(/;$/, "");
		return `${pre}${cleaned};letter-spacing:0${post}`;
	});

	return out;
}

async function processFile(
	path: string,
): Promise<{ path: string; refs: number }> {
	const content = await Bun.file(path).text();
	let refs = 0;

	const result = content.replace(/<svg[\s\S]*?<\/svg>/g, (block) => {
		if (!block.includes("url(#")) return block;
		const count = (block.match(/url\(#/g) || []).length;
		refs += count;
		return processSvgBlock(block);
	});

	await Bun.write(path, result);
	return { path, refs };
}

// Main
const targetFiles = await discoverTargetFiles();
const results = await Promise.all(targetFiles.map(processFile));
const fixed = results.filter(({ refs }) => refs > 0);
for (const { path, refs } of fixed) {
	console.log(`Fixed: ${path} (${refs} url refs)`);
}
console.log(
	`\nScanned ${results.length} files, fixed ${fixed.length} files (${results.reduce((s, { refs }) => s + refs, 0)} total refs)`,
);
