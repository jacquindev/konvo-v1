import { WidgetSettings } from "@/modules/customization/lib/types";
import {
  CustomizationSchema,
  type CustomizationSchemaValues,
} from "@/modules/customization/schemas/customization.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCustomizationView = () => {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);

  return {
    widgetSettings,
    isLoading: widgetSettings === undefined,
  };
};

export const useCustomizationForm = (initialData?: WidgetSettings | null) => {
  const form = useForm<CustomizationSchemaValues>({
    resolver: zodResolver(CustomizationSchema),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hi! How can I help you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions?.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions?.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions?.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings?.assistantId || "",
        phoneNumber: initialData?.vapiSettings?.phoneNumber || "",
      },
    },
  });

  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const onSubmit = async (values: CustomizationSchemaValues) => {
    try {
      const vapiSettings: WidgetSettings["vapiSettings"] = {
        assistantId:
          values.vapiSettings.assistantId === "none"
            ? ""
            : values.vapiSettings.assistantId,
        phoneNumber:
          values.vapiSettings.phoneNumber === "none"
            ? ""
            : values.vapiSettings.phoneNumber,
      };

      await upsertWidgetSettings({
        ...values,
        vapiSettings,
      });

      toast.success("Widget settings updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error || error instanceof ConvexError
          ? error.message
          : "Failed to upsert widget settings";
      toast.error(errorMessage);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
