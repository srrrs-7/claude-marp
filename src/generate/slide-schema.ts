import { z } from "zod";

export const slideContentSchema = z.object({
	title: z.string(),
	subtitle: z
		.string()
		.optional()
		.describe(
			"One-line key message / BLUF (Bottom Line Up Front). State the 'so what' — the assertive conclusion the audience should take away. Rendered as a callout below the title.",
		),
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
