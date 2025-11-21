"use client";

import { screenAtom } from "@/modules/lib/atoms";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { HomeIcon, InboxIcon } from "lucide-react";

export const WidgetFooter = () => {
  const screen = useAtomValue(screenAtom);
  const setScreen = useSetAtom(screenAtom);

  return (
    <footer className="flex items-center justify-between border-t">
      <Button
        className="flex-1 h-14 rounded-none"
        variant="secondary"
        onClick={() => setScreen("selection")}
      >
        <HomeIcon
          fill="currentColor"
          fillOpacity={screen === "selection" ? 0.3 : 0}
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>
      <Button
        className="flex-1 h-14 rounded-none"
        variant="secondary"
        onClick={() => setScreen("inbox")}
      >
        <InboxIcon
          fill="currentColor"
          fillOpacity={screen === "inbox" ? 0.3 : 0}
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
};
