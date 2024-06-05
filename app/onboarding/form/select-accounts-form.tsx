"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { SelectAccountsSchema } from "@/schemas/auth/register";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const SelectAccountsForm = ({
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const [isErr, setErr] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SelectAccountsSchema>>({
    resolver: zodResolver(SelectAccountsSchema),
    defaultValues: {
      ...userData.selectedAccounts
    }
  });

  const onSubmit = (values: z.infer<typeof SelectAccountsSchema>) => {
    if (!values.creator && !values.user && !values.affiliate) {
      setErr(true);
    } else {
      setUserData({ ...userData, selectedAccounts: values });
      moveStepForward();
    }
  };

  const onBackClicked = () => {
    setUserData({ ...userData, selectedAccounts: form.getValues() });
    moveStepBackward();
  };

  return (
    <div className="w-[480px] m-auto">
      <p className="mb-6 text-xl text-green-700">
        2. Please select accounts you want to create.
      </p>
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
          <div className="!mt-8 flex justify-between items-center">
            <Button
              type="button"
              className="gap-x-4 border-red-700"
              variant="outline"
              onClick={onBackClicked}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button type="submit" className="gap-x-4">
              Next
              <FaArrowRight />
            </Button>
          </div>

          {isErr ? (
            <FormError message="Please select at least one account type to create!" />
          ) : null}
        </form>
      </Form>
    </div>
  );
};
