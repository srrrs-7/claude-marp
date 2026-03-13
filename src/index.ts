#!/usr/bin/env bun
import { parseArgs } from "./cli/commands.js";

process.on("unhandledRejection", (reason: unknown) => {
	console.error(
		"Unhandled rejection:",
		reason instanceof Error ? reason.message : String(reason),
	);
	process.exit(1);
});

parseArgs(process.argv.slice(2)).catch((err: unknown) => {
	console.error(err instanceof Error ? err.message : String(err));
	process.exit(1);
});
