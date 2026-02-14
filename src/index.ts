#!/usr/bin/env bun
import { parseArgs } from "./cli/commands.js";

parseArgs(process.argv.slice(2));
