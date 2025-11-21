import { createTool } from "@convex-dev/agent";
import { generateText } from "ai";
import { z } from "zod";
import { internal } from "../../../_generated/api";
import { openai } from "../../../lib/openai";
import { SEARCH_INTERPRETER_PROMPT } from "../../../lib/prompts";
import { supportAgent } from "../agents/supportAgent";
import rag from "../rag";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information to help answer user questions",
  args: z.object({
    query: z.string().describe("The search query to find relevant information"),
  }),
  async handler(ctx, args) {
    if (!ctx.threadId) return "Missing thread ID";

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: ctx.threadId }
    );

    if (!conversation) {
      return "Conversation not found";
    }

    const searchResult = await rag.search(ctx, {
      namespace: conversation.organizationId,
      query: args.query,
      limit: 5,
    });

    const searchResultEntry = searchResult.entries
      .map((e) => e.title || null)
      .filter((t) => t !== null)
      .join(", ");

    const contextText = `Found results in ${searchResultEntry}. Here is the context:\n\n${searchResult.text}`;

    const response = await generateText({
      model: openai.chat("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: SEARCH_INTERPRETER_PROMPT,
        },
        {
          role: "user",
          content: `User asked: "${args.query}"\n\nSearch results: ${contextText}`,
        },
      ],
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      userId: ctx.userId,
      message: {
        role: "assistant",
        content: response.text,
      },
    });

    return response.text;
  },
});
