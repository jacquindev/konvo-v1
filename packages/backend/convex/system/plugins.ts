import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const upsert = internalMutation({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
    secretName: v.string(),
  },
  async handler(ctx, args) {
    const existingPlugin = await ctx.db
      .query("plugins")
      .withIndex("by_service_and_organization_id", (q) =>
        q.eq("service", args.service).eq("organizationId", args.organizationId)
      )
      .unique();

    if (existingPlugin) {
      await ctx.db.patch(existingPlugin._id, {
        service: args.service,
        secretName: args.secretName,
      });
    } else {
      await ctx.db.insert("plugins", args);
    }
  },
});

export const getByServiceAndOrganizationId = internalQuery({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("plugins")
      .withIndex("by_service_and_organization_id", (q) =>
        q.eq("service", args.service).eq("organizationId", args.organizationId)
      )
      .unique();
  },
});
