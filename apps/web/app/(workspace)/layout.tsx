import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrgGuard } from "@/modules/auth/ui/components/org-guard";
import { WorkspaceLayout } from "@/modules/workspace/ui/layouts/workspace-layout";
import { JotaiProvider } from "@/providers/jotai-provider";
import { cookies } from "next/headers";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <OrgGuard>
        <JotaiProvider>
          <WorkspaceLayout defaultOpen={defaultOpen}>
            {children}
          </WorkspaceLayout>
        </JotaiProvider>
      </OrgGuard>
    </AuthGuard>
  );
};

export default Layout;
