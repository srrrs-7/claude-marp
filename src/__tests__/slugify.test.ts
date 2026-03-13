import { describe, expect, test } from "bun:test";
import { slugify } from "../utils/files.js";

describe("slugify", () => {
	test("converts to lowercase", () => {
		expect(slugify("Hello World")).toBe("hello-world");
	});

	test("replaces spaces with hyphens", () => {
		expect(slugify("foo bar baz")).toBe("foo-bar-baz");
	});

	test("removes special characters", () => {
		expect(slugify("Hello—World!")).toMatch(/^hello.*world$/);
	});

	test("truncates to max 60 chars", () => {
		const long = "a".repeat(80);
		expect(slugify(long).length).toBeLessThanOrEqual(60);
	});

	test("handles Japanese text", () => {
		const result = slugify("AIエージェント入門");
		expect(result.length).toBeGreaterThan(0);
		expect(result.length).toBeLessThanOrEqual(60);
	});
});
