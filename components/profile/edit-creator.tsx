"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CreatorSettingsSchema } from "@/schemas/auth/auth";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { registerCreator } from "@/actions/auth/register-creator";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { LinkedSites } from "./linked-sites";
import { Textarea } from "../ui/textarea";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { getUserById } from "@/data/user";
import { JOB_TITLES } from "@/shared/constants/user.constant";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";

export default function EditCreator({
  disabled = false
}: {
  disabled?: boolean;
}) {
  const [user] = useAtom(userAtom);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const [cover, setCover] = useState<File>();
  const [coverImagePath, setCoverImagePath] = useState<string>();

  useEffect(() => {
    if (user?.creator?.cover) {
      getLinkFromS3(user.creator.cover).then((res) => {
        if (res.success) {
          setCoverImagePath(res.response as string);
        }
      });
    }
  }, []);

  const hiddenCoverFileIniput = useRef<HTMLInputElement>(null);
  const onCoverChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImagePath(URL.createObjectURL(e.target.files[0]));
      setCover(e?.target?.files?.[0]);
    }
  };

  const isDisabled = useMemo(() => {
    return isPending || disabled;
  }, [isPending, disabled]);

  const form = useForm<z.infer<typeof CreatorSettingsSchema>>({
    resolver: zodResolver(CreatorSettingsSchema),
    defaultValues: {
      cover: user?.creator?.bio,
      username: user?.username,
      email: user?.email,
      bio: user?.creator?.bio,
      jobTitle: user?.creator?.jobTitle,
      companyTitle: user?.creator?.company?.name,
      companyCountry: user?.creator?.company?.country,
      companyWebsite: user?.creator?.company?.website,
      website1: user?.creator?.websites?.[0],
      website2: user?.creator?.websites?.[1],
      website3: user?.creator?.websites?.[2],
      website4: user?.creator?.websites?.[3],
      website5: user?.creator?.websites?.[4]
    }
  });

  const onSubmit = (values: z.infer<typeof CreatorSettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {});
  };

  useEffect(() => {
    if (user) {
      getUserById(user.userId).then((data) => {
        if (!data) return;

        form.setValue("username", data.username);
        form.setValue("bio", data.creator?.bio || "");
        form.setValue("firstname", data.firstname);
        form.setValue("lastname", data.lastname || "");
        form.setValue("email", data.email);
        form.setValue("address", data?.address?.address1 || "");
        form.setValue("phone1", data.phone1 || "");
        form.setValue("phone2", data.phone2 || "");
      });
    }
  }, []);

  return (
    <main className="w-full flex justify-between">
      <div className="w-1/2 flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <Button asChild variant="link" className="px-0">
            <Link href="/">Accept our standard Legal Agreements</Link>
          </Button>
          <Switch disabled={isDisabled} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="w-full flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-4">
                <FormLabel>Cover Image & Avatar</FormLabel>
                <Avatar className="w-full h-28 rounded-none">
                  <AvatarImage src={coverImagePath} className="object-cover" />
                  <AvatarFallback className="bg-sky-500">
                    <div className="w-full h-full bg-inherit"></div>
                  </AvatarFallback>
                </Avatar>
                <Button
                  disabled={isDisabled}
                  type="button"
                  variant={"outline"}
                  size={"sm"}
                  className="w-32 rounded-none"
                  onClick={() => hiddenCoverFileIniput.current?.click()}
                >
                  Upload New
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={hiddenCoverFileIniput}
                  onChange={onCoverChanged}
                />
              </div>
              <div className="w-full flex items-end gap-x-6">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="JohnDoe1234"
                            {...field}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            placeholder="username@yemail.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isDisabled}
                        placeholder="JohnDoe1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of User</FormLabel>
                    <Select
                      disabled={isDisabled}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select what you join for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TITLES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-end gap-x-6">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Company</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="JohnDoe1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          placeholder="username@yemail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-1/2 pr-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="username@yemail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-end gap-x-6">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="website1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Personal Websites</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Website 1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="website2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Website 2" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-end gap-x-6">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="website3"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Website 3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="website4"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Website 4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-1/2 pr-3">
              <FormField
                control={form.control}
                name="website5"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Website 5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isDisabled} className="w-64" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-2/5 flex flex-col gap-y-6">
        <p className="text-xl font-medium">
          Confirm your profiles on other Creative markets
        </p>
        <LinkedSites disabled={isDisabled} />
      </div>
    </main>
  );
}
