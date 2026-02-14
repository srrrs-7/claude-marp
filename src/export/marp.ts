import { resolve } from "node:path";
import type { SlidesConfig } from "../config/schema.js";
import { ensureDir } from "../utils/files.js";

const MERMAID_BOOTSTRAP_MARKER = "data-codex-mermaid-bootstrap";

async function enableMermaidInHtml(outputPath: string): Promise<void> {
	const file = Bun.file(outputPath);
	const html = await file.text();

	if (!html.includes("language-mermaid")) {
		return;
	}

	if (html.includes(MERMAID_BOOTSTRAP_MARKER)) {
		return;
	}

	const script = `<script ${MERMAID_BOOTSTRAP_MARKER}="1">
(function () {
  // Try multiple selectors for robustness
  let codeBlocks = Array.from(document.querySelectorAll("pre > code.language-mermaid"));
  if (codeBlocks.length === 0) {
    codeBlocks = Array.from(document.querySelectorAll('code[class*="language-mermaid"]'));
  }
  if (codeBlocks.length === 0) {
    codeBlocks = Array.from(document.querySelectorAll("code.language-mermaid"));
  }

  for (const code of codeBlocks) {

    const pre = code.parentElement;  // Changed from closest("pre") to parentElement
    // Accept both PRE and MARP-PRE (Marp uses custom elements)
    if (!pre || (pre.tagName !== "PRE" && pre.tagName !== "MARP-PRE")) {
      console.warn("[Mermaid] No PRE/MARP-PRE parent element found for code block");
      continue;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "mermaid";
    wrapper.textContent = code.textContent || "";

    try {
      // Use parentNode.replaceChild for better compatibility
      if (pre.parentNode) {
        pre.parentNode.replaceChild(wrapper, pre);
      } else {
        console.error("[Mermaid] No parent node found");
      }
    } catch (e) {
      console.error("[Mermaid] Failed to replace:", e);
    }
  }

  const mermaidDivs = document.querySelectorAll(".mermaid");

  if (!document.querySelector(".mermaid")) {
    console.warn("[Mermaid] No mermaid divs found, exiting");
    return;
  }

  const run = () => {
    if (!window.mermaid) {
      console.error("[Mermaid] window.mermaid not found!");
      return;
    }
    window.mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
    window.mermaid.run({ querySelector: ".mermaid" });
  };

  if (window.mermaid) {
    run();
    return;
  }

  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
  s.onload = () => {
    run();
  };
  s.onerror = (e) => console.error("[Mermaid] Failed to load library:", e);
  document.head.appendChild(s);
})();
</script>`;

	const withScript = html.includes("</body>")
		? html.replace("</body>", `${script}</body>`)
		: `${html}\n${script}\n`;
	await Bun.write(outputPath, withScript);
}

export async function exportSlides(
	inputPath: string,
	format: "html" | "pdf" | "pptx",
	config: SlidesConfig,
): Promise<string> {
	const distDir = resolve(config.output.dir, "dist");
	await ensureDir(distDir);

	const ext = format === "pptx" ? "pptx" : format;
	const baseName = resolve(inputPath).replace(/\.md$/, "");
	const fileName = baseName.split("/").pop();
	const outputPath = resolve(distDir, `${fileName}.${ext}`);

	const args = [
		"bunx",
		"@marp-team/marp-cli",
		"--no-config",
		"--allow-local-files",
		inputPath,
		"--output",
		outputPath,
	];

	if (format === "html") {
		args.push("--html");
	}

	const proc = Bun.spawn(args, {
		stdout: "inherit",
		stderr: "inherit",
	});

	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		throw new Error(`Marp CLI exited with code ${exitCode}`);
	}

	if (format === "html" && config.content.mermaidDiagrams) {
		await enableMermaidInHtml(outputPath);
	}

	return outputPath;
}
