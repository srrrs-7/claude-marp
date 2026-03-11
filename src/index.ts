#!/usr/bin/env bun
import { parseArgs } from "./cli/commands.js";

parseArgs(process.argv.slice(2)).catch((err: unknown) => {
	console.error(err instanceof Error ? err.message : String(err));
	process.exit(1);
});
