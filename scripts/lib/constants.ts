/**
 * Shared constants for slide quality thresholds and configuration.
 *
 * Single source of truth for all magic numbers used across:
 *   - scripts/lib/quality.ts
 *   - scripts/validate-slides-schema.ts
 *   - scripts/stats.ts
 *   - scripts/rebuild-all-slides.ts
 */

// ---------------------------------------------------------------------------
// Reading speed (chars/minute)
// ---------------------------------------------------------------------------

/** Japanese reading speed (characters per minute). */
export const READING_SPEED_JA = 350;

/** English reading speed (characters per minute). */
export const READING_SPEED_EN = 200;

// ---------------------------------------------------------------------------
// Quality grade thresholds (score = SVG×40 + assertive×40 + subtitle×20)
// ---------------------------------------------------------------------------

/** Minimum score for grade A. */
export const GRADE_A_MIN = 70;

/** Minimum score for grade B. */
export const GRADE_B_MIN = 50;

/** Minimum score for grade C. */
export const GRADE_C_MIN = 30;

// ---------------------------------------------------------------------------
// Quality target ratios
// ---------------------------------------------------------------------------

/** Target minimum SVG coverage ratio (figure-first principle). */
export const SVG_TARGET_RATIO = 0.5;

/** Target minimum assertive title ratio (Google/Amazon standard). */
export const ASSERTIVE_TARGET_RATIO = 0.6;

/** Minimum subtitle ratio considered "good". */
export const SUBTITLE_GOOD_RATIO = 0.3;

// ---------------------------------------------------------------------------
// Per-slide constraints
// ---------------------------------------------------------------------------

/** Maximum recommended characters per bullet point (Japanese ~50, English ~80). */
export const MAX_BULLET_CHARS = 60;

/** Minimum number of bullets on a content slide before subtitle is encouraged. */
export const SUBTITLE_BULLET_THRESHOLD = 4;

/** Number of consecutive text-only slides before a warning is emitted. */
export const CONSECUTIVE_TEXT_LIMIT = 3;

// ---------------------------------------------------------------------------
// Rebuild configuration
// ---------------------------------------------------------------------------

/** Number of concurrent render jobs in the parallel rebuild phase. */
export const RENDER_PARALLEL = 8;
