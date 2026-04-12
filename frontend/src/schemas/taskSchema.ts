import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional()
});

export type taskSchemaType = z.infer<typeof taskSchema>;