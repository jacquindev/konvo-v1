import { createThread, type MessageDoc } from "@convex-dev/agent";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { components, internal } from "../_generated/api";
import { publicMutation, publicQuery } from "../lib/publicUtils";
import { supportAgent } from "../system/ai/agents/supportAgent";

export const create = publicMutation({
  args: { organizationId: v.string() },
  async handler(ctx, args) {
    // Refresh the user's session if they are within the threshold
    await ctx.runMutation(internal.system.contactSessions.refresh, {
      contactSessionId: args.contactSessionId,
    });

    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .unique();

    // This thread will be associated with that user and messages will be saved to the user's history
    const threadId = await createThread(ctx, components.agent, {
      userId: args.contactSessionId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId,
      userId: args.contactSessionId,
      message: {
        role: "assistant",
        content:
          widgetSettings?.greetMessage || "Hello, how can I help you today?",
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

export const getOne = publicQuery({
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

export const getMany = publicQuery({
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

        // If there's no thread associated with this conversation, skip fetching messages.
        if (!conversation.threadId) {
          return {
            _id: conversation._id,
            _creationTime: conversation._creationTime,
            status: conversation.status,
            organizationId: conversation.organizationId,
            threadId: conversation.threadId,
            lastMessage,
          };
        }

        try {
          const messages = await supportAgent.listMessages(ctx, {
            threadId: conversation.threadId,
            paginationOpts: { numItems: 1, cursor: null },
          });

          if (messages.page.length > 0) {
            lastMessage = messages.page[0] ?? null;
          }
        } catch (err) {
          // Swallow the error for this conversation so a single failing thread
          // lookup doesn't break the whole page. lastMessage remains null.
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
