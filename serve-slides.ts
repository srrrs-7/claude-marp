#!/usr/bin/env bun

const port = 8081;
const baseDir = "docs";

Bun.serve({
	port,
	async fetch(req) {
		const url = new URL(req.url);
		let path = url.pathname;

		// Default to index page with list of all slides
		if (path === "/") {
			const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>All Slides</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    h1 { color: #333; }
    ul { list-style: none; padding: 0; }
    li { margin: 1rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px; }
    a { color: #0066cc; text-decoration: none; font-size: 1.1rem; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>🎨 All Slide Projects</h1>
  <ul>
    <li><a href="/20260214063457_ai-era-survival-strategy/dist/ai-era-survival-strategy.html">AI時代のサバイバル戦略</a></li>
    <li><a href="/20260214073222_growing-industries-investment/dist/2026-slides.html">成長産業への投資戦略</a></li>
    <li><a href="/20260214081826_global-career-strategy/dist/global-career-strategy-2026.html">世界年収アップ戦略</a></li>
    <li><a href="/20260214082356_web-tech-trends-2026/dist/web-tech-trends-2026.html">Web技術トレンド2026</a></li>
    <li><a href="/20260214082958_management-best-practices/dist/management-best-practices.html">マネジメントベストプラクティス</a></li>
    <li><a href="/20260214103000_ai-growth-apps-investment/dist/ai-growth-apps-investment.html">AI成長アプリへの投資</a></li>
    <li><a href="/20260214103001_jpy-forex-outlook-2026/dist/jpy-forex-outlook-2026.html">円相場展望2026</a></li>
  </ul>
</body>
</html>`;

			return new Response(html, {
				headers: { "Content-Type": "text/html" },
			});
		}

		// Serve files from docs directory
		const filePath = `${baseDir}${path}`;
		const file = Bun.file(filePath);

		if (await file.exists()) {
			const contentType = path.endsWith(".html")
				? "text/html"
				: path.endsWith(".js")
					? "application/javascript"
					: path.endsWith(".css")
						? "text/css"
						: "text/plain";

			return new Response(file, {
				headers: { "Content-Type": contentType },
			});
		}

		return new Response("Not Found: " + filePath, { status: 404 });
	},
});

console.log(`Server running at http://localhost:${port}/`);
console.log(`All slides index: http://localhost:${port}/`);
