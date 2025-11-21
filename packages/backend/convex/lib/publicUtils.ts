import {
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const publicMutation = customMutation(mutation, {
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  input: async (ctx, { contactSessionId }) => {
    const session = await ctx.db.get(contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Contact Session",
      });
    }

    return { ctx: { session }, args: { contactSessionId } };
  },
});

export const publicQuery = customQuery(query, {
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  input: async (ctx, { contactSessionId }) => {
    const session = await ctx.db.get(contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Contact Session",
      });
    }

    return { ctx: { session }, args: { contactSessionId } };
  },
});
