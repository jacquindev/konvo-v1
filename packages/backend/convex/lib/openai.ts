import { createOpenAI } from "@ai-sdk/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in your .env file");
}

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
