"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CustomerRegisterSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCcStripe, FaPaypal, FaStripe, FaUser } from "react-icons/fa";
import { registerUser } from "@/actions/auth/register-user";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CustomerInterface } from "@/shared/user";
import { getUserById } from "@/data/user/user-by-id";

export default function EditCustomer({ disabled = false }: { disabled?: boolean }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const [customer, setCustomer] = useState<CustomerInterface>();

  const [avatar, setAvatar] = useState<File | null>();
  const [avatarImagePath, setAvatarImagePath] = useState<string | undefined>("");

  const isDisabled = () => {
    return isPending || disabled;
  }

  const form = useForm<z.infer<typeof CustomerRegisterSchema>>({
    resolver: zodResolver(CustomerRegisterSchema),
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

  const onSubmit = (values: z.infer<typeof CustomerRegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      values.avatar = '';

      if (avatar) {
        values.avatar = 'USER_ID' + '.jpg';

        const formData = new FormData();
        formData.append("file", avatar);
        formData.append("keyName", values.avatar);

        axiosClient.post("/upload", formData, axiosConfig)
          .then(res => res.data).then(data => {
            if (data.success) {
              // const res = data.response;
              // const metadata = res.$metadata;
            }
          }).catch(error => {
            console.log("__uploadFile__ERROR", error);
          });
      }

      registerUser(values).then(data => {
        console.log("__registerUser__RESULT", data);
      });
    });
  };

  useEffect(() => {
    if (user) {
      getUserById(user.id).then(data => {
        setCustomer(data);
        form.setValue("username", data.username);
        form.setValue("firstname", data.firstname);
        form.setValue("lastname", data.lastname);
        form.setValue("email", data.email);
        form.setValue("address", data.address);
        form.setValue("phone1", data.phone1);
        form.setValue("phone2", data.phone2);
      });
    }
  }, []);

  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImagePath(URL.createObjectURL(e.target.files[0]));
    }
    setAvatar(e?.target?.files?.[0]);
  }

  return (
    <main className="w-full flex justify-between gap-x-6">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-6">
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
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isDisabled()} type="submit" className="w-64 self-end">
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="w-2/5 flex flex-col gap-y-12">
        <p className="text-2xl font-medium">For First CUSTOMERs!</p>
        <div>
          <p>Be the earliest users to get the latest updates and news from us!</p>
          <p>Early subscribers will get exclusive access to our new features and various benefits.</p>
          <p>We will also give a number of bonuses like $10 off.</p>
          <p>You will have free Launch Package that will have a bundle of free fonts, images, ...</p>
          <p>Join the Discord and follow notifications and news on our channel</p>
        </div>
        <p className="text-2xl font-medium -rotate-3">SUBSCRIBE NOW!</p>
        <div className="w-3/4 flex flex-col self-center gap-y-6">
          <Button variant="outline" disabled={isDisabled()} className="flex gap-x-2 border-green-700">
            <FaPaypal />
            Subscribe with Paypal
          </Button>
          <Button variant="outline" disabled={isDisabled()} className="flex gap-x-2 border-blue-700">
            <FaCcStripe />
            Subscribe with Stripe
          </Button>
        </div>
      </div>
    </main>
  );
}
