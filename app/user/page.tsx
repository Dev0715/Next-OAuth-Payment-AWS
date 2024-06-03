"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { GradientButton } from "@/components/utils/gradient-button";
import { RoleSwitchBox } from "@/components/utils/role-switch-box";
import { updateGeneralProfile } from "@/data/user";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { ProfileSchema } from "@/schemas/user";
import { uploadImage } from "@/shared/functions/upload-image";
import { User } from "@/shared/types/user.type";
import { userAtom } from "@/store/user";

import { Header } from "./_components/header";

export default function Profile() {
  const [user, updateUser] = useAtom(userAtom);
  const { getLinkFromS3 } = useLinkFromS3();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setPending] = useState<boolean>(false);
  const [isChanged, setChanged] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();

  useEffect(() => {
    if (user?.avatar) {
      getLinkFromS3(user.avatar, "LISTING").then((res) => {
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
      setChanged(true);
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
      user?.lastname !== form.getValues("lastname") ||
      user?.phone1 !== form.getValues("phone1") ||
      user?.phone2 !== form.getValues("phone2") ||
      user?.address?.address1 !== form.getValues("address1") ||
      user?.address?.address2 !== form.getValues("address2") ||
      user?.address?.city !== form.getValues("city") ||
      user?.address?.postal !== form.getValues("postal") ||
      user?.address?.country !== form.getValues("country");

    if (_changed) {
      setError("");
      setSuccess("");
    }

    return _changed;
  };

  form.watch(() => {
    setChanged(isFormChanged() || !!avatar);
  });

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

    const userData = {
      avatar: values.avatar,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      phone1: values.phone1,
      phone2: values.phone2,
      address: {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        postal: values.postal,
        country: values.country
      }
    } as User;

    const response = await updateGeneralProfile(
      user?.userId as string,
      userData
    );
    if (response) {
      setSuccess("Profile updated successfully");
      return userData;
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
      setChanged(false);
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-6">
      <Header
        title="General Profile"
        content="You can see your roles opened and update your profile information here."
      />
      <Separator />
      <div className="w-full flex flex-col gap-y-4">
        <h3 className="text-base font-firs font-medium">Your roles opened</h3>
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
                <GradientButton
                  disabled={isPending}
                  className="py-1"
                  onClick={() => hiddenAvatarFileInput.current?.click()}
                >
                  Upload New
                </GradientButton>
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
                      <Input {...field} disabled placeholder="username" />
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
                        placeholder="firstname"
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
                        placeholder="lastname"
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
                name="phone1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone 1</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="phone number"
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
                name="phone2"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone 2</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <div className="w-full flex items-end gap-x-6">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Address line 1"
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
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Address line 2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-end gap-x-6">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="City"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="postal"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Postal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Country"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <GradientButton
            disabled={isPending || !isChanged}
            type="submit"
            className="w-64"
          >
            Save Profile
          </GradientButton>
        </form>
      </Form>
    </main>
  );
}
