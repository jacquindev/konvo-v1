import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
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

      {children}
    </>
  );
};

export default Layout;
