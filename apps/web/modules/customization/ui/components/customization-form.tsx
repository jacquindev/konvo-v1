"use client";

import { useCustomizationForm } from "@/modules/customization/hooks/use-customization-view";
import { WidgetSettings } from "@/modules/customization/lib/types";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/modules/plugins/hooks/use-vapi";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Separator } from "@repo/ui/components/ui/separator";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { BotIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

export const CustomizationForm = ({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) => {
  const { form, onSubmit, isSubmitting } = useCustomizationForm(initialData);

  const { data: assistants, isLoading: loadingAssistants } =
    useVapiAssistants(hasVapiPlugin);
  const { data: phoneNumbers, isLoading: loadingPhoneNumbers } =
    useVapiPhoneNumbers(hasVapiPlugin);

  const suggestions = [
    {
      value: "suggestion1",
      label: "Suggestion 1",
      placeholder: "e.g., How do I get started?",
    },
    {
      value: "suggestion2",
      label: "Suggestion 2",
      placeholder: "e.g., What are your pricing plans?",
    },
    {
      value: "suggestion3",
      label: "Suggestion 3",
      placeholder: "e.g., I need help with my account.",
    },
  ] as const;

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">General Chat Settings</CardTitle>
            <CardDescription>
              Configure basic chat widget behavior and messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-6">
            <FormField
              control={form.control}
              name="greetMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome message shown when chat opens"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The first message customers see when they open the chat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="mx-auto my-10" />

            <FieldGroup>
              <Field>
                <FieldLabel className="text-xl">Default Suggestions</FieldLabel>
                <FieldDescription className="mb-8">
                  Quick reply suggestions shown to customers to help guide the
                  conversation.
                </FieldDescription>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {suggestions.map((item) => (
                    <FormField
                      key={item.value}
                      name={`defaultSuggestions.${item.value}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={item.placeholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {hasVapiPlugin && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Voice Assistant Settings
              </CardTitle>
              <CardDescription>
                Configure voice call features powered by{" "}
                <Link
                  href="https://vapi.ai"
                  target="_blank"
                  className="text-primary font-medium hover:underline hover:underline-offset-2"
                >
                  Vapi
                </Link>
                .
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vapiSettings.assistantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice Assistant</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loadingAssistants || isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full overflow-hidden">
                          <SelectValue
                            placeholder={
                              loadingAssistants
                                ? "Loading assistants..."
                                : "Select an assistant"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        sideOffset={4}
                        side="bottom"
                        className="min-w-56 dark:bg-card/60 backdrop-blur-lg max-h-[200px] overflow-y-auto"
                      >
                        <SelectItem value="none">None</SelectItem>
                        {assistants?.map((assistant) => (
                          <SelectItem key={assistant.id} value={assistant.id}>
                            <BotIcon />
                            <span>
                              {assistant.name || "Unnamed Assistant"}
                            </span>{" "}
                            <span className="text-xs font-mono text-muted-foreground">
                              {assistant.model?.model}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The phone number to use for voice calls.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vapiSettings.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loadingPhoneNumbers || isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full overflow-hidden">
                          <SelectValue
                            placeholder={
                              loadingPhoneNumbers
                                ? "Loading phone numbers..."
                                : "Select a phone number"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        sideOffset={4}
                        side="bottom"
                        className="min-w-56 dark:bg-card/60 backdrop-blur-lg max-h-[200px] overflow-y-auto"
                      >
                        <SelectItem value="none">None</SelectItem>
                        {phoneNumbers?.map((phone) => (
                          <SelectItem
                            key={phone.id}
                            value={phone.number || phone.id}
                          >
                            <PhoneIcon />
                            <span>{phone.number || "Unknown"}</span>{" "}
                            <span className="text-xs text-muted-foreground">
                              {phone.name || "Unnamed"}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The Vapi assistant to use for voice calls.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="shadow-sm hover:scale-102 transition-[transform,box-shadow] duration-300 hover:shadow-md"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
