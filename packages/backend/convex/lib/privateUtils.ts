import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { ConvexError } from "convex/values";
import { action, mutation, query } from "../_generated/server";

export const privateQuery = customQuery(
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

    return { identity, orgId };
  })
);

export const privateMutation = customMutation(
  mutation,
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

    return { identity, orgId };
  })
);

export const privateAction = customAction(
  action,
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

    return { identity, orgId };
  })
);
