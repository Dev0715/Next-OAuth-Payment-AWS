"use client";

import { useRef, useState, useTransition } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Header } from "./_components/header";
import { RoleSwitchBox } from "@/components/utils/role-switch-box";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GeneralDetailsSchema } from "@/schemas/auth/register";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

export default function Profile() {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();

  const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);
  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarPath(URL.createObjectURL(e.target.files[0]));
      setAvatar(e?.target?.files?.[0]);
    }
  };

  const form = useForm<z.infer<typeof GeneralDetailsSchema>>({
    resolver: zodResolver(GeneralDetailsSchema),
    defaultValues: {
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password
    }
  });

  const onSubmit = (values: z.infer<typeof GeneralDetailsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // save the user's profile
      console.log(values);
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <Header
        title="General Profile"
        content="You can see your roles opened here"
      />
      <Separator />
      <div className="w-full flex flex-col gap-y-4">
        <h3 className="text-base font-medium">Your roles opened</h3>
        <div className="w-1/2 grid grid-cols-3 gap-x-6">
          <RoleSwitchBox
            title="Creator"
            isChecked={user?.creator?.isCreator || false}
          />
          <RoleSwitchBox
            title="Customer"
            isChecked={user?.customer?.isCustomer || false}
          />
          <RoleSwitchBox
            title="Affiliate"
            isChecked={user?.affiliate?.isAffiliate || false}
          />
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col gap-y-6"
        >
          <div className="w-full flex items-end gap-x-6">
            <div className="w-1/2 flex flex-col items-start gap-y-4">
              <FormLabel>Avatar Image</FormLabel>
              <div className="flex items-end gap-x-6">
                <Avatar className="w-24 h-24 rounded-sm">
                  <AvatarImage src={avatarPath} />
                  <AvatarFallback className="bg-sky-500 rounded-sm">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  disabled={isPending}
                  type="button"
                  variant={"outline"}
                  size={"sm"}
                  className="rounded-none"
                  onClick={() => hiddenAvatarFileInput.current?.click()}
                >
                  Upload New
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={hiddenAvatarFileInput}
                  onChange={onAvatarChanged}
                />
              </div>
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="johndoe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex gap-x-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
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
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
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
            </div>
          </div>
          <div className="w-full flex gap-x-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-64 self-end">
            Save Profile
          </Button>
        </form>
      </Form>
    </main>
  );
}
