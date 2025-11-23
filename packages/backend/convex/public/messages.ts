import { saveMessage } from "@convex-dev/agent";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { components, internal } from "../_generated/api";
import { action } from "../_generated/server";
import { publicQuery } from "../lib/publicUtils";
import { supportAgent } from "../system/ai/agents/supportAgent";
import { escalateConversation } from "../system/ai/tools/escalateConversation";
import { resolveConversation } from "../system/ai/tools/resolveConversation";
import { search } from "../system/ai/tools/search";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  async handler(ctx, args) {
    const contactSession = await ctx.runQuery(
      internal.system.contactSessions.getOne,
      { contactSessionId: args.contactSessionId }
    );

    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Contact Session",
      });
    }

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: args.threadId }
    );

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });
    }

    // TODO: Implement subscription check

    const shouldTriggerAgent = conversation.status === "unresolved";

    if (shouldTriggerAgent) {
      try {
        await supportAgent.generateText(
          ctx,
          {
            threadId: args.threadId,
            userId: conversation.contactSessionId,
          },
          {
            prompt: args.prompt,
            tools: {
              resolveConversation,
              escalateConversation,
              search,
            },
            experimental_telemetry: {
              isEnabled: true,
              recordInputs: true,
              recordOutputs: true,
            },
          }
        );
      } catch (err) {
        // Surface a clearer error to the caller so it's easier to debug
        throw new ConvexError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Agent generation failed: ${String(err)}`,
        });
      }
    } else {
      await saveMessage(ctx, components.agent, {
        threadId: args.threadId,
        userId: conversation.contactSessionId,
        prompt: args.prompt,
      });
    }
  },
});

export const getMany = publicQuery({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  async handler(ctx, args) {
    return await supportAgent.listMessages(ctx, args);
  },
});
