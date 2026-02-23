import { z } from "zod";

export const slidesConfigSchema = z.object({
	topic: z.string().min(1, "topic is required"),
	audience: z.string().default("general"),
	goal: z.string().default(""),
	language: z.string().default("ja"),
	slides: z
		.object({
			count: z.number().int().min(1).max(200).default(10),
			includeTableOfContents: z.boolean().default(true),
			includeTitleSlide: z.boolean().default(true),
			includeSummarySlide: z.boolean().default(true),
		})
		.default({}),
	marp: z
		.object({
			theme: z.enum(["gaia", "default", "uncover"]).default("gaia"),
			size: z.string().default("16:9"),
			paginate: z.boolean().default(true),
			header: z.string().default(""),
			footer: z.string().default(""),
			style: z.string().default(""),
		})
		.default({}),
	content: z
		.object({
			codeBlocks: z.boolean().default(true),
			codeLanguage: z.string().default("typescript"),
			bulletPointsMax: z.number().int().min(1).max(10).default(5),
			speakerNotes: z.boolean().default(true),
		})
		.default({}),
	output: z
		.object({
			dir: z.string().default("./docs"),
			baseName: z.string().default(""),
		})
		.default({}),
});

export type SlidesConfig = z.infer<typeof slidesConfigSchema>;
