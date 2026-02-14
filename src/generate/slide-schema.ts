import { z } from "zod";

export const slideContentSchema = z.object({
	title: z.string().describe("Slide title"),
	content: z
		.array(z.string())
		.describe("Bullet points or text content for the slide"),
	code: z.string().optional().describe("Optional code block content"),
	codeLanguage: z
		.string()
		.optional()
		.describe("Programming language for the code block"),
	speakerNotes: z.string().optional().describe("Speaker notes for this slide"),
	layout: z
		.enum(["default", "center", "section"])
		.optional()
		.describe("Slide layout directive"),
});

export const generationResultSchema = z.object({
	slides: z
		.array(slideContentSchema)
		.min(1)
		.describe("Array of slide contents"),
});

export type SlideContent = z.infer<typeof slideContentSchema>;
export type GenerationResult = z.infer<typeof generationResultSchema>;
