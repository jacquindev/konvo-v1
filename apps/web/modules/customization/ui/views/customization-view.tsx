"use client";

import { useCustomizationView } from "@/modules/customization/hooks/use-customization-view";
import { useVapiView } from "@/modules/plugins/hooks/use-vapi";
import { LoadingView } from "@repo/ui/components/custom/loading-view";
import { CustomizationForm } from "../components/customization-form";

export const CustomizationView = () => {
  const { widgetSettings, isLoading } = useCustomizationView();
  const { vapiPlugin, disabled: loadingVapi } = useVapiView();

  if (isLoading || loadingVapi) {
    return (
      <div className="size-full flex flex-col items-center justify-center p-8 mt-10">
        <LoadingView />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <CustomizationForm
        initialData={widgetSettings}
        hasVapiPlugin={!!vapiPlugin}
      />
    </div>
  );
};
