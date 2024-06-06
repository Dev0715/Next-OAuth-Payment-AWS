"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/utils/form-error";

import { GradientButton } from "@/components/utils/gradient-button";
import { SelectAccountsSchema } from "@/schemas/auth/register";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type SelectedAccounts = SignedUpData["selectedAccounts"];

type Props = {
  data: SelectedAccounts;
  onUpdate: (data: Partial<SignedUpData>) => void;
  onNext: () => void;
};

export function SelectAccountsForm({ data, onUpdate, onNext }: Props) {
  const [isErr, setErr] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SelectAccountsSchema>>({
    resolver: zodResolver(SelectAccountsSchema),
    defaultValues: data
  });

  const onSubmit = (values: z.infer<typeof SelectAccountsSchema>) => {
    if (!values.creator && !values.user && !values.affiliate) {
      setErr(true);
    } else {
      onUpdate({ selectedAccounts: values });
      onNext();
    }
  };

  return (
    <div className="w-[480px] m-auto">
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Creator Account</FormLabel>
                  <FormDescription>
                    ** You can create creator&apos;s account **
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">User Account</FormLabel>
                  <FormDescription>
                    ** You can create general user&apos;s account **
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="affiliate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Affiliate Account</FormLabel>
                  <FormDescription>
                    ** You can create affiliate user&apos;s account **
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isErr ? (
            <FormError message="Please select at least one account type to create!" />
          ) : null}

          <div className="!mt-8 text-center">
            <GradientButton type="submit" className="gap-x-4">
              Next
              <FaArrowRight />
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
