import { z } from "zod";

export const createBlogCategorySchema = z.object({
  name:        z.string().min(1, "Name is required"),
  slug:        z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

export const updateBlogCategorySchema = createBlogCategorySchema.partial();

export type CreateBlogCategorySchema = z.infer<typeof createBlogCategorySchema>;
export type UpdateBlogCategorySchema = z.infer<typeof updateBlogCategorySchema>;
