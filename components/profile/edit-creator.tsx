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
import { CreatorRegisterSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { registerCreator } from "@/actions/register-creator";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { LinkedSites } from "./linked-sites";
import { Textarea } from "../ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserById } from "@/data/user";
import { CreatorInterface } from "@/shared/user";

export default function EditCreator({ disabled = false }: { disabled?: boolean }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const [creator, setCreator] = useState<CreatorInterface>();

  const [avatar, setAvatar] = useState<File | null>();
  const [avatarImagePath, setAvatarImagePath] = useState<string | undefined>("");

  const [cover, setCover] = useState<File | null>();
  const [coverImagePath, setCoverImagePath] = useState<string | undefined>("");

  const isDisabled = () => {
    return isPending || disabled;
  }

  const typeOfUsers = [
    "UI/UX Designer",
    "Web Designer",
    "Web Developer",
    "Project Manger"
  ];

  const form = useForm<z.infer<typeof CreatorRegisterSchema>>({
    resolver: zodResolver(CreatorRegisterSchema),
    defaultValues: {
      username: "temp",
      firstname: "temp",
      lastname: "temp",
      email: "temp@gmail.com",
      typeOfUser: typeOfUsers[0],
      address: "temp",
      phone1: "temp",
      phone2: "temp",
    }
  });

  const onSubmit = (values: z.infer<typeof CreatorRegisterSchema>) => {
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

      registerCreator(values).then(data => {
        console.log("__registerCreator__RESULT", data);
      })
    });
  };

  useEffect(() => {
    if (user) {
      getUserById(user.id).then(data => {
        setCreator(data);
      });
    }
  }, []);

  const onAgreeScrap = (checked: boolean) => {
    console.log("AGREE SCRAP", checked);
  }

  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImagePath(URL.createObjectURL(e.target.files[0]));
    }
    setAvatar(e?.target?.files?.[0]);
  }

  const onCoverChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImagePath(URL.createObjectURL(e.target.files[0]));
    }
    setCover(e?.target?.files?.[0]);
  }

  return (
    <main className="w-full flex justify-between">
      <div className="w-1/2 flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <Button asChild variant="link">
            <Link href="/">
              Accept our standard Legal Agreements
            </Link>
          </Button>
          <Switch disabled={isDisabled()} onCheckedChange={onAgreeScrap} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end gap-y-6">
            <div className="w-full flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-4">
                <FormLabel>Cover Image & Avatar</FormLabel>
                <Avatar className="w-full h-28 rounded-none">
                  <AvatarImage src={coverImagePath} className="object-cover" />
                  <AvatarFallback className="bg-sky-500">
                    <div className="w-full h-full bg-inherit"></div>
                  </AvatarFallback>
                </Avatar>
                <Input disabled={isDisabled()} type="file" accept="image/*" onChange={onCoverChanged} />
              </div>
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
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea disabled={isDisabled()} placeholder="JohnDoe1234" {...field} />
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
                name="typeOfUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of User</FormLabel>
                    <Select disabled={isDisabled()} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select what you join for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOfUsers.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isDisabled()} className="w-64" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-2/5 flex flex-col gap-y-6">
        <p className="text-xl font-medium">Confirm your profiles on other Creative markets</p>
        <LinkedSites disabled={isDisabled()} />
      </div>
    </main>
  );
}
