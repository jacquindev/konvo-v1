import { ConvexError, v } from "convex/values";
import { privateQuery } from "../lib/privateUtils";

export const getOneByConversationId = privateQuery({
  args: {
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

    return await ctx.db.get(conversation.contactSessionId);
  },
});
