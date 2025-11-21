import { z } from "zod";

export const WidgetChatSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type WidgetChatSchemaValues = z.infer<typeof WidgetChatSchema>;
