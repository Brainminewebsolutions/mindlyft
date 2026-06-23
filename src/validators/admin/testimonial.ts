import { z } from "zod";

export const createTestimonialSchema = z.object({
  type:        z.enum(["text", "video"]),
  name:        z.string().min(1, "Name is required").max(100, "Max 100 characters"),
  designation: z.string().max(80,  "Max 80 characters").optional(),
  quote:       z.string().max(150, "Max 150 characters").optional(),
  review:      z.string().max(500, "Max 500 characters").optional(),
  rating:      z.number().int().min(1).max(5),
  tag:         z.string().max(40,  "Max 40 characters").optional(),
  accent:      z.string().optional(),
  status:      z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  order:       z.number().int().min(0).default(0),
});

export const updateTestimonialSchema = z.object({
  type:        z.enum(["text", "video"]).optional(),
  name:        z.string().min(1).max(100, "Max 100 characters").optional(),
  designation: z.string().max(80,  "Max 80 characters").optional(),
  quote:       z.string().max(150, "Max 150 characters").optional(),
  review:      z.string().max(500, "Max 500 characters").optional(),
  rating:      z.number().int().min(1).max(5).optional(),
  tag:         z.string().max(40,  "Max 40 characters").optional(),
  accent:      z.string().optional(),
  status:      z.enum(["ACTIVE", "INACTIVE"]).optional(),
  order:       z.number().int().min(0).optional(),
});

export type CreateTestimonialSchema = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialSchema = z.infer<typeof updateTestimonialSchema>;
