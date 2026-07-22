/* ---------------------------------------------------------------------------
   Slide Deck Collection — bookshelf UI behaviour
   Inlined into docs/index.html by scripts/generate-index.ts

   Reads two globals injected by the generator:
     DECKS       — array of deck records
     CATEGORIES  — [{ id, label }] in display order
   --------------------------------------------------------------------------- */

(() => {
	const DECKS = JSON.parse(document.getElementById("deck-data").textContent);
	const CATEGORIES = JSON.parse(
		document.getElementById("category-data").textContent,
	);

	// Spine colour per category. Deliberately muted/bookish rather than neon.
	const CAT_COLOR = {
		ai: "#3f6ea8",
		engineering: "#4b7f6b",
		infra: "#5a6b8c",
		security: "#8c4a4a",
		science: "#6a5a94",
		thinking: "#8a6a3f",
		business: "#3f7a83",
		investment: "#7a6a2f",
		career: "#8a5578",
		aws: "#a0662c",
		"claude-exam": "#c0623e",
		other: "#5f5f6b",
	};

	const catLabel = new Map(CATEGORIES.map((c) => [c.id, c.label]));
	const color = (id) => CAT_COLOR[id] ?? CAT_COLOR.other;

	// --- Spine colour variation ------------------------------------------------
	// Every book in a shelf shares the category hue, but a real shelf is never one
	// flat colour. Jitter H/S/L deterministically per deck so a run of books reads
	// as a family of related spines — while staying dark enough for white text.

	function hexToHsl(hex) {
		const n = Number.parseInt(hex.slice(1), 16);
		const r = (n >> 16) / 255;
		const g = ((n >> 8) & 255) / 255;
		const b = (n & 255) / 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const l = (max + min) / 2;
		let h = 0;
		let s = 0;
		const d = max - min;
		if (d) {
			s = d / (1 - Math.abs(2 * l - 1));
			if (max === r) h = ((g - b) / d) % 6;
			else if (max === g) h = (b - r) / d + 2;
			else h = (r - g) / d + 4;
			h *= 60;
			if (h < 0) h += 360;
		}
		return { h, s, l };
	}

	const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

	/** A deterministic, category-consistent spine colour for one deck. */
	function spineColor(d) {
		const { h, s, l } = hexToHsl(color(d.cat));
		const r1 = hash01(d.dir);
		const r2 = hash01(`${d.dir}~s`);
		const r3 = hash01(`${d.dir}~l`);
		const H = (h + (r1 * 2 - 1) * 18 + 360) % 360;
		const S = clamp(s * (0.78 + r2 * 0.5), 0.16, 0.62);
		const L = clamp(l * (0.82 + r3 * 0.42), 0.26, 0.5);
		return `hsl(${H.toFixed(0)} ${(S * 100).toFixed(0)}% ${(L * 100).toFixed(0)}%)`;
	}

	const FOIL = {
		A: "#f2d489",
		B: "#dfe4ea",
		C: "#d3a06a",
		D: "rgba(255,255,255,.35)",
		"-": "rgba(255,255,255,.4)", // PDFs carry no quality grade
	};

	const isPdf = (d) => d.kind === "pdf";

	// -------------------------------------------------------------------------
	// Persisted user state
	// -------------------------------------------------------------------------

	const store = {
		read: (key, fallback) => {
			try {
				return JSON.parse(localStorage.getItem(key)) ?? fallback;
			} catch {
				return fallback;
			}
		},
		write: (key, value) => {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch {
				/* private mode — ignore */
			}
		},
	};

	const favs = new Set(store.read("shelf:favs", []));
	const opened = new Set(store.read("shelf:opened", []));

	const saveFavs = () => store.write("shelf:favs", [...favs]);
	const saveOpened = () => store.write("shelf:opened", [...opened]);

	// -------------------------------------------------------------------------
	// View state (mirrored into the URL hash)
	// -------------------------------------------------------------------------

	const state = {
		view: "shelf",
		cat: "all",
		grade: "all",
		sort: "newest",
		q: "",
	};

	function readHash() {
		const p = new URLSearchParams(location.hash.replace(/^#/, ""));
		for (const k of Object.keys(state)) {
			const v = p.get(k);
			if (v !== null) state[k] = v;
		}
	}

	function writeHash() {
		const p = new URLSearchParams();
		for (const [k, v] of Object.entries(state)) {
			const def = {
				view: "shelf",
				cat: "all",
				grade: "all",
				sort: "newest",
				q: "",
			}[k];
			if (v && v !== def) p.set(k, v);
		}
		const next = p.toString();
		const url = next ? `#${next}` : location.pathname + location.search;
		history.replaceState(null, "", url);
	}

	// -------------------------------------------------------------------------
	// Filtering & sorting
	// -------------------------------------------------------------------------

	function norm(s) {
		return s.toLowerCase().normalize("NFKC");
	}

	function matches(d) {
		if (
			state.cat === "fav"
				? !favs.has(d.dir)
				: state.cat !== "all" && d.cat !== state.cat
		)
			return false;
		if (state.grade !== "all" && d.grade !== state.grade) return false;
		if (state.q) {
			const q = norm(state.q);
			const hay = norm(`${d.topic} ${d.bluf} ${d.toc.join(" ")} ${d.dir}`);
			if (!hay.includes(q)) return false;
		}
		return true;
	}

	const SORTERS = {
		newest: (a, b) => b.ts.localeCompare(a.ts),
		oldest: (a, b) => a.ts.localeCompare(b.ts),
		slides: (a, b) => b.slides - a.slides,
		reading: (a, b) => b.mins - a.mins,
		grade: (a, b) => a.grade.localeCompare(b.grade) || b.slides - a.slides,
		title: (a, b) => a.topic.localeCompare(b.topic, "ja"),
	};

	function visibleDecks() {
		return DECKS.filter(matches).sort(SORTERS[state.sort] ?? SORTERS.newest);
	}

	// -------------------------------------------------------------------------
	// Rendering helpers
	// -------------------------------------------------------------------------

	const esc = (s) =>
		String(s).replace(
			/[&<>"']/g,
			(c) =>
				({
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#39;",
				})[c],
		);

	/** Deterministic 0..1 from a string — keeps spine heights stable across builds. */
	function hash01(s) {
		let h = 2166136261;
		for (let i = 0; i < s.length; i++) {
			h ^= s.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return ((h >>> 0) % 1000) / 1000;
	}

	const readingLabel = (m) =>
		m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${m % 60}m`;

	const sizeLabel = (b) =>
		b >= 1024 * 1024
			? `${(b / 1024 / 1024).toFixed(1)} MB`
			: `${Math.round(b / 1024)} KB`;

	/** Unit shown next to the page/slide count — decks are slides, PDFs are pages. */
	const countLabel = (d) =>
		isPdf(d) ? `${d.slides} pages` : `${d.slides} slides`;

	function bookHtml(d) {
		// Thickness tracks slide/page count; height jitters so the row looks like a real shelf.
		const width = Math.round(36 + Math.min(d.slides, 90) * 0.44);
		const height = Math.round(252 + hash01(d.dir) * 44);
		// A little life: cap depth and an occasional lean, both deterministic so the
		// shelf looks identical across rebuilds.
		const cap = (8 + hash01(`${d.dir}~cap`) * 5).toFixed(1);
		const leanR = hash01(`${d.dir}~lean`);
		const lean = leanR > 0.86 ? ((leanR - 0.86) / 0.14) * 2.2 : 0;
		const cls = [
			"book",
			opened.has(d.dir) ? "is-read" : "",
			isPdf(d) ? "is-pdf" : "",
			lean ? "is-leaning" : "",
		]
			.filter(Boolean)
			.join(" ");
		return `<button class="${cls}" data-dir="${esc(d.dir)}" title="${esc(d.topic)}"
			style="--spine:${spineColor(d)};--foil:${FOIL[d.grade]};--cap:${cap}px;--lean:${lean.toFixed(2)}deg;width:${width}px;height:${height}px">
			<span class="cap"></span>
			<span class="foil foil-top"></span>
			<span class="foil foil-bottom"></span>
			${isPdf(d) ? '<span class="paper-edge"></span>' : ""}
			${favs.has(d.dir) ? '<span class="fav-star">★</span>' : ""}
			<span class="spine-title">${esc(d.topic)}</span>
			<span class="spine-grade">${isPdf(d) ? "PDF" : d.grade}</span>
		</button>`;
	}

	const ICON = {
		slides: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
		clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
		theme: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
		play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
		doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
		download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><path d="M12 15V3"/></svg>`,
	};

	function cardHtml(d) {
		// A PDF has pages and a file size where a deck has slides and a reading estimate.
		const meta = isPdf(d)
			? `<span class="tag">${ICON.doc}${countLabel(d)}</span>
				<span class="tag">${ICON.download}${sizeLabel(d.bytes)}</span>`
			: `<span class="tag">${ICON.slides}${countLabel(d)}</span>
				<span class="tag">${ICON.clock}${readingLabel(d.mins)}</span>`;
		return `<button class="card${isPdf(d) ? " is-pdf" : ""}" data-dir="${esc(d.dir)}" style="--spine:${color(d.cat)}">
			${isPdf(d) ? "" : `<span class="grade-badge grade-${d.grade}">${d.grade}</span>`}
			<span class="card-category">${esc(catLabel.get(d.cat) ?? "Other")}</span>
			<h3>${esc(d.topic)}</h3>
			${d.bluf ? `<p class="bluf">${esc(d.bluf)}</p>` : ""}
			<span class="card-meta">
				${meta}
				${isPdf(d) ? "" : `<span class="tag">${ICON.theme}${esc(d.theme)}</span>`}
			</span>
		</button>`;
	}

	function rowHtml(d) {
		return `<button class="list-row" data-dir="${esc(d.dir)}" style="--spine:${color(d.cat)}">
			<span class="swatch"></span>
			<span class="lt">${favs.has(d.dir) ? "★ " : ""}${esc(d.topic)}</span>
			<span class="lc">${esc(catLabel.get(d.cat) ?? "Other")}</span>
			<span class="ln">${countLabel(d)}</span>
			<span class="ln">${isPdf(d) ? sizeLabel(d.bytes) : readingLabel(d.mins)}</span>
			<span class="lg ${isPdf(d) ? "grade-pdf" : `grade-${d.grade}`}">${isPdf(d) ? "P" : d.grade}</span>
		</button>`;
	}

	// -------------------------------------------------------------------------
	// Main render
	// -------------------------------------------------------------------------

	const main = document.getElementById("main");
	const empty = document.getElementById("empty");
	const countEl = document.getElementById("result-count");

	function render() {
		const decks = visibleDecks();
		countEl.textContent = `${decks.length} / ${DECKS.length} 件`;
		empty.style.display = decks.length ? "none" : "block";

		if (!decks.length) {
			main.innerHTML = "";
			return;
		}

		if (state.view === "grid") {
			main.innerHTML = `<div class="grid">${decks.map(cardHtml).join("")}</div>`;
		} else if (state.view === "list") {
			main.innerHTML = `<div class="list">${decks.map(rowHtml).join("")}</div>`;
		} else {
			// Shelf: one plank per category, in the generator's display order.
			const groups = new Map();
			for (const d of decks) {
				if (!groups.has(d.cat)) groups.set(d.cat, []);
				groups.get(d.cat).push(d);
			}
			const order = CATEGORIES.map((c) => c.id).filter((id) => groups.has(id));
			main.innerHTML = order
				.map((id) => {
					const books = groups.get(id);
					return `<section class="shelf-unit">
						<div class="shelf-head">
							<h2>${esc(catLabel.get(id) ?? "Other")}</h2>
							<span class="count">${books.length} 冊</span>
						</div>
						<div class="shelf-case">
							<div class="shelf-rail"></div>
							<div class="shelf-body"><div class="shelf-row">${books.map(bookHtml).join("")}</div></div>
							<div class="shelf-plank"></div>
						</div>
					</section>`;
				})
				.join("");
		}
	}

	// -------------------------------------------------------------------------
	// Detail sheet
	// -------------------------------------------------------------------------

	const overlay = document.getElementById("overlay");
	const sheet = document.getElementById("sheet");
	let lastFocused = null;

	function pct(x) {
		return `${Math.round(x * 100)}%`;
	}

	// `animate` replays the book-opening animation. A fav toggle re-renders the
	// same open book in place, so it passes false to avoid re-flipping the pages.
	function openSheet(dir, animate = true) {
		const d = DECKS.find((x) => x.dir === dir);
		if (!d) return;
		if (animate) lastFocused = document.activeElement;

		const isFav = favs.has(d.dir);
		const fileName = d.href.split("/").pop();

		// Left page — identity & quality. A PDF has file facts where a deck has meters.
		const stats = isPdf(d)
			? `<div class="pstat"><b>${d.slides || "—"}</b><span>Pages</span></div>
				<div class="pstat"><b>${sizeLabel(d.bytes)}</b><span>Size</span></div>
				<div class="pstat"><b>PDF</b><span>Format</span></div>`
			: `<div class="pstat"><b>${d.slides}</b><span>Slides</span></div>
				<div class="pstat"><b>${readingLabel(d.mins)}</b><span>Reading</span></div>
				<div class="pstat grade-${d.grade}"><b>${d.grade}</b><span>Grade</span></div>`;

		const meters = isPdf(d)
			? ""
			: `<div class="pmeter"><div class="pm-k">図解率<em>${pct(d.svg)}</em></div>
					<div class="meter"><i style="width:${pct(d.svg)}"></i></div></div>
				<div class="pmeter"><div class="pm-k">主張タイトル<em>${pct(d.assertive)}</em></div>
					<div class="meter"><i style="width:${pct(d.assertive)}"></i></div></div>
				<div class="pmeter"><div class="pm-k">BLUF<em>${pct(d.subtitle)}</em></div>
					<div class="meter"><i style="width:${pct(d.subtitle)}"></i></div></div>`;

		// Right page — where the book leads. TOC for decks, file facts for PDFs.
		const rightBody = isPdf(d)
			? `<h4>ファイル</h4><p class="file-name">${esc(fileName)}</p>`
			: d.toc.length
				? `<h4>目次</h4><ol class="toc">${d.toc.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`
				: `<h4>この本について</h4><p class="page-note">${d.bluf ? esc(d.bluf) : "目次情報はありません。"}</p>`;

		const primary = isPdf(d)
			? `<a class="btn" id="sheet-open" href="${esc(d.href)}" target="_blank" rel="noopener">${ICON.doc} PDF を開く</a>
				<a class="btn btn-ghost" href="${esc(d.href)}" download>${ICON.download} ダウンロード</a>`
			: `<a class="btn" id="sheet-open" href="${esc(d.href)}">${ICON.play} スライドを読む</a>`;

		sheet.style.setProperty("--spine", color(d.cat));
		sheet.innerHTML = `
			<button class="sheet-close" id="sheet-close" aria-label="閉じる">×</button>
			<div class="spread${animate ? " is-opening" : ""}">
				<div class="page page-left">
					<div class="page-inner">
						<div class="cat">${esc(catLabel.get(d.cat) ?? "Other")}</div>
						<h2>${esc(d.topic)}</h2>
						${d.bluf ? `<p class="bluf">${esc(d.bluf)}</p>` : ""}
						<div class="pstats">${stats}</div>
						${meters}
					</div>
				</div>
				<div class="spine-fold"></div>
				<div class="page page-right">
					<div class="page-inner">
						${rightBody}
						<div class="sheet-actions">
							${primary}
							<button class="btn btn-ghost ${isFav ? "on" : ""}" id="sheet-fav">
								${isFav ? "★ お気に入り解除" : "☆ お気に入りに追加"}
							</button>
						</div>
					</div>
				</div>
			</div>`;

		overlay.classList.add("open");
		document.body.style.overflow = "hidden";
		document.getElementById("sheet-close").focus();

		document.getElementById("sheet-close").onclick = closeSheet;
		document.getElementById("sheet-open").onclick = () => {
			opened.add(d.dir);
			saveOpened();
		};
		document.getElementById("sheet-fav").onclick = () => {
			if (favs.has(d.dir)) favs.delete(d.dir);
			else favs.add(d.dir);
			saveFavs();
			openSheet(dir, false);
			render();
		};
	}

	function closeSheet() {
		overlay.classList.remove("open");
		document.body.style.overflow = "";
		sheet.innerHTML = "";
		lastFocused?.focus();
	}

	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) closeSheet();
	});

	main.addEventListener("click", (e) => {
		const el = e.target.closest("[data-dir]");
		if (el) openSheet(el.dataset.dir);
	});

	// -------------------------------------------------------------------------
	// Controls
	// -------------------------------------------------------------------------

	const searchInput = document.getElementById("search");

	function syncControls() {
		for (const btn of document.querySelectorAll("[data-set]")) {
			const [key, value] = btn.dataset.set.split(":");
			btn.classList.toggle("active", state[key] === value);
		}
		if (searchInput.value !== state.q) searchInput.value = state.q;
	}

	function update() {
		writeHash();
		syncControls();
		render();
	}

	for (const btn of document.querySelectorAll("[data-set]")) {
		btn.addEventListener("click", () => {
			const [key, value] = btn.dataset.set.split(":");
			state[key] = value;
			update();
		});
	}

	let debounce;
	searchInput.addEventListener("input", () => {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			state.q = searchInput.value.trim();
			update();
		}, 120);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (overlay.classList.contains("open")) closeSheet();
			else if (document.activeElement === searchInput) {
				searchInput.value = "";
				state.q = "";
				update();
				searchInput.blur();
			}
			return;
		}
		if (e.key === "/" && document.activeElement !== searchInput) {
			e.preventDefault();
			searchInput.focus();
			searchInput.select();
		}
	});

	window.addEventListener("hashchange", () => {
		readHash();
		syncControls();
		render();
	});

	readHash();
	syncControls();
	render();
})();
