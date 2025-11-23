import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { DollarSignIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={DollarSignIcon}
        title="Plans & Billing"
        description="Manage your subscription, billing details, and plan upgrades in one place."
      />

      {children}
    </>
  );
};

export default Layout;
