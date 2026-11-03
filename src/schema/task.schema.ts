import * as z from "zod";

export const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
