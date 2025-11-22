"use client";

import { useVapiConnect } from "@/modules/plugins/hooks/use-vapi";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { PlugIcon } from "lucide-react";
import Link from "next/link";

interface VapiConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VapiConnectDialog = ({
  open,
  onOpenChange,
}: VapiConnectDialogProps) => {
  const { form, onSubmit, isSubmitting } = useVapiConnect(onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg dark:bg-card/60 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Enable Vapi</DialogTitle>
          <DialogDescription>
            Your API keys are safely encrypted and stored using{" "}
            <Link
              href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
              target="_blank"
              className="font-medium text-primary hover:underline hover:underline-offset-2"
            >
              AWS Secrets Manager
            </Link>
            .
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="privateApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Private API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Vapi private API key"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publicApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Vapi public API key"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="size-4" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <PlugIcon className="size-4" />
                    Connect
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
