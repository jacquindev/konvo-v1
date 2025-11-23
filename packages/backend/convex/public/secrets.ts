import { v } from "convex/values";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { getSecretValue, parseSecretString } from "../lib/secrets";

export const getVapiSecret = action({
  args: {
    organizationId: v.string(),
  },
  async handler(ctx, args) {
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByServiceAndOrganizationId,
      {
        service: "vapi",
        organizationId: args.organizationId,
      }
    );

    if (!plugin) return null;

    const secretName = plugin.secretName;
    const secretValue = await getSecretValue(secretName);

    const secretData = parseSecretString<{
      publicApiKey: string;
      privateApiKey: string;
    }>(secretValue);

    if (!secretData || !secretData.privateApiKey || !secretData.publicApiKey) {
      return null;
    }

    return {
      publicApiKey: secretData.publicApiKey,
    };
  },
});
