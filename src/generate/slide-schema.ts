import { z } from "zod";

export const slideContentSchema = z.object({
	title: z.string(),
	content: z.array(z.string()),
	code: z.string().optional(),
	codeLanguage: z.string().optional(),
	speakerNotes: z.string().optional(),
	layout: z.enum(["default", "center", "section"]).optional(),
});

export const generationResultSchema = z.object({
	slides: z.array(slideContentSchema).min(1),
});

export type SlideContent = z.infer<typeof slideContentSchema>;
export type GenerationResult = z.infer<typeof generationResultSchema>;
