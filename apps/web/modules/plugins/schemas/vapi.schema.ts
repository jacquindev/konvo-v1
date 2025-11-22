import { z } from "zod";

export const VapiConnectSchema = z.object({
  privateApiKey: z.string().trim().min(1, "Vapi Private API Key is required"),
  publicApiKey: z.string().trim().min(1, "Vapi Public API Key is required"),
});

export type VapiConnectSchemaValues = z.infer<typeof VapiConnectSchema>;
