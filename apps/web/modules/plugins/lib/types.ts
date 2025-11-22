import { api } from "@repo/backend/_generated/api";
import { LucideIcon } from "lucide-react";

export interface PluginFeature {
  icon: LucideIcon;
  label: string;
  description: string;
}

/* Vapi */
export type VapiPhoneNumbers =
  typeof api.private.vapi.getPhoneNumbers._returnType;
export type VapiPhoneNumber = VapiPhoneNumbers[number];

export type UseVapiPhoneNumbers = {
  data: VapiPhoneNumbers;
  isLoading: boolean;
  error: Error | null;
};

export type VapiAssistants = typeof api.private.vapi.getAssistants._returnType;
export type VapiAssistant = VapiAssistants[number];

export type UseVapiAssistants = {
  data: VapiAssistants;
  isLoading: boolean;
  error: Error | null;
};
