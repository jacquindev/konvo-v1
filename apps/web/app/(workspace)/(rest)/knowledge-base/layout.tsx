import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";
import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { Protect } from "@clerk/nextjs";
import { LibraryBigIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={LibraryBigIcon}
        title="Knowledge Base"
        description="Upload and manage documents for your AI assistants."
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
