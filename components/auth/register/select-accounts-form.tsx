"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SelectAccountsSchema } from "@/schemas/auth/register";
import { Switch } from "@/components/ui/switch";

type Props = {
  defaultData: z.infer<typeof SelectAccountsSchema>;
  onContinue: (values: z.infer<typeof SelectAccountsSchema>) => void;
  onBack: (values: z.infer<typeof SelectAccountsSchema>) => void;
};

export const SelectAccountsForm = ({
  defaultData,
  onContinue,
  onBack
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const form = useForm<z.infer<typeof SelectAccountsSchema>>({
    resolver: zodResolver(SelectAccountsSchema),
    defaultValues: {
      ...defaultData
    }
  });

  const onSubmit = (values: z.infer<typeof SelectAccountsSchema>) => {
    if (!values.creator && !values.user && !values.affiliate) {
      setConfirmOpen(true);
      setConfirmMessage("Please select at least one account type to create!");
    } else {
      onContinue(values);
    }
  };

  const onBackClicked = () => {
    onBack(form.getValues());
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title="Error"
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-xl text-green-700">
        2. Please select accounts you want to create.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="w-full">
            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Creator Account</FormLabel>
                    <FormDescription>
                      ** You can create creator's account **
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
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">User Account</FormLabel>
                    <FormDescription>
                      ** You can create general user's account **
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
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="affiliate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Affiliate Account
                    </FormLabel>
                    <FormDescription>
                      ** You can create affiliate user's account **
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
          </div>
          <div className="w-full flex items-center justify-between mt-4">
            <Button
              disabled={isPending}
              type="button"
              variant={"outline"}
              className="w-64 flex gap-x-4 border-red-700"
              onClick={onBackClicked}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="w-64 flex gap-x-4"
            >
              <FaArrowRight />
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
