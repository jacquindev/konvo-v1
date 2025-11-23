import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
  vapiSecretsAtom,
  widgetSettingsAtom,
} from "@/modules/lib/atoms";
import type { InitStep } from "@/modules/lib/types";
import { api } from "@repo/backend/_generated/api";
import { useAction, useMutation, useQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export const useLoadingScreen = (organizationId: string | null) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setWidgetSettings = useSetAtom(widgetSettingsAtom);
  const setVapiSecrets = useSetAtom(vapiSecretsAtom);

  // Step 1: Validate organization
  const validateOrganization = useAction(api.public.organizations.validate);
  useEffect(() => {
    if (step !== "org") return;

    let cancelled = false;

    setLoadingMessage("Loading organization...");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying organization...");

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          if (cancelled) return;
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });

    return () => {
      cancelled = true;
    };
  }, [
    organizationId,
    setErrorMessage,
    setLoadingMessage,
    setOrganizationId,
    setScreen,
    step,
    validateOrganization,
  ]);

  // Step 2: Validate session
  const validateSession = useMutation(api.public.contactSessions.validate);
  useEffect(() => {
    if (step !== "session") return;

    let cancelled = false;

    setLoadingMessage("Loading session...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("Validating session...");

    validateSession({ contactSessionId })
      .then((result) => {
        if (cancelled) return;
        setSessionValid(result.valid);
        setStep("settings");
      })
      .catch(() => {
        if (cancelled) return;
        setSessionValid(false);
        setStep("settings");
      });

    return () => {
      cancelled = true;
    };
  }, [contactSessionId, setLoadingMessage, step, validateSession]);

  // Step 3: Widget Settings
  const widgetSettings = useQuery(
    api.public.widgetSettings.getByOrganizationId,
    organizationId ? { organizationId } : "skip"
  );
  useEffect(() => {
    if (step !== "settings") return;

    setLoadingMessage("Loading settings...");

    if (widgetSettings !== undefined) {
      setWidgetSettings(widgetSettings);
      setStep("vapi");
    }
  }, [setLoadingMessage, setWidgetSettings, step, widgetSettings]);

  // Step 4: Vapi
  const getVapiSecrets = useAction(api.public.secrets.getVapiSecret);
  useEffect(() => {
    if (step !== "vapi") return;

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }

    let cancelled = false;

    setLoadingMessage("Loading voice call features...");

    getVapiSecrets({ organizationId })
      .then((secrets) => {
        if (cancelled) return;
        setVapiSecrets(secrets);
        setStep("done");
      })
      .catch(() => {
        if (cancelled) return;
        setVapiSecrets(null);
        setStep("done");
      });

    return () => {
      cancelled = true;
    };
  }, [
    getVapiSecrets,
    organizationId,
    setErrorMessage,
    setLoadingMessage,
    setScreen,
    setVapiSecrets,
    step,
  ]);

  // Step 5: Finalize
  useEffect(() => {
    if (step !== "done") return;
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [contactSessionId, sessionValid, setScreen, step]);

  return {
    loadingMessage,
  };
};
