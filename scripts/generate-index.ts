#!/usr/bin/env bun

import { Glob } from "bun";
import { parse as parseYaml } from "yaml";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PresentationInfo {
	dirName: string;
	topic: string;
	theme: string;
	slideCount: number;
	htmlPath: string; // relative to docs/
}

type CategoryId =
	| "security"
	| "thinking"
	| "engineering"
	| "ai"
	| "investment"
	| "career"
	| "aws"
	| "other";

interface Category {
	id: CategoryId;
	label: string;
	presentations: PresentationInfo[];
}

// ---------------------------------------------------------------------------
// Category classification
// ---------------------------------------------------------------------------

// Rules are checked in order — first match wins.
// Priority: security > thinking > engineering > aws > investment > career > ai > other
const CATEGORY_RULES: { id: CategoryId; label: string; keywords: RegExp }[] = [
	{
		id: "security",
		label: "Security & Compliance",
		keywords:
			/セキュリティ|security|\bisms\b|hipaa|devsecops|oauth|saml|oidc|\bmfa\b|compliance|コンプライアンス|認証|認可|authz|guarduty|waf/i,
	},
	{
		id: "thinking",
		label: "Thinking & Society",
		keywords:
			/バイアス|bias|フェルミ|fermi|ディストピア|ユートピア|dystopia|utopia|ハルシネーション|確証|物理|physics|渋滞|地政学|geopolitics/i,
	},
	{
		id: "engineering",
		label: "Software Engineering",
		keywords:
			/モノリス|monolith|yagni|仕様書|技術選定|スタートアップ|startup|分散|distributed/i,
	},
	{
		id: "aws",
		label: "AWS",
		keywords: /aws|iam|cognito|vpc|lambda|ネットワーキング|networking/i,
	},
	{
		id: "investment",
		label: "Investment & Finance",
		keywords: /投資|為替|成長産業|forex|jpy|金融|finance/i,
	},
	{
		id: "career",
		label: "Career & Management",
		keywords: /マネージメント|management|キャリア|年収|海外就業|部下|career/i,
	},
	{
		id: "ai",
		label: "AI & Technology",
		keywords:
			/ai|claude|web技術|技術トレンド|agent|llm|ソフトウェアエンジニア|テクノロジ|アプリケーション|rag|transformer|生成/i,
	},
];

