/**
 * Standard exit codes for CLI scripts.
 *
 * Usage:
 *   process.exit(EXIT.SUCCESS);
 *   process.exit(EXIT.ERROR);
 */
export const EXIT = {
	/** Completed successfully with no issues. */
	SUCCESS: 0,
	/** Runtime or validation error — operation could not complete. */
	ERROR: 1,
	/** Quality warnings only — operation completed but issues were found. */
	WARNINGS: 2,
} as const;
