import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { openai } from "../../../lib/openai";
import { SUPPORT_AGENT_PROMPT } from "../../../lib/prompts";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: SUPPORT_AGENT_PROMPT,
});
