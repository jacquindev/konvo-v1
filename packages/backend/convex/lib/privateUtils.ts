import { customCtx, customQuery } from "convex-helpers/server/customFunctions";
import { ConvexError } from "convex/values";
import { query } from "../_generated/server";

export const identityQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }

    const orgId = identity.organization_id;

    if (!orgId || typeof orgId !== "string") {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User does not belong to an organization",
      });
    }

    return { orgId };
  })
);
