"use client";

import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/modules/plugins/hooks/use-vapi";
import { DataTable } from "@repo/ui/components/custom/data-table";
import { Badge } from "@repo/ui/components/ui/badge";
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { BotIcon, CheckCircleIcon, PhoneIcon, XCircleIcon } from "lucide-react";

// ---------------------------------------
// Phone Numbers Tab
// ---------------------------------------

export const VapiPhoneNumbersTab = () => {
  const { data: phoneNumbers, isLoading, error } = useVapiPhoneNumbers();

  if (error) {
    return <div>Error phone numbers: {error.message}</div>;
  }

  return (
    <DataTable
      columns={["Phone Numbers", "Name", "Status"]}
      data={phoneNumbers}
      isLoading={isLoading}
      loadingText="Loading phone numbers..."
      emptyText="No phone numbers configured."
      renderRow={(phone) => (
        <TableRow key={phone.id}>
          <TableCell className="px-6 py-4">
            <div className="flex items-center gap-3">
              <PhoneIcon className="size-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                {phone.number || "Unknown"}
              </span>
            </div>
          </TableCell>

          <TableCell className="px-6 py-4">
            {phone.name || "Unlabeled"}
          </TableCell>

          <TableCell className="px-6 py-4">
            <Badge
              variant={phone.status === "active" ? "default" : "destructive"}
              className="capitalize"
            >
              {phone.status === "active" ? (
                <CheckCircleIcon className="size-4 mr-1 stroke-3" />
              ) : (
                <XCircleIcon className="size-4 mr-1 stroke-3" />
              )}
              {phone.status || "Unknown"}
            </Badge>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

// ---------------------------------------
// Assistants Tab
// ---------------------------------------

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading, error } = useVapiAssistants();

  if (error) {
    return <div>Error loading assistants: {error.message}</div>;
  }

  return (
    <DataTable
      columns={["Name", "Model", "First Message"]}
      data={assistants}
      isLoading={isLoading}
      loadingText="Loading assistants..."
      emptyText="No assistants configured."
      renderRow={(assistant) => (
        <TableRow key={assistant.id}>
          <TableCell className="px-6 py-4">
            <div className="flex items-center gap-3">
              <BotIcon className="size-4 text-muted-foreground" />
              <span>{assistant.name || "Unnamed Assistant"}</span>
            </div>
          </TableCell>

          <TableCell className="px-6 py-4">
            <Badge variant="secondary">
              <span className="text-sm font-mono">
                {assistant.model?.model || "Not configured"}
              </span>
            </Badge>
          </TableCell>

          <TableCell className="px-6 py-4 max-w-xs">
            <p className="truncate text-muted-foreground text-sm">
              {assistant.firstMessage || "No greeting configured"}
            </p>
          </TableCell>
        </TableRow>
      )}
    />
  );
};
