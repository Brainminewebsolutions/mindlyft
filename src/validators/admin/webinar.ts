import { z } from "zod";

export const createWebinarSchema = z.object({
  name:             z.string().min(1, "Name is required"),
  slug:             z.string().min(1, "Slug is required"),
  duration:         z.number({ error: "Duration is required" }).positive("Must be positive"),
  mode:             z.enum(["Online", "Offline"], { error: "Mode is required" }),
  description:      z.string().optional(),
  price:            z.number().min(0).optional(),
  instructor:       z.string().min(1, "Instructor is required"),
  language:         z.string().min(1, "Language is required"),
  subscriptionType: z.enum(["Free", "Paid"], { error: "Subscription type is required" }),
  status:           z.enum(["Active", "Inactive", "Pending", "Upcoming"], { error: "Status is required" }),
  discount:         z.number().min(0).max(100).optional(),
  type:             z.enum(["Workshop", "Webinar"], { error: "Type is required" }),
  category:         z.string().optional(),
  date:             z.string().min(1, "Date is required"),
  time:             z.string().min(1, "Time is required"),
  link:             z.string().url("Must be a valid URL").optional().or(z.literal("")),
  address:          z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.subscriptionType === "Paid" && (data.price === undefined || data.price === null)) {
    ctx.addIssue({ code: "custom", message: "Price is required for paid sessions", path: ["price"] });
  }
});

export type CreateWebinarSchema = z.infer<typeof createWebinarSchema>;
