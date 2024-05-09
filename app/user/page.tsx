"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

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
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { ProfileSchema } from "@/schemas/user";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { uploadImage } from "@/shared/functions/upload-image";
import { updateGeneralProfile } from "@/data/user";
import { User } from "@/shared/types/user.type";

export default function Profile() {
  const [user, updateUser] = useAtom(userAtom);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setPending] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();

  useEffect(() => {
    if (user?.avatar) {
      getLinkFromS3(user.avatar).then((res) => {
        if (res.success) {
          setAvatarPath(res.response as string);
        }
      });
    }
  }, []);

  const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);
  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarPath(URL.createObjectURL(e.target.files[0]));
      setAvatar(e?.target?.files?.[0]);

      setError("");
      setSuccess("");
    }
  };

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      avatar: user?.avatar,
      email: user?.email,
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
      phone1: user?.phone1,
      phone2: user?.phone2,
      address1: user?.address?.address1,
      address2: user?.address?.address2,
      city: user?.address?.city,
      postal: user?.address?.postal,
      country: user?.address?.country
    }
  });

  const isFormChanged = () => {
    const _changed =
      // user?.username !== form.getValues("username") ||
      user?.firstname !== form.getValues("firstname") ||
      user?.lastname !== form.getValues("lastname");

    if (_changed) {
      setError("");
      setSuccess("");
    }

    return _changed;
  };

  const isChanged = useMemo(() => {
    return isFormChanged() || avatar;
  }, [
    avatar,
    // form.getValues("username"),
    form.getValues("firstname"),
    form.getValues("lastname")
  ]);

  const updateData = async (values: z.infer<typeof ProfileSchema>) => {
    if (avatar) {
      const keyName = `${user?.username}/${uuidv4()}`;
      if (await uploadImage(avatar, keyName)) {
        values.avatar = keyName;
      } else {
        setError("Failed to upload image");
        return null;
      }
    }

    const reponse = await updateGeneralProfile(user?.userId as string, values);
    if (reponse) {
      setSuccess("Profile updated successfully");
      return values;
    } else {
      setError("Failed to update profile");
      return null;
    }
  };

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("");
    setSuccess("");

    setPending(true);
    updateData(values).then((savedValues) => {
      if (savedValues) {
        updateUser({
          ...user,
          ...savedValues
        } as User);
      }
      setAvatar(undefined);
      setPending(false);
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <Header
        title="General Profile"
        content="You can see your roles opened and update your profile information here."
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
                        disabled
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
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input {...field} disabled placeholder="johndoe" />
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
          <Button
            disabled={isPending || !isChanged}
            type="submit"
            className="w-64"
          >
            Save Profile
          </Button>
        </form>
      </Form>
    </main>
  );
}
