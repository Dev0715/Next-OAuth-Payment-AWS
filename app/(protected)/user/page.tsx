"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ProfileSchema } from "@/schemas/user";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Header } from "./_components/header";
import { SwitchBox } from "@/components/utils/switch-box";

export default function Profile() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      isCreator: false,
      isAffiliate: false,
      isCustomer: false,
      username: "",
      bio: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // save the user's profile
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <Header title="Profile" content="This is how others will see you on the site" />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex flex-col">
            <h3 className="mb-4 text-base font-medium">Your roles</h3>
            <div className="w-full grid grid-cols-3 gap-x-6">
              <SwitchBox
                mode="small"
                title="Creator"
                content="You have started journey for a creator"
                isChecked={true}
              />
              <SwitchBox
                mode="small"
                title="Customer"
                content="You joined as a customer"
                isChecked={true}
              />
              <SwitchBox
                mode="small"
                title="Affiliate"
                content="You have started an affiliate's life"
                isChecked={true}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Tell us a little bit about yourself"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit">
            Save Profile
          </Button>
        </form>
      </Form>
    </main >
  );
};