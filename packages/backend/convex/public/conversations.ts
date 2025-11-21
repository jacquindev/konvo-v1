import { createThread, type MessageDoc } from "@convex-dev/agent";
import { paginationOptsValidator } from "convex/server";
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

export const getMany = contactSessionQuery({
  args: { paginationOpts: paginationOptsValidator },
  async handler(ctx, args) {
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_contact_session_id", (q) =>
        q.eq("contactSessionId", args.contactSessionId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    const conversationWithLastMessage = await Promise.all(
      conversations.page.map(async (conversation) => {
        let lastMessage: MessageDoc | null = null;

        const messages = await supportAgent.listMessages(ctx, {
          threadId: conversation.threadId,
          paginationOpts: { numItems: 1, cursor: null },
        });

        if (messages.page.length > 0) {
          lastMessage = messages.page[0] ?? null;
        }

        return {
          _id: conversation._id,
          _creationTime: conversation._creationTime,
          status: conversation.status,
          organizationId: conversation.organizationId,
          threadId: conversation.threadId,
          lastMessage,
        };
      })
    );

    return {
      ...conversations,
      page: conversationWithLastMessage,
    };
  },
});
