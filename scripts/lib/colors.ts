/**
 * Shared ANSI color helpers for CLI output.
 *
 * Respects NO_COLOR env var (https://no-color.org/) and --no-color flag.
 * When disabled, all functions return the input string unchanged.
 */

const colorEnabled =
	!process.env.NO_COLOR &&
	!process.argv.includes("--no-color") &&
	process.stdout.isTTY !== false;

function wrap(code: string, s: string): string {
	return colorEnabled ? `\x1b[${code}m${s}\x1b[0m` : s;
}

export const c = {
	green: (s: string) => wrap("32", s),
	red: (s: string) => wrap("31", s),
	yellow: (s: string) => wrap("33", s),
	blue: (s: string) => wrap("34", s),
	dim: (s: string) => wrap("2", s),
	bold: (s: string) => wrap("1", s),
};
