"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "../../app/profile/_components/navbar";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { UserRegisterSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { registerUser } from "@/actions/register-user";

export default function EditCustomer({ disabled = false }: { disabled?: boolean }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [avatar, setAvatar] = useState<File | null>();
  const [avatarImagePath, setAvatarImagePath] = useState<string | undefined>("");

  const isDisabled = () => {
    return isPending || disabled;
  }

  const form = useForm<z.infer<typeof UserRegisterSchema>>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      username: "temp",
      firstname: "temp",
      lastname: "temp",
      email: "temp@gmail.com",
      address: "temp",
      phone1: "temp",
      phone2: "temp",
    }
  });

  const onSubmit = (values: z.infer<typeof UserRegisterSchema>) => {
    setError("");
    setSuccess("");

    console.log("FORM VALUES", values);

    startTransition(() => {
      if (avatar) {
        console.log("__onSubmit__FILE__SELECTED");

        const formData = new FormData();
        formData.append("file", avatar);

        fetch("/api/upload", {
          method: "POST",
          body: formData
        }).then(res => res.json()).then(data => {
          console.log("__upload__RESULT", data);

          values.image = data.filePath;
          registerUser(values).then(data => {
            console.log("__registerUser__RESULT", data);
          })
        });
      }
    });
  };

  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImagePath(URL.createObjectURL(e.target.files[0]));
    }
    setAvatar(e?.target?.files?.[0]);
  }

  return (
    <main className="w-full flex flex-col gap-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex gap-x-12">
            <div className="w-1/2 flex flex-col gap-y-6">
              <div className="flex items-end space-x-4">
                <Avatar className="w-24 h-24 rounded-xl">
                  <AvatarImage src={avatarImagePath} />
                  <AvatarFallback className="bg-sky-500">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <Input disabled={isDisabled()} type="file" accept="image/*" onChange={onAvatarChanged} />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled()} placeholder="JohnDoe1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input disabled={isDisabled()} placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input disabled={isDisabled()} placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isDisabled()}
                        placeholder="username@yemail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled()} placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number 1</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled()} placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number 2</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled()} placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2 space-y-4">
              <p>Be the earliest users to get the latest updates and news from us.</p>
              <p>Early subscribers will get exclusive access to our new features and various benefits.</p>
              <p>We will also give a number of bonuses like $10 off.</p>
              <p>You will have free Launch Package that will have a bundle of free fonts, images, ...</p>
              <p>Join the Discord and follow notifications and news on our channel</p>
              <div className="flex flex-col gap-y-4">
                <Button disabled={isDisabled()}>
                  Subscribe
                </Button>
                <Button disabled={isDisabled()}>
                  Paypal
                </Button>
                <Button disabled={isDisabled()}>
                  Stripe
                </Button>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isDisabled()} type="submit">
            Register
          </Button>
        </form>
      </Form>
    </main>
  );
}
