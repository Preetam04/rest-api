import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional(),
});
