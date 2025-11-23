"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  ArrowRight,
  BookOpenIcon,
  BotIcon,
  GemIcon,
  MicIcon,
  PaletteIcon,
  PhoneIcon,
  Users2Icon,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "Intelligent automated responses 24/7",
  },
  {
    icon: MicIcon,
    label: "AI Voice Agent",
    description: "Natural voice conversations with customers",
  },
  {
    icon: PhoneIcon,
    label: "Phone System",
    description: "Inbound & Outbound calling capabilities",
  },
  {
    icon: BookOpenIcon,
    label: "Knowledge Base",
    description: "Train your AI based on documentation",
  },
  {
    icon: Users2Icon,
    label: "Team Access",
    description: "Up to 5 operators per organization",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance",
  },
];

export const PremiumFeatureOverlay = ({
  children,
}: PremiumFeatureOverlayProps) => {
  const router = useRouter();

  return (
    <div className="mt-10">
      <div className="size-full relative">
        <div className="pointer-events-none select-none blur-[2px]">
          {children}
        </div>

        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />

        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 top-15">
          <Card className="w-full max-w-lg drop-shadow-md shadow-lg dark:bg-card/60 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center">
                <div className="mb-2 inline-flex size-12 items-center justify-center rounded-full bg-accent">
                  <GemIcon className="size-6 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl">Premium Access</CardTitle>
              <CardDescription className="max-w-sm mx-auto">
                You must have a Premium subscription to access this feature.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="space-y-2 h-[325px]">
                {features.map((feature) => (
                  <Item key={feature.label}>
                    <ItemMedia variant="icon">
                      <feature.icon className="shrink-0 text-muted-foreground size-4" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{feature.label}</ItemTitle>
                      <ItemDescription className="text-sm leading-tight">
                        {feature.description}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </ScrollArea>

              <Button
                type="button"
                size="lg"
                className="w-full group transition-all duration-300"
                onClick={() => {
                  router.push("/billing");
                }}
              >
                View Plans
                <ArrowRight className="group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
