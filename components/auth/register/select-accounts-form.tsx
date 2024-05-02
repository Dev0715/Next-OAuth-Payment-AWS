"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
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
import { SignedUpData } from "@/shared/types/signup-data.type";

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
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isErr}
        title="Error"
        message="Please select at least one account type to create!"
        onOK={() => setErr(false)}
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
              type="button"
              variant={"outline"}
              className="w-64 flex gap-x-4 border-red-700"
              onClick={onBackClicked}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button type="submit" className="w-64 flex gap-x-4">
              <FaArrowRight />
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
