"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";

import { checkGeneralDetails } from "@/actions/auth/register/check-general-details";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { GeneralDetailsSchema } from "@/schemas/auth/register";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
};

export const GeneralDetailsForm = ({
  userData,
  setUserData,
  moveStepForward
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isError, setError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const form = useForm<z.infer<typeof GeneralDetailsSchema>>({
    resolver: zodResolver(GeneralDetailsSchema),
    defaultValues: {
      ...userData.generalDetails
    }
  });

  const onSubmit = (values: z.infer<typeof GeneralDetailsSchema>) => {
    startTransition(() => {
      checkGeneralDetails({
        username: values.username,
        email: values.email
      }).then((data) => {
        if (data.success) {
          setUserData({ ...userData, generalDetails: { ...values } });
          // setUserData({ ...userData, generalDetails: { ...values, avatar } });
          moveStepForward();
        } else {
          setErrMsg(data.error as string);
          setError(true);
        }
      });
    });
  };

  return (
    <div className="w-[480px] m-auto">
      <p className="mb-6 text-xl text-green-700">
        1. Please provide your general details.
      </p>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="firstname"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="lastname"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Username*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="username"
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
              <FormItem className="col-span-2">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="username@mail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="col-span-2 mt-4"
          >
            <FaArrowRight />
            Next
          </Button>
        </form>
      </Form>
      <ConfirmAlert
        open={isError}
        title="Error"
        message={errMsg}
        onOK={() => setError(false)}
      />
    </div>
  );
};
