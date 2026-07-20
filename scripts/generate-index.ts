#!/usr/bin/env bun

import { Glob } from "bun";
import { parse as parseYaml } from "yaml";
import { resolveBaseName } from "../src/utils/files.js";
import { CATEGORY_CONFIGS, type CategoryId } from "./config/categories.js";
import { type SlideRecord, computeDeckMetrics } from "./lib/quality.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shelf id — a deck category, or the dedicated PDF shelf. */
type ShelfId = CategoryId | typeof PDF_SHELF_ID;

/**
 * One library item as consumed by the client-side bookshelf renderer (shelf.js).
 *
 * Both Marp decks and standalone PDFs are rendered as books, so they share one
 * record shape. Fields that only apply to one kind carry neutral values for the
 * other (a PDF has no quality grade; a deck has no byte size).
 */
interface LibraryItem {
	kind: "deck" | "pdf";
	dir: string; // stable id — deck directory name, or "pdf/<file>"
	topic: string;
	cat: ShelfId;
	theme: string; // deck: marp theme | pdf: "PDF"
	slides: number; // deck: slide count | pdf: page count
	mins: number; // deck: reading estimate | pdf: 0 (unknown)
	grade: "A" | "B" | "C" | "D" | "-"; // "-" = ungraded (PDF)
	href: string; // relative to docs/
	bluf: string; // BLUF one-liner shown on the card / detail sheet
	toc: string[]; // chapter titles
	ts: string; // 14-digit timestamp — deck dirName prefix, or PDF mtime
	svg: number; // 0..1
	assertive: number; // 0..1
	subtitle: number; // 0..1
	bytes: number; // pdf only — file size, 0 for decks
}

// ---------------------------------------------------------------------------
// Category classification
// ---------------------------------------------------------------------------

function classify(topic: string, slug: string): CategoryId {
	const text = `${topic} ${slug}`.toLowerCase();
	for (const cat of CATEGORY_CONFIGS) {
		for (const kw of cat.keywords) {
			if (text.includes(kw.toLowerCase())) return cat.id;
		}
	}
	return "other";
}

/** Shelf holding standalone PDFs — not a keyword category, appended last. */
const PDF_SHELF_ID = "pdf" as const;
const PDF_SHELF_LABEL = "PDF Library";

/** Display order of shelves. */
const CATEGORY_ORDER: CategoryId[] = [
	"ai",
	"engineering",
	"infra",
	"security",
	"science",
	"thinking",
	"business",
	"investment",
	"career",
	"aws",
	"other",
];

// ---------------------------------------------------------------------------
// Theme extraction (handles multiple config shapes)
// ---------------------------------------------------------------------------

function extractTheme(config: Record<string, unknown>): string {
	// Shape 1: marp.theme + marp.class
	const marp = config.marp as Record<string, unknown> | undefined;
	if (marp?.theme) {
		const cls = marp.class as string | undefined;
		return cls ? `${marp.theme} + ${cls}` : String(marp.theme);
	}

	// Shape 2: theme.name + theme.class (object)
	if (typeof config.theme === "object" && config.theme !== null) {
		const t = config.theme as Record<string, unknown>;
		const cls = t.class as string | undefined;
		return cls ? `${t.name} + ${cls}` : String(t.name ?? "default");
	}

	// Shape 3: theme (string)
	if (typeof config.theme === "string") {
		return config.theme;
	}

	return "default";
}

// ---------------------------------------------------------------------------
// Find the HTML file inside dist/
// ---------------------------------------------------------------------------

async function findHtmlFile(
	docsDir: string,
	dirName: string,
	config: Record<string, unknown>,
): Promise<string | null> {
	// Resolve exactly the way the render pipeline does, so the site always links
	// to the file `rebuild` refreshes rather than a leftover from an older name.
	const output = config.output as Record<string, unknown> | undefined;
	const declared = (output?.baseName ?? config.outputFileName) as unknown;
	const baseName = resolveBaseName(
		typeof declared === "string" ? declared : undefined,
		typeof config.topic === "string" ? config.topic : "",
	);

	const candidate = `${docsDir}/${dirName}/dist/${baseName}.html`;
	if (await Bun.file(candidate).exists()) {
		return `${dirName}/dist/${baseName}.html`;
	}

	// Fallback: first .html in dist/ that matches the dir slug
	const slug = dirName.replace(/^\d{14}_/, "");
	const glob = new Glob(`${docsDir}/${dirName}/dist/*.html`);
	const htmlFiles = Array.from(glob.scanSync()).sort();

	// Prefer file matching slug
	for (const f of htmlFiles) {
		const fileName = f.split("/").pop() ?? "";
		if (fileName.replace(".html", "") === slug) {
			return `${dirName}/dist/${fileName}`;
		}
	}

	// Fallback: first html file
	if (htmlFiles.length > 0) {
		const parts = htmlFiles[0].split("/");
		const rel = parts.slice(parts.indexOf(dirName)).join("/");
		return rel;
	}

	return null;
}