function classify(topic: string, slug: string): Category["id"] {
	const text = `${topic} ${slug}`;
	for (const rule of CATEGORY_RULES) {
		if (rule.keywords.test(text)) return rule.id;
	}
	return "other";
}

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
	// Try baseName from output.baseName
	const output = config.output as Record<string, unknown> | undefined;
	const baseName = output?.baseName ?? config.outputFileName;

	if (typeof baseName === "string") {
		const candidate = `${docsDir}/${dirName}/dist/${baseName}.html`;
		if (await Bun.file(candidate).exists()) {
			return `${dirName}/dist/${baseName}.html`;
		}
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
// Collect presentation data
// ---------------------------------------------------------------------------

async function collectPresentations(): Promise<PresentationInfo[]> {
	const docsDir = "docs";
	const glob = new Glob(`${docsDir}/*/slides.config.yaml`);
	const configPaths = Array.from(glob.scanSync()).sort();

	const presentations: PresentationInfo[] = [];

	for (const configPath of configPaths) {
		const dirName = configPath.split("/")[1];

		// Parse config
		const configText = await Bun.file(configPath).text();
		const config = parseYaml(configText) as Record<string, unknown>;

		const topic = String(config.topic ?? dirName);
		const theme = extractTheme(config);

		// Slide count from slides-data.json
		let slideCount = 0;
		const dataPath = `${docsDir}/${dirName}/slides-data.json`;
		try {
			const data = (await Bun.file(dataPath).json()) as {
				slides?: unknown[];
			};
			slideCount = data.slides?.length ?? 0;
		} catch {
			// slides-data.json may not exist
		}

		// HTML file
		const htmlPath = await findHtmlFile(docsDir, dirName, config);
		if (!htmlPath) {
			console.warn(`⚠️  No HTML found for ${dirName}, skipping`);
			continue;
		}

		presentations.push({ dirName, topic, theme, slideCount, htmlPath });
	}

	return presentations;
}

// ---------------------------------------------------------------------------
// SVG icon helpers (inline, matching existing design)
// ---------------------------------------------------------------------------

const ICON_SLIDES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;
const ICON_THEME = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`;
const ICON_PLAY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

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

function renderCard(p: PresentationInfo, categoryLabel: string): string {
	const catId = classify(p.topic, p.dirName);
	return `    <div class="card" data-category="${catId}">
      <div class="card-category">${escapeHtml(categoryLabel)}</div>
      <h3>${escapeHtml(p.topic)}</h3>
      <div class="card-meta">
        <span class="tag">
          ${ICON_SLIDES}
          ${p.slideCount} slides
        </span>
        <span class="tag">
          ${ICON_THEME}
          ${escapeHtml(p.theme)}
        </span>
      </div>
      <div class="card-actions">
        <a class="btn" href="${escapeHtml(p.htmlPath)}">
          ${ICON_PLAY}
          View Slides
        </a>
      </div>
    </div>`;
}

function renderSection(cat: Category): string {
	if (cat.presentations.length === 0) return "";

	const cards = cat.presentations
		.map((p) => renderCard(p, cat.label))
		.join("\n\n");

	return `  <h2 class="section-title" data-section="${cat.id}">${escapeHtml(cat.label)}</h2>
  <div class="grid">

${cards}

  </div>`;
}

function generateHtml(categories: Category[], totalSlides: number): string {
	const totalPresentations = categories.reduce(
		(sum, c) => sum + c.presentations.length,
		0,
	);
	const activeCategories = categories.filter((c) => c.presentations.length > 0);

	const filterButtons = [
		`  <button class="filter-btn active" data-filter="all">All</button>`,
		...activeCategories.map(
			(c) =>
				`  <button class="filter-btn" data-filter="${c.id}">${escapeHtml(c.label)}</button>`,
		),
	].join("\n");

	const sections = activeCategories.map(renderSection).join("\n\n");

	return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Slide Deck Collection</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#f8f9fa;--surface:#fff;--text:#1a1a2e;--text-sub:#555;
    --accent:#2563eb;--accent-hover:#1d4ed8;
    --border:#e2e8f0;--shadow:0 1px 3px rgba(0,0,0,.08);
    --shadow-hover:0 8px 25px rgba(0,0,0,.12);
    --radius:12px;--tag-bg:#f1f5f9;--tag-text:#475569;
  }
  @media(prefers-color-scheme:dark){
    :root{
      --bg:#0f172a;--surface:#1e293b;--text:#e2e8f0;--text-sub:#94a3b8;
      --accent:#60a5fa;--accent-hover:#93bbfd;
      --border:#334155;--shadow:0 1px 3px rgba(0,0,0,.3);
      --shadow-hover:0 8px 25px rgba(0,0,0,.4);
      --tag-bg:#334155;--tag-text:#94a3b8;
    }
  }
  body{
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;
    background:var(--bg);color:var(--text);line-height:1.6;
    min-height:100vh;
  }

  /* Hero */
  .hero{
    text-align:center;padding:4rem 1.5rem 3rem;
    background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);
    color:#e2e8f0;
  }
  .hero h1{font-size:2rem;font-weight:700;letter-spacing:-.02em}
  .hero p{margin-top:.5rem;color:#94a3b8;font-size:1rem}
  .hero .stats{
    display:flex;justify-content:center;gap:2rem;margin-top:1.5rem;flex-wrap:wrap;
  }
  .hero .stat{text-align:center}
  .hero .stat-num{font-size:1.75rem;font-weight:700;color:#60a5fa}
  .hero .stat-label{font-size:.8rem;color:#94a3b8;margin-top:.1rem}

  /* Filter */
  .filter-bar{
    display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap;
    padding:1.5rem 1rem;max-width:900px;margin:0 auto;
  }
  .filter-btn{
    padding:.4rem 1rem;border:1px solid var(--border);border-radius:99px;
    background:var(--surface);color:var(--text-sub);cursor:pointer;
    font-size:.85rem;transition:all .15s;
  }
  .filter-btn:hover,.filter-btn.active{
    background:var(--accent);color:#fff;border-color:var(--accent);
  }

  /* Grid */
  .container{max-width:1100px;margin:0 auto;padding:0 1.5rem 4rem}
  .section-title{
    font-size:1.15rem;font-weight:600;margin:2rem 0 1rem;
    padding-left:.25rem;border-left:3px solid var(--accent);padding-left:.75rem;
    color:var(--text);
  }
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.25rem}

  /* Card */
  .card{
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    padding:1.5rem;box-shadow:var(--shadow);
    transition:box-shadow .2s,transform .2s;
    display:flex;flex-direction:column;position:relative;
  }
  .card:hover{box-shadow:var(--shadow-hover);transform:translateY(-2px)}
  .card-category{
    font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;
    color:var(--accent);margin-bottom:.5rem;
  }
  .card h3{font-size:1.05rem;font-weight:600;line-height:1.4;margin-bottom:.75rem}
  .card-meta{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
  .tag{
    display:inline-flex;align-items:center;gap:.3rem;
    padding:.2rem .6rem;border-radius:99px;
    background:var(--tag-bg);color:var(--tag-text);font-size:.75rem;
  }
  .tag svg{width:14px;height:14px;flex-shrink:0}
  .card-actions{margin-top:auto;padding-top:1rem}
  .btn{
    display:inline-flex;align-items:center;gap:.4rem;
    padding:.55rem 1.25rem;border-radius:8px;font-size:.85rem;font-weight:500;
    text-decoration:none;transition:all .15s;
    background:var(--accent);color:#fff;
  }
  .btn:hover{background:var(--accent-hover)}
  .btn svg{width:16px;height:16px}

  /* Footer */
  footer{
    text-align:center;padding:2rem 1rem;color:var(--text-sub);
    font-size:.8rem;border-top:1px solid var(--border);
  }
  footer a{color:var(--accent);text-decoration:none}

  @media(max-width:600px){
    .hero{padding:2.5rem 1rem 2rem}
    .hero h1{font-size:1.5rem}
    .grid{grid-template-columns:1fr}
  }
</style>
</head>
<body>

<header class="hero">
  <h1>Slide Deck Collection</h1>
  <p>Marp-powered presentations generated with Claude Code</p>
  <div class="stats">
    <div class="stat">
      <div class="stat-num">${totalPresentations}</div>
      <div class="stat-label">Presentations</div>
    </div>
    <div class="stat">
      <div class="stat-num">${totalSlides}</div>
      <div class="stat-label">Total Slides</div>
    </div>
    <div class="stat">
      <div class="stat-num">${activeCategories.length}</div>
      <div class="stat-label">Categories</div>
    </div>
  </div>
</header>

<nav class="filter-bar">
${filterButtons}
</nav>

<main class="container">

${sections}

</main>

<footer>
  <p>Built with <a href="https://marp.app" target="_blank" rel="noopener">Marp</a> + <a href="https://claude.ai/code" target="_blank" rel="noopener">Claude Code</a></p>
</footer>

<script>
document.addEventListener('DOMContentLoaded',()=>{
  const btns=document.querySelectorAll('.filter-btn');
  const cards=document.querySelectorAll('.card');
  const sections=document.querySelectorAll('.section-title');

  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;

      if(f==='all'){
        cards.forEach(c=>c.style.display='');
        sections.forEach(s=>{s.style.display='';s.nextElementSibling.style.display='';});
      }else{
        cards.forEach(c=>{
          c.style.display=c.dataset.category===f?'':'none';
        });
        sections.forEach(s=>{
          const grid=s.nextElementSibling;
          const hasVisible=[...grid.children].some(c=>c.style.display!=='none');
          s.style.display=hasVisible?'':'none';
          grid.style.display=hasVisible?'':'none';
        });
      }
    });
  });
});
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

	const presentations = await collectPresentations();
	presentations.sort((a, b) => a.dirName.localeCompare(b.dirName));

	// Group into categories
	const categoryMap = new Map<CategoryId, PresentationInfo[]>();
	for (const p of presentations) {
		const catId = classify(p.topic, p.dirName);
		if (!categoryMap.has(catId)) categoryMap.set(catId, []);
		categoryMap.get(catId)?.push(p);
	}

	// Build ordered categories (display order)
	const orderedIds: CategoryId[] = [
		"ai",
		"security",
		"engineering",
		"aws",
		"investment",
		"career",
		"thinking",
		"other",
	];
	const categories: Category[] = orderedIds
		.map((id) => {
			const rule = CATEGORY_RULES.find((r) => r.id === id);
			return {
				id,
				label: rule?.label ?? "Other",
				presentations: categoryMap.get(id) ?? [],
			};
		})
		.filter((c) => c.presentations.length > 0);

	const totalSlides = presentations.reduce((sum, p) => sum + p.slideCount, 0);

	const html = generateHtml(categories, totalSlides);
	await Bun.write("docs/index.html", html);

	console.log(`  ${presentations.length} presentations`);
	console.log(`  ${totalSlides} total slides`);
	console.log(`  ${categories.length} categories`);
	for (const cat of categories) {
		console.log(`    ${cat.label}: ${cat.presentations.length}`);
	}
	console.log("\ndocs/index.html generated.");
}

main();
