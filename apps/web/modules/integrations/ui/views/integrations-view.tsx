"use client";

import { INTEGRATIONS } from "@/modules/integrations/lib/constants";
import type { IntegrationId } from "@/modules/integrations/lib/types";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Item, ItemActions, ItemContent } from "@repo/ui/components/ui/item";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { createScript } from "../../lib/utils";
import { IntegrationsDialog } from "../components/integrations-dialog";

export const IntegrationsView = () => {
  const { organization } = useOrganization();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snippet, setSnippet] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const script = createScript(integrationId, organization.id);
    setSnippet(script);
    setDialogOpen(true);
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={snippet}
      />
      <div className="mt-8">
        <Item className="bg-card shadow-sm rounded-lg h-20" variant="outline">
          <Label htmlFor="organization-id">Organization ID</Label>
          <ItemContent>
            <Input
              readOnly
              disabled
              id="organization-id"
              value={organization?.id || ""}
              placeholder={organization?.id || ""}
              className="font-mono text-sm"
            />
          </ItemContent>
          <ItemActions>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  <CopyIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Copy</TooltipContent>
            </Tooltip>
          </ItemActions>
        </Item>

        <Separator className="mx-auto my-8" />

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Pick Your Framework</h3>
            <p className="text-base text-muted-foreground">
              Start by selecting your framework of choice. Then add the
              following code to your website to enable the chatbox.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((item) => (
              <Button
                key={item.id}
                size={null}
                variant="outline"
                className="flex items-center justify-start gap-4 p-4 shadow-sm bg-card"
                onClick={() => handleIntegrationClick(item.id)}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="drop-shadow-md object-cover"
                />
                <Label>{item.title}</Label>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
