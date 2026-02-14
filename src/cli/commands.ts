import { resolve } from "node:path";
import { defaultConfigYaml } from "../config/defaults.js";
import { loadConfig } from "../config/loader.js";
import { exportSlides } from "../export/marp.js";
import { renderSlides } from "../generate/pipeline.js";

type Format = "html" | "pdf" | "pptx";

interface CliOptions {
	config?: string;
	format: Format;
	input?: string;
}

export async function initCommand(): Promise<void> {
	const configPath = resolve("slides.config.yaml");
	const file = Bun.file(configPath);

	if (await file.exists()) {
		return;
	}

	await Bun.write(configPath, defaultConfigYaml);
}

export async function renderCommand(
	options: Pick<CliOptions, "config" | "input">,
): Promise<void> {
	const input =
		options.input ??
		exitWithError(
			"Please specify input JSON file with --in <path>",
			"The JSON should match the slide schema: { slides: [{ title, content, ... }] }",
		);
	const config = await loadConfig(options.config);
	await renderSlides(input, config);
}

export async function exportCommand(options: CliOptions): Promise<void> {
	const input =
		options.input ??
		exitWithError("Please specify input file with --in <path>");
	const config = await loadConfig(options.config);
	await exportSlides(input, options.format, config);
}

export function parseArgs(args: string[]): void {
	const command = args[0];
	const options = parseCliOptions(args.slice(1));

	switch (command) {
		case "init":
			initCommand();
			break;
		case "render":
			renderCommand(options);
			break;
		case "export":
			exportCommand(options);
			break;
		default:
			printUsage();
	}
}

function parseCliOptions(args: string[]): CliOptions {
	const options: CliOptions = { format: "html" };

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		const value = args[i + 1];
		if (!value) {
			continue;
		}

		switch (arg) {
			case "--in":
			case "--input":
				options.input = value;
				i++;
				break;
			case "-c":
			case "--config":
				options.config = value;
				i++;
				break;
			case "-f":
			case "--format":
				options.format = value as Format;
				i++;
				break;
		}
	}

	return options;
}

function exitWithError(...messages: string[]): never {
	for (const message of messages) {
		console.error(message);
	}
	process.exit(1);
}

function printUsage(): void {
	process.stdout.write(`
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
