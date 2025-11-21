import { saveMessage } from "@convex-dev/agent";
import { generateText } from "ai";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { components } from "../_generated/api";
import { openai } from "../lib/openai";
import {
  privateAction,
  privateMutation,
  privateQuery,
} from "../lib/privateUtils";
import { OPERATOR_MESSAGE_ENHANCEMENT_PROMPT } from "../lib/prompts";
import { supportAgent } from "../system/ai/agents/supportAgent";

export const getMany = privateQuery({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  async handler(ctx, args) {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    if (conversation.organizationId !== ctx.orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization Id",
      });
    }

    return await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
  },
});

export const create = privateMutation({
  args: {
    prompt: v.string(),
    conversationId: v.id("conversations"),
  },
  async handler(ctx, args) {
    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    if (conversation.organizationId !== ctx.orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization ID",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });
    }

    if (conversation.status === "unresolved") {
      await ctx.db.patch(args.conversationId, { status: "escalated" });
    }

    await saveMessage(ctx, components.agent, {
      threadId: conversation.threadId,
      userId: conversation.contactSessionId,
      agentName: ctx.identity.name,
      message: {
        role: "assistant",
        content: args.prompt,
      },
    });
  },
});

export const enhanceResponse = privateAction({
  args: {
    prompt: v.string(),
  },
  async handler(ctx, args) {
    const response = await generateText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: OPERATOR_MESSAGE_ENHANCEMENT_PROMPT,
        },
        {
          role: "user",
          content: args.prompt,
        },
      ],
      temperature: 0,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return response.text;
  },
});
