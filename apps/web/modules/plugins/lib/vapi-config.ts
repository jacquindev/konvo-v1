import {
  GlobeIcon,
  PhoneCallIcon,
  PhoneIcon,
  WorkflowIcon,
} from "lucide-react";
import type { PluginFeature } from "./types";

export const vapiFeatures: PluginFeature[] = [
  {
    icon: GlobeIcon,
    label: "Web Voice Calls",
    description: "Enable real-time AI voice conversations inside your app.",
  },
  {
    icon: PhoneIcon,
    label: "Dedicated Phone Numbers",
    description:
      "Provision business phone numbers for inbound and outbound calls.",
  },
  {
    icon: PhoneCallIcon,
    label: "AI Outbound Calls",
    description:
      "Automate customer outreach and follow-ups with AI-driven calls.",
  },
  {
    icon: WorkflowIcon,
    label: "Custom Workflows",
    description:
      "Design tailored voice flows and automate call handling logic.",
  },
];
