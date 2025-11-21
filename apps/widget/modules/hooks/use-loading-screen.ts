import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/lib/atoms";
import type { InitStep } from "@/modules/lib/types";
import { api } from "@repo/backend/_generated/api";
import { useAction, useMutation } from "convex/react";
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

  // Step 1: Validate organization
  const validateOrganization = useAction(api.public.organizations.validate);
  useEffect(() => {
    if (step !== "org") return;

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
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });
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

    setLoadingMessage("Loading session...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("Validating session...");

    validateSession({ contactSessionId })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [contactSessionId, setLoadingMessage, step, validateSession]);

  // Step 3: Widget Settings

  // Step 4: Finalize
  useEffect(() => {
    if (step !== "done") return;
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [contactSessionId, sessionValid, setScreen, step]);

  return {
    loadingMessage,
  };
};
