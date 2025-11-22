import {
  VapiConnectSchema,
  type VapiConnectSchemaValues,
} from "@/modules/plugins/schemas/vapi.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useVapiView = () => {
  const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });

  const [connectOpen, setConnectOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const handleSubmit = () => {
    if (vapiPlugin) {
      setRemoveOpen(true);
    } else {
      setConnectOpen(true);
    }
  };

  return {
    vapiPlugin,
    disabled: vapiPlugin === undefined,
    connectOpen,
    setConnectOpen,
    removeOpen,
    setRemoveOpen,
    handleSubmit,
  };
};

export const useVapiConnect = (onOpenChange: (open: boolean) => void) => {
  const form = useForm<VapiConnectSchemaValues>({
    resolver: zodResolver(VapiConnectSchema),
    defaultValues: {
      privateApiKey: "",
      publicApiKey: "",
    },
  });

  const upsertSecret = useMutation(api.private.secrets.upsert);

  const onSubmit = async (values: VapiConnectSchemaValues) => {
    try {
      await upsertSecret({
        service: "vapi",
        value: {
          privateApiKey: values.privateApiKey,
          publicApiKey: values.publicApiKey,
        },
      });
      onOpenChange(false);
      toast.success("Connected to Vapi successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to connect to Vapi";
      toast.error(errorMessage);
    }
  };

  return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
};
