import { z } from "zod";

export const createEmployeeSchema = z.object({
  name:        z.string().min(1, "Name is required"),
  email:       z.union([z.email("Valid email required"), z.literal("")]).optional(),
  phone:       z.string().optional(),
  category:    z.string().optional(),
  department:  z.string().optional(),
  designation: z.string().optional(),
  description:  z.string().optional(),
  displayOrder: z.number().int().min(0).optional(),
  password:    z.union([
    z.string().min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[0-9]/, "At least 1 number"),
    z.literal(""),
  ]).optional(),
});

export const updateEmployeeSchema = z.object({
  name:        z.string().min(1).optional(),
  email:       z.email().optional(),
  phone:       z.string().optional(),
  category:    z.string().optional(),
  department:  z.string().optional(),
  designation: z.string().optional(),
  description:  z.string().optional(),
  displayOrder: z.number().int().min(0).optional(),
  password:    z.union([z.string().min(8), z.literal("")]).optional(),
  status:      z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;