// ---------------------------------------------------------------------------
// Narrative extraction — BLUF line and chapter list for the detail sheet
// ---------------------------------------------------------------------------

const AGENDA_TITLE_RE =
	/^(目次|アジェンダ|本日の内容|agenda|contents?|outline)$/i;

/** The deck's one-line conclusion: the first subtitle after the title slide. */
function extractBluf(slides: SlideRecord[]): string {
	for (const s of slides.slice(1, 4)) {
		if (s.subtitle) return s.subtitle;
	}
	return "";
}

/**
 * Chapter list. Prefers `layout: "section"` divider titles; falls back to the
 * bullet items of an agenda slide for decks that have no section dividers.
 */
function extractToc(slides: SlideRecord[]): string[] {
	const sections = slides
		.filter((s) => s.layout === "section")
		.map((s) => (s.title ?? "").trim())
		.filter(Boolean);
	if (sections.length > 0) return sections.slice(0, 12);

	const agenda = slides.find((s) =>
		AGENDA_TITLE_RE.test((s.title ?? "").trim()),
	);
	if (!agenda) return [];
	return (agenda.content ?? [])
		.filter(
			(c) => !c.startsWith("|") && !c.startsWith("![") && !c.includes("<svg"),
		)
		.map((c) => c.replace(/^\s*\d+[.)]\s*/, "").trim())
		.filter(Boolean)
		.slice(0, 12);
}

// ---------------------------------------------------------------------------
// Collect presentation data
// ---------------------------------------------------------------------------

async function collectDecks(): Promise<LibraryItem[]> {
	const docsDir = "docs";
	const glob = new Glob(`${docsDir}/*/slides.config.yaml`);
	const configPaths = Array.from(glob.scanSync()).sort();

	const decks: LibraryItem[] = [];

	for (const configPath of configPaths) {
		const dirName = configPath.split("/")[1];

		const configText = await Bun.file(configPath).text();
		const config = parseYaml(configText) as Record<string, unknown>;

		const topic = String(config.topic ?? dirName);
		const language = config.language === "en" ? "en" : "ja";

		let slideCount = 0;
		let metrics = computeDeckMetrics([], language);
		let bluf = "";
		let toc: string[] = [];

		const dataPath = `${docsDir}/${dirName}/slides-data.json`;
		try {
			const data = (await Bun.file(dataPath).json()) as {
				slides?: SlideRecord[];
			};
			const slides = data.slides ?? [];
			slideCount = slides.length;
			metrics = computeDeckMetrics(slides, language);
			bluf = extractBluf(slides);
			toc = extractToc(slides);
		} catch {
			// slides-data.json may not exist
		}

		const href = await findHtmlFile(docsDir, dirName, config);
		if (!href) {
			console.warn(`⚠️  No HTML found for ${dirName}, skipping`);
			continue;
		}

		decks.push({
			kind: "deck",
			dir: dirName,
			topic,
			cat: classify(topic, dirName),
			theme: extractTheme(config),
			slides: slideCount,
			mins: metrics.readingMins,
			grade: metrics.grade,
			href,
			bluf,
			toc,
			ts: dirName.match(/^(\d{14})/)?.[1] ?? "0",
			svg: Math.round(metrics.svgRatio * 100) / 100,
			assertive: Math.round(metrics.assertiveRatio * 100) / 100,
			subtitle: Math.round(metrics.subtitleRatio * 100) / 100,
			bytes: 0,
		});
	}

	return decks;
}

// ---------------------------------------------------------------------------
// Standalone PDFs
//
// Only `docs/` is published to GitHub Pages (see .github/workflows/deploy-pages.yml,
// `upload-pages-artifact: path: docs`), so PDFs dropped in the repo-root `pdf/`
// directory are mirrored into `docs/pdf/` before they are indexed. Authors keep
// using `pdf/`; the published site gets a copy it can actually serve.
// ---------------------------------------------------------------------------

const PDF_SOURCE_DIR = "pdf";
const PDF_PUBLIC_DIR = "docs/pdf";

/** Copy new/changed PDFs from `pdf/` into `docs/pdf/`. Returns the copied names. */
async function mirrorPdfs(): Promise<string[]> {
	const copied: string[] = [];
	const glob = new Glob(`${PDF_SOURCE_DIR}/*.pdf`);

	for (const src of Array.from(glob.scanSync()).sort()) {
		const name = src.split("/").pop() ?? "";
		const dest = `${PDF_PUBLIC_DIR}/${name}`;
		const srcFile = Bun.file(src);
		const destFile = Bun.file(dest);

		// Size is enough to detect a replaced file; PDFs are never edited in place.
		if ((await destFile.exists()) && destFile.size === srcFile.size) continue;

		await Bun.write(dest, srcFile);
		copied.push(name);
	}

	return copied;
}

