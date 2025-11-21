import { z } from "zod";

export const FileUploadSchema = z.object({});

export type FileUploadSchemaValues = z.infer<typeof FileUploadSchema>;
