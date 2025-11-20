import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrgGuard } from "@/modules/auth/ui/components/org-guard";
import { WorkspaceLayout } from "@/modules/workspace/ui/layouts/workspace-layout";
import { cookies } from "next/headers";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <OrgGuard>
        <WorkspaceLayout defaultOpen={defaultOpen}>{children}</WorkspaceLayout>
      </OrgGuard>
    </AuthGuard>
  );
};

export default Layout;
