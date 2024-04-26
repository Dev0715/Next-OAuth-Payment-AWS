"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition
} from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { GeneralDetailsSchema } from "@/schemas/auth/register";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { checkGeneralDetails } from "@/actions/auth/register/check-general-details";
import { SignedUpData } from "@/shared/types/types-signup-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const defaultData = userData.generalDetails;

  const [isPending, startTransition] = useTransition();
  const [isError, setError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const [avatar, setAvatar] = useState<File | undefined>(defaultData.avatar);
  const [avatarPath, setAvatarPath] = useState<string>(
    defaultData.avatar ? URL.createObjectURL(defaultData.avatar) : ""
  );

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
          setUserData({ ...userData, generalDetails: { ...values, avatar } });
          moveStepForward();
        } else {
          setErrMsg(data.error as string);
          setError(true);
        }
      });
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isError}
        title="Error"
        message={errMsg}
        onOK={() => setError(false)}
      />
      <p className="text-xl text-green-700">
        1. Please provide your general details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
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
          <div className="w-full flex gap-x-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address 1*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Address Line 1"
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
                    <FormLabel>Address 2</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Address Line 2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex gap-x-6">
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City*</FormLabel>
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
                    <FormLabel>Postal Code*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Postal Code"
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
                    <FormLabel>Country*</FormLabel>
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
          <div className="w-full flex gap-x-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number 1</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Phone Number 1"
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
                    <FormLabel>Phone Number 2</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Phone Number 2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-64 flex gap-x-4 self-end mt-4"
          >
            <FaArrowRight />
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};
