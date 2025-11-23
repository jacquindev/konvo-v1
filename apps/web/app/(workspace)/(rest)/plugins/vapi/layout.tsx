import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";
import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { Protect } from "@clerk/nextjs";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={"/vapi.jpg"}
        iconClassName="dark:invert"
        title="Vapi Voice Assistant"
        description="Connect Vapi to enable AI-powered voice calls and automated phone support for your customers."
      />
      <Protect
        condition={(has) => has({ plan: "pro" })}
        fallback={<PremiumFeatureOverlay>{children}</PremiumFeatureOverlay>}
      >
        {children}
      </Protect>
    </>
  );
};

export default Layout;
