import { ConvexError, v } from "convex/values";
import { privateMutation, privateQuery } from "../lib/privateUtils";

export const getOne = privateQuery({
  args: {},
  async handler(ctx) {
    return await ctx.db
      .query("widgetSettings")
      .withIndex("by_organization_id", (q) => q.eq("organizationId", ctx.orgId))
      .unique();
  },
});

export const upsert = privateMutation({
  args: {
    greetMessage: v.string(),
    defaultSuggestions: v.object({
      suggestion1: v.optional(v.string()),
      suggestion2: v.optional(v.string()),
      suggestion3: v.optional(v.string()),
    }),
    vapiSettings: v.object({
      assistantId: v.optional(v.string()),
      phoneNumber: v.optional(v.string()),
    }),
  },
  async handler(ctx, args) {
    const existingSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organization_id", (q) => q.eq("organizationId", ctx.orgId))
      .unique();

    if (existingSettings) {
      await ctx.db.patch(existingSettings._id, args);
    } else {
      const subscription = await ctx.db
        .query("subscriptions")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", ctx.orgId)
        )
        .unique();

      if (subscription?.status !== "active") {
        throw new ConvexError({
          code: "BAD_REQUEST",
          message: "Active subscription is required for this feature",
        });
      }

      await ctx.db.insert("widgetSettings", {
        organizationId: ctx.orgId,
        ...args,
      });
    }
  },
});
