import { v } from "convex/values";
import { internal } from "../_generated/api";
import { privateMutation } from "../lib/privateUtils";

export const upsert = privateMutation({
  args: {
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  async handler(ctx, args) {
    // TODO: Check for subscription

    await ctx.scheduler.runAfter(0, internal.system.secrets.upsert, {
      service: args.service,
      value: args.value,
      organizationId: ctx.orgId,
    });
  },
});
