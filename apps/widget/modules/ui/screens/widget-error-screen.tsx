"use client";

import { errorMessageAtom } from "@/modules/lib/atoms";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { useAtomValue } from "jotai";
import { AlertTriangleIcon } from "lucide-react";
import { WidgetHeader } from "../components/widget-header";

export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold text-white">
          <p className="text-3xl">Oops!</p>
          <p className="text-lg">Seems like something went wrong.</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <Empty>
          <EmptyMedia variant="icon">
            <AlertTriangleIcon className="text-destructive/80" />
          </EmptyMedia>
          <EmptyContent>
            <EmptyTitle className="text-destructive">
              An error occurred
            </EmptyTitle>
            <EmptyDescription>
              {errorMessage || "Invalid configuration."}
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      </div>
    </>
  );
};
