"use client";

import { useVapiView } from "@/modules/plugins/hooks/use-vapi";
import { vapiFeatures } from "@/modules/plugins/lib/vapi-config";
import { PluginCard } from "../components/plugin-card";
import {
  VapiConnectDialog,
  VapiDisconnectDialog,
} from "../components/vapi-dialog";
import { VapiConnectedView } from "./vapi-connected-view";

export const VapiView = () => {
  const {
    vapiPlugin,
    disabled,
    connectOpen,
    setConnectOpen,
    removeOpen,
    setRemoveOpen,
    handleSubmit: toggleConnection,
  } = useVapiView();

  return (
    <>
      <VapiConnectDialog open={connectOpen} onOpenChange={setConnectOpen} />
      <VapiDisconnectDialog open={removeOpen} onOpenChange={setRemoveOpen} />
      <div className="mt-10">
        {vapiPlugin ? (
          <VapiConnectedView onDisconnect={toggleConnection} />
        ) : (
          <PluginCard
            serviceName="Vapi"
            serviceImage="/vapi.jpg"
            serviceImageClassName="dark:invert"
            features={vapiFeatures}
            disabled={disabled}
            onSubmit={toggleConnection}
            learnMoreUrl="https://docs.vapi.ai/quickstart/introduction"
          />
        )}
      </div>
    </>
  );
};
