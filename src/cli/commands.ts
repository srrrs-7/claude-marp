import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs as parseNodeArgs } from "node:util";
import { z } from "zod";
import { defaultConfigYaml } from "../config/defaults.js";
import { loadConfig } from "../config/loader.js";
import { CONFIG_FILENAME } from "../constants.js";
import { exportSlides } from "../export/marp.js";
import { renderSlides } from "../generate/pipeline.js";
import { ensureDir, slugify } from "../utils/files.js";

const FORMAT_SCHEMA = z.enum(["html", "pdf", "pptx"]);
type Format = z.infer<typeof FORMAT_SCHEMA>;

interface CliOptions {
	config?: string;
	dryRun?: boolean;
	format: Format;
	input?: string;
}

export async function initCommand(): Promise<void> {
	const configPath = resolve(CONFIG_FILENAME);
	const file = Bun.file(configPath);

	if (await file.exists()) {
		console.log(`slides.config.yaml already exists at ${configPath}`);
		return;
	}

	await Bun.write(configPath, defaultConfigYaml);
	console.log(`Created ${configPath}`);
}

export async function renderCommand(
	options: Pick<CliOptions, "config" | "input" | "dryRun">,
): Promise<void> {
	if (!options.input) {
		console.error("Please specify input JSON file with --in <path>");
		console.error(
			"The JSON should match the slide schema: { slides: [{ title, content, ... }] }",
		);
		process.exit(1);
	}
	const config = await loadConfig(options.config);
	await renderSlides(options.input, config, options.dryRun ?? false);
}

export async function exportCommand(options: CliOptions): Promise<void> {
	if (!options.input) {
		console.error("Please specify input file with --in <path>");
		process.exit(1);
	}
	const config = await loadConfig(options.config);
	await exportSlides(
		options.input,
		options.format,
		config,
		options.dryRun ?? false,
	);
}

export async function newCommand(topic: string): Promise<void> {
	if (!topic) {
		console.error("Usage: bun run slides new <topic>");
		process.exit(1);
	}

	// Generate timestamp + slug for directory name
	const now = new Date();
	const ts = now.toISOString().replace(/[-T:]/g, "").slice(0, 14);
	const slug = slugify(topic);
	const dirName = `docs/${ts}_${slug}`;

	const dirPath = resolve(dirName);
	if (existsSync(dirPath)) {
		console.log(`Directory already exists: ${dirPath}`);
		return;
	}

	ensureDir(dirPath);

	// Write config
	const config = defaultConfigYaml.replace(
		'"Your Presentation Topic"',
		JSON.stringify(topic),
	);
	await Bun.write(resolve(dirPath, "slides.config.yaml"), config);

	// Write empty slides-data.json
	const emptyData = JSON.stringify(
		{
			slides: [
				{
					title: topic,
					content: [],
					layout: "center",
				},
			],
		},
		null,
		2,
	);
	await Bun.write(resolve(dirPath, "slides-data.json"), emptyData);

	console.log(`Created: ${dirPath}`);
	console.log(`  - slides.config.yaml`);
	console.log(`  - slides-data.json`);
	console.log(`\nNext steps:`);
	console.log(
		`  bun run slides render -c ${dirPath}/slides.config.yaml --in ${dirPath}/slides-data.json`,
	);
}

export async function parseArgs(args: string[]): Promise<void> {
	const command = args[0];
	const options = parseCliOptions(args.slice(1));

	switch (command) {
		case "init":
			await initCommand();
			break;
		case "new":
			await newCommand(args[1] ?? "");
			break;
		case "render":
			await renderCommand(options);
			break;
		case "export":
			await exportCommand(options);
			break;
		default:
			printUsage();
	}
}

function parseCliOptions(args: string[]): CliOptions {
	const { values } = parseNodeArgs({
		args,
		options: {
			in: { type: "string" },
			input: { type: "string" },
			config: { type: "string", short: "c" },
			format: { type: "string", short: "f" },
			"dry-run": { type: "boolean" },
		},
		strict: false,
	});

	const rawFormat = values.format ?? "html";
	const formatResult = FORMAT_SCHEMA.safeParse(rawFormat);
	if (!formatResult.success) {
		console.error(
			`Invalid format "${rawFormat}". Valid values: html, pdf, pptx`,
		);
		process.exit(1);
	}

	return {
		input:
			(values.in as string | undefined) ?? (values.input as string | undefined),
		config: values.config as string | undefined,
		format: formatResult.data,
		dryRun: values["dry-run"] as boolean | undefined,
	};
}

function printUsage(): void {
	process.stdout.write(`
Usage: bun run slides <command> [options]

Commands:
  init                          Create slides.config.yaml template
  new <topic>                   Create a new presentation scaffold
  render [options]              Render slide data JSON to Marp markdown
  export [options]              Export Marp markdown to HTML/PDF

Render Options:
  --in, --input <path>          Input JSON file (slide data)
  -c, --config <path>           Config file path
  --dry-run                     Preview output path without writing files

Export Options:
  -f, --format <html|pdf|pptx>  Output format (default: html)
  --in, --input <path>          Input Marp markdown file
  -c, --config <path>           Config file path
  --dry-run                     Preview output path without running Marp CLI
`);
}
