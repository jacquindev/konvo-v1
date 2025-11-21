"use client";

import { useLoadingScreen } from "@/modules/hooks/use-loading-screen";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { WidgetHeader } from "../components/widget-header";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const { loadingMessage } = useLoadingScreen(organizationId);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold">
          <p className="text-3xl">Hi there 👋</p>
          <p className="text-lg">Let&apos;s get started!</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <Empty>
          <EmptyMedia variant="icon">
            <Spinner className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyContent>
            <EmptyTitle>This will only take a few seconds</EmptyTitle>
            <EmptyDescription>
              {loadingMessage || "Loading..."}
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      </div>
    </>
  );
};
