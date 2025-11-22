"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  BotIcon,
  PaletteIcon,
  PhoneIcon,
  SettingsIcon,
  UnplugIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  VapiAssistantsTab,
  VapiPhoneNumbersTab,
} from "../components/vapi-tabs";

interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

type VapiTabs = "phone-numbers" | "ai-assistants";

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState<VapiTabs>("phone-numbers");

  return (
    <div className="space-y-6">
      <Item variant="outline" className="bg-card shadow-xs py-6 rounded-lg">
        <ItemMedia variant="image" className="size-12 rounded">
          <Image
            src="/vapi.jpg"
            alt="Vapi"
            width={48}
            height={48}
            className="rounded-lg object-contain dark:invert"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-lg leading-snug font-semibold">
            Vapi Integration
          </ItemTitle>
          <ItemDescription className="leading-tight">
            Manage your Vapi phone numbers and AI assistants.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="destructive"
            onClick={onDisconnect}
            className="hover:scale-102 transition-all duration-300 hover:shadow-md"
          >
            <UnplugIcon className="size-4 shrink-0" />
            Disconnect
          </Button>
        </ItemActions>
      </Item>

      <Item variant="outline" className="bg-card shadow-xs py-6 rounded-lg">
        <ItemMedia variant="icon" className="size-12 rounded">
          <SettingsIcon className="size-7" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-lg leading-snug font-semibold">
            Widget Configuration
          </ItemTitle>
          <ItemDescription className="leading-tight">
            Set up voice calls for your chat widget.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            asChild
            className="hover:scale-102 transition-all duration-300 hover:shadow-md"
          >
            <Link href="/customization">
              <PaletteIcon className="size-4 shrink-0" />
              Configure
            </Link>
          </Button>
        </ItemActions>
      </Item>

      <Separator className="mx-auto" />

      <div className="overflow-hidden rounded-lg border bg-background">
        <Tabs
          defaultValue="phone-numbers"
          onValueChange={(value) => setActiveTab(value as VapiTabs)}
          value={activeTab}
          className="size-full"
        >
          <TabsList className="grid grid-cols-2 w-full min-w-0">
            <TabsTrigger value="phone-numbers">
              <PhoneIcon /> Phone Numbers
            </TabsTrigger>
            <TabsTrigger value="ai-assistants">
              <BotIcon /> AI Assistants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone-numbers">
            <VapiPhoneNumbersTab />
          </TabsContent>

          <TabsContent value="ai-assistants">
            <VapiAssistantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
