import { z } from "zod";

export const createCourseSchema = z.object({
  name:        z.string().min(1, "Course name is required"),
  slug:        z.string().min(1, "Slug is required"),
  duration:    z.number({ error: "Duration is required" }).positive("Duration must be positive"),
  mode:        z.enum(["Online", "Offline"], { error: "Mode is required" }),
  image:       z.string().optional(),
  description: z.string().optional(),
  price:       z.number({ error: "Price is required" }).min(0, "Price must be 0 or more"),
  instructorId: z.number({ error: "Instructor is required" }).int().positive("Instructor is required"),
  language:    z.string().min(1, "Language is required"),
  courseType:  z.enum(["Mindlyftai", "IIT"], { error: "Course type is required" }),
  discount:     z.number().min(0, "Discount must be 0 or more").max(100, "Discount cannot exceed 100%").optional(),
  category:     z.string().optional(),
  displayOrder: z.number().int().min(0).optional(),
  accessMonths: z.number().int().positive("Access months must be positive").optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;
