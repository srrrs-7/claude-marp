import { resolve } from "node:path";
import { defaultConfigYaml } from "../config/defaults.js";
import { loadConfig } from "../config/loader.js";
import { exportSlides } from "../export/marp.js";
import { renderSlides } from "../generate/pipeline.js";

interface RenderOptions {
	config?: string;
	input?: string;
}

interface ExportOptions {
	config?: string;
	format: "html" | "pdf" | "pptx";
	input?: string;
}

export async function initCommand(): Promise<void> {
	const configPath = resolve("slides.config.yaml");
	const file = Bun.file(configPath);

	if (await file.exists()) {
		console.log("slides.config.yaml already exists. Skipping.");
		return;
	}

	await Bun.write(configPath, defaultConfigYaml);
	console.log("Created slides.config.yaml");
	console.log(
		'Edit the config, then create slides data JSON and run "bun run slides render --in data.json"',
	);
}

export async function renderCommand(options: RenderOptions): Promise<void> {
	const config = await loadConfig(options.config);

	if (!options.input) {
		console.error("Please specify input JSON file with --in <path>");
		console.error(
			"The JSON should match the slide schema: { slides: [{ title, content, ... }] }",
		);
		process.exit(1);
	}

	const result = await renderSlides(options.input, config);
	console.log(`Rendered ${result.data.slides.length} slides.`);
}

export async function exportCommand(options: ExportOptions): Promise<void> {
	const config = await loadConfig(options.config);

	if (!options.input) {
		console.error("Please specify input file with --in <path>");
		process.exit(1);
	}

	await exportSlides(options.input, options.format, config);
}

export function parseArgs(args: string[]): void {
	const command = args[0];

	switch (command) {
		case "init":
			initCommand();
			break;

		case "render": {
			const options: RenderOptions = {};
			for (let i = 1; i < args.length; i++) {
				const arg = args[i];
				if ((arg === "--in" || arg === "--input") && args[i + 1]) {
					options.input = args[++i];
				} else if ((arg === "-c" || arg === "--config") && args[i + 1]) {
					options.config = args[++i];
				}
			}
			renderCommand(options);
			break;
		}

		case "export": {
			const exportOpts: ExportOptions = { format: "html" };
			for (let i = 1; i < args.length; i++) {
				const arg = args[i];
				if ((arg === "--format" || arg === "-f") && args[i + 1]) {
					exportOpts.format = args[++i] as ExportOptions["format"];
				} else if ((arg === "--in" || arg === "--input") && args[i + 1]) {
					exportOpts.input = args[++i];
				} else if ((arg === "-c" || arg === "--config") && args[i + 1]) {
					exportOpts.config = args[++i];
				}
			}
			exportCommand(exportOpts);
			break;
		}

		default:
			printUsage();
	}
}

function printUsage(): void {
	console.log(`
Usage: bun run slides <command> [options]

Commands:
  init                          Create slides.config.yaml template
  render [options]              Render slide data JSON to Marp markdown
  export [options]              Export Marp markdown to HTML/PDF

Render Options:
  --in, --input <path>          Input JSON file (slide data)
  -c, --config <path>           Config file path

Export Options:
  -f, --format <html|pdf|pptx>  Output format (default: html)
  --in, --input <path>          Input Marp markdown file
  -c, --config <path>           Config file path
`);
}
