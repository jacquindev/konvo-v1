import type {
  UseVapiAssistants,
  UseVapiPhoneNumbers,
  VapiAssistants,
  VapiPhoneNumbers,
} from "@/modules/plugins/lib/types";
import {
  VapiConnectSchema,
  type VapiConnectSchemaValues,
} from "@/modules/plugins/schemas/vapi.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import { useAction, useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useEffect, useState } from "react";
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
      form.reset();
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

export const useVapiDisconnect = (onOpenChange: (open: boolean) => void) => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const disconnect = useMutation(api.private.plugins.remove);

  const onDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnect({ service: "vapi" });
      onOpenChange(false);
      toast.success("Vapi disconnected successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to disconnect from Vapi. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return {
    onDisconnect,
    isDisconnecting,
  };
};

export const useVapiPhoneNumbers = (
  hasVapiPlugin: boolean
): UseVapiPhoneNumbers => {
  const [data, setData] = useState<VapiPhoneNumbers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasVapiPlugin) {
        setIsLoading(false);
        setData([]);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        const result = await getPhoneNumbers();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch phone numbers from Vapi");
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };

    fetchData();
  }, [getPhoneNumbers, hasVapiPlugin]);

  return { data, isLoading, error };
};

export const useVapiAssistants = (
  hasVapiPlugin: boolean
): UseVapiAssistants => {
  const [data, setData] = useState<VapiAssistants>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getAssistants = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasVapiPlugin) {
        setIsLoading(false);
        setData([]);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        const result = await getAssistants();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch phone numbers from Vapi");
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };

    fetchData();
  }, [getAssistants, hasVapiPlugin]);

  return { data, isLoading, error };
};