/**
 * Page count from the PDF page-tree root (`/Type /Pages … /Count N`).
 * Returns 0 when the count sits inside a compressed object stream.
 */
function pdfPageCount(raw: string): number {
	const counts = [
		...raw.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/g),
	].map((m) => Number(m[1]));
	return counts.length > 0 ? Math.max(...counts) : 0;
}

/** `/Title (…)` from the document info dictionary, when it is not compressed. */
function pdfTitle(raw: string): string {
	const m = raw.match(/\/Title\s*\(((?:[^()\\]|\\.)*)\)/);
	return m ? m[1].replace(/\\([()\\])/g, "$1").trim() : "";
}

/** "Claude_Certification_Practice_Exams_Set2" → "Claude Certification Practice Exams Set2" */
function titleFromFileName(name: string): string {
	return name
		.replace(/\.pdf$/i, "")
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

/** Local time as the same 14-digit YYYYMMDDHHmmss key decks use for sorting. */
function timestampKey(ms: number): string {
	const d = new Date(ms);
	const p = (n: number, w = 2) => String(n).padStart(w, "0");
	return `${p(d.getFullYear(), 4)}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

async function collectPdfs(): Promise<LibraryItem[]> {
	const glob = new Glob(`${PDF_PUBLIC_DIR}/*.pdf`);
	const items: LibraryItem[] = [];

	for (const path of Array.from(glob.scanSync()).sort()) {
		const name = path.split("/").pop() ?? "";
		const file = Bun.file(path);
		const raw = new TextDecoder("latin1").decode(await file.arrayBuffer());
		const pages = pdfPageCount(raw);

		// Mirroring rewrites the copy's mtime, so date order comes from the
		// original in `pdf/` whenever it is still there.
		const source = Bun.file(`${PDF_SOURCE_DIR}/${name}`);
		const modified = (await source.exists())
			? source.lastModified
			: file.lastModified;

		items.push({
			kind: "pdf",
			dir: `pdf/${name}`,
			topic: pdfTitle(raw) || titleFromFileName(name),
			cat: PDF_SHELF_ID,
			theme: "PDF",
			slides: pages,
			mins: 0,
			grade: "-",
			href: `pdf/${name}`,
			bluf: "",
			toc: [],
			ts: timestampKey(modified),
			svg: 0,
			assertive: 0,
			subtitle: 0,
			bytes: file.size,
		});
	}

	return items;
}

// ---------------------------------------------------------------------------
// HTML generation
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** Safe to embed inside <script type="application/json">. */
function embedJson(value: unknown): string {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}

const ICON_GRID = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
const ICON_LIST = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`;
const ICON_SHELF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v13M9 4v13M14 5l4 12M3 20h18"/></svg>`;

interface Totals {
	decks: number;
	pdfs: number;
	slides: number;
	mins: number;
	categories: number;
}

function generateHtml(
	decks: LibraryItem[],
	categories: { id: ShelfId; label: string }[],
	totals: Totals,
	css: string,
	js: string,
): string {
	const hours = Math.floor(totals.mins / 60);
	const timeLabel =
		hours > 0 ? `${hours}h ${totals.mins % 60}m` : `${totals.mins}m`;

	const catChips = [
		`<button class="chip" data-set="cat:all">All</button>`,
		`<button class="chip" data-set="cat:fav">★ お気に入り</button>`,
		...categories.map(
			(c) =>
				`<button class="chip" data-set="cat:${c.id}">${escapeHtml(c.label)}</button>`,
		),
	].join("\n      ");

	return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Slide Deck Library</title>
<meta name="description" content="${totals.decks} Marp presentations generated with Claude Code">
<style>
${css}
</style>
</head>
<body>

<header class="hero">
  <h1>Slide Deck Library</h1>
  <p>Marp-powered presentations generated with Claude Code</p>
  <div class="search-wrap">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input id="search" type="search" placeholder="タイトル・目次・BLUF を検索…" autocomplete="off">
    <span class="search-hint">/</span>
  </div>
  <div class="stats">
    <div class="stat"><div class="stat-num">${totals.decks}</div><div class="stat-label">Decks</div></div>
    <div class="stat"><div class="stat-num">${totals.slides}</div><div class="stat-label">Slides</div></div>
    <div class="stat"><div class="stat-num">${timeLabel}</div><div class="stat-label">Reading Time</div></div>
    ${totals.pdfs > 0 ? `<div class="stat"><div class="stat-num">${totals.pdfs}</div><div class="stat-label">PDFs</div></div>` : ""}
    <div class="stat"><div class="stat-num">${totals.categories}</div><div class="stat-label">Shelves</div></div>
  </div>
</header>

<nav class="toolbar">
  <div class="toolbar-row">
    <div class="view-switch">
      <button data-set="view:shelf">${ICON_SHELF} 本棚</button>
      <button data-set="view:grid">${ICON_GRID} カード</button>
      <button data-set="view:list">${ICON_LIST} 一覧</button>
    </div>
    <span class="bar-label">Sort</span>
    <button class="chip" data-set="sort:newest">新しい順</button>
    <button class="chip" data-set="sort:oldest">古い順</button>
    <button class="chip" data-set="sort:slides">枚数</button>
    <button class="chip" data-set="sort:reading">読了時間</button>
    <button class="chip" data-set="sort:grade">品質</button>
    <button class="chip" data-set="sort:title">タイトル</button>
    <span class="toolbar-spacer"></span>
    <span class="result-count" id="result-count"></span>
  </div>
  <div class="toolbar-row">
    <span class="bar-label">Shelf</span>
    ${catChips}
  </div>
  <div class="toolbar-row">
    <span class="bar-label">Grade</span>
    <button class="chip" data-set="grade:all">All</button>
    <button class="chip chip-grade-A" data-set="grade:A">A</button>
    <button class="chip chip-grade-B" data-set="grade:B">B</button>
    <button class="chip chip-grade-C" data-set="grade:C">C</button>
    <button class="chip chip-grade-D" data-set="grade:D">D</button>
  </div>
</nav>

<main class="container">
  <div id="main"></div>
  <p id="empty">条件に一致する資料がありません。</p>
  <noscript><p style="text-align:center;padding:3rem 1rem">この本棚は JavaScript を有効にすると表示されます。</p></noscript>
</main>

<div class="overlay" id="overlay" role="dialog" aria-modal="true">
  <div class="sheet" id="sheet"></div>
</div>

<footer>
  <p>Built with <a href="https://marp.app" target="_blank" rel="noopener">Marp</a> + <a href="https://claude.ai/code" target="_blank" rel="noopener">Claude Code</a></p>
</footer>

<script id="deck-data" type="application/json">${embedJson(decks)}</script>
<script id="category-data" type="application/json">${embedJson(categories)}</script>
<script>
${js}
</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	console.log("Generating docs/index.html...\n");

	const copied = await mirrorPdfs();
	if (copied.length > 0) {
		console.log(`  mirrored ${copied.length} PDF(s) → ${PDF_PUBLIC_DIR}/`);
		for (const name of copied) console.log(`    ${name}`);
	}

	const decks = await collectDecks();
	const pdfs = await collectPdfs();
	const items = [...decks, ...pdfs];
	items.sort((a, b) => b.ts.localeCompare(a.ts));

	const present = new Set(items.map((d) => d.cat));
	const categories: { id: ShelfId; label: string }[] = CATEGORY_ORDER.filter(
		(id) => present.has(id),
	).map((id) => ({
		id,
		label: CATEGORY_CONFIGS.find((c) => c.id === id)?.label ?? "Other",
	}));
	if (pdfs.length > 0) {
		categories.push({ id: PDF_SHELF_ID, label: PDF_SHELF_LABEL });
	}

	const totals: Totals = {
		decks: decks.length,
		pdfs: pdfs.length,
		slides: decks.reduce((sum, d) => sum + d.slides, 0),
		mins: decks.reduce((sum, d) => sum + d.mins, 0),
		categories: categories.length,
	};

	const css = await Bun.file(
		`${import.meta.dir}/index-template/shelf.css`,
	).text();
	const js = await Bun.file(
		`${import.meta.dir}/index-template/shelf.js`,
	).text();

	await Bun.write(
		"docs/index.html",
		generateHtml(items, categories, totals, css, js),
	);

	console.log(`  ${totals.decks} decks + ${totals.pdfs} PDFs`);
	console.log(`  ${totals.slides} total slides`);
	console.log(
		`  ${Math.floor(totals.mins / 60)}h ${totals.mins % 60}m reading`,
	);
	console.log(`  ${totals.categories} shelves`);
	for (const cat of categories) {
		const n = items.filter((d) => d.cat === cat.id).length;
		console.log(`    ${cat.label}: ${n}`);
	}
	const withBluf = decks.filter((d) => d.bluf).length;
	const withToc = decks.filter((d) => d.toc.length > 0).length;
	console.log(
		`  BLUF: ${withBluf}/${totals.decks}  TOC: ${withToc}/${totals.decks}`,
	);
	console.log("\ndocs/index.html generated.");
}

main();
