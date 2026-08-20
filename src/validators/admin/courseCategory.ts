import { z } from "zod";

export const createCourseCategorySchema = z.object({
  name:        z.string().min(1, "Name is required"),
  slug:        z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

export const updateCourseCategorySchema = createCourseCategorySchema.partial();

export type CreateCourseCategorySchema = z.infer<typeof createCourseCategorySchema>;
export type UpdateCourseCategorySchema = z.infer<typeof updateCourseCategorySchema>;
