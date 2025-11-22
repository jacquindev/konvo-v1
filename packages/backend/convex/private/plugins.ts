import { ConvexError, v } from "convex/values";
import { privateMutation, privateQuery } from "../lib/privateUtils";

export const getOne = privateQuery({
  args: {
    service: v.union(v.literal("vapi")),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("plugins")
      .withIndex("by_service_and_organization_id", (q) =>
        q.eq("service", args.service).eq("organizationId", ctx.orgId)
      )
      .unique();
  },
});

export const remove = privateMutation({
  args: {
    service: v.union(v.literal("vapi")),
  },
  async handler(ctx, args) {
    const existingPlugin = await ctx.db
      .query("plugins")
      .withIndex("by_service_and_organization_id", (q) =>
        q.eq("service", args.service).eq("organizationId", ctx.orgId)
      )
      .unique();

    if (!existingPlugin) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Plugin not found",
      });
    }

    await ctx.db.delete(existingPlugin._id);
  },
});
