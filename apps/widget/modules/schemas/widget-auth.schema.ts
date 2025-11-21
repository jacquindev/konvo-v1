import { z } from "zod";

export const WidgetAuthSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

export type WidgetAuthSchemaValues = z.infer<typeof WidgetAuthSchema>;
