/**
 * Report prohibited url(#id) references in SVGs and inline SVGs under docs/.
 *
 * Two things the old `grep -rn "url(#"` hook got wrong:
 *   1. It used `docs/**\/*.svg`. Bash has globstar off by default, so the
 *      pattern collapsed to docs/*\/*.svg and matched nothing — SVGs live in
 *      docs/<deck>/assets/. The check was silently green forever.
 *   2. It matched inside XML comments. Several diagrams carry notes like
 *      "<!-- no url(#id), using solid colors -->" which are compliant by
 *      definition; flagging them sends the fixer after something it cannot
 *      fix, and `scripts/fix-svg-url-refs.ts` is not idempotent (it appends
 *      another `;letter-spacing:0` on every pass).
 *
 * Reports only. Fixing stays a deliberate, human-invoked step.
 * Exit 0 = clean, 1 = violations found.
 */

const COMMENT = /<!--[\s\S]*?-->/g;
const SVG_BLOCK = /<svg[\s\S]*?<\/svg>/g;

/**
 * Only an ATTRIBUTE VALUE can be a live reference — `filter="url(#s)"`,
 * `fill="url(#g)"`, `style="filter:url(#s)"`. A `url(#id)` sitting in element
 * text or in a fenced code sample is documentation: several decks in this repo
 * teach the rule and render the literal string on a slide.
 */
const ATTR_URL_REF = /[\w:-]+\s*=\s*(["'])[^"']*url\(#[^)]*\)[^"']*\1/g;

/** Blank a region out, keeping newlines so line numbers stay correct. */
const blank = (s: string) => s.replace(/[^\n]/g, " ");

const files = [
	...new Bun.Glob("**/*.svg").scanSync("docs"),
	...new Bun.Glob("**/*.md").scanSync("docs"),
].map((f) => `docs/${f}`);

const offenders: { file: string; line: number; text: string }[] = [];

for (const file of files) {
	const raw = await Bun.file(file).text();
	if (!raw.includes("url(#")) continue;

	// In markdown, only inline <svg> blocks count; prose and code fences do not.
	let scoped = raw;
	if (file.endsWith(".md")) {
		let out = blank(raw);
		for (const m of raw.matchAll(SVG_BLOCK)) {
			const start = m.index ?? 0;
			out = out.slice(0, start) + m[0] + out.slice(start + m[0].length);
		}
		scoped = out;
	}

	const stripped = scoped.replace(COMMENT, blank);

	stripped.split("\n").forEach((line, i) => {
		const hit = line.match(ATTR_URL_REF);
		if (hit) offenders.push({ file, line: i + 1, text: hit.join(", ") });
	});
}

if (offenders.length === 0) {
	console.log(`✅ url(#id) check passed (${files.length} files scanned)`);
	process.exit(0);
}

console.log(
	`❌ Prohibited url(#id) references — ${offenders.length} occurrence(s):`,
);
for (const o of offenders.slice(0, 20)) {
	console.log(`   ${o.file}:${o.line}  ${o.text}`);
}
if (offenders.length > 20)
	console.log(`   ... and ${offenders.length - 20} more`);
console.log(
	'   Replace with: style="filter: drop-shadow(...)" / explicit <polygon> arrowheads / solid fills.',
);
process.exit(1);
