"use client";

import { useVapiView } from "@/modules/plugins/hooks/use-vapi";
import {
  GlobeIcon,
  PhoneCallIcon,
  PhoneIcon,
  WorkflowIcon,
} from "lucide-react";
import { PluginCard, PluginFeature } from "../components/plugin-card";
import { VapiConnectDialog } from "../components/vapi-dialog";

const vapiFeatures: PluginFeature[] = [
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

export const VapiView = () => {
  const {
    vapiPlugin,
    disabled,
    connectOpen,
    setConnectOpen,
    removeOpen,
    setRemoveOpen,
    handleSubmit,
  } = useVapiView();

  return (
    <>
      <VapiConnectDialog open={connectOpen} onOpenChange={setConnectOpen} />
      <div className="mt-10">
        <PluginCard
          serviceName="Vapi"
          serviceImage="/vapi.jpg"
          serviceImageClassName="dark:invert"
          features={vapiFeatures}
          disabled={disabled}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
