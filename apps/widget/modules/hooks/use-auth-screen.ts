import {
  contactSessionIdAtomFamily,
  organizationIdAtom,
  screenAtom,
} from "@/modules/lib/atoms";
import {
  WidgetAuthSchema,
  type WidgetAuthSchemaValues,
} from "@/modules/schemas/widget-auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import type { Doc } from "@repo/backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

export const useAuthScreen = () => {
  const organizationId = useAtomValue(organizationIdAtom);

  const setScreen = useSetAtom(screenAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const form = useForm<WidgetAuthSchemaValues>({
    resolver: zodResolver(WidgetAuthSchema),
    defaultValues: { name: "", email: "" },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);

  const onSubmit = async (values: WidgetAuthSchemaValues) => {
    if (!organizationId) return;

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      metadata,
      organizationId,
    });

    setContactSessionId(contactSessionId);
    setScreen("selection");
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
