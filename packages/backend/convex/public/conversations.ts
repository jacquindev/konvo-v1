import { createThread } from "@convex-dev/agent";
import { ConvexError, v } from "convex/values";
import { components } from "../_generated/api";
import {
  contactSessionMutation,
  contactSessionQuery,
} from "../lib/publicUtils";
import { supportAgent } from "../system/ai/agents/supportAgent";

export const create = contactSessionMutation({
  args: { organizationId: v.string() },
  async handler(ctx, args) {
    // This thread will be associated with that user and messages will be saved to the user's history
    const threadId = await createThread(ctx, components.agent, {
      userId: args.contactSessionId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId,
      message: {
        role: "assistant",
        // TODO: Modify this to widget settings' initial message
        content: "Hello, how can I help you today?",
      },
    });

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: ctx.session._id,
      status: "unresolved",
      organizationId: args.organizationId,
      threadId,
    });

    return conversationId;
  },
});

export const getOne = contactSessionQuery({
  args: { conversationId: v.id("conversations") },
  async handler(ctx, args) {
    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});
