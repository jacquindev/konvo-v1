import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { openai } from "../../../lib/openai";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You are a customer support agent.",
});
