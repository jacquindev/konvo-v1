"use client";

import {
  CodeBlock,
  CodeBlockCopyButton,
} from "@repo/ui/components/ai-elements/code-block";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { toast } from "sonner";

interface IntegrationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippet: string;
  title?: string;
}

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
  title = "Configure your website",
}: IntegrationsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-card/60 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Follow the following steps to integrate the chatbox to your website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-hidden">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code
            </div>
            <div>
              <CodeBlock
                code={snippet}
                language="html"
                showLineNumbers={false}
                className="overflow-y-auto overflow-x-auto shadow-2xs rounded-md"
              >
                <CodeBlockCopyButton
                  onCopy={() => {
                    toast.success("Copied to clipboard.");
                  }}
                  onError={() => {
                    toast.error("Failed to copy to clipboard.");
                  }}
                />
              </CodeBlock>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code into your website
            </div>
            <p className="text-muted-foreground text-sm">
              Paste the chatbox code above in your page. You can add it in the
              HTML head section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
