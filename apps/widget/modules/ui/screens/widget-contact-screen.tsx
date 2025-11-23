"use client";

import { screenAtom, widgetSettingsAtom } from "@/modules/lib/atoms";
import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { useAtomValue, useSetAtom } from "jotai";
import {
  ArrowLeftIcon,
  CheckIcon,
  CopyIcon,
  MenuIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WidgetHeader } from "../components/widget-header";

export const WidgetContactScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!phoneNumber) return;

    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <WidgetHeader className="h-16">
        <div className="flex flex-row justify-between z-80">
          <div className="flex items-center gap-x-2">
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 group"
              onClick={() => setScreen("selection")}
            >
              <ArrowLeftIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <Label className="text-white">Contact Us</Label>
          </div>
          <div className="flex items-center gap-x-2">
            <Button size="icon-sm" variant="ghost" className="size-7 group">
              <MenuIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <ThemeToggle
              className="size-7 bg-transparent border-none"
              iconClassName="text-zinc-300 group-hover:text-foreground"
            />
          </div>
        </div>
      </WidgetHeader>

      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <div className="flexx items-center justify-center rounded-full border p-3 bg-muted">
          <PhoneIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Available 24/7</p>
        <p className="font-bold text-2xl">{phoneNumber}</p>
      </div>

      <div className="border-t bg-muted p-4 rounded-b-2xl">
        <div className="flex flex-col items-center gap-y-2">
          <Button
            className="w-full"
            onClick={handleCopy}
            size="lg"
            variant="outline"
          >
            {copied ? (
              <>
                <CheckIcon className="size-4" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="size-4" />
                Copy Number
              </>
            )}
          </Button>
          <Button asChild className="w-full" size="lg">
            <Link href={`tel:${phoneNumber}`}>
              <PhoneIcon />
              Call Now
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};
