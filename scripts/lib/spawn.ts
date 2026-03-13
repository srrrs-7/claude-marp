import { resolve } from "node:path";

export interface SpawnResult {
	code: number;
	out: string;
	err: string;
}

/** Spawn a command, capture stdout/stderr, return result. */
export async function run(
	cmd: string[],
	options?: { cwd?: string; timeoutMs?: number },
): Promise<SpawnResult> {
	const proc = Bun.spawn(cmd, {
		stdout: "pipe",
		stderr: "pipe",
		cwd: options?.cwd ?? resolve("."),
	});

	const timeoutHandle =
		options?.timeoutMs != null
			? setTimeout(() => proc.kill("SIGTERM"), options.timeoutMs)
			: null;

	const [out, err, code] = await Promise.all([
		new Response(proc.stdout).text(),
		new Response(proc.stderr).text(),
		proc.exited,
	]);

	if (timeoutHandle !== null) clearTimeout(timeoutHandle);

	return { code, out, err };
}
