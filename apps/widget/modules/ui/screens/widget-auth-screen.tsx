"use client";

import { useAuthScreen } from "@/modules/hooks/use-auth-screen";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { ArrowRightIcon } from "lucide-react";
import { WidgetHeader } from "../components/widget-header";

export const WidgetAuthScreen = () => {
  const { form, onSubmit, isSubmitting } = useAuthScreen();

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Tell us some more about you.</p>
        </div>
      </WidgetHeader>

      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-y-4 p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="What's your name?"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="What's your email address?"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="group h-10 w-full hover:scale-102 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
