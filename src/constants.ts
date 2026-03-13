/** Shared constants used across the project. */

export const CONFIG_FILENAME = "slides.config.yaml";
export const DATA_FILENAME = "slides-data.json";
export const VALID_LAYOUTS = ["default", "center", "section"] as const;
export type ValidLayout = (typeof VALID_LAYOUTS)[number];
