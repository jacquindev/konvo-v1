import { Vapi, VapiClient } from "@vapi-ai/server-sdk";
import { ConvexError } from "convex/values";
import { internal } from "../_generated/api";
import { privateAction } from "../lib/privateUtils";
import { getSecretValue, parseSecretString } from "../lib/secrets";

async function getVapiClient(ctx: any) {
  const plugin = await ctx.runQuery(
    internal.system.plugins.getByServiceAndOrganizationId,
    {
      organizationId: ctx.orgId,
      service: "vapi",
    }
  );

  if (!plugin) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Plugin not found",
    });
  }

  const secretName = plugin.secretName;
  const secretValue = await getSecretValue(secretName);

  const secretData = parseSecretString<{
    privateApiKey: string;
    publicApiKey: string;
  }>(secretValue);

  if (!secretData) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Credentials not found",
    });
  }

  if (!secretData.privateApiKey || !secretData.publicApiKey) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Credentials incomplete. Please reconnect your Vapi account.",
    });
  }

  return new VapiClient({
    token: secretData.privateApiKey,
  });
}

export const getPhoneNumbers = privateAction({
  args: {},
  async handler(ctx): Promise<Vapi.ListPhoneNumbersResponseItem[]> {
    const vapiClient = await getVapiClient(ctx);
    const phoneNumbers = await vapiClient.phoneNumbers.list();

    return phoneNumbers;
  },
});

export const getAssistants = privateAction({
  args: {},
  async handler(ctx): Promise<Vapi.Assistant[]> {
    const vapiClient = await getVapiClient(ctx);
    const assistants = await vapiClient.assistants.list();

    if (assistants.length === 0) {
      return [];
    }
    return assistants;
  },
});
