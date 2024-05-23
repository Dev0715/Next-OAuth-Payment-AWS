"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { FormError } from "@/components/utils/form-error";
import { GeneralDetailsSchema } from "@/schemas/auth/register";

type Props = {
  onSubmit: (data: z.infer<typeof GeneralDetailsSchema>) => void;
};

export const GeneralDetailsForm = ({ onSubmit }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState<string>("");

  const form = useForm<z.infer<typeof GeneralDetailsSchema>>({
    resolver: zodResolver(GeneralDetailsSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof GeneralDetailsSchema>) => {
    startTransition(() => {
      checkGeneralDetails({
        username: values.username,
        email: values.email
      }).then((data) => {
        if (data.success) {
          onSubmit(values);
        } else {
          setErrMsg(data.error as string);
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
          onSubmit={form.handleSubmit(handleSubmit)}
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

          {errMsg ? <FormError message={errMsg} /> : null}
        </form>
      </Form>
    </div>
  );
};
