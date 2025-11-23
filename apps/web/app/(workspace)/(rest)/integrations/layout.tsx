import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { ZapIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={ZapIcon}
        title="Integrations"
        description="Easily connect Konvo to your website or app with ready-to-use embed scripts."
      />

      {children}
    </>
  );
};

export default Layout;
