import { z } from "zod";

export const ConversationSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type ConversationSchemaValues = z.infer<typeof ConversationSchema>;
